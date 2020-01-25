import { Controller, UseGuards, Post, UseInterceptors, UploadedFile, Body, Get, Param, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from "multer"
import { FileInterceptor } from "@nestjs/platform-express"
import { UserActivityService } from 'src/services/user-activity/user-activity.service';
import { likeOrDislikeViewModel } from 'src/domain/like-or-dislike.viewmodel';
import { CommentViewModel } from 'src/domain/comment.viewmodel';

@UseGuards(AuthGuard("jwt"))
@Controller('user-activity')
export class UserActivityController {

    constructor(private readonly UserActivityService: UserActivityService) { }

    @Get(":index")
    getRecentImages(@Param("index") index: string) {
        return this.UserActivityService.getRecentImages(index)
    }

    @Put("comment")
    comment(@Body() @Body() userComment: CommentViewModel){
        return this.UserActivityService.comment(userComment)
    }

    @Put("like-or-dislike")
    likeOrDislikeUserActivity(@Body() LikeOrDislike: likeOrDislikeViewModel){
        return this.UserActivityService.likeOrDisLike(LikeOrDislike)
    }

    @Post("upload")
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "../images/",
                filename: (_req, file, callback) => callback(null, file.originalname)
            })
        })
    )
    postImage(
        @UploadedFile() file,
        @Body("userId") userId: string,
        @Body("description") description: string
    ) {
        return this.UserActivityService.uploadImage(userId, file.originalname, description);
    }
}
