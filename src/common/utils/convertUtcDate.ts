export function convertUtcDate(dateString: string) {
  const newDate = new Date(dateString);
  const fullDateTime = newDate.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const [time, date] = fullDateTime.split(' ');
  return { date, time, fullDateTime };
}
