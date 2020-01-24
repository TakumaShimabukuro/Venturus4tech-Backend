import { Controller, UseGuards, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from "multer"
import { FileInterceptor } from "@nestjs/platform-express"
import { UserActivityService } from 'src/services/user-activity/user-activity.service';

@UseGuards(AuthGuard("jwt"))
@Controller('user-activity')
export class UserActivityController {

    constructor(private readonly UserActivityService: UserActivityService) { }

    @Post("upload")
    @UseInterceptors(
        FileInterceptor("image", {
            storage: diskStorage({
                destination: "../images/"
            })
        })
    )
    postImage(
        @UploadedFile() file: any,
        @Body("userId") userId: string,
        @Body("description") description: string
    ) {
        return this.UserActivityService.uploadImage(userId, file.filename, description);
    }
}
