import {
  FetchListQueryParams,
  FetchListResponseDto,
  SaveCommentRequestDto,
  SaveCommentResponseDto,
  UpdateCabelPropsRequestDto,
  UpdateCabelPropsResponseDto,
} from 'features/MontageJobs/services/models/Jobs';

import { ServiceError } from 'services/helperTypes';

interface IJobTableService {
  fetchList(
    queryParams: FetchListQueryParams,
  ): Promise<FetchListResponseDto | ServiceError>;

  updateCabelProps(
    jobId: string,
    requestData: UpdateCabelPropsRequestDto,
  ): Promise<UpdateCabelPropsResponseDto | ServiceError>;

  saveComment(
    jobId: string,
    requestData: SaveCommentRequestDto,
  ): Promise<SaveCommentResponseDto | ServiceError>;
}

export default IJobTableService;
