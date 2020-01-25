import { Injectable, BadRequestException } from '@nestjs/common';
import { loginViewModel } from 'src/domain/login.viewmodel';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user-repository/user-repository';

@Injectable()
export class AuthService {

    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async login(login: loginViewModel) {
        const user = await this.userRepository.getByCredential(login.userLogin, login.password)
        if (!user) throw new BadRequestException("Incorrect Credentials")
        return {
            access_token: this.jwtService.sign({status: "Authorized"}),
            userId: user._id
        }
    }

}
