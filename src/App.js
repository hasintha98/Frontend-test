import React, { Component, Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import AuthService from './services/AuthService'
import EventBus from "./common/EventBus";


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const AddNewRecordLayout = React.lazy(() => import('./layout/AddNewRecordLayout'))

function App() {

  const [userLogin, setUserLogin] = useState(true)

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if(user) {
      setUserLogin(true);
    } else {
      logOut()
    }

  }, [])

  const logOut = () => {
    //console.log(" logging out from App js !!");
    AuthService.logout();
    setUserLogin(false);

  };
  

  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          {/* <Route exact path="/add-record" name="Record Creation" element={<AddNewRecordLayout />} /> */}
          <Route path="*" name="Home" element={userLogin ? <DefaultLayout /> : <AddNewRecordLayout />} />

        </Routes>
      </Suspense>
    </HashRouter>
  )

}

export default App
