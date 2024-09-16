import connectDB from "@/config/database";
import Property from "@/models/Property";


export const dynamic = "force-dynamic";

// GET featured properties
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({ is_featured: true });
    
    return new Response(
      JSON.stringify(
        properties,
      ),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response("Something Went Wrong", { status: 500 });
  }
};
