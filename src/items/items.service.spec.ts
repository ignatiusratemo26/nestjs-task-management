import { Test, TestingModule } from "@nestjs/testing";
import { ItemsService } from "./items.service"
import { Item } from "./entities/item.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

describe('ItemsService', () => {
    let service: ItemsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ItemsService,
                {
                    provide:  getRepositoryToken(Item),
                    useValue: {},
                },
                {
                    provide: EntityManager,
                    useValue: {}
                }
            ],
        }).compile();

        service = module.get<ItemsService>(ItemsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});