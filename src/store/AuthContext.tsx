import React, { createContext, useState, useContext } from 'react';

// Создаем контекст
const AuthContext = createContext();

// Создаем компонент-поставщик, который будет содержать состояние и логику для аутентификации
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Функция для входа в систему
  const setLoginToken = (tokenValue) => {
    setToken(tokenValue);
  };

  // Функция для выхода из системы
  const logout = () => {
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
