import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    bio: {
        type: String,
    },
    profilePicture: {
        type: String,
        default: "https://cdn0.iconfinder.com/data/icons/fintech-solutions-solid-24/24/account_user_profile_person_avatar-512.png"
    }
 }, {timestamps: true}
)

const User = mongoose.model('User', userSchema);

export default User

