import React, { useEffect } from 'react';
import MainRouting from '../Base/MainRouting';
import Sidebar from './Sidebar';
import Header from './Header';
import app from '../Base/App';
import useLocalStorageState from '../Base/UseLocalStorageState';
import Footer from './Footer';
import Message from './Message';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Title from './Title';
// https://dev.to/codeply/helpful-page-layouts-using-tailwind-css-1a3k

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

  useEffect(() => {
    if (window.innerWidth < app.breakpoints.lg) {
      setMainContentWidth('100vw');
    }
    else {
      if (isSidebarOpen) {
        if (window.innerWidth >= app.breakpoints.xxl) {
          setMainContentWidth('83.33vw')
        }
        else {
          setMainContentWidth('80vw');
        }
      }
      else {
        setMainContentWidth('100vw');
      }
    }
  }, [isSidebarOpen]);

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

  return <div className="flex">
    {
      isSidebarOpen
        ?
        <ClickAwayListener onClickAway={closeMenu}>
          <div
            id='thisDivShouldNotBeRemovedToFixRefProblemOfSidebar'
            className={
              "w-72 absolute border-r border-b z-10 bg-white top-0 bottom-0 "
              +
              /*large*/"lg:w-1/5 lg:static lg:border-r-0 lg:border-b-0 "
              +
              /*xlarge*/ ""
              +
              /*2x large*/ "2xl:w-1/6"
            }
          >
            <Sidebar onClick={closeMenu} />
          </div>
        </ClickAwayListener>
        :
        null
    }
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
        className="md:p-10 pt-5 flex-1"
        style={{
          maxWidth: mainContentWidth
        }}
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
export { app } from '../Base/App';