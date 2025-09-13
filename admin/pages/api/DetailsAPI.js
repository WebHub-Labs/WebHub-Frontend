import connectMongo from "../../utils/MongoConnect";
import Details from "../../models/Details";

export default async function detailsAPI(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    if (req.method === "POST") {
      console.log("CREATING DOCUMENT");
      const createdDetails = await Details.create(req.body);
      console.log("CREATED DOCUMENT");
      res.json({ createdDetails });
    } else if (req.method === "GET") {
      console.log("FETCHED DOCUMENTS");
      const fetchedDetails = await Details.find({});
      console.log("FETCHED DOCUMENTS");
      res.json({ fetchedDetails });
    } else {
      throw new Error(`Unsupported HTTP method: ${req.method}`);
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
