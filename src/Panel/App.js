import React from 'react';
import MainRouting from '../Base/MainRouting';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import Header from './Header';
import Holism from '../Base/Holism';
import useLocalStorageState from '../Base/UseLocalStorageState';
import Footer from './Footer';
import Message from './Message';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Title from './Title';

function App() {
  
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorageState(true, 'isSidebarOpen');

  const toggleMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const closeMenu = () => {
    if (window.innerWidth <= Holism.breakpoints.lg) {
      setIsSidebarOpen(false);
    }
  }

  return <div className="flex h-full">
    {
      isSidebarOpen
        ?
        <ClickAwayListener onClickAway={closeMenu}>
          <div id='thisDivShouldNotBeRemovedToFixRefProblemOfSidebar' className="w-72 absolute border-r lg:border-r-0 z-10 lg:w-1/5 lg:static bg-white h-full">
            <Sidebar onClick={closeMenu} />
          </div>
        </ClickAwayListener>
        :
        null
    }
    <div className="flex-1 flex flex-col">
      <Header onMenuIconClicked={toggleMenu} />
      <div id='content' className="p-10 pt-5 flex-1">
        <Title />
        <MainRouting />
      </div>
      <Footer />
      <Message />
    </div>
  </div>
}

export default App;
