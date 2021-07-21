import './public-path';
import React, { HtmlHTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from './Router';
import { ConnectedRouter } from 'connected-react-router'
import store from './store/index';
import * as types from '@/store/action-types';
import history from '@/Router/history';
import 'default-passive-events'
import './index.css';


function render(props) {
  const { container } = props;
  const ret = container && container.querySelector('#root')
  ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
    <Router />
    </ConnectedRouter>
  </Provider>, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  let m = new Map();
  m.set('/amc/manage/amc-dashbi', 'n1');
  m.set('/amc/sub-app-radar', 'n1');
  m.set('/amc/sub-app-house', 'n2');
  let boardId = m.get(props.routerBase)
  store.dispatch({ type: types.GROUP_ID, payload: boardId})
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}
