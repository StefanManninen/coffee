import {
  table,
  findRecordByFilter,
  getMinifiedRecords,
} from "../../lib/airtable";

const FavoriteCoffeeStoreById = async (req, res) => {
  if (req.method === "PUT") {
    const {id} = req.body;
    try {
      if (id) {
        // Find Record
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          const record = records[0];
          const calculateVoting = parseInt(record.voting) + parseInt(1);
          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                voting: calculateVoting,
              },
            },
          ]);
          if (updateRecord) {
            const minifiedRecords = getMinifiedRecords(updateRecord);
            res.json(minifiedRecords);
          }
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
  }
};

export default FavoriteCoffeeStoreById;
