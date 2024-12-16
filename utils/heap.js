module.exports = class Heap {
	constructor(cond, initValues = []) {
		this.heap = []
		this.cond = cond ?? ((a, b) => a < b)
		initValues.forEach(val => this.add(val))
	}
	  
	swap(i, j) {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
	}
	  
	add(val) {
		this.heap.push(val)
		this.heapifyUp()
	}
	  
	get peek() {
		return this.heap[0]
	}
	  
	pop() {
		this.swap(0, this.size - 1)
		const val = this.heap.pop()
		this.heapifyDown()
		return val
	}
	  
	compare(i, j) {
		const [a, b] = [this.heap[i], this.heap[j]]
		return a != void 0 && b != void 0 && this.cond(a, b)
	}
	  
	heapifyUp() {
		let i = this.size - 1
		while (i > 0) {
			const pi = ((i - 1) / 2) >> 0
			if (this.compare(pi, i)) break
			this.swap(pi, i)
			i = pi
		}
	}
	  
	heapifyDown() {
		let i = 0
		while (true) {
			const l = 2 * i + 1
			const r = 2 * i + 2
			let min = i
			if (l < this.heap.length && this.compare(l, min)) min = l
			if (r < this.heap.length && this.compare(r, min)) min = r
			if (min == i) break
			this.swap(i, min)
			i = min
		}
	}
	  
	get size() {
		return this.heap.length
	}
}
