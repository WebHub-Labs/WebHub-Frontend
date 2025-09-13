import mongoose from "mongoose";

const connectMongo = async () =>
  mongoose.connect(
    "mongodb+srv://rohitkarki401:9867427171@cluster0.9ljtq1j.mongodb.net/webhub"
    // "mongodb+srv://sachinchakradhar8:g9FPkXRPhZV2HUEU@wehub.jp0fhjp.mongodb.net/webhub"
  );

export default connectMongo;
