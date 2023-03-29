import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { CarMakeRepository } from '../repository/car-make.repository';
import { CarSpecificationFormatter } from '../formatter/car-specification.formatter';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarMakeResponse } from '../dto/responce.dto';

@ApiTags('CarSpecification')
@Controller('car-specification')
export class CarSpecificationController {
  private DEFAULT_LIMIT = 60;

  constructor(
    private readonly carMakeRepository: CarMakeRepository,
    private readonly carSpecificationFormatter: CarSpecificationFormatter,
  ) {}

  @Get('makes')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'searchStr', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: HttpStatus.OK, type: CarMakeResponse })
  public async getCarMakesBySearchStr(
    @Query('searchStr') searchStr = '',
    @Query('limit') limit: number = this.DEFAULT_LIMIT,
  ) {
    const makes = await this.carMakeRepository.getCarMakesLike(
      searchStr,
      limit,
    );

    return this.carSpecificationFormatter.toCarMakesResponce(makes);
  }
}
