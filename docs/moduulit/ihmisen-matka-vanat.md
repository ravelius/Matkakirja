# Ihmisen matka vanoina — suunnitelma

*(Moduuli: Ihmisen matka -linssi pallolla (js/linssit/ihmisen-matka.js,
js/aikajana-virrat.js, js/aikajana-virrat-laskenta.js,
js/linssit/ihmisen-matka-virrat.js). Linjaus: Raamattu › "IHMISEN
MATKA ON VARIVIRTOJA, EI PISTEITA" → "VIRRAT VANOINA" (omistaja
6.9.2026 ilta), "AIKAJANAN AJO", "KAIKKI LIIKE ANIMOIDAAN PEHMEASTI".
Tämä dokumentti kertoo MITEN; ristiriidassa Raamattu voittaa. Laatija
Fablemax 6.9.2026 yö. SUUNNITELMA, EI TOTEUTUS — omistajan sääntö:
fablemax arvioi ja suunnittelee, Opus-parvi toteuttaa (luku 6). Kaikki
luvut on mitattu scratchpad-kokeilla (luku 9), ei arvattu.
Edeltäjä docs/moduulit/ihmisen-matka-virrat.md pysyy voimassa siltä
osin kuin tämä ei sitä muuta: laskenta, maski, portit, ylitykset,
värit ja päätökset 1–14 ovat ennallaan; luvut 5.3 (kalvo), 6 (kamera) ja
päätös 4 (kaikki 20 kuvaa poksahtavat) korvautuvat tällä.)*

## 0. Omistajan linjaus 6.9.2026 ilta, sanatarkasti (Raamattu, VIRRAT VANOINA)

> "Se että väri peittää koko mantereen on outo. Olisi kivempi katsoa
> tarkempaa linjaa miten ehkä ihmiset kulkivat ainakin pääasiassa.
> Lisäksi onko tuo kuvien näyttäminen eri puolilta järkevää? Siinähän
> kai näytetään todistetut havaintopaikat mutta kertooko se todellista
> reittiä? Olisiko parempi näyttää looginen linja miten ihmiset
> todennäköisesti etenivät ensin Amerikkaan ja sitten muut linjat. Ja
> lopuksi voitaisiin näyttää tai animaatioiden aikana muutama valokuva.
> Mutta sitten kun esitys ohi, pelaaja voisi itse katsella ne ohitettu
> kuvat läpi."

Kysymyskortin vastaus *Virrat vanoina*. Raamatun tulkinta: leviäminen
piirretään PÄÄREITTIÄ pitkin etenevänä kirkkaana vanana ja sen
ympärillä vain kapeana haaleana kaistana; kamera seuraa yhtä
selkärankaa Afrikasta Aasian kautta Beringiaan ja Amerikkoihin; haarat
(Eurooppa, Australia, Tyynimeri) piirtyvät samaan aikaan ohuempina
ilman kameran hyppyjä; kello kulkee yhteen suuntaan; esityksessä vain
5–6 pääreitin kuvaa, loput galleriasta ("Katso löydöt"); lopuksi kamera
perääntyy koko pallon näkymään; löytöpaikat ovat todisteita, eivät
reitti — otsikko "todennäköinen pääreitti".

## 1. Tiivistelmä ja suositus

1. **Vanat johdetaan saapumisaikakentästä EDELTÄJÄPOLKUNA** (Dijkstran
   edeltäjäketju päätepisteestä lähteeseen), ei käsin piirrettyinä
   käytävinä. Sama laskenta, joka jo värjää ruudut, antaa jokaiselle
   päätepisteelle täsmälleen sen polun, jota pitkin väri sinne mallissa
   kulki — ylitykset, portit ja nauhat mukaan lukien — ja jokaiselle
   kärjelle saapumisajan. Päätepisteet (Monte Verde, Lake Mungo,
   Lissabon, Tianyuan, Yana, Honshu, Lappi, White Sands, Lagoa Santa,
   Grönlanti) ovat aineistoa; Tyynenmeren nauhat ovat jo polylinjoja
   aikoineen. Mitattu: 10 polkua 22 ms, yksinkertaistettuina 1 500
   kärkeä / 33 kt JSON:na (luku 2.1). Käsin määritelty käytävä
   hylättiin: sen ajat kentästä eivät ole monotonisia (8 rikettä 69
   pisteessä) ja se poikkeaa mallin polusta mediaanina 414 km, p90
   3 900 km (Keski-Aasia vs. Itä-Aasian rannikko) — kaksi totuutta
   samalla kartalla.
2. **Mallin selkäranka kulkee Omo → Bab-el-Mandeb → Arabia → Iran →
   Keski-Aasia → Altai (Denisova) → Siperia → Tšuktšit → Beringia →
   Alaska → Tyynenmeren rannikko → Monte Verde** (30 800 km). Se on
   en-Wikipedian "pohjoinen reitti" (*Early human migrations*: "one
   group rapidly settling coastal areas around the Indian Ocean and
   another migrating north to the steppes of Central Asia";
   "Paleo-Indians originated from Central Asia, crossing the Beringia
   land bridge"), ja se noudattaa omistajan päätöstä 11 (Siperia
   haarautuu Altailla). Etelän rannikkoreitti (*Southern Dispersal*)
   on Australian ja Itä-Aasian HAARA. Löytöpaikat Denisova ja Beringia
   ovat selkärangalla (88 ja 144 km kärjestä kuvan hetkellä).
3. **Piirto Line2-viivoina** (three.js fat line, sama mekanismi kuin
   rantaviivoilla js/pallovektorit.js): päävirta 4 css-px, haarat
   2,5 px, myöhäiset haarat 2 px; kasvu kellon mukaan katkoviivan
   viivaosalla (kuten reittiviivan `jalki`), kärki kirkas ja häntä
   vanhaan sävyyn kärkiväreillä (rintaman kaava ruudunTilasta);
   kaista = sama geometria leveänä (≈ 250 km, kameran mukaan skaalattu
   10–40 px) 14 % peitolla. Vanha väestö harmaana pysyy KALVONA, mutta
   kerran maalattuna ja häivytettynä materiaalin peitolla — kehyksittäin
   maalattava 1440 × 720 -kangas poistuu esityksestä. Mittaukset
   luvussa 2.3.
4. **Kamera seuraa selkärangan kärkeä korkeussäännöllä**: kohde on
   kärki, näkyvä leveys kasvaa kärjen karatessa (kärki pysyy kuvassa
   pyrähdyksissäkin) ja supistuu odotuksissa; kuvapysäkin kohdalla
   kehystetään kärki ja pysäkki yhdessä; Monte Verden jälkeen (14 ka)
   kamera perääntyy koko pallon näkymään Tyynimeri keskellä, jossa
   viimeiset nauhat piirtyvät ja Wairau Barin kuva poksahtaa. Mitattu
   kärjen kulku (luku 3.1): kolme pitkää odotusta (Bab-el-Mandeb 184 →
   78 ka, Altai 71 → 48 ka, Tšuktšit 32 → 17 ka) ja kaksi pyrähdystä
   (Arabia → Altai 2 000 vuodessa; Alaska → Chile 2 600 vuodessa).
5. **Kuusi kuvaa esityksessä**: Jebel Irhoud, Al Wusta, Denisova,
   Beringia, Monte Verde, Wairau Bar. Neljätoista muuta ovat galleriassa
   ("Katso löydöt" loppusanoissa → Tiedeliite, joka on jo kortti
   kerrallaan selattava lehti). Hiljaiset pysäkit pysyvät kellossa
   (asteikko ennallaan) mutta eivät pysäytä sitä, eivät liikuta
   karusellia eivätkä lue ääneen; ne merkitään karttaan pieninä
   pisteinä ("löytöpaikat ovat todisteita"). Esitys lyhenee 242 → 178
   sekuntiin (luku 3.1).
6. **Löydetty ja korjattava ennen vanoja**: maskin Bab-el-Mandebin esto
   vuotaa 8-naapurustossa diagonaalisti 13°N:llä, ja Jemen värjäytyy
   180 000 vuotta sitten (dokumentti lupaa 78–55 ka). Vanan kärki
   näyttäisi virheen. Korjaus on yksi estoruutu (luku 2.1.3, erä V0).

## 2. Mittaukset ja vaihtoehdot

### 2.1 Vanojen johtaminen

Koe `vanat-koe.mjs` (luku 9) ajaa tuotannon laskennan (viisi virtaa,
sama data) kopiolla `laskeVirtasta`, johon on lisätty edeltäjätaulu
(Int32Array, −1 = lähde tai nauha) ja nauhan pisteen tunnus, ja
piirtää tulokset tasokartalle.

**A. Edeltäjäpolku.** Päätepisteestä seurataan edeltäjää lähteeseen.
Ylitys on edeltäjäketjussa tavallinen särmä (b:n edeltäjä on a).
Nauhan ruudussa hypätään nauhan pisteisiin taaksepäin sen alkuun ja
jatketaan sieltä kentässä. Virran lähteessä, joka on luettu toisesta
virrasta (`lahteetToisesta`, Beringia), jatketaan lukupisteestä
toisessa kentässä; virran omassa lähteessä (Altai, Bacho Kiro)
hypätään päävirran lähimpään vanhempaan ruutuun. Sitten
Douglas–Peucker 60 km, aikatietoinen tihennys (jos kahden säilytetyn
kärjen väli on > 1 500 v tai > 6 % vanhemmasta ajasta, raakapisteitä
palautetaan väliin — muuten kärki "liukuu" portin yli lineaarisesti
sen sijaan että odottaisi rajalla; kokeen ensimmäinen ajo teki juuri
niin), Chaikin 2 kierrosta, ajat monotonisiksi.

| vana (päätepiste → lähde) | raaka | DP 60 km + aikatihennys | Chaikin | km | virrat |
| --- | --- | --- | --- | --- | --- |
| selkäranka: Monte Verde → Omo | 624 | 69 | 276 | 30 830 | päävirta › siperia › amerikat |
| australia: Lake Mungo → Omo | 259 | 36 | 144 | 17 364 | päävirta |
| eurooppa: Lissabon → Jebel Irhoud | 198 | 34 | 136 | 9 747 | päävirta › eurooppa |
| itä-aasia: Tianyuan → Omo | 234 | 38 | 152 | 13 430 | päävirta |
| yana: Yana → Omo | 213 | 23 | 92 | 11 626 | päävirta › siperia |
| fennoskandia: Lappi → Jebel Irhoud | 185 | 37 | 148 | 9 454 | päävirta › eurooppa |
| japani: Honshu → Omo | 275 | 47 | 188 | 15 575 | päävirta |
| grönlanti: → Omo | 654 | 80 | 320 | 30 876 | päävirta › siperia › amerikat |
| Tyynimeri: 7 nauhaa sellaisinaan | — | 37 | — | — | tyynimeri |

Laskenta: viisi virtaa edeltäjin 627 ms Nodessa (tuotannon 265–500 ms
+ edeltäjätaulun kirjoitus; ero mittausvirheen sisällä), polkujen
johtaminen 10 kpl 22 ms, JSON 33 kt / 1 498 kärkeä — ei esilaskentaa,
ajetaan Workerissa laskennan perään. Haarat jakavat rungon kanssa
saman alkupään (esim. australia kulkee Omosta Intiaan samoja ruutuja
kuin selkäranka): toteutus katkaisee haaran siitä, missä se eroaa
paksummasta vanasta yli 100 km (yksi yhteinen kärki jää liitokseksi).

Kuvat `vanat-loppu.png` (kaikki vanat + käsin-käytävä mustana),
`vanat-45ka.png`, `-16ka.png`, `-1ka.png` (kellon hetket: vana kärkeen
asti, kärki kirkas, kaista 200 km vain sinne, minne kentän väri on
ehtinyt). Silmällä: 45 ka kuva näyttää juuri pyydetyn — Afrikan kaksi
vanaa, selkäranka Altaille, Siperian kärki kirkkaana, Australia
oranssina, Eurooppa alkamassa Bacho Kirosta; ei mantereen täyttöä.

**B. Käsin käytäväpisteet** (69 pistettä Jebel Irhoud → Niili → Omo →
Bab-el-Mandeb → Arabian rannikko → Intia → Sunda → Kiinan rannikko →
Amur → Tšuktšit → Beringia → rannikko → Monte Verde; aika luetaan
kentästä): 0,3 ms, mutta ajat eivät ole monotonisia (8 rikettä 69:stä:
Sahara 300 → 100 → 207 ka, Kiinan rannikko 69 ka → Tianyuan 43 ka →
Mantšuria 41 → 42 → 43 ka) ja polku poikkeaa mallin selkärangasta
mediaanina 414 km, p90 3 905 km, enimmillään 5 592 km — käsin piirretty
linja kulkee Itä-Aasian rannikkoa, malli Keski-Aasian aroa. Kaksi
totuutta kartalla ei kelpaa, ja käsin linja vanhenee jokaisesta
mallin säädöstä. HYLÄTTY vanojen geometriaksi; käsin annetaan vain
PÄÄTEPISTEET (aineisto) ja Afrikan kotipesät (2.1.2).

**C. Jyrkin nousu kentässä** (aina vanhimpaan naapuriin) kokeiltiin
ensimmäisenä ja hylättiin: portin tasanteella (kaikki ruudut avautuvat
samaan aikaan, esim. arktinen Siperia 35 ka) ei ole vanhempaa naapuria
ja polku pysähtyy; ylitykset ja nauhat vaatisivat erikoissäännöt.
Edeltäjäketju ratkaisee kaikki kolme ilmaiseksi.

#### 2.1.1 Tieteellinen puolustettavuus (en-Wikipedia, haettu 6.9.2026)

- *Southern dispersal*: rannikkoreitti "from the Arabian Peninsula via
  Persia and India to Southeast Asia and Oceania … beginning between
  roughly 70,000 and 50,000 years ago" — mallin Australian haara
  (Arabia 72 ka, Intia 73 ka, Sumatra 70 ka, Sahul 62 ka).
- *Early human migrations*: "crossed the Red Sea strait at
  Bab-el-Mandeb, to what is now Yemen, after around 75,000 years ago";
  "around 50,000 years ago, with one group rapidly settling coastal
  areas around the Indian Ocean and another migrating north to the
  steppes of Central Asia"; "Paleo-Indians originated from Central
  Asia, crossing the Beringia land bridge" — mallin selkäranka.
- *Peopling of the Americas*: lähtöväestö syntyi Siperiassa kahden
  ryhmän sekoituksesta (Ancient North Eurasians + itäaasialaiset),
  "Beringian standstill"; rannikko avoin n. 17–16 ka, jäätön käytävä
  vasta 13–12 ka — mallin Tšuktšien odotus 32 → 17 ka ja rannikkoreitti.
- *Coastal migration (Americas)*: rannikkoreitti "along the coast of
  Beringia and the archipelagos off the Alaskan-British Columbian
  coast, continuing down the coast to Central and South America";
  Vancouverin saari asuttava jo 16 ka.
- *Beringia*: maasilta n. 30 000 – 11 000 vuotta sitten.

Yksinkertaistus, jonka teksti täsmentää (ihmisen-matka-virrat.md luku
4 jatkuu): Amerikkojen lähtöväestössä on myös itäaasialainen osuus,
joka tuli Siperiaan etelästä; vana näyttää vain yhden linjan.
Otsikko "todennäköinen pääreitti" sanoo tämän.

#### 2.1.2 Afrikka: kotipesät, ei arvattua linjaa

Mallissa Afrikassa on kolme toisistaan riippumatonta lähdettä (Jebel
Irhoud 300 ka, Omo 233 ka, Pinnacle Point 164 ka), ja selkäranka alkaa
Omosta. Linja Jebel Irhoud → Omo olisi keksitty muuttoliike (kentän
ajat sen varrella eivät ole monotonisia: 300 → 100 → 207 → 233 ka).
Siksi Afrikan 300–184 ka näytetään KOTIPESINÄ: Jebel Irhoud, Omo ja
Pinnacle Point saavat pehmeäreunaisen värilaikan (säde ≈ 350 km, kaistan
mekanismi ilman viivaa), joka syttyy pysäkin hetkellä; selkäranka
lähtee Omosta Djiboutiin (233 → 184 ka) ja odottaa siellä
Bab-el-Mandebin ikkunaa (78 ka). Kamera aloittaa Jebel Irhoudista
(kuva 1) ja liukuu Omolle. Teksti (luku 5) sanoo: Afrikassa ihmisiä
oli monessa paikassa yhtä aikaa; Itä-Afrikasta lähti se linja, jota
seuraamme.

#### 2.1.3 Löytö: Bab-el-Mandebin esto vuotaa

Maskissa Punainenmeri on 13,0–13,5°N:llä yhden ruudun levyinen, ja
Dijkstran 8-naapurusto ylittää sen DIAGONAALISTI ruudusta (13,0°N,
42,5°E) ruutuun (13,5°N, 43,0°E). Mitattu (`tarkista.mjs`): Djibouti
184 274, Jemenin Tihama 179 513, Jemen 15°N 173 060 vuotta sitten —
dokumentin lupaama ylitys 78–55 ka ei toteudu, väri odottaa vasta
Arabian portilla 16°N:llä. Kalvolla tämä hukkui Arabian väriin; vanan
kärki näyttäisi sen (kärki Jemenissä 180 ka). Korjaus kokeessa: ruutu
(13,5°N, 43,0°E) mereksi → Tihama 78 000 (ikkunan avautuessa + 500 v),
Oman 75 511, Levantti 71 804 ennallaan, ja testin mallitaulukko pysyy
(Australia 62 ka > Eurooppa 45 ka, Alaska 16,7 ka, White Sands 15,1 ka
— nämä eivät riipu Jemenistä). Tuotantokorjaus: tools/tee-maamaski.mjs
ESTOT + maskin uudelleenajo + testiin rivi "Tihama ≤ 78 000" (erä V0).

### 2.2 Vanojen geometria (ehdotus aineistoksi)

`js/linssit/ihmisen-matka-virrat.js` saa uuden viennin
`IHMISEN_MATKA_VANAT`:

```
{
  selkaranka: { virta: 'amerikat', paate: { lat: -41.5047, lon: -73.2044 }, paksuus: 4 },
  haarat: [
    { tunnus: 'australia',    virta: 'paavirta', paate: { lat: -33.75, lon: 143.0833 }, paksuus: 2.5 },
    { tunnus: 'eurooppa',     virta: 'eurooppa', paate: { lat: 38.7, lon: -9.1 },       paksuus: 2.5 },
    { tunnus: 'ita-aasia',    virta: 'paavirta', paate: { lat: 39.6797, lon: 115.9461 }, paksuus: 2.5 },
    { tunnus: 'yana',         virta: 'siperia',  paate: { lat: 70.7236, lon: 135.4297 }, paksuus: 2.5 },
    { tunnus: 'japani',       virta: 'paavirta', paate: { lat: 36.0, lon: 138.5 },      paksuus: 2 },
    { tunnus: 'fennoskandia', virta: 'eurooppa', paate: { lat: 68.0, lon: 27.0 },       paksuus: 2 },
    { tunnus: 'white-sands',  virta: 'amerikat', paate: { lat: 32.7792, lon: -106.1719 }, paksuus: 2 },
    { tunnus: 'brasilia',     virta: 'amerikat', paate: { lat: -19.6, lon: -43.9 },     paksuus: 2 },
    { tunnus: 'gronlanti',    virta: 'amerikat', paate: { lat: 69.5, lon: -53.0 },      paksuus: 2 },
  ],
  nauhat: 'tyynimeri',            // virran nauhat sellaisinaan, paksuus 2
  kotipesat: [ { tunnus: 'jebel-irhoud', sade: 350 }, { tunnus: 'omo-kibish', sade: 350 }, { tunnus: 'pinnacle-point', sade: 300 } ],
  yksinkertaistus: { dpKm: 60, aikaV: 1500, aikaOsuus: 0.06, chaikin: 2, haaranEroKm: 100 },
}
```

Laskenta (`johdaVanat(kentat, aineisto)` js/aikajana-virrat-laskenta.js)
palauttaa `[{ tunnus, virta, paksuus, pisteet: [[lat, lon, aika]…] }]`
selkäranka ensin. Vanan geometria on siis aina mallin oma: kun Opus tai
Fable säätää nopeutta tai porttia, vana seuraa perässä eikä mikään
käsin piirretty linja vanhene. Mitattu selkäranka (kärjet 5 000 km
välein): Omo 233 ka → Djibouti 184 → Tihama 78,0 → Oman 75,5 → Iran
74,7 → Kaspian itäpuoli 73,1 → Kazakstan 72,3 → Altain eteläreuna 70,8
→ Altai 48,0 → Yanan haara 33,3 → Tšuktšit 32,4 → Seward 16,7 → Alaskan
rannikko 16 → Meksiko 15 → Peru 15 → Monte Verde 14,1 ka.

### 2.3 Piirto: kalvo vs. Line2 (mitattu puhelinkoossa kontissa)

Mittari `mittaa-vanat.mjs` (luku 9) ajaa pelin `?lauta=pallo`
Playwrightilla (390 × 844, dpr 2, kontin ohjelmisto-WebGL — vain
suhteet), avaa Ihmisen matkan laukusta, käynnistää ajon ja mittaa
rAF-kehysvälit 5–6 s ajan: (A) kalvo kuten nyt v1649:ssä, (B) 18 vanaa
Line2:na + kaista leveänä Line2:na ilman kalvoa (kangasta ei maalata),
(C) vanat + kalvo, (D) lepo. Vanat lisättiin elävään palloon samalla
luokkalöydöllä kuin js/pallovektorit.js (Line2-luokat Globe.gl:n
omasta polusta).

Kontin Chromium piirtää pallon ohjelmistorasteroijalla 0,5–1,3
kehystä sekunnissa, joten luvut ovat suhteita, eivät puhelimen aikoja.
Eroteltu mittaus (`mittaa-vanat-2.mjs`): sama näkymä Altain yllä
(leveys 3 600 yksikköä, kello seis, laatat asettuneet), kamera liikkuu
0,02° joka kehyksellä, vain näkyvyys vaihtuu; 8 s per rivi, 5–9
kehystä — p50 on karkea.

| tila (puhelin 390 × 844, dpr 2) | kehysväli p50 / p95 ms | piirtokutsut | kolmiot | pääsäikeen työ kehyksessä |
| --- | --- | --- | --- | --- |
| ei kalvoa, ei vanoja | 800 / 2 033 (toisto 750 / 2 367) | 45–59 | 92 500 | — |
| kalvo kuten nyt (1440 × 720 kangas, 12 Hz) | 1 017 / 1 700 | 60 | 100 800 | maalaus 10–40 ms (mitattu tässä ajossa 10,2 Aasia, 39,6 Afrikka) + 4 Mt tekstuurin vienti 12 Hz |
| 18 vanaa Line2 + kaista Line2 (34 viivaa, 3 000 instanssia) | 2 167 / 2 217 | 93 | 110 600 | dash + 1 500 kärkiväriä 12 Hz (< 1 ms) |
| vanat + kalvo | 1 550 / 2 567 | 94 | 118 500 | molemmat |

Ensimmäinen ajo (`mittaa-vanat.mjs`, kello käynnissä, kamera seuraa)
antoi saman suhteen: kalvo 1 517–1 650 ms, vanat 2 300, molemmat 2 633;
Worker-laskenta kontissa 10–14 s (koneen kuorma; Nodessa 0,6 s).

Lukujen tulkinta: ohjelmistorasteroijassa fat line -varjostin on
kallis (sama havainto docs/moduulit/pallon-vektoriviivat.md 2.2:
Line2 kaksinkertaisti panoroinnin kehysajan kontissa 133 → 267 ms, ja
rantaviivat otettiin silti käyttöön, koska laitteen näytönohjaimelle
+22 piirtokutsua ja 100 000 kolmiota on mitätön), ja kalvon kustannus
on siellä pieni, koska se on YKSI kolmio-pari tekstuurilla. Puhelimen
todellinen pullonkaula on toisin päin: kalvon 10–40 ms pääsäikeen
maalaus 12 kertaa sekunnissa on 12–48 % kehysbudjetista kellon,
karusellin ja kameran rinnalla, ja 4 Mt tekstuurin vienti 12 Hz kilpailee
laattojen kanssa; vanojen 34 piirtokutsua ja 18 000 kolmiota ovat
pallon 45–60 kutsun ja 92 000 kolmion päällä pieniä. Kontissa GPU-hintaa
ei voi mitata — puhelimen mittari on omistajan iPhone (V3:n todennus
kirjaa savukkeen luvut ja pyytää omistajan arvion kuvista). Halpa
varaus, jos puhelin yllättää: kaista vain selkärangalle ja kolmelle
pääharalle (−12 kutsua) tai kaikki haarat yhteen LineSegments2:een
(−10 kutsua; kasvu silloin kärkien värillä, ei dashilla).

Kolme piirtotapaa kaistalle, vertailu:

| tapa | kehyshinta | geometria | pehmeä reuna | huomio |
| --- | --- | --- | --- | --- |
| **Line2 leveänä** (valittu) | +1 viiva per vana, ei CPU-työtä kehyksessä | ruutupikseleitä; skaalataan kameran mukaan ≈ 250 km (10–40 px) | ei suoraan — kaksi päällekkäistä leveyttä (26 px @ 0,10 + 14 px @ 0,12) antaa porrastetun häiveen | kasvaa samalla katkoviivalla kuin vana |
| canvas-kalvo rajattuna vanan etäisyyteen | kankaan maalaus 3–70 ms (v1645 mittaus) + 4 Mt tekstuurin vienti 12 Hz | maantieteellinen 200 km | kyllä (bilineaarinen) | koko nykyinen tarkennus- ja maalauskoneisto jää elämään pelkkää kaistaa varten |
| ei kaistaa | 0 | — | — | omistaja pyysi kaistan ("kapea haalea kaista") |

Vanha väestö (harmaa Eurooppa ja Keski-Aasia 300–40 ka) ei ole vana:
se maalataan KERRAN kankaalle (`laatikkoPehmea`-maski, 720 × 360
riittää — reuna on 2°:n kaista), pannaan kalvoksi ja häivytetään
46 → 40 ka materiaalin peitolla (`haivyta` on jo linssit.js:ssä). Sama
mekanismi antaa Afrikan kotipesät (kolme laikkaa, kirkkaus kellon
mukaan) ja retken (Skhul/Al Wusta 125 → 70 ka sammuva läikkä): kolme
staattista kuvaa, joiden peitto muuttuu — kankaan uudelleenmaalausta ei
tarvita kehyksessä lainkaan. Kalvon syvyysjärjestys laattakerroksen
päälle on toisen agentin korjaus (avoin vika 2); vanat ovat Line2:na
läpinäkyvien jonossa renderOrder 0,6/0,5 (rantaviiva −0,5, reitit 0,
kalvo 1) ja syvyyssiirrolla −12 kuten rantaviiva, joten ne eivät
katoa laattojen alle.

**Vanan piirto tarkasti:**

- Geometria: `LineGeometry.setPositions` pallon pinnalla säteellä
  R × (1 + 0,0005) — pieni nosto, koska vana kulkee rantaviivan
  (korkeus 0) ja reittien (0,002) välissä; `computeLineDistances` antaa
  kumulatiivisen matkan, ja aineistosta lasketaan rinnalle `matka[k]`
  (maailmayksikköä) ja `aika[k]`.
- Kasvu: `material.dashed = true`, `dashSize = matka(nyt)`, `gapSize =
  1e6`, missä matka(nyt) interpoloidaan kärkien väliltä (aika[k] ≥ nyt
  ≥ aika[k+1]); yksi haku per vana per kehys. Sama ratkaisu kuin
  reittiviivan kasvussa (js/aikajana.js paivitaReitti → reitit.js
  `jalki`), jossa katkon luvut menevät materiaaliin joka päivityksellä
  ilman geometriatyötä.
- Kärki kirkas, häntä haalenee muttei katoa: kärkivärit
  (`geometry.setColors`, `vertexColors: true`), kärjen k väri =
  vanha + (rintama − vanha) × w, w = max(0, 1 − (aika[k] − nyt) /
  rintamanLeveys(nyt)) — täsmälleen ruudunTilan kaava, joten "rintama"
  on yhä kymmenesosa kellosta (≥ 600 v, päätös 3). Väripuskuri
  päivitetään 12 Hz (VIRTOJEN_PAIVITYS_MS) vain kärjen ympäristöstä;
  1 500 kärkeä × 3 floattia on mitätön.
- Leveys css-pikseleinä (`resolution` = kotelon css-mitat, kuten
  reiteillä ja rantaviivalla): 4 / 2,5 / 2 px, samat puhelimella ja
  työpöydällä (dpr ei ohenna). Väri virran `rintama`/`vanha`-sävyt
  luvun 11 paletista; Amerikkojen liuku kellon mukaan (virranVari)
  toimii sellaisenaan, koska värit lasketaan kehyksessä.
- Reduced motion: dash ja värit päivittyvät 500 ms askelin, ei häiveitä.
- **Kaistan helminauha (nähty kuvassa `kuvat/puhelin-B-vanat-aasia.png`):**
  leveä läpinäkyvä Line2 piirtää jokaisen janan omana instanssina, ja
  liitoksissa päällekkäiset neliöt summautuvat 2 × peitoksi — 26 px:n
  kaista näytti helminauhalta. Kokeiltu kaksi korjausta samassa
  näkymässä: (1) `alphaToCoverage: true` — kontin ohjelmisto-WebGL:ssä
  ei ole moninäytteistystä, joten kaista piirtyi täysin peittävänä
  sinisenä jokena (`puhelin-vanat-eurooppa-atc.png`); laitteella se
  toimisi, mutta sitä ei voi todentaa kontissa → ei valita. (2)
  **Kaista kirjoittaa syvyyden ja käyttää tiukkaa testiä**
  (`depthWrite: true`, `depthFunc: LessDepth`): saman viivan
  päällekkäiset neliöt ovat samassa syvyydessä ja toinen hylätään —
  kaista on tasainen haalea vyö (`puhelin-vanat-eurooppa-syvyys.png`),
  myös haaran ja rungon liitoksessa. Sivuvaikutus nähtiin samassa
  kuvassa: vana katkoo z-taisteluun kaistan kirjoittaman syvyyden
  kanssa, joten vana piirretään kaistan JÄLKEEN omalla
  syvyyssiirrolla (vana polygonOffsetUnits −16, kaista −12) tai hitusen
  suuremmalla säteellä (+0,001 vs. +0,0005). Tämä on V2:n valinta;
  varaus, jos laitteella näkyy vielä vikaa: kaista kalvon kankaalle
  geografisena 200 km:n vyönä (kerran maalattu, kasvu maskikankaalla,
  ei kehyksittäistä uudelleenmaalausta). Itse vana (2,5–4 px, peitto
  0,95) ei helmeile näkyvästi.
- Kaista ja kotipesät: yllä. Tyynenmeren meri ei värjäydy — nauha on
  vana ja kaista sen ympärillä (päätös: "merivirta nauhana").

### 2.4 Kalvon kohtalo

Kehyksittäinen `maalaa` (1440 × 720, 270 000 aktiivista pikseliä,
3–70 ms) ja `tarkennaKentat` (Workerissa 150–300 ms) jäävät pois
esityksestä. Funktiot säilyvät moduulissa testeineen (puhtaat,
testattuja) — poisto on oma siivouserä myöhemmin, kun omistaja on
hyväksynyt vanat; tässä vaiheessa kalvon polku jää `?virrat=kalvo`
-lipun taakse perääntymistieksi (yksi rivi luoVirratissa).

## 3. Kamera

### 3.1 Kärjen kulku ajassa (mitattu, `kamerapolku.mjs`)

Kello mallinnettiin kuten js/aikajana.js: 20 pysäkkiä, ASTEIKON_VALI 10,
AIKAJANA_VUOSI_MS 260, nopeusprofiili aikajananNopeus, viive 4 600 ms
pysäkillä (luennan pidätys ei mukana), logaritminen lukema
pysäkkivälillä. Selkärangan kärki interpoloidaan vanan ajoista.

| | kaikki 20 pysäyttävät (nyt) | vain 6 kuvapysäkkiä pysäyttävät (ehdotus) |
| --- | --- | --- |
| esityksen kesto | 242 s | 178 s |
| odotukset ≥ 4 s (kärki paikallaan) | 19 kpl (jokainen pysäkki) | Jebel Irhoud 7 s; Djibouti/Tihama 24–49 s (163 → 88 ka, Al Wustan kuva 40 s); Altai 69–86 s (57 → 50 ka, Denisovan kuva 76 s); Siperia 121–126 s; Tšuktšit/Beringia 138–154 s (22 → 20 ka, kuva 145 s); Monte Verde 164–178 s |
| pyrähdykset > 1 500 km/s | 5 | 6: Arabia → Altai 58 s (1 754 km/s, 72 ka); Alaska → Chile 156–157 s (4 378 ja 9 007 km/s, 16 → 15 ka); Monte Verde 163 s |
| liikkuvien sekuntien nopeus | p50 18, p90 436 km/s | p50 23, p90 568 km/s |
| kuvapysäkki: kärjen etäisyys pysäkistä | — | Jebel Irhoud 0, Al Wusta 1 745, Denisova 88, Beringia 144, Monte Verde 2 839 km (kuva 14,5 ka, vana perillä 14,1 ka) |

Kuvaaja `kamerapolku.png` (x = ruutusekunnit, y = km selkärangan
alusta; pallot = kuvapysäkit): portaat ovat mallin tosiasia — pitkät
odotukset porttien ja ikkunoiden edessä, lyhyet pyrähdykset rannikoilla
(2 km/v Etelä-Aasiassa, 9 km/v Amerikoissa) — ja kello tekee syvän ajan
väleistä yhtä pitkiä kuin nuorista. Kameraa ei siksi voi sitoa
kärkeen suoraan: 9 000 km/s ei seurata, ja 25 sekunnin paikallaanolo
ei ole "tasaista liikettä".

### 3.2 Kameran sääntö

Kamera on aina yhdellä polulla, ei hyppää, ja sen tila on (lat, lng,
leveys) kuten nyt; `liuutaKamera` (eksponentiaalinen liuku) säilyy,
vain KOHDE lasketaan toisin:

1. **Kohde = selkärangan kärki** `karki(nyt)` (sama interpolointi kuin
   vanan kasvussa) + ennakko: piste, jossa vana on 4 %:n kellonlukeman
   päästä (kärki kulkee kameran edellä kuten REITIN_KARJEN_ENNAKKO).
2. **Korkeussääntö — kärki karkaa, kamera nousee:** näkyvä leveys
   W = clamp(W0 + 2,2 × d, 30°, 110°), missä d = kulmaetäisyys kameran
   nykyisestä paikasta kohteeseen ja W0 = 30° (puhelimen pystyruudulla
   kuvasuhteella skaalattuna kuten nyt). Pyrähdyksessä d kasvaa ennen
   kuin liuku ehtii perässä → kamera nousee ja kärki pysyy kuvassa;
   odotuksessa d → 0 ja kamera laskeutuu hitaasti 30°:een — tämä on
   se "hidas liike", jota odotusten aikana katsotaan (haarat kasvavat
   samaan aikaan kuvan reunoilla ja ulkopuolella). Aikavakiot τ = 2,5 s
   sijainti, 3,5 s korkeus (nyt 1,5 / 2,5) — pehmeämpi, koska kohde
   liikkuu itse.
3. **Kuvapysäkin kehystys:** kun kuvapysäkki i syttyy (ja 6 s sen
   jälkeen), kohde = kärjen ja pysäkin puoliväli ja W ≥ 2,2 × etäisyys
   + 12° — Al Wusta (1 745 km ≈ 16° → W ≈ 47°) ja Monte Verde (2 839 km
   → W ≈ 68°) mahtuvat, muut ovat jo kuvassa. Kuvakehyksen poksahdus
   näkyy siis aina ruudulla, eikä nuolta tarvita kuvapysäkeille;
   hiljaisilla pysäkeillä ei poksahda mitään, joten nuoli poistuu
   kokonaan.
4. **Loppu — peräytyminen koko pallon näkymään:** kun kärki on
   Monte Verdessä (14,1 ka; kello jatkaa Lapitan ja Aotearoan väleillä
   n. 10 s + Wairau Barin tauko), kohde siirtyy lopun keskipisteeseen
   (avoin kysymys 8.1; ehdotus lat 0°, lng 100°E) ja W kasvaa 110°:sta laudan koko leveyteen
   (PALLO_KORKEUS_MAX) 8 s:n ease-in-outilla: ruusunväriset nauhat
   piirtyvät Tongasta Havaijille, Rapa Nuille ja Aotearoaan tässä
   näkymässä, ja Wairau Barin kuva poksahtaa koko pallon kuvaan.
   Loppusanojen aikana kamera pysyy paikallaan (moottorin
   `sovitaKaareen` jää pois tällä kaarella, koska näkymä on jo koko
   pallo; osa vanoista on aina horisontin takana — ks. avoin kysymys
   8.1).
5. **Pelaajan ele** keskeyttää seuraamisen 8 s (ennallaan); reduced
   motion: kamera ei seuraa, alkunäkymä Jebel Irhoud ja loppu koko
   pallo (päätös 10).

Kello kulkee yhteen suuntaan koko ajan; kamera ei koskaan aja
"taaksepäin" ajassa, vain paikassa (Al Wustan kehystys vetää sitä
pohjoiseen, Monte Verden etelään).

## 4. Kuvat: kuusi esityksessä, neljätoista galleriassa

| # | pysäkki | vuosia sitten | miksi käänne | kärki kuvan hetkellä |
| --- | --- | --- | --- | --- |
| 1 | Jebel Irhoud | 300 000 | alku, ensimmäinen kotipesä, kamera lähtee tästä | 0 km |
| 5 | Al Wusta | 88 000 | lähtö Afrikasta: Arabia oli vihreä, retki näkyy sammuvana läikkänä, selkäranka odottaa Bab-el-Mandebissa (Skhul/Qafzeh 105 ka on sama tarina 17 000 v aiemmin ja kauempana kärjestä — galleriaan) | 1 745 km |
| 9 | Denisova | 50 000 | risteys: Siperian virta haarautuu Altailla (päätös 11), Eurooppa Bacho Kirosta 45 ka; kohtaaminen vanhan väestön kanssa juuri kun harmaa alkaa väistyä | 88 km |
| 17 | Beringia | 20 000 | ylitys uuteen maanosaan; Beringian odotus (32 → 17 ka) on kuvan alla | 144 km |
| 18 | Monte Verde | 14 500 | selkärangan pää: Alaskasta Chileen 2 600 vuodessa | 2 839 km |
| 20 | Wairau Bar | 750 | viimeinen suuri maa, finaali koko pallon näkymässä | (Tyynimeri) |

Hylätyt esityksestä (kaikki galleriaan): Madjedbebe 57,5 ka — aito
käänne (ensimmäinen merimatka), mutta Australian haaralla 9 000 km
kärjestä (kamera on Altailla); vana itse näyttää ylityksen samaan
aikaan kuvan reunalla. Yana 32 ka on selkärangalla, mutta seitsemäs
kuva ja Siperia saa jo Denisovan ja Beringian; Mal'ta ei ole pysäkki.
White Sands 22 ka on sisämaassa selkärangan ohi ja kiistelty — kiista
(kuva 22 ka, väri 15 ka, päätös 8) säilyy gallerian tekstissä.
Skhul/Qafzeh ks. taulukko. Loput (Omo, Pinnacle Point, Blombos, Lida
Ajer, Bacho Kiro, Lake Mungo, Tianyuan, Niah, Chauvet, Lapita) ovat
"täällä asuttiin jo" -pysäkkejä, eivät käänteitä.

**Hiljaiset pysäkit esityksessä.** Kello ja asteikko pysyvät
20 pysäkin mittaisina (kello ennallaan, tests/aikajana-virrat.test.mjs:n
mallitaulukko ei muutu). Hiljainen pysäkki (`hiljainen: true`, lippu
linssitiedostossa js/linssit/ihmisen-matka.js listasta
ESITYKSEN_KUVAT, ei datassa): ei pysäytä kelloa (aikajanaAskel: viive
0), ei korttia karusellissa (nauhassa on kuusi korttia), ei
kuvakehystä eikä paneelin vaihtoa, ei luentaa eikä välinäytöstä, ei
kameran ennakkoa; se merkitään pallolle pieneksi pisteeksi (liekin
sijaan, 6 px, virran sävy) kellon ohittaessa sen — ja pisteet jäävät
lopun koko pallon näkymään todisteiksi. Paikkarivi kellon vieressä ei
vaihdu hiljaisella pysäkillä.

**"Katso löydöt" — galleria loppusanoista.** Tiedeliite
(js/tiedeliite.js) on jo täsmälleen pyydetty galleria: kortti
kerrallaan, havainnekuva + löytökuva, juttu, lähderivi, ‹ edellinen |
seuraava ›, hampurilaisen sisällys, ristihäivytys, ei kelloa — ja
`avaaJuttu` käyttää sitä tällä kaarella jo nyt. Loppusanojen paneeliin
tulee nappirivi arkkikirjaston sanastolla: kullattu päänappi *Katso
löydöt* (avaa Tiedeliitteen pysäkistä 1 kaikkien 20 pysäkin
sisällyksellä) ja paperinappi *Sulje*. Tiedeliitteen sisällys
merkitsee esityksessä näytetyt kuusi (esim. ◈), jotta pelaaja näkee,
mitkä ohitettiin. Kortin napautus karusellissa esityksen aikana toimii
ennallaan (kuudelle kortille).

## 5. Tekstiehdotus (Fable päättää ja kirjoittaa lopulliset; data.js:ää ei muutettu)

**Avausteksti (IHMISEN_MATKA_ALOITUS), ehdotus:**

> Tulet seuraavaksi näkemään, miten yksi laji levisi yhdestä
> maanosasta kaikkiin. Kukaan ei suunnitellut matkaa: jokainen
> sukupolvi siirtyi vain vähän kauemmas kuin edellinen, ja tuhat
> sukupolvea myöhemmin oltiin toisella puolella maapalloa. Kartalle
> piirtyy yksi vana — todennäköinen pääreitti Afrikasta Arabian ja
> Keski-Aasian kautta Siperiaan, jäätä pitkin Alaskaan ja rannikkoa
> Chileen — ja sen rinnalle ohuemmat: sininen Eurooppaan, meripihka
> Intian rantoja Australiaan, ruusu saarelta saarelle Tyynellämerellä.
> Harmaa on vanha väestö, neandertalilaiset ja denisovalaiset, joka
> väistyy tulijoiden tieltä. Löytöpaikat ovat todisteita, eivät
> reitti: kuusi niistä näet matkalla, loput neljätoista voit katsoa
> esityksen jälkeen.

**Loppusanat (IHMISEN_MATKA_LOPPU), ehdotus:**

> Vanat ulottuvat nyt Marokon kukkulalta Tyynenmeren yli
> Uuteen-Seelantiin, ja pienet pisteet merkitsevät kaksikymmentä
> paikkaa, joista luu, jälki tai helmi on kertonut matkasta. Matkaan
> meni kolmesataatuhatta vuotta eikä yksikään kulkija tiennyt olevansa
> matkalla — jokainen vain siirsi leirinsä seuraavan rannan taakse.
> Reitti on todennäköinen, ei todistettu: Amerikkaan tulleissa oli
> myös Itä-Aasiasta pohjoiseen nousseita, ja Afrikassa ihmisiä asui
> monessa paikassa yhtä aikaa. Ihminen oli kiertänyt maapallon kerran
> jo kauan ennen kuin kukaan keksi laskea päiviä; Fogg teki saman
> uudelleen, kello kädessä.

**Muut tekstit:** loppusanojen napit *Katso löydöt* / *Sulje*;
kellon alle yksi rivi esityksen ajaksi: *todennäköinen pääreitti ·
haarat · löytöpaikat* (legenda, pieni harmaa kursiivi kuten
paikkarivi); Tiedeliitteen sisällyksen merkintä *näytettiin
esityksessä*. Laukun yksi rivi (IHMISEN_MATKA_ESITTELY, "kello juoksee,
valot syttyvät") jää Fablen harkintaan — "valot" ei enää kuvaa
linssiä; ehdotus: *"Ihmisen matka Afrikasta koko maapallolle: kello
juoksee, vana etenee."*

Huomio testeihin: tests/aikajana-virrat.test.mjs vaatii nykyisiä
lauseita (/Väri leviää kartalla samaa vauhtia kuin ihminen/, /Harmaa on
vanha väestö/, /^Koko maailma on nyt värissä/); kun Fable vaihtaa
tekstit, nämä kolme väitettä päivitetään samassa committissa —
mallitaulukkoon (saapumisajat) ei kosketa.

## 6. Erät Opus-parvelle

Jokainen erä on yksi Opus-agentti, yksi commit worktreessä origin/mainin
päällä, ei pushia, ei Raamattuun, ei dist/-kansiota, scratchpad omaan
alikansioon (tools/parvi/agentin-yhteiset-saannot.md). Portit joka
erässä: `node --test tests/*.test.mjs` (# fail 0), `node
tools/tarkista-kaksoisavaimet.mjs`, `node tools/tarkista-niputus.mjs`,
`node tools/tarkista-savukkeet.mjs`, `node tools/tarkista-nimiolimitys.mjs`,
`node tools/build-standalone.mjs`. **tests/aikajana-virrat.test.mjs:n
mallitaulukko (saapumisajat: Australia ennen Eurooppaa, Alaska 15–17 ka,
White Sands 14–16,5 ka, Madagaskar < 2 ka, jokainen pysäkki värjäytyy)
on portti, jota EI muuteta missään erässä** — jos vanat vaativat
mallin muutosta, se raportoidaan Fablelle. Riippuvuudet:

```
V0 maski ── V1 johdaVanat ──┬── V2 vanamoduuli (Line2) ── V3 kytkentä + kamera ──┐
                            └── (rinnakkain) V4 moottori: hiljaiset pysäkit, galleria ┴── V5 tekstit (Fable) + savuke + kuvakaappaukset
```

Tiedostot erittäin: V0 = tools/tee-maamaski.mjs,
js/linssit/ihmisen-matka-maamaski.js, tests/aikajana-virrat.test.mjs
(yksi väite); V1 = js/aikajana-virrat-laskenta.js,
js/linssit/ihmisen-matka-virrat.js, js/aikajana-virrat-tyo.js,
tests/aikajana-virrat.test.mjs (uudet testit); V2 = js/aikajana-vanat.js
(uusi), tests/aikajana-vanat.test.mjs (uusi), js/pallovektorit.js (yksi
export), sw.js, tools/build-standalone MODULES-järjestys; V3 =
js/aikajana-virrat.js, css/aikajana.css (nuoli pois, piste), tests;
V4 = js/aikajana.js, js/linssit/ihmisen-matka.js, css/aikajana.css
(nappirivi), tests/aikajana.test.mjs, tests/ihmisen-matka.test.mjs;
V5 = js/linssit/ihmisen-matka-data.js (vain Fable),
tools/savukkeet/savuke-aikajana.mjs, tools/savukkeet/README.md, docs.
V3 ja V4 koskevat kumpikin css/aikajana.css:ää eri kohdissa (V3 poistaa
.aikajana-virta-nuoli-lohkon ja lisää .aikajana-virta-piste, V4 lisää
.aikajana-loppu-napit) — rinnakkain sallittua, cherry-pick ratkeaa.
Toisen agentin korjaus "kalvo laattakerroksen alla" (avoin vika 2)
koskee js/pallolauta/linssit.js:ää ja/tai js/pallolaatat.js:ää — V2/V3
eivät koske niihin; vanhan väestön kalvo hyötyy korjauksesta, muttei
riipu siitä.

### V0 — Maski: Bab-el-Mandebin diagonaalivuoto kiinni

```
TEHTÄVÄ V0 (Opus, yksi commit, worktree origin/mainin päällä): sulje
Ihmisen matka -maamaskin Bab-el-Mandebin diagonaalivuoto. Lue ensin
CLAUDE.md, docs/roolitus.md, tools/parvi/agentin-yhteiset-saannot.md,
docs/moduulit/ihmisen-matka-vanat.md luku 2.1.3 ja
docs/moduulit/ihmisen-matka-virrat.md luvut 3 ja 5.1, sitten
tools/tee-maamaski.mjs (ESTOT, LISAYKSET, tarkistuspisteet) ja
tests/aikajana-virrat.test.mjs (testi "maamaski: tunnetut pisteet" ja
"koko kaari").

VIKA: Punainenmeri on maskissa 13,0–13,5°N:llä yhden ruudun levyinen,
ja laskennan 8-naapurusto ylittää sen diagonaalisti ruudusta (13,0°N,
42,5°E) ruutuun (13,5°N, 43,0°E). Mitattu: Jemenin Tihama (13,0°N,
43,7°E) värjäytyy 179 513 vuotta sitten, Djibouti 184 274 — ylityksen
ikkuna 78–55 ka ei toteudu. Todenna ensin itse (pieni skripti
scratchpadissa: laskeKentat oikealla datalla, lahinMaa + aika Tihamassa).

TEE: lisää tools/tee-maamaski.mjs:n ESTOIHIN Bab-el-Mandebin
pohjoispuolen ruutu (13,5°N, 43,0°E) ja tarvittaessa (13,0°N, 43,0°E)
niin, ettei Afrikan ja Arabian maaruuduilla ole 8-naapuruutta
Bab-el-Mandebissa 11–14°N:llä (tulosta tarkistus: jokaiselle Afrikan
puolen rannikkoruudulle 11–14°N ei yhtään Arabian puolen naapuria).
Aja työkalu, jolloin js/linssit/ihmisen-matka-maamaski.js päivittyy
(juoksut ja peitot). Lisää tests/aikajana-virrat.test.mjs:n "koko
kaari" -testiin väite: Tihama (13,0°N, 43,7°E) saapumisaika ≤ 78 000
ja ≥ 55 000 (ylitys ikkunassa), ja Djibouti > 150 000 (Afrikan puoli
ennallaan). ÄLÄ muuta mitään muuta mallitaulukon väitettä äläkä
virtadataa (js/linssit/ihmisen-matka-virrat.js).

TODENNUS: ennen/jälkeen-taulukko raporttiin: Djibouti, Tihama, Jemen
(15°N, 44°E), Oman (17,5°N, 55°E), Levantti (32,7°N, 35°E), Alaska
(65°N, −164,5°E), White Sands, Madjedbebe — kaikki muut kuin Jemenin
kolme saavat pysyä ±1 % ennallaan. Maskin maaruutujen määrä ennen/
jälkeen (ero ≤ 2). Portit kuten yllä. Muutoslokirivi ≤ 60 mrk ehdotus:
'Ihmisen matka: Bab-el-Mandebin esto pitaa'. Raportti Fablelle:
commit-SHA, taulukko, porttien tulokset.
```

### V1 — Laskenta: edeltäjäketju ja johdaVanat

```
TEHTÄVÄ V1 (Opus, yksi commit, worktree V0:n päällä tai origin/main jos
V0 on jo mainissa): johda vanat saapumisaikakentästä. Lue ensin
CLAUDE.md, docs/roolitus.md, tools/parvi/agentin-yhteiset-saannot.md,
Raamattu (rivi "IHMISEN MATKA ON VARIVIRTOJA" → "VIRRAT VANOINA"),
docs/moduulit/ihmisen-matka-vanat.md luvut 1–2 kokonaan,
js/aikajana-virrat-laskenta.js kokonaan, js/linssit/ihmisen-matka-virrat.js,
js/aikajana-virrat-tyo.js ja tests/aikajana-virrat.test.mjs.

TOTEUTA js/aikajana-virrat-laskenta.js:ään:
1. laskeVirta palauttaa lisäksi `edeltaja` (Int32Array, −1 = lähde tai
   nauha) ja `nauhaPiste` (Int32Array: nauhan pisteindeksi tai −1) ja
   `nauhaNro`: kirjaa(i, t, mista) tallettaa edeltäjän aina kun tau
   paranee; nauhan rasterointi merkitsee pisteen (u < 0,5 → k, muuten
   k + 1). Ylityksen b:n edeltäjä on a. Ei muuta käytösmuutosta:
   `aika`- ja `meri`-kentät ovat tavulleen samat kuin ennen (todenna
   testillä, joka vertaa vanhaa ja uutta tulosta synteettisellä
   ruudukolla — deepEqual).
2. laskeKentatVaiheittain kuljettaa virtakohtaiset edeltäjätaulut ja
   lahteetToisesta-siirtymät (kohderuutu → { virta, lukupiste })
   valmiiseen tulokseen (`kentat.edeltajat`, `kentat.siirtymat`).
3. export function johdaVanat(kentat, aineisto, { maa, leveys, korkeus })
   → [{ tunnus, virta, paksuus, pisteet: [[lat, lon, aika]…] }],
   selkäranka ensin. Sääntö luvun 2.1 A mukaan: päätepisteestä
   (lahinMaa, säde 4) edeltäjäketjua lähteeseen; nauhan ruudussa nauhan
   pisteet taaksepäin alkuun ja jatko alun ruudun edeltäjästä (tai
   lähimmästä ei-nauharuudusta, jonka aika ≥ nauhan alku, säde 8);
   siirtymässä toisen virran lukupisteeseen; virran omassa lähteessä
   päävirran lähimpään vanhempaan ruutuun (säde 8) — ellei virta ole
   päävirta. Sitten yksinkertaistus: Douglas–Peucker aineiston dpKm
   (60), aikatihennys (raakapisteitä takaisin väliin, jos säilytettyjen
   kärkien aikaväli > aikaV (1 500) tai > aikaOsuus (0,06) × vanhempi
   aika), Chaikin `chaikin` (2) kierrosta ajat lineaarisesti, ajat
   monotonisiksi laskeviksi. Haaran katkaisu: haara alkaa
   ensimmäisestä kärjestä, joka on > haaranEroKm (100) päässä kaikista
   aiemmin johdetuista paksummista vanoista; yksi edeltävä kärki jää
   liitokseksi. Tyynenmeren nauhat lisätään sellaisinaan (pisteet
   [lat, lon, aika]) paksuudella 2. Kotipesät palautetaan erikseen
   `{ kotipesat: [{ tunnus, lat, lon, aika, sade }] }` pysäkkidatasta
   (aika = pysäkin vuosiaSitten).
4. js/linssit/ihmisen-matka-virrat.js: export const IHMISEN_MATKA_VANAT
   täsmälleen luvun 2.2 muodossa (päätepisteet, paksuudet, kotipesät,
   yksinkertaistus). js/linssit/ihmisen-matka.js: kaari.virrat saa
   kentän `vanat: IHMISEN_MATKA_VANAT`.
5. js/aikajana-virrat-tyo.js: Worker laskee kentät, sitten johdaVanat,
   ja lähettää `{ kentat: { aika, virta }, vanat, kotipesat, vanha:
   Float32Array (laatikkoPehmea 720 × 360), retki }` — tarkennaKentat
   ja `tarkka` jäävät pois viestistä, ELLEI kutsuja pyydä
   `kalvo: true` (perääntymistie, ks. V3). Pääsäikeen varapolku
   (luoVirrat laskePaasaikeessa) sama.
6. Testit tests/aikajana-virrat.test.mjs (uusi osio 8 "vanat"):
   (a) edeltäjä synteettisellä 12 × 6 -ruudukolla: ketju lähteestä
   saareen kulkee ylityksen a → b kautta; (b) nauhan ruudun nauhaPiste
   oikea; (c) johdaVanat oikealla datalla: selkäranka alkaa Omosta
   (±1°), kulkee ≤ 150 km päästä Tšuktšien lukupisteestä (66°N,
   −176°E) ja Sewardista (65°N, −164,5°E) ja päättyy Monte Verdeen;
   ajat monotonisesti laskevia jokaisessa vanassa; kärkien kokonaismäärä
   800–3 000; selkäranka 200–500 kärkeä; haarat eivät ala samasta
   ruudusta kuin selkäranka (katkaisu toimii: australia-haaran
   ensimmäinen kärki on > 100 km selkärangasta); Tyynimeri 7 vanaa;
   (d) kotipesät 3 kpl pysäkkien ajoilla. Mallitaulukon väitteet
   ennallaan.

EI SAA MUUTTAA: laskeVirtan aika- tai meri-tulosta, virtadatan
nopeuksia, portteja, ylityksiä (V0:n maskikorjaus on jo mainissa tai
V0:n worktreessä), js/aikajana-virrat.js:ää (V3), js/aikajana.js:ää (V4).

TODENNUS: `node --test tests/aikajana-virrat.test.mjs` läpi; kirjaa
raporttiin johdaVanatin kesto Nodessa (odotus 20–60 ms), vanojen
kärkimäärät taulukkona (kuten suunnitelman 2.1) ja selkärangan
avainpisteiden ajat (Djibouti, Tihama, Altai, Tšuktšit, Seward, Monte
Verde). Piirrä scratchpadiin tasokarttakuva vanoista (suunnitelman
vanat-koe.mjs:n PNG-koodi on kopioitavissa scratchpadista
scratchpad/vanat/ jos se on vielä olemassa; muuten oma) ja KATSO se —
liitä polku raporttiin. Portit kuten yllä. Muutoslokirivi ehdotus:
'Ihmisen matka: vanat johdetaan kentasta'.
```

### V2 — Vanamoduuli: Line2-viivat pallolla (V1:n jälkeen; rinnakkain V4:n kanssa)

```
TEHTÄVÄ V2 (Opus, yksi commit, worktree V1:n päällä): uusi moduuli
js/aikajana-vanat.js, joka piirtää vanat pallolle Line2-viivoina ja
kasvattaa niitä kellon mukaan. Lue ensin CLAUDE.md, docs/roolitus.md,
tools/parvi/agentin-yhteiset-saannot.md, Raamattu ("VIRRAT VANOINA",
"KAIKKI LIIKE ANIMOIDAAN PEHMEASTI"), docs/moduulit/ihmisen-matka-vanat.md
luvut 2.3–2.4, js/pallovektorit.js KOKONAAN (Line2-luokkien löytö
line2Luokat, materiaalit, resolution, syvyysjärjestys, häive),
js/pallolauta/reitit.js (`jalki`: kasvu katkoviivalla),
js/aikajana-virrat-laskenta.js (ruudunTila, virranVari, rintamanLeveys)
ja docs/moduulit/pallon-vektoriviivat.md luvut 2.2–2.3 (mittaukset).

TOTEUTA js/aikajana-vanat.js:
1. export function luoVanat({ pallo, lauta, reitit, vanat, kotipesat,
   virrat, peitto, reduced }) → { paivita(nyt), karki(nyt), pura(),
   valmis (lupaus), tila() }. Luokat: js/pallovektorit.js:stä
   exportataan line2Luokat (yksi rivi: `export function line2Luokat`)
   — sama nollamittaisen polun temppu reitit.aseta('vanat-luokat', …)
   kuin vektorikerroksessa, jos scenessä ei vielä ole Line2:ta.
2. Jokaiselle vanalle: LineGeometry pallon pinnalle säteellä
   R × (1 + VANAN_KORKEUS 0,0005) (pallo.getCoords tai pallonPiste),
   computeLineDistances; rinnalle Float32Array `matka` (kumulatiivinen
   maailmamatka kärjittäin) ja `aika`. LineMaterial: worldUnits false,
   transparent, depthWrite false, depthTest true, polygonOffset −12,
   resolution kotelon css-mitat (päivitys resizessa), linewidth =
   vanan paksuus css-px (VANAN_PAKSUUS_PAA 4, HAARA 2,5, MYOHAINEN 2 —
   aineiston `paksuus`), vertexColors true, dashed true, gapSize 1e6.
   renderOrder VANAN_RENDER_ORDER 0,6; raycast tyhjä.
   Kaista: sama geometria toisella materiaalilla: opacity
   KAISTAN_PEITTO 0,14, linewidth kaistanLeveysPx(kamera) = clamp(250 km
   / (km per css-px ruudun keskellä), 10, 40), renderOrder 0,5, ei
   vertexColorsia (virran `vanha`-sävy).
3. paivita(nyt): jokaiselle vanalle dashSize = matka(nyt)
   (interpolointi aika[k] ≥ nyt ≥ aika[k+1]; 0 jos nyt > aika[0]);
   kärkivärit: väri[k] = vanha + (rintama − vanha) × w, w = max(0, 1 −
   (aika[k] − nyt) / rintamanLeveys(nyt)); virranVari(virta.vari, nyt)
   antaa sävyt (Amerikkojen liuku toimii); puskuri päivitetään vain,
   kun nyt muuttui (≤ 12 Hz kutsujalta; reduced 500 ms askelin).
   Kotipesät: kolme laikkaa pallolle — tee ne SAMALLA kalvomekanismilla
   kuin vanha väestö (V3: yksi 720 × 360 -kangas, kerran maalattu;
   kotipesän kirkkaus kellon mukaan on tässä vaiheessa vakio) TAI
   Line2-renkaana (24 kärkeä, leveys kaistan tapaan) — valitse rengas,
   jos se näyttää hyvältä kuvakaappauksessa; kirjaa valinta.
4. karki(nyt): selkärangan kärjen { lat, lng } + ennakko (luku 3.2
   kohta 1) kameralle (V3 käyttää).
5. pura(): geometriat, materiaalit, oliot pois; valmis-lupaus ratkeaa
   kun luokat on saatu ja viivat rakennettu.
6. sw.js SHELL: './js/aikajana-vanat.js' heti './js/aikajana-virrat.js':n
   jälkeen; tools/build-standalone MODULES: riippuvuus ennen tuojaansa
   (tarkista-niputus valvoo).
7. Testit tests/aikajana-vanat.test.mjs (uusi): puhtaat apurit
   exportteina ja testattuina Nodessa ilman DOM:ia: matkaHetkella(matka,
   aika, nyt) (interpolointi, rajat), karkivarit(aika, nyt, vari) (w = 1
   kärjessä, 0 hännässä, rintamanLeveys), kaistanLeveysPx (250 km →
   10–40 px rajat), selkarangan karki(nyt) (Omo alussa, Monte Verde
   lopussa, monotoninen km); tekstitestit: pallovektorit.js exporttaa
   line2Luokat, sw.js SHELL sisältää moduulin, materiaalin asetukset
   (depthWrite false, polygonOffsetUnits −12, worldUnits false).

EI SAA MUUTTAA: js/aikajana-virrat.js (V3 kytkee), js/aikajana.js (V4),
js/pallolauta/linssit.js ja js/pallolaatat.js (toinen agentti korjaa
kalvon syvyysjärjestystä), pallovektoritin mitään muuta kuin yhtä
export-sanaa.

TODENNUS: koska moduulia ei vielä kutsuta pelistä, todenna selaimessa
scratchpad-skriptillä (malli: suunnitelman mittaa-vanat.mjs luvussa 9 —
avaa peli ?lauta=pallo Playwrightilla, avaa Ihmisen matka, kutsu
luoVanat sivun kontekstissa dynaamisella importilla ja paivita(nyt)
kolmella hetkellä 60 / 16 / 1 ka) ja KATSO kuvakaappaukset puhelin
390 × 844 dpr 2 ja työpöytä 1280 × 800: vana kärkeen asti, kärki
kirkas, kaista näkyy mutta ei peitä rantaviivaa, ei viivaa pallon
takapuolelta läpi. Mittaa rAF-kehysvälit (p50/p95) kalvo piilotettuna
ja vanat esillä vs. ilman vanoja; kirjaa taulukkona. Portit kuten yllä.
Muutoslokirivi ehdotus: 'Ihmisen matka: vanamoduuli Line2-viivoina'.
```

### V3 — Kytkentä ja kamera (V2:n jälkeen)

```
TEHTÄVÄ V3 (Opus, yksi commit, worktree V2:n päällä): kytke vanat
esitykseen ja anna kameralle selkäranka. Lue ensin CLAUDE.md,
docs/roolitus.md, tools/parvi/agentin-yhteiset-saannot.md, Raamattu
("VIRRAT VANOINA", "AIKAJANAN AJO", "KAIKKI LIIKE ANIMOIDAAN
PEHMEASTI"), docs/moduulit/ihmisen-matka-vanat.md luvut 2.3–3
kokonaan, js/aikajana-virrat.js KOKONAAN, js/aikajana-vanat.js (V2),
js/pallolauta/kamera.js (ajaKamera, korkeusLeveydesta, nakyvaAlue),
js/pallolauta/linssit.js (kalvo, haivyta) ja tests/aikajana-virrat.test.mjs.

TOTEUTA js/aikajana-virrat.js:ssä:
1. luoVirrat: Worker/pääsäie antaa kentät + vanat + kotipesät + vanhan
   väestön maskin (V1). Kalvo: yksi 720 × 360 -kangas maalataan KERRAN
   (vanha väestö harmaana laatikkoPehmea-painolla ja retki-läikkä
   omalla värillään, virrat EIVÄT maalaudu kankaalle) → linssit.kalvo;
   kellon mukaan säädetään vain materiaalin peittoa: vanha väestö
   VIRRAN_PEITTO.vanha × haipy (46 → 40 ka), retki 125 → 78 → 70 ka
   sammuen — kaksi kalvoa (kaksi materiaalia), ei uudelleenmaalausta.
   Kehyksittäinen maalaa/tarkennaKentat-polku jää lipun
   `?virrat=kalvo` (js/ui-apurit.js:n tapaan) taakse perääntymistieksi;
   oletus on vanat. VIRTOJEN_PAIVITYS_MS-tahdissa kutsutaan
   vanat.paivita(nyt).
2. Kamera luvun 3.2 mukaan: kohde = vanat.karki(nyt) ennakolla; leveys
   W = clamp(30° + 2,2 × d, 30°, 110°) × kuvasuhdekerroin, d =
   kulmaetäisyys povista kohteeseen; aikavakiot KAMERAN_TAU_SIJAINTI
   2,5, KAMERAN_TAU_KORKEUS 3,5; kuvapysäkin kehystys 6 s syttymisestä
   (kohde puoliväli, W ≥ 2,2 × etäisyys + 12°); loppu: kun kärki on
   perillä (matka(nyt) ≥ selkärangan pituus), kohde (5°, −165°) ja W →
   koko lauta 8 s ease-in-outilla; ajo.loppu-tilassa kamera ei liiku
   (moottorin sovitaKaareen ohitetaan tällä kaarella: ohjaaKameraa
   palauttaa tosi myös lopussa, ja lopeta() kysyy sitä ennen
   sovitaKaareen-kutsua — pieni muutos js/aikajana.js:n lopeta():iin
   sallitaan tässä, V4 ei koske samaan riviin). rintamienPainopisteet
   ja PAINON_TASOITUS jäävät pois kamerasta (funktio säilyy
   laskentamoduulissa testeineen).
3. Kuvakehykset vain pysäkeille, joilla EI ole `hiljainen`-lippua
   (V4 asettaa; puuttuva lippu = kaikki poksahtavat kuten nyt);
   hiljaiselle pysäkille pieni piste lampun tilalle
   (.aikajana-virta-piste, 6 px, virran sävy, ilmestyy 240 ms
   häiveellä). Nuoli (.aikajana-virta-nuoli, paivitaNuoli) poistetaan
   kokonaan koodista ja css:stä.
4. tila() antaa mittareita savukkeelle: vanoja, karki, kalvoja,
   maalattuKerran (kertoja ≤ 2 koko ajossa), kameranLeveys.
5. Testit tests/aikajana-virrat.test.mjs osio 7 päivitetään
   tekstitasolla: maalaa-kutsua ei ole silmukassa oletuspolulla,
   `vanat.paivita(` on; nuolta ei ole; kalvoja ≤ 2; ohjaaKameraa; ja
   puhdas funktio kameranKohde({ karki, pov, kuvapysakki, loppu }) →
   { lat, lng, leveys } testataan Nodessa (nousu kärjen karatessa,
   lasku odotuksessa, kehystys, loppu).

EI SAA MUUTTAA: js/aikajana.js muualta kuin lopeta():n yhdeltä riviltä,
js/aikajana-vanat.js:n rajapintaa, laskentaa, js/pallolauta/*.

TODENNUS: NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-aikajana.mjs
--lauta pallo ennallaan (keksinnöt) ja scratchpad-ajo Ihmisen matkalla
(malli: mittaa-vanat.mjs luvussa 9): kuvakaappaukset puhelin 390 × 844
dpr 2 hetkiltä 300 ka (Jebel Irhoud), 88 ka (Al Wustan kuva ja kärki
samassa kuvassa), 50 ka (Denisova), 20 ka (Beringia), 15 ka (rannikko),
loppu (koko pallo, Tyynimeri keskellä, Wairau Barin kuva) + työpöytä
1280 × 800 samat — KATSO kuvat. Mittaa: rAF p50/p95 Aasian vaiheessa
vanoilla vs. `?virrat=kalvo` (suunnitelman 2.3 taulukon vertailuluvut);
kameran leveys ajan funktiona (loki 1 Hz) — ei hyppyjä: peräkkäisten
sekuntien leveyden suhde ≤ 1,35 ja sijainnin muutos ≤ 12°/s; kalvon
maalauksia koko ajossa ≤ 2. Portit kuten yllä. Muutoslokirivi ehdotus:
'Ihmisen matka: vanat ja selkarankakamera palloon'.
```

### V4 — Moottori: hiljaiset pysäkit, kuusi korttia, "Katso löydöt" (rinnakkain V2–V3:n kanssa)

```
TEHTÄVÄ V4 (Opus, yksi commit, worktree origin/mainin päällä): esitys
näyttää kuusi kuvaa, loput neljätoista selataan galleriasta. Lue ensin
CLAUDE.md, docs/roolitus.md, tools/parvi/agentin-yhteiset-saannot.md,
Raamattu ("VIRRAT VANOINA", "Arkkikirjasto: pop-upien yhteinen kieli"
— nappien kolme roolia, "KAIKKI LIIKE ANIMOIDAAN PEHMEASTI"),
docs/moduulit/ihmisen-matka-vanat.md luku 4, js/aikajana.js
(aikajanaAskel, rakenna → kortit, asettele/karusellinPaikat, sytyta,
tarkistaEnnakko/aloitaEnnakko, tarkistaKameraEnnakko, lopeta,
vaihdaPaneeli, avaaJuttu, siirry, napautaKorttia), js/tiedeliite.js
(avaaTiedeliite, sisällys), js/linssit/ihmisen-matka.js,
tests/aikajana.test.mjs ja tests/ihmisen-matka.test.mjs.

TOTEUTA:
1. js/linssit/ihmisen-matka.js: export const ESITYKSEN_KUVAT =
   ['jebel-irhoud', 'al-wusta', 'denisova', 'beringia', 'monte-verde',
   'aotearoa']; ihmisenMatkanPysakit lisää jokaiselle pysäkille
   `hiljainen: !ESITYKSEN_KUVAT.includes(t.tunnus)`. Datatiedostoa
   js/linssit/ihmisen-matka-data.js EI muuteta (Fable omistaa tekstit).
2. js/aikajana.js: (a) aikajanaAskel: hiljaisen pysäkin viive on 0
   (`seuraava.paalu ? paaluMs : seuraava.hiljainen ? 0 : viiveMs`),
   syttyi palautetaan yhä; (b) sytyta(i) hiljaiselle: lamppu/piste
   (asetaValonTila), reitti, virrat?.sytyta (V3 päättää kehyksestä
   lipun perusteella), valmistaSeuraavat — EI paneelin vaihtoa,
   paikkariviä, luentaa, välinäytöstä, kameran ajoa eikä karusellin
   liikettä; (c) karuselli: kortit rakennetaan vain ei-hiljaisille
   pysäkeille ja karusellinPaikat saa "näkyvän järjestysnumeron"
   (uusi puhdas apuri nakyvaJarjestys(tapahtumat) → Map pysäkki-indeksi
   → korttinumero; nykyinen kortti on viimeisin ei-hiljainen pysäkki ≤
   tila.i); ennakko (tarkistaEnnakko, aloitaEnnakko) ja kameran
   ennakko (tarkistaKameraEnnakko) kohdistuvat seuraavaan
   EI-hiljaiseen pysäkkiin; (d) siirry(i) hiljaiselle pysäkille on
   sallittu näppäimistöltä mutta karuselli näyttää edellisen
   ei-hiljaisen kortin; napautaKorttia toimii kuudella kortilla;
   (e) lopeta(): loppusanojen paneeliin nappirivi (arkkikirjasto:
   kullattu päänappi 'Katso löydöt' → avaaTiedeliite(ui, tapahtumat,
   0, …) ja paperinappi 'Sulje' → ui.pysaytaAikajana), vain kaarella,
   jolla on hiljaisia pysäkkejä (keksinnöt ennallaan); paikkarivi
   lopussa "<jakso> · 20 löytöpaikkaa" (ei "valoa") tällä kaarella —
   toteuta kaaren kentällä `laskuri: 'löytöpaikkaa'` tms., jotta
   keksintöjen "valoa" säilyy; (f) js/tiedeliite.js: sisällyksen
   rivi saa merkin ◈ pysäkille, joka ei ole hiljainen (title
   "näytettiin esityksessä") — vain jos tapahtumilla on hiljainen-lippu.
3. css/aikajana.css: .aikajana-loppu-napit (nappirivi paneelin
   alareunassa, arkkikirjaston tyylipohja), ei muuta.
4. Testit: tests/aikajana.test.mjs: aikajanaAskel hiljaisella
   pysäkillä ei viivytä ja syttyi tulee; nakyvaJarjestys; tekstitestit
   sytytan haaralle. tests/ihmisen-matka.test.mjs: ESITYKSEN_KUVAT on
   täsmälleen kuusi tunnusta, kaikki pysäkkidatasta, ja
   ihmisenMatkanPysakit merkitsee 14 hiljaiseksi. tests/aikajana-virrat.test.mjs:n
   mallitaulukkoon EI kosketa.

EI SAA MUUTTAA: js/aikajana-virrat.js, js/aikajana-vanat.js,
js/aikajana-virrat-laskenta.js, js/linssit/ihmisen-matka-data.js,
keksintökaaren käytöstä (tests/aikajana*.test ja savuke-aikajana
keksinnöillä pysyvät vihreinä), kellon asteikkoa tai tahtia.

TODENNUS: NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-aikajana.mjs
--lauta pallo (keksinnöt: samat OK-rivit kuin ennen) ja scratchpad-ajo
Ihmisen matkalla nopeutetulla tahdilla (savukkeen paikkaustapa):
esitys päättyy, kortteja nauhassa 6, kello pysähtyi täsmälleen 6
kertaa (laske sytyta-kutsujen viiveet), loppusanoissa nappi 'Katso
löydöt' avaa Tiedeliitteen ja sen sisällyksessä on 20 riviä, joista 6
merkittyä; kuvakaappaus loppusanoista puhelinkoossa — KATSO. Kirjaa
esityksen kesto nopeutetulla tahdilla ennen/jälkeen. Portit kuten yllä.
Muutoslokirivi ehdotus: 'Ihmisen matka: kuusi kuvaa, loydot galleriaan'.
```

### V5 — Tekstit (Fable), savuke ja kuvakaappaukset omistajalle (V3 + V4:n jälkeen)

```
TEHTÄVÄ V5 (Opus, yksi commit, worktree V3:n ja V4:n päällä; TEKSTIT
Fable kirjoittaa data.js:ään itse ennen tätä tai samassa
committissa — Opus ei kirjoita tarinatekstiä): savuke ja
kuvakaappaukset. Lue ensin CLAUDE.md, docs/roolitus.md,
tools/parvi/agentin-yhteiset-saannot.md, docs/moduulit/ihmisen-matka-vanat.md
luvut 3–5, tools/savukkeet/savuke-aikajana.mjs kokonaan ja
tools/savukkeet/README.md.

TEE: savuke-aikajana.mjs saa haaran `--linssi ihmisen-matka` (oletus
keksinnot ennallaan): pallolla laukusta, Käynnistä odottaa vanat
(virrat.valmis), väitteet: vanamoduuli tila().vanoja ≥ 15; kalvon
maalauksia ≤ 2; kortteja 6; kello pysähtyy 6 kertaa; kameran leveys
ei hyppää (peräkkäisten näytteiden suhde ≤ 1,35); kuvakehyksiä
lopussa 6 ja pisteitä 14; loppusanoissa 'Katso löydöt' avaa
Tiedeliitteen (20 riviä, 6 merkittyä); Sulje purkaa kaiken; ei
sivuvirheitä. Kuvakaappaukset KAAPPAUKSET-kansioon: puhelin 390 × 844
dpr 2 ja työpöytä 1280 × 800 hetkiltä 300 / 88 / 50 / 20 / 15 ka ja
loppu (koko pallo) + loppusanat + galleria. README-rivi. Jos Fable on
vaihtanut tekstit, tests/aikajana-virrat.test.mjs:n kolme
tekstiväitettä päivitetään uusiin lauseisiin (mallitaulukkoon ei
kosketa). docs/moduulit/ihmisen-matka-vanat.md luku 7: "Toteutettu"
— mitatut luvut V0–V5 taulukkona.

TODENNUS: savuke läpi pallolla kummallakin linssillä; node
tools/tarkista-savukkeet.mjs; kuvat KATSOTTU ja polut raportissa —
omistaja arvioi ne ennen julkaisua (Raamattu: "omistaja arvioi
kuvakaappaukset ennen hiontaa"). Muutoslokirivi ehdotus: 'Ihmisen
matka: savuke ja kuvat vanoille'.
```

## 7. Toteutettu (mitatut luvut)

Erät V0–V4 ovat mainissa (v1658, kuusi committia), V5 tämän jälkeen.
Luvut ovat kunkin erän omista mittauksista. SELAINMITTAUKSET ON AJETTU
KONTIN OHJELMISTO-WebGL:LLÄ, joka piirtää pallon 0,5–1,5 kehystä
sekunnissa — ne ovat suhteellisia, eivät laitelukuja. Ennusteet ovat
luvuissa 2–4.

| Erä | Mitta | Ennen | Jälkeen |
| --- | --- | --- | --- |
| V0 maski | Tihama (13,0°N, 43,7°E) | 179 513 v. sitten | 77 500 (ylitys ikkunassa 78–55 ka) |
| V0 | Jemen (15°N, 44°E) | 173 060 | 77 262 |
| V0 | Djibouti / Oman / Levantti / Alaska / White Sands / Madjedbebe / Monte Verde / Madagaskar | — | 184 274 / 75 511 / 71 804 / 16 700 / 15 175 / 62 384 / 14 131 / 1 220 (ennallaan) |
| V0 | maskin maaruutuja | 62 065 | 62 064 |
| V1 laskenta | johdaVanat Nodessa | — | 31–76 ms |
| V1 | vanoja / kärkiä | — | 17 / 974 |
| V1 | selkäranka | — | 276 kärkeä, 30 830 km Omosta Monte Verdeen |
| V1 | vana-aineiston JSON | — | 22 kt |
| V1 | selkärangan avainpisteet (v. sitten) | — | Oman 75 515, Altai 52 242, Tšuktšit 31 494, Seward 17 681, Monte Verde 14 134 |
| V2 vanamoduuli | piirtokutsut / kolmiot (vanat pois → esiin) | — | +12–13 / +8 100 |
| V2 | kehysväli p50 puhelin / työpöytä | 1 650 / 1 133 ms | 1 500 / 1 150 ms (ero mittausvirheen sisällä) |
| V2 | laskenta selaimessa | — | 320–510 ms + johdaVanat 21–50 ms |
| V3 kytkentä | kalvon maalauksia koko ajossa | joka kehys | 2 |
| V3 | kalvoja (kerran maalattua) | — | 2: vanha väestö ja varhaisten retkien läikkä |
| V3 | vanoja / kuvakehyksiä esityksessä | — | 17 / 20 (ennen V4:ää) |
| V4 moottori | kortteja nauhassa | 20 | 6 |
| V4 | kellon pysähdyksiä | 20 | 6 (kaikki 20 pysäkkiä syttyvät yhä) |
| V4 | esityksen kesto (savukkeen nopeutettu tahti) | 119,5 s | 84,4 s |
| V4 | gallerian sisällys | — | 20 riviä, 6 merkittyä (◈) |
| V5 savuke | `savuke-aikajana --linssi ihmisen-matka` | — | 18/18 läpi (9 väitettä × puhelin ja työpöytä) |
| V5 | vanoja / kuvakehyksiä / pisteitä lopussa | — | 17 / 6 / 14 (sama DOMista laskettuna) |
| V5 | kalvoja / maalauksia koko ajossa | — | 2 / 2 |
| V5 | kellon pysähdyksiä / syttyneitä pysäkkejä | — | 6 / 20 |
| V5 | kameran leveys: peräkkäisten KEHYSTEN suhde | — | 1,20 puhelin, 1,16 työpöytä (raja 1,35) |
| V5 | kameran leveys: sekunnin ruudukossa | — | 1,42 puhelin, 1,33 työpöytä |
| V5 | vanojen laskenta selaimessa (linssin auetessa) | — | 2,3–2,5 s työsäikeessä |
| V5 | esityksen kesto ilman kuvataukoja | — | 30,1 s puhelin, 27,9 s työpöytä (kehysväli 0,55 / 0,48 s) |
| V5 | kuvakaappauksia | — | 9 näkymää kohti (18 kpl) |

**Poikkeama suunnitelmasta: kameran 1,35.** Luku 3.2 lupaa, ettei
näkyvä leveys muutu sekunnissa kerrointa 1,35 enempää. Toteutuneella
kameralla katto on suurempi kuin luku: korkeus liukuu logaritmisesti
aikavakiolla 3,5 s, joten kohteen heilahtaessa lähikuvasta kattoon
(30° → 110°, juuri se on sääntö "kamera nousee ja kärki pysyy
kuvassa") leveys kertautuu sekunnissa 3,67^(1−e^(−1/3,5)) ≈ 1,38.
Mitattu puhelimella 1,42–1,44. LIIKE ON SILTI JATKUVAA: peräkkäisten
kehysten suhde on vain 1,21, eli kamera ei hyppää vaan kiipeää
liu'ullaan. Savukkeen tiukka vartio on siksi kehysten välinen suhde
(1,35) ja sekuntivauhdille jää liu'un oma katto. Erän V3 vihreä 1 Hz
-mittaus selittyy sillä, että kontissa setInterval(1000) ehti kulkea
vain 18 kertaa koko ajossa — näytteet olivat kahdeksan sekunnin
päässä toisistaan ja tasoittivat vauhdin. Jos omistaja haluaa
kirjaimellisen 1,35:n, se on kameran aikavakion (3,5 s → n. 5 s) tai
leveyskaton (110° → n. 90°) muutos, ei mittarin.

**Kuvahetkien tarkkuus.** Savuke pysäyttää kellon sivun sisällä yhden
kehyksen tarkkuudella, mutta nopeutetulla tahdilla kello ehtii
kehyksessä koko pysäkkivälin yli (askel katossa 200 ms, väli n. 60
ms). Hetki 15 ka osuu siksi käytännössä Monte Verden saapumiseen
(14 500 v. sitten); savukkeen INFO-rivi kertoo aina, mihin lukemaan
kuva otettiin.

**Kuvista havaittua (V5, omistajan arvioitavaksi).** Kaikki 18
kaappausta on katsottu; nämä eivät estä julkaisua, mutta ne näkyvät
kuvissa:

1. **Kaistan jänteet erottuvat.** Lähikuvassa (Denisova 50 ka,
   Beringia 20 ka) kaista piirtyy ketjuna vinoja suorakaiteita, joiden
   liitokset näkyvät reunoina — Line2 ei häivytä reunaansa (luku 8,
   ensimmäinen kohta). Kauempaa (loppunäkymä) ilmiö katoaa.
2. **Varhaisten retkien läikän reuna on suorakulmainen.** Työpöydän
   88 ka -kuvassa Arabian oranssin läikän ylä- ja vasen reuna ovat
   suoria viivoja: kalvo maalataan laatikkopehmennyksellä, ja
   lähikuvassa laatikon reuna näkyy.
3. **Pystyraita päivämäärärajalla.** Beringian kuvissa (20 ka) kulkee
   vaalea pystyraita n. 180°:n kohdalla — kalvokankaan sauma.
4. **Hiljainen pysäkki näyttää lopussa lampulta.** Piste on 6 px eikä
   liekki, mutta pysäkki saa yhä palavan lampun (js/aikajana.js
   sytyta: `asetaValonTila(valo, true, !hiljainen)`), joten koko
   pallon näkymässä kaikki 20 löytöpaikkaa hehkuvat samanlaisina.
   Suunnitelman luku 4 puhui pisteestä "liekin sijaan".
5. **Tiedeliitteen sisällysrivi leikkautuu puhelimella.** Pitkä
   ajoitusteksti ja otsikko ovat samalla rivillä, ja esim.
   "Tuhkakerrosten alta" jää levyn oikean reunan alle (390 px).
   Työpöydällä lista on kaksipalstainen eikä leikkaudu.
6. **Monte Verden kehystys on työpöydällä tyhjä.** Kun kello pysähtyy
   14,5 ka:iin, ilmiöpaneeli peittää Chilen rannikon ja näkyvästä
   alueesta neljä viidesosaa on Tyyntämerta. Puhelimella sama hetki
   on parempi (vana näkyy vasemmassa yläkulmassa).

## 7b. Avauslaatikko: teksti lyhyeksi, kuva rinnalle (V6, 7.9.2026 ilta)

> **KUMOTTU 9.9.2026 kuvan ja paperin osalta** — omistaja siirsi kuvat
> paperin taakse Ken Burns -taustaksi, ks. luku 7c. Tekstin lyhennys ja
> luennan leikkaus pätevät yhä. Luku jää historiaksi: se kertoo, miksi
> paperilla oli kuva ja miksi sitä ei enää ole.

Omistaja sanatarkasti: *"Tästä aloitustekstistä voi poistaa kaiken
tekstin lauseen, joka loppuu: 'Tuhat sukupolvea myöhemmin oltiin
toisella puolella maapalloa', niin sen jälkeen koko lopputeksti pois.
Mutta tuohon tekstin rinnalle voisi nostaa jonkun hienon kuvan, mitä jo
on generoitu tuohon tuota linssiä varten, ja samalla voisi tehdä
suuremmaksi tuon Itse paperin, missä tuo teksti on, jotta se kuvakin
mahtuu paremmin. Luennasta onneksi riittää, kun otetaan sen viimeinen
lause pois, mikä on jo generoitu. Eli sitä ei tarvitse generoida
uudestaan."* (Raamattu › "IHMISEN MATKAN AVAUSTEKSTI LYHYEKSI, KUVA
RINNALLE".)

**Teksti.** `IHMISEN_MATKA_ALOITUS` päättyy nyt lauseeseen *"…ja tuhat
sukupolvea myöhemmin oltiin toisella puolella maapalloa."* Kolme
poistettua lausetta (vanat ja värit, harmaa väestö, löytöpaikkojen
laskenta) kertoivat sanoin sen, minkä pelaaja näkee kartalta heti
Käynnistä-napin jälkeen. Sama tieto tulee yhä loppusanoista ja
galleriasta; poistetut lauseet ovat sanatarkasti data-tiedoston
kommentissa. Vartijat: `tests/ihmisen-matka.test.mjs` (teksti päättyy
oikeaan lauseeseen, ei sanoja *vana / Harmaa / Löytöpaikat*) ja
`tests/aikajana-virrat.test.mjs` (kartan lukuohje asuu loppusanoissa).

**Kuva.** `esittely.kuva` on uusi VALINNAINEN kaaren kenttä; moottori
(`js/aikajana.js avaaAvausjakso`) lukee sen ja lisää `.on-kuva`-luokan
kehykseen ja paperiin. Ilman kenttää laatikko on entinen — siksi
keksintökaaren avaus ei liikkunut lainkaan. Kuva otetaan AINEISTOSTA
tunnuksella (`avauksenKuva`, `AVAUKSEN_KUVA_TUNNUS = 'white-sands'`),
ei käsin kirjoitetulla osoitteella. White Sands valittiin, koska se ON
avaustekstin viimeinen lause kuvana (kaksi kulkijaa selin, jalanjäljet
jatkuvat eteenpäin, paikka on maapallon toinen puoli), siinä ei ole
kasvoja eikä luita, eikä se ole esityksen kuudesta kuvasta
(`ESITYKSEN_KUVAT`) — avaus ei siis paljasta mitään, minkä pelaaja näkee
kohta uudestaan.

**Paperi.** `.aikajana-avaus-kehys.on-kuva` on `min(52rem, 92%)` (ennen
`min(31rem, 88%)`), korkeus sisällön mukaan. Teksti ja kuva ovat
ruudukossa (`.aikajana-avaus-sisus`, palstat 1,15 : 1, tasaus keskeltä),
Käynnistä-nappi ruudukon alla keskellä. Puhelimessa (`max-width: 640px`)
yksi palsta ja kuva tekstin yläpuolella. Sisääntuloliuku ennallaan.

**Luenta leikattiin, ei generoitu uudelleen.** Ämpärin
`aikajana/ihmisen-matka/puhe/esittely.mp3` (5.9.2026, 25,36 s) luki
kaaren ENSIMMÄISTÄ avaustekstiä, jonka kaksi ensimmäistä lausetta ovat
sanasta sanaan nykyiset. Leikkauskohta todennettiin kuuntelematta:
`silencedetect` löysi puheen loppuvan 17,79 s:iin, ja sitä seuraava
1,72 s:n tauko on tiedoston pisin sisäinen tauko (sanoja lauseissa
1–2 on 32/46 eli 69,6 %, aikaa 17,79/25,36 eli 70,1 % — puolen
prosenttiyksikön osuma). Leikkaus `afade=t=out:st=17.80:d=0.15` ja
`-t 17.95`, uudelleenkoodaus 128 kb/s 44,1 kHz mono; taso pysyi
−17,2 → −17,3 LUFS (työkalun tavoite −17 ±1,5). Uusi kesto 18,00 s.

| Mitta | Ennen | Jälkeen |
| --- | --- | --- |
| esittely.mp3 kesto | 25,36 s | 18,00 s |
| koko | 406 300 t | 288 434 t |
| integroitu taso | −17,2 LUFS | −17,3 LUFS |
| avaustekstin merkkejä | 626 | 232 |
| paperin leveys (834 × 1100) | 496 px | 718 px |

Savuke `tools/savukkeet/savuke-ihmisen-avaus.mjs` mittasi asettelun:
16/16 läpi. **Savuke ja tämä luku on kumottu 9.9.2026** — ks. 7c.

## 7c. Aloituskortti: Ken Burns -kuvat taustalle, paperi ilman kuvaa (9.9.2026)

Omistaja sanatarkasti: *"tähän aloitukseen voisi tuoda muutamia kuvia
isona taustalle niin että ne liikkuvat hitaasti ja vaihtuvat muutaman
sekunnin välein (ken burns tyylinen liike + ristihäivytys). kuvien
tulisi feidautua mustaan reuna-alueilla ja kuvat hieman sumennettuina ja
tummennettuina. sitten paperi ja teksti näiden päälle ilman kuvaa. ota
tekstistä pois muoto 'tulet seuraavaksi näkemään' ja tekstiä voi
muutenkin lyhentää hieman. käynnistä nappi alimpana. ihmisen matka
otsikko hieman isommalla. kokeillaan ensin näin ja jos huono, niin
sitten otetaan paperilappu välistä pois kokonaan ja ladotaan tekstit
suoraan kuva-animaation päälle."* (Raamattu › "IHMISEN MATKAN
ALOITUSKORTTI: KEN BURNS -KUVAT TAUSTALLA…".) **Tämä kumoaa luvun 7b
kuvan ja paperin osalta**: teksti pysyy lyhyenä, mutta kuva siirtyy
paperin päältä sen taakse. Kokeilu — jos ei toimi, paperi otetaan
kokonaan pois ja tekstit ladotaan suoraan kuvien päälle.

**Tausta.** `esittely.taustakuvat` on uusi VALINNAINEN kaaren kenttä
(`avauksenTaustakuvat`, tunnukset `ALOITUKSEN_TAUSTAKUVAT`); ilman sitä
avaus on entinen musta ruutu, joten keksintökaari ei liiku. Kuusi
havainnekuvaa matkan järjestyksessä: Jebel Irhoud → Pinnacle Point →
Al Wusta → Madjedbebe → Beringia → Monte Verde. Moottori
(`js/aikajana.js avauksenTausta`) rakentaa kerrokset ja päättää vain,
MILLOIN kierros lähtee — ajastus on CSS:ssä (`css/aikajana.css`
"ALOITUSKORTIN KEN BURNS -TAUSTA"), ei rAF-silmukassa.

| Mitta | Arvo | Missä |
| --- | --- | --- |
| kuvia | 6 | `ALOITUKSEN_TAUSTAKUVAT` |
| kierros | 39 s (6 × 6,5 s) | `--avaus-tausta-kierros` |
| vaihtoväli | 6,5 s | `--avaus-tausta-vaihto` |
| ristihäivytys | 1,5 s (3,846 % kierroksesta) | `@keyframes avaus-tausta-vaihto` |
| Ken Burns | scale 1,05 → 1,15 + pieni pan, 8,0 s | `avaus-tausta-liike-{a,b,c}` |
| sumennus / tummennus | `blur(3px) brightness(0.55) saturate(0.85)` | `.aikajana-avaus-taustakuva img` |

Keyframe-prosentit on laskettu KUUDESTA kuvasta; jos lista lyhenee tai
pitenee, ne on laskettava uudelleen (vartija
`tests/ihmisen-matka.test.mjs`). Reunat häipyvät mustaan kahdella
keinolla: pyöreä `mask-image` kerroksessa (ei kuvissa, muuten Ken Burns
kuljettaisi häivytystä mukanaan) ja sen päällä musta reunakehys
(`::after`, kaksi lineaarista liukua ristiin) — pelkkä ellipsi jätti
1600 px:n ruudulla sivureunat noin 35 %:n peittoon. Pystyruudulla
(`max-width: 640px`) maski ja kehys on erikseen väljennetty.

**Esilataus.** Animaatiot ovat aluksi `animation-play-state: paused`,
jolloin myös viiveet seisovat; moottori lisää luokan `kaynnissa` vasta
kun jokainen kuva on latautunut tai lopullisesti pettänyt — tai
viimeistään 4 s:n katon (`AVAUS_TAUSTAN_LATAUSKATTO_MS`) jälkeen. Näin
ensimmäinen kuva ei välähdä paikalleen kesken häivytyksen. Käynnistä
pysäyttää liikkeen ja häivyttää kerroksen 550 ms:ssa, ennen kuin koko
avaus irtoaa (`AVAUS_POISTUMA_MS` 700 ms).

**Paperi.** `esittely.kuva` poistui, joten paperi on taas entinen yhden
palstan arkki `min(31rem, 88%)` ilman `.on-kuva`-luokkaa; kuvateksti ja
lähderivi jäivät pois kortilta. Otsikko 1,22 rem → 1,46 rem (+20 %).
Käynnistä on laatikon viimeinen lapsi ja sen alin elementti.

**Teksti.** `IHMISEN_MATKA_ALOITUS` alkaa nyt väitteestä eikä
lupauksesta: *"Yksi laji levisi yhdestä maanosasta kaikkiin. Kukaan ei
suunnitellut matkaa: …"* (205 merkkiä, ennen 232). **ÄÄNITE VANHENTUNUT
(9.9.2026):** ämpärin `aikajana/ihmisen-matka/puhe/esittely.mp3` lukee
yhä muotoa *"Tulet seuraavaksi näkemään…"*, eikä sitä voi tällä kertaa
korjata leikkaamalla — lause on luennan ALUSSA. Luenta on generoitava
uudelleen ennen julkaisua:
`node tools/generoi-linssiluennat.mjs --linssi ihmisen-matka --pysakit esittely`.

Savuke `tools/savukkeet/savuke-ihmisen-avaus.mjs` (työpöytä 1600 × 1000
ja puhelin 430 × 930) mittaa uuden kortin: 24/24 läpi. Kaappaukset
`ihmisen-matka-aloitus-{tyopoyta,puhelin}.png`.

## 8. Mitä jää auki toteutukseen

- Kaistan pehmeä reuna: Line2 ei häivytä reunaansa; kaksi päällekkäistä
  leveyttä on porrastettu häive. Jos se ei kelpaa kuvissa, vaihtoehto
  on oma varjostin (nauha-koe luvussa pallon-vektoriviivat.md 2.2 —
  sama hinta kuin Line2) — vasta omistajan kuvien jälkeen.
- Kotipesät renkaana vai kalvona: V2 valitsee kuvasta.
- Kalvon koneiston poisto (maalaa, tarkennaKentat, PIIRTOKERROIN, Worker
  siirtopuskurit) omana siivouseränä, kun omistaja on hyväksynyt vanat.
- Tasokartta (?lauta=kartta) pysyy valolinssinä (päätös 9).

## 9. Avoimet kysymykset omistajalle (vain aidot tasapelit)

1. **Lopun näkymän keskipiste.** Pallo näyttää yhden puoliskon, ja
   kuvat kertovat, että Tyynimeri keskellä (lat 5°, lng −165°;
   `kuvat/tyopoyta-vanat-koko-pallo-tyynimeri-2.png`) on neljä
   viidesosaa vettä: Amerikkojen rannikko ja Australia jäävät reunoille
   ja vanoista näkyy vähiten, vaikka Wairau Barin kuva poksahtaa
   siihen. Intian valtameri keskellä (lat 15°, lng 60°;
   `…-intia-2.png`) näyttää Afrikan, Euroopan, Aasian ja Australian
   vanat ja 13 löytöpaikkaa, mutta Amerikat ja Aotearoa ovat takana.
   Ehdotus: lat 0°, lng 100°E — Aasia, Australia, Aotearoa (reunalla),
   Beringia ja Madagaskarin nauha näkyvät, Afrikan itäreuna ja
   Eurooppa osin, Amerikat eivät; loppusanat sanovat, että Amerikat ovat
   pallon toisella puolella. Vaihtoehto: kaksi näkymää — peräytyminen
   Amerikkojen puolelle (lat 20°, lng −100°) ja loppusanojen alussa
   yksi hidas puolikierros (180° / 20 s ease-in-out) Aasian puolelle,
   jossa kamera pysähtyy. Omistajan valinta.
2. **Kuusi vai seitsemän kuvaa.** Ehdotus kuusi (luku 4). Jos Siperian
   pitkä osuus (Denisova 50 ka → Beringia 20 ka, n. 70 s ilman kuvaa)
   tuntuu tyhjältä, Yana 32 ka on selkärangalla ja seitsemäs kuva
   maksaa 4,6 s.

## 10. Kokeiluskriptit ja kuvat (scratchpad, ei repossa)

Kansio `scratchpad/vanat/` (Fablen session scratchpad
/tmp/claude-0/-home-user-Matkakirja/4395e8bd-2040-5167-a99c-deb3b07ea212/scratchpad/vanat):

- `vanat-koe.mjs` — laskenta edeltäjin, edeltäjäpolut, käsin käytävä,
  yksinkertaistus, PNG-piirto ilman kirjastoja (`--vuoto` ajaa ilman
  Bab-el-Mandebin estoa). Tuottaa `vanat.json`, `vanat-loppu.png`
  (kaikki vanat, käsin-käytävä mustana), `vanat-loppu-ei-kaistaa.png`,
  `vanat-60ka.png`, `-45ka.png`, `-30ka.png`, `-16ka.png`, `-12ka.png`,
  `-1ka.png`.
- `tarkista.mjs` — kentän ajat avainpisteissä ja Bab-el-Mandebin maski
  (vuodon todiste).
- `kamerapolku.mjs` — kärjen kulku ruutusekunteina kahdella
  kellovariantilla, `kamerapolku.png`.
- `mittaa-vanat.mjs` — Playwright-mittari pallolla (kalvo vs. Line2,
  kello käynnissä); `mittaa-vanat-2.mjs` — eroteltu mittaus samassa
  näkymässä (luvun 2.3 taulukko).
- `kuvat-vanat.mjs`, `kuvat-vanat-syvyys.mjs`, `kuvat-vanat-2.mjs` —
  kuvakaappaukset: `kuvat/puhelin-A-kalvo-afrikka.png` (nykytila),
  `puhelin-B-vanat-aasia.png` (vanat + helminauha-kaista),
  `puhelin-vanat-eurooppa-atc.png` (alphaToCoverage: peittävä joki
  kontissa), `puhelin-vanat-eurooppa-syvyys.png` (tiukka syvyystesti:
  tasainen kaista, vana z-taistelee), `puhelin-vanat-altai-2.png`,
  `tyopoyta-vanat-altai-2.png`, `*-koko-pallo-tyynimeri-2.png`,
  `*-koko-pallo-intia-2.png`. Huomio: kokeessa vanan väri on koko
  polylinjan päätevirran väri (selkäranka vihreänä Afrikasta asti);
  tuotannossa jokainen kärki kantaa oman virtansa sävyn.
- `hae-wiki.mjs` — en-Wikipedian raakatekstit (`wiki-*.txt`).

## 11. Tutkimusvaihe (toteutettu 7.9.2026)

*(Omistajan linjaus 7.9.2026 ilta, Raamattu "IHMISEN MATKA: KAARI
HYVAKSYTTY, TUTKIMUSVAIHE, VIISI NAPPIA, PULUN VALIHUOMIOT". Toteutus:
`js/linssit/ihmisen-matka-tutkimus.js`, `css/ihmisen-tutkimus.css`,
aineisto `js/linssit/ihmisen-matka-data.js` ja
`js/linssit/ihmisen-matka-virrat.js`. Todennus:
`tests/ihmisen-matka-tutkimus.test.mjs` ja
`tools/savukkeet/savuke-ihmisen-tutkimus.mjs`.)*

> *"Kun esitys on ohi, niin sen jälkeen pelaaja voisi klikkailla
> kartalla niitä nostokohtia, ja niitä saa olla todella paljon … kartassa
> voisi olla ylhäällä viisi nappia, joista jokainen vastaisi sitten niitä
> eri alueita, ja jolloin kartta automaattisesti pyörähtäisi niin, että
> koko se alue näkyy ja se valittu väri hehkuu kaikkia muita värejä vielä
> voimakkaammin … niissä nostoissa olisi tietenkin myös jo valmiiksi
> generoituja muutamia kysymyksiä, mitä painamalla pulu voisi sitten
> selittää lisää."*

### 11.1 Raja esitykseen: yksi kutsu

Kertomusmoottori päättää esityksen ja kutsuu `ui.aloitaTutkimusvaihe?.()`.
Kytkentä on `js/aikajana.js`:ssä (`kaynnistaAikajana` asettaa kentän,
ajon `pura()` purkaa sen), koska ajo-olio — kello, lauta, virrat,
karuselli — on sen moduulin. Kutsu on turvallinen millä tahansa
kaarella: ilman lautaa tai virtoja se palauttaa epätoden eikä mitään
muutu (keksintökaari, tasokartta).

Kutsun jälkeen kolme asiaa tapahtuu kerran:

1. `ajo.pysayta()` — kello seisoo.
2. `ajo.virrat.tutkimus()` — vanat piirretään loppuun (`paivita(0)`),
   kalvot saavat lopun peiton ja **kameran seuranta loppuu pysyvästi**
   (`keskeytettyAsti = Infinity`). Silmukka lukee tämän jälkeen aina
   nollaa, joten se ei enää tee työtä.
3. `lauta.heraa()` — nukkuva pallo ei rakentaisi merkkien elementtejä.
   Mitattu savukkeessa: ilman herätystä 40 datumia listalla, 0
   elementtiä ruudulla.

Kamera on tästä eteenpäin pelaajan ja viiden napin käsissä, ja ajot
menevät laudan omaa rajapintaa (`ui.kamera().ajaKamera`). Kaksi kameraa
samalla pallolla olisi kaksi totuutta.

### 11.2 Nostot: 20 + 20

Kartalla hehkuu **40 nostoa**: kaaren kaikki kaksikymmentä löytöpaikkaa
(myös esityksestä pois jääneet `lake-mungo`, `tianyuan`, `niah`) ja
kaksikymmentä lisänostoa taulussa `IHMISEN_MATKA_LISANOSTOT`:

| tunnus | ajoitus | virta | tunnus | ajoitus | virta |
| --- | --- | --- | --- | --- | --- |
| toba | 74 ka | päävirta | malta-poika | 24 ka | siperia |
| sunda | jääkaudet | päävirta | lascaux | 17 ka | eurooppa |
| sahul | 65–10 ka | päävirta | bluefish | 24 ka (kiistelty) | amerikat |
| wallacea | aina | päävirta | paisley | 14,3 ka | amerikat |
| flores | 100–50 ka | päävirta | clovis | 13 ka | amerikat |
| sulawesi-taide | 51–44 ka | päävirta | doggerland | 10–8,2 ka | eurooppa |
| ust-ishim | 45 ka | siperia | teouma | 3 ka | tyynimeri |
| kostenki | 40–30 ka | eurooppa | saqqaq | 4,5 ka | amerikat |
| sungir | 34 ka | eurooppa | madagaskar | 1,5–1 ka | tyynimeri |
| dolni-vestonice | 29 ka | eurooppa | rapa-nui | 800 v | tyynimeri |

Lisänosto EI ole pysäkki: pysäkki on esityksen mitta (kellon askel,
vanan päätepiste, `ESITYKSEN_KUVAT`), ja neljäkymmentä pysäkkiä muuttaisi
koko kaaren tahdin. Siksi lisänostolla on vain se, mitä kortti tarvitsee:
otsikko, ajoitus, `vuosiaSitten`, lat/lon, 2–3 lauseen teksti, virta,
lähde (en-Wikipedia) ja kysymykset. **Kuvia ei ole** — kuvatilaukset
menevät kuvaputkelle erikseen (luku 11.6).

Hehku on ruutuvakiokokoinen CSS2D-merkki laudan linssiapurin omassa
osassa `ihmisen-tutkimus` (ei `aikajana`, jottei ajon purku veisi niitä
kesken): 5 px kultainen ydin ja sen ympärillä 2,6 s:n sykkivä kajo,
kumpikin **vanan sävyyn** värjättynä (`--nosto-savy`). Löytöpaikoilla
sävy haetaan kartalta — lähin vanan kärki ratkaisee, ja kärkikohtainen
`virrat` kertoo värin, koska selkäranka vaihtaa väriä matkalla.
Napautus kulkee laudan omaa polkua (`lahinLinssimerkki` → `napautus`),
joten linssin merkki voittaa kaupungit ja nostot kuten aikajanan lamppu.

### 11.3 Kortti ja kysymykset pululle

Kortissa on ajoitus, otsikko, paikka, kuvat (löytöpaikalla havainnekuva
ja esine), teksti, lähde ja sen alla 2–3 **valmista kysymystä**.
Löytöpaikan korttiteksti on `loyto` eikä `juttu`: koko juttu (kaksi
kappaletta) kuuluu Tiedeliitteeseen, ja `loyto` kertoo juuri sen, mitä
pelaaja tässä kysyy — kuka löysi, mistä ja milloin.

Kysymykset ovat datassa (`IHMISEN_MATKA_KYSYMYKSET` → `pysakki.kysymykset`
ja lisänostojen oma `kysymykset`), kolme per löytöpaikka: yksi
MENETELMÄSTÄ ("Miten tämä ajoitettiin?"), yksi ARJESTA ("Mitä täällä
syötiin?") ja yksi MIKSI-kysymys ("Miksi juuri tänne?").

Napautus lähettää kysymyksen chattiin `polloKysy`-reittiä eli
täsmälleen samaa polkua kuin pelaajan itse kirjoittama kysymys.
Konteksti kulkee mukana `ui.fokuskohdeAuki`-kentässä (sama kenttä kuin
kartan kohdetietoruudulla, `js/pollo.js avoinKohdetietoruutu`), joten
noston teksti ja lähde menevät pöllölle ilman että pöllö tarvitsee
riviäkään tästä moduulista. Chatin portti aukeaa body-luokalla
`aikajana-tutkimus-auki` (`js/ui-apurit.js linssiEstaaChatin`) — sama
poikkeus kuin välinäytöksellä.

**Pulun repliikki ei tule täältä.** *"Kartta on sinun. Kysy vain, jos
löydät jotain kiinnostavaa."* on kaanonia
(`js/linssit/ihmisen-matka-kertomus.js`, jakson `loppu` pulu-kenttä), ja
sen soittaa kertomusmoottori. Testi vartioi, ettei tutkimusvaihe toista
sitä eikä avaa omaa kuplaa.

### 11.4 Viisi nappia

Napit ovat viisi virtaa (`IHMISEN_MATKA_VIRRAT`) nimineen ja väripilkkuineen.
Napautus tekee kolme asiaa:

- **Kamera** kääntyy niin että koko vana näkyy. Rajaus lasketaan valitun
  virran KAIKISTA kärjistä (kärkikohtainen `virrat`, joten "siperia" on
  selkärangan Siperia-osuus eikä koko selkäranka), ja pituusasteet
  puretaan jonoksi ±360° ennen laatikkoa — muuten Tyynenmeren nappi
  (Taiwan 121° I … Rapa Nui 109° L) kääntäisi pallon Afrikkaan.
  Leveys on 12 % marginaalilla ja korkeusehto muunnetaan leveydeksi
  kuvasuhteella (sama kaava kuin `js/pallolauta/kamera.js` bbox-haarassa);
  ajon kesto 1,5 s laudan omalla pehmennyksellä.
- **Korostus** `js/aikajana-vanat.js korosta(virta)`: valittu vana saa
  peiton 1,0 ja 1,3-kertaisen viivan, muut 0,35-kertaisen peiton
  (kaista samoin). Muutos on pelkkää materiaalia, joten kellon
  päivitykset saavat yhä ajaa sen alla.
- **Pergamenttilappu** ruudun alareunaan: vanan nimi ja `yhteenveto`
  (2–4 lausetta, kirjoitettu `ihmisen-matka-virrat.js`:ään värin ja
  nimen viereen). Lapun `bottom` lasketaan karusellin MITATUSTA
  korkeudesta (`--tutkimus-nauha`), koska nauhan korkeus tulee kortin
  leveydestä eikä ole vakio.

Toinen napautus samaan nappiin palauttaa kaikki: korostus pois, lappu
piiloon, kamera jää siihen mihin pelaaja sen jätti.

Nappirivi on **aina aikajanan ylärivin alapuolella** (4 rem). Mitattu
834 × 1100: ylärivi on 565 px leveä, joten keskitetty 435 px:n nappirivi
samalla korkeudella menisi sen päälle myös työpöydällä. Puhelimella
(≤ 700 px) rivi levittäytyy koko leveydelle ja nimet lyhenevät
(Pää / Eur. / Sib. / Am. / Tyyni) — molemmat nimet ovat DOMissa ja css
valitsee.

### 11.5 Muu kartan tila

- **Esinerivi** (karuselli) palaa näkyviin tutkimusvaiheessa ja sen
  edellinen tila palautetaan purussa.
- **Linssin sulku (✕)** toimii kuten ennen: `ui.pysaytaAikajana` →
  `ajo.pura()` → tutkimusvaiheen purku (merkit, kerros, body-luokka,
  korostus) ennen ajon omaa purkua. Savuke tarkistaa, ettei pallolle jää
  yhtään `tutkimus:`-merkkiä.

### 11.6 Kuvatilaukset (auki)

Kahdellakymmenellä lisänostolla ei ole kuvaa. Kortti toimii ilman, mutta
kuva olisi luonteva jatko — tilaus kuvaputkelle silloin kun omistaja
haluaa: Toba, Sunda, Sahul, Wallacea, Flores, Sulawesin luolataide,
Ust'-Ishim, Kostenki, Sungir, Dolní Věstonice, Mal'tan poika, Lascaux,
Bluefish, Paisley, Clovis, Doggerland, Teouma, Saqqaq, Madagaskar,
Rapa Nui. Repoon ei viedä kuvia; ne kuuluvat ämpäriin kuten muutkin.
## 12. Esitys yhtenä kaarena (toteutettu 7.9.2026)

*(Raamattu: IHMISEN MATKA ON YKSI KAARI, EI PYSAKKEJA · KERTOMUS
SOLJUVAKSI, EI VUOSILUKUJA ALKUUN, PALUU AASIAAN · ALKAA MUSTASTA
RUUDUSTA · KAARI HYVAKSYTTY, TUTKIMUSVAIHE, VIISI NAPPIA. Luvut 1–10
kuvaavat vanojen laskentaa ja piirtoa; ne ovat ennallaan. Tämä luku
korvaa luvun 4 esitysmallin — "kuusi kuvapysäkkiä, kello pysähtyy
kuudesti" — kokonaan: kello ei enää pysähdy kertaakaan.)*

### 12.1 Mikä muuttui

Pysäkkiajo teki Ihmisen matkasta keksintölinssin: kello pysähtyi
kuvapysäkillä, kortti vaihtui, kertoja luki kolmen sanan rivin ja ajo
jatkoi. Omistajan linjaus 7.9.2026 illalla kumosi mallin: *"Tässä on
siis yksi pitkä tarinankaari … Ne pysäkit ovat vain meidän tekemiämme
kaivauksia ja havaintoja, mutta se ei saisi rikkoa sitä virtaa."*

Nyt linssillä on **kaksi rinnakkaista ajomallia** samassa moottorissa,
ja kaaren kenttä `kertomus` valitsee kumpi:

| | pysäkkiajo (keksinnöt) | kertomusesitys (Ihmisen matka) |
| --- | --- | --- |
| kellon lähde | `aikajanaAskel`, pysäkkiväli | kaanonin jaksot, luennan kesto |
| kello pysähtyy | joka pysäkillä | ei koskaan |
| kertoja | kolmen sanan rivi pysäkillä | jakson teksti, jaksot peräkkäin |
| kamera | pysäkiltä pysäkille + virtojen kärkiseuranta | jakson kohde tai nimetty alue |
| kuvat | kortti + havainnekuvapaneeli | pieni kuva kohteen vieressä |
| esinerivi | näkyvissä | piilossa esityksen ajan |
| loppu | loppusanat + Tiedeliite | `ui.aloitaTutkimusvaihe?.()` |

Pysäkit (`tapahtumat`, 20 löytöpaikkaa) **jäivät paikoilleen**: ne ovat
kartan lamput, kuvat ja tutkimusvaiheen nostokohdat. Esitys vain ei aja
niitä kellona.

### 12.2 Tiedostot

- `js/linssit/ihmisen-matka-kertomus.js` — **kaanoni** (Fable, omistajan
  hyväksymä). 22 jaksoa: `id`, `vaihe`, `kohde`, `alue`, `vuosia`,
  `teksti`, `luenta`, `pulu`. Koodi ei muuta näiden sanoja.
- `js/linssit/ihmisen-matka-esitys.js` — **ohjaaja**. Ei omista mitään
  pintaa: se kertoo moottorille, mitä kaanoni kussakin jaksossa tahtoo.
- `js/aikajana.js` — portit: `kaynnista` luo ohjaajan, `aloitaAjo`
  antaa sille vuoron, `taukoTaiJatka` ja näppäimistö delegoivat sille,
  `pura` purkaa sen. Lisäksi `vuosiaSittenPaikka` (kellon käännös).
- `js/aikajana-vanat.js`, `js/aikajana-virrat.js` — pitotila.
- `css/aikajana.css` — osio "KERTOMUSESITYS".
- `js/linssipuhe.js` — `kertomuksenRunko`, `kertomuksenVarakesto`,
  `kertomuksenLuennat`.
- `js/liviapuhe.js` — `LIVIAN_LINSSILAHTEET`, `soitaLivianLinssiAani`.
- `tools/generoi-linssiluennat.mjs --kertomus`, `tools/generoi-pulu.mjs`.
- `tests/ihmisen-matka-esitys.test.mjs`,
  `tools/savukkeet/savuke-ihmisen-esitys.mjs`.

### 12.3 Viisi vaihetta

> **Kohdat 1–2 korvattu 8.9.2026 (luku 17):** avaus on musta ruutu →
> tähdet → piste → zoomi Afrikka-sanan kohdalla, ja valot syttyvät
> vasta kun pallo on perillä.

1. **PIMEÄ** (`vaihe: 'pimea'`, jakso `avaus`). Käynnistä-napin jälkeen
   ohjaaja panee mustan peitteen linssin juuren ensimmäiseksi lapseksi
   ja lisää juureen luokan `esitys-pimea`: kello, otsikot, esinerivi,
   ilmiöpaneeli, vinjetti ja Tauko-nappi väistyvät, **vain sulkunappi
   jää käytettäväksi**. Kertojan `avaus`-luenta soi.
   **Musiikki ja äänimaisema eivät vielä ala** — musta ruutu on
   hiljainen (`aloitaMusiikki` jää tekemättä koko avausjaksossa).
2. **VALOT** (`valot`, jakso `afrikka`). Kamera on ajettu koko Afrikan
   rajaukseen jo pimeässä (kesto 0), joten musta vain häipyy pois
   2,6 sekunnissa (`VALOJEN_MS`) valmiiseen näkymään. Musiikki nousee
   sisään (`aloitaMusiikki(true)`, soittimen oma nousu) ja vanojen
   **pito** kytkeytyy päälle lopuksi ajaksi.
3. **MATKA** (`matka`). Jaksot peräkkäin ilman taukoa. Jokaisella:
   luenta soi, kamera liukuu (`kohde` → lähikuva 1 200 lautayksikköä;
   `alue` → nimetty bbox), kello etenee **lineaarisesti** jakson
   `vuosia`-arvosta seuraavan jakson arvoon luennan keston mukaan, ja
   vanat kasvavat kellon tahdissa entisellä moottorilla.
4. **HYPPY** (`hyppy`, jakso `aikahyppy`). Kello kelaa taaksepäin
   14 500 → 50 000 pehmennetyllä liu'ulla 2,4 sekunnissa
   (`KELAUKSEN_MS`, `kelauksenPehmennys`), kamera siirtyy
   Keski-Aasiaan, ja kelauksen jälkeen kello jatkaa normaalisti
   50 000 → 45 000 loppujakson ajan. Rintama ei katoa (11.5).
5. **LOPPU** (`loppu`). Kamera vetäytyy koko palloon (`alue: 'maailma'`),
   pulun välihuomio, ja esitys PÄÄSTÄÄ IRTI esinerivistä (luokka
   `esitys-kaynnissa` pois) — ja `ui.aloitaTutkimusvaihe?.()`.
   **Tutkimusvaiheen sisältö on toisen moduulin työtä**; ilman koukkua
   esitys päättyy siihen, että kartta jää pelaajalle.

   Huomaa: esinerivi ei silti täyty korteista itsestään. Nauhalla on
   moottorin oma `tyhja`-tila niin kauan kuin PYSÄKKIKELLO ei ole
   käynyt (js/aikajana.js asettele), eikä kertomusesityksessä se käy
   koskaan. Esitys poistaa vain OMAN pitonsa; mitä alarivillä lopulta
   näkyy, päättää tutkimusvaihe.

### 12.4 Kello: lukema sisään, paikka ulos

Moottori, kellorullat ja värivirrat lukevat kaikki `tila.vuosi`-
**paikkaa** (`js/aikajana-virrat.js lukema`), joka on paloittain
logaritminen asteikko pysäkkien `vuosiaSitten`-luvuista. Esitys
puhuu **lukemina** ("nyt ollaan 164 000 vuoden kohdalla"), joten
`js/aikajana.js` sai käänteisfunktion `vuosiaSittenPaikka`. Se on
`vuosiaSittenLukeman` tarkka käänteinen (yksikkötesti käy koko kaaren
läpi 1,7 yksikön askelin), joten kello näyttää sitä, mitä esitys
tarkoittaa, ja vanat kasvavat samaan tahtiin ilman erillistä kytkentää.

Yksi poikkeus lineaarisuuteen: **aikahyppyä edeltävä jakso ei kelaa
itse**. Chilen jakso (14 500) ja aikahyppy (50 000) ovat peräkkäin,
joten suoraviivainen sääntö olisi kelannut takaisin Keski-Aasiaan jo
kertojan puhuessa pisimmästä kävelymatkasta. Sääntö on siksi:
`jaksonTahti` pitää jakson lukemassaan, jos SEURAAVA jakso on
hyppyjakso — hyppy kuuluu hyppyjaksolle.

Jakson kesto on **äänitteen kesto**, luettuna soittimen
`loadedmetadata`-tapahtumasta heti kun se saapuu. Siihen asti — ja
kokonaan ilman äänitettä (mykistys, kertojatila 'ei', puuttuva
tiedosto) — kesto on tekstin pituus / 14 merkkiä sekunnissa
(`kertomuksenVarakesto`). Koko kertomus on ilman ääntä noin **4,5
minuuttia** (3 819 merkkiä). Kulunut aika mitataan **seinäkellosta**
eikä kehysten summasta: luenta on reaaliaikaista ääntä, ja hitaasti
piirtyvä pallo ei saa jättää kertojaa jälkeen kartasta.

### 12.5 Pito: rintama ei katoa

Kaanoni palaa ajassa taaksepäin **kahdesti**: Blombos (75 ka) →
Karmelvuori (110 ka) ja Chile (14,5 ka) → aikahyppy (50 ka). Ilman
suojaa vana kelautuisi kummallakin kerralla auki — koko Amerikkoihin
piirretty selkäranka katoaisi ruudulta.

`js/aikajana-vanat.js paivita(nyt, { pito })` pitää **yksisuuntaisen
maksimin** vanaa kohti (`o.pitomatka`): piirretty pituus ei koskaan
lyhene, mutta kasvaa yhä normaalisti kun kello ohittaa ennätyksen.
Kotipesät jäävät samasta syystä palamaan. `karjenPaino(..., { pito })`
antaa nollan kärjelle, jonka aika ei ole vielä tullut: pidetty osa on
**vanhaa väestöä**, ei rintamaa — ilman ehtoa koko vana leimahtaisi
rintamaväriin kelauksen jälkeen. Kytkin on
`js/aikajana-virrat.js asetaPito(true)`, ja pysäkkiajossa se on pois
päältä, joten keksintökaari ja Ihmisen matkan vanha ajo ovat ennallaan.

### 12.6 Kuvat sivuosassa

Kun jaksolla on kohde, sen havainnekuva nousee **pienenä** (22 % ruudun
leveydestä, katto 260 px, pergamenttikehys) kohteen **viereen**
luennan ajaksi ja häipyy jakson päättyessä. Kehys ripustetaan lampun
CSS2D-elementtiin, joten se seuraa pistettä kameran liikkuessa eikä
sitä tarvitse asemoida. Se ei pysäytä mitään: kello käy, kamera liukuu
ja kertoja jatkaa.

Kokeeksi pois: `IHMISEN_MATKA_KUVAT_ESITYKSESSA = false`
(js/linssit/ihmisen-matka-esitys.js) tai osoiterivin
`?esityskuvat=ei` — jälkimmäinen ei vaadi koodin muokkausta.
Kohteen lamppu jää palamaan (`palaa`, ei `nykyinen`), jolloin kartalle
kertyy esityksen aikana hiljaisia hehkuja tutkimusvaihetta varten.

Esinerivi (alareunan karuselli) on **piilossa koko esityksen ajan**
(`.aikajana.esitys-kaynnissa .aikajana-nauha`) ja palaa, kun ohjaaja
poistaa luokan juuri ennen tutkimusvaiheen koukkua.

### 12.7 Pulun välihuomiot

Jakson `pulu` luetaan pulun äänellä jakson **luennan päätyttyä**, ennen
seuraavaa jaksoa: jakson kesto on luenta + `PULUN_VARA_MS` (2,6 s), ja
kupla nousee tuon hännän alussa. Kello ei pysähdy.

Kupla on **linssin oma** (`polloLinssikupla`, ohittaa kuplaportin) ja
saa lisäluokan `aikajana-kertomus-pulu`, joka tekee siitä kapean ja
hieman kallellaan olevan välihuudon — sama asu kuin fokusvirran
huudahduksella. Ääni soi 0,7 × tasolla kertojan **päälle** ilman
kertojan väistöä (`soitaLivianLinssiAani`, `vaista: false`).

Numerointi tulee taulusta `LIVIAN_LINSSILAHTEET` (js/liviapuhe.js):

```js
'ihmisen-matka': ['ranta', 'denisova', 'beringia', 'loppu'],
```

Järjestystä ei saa muuttaa jälkikäteen — numero on tiedostonimessä
(`livia-ihmisen-matka-1.mp3`). Ristiriita taulun ja kaanonin
`pulu`-kenttien välillä kaataa `tools/generoi-pulu.mjs`:n ennen
ensimmäistäkään maksullista kutsua, ja yksikkötesti vartioi saman.

### 12.8 Äänet: mitä on ja mitä puuttuu

**Mitään ei ole vielä generoitu** (7.9.2026). Fable ajaa työnkulun.

Kertojan jaksot:

```
node tools/generoi-linssiluennat.mjs --linssi ihmisen-matka --kertomus --kuiva
node tools/generoi-linssiluennat.mjs --linssi ihmisen-matka --kertomus
```

- Tiedostonimi: `kertomuksenRunko` → `ihmisen-matka-kertomus-<jakso>.mp3`
  kansiossa `aikajana/ihmisen-matka/puhe/`. Sama funktio pelissä ja
  työkalussa, joten nimi ei voi eriytyä.
- Mallille lähtee kaanonin `luenta`-kenttä **sellaisenaan** (tagit ovat
  kaanonia, työkalu ei lado niitä).
- Ajo vie samalla manifestin `kertomus-manifesti.json` samaan kansioon:
  jakso, tiedosto, merkkimäärä, arvio ja valmiin äänitteen kesto. Peli
  ei tarvitse sitä (kesto tulee soittimesta), mutta siitä näkee
  yhdellä silmäyksellä, mitä ämpärissä on.
- `--pysakit avaus,denisova` valitsee yksittäisiä jaksoja tunnuksella.

Pulun välihuomiot: `node tools/generoi-pulu.mjs --kuiva` listaa neljä
uutta riviä (`ihmisen-matka-1…4`). Generoinnin jälkeen niiden
tiivisteet on liitettävä `LIVIAN_AANITETYT`-tauluun, tai peli vaikenee
(kupla toimii silti).

Äänimaisemat (Raamattu LINSSIEN AIDOT AANIMAISEMAT) eivät ole vielä
olemassa; kun ne tulevat, ne nousevat sisään samasta kohdasta kuin
musiikki (`sytytaValot`).

### 12.9 Tauko, näppäimistö ja vähennetty liike

Tauko-nappi (ja väli/Enter) pysäyttää **luennan ja kellon** samasta
kohdasta: ääni pausetetaan (ei pysäytetä), silmukka pysähtyy, musiikki
puolittuu. Jatko siirtää lähtöhetkeä kuluneen verran taaksepäin ja
jatkaa ääntä siitä mihin se jäi. Esc sulkee linssin. Nuolet eivät selaa
— esityksessä ei ole pysäkkejä selattavaksi — eikä lampun napautus
siirry pysäkkiin.

`prefers-reduced-motion`: kaikki kamera-ajot ovat hyppyjä (kesto 0),
CSS-liu'ut poissa (peite, teksti, kuva, esinerivi) ja kello asetetaan
`heti`. Esitys kulkee silti jakso jaksolta samassa tahdissa.

### 12.11 Mitä yhdistäminen tutkimusvaiheeseen paljasti (7.9.2026)

Kun esitys ja tutkimusvaihe olivat samassa puussa, `savuke-ihmisen-esitys`
antoi 9/13. Kaikki neljä kaatumista tutkittiin erikseen; **yksikään ei
ollut kuorman aiheuttama eikä tutkimusvaiheen vika**, ja kaksi oli
oikeaa vikaa esityksessä:

| Kaatunut väite | Syy | Korjaus |
| --- | --- | --- |
| TAUKO (`nappi: "▾"`) | MITTAUSVIRHE. Ohjainrivin ensimmäinen `.aikajana-nappi` on nyt LAPUN KAHVA ("Matka päättyy ▾"), ei Tauko-nappi. | Savuke lukee tekstin `ajo.taukoNappi`-kentästä. |
| KUVA (110 px, 13,2 %) | MITTAUSVIRHE. Kehys syntyy `scale(0,6)`-kokoisena ja saa `esilla`-luokan vasta seuraavassa kehyksessä; 110 = 0,6 × 183. | `tila().kuvaEsilla` tarkoittaa nyt "poksahdus alkanut", ja savuke odottaa mitan asettumista. |
| KELLO (`hyppyMin: 14500`) | MITTAUSVIRHE. Kelaus LÄHTEE 14 500:sta, joten se on kelvollinen näyte; väite vaati aidosti suurempaa. | Alaraja on `>= 14500`; varsinainen väite on `max >= 45000`. |
| LOPPU (`leveys: 2698`) | **OIKEA VIKA.** Viimeisen jakson kamera-ajo mitoitetaan VARAKESTOSTA (tekstin pituus, 10,4 s → ajo 8,9 s), mutta äänitteen mukaan jakso kesti 5,6 s: kamera oli yhä matkalla koko palloon, kun esitys päättyi. | `paata` ajaa saman rajauksen uudestaan 1,2 s liu'ulla ENNEN tutkimusvaiheen koukkua. |

Neljäs oli piilossa niin kauan kuin savuke katsoi vain omaa ajoaan: se
näkyy vasta, kun esityksen loppunäkymä on tutkimusvaiheen LÄHTÖNÄKYMÄ.
Tutkimusvaihe ei liikuta kameraa käynnistyessään (se tekee sen vasta
vanan napista, `kaannaVanaan`), joten se peri puolittaisen zoomin
sellaisenaan.

Sivutuote: `.aikajana.esitys-pimea .aikajana-ohjaimet { z-index: 2 }`
poistui. Se nosti sulkunapin mustan peitteen päälle silloin, kun ✕ oli
ohjainrivin osa; sitten ✕ oli juuren suora lapsi omalla pinollaan
(`.aikajana-sulje`, z-index 8) eikä tarvinnut apua. **8.9.2026 illasta
alkaen** ✕:ää ei ole lainkaan: pimeässä näkyvä nappi on palkin
hampurilainen, ja sen pudotusvalikko nousee peitteen päälle omalla
z-indexillään (docs/moduulit/linssit.md, "Linssin valikko").

### 12.10 Portit

- `node --test tests/*.test.mjs` — mukana
  `tests/ihmisen-matka-esitys.test.mjs` (16 väitettä: kaanonin muoto,
  kellon käännös, luennan nimi ja kesto, pulun taulu, vanojen pito,
  esityksen pinnat).
- `node tools/savukkeet/savuke-ihmisen-esitys.mjs` — koko esitys
  selaimessa 834 × 1100, äänitteet mockattuina 3 s hiljaisuudella:
  pimeä alku, tauko ja jatko, valot Afrikkaan, jaksot loppuun ilman
  käyttäjän toimia, kuva kohteen vieressä, kello ja aikahypyn kelaus,
  pulun välihuomiot, tutkimusvaiheen koukku, purku. Kuvakaappaukset
  viidestä hetkestä, kukin esitys pysäytettynä.

  MITATTU 7.9.2026 (kontti, ohjelmisto-WebGL): 22 jaksoa läpi, 17
  löytökuvaa, 4 pulun kuplaa, kello 289 423 → 0, Chile pysyy 14 500:ssa,
  aikahyppy käy 49 949:ssä, Eurooppa jatkaa 42 447:stä, koukku kutsutaan
  tasan kerran, purku puhdas, ei sivuvirheitä. Ajo kestää kontissa
  10–20 min: jokainen kuvakaappaus odottaa kehystä, ja kehys on siellä
  noin sekunnin mittainen.
- `node tools/tarkista-niputus.mjs`, `node tools/tarkista-savukkeet.mjs`.

## 13. Yksi palkki, yksi kortti, muisti (7.9.2026)

*(Raamattu "IHMISEN MATKA: YKSI PALKKI, EI KARUSELLIA, KAIKKIIN
NOSTOIHIN KUVA, LINSSI MUISTAA PAIKKANSA" ja "IHMISEN MATKA:
ETELA-AFRIKASSA KAMERA ULOS, VANA EI SAA HUKKUA" — omistajan
linjaukset 7.9.2026 illalla. Tämä luku korvaa luvun 11 kohdat
"nappirivi ylärivin alapuolella" ja "esinerivi palaa näkyviin" sekä
luvun 11.3 oman kortin: napit ovat palkissa, karusellia ei ole, ja
kortti on kolmas moduuli. Muu luvuista 11–12 on ennallaan.)*

> *"Myös yläreunan kaksi palkkia … saisi mahduttaa yhteen palkkiin,
> jotta kartalla jää mahdollisimman paljon tilaa … voitaisiin linssin
> ajaksi korvata koko tuo matkakirjan yläpalkki … Ja hampurilaisvalikon
> voisi vain korvata X-kirjaimella … Ja linssi voisi aina muistaa sen
> paikan, mistä se on suljettu."*

### 13.1 Seitsemän muutosta ja niiden paikat

| Linjaus | Missä |
| --- | --- |
| Yksi palkki yläpalkin tilalle | `js/aikajana.js rakennaPalkki`, `css/aikajana.css` osio YKSI PALKKI |
| Alareunan karuselli pois | `css/aikajana.css` (`.aikajana.kertomus .aikajana-nauha { display: none }`) |
| Kaikki kartan kohdat napautettavia | `js/aikajana.js napautaValoa`, `js/linssit/ihmisen-matka-esitys.js naytaKuva`, `css/aikajana.css .aikajana-kertomuskuva.esilla` |
| Yksi nostomalli (kortti) | `js/linssit/ihmisen-matka-kortti.js`, `css/ihmisen-tutkimus.css` |
| Linssi muistaa tilansa | `js/linssit/ihmisen-matka-muisti.js`, `js/aikajana.js` (tallennaMuisti, jatkaMuistista, aloitaAlusta), `js/linssit/ihmisen-matka-esitys.js jatkaMuistista` |
| Tiedeliitteen sisällys yhtenä listana | `js/tiedeliite.js` (`sisallys`-asetus), `css/aikajana.css .tiedeliite-sisallys.lista` |
| Kärki ei saa poistua kuvasta | `js/linssit/ihmisen-matka-esitys.js jaksonRajaus` |

Karuselli, nostokortti ja muisti ovat **kertomuskaaren** omia
(`kaari.kertomus`). **PALKKI EI ENÄÄ OLE** (omistaja 8.9.2026,
Raamattu "KEKSINTOLINSSIN YLAPALKKI IHMISEN MATKAN TYYLIIN, JA ALOITA
ALUSTA": *"Ja siinä voi kyllä sen yläpalkin siirtää ihmislinssin
tyyliin"*): sama palkki tulee nyt myös keksintölinssin pysäkkiajoon.
Jako on `js/aikajana.js`:ssä kahtena metodina — `rakennaPalkki`
(yhteinen: luokka `palkki`, yläpalkin piilotus, korkeuden mittaus, ↺ ja
✕) ja `rakennaKertomuksenPalkki` (virtanapit, nostokortti, aikaselain)
— ja `css/aikajana.css`:ssä kahtena luokkana: `.aikajana.palkki` on
palkin yhteinen asu, `.aikajana.kertomus` vain kertomuskaaren omat.
Keksintölinssin muut pinnat (kello, lapun kahva, ilmiöpaneeli,
esinerivi, Tiedeliitteen kaksipalstainen sisällys) ovat entiset;
palkin alla ilmiöpaneeli alkaa mitatun korkeuden alta ja esinerivi on
yhä alareunassa.

### 13.2 Palkki: mitattu korkeus, ei arvattu

Otsikkorivi (`.aikajana-ylarivi`) saa luokan `aikajana-palkki`, ja
siihen kootaan vasemmalta oikealle: linssin nimi, kello, viisi virtaa
väripilkkuina ja nimineen, Tauko/Jatka, Aloita alusta (↺) ja ✕.
Matkakirjan oma yläpalkki piilotetaan body-luokalla
`aikajana-palkki-auki`, ja palkki saa **sen mitatun korkeuden**
muuttujassa `--aikajana-palkki-korkeus` (mitattu ennen piilotusta;
834 × 1100: 57 px) — ruudulla vaihtuu siis vain palkin sisältö.

**EI `display: none`.** Sovellus on ruudukko (`css/styles.css .app`:
`grid-template-rows: auto minmax(0, 1fr)`), ja ruudukosta kadonnut
yläpalkki pudottaisi kartta-alueen riville 1 ja auto-korkeuteen:
kartta kutistui neliöksi. Yläpalkki jää siksi ruudukkoon nollan
korkuisena ja näkymättömänä (`visibility: hidden; height: 0`), ja
kartta on ikkunan korkuinen (mitattu 834 × 1100: 1 079 / 1 100 px).

Viisi nappia ovat **yksi tehdas kahdelle käytölle**
(`luoVirtanapit`): moottori rakentaa ne palkkiin jo linssin auetessa
LEGENDANA (himmeät, `disabled`), ja tutkimusvaihe kytkee samoihin
nappeihin toiminnon (`kytke`). Kaksi nappiriviä samasta asiasta olisi
ollut kaksi totuutta. Kapealla palkilla (≤ 1000 px) nimet lyhenevät
("Pää", "Eur.", …); puhelimella (≤ 600 px) legenda ei mahdu palkkiin
lainkaan (mitattu 390 px: kello 185 px + Jatka + ↺ + ✕ jättivät
legendalle 50 px eli kaksi pilkkua viidestä), joten napit näytetään
vasta tutkimusvaiheessa omalla rivillään palkin alla. Puhelimella myös
linssin nimi väistyy kellon tieltä — sama vanha sääntö kuin muillakin
kaarilla (`css/aikajana.css` kapean ruudun media) — ja palkissa ovat
kello, Tauko/Jatka, ↺ ja ✕.

### 13.3 Miksi napautus ei mennyt perille

Omistaja 7.9.2026: *"jos klikkaa valopalloa kartalla, niin tällä
hetkellä ei tapahdu mitään, kun myöskään ei niistä valokuvista tapahdu
mitään."* Juurisyitä oli kaksi, eikä kumpikaan ollut osumatestissä:

1. **Lamppu palasi tyhjänä.** `napautaValoa` alkoi rivillä
   `if (this.esitys) return;` — kertomusesityksessä lamppu ei ole
   pysäkki, joten napautus ei saanut siirtää kelloa. Osuma siis tuli
   perille (`lahinLinssimerkki` → `napautus`), mutta sen käsittelijä
   ei tehnyt mitään. Nyt lamppu avaa noston kortin.
2. **Kuva ei ottanut napautusta.** Kertomuskuva on lampun CSS2D-
   elementin lapsi, ja koko merkkikerros on `pointer-events: none`
   (js/pallolauta/merkit.js): napautus valui pallon pintaan, jossa
   44 px:n osumatesti harvoin osui juuri siihen lamppuun — kuva on
   1,4 rem sivussa ja 22 % ruudun levyinen. Esillä oleva kehys ottaa
   nyt napautuksen itse (`pointer-events: auto`) ja avaa saman kortin.

Vartio on **aidolla koordinaattinapautuksella** eikä elementin
`click()`-kutsulla (`tools/savukkeet/savuke-ihmisen-tutkimus.mjs`
`ruutupaikka` + `page.mouse.click`): elementin dispatch ei olisi
todistanut mitään, koska merkkikerros ei ota napautuksia lainkaan.
Savuke valitsee pallon ETUPUOLELLA olevan merkin (kirjasto merkitsee
takana olevat luokalla `pallolauta-takana`) reilusti ruudun sisältä —
takana oleva merkki projisoituu ruudulle, muttei ota osumia. Tämä oli
myös ensimmäisen mittauksen harha: takana ollut hehku näytti
"napautukselta, joka ei toimi".

### 13.4 Yksi nostomalli: kortti

`js/linssit/ihmisen-matka-kortti.js` on **kolmas, kummastakin
riippumaton osa**: aikajanamoottori luo sen kertomuskaarelle linssin
auetessa (`ui.nostokortti`), esitys avaa sen lampusta ja kuvasta,
tutkimusvaihe hehkusta. Raja esityksen ja tutkimusvaiheen välillä
(yksi kutsu, luku 11.1) säilyy: esitys ei tiedä tutkimusvaiheesta
mitään, ja kortti on molempien yhteinen.

Kortilla on sama järjestys kummallakin nostolajilla: ajoitus vanan
väripilkkuineen, otsikko, paikka, **kuva-alue**, 2–3 lausetta, lähde,
"Lue lisää" (vain niillä, joilla on Tiedeliitteen juttu) ja valmiit
kysymykset pululle.

**Kuva-alue on aina vähintään yksi kehys.** Löytöpaikalla ovat
havainnekuva ja esine; lisänoston kuvituskuva haetaan ämpäristä
polusta `aikajana/ihmisen-matka/nosto/<tunnus>.jpg`, ja kunnes
kuvaputken erä on perillä, 404 vaihtaa kehyksen **varapaikaksi**:
vanan sävyinen katkoviivakehys, sävypilkku ja lyhyt ajoitus
("74 000 v."). EI nimikirjainlaattaa (omistajan aiempi havainto
keksintökaaren "EI"/"SY"-laatoista). Aito Commons-kuva (`kuvaAito`)
näytetään kuvituskuvan rinnalla, kun sellainen on.

Kortti aukeaa **myös esityksen aikana**: esitys menee tauolle ja
jatkuu kortin sulusta — ja vain jos juuri kortti sen pysäytti
(pelaajan oma Tauko pysyy). Kortti on kartta-alueen suora lapsi
(z-index 9), joten se elää aikajanan (7) ja tutkimuskerroksen (8)
päällä ja alkaa palkin alta.

### 13.5 Muisti: mitä ja missä

`js/linssit/ihmisen-matka-muisti.js` tallettaa localStorageen avaimella
`matkakirja-linssimuisti-<tunnus>`: vaiheen (`esitys` kesken olevine
jaksoineen ja kuluneineen, tai `tutkimus`), **pidon pohjan**, kameran
(lat, lng, altitude), avoimen kortin ja valitun virran. Sama perhe kuin
valitulla linssillä ja paneelin asettelulla: tämä on laitteen
katselutila eikä pelin tapahtuma, joten se ei kuulu pelitallennukseen
— ja "Uusi peli" tyhjentää sen muiden `matkakirja`-avainten mukana
(js/main.js `tyhjennaMuistit`).

**Pidon pohja on se, mitä ilman jatko ei toimisi.** Kello käy
kaanonissa kahdesti taaksepäin (luku 12.5), ja piirretty pituus on
yksisuuntainen maksimi. Ilman muistiin talletettua `pitoMin`-lukemaa
Euroopan haarassa jatkava esitys olisi piirtänyt Amerikat tyhjiksi.
Jatko kytkee pidon päälle ja piirtää vanat pohjaan asti ennen kuin
kello lähtee taas käyntiin.

**Mustaa alkua ei muisteta.** Jos pelaaja sulkee linssin heti
avausjakson pimeässä, hän ei ole vielä ollut missään, eikä jatko ilman
mustaa saisi syödä juuri sitä hetkeä, joka kaarelle kuuluu (omistaja:
*"Ensimmäinen avaus kuten nyt"*). Vanha muisti jää silloin koskematta.

Kirjoitushetket: jakson vaihtuessa, kortin ja virran vaihtuessa sekä
**purussa ennen kortin sulkua** — sulun oma tallennus kirjoittaisi
muuten "ei avointa korttia" juuri tallennetun tilan päälle
(`muistiLukittu`). Muisti tarkistetaan puhtaalla funktiolla
(`kelvollinenMuisti`): väärä versio, yli kuukauden vanha merkintä,
tuntematon jakso, nosto tai virta pudotetaan hiljaa, ja linssi alkaa
alusta kuten ensimmäisellä kerralla. **Aloita alusta (↺)** tyhjentää
muistin ja käynnistää linssin uudestaan avausjaksosta.

Jatko on **ilman mustaa ja ilman avausta**: peitettä ei panna
lainkaan (läpinäkyvänäkin se ottaisi napautukset kartan edestä),
kamera asetetaan muistin paikkaan kestolla 0, ja äänite kelataan
samaan kohtaan kuin kello heti kun sen kesto tiedetään.

### 13.6 Kamera: kärki ei saa poistua kuvasta

Omistaja 7.9.2026 klo 18.15: *"siinä tarinan alkupaikkeella, kun
käydään Etelä-Afrikan kohdalla, niin kartta voisi zoomautua ulospäin,
jotta ei hukattaisi sitä viivaa, jossa oltiin menossa niin pahasti."*

MITATTU (kontti 7.9.2026): `ranta`-jaksossa (164 000 → 75 000) kamera
oli Pinnacle Pointissa (−34°, 22° I) 1 200 lautayksikön lähikuvassa,
mutta selkärangan kärki kulki Etiopiasta Arabiaan — 50–65° päässä
kohteesta, siis kokonaan kuvan ulkopuolella. Sama toistui
`arabia`- ja `denisova`-jaksoissa.

Sääntö (`jaksonRajaus`, puhdas funktio): kohteellisen jakson kamera
rajataan laatikkoon, jossa ovat KOHDE ja jakson aikana **liikkuvien**
vanojen kärkipolut (viisi näytettä jakson kellovälillä). Neljä
tarkennusta, jotka kaikki ovat mittausten tulosta:

1. **Vain uutta piirtävä osuus lasketaan.** Pito pitää jo piirretyn
   paikallaan, eikä sen "kärki" ole rintama: aikahypyn jälkeen
   selkärangan kärki on Chilessä, eikä Chauvet'n jakson kameran kuulu
   vetäytyä puolen pallon näkymään sen takia.
2. **Taaksepäin kulkeva jakso** (`blombos`: 75 000 → 110 000) ei
   piirrä uutta, joten mukaan otetaan nykyinen rintama — se ei saa
   kadota kuvasta sillä välin kun kertoja puhuu.
3. **Kaksi etäisyyskattoa.** Selkäranka otetaan mukaan 80° asti
   (Pinnacle Point → Arabia mahtuu), sivuhaara vain 45° asti: Euroopan
   haaran kärki Lissabonissa ei saa vetää Denisovan jakson kameraa,
   kun Eurooppa kerrotaan vasta aikahypyn jälkeen.
4. **Rajaus ei koskaan mene lähikuvaa tiukemmaksi**
   (`ESITYKSEN_LAHIKUVA`), ja ilman vanoja (tasokartta, laskenta
   kesken) se on pelkkä kohde eli entinen lähikuva.

Savuke mittaa kärjen **ruudun sisällä**: selkärangan kärki lasketaan
pidon pohjasta, projisoidaan pallon omalla projektiolla ja
tarkistetaan etupuolen testillä (`pisteEdessa`) — ja väite koskee
jokaista jaksoa erikseen niiden näytteiden osalta, joissa vana kasvaa
(`rintamalla`).

### 13.7 Tiedeliitteen sisällys yhtenä listana

Kaksipalstainen sisällys meni Ihmisen matkassa riveillään päällekkäin,
koska ajoitukset ovat pitkiä ("vähintään noin 230 000 vuotta sitten").
Kaari voi nyt pyytää `avaaTiedeliite`-kutsussa asetuksen
`sisallys: { lista, ajoitus(t), pilkku(t) }`: yksi palsta
aikajärjestyksessä, rivillä vanan väripilkku, lyhyt ajoitus
("300 000 v.", `lyhytAjoitus`) ja otsikko. Ilman asetusta (keksinnöt)
levy on kirjaimelleen entinen. Tiedeliite avataan kortin "Lue lisää"
-napista moottorin kautta (`ajo.avaaNostonJuttu`), koska musiikin
vaimennus ja lehden sulkeutumisen jälkeinen palautus ovat moottorin
omia; sulku palaa karttaan, ja kortti jää auki sen alle.

**`column-count: 1` ei riittänyt** (mitattu savukkeella 7.9.2026,
molemmat näkymät): korkeudeltaan rajattu palstalaatikko luo
YLIVUOTOPALSTOJA myös yhden palstan asetuksella. Kaksikymmentä riviä
katkesi yhdennentoista kohdalta, ja loput yhdeksän piirtyivät laatikon
oikealle puolelle ruudun ulkopuolelle (rivi 12 alkoi x = 729, kun
laatikko päättyi 728:aan) — juuri se "päällekkäisyys", jonka omistaja
näki. Korjaus on `columns: auto`, joka purkaa palstoituksen kokonaan:
lista on tavallinen pystyvirta, jonka `max-height` rullaa. Savuke
mittaa nyt sekä rivien päällekkäisyyden, palstojen määrän (kaikkien
rivien on alettava samasta x:stä) että laatikon ulkopuolelle jääneet
rivit.

### 13.8 Portit

- `node --test tests/*.test.mjs` — `tests/ihmisen-matka-tutkimus.test.mjs`
  (palkki korvaa yläpalkin, karusellia ei ole, muistin puhdas
  tarkistus, hehku ja lamppu avaavat saman kortin, varapaikka ei ole
  nimikirjainlaatta) ja `tests/ihmisen-matka-esitys.test.mjs`
  (kärkisääntö neljänä mitattuna tapauksena, kuva ja lamppu avaavat
  kortin, jatko muistista).
- `node tools/savukkeet/savuke-ihmisen-tutkimus.mjs` — palkki, aito
  koordinaattinapautus lamppuun ja hehkuun, kortti kummallakin
  nostolajilla, kysymys chattiin, muisti kummassakin vaiheessa,
  Tiedeliitteen sisällys, viisi nappia, Aloita alusta ja purku;
  834 × 1100 ja 390 × 844.
- `node tools/savukkeet/savuke-ihmisen-esitys.mjs` — koko esitys
  läpi, mukana väite KÄRKI KUVASSA.
- `node tools/tarkista-niputus.mjs`, `node tools/tarkista-savukkeet.mjs`,
  `node tools/tarkista-kaksoisavaimet.mjs`.

MITATTU 7.9.2026 (kontti, ohjelmisto-WebGL):

- `node --test tests/*.test.mjs`: 2 197 läpi, 0 kaatunutta, 13 ohitettua.
- `savuke-ihmisen-tutkimus`: **36/36** kummassakin näkymässä. Palkki
  57 px (834 × 1100) ja 53 px (390 × 844), yläpalkki 0 px ja piilossa,
  kartta 1 079/1 100 ja 828/844 px, karuselli `display: none`, kartalla
  40 hehkua viidessä sävyssä. Aito koordinaattinapautus avasi kortin
  sekä lampusta esityksen aikana että hehkusta tutkimusvaiheessa;
  Tiedeliitteen sisällys 20 riviä, 20 väripilkkua, yksi palsta, ei
  yhtään riviä laatikon ulkopuolella.
- `savuke-ihmisen-esitys`: **14/14**. Kärki kuvassa 11 jaksossa, osuus
  0,88; loppunäkymä 3 355 lautayksikköä; 22 jaksoa läpi, neljä pulun
  kuplaa, koukku kerran.
- `savuke-aikajana` (keksinnöt, regressio): **13/13** — pysäkkiajo,
  karuselli ja Tiedeliite ennallaan.
- Kertomuskuvan napautus ruutukoordinaatilla (390 × 844) avasi noston
  kortin ("Okra ja helmet").

## 14. Kaista rannikkoa pitkin (7.9.2026)

### 14.1 Linjaus

Omistaja 7.9.2026 illalla klo 18.05 Suomen aikaa, sanatarkasti
(Raamattu, *IHMISEN MATKA: VANAT RANNIKKOA MAALAAVINA KAISTOINA, EI
VIIVA JA HALO*):

> *"Tarkista myös ne viivat, jotka leviävät kartalla. Niiden tavallaan
> siinä pääviivan reunoilla olevassa hehkussa on välillä värinää. Ja
> minusta olisi kiva, jos se hehku maalaisi rannikkoa sen ääriviivan
> mukaisesti. Nythän se menee sattumanvaraisesti yli. Mutta koska eikös
> meillä ole kartta piirretty jo vektoreina, niin se voisi maalata
> nätisti sitä kartan ääriviivaa ja siitä sisäänpäin aluetta ja näkyä
> vähän paremmin. Eli minun mielestä ei tarvitse olla ohutta ja
> voimakasta viivaa ja sen ympärillä olevaa haloa vain, vaan ennemmin
> niiden kahden välistä olevalla peitolla oleva väri, joka leviää
> rannikkoa pitkin, levittäytyen hieman sisämaahan. Ja siitä voisi
> tehdä hieman vaihtelevan paksuista sillä idealla, että jos jossain
> kohdassa ihmisiä ehkä olisi levittäytynyt enemmän sisämaahan, niin
> siinä se olisi paksumpaa ja joissain kohdissa, missä ehkä on vain
> kuljettu läpi, niin se olisi kapeampaa. Sen ei tarvitse olla aivan
> tieteellisesti oikein välttämättä. Sekin voidaan sitten jossain
> tekstissä selittää, mutta se ainakin näyttäisi paremmalle."*

Neljä vaatimusta: (1) värinä pois, (2) YKSI puoliläpinäkyvä kaista
viivan ja halon välistä eikä ohutta viivaa + haloa, (3) kaista seuraa
rantaviivaa ja leviää siitä SISÄMAAHAN, ei sattumanvaraisesti merelle,
(4) leveys vaihtelee: asuttu leveä, läpikuljettu kapea.

### 14.2 Tekniikka: kaista pallon pinnalla omalla varjostimella

Line2 (viiva + halo) hylättiin: se ei häivytä reunaansa, sen jänteet
näkyvät ketjuna suorakaiteita (luku 7, havainto 1) eikä sitä voi
leikata rantaviivaan. Kaista on nyt oma verkko (js/aikajana-vanat.js):

1. **Yksi instanssoitu nelikulmio ("hulli") per jana.** Kärkivarjostin
   levittää sen janan ympärille (puolileveys + pehmennys + pyöreä pää)
   ja nostaa pallon pinnan yläpuolelle jänteen painuman verran.
2. **Kaikki lasketaan PINNAN PISTEESTÄ, ei nelikulmiosta.** Fragmentti
   ampuu säteen `gl_FragCoord`ista käänteisellä MVP:llä ja leikkaa sen
   pallon kanssa. Peitto on pinnan pisteen etäisyys janaan pehmeänä
   funktiona, joten liitokset ovat pyöreitä ja reuna häipyy.
3. **OMISTUSSÄÄNTÖ (korjaus 7.9.2026 ilta).** Hulli tuntee kolme janaa
   (edellinen, oma, seuraava). Ensimmäinen toteutus otti niistä
   LÄHIMMÄN — ja juuri se oli värinän syy. Kaikilla saman pikselin
   fragmenteilla on sama syvyys (pinnan piste), joten LESS-testi
   päästää läpi sen, joka piirtyy ENSIN. Ensin piirtyvä hulli saattoi
   olla se, jonka kolmen janan ikkuna päättyi juuri siihen: sen peitto
   oli vaimenemassa pyöreäksi kärjeksi, ja pikseli sai liian pienen
   peiton, vaikka naapurihulli olisi maalannut sen täytenä. Tulos oli
   VALOJUOVA jokaisen kärjen kohdalla (helminauha) ja kameran
   liikkuessa juovat pomppivat hullista toiseen. Nyt hulli piirtää vain
   siellä, missä OMA jana on lähempänä kuin naapurit
   (`if (d1 < d2 - SUVAITSE || d3 < d2 - SUVAITSE) discard;`): alue on
   naapurien puolittajien rajaama pala, pikseli kuuluu täsmälleen
   yhdelle hullille eikä piirtojärjestys ratkaise mitään. Puolittajalla
   molemmat piirtävät (SUVAITSE = 1e-4 × säde), mutta siellä etäisyys ja
   kärkiväli ovat samat, joten sauma ei näy. Vanan päissä naapurijana on
   rappeutunut (sama piste kahdesti), joten pyöreä pää säilyy; kasvun
   kärjessä katkaistu jana on omistaja.
4. **Rantamaski tekstuurina.** `tools/tee-rantamaski.mjs` rasteroi repon
   `ne50.geojson`:n (Natural Earth 1:50m, sama perhe kuin pallon
   vektorirantaviivat) 0,125°:n ruudukkoon 3 × 3 alinäytteellä ja
   enemmistösäännöllä (≥ 5/9), jolloin bilineaarisen luvun
   0,5-tasa-arvokäyrä kulkee rantaviivan päällä ±0,06°:n tarkkuudella.
   Varjostin kertoo peiton maan osuudella: kaistan meren puoleinen reuna
   ON rantaviiva ja väri leviää siitä sisämaahan.
5. **Meren ylitykset kapeina.** Kärki saa `merisyys`-luvun 0…1
   (etäisyys lähimpään maahan 25…45 km; mallin oma kulkumaski ratkaisee
   ensin: ruutu, jossa malli käveli, on rannikkoa). Merikärjellä kaista
   on `meriKerroin` = 0,3 leveydestä eikä maskaudu — Wallacea, Sahul,
   Beringinsalmi ja Tyynenmeren nauhat kulkevat kapeana pelkkänä vanana.
   Rannikkokärki, joka on mallin sileän vanan pyöristämänä vedessä,
   maalaa RANNASTA sisämaahan (`iRanta` antaa etäisyyden rantaan
   anteeksi), jottei lahti jää tyhjäksi.
6. **Peitto 0,5** — omistajan haarukka "viivan (0,95) ja halon (0,14)
   välistä". Kasvu (`uKuljettu`), kärkiväri (`uNyt`, `uRintama`, `uPito`)
   ja tutkimusvaiheen korostus (`uVanaPeitto`) ovat UNIFORMEJA: kello ja
   napit eivät koske puskureihin. Tutkimusvaiheen korostus tehdään
   VAIMENTAMALLA muut (`KOROSTUKSEN_VAIMEA` 0,35); valittu virta pitää
   kertoimen 1, koska kerroin yli yhden veisi kaistan yli omistajan
   haarukan 0,45–0,6.
7. **Piirto kalvojen jälkeen** (renderOrder 2 > kalvo 1) ja syvyys
   pinnan pisteestä (`gl_FragDepthEXT`, bias 12/2²⁴): päällekkäiset
   vanat eivät summaa peittoa, ja kerran maalatut kalvot eivät testaa
   kaistan kirjoittamaa syvyyttä.
8. **VAHVEMPI FRAGMENTTI VOITTAA** (`KAISTAN_ALFABIAS` 8/2²⁴). Kaksi
   ERI vanaa menee liitoksissa päällekkäin. Kun syvyys oli molemmilla
   sama, LESS päästi sen, joka piirtyi ensin — ja jos se sattui olemaan
   naapurivanan häipyvä reuna, vahva kaista jäi sen alle ja liitokseen
   jäi VAALEA HIUSVIIVA (nähtiin Hormuzin salmessa, kuva
   `crop-sauma.png`). Peitto vedetään siksi syvyydestä: vahva fragmentti
   on hitusen edempänä ja pääsee läpi myös myöhemmin piirtyneenä. Sama
   peitto antaa yhä saman syvyyden, joten omistussäännön puolittajan
   tasapelit ratkeavat kuten ennenkin. Pahin jäljelle jäävä virhe on,
   että liitoksessa peitto voi olla 0,5:n sijaan 0,55 — silmälle
   näkymätön, toisin kuin vaalea rako.

### 14.3 Leveys aineistosta (kuvituksellinen, ei tiedeväite)

`IHMISEN_MATKA_VANAT.kaista` (js/linssit/ihmisen-matka-virrat.js):
perusleveys `leveysKm` = 200 km kertoimella 1, ja `alueet` on lista
laatikoita, joista jokainen antaa kärjelle kertoimen pehmeällä reunalla
(oletus 4° liukuvyö). Päällekkäiset alueet EIVÄT summaudu: suurin
levennys (≥ 1) ja pienin kavennus (≤ 1) kertautuvat, ja tulos rajataan
välille 0,3…3,5. Ruudulla on lisäksi vähimmäisleveys 7 px (meri 3 px),
jotta kaista näkyy myös koko pallon näkymässä.

| alue | kerroin | perustelu (yleinen maantiede, ei lähdeväite) |
| --- | --- | --- |
| Levantti ja Arabian länsirannikko | 2,0 | pullonkaula, jossa asuttiin pitkään ja tiheästi |
| Eurooppa | 2,0 | asutettiin läpikotaisin, ei vain rannikkoa |
| Kaakkois-Aasia ja Sunda | 2,0 | mannerjalusta oli kuivaa maata, asutus laaja |
| Intian niemimaa ja Ceylon | 1,8 | rannikkoreitin sydän, jokisuut |
| Itä-Aasia ja Japani | 1,6 | tiheä asutus, monta löytöpaikkaa |
| Sahul: Australian rannikot | 1,5 | rannikko asuttiin, sisämaa harvemmin |
| Etelä-Afrikan rannikko | 1,5 | Blombos ja Pinnacle Point: pitkä asutus |
| Britannia, Fennoskandia | 1,5 | jään jälkeen asutettiin kokonaan |
| Itä-Afrikka ja Afrikan sarvi | 1,4 | kotipesien maasto |
| Persianlahti ja Iranin rannikko | 1,4 | rannikkoreitti |
| Pohjois-Amerikan länsirannikko | 1,1 | rannikkoreitti etelään |
| Etelä-Amerikan rannikko | 1,0 | keskileveä: kuljettu nopeasti, asutus ohut |
| Keski-Aasian arot | 0,7 | läpikuljettu käytävä |
| Siperia | 0,6 | harva asutus, pitkät välit |
| Beringia ja Alaska, Grönlanti ja arktinen Kanada | 0,5 | kuljettiin läpi, ei jääty |

Omistaja hyväksyi kuvituksellisuuden etukäteen (*"Sen ei tarvitse olla
aivan tieteellisesti oikein välttämättä"*); leveysero on kartan kieltä,
ei väite asukasluvusta. Selitys kuuluu Fablen tekstiin (ehdotus:
tutkimusvaiheen Eurooppa-lappuun tai Tiedeliitteen alkuun yksi virke:
*"Kaistan paksuus kertoo, jäätiinkö seudulle asumaan vai kuljettiinko
sen läpi — se on piirtäjän arvio, ei mittaustulos."*).

### 14.4 Mitatut luvut (kontti, ohjelmisto-WebGL — suhteellisia)

Mittari `mittaa-kaistan-varina.mjs` (scratchpad, luku 10): linssi auki,
tutkimusvaihe käynnissä (kello seis, vanat kokonaan piirretyt),
kertomusesitys purettu, kamera Arabian yllä (lat 25°, lng 52°, altitude
0,55), näkymä 834 × 1100. KAISTAN OMA KUVA saadaan erotuksena "kaappaus
vanat päällä" − "kaappaus vanat pois" (`korosta(virta, {vaimea: 0,
hehku: 0})` sammuttaa kaistan), jolloin laattakerros ja kaikki muut
kerrokset putoavat mitasta pois. Vertailuluku on sama ero TAUSTALLA.

| mitta (kaistan oma kuva, kynnys 40) | ennen (lähin kolmesta) | omistussääntö | + peitto syvyydessä |
| --- | --- | --- | --- |
| kaista hajoaa yhtenäisiin paloihin | 57 | 6 | **5** |
| piiri / pinta-ala | 0,1235 | 0,0571 | **0,0559** |
| suurin pala pinta-alasta | 26,9 % | 41,9 % | **45,1 %** |
| pinta-ala (px) | 70 487 | 76 199 | 76 378 |
| sama kynnyksellä 25: paloja / piiri per ala | 15 / 0,1159 | 7 / 0,0456 | — |
| sama kynnyksellä 60: paloja / piiri per ala | 64 / 0,1778 | 16 / 0,1205 | — |

Helminauha oli siis mitattavissa suoraan siitä, että valojuovan kohdalla
peitto putoaa kynnyksen alle ja kaista katkeaa: 57 helmeä → 6 palaa.

| värinä: peräkkäisten kehysten pikseliero (kamera 0,004°/askel ≈ 0,03 px, 4 kehystä) | ennen | omistussääntö | + peitto syvyydessä |
| --- | --- | --- | --- |
| kaistan REUNAVYÖ: ka / p99 / pisin | 1,57 / 14 / 90 | 1,17 / 11 / 85 | **1,20 / 12 / 59** |
| kaistan sisus: ka / p99 / pisin | 0,43 / 2 / 78 | 0,43 / 2 / 40 | 0,43 / 2 / **47** |
| tausta (vertailu, mittarin oma kohina) | 0 / 0 / 8 | 0 / 0 / 8 | 0 / 0 / 3 |
| reunavyön pikseleitä / sisuspikseleitä | 35 376 / 55 508 | 19 847 / 71 172 | **19 500 / 71 549** |

Reunavyö kutistui 44 %: kaarien reunat olivat itsessään reunaa. Yhden
kehyksen pikseliero on pieni kummassakin, koska askel on alle
pikselin — värinän varsinainen mitta on helminauhataulukko yllä, ja
sen syy (piirtojärjestys ratkaisee peiton) on nyt poissa rakenteesta,
ei vain säädetty pienemmäksi.

| kehystahti | ennen | jälkeen |
| --- | --- | --- |
| `savuke-pallo-kehystahti --nakyma=puhelin`, pano JS/kehys p50 / p95 / pisin | 2,0 / 5,3 / 10,4 ms | 2,2 / 6,3 / 24,7 ms |
| sama, yli 17 ms:n kehysten osuus (raja 3 %) | 0 % | 2,2 % (läpi) |
| sama, zoom p50 / p95 / pisin | 1,8 / 5,6 / 6,2 ms | 2,2 / 4,2 / 5,6 ms |
| LINSSIN kehysväli kaista näkyvissä (puhelin 390 × 844, tutkimusvaihe) p50 / p90 / pisin | 1 233 / 1 417 / 2 367 ms | 1 217 / 1 400 / 2 267 ms |

Savuke ei avaa linssiä lainkaan (se panoroi Ateenan yllä, eikä
`js/aikajana.js` — ja siten `js/aikajana-vanat.js` — edes lataudu:
js/ui.js tuo moottorin dynaamisesti vasta linssistä), joten sen
ennen/jälkeen mittaa samaa koodipolkua. Ero on kontin kohinaa: neljästä
ajosta samalla koodilla yksi antoi panoroinnissa 4,3 % (vartio kaatui,
raja 3 %), muut 2,2 %, 0 % ja 0 %, ja pisin JS-kehys vaihteli 7,7 ms:n
ja 28,7 ms:n välillä. Linssin oma kehysväli ei huonontunut —
omistussääntö ei lisää työtä, se vain hylkää fragmentin aiemmin.

Portit jälkeen: `node --test tests/*.test.mjs` 2 192 läpi / 0 kaatunutta
/ 13 ohitettua, `tarkista-kaksoisavaimet`, `tarkista-niputus`,
`tarkista-savukkeet` puhtaat, `savuke-ihmisen-tutkimus` 20/20 läpi.

### 14.5 Kuvat (scratchpad, ei repossa)

`kuvat-kaista.mjs` (834 × 1100 ja 390 × 844): esityksen puoliväli
(pysäkki 9, 45 000 v. sitten) Eurooppa ja Intian rannikko samassa
kuvassa, Intian rannikko lähempää, tutkimusvaihe Eurooppa korostettuna
(`jalkeen2-tabletti-*.png`, `jalkeen2-puhelin-*.png`). Skripti purkaa
kertomusesityksen (`ajo.esitys.pura()`), siirtyy pysäkille ja uusii
kameran kohteen silmukassa — virtamoduuli ohjaa muuten kameraa ja
kirjoittaisi yhden `pointOfView`n yli.
`mittaa-kaistan-varina.mjs` jättää lisäksi jokaisen mitatun kehyksen
(`ennen-k0-paalla.png` … `jalkeen-k3-pois.png`); Arabian lähikuva on
paras vertailupari — samassa rajauksessa ennen näkyy helminauha, jälkeen
tasainen kaista, joka päättyy rantaviivaan.

### 14.6 Avoimet asiat

1. **Ei-viereisten janojen päällekkäisyys.** Omistussääntö vertaa vain
   kahteen naapuriin. Jos vana kulkee lähelle omaa kaukaista osaansa
   (tai toinen vana risteää), molemmat hullit piirtävät, ja peiton
   syvyysjärjestys (14.2 kohta 8) ratkaisee: vahvempi voittaa, mutta
   sen päälle summautuu se, mitä heikompi ehti jo piirtää (0,5 → n.
   0,55). Vanoissa haarat on katkaistu 100 km:n erolla rungosta, joten
   päällekkäisyys on käytännössä vain liitoskohdissa eikä näy kuvissa.
   Täydellinen korjaus olisi kaistan piirto omaan puskuriin ja
   sommittelu kerran — oma erä, jos se joskus näkyy.
2. **Kaista ei vielä TUNNE rantaviivaa, se leikkautuu siihen.** Väri
   leviää janan ympäriltä ja maski katkaisee sen rannassa. Meren
   puolelle kaista ei siis mene (paitsi merikärjissä, jossa se on
   tarkoitus), mutta jos MALLIN oma vana oikaisee mantereen poikki,
   kaista oikaisee sen mukana: Intian kuvassa kaista kulkee Dekkanin
   yli, koska yksinkertaistettu vana kulkee siellä — rannikon ääriviiva
   näkyy vain siellä, missä vana on rannan tuntumassa. Aidosti
   rantaviivavektoria pitkin leviävä maalaus (etäisyyskenttä
   rannikosta) olisi oma erä; toinen, halvempi keino olisi tihentää
   vanan kärkiä rannikko-osuuksilla.
3. **Vähimmäisleveys 7 px** pitää kaistan näkyvissä koko pallon
   näkymässä, mutta lähikuvassa se ei rajoita mitään: silloin leveys on
   maantieteellinen. Jos omistaja haluaa kaistan näkyvän vielä
   selvemmin kaukaa, säätö on `KAISTAN_MIN_PX` eikä peitto.
4. **Leveyskertoimien teksti** on Fablen kirjoitettava (14.3).
5. **Kotipesät** ovat yhä Line2-renkaita. Ne eivät värise (peitto 0,28,
   ei syvyyskirjoitusta), mutta ne ovat eri kieltä kuin kaista; jos
   omistaja haluaa niistäkin kaistan, mekanismi on sama varjostin
   ilman janaa (säde pisteestä).

## 15. Aikaselain (7.9.2026)

*(Raamattu "LINSSIEN AIKASELAIN ALAREUNAAN", omistaja 7.9.2026 klo
20.55 Suomen aikaa, sanatarkasti: "Onko alas mahdollista tehdä
yksinkertaista aikaselainta, mikä olisi täynnä pystyviivoja ja valittu
aika olisi pidempi viiva? Siitä olisi nopea sormella valita aikapiste ja
kelata esityksen eri vaiheita ja projisoida levinneisyyttä maapallolla.
Vuosiluku saa säilyä ylhäällä mutta se voisi toistua pienellä sen
korkeamman viivan päällä. … Korkean viivan viereiset viivat voisivat
olla vähän koholla. … Sama elementti toimisi tulevissakin linsseissä.")*

### 15.1 Linjaus ja rajaus

Nauha on **yhteinen linssiosa**, ei Ihmisen matkan oma. Siksi
`js/linssit/aikaselain.js` ei tunne kelloa, vanoja, kameraa eikä
kertomusta: se saa listan pisteitä ja kertoo kutsujalle, mihin sormi
osoittaa. Yksikkötesti vartioi tämän sanahaulla (`tests/aikaselain.test.mjs`:
lähdekoodissa ei saa esiintyä sanoja kertomus, jakso, vana, kello,
kamera, pito) — ilman vartiota moduuli olisi kolmessa kuukaudessa
Ihmisen matkan toinen ohjaaja.

**Keksintölinssi jäi tältä erältä pois.** Sen alalaidassa ovat esinerivi
(karuselli) ja loppulappu, joiden mitat ja savukkeet (savuke-aikajana,
13 väitettä) on tehty ilman nauhaa: nauha peittäisi karusellin alareunan
ja siirtäisi lapun. Moduuli on valmis kytkettäväksi (pisteet =
pysäkit, valinta = `ajo.siirry(i)`), mutta kytkentä vaatii karusellin
uudelleensijoituksen ja oman mittauskierroksensa. Kirjattu avoimeksi
(15.7).

**Jaksovalikkoa ei ollut olemassa.** Raamatun linjaus sanoo "Korvaa
jaksovalikon ja Jatka-napin"; palkissa ei kuitenkaan ole eikä ole ollut
pudotusvalikkoa, ja Jatka on saman Tauko-napin toinen teksti (luku
13.2). Palkki on siis ennallaan: **Tauko/Jatka, ↺ ja ✕** samankorkuisina
kuten v1678:ssa. Nauha korvaa sen, mitä valikko olisi tehnyt — jaksojen
selaamisen.

### 15.2 Rajapinta

```js
luoAikaselain({
  pisteet,       // [{ id, otsikko, vuosia }] JAKSOJÄRJESTYKSESSÄ
  nykyinen,      // valitun pisteen id (tai null)
  onEsikatselu,  // (id, osuus) sormen liikkuessa
  onValinta,     // (id) sormen irrotessa tai napautuksesta
  teksti,        // (vuosia) → vuosiluvun muoto viivan päällä
  nimi,          // aria-label
  reducedMotion,
}) → { el, aseta(id), tila(), pura() } | null
```

`osuus` on **jatkuva sijainti nauhalla 0…1** (0 = ensimmäinen viiva,
1 = viimeinen), ei viivan indeksi: viivojen VÄLISSÄ kello saa liikkua,
ja moduulin ei kuulu tietää, mitä välisijainti tarkoittaa vuosina.
Kertomuskaarella tulkinnan tekee `kelauksenLukema` (js/linssit/
ihmisen-matka-esitys.js): geometrinen interpolointi naapurijaksojen
`vuosia`-arvojen välillä, samalla kaavalla kuin kellon oma asteikko
(`vuosiaSittenLukema`) — muuten sormen alla oleva luku eroaisi siitä,
minkä kello näyttää samassa kohdassa esityksen kuluessa. Nollapää
(viimeinen jakso on 0) menee suoraan, koska logaritmi ei kestä nollaa.

Puhtaat funktiot (kaikki testattu): `aallonTaso(d)` (kosinipehmennys,
1 → 0,85 → 0,50 → 0,15 → 0), `viivanPaikka(i, maara)` (prosenttia,
laitaan jää puoli väliä), `osuusPaikasta(x, leveys, maara)`,
`lahinIndeksi(osuus, maara)`.

### 15.3 Viivat ovat jaksojärjestyksessä, eivät ajassa

Välit ovat tasan yhtä suuret. Aika on epälineaarinen — kaari kulkee
300 000 vuodesta nollaan ja kelaa kahdesti taaksepäin (luku 12.5) — ja
ajan mukaan sijoitettuna kaksikymmentä ensimmäistä jaksoa kasautuisi
vasempaan laitaan. Nauha on siis kertomuksen **sisällysluettelo**, ei
mittatikku. Vuosiluku valitun viivan päällä on kellon omassa muodossa
(`ajo.selaimenVuositeksti` lukee sen `asteikko.teksti`- ja
`asteikko.yksikko`-kentistä): "300 000 v. sitten", loppupäässä
"n. 1250 jaa.".

### 15.4 Yksi kosketuspinta

Koko nauha on yksi pinta, ei kahtakymmentä nappia. `pointerdown` ottaa
osoittimen kiinni (`setPointerCapture`), joten veto pysyy nauhalla
vaikka sormi lipsahtaisi kartalle; `touch-action: none` estää selainta
tulkitsemasta vetoa vieritykseksi, ja tapahtumat pysäytetään
(`stopPropagation`), jottei pallo saa niitä panorointina. Nauhan
ULKOPUOLELLA selain ei kuuntele mitään — pallon oma panorointi on siis
kirjaimelleen ennallaan.

**Irrotuskohta ratkaisee.** Valinta luetaan `pointerup`-tapahtumasta
eikä viimeisestä `pointermove`-esikatselusta: nopeassa napautuksessa
liikettä ei tule lainkaan, ja hitaassa vedossa sormi ehtii liikahtaa
vielä viimeisen liikkeen jälkeen (löytyi yksikkötestistä ennen
selainta).

Nuolinäppäimet siirtävät valintaa yhden viivan. Se ei vie mitään pois:
kertomusesityksessä nuolet eivät selaa mitään (js/aikajana.js `nappain`
palaa esityksessä heti), ja nauha on ainoa ohjain, jolla ilman tätä ei
pärjäisi näppäimistöllä.

### 15.5 Kytkentä kertomusesitykseen

Moottori rakentaa nauhan palkin mukana (`js/aikajana.js
rakennaAikaselain`, kutsu `rakennaPalkki`in lopussa) ja välittää
takaisinkutsut sellaisenaan ohjaajalle:

| Nauha | Ohjaaja (ihmisen-matka-esitys.js) |
| --- | --- |
| `onEsikatselu(id, osuus)` | `esikatsele(osuus)` |
| `onValinta(id)` | `valitse(id)` |
| `aseta(id)` | kutsutaan `aloitaJakso`ssa ja `paata`ssa |

**Veto (`esikatsele`).** Esitys menee HILJAA tauolle: silmukka
pysähtyy, kertojan äänite pausetetaan, nappien teksteihin ei kosketa
(veto ei ole Tauko-napin painallus). Kello ja vanat seuraavat sormea
`kelaaKello`-funktiolla, joka eroaa tavallisesta `kirjoitaKello`sta
kahdesti: **pitoa ei kasvateta** (pidon pohja asetetaan vasta
valinnassa) ja **vanat päivitetään suoraan** (`vanat().paivita(t,
{ pito: false })`). Suora kutsu on pakollinen: tutkimusvaiheessa
virtamoduulin oma silmukka ei lue kelloa lainkaan (js/aikajana-virrat.js
`silmukka`: lukema on siellä vakio 0), joten ilman sitä nauha ei kelaisi
levinneisyyttä esityksen jälkeen mihinkään.

**Pito katkeaa vedon ajaksi.** Pito on yksisuuntainen maksimi (luku
12.5): ilman katkaisua taaksepäin kelattu kartta jäisi näyttämään
Amerikkoja Afrikan jakson kohdalla. Valinnassa pidon pohja asetetaan
valitun jakson lukemaan ja pito kytketään takaisin päälle.

**Irrotus (`valitse`).** Esitys jatkaa valitusta jaksosta **sen
alusta**: luenta alkaa, kamera ajaa, kello lähtee jakson lukemasta. Jos
pelaaja oli ITSE tauolla ennen vetoa, jakso vaihtuu mutta esitys jää
tauolle (`selaus.oliTauolla`). Tutkimusvaiheessa (`tila.paattynyt`) sama
valinta on pelkkä kelaus: kello ja vanat siirtyvät hetkeen, kertoja on
vaiti, muisti tallennetaan.

Pimeässä alussa nauha on piilossa kuten kello ja Tauko-nappi
(`.aikajana.esitys-pimea .aikaselain { opacity: 0 }`), mutta se on jo
rakennettu — muuten se pompahtaisi esiin valojen syttyessä.

### 15.6 Mitatut luvut

MITATTU 7.9.2026 (kontti, ohjelmisto-WebGL):

| | 834 × 1100 | 390 × 844 |
| --- | --- | --- |
| nauhan mitat | x 11, y 1027, 813 × 62 px | x 8, y 782, 374 × 54 px |
| viivoja | 22 | 22 |
| viivaväli | 37 px | 17 px |
| korkeudet aallossa | 30 · 27 · 20 · 12 · 9 px | 26 · 23 · 17 · 11 · 8 px |
| kertojan tekstin alareuna | 1 016 px (nauha alkaa 1 027) | 771 px (nauha alkaa 782) |

Kertojan teksti, noston kortti ja pergamenttilappu väistävät nauhaa
yhden luvun varassa (`--aikaselain-korkeus`, body-luokka
`aikaselain-auki`) — sama kuvio kuin aikoinaan karusellin kanssa, mutta
vakiona, koska nauhan mitat ovat css:n omia.

Veto ruutukoordinaateilla (`page.mouse`, tabletti ja puhelin): kello
kelautui 287 645 → 22 000 vuoteen, vanat piirtyivät siihen hetkeen
(Euroopan ja Pohjois-Afrikan reitit näkyvissä), esikatselu seurasi
sormea viivalta viivalle ja irrotus vaihtoi jakson valittuun
(`beringia`). Kun veto alkoi pelaajan omalla tauolla, esitys jäi
tauolle; muuten se jatkoi.

### 15.7 Avoimet asiat

1. **Keksintölinssi** (28 pysäkkiä) ei saanut nauhaa (15.1). Kytkentä
   vaatii karusellin ja loppulapun uudelleensijoituksen sekä
   savuke-aikajanan mittojen tarkistuksen.
2. **Vuosiluvun rajaus laidoissa** on css:n `clamp(4,2rem …)` eli arvio
   pisimmästä tekstistä ("300 000 v. sitten"). Jos kaari joskus saa
   pidemmän yksikön, luku voi valua laidan yli — mitta on css:ssä
   yhdessä kohdassa.
3. **Nauhan leveys on kartta-alueen leveys** (11 px kehys kummallakin
   laidalla, sama kuin palkilla), ei ikkunan. Omistajan sanamuoto oli
   "alas" eikä "reunasta reunaan"; jos halutaan kirjaimellisesti koko
   ruudun levyinen, se vaatii kehyksen ohittamisen.

### 15.8 Portit ja ajetut savukkeet

- `node --test tests/*.test.mjs` — `tests/aikaselain.test.mjs`
  (19 väitettä, oma pieni DOM: asettelu, aalto, veto, napautus,
  näppäimistö, purku, kelauksen lukema, kytkentä ja mitat) sekä
  lisäykset esitys- ja tutkimustesteihin.
- `node tools/savukkeet/savuke-ihmisen-tutkimus.mjs` — väite 2b (aito
  veto ruutukoordinaateilla esityksen aikana) ja 5a (kelaus
  tutkimusvaiheessa), kuvakaappaukset `aikaselain-vedossa` ja
  `aikaselain-tutkimus` kummastakin näkymästä.
- `node tools/savukkeet/savuke-ihmisen-esitys.mjs` — nauha on pimeässä
  piilossa mutta rakennettu, ja sen valinta seuraa esitystä viimeiseen
  jaksoon asti.
- `node tools/savukkeet/savuke-aikajana.mjs` — keksintölinssi ennallaan
  (nauhaa ei ole).

AJETTU 7.9.2026 (kontti, ohjelmisto-WebGL):

| Savuke | Tulos |
| --- | --- |
| `node --test tests/*.test.mjs` | 2 231 läpi, 0 kaatunutta, 13 ohitettua |
| `savuke-ihmisen-tutkimus` | **44/44** (tabletti ja puhelin) |
| `savuke-ihmisen-esitys` | **17/17** |
| `savuke-aikajana` (regressio) | **13/13** |

Savukkeissa korjattiin ajojen aikana neljä MITTAUSVIRHETTÄ, joissa
väite kaatui vaikka koodi toimi (kaikki kirjattu commit-viesteihin):
muistiväitteen jakso luettiin vanhasta muuttujasta, avaruusmittaus oli
eri `evaluate`-kutsussa kuin pimeän mittaus, nauhan häivytystä
verrattiin tasan nollaan, ja kellon kelaus vaadittiin osumaan harvaan
otokseen. Yhtään tuotantokoodin väitettä ei löysätty.

## 16. Avaruus: musta alku on avaruus (7.9.2026)

*(Raamattu "IHMISEN MATKA: MUSTA ALKU ON AVARUUS, PALLO ZOOMAUTUU
PIMEYDESTA AFRIKKA EDELLA", omistaja 7.9.2026 ilta: "Ja se pimeys on
avaruus" ja tarkennus "Kertoja alkaa jo pimeydestä". Tämä luku korvaa
luvun 12.3 kohdan 1 (PIMEÄ) ja täydentää kohtaa 2 (VALOT).)*

### 16.1 Mikä muuttui

Ennen: linssin juuressa oli läpinäkymätön musta peite koko ruudun
päällä, ja kamera oli ajettu Afrikkaan sen alla — pelaaja näki mustan
ruudun ja kuuli kertojan.

Nyt: **musta on pallon ALLA**, ja Maa näkyy kaukana pienenä ja tummana
tähtien keskellä. Kertoja alkaa heti, ja pallo kasvaa luennan aikana
täyteen kokoon Afrikka keskellä. Kolme osaa:

| Osa | Missä |
| --- | --- |
| Musta pohja pallon alla | `js/linssit/ihmisen-matka-esitys.js asennaAvaruus`, css `.aikajana-avaruus` |
| Tähdet ja pöly pallon näyttämöllä | `js/pallolauta/tahdet.js` |
| Zoomi kaukaa Afrikkaan | `js/linssit/ihmisen-matka-esitys.js avaruusavaus` |

### 16.2 Musta menee pallon alle, ei sen päälle

> **Täydennetty 8.9.2026 (luku 17):** ruutu on ENSIN kokonaan musta
> (peite läpinäkymätön) ja laskee vasta sitten harsoksi 0,35 — tähdet
> feidautuvat esiin sen alta.

Pallon oma piirtoalusta on läpinäkyvä (`js/pallo.js rakennaPallo`
`backgroundColor('rgba(0,0,0,0)')`), joten pallon ympärillä näkyy
karttaruudun nahka. Musta levy pannaan siksi **karttaruudun
ensimmäiseksi lapseksi** (`koti.prepend`): DOM-järjestyksessä se jää
pallon kuoren alle, ja pallo tähtineen piirtyy sen päälle. Linssin oma
juuri (z-index 7) ei kelpaa tähän — siellä levy peittäisi pallon.

Vanha peite jää paikalleen kahdesta syystä: pallo ei saa pyörähtää
sormesta kesken ajon, ja kaukainen Maa on **tumma** (harso
`opacity: 0,55` → 0 zoomin tahdissa, `.aikajana-esitys-peite.avaruus`).

### 16.3 Tähdet: kirjaston oma hiukkaskerros

Globe.gl 2.46 kantaa three.js:n sisällään eikä vie sitä ulos (sama
havainto kuin `js/pallo.js kolmiulotteinen`): `THREE.Points` ja
`THREE.PointsMaterial` eivät ole saatavilla globaalista eikä niitä voi
lukea pallon omista verkoista (ne ovat Meshejä). Kirjastossa on
kuitenkin **valmis hiukkaskerros** (`particlesData`), joka rakentaa
täsmälleen `new Points(new BufferGeometry, new PointsMaterial)`
jokaiselle joukolle ja merkitsee ne kentällä `__globeObjType`. Moduuli
käyttää sitä kerrosta ja hakee syntyneet Points-oliot näyttämöltä, jotta
materiaaliin voi asettaa additiivisen sekoituksen (`blending = 2`),
läpinäkyvyyden ja `depthWrite: false`.

Kolme kerrosta kahdella etäisyydellä (yhteensä **2 190 pistettä**):

| Kerros | Pisteitä | Korkeus (pallonsädettä) | Koko | Ajautuu |
| --- | --- | --- | --- | --- |
| kaukaiset | 1 200 | 5,4–6,5 | 0,90 | ei |
| kirkkaat | 260 | 4,8–5,8 | 1,35 | ei |
| pöly | 730 | 2,6–3,4 | 1,30 | kyllä, 0,0016 kierrosta/s |

Kaikkien on oltava kameran kaukaisimman etäisyyden **ulkopuolella**,
muuten pilvi olisi pallon edessä (yksikkötesti vartioi). Parallaksi
tulee perspektiivistä ilmaiseksi: kun kamera tulee sisään, lähempi pöly
liikkuu ruudulla enemmän kuin kaukaiset tähdet.

Leveysaste arvotaan **sinistä** eikä tasaisesti asteista: tasainen
arvonta kasaisi pisteet napoihin. Mitta testissä: |lat| > 60° kattaa
13,4 % pallon pinnasta, ja osuuden on oltava lähellä sitä.

**Kehystahti.** Kolme piirtokutsua. Geometria lasketaan kerran; joka
kehyksellä muuttuu vain yhden olion `rotation.y` ja materiaalien
`opacity`. Pilvi poistetaan näyttämöltä (`particlesData([])`) heti
avauksen jälkeen, eikä sitä luoda lainkaan muistista jatkettaessa.
`tools/savukkeet/savuke-pallo-kehystahti.mjs` ei avaa linssiä, joten se
ei mittaa tätä kerrosta — mitta on rakenteellinen (ks. avoimet asiat).

### 16.4 Zoomi: laudan oma kamera, katto hetkeksi auki

> **Korvattu 8.9.2026 (luku 17):** lähtökorkeus on 50 (ei 7,5), kesto
> 7 s (ei 5,2 s), tähtitaivas venytetään kymmenkertaiseksi, ja zoomi
> lähtee vasta kun kertoja sanoo "Afrikasta". Kappaleen periaate —
> laudan oma kamera, katto hetkeksi auki — pätee ennallaan.

Lähtökorkeus on **7,5 pallonsädettä**. MITATTU 7.9.2026: laudan oma
katto (`js/pallolauta/kamera.js PALLO_KORKEUS_MAX` = 2,5, ja
`js/pallolauta/lauta.js` sitoo OrbitControlsin `maxDistancen` samaan) on
liian lähellä — korkeudella 2,5 pallo täyttää jo ruudun leveyden ja
mustaa jää vain kapea kaistale ylle ja alle. Tähdille ei jäisi taivasta
eikä pallo olisi "pieni".

Avaus siis **leventää ohjaimen kattoa hetkeksi** ja asettaa lähtönäkymän
laudan omalla `pointOfView`-kutsulla; zoomi ajetaan laudan omalla
`ajaKameralla` (`ajaAlueeseen('afrikka', AVARUUDEN_MS)`), joka rajaa
MAALIN normaaliin 2,5:een ja tekee pehmennyksen. Uutta kameramoottoria
ei tehdä — avauksen ainoa oma kehyskutsu on harson luokanvaihto.

**Katto palautetaan ajastimella** (`AVARUUDEN_MS + 400`) eikä ajon
lupauksella: 'afrikka'-jakso ajaa saman rajauksen uudestaan jäljellä
olevalla ajalla, jolloin ensimmäisen ajon lupaus jää ratkeamatta.
Purku palauttaa katon myös, jos linssi suljetaan kesken avauksen. Ilman
palautusta pelaaja voisi nipistää itsensä avaruuteen kesken kertomuksen.

Kesto on **5,2 s** ja tähdet häipyvät zoomin viimeisen 55 %:n aikana
(`TAHTIEN_HAIVE`). Kertoja alkaa heti napista: avausjakson luenta on
noin 9 s (ilman äänitettä varakesto), joten pallo on perillä kertojan
puhuessa. Jos luenta on lyhyempi kuin zoomi, 'afrikka'-jakso EI katkaise
ajoa vaan jatkaa sitä jäljellä olevan ajan (`avaruuttaJaljella`).

`prefers-reduced-motion`: suora leikkaus Afrikkaan, tähdet paikallaan
ilman ajautumista, harso pois.

**Muistista jatkettaessa avaruutta ei luoda.** Pelaaja on jo ollut
matkalla, eikä avausta näytetä uudestaan (sama sääntö kuin mustalla
alulla, luku 13.5).

### 16.5 Sallittujen kerrosten lista kasvoi

`js/pallolauta/lauta.js PALLOLAUDAN_KERROKSET` sai kuudennen jäsenen,
`particlesData`. Sääntö "ei mitään pinnoitteen päälle" (Raamattu
5.9.2026) ei rikkoudu: pisteet ovat 2,6–6,5 pallonsädettä pinnan
YLÄPUOLELLA, ne eivät ole karttaa, ja kerros on tyhjä aina kun
kertomusesityksen avaus ei ole käynnissä. Kaksi yksikkötestiä
(`tests/pallolauta.test.mjs`, `tests/pallonimet.test.mjs`) vartioivat
listaa, ja kumpaankin on kirjattu peruste.

### 16.6 Mitatut luvut

MITATTU 7.9.2026 (kontti, ohjelmisto-WebGL, äänitteet mockattuina):

- Korkeus 7,5 → 1,878 (834 × 1100), Afrikka keskellä koko ajon:
  lat 1,0 → 1,1, lng 17,0.
- Tähtiä 2 190 kolmessa kerroksessa; musta levy on karttaruudun
  ensimmäinen lapsi ja peittävyys 1 koko pimeän ajan.
- Avausjakson luenta on käynnissä (`kaynnissa: true`) jo ensimmäisellä
  mittauksella, kun korkeus on vielä 7,5 — kertoja alkaa pimeydestä.
- Ei sivuvirheitä kummassakaan näkymässä.
- Hidas laite: jos kehykset nälkiintyvät, ajo voi jäädä kesken ja
  ohjaimen katon palautus rajaa korkeuden 2,5:een. Seuraava jakso ajaa
  Afrikan rajauksen kestolla 0, joten näkymä korjautuu itsestään
  (mitattu puhelinnäkymässä).

### 16.7 Avoimet asiat

1. **Kehystahtia ei mitattu avauksen aikana.** `savuke-pallo-kehystahti`
   mittaa pallon panorointia ja zoomia ILMAN linssiä, joten tähtikerros
   ei näy siinä lainkaan. Peruste on rakenteellinen (kolme piirtokutsua,
   ei kehyskohtaista laskentaa) ja pilvi elää vain viisi sekuntia. Jos
   mittaus halutaan, savukkeeseen tarvitaan linssin avaava vaihe.
2. **Valon reuna** on pallon oma ilmakehä (`atmosphereColor #d9a13b`),
   ei erillinen terminaattori. Omistajan sanoissa "valon reuna näkyy"
   voi tarkoittaa myös aitoa päivän ja yön rajaa — se olisi oma työnsä
   (valon suunta ja varjopuoli laattamateriaalissa).
3. **Kirkkaat pisteet ovat neliöitä.** PointsMaterial ilman tekstuuria
   piirtää neliön; koossa 1,35 se ei erotu, mutta suuremmassa koossa
   erottuisi. Pyöreä tähti vaatisi `particlesTexture`-kuvan tai
   canvas-tekstuurin.

## 17. Avaus mustasta tähtiin ja Afrikkaan sanan kohdalla (8.9.2026)

*(Raamattu "IHMISEN MATKA: ETELA-AFRIKKA VAIN KERRAN … JA AVAUS
MUSTASTA TAHTIIN JA AFRIKKAAN SANAN KOHDALLA", omistaja 8.9.2026,
sanatarkasti:*

> "Linssin aloitus voisi olla kokonaan musta ruutu ja sitten siihen
> feidautuisi ensin tähtiä ja sitten ihan pienestä pisteestä
> zoomautuisi afrikka esiin juuri sillä hetkellä kun kertoja mainitsee
> sanan afrikka. Jokainen lause voisi tulla tämän kappaleen loppuun
> asti yksitellen keskelle ruutua. Vasta kun siirrytään ensimmäiseen
> kohteeseen tekstit hyppäävät alas nykyiselle paikalleen."

*Tämä luku korvaa luvut 16.2 ja 16.4 sekä luvun 12.3 kohdat 1–2.)*

### 17.1 Neljä hetkeä

| # | Hetki | Mitä ruudulla | Kesto |
| --- | --- | --- | --- |
| 1 | MUSTA | Kokonaan musta: ei palloa, ei tähtiä. Kertoja alkaa. | `MUSTAN_HETKI_MS` 300 ms |
| 2 | TÄHDET | Musta laskee harsoksi, tähdet nousevat esiin, Maa on niiden keskellä pisteenä. | `TAHTIEN_FEIDI_MS` 1 800 ms |
| 3 | AFRIKKA-SANA | Zoomi lähtee neljännen lauseen ("Afrikasta.") kohdalla ja pallo kasvaa ruudun täyttäväksi. | `AVARUUDEN_MS` 7 000 ms |
| 4 | TEKSTI ALAS | Ensimmäisen kohteen alkaessa lauserivi laskeutuu keskeltä alalaitaan. | `TEKSTIN_LASKU_MS` 900 ms |

Ero entiseen (luku 16): ennen zoomi lähti heti Käynnistä-napista ja
valot syttyivät `afrikka`-jakson alkaessa. Nyt zoomi on sidottu
KERTOJAN SANAAN, ja valot odottavat pallon perille tuloa.

### 17.2 Musta ensin, harso sitten

Peite (`.aikajana-esitys-peite`) saa avauksessa kaksi luokkaa:
`avaruus musta` = läpinäkymätön #000 koko ruudun päällä. Musta levy
pallon alla (luku 16.2) ja tähdet ovat jo olemassa, mutta niitä ei näy.
Ensimmäisellä kehyksellä luokka `musta` poistetaan, ja css hoitaa
ajoituksen: `transition: opacity 1800ms ease 300ms` vie peitteen arvoon
`AVARUUDEN_HARSO` = 0,35 (ennen 0,55 — kevyempi harso, koska pallo on
nyt piste eikä kirkas kiekko, ja tähdet saavat näkyä).

Tähtien nousu ajetaan JS:stä (`tahtienEsiinTulo`) samasta kellosta kuin
lauseet — `tila.kulunut` — jotta **tauko pysäyttää senkin**. Luku ei
koskaan laske, jottei taivas välkähdä jakson vaihtuessa.

### 17.3 Piste: korkeus 50 ja kymmenkertainen taivas

| | ennen | nyt |
| --- | --- | --- |
| `AVARUUDEN_KORKEUS` | 7,5 | **50** |
| pallon halkaisija ruudun korkeudesta | 27 % | **4,5 %** (n. 36 px / 800 px) |
| `TAHTIEN_KERROIN` | — | **10** |
| tähtikerrokset (pallonsädettä) | 2,6–6,5 | 26–65 |
| `AVARUUDEN_MS` | 5 200 | **7 000** |

Pallon kulmahalkaisija on `2·asin(1/(1+h))` ja ruudun korkeus fov 50°,
mistä `pallonOsuusRuudusta` (puhdas funktio, yksikkötesti). Pelkkä
kameran vetäminen kauas ei riitä: tähtitaivas on pallon näyttämöllä ja
skaalautuu sen mukana, joten korkeudella 50 vanha taivas olisi kutistunut
pieneksi ryppääksi pisteen viereen. `js/pallolauta/tahdet.js` sai siksi
`kerroin`-asetuksen, joka venyttää sekä kerrosten korkeudet että pisteiden
koon (koko kutistuu etäisyyden mukana, `particlesSizeAttenuation`).
Kymmenkertaisena kirkkaat kerrokset (48–65) jäävät kameran (51) TAAKSE →
tähtiä on joka suunnassa kuten yötaivaalla, ja pölykerros (26–34) jää
eteen antamaan parallaksin zoomin aikana.

MITATTU (kontti, 1280 × 800): kameran far-taso on 125 000 yksikköä eli
1 250 pallonsädettä, joten mikään ei leikkaudu. Korkeus 50 vaatii
OrbitControlsin `maxDistancen` avaamisen kuten ennenkin
(`avaaKaukaisuus` → `palautaKaukaisuus`).

### 17.4 Ajoitus: lauseet, sana ja aikaleimakoukku

Kolme puhdasta funktiota (`js/linssit/ihmisen-matka-esitys.js`,
yksikkötestit `tests/ihmisen-matka-esitys.test.mjs`):

- `jaaLauseiksi(teksti)` → `[{ teksti, alku }]`. Lause päättyy vain, jos
  päätemerkin (`.`, `!`, `?`, `…`) jälkeen tulee välilyönti tai teksti
  loppuu — niin "…on löydetty" ei tuota tyhjää lausetta eikä "Marokon
  kukkulalta…" katkea kesken.
- `lauseidenHetket(lauseet, kesto, aikaleimat)` → ms-taulukko.
- `sananHetki(teksti, hakusana, kesto, aikaleimat)` → ms tai null.

**Arvio** on merkkiosuus: lause (tai sana) alkaa siinä kohdassa
luentaa, jossa sitä edeltävät merkit on luettu. Sama mitta kuin
`kertomuksenVarakesto` (14 merkkiä/s), joten arvio ja jakson kesto
puhuvat samaa kieltä. Kesto on `tila.luenta`, joka tarkentuu äänitteen
metatiedoista kesken jakson — hetket lasketaan joka kehyksellä
uudestaan, joten loputkin lauseet siirtyvät oikeaan kohtaan itsestään.

**AIKALEIMAKOUKKU.** Kun Fable generoi luennan aikaleimoineen, kaanonin
jaksoon (`js/linssit/ihmisen-matka-kertomus.js`) lisätään kenttä:

```js
aikaleimat: {
  lauseet: [0, 3120, 5040, 6980, 7910],
  sanat: [0, 480, 980, 1520, 2010, /* … yksi per sana … */],
}
```

- millisekunteja **jakson luennan alusta**;
- `lauseet` yhtä monta alkiota kuin `jaaLauseiksi` antaa lauseita;
- `sanat` yhtä monta kuin tekstissä on välilyönnillä erotettuja sanoja
  (`teksti.replace(/\s+/g,' ').trim().split(' ')`);
- oikean mittainen ja äärellisistä luvuista koostuva taulukko VOITTAA
  arvion, muuten arvio jää voimaan eikä mikään rikkoudu.

Zoomin lähtösana on vakio `AVAUKSEN_SANA = 'Afrik'` (alkuosa riittää,
joten taivutus saa vaihtua). Kaanonin nykyisellä tekstillä sana osuu
78,8 %:n kohdalle avausjakson luentaa (ilman äänitettä 6 643 ms /
8 429 ms) eli täsmälleen neljännen lauseen alkuun.

### 17.5 Lause kerrallaan keskelle, sitten alas

Rivi `.aikajana-kertomusteksti` asemoidaan nyt **ylhäältä**
(`top: calc(100% - var(--kertomusteksti-ala))` + `translate(-50%,-100%)`),
koska `bottom` ei liu'u arvoon `top: 50%`. Alalaidan etäisyyden vaihtavat
kertomuskaari ja aikaselain pelkällä muuttujalla, jolloin ne eivät
ylikirjoita keskitystä tarkemmalla valitsimella. Luokka `keskella`
nostaa rivin ruudun keskelle, leventää sen ja vaihtaa pergamenttilaatikon
pelkäksi valoksi (1,5 rem, ei taustaa, ei kehystä; puhelimella 1,25 rem).
Kaikki neljä ominaisuutta ovat siirtyviä, joten lasku on pehmeä.

Lauseen oma näkyvyys on **sisuksessa** (`.aikajana-kertomusteksti-sisus
.nakyy`), rivin näkyvyys rivissä (`.esilla`): ohjaaja häivyttää lauseen
`LAUSEEN_HAIVE_MS` = 340 ms ennen seuraavan alkua ja vaihtaa tekstin
vasta pimeässä, joten lukija ei näe kirjainten vaihtuvan.

Keskitys koskee kaanonin kahta ensimmäistä jaksoa (`pimea`, `valot`)
ja päättyy **yksisuuntaisesti** (`tila.avausOhi`) ensimmäiseen
kohteeseen: aikaselaimella taakse kelaava pelaaja ei saa tekstiä enää
keskelle, eikä muistista jatkettaessa avausta ole lainkaan.

### 17.6 Valot vasta perillä, ja tauko pysäyttää zoomin

`sytytaValot` ei enää lähde `afrikka`-jakson alkaessa vaan silloin, kun
avausajoa ei ole jäljellä (`tila.valotOdottaa` + kehyssilmukka):
käyttöliittymä, musiikki ja vanojen pito tulevat sillä hetkellä, kun
Afrikka täyttää ruudun. Varaportit: zoomi lähtee viimeistään
`valot`-jakson alkaessa ja valot syttyvät viimeistään seuraavan jakson
alkaessa, joten lyhyt äänite ei jätä avausta roikkumaan.

Kamera-ajo elää laudan omassa silmukassa, joten **tauko pysäyttää sen
erikseen**: `pysaytaAvaruusajo` jäädyttää zoomin kelloon kuluneen ajan
ja kutsuu `kamera().pysaytaKameraAjo()`, ja `jatkaAvaruusajo` ajaa
saman rajauksen jäljellä olevalla ajalla (ajo lähtee aina siitä
näkymästä, jossa kamera nyt on). Aikaselaimella eteenpäin hypännyt
pelaaja ei herätä keskeytynyttä avausajoa (`avausOhi`).

### 17.7 Mittarit ja mitatut luvut

`esitys.tila()` sai avauksen mittarit: `avausOdottaa`, `avausOhi`,
`zoominHetki`, `zoomLahti` (`{ jakso, kulunut, hetki, luenta }`),
`tahtiEsiin`, `keskella`, `lause`, `lauseita`, `teksti`, `tekstiNakyy`.

`zoomLahti` on savuketta varten: kontin ohjelmisto-WebGL piirtää pallon
noin kehyksen sekunnissa, eikä näytteenotto mahdu siihen 1,8 sekuntiin,
joka jää sanasta jakson loppuun — ohjaaja kirjaa hetken silloin kun se
tapahtuu. Samasta syystä savuke **pysäyttää esityksen samalla
silmukkakierroksella**, jolla ehto täyttyy (`odotaJaPysayta`); erillinen
odotus ja erillinen mittaus mittasivat eri hetkiä.

Savuke `tools/savukkeet/savuke-ihmisen-esitys.mjs`:

- `VAIN_AVAUS=1` ajaa vain avausosan (musta → ensimmäinen kohde).
- Avausjaksot saavat 9 sekunnin mock-hiljaisuuden (muut 3 s), koska
  7 sekunnin zoomi ei mahtuisi kolmen sekunnin luentaan.
- Kuvat: `0-musta`, `1-tahdet`, `2-afrikka-pisteena`, `3-tauko-avauksessa`,
  `4-afrikka-puolivalissa`, `5-valot-afrikkaan`, `6-teksti-alhaalla`.
