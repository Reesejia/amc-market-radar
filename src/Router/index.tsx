import { Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import DragLayout from '../views/Front/DragLayout'
import DataPageManage from '../views/Admin/DashManage'
// const DragLayout = lazy(() => import('../views/Front/DragLayout'))
// const DataPageManage = lazy(() => import('../views/Admin/DashManage/index'))
const routes = () => (
	<Router basename="/amc/manage/amc-dashbi">
		<Suspense fallback={<Spin />}>
		<div>
            <ul style={{position: 'fixed', right: '10px', top: '100px', zIndex: 1000}}>
			<li>
				<Link to="/"></Link>
			</li>
			<li>
				<Link to="/dataPageManage">dataPageManage</Link>
			</li>
            </ul>
			<Switch>
				<Route path="/home" component={DragLayout} />
				<Route path="/dataPageManage" component={DataPageManage} />
				<Redirect to="/dataPageManage"/>
			</Switch>
		</div>
		</Suspense>
	</Router>
);

export default routes
