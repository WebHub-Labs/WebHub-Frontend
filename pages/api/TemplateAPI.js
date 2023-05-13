import connectMongo from "../../utils/MongoConnect";
import Product from "../../models/Product";

export default async function templateAPI(req, res) {
  // if (req.method === "POST") {
  //   console.log("CREATING DOCUMENT");
  //   const createdProduct = await Product.create(req.body);
  //   console.log("CREATED DOCUMENT");
  //   res.json({ createdProduct });
  // }

  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    if (req.method === "POST") {
      console.log("CREATING DOCUMENT");
      const createdProduct = await Product.create(req.body);
      console.log("CREATED DOCUMENT");
      res.json({ createdProduct });
    } else if (req.method === "GET") {
      console.log("FETCHED DOCUMENTS");
      const fetchedProduct = await Product.find({});
      console.log("FETCHED DOCUMENTS");
      res.json({ fetchedProduct });
    } else {
      throw new Error(`Unsupported HTTP method: ${req.method}`);
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
