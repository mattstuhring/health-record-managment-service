import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { GetRecordsFilterDto } from '../dto/get-records-filter.dto';
import { HealthStatus } from '../constants/record-health-status.enum';
import { Healthcare } from '../constants/record-healthcare.enum';
import { Record } from '../entity/record.entity';
import { RecordsService } from './records.service';

const mockRecordsRepository: () => unknown = jest.fn(() => ({
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    andWhere: jest.fn(),
    getMany: jest.fn(),
  })),
}));

let mockRecord: jest.Mocked<Record>;
let mockGetRecordsFilterDto: jest.Mocked<GetRecordsFilterDto>;

describe('RecordsService', () => {
  let recordsService: RecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecordsService,
        {
          provide: getRepositoryToken(Record),
          useFactory: mockRecordsRepository,
        },
      ],
    }).compile();

    recordsService = module.get<RecordsService>(RecordsService);
  });

  describe('getRecords', () => {
    it('calls RecordsRepository.getRecords and returns the result', async () => {
      const response: Record[] = [];
      const spy = jest
        .spyOn(recordsService, 'getRecords')
        .mockResolvedValue(response);

      const result = await recordsService.getRecords(mockGetRecordsFilterDto);

      expect(spy).toHaveBeenCalledWith(mockGetRecordsFilterDto);
      expect(result).toEqual(response);
    });
  });
});
