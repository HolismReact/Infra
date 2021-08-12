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

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorageState(true, 'isSidebarOpen');
  const [pageTitle, setPageTitle] = useState('');
  const [pageSubtitle, setPageSubtitle] = useState('');
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  const [hasSubtitleOrBreadcrumb, setHasSubtitleOrBreadcrum] = useState();

  Holism.on(Holism.componentLoaded, ({ pageTitle, pageSubtitle, breadcrumbItems }) => {
    setPageTitle(pageTitle);
    setPageSubtitle(pageSubtitle);
    if (breadcrumbItems && breadcrumbItems.length) {
      setBreadcrumbItems(breadcrumbItems);
    }
  });

  useEffect(() => {
    if (Holism.isSomething(pageSubtitle) || (breadcrumbItems.length > 0)) {
      setHasSubtitleOrBreadcrum(true);
    }
    else {
      setHasSubtitleOrBreadcrum(false);
    }
  }, [pageSubtitle, breadcrumbItems]);

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
          <div id='thisDivShouldNotBeRemovedToFixRefProblemOfSidebar' className="w-72 absolute z-10 lg:w-1/5 lg:static bg-white h-full">
            <Sidebar onClick={closeMenu} />
          </div>
        </ClickAwayListener>
        :
        null
    }
    <div className="flex-1 flex flex-col">
      <Header onMenuIconClicked={toggleMenu} />
      <div id='content' className="p-10 pt-5 flex-1">
        <div className={"mb-10 " + (hasSubtitleOrBreadcrumb ? "h-12" : "h-6")}>
          <div className="font-medium mb-2 tracking-wider	text-xl text-gray-900">{pageTitle}</div>
          {
            hasSubtitleOrBreadcrumb
              ?
              <div className="text-xs tracking-wider text-gray-700 flex items-center">
                {
                  pageSubtitle ||
                  (
                    breadcrumbItems.map((item, index) => <span key={item.title}>
                      <span>{item.title}</span>
                      {index === breadcrumbItems.length - 1
                        ?
                        null
                        :
                        <span className="mx-2" style={{ 'font-size': '10px' }}>/</span>
                      }
                    </span>)
                  )
                }
              </div>
              :
              null
          }
        </div>
        <MainRouting />
      </div>
      <Footer />
      <Message />
    </div>
  </div>
}

export default App;
