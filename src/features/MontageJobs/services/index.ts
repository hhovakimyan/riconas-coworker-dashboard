import JobTableService from 'features/MontageJobs/services/api/JobTableService';
import JobPhotoService from 'features/MontageJobs/services/api/JobPhotoService';
import HupService from 'features/MontageJobs/services/api/HupService';
import OntService from 'features/MontageJobs/services/api/OntService';
import HupPhotoService from 'features/MontageJobs/services/api/HupPhotoService';
import OntPhotoService from 'features/MontageJobs/services/api/OntPhotoService';
import {
  IOntService,
  IOntPhotoService,
  IHupPhotoService,
  IHupService,
  IJobPhotoService,
  IJobTableService,
} from 'features/MontageJobs/services/interfaces';

import { traceMethod } from 'services';

export const jobTableService: IJobTableService = traceMethod(
  new JobTableService(),
);

export const jobPhotoService: IJobPhotoService = traceMethod(
  new JobPhotoService(),
);

export const hupService: IHupService = traceMethod(new HupService());

export const hupPhotoService: IHupPhotoService = traceMethod(
  new HupPhotoService(),
);

export const ontService: IOntService = traceMethod(new OntService());

export const ontPhotoService: IOntPhotoService = traceMethod(
  new OntPhotoService(),
);
