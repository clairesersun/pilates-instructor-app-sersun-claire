import { Schema, SchemaTypes, model, models } from 'mongoose'
import movementSchema from './movements'

const classesSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId
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
    exercises: [movementSchema]
    //^^ how do I determine thte order of these?
})


console.log(models)
export default models?.Classes || model('Classes', classesSchema)