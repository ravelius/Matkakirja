# Retkikunnan pallot näkyviin toisilleen: suunnitelma

Pelikoodari ja Linssiseppä 12.10.2026 (omistaja 12.5x: "Kuumailmapallossa saisi liikkua useammalla pallolla ja ne voisi näkyä toisille"; PT:n tilaus). Suunnitelma PT:n hyväksyttäväksi, ei koodia vielä. **Tulkinta:** jokainen retkikunnan jäsen lentää omaa palloaan. Kun jäsenet ovat samassa kaupungissa, he näkevät toistensa pallot ja nimimerkit reaaliajassa.

## 1. Nykytila (valmiit osat)

| Osa | Missä | Käyttö tässä |
|---|---|---|
| Retkikunta (enintään 8 jäsentä, koodi + jäsentunnus + avain) | worker `matkakirja-sahke` (D1), natiivi `Sahke.cs` / `SahkeYhteys.cs` | tunnistus ja yksityisyys: vain oma retkikunta |
| Natiiviportti (`x-matkakirja-natiivi` + User-Agent) ja avainotsake `x-sahke-avain` | worker `kasittelija.js` | sama portti uudelle reitille |
| Muut pallot (2–6 koristepalloa kaupungin yllä, paletit, poltin, polttimen ääni) | `Linssit/Ydin/Elava/MuutPallot.cs`, `ElavaKaupunki.cs`, `ElavatAanet.cs` (LS1) | jäsenten pallot piirretään samalla mallilla ja palettilla; poltin ja ääni sellaisinaan |
| Oman pallon vapaa lento ja kaupungin koordinaatit | `PalloKierto.cs`, `KaupunkiPalloMitat.cs`, `OpasSovitin` (LS1) | oma sijainti lähetetään tästä |

Tarkistus 12.10.: natiivin ja workerin retkikunnan päätepisteet täsmäävät. Elävä worker päästää iOS- ja TF-tunnuksen läpi. Kahden simulaattorin päästä päähän -testi on Laitetestaajalla.

## 2. Worker: huone per kaupunki

- **Durable Object `PalloHuone`**, avain `<retkikunnan koodi>:<kaupunki>`.
  - Uusi reitti samaan workeriin: `GET /pallot?koodi&jasenId&kaupunki` WebSocket-päivityksenä, avain otsakkeessa.
  - Yhteys hyväksytään vain, jos D1:n retkikuntatunnukset täsmäävät (sama tarkistus kuin `/retkikunta/tila`) ja natiiviportti tai sallittu origin on kunnossa.
  - Hibernation-API: huone ei maksa levossa.
- **Viesti** (JSON, noin 70 tavua): `{j, lat, lon, alt, suunta, poltin, t}`.
  - Sijainti on pelin pallon (kaupunkikameran silmän) sijainti WGS84:nä: lat/lon 1e-6 ja ellipsoidikorkeus metreinä (luku 4), ei laitteen paikannusta.
  - Huone välittää viestin muille huoneessa ja pitää vain viimeisimmän tilan muistissa. Mitään ei tallenneta levylle eikä historiaa synny.
- **Tahti:** liikkuessa 1 Hz (nopeassa liikkeessä tai käännöksessä 2 Hz), paikallaan 0,2 Hz. Hiljaisuus 30 s → jäsen poistuu huoneesta (`{j, pois: true}`).
- **Kaupungin vaihto** = huoneen vaihto: vanha yhteys suljetaan ja uusi avataan. Eri kaupungeissa olevat eivät näe toisiaan.
- **Rajat:** enintään 8 yhteyttä huoneessa (retkikunnan koko), enintään 4 viestiä sekunnissa jäsentä kohden (ylimenevät pudotetaan), viestin enimmäiskoko 256 tavua.
- **Kustannus:** 8 jäsentä × 1 Hz ≈ 29 000 viestiä tunnissa huonetta kohden. Saapuvat WebSocket-viestit laskutetaan 20:1 (noin 1 400 pyyntöä tunnissa). Ilmaisen ja maksullisen tason rajat tarkistetaan Julkaisijan kanssa ennen käyttöönottoa (Durable Objects SQLite-taustalla).

## 3. Natiivi asiakas

- **Yhteys:** `System.Net.WebSockets.ClientWebSocket` (toimii IL2CPP:llä iOS:llä ja Macilla). Oma `PalloYhteys`-luokka `SahkeYhteys`-mallin mukaan.
  - Katkos → uusi yhteys porrastetulla viiveellä 1, 2, 4 … 30 s.
  - Sovellus taustalle → yhteys kiinni. Ei verkkotyyppiehtoja (LATAUS SAMA KAIKILLA VERKOILLA).
- **Lähetys:** oman pallon tila `PalloKierto`sta tahdin mukaan. Lähetetään vain, kun pallo on kaupungin lentotilassa ja retkikunta on olemassa.
- **Interpolointi:** jäsenkohtainen puskuri (3–5 tilaa). Piirto 1,2 s jäljessä, ja tilojen välillä Hermite-käyrä paikalle sekä tasainen kulmainterpolointi suunnalle.
  - Puskurin loputtua ekstrapoloidaan enintään 1 s, sitten pallo pysähtyy ja häivytetään 10 s jälkeen.
  - Puhdas C#, Peli-testit (tahti, puskuri, ekstrapolointiraja, kaupungin vaihto).
- **Yksityisyys:** näkyy vain oman retkikunnan jäsenille. Asetuksiin kytkin "Näytä palloni retkikunnalle" (oletus päällä, kun retkikunta on perustettu), ja pois päältä yhteyttä ei avata. Ei vapaata tekstiä eikä chattia. Nimimerkki on jo retkikunnan nimimerkki (valmiista nimilistasta).

## 4. Piirto ja nimilappu (Linssiseppä; nimilapun pohja Natiivi-UI)

- **Oman pallon sijainnin lähde (LS1):** pelaaja on korissa (1. persoona), joten pallon paikka on piirretyn kaupunkikameran silmä, ei
  oppaan katsepiste. Lähetetään kaupunkikameran sijainti geodeettisena: `CesiumGeoreference`n ECEF-muunnos → WGS84 lat/lon ja
  **ellipsoidikorkeus** (ei merenpinta: laitteiden geoidimalli ei tällöin vaikuta), sekä suunta = kameran suuntima. Lähde on sama
  kaikissa kaupunkitiloissa (opas, kaupunkikierros, vapaa lento, aarretehtävän etsintä): `OpasSovitin`/`KierrosSovitin` kuvaavat kameran
  `PalloKierto.Kuvaa`n kautta, joten yksi lukukohta kameran jälkeen (KyydinKameraEnnen-vaiheen jälkeen) riittää. Kartalla (pallo
  koko maapallona) ei lähetetä.
- **Jäsenen pallo:** sama malli ja paletti kuin koristepalloilla (`MuutPallot` Ytimessä, piirto `ElavaKaupunki`). Paletti jäsentunnuksesta
  (0–5) → sama kaikilla laitteilla. Jokainen jäsenpallo kiinnitetään maailmaan `CesiumGlobeAnchor`illa viestin lat/lon/korkeuteen
  (kori = viestin piste, kuori sen yläpuolelle), joten Googlen laatat peittävät sen luonnollisesti syvyyden mukaan. Poltin ja ääni
  `ElavatAanet`ista: liekki ja ääni viestin `poltin`-bitistä, ääni 3D:nä vain < 600 m.
- **LOD:** < 1,5 km täysi malli + liekki; 1,5–4 km kevyt malli ilman liekkiä; > 4 km piiloon. Koristepallojen 300–800 m korkeussääntö ei
  koske jäseniä.
- **Lähellä kameraa:** jos jäsenpallo on alle 60 m omasta kamerasta, se häivytetään (ei leikkausta kameran läpi eikä kuoren täyttämää
  ruutua); alle 25 m piiloon. Ei törmäystä (pallot eivät estä toisiaan).
- **Koristepallojen väistö:** koristepalloja `max(0, 6 − näkyvät jäsenet)`, ja koristepallo ei synny alle 300 m:n päähän jäsenestä.
- **Nimilappu:** maailmaan kiinnitetty lappu jäsenpallon kuoren yläpuolelle, näkyy < 2 km ja häivytetään 1,5–2 km. Ehdotus pohjaksi:
  kartan kaupunkinimiön tyyli (`KaupunkiMerkit`in nimiö, TextMeshPro maailmassa, kartan fontti) tai kohdekartan kyltti
  `mk-kohdekartta__kyltti` ruutuun projisoituna; Natiivi-UI valitsee, puuttuva pohja → PT:n kautta omistajalle (UI-POHJAT).
  **Huom. Googlen ehdot:** kaupunkinäkymässä piilotetaan pelin karttaelementit (kartussi, nostot); jäsenen nimilappu on pelin oma
  päällyste kuten Pulu ja kompassi, mutta PT vahvistaa sen ennen toteutusta.
- **Testit (LS1):** Ydin-testit paletin valinnalle, LOD-rajoille, lähihäivytykselle ja koristepallojen väistölle; simulla kaksi palloa
  (Laitetestaajan kahden simulaattorin ajo) Pariisissa: näkyvyys, peitto rakennusten taakse, nimilapun häivytys.

## 5. Työmäärä ja vastuut

| Osa | Tekijä | Arvio |
|---|---|---|
| Worker: `PalloHuone`, reitti, tunnistus, rajat, testit (`tests/sahke-worker.test.mjs`-mallilla) | Pelikoodari | 1 pv |
| Natiivi: `PalloYhteys`, lähetystahti, interpolointipuskuri, asetus, Peli-testit | Pelikoodari | 1 pv |
| Piirto: oman sijainnin lähde (kamera → WGS84), jäsenpallot `MuutPallot`-pohjalla + GlobeAnchor, LOD, lähihäivytys, koristepallojen väistö, Ydin-testit | Linssiseppä | 1,5 pv |
| Nimilappu olemassa olevalla pohjalla | Natiivi-UI | 0,5 pv |
| Kahden simulaattorin testi (kaksi palloa samassa kaupungissa, kaupungin vaihto, katkos) | Laitetestaaja | 0,5 pv |
| **Yhteensä** | | **noin 4,5 työpäivää, juna 185** (184 on aarretehtävien) |

## 6. Riskit

- **WebSocket iOS-taustalla:** käyttöjärjestelmä katkaisee yhteyden. Ratkaisu on yhteys kiinni taustalla ja uusi yhteys palatessa.
- **Kustannus:** jos Durable Objects ei kuulu nykyiseen Cloudflare-tasoon, vaihtoehtona on HTTP-pollaus 1 Hz nykyiseen workeriin (`/pallot/paikka`, D1 ei käy, joten KV tai muisti). Pollaus on raskaampi, joten päätös tehdään ennen toteutusta (Julkaisija tarkistaa tason).
- **Kehysero:** jos pallon sijainti lasketaan kaupunkikohtaisesta origosta, lat/lon/alt-viesti on riippumaton laitteiden LOD-tasosta.

## 7. Pallokilpa (omistaja 13.1x, PT): retkikunnan kilpailu kipissä

> "Kipissä voisi olla retkikunnalle oma kilpailu missä pitäisi käydä keräämässä ilmapallot opaskierroksen kohteista. Ja se joka on nopein voittaa jne. Siinä voisi olla suunta ja etäisyys avustin käytössä. Saisiko kompassia hyödynnettyä tässä?"

### Säännöt
- Jokaisen opaskierroksen kohteen yllä leijuu ilmapallo (kohde-lista = kaupungin kierros, sama kuin metrokartassa). Pelaajat lentävät vapaasti ja keräävät pallot **missä järjestyksessä tahansa**. Kilpailu päättyy, kun kaikki on kerätty; kello käy aloitusmerkistä viimeiseen palloon.
- **Omat pallot (omistaja 13.2x):** jokaisella pelaajalla on omat ilmapallonsa, ja keräys tapahtuu paikallisesti. Toisen keräämä pallo ei vie omaa palloa; huoneeseen menevät vain ajat (ja kerättyjen määrä nipun piirtoon, alla).
- **Keräys:** oma pallo (kaupunkikameran silmä, luku 4) tulee 60 metrin säteelle ilmapallosta (3D-etäisyys; ilmapallo leijuu 50 m kohteen katon yläpuolella). Pallo irtoaa kohteesta ja lentää lyhyellä kaarella (noin 0,8 s) **korin reunaan pieneksi palloksi**; kohteessa sitä ei enää näy.
- **Nippu (omistaja 13.2x):** kaikki kerätyt pallot sidotaan samaan kohtaan korin reunassa omien narujensa päähän. Narut tehdään Linssiseppä 2:n vaijerin köysikoodilla (10 segmentin köysi, Verlet ja pituusraja; ISS-raketti 0821f6c07). Pallot heiluvat korin liikkeen ja tuulen mukana (sama tuuli kuin `MuutPallot`illa) ja tönivät kevyesti toisiaan (pallojen välinen erotus). Nippu jää koriin kilpailun jälkeen siihen asti, kun kaupungista lähdetään.
- **Nipun paikka ja koko (LS1):** pelaaja katsoo korista, joten nippu ei saa täyttää kuvaa (UI-peitto ≤ 45 % -linja): narujen kiinnityspiste
  korin TAKAKULMAAN (näkyy, kun katsoo sivulle tai alas, kippi A:n peilikuvaveto), narut 1,2–1,8 m, pallot pieniä (Ø 0,35 m), nippu
  enintään ~12 palloa tiiviinä rypäleenä. Piirto PalloKorin päällyskameralla korin tavoin (ei Googlen laattojen kanssa samassa syvyydessä).
  Keräyslento 0,8 s kaarella kohteesta kiinnityspisteeseen kutistuen. LS2:n köysi sellaisenaan (12 × 10 segmenttiä on kevyt).
- **Muiden nippu:** retkikuntalaisten pallot näkyvät toisille (luku 4), joten heidän nippunsa näkyy heidän korissaan (jäsenpallon kori, kauempaa vain < 400 m; LOD kuten luvussa 4). Sijaintiviestiin (luku 2) lisätään kerättyjen määrä `n` (kokonaisluku); nippu piirretään sen mukaan, keräys ei kulje verkon yli.
- **Kilpailun aikana:** kierroksen kerronta ja kohdekortit ovat pois, ja kohteeseen lentäminen listan tai metrokartan kautta on pois päältä (vapaa lento ainoa liike). Metrokartta näyttää kerätyt kuitattuina (✓) ja jäljellä olevat.
- **Keskeytys:** pelaaja voi lopettaa (ei tulosta); kierros jatkuu siitä, mihin se jäi ennen kilpailua.

### Aloitus: yhteislähtö retkikunnalle
- Kuka tahansa retkikunnan jäsen kaupungin pallonäkymässä voi kutsua kilpailuun. Muut samassa kaupunkihuoneessa (luku 2) näkevät kutsun ja vastaavat "Mukaan". Kutsuja aloittaa, kun haluaa (enintään 60 s odotus).
- Durable Object -huone antaa **yhteisen aloitusajan** (nyt + 5 s) ja lähettää lähtölaskennan; kaikki siirretään kierroksen aloituspisteeseen samalle korkeudelle ennen merkkiä (reilu lähtö).
- **Yksin pelaava** (ei retkikuntaa tai huoneessa vain itse): sama kilpailu paikallisesti ilman verkkoa, vastassa oma paras aika (haamu = oman parhaan reitin pallo, valinnainen).

### Kompassi: suunta ja etäisyys (olemassa olevat pohjat)
- Korin kompassi (`PalloKori.SeuraavaSuunta`, joka nyt osoittaa kierroksen seuraavaan kohteeseen) osoittaa kilpailun aikana **lähimpään keräämättömään** palloon. Lähin lasketaan 3D-etäisyytenä joka ruutu; vaihtuu, kun toinen tulee lähemmäs (hystereesi 10 %, ettei neula hypi).
- Etäisyys metreinä (alle 1 km: 10 m:n tarkkuus, muuten 0,1 km), kerätyt ja kello metrolinjan olemassa olevassa otsikkorivissä, esim. "5/12 · 340 m · 2.41" (Natiivi-UI; korin kompassi on 3D-esine, joten tekstiä ei sen viereen; LS1:n tarkennukset alla).

### Linssisepän tarkennukset (LS1 12.10.)
- **Kompassi:** `PalloKori.SeuraavaSuunta` on vaakasuuntima (°, 0 = pohjoinen); kilpailumoottori asettaa sen lähimmän keräämättömän
  pallon suuntaan (lähin 3D:nä, hystereesi 10 % moottorissa). Kilpailun ajaksi kierroksen oma asetus ohitetaan, ja paluu palauttaa sen.
  Kun pallo on alle 150 m:n päässä, neula osoittaa yhä vaakasuuntaa (pallo näkyy jo kuvassa).
- **Etäisyys-, kello- ja keräysteksti:** olemassa oleva **metrolinjan otsikkorivi** (kierroslistan "Kaupunkikierros"-rivi, `mk-aikajana-havainne__kuvateksti`)
  vaihtuu kilpailun ajaksi muotoon "5/12 · 340 m · 2.41". Ei uutta pohjaa kompassin viereen (korin kompassi on 3D-esine, ei UI:ta).
  Natiivi-UI toteuttaa; jos PT haluaa tekstin kompassiin, se on uusi pohja → omistaja.
- **Keräys ja korkeudet:** 60 m 3D-säde ja ilmapallo 50 m katon yllä sopivat vapaan lennon rajoihin (alin 40 m maasta, rakennusväli
  12 + 3 m, `OpasValys`): pallon luo pääsee aina ilman, että kamera menee katon läpi. Katon korkeus kohteen korkeusmallista
  (`OpasSovitin.OmaMaanpintaDtm` + kohteen korkeus_m, sama kuin pysähdyksen kehyksessä); korkeat kohteet (Eiffel 330 m) → pallo 380 m:ssä.
- **Ilmapallot:** samaa koristepallomallia pienempänä (kuori ~6 m), paletti kohteen järjestysnumerosta; poksahdus olemassa olevalla
  tehosteella (ElavatElementit) + ääni ElavatAanetista. Kiinnitys `CesiumGlobeAnchor`illa kuten jäsenpallot.
- **Metrokartta ja listalento:** kilpailun ajaksi `OpasSovitin.KilpailuKaynnissa` (kuten `EtsintaKaynnissa`): `VapaaKohteeseen` ja
  `KierrosKohteeseen` palauttavat false, NUI näyttää ✓ kerätyille (moottorin lista). Kierroksen kerronta, kuvakortit ja kohteen
  korostus pois samoin kuin etsinnässä (katso ja löydä v2 -mekanismi `OpasSovitin.Etsinta` uudelleen).
- **Yhteinen aloitus:** kaikki tumman siirtoruudun kautta kierroksen 1. kohteen yleiskuvaan 300 m:n korkeudelle samaan suuntaan
  (sama siirto kuin etsinnän aloituksessa); lähtölaskennan ajan ohjaus lukittu. Keskeytys → paluulento keskeytyskohtaan (olemassa oleva).
- **Arvio:** 1,5 pv (kuten taulukossa), riippuu siitä, että katso ja löydä v2 (184) on rungossa.

### Tulostaulu ja pisteet (talous)
- Tulokset samassa Durable Object -huoneessa: aika ja kerätyt per jäsen; huone pitää retkikunnan **parhaat ajat kaupungeittain** (SQLite-tallennus, muutama rivi; luku 2:n "ei historiaa" koskee sijainteja, ei tuloksia). Taulukko näytetään kilpailun lopussa olemassa olevalla kortti- tai listapohjalla (Natiivi-UI).
- **Palkinto** (talous 300, aarretehtävien × 0,4 -linja): kaikki pallot kerätty = **£20 kerran kaupunkia kohden** (≈ ⅓ matkaa), retkikunnan nopein **+£10**. Ennätyksistä ei rahaa (ei farmausta); oma paras aika ja retkikunnan ennätys merkitään matkakirjaan.
- Huijauksen esto kevyesti: asiakas ilmoittaa keräyksen aikaleimalla, huone tarkistaa, ettei peräkkäisten keräysten nopeus ylitä vapaan lennon enimmäisnopeutta.

### Yksityisyys
- Sama kuin luvuissa 2–3: vain oma retkikunta näkee pallot, nimimerkit ja ajat; sijainteja ei tallenneta; ajat ovat retkikunnan sisäisiä (ei julkista tulostaulua). Yksin pelaavan ajat pysyvät laitteella.

### Reaaliaikainen kisa (omistaja 15.5x, PT): noudot heti kaikille
- Kisa kulkee samassa Durable Object -huoneessa (luku 2; WebSocket, hibernation, Free-taso). Oma nouto lähetetään heti: `{tyyppi: "nouto", j, n, ts}`; huone lisää palvelinajan ja välittää sen muille. **Tavoiteviive alle 0,5 s**; asiakas kirjaa lokiin viiveen (vastaanotto − palvelinaika, kellojen ero korjattuna yhteyden alussa).
- Katkos: asiakas yhdistää uudelleen porrastetusti ja saa huoneelta tilannekuvan (pallomäärät); välissä kisa jatkuu paikallisesti, eikä mikään nouto katoa (asiakas lähettää kertyneet uudelleen, huone ei laske samaa palloa kahdesti: noudon tunnus = pallon järjestysnumero).
- **Kilpailijan nouto:** lyhyt äänimerkki, joka eroaa omasta noudosta (Äänittäjä: `kisa-nouto-muu`, oma `kisa-nouto-oma`), ja viesti "Punainen · Utelias Ilves nouti pallon (3)" olemassa olevalla sähkeliuska- tai ilmoituspohjalla (NUI).
- **Yläreunassa kaikkien pallomäärät** värimerkein olemassa olevalla yläpalkin pohjalla (NUI); puuttuva pohja → PT ennen omaa ratkaisua.

### Kaasu (omistaja 16.0x, PT): nopeus maksaa
- Tankki 0–1. **Kulutus kasvaa nopeuden neliönä**: täydellä vauhdilla tankki tyhjenee noin 90 sekunnissa, puolivauhdilla noin kuudessa minuutissa, ja paikallaan leijuminen ei kuluta. Tasapaino: täyttä vauhtia jaksaa 2–3 pallonväliä, risteilyvauhti (noin 60 %) riittää lähes palloilla itsellään.
- **Kaasu ei lopu koskaan kokonaan:** tyhjällä tankilla pallo liukuu noin 30 %:n huippunopeudella.
- **Pullot ovat henkilökohtaisia:** pelaajan tankin laskiessa alle 30 % hänen eteensä ilmestyy kevyesti hehkuva kaasupullo 100–200 metrin päähän (enintään yksi kerrallaan); pullo antaa +40 %. Muut eivät näe toistensa pulloja, joten niistä ei kilpailla.
- **Ilmapallon nouto antaa +15 %** (omistaja 16.0x): palkki nousee näkyvästi ja reunahehku on kulta. Pullot jäävät tarpeellisiksi pitkillä väleillä ja kovalla vauhdilla.
- Mittari vasemmassa reunassa (NUI, valmis: natiivi-ui/kaasumittari-184 361f54c65; `KaasuMittari.Lue`, vihreä → keltainen alle 0,5 → punainen alle 0,2, paletin värit). Polttimen suhahdus kiihdyttäessä ja pullon poiminta: Äänittäjä. Vain pallopelissä, ei kertojan kaupunkikierroksella.

### Reunahehku ja äänet (omistaja 16.0x, PT)
- Pehmeä reunahehku noin 300 ms (ei vilkkuva välähdys): **kaasu = vihreä** (sama kuin mittarissa), **oma ilmapallo = kulta**; värit paletista, toteutus NUI:n olemassa olevalla pohjalla. Äänet Äänittäjän erässä (`kisa-nouto-oma`, `kisa-nouto-muu`, `kisa-kaasu`, `kisa-poltin`).

### Pelaajan väri ja nimikyltti (omistaja 16.0x, PT; LS1:n kanssa sovittu)
- Väri = jäsenen paikka retkikunnan jäsenlistassa (liittymisjärjestys, sama kaikilla laitteilla; `Sahkepinta.JasenVari(jasenId)` → 0–7). Värisokeille erottuva Okabe–Ito-pohjainen sarja, puhutut nimet Pulun selostukseen:
  0 punainen D55E00 · 1 sininen 0072B2 · 2 keltainen F0E442 · 3 vihreä 009E73 · 4 oranssi E69F00 · 5 violetti CC79A7 · 6 valkoinen F2F2F2 (punainen kärki) · 7 musta 1A1A1A (kultainen vaakavyö). Kuvio on toinen tunniste värin rinnalla.
- Värillinen kuumailmapallo (8 versiota samasta mallista) ja nimikyltti 4 m kuoren yläpuolella: LS1 (kipin pallomalli) ja NUI (kyltin pohja). Nimikyltti erottaa pelaajat aina, myös värin lisäksi.

### Pulun selostus (omistaja 16.0x, PT)
- Tapahtumajono: vähintään noin 12 s väli, tärkeysjärjestys **johtoon nousu > viimeinen pallo > tiukka tilanne (ero yksi pallo) > nouto**; vanhentunut tapahtuma pudotetaan (ei jälkijunassa). Selostus soi kertojan säätimellä eikä päällekkäin muun puheen kanssa.
- Valmiit kokonaiset lauseet värin mukaan, esim. "Punainen menee johtoon!", ei palasista koottuja. Nimeämiskaava `pulu-kisa-<tapahtuma>-<vari>`; tapahtumat johto, viimeinen, tiukka, nouto, voitto × 8 väriä = 40 leikettä + yleiset (alku, maali). SK kirjoittaa käsikirjoituksen, omistaja hyväksyy äänisivun Tekstit-sivulla, Äänittäjä generoi (maksullinen generointi omistajan luvalla).

### Kulutus ja työmäärä
- Kilpailu lisää huoneeseen vain harvat tapahtumat (kutsu, valmis, lähtö, keräys, maali); sijainnit kulkevat jo 1 Hz:n linjalla. Free-tason ylitys: kilpailu jatkuu paikallisesti (yksinpeli), tulostaulu jää päivittämättä.

| Osa | Tekijä | Arvio |
|---|---|---|
| Worker: kilpailun tila huoneessa, yhteislähtö, reaaliaikaiset noudot (tunnus, ei kaksoislaskentaa), tulokset ja ennätykset, nopeustarkistus, testit | Pelikoodari | 1 pv |
| Kilpailumoottori puhtaana C#:na (säännöt, kello, keräys, lähin pallo + hystereesi, palkinto, yksinpeli, kaasu ja pullot, jäsenväri, selostusjono), Peli-testit | Pelikoodari | 2 pv |
| Ilmapallot kohteiden yllä, korin kompassin kilpailutila, metrokartan kuittaus, listalennon esto, aloituspiste | Linssiseppä | 1,5 pv |
| Keräyslento korin reunaan, nippu LS2:n köysikoodilla (narut, heilunta tuulessa, pallojen erotus), muiden nippu viestin `n`:stä | Linssiseppä (köysi: LS2) | +0,5–1 pv |
| Kutsu, lähtölaskenta, tulostaulu, kaasumittari (valmis), reunahehku, yläreunan pallomäärät, noutoviesti, nimikyltti olemassa olevilla pohjilla | Natiivi-UI | 1,5 pv |
| Värilliset pallot (8 versiota + kuviot), kaasupullot hehkuineen, nimikyltin kiinnitys | Linssiseppä | +1 pv |
| Kisan äänet ja Pulun selostus (SK käsikirjoitus, Äänittäjä generointi omistajan luvalla) | SK + Äänittäjä | 1 pv |
| Kahden simulaattorin kilpailutesti | Laitetestaaja | 0,5 pv |
| **Yhteensä (luvun 5 lisäksi)** | | **noin 8–9 pv (omistajan lisäykset 15.5x–16.0x); omistajan mukaan juna 184, osat rinnakkain** |
