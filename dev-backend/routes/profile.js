const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../model/Profile");

router.get("/developers", (req, res) => {
  console.log("hey");
  Profile.find().then((profiles) => {
    console.log("1");
    console.log(profiles);
    res.json(profiles);
  });
});

router.get("/developers/:handle", (req, res) => {
  console.log("handle");
  const handle_name = req.params.handle;
  Profile.findOne({ handle: req.params.handle }).then((profile) => {
    if (!profile) {
      console.log("no profile by that handle");
      return res
        .status(404)
        .json({ errors: "no profile found for that handle" });
    }
    console.log(profile);
    res.json(profile);
  });
});

// @route GET /api/profile
// @desc get profile of the user
// @access PRIVATE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    console.log(req.user);
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (!profile) {
        errors.noprofile = "No profile found for the user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    });
  }
);

// @route POST /api/profile
// @desc Create or Update Profle
// @access PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    console.log(req.user);
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newProfile = {};
      newProfile.user = req.user;
      newProfile.handle = req.body.handle;
      newProfile.status = req.body.status;
      if (req.body.company) {
        newProfile.company = req.body.company;
      }
      if (req.body.website) {
        newProfile.website = req.body.website;
      }
      if (req.body.bio) {
        newProfile.bio = req.body.bio;
      }
      if (req.body.githubusername) {
        newProfile.githubusername = req.body.githubusername;
      }
      if (req.body.skills) {
        newProfile.skills = req.body.skills.split(",");
      }
      newProfile.social = {};
      if (req.body.youtube) {
        newProfile.social.youtube = req.body.youtube;
      }
      if (req.body.linkedIn) {
        newProfile.social.linkedIn = req.body.linkedIn;
      }
      if (req.body.instagram) {
        newProfile.social.instagram = req.body.instagram;
      }
      // Create Profile
      if (!profile) {
        new Profile(newProfile).save().then((profile) => {
          return res.json({
            message: "profile added successfully",
            profile: profile,
          });
        });
      } else {
        console.log("profile exists");
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: newProfile },
          { new: true }
        ).then((profile) => {
          return res.json({
            message: "profile update successful",
            profile: profile,
          });
        });
      }
    });
  }
);

// @route GET /api/profile/education
// @desc get Education field
// @access PRIVATE
router.get(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (!profile) {
        return res.json({ noprofile: "no profile found for the user" });
      }
      return res.json({ education: profile.education });
    });
  }
);

// @route POST /api/profile/education
// @desc Create or Update Education
// @access PRIVATE
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    console.log(req.body);
    console.log("sdfsdf");
    Profile.findOne({ user: req.user.id }).then((profile) => {
      console.log(req.body);
      console.log("zzzzzzzzzzzzzzz");
      console.log(req.body.from);
      if (!profile) {
        return res.status(404).json({ profile: "no profile found" });
      }
      const newEdu = {};
      newEdu.school = req.body.school;
      newEdu.degree = req.body.degree;
      newEdu.grade = req.body.grade;
      newEdu.from = req.body.from;
      if (req.body.location) {
        newEdu.location = req.body.location;
      }
      if (req.body.to) {
        newEdu.to = req.body.to;
      }
      newEdu.current = req.body.current;
      if (req.body.description) {
        newEdu.description = req.body.description;
      }
      profile.education.unshift(newEdu);
      profile.save().then((profile) => {
        return res.json({
          message: "education updated successfully",
          profile: profile,
        });
      });
    });
  }
);

// @route DELETE /api/profile/education
// @desc Delete Education By ID
// @access PRIVATE
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const edu_id = req.params.edu_id;
    console.log(edu_id);
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const removeIndex = profile.education.findIndex(
        (edu) => edu._id.toString() === edu_id
      );
      console.log(removeIndex);
      profile.education.splice(removeIndex, 1);
      profile.save().then(() => {
        return res.json({ message: "edu removed successfully" });
      });
    });
  }
);

// @route GET /api/profile/experience
// @desc get Experience field
// @access PRIVATE
router.get(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (!profile) {
        return res.json({ noprofile: "no profile found for the user" });
      }
      return res.json({ experience: profile.experience });
    });
  }
);

// @route POST /api/profile/experience
// @desc Create or Update Experience
// @access PRIVATE
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    console.log(req.body);
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (!profile) {
        return res
          .status(404)
          .json({ noprofile: "no profile found for the user" });
      }
      const newExp = {};
      newExp.company = req.body.company;
      newExp.title = req.body.title;
      if (req.body.location) {
        newExp.location = req.body.location;
      }
      newExp.from = req.body.from;
      if (req.body.to) {
        newExp.to = req.body.to;
      }
      newExp.current = req.body.current;
      if (req.body.description) {
        newExp.description = req.body.description;
      }
      profile.experience.unshift(newExp);
      profile.save().then(() => {
        res.json({ message: "exp added successfully" });
      });
    });
  }
);

// @route DELETE/api/profile/experience
// @desc Delete Experience by ID
// @access PRIVATE
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const exp_id = req.params.exp_id;
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (!profile) {
        return res
          .status(404)
          .json({ noprofile: "no profile found for the user" });
      }
      const removeIndex = profile.experience.findIndex(
        (exp) => exp._id.toString() === exp_id
      );
      profile.experience.splice(removeIndex, 1);
      profile.save().then(() => {
        return res.json({ message: "exp removed successfull" });
      });
    });
  }
);

module.exports = router;
