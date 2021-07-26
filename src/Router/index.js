import { Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import DashManage from '@/views/Admin/DashManage'
import DashboardPage from '@/views/Front/DashboardPage'
import { KeepAliveProvider } from '@/component/keepalive-react-component'

// const DashManage = lazy(() => import(/* webpackChunkName: "BoardAdmin" */'@/views/Admin/DashManage'))
// const DashboardPage = lazy(() => import(/* webpackChunkName: "DashboardPage" */'../views/Front/DashboardPage'))
// const DragLayout = lazy(() => import(/* webpackChunkName: "DragLayout" */'../views/Front/GridDemo/DragLayout'))
// const FormatData= lazy(() => import(/* webpackChunkName: "FormatData" */'../views/Front/FormatData/index'))
// import DragLayout from '../views/Front/DragLayout'
// const DragLayout = lazy(() => import('../views/Front/DragLayout'))
// const DataPageManage = lazy(() => import('../views/Admin/DashManage/index'))
const routes = (props) => (
 <Router basename={props.basename}>
      <KeepAliveProvider>
    <Suspense fallback={<Spin />}>
      <div>
        {/* <ul style={{ position: 'fixed', right: '10px', top: '100px', zIndex: 1000 }}>
          <li>
            <Link to="/dashManage">DashManage</Link>
          </li>
          <li>
            <Link to="/dashboardPage">DashboardPage</Link>
          </li>
        </ul> */}
        <Switch>
          <Route path="/dashManage" component={DashManage} />
          <Route path="/dashboardPage" component={DashboardPage} />
          <Route path="/" component={DashboardPage} />
        </Switch>
      </div>
    </Suspense>
    </KeepAliveProvider>
  </Router>
);

export default routes
