import api from './api';

/**
 * Сервис для работы с мероприятиями
 */
const EventService = {
  /**
   * Получить список всех мероприятий
   */
  async getEvents() {
    try {
      const response = await api.get('/events');
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении списка мероприятий:', error);
      throw error;
    }
  },

  /**
   * Получить мероприятие по ID
   * @param {number} eventId ID мероприятия
   */
  async getEventById(eventId) {
    try {
      const response = await api.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении мероприятия с ID ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Создать новое мероприятие
   * @param {Object} eventData данные мероприятия
   */
  async createEvent(eventData) {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании мероприятия:', error);
      throw error;
    }
  },

  /**
   * Обновить существующее мероприятие
   * @param {number} eventId ID мероприятия
   * @param {Object} eventData данные для обновления
   */
  async updateEvent(eventId, eventData) {
    try {
      const response = await api.put(`/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при обновлении мероприятия с ID ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Удалить мероприятие
   * @param {number} eventId ID мероприятия
   */
  async deleteEvent(eventId) {
    try {
      await api.delete(`/events/${eventId}`);
      return true;
    } catch (error) {
      console.error(`Ошибка при удалении мероприятия с ID ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Добавить участника в мероприятие
   * @param {number} eventId ID мероприятия
   * @param {number} userId ID пользователя
   */
  async addParticipant(eventId, userId) {
    try {
      const response = await api.post(`/events/${eventId}/participants/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при добавлении участника в мероприятие:`, error);
      throw error;
    }
  },

  /**
   * Удалить участника из мероприятия
   * @param {number} eventId ID мероприятия
   * @param {number} userId ID пользователя
   */
  async removeParticipant(eventId, userId) {
    try {
      const response = await api.delete(`/events/${eventId}/participants/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при удалении участника из мероприятия:`, error);
      throw error;
    }
  },

  /**
   * Получить покупки мероприятия
   * @param {number} eventId ID мероприятия
   */
  async getEventPurchases(eventId) {
    try {
      const response = await api.get(`/events/${eventId}/purchases`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении списка покупок мероприятия:`, error);
      throw error;
    }
  },

  /**
   * Получить задачи мероприятия
   * @param {number} eventId ID мероприятия
   */
  async getEventTasks(eventId) {
    try {
      const response = await api.get(`/events/${eventId}/tasks`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении списка задач мероприятия:`, error);
      throw error;
    }
  },

  /**
   * Получить итоги мероприятия (расчеты)
   * @param {number} eventId ID мероприятия
   */
  async getEventResults(eventId) {
    try {
      const response = await api.get(`/events/${eventId}/results`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении итогов мероприятия:`, error);
      throw error;
    }
  },
  
  /**
   * Получить участников мероприятия
   * @param {number} eventId ID мероприятия
   */
  async getEventParticipants(eventId) {
    try {
      const response = await api.get(`/events/${eventId}/participants`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении участников мероприятия:`, error);
      throw error;
    }
  }
};

export default EventService;