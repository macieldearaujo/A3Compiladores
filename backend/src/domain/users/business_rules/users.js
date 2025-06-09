import { find_one_on_database, insert_on_database, update_one_on_database, delete_one_on_database } from "../../../infrastructure/drivers/mongo/adapter.js";
import { v4 as uuidv4 } from 'uuid'
import { userInfoSchema } from '../usersModel.js';
import bcrypt from 'bcrypt';


export async function create_user(user_info) {
  try {
    const query = {
      email: user_info.email,
    };
    const user_on_db = await find_one_on_database(query, { projection: { _id: 0 } }, "users");

    if (user_on_db != null) {
      return { error: "User already exists", status: 409 };
    }
    
    user_info.id = uuidv4();
    user_info.password = await bcrypt.hash(user_info.password, 10);
    const json_user_info = JSON.parse(JSON.stringify(user_info));
    const response = await insert_on_database(json_user_info);

    if (response.acknowledged) {
      return { message: "User created successfully", userId: user_info.id, status: 201 };
    } else {
      return { error: "Failed to create user", status: 500 };
    }
  } catch (error) {
    return { error: "An unexpected error occurred", details: error.message, status: 500 };
  }
}


export async function get_user_by_email(email) {
  try {

    const user = await find_one_on_database(
      { email: email }, 
      { projection: 
        { _id: 0, password: 0 }
      },
      "users"
    );

    if (!user) {
      return { error: "User not found", status: 404 };
    }

    const { error, value } = userInfoSchema.validate(user);
    if (error) {
      return { error: "Invalid user data", details: value.error.message, status: 400 };
    }
    return { value };
  } catch (error) {
    return { error: "Invalid user EMAIL", details: error.message };
  }
}
/*
export async function list_users() {
  try {
    const users = await find_all_on_database({});
    return { users };
  } catch (error) {
    return { error: "Failed to retrieve users", details: error.message };
  }
}
*/
export async function update_user(updated_info) {

  try {
    const data_update = {role: updated_info.role};
    const result = await update_one_on_database(
      { email: updated_info.email },
      { $set: data_update },
      "users"
    );

    if (result.modifiedCount === 0) {
      return { error: "No changes made or user not found", status: 404 };
    }

    return { message: "User updated successfully", status: 200 };
  } catch (error) {
    return { error: "Failed to update user", details: error.message };
  }
}

export async function delete_user(email) {
  try {
    const result = await delete_one_on_database({ email: email },"users");

    if (result.deletedCount === 0) {
      return { error: "User not found or already deleted" };
    }

    return { message: "User deleted successfully", status: 200 };
  } catch (error) {
    return { error: "Failed to delete user", details: error.message };
  }
}