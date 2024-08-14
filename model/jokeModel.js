import mongoose from "mongoose";

const jokeSchema = new mongoose.Schema({
    // id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: mongoose.Types.ObjectId, // Automatically generates a unique ID
    //   },
      content: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date,
        default: Date.now, // Automatically sets the current timestamp
      },
}, 
{ versionKey: false } // Disables the `__v` field
);

// Export the model based on the schema

export default mongoose.model("jokes", jokeSchema);