const emailValidate = (email) => {
  let emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegExp.test(email);
};

module.exports = emailValidate;
