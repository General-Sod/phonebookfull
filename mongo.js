const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://admin:${password}@cluster0.wevw5.mongodb.net/<dbname>?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

const newName = process.argv[3];
const newNumber = process.argv[4];
const person = new Person({
  name: newName,
  number: newNumber,
});

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connect.close();
  });
} else {
  person.save().then((result) => {
    console.log(`added ${newName} number ${newNumber} to phonebook`);
    mongoose.connect.close();
  });
}

// Person.find({}).then((result) => {
//   result.forEach((person) => {
//     console.log(person);
//   });
//   mongoose.connect.close();
// });
// personSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject._v;
//   },
// });
personSchema.set("toJSON", {
  transform: (document, returned),
});
