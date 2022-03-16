const reader = require("xlsx");
const path = require("path");
const capitalize = require("../lib/capitalize");

const file = reader.readFile(path.join(__dirname, "../data/rrpps.xlsx"));

class Rrpp {
  constructor(fullName, dni, phoneNumber, sector) {
    (this.fullName = this.formatNames(fullName)),
      (this.dni = this.formatDNI(dni)),
      (this.phoneNumber = this.formatPhoneNumber(phoneNumber)),
      (this.sector = sector);
  }

  formatNames(name) {
    const arrNames = name.split(" ");

    arrNames.forEach((name, index) => {
      if (name) {
        const correctedName = capitalize(name);
        arrNames[index] = correctedName;
      } else {
        arrNames.splice(index, 1);
      }
    });
    return arrNames.join(" ");
  }

  formatDNI(dni) {
    const deletePoints = dni.split(".").join("");
    return Number(deletePoints.split(" ").join(""));
  }

  formatPhoneNumber(phoneNumber) {
    return Number("549" + phoneNumber);
  }
}

const cleanDuplicated = (data) => {
  const filteredData = data.filter(
    (value, index, self) => index === self.findIndex((t) => t.dni === value.dni)
  );
  return filteredData;
};

const fileToJson = (file) => {
  let data = [];

  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]], {
    raw: false,
    header: "A",
  });

  for (let i = 1; i < temp.length; i++) {
    data.push(new Rrpp(temp[i].A, temp[i].B, temp[i].C, temp[i].D));
  }

  return cleanDuplicated(data);
};

const main = () => {
  return fileToJson(file);
};

module.exports = main;
