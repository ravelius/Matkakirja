# Natiivisepän luovutus 28.9.2026 (t), klo 17.1x EEST

Luovuttaja: Natiiviseppä (Opus 5.5, max, Macin käyttäjä koodaus). Syy: konteksti 64 % ennen v3f4:n isoa vaihetta.
Edellinen: -s.md (sen kohdat ovat voimassa, ellei tässä toisin sanota).

## Lue ensin

1. CLAUDE.md ja Raamatun Ydinajatus kohta 2.
2. Tämä luovutus ja docs/raportit/aloituslento-v3-20260928.md (osiot v3f ja v3f3).
3. Muisti: natiiviseppa-tila-20260928-t, kuvaus-hiljaisena-hetkena, gpu-vaisto-kevyt-lippu, jaettu-kaannospalvelu-luokitin,
   natiiviseppa-oma-simulaattori (vain FBBD41D7), simulaattorivideo-igndts.

## Tänään tehty (sessio t)

- **v3f2, rajaus kellon alle** (natiiviseppa/aloitus-paivayo 1cb64a19):
  - Valintanäkymän keskus siirtyy pohjoiseen, jotta valittavien nimet jäävät Natiivi-UI:n Pelikellonaytto.YlaVarauksen
    alle (iPhone 17: 37,33° N). Puhdas Valintarajaus.cs + ValintarajausTestit.
  - Aloitusradan testit ajetaan todellisesta rajatusta alusta (9d1d3a50), ja Tanger on lisätty kohteisiin.
- **v3f3, päivä aiemmin** (8f38f4e0): lähtö klo 02.30 (Pelikello.OletusAlkuKelloUtc), ja kello on perillä 12,6 s:ssa.
  - Kuvattu hiljaisena hetkenä klo 16.51 kansioon aloituslento-33/v3f3b/.
  - Kuormassa (16.01) kuvattu ajo oli latteaa ja hylättiin; ks. muisti kuvaus-hiljaisena-hetkena.
- **v3g**: Päätoimittaja rajasi työn Eurooppaan ja Välimereen.
  - Laitelennot Moskovaan, Istanbuliin, Kairoon ja Tangeriin: 15,00 s ja 0 poikkeusta.
  - Kaukolennot (New York, Rio, Sydney) jäävät avoimiksi raporttiin.
- **Kerma-404** natiiviseppa/kerma-404 **306134ee** (masterin päällä):
  - Offline-latauksen 404 saa nollatavuisen merkin, ja merkitty laatta annetaan läpinäkyvänä ilman verkkoa.
  - Siirtoseppä ajaa E2E-offline-todennuksen, kun skeema 1.56 (#3531) on tuotannossa. PASS → junaan.
- **BUILD 37 = proto master bc8e6317**:
  - Juna b09a400a, käännös 8728d5ba, Laitetestaaja PASS f26319a98.
  - Sisältö: Linssisepän lipputanko ja ISS-kyyti 1e773968 (valot 60 %, päiväpilvet, yökuori), Natiivi-UI:n pulu-ekapala
    9d944120 ja pelikello-varaus 148e4304.
  - Muutosrivi: "Avaruuskyydissä nyt pilvet, kaupunkien valot, revontulet ja oikeat tähdet. Pulu vastaa nopeammin."
  - Julkaisija vie TF 1.0.37:n Päätoimittajan VIE-päätöksellä.
- **1.0.38-juna juna/b13 3304706d**:
  - Sisältö: master bc8e6317 + Maapallon vuosi (linssiseppa2/maapallon-vuosi abc65317 + natiivi-ui/maapallon-vuosi
    2d5222f5; vain kehittäjätilassa, omistajan OK 16.4x).
  - Vahti kääntää junan, sitten Laitetestaajan savuke. Sen jälkeen BUILD 38 masteriin (Matkakirja-proto: merge --no-ff
    juna/b13), ja SHA sekä muutosrivi Julkaisijalle ja Päätoimittajalle.

## KÄRKI: v3f4 (omistajan palaute v3f3-videoon, kortti Päätoimittajan kautta 17.0x, SANATARKASTI)

"Se hetki, kun kartta muuttuu yöstä päivään, näyttää oudolta. Lento pitäisi siis alkaa vielä paljon aiemmin, että kartta on
ehtinyt hyvissä ajoin vaihtua yöstä päivään. Ja lisäksi en tykkää siitä, että koneen vauhti hidastuu, kun lennetään sen
lähelle. Voisiko se pysyä ainakin vähän enemmän nopeana? Jaa. Koneen yskähdys ylöspäin lähikuvassa voisi ennemmin vaihtaa
johonkin makeampaan kaartoon jompaan kumpaan suuntaan. Ja ehkä voisi itse asiassa tehdä niin, että kamera ei jääkään
paikalleen seuraamaan konetta, vaan kamera tuleekin kohti ja lähtee saman tein kuin bumerangi takaviistoon takaisinpäin.
Liike voi olla vähän hidastettu, siis se kameran liike, mutta kamera ei jäisikään seuraamaan samaa matkaa konetta, vaan se
ikään kuin tapaa lentokoneen sen oman elliptisen kiertoradan kärjessä. Saatko kiinni?"

Päätoimittajan tulkinta, jonka omistaja on vahvistanut:
1. Yö vaihtuu päiväksi heti lennon alussa korkealla, ja lähestyminen ja ohitus ovat kokonaan päivässä.
2. Kone ei hidastu kameran lähellä.
3. Ylöspäin nykäisy vaihtuu tyylikkääseen kallistettuun kaartoon sivulle.
4. Kamera ei seuraa konetta. Se syöksyy kohti, kohtaa koneen oman elliptisen ratansa kärjessä ja kaartaa heti takaviistoon
   pois; kameran liike saa olla hieman hidastettu.

Päätoimittajalle toimitetaan v3f4-video ja reittikuva. Kuvaus tehdään hiljaisena hetkenä.

### Analyysi ja suunnitelma (sessio t)

1. **Päivä heti alussa.** Kello(t) (AloituslennonRata.Kello) tehdään etupainotteiseksi, esim.
   0,7 · S((t − 0,4) / 3,1) + 0,3 · S(t / 12,6), lähtö 02.30.
   - Kello on ~06.8 UTC jo 3 s:ssa, kun kamera on noin 2 000 km:ssä. Valonraja pyyhkäisee Euroopan yli noin 0,4–3,5 s.
   - Pyyhkäisyn pitää olla rauhallinen: mieluummin ~3 s kuin 1 s, jotta "outoa hetkeä" ei tule.
   - Testi PaivaTuleeEnnenOhitusta: katsepisteen raja noin 3,5 s ja ohitus vähintään 15°. Moskova yössä valinnassa (−8,3°)
     pysyy ennallaan.
   - v3f3:n "outo hetki" oli aamunkoitto lähestymisessä ~4,5–5,2 s keskikorkeudella (usvainen häivytys).
2. **Kone ei hidastu.** Rata: Nopeus(t), Wo-paino ja OhitusNopeus = 5 000 m/s nostetaan noin 15–20 km/s:iin.
   - Nopeus1 ja Nopeus2 ratkaistaan kuten ennen: ohitus osuu ohituskohtaan ja pysähdys perille.
   - KoneenOsuus on nyt 0,92 kohdassa 6 s ja pysyy siinä ~9 s:iin asti: ruudulla kone "leijuu".
3. **"Yskähdys ylöspäin" on maastolisä lähikuvassa.** Vanat nousevat kyttyräksi 7,2–8,8 s (kuvat v3f3b: kone nousee
   Othrysin harjanteen yli).
   - Lähde: LennonV3Kaytava.Lisakorkeus (±8 km ikkuna), AloituslennonRata.LisanPaino(t) ja Nappula.LentoV3 rivit ~460–480
     (lisa, h = rata.KoneenKorkeus + lisaRata).
   - Korjaus: maastolisä pysyy vakiona ohitusikkunassa (ikkunan maksimi), ja tilalle tulee kallistettu kaarto. Kone kallistuu
     kamerasta poispäin 30–40°, kääntyy ~15–20° ja palaa reitille noin 1,5 s:ssa.
   - Kaarto vaatii sivusiirron koneen paikkaan SEKÄ radassa (kp/Kohta: kamera ratkaistaan sen mukaan) ETTÄ Nappulassa
     (LennonV3.ReitinKohta ja V3AsetaKone-kallistus; radalla annetaan nyt kall = 0).
   - Suositus: rata.KoneenPaikka(t) palauttaa (lat, lon, suunta, kallistus), ja Nappula käyttää sitä.
4. **Bumerangi.**
   - Nyt: Liuku 6,3–8,1 s ja pakitus 7,2–10,4 s; kamera kulkee koneen mukana (5 km/s, sivumatka enintään 110 km,
     SivuEnintaanM).
   - Uusi: lähestyminen kärkeen (lähin kohta ~19 km koneen oikealla), sitten heti takaviistoon ylös. Kameran vauhti hidastuu,
     kone jatkaa nopeana.
   - Toteutusehdotus: kärjen jälkeen EKSPLISIITTINEN silmän rata (Hermite tai Bezier paikallisessa ENU:ssa kärjestä): taakse
     B ~15 km, oikealle ~25 km ja ylös ~40 km 1,8 s:ssa, sitten nousu loppunäkymään Kanta(Loppu).Silma.
   - Katse pidetään koneessa: kone ruudun kohtaan x, y (Ratkaise kiinteillä d, k ja b; tai d, k ja b silmästä ja koneesta
     ja pieni Newton-korjaus).
   - Jatkuvuus kärjessä: silmän paikka ja nopeus otetaan lähestymisen näytteistä (Kanta(Asento).Silma).
   - **SÄÄNTÖRISTIRIITA:** "ei takaa" (testi: korotus vähintään 60° tai α enintään 100°) ei voi päteä, kun kamera ei seuraa ja
     kone on nopea. α = 90° + atan(F / L), missä F on koneen etumatka ja L sivumatka, joten α ylittää 100° jo ~0,2 s kärjen
     jälkeen. Takaviisto näkyy siis hetken, mikä on omistajan oma pyyntö ("takaviistoon").
     Lievennä testi bumerangin ajaksi (esim. α enintään 150°, kun korotus on vähintään 25°), ja kerro siitä Päätoimittajalle
     yhdellä rivillä.
   - Muut testit pysyvät: kone kuvassa, koko, nykäykset, zoom enintään 4,5 e/s, kääntö enintään 60/90 °/s, silmä kohteen yllä
     ja saapuminen ylhäältä.
5. **Toimitus Päätoimittajalle:**
   - Video (aloituslento-kooste.sh).
   - Reittikuva sessio-s/reittikuva.py: silmän ja koneen reitit ylhäältä, v3f3 vs v3f4; ALOITUSRATA_TAULU-ympäristömuuttuja
     tulostaa aikajanan testistä.
   - Kuvaparit (kuvapari.py).
   - Kuvaus HILJAISENA hetkenä.

## Kuvauksen käytännöt

- Julkaisija jakaa laitevuorot, ja kuvaukseen pyydetään "hiljainen vuoro". Tarkista ensin
  `cat /tmp/matkakirja-kaannospalvelu.lukko/kuka` ja käynnissä olevat simulaattorit.
- Napautuskohdat rajatussa valinnassa (iPhone 17 FBBD41D7):
  - Uusi matka (201, 690), odota 20 s, sitten Valitse aloituskaupunki (201, 605).
  - Odota valinnassa 25 s taustakomennossa (etualan sleep yli ~20 s estyy).
  - Kaupungit: Ateena (273, 424), Moskova (347, 188), Istanbul (322, 379), Kairo (365, 521). Tanger vasta pyyhkäisyn jälkeen.
- Skriptit ovat kansiossa proto-3d/lokit/natiiviseppa-skriptit/sessio-s/:
  - aloituslento-valmistele.sh ja aloituslento-nauhoita.sh.
  - kehyserot.py: F on piikki lähimpänä lokin arvoa. Tarkista kehyksistä: lennon alku on hetki, jolloin nappula katoaa ja
    rengas muuttuu punaiseksi.
  - aloituslento-kooste.sh, kuvapari.py, kaista.py ja v3f-valinta-kuvat.sh.
  - v3f2-talteen.sh kopioi .app:n talteen heti KÄÄNNETTY-rivistä; käyttö: `v3f2-talteen.sh <out> aloituslento-33/<kansio>`.
- Käännös ilman asennusta: `nohup nice -n 15 proto-kaanna.sh natiiviseppa/aloitus-paivayo > <out> &`.
  proto-kaanna.sh lukee haaran vasta saadessaan lukon, joten jonossa olevaan käännökseen ehtii vielä lisätä commitin.

## Avoimet

- **v3f junaan** vasta omistajan OK:n jälkeen v3f4:lle: `juna-merge.sh natiiviseppa/aloitus-paivayo` (haarassa ovat v3f,
  rajaus, v3f3 ja testit).
- **Kerma-404:** Siirtosepän PASS → `juna-merge.sh natiiviseppa/kerma-404`.
- **1.0.38-juna:** ks. yllä. Muutosrivi pelaajan kielellä: "Kehittäjille: Maapallon vuosi -linssi".
- **Tanger** jää valintanäkymässä ruudun ulkopuolelle (x −35 pt). Kaukolennot rikkovat sääntöjä. Molemmat odottavat
  omistajaa (VAIN EUROOPPA).
- **Tupla-junakäännös 16.00:** juna-ajo.sh ajettiin käsin, ja vahti käänsi saman sisällön 20 min ylärajalla uudelleen. Älä aja
  juna-ajo.sh:ta käsin, kun vahti niputtaa. Toisen käännöksen pysäyttäminen vaatii omistajan luvan.
- **Kuormaraja:** asennus odottaa, kunnes muita simulaattoreita ei ole käynnissä (enintään 20 min). Tarkistus tehdään ennen
  käynnistystä, joten kilpatilanne on mahdollinen.

## Worktreet (proto)

- wt/proto-natiiviseppa-paivayo = natiiviseppa/aloitus-paivayo 8f38f4e0 (v3f4-työ jatkuu tässä).
- wt/proto-natiiviseppa-kerma404 = natiiviseppa/kerma-404 306134ee (poista mergen jälkeen).
- wt/proto-natiiviseppa-juna, -offline-media ja -symbolit on mergetty, ja ne voi poistaa.
