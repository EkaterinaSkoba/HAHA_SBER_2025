// Это заглушка для будущей интеграции с API Сбербанка
// В реальной реализации здесь будут функции для взаимодействия с API

export interface SberbankPaymentParams {
  amount: number;
  description: string;
  returnUrl: string;
  failUrl: string;
  orderNumber: string;
}

export interface SberbankPaymentResponse {
  success: boolean;
  errorCode?: string;
  errorMessage?: string;
  orderId?: string;
  formUrl?: string; // URL для перенаправления на страницу оплаты
}

/**
 * Инициировать платеж через API Сбербанка
 * В реальной реализации будет отправлять запрос к API
 */
export async function initiatePayment(params: SberbankPaymentParams): Promise<SberbankPaymentResponse> {
  // Заглушка, которая имитирует успешный ответ от API
  console.log('Имитация вызова API Сбербанка с параметрами:', params);
  
  // В реальности здесь будет запрос к API
  return {
    success: true,
    orderId: `ORDER-${Date.now()}`,
    formUrl: `https://payment.sberbank.ru/dummy-payment?orderId=ORDER-${Date.now()}`
  };
}

/**
 * Проверить статус платежа
 * В реальной реализации будет проверять статус платежа через API
 */
export async function checkPaymentStatus(orderId: string): Promise<{status: 'CREATED' | 'PAID' | 'FAILED' | 'CANCELED'}> {
  console.log('Имитация проверки статуса платежа для orderId:', orderId);
  
  // В реальности здесь будет запрос к API
  return {
    status: 'PAID'
  };
}

/**
 * Отменить платеж
 * В реальной реализации будет отменять платеж через API
 */
export async function cancelPayment(orderId: string): Promise<{success: boolean, errorMessage?: string}> {
  console.log('Имитация отмены платежа для orderId:', orderId);
  
  // В реальности здесь будет запрос к API
  return {
    success: true
  };
} 