import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/"id"
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);

    if (!property) return new Response("Property Not Found", { status: 404 });
    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something Went Wrong", { status: 500 });
  }
};

//Delete /api/properties/:propertyId
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const propertyId = params.id;

    if (!propertyId)
      return new Response("Property ID is required", { status: 400 });

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    await connectDB();

    const property = await Property.findById(propertyId);
    if (!property) return new Response("Property not found", { status: 404 });
    if (property.owner.toString() !== sessionUser.userId) {
      return new Response("You are not authorized to delete this property", {
        status: 403,
      });
    }

    await property.deleteOne();

    return new Response("Property deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Failed to delete property", { status: 500 });
  }
};

//Put /api/properties/:propertyId
export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    
    const sessionUser = await getSessionUser();
    
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }
    const { userId } = sessionUser;
    const { id } = params;
    const formData = await request.formData();

    //Access all values from amenities and images
    const amenities = formData.getAll("amenities");

    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return new Response("Property not found", { status: 404 });
    }

    //Verify ownership
    if (existingProperty.owner.toString() !== userId) {
      return new Response("You are not authorized to edit this property", {
        status: 403,
      });
    }
    //Create propertyData object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        montly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    
    //Update property in database
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);
  
    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response("Failed to add property", {
      status: 500,
    });
  }
};
