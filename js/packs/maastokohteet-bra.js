/*
 * MAASTOKOHTEET — BRA. Brasilian maasto ja kohteet napautettaviksi.
 *
 * ── MAAILMAN ERÄ M1 (6.9.2026): ETELÄ-AMERIKKA ────────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Erän perustelut, kiintiö ja työtapa on kirjattu kokonaisuudessaan
 * sisartiedostoon js/packs/maastokohteet-arg.js.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN
 * (tools/johda-maastokohteet.mjs `laudat`, asteet en-Wikipedian
 * coordinates-propista). Vain maailmankartan rivi.
 *
 * VARTIO 7a. tools/maastoaineisto/BRA.json -tiedostoa ei ole, joten
 * maastokohteet on valittu käsin, mutta fokuslehden rajaus on olemassa
 * (js/packs/fokus-grc.js FOKUS_POHJAT.BRA, x 3116,3…5003,6 ja
 * y 2799,8…4650,2) ja savukkeen vartio 7a pätee: jokainen alla oleva
 * piste on tarkistettu rajauksen sisään.
 *
 * BRASILIA ON ERÄN TIHEIN MAA: laudalla on neljätoista brasilialaista
 * pelikaupunkia (Boa Vista, Macapá, Manaus, Santarém, São Luís, João
 * Pessoa, Salvador, Porto Velho, Ilha do Bananal, Campo Grande, Rio de
 * Janeiro, São Paulo, Ouro Preto, Porto Alegre), joten kaupunkikatto
 * (KAUPUNGIN_KOHDALLA_SADE 7, js/fokuskohteet.js) oli tässä maassa
 * ratkaisevin rajaus. Etäisyys mitattiin jokaiseen CITIES-kaupunkiin;
 * lähin uusi merkki on Itaipu 11,2 lautayksikön päässä Iguazústa, ja
 * seuraavaksi lähimmät ovat Atlantti 27,5 (Salvador) ja Olinda 29,4
 * (João Pessoa). Kaikki yksitoista ovat siis pääkartan merkkejä.
 *
 * MIKÄ JÄTETTIIN POIS. Ouro Preto ja Rio de Janeiro ovat pelikaupunkeja,
 * ja Amazon, Rio Negro, São Francisco, Madeira, Xingu, Tapajós,
 * Tocantins, Araguaia ja Purus ovat kaikki jo maailmankartan jokinimiä
 * (js/packs/maailmankartta-nimet.js) — siksi Brasilian kolmesta
 * maastokohteesta yksikään ei ole joki, vaan vuori, saari ja valtameri.
 *
 * KUVATON ERÄ. Faktat en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_BRA = [
  /* ================================================================
   * MAASTOKOHTEET — vuori, saari, meri.
   * ============================================================== */
  {
    id: 'picodaneblina',
    nimi: 'Pico da Neblina',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä nimi Yaripo tarkoittaa?',
      'Mikä Guayanan kilpi on?',
    ],
    korostukset: ['Yaripo|Yaripo'],
    nappi: 'Sumuhuippu Amazonin yllä',
    // -66.0 E / 0.8028 N — en-Wikipedia "Pico da Neblina"
    // lähin pelikaupunki: Boa Vista 190,0 lautayksikköä
    laudat: {
      maailmankartta: { x: 3633.3, y: 3184.7 },
    },
    teksti: 'Pico da Neblina eli Sumuhuippu on Brasilian korkein vuori, 2 995 metriä. '
      + 'Se kohoaa Luoteis-Amazonasissa Serra do Imerin alueella lähellä Guayanan '
      + 'ylängön eteläreunaa, ja huippu on vain noin 687 metriä Brasilian puolella '
      + 'rajaa. Vuori on Guayanan kilven korkein kohta ja koko Etelä-Amerikan korkein '
      + 'piste Andien itäpuolella. Cauaburisin alueen yanomamit kutsuvat vuorta nimellä '
      + 'Yaripo, tuulten vuori, ja se on heidän uskomuksissaan pyhä: huipulle vievän '
      + 'reitin varren paikat kuuluvat esivanhempien kertomuksiin ja henkiä koskeviin '
      + 'rituaaleihin. Huippu on yhtä aikaa kansallispuistossa ja yanomamien '
      + 'alkuperäiskansa-alueella.',
    lahde: 'en-Wikipedia "Pico da Neblina", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'fernandodenoronha',
    nimi: 'Fernando de Noronha',
    tyyppi: 'saari',
    kysymykset: [
      'Kuinka kaukana saaristo on mantereesta?',
      'Miksi saaristo on hallinnollisesti poikkeus?',
    ],
    korostukset: ['Morro do Pico|Morro do Pico'],
    nappi: 'Kaksikymmentäyksi saarta keskellä merta',
    // -32.4233 E / -3.8547 N — en-Wikipedia "Fernando de Noronha"
    // lähin pelikaupunki: João Pessoa 145,2 lautayksikköä
    laudat: {
      maailmankartta: { x: 4752.6, y: 3340 },
    },
    teksti: 'Fernando de Noronha on Atlantilla sijaitseva saaristo, joka kuuluu '
      + 'Pernambucon osavaltioon ja on 354 kilometrin päässä Brasilian rannikolta. '
      + 'Saaria ja luotoja on 21, yhteensä 26 neliökilometriä, mutta vain päänimikkosaari '
      + 'on asuttu: 18,4 neliökilometriä ja noin 3 100 asukasta. Suurin osa saaristosta '
      + 'on matalaa, mutta vulkaaninen kallio Morro do Pico kohoaa 323 metriin. '
      + 'Hallinnollisesti saaristo on ainutlaatuinen: se on osavaltiopiiri, jota '
      + 'Pernambuco hallinnoi suoraan, vaikka se on maantieteellisesti lähempänä Rio '
      + 'Grande do Nortea. Vuonna 1988 seitsemänkymmentä prosenttia alueesta '
      + 'julistettiin merikansallispuistoksi, ja Unesco liitti saaret '
      + 'maailmanperintöluetteloon 2001.',
    lahde: 'en-Wikipedia "Fernando de Noronha", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'atlanttibra',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Miten Cabral päätyi Brasiliaan?',
      'Milloin orjakauppa loppui Brasiliassa?',
    ],
    korostukset: ['Etelä-Atlantin pyörre|Etelä-Atlantin pyörre'],
    nappi: 'Meri, joka toi Brasilian maailmankartalle',
    // -38.0 E / -13.0 N — en-Wikipedia "Atlantic Ocean" (Brasilian rannikon edusta)
    // lähin pelikaupunki: Salvador 27,5 lautayksikköä
    laudat: {
      maailmankartta: { x: 4566.7, y: 3647.2 },
    },
    teksti: 'Atlantti on maailman toiseksi suurin valtameri, noin 85 miljoonaa '
      + 'neliökilometriä eli seitsemäntoista prosenttia maapallon pinnasta. Löytöretkien '
      + 'aikana se tunnettiin merenä, joka erotti Amerikat vanhasta maailmasta. Brasilia '
      + 'löytyi eurooppalaisille sen virtojen ansiosta: Pedro Álvares Cabral oli 1500 '
      + 'matkalla Intiaan Vasco da Gaman jäljissä, kun Etelä-Atlantin pyörre kuljetti '
      + 'hänen laivueensa Brasilian rannikolle. Samasta merestä tuli 1500-luvulta '
      + '1800-luvulle orjakaupan valtatie: arviolta 9,5 miljoonaa orjuutettua '
      + 'afrikkalaista kuljetettiin Atlantin yli Uuteen maailmaan, ja Brasilia oli '
      + 'Amerikan viimeinen maa, joka lopetti orjakaupan — vuonna 1888.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa sekä osiot "Age of Discovery" '
      + 'ja "Slave trade" (tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * ERÄ M1 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   * ============================================================== */
  {
    id: 'brasilia',
    nimi: 'Brasília',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi pääkaupunki siirrettiin sisämaahan?',
      'Miten kaupungin lentokonemuoto toimii?',
    ],
    korostukset: ['Monumentaaliakseli|Monumentaaliakseli'],
    nappi: 'Kaupunki, joka piirrettiin tyhjälle ylängölle',
    // -47.8828 E / -15.7939 N — en-Wikipedia "Brasília"
    // lähin pelikaupunki: Ouro Preto 175,4 lautayksikköä
    laudat: {
      maailmankartta: { x: 4237.2, y: 3742.3 },
    },
    teksti: 'Brasília on Brasilian pääkaupunki, ja presidentti Juscelino Kubitschek '
      + 'perusti sen 21. huhtikuuta 1960 korvaamaan Rio de Janeiron. Kaupunki on '
      + 'suunniteltu tyhjästä: kaavan tekivät 1956 Lúcio Costa, Oscar Niemeyer ja '
      + 'Joaquim Cardozo, maisema-arkkitehtina Roberto Burle Marx, ja tarkoitus oli '
      + 'siirtää pääkaupunki keskemmälle maata. Kaava jakaa kaupungin numeroituihin '
      + 'kortteleihin ja omiin sektoreihinsa — hotellisektori, pankkisektori, '
      + 'lähetystösektori. Pohjakaava muistuttaa lentokonetta: runkona on '
      + 'Monumentaaliakseli, kaksi leveää väylää puiston molemmin puolin, ja ohjaamossa '
      + 'on Kolmen vallan aukio, jonka ympärillä ovat hallituksen kolme haaraa. Unesco '
      + 'liitti Brasílian maailmanperintöluetteloon 1987 modernistisen arkkitehtuurinsa '
      + 'ja kaupunkisuunnittelunsa vuoksi.',
    lahde: 'en-Wikipedia "Brasília", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'itaipu',
    nimi: 'Itaipun pato',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi padossa on kahdenlaisia generaattoreita?',
      'Mitä patoaltaan alle jäi?',
    ],
    korostukset: ['Guaíran putoukset|Guaíran putoukset'],
    nappi: 'Kahden maan yhteinen voimala',
    // -54.5892 E / -25.4083 N — en-Wikipedia "Itaipu Dam"
    // lähin pelikaupunki: Iguazú 11,2 lautayksikköä
    laudat: {
      maailmankartta: { x: 4013.7, y: 4076.8 },
    },
    teksti: 'Itaipun pato on vesivoimalaitos Paranájoessa Brasilian ja Paraguayn '
      + 'rajalla, ja se on tuotetulla sähköllä mitattuna maailman kolmanneksi suurin '
      + 'pato. Nimi tulee guaraníksi ja tarkoittaa soivaa kiveä. Voimala valmistui 1984 '
      + 'ja on kahden maan yhteisyritys: kahdestakymmenestä koneistosta kymmenen tuottaa '
      + 'sähköä 50 hertsin taajuudella Paraguaylle ja kymmenen 60 hertsillä Brasilialle, '
      + 'ja kukin antaa 700 megawattia. Betonia kului niin paljon, että sillä olisi '
      + 'rakentanut 210 Maracanãn kokoista stadionia. Hinta oli suuri: rakennustöiden '
      + 'alkaessa 1971 noin 10 000 perhettä joutui muuttamaan, ja allas hukutti alleen '
      + 'Guaíran putoukset, jotka olivat vesimäärältään maailman suurimmat. Putoukset '
      + 'olivat myös ekologinen raja, ja niiden kadottua yli kolmekymmentä kalalajia on '
      + 'levinnyt yläjuoksun vesiin.',
    lahde: 'en-Wikipedia "Itaipu Dam", johdanto-osa sekä osiot "Environmental impact" '
      + 'ja "Numbers" (tarkistettu 6.9.2026).',
  },
  {
    id: 'serradacapivara',
    nimi: 'Serra da Capivara',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka vanhoja alueen työkalut ovat?',
      'Mikä Pedra Furada on?',
    ],
    korostukset: ['Pedra Furada|Pedra Furada'],
    nappi: 'Amerikan vanhin asuinseutu?',
    // -42.55 E / -8.8333 N — en-Wikipedia "Serra da Capivara National Park"
    // lähin pelikaupunki: Salvador 183,1 lautayksikköä
    laudat: {
      maailmankartta: { x: 4415, y: 3506.7 },
    },
    teksti: 'Serra da Capivaran kansallispuisto on Koillis-Brasiliassa Piauín '
      + 'osavaltiossa, ja sen pinta-ala on 1 291 neliökilometriä. Alueella on Amerikkojen '
      + 'suurin ja vanhin esihistoriallisten kohteiden keskittymä sekä runsaasti '
      + 'kalliomaalauksia; puisto perustettiin nimenomaan niiden suojelemiseksi ja '
      + 'liitettiin maailmanperintöluetteloon 1991. Sen pääarkeologi oli Niède Guidon, ja '
      + 'tunnetuin kaivauspaikka on Pedra Furada. Uudemmalta Toca da Tira Peian '
      + 'kohteelta löydetyt kivityökalut on ajoitettu optisesti stimuloidulla '
      + 'luminesenssilla jopa 22 000 vuoden ikäisiksi — luku, joka koettelee vanhaa '
      + 'käsitystä siitä, milloin ihminen saapui Amerikkaan. Vuoriston nimi tarkoittaa '
      + 'portugaliksi kapybaramäkiä.',
    lahde: 'en-Wikipedia "Serra da Capivara National Park", johdanto-osa sekä osiot '
      + '"Location" ja "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'saomigueldasmissoes',
    nimi: 'São Miguel das Missões',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä oli guaraní-lähetysasema?',
      'Kuka lähetettiin tutkimaan raunioita 1937?',
    ],
    korostukset: ['reduktio|reduktion'],
    nappi: 'Guaranílähetyksen rauniot',
    // -54.5567 E / -28.5544 N — en-Wikipedia "São Miguel das Missões"
    // lähin pelikaupunki: Iguazú 102,9 lautayksikköä
    laudat: {
      maailmankartta: { x: 4014.8, y: 4189.6 },
    },
    teksti: 'São Miguel das Missões on kunta Rio Grande do Sulissa Etelä-Brasiliassa, ja '
      + 'sen alueella ovat 1600-luvun espanjalaisen jesuiittalähetysaseman rauniot. '
      + 'Kaupunki kasvoi reduktion ympärille: San Miguel Arcángelin lähetysasema '
      + 'perustettiin 1632, ja kun alue myöhemmin liitettiin Brasiliaan, sen nimi '
      + 'muuttui portugalinkieliseksi. Vuonna 1984 asema liitettiin '
      + 'maailmanperintöluetteloon osana guaraníen jesuiittalähetysasemien kokonaisuutta, '
      + 'johon kuuluu neljä kohdetta Argentiinassa ja tämä yksi Brasiliassa. Arkkitehti '
      + 'Lúcio Costa lähetettiin 1937 tutkimaan Seitsemän lähetyskansan raunioita ja '
      + 'ehdottamaan toimia; hänen esityksestään perustettiin museo, joka kokosi seudulle '
      + 'hajaantuneet lähetysasemien patsaat yhteen. Rauniot ja museorakennus '
      + 'suojeltiin 1938.',
    lahde: 'en-Wikipedia "São Miguel das Missões", johdanto-osa sekä osiot "Mission" ja '
      + '"Museum" (tarkistettu 6.9.2026).',
  },
  {
    id: 'olinda',
    nimi: 'Olinda',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miten Olindan karnevaali eroaa muista?',
      'Kuinka vanha kaupunki on?',
    ],
    korostukset: ['karnevaali|karnevaali'],
    nappi: 'Karnevaali ilman lippuja ja katsomoita',
    // -34.8553 E / -8.0089 N — en-Wikipedia "Olinda"
    // lähin pelikaupunki: João Pessoa 29,4 lautayksikköä
    laudat: {
      maailmankartta: { x: 4671.5, y: 3479 },
    },
    teksti: 'Olinda on historiallinen kaupunki Pernambucon osavaltiossa Brasilian '
      + 'koillisrannikolla, osa Recifen suurkaupunkialuetta. Se on ollut asuttu vuodesta '
      + '1535 ja toimi siirtomaa-aikana Pernambucon kapteenikunnan pääkaupunkina, joten '
      + 'historiallisia rakennuksia on runsaasti; keskusta liitettiin '
      + 'maailmanperintöluetteloon 1982, ja sitä pidetään yhtenä Brasilian parhaiten '
      + 'säilyneistä siirtomaakaupungeista. Olindan karnevaali on katujuhla, joka '
      + 'muistuttaa perinteisiä portugalilaisia karnevaaleja mutta on saanut mukaansa '
      + 'afrikkalaisvaikutteiset tanssit. Kaikki tapahtuu kadulla: katsomoita ei ole, '
      + 'köysiä ei ole eikä sisäänpääsy maksa mitään — toisin kuin useimmissa muissa '
      + 'kaupungeissa. Musiikkiryhmiä on satoja, joskus yhden esiintyjän kokoisia.',
    lahde: 'en-Wikipedia "Olinda", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'congonhas',
    nimi: 'Congonhasin profeetat',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka Aleijadinho oli?',
      'Miksi kirkko rakennettiin?',
    ],
    korostukset: ['Aleijadinho|Aleijadinho'],
    nappi: 'Kaksitoista profeettaa portailla',
    // -43.8583 E / -20.5 N — en-Wikipedia "Sanctuary of Bom Jesus de Matosinhos"
    // lähin pelikaupunki: Ouro Preto 56,5 lautayksikköä
    laudat: {
      maailmankartta: { x: 4371.4, y: 3904.4 },
    },
    teksti: 'Bom Jesus de Matosinhosin pyhäkkö on 1700-luvun basilika Congonhasissa '
      + 'Minas Geraisissa. Se rakennettiin barokkityyliin, ja sisustus on '
      + 'italialaisvaikutteista rokokoota. Kuuluisin osa on ulkoportaikko, jota reunustavat '
      + 'Vanhan testamentin profeettojen patsaat; sisällä on seitsemän sivukappelia, '
      + 'joissa esitetään ristin tie polykromisin veistoksin. Ne ovat taiteilija '
      + 'Aleijadinhon ja hänen apulaistensa työtä ja niitä pidetään omaperäisen, '
      + 'liikuttavan ja ilmeikkään barokkitaiteen mestariteoksina. Kirkon tilasi Feliciano '
      + 'Mendes, joka oli luvannut sen toivuttuaan vakavasta sairaudesta 1757; kun hän '
      + 'kuoli 1765, pyhäkössä alettiin pitää jumalanpalveluksia. Pyhäkkö on Morro do '
      + 'Maranhãon jyrkänteellä, ja sinne noustaan vanhankaupungin mukulakivikatuja. '
      + 'Maailmanperintökohde siitä tuli 1985.',
    lahde: 'en-Wikipedia "Sanctuary of Bom Jesus de Matosinhos", johdanto-osa sekä '
      + 'osiot "Location" ja "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'pantanal',
    nimi: 'Pantanal',
    tyyppi: 'elain',
    kysymykset: [
      'Kuinka suuri osa Pantanalista on veden alla?',
      'Mistä nimi Pantanal tulee?',
    ],
    korostukset: ['tulvaniitty|tulvaniittyjen'],
    nappi: 'Maailman suurin trooppinen kosteikko',
    // -56.5 E / -18.0 N — en-Wikipedia "Pantanal"
    // lähin pelikaupunki: Campo Grande 105,4 lautayksikköä
    laudat: {
      maailmankartta: { x: 3950, y: 3817.9 },
    },
    teksti: 'Pantanal on maailman suurin trooppinen kosteikko ja samalla laajin '
      + 'tulvaniittyjen alue. Se on enimmäkseen Mato Grosso do Sulin osavaltiossa mutta '
      + 'ulottuu myös Mato Grossoon sekä Bolivian ja Paraguayn puolelle, ja arviot sen '
      + 'koosta liikkuvat 140 000:n ja 195 000 neliökilometrin välillä. Nimi tulee '
      + 'portugalin sanasta pântano, suo, ja päätteestä -al, joka merkitsee runsautta. '
      + 'Sadekausina noin kahdeksankymmentä prosenttia tulvatasangoista on veden alla, ja '
      + 'juuri se ylläpitää alueen poikkeuksellisen runsasta vesikasvillisuutta ja '
      + 'tiheää eläimistöä. Maasto on loivasti viettävä altaan pohja, joka kerää vedet '
      + 'ympäröiviltä ylängöiltä ja päästää ne hitaasti Paraguayjokea myöten eteenpäin — '
      + 'käytännössä valtava sisämaan jokisuisto.',
    lahde: 'en-Wikipedia "Pantanal", johdanto-osa sekä osiot "Etymology" ja '
      + '"Geography and geology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'lencoismaranhenses',
    nimi: 'Lençóis Maranhenses',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi dyynien väliin syntyy järviä?',
      'Onko Lençóis aavikko?',
    ],
    korostukset: ['barkaanidyyni|barkaanidyynejä'],
    nappi: 'Dyynit, jotka täyttyvät vedellä',
    // -43.1 E / -2.5 N — en-Wikipedia "Lençóis Maranhenses National Park"
    // lähin pelikaupunki: São Luís 54,7 lautayksikköä
    laudat: {
      maailmankartta: { x: 4396.7, y: 3294.8 },
    },
    teksti: 'Lençóis Maranhensesin kansallispuisto on Maranhãon osavaltiossa '
      + 'Koillis-Brasiliassa, ja se suojeltiin 2. kesäkuuta 1981. Puistoon kuuluu '
      + 'seitsemänkymmentä kilometriä rannikkoa ja 155 000 hehtaaria loivia hiekkadyynejä, '
      + 'enimmäkseen barkaanidyynejä, jotka ovat muodostuneet myöhäiskvartäärillä. '
      + 'Sadekaudella dyynien väliset painanteet täyttyvät makealla vedellä, koska '
      + 'hiekan alla oleva läpäisemätön kallio estää veden valumisen — maisemaan ilmestyy '
      + 'tuhansia lampia. Aavikko se ei ole, vaikka siltä näyttää: sadetta tulee noin '
      + '1 200 millimetriä vuodessa, kun aavikon raja on 250. Puisto liitettiin '
      + 'maailmanperintöluetteloon heinäkuussa 2024 poikkeuksellisen kauneutensa ja '
      + 'ainutlaatuisuutensa vuoksi.',
    lahde: 'en-Wikipedia "Lençóis Maranhenses National Park", johdanto-osa ja osio '
      + '"Physical geography" (tarkistettu 6.9.2026).',
  },
];
