const catchAsync =  (func) => {
    return (req,res,next )=>{
        func(req,res,next).catch((err) =>{
            console.log(err);

            next();
        })
    }
}
// console.log("Here", {catchAsync})
module.exports=catchAsync;