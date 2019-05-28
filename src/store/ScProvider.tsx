import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

interface ScProviderProps {
  store: Store,
  children: React.ReactNode,
};

const ScProvider: React.SFC<ScProviderProps> = (props) => (
  <Provider store={props.store}>
    {props.children}
  </Provider>
);

export default ScProvider;
