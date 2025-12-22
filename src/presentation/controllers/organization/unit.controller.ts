import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CreateUnitUseCase } from "../../../application/use-cases/organization/create-unit.use-case";
import { CreateUnitDTO } from "../../dto/organizationDTO/create-unit.dto";
import { ResponseUnitDTO } from "../../dto/organizationDTO/response/unit-response.dto";
import { ApiUnitOperations } from "../../../shared/swagger/decorators";

@Controller('units')
export class UnitController {
  constructor(
    private readonly createUnitUseCase: CreateUnitUseCase,

  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiUnitOperations.createUnit()
  async createUnit(
    @Body() createUnitDTO: CreateUnitDTO,
  ): Promise<ResponseUnitDTO> {
    const unit = await this.createUnitUseCase.execute(
      createUnitDTO
    );

    return plainToInstance(ResponseUnitDTO, unit, {
      excludeExtraneousValues: true,
    });
  }

}
