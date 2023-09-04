const createCartsInfo = async (req, res)=>{
  try {
    const response = await cartModel.create({movieName: req.body.movieName, releaseDate: req.body.releaseDate, tickets:req.body.tickets, userID: req.body._id });
    res.json({ status: "success", message: "Tickets book successfully", data: null });
  } catch (error) {
    next(error);
  }
}
const getAllCarts= async (req, res) => {
     try {
       const allCarts= await cartModel.find(); // Assuming find() fetches all carts
       res.json(allCarts); 
     } catch (error) {
       console.error("errro in get Movies==>", error);
       res.status(500).json({ error: 'Internal server error' });
     }
   };
module.exports={
    createCartsInfo,
    getAllCarts
}