package main

import (
	"math"
	"slices"
	"strings"

	"github.com/Magiczne/AdventOfCode/util"
)

type Boss struct {
	HitPoints int
	Damage    int
}

type Player struct {
	HitPoints int
	Armor     int
	Mana      int
}

type Spell struct {
	Name           string
	ManaCost       int
	Damage         int
	Heal           int
	EffectArmor    int
	EffectMana     int
	EffectDuration int
}

var spellbook = []Spell{
	{Name: "Magic Missile", ManaCost: 53, Damage: 4, Heal: 0, EffectDuration: 1},
	{Name: "Drain", ManaCost: 73, Damage: 2, Heal: 2, EffectDuration: 1},
	{Name: "Shield", ManaCost: 113, EffectArmor: 7, EffectDuration: 6},
	{Name: "Poison", ManaCost: 173, Damage: 3, EffectDuration: 6},
	{Name: "Recharge", ManaCost: 229, EffectMana: 101, EffectDuration: 5},
}

var minSpellCost = slices.Min(
	util.ArrayMap(spellbook, func(spell Spell) int {
		return spell.ManaCost
	}),
)

func simulateFight(playerInit Player, bossInit Boss, playerHealthLoss int) int {
	minSpent := math.MaxInt32
	spent := 0
	playerTurn := true

	var dfs func(player Player, boss Boss, spent int, playerTurn bool, activeSpells []Spell) int
	dfs = func(player Player, boss Boss, spent int, playerTurn bool, activeSpells []Spell) int {
		// Made only for part 2, when player loses life at start of the turn
		if playerTurn {
			player.HitPoints -= playerHealthLoss

			if player.HitPoints <= 0 {
				return math.MaxInt32
			}
		}

		// Apply spell effects
		armorToSet := 0

		for i := range activeSpells {
			if activeSpells[i].EffectDuration > 0 {
				player.Mana += activeSpells[i].EffectMana
				boss.HitPoints -= activeSpells[i].Damage
				armorToSet += activeSpells[i].EffectArmor
				activeSpells[i].EffectDuration--
			}
		}

		player.Armor = armorToSet

		// Boss can die after effects were applied (poison)
		if boss.HitPoints <= 0 {
			minSpent = min(minSpent, spent)

			return spent
		}

		// Remove expired spells
		activeSpells = util.ArrayFilter(activeSpells, func(spell Spell) bool {
			return spell.EffectDuration > 0
		})

		if playerTurn {
			// We may not be able to cast anything - then we're not gonna make it :(
			if player.Mana < minSpellCost {
				return math.MaxInt
			}

			// Generate all affordable spells, which are not yet active
			affordableSpells := []Spell{}
			for _, spell := range spellbook {
				if spell.ManaCost <= player.Mana {
					if spell.EffectDuration > 1 {
						isActive := false

						for _, activeSpell := range activeSpells {
							if spell.Name == activeSpell.Name && activeSpell.EffectDuration > 0 {
								isActive = true
								break
							}
						}

						if !isActive {
							affordableSpells = append(affordableSpells, spell)
						}
					} else {
						affordableSpells = append(affordableSpells, spell)
					}
				}
			}

			for _, spell := range affordableSpells {
				newSpent := spent + spell.ManaCost

				// If we have already spent more that we've previously seen
				// just ignore this branch.
				if newSpent >= minSpent {
					continue
				}

				newActiveSpells := append([]Spell{}, activeSpells...)

				player := Player{
					HitPoints: player.HitPoints,
					Armor:     player.Armor,
					Mana:      player.Mana,
				}

				boss := Boss{
					HitPoints: boss.HitPoints,
					Damage:    boss.Damage,
				}

				player.Mana -= spell.ManaCost
				if spell.EffectDuration == 1 {
					boss.HitPoints -= spell.Damage
					player.HitPoints += spell.Heal
				} else {
					newActiveSpells = append(newActiveSpells, spell)
				}

				if dfs(player, boss, newSpent, false, newActiveSpells) < minSpent {
					minSpent = newSpent
				}
			}
		} else {
			player.HitPoints -= max(boss.Damage-player.Armor, 1)

			if player.HitPoints > 0 {
				return dfs(player, boss, spent, true, activeSpells)
			}

			return math.MaxInt32
		}

		return minSpent
	}

	return dfs(playerInit, bossInit, spent, playerTurn, []Spell{})
}

func part1(boss Boss) int {
	player := Player{HitPoints: 50, Armor: 0, Mana: 500}

	return simulateFight(player, boss, 0)
}

func part2(boss Boss) int {
	player := Player{HitPoints: 50, Armor: 0, Mana: 500}

	return simulateFight(player, boss, 1)
}

func main() {
	reader := func(name string) Boss {
		lines := util.ReadLines(name)

		return Boss{
			HitPoints: util.StringToInt(strings.Split(lines[0], ": ")[1]),
			Damage:    util.StringToInt(strings.Split(lines[1], ": ")[1]),
		}
	}

	util.TestRuns("22", reader, part1, part2)
	util.SolutionRuns("22", reader, part1, part2)
}
