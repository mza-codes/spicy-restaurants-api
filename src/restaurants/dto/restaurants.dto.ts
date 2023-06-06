import { PartialType } from '@nestjs/mapped-types';
import {
    ArrayMinSize,
    ArrayUnique,
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsString,
    Validate,
} from 'class-validator';
import { IRestaurant, Tags } from '../schemas/restaurants.schema';
import { IsOneOfEnum } from '../../common/utils/enum-utils';

export class CreateRestaurantDto implements IRestaurant {
    @IsBoolean()
    featured: boolean;

    @IsString()
    @IsNotEmpty()
    img: string;

    @IsString()
    @IsNotEmpty()
    place: string;

    @IsString()
    @IsNotEmpty()
    price: string;

    @IsArray()
    @ArrayMinSize(1)
    @ArrayUnique()
    // @Validate(IsOneOfEnum, [Tags]) resolve error
    @IsString({ each: true })
    tags: Tags[];

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    time: string;
}

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}
