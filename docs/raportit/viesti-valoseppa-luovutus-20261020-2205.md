# Valoseppä – luovutus 20.10.2026 klo 22.05 (Suomen aika), JONO TYHJÄ

Valoseppä (Opus, päätili) → seuraava Valoseppä. Edellinen: viesti-valoseppa-luovutus-20261020-1750.md (historia).
Id:t (päätili 20.10.): PT local_cf5b4eca, NS local_a9af6995, LT local_ede7e965, JU local_f1add29f, PK local_ff97a421.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2 (päiväkirja $D/JONO.md). Proto-wt /Users/Shared/Claude/wt/proto-linssiseppa2-jalki.

## 1. Valmista tässä vuorossa (kaikki PT:n OK:lla)
| aihe | sha (proto) | tila |
|---|---|---|
| Iso iPad juoksu 0,8 + MSAA 2 | 8d53e567e (7cc6c70d0 rungon päällä) | LT k6: raskas 14,8–17,2 ms, ka 12,3, 60 fps; kuvapari ei eroa → PT |
| Revontulet eläviksi + Linnunrata himmeämmäksi (omistaja 18.50) | c4afeb850 | juna 208 (lukittu 6c0e7ca79) |
| Kankaan reunavarjo ilman alareunaa | e3de8d0bc | juna 208 |
| Kehyksen "rako"-materiaali alareunassa valossa (omistaja 19.47; varsinainen raidan syy) | 741f14942 | juna 208 |
| Juoksun kultainen iltapäivä v1–v3 (omistaja 20.14, Codex j9/j10) | 6077ff41c, b9802d3f3, 59ee46762 | juna 209 |
| Vaaleat lämpimät pihalaatat (omistaja 21.32) | a047fe4df | juna 209 (runko b8a30862f) |
| Kujien varjon täyte lämpimämmäksi | 40e5e5b26 | PT OK 22.0x → NS runkoon 209 |

QA: `ui juoksupeli valo kulta 0|1` (valo + värisäätö + pihalaatta), `astro kyyti revontulet _Elava=0|1`, `astro kyyti linnunrata revontulet x`.
GPU isolla iPadilla: juoksu raskas kohta 9,2 ms (kulta ≈ 0 ms); Cupola revontulet ~21 ms 30 fps -tilassa (ennallaan).

## 2. Avoinna
- Matot (Codex aamulla, Lavastaja sijoittaa) – valon puolelta ei tehtävää ennen kuvia.
- Katot kullankeltaisina vielä hieman oransseja (v3) – säätövaraa: ValoProfiilit Juoksu Lampotila/Saturaatio, ValoKohteet.JuoksuKultaAurinkoVari.

## 3. Opit
- Laitetestaajan tiedostokanava: Cupola- ja museokomennot linssi-komento.txt:hen ILMAN "ui linssi" (`linssi raketti laukaise 0` → `linssi raketti ohita` → `astro kyyti …`); Louvre: sk-kangas.txt (revontulet-208/).
- Tumma raita taulun reunassa oli kehysprofiilin "rako"-materiaali (sali.json, srgb 38/28/18), ei varjostimen varjo.
- Kapea kuja matalalla auringolla on seinän varjossa: täyttövalo määrää kujan värin.
- ÄLÄ muokkaa sedillä rivinsisäisiä //-kommentteja C#-määrittelyihin (katkaisi rivin) – python-korvaus + testikäännös (Linssit-testit/kaanna.sh).
- Siivous: vanhat kansiot T7-arkistoon (kirjaus _tyo/SIIRRETTY.txt); `$D/vahti/` on Julkaisijan vakioajon käytössä – ei siirretä.

## 4. Aloitusviesti
```
Olet VALOSEPPÄ (Opus, high). Checkout /Users/Shared/Claude/Matkakirja-linssiseppa-2, proto-wt /Users/Shared/Claude/wt/proto-linssiseppa2-jalki.
git fetch origin; lue CLAUDE.md, Raamattu Ydinajatus 2 ja docs/raportit/viesti-valoseppa-luovutus-20261020-2205.md + $D/JONO.md loppu.
Jono tyhjä: PT:lle "JONO TYHJÄ: Valoseppä". Seuraava todennäköinen: mattojen valo (Codex), kattojen sävyn hienosäätö.
```
