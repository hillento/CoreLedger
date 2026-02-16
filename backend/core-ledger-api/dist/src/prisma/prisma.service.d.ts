import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService implements OnModuleInit, OnModuleDestroy {
    private readonly client;
    constructor();
    get db(): PrismaClient;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
