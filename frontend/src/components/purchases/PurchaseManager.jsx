import React, { useState } from 'react';
import PurchasesList from './PurchasesList';
import PurchaseForm from './PurchaseForm';
import PurchaseDetails from './PurchaseDetails';

/**
 * Компонент для управления представлениями покупок (список, форма, детали)
 */
export const PurchaseManager = ({ eventId }) => {
  const [view, setView] = useState('list'); // 'list', 'form', 'details'
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  // Обработчик для добавления новой покупки
  const handleAddPurchase = () => {
    setSelectedPurchase(null);
    setView('form');
  };

  // Обработчик для редактирования покупки
  const handleEditPurchase = (purchase) => {
    setSelectedPurchase(purchase);
    setView('form');
  };

  // Обработчик для просмотра деталей покупки
  const handleViewPurchaseDetails = (purchase) => {
    setSelectedPurchase(purchase);
    setView('details');
  };

  // Обработчик для удаления покупки
  const handleDeletePurchase = (purchaseId) => {
    setView('list');
  };

  // Обработчик для возврата к списку покупок
  const handleReturnToList = () => {
    setView('list');
    setSelectedPurchase(null);
  };

  // Обработчик для сохранения покупки
  const handleSavePurchase = (purchase) => {
    setView('list');
    setSelectedPurchase(null);
  };

  // Обработчик для закрытия деталей покупки
  const handleCloseDetails = () => {
    setView('list');
    setSelectedPurchase(null);
  };

  return (
    <div className="space-y-4">
      {view === 'list' && (
        <PurchasesList
          eventId={eventId}
          onAddPurchase={handleAddPurchase}
          onEditPurchase={handleViewPurchaseDetails}
          onDeletePurchase={handleDeletePurchase}
        />
      )}
      
      {view === 'form' && (
        <PurchaseForm
          eventId={eventId}
          purchase={selectedPurchase}
          onCancel={handleReturnToList}
          onSave={handleSavePurchase}
        />
      )}
      
      {view === 'details' && selectedPurchase && (
        <PurchaseDetails
          purchase={selectedPurchase}
          onClose={handleCloseDetails}
          onEdit={() => handleEditPurchase(selectedPurchase)}
          onDelete={handleDeletePurchase}
        />
      )}
    </div>
  );
};

export default PurchaseManager; 