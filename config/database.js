import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect("mongodb+srv://c99ghost:eeoNhfjapavDhoHH@formsubmissions.y9waj.mongodb.net/?retryWrites=true&w=majority&appName=formSubmissions", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

export default connectDB;