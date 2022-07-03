import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable";

const createCoffeStore = async (req, res) => {
  if (req.method === "POST") {
    const {id, name, address, neighborhood, imgUrl, voting} = req.body;
    try {
      if (id) {
        // Find Record
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          res.json(records);
        } else {
          // Create record
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighborhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecords);
            res.json({records});
          } else {
            res.status(400);
            res.json({message: "Please provide id and name"});
          }
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
  }
};

export default createCoffeStore;
