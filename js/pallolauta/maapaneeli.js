/*
 * MAAN PERUSTIEDOT JA LISÄÄ-VALIKKO — KARTTAAN KIINNITETTYNÄ
 * (karttauudistus, erä 3; suunnitelma
 * docs/raportit/karttauudistus-suunnitelma-pallo-20260913.md luvut 3.0
 * ja 3.2).
 *
 * === MITÄ OMISTAJA PYYSI ===========================================
 *
 * Raamattu, KARTTAUUDISTUS (13.9.2026): *"Maan perustiedot voisivat
 * olla pysyvasti auki ja nakyvissa ... ja plus ikoni muutetaan lisaa
 * napiksi, josta aukeaa oikealle napin paikalle ja sivuille ja alas
 * levittyva varikoodattu valikko: historia, ruoka, kulttuuri, urheilu,
 * jne. Eli ne mitka otsikot ovat talla hetkella kullakin maalehdella jo
 * olemassa. Niita painamalla maalehden kyseinen sivu aukeaa."*
 *
 * Ja PÄÄTÖKSET 2 kohta 2, joka siirsi kalusteen nurkasta kartalle:
 * *"maan tiedot, lisaa-valikko, nostot ja muut elementit KIINNITETAAN
 * KARTTAAN (karttakoordinaatit, skaalautuvat zoomatessa kuin painettu
 * kartta), maan reunan ulkopuolelle tai rajalle, ei ruutuun ...
 * Seuraukset: puhelimella pannataan paneelin luo; tekstin luettavuus
 * mitoitetaan uloimmalle zoomille."*
 *
 * === KOLME RATKAISUA, JOTKA TÄMÄ TIEDOSTO TEKEE ====================
 *
 * 1. ANKKURI ON MAANTIETEELLINEN, EI RUUTUKOHTA. Paneeli on yksi
 *    datum merkkikerroksessa (js/pallolauta/merkit.js `aseta`), jolla
 *    on `lat`/`lng` kuten kaupungin nimellä ja nostolla. Kirjasto
 *    liikuttaa sen pallon mukana; me emme kirjoita ruutupikseleitä
 *    kertaakaan. Sama kerros hoitaa myös pallon takapuolen
 *    (`.pallolauta-takana`).
 *
 * 2. PANEELIN KOKO ON KARTAN MITTA, EI RUUDUN. Paneelilla on kiinteä
 *    koko LAUDAN YKSIKÖISSÄ (`paneelinMitat`), ja ruutukoko seuraa
 *    kamerasta: `skaala = lautayksikköä_per_px × px_per_lautayksikkö`.
 *    Zoomatessa se siis kasvaa ja kutistuu kuin painettu kartta —
 *    juuri se, mitä päätös tarkoittaa. Ruutuvakioita ovat vain
 *    tyylitiedoston peruskoot, jotka tämä kerroin skaalaa.
 *
 *    MIKSI KIINTEÄ KOKO LAUDALLA EIKÄ KIINTEÄ OSUUS RUUDUSTA. Jos
 *    paneeli olisi esimerkiksi "aina 40 % ruudun leveydestä", se
 *    liukuisi kartan päällä zoomatessa — se on täsmälleen se ruutuun
 *    ankkurointi, josta päätös luopui.
 *
 * 3. KOKO JOHDETAAN MAAN LAATIKOSTA. Paneelin lautamitta tulee MAAN
 *    LAATIKOSTA (`maanLautalaatikko`), joka on myös saapumisrajauksen
 *    laatikko: paneeli on korkeintaan `LEVEYS_OSUUS` sen leveydestä ja
 *    korkeintaan `KORKEUS_OSUUS` sen korkeudesta. Kun kamera sovittaa
 *    laatikon (paneeli mukaan luettuna) ruutuun, paneeli saa aina
 *    saman osuuden ruudusta riippumatta siitä, onko maa Ranska vai
 *    Chile.
 *
 * === ERÄ 9: ENTINEN ASU, PALJON PIENEMPÄNÄ ==========================
 *
 * Omistajan pilottipalaute (13.9.2026 klo 17.50 UTC, kuvakaappaus
 * Ranskasta puhelimella, sanatarkasti): *"Vaihda maa juttu samaan kuin
 * mitä se on ollut tähän asti. Ainoa ero, että se on kiinteästi
 * paikallaan. Pitää olla paljon pienempi koko."*
 *
 * Erä 3 oli tehnyt paneelista oman kalusteensa: tiivis kaksipalstainen
 * lukuruudukko ja tekstinappi "Lisää". Omistaja ei pyytänyt uutta
 * kalustetta vaan VANHAN kalusteen kartalle. Kortin asu on siksi nyt
 * sama kuin nurkkataulussa ennen erää 3 (v1847, js/fokusmitat.js
 * `rakennaMaataulu` ja `.fokus-kartuutsi`):
 *
 *   - maan nimi versaalina ja harvennettuna, alleviivaus, ja sen alla
 *     maan oma nimi 1873-atlaksen asussa + aikakauden valtiomuoto
 *     (kartuutsin alarivi);
 *   - lukurivit YHTENÄ palstaparina (otsikko vasemmalla, arvo ja
 *     sijaluku oikealla) — ei erän 3 kaksipalstaista ruudukkoa;
 *   - kielirivi tervehdyksineen ja lippuineen viimeisenä, samalla
 *     datalla ja samoilla `.tervehdys`-tyyleillä kuin maalehdessä;
 *   - PALJAS PLUS (ei sanaa "Lisää") lukurivien vieressä, kuten
 *     nurkkataulun ainoa nappi.
 *
 * Valikko plussan takana on erän 3 oma, ja se jää sellaisenaan —
 * omistaja pyysi vain paneelin asun takaisin.
 *
 * MIKÄ EI PALANNUT, JA MIKSI. Nurkkataulu oli POHJATON (musteen
 * luettavuus tuli halosta ja erillisestä `backdrop-filter`-hunnusta).
 * Huntu on karttaruudun oma lapsi ruutukoordinaateissa, eikä se voi
 * seurata karttaan kiinnitettyä korttia; suodattimia ei myöskään saa
 * animoida (tests/rules.test.mjs, iOS-sääntö). Kortti pitää siis erän
 * 3 tumman pergamenttipohjan (`--overlay-card`) ja vaalean musteen,
 * ja typografia on nurkkataulun. Kirjattu raporttiin.
 *
 * === ERÄ 12: MAAKOHTAINEN ANKKURI, KATKEAMATON SKAALA, ISOMMAT
 * === SISENNYKSET ====================================================
 *
 * PÄÄTÖKSET 9 (omistaja 14.9.2026): *"siirra maainfo laatikko
 * biskajanlahden paalle. silla pitaa olla kiintea paikka ja koko. eli
 * koko pysyy karttaan verrattuna samana, suurenee zoomatessa ja
 * toisinpain. laatikolla saisi olla isommat sisennykset tekstille
 * (kehys liian lahella)."* Kolme muutosta, kukin omassa lohkossaan
 * alempana: `MAAPANEELIN_ANKKURIT` (Ranskalle Biskajanlahti),
 * `MAAPANEELIN_SKAALA_MAX` (katto ei enää katkaise pelialueella) ja
 * peruskoon kasvu tasan pehmusteen verran.
 *
 * === ERÄ 18: JOKA MAALLE OMA PAIKKA, PANEELI EI ESTÄ ELEITÄ, ========
 * === VALIKKO ALLEKKAIN ILMAN TAUSTAA ================================
 *
 * PÄÄTÖKSET 20-22 (omistaja 15.9.2026, työpöytä- ja puhelinkuvalla).
 * Kolme muutosta, kukin omassa lohkossaan:
 *
 *   20. JOKA MAALLE OMA ANKKURI. `MAAPANEELIN_ANKKURIT` ja
 *       `MAAPANEELIN_KAPEAT_ANKKURIT` eivät ole enää Ranskan pilotti
 *       vaan avoimia tauluja; Kreikka on toinen mitattu maa
 *       (Joonianmeri / Aigeianmeri).
 *   21. ELE MENEE KORTIN LÄPI KARTALLE. Kortin neljän tapahtuman
 *       `stopPropagation` on poistettu ja runko on
 *       `pointer-events: none` (css/styles.css .maapaneeli-kortti);
 *       vain plus-nappi ja valikon rivit ottavat napautuksen vastaan.
 *   22. VALIKKO ILMAN TAUSTAA, KATEGORIAT ALLEKKAIN. Tyyli on
 *       css/styles.css .maapaneeli-valikko; `sovitaValikko` pitää
 *       pystylistan ruudun sisällä myös vaakasuunnassa.
 *
 * === ERÄ 19: PANEELI TAKAISIN RUUDUN VASEMPAAN ALAKULMAAN ==========
 *
 * Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 28 (omistaja 15.9.2026 klo
 * 20.45 UTC, sanatarkasti): *"Palautetaan alkuperainen vasemman
 * alakulman maainfo mutta sailytetaan se plussasta avautuva valikko
 * (valikko tulee plussan paikalle ja kasvaa ylospain kahdessa rivissa
 * tiiviisti ladottuna."*
 *
 * KOLME ASIAA MUUTTUU, SISÄLTÖ EI YHTÄÄN.
 *
 *   1. PANEELI EI OLE ENÄÄ KARTAN DATUM. Kortti ei asu enää
 *      merkkikerroksessa (`merkit.aseta`) vaan OMASSA SÄILIÖSSÄÄN
 *      karttaruudun sisällä (`.maapaneeli-nurkka`), ankkuroituna
 *      ruudun vasempaan alakulmaan. Zoomi ja vieritys eivät liikuta
 *      sitä eivätkä muuta sen kokoa.
 *   2. MITTAKAAVA TULEE RUUDUSTA, EI KAMERASTA (`nurkanSkaala`).
 *      Kortin peruskoko on yhä 104 × 82 css-px ja koko sisältö sen
 *      omissa yksiköissä — vain kerroin lasketaan nyt ruudun koosta
 *      kerran, ei kameran korkeudesta joka kehyksessä.
 *   3. VALIKKO KASVAA YLÖS KAHDESSA SARAKKEESSA (`sovitaValikko`),
 *      koska kortti on ruudun alalaidassa: alaspäin ei ole tilaa.
 *      Plus muuttuu auki ollessaan sulkumerkiksi paikallaan.
 *
 * MIKÄ KUMOUTUU. PÄÄTÖKSET 7:n Biskajanlahti-ankkuri ja PÄÄTÖKSET
 * 20:n maakohtaiset ankkurit eivät enää sijoita mitään; taulut
 * (`MAAPANEELIN_ANKKURIT`, `MAAPANEELIN_KAPEAT_ANKKURIT`) jäävät
 * paikoilleen, koska `paneelinAnkkuri` on yhä kartan oma mitta ja
 * tests/savukkeet lukevat sitä — mutta `luoMaapaneeli` ei kutsu sitä
 * enää lainkaan. PÄÄTÖKSET 21 (ele menee kortin läpi kartalle) SÄILYY
 * ja on nyt luonnostaan voimassa: säiliö ja kortti ovat
 * `pointer-events: none`, ja vain plus ja valikon rivit ottavat
 * napautuksen vastaan. PÄÄTÖKSET 22 (ei taustalaatikkoa) säilyy.
 *
 * === OLETUSPAIKKA: MAAN ALAPUOLELLA, RAJAN ULKOPUOLELLA ==============
 *
 * Ilman maakohtaista ankkuria paneeli on maan laatikon ETELÄREUNAN
 * KESKELLÄ, pienen raon verran sen ulkopuolella, ja riippuu siitä
 * alaspäin. Kolme syytä:
 *
 *   - Se on maan RAJAN ULKOPUOLELLA joka maalla, myös silloin kun maa
 *     ei ole suorakaide (laatikko on maan uloin mitta).
 *   - Se ei peitä maata eikä sen kaupunkeja — sivulle sijoitettu
 *     paneeli olisi uloimmalla zoomilla ruudun laidan yli, ja
 *     pystyruudulla juuri leveys on se mitta, joka loppuu ensin.
 *   - Saapumisrajaus voi ottaa sen mukaan yhdellä laatikon
 *     laajennuksella (`paneelinLaatikko`), jolloin paneeli on
 *     saapuessa kokonaan näkyvissä sekä puhelimella että työpöydällä.
 *
 * === NAPAUTUS KULKEE ELEMENTIN KAUTTA (poikkeus, perusteltu) ========
 *
 * Muut merkit ovat `pointer-events: none`, ja osuma lasketaan pallon
 * napautuksesta lähimpään merkkiin (js/pallolauta/merkit.js). SYY ON
 * TUPLAKUTSU: kaksi reittiä samaan `doMove`en. Paneelilla sitä syytä ei
 * ole — se ei liiku nappulaa eikä valitse kohdetta, vaan avaa lehden —
 * ja siinä on TOISTAKYMMENTÄ eri painiketta muutaman pikselin päässä
 * toisistaan. Yksi 44 px:n osumasäde yhteen pisteeseen ei voisi
 * erottaa niitä. Siksi kortti ottaa oikeat DOM-napautukset ja pysäyttää
 * eleen itseensä, jottei kartta ala panoroida napin alta.
 */
import { MAA_KATEGORIAT } from '../packs/maa-kategoriat.js';
import {
  kieliOsat, maanNimi, maanRivit, maapaneeliKartassa, projisoiLaudalle,
} from '../fokusmitat.js';
import { PALLO_LAUTA } from '../pallo.js';
import { FOKUS_MAANIMET } from '../packs/fokus-grc.js';

/**
 * Kortin peruskoko tyylitiedostossa (css .maapaneeli-kortti).
 *
 * ERÄ 11: PUOLET LEVEYDESTÄ JA PUOLET KORKEUDESTA (190×148 → 95×74),
 * eli PINTA-ALA NELJÄSOSA. Raamattu, PÄÄTÖKSET 7 (omistaja 14.9.2026):
 * *"maainfossa pitaa olla nelja kertaa pienempi"*, tarkennettuna
 * kysymyskortilla *"Koko paneeli neljasosaan"*.
 *
 * MOLEMMAT LUVUT ON PUOLITETTAVA YHDESSÄ OSUUKSIEN KANSSA. Paneelin
 * LAUTAMITTA on `LEVEYS_OSUUS × laatikko.w` — peruskoko px:nä ei
 * esiinny siinä kaavassa lainkaan, vaan se määrää vain `perusta`n eli
 * ruutuskaalan. Jos pelkkä px-koko puolitettaisiin, kortti kutistuisi
 * ruudulla mutta kasvaisi kartalla (skaala kaksinkertaistuisi), ja
 * jos pelkkä osuus puolitettaisiin, kortti pysyisi ruudulla samana.
 * Kun MOLEMMAT puolitetaan, `perusta` (0,175/95 = 0,35/190) pysyy
 * täsmälleen ennallaan — ruutuskaala on sama kuin ennen erää, ja
 * kortti on ruudulla tasan puolet leveä ja puolet korkea.
 */
/*
 * ERÄ 12: SISENNYS KASVAA, TEKSTI EI KUTISTU (PÄÄTÖKSET 9 kohta 5,
 * omistaja 14.9.2026: *"laatikolla saisi olla isommat sisennykset
 * tekstille (kehys liian lahella)"*).
 *
 * Kaksoisviivakehyksen SISÄREUNA on 3,74 px kortin reunasta (ohut
 * 0,494 + väli 1,349 + paksu 1,9, js/kasinpiirto.js), ja sisuksen
 * pehmuste oli 4 / 4,5 px — tekstin ja sisemmän viivan väliin jäi
 * 0,26 px pystyssä ja 0,76 px vaakassa. Pehmuste KAKSINKERTAISTUU
 * (8 / 9 px), jolloin väli on 4,26 / 5,26 px.
 *
 * KORTTI KASVAA TASAN PEHMUSTEEN VERRAN, EIKÄ TEKSTIÄ TIIVISTETÄ.
 * Sisällön ala pysyy täsmälleen entisenä (86 × 66 px), joten kortti on
 * 95 + 9 = 104 ja 74 + 8 = 82 px. PÄÄTÖKSET 7 kieltää fonttien,
 * värien, sisällön ja viivamittojen muuttamisen — mikään niistä ei
 * muutu.
 *
 * OSUUDET KASVAVAT SAMASSA SUHTEESSA, jotta `perusta` (lautayksikköä
 * per css-px) pysyy ennallaan: 0,175 × 104/95 ja 0,21 × 82/74. Näin
 * TEKSTI ON RUUDULLA TÄSMÄLLEEN ENTISEN KOKOINEN joka zoomilla ja vain
 * kortin oma reunus levenee — juuri se, mitä omistaja pyysi.
 */
export const MAAPANEELIN_LEVEYS_PX = 104;
export const MAAPANEELIN_KORKEUS_PX = 82;
/**
 * KAKSI OSUUTTA MAAN LAATIKOSTA, JA TIUKEMPI VOITTAA (erä 9).
 *
 * Erässä 3 rajoja oli vain yksi ja puolikas: paneeli sai olla maan
 * laatikon LEVYINEN, ja korkeusosuus 0,35 leikkasi siitä Ranskalla
 * 443 lautayksikköä. Puhelimen ruudulla se oli mitattuna yli 300
 * css-pikseliä — omistajan kaappauksessa (13.9.2026 klo 17.50,
 * Ranska) paneeli vei ruudusta noin neljänneksen ja leikkautui
 * reunoista: *"Pitää olla paljon pienempi koko."*
 *
 * Nyt LEVEYSOSUUS on oma rajansa: paneeli on korkeintaan tämän verran
 * maan laatikon leveydestä. Koska kamera sovittaa juuri sen laatikon
 * ruutuun, osuus on samalla paneelin osuus RUUDUN leveydestä
 * pystyruudulla — erässä 9 Ranskalla 390 px:n ruudulla MITATTUNA 167
 * css-px ja työpöydällä 1400 px:n ruudulla 239 px.
 *
 * ERÄ 11 PUOLITTI MOLEMMAT OSUUDET (0,35 → 0,175 ja 0,42 → 0,21):
 * PÄÄTÖKSET 7 *"Koko paneeli neljasosaan"*. Osuus on se luku, joka
 * oikeasti määrää paneelin koon ruudulla (ks. peruskoon selitys yllä),
 * joten neljäsosa pinta-alasta syntyy juuri tästä. Mittaukset erän 11
 * raportissa docs/raportit/viesti-fable-kasinpiirto-20260914.md.
 *
 * KORKEUSOSUUS jää toiseksi rajaksi leveille ja matalille maille
 * (Venäjä, Kazakstan): ilman sitä paneeli olisi niillä maan laatikon
 * korkuinen. Ranskalla se ei sido — leveysosuus on tiukempi.
 */
/*
 * ══════════════════════════════════════════════════════════════════
 * PANEELIN LEVEYS ON KYMMENESOSA RUUDUSTA (omistaja 14.9.2026 klo
 * 17.55, puhelin: *"maa info edelleen liian iso"*; Fablen mitoitus
 * samana iltana)
 * ══════════════════════════════════════════════════════════════════
 *
 * MITTA ON LEVEYS RUUDULLA, EI TEKSTIKOKOJEN SUHDE. Erä 13 kalibroi
 * paneelin karttanoston tekstikokoon yhdellä ankkuriruudulla
 * (kerroin 0,696); omistaja katsoi tuloksen puhelimella ja sanoi sen
 * olevan yhä liian iso. Mitoitus tehdään siksi suoraan siitä, mikä
 * ruudulla näkyy: **paneeli saa viedä saapumisnäkymässä enintään
 * kymmenesosan ruudun leveydestä**. Saapuminen on uloin sallittu zoomi
 * (uloszoomauksen esto), eli se näkymä, jossa paneeli on suurimmillaan
 * suhteessa ruutuun — sisäänpäin kartta kasvaa paneelin mukana
 * (PÄÄTÖKSET 9 kohta 4), joten yksi raja riittää.
 *
 * MITATTU Chromiumilla 14.9.2026 (Ranska, pelaaja Pariisissa,
 * saapumisnäkymä; paneelin kortin `getBoundingClientRect().width`):
 *
 *   ruutu        kerroin 0,696 (erä 13)      kerroin 0,37 (tämä)
 *   390 × 844     64,6 px = 16,6 %            35,4 px =  9,5 %
 *   1400 × 900   161,6 px = 11,5 %            86,0 px =  6,2 %
 *
 * Puhelin on sitova mitta, ja MITTA ON KARTTARUUTU EIKÄ IKKUNA: 390
 * px:n laitteella karttaruutu on 374 px, joten katto on 37,4 px.
 * Kerroin 0,40 antoi 38,2 px ja 0,39 antoi 37,3 px — molemmat kiinni
 * katossa, ja saapumiskorkeus heilahtaa ajosta toiseen (mitattu
 * 0,428…0,452) ja sen mukana paneelin ruutukoko muutaman prosentin.
 * 0,37 jättää sen varan.
 *
 * KERROIN OSUU VAIN OSUUKSIIN (ja skaalan rajoihin). Peruskoko px:nä
 * ja jokainen tyyliarvo pysyy ennallaan, joten kirjainperheet,
 * lihavuudet, värit, sisältö (mm. SIJALUKU) ja sisennysten suhde
 * (erä 12) ovat merkilleen entiset — vain pienempinä. `perusta`
 * (lautayksikköä per css-px) kutistuu tällä kertoimella, ja sen mukana
 * sekä paneelin LAUTAMITTA että ruutukoko: ankkuri Biskajanlahdella ja
 * karttaan sidottu skaala pysyvät koskemattomina.
 *
 * TEKSTIKOKOJEN SUHDE EI KADONNUT, SE VAIN TULEE MUUALTA. Samana
 * iltana myös karttanoston kyltti sidottiin karttaan
 * (js/pallolauta/nostot.js KARTTANOSTON KYLTTI ON KARTAN MITTA), joten
 * paneelin leipäteksti ja noston kyltti skaalautuvat nyt SAMAN
 * kertoimen mukana: niiden suhde on vakio joka zoomilla. Sen mittaa
 * tools/savukkeet/savuke-nimikyltti.mjs (vartiot 4 ja 6).
 *
 * PUHELIMEN TEKSTI JÄÄ PIENEKSI (mitattu 2,95 px → 1,70 px). Se
 * kirjataan eikä korjata: PÄÄTÖKSET 7 kieltää fonttikoon alarajan ja
 * sisällön tiivistämisen, ja pienuus tulee saapumisnäkymän rajauksesta
 * (pystyruudulla Ranska jää kauas) — sama juuri kuin kaupungin
 * nimikyltillä. Jos omistaja haluaa paneelin tekstin isommaksi, se on
 * sisällön karsimista tai omaa mitoitusta, ei tämän kertoimen asia.
 */
/** Paneelin kokokerroin: leveys ≤ 10 % ruudusta saapumisnäkymässä. */
export const MAAPANEELIN_TEKSTIKERROIN = 0.37;
/*
 * ══════════════════════════════════════════════════════════════════
 * ERÄ 15: KATTO ON RUUDUN OSUUS SAAPUMISNÄKYMÄSSÄ, EI MAAN LAATIKON
 * OSUUS (PÄÄTÖKSET 17:n seuraus, mitattu 14.9.2026)
 * ══════════════════════════════════════════════════════════════════
 *
 * Erä 13 mitoitti paneelin MAAN LAATIKOSTA (`LEVEYS_OSUUS × laatikko.w`)
 * ja kalibroi kertoimen 0,37 niin, että Ranskassa saapumisnäkymän
 * leveys oli 390 px:n ruudulla 35,4 px (9,5 %) ja 1400 px:n ruudulla
 * 86 px (6,2 %). Kerroin oli siis sidottu SIIHEN saapumisrajaukseen,
 * joka silloin oli voimassa.
 *
 * PÄÄTÖKSET 17 (v1898) sovitti puhelimen pystyruudun saapumisnäkymän
 * KORKEUTEEN, jolloin kartta on puhelimella noin kaksi kertaa lähempänä
 * kuin ennen. Paneeli on kartan mitta (PÄÄTÖKSET 9), joten se kasvoi
 * samassa suhteessa: MITATTU 14.9.2026 Chromiumilla, Ranska, Pariisi:
 *
 *   ruutu          kortti saapumisessa      osuus kotelon leveydestä
 *   390 × 844       81,1 px                  21,7 %   ← katto 10 % rikki
 *   393 × 852       81,9 px                  21,8 %   ← katto 10 % rikki
 *   844 × 390       38,6 px                   4,7 %
 *   1400 × 900      85,9 px                   6,2 %
 *   2560 × 1352    133,2 px                   5,3 %
 *
 * KORJAUS ON SAMA MEKANISMI KUIN NIMIKYLTEILLÄ (v1885,
 * js/pallolauta/nimet.js NIMIKYLTIT KARTTAAN): vertailu on KUNKIN
 * LAITTEEN OMA SAAPUMISNÄKYMÄ (`lauta.saapumisenSkaala`, css-px per
 * lautayksikkö uloimmalla sallitulla zoomilla). Kortin ruutuleveys
 * saapumisessa on tasan `LEVEYS_PX × perusta × vertailuskaala`, joten
 * yksi jako antaa suurimman sallitun `perusta`n:
 *
 *   perusta ≤ KATTO_RUUDUSTA × kotelon leveys / (LEVEYS_PX × vertailu)
 *
 * EI LAITETUNNISTUSTA eikä ruutuun ankkurointia: raja lasketaan
 * kerran saapumisnäkymän mittakaavasta, ja siitä eteenpäin paneeli
 * skaalautuu kartan mukana kuten ennen (PÄÄTÖKSET 9 kohta 4). Katto
 * sitoo vain siellä, missä kartta on ruutuun nähden lähellä — mitatusti
 * pystypuhelimella; työpöydällä ja vaakapuhelimella laatikko-osuus on
 * yhä tiukempi, eikä mikään muutu.
 *
 * KATTO ON 9,5 % EIKÄ 10 %. Sama vara kuin kertoimella 0,37 erässä 13:
 * saapumiskorkeus heilahtaa ajosta toiseen muutaman prosentin, ja
 * savukkeen väite mittaa tasan 10 %:n kattoa.
 */
export const MAAPANEELIN_KATTO_RUUDUSTA = 0.095;
export const MAAPANEELIN_LEVEYS_OSUUS = 0.1916 * MAAPANEELIN_TEKSTIKERROIN;
export const MAAPANEELIN_KORKEUS_OSUUS = 0.2327 * MAAPANEELIN_TEKSTIKERROIN;
/** Rako maan laatikon reunan ja paneelin väliin, osuus laatikon korkeudesta. */
export const MAAPANEELIN_RAKO_OSUUS = 0.02;
/*
 * RUUTUSKAALAN RAJAT OVAT VAIN KEHITTÄJÄN MAAILMANÄKYMÄN VARALLA
 * (erä 12, PÄÄTÖKSET 9 kohta 4, omistaja 14.9.2026: *"silla pitaa olla
 * kiintea paikka ja koko. eli koko pysyy karttaan verrattuna samana,
 * suurenee zoomatessa ja toisinpain"*).
 *
 * ENNEN: yläraja 3 KATKAISI skaalautumisen kesken pelialueen. Mitattu
 * Ranskassa 14.9.2026: saapumisnäkymän skaala on työpöydällä 1,40 ja
 * puhelimella 0,63, ja lähin sallittu zoomi (kamera.korkeusMin) on
 * työpöydällä 14,8× ja puhelimella 9,0× sisempänä — skaala olisi siis
 * 20,7 ja 5,6. Katto 3 tuli vastaan jo parin zoomiportaan jälkeen,
 * ja siitä eteenpäin paneeli LIUKUI kartan päällä sen sijaan että
 * olisi pysynyt kartassa kiinni. Juuri sen omistaja näki.
 *
 * NYT: yläraja on 64 eli yli kolminkertainen pelialueen suurimpaan
 * tarpeeseen (20,7) — se ei voi enää sitoa pelissä, mutta pitää
 * kiinni siitä, ettei jokin rajaton tila (linssi, joka syrjäyttää
 * zoomirajat) kasvata korttia mielivaltaisesti. Alaraja 0,45 ei sido
 * pelialueella myöskään: uloin sallittu zoomi antaa puhelimella 0,60.
 * Se on kehittäjän maailmanäkymän varaus, jossa maakohtaista
 * zoomikattoa ei ole lainkaan.
 */
/*
 * ERÄ 13: MOLEMMAT RAJAT KERTYVÄT SAMALLA KERTOIMELLA. Rajat ovat
 * ruutuskaalan rajoja, ja ruutuskaala kutistui kertoimella 0,696 —
 * jos rajat jäisivät entisiksi, alaraja alkaisi SITOA puhelimen
 * saapumisnäkymässä (0,566 × 0,696 = 0,394 < 0,45) ja katkaisisi juuri
 * sen karttaan sidotun skaalan, jonka PÄÄTÖKSET 9 kohta 4 vaatii.
 */
export const MAAPANEELIN_SKAALA_MIN = 0.45 * MAAPANEELIN_TEKSTIKERROIN;
export const MAAPANEELIN_SKAALA_MAX = 64 * MAAPANEELIN_TEKSTIKERROIN;

/*
 * ══════════════════════════════════════════════════════════════════
 * ERÄ 20: NURKAN MITTAKAAVA KUMOUTUI — KALUSTEELLA ON RUUTUMITAT
 * ══════════════════════════════════════════════════════════════════
 *
 * Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 28 TARKENNUS 2 (omistaja
 * 16.9.2026 klo 10.45 UTC, iPad-kuva 27.8.2026 Kreikasta): maainfo
 * palaa siihen asuun, jossa EI OLE LAATIKKOA — vain maan nimi, ohut
 * viiva ja alarivi suoraan kartan päällä.
 *
 * ERÄSSÄ 19 kaluste oli yhä 104 × 82 css-px:n KORTTI, jonka koko
 * kirjoitettiin `transform: scale()`illa ruudun mitoista
 * (`nurkanSkaala`, katot 22 % / 58 %, rajat 1,4…3,2). Se oli
 * LAATIKON mitta: kortin koko sisältö oli mitoitettu kortin omiin
 * yksiköihin (nimi 6,5 px, lukurivi 3,5 px), ja vasta skaala teki
 * siitä luettavan. Kun laatikko poistuu, poistuvat sen mitatkin.
 *
 * NYT TYPOGRAFIA ON SUORAAN RUUTUPIKSELEISSÄ (css/styles.css
 * .maapaneeli-nimi-suomi ja sen mediakyselyt), ja ainoa ajossa
 * laskettu koko on otsikkorivien fonttikoko silloin, kun kaksi riviä
 * ei muuten mahtuisi ruudun leveyteen (`sovitaOtsikot`).
 *
 * MAAN LAATIKON MITAT JÄÄVÄT. `paneelinMitat` ja `paneelinAnkkuri`
 * eivät sijoita mitään (PÄÄTÖKSET 28), mutta `paneelinLaatikko` on yhä
 * saapumisrajauksen väljennys — tests/maakartuutsi.test.mjs vahtii sen
 * kutsua sanatarkasti, ja savukkeet lukevat tauluja vastakokeissaan.
 */

/**
 * MAALEHDEN AIHETUNNUS → KARTAN SYMBOLIPERHE.
 *
 * Väri EI OLE UUSI VÄRISKAALA vaan kartan oma (css/styles.css
 * `--sym-*`, Raamattu SYMBOLITAKSONOMIA): valikon rivit ja kartan
 * nostot puhuvat siis samaa kieltä, kuten suunnitelman luku 4.2
 * edellyttää. Uusia kirkkaita värejä ei tule yhtään.
 *
 * TAULU ON PERHEIDEN TAULU, EI OTSIKKOJEN LUETTELO. Maalehtien
 * aihetunnuksia on 114 maassa yli seitsemänkymmentä, ja niistä
 * suurin osa esiintyy kerran (`vuoret`, `keidas`, `sadut`, …).
 * Jokaiselle oma väri olisi sekä mahdoton ylläpitää että
 * merkityksetön; tässä ne palautuvat kahteentoista perheeseen, jotka
 * pelaaja jo tuntee kartalta. Tuntematon tunnus saa perheen `silma`
 * (nähtävyys) — TURVALLINEN TILA: uusi aihe näkyy valikossa heti,
 * väri vain ei ole vielä valittu.
 */
const AIHEEN_PERHE = {
  historia: 'historia', muinaisuus: 'historia', rauniot: 'historia',
  hetki: 'hetki',
  ruoka: 'ruoka', keittio: 'ruoka', herkut: 'ruoka',
  musiikki: 'kulttuuri', soittajat: 'kulttuuri', savel: 'kulttuuri',
  kuvataide: 'kulttuuri', taide: 'kulttuuri', elokuva: 'kulttuuri',
  juhlat: 'kulttuuri', huumori: 'kulttuuri',
  kirjallisuus: 'sana', kirjat: 'sana', runous: 'sana', sadut: 'sana',
  tarinat: 'sana', kansanperinne: 'sana', kielet: 'sana', kieli: 'sana',
  luonto: 'luonto', vuoret: 'luonto', aavikko: 'luonto', keidas: 'luonto',
  ranta: 'luonto', puutarhat: 'luonto', suot: 'luonto', vedet: 'luonto',
  saaret: 'luonto', kalliot: 'luonto',
  elaimet: 'elain', linnut: 'elain',
  meri: 'merenkulku',
  urheilu: 'urheilu',
  tiede: 'tekniikka', keksinnot: 'tekniikka', tekniikka: 'tekniikka',
  kasityo: 'kauppa', kasityot: 'kauppa', tekstiilit: 'kauppa',
  talous: 'kauppa', tupakka: 'kauppa', helmet: 'kauppa',
  rakennukset: 'kaupunki', kirkot: 'kaupunki', arki: 'kaupunki',
  tavat: 'kaupunki', perinteet: 'kaupunki', alkuperaiskansat: 'kaupunki',
  menovinkit: 'silma',
};

/** Aihetunnuksen symboliperhe; historian hetket tunnistetaan etuliitteestä. */
export function aiheenPerhe(id) {
  if (typeof id !== 'string' || !id) return 'silma';
  if (id.startsWith('hetki-')) return 'hetki';
  return AIHEEN_PERHE[id] ?? 'silma';
}

/**
 * Maan valikkorivit maalehden omasta taulusta — EI KOVAKOODATTUJA
 * OTSIKOITA. Sama taulu ja sama järjestys kuin `avaaMaalehti` latoo
 * sivunsa (js/lehti.js), joten rivin numero ja lehden sivu eivät voi
 * ajautua erilleen: rivi antaa lehdelle SIVUTUNNUKSEN, ei numeroa.
 */
export function maanAiheet(iso) {
  const osat = (MAA_KATEGORIAT[iso] ?? []).filter((osa) => osa?.id && osa?.nimi);
  /*
   * ARKI KATTAA TAVAT (Raamattu, MAALEHDEN INFOTAULU kohta 2, omistaja
   * 19.9.2026: päällekkäiset "Arki ja tavat" ja "Tavat" → yksi Arki).
   * Tavat-sivu jää lehteen sellaisenaan — sen id, nostot, tehtävä ja
   * sivunumerot (sähkelinkit) eivät muutu — mutta infotaulussa sillä ei
   * ole omaa merkkiä, kun maalla on Arki: sivu aukeaa Arjen perästä.
   */
  const onArki = osat.some((osa) => osa.id === 'arki');
  return osat
    .filter((osa) => !(onArki && osa.id === 'tavat'))
    .map((osa) => ({ id: osa.id, nimi: osa.nimi, perhe: aiheenPerhe(osa.id) }));
}

/**
 * Valtiomuoto ilman vuosilukua: FOKUS_MAANIMET kirjoittaa sen muodossa
 * "tasavalta v. 1873", ja infotaulun 1873-lohkossa vuosi on jo otsikossa.
 */
export function valtiomuoto1873(valtiomuoto) {
  return String(valtiomuoto ?? '').replace(/\s*v\.\s*1873\s*$/, '').trim();
}

/**
 * Paneelin mitat LAUDAN YKSIKÖISSÄ maan laatikosta.
 *
 * Kaava on yksi rivi: montako lautayksikköä yksi css-pikseli on.
 * Se otetaan siitä kahdesta rajasta, kumpi on tiukempi —
 * `LEVEYS_OSUUS` maan laatikon leveydestä tai `KORKEUS_OSUUS` sen
 * korkeudesta (ks. KAKSI OSUUTTA yllä).
 */
export function paneelinMitat(laatikko, { vertailuskaala = 0, ruutuLeveys = 0 } = {}) {
  if (!(laatikko?.w > 0) || !(laatikko?.h > 0)) return null;
  /*
   * KOLMAS RAJA: RUUDUN OSUUS SAAPUMISNÄKYMÄSSÄ (erä 15, ks. yllä).
   * Tuntematon vertailu (kehittäjän maailmanäkymä, laatikkoa ei ole
   * vielä luettu) jättää rajan pois — käytös on silloin entinen.
   */
  const kattoPerusta = vertailuskaala > 0 && ruutuLeveys > 0
    ? (MAAPANEELIN_KATTO_RUUDUSTA * ruutuLeveys) / (MAAPANEELIN_LEVEYS_PX * vertailuskaala)
    : Infinity;
  const perusta = Math.min(
    (MAAPANEELIN_LEVEYS_OSUUS * laatikko.w) / MAAPANEELIN_LEVEYS_PX,
    (MAAPANEELIN_KORKEUS_OSUUS * laatikko.h) / MAAPANEELIN_KORKEUS_PX,
    kattoPerusta,
  );
  if (!(perusta > 0)) return null;
  return {
    perusta,
    w: perusta * MAAPANEELIN_LEVEYS_PX,
    h: perusta * MAAPANEELIN_KORKEUS_PX,
    rako: MAAPANEELIN_RAKO_OSUUS * laatikko.h,
  };
}

/*
 * ══════════════════════════════════════════════════════════════════
 * MAAKOHTAINEN ANKKURI (erä 12; PÄÄTÖKSET 9 kohta 3)
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistaja 14.9.2026, sanatarkasti: *"siirra maainfo laatikko
 * biskajanlahden paalle"*. Ankkuri ei siis ole enää pelkkä laatikon
 * eteläreunan keskikohta, vaan maa saa halutessaan OMAN
 * KARTTAPISTEENSÄ — kuten vanhassa atlaksessa, jossa kartussi
 * ladottiin sille merenselälle, joka sattui olemaan tyhjä.
 *
 * PISTE ON LAT/LNG EIKÄ LAUTAYKSIKKÖ, koska se valitaan kartalta
 * (Biskajanlahti) eikä laatikosta. Muunnos tehdään samalla
 * `projisoiLaudalle`-kaavalla, jota koko lauta käyttää.
 *
 * ANKKURI ON PANEELIN YLÄREUNAN KESKIKOHTA (kortin `transform-origin`
 * on 50 % 0, ks. css .maapaneeli-kortti), joten kortti riippuu
 * pisteestä alaspäin ja levittyy siitä tasan sivuille.
 *
 * RANSKA OLI PILOTTI (PÄÄTÖKSET 9 kohta 1). Erästä 18 alkaen taulu on
 * avoin jokaiselle maalle (PÄÄTÖKSET 20), mutta rivi lisätään VASTA
 * MITATTUNA: maa, jolla ei ole riviä, pitää eteläreunan oletuksen.
 *
 * PISTE 45,9 N / 4,6 W on Biskajanlahden avovettä. Paneeli (Ranskalla
 * 94 × 74 lautayksikköä eli 2,8° × 1,6°) peittää siitä alaspäin
 * lat 44,3…45,9 N ja lng 6,0…3,2 W: Ranskan Atlantin rannikko on tällä
 * leveydellä noin 1,2 W ja Espanjan pohjoisrannikko 43,4 N, joten
 * kortti on kokonaan merellä kummankin maan ulkopuolella.
 */
/*
 * ERÄ 18: KREIKALLE OMA ANKKURI JOONIANMERELLE (Raamattu,
 * KARTTAUUDISTUKSEN PÄÄTÖKSET 20, omistaja 15.9.2026 työpöytäkuvalla:
 * *"tuon maan inforuudun sijoitteluun pitaisi miettia periaatteessa
 * jokaiselle maalle oma jarkevin paikka… Kreikassa esimerkiksi se
 * varmasti olisi tuon merikilpikonna noston vasemmalle puolelle meren
 * paalle"*).
 *
 * "RANSKA ON PILOTTI" EI ENÄÄ RAJOITA TAULUA. Päätös 20 kumoaa
 * eteläreunan oletuksen periaatteena: jokainen maa saa oman paikkansa
 * sitä mukaa kuin se on MITATTU. Kreikka on toinen mitattu maa, ja
 * loput 25 odottavat ehdotuslistalla (docs/raportit/
 * viesti-fable-paneeli-grc-20260915.md).
 *
 * MIKSI 37,8 N / 19,9 E. Ankkuri on kortin YLÄREUNAN KESKIKOHTA, joten
 * kortti riippuu siitä alaspäin ja levittyy tasan sivuille: Kreikassa
 * se peittää saapumisnäkymässä (1400 × 900) noin lat 37,2…37,8 N ja
 * lng 19,5…20,3 E eli Joonianmeren avovettä Kefalonian ja Zakynthoksen
 * LÄNSIPUOLELLA. Mitattu kolmesta ehdokkaasta (ks. raportin taulukko):
 * 25 näytepistettä, 0 maaosumaa (ei GRC, ALB, TUR, ITA eikä saaria),
 * ja kortti on merikilpikonna-noston (n. Kyparissian lahti) VASEMMALLA
 * puolella mitatun 115 px:n raolla — juuri se paikka, jonka omistaja
 * kuvasta osoitti. Kortti on kokonaan ruudulla eikä osu yhteenkään
 * nostoon, nimikylttiin, kaupunkimerkkiin, reittiin tai puluun.
 */
export const MAAPANEELIN_ANKKURIT = {
  FRA: { lat: 45.9, lng: -4.6 },
  GRC: { lat: 37.8, lng: 19.9 },
};

/*
 * ══════════════════════════════════════════════════════════════════
 * ERÄ 16: KAPEALLA RUUDULLA RANSKAN ANKKURI ON LYONINLAHDELLA
 * ══════════════════════════════════════════════════════════════════
 *
 * Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 18 (omistaja 15.9.2026):
 * pystypuhelimella — siis silloin kun saapumisnäkymä sovitetaan
 * KORKEUTEEN (PÄÄTÖKSET 17, v1898) — Ranskan maapaneelin ankkuri on
 * LYONINLAHDELLA Välimerellä Ranskan eteläreunan alla; työpöytä ja
 * vaakatila pitävät Biskajanlahden (PÄÄTÖKSET 9).
 *
 * MIKSI: korkeuteen sovitettu saapumisnäkymä rajaa ruudun Ranskan
 * PYSTYMITTAAN, jolloin maan itä- ja länsireuna jäävät ruudun
 * ulkopuolelle. Biskajanlahti on laatikon LÄNSIREUNAN takana, joten
 * paneeli olisi siellä saapuessa ruudun vasemmalla puolella näkymättä.
 * Lyoninlahti on laatikon ALLA ja lähellä sen X-keskilinjaa, joten se
 * on saapumisnäkymässä ruudulla — eikä silti maan päällä.
 *
 * VALINTA SEURAA SAMAA KUVASUHDE-EHTOA KUIN KORKEUSSOVITUS
 * (js/pallolauta/kamera.js `korkeuteenSovitettu`: ruudun kuvasuhde <
 * maan laatikon kuvasuhde pallolla) — EI LAITETUNNISTUSTA. Ehto
 * luetaan MAAN omasta laatikosta eikä paneelilla laajennetusta, jottei
 * valinta söisi omaa häntäänsä.
 *
 * PISTE 42,6 N / 3,77 E on Lyoninlahden avovettä (mitattu
 * tools/savukkeet/savuke-era12.mjs väite 8: paneelin nelikulmion 25
 * näytepistettä, 0 maaosumaa — ei Ranskaa, Espanjaa eikä Korsikaa).
 *
 * MIKSI 3,77 E EIKÄ 3,9 E (erä 17, Raamattu KARTTAUUDISTUKSEN
 * PÄÄTÖKSET 19, omistaja 15.9.2026). Ankkuri on kortin YLÄREUNAN
 * KESKIKOHTA, joten se vie korttia itään päin kohti Livian pulua,
 * joka istuu ruudun oikeassa alanurkassa. Erän 16 luvulla 3,9 E
 * kortin oikean reunan ja pulun nokan väliin jäi pystypuhelimella
 * MITATTU 0,4 px (390 × 844) — saapumiskorkeus heiluu ajosta toiseen
 * muutaman prosentin, joten alle pikselin rako voi mennä nollan alle.
 * 0,13° länteen siirtää korttia 7,3 px vasemmalle ja rako on mitattu
 * 7,7 px (390 × 844) ja 8,2 px (393 × 852). Kauemmas länteen ei saa
 * mennä: kortin länsireuna lähestyy Cap de Creusia, ja vaatimus on
 * että kaikki 25 näytepistettä pysyvät merellä.
 *
 * PUUTTUVA RIVI tarkoittaa, että kapealla ruudulla käytetään maan
 * leveän ruudun ankkuria, ja jos sitäkään ei ole, oletusta (laatikon
 * eteläreuna). Rivi lisätään vain mitattuna (PÄÄTÖKSET 20).
 */
/*
 * ERÄ 18: KREIKAN KAPEA ANKKURI ON AIGEIANMERELLÄ (PÄÄTÖKSET 20 kohta
 * 1: oma ankkuri valitaan sekä leveälle että kapealle ruudulle).
 *
 * MIKSI EI JOONIANMERI. Pystypuhelimella saapumisnäkymä sovitetaan
 * KORKEUTEEN (PÄÄTÖKSET 17), jolloin ruudulle mahtuu Kreikan
 * pystymitta mutta vain noin kolme astetta pituutta: Joonianmeren
 * 19,9 E jäisi ruudun ULKOPUOLELLE länteen, aivan kuten Ranskan
 * Biskaja (PÄÄTÖKSET 18).
 *
 * MIKSI 36,15 N / 24,35 E. Piste on Kreikan itä-länsi-keskilinjalla
 * ja Aigeianmeren avovedellä Milosin eteläpuolella, Peloponnesoksen ja
 * Kreetan VÄLISSÄ olevassa aukossa — siis kartan omassa tyhjässä,
 * jonka kumpikin maanosa kehystää. Mitattu (390 × 844): 25
 * näytepistettä, 0 maaosumaa; kortti on kokonaan ruudulla (x
 * 224…259 / 374, y 635…663 / 775) ja lähimpään nostoon jää 37 px.
 */
export const MAAPANEELIN_KAPEAT_ANKKURIT = {
  FRA: { lat: 42.6, lng: 3.77 },
  GRC: { lat: 36.15, lng: 24.35 },
};

/**
 * Paneelin ankkuri laudan koordinaateissa.
 *
 * Maalla voi olla oma karttapiste (`MAAPANEELIN_ANKKURIT`, ja kapealla
 * ruudulla `MAAPANEELIN_KAPEAT_ANKKURIT`); muuten ankkuri on laatikon
 * eteläreunan keskellä, raon verran sen ULKOPUOLELLA.
 *
 * `kapea` = kutsujan lukema kuvasuhde-ehto (erä 16, ks. taulun
 * perustelu). Ilman sitä käytös on entinen. Laudan y kasvaa etelään (js/fokusmitat.js
 * laudaltaAsteiksi), joten "ulkopuolella" on `+`.
 */
export function paneelinAnkkuri(laatikko, iso = null, lauta = PALLO_LAUTA, { kapea = false } = {}) {
  const mitat = paneelinMitat(laatikko);
  if (!mitat) return null;
  const oma = iso
    ? ((kapea && MAAPANEELIN_KAPEAT_ANKKURIT[iso]) || MAAPANEELIN_ANKKURIT[iso])
    : null;
  if (oma) {
    const kohta = projisoiLaudalle(lauta, oma.lng, oma.lat);
    if (kohta) return { x: kohta.x, y: kohta.y };
  }
  return { x: laatikko.x + laatikko.w / 2, y: laatikko.y + laatikko.h + mitat.rako };
}

/**
 * MAAN LAATIKKO PANEELI MUKAAN LUETTUNA — saapumisrajauksen laatikko.
 *
 * Ilman tätä paneeli jäisi saapumisnäkymässä ruudun alalaidan alle:
 * kamera sovittaa MAAN laatikon (× marginaali), ja paneeli riippuu sen
 * alapuolella. Suunnitelman luku 3.0 nimeää tämän erikseen ("pannauksen
 * rajaan on laskettava paneeli mukaan laatikkoon").
 *
 * Tuntematon laatikko palautuu sellaisenaan: kamera saa silloin saman
 * laatikon kuin ennen tätä erää.
 */
/*
 * ══════════════════════════════════════════════════════════════════
 * SAAPUMISNÄKYMÄN VÄLJYYS ON NYT VAKIO, EI PANEELIN LAATIKKO
 * (erä 19d, korjaus 16.9.2026)
 * ══════════════════════════════════════════════════════════════════
 *
 * ERÄ 19 POISTI LAAJENNUKSEN KOKONAAN, ja se oli liikaa. Laajennus oli
 * alun perin paneelia varten (kartassa kiinni oleva kortti riippui
 * maan laatikon ULKOPUOLELLA, joten saapumisrajauksen piti ottaa se
 * mukaan), mutta sen sivuvaikutus oli se VÄLJYYS, jonka omistaja on
 * nähnyt ja hyväksynyt joka maassa v1917:ään asti.
 *
 * MITATTU SIVUVAIKUTUS (v1918, savuke-maailma-ei-kermaa mittauskamera
 * "Alpeilta Karpaateille", nakyvaAlue lautayksikköinä):
 *
 *   v1917  179 × 107  @ (6394, 1483)
 *   v1918  163 ×  97  @ (6402, 1488)   ← 9…10 % kapeampi
 *
 * Seuraus: savukkeen näytepisteet Steiermark ja Szatmár putosivat
 * ruudun ulkopuolelle (5/6), ja kohdemaan saapumisnäkymä oli tiukempi
 * kuin hyväksytty. Omistaja ei pyytänyt zoomin muutosta.
 *
 * KORJAUS: SAMA VÄLJYYS, ILMAN PANEELIA. Laatikkoa levennetään
 * `SAAPUMISEN_VARA` verran joka suuntaan — symmetrisesti, laatikon
 * omissa mitoissa. Mitattu ero v1917 ↔ v1918 oli tasan symmetrinen
 * (+8 lautayksikköä x:ssä ja +5 y:ssä kummallekin puolelle eli
 * 163 → 179 ja 97 → 107), koska kamera sovittaa laatikon ruutuun
 * keskipisteen ympäri. 5 % per sivu antaa 163 × 1,10 = 179,3 ja
 * 97 × 1,10 = 106,7 — molemmat ± 2 %:n sisällä tavoitteesta.
 *
 * MIKSI VAKIO EIKÄ PANEELI. Paneeli on erästä 19 alkaen KIINTEÄ RUUDUN
 * NURKASSA (PÄÄTÖKSET 28), joten sillä ei ole enää karttalaatikkoa,
 * josta väljyys voisi tulla. Väljyys on nyt oma päätöksensä ja yksi
 * luku, joka ei riipu paneelista, maasta eikä ruudun muodosta.
 *
 * FUNKTION NIMI JÄÄ, KOSKA KUTSU JÄÄ. `paneelinLaatikko` on yhä
 * js/pallolauta/lauta.js:n saapumislaatikossa (tests/maakartuutsi.test.mjs
 * vahtii kutsua sanatarkasti), joten väljennys tehdään tässä ja
 * varsinainen laskenta on `saapumisenValjennys`issä.
 */
export const SAAPUMISEN_VARA = 0.05;

/** Laatikko väljennettynä SAAPUMISEN_VARA:n verran joka suuntaan. */
export function saapumisenValjennys(laatikko) {
  if (!(laatikko?.w > 0) || !(laatikko?.h > 0)) return laatikko ?? null;
  const dx = SAAPUMISEN_VARA * laatikko.w;
  const dy = SAAPUMISEN_VARA * laatikko.h;
  return {
    x: laatikko.x - dx,
    y: laatikko.y - dy,
    w: laatikko.w + 2 * dx,
    h: laatikko.h + 2 * dy,
  };
}

export function paneelinLaatikko(laatikko, iso = null, { kapea = false } = {}) {
  // ISO ja kuvasuhde eivät enää vaikuta: väljyys on vakio (ks. yllä).
  void iso; void kapea;
  return saapumisenValjennys(laatikko);
}

const luo = (tagi, luokka, teksti) => {
  const e = document.createElement(tagi);
  if (luokka) e.className = luokka;
  if (teksti != null) e.textContent = teksti;
  return e;
};

/*
 * ══════════════════════════════════════════════════════════════════
 * NAPAUTUS ON OSUMATESTI, EI OSUMAKOHDE
 * (PÄÄTÖKSET 21 + PÄÄTÖKSET 28 TARKENNUS 2)
 * ══════════════════════════════════════════════════════════════════
 *
 * PÄÄTÖKSET 21 (omistaja 15.9.2026): *"jos osoitin on tai sormi tuon
 * infotaulun kohdalla, niin vierittaminen tai zoomaus ei silloin
 * onnistu"* — rullan, nipistyksen ja raahauksen on mentävä kalusteen
 * LÄPI kartalle. Erässä 19 se hoitui sillä, että vain pieni plus-nappi
 * oli `pointer-events: auto` ja kortin runko läpinäkyvä kartalle.
 *
 * TARKENNUS 2 POISTI PLUSSAN ja teki KOKO KALUSTEESTA napautettavan:
 * maan nimi avaa ja sulkee, kategoriaotsikot avaavat lehden sivun. Jos
 * ne olisivat `pointer-events: auto`, ne söisivät rullan täsmälleen
 * siinä kohdassa, jossa kaluste on — ja PÄÄTÖKSET 21 kaatuisi. Se ei
 * ole teoria: kalusteen keskikohta on nyt maan nimen päällä, ja juuri
 * siitä pisteestä savuke-era12 väite 10 rullaa.
 *
 * RATKAISU: KAIKKI ON `pointer-events: none`, ja napautus poimitaan
 * dokumentin KAAPPAUSVAIHEESSA osumatestillä. Rulla, nipistys ja
 * raahaus eivät kulje tätä kautta lainkaan — ne menevät kankaalle
 * kuten ennenkin. Vain `click` tutkitaan, ja vain jos sormi ei ollut
 * liikkunut: raahaus ei ole napautus. Osuma pysäyttää tapahtuman,
 * jottei pallon oma napautuslogiikka (js/pallolauta/lauta.js
 * napautaPintaan) siirrä nappulaa saman sormen alta.
 *
 * NÄPPÄIMISTÖ TOIMII ENTISEEN TAPAAN: painikkeet ovat yhä <button>, ja
 * Enter lähettää niille oikean `click`in, jonka kohde on nappi itse —
 * se tunnistetaan ilman osumatestiä (`e.target.closest`).
 */
const NAPAUTUKSEN_SIIRTO_PX = 8;

/** Osuuko ruutupiste näkyvän elementin laatikkoon? */
function osuuLaatikkoon(el, x, y) {
  if (!el || el.hidden || !el.isConnected) return false;
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0
    && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
}

/**
 * Kalusteen runko. Sisältö täytetään erikseen (`taytaKortti`), koska
 * sama elementti jää eloon maan vaihtuessa.
 *
 * KOLME OSAA, ALHAALTA YLÖS: avain (nimi + viiva + alarivi), sen
 * yläpuolella perustiedot ja niiden yläpuolella kategoriaotsikot.
 * Ladonta on pystysuora flex ja kaluste on ankkuroitu ruudun
 * ALAREUNAAN (css), joten avautuva sisältö kasvaa YLÖSPÄIN itsestään —
 * mitään ei lasketa js:ssä.
 */
function paneeliElementti(d) {
  const el = luo('div', 'pallolauta-maapaneeli');
  const kortti = luo('div', 'maapaneeli-kortti');
  kortti.setAttribute('role', 'group');

  /*
   * SISUS ON AVATTAVA OSA. Se on oma solmunsa, jotta auki/kiinni on
   * yksi `hidden` eikä usean elementin tilan summa — ja jotta kalusteen
   * levossa mitattava korkeus on tasan avaimen korkeus (savukkeen
   * vartio: levossa näkyy täsmälleen kaksi tekstiriviä ja viiva).
   */
  const sisus = luo('div', 'maapaneeli-sisus');
  sisus.hidden = true;
  /*
   * KARTUSCHAN JÄRJESTYS (Raamattu, MAALEHDEN INFOTAULU kohta 1):
   * masthead ensin (avain alla), sitten 1873-lohko, nykyluvut ja
   * kielet, ja kategoriat viimeisinä. Sisus ladotaan siksi AVAIMEN
   * JÄLKEEN; kaluste on ankkuroitu ruudun alareunaan, joten auki
   * kartuscha kasvaa ylöspäin ja masthead nousee sen yläreunaan.
   */
  const vuosi = luo('dl', 'maapaneeli-vuosi');
  vuosi.hidden = true;
  sisus.appendChild(vuosi);
  const rivit = luo('dl', 'maapaneeli-rivit');
  rivit.hidden = true;
  sisus.appendChild(rivit);
  const valikko = luo('div', 'maapaneeli-valikko');
  valikko.hidden = true;
  sisus.appendChild(valikko);

  /*
   * AVAIN ON KARTUUTSI (27.8.2026 asu, js/fokusmitat.js
   * `.fokus-kartuutsi`): versaali harvennettu nimi, ohut alleviivaus ja
   * kursiivi alarivi, jolla on maan oma nimi ja aikakauden valtiomuoto.
   * Se on <button>, koska se avaa ja sulkee — mutta napautus tulee
   * osumatestistä (ks. yllä), ei osumakohteesta.
   */
  const avain = luo('button', 'maapaneeli-avain');
  avain.type = 'button';
  avain.setAttribute('aria-expanded', 'false');
  avain.appendChild(luo('span', 'maapaneeli-nimi-suomi'));
  avain.appendChild(luo('span', 'maapaneeli-viiva'));
  const alarivi = luo('span', 'maapaneeli-alarivi');
  alarivi.appendChild(luo('span', 'maapaneeli-nimi-oma'));
  alarivi.appendChild(luo('span', 'maapaneeli-aika'));
  avain.appendChild(alarivi);
  /*
   * NAPAUTUSVIHJE (kohta 5): pienennetty muoto pysyy ennallaan, vain
   * alarivin alle tulee lyhyt pisteviiva ja väkänen — sama pisteviiva
   * kuin pelin linkeissä. Auki ollessa väkänen kääntyy.
   */
  const vihje = luo('span', 'maapaneeli-vihje');
  vihje.setAttribute('aria-hidden', 'true');
  avain.appendChild(vihje);
  avain.addEventListener('click', () => d.avaaValikko?.(!d.valikkoAuki));
  kortti.appendChild(avain);
  kortti.appendChild(sisus);

  el.appendChild(kortti);
  return el;
}

/** Kalusteen sisältö maalle: nimi, alarivi, perustiedot ja otsikot. */
function taytaKortti(el, d) {
  const kortti = el.querySelector('.maapaneeli-kortti');
  if (!kortti) return;
  if (kortti.dataset.iso !== d.iso) {
    kortti.dataset.iso = d.iso;
    kortti.querySelector('.maapaneeli-nimi-suomi').textContent = d.nimi.toUpperCase();
    /*
     * ALARIVI ON KARTUUTSIN ALARIVI. Maan oma nimi 1873-atlaksen asussa
     * ja sen perässä aikakauden valtiomuoto — SAMA SÄÄNTÖ kuin
     * kartuutsilla (js/fokusmitat.js): valtiomuoto näkyy vain, jos maan
     * oma nimikin tunnetaan, jottei rivi jää puolikkaaksi lauseeksi.
     * Tyhjä alarivi kutistuu itsestään pois.
     */
    kortti.querySelector('.maapaneeli-nimi-oma').textContent = d.paikallinen ?? '';
    kortti.querySelector('.maapaneeli-aika').textContent = d.paikallinen && d.valtiomuoto
      ? ` · ${d.valtiomuoto}` : '';
    const avain = kortti.querySelector('.maapaneeli-avain');
    avain.setAttribute('aria-label', `${d.nimi}: näytä perustiedot ja lehden otsikot`);

    /*
     * 1873 EDELLÄ (kohta 3). Lohkoon tulee vain se, mikä datassa on:
     * valtiomuoto (FOKUS_MAANIMET). Vuoden 1873 väkilukua ja
     * pääkaupunkia ei ole vielä datassa, joten niitä ei keksitä.
     */
    const vuosi = kortti.querySelector('.maapaneeli-vuosi');
    vuosi.textContent = '';
    const muoto = valtiomuoto1873(d.valtiomuoto);
    if (muoto) {
      vuosi.appendChild(luo('dt', 'maapaneeli-vuosi-otsikko', 'Valtiomuoto 1873'));
      vuosi.appendChild(luo('dd', 'maapaneeli-vuosi-arvo', muoto));
    }
    vuosi.hidden = !vuosi.firstChild;

    /*
     * NYKYLUVUT PIENEMPINÄ "NYT"-RIVEINÄ; SIJOITUKSET (23./195) VASTA
     * NAPAUTUKSESTA (kohta 3). Sijaluku on rivillä valmiina mutta
     * piilossa, ja napautus nykylukuihin näyttää tai piilottaa sen.
     */
    const rivit = kortti.querySelector('.maapaneeli-rivit');
    rivit.textContent = '';
    if (d.rivit.length) rivit.appendChild(luo('div', 'maapaneeli-nyt', 'Nyt'));
    for (const [otsikko, arvo, lisa] of d.rivit) {
      rivit.appendChild(luo('dt', 'maapaneeli-otsikko', otsikko));
      const dd = luo('dd', 'maapaneeli-arvo', arvo);
      if (lisa) dd.appendChild(luo('span', 'maapaneeli-sija', lisa));
      rivit.appendChild(dd);
    }
    /*
     * KIELET LIPPUINEEN VIIMEISENÄ RIVINÄ (omistaja 25.8.2026;
     * nurkkataulun taytaMaataulu). Osat tulevat js/fokusmitat.js:n
     * `kieliOsat`ista, eli samasta datasta ja samoilla
     * `.tervehdys`-tyyleillä kuin maalehdessä.
     */
    if (d.kielet?.length) {
      rivit.appendChild(luo('dt', 'maapaneeli-otsikko', 'Kielet'));
      const dd = luo('dd', 'maapaneeli-arvo maapaneeli-kielet');
      for (const osa of d.kielet) dd.appendChild(osa);
      rivit.appendChild(dd);
    }
    rivit.hidden = !rivit.firstChild;

    /*
     * KATEGORIAOTSIKOT OVAT PELKKÄÄ TEKSTIÄ (PÄÄTÖKSET 28 TARKENNUS 3,
     * omistaja 16.9.2026 kortilla): harvennetut kapiteelit samalla
     * antiikvalla kuin nimi ja alarivi, erottimena sama välipiste " · "
     * kuin alarivissä. VÄRIPALLOT POISTUVAT — ainoa väri on valitun
     * otsikon ohut alleviivaus, ja sekin on aiheen oma kartta-sävy
     * (--sym-*, asetetaan CSS:ssä data-sym-attribuutin mukaan).
     */
    /*
     * KATEGORIAT NAPAUTETTAVINA MERKKEINÄ (kohta 1): jokainen on oma
     * merkkinsä pisteviivalla kuten pelin linkit, ja merkit kietoutuvat
     * kartuschan kiinteään leveyteen — ei enää kahta koko ruudun
     * levyistä riviä eikä fontin kutistusta.
     */
    const valikko = kortti.querySelector('.maapaneeli-valikko');
    valikko.textContent = '';
    valikko.style.removeProperty('--otsikko-koko');
    for (const rivi of [d.aiheet ?? []]) {
      const rivisolmu = luo('div', 'maapaneeli-otsikkorivi');
      rivi.forEach((aihe) => {
        const nappi = luo('button', 'maapaneeli-aihe');
        nappi.type = 'button';
        nappi.dataset.sym = aihe.perhe;
        nappi.dataset.aihe = aihe.id;
        nappi.appendChild(luo('span', 'maapaneeli-aihe-nimi', aihe.nimi));
        nappi.addEventListener('click', () => {
          d.avaaValikko?.(false);
          d.avaaSivu?.(aihe.id);
        });
        rivisolmu.appendChild(nappi);
      });
      valikko.appendChild(rivisolmu);
    }
  }
  asetaAuki(el, d);
}

/**
 * AUKI VAI KIINNI — kalusteen ainoa tila.
 *
 * LEVOSSA NÄKYY VAIN AVAIN: nimi, viiva ja alarivi (PÄÄTÖKSET 28
 * TARKENNUS 2: *"nakyisi vain nimi ja alarivi"*). Napautus nimeen avaa
 * perustiedot ja niiden yläpuolelle otsikot; uusi napautus sulkee.
 *
 * VALITTU AIHE MERKITÄÄN VAIN ALLEVIIVAUKSELLA (TARKENNUS 3). Merkintä
 * on `on`-luokka, ja viivan värin antaa CSS aiheen `data-sym`in
 * mukaan — js ei kirjoita yhtään väriä.
 */
function asetaAuki(el, d) {
  const kortti = el.querySelector('.maapaneeli-kortti');
  if (!kortti) return;
  const auki = Boolean(d.valikkoAuki);
  const sisus = kortti.querySelector('.maapaneeli-sisus');
  const valikko = kortti.querySelector('.maapaneeli-valikko');
  const avain = kortti.querySelector('.maapaneeli-avain');
  if (sisus) sisus.hidden = !auki;
  if (valikko) valikko.hidden = !auki || !d.aiheet?.length;
  if (avain) avain.setAttribute('aria-expanded', String(auki));
  kortti.classList.toggle('valikko-auki', auki);
  /*
   * PULU VÄISTÄÄ AUKI OLEVAN KARTUSCHAN (Sonnet 1, kierros 16b,
   * 20.9.2026: pulu jäi kielirivin päälle). Kaluste on kokonaan
   * `pointer-events: none` (PÄÄTÖKSET 21), joten pulun vahti ei näe sitä
   * osumatestissä — merkintä kertoo sen (js/pulu-paneelin-ylla.js
   * VAISTETTAVA_LUOKKA).
   */
  kortti.classList.toggle('pulu-vaistettava', auki);
  if (!auki) kortti.classList.remove('sijat-auki');
  for (const nappi of kortti.querySelectorAll('.maapaneeli-aihe')) {
    nappi.classList.toggle('on', Boolean(d.avattuSivu) && nappi.dataset.aihe === d.avattuSivu);
  }
  // LIIKU PIILOON, KUN INFOTAULU ON AUKI (kohta 4; css body.infotaulu-auki).
  globalThis.document?.body?.classList.toggle('infotaulu-auki', auki);
}

/*
 * LIIKU VÄISTÄÄ PANEELIN, KUN PANEELI YLTÄÄ RUUDUN KESKILINJALLE.
 *
 * Omistajan päätös 15.9.2026 illalla: maainfo alkuperäiseen luettavaan
 * kokoon (ks. ALKUPERÄINEN LUETTAVA KOKO yllä). 390 px:n ruudulla
 * kortti on silloin MITATTUNA 226 px leveä ja yltää x 237:ään asti —
 * ruudun keskilinja on 195, ja Liiku-sana istuu siinä 44 px:n
 * levyisenä (x 173…217). Ne osuisivat toisiinsa.
 *
 * SANA PYSYY KESKELLÄ, MUTTA NOUSEE PANEELIN YLÄREUNAN TASALLE —
 * omistajan sanoin *"nosta Liikun tekstiä tarvittaessa paneelin
 * yläreunan tasalle"*. Vaihtoehto olisi ollut siirtää sana sivuun, ja
 * se rikkoisi PÄÄTÖKSET 28 kohdan 3 ("alas keskelle").
 *
 * EHTO JA MITTA LASKETAAN TÄÄLLÄ, EI CSS:SSÄ. Kortin ruutukorkeus
 * riippuu mittakaavasta, jonka vain tämä moduuli tietää, ja sen alin
 * kohta riippuu iPhonen turva-alueesta, jota js ei voi laskea — siksi
 * mitta otetaan LIVENÄ kortin omasta ruutulaatikosta ja kirjoitetaan
 * yhtenä muuttujana (--liiku-pohja). CSS ottaa siitä ja omasta
 * perusvälistään suuremman (css .toimintorivi.rivi-yksi
 * .monitoimi-nappi, `bottom: max(...)`), joten leveällä ruudulla,
 * jossa ehto ei täyty, mikään ei muutu.
 *
 * VAPAA KAISTA ON PUOLET NAPISTA JA RAKO: nappi on 44 px leveä ja
 * keskitetty, joten sen vasen reuna on keskilinja − 22; 12 px:n rako
 * päälle tekee 34.
 */
const LIIKUN_VAPAA_KAISTA_PX = 34;
/** Rako kortin yläreunan ja sanan alareunan väliin. */
const LIIKUN_RAKO_PX = 2;

/*
 * KESKEN ASETTUVAA RUUTUA EI USKOTA (mitattu 16.9.2026). Karttaruutu on
 * flex-lapsi, jonka korkeus heiluu saapumisen aikana — ensimmäisellä
 * mittauksella kortin yläreuna oli 132 px ruudun YLÄPUOLELLA, ja
 * siitä laskettu väistö (978 px) olisi vienyt sanan kokonaan pois
 * ruudulta. Mitta hyväksytään siis vain, jos se on järjellinen: kortti
 * on ruudulla ja väistö korkeintaan puoli ruutua.
 *
 * MITTA OTETAAN UUDESTAAN SEURAAVASSA KEHYKSESSÄ. Sama kirjoitus
 * ajetaan rAF:ssä, jolloin selain on ehtinyt asettaa kortin lopulliseen
 * kohtaansa. Hylätty mittaus EI pyyhi entistä arvoa — muuten sana
 * hyppäisi paikaltaan joka kerta, kun ruutu on hetken kesken.
 */
function mittaaLiikunPohja(kortti) {
  const juuri = typeof document === 'undefined' ? null : document.documentElement;
  if (!juuri) return;
  const r = kortti?.getBoundingClientRect();
  const leveys = globalThis.innerWidth || 0;
  const korkeus = globalThis.innerHeight || 0;
  if (!r || !(r.width > 0) || !(r.height > 0) || !(leveys > 0) || !(korkeus > 0)) return;
  // Kesken asettuva ruutu: kortin on oltava kokonaan ruudulla.
  if (r.top < 0 || r.bottom > korkeus + 1) return;
  const vapaaAlkaa = leveys / 2 - LIIKUN_VAPAA_KAISTA_PX;
  if (r.right <= vapaaAlkaa) { juuri.style.removeProperty('--liiku-pohja'); return; }
  const pohja = Math.round(korkeus - r.top + LIIKUN_RAKO_PX);
  if (!(pohja > 0) || pohja > korkeus / 2) return;
  juuri.style.setProperty('--liiku-pohja', `${pohja}px`);
}

/*
 * KOLME YRITYSTÄ: NYT, SEURAAVASSA KEHYKSESSÄ JA PUOLEN SEKUNNIN
 * PÄÄSTÄ. Karttaruudun korkeus asettuu vasta saapumisajon jälkeen, ja
 * kirjoituksia voi tulla vain muutama — yksikin hylätty mittaus
 * jättäisi sanan paneelin päälle. Ajastin on YKSI ja se nollataan joka
 * kirjoituksella, joten peräkkäiset päivitykset eivät kasaannu.
 */
let liikunPohjaAjastin = null;

function tahdistaLiikunPohja(kortti) {
  if (typeof document === 'undefined' || !kortti) return;
  mittaaLiikunPohja(kortti);
  globalThis.requestAnimationFrame?.(() => mittaaLiikunPohja(kortti));
  clearTimeout(liikunPohjaAjastin);
  liikunPohjaAjastin = setTimeout(() => {
    if (kortti.isConnected) mittaaLiikunPohja(kortti);
  }, 500);
}

/*
 * KAHDEN OTSIKKORIVIN SOVITUS (PÄÄTÖKSET 28 TARKENNUS 3, `sovitaOtsikot`
 * ja `otsikkoRivit`) POISTUI: infotaulun kartuschassa (Raamattu,
 * MAALEHDEN INFOTAULU) kategoriat ovat merkkejä, jotka kietoutuvat
 * kartuschan kiinteään leveyteen, joten fonttia ei tarvitse kutistaa.
 */
/**
 * Maapaneelin kerros — ERÄ 20: RUUDUN VASEN ALAKULMA ILMAN LAATIKKOA
 * (PÄÄTÖKSET 28 + TARKENNUS 2 ja 3).
 *
 * Kaluste ei ole merkkikerroksen datum vaan karttaruudun oma lapsi
 * (`.maapaneeli-nurkka`), joka istuu kiinteästi ruudun vasemmassa
 * alakulmassa. Kamera ei kirjoita sen paikkaa eikä kokoa kertaakaan, ja
 * erästä 20 alkaen ei kirjoita ruutukaan: typografia on ruutupikseleitä
 * (css), ja ainoa ajossa laskettu koko on otsikkorivien fonttikoko
 * (`sovitaOtsikot`).
 *
 * `kotelo` on karttaruutu (js/pallolauta/lauta.js), johon säiliö
 * ripustetaan. `merkit` on yhä parametrina, koska KERROS ON
 * PURETTAVA: aiemmat versiot ovat voineet jättää `maapaneeli`-datumin
 * merkkikerrokseen, ja `pura` siivoaa sen pois.
 *
 * Palauttaa:
 *   paivita({ iso, laatikko })  maa vaihtui tai kaluste on nollattu
 *   tahdistaKoko()              ruutu vaihtoi kokoa: otsikot uusiksi
 *   valikkoAuki()               savukkeille ja vartijoille
 *   mitat()                     kalusteen ruutulaatikko savukkeille
 *   pura()
 */
export function luoMaapaneeli({
  ui, merkit, kotelo = null, kamera = null, asteet = null,
  saapumisnakyma = null, kapeaRuutu = null,
}) {
  void kamera; void asteet; void saapumisnakyma; void kapeaRuutu;
  let tila = null; // { iso, laatikko, nimi, rivit, kielet, aiheet }
  let valikkoAuki = false;
  let avattuSivu = null;
  let sailio = null;
  let el = null;

  const avaaValikko = (auki) => {
    const uusi = Boolean(auki);
    if (uusi === valikkoAuki) return;
    valikkoAuki = uusi;
    kirjoita();
  };

  const avaaSivu = (sivuId) => {
    if (!tila?.iso) return;
    // Valittu otsikko jää merkityksi: alleviivaus näkyy, kun kaluste
    // avataan seuraavan kerran (PÄÄTÖKSET 28 TARKENNUS 3).
    avattuSivu = sivuId;
    ui.avaaMaalehti?.(tila.iso, { sivu: sivuId });
  };

  /*
   * YKSI PYSYVÄ TILAOLIO. Kalusteen napautuskäsittelijät sulkevat tämän
   * olion sisäänsä kerran (`paneeliElementti`), joten sen kenttiä
   * PÄIVITETÄÄN eikä koskaan korvata uudella oliolla — muuten avain
   * lukisi vanhentunutta `valikkoAuki`-tilaa.
   */
  const d = {
    laji: 'maapaneeli',
    iso: null,
    nimi: '',
    paikallinen: '',
    valtiomuoto: '',
    rivit: [],
    kielet: [],
    aiheet: [],
    valikkoAuki: false,
    avattuSivu: null,
    avaaValikko,
    avaaSivu,
  };

  /**
   * Säiliö ja kaluste ruutuun. Säiliö on karttaruudun suora lapsi, joten
   * se saa `.pallo-kotelo > div`:n koko alan (css) ja asemoi kalusteen
   * omalla lohkollaan ruudun vasempaan alakulmaan.
   */
  const varmistaKortti = () => {
    if (typeof document === 'undefined' || !kotelo) return null;
    if (!sailio?.isConnected) {
      sailio = document.createElement('div');
      sailio.className = 'maapaneeli-nurkka';
      el = null;
      kotelo.appendChild(sailio);
    }
    if (!el?.isConnected) {
      el = paneeliElementti(d);
      sailio.appendChild(el);
    }
    return el;
  };

  /*
   * OSUMATESTI DOKUMENTIN KAAPPAUSVAIHEESSA (ks. NAPAUTUS ON
   * OSUMATESTI yllä). Kaksi kuuntelijaa ja molemmat kaappaavina:
   * `pointerdown` muistaa mistä sormi lähti, `click` ratkaisee.
   */
  let alku = null;
  const painallus = (e) => { alku = { x: e.clientX, y: e.clientY }; };
  const napautus = (e) => {
    if (!el?.isConnected || !tila || sailio?.hidden) return;
    const kortti = el.querySelector('.maapaneeli-kortti');
    if (!kortti) return;
    // Näppäimistön Enter osuu nappiin itseensä: nappi hoitaa oman clickinsä.
    if (e.target instanceof Element && e.target.closest('.maapaneeli-kortti')) return;
    // Raahaus ei ole napautus: kartta on jo pannannut sormen alla.
    if (alku && Math.hypot(e.clientX - alku.x, e.clientY - alku.y) > NAPAUTUKSEN_SIIRTO_PX) return;
    const kohteet = [kortti.querySelector('.maapaneeli-avain'),
      ...kortti.querySelectorAll('.maapaneeli-aihe')];
    // Nykylukujen napautus näyttää sijoitukset (Raamattu, MAALEHDEN
    // INFOTAULU kohta 3); rivit eivät ole nappeja, joten luokka vaihtuu tässä.
    const rivit = kortti.querySelector('.maapaneeli-rivit');
    if (valikkoAuki && osuuLaatikkoon(rivit, e.clientX, e.clientY)) {
      e.preventDefault();
      e.stopPropagation();
      kortti.classList.toggle('sijat-auki');
      return;
    }
    for (const kohde of kohteet) {
      if (!osuuLaatikkoon(kohde, e.clientX, e.clientY)) continue;
      e.preventDefault();
      e.stopPropagation();
      kohde.click();
      return;
    }
  };

  const kirjoita = () => {
    if (!sailio?.isConnected && !tila) return;
    if (!tila) {
      if (sailio) sailio.hidden = true;
      // Ilman kalustetta Liiku palaa perusväliinsä ja näkyviin.
      document.documentElement?.style.removeProperty('--liiku-pohja');
      document.body?.classList.remove('infotaulu-auki');
      return;
    }
    const kaluste = varmistaKortti();
    if (!kaluste) return;
    sailio.hidden = false;
    d.iso = tila.iso;
    d.nimi = tila.nimi;
    d.paikallinen = tila.paikallinen;
    d.valtiomuoto = tila.valtiomuoto;
    d.rivit = tila.rivit;
    d.kielet = tila.kielet;
    d.aiheet = tila.aiheet;
    d.valikkoAuki = valikkoAuki;
    d.avattuSivu = avattuSivu;
    taytaKortti(kaluste, d);
    // Liiku väistää kalusteen, jos se yltää ruudun keskilinjalle.
    tahdistaLiikunPohja(kaluste.querySelector('.maapaneeli-kortti'));
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('pointerdown', painallus, true);
    document.addEventListener('click', napautus, true);
  }

  return {
    /**
     * Maa ja sen laatikko. `null` maassa (ei maata, nurkkatila päällä,
     * linssi päällä) purkaa kalusteen — TURVALLINEN TILA, ei virhe.
     * `laatikko` kulkee mukana vain savukkeen mittaa varten; nurkassa
     * se ei vaikuta sijaintiin eikä kokoon.
     */
    paivita({ iso = null, laatikko = null } = {}) {
      if (!iso || !maapaneeliKartassa()) {
        if (tila) { tila = null; valikkoAuki = false; kirjoita(); }
        return;
      }
      const omat = FOKUS_MAANIMET[iso] ?? {};
      const uusi = {
        iso,
        laatikko,
        nimi: maanNimi(ui, iso),
        paikallinen: omat.paikallinen ?? '',
        valtiomuoto: omat.valtiomuoto ?? '',
        rivit: maanRivit(ui, iso),
        // Kielirivin osat ovat VALMIITA ELEMENTTEJÄ (kieliOsat luo ne),
        // joten ne tehdään kerran maan vaihtuessa eikä joka piirrossa.
        kielet: kieliOsat(ui, iso),
        aiheet: maanAiheet(iso),
      };
      // Maan vaihtuessa kaluste sulkeutuu: sen rivit ovat toisen maan.
      if (tila?.iso !== uusi.iso) { valikkoAuki = false; avattuSivu = null; }
      tila = uusi;
      kirjoita();
    },
    /**
     * Ruutu vaihtoi kokoa (tai kamera liikkui).
     *
     * KAMERA EI VAIKUTA MITTAAN (PÄÄTÖKSET 28) eikä ruutu enää kokoon
     * (TARKENNUS 2), joten tämä on käytännössä otsikkorivien uusi
     * sovitus — kutsu jää ennalleen, koska ResizeObserver ja kameran
     * tahdistus kulkevat lauta.js:ssä samaa reittiä.
     */
    tahdistaKoko() {
      if (!tila) return;
      kirjoita();
    },
    /** Savukkeen ja vartijan mittarit. */
    valikkoAuki: () => valikkoAuki,
    /*
     * MITAT LUETAAN ELEMENTISTÄ, EI VAKIOISTA. Kalusteella ei ole enää
     * kiinteää 104 × 82 px:n laatikkoa: sen koko on sen sisältö, ja
     * auki se on moninkertainen. Savukkeet mittaavat ruutulaatikon.
     */
    mitat: () => {
      if (!tila) return null;
      const kaluste = el?.querySelector('.maapaneeli-kortti');
      const r = kaluste?.getBoundingClientRect?.() ?? null;
      return {
        auki: valikkoAuki,
        w: r?.width ?? 0,
        h: r?.height ?? 0,
        /*
         * MAAN LAATIKKO KULKEE MUKANA SAVUKKEEN MITTAA VARTEN. Se ei
         * sijoita kalustetta (PÄÄTÖKSET 28), mutta savukkeet lukivat
         * sen ennen merkkikerroksen datumista — nyt tästä.
         */
        laatikko: tila.laatikko,
      };
    },
    pura() {
      tila = null;
      valikkoAuki = false;
      avattuSivu = null;
      merkit?.aseta?.('maapaneeli', [], { haivyta: false });
      sailio?.remove();
      sailio = null;
      el = null;
      clearTimeout(liikunPohjaAjastin);
      liikunPohjaAjastin = null;
      if (typeof document !== 'undefined') {
        document.removeEventListener('pointerdown', painallus, true);
        document.removeEventListener('click', napautus, true);
        document.documentElement?.style.removeProperty('--liiku-pohja');
        document.body?.classList.remove('infotaulu-auki');
      }
    },
  };
}
