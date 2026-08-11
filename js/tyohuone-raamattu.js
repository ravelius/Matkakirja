/*
 * RAAMATTU 2.0 — koko pelin idea yhdessä tiedostossa.
 *
 * Omistajan tilaus 11.8.2026: työhuone ja vanha raamattu olivat
 * liian sekavia — tälle sivulle kootaan pelin kaikki puolet, ja
 * vanhat kirjaukset arkistoitiin Arkisto-välilehdelle. Sisältö on
 * Fablen TIIVISTYS nykytilasta (luonnos): se käydään omistajan
 * kanssa läpi kohta kohdalta, ja hyväksytyn osion tila vaihdetaan
 * luonnoksesta hyväksytyksi. VAIN FABLE kirjoittaa tähän
 * tiedostoon. Yksityiskohtaiset lähdedokumentit, joihin tiivistys
 * nojaa: docs/tarina.md, docs/isoisan-raamattu.md,
 * docs/periaatteet.md — ristiriidassa Raamattu 2.0 voittaa sen
 * jälkeen, kun osio on hyväksytty yhdessä.
 */

export const RAAMATTU2 = {
  paivitetty: '11.8.2026',
  johdanto: 'Koko pelin idea yhdessä dokumentissa. Tämä on Fablen '
    + 'tiivistys pelin nykytilasta (v576) — käydään läpi yhdessä '
    + 'kohta kohdalta ja muokataan, kunnes jokainen osio on '
    + 'hyväksytty. HUOM (omistajan linjaus 11.8.2026): kun Raamattu '
    + '2.0 on valmis, KAIKKI matkakirjamerkinnät, kohtaamiset ja '
    + 'aarrelöytötekstit kirjoitetaan uusiksi sen mukaisiksi.',
  osiot: [
    {
      otsikko: 'Ydinajatus ja kohderyhmä',
      tila: 'hyväksytty 11.8.2026',
      kohdat: [
        'Suomenkielinen selainseikkailu: nuori herra Reginald Fogg '
          + 'matkustaa isoisänsä vuoden 1873 matkapäiväkirjan '
          + 'jäljillä maailman ympäri ja etsii Aarnin luettelon '
          + 'unohdettuja aarteita.',
        'Kohderyhmä: 13 vuotta täyttäneet ja aikuiset.',
        'Peli näyttää uusia paikkoja ja kiinnostavia '
          + 'yksityiskohtia kaupungeista ja maista — '
          + 'kulttuureista, tavoista, kielistä, keksinnöistä ja '
          + 'historiasta — sekä hurjia tarinoita niin '
          + '1800-luvulta kuin nykypäivästä. Ymmärrys rakentuu '
          + 'tarkoin valituista kuvista, teksteistä, peleistä, '
          + 'grafiikoista, animoiduista karttavisualisoinneista, '
          + 'linkeistä, radioista ja muista lähteistä.',
        'Mielenkiintoa pitää yllä kehystarinan seikkailuretki: '
          + 'aarteita voi löytää, mutta matkalla on myös vaaroja — '
          + 'ja aikapaine: maailman ympäri alle '
          + 'kahdeksassakymmenessä päivässä. Raja on tavoite ja '
          + 'isoisän ennätys, ei tuomio (omistajan päätös '
          + '11.8.2026): ylityksestä ei rangaista ja alitus '
          + 'palkitaan, mutta peli muistuttaa kuluvista päivistä '
          + 'matkan varrella, jotta paine tuntuu.',
        'Oppiminen on seikkailun sivutuote: uteliaisuus '
          + 'kuljettaa, mikään ei tunnu koululta — ja kaikki '
          + 'tieto on totta ja tarkistettua. Oppiminen lähtee '
          + 'usein pienestä kiinnostavasta yksityiskohdasta ja '
          + 'laajenee siitä ymmärrykseksi koko maasta tai '
          + 'kulttuurista.',
        'Tekoäly tekee mahdolliseksi valtavan käyttövapaan '
          + 'aineiston (PD/CC) hyödyntämisen ja kuratoinnin '
          + 'selkeään, kiinnostavaan, yllättävään ja koskettavaan '
          + 'muotoon — ihminen valitsee ja hyväksyy '
          + 'lopputuloksen.',
      ],
    },
    {
      otsikko: 'Tarina ja hahmot',
      tila: 'luonnos',
      kohdat: [
        'Reginald Fogg perii vintiltä isoisän matkalaukun: vuoden '
          + '1872 kartan, kukkarollisen puntia, passin ja paksun '
          + 'päiväkirjan vuodelta 1873. Hän olettaa maailman olevan '
          + 'kuin isoisä sen jätti — ei ole.',
        'Matkakirja on puhtaasti isoisän PÄIVÄKIRJA: sitä ei ole '
          + 'kirjoitettu kenellekään eikä se puhuttele lukijaa. '
          + 'Sen revitty viimeinen sivu on arvoitus, jota Reginald '
          + 'lähtee selvittämään.',
        'Reginaldin kiire on itse valittu: hän on päättänyt tehdä '
          + 'matkan samassa ajassa kuin isoisä — alle 80 päivässä.',
        'Matkalla Reginaldille selviää, millainen isoisä hänellä '
          + 'oli ja mitä kummallista tälle sattui — ja samalla hän '
          + 'alkaa ymmärtää maailmaa ja sen muuttumista. '
          + 'Päiväkirjan tapahtumat ja nykymaailman ilmiöt ovat '
          + 'niin hurjia, että Reginaldia alkaa itseäänkin '
          + 'jännittää — varsinkin kun joku tuntuu seuraavan. '
          + 'Onko joku muukin saanut vihiä, että Aarnin aarteet '
          + 'ovat sittenkin olemassa?',
        'Isoisä Horatio Fogg (H.F.): laivaston kartanpiirtäjä, '
          + 'erosi 1873 ("halusin tietää, mitä rannikon takana '
          + 'on"). Mittaa kaiken (barometri kulkee nyt Reginaldin '
          + 'laukussa), pelkää hevosia muttei myrskyjä, kohtelias '
          + 'kaikille — persoona välittyy päiväkirjan '
          + 'merkinnöistä, ei puhuttelusta.',
        'Kaksi ääntä vuorottelee: isoisän päiväkirja 1873 ja '
          + 'nuoren herran havainto nyt. Huumori syntyy niiden '
          + 'välistä; joskus isoisä on yhä oikeassa, ettei vanha '
          + 'ääni ole narri. Ivaa paikallisille ei koskaan — '
          + 'piikki osoittaa herroihin itseensä.',
        'Vastustajat: isoisällä oli kilpailija (Ezekiel Grimshaw, '
          + '1873 — mahtipontinen, aina laivavuoron myöhässä, ei '
          + 'koskaan vaarallinen). Reginaldilla on omansa: '
          + 'NÄKYMÄTÖN kilpailija, joka ei koskaan näyttäydy eikä '
          + 'missään kohdassa paljastu hyväksi tai auttajaksi — '
          + 'näkyy vain merkkejä seuraamisesta. Hän lisää '
          + 'aikapainetta ja kaihertaa Reginaldin mieltä.',
        'Aarni: 1800-luvun alun tutkimusmatkailija, jonka '
          + 'luettelossa on maailman unohdetut aarteet — yksi '
          + 'jokaisesta maanosasta. Aikalaiset pitivät luetteloa '
          + 'satukirjana; isoisä uskoi siihen.',
        'Mantereen mysteeri: jokaisella maanosalla on YKSI '
          + 'toistuva MERKKI, jonka tarkoitus selviää vasta kun '
          + 'mantereen pääaarre löytyy — seuraavalla mantereella '
          + 'alkaa uusi. Tekstimassassa merkit ovat pienessä '
          + 'roolissa, sivulauseen huomioita.',
        'Fablen merkkiehdotukset (7, päätetään yhdessä): '
          + 'Eurooppa — liidulla piirretty pieni kompassiruusu '
          + 'ovenpielissä ja kivissä; Afrikka — akaasianoksaan '
          + 'solmittu punainen lanka; Lähi-itä — vastapoltetun '
          + 'suitsukkeen tuoksu paikoissa, joissa ei ole ketään; '
          + 'Aasia — taitettu paperikurki jätettynä näkyville; '
          + 'Pohjois-Amerikka — kolmen kiven latomus polun '
          + 'varressa; Etelä-Amerikka — solmittu naru '
          + '(khipu-solmut); Oseania — hiekkaan piirretty '
          + 'Eteläristin tähtikuvio.',
        'Matkakirjan tekstien rooli: isoisän seikkailut 1873 ja '
          + 'nuoren herran tarkat, yksityiskohtaiset havainnot '
          + 'nykyhetkestä. Pieni huomio avaa kaupungin ytimen ja '
          + 'tunnelman tarinana — lehdet syventävät sen tiedoksi, '
          + 'ja tarinan kautta paikka myös muistetaan.',
      ],
    },
    {
      otsikko: 'Pelin kulku',
      tila: 'luonnos',
      kohdat: [
        'Yksi lauta: koko maailma yhdellä kartalla (erilliset '
          + 'mannerlaudat ja vaihtoportit poistettu 11.8.).',
        'Vuoro: valitse matkustustapa (jalan / laivalla / '
          + 'lentäen) → noppa → siirto kartalla. Aika kuluu '
          + 'päivinä ja vuorokaudenaikoina.',
        'Kaupungissa mikään ei ponnahda ruudulle itsestään: '
          + 'Tutki-nappi avaa saapumiskortin, ja tehtävä alkaa '
          + 'kortin omasta napista. Matka on vapaata vaellusta '
          + 'ilman pakotettua reittiä.',
      ],
    },
    {
      otsikko: 'Aarteet ja eteneminen',
      tila: 'luonnos',
      kohdat: [
        'Laatta joka kaupungissa; tehtävän oikea vastaus kääntää '
          + 'sen. Jokaisella mantereella on OMAT aarteensa omine '
          + 'kuvineen — laatta paljastaa sen mantereen aarteen, '
          + 'jolta se löytyy (taulukko alla). Vanhoja Afrikan '
          + 'tähden jalokiviä ei ole pelissä.',
        'Seitsemän unohdettua aarretta — yksi per manner, Aarnin '
          + 'luettelosta. Ei portteja eikä kynnyksiä: mantereen '
          + 'aarre voi osua ensimmäiseen kätköön ja on varmasti '
          + 'viimeisessä.',
        'Kun mantereen aarre löytyy, avautuu mannerlento '
          + 'seuraavalle mantereelle (vain niille, joiden aarre on '
          + 'yhä kateissa).',
        'Erillinen vihjejärjestelmä on poistettu (11.8.) — '
          + 'päiväkirjan taitettu sivu on tarinamotiivi, ei '
          + 'mekaniikka.',
      ],
    },
    {
      otsikko: 'Tutki kätkö -pelit',
      tila: 'luonnos',
      kohdat: [
        'Kattonimi kaikelle, mitä Etsi kätkö -napin takaa voi '
          + 'paljastua. Pysähdyksessä on aina täsmälleen yksi peli.',
        'Kaupungin ensimmäinen peli on aina luettu kohtaaminen; '
          + 'sen jälkeen muodot vaihtelevat painotetulla '
          + 'arvonnalla: tietovisa, isoisän väittämä, '
          + 'valokuvakysymys, lippukysymys, tapahtumakortti, '
          + 'isoisän pulma (piirros- tai valokuvapulma), vaikea '
          + 'kysymys ja rosvon kaksintaistelu.',
        'Pelin on auettava siitä, mitä ruudulla näkyy — ei ulkoa '
          + 'opettelua. Kuvat ovat oikeita ja tarkistettuja.',
        'Koko katalogi ja uudet peliehdotukset: Pelit-välilehti. '
          + 'Uudet tyypit valitaan yhdessä ja pilotoidaan yhdessä '
          + 'kaupungissa.',
      ],
    },
    {
      otsikko: 'Kohtaamiset ja henkilöt',
      tila: 'luonnos',
      kohdat: [
        'Joka kaupungille käsin kirjoitettu henkilö, jonka suku '
          + 'tai ammatti liittyy isoisän jälkeen: repliikki, '
          + 'isoisän jättämä kysymys ja aarreteksti (tarinakaari). '
          + 'Kohtaaminen ja aarre luetaan ääneen.',
        'Saapumiskortin nappi nimeää henkilön ("Tapaa Nikos"). '
          + 'Aloita peli -nappi erottaa luennan ja tehtävän — '
          + 'tiimalasi ei kulu kertojan puhuessa.',
        'Epäonnistumisesta yksi uusintayritys ("Viimeinen '
          + 'mahdollisuus tavata"); toisen jälkeen henkilö ei ole '
          + 'tavattavissa, onnistumisen jälkeen nappi harmaantuu. '
          + 'Kohtaamiset ovat istuntokohtaisia.',
      ],
    },
    {
      otsikko: 'Kaupungit',
      tila: 'luonnos',
      kohdat: [
        'Saapumiskortti: isoisän matkakirjamerkintä (luettuna) ja '
          + 'kaupungin esittely kuvineen.',
        'Lehtikaupungeissa kortti taittuu paikallislehdeksi: '
          + 'useita sivuja, kuvataitto, sää, uutiset ja media.',
        'Kohdekartta numeropisteineen ja itse kirjoitetut '
          + 'nähtävyysjutut (Euroopassa 34 kaupunkia): lehtijutun '
          + 'taitto, kuvakaruselli, henkilölinkit (esim. Engel '
          + 'Helsingissä) ja täysikoon kuvaselaus.',
      ],
    },
    {
      otsikko: 'Maalehdet ja lukeminen',
      tila: 'luonnos',
      kohdat: [
        'Jokaisella lehtimaalla oma maalehti: 2–4 aihesivua '
          + '(kolme juttua per sivu), minitehtävät, menovinkit ja '
          + 'Maa numeroina -tunnusluvut.',
        'Kuva ja aihe ovat aina siitä maasta, jota sivu '
          + 'käsittelee — naapurin parasta kuvaa ei lainata.',
        'Eurooppa on valmis; Lähi-itä pitkällä (ARE, Jordania, '
          + 'Oman, Qatar, Egypti, Kuwait, Bahrain + Irakin, '
          + 'Iranin, Jemenin, Syyrian ja Kyproksen sivuja). Pyhät '
          + 'kaupungit ovat oma sivutyyppinsä, jonka johdannot '
          + 'kirjoittaa Fable omistajan päätöksellä.',
      ],
    },
    {
      otsikko: 'Äänet ja luennat',
      tila: 'luonnos',
      kohdat: [
        'Viisas Kertoja lukee saapumiset, kohtaamiset ja '
          + 'aarretekstit (ElevenLabs v3); teksti ja luenta '
          + 'vastaavat toisiaan sanasta sanaan, siksi arvottavia '
          + 'pulmia ei lueta.',
        'Lisäksi tehosteäänet, mietintämusiikki, äänimaisemat ja '
          + 'musiikkinäytteet lehtikaupungeissa.',
      ],
    },
    {
      otsikko: 'Kuvat ja lähteet',
      tila: 'luonnos',
      kohdat: [
        'Kaikki kuvat PD- tai CC-lisenssillä Commonsista, silmin '
          + 'tarkistettuina; tekijä- ja lisenssirivit näkyvissä.',
        'Media jaellaan omasta peilistä (R2); peilaus ajautuu '
          + 'automaattisesti julkaisun yhteydessä.',
        'Faktat tarkistetaan ja lähteet merkitään kysymyksiin ja '
          + 'juttuihin. API-avaimia ei koskaan repoon eikä lokiin.',
      ],
    },
    {
      otsikko: 'Talous ja palkkiot',
      tila: 'luonnos',
      kohdat: [
        'Punnat: laiva ja lento maksavat, oikeat vastaukset, '
          + 'löydöt ja kätköt palkitsevat; apukeinot maksavat '
          + '(vihje, 50:50).',
        'Kokemuspisteet nostavat tasoa ja kysymysten vaikeutta.',
        'Varusteet (mm. linssit ja hevosenkengät) tuovat kykyjä — '
          + 'esim. rosvon ohituksen tai maiden vertailun kartalla.',
      ],
    },
    {
      otsikko: 'Rajaukset ja turvalinjat',
      tila: 'luonnos',
      kohdat: [
        'Ei sotasisältöä: Venäjän, Ukrainan ja Syyrian kohteet '
          + 'kuvataan kulttuurikohteina.',
        'Pyhät kaupungit (Mekka, Medina) vain omistajan '
          + 'erillisellä päätöksellä, kunnioittavasti.',
        'Grimshaw ei ole koskaan vaarallinen; kukaan ei iva '
          + 'paikallisia; kunnioitussäännöt koskevat myös '
          + 'kohtaamisten vartijahahmoja.',
      ],
    },
    {
      otsikko: 'Sanasto',
      tila: 'luonnos',
      kohdat: [
        'unohdettu aarre = Aarnin luettelon manneraarre · laatta '
          + '= kaupungin käännettävä kätkö · tutki kätkö -pelit = '
          + 'kaikki Etsi kätkö -napin tehtävät · kohtaaminen / '
          + 'tarinakaari = kaupungin henkilö ja hänen kysymyksensä '
          + '· valokuvapulma = pulma, jonka vaihtoehdot ovat '
          + 'oikeita valokuvia · mannerlento = aarteen avaama '
          + 'lento seuraavalle mantereelle · lehtikaupunki / '
          + 'maalehti = kaupungin/maan luettava lehti · työhuone '
          + '= tämä sivusto.',
      ],
    },
  ],
};
