import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// PUT /api/messages/:id
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("You must be logged in to send a message", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) {
      return new Response("Message not found", {
        status: 404,
      });
    }

    //Verify ownership
    if (message.recipient.toString() !== userId) {
      return new Response("You are not authorized to edit this message", {
        status: 403,
      });
    }

    //Update message to read/unread depending on the previous state
    message.read = !message.read;

    await message.save();
    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Something Went Wrong", { status: 500 });
  }
}

// Delete message
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("You must be logged in to send a message", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) {
      return new Response("Message not found", {
        status: 404,
      });
    }

    //Verify ownership
    if (message.recipient.toString() !== userId) {
      return new Response("You are not authorized to delete this message", {
        status: 403,
      });
    }

    //delete message
    await message.deleteOne();

    return new Response("Message deleted", { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Something Went Wrong", { status: 500 });
  }
}
