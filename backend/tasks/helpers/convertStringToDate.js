const convertStringToDate = (dateString) => {
  try {
    const dateParts = dateString.split("-");

    if (dateParts.length !== 3) {
      throw new Error("Invalid date format");
    }

    const month = parseInt(dateParts[0]);
    const day = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);

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
