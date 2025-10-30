import User from "../models/user.js";


// Update user CartData : /api/cart/update

export const updateCart = async (req, res) => {
    try {
        // const { userId, cartItems } = req.body;
        const { cartItems } = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.json({ success: false, message: "User ID not found in token" });
        }
        await User.findByIdAndUpdate(userId, { cartItems });
        res.json({success: true, message: "Cart Updated"});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}