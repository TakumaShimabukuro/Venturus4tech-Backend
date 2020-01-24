import { Injectable } from '@nestjs/common';

@Injectable()
export class UserActivityService {

    uploadImage(userId: String, filename: string, description: string) {
        return "upload"
    }
}
