import { Injectable, BadRequestException } from '@nestjs/common';
import { userViewModel } from 'src/domain/user.viewmodel';

@Injectable()
export class UserRepository {
    db: userViewModel[] = [
        new userViewModel("takuma", "takuma", "123")
    ];

    getUsers() {
        return this.db;
    }

    createUser(newUser: userViewModel) {
        this.db.push(newUser);
        return "User successfully added"
    }

    updateUser(user: userViewModel) {
        const list: userViewModel[] = this.db;
        const newList: userViewModel[] = list.map(x => {
            if (x.userLogin == user.userLogin) x = user;
            return x
        })
        this.db = newList
        return "User successfully updated"
    }

    deleteUser(userIndex: number) {
        this.db.splice(userIndex, 1)
        return "User successfully removed"
    }

}
