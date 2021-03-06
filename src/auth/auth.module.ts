import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: '1234567891',
      signOptions: {
        expiresIn: 3600
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [
    PassportModule,
    JWTStrategy
  ]
})
export class AuthModule { }
