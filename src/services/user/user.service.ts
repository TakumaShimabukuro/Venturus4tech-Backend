import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository/user-repository';
import { userViewModel } from 'src/domain/user.viewmodel';
import { loginViewModel } from 'src/domain/login.viewmodel';

@Injectable()
export class UserService {
    constructor(readonly userRepository: UserRepository) { }

    getUsers() {
        return this.userRepository.getUsers()
    }

    createNewUser(newUser: userViewModel) {
        const userList = this.userRepository.getUsers()
        const existUser = userList.find(x => x.userName === newUser.userName)
        if (existUser) throw new BadRequestException("This user name already exist");
        return this.userRepository.createUser(newUser)
    }

    createNewUsers(newUsers: userViewModel[]) {
        newUsers.forEach(user => this.userRepository.createUser(user))
        return "Users succesfuly added"
    }

    attemptlogin(login: loginViewModel) {
        const userList = this.userRepository.getUsers()
        const foundLogin = userList.find(x => x.userLogin === login.userLogin && x.password === login.password)
        return foundLogin
    }

    updateUser(user: userViewModel) {
        const userList = this.userRepository.getUsers()
        const existUser = userList.find(x => x.userName === user.userName)
        if (!existUser) throw new BadRequestException("User not registered");
        return this.userRepository.updateUser(user)
    }

    deleteUser(user: userViewModel) {
        const userList = this.userRepository.getUsers()
        const userIndex = userList.findIndex(x => x.userLogin === user.userLogin && x.password === user.password)
        if (userIndex === -1) throw new BadRequestException("User not registered");
        return this.userRepository.deleteUser(userIndex)
    }

}
