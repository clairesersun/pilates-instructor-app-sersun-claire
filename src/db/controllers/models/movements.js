import { Schema, model, models } from 'mongoose'

const exerciseSchema = new Schema({
    planeOfMotion: {
        type: String,
        required: [true, 'Must include plane of motion']
    },
    spinalMovement: {
        type: String,
        required: [true, 'Must include spinal movement']
    },
    bodyClassification: {
        type: String,
        required: [true, 'Must include body classification']
    },
    equipment: {
        type: String,
        required: [true, 'Must include equipment used']
    },
    history: {
        type: String,
        required: [true, 'Must include classification']
    }, 
    description : {
        type: String,
        required: false,
        maxLength: 500
    },
    image: {
        data: Buffer,
        contentType: String,
        //https://colinrlly.medium.com/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed <-- use this???
        // https://www.youtube.com/watch?v=NzROCbkvIE0 <-- this maybe
        // validate:
        //     {},
        required: false
    },
    media: {
        type: String,
        required: false
    },
    variations: {
        type: String,
        required: false
    }
})


export default models.Exercise || model('Exercise', exerciseSchema)