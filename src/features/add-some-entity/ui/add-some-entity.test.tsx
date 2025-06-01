import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AddSomeEntity } from './add-some-entity';
import { someEntityModel } from '@entities/some-entity';
import { http } from '@shared/lib/http';
import type { EntityDto, GetEntityResponse } from '@shared/api/entity';
import { someEntityData } from '@entities/some-entity';
import userEvent from '@testing-library/user-event';

vi.mock('@shared/lib/http');

describe('Add some entity component', () => {
  test('render', async () => {
    const axiosGet = vi.spyOn(http, 'get');

    vi.mocked(http.get<GetEntityResponse>, { partial: true }).mockResolvedValueOnce({
      data: someEntityData.slice(0, 20) as GetEntityResponse,
    });

    await someEntityModel.getData();
    expect(axiosGet).toHaveBeenCalledTimes(1);

    const countColumns = Object.keys(someEntityData[0]).length;

    expect(Object.keys(someEntityModel.columns).length).toBe(countColumns);
    render(<AddSomeEntity />);
    expect(screen.getAllByTestId('input').length).toBe(countColumns);
  });

  test('add some entity form with correct value', async () => {
    render(<AddSomeEntity />);

    await userEvent.type(screen.getByLabelText('Название'), 'title');
    await userEvent.type(screen.getByLabelText('Описание'), 'description');
    await userEvent.type(screen.getByLabelText('Город'), 'city');
    await userEvent.type(screen.getByLabelText('Телефон'), '8-123-456-78-91');
    await userEvent.type(screen.getByLabelText('e-mail'), 'test@mail.ru');
    await userEvent.type(screen.getByLabelText('Сайт'), 'test.ru');
    await userEvent.type(screen.getByLabelText('Логин'), 'login');
    await userEvent.type(screen.getByLabelText('Имя'), 'name');
    expect(screen.getByText('Добавить')).not.toBeDisabled();
  });

  test('add some entity form with incorrect value e-mail, website, phone', async () => {
    render(<AddSomeEntity />);

    await userEvent.type(screen.getByLabelText('Название'), 'title');
    await userEvent.type(screen.getByLabelText('Описание'), 'description');
    await userEvent.type(screen.getByLabelText('Город'), 'city');
    await userEvent.type(screen.getByLabelText('Телефон'), '81234567891');
    await userEvent.type(screen.getByLabelText('e-mail'), 'test.ru');
    await userEvent.type(screen.getByLabelText('Сайт'), 'test@mail.ru');
    await userEvent.type(screen.getByLabelText('Логин'), 'login');
    await userEvent.type(screen.getByLabelText('Имя'), 'name');
    expect(screen.getByText('Добавить')).toBeDisabled();
  });

  test('add some entity form with incorrect value name', async () => {
    render(<AddSomeEntity />);

    await userEvent.type(screen.getByLabelText('Название'), 'title');
    await userEvent.type(screen.getByLabelText('Описание'), 'description');
    await userEvent.type(screen.getByLabelText('Город'), 'city');
    await userEvent.type(screen.getByLabelText('Телефон'), '8-123-456-78-91');
    await userEvent.type(screen.getByLabelText('e-mail'), 'test@mail.ru');
    await userEvent.type(screen.getByLabelText('Сайт'), 'test.ru');
    await userEvent.type(screen.getByLabelText('Логин'), 'login');
    await userEvent.type(screen.getByLabelText('Имя'), 'name123');
    expect(screen.getByText('Добавить')).toBeDisabled();
  });

  test('add some entity query', async () => {
    render(<AddSomeEntity />);

    const createdItem = {
      id: someEntityModel.data[someEntityModel.data.length - 1].id + 1,
      title: 'title',
      description: 'description',
      city: 'city',
      phone: '8-123-456-78-91',
      website: 'test.ru',
      login: 'login',
      name: 'name',
    };

    const axiosPost = vi.spyOn(http, 'post');

    vi.mocked(http.post<EntityDto>, { partial: true }).mockResolvedValueOnce({
      data: createdItem,
    });

    await userEvent.type(screen.getByLabelText('Название'), 'title');
    await userEvent.type(screen.getByLabelText('Описание'), 'description');
    await userEvent.type(screen.getByLabelText('Город'), 'city');
    await userEvent.type(screen.getByLabelText('Телефон'), '8-123-456-78-91');
    await userEvent.type(screen.getByLabelText('e-mail'), 'test@mail.ru');
    await userEvent.type(screen.getByLabelText('Сайт'), 'test.ru');
    await userEvent.type(screen.getByLabelText('Логин'), 'login');
    await userEvent.type(screen.getByLabelText('Имя'), 'name');
    expect(screen.getByText('Добавить')).not.toBeDisabled();

    await userEvent.click(screen.getByText<HTMLButtonElement>('Добавить'));
    expect(axiosPost).toHaveBeenCalled();

    expect(someEntityModel.data[someEntityModel.data.length - 1]).toEqual(createdItem);
  });
});
