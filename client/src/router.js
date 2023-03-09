import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from 'components/hoc/mainLayout';
import Header from 'components/navigation/header';
import Footer from 'components/navigation/footer';
import Home from 'components/home';
import RegisterLogin from 'components/auth';
import DashBoard from 'components/dashboard';
import Loader from 'utils.js/loader';
import { useDispatch, useSelector } from 'react-redux';
import { userIsAuth, userSignOut } from 'store/actions/user.action';
import AuthGuard from './components/hoc/authGuard'
import AdminProducts from 'components/dashboard/adminProducts';
// Using Routes instead of Switch in react-router v6
// You are using react-router-dom version 6, which replaced Switch with the Routes component

const Router = (props) => {
  const [loading, setLoading] = useState(true);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(userSignOut())
  }

  useEffect(() => {
    dispatch(userIsAuth())
  }, [dispatch])

  useEffect(() => {
    if (users.auth !== null) setLoading(false)
  },[users])


  return (
    <BrowserRouter>
      {loading ?
        <Loader full={true} />

        :
        <>
          <Header
            users={users} 
            signOutUser={signOutUser}
          />
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard/admin/admin_products" element={<AuthGuard requiredToken={true}><AdminProducts users={users}/></AuthGuard>} />
              <Route path="/dashboard" element={<AuthGuard requiredToken={true}><DashBoard users={users}/></AuthGuard>} />
              <Route path="/sign_in" element={<RegisterLogin />} />
            </Routes>
          </MainLayout>
          <Footer />
        </>
      }

    </BrowserRouter>
  );
}

export default Router;
