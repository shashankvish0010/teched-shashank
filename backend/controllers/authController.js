const crypto = require("crypto");
const db = require("../dbconnect");
const userAuthRegisterUtils = require("../utils/authUtils");

const initialServer = (req, res) => {
  res.json({ success: true, message: `Hello from teched loan app server.` });
};

const userRegister = async (req, res) => {
  const id = crypto.randomUUID();
  console.log(id);

  const {
    firstname,
    lastname,
    age,
    gender,
    user_address,
    email,
    phone_number,
    bio,
    user_language,
    topics,
  } = req.body;
  const authWarnings = await userAuthRegisterUtils(
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
  );
  if (!authWarnings?.success) {
    res.json(authWarnings);
    return;
  }
  try {
    const result = await db.query(
      "INSERT INTO Customer(id, firstname, lastname, age, gender, user_address, email, phone_number, bio, user_language, topics) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id",
      [
        id,
        firstname,
        lastname,
        age,
        gender,
        user_address,
        email,
        phone_number,
        bio,
        user_language,
        topics,
      ]
    );
    if (result) {
      res.json({ success: true, message: "Registered Successfully" });
    } else {
      res.json({ success: false, message: "Not Registered Successfully" });
    }
  } catch (error) {
    console.log("Error occured while registration", error);
    res.json({ success: false, message: "Error occured while registration" });
  }
};

const editDetails = async () => {
  const { firstname, lastname, age, gender, user_address, email } = req.body;
  const userId = req.params;
  if (!userId) {
    res.json({ success: false, message: "No user id found in url" });
  }
  try {
    const result = await db.query("SELECT * FROM Customer WHERE id=$1", [
      userId,
    ]);

    if (Number(result.row) <= 0) {
      res.json({ success: false, message: "No user found" });
    }

    const respone = db.query(
      "UPDATE SET firstname=$1, lastname=$2, age=$3, gender=$4, user_address=$5, email=$6 WHERE id=$7 RETURNING *",
      [firstname, lastname, age, gender, user_address, email, userId]
    );

    if (respone) {
      res.json({
        success: true,
        date: respone,
        message: "Update Successfully",
      });
    }
  } catch (error) {
    console.log("Error occured while update", error);
    res.json({ success: false, message: "Error occured while update" });
  }
};

const editBio = async () => {
  const { bio } = req.body;
  const { userId } = req.params();

  if (!userId) {
    res.json({ success: false, message: "No user id found in url" });
  }
  try {
    const result = await db.query("SELECT * FROM Customer WHERE id=$1", [
      userId,
    ]);

    if (Number(result.row) <= 0) {
      res.json({ success: false, message: "No user found" });
    }

    const respone = db.query("UPDATE SET bio=$1 WHERE id=$2 RETURNING *", [
      bio,
      userId,
    ]);

    if (respone) {
      res.json({
        success: true,
        date: respone,
        message: "Update Successfully",
      });
    }
  } catch (error) {
    console.log("Error occured while update", error);
    res.json({ success: false, message: "Error occured while update" });
  }
};

const prefLanguage = async () => {
  const { language } = req.body;
  const { userId } = req.params();

  if (!userId) {
    res.json({ success: false, message: "No user id found in url" });
  }

  if (!language) {
    res.json({ success: false, message: "Langage cannot be empty" });
  }

  const lang = ["English", "Spanish", "Arabic", "Tamil", "Hindi"];

  if (!lang.includes(language)) {
    res.json({
      success: false,
      message:
        "Languages can only be: English', 'Spanish', 'Arabic', 'Tamil', 'Hindi'",
    });
  }

  try {
    const result = await db.query("SELECT * FROM Customer WHERE id=$1", [
      userId,
    ]);

    if (Number(result.row) <= 0) {
      res.json({ success: false, message: "No user found" });
    }

    const respone = db.query(
      "UPDATE SET user_language=$1 WHERE id=$2 RETURNING *",
      [language, userId]
    );

    if (respone) {
      res.json({
        success: true,
        date: respone,
        message: "Update Successfully",
      });
    }
  } catch (error) {
    console.log("Error occured while update", error);
    res.json({ success: false, message: "Error occured while update" });
  }
};

const addEducation = async () => {
  const { degree, college, field, start_date, end_date } = req.body;
  const { userId } = req.params();
  const id = crypto.randomUUID();

  if (!userId) {
    res.json({ success: false, message: "No user id found in url" });
  }

  if (!degree || !college || !field || !start_date || !end_date) {
    res.json({ success: false, message: "Fields cannot be empty" });
  }

  try {
    const result = await db.query("SELECT * FROM Customer WHERE id=$1", [
      userId,
    ]);

    if (Number(result.row) <= 0) {
      res.json({ success: false, message: "No user found" });
    }

    const response = await db.query(
      "INSERT INTO Customer(id, userId, degree, college, field, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [id, userId, degree, college, field, start_date, end_date]
    );
    if (response) {
      res.json({ success: true, message: "Education added Successfully" });
    } else {
      res.json({ success: false, message: "Education not added Successfully" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error occured while adding education.",
    });
  }
};

const editEducation = async () => {
  const { degree, college, field, start_date, end_date } = req.body;
  const { userId } = req.params();

  if (!userId) {
    res.json({ success: false, message: "No user id found in url" });
  }

  if (!degree || !college || !field || !start_date || !end_date) {
    res.json({ success: false, message: "Fields cannot be empty" });
  }

  try {
    const result = await db.query("SELECT * FROM Customer WHERE id=$1", [
      userId,
    ]);

    if (Number(result.row) <= 0) {
      res.json({ success: false, message: "No user found" });
    }

    const response = await db.query(
      "UPDATE Education SET degree=$1, college=$2, field=$3, start_date=$4, end_date=$5 WHERE userId=$6 RETURNING *",
      [degree, college, field, start_date, end_date, userId]
    );

    if (response) {
      res.json({ success: true, message: "Education added Successfully" });
    } else {
      res.json({ success: false, message: "Education not added Successfully" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error occured while adding education.",
    });
  }
};

const addExperience = async () => {
  const id = crypto.randomUUID();

  const {
    job_title,
    company,
    start_date,
    end_date,
    employement_type,
    industry,
    location,
  } = req.body;
  const { userId } = req.params();

  if (!userId) {
    res.json({ success: false, message: "No user id found in url" });
  }

  if (
    !job_title ||
    !company ||
    !start_date ||
    !end_date ||
    !employement_type ||
    !industry ||
    !location
  ) {
    res.json({ success: false, message: "Fields cannot be empty" });
  }

  try {
    const result = await db.query("SELECT * FROM Customer WHERE id=$1", [
      userId,
    ]);

    if (Number(result.row) <= 0) {
      res.json({ success: false, message: "No user found" });
    }

    const response = await db.query(
      "INSERT INTO Experience(id, userId, job_title, company, start_date, end_date, employement_type, industry, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        id,
        userId,
        job_title,
        company,
        start_date,
        end_date,
        employement_type,
        industry,
        location,
      ]
    );
    if (response) {
      res.json({ success: true, message: "Experience added Successfully" });
    } else {
      res.json({
        success: false,
        message: "Experience not added Successfully",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error occured while adding Experience.",
    });
  }
};

const editExperience = async () => {
  const {
    job_title,
    company,
    start_date,
    end_date,
    employement_type,
    industry,
    location,
  } = req.body;
  const { userId } = req.params();

  if (!userId) {
    res.json({ success: false, message: "No user id found in url" });
  }
  if (
    !job_title ||
    !company ||
    !start_date ||
    !end_date ||
    !employement_type ||
    !industry ||
    !location
  ) {
    res.json({ success: false, message: "Fields cannot be empty" });
  }

  try {
    const result = await db.query("SELECT * FROM Customer WHERE id=$1", [
      userId,
    ]);

    if (Number(result.row) <= 0) {
      res.json({ success: false, message: "No user found" });
    }

    const response = await db.query(
      "UPDATE Experience SET job_title=$1,company=$2, start_date=$3, end_date=$4, employement_type=$5, industry=$6, location=$8 WHERE id=$9 RETURNING *",
      [
        job_title,
        company,
        start_date,
        end_date,
        employement_type,
        industry,
        location,
        userId,
      ]
    );

    if (response) {
      res.json({ success: true, message: "Education added Successfully" });
    } else {
      res.json({ success: false, message: "Education not added Successfully" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error occured while adding education.",
    });
  }
};

const addSocial = async () => {
  const { linkedin, instagram, facebook, x } = req.body;
  const { userId } = req.params();

  if (!userId) {
    res.json({ success: false, message: "No user id found in url" });
  }

  if (!linkedin || !instagram || !facebook || !x) {
    res.json({ success: false, message: "Fields cannot be empty" });
  }

  try {
    const result = await db.query("SELECT * FROM Customer WHERE id=$1", [
      userId,
    ]);

    if (Number(result.row) <= 0) {
      res.json({ success: false, message: "No user found" });
    }

    const response = await db.query(
      "INSERT INTO Social(id, userId, linkedin, instagram, facebook, x) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id, userId, linkedin, instagram, facebook, x]
    );
    if (response) {
      res.json({ success: true, message: "Socail media added Successfully" });
    } else {
      res.json({
        success: false,
        message: "Socail media not added Successfully",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error occured while adding Socail media.",
    });
  }
};

const editSocial = async () => {
  const { linkedin, instagram, facebook, x } = req.body;
  const { userId } = req.params();

  if (!userId) {
    res.json({ success: false, message: "No user id found in url" });
  }

  if (!linkedin || !instagram || !facebook || !x) {
    res.json({ success: false, message: "Fields cannot be empty" });
  }

  try {
    const result = await db.query("SELECT * FROM Customer WHERE id=$1", [
      userId,
    ]);

    if (Number(result.row) <= 0) {
      res.json({ success: false, message: "No user found" });
    }

    const response = await db.query(
      "UPDATE Social SET linkedin=$1, instagram=$2, facebook=$3, x=$4 WHERE id=$5 RETURNING *",
      [linkedin, instagram, facebook, x, userId]
    );

    if (response) {
      res.json({ success: true, message: "Education added Successfully" });
    } else {
      res.json({ success: false, message: "Education not added Successfully" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error occured while adding education.",
    });
  }
};

module.exports = {
  initialServer,
  userRegister,
  editDetails,
  editBio,
  prefLanguage,
  addEducation,
  editEducation,
  addExperience,
  editExperience,
  addSocial,
  editSocial,
};
