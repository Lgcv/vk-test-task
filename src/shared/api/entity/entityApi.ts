import { http } from '@shared/lib/http';
import type { CreateEntityDto, EntityDto } from './dto';

interface GetQueryParams {
  start?: number;
}

export const entityApi = {
  getAll: (params?: GetQueryParams) => {
    return http.get<EntityDto[]>(`/entities?_start=${params?.start || 0}&_limit=20`);
  },

  create: (body: CreateEntityDto) => {
    return http.post<EntityDto>('/entities', body);
  },
};
