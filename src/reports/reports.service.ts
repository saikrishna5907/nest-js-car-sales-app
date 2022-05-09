import { Report } from './report.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Report) private repo: Repository<Report>) { }

    createReport(body: CreateReportDto, user: User) {
        const report = this.repo.create(body);
        report.user = user;
        return this.repo.save(report);
    }

    async setApprovalReport(id: string, body: ApproveReportDto) {
        const report = await this.repo.findOneBy({ id: +id })
        if (!report) {
            throw new NotFoundException('report not found');
        }
        report.approved = body.approve;
        return this.repo.save(report);
    }
    async createEstimation({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
        return this.repo.createQueryBuilder()
            .select('AVG(salePrice)', 'salePrice')
            .where('make = :make', { make })
            .andWhere('model = :model', { model })
            .andWhere('lng - :lng BETWEEN -5 and 5', { lng })
            .andWhere('lat - :lat BETWEEN -5 and 5', { lat })
            .andWhere('year - :year BETWEEN -3 and 3', { year })
            .andWhere('approved is TRUE')
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({ mileage })
            .limit(3)
            .getRawOne()
    }
}
