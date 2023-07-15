import React from 'react'
import Middle from '../Components/Middle';
import UserPannel from '../Components/User/UserPannel';
import { useAuth } from '../Auth/Index';

const UserDashboard = () => {
  const [auth,setAuth]=useAuth()
  return (
    <Middle>
    <div className="container">
      <div className="row  mt-5">
        <UserPannel />
        <div className="col-8">
          <h1>Hello, {auth.user.name}</h1>
        </div>
      </div>
    </div>
  </Middle>
  )
}

export default UserDashboard;
