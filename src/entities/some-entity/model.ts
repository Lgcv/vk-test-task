import { makeAutoObservable } from 'mobx';
import type { AxiosResponse } from 'axios';
import { type EntityDto, entityApi } from '@shared/api/entity';
import { alertsModel } from '@shared/lib/alerts';

export type Entity = EntityDto;

class SomeEntityModel {
  data: Entity[] = [];
  isLoading: boolean = false;
  isAdditionalLoading: boolean = false;
  isAdditionalDataComplete: boolean = false;

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

  *getAdditionalData() {
    this.isAdditionalLoading = true;

    try {
      const response: AxiosResponse<EntityDto[]> = yield entityApi.getAll({
        start: this.data.length,
      });

      this.data.push(...response.data.map(({ id, ...rest }) => ({ ...rest })));
      if (response.data.length === 0) this.isAdditionalDataComplete = true;
    } catch {
      alertsModel.add({ type: 'error', text: 'Ошибка получения данных' });
    } finally {
      this.isAdditionalLoading = false;
    }
  }

  addCreatedItem(item: Entity) {
    this.data.push(item);
  }

  resetAdditional() {
    this.isAdditionalDataComplete = false;
  }
}

export const model = new SomeEntityModel();
