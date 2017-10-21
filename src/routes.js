'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import IndexPage from './components/admin_component/IndexPage';
import AthletePage from './components/admin_component/AthletePage';
import NotFoundPage from './components/NotFoundPage';
import LoginPage from './components/admin_component/Login';
import DashBoardPage from './components/admin_component/dashboard/Dashboard';
import TestPage from './components/admin_component/test';
import IndexView from './components/view_component/index';
import Single from './components/view_component/single/single';
import Category from './components/view_component/category/category';
import PathRoute from './path_route';

const routes = (
  <Route path="/">
    <IndexRoute component={IndexView}/>
    <Route path='san-pham/:id' component={Single}/>
    <Route path='danh-muc/:cateName/:id' component={Category}/>
    <Route path='danh-muc/:cateName/:subCate/:id' component={Category}/>
	<Route path="test" component={TestPage}/>

    <Route path="/admin/">
      <IndexRoute component={IndexPage}/>
      <Route path="athlete/:id" component={AthletePage}/>
  	<Route path="login" component={LoginPage}/>
  	<Route path="dashboard" component={DashBoardPage}/>
    <Route path="dashboard/:route" component={DashBoardPage}/>
  	<Route path="test" component={TestPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
