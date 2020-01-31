function isEmpty(string) {
  if (string.trim() === "") return true;
  else return false;
}
function isEmail(string) {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (string.match(emailRegEx)) return true;
  else return false;
}
function isvalidYear(year){
if(year>=0 && year<=4) return true
else return false
}

module.exports.validate = (user, isSignup = false) => {
  let errors = {};
  const emptyerr = "can not be empty";
  const notvalid = "Not valid";

  if (isEmpty(user.email)) {
    errors.email = emptyerr;
  } else if (!isEmail(user.email)) {
    errors.email = notvalid;
  }
  if (isEmpty(user.password)) {
    errors.password = emptyerr;
  }
  if (isSignup) {
    if (isEmpty(user.confirmPassword)) {
      errors.confirmPassword = emptyerr;
    } else if (user.password !== user.confirmPassword) {
      errors.confirmPassword = "doesn't match password";
    }

    if (isEmpty(user.name)) {
      errors.name = emptyerr;
    }
    // validation for major & year will be done later XXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXX
    if (isEmpty(user.major)) {
      errors.major = emptyerr;
    }
    if (!isvalidYear(user.year)) {
      errors.year = notvalid;
    }
  }

  return errors;
};
