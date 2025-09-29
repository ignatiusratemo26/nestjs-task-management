import { Injectable, Logger, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { RequestService } from "src/request.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    private readonly logger = new Logger(AuthenticationMiddleware.name);

    constructor(
        private readonly jwtService: JwtService
    ) {}

    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];

        this.logger.log(AuthenticationMiddleware.name);

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or Invalid authorization header');
        }

        const token = authHeader.split(' ')[1];

        try {
            // Verify the JWT token properly
            const payload = this.jwtService.verify(token);
            
            // Attach actual user info from token to request
            (req as any).user = { 
                userId: payload.sub, 
                username: payload.username 
            };
            
            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid Token');
        }
    }
}