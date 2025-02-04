import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import bcrypt from "bcryptjs";

export const User = sequelize.define(
  "User",
  {
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      set(value) {
        if (value) {
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hash);
        }
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "customer"),
      allowNull: false,
      defaultValue: "customer",
      set(value) {
        if (value) {
          this.setDataValue("role", value.toLowerCase());
        }
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);



import { DataTypes} from "sequelize";
import { sequelize } from "./index.js";
import { Category } from "./categoriesModel.js";

export const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

Category.hasMany(Product, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

Product.belongsTo(Category,{
  foreignKey:"id",
  onDelete:"CASCADE"
});





import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING(100),
      unique:true,
      allowNull: false,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
  }
);





import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { Category } from "./categoriesModel.js";
import { User } from "./usersModel.js";
import { Product } from "./productsModel.js";

export const Cart = sequelize.define(
  "Cart",
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "carts",
    timestamps: true,
  }
);

Cart.hasMany(Product, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

Product.belongsTo(Category, {
  foreignKey: "id",
  onDelete: "CASCADE",
});





import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { User } from "./usersModel.js";

export const Order = sequelize.define(
  "Order",
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    total_price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull:false,
    },
    status:{
        type:DataTypes.ENUM("pending","shipped", "delievered", "canceled"),
        allowNull:false,
        defaultValue:"pending",
        set(value){
            if(value){
                this.setDataValue("status",value.toLowerCase())
            }
        }
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

User.hasMany(Order, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

Order.belongsTo(User,{
  foreignKey:"id",
  onDelete:"CASCADE"
});




import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { Order } from "./ordersModel.js";
import { Product } from "./productsModel.js";
export const Order_item = sequelize.define(
  "Order_item",
  {
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

Order.hasMany(Order_item, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

Order_item.hasOne(Product, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

Order_item.belongsTo(Order, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

Product.belongsTo(Order_item, {
  foreignKey: "id",
  onDelete: "CASCADE",
});





import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { Category } from "./categoriesModel.js";
import { User } from "./usersModel.js";
import { Product } from "./productsModel.js";

export const Wishlist = sequelize.define(
  "Wishlist",
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
  },
  {
    tableName: "carts",
    timestamps: true,
    updatedAt: false,
  }
);

Wishlist.hasMany(Product, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

Product.belongsTo(Wishlist, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

User.hasOne(Wishlist, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

Wishlist.belongsTo(User, {
  foreignKey: "id",
  onDelete: "CASCADE",
});


THIS ARE ALL THE TABLES THAT I WANT TO CREATE JUST CHECK THE RELATIONSHIP AND TELL ME WHERE TO CHANGE IF NEDDED