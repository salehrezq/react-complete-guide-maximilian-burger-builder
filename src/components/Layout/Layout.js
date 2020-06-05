import React from 'react';
import '../../hoc/Auxiliary';
import Auxiliary from "../../hoc/Auxiliary";

const Layout = props => (
   <Auxiliary>
      <div>Toolbar, SideDrawe, Backdrop</div>
      <main>
         {props.children}
      </main>
   </Auxiliary>

);

export default Layout;
