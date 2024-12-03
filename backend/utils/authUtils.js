const userAuthRegisterUtils = async (
  firstname,
  lastname,
  age,
  gender,
  user_address,
  email,
  phone_number,
  bio,
  user_language,
  topics
) => {
  if (
    !firstname ||
    !lastname ||
    !age ||
    !gender ||
    !user_address ||
    !email ||
    !phone_number ||
    !bio ||
    !user_language ||
    !topics
  ) {
    return { success: false, message: "Fill all the fields" };
  }

  try {
    if (!emailValidate(email)) {
      return { success: false, message: "Enter a valid email address" };
    }

    const genders = ["MALE", "FEMALE"];

    if (!genders.includes(gender.toUpperCase())) {
      return { success: false, message: "Gender can only be Male or Female" };
    }

    if (Number(phone_number).length < 10 || isNaN(phone_number) == true) {
      return { success: false, message: "Enter a valid 10 digit phone no." };
    }

    const user = await db.query("SELECT id FROM Customer WHERE email=$1", [
      email,
    ]);
    console.log(user.rowCount);

    if (Number(user.rowCount) > 0) {
      return { success: false, message: "Email already exists." };
    }

    return { success: true, message: "No user auth errors found." };
  } catch (error) {
    return { success: false, message: error };
  }
};

module.export = userAuthRegisterUtils;
