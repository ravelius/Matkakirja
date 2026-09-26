# Linssisepän luovutus 27.9.2026 yö (i) — Linssiseppä (Opus, max) = myös Mallinseppä

*Sessio 7ea9f18e (session id local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4), 26.9. klo 23.1x alkaen. Edellinen: -h.md
(lue sen kohdat 1–4 taustaksi). Fable local_5df52e10-10e4-4b72-9554-0049db300dfe, Natiiviseppä
local_674b9ec4-e2f3-48e9-a810-a129f20a4f03.*

## Jono (omistaja 22.3x, Fable)

1. **Kolme erikoismallia** (mallinseppa/pohja 9bb99488, EI muutoksia tässä sessiossa) → käännös Natiivisepän kautta →
   laitekuvat → rivi Fablelle → PYSÄHDY omistajan tarkastukseen.
2. **Merikokeilu** höyrylaiva + valas: KOODI VALMIS (alla), odottaa samaa käännöstä.
3. **Lento v3 -speksi**: Opus-agentti kirjoittaa docs/raportit/lento-v3-speksi.md (ei committoitu, tarkistan ennen Fablea).

## Käännös (odottaa Natiiviseppää)

- Pyyntö 23.3x: YKSI yhteiskäännös `juna/b13+mallinseppa/pohja+linssiseppa/merikoristeet` simulaattoriin D0D2CD1E
  (merge-tree: ei ristiriitoja juna/b13 8a90b51f:n päällä). ylhaalta-175 menee ristiin juna/b13:n kanssa
  (Symbolimallit.cs, Tasot23.cs) → jos yhdistelmähaaraa ei ole, erikoismallit kuvataan ilman ääriviivaa ja
  ylhäältä-kulma puuttuu (kallistus < 25° näyttää 2D-symbolin), kerrotaan omistajalle.
- Kysymykset Natiivisepälle yhä auki: kokokerroin (1,5 × symboli vs ≤ 40 pt), tapahtuma kortin jokaisella avauksella.
- Kun .app on valmis: `APPNIMI=mallit /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/ajo-mallit.sh`
  (VAIHEET 1 käynnistys, 2 erikoismallit: kerroin 6, 30°/55°, iso 110 pt + lähikuva, video 12 s tapahtumalla, yö;
  3 meri: yhteyskuva, valaan ja laivan videot, isot kuvat koko × 3; 9 sammutus). S-muuttuja osoittaa tämän session
  scratchpadiin → kopioi .app kansioon $S/mallit-app/. Rajaus: rajaa.py (neliö mallin ympäriltä, --rivi vierekkäin).

## Merikokeilu: proto-haara `linssiseppa/merikoristeet` (a7e39640, worktree /Users/Shared/Claude/wt/proto-linssiseppa)

- Pohja linssiseppa/hoyrylaiva b59c99b0 (merge-pyynnössä, ei vielä junassa). Vain ElavatElementit.cs muuttui.
- Aiheet `merilaiva` ja `valas` ankkurissa NOR 4,113 E 61,013 N (merikohdat.json, merelle 265°, rannikko 355°), siirrot
  ilmansuuntiin (laiva 90 pt pohjoiseen, valas 70 pt etelään → ≥ 120 pt).
- MeriGeometria: näytös/tauko siemenaikataululla (laiva 25–40 s / 30–90 s, valas 12–16 s / 60–150 s, ensimmäinen tauko
  3–8 s), tauolla ei piirretä (Aihe.Naytos), harvinainen ~1/10 (vihellys / pyrstön läiskäytys).
  - Laiva: Thamesin laiva + vanavesi (Kelvinin kiila, rattaiden kuohu, keulakuohu), keinunta ja rannikon suuntainen kaari.
  - Valas: pyöreä pää, rintaevät, vaahtorengas, puhallus 4 pallon pilarina kahdesti ja pyrstö pystyyn sukelluksessa.
- Kolmiot: laiva 90 + rattaat 96 + savu 40 = 226; valas 120 + suihku 32 + pyrstö 8 = 160.
- Komennot: `elava elementit nayta <merilaiva|valas> [harvinainen]`, `elava elementit koko <k>` (arviointikuviin),
  `elava elementit tila` (näyttää näytös-/taukotilan).
- Esikatselu ilman Unityä: /Users/Shared/Claude/proto-3d/tyokalut/meri-esikatselu/ (poimi.py poimii luokat worktreestä,
  kaanna.sh, `dotnet meri.dll verkot <merilaiva|valas> <ajat,…> [harv]`, piirra.py <laji> <ajat> <ulos.png> [kallistus] [skaala]).
- Reaktio pelaajaan ja valintasääntö (kohdemaan meri) vasta hyväksynnän jälkeen.

## Muuta

- Elävät elementit (hoyrylaiva b59c99b0) eivät ole vielä junassa (Fable pyysi Natiiviseppää 23.1x).
- Erikoismallien Kolmiot0-arviot (1076/900/1150 → 1324/858/1420) päivitetään toimitushaaroihin hyväksynnän jälkeen, jotta
  käännösjonossa oleva SHA ei vaihdu.
