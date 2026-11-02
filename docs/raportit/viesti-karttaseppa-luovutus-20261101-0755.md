# Karttaseppä: luovutus 1.11.2026 klo 07.55 (KS local_740947d7)
Edellinen: viesti-karttaseppa-luovutus-20261101-0700.md (PR 5824; sen kohdat 1 ja 2 nyt tehty). Syy: konteksti 25 % (pehmeä raja).
P = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/`, C = `P/codex-pseudo3d/`.
Tilan muistio (kaikki shat ja ajot): `C/tilaus-05m-keskusta-luonnos-20261101/MUISTIO.md`.

## 1. PARIISIN KESKUSTA 0,5 m/px: VALMIS, ODOTTAA KÄÄNNÖSTÄ JA VIENTIÄ
- Codex: erä 1 1ef624c9e (9) + loput 26 f0c6027b7, kuitattu 525f8c489 ja 2594c2b99. 35/35, SHA ja nimet tarkistettu.
- PT hyväksyi 35/35 klo 08.0x. Tarkistus, kuvaparit ja muistio: `C/tarkistus-05m-koko-f0c6027b7/`.
- Kerros 0,5 m:lle 35/35: `C/kerros-05m/` (`C/aja-kerros-05m.zsh`). Maamerkit: 15 spriteä `proto-3d/_tyo/codex/pariisi-spritet/`
  (kuusi uutta kopioitu postilaatikosta). 0,5 m:llä vain Louvre suurenee 1,34×, ja PT hyväksyi sen terävyyden.
- Kokoelma: `P/kokoelma/G1m/natiivi/lahi-0-0 … lahi-3-3.jpg` + `lahitaso.json` (16 + 1, 20 Mt).
  SHA: `C/tarkistus-05m-koko-f0c6027b7/SHA256SUMS-lahitaso` (17/17 OK).
- Proto: lähitason lataus dbe7e3777 on NS:n rungossa (01478b78b). **Lippu TarkkuusPalatPelissa = true** on haarassa
  `karttaseppa/piirros-lahitaso-true-216` 7121019ac (juna-216 655f80e81 päällä; worktree /Users/Shared/Claude/wt/proto-karttaseppa-lahitaso).
  Lähetetty NS:lle (merge, käännös, L1/L2) ja JU:lle (vienti mediaan, vain uusia tiedostoja). JU kysyi SHA-tiedoston polkua,
  ja täysi polku on lähetetty (viesti jonossa 07.54).
- **AVOIN:**
  - (a) NS kääntää → L1/L2-kuvat Notre-Damesta ja Louvresta lähimmältä tasolta PT:lle. NS:ltä on pyydetty, varmista että ne lähtevät.
  - (b) Varmista, että JU:n vienti on tehty.
  - (c) LahiKorkeusM 6000 m on arvio. Jos L1/L2:ssa näkyy 1 m:n taso lähimmällä tasolla tai lataus näkyy, säädä (PiirrosKerros.cs).
  - (d) Proto-haaroja ei ole puskettu (NS mergesi dbe7e3777 paikallisesti).

## 2. PARIISIN NIMIÖT (774e26da0)
- Rungossa (NS 17ed92b29). P2-keski: Louvre puhdas. Tuileries'n palatsi ja Les Hallesin hallit piilossa tukoksessa tässä zoomissa,
  eivät karikatyyrin päällä. PT:lle raportoitu. Jos PT haluaa ne näkyviin, kokeile kylkiä "yla" ja "koillinen" (NostotKartalla.PiirrosKyljet).

## 3. MUUT
- Postilaatikko-wt `/Users/Shared/Claude/wt/karttaseppa-postilaatikko` käytössä, ei poisteta.
- Siivottavissa: `P/_muokkaa_*.py`, `P/*.ennen-*.py`, `C/tilaus-05m-…/vanha-36/`, `C/maamerkit-05m-koe/`, `C/tarkistus-05m-era1-1ef624c9e/peli/`.
- Seuraava oma jono tyhjä avoimien jälkeen → rivi PT:lle "JONO TYHJÄ: Karttaseppä".
