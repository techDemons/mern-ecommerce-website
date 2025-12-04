import { address } from "../models/address.model.js";
import { User } from "../models/user.model.js";

export const createAddressController = async (req, res) => {
  try {
    const userId = req.user._id;
    const addressData = req.body;
    console.log("addressData: ", addressData)
    // create address entry
    const newAddress = new address({ ...req.body, user: userId });
    console.log("newAddress: ", newAddress)
    await newAddress.save();
    // optionally push to user's saved addresses array
    // await User.findByIdAndUpdate(
    //   userId,
    //   { $push: { addresses: newAddress._id } },
    //   { new: true }
    // );

    return res.status(201).json({
      success: true,
      message: "Address created successfully",
      address: newAddress,
    });

  } catch (error) {
    console.error("Address error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
