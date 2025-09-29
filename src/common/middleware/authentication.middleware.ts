import { Injectable, Logger, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import { RequestService } from "src/request.service";

config();

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    private readonly logger = new Logger(AuthenticationMiddleware.name);

    constructor(private readonly requestService: RequestService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];

        this.logger.log(AuthenticationMiddleware.name);

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or Invalid authorization hearder');
        }

        const token = authHeader.split(' ')[1];
        const jwt_secret = process.env.JWT_SECRET;
        if (!jwt_secret) {
            throw new UnauthorizedException('JWT secret not configured');
        }

        if (token !== jwt_secret) {
            throw new UnauthorizedException('Invalid Token');
        }

        // attach user info to the request if valid
        (req as any ).user = {id: 1, username: 'demoUser'};
        

        next();

    }
}