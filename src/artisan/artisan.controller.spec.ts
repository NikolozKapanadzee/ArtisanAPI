import { Test, TestingModule } from '@nestjs/testing';
import { ArtisanController } from './artisan.controller';
import { ArtisanService } from './artisan.service';

describe('ArtisanController', () => {
  let controller: ArtisanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtisanController],
      providers: [ArtisanService],
    }).compile();

    controller = module.get<ArtisanController>(ArtisanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
