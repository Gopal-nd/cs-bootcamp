import cron from "node-cron";

const next = cron.schedule("* * * * * *", async () => {
  const now = new Date()
  let h = now.getHours()
  let m = now.getMinutes()
  let s = now.getSeconds()
  console.clear()
  console.log(`${h}:${m}:${s}`)
});


next.start()
setTimeout(() => {
  next.stop()
}, 5000)

