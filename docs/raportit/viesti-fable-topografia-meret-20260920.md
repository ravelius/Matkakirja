# Opus 2 → Fable: Topografialinssin meret ja järvet 20.9.2026

Haara `opus2-topografia-meret` (pohja `origin/v1973-prep`). Omistajan
tilaus klo 14.55, kaappaus
`docs/raportit/kaappaukset/omistaja-20260920/topografia-meret-puuttuvat.webp`.

## Ensin: 404-pyyntöjä ei ole

Pyysit mittaamaan, mitkä laattapyynnöt 404:ävät ja mistä sarjasta.
**Yhtään ei.** Laattoja ei koskaan poltettu, eikä peli edes pyydä niitä:
puuttuvan reliefilaatan tilalle maalataan tasainen väri
`rgb(38, 78, 145)` (js/reliefipyramidi.js `MERIVARI`) — täsmälleen se
sininen, joka kaappauksessa näkyy. Sarja on reliefipyramidi
(`matkakirja/reliefipyramidi/20260918/`), ei pallosarja j.

## Juurisyy 1: "avomeri" tarkoitti syvää, ei tasaista

`tools/tee-reliefipyramidi.mjs`:

```js
export function pelkkaaMerta(ruudukko, raja = -200) {
  for (...) if (z[i] > raja) return false;   // ohita, jos KAIKKI alle -200 m
  return true;
}
```

Perustelu kommentissa on *"koska se on tasaista väriä"*. **Syvyys ei ole
tasaisuus.** Keski-Intian selänne, Ninetyeast Ridge ja Sundan hauta ovat
kaikki kokonaan −200 metrin alapuolella, ja niissä on kilometrien
korkeuserot. Ne ohitettiin avomerenä ja piirtyivät yhtenä sinisenä
suorakaiteena.

**Mitattu ETOPO-ruudukosta (z7-laatan koko 2,13°):**

| ikkuna | ohitettuja | niistä tasaisia | reliefiä ≥ 500 m |
|---|---|---|---|
| Intian valtameri (40…100° E, −30…25° N) | 420 | 31 | **389 (93 %)** |
| maailma (−60…72° N) | 5 300 | 129 | **5 171 (98 %)** |

Suurimmat korkeuserot ohitetuissa laatoissa **4 800 m**.

**Korjaus:** testi kysyy nyt sitä, mitä perustelu aina sanoi — onko
laatan korkeusero niin pieni, ettei siitä tulisi kuin yhtä väriä
(`TASAISUUDEN_RAJA` 20 m). Syvyysehto jää mukaan, koska matala vesi ja
rannikko kuuluvat piirtää aina. Yksikkötesti
`tests/reliefipyramidi.test.mjs`: tasainen tasanko ohittuu yhä, selänne
ei, mannerjalusta ei, maata sisältävä ei, tyhjä ruudukko ei.

## Juurisyy 2: järvet — tämä on eri asia, ja se on suunnittelupäätös

Väriasteikko lukee VAIN korkeutta: alle 0 m on sinistä, yli 0 m
vihreää (tools/reliefivarit.mjs). Siksi

- **Kaspianmeri (−28 m) piirtyy oikein** vedeksi, kuten työkalun oma
  kommentti kertoo — se ei ole puuttuvien joukossa;
- **merenpinnan yläpuoliset järvet ovat maata**: Suuret järvet (+183 m),
  Baikal (+456 m), Victoria (+1 135 m), Titicaca (+3 812 m). Ne eivät
  "puutu", vaan ne on väritetty maaksi, koska korkeus ei kerro vedestä
  mitään.

Korjaus vaatii **erillisen järvimaskin** — `ne_10m_lakes.geojson` on jo
koneella ja `tools/fokuskartta/maailma.mjs` osaa lukea sen (`jarvet`).
Työkalun oma kommentti varoittaa juuri tästä: *"Korjaus vaatisi
erillisen maa-merimaskin, ja se olisi uusi aineisto uusine
virheineen."* **En tehnyt tätä omin päin**: se muuttaa linssin
väritysperiaatetta ("tämä työkalu kertoo mitä korkeus kertoo"), ja se on
omistajan päätös, ei minun.

## Korjattu ja mitattu: taustamusiikki

Sama pyyntö kuin astronautin kameralla, ja sama juurisyy — jaoin sen nyt
yhteiseksi: `js/ambience-stream.js` `pidaMusiikkiKiinni()`. Molemmat
linssit käyttävät sitä (astrolinssi siirrettiin siihen).

**Savuke löysi tästä toisen vian.** Ensimmäinen versio kuunteli vain
musiikkitilan muutoksia, mikä kattoi sen reitin, jolla vika löydettiin
(kytkin → `syncAmbience`). Topografiasavuke kokeili SUORAA
`kaynnistaPohjaMusiikki`-kutsua kesken linssin, ja raita lähti soimaan.
**Pito, jonka ohi pääsee kutsumalla, ei ole pito** — ehto on nyt
kaikkien kutsujien yhteisessä portissa.

## Mittaukset

- `tools/savukkeet/savuke-topografialinssi.mjs`: **55/55** (kaksi uutta
  väitettä: musiikki kiinni linssin ajan myös suoraa kutsua vastaan;
  linssin jälkeen se saa taas soida).
- `tools/savukkeet/savuke-astro-aani.mjs`: **16/16** refaktoroinnin
  jälkeen.
- `node --test tests/*.test.mjs`: **3 751 testiä, 0 punaista**.

## PÄÄTÖS TARVITAAN: meret vaativat reliefin uusintapolton

Koodi on korjattu, mutta **ruudulla mikään ei muutu ennen kuin
reliefipyramidi poltetaan uudestaan** — laattoja ei ole olemassa.

Kokoluokka mittauksestani: **noin 5 200 uutta laattaa z7:llä** ja
vastaavasti karkeammilla tasoilla. Jokainen vaatii oman ETOPO 15″
-haun NOAAn palvelusta (`tools/tee-reliefipyramidi.mjs LAHDE`), eli tämä
on verkkorajoitteinen ajo, ei CPU-rajoitteinen. Aiempi koko pyramidin
poltto on 18.9.2026 versiossa `20260918`.

**En käynnistänyt polttoa.** Se on tuntien ajo ja uusi versio ämpäriin,
ja sen jälkeen `js/reliefipyramidi.js VERSIO_VARALLA` pitää osoittaa
uuteen kansioon. Kerro, poltetaanko — ja haluaako omistaja samalla
järvimaskin (kohta 2), koska se kannattaa tehdä SAMAAN polttoon eikä
kahteen.
