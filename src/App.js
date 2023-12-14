import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Sidebar, Footer, ThemeSettings } from './components';
import { Ecommerce, Productos, Categorias, Personas, Presentacion, Lote, Ingreso, Salida } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import LoginPage from './LoginPage.js';

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings
  } = useStateContext();

  const [dataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Ajustes" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {/* Modificación para desactivar todo el div del Sidebar */}
          {activeMenu && window.location.pathname !== '/' && (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          )}

          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="w-full min-h-screen flex-2 bg-main-bg dark:bg-main-dark-bg">
                      {themeSettings && <ThemeSettings />}
                      <LoginPage />
                    </div>
                  }
                />
                <Route
                  path="/inicio"
                  element={
                    <div>
                      <Navbar />
                      <Ecommerce />
                      <Footer />
                    </div>
                  }
                />

                {/*  pages */}
                <Route path="/categorias"
                  element={
                    <div>
                      <Navbar />
                      <Categorias dataUpdated={dataUpdated} />
                      <Footer />
                    </div>
                  } />
                <Route path="/presentacion"
                  element={
                    <div>
                      <Navbar />
                      <Presentacion dataUpdated={dataUpdated} />
                      <Footer />
                    </div>
                  } />
                <Route path="/productos"
                  element={
                    <div>
                      <Navbar />
                      <Productos />
                      <Footer />
                    </div>
                  } />
                <Route path="/personas"
                  element={
                    <div>
                      <Navbar />
                      <Personas dataUpdated={dataUpdated} />
                      <Footer />
                    </div>
                  } />
                {/* apps */}
                <Route path="/Lote"
                  element={
                    <div>
                      <Navbar />
                      <Lote />
                      <Footer />
                    </div>
                  } />
                <Route path="/Ingreso"
                  element={
                    <div>
                      <Navbar />
                      <Ingreso />
                      <Footer />
                    </div>
                  } />
                <Route path="/Salida"
                  element={
                    <div>
                      <Navbar />
                      <Salida />
                      <Footer />
                    </div>
                  } />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
