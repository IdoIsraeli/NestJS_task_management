import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>

    ) {
        super({
            secretOrKey: 'topSecret51',// this is the secret key that we used to sign the token.
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),// this is the function that will extract the token from the request.
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user: User = await this.usersRepository.findOne({ username });

        if (!user) {
            throw new UnauthorizedException();
        }
        return user; // this user object will be injected into the request object.
    }
}
