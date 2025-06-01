import { describe, expect, test, vi } from 'vitest';
import { AddSomeEntityModel } from './model';
import { http } from '@shared/lib/http';
import type { CreateEntityDto, EntityDto } from '@shared/api/entity';
import { createdSomeEntityItem, someEntityModel } from '@entities/some-entity';

vi.mock('@shared/lib/http');

describe('Add some entity model', () => {
  const model = new AddSomeEntityModel();

  test('Create item', async () => {
    const axiosPost = vi.spyOn(http, 'post');

    vi.mocked(http.post<EntityDto>, { partial: true }).mockResolvedValueOnce({
      data: createdSomeEntityItem,
    });

    const { id, ...createEntityDto }: CreateEntityDto = createdSomeEntityItem;

    await model.createItem(createEntityDto);
    expect(axiosPost).toHaveBeenCalled();
    expect(someEntityModel.data[someEntityModel.data.length - 1]).toEqual(createdSomeEntityItem);
  });
});
