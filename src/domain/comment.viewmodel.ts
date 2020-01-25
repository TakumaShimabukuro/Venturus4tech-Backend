import { IsNotEmpty, Length } from "class-validator";

export class CommentViewModel {
    
    @IsNotEmpty()
    readonly userId: string;
    
    @IsNotEmpty()
    readonly userActivityId: string;

    @IsNotEmpty()
    readonly comment: string;
}