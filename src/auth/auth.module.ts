import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: 'THE123!@#',
          signOptions: {
            expiresIn: '10d',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [PassportModule],
})
export class AuthModule {}
