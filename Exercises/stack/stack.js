
class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class Stack {
    constructor() {
        // top of stack
        this.head = null
        this._len = 0 // lazy size counter
    }

    // push new stuff on top
    push(data) {
        const node = new Node(data)
        // move to front
        node.next = this.head
        this.head = node
        this._len++
        return this._len // whatever
    }

    // pop top
    pop() {
        if (!this.head) return null
        const d = this.head.data
        this.head = this.head.next
        this._len--
        return d
    }

    // look
    peek() {
        return this.head ? this.head.data : null
    }

    size() {
        return this._len
    }

    // get item by index, 0 is top
    get(index) {
        if (index < 0 || index >= this._len) return null
        let cur = this.head
        let i = 0
        while (cur && i < index) {
            cur = cur.next
            i++
        }
        return cur ? cur.data : null
    }
}

module.exports = Stack