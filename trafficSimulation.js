

let regionUrl = 'http://localhost:9999/random-status';

const canvas = document.getElementById('trafficCanvas');
const ctx = canvas.getContext('2d');

const loadBalancer = { x: 300, y: 50, name: 'Load Balancer' };
const region1 = { x: 150, y: 200, name: 'Active Region', url: regionUrl, status: 'grey' };
const region2 = { x: 450, y: 200, name: 'Passive Region', url: regionUrl, status: 'grey' };
let currentRegion = region1;
let region1Color = region1.status;
let region2Color = region2.status;
let updateTrafficInterval;


function drawLoadBalancer() {
    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(loadBalancer.name, loadBalancer.x - 80, loadBalancer.y - 30);

    ctx.beginPath();
    ctx.moveTo(loadBalancer.x, loadBalancer.y - 50);
    ctx.lineTo(loadBalancer.x + 50, loadBalancer.y);
    ctx.lineTo(loadBalancer.x, loadBalancer.y + 50);
    ctx.lineTo(loadBalancer.x - 50, loadBalancer.y);
    ctx.closePath();
    ctx.fillStyle = '#3498db';
    ctx.fill();
}

function drawArrow(region) {
    ctx.beginPath();
    ctx.moveTo(loadBalancer.x, loadBalancer.y);
    ctx.lineTo(region.x, region.y);
    ctx.strokeStyle = region.status;
    ctx.lineWidth = 5;
    ctx.stroke();
}


function drawRegion(region) {
    ctx.fillStyle = region.status;
    ctx.fillRect(region.x - 30, region.y - 20, 60, 40);

    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(region.name, region.x, region.y - 25);
}

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLoadBalancer();
    drawRegion(region1);
    drawRegion(region2);
    drawArrow(region1);
    drawArrow(region2);
}

async function updateTraffic() {
    // Fetch status from both regions
    const [status1, status2] = await Promise.all([
        checkRegionStatus(region1),
        checkRegionStatus(region2)
    ]);

    // Update the region colors based on the statuses
    region1.status = status1;
    region2.status = status2;

    // Determine the current region based on the statuses
    currentRegion = status1 === 'green' ? region1 : region2;

    // Set the arrow color based on the current region status
    arrowColor1 = region1.status;
    arrowColor2 = region2.status;

    // Update the canvas with the current region and arrows
    updateCanvas();
}

async function checkRegionStatus(region) {
    try {
        const response = await fetch(region.url);
        return response.ok ? 'green' : 'red';
    } catch (error) {
        return 'grey';
    }
}
    // Clear any existing intervals before setting a new one
clearInterval(updateTrafficInterval);

// Set a new interval for updateTraffic
updateTrafficInterval = setInterval(updateTraffic, 30000);
updateTraffic(); // Immediately update the traffic status and canvas

