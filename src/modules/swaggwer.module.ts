import { Module } from '@nestjs/common';
import { SwaggerConfig } from '../shared/swagger/swagger.config';

@Module({
  providers: [SwaggerConfig],
  exports: [SwaggerConfig],
})
export class SwaggerModule {}
