import api from './api';

/**
 * Сервис для работы с покупками
 */
const PurchaseService = {
  /**
   * Получить покупку по ID
   * @param {number} purchaseId ID покупки
   */
  async getPurchaseById(purchaseId) {
    try {
      const response = await api.get(`/purchases/${purchaseId}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении покупки с ID ${purchaseId}:`, error);
      throw error;
    }
  },

  /**
   * Создать новую покупку
   * @param {Object} purchaseData данные покупки
   */
  async createPurchase(purchaseData) {
    try {
      const response = await api.post('/purchases', purchaseData);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании покупки:', error);
      throw error;
    }
  },

  /**
   * Обновить существующую покупку
   * @param {number} purchaseId ID покупки
   * @param {Object} purchaseData данные для обновления
   */
  async updatePurchase(purchaseId, purchaseData) {
    try {
      const response = await api.put(`/purchases/${purchaseId}`, purchaseData);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при обновлении покупки с ID ${purchaseId}:`, error);
      throw error;
    }
  },

  /**
   * Удалить покупку
   * @param {number} purchaseId ID покупки
   */
  async deletePurchase(purchaseId) {
    try {
      await api.delete(`/purchases/${purchaseId}`);
      return true;
    } catch (error) {
      console.error(`Ошибка при удалении покупки с ID ${purchaseId}:`, error);
      throw error;
    }
  },
  
  /**
   * Добавить участника в покупку
   * @param {number} purchaseId ID покупки
   * @param {number} userId ID пользователя
   */
  async addParticipant(purchaseId, userId) {
    try {
      const response = await api.post(`/purchases/${purchaseId}/participants/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при добавлении участника в покупку:`, error);
      throw error;
    }
  },

  /**
   * Удалить участника из покупки
   * @param {number} purchaseId ID покупки
   * @param {number} userId ID пользователя
   */
  async removeParticipant(purchaseId, userId) {
    try {
      const response = await api.delete(`/purchases/${purchaseId}/participants/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при удалении участника из покупки:`, error);
      throw error;
    }
  }
};

export default PurchaseService; 