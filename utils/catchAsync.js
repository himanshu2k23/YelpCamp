const catchAsync =  (func) => {
    return (req,res,next )=>{
        func(req,res,next).catch((error) =>{
            console.log(error);
            next();
        })
    }
}
// console.log("Here", {catchAsync})
module.exports=catchAsync;