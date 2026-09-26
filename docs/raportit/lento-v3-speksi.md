# Lento v3 -speksi (luonnos omistajan korttiin, 26.9.2026)

*Linssiseppä (apuagentti) 26.9.2026 klo 23.4x Fablen tilauksesta (omistaja 22.2x; raamattu-loki 26.9. klo 22.20 "SAAPUMISLENTO
RETRO-KAKSITASOLLA", Fablen haara). Ei koodia ennen hyväksyntää. Pohjana proto `juna/b13` 8a90b51f (LennonAikajana.cs,
löydökset 120 v2 ja 172), kamerakäsikirjoitus 24.9., ESILATAUSPOLITIIKKA, S10. Fablen päätökset 27.9.: kysymys 4 ja kaanon
(Fogg) alla.*

Merkinnät: **[O]** = omistajan vaatimus (sitova). **[E]** = Linssisepän ehdotus (hyväksytään kortilla).

## 0. Vaatimukset ja tiivistelmä

**[O]** Retro-kaksitaso lentää MATALALLA. Kartta lennon aikana on PERGAMENTTI (ei satelliittikuvaa). EI alun feidiä
eikä verhoa. Kamera alkaa lähikuvasta koneeseen ja liukuu kauemmas, mutta pysyy matalalla. Esimerkki Ateena: kone
tulee Afrikan rannikolta pohjoiseen Välimeren yli. Kesto 15 s. Vanha lento jää kytkimen taakse (A/B).

**[E]** Yksi yhtenäinen 15 s:n otos lennon viimeisestä osuudesta (enintään 600 km). Kone on Tiger Moth seepiana.
Pinta on pelin oma pergamenttikartta, joten pintaa ei vaihdeta. Odotus tapahtuu elävässä näkymässä moottorin
käynnistysäänen kanssa, sitten kova leikkaus lähikuvaan. Ateenan käytävä on 2,2 Mt (nyt 18,6 Mt ja 5 s mustaa).

## 1. Aikajana 0–15 s, esimerkki Ateena [E]

Reitti Derna (Kyrenaikan rannikko) → Antikytheran salmi → Hydra → Aeginan itäpuoli → Ateena, 588 km. Kone 3,5 km
merenpinnasta, siipiväli 5 km. Kamera on koneen vasemmalla puolella ja katsoo itään, joten Kreeta ja saaret näkyvät.
θ = kuvauskulma: 0° suoraan takaa, 90° kyljeltä, 180° suoraan edestä. Kone ruudulla = osuus pystyruudun leveydestä.
Horisontti on 64–73 %:n ja kone 52–53 %:n korkeudella, joten kaukokuvissa kone on siluetti utua vasten. Ruudulla-sarake
on laskettu kamerageometriasta (pystyruudun vaakakuvakulma on vain 24°).

| s | Vaihe | Etäisyys koneeseen | Kamera merestä | Katse alas (pitch) | Kuvakulma (fov, pysty) | θ | Kone ruudulla |
|---|---|---|---|---|---|---|---|
| 0 | Lähikuva (leikkaus) | 20 km | 7,7 km | −13° | 50° | 115° etuviisto kylki | 69 % |
| 2 | Lähikuvan loppu | 23 km | 8,3 km | −13° | 50° | 106° | 55 % |
| 5 | Liuku kauemmas, nopein kohta | 46 km | 12 km | −12° | 50° | 88° kylki | 22 % |
| 8 | Kaukokuva | 80 km | 17 km | −11,5° | 50° | 68° takaviisto sivu | 17 % |
| 11 | Matkan loppu | 80 km | 18 km | −12° | 50° | 62° | 18 % |
| 13,5 | Lähestyminen | 55 km | 14 km | −14° | 50° | 50° | 28 % |
| 15 | Perillä, lepo | 45 km | 11 km | −15,5° | 50° | 50° | 34 % |

| s | Kone | Ruudulla |
|---|---|---|
| 0 | 5 km/s, rannikon yllä | Kone etuviistosta: potkurilevy, pakosavu, kaksi kypäräpäätä, punainen huivi. Takana Derna ja rannikko, joka kaartuu horisonttiin kaakkoon (Tobruk 170 km). Ylhäällä utu. |
| 2 | kaasu +8 % | Kamera liukuu hitaasti sivulle, rannikko jää taakse. |
| 5 | 38 km/s, kiihtyy | Kone kyljeltä avomeren yllä, varjo meressä koneen takana. |
| 8 | 71 km/s (huippu) | Horisontissa vasemmalla Kreetan Lefka Ori -vuoret (173 km). |
| 11 | hidastus alkaa, Hydran yllä | Horisontissa Kykladien länsisaaret Kythnos, Serifos ja Sifnos (180–190 km). |
| 13,5 | 25 km/s, 1,2 km:ssä | Loppukaarros oikealle juuri tehty (12,4–13,2 s, siivet noin 20° kallellaan). Vasemmalla Salamis, Pireus ja Ateena, takana Hymettos. |
| 14,3 | kosketus | Pieni pomppu 3 km ennen kaupungin pistettä, varjo yhtyy pyöriin, paperinvärinen pölypuhallus. |
| 15 | pysähtyy renkaalle | Akropolis vieressä, Pireus ja Hymettos taustalla, kamera levossa. Sitten nykyinen saapumissekvenssi (kaanon 26.8.). |

Siirtymät: kameran viisi kanavaa (etäisyys logaritmisena, θ, korkeuskulma koneeseen, pitch, fov) ovat pehmeitä
viidennen asteen käyriä (`LennonAikajana.Kanava`): nopeus ja kiihtyvyys ovat jatkuvia, joten nykäyksiä ei tule. 0 s ei ole
lepoavain: kamera liukuu heti (+1,5 km/s, θ −4,5°/s), jottei kuva jähmety leikkauksen jälkeen. 2–8 s kiihtyvä ja
jarruttava pari (sauma 5 s), 8–11 s ajelehdinta, 11–15 s pehmeä lähestyminen, 15 s lepo. Katse on koneessa, 13–15 s
katsepiste liukuu 30 % kohti kaupunkia. Matalalla = kamera ≤ 20 km, katse −11…−16°, horisontti aina kuvassa, pallon
kaarevuus ei koskaan. fov pysyy 50°:ssa (webin PALLO_FOV; usva ja nimiladonta lukevat sitä). θ 50–115°: ei suoraan takaa.

## 2. Koneen reitti, nopeus ja korkeus [E]

- **Näkyvä osuus** on lähestyminen: L = min(reitti, 600 km). Pitkän reitin alkuosa jää ennen ensimmäistä kuvaa, eikä
  kesken lennon leikata tai hypätä (löydös 120: ei pomppivaa kameraa). Pelilogiikka ei muutu (Lento.cs).
- **Lähestymissuunta.** 18 aloituskaupungille kuvauslinja käsin uuteen `Lahestymiset`-taulukkoon (kuten nykyinen
  `Kaupungit`): lähtöpiste, 1–2 välipistettä, laskusuunta. Ateena: Derna 32,80 N 22,60 E → Antikythera 35,85 N
  23,28 E → Aeginan itäpuoli 37,70 N 23,52 E → Ateena (suuntimat 10°, 6°, 31°, kulmat 30–60 km:n kaarina). Muut:
  isoympyrän loppuosa ja loiva S-mutka ±2 % L.
- **Nopeus sidotaan kameraan, ei fysiikkaan.** f(t): 7 % huipusta 0–2 s, S-käyrällä 100 %:iin 2–8 s, 100 % 8–11 s,
  35 %:iin 11–13,5 s, 12 %:iin kosketukseen 14,3 s, nolla 15 s. v(t) = L · f(t) / ∫f (∫f = 8,27 s). Ateena: huippu
  71 km/s, lähikuvassa 5 km/s (nykyinen lähikuva 20 km/s).
- **Pitkät ja lyhyet.** Kaukokuvan etäisyys = 80 km × L / 600 km, kuitenkin 36–80 km, joten maa virtaa kaikilla
  reiteillä samalla kulmanopeudella. Lontoo–New York (5 570 km): viimeiset 600 km Atlantilta etelästä satamaan.
  Pariisi–Bryssel (264 km): koko reitti, Pariisi alun taustalla, huippu 32 km/s, kaukokuva 36 km. Wien–Bratislava
  (55 km): huippu 7 km/s, rauhallinen.
- **Korkeus ja kaarros.** 3,5 km merenpinnasta (0,7 × siipiväli; nykyinen DC-3 on noin 11 km leveä ja 10 km:ssä).
  Maan yllä vähintään 2 km liioitellun (×2) maaston yläpuolella: ennakoiva maksimisuodin ±8 km, pehmennys 1,5 s, nokka
  ±8°. Lasku: liukukulma noin 3° 11,5 s:sta, nokka +5° 13,8–14,3 s, kosketus 14,3 s, rullaus pysähdykseen. Kallistus
  1,0° jokaista °/s suuntiman muutosta kohden, enintään ±22°, 0,3 s ennakoiden. Ateenan loppukaarros noin 25° oikealle.

## 3. Kartan tyyli lennon aikana ([O] pergamentti, [E] toteutus)

- **Pinta on pelin oma kartta:** portti `pohja` (2026-09-26-pohja-20260926: GLO-30-reliefi, lämmin hypsometria, meri
  pergamentin sävyssä; 256 px JPEG Z0–Z9, Z0–Z5 buildissa, Z8–Z9 offline-paketissa, Z10 poltossa) ja portti `maasto`
  (quantized-mesh, korkeuskerroin 2). Pois jäävät LentoPohja, portin `muu` satelliitti, varakartta, Usvalevy, LentoPilvet.
- **Kerma pois:** portin `kerma` väritaso (p060) pois lennon ajaksi, rajat himmeinä (peitto 0,35). Nimiöt, nostot,
  symbolit ja reittikaaret piilossa; kohteen punainen rengas ja maamerkki näkyvät (LENNON KARTTA 24.9.).
- **Utu:** Horisonttiusva (kerma #faf4d6) ja Karttataivas utu (omistajan valinta 26.9.) päällä kuten kallistetulla
  kartalla; nykyinen lento ohittaa ne. Etäisyyssumu kermaan 150 km:stä, täysi 450 km:ssä (piilottaa kaukaiset laatat).
- **Valo:** kartan rinnevalo luoteesta 35° (Karttavalo, löydös 46) valaisee myös koneen, sävy pelin kellonajasta (yö =
  ilta). Heittovarjokarttaa ei käytetä, koska se ei toimi planeetan mittakaavassa (Aurinko.cs).
- **Varjo:** koneen siluetti litistetään maan tai meren pintaan valon suuntaan (tasovarjo), muste #3b2f22 peitolla
  0,15–0,18 (paletin maavarjo), nostettuna pinnasta kuten rantaviiva. Laskussa varjo yhtyy pyöriin.
- **Lähikuvan tarkkuus:** Z9-pikseli on Ateenan leveydellä noin 240 m, joten 35 km:n päässä se on ruudulla noin 20
  pikseliä leveä. Syväterävyys 0–3 s tekee pehmeydestä luontevan; tarvittaessa Z10 tai paperin syy -tekstuuri.

## 4. Koneen malli [E]

**de Havilland DH.82 Tiger Moth** on tunnistettavin kaksitaso: porrastetut nuolisiivet, kaksi avointa ohjaamoa, kapea
rivimoottorin nokka, siipituet ja vaijerit. Se on siviilikone ilman aseita, brittiläinen kuten lähtö Lontoosta, ja
1 500 kolmiota riittää. Vaihtoehto Boeing-Stearman (tähtimoottori); Curtiss JN-4 (1910-luku) ja Sopwith Camel
(sotakone) hylätään. Suhteet: siipiväli 8,94 m, pituus 7,29 m, korkeus 2,68 m; pelissä siipiväli 5 km. Viitekuvat
Commonsista, lisenssit tarkistettu tiedostosivuilta 26.9. Ne ovat vain viitteitä: malli on oma (CC0).

| Tiedosto | Näkymä | Lisenssi |
|---|---|---|
| Aircraft of the Royal Air Force 1939-1945- De Havilland Dh 82 Tiger Moth. CH2377.jpg | kylki lennossa | PD-UKGov (IWM CH 2377, RAF, B J Daventry) |
| No. 3 EFTS RAAF Tiger Moths (AWM AC0101).JPG | ylhäältä | PD (Australian Crown Copyright päättynyt; AWM) |
| Tiger Moth G-BYLB in flight (14146013019).jpg | lentoasento, värit | CC BY 2.0 (John Fielding, Flickr) |
| Museum of Flight Tiger Moth 01.jpg | koko sivuprofiili | CC BY-SA 3.0 / GFDL (Ad Meskens) |
| DH 82 Tiger Moth front Undercarriage (8523465083).jpg | nokka, potkuri, laskuteline | CC BY 2.0 (Ian Kirk, Flickr) |
| Boeing-Stearman N2S-5 Kaydet in flight c1944.jpg | vaihtoehto | PD (USAAF) |

- **Kolmiot (~1 480):** runko ja moottorin suojus 360, pakoputki 40, siivet 440, tuet 90, vaijerit 48, pyrstö 120,
  laskuteline ja pyörät 170, ohjaamot, kypäräpäät ja huivi 130, potkuri 80, potkurilevy 2. Ääriviiva käännetyllä kuorella.
- **Matkustajat (kaanon, Fable 27.9.):** etumaisen ohjaamon matkustaja punaisella huivilla ON Fogg (pelaaja), takana
  ohjaava lentäjä on nimetön.
- **Paletti** on hyväksytty seepiaramppi (21.4x) kuten 3D-merkeissä: paperi #efe4cc valaistut pinnat, seepia #8a6a44
  varjopuoli, muste #3b2f22 ääriviiva (1,2 pt), aukot ja vaijerit. Aksentti pelin punainen #9a3b2c huivissa ja
  potkurin kärjissä, noin 4 % alasta (raja 10 %). Ei kiiltoa.
- **Potkuri:** kaksi lapaa ja liike-epäterävä levy (PotkuriKiekko, Potkurit.cs); levyn nopeus ja moottorin ääni seuraavat
  samoja kierroksia. **Pakosavu:** puhalluksia, ei yhtenäistä nauhaa (korvaa Savujanan): 12–18 puhallusta sekunnissa,
  elinaika 2,5–3,5 s, koko kasvaa kolminkertaiseksi; kerma #faf4d6, alapuoli seepiana.
- **EI MONOTONIAA** (Raamattu 26.9.): satunnaisuus lennon siemenestä, joten sama lento on aina sama ja eri lennot eroavat.

| Elementti | Vaihtelu |
|---|---|
| Puuskat | Pystyheilunta ±2 % siipivälistä (0,35–0,6 Hz), kallistus ±1,5° (0,25–0,45 Hz). 3–6 s välein puuska: 5 % siipivälistä ylös ja alas 0,7 s:ssa, kallistus ±4°, vaimeneva jousi 1,2 Hz. |
| Nokan heilahdus | Ylös-alas ±0,8° (0,3 Hz), sivuttain ±1,2° (0,17 Hz), laajuus vaihtelee 60–100 %. |
| Potkurin kierrokset | ±3 % hidas vaihtelu (0,1 Hz); kaasu +8 % 2–4 s, −35 % 11,5–14 s, tyhjäkäynti −60 % kosketuksesta. |
| Savun katkot | 1,5–3 s välein 0,15–0,35 s:n katko; kaasua lisättäessä tummempi puhallus 0,4 s, vähennettäessä kaksi nopeaa. |
| Huivi | Lepatus 2,5–4 Hz, amplitudi kohinana. |

**Moottorin humina** on Pelikoodarin palvelua; tästä tarvitaan vain rajapinta:
- Tyyli: yksimoottorisen mäntäkoneen papatus (Gipsy Major), ei nykyistä ATR 72 -äänitettä (freesound 315660).
  Ehdokas CC0 freesound 586106 (js/aani-ehdokkaat.js). Kerrokset: moottori, potkurin suhina, ilmavirta.
- Taso: lähikuva 0 dB (= nykyinen Tehostetaulu.Lento.Gain 0,7), kaukokuva −10 dB ja alipäästö 8 → 2,5 kHz, lasku
  −16 dB, tyhjäkäynti −22 dB. Doppler kevyesti: äänenkorkeus enintään ±2 % lähestymisnopeuden mukaan. Odotuksessa
  käynnistysääni (yskähdys, käynti); leikkauksessa kierrokset nousevat, jolloin ääni sitoo leikkauksen.
- `LentoAani.Tila(etaisyysM, lahestymisnopeusMs, kierrokset01, kaasu01)` joka kehys ja tapahtumat Käynnistys,
  Yskähdys, Kosketus, Tyhjäkäynti. Aloituslennon musiikkiaihe ja luenta mitoitetaan 15 s:iin.

## 5. Tekniikka Natiivisepälle [E]

- **Rakenne.** Puhdas `LennonV3` Kartta-kansioon (testit Kartta-testeihin): kanavat, nopeusprofiili, reitti, käytävä
  ja EI MONOTONIAA -liikeydin. Nappulaan v3-haara ilman Mustaverhoa ja LentoPohjaa. Kone Mallinsepän Rakentajalla
  (C#, sama seepiavarjostin ja ääriviiva kuin erikoismalleissa). Vaiheet: Nousu 0–5 s, Matka 5–11 s, Lasku 11–15 s.
- **Esilatauskäytävä** (`Esilataaja.Tehtava`, laatta = true, taso SeuraavaRuutu) lasketaan kamerareitistä: 60 näytettä,
  jokaisesta katseen kiila EsilataaAvauksen tasosäännöllä. Käytännössä pohja ja maasto Z6 ±2, Z7 ±2, Z8 ±1 koko
  osuudelta ja Z9 ±1 alun 0–5 s:n ja lopun 13–15 s:n kohdalla; aikajärjestys, alun 5 s ensin, puuttuva merilaatta
  (404) = valmis. Ateena: 116 pohja- ja 108 maastolaattaa, noin 2,2 Mt (otos ämpäristä). Nykyinen lento haki kylmänä
  1 761 laattaa (18,6 Mt), ja musta verho odotti 5,0 s (lokit/esilataaja-mittari/kylma). Esilämmitys: valintanäkymässä
  18 aloituskohteen alun 5 s (noin 450 laattaa, 5 Mt), pelissä lentolistan kohteet heti (politiikan kohta 5);
  offline-paketilla odotus ≈ 0.
- **Lähtö ilman feidiä ja verhoa.** Nykyinen näkymä (valintapallo tai kaupunkikartta) jää elämään: valittu rengas
  sykkii, kamera ajelehtii hitaasti kohdetta kohti (zoom ≤ 5 %, ei uusia laattoja), moottori käynnistyy äänessä. Kun
  käytävä on ≥ 96 % ja alun 5 s 100 %, kova leikkaus lähikuvaan. Vähintään 0,5 s, katto 6 s (jos alun 5 s valmis),
  ehdoton katto 10 s (puuttuva laatta pehmeänä karkeammasta tasosta, ei harmaana). Mittari "lento/v3-odotus".
- **Kehysbudjetti iPhonella 60 Hz:llä (16,7 ms):** pallo (pohja + maasto) ≤ 10,5 ms, utu ja taivas ≤ 0,5, kone
  ääriviivoineen, potkurilevyineen ja varjoineen ≤ 1,0, savu ≤ 0,4, kevennetty filmipino (rae, vinjetti, kevyt
  liike-epäterävyys, syväterävyys vain 0–3 s, ei hehkua) ≤ 2,5, UI ≤ 1,0, varaa 1,3. S10 (iPad Pro M1, Kreikka
  kallistettuna) mittasi mediaaniksi noin 20 ms laattatarkkuudella SSE 16 ja 13 ms SSE 32:lla; kuorma on laattojen
  geometriaa. Siksi liikkeen SSE 32 (LiikeLaatat, natiiviseppa/s10-sse) otetaan myös lennolle (nyt rajattu pois).
- **Yksityiskohtataso (LOD) ja lämpö.** Täysi malli, kun kone on ≥ 30 % lyhyestä sivusta, muuten noin 600 kolmiota.
  Lento 60 Hz:llä myös 120 Hz:n laitteilla. Kuuma: nykyinen sääntö (30 fps, renderScale 0,7) sekä filmipino pois ja
  savu puoleen. Kone, varjo ja savu esilämmitetään ennen leikkausta (Nappula.Esilammita).

## 6. Hyväksymiskriteerit [E]

1. **Kylmä video:** sovellus poistetaan ja asennetaan (valmius3b.sh KYLMA=1 -malli), aloituslento Ateenaan. Leikkauksesta
   saapumissekvenssiin 15,0 s ± 0,1 s, mustia kehyksiä 0. Uusi testitila värjää puuttuvan pohjarasterin magentaksi
   (kuten `lentoharmaa vara` lennon pinnalle): magentakehyksiä 0.
2. **Kuvasarja:** 0 / 2 / 5 / 8 / 11 / 13,5 / 15 s iPhonen ruutuna (PNG, pysty, rajattu) A/B-pareina vierekkäin; samat
   Pariisi–Bryssel ja Lontoo–New York.
3. **Odotus** napautuksesta leikkaukseen: lämpimänä ≤ 1,5 s, kylmänä ≤ 4 s (p95, 5 ajoa).
4. **Kone kuvassa** 100 % kehyksistä, ≥ 12 % lyhyestä sivusta; `kamerareitti paalle` -loki: 0 HYPPY, 0 KULMAHYPPY;
   kamera koko lennon ≤ 20 km:ssä ja katse −11…−16°.
5. **Kehysaika** iPhonella: 95 % kehyksistä ≤ 16,7 ms (p95), enintään yksi yli 33 ms:n kehys (leikkaus), lämpötaso
   ei nouse lennon aikana; kymmenen peräkkäistä lentoa raportoidaan.
6. **Laatat ja ääni:** käytävä ≥ 96 % leikkaushetkellä, kylmänä verkosta lennon aikana ≤ 5 Mt; moottori kuuluu koko
   lennon (currentTime etenee, pelkkä play() ei riitä), lähikuva vs kaukokuva ≥ 8 dB.
7. **EI MONOTONIAA:** lokissa kallistus, kierrokset ja savu vaihtelevat, eikä sama jakso toistu.

## 7. A/B vanhaan ([O] kytkin, [E] toteutus)

Komento `lento v3 0|1` (Komennot.cs), muistetaan PlayerPrefsissä `matkakirja-lento-v3` ja Documents/lento-v3.txt:ssä.
Oletus 1 hyväksynnän jälkeen; 0 ajaa nykyisen lennon koskematta. Vertailu samalla laitteella kylmänä (Ateena,
Pariisi–Bryssel, Lontoo–New York); omistajalle videopari A|B vierekkäin ja avainhetkien kuvaparit, omistaja valitsee.

| Mittari | A (nykyinen) | B (v3, tavoite) |
|---|---|---|
| Musta kuva tai verho alussa | kylmänä 5 s (katto) | 0 s |
| Napautuksesta lennon ensimmäiseen kuvaan | yli 5 s kylmänä | ≤ 4 s kylmänä, ≤ 1,5 s lämpimänä |
| Lennon kesto | 12 s / 16–26 s | 15,0 s kaikilla |
| Lennon laatat kylmänä | 1 761 kpl, 18,6 Mt | ≤ 400 kpl, ≤ 5 Mt |
| Kameran korkein kohta | ~3 000 km | ≤ 20 km |
| Kehysaika, 95 % kehyksistä (iPhone) | mitataan | ≤ 16,7 ms |

## 8. Mitä v3 korvaa hyväksyttäessä (Fablelle Raamattuun)

Korvautuvat: LENNON PINTA (satelliitti, "ei kartan sävyyn tyyliteltyä konetta"), LENNON ESITYKSEN DC-3, savujana ja
pilvisumu, ELOKUVALLINEN ALOITUSLENTO, ALOITUSLENNON KAMERAKÄSIKIRJOITUS ja 25.9.:n "lennon alku näkyy", kestot 12 s ja
16–26 s. Säilyvät: KAMERA-AJOT, TEMPO, kone aina näkyvissä, ei suoraan takaa, LENNON KARTTA, saapumissekvenssi, AIKA.

## 9. Avoimet kysymykset omistajalle

1. **Kone ja väri:** Tiger Moth seepiana (ehdotus), Tiger Moth keltaisena koulukoneena vai Boeing-Stearman?
2. **Lähestymissuunta:** kaupungin kuvauslinja (Ateena etelästä, vaikka lento tulee Lontoosta; ehdotus
   aloituskaupungeille) vai aina todellinen lentosuunta?
3. **Loppu:** lasku ja rullaus renkaalle kameran lähestyessä 80 → 45 km (ehdotus) vai ohilento maamerkin yli?
4. ~~Odotus~~ **PÄÄTETTY (Fable 27.9.):** käynnistysääni ja sykkivä rengas; teksti "Kone lähtee…" vain, jos odotus on yli 2 s.
5. **Pilvet:** pelkkä utu (ehdotus) vai 2–4 paperista pilvenhattaraa, joiden ohi kone lentää?
