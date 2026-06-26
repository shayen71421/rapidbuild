# rapidbuild

`rapidbuild` is an open-source npm CLI for scaffolding complete hackathon-ready applications. It is designed to generate a working product foundation with framework code, authentication, database setup, UI tooling, deployment files, linting, environment examples, and common boilerplate.

Repository: https://github.com/shayen71421/rapidbuild

```bash
npx rapidbuild my-app
```

or run the wizard:

```bash
npx rapidbuild
```

## Features

- Interactive Commander + Inquirer CLI
- Presets for common hackathon app shapes
- Modular generator and plugin architecture
- Complete first template: Next.js + TypeScript + Tailwind CSS + Firebase Auth + Firestore
- Dependency installation, git initialization, `.env.example`, README generation, and initial commit
- Package manager selection for `npm`, `pnpm`, `yarn`, and `bun`

## Usage

```bash
npx rapidbuild my-app
npx rapidbuild my-app --yes
npx rapidbuild my-app --preset ai-chat
npx rapidbuild my-app --template next-firebase
npx rapidbuild my-app --package-manager pnpm
npx rapidbuild my-app --no-install --no-git
```

## Presets

- `ai-chat`
- `startup`
- `dashboard`
- `ieee-event`

## First Supported Template

The production-ready template is `next-firebase`:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Firebase Auth
- Firestore
- Protected dashboard route
- Sign in/sign up form
- Sign out button
- Reusable Firebase initialization
- `firebase.json`
- `firestore.rules`
- `.env.example`

Additional template directories are included as stubs to keep the project easy to extend.

## Local Development

```bash
npm install
npm run build
npm run dev -- my-app --no-install --no-git
```

## Architecture

Core generation stays independent of integrations:

- `src/cli.ts` parses flags and starts the flow.
- `src/prompts/` owns interactive questions.
- `src/generators/` renders templates and coordinates project creation.
- `src/installers/` runs package-manager and git tasks.
- `src/plugins/` exposes integration hooks.
- `src/utils/` contains reusable filesystem, package manager, and rendering helpers.
- `templates/` stores project templates.

Plugins follow this shape:

```ts
export interface Plugin {
  name: string;
  install?(context: PluginContext): Promise<void>;
  dependencies?(config: ProjectConfig): string[];
  devDependencies?(config: ProjectConfig): string[];
  templates?(config: ProjectConfig): string[];
  envVariables?(config: ProjectConfig): Record<string, string>;
  postInstall?(context: PluginContext): Promise<void>;
}
```

Future plugins can live under `plugins/<name>/index.js`; the loader already checks that directory for local plugin modules.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
