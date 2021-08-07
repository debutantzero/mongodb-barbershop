import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from './pages/Home';
import Connexion from './pages/Connexion';
import Offline from './pages/Offline';
import axios from 'axios';
import { useState } from 'react';
import Addproduit from './pages/Addproduit';
import Getproduits from './pages/Getproduits';
function App() {
const [render, setRender]= useState()
    axios({
      method: 'get',
      withCredentials:true,
      url: '/apikey/',
    }).then(data=>{
        if(data.data==false){
          setRender(false);
        }else if(data.data==true){
          setRender(true)
        }
    })
    .catch(err=>{
      console.log(err)
    })

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/service" component={render ?Addproduit :Connexion} />
        <Route path="/shop" component={Offline} />
        <Route path="/produits" component={Getproduits} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
