import {Spin} from 'antd';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
const DragLayout = lazy(() => import(/* webpackChunkName: "DragLayout" */'../views/Front/GridDemo/DragLayout'))
const BoardAdmin = lazy(() => import(/* webpackChunkName: "BoardAdmin" */'../views/Admin/BoardAdmin'))
const DashboardPage = lazy(() => import(/* webpackChunkName: "DashboardPage" */'../views/Front/DashboardPage/index'))
const FormatData= lazy(() => import(/* webpackChunkName: "FormatData" */'../views/Front/FormatData/index'))
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
				<Link to="/formatData">format data</Link>
			</li>
			<li>
				<Link to="/dashboardPage">DashboardPage</Link>
			</li>
            </ul>
			<Switch>
				<Route path="/home" component={DragLayout} />
				<Route path="/boardAdmin" component={BoardAdmin} />
				<Route path="/formatData" component={FormatData} />
				<Route path="/dashboardPage" component={DashboardPage} />
				<Redirect to="/home"/>
			</Switch>
		</div>
		</Suspense>
	</Router>
);

export default routes
