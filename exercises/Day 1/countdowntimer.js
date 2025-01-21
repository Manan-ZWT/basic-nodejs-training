let end_time = parseInt(process.argv[2]);

const count = setInterval(() => {
  if (end_time > 0) {
    console.log(`Remaining time: ${end_time}s`);
    end_time--;
  } else {
    console.log("Time's up");
    clearInterval(count);
  }
}, 1000);
