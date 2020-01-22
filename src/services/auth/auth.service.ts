import { Injectable, BadRequestException } from '@nestjs/common';
import { loginViewModel } from 'src/domain/login.viewmodel';
import { UserService } from '../user/user.service';
import { BaseExceptionFilter } from '@nestjs/core';

@Injectable()
export class AuthService {

    constructor(private userService: UserService){}

    login(login: loginViewModel){
        const user = this.userService.attemptlogin(login)
        if(user) return "Authenticated"
        else throw new BadRequestException("User login or User password as incorrect")
    }
}
