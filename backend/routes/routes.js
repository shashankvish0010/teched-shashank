const express = require("express");
const router = express.Router();

const {
  initialServer,
  userRegister,
  editBio,
  prefLanguage,
  addEducation,
  editEducation,
  addEducation,
  addExperience,
  editExperience,
  addSocial,
  editSocial,
} = require("../controllers/authController");
router.get("/", initialServer);

router.post("/user/register", userRegister);

router.put("/user/edit/bio/:userId", editBio);

router.post("/add/language/:userId", prefLanguage);

router.post("/add/education/:userId", addEducation);

router.put("/edit/education/:userId", editEducation);

router.post("/add/experience/:userId", addExperience);

router.put("/edit/experience/:loanId", editExperience);

router.post("/add/social/:userId", addSocial);

router.put("/edit/social/:userId/", editSocial);

module.exports = router;
