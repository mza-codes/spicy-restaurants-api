import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpException,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto/restaurants.dto';
import { ObjectId, isValidObjectId } from 'mongoose';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private readonly restaurantsService: RestaurantsService) {}

    @Post()
    create(@Body() createRestaurantDto: CreateRestaurantDto) {
        console.log('@adding restaurant', createRestaurantDto);
        return this.restaurantsService.create(createRestaurantDto);
    }

    @Get()
    findAll() {
        return this.restaurantsService.findAll().then((data) => data.reverse());
    }

    @Get(':id')
    findOne(@Param('id') id: string | ObjectId) {
        id = this.validateObjectId(id);
        return this.restaurantsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string | ObjectId,
        @Body() updateRestaurantDto: UpdateRestaurantDto,
    ) {
        id = this.validateObjectId(id);
        return this.restaurantsService.update(id, updateRestaurantDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string | ObjectId) {
        id = this.validateObjectId(id);
        return this.restaurantsService.remove(id);
    }

    private validateObjectId(id: string | ObjectId): ObjectId {
        const isObjectID = isValidObjectId(id);
        if (!isObjectID) throw new HttpException('Invalid ID', 400);
        return id as ObjectId;
    }
}
