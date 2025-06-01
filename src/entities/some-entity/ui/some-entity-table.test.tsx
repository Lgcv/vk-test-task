import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { someEntityModel } from '@entities/some-entity';
import { http } from '@shared/lib/http';
import type { GetEntityResponse } from '@shared/api/entity';
import { someEntityData } from '@entities/some-entity';
import { SomeEntityTable } from './some-entity-table';

vi.mock('@shared/lib/http');

describe('Some entity components', () => {
  test('render some entity table', async () => {
    const axiosGet = vi.spyOn(http, 'get');

    vi.mocked(http.get<GetEntityResponse>, { partial: true }).mockResolvedValueOnce({
      data: someEntityData.slice(0, 20) as GetEntityResponse,
    });

    await someEntityModel.getData();
    expect(axiosGet).toHaveBeenCalledTimes(1);

    const countColumns = Object.keys(someEntityData[0]).length;

    expect(Object.keys(someEntityModel.columns).length).toBe(countColumns);
    render(<SomeEntityTable />);

    expect(screen.getByTestId('table')).toBeInTheDocument();
    expect(screen.getAllByTestId('table-row').length).toBe(someEntityModel.data.length);
    expect(screen.getAllByTestId('table-column').length).toBe(
      Object.keys(someEntityModel.columns).length,
    );
  });
});
