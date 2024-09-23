/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import GlobalProvider from './src/context/Provider';
import AppNavContainer from './src/navigations';


import colors from './src/theme/colors';

function App() {

  const backgroundStyle = {
    flex: 1,
    backgroundColor: colors.primary,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
       
        backgroundColor={backgroundStyle.backgroundColor}
      />
    
     <GlobalProvider>
      <AppNavContainer/>
     </GlobalProvider>
    
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

});

export default App;
