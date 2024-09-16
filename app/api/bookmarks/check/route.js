import connectDB from "@/config/database";
import User from "@/models/User";
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

    return new Response(
      JSON.stringify(
        {
          success: true,

          isBookmarked,
        },
        { status: 200 }
      )
    );
  } catch (error) {
    console.log(error);
  }
};
