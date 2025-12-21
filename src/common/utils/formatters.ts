export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
};

/**
 * Convert date string from date input (YYYY-MM-DD) to UTC ISO string
 * @param dateString - Date string in format YYYY-MM-DD
 * @param isEndOfDay - If true, set to end of day (23:59:59.999), otherwise start of day (00:00:00.000)
 * @returns UTC ISO string in format YYYY-MM-DDTHH:mm:ss.sssZ
 */
export const convertDateToUtcIso = (dateString: string, isEndOfDay: boolean = false): string => {
  if (!dateString) return '';
  
  // Parse date string (YYYY-MM-DD) directly
  const [year, month, day] = dateString.split('-').map(Number);
  
  // Create UTC date directly from components
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  
  if (isEndOfDay) {
    // Set to end of day: 23:59:59.999
    utcDate.setUTCHours(23, 59, 59, 999);
  } else {
    // Set to start of day: 00:00:00.000
    utcDate.setUTCHours(0, 0, 0, 0);
  }
  
  // Return ISO string
  return utcDate.toISOString();
};