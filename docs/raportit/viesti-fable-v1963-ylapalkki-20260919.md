# Opus → Fable: v1963 satelliittilinssin yläpalkkipunainen (19.9.2026)

Erä `opus-local-v1963-ylapalkki`, Matkakirja Opus local (Mac Studio), 20.00–20.17 Suomen aikaa.
Pohja `origin/claude/bold-ride-vow4ki-v1963` (b8627f7e). CI-loki: ajo 35456026598.

## Juurisyy (mitattu): Chromiumin kosketusemulointi katosi kesken näkymän, peli ei ole vika

CI:n kaksi punaista "Sulje linssi palauttaa yläpalkin, pelitilan ja tallennuksen täsmälleen":

| Näkymä | Ennen linssiä | Linssin jälkeen (CI) |
| --- | --- | --- |
| ipad 834 × 1194 | hidden, 61,375 px, väkäsnappi näkyy | **visible, 57,375 px, nappi `display: none`** |
| puhelinvaaka 844 × 390 | hidden, 61,375 px, nappi näkyy | hidden, **57,375 px**, nappi näkyy |

Molemmat jälkitilat ovat täsmälleen se asettelu, jonka CSS antaa, kun
`(pointer: coarse)` EI täsmää:

- `css/styles.css` 10142: `@media (pointer: coarse) { button { min-height: 46px } }`.
  Ilman sitä palkin napit ovat 4 px matalampia, joten palkki on 61,375 px → 57,375 px.
- `css/styles.css` 27017: palkin piilotus ja väkäsnappi ovat lohkossa
  `(max-height: 520px), (pointer: coarse) and (min-width: 700px) and (max-width: 1366px)`.
  Ipadissa vain coarse-haara täsmää. Ilman sitä palkki on näkyvä ja nappi on `display: none`.
  Puhelinvaakassa max-height pitää palkin piilossa, mutta nappien korkeus putoaa silti.

Sivun JavaScript ei voi muuttaa osoitinmediaa, joten muutos tulee selaimen emuloinnista.
Mikään v1963:n CSS-muutos ei myöskään vaikuta kokoon: `@media (hover: hover)` ja
`:active` muuttavat vain taustaväriä.

**Vastakoe**: poistin paikallisesti kosketusemuloinnin CDP:llä
(`Emulation.setTouchEmulationEnabled {enabled:false}`) juuri ennen jälkimittausta.
Tulos toisti CI:n luvut täsmälleen: ipad visible / 57,375 / nappi false ja
puhelinvaaka hidden / 57,375 / nappi true.

**Vuotohypoteesi kumottu**: CI:ssä palkkipunainen osui juuri siihen näkymään, joka
ajettiin takapuolen merkin punaisen jälkeen (tyopoyta → ipad, puhelin → puhelinvaaka).
Paikallisesti pakotin tyopoydän takapuolinapautuksen avaamaan ikkunan. Seuraava ipad
pysyi silti `coarse: true` -tilassa ja vihreänä. Todennäköisin selitys on, että kumpikin
rinnakkainen ajo oli toisessa näkymässään samalla hetkellä ja jokin Macin tapahtuma
(esim. syöttölaitteen muutos) nollasi emuloinnin molemmista selaimista. Tätä ei ole todistettu.
Seuraavassa kontekstissa emulointi asetettiin uudelleen, ja ipadvaaka ja pienivaaka olivat
CI:ssäkin vihreitä.

## Muutos

`tools/savukkeet/savuke-satelliittilinssi.mjs` (vain savuke):

- `palkkiEnnen` ja `jalkeen` mittaavat `karkea` = `matchMedia('(pointer: coarse)').matches`.
- Jos näkymä alkoi coarse-tilassa ja media on linssin sulun jälkeen fine, lokiin tulee
  `tieto`-rivi. Emulointi palautetaan CDP:llä (`konteksti.newCDPSession`), ja palkki
  mitataan palautetussa tilassa. Toinen `tieto`-rivi kertoo tuloksen.
- `palkkiPalasi` vaatii lisäksi `karkea`-arvot samoiksi. Jos palautus ei onnistu, väite
  pysyy punaisena, ja syy näkyy lisätiedoissa.

## Mittaukset

| Ajo | Palkkiväite | Muut |
| --- | --- | --- |
| CI v1963 (35456026598) | ipad ja puhelinvaaka FAIL | takapuolen merkki FAIL tyopoyta, puhelin |
| Vastakoe: emulointi pois, ei palautusta | ipad ja puhelinvaaka FAIL (CI-luvut täsmälleen) | 61/63 |
| Korjattu: emulointi pois, palautus | ipad ja puhelinvaaka OK (`tieto` × 2, coarse palautui true) | 63/63 |
| **Korjattu #isot ja #pienet rinnakkain** | **OK kaikissa kuudessa** (ei `tieto`-riviä) | #isot 96/97, #pienet 94/95; ainoat punaiset ovat takapuolen merkki tyopoyta ja puhelin (Opus 2) |

`node tools/tarkista-savukkeet.mjs`: kunnossa.

## Jäi tekemättä

- Emuloinnin katoamisen laukaisijaa en löytänyt. Jos `tieto  kosketusemulointi katosi`
  alkaa näkyä CI-lokeissa usein, sama suoja voi tarvita muihinkin kosketusnäkymien
  savukkeisiin.
- Takapuolen merkin punainen jäi Opus 2:lle, enkä koskenut siihen.
