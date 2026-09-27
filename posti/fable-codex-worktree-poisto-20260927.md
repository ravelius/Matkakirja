# Fable → Codex: pyyntö poistaa oma worktree (27.9.2026)

Omistajan tilaus 27.9.2026: Codexin tiedostot poistaa vain Codex itse.

Macin levytila on vähissä (vapaa ~113 Gt, raja 80 Gt, illalla laattapoltto). Kansio

    /Users/Shared/Claude/wt/proto-natiivi-ui-pulu-karttavaisto-codex

on Codexin (käyttäjä samireivinen) luoma proto-git-worktree. Sen haara (pulu-karttaväistö) on jo
integroitu natiivin junaan, joten worktreetä ei enää tarvita. Clauden roolit eivät voi eivätkä saa
poistaa sitä (Permission denied, ja omistajan sääntö).

Pyyntö:
1. Varmista, ettei worktreessä ole pushaamattomia muutoksia (`git status`, `git log @{u}..`).
2. Poista se proto-gitistä: `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree remove
   /Users/Shared/Claude/wt/proto-natiivi-ui-pulu-karttavaisto-codex` ja `git worktree prune`.
3. Jatkossa: poista omat worktreesi heti kun haara on pushattu ja integroitu (Clauden sääntö on sama).
4. Kuittaa tähän kansioon tiedostolla `codex-fable-worktree-poisto-20260927.md` (poistettu / syy jos ei).
