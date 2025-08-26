import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import {reLoginAuthDto}  from './dto/reLogin-auth-dto'
import { LogoutAuthDto } from './dto/logout-auth-dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,private jwtService: JwtService) {}

async create(createAuthDto: CreateAuthDto) {
  // generate salt + hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(createAuthDto.password, salt);

  // replace plain password with hashed one
  const user = await this.prisma.user.create({
    data: {
      ...createAuthDto,
      password: hashedPassword,
    },
  });

  return user;
}
//Login Function
 async login(loginDto: LoginAuthDto) {
    const { email, password } = loginDto;

    // 1. Find user by email
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Sign tokens
    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '5m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '15d',
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  //Login Function
 async logout(logutDto: LogoutAuthDto) {
   try {
    const { accessToken, refreshToken } = logutDto;
     const alreadyBlacklisted = await this.prisma.blacklist.findFirst({
        where: { accessToken: accessToken },
      });
      if (alreadyBlacklisted) {
        throw new UnauthorizedException('Token is blacklisted/Already Expired');
      }

        const logoutAuth = await this.prisma.blacklist.create({
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
    if (!logoutAuth) {
      throw new UnauthorizedException('Invalid credentials');
    }

   } catch (error) {
       throw new UnauthorizedException('Invalid credentials');
   }
  }

//reLogin
async relogin(reloginDto: reLoginAuthDto) {
  const { accessToken, refreshToken } = reloginDto;

  try {
    try {
      // ✅ Step 1: Verify if accessToken is valid

 const alreadyBlacklisted = await this.prisma.blacklist.findFirst({
        where: { accessToken: accessToken },
      });
      if (alreadyBlacklisted) {
        throw new UnauthorizedException('Token is blacklisted/Already Expired');
      }
      const decoded = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      // If valid, return the same tokens
      //
      const payload = { sub: decoded.sub, email: decoded.email, role: decoded.role };

      return {
        accessToken,
        refreshToken,
        message: 'Access token still valid',
      };
      
    } catch (error) {
      if (error.name !== 'TokenExpiredError') {
        throw new UnauthorizedException('Invalid access token');
      }
     
      // Token is expired → go to refresh
    }

    // ✅ Step 2: Verify refreshToken
    
    const refreshPayload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    // Build payload from refreshToken
    
    const payload = {
      sub: refreshPayload.sub,
      email: refreshPayload.email,
      role: refreshPayload.role,
    };

    // ✅ Step 3: Generate new tokens
    const newAccessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '20m',
    });

    const newRefreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      message: 'New access token generated',
    };
  } catch (error) {
    console.log(error);
    throw new UnauthorizedException('Relogin failed');
  }
}

}
