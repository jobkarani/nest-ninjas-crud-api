import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

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
  getOneNinja(@Param('id') id: string){
    return this.ninjaService.getNinja(+id);
  }
  // Post /ninjas
  @Post()
  createNinja(@Body() createNinjaDto: CreateNinjaDto){
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
