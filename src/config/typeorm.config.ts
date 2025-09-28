import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const postgresPassword = process.env.POSTGRES_PASSWORD;

if (!postgresPassword) {
    throw new Error('POSTGRES_PASSWORD environment variable is not set');
}

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username:'postgres',
    password: postgresPassword,
    database:'taskmanagement',
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true,
}