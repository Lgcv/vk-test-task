import { describe, expect, test, vi } from 'vitest';
import { MainPage } from './main.page';
import { render, screen, waitFor } from '@testing-library/react';
import { http } from '@shared/lib/http';
import type { GetEntityResponse } from '@shared/api/entity';
import { someEntityData } from '@entities/some-entity';

vi.mock('@shared/lib/http');

describe('Main page', () => {
  test('render', async () => {
    const axiosGet = vi.spyOn(http, 'get');

    vi.mocked(http.get<GetEntityResponse>, { partial: true }).mockResolvedValueOnce({
      data: someEntityData.slice(0, 20) as GetEntityResponse,
    });

    render(<MainPage />);
    expect(axiosGet).toHaveBeenCalledTimes(1);
    await waitFor(() => screen.findByTestId('table-container'));
  });
});
