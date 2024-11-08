export class Recording {
    constructor(
        public path: string,
        public timestamp: Date
    ) {}

    get formattedDate(): string {
        return this.timestamp.toLocaleString();
    }

    get fileName(): string {
        return this.path.split('/').pop() || '';
    }
}