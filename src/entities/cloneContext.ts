export default class CloneContext {
    private readonly clones = new Map<object, object>();

    public get<T extends object>(source: T): T | undefined {
        return this.clones.get(source) as T | undefined;
    }

    public set<T extends object>(source: T, clone: T): T {
        this.clones.set(source, clone);
        return clone;
    }
}
