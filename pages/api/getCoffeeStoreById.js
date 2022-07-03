import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const {id} = req.query;

  try {
    if (id) {
      // Find Record
      const records = await findRecordByFilter(id);

      if (records.length !== 0) {
        res.json(records);
      } else {
        res.status(400);
        res.json({message: "No record found"});
      }
    } else {
      res.status(400);
      res.json({message: "Please provide id "});
    }
  } catch (err) {
    console.error("There is an error", err);
    res.status(500);
    res.json({message: "Something went wrong", err});
  }
};

export default getCoffeeStoreById;
