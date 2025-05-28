import { type AlertColor } from '@mui/material';
import { makeAutoObservable } from 'mobx';

export interface Alert {
  type: AlertColor;
  text: string;
}

class Alerts {
  alerts: Alert[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  removeFirst() {
    this.alerts.shift();
  }

  add(alert: Alert) {
    this.alerts.push(alert);
  }
}

export const alertsModel = new Alerts();
