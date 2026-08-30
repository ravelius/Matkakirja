# Viesti Fablelle — laattapyramidin pilotti (30.8.2026)

Haara `claude/pyramidi-pilotti`. **Ei versionostoa, ei PR:ää**
(koordinaattorin ohje). Oletuspolku ei muutu.

Täysi suunnitelma ja kaikki mittaukset: **docs/moduulit/laattapyramidi.md**.
Tämä on tiivistelmä + päätöskysymykset.

---

## 1. YKSI ASIA VAATII SINULTA TOIMEN HETI

**`tests/dokumentit.test.mjs` on PUNAINEN** — ja se on odotettu.
Uusi ohjedokumentti `docs/moduulit/laattapyramidi.md` ei ole Raamatun
dokumenttikartalla, enkä saa kirjoittaa Raamattuun. Lisää kartalle rivi:

```
docs/moduulit/laattapyramidi.md — laattapyramidin mitoitus,
  generointi ja siirtymä: lukitut mitat, mitatut koot ja ajat,
  sauman todistus, parven työnjako.
```

Rivi kuuluu samaan osioon kuin muut `docs/moduulit/`-viittaukset
(js/tyohuone-raamattu.js ~rivi 2371). Sen jälkeen testi on vihreä.

**Portit:**

| portti | tulos |
| --- | --- |
| `node --test tests/*.test.mjs` | **1047 pass / 1 fail** — vain yllä oleva karttarivi |
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/tarkista-niputus.mjs` | 293 moduulia, ei törmäyksiä |
| `savuke-bittikartta` | 25/33 (main-peräinen taso, ei muutosta) |
| `savuke-fokuskartta` | 66/80 (main-peräinen 65/80 — yksi parempi) |
| `savuke-karttazoom` | 5 kaatunutta kohtaa (main-peräinen taso) |
| **`savuke-laattapyramidi` (uusi)** | **13/13** |

---

## 2. Tärkein tulos: pyramidi on 4–5 kertaa pienempi kuin arvioitiin

Omistajan lukituksessa arvioitiin ~690 Mt ja ~20 500 laattaa.
**Laattamäärä osui tarkalleen (20 634), mutta koko ei.**

| | arvio | **mitattu / johdettu mitatusta** |
| --- | --- | --- |
| Laattoja | ~20 500 | **20 634** ✓ |
| Levytila | ~690 Mt | **122–166 Mt** |
| Täysajo yhdellä säikeellä | — | **1,13 h** |

Perusta on mitattu eikä arvattu: **koko maailma tasoilta z0–z5
(1 345 laattaa) on 13,86 Mt**, ajettuna 254 s. Syvät tasot skaalautuvat
siitä mitatulla pakkaussuhteella, joka **paranee** tason mukana (0,126 →
0,036 tavua/px), koska syvemmällä sama pikselimäärä kattaa pienemmän
maa-alan.

z6 ja z7 on lisäksi mitattu suoraan Kreikan alueelta (0,044 ja 0,027
tavua/px) — se on maapainotteinen eli yläraja.

**Seuraus parvelle: parvi voi olla pieni.** Viisi agenttia riittää noin
20 minuuttiin (yksi tekee z0–z6, neljä jakaa z7:n pituuskaistoiksi).
Kymmenen agenttia olisi tässä kokoluokassa pelkkää käynnistyskustannusta.
Kaistarajat kannattaa panna lohkorajoille (sarake jaollinen neljällä):
alueajossa lohko hukkaa reunoilla työtä (Kreikan ajossa 65 %, koko
maailman ajossa 0 %).

## 3. Lukitut mitat toteutettu sellaisenaan — ja todennettu

Kaikki lukitut luvut menivät työkaluun vakioina ja täsmäävät:
arkki 76 °N…76 °S = 6422,99 yksikköä ✓, 7,2 px/yksikkö = 240 px/aste
= 4 px/kaariminuutti ✓, syvin taso 86 400 × 46 246 ✓, 169 × 91 = 15 379
laattaa ✓, 8 tasoa 675 → 86 400 ✓, korkeusdata 3 kaariminuuttia ✓.

Kameran zoomiportaikkoon **ei koskettu**. Asiakas valitsee lähimmän
laattatason logaritmisesti → skaalaus enintään 1,41×, kuten lukittiin.

## 4. Harva pyramidi: mitattu, ja suosittelen jättämään tekemättä

Oletus oli, että umpimeren karsinta puolittaa pyramidin. **Ei puolita.**

| `--harva-raja` | z7 laatoista pois |
| --- | --- |
| 2 (varovainen) | 10,4 % |
| 4 | 22,0 % |
| 8 | 33,1 % |
| 16 (sävy heittää jo 6 %) | 39,8 % |

Ja **tavusäästö on noin puolet laattasäästöstä** — mitattu z5:n oikeista
tiedostokoista: 6,2 % laatoista = 3,4 % tavuista. Syy on ilmeinen
jälkikäteen: karsittavat laatat ovat juuri ne, jotka pakkautuvat
parhaiten. Realistinen säästö on siis **~12 % kokonaisuudesta**, joka
on 122–166 Mt.

Kolme syytä olla tekemättä:

1. Säästö on pieni, ja kokonaisuus mahtuu R2:een moninkertaisesti.
2. **Karsitulta laatalta katoaa paperin rae.** Syvimmällä tasolla
   rakeen solu on parikymmentä pikseliä — tasainen laatta rakeisten
   naapureiden vieressä EROTTUU, eikä peli voi syntetisoida rakeen
   tilalle mitään, koska suodattimet on kartan kerroksilla kielletty
   (iOS-sääntö, tests/rules.test.mjs).
3. Se tuo pysyvän monimutkaisuuden asiaan, joka ei ole ongelma.

Koneisto on silti rakennettu ja mitattavissa (`--harva`,
`--harvamittaus`), oletuksena pois. **Jos karsinta silti halutaan**,
halvin lisäsäästö on antaa pelin piirtää asteverkko itse: se on 21 %
z7:n laatoista, ja verkko on 20 asteen välein vedettyjä suoria.

## 5. Korkeusasteikko: tehty, ja se näkyy

Lisätty 4200 / 5500 / 7000 / 8850 m (annetuilla väreillä). Portaat
2900 ja alle **eivät muuttuneet**, joten nykyiset lehdet renderöityvät
pikselintarkasti samoin.

Kuvapari on ajettu: Tiibetin ylänkö oli ennen yhtä tasaista ruskeaa
läiskää, nyt ylänkö erottuu ja Himalajan rintama piirtyy; z7:llä
Everestin ympäristössä korkeimmat huiput saavat harmaan ja lumen
vaalean. Kuvat kontin scratchpadissa (`himalaja-ennen/`,
`himalaja-jalkeen/`, `everest/`) — en voi liittää niitä tähän, joten
ne on katsottava sieltä tai ajettava uudestaan komennolla
`--tasot 5 --alue 78,25,96,38`.

## 6. Pelissä, lipun takana — mitattu selaimessa

`?pyramidi=1`. Lippu pois = oletuspolku ennallaan (savukkeen väite P1).

iPhone-profiili 390 × 844 dpr 3, kolme zoomiporrasta Ateenaan,
syvin taso z7:

```
laattoja näkymässä       25
purettu muisti           26,2 Mt
epäonnistuneita hakuja   0
näkyvän palan päivitys   0,1 ms
kehysaika panoroinnissa  p50 16,7 ms · p95 37,9 ms
```

**Muisti laskee, ei nouse:** 26 Mt on samaa luokkaa kuin yksi nykyinen
yleislehti puhelimessa (18 Mt), mutta nyt kartalla ei ole sen lisäksi
neljää maalehteä. Päivityksen 0,1 ms vertautuu vanhan järjestelmän
140–677 ms:iin samassa kohdassa.

**Kehysaika on EMULAATTORILUKU** — Raamattu vaatii oikean iOS-laitteen,
ja se on omistajan tehtävä.

## 7. Sauma: todistettu, yhdellä rehellisellä varauksella

`--saumatesti` piirtää saman alueen kerran isona kuvana ja kerran
laattoina ja vertaa raakoja pikseleitä.

- **Ero on tasan 0** kaikkialla, missä kuva on pikselisilmukan tulosta
  (paperi, rae, meri, hypsometria, varjostus). Kohinan, mittakaavan ja
  kehyksen laskenta on siis **todistetusti jatkuvaa laattojen yli** —
  se oli koko arkkitehtuurin suurin riski.
- Ero on 0,04–0,10 % kanavista siellä, missä on **vektoreita**
  (rannikko, järvet, asteverkko), enimmillään 32/255 hiusviivan
  reunapehmennyksessä. Syy on selaimen viivanpiirrossa eikä kartan
  kaavoissa: siirsin vektorikoordinaatit laskettavaksi arkin origosta
  (kokonaisluku-`translate`), ja ero pieneni vain 8 % — mikä sulkee
  kaavat pois. Silmälle näkymätön, eikä muodosta ruudukkoa.

**Ja moottorin muutos on todistettu oletuspolulla no-opiksi:**
`tee-yleislehti --leveys 1600` antaa ennen ja jälkeen saman md5:n
(`d5820ebf8548ebbe75e4f8242617e467`). Yleislehti ja maalehdet ajavat
samaa moottoria, eikä pyramidi saanut muuttaa niistä pikseliäkään.

---

## 8. PÄÄTÖSKYSYMYKSET OMISTAJALLE

**1. Arkin leveyspiirit: 76 °N vai 84 °N?** *(Tämä on tärkein.)*
Lukittu arkki on 76 °N…76 °S. Mutta omistaja pyysi 29.8.2026
nimenomaan lisää tilaa ylös ja alas (*"alhaalta ja varsinkin ylhäältä
leikkautuu liikaa karttaa pois"*), ja yleislehti tekee siksi
84 °N…66 °S. **Lukittu 76 °N leikkaa Grönlannin pohjoiskärjen (83,7 °N)
ja Huippuvuoret (80,8 °N) jälleen pois.** Epäilen, että tämä on
vahinko lukituksessa eikä tarkoitus. Laajennus maksaa +13,8 % arkin
korkeutta ≈ **+2 100 laattaa ja +17 Mt** — halpaa, jos se on toivottu.
Toteutin lukitun 76 °N:n enkä ruvennut korjaamaan omin päin.

**2. Atlaskehykselle ei ole tässä arkissa tilaa.** Kartussi, mittajana,
painajanrivi ja kermainen paperimarginaali vaativat marginaalin
kartta-alan ULKOPUOLELLE; lukittu arkki on tasan kartta-ala. Raamattu
vaatii kehyksen uloimmalle tasolle. Vaihtoehdot: (a) korkeampi arkki —
kysymys 1 hoitaisi tämänkin, (b) pelin piirtämä ohut kehyskerros.
Pilotissa kehys on pois päältä, jotta lukitut laattaluvut pitävät.
*(Sivuhuomio: `JÄÄMERI`-nimiö on 80,5 °N eli nykyisen arkin
ulkopuolella — se jää piirtymättä.)*

**3. Harva pyramidi: suosittelen jättämään tekemättä** (luku 4).

**4. Kaupungit, reittipisteet ja kohteet laattoihin — ennen
täysgenerointia.** Raamattu vaatii, että kaikki pysyvä poltetaan
laattoihin. Tässä erässä laatoissa on topografia, meri, rannikko,
järvet, asteverkko ja valtamerten nimet. Jos nimet ja kaupungit
siirretään tähän moottoriin vasta täysajon jälkeen, **pyramidi ajetaan
kahdesti**. Suositus: tehdään se ensin.

**5. webp-laatu 0,82** (yleislehti käyttää 0,9). Ero ~30 % tavuja.
Omistajan silmä ratkaisee laitteella — ja koska koko on nyt 122–166 Mt
eikä 690 Mt, 0,9 on hyvin varaa.

---

## 9. Missä laatat ovat

**Eivät repossa** (kuten eivät lehdetkään). Kontin scratchpadissa:

```
.../45778e0e-86f1-581e-8dc6-a742e351ca7e/scratchpad/
  pilotti/       z0-z5 koko maailma + z6-z7 Kreikka — 18 Mt / 1 412 laattaa
  taysi/         z0-z5 ilman harvaa (vertailuluku)
  korkeus/       ETOPO-maailmanruudukko (104 Mt) — ÄLÄ POISTA
  nedata/        Natural Earth ne_10m_ocean + ne_10m_lakes (15 Mt)
  himalaja-*/, everest/   korkeusasteikon kuvaparit
```

Kontti voi kiertää. Aineiston uudelleenhaku kestää ~50 s
(`hae-korkeusruudukko.mjs` + kaksi curlia GitHubista), joten mitään ei
ole peruuttamattomasti menossa.

## 10. Sivussa havaittua (en korjannut — kulukuuri)

- `savuke-karttazoom.mjs` on `tools/`-juuressa, ei `tools/savukkeet/`.
  Siirtodokumentti viittaa siihen savukkeena.
- `tools/hero-tyolista-*.mjs` — 25 kertaluontoista ajotiedostoa
  `tools/`-juuressa; arkistointi selkeyttäisi kansiota.
