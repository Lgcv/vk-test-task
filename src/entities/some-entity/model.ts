import { makeAutoObservable } from 'mobx';
import type { AxiosResponse } from 'axios';
import { type EntityDto, entityApi } from '@shared/api/entity';

type Entity = EntityDto;

class SomeEntityModel {
  data: Entity[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  *getData() {
    const response: AxiosResponse<EntityDto[]> = yield entityApi.getAll();
    this.data = response.data.map(({ id, ...rest }) => ({ ...rest }));
  }

  addItem(item: Entity) {
    this.data.push(item);
  }
}

export const model = new SomeEntityModel();
