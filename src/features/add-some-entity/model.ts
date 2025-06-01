import { makeAutoObservable } from 'mobx';
import type { AxiosResponse } from 'axios';
import { type CreateEntityDto, type EntityDto, entityApi } from '@shared/api/entity';
import { alertsModel } from '@shared/lib/alerts';
import { someEntityModel } from '@entities/some-entity';

export class AddSomeEntityModel {
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  *createItem(data: CreateEntityDto) {
    this.isLoading = true;

    try {
      const response: AxiosResponse<EntityDto> = yield entityApi.create(data);
      someEntityModel.addCreatedItem(response.data);
      alertsModel.add({ type: 'success', text: 'Запись добавлена' });
    } catch {
      alertsModel.add({ type: 'error', text: 'Ошибка добавления записи' });
    } finally {
      this.isLoading = false;
    }
  }
}

export const model = new AddSomeEntityModel();
