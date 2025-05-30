import { makeAutoObservable } from 'mobx';
import type { AxiosResponse } from 'axios';
import { type EntityDto, entityApi } from '@shared/api/entity';
import { alertsModel } from '@shared/lib/alerts';
import type { EntityColumnsDto, GetEntityResponse } from '@shared/api/entity';

export type Entity = EntityDto;

export class SomeEntityModel {
  data: Entity[] = [];
  columns: EntityColumnsDto = {};
  addedEntities: number[] = [];
  countQueries: number = 0;

  isLoading: boolean = false;
  isAdditionalLoading: boolean = false;
  isAdditionalDataComplete: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  *getData() {
    this.reset();
    this.isLoading = true;

    try {
      const response: AxiosResponse<GetEntityResponse> = yield entityApi.getAll();
      const [columns, ...responseData] = response.data;
      this.columns = columns;
      this.data = responseData;
    } catch {
      alertsModel.add({ type: 'error', text: 'Ошибка получения данных' });
    } finally {
      this.isLoading = false;
    }
  }

  *getAdditionalData() {
    this.isAdditionalLoading = true;

    try {
      if (this.isAdditionalDataComplete) return;

      const response: AxiosResponse<EntityDto[]> = yield entityApi.getAll({
        start: this.countQueries * 20,
      });

      this.data.push(...response.data.filter((e) => !this.addedEntities.includes(e.id)));
      if (response.data.length === 0) this.isAdditionalDataComplete = true;
      this.countQueries++;
    } catch {
      alertsModel.add({ type: 'error', text: 'Ошибка получения данных' });
    } finally {
      this.isAdditionalLoading = false;
    }
  }

  addCreatedItem(item: Entity) {
    this.addedEntities.push(item.id);
    this.data.push(item);
  }

  resetAdditional() {
    this.isAdditionalDataComplete = false;
  }

  reset() {
    this.data = [];
    this.columns = {};
    this.addedEntities = [];
    this.isLoading = false;
    this.countQueries = 1;
    this.resetAdditional();
  }
}

export const model = new SomeEntityModel();
