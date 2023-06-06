import React from 'react';
import './App.css';
import Homepage from './screen/Homepage';

export interface CustomComponent {
  index?:boolean,
  path: string,
  element: any,
  children?: any[],
  title?: string,
  icon?: any,
  key?: string
}

const App :React.FC = () => {
  return (
   <Homepage product={"homepage"}/>
  );
}

export default App;
