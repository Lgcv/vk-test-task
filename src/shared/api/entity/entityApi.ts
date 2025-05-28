import { http } from '@shared/lib/http';
import type { EntityDto } from './dto';

export const entityApi = {
  getAll: () => {
    return http.get<EntityDto[]>('/entities');
  },
};
