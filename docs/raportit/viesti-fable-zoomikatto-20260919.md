# Opus → Fable: zoomikatto ajaKameran omaksi ehdoksi (PAATOKSET 47 avoin velka, 19.9.2026)

Erä `opus-local-zoomikatto`, Matkakirja Opus local (Mac Studio), 19.44–19.55 Suomen aikaa.
Pohja origin/main (v1962, ec319360).

## Mitattu vika (ennen)

PAATOKSET 47 korjasi nopanheiton ulossovituksen kutsumalla `matkaZoomivapaus(true)`
yhdessä paikassa. Avoin velka oli, että jokainen muu ulossovittava ajo osuu samaan
kattoon. Koe (Chromium 390 px, Pariisi, `ui.kamera().ajaKamera({ Ateena, leveys ×4 })`):

| | korkeus heti ajon jälkeen | korkeus 1,5 s myöhemmin | maxDistance (korkeutena) |
| --- | --- | --- | --- |
| Ennen | 0,82 | **0,205** (puristettu takaisin panoroituun kohtaan) | 0,205 |
| Jälkeen | 0,82 | 0,82 | 0,82 |

## Korjaus

- `js/pallolauta/kamera.js`: `luoPallokamera({ … ajonKatto })`, ja
  `ajaKamera` kutsuu `ajonKatto(maali.altitude)` ENNEN ajoa (myös
  liikeherkkyyden hyppäyksessä ja 0-kestoisessa ajossa, koska kutsu on
  maalin laskennan heti perässä).
- `js/pallolauta/lauta.js` AJON KATTO: `asetaAjonKatto` nostaa katon maalin
  korkeuteen, jos maali on maan uloszoomauskaton (`maanZoomiraja`)
  yläpuolella, ja muuten laskee sen. `tahdistaZoomirajat` käyttää
  `max(maan katto, ajon korkeus)`, mutta vain maan katon päällä; linssin
  syrjäytys voittaa. Katto laskee, kun seuraava ajo pysyy katon sisällä
  (saapumisrajaus `saavu`) tai kun matka palauttaa rajat
  (`matkaZoomirajat(false)`).
- Olemassa olevat `matkaZoomivapaus(true)`-kutsut jäivät paikalleen (ne ovat
  nyt tarpeettomia mutta vaarattomia).

## Vartio (`tools/savukkeet/savuke-noppa-saapumisen-aikana.mjs`, julkaisusarjassa)

- 5. Ulossovittava ajo (Ateena, leveys ×4) pysyy maalissaan 1,5 s:n jälkeen.
- 5b. Saapumisrajaus palauttaa maan katon.

| Ajo | Tulos |
| --- | --- |
| Vastakoe origin/main (Chromium) | 6/7: 5 FAIL (0,233 → 0,058) |
| Korjattu, Chromium + WebKit | 14/14 |
| Korjattu, Chromium (tekstimuutoksen jälkeen) | 7/7 |

Muut: savuke-maailmatila-zoomi 6/6, savuke-laivamatka-tanger 14/14,
`node --test tests/*.test.mjs` pass 3685, fail 0, tarkista-savukkeet kunnossa.

## Jäi

- Tasokartan (`js/kartta.js`) ajoissa ei ole maan kattoa, joten sinne ei tarvittu muutosta.
- Aikajanan ja linssien omat ajot kulkevat linssin syrjäytyksen alla, joten ajon katto ei koske niitä.
