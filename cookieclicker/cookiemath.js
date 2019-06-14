const cookieFarmCost = 500;
const cookieFarmRate = 4.0;
const goal = 2000.0;

function doCookie() {
  debugger;

  let minimumFound = false;
  let currentTime = 0;
  let currentRate = 2.0;
  let numberOfCookies = 0;

  function secondsToGoal(rate, localGoal) {
    return localGoal / rate;
  }

  const timeToBuyFarm = secondsToGoal(
    currentRate + cookieFarmRate,
    cookieFarmCost
  );
  const timeToGoal = secondsToGoal(currentRate, goal);

  if (timeToGoal <= timeToBuyFarm) {
    console.log("Done!");
  } else {
    currentTime = timeToBuyFarm;
    currentRate += cookieFarmRate;
    console.log("Not yet...");
    while (!minimumFound) {
      const timeToGoalWithNewFarm = secondsToGoal(
        currentRate + cookieFarmRate,
        cookieFarmCost
      );
      const timeToGoalDirect = secondsToGoal(currentRate, goal);
      if (timeToGoalDirect <= timeToGoalWithNewFarm) {
        currentTime += timeToGoalDirect;
        minimumFound = true;
      } else {
        currentTime += timeToGoalWithNewFarm;
        currentRate += cookieFarmRate;
      }
    }
  }

  console.log(currentTime);
}
