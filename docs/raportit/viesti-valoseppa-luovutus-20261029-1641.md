# Valosepän luovutus 29.10.2026 klo 16.41

Lue ensin tämä, sitten loki `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 29.10. 15.33 →).
Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`, haara **linssiseppa2/seinat-211**, kärki **d0e1f2259** (natiivi-backup;
sisältö = de0aeca40). Koehaara **linssiseppa2/koe-luotain** (natiivi-backup, force-pushattu, vain kokeita: ÄLÄ junaan).
MAC-UUDELLEENKÄYNNISTYS: ei omia taustaajoja.

## Tehtävä (PT 15.3x–16.4x)
Juoksupelin kujat: Codexin stone-surfaces-v6 (LR juuri-v137m). Lattia OK. VIKA: kivijalassa (V4_kujakivi_sokkeli, _KujaKivi 2)
pystysuuntaiset vaaleat/tummat juovat ~0,3 m välein peittävät kivikerrokset (PT:n vertailu: pilarien takana jatkuva kivijalka, 02 vasen
seinä ja 05 vasen seinä). Omistajan linja 28.10. 18.57: kivijalan sävy kivittäin hyväksytty, säilytä. Valmis = SHA + parit 02/05
(kivijalka ilman juovia, sävy kivittäin) PT:lle. Ei heijastuksen poiskytkentää väliaikaisena (PT).

## Tehty
- **de0aeca40** (sis. 633d70948): sokkeli-v03 ja lattialaatat-v03 KiviJakoon (laji 5 / 6, saumat normaalikartan viisteistä:
  `SokkeliV03Saumat`, lattia 3 riviä × 2 laattaa) → sävy kivittäin; v4b:n mip 5 -pakkaus vain laji 1 (v01). METAL 440/0, PIPELINE 432/0.
  Pari 02/05: proto-3d/lokit/havainne-editori-20261029-154748. Nämä EIVÄT poistaneet juovia (sivuhuomio: alkuperäinen syy-arvio väärä).
- LR korjasi v137m:ään UV-puolen (wrapT CLAMP → REPEAT); sekään ei poistanut juovia. UV-tiheys oikein (2,0 m/u, 1,2 m/v; myös lod1).

## JUURISYY RAJATTU (kokeet 02, REF de0aeca40 + koe-luotain, juuri-v137m, LR:n editori-lr.sh)
| koe | ajo | juovat |
|---|---|---|
| A perus | 154748 | on |
| B leivonta 0 | 155006 | on |
| C vertailu 1 (ei leivontaa/varjoja) | 155302 | on |
| D `valo heijastus 0` | 155512 | EI |
| E luotain shadowDistance 0 (cf86c90c0, peruttu) | 155945 | on |
| G luotain cullingMask 0 (b9f73ca92) | 161736 | on |
| H Heijastus.cs:28 `QualitySettings.realtimeReflectionProbes = true` pois (e05e386e5) | 162007 | EI |
| I laatu-/URP-tila ennen/jälkeen asetuksen lokiin (a4f277cd0) | 162336 | identtiset |
| J kivijalan normaalikartta pois (8999b432b) | 163031 | EI (= D, suhde 1,00) |
| K asetus maailman luonnissa (78007600c, peruttu d0e1f2259) | 163407 | on |
| **L luettu normaali väreinä (5f07afb2b)** | **163724** | **ks. alla** |

- A/D-suhde kivijalassa: jaksolliset lämpimät kaistat +15–20 % (R>G>B), muualla 0,97 → auringon diffuusi normaalin kautta.
- **L: kivijalkaan luettu `_NormaaliKartta` EI ole Codexin sokkeli-v03-normal (tasainen violetti), vaan pinkki/sininen pystykaistoin**
  (näyttää kourutiilen/kattotiilen normaalilta) → **väärä normaalikartta sidottu kivijalan materiaaliin.** Heijastusasetus vain muuttaa
  ajoitusta (asetus tapahtuu ennen palatsin latausta, loki I). Ilman asetusta normaali ei vaikuta lainkaan (D = J): todennäköisesti silloin
  sidottu oikea (tasainen) kartta.
- Epäily: kuvaindeksin ja tekstuurin vastaavuus on ajoitusriippuvainen: `JuoksuV4Maailma.cs:614–620` (`normaalit[avain]`,
  `kuvat[-1000 - nk]`, `g.Kuvat[nk]`), `GlbMalli.Kuvat`-listan täyttö (rinnakkainen dekoodaus?), `normaalit`-avain (kuva, väri, laji).

## Seuraava askel (uusi VS heti)
1. Koe M (249373bff koe-luotain) kaatui käännökseen: `GetInstanceID()` vanhentunut → käytä `GetEntityId()` tai jätä pois. Lokirivi
   kivijalan ja palatsikaton sidonnasta: nimi, kuva + KuvaNimet[kuva], nk + KuvaNimet[nk], ntex koko, tavut. Aja 02 sekä oletuksena että
   H-tilassa (asetus pois) → näkyy, mikä kuva sidotaan väärin.
2. Korjaa juuri (indeksi/välimuisti/latausjärjestys), commit seinat-211:een, METAL (`zsh tyokalut/metal-tarkistus.sh <scratchpad-kansio>`;
   EI Temp/:iin – Unity tyhjentää sen), parit 02 + 05 (`REF=<sha> J=v137m KOHDAT="02 05" zsh
   /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset/tyokalut/aja_v132_pari.zsh` tai editori-lr.sh suoraan) →
   tarkista itse kivijalka (pilarien takana, 02/05 vasen seinä) → PT:lle SHA + polku.
3. koe-luotain-haara poistetaan, kun korjaus on valmis.

## Opit
- `git revert` ei ota `-q`:ta; älä ketjuta `commit --amend` epäonnistuneen revertin perään (amend muutti koecommitin viestin; korjattu).
- Erokartta- ja suhdetyökalut: kopioitu `_tyo/linssiseppa2/tyokalut/` (erokartta.py, suhde.py, uvtiheys2.py, paallekkaiset2.py, pisteenuv.py, glbkuvat.py, saumat*.py; ajo /opt/homebrew/bin/python3 -I) –
  ajettavissa suoraan.
- QA-sävy `valo savy kujakivijalka r g b` ei näkynyt editoriparissa (160640) – tarkista erikseen, ennen kuin käytät tunnistukseen.
