import app from "./app";
import mongoose from "mongoose";

console.log("Starting server...");

mongoose.set("debug", true);

const port = 3000;

// Connection strings
const atlasUri =
  "mongodb+srv://Dokjolly:alexviolatto03@offertelavoro.aegmrwj.mongodb.net/";
const localUri = "mongodb://127.0.0.1:27017/offerte-lavoro";

// Funzione per connettersi al database
const connectToDatabase = async (uri) => {
  try {
    await mongoose.connect(uri, {
      // Aggiungi altre opzioni di connessione se necessario
    });
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
      console.log(`Connected to database at ${uri}`);
    });
  } catch (err) {
    console.error(`Error connecting to database at ${uri}:`, err);
  }
};

// Seleziona quale URI usare
const useAtlas = true; // Cambia questo valore in base alle tue necessità

if (useAtlas) {
  connectToDatabase(atlasUri);
} else {
  connectToDatabase(localUri);
}

// import app from "./app";
// import mongoose from "mongoose";

// console.log("Starting server...");

// mongoose.set("debug", true);
// mongoose
//   .connect("mongodb://127.0.0.1:27017/offerte-lavoro")
//   .then((_) => {
//     const port = 3000;
//     app.listen(port, () => {
//       console.log(`Server started on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });
