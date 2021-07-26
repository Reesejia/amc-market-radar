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
  const basename = props.routerBase || '/amc/manage/amc-dashbi'
  ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
    <Router basename={basename}/>
    </ConnectedRouter>
  </Provider>, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log(' react app bootstraped');
}

export async function mount(props) {
  console.log('props from main framework', props);
  let m = new Map();
  m.set('/amc/manage/editBoard/edit-sub-radar-board', {isEditDashboard: true, groupId: "n1"});
  m.set('/amc/manage/editBoard/edit-sub-house-board', {isEditDashboard: true, groupId: "n2"});
  m.set('/amc/sub-radar-board', {isEditDashboard: false, groupId: "n1"});
  m.set('/amc/sub-house-board',{isEditDashboard: false, groupId: "n2"});
  let {groupId, isEditDashboard} = m.get(props.routerBase)
  store.dispatch({ type: types.GROUP_ID, payload: groupId})
  store.dispatch({ type: types.IS_EDIT_DASHBOARD, payload: isEditDashboard})
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}
