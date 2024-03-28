import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
         description:{
                  type:String,
                  required:true
         },
         name:{
                  type:String,
                  required:true
         },
         productimage:{
                  type:String,
         },
         price:{
                  type:Number,
                  default:0
         },
         stock:{
                  type:Number,
                  default:0
         },
         category:{
                  type:mongoose.Schema.Types.ObjectId,
                  ref: 'Category'
         },
         owner:{
                  type:mongoose.Schema.Type.ObjectId,
                  ref:'User'
         }

},{timestamps:true})

const  Product = mongoose.model("product" , productSchema)