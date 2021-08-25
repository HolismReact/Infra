import React from 'react';
import MainRouting from '../Base/MainRouting';
import Sidebar from './Sidebar';
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

  return <div className="flex">
    {
      isSidebarOpen
        ?
        <ClickAwayListener onClickAway={closeMenu}>
          <div
            id='thisDivShouldNotBeRemovedToFixRefProblemOfSidebar'
            className={
              "w-72 absolute border-r z-10 bg-white top-0 bottom-0 "
              +
              /*large*/"lg:w-1/5 lg:static lg:border-r-0"
            }
          >
            <Sidebar onClick={closeMenu} />
          </div>
        </ClickAwayListener>
        :
        null
    }
    <div className="flex-1 flex flex-col min-h-screen">
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
