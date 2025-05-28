import { makeAutoObservable } from 'mobx';
import type { AxiosResponse } from 'axios';
import { type EntityDto, entityApi } from '@shared/api/entity';
import { alertsModel } from '@shared/lib/alerts';

type Entity = EntityDto;

class SomeEntityModel {
  data: Entity[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  *getData() {
    this.isLoading = true;

    try {
      const response: AxiosResponse<EntityDto[]> = yield entityApi.getAll();
      this.data = response.data.map(({ id, ...rest }) => ({ ...rest }));
    } catch {
      alertsModel.add({ type: 'error', text: 'Ошибка получения данных' });
    }

    this.isLoading = false;
  }

  addItem(item: Entity) {
    this.data.push(item);
  }
}

export const model = new SomeEntityModel();
