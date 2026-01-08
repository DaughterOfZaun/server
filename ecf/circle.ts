export class CircularArray<T extends { reset: () => void, from: (prev: T) => void }> {
    elements: T[] = []
    index: number = 0
    constructor(readonly past: number, readonly future: number, ctr: () => T){
        for(let i = 0; i < past + 1 + future; i++){
            this.elements.push(ctr())
        }
    }
    public get(index: number): T {
        console.assert(index >= this.index - this.past)
        console.assert(index <= this.index + this.future)
        return this.elements[index % this.elements.length]!
    }
    public current(){
        return this.get(this.index)
    }
    public next(){
        this.index++
        this.get(this.index + this.future).reset()
        const past = this.get(this.index - 1)
        const present = this.current()
        present.from(past)
        return present
    }
    public peek(){
        return this.get(this.index + 1)
    }
}
