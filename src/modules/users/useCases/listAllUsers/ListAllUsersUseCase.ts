import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userExist = this.usersRepository.findById(user_id);

    if (!userExist) {
      throw new Error("User doesn't exist!");
    }

    const isAdmin = userExist.admin;

    if (!isAdmin) {
      throw new Error("The user does not have permission!");
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
