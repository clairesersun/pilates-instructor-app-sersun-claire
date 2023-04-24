import { Schema, SchemaTypes, model, models } from 'mongoose'
import Movement from './movements'

const classesSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId
    },
    className: {
        type: String,
        required: false
    },
    dateCreated: {
        type: Date,
        required: false
    },
    datesTaught: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    exercises: [Movement]
    //^^ how do I determine thte order of these?
})


export default models.Classes || model('Classes', classesSchema)