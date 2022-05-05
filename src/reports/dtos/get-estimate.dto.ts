import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class GetEstimateDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2070)
    year: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @IsLongitude()
    lng: number;

    @IsLatitude()
    lat: number;
}