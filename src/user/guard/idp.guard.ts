import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class IdPAccessGuard extends AuthGuard('idp-access-token') {}
