# Karttaseppä: luovutus 1.11.2026 klo 07.0x (KS local_740947d7)
Edellinen: viesti-karttaseppa-luovutus-20261101-0604.md (PR 5819; sen kohdat 2 ja 3 nyt tehty). Syy: konteksti 25 % (pehmeä raja).
P = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/`, T = `P/codex-pseudo3d/tilaus-05m-keskusta-luonnos-20261101/`.

## 1. PARIISIN NIMIÖT (junaan 216)
- 279120237 on NS:n rungossa b9f46d37a: P2-kuvassa "Galerie des Machines" on kokonainen ja Concorde paikallaan (PT:lle lähetetty).
- **AVOIN:** 774e26da0 (proto `karttaseppa/piirros-pariisi-216`, worktree `/Users/Shared/Claude/wt/proto-karttaseppa-piirros-pariisi`,
  vain NostotKartalla.cs): piirroskerroksen aikana `PiirrosKyljet` siirtää "Tuileries'n palatsi" -nimen vasemmalle ja
  "Les Hallesin hallit" -nimen oikealle, pois Louvren karikatyyrin päältä. **Ei käännetty.** NS:lle on lähetetty käännös ja
  P2-kuva PT:lle. Seuraaja tarkistaa kuvan. Jos Les Halles jää Pariisi-pallon alle ja palaa Louvren päälle, kokeile kylkeä
  "koillinen". Käännösvirheet korjataan samaan haaraan.

## 2. PARIISIN KESKUSTA 0,5 m/px (lähin taso; KK hyväksyi, PT 06.4x)
- **Erä 1 tilattu Codexilta:** 3×3, r04–r06 × c03–c05 (Cité), postilaatikko c87e87855
  (`posti/karttaseppa-codex-pariisi-05m-era1-20261101.md`). Toimitus `proto-3d/_tyo/codex/pariisi-05m/`.
- Alue: Concorde–Place des Vosges × Garnier–Panthéon, res 2 x 7168–10752, y 2816–6016,
  maanpinnalla P 48.875387, E 48.841340, L 2.319263, I 2.368198. Ruudukko 7 × 5 = 35 palaa (`P/tulos/palat-05m.json`).
- **Seuraavaksi:** kun erä 1 tulee, tee kooste ja anna PT:lle saumat ja tyyli. PT:n OK:n jälkeen tilaa loput 26.
  Niiden ohjeet ovat valmiina: `T/ohjeet/` (ohje, 1 m:n malli 2× ja vesimaski kaikille 35:lle), työkalu `P/ohjeet-05m.py`.
- Kerros ja kooste on parametroitu (tarkkuus 2 ennallaan, varmuuskopiot `P/*.ennen-05m-20261101.py`). Ajokomennot: `T/MUISTIO.md`.
  Pelivienti tekee `natiivi/lahi-<r>-<c>.jpg` + `lahitaso.json`. Kerroksen koeajo erän 1 alueelle: `P/codex-pseudo3d/kerros-05m-koe/`
  15 palaa, OK: puut, ihmiset, autot ja veneet skaalautuvat oikein
  (`esikatselu-r05-c04-osa.png`). Koostetta tarkkuudella 4 ei ole vielä ajettu, koska paloja ei vielä ole.
- **NS:** lähin taso on rungossa e34b17986 (1,5 km yleensä, 0,75 km vain tarkkuusalueilla). `PiirrosKerros.Tarkkuusalueet`
  on tyhjä. **Täytä se samassa commitissa kuin 0,5 m:n palat:** `(48.875387, 48.841340, 2.319263, 2.368198)`.
  NS:n PiirrosKerros ei vielä lataa lahitaso.json:ia. Sovi NS:n kanssa, kun palat ovat valmiit.

## 3. MUUT
- PR 5821 (offline-maasto 2026-10-29-maailma) mergetty. 09-24-sarja jää ämpäriin (TF 215, PT).
- Postilaatikko-wt käytössä (0,5 m:n tilaukset), ei poisteta.
- Siivottavissa myöhemmin: `P/_muokkaa_*.py`, `P/*.ennen-kk-20261101.py`, `T/vanha-36/` (ensimmäinen 36 palan luonnos).
