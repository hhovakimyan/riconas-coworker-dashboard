import TableListService from 'features/BlowInJobs/services/api/TableListService';
import PhotoService from 'features/BlowInJobs/services/api/PhotoService';
import {
  IPhotoService,
  ITableListService,
} from 'features/BlowInJobs/services/interfaces';

import { traceMethod } from 'services';

export const tableListService: ITableListService = traceMethod(
  new TableListService(),
);
export const photoService: IPhotoService = traceMethod(new PhotoService());
