export const calculateTimeSince = (date: string) => {
  const seconds = Math.floor((+new Date() - +new Date(date)) / 1000);

  let period = seconds / 31536000;

  if (period > 1) {
    return Math.floor(period) + ' years ago';
  }
  period = seconds / 2592000;
  if (period > 1) {
    return Math.floor(period) + ' months ago';
  }
  period = seconds / 86400;
  if (period > 1) {
    return Math.floor(period) + ' days ago';
  }
  period = seconds / 3600;
  if (period > 1) {
    return Math.floor(period) + ' hours ago';
  }
  period = seconds / 60;
  if (period > 1) {
    return Math.floor(period) + ' minutes ago';
  }
  return Math.floor(seconds) + ' seconds ago';
};

export const formatNumber = (number: number) => {
  switch (true) {
    case number < 1e3:
      return number;
    case number < 1e6:
      return +(number / 1e3).toFixed(1) + 'K';
    case number < 1e9:
      return +(number / 1e3).toFixed(1) + 'M';
    case number < 1e12:
      return +(number / 1e3).toFixed(1) + 'B';
  }
};
