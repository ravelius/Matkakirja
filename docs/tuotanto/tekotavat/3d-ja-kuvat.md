# B Tekotavat: 3D ja kuvat

*(Lavastaja 23.10.2026, studiojako Raamattu 4.21. Käytännön tekotapa 3D-mallille, kohtaukselle (sali, kuja, maamerkki) ja
kuvalle: tilaus, vastaanotto, kokoaminen, budjetit, vienti ja tarkistus. Laatutaso: A Suunta (taide, Raamattu 4.21 A SUUNNAN YTIMET); tuotetyypin
kooste: C Reseptit (`reseptit/museo.md`, `reseptit/3d-maamerkki.md`); vaiheet, portit ja luvat vain D Tuotannonohjauksessa.
Kooste nykyisistä pohjista (`docs/moduulit/tuotantopohjat/codex-3d-toimitus.md`, `3d-maamerkki.md`, `taidemuseon-maa.md` luku 7.2)
ja luovutusten opeista 10.–21.10.; uusia sääntöjä ei ole. Raamattu voittaa ristiriidassa: 7.15 ja 11.7 (Codex ja Tripo), 7.20
TAVOITELUUPPI, 7.32 (omistajalle vain pelikuva), 11.1 (lisenssit), 11.26 (ämpäri paketteina).)*

## 1. Kuka tekee mitä

| Työ | Tekijä | Huom. |
|---|---|---|
| Havainnekuvat, referenssikuvat, tekstuurikuvat | Codex | tavoite ennen työtä (D luku 1) |
| Uudet 3D-mallit (hahmot, eläimet, esineet, koristeet, kalusteet) | Codex Tripolla | Claude ei aja Tripoa eikä rakenna uusia esineitä koodilla tai käsin |
| Kokonaiset rakennukset, salit, kujat ja maasto | Lavastaja (tai Codex) Blender-skriptillä | tavoitekuvan mukaan; sisältö ja ympäristö Tripolla |
| Vastaanotto, viimeistely, kokoaminen kohtaukseksi | Lavastaja | paikat, mittakaava, luurangon liike pelissä |
| Valo, varjostimet, pelikuvaparin mittaus | Valoseppä | albedo ja sävy pelikuvista |
| Pelikoodin kytkentä (oma kohtauskoodi) | pelin rakentaja, nimetty tilauksessa | museo: Linssiseppä; juoksupeli: Pelikoodari |
| Vienti ämpäriin | Julkaisija `vie-paketti.sh` | tekijä kokoaa paketin valmiiksi |

Vanhoja pelissä olevia malleja ei etsitä eikä vaihdeta Tripo-malleihin ilman omistajan päätöstä.

## 2. Tilaus Codexille

Postiin `posti/<rooli>-codex-<aihe>-<pvm>.md` (muoto: `codex-3d-toimitus.md` luku 1). Mukaan:
- havainnekuva tai pyyntö tehdä se ensin;
- mallit nimineen, tyyppi, todellinen koko metreinä, pivot jos poikkeava, maailman osien yhteinen origo;
- **LIIKE jokaisesta mallista** (`idle`, `walk`, `sit`, `run` …) tai "ei liikettä" (liikkumaton ilman luurankoa);
- kytkijä ja kohtaus; luvan tila (D);
- referenssit: hahmo edestä, sivulta ja takaa, kädet irti, tasainen valo, harmaa tausta; ei oikeiden ihmisten valokuvia;
- **ei Googlen laattoja sisältäviä pelikuvia** pohjaksi tai referenssiksi; käytä omia renderejä, LiDAR-massaa, OSM:ää;
- ei suojattuja teoksia (tekijän kuolemasta alle 70 v, Espanja 80 v).

Sovitustiedot (mitat, toleranssit, liitospinnat) kirjoitetaan tilaukseen numeroina, esim. Niken keula: yläpinta Niken
alapinnan tasolle, jalusta 2,2 × 2,4 × 3,2 m.

## 3. Tiedostomuoto ja budjetit

**GLB (glTF 2.0, binääri)**, kaikki upotettuna, ei Draco- eikä meshopt-pakkausta. Yksikkö metri, +Y ylös, hahmon kasvot +Z.
Hahmon pivot jalkojen välissä (y = 0 ± 3 cm); esineen pohjan keskellä; maailman osat yhteisessä origossa. Juurisolmun skaala 1.

| Raja | Hahmo | Esine / maailman osa | Maamerkki (oma malli) |
|---|---|---|---|
| Kolmiot | ≤ 40 000 | ≤ 100 000 / tiedosto | LOD0 ≤ 250 k, LOD1 ≤ 100 k, LOD2 ≤ 20 k, yksi mesh per LOD |
| Primitiivit (≈ piirtokutsut) | ≤ 300, tavoite 1–3 | ≤ 300: saman materiaalin kappaleet yhdeksi | – |
| Materiaalit | ≤ 32, tavoite 1 | ≤ 32 | omat materiaalit erottuville osille |
| Tekstuurit | 2^n, ≤ 2048 px, ≤ 8 / tiedosto | sama; huoneet ja kalusteet 1024 px | sävy leivottu tekstuuriin |
| Luut | ≤ 150, Mixamo-nimet `mixamorig:` | – | – |
| Tiedosto | ≤ 15 Mt | ≤ 15 Mt | – |

- **iPadin ja iPhonen muisti:** GPU-muisti kasvaa tekstuureista, ei kolmioista. Juoksupelin huoneet putosivat 254 → 154 Mt, kun
  kuvat rajattiin 1024 px:iin (`glb_tekstuurit_1024.py`, avoimet-v12). Lataa samat huoneet kerran ja kopioi instansseina.
- **Piirtokutsut:** 1 707 erillistä meshiä (sisapiha.glb) kaatoi portin; yhdistä ennen toimitusta.
- ASTC-pakkaus tehdään vastaanotossa; KTX2:ta ei toimiteta. Natiiviseppä saa GPU-arvion ennen junaa.
- Koordinaatit omissa malleissa: glTF x itä, y ylös, z etelä; origo `kohde.json`:n lat/lon pihan maassa.

## 4. Vastaanotto

1. **Portti:** `node tools/codex-3d-tarkistus.mjs <toimituskansio>` → 0. VIRHE hylkää, HUOM on tiedoksi. Hylätystä yksi rivi PT:lle.
   Portti ennen kytkentää aina (maailma v4 meni peliin ennen porttia, hylätty osa jäi junaan 204).
2. **Täysikokoinen tarkistus**, ei pienestä esikatselusta: suunta, mittakaava muihin nähden (seisova 1,68–1,78 m, istuva tuoleineen
   1,32 m), materiaalit Unityssä, hahmon kasvot, kädet ja saumat edestä, sivulta ja takaa, animaatioiden silmukat, varjon kontakti.
3. **Liike:** kävelytahti mitataan glb:stä (askelsykli ja kesto; Louvren k1 2 × 1,28 m / 2,333 s). Lyhyt liikevideo Unitystä
   ennen peliä.
4. **Havainnekuva ja pelikuva rinnakkain** täysikokoisina (kohta 7).

## 5. Kokoaminen ja omat mallit

- **Yksi lähdeskripti per malli tai kohtaus:** `blender -b --factory-startup -P <skripti>.py -- <argumentit>`, absoluuttiset polut.
  Ei käsin muokattua .blendiä tuotantoon. Varmuuskopio `<skripti>.py.ennen-kN` ennen jokaista muutosta.
- **Kerroksina, ei korjauksina päälle:** pohja (sijoitus.json) → kuoret → katot → sisustus → vienti; jokainen vaihe oma
  skripti (esim. `avoimet_sijoitus.py`, `avoimet_harjat.py`, `avoimet_sisustus.py`, `avoimet_kalusteet.py`). Uusi versio = uusi
  kansio (`-vN`), vanhaa ei ylikirjoiteta.
- **Massa mitoista, rytmi kuvista** (maamerkki): korkeudet LiDARista (räystäs, harja, huippu erikseen), ikkunajako ja listat
  julkisivukuvista ja ortokuvasta. Vinot siivet omana kehyksenään.
- **Yksityiskohdat vain pelin etäisyydelle:** julkisivujakso kerran ja monistetaan; lähitason koristeet vain kulmiin, joista pelaaja katsoo.
- **Kalusteet yhteisestä kirjastosta** (`MuseoKalusteet`: penkit, kaiteet, jalustat), ei salin GLB:stä; sali-GLB:stä kalusteet pois
  (`kalusteet_pois_glb.py`, uudet indeksi-accessorit, koska Blenderin vienti jakaa indeksejä).
- **Henkilöt datana** (`henkilot.json`: malli, paikka, `kavelee`); kaikki saman salin kävelijät samaan simulaatioon (`MuseoKavijat`),
  paikallaan olevat kiinteinä esteinä (`LisaaKiintea`).
- **Kehityslippu päälle samassa erässä kuin media** (`MuseoHenkilot.Paalla` piti Tripo-henkilöt kaksi päivää pois pelistä).
- **Reitit ja kulku:** kun kohtaukseen tulee kujia tai huoneita, tarkista läpikulku korkeuskartan BFS:llä (Blender BVH-säde ylhäältä
  0,5 m ruuduin, vapaa < 0,5 m, väljyys 1,2 m) ennen pelikoodarille luovutusta.

## 6. Materiaalit ja pinnat

- **Albedo pelikuvista, ei Blender-renderistä:** T = havaittu / vientialbedo, uusi albedo = tavoite / T (Valoseppä mittaa).
  glTF-vienti leikkaa `baseColorFactor` ≤ 1:een, joten kirkastus leivotaan tekstuuriin (`*_savy.jpg`).
- **Valotus yhdessä paikassa:** joko valo tai albedo, ei molemmat (tummuu kahdesti).
- **Oma materiaali erottuvalle osalle** ennen yhteisen kertoimen säätöä (kivi ×0,65 tummensi myös jalustan).
- **Tekstuurit CC0** (Poly Haven) tai Codexin; rivi `LAHTEET.md`:hen. Toistuvan tekstuurin kuvio tarkistetaan pelikuvasta.
- **Läpinäkyvä ja hehkuva** (lasi, vesi, sisävalo) vaatii Valosepän varjostintuen; tarkista alfa pelissä ennen luovutusta.
- **Päällekkäiset pinnat:** samassa tasossa olevat pinnat välkkyvät; erota vähintään 3 cm (muurikatteen räystäät).
- **Googlen laattojen keskellä** malli esitetään valaisemattomana kuten laatat (valo ja AO leivottu); leikkaus yhtenä renkaana
  (+ 1 m reunus), vertailuportti `kaupunkipinnat-v1/lahde/vertailuportti.zsh <kohde> <lod0.glb>` → 0.

## 7. Kuvat: esikatselu, kuvaparit ja arkit

- **Mac-esikatselu** Blenderillä (`--batch` oletus) on roolin sisäinen työkalu; omistajalle vain pelistä otettu kuva (7.32).
  Salimallissa ei ole tauluja: kerro se kuvatekstissä.
- **Kuvapari:** tavoite (havainnekuva) ja pelikuva samasta kulmasta, täysikokoisina; kuvateksti omalla raidallaan kuvan ylä- tai
  alapuolella, ei kuvan päällä; haaran SHA ja versio tekstissä.
- **Ei tekstiä kuvan päällä (omistaja 24.10. 14.41, Raamattu 7.32):** omistajalle menevässä kuvassa ei ole tekstiä, kaistaa eikä
  merkintää pelikuvan päällä – myös testikameran selite raidalle kuvan ulkopuolelle. Kuvaa ei rajata jälkikäteen (osa kuvasta
  häviäisi); tekstillinen kuva uusitaan.
- **Itse katsottu ensin:** avaa kuva täysikokoisena ja käy läpi pyynnön jokainen sana (materiaali, väri, koko, varjo,
  päällekkäisyydet). Pieni esikatselu ei riitä (pyramidi 17.10.).
- **Tavoiteluupin arkki:** `kierros.py` → `ero/arkki-kN.jpg`, luvut (IoU, korkeusero, dE) ja rivi `VERTAILU.md`:hen; arvion tekee
  tuore Sonnet-ali-agentti (3 suurinta eroa tekstinä). Pysähdys: kaksi kierrosta ilman parannusta tai 10 kierrosta.
- **Kuvat lähteistä:** PD/CC, katsottu silmin, tekijä ja lisenssi `LAHTEET.md`:hen; vain vertailuun, ei malliin.

## 8. Vientipaketti

`/Users/Shared/Claude/proto-3d/_valmiit/<aihe>-vN-vienti-<pvm>/`: tiedostot ämpärin polkujen mukaan, `LAHTEET.md` (tekijä,
työkalu, lisenssi), `SHA256SUMS`. Vientipyyntöön polku, kohdepolku, tiedostomäärä ja SHA256SUMS-tiivisteen alku; `--kuiva` ensin.
Kytkijälle kerrotaan, mikä versio on käytössä (peli osoittaa uuteen kansioon itse).

## 9. Tarkistus

1. Portti 0 jokaiselle toimitukselle; omille paketeille `vie-paketti.sh --kuiva` 0.
2. Mikään ei leiju: veistokset jalustalla, esineet lattiassa, varjolla kontakti (katso ylhäältä ja sivulta).
3. Kävelijät eivät kulje esteiden, toistensa eivätkä kameran läpi (`MuseoKavijat`-testit, `KavelijatEivat` ≥ 0,8 m kamerasta).
4. Proto: `sh Linssit-testit/kaanna.sh <suodatin>` ja `tyokalut/tarkista.sh`, **yksi kerrallaan** (sama rakennus-dll → Abort trap 6
   tai Bus error).
5. Budjetit taulukon 3 mukaan; tekstuurimuisti arvioitu.
6. Kuvapari itse katsottuna ennen PT:tä.

## 10. Tyypilliset virheet

- Malli on mediassa, mutta lippu on pois tai peli osoittaa vanhaan kansioon: malli ei näy pelissä.
- Veistoksen jalusta oli vain salin GLB:ssä tai koodin väliaikaisena laatikkona: Nike leijui, kun GLB latautui.
- Kaksi kävijäsimulaatiota samassa salissa: kävelijät kulkevat toistensa läpi.
- Tyhjennys keskipisteen mukaan jätti seinäneliöistä kiiloja (piikit); madalla tai tyhjennä kokonaisina kappaleina ja tarkista
  kuvasta ennen ja jälkeen.
- Korkeat lähdemuurit ja lappeet näkyivät kujalle (katot leijuivat): muurit enintään pohja-korkeus + 0,5 m, seinät kattoon asti.
- Kiveys tasossa 0,5–1,4 m: juoksija jäi lattian alle. Lattiat tasoon 0 vain rajatulla alueella, koska koko palatsissa siirto avasi saumoja.
- Liian matalaksi madallettu korjaus (tausta v12, −21 % seinäalaa) hylättiin: mittaa muutoksen vaikutus pinta-alana ennen vientiä.
- Lyhyet polut viesteissä: PT ei näe niitä, joten polut aina absoluuttisina; luuppiviennin md5 joka viestissä.
- Luuppikierros vietiin junassa olevan `glb/`:n päälle: kierrokset `_tyo/<rooli>/<kohde>/luuppi-vienti/`:iin.
- Pieni aukko putosi leikkauksesta pinta-alarajan takia: pidä aukot koosta riippumatta.
- Emojit ja merkit kuvateksteissä renderöityvät laatikoiksi: kirjoita sana.

## 11. Havainnekuvasta identtiseksi

*(Omistaja 24.10.2026: kysymys klo 14.51 "Saako kaiken tehtyä identtiseksi? Pienemmät laatat, kivi korotukset yms? Ja miten sen
saa tehtyä kuitenkin fiksusti optimoidusti niin että ulkoasu pysyy kuitenkin identtisenä mallin kanssa?"; klo 18.18 "Kirjataanko
tämä säännöksi kaikkiin tuleviin peleihin?" → "Kyllä, kirjataan". Raamattu 7.20. Esimerkki: juoksupelin suunnitelma
docs/raportit/juoksupeli-identtinen-suunnitelma-20261024.md, 14 kohtaa, juna 211.)*

Jokainen pelattava 3D-kohtaus tehdään havainnekuvan näköiseksi ennen ensimmäistä junaa. Työ alkaa purulla, ei rakentamisella.

**1. Purku kohta kohdalta.** Tekijä (Lavastaja, valon ja pintojen osalta Valoseppä) käy jokaisen hyväksytyn havainnekuvan läpi ja
kirjaa taulukkoon jokaisen näkyvän piirteen: laatat, reunukset, portaat, kivijalat, katot ja tiilet, koristeet, vyöt, ovet,
ikkunat, puut, valo ja varjot, taivas, aukiot. Taulukko on reseptin (C) osa ja kulkee työn mukana; PT hyväksyy sen ennen työtä.

| # | Havainnekuvassa | Peli nyt | Tekotapa (optimoitu) | Tekijä | Tunnit |
|---|---|---|---|---|---|
| 1 | piirre ja missä kuvissa se näkyy (mitat arvioituina) | mitä pelissä on nyt | jokin tavoista 2–5 | rooli | arvio |

**2. Toistuvat pinnat kuviona syvyysvarjostuksella.** Laatat, saumat, kourutiilet, lohkokivi ja palkkimaalaus tehdään
varjostimessa maailman koordinaateissa (kohokuvio syvyysvarjostuksella, sävyhajonta per pala), ei kolmioina.

**3. Toistuvat osat instansseina.** Saman muotoiset osat (tiilipäät, konsolit, harjakoristeet, ovet, ikkunat, puut) yhtenä verkkona
GPU-instansseina; sijainnit luodataan pohjasta. Kaukana sama osa siluettikorttina hyväksytystä lähimallista (kaukopuut, harjakoristeet).
Kolmioita vain siluettiin vaikuttaviin osiin (reunukset, portaat, pylväät, räystäät).

**4. Valmiiksi laskettu valo.** Kun aurinko on kiinteä, staattisten osien varjot ja nurkkavarjostus leivotaan valokarttaan;
reaaliaikainen varjo vain hahmoille ja liikkuville osille. Lehvästön varjo kuviona.

**5. Yksityiskohdat vain lähellä.** Kuviot ja instanssit vain lähimmässä tasossa (LOD0, noin 150 m) ja häivytetään etäisyyden mukaan;
kaukaiset tasot pysyvät kevyinä. Budjetit kohdan 3 mukaan, ruutuaika alle 20 ms (NS mittaa).

**Tarkistus.** Jokaisesta havainnekuvan kulmasta pelikuvapari (havainnekuva | peli, pelikamera, ei tekstiä kuvan päällä) ja
taulukon jokainen rivi ok tai vika (Raamattu 9.5). Kun pelin kuvakulma on omistajan valitsema ja poikkeaa havainnekuvan kulmasta,
kuvan ulkopuolelle jäävää ei venytetä näkyviin. Blender-kuva ei riitä: kattovirheet löytyivät 24.10. vasta pelivideosta.
