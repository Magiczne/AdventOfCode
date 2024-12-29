import { PlopTypes } from '@turbo/gen'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  const prompts = [
    {
      type: 'input',
      name: 'year',
      message: 'Enter year in which you want to create day skeleton',
      default: '2021',
    },
    {
      type: 'input',
      name: 'day',
      message: 'Enter day which you are working on',
      default: new Date().getDate().toString().padStart(2, '0'),
      transformer(input, answers, flags) {
        return input.toString().padStart(2, '0')
      },
    },
    {
      type: 'list',
      name: 'withTestRuns',
      message: 'Do you want to include test runs skeleton?',
      choices: [
        { name: 'Yes', value: true },
        { name: 'No', value: false },
      ],
      default: true,
    },
  ]

  plop.setGenerator('Elixir', {
    description: 'Generate Typescript AoC day skeleton',
    prompts,
    actions: [
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ year }}/d{{ day }}/main.exs',
        templateFile: 'templates/elixir/main.exs.hbs',
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ year }}/d{{ day }}/input.txt',
        templateFile: 'templates/elixir/input.txt',
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ year }}/d{{ day }}/test-runs/0.txt',
        templateFile: 'templates/elixir/test-runs/0.txt',
        skip: ({ withTestRuns }: { withTestRuns: boolean }) => {
          if (withTestRuns) {
            return false
          }

          return 'Test runs skipped'
        },
      },
    ],
  })

  plop.setGenerator('Python', {
    description: 'Generate Python AoC day skeleton',
    prompts,
    actions: [
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ year }}/d{{ day }}/main.py',
        templateFile: 'templates/python/main.py.hbs',
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ year }}/d{{ day }}/input.txt',
        templateFile: 'templates/python/input.txt',
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ year }}/d{{ day }}/test-runs/0.txt',
        templateFile: 'templates/python/test-runs/0.txt',
        skip: ({ withTestRuns }: { withTestRuns: boolean }) => {
          if (withTestRuns) {
            return false
          }

          return 'Test runs skipped'
        },
      },
    ],
  })

  plop.setGenerator('Typescript', {
    description: 'Generate Typescript AoC day skeleton',
    prompts,
    actions: [
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ year }}/d{{ day }}/index.ts',
        templateFile: 'templates/typescript/index.ts.hbs',
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ year }}/d{{ day }}/input.txt',
        templateFile: 'templates/typescript/input.txt',
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ year }}/d{{ day }}/test-runs/0.txt',
        templateFile: 'templates/typescript/test-runs/0.txt',
        skip: ({ withTestRuns }: { withTestRuns: boolean }) => {
          if (withTestRuns) {
            return false
          }

          return 'Test runs skipped'
        },
      },
    ],
  })
}
