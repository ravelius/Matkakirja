# Aloituslento v3c (Natiiviseppä 28.9.2026, v3 klo 07.3x, v3c klo 08.0x)

Omistajan palaute v2-videoon (27.9. klo 23.5x, Fablen kautta): "kone pitää näkyä paljon pienempänä kun se kuvataan
kaukaa. laskeutuessa kamera pitää olla sen verran kauempana että töksö laskeutuminen ei näy kun kone näkyy ihan pienenä."
Fablen lisäykset: ohituksen ja saapumisen usva, saapumisen verkosta latautuvat laatat.

## Tulos

- Haara proto `natiiviseppa/aloitusrata` **d2fe17dc** (cbb4811f:n päällä, ei junassa). Käännös **4530895b** = master 17c2928b +
  aloitusrata, oma simulaattori FBBD41D7, oikea valintapolku (Uusi matka → Valitse aloituskaupunki → Ateenan napautus).
  0 poikkeusta. Kartta-testit 345/345, unity-tarkistus 0.
- Video: `proto-3d/lokit/aloituslento-33/v3/aloituslento-v3-tekstit.mp4` (736 × 1600, 17,8 s, versiokaista, alkutekstit
  väliaikaisena päällysteenä kuten v2:ssa). Raakavideo `v3/aloituslento.mp4`, loki `v3/konsoli-lento.txt`.
- Kuvaparit v2 | v3 samoista lennon hetkistä: `v3/kuvaparit/pari-avaus-3.0s.png`, `pari-ohitus-7.5s.png`,
  `pari-kosketus-13.2s.png` (versio, hetki ja mitta kuvassa).

## Muutokset (AloituslennonRata.cs, Aurinko.cs, Nappula.Aloitusrata.cs, Nappula.LentoV3.cs)

| | v2 | v3 |
|---|---|---|
| Koneen koko | siipiväli 5 % etäisyydestä → aina ≥ 11,6 % leveydestä | maailmassa vakio 5 km, ruudulla vähintään 2,5 % (4-normi); kasvaa vasta alle ~470 km:ssä |
| Ohitus | 23 km, kone 52 %, kallistus 83° | 25,6 km, kone 46 %, kallistus 76° |
| Saapuminen | 150 km, kosketus 135 km:stä, kone 14 % | etuviistosta 200 km:stä, kamera nousee: kosketus 490 km:stä, kone 2,9 % |
| Horisonttiusva | webin raja 0,6 × etäisyys (ohituksessa 14 km koneen takana) | raja vähintään 250 km radan ajan (Aurinko.UsvaVahintaanM, nollaus perillä ja purussa) |
| Ennakkokamera | yksi: ohitus, ohituksen jälkeen saapuminen | kaksi: ohitus ja kosketus odotuksesta asti |

Mallin mittaus (Kartta-testit, 7 kohdetta): maa näkyy usvan läpi ohituksessa 72 % ruudusta (loput taivasta), v2:n
usvasäännöllä 56 %. Uudet testit KaukaaPieniJaLaskuKaukaa ja UsvaEiHukutaMaata.

## Havainnot laiteajosta (v3b:n aiheet)

1. **Ohitus osuu merelle.** Ohitus on reitin puolivälissä; Lontoo → Ateena se on 45,4° N 13,2° E eli Adrianmeri. Lähikuvassa
   maa on vaaleaa, piirteetöntä merta, joka näyttää usvalta (sama v2:ssa). Horisontissa Alpit näkyvät nyt terävinä.
   Ehdotus: ohituskohta maan päälle (esim. osuus 0,45 → 46,0° N 12,0° E, Dolomiittien juurella).
2. **Saapumisen maa on suttuinen.** Cesiumin lokissa lennon ajan 1 000–1 400 laattaa odottaa latausta (Loading-Worker), vaikka
   laatat tulevat enimmäkseen laitteen välimuistista (lennon aikana 2 056 välimuistista, 363 verkosta; v2 2 542 verkosta).
   Pullonkaula on Cesiumin latausjono: lähellä kulkevan pääkameran laatat ohittavat jonossa kaukaisen kosketusnäkymän
   (ennakkokamera ei riittänyt). Nousussa (14–15 s) Kreikka tarkentuu terävänä. Ehdotus: kevyempi laattakysyntä kiressä ja
   ylilennossa (LiikeLaattojen SSE 32 vain näissä vaiheissa, ohitus ja saapuminen täydellä tarkkuudella).
3. Simulaattorin h264-nauhoitteessa PTS ja DTS eroavat lopussa ~3 s; ffmpeg päättelee osan kehysten ajan DTS:stä, jolloin
   saapumiskortti välähti kesken lennon. Kooste luetaan `-fflags +igndts` (skripti sessio-p/aloituslento-kooste.sh).

Merge 1.0.35-junaan vasta omistajan OK:n jälkeen.

## v3c: havaintojen korjaus (klo 08.0x, suositeltu versio)

- Haara **98e3f4a3** (d2fe17dc → 421ad7f3 → 98e3f4a3), käännös **409b432b** FBBD41D7, 0 poikkeusta. Kartta-testit 347/347,
  unity-tarkistus 0.
- Video: `proto-3d/lokit/aloituslento-33/v3c/aloituslento-v3c-tekstit.mp4`; kuvaparit v2 | v3c `v3c/kuvaparit/`
  (avaus 3,0 s, ohitus 7,5 s, saapuminen 12,3 s, kosketus 13,2 s).
- **Ohitus maan päällä**: kohdekohtainen ohituskohta (AloituslennonRata.OhitusMaalla, laskettu natiivin maapolygoneista,
  skripti `v3b/ohitus_maalla.py`): Ateena 0,47 (Veneto; oli Adrianmeri), Moskova 0,60, Kairo 0,55, Tanger 0,535,
  New York 0,685, San Francisco 0,485, Buenos Aires 0,645, Perth 0,535; muut 0,5. Tasanko on lähikuvassa yhä vaalea ja
  piirteetön, mutta se on nyt maata, ja Alpit näkyvät taustalla.
- **Kevyempi laattakysyntä**: kiri ja ylilento SSE 40:llä (LiikeLaatat.LentoKarkeaSse). Ylilennon latauspiikki 1 445 → 521.
- **Saapumisen esilataus**: ennakkokamera [1] saapumisen lähimpään kohtaan (~200 km) jo odotuksesta ja lennon käytävään
  kohteen ympäristö Z7–Z9 ±2. Tulos: saapumisessa (12,3 s) ja kosketuksessa (13,2 s) Egeanmeren saaret ja Attika ovat
  terävinä (v3 ja v3b suttuisia 14 s:iin asti). Ensimmäinen saapumishetki (11,3 s) on vielä osin pehmeä.

## v3d: omistajan palaute v3-kuviin (klo 09.1x, suositeltu versio)

Sanatarkasti Fablen kautta: "Ota Ateenassa tuo 3d pois lennosta. Näyttää oudolta", "kamera pitää olla selvästi kauempana ja
kone pienemmäksi kun laskeutuminen", "loppu laskeutuminen kannattaa kuvata ylhäältä, nyt näyttää kun joku pommi iskisi".
- Haara **1636c93a**, käännös **d939384f**, 0 poikkeusta, Kartta-testit 347/347.
- Kohteen maamerkkimalli ei näy aloituslennolla (rengas ja nimi jäävät). Saapuminen 350 km:stä etuviistosta (kallistus 55°),
  kamera nousee ja kääntyy alas: kosketus ~915 km:stä, kallistus 15° (kamera 75° koneen yllä), kone 1,7 % leveydestä
  (vähimmäiskoko 2,5 % → 1,5 % laskussa).
- Video `v3d/aloituslento-v3d-tekstit.mp4`, kuvaparit v3c | v3d `v3d/kuvaparit/`.

## v3e: omistajan palaute v3d-videoon (klo 09.17–09.38), kuvattu klo 11.03

- Haara **f7333a8f**, käännös **abcc1911** (aloitusrata + varalaatta-uusinta-2 + symbolit-erikoismalli + aloituslento-marssi),
  FBBD41D7, 0 poikkeusta. Kartta-testit 350/350.
- Video `v3e/aloituslento-v3e.mp4` (736 × 1600, 17,8 s, marssi A lennon alusta, versionauha, ei kuvatekstejä). Lennon alku
  videossa F = 14,745 s kehyseroista (loki 14,75).
- Kuvaparit v3d | v3e `v3e/kuvaparit/` (3,0 / 7,2 / 9,0 / 12,0 / 13,8 / 14,3 s) ja korkeuskäyrä `v3e/korkeuskayra-v3d-v3e.png`.
- Toteutui: lähestyminen yhtenä S-käyränä, lähin kohta 20,1 km (kone 58 % leveydestä), pakitus 8,1 → 9,4 km, korkeuden
  S-käyrä pysähtymättä. Vanat näkyvät ohituksessa koneen takana eivätkä piirry sen päälle. Linnut näkyvät pieninä
  (~3 % leveydestä) vinottain 12,6–14,4 s.
- Havainnot: 1) silmän maareitti oli koukku: ~270 km Ateenan eteläpuolella 13 s:ssa ja takaisin sen ylle, joten kosketus
  nähtiin viistosti (kallistus ~10–16°); 2) nousussa 10,8–12,3 s näkyi terävä laattaraja (tarkka lähimaasto ja karkea
  SSE 40 -vaihe).
- Jatkotestit samalla käännöksellä: varalaatat PASS (97 + 159 + 45 korvattu oikealla, 0 jäljellä, uusintakierros 1).
  Kinderdijk jäi testaamatta, koska valmisteluskriptin `timeout 240` katkaisi konsolin ja sovellus kaatui. Korjattu
  (1800 s).

## v3e2: silmän reitti ilman koukkua ja nousu ilman laattarajaa (klo 11.3x, kääntämättä)

- Haara **57bca5bb** (f7333a8f:n päällä):
  - Silmän vaakaetäisyys koneesta on erkanemisessa pehmeästi enintään 110 km, ja raja kapenee 15 km:iin välillä
    12,3–13,6 s (AloituslennonRata.SivuEnintaanM).
  - Suunta kääntyy nousun loppuosalla (A ≥ 0,30).
  - Nousu ladataan täydellä laattatarkkuudella (karkea vaihe vain lähestymisessä).
  - Saapuminen alkaa 12,6 s.
  - Kartta-testit 351/351, uusi testi SilmaKaartaaKohteenYlleIlmanKoukkua. unity-tarkistus 0.
- Mallin mitat (Ateena):
  - Kallistus 61,8° (11,5 s) → 46,5° → 27,0° → 8,4° (13,0 s) → 3,0° (13,5 s). Kosketus nähdään ~2°:n kallistuksella.
  - Koneen loittoneminen on 0,43–0,52 e/s pakituksesta 11,5 s:iin, sitten 0,77 → 1,41 → 0,23 e/s ilman notkahdusta.
  - Silmä on enintään ~60 km kohteen sivussa (v3e 270 km).
  - Suunta kääntyy 40° → 0° välillä 12–14 s.
  - Vierintä on enintään 0,69 e/s (v3e 0,63).
- Reittikuva `v3e2/reitti-v3e-v3e2.png`, taulut `v3e2/v3e2-taulu.txt` (kohteet) ja `v3e2/v3e2-taulu-01.txt` (Ateena 0,1 s).
- Muoto: silmä kaartaa loivasti koneen oikealta puolelta kohteen ylle. Reitin suhteen liike on S: silmä siirtyy reitin
  oikealta puolelta vasemmalle saapumisnäkymään. Tasossa täysi S vaatisi, että silmä ylittää reitin koneen takaa matalalla
  (kone näkyisi takaa) tai kiertää koneen edestä (vahva kiertoliike). Siksi suosittelen tätä muotoa.
- Kuvattu klo 13.25: käännös **02bf1c9f** (aloitusrata 57bca5bb + varalaatta-uusinta-2 + symbolit-erikoismalli +
  aloituslento-marssi), FBBD41D7, 0 poikkeusta. Lennon alku videossa F = 12,883 s kehyseroista.
- Video `v3e2/aloituslento-v3e2.mp4` (736 × 1600, 17,8 s, marssi A) ja kuvaparit v3e | v3e2 `v3e2/kuvaparit/`
  (9,0 / 11,5 / 12,5 / 13,0 / 13,8 / 14,3 s).
- Laitteella: nousussa ei näy enää laattarajaa. Kallistus on 12,5 s:ssa 27° (v3e 48°) ja 13 s:ssa 8° (v3e 35°), ja
  kosketus nähdään suoraan ylhäältä.
- Jatkotestit samalla käännöksellä (konsoli kiinni koko ajan):
  - Varalaatat PASS: varavika 0,5 → 321 varalaattaa, 293 paikattu 20 s:ssa, tausta ja paluu +45, 0 jäljellä.
  - Kinderdijk PASS: jalka ja laatikko, peli30 / peli55 / lähi45.
  - Molemmat mergetty junaan (juna/b13 0cd85ecc) samaan TF:ään Pulun puhekeskustelun ja xAI-napin kanssa.

## v3f: päivän ja yön raja, pelikello ja esikääntö; valintanäkymä kellon alle (klo 14.3x–15.0x)

- Sisältö haarassa natiiviseppa/aloitus-paivayo: c904d2c2 (Paivanvalo.cs, lennon pelikello, esikääntö) ja 2965ba2b (yövalot
  2,0). Laiteajo ce9c9b70 klo 14.30 (`v3f/`): valinnassa yö ja kello "01.00 / PÄIVÄ 1/80", lennossa aamunkoitto Thessaliaan
  7,2–9 s, perillä päivä ilman hyppyä. Löydökset: kaupunkien valot himmeinä pisteinä (korjattu 2965ba2b) ja kello Moskovan
  renkaan ja nimen päällä.
- **Rajaus kellon alle, 1cb64a19** (merge natiivi-ui/pelikello-varaus 148e4304 + Valintarajaus):
  - Valintanäkymän keskus siirtyy pohjoiseen juuri niin paljon, että näkyvien valittavien nimet (52 pt pisteen yllä) jäävät
    Pelikellonaytto.YlaVarauksen alle. Zoomi pysyy webin mukaisena; matala vaakaruutu loitontaa tarvittaessa.
  - Pallomalli vastaa v3f-laitekuvaa ±12 pt. iPhone 17: keskus 30° → 37,1° N ja Moskova 116 → 185 pt (nimi alkaa 133 pt:stä),
    Ateena 327 → 422 pt. Vaakapuhelin: 44,8° N. iPad pysty ja vaaka: ennallaan.
  - Esikääntö palaa rajattuun näkymään. Konsoliin rivi "aloitus: valintanäkymä … (kellon varaus … px)".
  - Kartta-testit 362/362 (ValintarajausTestit 6), unity-tarkistus 0.
- **Käännös v3f2 = 7c6ca246** (master b8bf6550 + aloitus-paivayo 1cb64a19) klo 14.55 ilman asennusta (kevyt tila),
  .app `v3f2/Matkakirja3D.app`.
- **v3g-esiselvitys** (AloituslennonRata-testit kaikille 14 valittavalle, alku 37,06° N; suluissa alku 30° N):
  - Eurooppa ja Välimeri (Ateena, Istanbul, Moskova, Tanger, Kairo) läpäisevät kaikki säännöt paitsi yhden: Kairon lennolla
    Lontoo poistuu vasemmasta reunasta ~0,1 s ennen avauksen loppua (x −1,02 hetkellä 1,9 s; alulla 30° N −0,99).
  - Kaukolennot rikkovat sääntöjä jo vanhalla alulla. New York: kone takaa 0,05 s:ssa (korotus 57°, alulla 30° N 47°) ja
    kääntö 12,3 s:ssa −91 °/s. Rio: Lontoo ulos 1,9 s:ssa ja kohde ulos 12,6 s:ssa. Sydney: silmä saapuessa 233 km kohteesta.
- Tanger on valintanäkymässä ruudun vasemman reunan ulkopuolella (x −35 pt), myös ennen rajausta.
- Päätoimittaja 15.0x: v3g vain Euroopan ja Välimeren aloituskaupungeille (VAIN EUROOPPA). Kaukolennot jäävät avoimiksi, kunnes
  omistaja avaa muut mantereet. Aloitusradan testit ajetaan nyt todellisesta rajatusta valintanäkymästä (37,06° N), Tanger
  lisättiin kohteisiin, ja lähtöpiste tarkoittaa Lontoon nappulaa: 9d1d3a50, Kartta-testit 362/362, rata ennallaan.
- **Kuvattu klo 15.10–15.15** (7c6ca246, FBBD41D7, 0 poikkeusta):
  - Laitteella keskus 37,33° N ja kellon varaus 408 px (136 pt). Moskovan nimi alkaa heti kellon alta, ja kaupunkien valot
    ovat kirkkaat (2,0). Kuvapari ennen | jälkeen: `v3f2/kuvapari-rajaus.png`.
  - Valintakuvat lähtökellonajoilla 01.00, 03.00 ja 22.00: `v3f2/valinnat-01-03-22.png`. Kello 03.00 aamun raja on jo
    Venäjän yllä ja Moskova hämärässä; 01.00 ja 22.00 ovat yötä koko Euroopassa.
  - Lento Ateenaan: perillä 15,00 s, F = 6,960 s kehyseroista. Video `v3f2/aloituslento-v3f.mp4` (736 × 1600, 17,8 s,
    marssi A). Aamunkoitto tulee lennon aikana, perillä on päivä (07.00), ja loppu on sama kuin v3e2:ssa (saapumiskortti).
  - Esikääntö: pallo pyöritettiin Iberian ylle ja napautettiin Tangeria. Kamera kääntyi 1,2 s:ssa rajattuun
    valintanäkymään (37,3° N 17,0° E), ja lento Tangeriin päättyi 15,00 s:ssa (`v3f2-esikaanto/`, F = 8,642 s).
  - Suositus: lähtö 01.00 (oletus). Valinnassa on yö koko Euroopassa, aamunkoitto tulee lennon aikana, eikä perillä tule
    hyppyä.
