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

**Varmistusajo lopullisella oletuksella** (maski päällä, kuten se nyt
julkaistaan) ajettiin vielä erikseen: 0/22 kehystä, eikä sarjassa ole
yhtään reunapiikkiä (`σ(Saksa)` 0,22…0,50, `σ(Alpit)` 0,33…0,46,
`σ(Ranska)` 0,30…0,50). Molemmat väitteet läpi.

### WebKit: sama tulos, ja mittari jouduttiin korjaamaan

WebKit ajettiin sekä uudella että vanhalla moduulilla (`--webkit`,
`--webkit --vanha`). Tulos on sama kuin Chromiumilla: **vanhalla
piikki, uudella ei.**

| | Chromium | WebKit |
| --- | --- | --- |
| vanha, suurin piikki | Saksa σ 54,1 = 135 × perustaso | Alpit σ 33,8 = 28 × perustaso |
| uusi, suurin | perustason tasolla | perustason tasolla |
| uusi, V1 | läpi | läpi |

**Mittarin kiinteä raja σ < 5 jouduttiin hylkäämään.** Se osoittautui
näytteenoton tarkkuudesta riippuvaksi, ei kartasta: Chromiumilla
kaappaus on dpr 3 (1170 px) ja lepo-σ 0,2…0,5, WebKitillä dpr 1
(390 px) ja lepo-σ 1,2…6,8. Schwarzwaldin lepo-σ on WebKitillä 6,8
**sekä vanhalla että uudella koodilla** — kerma on paikallaan, mutta
9 × 9 ruutu kattaa kolme kertaa enemmän karttaa eikä sumennus vaimenna
raetta. Kiinteä raja olisi kaatanut WebKit-ajon syyttä.

Mitattava ilmiö on **transientti**: yksi kehys, jossa kontrasti
moninkertaistuu ja palaa. Raja on siksi suhteutettu pisteen omaan
mediaaniin (`σ > max(5, 4 × mediaani)`), ja sama luku kertoo
molemmilla moottoreilla saman asian. Erottelu on jyrkkä: rikkinäiset
kehykset ovat 28…135 × perustaso, ehjät 1,2 ×.

**V2 on rajattu Chromiumiin.** Väite vertaa Ranskan Solognea
(tasainen, ~120 m) Schwarzwaldiin (mäkinen), ja WebKitin dpr 1:llä
mäkisen maaston rae näkyy kerman läpi enemmän kuin tasaisen maan
alkuperäinen topografia — väite kaatuisi maaston muodosta eikä
kermasta. Oikea korjaus on mittauspiste Ranskan mäkiseltä alueelta,
joka ei osu kaupunkiin, rajaan eikä reittiin; sitä ei ehditty valita.
V1 — se väite, jonka takia savuke on olemassa — ajetaan molemmilla.

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
3. **Meriväitettä V4 ei saatu mitattua pikselinä.** Biskajanlahti ja
   Välimeri ovat z7:llä ruudun ulkopuolella (näkymä on vain noin ±4°
   leveä). Savukkeeseen lisättiin `--merikamera`, joka ajaa kameran
   Biskajanlahden laatikkoon — mutta **Ranskan uloszoomauksen esto**
   (laatikko × 1,15, erä 2) rajaa sen takaisin z7:ään, eikä kohdemaan
   ulkopuolinen meri mahdu ruutuun. Meriväite on siksi todennettu
   KUVAPARISTA (luku 4) eikä pikselivertailusta. Pikselimittaus vaatii
   pelitilan, jossa kohdemaata ei ole, tai eston ohituksen savukkeelle.
4. **V2 ei ole kalibroitu WebKitille** (ks. yllä) ja se ohitetaan
   siellä nimenomaisesti — ei hiljaisesti.

Kaappaukset: `docs/raportit/kuvat/kerma-heti-20260918/`
(`uusi-levossa.png`, `uusi-panoroinnin-jalkeen.png`,
`vanha-levossa.png`, `vanha-panoroinnin-jalkeen.png`,
`uusi-meret-levossa.png`, `uusi-meret-panoroinnin-jalkeen.png`,
`uusi-meret-merikamera.png`).

## 4. Korjaus 2: meret alkuperäisinä, kytkimen takana

`js/pallolaatat.js MERET_NAKYVIIN`, luetaan kerran moduulin
latautuessa. **OLETUS ON PÄÄLLÄ**, ja `?meretNakyviin=0` on pakotie
pois.

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
missä webp:n väripakkaus on sumeimmillaan. Maaston rae ei häiritse:
`pigmentti` ja `lai` lisätään maailmapiirrossa kaikkiin kolmeen
kanavaan samana lukuna, joten ne katoavat erotuksesta kokonaan.
Varjostus taas *kasvattaa* eroa (sininen vaimennetaan erikseen), joten
vuoren varjopuoli ei luiskahda mereksi.

### Miksi oletus on PÄÄLLÄ: kuvapari

Sama näkymä, sama kamera, sama panorointi, vain lippu vaihtuu
(390 × 844, dpr 3, z7, Ranskasta 8,2° itään):

| | kuva |
| --- | --- |
| maski POIS | `kuvat/kerma-heti-20260918/uusi-panoroinnin-jalkeen.png` |
| maski PÄÄLLÄ | `kuvat/kerma-heti-20260918/uusi-meret-panoroinnin-jalkeen.png` |

Kuvien nimistä: `uusi-*.png` on kaapattu Chromiumilla ENNEN oletuksen
kääntöä, eli maski pois; `uusi-meret-*.png` on sama näkymä lipulla.
Oletuksen käännyttyä sama ajo tuottaa nyt `uusi-meret-*`-kuvan
näköisen ruudun ilman lippua. Kuvat on jätetty alkuperäisillä nimillä,
koska raportti viittaa niihin kuvaparina.

Ilman maskia Välimeri, Tyrrhenanmeri ja Adrianmeri ovat **samaa kermaa
kuin Italia** — koko ruutu on yhtä vaaleaa, ja meri erottuu vain
rantaviivasta. Maskin kanssa meret ovat pohjan omaa syvyysharmaata ja
maa kermaa: Italian saappaan muoto, Genovanlahti ja Adrianmeri lukevat
yhdellä silmäyksellä. **Rannikot ovat pehmeitä eikä sahalaitaa ole.**
Korsika pysyy molemmissa kohdemaan alkuperäisenä värillisenä
topografiana — se on Ranskaa, ja renkaat osaavat sen.

Tämä on tehtävänannon ehto (*"oletus PÄÄLLÄ jos mittaus on siisti:
reunat pehmeät, ei sahalaitaa"*), ja se täyttyy.

### Alppien σ 26,8 EI ole vika — se on mittarin rajoite

`--meret`-ajossa Alppien piste sai yhden kehyksen, jossa σ = 26,8
(ilman maskia 0,47). Ensin tämä näytti maskin virheeltä. Se on
mittarin virhe:

```
σ(Alpit) maski pois  : — — — — — — 0,47 0,44 0,26 0,43 …
σ(Alpit) maski PÄÄLLÄ: — — — — — — 26,84 0,36 0,30 0,41 …
```

Kehys 6 on Alppien pisteen **ensimmäinen kehys ruudulla**, ja piste on
silloin ruudun reunalla Genovanlahden tuntumassa. Maskin kanssa siinä
9 × 9 ruudussa on sekä harmaata merta että kermaa maata — ja juuri sen
kontrastin maski on tarkoitettu tuottamaan. σ-mittari (*"reliefi ilman
kermaa"*) ei siis kelpaa meren lähellä oleviin pisteisiin silloin, kun
maski on päällä. Korjaus mittariin, ei koodiin.

### Tunnetut kompromissit (omistajan nähtäväksi)

1. **Matala meri saa vähän kermaa.** Rannan R − B ≈ 38 osuu rampin
   alapäähän, joten aivan rannikolla peitto on ~0,1 × nimellinen.
   Tarkoituksellinen pehmennys.
2. **Musteviivat.** Asteverkko ja valtamerten nimet ovat `MUSTE`
   (74,52,33), R − B = 41 → ~0,25 × peitto. Meren päällä oleva teksti
   saa hennon kermasävyn.
3. **Lumihuiput yli 5 500 m** ovat paletissa lähes neutraaleja
   (R − B 6…18) eli ne luetaan mereksi. Euroopassa tämä ei osu
   mihinkään (Mont Blanc 4 808 m → R − B ≈ 62), mutta **Andeilla ja
   Himalajalla osuu** — siellä korkein huippu jää kermaamatta.
   Jos jokin 27 maasta on niillä seuduilla, tämä on katsottava.

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

1. **Meriväitteen V4 pikselimittaus.** `--merikamera` on savukkeessa
   valmiina, mutta Ranskan uloszoomauksen esto rajaa kameran takaisin
   z7:ään. Tarvitaan pelitila ilman kohdemaata tai eston ohitus
   savukkeelle. Kuvapari (luku 4) kattaa väitteen sillä välin.
2. **σ-mittari ja maski.** V1:n σ-raja ei kelpaa meren lähellä oleviin
   pisteisiin, kun maski on päällä (ks. Alppien kehys 6). Mittauspisteet
   on siirrettävä sisämaahan tai väite jaettava maa- ja rannikkopisteisiin.
3. **Lumihuiput yli 5 500 m** (Andit, Himalaja): luetaan mereksi.
   Katsottava, osuuko se johonkin 27 maasta.
4. **V2:n mittauspiste** Ranskan mäkiseltä alueelta, jotta väite
   toimisi myös WebKitillä.
5. Savukkeen liittäminen `tools/tarkista-savukkeet.mjs`-sarjaan.
