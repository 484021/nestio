import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";


// GET /api/messages/unread-count
export async function GET(req) {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("You must be logged in to send a message", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const unreadCount = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify({ unreadCount }), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Something Went Wrong", { status: 500 });
  }
}

