import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";


// GET /api/properties/user/:userId
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const userId = params.userId;

    if (!userId) return new Response("User ID is required", { status: 400 });

    const properties = await Property.find({ owner: userId });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch properties", { status: 500 });
  }
};

