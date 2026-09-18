# Kerma heti, meret alkuperäisinä — PAATOKSET 37, erä 1

Opus-agentti 18.9.2026 klo 09.23–10.05 Suomen aikaa.
Haara `claude/bold-ride-vow4ki-kerma-heti` (origin/main v1936 päältä).
Raamattu: KARTTAUUDISTUKSEN PAATOKSET 37 kohdat 1 ja 2.

## 1. Juurisyy: väritaso on vain tasoilla z4…z8

Välkkyminen ei ollut verkon viivettä eikä laatan latausjärjestystä.
Se oli **tasoväli**.

Ämpärin `pyramidi.json` (versio `2026-09-07a`) kertoo, että pohjapyramidi
on tasoilla z0…z8 mutta kohdemaan väritaso vain tasoilla **z4…z8**
(`varitasot.FRA.tasot = [4,5,6,7,8]`, väriversio `2026-09-14b-tasoitus`,
peitto 0,85; sama rakenne kaikilla 27 maalla).

`js/laattapyramidi.js pyramidinKerrostasot(z)` lisää `vari`-kerroksen
vain niille tasoille, joilla väritaso on olemassa. `js/pallolaatat.js`
`luoLaattakerros`in kompositointisilmukka maalasi kerman **vain
`vari`-kerroksen kohdalla** — eli tasoilla z0…z3 se ei maalannut
mitään. Karkea laatta oli koko maailman topografia ilman kermaa.

Panoroitaessa uusi ala tulee ruudulle ensin karkeana tasona ja
tarkentuu vasta kun z4+ saapuu ämpäristä. Juuri siinä hetkessä
poistettu korkeuserokartta välähtää ja katoaa — täsmälleen se, minkä
omistaja näki.

Huom.: kerma ei siis koskaan odottanut *värilaatan kuvaa* (puuttuva
värilaatta maalattiin jo ennen tätä kermaan, `kuva = null`). Se odotti
**väritason olemassaoloa sillä zoomitasolla**.

## 2. Korjaus 1: kerma piirtyy pohjan kanssa samassa vaiheessa

`js/pallolaatat.js`, `luoLaattakerros`:

- kompositoinnin väri-haara on nostettu omaksi funktiokseen
  `piirraKerma(kuva)` (maailmanäkymä, linssin tyhjä kermalaatta ja
  karkea suoja ennallaan);
- `variTasolla = kerrostasot.some((k) => k?.vari)`;
- kun väritasoa **ei ole tällä z:llä**, `piirraKerma(null)` ajetaan heti
  pohjalaatan `drawImage`in jälkeen, samassa kehyksessä, samalla
  kankaalla.

Suoja ja renkaat tietää `pyramidinTasoitus()` ilman yhtään laattaa
(maapolygoneista), joten mitään ei tarvitse odottaa. Värilaatta
täydentää saapuessaan vain suojan sisäosan. Järjestys säilyy: kerma
pohjan päälle mutta rannan, viivan ja noston alle. Ei kiinteitä
odotuksia, ei uutta hakua.

## 3. Mittaus: 0/22 vastaan 2/22 kehystä

Uusi savuke `tools/savukkeet/savuke-kerma-heti.mjs` (390 × 844, dpr 3,
Chromium, tuotannon laatat ämpäristä — ei tarvitse pilottilaatastoa).
Fogg Pariisiin, `saavu({ kesto: 0 })`, lepo (z7, 72/72 laattaa
värillisiä, `variMaa = FRA`), sitten panorointi **400 px = 8,23°
itään 2 sekunnissa** ja kaappaus ~100 ms välein, 22 kehystä.
Mittari on 9 × 9 ruudun kirkkauden keskihajonta σ mittauspisteissä.

Vertailuajo `--vanha` tarjoilee `js/pallolaatat.js`:n muodossa
`git show origin/main:` — sama sivu, sama kamera, sama panorointi,
vain moduuli vaihtuu.

| σ-sarja, kehykset 4…7 | vanha (origin/main) | uusi |
| --- | --- | --- |
| Saksa (8,5 E 47,8 N) | **54,14** · 0,34 · 0,43 · 0,41 | 0,51 · 0,59 · 0,50 · 0,16 |
| Alpit (9,8 E 46,6 N) | — · — · **38,60** · 0,46 | — · — · 0,47 · 0,44 |
| Ranska (2,0 E 47,3 N) | 0,43 · 0,46 · 0,46 · — | 0,44 · 0,51 · 49,32 · — |

**Muun maan reliefi ilman kermaa: vanha 2/22 kehystä, uusi 0/22.**
Piikki osuu molemmilla pisteillä täsmälleen siihen kehykseen, jossa uusi
ala tulee ruudulle (Saksa kehys 4, Alpit kehys 6) — ja uudessa ajossa
samassa kehyksessä, samalla geometrialla, σ on 0,5.

### Mittauksen rajoitteet (kirjattava, ei piilotettava)

1. **σ 54 on suurempi kuin pelkkä reliefikontrasti.** Piikin kehyksessä
   piste on ruudun reunalla, jossa on myös pallon reuna. Ranskan
   piikki 49,32 uudessa ajossa (kehys 6) on sama ilmiö poistuvalla
   pisteellä. Kantava havainto ei siksi ole piikin *suuruus* vaan se,
   että **A ja B eroavat samassa kehyksessä samalla geometrialla**:
   vanhalla piikki on, uudella ei.
2. **σ on dpr 3:lla vaimentunut.** Kaappaus on 1170 px leveä ja yksi
   karttapikseli on noin kolme näyttöpikseliä, joten 9 × 9 ruutu kattaa
   ~8 × 8 karttapikseliä pehmennettynä. Lepotilan σ on siksi kaikkialla
   0,2…0,6 eikä PAATOKSET 37:n raja σ < 5 erottele lepokuvia. Se
   erottelee välähdyksen, ja se oli mitattava asia.
3. **Meripisteitä ei saatu mitattua.** Biskajanlahti (−2,6 E 45,2 N) ja
   Välimeri (6,6 E 42,6 N) ovat z7:llä ruudun ulkopuolella: näkymä on
   vain noin ±4° leveä. Meriväitettä (V4) EI siis ole mitattu; se
   vaatii oman kameran, joka rajaa Biskajanlahden ruutuun.
4. **WebKit-tarkistusta ei ehditty ajaa** (aikakatto). Savukkeessa on
   `--webkit`, ja ajo on yhden komennon päässä.

Kaappaukset: `docs/raportit/kuvat/kerma-heti-20260918/`
(`uusi-levossa.png`, `uusi-panoroinnin-jalkeen.png`,
`vanha-levossa.png`, `vanha-panoroinnin-jalkeen.png`,
`uusi-meret-levossa.png`).

## 4. Korjaus 2: meret alkuperäisinä, kytkimen takana

`?meretNakyviin=1` (`js/pallolaatat.js MERET_NAKYVIIN`, luetaan kerran
moduulin latautuessa). **Oletus on POIS.**

Toteutus on vaihtoehto (b): maamaski luetaan **pohjalaatan pikselistä**
kompositoinnissa, yksi pikselipassi laattaa kohti
(`maalaaKermaMaamaskilla`). Peli ei tunne generaattorin merimaskia,
eikä sitä saa hakea kesken panoroinnin — se olisi juuri se odotus,
jonka kohta 1 kieltää. Pohjalaatta on kuitenkin jo kankaalla.

**Erotin on R − B, ei kirkkaus.** Kirkkaus ei erota matalaa merta
alangosta. Sävykylläisyys erottaa, ja luvut tulevat paletista
(`tools/fokuskartta/piirto.js`):

- `ASTEIKKO` (maa) on lämmin seepia: R − B on merenpinnalla 48,
  500 m:ssä 80, 1400 m:ssä 98;
- `SYVYYS` (meri) on *"viileää paperia"*: ankkureissa R − B 32 → 10, ja
  se sekoitetaan paperiin puolella peitolla (`maailmapiirto.js`
  `MEREN_PEITTO = 0,5`) → meren R − B on 38 (ranta) … 27 (syvin meri).

Raja on **pehmeä eikä kynnys**: kerman peitto on `smoothstep` välillä
R − B = 36…52. Kova kynnys piirtäisi rannikolle sahalaidan juuri siihen,
missä webp:n väripakkaus on sumeimmillaan (PAATOKSET-kommenttien
sahalaitavaroitus). Maaston rae ei häiritse: `pigmentti` ja `lai`
lisätään maailmapiirrossa kaikkiin kolmeen kanavaan samana lukuna,
joten ne katoavat erotuksesta kokonaan. Varjostus taas *kasvattaa*
eroa (sininen vaimennetaan erikseen), joten vuoren varjopuoli ei
luiskahda mereksi.

### Miksi oletus on POIS — ja tämä on mitattu, ei varovaisuutta

Sama savuke ajettiin `--meret`-lipulla (`?meretNakyviin=1`). Panoroinnin
kehyssarja EI ollut puhdas:

```
σ(Alpit)  uusi, maski pois : — — — — — — 0,47 0,44 0,26 0,43 …
σ(Alpit)  uusi, maski PÄÄLLÄ: — — — — — — 26,84 0,36 0,30 0,41 …
```

Alppien piste (9,8 E 46,6 N) sai maskin kanssa yhden kehyksen, jossa
kontrasti on 26,8 — kehyksessä, jossa sama piste ilman maskia on 0,47.
Kyse ei ole reunaylityksestä: kehyksen 6 reunalla on Ranskan piste
(σ 49,2 molemmissa ajoissa), ei Alppien. **Maski siis jätti Alpeilta
alaa kermaamatta.** Todennäköisin syy on juuri alla lueteltu kohta 3
(korkeat, lähes neutraalit sävyt) tai alueen järvet, jotka maski
lukee — oikein — vedeksi, jolloin niiden ympäristön reliefi jää
näkyviin. Tätä ei ehditty erottaa aikakaton sisällä.

Oletus on siksi POIS. PAATOKSET 37 sanoo *"kokeillaan ja omistaja
katsoo"*, ja tehtävänanto asetti oletuksen ehdoksi siistin mittauksen —
tämä mittaus ei ole siisti. Muut tunnetut kompromissit:

1. **Matala meri saa vähän kermaa.** Rannan R − B ≈ 38 osuu rampin
   alapäähän, joten aivan rannikolla peitto on ~0,1 × nimellinen.
   Se on tarkoituksellinen pehmennys, mutta se on nähtävä.
2. **Musteviivat.** Asteverkko ja valtamerten nimet ovat `MUSTE`
   (74,52,33), R − B = 41 → ~0,25 × peitto. Meren päällä oleva teksti
   saa siis hennon kermasävyn.
3. **Lumihuiput yli 5 500 m** ovat paletissa lähes neutraaleja
   (R − B 6…18) eli ne luetaan mereksi. Euroopassa tämä ei osu
   mihinkään (Mont Blanc 4 808 m → R − B ≈ 62), mutta Andeilla ja
   Himalajalla osuu.

Suositus: omistaja katsoo kuvaparin `?meretNakyviin=1` päällä ja pois,
ja oletus käännetään päälle yhden rivin muutoksella
(`MERET_NAKYVIIN`-vakio), jos jälki kelpaa.

## 5. Vaihtoehto (a) suunnitelmana: kerma poltettuna laattaan

Sama lopputulos ilman pikselipassia, mutta vaatii 27 maan väritason
uusinta-ajon: kerma poltetaan laattaan vain maalle, generaattorin oman
merimaskin mukaan (`tools/generoi-laattapyramidi.mjs`, sama maski, jolla
aluevesi jo rajataan). Komento maata kohti — **EI AJETTU**:

```
node tools/generoi-laattapyramidi.mjs <kansio> --tasot 4-8 \
  --vari <ISO> --paletti tasoitus --peitto 0.85 --variversio <pvm>-tasoitus-meret
```

Vertailu:

| | (a) poltettu | (b) pikselipassi (tämä erä) |
| --- | --- | --- |
| Ajonaikainen hinta | ei mitään | yksi pikselipassi / laatta |
| Maski | generaattorin vektoritotuus | pohjalaatan sävystä johdettu |
| Rannan tarkkuus | polygonin tarkkuus | webp:n sumeus, pehmeä ramppi |
| Käyttöön | 27 maan uusinta-ajo Actionsissa + uusi väriversio luetteloon | kytkin päälle |
| Tasot z0…z3 | **ei kata** — väritasoa ei ole niillä | kattaa (kerma on pelin maalaus) |

Viimeinen rivi on ratkaiseva: vaihtoehto (a) yksinään **ei korjaisi
välkkymistä**, koska z0…z3:lla ei ole väritasoa lainkaan. Korjaus 1 on
siis tarpeen kummassakin maailmassa, ja (a) olisi vain (b):n
laatuparannus tasoille z4…z8.

## 6. Testit ja julkaisu

- `node --test tests/*.test.mjs` → 3 595 läpi, 0 kaatunutta, 13 ohitettu.
- `node tools/build-standalone.mjs` ajettu ennen pushia.
- **Vaatii versionoston** — `uusi-versio.mjs` jätetty ajamatta ohjeen
  mukaan. PR:ää ei avattu.

## 7. Mitä jäi aikakaton taakse

1. **Alppien kehys 6 maskin kanssa** (σ 26,8): järvi vai neutraali
   lumisävy? Tämä on ratkaistava ennen kuin oletusta voi kääntää.
2. **Meriväite V4**: oma kamera, joka rajaa Biskajanlahden ja Välimeren
   ruutuun, ja pikselin vertaus pohjan merisävyyn ±8.
3. **Rannikkoprofiili** `?meretNakyviin=1` päällä: sahalaita vai pehmeä
   reuna.
4. WebKit-tarkistus (`--webkit`) — yksi ajo.
5. Savukkeen liittäminen `tools/tarkista-savukkeet.mjs`-sarjaan.
