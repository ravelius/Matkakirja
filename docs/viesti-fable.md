# Viesti Fablelle — laattapyramidi, erä 3 (30.8.2026)

Haara `claude/pyramidi-pilotti`. Ei versionostoa, ei PR:ää.
Oletuspolku ei muutu. **Portit: 1048 pass / 0 fail,
savuke-laattapyramidi 13/13.**

Kohdat 1 (patinapassi) ja 2 (nimiöiden törmäyksenvälttely) tehty ja
mitattu. **Pysähdyn tähän** — täysgenerointia ei ole ajettu.

Täysi suunnitelma ja kaikki luvut: **docs/moduulit/laattapyramidi.md**.

---

## YKSI ASIA VAATII PÄÄTÖSTÄ ENNEN TÄYSAJOA

**Täysi resepti on laattamittakaavassa rikki, ja se on nähtävä.**

Ajoin pyytämäsi VERTAILUPALAN (Peloponnesos) syvimmällä tasolla
molemmilla resepteillä. Tulos:

| resepti | jälki z7:llä |
| --- | --- |
| `keskitaso` | siisti, mutta ilman tyyliohjeen kolmea passia |
| **`taysi`** | **koko mantere sateenkaaren värisinä läiskinä, rantaviiva usvassa** |

Syy on mittakaava, ei arvo. Kohdistusheitto ja leviäminen skaalautuvat
`s`:llä eli ovat saman kokoisia KARTALLA joka tasolla:

| | 6400 px arkki | z6 | z7 |
| --- | --- | --- | --- |
| kohdistusheitto | 2,6 px | 18 px | **35 px** |
| musteen leviäminen | 2 px | 14 px | **27 px** |

35 pikselin väriseparaatio ei ole "hienoinen kohdistusheitto" vaan
painovirhe. Tyyliohjeen sana *"varovasti"* osuu tähän täsmälleen.

**Ehdotukseni:** kohdistus ja leviäminen ovat PAINOJÄLJEN
ominaisuuksia, eivät kartan — samalla perusteella kuin nimiöt, jotka jo
mitoitetaan laitepikseleinä. Käytännössä `* s` pois kolmesta
kohdistusrivistä ja leviämisen säteestä (tools/patina.mjs).
**6400 pikselin lehdille se ei muuta mitään**, koska niillä `s` = 1 —
eli vanha lehtiputki on koskematon.

Kokeilin sen ja kuvasin: jälki on `keskitason` kaltainen mutta täyden
reseptin rosoisuudella, eli juuri se mitä tyyliohje pyytää. **En
muuttanut sitä** — resepti on omistajan päätös, ja käskit kertoa enkä
säätää. Työkalu varoittaa nyt ajossa, ettei parvi aja tätä
huomaamatta.

Kuvat kontin scratchpadissa: `vertailu-keskitaso/`, `vertailu-taysi/`,
`vertailu-ehdotus/` (kaikki z7/92/41.webp).

**Tämä kannattaa ratkaista ennen täysajoa**, koska syvät tasot ovat
94 % sekä työstä että tavuista.

## 1. Patinapassi pyramidiin — tehty

`tools/patina.mjs` on nyt **sekä työkalu että moduuli**
(`AJETAAN_SUORAAN`-vartio). Pyramidi ajaa SAMAN reseptin samasta
tiedostosta — ei kopiota, joten tiedoston oma sääntö "resepti on
yhdessä paikassa" pysyy voimassa. Lisätty kolme valinnaista
parametria (`koko`, `pikselit`, `palauta`), joita ilman passi
käyttäytyy sanasta sanaan kuten ennen. Lehtityökalu todennettu
toimivaksi muutosten jälkeen.

### Mikä meni laattoihin ja mikä ei

Laattoihin: sävyt ja sävykäyrä, paperin syy/rae/klimppi (faasi
arkista), ikääntymislaikku (mittakaava laudalta), meren litistys,
reunakertymä, rosoisuus, kohdistus, leviäminen.

**Ei laattoihin:**

- **vinjetointi** — säteittäinen termi on kehys, ja vieretysten
  ladottuna kehyksistä tulee ruudukko meren päälle. Kuuluu pelin
  pelitilakerrokseen ruutuavaruudessa, kuten kirjoitit. Oli jo
  `null` kaikilla tasoilla; en koskenut.
- **taitejäljet** — `taitteet: false`, kuten ohjeistit.
- **vesiviivoitus** — omistajan päätös, pysyy poissa.
- `IKAANTYMINEN.reunapaino` pysyy nollassa; en palauttanut sitä
  täyden reseptin mukana.

### Jatkuvuus — ja vika, jonka vain mittaus löysi

Lohko piirretään **reunuksen verran isompana** ja laatat leikataan sen
sisältä. Reunus johdetaan tason mittakaavasta (`8·ceil((9s+16)/8)`):
kiinteä 64 px olisi jäänyt syvimmällä tasolla rantavyön (95 px) alle,
eli olisin tehnyt juuri sen virheen jota reunus estää.

**Patinan pikselikohtainen rae ja dither luettiin lehden omasta
pikselistä.** Lehdelle se oli oikein — naapurilehti on eri paperi —
mutta laatoissa se antoi JOKAISELLE laatalle täsmälleen saman
kohinakentän: rakenteeton kohina muuttuu rakenteeksi, kun se toistuu
512 pikselin ruudukossa. Mitattuna **52 % kanavista erosi**. Nyt avain
on arkin pikseli.

### Saumatodistus — kaksi koetta, joista vain toinen kertoo tuotannosta

| koe | tulos |
| --- | --- |
| `--saumatesti` (1024 px kangas vs. neljä 512 px kangasta) | z3 pahin 97, muut ≤ 19 |
| **lohkoraja (kaksi vierellistä samankokoista lohkoa)** | **z0–z2 ja z6–z7 pahin 0 · z3–z4 pahin 3 · z5 pahin 18** |

Ensimmäinen on ankarampi kuin tuotanto: selaimen rasterointi riippuu
hitusen kankaan KOOSTA. Tuotannossa lohkot ovat samankokoisia ja
eroavat vain kokonaisella pikselimäärällä, mikä on rasteroinnille
täsmällinen siirto. Rakensin siksi toisen kokeen, joka mittaa juuri
tuotannon tilanteen — ja sen mukaan laattojen väliin ei jää saumaa.

## 2. Nimiöiden törmäyksenvälttely — tehty

**Ladonta ajetaan kerran tasoa kohti koko arkille, ei lohkoittain.**
Se on ainoa kohta putkessa jossa piirto ei voi olla paikallinen:
lohkokohtaisena kaksi vierekkäistä lohkoa päätyisi samasta kaupungista
eri tulokseen ja rajalle jäisi kaksoisnimi tai katoava nimi.

Laudan `la/lx/ly` on lähtökohta ja sitä kunnioitetaan aina kun se ei
törmää; muuten neljä vaihtoehtoista paikkaa, ja viimeisenä nimi
pudotetaan. Tärkeysjärjestys: lähtökaupunki > lentokenttä >
reittisolmun aste > koriste. Kaupunkien pisteet varataan ennen nimiä.
Vuoret ja järvet ovat samassa törmäysjoukossa matalammalla
tärkeydellä.

Tarkistus on **riippumaton**: kaikki asetetut nimiöt käydään pareittain
läpi ja lasketaan todelliset leikkaukset; ajo kaatuu jos niitä on.

| taso | nimiötä | pudotettu | päällekkäisyyksiä |
| --- | --- | --- | --- |
| z2 | 62 | 0 | **0** |
| z3 | 297 | 19 | **0** |
| z4 | 344 | 7 | **0** |
| z5 | 350 | 1 | **0** |
| z6–z7 | 351 | 0 | **0** |

Todennettu myös silmällä Keski-Euroopasta ja Benelux–Ruhrista: Berliini,
Praha, Wien, Krakova, Budapest, Venetsia, Sarajevo, Sofia, Bukarest,
Rooma, Firenze, Marseille, Barcelona, Pariisi, Amsterdam — kaikki
luettavina, ei yhtään päällekkäisyyttä.

## Mitatut luvut — ja koko kasvoi merkittävästi

| | mitattu |
| --- | --- |
| z0–z5 koko maailma | **1 513 laattaa, 85,75 Mt, 933 s** |
| z6–z7 Kreikka | 60 laattaa, 3,37 Mt, 124 s |
| Nopeus (lohko 4×4 + patina) | **0,44 Mpx/s** (ilman patinaa 1,17) |
| Koko pyramidi | 23 340 laattaa, **1,16–1,30 Gt** |
| **Täysajo yhdellä säikeellä** | **4,2 h** |
| Viidellä agentilla | **~1 h** |

**Patina on kolme neljäsosaa pyramidin koosta.** Syy on
rakenteellinen: patinan rae ja rosoisuus ovat korkeataajuista kohinaa,
ja kohina on juuri se mitä pakkaus ei voi pakata. Se myös poistaa
aiemman ilmaisen edun — ennen patinaa tavua/px puolittui joka tasolla
(0,307 → 0,061), patinan kanssa se laskee enää 0,92-kertaisesti
(0,307 → 0,220).

Koon kehitys on läpinäkyvä: ~690 Mt (arvio) → 122–166 Mt (mittaus 1)
→ 207–314 Mt (+laatu 0,9, +kehys, +sisältö) → **1,16–1,30 Gt**
(+patina). R2:n 10 Gt riittää, mutta luku ei ole enää merkityksetön.

Selaimessa (syvin taso z7): 25 laattaa näkymässä, 26,2 Mt purettuna,
0 epäonnistunutta hakua, päivitys alle mittaustarkkuuden, kehysaika
p50 16,6 ms (emulaattoriluku).

## Parven työnjako (kun annat luvan)

| agentti | erä | aika |
| --- | --- | --- |
| 1 | z0–z6 kokonaan | 63 min |
| 2–5 | z7 neljänä pituuskaistana (43 saraketta) | 47 min kukin |

Kaistarajat lohkorajoille (sarake jaollinen neljällä).

## Avoimet

1. **Patinan kohdistusheitto ja leviäminen syvillä tasoilla** — yllä.
   Ainoa asia, joka kannattaa ratkaista ennen täysajoa.
2. **Vinjetointi pelitilakerroksessa.** Se ei tule laattoihin, ja
   Raamattu listaa sen pelitilakerrokseen. En tarkistanut onko se
   siellä jo — kirjaan havainnon kuten pyysit, ei tämän erän työ.
3. **Syvyyskäyrät oikeasta datasta** — päätit myöhemmäksi eräksi.

## Virhe, jonka tein ja korjasin

Ajoin `git checkout tools/patina.mjs` palauttaakseni kokeilun ja
pyyhin samalla tunnin verran committaamatonta työtä samasta
tiedostosta. Tein sen uudelleen ja committasin heti. Kirjaan sen tähän,
koska se olisi voinut mennä huomaamatta ohi.

## Laatat

`scratchpad/pilotti3/` — **89 Mt / 1 573 laattaa**, ei repossa.
Vertailukuvat `vertailu-{keskitaso,taysi,ehdotus}/z7/92/41.webp`.

## Sivussa nähtyä (en korjannut)

- `savuke-karttazoom.mjs` on `tools/`-juuressa, ei `tools/savukkeet/`.
- `tools/hero-tyolista-*.mjs` — 25 kertaluontoista ajotiedostoa juuressa.
