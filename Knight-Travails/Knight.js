function knightMoves(start, end) {
    const moves=[
            [1,2],[2,1],
            [-1,2],[-2,1],
            [1,-2],[2,-1],
            [-1,-2],[-2,-1]
        ];

        const isValid = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

    let queue = [];
    let firstItem = {
    position: start,path: [start]};
    queue.push(firstItem);

    let visited = new Set();
    visited.add(`${start[0]},${start[1]}`);

    while (queue.length > 0) {
        const current = queue.shift();
        const [x, y] = current.position;

        if (x === end[0] && y === end[1]) {
            console.log(`You made it in ${current.path.length - 1} moves! Here's your path:`);
            current.path.forEach(square => console.log(`  [${square}]`));
            return current.path;
        }

        for (const [dx, dy] of moves) {
            const newX = x + dx;
            const newY = y + dy;
            const positionKey = `${newX},${newY}`;

            if (isValid(newX, newY) && !visited.has(positionKey)) {
                visited.add(positionKey);
                queue.push({
                    position: [newX, newY],
                    path: [...current.path, [newX, newY]]
                });
            }
        }
    }

    return null;
}

// Test cases
console.log("Test case 1: [0,0] to [1,2]");
knightMoves([0,0], [1,2]);

console.log("\nTest case 2: [0,0] to [3,3]");
knightMoves([0,0], [3,3]);

console.log("\nTest case 3: [3,3] to [0,0]");
knightMoves([3,3], [0,0]);

console.log("\nTest case 4: [0,0] to [7,7]");
knightMoves([0,0], [7,7]);

console.log("\nTest case 5: [3,3] to [4,3]");
knightMoves([3,3], [4,3]);