import { Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import DataPageManage from '../views/Admin/DashManage'

const DragLayout = lazy(() => import(/* webpackChunkName: "DragLayout" */'../views/Front/GridDemo/DragLayout'))
const BoardAdmin = lazy(() => import(/* webpackChunkName: "BoardAdmin" */'../views/Admin/BoardAdmin'))
const DashboardPage = lazy(() => import(/* webpackChunkName: "DashboardPage" */'../views/Front/DashboardPage/component/HeaderTab'))
const FormatData= lazy(() => import(/* webpackChunkName: "FormatData" */'../views/Front/FormatData/index'))
// import DragLayout from '../views/Front/DragLayout'
// const DragLayout = lazy(() => import('../views/Front/DragLayout'))
// const DataPageManage = lazy(() => import('../views/Admin/DashManage/index'))
const routes = () => (
	<Router basename="/amc/manage/amc-dashbi">
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
        <Route path="/dataPageManage" component={DataPageManage} />
				<Redirect to="/home"/>
			</Switch>
      </div>
		</Suspense>
	</Router>
);

export default routes
