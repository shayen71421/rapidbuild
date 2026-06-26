import chalk from "chalk";

export function printBanner(): void {
  console.log(
    chalk.cyan(`
  rapidbuild
  Scaffold complete hackathon apps, not empty folders.
`)
  );
}
