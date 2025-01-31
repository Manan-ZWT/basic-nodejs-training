import { DataTypes } from "sequelize";
import { sequelize } from "../database/config.js";
import { User } from "./usersModel.js";
export const UserImage = sequelize.define(
  "UserImages",
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
    imageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    extension: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "user_images",
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  }
);

User.hasMany(UserImage, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
UserImage.belongsTo(User, { foreignKey: "userId" });
