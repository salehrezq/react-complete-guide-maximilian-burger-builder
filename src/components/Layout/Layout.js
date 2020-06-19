import React, {Component} from 'react';
import '../../hoc/Auxiliary';
import Auxiliary from "../../hoc/Auxiliary";
import classes from './Layout.module.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

   state = {
      showSideDrawer: true
   }

   sideDrawerClosedHandler = () => {
      this.setState({showSideDrawer: false});
   }

   render() {
      return (
         <Auxiliary>
            <Toolbar/>
            <SideDrawer
               sideDrawerclosed={this.sideDrawerClosedHandler}
               show={this.state.showSideDrawer}
            />
            <main className={classes.Content}>
               {this.props.children}
            </main>
         </Auxiliary>
      );
   }

}

export default Layout;
