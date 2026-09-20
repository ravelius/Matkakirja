# Worktree-siivousselvitys 20.9.2026

Kriteeri (korjattu — squash-merge ei jätä haaran committeja mainiin,
joten `--merged` ei kelpaa): poistettavissa = 1) `git status --porcelain`
tyhjä, 2) haaralla on upstream originissa eikä pushaamattomia committeja
(`git log @{u}..` tyhjä), 3) ei Fablen päächeckout eikä nykyisten
sessioiden worktree (Matkakirja-fable, -opus, -opus2, -sonnet, -sonnet3,
-nostot, -raamattu, .claude/worktrees/*). Kaksi ei-git-hakemistoa
(Matkakirja-nostot-kuvat, Matkakirja-opus-tulokset) jätetty pois.

| Polku | Haara | Puhdas | Pushattu | Poistettavissa |
|---|---|---|---|---|
| /Users/samireivinen/Matkakirja-fable | claude/bold-ride-vow4ki | ei | kylla | ei (päächeckout) |
| /Users/samireivinen/Matkakirja-globe-marker-visibility-resume | codex/globe-marker-visibility-resume | kylla | ei (1) | ei |
| /Users/samireivinen/Matkakirja-marker-first-load | codex/marker-first-load | kylla | ei (1) | ei |
| /Users/samireivinen/Matkakirja-marker-first-load-main5da | codex/marker-first-load-main5da | kylla | ei (1) | ei |
| /Users/samireivinen/Matkakirja-marker-startup-render-v1851 | codex/marker-startup-render-v1851 | kylla | ei (2) | ei |
| /Users/samireivinen/Matkakirja-nostot | sonnet-kartuscha-aukot | kylla | ei (53) | ei (nykyinen sessio) |
| /Users/samireivinen/Matkakirja-opus | pelikoodari-perf-portti | kylla | kylla | ei (nykyinen sessio) |
| /Users/samireivinen/Matkakirja-opus2 | karttaseppa-gironde | kylla | kylla | ei (nykyinen sessio) |
| /Users/samireivinen/Matkakirja-pr2370-main-sync | codex/pr2370-main-sync | kylla | ei (2) | ei |
| /Users/samireivinen/Matkakirja-pulu-cue-aware-animation | codex/pulu-cue-aware-animation | kylla | ei (2) | ei |
| /Users/samireivinen/Matkakirja-pulu-real-audio-qa | codex/pulu-real-audio-qa | kylla | ei (1) | ei |
| /Users/samireivinen/Matkakirja-raamattu | raamatunkarsija | kylla | kylla | ei (nykyinen sessio) |
| /Users/samireivinen/Matkakirja-sarajevo-cors-retry | codex/sarajevo-cors-retry | kylla | ei (2) | ei |
| /Users/samireivinen/Matkakirja-sonnet | sonnet-local-kierros-17 | kylla | kylla | ei (nykyinen sessio) |
| /Users/samireivinen/Matkakirja-sonnet3 | julkaisija | kylla | kylla | ei (nykyinen sessio) |
| /Users/samireivinen/Matkakirja-sonnet3-brykartta | sonnet3-bryssel-kohdekartta | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-sonnet3-bryssel2 | sonnet3-bryssel-era2 | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-sonnet3-dnk | sonnet3-trelleborg | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-sonnet3-est | sonnet3-nostot-est | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-sonnet3-fin | sonnet3-nostot-fin | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-sonnet3-kosice | sonnet3-kosice | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-sonnet3-kosicekartta | sonnet3-kosice-kohdekartta | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-sonnet3-ks2 | sonnet3-kosice-era2 | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-sonnet3-lj2 | sonnet3-ljubljana-era2 | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-sonnet3-ljkartta | sonnet3-ljubljana-kohdekartta | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-sonnet3-ljubljana | sonnet3-ljubljana | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-sonnet3-lvaltu | sonnet3-nostot-lva-ltu | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-sonnet3-numerot | sonnet3-kohdekartta-numerot | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-sonnet3-rou | sonnet3-nostot-rou | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-sonnet3-svn | sonnet3-nostot-svn | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-sonnet3-swe | sonnet3-nostot-swe | kylla | kylla | **KYLLA** |
| /Users/samireivinen/Matkakirja-fable/.claude/worktrees/agent-a13872f9921195960 | agent-arvonimet-eur | kylla | kylla | ei (.claude/worktrees) |
| /Users/samireivinen/Matkakirja-fable/.claude/worktrees/agent-a1b6601ec6c1d9a81 | agent-bryssel-sisalto | kylla | kylla | ei (.claude/worktrees) |
| /Users/samireivinen/Matkakirja-fable/.claude/worktrees/agent-a54cd798b44c035e4 | agent-kaupunkiresepti | kylla | kylla | ei (.claude/worktrees) |
| /Users/samireivinen/Matkakirja-fable/.claude/worktrees/agent-a6b70708cc45b89cf | tyo | ei | kylla | ei (.claude/worktrees, likainen) |
| /Users/samireivinen/Matkakirja-fable/.claude/worktrees/agent-aa95ecb7b601a1a8e | worktree-agent-aa95ecb7b601a1a8e | kylla | kylla | ei (.claude/worktrees) |

Huom: "poistettavissa=KYLLA" tarkoittaa vain että worktree-hakemisto voi
poistaa (`git worktree remove`) — haara jää originiin ja täytyy tarkistaa
erikseen ennenkuin poistetaan sekin (osa näistä 14 sonnet3-* haarasta on
todennäköisesti jo squash-mergetty PR:n kautta, osa ei).

## Detached HEAD -puut (scratchpad, session-omistajuus epäselvä)

| Polku | Haara/commit |
|---|---|
| /private/tmp/.../1de1d7f9.../scratchpad/wt-poltto | claude/bold-ride-vow4ki-poltto-ranska-nostot (8816a5b9) |
| /private/tmp/.../1de1d7f9.../scratchpad/wt-reliefi | claude/bold-ride-vow4ki-reliefi-15s (22825eff) |
| /private/tmp/.../33f87567.../scratchpad/wt-poltto | detached HEAD (e707f884) |
| /private/tmp/.../eae54e73.../scratchpad/wt-main | detached HEAD (671e7d49) |

Nämä ovat /private/tmp-session-scratchpadeja (todennäköisesti jo
päättyneiden sessioiden jäänteitä) — eivät pysyviä ~/Matkakirja-*-
worktreitä, siivoutuvat yleensä itsestään session mukana.

## Yhteenveto

- Worktreetä yhteensä (pysyvät ~/Matkakirja-*): 34
- Poistettavissa (puhdas + pushattu + ei nykyinen sessio): **14** (kaikki sonnet3-*)
- Likaisia: 1 (agent-a6b70708cc45b89cf, haara "tyo")
- Detached/scratchpad-puita erikseen listattu: 4
