# Pelikoodari: luovutus 4.11.2026 klo 08.25 – musta maa: koerunko c4a5bfafb kuitattu, syy avoin

Korvaa -0801:n. -0735:n kohdat "Kun JU ilmoittaa" 2–5 ja "Muistiinpanot" voimassa, mutta runko on nyt c4a5bfafb, ei be28de835. Syy: pehmeä raja 26 % (7.37). Ei omia taustaketjuja. Polut kansiossa /Users/Shared/Claude/proto-3d/. Tulokset: `lokit/pk-muistipiikki-219/TULOS.md`, loppu (lue 08.0x alkaen). **Merkitse jokaiseen tulokseen runko.** Tilin ids: PT local_8d8ebf72, KK local_d5f31591, JU local_2a7d6c96.

## Rungot (Matkakirja-proto, haarat paikallisia; wt/proto-pelikoodari-juna-koe on haaralla `-koe2-kanavat-ovi`, puhdas)
- **c4a5bfafb** `pelikoodari/juna-218-koe2-kanavat`: **PT kuittasi koerungoksi** = be28de835 + täytteen uv0 ja uv1 nollina (826/826, tarkista.sh läpi).
- **35b001311** `-koe2-kanavat-ovi`: c4a5bfafb + lähitaso (827/827). Korvaa 9066f9814:n ja 32100a96f:n. Lähitaso ei runkoon ennen kuvaa (KK).
- **eec900eb3:** vertailun toinen puoli (musta 47 %).
- **DIAG, ei junaan:** 0462bf904 (`taytekoe`, kanavaloki), 2d1e2960a (eec + tausta v90).
- Vanhentuneet, ei ajeta: be28de835 rungon todisteisiin, 1d3751841, 9066f9814, 32100a96f.

## Musta maa, todettu (kaikki Macilla, alkulento, laitetta ei katsottu)
| Ajo | Kansio | Musta |
| eec900eb3 | esikatselu-20261104-071522 | 47,2 % |
| be28 + `kopiot 1` | -073534 | 0,0 % |
| be28 + `tayte 0` | -074018 | 0,0 % |
| 1d37: täyte luettava, muut paloina | -075024 | 47,1 % |
| diag2: täyte uv0 + uv1 | -075641 | 0,0 % |
| diag1: täyte vain uv0 | -080842 | 47,2 % |
| 7ddd353e8 `taso 0`, 217:n koodi, kopiot kerralla | -080242 | 0,0 % |
| **c4a5bfafb** | -081352 | **0,0 %** |
| be28 + `kopiotahti 0`, ei UV:ita | -081837 | 0,0 % |

- **Laukaisija (yksi ajo):** paloina-vapautus 9f8d2d13f (4.11. 00.15) tai sen tuoma aika, ei paketti. Latauksen tapahtumajärjestys lokissa sama. 217 vapauttaa kerralla.
- **AVOIN, ei selitetty (PT):** miksi uv1 ratkaisee. Lattian vertex lukee uv1:n, mutta täytteen materiaali ei ole leivottu eikä fragmentti käytä sitä. 3086 lod1-verkolta uv1 puuttuu ilman mustaa. Älä kirjoita "varjostin lukee kanavat, siksi korjaus toimii".
- **PT:n hypoteesi (vertex + ei-luettava verkko) ei täsmää:** 1d37 luettava ja musta; 7ddd vapautettu ja ehjä. Vertex sama kaikilla, lightmap-asetuksia ei koodissa, täytteellä ei omaa MPB:tä.
- **Tausta v90 vs v115:** lod2-glb:n v90:tä ei ole koneella. Ristiajo `ristiv90` (2d1e2960a) oli alkanut 08.22; PT: ei enää tarpeen, JU:lle sanottu keskeyttää. Jos tulos tulee, kirjaa, mutta ei toimia.
- **c4a5bfafb:n kommentti** kertoo havainnon, ei laukaisijaa: tarkenna junan koosteessa (ei muuteta kuitattua shaa nyt).

## Odottaa JU:lta (viesti jonossa 08.25, varmista että perillä)
Mittaus: `python3 -I -W ignore _tyo/pelikoodari/musta-lento/musta.py <kansio>/<tallenne>`. Kuvaparit samoista kamerapaikoista: katso `kamera.txt`, lähin paikka (malli `pari.py`).
1. **Reitti 35b001311:** `peitto-reitti/35b001311/`, rivi REITTI AJETTU. Vertailu eec900eb3 | 35b001311, KK:n mittari ja ruudut -0735:n kohdan 1 mukaan, PT:lle ja KK:lle. **Mittaa musta myös `uu`- ja `sa`-tallenteista (PT).**
2. **Juoksu:** `aja-juoksu.zsh c4a5bfafb`, `musta-lento/juoksu-c4a5bfafb/`, tallenne `ju`, rivi MUSTA AJETTU juoksu. Skripti uusi, ei vielä ajettu; tarkista, että botti juoksee. Tasoa 2 ei voi valita QA:lla (`JuoksuTaso.Hae(2)` = entinen juoksu); PT:lle kerrottu.
3. **iPad, c4a5bfafb** (`julkaisija-tyokalut/rungon-lista.md`): sali 1 (`pk-be56-oleskelu.zsh`, raja 4080 Mt), lentokuvat, 40 × Uudestaan (`pk-mittaa-uusinta-nappi.zsh c4a5bfafb 40 40`). Mittaa musta iPadin sali- ja lentokuvista. Tulos KK:lle ja PT:lle, kun laite katsottu.
4. **`7ddd353e8` iPad-kuva (PT:n 217-kuva):** JU ajaa rungosta riippumatta. Vastaa, näkyykö musta 217:n koodilla laitteella.

## Sen jälkeen
- Muisti: kanavat maksavat noin 110 kt (6900 kärkeä × 16 t), varaa 33 Mt (4047/4080). Mittaa rungolla ennen kuin sanot sopivan.
- Muut -0735:n odotukset rungolla c4a5bfafb: UUDESTAAN (`uudestaan-nappi`), KATTO (`katto-sali`), jos JU ei ole jo ajanut be28:lla, kerro runko tuloksessa.

## KK:lle ja PT:lle kerrottu
- PT: kuittaus, laukaisija, syy avoin, tason 2 rajaus, luovutus.
- KK (jonossa 08.25): kuva `musta-lento/pari-kanavat.jpg`, laite ja muisti mittaamatta, syy auki; 217 tuskin kärsii, TF:ää ja laitetta ei katsottu.

## Muistiinpanot
- `tarkista.sh` ajetaan zsh:lla (`zsh tyokalut/tarkista.sh`) ja päivittää tyylikirjan kopion: palauta `git restore` kolmelle tiedostolle.
- Viesti saattaa jäädä jonoon ("queued"): ei tarvitse odottaa.
