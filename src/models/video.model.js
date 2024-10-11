import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: string,
            required:true
        },
        thumbnail: {
            type: string,
            required:true,
        },
        title: {
            type: string,
            required:true
        },
        description: {
            type: string,
            required:true
        },
        duration: {
            type: Number,
            required:true
        },
        views: {
            type: string,
            default:0
            
        },
        isPublished: {
            type: Boolean,
            default:true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    }
);

videoSchema.plugin(mongooseAggregatePaginate);
export const video = mongoose.model("Video", videoSchema);
