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

// const defaultRouterBase = '/amc/manage/amc-dashbi'
const defaultRouterBase = '/amc/sub-house-board'


function render(props) {
  const { container } = props;

  ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
      <Router basename={props.routerBase} />
    </ConnectedRouter>
  </Provider>, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({ routerBase: defaultRouterBase });
  store.dispatch({ type: types.SET_ROUTER_BASE, payload: defaultRouterBase })
}

export async function bootstrap() {
  console.log(' react app bootstraped');
}

export async function mount(props) {
  if (!props.routerBase) {
    props.routerBase = defaultRouterBase
  }
  const routerBaseMap = store.getState().dashboardStore.routerBaseMap
  if (routerBaseMap.has(props.routerBase)) {
    let { groupId, isEditDashboard } = routerBaseMap.get(props.routerBase)
    store.dispatch({ type: types.GROUP_ID, payload: groupId })
    store.dispatch({ type: types.IS_EDIT_DASHBOARD, payload: isEditDashboard })
    store.dispatch({ type: types.SET_ROUTER_BASE, payload: props.routerBase })
  }
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    // const bol = Object.prototype.hasOwnProperty.call(state, 'sidebar_status')
    // if (bol) {
      // console.log('sidebar ==> changed', state, prev)
      // var myEvent = new Event('resize');
      // console.log("changjian1", myEvent)
      // setTimeout(() => {
      //   window.dispatchEvent(myEvent);
      // },800)
    // }
  })
  render(props);
}

export async function unmount(props) {
  console.log('sub app unmount', props)
  const { container } = props;
  const routerBaseMap = store.getState().dashboardStore.routerBaseMap
  if (routerBaseMap.has(props.routerBase)) {
    await store.dispatch({ type: types.CLEAR_DASH_STORE })
  }
  await ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}
