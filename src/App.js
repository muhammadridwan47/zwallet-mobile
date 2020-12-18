import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './Router';
import { Provider, useSelector,useDispatch } from "react-redux";
import configureStore from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import SplashScreen from 'react-native-splash-screen'
import FlashMessage from "react-native-flash-message";
import { LoadingShow } from './elements';

function MainApp() {
  const {loading} = useSelector(s => s.Loading);
  const dispatch = useDispatch()

  useEffect(() => {
    SplashScreen.hide();
    dispatch({type:'LOADING_STOP'})
    dispatch({type:'OFF'})
  },[])
  return (
    <>
        <NavigationContainer>
            <Router/>
        </NavigationContainer>
    <FlashMessage position="top" />
    {loading && <LoadingShow/>}
    </>
  );
}

const App = () => {
  const { store, persistor } = configureStore();
  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
          <MainApp />
      </PersistGate>
    </Provider>
   
    </>
  );
};

export default App;


