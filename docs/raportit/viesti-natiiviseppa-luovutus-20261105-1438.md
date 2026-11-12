# Natiivisepän luovutus 5.11.2026 klo 14.38 (konteksti 25 %, pehmeä raja, 7.37)

Korvaa -1428:n kohdat "Haarat" ja "Ensimmäinen työ". Sen muut kohdat pätevät, samoin -1408:n ja -1348:n siihen merkityt. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Vuoro aina JU:lta.

## Omistajan päätös
KK:n kautta klo 14.29 (kortti): "Jääkö kamera Pariisin ylle luennan jälkeen?" → "Jää (Suositus)", selite "Kaupunki ja nähtävyydet pysyvät näkyvissä." Toteutus Pariisissa: ei loitonnusta Ranskaan luennan jälkeen. Muut kaupungit ennallaan. "KK nollautuu; kuvat seuraavalle KK:lle."

## Haarat
- **Runko: natiivi-ui/pariisi-lento-219 45abf3d41** (NUI, peili natiivi-backup proto/natiivi-ui/pariisi-lento-219). Sisältää kierron, NUI:n viisi kuvaa, KiertoHiivu esityksen Ohitassa ja kameramuutoksen. NUI pyysi tekemään kameramuutoksen tämän päälle, mutta sen merge sisältää jo 2c9ca58a6:n (varmistettu merge-base ja git grep): uutta committia ei tarvittu. Tarkistus 0 virhettä kierto-työpuussa.
- Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto on haarassa natiiviseppa/pariisi-lento-219 = 45abf3d41 (ei omia committeja).
- Vanha natiiviseppa/pariisi-kierto-219 2c9ca58a6: sisältyy runkoon.
- Koehaara natiiviseppa/pariisi-kierto-219-koe f446775c8, työpuu wt/proto-natiiviseppa-kierto-koe, EI JUNAAN. Siinä EI ole NUI:n viittä kuvaa: merge 45abf3d41:een antoi ristiriitoja (Esikatselu.cs, ElavaNimet.cs, ElavaKartta.cs lavalla, muut auto-merge), keskeytetty --abort, työpuu puhdas. Ruutusarjaa KK:lle varten koehaara pitää yhdistää tai ajaa runko ilman koekytkimiä.

## Muutos
ElavaKartta.Saavu: kaupunki == "pariisi" → ei AloitaSaapuminen, loki "elävä: Pariisissa ei maan saapumiskohtausta, kamera jää kaupunkiin". TestiSaapuminen ("elava saapuminen") ohittaa ehdon tarkoituksella.
Seuraukset, EI vielä nähty ajossa:
- Ranskan maakuntien täyttö jää näkemättä, jos Ranskan ensimmäinen kaupunki on Pariisi. NUI: myös lippu syttyy samassa kohtauksessa (ei varmistettu koodista: Lippu-hakuni ElavaKartta.cs:stä ei löytänyt mitään, tarkista kuvasta j135).
- Luennan kuvapakka lähtee omalla 6 s:n viiveellä, ei heti (KuvapakkaLahtee oli Odotassa).
- NUI: kohdekaupungit jäävät ruudun ulkopuolelle luennan jälkeen. KK:lle kerrottava: pelaaja näkee ne vasta Liikusta tai loitontamalla. Tätä ei ole ratkaistu, omistajan sana ei ota siihen kantaa.

## Ajot JU:lla (pyydetty 14.31 ja 14.35, ajo 1 käynnissä 14.37)
1. skenaario-jaa-pariisiin.txt, f446775c8: lokissa ei saa olla "saapuminen: FRA ... 1351.9 km" zoomauksen jälkeen; kuvat j030–j135 Pariisista. Lisäksi `nimet etsi` ja `nimet` kohdissa j030 (kierto), j045 (levossa luennan aikana), j075 (luennan jälkeen): vika 2:n syyt.
2. skenaario-piirros-matka.txt, f446775c8: Lontoo → Pariisi, kuvat p01–p14 zoomauksen alusta: vika 1 pelaajan polulla.
Skenaariot: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/aloituslento/. Kansiot pyydetty natiiviseppa-jaa-f446775c8 ja natiiviseppa-matka-f446775c8; tarkista, käyttikö JU niitä.
Molemmat ilman NUI:n kuvia. Ei Macin kuvia todisteeksi laitteesta.

## Ensimmäinen työ
KK 14.3x ja PT 14.3x -sanat: -1428. Lue ensin ajojen lokit ja kuvat.
**Omistajan päätöksen todiste:** kun ajo 1 on katsottu, kuva ja rivi KK:lle, kopio PT:lle (2.214). Älä sano "valmis" ennen sitä.
**Vika 1 (piirros puuttuu 3–11 s):** kierto4-ajossa testipolku kylmänä: "zoomaus alkaa: valmiiksi +0, yhteensä piirretty 0", ElavaEsilataus ei ollut ajanut, aloitusverho 10,6 s, ruudunkaappaus pysäyttää pelin noin 0,8 s per kuva. Palat z13 vastasivat jo 2 s:ssa (vastausloki katkeaa +1 s:n kohdalla, joten myöhemmät eivät näy lokissa), mutta piirros näkyy vasta s10:ssä. Syy näytön viiveeseen auki. Vertaa p-sarjaan: jos pelaajan polulla piirros on heti, kirjaa testipolun viaksi eikä korjausta. Hypoteesi esilatauksen alueesta (Lahinakyma kattaa vain loppurajauksen) on yhä varmistamatta.
**Vika 2 (nimet pois 38–58 s):** s28:ssa kierto pysähtyy, samalla "nostot: näkyvissä FRA, osuus 358.45, maan nostoja 103" ja Nimikerros.Lado 43 ms; palaavat s43:ssa luennan lopussa ("elävä: odottaa: hiljaa", "ui liiku: piiloon (kerronta)"). Epäilty: levossa ladonnan varaukset (NostoKerros.VaraaIkonit, KartanKalusteet: Kohdelaatikot, Matkakirja.Rajat) tai luennan tila; ei todistettu. "Col de la Chapelle" pysyy. Lue r.syy `nimet etsi` -riveistä.
Sitten ruutusarja KK:lle NUI:n kuvien kanssa (KK: vanhat kuvat ja tumma kartta eivät kelpaa).

## T7 → NAS 2. erä
pid 58484 käynnissä 14.38 (1 h 9 min). Monitoria ei ole tässä sessiossa: aseta. Muu -1348:n mukaan; ei poistoja ennen PT:n lupaa.

## Sessiosta
Remote päällä; Raamattu 7.47 luettu, työlista päivitetty klo 14.31 (rivi Pariisi uudelleen striimikartan päälle osista). Hook: rivillä ei tuoretta tilannetta, päivitä, kun ajo on katsottu.

## Lisäys 14.4x
Runko on nyt natiivi-ui/pariisi-lento-219 d5850ff4e (NUI, sisältää 2c9ca58a6:n, viisi kuvaa ja KiertoHiivun; merge-base varmistettu), ei 45abf3d41. Ajo JU:n jonossa NUI:n puolesta, sen kuvissa ruutusarjan ainekset: katso ennen omaa ajoa.

## Lisäys 14.4x (2)
- Ajo 1 valmis, lokit/natiiviseppa-jaa-f446775c8: j135 Pariisin yllä, FRA 1351.9 km vain ennen zoomausta. KK:lle ja PT:lle kerrottu.
- Vika 2: j045 2 nimeä, j075 8. Sacré-Cœur, Louvre, Palais Garnier, Panthéon: syy "nosto" sekä j030:ssa, j045:ssä että j075:ssä; Grand Palais, Invalides: "taso". Nostojen nimet ovat ui-kerroksessa, jonka `ui lentopiilo` piilottaa: osa vian kuvasta voi olla testin tuottama. Miksi Parc Monceau ym. palaavat vasta luennan jälkeen, on auki.
- KK 14.41: "luennan jälkeen Pariisin yllä avaa Liiku-valinta ja loitonna; näkyvätkö kohdekaupungit ja löytääkö pelaaja seuraavan paikan. Kuvat KK:lle; jos pelaaja jää ilman suuntaa, kerro se samassa rivissä."
- Ajo 3 pyydetty JU:lta: skenaario-liiku-pariisi.txt, d5850ff4e, ei lentopiiloa, `komento aja`-loitonnukset kaari 2 ja 8 (arvio, tarkista kuvista). Ajo 2 skenaario-piirros-matka kesken 14.41.

## Lisäys 14.4x (3): vika 1 pelaajan polulla
Ajo 2 lokit/natiiviseppa-matka-f446775c8 (Lontoo → Pariisi, oikea matka; PUUTE vain Lontoon intron odotuksen aikaraja, ei vaikutusta). VIKA TOISTUU: p03–p06 hiekanvärinen pohja, piirros vasta p07:stä (arkki scratchpadissa, tee uudelleen p01–p14:stä). Ei siis pelkkä kylmän testipolun vika.
Ehdot, jotka voivat liioitella: valinnasta zoomaukseen vain 4,1 s; Lontoossa ennakointi ehti Edinburghiin (109 s), Pariisin palat jäivät kesken. "zoomaus alkaa: lähinäkymä KESKEN", "valmiiksipiirto pariisi 49 palaa (levyllä jo 160) 18,9 s; lähinäkymä 7,43 × 5,57 km z15". Lähinäkymä valmis 14,8 s zoomauksen alusta.
Hypoteesi korjaukseksi, varmistamatta: esilataus piirtää z15:n, kierron 6,6 km:ssä Mac pyytää z13:a. Laitteella taso on toinen (Mac 640×480), joten tasoa ei saa päätellä Macista. Tarkista ensin, mitä pelaaja näkee, kun Pariisi on ehditty esiladata: pidempi odotus Lontoossa ennen matkaa (sama skenaario, odota 8 → noin 120 s).

## Lisäys 14.4x (4): UUSI TYÖ, PT 14.4x, ei aloitettu (konteksti 30 %)
PT sanasta sanaan: "uusi työ, omistaja 14.44: "kartta saisi kääntyä enemmän, aina 90 asteen kulmaan asti". Pelaaja voi kallistaa Pariisin karttaa vaakatasoon asti ja katsoa uusia 3D-kohteita samalta tasolta. Maa ei saa kadota viivaksi, eikä kamera saa mennä pinnan alle. Korvaa 24.9.:n rajan 85–88°. Rajaus: vain Pariisi. Ei iPad-ajoja eikä mittauksia; muisti mitataan kerran valmiina (2.209), ja laajan näkymän muistiriski kuuluu samaan mittaukseen, kuten kierron saumakorjauskin. Horisontin nimet tekee NUI, sovi rajapinta sen kanssa. Mac-kuva suoraan KK:lle, kopio PT:lle (2.214)."
Työn pohjaksi runko natiivi-ui/pariisi-lento-219 d5850ff4e, ellei PT toisin sano.

## Odottaa seuraavaa sessiota
Järjestys: 1) JU:n ajo natiiviseppa-liiku-d5850ff4e → kuvat ja rivi KK:lle (KK 14.41, ks. lisäys 2). 2) ajo natiiviseppa-matka2-f446775c8 (skenaario-piirros-matka2.txt, 150 s Lontoossa) → vika 1:n päätös. Vaihda polku, jos JU käytti eri kansiota. 3) vika 2. 4) 90° kallistus. PT voi muuttaa järjestystä.
