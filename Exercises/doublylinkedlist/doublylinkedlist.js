export default class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;

    this._size = 0;
  }

  _createNode(data) {
    return { data, next: null, prev: null };
  }

  printList() {
    let out = "";
    let n = this.head;
    while (n) {
      out += `[${n.data}]`;
      if (n.next) out += " <-> ";
      n = n.next;
    }
    console.log(out);

  }

  size() {
    return this._size;
  }


  getNode(index) {
    if (index < 0 || index >= this._size) return null;
    let n = this.head;
    for (let i = 0; i < index; i++) n = n.next;
    return n;
  }


  get(index) {
    let node = this.getNode(index);
    return node ? node.data : undefined;
  }
  getFirst() {
    return this.head ? this.head.data : undefined;
  }
  getLast() {
    return this.tail ? this.tail.data : undefined;
  }
  getFirstNode() {
    return this.head;
  }
  getLastNode() {
    return this.tail;

  }
  getNextNode(node) {
    return node ? node.next : null;

  }
  getPreviousNode(node) {
    return node ? node.prev : null;

  }

  addLast(data) {
    const node = this._createNode(data);

    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }

    this._size++;
  }

  addFirst(data) {
    const node = this._createNode(data);

    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }

    this._size++;
  }


  set(index, data) {
    const node = this.getNode(index);
    if (node) node.data = data;
  }


  insert(index, data) {
    if (index === 0) return this.addFirst(data);
    if (index === this._size) return this.addLast(data);

    const node = this.getNode(index);
    this.insertBeforeNode(node, data);
  }

  insertAfter(index, data) {
    const node = this.getNode(index);
    this.insertAfterNode(node, data);
  }

  insertBefore(index, data) {
    const node = this.getNode(index);
    this.insertBeforeNode(node, data);
  }


  insertAfterNode(node, data) {
    if (!node) return;

    if (node === this.tail) {
      this.addLast(data);
      return;
    }

    const newNode = this._createNode(data);

    const nxt = node.next;

    newNode.prev = node;
    newNode.next =  nxt;

    node.next = newNode;
    nxt.prev = newNode;

    this._size++;

  }

  insertBeforeNode(node, data) {
    if (!node) return;

    if (node === this.head) {
      this.addFirst(data);
      return;
    }

    const newNode = this._createNode(data);

    const prv  = node.prev;

    newNode.next = node;
    newNode.prev = prv;

    prv.next = newNode;
    node.prev = newNode;

    this._size++;
  }

  remove(index) {
    const node = this.getNode(index);
    if (!node) return;
    return this.removeNode(node);

  }

  removeFirst() {
    if (!this.head) return;
    return this.removeNode(this.head);
  }

  removeLast() {
    if (!this.tail) return;
    return this.removeNode(this.tail);

  }

  removeNode(node) {
    if (!node) return;

    const data = node.data;

    if (this._size === 1) {
      this.head = this.tail = null;
      this._size = 0;
      return data;
    }

    if (node === this.head) {
      this.head = node.next;
      this.head.prev = null;
    } else if (node === this.tail) {
      this.tail = node.prev;
      this.tail.next = null;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }

    this._size--;
    return data;
  }


  swap(nodeA, nodeB) {
    if (!nodeA || !nodeB || nodeA === nodeB) return;

    // ensure nodeA comes before nodeB for simplicity
    let a = nodeA;
    let b = nodeB;

    // swap positions
    const tmp = a.data;
    a.data = b.data;
    b.data = tmp;

  }


  makeFirst(node) {
    if (!node || node === this.head) return;

    this.removeNode(node);

    node.prev = null;
    node.next = this.head;

    this.head.prev = node;
    this.head = node;

    this._size++; // removeNode reduced size, fix it

  }

  makeLast(node) {
    if (!node || node === this.tail) return;

    this.removeNode(node);

    node.next =  null;
    node.prev = this.tail;

    this.tail.next = node;
    this.tail = node;

    this._size++;

  }


  clear() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }
}
