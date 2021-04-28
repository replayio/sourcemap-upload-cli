/* Copyright 2020 Record Replay Inc. */

import { program } from "commander";
import { uploadSourceMaps, LogCallback } from "@recordreplay/sourcemap-upload";

program
  .requiredOption(
    "-g, --group <name>",
    "The name to group this sourcemap into, e.g. A commit SHA or release version."
  )
  .option(
    "-k, --key <key>",
    "The Replay API key to use. Defaults to the value of 'process.env.RECORD_REPLAY_API_KEY'."
  )
  .option(
    "--dry-run",
    "Perform all of the usual CLI logic, but the final sourcemap upload."
  )
  .option(
    "-x, --extensions <exts>",
    "A comma-separated list of extensions to process. Defaults to '.js,.map'.",
    collectExtensions
  )
  .option(
    "-i, --ignore <pattern>",
    "Ignore files that match this pattern",
    collectIgnorePatterns
  )
  .option("-q, --quiet", "Silence all stdout logging.")
  .option("-v, --verbose", "Output extra data to stdout when processing files.")
  .option(
    "--root <dirname>",
    "The base directory to use when computing relative paths"
  )
  .arguments("<paths...>")
  .action((filepaths, opts) => sourcemapUpload(filepaths, opts))
  .parseAsync();

function collectExtensions(value: string) {
  return value.split(",");
}
function collectIgnorePatterns(value: string, previous: Array<string> = []) {
  return previous.concat([value]);
}

interface CLIOptions {
  group: string;
  key?: string;
  dryRun?: boolean;
  extensions?: Array<string>;
  ignore?: Array<string>;
  quiet?: boolean;
  verbose?: boolean;
  root?: string;
}

async function sourcemapUpload(
  filepaths: Array<string>,
  cliOpts: CLIOptions
): Promise<void> {
  const { quiet, verbose, ...uploadOpts } = cliOpts;

  let log: LogCallback | undefined;
  if (!quiet) {
    if (verbose) {
      log = (level, message) => {
        console.log(message);
      };
    } else {
      log = (level, message) => {
        if (level === "normal") {
          console.log(message);
        }
      };
    }
  }

  await uploadSourceMaps({
    filepaths,
    ...uploadOpts,
    log,
  });
}
