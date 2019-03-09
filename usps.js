module.exports.types = {
  stamped: "Letters (Stamped)",
  metered: "Letters (Metered)",
  large:   "Large Envelopes (Flats)",
  first:   "First-Class Package Service - Retail"
}

module.exports.typeText = function(type) {
  return this.types[type]
}

module.exports.getPrice = function(type, weight) {
  var price = "Too heavy";

  switch (type) {
    case "stamped":
      if      (weight < 1  ) { price = "0.55" }
      else if (weight < 2  ) { price = "0.70" }
      else if (weight < 3  ) { price = "0.85" }
      else if (weight < 3.5) { price = "1.00" }
      break;
    case "metered":
      if      (weight < 1  ) { price = "0.50" }
      else if (weight < 2  ) { price = "0.70" }
      else if (weight < 3  ) { price = "0.80" }
      else if (weight < 3.5) { price = "0.95" }
      break;
    case "large":
      weight = Math.floor(weight);
      if (weight < 13) {
        price = [
          "1.00", "1.15", "1.30", "1.45","1.60", "1.75", "1.90",
          "2.05", "2.20","2.35", "2.50", "2.65", "2.80"
        ][weight]
      }
      break;
    case "first":
      if      (weight <  4) { price = "3.66" }
      else if (weight <  8) { price = "4.39" }
      else if (weight < 12) { price = "5.19" }
      else if (weight < 13) { price = "5.71" }
      break;
  }

  return (price === "Too heavy" ? price : `$${price}`);
}
