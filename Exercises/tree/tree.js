class Node {
    constructor(value) {
        this.value = value
        this.parent = null
        this.childNodes = []
    }

    // returns first child or null
    firstChild() {
        return this.childNodes[0] || null
    }

    // returns last child or null
    lastChild() {
        return this.childNodes[this.childNodes.length - 1] || null
    }

    // do i have any kids?
    hasChildNodes() {
        return this.childNodes.length > 0
    }

    // add a kid
    appendChild(child) {
        child.parent = this
        this.childNodes.push(child)
    }

    // remove a specific kid
    removeChild(child) {
        const idx = this.childNodes.indexOf(child)
        if (idx !== -1) {
            child.parent = null
            this.childNodes.splice(idx, 1)
        }
    }

    // replace old with new
    replaceChild(newChild, oldChild) {
        const idx = this.childNodes.indexOf(oldChild)
        if (idx !== -1) {
            oldChild.parent = null
            newChild.parent = this
            this.childNodes[idx] = newChild
        }
    }

    // dump this node and all kids (recursive)
    dump(indent = 0) {
        console.log(' '.repeat(indent) + this.value)
        this.childNodes.forEach(c => c.dump(indent + 2))
    }

    // lazy addValue: just push to first node without children
    addValue(value) {
        if (!this.hasChildNodes()) {
            const n = new Node(value)
            this.appendChild(n)
            return n
        } else {
            // try first child
            return this.childNodes[0].addValue(value)
        }
    }

    // find first node with value
    findValue(value) {
        if (this.value === value) return this
        for (let c of this.childNodes) {
            const found = c.findValue(value)
            if (found) return found
        }
        return null
    }

    // remove node with value
    removeValue(value) {
        for (let c of this.childNodes) {
            if (c.value === value) {
                this.removeChild(c)
                return true
            } else {
                const removed = c.removeValue(value)
                if (removed) return true
            }
        }
        return false
    }
}

// tree wrapper, mostly delegates
class Tree {
    constructor(rootValue) {
        this.root = new Node(rootValue)
    }

    dump() {
        this.root.dump()
    }

    addValue(value) {
        return t
