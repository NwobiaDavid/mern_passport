import express from 'express';
import multer from 'multer';
import User from '../models/userModel.js';

const router = express.Router();

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });
 
router.post('/onboarding', upload.single('profilePicture'), async (req, res) => {
  try {
    const { userId, bio } = req.body;
    const profilePicturePath = req.file.path; // Path to the uploaded file

    // Update user's profile picture and bio in the database
    await User.findByIdAndUpdate(userId, { profilePicture: profilePicturePath, bio });

    res.status(200).send('Onboarding completed successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

export default router;
