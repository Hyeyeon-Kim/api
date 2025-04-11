import { UserModule } from 'src/user/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { FirebaseAuthStrategy } from './stategies/firebase-auth.stategies';
import { FirebaseAuthGuard } from './guard/firebase-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [forwardRef(() => UserModule), PassportModule],
  controllers: [],
  providers: [
    FirebaseAuthStrategy,
    {
      provide: APP_GUARD,
      useClass: FirebaseAuthGuard,
    },
  ],
})
export class AuthModule {}
