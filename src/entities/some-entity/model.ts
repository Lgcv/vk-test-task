import { makeAutoObservable } from 'mobx';

export interface Item {
  [key: string]: number;
}

interface TableData {
  columns: string[];
  rows: Item[];
}

export const createItem = (countField: number): Item => {
  return [...Array(countField)].reduce((res, _, i) => {
    res[`field${i}`] = Math.round(Math.random() * 100) / 100;
    return res;
  }, {});
};

export const getTableData = (countField: number): TableData => {
  return {
    columns: [...Array(countField)].map((_, i) => `Поле ${i + 1}`),
    rows: [...Array(150)].map(() => createItem(countField)),
  };
};

class SomeEntityModel {
  data: Item[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getData(countField: number) {
    this.data = [...Array(10)].map(() => createItem(countField));
  }

  addItem(item: Item) {
    this.data.push(item);
  }
}

export const model = new SomeEntityModel();
