import { UserActivityCommentsDto } from "./user-activity-comment.dto";

export class UserActivityDto {
    constructor(userId: string, userName: string, filename: string){
        this.userId = userId;
        this.userName = userName;
        this.filename = filename;
        this.timestamp = new Date();
        this.likes = [];
        this.comments = [];
    }

    readonly userId: string;
    readonly filename: string;
    readonly userName: string;
    readonly likes: string[];
    readonly timestamp: Date;
    readonly comments: UserActivityCommentsDto[]
}