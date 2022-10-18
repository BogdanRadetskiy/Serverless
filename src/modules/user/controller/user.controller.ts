import { loadSequelize } from "@shared/sequelize/sequelize";
import { UserService } from "../service/user.service";

module.exports.createUserHandler = async (event) => {
  await loadSequelize();
  const body = JSON.parse(event.body) ;
  const data = {
            id: body.id,
            name: body.name,
            lastName: body.lastName,
          };
  const result = await UserService.create(data);
  return JSON.stringify(result);
}

module.exports.getUserByIdHandler = async (event) => {
  await loadSequelize();
  const userId = event?.pathParameters?.userId;
  
  if (!userId) {
    return console.log ('user not found');
  }
  const user = await UserService.getUserById(userId);
  
  return JSON.stringify(user);
}

module.exports.deleteUserHandler = async (event) => {
  await loadSequelize();
  const body = JSON.parse(event.body);
  const id = body.id;

  if (!id) {
    throw new Error('user dont exist');
  }

  const result = await UserService.deleteUser(id);

  return JSON.stringify(result);
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

  return JSON.stringify(result);
}
