# @recordreplay/sourcemap-upload-cli

Provides a CLI application that allows uploading production sourcemaps to
Replay's servers so that they can be used when viewing recordings.

## `replay-sourcemap-upload` CLI command

The CLI command `replay-sourcemap-upload [opts] <paths...>` has the following options:

- `--group`: (Required) To allow for tracking and browsing of maps that have been uploaded, we
  require uploaded names to have an overall group name associated with them.
  This could for instance be a version number, or commit hash.
- `--key`: The API key to use when connecting to Replay's servers.
  Defaults to `process.env.RECORD_REPLAY_API_KEY`.
- `--dry-run`: Run all of the local processing and searching for maps, but skip uploading them.
- `--extensions`: The comma-separated set of file extensions to search for sourcemap-related data.
  Defaults to ".js,.map".
- `--ignore`: Provide an ignore pattern for files to ignore when searching for sourcemap-related data.
- `--quiet`: Tell the CLI to output nothing to stdout. Errors will still log to stderr.
- `--verbose`: Output additional information about the sourcemap map search.
- `--root`: Set the directory that relative paths should be computed with respect to. The relative path
  of sourcemaps is included in the uploaded entry, and will be visible in the UI, so this can be used
  to strip off unimportant directories in the build path. Defaults to `process.cwd()`.
- `<paths>`: A set of files or directories to search for sourcemap files and files
  containing `sourceMappingURL=` comments.
