import React, {Fragment} from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.showSideDrawer) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show={props.showSideDrawer} clicked={props.sideDrawerClosed}/>
      <div className={attachedClasses.join(' ')} onClick={props.sideDrawerClosed}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth}/>
        </nav>
      </div>
    </Fragment>
  );
};

export default sideDrawer;
