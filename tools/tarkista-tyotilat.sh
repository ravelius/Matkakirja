#!/bin/sh
# Postivahdin kierros: listaa worktreet, jotka ovat /Users/Shared/Claude-kansion ulkopuolella
# (poikkeus: CI:n ja Codexin omat polut). Tulostaa rivit; tyhjä = kunnossa.
git -C /Users/Shared/Claude/Matkakirja-fable worktree list --porcelain | awk '/^worktree /{print $2}' \
  | grep -v -E '^/Users/Shared/Claude/|^/Users/samireivinen/Documents/Codex/|/actions-runner/|^/private/tmp/'
