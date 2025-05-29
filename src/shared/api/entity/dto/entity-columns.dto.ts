import type { EntityDto } from './entity.dto';

export interface EntityColumnsDto {
  [key: keyof EntityDto]: string;
}
