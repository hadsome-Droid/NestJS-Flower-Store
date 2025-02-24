import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// guard нужен для зашиты какого либо ендпоинта

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuth = request.headers.authorization === 'secret';
    if (!isAuth)
      throw new UnauthorizedException('Not Unauthorized My Little Ork');

    return isAuth;
  }
}
