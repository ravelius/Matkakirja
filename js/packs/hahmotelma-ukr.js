/*
 * UKRAINAN HAHMOTELMANOSTOT — Ukrainalla oli ennestään 13 karttamerkkiä
 * js/packs/maastokohteet-ukr.js:ssä (viisi maastokohdetta — Hoverla,
 * Mustameri, Asovanmeri, Dnepr, Dnestr — sekä kahdeksan K2-erän kohdetta:
 * Kamjanets-Podilskyin linna, Tšernobylin ydinvoimala, Hersonesos, Lviv,
 * Hortytsja, Poltavan taistelu, Sofijivkan puisto, Derzhprom). Tässä
 * tiedostossa on 17 uutta, käsin kirjoitettua nostoa samalla mallilla
 * kuin muiden Euroopan maiden hahmotelmapakit (esim.
 * js/packs/hahmotelma-svn.js, js/packs/hahmotelma-rou.js): jokaisella
 * nostolla on valmis sisältö — `teksti` 3–5 virkettä en-Wikipedian
 * artikkelista omin sanoin suomeksi (ei käännöskopiota, ei keksittyjä
 * faktoja, `lahde`-riville artikkeli, osiot ja tarkistuspäivä), 1873-
 * näkökulman `nappi`-alaotsikko, kaksi pulun kysymystä, `korostukset`
 * ja kaksi Commons-kuvaa (`kuva` + `kuvat`; vain public domain / CC0 /
 * CC BY / CC BY-SA, tekijä, lisenssi ja lähdesivu kirjattuna, jokaisen
 * kuvan tiedot luettu Commonsin extmetadata-rajapinnasta). Kuudella
 * nostolla on lisäksi `visa`-kenttä (kysymys, neljä vaihtoehtoa, oikea
 * indeksi, fakta) täsmälleen kuten kaupunkien täkynostoilla
 * (js/fokusnosto.js nostonVisa): vastaus löytyy noston omasta tekstistä.
 *
 * EI VIELÄ LIITETTY KOHDE_MAAT.UKR:HEN (21.9.2026) — omistaja tekee
 * kytkennän itse js/fokuskohteet.js:ään, samaan tapaan kuin muillakin
 * muu-Eurooppa-hahmotelmilla. `node --test tests/*.test.mjs` ja
 * `node tools/tarkista-kaksoisavaimet.mjs` on ajettu tätä tiedostoa
 * kirjoitettaessa; molemmat menivät läpi.
 *
 * MIKSI JUURI NÄMÄ 17 KOHDETTA. Vanha 13 kattoi korkeimman vuoren,
 * kaksi merta, kaksi jokea, kaksi linnaa, Tšernobylin, antiikin
 * Hersonesoksen, Lvivin, Zaporižžjan kasakkahistorian, yhden
 * taistelun, yhden puiston ja yhden konstruktivistisen rakennuksen —
 * mutta PÄÄKAUPUNKI KIOVA PUUTTUI KOKONAAN, samoin Odesa, koko Krimin
 * niemimaa (paitsi antiikin Hersonesos), Karpaattien hutsulikulttuuri,
 * ruokakulttuuri (ei yhtään 'ruoka'-tyypin nostoa) ja rautatie/
 * teollisuushistoria laajemmin kuin Tšernobyl ja Derzhprom. Uudet 17
 * täyttävät nämä aukot: Kiova (pääkaupunki + Petšerskin luostari
 * samassa nostossa — sijainnit ovat vain 1–2 lautayksikön päässä
 * toisistaan, joten kahta erillistä pistettä ei olisi voinut ladoa
 * ilman nimiö-nimiö-limitystä; ks. KARTAN AHTAUS alla), Odesa (satama +
 * Potjomkinin portaat), Bakhchysarai (Krimin khaanikunnan palatsi,
 * neutraali historiallis-kulttuurinen kulma), Kolomyia (Pysanka-museo +
 * hutsulikulttuuri samassa nostossa), Kherson ja Myrhorod (ruoka:
 * vesimelonit ja kivennäisvesi/kylpyläkaupunki), Kryvyi Rih ja
 * Kremenchuk (tekniikka: rautamalminlouhinta ja KrAZ-kuorma-
 * autotehdas), Kovel (tekniikka: rautatiesolmu ja Kovelin
 * keihäänkärjen riimulöytö), Uzhhorod, Tšernihiv, Počajiv, Medzhybizh
 * ja Volodymyr (historia/kulttuuri: Länsi-Ukrainan ja Volynian
 * moniulotteinen 1800-luvun tausta, ks. alla), Etelä-Bug (kolmas suuri
 * joki maastotasapainoksi), Askanija-Nova (aro/luonnonsuojelu) ja
 * Synevyr (Karpaattien suurin järvi, `jarvi`-tyyppi, kansantaru).
 *
 * REHELLISYYS VUODEN 1873 SUHTEEN. Suurin osa Ukrainaa on 1873 osa
 * Venäjän keisarikuntaa (kuvernementteja), mutta Galitsia (Lviv) on
 * Itävalta-Unkarin puolella — tämä oli jo entuudestaan Lvivin noston
 * lähtökohta. Uudet nostot syventävät tätä: Uzhhorod on 1873 vielä
 * unkarilaisittain Ungvár, osa Unkarin kuningaskuntaa (nimi Uzhhorod
 * otettiin viralliseen käyttöön vasta 1920-luvulla); Volodymyrin
 * keskiaikainen latinannimi Lodomeria antoi nimensä Itävalta-Unkarin
 * "Galitsian ja Lodomerian kuningaskunnalle", mutta kaupunki itse EI
 * koskaan kuulunut tähän kuningaskuntaan, vaan pysyi Venäjän puolella —
 * pieni ironia, joka avautuu vain kartalta; Askanija-Nova ei ole 1873
 * vielä mitään: sen perustaja Friedrich Falz-Fein on vasta
 * kymmenvuotias poika, ja koko luonnonsuojelualue syntyy vasta 1898;
 * Bakhchysarain khaanien palatsi taas on 1873 jo 90 vuotta ollut
 * museona Venäjän Taurian kuvernementissa, sillä Krimin khaanikunta
 * kukistui Katariina II:n valloitukseen 1783.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `ukr-nosto-<id>-<8 hex sha256>.jpg`, ja osoite
 * on kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260921/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ja niiden JSON-metadata (kansiossa `_json/`)
 * ovat kansiossa /Users/samireivinen/Matkakirja-nostot-kuvat/ukr/.
 *
 * === KOORDINAATIT JA LAUTA ===========================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 21.9.2026) ja artikkelin
 * nimi on kirjattu rivin viereen. Laudan luvut on laskettu pelin
 * omalla kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin
 * lieriöprojektio). VAIN `maailmankartta`-lautaa käytetään — Euroopan
 * erillislauta poistettiin kokonaan (Raamattu 30.8.2026,
 * "erillislaudasta luovutaan"; js/pack.js), eikä muillakaan tämän
 * tiedoston vanhemmilla UKR-nostoilla (lviv, hortytsja, poltavan-
 * taistelu, sofijivkan-puisto, derzhprom, 20.9.2026) ole `europe`-
 * riviä. Jokainen rivi osuu Ukrainan fokuslehden rajaukseen
 * (`tools/johda-maastokohteet.mjs osuuLehteen`, tarkistettu).
 *
 * === KARTAN AHTAUS ====================================================
 *
 * `node tools/tarkista-nimiolimitys.mjs UKR` ajettu — ei limityksiä
 * tämän tiedoston nostojen välillä eikä olemassa olevien 13 kanssa.
 * Yksi lähekkäisyys vältettiin jo suunnitteluvaiheessa: Kiovan
 * pääkaupunkinosto ja Kiova-Petšerskin luostari olisivat olleet vain
 * 1–2 lautayksikön päässä toisistaan (mitattu tools/johda-
 * maastokohteet.mjs:llä; Sveitsin AUT/DEU-tapaus 21.9.2026 osoitti,
 * että jo 4,9–8,6 yksikön etäisyys voi aiheuttaa nimiö-nimiö-
 * limityksen), joten ne on yhdistetty yhdeksi Kiova-nostoksi
 * (`kysymykset` ja `teksti` kattavat molemmat aiheet). Samasta syystä
 * erillistä Bilhorod-Dnistrovskyin linnoitusnostoa ei tehty: sen
 * sijainti oli vain 7,98 lautayksikön päässä olemassa olevasta Dnestr-
 * maastokohteesta (joen suu). Khotynin linnoitus jätettiin niin ikään
 * pois — 6,86 yksikön päässä Kamjanets-Podilskyin linnasta — ja
 * korvattiin kauempana sijaitsevalla Medzhybižin linnoituksella.
 * Karpaattien Hutsuli-kulttuurinosto sijoitettiin Kolomyiaan eikä
 * lähempänä Hoverlaa olevaan Verhovynaan (Hoverla–Kolomyia 23,95
 * yksikköä, Hoverla–Verhovyna vain 10,51). Tavoite 17/17 saavutettiin
 * siis ilman pudotuksia — kaikki yllä mainitut olivat suunnitteluvaiheen
 * vaihtoehtoja, ei tähän tiedostoon päätyneitä rivejä.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-/Euroopan-maiden hahmotelmilla
 * (js/fokuskohteet.js liittää rivit KOHDE_MAAT.UKR:ään, kun kytkentä
 * tehdään). `lahi: true` on sama lähizoomiportti kuin muilla
 * hahmotelmapakeilla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 */

/** Ukrainan hahmotelmanostot: sisällölliset kohteet. */
import { EUROOPAN_KADONNEET } from './monumentit-eurooppa.js';

export const HAHMOTELMA_UKR = [
  ...EUROOPAN_KADONNEET.UKR,
  {
    id: 'hahmotelma-kiova',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-kiova-a24566e3.jpg',
      lyhyt: 'Kiova-Petšerskin luostarin kultahuippuiset tornit ja Dnepr ilmakuvassa.',
      selite: 'Luostarialueen valkoiset rakennukset ja kultaiset kupolit kohoavat puiden keskeltä, taustalla Dnepr-joki ja Kiovan kaupunki levittäytyvät horisonttiin.',
      lahde: 'Valokuva: Maksym Kozlenko, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Maksym Kozlenko',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2019-07-18_Kyiv_Pechersk_Lavra.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-kiova-bd061dfb.jpg',
        lyhyt: 'Pyhän Sofian katedraalin vihreät ja kultaiset kupolit syksyisten puiden keskellä.',
        selite: 'Valkoinen kirkkorakennus kohoaa keltalehtisten puiden takaa, sen vihreät sipulikupolit on kruunattu kultaisilla huipuilla.',
        lahde: 'Valokuva: Rbrechko, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Rbrechko',
        lahdeUrl: "https://commons.wikimedia.org/wiki/File:80-391-0151_Kyiv_St.Sophia's_Cathedral_RB_18.jpg",
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kiova',
    tyyppi: 'kaupunki',
    lahi: true,
    kysymykset: [
      'Mistä munkki Anthonios palasi perustaakseen Petšerskin luostarin?',
      'Miksi Kiovaa kutsutaan Kiovan Rusin sydämeksi?',
    ],
    korostukset: ['varjagit|varjagien', 'Anthonios|Anthonios'],
    nappi: 'Venäjän keisarikunnan kuvernementin pääkaupunki',
    // 30.52333333 E / 50.45 N — en-Wikipedia "Kyiv"
    laudat: {
      maailmankartta: { x: 6850.8, y: 1370.5 },
    },
    teksti: 'Kiova on Ukrainan pääkaupunki ja suurin kaupunki, joka levittäytyy Dnepr-joen '
      + 'molemmille rannoille. Se oli jo 800-luvulla vilkas kauppapaikka Skandinavian ja '
      + 'Konstantinopolin välisellä reitillä, ja varjagien vallattua kaupungin siitä tuli '
      + 'Kiovan Rusin pääkaupunki – Itä-Euroopan ensimmäisen valtion sydän. Kaupungin '
      + 'rinteellä kohoava Petšerskin luostari perustettiin 1000-luvun puolivälissä, kun '
      + 'munkki Anthonios palasi Athos-vuorelta ja asettui luolaan Dneprin yläpuolelle; '
      + 'luostarista kasvoi itäisen kristikunnan tärkein oppineisuuden keskus ja Ukrainan '
      + 'varhaisimman kirjapainon koti. Vuosisatoja myöhemmin, Venäjän keisarikunnan '
      + 'teollistuessa 1800-luvun lopulla, Kiovasta tuli jälleen kukoistava kaupan ja '
      + 'teollisuuden keskus.',
    lahde: 'en-Wikipedia "Kyiv", johdanto-osa; "Kyiv Pechersk Lavra", osio "Foundation and '
      + 'early history" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuosisadalla Petšerskin luostari perustettiin Kiovassa?',
      vaihtoehdot: [
        '800-luvulla',
        '1000-luvulla',
        '1300-luvulla',
        '1500-luvulla',
      ],
      oikea: 1,
      fakta: 'Perimätiedon mukaan luostari perustettiin joko vuonna 1051 tai 1074; molemmat '
        + 'ajoitukset esiintyvät ristiriitaisesti Nestorin kronikassa.',
    },
  },
  {
    id: 'hahmotelma-odesa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-odesa-f15f2e45.jpg',
      lyhyt: 'Potjomkinin portaat nousevat suorana linjana kohti kaupunkia.',
      selite: 'Leveä harmaa kiviportaikko nousee jyrkästi ylöspäin puiden reunustamana, huipulla erottuu pieni patsas.',
      lahde: 'Valokuva: Oleksandr Malyon, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Oleksandr Malyon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Потьомкінські_сходи_11.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-odesa-e70df068.jpg',
        lyhyt: 'Potjomkinin portaita alhaalta kuvattuna, kävelijöitä askelmilla.',
        selite: 'Portaat kapenevat optisesti ylöspäin mentäessä, ja niitä nousevat ja laskevat kävelijät antavat mittakaavan.',
        lahde: 'Valokuva: DIMSFIKAS, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'DIMSFIKAS',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Potemkin_stairs,_Odessa.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Odesa',
    tyyppi: 'kaupunki',
    lahi: true,
    kysymykset: [
      'Minkä keisarinnan käskystä Odesan satama perustettiin?',
      'Mikä optinen harha portaikossa syntyy?',
    ],
    korostukset: ['Hacibey|Hacibey', 'Katariina II|Katariina II:n'],
    nappi: '1800-luvulla Venäjän keisarikunnan neljänneksi suurin kaupunki',
    // 30.74333333 E / 46.48916667 N — en-Wikipedia "Potemkin Stairs"
    laudat: {
      maailmankartta: { x: 6858.1, y: 1539.9 },
    },
    teksti: 'Odesa on Ukrainan kolmanneksi suurin kaupunki ja tärkeä satama Mustanmeren '
      + 'luoteisrannalla. Paikalla on ollut asutusta antiikin ajoista lähtien, ja '
      + 'keskiajalla siellä toimi liettualaisten hallitsema satama Kotsiubijiv, joka siirtyi '
      + 'osmanien haltuun 1500-luvulla nimellä Hacibey. Venäjä valtasi alueen 1792, ja '
      + 'keisarinna Katariina II:n käskykirje perusti 1794 sataman ja kauppapaikan, joka sai '
      + 'pian nimekseen Odessa. 1800-luvulla kaupungista kasvoi Venäjän keisarikunnan '
      + 'neljänneksi suurin – Moskovan, Pietarin ja Varsovan jälkeen – ja sen arkkitehtuuri '
      + 'muistuttaa enemmän Ranskan ja Italian kaupunkeja kuin Venäjää. Kaupungin tunnetuin '
      + 'maamerkki on merelle avautuva jättiläisportaikko, jonka leveys kapenee ylöspäin '
      + 'mentäessä niin, että se näyttää todellista pidemmältä.',
    lahde: 'en-Wikipedia "Odesa", johdanto-osa; "Potemkin Stairs", johdanto-osa (tarkistettu '
      + '21.9.2026).',
    visa: {
      kysymys: 'Kuinka mones suurin kaupunki Odesa oli Venäjän keisarikunnassa 1800-luvulla?',
      vaihtoehdot: [
        'Toiseksi suurin',
        'Kolmanneksi suurin',
        'Neljänneksi suurin',
        'Viidenneksi suurin',
      ],
      oikea: 2,
      fakta: 'Odesa kasvoi kokoaan monia vanhempia kaupunkeja suuremmaksi vain muutamassa '
        + 'vuosikymmenessä – se perustettiin 1794 ja oli 1800-luvulla jo Moskovan, Pietarin '
        + 'ja Varsovan jälkeen suurin.',
    },
  },
  {
    id: 'hahmotelma-bakhchysarai',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-bakhchysarai-1f662a45.jpg',
      lyhyt: 'Hansarayn palatsin katolta kohoaa viisi minareettia.',
      selite: 'Matala, tiilikattoinen palatsirakennus kiemurtelee kadun varrella, ja sen ylle kohoaa useita hoikkia minareetteja.',
      lahde: 'Valokuva: A.Savin, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'A.Savin',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bakhchysarai_04-14_img08_Palace_from_the_street.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-bakhchysarai-e743e38c.jpg',
        lyhyt: 'Kyynelten suihkulähde kaiverretussa kivikehyksessä palatsin sisäpihalla.',
        selite: 'Valkoiseen kiveen kaiverrettu koristeellinen suihkulähde on aseteltu seinäsyvennykseen, sen reunoilla on arabiankielistä kalligrafiaa.',
        lahde: 'Valokuva: A.Savin, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'A.Savin',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bakhchysarai_04-14_img11_Palace_Fountain_of_Tears.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Bakhchysarain palatsi',
    tyyppi: 'kulttuuri',
    taso: 1,
    lahi: true,
    kysymykset: [
      'Kenen puolesta suru synnytti Kyynelten suihkulähteen tarinan?',
      'Mihin muihin palatseihin Bakhchysarain palatsia verrataan?',
    ],
    korostukset: ['Kyynelten suihkulähde|Kyynelten suihkulähde', 'Aleksandr Puškinia|Aleksandr Puškinia'],
    nappi: '1873: jo 90 vuotta museona Venäjän Taurian kuvernementissa',
    // 33.88196111 E / 44.74867222 N — en-Wikipedia "Bakhchysarai Palace"
    laudat: {
      maailmankartta: { x: 6962.7, y: 1612.1 },
    },
    teksti: 'Bakhchysarain khaanien palatsi eli Hansaray on Krimin niemimaan tunnetuin '
      + 'islamilainen rakennus ja oli satojen vuosien ajan Krimin khaanikunnan hallitsijoiden '
      + 'koti. Se rakennettiin 1500-luvulla, ja muurattu palatsialue käsittää moskeijan, '
      + 'haaremin, hautausmaan, asuinsiipiä ja puutarhoja. Palatsi kuuluu Euroopan '
      + 'tunnetuimpiin muslimipalatseihin Istanbulin sulttaanipalatsien ja Espanjan '
      + 'Alhambran rinnalla. Sisäpihan kuuluisa Kyynelten suihkulähde on niin koskettava '
      + 'nähtävyys, että se innoitti runoilija Aleksandr Puškinia kirjoittamaan siitä oman '
      + 'runonsa. Vuonna 1873 palatsi on jo museo Venäjän keisarikunnan Taurian '
      + 'kuvernementissa – Krimin khaanikunta itsenäisenä valtiona kukistui Katariina II:n '
      + 'valloitukseen jo 1783.',
    lahde: 'en-Wikipedia "Bakhchysarai Palace", johdanto-osa ja osio "Bakhchysarai Fountain" '
      + '(tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-kolomyia',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-kolomyia-fab47be8.jpg',
      lyhyt: 'Pysanka-museon pyöreä sisätila täynnä näyttelyvitriinejä.',
      selite: 'Punaseinäisessä pyöreässä salissa on riveittäin pieniä vitriinejä ja jalustoja, seinän yläosassa kuvitettuja tauluja pysankan tekotavasta.',
      lahde: 'Valokuva: VargaA, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'VargaA',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pysanka_Kolomyia_06.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-kolomyia-b9d3b8e0.jpg',
        lyhyt: 'Lasivitriinillinen värikkäitä koristeltuja pääsiäismunia riveittäin.',
        selite: 'Puukehyksisessä lasikaapissa on viisi riviä munia, joihin on maalattu geometrisia kuvioita punaisella, keltaisella, sinisellä ja vihreällä.',
        lahde: 'Valokuva: Tohaomg, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Tohaomg',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Shelf_with_pysankas_in_Pysanka_Museum_in_Kolomyia_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Pysanka-museo, Kolomyia',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Missä pysanka-museon kokoelma oli ennen vuotta 2000?',
      'Ketkä ovat hutsulit?',
    ],
    korostukset: ['hutsulit|hutsulit', 'pysanka|pysankaksi'],
    nappi: 'Karpaattien hutsulikylät odottavat vielä omaa museotaan',
    // 25.04027778 E / 48.53055556 N — en-Wikipedia "Pysanka Museum"
    laudat: {
      maailmankartta: { x: 6668, y: 1453.6 },
    },
    teksti: 'Kolomyia on Hutsulien alueen pääkaupunkina tunnettu kaupunki Länsi-Ukrainan '
      + 'Karpaateilla, ja hutsulit ovat itäslaavilainen kansanryhmä, joka asuu sekä Ukrainan '
      + 'että Romanian puolella vuoristoa. Kaupungissa toimii maailman ainoa yksinomaan '
      + 'pysankalle – perinteiselle koristellulle pääsiäismunalle – omistettu museo, joka '
      + 'avattiin ensin vuonna 1987 Kolomyian ilmestyskirkossa. Uusi rakennus valmistui '
      + 'vuonna 2000 kymmenennen kansainvälisen Hutsuli-festivaalin aikaan, ja museonjohtaja '
      + 'Jaroslava Tkatšukin ideasta se on muotoiltu itse valtavaksi pysankaksi: 14 metriä '
      + 'korkea ja 10 metriä leveä kupu, jonka pintaan on maalattu perinteisiä kuvioita. '
      + 'Museo tunnustettiin nykyajan Ukrainan maamerkiksi vuonna 2007, ja siitä on tullut '
      + 'koko kaupungin tunnuskuva.',
    lahde: 'en-Wikipedia "Pysanka Museum", johdanto-osa; "Hutsuls", johdanto-osa (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-kherson',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-kherson-2500df14.jpg',
      lyhyt: 'Kymmeniä vesimeloneita kivetyksellä pinottuna.',
      selite: 'Erikokoisia tummanvihreitä ja raidallisia vesimeloneita on aseteltu riveihin kivetylle pihalle, kuivuneiden kasvien vieressä.',
      lahde: 'Valokuva: Olaffpomona, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Olaffpomona',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:01092011(001)Kherson_watermelons.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-kherson-77755093.jpg',
        lyhyt: 'Hersonin entisen kaupunginduuman rakennus kellotorneineen ilmakuvassa.',
        selite: 'Punakattoinen historiallinen rakennus kulmatornillaan hallitsee katunäkymää, ympärillä 1800-luvun kaupunkikeskustaa ja liikennettä.',
        lahde: 'Valokuva: Oleksandr Malyon, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Oleksandr Malyon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Будинок_колишньої_Херсонської_міської_думи_(мур.).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kherson',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Minkä joukon linnoituksen paikalle Kherson perustettiin?',
      'Mistä hedelmästä Kherson on nykyään kuuluisa?',
    ],
    korostukset: ['Zaporožjen kasakoiden|Zaporožjen kasakoiden', 'vesimeloneistaan|vesimeloneistaan'],
    nappi: 'Kuvernementin pääkaupunki Mustanmeren rannalla',
    // 32.6169 E / 46.6354 N — Hersonin keskusta (Будинок колишньої Херсонської міської думи)
    laudat: {
      maailmankartta: { x: 6920.6, y: 1533.8 },
    },
    teksti: 'Kherson on satamakaupunki Etelä-Ukrainassa Mustanmeren ja Dneprin äärellä, ja se '
      + 'perustettiin Venäjän keisarikunnan Mustanmeren laivaston tukikohdaksi paikalle, '
      + 'jossa oli aiemmin ollut Zaporožjen kasakoiden linnoitus. 1800- ja 1900-luvun alussa '
      + 'kaupunki toimi oman kuvernementtinsa pääkaupunkina ja kasvoi merkittäväksi kaupan '
      + 'ja liikenteen keskukseksi. Neuvostoaikana Khersonista tuli tunnettu erityisesti '
      + 'laivanrakennusteollisuudestaan. Nykyään kaupunki tunnetaan ympäri Ukrainaa etenkin '
      + 'vesimeloneistaan, joita kasvatetaan alueen aurinkoisilla arostepeillä ja joita '
      + 'myydään pinoittain kesäisin torien laidoilla.',
    lahde: 'en-Wikipedia "Kherson", johdanto-osa (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-myrhorod',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-myrhorod-2d921717.jpg',
      lyhyt: 'Puinen valokuvateline esittää kasakkaa mineraalivesikannun kanssa.',
      selite: 'Puistokujan varrella seisoo kirkkaanvärinen puinen kuvatuslauta, johon on maalattu punapukuinen kasakkahahmo nojaamassa siniseen kannuun; kasvojen kohdalla on aukko valokuvausta varten.',
      lahde: 'Valokuva: Наталка Зубар, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Наталка Зубар',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Photo_stand_in_Myrhorod_spa_resort.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-myrhorod-69aa4a8d.jpg',
        lyhyt: 'Pullo Myrhorodin kivennäisvettä sinisellä etiketillä.',
        selite: 'Läpinäkyvä muovipullo täynnä kivennäisvettä, etiketissä lukee suurin kirjaimin veden nimi ja kaasutustieto.',
        lahde: 'Valokuva: Костянтин Горохов-Торовик, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Костянтин Горохов-Торовик',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Мінеральна_вода_"Миргородська",_2021_р..jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Myrhorod',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mitä Myrhorodin nimi tarkoittaa kirjaimellisesti?',
      'Mistä vuodesta lähtien Myrhorod on ollut virallinen kylpyläkaupunki?',
    ],
    korostukset: ['Rauhan kaupunki|Rauhan kaupunki', 'Bohdan Hmelnytskyin|Bohdan Hmelnytskyin'],
    nappi: 'Kasakkarykmentin kaupunki, kylpyläkaupunki vasta myöhemmin',
    // 33.6 E / 49.96666667 N — en-Wikipedia "Myrhorod"
    laudat: {
      maailmankartta: { x: 6953.3, y: 1391.6 },
    },
    teksti: 'Myrhorod on kaupunki Keski-Ukrainan Poltavan alueella Khorol-joen varrella, ja '
      + 'se perustettiin jo 1100- tai 1200-luvulla Kiovan Rusin itärajan linnoitukseksi. '
      + 'Legendan mukaan nimi – kirjaimellisesti Rauhan kaupunki – juontuu paikalla '
      + 'käydyistä rauhanneuvotteluista. Myrhorodin kasakkarykmentti oli yksi hetmani Bohdan '
      + 'Hmelnytskyin armeijan parhaista yksiköistä 1600-luvun kapinassa Puolaa vastaan. '
      + 'Vuodesta 1912 kaupunki on tunnettu maanalaisista kivennäisvesilähteistään, ja '
      + 'vuodesta 1920 se on ollut virallinen kylpyläkaupunki: lievästi mineralisoitunutta '
      + 'Myrhorodska-vettä suositellaan yhä vatsavaivojen hoitoon.',
    lahde: 'en-Wikipedia "Myrhorod", osiot "History" ja "Tourist attractions" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-kryvyi-rih',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-kryvyi-rih-d2af21c3.jpg',
      lyhyt: 'Katukauppaa Kryvyi Rihin raitiotielinjan varrella.',
      selite: 'Puisia kojuja ja ihmisiä raitiotiekiskojen vieressä, taustalla vanha raitiovaunu ja puiset kauppahuoneet.',
      lahde: 'Valokuva: Alan Turgutoglu, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Alan Turgutoglu',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kryvyi_Rih_2014_-_01.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-kryvyi-rih-0647e4d2.jpg',
        lyhyt: 'Avolouhos Kryvyi Rihin lähellä kaartuvine ratapenkereineen.',
        selite: 'Punaruskeaa ja keltaista rautamalmimaata kerrostuu valtavan avolouhoksen seinämiin, pohjalla näkyy kaivoskoneita ja kaartuva rautatie.',
        lahde: 'Valokuva: Pelex, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Pelex',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Shakhta_severnaya1.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Kryvyi Rih',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Minä vuosikymmenellä ulkomainen pääoma löysi Kryvyi Rihin rautamalmivarat?',
      'Mikä teki Kryvyi Rihistä Euroopan pisimmän kaupungin?',
    ],
    korostukset: ['rautamalmiesiintymän|rautamalmiesiintymän', 'Kryvorizhstal|Kryvorizhstal'],
    nappi: '1873: vielä pieni etuvartio ilman kaivoksia',
    // 33.39 E / 47.91 N — en-Wikipedia "Kryvyi Rih"
    laudat: {
      maailmankartta: { x: 6946.3, y: 1480 },
    },
    teksti: 'Kryvyi Rih on Keski-Ukrainan teollisuuskaupunki Saksahan- ja Inhulets-jokien '
      + 'yhtymäkohdassa, ja sitä pidetään Euroopan pituudeltaan mittavimpana kaupunkina – se '
      + 'venyy kymmeniä kilometrejä rautamalmiesiintymän suuntaisesti. Paikka perustettiin '
      + 'alun perin 1775 sotilaalliseksi etuvartioksi, eikä sillä vielä 1870-luvulla ollut '
      + 'mitään tekemistä teollisuuden kanssa. Vasta 1880-luvulla belgialainen, ranskalainen '
      + 'ja brittiläinen pääoma löysi alueen rikkaat rautamalmivarat, ja niiden ympärille '
      + 'kasvoi nopeasti kaivos- ja teollisuuskaupunki. Stalinin teollistamiskaudella 1934 '
      + 'alueelle rakennettiin Kryvorizhstal, joka oli aikanaan koko Neuvostoliiton suurin '
      + 'integroitu metallurginen tehdaslaitos.',
    lahde: 'en-Wikipedia "Kryvyi Rih", johdanto-osa ja osio "History" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-kremenchuk',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-kremenchuk-f0226867.jpg',
      lyhyt: 'Ruosteinen KrAZ-256-kippiauto kuormattuna maa-aineksella.',
      selite: 'Keltainen, kulunut kuorma-auto lastilavoineen seisoo tienreunassa, lava täynnä tummaa maa-ainesta.',
      lahde: 'Valokuva: Novoklimov, Wikimedia Commons (CC0).',
      tekija: 'Novoklimov',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:KrAZ-256B1_in_Dnipropetrovsk_02.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-kremenchuk-a39e7399.jpg',
        lyhyt: 'Kollaasi Kremenchukin kaupunkikuvista: silta, aukio ja kirkko.',
        selite: 'Viisiosainen kuvakollaasi näyttää kaupungin historiallisen talon, Dneprin ylittävän rautatiesillan, laajan aukion sekä kirkkorakennuksen.',
        lahde: 'Valokuva: DenysZ, KuRaG, Elenakopichko, Sergiy Tkachenko, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'DenysZ, KuRaG, Elenakopichko, Sergiy Tkachenko',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Collage_of_Kremenchuk.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Kremenchuk',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mitä KrAZ-tehdas valmisti ennen kuorma-autoja?',
      'Mistä maasta Kremenchukin linnoituksen rakentanut insinööri oli kotoisin?',
    ],
    korostukset: ['Guillaume Le Vasseur de Beauplan|Guillaume Le Vasseur de Beauplan', 'KrAZ|KrAZ'],
    nappi: 'Linnoituskaupunki, joka muuttuu raskaan teollisuuden keskukseksi vasta 1900-luvulla',
    // 33.40388889 E / 49.06305556 N — en-Wikipedia "Kremenchuk"
    laudat: {
      maailmankartta: { x: 6946.8, y: 1430.7 },
    },
    teksti: 'Kremenchuk on Dneprin varrella sijaitseva teollisuuskaupunki Poltavan alueella. '
      + 'Ranskalainen insinööri Guillaume Le Vasseur de Beauplan rakensi sinne pienen '
      + 'linnoituksen 1635, ja samana vuonna kaupunki sai Magdeburgin oikeudet; myöhemmin se '
      + 'toimi hetkeksi Novorossijan kuvernementin pääkaupunkina Venäjän vallan alla. '
      + 'Kaupungin nykyinen maine perustuu kuitenkin raskaaseen ajoneuvoteollisuuteen: '
      + 'paikallinen tehdas, joka tunnetaan nimellä KrAZ, perustettiin 1945 '
      + 'siltarakennustehtaaksi ja valmisti aluksi satoja siltoja Dneprin, Volgan ja muiden '
      + 'jokien yli. Vuonna 1958 tehdas muutettiin raskaiden maastokuorma-autojen '
      + 'valmistajaksi, ja jo parin vuoden kuluttua sen autoja vietiin kymmeniin maihin '
      + 'ympäri maailmaa.',
    lahde: 'en-Wikipedia "Kremenchuk", osio "History"; "KrAZ", osio "History" – "Soviet era" '
      + '(tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-kovel',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-kovel-459b5fc6.jpg',
      lyhyt: 'Kovelin rautatieaseman julkisivu ja torninhuippu alhaalta kuvattuna.',
      selite: 'Vaalea kivirakennus kaartuvine ikkunoineen kannattaa pientä vihreäkattoista tornia, jonka huipulla on rautainen tunnus.',
      lahde: 'Valokuva: Anthony Volodkin, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Anthony Volodkin',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kovel_Railway_Station.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-kovel-7c633bbe.jpg',
        lyhyt: 'Kovelin asemarakennus raiteiden puolelta, juna odottamassa laiturilla.',
        selite: 'Kaksikerroksinen vaaleankeltainen asemarakennus torneineen kohoaa raiteiden vierellä, laiturilla seisoo juna ja muutama matkustaja.',
        lahde: 'Valokuva: Viacheslav Galievskyi, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Viacheslav Galievskyi',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kovel_Volynska-train_station-1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kovel',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Minä vuonna Kovelin keihäänkärki löydettiin?',
      'Mitä keihäänkärjelle tapahtui toisen maailmansodan aikana?',
    ],
    korostukset: ['Kovelin keihäänkärki|Kovelin keihäänkärki', 'riimukirjoituksista|riimukirjoituksista'],
    nappi: 'Keihäänkärjen löytö on jo tuoretta uutista isoisän matkan aikaan',
    // 24.71666667 E / 51.21666667 N — en-Wikipedia "Kovel"
    laudat: {
      maailmankartta: { x: 6657.2, y: 1336.9 },
    },
    teksti: 'Kovel on rautatiekaupunki Luoteis-Ukrainan Volynin alueella. Sen läpi kulkeva '
      + 'Chełmin ja Kovelin välinen rata on nykyään pisin Ukrainan ja muun Euroopan '
      + 'yhdistävä normaaliraiteinen rautatie, ja se on rakennettu sekä eurooppalaiselle '
      + '1435 mm:n että venäläiselle 1520 mm:n raideleveydelle. Kaupungin läheltä löytyi '
      + '1858 niin sanottu Kovelin keihäänkärki, jonka terässä on yksi maailman vanhimmista '
      + 'tunnetuista riimukirjoituksista – goottia, joka hämmästytti aikansa tutkijoita. '
      + 'Alkuperäinen keihäänkärki katosi toisen maailmansodan aikana, mutta löytö teki '
      + 'pienestä Kovelista tunnetun arkeologien keskuudessa jo isoisän omana aikana.',
    lahde: 'en-Wikipedia "Kovel", johdanto-osa (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-uzhhorod',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-uzhhorod-d0ffacbb.jpg',
      lyhyt: 'Uzhhorodin linnan kiviportti vaakunareliefeineen.',
      selite: 'Paksu kivimuuri kaartuu porttiholviksi, jonka yläpuolella on viinirypäleitä esittävä vaakunakivi ja takana avautuu linnanpihan sisäänkäynti.',
      lahde: 'Valokuva: Alex Zelenko, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Alex Zelenko',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ukraine-Uzhhorod-Castle-4.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-uzhhorod-1cb81c4c.jpg',
        lyhyt: 'Lumipeitteinen puukuja Uzh-joen rantapenkereellä.',
        selite: 'Korkeat, lehdettömät puut reunustavat lumista rantakäytävää, jonka varrella on vihreä katulyhty ja penkki.',
        lahde: 'Valokuva: Vi Ko, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Vi Ko',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alley_of_the_river_embankment_Uzh.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Uzhhorod',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Millä nimellä Uzhhorodia kutsuttiin vuonna 1873?',
      'Mihin valtioon Uzhhorod kuului 1800-luvulla?',
    ],
    korostukset: ['Ungvár|Ungvár', 'Ung-läänin|Ung-läänin'],
    nappi: 'Vuonna 1873 kaupungin nimi on Ungvár, ei Uzhhorod',
    // 22.295 E / 48.62388889 N — en-Wikipedia "Uzhhorod"
    laudat: {
      maailmankartta: { x: 6576.5, y: 1449.6 },
    },
    teksti: 'Uzhhorod on Länsi-Ukrainan sisämaan kaupunki Uzh-joen varrella, niin lähellä '
      + 'Slovakian ja Unkarin rajoja, että se on tämän Euroopan kolkan sisämaisin kaupunki: '
      + 'Itämerelle, Aadrianmerelle ja Mustallemerelle on kaikkiin suunnilleen sama '
      + '650–690 kilometrin matka. Unkarilaiset valloittivat paikan jo vuonna 895 Gesta '
      + 'Hungarorum -kronikan mukaan, ja siitä lähtien kaupunki oli osa Unkarin '
      + 'kuningaskuntaa Ung-läänin keskuksena. Nimi Uzhhorod on 1800-luvun alun '
      + 'slaavimielisten piirien kääntämä muoto vanhasta unkarilaisesta nimestä Ungvár, '
      + 'mutta virallisesti se otettiin käyttöön vasta 1920-luvulla tšekkoslovakialaisen '
      + 'hallinnon aikana. Isoisän matkan aikaan 1873 kaupunki on siis vielä Ungvár, osa '
      + 'Unkarin kuningaskuntaa ja Itävalta-Unkarin keisarikuntaa – kaukana Venäjän vallan '
      + 'alaisesta muusta Ukrainasta.',
    lahde: 'en-Wikipedia "Uzhhorod", johdanto-osa ja osio "History" (tarkistettu '
      + '21.9.2026).',
    visa: {
      kysymys: 'Minä vuosikymmenellä nimi Uzhhorod otettiin virallisesti käyttöön?',
      vaihtoehdot: [
        '1820-luvulla',
        '1870-luvulla',
        '1920-luvulla',
        '1990-luvulla',
      ],
      oikea: 2,
      fakta: 'Isoisän vieraillessa seudulla 1873 kaupunkia kutsuttiin vielä unkarilaisittain '
        + 'Ungváriksi; slaavinkielinen Uzhhorod-nimi keksittiin jo 1800-luvun alussa, mutta '
        + 'se otettiin viralliseen käyttöön vasta tšekkoslovakialaisen hallinnon aikana '
        + '1920-luvulla.',
    },
  },
  {
    id: 'hahmotelma-chernihiv',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-chernihiv-0f2e6554.jpg',
      lyhyt: 'Vapahtajan katedraali kirkkaan sinistä taivasta vasten, kultakupolit ja tornit.',
      selite: 'Valkoinen kivikirkko viidellä kultakupolisella tornillaan kohoaa lehdettömien puiden keskeltä pilvettömänä päivänä.',
      lahde: 'Valokuva: Nomad0212, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Nomad0212',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2016_Спасо-Преображенський_собор_Чернігів.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-chernihiv-0cfacf75.jpg',
        lyhyt: 'Pyhän Kolminaisuuden luostari vihreine kupoleineen ilmakuvassa.',
        selite: 'Barokkityylinen luostarikirkko vihreine kupoleineen ja korkeine kellotorneineen kohoaa metsäisen kukkulan laella, alhaalla virtaa joki.',
        lahde: 'Valokuva: Mykola Swarnyk, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Mykola Swarnyk',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Троїцький_монастир.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Tšernihiv',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä Tšernihivin vanhin säilynyt rakennus on?',
      'Mikä liike toimi Tšernihivissä 1800-luvulla?',
    ],
    korostukset: ['Vapahtajan katedraali|Vapahtajan katedraali', 'Hromada-liike|Hromada-liike'],
    nappi: 'Venäjän kuvernementin keskus, jossa Ukrainan herääminen kytee',
    // 31.29472222 E / 51.49388889 N — en-Wikipedia "Chernihiv"
    laudat: {
      maailmankartta: { x: 6876.5, y: 1324.6 },
    },
    teksti: 'Tšernihiv on Pohjois-Ukrainan kaupunki, joka oli jo 800-luvulla siiveriläisten '
      + 'heimon keskus ja liittyi pian sen jälkeen Kiovan Rusiin sen toiseksi tärkeimmäksi '
      + 'kaupungiksi Kiovan jälkeen. 1000–1200-luvuilla se oli oman ruhtinaskuntansa ja '
      + 'piispanistuimensa keskus, ja kaupungissa säilyy yhä useita tuolta ajalta peräisin '
      + 'olevia kirkkoja – niistä vanhin on Vapahtajan katedraali, yksi harvoista '
      + 'säilyneistä mongolivalloitusta edeltävistä Rusin rakennuksista. Puolan vallan ja '
      + 'kasakkahetmanaatin vuosien jälkeen Tšernihivistä tuli 1782 oman kuvernementtinsa '
      + 'pääkaupunki Venäjän keisarikunnassa, ja 1800-luvulla siellä toimi ukrainalainen '
      + 'itsehallintopiiri ja radikaali Hromada-liike. Isoisän matkan aikaan 1873 kaupunki '
      + 'on siis Venäjän hallinnon keskus, jossa Ukrainan kansallinen herääminen kytee '
      + 'siinä missä Lvivissäkin, vain toisen vallan alla.',
    lahde: 'en-Wikipedia "Chernihiv", johdanto-osa; "Transfiguration Cathedral, Chernihiv", '
      + 'johdanto-osa (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-pochayiv',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-pochayiv-555237d1.jpg',
      lyhyt: 'Počajivin luostari kultakupoleineen kohoaa kukkulalla, tienviitta etualalla.',
      selite: 'Valkoinen ja kultakupolinen luostarikompleksi seisoo kukkulan laella, tienristeyksessä on sininen suuntakyltti naapurikaupunkeihin.',
      lahde: 'Valokuva: Микола Василечко, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Микола Василечко',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pochaiv-lavra-11032239.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-pochayiv-0bf5c02c.jpg',
        lyhyt: 'Uspenskin katedraalin kultainen kupoli ja tornit läheltä kuvattuna.',
        selite: 'Vaaleankeltainen katedraali kahdella kellotornilla ja suurella kultaisella kupolilla kohoaa mustaa taivasta vasten, linnut kaartelevat yllä.',
        lahde: 'Valokuva: Микола Василечко, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Микола Василечко',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pochaiv-lavra-Uspenskyi-sobor-11032251.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Počajivin luostari',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minä vuonna luostari palautettiin ortodoksiseksi?',
      'Missä kuvernementissa Počajiv sijaitsi vuonna 1873?',
    ],
    korostukset: ['kreikkalaiskatolinen|kreikkalaiskatolinen', 'Volynian kuvernementtia|Volynian kuvernementtia'],
    nappi: 'Ortodoksinen jälleen jo neljä vuosikymmentä isoisän vieraillessa',
    // 25.50666667 E / 50.005 N — en-Wikipedia "Pochaiv Lavra"
    laudat: {
      maailmankartta: { x: 6683.6, y: 1390 },
    },
    teksti: 'Počajivin luostari eli Pyhän Nukkumisen laavra kohoaa 60 metriä korkealla '
      + 'kukkulalla Ternopilin alueella, kahdeksantoista kilometriä lounaaseen Kremenetsistä. '
      + 'Se on ollut vuosisatojen ajan yksi itäisen kristikunnan tärkeimmistä hengellisistä '
      + 'keskuksista, mutta sen kirkkokunta on vaihdellut vallanpitäjien mukana: '
      + 'ortodoksinen vuoteen 1720 asti, sitten kreikkalaiskatolinen vuoteen 1831, jolloin se '
      + 'palautettiin jälleen ortodoksiseksi. Luostarin päärakennuksen kultaiset kupolit ja '
      + 'kellotorni näkyvät kauas ympäröivälle tasangolle, ja se on edelleen yksi Ukrainan '
      + 'vilkkaimmista pyhiinvaelluskohteista. Isoisän matkan aikaan 1873 luostari on siis '
      + 'ollut ortodoksinen jo neljä vuosikymmentä, osana Venäjän keisarikunnan Volynian '
      + 'kuvernementtia – samaa aluetta, joka aiemmin kuului Puola-Liettualle.',
    lahde: 'en-Wikipedia "Pochaiv Lavra", johdanto-osa (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-medzhybizh',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-medzhybizh-5f0f52c9.jpg',
      lyhyt: 'Medzhybižin linnoitus joen mutkassa, heijastuen tyyneen veteen.',
      selite: 'Pitkä kivilinnoitus torneineen kohoaa joenmutkan takana, ja sen ääriviivat heijastuvat tyynen veden pinnasta; rannalla laiduntaa karjaa.',
      lahde: 'Valokuva: Posterrr, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Posterrr',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Medzhybizh_Fortress_P1760040.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-medzhybizh-7075f78e.jpg',
        lyhyt: 'Medzhybižin linnan rapistuneet muurit pilvisenä syyspäivänä.',
        selite: 'Punatiilinen ja kalkkikivinen linnanmuuri kaareutuu jyrkkänä rinteenä joen yli, muurin harjalla kaksi tummaa tornia.',
        lahde: 'Valokuva: Катерина Байдужа, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Катерина Байдужа',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Medzhybizh_Castle.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Medzhybižin linnoitus',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka oli Baal Shem Tov?',
      'Missä hänen hautansa sijaitsee?',
    ],
    korostukset: ['Baal Shem Tov|Baal Shem Tov', 'hasidismin|hasidismin'],
    nappi: 'Linnoituskaupunki, joka on myös hasidismin syntypaikka',
    // 27.41222222 E / 49.43638889 N — en-Wikipedia "Medzhybizh Fortress"
    laudat: {
      maailmankartta: { x: 6747.1, y: 1414.6 },
    },
    teksti: 'Medzhybižin linnoitus seisoo Etelä-Bug- ja Buzhok-jokien yhtymäkohdassa '
      + 'Länsi-Ukrainan Podoliassa, ja ensimmäinen linnoitus samalla niemekkeellä mainitaan '
      + 'jo Kiovan Rusin kronikoissa vuonna 1146. Nykyinen kivilinna nousi 1500-luvulla '
      + 'puolalaisten Sieniawski- ja myöhemmin Czartoryski-sukujen hallinnassa, ja siitä '
      + 'tuli yksi alueen vahvimmista linnoituksista osmanien ja Krimin tataarien '
      + 'hyökkäyksiä vastaan. Kaupunki tunnetaan myös juutalaisen hasidismin syntypaikkana: '
      + 'liikkeen perustaja, mystikko ja parantaja Israel ben Eliezer eli Baal Shem Tov, '
      + 'asui Medzhybižissä vuodesta 1742 kuolemaansa 1760 asti, ja hänen hautansa vanhalla '
      + 'juutalaisella hautausmaalla on yhä hasidijuutalaisten pyhiinvaelluskohde. Puolan '
      + 'jaon jälkeen 1793 kaupunki siirtyi Venäjän keisarikunnalle, mutta linna pysyi '
      + 'Czartoryskien omaisuutena aina vuoteen 1830 saakka.',
    lahde: 'en-Wikipedia "Medzhybizh Fortress", johdanto-osa ja osio "History of the place"; '
      + '"Medzhybizh", osio "Jewish history and culture" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuosina Baal Shem Tov asui Medzhybižissä?',
      vaihtoehdot: [
        '1600–1650',
        '1700–1730',
        '1742–1760',
        '1800–1825',
      ],
      oikea: 2,
      fakta: 'Baal Shem Tov muutti Medzhybižiin noin vuonna 1742 ja asui siellä '
        + 'kuolemaansa 1760 saakka; hänen hautansa luo tekevät yhä pyhiinvaellusmatkoja '
        + 'hasidijuutalaiset ympäri maailmaa.',
    },
  },
  {
    id: 'hahmotelma-volodymyr-volynskyi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-volodymyr-880b733f.jpg',
      lyhyt: 'Uspenskin katedraali kultakupolisine torneineen ja kellotorni Volodymyrissa.',
      selite: 'Turkoosinvalkoinen keskiaikainen kirkko kultaisella kupolilla ja erillinen valkoinen kellotorni seisovat vehreällä nurmikentällä kukkaistutusten keskellä.',
      lahde: 'Valokuva: Viacheslav Galievskyi, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Viacheslav Galievskyi',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Volodymyr-Volynskyi_Volynska-complex_Cathedral_of_the_Dormition_of_the_Theotokos-1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-volodymyr-a1f0d850.jpg',
        lyhyt: 'Pyhän Volodymyrin kappeli kultaisella kupolilla kukkaistutusten keskellä.',
        selite: 'Pieni siniharmaa kappeli pyöreine kultakupoleineen seisoo kivilaatoitetun aukion päässä, ympärillä oransseja kukkaistutuksia.',
        lahde: 'Valokuva: Viacheslav Galievskyi, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Viacheslav Galievskyi',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Volodymyr-Volynskyi_Volynska-chapel_of_Saint_Volodymyr-after_repair_in_2014.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Volodymyr',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mistä nimestä Itävalta-Unkarin "Lodomerian kuningaskunta" on peräisin?',
      'Kuuluiko Volodymyrin kaupunki itse tähän kuningaskuntaan?',
    ],
    korostukset: ['Lodomeria|Lodomeria', 'Galitsia-Volhynian|Galitsia-Volhynian'],
    nappi: 'Kaupunki, jonka nimi antoi naapurikuningaskunnalle nimen – muttei itse kuulunut siihen',
    // 24.32222222 E / 50.84805556 N — en-Wikipedia "Volodymyr, Ukraine"
    laudat: {
      maailmankartta: { x: 6644.1, y: 1353.1 },
    },
    teksti: 'Volodymyr on yksi Ukrainan vanhimmista kaupungeista ja koko Volynian alueen '
      + 'historiallinen keskus: se oli Volynian ruhtinaskunnan pääkaupunki ja myöhemmin yksi '
      + 'Galitsia-Volhynian kuningaskunnan pääkaupungeista. Kaupungin keskiaikainen '
      + 'latinankielinen nimi Lodomeria antoi nimensä 1800-luvun Itävalta-Unkarin Galitsian '
      + 'ja Lodomerian kuningaskunnalle – mutta itse kaupunki ei koskaan kuulunut tähän '
      + 'kuningaskuntaan, vaan jäi rajan väärälle puolelle Venäjän keisarikuntaan. Viisi '
      + 'kilometriä kaupungista etelään sijaitsee Zymne, Volynian vanhin ortodoksiluostari. '
      + 'Isoisän matkan aikaan 1873 Volodymyr on siis vaatimaton Venäjän kuvernementin '
      + 'kaupunki, vaikka sen nimi elää yhä naapurimaakunnan virallisessa nimessä rajan '
      + 'toisella puolella.',
    lahde: 'en-Wikipedia "Volodymyr, Ukraine", johdanto-osa (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Kuuluiko Volodymyrin kaupunki Itävalta-Unkarin Galitsian ja Lodomerian '
        + 'kuningaskuntaan?',
      vaihtoehdot: [
        'Kyllä, se oli kuningaskunnan pääkaupunki',
        'Kyllä, mutta vain lyhyen aikaa',
        'Ei koskaan – se oli Venäjän keisarikunnassa',
        'Ei, se kuului Preussiin',
      ],
      oikea: 2,
      fakta: 'Vaikka kaupungin keskiaikainen latinannimi Lodomeria antoi nimensä koko '
        + 'Itävalta-Unkarin kuningaskunnalle, itse Volodymyr jäi rajan väärälle, Venäjän '
        + 'keisarikunnan puolelle.',
    },
  },
  {
    id: 'hahmotelma-etela-bug',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-etela-bug-498810f9.jpg',
      lyhyt: 'Etelä-Bug kesäisenä, puiden reunustama jokiranta.',
      selite: 'Leveä, tyyni joki kaartaa vehreiden pajujen ja muiden puiden reunustaman rannan ohi kirkkaana kesäpäivänä.',
      lahde: 'Valokuva: George Chernilevsky, Wikimedia Commons (Public domain).',
      tekija: 'George Chernilevsky',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Southern_Bug_2020_G06.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-etela-bug-e011bedb.jpg',
        lyhyt: 'Jäätynyt Etelä-Bug Vinnytsiassa, laivoja rantalaiturissa.',
        selite: 'Joen pinta on peittynyt lumiseen jäähän, jolla näkyy jalanjälkiä; rannassa on talvitelakoituja matkustaja-aluksia ja taustalla kaupungin kerrostaloja.',
        lahde: 'Valokuva: Shyam peelery, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Shyam peelery',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Southern_Bug_During_Winter.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Etelä-Bug',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Mikä on Ukrainan pisin kokonaan maan sisällä virtaava joki?',
      'Minkä kahden valtakunnan rajana Etelä-Bug toimi 1700-luvulla?',
    ],
    korostukset: ['Bugin lahteen|Bugin lahteen', 'Osmanien valtakunnan|Osmanien valtakunnan'],
    nappi: 'Entinen rajajoki virtaa isoisän aikaan jo kauttaaltaan Venäjän puolella',
    // 31.96666667 E / 46.98333333 N — en-Wikipedia "Southern Bug"
    laudat: {
      maailmankartta: { x: 6898.9, y: 1519.2 },
    },
    teksti: 'Etelä-Bug on Ukrainan pisin joki, joka virtaa kokonaan maan alueella lukuun '
      + 'ottamatta Dnepriä – sen pituus on 806 kilometriä ja valuma-alue lähes 64 000 '
      + 'neliökilometriä. Joki saa alkunsa Volynian-Podolian ylängöltä lähellä Puolan rajaa '
      + 'ja virtaa kaakkoon eteläisten arojen halki Bugin lahteen Mustallemerelle. Sen '
      + 'varrella sijaitsevat muun muassa Hmelnytskyin, Vinnytsian ja Mykolaivin '
      + 'kaupungit. Vielä 1700-luvun lopulla joki oli rajajoki Venäjän ja Osmanien '
      + 'valtakunnan välillä, mutta isoisän matkan aikaan 1873 se virtaa jo kokonaan Venäjän '
      + 'keisarikunnan sisällä, kun raja on siirtynyt kauas etelään.',
    lahde: 'en-Wikipedia "Southern Bug", johdanto-osa (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-askania-nova',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-askania-nova-0b6c5ab9.jpg',
      lyhyt: 'Askanija-Novan koskematonta aroa kukkivine heinineen ukkospilvien alla.',
      selite: 'Korkeaa heinää ja vaaleanpunaisia sekä valkoisia kukkia kasvava aro ulottuu tasaisena horisonttiin, jota vasten tummat sadepilvet kohoavat.',
      lahde: 'Valokuva: NativePlanting, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'NativePlanting',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Askania-Nova_sommer_steppe_view.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-askania-nova-e4b391fd.jpg',
        lyhyt: 'Przewalskinhevosten lauma laukkaa aroaidatulla laitumella.',
        selite: 'Ruskeita ja vaaleita jykeviä villihevosia laukkaa rinnakkain matalan aroheinän keskellä, taustalla puurivi.',
        lahde: 'Valokuva: 2bpatchett, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: '2bpatchett',
        lahdeUrl: "https://commons.wikimedia.org/wiki/File:Przewalski's_Horse_Askania_Nova.jpg",
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Askanija-Nova',
    tyyppi: 'elain',
    lahi: true,
    kysymykset: [
      'Minä vuonna Askanija-Novan luonnonsuojelualue perustettiin?',
      'Kuinka vanha Friedrich Falz-Fein oli isoisän matkan aikaan 1873?',
    ],
    korostukset: ['Przewalskinhevosten|Przewalskinhevosten', 'Friedrich Falz-Fein|Friedrich Falz-Fein'],
    nappi: 'Perustaja on vasta kymmenvuotias poika isoisän matkan aikaan',
    // 33.88083333 E / 46.45194444 N — en-Wikipedia "Askania-Nova"
    laudat: {
      maailmankartta: { x: 6962.7, y: 1541.5 },
    },
    teksti: 'Askanija-Nova on luonnonsuojelualue Etelä-Ukrainan kuivalla Taurian arolla '
      + 'lähellä Oleshkyn hiekka-aavikkoa, ja se on Unescon ihminen ja biosfääri -ohjelman '
      + 'jäsen. Alueella on sekä eläintarha että yli 33 000 hehtaaria koskematonta aroa '
      + 'laiduntavien sorkkaeläinten – muun muassa harvinaisten Przewalskinhevosten – '
      + 'elinympäristönä, sekä satoja kasvilajeja kasvava kasvitieteellinen puutarha. '
      + 'Isoisän matkan aikaan 1873 mitään tästä ei vielä ole olemassa: Askanija-Novan '
      + 'saksalaissiirtokunta järjestäytyi kylänä vasta 1890, ja koko luonnonsuojelualueen '
      + 'perusti vuonna 1898 Friedrich Falz-Fein, joka vuonna 1873 on vasta kymmenvuotias '
      + 'poika.',
    lahde: 'en-Wikipedia "Askania-Nova", johdanto-osa ja osio "History" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-synevyr',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-synevyr-ce0d43d3.jpg',
      lyhyt: 'Synevyrin järvi kuusimetsän kehystämänä, oksien läpi kuvattuna.',
      selite: 'Tumma, tyyni vuoristojärvi kuvastaa ympäröiviä kuusia, etualalla nuoren kuusen oksat ja lehdettömän puun rungot kehystävät näkymää.',
      lahde: 'Valokuva: Dmytro Petishkin, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Dmytro Petishkin',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Synevyr_Lake_in_2014_(22).jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-synevyr-e9db88ec.jpg',
        lyhyt: 'Synevyrin järvi syksyisessä auringonpaisteessa, lautoilla kävijöitä.',
        selite: 'Kultaisen ruskan värittämien vuorten ympäröimä järvi kimaltaa auringossa, vedellä kelluu kaksi puulauttaa ihmisineen.',
        lahde: 'Valokuva: Rbrechko, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Rbrechko',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:21-224-5054_Synevyr_Lake_RB_18.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Synevyr',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Mistä kahdesta nimestä järven nimi Synevyr on muodostettu?',
      'Mikä sai järven syntymään noin 10 000 vuotta sitten?',
    ],
    korostukset: ['Merensilmäksi|Merensilmäksi', 'Synevyr|Synevyr'],
    nappi: 'Kansantarun rakastavaiset antavat nimensä koko järvelle',
    // 23.684 E / 48.617 N — en-Wikipedia "Synevyr"
    laudat: {
      maailmankartta: { x: 6622.8, y: 1449.9 },
    },
    teksti: 'Synevyr on Ukrainan Karpaattien suurin järvi, joka sijaitsee Zakarpattian '
      + 'alueella 980 metrin korkeudessa Ozerna-vuoren juurella. Se syntyi jääkauden '
      + 'jälkeen noin kymmenen tuhatta vuotta sitten, kun voimakas maanjäristys irrotti '
      + 'hiekkakiveä vuorenrinteeltä ja patosi kapean laakson; vesi valuu yhä huokoisen '
      + 'luonnonpadon läpi ja nousee pintaan vasta 350 metrin päässä järvestä. Järven '
      + 'keskellä on pieni saari, jota kutsutaan Merensilmäksi, ja kansantarun mukaan koko '
      + 'järvi syntyi kreivin tyttären Synin kyynelistä, kun tämän rakastettu, paimenpoika '
      + 'Vyr, surmattiin isän käskystä – ja järven nimikin, Synevyr, on syntynyt näiden '
      + 'kahden nimen yhdistelmästä. Järvi julistettiin kansallispuistoksi 1989 ja valittiin '
      + '2008 yhdeksi Ukrainan seitsemästä luonnonihmeestä.',
    lahde: 'en-Wikipedia "Synevyr", johdanto-osa ja osio "Description" (tarkistettu '
      + '21.9.2026).',
    visa: {
      kysymys: 'Mistä kahden rakastavaisen nimistä järven nimi Synevyr on yhdistetty?',
      vaihtoehdot: [
        'Synistä ja Vyristä',
        'Romeosta ja Juliasta',
        'Oksanasta ja Petrosta',
        'Zoreslavasta ja Bohdanista',
      ],
      oikea: 0,
      fakta: 'Kansantarun mukaan kreivin tytär Syn itki järven täyteen suruissaan, kun '
        + 'hänen rakastettunsa, paimenpoika Vyr, surmattiin isän käskystä – ja järven nimi '
        + 'yhdistää yhä molemmat nimet.',
    },
  },
  /*
   * KIOVAN KULTAINEN PORTTI / ZOLOTI VOROTA — MATKAKIRJAN IHME,
   * "RAPPEUTUNUT" (kadonnut: false), tilaus docs/raportit/havainnekuvat-
   * codexille-eurooppa-20260921.md (kohde 77). Kuva on aito Commons-
   * valokuva säilyneistä keskiaikaisista muurinpätkistä 1982
   * rekonstruktiopaviljongin SISÄLLÄ (sama tilanne kuin Clunyssa) —
   * ei kuva koko nykyisestä, täyteen kokoonsa jälleenrakennetusta
   * portista. `ihme.osoite` odottaa Codexin kulta-aikakuvaa
   * (loistoaika-parikuva, ei vielä toimitettu — osoite 404:ttää siihen
   * asti, sama käytäntö kuin Medina Azaharassa).
   *
   * HUOM SIJAINNISTA: Zoloti vorota (50.44889 N / 30.51333 E) on vain
   * noin 0,4 laudan yksikön päässä olemassa olevasta hahmotelma-kiova-
   * merkistä (30.52333 E / 50.45 N) — käytännössä sama piste kuin
   * Kiovan pääkaupunkimerkki. `node tools/tarkista-nimiolimitys.mjs
   * UKR` on ajettava tämän lisäyksen jälkeen; jos nimiöt limittyvät,
   * ratkaisu (yhdistäminen Kiova-nostoon tms.) jää Fablen päätettäväksi.
   */
  {
    id: 'hahmotelma-kultainen-portti',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/ukr-nosto-kultainen-portti-668b3022.jpg',
      lyhyt: 'Kiovan Kultaisen portin säilyneet keskiaikaiset muurinpätkät rekonstruktiopaviljongin sisällä.',
      selite: 'Kuvassa on Kultaisen portin sisätila: karkeasta harmaasta kivestä ja tiilestä '
        + 'muurattujen 1000-luvun alkuperäisten muurinpätkien jäänteet, joita ympäröi 1982 '
        + 'rakennettu suojaava rekonstruktiopaviljonki.',
      lahde: 'Valokuva: Vi Ko, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Vi Ko',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Руїни_Золотих_воріт_у_Києві_02.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Kiovan Kultainen portti',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Kultaisen portin rakennutti ja miksi?',
      'Miten paljon alkuperäisestä portista on oikeasti jäljellä?',
    ],
    korostukset: ['Jaroslav Viisas|Jaroslav Viisas', 'Batu-kaanin|Batu-kaanin'],
    nappi: 'Kiovan Rusin pääportti, jonka läpi kulki ruhtinaan voittosaatto',
    // 30.51333 E / 50.44889 N — en-Wikipedia "Golden Gate, Kyiv"
    laudat: {
      maailmankartta: { x: 6850.4, y: 1370.6 },
    },
    teksti: 'Kiovan Kultainen portti oli ruhtinas Jaroslav Viisaan 1030-luvulla rakennuttama '
      + 'Kiovan Rusin pääkaupungin pääpuolustusportti ja voittosaatoille tarkoitettu '
      + 'juhlaportti, joka sai nimensä lähellä kohonneen Neitsyt Marian ilmestyskirkon '
      + 'kultaisista kupoleista. Batu-kaanin joukot vaurioittivat sitä pahoin Kiovan '
      + 'piirityksessä 1240, ja seuraavien vuosisatojen aikana portti rapistui yhä '
      + 'pahemmin raunioiksi. Vuonna 1832 metropoliitta Eugenios käynnistytti raunioiden '
      + 'kaivaukset ja ensimmäiset säilytystoimet. Koska yhtään aikalaiskuvaa alkuperäisestä '
      + 'portista ei ole säilynyt, Kiovan 1500-vuotisjuhlaa varten 1982 rakennettu täysimittainen '
      + 'rekonstruktio jäi historioitsijoiden mielestä osin arvailuksi, ja osa heistä on '
      + 'vaatinut sen purkamista säilyneiden aitojen muurinpätkien esiin saamiseksi. '
      + 'Nykyään paviljongin sisällä on nähtävillä kaksi alkuperäistä 1000-luvun '
      + 'muurinpätkää, jotka ovat jälleenrakennuksen ainoat aidosti keskiaikaiset osat.',
    lahde: 'en-Wikipedia "Golden Gate, Kyiv", johdanto-osa ja osio "History" (tarkistettu '
      + '21.9.2026).',
    ihme: {
      osoite: 'https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-kultainen-portti-loistoaika.jpg',
      kadonnut: false,
      selite: 'Loistokaudellaan 1000-luvulla Kultainen portti oli Kiovan Rusin pääkaupungin '
        + 'komein sisäänkäynti: korkea kivinen porttitorni, jonka huipulla kohosi kultakupolinen '
        + 'porttikirkko, ja jonka läpi ruhtinas Jaroslav Viisas ratsasti voittosaatossaan '
        + 'kaupunkiin.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan. Faktat: '
        + 'en-Wikipedia "Golden Gate, Kyiv", tarkistettu 21.9.2026.',
      url: 'https://en.wikipedia.org/wiki/Golden_Gate,_Kyiv',
    },
  },
];
