import { Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

// const DragLayout = lazy(() => import(/* webpackChunkName: "DragLayout" */'../views/Front/GridDemo/DragLayout'))
const DashManage = lazy(() => import(/* webpackChunkName: "BoardAdmin" */'../views/Admin/DashManage'))
const DashboardPage = lazy(() => import(/* webpackChunkName: "DashboardPage" */'../views/Front/DashboardPage'))
// const FormatData= lazy(() => import(/* webpackChunkName: "FormatData" */'../views/Front/FormatData/index'))
// import DragLayout from '../views/Front/DragLayout'
// const DragLayout = lazy(() => import('../views/Front/DragLayout'))
// const DataPageManage = lazy(() => import('../views/Admin/DashManage/index'))
const routes = () => (
  <Router basename="/amc/manage/amc-dashbi">
    <Suspense fallback={<Spin />}>
      <div>
        <ul style={{ position: 'fixed', right: '10px', top: '100px', zIndex: 1000 }}>
          <li>
            <Link to="/dashManage">DashManage</Link>
          </li>
          <li>
            <Link to="/dashboardPage">DashboardPage</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/dashManage" component={DashManage} />
          <Route path="/dashboardPage" component={DashboardPage} />
          <Redirect to="/dashManage" />
        </Switch>
      </div>
    </Suspense>
  </Router>
);

export default routes
