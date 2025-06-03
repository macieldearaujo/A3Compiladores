import { find_one_on_database, insert_on_database } from "../../../infrastructure/drivers/mongo/adapter.js";

export async function create_user(user_info) {
    try {
        const query = {
            email: user_info.email,
        };
        const user_on_db = await find_one_on_database(query);
        if (user_on_db != null){
            return { error: "User already exists" };
        }

        const response = await insert_on_database(user_info);
        if (response.acknowledged) {
            return { message: "User created successfully", user: response.insertedId };
        } else {
            return { error: "Failed to create user" };
        }  
    } catch (error) {
        return { error: "An unexpected error occurred", details: error.message };
    }
}

//chat

export async function get_user_by_id(id) {
  try {
    const user = await find_one_on_database({ id: id });
    if (!user) {
      return { error: "User not found" };
    }
    return { user };
  } catch (error) {
    return { error: "Invalid user ID", details: error.message };
  }
}

export async function list_users() {
  try {
    const users = await find_all_on_database({});
    return { users };
  } catch (error) {
    return { error: "Failed to retrieve users", details: error.message };
  }
}

export async function update_user(id, updated_info) {
  try {
    const result = await update_on_database(
      { _id: new ObjectId(id) },
      { $set: updated_info }
    );
    if (result.modifiedCount === 0) {
      return { error: "No changes made or user not found" };
    }
    return { message: "User updated successfully" };
  } catch (error) {
    return { error: "Failed to update user", details: error.message };
  }
}

export async function delete_user(id) {
  try {
    const result = await delete_on_database({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return { error: "User not found or already deleted" };
    }
    return { message: "User deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete user", details: error.message };
  }
}