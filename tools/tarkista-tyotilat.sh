#!/bin/sh
# Postivahdin kierros: listaa worktreet, jotka ovat /Users/Shared/Claude-kansion ulkopuolella
# (poikkeus: CI:n sekä Codexin ja ChatGPT:n omat polut — kaikki polut, joissa Codex tai ChatGPT). Tulostaa rivit; tyhjä = kunnossa.
git -C /Users/Shared/Claude/Matkakirja-fable worktree list --porcelain | awk '/^worktree /{print $2}' \
  | grep -v -E '^/Users/Shared/Claude/|Codex|ChatGPT|/actions-runner/|^/private/tmp/'
