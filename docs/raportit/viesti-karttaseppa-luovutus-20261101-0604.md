# Karttaseppä: luovutus 1.11.2026 klo 06.04 (KS local_740947d7)
Edellinen: viesti-karttaseppa-luovutus-20261101-0503.md (kohdat 2 ja 4 nyt tehty). Syy: konteksti 27 % (pehmeä raja).
P = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/`.

## 1. PARIISIN PIIRROSKARTTA PELISSÄ: VALMIS
- KK:n koostepalaute korjattu koodikerroksessa (sävy, puut, elämä, puistokäytävät + 75 suihkulähdettä) → KK hyväksyi (PT 06.0x);
  katot G:n harmaansiniseen samaan vientiin (`KOOSTE_KATTO=0.6`). Muistiot: `P/codex-pseudo3d/kooste-97-kk-20261101/MUISTIO.md`
  ja `P/codex-pseudo3d/kooste-97-kk-katto-20261101/MUISTIO.md` (ajokomento, parametrit `P/kk-parametrit.env`, kerros `kerros-1m-kk1`).
- Pelivienti `P/kokoelma/G1m/` (55 laattaa + maskit + natiivi.json + web-5184.webp). Vanhat: `G1m-kk-ilman-kattoa`, `G1m-ennen-kk`.
- Web: PR 5817 mergetty 3c85f3a56 (`assets/kartat/pariisi-piirroskartta.webp`). Media: JU vei 111/111 →
  `media.matkakirja.app/kohtaamiset/piirroskartta/pariisi/` (PK kuittasi; tarkistettu koot). Natiivi: juna 216 runko 75125af1a (NS).
- Kuvaparit pelistä G:n rinnalle: `P/codex-pseudo3d/kooste-97-kk-katto-20261101/peli-G-rinnalla-{cite,keski}.jpg` → PT:lle.

## 2. AVOIN: NIMIÖKORJAUS NS:LLÄ (PT 06.0x)
- PT: P2-keskissä "Galerie des." katkeaa ja "Concorden aukio" osuu Louvren päälle. Syy: kohdenostojen nimiöt kylkeen näkymättömän
  piirrosruudun viereen + 18 merkin lyhennys.
- Korjaus proto `karttaseppa/piirros-pariisi-216` **279120237** (worktree `/Users/Shared/Claude/wt/proto-karttaseppa-piirros-pariisi`,
  vain NostotKartalla.cs): piirroskerroksen aikana (PiirrosTila = peitto < 0,5) ruutu = MiniRuutu, nimi kokonaan, kylki ala/ylä ensin,
  lukko vain ala/ylä, kynnyksellä Paivita(). **EI käännetty.** NS:lle lähetetty: käännös + P2-keski uudelleen → kuva PT:lle.
  Seuraaja: tarkista NS:n kuva; jos käännösvirhe, korjaa samassa haarassa.

## 3. MUUT AVOIMET
- Maaston 2026-09-24 → 2026-10-29 -vaihdon pieni PR (luovutus 20261031-2325, kohta 4).
- Postilaatikko-wt säilytetään vielä (Codexin Pariisi-aineisto); Pariisi on pelissä, joten poiston voi kysyä PT:ltä.
- Väliaikaiset `P/_muokkaa_*.py` (muokkausskriptit) ja varmuuskopiot `P/*.ennen-kk-20261101.py` voi siivota myöhemmin.
