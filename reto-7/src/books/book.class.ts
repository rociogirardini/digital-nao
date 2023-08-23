import { ApiProperty } from "@nestjs/swagger";

export class Book {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  genre: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  publisher: string;

  @ApiProperty()
  pages: number;

  @ApiProperty()
  image_url: string;

}