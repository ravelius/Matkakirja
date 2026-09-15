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
import { kasikehys } from '../kasinpiirto.js';
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
 * ERÄ 19: NURKAN MITTAKAAVA ON RUUDUN MITTA (PÄÄTÖKSET 28 kohta 1)
 * ══════════════════════════════════════════════════════════════════
 *
 * Kun kortti on kiinni RUUDUSSA eikä kartassa, kameran korkeus ei saa
 * enää näkyä sen koossa lainkaan — muuten se "hengittäisi" zoomatessa
 * juuri niin kuin omistaja ei halua. Kerroin lasketaan siis kerran
 * ruudun koosta, ja se päivittyy vain ruudun koon muuttuessa.
 *
 * KAKSI RAJAA, TIUKEMPI VOITTAA:
 *
 *   KORKEUS ≤ 10 % RUUDUSTA. Sama kymmenesosan katto, jonka omistaja
 *   asetti v1885/v1903 ("paneeli kymmenesosaan"), mutta mitattuna nyt
 *   RUUDUN KORKEUDESTA. Karttaan kiinnitettynä katto oli ruudun
 *   LEVEYDESTÄ (MAAPANEELIN_KATTO_RUUDUSTA), koska silloin sitova
 *   mitta oli se, paljonko kortti vei leveydeltään kartan päältä
 *   pystypuhelimella. Nurkkakortin sitova mitta on korkeus: se seisoo
 *   ruudun alalaidassa, ja leveyssuunnassa sen rinnalla ei ole mitään.
 *
 *   LEVEYS ≤ 28 % RUUDUSTA. Toinen raja on olemassa vaakapuhelinta
 *   varten (844 × 390), jossa 10 % korkeudesta olisi 39 px eikä
 *   leveysraja sido; ja toisin päin hyvin kapealla ruudulla, jossa
 *   korkeusraja antaisi kortille yli kolmanneksen leveydestä.
 *
 * RAJAT 0,8…1,6 PITÄVÄT TEKSTIN LUETTAVANA. Kortin typografia on
 * mitoitettu peruskokoon (leipäteksti 6,5 px kortin yksiköissä), joten
 * kerroin lähellä yhtä on se, jota varten se on ladottu. Mitattuna
 * 390 × 844 antaa 1,03 ja 1400 × 900 antaa 1,10 — kortti on siis
 * molemmilla ruuduilla lähes peruskokoinen, mikä on juuri se
 * "alkuperäinen vasemman alakulman maainfo", jota päätös pyytää.
 */
export const MAAPANEELIN_NURKKA_KORKEUS_OSUUS = 0.10;
export const MAAPANEELIN_NURKKA_LEVEYS_OSUUS = 0.28;
export const MAAPANEELIN_NURKKA_SKAALA_MIN = 0.8;
export const MAAPANEELIN_NURKKA_SKAALA_MAX = 1.6;

/** Nurkkakortin mittakaava ruudun koosta; tuntematon ruutu → 1. */
export function nurkanSkaala({ leveys = 0, korkeus = 0 } = {}) {
  if (!(leveys > 0) || !(korkeus > 0)) return 1;
  const raja = Math.min(
    (MAAPANEELIN_NURKKA_KORKEUS_OSUUS * korkeus) / MAAPANEELIN_KORKEUS_PX,
    (MAAPANEELIN_NURKKA_LEVEYS_OSUUS * leveys) / MAAPANEELIN_LEVEYS_PX,
  );
  return Math.min(MAAPANEELIN_NURKKA_SKAALA_MAX,
    Math.max(MAAPANEELIN_NURKKA_SKAALA_MIN, raja));
}

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
  return (MAA_KATEGORIAT[iso] ?? [])
    .filter((osa) => osa?.id && osa?.nimi)
    .map((osa) => ({ id: osa.id, nimi: osa.nimi, perhe: aiheenPerhe(osa.id) }));
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
 * ERÄ 19: LAAJENNUSTA EI ENÄÄ TEHDÄ (PÄÄTÖKSET 28 kohta 1).
 *
 * Laajennus oli olemassa YHDESTÄ syystä: kartassa kiinni oleva paneeli
 * riippui maan laatikon ULKOPUOLELLA, joten saapumisrajauksen piti
 * ottaa se mukaan tai kortti olisi jäänyt ruudun alalaidan alle.
 * Nurkkakortti on ruudun oma kaluste — se on näkyvissä joka zoomilla
 * riippumatta siitä, mihin kamera maan rajaa — eikä saa enää siirtää
 * saapumisnäkymää eikä uloszoomauksen kattoa. Kartta rajautuu siis
 * tästä eteenpäin MAAHAN, kuten ennen erää 3.
 *
 * FUNKTIO JÄÄ JA PALAUTTAA LAATIKON SELLAISENAAN. Kutsu on yhä
 * js/pallolauta/lauta.js:n saapumislaatikossa (tests/maakartuutsi.test.mjs
 * vahtii sitä), ja jos paneeli joskus palaa kartalle, laajennus
 * palautetaan tähän yhteen paikkaan eikä kutsuketjua tarvitse etsiä.
 */
export function paneelinLaatikko(laatikko, iso = null, { kapea = false } = {}) {
  void iso; void kapea;
  return laatikko ?? null;
}

const luo = (tagi, luokka, teksti) => {
  const e = document.createElement(tagi);
  if (luokka) e.className = luokka;
  if (teksti != null) e.textContent = teksti;
  return e;
};

/** SVG-solmu oikeassa nimiavaruudessa (createElement tekisi HTML-solmun). */
const luoSvg = (tagi) => document.createElementNS('http://www.w3.org/2000/svg', tagi);

/**
 * PAKSU SISÄLLÄ, OHUT ULKONA — kartussin kehys käsinpiirrettynä.
 *
 * Mitat ja niiden lähteet ovat js/kasinpiirto.js:ssä (Stieler 1874 ja
 * Johnston 1879, pikselimittaukset); täällä on vain ladonta. Kehys on
 * SVG eikä CSS-reunus kahdesta syystä:
 *
 *   1. CSS:n `border` on täsmälleen suora — juuri se "vektorimainen"
 *      jälki, jonka omistaja halusi pois. SVG-polku saa mitatun
 *      horjunnan (0,32 × viivan leveys, aallonpituus 30 × leveys).
 *   2. Kortti skaalautuu `transform: scale()`illa, ja SVG skaalautuu
 *      mukana tarkkana — reunuksen leveys pyöristyisi laitepikseliin.
 *
 * KEHYS EI KOSKAAN OTA NAPAUTUSTA (`pointer-events: none`
 * tyylitiedostossa): sen alla on kortin oma napautuslogiikka.
 */
const KEHYKSEN_PAKSU_PX = 1.9;

function piirraKehys(kortti, iso) {
  const svg = kortti.querySelector('.maapaneeli-kehys');
  if (!svg || svg.dataset.iso === iso) return;
  svg.dataset.iso = iso ?? '';
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  const { ohut, paksu } = kasikehys({
    leveys: MAAPANEELIN_LEVEYS_PX,
    korkeus: MAAPANEELIN_KORKEUS_PX,
    paksu: KEHYKSEN_PAKSU_PX,
    siemen: iso || 'kehys',
  });
  // Ohut ensin, paksu päälle: päällekkäisyys nurkassa jää paksun alle.
  for (const [luokka, sivut] of [['ohut', ohut], ['paksu', paksu]]) {
    for (const sivu of sivut) {
      const polku = luoSvg('path');
      polku.setAttribute('d', sivu.d);
      polku.setAttribute('class', `maapaneeli-kehys-${luokka}`);
      polku.setAttribute('stroke-width', String(sivu.leveys));
      svg.appendChild(polku);
    }
  }
}

/**
 * Kortin runko. Sisältö täytetään erikseen (`taytaKortti`), koska sama
 * elementti jää eloon maan vaihtuessa — datum on pysyvä avaimeltaan ja
 * kirjasto siirtää sitä sen sijaan, että loisi uuden (merkit.js).
 */
function paneeliElementti(d) {
  const el = luo('div', 'pallolauta-maapaneeli');
  const kortti = luo('div', 'maapaneeli-kortti');
  kortti.setAttribute('role', 'group');
  /*
   * KEHYS ON ENSIMMÄINEN LAPSI eli kaiken alla: se on paperin painatus,
   * ei kortin reunus. Sisältö saa oman pehmusteensa kehyksen sisään.
   */
  const kehys = luoSvg('svg');
  kehys.setAttribute('class', 'maapaneeli-kehys');
  kehys.setAttribute('viewBox', `0 0 ${MAAPANEELIN_LEVEYS_PX} ${MAAPANEELIN_KORKEUS_PX}`);
  kehys.setAttribute('aria-hidden', 'true');
  kortti.appendChild(kehys);
  /*
   * OTSAKE ON KARTUUTSI (erä 9): versaali nimi, ohut alleviivaus ja
   * alarivi, jolla on maan oma nimi ja aikakauden valtiomuoto. Samat
   * kolme solmua ja sama järjestys kuin nurkkataulun kartuutsissa
   * (js/fokusmitat.js rakenna → .fokus-kartuutsi-nimi / -viiva /
   * -alarivi), jotta asu on se, jonka pelaaja tunnistaa.
   */
  /*
   * SISUS ON OMA SOLMUNSA, JOTTA VALIKKO EI LEIKKAUDU. Kortin korkeus
   * on kiinteä (se on myös LAUDAN mitta, ks. tyylitiedosto), joten
   * sisältö on leikattava — mutta `overflow: hidden` kortissa
   * leikkaisi myös kortin ulkopuolelle aukeavan valikon, eikä
   * napautus osuisi siihen enää lainkaan (mitattu savukkeessa
   * 13.9.2026: kangas sieppasi napautuksen). Leikkaus on siis tässä
   * sisemmässä solmussa; valikko ja plus ovat kortin omia lapsia.
   */
  const sisus = luo('div', 'maapaneeli-sisus');
  const nimi = luo('div', 'maapaneeli-nimi');
  nimi.appendChild(luo('span', 'maapaneeli-nimi-suomi'));
  sisus.appendChild(nimi);
  sisus.appendChild(luo('div', 'maapaneeli-viiva'));
  const alarivi = luo('div', 'maapaneeli-alarivi');
  alarivi.appendChild(luo('span', 'maapaneeli-nimi-oma'));
  alarivi.appendChild(luo('span', 'maapaneeli-aika'));
  sisus.appendChild(alarivi);
  sisus.appendChild(luo('dl', 'maapaneeli-rivit'));
  kortti.appendChild(sisus);

  /*
   * PALJAS PLUS, EI SANAA (erä 9; nurkkataulun `.fokus-maataulu-lehti`,
   * omistaja 25.8.2026: *"pelkästään paksummaksi plus merkiksi ilman
   * pyöreää ympyrää"*). Merkin piirtävät CSS:n kaksi palkkia, ja
   * tekstisolmu on ruudunlukijaa varten — se piilotetaan `font-size:
   * 0`:lla kuten nurkkataulussakin.
   */
  const lisaa = luo('button', 'maapaneeli-lisaa', '+');
  lisaa.type = 'button';
  lisaa.setAttribute('aria-expanded', 'false');
  kortti.appendChild(lisaa);

  const valikko = luo('div', 'maapaneeli-valikko');
  valikko.hidden = true;
  kortti.appendChild(valikko);

  lisaa.addEventListener('click', (e) => {
    e.stopPropagation();
    d.avaaValikko?.(!d.valikkoAuki);
  });
  /*
   * ELE EI ENÄÄ JÄÄ KORTTIIN (erä 18; Raamattu, KARTTAUUDISTUKSEN
   * PÄÄTÖKSET 21, omistaja 15.9.2026: *"jos osoitin on tai sormi tuon
   * infotaulun kohdalla, niin vierittaminen tai zoomaus ei silloin
   * onnistu"*).
   *
   * ENNEN tässä oli neljän tapahtuman `stopPropagation` — pointerdown,
   * touchstart, wheel ja click — jotta kortin yli vedetty sormi ei
   * aloittaisi panorointia. Sivuvaikutus oli juuri se, mistä omistaja
   * kirjoitti: kortin kohdalla kartta ei liikkunut eikä zoomannut
   * lainkaan.
   *
   * NYT eleitä ei pysäytetä ollenkaan, vaan kortin RUNKO on kartalle
   * läpinäkyvä (`pointer-events: none`, css/styles.css
   * .maapaneeli-kortti) ja vain plus-nappi ja valikon rivit ottavat
   * napautuksen vastaan. Ne pysäyttävät oman `click`insä alla, joten
   * napautus ei mene pallon napautuslogiikkaan (lauta.js
   * napautaPintaan) — mutta rulla, nipistys ja raahaus menevät
   * kankaalle kuin korttia ei olisi.
   */
  el.appendChild(kortti);
  return el;
}

/** Kortin sisältö maalle: nimi, luvut ja valikon rivit. */
function taytaKortti(el, d) {
  const kortti = el.querySelector('.maapaneeli-kortti');
  if (!kortti) return;
  piirraKehys(kortti, d.iso);
  if (kortti.dataset.iso !== d.iso) {
    kortti.dataset.iso = d.iso;
    kortti.querySelector('.maapaneeli-nimi-suomi').textContent = d.nimi.toUpperCase();
    /*
     * ALARIVI ON KARTUUTSIN ALARIVI (erä 9). Maan oma nimi
     * 1873-atlaksen asussa ja sen perässä aikakauden valtiomuoto —
     * SAMA SÄÄNTÖ kuin kartuutsilla (js/fokusmitat.js): valtiomuoto
     * näkyy vain, jos maan oma nimikin tunnetaan, jottei rivi jää
     * puolikkaaksi lauseeksi. Tyhjä alarivi kutistuu itsestään pois.
     */
    kortti.querySelector('.maapaneeli-nimi-oma').textContent = d.paikallinen ?? '';
    kortti.querySelector('.maapaneeli-aika').textContent = d.paikallinen && d.valtiomuoto
      ? ` · ${d.valtiomuoto}` : '';
    kortti.setAttribute('aria-label', `${d.nimi}: maan perustiedot`);

    const rivit = kortti.querySelector('.maapaneeli-rivit');
    rivit.textContent = '';
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
     * `.tervehdys`-tyyleillä kuin maalehdessä — tässä ei ole omaa
     * lippulähdettä eikä omaa ladontaa.
     */
    if (d.kielet?.length) {
      rivit.appendChild(luo('dt', 'maapaneeli-otsikko', 'Kielet'));
      const dd = luo('dd', 'maapaneeli-arvo maapaneeli-kielet');
      for (const osa of d.kielet) dd.appendChild(osa);
      rivit.appendChild(dd);
    }

    const lisaaNappi = kortti.querySelector('.maapaneeli-lisaa');
    lisaaNappi.setAttribute('aria-label', `Lisää ${d.nimi}-lehdestä`);
    /*
     * MAA ILMAN AIHEITA EI SAA VALIKKOA (vastakoe 1). Nappi on silloin
     * kokonaan poissa eikä vain sammutettu: painike, joka ei tee
     * mitään, on lupaus jota ei ole. Peli ei kaadu, ja perustiedot
     * näkyvät entiseen tapaan.
     */
    lisaaNappi.hidden = d.aiheet.length === 0;

    const valikko = kortti.querySelector('.maapaneeli-valikko');
    valikko.textContent = '';
    for (const aihe of d.aiheet) {
      const nappi = luo('button', 'maapaneeli-aihe');
      nappi.type = 'button';
      nappi.dataset.sym = aihe.perhe;
      nappi.dataset.aihe = aihe.id;
      nappi.appendChild(luo('span', 'maapaneeli-aihe-merkki'));
      nappi.appendChild(luo('span', 'maapaneeli-aihe-nimi', aihe.nimi));
      nappi.addEventListener('click', (e) => {
        e.stopPropagation();
        d.avaaValikko?.(false);
        d.avaaSivu?.(aihe.id);
      });
      valikko.appendChild(nappi);
    }
  }
  asetteleKortti(el, d);
}

/**
 * Kortin ruutuasento: mittakaava kamerasta ja valikon tila.
 *
 * TÄMÄ ON SE YKSI PAIKKA, JOSSA KARTAN ZOOMI MUUTTUU PIKSELEIKSI.
 * `d.skaala` on laskettu kutsujalla kameran tilasta; tässä se vain
 * kirjoitetaan muunnokseksi. Muunnos on `scale`, ei leveys/korkeus:
 * asettelua ei lasketa uudelleen, joten zoomaus pysyy sujuvana
 * (sama sääntö kuin nostoilla, js/pallolauta/nostot.js asetteleNosto).
 */
function asetteleKortti(el, d) {
  const kortti = el.querySelector('.maapaneeli-kortti');
  if (!kortti) return;
  kortti.style.transform = `scale(${(d.skaala ?? 1).toFixed(4)})`;
  const valikko = kortti.querySelector('.maapaneeli-valikko');
  const lisaa = kortti.querySelector('.maapaneeli-lisaa');
  if (valikko) valikko.hidden = !d.valikkoAuki;
  if (lisaa) lisaa.setAttribute('aria-expanded', String(Boolean(d.valikkoAuki)));
  kortti.classList.toggle('valikko-auki', Boolean(d.valikkoAuki));
  if (d.valikkoAuki) sovitaValikko(kortti);
}

/*
 * RUUDUN KALUSTEET, JOTKA VALIKKO VÄISTÄÄ.
 *
 * Valikko aukeaa kortin yläpuolelle ruudun vasemmassa alakulmassa, ja
 * sen tiellä voi olla alanappirivi tai vuorokortti. Lista on
 * VALITSIMIA eikä mittoja, koska yksikään kaluste ei ole kiinteässä
 * kohdassa (sama peruste kuin js/fokusmitat.js KALUSTEET).
 */
const VALIKON_KALUSTEET = ['.rail', '.toimintorivi', '.pollo-nappi.pollo-kelluu'];

/** Valikon sarakkeiden enimmäismäärä, kun kaksi ei riitä (PÄÄTÖKSET 28). */
const VALIKON_SARAKKEET_MAX = 3;

/**
 * VALIKKO KASVAA YLÖS, KAHDESSA SARAKKEESSA (PÄÄTÖKSET 28 kohta 2).
 *
 * Kortti on ruudun ALALAIDASSA, joten alaspäin ei ole tilaa: valikon
 * ALAREUNA on plussan kohdalla ja rivit latoutuvat siitä ylöspäin.
 * Ladonta on CSS:n grid `column`-virtaus (css .maapaneeli-valikko), ja
 * tämä funktio päättää VAIN kaksi lukua:
 *
 *   --valikko-rivit    montako riviä yhteen sarakkeeseen mahtuu
 *   --valikko-siirto   vaakasiirto, jos oikea reuna karkaa ruudulta
 *
 * SARAKKEITA ON KAKSI, KOLME VAIN JOS EI MAHDU. Omistaja pyysi kaksi;
 * kolmas on turvaventtiili 390 px:n ruudulle, jolla kaluste
 * (alanappirivi, vuorokortti) syö pystytilaa. Rivien tiiviys tulee
 * CSS:n `line-height`ista (1,3 × fontin rivikorkeus) eikä tästä.
 */
function sovitaValikko(kortti) {
  const valikko = kortti.querySelector('.maapaneeli-valikko');
  if (!valikko || valikko.hidden) return;
  const rivit = valikko.querySelectorAll('.maapaneeli-aihe');
  if (!rivit.length) return;
  valikko.style.setProperty('--valikko-siirto', '0px');

  const kotelo = kortti.closest('.pallo-kotelo')?.getBoundingClientRect();
  if (!kotelo) return;
  const kr = kortti.getBoundingClientRect();
  const skaala = kortti.offsetWidth > 0 ? kr.width / kortti.offsetWidth : 1;
  if (!(skaala > 0)) return;

  /*
   * YLÄRAJA: RUUDUN YLÄREUNA TAI ALIN KALUSTE, JOKA LIMITTYY VALIKON
   * KANSSA VAAKASUUNNASSA. Vain vaakasuunnassa limittyvät lasketaan:
   * työpöydällä `.rail` on ruudun laidassa eikä valikon tiellä.
   */
  let ylaraja = kotelo.top;
  const vasen = kr.left;
  const oikea = kotelo.right;
  for (const valitsin of VALIKON_KALUSTEET) {
    for (const e of document.querySelectorAll(valitsin)) {
      const k = e.getBoundingClientRect();
      if (!(k.width > 0) || !(k.height > 0)) continue;
      if (k.right <= vasen || k.left >= oikea) continue;
      if (k.bottom > ylaraja && k.bottom < kr.top) ylaraja = k.bottom;
    }
  }

  /*
   * RIVIÄ KOHTI YKSI KORKEUS. Rivin korkeus mitataan LIVENÄ (fontti ja
   * skaala vaikuttavat molemmat), ja käytettävissä oleva korkeus on
   * valikon alareunasta ylärajaan.
   */
  const yksi = rivit[0].getBoundingClientRect().height || 1;
  const alareuna = valikko.getBoundingClientRect().bottom;
  const tilaa = Math.max(yksi, alareuna - ylaraja);
  const mahtuu = Math.max(1, Math.floor(tilaa / yksi));
  const sarakkeita = Math.min(VALIKON_SARAKKEET_MAX,
    Math.max(2, Math.ceil(rivit.length / mahtuu)));
  const riveja = Math.ceil(rivit.length / sarakkeita);
  valikko.style.setProperty('--valikko-rivit', String(riveja));

  /*
   * VAAKA: PYSY RUUDULLA. Valikko alkaa kortin vasemmasta reunasta ja
   * levittäytyy oikealle; kapealla ruudulla kolmas sarake voi yltää
   * reunan yli, jolloin koko lista liu'utetaan vasemmalle tasan
   * ylivuodon verran (kortin omissa yksiköissä, koska siirto on
   * muunnoksen sisällä).
   */
  const r = valikko.getBoundingClientRect();
  let siirto = 0;
  if (r.right > kotelo.right) siirto = kotelo.right - r.right;
  else if (r.left < kotelo.left) siirto = kotelo.left - r.left;
  if (siirto) valikko.style.setProperty('--valikko-siirto', `${(siirto / skaala).toFixed(3)}px`);
}

/**
 * Maapaneelin kerros — ERÄ 19: RUUDUN VASEN ALAKULMA (PÄÄTÖKSET 28).
 *
 * Kortti ei ole enää merkkikerroksen datum vaan karttaruudun oma lapsi
 * (`.maapaneeli-nurkka`), joka istuu kiinteästi ruudun vasemmassa
 * alakulmassa. Kamera ei siis kirjoita sen paikkaa eikä kokoa
 * kertaakaan; ainoa ruudusta luettava luku on mittakaava
 * (`nurkanSkaala`), joka päivittyy vain ruudun koon muuttuessa.
 *
 * `kotelo` on karttaruutu (js/pallolauta/lauta.js), johon säiliö
 * ripustetaan. `merkit` on yhä parametrina, koska KERROS ON
 * PURETTAVA: aiemmat versiot ovat voineet jättää `maapaneeli`-datumin
 * merkkikerrokseen, ja `pura` siivoaa sen pois.
 *
 * Palauttaa:
 *   paivita({ iso, laatikko })  maa vaihtui tai kaluste on nollattu
 *   tahdistaKoko()              ruutu vaihtoi kokoa: uusi mittakaava
 *   valikkoAuki()               savukkeille ja vartijoille
 *   pura()
 */
export function luoMaapaneeli({
  ui, merkit, kotelo = null, kamera = null, asteet = null,
  saapumisnakyma = null, kapeaRuutu = null,
}) {
  void kamera; void asteet; void saapumisnakyma; void kapeaRuutu;
  let tila = null; // { iso, laatikko, nimi, rivit, kielet, aiheet }
  let valikkoAuki = false;
  let sailio = null;
  let el = null;

  const avaaValikko = (auki) => {
    const uusi = Boolean(auki) && Boolean(tila?.aiheet?.length);
    if (uusi === valikkoAuki) return;
    valikkoAuki = uusi;
    kirjoita();
  };

  const avaaSivu = (sivuId) => {
    if (!tila?.iso) return;
    ui.avaaMaalehti?.(tila.iso, { sivu: sivuId });
  };

  /*
   * YKSI PYSYVÄ DATUM. Kortin napautuskäsittelijät sulkevat tämän
   * olion sisäänsä kerran (`paneeliElementti`), joten sen kenttiä
   * PÄIVITETÄÄN eikä koskaan korvata uudella oliolla — muuten plussa
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
    skaala: 1,
    valikkoAuki: false,
    avaaValikko,
    avaaSivu,
  };

  /**
   * Ruudun mitat mittakaavaa varten.
   *
   * MITTA ON IKKUNA, EI KARTTARUUTU. Karttaruutu on flex-lapsi, jonka
   * MITATTU korkeus heiluu saapumisen aikana sen mukaan, mitä ruudulla
   * on juuri sillä hetkellä (mitattu 13.9.2026: 775, 589 ja 0 px
   * samalla 844 px:n ruudulla) — kortin koko olisi silloin arpapeliä.
   * `innerWidth/innerHeight` ei elä saapumisanimaation mukana.
   */
  const ruutu = () => ({
    leveys: globalThis.innerWidth || kotelo?.clientWidth || 0,
    korkeus: globalThis.innerHeight || kotelo?.clientHeight || 0,
  });

  /**
   * Säiliö ja kortti ruutuun. Säiliö on karttaruudun suora lapsi, joten
   * se saa `.pallo-kotelo > div`:n koko alan (css) ja asemoi kortin
   * omalla lohkollaan vasempaan alakulmaan.
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

  const kirjoita = () => {
    if (!sailio?.isConnected && !tila) return;
    if (!tila) {
      if (sailio) sailio.hidden = true;
      return;
    }
    const kortti = varmistaKortti();
    if (!kortti) return;
    sailio.hidden = false;
    d.iso = tila.iso;
    d.nimi = tila.nimi;
    d.paikallinen = tila.paikallinen;
    d.valtiomuoto = tila.valtiomuoto;
    d.rivit = tila.rivit;
    d.kielet = tila.kielet;
    d.aiheet = tila.aiheet;
    d.skaala = nurkanSkaala(ruutu());
    d.valikkoAuki = valikkoAuki;
    taytaKortti(kortti, d);
  };

  return {
    /**
     * Maa ja sen laatikko. `null` maassa (ei maata, nurkkatila päällä,
     * linssi päällä) purkaa paneelin — TURVALLINEN TILA, ei virhe.
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
      // Maan vaihtuessa valikko sulkeutuu: sen rivit ovat toisen maan.
      if (tila?.iso !== uusi.iso) valikkoAuki = false;
      tila = uusi;
      kirjoita();
    },
    /**
     * Ruutu vaihtoi kokoa (tai kamera liikkui): uusi mittakaava.
     *
     * KAMERA EI ENÄÄ VAIKUTA MITTAAN (PÄÄTÖKSET 28), joten tämä on
     * käytännössä ruudun koon tahdistus — kutsu jää ennalleen, koska
     * ResizeObserver ja kameran tahdistus kulkevat lauta.js:ssä samaa
     * reittiä.
     */
    tahdistaKoko() {
      if (!tila) return;
      kirjoita();
    },
    /** Savukkeen ja vartijan mittarit. */
    valikkoAuki: () => valikkoAuki,
    mitat: () => (tila ? {
      skaala: d.skaala,
      w: MAAPANEELIN_LEVEYS_PX * d.skaala,
      h: MAAPANEELIN_KORKEUS_PX * d.skaala,
      /*
       * MAAN LAATIKKO KULKEE MUKANA SAVUKKEEN MITTAA VARTEN. Se ei
       * enää sijoita paneelia (PÄÄTÖKSET 28), mutta savukkeet lukivat
       * sen ennen merkkikerroksen datumista — nyt tästä.
       */
      laatikko: tila.laatikko,
    } : null),
    pura() {
      tila = null;
      valikkoAuki = false;
      merkit?.aseta?.('maapaneeli', [], { haivyta: false });
      sailio?.remove();
      sailio = null;
      el = null;
    },
  };
}
