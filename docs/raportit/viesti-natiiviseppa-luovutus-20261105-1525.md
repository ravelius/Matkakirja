# Natiivisepän luovutus 5.11.2026 klo 15.25 (konteksti 25 %, pehmeä raja, 7.37)

Korvaa -1510:n jonon ja "Ensimmäisen työn". Muu -1510 lisäyksineen ja -1438:n vika 1:n tiedot pätevät. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Vuoro aina JU:lta. Remote päällä, Raamattu 7.47 luettu. Zsh: `$R:A` on muuttujan muunnos, käytä `"${R}:polku"`; `echo ====` kaataa koko komennon.

## Jono (PT, Postivahdin kautta 15.1x)
1. KK 15.12: tyhjä pohja ja Lontoon kortti: koodi valmis, EI nähty ajossa (alla).
2. Liiku-loitonnus (omistaja 15.05): aloittamatta, ohje ja KK:n sanat -1510:ssä.
3. 85° ja lähi-horisontti: kuvat katsottu, auki (alla); etäisyysarvo NUI:lle, jos 2,5 km vaihtuu.
Laitteella katsominen vasta loppumittauksessa (_tyo/natiiviseppa/loppumittaus-pariisi.md).

## KK 15.12 sanasta sanaan
"katsottu. Tavoite: pelaaja ei näe Pariisiin tullessa tyhjää pohjaa, lähti hän miten nopeasti tahansa: karkeampi kartta pysyy näkyvissä, kunnes tarkka on valmis. Korjaa tämä, älä odota iPadia. Samassa ajossa: Lontoon kortti ja nimi ISO-BRITANNIA poistuvat ennen Pariisin kuvia, ja tarkista, tummuuko kartta PARIISI-otsikon aikana (p07, p09) rungossa, jossa on NUI:n korjaus. Kuvat KK:lle."

## Tehty: natiiviseppa/saapuminen-karkea-219 461a0241e
Pohja runko d5850ff4e, työpuu wt/proto-natiiviseppa-kierto, peili natiivi-backup peili/proto/natiiviseppa/saapuminen-karkea-219. tarkista.sh 0 virhettä (tyylikirjan kolme tiedostoa palautettu). Ei uusia testejä. JU:lta pyydetty 15.25: skenaario-piirros-matka.txt (lähtö 8 s), kansio lokit/natiiviseppa-saapuminen-461a0241e, 14 kuvaa.
- Syy (matka2-ajon loki ja kuvat p03–p05, skripti laski pyynnöt): laskeutuminen 82 → 7 km kestää noin 1,5 s, ja Cesium pyytää tason vasta kameran ehtiessä sen korkeudelle (z13 7,21 s, z14–z15 7,46 s). Välissä näkyy suurennettu pohja ilman kortteleita, vaikka 209 palaa oli levyllä. p03–p04 hiekkaa, p05 terävä. Tulkinta, että hiekka on z10–z11, on päätelty kuvasta ja koodista, ei mitattu.
- Sivulöydös, ei korjattu: esilatauksen säteet ovat Macilla pienemmät kuin pyydetty alue (z11 24/78 km, z12 12/30, z13 6/15, z14 3/6,7), joten osumat z11–z13 ovat noin 40 %. Laitteen arvot eivät tule Macista.
- SaapumisEnnakko.cs: piirtämätön kamera kohteen ylle additionalCamerasiin (kuten raketin ennakkokamera), korkeus lopun korkeus × 2, käynnistyy KarttaKerrokset.ElavaSaapumisen, pois SaavuKeskustaanin valmis-kohdassa, aikaraja 60 s, ei kuumana. Komento `komento maasto saapumisennakko <kerroin>|pois|tila`. Koskee kaikkia striimikaupunkeja (periaate 8), ei vain Pariisia.
- Avoin riski: muisti ei mitattu (lisää loppumittauksen listaan), kamera katsoo suoraan alas vaikka loppu on kallistettu, ja hypoteesi, että Cesium käyttää ladattua tasoa varakuvana, on nähtävä ajosta. Kylmä lähtö ilman piirrettyjä paloja: ajo ei vielä todista sitä, koska skenaario odottaa introa 180 s ja ennakointi ehtii.
- Kartuscha.TodellinenMaa: kohdemaa saapumiszoomauksen alusta (PeliOhjain.SaapumisZoomausKaupunki). Omia valintoja: RANSKA näkyy jo zoomauksessa, koska kamera on silloin Ranskan yllä.
- Lontoon kortti: rungossa on jo PeliNakymat.TyhjennaMatkakirja (d5850ff4e), koehaarasta f446775c8 se puuttui. Todennäköisesti korjattu, nähtävä ajosta.

## Kun ajo tulee
Katso p01–p14 täysikokoisina KK:n sanoja vasten: ei hiekkaa, kortti ja ISO-BRITANNIA pois, tummuus p07 ja p09. Vertailu lokit/natiiviseppa-matka2-f446775c8 ja natiiviseppa-matka-f446775c8. Jos varakuva ei toimi, kokeile kerrointa 1,5 tai 1 ja säteitä. Kuvat suoraan KK:lle, kopio PT:lle (2.214).

## 85° (kuvat lokit/natiiviseppa-notredame85-a88c8f846, KK:lle ja PT:lle lähetetty 15.16)
Kallistus toimii (loki 85,0°), mutta "rakennusten pitää nousta" ei täyty: Notre-Dame vain pieni merkki. 600 m = 1,5 km -kuva (tiedostokoot 2533921 ja 2533981): todennäköisesti MinKorkeus, ei lokista varmistettu. Saari ja Seine eivät näy merkin kohdalla: oletus maaston kohouma, ei varmistettu. Etuala karkea, vasemmassa alakulmassa rikkoutunut kolmio, syy auki. Lontoo näyttää vähemmän kallistetulta, sopii koodiin (85° vain Pariisissa); lokirivi ei ehtinyt. Lokin POIKKEUS ArgumentOutOfRange = Unity Search -editori (-1510). KK:n vastaus odottaa. a88c8f846 on yhä haarassa natiiviseppa/kallistus-85-219; työpuu on nyt toisessa haarassa.

## T7 → NAS 2. erä
pid 58484 käynnissä 15.25. Monitor kuolee nollauksessa: aseta uudelleen. Muu -1348:n mukaan; ei poistoja ennen PT:n lupaa.

## Lisäys 15.27: omistaja ja KK 15.18, UUSI TYÖ, EI aloitettu (konteksti yli 25 %). Tämä menee jonon kärkeen
Omistaja sanasta sanaan: "pariisin introssa kartta saa olla aika sivusta (ei suoraan ylhäältäpäin) jotta 3d rakennukset näkyvät hyvin. pariisin nimen takana ei saa olla tummennusta"
KK:n tavoite: "koko aloituslennon ajan (kierto ja luenta) kartta on selvästi kallistettuna, ja uudet 3D-rakennukset seisovat näkyvästi kartalla. PARIISI-nimi on kartan päällä ilman tummennusta, ja luettavuus hoidetaan nimen omalla reunalla tai varjolla. Korvaa KK:n 15.12-kysymyksen "tummuuko otsikon aikana". Aja mallihaaran päällä, ruutusarja KK:lle."
KK 85°:sta: "Rakenna kallistus mallihaaran (nahtavyydet-219) päälle ennen seuraavaa ajoa. Tarkista sitten n-1km-85:n viat: jättinimi "embâcle" etualalla (nimi ei saa kasvaa etualalla), maastokohouma peittää Seinen, portaikkoinen etuala ja kolmio. Rakennusta ei voi arvioida ilman mallia; omistajalle vasta, kun Notre-Dame seisoo kuvassa."
Työlistassa rivi "Pariisin intro: kartta sivusta, ei tummennusta nimen takana".

Varmistettu git-komennoilla: karttaseppa/nahtavyydet-219 8d0cf457e sisältää 661377bbb:n ja Nahtavyysalue-tiedostot (2 osumaa); 461a0241e ei sisällä (0), ei myöskään a88c8f846 (KK). 15.16:n arvioni "Notre-Dame ei nouse" johtui siis mallien puuttumisesta rungosta, ei kallistuksesta.

Seuraavan ensimmäinen työ: yhdistä mallihaara, a88c8f846 (85°) ja 461a0241e (saapuminen) yhdeksi ajettavaksi haaraksi; yhdistystä ei ole kokeiltu. Sitten aloituslennon kallistus ja nimen tummennus (tummennuksen koodia en etsinyt; alku NUI:n kuvat ja `AjaKeskustaanKiertaen`/`SaapumisKierto`). Sovi NUI:n kanssa, jos tummennus on sen haarassa. -1510:n huomio: NUI:n kyltit-haarassa PalloKierto `|| Kiertaa` jäi pois, palauta yhdistettäessä.
JU:n ajo 461a0241e on jonossa ja saa jäädä: se kertoo tyhjän pohjan ja Lontoon kortin tilan, mutta ei rakennuksista. Tummuutta ei enää katsota siitä.
