const mongoose = require("mongoose");
const xlsx = require("xlsx");
require("dotenv").config();

//schemas
const userSchema = new mongoose.Schema({
  email: { type: String },
  userId: { type: String },
});
const accessSchema = new mongoose.Schema({
  userId: { type: String },
  access_level: { type: String },
});

//models
const UserModel = mongoose.model("User", userSchema);
const AccessModel = mongoose.model("Access", accessSchema);

//get parsed data from Excel
const getParsedData = () => {
  const filePath = process.env.FILE_PATH;
  const workbook = xlsx.readFile(filePath);
  const sheetToConvert = workbook.Sheets["Sheet1"];
  const sheetData = xlsx.utils.sheet_to_json(sheetToConvert);
  return sheetData;
};

//enum for access levels
const accessLevelsEnum = Object.freeze({
  ADMIN: "ADMIN",
  COORDINATOR: "COORDINATOR",
  STUDENT: "STUDENT",
});

// create access record in the database
const createAcccessRecordOnDb = async (accessLevel, user) => {
  const newAccessRecord = {
    userId: user._id,
    access_level: accessLevel,
  };
  await AccessModel.create(newAccessRecord);
  console.log("Access record inserted:", newAccessRecord);
};

//process data and update mongodb
const processDataAndInsert = async () => {
  try {
    const parsedData = getParsedData();

    for (const entry of parsedData) {
      const emailToCheck = entry.email;
      const existingUser = await UserModel.findOne({ email: emailToCheck });

      if (existingUser) {
        //skip entry if user exists on access levels collection
        const userHasAccessLevels = await AccessModel.findOne({
          userId: existingUser._id,
        });
        if (userHasAccessLevels) continue;

        //if user exists, update the access collection
        for (const level of Object.values(accessLevelsEnum)) {
          if (entry[level]) {
            await createAcccessRecordOnDb(level, existingUser);
          }
        }
      } else {
        //if user does not exist, create a new user
        const newUserRecord = { email: emailToCheck };
        const newUser = await UserModel.create(newUserRecord);
        console.log("User record inserted:", newUserRecord);

        // then, update the access collection
        for (const level of Object.values(accessLevelsEnum)) {
          if (entry[level]) {
            await createAcccessRecordOnDb(level, newUser);
          }
        }
      }
    }

    console.log("All records processed successfully.");
  } catch (error) {
    console.error("Error:", error);
  }
};

// Connect to MongoDB, start the data processing, and then disconnect
const connectAndProcessData = async () => {
  try {
    const URI = process.env.URI;
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");

    await processDataAndInsert();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    mongoose.disconnect();
  }
};

connectAndProcessData();
