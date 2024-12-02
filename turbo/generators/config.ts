import { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('Typescript', {
    description: 'Generate Typescript AoC day skeleton',
    prompts: [
      {
        type: 'input',
        name: 'year',
        message: 'Enter year in which you want to create day skeleton',
        default: (new Date()).getFullYear(),
      },
      {
        type: 'input',
        name: 'day',
        message: 'Enter day which you are working on',
        default: (new Date()).getDate().toString().padStart(2, '0')
      },
      {
        type: 'list',
        name: 'withTestRuns',
        message: 'Do you want to include test runs skeleton?',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false },
        ],
        default: true
      }
    ],
    actions: [
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ year }}/d{{ day }}/main.ts',
        templateFile: 'templates/typescript/main.ts.hbs',
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
        }
      }
    ]
  })
}