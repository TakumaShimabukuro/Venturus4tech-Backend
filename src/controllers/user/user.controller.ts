import { Controller, Get, Post, Body, Query, Delete, Put } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { userViewModel } from 'src/domain/user.viewmodel';
@Controller('user')
export class UserController {

    constructor(private userService: UserService){

    }

    @Get()
    getUsers() {
        return this.userService.getUsers()
    }

    @Post()
    createUser(@Body() newUser: userViewModel) {
        return this.userService.createNewUser(newUser)
    }

    @Put()
    editUser(@Body() user: userViewModel){
        return this.userService.editUser(user)
    }

    @Delete()
    deleteUser(@Body() newUser: userViewModel){

    }

}
