try {
  let end_time = parseInt(process.argv[2]);
  if (!Number.isInteger(end_time) || end_time < 1) {
    throw "Invalid input: only positive integer values are allowed";
  } else {
    const count = setInterval(() => {
      if (end_time > 0) {
        console.log(`Remaining time: ${end_time}s`);
        end_time--;
      } else {
        console.log("Time's up");
        clearInterval(count);
      }
    }, 1000);
  }
} catch (err) {
  console.log(err);
}
