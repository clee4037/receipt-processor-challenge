const countAlphanumericChars = (retailerString) => {
  return retailerString.replace(/[^a-zA-Z0-9]/g, "").length;
};

const isRoundDoller = (total) => {
  return Number.isInteger(total) ? 1 : 0;
};

const isMultipleOfQuarter = (total) => {
  return total % 0.25 === 0 ? 1 : 0;
};

const countEveryTwoItems = (items) => {
  return Math.floor(items.length / 2);
};

const itemDescriptionPoints = (items) => {
  let totalPoints = 0;
  items.forEach((item) => {
    const trimmedLength = item.shortDescription.trim().length;
    totalPoints += trimmedLength % 3 === 0 ? Math.ceiling(item.price * 0.2) : 0;
  });
  return totalPoints;
};

const isOddDay = (dateString) => {
  const day = parseInt(dateString.split("-")[2], 10);
  return day % 2 === 1 ? 1 : 0;
};

const isBetweenTimes = (time, startHour = 14, endHour = 16) => {
  const splitTime = time.split(":");
  const hour = splitTime[0];
  const min = splitTime[1];
  if ((hour === startHour && min > 0) || hour === endHour - 1) {
    return 10;
  }
  return 0;
};

const calculatePoints = (receipt) => {
  return (
    countAlphanumericChars(receipt.retailer) +
    50 * isRoundDoller(receipt.total) +
    25 * isMultipleOfQuarter(receipt.total) +
    5 * countEveryTwoItems(receipt.items) +
    itemDescriptionPoints(receipt.items) +
    6 * isOddDay(receipt.purchaseDate) +
    10 * isBetweenTimes(receipt.purchaseTime, 14, 16)
  );
};
