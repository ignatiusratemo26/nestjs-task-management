import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateListingDto } from "./listing-item.dto";
import { CreateTagDto } from "./create-tag.dto";

export class CreateItemDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsBoolean()
    public: boolean;

    listing: CreateListingDto;

    tags: CreateTagDto[];
}
