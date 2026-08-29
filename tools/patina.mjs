/*
 * PATINAPASSI: valmiin karttalehden jälkikäsittely 1873-vedokseksi.
 *
 *   node tools/patina.mjs <pohjakuva> <ulos-kansio> \
 *        [--taso hillitty|keskitaso|taysi|kaikki] [--tunnus GRC] \
 *        [--leveys 6400] [--laatu 0.9] [--muoto jpeg|webp|png] \
 *        [--vertailu] [--pala x,y,w,h]
 *
 * Työkalu EI piirrä karttaa. Se ottaa valmiin lehden
 * (tools/tee-fokuskartta.mjs tuottama GRC.webp tai vastaava) ja lisää
 * siihen sen, mitä painettu ja sata vuotta säilytetty paperi tekee
 * kuvalle: musteen sävyn, paperin syyn, ikääntymisen laikut,
 * akvarellin reunakertymän, rannikon vesiviivoituksen, painolaattojen
 * kohdistusheiton, musteen leviämisen ja taitteet.
 *
 * Miksi jälkikäsittelynä eikä piirtomoottorissa? Koska nämä ovat
 * TYYLIVALINTOJA, jotka on nähtävä rinnakkain ennen kuin yksi
 * valitaan. Piirtomoottorissa jokainen kokeilu maksaa täyden
 * renderöinnin (aineistot, ETOPO, selainajo); tässä se maksaa
 * sekunteja samasta pohjasta. Kun resepti on valittu, se ajetaan
 * samalla tiedostolla koko maailman lehdille — reseptiolio on siksi
 * yhdessä paikassa (RESEPTIT) eikä hajallaan koodissa.
 *
 * === KOLME TASOA ===
 *
 * `hillitty`   vain sävyt: viivat tummanruskeiksi (ei mustiksi),
 *              valkoinen kermaksi, sävykäyrä pehmeäksi, maaston
 *              pastellointi, lumppupaperin syy.
 * `keskitaso`  edelliset + epätasainen ikääntymissävy + akvarellin
 *              reunakertymä värialueiden rajoilla.
 * `taysi`      kaikki + viivojen mikrorosoisuus + painolaattojen
 *              kohdistusheitto + musteen leviäminen nimissä +
 *              vinjetointi.
 *
 * Taso ei ole kytkinlista vaan valmis resepti: jokainen taso on
 * itsenäinen parametriolio, jota voi säätää rikkomatta muita.
 *
 * Kolme passia on kaikilla tasoilla samat eivätkä kuulu tähän
 * portaikkoon: meren SYVYYSVYÖHYKKEIDEN litistys, sen tilalle tuleva
 * rannikon VESIVIIVOITUS ja MAANRAJOJEN tummennus. Ne korjaavat
 * pohjakuvaa eivätkä annostele tyyliä — ks. SYVYYS, VESIVIIVOITUS ja
 * MAANRAJA.
 *
 * === LUETTAVUUS ON ETUSIJALLA ===
 *
 * Lehti on pelin luettava kartta, ei kuvitus. Siksi jokainen efekti,
 * joka koskee mustetta (rosoisuus, leviäminen) tai kontrastia
 * (sävykäyrä, vinjetti), on rajattu niin ettei nimien ja rantaviivan
 * erottuvuus laske. Kaksi kohtaa on erityisen herkkää ja ne on
 * kirjattu myös tänne, jotta seuraava säätäjä tietää mistä varoa:
 *
 *  1. SÄVYKÄYRÄN NOSTO nostaa mustan harmaaksi. Yli 24:n nosto alkaa
 *     syödä pienen tekstin ja rantaviivan eroa paperiin. Sama koskee
 *     `musteHaalennusta`, joka vaalentaa nimenomaan viivaa: nykyisillä
 *     arvoilla (nosto 21, haalennus 0,13) musteen tummin pää on 71 ja
 *     paperin moodi 197, eli ero on 126 yksikköä — noin 22 % vähemmän
 *     kuin pohjakuvassa (161) ja 11 % vähemmän kuin ensimmäisessä
 *     patinaversiossa. Alle sadan menevä ero alkaa olla utua.
 *  2. MUSTEEN LEVIÄMINEN sumentaa nimet, jos säde ylittää noin
 *     kolme pikseliä 6400 pikselin leveydellä. Se on tarkoitettu
 *     hiuksenhienoksi kehäksi kirjaimen ympärille, ei sumennukseksi.
 *  3. PASTELLOINTI vaalentaa ja desaturoi maaston. Se on rajattu
 *     luminanssi- JA kromamaskilla keskisävyihin, jotta muste (tumma)
 *     ja meri (matala kroma) jäävät koskematta. Jos maskin alarajaa
 *     laskee alle 110:n, se alkaa haalistaa nimien reunapikseleitä.
 *
 * === PROSEDURAALINEN KOHINA, EI ULKOISIA TEKSTUUREJA ===
 *
 * Paperin syy, ikääntymisen laikut ja musteen rosoisuus syntyvät
 * siemenellisestä arvokohinasta (mulberry32 + bilineaarinen haku,
 * sama tapa kuin tools/fokuskartta/piirto.js). Ulkopuolisia
 * paperiskannauksia ei käytetä: ne olisivat lisenssikysymys
 * (CLAUDE.md: kuvat ja media vain PD/CC tarkistettuina) ja sitoisivat
 * lehden yhteen skannaukseen, joka toistuisi näkyvästi joka maassa.
 *
 * Kuvankäsittely ajetaan selaimen canvasilla (Playwright + Chromium),
 * koska koko putki tekee jo niin (tools/savyta-miniatyyrit.mjs,
 * tools/tee-fokuskartta.mjs) eikä repossa ole natiivikirjastoja
 * (sharp, canvas) eikä asennusvaihetta.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { basename, extname, resolve } from 'node:path';

/* ============================================================ RESEPTIT */

/*
 * SÄVYT — kaikilla tasoilla sama pohja.
 *
 * Mitattu pohjakuvasta (GRC.webp, 6400 x 4000, 29.8.2026): tummimmat
 * pikselit ovat keskimäärin rgb(68,52,32) eli jo ruskeita, valkoisin
 * pää rgb(251,241,190) eli kellertävä. Mustaa (L<40) on 0,002 % ja
 * puhdasta valkoista ei käytännössä lainkaan. Sävytyön tehtävä ei ole
 * siis pelastaa mustaa vaan viimeistellä: nostaa musteen sävy
 * yhtenäiseksi lämpimäksi ruskeaksi, viedä kirkkain pää keltaisesta
 * kermaan ja pehmentää kontrasti painetun vedoksen tapaan.
 */
const SAVYT = {
  /* Musteen tavoiteväri. Tummempi kuin piirto.js:n MUSTE (#4a3421),
   * koska tämä on vain sävy — kirkkaus tulee pikselistä itsestään. */
  muste: [74, 52, 34],
  /* L-väli, jolla pikseli tulkitaan musteeksi. Alaraja täydellä
   * painolla, yläraja nollalla; väliin jää pehmeä reunapikselien
   * vyöhyke, jotta antialiasointi ei katkea. */
  musteVali: [70, 158],
  musteVoima: 0.55,
  /*
   * MUSTEEN HAALENNUS. Omistajan arvio 29.8.2026 (toinen kerta): kartta
   * on liian kontrastinen. Sävykäyrän nosto vaikuttaa koko kuvaan, myös
   * meren ja maaston keskisävyihin, joten pelkällä sillä kontrastia ei
   * saa alas ilman että lehti muuttuu utuiseksi. Tämä kerroin osuu vain
   * musteeseen: viivan tummin pää vedetään tämän verran kohti kermaa,
   * musteen omalla painolla vaimennettuna. 0,10 laskee viivan ja paperin
   * eron noin 12 %. Yli 0,18 alkaa haalistaa pientä tekstiä.
   */
  musteHaalennus: 0.13,
  /* Kerma. Ei valkoinen eikä pohjan kellertävä huippu, vaan lämmin
   * mutta neutraalimpi paperinvalkoinen. */
  kerma: [245, 237, 214],
  kermaVali: [224, 253],
  kermaVoima: 0.65,
  /*
   * Sävykäyrä: L' = L * kerroin + nosto. Kerroin 0,88 ja nosto 19
   * jättävät kerman 235:een ja nostavat musteen tummimman pään 65:een —
   * vedoksen pehmeä kontrasti ilman että pieni teksti sulaa paperiin
   * (ks. luettavuusvaroitus tiedoston alussa). Yhdessä
   * `musteHaalennuksen` kanssa viivan ja paperin ero on noin 12 %
   * pienempi kuin ensimmäisessä versiossa (0,9 / 15 ilman haalennusta).
   */
  kayra: { kerroin: 0.88, nosto: 21 },
};

/*
 * MEREN SYVYYSVYÖHYKKEET: PORTAAT LITISTETÄÄN.
 *
 * === MISTÄ ONGELMA TULEE ===
 *
 * Pohjalehdessä (piirto.js, meren syvyysporrastus) meri on maalattu
 * vyöhykkeinä, jotka kiertävät jokaista rantaa ja saarta. Mitattuna
 * GRC-pohjasta ne EIVÄT ole siistejä tasanteita: meren luminanssi on
 * yhtenäinen ramppi 180:stä 215:een, jonka päällä on noin seitsemän
 * yksikön hyppyjä parin pikselin matkalla. Juuri ne hypyt näkyvät
 * laakealla merellä bandinginä (omistaja 29.8.2026:
 * *"syvyysvyöhykerenkaat näyttävät bandingilta"*).
 *
 * Hyppyjä ei siis voi poistaa histogrammia kvantisoimalla — tasanteita
 * ei ole. Ne on litistettävä ja piirrettävä uudelleen.
 *
 * === MITÄ TÄSSÄ TEHDÄÄN ===
 *
 *  1. LITISTYS. Jokainen meripikseli vedetään kohti meren omaa
 *     keskisävyä. `litistys` on se osuus porrasaskeleesta, joka jää
 *     jäljelle: 0,2 tarkoittaa, että seitsemän yksikön hyppy kutistuu
 *     puoleentoista. Ei nollaan — hento vihje syvyydestä kuuluu
 *     karttaan, banding ei.
 *
 *  2. TILALLE VESIVIIVOITUS. Sävyporras ei ole se, mistä 1800-luvun
 *     kaivertaja piirsi syvyyden — hän veti rantaviivan myötäisiä
 *     rinnakkaisviivoja. Ne piirretään omassa passissaan
 *     rantaetäisyydestä (ks. VESIVIIVOITUS), eivät tästä.
 *
 * === MIKSI PORRASPOHJAISET VIIVAT HYLÄTTIIN ===
 *
 * Ensimmäinen yritys (29.8.2026) etsi portaan paikan DoG-nollakohtana
 * ja piirsi viivan siihen. Se oli tarkka mutta väärä: pohjan portaita
 * on kolme neljä ja ne ovat siellä, minne piirtomoottori ne laski,
 * joten viivoja tuli kolme neljä eikä niitä voinut tihentää. Omistajan
 * arvio: *"nyt syvyys ei näy oikein ollenkaan"*. Etäisyyskenttä antaa
 * viivat sinne, minne kaivertaja ne vetäisi, ja niin monta kuin
 * halutaan. Koneisto on poistettu; litistys jäi.
 */
const SYVYYS = {
  /* Osuus porrasaskeleesta, joka jää jäljelle (0 = tasainen meri). */
  litistys: 0.20,
  /* Meren kromaraja [täysi meri, ei enää meri] — sama akseli kuin
   * vesiviivoituksessa, mitattu pohjakuvasta sävytyksen jälkeen. */
  kromaVali: [34, 44],
  /* Luminanssiportti: musteen (nimet, rantaviiva, symbolit) on jäätävä
   * litistyksen ulkopuolelle, vaikka sen kroma on meren luokkaa. */
  lumVali: [150, 178],
  /* Rantavyöhyke, jolla litistys vaimenee nollaan (täysiä pikseleitä):
   * rantaviivan antialiasointi ja sen oma varjostus jäävät koskematta. */
  rantaVali: [1, 7],
};

/*
 * LUMPPUPAPERIN SYY JA RAE.
 *
 * MIKSI KOLME KERROSTA EIKÄ YKSI. Ensimmäinen versio oli yksi
 * venytetty kohina, ja kun sen voiman nosti näkyväksi, koko lehden yli
 * kulki säännöllinen vaakasyy: se luki skannerin juovana eikä
 * paperina. Voiman puolittaminen poisti juovan mutta samalla paperin.
 *
 * Oikea korjaus ei ole voima vaan SKAALAHAJONTA. Kolme kuitukerrosta
 * eri taajuuksilla (ei toistensa kerrannaisia) ja eri faaseilla
 * summautuvat epäjaksolliseksi syyksi, jota silmä ei lue rasterina.
 * Päälle tulee DOMAIN WARP: matalataajuinen kohina heiluttaa kuidun
 * omia koordinaatteja, jolloin kuitu aaltoilee kuten käsinammennetussa
 * paperissa eikä kohinataulun 512 yksikön kierto näy toistona.
 *
 * KUIDUN MITTAKAAVA — omistajan bandinghavainto 29.8.2026. Ensimmäiset
 * mitat olivat 90 x 6, 47 x 3,3 ja 151 x 11,5 eli satoja pikseliä
 * pitkiä ja 6-23 pikselin jaksolla toistuvia vaakakerroksia. Juuri
 * tuolla jaksolla silmän kontrastiherkkyys on huipussaan, joten kun
 * voima nostettiin näkyväksi, laakea meri luki vaakabandingina.
 * Mittakaava pudotettiin 2,6-kertaisesti: kuitu on nyt noin 2 pikselin
 * paksuista ja muutaman kymmenen pikselin mittaista. Se on myös
 * lähempänä totuutta — lumpun kuitu on millimetrejä, ei senttejä —
 * ja se siirtää energian pois bandingkaistalta rakenteen katoamatta.
 * Katkontaa hoitaa lisäksi `klimppi`.
 *
 * Rae on kahdessa osassa: pikselikohtainen hajautusrae (näkyy 1:1) ja
 * muutaman pikselin nyppy (näkyy myös pienennettynä). Kumpikaan ei ole
 * suuntautunut, joten kumpikaan ei voi tuottaa juovaa.
 *
 * Kerros = [skaalaX, skaalaY, paino, faasiX, faasiY]. Skaala on
 * pikseleitä kohinataulun yksikköä kohti 6400 pikselin lehdellä:
 * 34 x 2,3 tarkoittaa noin kahden pikselin korkuisia, muutaman
 * kymmenen pikselin mittaisia kuituja.
 */
const PAPERI_KEVYT = {
  /* Pikselikohtainen rae, ±osuus. */
  rae: 0.050,
  /* Muutaman pikselin nyppy: karkeampi rakeisuus, joka kestää
   * pienennyksen. Skaala on pikseleitä kohinayksikköä kohti. */
  raeKarkea: 0.038,
  raeKarkeaSkaala: 2.4,
  kuitu: 0.038,
  kuituKerrokset: [
    [34, 2.3, 1.00, 0, 0],
    [20, 1.5, 0.62, 613, 271],
    [58, 4.4, 0.45, 2287, 1499],
  ],
  /* Toinen kuitusuunta hennompana — käsintehdyssä paperissa syy ei
   * ole yhdensuuntainen. */
  kuituRisti: 0.022,
  kuituRistiKerrokset: [
    [3.5, 35, 1.00, 1000, 500],
    [2.2, 19, 0.55, 3121, 907],
  ],
  /* Domain warp: [skaala pikseleinä, siirtymä kohinayksikköinä].
   * Siirtymä on kohinayksikköinä, joten hienompi kuitu heiluu
   * pikseleissä mitattuna vähemmän: voima nostettu sen mukana. */
  warpSkaala: 300,
  warpVoima: 3.4,
  /*
   * Kuitukimppujen katkonta (ks. selainkoodin kohta 7). Voima on
   * kertoimen heitto ylös ja alas ykkösestä: 0,9 tarkoittaa, että
   * kuitu vaihtelee lähes olemattomasta lähes kaksinkertaiseen.
   * Skaala on kimpun koko pikseleinä 6400 pikselin lehdellä — sen on
   * oltava selvästi kuidun pituutta (noin 68 px) lyhyempi mutta
   * kuidun paksuutta (noin 2 px) suurempi, muuten katkonta joko ei
   * pure juovaan tai syö itse kuidun.
   */
  klimppi: 0.9,
  klimppiSkaala: 14,
};

/* Sama syy vahvempana täydellä tasolla. */
const PAPERI_TAYSI = {
  ...PAPERI_KEVYT,
  rae: 0.072, raeKarkea: 0.054, kuitu: 0.052, kuituRisti: 0.030,
};

/*
 * KORKEUSVARJOSTUKSEN PASTELLOINTI.
 *
 * Pohjan hypsometria ja rinnevarjostus ovat piirtomoottorissa
 * täysvahvoja: vuoristo on kylläistä oranssinruskeaa ja alanko
 * kirkasta keltaista. Painetussa 1873-vedoksessa maasto on samat
 * sävyt PUOLIKKAALLA kylläisyydellä ja korkeammalla vaaleudella —
 * väri on nostettu paperista eikä ruiskutettu sen päälle. Ilman tätä
 * passia lehti lukee digitaalisena reliefinä, ei litografiana.
 *
 * Efekti on kaksiosainen: kylläisyys lasketaan kohti pikselin omaa
 * luminanssia (LÄMPIMÄNÄ, ks. paperiSavy — kohti neutraalia harmaata
 * vedettynä maasto muuttuisi likaiseksi) ja tummat päät nostetaan
 * kohti kermaa.
 *
 * MASKI ON KOKO EFEKTIN TURVA. Se on kahden ehdon tulo:
 *  - luminanssi keskisävyissä: muste (L noin 65 sävytyksen jälkeen)
 *    jää alarajan alle eikä haalistu;
 *  - kroma riittävän suuri: meri on viileää paperia kromalla noin 30
 *    ja jää alarajan alle, joten vesiviivoitus ja meren sävy säilyvät.
 * Kumpikin raja on pehmeä, jotta maski ei piirrä omaa reunaansa.
 */
const PASTELLI_KEVYT = {
  /* Kylläisyyden lasku maskin täydellä painolla. */
  kyllaisyys: 0.34,
  /* Kohti mitä desaturoidaan: luminanssin kerroin kanavittain.
   * Lämmin harmaa, ei neutraali. */
  paperiSavy: [1.045, 0.995, 0.905],
  /* Tummien nosto kohti kermaa. Tämä on korkeuserojen KONTRASTISÄÄDIN:
   * vuoristovarjostus on lehden tummin maasävy, ja kun sitä nostetaan
   * kohti kermaa, rinteiden ero alankoon kutistuu. Omistajan pyyntö
   * 29.8.2026 (*"korkeuserot saisivat näkyä matalammalla
   * kontrastilla"*) nosti tämän 0,10:stä 0,21:een ja kylläisyyden
   * 0,26:sta 0,34:ään: maasto jää hennoksi mutta lukee yhä. Muste ja
   * nimet eivät liiku — maski pitää ne (lumVali, kromaVali) ulkona. */
  vaalennus: 0.21,
  vaalennusKohde: [246, 239, 219],
  /* Nosto painottuu tähän luminanssivyöhykkeeseen: täysi alarajalla,
   * nolla ylärajalla. Vuoristo on tummaa, alanko jo valmiiksi vaaleaa. */
  vaalennusVali: [120, 225],
  /* Maskin luminanssi-ikkuna [ala, ylä] ja reunojen pehmeys. */
  lumVali: [118, 238],
  lumPehmeys: 26,
  /* Maskin kromaikkuna: alle ala ei mitään (meri), yli ylä täysi. */
  kromaVali: [36, 72],
};

const PASTELLI_KESKI = {
  ...PASTELLI_KEVYT, kyllaisyys: 0.45, vaalennus: 0.30,
};

const PASTELLI_TAYSI = {
  ...PASTELLI_KEVYT, kyllaisyys: 0.55, vaalennus: 0.37,
};

/*
 * EPÄTASAINEN IKÄÄNTYMISSÄVY.
 *
 * Matalataajuinen kohina, joka tummentaa ja lämmittää laikuittain.
 * `lampo` kertoo, kuinka paljon enemmän sininen kanava tummuu kuin
 * punainen: ikääntyminen on kellastumista, ei harmaantumista.
 */
const IKAANTYMINEN = {
  voima: 0.075, skaala: 2.6, oktaavit: 3, lampo: 0.55,
  /* Reunat vanhenevat enemmän kuin keskusta (käsittely, valo, pöly). */
  reunapaino: 0.5,
};

/*
 * AKVARELLIN REUNAKERTYMÄ.
 *
 * Märkä väri kuivuu paksummaksi alueensa reunalle. Reunat haetaan
 * NELJÄSOSATARKKUUDELLA ja niin, että musteen omat pikselit jätetään
 * keskiarvon ulkopuolelle — muuten jokainen kirjain ja rantaviiva
 * saisi ympärilleen tumman kehän ja lehti sotkeutuisi. Näin jäljelle
 * jäävät vain oikeat värialueiden rajat: rannikko, hypsometrian
 * vyöhykkeet, naapurimaiden häivytys.
 *
 * TARKKUUS ON ITSE EFEKTIN LEVEYS. Kahdeksasosakuvalla Sobelin kolme
 * solua on 24 pikseliä, ja rannikko sai molemmin puolin niin leveän
 * tumman hunnun, että rantaviiva näytti sumealta. Neljäsosakuvalla
 * kertymä on 12 pikseliä eli akvarellin reuna eikä sumennus.
 */
const REUNAKERTYMA = {
  voima: 0.24,
  /* Sobelin tulos normalisoidaan tähän: sitä suurempi ero on
   * "täysi reuna". Yksikkö on 0-255 neljäsosakuvassa. */
  taysiEro: 30,
  /* Kertymä painottuu rajan tummemmalle puolelle (siihen, mihin väri
   * valuu); 0 = symmetrinen, 1 = vain tumma puoli. */
  tummaPaino: 0.55,
};

/*
 * RANNIKON VESIVIIVOITUS — LEHDEN SYVYYSILMAISU.
 *
 * === ESIKUVA ===
 *
 * Omistajan malli on 1800-luvun kaiverrettu kartta (*Valley of
 * Tenochtitlan, as seen by Cortez* -tyyliä). Siinä vettä ei ole
 * maalattu sävypinnaksi vaan PIIRRETTY: rantaa kiertää kymmeniä
 * lähekkäisiä samankeskisiä musteviivoja, jotka muodostavat leveän
 * tumman reunusvyön. Vyön tummuus tulee viivojen TIHEYDESTÄ eikä
 * yksittäisen viivan paksuudesta — viivat ovat hiuksenohuita, mutta
 * rannassa ne ovat lähes kiinni toisissaan ja harvenevat vähitellen,
 * kunnes loppuvat avomerelle. Kapea salmi jää kokonaan viivoitetuksi,
 * ja saarten vyöt sulautuvat yhteen.
 *
 * === MITEN SE TEHDÄÄN ===
 *
 * Viivan paikka luetaan RANTAETÄISYYDESTÄ (chamfer-muunnos meren
 * puolella, puolikkaalla tarkkuudella). Siitä seuraa kolme asiaa
 * ilmaiseksi: viivat ovat samankeskisiä rantaviivan kanssa, ne
 * myötäilevät jokaisen poukaman, ja kapeikossa kahden rannan vyöt
 * kohtaavat luontevasti.
 *
 * VIIVAVÄLI KASVAA LINEAARISESTI: k. viivan väli on `vali + k *
 * kasvu`. Kumulatiivinen etäisyys on siis toisen asteen polynomi, ja
 * viivanumero saadaan etäisyydestä sen juurella (ks. pääsilmukka).
 * Vakiokasvu on tarkoituksella yksinkertainen: se on säädettävissä
 * kahdella luvulla eikä vaadi taulukkoa etäisyyksiä.
 *
 * MIKSI PUOLIKAS ETÄISYYSKENTTÄ: chamferin askel on yksi kenttäpikseli,
 * joten neljäsosakentästä ei saa kolmen pikselin viivaväliä ulos (ks.
 * etäisyyskentän kommentti pääkoodissa).
 *
 * === LUETTAVUUS ===
 *
 * Vyö on tiheä, joten yksittäisen viivan on oltava hento: `voima` on
 * kertova tummennus eikä musteen sävy. Luminanssiportti pitää viivat
 * poissa meressä olevien nimien, symbolien ja rantaviivan päältä —
 * viiva ei saa syödä lehden omaa merkintää.
 *
 * === KAKSI VARIANTTIA ===
 *
 * `VESIVIIVAT_TIHEA` on esikuvan mukainen leveä vyö: 16 viivaa, vyö
 * noin 195 px 6400 pikselin lehdellä, sisin viivaväli kolme pikseliä.
 * `VESIVIIVAT_HARVA` on saman koneiston harva tulkinta: 8 selvästi
 * erillistä piirtoa, vyö noin 165 px. Vaihto on yksi rivi alempana —
 * omistaja valitsee kummasta pidetään.
 */
const VESIVIIVAT_TIHEA = {
  /* Ensimmäisen viivan etäisyys rantaviivasta (täysiä pikseleitä
   * 6400 pikselin lehdellä). Ei nollaan asti: rantaviiva on oma
   * piirtonsa eikä saa paksuuntua. */
  aloitus: 4,
  /* Ensimmäinen viivaväli ja välin kasvu viivaa kohti. 2,9 + 1,25
   * antaa 16 viivalla vyön, joka ulottuu noin 195 pikseliin: sisin väli
   * kolme pikseliä, uloin kaksikymmentäkaksi.
   *
   * VYÖN LEVEYS ON KAHDEN VIRHEEN VÄLISSÄ. 95 pikselin vyö katosi
   * kokolehdestä: puolentoista prosentin kaistale rannassa, eikä meri
   * lukenut viivoitetulta. 240 pikselin vyö taas ulottui niin kauas,
   * että uloimmat viivat sulkeutuivat avomerellä renkaiksi
   * pikkuluotojen ympäri ja meri näytti lammikolta, johon on
   * pudotettu kiviä. 195 pikseliä pitää tiheän osan rannassa ja näkyy
   * kokolehdessä — sen jälkeen viivaston katkaisee lähimaan
   * tiheysportti (`tiheysVali`) eikä pelkkä pituus. */
  vali: 2.9,
  kasvu: 1.25,
  /* Montako viivaa rannasta ulospäin. */
  viivoja: 16,
  /* Viivan puolileveys täysinä pikseleinä. Vakio: vain tiheys
   * harvenee ulospäin, ei viivan paksuus. 0,95 tekee 6400 pikselin
   * lehdellä noin kahden pikselin viivan — ohut mutta terävä, ja
   * sisimmällä kolmen pikselin välillä viiva peittää kaksi kolmasosaa
   * pinnasta: rannassa vyö on lähes umpeen viivoitettu. */
  paksuus: 0.95,
  /* Kertova tummennus viivan keskellä: meren 200:sta noin 145:een,
   * kun rantaviivan muste on 65. Viiva on siis selvästi näkyvä mutta
   * yhä vaaleampi kuin rantaviiva, kuten esikuvassa. */
  voima: 0.28,
  /* Uloimman viivan häipyminen: (1 - k/maara)^haipyma, missä `maara`
   * on tiheysportin lyhentämä viivamäärä. */
  haipyma: 1.25,
  /* Lähimaan tiheysportti [luoto, manner] ja vyön lyhin osuus. Luodon
   * rannalla maata on 70 pikselin laatikossa pari prosenttia ja vyöstä
   * piirtyy kolmasosa (viisi rengasta); mantereen rannalla osuus on
   * lähellä puolta ja vyö on täysi. */
  tiheysVali: [0.05, 0.42],
  lyhinOsuus: 0.33,
  /* Meren kromaraja [täysi meri, ei enää meri]. */
  kromaVali: [34, 44],
  /* Luminanssiportti: viiva ei piirry musteen (nimet, symbolit,
   * rantaviiva) päälle. Sama akseli kuin SYVYYS-litistyksessä. */
  lumVali: [150, 178],
  /* Käsivaraheilunta: näytepisteen siirtymä täysinä pikseleinä, kolme
   * oktaavia skaalasta `huojuntaSkaala` alaspäin (140 / 68 / 33 px).
   * Amplitudi saa olla viivaväliä suurempi, koska siirtymä on
   * PAIKALLISESTI YHTENÄINEN: viivat liikkuvat yhdessä eivätkä mene
   * ristiin. Vasta amplitudin ja skaalan SUHDE (tässä noin 0,05)
   * vääntäisi viivastoa. */
  huojunta: 7,
  huojuntaSkaala: 140,
  huojuntaOktaavit: 3,
  /* Viivan voiman satunnaisvaihtelu pitkin viivaa: muste ei kanna
   * tasaisesti. */
  roso: 0.55,
  rosoSkaala: 26,
};

/* Harva tulkinta vertailua varten: samat kentät, harvempi vyö. */
const VESIVIIVAT_HARVA = {
  ...VESIVIIVAT_TIHEA,
  aloitus: 6,
  vali: 9,
  kasvu: 3.2,
  viivoja: 8,
  paksuus: 1.2,
  voima: 0.24,
  haipyma: 1.0,
  huojunta: 9,
};

/* VALINTA: kumpi vesiviivoitus ajetaan. */
const VESIVIIVOITUS = VESIVIIVAT_TIHEA;

/*
 * MAANRAJAT ASTEEN TUMMEMMIKSI.
 *
 * Omistaja 29.8.2026: *"maanrajat saavat olla asteen tummemmalla"*.
 *
 * MIKSI PATINAPASSISSA EIKÄ PIIRTIMESSÄ. Rajaviivan väri on yksi
 * literaali piirtimessä (tools/fokuskartta/piirto.js, naapurien
 * ääriviiva `rgba(56,38,24,1)`), ja sieltä sen voisi tummentaa
 * suoraan. Mutta pohjalehdet ovat esirenderöityjä: piirtimen muutos
 * vaatisi jokaisen maan lehden ajamisen uudelleen (ETOPO-aineisto,
 * selainajo, ämpäri) yhden sävyaskeleen takia. Patinapassi ajetaan
 * joka tapauksessa valmiille lehdelle, joten askel maksaa tässä
 * nolla. Jos rajaviivaa joskus muutetaan muutenkin, oikea paikka on
 * piirrin ja tämä passi voidaan poistaa.
 *
 * MITEN RAJA TUNNISTETAAN. Pohjakuvasta mitattuna (GRC 6400 px) muste
 * jakautuu kahteen selvään kasaan: naapurien ääriviiva on
 * luminanssiltaan 35-49 ja kaikki muu muste — rantaviiva, nimet, joet,
 * symbolit — 50-64. Pelkkä luminanssiportti [40 … 52] osuu siis
 * täsmälleen rajaviivaan. Todennettu maskikuvasta: portin alle jäävät
 * vain naapurirenkaat.
 */
const MAANRAJA = {
  /* Kertova tummennus viivan ytimessä. 0,11 vie patinoidun rajan
   * noin 65:stä 58:aan — asteen, ei mustaksi. */
  voima: 0.11,
  /* Luminanssiportti pohjakuvan sävyssä [täysi tummennus, ei mitään]. */
  lumVali: [40, 52],
};

/* Viivojen mikrorosoisuus: musteen reuna ei ole tasainen. */
const ROSOISUUS = { voima: 0.5, skaala: 420 };

/*
 * PAINOLAATTOJEN KOHDISTUSHEITTO — VAROVASTI.
 *
 * Kivipainossa värilaatta ei osu viivalaattaan pikselilleen. Sitä ei
 * jäljitellä siirtämällä koko kuvaa (silloin siirtyisivät myös nimet
 * ja rantaviiva, ja kartta menisi pois kohdistaan laudan kanssa) vaan
 * lisäämällä pikseliin MATALATAAJUISEN VÄRIN erotus siirretystä
 * kohdasta. Viiva- ja tekstitieto on korkeataajuista ja jää
 * paikalleen; siirtymä näkyy vain värialueiden rajoilla ohuena
 * väriripsauksena, kuten oikeassa vedoksessa.
 */
const KOHDISTUS = { dx: 2.6, dy: -1.8, voima: 0.85 };

/* Musteen kevyt leviäminen: hiuksenhieno kehä kirjaimen ympärille. */
const LEVIAMINEN = { sade: 2, voima: 0.3 };

/*
 * KEVYET TAITEJÄLJET — POIS KÄYTÖSTÄ KAIKISSA RESEPTEISSÄ.
 *
 * Ajatus: lehti on ollut taitettuna, yksi pystytaite keskellä ja kaksi
 * vaakataitetta kolmanneksissa; kapea tummempi ydin ja sen molemmin
 * puolin leveä vaalea vyöhyke (paperi on kohonnut).
 *
 * MIKSI POIS. Omistajan arvio 29.8.2026: "taitteet näyttävät
 * feikiltä". Syy on rakenteellinen eikä parametreissa: gaussinen viiva
 * kulkee koko lehden yli yhtä vahvana riippumatta siitä, mitä sen alla
 * on, kun oikeassa taitteessa muste on kulunut ytimestä pois ja
 * vaurio vaihtelee koko matkalla. Voiman pienentäminen ei korjaa
 * ilmiötä, se vain tekee siitä himmeän. Koodi jätetään paikalleen: jos
 * toteutus joskus paranee (musteen kuluminen ytimessä, epätasainen
 * vaurio, taitteen katkeaminen), riittää vaihtaa reseptin kenttä
 * `taitteet: false` arvoksi `TAITTEET`.
 */
const TAITTEET = {
  pysty: [0.5], vaaka: [0.34, 0.68],
  voima: 0.05, ydin: 2.4, hehku: 90, hehkuOsuus: 0.35,
  /* Taite ei ole viivotinsuora: kohina heiluttaa sitä. */
  huojunta: 6,
};

/* Vinjetointi: reunat tummenevat ja lämpenevät. */
const VINJETTI = { voima: 0.1, eksponentti: 2.4, lampo: 0.4 };

/*
 * SYVYYS ON SAMA KAIKILLA TASOILLA — se ei ole patinan voimakkuutta.
 *
 * Muut passit ovat tyylivalintoja, joita tasot annostelevat. Tämä on
 * pohjakuvan VIRHEEN korjaus: banding on yhtä väärin hillityssä kuin
 * täydessä vedoksessa, eikä kukaan halua nähdä sitä "vähän". Siksi sama
 * olio jokaisessa reseptissä, ei kolmea voimakkuutta.
 */
export const RESEPTIT = {
  hillitty: {
    nimi: 'hillitty',
    savyt: SAVYT,
    syvyys: SYVYYS,
    vesiviivoitus: VESIVIIVOITUS,
    maanraja: MAANRAJA,
    pastelli: PASTELLI_KEVYT,
    paperi: PAPERI_KEVYT,
    ikaantyminen: null,
    reunakertyma: null,
    rosoisuus: null,
    kohdistus: null,
    leviaminen: null,
    /* Ks. TAITTEET: pois kaikista resepteistä, koodi jätetty lipun
     * taakse. Arvoksi TAITTEET, jos toteutus joskus paranee. */
    taitteet: false,
    vinjetti: null,
  },
  keskitaso: {
    nimi: 'keskitaso',
    savyt: SAVYT,
    syvyys: SYVYYS,
    vesiviivoitus: VESIVIIVOITUS,
    maanraja: MAANRAJA,
    pastelli: PASTELLI_KESKI,
    paperi: PAPERI_KEVYT,
    ikaantyminen: IKAANTYMINEN,
    reunakertyma: REUNAKERTYMA,
    rosoisuus: null,
    kohdistus: null,
    leviaminen: null,
    taitteet: false,
    vinjetti: null,
  },
  taysi: {
    nimi: 'taysi',
    savyt: SAVYT,
    syvyys: SYVYYS,
    vesiviivoitus: VESIVIIVOITUS,
    maanraja: MAANRAJA,
    pastelli: PASTELLI_TAYSI,
    paperi: PAPERI_TAYSI,
    ikaantyminen: IKAANTYMINEN,
    reunakertyma: REUNAKERTYMA,
    rosoisuus: ROSOISUUS,
    kohdistus: KOHDISTUS,
    leviaminen: LEVIAMINEN,
    taitteet: false,
    vinjetti: VINJETTI,
  },
};

/*
 * VERTAILUPALA: sama rajattu alue jokaisesta versiosta.
 *
 * Peloponnesos rannikkoineen 6400 pikselin lehdellä. Alueella on
 * yhtaikaa kaikki, mitä arvioitavana on: pitkä rantaviiva
 * (vesiviivoitus), vuoristo ja alanko vierekkäin (reunakertymä),
 * kaksi kaupunginnimeä (musteen leviäminen, luettavuus) ja iso
 * tyhjä meri (paperin syy, ikääntyminen). Muulla kuin 6400 pikselin
 * leveydellä rajaus skaalataan.
 */
export const VERTAILUPALA = {
  x: 1950, y: 1830, w: 1200, h: 900, lehdenLeveys: 6400,
};

/* ========================================================== selainkoodi */

/*
 * Koko kuvankäsittely yhtenä funktiona, joka ajetaan selaimessa.
 * Playwright sarjallistaa funktion lähdekoodiksi, joten se ei voi
 * viitata mihinkään moduulin ulkopuoliseen — kaikki apurit ovat
 * sisällä ja kaikki parametrit tulevat argumenttina.
 */
async function patinoiSelaimessa({
  b64, tyyppi, resepti, leveys, muoto, laatu, tausta,
}) {
  /* --------------------------------------------------------- apurit */
  const mulberry32 = (a) => function satunnainen() {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  /** Siemenellinen arvokohina: N x N taulu ja bilineaarinen kiertohaku. */
  const teeKohina = (siemen, N = 256) => {
    const rnd = mulberry32(siemen);
    const t = new Float32Array(N * N);
    for (let i = 0; i < t.length; i++) t[i] = rnd();
    return (x, y) => {
      const fx = ((x % N) + N) % N; const fy = ((y % N) + N) % N;
      const x0 = Math.floor(fx); const y0 = Math.floor(fy);
      const x1 = (x0 + 1) % N; const y1 = (y0 + 1) % N;
      const tx = fx - x0; const ty = fy - y0;
      const sx = tx * tx * (3 - 2 * tx); const sy = ty * ty * (3 - 2 * ty);
      const a = t[y0 * N + x0]; const b = t[y0 * N + x1];
      const c = t[y1 * N + x0]; const d2 = t[y1 * N + x1];
      return (a + (b - a) * sx) * (1 - sy) + (c + (d2 - c) * sx) * sy;
    };
  };
  /** Monta oktaavia samasta kohinasta, keskiarvo 0,5. */
  const fbm = (kohina, x, y, oktaavit) => {
    let summa = 0; let paino = 0; let amp = 1; let taajuus = 1;
    for (let o = 0; o < oktaavit; o++) {
      summa += amp * kohina(x * taajuus, y * taajuus);
      paino += amp; amp *= 0.5; taajuus *= 2.07;
    }
    return summa / paino;
  };
  /** Pehmeä porras: 0 kun x<=a, 1 kun x>=b. */
  const pehmene = (a, b, x) => {
    if (b === a) return x < a ? 0 : 1;
    const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  /** Kokonaislukuhajautus pikselin omaan raeeseen. */
  const rae = (x, y, s) => {
    let h = Math.imul(x + 374761393, 668265263) ^ Math.imul(y + 3266489917, 374761393) ^ s;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };

  /* ------------------------------------------------------ kuvan avaus */
  const kuva = new Image();
  kuva.src = `data:image/${tyyppi};base64,${b64}`;
  await kuva.decode();
  const L = leveys || kuva.width;
  const K = Math.round(kuva.height * (L / kuva.width));
  const kanvaasi = document.createElement('canvas');
  kanvaasi.width = L; kanvaasi.height = K;
  const g = kanvaasi.getContext('2d', { willReadFrequently: true });
  g.imageSmoothingQuality = 'high';
  g.drawImage(kuva, 0, 0, L, K);
  const kuvadata = g.getImageData(0, 0, L, K);
  const d = kuvadata.data;
  /* Kaikki mitat on säädetty 6400 pikselin lehdelle. */
  const s = L / 6400;

  const lum = (r, gg, b) => 0.299 * r + 0.587 * gg + 0.114 * b;

  /* ------------------------------------------------- pienennetyt kentät */
  /*
   * Neljäsosakuva (meri ja kohdistus) ja kahdeksasosakuva (reunat).
   * Molemmissa MUSTE JÄTETÄÄN KESKIARVON ULKOPUOLELLE: muuten
   * rantaviiva ja nimet näkyisivät reunakenttänä ja saisivat
   * ympärilleen kehän.
   */
  const J4 = 4;
  const L4 = Math.ceil(L / J4); const K4 = Math.ceil(K / J4);
  const r4 = new Float32Array(L4 * K4); const g4 = new Float32Array(L4 * K4);
  const b4 = new Float32Array(L4 * K4); const a4 = new Float32Array(L4 * K4);
  {
    const n4 = new Float32Array(L4 * K4);
    for (let y = 0; y < K; y++) {
      const ry = (y / J4) | 0;
      for (let x = 0; x < L; x++) {
        const i = (y * L + x) * 4;
        const j = ry * L4 + ((x / J4) | 0);
        a4[j] += d[i + 3];
        if (lum(d[i], d[i + 1], d[i + 2]) < 150) continue;
        r4[j] += d[i]; g4[j] += d[i + 1]; b4[j] += d[i + 2]; n4[j] += 1;
      }
    }
    for (let j = 0; j < r4.length; j++) {
      a4[j] /= (J4 * J4);
      if (n4[j] > 0) { r4[j] /= n4[j]; g4[j] /= n4[j]; b4[j] /= n4[j]; } else { r4[j] = 210; g4[j] = 200; b4[j] = 180; }
    }
  }
  /** Bilineaarinen haku neljäsosakentästä täysillä koordinaateilla. */
  const hae4 = (kentta, x, y) => {
    const fx = Math.max(0, Math.min(L4 - 1.001, x / J4 - 0.5));
    const fy = Math.max(0, Math.min(K4 - 1.001, y / J4 - 0.5));
    const x0 = fx | 0; const y0 = fy | 0; const tx = fx - x0; const ty = fy - y0;
    const i0 = y0 * L4 + x0; const i1 = i0 + L4;
    return (kentta[i0] * (1 - tx) + kentta[i0 + 1] * tx) * (1 - ty)
      + (kentta[i1] * (1 - tx) + kentta[i1 + 1] * tx) * ty;
  };

  /* ------------------------------------------------ reunakertymäkenttä */
  let reuna4 = null; let kirkkaus4 = null;
  if (resepti.reunakertyma) {
    kirkkaus4 = new Float32Array(L4 * K4);
    /* Lämpö (r-b) erottaa värialueet, joilla on sama kirkkaus —
     * esimerkiksi meren ja alangon. */
    const lampo4 = new Float32Array(L4 * K4);
    for (let j = 0; j < kirkkaus4.length; j++) {
      kirkkaus4[j] = lum(r4[j], g4[j], b4[j]);
      lampo4[j] = r4[j] - b4[j];
    }
    /* Sobel sekä kirkkaudelle että lämmölle; suurempi voittaa. */
    reuna4 = new Float32Array(L4 * K4);
    const sob = (kentta, x, y) => {
      const p = (xx, yy) => kentta[Math.max(0, Math.min(K4 - 1, yy)) * L4
        + Math.max(0, Math.min(L4 - 1, xx))];
      const gx = (p(x + 1, y - 1) + 2 * p(x + 1, y) + p(x + 1, y + 1))
        - (p(x - 1, y - 1) + 2 * p(x - 1, y) + p(x - 1, y + 1));
      const gy = (p(x - 1, y + 1) + 2 * p(x, y + 1) + p(x + 1, y + 1))
        - (p(x - 1, y - 1) + 2 * p(x, y - 1) + p(x + 1, y - 1));
      return Math.hypot(gx, gy) / 4;
    };
    for (let y = 0; y < K4; y++) {
      for (let x = 0; x < L4; x++) {
        reuna4[y * L4 + x] = Math.max(sob(kirkkaus4, x, y), sob(lampo4, x, y) * 1.3);
      }
    }
  }
  /** Onko pikseli rajan tummemmalla puolella? (-1..1) */
  const haeTummaPuoli = (x, y, oma) => {
    const fx = Math.max(0, Math.min(L4 - 1, Math.round(x / J4)));
    const fy = Math.max(0, Math.min(K4 - 1, Math.round(y / J4)));
    return (kirkkaus4[fy * L4 + fx] - oma) / 40;
  };

  /* ------------------------------------------------ meren etäisyyskenttä */
  /*
   * Sekä vesiviivoitus että syvyysvyöhykkeet tarvitsevat etäisyyden
   * rannasta, joten kenttä lasketaan kummalle tahansa.
   *
   * KENTTÄ ON PUOLIKKAALLA TARKKUUDELLA, EI NELJÄSOSALLA. Chamferin
   * askel on yksi kenttäpikseli, joten neljäsosakentän etäisyys
   * kvantisoituu NELJÄN täyden pikselin portaisiin. Se riitti, kun
   * viivaväli oli 15 pikseliä, mutta ei enää: vesiviivoituksen sisin
   * väli on kolmisen pikseliä (ks. VESIVIIVOITUS), eikä kolmen pikselin
   * viivaväliä voi poimia neljän pikselin portaista. Puolikas antaa
   * kahden pikselin kvantin ja bilineaarisella haulla jatkuvan rampin —
   * ja samalla rantaviivan mutkat säilyvät: neljäsosakentässä kapea
   * poukama katosi kokonaan, ja viivat oikaisivat sen ohi.
   *
   * Hinta on muisti ja aika: puolikas kenttä on 4 x neljäsosakentän
   * kokoinen (6400 pikselin lehdellä 30 MB) ja väliaikaiset
   * väriakkumulaattorit sen verran lisää. Ne vapautetaan heti
   * maskin laskennan jälkeen.
   */
  const meriParam = resepti.vesiviivoitus ?? resepti.syvyys;
  const J2 = 2;
  const L2 = Math.ceil(L / J2); const K2 = Math.ceil(K / J2);
  let etaisyys2 = null;
  if (meriParam) {
    const vv = meriParam;
    let meri = new Uint8Array(L2 * K2);
    {
      /* Puolikas alaskaalaus, MUSTE POIS KESKIARVOSTA kuten
       * neljäsosakentässä: muuten rantaviiva ja nimet vetäisivät
       * ympäristönsä kroman musteen puolelle. */
      const rr = new Float32Array(L2 * K2); const gg2 = new Float32Array(L2 * K2);
      const bb = new Float32Array(L2 * K2); const aa = new Float32Array(L2 * K2);
      const nn = new Float32Array(L2 * K2);
      for (let y = 0; y < K; y++) {
        const ry = (y / J2) | 0;
        for (let x = 0; x < L; x++) {
          const i = (y * L + x) * 4;
          const j = ry * L2 + ((x / J2) | 0);
          aa[j] += d[i + 3];
          if (lum(d[i], d[i + 1], d[i + 2]) < 150) continue;
          rr[j] += d[i]; gg2[j] += d[i + 1]; bb[j] += d[i + 2]; nn[j] += 1;
        }
      }
      for (let j = 0; j < meri.length; j++) {
        const a = aa[j] / (J2 * J2);
        if (nn[j] === 0) { meri[j] = 0; continue; }
        const r = rr[j] / nn[j]; const g2 = gg2[j] / nn[j]; const b2 = bb[j] / nn[j];
        const kroma = Math.max(r, g2, b2) - Math.min(r, g2, b2);
        /* Meri: matala kroma, riittävä peitto ja järkevä kirkkaus. */
        meri[j] = (kroma < vv.kromaVali[1] && a > 200 && lum(r, g2, b2) > 120) ? 1 : 0;
      }
    }
    /* Yksi avaus + sulkeminen 3x3: yksittäiset pikselit pois, jotta
     * viivoitus ei syty vaalean maan sisälle. */
    const morf = (lahde, laajenna) => {
      const ulos = new Uint8Array(lahde.length);
      for (let y = 0; y < K2; y++) {
        for (let x = 0; x < L2; x++) {
          let arvo = laajenna ? 0 : 1;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const xx = Math.max(0, Math.min(L2 - 1, x + dx));
              const yy = Math.max(0, Math.min(K2 - 1, y + dy));
              const v = lahde[yy * L2 + xx];
              if (laajenna) arvo = arvo || v; else arvo = arvo && v;
            }
          }
          ulos[y * L2 + x] = arvo ? 1 : 0;
        }
      }
      return ulos;
    };
    const siisti = morf(morf(morf(meri, false), true), true);
    meri = null;
    /*
     * TARKKA EUKLIDINEN ETÄISYYSMUUNNOS (Felzenszwalb-Huttenlocher).
     *
     * Chamfer (1 / 1,41) riitti, kun kentästä luettiin vain "kaukana vai
     * lähellä rantaa". Vesiviivoitus lukee siitä VIIVOJEN PAIKAN, ja
     * chamferin kulmavirhe (noin 6 %) piirtyi silloin suoraan kuvaan:
     * avomerelle jäävät uloimmat viivat kaartuivat kahdeksankulmioiksi.
     * Tämä muunnos on tarkka — kaksi 1D-parabelipyyhkäisyä, sarakkeet ja
     * sitten rivit — ja yhtä nopea. Viiva kaartuu siis niin kuin ranta,
     * ei niin kuin ruudukko.
     */
    const ISO = 1e9;
    const nMax = Math.max(L2, K2);
    const kentta = new Float64Array(L2 * K2);
    for (let j = 0; j < kentta.length; j++) kentta[j] = siisti[j] ? ISO : 0;
    const f = new Float64Array(nMax); const dd = new Float64Array(nMax);
    const vv2 = new Int32Array(nMax); const zz = new Float64Array(nMax + 1);
    const edt1d = (n) => {
      let k = 0; vv2[0] = 0; zz[0] = -1e20; zz[1] = 1e20;
      for (let q = 1; q < n; q++) {
        let sj = ((f[q] + q * q) - (f[vv2[k]] + vv2[k] * vv2[k]))
          / (2 * q - 2 * vv2[k]);
        while (sj <= zz[k]) {
          k -= 1;
          sj = ((f[q] + q * q) - (f[vv2[k]] + vv2[k] * vv2[k])) / (2 * q - 2 * vv2[k]);
        }
        k += 1; vv2[k] = q; zz[k] = sj; zz[k + 1] = 1e20;
      }
      k = 0;
      for (let q = 0; q < n; q++) {
        while (zz[k + 1] < q) k += 1;
        dd[q] = (q - vv2[k]) * (q - vv2[k]) + f[vv2[k]];
      }
    };
    for (let x = 0; x < L2; x++) {
      for (let y = 0; y < K2; y++) f[y] = kentta[y * L2 + x];
      edt1d(K2);
      for (let y = 0; y < K2; y++) kentta[y * L2 + x] = dd[y];
    }
    etaisyys2 = new Float32Array(L2 * K2);
    for (let y = 0; y < K2; y++) {
      const p = y * L2;
      for (let x = 0; x < L2; x++) f[x] = kentta[p + x];
      edt1d(L2);
      for (let x = 0; x < L2; x++) {
        /* Neliöjuuri ja takaisin täysiksi pikseleiksi. */
        etaisyys2[p + x] = dd[x] > 1e8 ? 1e8 : Math.sqrt(dd[x]) * J2;
      }
    }
  }
  /* --------------------------------------------- lähimaan tiheyskenttä */
  /*
   * KUINKA ISON MAAN RANNALLA OLLAAN.
   *
   * Vesiviivoitus on rantaviivan etäisyyden funktio, eikä etäisyys
   * tiedä mitään siitä, mikä ranta on kyseessä. Yhden pikselin luoto
   * keskellä ulappaa sai siksi saman viisitoista rengasta kuin
   * Peloponnesos, ja meri näytti lammikolta, johon on pudotettu kiviä.
   * Kaivertaja ei tee niin: luodon ympärille tulee pari viivaa,
   * mantereen rannalle koko vyö.
   *
   * Kentän arvo on maan osuus laatikossa, jonka säde on `TIHEYS_SADE`
   * täyttä pikseliä: mantereen rannalla noin puolet, luodon rannalla
   * prosentteja. Kenttä LUETAAN PIKSELIN LÄHIMMÄSTÄ RANTAPISTEESTÄ
   * eikä pikselin omasta kohdasta (ks. pääsilmukka) — muuten luoto,
   * joka sattuu olemaan lähellä mannerta, perisi mantereen vyön.
   * Kenttä ei siirrä yhtäkään viivaa; se vain katkaisee viivaston
   * aikaisemmin siellä, missä maata on vähän.
   */
  let tiheys2 = null;
  if (resepti.vesiviivoitus && etaisyys2) {
    const TIHEYS_SADE = 70;
    const R = Math.max(1, Math.round(TIHEYS_SADE * s / J2));
    const maa = new Float32Array(L2 * K2);
    /* Maa = ei merta. Etäisyys 0 tarkoittaa maata (tai kuvan ulkopuolta). */
    for (let j = 0; j < maa.length; j++) maa[j] = etaisyys2[j] === 0 ? 1 : 0;
    const apu = new Float32Array(L2 * K2);
    const n = 2 * R + 1;
    for (let y = 0; y < K2; y++) {
      const p = y * L2;
      let summa = 0;
      for (let k = -R; k <= R; k++) summa += maa[p + Math.max(0, Math.min(L2 - 1, k))];
      for (let x = 0; x < L2; x++) {
        apu[p + x] = summa / n;
        summa += maa[p + Math.max(0, Math.min(L2 - 1, x + R + 1))]
          - maa[p + Math.max(0, Math.min(L2 - 1, x - R))];
      }
    }
    tiheys2 = new Float32Array(L2 * K2);
    for (let x = 0; x < L2; x++) {
      let summa = 0;
      for (let k = -R; k <= R; k++) summa += apu[Math.max(0, Math.min(K2 - 1, k)) * L2 + x];
      for (let y = 0; y < K2; y++) {
        tiheys2[y * L2 + x] = summa / n;
        summa += apu[Math.max(0, Math.min(K2 - 1, y + R + 1)) * L2 + x]
          - apu[Math.max(0, Math.min(K2 - 1, y - R)) * L2 + x];
      }
    }
  }

  /** Bilineaarinen haku puolikkaasta kentästä täysillä koordinaateilla. */
  const hae2 = (kentta, x, y) => {
    const fx = Math.max(0, Math.min(L2 - 1.001, x / J2 - 0.5));
    const fy = Math.max(0, Math.min(K2 - 1.001, y / J2 - 0.5));
    const x0 = fx | 0; const y0 = fy | 0; const tx = fx - x0; const ty = fy - y0;
    const i0 = y0 * L2 + x0; const i1 = i0 + L2;
    return (kentta[i0] * (1 - tx) + kentta[i0 + 1] * tx) * (1 - ty)
      + (kentta[i1] * (1 - tx) + kentta[i1 + 1] * tx) * ty;
  };

  /* ------------------------------------- syvyysvyöhykkeet: meren keskisävy */
  /*
   * Yksi kenttä riittää: meren keskiväri sävytyksen JÄLKEEN — se, mitä
   * kohti porrasaskeleet litistetään.
   *
   * Tässä oli aiemmin myös DoG-koneisto (V - blur V, sen gradientti ja
   * portaan jyrkkyys), jolla porrasrajat piirrettiin takaisin
   * kaiverrusviivoina. Omistaja hylkäsi sen 29.8.2026: viivoja tuli
   * kolme neljä ja nekin niin haaleina, että *"syvyys ei näy oikein
   * ollenkaan"*. Vika oli mekanismissa eikä säädössä — pohjan portaat
   * ovat siellä, minne piirtomoottori ne sattui laskemaan, eivät siellä,
   * mihin kaivertaja vetäisi viivansa. Vesiviivoitus piirretään nyt
   * rantaviivan ETÄISYYSKENTÄSTÄ (ks. VESIVIIVOITUS), joka antaa niin
   * monta samankeskistä viivaa kuin halutaan. Litistys jäi: renkaat
   * eivät saa palata.
   */
  let meriRef = null;
  if (resepti.syvyys) {
    const sy0 = resepti.syvyys;
    let sR = 0; let sG = 0; let sB = 0; let sN = 0;
    for (let j = 0; j < r4.length; j++) {
      const kr = Math.max(r4[j], g4[j], b4[j]) - Math.min(r4[j], g4[j], b4[j]);
      const Lv = lum(r4[j], g4[j], b4[j]);
      if (kr < sy0.kromaVali[1] && a4[j] > 200 && Lv > 120) {
        sR += r4[j]; sG += g4[j]; sB += b4[j]; sN += 1;
      }
    }
    /*
     * Meren keskiväri sävykäyrän läpi. Käyrä on affiini, ja meri jää
     * sekä muste- että kermaikkunan väliin (L noin 180-215), joten
     * pääsilmukan kohta 1 tekee meripikselille TÄSMÄLLEEN tämän saman
     * muunnoksen — litistys osuu siis oikeaan sävyyn eikä siirrä merta.
     */
    const kk = resepti.savyt.kayra;
    meriRef = sN
      ? [sR / sN * kk.kerroin + kk.nosto, sG / sN * kk.kerroin + kk.nosto,
        sB / sN * kk.kerroin + kk.nosto]
      : [200, 200, 200];
  }

  /* ------------------------------------------ värilaatta kohdistusta varten */
  /*
   * Kohdistusheitto siirtää VÄRILAATTAA, ja värilaatta on pehmeä.
   * Ilman sumennusta neljäsosakentässä on vielä vuoristovarjostuksen
   * korkeaa taajuutta, ja siirretty erotus näkyi rinteillä oransseina
   * pilkkuina — ei kohdistusheittona vaan väriroskana. Kolme
   * laatikkosumennusta tekee kentästä sen, mitä värilaatta on.
   */
  if (resepti.kohdistus) {
    const sumenna = (kentta) => {
      const apu = new Float32Array(kentta.length);
      for (let toisto = 0; toisto < 3; toisto++) {
        for (let y = 0; y < K4; y++) {
          for (let x = 0; x < L4; x++) {
            const j = y * L4 + x;
            const v = kentta[j - (x > 0 ? 1 : 0)] + kentta[j] + kentta[j + (x < L4 - 1 ? 1 : 0)];
            apu[j] = v / 3;
          }
        }
        for (let y = 0; y < K4; y++) {
          for (let x = 0; x < L4; x++) {
            const j = y * L4 + x;
            const v = apu[j - (y > 0 ? L4 : 0)] + apu[j] + apu[j + (y < K4 - 1 ? L4 : 0)];
            kentta[j] = v / 3;
          }
        }
      }
    };
    sumenna(r4); sumenna(g4); sumenna(b4);
  }

  /* ------------------------------------------------------- mustekentät */
  let musteSumea = null;
  if (resepti.leviaminen) {
    const sade = Math.max(1, Math.round(resepti.leviaminen.sade * s));
    const m = new Uint8Array(L * K);
    for (let p = 0; p < L * K; p++) {
      const i = p * 4;
      m[p] = Math.round(255 * pehmene(158, 70, lum(d[i], d[i + 1], d[i + 2])));
    }
    /* Erotteleva laatikkosumennus kahdesti = lähes gaussinen. */
    const apu = new Uint8Array(L * K);
    const laatikko = (lahde, ulos, vaaka) => {
      const N = vaaka ? L : K;
      const M = vaaka ? K : L;
      const askel = vaaka ? 1 : L;
      for (let rivi = 0; rivi < M; rivi++) {
        const pohja = vaaka ? rivi * L : rivi;
        let summa = 0;
        for (let k = -sade; k <= sade; k++) summa += lahde[pohja + Math.max(0, Math.min(N - 1, k)) * askel];
        for (let x = 0; x < N; x++) {
          ulos[pohja + x * askel] = summa / (2 * sade + 1);
          const poistu = Math.max(0, Math.min(N - 1, x - sade));
          const tule = Math.max(0, Math.min(N - 1, x + sade + 1));
          summa += lahde[pohja + tule * askel] - lahde[pohja + poistu * askel];
        }
      }
    };
    laatikko(m, apu, true);
    laatikko(apu, m, false);
    musteSumea = m;
  }

  /* ------------------------------------------------------- kohinakentät */
  /* Kuiduille iso taulu (512): pieninkin kuituskaala kiertää vasta
   * lehden korkeuden mittaisin välein, ja warp rikkoo lopunkin
   * jaksollisuuden. Muille 256 riittää. */
  /* Kuidun taulut ovat 1024 yksikköä: hienoksi pudotetulla
   * mittakaavalla (2,3 px / yksikkö) 512 olisi toistunut pystyssä jo
   * 1180 pikselin välein eli kolmesti lehden korkeudella. */
  const kohinaKuitu = teeKohina(20260829, 1024);
  const kohinaRisti = teeKohina(51217, 1024);
  const kohinaWarp = teeKohina(880301, 256);
  const kohinaRae = teeKohina(133742, 256);
  const kohinaKlimppi = teeKohina(606061, 256);
  const kohinaIka = teeKohina(77003);
  const kohinaRoso = teeKohina(4242);
  const kohinaVesiviiva = teeKohina(18730829);
  const kohinaTaite = teeKohina(9191);

  /* ---------------------------------------------------------- pääsilmukka */
  const sv = resepti.savyt;
  const musteNorm = (() => {
    const l = lum(sv.muste[0], sv.muste[1], sv.muste[2]);
    return [sv.muste[0] / l, sv.muste[1] / l, sv.muste[2] / l];
  })();
  const sy = resepti.syvyys;
  const pl = resepti.pastelli;
  const pa = resepti.paperi;
  const ika = resepti.ikaantyminen;
  const rk = resepti.reunakertyma;
  const vv = resepti.vesiviivoitus;
  const mr = resepti.maanraja;
  const ro = resepti.rosoisuus;
  const ko = resepti.kohdistus;
  const le = resepti.leviaminen;
  const ta = resepti.taitteet;
  const vi = resepti.vinjetti;
  const kesX = L / 2; const kesY = K / 2;
  const kulmaEt = Math.hypot(kesX, kesY);

  for (let y = 0; y < K; y++) {
    for (let x = 0; x < L; x++) {
      const i = (y * L + x) * 4;
      const alfa = d[i + 3];
      if (alfa === 0) {
        if (muoto === 'jpeg') { d[i] = tausta[0]; d[i + 1] = tausta[1]; d[i + 2] = tausta[2]; d[i + 3] = 255; }
        continue;
      }
      let r = d[i]; let gg = d[i + 1]; let b = d[i + 2];
      const Lp = lum(r, gg, b);

      /* --- 1. sävyt: muste ruskeaksi, valkoinen kermaksi, käyrä --- */
      const musteOsuus = pehmene(sv.musteVali[1], sv.musteVali[0], Lp);
      const musteW = musteOsuus * sv.musteVoima;
      if (musteW > 0) {
        r += (musteNorm[0] * Lp - r) * musteW;
        gg += (musteNorm[1] * Lp - gg) * musteW;
        b += (musteNorm[2] * Lp - b) * musteW;
        /* Viivan kontrastin lasku: vain muste, ei koko kuva. */
        const h = sv.musteHaalennus * musteOsuus;
        if (h > 0) {
          r += (sv.kerma[0] - r) * h;
          gg += (sv.kerma[1] - gg) * h;
          b += (sv.kerma[2] - b) * h;
        }
      }
      const kermaW = pehmene(sv.kermaVali[0], sv.kermaVali[1], Lp) * sv.kermaVoima;
      if (kermaW > 0) {
        r += (sv.kerma[0] - r) * kermaW;
        gg += (sv.kerma[1] - gg) * kermaW;
        b += (sv.kerma[2] - b) * kermaW;
      }
      r = r * sv.kayra.kerroin + sv.kayra.nosto;
      gg = gg * sv.kayra.kerroin + sv.kayra.nosto;
      b = b * sv.kayra.kerroin + sv.kayra.nosto;

      /* Meren tunnistus vesiviivoitusta varten tehdään TÄSTÄ kromasta,
       * ennen pastellointia: pastellointi laskee maaston kromaa, ja
       * jälkeenpäin mitattuna osa maasta osuisi meren kromaikkunaan. */
      const kroma0 = Math.max(r, gg, b) - Math.min(r, gg, b);

      /* --- 1b. syvyysvyöhykkeiden litistys --- */
      /*
       * Meren paino kolmesta ehdosta: matala kroma (meri), riittävä
       * luminanssi (ei mustetta) ja etäisyys rannasta (ei rantaviivan
       * antialiasointia).
       */
      let syvW = 0;
      if (sy) {
        const rantaEt = hae2(etaisyys2, x, y);
        syvW = pehmene(sy.kromaVali[1], sy.kromaVali[0], kroma0)
          * pehmene(sy.lumVali[0], sy.lumVali[1], Lp)
          * pehmene(sy.rantaVali[0] * s, sy.rantaVali[1] * s, rantaEt);
        if (syvW > 0.004 && sy.litistys < 1) {
          const w = (1 - sy.litistys) * syvW;
          r += (meriRef[0] - r) * w;
          gg += (meriRef[1] - gg) * w;
          b += (meriRef[2] - b) * w;
        }
      }

      /* --- 1c. korkeusvarjostuksen pastellointi --- */
      if (pl) {
        const Ln = lum(r, gg, b);
        const maski = pehmene(pl.lumVali[0], pl.lumVali[0] + pl.lumPehmeys, Ln)
          * pehmene(pl.lumVali[1], pl.lumVali[1] - pl.lumPehmeys, Ln)
          * pehmene(pl.kromaVali[0], pl.kromaVali[1], kroma0);
        if (maski > 0.004) {
          const w = pl.kyllaisyys * maski;
          r += (Ln * pl.paperiSavy[0] - r) * w;
          gg += (Ln * pl.paperiSavy[1] - gg) * w;
          b += (Ln * pl.paperiSavy[2] - b) * w;
          /* Nosto painottuu tummiin: vuoristo vaalenee, alanko ei. */
          const tummuus = pehmene(pl.vaalennusVali[1], pl.vaalennusVali[0], Ln);
          const v = pl.vaalennus * maski * tummuus;
          if (v > 0) {
            r += (pl.vaalennusKohde[0] - r) * v;
            gg += (pl.vaalennusKohde[1] - gg) * v;
            b += (pl.vaalennusKohde[2] - b) * v;
          }
        }
      }

      /* --- 2. painolaattojen kohdistusheitto (vain matala väritieto) --- */
      if (ko) {
        const oR = hae4(r4, x, y); const oG = hae4(g4, x, y); const oB = hae4(b4, x, y);
        const sR = hae4(r4, x + ko.dx * s, y + ko.dy * s);
        const sG = hae4(g4, x + ko.dx * s, y + ko.dy * s);
        const sB = hae4(b4, x + ko.dx * s, y + ko.dy * s);
        const oL = lum(oR, oG, oB); const sL = lum(sR, sG, sB);
        r += ((sR - sL) - (oR - oL)) * ko.voima;
        gg += ((sG - sL) - (oG - oL)) * ko.voima;
        b += ((sB - sL) - (oB - oL)) * ko.voima;
      }

      let kerroin = 1; /* kertova tummennus, kootaan efekteistä */
      let lampo = 0; /* positiivinen = sininen tummuu punaista enemmän */

      /* --- 3. akvarellin reunakertymä --- */
      if (rk) {
        const e = Math.min(1, hae4(reuna4, x, y) / rk.taysiEro);
        if (e > 0.02) {
          const puoli = Math.max(-1, Math.min(1, haeTummaPuoli(x, y, Lp)));
          /* puoli > 0 = pikseli on ympäristöään tummempi = kertymäpuoli */
          const paino = 1 + rk.tummaPaino * puoli;
          kerroin -= rk.voima * e * 0.25 * Math.max(0, paino);
          lampo += rk.voima * e * 0.1;
        }
      }

      /* --- 3b. maanrajojen tummennus --- */
      /*
       * Naapurien ääriviivat ovat pohjakuvan tummin muste (ks.
       * MAANRAJA); pelkkä luminanssiportti erottaa ne nimistä ja
       * rantaviivasta. Tummennus on kertova ja koskee vain viivan
       * ydintä, joten viiva ei myöskään levene.
       */
      if (mr) {
        const ydin = pehmene(mr.lumVali[1], mr.lumVali[0], Lp);
        if (ydin > 0.01) kerroin -= mr.voima * ydin;
      }

      /* --- 4. rannikon vesiviivoitus --- */
      /*
       * Viivan paikka luetaan rantaetäisyydestä: viivat ovat
       * samankeskisiä rantaviivan kanssa, koska etäisyyskenttä on.
       * Viivaväli kasvaa lineaarisesti ulospäin, joten viivanumero
       * saadaan etäisyydestä toisen asteen yhtälöllä (ks.
       * VESIVIIVOITUS).
       */
      if (vv) {
        const meriW = pehmene(vv.kromaVali[1], vv.kromaVali[0], kroma0)
          * pehmene(vv.lumVali[0], vv.lumVali[1], Lp);
        if (meriW > 0.01) {
          /* Käsivaraheilunta kolmella oktaavilla: pisin aalto siirtää
           * koko viivastoa yhtenä (kaivertajan käsi), lyhimmät mutkittavat
           * yksittäistä viivaa. Heilunta osuu NÄYTEPISTEESEEN, joten
           * viivat huojuvat rikkomatta samankeskisyyttään: viereiset
           * pikselit saavat lähes saman siirtymän, eivätkä viivat siksi
           * mene ristiin vaikka siirtymä on viivaväliä suurempi. */
          const hx = x / (vv.huojuntaSkaala * s); const hy = y / (vv.huojuntaSkaala * s);
          const wx = (fbm(kohinaVesiviiva, hx, hy, vv.huojuntaOktaavit) - 0.5)
            * vv.huojunta * s;
          const wy = (fbm(kohinaVesiviiva, hx + 137.3, hy + 71.9, vv.huojuntaOktaavit) - 0.5)
            * vv.huojunta * s;
          const et = hae2(etaisyys2, x + wx, y + wy);
          const e = et - vv.aloitus * s;
          const v0 = vv.vali * s; const kasvu = vv.kasvu * s;
          const juuri = (v0 - kasvu / 2) ** 2 + 2 * kasvu * e;
          if (e > -v0 && juuri > 0 && et < 1e7) {
            /* nro = viivanumero murtolukuna; kokonaisluku osuu viivalle */
            const nro = (Math.sqrt(juuri) - (v0 - kasvu / 2)) / kasvu;
            const k = Math.round(nro);
            if (k >= 0 && k < vv.viivoja) {
              /* Paikallinen viivaväli kasvaa ulospäin, joten murto-osa
               * muunnetaan pikseleiksi sillä välillä, jolla ollaan —
               * viivan PAKSUUS pysyy samana, vain tiheys harvenee. */
              const vali = v0 + k * kasvu;
              const poikkeama = Math.abs(nro - k) * vali;
              const viiva = pehmene(vv.paksuus * s, vv.paksuus * s * 0.3, poikkeama);
              if (viiva > 0.01) {
                /* Uloin viiva häipyy: vyö loppuu avomerelle. Vyön pituus
                 * suhteutetaan lähimaan kokoon (ks. tiheyskenttä), jotta
                 * pikkuluoto saa parin renkaan halon eikä mantereen vyötä. */
                /* Lähin rantapiste: etäisyyskentän gradientti osoittaa
                 * merelle päin, joten askel gradienttia vastaan etäisyyden
                 * verran osuu rantaan. */
                let tih = 1;
                if (tiheys2) {
                  const gx = hae2(etaisyys2, x + 2, y) - hae2(etaisyys2, x - 2, y);
                  const gy = hae2(etaisyys2, x, y + 2) - hae2(etaisyys2, x, y - 2);
                  const gl = Math.hypot(gx, gy);
                  tih = gl > 0.05
                    ? hae2(tiheys2, x - (gx / gl) * et, y - (gy / gl) * et)
                    : hae2(tiheys2, x, y);
                }
                const maara = vv.viivoja * (vv.lyhinOsuus
                  + (1 - vv.lyhinOsuus) * pehmene(vv.tiheysVali[0], vv.tiheysVali[1], tih));
                const haip = Math.max(0, 1 - k / maara) ** vv.haipyma;
                /* Voiman vaihtelu pitkin viivaa: muste ei kanna tasaisesti. */
                const roso = Math.max(0, 1 + vv.roso * 2
                  * (kohinaVesiviiva(x / (vv.rosoSkaala * s) + 900.5,
                    y / (vv.rosoSkaala * s) + 401.5) - 0.5));
                kerroin -= vv.voima * viiva * haip * roso * meriW;
              }
            }
          }
        }
      }

      /* --- 5. musteen leviäminen nimissä --- */
      if (le && musteSumea) {
        const sumea = musteSumea[y * L + x] / 255;
        const oma = pehmene(158, 70, Lp);
        const kehä = Math.max(0, sumea - oma);
        kerroin -= le.voima * kehä;
      }

      /* --- 6. viivojen mikrorosoisuus --- */
      if (ro) {
        const w = pehmene(158, 70, Lp);
        const reunapaino = 4 * w * (1 - w); /* huippu viivan reunalla */
        if (reunapaino > 0.02) {
          const n = kohinaRoso(x / (s * 1.6), y / (s * 1.6)) - 0.5;
          kerroin += ro.voima * reunapaino * n * 0.6;
        }
      }

      /* --- 7. paperin syy --- */
      if (pa) {
        /* Domain warp: sama siirtymä molemmille kuitusuunnille, jotta
         * syy aaltoilee yhtenä paperina eikä kahtena kerroksena. */
        const wp = (kohinaWarp(x / (pa.warpSkaala * s), y / (pa.warpSkaala * s)) - 0.5)
          * pa.warpVoima;
        let kuitu = 0; let pk = 0;
        for (const [sx, sy, w, fx, fy] of pa.kuituKerrokset) {
          kuitu += w * (kohinaKuitu(fx + x / (sx * s) + wp * 0.35,
            fy + y / (sy * s) + wp) - 0.5);
          pk += w;
        }
        let risti = 0; let pr = 0;
        for (const [sx, sy, w, fx, fy] of pa.kuituRistiKerrokset) {
          risti += w * (kohinaRisti(fx + x / (sx * s) + wp,
            fy + y / (sy * s) + wp * 0.35) - 0.5);
          pr += w;
        }
        const raeN = rae(x, y, 1337) - 0.5;
        const karkea = kohinaRae(x / (pa.raeKarkeaSkaala * s),
          y / (pa.raeKarkeaSkaala * s)) - 0.5;
        /*
         * KUITUKIMPUT. Kuitu on rakenteeltaan pitkä ja matala (34 x 2,3),
         * joten ilman katkoja se piirtää laakealle merelle yhtenäisiä
         * vaakajuovia koko lehden mitalta — silmä lukee ne
         * bandingina, ei paperina. Isotrooppinen kerroin katkoo kuidun
         * muutaman kymmenen pikselin kimpuiksi: paikallinen rakenne
         * säilyy, mutta yksikään juova ei enää jatku lehden yli.
         * Kerroin on nollakeskisen signaalin päällä ja keskiarvoltaan
         * 1, joten se ei muuta paperin keskisävyä.
         */
        const kl = pa.klimppi
          ? Math.max(0, 1 + pa.klimppi * 2 * (kohinaKlimppi(x / (pa.klimppiSkaala * s),
            y / (pa.klimppiSkaala * s)) - 0.5))
          : 1;
        kerroin += ((kuitu / pk) * pa.kuitu + (risti / pr) * pa.kuituRisti) * kl
          + raeN * pa.rae + karkea * pa.raeKarkea;
      }

      /* --- 8. epätasainen ikääntymissävy --- */
      if (ika) {
        const n = fbm(kohinaIka, x / (ika.skaala * 640 * s), y / (ika.skaala * 640 * s), ika.oktaavit) - 0.5;
        const reunaEt = Math.hypot(x - kesX, y - kesY) / kulmaEt;
        const laikku = n + ika.reunapaino * (reunaEt ** 2 - 0.35);
        kerroin -= ika.voima * laikku;
        lampo += ika.voima * ika.lampo * Math.max(0, laikku);
      }

      /* --- 9. taitejäljet --- */
      if (ta) {
        let taite = 0;
        const heilu = (kohinaTaite(x / (40 * s), y / (40 * s)) - 0.5) * ta.huojunta * s;
        for (const p of ta.pysty) {
          const et = Math.abs(x - p * L + heilu);
          taite += Math.exp(-((et / (ta.ydin * s)) ** 2))
            - ta.hehkuOsuus * Math.exp(-((et / (ta.hehku * s)) ** 2));
        }
        for (const p of ta.vaaka) {
          const et = Math.abs(y - p * K + heilu);
          taite += Math.exp(-((et / (ta.ydin * s)) ** 2))
            - ta.hehkuOsuus * Math.exp(-((et / (ta.hehku * s)) ** 2));
        }
        kerroin -= ta.voima * taite;
      }

      /* --- 10. vinjetointi --- */
      if (vi) {
        const rr = Math.hypot((x - kesX) / kesX, (y - kesY) / kesY) / Math.SQRT2;
        const v = rr ** vi.eksponentti;
        kerroin -= vi.voima * v;
        lampo += vi.voima * vi.lampo * v;
      }

      r *= kerroin; gg *= kerroin * (1 - lampo * 0.35); b *= kerroin * (1 - lampo);

      if (muoto === 'jpeg' && alfa < 255) {
        const t = alfa / 255;
        r = tausta[0] + (r - tausta[0]) * t;
        gg = tausta[1] + (gg - tausta[1]) * t;
        b = tausta[2] + (b - tausta[2]) * t;
        d[i + 3] = 255;
      }
      /*
       * DITHER ENNEN 8-BITTIIN PYÖRISTYSTÄ. Koko putki laskee
       * liukuluvuilla, mutta Uint8ClampedArray pyöristää lopuksi
       * lähimpään kokonaislukuun. Ilman ditheriä pehmeä gradientti
       * (vinjetti, ikääntymislaikku, reunakertymä, pohjan omat
       * syvyysvyöhykkeet) kvantisoituu porrasaskelmiksi, jotka näkyvät
       * laakealla merellä. Kolmiojakautunut ±1 askelman kohina kahdesta
       * riippumattomasta hajautuksesta hajottaa askelman rajan: virhe
       * irtoaa signaalista ja muuttuu tasaiseksi kohinaksi.
       *
       * Sama dither kaikille kanaville, jottei syntyisi väriräiskettä;
       * kvantisointivirheen irrottamiseen se riittää.
       */
      const dth = rae(x, y, 0x5eed1) + rae(x, y, 0x5eed2) - 1;
      r += dth; gg += dth; b += dth;
      d[i] = r < 0 ? 0 : (r > 255 ? 255 : r);
      d[i + 1] = gg < 0 ? 0 : (gg > 255 ? 255 : gg);
      d[i + 2] = b < 0 ? 0 : (b > 255 ? 255 : b);
    }
  }
  g.putImageData(kuvadata, 0, 0);
  const mime = muoto === 'jpeg' ? 'image/jpeg' : (muoto === 'webp' ? 'image/webp' : 'image/png');
  return { b64: kanvaasi.toDataURL(mime, laatu).split(',')[1], leveys: L, korkeus: K };
}

/* ============================================================ vertailu */

/** Kokoaa 2 x 2 -ruudukon samasta palasta neljästä kuvasta. */
async function vertailuSelaimessa({ kuvat, pala, laatu }) {
  const ladatut = [];
  for (const k of kuvat) {
    const kuva = new Image();
    kuva.src = `data:image/${k.tyyppi};base64,${k.b64}`;
    await kuva.decode();
    ladatut.push({ kuva, nimi: k.nimi });
  }
  const c = document.createElement('canvas');
  c.width = pala.w * 2; c.height = pala.h * 2;
  const g = c.getContext('2d');
  g.fillStyle = '#2c2018';
  g.fillRect(0, 0, c.width, c.height);
  ladatut.forEach((k, n) => {
    const px = (n % 2) * pala.w; const py = Math.floor(n / 2) * pala.h;
    /* Sama alue kaikista, vaikka kuvien leveys eroaisi. */
    const suhde = k.kuva.width / pala.lehdenLeveys;
    g.drawImage(k.kuva, pala.x * suhde, pala.y * suhde, pala.w * suhde, pala.h * suhde,
      px, py, pala.w, pala.h);
    g.font = 'bold 40px sans-serif';
    g.textBaseline = 'top';
    const teksti = k.nimi;
    const lev = g.measureText(teksti).width;
    g.fillStyle = 'rgba(30,22,16,0.78)';
    g.fillRect(px + 18, py + 18, lev + 36, 60);
    g.fillStyle = '#f3e8ce';
    g.fillText(teksti, px + 36, py + 30);
    g.strokeStyle = 'rgba(60,44,30,0.9)';
    g.lineWidth = 4;
    g.strokeRect(px + 2, py + 2, pala.w - 4, pala.h - 4);
  });
  return c.toDataURL('image/jpeg', laatu).split(',')[1];
}

/* ================================================================ ajo */

const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const lippu = (nimi) => argv.includes(`--${nimi}`);
/* Arvolliset valitsimet erotetaan lipuista, jotta valitsimen arvoa ei
 * lueta vahingossa tiedostopoluksi. */
const ARVOLLISET = ['taso', 'tunnus', 'leveys', 'laatu', 'muoto', 'pala'];
const vapaat = argv.filter((a, n) => !a.startsWith('--')
  && !(n > 0 && argv[n - 1].startsWith('--') && ARVOLLISET.includes(argv[n - 1].slice(2))));

const pohja = vapaat[0];
const ulosKansio = vapaat[1];
if (!pohja || !ulosKansio) {
  console.error('Käyttö: node tools/patina.mjs <pohjakuva> <ulos-kansio> '
    + '[--taso hillitty|keskitaso|taysi|kaikki] [--tunnus GRC] [--leveys 6400] '
    + '[--laatu 0.9] [--muoto jpeg|webp|png] [--vertailu] [--pala x,y,w,h]');
  process.exit(1);
}
const tasoValinta = valitsin('taso', 'kaikki');
const tasot = tasoValinta === 'kaikki' ? ['hillitty', 'keskitaso', 'taysi'] : [tasoValinta];
for (const t of tasot) {
  if (!RESEPTIT[t]) { console.error(`Tuntematon taso: ${t}`); process.exit(1); }
}
const tunnus = valitsin('tunnus', basename(pohja).replace(/\.[^.]+$/, '').replace(/-pohja$/, ''));
const leveys = Number(valitsin('leveys', 0)) || 0;
const laatu = Number(valitsin('laatu', 0.92));
const muoto = valitsin('muoto', 'jpeg');
const pala = (() => {
  const p = valitsin('pala', null);
  if (!p) return VERTAILUPALA;
  const [x, y, w, h] = p.split(',').map(Number);
  return { ...VERTAILUPALA, x, y, w, h };
})();
/* JPEG ei kanna läpinäkyvyyttä: lehden häivytetty vuotoreuna
 * ladotaan paperin väriin, ei mustaan (kuten canvas tekisi). */
const TAUSTA = [232, 220, 188];

mkdirSync(resolve(ulosKansio), { recursive: true });

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: ['--max-old-space-size=4096'],
});
const sivu = await selain.newPage();
sivu.on('pageerror', (e) => console.error('[selain]', e.message));

const tyyppiNimesta = (polku) => {
  const p = extname(polku).toLowerCase();
  if (p === '.webp') return 'webp';
  if (p === '.jpg' || p === '.jpeg') return 'jpeg';
  return 'png';
};

const pohjaB64 = readFileSync(resolve(pohja)).toString('base64');
const pohjaTyyppi = tyyppiNimesta(pohja);
const paate = muoto === 'jpeg' ? 'jpg' : muoto;
const tehdyt = [];

for (const taso of tasot) {
  const alku = Date.now();
  const tulos = await sivu.evaluate(patinoiSelaimessa, {
    b64: pohjaB64,
    tyyppi: pohjaTyyppi,
    resepti: RESEPTIT[taso],
    leveys,
    muoto,
    laatu,
    tausta: TAUSTA,
  });
  const nimi = `${tunnus}-patina-${taso}.${paate}`;
  const polku = resolve(ulosKansio, nimi);
  writeFileSync(polku, Buffer.from(tulos.b64, 'base64'));
  tehdyt.push({ taso, polku, nimi });
  const kt = Math.round(Buffer.from(tulos.b64, 'base64').length / 1024);
  console.log(`${nimi}: ${tulos.leveys} x ${tulos.korkeus}, ${kt} kt, `
    + `${((Date.now() - alku) / 1000).toFixed(1)} s`);
}

if (lippu('vertailu')) {
  const kuvat = [
    { nimi: 'nykyinen (pohja)', b64: pohjaB64, tyyppi: pohjaTyyppi },
    ...tehdyt.map((t) => ({
      nimi: t.taso, b64: readFileSync(t.polku).toString('base64'), tyyppi: muoto,
    })),
  ];
  const b64 = await sivu.evaluate(vertailuSelaimessa, { kuvat, pala, laatu });
  const polku = resolve(ulosKansio, 'patina-vertailu.jpg');
  writeFileSync(polku, Buffer.from(b64, 'base64'));
  console.log(`patina-vertailu.jpg: ${pala.w * 2} x ${pala.h * 2} `
    + `(pala ${pala.x},${pala.y} ${pala.w}x${pala.h})`);
}

await selain.close();
