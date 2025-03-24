import { EventWithDetails, UserBalance, PaymentMessage, User } from '../models/types';

/**
 * Рассчитывает баланс каждого участника (сколько потратил и сколько должен)
 */
export function calculateUserBalances(event: EventWithDetails): UserBalance[] {
  const userBalances: UserBalance[] = event.participants.map(participant => {
    // Сколько потратил участник (сумма всех его затрат на предметы)
    const spent = event.items
      .filter(item => item.responsibleId === participant.id && item.price !== null)
      .reduce((sum, item) => sum + (item.price || 0), 0);
    
    // Сколько должен заплатить участник (доля в каждом предмете, в котором он участвует)
    const shouldPay = event.items
      .filter(item => item.participants.includes(participant.id) && item.price !== null)
      .reduce((sum, item) => {
        const participantsCount = item.participants.length || 1;
        return sum + ((item.price || 0) / participantsCount);
      }, 0);
    
    // Разница (может быть положительной или отрицательной)
    const balance = spent - shouldPay;
    
    return {
      userId: participant.id,
      userName: participant.name,
      spent,
      shouldPay,
      balance
    };
  });
  
  // Сортируем - сначала те, кто должен перевести (отрицательный баланс), потом те, кому должны перевести
  return userBalances.sort((a, b) => a.balance - b.balance);
}

/**
 * Генерирует сообщения для переводов денег между участниками
 */
export function generatePaymentMessages(
  userBalances: UserBalance[],
  event: EventWithDetails,
  paymentDetails: string
): PaymentMessage[] {
  const messages: PaymentMessage[] = [];
  
  // Участники, которые должны получить деньги (потратили больше, чем их доля)
  const creditors = userBalances.filter(balance => balance.balance > 0);
  
  // Участники, которые должны заплатить (потратили меньше, чем их доля)
  const debtors = userBalances.filter(balance => balance.balance < 0);
  
  for (const debtor of debtors) {
    // Сколько всего должен этот участник
    let remainingDebt = Math.abs(debtor.balance);
    
    // Для каждого должника сформируем список предметов, за которые он платит
    const items = event.items
      .filter(item => item.participants.includes(debtor.userId) && item.price !== null)
      .map(item => {
        const participantsCount = item.participants.length || 1;
        const amount = (item.price || 0) / participantsCount;
        return {
          id: item.id,
          name: item.name,
          amount
        };
      });
    
    // Распределяем долг между кредиторами
    for (const creditor of creditors) {
      if (remainingDebt <= 0) break;
      
      // Сколько может получить этот кредитор
      const availableCredit = creditor.balance;
      
      // Сколько переводим этому кредитору
      const transferAmount = Math.min(remainingDebt, availableCredit);
      
      if (transferAmount > 0) {
        messages.push({
          fromUserId: debtor.userId,
          fromUserName: debtor.userName,
          toUserId: creditor.userId,
          toUserName: creditor.userName,
          amount: Math.round(transferAmount * 100) / 100, // Округляем до копеек
          items,
          paymentDetails
        });
        
        // Уменьшаем оставшийся долг
        remainingDebt -= transferAmount;
        
        // Уменьшаем доступный кредит у кредитора
        creditor.balance -= transferAmount;
      }
    }
  }
  
  return messages;
}

/**
 * Генерирует текст сообщения для перевода средств
 */
export function formatPaymentMessage(message: PaymentMessage): string {
  // Форматирование списка предметов
  const itemsList = message.items
    .map(item => `${item.name} (${item.amount.toFixed(2)} ₽)`)
    .join('\n- ');
  
  return `Привет, ${message.fromUserName}!\n\nПожалуйста, переведи ${message.amount.toFixed(2)} ₽ за:\n- ${itemsList}\n\nДанные для перевода:\n${message.paymentDetails}`;
} 