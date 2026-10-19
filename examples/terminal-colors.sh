#!/usr/bin/env bash
# Preview the terminal's normal and bright ANSI colors without dependencies.
printf '\n  WAYFINDR  /  Across every time zone\n\n'
for row in 0 1; do
  printf '  '
  for column in 0 1 2 3 4 5 6 7; do
    code=$((30 + column + row * 60))
    printf '\033[%sm  %3s  \033[0m' "$code" "$code"
  done
  printf '\n'
done
printf '\n  \033[32m✓ Connected\033[0m   \033[33m◷ In transit\033[0m   \033[31m! Exception\033[0m\n\n'
