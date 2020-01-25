import { Injectable } from '@nestjs/common'
import { userViewModel } from 'src/domain/user.viewmodel'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from "mongoose"
import { User } from "src/domain/schemas/user.schema"

@Injectable()
export class UserRepository {
    constructor(@InjectModel("User") private readonly UserCollection: Model<User>) { }

    async getUsers(): Promise<User[]> {
        try {
            return await this.UserCollection
                .find()
                .select({ __v: false, password: false })
                .lean()
        } catch (e) {
            console.log(e)
            return [e]
        }
    }

    async getUserById(id: string): Promise<User> {
        try {
            return await this.UserCollection
                .findOne({ _id: id })
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async getByCredential(userLoginFromViewModel: string, passwordFromViewModel: string){
        try {
            return this.UserCollection
                .findOne({
                    userLogin: userLoginFromViewModel, 
                    password: passwordFromViewModel
                })
            
        } catch (e) {
            
        }
    } 

    async createUser(newUser: userViewModel) {
        try {
            const user = this.UserCollection(newUser)
            await user.save();
            return "User successfully added"
        } catch (e) {
            console.log(e)
            return new Error(e)
        }
    }

    async createUsers(newUsers: userViewModel[]) {
        try {
            newUsers.forEach(async newUser => {
                const user = this.UserCollection(newUser)
                await user.save();
            })
            return "Users successfully added"
        } catch (e) {
            console.log(e)
            return new Error(e)
        }
    }


    async updateUser(user: userViewModel) {
        try {
            await this.UserCollection.updateOne({ userLogin: user.userLogin }, user);
            return "User successfully updated"
        } catch (e) {
            console.log(e)
            return new Error(e)
        }
    }

    async deleteUser(user: userViewModel) {
        try {
            await this.UserCollection.remove({ userLogin: user.userLogin })
            return "User successfully removed"
        } catch (e) {
            console.log(e)
            return new Error(e)
        }
    }

}
