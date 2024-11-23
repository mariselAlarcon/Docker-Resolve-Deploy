const mongoose = require("mongoose");
const nameDB = "gym_db";
/* const URI = `mongodb://localhost:27017/${nameDB}`; */
//const URI = `mongodb+srv://resolvegym10:woy1R2rtQoc08sZu@gym-db.g9wzrka.mongodb.net/${nameDB}`

// Obtener la URI de conexión de las variables de entorno
const URI = process.env.MONGO_URI || 'mongodb://admin:admin1234@mongo_db:27017/gym_db?authSource=admin';


const dbconnect = () => {
  mongoose
    .connect(URI,{
     // useNewUrlParser: true,       // Usa el nuevo analizador de URIs
     // useUnifiedTopology: true,    // Usa el nuevo motor de conexiones
      connectTimeoutMS: 10000, // Espera hasta 10 segundos para conectarse
      serverSelectionTimeoutMS: 5000, // Reintenta conexión si no se encuentra MongoDB
    })
    .then((db) => console.log("DB is connected"))
    .catch((err) => console.log("Failed connection: ", err));
};

module.exports = dbconnect;
