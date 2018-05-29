/**Declaring Fields*/
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jp = bodyParser.json();
var vehicleArray = [];

/**Using bodyParser*/
app.use(jp);

/**Home Endpoint*/
app.get('/', (req, res) => {
  //Sending response
  res.send("This is the home page");
});

/**Inventory Endpoint*/
app.get('/inventory', (req, res) => {
  //Checking array
  if(checkArray() === false){
    //Sending response
    res.send("The inventory is empty.");
  }else{
    //Sending response
    res.send(vehicleArray);
  }
});

/**Inventory Style Endpoint*/
app.get('/inventory/style/:style', (req, res) => {
  //Declaring fields
  var matchingVehicles = [];
  var style = req.params.style;
  var exists = false;

  //Checking array
  if(checkArray() === false){
    //Sending response
    res.send("The inventory is empty.");
  }else{
    //Iterating through array
    for(var i = 0; i < vehicleArray.length; i++){
      //Comparing fields
      if(vehicleArray[i].style.toUpperCase() === style.toUpperCase()){
        //Setting boolean
        exists = true;

        //Adding to array
        matchingVehicles.push(vehicleArray[i]);
      }
    }

    //Checking boolean
    if(exists === false){
      //Sending response
      res.send("There are no vehicles with the style '" + style + "'");
    }else{
      //Sending response
      res.send(matchingVehicles);
    }
  }
});

/**Inventory VIN Endpoint*/
app.get('/inventory/vin/:vin', (req, res) => {
  //Declaring fields
  var matchingVehicles = [];
  var vin = req.params.vin;
  var exists = false;

  //Checking array
  if(checkArray() === false){
    //Sending response
    res.send("The inventory is empty.");
  }else{
    //Iterating through array
    for(var i = 0; i < vehicleArray.length; i++){
      //Comparing fields
      if(vehicleArray[i].vin.toUpperCase() === vin.toUpperCase()){
        //Setting boolean
        exists = true;

        //Adding to array
        matchingVehicles.push(vehicleArray[i]);
      }
    }

    //Checking boolean
    if(exists === false){
      //Sending response
      res.send("There are no vehicles with the VIN '" + vin + "'");
    }else{
      //Sending response
      res.send(matchingVehicles);
    }
  }
});

/**Inventory Make/Model Endpoint*/
app.get('/inventory/:make/:model', (req, res) => {
  //Declaring fields
  var matchingVehicles = [];
  var make = req.params.make;
  var model = req.params.model;
  var exists = false;

  //Checking array
  if(checkArray() === false){
    //Sending response
    res.send("The inventory is empty");
  }else{
    //Iterating through array
    for(var i = 0; i < vehicleArray.length; i++){
      //Comparing fields
      if(vehicleArray[i].make.toUpperCase() === make.toUpperCase() && vehicleArray[i].model.toUpperCase() === model.toUpperCase()){
        //Setting boolean
        exists = true;

        //Adding to array
        matchingVehicles.push(vehicleArray[i]);
      }
    }

    //Checking boolean
    if(exists === false){
      //Sending response
      res.send("There are no vehicles with the make '" + make + "' and model '" + model + "'");
    }else{
      //Sending response
      res.send(matchingVehicles);
    }
  }
});

/**Styles Endpoint*/
app.get('/styles', (req, res) => {
  //Declaring fields
  var styles = [];
  var exists = false;

  //Checking array
  if(checkArray() === false){
    //Sending response
    res.send("The inventory is empty");
  }else{
    //Iterating through array
    for(var i = 0; i < vehicleArray.length; i++){
      //Checking styles array
      if(styles.length === 0){
        //Adding to styles array
        styles.push(vehicleArray[i].style);
      }else{
        //Comparing styles array
        for(var j = 0; j < styles.length; j++){
          //Checking for duplicates
          if(vehicleArray[i].style.toUpperCase() === styles[j].toUpperCase()){
            //Setting boolean
            exists = true;
          }
        }

        //Checking boolean
        if(exists === true){
          //Resetting boolean
          exists = false;
        }else{
          //Adding to styles array
          styles.push(vehicleArray[i].style);
        }
      }
    }

    //Sending response
    res.send(styles);
  }
});

/**Years Endpoint*/
app.get('/years', (req, res) => {
  //Declaring fields
  var years = [];

  //Checking array
  if(checkArray() === false){
    //Sending response
    res.send("The inventory is empty");
  }else{
    //Iterating through array
    for(var i = 0; i < vehicleArray.length; i++){
      //Adding to years array
      years.push(vehicleArray[i].year);
    }

    //Sending response
    res.send(years);
  }
});

/**Query Endpoint*/
app.get('/inventory/query?', (req, res) => {
  //Declaring fields
  var query = req.query;
  var querySize = countProperties(query);
  var queryProperties = Object.getOwnPropertyNames(query);
  var matches = true;
  var located = false;
  var foundVehicles = [];

  //Checking array
  if(checkArray() === false){
    //Sending response
    res.send("The inventory is empty");
  }else{
    //Iterating through array
    for(var i = 0; i < vehicleArray.length; i++){
      //Iterating through properties
      for(var j = 0; j < queryProperties.length; j++){
        //Comparing properties
        if(vehicleArray[i][queryProperties[j]].toUpperCase() != query[queryProperties[j]].toUpperCase()){
          //Setting boolean
          matches = false;
        }
      }

      //Checking boolean
      if(matches === false){
        //Resetting boolean
        matches = true;
      }else{
        //Adding to array
        foundVehicles.push(vehicleArray[i]);

        //Setting boolean
        located = true;
      }
    }

    //Checking boolean
    if(located === false){
      //Sending response
      res.send("No vehicles were found with the given query string");
    }else{
      //Sending response
      res.send(foundVehicles);
    }
  }
});

/**Inventory Post Endpoint*/
app.post('/inventory', (req, res) => {
  //Adding to Array
  vehicleArray.push(req.body);

  //Sending response
  res.send("Vehicle added to inventory");
});

/**Inventory Style Post Endpoint*/
app.post('/inventory/style/:style', (req, res) => {
  //Setting style
  req.body.style = req.params.style;

  //Adding to array
  vehicleArray.push(req.body);

  //Sending response
  res.send("Vehicle added to inventory");
});

/**Inventory Put Endpoint*/
app.put('/inventory/:id', (req, res) => {
  //Declaring fields
  var id = req.params.id;
  var found = false;

  //Checking array
  if(checkArray() === false){
    //Sending response
    res.send("The inventory is empty");
  }else{
    //Iterating through array
    for(var i = 0; i < vehicleArray.length; i++){
      //Comparing ID's
      if(vehicleArray[i].id === id){
        //Setting boolean
        found = true;

        //Setting ID
        req.body.id = id;

        //Splicing to array
        vehicleArray.splice(i, 1, req.body);

        //Breaking out of loop
        break;
      }
    }

    //Checking boolean
    if(found === true){
      //Sending response
      res.send("Vehicle with the ID " + id + " was updated");
    }else{
      //Sending response
      res.send("There is no vehicle with the ID " + id);
    }
  }
});

/**DNE Endpoint*/
app.get('/*', (req, res) => {
  //Sending response
  res.send("Page does not exist");
});

/**Listening on Port 3000*/
app.listen(3000, () => console.log("Listening on port 3000!"));

/**Vehicle Object*/
function vehicle(vin, style, make, model, year, miles, color){
  //Setting fields
  this.vin = vin;
  this.style = style;
  this.make = make;
  this.model = model;
  this.year = year;
  this.miles = miles;
  this.color = color;
}

/**checkArray Function*/
checkArray = () => {
  //Checking for empty array
  if(vehicleArray.length === 0){
    //Returning false
    return false;
  }else{
    //Returning true
    return true;
  }
}

/**countProperties Function*/
countProperties = (obj) => {
  //Declaring fields
  var size = 0;

  //Iterating through object
  for(var property in obj){
    //Checking object property
    if(Object.prototype.hasOwnProperty.call(obj, property)){
      //Increasing size
      size++;
    }
  }

  //Returning size
  return size;
}
