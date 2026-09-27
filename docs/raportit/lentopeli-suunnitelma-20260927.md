# LENTOPELI — Tiger Moth -lento omana pelinä (suunnitelma omistajan korttiin)

*Linssiseppä (Opus, max) 27.9.2026 klo 12.x Fablen tilauksesta. Pohja: omistajan idea (Raamattu, PELIT, TALOUS JA LUENTA
27.9.: "vapaa lento ja tehtäviä; polttoaine kuluu ja maksaa; lähtöpaikkaan on päästävä takaisin tai tulee sakko;
tehtävistä saa lisää polttoainetta"), lento v3 (docs/raportit/lento-v3-speksi.md, kone ja kamera valmiina proto-haaroissa),
talous (docs/raportit/talous-suunnitelma-20260927.md). Ei koodia ennen hyväksyntää.*

Merkinnät: **[O]** = omistajan vaatimus (sitova). **[E]** = Linssisepän ehdotus (hyväksytään kortilla).

## 0. Tiivistelmä korttiin

**[O]** Pelaaja lentää itse lento v3:n kaksitasoa. Vapaa lento ja tehtäviä. Polttoaine kuluu ja maksaa. Lähtöpaikkaan on
palattava, muuten tulee sakko. Tehtävistä, esimerkiksi renkaan läpi lennosta, saa lisää polttoainetta. Tavoite 60 fps.

**[E]** Tiger Moth jää lento v3:n jälkeen kaupungin renkaalle. Pelaaja napauttaa sitä, ja lentäjä antaa Foggin ohjata:
"Lennä itse". Lento tapahtuu samalla pergamenttikartalla kuin lento v3. Maamerkit (erikoismallit lähitasoineen) ja
tehtävärenkaat ovat kartalla. Ohjaus on yhdellä peukalolla pystyruudussa. Täysi tankki riittää noin 3,5 minuutin lentoon
(kantama noin 480 km kuten oikealla koneella). Yksi lento vie yhden pelivuoron (6 h). Pelissä oppii navigointia
(kompassisuunta, tuulen korjaus, paluupiste) ja polttoaineen taloutta (taloudellinen matkakaasu).

**Toteutus:** Opus max, jonon viimeiseksi lento v3:n päälle (kone, kamera ja moottorin ääni tulevat v3:sta).

## 1. Pelin kulku [E]

1. **Lähtö.** Kaupunkinäkymässä renkaalla seisoo Tiger Moth (sama malli kuin lennossa, potkuri tyhjäkäynnillä). Napautus
   avaa lentokortin: polttoaine, hinta täyteen tankkiin, päivän tuuli (tuulipussi ja nuoli) ja tarjolla olevat tehtävät
   (2–3 kpl, arvottu kaupungin siemenestä ja päivästä). Pelaaja tankkaa (maksu kassasta) ja valitsee "Lähde".
2. **Nousu.** Kone rullaa renkaalta ja nousee. Kamera leikkaa lento v3:n tapaan lähikuvaan. Esilataus on tehty jo
   lentokortin aikana (kohta 5), joten odotusta ei ole.
3. **Lento.** Vapaa lento lentoalueella (säde 150 km lähtökaupungista). Tehtävät näkyvät kartalla musteena. Seuraava
   tehtäväkohde on punainen. Mittarit: polttoaine, korkeus, nopeus, kompassi ja paluurengas (kohta 3).
4. **Paluu.** Laskeutuminen lähtörenkaalle. Avustettu tila hoitaa loppuoikaisun, kun kone on alle 1 km:n korkeudella,
   hitaalla nopeudella ja 20 km:n sisällä renkaasta. Pelaaja ohjaa suunnan ja kaasun. Pomppu, pölypuhallus ja rullaus
   kuten v3:ssa.
5. **Tulos.** Lokirivi ja lyhyt yhteenveto: lentoaika, tehtävät, polttoaine alussa ja lopussa, kulut ja sakot. Kuvauslennon
   kuvat menevät matkakirjaan.

**Kaanon (Fable 27.9.):** etumainen matkustaja punaisella huivilla on Fogg (pelaaja). Takana istuu nimetön lentäjä.
Lentopelissä lentäjä opettaa: ensimmäinen lento on oppitunti, jolloin polttoaine on lentäjän piikkiin eikä sakkoja tule.
Lentäjän neuvot ovat lyhyitä lokirivejä (sisältö: Sisältökirjuri), ei puhetta joka sekunti.

## 2. Mittakaava, lentomalli ja ohjaus [E]

- **Mittakaava pöytäkartta kuten v3:ssa:** siipiväli 5 km (1:560). Lentokorkeus 1–8 km liioitellun (×2) maaston
  yläpuolella. Kamera on aina alle 20 km:n korkeudella. Maamerkit ovat lentopelissä kiinteän kokoisia (esim. Colosseum
  noin 6 km leveä, Akropolis noin 5 km), jotta niitä voi kiertää. Kartalla ne skaalautuvat zoomin mukaan.
- **Aikakerroin 60:** 1 sekunti peliä on 1 minuutti oikeaa lentoa. Tiger Mothin matkanopeus noin 145 km/h näkyy
  2,4 km/s:na ja huippu 175 km/h 2,9 km/s:na. Kantama matkakaasulla on oikea 486 km, eli täysi tankki riittää noin
  200 s:iin. Talouskaasulla lento kestää noin 260 s ja kantama on noin 15 % pidempi; täydellä kaasulla noin 25 % lyhyempi.
- **Lentomalli on pelimäinen, ei simulaattori.** Nopeus kulkee nokan suuntaan. Nokan nosto vaihtaa nopeutta korkeuteen
  ja takaisin (energia säilyy, vastus kuluttaa). Kallistus kääntää koordinoidusti, joten sivuperäsintä ei tarvita.
  Hidas nopeus nostonokalla johtaa pehmeään sakkaukseen: nokka putoaa ja kone toipuu itse 1–2 s:ssa. Tuuli siirtää
  konetta maan suhteen. Moottorin sammuttua kone liitää (liitosuhde noin 1:8).
- **Ohjaus yhdellä peukalolla pystyruudussa:** veto missä tahansa ruudun alaosassa (60 %) on virtuaalinen sauva
  kosketuskohdan suhteen. Vaakaveto kallistaa (enintään 45°), pystyveto nostaa tai laskee nokkaa. Kun sormi nousee, kone
  oikaisee itsensä (avustettu tila). Kaasuvipu on ruudun oikeassa reunassa, ja siinä on pykälät tyhjäkäynti, talous,
  matka ja täysi. Vasenkätiselle kaasuvipu peilataan vasempaan reunaan. **Vapaa tila** (asetuksista) poistaa
  oikaisun ja sakkausavun.
- **Maasto ja törmäys:** lentoalueen korkeuskenttä lasketaan lähtiessä maaston quantized-mesh-laatoista (Z9) 500 m:n
  ruudukoksi (600 × 600 näytettä, noin 0,7 Mt) taustasäikeessä. Kehyksessä ei tehdä Cesiumin asynkronisia kyselyjä.
  Avustetussa tilassa kone varoittaa maastosta (lentäjän rivi ja punainen korkeusmittari) 3 s ennen. Maakosketus
  liian kovaa tai jyrkästi on pakkolasku (kohta 3).

## 3. Polttoaine, raha ja sakot [E]

Omistajan periaate: polttoaine kuluu ja maksaa, tehtävät antavat lisää, ja palaamatta jättäminen maksaa. Luvut sovitetaan
talouden päiväkuluun (20 £ × maan hintataso 0,6 / 1,0 / 1,6).

| Asia | Ehdotus | Peruste |
|---|---|---|
| Täysi tankki (86 l) | 24 £ × hintataso | noin 1,2 päiväkulua; lento on huvitus, ei rahasampo |
| Kulutus | kasvaa kaasun mukana jyrkemmin kuin nopeus: täysi kaasu noin 1,5 × ja talouskaasu noin 0,75 × matkakaasun kulutus | pelaaja oppii taloudellisen matkakaasun |
| Tehtävä suoritettu | +20–35 % tankista (renkaat 20, kuvauslento 25, navigointi 35) | omistajan "tehtävistä lisää polttoainetta" |
| Laskeutuminen lähtörenkaalle | 0 £ | tavoite |
| Laskeutuminen muualle (pelto, toinen kaupunki) | sakko 40 £ × hintataso | koneen nouto; lentäjä lentää koneen takaisin |
| Polttoaine loppuu | kone liitää; onnistunut liitolasku muualle = sama 40 £ | liito on taito, ei rangaistus |
| Pakkolasku (liian kova tai maastoon) | 80 £ × hintataso, lento päättyy | ei räjähdyksiä: pölypilvi, kone nokallaan, Fogg kunnossa |
| Aika | yksi lento = yksi vuoro (6 h) | kuten huvipuistokäynti |

- **Paluurengas (oppimisen ydin):** kartalla näkyy katkoviivarengas, jonka sisältä polttoaine riittää vielä takaisin
  nykyisellä tuulella ja talouskaasulla. Kun kone lähestyy rengasta, lentäjä sanoo sen ("Vielä ehdimme takaisin").
  Näin pelaaja oppii paluupisteen ja kantaman.
- **Tuuli:** päivän tuuli arvotaan siemenestä, 0–25 % matkanopeudesta, ja se näkyy tuulipussina renkaalla ja savun
  suuntana. Vastatuuli pidentää paluuta, ja pelaaja oppii korjauskulman.
- **Kassa:** tankkaus ja sakot kulkevat talouden kautta (Pelikoodarin `Peli/Kaupat.cs`, talous vaihe 1) samoin
  lokiriveillä kuin muut kulut. Rahaton pelaaja ei voi tankata. Ensimmäinen oppitunti on ilmainen.

## 4. Tehtävät [E]

Vaihe 1 (kolme lajia), kaikki siemenestä, joten sama kaupunki ja päivä antaa saman tehtävän:

| Tehtävä | Kulku | Mitä oppii | Palkkio |
|---|---|---|---|
| **Rengasrata** | 5–7 musterengasta (halkaisija 3 × siipiväli) maamerkin ympärillä tai laakson läpi; seuraava rengas punaisena | ohjaus, korkeuden ja nopeuden hallinta | +20 % tankki |
| **Kuvauslento** | lennä maamerkin (erikoismalli tai nosto) ohi oikealla korkeudella ja etäisyydellä; kamera "naksahtaa" | kohteen muoto ylhäältä; kortin teksti avautuu matkakirjaan | +25 % tankki ja kuva matkakirjaan |
| **Navigointi** | lentäjä antaa suuntiman ja matkan ("047°, 60 km"); kohteessa savumerkki, jonka yli lennetään | kompassisuunta, mittakaava, tuulen korjaus | +35 % tankki |

Vaihe 2 (myöhemmin): **postilento** toiseen kaupunkiin (lento päättyy siellä, ei sakkoa; rahapalkkio 20–40 £; lentopostin
historia), **tarkkuuslasku** merkitylle pellolle ja **tuulipäivä** (kova sivutuuli). Kaverihaaste (haamulento samasta
rengasradasta) kuuluu moninpelin yhteyteen.

## 5. Kuva, kamera ja esilataus [E]

- **Kartta kuten lento v3:ssa:** pohja + maasto (pergamentti), kerma pois, utu, etäisyyssumu 150 → 450 km. Toisin kuin
  v3:ssa erikoismallit, kategoriasymbolit ja tehtävärenkaat näkyvät, koska ne ovat pelin kohteita. Nimiöt ovat
  piilossa. Lähitaso (Erikoismalli.Lahi, ≤ 3 000 kolmiota) kytkeytyy maamerkin lähellä.
- **Kamera:** takaviistosta koneen vasemmalta (θ 25–35° takaa, ei suoraan takaa), etäisyys 30–40 km, katse −11…−16°
  kuten v3:ssa. Käännöksissä kamera seuraa 0,4 s:n viiveellä, joten kallistus näkyy. Kone on aina kuvassa ≥ 20 %
  lyhyestä sivusta. Toinen kamera (napautus): kylkikuva kuten v3:n 5 s:n kohta. Ohjaamokuvaa ei ole, koska kone ja
  Foggin huivi pysyvät näkyvissä (Raamattu: kone aina näkyvissä).
- **Esilataus:** lentoalue (säde 150 km) ladataan lentokortin aikana `LennonV3Kaytava`-mallilla: pohja ja maasto Z6–Z9
  koko alueelta ja Z10 40 km:n säteellä lähtörenkaasta. Arvio noin 150 laattaa ja 2–3 Mt (Ateenan v3-käytävä oli
  224 laattaa ja 2,2 Mt). "Lähde" aktivoituu, kun alue on ≥ 98 %. Offline-paketilla odotus on nolla. Alueen ulkopuolelle
  saa lentää, mutta siellä laatat tulevat verkosta tavallisella jonolla.

## 6. Suorituskyky: 60 fps [O], budjetti [E]

Tavoite on iPhonella 60 Hz (16,7 ms) koko lennon ajan, myös 120 Hz:n laitteilla lento 60 Hz:llä kuten v3. Budjetti:

| Osa | ms |
|---|---|
| Pallo (pohja + maasto, liikkeen SSE 32 LiikeLaatoista, sumu piilottaa kaukaiset) | ≤ 10,5 |
| Utu ja taivas | ≤ 0,5 |
| Kone, varjo, potkurilevy ja savu | ≤ 1,4 |
| Maamerkit ja renkaat (enintään 4 lähitason mallia kerralla) | ≤ 1,0 |
| Lentomalli, ohjaus, korkeuskenttä, tehtävät | ≤ 0,3 |
| Mittarit (UI) | ≤ 1,0 |
| Kevyt filmipino (rae ja vinjetti, ei syväterävyyttä) | ≤ 1,0 |
| Varaa | ≥ 1,0 |

Lämpö: täysi tankki rajaa lennon noin 4 minuuttiin. Kuumana (serious) nykyinen sääntö on voimassa: 30 fps,
renderScale 0,7, filmipino pois ja savu puoleen. Kone, varjo ja savu esilämmitetään lentokortin aikana.

## 7. Hyväksymislista [E]

1. **60 fps:** iPhonella 5 minuutin lento Ateenassa (rengasrata + paluu). 95 % kehyksistä ≤ 16,7 ms, enintään 2 kehystä
   yli 33 ms (nousun leikkaus). Kolme peräkkäistä lentoa, eikä lämpötaso nouse yli tason fair.
2. **Laatat:** "Lähde" aktivoituu ≤ 4 s kylmänä ja ≤ 1 s lämpimänä. Lentoalueella ei harmaita eikä magentoja laattoja
   (testitila kuten v3:ssa). Verkkoa lennon aikana ≤ 1 Mt alueen sisällä.
3. **Ohjaus:** kosketuksesta näkyvään kallistukseen ≤ 50 ms. Avustetussa tilassa sormen nosto oikaisee 1,5 s:ssa.
   Testaaja, joka ei ole lentänyt, suorittaa oppitunnin rengasradan enintään 3 yrityksellä.
4. **Polttoaine ja raha:** tankkaus, kulutus kaasun mukaan, tehtäväpalkkiot, paluu ilman sakkoa, sakko muualle
   laskeutumisesta, liitolasku ja pakkolasku. Jokainen kirjautuu kassaan ja lokiin oikein (yksikkötestit C#:ssa ja
   talouden testit). Paluurengas vastaa laskettua kantamaa ±5 %.
5. **Tehtävät:** kolme lajia siemenestä deterministisinä (sama kaupunki ja päivä = sama tehtävä), yksikkötestit.
   Rengas lasketaan läpäistyksi vain, kun kone kulkee sen tason läpi renkaan sisältä.
6. **Kamera:** kone kuvassa 100 % kehyksistä ≥ 20 % lyhyestä sivusta. `kamerareitti paalle` -lokissa 0 HYPPY ja
   0 KULMAHYPPY. Kamera aina alle 20 km:ssä.
7. **Ääni:** moottori kuuluu koko lennon ja seuraa kaasua (currentTime etenee, pelkkä play() ei riitä). Tyhjäkäynnin ja
   täyden kaasun ero kuuluu.
8. **Keskeytys:** sovelluksen tausta kesken lennon ja paluu jatkaa lentoa pysäytettynä (tauko). Sovelluksen sulkeminen
   palauttaa koneen renkaalle ilman sakkoa, ja käytetty polttoaine on kulunut.
9. **Vakaus:** 10 lentoa, 0 poikkeusta.
10. **Omistajalle:** pysäytyskuvat (nousu, rengas, kuvauslento, paluurengas, lasku) iPhonen ruutuna rajattuna, kulma ja
    versio kuvassa, sekä yksi rajattu video liikkeestä.

## 8. Työnjako ja vaiheet [E]

| Vaihe | Sisältö | Kuka |
|---|---|---|
| 0 Edellytys | lento v3 junaan ja tuotantoon (kone, kamera, käytävä, LentoAani) | Natiiviseppä, Pelikoodari |
| 1 Prototyyppi | `Lentopeli`-ydin puhtaana C#:na testeineen (lentomalli, ohjaus, polttoaine, paluurengas, tehtävät), korkeuskenttä, kamera, TigerMothKonen ohjattava tila, yksi rengasrata Ateenassa; video ja kehysmittaus Fablelle | Linssiseppä (Opus max) |
| 2 Peliin | tankkaus ja sakot kassaan, tallennus (`lentopeli: { polttoaine, tehtavat }`), vuoron kulutus | Pelikoodari |
| 2 Peliin | lentokortti, mittarit, tulosyhteenveto (natiivimallit Fablen hyväksymällä kuvaparilla, koska webissä ei ole vastinetta) | Natiivi-UI |
| 2 Peliin | pallon tila lentopelin aikana, lentoalueen esilataus, kytkin `lentopeli 0\|1` | Natiiviseppä |
| 2 Peliin | moottorin ääni kaasusta (LentoAani + kaasu), tuulen humina | Pelikoodari |
| 2 Peliin | lentäjän rivit, tehtävien tekstit, kuvauslennon korttitekstit | Sisältökirjuri |
| 3 Laajennus | postilento, tarkkuuslasku, tuulipäivä, lisää kaupunkeja | kaikki |

Arvio: vaihe 1 yksi päivä, vaihe 2 1–2 päivää rinnakkain. Pelikatalogiin (docs/pelikatalogi.md, Sisältökirjuri) tulee rivi
"Lentopeli (omistajan idea)".

## 9. Kysymykset omistajalle (kortti)

1. **Mistä lentopeli avautuu?** A) Tiger Moth jää v3:n jälkeen kaupungin renkaalle, ja napautus avaa lentokortin
   (suositus). B) Vain valituissa lentokenttäkaupungeissa. C) Ostetaan Kaupasta (60 £) kuten muut pelit.
2. **Ohjaus?** A) Yhden peukalon veto ja kaasuvipu (suositus). B) Laitteen kallistus. C) Molemmat valittavina.
3. **Hinnat:** täysi tankki 24 £ × hintataso, sakko muualle laskeutumisesta 40 £ ja pakkolaskusta 80 £, tehtävät
   +20–35 % tankista, yksi lento = yksi vuoro. Sopiiko?
4. **Kesto:** täysi tankki noin 3,5 min (oikea kantama 480 km) vai pidempi, esim. 6 min (kantama pelissä 800 km)?
5. **Vain natiivi** (kuten elävä kartta, NATIIVI PELI ETUSIJALLE) vai myös web? Suositus: vain natiivi.
