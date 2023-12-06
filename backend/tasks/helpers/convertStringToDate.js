const convertStringToDate = (dateString) => {
  try {
    const dateParts = dateString.split("-");

    if (dateParts.length !== 3) {
      throw new Error(`Invalid date format. It should be mm-dd-yyyy`);
    }

    const month = parseInt(dateParts[0]);
    const day = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);

    if (month < 1 || month > 12) {
      throw new Error(`Month should be between 1 and 12`);
    }

    const maxDaysInMonth = new Map([
      [1, 31], // January
      [
        2,
        (year) =>
          year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28,
      ], // February (leap year check)
      [3, 31], // March
      [4, 30], // April
      [5, 31], // May
      [6, 30], // June
      [7, 31], // July
      [8, 31], // August
      [9, 30], // September
      [10, 31], // October
      [11, 30], // November
      [12, 31], // December
    ]);

    const maxDayForMonth = maxDaysInMonth.get(month);

    if (!maxDayForMonth) {
      throw new Error(`Invalid month`);
    }

    if (day < 1 || day > maxDayForMonth(year)) {
      throw new Error(`Day should be between 1 and ${maxDayForMonth(year)}`);
    }

    const convertedDate = new Date(year, month - 1, day);

    if (isNaN(convertedDate.getTime())) {
      throw new Error("Invalid date");
    }

    return convertedDate;
  } catch (error) {
    console.error(`Error converting date: ${error.message}`);
    return null;
  }
};

module.exports = convertStringToDate;
