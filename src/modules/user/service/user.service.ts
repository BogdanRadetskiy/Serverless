import { User } from "@shared/models/user.model";
import { CreateUserType } from "../types/createUser.type";

export class UserService {

    static async create(data: CreateUserType): Promise<any> {       
        return await User.create(data);
      }

      static async getUserById(id: string): Promise<User> {
        return User.findOne({ where: { id } });
      }

      static async deleteUser(id: string): Promise<number> {
        return User.destroy({ where: { id } });
      } 

      static async update(data): Promise<User> {        
      const user = await User.findOne({ where: { id: data.id } });      
       return await user.save();
  }

}