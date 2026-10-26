# Raamatun rakenneuudistus: LUONNOS (C6, 19.10.2026)

Tila: LUONNOS. Raamattuun (js/tyohuone-raamattu.js) ei ole koskettu. Lähde: origin/main, 437 537 merkkiä, 2 408 riviä, 27 osiota, 342 kohtaa.
Tehtävänanto (omistaja 18.10. klo 17.55): yhtenäiset tuotanto- ja testauskäytännöt, ammattimaiset nimikkeet, rönsyt pois, yksi tieto yhdessä paikassa, tilinvaihdossa ei unohdu sovittuja tapoja (esim. äänen suomi-pakotus).
Pohjana myös docs/raportit/raamattu-lapikaynti-kartoitus-20261014.md (siellä kohtakohtaiset löydökset 611 alakohdasta) ja docs/tilinvaihto.md.

## 1. Nykyinen rakenne

Osio 0 "Ydinajatus ja kohderyhmä" on 175 kt eli 40 % koko tiedostosta, ja siinä on 31 kohtaa. Kolme osiota (Karttalinssit, Viisas Pöllö, Kaupungit) on 40-56 kt kukin. Ydinajatus on käytännössä kaatoallas, jossa on sekaisin visio, työtavat, äänipolitiikka, natiivi ja alue-rajaukset.

| # | Osio (otsikko) | Rivit | Merkit | Sisältö lyhyesti |
|---|---|---|---|---|
| 0 | Ydinajatus ja kohderyhmä | 854 | 174 903 | 31 kohtaa: agenttisääntö, VAIN EUROOPPA, lataus, NATIIVI ENSIN, äänten generointilupa ja suomi-lukitus (kohta 5, 8,6 kt), historialliset kohteet (13,7 kt), pelit/talous/luenta, TYÖTAPA JA SESSIOT (kohta 11, 49 kt, noin 85 aihetta: roolit, junat, simu, nollaus, Postivahti, Asemataulu, tilinvaihto), UI-POHJAT (10,5 kt), TYÖSKENTELYTAVAT AINA RAAMATTUUN, NATIIVI PELI ETUSIJALLE (kohta 14, 51 kt, noin 55 aihetta), Codex-työnjako, varsinainen ydinajatus (kohdat 20-30) |
| 1 | Perustuslaki: viisi pilaria | 13 | 1 146 | Miksi, peli edellä, totuus ja lähteet, paikka ennen lajia |
| 2 | Tarina ja hahmot | 62 | 9 809 | Kaanon, Fogg, Aarni, Horatio, Livia |
| 3 | Kirjoittajan säännöt | 26 | 3 150 | Matkakirjatekstien tyyli |
| 4 | Tekstien vetovoima | 11 | 910 | Tekstien koukku |
| 5 | Pelin kulku | 16 | 1 659 | Perussilmukka |
| 6 | Fokusmoodi | 185 | 33 368 | 23 kohtaa: fokusvirta, aarretehtävä, Livia/Pulu-chat ja puhekieli, kohdemalli, karttamerkit, laattapyramidi, kartan tyyli, reitit, kuvien tyyli ja tuotanto |
| 7 | Arkkikirjasto: pop-upien yhteinen kieli | 41 | 6 909 | Korttien ja arkkien UI-kieli |
| 8 | Aarteet ja eteneminen | 30 | 4 216 | Aarteet, eteneminen |
| 9 | Karttalinssit | 230 | 43 957 | 19 kohtaa: ELÄVÄ OPAS (24,9 kt), ISS, ajattelijat, aikajanalinssit, kamera-ajot |
| 10 | Viisas Pöllö | 299 | 55 701 | 34 kohtaa, mutta vain noin 5,6 kt koskee Pöllöä (pääosin kumottu, Pulu tuuraa). Muu: Mac Studio ja avaimet (8,6 kt), linssit, äänet, Pulu, lehdet, kehittäjätila, karttapallo |
| 11 | Tutki kätkö -pelit | 9 | 585 | Minipelit |
| 12 | Kohtaamiset ja henkilöt | 14 | 1 410 | Kohtaamiskortit |
| 13 | Kaupungit | 225 | 41 542 | 26 kohtaa: avauskortti, karttauudistus, nostot, saapuminen (7,7 kt), liikkuminen, Astronautin kamera, linssien suunta |
| 14 | Matkakirjan ihmeet | 14 | 1 540 | Kadonneet suuruudet |
| 15 | Maalehdet ja lukeminen | 17 | 1 544 | Maalehti |
| 16 | Äänet ja luennat | 47 | 7 363 | Äänipankki, PCM, lukijaääni, striimilukija, luentapolitiikka |
| 17 | Kuvat ja lähteet | 75 | 12 005 | Kuvavaihtoehdot, ChatGPT-ikkuna, ämpäri, lisenssit, salaisuudet |
| 18 | Lukijoiden ehdotukset | 23 | 2 360 | Ehdotusputki |
| 19 | Sisältöeditori (visio) | 9 | 690 | Visio |
| 20 | Talous ja palkkiot | 11 | 956 | Talous |
| 21 | Rajaukset ja turvalinjat | 9 | 483 | Turvalinjat |
| 22 | Sanasto | 11 | 1 137 | Termit |
| 23 | Moduulit | 14 | 1 366 | Moduulirakenne |
| 24 | Jakelu ja iOS-kuori | 15 | 1 673 | TestFlight, kuori |
| 25 | Poistetut ideat | 19 | 1 793 | Kumotut ideat |
| 26 | Ohjedokumenttien kartta | 79 | 11 531 | Kartta kaikkiin muihin ohjeisiin (testi valvoo) |

Rakenteelliset havainnot:
- Osioiden numerointi ei kerro aihetta: sama aihe (esim. äänet) on kohdissa 0.5, 0.11, 0.14, 10.9-10.11 ja 16. Sama koskee linssejä (0.14, 9, 10.5-10.8, 13.13-13.14), kuvia (6.19, 17, 13.9), junia/testausta (0.11, 0.14, 24) ja Mac Studio/avaimia (0.11, 10.20, 17.19).
- Lokiviitteet ("Loki: …") vievät noin 30 600 merkkiä 55 kohdassa. Rivinjatkot ("\n          + '") ovat arviolta 12 % tiedostosta (kartoitus 14.10.: 53 kt).
- Raja: tests/raamattu-loki.test.mjs sallii alle 450 KiB ja vaatii vähintään 300 lokiviitettä. Nykyinen 437 537 merkkiä (noin 427 KiB) on 23 KiB rajan alla.

## 2. Ehdotettu uusi pääjäsennys (14 lukua, ammattimaiset nimikkeet)

Periaate: yksi aihe = yksi luku. Luvun sisällä kohdat ovat ISOILLA KIRJAIMILLA otsikoituja ja numeroituja (esim. 5.3), jolloin kohtaan viitataan tunnuksella eikä lauseella. Ensimmäinen rivi (agenttisääntö) pysyy ennallaan tiedoston ja CLAUDE.md:n kärjessä.

| Luku | Otsikko (ammattinimike) | Mitä kuuluu | Mistä siirtyy |
|---|---|---|---|
| 1 | Pelin visio ja kohderyhmä (Vision & Pillars) | Ydinajatus, kohderyhmä 13+, sydänteema, nimi, missio, laatu ensin, viisi pilaria, laajuusrajaukset (VAIN EUROOPPA, AIKA = nykyaika, EI SAAVUTETTAVUUSOHJEITA, EI VARATEKSTEJÄ), rajaukset ja turvalinjat | 0.20-0.30; 0.1, 0.4, 0.6, 0.7; osio 1; osio 21 |
| 2 | Pelisuunnittelu (Game Design) | Pelin kulku, fokusmoodi ja kohdemalli, aarteet ja eteneminen, minipelit, kohtaamiset, linssit (yleiset säännöt ja kukin linssi omana kohtanaan: Elävä opas, ISS, ajattelijat, aikajanat, virta), kartta ja kaupunkikortti, nostot, saapuminen, liikkuminen, historialliset kohteet (Olavinlinna, Kielletty kaupunki), pelit/talous/luenta, Pulu/Livia ja Pöllö pelihahmoina, lukijoiden ehdotukset, maalehdet | osiot 5, 6 (paitsi kuvatyyli), 8, 9, 11, 12, 13, 14, 15, 18, 19, 20; 0.8, 0.9; 10.3, 10.5-10.8, 10.13-10.14, 10.17, 10.21-10.33 |
| 3 | Tarina ja kerronta (Narrative & Writing) | Kaanon, hahmot, kirjoittajan säännöt, tekstien vetovoima, Livian puhekieli, matkakirjatekstin rajat, Pöllön karaktääri | osiot 2, 3, 4; 6.4-6.5; 10.15, 10.22 |
| 4 | Taide- ja UI-tyylikirja (Art Direction & UI Style Guide) | UI-POHJAT ja tuotantopohjien sanasto, arkkikirjasto, lasipohja, värit tokeneina, animaatiorajat, kartan tyyli (akvarelli, merkit, nimiöt), kuvien tyyli ja HAVAINNEKUVA-SANA, kuvatekstit kuvan ulkopuolelle, valo- ja kuvapohja, natiivin ulkoasulinjat (yläpalkki, ruutu) | 0.12; osio 7; 6.12-6.19; 6.15; 0.14 (ulkoasukohdat); 13.9 |
| 5 | Ääni ja lokalisointi (Audio & Localization) | Äänipankki, PCM, lukijaääni, striimilukija, musiikki ja kartan musiikki, äänisivu, luentapolitiikka, GENEROINTISÄÄNNÖT: suomi pakotettuna, generointilupa, kertojaäänet, dialogit yhtenä ottona, kielikoodi ja testi, äänet repoon ei | 0.5 (äänikohdat: SUOMI LUKITTU, POIKKEUS KERTOJA, MÄÄRÄN PÄÄTTÄÄ OMISTAJA, SOUNDLY); osio 16; 10.9-10.12; 0.14 (ÄÄNET NATIIVIIN); 0.12 (PUHE ÄÄNENÄ) |
| 6 | Tekninen arkkitehtuuri (Technical Design) | Natiivi ensin ja Unity-linja, web rajatumpi, paritetti, laattapyramidi, suorituskyky (lämpö, ruudunpäivitys, muisti), karttapallo (Globe.gl), moduulit, Cesium/Google, datamalli, UITK, lataus sama kaikilla verkoilla | 0.3, 0.2 (lataus); 0.14 (tekniset kohdat); 6.14; 10.3, 10.4; osio 23 |
| 7 | Tuotantoputki ja roolit (Production Pipeline & Roles) | Roolit, kansiot, mallit, effort, aloitusviesti ja lukulista, luovutus, viestisäännöt, JUMI, nollaukset ja kontekstirajat, Postivahti, Asemataulu, silmukat ja vahdit, työjonot, Codex-työnjako, Codexin tahti, toimivalta, yhteiskehitys | 0.0, 0.10, 0.11 (roolit, viestintä, nollaus, Postivahti, Asemataulu), 0.13, 0.15-0.19; 10.2 |
| 8 | Valmiin määritelmä (Definition of Done) | Yksi lista: milloin työ, erä, juna ja sisältö ovat valmiita; tuotantopohjan DoD, retrospektiivi, kultainen polku | 0.12 (VALMIIN MÄÄRITELMÄ, KULTAINEN POLKU); uusi yhteenveto (luonnos kohdassa 4) |
| 9 | Laadunvarmistus ja testaus (QA & Test Strategy) | Testauksen taso ja rajat: TESTAUS VAIN AUTOMAATTISIN, EI TESTEJÄ JUNAAN, videot vain välttämättöminä, muistiajo, vika toistetaan ennen korjausta, kuvien tarkistus täysikokoisina, CI, äänen kielitesti, laitetestaaja | 0.11 (testauskohdat); 0.14 (TESTFLIGHT-BUILDIT); uusi |
| 10 | Julkaisu- ja versionhallintaprosessi (Release & Version Control) | Juna, OMISTAJA PYYSI JULKAISUA, yksi juna, TF, versiot, haarat ja worktreet, PR ja merge, CI, lukitus, App Store -tarkistuslista, jakelu ja iOS-kuori | 0.11 (JUNA, YKSI JUNA, VERSIOT JUNASSA, KÄÄNNÖKSET, LUKKO); 0.14 (App Store); osio 24 |
| 11 | Sisällön ja assettien hallinta ja lisenssit (Content & Asset Management, Licensing) | Kuvat PD/CC, ämpäri vs. repo, MAKSULLISET LÄHTEET, Tripo-lataukset, suojatut teokset, generointikanavat (ChatGPT-ikkuna, kuvamalli), yhtenäinen kohdemalli ja nostostandardi, salaisuudet, kuvalähteet | osio 17; 0.5 (maksulliset, Tripo, suojatut); 13.8, 13.9; 10.19; 6.18-6.19 |
| 12 | Työkalut, tilit ja ympäristö (Tools, Accounts & Environment) | Mac Studio ja avaimet, tilit ja kiintiöt, tilinvaihdon tarkistuslista, simulaattorit ja levy, sovelluksen pysäytys, hookit, sallinnat | 10.20; 0.11 (SIMULAATTORIT, LEVY, TILINVAIHTO); docs/tilinvaihto.md viitteenä |
| 13 | Sanasto ja ohjekartta (Glossary & Document Map) | Sanasto, ohjedokumenttien kartta (testi valvoo), poistetut ideat yhtenä listana | osiot 22, 26, 25 |
| 14 | Päätöshistoria (Decision Log, ei Raamattua) | Vain viite: docs/raamattu-loki/. Raamattuun ei jää päivämäärähistoriaa, kumottuja versioita eikä "Loki:"-listoja, vain yksi tiedostoviite per luku | kaikki "Loki:", KARSINTA- ja TÄMÄN OSION KOHDAT -rivit |

Kunkin luvun alussa yhden rivin sisällysluettelo ja "Omistaja: rooli". Luvun muutoksista vastaa Päätoimittaja; roolit lukevat vain oman roolinsa luvut (docs/vastuukartta.md: rooli → luvut).

Vaikutus testeihin: tests/raamattu-muokkaus.test.mjs ja tests/dokumentit.test.mjs lukevat osiot oliosta otsikon mukaan, joten otsikoiden uusiminen vaatii niiden päivityksen samassa PR:ssä; raamattu-loki.test.mjs:n "vähintään 300 viitettä" -ehto vaihdetaan muotoon "jokainen viite osoittaa olemassa olevaan tiedostoon". Kehittäjätilan Raamattu-muokkain (10.18) lukee samoja osioita.

## 3. Rönsyt: päällekkäisyydet, vanhentuneet, kertaraportit, historia

Merkintä "SITOVA, säilyy" = omistajan sitova linjaus; sen sisältö ei poistu, vain sijainti voi muuttua (siirto toiseen lukuun). Koot ovat mitattuja (merkkiä) tai kartoituksen 14.10. arvioita.

| # | Kohta | Koko | Ongelma | Ehdotus |
|---|---|---|---|---|
| R1 | Kaikki "Loki: … #OTSIKKO, #OTSIKKO" -viiterivit (55 kohtaa, 399 otsikkoviitettä) | noin 30 600 | Päätöshistoriaa Raamatun sisällä | Yksi tiedostoviite per luku; muuta testi (ks. luku 2). Ei sisältöä katoa, loki säilyy. |
| R2 | 0.11 loppu: "KARSINTA 0.11 …" -otsikkoketju (JUNAT JA TESTAUS … KÄSKYT, NICE JA JUMI, HUOLTO) | 2 400 | Pelkkä luettelo lokiotsikoista | Siirrä lokiviitteeksi lukuun 7/10, poista luettelo |
| R3 | 0.11 TYÖTAPA JA SESSIOT kokonaisuutena | 49 000 | 85 aihetta yhdessä kohdassa, sisältää kertaraportteja (esim. "15.10. tilinvaihto nosti PT:n kontekstin 8 %:sta 50 %:iin", orpo Unity kaatoi VS:n), päivämäärästä riippuvia tiloja (SIMU NYT, KÄÄNNÖS NYT, LUKKO NYT, LUKKO VAPAA, SIMU VAPAA) | Jaa lukuihin 7, 9, 10, 12. TILAT (NYT/VAPAA) pois: tila on Asemataulussa ja lukkotiedostossa, ei Raamatussa. Kertaraportit lokiin. Käytännöt säilyvät (SITOVA, säilyy). |
| R4 | 0.11: VANHENTUNEET OHJEET, OMA NOLLAUS vs. NOLLAUSRAJAT ROOLEITTAIN vs. NOLLAUSRAJAT LIUKUMINA vs. NOLLAUSRAJA 35 | noin 4 000 | Sama asia neljässä versiossa, osa kumottu | Yksi voimassa oleva taulukko (liukumat pehmeä-kova). Muut lokiin. |
| R5 | 0.11: ASEMATAULU VANHA, ASEMATAULUN BOOST-NAPPI / BOOST-NAPPI ASEMATAULULLE (kaksi kertaa), ASEMATAULUN PÄIVITYSRYTMI JA PT, PÄIVITYSRYTMI JA BOOST | noin 5 000 | Toisteisia ja keskenään ristiriitaisia | Yhdistä yhteen "Asemataulu"-kohtaan lukuun 7; osoitteet pois (ne ovat F/asemataulu/osoitteet.md:ssä: yksi tieto, yksi paikka) |
| R6 | 0.11: roolien kansiot ja mallit -lista, session id:t | 2 500 | Kopio osoitekirjasta ja tilinvaihto.md:n taulukosta | Poista lista; viite osoitekirja.md. Id:itä ei Raamattuun. |
| R7 | 0.11: TILINVAIHDON TARKISTUSLISTA, SESSIOIDEN LUONTI ILMAN OMISTAJAA, ENSISIJAINEN KAAVA, UUSI TILI TARKISTAA | noin 3 000 | Toistaa docs/tilinvaihto.md:tä | Luvun 12 yksi viite + tämän luonnoksen tarkistuslista (kohta 5); menettely vain tilinvaihto.md:ssä |
| R8 | 0.14 NATIIVI PELI ETUSIJALLE | 51 000 | 55 aihetta; sekaisin ulkoasu (yläpalkki, valikko), pelisuunnittelu (saapuminen, lento), tekniikka (lämpö, 40 FPS), sisältö (Alankomaat, Taidehalli), kuvaparit ja kertaraportit (peruskartan reseptit 25.-26.9., JPEG 90) | Jaa lukuihin 2, 4, 6, 10, 11. "UUSIA LINSSEJÄ EI ALOITETA ENNEN PARITEETTIA", NATIIVI ON MALLI, VAIN EUROOPPA, LATAUS SAMA, TÄYSI TOIMINTOPARITEETTI: SITOVA, säilyy. Reseptit ja päivämääräiset korjauslistat (VÄRILLISET LEVIÄMISREITIT KORJATAAN, ALANKOMAAT ENSIN) lokiin. |
| R9 | 0.14 "KUMOAA 24.9.2026", "AVAUSTEKSTIN PAIKKA KUMOTTU", "WEB ON MALLI" (kumottu) | arvio 3 000 | Kumottu ja korvaava teksti vierekkäin | Poista kumotut; kumoutumishistoria lokiin |
| R10 | 0.8 HISTORIALLISET KOHTEET: OLAVINLINNA TAUOLLA, OLAVINLINNA TAUOLLE VIIDEN TILAN JÄLKEEN, OLAVINLINNAN PELIN TOTEUTUS, KEHITYKSEN NOPEUTUS | noin 6 000 | Tauolla oleva työ ja toteutusraportti | Yksi rivi "OLAVINLINNA TAUOLLA, ehto jatkaa: …"; toteutus siirretään docs/-dokumenttiin, historia lokiin. Vision SITOVA kohta (ensimmäinen persoona, ei opeteta pelin aikana) säilyy. |
| R11 | 0.5 ÄÄNET: SOUNDLY PRO, TOISTAISEKSI EI OSTOJA, TRIPO-MALLIEN LATAUS, SUOJATUT VALAISTUKSET, PEKING JA SUOJATUT TEOKSET (päällekkäisiä) | noin 3 500 | Äänen, mallien ja lisenssien säännöt samassa kohdassa; suojattujen teosten sääntö kolmeen kertaan | Yksi "Suojatut teokset" -kohta lukuun 11, yksi "Maksulliset lähteet ja ostot" -kohta lukuun 11; äänisäännöt lukuun 5 |
| R12 | Osio 10 Viisas Pöllö: 10.0 otsikkomerkintä, 10.21-10.33 (Pöllö on tauolla tai kumottu: PÖLLÖ MUKANA ALUSTA, PÖLLÖ ON AARRE, KALEVALAINEN KEHYS, PUHEKUPLA, VALMISKYSYMYKSET ym.) | noin 4 250 | Kumottu, Pulu tuuraa | Jätä luvun 2 alle yksi kohta "Viisas Pöllö: tauolla, ehto"; loput lokiin |
| R13 | Osio 10 muut kohdat (karttapallo, etusivu, linssien yhteiset säännöt, Keksinnöt, Ihmisen matka, äänet, Pulu, luentakuvat, lehdet, kehittäjätila, Mac Studio) | noin 46 000 | Väärässä osiossa (otsikko "Viisas Pöllö") | Ei poistoa vaan siirto lukuihin 2, 5, 6, 12; päällekkäiset osat (äänet 10.9 vs. 16, linssit 10.5 vs. 9) yhdistetään |
| R14 | Osio 9 pienet linssikohdat (9.7-9.18: LINSSEJA EI TAUOTETA, KYTKETÄÄN VAIN MATKALAUKUSTA, ideapankit, KAMERA-AJOT, AIKAJANA-AJO, LAVALINSSI) | noin 1 900 | Toisteisia yleisperiaatteita, jotka ovat myös 10.5 ja 13.14 | Yhdistä "Linssit: yleiset säännöt" -kohtaan (luku 2). LINSSIT KOKO MAAILMAN: SITOVA, säilyy. |
| R15 | Osio 13: 13.1 "TÄMÄN OSION KOHDAT 13.9.-20.9.", 13.17 viite "TYÖTAPA JA SESSIOT: ks. …", 13.18-13.25 yhden rivin jämät | noin 2 000 | Metarivit ja osoittimet | Poista; osoittimet korvataan luvun sisällysluettelolla |
| R16 | Osio 6 kohta 22 "EI ENÄÄ VOIMASSA", 6.3 SÄHKETEHTÄVÄ (vaihtoehto) | noin 1 600 | Historia/vaihtoehto | Lokiin / luvun 2 alle jos käytössä |
| R17 | Osio 17 kuvat: SEITSEMÄN KUVAVAIHTOEHDON RAJAUS, ChatGPT-ikkunan ja kuvamallin ohjeet, 17.18 (rivi "API-avaimia ei koskaan repoon" toistuu 3 paikassa) | noin 3 000 | Päällekkäinen luvun 11 ja 0.12:n kanssa | Yhdistä lukuun 11; toisteinen API-avainsääntö kerran (SITOVA, säilyy) |
| R18 | Osio 18-25 pienet osiot (visio, talous, poistetut ideat ym.) | noin 11 000 | "Visio"-kohdat ja jo toteutuneet ideat | Poistetut ideat: lokiin; muut lukuun 1/2 |
| R19 | Rivinjatkot ja tavukulutus ("\n          + '" noin 3 500 kertaa) | noin 50 000 | Ei sisältöä, vain muotoilu | Kirjoita kohta yhdeksi merkkijonoksi; testit lukevat oliota, ei rivejä |
| R20 | Päivämäärä- ja kellonaikamerkinnät joka virkkeessä ("omistaja 14.10.2026 klo 22.4x, kortti …") | arvio 30 000 | Päätöshistoriaa, ei sääntöä | Lähde ja päivämäärä yhdelle riville kohdan perään ("Päätös: omistaja 14.10.2026, loki #…"); sanatarkat sitaatit vain lokiin |

Yhteensä (päällekkäiset laskuissa kerran, arvio): karsittavaa ja siirrettävää lokiin noin 150 000-190 000 merkkiä (34-43 % tiedostosta) kun 14.10. kartoituksen luvut (sisältö 120-140 kt, loki 25 kt, rivitys 25-50 kt) yhdistetään; tämän päivän mittauksella pelkät lokiviitteet 30,6 kt, KARSINTA-ketju 2,4 kt, Pöllön kumotut 4,3 kt, rivitys noin 50 kt. Uusi koko noin 250-290 kt.

Varoitus: ennen kohtien R1, R19 ja R20 toteutusta sitaatit lokiin vain, kun lokissa on jo sanatarkka teksti (TARKISTA grepillä `docs/raamattu-loki/` ennen poistoa). Jos sitä ei ole, kirjaa ensin loki (node tools/raamattu-kirjaa.mjs), vasta sitten tiivistä.

SITOVA, säilyy (ei poisteta eikä sisältöä muuteta; vain sijainti): agenttisääntö (vain Opus ja Sonnet), VAIN EUROOPPA ja linssien poikkeus, LATAUS SAMA KAIKILLA VERKOILLA, NATIIVI ENSIN, AIKA = nykyaika, EI SAAVUTETTAVUUSOHJEITA, EI VARATEKSTEJÄ, UUSIA ÄÄNIÄ EI GENEROIDA ILMAN LUPAA ja SUOMI LUKITTU, MAKSULLISET LÄHTEET/EI OSTOJA, UI-POHJAT ja VALMIIN MÄÄRITELMÄ, TYÖSKENTELYTAVAT AINA RAAMATTUUN, OMISTAJA PYYSI JULKAISUA, YKSI JUNA, TESTAUS VAIN AUTOMAATTISIN, EI TESTEJÄ JUNAAN, KK:n välittämä päätös on omistajan päätös, OMISTAJALLE VAIN SUOMEKSI/VAIN OLENNAINEN, NIMEN KAKSI TASOA ja PELIN NIMI, Perustuslain viisi pilaria, kuvat PD/CC ja ämpäri, API-avaimia ei repoon.

## 4. Yhtenäiset tuotanto- ja testauskäytännöt (luonnosteksti lukuihin 7-10 ja 5)

Kaikki alla oleva on voimassa olevaa linjausta nykyisestä Raamatusta (päivämäärät lokissa). Teksti korvaa hajanaiset kohdat; kunkin rivin lähde on mainittu jotta Päätoimittaja voi tarkistaa.

TUOTANTOPUTKI (luku 7)
1. Yksi tuotantoketju: omistaja -> Keskustelukanava -> Päätoimittaja -> roolit. Omistaja puhuu vain Keskustelukanavalle; KK:n "OMISTAJAN PÄÄTÖS klo …" on omistajan päätös.
2. Jokaisella roolilla oma checkout (/Users/Shared/Claude/Matkakirja-<rooli>) ja oma worktree (`tools/uusi-worktree.sh <rooli> <aihe>`, poisto `--poista`); ei koskaan kotihakemistoon, ei poistoja oman työtilan ulkopuolelta.
3. Agentit vain Opus ja Sonnet, parvina saa; Fable-mallia ei koskaan agenttina. Codex saa Solia, Terraa ja Lunaa.
4. Roolin aloitus: lukulista (LUE ALUSSA enintään 5, ÄLÄ LUE), tavoite alle 8 % kontekstista; luovutus enintään 60 riviä; nollaus kun luovutus on pushattu ja Postivahti tai PT pyytää.
5. Viestit PT:lle: vain valmis erä, jumi tai kysymys, enintään 8 riviä; viestiraja täynnä -> varakanava send_message session-id:llä heti.
6. Omistajalle: vain suomeksi, vain olennainen; kysymykset kortteina Keskustelukanavassa; omistajan toimet "## TOIMI TARVITAAN" + yksirivinen komento.
7. Operatiiviset asiat (järjestys, resurssit, vuorot) päättää työnjohto itse; kysytään vain lupaa vaativat.
8. Uusi työtapa kirjataan samassa vuorossa Raamattuun luvun 7 oikealle paikalle (TYÖSKENTELYTAVAT AINA RAAMATTUUN); lopetettu poistetaan.

JULKAISU (luku 10)
9. Juna lähtee vain merkinnällä "OMISTAJA PYYSI JULKAISUA"; TF enintään 2/pv. Auki on yksi juna kerrallaan; kaikki kuitattu kerätään siihen.
10. Versionumero: `git fetch origin main` juuri ennen valintaa; sessiot julkaisevat rinnakkain. Julkaisukaava docs/roolitus.md:ssä.
11. Käännösvuorot ja simulaattorivuorot: lue linjan lukko ensin; lukossa olevaa ei tapeta; käännösvaihto vain odottajalle; simulaattoreita vain tarvittaessa; hiljainen tunti (omistaja käyttää Macia) -> ei testejä eikä agentteja.
12. Vihreä PR kaavan mukaan ilman korttia; docs/md-PR ei aja CI:tä (paths-ignore), merge suoraan.
13. Huomisen työt tehdään huomenna; ei aikaistuksia, vaikka työ olisi 100 %:ssa.

TESTAUS JA LAADUNVARMISTUS (luku 9)
14. Ennen junaa vain automaattiset testit (npm-testit, unity-tarkistus, EditMode/PlayMode) ja käännös. Ei simu-, muisti- eikä todistusajoja junaan; kuvat ja videot vain omistajan pyynnöstä (silloinkin tarkistus täysikokoisena).
15. Vika toistetaan ennen korjausta; vanhoja appeja ei rikota; hyväksytyt mallit talteen pysyvästi.
16. Merge-portti: CI vihreä + testi `tests/raamattu-loki.test.mjs` (Raamatun koko alle 450 KiB) ja `tests/dokumentit.test.mjs` (ohjekartta).
17. Omat testiapit enintään 2 uusinta (+ käytössä oleva); edellinen pois kun uusi varmistettu.

SISÄLTÖ JA LISENSSIT (luku 11)
18. Kuvat vain PD/CC, lisenssi aina rajapinnasta, tarkistus Commonsista; valokuvat ja kaikki uusi media ämpäriin, ei repoon; API-avaimet ei koskaan repoon eikä lokiin; ämpäri ei ole jakelua.
19. Maksulliset lähteet sallittu kun nopeuttavat tai parantavat laatua, mutta ostot vain omistajalta ("Ei osteta mitään vielä"). Tripo: peliin hyväksytyt mallit saa ladata; roolin lupaikkuna vain omistajalta.
20. Suojatut teokset: yksi sääntö (ks. R11), noudatetaan kaikissa jäljennöksissä ja havainnekuvissa.
21. Uusi sisältö vain Eurooppaan; linssit koko maailma. Kartta nykyajassa, estetiikka vanha. Lataus sama kaikilla verkoilla.

ÄÄNI JA GENEROINTI (luku 5) -- kovin kustannusriski
22. UUSIA ÄÄNIÄ EI GENEROIDA ILMAN OMISTAJAN LUPAA: määrän ja tekstit päättää omistaja; kertojaäänillä pysyvä lupa.
23. SUOMI PAKOTETTUNA JOKAISESSA suomenkielisessä äänigeneroinnissa, kaikilla malleilla ja työkaluilla, myös aikaleimaversiot: `language_code: "fi"` (apuri `tools/elevenlabs-kieli.mjs`; testi `tests/eleven-kielikoodi.test.mjs`). Malli joka ei tue kielikoodia hylätään virheellä, ei oletuskielelle. Ääniportin ehtona "kieli määritelty suomeksi".
24. Ennen koko erää ajetaan yksi lyhyt koe (kielikoodi, nimet, ääntäminen), vasta sitten massa; koko erää ei ajeta uudelleen virheen takia ilman PT:n lupaa. (UUSI ehdotus, omistajan vahvistettava.)
25. Äänet PCM:nä, pakkaus kerran; dialogit yhtenä ottona; ei äänitiedostoja repossa, vain ämpärissä; lukijaääni William, ei konelukijaa.

Todennus 19.10. (origin/main): testi tests/eleven-kielikoodi.test.mjs on olemassa ja skannaa generointityökalut. Kielikoodi on kaikissa puhegeneraattoreissa paitsi tools/pulun-historia.mjs (kutsuu ElevenLabsia ilman language_code/kieli-apuria; tarkista onko puhetta) ; musiikki- ja tehosteskriptit eivät puhu (ei vaadi). Uusi puhegenerointiskripti ilman kielipakotusta ei mene mergeen.

## 5. Tilinvaihdon tarkistuslista (luonnos, luku 12; menettely docs/tilinvaihto.md)

Pohja: docs/tilinvaihto.md kohdat 0-8. Alla lisäksi asiat, jotka ovat unohtuneet tai joiden unohtuminen on kallista.
1. `claude auth status`: komentorivin tili = sovelluksen tili; tarvittaessa `claude auth login`.
2. Omistajan toimet yhdellä kortilla: Chrome, puhelimen Claude-sovellus, ympäristö Default (Network access Full, GitHub), tilin lisäosat, push-ilmoitukset pois.
3. Talteen ennen vanhojen tyhjennystä: luovutus + push, `tallenna-keskustelu.py` PT:lle ja KK:lle.
4. Sallinnat ja hookit: `bash tools/tyotavat/palauta-sallinnat.sh`, `asenna-viestiraja-hook.sh --tarkista`; viestirajan varakanava (mcp__ccd_session_mgmt__send_message) latautuu ToolSearchilla.
5. Rooli-sessiot tilin roolitaulukon mukaan: malli, effort (PT:n oma on katto), nimi "Rooli (malli, effort)", lupatila, RC.
6. Session id:t vain osoitekirjasta; `paivita-idt.mjs` ajaa kaikki tiedostot.
7. Asemataulu tilin omana kopiona + osoite osoitteet.md:hen.
8. ÄÄNET: tarkista että `tests/eleven-kielikoodi.test.mjs` menee läpi ja jokainen puhegeneraattori lähettää `language_code: "fi"`. Ennen yhtäkään äänierää: lupa omistajalta, 1 lyhyt kuuntelutesti. (Louvren alku äännettiin 13.10. ranskan aksentilla ilman pakotusta.)
9. GENEROINTILUPA: uusi tili ei peri lupia; vain kertojaäänillä on pysyvä lupa. Kaikki muu generointi kysyy omistajalta (määrä ja tekstit).
10. VAIN EUROOPPA, AIKA = nykyaika, LATAUS SAMA KAIKILLA VERKOILLA, EI SAAVUTETTAVUUSOHJEITA, EI OSTOJA: lue luku 1 ja tämän listan sitovat linjaukset; älä tarjoa niiden vastaisia ehdotuksia.
11. Julkaisu: "OMISTAJA PYYSI JULKAISUA" -sääntö, yksi juna, ei testejä junaan; uusi tili ei aloita omaa junaa.
12. UI-POHJAT: puuttuva pohja -> kysy PT:ltä, joka kysyy omistajalta; omaa ratkaisua ei tehdä.
13. Avaimet: ei kysytä omistajalta (Raamattu, MAC STUDIO: avaimet); ei repoon eikä lokiin.
14. Macin tarkistus: `launchctl list | grep -i matkakirja`, `peili.sh --tarkista`, `tarkista-tyotilat.sh`.
15. Silmukat ja vahdit uusitaan (cron 7 vrk, Monitor ODOTTAJAVAHTI, Postivahdin ScheduleWakeup).
16. Muisti (MEMORY.md) ja ~/.claude/CLAUDE.md siirretään sellaisenaan; tarkista että pysyvät linjaukset (viestiraja, nollauslupa) ovat voimassa.
17. Tilinvaihdon jälkeen ensimmäinen työ: lue Raamatun luvut 1, 5, 9, 10 (kuvat/äänet/testaus/julkaisu), ei muuta ennen kuin ne on luettu.
18. `node tools/tyotavat/tilinvaihto-valmis.mjs` palauttaa 0; rivi KK:lle "Tilinvaihto valmis: N roolia, taulu <osoite>".
19. Kirjaa tilinvaihto lokiin (`node tools/raamattu-kirjaa.mjs "TILINVAIHTO …"`), ei Raamattuun.
20. PT luovuttaa ja nollautuu heti kun sessiot ja Asemataulu ovat valmiit.

## 6. Yksi tieto, yksi paikka: miten uusi linjaus kirjataan

1. Kysy ensin: onko tämä (a) pysyvä sääntö, (b) tila, (c) menettely vai (d) päätöshistoriaa?
   - (a) pysyvä sääntö -> Raamatun luku, jonka nimike vastaa aihetta (luku 2 alta). Yksi aihe = yksi kohta; uusi linjaus korvaa vanhan samassa kohdassa. Ei toista kohtaa, ei "uusin voittaa" -päällekirjoitusta.
   - (b) tila (juna auki, lukko, kuka tekee mitä, osoitteet, id:t) -> Asemataulu / osoitekirja / lukkotiedosto; ei Raamattuun.
   - (c) menettely vaiheittain (tilinvaihto, nollaus, julkaisu) -> docs/-dokumentti, jonka Raamatun ohjekartta (luku 13) mainitsee; Raamattuun vain sääntö ja viite.
   - (d) päätöshistoria, sanatarkat sitaatit, kellonajat, kumotut versiot -> docs/raamattu-loki/ (`node tools/raamattu-kirjaa.mjs "OTSIKKO" "teksti"`).
2. Ennen kirjausta: `grep -n "<avainsana>" js/tyohuone-raamattu.js` ja `grep -rn` loki. Jos aihe on jo olemassa, muokkaa sitä; jos se on väärässä luvussa, siirrä.
3. Kohtamuoto: ISOILLA KIRJAIMILLA otsikko, yksi virke sääntö, "Päätös: omistaja <pvm>, loki #OTSIKKO." Ei kellonaikoja eikä sitaattia Raamatussa.
4. Vain Päätoimittaja kirjoittaa Raamattuun. Roolit lähettävät "KIRJAA: luku X, ehdotettu teksti" -rivin PT:lle.
5. Kumoaminen: vanha kohta poistetaan (ei jätetä "kumottu"-merkittynä), kumoamisen syy ja vanha teksti lokiin.
6. Jokaisella luvulla yksi omistaja-rooli (docs/vastuukartta.md); luku, jota ei ole kartalla, ei ole ohje (tests/dokumentit.test.mjs valvoo).
7. Sitova linjaus saa merkinnän SITOVA ja päivämäärän; sitovan linjauksen poisto tai muutos vaatii omistajan kortin.
8. Koon vartija: tests/raamattu-loki.test.mjs (alle 450 KiB). Uudistuksen jälkeen tavoite alle 300 KiB; lisäys ilman vastaavaa karsintaa ei mene läpi samassa luvussa.
9. Ennen jokaista uutta junaa/tilinvaihtoa PT ajaa tarkistuksen: sama sääntö ei esiinny kahdessa luvussa (`grep -c` avainsanalla).

## Seuraavat askeleet (PT:lle)
- Vahvista luku 2 jaotus omistajalta kortilla (yksi suositus: ota käyttöön kaikki 14 lukua).
- Toteutus ajoissa: (1) rivitys ja lokiviitteet (testimuutos, ei sisältömuutosta), (2) 0.11 ja 0.14 jako lukuihin, (3) osio 10 purku, (4) pienet osiot yhdistetään.
- Kohta 4.24 (koe ennen eräajoa) ja 4.16-17 ovat uusia ehdotuksia, eivät nykyistä linjausta.
