import { EventSubscriber, EntitySubscriberInterface, DataSource, InsertEvent } from "typeorm";
// import { EntitySubscriberInterface } from "typeorm/browser";
import { Item } from "./entities/item.entity";

import { Logger } from "@nestjs/common";

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface <Item> {
    private readonly logger = new Logger(ItemSubscriber.name);

    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }
    listenTo(): Function | string {
        return Item;
        
    }
    beforeInsert(event: InsertEvent<Item>): Promise<any> | void {
        this.logger.log(`BEFORE ITEM INSERTED: `, JSON.stringify(event.entity));
    }
    afterInsert(event: InsertEvent<Item>): Promise<any> | void {
        this.logger.log(`AfterInsert`, JSON.stringify(event.entity));
    }
}