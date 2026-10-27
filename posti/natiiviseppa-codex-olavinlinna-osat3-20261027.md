# Natiiviseppä → Codex: Olavinlinna #3 vapautettu, linnan muut osat (PT kuittasi palatsin rakenteen 27.10.2026)

PT kuittasi palatsin #1003 rakenteen 27.10. (työkalu 0, merkit ja kulku ok); pintakorjaukset v2 kulkevat erikseen
(`posti/natiiviseppa-codex-olavinlinna-palatsi-kuittaus-20261027.md`). PT vapautti linnan muut osat. Tee ne **juoksupelin
tilausten väleissä** (juoksupeli ensin, kuten tähänkin asti), **osa kerrallaan tässä järjestyksessä**, jokainen omana
toimituksenaan; seuraavan osan saa aloittaa odottamatta edellisen kuittausta.

| # | Osa | Lähde (`_valmiit/olavinlinna-asettelu-6-10-v1/`) | Toimitettava |
|---|---|---|---|
| 3a | Kirkkotornin muuriportaat (huone 6, pisteet 44–48) | `asettelu-kirkkotorni-portaat.glb` + kuvat | `kirkkotorni-portaat.glb` |
| 3b | Kappelin kehä- ja ampumakäytävä (huone 7, 73–79) | `asettelu-kappeli-kavely.glb` + kuvat | `kappeli-kavely.glb` |
| 3c | Muurikäytävä, harja, komero, pako (huoneet 7–10, 80–94) | `asettelu-muurikaytava.glb` + kuvat | `muurikaytava.glb`, `harja.glb`, `komero.glb`, `pako.glb` (rajat merkkien mukaan) |
| 3d | Tyrmä E101 | `asettelu-tyrma-E101.glb` + kuvat | `tyrma-E101.glb` |

Komero (3c): kellotornin komeron **tiilitäytetty aukko** (`tiili:komero-1…6`), jotta `esine-tiili-komero.glb` ei leiju.

## Säännöt (kuten palatsissa)
- Lue ensin `OHJE-CODEXILLE.md` (osataulukko, säännöt 1–6) ja `asettelu.json`. Sama koordinaatisto ilman siirtoa; logiikkamerkit
  omilla nimillään tyhjinä solmuina, transformit ja `extras.merkki` ennallaan; kulkuvaippa 0,8 m ja ovien aukot vähintään merkin
  kokoisia; kameroiden edessä 3 m vapaata. Pelin v49a-kävely- ja törmäysmallit ennallaan, GLB korvaa vain näkyvän rakenteen.
- Aitous: aito vuoden 1499 Olavinlinna. **Palatsin opit suoraan mukaan:** lattiat harmaata luonnonkiveä kalkkilaastisaumoin (ei
  punaruskeaa, sileää tai nykyväriä); muuraus epäsäännöllistä luonnonkiveä (tumma graniitti + vaaleampi kivi) runsaassa
  kalkkilaastissa, osin rapattuna, ei säännöllistä tasakokoista kvaaderia; puupalkit ja rautaosat. LUEMINUT erottaa lähteen ja
  tulkinnan.
- Mobiiliraja: osa ≤ 100 000 kolmiota ja ≤ 300 piirtoa. `node tools/codex-3d-tarkistus.mjs <kansio>` = 0 ennen toimitusta.
- Kuva: yksi havainnekuva per osa (3c: yksi koko muurikäytävästä), **enintään 1 otto per kuva** (pysyvä lupa 7.15); merkintä
  "Havainnekuva. Tekoälyllä tuotettu, ei valokuva." tiedostonimeen ja metatietoon, ei kuvan päälle. Keskeytynyt kutsu ilman kuvaa:
  ei uusintaa ilman omistajan lupaa.
- Toimitus per osa: `posti/olavinlinna-<osa>-geometria-2026MMDD/` + SHA256SUMS + MANIFEST + qa-kuvat; vastaus
  `posti/natiiviseppa-codex-olavinlinna-<osa>-geometria-toimitus-2026MMDD.md`. Natiiviseppä tarkistaa, PT kuittaa, Lavastaja kokoaa.
- Ei main-mergeä, versionnostoa, peli-integraatiota, R2-julkaisua eikä pelijulkaisua.
