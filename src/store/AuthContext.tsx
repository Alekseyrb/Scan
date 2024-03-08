import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Создаем контекст
interface AuthContextType {
  token: any;
  setLoginToken: (tokenValue: any) => void;
  logout: () => void;
}

// Создание контекста с начальным значением типа AuthContextType
const AuthContext = createContext<AuthContextType | undefined>(undefined);


// Создаем компонент-поставщик, который будет содержать состояние и логику для аутентификации
const AuthProvider = ({ children }:any) => {
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    // Асинхронная функция для получения токена из хранилища при инициализации
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    };

    loadToken();
  }, []);

  // Функция для входа в систему
  const setLoginToken = async (tokenValue:any) => {
    await AsyncStorage.setItem('token', tokenValue);
    setToken(tokenValue);
  };

  // Функция для выхода из системы
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setLoginToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Создаем хук для удобного доступа к контексту аутентификации
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
