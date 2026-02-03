import cron from "node-cron";

cron.schedule("*/4 * * * * *", () => {
  console.log("Runs every minute");
});

