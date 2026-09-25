# Viesti Fablelle — laattakerros lukittuu kertomuskameran lennon ajaksi

**Opus-työagentti, 14.9.2026.** Haara
`claude/bold-ride-vow4ki-linssilaatat`, pohjana `origin/main` (v1888).
Toimeksianto: Fablen päätös edellisen raportin
(`viesti-fable-linssivika-20260914.md`) lukuun 8 — *toteuta zoomitason
lukitus linssin ajaksi*. Omistajan alkuperäinen havainto (iPad, Ihmisen
matka, sanatarkasti): *"valilla kartan pienta vareilee meinaten pudottaa
topografian"*.

**Lyhyesti — ja tämä on raportin tärkein kohta.** Tein pyydetyn
lukituksen, mittasin sen, ja **se ei yksin korjannut väreilyä**.
Mittaus näytti oikean syyn, jota kumpikaan meistä ei ollut arvannut:
linssin kertomuskamera lentää kohdemaan **suojatun suorakaiteen
ulkopuolelle**, ja siellä värilaatasto maalaa jokaisen laatan
**täyteen kermaan** — laatta on tyhjä vaalea arkki. Ne haettiin,
häivytettiin seepiakartan päälle ja purettiin taas: *kartalle ilmestyi
ja katosi tyhjiä vaaleita neliöitä*. Kun linssin ajaksi jätetään nuo
tyhjät arkit hakematta, **tauolla mitattu kuvaero romahtaa
12–47 %:sta 0,3–2,3 %:iin**.

---

## 1. Menetelmä

Playwright, Chromium `/opt/pw-browsers/chromium`, iPad **1180 × 820
dpr 2**, Fogg Pariisissa, Ihmisen matka -linssi Käynnistä painettuna.
Kaksi vaihetta per ajo:

* **A — 30 s lentoa**, laattakerroksen omat mittarit sekunnin välein
  (`ui.pallolauta.lepokerros().mittarit()`).
* **B — Tauko**, eli kello ja kamera seis, ja viisi kaappausta kahden
  sekunnin välein. **Tämä on omistajan tilanne:** hän katsoo paikallaan
  olevaa karttaa ja näkee sen väreilevän. Kuvaero lasketaan
  kartta-alueesta (ylä- ja alapalkki rajattu pois).

Kolme ajoa samalla koodilla, lukot kytkimillä:

| Ajo | Kertomuslukko | Tyhjien kermalaattojen ohitus |
|---|---|---|
| **vapaa** | ei | ei |
| **lukko** | kyllä | ei |
| **lukko + kerma** | kyllä | kyllä |

## 2. Vaihe B — tauolla mitattu kuvaero (ratkaiseva mitta)

Muuttuneiden pikselien osuus kartta-alueesta peräkkäisten,
kahden sekunnin välein otettujen kaappausten välillä. Kamera seisoo.

| Ajo | 0→1 | 1→2 | 2→3 | 3→4 | 10 s yhteensä |
|---|---|---|---|---|---|
| vapaa | 46,8 % | 12,2 % | 28,9 % | 25,2 % | 80,7 % |
| lukko | 15,5 % | 25,2 % | 11,9 % | 24,4 % | 76,8 % |
| **lukko + kerma** | **0,26 %** | **0,36 %** | **0,28 %** | **2,34 %** | **3,02 %** |

Keskimääräinen luminanssiero (0…255) samoista pareista: vapaa
3,5–8,1 · lukko 3,0–6,5 · **lukko + kerma 0,05–0,64**.

**Pelkkä zoomitason lukitus ei siis korjannut väreilyä lainkaan.**
Sen jälkeen, kun tyhjät kermalaatat jätetään pois, kartta on
paikallaan.

## 3. Mikä ruudulla oikeasti välkkyi

Kuvapari samasta ajosta, kaksi sekuntia välissä, kamera paikallaan
Etiopiassa (`docs/raportit/kuvat/linssilaatat-ennen-a-20260914.jpg` ja
`-ennen-b-20260914.jpg`): jälkimmäisessä on keskellä karttaa **tyhjä
vaalea neliö**, jota edellisessä ei ole. Se on yksi värilaatasto­laatta.

Syy on `js/pallolaatat.js maalaaTasoitus`:issa ja se on
tarkoituksellinen siellä missä se on kirjoitettu:

```
if (!(x1 > x0) || !(y1 > y0)) { ctx.fillRect(0, 0, W, H); return true; }
```

Laatta, josta tasoituksen **suojattu suorakaide** (= kohdemaan
laatikko) ei leikkaa mitään, maalataan kokonaan kermaan — laataston oma
kuva piirretään vain suojan sisään. Pelin omalla kartalla tämä on
oikein: pelaaja on kohdemaassa, ja kerman marginaali estää portaan
laataston reunalla (`js/laattapyramidi.js`). **Linssissä ehto ei
päde:** kertomuskamera lentää Afrikkaan ja Aasiaan, missä jokainen
värilaatta on tyhjä arkki, ja ne välkkyvät seepiakartan päällä sitä
mukaa kuin niitä haetaan ja puretaan.

Korjaus on siksi **linssin ajaksi rajattu**: kertomuslukon ollessa
päällä laatta, joka on kokonaan suojan ulkopuolella, jätetään
maalaamatta ja kartta on siinä kohtaa se seepiakartta, joka se muutenkin
on — mikä on myös omistajan oma linjaus 13.9.2026 (*"Muiden maiden
kartat ja valtion ulkopuoliset vedet ja meret ennallaan ruskean
savyissa"*). Pelin omalla kartalla mikään ei muutu. Lukon auetessa nuo
laatat puretaan, jotta kerma palaa entiselleen.

## 4. Vaihe A — mitä lukitus teki (ja mitä ei)

Lennon aikana, sekunnin näytteet, 30 s:

| Mitta | vapaa | lukko |
|---|---|---|
| Naulattu taso | — | z6 koko ajon |
| Taso ajon aikana | z6, **z3**, z6 | z6, z3 (kerran), z6, z4 (kerran) |
| Näyttämön peitto, mediaani | 8,3 % | 0,0 % |
| Näyttämön peitto, max | 58,3 % | 70,8 % |
| Purettuja 30 s | 38 → 242 | 35 → 325 |
| Valmiita laattoja muistissa (tauolla) | 34 | **72** |
| Näyttämöllä laattoja (tauolla) | 26 | **69** |
| Peitto tauolla | 9/24 = 37,5 % | **12/24 = 50,0 %** |
| Muisti (tauolla) | 45 MB | 96 MB (tavukatto) |

**Rehellinen tulkinta.** Lukitus tekee sen, mitä siltä pyydettiin —
naula ei liiku, ja **levossa** kerros pitää kaksinkertaisen määrän
valmiita laattoja ja peittää enemmän (37,5 % → 50,0 %). **Mutta
tavoitetta "näyttämöllä ≥ 90 % tarvituista koko ajon" se ei saavuta**,
eikä väreilyyn se vaikuttanut. Kaksi syytä, molemmat mitattuja:

1. **Lennon aikana peitto EI VOI olla korkea.** Kamera on joka
   sekunti uudella seudulla, jolla kerroksella ei ole laattoja; ne on
   haettava verkosta. Mittausympäristön ämpärihaku on hidas, ja
   tarvituista 15–24 laatasta ehti valmistua 0–17. Oikealla laitteella
   luku on parempi, mutta rakenteellinen raja on sama: **lennon
   lähipää on aina odottamista**, ellei reittiä esiladata.
2. **Muisti tuli vastaan.** Pito nosti käytön 45 MB:stä katon
   96 MB:iin (`LAATTAKERROS_LAATTAKATTO_TAVUT`), ja sen jälkeen
   tavukatto purkaa yhä — myös pidettyjä. `purettuja` siis nousi
   (242 → 325) vaikka pito on päällä. Tämä on suunniteltua (muisti on
   kova raja), mutta se rajaa sen, kuinka paljon lukolla voi voittaa.

**Ehdotus jatkoon (ei tehty tässä):** Fablen mainitsema vaihtoehto eli
**lennon reitin esilataus ennen lentoa**. Kaari tuntee pysäkkinsä
etukäteen (`kaari.tapahtumat`), joten kerrokselle voisi antaa listan
lat/lon-pisteistä esiladattavaksi avausjakson (musta ruutu, Käynnistä)
aikana. Se on ainoa tie kohtaan 1, ja se on oma eränsä.

## 5. Muutokset

**`js/pallolaatat.js`**

* `KERTOMUSLUKKO` (uusi): `lukitseKertomus(true/false)`.
  * **Taso naulataan** siihen z:aan, joka on valittuna lukon
    mennessä päälle. Laattakatto saa yhä laskea sitä yleiskuvassa
    (muisti on kova raja), mutta kun kamera palaa alas, valinta alkaa
    taas naulasta eikä jää karkeaan.
  * **Pito ei vanhene** — mutta **vain valmiilla laatalla**. Pito on
    kaksikäyttöinen: se suojaa LRU:lta JA pitää tietueen
    latausjonossa. Jos lukko pitäisi myös aloittamattomat, jokainen
    lennolla ohitettu laatta jäisi jonoon ikuisesti ja lukko
    LISÄISI pyyntöjä. Tämä oli mitattu ansa, ei arvattu.
  * **Tyhjä kermalaatta jätetään maalaamatta** (uusi apuri
    `tasoituksenUlkopuolella`), ks. luku 3. Lukon auetessa nuo laatat
    puretaan, jotta pelin oma kartta palaa entiselleen.
  * Mittarit `kertomustaso` ja `kermattomia` savukkeille.
* **Pyyntöjä ei suljeta.** Toimeksianto sanoi *"eikä pura/pyydä
  laattoja lennon aikana"*. Pyyntöjen sulkeminen mitattiin ajatuksena
  läpi ja hylättiin: kertomuskamera lentää seuduille, joilla
  kerroksella ei ole yhtään laattaa, joten pyyntöjen sulkeminen
  jättäisi ne kokonaan sumeaksi pohjaksi — eli tekisi juuri sen, mitä
  lukon on määrä estää. Purku sen sijaan on kytketty pois (pito).

**`js/aikajana.js`** — `pakotaLaatu(paalla)` kytkee lukon samalla
hetkellä kuin terävän tilan: `true` tulee käynnistyksestä, `false`
purusta, ja olemassa oleva lippu takaa, ettei kumpikaan tapahdu
kahdesti. Ei uutta elinkaarta.

**`tests/pallolaatat.test.mjs`** — tekstivartija `pito`-rivistä
laajennettu kattamaan lukko, ja kommentissa perustelu sille, miksi
ehto on `t.tila === 'valmis'` eikä pelkkä lippu.

## 6. Savuke ja vastakoe

**`tools/savukkeet/savuke-linssilaatat.mjs`** väittää kuusi asiaa: lukko
ei ole päällä ennen linssiä; käynnistys naulaa täsmälleen sen tason,
joka oli valittuna; naula ei liiku ajon aikana; **tauolla peräkkäisten
kaappausten luminanssiero on ≤ 3**; sulku purkaa lukon; ei sivuvirheitä.

**MIKSI PEITTOPROSENTTI EI OLE VÄITTEENÄ — ja tämä on rehellisyyden
vuoksi kirjattava.** Ensimmäinen versio savukkeesta ajoi linssin
kahdesti (ilman lukkoa ja lukon kanssa) ja vertasi näyttämön peittoa
ajojen välillä. Se on oikea mitta mutta väärä savukkeeseen: **ajo
katkesi aikakattoon** (1500 s, mitattu), koska kaksi linssiajoa ei
mahdu siihen, ja lennon aikainen peitto riippuu ämpärihaun nopeudesta,
joka mittausympäristössä vaihtelee. Ennen/jälkeen-vertailu on siksi
tehty käsin ja kirjattu lukuihin 2 ja 4; savuke vartioi sitä, mikä on
nopeaa ja yksiselitteistä — lukon mekaniikkaa ja tauolla mitattua
kuvaeroa, jossa ero on suuruusluokka (3,0–8,1 → 0,05–0,64).

**Vastakoe ajettiin, ja se paljasti savukkeen rajoitteen — kirjaan sen
tähän eikä hiljene.** `LUKKO=0 node tools/savukkeet/savuke-linssilaatat.mjs`
antoi **5/6**: väite 3 (*"naula ei liiku ajon aikana"*) kaatui oikein
(`[null]`), eli savuke havaitsee lukon puuttumisen. **Mutta väite 4
(tauko) meni vastakokeessa läpi** erolla 0. Syy on mitattu ja
ymmärretty: siinä ajossa kertomus sattui olemaan Euroopassa, kohdemaan
suojatun suorakaiteen SISÄLLÄ, kun tauko painettiin — silloin tyhjiä
kermalaattoja ei ole ruudulla eikä väreilyä synny lukostakaan
riippumatta. Tauon mitta on siis **oikea mutta ehdollinen**: se palaa
punaiseksi vain, kun tauko osuu kohdemaan ulkopuolelle.

Tästä seuraa kaksi asiaa, jotka on sanottava suoraan:

1. **Savuke vartioi lukon mekaniikkaa luotettavasti** (väitteet 1–3, 5)
   ja tauon paikallaanoloa silloin kun mitta on merkityksellinen.
2. **Väreilykorjauksen todiste on raportin luku 2**, ei savuke: kolme
   kytkinasentoa samalla kaarella, ja väreily katoaa vasta
   kolmannella. Jos tauon väitteestä halutaan ehdoton, savukkeen pitäisi
   ajaa kaari tiettyyn pysäkkiin asti (Etiopia) ennen taukoa — se on
   oma pieni työnsä, jota en tehnyt tähän erään.

## 7. Portit

| Portti | Tulos |
|---|---|
| `npm test` | **# pass 3394, # fail 0** |
| `tarkista-kaksoisavaimet` | ei kaksoisavaimia |
| `tarkista-niputus` | 387 moduulia, 4230 julistusta, ei törmäyksiä |
| `tarkista-savukkeet` | 1663 ui-viittausta, 405 metodia, 534 kenttää |
| `savuke-linssilaatat.mjs` | **6/6 väitettä läpi**; vastakoe `LUKKO=0` 5/6 (väite 3 punainen, kuten pitää) |

## 8. Kuvat

* `linssilaatat-ennen-a-20260914.jpg` ja `-ennen-b-20260914.jpg` —
  kaksi sekuntia välissä, kamera paikallaan: jälkimmäisessä tyhjä
  vaalea arkki keskellä karttaa.
* `linssilaatat-jalkeen-20260914.jpg` — sama tauko korjattuna: ehjä
  seepiakartta, kuvaero 0,3 %.
