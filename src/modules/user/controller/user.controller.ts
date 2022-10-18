import { loadSequelize } from "@shared/sequelize/sequelize";
import { MessageUtil } from "@shared/utils/types/message";
import { UserService } from "../service/user.service";

module.exports.createUserHandler = async (event) => {
  await loadSequelize();
  const body = JSON.parse(event.body) ;
  const data = {
            id: body.id,
            name: body.name,
            lastName: body.lastName,
          };
try {
  const result = await UserService.create(data);
  return MessageUtil.success(result);
  } catch (e) {
    return MessageUtil.error(500, e);
  }
}

module.exports.getUserByIdHandler = async (event) => {
  await loadSequelize();
  const userId = event?.pathParameters?.userId;
  
  if (!userId) {
    return MessageUtil.error(404, 'user not found');
  }
  const user = await UserService.getUserById(userId);
  
  return MessageUtil.success(user);
}

module.exports.deleteUserHandler = async (event) => {
  await loadSequelize();
  const body = JSON.parse(event.body);
  const id = body.id;

  if (!id) {
    throw new Error('user dont exist');
  }

  const result = await UserService.deleteUser(id);

  return MessageUtil.success({ delete: result });
}

module.exports.updateUserHandler = async(event) => {
  await loadSequelize();
  const body = JSON.parse(event.body);

  const data = {
    id: body.id,
    name: body.name,
    lastName: body.lastName
  };

  if (!data.id) {
    throw new Error('user not exist');
  }

  const result = await UserService.update(data);

  return MessageUtil.success(result);
}
