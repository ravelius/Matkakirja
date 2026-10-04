# Linnakirjasto: uudelleenkäytettävät assetit linnoille (Linnanrakentaja 30.9.2026)

Omistaja 30.9.: "hyvä miettiä modulaarista rakennetta myös jatkoa varten … samantyyppisiä tekstuureita muissakin
linnoissa … hyvä tehdä nyt mahdollisimman laadukkaat kirjastot itse." Olavinlinnan laatutyö (laatusuunnitelma
`olavinlinna-laatusuunnitelma-20260930.md`) tehdään alusta asti kirjastoon. Muihin linnoihin ei nyt tehdä
lisätyötä, vaan vain rakenne valmistuu.

## 1. Lajit ja nimet

Tunnus on `<laji>/<id>`, jossa id on pienaakkosin ja väliviivoin, suomeksi. Rakennukset viittaavat vain tunnuksiin.

| Laji | Sisältö (Olavinlinnan ensimmäinen erä lihavoituna) |
|---|---|
| `materiaali/` | PBR, laattaava: **graniittilohkomuuri, liuskekatto, paanukatto, tervattu-puu, lankku, kivilaatta, kallio**, kalkkirappaus, tiili, kuparikatto, rauta |
| `tarra/` | läpinäkyvät päällysteet: **sammal, noki, vesijalki, halkeama** |
| `osa/` | kit-of-parts: ovet, ampuma-aukot, ikkunat, kierreportaat, soihtu + pidike, huonekalut, keittiön, kappelin ja fatabuurin esineet, kavassi, liput |
| `hahmo/` | nykyiset henkilot.js-figuurit + vaatevaihtoehdot |
| `esiasetus/` | valo ja tunnelma: hamara, yo, paiva (taivas, aurinko, sumu, sävytys, bloom) |
| `efekti/` | soihtu, savu, kipinät |
| `vesi/`, `taivas/` | järvi, meri; hämärän taivas (CC0 HDRI) |

## 2. Tiedostot ja laatutasot

- **Lähteet** (ei repoon): `proto-3d/_kirjasto/lahteet/<laji>/<id>/` sellaisenaan ladattuina.
- **Tuotokset**: `proto-3d/_kirjasto/valmiit/<laji>/<id>/`.
  - Materiaali: `<id>_diff`, `<id>_nor_gl` (OpenGL, +Y), `<id>_arm` (R = AO, G = karheus, B = metalli), tarvittaessa
    `<id>_korkeus`. Mestari 4k, jos lähde sen antaa (muuten 2k). Pelissä täysi laatu (A17 Prota uudemmat) 2k tai
    ASTC 4×4, kevennys 1k tai ASTC 6×6. Toisto metreinä manifestissa (`toisto_m`).
  - Tarra: `<id>_diff` + alfa, `<id>_nor_gl`, 2k.
  - Osa: `<id>_huippu.glb` (≤ 20 k kolmiota), `_normaali` (≤ 6 k), `_kevyt` (≤ 1,5 k), materiaalit kirjaston
    tunnuksin (glTF-materiaalin nimi = `materiaali/<id>`), pivot lattiatasolla, metrit, +Y ylös (kuten dioraama).
- **Delighting**: kaikesta poistetaan leivottu valo ja varjo (Poly Havenissa pääosin valmiiksi), ja muutos
  kirjataan manifestiin.

## 3. Manifesti ja vienti

- Repossa `js/dioraama/kirjasto/lahteet.json`: jokaisesta assetista `tunnus, nimi, lahde (URL), tekija, lisenssi
  (vain CC0, CC BY, CC BY-SA, PD), muokkaukset, toisto_m, tiedostot [{ polku, sha256, tavuja }]`. CC BY- ja
  BY-SA-assetit tulevat tekijätietoihin automaattisesti manifestista.
- `js/dioraama/kirjasto/kirjasto.json`: `{ hash, kansio: "kirjasto/<hash>/" }`, laskettu kuten blender.json.
- Vienti `tools/dioraama/vie-kirjasto.sh` (omistaja ajaa, kuten vie-blender.sh): muuttumaton kansio
  `kirjasto/<hash>/` ämpäriin, ja kirjasto.json viimeisenä. Rakennuksen paketti viittaa kirjastoon, eikä assetteja
  kopioida joka rakennukseen. Natiivi välimuistittaa ne kerran.
- Testi valvoo, että jokaisella tiedostolla on manifestirivi, lisenssi on sallittu ja tunnukset ovat yksikäsitteisiä.

## 4. Olavinlinnan järjestys

1. Materiaalit + tarrat (ensimmäinen erä yllä). Kuoren hybridimaski (`kuori-materiaali-2k.png`) vaihtaa kanavat
   kirjaston tunnuksiin: seinä = graniittilohkomuuri, katto = paanukatto tai liuskekatto (tornikohtaisesti), maa =
   kivilaatta, kallio = kallio.
2. Esiasetus `hamara` (tavoitekuvan valaistus), vesi `jarvi`, taivas.
3. Osat huoneittain sitä mukaa, kun hybridi korvaa kuoren heikkoja kohtia (soihtu + pidike ensin).

## 5. Tila 4.10.2026 (erä 2, omistajan linja "nykyinen linna ensin kuntoon", ei uusia malleja)

| Laji | Kirjastossa | Työkalu |
|---|---|---|
| `materiaali/` | 11: graniittilohkomuuri, kalkkirappaus, kallio, kivilaatta, kuparikatto, lankku, liuskekatto, paanukatto, rauta, tervattu-puu, tiili (4 ensimmäistä ASTC:llä Olavinlinnan hybridissä) | `tools/dioraama/blender/kirjasto_valmista.py` |
| `tarra/` | 4: halkeama, noki, sammal, vesijalki | sama |
| `hahmo/` | 11 Olavinlinnan skinnattua hahmoa (`<henkilo>-1500`, Quaternius CC0, omistaja hyväksyi 2.10.): glb + json (leikkeet, kävelysykli) | `tools/dioraama/kirjasto_lisaa.py` (+ `tools/dioraama/blender/hahmo_skin.py`) |
| `taivas/` | hamara (qwantani_dusk_2_puresky), pilvinen (kloofendal_48d_partly_cloudy_puresky), Poly Haven CC0 4k HDR | sama |
| `esiasetus/` | paiva ja hamara: aurinko, taivas, sävytys, tilavalot ja liekkikorkeudet, joilla Olavinlinna leivottiin | sama |
| `osa/`, `efekti/`, `vesi/` | ei vielä (uusia malleja ei tehdä ennen omistajan päätöstä seuraavasta linnasta) | — |

Vienti: `tools/dioraama/vie-kirjasto.sh` (muuttumaton `dioraama/kirjasto/<hash>/`, `js/dioraama/kirjasto/kirjasto.json`
hash, kansio, sisältö ja tiedostot sha256:lla). Olavinlinnan blender-paketti kantaa yhä omat kopionsa neljästä
hybridimateriaalista, joten natiivi ei muutu. Seuraava linna (Allymes, kun omistaja päättää) viittaa kirjastoon tunnuksin.
Testi `tests/dioraama-kirjasto.test.mjs` valvoo lisenssit, tiedostot lajeittain ja että kirjasto.json kattaa manifestin.
