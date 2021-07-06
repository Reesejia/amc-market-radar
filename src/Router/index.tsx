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
			<Switch>
				{/* <Redirect to="/dataPageManage"  /> */}
        <Route path="/" component={DataPageManage} />
        <Route path="/dataPageManage" component={DataPageManage} />
				<Route path="/home" component={DragLayout} />
			</Switch>
		</Suspense>
	</Router>
);

export default routes
