import React, { useEffect } from 'react'
import { Transition } from '@headlessui/react'
import MainRouting from '../Base/MainRouting';
import Sidebar from './Sidebar';
import Header from './Header';
import app from '../Base/App';
import { get } from '../Base/Api';
import useLocalStorageState from '../Base/UseLocalStorageState';
import Footer from './Footer';
import Message from './Message';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Title from './Title';
import Collapse from '@mui/material/Collapse';
// https://dev.to/codeply/helpful-page-layouts-using-tailwind-css-1a3k
// import TrapFocus from '@mui/material/Unstable_TrapFocus';
// import Backdrop from '@mui/material/Backdrop';

require('react-dom');
window.React2 = require('react');
if (window.React1 !== window.React2) {
  console.warn('two reacts outside component');
}

function Panel() {

  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorageState(true, 'isSidebarOpen');
  const [mainContentWidth, setMainContentWidth] = useLocalStorageState(true, 'mainContentWidth');

  const toggleMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  require('react-dom');
  window.React2 = require('react');
  if (window.React1 !== window.React2) {
    console.warn('two reacts inside component');
  }

  const closeMenu = () => {
    if (window.innerWidth < app.breakpoints.lg) {
      setIsSidebarOpen(false);
    }
  }

  // useEffect(() => {
  //   if (window.innerWidth < app.breakpoints.lg) {
  //     setMainContentWidth('100vw');
  //   }
  //   else {
  //     if (isSidebarOpen) {
  //       if (window.innerWidth >= app.breakpoints.xxl) {
  //         setMainContentWidth('83.33vw')
  //       }
  //       else {
  //         setMainContentWidth('80vw');
  //       }
  //     }
  //     else {
  //       setMainContentWidth('100vw');
  //     }
  //   }
  // }, [isSidebarOpen]);

  useEffect(() => {
    const hide = () => {
      setIsSidebarOpen(false);
    };
    app.on(app.makeRoom, hide);
    return () => {
      app.removeListener(app.makeRoom, hide);
    };
  });

  useEffect(() => {
    const show = () => {
      if (window.innerWidth >= app.breakpoints.lg) {
        setIsSidebarOpen(true);
      }
    };
    app.on(app.returnBackToNormalForm, show);
    return () => {
      app.removeListener(app.returnBackToNormalForm, show);
    };
  });

  return <div
    className={
      "flex " +
      (app.isRtl() ? "flex-row-reverse " : "")
    }
  >
    <Transition
      show={isSidebarOpen}
      enter="transition-all duration-300"
      enterFrom="-ml-64"
      enterTo="ml-0"
      leave="transition-all duration-300"
      leaveFrom="ml-0"
      leaveTo="-ml-64"
      className={
        "w-72 absolute border-b z-10 bg-white top-0 bottom-0 "
        + (app.isRtl() ? " border-l " : " border-r ")
        +
          /*large*/"lg:w-1/5 lg:static lg:border-b-0 "
        + (app.isRtl() ? " lg:border-l-0 " : " lg:border-r-0 ")
        +
          /*xlarge*/ ""
        +
          /*2x large*/ "2xl:w-1/6"
      }
    >
      <ClickAwayListener onClickAway={closeMenu}>
        <div
          id='thisDivShouldNotBeRemovedToFixRefProblemOfSidebar'
        >
          <Sidebar onClick={closeMenu} />
        </div>
      </ClickAwayListener>
    </Transition>
    <div
      className=
      {
        /*small*/"flex-1 flex flex-col min-h-screen"
        /*medium*/
      }
    >
      <Header onMenuIconClicked={toggleMenu} />
      <div
        id='content'
        className="md:p-10 md:pt-4 pt-5 flex-1"
      >
        <Title />
        <MainRouting />
      </div>
      <Footer />
      <Message />
    </div>
  </div>
}

export default Panel;
export { HeaderAction } from './HeaderActions/HeaderAction';
export { FullScreen } from './HeaderActions/FullScreen';
export { Maximize } from './HeaderActions/Maximize';
export { Page } from '../Components/Page/Page';
export { HolismIcon } from '../Components/HolismIcon';
export { app } from '../Base/App';
export { get, post } from '../Base/Api';
export { PagePadding } from './Styles';