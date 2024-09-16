import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";


// POST /api/messages

export const POST = async (req) => {
  try {
    await connectDB();
    const { name, phone, message, property, recipient, email } =
      await req.json();

    console.log(name, phone, message, property, recipient, email);

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("You must be logged in to send a message", {
        status: 401,
      });
    }

    const { user } = sessionUser;

    //Can not send message to self
    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: "You can not send message to your self" }),
        {
          status: 400,
        }
      );
    }

    const newMessage = new Message({
      name,
      phone,
      body: message,
      property,
      sender: user.id,
      recipient,
      email,
    });

    console.log(newMessage);

    await newMessage.save();

    return new Response(
      JSON.stringify({ message: "Message sent successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("You must be logged in to get messages", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const readMessages = await Message.find({
      recipient: userId,
      read: true,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
