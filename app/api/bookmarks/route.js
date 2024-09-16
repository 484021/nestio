import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const POST = async (req) => {
  try {
    await connectDB();

    const { propertyId } = await req.json();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }
    const userId = sessionUser.userId;

    const user = await User.findById(userId);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    //Check if user is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = "Property removed from bookmarks";
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Property added to bookmarks";
      isBookmarked = true;
    }

    await user.save();

    return new Response(
      JSON.stringify(
        {
          success: true,
          message,
          isBookmarked,
        },
        { status: 200 }
      )
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to add property", { status: 500 });
  }
};

//Get bookmarks to display into saved properties route
export const GET = async (req) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }
  //get properties from user bookmarks array
    const user = await User.findById(sessionUser.userId).populate({
      path: "bookmarks",
      model: Property,
    });
    console.log(user);
    return new Response(
      JSON.stringify(
        {
          success: true,
          bookmarks: user.bookmarks,
        },
        { status: 200 }
      )
    );
    
  } catch (error) {
    console.log(error);
    return new Response("Failed to get bookmarks", { status: 500 });
  }
};
