import { makeAutoObservable } from 'mobx';
import type { AxiosResponse } from 'axios';
import { type CreateEntityDto, type EntityDto, entityApi } from '@shared/api/entity';
import { alertsModel } from '@shared/lib/alerts';

type Entity = EntityDto;

class SomeEntityModel {
  data: Entity[] = [];
  isLoading: boolean = false;
  isLoadingAction: boolean = false;

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

  *createItem(data: CreateEntityDto) {
    this.isLoadingAction = true;

    try {
      const response: AxiosResponse<EntityDto> = yield entityApi.create(data);
      const { id, ...rest } = response.data;
      this.data.push(rest);
      alertsModel.add({ type: 'success', text: 'Запись добавлена' });
    } catch {
      alertsModel.add({ type: 'error', text: 'Ошибка добавления записи' });
    }

    this.isLoadingAction = false;
  }
}

export const model = new SomeEntityModel();
