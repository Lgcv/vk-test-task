import { makeAutoObservable } from 'mobx';
import type { AxiosResponse } from 'axios';
import { type EntityDto, entityApi } from '@shared/api/entity';
import { alertsModel } from '@shared/lib/alerts';

export type Entity = EntityDto;

class SomeEntityModel {
  data: Entity[] = [];
  isLoading: boolean = false;
  isLoadingAction: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  *getData() {
    this.data = [];
    this.isLoading = true;

    try {
      const response: AxiosResponse<EntityDto[]> = yield entityApi.getAll();
      this.data = response.data.map(({ id, ...rest }) => ({ ...rest }));
    } catch {
      alertsModel.add({ type: 'error', text: 'Ошибка получения данных' });
    } finally {
      this.isLoading = false;
    }
  }

  addCreatedItem(item: Entity) {
    this.data.push(item);
  }
}

export const model = new SomeEntityModel();
