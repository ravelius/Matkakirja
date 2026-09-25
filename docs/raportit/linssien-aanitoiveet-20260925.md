# Linssien tunnelmat, musiikkitoiveet ja äänitehosteet (25.9.2026)

*Linssiseppä (Opus, max) klo 23.3x Fablen pyynnöstä Pelikoodarin musiikki- ja äänisuunnitelmaan
(docs/raportit/musiikki-ja-aanisuunnitelma-20260926.md). Lähteet: Raamattu (ÄÄNET JA MUSIIKKI, LINSSIT — YHTEISET
SÄÄNNÖT, KEKSINNÖT-LINSSI, ASTRONAUTIN KAMERA -LINSSI, MUUT LINSSIT, IHMISEN MATKA II), linssien suunnitelmat ja koodi
(web origin/main, proto master bf70290d). "Ehdotus omistajalle" tarkoittaa, että asiaa ei tehdä ilman lupaa.*

## Yhteinen linja (voimassa)

- Linssi on oma näkymä: kaupungin musiikki, luenta ja pulu pysähtyvät (natiivissa `MusiikkiPitoon`).
- Aikajanalinssin oma raita (Keksinnöt 2.9., Ihmisen matka 5.9.) tehdään Lyria 3.5:llä samalla putkella
  (`tools/generoi-siirtymamusiikki.mjs`, ryhmä `linssi`):
  - 50 s saumaton looppi 66 s lähteestä, ristihäivytys 2,5 s
  - −33 LUFS, voima 0,11, nousu 600 ms ja lasku 800 ms
  - tauolla puoleen, ja raita väistää kertojaa ja pulua
- Raitojen linja: akustinen, ei sanoja, ei rumpusettiä eikä syntetisaattoria. Melodia ei saa viedä huomiota kartalta,
  koska kertoja ja kuva ovat pääosassa.
- Humina ja äänimaisemat ovat taustaääniä (taustaäänen säädin, ei musiikkikytkin), −30 LUFS.
- Lisenssit: CC0/PD ensin, CC BY attribuutiolla samassa muutoksessa (lahteet.js). NC ei kelpaa. NASA SVS:n videoiden
  ääniraidat eivät ole PD.

## Ihmisen matka I (web ja natiivi)

- **Tunnelma:** 300 000 vuoden kaari. Hidas, avara ja kärsivällinen, "ei surullinen eikä voitonriemuinen". Kartta ja
  kello ovat pääosassa.
- **Musiikki nyt:** `linssi-ihmisen-matka-lyria.mp3`. Siinä on sydämen syke kehysrummulla ja kaukainen sanaton
  ihmisääni, välillä matala jousi tai puuhuilu, eikä melodiaa. **Toive:** pidetään.
- **Tehosteet:** ei yhtään. Omistaja 25.9.: nykyinen Ihmisen matka säilyy sellaisenaan, joten uusi menee II:een.
  Webin äänimaisemamoduuli on olemassa, mutta sitä ei ole kytketty I:een.

## Ihmisen matka II (vain natiivi)

- **Tunnelma:** sama tarina valolla. Pallo on yön hämärässä, valokeila kulkee tarinan mukana, ja sumu ja seudun äänet
  vaihtuvat jaksoittain. Elokuvamainen, omistajan sanoin "niin hienon kuin se vain pystyy".
- **Musiikki nyt:** sama raita kuin I:ssä (`IhmisenMatkaLinssi.MusiikkiLaji`). Avaus on hiljainen, ja raita nousee
  valon syttyessä.
- **Musiikkitoive:** lyhyt **loppukue** (20–30 s, ei looppi) samoilla soittimilla.
  - Kue alkaa jaksossa 21, kun keilat sammuvat, koko pallo syttyy ja viisi virtaa hehkuu.
  - Se avautuu lämpimäksi ja väljäksi ("perillä"), ei voitonriemuiseksi, ja hiipuu hiljaiseen tuuleen.
  - Suunnitelmassa lukee "musiikki nousee". Muuten looppi riittää.
- **Äänimaisemat nyt:** 15 kenttä-äänitettä:
  - savanni, jokilaakso, meren ranta, vuoristotuuli, ruohikko ja järvi
  - sademetsä, rannikkomeri, luola, arktinen tuuli, tundratuuli
  - metsäsade, kylmä tuuli, avomeri, rantalinnut, hiljainen tuuli

  Ne ovat −30 LUFS, vaihtuvat ristihäivytyksellä ja soivat kertojan ja musiikin alla (Äänimaisema-kytkin). Korjaan itse
  tasatehoisen ristihäivytyksen: nyt keskellä on −3 dB:n kuoppa.
- **Tehostetarpeet:** omistajan 7.9. linjan mukaan "muutamia tarkkaan valittuja", eli vähän ja hiljaa. Hankin ja kytken
  nämä itse aanihaku-putkella, ja tasot noudattavat sinun linjaasi.
  1. Avaus: kamera syöksyy kolmen pilvikuoren läpi, ja jokaisesta kuoresta kuuluu pehmeä ilman suhahdus (0,8–1,2 s).
  2. Luolat (jaksot 11 ja 18): soihdun hiljainen rätinä luolamaiseman päällä lepatuksen ajan.
  3. Aikahyppy (jakso 16): käänteinen tuulen humahdus (1–2 s), kun kello rullaa 50 000 vuotta taaksepäin.
  4. Loppu: loppukue, ei erillistä tehostetta.

  Lumessa ja pölyssä ei ole ääntä.

## Keksinnöt (web ja natiivi)

- **Tunnelma:** vuodet 1769 (Watt) – 1928 (Fleming), 1800-luvun työpaja ja uteliaisuus. Kartta on tummennettu, ja
  keksinnöt syttyvät kuin lamput. Kello, karuselli ja kuvat ovat pääosassa.
- **Musiikki nyt:** `linssi-keksinnot-lyria.mp3`. Pohjalla on levossa olevan sydämen syke, noin 60 bpm, ja sen päällä
  hillitty kellokoneistoteema: vasarapiano tai cembalo, tikittävä kuvio, jouset ja puupuhallin. **Toive:** pidetään.
- **Tehosteet nyt (web):**
  - `keksinto`: pehmeä FM-kilahdus uudesta keksinnöstä. Se ei soi merkkipaalulla 1873.
  - `vuosi`: mekaanisen laskurin naksahdus vuoden vaihtuessa, harvennettuna.
  - `paper`: Tiedeliitteen avaus.

  Yleisön kohahdukset ovat ämpärissä varalla, mutta eivät käytössä (omistaja 3.9.: "todella riinaava").
- **Natiivin aukko:** `keksinto` ja `vuosi` puuttuvat natiivista. `paper` on jo Tiedeliitenakyma.cs:ssä. Tarvitaan kaksi
  tehostetta Tehostetauluun ja alla oleva rajapinta.

## Astronautin kamera (web ja natiivi)

- **Tunnelma:** hiljainen katse avaruudesta. ISS kiertää, ja pallo pyörii sitä seuraten. Rauha ja ihmetys.
- **Musiikki:** ei. Omistaja 16.9. kuunneltuaan: "Jätä musiikki pois. Pidetään pelkkä humina." Musiikki on pidossa
  linssin ajan.
- **Taustaääni nyt (web):** Codexin avaruushumina.
  - Kesto 84 s, taso −30,48 LUFS, ja luupin saumassa on 1,5 s:n ristihäivytys.
  - Web soittaa sen näytetarkasti (`decodeAudioData` + `AudioBufferSourceNode.loop`, js/linssit/satelliitti-aani.js).
- **Natiivin aukko:** humina ei soi natiivissa lainkaan, vaan vain AstronauttiAineisto.cs mainitsee sen.
  - mp3:n kooderiviive tekee saumaan tauon, jos humina soitetaan pelkällä `AudioSource.loop`illa.
  - Siksi tarvitaan purettu klippi tai kahden lähteen ristihäivytys. IhmisenMatka2Maisema.cs tekee jälkimmäisen.
- **Tehosteet:** ei nyt. Ehdotus omistajalle: hyvin hiljainen kameran suljin, kun valokuva avautuu.

## Topografia (web ja natiivi)

- **Tunnelma:** maailma maastona, täysvärisenä reliefinä, kuin pelaaja nostaisi taikalasit silmilleen. Tutkiva ja
  rauhallinen: pelaaja katselee omaan tahtiinsa, eikä kertojaa ole.
- **Musiikki:** ei. Omistaja 20.9. pyysi taustamusiikin pois linssin ajaksi, kuten astronautin kamerassa.
- **Ehdotus omistajalle:** astronautin mallin mukainen oma hiljainen taustaääni ilman musiikkia. Se olisi korkean ilman
  tuulta vuorten yllä, 60–90 s saumattomana ja taustaäänen säätimellä. Nyt linssi on täysin äänetön, vaikka äänet ovat
  päällä.
- **Tehosteet:** ei tarvetta.

## Vesistöt (web ja natiivi; webissä keskeneräisten harmaalla rivillä)

- **Tunnelma:** vain joet ja järvet topografian päällä sinisen sävyinä ("joki laskee sinne minne maa viettää").
  Rauhallinen ja virtaava.
- **Musiikki:** ei omaa. Natiivissa linssi ajaa Topografia-pohjaa, joten musiikki on pidossa.
  - Webin vesistot.js ottaa topografiasta vain piirron (`lataaReliefi`, `piirraReliefi`) eikä pidä musiikkia kiinni.
  - Siksi kaupungin raita voi jatkua webissä. Tämä on tarkistettava.
- **Ehdotus omistajalle** (pariksi Topografian kanssa): kaukainen virtaava joki hyvin hiljaa taustaäänenä.
- **Tehosteet:** ei tarvetta.

## Maapallon tila (tuleva, vain natiivi; toteutus pariteetin jälkeen)

- **Tunnelma:** asiallinen ja numeroihin nojaava. Suunnitelman luku 5: "ei kaunistella eikä kauhistella, ei
  moralisointia".
  - Pohjana on astronautin kamera (avaruus, tähdet).
  - Näkymiä on neljä: merijää 1979→2026 (0,6 s vuodelle), lämpötila 1880→2026 (0,2 s vuodelle), merenpinta ja
    jäätiköt.
  - Jokaisessa näkymässä on kertojan teksti.
- **Musiikkitoive:** pohjalle astronautin humina, koska linssi jatkaa astronautin kamerasta samalla avauskynnyksellä.
  Humina ei ole musiikkia, joten omistajan 16.9. linja ei estä sitä. Sen päälle tulee oma hillitty raita aikajanalinssien
  mitoin.
  - Sävy: viileä, selkeä ja tasainen.
  - Soittimet: hidas piano, matalat jouset ja lasimainen soiva kello.
  - Pulssi pysyy samana eikä kiristy, kun jää vähenee: ei ilmastodokumentin draamaa. NASA SVS:n ääniraitoja ei voi
    käyttää.
- **Tehosteet:**
  1. Vuosilaskurin naksahdus, sama `vuosi` kuin Keksinnöissä. Lämpötilassa se soi vain vuosikymmenen vaihtuessa, koska
     viisi vuotta sekunnissa on liian tiheä.
  2. Pehmeä lyönti, kun animaatio pysähtyy vuosiin 1979 ja 2026 kertojan tauon ajaksi.
  3. Välilehden vaihto (UI-klikkaus).

  Ennätysvuosille ei tule hälytysääniä.

## Taidemuseo (tuleva, vain natiivi; pilotti renessanssisali)

- **Tunnelma:** arvokas ja hiljainen museo.
  - Opastettu kierros on elokuvamainen kamera-ajo, ja kertoja puhuu taustalla.
  - Ilmaan piirtyy seepiamustetta pergamentin sävyissä.
  - Pilotti on renessanssisali Firenze–Rooma–Venetsia, 3 min 20 s.
- **Musiikkitoive:** jokaiselle siivelle oma raita aikakauden soittimin, jolloin pelaaja kuulee aikakauden äänen.
  - Antiikki: lyyra, aulos-tyyppinen ruokosoitin ja kehysrumpu, modaalinen ja harva.
  - **Renessanssi (pilotti):** luuttu, gamba-yhtye ja nokkahuilut, kirkas ja rauhallinen polyfonia.
  - Barokki: cembalo, jouset ja continuo.
  - Romantiikka: piano ja sello.
  - Impressionismi: piano ja harppu, väreilevä.
  - Moderni: niukka ja minimalistinen.

  Oletus on Lyria-looppi, joka väistää kertojaa. Ehdotus omistajalle: aidot PD/CC0-äänitteet aikakauden sävellyksistä
  (esim. Musopen, Commons) ja ruudulle "Soi: <teos>" oppimisen vuoksi. Ne eivät kuitenkaan looppaa eivätkä väistä yhtä
  ennustettavasti.
- **Äänimaisema:** salin huoneääni, eli iso kivihalli, hiljainen ilma ja kaukainen kaiku. Askelia ja ihmisiä ei ole,
  koska kamera lentää.
- **Tehosteet:**
  1. Sulkakynän raapaisu, kun iso merkintä piirtyy ilmaan (vuosiluku tai suuntauksen nimi, 0,6–1,2 s). Pienet merkinnät
     ovat äänettömiä.
  2. Pergamentin kahina salista sisään ja ulos mentäessä. Salin musteviivapiirto (0,8 s) saa saman raapaisun.
  3. Kattolyhdyn läpi pallolle: ilman humahdus ja pilven suhina. Tämä on sama kuin II:n pilvisyöksy, joten yksi yhteinen
     "pilven läpi" -tehoste riittää.
  4. Teoksen ääreen pysähtyessä ei ääntä: kertoja pitää tauon, ja musiikki laskee puoleen.

## Lisäksi: Radio (natiivin uudistus)

Uusia tarpeita ei ole. Asemien välissä kuuluu viritysrahina, ja ääni kirkastuu asemalle lukittuessa webin kaavan mukaan
(viritin.js → RadioAanet.cs). Jos UI-äänet yhtenäistetään, radion nupit otetaan mukaan.

## Rajapintaehdotus natiiviin (Linssit ↔ äänet)

`ILinssiYmparisto`ssa on nyt `MusiikkiPitoon`, `LinssiMusiikki(laji)` ja `LinssiMusiikkiHimmennys(taso)`. Lisäksi
tarvitaan kaksi kutsua:

- `Tehoste(string nimi, float voima = 1)` → `Aanet.Tehoste`. Käyttäjät: Keksintöjen kilahdus ja naksahdus, II:n
  tehosteet, Maapallon tilan naksahdus ja Taidemuseon raapaisu.
- `Taustaaani(string tunnus)`, jossa null = pois: saumaton looppi taustaäänen säätimellä. Käyttäjät: astronautin ja
  Maapallon tilan humina, mahdolliset Topografian ja Vesistöjen taustaäänet sekä Taidemuseon huoneääni. II:n maisema voi
  siirtyä samaan palveluun myöhemmin.

Kun sinun puolesi on valmis, kytken Linssit-puolen kutsut samana päivänä. Kerro vain nimet.
