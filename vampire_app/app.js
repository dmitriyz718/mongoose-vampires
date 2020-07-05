// 1. Require Mongoose
const mongoose = require(`mongoose`);
const connectionString = `mongodb://localhost:27017/mongoosevampires`;
// 2. Require your Model
const Vampire = require(`./models/vampire`)
// 3. Require your extra data source
const badGuys = require(`./models/populateVampires`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const methodOverride = require(`method-override`);
const vampireArr = require(`./models/populateVampires`);
const newVamps = require(`./models/newVampires`);
const app = express();
// 4. Connect your database
mongoose.connect(connectionString, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log(`Connected to MongoDB`);
    })
    .catch(() => console.log(`MongoDB connection failed`));

// dry code functions, not about to retype this for all that down there...
const vampFn = filter => Vampire.find(filter, (err, foundVamps) => {
    if (err) console.log(err);

    console.log(foundVamps);
    process.exit();
});

/////////////////////////////////////////////////
//Write your answers to add, query, update, remove, and Hungry for More below.

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// INSERT USING MONGOOSE
// ### Add the vampire data that we gave you
/* Vampire.collection.insertMany(vampireArr, (err, data) => {
    console.log("added provided vampire data")
    mongoose.connection.close(); // ??wondering what the difference is between connection.close, and proccess.exit??
}); */
// ### Add some new vampire data
/* Vampire.create(newVamps, (err, newVampsMade) => {
    if (err) console.log(err); // catch error if any
    // on success:
    console.log(`New Vamps Added!`);
    console.log(newVampsMade);
    process.exit();
}); */
/////////////////////////////////////////////////
// ## QUERYING
/////////////////////////////////////////////////
// ### Select by comparison
// Select all female vamps
// vampFn({ gender: `f` });
// worked

// Select all vamps with over 500 victims

// vampFn({ victims: { $gt: 500 } });
// worked

// Select all vamps with less than or equal to 150 victims
// vampFn({ victims: { $lte: 150 } });
// worked

// Select all vamps whos victim count is not 210234
// vampFn({ victims: { $ne: 210234 } });

// worked

// Select all vamps with > 150 & < 500 victims

// vampFn({ victims: { $gt: 150, $lt: 500 } })

//worked

/////////////////////////////////////////////////
// ### Select by exists or does not exist
// Have a title property

// Do not have a victims property

// Have a title and no victims

// Have victims and the victim count is > 1000

/////////////////////////////////////////////////
// ### Select with OR
// are from NY or NOLA

// love brooding or being tragic

// have > 1000 victims or love marshmellows

// have red or green eyes

/////////////////////////////////////////////////
//### Select objects that match one of several values

/////////////////////////////////////////////////
//### Negative Selection

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// ## REPLACE

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// ## UPDATE

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// ## REMOVE

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// ## HUNGRY FOR MORE
/////////////////////////////////////////////////
//## Select objects that match one of several values

/////////////////////////////////////////////////
//## Negative Selection

/////////////////////////////////////////////////
