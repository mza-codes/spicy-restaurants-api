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

@Controller('restaurants')
export class RestaurantsController {
    constructor(private readonly restaurantsService: RestaurantsService) {}

    @Post()
    create(@Body() createRestaurantDto: CreateRestaurantDto) {
        return this.restaurantsService.create(createRestaurantDto);
    }

    @Get()
    findAll() {
        return this.restaurantsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        const objectId = this.restaurantsService.validateObjectId(id);
        if (!objectId) throw new HttpException('Invalid ID', 400);

        return this.restaurantsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
        const objectId = this.restaurantsService.validateObjectId(id);
        if (!objectId) throw new HttpException('Invalid ID', 400);

        return this.restaurantsService.update(id, updateRestaurantDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        const objectId = this.restaurantsService.validateObjectId(id);
        if (!objectId) throw new HttpException('Invalid ID', 400);

        return this.restaurantsService.remove(id);
    }
}
