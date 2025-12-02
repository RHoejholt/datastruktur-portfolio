class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class Queue {
    constructor() {
        // front of queue
        this.head = null
        // back of queue
        this.tail = null
        // keep track of size, simpler than walking list
        this._length = 0
    }

    // put thing at back
    enqueue(data) {
        const node = new Node(data)
        if (!this.tail) {
            // empty
            this.head = node
            this.tail = node
        } else {
            this.tail.next = node
            this.tail = node
        }
        this._length++
        return this._length // handy
    }

    // remove from front and return data
    dequeue() {
        if (!this.head) return null
        const data = this.head.data
        this.head = this.head.next
        if (!this.head) this.tail = null // now empty
        this._length--
        return data
    }

    // peek at front, don't remove
    peek() {
        return this.head ? this.head.data : null
    }

    // how many
    size() {
        return this._length
    }

    // get by index, 0 is front. returns null if oob
    get(index) {
        if (index < 0 || index >= this._length) return null
        let cur = this.head
        let i = 0
        while (cur && i < index) {
            cur = cur.next
            i++
        }
        return cur ? cur.data : null
    }
}

// export for node/commonjs
module.exports = Queue

// quick local smoke test when run directly
if (require.main === module) {
    const q = new Queue()
    q.enqueue(1)
    q.enqueue(2)
    q.enqueue(3)
    console.log('size', q.size()) // 3
    console.log('peek', q.peek()) // 1
    console.log('get(1)', q.get(1)) // 2
    console.log('dequeue', q.dequeue()) // 1
    console.log('size after', q.size()) // 2
}
