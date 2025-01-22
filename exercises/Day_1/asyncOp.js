try {
  let success_bool = parseInt(process.argv[2]);

  if (!Number.isInteger(success_bool) || success_bool < 0 || success_bool > 1) {
    throw "Invalid input: only 1 and 0 are allowed!";
  } else {
    let success_value = success_bool === 1;

    const fetchData = (success) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (success) {
            resolve("Data fetched successfully!");
          } else {
            reject("Error: Failed to fetch data.");
          }
        }, 2000);
      });
    };
    fetchData(success_value)
      .then((message) => {
        console.log(message);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("Success Value:", success_value);
  }
} catch (err) {
  console.error("Error:", err);
}
