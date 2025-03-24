import api from './api';

/**
 * Сервис для работы с пользователями
 */
const UserService = {
  /**
   * Авторизация пользователя
   * @param {string} email Email пользователя
   * @param {string} password Пароль пользователя
   */
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Сохраняем токен и данные пользователя
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      throw error;
    }
  },

  /**
   * Регистрация нового пользователя
   * @param {Object} userData данные пользователя
   */
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      throw error;
    }
  },

  /**
   * Выход пользователя
   */
  async logout() {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      throw error;
    }
  },

  /**
   * Получить текущего пользователя
   */
  async getCurrentUser() {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
      throw error;
    }
  },

  /**
   * Обновить профиль пользователя
   * @param {Object} userData данные пользователя
   */
  async updateProfile(userData) {
    try {
      const response = await api.put('/users/me', userData);
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      throw error;
    }
  },

  /**
   * Получить список всех пользователей (для админа)
   */
  async getAllUsers() {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении списка пользователей:', error);
      throw error;
    }
  },
  
  /**
   * Проверка аутентификации пользователя
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  /**
   * Получить данные текущего пользователя из localStorage
   */
  getUserData() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
};

export default UserService; 