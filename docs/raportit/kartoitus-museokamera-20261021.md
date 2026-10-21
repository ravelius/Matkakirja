# Museoiden lentävä kamera ja yhteinen liikesääntö: kartoitus ja tavoitekuvauksen luonnos

Linssiseppä 21.10.2026 (PT 17.3x, rivi "Museoiden lentävä kamera ja yhteinen liikesääntö"). Osa A on KK:lle omistajan kanssa
käytäväksi (selkokieli). Osa B on tekninen kartoitus rooleille. Toteutus vasta, kun omistaja on hyväksynyt tavoitteen.

## A. TAVOITEKUVAUKSEN LUONNOS (omistajalle)

**Tavoiteltu kokemus.** Kaikissa museoissa (Louvre, Orsay, Rodin, Rijksmuseum ja tulevat) kamera liikkuu samalla tavalla, kuin
rauhallinen opas kuljettaisi katsojaa:

1. **Teoksesta toiseen lennetään aina.** Kamera lähtee levosta, kiihtyy pehmeästi, kulkee oviaukoista katse menosuuntaan ja
   pysähtyy pehmeästi seuraavan teoksen eteen. Ei mustaa ruutua, ei hyppyä, ei äkillistä käännöstä.
2. **Sama tuntuma joka museossa.** Yhtä pitkä matka kestää yhtä kauan ja tuntuu samalta Louvressa ja Rijksmuseumissa.
   Lyhyt siirto vieressä olevaan tauluun on lyhyt liuku, pitkä salista toiseen on nopeampi lento.
3. **Pelaajan oma liike tuntuu samalta.** Kun pelaaja napauttaa lattiaa, peruuttaa tai kävelee itse, kamera noudattaa samoja
   pehmeyden rajoja kuin automaattinen kierros.
4. **Kamera ei koskaan osu ihmisiin, patsaisiin eikä seiniin**, eikä katso pitkään tyhjää seinää.

**Mitä tämä muuttaa pelaajalle.** Nykyään kierroksen lento on jo tällainen, mutta pelaajan omat liikkeet (napautus, peruutus,
vapaa kävely, suurennus) käyttävät vielä kukin omaa tapaansa: osa on nopeampia ja nykäisevämpiä kuin lento. Tavoitteen jälkeen
kaikki liikkeet tuntuvat samalta.

**Suositus (yksi).** Kaikki museon kameraliikkeet yhden yhteisen ohjaimen kautta yhdellä rajasarjalla, jonka pohja on nykyinen
lentävä kamera (omistajan "nopeampi" 21.10. mukaan). Vanhat siirtotavat (kävely ja musta siirto) jäävät pois käytöstä.

**Kysymys omistajalle.** Saako napautuksella kävelyn ja peruutuksen hidastaa lennon pehmeyteen, vaikka ne nyt ovat nopeampia?

## B. KARTOITUS (rooleille)

### B1. Nykytila
- Yksi museomoottori kaikille maille (MuseoKierros, puhdas C#); Orsay ja Rodin ovat huoneita Ranskan salissa, eikä kamerakoodi
  haaraudu museon mukaan. Ero museoiden välillä on vain dataa (sali.json, kierros.json, kohdat, kohtazoom, lähestyminen).
- **Yhteinen ohjain on jo olemassa** (Ydin/Kamera/Kamerajohtaja: KameraAsento, Kisko, Orbit, Kaanto, Zoom, Paikallaan, Leikkaus,
  Lentokaari; jatkuvuus rakenteesta, esilatauksen odotus). Sitä käyttävät museossa vain **lento, napautuskävely (Osoitus),
  ovensuu ja taakse**.
- **Ohjaimen ohi** laskevat asentonsa itse: kävely V1 ja V2, nopea kävely (MuseoKavely), musta siirto, tauon kääntö,
  AutoZoomin liuku ja vapaa kävely (ohjainsauva suoraan, ei kiihtyvyysrajaa).
- Oletuksena teoksesta toiseen: Lento (Lento = true) → muuten Musta → muuten kävely V2.

### B2. Rajat ja käyrät eroavat järjestelmittäin
- Nopeus: kävely 1,1 / 1,3 / 0,9 m/s, nopea kävely 1,8, vapaa 1,4, AutoZoom-liuku 4, napautus ~8, lento 9.
- Kiihtyvyys: Kameratarkastus oletus 3,0 (Liuku 40), Lentokaari 2,5 / 3,4 / 2,4 / 2,2 + nykäys 3,0, Kisko-mutka 0,8, V1-mutka 1,0.
- Kääntö: Kaanto 60 °/s, lento 45–50, napautus 150, vapaa 70, tarkastus 90 (Liuku 180).
- Käyrät: bezier-Pehmea, sini-rampit (Liikepohja.Tasainen), smootherstep neljänä kopiona, MuseoLiukun trapetsi, Lentokaaren
  nopeussuunnitelma. Mutkien hidastus kolmesti (Kisko, Lentokaari, V1) eri parametrein.
- Testit asettavat omat rajansa (Lento {9; 3,6–4,0; 60; 300}, Musta {3; 4; 60; 300}); Orsay ja Rodin eivät ole kameratesteissä
  nimeltä.

### B3. Cinemachine ja Splines
- **Cinemachine** (paketti 6.7.0, koodi Unity.Cinemachine 3.x): vain linnan dioraama (DioraamaCinemachine: OrbitalFollow,
  HardLookAt, kohina, oma blendikäyrä) ja Seikkailu (pelaaja ja vene). Ei museossa, pallossa, ISS:ssä eikä oppaassa.
- **Splines** (2.9.1): vain Cesiumin leikkausmonikulmio (CesiumOmatMallit), ei kameraa. Kameran kisko on oma
  keskeis-Catmull–Rom (Kisko.Kaari), jota Lentokaari käyttää.
- **Arvio:** museon tarpeisiin (törmäyksetön reitti ovien kautta, nopeussuunnitelma, rajojen todennus puhtaalla C#:lla ja testeissä)
  oma Kamerajohtaja + Lentokaari sopii paremmin kuin Cinemachine; Cinemachine ei tunne salin esteitä eikä sen liikettä voi ajaa
  Linssit-testeissä ilman Unityä. Splines ei tuo lisää nykyiseen kiskoon nähden.

### B4. Valvonta, joka jo on
tarkista.sh: kameravahti (suorat kamerakirjoitukset, 12 tiedoston pohja), liikevahti (omat Lerp/SmoothStep-käyrät, 222 tiedostoa),
kameratesti (jokainen kameraliikkeen rakentaja testissä), nykäysvahti (yli 20 ms ruudut liikkeessä); Kameratarkastus ruuduittain.

### B5. Ehdotettu toteutus (hyväksynnän jälkeen, eriin)
1. Museon yhteinen rajasarja (KameraRajat.Museo: lennon arvot) ja yksi testi, joka ajaa kaikki museon siirtotavat sillä
   (Louvre, Orsay, Rodin, Amsterdam).
2. Napautus, taakse ja ovensuu Kiskosta Lentokaareen (sama nopeussuunnitelma ja katse oviaukkoon).
3. Tauon kääntö ja AutoZoomin liuku Kamerajohtajan Kaanto/Zoom-siirroiksi; vapaa kävely jousella (Liikepohja.Jousi) rajoihin.
4. Kävely V1/V2 ja musta siirto vain QA:han; kuolleet polut pois, kun omistaja on nähnyt tuloksen.
5. Käyrien kopiot yhteen (Liikepohja), mutkien hidastus yhteen (Lentokaaren suunnitelma).
