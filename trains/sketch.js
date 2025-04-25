// Configuration variables
const numTracks = 40;
const minCarsPertrain = 3;
const gridSize = 50;
const trackWidth = 2;
const trainLength = 16;
const trainHeight = 12;
const baseSpeed = 0.6;
const colors = ['#FF5252', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0'];
const carSpacing = 17;
const minSegments = 5;
const maxSegments = 15;

let tracks = [];
let trains = [];

class Track {
    constructor(gridX, gridY) {
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.points = [];
        this.segments = [];
        this.totalLength = 0;
        this.startPos = createVector(
            gridX * gridSize,
            gridY * gridSize
        );
        this.generatePath();
        this.processSegments();
        this.isClosed = this.points.length > 1 && 
            this.points[this.points.length-1].dist(this.startPos) < 1;
    }

    generatePath() {
        let current = this.startPos.copy();
        let dir = createVector(1, 0);
        let prevDirections = [];
        this.points.push(current.copy());
        
        let segments = floor(random(minSegments, maxSegments));
        let safety = 0;
        
        while (safety++ < 50) {
            // Choose turn angle (45° or 90°)
            let angle = random([-PI/2, -PI/4, PI/4, PI/2]);
            dir.rotate(angle);
            
            // Calculate next point
            let next = current.copy().add(dir.copy().mult(gridSize * random([1,2,3,4])));
            
            // Keep within grid bounds
            if (next.x < gridSize|| next.x > width-gridSize || next.y < gridSize|| next.y > height-gridSize) {
                dir.rotate(-angle); // Undo rotation
                continue;
            }
            
            this.points.push(next.copy());
            prevDirections.push(dir.copy());

            current = next;
            
            // Check if we can close the circuit
            if (this.points.length > segments && current.dist(this.startPos) < gridSize) {
                this.points.push(this.startPos.copy());
                break;
            }
        }
    }

    processSegments() {
        this.totalLength = 0;

        for (let i = 0; i < this.points.length - 1; i++) {
            let start = this.points[i];
            let end = this.points[i + 1];
            let length = start.dist(end);
            this.segments.push({
                start,
                end,
                length,
                angle: atan2(end.y - start.y, end.x - start.x)
            });
            this.totalLength += length;
        }
    }

    getPosition(normalizedPos) {
        let targetDist = (normalizedPos % 1) * this.totalLength;
        let accumulated = 0;

        for (let seg of this.segments) {
            if (accumulated + seg.length >= targetDist) {
                let t = (targetDist - accumulated) / seg.length;
                return {
                    x: lerp(seg.start.x, seg.end.x, t),
                    y: lerp(seg.start.y, seg.end.y, t),
                    angle: seg.angle
                };
            }
            accumulated += seg.length;
        }
        return null;
    }
}

class Train {
    constructor(track) {
        this.track = track;
        this.position = 0;
        this.color = track.color;
        this.speed = baseSpeed * random(0.9, 1.1);
        this.direction = random(1) < 0.5 ? -1 : 1; // Random direction
        this.cars = floor(random(minCarsPertrain, minCarsPertrain + 4));
    }

    update() {
        const speedFactor = this.speed / 1000;
        this.position += this.direction * speedFactor;

        if (this.track.isClosed) {
            this.position = (this.position + 1) % 1;
        } else {
            if (this.position > 1) {
                this.position = 1 - (this.position - 1);
                this.direction *= -1;
            } else if (this.position < 0) {
                this.position = -this.position;
                this.direction *= -1;
            }
        }
    }

    show() {
        for (let i = 0; i < this.cars; i++) {
            let carPos = (this.position - (i * carSpacing)/this.track.totalLength + 1) % 1;
            let pos = this.track.getPosition(carPos);
            if (!pos) continue;

            push();
            translate(pos.x, pos.y);
            rotate(pos.angle);
            fill(this.color);
            noStroke();
            rectMode(CENTER);
            rect(0, 0, trainLength, trainHeight, 3);
            pop();
        }
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(RADIANS);
    
    // Calculate grid positions
    const cols = floor(width / gridSize) - 1;
    const rows = floor(height / gridSize) - 1;
    
    // Generate tracks
    for (let i = 0; i < numTracks; i++) {
        let x = floor(random(1, cols));
        let y = floor(random(1, rows));
        let track = new Track(x, y);
        tracks.push(track);
        trains.push(new Train(track));
    }
}

function draw() {
    background(236);
    
    // Draw grid
    stroke(200);
    strokeWeight(1);
    for (let x = 0; x < width; x += gridSize) {
        line(x, 0, x, height);
    }
    for (let y = 0; y < height; y += gridSize) {
        line(0, y, width, y);
    }
    
    // Draw tracks
    stroke(40);
    strokeWeight(trackWidth);
    noFill();

    tracks.forEach(track => {
        beginShape();
        stroke(track.color);
        track.points.forEach(p => vertex(p.x, p.y));
        endShape();
    });
    
    // Update and draw trains
    trains.forEach(train => {
        train.update();
        train.show();
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }