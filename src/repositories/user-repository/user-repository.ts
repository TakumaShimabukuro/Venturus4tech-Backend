import { Injectable } from '@nestjs/common';
import { userViewModel } from 'src/domain/user.viewmodel';

@Injectable()
export class UserRepository {
    db: userViewModel[] = [];

    getUsers() {
        return this.db;
    }

    createUser(newUser: userViewModel){
        this.db.push(newUser);
        return "User successfully added"
    }

    editUser(user: userViewModel){
        const list: userViewModel[] = this.db;
        const newList: userViewModel[] = list.map(x => {
            if(x.userName == user.userName) x = user;
            return x
        })
        this.db = newList
        return "User successfully edited"
    }

    deleteUser(userName: string){

    }

}
