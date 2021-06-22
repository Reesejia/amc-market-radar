import {Spin} from 'antd';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
const DragLayout = lazy(() => import('../views/Front/GridDemo/DragLayout'))
const BoardAdmin = lazy(() => import('../views/Admin/BoardAdmin'))
const DashboardPage = lazy(() => import('../views/Front/DashboardPage/index'))

const routes = () => (
	<Router>
		<Suspense fallback={<Spin />}>
		<div>
            <ul style={{position: 'fixed', right: '10px', top: '100px', zIndex: 1000}}>
			<li>
				<Link to="/">marketRadar</Link>
			</li>
			<li>
				<Link to="/boardAdmin">BoardAdmin</Link>
			</li>
			<li>
				<Link to="/dashboardPage">DashboardPage</Link>
			</li>
            </ul>
			<Switch>
				<Route path="/home" component={DragLayout} />
				<Route path="/boardAdmin" component={BoardAdmin} />
				<Route path="/dashboardPage" component={DashboardPage} />
				<Redirect to="/home"/>
			</Switch>
		</div>
		</Suspense>
	</Router>
);

export default routes
