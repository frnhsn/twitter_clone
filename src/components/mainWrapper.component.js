import React from 'react';
import TopHeaderComponent from './sections/topheader.component.js';
import LeftSidebarComponent from './sections/leftSidebar.component.js';
import PrivateRoute from './routes/privateRoute.component.js';

const MainWrapper = ({ component: Component, ...rest }) => {
    return (
        <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
              <TopHeaderComponent headerTitle={rest.title}/>
              <LeftSidebarComponent />
              {/* Page wrapper  */}
              <div className="page-wrapper">
                  {/* <Route {...rest} render={
                      props => {
                        return (<Component {...rest} {...props} />)
                      }
                  }/> */}
                  <PrivateRoute {...rest} component={Component} />
              </div>
             {/* End Page wrapper  */}
        </div>
    )
}

export default MainWrapper;