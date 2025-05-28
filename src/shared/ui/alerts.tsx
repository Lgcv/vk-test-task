import MaterialAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { type FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { alertsModel, type Alert } from '@shared/lib/alerts';

export const Alerts = observer(() => {
  return (
    <>
      {alertsModel.alerts.length > 0 && (
        <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <div className="flex-col *:not-last:mb-3">
            {alertsModel.alerts.map((alert, index) => (
              <AlertCard key={index} alert={alert} />
            ))}
          </div>
        </Snackbar>
      )}
    </>
  );
});

interface AlertProps {
  alert: Alert;
}

const AlertCard: FC<AlertProps> = ({ alert }) => {
  useEffect(() => {
    setTimeout(() => {
      alertsModel.removeFirst();
    }, 3000);
  }, []);

  return (
    <MaterialAlert severity={alert.type} variant="filled">
      {alert.text}
    </MaterialAlert>
  );
};
