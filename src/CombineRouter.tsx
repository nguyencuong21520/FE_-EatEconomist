import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout';
import Home from './Pages/home';
import Login from './Pages/auth/login';
import Register from './Pages/auth/register';
import MainLayout from './Layouts/MainLayout';
import ProviderStore from '../store/ProviderStore';
import Drawer from './Components/Drawer';
import Modal from './Components/Modal';
import ResetPassword from './Pages/auth/reset-password';

const CombineRouter = () => {
    return (
        <ProviderStore>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainLayout />}>
                        <Route path='home' element={<Home />} />
                    </Route>
                    <Route path='auth' element={<AuthLayout />}>
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                        <Route path='reset-password' element={<ResetPassword />} />
                    </Route>
                    <Route path='*' element={<div>Không hợp lệ</div>} />
                </Routes>
            </BrowserRouter>
            <Drawer />
            <Modal />
        </ProviderStore>
    )
}

export default CombineRouter;