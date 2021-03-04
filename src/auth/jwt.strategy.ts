import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './types/jwt-payload.interface';

//https://github.com/mikenicholson/passport-jwt#configure-strategy #writing a custom extractor
const cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    //at this point jwt is already verified.
    //whatever we return will be injected to req.user (user is the default value)
    const { id } = payload;

    const user = await this.userService.findOne({ id });
    if (!user) throw new UnauthorizedException();

    const { password, ...rest } = user;
    return rest;
  }
}
