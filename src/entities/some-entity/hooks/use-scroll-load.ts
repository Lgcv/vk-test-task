import { useEffect, useRef } from 'react';
import { model } from '../model';
import { flowResult } from 'mobx';
import type { CancellablePromise } from 'mobx/dist/internal';

export const useScrollLoad = () => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<CancellablePromise<unknown> | null>(null);

  const onLoadHandler = () => {
    if (!model.isAdditionalDataComplete && !model.isAdditionalLoading) {
      requestRef.current = flowResult(model.getAdditionalData());
    }
  };

  useEffect(() => {
    return () => {
      requestRef.current?.cancel();
      model.resetAdditional();
    };
  }, []);

  const onScrollHandler = () => {
    if (tableRef.current) {
      if (
        tableRef.current?.scrollHeight -
          tableRef.current?.scrollTop -
          tableRef.current?.clientHeight <=
        0
      ) {
        onLoadHandler();
      }
    }
  };

  return { tableRef, onScrollHandler };
};
