import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// React fragment or tsx component
import Home from '@/pages/home/Home';
import Upload from '@/pages/upload/Upload';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

ReactDOM.render(
  <React.StrictMode>
    <NavigationBar />
    <BrowserRouter>
      <Routes>
        <Route path="upload" element={<Upload />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </React.StrictMode>,
  document.getElementById('root'),
);
