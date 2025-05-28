import { makeAutoObservable } from 'mobx';
import type { AxiosResponse } from 'axios';
import { type EntityDto, entityApi } from '@shared/api/entity';

type Entity = EntityDto;

class SomeEntityModel {
  data: Entity[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  *getData() {
    this.isLoading = true;
    const response: AxiosResponse<EntityDto[]> = yield entityApi.getAll();
    this.data = response.data.map(({ id, ...rest }) => ({ ...rest }));
    this.isLoading = false;
  }

  addItem(item: Entity) {
    this.data.push(item);
  }
}

export const model = new SomeEntityModel();
