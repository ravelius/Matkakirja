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
 * ERÄ 13: PANEELI NOSTOJEN TEKSTIKOKOON — YKSI KERROIN, EI YHTÄÄN
 * MUUTA (Raamattu, PÄÄTÖKSET 11 kohta 1; omistaja 14.9.2026 klo 13.20
 * UTC: *"maainfo on aivan liian iso. siina tekstikoko leipatekstissa
 * pitaisi olla samaa luokkaa kuin karttanostojen tekstin koko."*).
 *
 * MITATTU, EI ARVATTU. Karttanoston nimiö on ruutuvakio
 * `KARTTANIMI_KOOT.kohde` = 8,5 css-px joka zoomilla ja joka ruudulla
 * (js/pallolauta/nostot.js: NOSTON_MITTA = 8,5 / NOSTOSYM_NIMIO_KOKO,
 * eli nimiön 11 yksikköä × mitta = 8,5 px; todennettu ruudulta:
 * rasterin musteen korkeus 4,6–6,7 px eli versaali + alapidennys).
 * Paneelin leipäteksti on `.maapaneeli-arvo` 4,75 px × paneelin
 * ruutuskaala, ja ruutuskaala seuraa KARTTAA (PÄÄTÖKSET 9) — se on
 * siis eri luku eri ruuduilla. Mitattu Ranskassa saapumisnäkymässä
 * 14.9.2026 (Playwright, dpr 1):
 *
 *     390 × 844    skaala 0,566  leipäteksti 2,69 px  suhde 0,32
 *     1400 × 900   skaala 1,658  leipäteksti 7,87 px  suhde 0,93
 *     1920 × 1080  skaala 2,021  leipäteksti 9,60 px  suhde 1,13
 *     2560 × 1352  skaala 2,570  leipäteksti 12,21 px suhde 1,44
 *
 * SUHDE EI VOI OLLA 1,00 KAIKILLA RUUDUILLA YHTÄ AIKAA: noston teksti
 * on ruutuvakio ja paneeli karttaan sidottu, joten suhde on 1,00 tasan
 * yhdellä kartan mittakaavalla. Ankkuriksi on valittu OMISTAJAN
 * RUUTULUOKKA 2560 × 1352 (projektin levein todennettu työpöytä,
 * docs/raportit/viesti-fable-kaistat-20260913.md) — se on se ruutu,
 * jolla omistaja näki paneelin liian isona. Kerroin on siis
 * 8,5 / 12,21 = 0,696.
 *
 * KERROIN OSUU VAIN OSUUKSIIN (ja skaalan rajoihin). Peruskoko px:nä
 * ja jokainen tyyliarvo pysyy ennallaan, joten kirjainperheet,
 * lihavuudet, värit, sisältö (mm. SIJALUKU) ja sisennysten suhde
 * (erä 12) ovat merkilleen entiset — vain pienempinä. `perusta`
 * (lautayksikköä per css-px) kutistuu tällä kertoimella, ja sen
 * mukana sekä paneelin LAUTAMITTA että ruutukoko: ankkuri
 * Biskajanlahdella ja karttaan sidottu skaala (hajonta 0 % zoomeilla)
 * pysyvät koskemattomina.
 *
 * PUHELIMEN TEKSTI JÄÄ PIENEKSI (2,7–2,8 → 1,9–2,0 px; luku
 * heilahtaa saapumiskorkeuden mukana ajosta toiseen). Se kirjataan
 * eikä korjata: PÄÄTÖKSET 7 kieltää fonttikoon alarajan ja sisällön
 * tiivistämisen, ja puhelimen pienuus tulee saapumisnäkymän
 * rajauksesta (pystyruudulla Ranska jää kauas), ei tästä kertoimesta.
 */
export const MAAPANEELIN_TEKSTIKERROIN = 0.696;
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
export function paneelinMitat(laatikko) {
  if (!(laatikko?.w > 0) || !(laatikko?.h > 0)) return null;
  const perusta = Math.min(
    (MAAPANEELIN_LEVEYS_OSUUS * laatikko.w) / MAAPANEELIN_LEVEYS_PX,
    (MAAPANEELIN_KORKEUS_OSUUS * laatikko.h) / MAAPANEELIN_KORKEUS_PX,
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
 * RANSKA ON PILOTTI (PÄÄTÖKSET 9 kohta 1): vain sillä on oma piste,
 * muut maat pitävät eteläreunan oletuksen, kunnes omistaja on
 * hyväksynyt Ranskan.
 *
 * PISTE 45,9 N / 4,6 W on Biskajanlahden avovettä. Paneeli (Ranskalla
 * 94 × 74 lautayksikköä eli 2,8° × 1,6°) peittää siitä alaspäin
 * lat 44,3…45,9 N ja lng 6,0…3,2 W: Ranskan Atlantin rannikko on tällä
 * leveydellä noin 1,2 W ja Espanjan pohjoisrannikko 43,4 N, joten
 * kortti on kokonaan merellä kummankin maan ulkopuolella.
 */
export const MAAPANEELIN_ANKKURIT = {
  FRA: { lat: 45.9, lng: -4.6 },
};

/**
 * Paneelin ankkuri laudan koordinaateissa.
 *
 * Maalla voi olla oma karttapiste (`MAAPANEELIN_ANKKURIT`); muuten
 * ankkuri on laatikon eteläreunan keskellä, raon verran sen
 * ULKOPUOLELLA. Laudan y kasvaa etelään (js/fokusmitat.js
 * laudaltaAsteiksi), joten "ulkopuolella" on `+`.
 */
export function paneelinAnkkuri(laatikko, iso = null, lauta = PALLO_LAUTA) {
  const mitat = paneelinMitat(laatikko);
  if (!mitat) return null;
  const oma = iso ? MAAPANEELIN_ANKKURIT[iso] : null;
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
export function paneelinLaatikko(laatikko, iso = null) {
  const mitat = paneelinMitat(laatikko);
  const ankkuri = paneelinAnkkuri(laatikko, iso);
  if (!mitat || !ankkuri) return laatikko ?? null;
  /*
   * YHDISTE, EI ENÄÄ PELKKÄ ALASPÄIN VENYTYS (erä 12). Ankkuri voi
   * olla maan laatikon LÄNSIPUOLELLA (Ranskan Biskajanlahti), joten
   * laajennus lasketaan paneelin nelikulmion ja maan laatikon
   * yhdisteenä kaikkiin neljään suuntaan. Eteläreunan oletuksella
   * tulos on täsmälleen entinen.
   */
  const x0 = Math.min(laatikko.x, ankkuri.x - mitat.w / 2);
  const x1 = Math.max(laatikko.x + laatikko.w, ankkuri.x + mitat.w / 2);
  const y0 = Math.min(laatikko.y, ankkuri.y);
  const y1 = Math.max(laatikko.y + laatikko.h, ankkuri.y + mitat.h);
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
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
   * ELE JÄÄ KORTTIIN. Kartta panoroi pallon kankaalta, mutta kortin
   * yli vedetty sormi ei saa aloittaa panorointia eikä kortin napautus
   * saa mennä pallon napautuslogiikkaan (js/pallolauta/lauta.js
   * napautaPintaan). Sama kolmen tapahtuman suoja kuin maataululla
   * (js/fokusmitat.js rakennaMaataulu, sääntö 4).
   */
  for (const tapahtuma of ['pointerdown', 'touchstart', 'wheel', 'click']) {
    kortti.addEventListener(tapahtuma, (e) => e.stopPropagation(), { passive: true });
  }
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
 * Merkkikerros on Globe.gl:n CSS2D-kerros, ja se on TARKOITUKSELLA
 * kaiken pelin UI:n ALLA (css/styles.css `.pallo-kotelo
 * .scene-container > div { z-index: 0 }`). Alanappirivin tai
 * vuorokortin alle jäävä valikkorivi näkyy siis puolittain eikä ota
 * napautusta vastaan — mitattu 13.9.2026 savukkeessa, jossa Ranskan
 * valikon viides rivi (Urheilu) jäi `.rail`-kortin alle 390 px:n
 * ruudulla.
 *
 * VALIKKO EI KAVENNA ITSEÄÄN EIKÄ SIIRRÄ KALUSTEITA, vaan aukeaa
 * YLÖSPÄIN, kun alle ei mahdu. Sama valinta kuin kartan muillakin
 * lapuilla: pois jää se, mikä osuisi kalusteen kohdalle. Lista on
 * VALITSIMIA eikä mittoja, koska yksikään kaluste ei ole kiinteässä
 * kohdassa (sama peruste kuin js/fokusmitat.js KALUSTEET).
 */
const VALIKON_KALUSTEET = ['.rail', '.toimintorivi', '.pollo-nappi.pollo-kelluu'];

/**
 * Aukeaako valikko alas vai ylös? Mitta otetaan vasta kun valikko on
 * näkyvissä, koska muunnos (scale) on osa sen ruutulaatikkoa.
 *
 * VAIN VAAKASUUNNASSA LIMITTYVÄT KALUSTEET LASKETAAN. Työpöydällä
 * `.rail` on ruudun laidassa eikä alalaidassa; sen yläreuna ei silloin
 * kerro mitään siitä, mihin valikko mahtuu.
 */
function sovitaValikko(kortti) {
  const valikko = kortti.querySelector('.maapaneeli-valikko');
  if (!valikko || valikko.hidden) return;
  valikko.classList.remove('ylos');
  const r = valikko.getBoundingClientRect();
  if (!(r.height > 0)) return;
  const kotelo = kortti.closest('.pallo-kotelo')?.getBoundingClientRect();
  let raja = kotelo ? kotelo.bottom : (globalThis.innerHeight ?? 0);
  for (const valitsin of VALIKON_KALUSTEET) {
    for (const e of document.querySelectorAll(valitsin)) {
      const k = e.getBoundingClientRect();
      if (!(k.width > 0) || !(k.height > 0)) continue;
      if (k.right <= r.left || k.left >= r.right) continue;
      if (k.top < raja && k.top > r.top) raja = k.top;
    }
  }
  if (r.bottom > raja) valikko.classList.add('ylos');
}

/**
 * Maapaneelin kerros. `merkit` on merkkikerros (js/pallolauta/merkit.js),
 * `asteet(kohta)` laudan kohta asteiksi ja `kamera` pallon kamera.
 *
 * Palauttaa:
 *   paivita({ iso, laatikko })  maa vaihtui tai kaluste on nollattu
 *   tahdistaKoko()              kamera liikkui: uusi mittakaava
 *   valikkoAuki()               savukkeille ja vartijoille
 *   pura()
 */
export function luoMaapaneeli({ ui, merkit, kamera, asteet }) {
  let tila = null; // { iso, laatikko, mitat, ankkuri }
  let valikkoAuki = false;

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

  /** Mittakaava kameran tilasta: lautayksikkö → css-pikseli. */
  const skaala = () => {
    const perusta = tila?.mitat?.perusta;
    const pxYksikossa = kamera?.kameranTila?.()?.skaala;
    if (!(perusta > 0) || !(pxYksikossa > 0)) return 1;
    return Math.min(MAAPANEELIN_SKAALA_MAX,
      Math.max(MAAPANEELIN_SKAALA_MIN, perusta * pxYksikossa));
  };

  const kirjoita = () => {
    if (!tila) { merkit.aseta('maapaneeli', []); return; }
    merkit.aseta('maapaneeli', [{
      avain: 'maapaneeli',
      laji: 'maapaneeli',
      lat: tila.lat,
      lng: tila.lng,
      iso: tila.iso,
      // Maan laatikko kulkee datumissa savukkeen mittaa varten:
      // sijaintiväite verrataan juuri siihen laatikkoon, josta
      // ankkuri on laskettu (tools/savukkeet/savuke-maapaneeli.mjs).
      laatikko: tila.laatikko,
      nimi: tila.nimi,
      paikallinen: tila.paikallinen,
      valtiomuoto: tila.valtiomuoto,
      rivit: tila.rivit,
      kielet: tila.kielet,
      aiheet: tila.aiheet,
      skaala: skaala(),
      valikkoAuki,
      avaaValikko,
      avaaSivu,
      elementti: paneeliElementti,
      asettele: taytaKortti,
    }]);
  };

  return {
    /**
     * Maa ja sen laatikko. `null` kummassa tahansa (ei maata, laatikkoa
     * ei ole vielä luettu, nurkkatila päällä, linssi päällä) purkaa
     * paneelin — TURVALLINEN TILA, ei virhe.
     */
    paivita({ iso = null, laatikko = null } = {}) {
      const mitat = maapaneeliKartassa() ? paneelinMitat(laatikko) : null;
      const ankkuri = mitat ? paneelinAnkkuri(laatikko, iso) : null;
      const a = iso && ankkuri ? asteet(ankkuri) : null;
      if (!a) {
        if (tila) { tila = null; valikkoAuki = false; kirjoita(); }
        return;
      }
      const omat = FOKUS_MAANIMET[iso] ?? {};
      const uusi = {
        iso,
        laatikko,
        mitat,
        lat: a.lat,
        lng: a.lon ?? a.lng,
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
    /** Kamera liikkui: pelkkä mittakaava, ei uutta sisältöä. */
    tahdistaKoko() {
      if (!tila) return;
      kirjoita();
    },
    /** Savukkeen ja vartijan mittarit. */
    valikkoAuki: () => valikkoAuki,
    mitat: () => (tila ? { ...tila.mitat, lat: tila.lat, lng: tila.lng } : null),
    pura() { tila = null; valikkoAuki = false; merkit.aseta('maapaneeli', [], { haivyta: false }); },
  };
}
