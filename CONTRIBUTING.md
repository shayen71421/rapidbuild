# Contributing

Thanks for helping improve `rapidbuild`.

## Development

```bash
npm install
npm run build
```

Run the CLI locally:

```bash
npm run dev -- my-app --no-install --no-git
```

## Adding a Template

1. Add a directory under `templates/`.
2. Use `.ejs` for files that need generated values.
3. Register the template in `src/generators/templateRegistry.ts`.
4. Keep complete templates runnable after dependency installation.

## Adding a Plugin

Plugins should expose the standard hook interface:

```ts
install()
dependencies()
templates()
envVariables()
postInstall()
```

Keep plugin work scoped to the selected integration. Avoid changing core generator logic unless the plugin contract itself needs to evolve.

## Pull Request Checklist

- TypeScript builds with `npm run build`.
- Generated apps are runnable where applicable.
- New templates include README and environment examples.
- User-facing behavior is documented in `README.md`.
