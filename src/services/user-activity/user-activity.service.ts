import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository/user-repository';
import { UserActivityCommentsDto } from 'src/domain/dto/user-activity-comment.dto';
import { UserActivityDto } from 'src/domain/dto/user-activity.dto';
import { UserActivityRepository } from 'src/repositories/user-activity-repository/user-activity-repository';
import { UserActivity } from 'src/domain/schemas/user-activity.schema';
import { readFileSync } from 'fs';
import { likeOrDislikeViewModel } from 'src/domain/like-or-dislike.viewmodel';
import { CommentViewModel } from 'src/domain/comment.viewmodel';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class UserActivityService {

    constructor(
        private readonly UserRepository: UserRepository,
        private readonly UserActivityRepository: UserActivityRepository,
        private readonly Websocketgateway: WebsocketGateway
        ) {
    }

    async getRecentImages(index: string) {
        const i = parseInt(index, 10)
        if (isNaN(i)) throw new BadRequestException("Invalid Index")
        const recentUpload = await this.UserActivityRepository.getPaged(i)
        return await this.convertImageToBase64(recentUpload)
    }

    async uploadImage(userId: string, filename: string, description: string) {
        const user = await this.UserRepository.getUserById(userId)
        if (!user) throw new BadRequestException("This user does not exists")

        const uploadImageObj = new UserActivityDto(userId, user.userName, filename)
        if (description) uploadImageObj.comments.push(new UserActivityCommentsDto(userId, user.userName, description))

        const createUserActivity = await this.UserActivityRepository.create(uploadImageObj)

        return this.convertImageToBase64ForOneFile(createUserActivity)
    }

    convertImageToBase64(UserActivities: UserActivity[]) {
        return Promise.all(
            UserActivities.map(userActivity => {
                return {
                    ...userActivity,
                    imgEncoded: readFileSync("../images/" + userActivity.filename, "base64")
                }
            })
        )
    }

    async comment(userComment: CommentViewModel) {
        const user = await this.UserRepository.getUserById(userComment.userId)
        if (!user) throw new BadRequestException(`This user id does not exists - id: ${userComment.userId}`)

        const userActivity = await this.UserActivityRepository.getById(userComment.userActivityId)
        if (!userActivity) throw new BadRequestException(`This user activity id does not exists - id: ${userComment.userActivityId}`)

        const dataToUpdate = new UserActivityCommentsDto(user._id, user.userName, userComment.comment)

        userActivity.comments.push(dataToUpdate)

        return await this.UserActivityRepository.comment(userComment.userActivityId, userActivity)
    }

    async likeOrDisLike(LikeOrDislike: likeOrDislikeViewModel) {
        const user = await this.UserRepository.getUserById(LikeOrDislike.userId)
        if (!user) throw new BadRequestException(`This user id does not exists - id: ${LikeOrDislike.userId}`)

        const userActivity = await this.UserActivityRepository.getById(LikeOrDislike.userActivityId)
        if (!userActivity) throw new BadRequestException(`This user activity id does not exists - id: ${LikeOrDislike.userActivityId}`)

        if (userActivity.likes.includes(user._id.toString())) userActivity.likes = userActivity.likes.filter(x => x !== user._id.toString())
        else userActivity.likes.push(user._id.toString())

        const updatedUserActivity = this.UserActivityRepository.update(userActivity)

        this.Websocketgateway.notifyOnLike(userActivity._id, userActivity.userId)

        return updatedUserActivity

    }

    convertImageToBase64ForOneFile(userActivity: UserActivity){
        return {
            ...userActivity,
            imgEncoded: readFileSync("../images/"+userActivity.filename, "base64")
        }
    }
}
