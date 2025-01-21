let success_bool = parseInt(process.argv[2]);
let success_value = true;

if (success_bool == 1) {
  success_value = true;
} else if (success_bool == 0) {
  success_value = false;
} else {
    console.log("Invalid input")
  return;
}

function fetchData(success) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve("Data fetched successfully!");
      } else {
        reject("Error: Failed to fetch data.");
      }
    }, 2000);
  });
}

fetchData(success_bool)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });
