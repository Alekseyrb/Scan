import React from 'react';
import AppNavigator from './src/Navigation/Navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { AuthProvider } from "./src/store/AuthContext";

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
