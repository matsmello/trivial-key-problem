const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = event?.partitionKey;

  if (!event) return TRIVIAL_PARTITION_KEY;

  if (event.partitionKey) {
    candidate = isNotAString(candidate) ? JSON.stringify(candidate) : candidate;

    return isExceededTheLimit(candidate, MAX_PARTITION_KEY_LENGTH) ? createHash(candidate) : candidate;
  }
  
  const data = JSON.stringify(event);

  return createHash(data);
};

function isExceededTheLimit(obj, limit) {
  return obj.length > limit;
}

function isNotAString(obj) {
  return typeof obj !== "string"
}

function createHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}