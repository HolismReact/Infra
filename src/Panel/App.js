import React from 'react';
import MainRouting from '../Base/MainRouting';
import Sidebar from './Sidebar';
import { useState } from 'react';
import Header from './Header';

function App() {
  const [sideBarIsOpen, setSidebarAsOpen] = useState();

  return <div className="flex">
    <Sidebar className="w-1/6 bg-white" />
    <div className="flex-1">
      <Header />
      <div className="p-10">
        <MainRouting />
      </div>
    </div>
  </div>
}

export default App;
