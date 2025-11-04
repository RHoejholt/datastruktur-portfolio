import { StaticArray } from "../staticarray/staticarray.js";

export default class DynamicArray {
    constructor(capacity = 10) {
        this._capacity = capacity;
        this._array = new StaticArray(this._capacity);
        this._size = 0;
    }

    size() {
        return this._size;
    }

    capacity() {
        return this._capacity;
    }

    get(index) {
        if (index < 0 || index >= this._size) {
            throw new RangeError("Index out of range");
        }
        return this._array.get(index);
    }

    set(index, item) {
        if (index < 0 || index >= this._size) {
            throw new RangeError("Index out of range");
        }
        this._array.set(index, item);
    }

    add(item) {
        if (this._size >= this._capacity) {
            this.grow();
        }
        this._array.set(this._size, item);
        this._size++;
    }

    grow() {
        const newCapacity = this._capacity * 2;
        const newArray = new StaticArray(newCapacity);

        for (let i = 0; i < this._size; i++) {
            newArray.set(i, this._array.get(i));
        }

        this._array = newArray;
        this._capacity = newCapacity;
    }

    insert(index, item) {
        if (index < 0 || index > this._size) {
            throw new RangeError("Index out of range");
        }
        if (this._size >= this._capacity) {
            this.grow();
        }

        // skub alle elementer en frem
        for (let i = this._size; i > index; i--) {
            this._array.set(i, this._array.get(i - 1));
        }

        this._array.set(index, item);
        this._size++;
    }

    remove(index) {
        if (index < 0 || index >= this._size) {
            throw new RangeError("Index out of range");
        }

        // skub alle elementer en tilbage
        for (let i = index; i < this._size - 1; i++) {
            this._array.set(i, this._array.get(i + 1));
        }

        this._size--;
    }

    clear() {
        this._array = new StaticArray(this._capacity);
        this._size = 0;
    }
}
