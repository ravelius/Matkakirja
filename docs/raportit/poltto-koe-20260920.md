# Poltto-koe 20.9.2026: Ranskan koelaatat (Karttaseppä)

Omistajan kortti (Fable 20.9. ilta): *"testataan ensin miltä kaikki näyttää
ennen kuin poltetaan"*. Koelaatat Ranskan alueesta (lon −6…10, lat 41…51,5),
z6–z8, ajettu paikalliseen peliin (`?lauta=pallo`, paikallinen luettelo,
laatat reititetty koekansioihin) ja kaapattu iPad-koossa 1024 × 1366 @2.

Kaappaukset: `docs/raportit/kaappaukset/poltto-koe-20260920/` (7 kpl webp):

| Tiedosto | Näkymä | Meren käsittely |
|---|---|---|
| saapuminen-viivoitus | saapumisnäkymä (z6) | rannikkoviivoitus (harva, 8 viivaa) |
| saapuminen-vyohyke | saapumisnäkymä | syvyysvyöhykkeet portaina (30/120/600/1500/3000 m) |
| saapuminen-syvyys | saapumisnäkymä | nykyinen jatkuva syvyysramppi ilman litistystä (vertailu) |
| biskaja-viivoitus / -vyohyke / -syvyys | Biskajanlahti + Bretagne (z7) | samat kolme |
| loire-viivoitus | Loire lähikuva (z8) | joet pohjassa, maakunnat pienenä |

Kaikissa: **joet pohjassa** (Seine, Loire, Rhône näkyvät LEVOSSA — v1980:n
Loire-vika korjaantuu tällä), viivataso ilman jokia ja reittejä (pallolla),
**nimiötaso**: 1873-maakunnat ja meret harvennetuin kapiteelein
(js/packs/nimisto-1873.js, Sisältökirjuri/Fable), nostot ämpärin FRA-nostotasosta.

## Mitä koodiin tuli (haara karttaseppa-poltto-koe)

- `tools/generoi-laattapyramidi.mjs`: `--joet-pohjaan` (joet takaisin pohjaan,
  luettelo `pohja.joet: true`), `--eijoet` / `--eireitit` / `--eirajat`
  viivatasolle, `--vesiviivoitus tihea|harva` (patinan VESIVIIVOITUKSET),
  `--syvyysportaat m,m,…` (maailmapiirto.js `syvyysPortaat`), `--resepti-json`
  (reseptin ajokohtainen muutos, esim. litistys), **`--nimiotaso --nimioversio
  <v> [--nimiot <json>]`** (uusi läpinäkyvä taso `nimiot/z…`, luettelokenttä
  `nimiotaso` + Pelikoodarin metadata: luokka, teksti, lon, lat, iso, meri,
  koko, kulma, tasot, laatikot tasoittain asteina).
- `tools/fokuskartta/maailmapiirto.js`: `piirraNimiotaso`, `nimiotasonLadonta`
  (puhdas ladonta piirtoon, peitteeseen ja metadataan), `NIMION_KOOT`
  (ruutupikseliä tasoittain: meri z4–z8 14–46 px, maakunta z5–z8 13–32,
  pieni z7–z8), harvennus 0,32 em, sävyt himmeä muste / viileä meri.
- Peli: `js/laattapyramidi.js` jokitaso + nimiötaso (pallon lepokerros latoo
  viivojen päälle, nostojen alle; `pyramidinNimiot()` Pelikoodarille),
  `js/pallolaatat.js`/`js/pallo.js` portit. Tasokartan nimiötaso on velka.
- Testit: jokitaso, pallolepokerros; SHELL ja niputus. 3774 testiä, 0 fail.

## Havainnot koelaatoista (korjattavaa ennen isoa polttoa)

1. **Merinimiöt kahdesti**: pelin elävä maastonimi (Biskajanlahti, "≈"-merkki)
   piirtyy yhä poltetun BISKAJANLAHTI-nimiön lisäksi → Pelikoodari piilottaa
   elävän, kun `pyramidinNimiot()` sisältää saman meren (`meri`-avain).
2. **Nimiöiden törmäykset**: ORLÉANAIS osuu Loiren nimiöön, AUVERGNE
   Puy de Sancyn nostoon, AUNIS/SAINTONGE rannalle. Korjaus: koordinaattien
   säätö nimistössä (Sisältökirjuri) + pieni sovittelu ladonnassa (siirto
   pois rannasta ≥ ½ kirjainkorkeutta) — tehdään ennen isoa polttoa.
3. **Meren käsittely** (omistaja valitsee): a) viivoitus antaa kaiverretun
   atlasilmeen mutta on rantaetäisyyttä, ei syvyyttä (omistajan 30.8. huomio);
   b) portaat näyttävät mannerjalustan reunan (Biskaja) oikeasta syvyydestä;
   c) nykyinen ramppi on hillitty. Vaihtoehdot voi myös yhdistää (viivoitus
   + portaat), yksi ajo lisää.
4. Saapumisnäkymässä nimiöt ovat z6-koossa (17–24 px) — luettavia iPadilla;
   Elsass-Lothringen kerman päällä toimii.
5. Kesto: Ranska z6–z8 pohja 90 s/variantti (3 rinnakkain), ranta+viivat 25 s,
   nimiöt 11 s. Koko maailma polttosuunnitelman mukaan ≈ 13 ydintuntia /
   ≈ 1 h 15 min seinäkelloa (docs/raportit/polttosuunnitelma-20260920.md);
   nimiötaso lisää ~5 min, viivoitus +10–20 % pohjaan.

## Ei tehty

- Polttoa, luettelon vientiä eikä osoitinta. Koelaatat kansiossa
  `~/pyramidi-poltto/koe-20260920/` (ei ämpäriin).
- Ranta-taso pallolla ei näy (sarja k on rannaton, ranta vektorina) — koeranta
  on olemassa tasokarttaa varten.

## Merikoe 2: yhdistelmä (Fablen tilaus 20.9. ilta, omistajan palaute)

Kaappaukset `saapuminen-yhdistelma.webp`, `biskaja-yhdistelma.webp`,
`lion-yhdistelma.webp` (Lioninlahti). Resepti: `--vesiviivoitus ohut` (4
hentoa viivaa rannasta, patina.mjs VESIVIIVAT_OHUT) + `--syvyysportaat 200`
(yksi vaalea syvyysvyöhyke mannerjalustan reunassa) + litistys 0,55 (pehmeä,
ei tahrainen) + joet pohjassa. Koristeet nimiötasolla: kompassiruusu (lon
−6,6 lat 44,6 — Biskajan tyhjä kulma, kuvan ulkopuolella saapumisnäkymässä),
kaksi purjelaivamerkkiä (Biskaja, Lioninlahti), aaltomerkki meren nimen alla.

Törmäysten väistö (generaattori, TÖRMÄYSTEN VÄISTÖ): maakuntanimi väistää
laudan kaupunkeja, jokia ja muita nimiöitä (z6: 6 siirtoa, z7: 7, z8: 6) —
Orléanais nousi Loiren yläpuolelle, Île-de-France Pariisin koilliseen,
Provence Marseillen yläpuolelle. Auvergne ei väistä Puy de Sancyn NOSTOA eikä
Languedoc Roquefortin nostoa: nostot eivät ole vielä esteitä (lisättävissä
nostot.json:sta ennen isoa polttoa). Biskajanlahden tuplaus (pelin elävä
maastonimi "≈ Biskajanlahti") on yhä näkyvissä — se ei poistu nostotason
mukana, koska se on FRA:n elävä maastokohde; Pelikoodari piilottaa sen
`pyramidinNimiot()`-taulun `meri`-avaimella.

## Merikoe 3: vyöhykkeet + tumma viivoitus + veneet (omistajan tarkennus 20.9. ilta)

Kaappaukset `*-koe3.webp` (saapuminen, Biskaja, Lioninlahti, Kanaali). Resepti:
`--syvyysportaat 30,120,600,1500,3000 --resepti-json '{"syvyys":{"litistys":0.8}}'
--vesiviivoitus tumma` (patina.mjs VESIVIIVAT_TUMMA: 6 viivaa, voima 0,42) + joet
pohjassa. Väliaikaiset koristeet (geneeriset musteviivat): 6 purjelaivaa (Biskaja 2,
Kanaali 2, Lioninlahti/Liguria 2) ja 2 kompassiruusua (Biskaja, Lioninlahti);
sijainnit `kaappaukset/poltto-koe-20260920/nimiot-koe3.json`.

**Koristeiden rajapinta Codexin kuville** (maailmapiirto.js KUVAKORISTEET): nimiötason
rivi `{ luokka: 'kuva', kuva: '<png/svg, läpinäkyvä>', lon, lat, koko: <leveys
ruutupikseleinä z7:llä>, suhde?: <korkeus/leveys>, kierto?: <astetta> }` — generaattori
tarjoilee tiedoston sivulle ja esilataa sen, piirto on drawImage keskipisteen ympäri
kierrettynä; koko skaalautuu tasoittain (KUVAN_KOKOKERROIN z4 0,3 … z8 1,45).
Luettelon metadataan kirjautuu `luokka: 'kuva'`, tiedostonimi ja kierto. Kuvat
pudotetaan paikoilleen nimistötiedostoon ilman koodimuutosta.

## Vedos (omistajan tilaus 20.9. ilta, ei polttoa)

Kaappaukset `saapuminen-vedos.webp`, `biskaja-vedos.webp`, `lion-vedos.webp`,
`pariisi-vedos.webp` (Pariisi lähizoomi z8). Data: `nimiot-vedos.json` (nimistö +
Codexin koristeet), `nostotasot-vedos.json` (lajin → Codexin tyyppimerkki).

- **Nostot kolmeen tasoon**: Sisältökirjurin `taso`-kenttä (sisalto-nostotasot-fra
  e161176c, mergetty) kulkee keraaNostot → merkki → generaattori
  (`--nostotasot <json>` on väliaikainen ohitus/kuvakartta). Taso 1 = symboli ja nimiö
  1,5× + Codexin tyyppimerkki (assets/koristeet/nostotyypit/, 11 kpl) symbolin päällä;
  taso 3 vain z7+ (peite ja piirto). Vedoksessa 6 ykköstasoa (Mont-Saint-Michel,
  Mont Blanc, Chambord, Pont du Gard, Carcassonne, Lascaux); Étretat on hahmotelma
  (`--ilman-hahmotelmia` pudottaa) ja Versailles'n peilisali tulee maalehtinostojen
  polkua, jossa `taso` ei vielä kulje — Sisältökirjuri/Pelikoodari.
- **HUOM. kohdemaan nostot ovat pelissä ELÄVIÄ** (v1983 KOHDEMAAN_NIMIOT_ELAVINA):
  poltettu FRA-nostotaso ei näy Ranskassa pelattaessa, vain muista maista katsottuna.
  Vedos on kaapattu kytkin pois (vain kaappauksen ajaksi), jotta poltettu ilme näkyy.
  Tasot (isompi nimiö + kuvamerkki) on toteutettava myös elävään kerrokseen
  (Pelikoodari) samasta `taso`-kentästä ja samoista kuvista.
- **Horation reitti 1873**: nimiötason luokka `reitti` (pisteet [lon,lat], katkoviiva,
  kursiivinimi keskijanan viereen), Calais–Amiens–Pariisi–Dijon–Chalon–Lyon–Valence–
  Avignon–Marseille (PLM-rata, ei kaanonia).
- **Codexin merikoristeet** (assets/koristeet/meri/): kompassiruusu-32 Lioninlahdella
  (220 px z7), kompassiruusu-8 Biskajalla, fregatti/kuunari/höyry/kalastusvene 6 kpl.
  Koe 3:n korjaukset: Kanaalin vene siirretty pois Picardien nimiön alta; Picardie
  väistää Amiensin nostoa (väistöaskelia 17).

## Tarkka rantaviiva GSHHG full — koelaatta Gironde/Arcachon (21.9.2026)

Omistajan kysymys: *valtionrajat ovat jo tarkkoja — onko toinen viiva meren
raja, joka ei ole yhtä tarkka, ja tuleeko kaksoisviiva siitä?* Vastaus: **kyllä.**
Pallolla kehä (maan korostus) tulee `assets/data/maapolygonit.json`ista
(ne_10m_admin_0, kärjet naulattu ne_10m_oceaniin), rantaviiva vektorisoluista
(ne_10m_ocean) ja meren täyttö laatoista (sama ne_10m_ocean). Kaksi aineistoa
eroavat 0,1–4 km, ja ajonaikainen naulaus (pallovektorit.js, tuntuma 0,015°)
peittää eron vain siellä, missä se on alle 1,7 km. Kun rantaviiva tarkentuu,
ero kasvaa — ensimmäinen koekaappaus GSHHG-laatoilla ja -vektoreilla mutta
vanhalla kehällä näytti 35 kehän omaa janaa (227 km) toisena viivana rannan
vieressä.

**Ratkaisu: yksi lähde kaikille kolmelle.** `tools/gshhs-meri.mjs` kirjoittaa
GSHHG 2.3.7 full -rantaviivan (LGPL, 9,3 M pistettä; taso 1 maa, taso 6
Etelämantereen pohjautumisviiva kuten NE:ssä, Kaspianmeri tasolta 2)
`ne_10m_ocean.geojson`-muotoon omaan aineistokansioon (`~/pyramidi-poltto/
gshhs-data`, `lahde.json` kertoo lähteen ja sha256:n). Parillisuusmaski 0,1°:n
hilalla NE:tä vasten: ero 0,23 % soluista (kaikki rannoilla; jäähyllyillä
tasolla 5 olisi ollut 1,15 %). Lukijoita ei muutettu: poltto (`--data`),
vektorisolut (`tee-pallovektorit --harvennus`) ja kehä (`generoi-maapolygonit
--meri=`) lukevat saman tiedoston. Harvennus MOLEMMISSA 0,004° (NE 0,006°).
Kehä: kärki luokitellaan rannalla olevaksi NE:llä (0,015°) ja siirretään GSHHG:n
lähimmälle janalle (haku 0,06°); ompelu kulkee GSHHG-renkailla; NE:n mukaan
vedessä mutta GSHHG:n mukaan maalla oleva kärki (Gironden suiston pää) pudotetaan.
maapolygonit.json 1,4 → 2,7 Mt (gz 498 → 889 kt), pisteitä 240 k → 497 k.
Vektorisolut: tasolta 0 pudotetaan toleranssia pienemmät renkaat (779 → 130 kt gz).

**Koelaatta** (pohja z7–z8 alue −1,7..−0,3 E, 44,3..45,9 N, koe3-resepti; 2000 ×
1200, korkeus 0,03/0,02): `gironde-rantaviiva-{ennen,jalkeen}.webp`,
`arcachon-rantaviiva-{ennen,jalkeen}.webp`. Luminanssiprofiili Médocin rannan
poikki (rivi 780, ±4): ENNEN yksi tumma viiva (lum 79, 3 px), JÄLKEEN yksi tumma
viiva (79, 4 px) — täytön reuna (meri 217 → maa 231) on molemmissa viivan alla,
ei erillistä ohutta viivaa. Meren puolella jälkeen-kuvassa on koe3-reseptin
tumma rantaviivoitus (6 viivaa, lum 183–206, 10 px välein) — se on hyväksytty
ilme, ei virhe. Kehän omia janoja alueella 35 → 4 (18 km, Gironden suiston pää).

**Polttoskripti** (`tools/polta-paikallisesti.sh`): `--data`, `--yhteisliput`,
`--pohjaliput`, `--viivaliput`, `--rantaliput`, `--nostoliput`, `--nimioversio
--nimiot` (nimiöshardi z4–z8, luettelon nimiotaso shardin pyramidi.jsonista),
`--ilman-nostoja/--ilman-nimioita` (kaksivaiheinen ajo samalla tunnuksella);
pallon sarja täydessä poltossa luetaan tämän ajon luettelosta ja levyn
shardeista (ei ämpärin vanhasta luettelosta); luettelo viedään vasta pallon
sarjan jälkeen ja `--ei-luettelovientia` toimii (lippu oli ennen kuollut).

## Täysi poltto 21.9.2026 (omistajan hyväksymä vedos + GSHHG-rantaviiva)

Versiot: pohja `2026-09-21-pohja` (joet pohjassa, koe3-meriresepti, ilman
rantaviivaa, GSHHG 0,004°), viivat `2026-09-21-viivat` (--eipiirit --eijoet),
ranta `2026-09-21-ranta`, nostot `2026-09-21-nostot` (maittain, 112 maata,
tasot: Versailles'n peilisali, Étretat `--polta-hahmotelmat`, Mont Blanc ym.
ykköstasolla; kuvamerkin alla paperinvaalea sädekehä), nimiöt
`2026-09-21d-nimiot` (69 nimiötä + Codexin koristeet; Horation reitti pois;
laivat vedessä; koristeetkin väistävät nimiä; z ≤ 5: joet eivät ole esteitä ja
vain palavat nostot ovat; ilman vapaata paikkaa nimi jää pois tasolta —
z5: 3 pois, z6–z8: 0), pallosarja `pallo/laatat/2026-09-21-pohja-20260921a/`
(viivat mukana, ranta ja nostot eivät), vektorit `pallo/vektorit/2026-09-21-gshhs/`.
Kesto: pohja+viivat+ranta 47 min (117 288 laattaa), nostot+nimiöt+pallo 53 min
(209 850 laattaa yhteensä), kaikki laatat ämpärissä. Luettelo (eheys täsmää)
vientikansiossa `~/pyramidi-poltto/vienti-20260921/pyramidi.json` — EI ämpärissä
ennen kuin osoitin on mainissa. Osoittimet haarassa karttaseppa-gshhs-rantaviiva:
js/pallo.js PALLO_LAATTAVERSIO/PALLO_LAATTATUNNISTE, js/pallovektorit.js
PALLOVEKTORIT_VERSIO, assets/data/maapolygonit.json (GSHHG-kehä).
Kaappaukset `*-poltto-20260921.webp` (saapuminen, Biskaja, Gironde, Alpit) —
peli, ämpärin laatat, paikallinen luettelo. Polttoskriptin opit: lapsishardit
saavat liput ympäristöstä; luettelo saa kerrosliput (--eijoet); nimiöshardi
on versiokohtainen (uusi nimiöversio ei mitätöi muita shardeja).
Seuraava nimiötason uusintapoltto (DEU/ITA/ESP, LAZIO, ei KANTABRIAA) on
oma pieni ajo: `--nimioversio <uusi> --nimiot <json>` samoilla muilla versioilla.

### Nimiötason uusintapoltto 2026-09-21e (omistajan päätös: vain pysyvät nimet)

Nimistö `js/packs/nimisto-1873.js` (Sisältökirjuri, haara sisalto-nimisto-aika
7bd5f5e5 mergetty) suodatettuna `--nimiot-aika pysyva`: 94 pysyvää nimeä
(FRA 24, DEU 15, ITA 14, ESP 12, meret 29) + 8 Codexin koristetta = 102 nimiötä;
27 vuoden 1873 poliittista nimeä (Elsass-Lothringen, Preussin provinssit,
Kastiliat, …) odottaa Vuosi 1873 -linssiä. Väistö z5: 3 pois, z6–z8: 0.
Luettelo vientikansiossa (nimiotaso 2026-09-21e-nimiot), muut versiot ennallaan.
Kaappaukset `{saksa,italia,espanja}-nimiot-20260921e.webp`. Huomiot
Sisältökirjurille: SCHLESWIG-HOLSTEIN latoutuu rannikon päälle (keskipiste
länteen/pohjoiseen merelle → siirrä n. 0,5° itään), WÜRTTEMBERG ja BADEN
ahtaasti z5:llä (väistö hoiti, mutta pieni siirto auttaisi).
