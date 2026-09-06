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

## 7. Mitä jää auki toteutukseen

- Kaistan pehmeä reuna: Line2 ei häivytä reunaansa; kaksi päällekkäistä
  leveyttä on porrastettu häive. Jos se ei kelpaa kuvissa, vaihtoehto
  on oma varjostin (nauha-koe luvussa pallon-vektoriviivat.md 2.2 —
  sama hinta kuin Line2) — vasta omistajan kuvien jälkeen.
- Kotipesät renkaana vai kalvona: V2 valitsee kuvasta.
- Kalvon koneiston poisto (maalaa, tarkennaKentat, PIIRTOKERROIN, Worker
  siirtopuskurit) omana siivouseränä, kun omistaja on hyväksynyt vanat.
- Tasokartta (?lauta=kartta) pysyy valolinssinä (päätös 9).

## 8. Avoimet kysymykset omistajalle (vain aidot tasapelit)

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

## 9. Kokeiluskriptit ja kuvat (scratchpad, ei repossa)

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
