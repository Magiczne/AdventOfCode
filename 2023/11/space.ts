const enum SpaceObject {
  Nothing = '.',
  Galaxy = '#',
}

interface Point {
  x: number
  y: number
}

class Space {
  protected constructor(
    private image: Array<Array<SpaceObject>>,
    private expansionFactor: number,
  ) {}

  expand(points: Array<number>): Map<number, number> {
    points = [...new Set(points)]
    points.sort()

    return new Map(points.map((point, index) => [point, this.expansionFactor * (point - index) + index]))
  }

  galaxies(): ReadonlyArray<Point> {
    return this.image.flatMap((row, y) => {
      return row
        .map((object, x) => {
          return {
            object,
            x,
          }
        })
        .filter(data => {
          return data.object === SpaceObject.Galaxy
        })
        .map(data => {
          return {
            x: data.x,
            y,
          }
        })
    })
  }

  routesBetween(galaxies: ReadonlyArray<Point>): ReadonlyArray<{ from: Point; to: Point }> {
    return galaxies.reduce((routes, galaxy, index) => {
      const nextGalaxies = galaxies.slice(index + 1)

      return routes.concat(
        nextGalaxies.map(nextGalaxy => {
          return {
            from: { ...galaxy },
            to: { ...nextGalaxy },
          }
        }),
      )
    }, [])
  }

  toString(): string {
    return this.image.reduce((acc, line): string => {
      return `${acc}${line.join('')}\n`
    }, '')
  }

  static fromString(data: string, expansionFactor: number): Space {
    const image: Array<Array<SpaceObject>> = data.split('\n').map(line => line.split('')) as Array<Array<SpaceObject>>

    return new Space(image, expansionFactor)
  }
}

export { Space }
