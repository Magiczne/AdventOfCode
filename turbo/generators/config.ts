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
        templateFile: 'templates/typescript/main.ts',
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

  // plop.setGenerator("example", {
  //   description:
  //     "An example Turborepo generator - creates a new file at the root of the project",
  //   prompts: [
  //     {
  //       type: "input",
  //       name: "file",
  //       message: "What is the name of the new file to create?",
  //       validate: (input: string) => {
  //         if (input.includes(".")) {
  //           return "file name cannot include an extension";
  //         }
  //         if (input.includes(" ")) {
  //           return "file name cannot include spaces";
  //         }
  //         if (!input) {
  //           return "file name is required";
  //         }
  //         return true;
  //       },
  //     },
  //     {
  //       type: "list",
  //       name: "type",
  //       message: "What type of file should be created?",
  //       choices: [".md", ".txt"],
  //     },
  //     {
  //       type: "input",
  //       name: "title",
  //       message: "What should be the title of the new file?",
  //     },
  //   ],
  //   actions: [
  //     {
  //       type: "add",
  //       path: "{{ turbo.paths.root }}/{{ dashCase file }}{{ type }}",
  //       templateFile: "templates/turborepo-generators.hbs",
  //     },
  //   ],
  // });
}
