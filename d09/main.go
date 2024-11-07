package main

import (
	"aoc2015/util"
	"regexp"
	"slices"

	mapset "github.com/deckarep/golang-set/v2"
	"github.com/dominikbraun/graph"
)

type Route struct {
	From, To string
	Distance int
}

func getUniqueDestinations(data []Route) []string {
	uniqueDestinations := mapset.NewSet[string]()

	for _, route := range data {
		uniqueDestinations.Add(route.From)
		uniqueDestinations.Add(route.To)
	}

	return uniqueDestinations.ToSlice()
}

func calculateDistances(data []Route) []int {
	destinations := getUniqueDestinations(data)
	g := graph.New(graph.StringHash, graph.Weighted())

	for _, destination := range destinations {
		g.AddVertex(destination)
	}

	for _, route := range data {
		g.AddEdge(route.From, route.To, graph.EdgeWeight(route.Distance))
	}

	spanningPaths := [][]string{}

	for _, departure := range destinations {
		for _, destination := range destinations {
			if departure == destination {
				continue
			}

			paths, _ := graph.AllPathsBetween(g, departure, destination)

			for _, path := range paths {
				if len(path) == len(destinations) {
					spanningPaths = append(spanningPaths, path)
				}
			}
		}
	}

	return util.ArrayMap(spanningPaths, func(spanningPath []string) int {
		distance := 0
		for i := 0; i < len(spanningPath)-1; i++ {
			from := spanningPath[i]
			to := spanningPath[i+1]
			edge, _ := g.Edge(from, to)

			distance += edge.Properties.Weight
		}

		return distance
	})
}

// https://pl.wikipedia.org/wiki/Problem_komiwoja%C5%BCera
// https://en.wikipedia.org/wiki/Travelling_salesman_problem
func part1(data []Route) int {
	distances := calculateDistances(data)

	return slices.Min(distances)
}

func part2(data []Route) int {
	distances := calculateDistances(data)

	return slices.Max(distances)
}

func main() {
	lineRegexp := regexp.MustCompile(`(\w+) to (\w+) = (\d+)`)
	reader := func(name string) []Route {
		return util.ArrayMap(util.ReadLines(name), func(line string) Route {
			match := lineRegexp.FindStringSubmatch(line)

			return Route{
				From:     match[1],
				To:       match[2],
				Distance: util.StringToInt(match[3]),
			}
		})
	}

	util.TestRuns("09", reader, part1, part2)
	util.SolutionRuns("09", reader, part1, part2)
}
