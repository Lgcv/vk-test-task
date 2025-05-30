import { http } from '@shared/lib/http';
import { describe, expect, test, vi } from 'vitest';
import { type GetEntityResponse } from '@shared/api/entity';
import { createdSomeEntityItem, someEntityData } from './_mock';
import { SomeEntityModel } from './model';

vi.mock('@shared/lib/http');

describe('Some entity store', () => {
  const store = new SomeEntityModel();

  test('Load init and additionally data', async () => {
    const axiosGet = vi.spyOn(http, 'get');

    vi.mocked(http.get<GetEntityResponse>, { partial: true })
      .mockResolvedValueOnce({
        data: someEntityData.slice(0, 20) as GetEntityResponse,
      })
      .mockResolvedValueOnce({
        data: someEntityData.slice(20, 40) as GetEntityResponse,
      })
      .mockResolvedValueOnce({
        data: someEntityData.slice(40, 60) as GetEntityResponse,
      })
      .mockResolvedValueOnce({
        data: someEntityData.slice(60, 80) as GetEntityResponse,
      });

    await store.getData();
    expect(axiosGet).toHaveBeenCalledTimes(1);
    expect(store.columns).toEqual(someEntityData[0]);
    expect(store.data).toEqual(someEntityData.slice(1, 20));

    await store.getAdditionalData();
    expect(store.data).toEqual(someEntityData.slice(1, 40));
    expect(axiosGet).toHaveBeenCalledTimes(2);

    await store.getAdditionalData();
    expect(store.data).toEqual(someEntityData.slice(1, 60));
    expect(axiosGet).toHaveBeenCalledTimes(3);

    await store.getAdditionalData();
    expect(store.data).toEqual(someEntityData.slice(1, 60));
    expect(axiosGet).toHaveBeenCalledTimes(4);

    await store.getAdditionalData();
    expect(store.isAdditionalDataComplete).toBeTruthy();
    expect(store.data).toEqual(someEntityData.slice(1, 60));
    expect(axiosGet).toHaveBeenCalledTimes(4);
  });

  test('Add new entity', async () => {
    store.addCreatedItem(createdSomeEntityItem);
    expect(store.addedEntities).contain(50);
    expect(store.data[store.data.length - 1]).toEqual(createdSomeEntityItem);
  });

  test('Reset state', async () => {
    store.reset();
    expect(store.isLoading).toBeFalsy();
    expect(store.data.length).toBe(0);
    expect(store.isLoading).toBeFalsy();
    expect(store.columns).toEqual({});
    expect(store.addedEntities).toEqual([]);
    expect(store.countQueries).toBe(1);
    expect(store.isAdditionalDataComplete).toBeFalsy();
  });
});
