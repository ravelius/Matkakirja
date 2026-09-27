# LENTOPELI — Tiger Moth -lento omana pelinä (omistaja hyväksyi 27.9.2026 klo 12.xx)

*Linssiseppä (Opus, max) 27.9.2026 klo 12.0x Fablen tilauksesta, päivitetty klo 12.2x omistajan korttivastausten mukaan
(kohta 9). Pohja: omistajan idea (Raamattu, PELIT, TALOUS JA LUENTA 27.9.: "vapaa lento ja tehtäviä; polttoaine kuluu ja
maksaa; lähtöpaikkaan on päästävä takaisin tai tulee sakko; tehtävistä saa lisää polttoainetta"), lento v3
(docs/raportit/lento-v3-speksi.md: kone ja kamera valmiina, 1.0.30-junaan) ja talous
(docs/raportit/talous-suunnitelma-20260927.md).*

Merkinnät: **[O]** = omistajan vaatimus tai päätös (sitova). **[E]** = Linssisepän ehdotus, jota omistaja ei ole muuttanut.

## 0. Tiivistelmä

**[O]** Pelaaja lentää itse lento v3:n kaksitasoa. Vapaa lento ja tehtäviä. Polttoaine kuluu ja maksaa. Lähtöpaikkaan on
palattava, muuten tulee sakko. Tehtävistä, esimerkiksi renkaan läpi lennosta, saa lisää polttoainetta. Tavoite 60 fps.
Peli ostetaan **Kaupasta 60 £** kuten muut pelit. Ohjaus on **peukaloveto ja kaasuvipu**. Täysi tankki riittää
**6 minuutiksi (kantama 800 km)**. Hinnat ja sakot kohdan 3 mukaan. **Vain natiivi.**

**[E]** Lento tapahtuu samalla pergamenttikartalla kuin lento v3. Maamerkit (erikoismallit lähitasoineen) ja tehtävärenkaat
ovat kartalla. Tiger Moth seisoo lento v3:n jälkeen kaupungin renkaalla ja toimii ostetun pelin pikalinkkinä. Yksi lento vie yhden
pelivuoron (6 h). Pelissä oppii navigointia (kompassisuunta, tuulen korjaus, paluupiste) ja polttoaineen taloutta
(taloudellinen matkakaasu).

**Toteutus:** Opus max, jonon viimeiseksi lento v3:n päälle (kone, kamera ja moottorin ääni tulevat v3:sta).

## 1. Pelin kulku

1. **Osto [O].** Lentopeli on Kaupassa 60 £ kuten muut pelit. Omistus on sama kuin muilla peleillä, joten Raamatun
   yleinen sääntö pätee: pelit voi myös löytää ilmaiseksi. **[O]** Kun peli on ostettu, renkaalla seisova Tiger Moth
   on pikalinkki: napautus avaa lentokortin. **[E]** Ostamattomana kone on vain osa kaupunkinäkymää, eikä se mainosta
   Kauppaa.
2. **Lentokortti [E].** Kortissa näkyvät polttoaine, hinta täyteen tankkiin, päivän tuuli (tuulipussi ja nuoli) ja tarjolla
   olevat tehtävät (2–3 kpl, arvottu kaupungin siemenestä ja päivästä). Pelaaja tankkaa (maksu kassasta) ja valitsee
   "Lähde". Lentoalueen esilataus alkaa heti, kun kortti avautuu (kohta 5).
3. **Nousu.** Kone rullaa renkaalta ja nousee. Kamera leikkaa lento v3:n tapaan lähikuvaan.
4. **Lento.** Vapaa lento lentoalueella (säde 250 km lähtökaupungista). Tehtävät näkyvät kartalla musteena, ja seuraava
   tehtäväkohde on punainen. Mittarit: polttoaine, korkeus, nopeus, kompassi ja paluurengas (kohta 3).
5. **Paluu.** Laskeutuminen lähtörenkaalle. Avustettu tila hoitaa loppuoikaisun, kun kone on alle 1 km:n korkeudella,
   hitaalla nopeudella ja 20 km:n sisällä renkaasta. Pelaaja ohjaa suunnan ja kaasun. Pomppu, pölypuhallus ja rullaus
   kuten v3:ssa.
6. **Tulos.** Lokirivi ja lyhyt yhteenveto: lentoaika, tehtävät, polttoaine alussa ja lopussa, kulut ja sakot. Kuvauslennon
   kuvat menevät matkakirjaan.

**Kaanon (Fable 27.9.):** etumainen matkustaja punaisella huivilla on Fogg (pelaaja). Takana istuu nimetön lentäjä.
Lentopelissä lentäjä opettaa: ensimmäinen lento oston jälkeen on oppitunti, jolloin polttoaine on lentäjän piikkiin eikä
sakkoja tule. Lentäjän neuvot ovat lyhyitä lokirivejä (sisältö: Sisältökirjuri), ei puhetta joka sekunti.

## 2. Mittakaava, lentomalli ja ohjaus

- **Mittakaava on pöytäkartta kuten v3:ssa [E]:** siipiväli 5 km (1:560). Lentokorkeus 1–8 km liioitellun (×2) maaston
  yläpuolella. Kamera on aina alle 20 km:n korkeudella. Maamerkit ovat lentopelissä kiinteän kokoisia (esim. Colosseum
  noin 6 km leveä, Akropolis noin 5 km), jotta niitä voi kiertää. Kartalla ne skaalautuvat zoomin mukaan.
- **Kesto ja kantama [O]:** täysi tankki riittää matkakaasulla 6 minuuttia ja 800 km. **[E]** Siitä seuraa matkanopeus
  2,2 km/s (Tiger Mothin 145 km/h aikakertoimella noin 55) ja huippu 2,7 km/s (175 km/h). Talouskaasulla lento kestää
  noin 8 min ja kantama on noin 15 % pidempi. Täydellä kaasulla lento kestää noin 4 min ja kantama on noin 20 % lyhyempi.
  Oikean koneen kantama on 486 km, joten peli antaa pidemmän lennon kuin todellisuus.
- **Lentomalli on pelimäinen, ei simulaattori [E].** Nopeus kulkee nokan suuntaan. Nokan nosto vaihtaa nopeutta
  korkeuteen ja takaisin (energia säilyy, vastus kuluttaa). Kallistus kääntää koordinoidusti, joten sivuperäsintä ei
  tarvita. Hidas nopeus nostonokalla johtaa pehmeään sakkaukseen: nokka putoaa ja kone toipuu itse 1–2 s:ssa. Tuuli
  siirtää konetta maan suhteen. Moottorin sammuttua kone liitää (liitosuhde noin 1:8).
- **Ohjaus [O] peukaloveto ja kaasuvipu, toteutus [E]:** veto missä tahansa ruudun alaosassa (60 %) on virtuaalinen sauva
  kosketuskohdan suhteen. Vaakaveto kallistaa (enintään 45°), pystyveto nostaa tai laskee nokkaa. Kun sormi nousee, kone
  oikaisee itsensä (avustettu tila). Kaasuvipu on ruudun oikeassa reunassa, ja siinä on pykälät tyhjäkäynti, talous,
  matka ja täysi. Vasenkätiselle kaasuvipu peilataan vasempaan reunaan. **Vapaa tila** (asetuksista) poistaa oikaisun ja
  sakkausavun. Kallistusohjausta (gyro) ei tehdä.
- **Maasto ja törmäys [E]:** lentoalueen korkeuskenttä lasketaan lähtiessä maaston quantized-mesh-laatoista (Z9) 500 m:n
  ruudukoksi (1 000 × 1 000 näytettä, noin 2 Mt) taustasäikeessä. Kehyksessä ei tehdä Cesiumin asynkronisia kyselyjä.
  Avustetussa tilassa kone varoittaa maastosta (lentäjän rivi ja punainen korkeusmittari) 3 s ennen. Maakosketus
  liian kovaa tai jyrkästi on pakkolasku (kohta 3).

## 3. Polttoaine, raha ja sakot

Omistajan periaate: polttoaine kuluu ja maksaa, tehtävät antavat lisää, ja palaamatta jättäminen maksaa. Luvut sovitetaan
talouden päiväkuluun (20 £ × maan hintataso 0,6 / 1,0 / 1,6). Omistaja hyväksyi hinnat sellaisenaan **[O]**.

| Asia | Päätös | Peruste |
|---|---|---|
| Peli | **60 £ Kaupasta** [O] | kuten muut pelit |
| Täysi tankki (86 l) | **24 £ × hintataso** [O] | noin 1,2 päiväkulua, eli 4 £ minuutissa; lento on huvitus, ei rahasampo |
| Kulutus | täysi kaasu noin 1,5 × ja talouskaasu noin 0,75 × matkakaasun kulutus [E] | pelaaja oppii taloudellisen matkakaasun |
| Tehtävä suoritettu | **+20–35 % tankista** [O] (renkaat 20, kuvauslento 25, navigointi 35) | omistajan "tehtävistä lisää polttoainetta" |
| Laskeutuminen lähtörenkaalle | 0 £ | tavoite |
| Laskeutuminen muualle (pelto, toinen kaupunki) | **sakko 40 £ × hintataso** [O] | koneen nouto; lentäjä lentää koneen takaisin |
| Polttoaine loppuu | kone liitää; onnistunut liitolasku muualle = sama 40 £ [E] | liito on taito, ei rangaistus |
| Pakkolasku (liian kova tai maastoon) | **80 £ × hintataso** [O], lento päättyy | ei räjähdyksiä: pölypilvi, kone nokallaan, Fogg kunnossa |
| Aika | **yksi lento = yksi vuoro (6 h)** [O] | kuten huvipuistokäynti |

- **Paluurengas (oppimisen ydin) [E]:** kartalla näkyy katkoviivarengas, jonka sisältä polttoaine riittää vielä takaisin
  nykyisellä tuulella ja talouskaasulla. Kun kone lähestyy rengasta, lentäjä sanoo sen ("Vielä ehdimme takaisin").
  Näin pelaaja oppii paluupisteen ja kantaman.
- **Tuuli [E]:** päivän tuuli arvotaan siemenestä, 0–25 % matkanopeudesta, ja se näkyy tuulipussina renkaalla ja savun
  suuntana. Vastatuuli pidentää paluuta, ja pelaaja oppii korjauskulman.
- **Kassa [E]:** osto, tankkaus ja sakot kulkevat talouden kautta (Pelikoodarin `Peli/Kaupat.cs`, talous vaihe 1) samoin
  lokiriveillä kuin muut kulut. Rahaton pelaaja ei voi tankata.

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
- **Esilataus kahdessa osassa (`LennonV3Kaytava`-mallilla):**
  1. **Lähialue** (säde 60 km lähtörenkaasta, pohja ja maasto Z6–Z10, noin 40 laattaa, alle 1 Mt) ladataan lentokortin
     aikana. "Lähde" aktivoituu, kun lähialue on ≥ 98 %.
  2. **Muu lentoalue** (säde 250 km, pohja ja maasto Z6–Z9, arvio 250–350 laattaa ja 3–5 Mt) latautuu nousun ja lennon
     alussa etäisyysjärjestyksessä. Alueen reunalle on matkakaasulla vähintään 110 s, joten lataus ehtii kauas edelle.
  Offline-paketilla odotus on nolla. Alueen ulkopuolelle saa lentää, mutta siellä laatat tulevat verkosta tavallisella
  jonolla.

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

Lämpö: täyden tankin lento kestää 6–8 minuuttia. Kuumana (serious) nykyinen sääntö on voimassa: 30 fps, renderScale 0,7,
filmipino pois ja savu puoleen. Kone, varjo ja savu esilämmitetään lentokortin aikana.

## 7. Hyväksymislista

1. **60 fps:** iPhonella täyden tankin lento Ateenassa (rengasrata, kuvauslento ja paluu, noin 6 min). 95 % kehyksistä
   ≤ 16,7 ms, enintään 2 kehystä yli 33 ms (nousun leikkaus). Kaksi peräkkäistä täyttä lentoa (noin 12 min), eikä
   lämpötaso nouse yli tason fair.
2. **Kauppa ja pikalinkki:** lentopeli on Kaupassa 60 £. Osto veloittaa kassan ja kirjautuu lokiin. Ostettuna renkaan
   Tiger Moth avaa lentokortin; ostamattomana napautus ei avaa mitään. Web ei näytä lentopeliä (vain natiivi).
3. **Laatat:** "Lähde" aktivoituu ≤ 4 s kylmänä (Wi-Fi) ja ≤ 1 s lämpimänä. Lentoalue on ladattu, ennen kuin kone ehtii
   sen reunalle. Lentoalueella ei harmaita eikä magentoja laattoja (testitila kuten v3:ssa). Verkkoa lennon aikana
   ≤ 5 Mt alueen sisällä.
4. **Ohjaus:** kosketuksesta näkyvään kallistukseen ≤ 50 ms. Avustetussa tilassa sormen nosto oikaisee 1,5 s:ssa.
   Testaaja, joka ei ole lentänyt, suorittaa oppitunnin rengasradan enintään 3 yrityksellä.
5. **Polttoaine ja raha:** täysi tankki matkakaasulla 360 s ± 5 % ja 800 km ± 5 %. Tankkaus 24 £ × hintataso, tehtävät
   +20 / 25 / 35 %, sakot 40 ja 80 £ × hintataso, liitolasku ja pakkolasku. Oppitunti on ilmainen ilman sakkoja, ja
   yksi lento kuluttaa yhden vuoron. Jokainen kirjautuu kassaan ja lokiin oikein (yksikkötestit C#:ssa ja talouden
   testit). Paluurengas vastaa laskettua kantamaa ±5 %.
6. **Tehtävät:** kolme lajia siemenestä deterministisinä (sama kaupunki ja päivä = sama tehtävä), yksikkötestit.
   Rengas lasketaan läpäistyksi vain, kun kone kulkee sen tason läpi renkaan sisältä.
7. **Kamera:** kone kuvassa 100 % kehyksistä ≥ 20 % lyhyestä sivusta. `kamerareitti paalle` -lokissa 0 HYPPY ja
   0 KULMAHYPPY. Kamera aina alle 20 km:ssä.
8. **Ääni:** moottori kuuluu koko lennon ja seuraa kaasua (currentTime etenee, pelkkä play() ei riitä). Tyhjäkäynnin ja
   täyden kaasun ero kuuluu.
9. **Keskeytys:** sovelluksen tausta kesken lennon ja paluu jatkaa lentoa pysäytettynä (tauko). Sovelluksen sulkeminen
   palauttaa koneen renkaalle ilman sakkoa, ja käytetty polttoaine on kulunut.
10. **Vakaus:** 10 lentoa, 0 poikkeusta.
11. **Omistajalle:** pysäytyskuvat (nousu, rengas, kuvauslento, paluurengas, lasku) iPhonen ruutuna rajattuna, kulma ja
    versio kuvassa, sekä yksi rajattu video liikkeestä.

## 8. Työnjako ja vaiheet [E]

| Vaihe | Sisältö | Kuka |
|---|---|---|
| 0 Edellytys | lento v3 1.0.30-junaan ja tuotantoon (kone, kamera, käytävä; ääni ensin vanhalla lentoäänellä) | Natiiviseppä, Pelikoodari |
| 1 Prototyyppi | `Lentopeli`-ydin puhtaana C#:na testeineen (lentomalli, ohjaus, polttoaine, paluurengas, tehtävät), korkeuskenttä, kamera, TigerMothKonen ohjattava tila, yksi rengasrata Ateenassa; video ja kehysmittaus Fablelle | Linssiseppä (Opus max) |
| 2 Peliin | Kaupan tuote 60 £ ja omistus, tankkaus ja sakot kassaan, tallennus (`lentopeli: { polttoaine, tehtavat }`), vuoron kulutus | Pelikoodari |
| 2 Peliin | Kaupan rivi, lentokortti, mittarit ja tulosyhteenveto (natiivimallit Fablen hyväksymällä kuvaparilla, koska webissä ei ole vastinetta) | Natiivi-UI |
| 2 Peliin | pallon tila lentopelin aikana, lentoalueen esilataus, kytkin `lentopeli 0\|1` | Natiiviseppä |
| 2 Peliin | moottorin ääni kaasusta (LentoAani + kaasu), tuulen humina | Pelikoodari |
| 2 Peliin | lentäjän rivit, tehtävien tekstit, kuvauslennon korttitekstit | Sisältökirjuri |
| 3 Laajennus | postilento, tarkkuuslasku, tuulipäivä, lisää kaupunkeja | kaikki |

Arvio: vaihe 1 yksi päivä, vaihe 2 1–2 päivää rinnakkain. Pelikatalogiin (docs/pelikatalogi.md, Sisältökirjuri) tulee rivi
"Lentopeli (omistajan idea, vain natiivi, Kauppa 60 £)".

## 9. Omistajan päätökset (kortti 27.9.2026 klo 12.xx, Fablen kautta)

1. **Avautuminen:** Kaupasta 60 £ kuten muut pelit, ei renkaalta ilmaiseksi. Tiger Moth renkaalla voi toimia Kaupan
   pikalinkkinä, jos peli on ostettu (kohta 1).
2. **Ohjaus:** peukaloveto ja kaasuvipu.
3. **Hinnat sellaisenaan:** tankki 24 £ × hintataso, sakot 40 / 80 £, tehtävät +20–35 % tankista, yksi lento = yksi vuoro.
4. **Kesto:** täysi tankki 6 min, kantama 800 km.
5. **Alusta:** vain natiivi.
