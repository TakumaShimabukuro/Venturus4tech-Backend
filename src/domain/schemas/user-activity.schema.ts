import * as mongoose from "mongoose"
import { Document } from "mongoose"

export interface UserActivity extends Document {
    readonly _id: mongoose.Schema.Types.ObjectId;
    readonly userId: string;
    readonly userName: string;
    readonly filename: string;
    readonly likes: [string];
    readonly timestamp: Date;
}

const UserActivityCommentsSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    comment: String,
    likes: Number,
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

export const UserActivitySchema = new mongoose.Schema({
    userId: String,
    userName: String,
    filename: String,
    likes: [String],
    timestamp: {
        type: Date,
        default: Date.now()
    },
    comments: [UserActivityCommentsSchema]
})
