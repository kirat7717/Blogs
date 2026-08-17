import cron from "node-cron";
import { greetingEmail } from "../services/greeting.service.js";

cron.schedule("0 9 * * *", async () => {
  console.log("work");

  await greetingEmail("morning");
});

cron.schedule("0 21 * * *", async () => {
  await greetingEmail("night");
});


console.log("Cron file loaded");
