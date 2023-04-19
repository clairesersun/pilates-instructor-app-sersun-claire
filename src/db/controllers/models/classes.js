import { Schema, model, models } from 'mongoose'

const classesSchema = new Schema({
    className: {
        type: String,
        required: false
    },
    exercises: {
        type: [String],
        required: true
        //how do I determine what goes here? Maybe an ID of some kind? Yes an ID of the exercise chosen and added -- this will need to go into the classes api... maybe action???
        //do I need a separate model for the exercises that have been pushed to each class? or should it just be the ID of the exercise? I'm thinking ID
    },
    dateCreated: {
        type: Date,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    equipment: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    order: {
        type: Number,
        required: true 
        //the above is automatically populated and can be adjusted anytime adjusting the number given to be populated in diufferent orders
    }
})
//all of this is populated by the classes api and maaaybe the action??


export default models.Classes || model('Classes', classesSchema)