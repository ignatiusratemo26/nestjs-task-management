import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.getOrThrow('POSTGRES_HOST'),
    port: 5433,
    database: configService.getOrThrow('POSTGRES_DATABASE'),
    username: configService.getOrThrow('POSTGRES_USERNAME'),
    password: configService.getOrThrow('POSTGRES_PASSWORD'),
    migrations: ['./migrations/*{.ts,.js}'],
    entities: ['./src/**/*.entity{.ts,.js}'],
    synchronize: false,
})