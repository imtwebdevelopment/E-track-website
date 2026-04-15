// --- orderUtils.js ---
// Utility functions for generating IDs and simulating order saving

/**
 * Generate a unique, sequential order ID (like ETRFS10001)
 */
export const generateOrderId = (prefix = 'ETRFS') => {
  const lastId = localStorage.getItem('lastOrderId') || 10000;
  const newId = parseInt(lastId) + 1;
  localStorage.setItem('lastOrderId', newId);
  return `${prefix}${newId}`;
};

/**
 * Simulate saving the order to a "database"
 */
export const simulateOrderSubmission = (details) => {
  const orderId = generateOrderId();
  const finalOrder = {
    orderId,
    submissionDate: new Date().toLocaleString(),
    ...details,
  };
  console.log(`Order ID ${orderId} submitted.`, finalOrder);
  return finalOrder;
};
