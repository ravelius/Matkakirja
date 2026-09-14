# Viesti Fablelle — puhelimen saapumisnäkymä sovitetaan korkeuteen (erä 14)

**Opus-työagentti, 14.9.2026.** Haara `claude/bold-ride-vow4ki-korkeus`,
pohjana `claude/bold-ride-vow4ki-karttabugi` (#2452). Toimeksianto:
Raamattu **KARTTAUUDISTUKSEN PÄÄTÖKSET 17** (omistaja) — *kun ruudun
kuvasuhde on kapeampi kuin maan laatikon, saapumisnäkymä sovitetaan
korkeuteen; pelaajan kaupunki keskellä; maan reunat jäävät ruudun
ulkopuolelle ja pelaaja panoroi niihin; panorointiraja pitää laatikon
reunan ruudun ulkopuolella; uloszoomauksen esto pysyy.*

Kaikki luvut on **mitattu** Chromiumilla (`/opt/pw-browsers/chromium`),
Fogg pelin tallenteessa kohdemaan pääkaupungissa, 9 s lepo ja
mittakaavan vakiintumisen odotus (sama mittari kuin erän 13
raportissa). **Kone oli koko työn ajan kuormitettu: load average
43–50**, kymmenkunta rinnakkaista agenttia; se näkyy vain
AIKAmitoissa, ei geometriassa.

---

## 1. Lyhyesti

| | ennen (erä 13, main) | nyt (erä 14) |
|---|---|---|
| 390 × 844, korkeus | 0,4522 | **0,1862** (2,43× lähempänä) |
| tyhjä sitovalla akselilla | X 1,08 % | **Y 3,03 %** |
| tyhjä toisella akselilla | **Y 59,33 %** | X −136 % (ylivuoto on päätös) |
| Pariisi ruudun keskeltä | — | **0,05 %** ruudun leveydestä |
| naapurimaita ruudulla | Britannia, Espanja, Marokko, Alankomaat… | ESP 8,1 %, BEL 4,6 %, GBR 2,0 %, NLD 0,6 % |
| 1400 × 900 | 0,1863 / tyhjä Y 3,01 % | **muuttumaton** (0,1863 / 3,01 %) |

Laattapuolella mittaus **kaatoi oman hypoteesini** (luku 4): dpr 3 ei
nosta laattatasoa kahta porrasta vaan yhden, eikä kokeilemani dpr-katto
muuta valittua tasoa lainkaan — **palautin sen muutoksen ennalleen**.
Väritason laatat kuitenkin paranivat mitattavasti, ja se tulee
kamerasta: 35 s → scenessä 0 laattaa (ennen) muuttui 8 s → scenessä 5.

---

## 2. Kamera: sitova akseli mitataan, ei arvata

`js/pallolauta/kamera.js` sai erässä 13 suljetun kaavan
`pallonKorkeus(bbox, vara)`. Erä 14 jakaa saman kaavan **akseleittain**
(`kehanTarve(..., 'X' | 'Y' | null)`) ja kysyy laatikon keskipisteestä:

* jos **X vaatii kauemmas kuin Y**, laatikko on ruutua leveämpi — eli
  ruudun kuvasuhde on kapeampi kuin laatikon kuvasuhde pallolla, ja
  saapuminen sovitetaan korkeuteen;
* muuten palautetaan null ja **PÄÄTÖKSET 12:n rajaus jää voimaan
  sellaisenaan**. Työpöytä ja vaakatila eivät siis muutu lainkaan —
  se on mitattu, ks. luku 3.

Ehto on täsmälleen sama kuin *"ruudun kuvasuhde < laatikon kuvasuhde
pallolla"*, mutta se ei vaadi erillistä kuvasuhdeluvun laskemista:
sama kaava, jolla korkeus ratkaistaan, kertoo myös kumpi akseli sitoo.

### 2.1 X-keskipiste on pelaajan kaupunki, rajattuna

Keskipisteen leveyspiiri on laatikon keskipiste; pituuspiiri on
**pelaajan kaupunki** (`ui.game.player.pos` → `pixelOf` →
`laudaltaAsteiksi`), rajattuna vyöhykkeeseen

```
[ länsireuna + puoli , itäreuna − puoli ]
```

jossa `puoli` on se pituusaste-etäisyys, jolla laatikon
reunameridiaani asettuu tasan ruudun laitaan. `puoli` ratkaistaan
haarukoimalla samasta suljetusta kaavasta (ehto on u:ssa kasvava koko
käytännön alueella; se kääntyy vasta kun `tan u = 1/(T·A·cos φ₀)`, eli
puhelimella noin 80°).

Koska korkeus riippuu keskipisteestä ja vyöhyke korkeudesta, kiinteä
piste haetaan **kolmella kierroksella** — ei iteratiivisena
approksimaationa vaan kahden suljetun ratkaisun vuorotteluna.

**Tämä ratkaisee samalla PÄÄTÖSJONOssa olleen "painota pelaajan
kaupunkia" -kohdan.** Mitattu Kreikassa (Ateena on maan itäreunan
tuntumassa): kaupunki on ruudulla ja ruudun keskeltä **0,05 %**
sivussa, eikä laatikon reuna tule ruudun sisään.

### 2.2 Uloszoomauksen esto ja panoroinnin X-raja

* `uloszoomausRaja` lukee saman `korkeuteenSovitus`in, joten **uloin
  sallittu näkymä on täsmälleen saapumisnäkymä**. Mitattu jokaisella
  ruudulla: `maxAlt / alt − 1 = 0,0 %`.
* `panoraja` sai **akselikohtaisen X-rajan**: korkeuteen sovitetulla
  ruudulla kertoimen 1,3 vyöhyke päästäisi maan reunan ruudun sisään
  ja sen taakse näkyisi naapurimaita, joten X-raja on se, mikä se
  luonnostaan on — `reunanPuoli` nykyisellä korkeudella. **Luku
  riippuu zoomista**: lähempänä vyöhyke on leveämpi, joten maan
  reunalle pääsee myös sisäzoomilla. Y jää kertoimen 1,3 varaan kuten
  ennen (pystysuunnassa laatikko jo täyttää ruudun).
* Koska raja elää zoomin mukana, `js/pallolauta/lauta.js` ei saa
  muistaa sitä laatikon mukana: raja palauttaa lipun `elava`, ja
  muisti ohitetaan silloin (3 riviä, ei muuta lautaan).

---

## 3. Mittaustaulukko (Chromium, Fogg kohdemaassa)

| Maa | Ruutu | `altitude` | tyhjä X | tyhjä Y | sitova | kaupunki ruudun keskeltä | vieraita maita ruudulla |
|---|---|---|---|---|---|---|---|
| FRA | 390 × 844 dpr 3 | 0,1862 | −126,3 % | **3,03 %** | **Y** | **0,05 %** | 15,9 % |
| FRA | 390 × 844 dpr 1 | 0,1862 | −136,0 % | **3,03 %** | **Y** | **0,05 %** | 15,9 % |
| FRA | 393 × 852 dpr 1 | 0,1862 | −136,5 % | **3,03 %** | **Y** | **0,05 %** | 15,9 % |
| FRA | 844 × 390 (vaaka) | 0,1863 | 48,9 % | 2,91 % | Y | 1,65 % | 36,6 % |
| FRA | 1400 × 900 | 0,1863 | 32,2 % | 3,01 % | Y | 2,19 % | 35,2 % |
| ESP | 390 × 844 | 0,1894 | −118,6 % | **−0,26 %** | Y | 0,05 % | 17,2 % |
| ESP | 1400 × 900 | 0,1894 | 37,1 % | 0,00 % | Y | −5,50 % | 26,2 % |
| ITA | 390 × 844 | 0,2562 | −42,7 % | **1,85 %** | Y | 0,05 % | 21,2 % |
| ITA | 1400 × 900 | 0,2562 | 59,1 % | 1,90 % | Y | −0,21 % | 44,9 % |
| GRC | 390 × 844 | 0,1547 | −73,6 % | **0,79 %** | Y | 0,05 % | **8,8 %** |

*Negatiivinen tyhjä X on PÄÄTÖS eikä vika: laatikko ylivuotaa ruudusta
vaakasuunnassa tarkoituksella.* Vieraiden maiden osuus on mitattu
ruudun 800 näytepisteestä (`toGlobeCoords` → lauta → maapolygonit).

**Työpöytä ja vaakatila ovat muuttumattomat.** 1400 × 900 antaa
täsmälleen erän 13 raportin luvut (FRA 0,1863 / 3,01 %, ESP 0,1894 /
0 %, ITA 0,2562 / 1,90 %) ja `panoraja` palauttaa niillä `elava:
false` eli entisen kertoimen 1,3 vyöhykkeen.

### 3.1 Panorointi ääripäihin (390 × 844, Ranska)

| suunta | keskipisteen raja | maan reuna ruudulla | Bretagne / Elsass |
|---|---|---|---|
| länsi | **−1,218°** | laatikon länsireuna −35,8 px (ruudun ulkopuolella) | **Bretagnen kärki x = 4,8 px → ruudulla** |
| itä | **+5,644°** | laatikon itäreuna +36,1 px (ruudun ulkopuolella) | **Elsass x = 294,9 / 390 → ruudulla** |

Molemmissa ääripäissä laatikon reuna on ruudun **ulkopuolella**, eli
maan ulkopuolista seutua ei tule kuvaan sitä kautta; laatikon reunan
ja maan oman reunan ero on maapaneelin Biskajanlahden laajennus.

### 3.2 Mikä EI parantunut — naapurimaiden osuus

Ruudulla on Ranskassa yhä **15,9 %** vieraiden maiden pinta-alaa (ESP
8,1 %, BEL 4,6 %, GBR 2,0 %, NLD 0,6 %). **Se on geometriaa eikä
korjattavissa rajauksella:** rajaus on suorakaide ja maa ei ole, joten
laatikon nurkat ovat naapurissa. Kaistale on ruudun ala- ja ylälaidassa
(Pyreneiden eteläpuoli ja Belgian raja) eikä enää keskellä kuvaa kuten
ennen. Toimeksiannon tavoite *"≤ 3 %"* ei ole saavutettavissa
suorakaiderajauksella; kirjaan sen rehellisesti mittalukuna.
Vertailuksi: Kreikassa osuus on 8,8 %, Espanjassa 17,2 %.

---

## 4. Laatat dpr 3:lla — HYPOTEESI MITATTIIN JA SE KAATUI

**En jättänyt tähän koodimuutosta, koska mittaus ei tue sitä.** Kirjaan
koko ketjun, jottei kukaan tee samaa hypoteesia uudestaan.

**Hypoteesi.** `js/pallolaatat.js` laskee ruudun tarpeen muodossa
`LEPOKERROS_MITTAMATKA_PX × devicePixelRatio / Δlat`, ja pyramidin
tasojen suhde on 2 — dpr 3 pitäisi siis nostaa laattatasoa log₂ 3 =
1,58 eli kaksi porrasta (z6 → z8) ja nelin–kuusitoistakertaistaa
saapumisnäkymän laattatyö. Kokeilin kattoa
(`Math.min(devicePixelRatio, 2)`) ja tein siitä vastakokeen.

**Vastakoe kaatoi hypoteesin.** Mitattu 390 × 844, Pariisi,
saapumisnäkymä vakiintuneena:

| | dpr 1 | dpr 2 | dpr 3 | dpr 3 **ilman kattoa** |
|---|---|---|---|---|
| valittu taso | **z6** | z7 | **z7** | **z7** |
| laattoja ruudussa | 12 | 35 | 35 | 35 |

Katolla ja ilman sitä valittu taso on **sama z7**. Syy on koodissa jo
ennestään: tason valinta ei koskaan pääse z8:aan, koska
`LAATTAKERROS_LAATTAKATTO_NAKYVA` (48) pudottaa tason karkeammaksi
heti, kun näkyviä laattoja on enemmän — z8:lla niitä olisi noin 140 —
ja `LAATTAKERROS_HYSTEREESI_ALAS` pitää kerroksen jo valitussa
tasossa. **Ero dpr 1:een on siis yksi porras eikä kaksi, ja se yksi
porras on tarkkuusvaatimus eikä vika:** z7 antaa 240 px/astetta, kun
dpr 3:n ruutu tarvitsee 256 (venytys 1,07× — omistajan lukituksen
*"korkeintaan 1,41×"* sisällä). **Palautin `js/pallolaatat.js`:n
ennalleen**: muutos, jonka vastakoe ei saa punaiseksi, on melua.

Luku jää savukkeeseen **INFOna** (ei väitteenä), jotta tason valinnan
muutos näkyisi heti.

### 4.1 Mitä dpr 3:lle sitten tapahtui

Mitattu samassa ajossa, sivun avauksesta, **koneen kuormalla 41–50**:

| | dpr 1 (z6, 12 laattaa) | dpr 3 (z7, 35 laattaa) |
|---|---|---|
| taso valittu | 3,0 s | 2,0 s |
| ensimmäiset valmiit | 8,0 s (6/12, scenessä 3) | 8,0 s (6/35, scenessä 5) |
| kaikki valmiina ja scenessä | **13,0 s** | ei 35 s:n sisällä |

Vertailukohta **ennen tätä erää** (karttabugi-raportti luku 2.1, sama
kone): dpr 3:lla 35 s:n kohdalla valmiita 4/30 ja **scenessä 0** — eli
laattoja ei tullut ruudulle lainkaan. Nyt niitä tulee. **Muutos tulee
kamerasta**, ei laattakoodista: korkeuteen sovitettu saapumisnäkymä on
kapeampi kaista, joten samaa aluetta ei tarvitse kattaa yhtä leveältä.

**Toimeksiannon "≤ 3 s" ei ole tässä kontissa mitattavissa.** Kontin
Chromium piirtää ohjelmistolla (SwiftShader), joten dpr 3 tarkoittaa
1170 × 2532 piirtopuskuria ilman näytönohjainta, ja kone ajoi koko ajan
kymmenkunnan rinnakkaisen agentin kuormaa. Aikamitta kertoisi tämän
koneen kuormasta eikä pelin koodista, enkä siksi pannut sitä
vartioksi. **Jos omistaja haluaa aikavartion, se on mitattava
kuormattomassa kontissa tai oikealla laitteella.**

---

## 5. Portit

| portti | tulos |
|---|---|
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | 387 moduulia, 4221 julistusta, ei törmäyksiä |
| `PLAYWRIGHT_BROWSERS_PATH=… node tools/tarkista-savukkeet.mjs` | 1655 ui-viittausta, 405 metodia, 534 kenttää — kunnossa |
| `node --test` (pallolaatat, maakartuutsi, pallolauta, tasoitustaso) | **pass 69, fail 0** |
| `tools/savukkeet/savuke-era12.mjs` | **15/15 vartiota läpi** |
| `npm test` | **pass 3349, fail 0, skip 13** (kokonaisajo, 120 s) |

Kokonaisajo tehtiin lopullisella koodilla ja se meni läpi kerralla —
myös `tests/pollo.test.mjs`:n aikamittaväitteet, jotka erän 13
raportissa kaatuivat kuormaan. Mittausajot tehtiin kuormitetulla
koneella (load 41–50), testiajo kuorman laskettua.

---

## 6. Savuke ja vastakokeet

`tools/savukkeet/savuke-era12.mjs` sai **väitteet 6 ja 7** sekä
**vastakokeen E**; väitteen 5 mitta muutettiin sietämään
tarkoituksellista X-ylivuotoa (sitova akseli on se, jolla laatikko
mahtuu — jos kumpikaan ei mahdu, väite kaatuu).

```
OK  1. uloszoomaus ei onnistu Ranskassa (390 px ja 1400 px)
OK  2. maapaneeli on meren päällä
OK  3. paneelin koko seuraa kartan mittakaavaa katkotta
OK  4. pääajo ei tuottanut sivuvirheitä
OK  5. saapumisnäkymä rajautuu aivan maan rajojen ulkopuolelle
OK  6. puhelin pystyssä: sitova akseli Y, tyhjä ≤ 3,5 %, kaupunki keskellä
OK  7. panorointi tuo maan reunan ruudulle, laatikon reuna ei tule sisään
OK  VASTAKOE A/B/C/D/E
15/15 vartiota läpi
```

| vastakoe | muutos tarjoiltuun lähdetekstiin | tulos |
|---|---|---|
| A | `ULOSZOOMAUKSEN_KERROIN` → 3 | väite 1 **PUNAINEN** |
| B | `MAAPANEELIN_ANKKURIT` tyhjäksi | väite 2 **PUNAINEN** |
| C | `MAAPANEELIN_SKAALA_MAX` → 3 | väite 3 **PUNAINEN** |
| D | `pallonKorkeus` → null | väite 5 **PUNAINEN** |
| **E** | **`korkeuteenSovitus` → null** | **väite 6 PUNAINEN: sitova X 1,08 %, tyhjä Y 59,33 %** |

**Vastakoe E mittaa erää 14 edeltäneen tilan suoraan**, ja luvut ovat
täsmälleen ne, jotka omistajan kuvakaappaus näytti: pystyyn jää 59,33 %
tyhjää.

Kuvat (390 × 844, Fogg Pariisissa):

* `docs/raportit/kuvat/korkeus-ennen-390.jpg` — ennen (vastakoe E):
  Ranska pieni, ruudulla Lontoo, Amsterdam, Madrid, Barcelona,
  Granada, Tanger ja Fès.
* `docs/raportit/kuvat/korkeus-jalkeen-390.jpg` — nyt: Ranska täyttää
  ruudun pystysuunnassa, Pariisi keskellä.
* `docs/raportit/kuvat/korkeus-jalkeen-390-pano.jpg` — panoroitu
  länsirajalle: Bretagne kokonaan ruudulla.

---

## 7. Muutetut tiedostot

- `js/pallolauta/kamera.js` — `pallonKorkeus` jaettu osiin
  (`kehanAsteet`, `kehanTarve`), uudet `korkeuteenSovitus`,
  `reunanPuoli` ja `pelaajanAsteet`; `kameranKohde`, `uloszoomausRaja`
  ja `panoraja` käyttävät niitä.
- `js/pallolauta/lauta.js` — panorointirajan muisti ohitetaan, kun
  raja on elävä (3 riviä + perustelu).
- `tools/savukkeet/savuke-era12.mjs` — väitteet 6 ja 7, vastakoe E,
  väitteen 5 mitta, dpr-taso INFOna.
- `docs/raportit/viesti-fable-korkeus-20260914.md` (tämä) ja kolme
  kuvaa.

**`js/pallolaatat.js` palautettiin ennalleen** (luku 4).

**Ei Raamattuun, ei versionostoa, ei muutoslokiriviä, ei mergeä, ei
dist-committia, ei muiden agenttien tiedostoihin** (`maapaneeli.js`,
`nimet.js`, fokusvirta, pollo, kaupunkinosto, `tools/generoi-*`).

---

## 8. Avoimet havainnot — KAKSI NÄISTÄ ON OMISTAJAN PÄÄTETTÄVIÄ

1. **MAAPANEELIN KORTTI EI OLE RUUDULLA SAAPUESSA (puhelin pystyssä).**
   Mitattu 390 × 844: kortti on ruudun koordinaateissa
   x −290,5 … −71,2, eli **kokonaan ruudun vasemmalla puolella**.
   Syy on suoraan PÄÄTÖKSET 17:stä: kortti on Biskajanlahdella ja
   pelaajan kaupunki on Pariisi, joten korkeuteen sovitetussa
   näkymässä kortti jää kaistan ulkopuolelle. Pelaaja saa sen esiin
   panoroimalla länteen (kuva `korkeus-jalkeen-390-pano.jpg`), mutta
   **länsirajallakin kortin vasen reuna jää noin 36 px ruudun
   ulkopuolelle**, koska panorointiraja pysäyttää keskipisteen siihen,
   missä laatikon reuna on juuri ja juuri ruudun ulkopuolella.
   **Tämä on omistajan päätettävä**: (a) jätetään näin, (b) kortti
   siirretään puhelimella lähemmäs maata tai ruudun laitaan, tai (c)
   panorointirajaa löysätään lännessä kortin verran. En tehnyt
   valintaa enkä koskenut `maapaneeli.js`:ään (toisen agentin alue,
   PR #2440).
2. **Naapurimaiden osuus ruudulla on 8,8–21,2 %** (luku 3.2).
   Toimeksiannon tavoitetta ≤ 3 % ei voi saavuttaa suorakaiderajauksella,
   koska laatikko on suorakaide ja maa ei. Jos osuus halutaan
   pienemmäksi, rajaus on tehtävä maan RENKAISIIN — oma eränsä ja oma
   päätöksensä.
3. **ESP 390 × 844: tyhjä Y on −0,26 %**, eli maapaneelin kortti
   ylittää ruudun alareunan pari pikseliä. Sama juurisyy kuin erän 13
   raportin avoimessa havainnossa 1 (kortti piirtyy noin `1 / cos φ`
   isompana kuin lautajalanjälkensä, ja Ranskan ulkopuolella ankkuri on
   yhä oletuksessa). Kuuluu `maapaneeli.js`:ään.
4. **Raamatun PÄÄTÖKSET 17 on nyt koodissa**, mutta Raamatun tekstiin en
   koskenut — vain Fable kirjoittaa sinne.
