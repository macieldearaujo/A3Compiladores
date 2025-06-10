import { findOneOnDatabase, insertOnDatabase, updateOneOnDatabase, deleteOneOnDatabase, findManyOnDatabase } from "../../infrastructure/drivers/mongo/adapter.js";
import { v4 as uuidv4 } from 'uuid'
import { userInfoSchema } from '../models/usersModel.js';
import bcrypt from 'bcrypt';
import { collectionNames } from '../../infrastructure/constants/mongoConstants.js';


export async function createUser(userInfo) {
  try {
    const query = {
      email: userInfo.email,
    };
    const userOnDb = await findOneOnDatabase(query, { projection: { _id: 0 } }, collectionNames.users);

    if (userOnDb != null) {
      return { error: "Usuario já existe", status: 409 };
    }

    userInfo.id = uuidv4();
    userInfo.password = await bcrypt.hash(userInfo.password, 10);
    const jsonUserInfo = JSON.parse(JSON.stringify(userInfo));
    const response = await insertOnDatabase(jsonUserInfo, collectionNames.users);

    if (response.acknowledged) {
      return { message: "Usuario criado com sucesso", userId: userInfo.id, status: 201 };
    } else {
      return { error: "Falha ao criar usuario", status: 500 };
    }
  } catch (error) {
    return { error: "Ocorreu um erro inesperado", details: error.message, status: 500 };
  }
}


export async function getUserById(id, UserRole) {
  try {
    if (UserRole.toLowerCase() !== "gerente") {
      return { error: "Acesso negado", status: 403 };
    }

    const user = await findOneOnDatabase(
      { id: id },
      { projection: { _id: 0, password: 0 } },
      collectionNames.users
    );

    if (!user) {
      return { error: "Usuario não encontrado", status: 404 };
    }

    const { error, value } = userInfoSchema.validate(user);
    if (error) {
      return { error: "Dados do usuário inválidos", details: value.error.message, status: 400 };
    }
    return { value, status: 200 };
  } catch (error) {
    return { error: "Id de usuário inválido", details: error.message };
  }
}

export async function getAllUsers(userRole) {
  try {
    if (userRole.toLowerCase() !== "gerente") {
      return { error: "Acesso negado", status: 403 };
    }
    const query = {};
    const users = await findManyOnDatabase(query, { projection: { _id: 0, password: 0 } }, collectionNames.users);

    return { users, status: 200 };
  } catch (error) {
    return { error: "Falha ao recuperar usuarios", details: error.message };
  }
}

export async function updateUser(updatedInfo, userRole) {
  try {
    if (userRole.toLowerCase() !== "gerente") {
      return { error: "Acesso negado", status: 403 };
    }

    const dataUpdate = { role: updatedInfo.role };
    const result = await updateOneOnDatabase(
      { email: updatedInfo.email },
      { $set: dataUpdate },
      collectionNames.users
    );

    if (result.modifiedCount === 0) {
      return { error: "Alterações não realizadas", status: 404 };
    }

    return { message: "Usuario atualizado com sucesso", status: 200 };
  } catch (error) {
    return { error: "Falha ao atualizar usuario", details: error.message };
  }
}

export async function deleteUser(id, userRole) {
  try {
    if (userRole.toLowerCase() !== "gerente") {
      return { error: "Acesso negado", status: 403 };
    }
    const result = await deleteOneOnDatabase({ id: id }, collectionNames.users);

    if (result.deletedCount === 0) {
      return { error: "Usuario não encontrado", status: 404 };
    }

    return { message: "Usuario excluido com sucesso", status: 200 };
  } catch (error) {
    return { error: "Falha ao excluir usuario", details: error.message };
  }
}