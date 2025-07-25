import mongoose, { Schema, Document, Types } from 'mongoose';
export interface INotification extends Document {
    userId: string;
    type: 'taskCompleted' | 'reminder' | 'overdue';
    message: string;
    read: boolean;
    relatedTaskId?: string;
    createdAt: string;
    updatedAt: string;
}

const NotificationSchema: Schema = new Schema({
    userId: { type: String, required: true, index: true },
    type: { type: String, required: true, enum: ['taskCompleted', 'reminder', 'overdue'] },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    relatedTaskId: { type: String },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform(doc, ret: { _id?: any; __v?: any }) {
            delete ret._id;
            delete ret.__v;
        }
    }
});

NotificationSchema.virtual('id').get(function () {
    return (this._id as Types.ObjectId).toHexString();
});

export default mongoose.model<INotification>('Notification', NotificationSchema);
