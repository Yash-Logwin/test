import express from "express";
import cors from "cors";
import connectionDb from "./db/config.js";
import User from "./db/User.js";
import Product from "./db/Product.js";
import swal from "sweetalert";
const app = express();
import {check,validationResult,checkSchema} from 'express-validator'
const port = process.env.PORT || 8000;

import Jwt from "jsonwebtoken";
import Joi from "joi";
import e from "express";
const JwtKey = "e-comm";

connectionDb();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, JwtKey, { expiresIn: "24h" }, (err, token) => {
    if (err) {
      res.send({ result: "Something  Went Wrong." });
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");

    if (user) {
      Jwt.sign({ user }, JwtKey, { expiresIn: "24h" }, (err, token) => {
        if (err) {
          res.send({ result: "Something  Went Wrong." });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ resut: "User Not Found" });
    }
  } else {
    res.send({ resut: "User Not Found" });
  }
});

// joi validation 

// const validationMiddleware = (req, res, next) => {
// const Schema = Joi.object().keys({
//   name:Joi.string().required(),
//   price:Joi.number().required(),
//   category:Joi.string().optional(),
//   userId:Joi.string().required(),
//   company:Joi.string().required()
// }).unknown(true)

// const { error } = Schema.validate(req.body, {abortEarly:false});
//   if (error) {
//     const {details} = error
//     res.status(200).json({ error: details }); 
//   } else {  
//     next();
//   }
// }

// express-validator 
const validationMiddleware =checkSchema({
  name:{
    isAlpha:true,
  },
  price:{
    isNumeric:true
  },
  category:{
    isAlpha:true
  },
  userId:{
    isLength:{
      options:{min:8} 
    }
  },
  company:{
    isAlpha:true
  }
})

app.post("/add-product",validationMiddleware,async (req, res) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    res.status(422).send(errors)
  }else{  
    res.status(200).send(req.body) 
  } 
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products",verifyToken, async (req, res) => {
  let product = await Product.find();
  if (product.length > 0) {
    res.send(product);
  } else {
    res.send({ result: "No Products Found" });
  }
});

app.delete("/product/:id",verifyToken, async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id",verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Record Found" });
  }
});

app.put("/product/:id",verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

// search api
app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    console.log(token);
    Jwt.verify(token, JwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Please provide valid token " });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "Please add token with header" });
  }
}

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
