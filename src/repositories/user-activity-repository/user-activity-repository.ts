import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from "mongoose"
import { UserActivity } from "src/domain/schemas/user-activity.schema"
import { UserActivityDto } from 'src/domain/dto/user-activity.dto'
import { UserActivityCommentsDto } from 'src/domain/dto/user-activity-comment.dto'

@Injectable()
export class UserActivityRepository {
    constructor(@InjectModel("UserActivity") private readonly UserActivityCollection: Model<UserActivity>) { }

    async getPaged(index: number) {
        try {
            return await this.UserActivityCollection
                .find()
                .sort({ timestamp: -1 })
                .skip(index)
                .limit(10)
                .lean()
        } catch (e) {
            console.log(e)
            return new Error(e)
        }
    }

    async getById(id: string): Promise<UserActivity> {
        try {
            return await this.UserActivityCollection.findOne({ _id: id }).lean()
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async create(UserAcitvityDto: UserActivityDto) {
        try {
            const newUserActivity = this.UserActivityCollection(UserAcitvityDto)
            await newUserActivity.save()
            return await this.getById(newUserActivity._id)
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async comment(userActivityId: string, userActivity: UserActivity) {
        try {
            return await this.UserActivityCollection.findOneAndUpdate({ _id: userActivityId }, userActivity, {new: true})
        } catch (e) {
            console.log(e)
            return new Error(e)
        }
    }

    async update(UserActivity: UserActivity) {
        try {
            return await this.UserActivityCollection.findOneAndUpdate({ _id: UserActivity._id }, UserActivity, { new: true })
        } catch (e) {
            console.log(e)
            return new Error(e)
        }
    }

}