import React from 'react';
import Navbar from './components/navbar'
import Home from './components/home'
import Soal1 from './components/latihan1'
import Soal3 from './components/latihan3'
import { Route } from 'react-router-dom'
import './App.css';
import TableData from './components/TableData';
import EditData from './components/EditData';

class App extends React.Component {
  render(){
  return (
    <div>
       <Navbar/> 
       <div className='container'>
       <Route path='/' exact component={Home} />
       <Route path='/post' component={Soal1} />
       <Route path='/petunjuk' component={Soal3} />
       {/* <Route path='/table-data' component={TableData} /> */}
       <Route path='/edit-data' component={EditData} />
       </div>
    </div>
  );
  }
}

export default App;
