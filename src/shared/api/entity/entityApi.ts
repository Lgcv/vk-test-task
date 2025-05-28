import { http } from '@shared/lib/http';
import type { CreateEntityDto, EntityDto } from './dto';

export const entityApi = {
  getAll: () => {
    return http.get<EntityDto[]>('/entities');
  },

  create: (body: CreateEntityDto) => {
    return http.post<EntityDto>('/entities', body);
  },
};
