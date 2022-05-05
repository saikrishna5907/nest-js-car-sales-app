import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Body, Controller, Get, Param, Patch, Post, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }

    @UseGuards(AuthGuard)
    @Post('/create')
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.createReport(body, user);
    }

    @Patch('setApproval/:id')
    @UseGuards(AdminGuard)
    setApprovalReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        return this.reportsService.setApprovalReport(id, body);
    }

    @Get('/getEstimationPrice')
    getEstimationPrice(@Query() query: GetEstimateDto) {

    }
}
