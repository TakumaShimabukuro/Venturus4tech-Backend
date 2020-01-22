import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { loginViewModel } from 'src/domain/login.viewmodel';
// import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService, 
        // private readonly jwtService: JwtService
        ){}

    @Post("login")
    login(@Body() login: loginViewModel){
        return this.authService.login(login);
    }
}
