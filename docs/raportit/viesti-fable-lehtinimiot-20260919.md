# Opus 2 → Fable: lehtien nimiölimitys (erä J; Tanska, Alankomaat, Unkari)

19.9.2026 klo 21.10–21.50 Suomen aikaa. Haara `opus2-lehtinimiot` (pohja
origin/main v1964). Ei versionostoa, ei PR:ää. Lähde: Sonnet 1:n
kierros 12, kuva 06 (Tanska, nimiöt limittäin).

## Mitä laitteella näkyi: sama nosto kahdesti

Päällekkäisyydet eivät olleet kahden eri noston nimiöitä, vaan **saman
noston kaksi kopiota**:
- laattaan poltettu nimiö (kursiivi, harmaa)
- elävä DOM-nimiö samasta nostosta (pysty, tumma), hieman eri
  kohdassa

Tästä syystä `tests/nimiolimitys` pysyi vihreänä: se vertaa poltettuja
keskenään, eikä nosto limity itsensä kanssa.

Mittaus Chromium 390 × 844 dpr 3, saapumisnäkymä, ei panorointia. WebKit
headless ei luo nimiörastereita (blob-kuva jää tyhjäksi), joten mittaus
tehtiin Chromiumilla. iOS:llä rasterit näkyvät.

| Maa | Poltettuja, jotka piirtyivät elävinä (ennen) | Jälkeen (tämä haara) |
|---|---|---|
| DNK Kööpenhamina | 12 (Storebæltin silta, Egeskov, Møns Klint, Kronborg, Skagen, Itämeri, Frederiksborg, Roskilde 1040 …) | **5**, kaikki vanhentuneita (alla) |
| NLD Amsterdam | 16 | **4**, kaikki vanhentuneita |
| HUN Budapest | 8 | **1**, vanhentunut |

Kaappaukset (Sjælland–Fyn):
- `docs/raportit/kaappaukset/lehtinimiot-20260919/dnk-390-ennen.jpg`
- `…/dnk-390-jalkeen.jpg`

## Juurisyy 1 (korjattu): saapumisen ladonta ennen nostotason luetteloa

Kerros kysyy `pallonNostoOnPoltettu`lta, onko nosto laatassa, ja vastaus
tulee kohdemaan nostotason tiivisteistä (`nostotasonPoltetut` →
`variMaaNyt`). Saapumisen ensimmäinen ladonta ajetaan ennen kuin
luettelo on perillä tai kohdemaa asetettu. Silloin **mikään ei ole
poltettu**, ja jokainen poltettu nosto piirtyy elävänä musteen päälle.

Mitattu: Storebæltin silta ja Egeskov olivat saapuessa `poltettu:false`
ja muuttuivat `true`:ksi vasta ensimmäisestä kameran liikkeestä. Lisäksi
levityksen ankkurit tallennettiin siinä vaiheessa, joten myöhempi
ladonta ei väistänyt mustetta.

Korjaus:
- `js/pallolauta/lauta.js`: uusi ladonta, kun `asetaVaritasonMaa`
  vaihtaa maan, ja kun `haePyramidinLuettelo` saapuu. Ladonta on
  idempotentti.
- `js/pallolauta/nostot.js`: kun poltettujen joukko muuttuu ladontojen
  välillä, ankkurivarasto tyhjennetään, jolloin levitys näkee musteen
  esteenä.

Vartiot:
- `tests/nostot-poltettu-ladonta.test.mjs` (lähdekoodi).
- `node --test tests/*.test.mjs`: 3696 / 0.
- Savukkeet: `savuke-pallo-nostolaput` 6/6 ja
  `savuke-ranskan-nostot-lukossa` 27/27.

## Juurisyy 2 (sinun päätöksesi, poltto): vanhentuneet poltot

Hahmotelmanostojen lisääminen muutti maan ladontaa, joten osa
poltetuista sai uuden tiivisteen. Peli piirtää ne elävinä (suunniteltua:
*"laatassa oleva vanhentunut kuva jää sen alle, ja seuraava poltto
korjaa sen"*), ja vanha muste näkyy vieressä. Uusi työkalu
`node tools/tarkista-polton-tuoreus.mjs` listaa ne:

| Maa | Poltettu | Vanhentunut |
|---|---|---|
| DNK | 21 | 6: Møllehøj, Roskilden tuomiokirkko, trelleborg-slagelse, Lindholm Høje, Roskilde 1040, nosto-trelleborg |
| NLD | 21 | 4: Vredespaleis, Van Meegeren, Naundorff, nosto-leeuwenhoek |
| HUN | 21 | 4: Tonava, Aquincum, Budapestin luolat, Pyhän kruunun varkaus |
| IRL | 19 | 4: Shannon, Newgrange ×2, Taran kukkula |
| HRV | 23 | 2: Zagreb, Zrinski–Frankopan |
| SWE | 21 | 1: Götan kanava |

Myös poltetun nimiön **kylki** voi olla vanhentunut, vaikka tiiviste
täsmää. Tiiviste ei sisällä kylkeä. Tanskassa Storebæltin sillan nimiö
on laatassa vasemmalla, mutta pelin nykyinen malli antaa sille kyljen
ylä, joten elävä *Odense* väistää väärää laatikkoa ja osuu musteeseen
(näkyy jälkeen-kuvassa). Uusi poltto korjaa senkin.

**Ehdotus:** polta nostotaso uudelleen DNK:lle, NLD:lle, HUN:lle,
IRL:lle, HRV:lle ja SWE:lle (sekä jatkossa jokaiselle maalle, johon
lisätään hahmotelmia) ja aja `tarkista-polton-tuoreus` polton
porttina.

## Sisältöhavainto

Tanskassa on kaksi eri nostoa samasta paikasta: poltettu
`trelleborg-slagelse` ja `nosto-trelleborg`. Kartalla on siksi kaksi
Trelleborg-nimeä. Päätös sinulle (sisältö): yhdistä tai poista
toinen.

## Muut tiheät lehdet

- **NLD ja HUN** mitattu yllä.
- **BEL:llä** ei ole kaupunkia eikä polttoa (0 poltettua), joten
  kaksoispiirtoa ei ole. Sonnet 1:n havainnon mukaan Bryssel puuttuu
  kartalta, eikä maan lehti aukea.
- **SVN** tehdään, kun maa tulee.
