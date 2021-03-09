import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import {useDispatch} from 'react-redux';
import React, {useState, useEffect} from 'react';
import { printJob } from './store/actions/printActions';
let socket;

function App() {
  const dispatch = useDispatch();
  const [resetsocket, setResetSocket] = useState(false);

  const ENDPOINT = "http://3.0.183.70:8000/";
  useEffect(()=>{
    const name = 'printAdmin'
    console.log(name);
    const room = 'printComs';
    console.log(room);
    socket = io(ENDPOINT);
    socket.emit('join', {name,room}, (error) => {
    if(error) {
    alert(error);
  }
});
setTimeout(()=>{setResetSocket(!resetsocket)},30000);
},[ENDPOINT,resetsocket]);

useEffect(() => {
  socket.on('newPrintJob', (order_id,printType,fooditem_id,payment_data) => {
      console.log('In new Printjob')
      dispatch(printJob(order_id,printType,fooditem_id,payment_data));
  });
}, []);

  return (
    <div className="App">
      <header className="App-header">
       Print Server
      </header>
    </div>
  );
}

export default App;
