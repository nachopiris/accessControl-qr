const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber.slice(0, 3) !== "549") {
    return "549" + phoneNumber;
  }
  return phoneNumber;
};

module.exports = formatPhoneNumber;
