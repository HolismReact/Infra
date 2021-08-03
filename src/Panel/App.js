import React from 'react';
import MainRouting from '../Base/MainRouting';
import Sidebar from './Sidebar';
import { useState, useEffect} from 'react';
import Header from './Header';
import Holism from '../Base/Holism';

function App() {
  const [sideBarIsOpen, setSidebarAsOpen] = useState();
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

  return <div className="flex">
    <Sidebar className="w-1/6 bg-white" />
    <div className="flex-1">
      <Header />
      <div className="p-10 pt-5">
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
    </div>
  </div>
}

export default App;
