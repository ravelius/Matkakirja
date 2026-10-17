# Tivoli: oma tarkempi osio, jossa voi lentää – suunnitelma ja havainnekuvatilaus (Linnanrakentaja, 17.10.2026)

**HYVÄKSYTTY: omistaja 17.10. 09.59 "Kyllä (Suositus)"** – generointi enintään 18 kuvaa: erä A (2) tilattu Codexilta
(postilaatikko 58b6551df), erä B (16) vasta kun omistaja on nähnyt A:n. Tornin nimi päätetty (KK 10.00, luku 8). Työkansio
`/Users/Shared/Claude/proto-3d/_valmiit/tivoli-v1/`.

Pyyntö: omistaja 09.46 "Tee tivolista oma tarkempi osio missä voi myös lentää" (PT:n paketti, LR vetäjänä).
Pohjat: `docs/moduulit/tuotantopohjat/3d-maamerkki.md` ja `kuumailmapallokierros.md`. Vapaalle lennolle ei ole pohjaa,
joten tämä suunnitelma toimii sen luonnoksena (luku 6). Linja 15.10.: uudet 3D-mallit tekee Codex, ja kytkennän,
leikkauksen, vertailun ja tarkistukset tekevät Clauden roolit. Raamattu voittaa tämän tiedoston ristiriidassa.

## 1. Tavoiteltu kokemus

Kööpenhaminan kippikierroksen pysäkki 8 on Tivoli (Q110289, 55.6737 / 12.5681). Kun William on kertonut tekstinsä,
pallo ei nouse seuraavalle pysäkille. Kamera laskeutuu 30 metriin, ja pelaaja lentää vapaasti matalalla puiston yllä:
järven lyhtyjen yli, Rutschebanenin vuorten ohi ja Himmelskibetin keinuvien istuimien rinnalla. Laitteet liikkuvat,
ja kuuluu kirkumista, rataa ja soittokuntaa. Illalla puiston noin 100 000 lamppua syttyy. Lähelle lentäessä William
kertoo kohteesta yhden lyhyen tarinan. "Jatka kierrosta" nostaa pallon takaisin reitille.
Puisto on Googlen möykyistä kahdeksaan tarkkaan malliin vaihdettu, ja muu kaupunki jää Googlelle.

## 2. Kohteet (8 mallia + järvi)

Mitat on varmistettu lähteistä, ja puuttuvat mitataan LiDARista vaiheessa 2. Koordinaatit ovat Wikidatan P625-arvoja.

| # | Kohde | Q-id | lat, lon | Vuosi | Mitta (lähde) | Liike | Ilta | Huomio |
|---|---|---|---|---|---|---|---|---|
| 1 | Tivolisøen + lyhdyt | Q64706701 | 55.67392, 12.56973 | 1887 (vallihaudan jäänne) | ala LiDAR/OSM | veden välke | lyhtyrivit, heijastukset | vesi = VS |
| 2 | Japanilainen torni (ent. Kiinalainen) | Q64706814 | 55.67308, 12.56974 | 1900 | ~24 m, 4 kerrosta | – | 2 800 värilamppua | nimi päätetty (luku 8) |
| 3 | Pantomiimiteatteri | Q955226 | 55.6745, 12.5665 | 1874 (Dahlerup) | LiDAR | riikinkukkoverho | lamput reunoilla | **2024 verho suojattu**, ks. kohta 3 |
| 4 | Nimb | Q7037576 | 55.67354, 12.56634 | 1909 | LiDAR | – | lamppuääriviivat kupoleissa | maurilainen palatsi |
| 5 | Rutschebanen | Q2177877 | 55.67298, 12.567 | 1914 | 12 m, rata 720 m | juna 2 min 10 s, 50–60 km/h | radan lamput | vuoret (palautettu 2014). EI Q10658106 (Bakken) |
| 6 | Dæmonen | Q1270418 | 55.67290, 12.57028 | 2004 (B&M) | 28 m, rata 564 m, 3 inversiota | juna 1 min 46 s, 77 km/h | radan valot | punainen rata, hopeiset tuet, oranssi juna |
| 7 | Himmelskibet | Q13582398 | 55.67270, 12.56786 | 2006 (Funtime) | 80 m, Ø 16 m | nousu ≤ 3 m/s, kierto ≤ 70 km/h | mastovalot | korkein kohde, lennon yläraja |
| 8 | Det Gyldne Tårn | Q47001008 | 55.67330, 12.57072 | 1999 (S&S) | ~63 m (lähteet 56–63, LiDAR ratkaisee) | nosto + pudotus | kultainen torni | |
| (9) | Ketjukaruselli | – | 55.6737, 12.5681 | – | – | 10 s/kierros | 52 nuppia | **on jo pelissä** (ElavatElementit `karuselli`), siirretään oikealle paikalleen |

Mittakaava: puiston ala on noin 6,1 ha (en.wikipedia, ~350 × 250 m), ei 8,2 ha. Lento rajataan puiston yllä
olevaan laatikkoon, jonka reunoilla on 40 m pehmeä palautus.

## 3. Oikeudet (vaihe 0, ennen tilauksia)

- **Tanskan laki 24 §:** rakennuksia saa kuvata ja mallintaa vapaasti (Nimb, torni, teatteri, sisäänkäynti).
  Julkisen taideteoksen saa kuvata, mutta ei kaupalliseen käyttöön pääaiheena.
- **Pantomiimiteatterin uusi verho** (kuningatar Margrethe, 2024) on suojattu teos. Mallissa verho on vanha viuhka
  (1874 malli, PD) tai yleinen riikinkukon pyrstö ilman Margrethen kuvioita. Codexille kerrotaan tämä ehto.
- **Laitteet** (Dæmonen, Himmelskibet, Gyldne Tårn) ovat teollisia laitteita, eikä 24 § käsittele niitä. Ne mallinnetaan
  geometriana ilman teemakoristeita (Dæmonenin lohikäärmeaiheet pois) ja logoja. Tivoli-nimi näkyy vain faktana
  Williamin tekstissä, ei kylteissä.
- Valokuvaviitteet: Commonsin `Category:Tivoli Gardens (Copenhagen)` ja alikategoriat (Rides, Tivoli Søen,
  Pantomimeteatret, Nimb, Night in Tivoli, Lamps at Tivoli). Lisenssi tarkistetaan tiedostokohtaisesti API:lla, ja
  kirjaus tehdään `_valmiit/tivoli-v1/LAHTEET.md`:hen.
- Korkeusdata: Danmarks Højdemodel (SDFI, vapaa data, lähde mainittava). Karttaseppä varmistaa ehdot.

## 4. Vaiheet ja roolit

| Vaihe | Kuka | Mitä | Valmis kun |
|---|---|---|---|
| 0 | PT → omistaja | tämä suunnitelma + kortti (luku 8) | omistaja "Kyllä" |
| 1 | KS | `kohde.json` (origo 55.6733 / 12.5685), DHM-LiDAR 0,4 m, ortokuva, OSM (radat, polut, järvi) | massakuvat + korkeudet kohteittain |
| 2 | LR | mittaus ja `SUUNNITELMA.md` per malli (korkeudet, jalanjäljet, kolmiobudjetti), leikkausrengas `leikkaus_latlon.json` (puiston ydin) | Codex-tilaus valmis |
| 3 | Codex (LR tilaa postilaatikon kautta) | havainnekuvat (luku 7), sitten 8 GLB-mallia, joissa liikkuvat osat erillisinä solmuina (juna, istuinrengas, pudotusvaunu, verho) | IoU ≥ 90 % LiDAR-massaa vastaan, LR:n vertailuportti |
| 4 | LR | vastaanotto, leikkaus, `omat-mallit` -paketti (CesiumOmatMallit), maanpinta ja järven vesitaso | kaikki 8 paikallaan pelissä |
| 5 | PK | liike: junat splinejä pitkin (radan keskiviiva OSM:stä + mallin solmuista), Himmelskibetin nosto ja kierto, tornin nosto ja pudotus, karusellin siirto. Tivolin vapaa lento (luku 6) | laitteet liikkuvat, lento rajattu |
| 6 | VS | ilta: lamppujen instanssipisteet (ääriviivat, lyhtyrivit, torni 2 800), heijastukset järvessä, oman mallin sävy ja vesi | pelikuvapari päivä/ilta |
| 7 | ÄÄ | äänimaisema: radan kolina, kirkaisut, väkijoukko, kaukainen soittokunta, karusellin urut. Paikkasidonnaiset lähteet laitteisiin. Vain CC0/CC BY, Freesound API:lla | `lahteet.js` päivitetty |
| 8 | SK | 6 lähitarinaa: isoisä järvi ja lyhdyt (1873), William torni, teatteri, Nimb, Rutschebanen, Himmelskibet (luku 8 kohta 3) ≤ 40 sanaa + faktaliite. Pulun kutsu `pulu-vapaalento-kutsu-koopenhamina` | tarkistajat + PT |
| 9 | JU + NS | käännös, simukuvat, juna | PT → omistaja |

William-äänet tehdään kertojaäänten pysyvällä luvalla, ja tekstit näytetään omistajalle Tekstit-osastossa.
Mallien työ on rinnakkaista. LR vastaa aikataulusta ja kirjaa `VERTAILU.md`:hen joka kierroksen.

## 5. Kolmio- ja muistibudjetti (iPad)

LOD0-raja on yhteensä 300 k kolmiota, kaikki 8 mallia mukaan lukien: Nimb 50 k, teatteri 35 k, torni 25 k,
Rutschebanen 60 k (vuoret ja rata), Dæmonen 45 k, Himmelskibet 30 k, Gyldne Tårn 20 k, järvi ja lyhdyt 15 k, varaa 20 k.
LOD1 on yhteensä ≤ 100 k ja LOD2 ≤ 20 k. Tekstuurit tehdään ASTC-atlakseen, jonka koko on enintään 4 × 2048².
Lamput ovat GPU-instansseja ilman geometriaa. Animoitavia solmuja on enintään 12. Malleja ladataan vain, kun kamera
on alle 2 km:n päässä, kuten CesiumOmatMallit tekee.

## 6. Tivolin vapaa lento (luonnos vapaan lennon pohjaksi)

- **Laskeutuminen:** pysäkki 8 päättyy laskeutumiseen. Kamera menee 4 s:ssa 30 m:iin puiston pohjoislaidalle
  järven puolelle, katse etelään kohti Himmelskibetiä. Tämä tehdään OpasSilmukassa uutena tilana
  `TivoliLaskeutuminen`, joka käyttää `OpasVapaaLento`a.
- **Rajat:** korkeus on 6–120 m pinnasta (Pariisissa minimi 15 m). Lento rajataan puiston laatikkoon, jonka reunalla
  on 40 m pehmeä palautus. Törmäysturva käyttää kehiä 8 ja 20 m (Pariisissa 20 ja 45). Nopeus on 2–14 m/s.
- **Lähitarinat:** William kertoo yhden tarinan, kun pelaaja on alle 35 m:n päässä kohteesta (kerran kohdetta kohden),
  käyttäen samaa kertojaa kuin kierros.
- **Poistuminen:** "Jatka kierrosta" -nappi on aina näkyvissä. Se nostaa pallon ja siirtää kierroksen loppuun.
  Kierroksen jälkeinen yleinen vapaa lento säilyy ennallaan.
- **Pohja:** tästä tehdään `tuotantopohjat/vapaa-lento-osio.md` (PK + LR), kun Tivoli on hyväksytty.

## 7. Generoidut kuvat: tarkka määrä

Generoituja kuvia tehdään yhteensä enintään 18, eikä yhtään ennen omistajan korttia.

| Erä | Määrä | Mitä | Kuka | Milloin |
|---|---|---|---|---|
| A | 2 | Havainnekuva osiosta lentäjän silmin 40 m:stä järven yli kohti Nimbiä ja Himmelskibetiä: 1 päivä, 1 ilta lamppuineen. Tyylin ja tunnelman hyväksyntä. | Codex | kortin jälkeen |
| B | 16 | Mallien tavoitekuvat ja maskit, 2 per malli (matala viisto + lähikulma) LiDAR-massan päälle. Ei Googlen laattoja kuviin. | Codex | erä A hyväksytty |

- **Yhteiset ehdot:** fotorealistinen, 3:2 (1536 × 1024). Kuvissa ei ole tekstiä, logoja, kasvoja eikä Margrethen verhoa
  tai Dæmonenin teemakoristeita. Metatieto ja kuvateksti "Havainnekuva." Tiedostonimi on muotoa
  `tivoli-<Q>-<kulma>.png`, ja toimitus tehdään postilaatikkoon manifestin kanssa.
- **Muuta generointia ei tehdä.** Tekstuurit tulevat valokuvista (CC) ja CC0-pinnoista. Lisävariantteja ei tehdä, ja
  ylitys vaatii uuden luvan.

## 8. Omistajan kortti (PT esittää)

1. "Tivoli-osio näin: kamera laskeutuu pysäkillä 8, ja voit lentää vapaasti puiston yllä 6–120 metrissä. Kahdeksan
   tarkkaa mallia, liikkuvat laitteet, illan lamput, äänet ja Williamin 6 lähitarinaa. Kuvia generoidaan enintään 18
   (2 tunnelmakuvaa + 16 mallien tavoitekuvaa)." → Kyllä / Ei nyt
2. Tornin nimi – PÄÄTETTY (KK 17.10. 10.00, SK vahvisti): **"Japanilainen torni – yli sata vuotta sitä kutsuttiin
   Kiinalaiseksi torniksi"** (alkuperäinen nimi 1900 Japanese Pagoda). Nimenvaihdon syytä ei kerrota.
3. Kertojat – PT:n päätös 17.10.: Tivoli on isoisän tarina-aihe, mutta **isoisän ääni kertoo vain puistosta, järvestä ja
   lyhdyistä (1873)**. Torni, teatteri, Nimb ja laitteet ovat **Williamin**. Lähitarinat (luku 6): isoisä = järvi/lyhdyt,
   William = torni, teatteri, Nimb, Rutschebanen, Himmelskibet.

## 9. Riskit ja avoimet

- Lähteet eroavat Gyldne Tårnin korkeudesta (56/63 m) ja Rutschebanenin nopeudesta. LiDAR ratkaisee korkeuden, ja
  William ei kerro nopeutta.
- Ratojen keskiviivat pitää mitata ortokuvasta ja LiDARista. OSM:ssä ne ovat karkeita, ja inversiot ovat Codexin
  mallin solmuissa.
- Matalalla Googlen puut ja pienet rakennukset jäävät möykyiksi. Tämän version ratkaisuna leikkaus kattaa vain
  8 kohteen jalanjäljet ja järven. Jos ero näkyy, seuraavaksi tehdään oma maanpinta ja puut (erillinen päätös).
- Codex on ensimmäistä kertaa liikkuvien osien mallintaja, ja solmurakenne sovitaan tilauksessa (PK hyväksyy).
- Codex-tilaus postilaatikkoon ja `_valmiit/tivoli-v1/` luodaan vasta omistajan "Kyllä"-vastauksen jälkeen.
