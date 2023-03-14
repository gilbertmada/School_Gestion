import mongoose, { Schema, Document } from "mongoose";
import { IStudent } from "./Student";

export interface IClasseName extends Document {
    className: string;
    schoolName: string;

}

const ClassesNameSchema: Schema = new Schema({
    className: {
        type: String,
        required: false,
    },
    schoolName: {
        type: String,
        required: false,
    },
 
})as any;
export interface IClasse extends Document {
    classAndSchool: IClasseName;
    professor: string;
    deleted: boolean;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    transform: any;
    urlPlus?: string;
}

// Create Schema
const ClassesSchema: Schema = new Schema({
    classAndSchool: ClassesNameSchema,
    professor: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Professor',
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedBy: {
        type: mongoose.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    deletedAt: {
        type: Date,
    },
    urlPlus: {
        type: String,
        required: false,
    },
});
ClassesSchema.method("transform", function () {
    const obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    // delete obj._id;

    return obj;
});

export const Classe = mongoose.model<IClasse>("Classes", ClassesSchema);
