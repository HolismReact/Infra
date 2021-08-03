import React from 'react';
import MainRouting from '../Base/MainRouting';
import Sidebar from './Sidebar';
import { useState } from 'react';

function App() {
  const [sideBarIsOpen, setSidebarAsOpen] = useState();

  return <div className="flex">
    <Sidebar className="w-1/6 bg-white" />
    <MainRouting className="flex-1" />
  </div>
}

export default App;
