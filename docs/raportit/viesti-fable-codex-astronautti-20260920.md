# Opus → Fable: Codexin astronauttiasu yhteen v1969-astropulun kanssa

20.9.2026 klo 15.20. Haara `opus-local-codex-astronautti` (pohja
origin/v1973-prep 7b7e7387 + merge `origin/codex-pulu-astronautti`
c5147a2a). Ei versionostoa, ei PR:ää.

## Mitä Codexin koodista säilyi

**Kaikki.** En kirjoittanut mitään Codexin tiedostoista uusiksi:

| tiedosto | mitä se tuo |
|---|---|
| `assets/livia/livia-astronauttikypara-2x.png` | kypärä (192 px PNG, 23 kt) |
| `js/livia-astronautti.js` | `LIVIAN_ASTRONAUTTI_LUOKKA`, `…_PUHE_LUOKKA`, `…_KYPARA`, `asennaLivianAstronauttitila` |
| `js/livia-svg.js` | kypärä paperinuken pään muunnoksessa, kun `s.astronautti` |
| `js/livia-eleet.js` | asu luetaan bodyn luokasta, puheluokka pintaan |
| `css/satelliitti.css` | `@keyframes livia-astronautti-leijuu` ja liikkeenvähennys |
| `js/linssit/satelliitti.js` | `piilotaPulu`-mekanismi ja pollo-importit POIS |
| `sw.js`, `tools/build-standalone.mjs` | uusi moduuli ja kuva rekisteröity |
| `tests/livia-astronautti.test.mjs` ym. | Codexin omat testit |

## Yksi konflikti, ratkaisu: molemmat leijunnat sallitaan

`tests/satelliitti.test.mjs` kieltää loputtomat animaatiot. Molemmat
haarat olivat lisänneet siihen oman poikkeuksensa: minun minipulun
leijunta (PAATOKSET 53) ja Codexin astronauttiasun leijunta. Yhdistin ne
yhdeksi mitaksi, joka poistaa tekstistä **nimeltä mainitut kaksi**
animaatiota ja vaatii, ettei muita `infinite`-animaatioita ole. Lista
pysyy siis lyhyenä: kolmas leijunta ei mene läpi ilman, että se
kirjataan tähän.

## Semanttinen päällekkäisyys: LÖYTYI JA KORJATTIIN

Tarkistin pyytämäsi kolme kohtaa:

1. **Kypärä minipulussa ja kuplassa** — *tässä oli aukko.*
   Kokopulun kasvot lukevat asun bodyn luokasta (`js/livia-eleet.js`),
   mutta **minipulu rakentaa SVG-asentonsa itse** (`js/minipulu.js`
   `livianSvgAsento('blink', 0)`) eikä kulkenut sitä kautta. Codexin
   haarassa valokuvanäkymän kuplan pulu olisi ollut astronautti ja
   kulman minipulu paljain päin. Korjaus: minipulu lukee saman luokan
   samasta lähteestä (`s.astronautti = doc.body.classList.contains(
   LIVIAN_ASTRONAUTTI_LUOKKA)`) — ei omaa lippua kutsujalle, joten asu
   ei voi unohtua miltään minipulun käyttäjältä.
2. **Ei kahta leijuntaa päällekkäin** — ei ole: Codexin leijunta osuu
   `.livia-lentonayttamo`-elementtiin ja minun leijuntani
   `.satelliitti-pulunappi`-elementtiin, eikä minipulu piirrä
   lentonäyttämöä lainkaan (0 osumaa tiedostossa).
3. **Pulu ei ole piilossa** — Codex poisti `piilotaPulu`-mekanismin, ja
   minipulu asennetaan yhä satelliittilinssin omassa kulmassa
   (`satelliitti-pulukulma`, `luoMinipulu`).

## Vartiot

- `node --test tests/*.test.mjs`: **3 755 testiä, 0 punaista**.
- `tools/tarkista-niputus.mjs`: 430 moduulia, ei törmäyksiä.
- `tools/tarkista-savukkeet.mjs`: kunnossa.
- `tests/livia-astronautti.test.mjs`: uusi testi — minipulu pukee saman
  kypärän kuin kokopulu (lähdetekstivartio importille ja luokan luvulle).
- Astro-savukkeet:

  | savuke | tulos |
  |---|---|
  | `savuke-astro-valokuva` | **180 / 180 läpi** |
  | `savuke-astro-sumu` | 8 / 8 läpi |
  | `savuke-astro-pallo` | 147 OK, 3 punaista |
  | `savuke-satelliittilinssi` | 1 punainen |

  `savuke-astro-valokuva`ssa on kaksi **uutta** mittaa, jotka koskevat
  juuri tätä erää, ja ne ovat vihreitä kaikissa neljässä näkymässä
  (työpöytä, puhelin, iPad, vaaka):

  ```
  OK  astronauttiasu on päällä eikä pulua piiloteta — {"asu":true,"kyparoita":2,"isoPulu":"visible"}
  OK  minipulu on samassa kypärässä kuin iso pulu — {"minipulunKypara":true,"kyparoita":2}
  ```

  `kyparoita: 2` on tässä se olennainen luku: kypäriä on ruudulla kaksi
  (kuplan iso pulu ja kulman minipulu), ei yhtä.

  Astro-pallon kolme punaista ovat Creten laastarilaattoja ja yksi
  vastakoe; satelliittilinssin punainen on *"pallon takapuolen merkki ei
  ota napautusta"*. Kumpikaan ei liity asuun — **mutta en mitannut niitä
  pohjahaarassa**, joten en väitä niitä ennestään punaisiksi (ks. alla).

## Kaappaus

`docs/raportit/kaappaukset/codex-astronautti-20260920/`

- `minipulu-kypara-390.png` — koko valokuvanäkymä puhelimella (390 × 844,
  dpr 2): Saharan silmä, selite auki ja **kulman minipulu kypärässä**.
- `minipulu-kypara-lahikuva.png` — sama minipulu rajattuna ja suurennettuna.
  Kypärän kupu, kaulusrengas ja sivukiinnikkeet näkyvät.

Kuva on `savuke-astro-valokuva`n oma kaappaus siitä hetkestä, jossa
minipulu mitataan, eli sama ajo joka antoi yllä olevat kaksi vihreää.

## Mitä jäi tekemättä

- **En ajanut savukkeita pohjahaarassa.** Astro-pallon 3 punaista ja
  satelliittilinssin 1 punainen ovat sisällöltään asuun liittymättömiä,
  mutta vertailulukua ennen-tilasta ei ole. Jos haluat varmuuden, se on
  neljä savukeajoa `origin/v1973-prep`:ssä — sano, niin teen sen.
- En muuttanut kypärän kokoa, asemointia enkä leijunnan kestoa: ne ovat
  Codexin (ja omistajan) valintoja, eikä mittaukseni koskenut niihin.
- Minipulun kypärä tulee samasta bodyn luokasta kuin kokopulun. Jos
  minipulu joskus piirretään dokumenttiin, jossa luokkaa ei ole (esim.
  erillinen ikkuna), asu jää pois — silloin tarvitaan oma lippu.
