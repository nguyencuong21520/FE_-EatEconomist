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
import ListOrder from './Pages/list-order';
import PersonalInformation from './Components/PersonalInformation';
import AuthProtect from './Layouts/AuthProtect';

const CombineRouter = () => {
    return (
        <ProviderStore>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<AuthProtect><MainLayout /></AuthProtect>}>
                        <Route path='' element={<Home />} />
                        <Route path='list-order' element={<ListOrder />} />
                        <Route path='personal-information' element={<PersonalInformation />} />
                    </Route>
                    <Route path='auth' element={<AuthLayout />}>
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                        <Route path='reset-password' element={<ResetPassword />} />
                    </Route>
                    <Route path='*' element={<div>Không hợp lệ</div>} />
                </Routes>
                <Drawer />
                <Modal />
            </BrowserRouter>
        </ProviderStore>
    )
}

export default CombineRouter;