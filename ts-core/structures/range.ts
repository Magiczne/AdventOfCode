class Range {
  constructor(
    public readonly start: number,
    public readonly end: number,
  ) {}

  contains(point: number): boolean {
    return point >= this.start && point <= this.end
  }

  overlapsWithEndOf(range: Range): boolean {
    return this.start <= range.end + 1
  }

  length(): number {
    return this.end - this.start + 1
  }
}

export { Range }
