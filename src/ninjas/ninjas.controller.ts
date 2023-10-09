/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
  constructor(private ninjaService: NinjasService){};
  // Get /ninjas?type=fast ---> []
  @Get()
  getNinjas(@Query('weapon') weapon: 'blade' | 'spoon') {
    return this.ninjaService.getNinjas(weapon);
  }

  // Get /ninjas:id ----> {...}
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try{ 
      return this.ninjaService.getNinja(id);
    }
    catch (err){
      throw new NotFoundException();
    }
  }
  // Post /ninjas
  @Post()
  @UseGuards(BeltGuard)
  createNinja(@Body( new ValidationPipe()) createNinjaDto: CreateNinjaDto){
    return this.ninjaService.createNinja(createNinjaDto);
  }
  // Put /ninjas:id ----> {....}
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto){
    return this.ninjaService.updateNinja(+id, updateNinjaDto);
  }
  // Delete /ninjas:id
  @Delete(':id')
  removeNinja(@Param('id') id: string){
    return this.ninjaService.removeNinja(+id);
  }
}
