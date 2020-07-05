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
const { findOneAndUpdate } = require("./models/vampire");
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

// dry code function, not about to retype this for all that down there...
const vampFn = filter => Vampire.find(filter, (err, foundVamps) => {
    if (err) console.log(err);

    console.log(foundVamps);
    process.exit();
});
// setting property to someothing other than .find when for example updating or deleting
const vampFnDynamic = (key, filter) => Vampire[key](filter, (err, foundVamps) => {
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

// vampFn({ victims: { $gt: 150, $lt: 500 } });

//worked

/////////////////////////////////////////////////
// ### Select by exists or does not exist
// Have a title property
// vampFn({ title: { $exists: true } });

// Do not have a victims property
// vampFn({ victims: { $exists: false } });

// Have a title and no victims
// vampFn({ title: { $exists: true }, victims: { $exists: false } });

// Have victims and the victim count is > 1000
// vampFn({ victims: { $gt: 1000 } });

/////////////////////////////////////////////////
// ### Select with OR
// are from NY or NOLA
/* vampFn({
    $or: [{ location: { $eq: 'New York, New York, US' } },
    { location: { $eq: 'New Orleans, Louisiana, US' } }]
}); */
// worked

// love brooding or being tragic
/* vampFn({
    $or: [{ loves: { $eq: `brooding` } }, { loves: { $eq: `being tragic` } }]
}); */
//worked

/* // have > 1000 victims or love marshmallows
vampFn({
    $or: [{ victims: { $gt: 1000 } }, { loves: { $eq: `marshmallows` } }]
}); */
//worked

// have red or green eyes
/* vampFn({
    $or: [{ eye_color: { $eq: `red` } }, { eye_color: { $eq: `green` } }]
}); */
// worked

/////////////////////////////////////////////////
//### Select objects that match one of several values
/*Select all the vampires that:
love either frilly shirtsleeves or frilly collars // use $or for either or and $in to check for values in array */
// vampFn({ $or: [{ loves: { $in: 'frilly shirtsleeves' } }, { loves: { $in: 'frilly collars' } }] });
//love brooding
// vampFn({ loves: { $in: `brooding` } });
//love at least one of the following: appearing innocent, trickery, lurking in rotting mansions, R&B music
/* vampFn({
    $or: [{ loves: { $in: 'appearing innocent' } },
    { loves: { $in: 'trickery' } },
    { loves: { $in: 'lurking in rotting mansions' } },
    { loves: { $in: 'R&B music' } }]
}); */
//love fancy cloaks but not if they also love either top hats or virgin blood *
//Hint-You will also have to use $nin *
/* vampFn({
    $and: [{ loves: { $in: 'fancy cloaks' } },
    {
        $and: [{ loves: { $nin: 'top hats' } },
        { loves: { $nin: 'virgin blood' } }]
    }]
}); */

/////////////////////////////////////////////////
//### Negative Selection
//love ribbons but do not have brown eyes
// vampFn({ $and: [{ loves: { $in: 'ribbons' } }, { eye_color: { $ne: 'brown' } }] });

//are not from Rome
// vampFn({ location: { $ne: 'Rome, Italy' } });

//do not love any of the following: [fancy cloaks, frilly shirtsleeves, appearing innocent, being tragic, brooding]
/* vampFn({
    $and: [{ loves: { $nin: 'fancy cloaks' } }, { loves: { $nin: 'frilly shirtsleeves' } },
    { loves: { $nin: 'appearing innocent' } }, { loves: { $nin: 'being tragic' } },
    { loves: { $nin: 'brooding' } }]
}); */

//have not killed more than 200 people
// vampFn({ victims: { $lt: 200 } });

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// ## REPLACE
/* vampFnDynamic(`findOneAndUpdate`, ({ name: 'Claudia' },
    { $set: { name: 'Eve' } },
    { new: true })); */ // DONT KNOW WHY THIS ISNT WORKING
// MANUALLY:
/* Vampire.findOneAndUpdate({ name: 'Claudia' },
    { $set: { name: 'Eve' } },
    { new: true },
    (err, editVampire) => {
        if (err) console.log(err);

        console.log(editVampire);
        process.exit();
    }); */

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// ## UPDATE
/* Vampire.findOneAndUpdate({ name: 'Eve' },
    { $set: { gender: 'm' } },
    { new: true },
    (err, editVampire) => {
        if (err) console.log(err);
        console.log(editVampire);
        process.exit();
    }); */
/* Vampire.findOneAndUpdate({ name: 'Eve' },
    { $set: { name: 'moniker' } },
    { new: true },
    (err, editVamp) => {
        if (err) console.log(err);
        console.log(editVamp);
        process.exit();
    }); */
/* Vampire.updateMany({ gender: 'f' },
    { $set: { gender: 'fems' } },
    { new: true },
    (err, editVamp) => {
        if (err) console.log(err);
        console.log(editVamp);
        process.exit();
    }); */
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
