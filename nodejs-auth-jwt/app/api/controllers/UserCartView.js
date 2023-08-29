// // const cartModel = require('../models/userCartView')
// // const movieModel = require('../models/movies');

// const createCartsInfo = async (req, res)=>{
//   // console.log("data in request in createCartInfo is ==>", req.body);
//   // console.log("parameter id is ===>", req.params.id);
//   try {
//     const response = await cartModel.create({movieName: req.body.movieName, releaseDate: req.body.releaseDate, tickets:req.body.tickets, userID: req.body._id });
//     // console.log("Schema created in seerver==>", response);
//     res.json({ status: "success", message: "Tickets book successfully", data: null });
//   } catch (error) {
//     next(error);
//   }
// }

// const getAllCarts= async (req, res) => {
//     console.log("request in getMovies API ====> ",  req);
//     console.log("request in getMovies API ====> ",  res);
//      try {
//        const allCarts= await cartModel.find(); // Assuming find() fetches all carts
//        res.json(allCarts); 
//      } catch (error) {
//        console.error("errro in get Movies==>", error);
//        res.status(500).json({ error: 'Internal server error' });
//      }
//    };
// module.exports={
//     createCartsInfo,
//     getAllCarts
// }