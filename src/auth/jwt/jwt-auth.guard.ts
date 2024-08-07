import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log("Request Headers:", request.headers); // Add a log to see the headers
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      console.log("Auth Error:", err, info); // Add a log to see the error and info
      throw err || new UnauthorizedException();
    }
    console.log("Authenticated User:", user); // Add a log to see the authenticated user
    return user;
  }
}
