import { DataTypes } from "sequelize";
import { sequelize } from "../database/config.js";
import { User } from "./usersModel.js";
export const UserProfile = sequelize.define(
  "UserProfile",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    linkedInUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    facebookUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instaUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user_profiles",
    timestamps: true,
  }
);

User.hasOne(UserProfile, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
UserProfile.belongsTo(User, { foreignKey: "userId" });
