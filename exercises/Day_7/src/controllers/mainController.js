// IMPORTING REQUIRED MODULES AND FILES
import { getUserById } from "./UserControllers/getUserById.js";
import { getAllUsers } from "./UserControllers/getAllUsers.js";
import { addUser } from "./UserControllers/addUser.js";
import { userUpdate } from "./UserControllers/updateUser.js";
import { deleteUser } from "./UserControllers/deleteUser.js";
import { upload_file } from "./UserImageControllers/upload.js";
import { getAllUsersProfiles } from "./UserProfileControllers/getAllUserProfiles.js";
import { addUserProfile } from "./UserProfileControllers/addUserProfile.js";
import { getUsersProfileById } from "./UserProfileControllers/getUserProfileById.js";
import { updateprofileid } from "./UserProfileControllers/updateUserProfile.js";
import { deleteuserprofile } from "./UserProfileControllers/deleteuserprofile.js";
import { deleteuserimage } from "./UserImageControllers/deleteUserImage.js";
import { adduserform } from "./UserFormControllers/addUserForms.js";
import { userlogin } from "./UserControllers/login.js";
// EXPORTING ALL CONTROLLERS
export {
  getUserById,
  getAllUsers,
  addUser,
  userUpdate,
  deleteUser,
  upload_file,
  getAllUsersProfiles,
  addUserProfile,
  getUsersProfileById,
  updateprofileid,
  deleteuserprofile,
  deleteuserimage,
  adduserform,
  userlogin,
};
