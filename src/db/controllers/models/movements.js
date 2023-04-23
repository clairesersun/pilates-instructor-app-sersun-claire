import { Schema } from 'mongoose'

const movementSchema = new Schema({
  englishName: String,
  sanskritName: String,
  translatedName: String,
  description: String,
  image: String
})

export default movementSchema



// "id": 5,
//   "english_name": "Butterfly",
//   "sanskrit_name_adapted": "Baddha Konasana",
//   "sanskrit_name": "Baddha Koṇāsana",
//   "translation_name": "baddha = bound, koṇa = angle, āsana = posture",
//   "pose_description": "In sitting position, bend both knees and drop the knees to each side, opening the hips.  Bring the soles of the feet together and bring the heels as close to the groin as possible, keeping the knees close to the ground.  The hands may reach down and grasp and maneuver the feet so that the soles are facing upwards and the heels and little toes are connected.  The shoulders should be pulled back and no rounding of the spine.",
//   "pose_benefits": "Opens the hips and groins.  Stretches the shoulders, rib cage and back.  Stimulates the abdominal organs, lungs and heart.",
//   user this one --> "url_svg": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/5_i64gif.svg",
//   "url_png": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/5_i64gif.png",
//   "url_svg_alt": "https://www.dropbox.com/s/3h2pts6xbn28dh7/butterfly%3F.svg?raw=1"



// const exerciseSchema = new Schema({
//     planeOfMotion: {
//         type: String,
//         required: [true, 'Must include plane of motion']
//     },
//     spinalMovement: {
//         type: String,
//         required: [true, 'Must include spinal movement']
//     },
//     bodyClassification: {
//         type: String,
//         required: [true, 'Must include body classification']
//     },
//     equipment: {
//         type: String,
//         required: [true, 'Must include equipment used']
//     },
//     history: {
//         type: String,
//         required: [true, 'Must include classification']
//     }, 
//     description : {
//         type: String,
//         required: false,
//         maxLength: 500
//     },
//     // image: {
//     //     // data: Buffer,
//     //     // contentType: String,
//     //     // //https://colinrlly.medium.com/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed <-- use this???
//     //     // // https://www.youtube.com/watch?v=NzROCbkvIE0 <-- this maybe
//     //     // // validate:
//     //     // //     {},
//     //     // required: false
//     //     type: String,
//     //     required: false
//     // },
//     media: {
//         type: String,
//         required: false
//     },
//     variations: {
//         type: String,
//         required: false
//     }
// })


// export default models.Exercise || model('Exercise', exerciseSchema)