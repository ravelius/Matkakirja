# C Resepti: kartan tietokortti (faktakaava ja Pulun ohje)

*(Sisältökirjuri 26.10.2026, Päätoimittajan tilaus. Raamattu 2.203, poikkeus kohtiin 2.31 ja 2.76. Luvat ja portit: D `tuotannonohjaus.md`. Toteuttaja: Karttaseppä.)*

**Mikä:** kun pelaaja napauttaa syvän kartan nimeä tai kohdetta, kortti aukeaa heti olemassa olevalla kohdekorttipohjalla
(2.11, UI-POHJAT; omaa ulkoasua ei tehdä). Ylempänä ovat Wikidatan faktat kiinteällä suomenkielisellä kaavalla (osa 1), alla
striimautuu Pulun lyhyt teksti ja Lue lisää (osa 2). Faktat näkyvät heti, Pulun teksti tulee perässä.

**Sisältökirjuri tekee tämän tiedoston. Karttaseppä toteuttaa ketjun** (OSM-nimi → Wikidata → kaava → worker → ämpäri).
Tässä on kaikki, mitä toteutus tarvitsee sisällöstä: laji- ja ominaisuustaulut, pyöristys, muotoilusäännöt, testitapaukset
ja Pulun kehote kokonaan.

---

## Osa 1. Faktakaava: kiinteä suomenkielinen muoto

### 1.1 Periaatteet

1. **Kaava on kiinteä, ei kielioppia.** Kortin rivit ovat muotoa `Otsikko: arvo`. Mitään ei taivuteta (ei "Ranskassa", ei
   "kaupungissa"), joten kaava ei voi rikkoutua nimen päätteeseen. Poikkeus on vain lukumäärän jälkeinen "asukasta" (osa 1.5).
2. **Puuttuva kenttä jätetään kokonaan pois.** Ei riviä, ei viivaa, ei "tuntematon". Jos faktoja ei ole yhtään, kortissa ovat nimi,
   laji, maa ja kuva (jos on).
3. **Kaikki tulee Wikidatasta.** Ei arvauksia, ei laskentaa kentistä (ei tiheyttä, ei ikää), ei yhdistämistä muista lähteistä.
4. **Nimi:** Wikidatan suomenkielinen label (`labels.fi`); jos sitä ei ole, englanninkielinen (`labels.en`); jos sitäkään ei ole,
   kohteen alkukielinen nimi (P1448 tai OSM:n `name`). Nimeä ei käännetä itse.
5. **Lähderivi aina näkyvissä:** `Lähde: Wikidata, Wikipedia`. Kuvasta tekijä ja lisenssi Commonsista rajapinnasta
   (Raamattu 11.1: kuvat PD/CC; BY-SA tekijän nimellä).
6. **Enintään viisi faktariviä.** Jos rivejä on enemmän, otetaan ensimmäiset viisi taulukon (1.4) järjestyksessä.

### 1.2 Kortin rakenne (ylhäältä alas)

| Osa | Sisältö | Esimerkki |
|---|---|---|
| Kuva | Commons-kuva (P18), jos on; muuten ei kuvaa, ei paikanvaraajaa | |
| Otsikko | nimi (1.1 kohta 4) | `Tartu` |
| Alarivi | `Laji · Maa` (1.3 ja 1.7). Jos maata ei tiedetä: pelkkä laji | `Kaupunki · Viro` |
| Faktarivit | enintään viisi riviä `Otsikko: arvo` (1.4) | `Asukkaita: noin 97 000 (2021)` |
| Pulun teksti | striimautuu (osa 2) | |
| Lue lisää | nappi, striimaa pidemmän tekstin (osa 2) | |
| Lähde | `Lähde: Wikidata, Wikipedia` ja kuvan tekijä | |

Faktarivin otsikko on aina sama laji kerrallaan (taulukko 1.4), ja arvo kirjoitetaan alkukirjain pienenä, ellei kyse ole nimestä.

### 1.3 Laji: Wikidatan luokka → suomenkielinen laji

Laji haetaan kohteen `P31` (esiintymä kohteesta) -arvoista ja niiden `P279` (alaluokka) -ketjusta (enintään 4 tasoa ylöspäin).
**Ensimmäinen osuma taulukon järjestyksessä voittaa.** Osumaa ei löydy: laji on `Paikka`.
Sana on aina perusmuodossa, versaalilla alkava. (Kaikki Q-tunnukset ja suomenkieliset labelit tarkistettu Wikidatasta 26.10.2026.)

| Ryhmä | Laji (näytetään) | Wikidatan luokka |
|---|---|---|
| Asutus | Pääkaupunki | Q5119 |
| | Kaupunki | Q515, Q1549591 (suuri kaupunki) |
| | Pikkukaupunki | Q3957 |
| | Kylä | Q532 |
| | Kunta | Q15284 |
| | Asutus | Q486972 |
| Vesi | Joki | Q4022 |
| | Järvi | Q23397 |
| | Vesiputous | Q34038 |
| | Meri | Q165 |
| | Valtameri | Q9430 |
| | Lahti | Q39594 |
| | Salmi | Q37901 |
| | Kanava | Q12284 |
| | Vesistö | Q15324 |
| Maasto | Tulivuori | Q8072 |
| | Vuori | Q8502 |
| | Jäätikkö | Q35666 |
| | Laakso | Q39816 |
| | Aavikko | Q8514 |
| | Saari | Q23442 |
| | Niemimaa | Q34763 |
| | Luola | Q35509 |
| | Metsä | Q4421 |
| | Kansallispuisto | Q46169 |
| | Puisto | Q22698 |
| | Puutarha | Q1107656 |
| Rakennus | Tuomiokirkko | Q2977 |
| | Kirkko | Q16970 |
| | Moskeija | Q32815 |
| | Temppeli | Q44539 |
| | Linna | Q23413 |
| | Palatsi | Q16560 |
| | Linnoitus | Q57821 |
| | Museo | Q33506 |
| | Teatteri | Q24354 |
| | Kirjasto | Q7075 |
| | Yliopisto | Q3918 |
| | Stadion | Q483110 |
| | Torni | Q12518 |
| | Majakka | Q39715 |
| | Rakennus | Q41176 (viimeisenä rakennusryhmästä) |
| Rakenne | Silta | Q12280 |
| | Tunneli | Q44377 |
| | Pato | Q12323 |
| | Rautatieasema | Q55488 |
| | Lentoasema | Q1248784 |
| | Satama | Q44782 |
| Kaupunkitila | Tori | Q174782 |
| | Katu | Q79007 |
| | Patsas | Q179700 |
| | Muistomerkki | Q5003624 |
| | Hautausmaa | Q39614 |
| Maa | Maa | Q6256 |

Kun kohteella on useita luokkia, valitaan taulukon ylimpänä oleva (esimerkiksi katedraali, joka on myös rakennus, on
`Tuomiokirkko`, ei `Rakennus`; kaupunki, joka on myös pääkaupunki, on `Pääkaupunki`).

### 1.4 Faktarivit lajeittain (järjestys = näyttöjärjestys)

Jokaisen ominaisuuden arvo muotoillaan osan 1.5 ja 1.6 säännöin. Ominaisuuksien nimet Wikidatasta (suomenkieliset labelit).

| Ryhmä | Rivi (otsikko) | Ominaisuus | Muoto |
|---|---|---|---|
| **Asutus** (pääkaupunki, kaupunki, pikkukaupunki, kylä, kunta, asutus) | `Asukkaita` | P1082 + P585 | `noin 180 000 asukasta (2021)` (1.5) |
| | `Pinta-ala` | P2046 | `noin 105 km²` |
| | `Korkeus merenpinnasta` | P2044 | `34 m` |
| | `Perustettu` | P571 | vuosi tai vuosisata (1.6) |
| | `Alue` | P131 (ylin ei-maa-taso) | alueen nimi (1.7) |
| **Joki, kanava** | `Pituus` | P2043 | `noin 1 230 km` |
| | `Alkulähde` | P885 | kohteen nimi |
| | `Laskupaikka` | P403 | kohteen nimi |
| | `Valuma-alue` | P2053 | `noin 36 000 km²` |
| **Järvi, meri, lahti, salmi, valtameri, vesistö** | `Pinta-ala` | P2046 | `noin 5 700 km²` |
| | `Suurin syvyys` | P4511 | `noin 100 m` |
| | `Korkeus merenpinnasta` | P2044 | `34 m` |
| **Vuori, tulivuori, jäätikkö, laakso** | `Korkeus merenpinnasta` | P2044 | `4 806 m` |
| | `Vuoristo` | P4552 | kohteen nimi |
| | `Pituus` | P2043 | `noin 25 km` (jäätikkö, laakso) |
| | `Pinta-ala` | P2046 | `noin 600 km²` |
| **Saari, niemimaa** | `Pinta-ala` | P2046 | `noin 1 200 km²` |
| | `Korkein kohta` | P610 | kohteen nimi |
| | `Asukkaita` | P1082 + P585 | `noin 8 200 asukasta (2020)` |
| **Vesiputous** | `Korkeus` | P2048 | `noin 108 m` |
| **Rakennus, tuomiokirkko, kirkko, moskeija, temppeli, linna, palatsi, linnoitus, museo, teatteri, kirjasto, yliopisto, stadion, majakka** | `Rakennettu` | P571 | vuosi tai vuosisata (1.6) |
| | `Avattu` | P1619 | vuosi |
| | `Arkkitehti` | P84 | kohteen nimi (enintään kaksi, pilkulla) |
| | `Tyyli` | P149 | kohteen nimi |
| | `Korkeus` | P2048 | `noin 330 m` |
| **Torni** | `Korkeus` | P2048 | `noin 330 m` |
| | `Rakennettu` | P571 | vuosi tai vuosisata |
| | `Arkkitehti` | P84 | kohteen nimi |
| **Silta, tunneli, pato** | `Pituus` | P2043 | `noin 1 200 m` |
| | `Rakennettu` | P571 | vuosi tai vuosisata |
| | `Ylittää` | P177 (vain silta) | kohteen nimi |
| **Kansallispuisto, puisto, puutarha, metsä, luola** | `Pinta-ala` | P2046 | `noin 500 km²` |
| | `Perustettu` | P571 | vuosi |
| | `Alue` | P131 | alueen nimi |
| **Tori, katu, patsas, muistomerkki, hautausmaa, rautatieasema, lentoasema, satama** | `Rakennettu` (patsas, muistomerkki: `Paljastettu`; asema, satama: `Avattu`) | P571 (asema, satama: P1619) | vuosi |
| | `Pituus` (vain katu) | P2043 | `noin 2 km` |
| | `Arkkitehti` / `Taiteilija` (patsas: P170) | P84 / P170 | kohteen nimi |
| **Maa** | `Pääkaupunki` | P36 | kohteen nimi |
| | `Asukkaita` | P1082 + P585 | `noin 5,5 miljoonaa asukasta (2021)` |
| | `Pinta-ala` | P2046 | `noin 65 000 km²` |
| | `Maanosa` | P30 | kohteen nimi |
| **Paikka** (tuntematon laji) | `Alue` | P131 | alueen nimi |

Huom: `Alue`-rivi on P131-ketjun alin aluetaso, joka ei ole kaupunki itse eikä maa (esimerkiksi maakunta), ja se jätetään pois,
jos se on sama kuin alarivin maa. Rakennuksen P571 voi Wikidatassa tarkoittaa rakentamisen alkua; rivin otsikko `Rakennettu`
on silti hyväksytty, koska pelin faktat ovat opetuksellisia eivätkä tarkkoja rakennushistoriaa.

### 1.5 Luvut: pyöristys ja kirjoitusasu

**Kirjoitusasu:** desimaalipilkku (`2,1`), tuhaterotin ei-katkeava väli (U+00A0: `180 000`), ei pistettä eikä sulkevaa lyhennettä
muuten kuin yksiköissä (`km`, `m`, `km²`). Yksikkö on aina erillään luvusta ei-katkeavalla välilyönnillä.

**Asukasluku (P1082):** kaksi merkitsevää numeroa, kun luku on vähintään 1 000; pienempi luku kirjoitetaan tarkasti.
`noin` kirjoitetaan aina, kun luku pyöristetään.

| Todellinen arvo | Näytetään |
|---|---|
| 1 | `1 asukas (2021)` |
| 340 | `340 asukasta (2021)` |
| 2 345 | `noin 2 300 asukasta (2021)` |
| 97 124 | `noin 97 000 asukasta (2021)` |
| 182 700 | `noin 180 000 asukasta (2021)` |
| 1 482 000 | `noin 1,5 miljoonaa asukasta (2021)` |
| 37 400 000 | `noin 37 miljoonaa asukasta (2021)` |
| 1 410 000 000 | `noin 1,4 miljardia asukasta (2021)` |

Arvo 0 tai puuttuva: rivi pois. Ajankohta on P585:n vuosi; jos P585 puuttuu, vuosi jätetään pois (`noin 180 000 asukasta`).
**Mikä arvo:** suositeltu (preferred rank) ensin, muuten uusin P585, saman vuoden sisällä suurin (sama sääntö kuin
`tools/vienti/hae-asukkaat.mjs`).

**Pituus (P2043) ja pinta-ala (P2046):** kolme merkitsevää numeroa, `noin` aina kun pyöristetään; alle 10: yksi desimaali.
Yksiköt muunnetaan: pituus `km` (alle 1 km: `m`), pinta-ala `km²` (alle 1 km²: `hehtaaria`, 1 km² = 100 ha).
Jos Wikidatan arvon yksikkö on muu (mailit, hehtaarit), muunnetaan Wikidatan yksikköön liittyvällä kertoimella, ei omalla.

**Korkeus merenpinnasta (P2044) ja korkeus (P2048):** kokonaisina metreinä, ilman `noin`-sanaa, kun lähteessä on kokonaisluku;
desimaalit pyöristetään lähimpään metriin. `4 806 m`, ei `noin 4 806 m`.

**Syvyys (P4511), valuma-alue (P2053):** kuten pituus (kolme merkitsevää numeroa).

### 1.6 Vuodet ja ajanjaksot (P571, P1619)

Wikidatan ajanarvon tarkkuus (`precision`) ratkaisee:

| Tarkkuus | Näytetään | Esimerkki |
|---|---|---|
| päivä, kuukausi, vuosi (11, 10, 9) | vuosi numeroina | `1889` |
| vuosikymmen (8) | `1880-luvulla` | |
| vuosisata (7) | `1100-luvulla` | |
| tuhatvuotiskausi (6) tai karkeampi | rivi pois | |

Ennen ajanlaskun alkua: `52 eaa.` (ainoa sallittu pisteellinen lyhenne) ja vuosisadalla `100-luvulla eaa.`.
Vuosia ei kirjoiteta sanoina eikä taivuteta kaksoispisteellä (ei `1889:ssä`).

### 1.7 Maiden ja alueiden suomenkieliset nimet

1. **Maa:** ensin pelin oma taulu (`pack.map.countryShapes[ISO3].nimi`, ISO3 = P298 maan Wikidata-kohteelta), koska siinä
   on pelin vakiintuneet muodot (Tšekki, Yhdysvallat, Pohjois-Makedonia). Vain jos pelin taulussa ei ole maata, Wikidatan
   suomenkielinen label (`labels.fi`) kohteen P17-arvolta; jos sitäkään ei ole, englanninkielinen.
2. **Useita maita** (joki, vuori rajalla): enintään kolme, pilkulla erotettuna P17-järjestyksessä: `Joki · Saksa, Ranska, Sveitsi`.
   Yli kolme: `Joki · useita maita`.
3. **Alue** (P131): kohteen suomenkielinen label sellaisenaan; hallintotyyppiä ei lisätä ("Île-de-France", ei "Île-de-Francen alue").
4. **Ei omaa nimiohjelmaa:** jos label puuttuu suomeksi, käytetään englantia; nimiä ei käännetä, eikä suomenkielisiä
   nimiä keksitä (Raamatun nimiohje: vakiintunut suomenkielinen nimi, muuten alkuperäinen).

### 1.8 Näytekortit (kaavan havainnollistus; luvut ovat muotoesimerkkejä, eivät tarkistettuja faktoja)

```
Tartu
Kaupunki · Viro
Asukkaita: noin 97 000 asukasta (2021)
Pinta-ala: noin 39 km²
Perustettu: 1000-luvulla
Lähde: Wikidata, Wikipedia
```

```
Rein
Joki · useita maita            (maita yli kolme, 1.7 kohta 2)
Pituus: noin 1 230 km
Alkulähde: Vorderrhein
Laskupaikka: Pohjanmeri
Lähde: Wikidata, Wikipedia
```

```
Mont Blanc
Vuori · Ranska, Italia
Korkeus merenpinnasta: 4 806 m
Vuoristo: Alpit
Lähde: Wikidata, Wikipedia
```

### 1.9 Testitapaukset Karttasepälle (syöte → tulos)

Jokainen rivi on yksikkötesti puhtaalle muotoilufunktiolle; funktiot eivät hae verkosta.

| Funktio | Syöte | Tulos |
|---|---|---|
| asukasluku | 1 / 2021 | `1 asukas (2021)` |
| asukasluku | 182700 / 2021 | `noin 180 000 asukasta (2021)` |
| asukasluku | 1482000 / null | `noin 1,5 miljoonaa asukasta` |
| asukasluku | 0 / 2021 | rivi pois |
| pituus | 1230.4 km | `noin 1 230 km` |
| pituus | 0.8 km | `800 m` |
| pinta-ala | 105.3 km² | `noin 105 km²` |
| korkeus | 4806.4 m | `4 806 m` |
| vuosi | 1889 (tarkkuus 9) | `1889` |
| vuosi | 1100 (tarkkuus 7) | `1100-luvulla` |
| vuosi | -52 (tarkkuus 9) | `52 eaa.` |
| laji | P31 = Q2977 (ja Q41176) | `Tuomiokirkko` |
| laji | P31 = Q515 ja Q5119 | `Pääkaupunki` |
| laji | P31 tuntematon | `Paikka` |
| nimi | labels.fi puuttuu, labels.en = "Tartu" | `Tartu` |
| alarivi | ei maata | `Kaupunki` |
| kortti | ei yhtään faktaa | nimi, alarivi, kuva |

---

## Osa 2. Pulun ohje workerille

### 2.1 Mitä worker saa ja mitä se palauttaa

**Syöte workerille (yksi kohde, yksi kutsu):**

```json
{
  "kohde": "Q12345",
  "nimi": "Esimerkkilä",
  "laji": "Kylä",
  "maa": "Viro",
  "faktat": ["Asukkaita: noin 340 asukasta (2021)", "Alue: Tartumaa"],
  "wikidata": { "...": "valitut P-ominaisuudet arvoineen ja suomenkielisine labeleineen" },
  "wikipedia": { "kieli": "fi", "otsikko": "Esimerkkilä", "teksti": "<johdanto ja ensimmäiset osiot, enintään noin 4 000 merkkiä>", "linkki": "https://fi.wikipedia.org/wiki/Esimerkkilä" }
}
```

Wikipedian teksti haetaan suomeksi; jos suomenkielistä artikkelia ei ole, englanniksi (`kieli: "en"`), ja kehote kertoo
kielen, jotta Pulu kirjoittaa silti suomea. Jos Wikipedia-artikkelia ei ole lainkaan, `wikipedia` puuttuu.

**Palautus (striimataan, pelkkä teksti, ei markdownia):** kaksi osaa, joiden välissä on tasan yksi rivi
`###LUE-LISÄÄ###`. Asiakas näyttää ensimmäisen osan heti ja pitää toisen valmiina, kun pelaaja painaa Lue lisää.

```
<lyhyt teksti: 3–4 virkettä, 40–65 sanaa>
###LUE-LISÄÄ###
<pidempi teksti: 2–3 kappaletta, 110–170 sanaa>
```

Jos lähteessä ei ole tarpeeksi aineistoa, worker palauttaa **vain** rivin `###EI-LÄHDETTÄ###` (ei mitään muuta), ja asiakas
näyttää pelkät faktat ja lähderivin. Tyhjää täytettä ei tuoteta.

**Asetukset:** malli Sonnet 5.5 (Raamattu 2.76), lämpötila matala (0,3), tulos tallennetaan ämpäriin avaimella
`kartan-tietokortti/<Wikidata-Q>/<fi|en>` ja versionumerolla; samaa kohdetta ei generoida kahdesti (2.203). Livessä
lyhyt teksti ensin, pitkä heti perään samassa kutsussa.

### 2.2 Kehote (liitetään workerin järjestelmäkehotteeseen osioksi `VASTAUKSEN LAJI: KARTAN TIETOKORTTI`)

Workerin nykyinen Pulu (Livia, `tools/pollo/worker.js` JARJESTELMAKEHOTE) on voimassa persoonana. Tämä osio **korvaa** sen
keskustelun muodon: ei JATKOT-rivejä, ei höpötysalustusta, ei pullapersoonaa, ei sivupolkua, ei "Livian lisäystä", ei
isoisän maadoitusta. Faktakielto, oikaisut, kunnioittava sävy ja spoilerisuoja pätevät sellaisinaan.

Kehotteen teksti (suomeksi, kokonaan):

```
VASTAUKSEN LAJI: KARTAN TIETOKORTTI
Pelaaja napautti kartalla paikkaa, ja sen faktakortti on jo ruudulla. Kirjoitat kortin alle kaksi tekstiä: lyhyen
tekstin ja Lue lisää -tekstin. Puhut Pulun, eli kirjekyyhky Livian, äänellä, mutta tämä ei ole keskustelu eikä sinulta
kysytä mitään. Kuulijat ovat kolmetoistavuotiaita ja aikuisia.

LÄHDE. Käytät VAIN alla annettua lähdettä (Wikidatan tiedot ja Wikipedian teksti). Et käytä omaa muistiasi, et lisää
mitään, mitä lähteessä ei lue, et arvaa etkä täydennä. Jos lähde ei kerro jotakin, jätät sen kertomatta. Jos lähteen
tiedot ovat keskenään ristiriidassa, jätät ristiriitaisen asian pois. Jos lähteessä ei ole kahden virkkeen verran
kerrottavaa tai se ei kerro paikasta mitään olennaista, vastaat pelkällä rivillä ###EI-LÄHDETTÄ### ja et mitään muuta.

LUVUT JA VUODET. Käytät lukuja ja vuosilukuja vain, jos ne ovat lähteessä. Et toista faktakortin lukuja sellaisinaan
(ne näkyvät jo kortilla); kerrot mieluummin, mitä ne tarkoittavat tai mitä paikalla näkee ja kokee. Vuodet, vuosisadat ja
vuosikymmenet kirjoitat numeroina: vuonna 1889, 1600-luvulla, 1870-luvulla. Muut luvut kirjoitat sanoina, paitsi
mittayksikölliset (330 metriä), jotka kirjoitat numeroina ja yksikkö auki kirjoitettuna. Et laske, vertaile etkä
muunna yksiköitä.

MUOTO. Vastaus on pelkkää tekstiä: ei otsikoita, ei luetteloita, ei sulkeita, ei lainausmerkkejä, ei emojeita, ei
lihavointeja eikä lyhenteitä (kirjoitat esimerkiksi "noin" etkä "n."). Kun tekstiä luetaan ääneen, jokaisen virkkeen
pitää kuulostaa siltä, että suomalainen sanoisi sen. Ensimmäinen osa on tasan 3–4 virkettä ja 40–65 sanaa ja alkaa
paikan nimellä. Sitten tulee tasan yksi rivi: ###LUE-LISÄÄ###. Toinen osa on 2–3 lyhyttä kappaletta ja 110–170 sanaa;
se syventää ensimmäistä lähteen muilla faktoilla ja toistamatta ensimmäisen osan virkkeitä. Jos lähde on niukka,
tekstit ovat lyhyempiä (ensimmäinen vähintään 2 virkettä, toinen saa jäädä pois, jolloin vastaus loppuu ensimmäiseen
osaan eikä merkkiriviä kirjoiteta).

SISÄLTÖ. Kerrot, mikä paikka on ja mikä siinä on huomionarvoista: yksi konkreettinen asia, jonka pelaaja voi itse
nähdä tai kokea, ja yksi taustatieto, joka on lähteessä. Nykyaika ensin; historia on taustaa. Et arvostele paikkoja,
kansoja, uskontoja etkä ihmisiä, et kehu etkä käytä mainoskieltä ("kaikkien aikojen", "ainutlaatuinen", "ihana",
"pakko nähdä"). Herkät aiheet (sodat, joukkotuhot, siirtomaavalta, uskonnot, katastrofit) kerrot asiallisesti ja
kunnioittavasti, ilman graafisia yksityiskohtia ja ilman sensaatiota. Elävistä ihmisistä kerrot vain sen, mikä
lähteessä lukee. Henkilöstä, jonka sukupuolta lähde ei kerro, käytät nimeä tai sanaa "hän". Mainitse lähde vain, jos
lause sitä vaatii; lähderivin näyttää peli.

ÄÄNI. Puhut Pulun äänellä: lämmin, utelias ja vähän kokenut. Pulun oma puhekieli kuuluu vain tekstin alkuun ja
loppuun, ja sitäkin vähän: ensimmäisen osan ensimmäinen virke saa alkaa yhdellä lyhyellä äännähdyksellä ("Kato,", "No
niin,", "Hetkinen:") ja sen jälkeen heti paikan nimi ja asia; muuten kirjoitat selkeää yleiskieltä (mutta, siitä,
sataviisikymmentä, ei mut, siit, viiskyt). "Kääk" kuuluu vain aitoon säikähdykseen eikä sitä tässä käytetä. Pulu sanoo
minä ja sinä, ei mä eikä sä. Pulu ei vitsaile surullisella eikä vakavalla aiheella; silloin äännähdys jää pois ja
ääni on rauhallinen ja kunnioittava. Pulu ei kerro aarteista, isoisästä eikä juonesta eikä viittaa peliin.

TARKISTA ENNEN VASTAUSTA (ajattele hiljaa, älä kirjoita): jokainen luku ja nimi on lähteessä; ensimmäisessä osassa on
3–4 virkettä; ###LUE-LISÄÄ### on omalla rivillään ja vain kerran; ei sulkeita eikä lyhenteitä; ei mainoskieltä.
```

### 2.3 Näyte (kuvitteellinen kylä; tämä on muotoesimerkki, ei fakta)

Syöte: `nimi: Esimerkkilä, laji: Kylä, maa: Viro`, Wikipedian teksti kertoo (kuvitteellisesti), että kylä on Emajoen rannalla,
kylän kirkko on valmistunut 1700-luvulla ja kylässä pidetään vuosittain kalamarkkinat.

```
Kato, Esimerkkilä on pieni kylä Emajoen rannalla. Kylän keskellä seisoo 1700-luvulla valmistunut kirkko, joka näkyy joen
yli kauas. Joka vuosi rannalla pidetään kalamarkkinat, ja silloin kylä täyttyy kauppiaista ja vieraista.
###LUE-LISÄÄ###
Esimerkkilän tunnetuin rakennus on kirkko, joka valmistui 1700-luvulla. Sen torni on ollut vuosisatoja jokiveneilijöiden
merkkinä, ja pelaaja huomaa sen jo kaukaa rannalta katsoessaan.

Kalamarkkinat ovat kylän vuoden suurin tapahtuma. Joesta saatu kala myydään suoraan rannalta, ja markkinoilla tavataan
myös naapurikylien väkeä.
```

(Näytteessä ei ole lukuja, joita lähde ei antaisi; luvut ja nimet tulevat aina lähteestä.)

### 2.4 Automaattiset tarkistukset ennen tallennusta (Karttaseppä; epäonnistunut ei mene ämpäriin)

1. Vastaus on joko `###EI-LÄHDETTÄ###` tai ensimmäinen osa, jonka jälkeen on tasan yksi `###LUE-LISÄÄ###`-rivi ja toinen osa
   (tai pelkkä ensimmäinen osa, jos lähde niukka).
2. Ensimmäinen osa: 40–65 sanaa (niukalla lähteellä vähintään 20), 3–4 virkettä (niukalla vähintään 2). Toinen osa 110–170 sanaa.
3. **Jokainen vastauksen numeromerkein kirjoitettu luku ja jokainen isolla alkava nimi löytyy syötteestä** (lähdeteksti tai Wikidata-lausumat); ylimääräinen
   luku tai nimi = hylkäys ja uusinta (enintään kaksi uusintaa, sen jälkeen `###EI-LÄHDETTÄ###`).
4. Ei merkkejä `(`, `)`, `*`, `#` (paitsi merkkirivi), `—`, ei pisteellistä lyhennettä (`n.`, `ns.`, `esim.`), ei emojeita.
5. Kielletyt sanat: kaikkien aikojen, ainutlaatuinen, ihana, pakko nähdä, upea, mahtava, uskomaton.
6. Ei sanoja `Wikipedia`, `Wikidata`, `lähde` (lähderivin näyttää peli).
7. Kieli: vastaus on suomea (nopea merkkitarkistus: ä/ö/y-osuus tai kielitunnistus).

### 2.5 Näytteet ennen julkaisua

Näytteet kulkevat Päätoimittajan kautta omistajalle (Raamattu 2.203). Karttaseppä tuottaa **kuusi näytekorttia**, yksi kustakin
ryhmästä: kaupunki, joki, vuori, rakennus (tuomiokirkko tai linna), saari ja maa. Jokaisesta tarvitaan faktakortti,
Pulun lyhyt teksti ja Lue lisää -teksti sellaisina kuin pelaaja ne näkee pelinäkymässä, sekä automaattisen tarkistuksen (2.4)
tulos. Sisältökirjuri lukee ne tuoreella lukijalla (Raamattu 9.11) ennen kuin ne menevät eteenpäin.

### 2.6 Toteutusmuistiinpanot

- **Robots.txt:** Wikipedian ja Wikidatan `/w/` (`api.php`) ja `query.wikidata.org/sparql` on aiemmin merkitty robots.txt:ssä
  kielletyiksi (`kuumailmapallokierros.md` kohta Kohdelista, 19.10.2026); `/wiki/Special:EntityData/<Q>.json` (Wikidatan
  kohteen JSON) ja Wikipedian REST-yhteenveto (`/api/rest_v1/page/summary/...`) on tarkistettava robots.txt:stä ennen
  toteutusta (Raamatun robots-sääntö). Wikidatan sisältö on CC0 ja Wikipedian teksti CC BY-SA 4.0: lähderivi on
  pakollinen, ja Pulun teksti on omaa sanamuotoa, ei lainausta.
- **OSM → Wikidata:** nimen napautus ratkaistaan OSM-objektin `wikidata`-tunnisteella (tai `wikipedia`-tunnisteesta
  `pageprops.wikibase_item`); ilman kumpaakaan korttia ei avata (ei arvailua nimen perusteella).
- **Tyhjät lajit:** jos kohteen laji on `Paikka` eikä faktoja löydy, kortti sisältää vain nimen, kuvan ja Pulun tekstin
  (jos lähde riittää), muuten kortti ei aukea.
- **Sisältökirjuri ei muuta kaavaa tai kehotetta Karttasepän puolesta;** muutokset tehdään tähän tiedostoon ja ilmoitetaan.
