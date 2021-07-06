import './public-path';
import React, { HtmlHTMLAttributes } from 'react';
import {QianKunProps} from '@/typing/axios'
import ReactDOM from 'react-dom';
import Router from './Router'
import './index.css';


function render(props: any) {
  const { container } = props;
  const ret =container && container.querySelector('#root')
  console.log('ret33',ret)
  ReactDOM.render(<Router />, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props: QianKunProps) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props: any ) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}
