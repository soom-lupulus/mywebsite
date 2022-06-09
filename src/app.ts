import { RequestConfig } from 'umi';

export const request: RequestConfig = {
  timeout: 1000,
  errorConfig: {},
  middlewares: [],
  requestInterceptors: [],
  responseInterceptors: [],
};

export const getInitialState = () => {};

import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';

export function rootContainer(contaniner: any) {
  return React.createElement(SnackbarProvider, {
    children: contaniner,
    maxSnack: 3,
    autoHideDuration: 2000,
  });
}
