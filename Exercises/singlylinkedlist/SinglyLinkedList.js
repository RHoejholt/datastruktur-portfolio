export default class SinglyLinkedList {
    constructor() {
        this.head = null;
    }

    _createNode(data, next = null) {
        return { data, next };
    }

    printList() {
        let current = this.head;
        let output = "";
        while (current) {
            output += `{ data: ${current.data}, next: ${current.next ? "node" : "null"} } -> `;
            current = current.next;
        }
        console.log(output + "null");
    }

    add(data) {
        const newNode = this._createNode(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    get(index) {
        const node = this.getNode(index);
        return node ? node.data : null;
    }

    getFirst() {
        return this.head ? this.head.data : null;
    }

    getLast() {
        const lastNode = this.getLastNode();
        return lastNode ? lastNode.data : null;
    }

    set(index, data) {
        const node = this.getNode(index);
        if (node) node.data = data;
    }

    insert(index, data) {
        const newNode = this._createNode(data);
        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
            return;
        }

        const prevNode = this.getNode(index - 1);
        if (!prevNode) return;
        newNode.next = prevNode.next;
        prevNode.next = newNode;
    }

    remove(index) {
        if (!this.head) return null;
        if (index === 0) {
            const removedData = this.head.data;
            this.head = this.head.next;
            return removedData;
        }

        const prev = this.getNode(index - 1);
        if (!prev || !prev.next) return null;
        const removedData = prev.next.data;
        prev.next = prev.next.next;
        return removedData;
    }

    removeFirst() {
        if (!this.head) return null;
        const removed = this.head.data;
        this.head = this.head.next;
        return removed;
    }

    removeLast() {
        if (!this.head) return null;
        if (!this.head.next) {
            const removed = this.head.data;
            this.head = null;
            return removed;
        }
        let current = this.head;
        while (current.next.next) {
            current = current.next;
        }
        const removed = current.next.data;
        current.next = null;
        return removed;
    }

    size() {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }

    clear() {
        this.head = null;
    }

    getNode(index) {
        let current = this.head;
        let count = 0;
        while (current) {
            if (count === index) return current;
            current = current.next;
            count++;
        }
        return null;
    }

    getFirstNode() {
        return this.head;
    }

    getLastNode() {
        let current = this.head;
        if (!current) return null;
        while (current.next) {
            current = current.next;
        }
        return current;
    }

    getNextNode(node) {
        return node ? node.next : null;
    }

    getPreviousNode(node) {
        if (!this.head || this.head === node) return null;
        let current = this.head;
        while (current && current.next !== node) {
            current = current.next;
        }
        return current || null;
    }

    insertBefore(node, data) {
        if (!this.head || !node) return;
        const newNode = this._createNode(data);
        if (node === this.head) {
            newNode.next = this.head;
            this.head = newNode;
            return;
        }
        const prev = this.getPreviousNode(node);
        if (!prev) return;
        newNode.next = node;
        prev.next = newNode;
    }

    insertAfter(node, data) {
        if (!node) return;
        const newNode = this._createNode(data, node.next);
        node.next = newNode;
    }

    removeNode(node) {
        if (!this.head || !node) return;
        if (this.head === node) {
            this.head = this.head.next;
            return;
        }
        const prev = this.getPreviousNode(node);
        if (prev && prev.next === node) {
            prev.next = node.next;
        }
    }
}
