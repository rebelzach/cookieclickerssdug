const fs = require('fs');
 
const contents = fs.readFileSync('B-large-practice.in', 'utf8');
const lines = contents.split('\n');
const testCount = parseInt(lines[0]);

let cookieFarmCost;
let cookieFarmRate;
let goal;
let output = "";

for (let line = 1; line < testCount + 1; line++) {
    const vars = lines[line].split(" ");
    cookieFarmCost = parseFloat(vars[0]);
    cookieFarmRate = parseFloat(vars[1]);
    goal = parseFloat(vars[2]);

    console.log(cookieFarmCost, cookieFarmRate, goal);

    const minimum = getMinimumTime();
    
    output += `Case #${line}: ${minimum}\n`;

    fs.writeFileSync('output.out', output);
}

console.log(output);

function getSecondsWhenBuyingFarms(numberOfFarmsToBuy)
{
    let currentTime = 0;
    let currentRate = 2.0;

    for(let i = 0; i < numberOfFarmsToBuy; i++) {
        // Buy a farm
        const timeToBuyFarm = secondsToGetSomeCookies(currentRate, cookieFarmCost);
        currentTime += timeToBuyFarm;
        currentRate += cookieFarmRate;
    }

    const timeToGoalDirect = secondsToGetSomeCookies(currentRate, goal);
    return currentTime + timeToGoalDirect;
}

function secondsToGetSomeCookies(rate, localGoal) {
    return localGoal / rate;
}

function getMinimumTime() {
    let minimumFound = false;
    let currentFarmBuyCount = 1;

    const timeToGoalDirect = getSecondsWhenBuyingFarms(0);

    let previousTime = timeToGoalDirect;

    while (!minimumFound) {
        const timeToGoalForCurrentBuyCount = getSecondsWhenBuyingFarms(currentFarmBuyCount); 

        // Find the rate of improvement
        const delta = timeToGoalForCurrentBuyCount - previousTime; 
        //console.log(delta);
        // If delta is greater than our "convergence" threshold then we have found our minimum
        if (delta > -0.000000001) {
            minimumFound = true;
        } else {
            // Try and buy another farm, see if that is an improvement
            previousTime = timeToGoalForCurrentBuyCount;
            ++currentFarmBuyCount;
        }
    }
    return previousTime;
}


