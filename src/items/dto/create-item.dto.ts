import { CreateListingDto } from "./listing-item.dto";

export class CreateItemDto {
    name: string;
    public: boolean;
    listing: CreateListingDto;
}
