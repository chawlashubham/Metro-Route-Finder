"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dijkstra = dijkstra;
exports.reconstructPath = reconstructPath;
class MinHeap {
    constructor() {
        this.heap = [];
    }
    push(node) {
        this.heap.push(node);
        this.bubbleUp(this.heap.length - 1);
    }
    pop() {
        if (this.heap.length === 0)
            return undefined;
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.sinkDown(0);
        }
        return min;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    bubbleUp(i) {
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.heap[parent].dist <= this.heap[i].dist)
                break;
            [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
            i = parent;
        }
    }
    sinkDown(i) {
        const n = this.heap.length;
        while (true) {
            let smallest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            if (left < n && this.heap[left].dist < this.heap[smallest].dist)
                smallest = left;
            if (right < n && this.heap[right].dist < this.heap[smallest].dist)
                smallest = right;
            if (smallest === i)
                break;
            [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
            i = smallest;
        }
    }
}
function dijkstra(graph, source, target, weightFn) {
    const distances = new Map();
    const previous = new Map();
    const visited = new Set();
    const heap = new MinHeap();
    distances.set(source, 0);
    heap.push({ id: source, dist: 0 });
    while (!heap.isEmpty()) {
        const { id: current, dist: currentDist } = heap.pop();
        if (visited.has(current))
            continue;
        visited.add(current);
        if (current === target)
            break;
        for (const edge of graph.getEdges(current)) {
            if (visited.has(edge.to))
                continue;
            const edgeWeight = weightFn
                ? weightFn(current, edge.to, edge.weight, edge.line)
                : edge.weight;
            const newDist = currentDist + edgeWeight;
            const existing = distances.get(edge.to) ?? Infinity;
            if (newDist < existing) {
                distances.set(edge.to, newDist);
                previous.set(edge.to, current);
                heap.push({ id: edge.to, dist: newDist });
            }
        }
    }
    return {
        distances,
        previous,
        found: distances.has(target) && distances.get(target) !== Infinity,
    };
}
function reconstructPath(previous, source, target) {
    const path = [];
    let current = target;
    while (current !== null && current !== undefined) {
        path.unshift(current);
        if (current === source)
            break;
        current = previous.get(current) ?? null;
    }
    if (path[0] !== source)
        return [];
    return path;
}
//# sourceMappingURL=dijkstra.js.map