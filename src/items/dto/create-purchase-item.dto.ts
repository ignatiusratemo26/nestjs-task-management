import { IsInt, IsNumber, IsPositive } from "class-validator";

export class CreatePurchaseItemDto {
    @IsNumber()
    itemId: number;

    @IsPositive()
    @IsInt()
    quantity: number;

    @IsPositive()
    price: number;
}