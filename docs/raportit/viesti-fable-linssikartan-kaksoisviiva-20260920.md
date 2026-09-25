# Opus → Fable: linssin tasokartan kaksoisviiva (erä 1b)

20.9.2026 klo 10.30. Haara `opus-local-linssikartan-kaksoisviiva` (pohja
origin/v1973-prep, 4fa6027d). Ei versionostoa, ei PR:ää.

Tilaus: tasokartalla maan kehä (`js/maatummennus.js`, admin_0, 2,5 px
punainen) piirtyy poltetun rantaviivan (`ne_10m_ocean`) päälle eri
geometrialla. Vaihtoehdot olivat *"sama naulaus tai kehän rannikko-
osuuden jättäminen piirtämättä"*.

## Mitä tehtiin: naulaus jo aineiston generoinnissa

Tasokartalla kehä on SVG eikä siellä ole rannikkoa vektoreina, joten
ajonaikainen naulaus (pallon `naulaaKorostus`) ei ulotu sinne. Siksi
naulaus tehtiin **lähteessä**: `tools/generoi-maapolygonit.mjs` lataa nyt
myös `ne_10m_ocean.geojson`:n, rakentaa siitä rantahilan ja siirtää
jokaisen admin_0-kehän kärjen, joka on alle 0,015° (≈ 1,7 km) rannasta,
rantaviivan omalle kärjelle ENNEN harvennusta. Tuloksena molemmat
näkymät piirtävät saman rannan samasta geometriasta.

Luvut: **364 502 kärkeä naulattu**, aineisto **1 448 → 1 415 kt** (pieneni),
135/135 maata, 2 573 rengasta.

## Mitattu (Ranska, ero POLTETUN kartan omaan rantaviivaan)

| | ennen | jälkeen |
|---|---|---|
| rannikkokärkiä (alle 1,7 km rannasta) | 1 454 | 1 454 |
| ero mediaani | 102 m | 102 m |
| ero p95 | 162 m | 161 m |
| **ero suurin** | **539 m** | **212 m** |
| pisin vesijänne | 11 778 m | **11 778 m** |

Suurin poikkeama puolittui yli. Mediaani ja p95 eivät liiku, koska ne
ovat **kvantisoinnin pohja**: aineisto talletetaan 0,1 lautayksikön
tarkkuudella (≈ 334 m ruudukko), eikä naulaus voi mennä sen alle.

**Mittasin myös hienomman rannikkoharvennuksen** (rannikkojaksot DP
0,05 yksikköä): aineisto kasvoi 1 415 → 1 961 kt ja suurin ero oli 228 m
eli HUONOMPI kuin ilman sitä. Hylättiin mittauksen perusteella; koodi ei
jäänyt puuhun.

## SINUN PÄÄTÖKSESI: 11,8 km:n vesijänne jää

Naulaus siirtää kärkiä mutta ei voi **luoda** niitä. `ne_10m_admin_0`
sulkee suistot ja lahdet jänteellä — Ranskassa pisin sellainen on
**11,8 km vettä** — eikä siinä ole yhtään kärkeä, jonka naulaus voisi
siirtää suiston pohjukkaan. Jänne jää siis kehään, ja juuri se on se
viiva, joka kulkee veden yli.

Kaksi tapaa poistaa se, molemmat isompia kuin tämä erä:

1. **Ommella rannikko sisään** generoinnissa: pudotetaan kehän rantaa
   seuraavat janat ja liitetään tilalle rantaviivan oma polku (sama
   algoritmi kuin pallon `naulaaKorostus`, mutta tulos on suljettu
   rengas — suunta ja saumakohdat pitää saada oikein). Aineisto kasvaa
   suistojen verran.
2. **Jättää kehän rannikko-osuus piirtämättä** (sinun vaihtoehtosi b):
   tasokartalla maan kehä näkyisi vain maarajoilla, ja rannikon
   piirtäisi poltettu ruskea rantaviiva. Se poistaa kaksoisviivan
   varmasti, mutta muuttaa ilmeen: Ranska ei enää ole punaisella
   ympyröity, vaan punaista on vain Belgian, Saksan, Sveitsin, Italian
   ja Espanjan vastaiset rajat.

Kerro kumpi, niin teen sen. Tämä erä on riippumaton kummastakin: se
pienentää eron kaikkialla, missä kärkiä on olemassa.

## Vartiot

- `node --test tests/*.test.mjs`: **3 746 testiä, 0 punaista** (aineisto
  vaihtui, joten kaikki sitä lukevat testit ajettiin).
- `tools/savukkeet/mittaa-rannikon-naulaus.mjs`: kolme vartiota vihreinä
  (kaksoisviivan janat 0, pituus ei lyhene, sisämaan rajat säilyvät).
- Mittausskripti eroille on kertakäyttöinen (scratchpad), koska se lukee
  13 Mt:n NE-lähteen välimuistista; en vienyt sitä repoon.

## Mitä jäi tekemättä

- Selainkuvaa tasokartalta ei ole: mittaukset ovat geometriasta.
- Laattoja ei poltettu uudelleen — niitä ei tarvitse, sillä naulaus
  siirtää kehän laattojen rannalle eikä toisin päin.
