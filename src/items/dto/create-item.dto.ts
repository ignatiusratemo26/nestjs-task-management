import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { CreateListingDto } from "./listing-item.dto";
import { CreateTagDto } from "./create-tag.dto";

export class CreateItemDto {
    @IsString()
    name: string;

    @IsBoolean()
    public: boolean;

    listing: CreateListingDto;

    tags: CreateTagDto[];
}
