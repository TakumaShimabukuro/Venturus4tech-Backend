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

    async createNewUser(newUser: userViewModel) {

        /* Pega todos registros no banco */
        const userList = await this.userRepository.getUsers()

        /* Valida se existe no banco ou não */
        const existUser = userList.find(x => x.userLogin === newUser.userLogin)
        if (existUser) throw new BadRequestException("This user name already exist");

        /* Salva no banco */
        return this.userRepository.createUser(newUser)
    }

    async createNewUsers(newUsers: userViewModel[]) {

        /* Pega todos registros no banco */
        const userList = await this.userRepository.getUsers()

        /* Valida se existe no banco ou não */
        newUsers.forEach(user => {
            const existUser = userList.find(x => x.userLogin === user.userLogin)
            if (existUser) throw new BadRequestException("This user name already exist");
        })

        /* Salva no banco */
        return this.userRepository.createUsers(newUsers)
    }

    async updateUser(user: userViewModel) {

        /* Pega todos registros no banco */
        const userList = await this.userRepository.getUsers()

        /* Valida se existe no banco ou não */
        const existUser = userList.find(x => x.userLogin === user.userLogin)
        if (!existUser) throw new BadRequestException("User not registered");

        /* Salva no banco */
        return this.userRepository.updateUser(user)
    }

    async deleteUser(user: userViewModel) {

        /* Pega todos registros no banco */
        const userList = await this.userRepository.getUsers()

        /* Valida se existe no banco ou não */
        const foundUser = userList.find(x => x.userLogin === user.userLogin && x.password === user.password)
        if (!foundUser) throw new BadRequestException("User not registered");

        /* Deleta no banco */
        return this.userRepository.deleteUser(foundUser)
    }

    async attemptlogin(login: loginViewModel) {

        /* Pega todos registros no banco */
        const userList = await this.userRepository.getUsers()

        /* Verifica se existe no banco ou não */
        const foundLogin = userList.find(x => x.userLogin === login.userLogin && x.password === login.password)
        if (!foundLogin) throw new BadRequestException("Has no datas in DB");

        /* Retorna o dado */
        return foundLogin
    }

}
