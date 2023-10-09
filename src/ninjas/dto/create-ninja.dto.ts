/* eslint-disable prettier/prettier */
import { IsEnum, MinLength } from "class-validator";

export class CreateNinjaDto {
    @MinLength(3)
    name: string;

    @IsEnum(['blade' , 'spoon'], {message: "Choose the right weapon!"})
    weapon: 'blade' | 'spoon';
}
