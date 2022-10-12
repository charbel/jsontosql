const fs = require("fs");
const json_data = require("./data.json");
const fileName = 'import.sql';
str =
  "insert into table_name ('" + Object.keys(json_data[0]).join("','") + "')";

fs.writeFileSync(fileName, str + "\n");

for (var i = 0; i < json_data.length; i++) {
  record = Object.values(json_data[i]);
  str = "";
  for (var j = 0; j < record.length; j++) {
    value = record[j];
    if (!isNaN(value)) {
      str += value + ",";
    } else {
      value = value.replace(/'/g, "\\'");
      str += "'" + value + "',";
    }
  }
  
  fs.appendFileSync(fileName, "(" + str.slice(0, -1) + ")");
  if (i <= record.length) fs.appendFileSync(fileName, ",\n");
}

fs.appendFileSync(fileName, ";\n");
