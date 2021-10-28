import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { SideBar, ThemeProvider, MainWrapper } from './components';
import { MainContextProvider } from './context/MainContext';
import { SideBarProvider } from './context/SidebarContext';
import { routes } from './routes';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainContextProvider>
          <SideBarProvider>
            <SideBar />
            <MainWrapper>
              <Switch>
                {routes.map((item) => (
                  <Route
                    exact
                    key={Math.random()}
                    path={item.path}
                    component={item.component}
                  />
                ))}
                <Redirect from="*" to="/overview" />
              </Switch>
            </MainWrapper>
          </SideBarProvider>
        </MainContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
