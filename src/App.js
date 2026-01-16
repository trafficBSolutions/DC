import { Routes, Route } from 'react-router-dom'
import { Home, NotFound } from './pages';
import CompanyProfile from './pages/CompanyProfile';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>

     <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/company/:companyName" element={<CompanyProfile/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
