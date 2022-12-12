const fs = require("fs");

const filePath = "src/db/db.json";

const updateDB = (data) => {
  fs.writeFileSync(filePath,JSON.stringify(data));
};

const readDB = () =>{
  if(!fs.existsSync(filePath)){
    return null;
  };

  const info  = fs.readFileSync(filePath, { encoding: "utf-8" });
  const data = JSON.parse(info);

  return data;
};

module.exports = {
  updateDB,
  readDB
};