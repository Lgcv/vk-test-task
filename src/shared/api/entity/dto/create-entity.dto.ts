import type { EntityDto } from './entity.dto';

export type CreateEntityDto = Omit<EntityDto, 'id'>;
