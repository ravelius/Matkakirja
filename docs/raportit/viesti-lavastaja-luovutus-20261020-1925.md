# Lavastajan luovutus 20.10.2026 klo 19.25 (Opus, medium)

Edellinen: `viesti-lavastaja-luovutus-20261020-1750.md` (70c46e621). Työkalut, opit ja säännöt ovat ennallaan. PT:lle enintään 3 riviä.

## ENSIN (uusi Lavastaja)
1. **Louvren Tripo-henkilöt → juna 209** (omistaja 19.12 PT:n kautta "käytä niitä"): proto-haara `lavastaja/louvre-tripo-liike` 2dada40f9
   (worktree `/Users/Shared/Claude/wt/proto-lavastaja-monalisa`, pohja natiiviseppa/juna-208 00aefd136). Merge-pyyntö lähetetty NS:lle
   (local_a9af6995) 19.2x. Proto-repolla ei ole etärepoa, joten haara on paikallinen.
   - `MuseoHenkilot.Paalla = true`. k1 (Codexin nainen, luuranko idle + walk) kävelee gg:ssä Ytimen `MuseoKavijat`-simulaatiolla.
     Walk-tahti on mitattu glb:stä (2 × 1,28 m / 2,333 s, `KavelySykliM`/`KavelyKestoS`). k2 ja vartija ovat kiinteitä esteitä
     (`MuseoKavijat.LisaaKiintea`, uusi `Ydin/Museo/MuseoKavijatKiinteat.cs`).
   - Testit: `MuseoKiinteatTestit` 1/1, Linssit 2184/2184, tarkista.sh ok. NS kirjasi 209-jonoon (yhdistää, kun 208 on lukittu).
   - LS 19.3x: opaskierros ei tarvitse muutoksia. VARAUS: jos `museo elama 1` laitetaan päälle Louvressa, kaksi simulaatiota eivät näe toisiaan → siirrä k1 Elaman simuun.
   - Älä aja kaanna.sh:ta ja tarkista.sh:ta yhtä aikaa (sama rakennus-dll → Abort trap 6).
2. **k2:n ja vartijan luuranko** (omistaja 19.23 hyväksyi): PT tilasi Codexilta samaan `louvre-kavijat-v2`-toimitukseen (idle + walk).
   Kun ne tulevat: media `louvre-ihmiset-v1`:n rinnalle (vienti JU), k2 `Kavelevat`-listaan; vartija pysyy tuolilla idlellä (tarkista mitoitus).
3. **Codex PT738-K1…K4** (4 uutta kävijää, posti 7ccc398a2): kokoa, kun ne tulevat. Ne lisätään `Paikat`/`Kavelevat`-listaan tai
   `MuseoKavijaMallit`iin, sen mukaan, ovatko ne Tripo-luurankomalleja.
4. **Codex PT734–737 → rakennukset-v13**: 19.25 vielä 0 glb:tä. Ohje on edellisessä luovutuksessa (pohja v12).
5. **Pulu**: oma lippu `MuseoPulu.Paalla` pysyy pois. Koodikyyhky on omistajan hylkäämä. Tripo-Pulu v3 on omistajan katselussa KK:n kautta,
   ja se tarvitsee linturigin ja liikkeet ennen kuin se kytketään.

## Valmiit tällä vuorolla
- Tausta-v6 oli jo valmis (459cd7ebb2a4). Rivi "JONO TYHJÄ" lähetettiin PT:lle 18.1x.
- **Meridiaaniportin keskiaukko** (omistaja 18.39): säteillä tarkistettu auki läpi asti (lod0/1/2, törmäys, tausta-v6). Ei korjausta.
  PK:lle mitat: keskilinja x = 13,186 − 0,0355·(z + 380,906), z −394,70…−367,12, leveys 6,0, lattia 0, holvi 6,0 → laki 9,0.
  PK otti ne käyttöön (palaute-208 7980a4cb9, drone 4 m:n korkeudella). Skriptiä ei säilytetty (scratchpad).
