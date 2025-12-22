import { Body, Controller, Post } from "@nestjs/common";
import { CreateUnitUseCase } from "../../../application/use-cases/organization/create-unit.use-case";
import { ApiOrganizationOperations } from "../../../shared/swagger/decorators";
import { CreateUnitDTO } from "../../dto/organizationDTO/create-organization.dto";
import { ResponseUnitDTO } from "../../dto/organizationDTO/response/unit-response.dto";
import { plainToInstance } from "class-transformer";

@Controller('organizations')
export class OrganizationController {
  constructor(
    private readonly createUnitUseCase: CreateUnitUseCase,

  ) { }

  @Post('organizations')
  @ApiOrganizationOperations.createOrganization()
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
