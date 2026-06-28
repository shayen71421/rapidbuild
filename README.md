# rapidbuild

Skip 2 hours of setup. Start building immediately.

`rapidbuild` is an open-source npm CLI for scaffolding complete, configurable starter apps. Instead of stopping at a blank framework install, it generates a working product foundation with authentication, database wiring, UI tooling, deployment files, linting, environment examples, and common boilerplate.

Repository: https://github.com/shayen71421/rapidbuild

```bash
npx @shayen/rapidbuild my-app
```

or run the wizard:

```bash
npx @shayen/rapidbuild
```

## What You Get

The first production-ready template generates a Next.js + TypeScript + Tailwind + Firebase app:

```text
my-app/
├── app/
│   ├── dashboard/
│   ├── signin/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── auth/
│       ├── AuthForm.tsx
│       ├── AuthProvider.tsx
│       ├── ProtectedRoute.tsx
│       └── SignOutButton.tsx
│   └── ui/
│       └── ToastProvider.tsx
├── hooks/
│   └── useAuth.ts
├── lib/
│   ├── auth.ts
│   ├── firebase.ts
│   └── firestore.ts
├── types/
│   └── auth.ts
├── middleware.ts
├── firebase.json
├── firestore.rules
├── .env.example
└── README.md
```

RapidBuild prunes unused integrations. If you choose no Firestore, Firestore helpers and rules are omitted. If you choose no Tailwind, Tailwind and PostCSS config files are omitted. If you choose no auth, auth pages, providers, middleware, hooks, and auth dependencies are omitted.

## Terminal Demo

```bash
$ npx @shayen/rapidbuild my-app

rapidbuild
Scaffold complete hackathon apps, not empty folders.

✔ Framework: Next.js
✔ Language: TypeScript
✔ Styling: Tailwind CSS
✔ Authentication: Firebase Auth
✔ Database: Firestore
✔ Extras: ESLint, Prettier, Dark Mode

Creating project...

✔ Project files generated
✔ Dependencies installed
✔ Git repository initialized

RapidBuild app created.
  cd my-app
  npm run dev
```

## Why RapidBuild?

| Feature | create-next-app | RapidBuild |
| --- | --- | --- |
| Next.js app scaffold | Yes | Yes |
| TypeScript setup | Yes | Yes |
| Tailwind setup | Optional | Yes |
| Firebase Auth | No | Yes |
| Firestore | No | Yes |
| Protected routes | No | Yes |
| Auth pages/components | No | Yes |
| `.env.example` | No | Yes |
| Firebase config and rules | No | Yes |
| Git initialization | Yes | Yes |
| Production-oriented boilerplate | Minimal | Yes |

## Features

- Interactive Commander + Inquirer CLI
- Presets for the currently supported Next.js path
- Modular generator and plugin architecture
- Complete first template: Next.js + TypeScript + Tailwind CSS + Firebase Auth + Firestore
- Dependency installation, git initialization, `.env.example`, README generation, and initial commit
- Package manager selection for `npm`, `pnpm`, `yarn`, and `bun`

## Working Today

The CLI currently exposes only the combinations that are verified:

- Framework: Next.js
- Language: TypeScript
- Styling: Tailwind CSS or None
- Authentication: Firebase Auth or None
- Database: Firestore or None
- Deployment: Vercel, Firebase Hosting, or None
- Extras: ESLint, Prettier, Husky, Docker, GitHub Actions, PWA, Dark Mode, Analytics

React, Vite, Better Auth, Auth.js, Clerk, Supabase, Prisma, Drizzle, MongoDB, UploadThing, Resend, Stripe, React Hook Form, and Zod are roadmap items, not interactive CLI choices yet.

## Usage

```bash
npx @shayen/rapidbuild my-app
npx @shayen/rapidbuild my-app --yes
npx @shayen/rapidbuild my-app --preset dashboard
npx @shayen/rapidbuild my-app --template next-firebase
npx @shayen/rapidbuild my-app --package-manager pnpm
npx @shayen/rapidbuild my-app --no-install --no-git
```

## Presets

- `dashboard`

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

## Visuals

Screenshots and recordings are planned for the GitHub and npm pages:

- Terminal recording of the CLI wizard
- Generated login page
- Generated protected dashboard
- Generated folder structure

## Roadmap

The current focus is making the Next.js + Firebase path excellent before expanding broadly:

- Flawless Firebase setup and clearer Firebase documentation
- Firestore helper utilities and example data flows
- Middleware-based route protection where it improves the generated app
- Deeper Better Auth, Auth.js, Clerk, and Supabase templates
- Deeper Prisma, PostgreSQL, Drizzle, and MongoDB examples
- Production examples for Stripe, UploadThing, Resend, React Hook Form, and Zod

Future add-on commands are planned after project creation is stable:

```bash
rapidbuild add firebase
rapidbuild add clerk
rapidbuild add stripe
rapidbuild add resend
rapidbuild add prisma
rapidbuild add shadcn
rapidbuild add dashboard
```

## Website

A small docs and landing site is planned at `rapidbuild.dev` with:

- Animated terminal demo
- Feature comparison
- Template gallery
- Plugin documentation
- Generated app screenshots

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
