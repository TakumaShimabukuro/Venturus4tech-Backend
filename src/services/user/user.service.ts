import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository/user-repository';
import { userViewModel } from 'src/domain/user.viewmodel';
import { loginViewModel } from 'src/domain/login.viewmodel';
import { User } from 'src/domain/schemas/user.schema';

@Injectable()
export class UserService {
    userList: User[] = [];

    constructor(readonly userRepository: UserRepository) {
        this.loadUsers();
    }

    /* Pega todos registros no banco */
    async loadUsers() {
        this.userList = await this.userRepository.getUsers()
    }

    /* Função para retornar os usuarios do banco */
    async getUsers() {
        return await this.userRepository.getUsers()
    }

    /* Função para retornar o usuario por id*/
    async getUserById(id: string) {
        return await this.userRepository.getUserById(id)
    }

    /* Função para salvar do banco */
    async createNewUser(newUser: userViewModel) {
        /* Valida se existe no banco ou não */
        const existUser = this.userList.find(x => x.userLogin === newUser.userLogin)
        if (existUser) throw new BadRequestException("This user name or login already exist");

        return this.userRepository.createUser(newUser)
    }

    /* Função para salvar varioss usuarios do banco */
    async createNewUsers(newUsers: userViewModel[]) {
        /* Valida se existe no banco ou não */
        newUsers.forEach(user => {
            const existUser = this.userList.find(x => x.userLogin === user.userLogin)
            if (existUser) throw new BadRequestException("This user name already exist");
        })

        await this.loadUsers()

        return this.userRepository.createUsers(newUsers)
    }

    /* Atualiza os dados de um usuario do banco */
    async updateUser(user: userViewModel) {
        /* Valida se existe no banco ou não */
        const existUser = this.userList.find(x => x.userLogin === user.userLogin)
        if (!existUser) throw new BadRequestException("User not registered");

        await this.loadUsers()

        return this.userRepository.updateUser(user)
    }

    /* Deleta usuario do banco */
    async deleteUser(user: userViewModel) {
        /* Valida se existe no banco ou não */
        const foundUser = this.userList.find(x => x.userLogin === user.userLogin && x.password === user.password)
        if (!foundUser) throw new BadRequestException("User not registered");

        await this.loadUsers()

        return this.userRepository.deleteUser(foundUser)
    }

    /* Função para login do usuario */
    async attemptlogin(login: loginViewModel) {
        /* Verifica se existe no banco ou não */
        const foundLogin = this.userList.find(x => x.userLogin === login.userLogin && x.password === login.password)
        if (!foundLogin) throw new BadRequestException("Has no datas in DB");

        return foundLogin
    }

}
