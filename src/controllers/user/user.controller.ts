import { Controller, Get, Post, Body, Delete, Put, UseGuards, Param } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { userViewModel } from 'src/domain/user.viewmodel';
import { AuthGuard } from "@nestjs/passport"

@UseGuards(AuthGuard("jwt"))
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    getUsers() {
        return this.userService.getUsers()
    }

    @Get(":id")
    getUser(@Param("id") id: string) {
        return this.userService.getUserById(id)
    }

    @Post()
    createUser(@Body() newUser: userViewModel) {
        return this.userService.createNewUser(newUser)
    }

    @Post("many")
    createUsers(@Body() newUsers: userViewModel[]) {
        return this.userService.createNewUsers(newUsers)
    }

    @Put()
    editUser(@Body() user: userViewModel) {
        return this.userService.updateUser(user)
    }

    @Delete()
    deleteUser(@Body() user: userViewModel) {
        return this.userService.deleteUser(user)
    }

}
