import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username existed");
    }
    
    const avatarLocalpath = req.files?.avatar[0]?.path;
    const coverLocalpath = req.files?.coverImage[0]?.path;

    if (!avatarLocalpath) {
        throw new ApiError(400,"Avatar file is required")
    }
   const avatar= await uploadOnCloudinary(avatarLocalpath);
    const coverImage = await uploadOnCloudinary(coverLocalpath);
    
    if (!avatar) {
        throw new ApiError(400,"Avatar file is required")
    }
    const user=await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken "
    )

    if (createdUser) {
        throw new ApiError(500,"something went wrong while creating user")
    }

    return res.status(201).json( new ApiResponce(200,createdUser,"user created successfully",true));

    
    
});

export { registerUser };
