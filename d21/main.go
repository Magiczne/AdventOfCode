package main

import (
	"aoc2015/util"
	"math"
	"strings"
)

type Entity struct {
	HitPoints int
	Damage    int
	Armor     int
}

type Shop struct {
	Weapons []Item
	Armors  []Item
	Rings   []Item
}

type Item struct {
	Name   string
	Cost   int
	Damage int
	Armor  int
}

// I'm lazy. I'm not parsing that.
// Weapons:    Cost  Damage  Armor
// Dagger        8     4       0
// Shortsword   10     5       0
// Warhammer    25     6       0
// Longsword    40     7       0
// Greataxe     74     8       0
// Armor:      Cost  Damage  Armor
// Leather      13     0       1
// Chainmail    31     0       2
// Splintmail   53     0       3
// Bandedmail   75     0       4
// Platemail   102     0       5
// Rings:      Cost  Damage  Armor
// Damage +1    25     1       0
// Damage +2    50     2       0
// Damage +3   100     3       0
// Defense +1   20     0       1
// Defense +2   40     0       2
// Defense +3   80     0       3
var shop = Shop{
	Weapons: []Item{
		{Name: "Dagger", Cost: 8, Damage: 4, Armor: 0},
		{Name: "Shortsword", Cost: 10, Damage: 5, Armor: 0},
		{Name: "Warhammer", Cost: 25, Damage: 6, Armor: 0},
		{Name: "Longsword", Cost: 40, Damage: 7, Armor: 0},
		{Name: "Greataxe", Cost: 74, Damage: 8, Armor: 0},
	},
	Armors: []Item{
		{Name: "Dagger", Cost: 13, Damage: 0, Armor: 1},
		{Name: "Shortsword", Cost: 31, Damage: 0, Armor: 2},
		{Name: "Warhammer", Cost: 53, Damage: 0, Armor: 3},
		{Name: "Longsword", Cost: 75, Damage: 0, Armor: 4},
		{Name: "Greataxe", Cost: 102, Damage: 0, Armor: 5},
	},
	Rings: []Item{
		{Name: "Damage +1", Cost: 25, Damage: 1, Armor: 0},
		{Name: "Damage +2", Cost: 50, Damage: 2, Armor: 0},
		{Name: "Damage +3", Cost: 100, Damage: 3, Armor: 0},
		{Name: "Defense +1", Cost: 20, Damage: 0, Armor: 1},
		{Name: "Defense +2", Cost: 40, Damage: 0, Armor: 2},
		{Name: "Defense +3", Cost: 80, Damage: 0, Armor: 3},
	},
}

func getItemCombinations() [][]Item {
	itemCombinations := [][]Item{}

	for _, weapon := range shop.Weapons {
		for armor := -1; armor < len(shop.Armors); armor++ {
			for firstRing := -1; firstRing < len(shop.Rings); firstRing++ {
				for secondRing := -1; secondRing < len(shop.Rings); secondRing++ {
					combination := []Item{
						weapon,
					}

					// This item is optional
					if armor != -1 {
						combination = append(combination, shop.Armors[armor])
					}

					// This item is optional
					if firstRing != -1 {
						combination = append(combination, shop.Rings[firstRing])
					}

					// This item is optional, cannot buy the same ring twice
					if secondRing != -1 && firstRing != secondRing {
						combination = append(combination, shop.Rings[secondRing])
					}

					itemCombinations = append(itemCombinations, combination)
				}
			}
		}
	}

	return itemCombinations
}

func playerWonFight(boss Entity, player Entity) bool {
	playerAttack := max(player.Damage-boss.Armor, 1)
	bossAttack := max(boss.Damage-player.Armor, 1)
	playerHitPoints := player.HitPoints
	bossHitPoints := boss.HitPoints

	for bossHitPoints > 0 && playerHitPoints > 0 {
		bossHitPoints -= playerAttack
		playerHitPoints -= bossAttack
	}

	// Even if player will be "dead" too, it still counts,
	// as the boss takes damage first
	return bossHitPoints <= 0
}

func part1(boss Entity) int {
	itemCombinations := getItemCombinations()

	minCost := math.MaxInt

	for _, combination := range itemCombinations {
		cost := 0
		player := Entity{
			HitPoints: 100,
			Damage:    0,
			Armor:     0,
		}

		for _, item := range combination {
			cost += item.Cost
			player.Damage += item.Damage
			player.Armor += item.Armor
		}

		if playerWonFight(boss, player) {
			minCost = min(minCost, cost)
		}
	}

	return minCost
}

func part2(boss Entity) int {
	itemCombinations := getItemCombinations()

	maxCost := 0

	for _, combination := range itemCombinations {
		cost := 0
		player := Entity{
			HitPoints: 100,
			Damage:    0,
			Armor:     0,
		}

		for _, item := range combination {
			cost += item.Cost
			player.Damage += item.Damage
			player.Armor += item.Armor
		}

		if !playerWonFight(boss, player) {
			maxCost = max(maxCost, cost)
		}
	}

	return maxCost
}

func main() {
	reader := func(name string) Entity {
		lines := util.ReadLines(name)

		return Entity{
			HitPoints: util.StringToInt(strings.Split(lines[0], ": ")[1]),
			Damage:    util.StringToInt(strings.Split(lines[1], ": ")[1]),
			Armor:     util.StringToInt(strings.Split(lines[2], ": ")[1]),
		}
	}

	util.TestRuns("21", reader, part1, part2)
	util.SolutionRuns("21", reader, part1, part2)
}
