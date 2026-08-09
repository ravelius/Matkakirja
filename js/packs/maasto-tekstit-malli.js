// Maastonimien tekstit — MALLI. Kymmenen kohdetta, joita muut matkivat.
//
// ÄLÄ POISTA TÄTÄ TIEDOSTOA. Nimestä huolimatta se ei ole pelkkä
// esimerkki: se on kymmenen kuuluisimman kohteen — Niili, Amazon,
// Volga, Ganges, Jangtse, Baikal, Kaspianmeri, Himalaja, Andit,
// Alpit — AINOA teksti. Niitä ei ole js/packs/maasto-tekstit.js:ssä
// (201 kohdetta), koska koostajan lähde-JSONit jättävät ne tahallaan
// pois juuri siksi, että ne ovat täällä. Mukana on kymmenen
// tarkistettua aikalaislainausta, joihin tools/lainausankkurit.json
// viittaa, ja tools/tarkista-lainaukset.mjs lukee tämän tiedoston.
//
// Poistoa yritettiin 9.8.2026 sillä perusteella, ettei mikään UI-koodi
// importtaa tätä. Se pitää paikkansa — mutta ei importtaa
// maasto-tekstit.js:ääkään: maastotekstejä ei ole vielä kytketty
// i-ikkunaan, joka näyttää yhä nimipaketin `selitys`-kentän.
// Importoimattomuus ei siis kerro tästä tiedostosta mitään.
//
// Ohje kirjoittajalle: docs/arkisto/maastotekstit-ohje.md. Lue se
// ennen kuin lisäät yhtään riviä; tämä tiedosto on sen esimerkkiosa,
// ei sääntö.
//
// --- mitä tämä korvaa ---
//
// Kartan nimen perässä oleva i-ikoni avaa Lue lisää -ikkunan
// (js/ui.js: avaaMaastonimi). Ikkunassa näkyi tähän asti
// nimipaketin `selitys`: yksi tietosanakirjamainen möykky, 200-330
// merkkiä. Tässä tiedostossa sama kohde saa palasista koostuvan
// tekstin — lyhyempiä kappaleita, todellinen aikalaislainaus ja kuva
// tekstin sekaan.
//
// `selitys` jää nimipaketteihin ennalleen. Se on jo koneellisesti
// kopioitu js/packs/maailmankartta-nimet.js:ään, ja se on varateksti,
// jos kohteelle ei ole vielä kirjoitettu tätä. Nimipaketteja EI siis
// tarvitse koskea, eikä tee-maastonimet.mjs:ää ajaa uudelleen.
//
// --- rakenne ---
//
// Avaimet ovat kaksitasoiset: laji ensin, sitten kohteen avain
// nimipaketista sellaisenaan. Kaksitasoisuus ei ole koristetta —
// avain 'ural' on sekä joki (maasto-nimet-vedet.js) että vuoristo
// (maasto-nimet-vuoret.js), ja yksitasoinen taulu menettäisi toisen.
//
//   joet     avain kuten maasto-nimet-vedet.js:n JOET   ('Niili')
//   jarvet   avain kuten saman tiedoston JARVET         ('Baikal')
//   vuoret   avain kuten maasto-nimet-vuoret.js         ('himalaja')
//
// Kohteen arvo on { kappaleet: [...] }. Kappale on yksi kolmesta:
//
//   { teksti }                          leipäteksti
//   { lainaus, kuka, teos, vuosi, ... } aikalaislainaus
//   { tiedosto, selite, lahde }         kuva Wikimedia Commonsista
//
// Kenttä on `tiedosto` eikä `kuva`, ja se on pakko: tools/peilaa-media.mjs
// lukee kaikki js/packs-tiedostot ja poimii nimet juuri kuviolla
// `tiedosto: '...'`. Muunniminen kenttä ei päädy peiliin, ja peli
// hakisi kuvan Commonsilta joka kerta — offline se jäisi hakematta.
//
// `wiki` ei toistu täällä. Se on jo kohteella nimipaketissa, ja kahteen
// paikkaan kirjoitettu otsikko eriytyy ennemmin tai myöhemmin.
//
// --- lainaukset ---
//
// Jokainen lainaus on tarkistettu lähdetekstistä sanasta sanaan
// elokuussa 2026. `linkki` osoittaa siihen laitokseen, josta se on
// luettu, jotta seuraava lukija voi tehdä saman haun. Suomennokset ovat
// omia (`suomennos: 'oma'`); alkukielinen sanamuoto on rivikommentissa
// silloin kun käännösvalinta on tulkinnanvarainen. Mitat ja etäisyydet
// jäävät lainauksissa kirjoittajan omiin yksiköihin — 700 mailia on osa
// sitaattia, ei laskuvirhe.

export const MAASTO_TEKSTIT_MALLI = {
  joet: {

    Niili: {
      kappaleet: [
        {
          teksti: 'Missä Niili alkaa: sitä kysyttiin Euroopassa kaksituhatta '
            + 'vuotta. Ptolemaios merkitsi karttaansa Kuun vuoret, ja siihen '
            + 'tieto pysähtyi. John Hanning Speke näki elokuussa 1858 järven, '
            + 'jolle antoi kuningattarensa nimen, ja palasi neljä vuotta '
            + 'myöhemmin kohtaan, josta vesi lähtee siitä pohjoiseen.',
        },
        {
          lainaus: 'Retkikunta oli täyttänyt tehtävänsä. Näin, että vanha '
            + 'Niili-isä nousee epäilyksettä Victoria-nyanzasta.',
          // "The expedition had now performed its functions. I saw that old
          // father Nile without any doubt rises in the Victoria N'yanza."
          kuka: 'John Hanning Speke',
          teos: 'Journal of the Discovery of the Source of the Nile',
          vuosi: 1863,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/3284',
        },
        {
          tiedosto: 'Jules Leclercq- Aux sources du Nil-1913-chutes Ripon.jpg',
          selite: 'Ripon Falls, jonka Speke nimesi Lontoon maantieteellisen '
            + 'seuran puheenjohtajan mukaan. Kuva on vuodelta 1913. '
            + 'Putouksia ei enää ole: Owen Fallsin pato nosti veden niiden '
            + 'ylle vuonna 1954.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Kotona väitettä ei uskottu. Richard Burton, Speken oma '
            + 'matkatoveri edelliseltä retkeltä, piti sitä todistamattomana, '
            + 'ja miehet oli määrä asettaa vastakkain yleisön edessä Bathissa '
            + 'syyskuussa 1864. Väittelyä edeltävänä päivänä Speke kuoli '
            + 'metsästysretkellä oman aseensa laukaukseen.',
        },
      ],
    },

    Amazon: {
      kappaleet: [
        {
          teksti: 'Henry Walter Bates, sukkatehtaan oppipoika Leicesteristä, '
            + 'saapui Parán satamaan toukokuussa 1848 aikeenaan kerätä '
            + 'hyönteisiä myytäväksi. Hän jäi yhdeksitoista vuodeksi. '
            + 'Kotiin lähetetystä kokoelmasta tunnistettiin 14 712 lajia, '
            + 'joista noin kahdeksaatuhatta ei tunnettu ennestään.',
        },
        {
          tiedosto: 'Rio Negro - Encontro das Águas - Manaus - Amazonas - panoramio.jpg',
          selite: 'Encontro das Águas Manausin kohdalla: musta Rio Negro ja '
            + 'savinen pääuoma kulkevat rinnakkain kymmeniä kilometrejä. '
            + 'Vedet ovat eri lämpöisiä ja eri tiheyksisiä eivätkä sekoitu '
            + 'ennen kuin virtaus pakottaa.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Paulo JC Nogueira',
        },
        {
          lainaus: 'Ylitimme rajan hieman puolenvälin jälkeen, siinä missä '
            + 'kahden joen vedet kohtaavat ja erottuvat terävästi toisistaan. '
            + 'Vastarannalla oli tapahtunut merkillinen muutos: kaikki '
            + 'hyönteisvaivamme olivat kadonneet kuin taikaiskusta.',
          kuka: 'Henry Walter Bates',
          teos: 'The Naturalist on the River Amazons',
          vuosi: 1863,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/2440',
        },
        {
          teksti: 'Bates mittasi rajan siis hyönteisillä. Sama tarkkuus tuotti '
            + 'hänen tunnetuimman havaintonsa: perhoslajit, jotka jäljittelevät '
            + 'myrkyllisen naapurinsa siipikuviota ja saavat siitä suojan. '
            + 'Ilmiö kantaa yhä hänen nimeään.',
        },
      ],
    },

    Volga: {
      kappaleet: [
        {
          teksti: 'Ylävirtaan ei päästy purjeella. Ennen höyrylaivoja '
            + 'lastiproomut hilattiin Volgaa ylös ihmisvoimin: burlakit '
            + 'kulkivat rannalla valjaissa, kymmenen tai yksitoista miestä '
            + 'yhdessä köydessä. Ilja Repin näki heidät nuorena ja maalasi '
            + 'aiheesta kolme vuotta.',
        },
        {
          tiedosto: 'Ilya Repin - Barge Haulers on the Volga - Google Art Project.jpg',
          selite: 'Ilja Repin, Volgan lautturit (1870-1873). Yksitoista '
            + 'miestä, yksi köysi ja hiekkaranta, joka jatkuu kuvan ulkopuolelle '
            + 'molempiin suuntiin. Taustalla näkyy höyrylaiva — ammatti oli '
            + 'katoamassa jo maalauksen valmistuessa.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          lainaus: 'Volgan maisema tuskin palkitsee sitä aikaa, vaivaa ja '
            + 'rahaa, jonka matka vaatii. Laivan kansi on yleensä paljon '
            + 'kiinnostavampi kuin joen rannat.',
          kuka: 'Donald Mackenzie Wallace',
          teos: 'Russia',
          vuosi: 1905,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/1349',
        },
        {
          teksti: 'Kannella istui venäläisiä talonpoikia, tataarilaisia '
            + 'kangaskauppiaita ja suomensukuisten kansojen edustajia samalla '
            + 'matkalla. Syyskuussa, Nižni Novgorodin markkinoiden jälkeen, '
            + 'joukkoon tuli armenialaisia, persialaisia ja bukharalaisia. '
            + 'Wallace tarkoitti huomautuksensa kirjaimellisesti.',
        },
      ],
    },

    Ganges: {
      kappaleet: [
        {
          teksti: 'Rigvedan jokihymni luettelee virrat idästä länteen, '
            + 'Gangesilta Kabuljoelle asti, ja ylistää niistä suurinta. '
            + 'Se ei ole Ganges vaan Sindhu, Indus. Ganges mainitaan '
            + 'luettelossa kerran, ensimmäisenä mutta ohimennen; siinä on '
            + 'joen vanhimpia säilyneitä mainintoja.',
        },
        {
          lainaus: 'Suokaa suosionne tälle ylistykselleni, oi Ganga, Yamuna, '
            + 'oi Sutudri, Parusni ja Sarasvati.',
          kuka: 'Rigveda 10.75.5',
          teos: 'The Hymns of the Rigveda, engl. Ralph T. H. Griffith',
          vuosi: 1896,
          suomennos: 'oma, Griffithin englanninnoksesta',
          linkki: 'https://en.wikisource.org/wiki/The_Hymns_of_the_Rigveda/Book_10/Hymn_75',
        },
        {
          teksti: 'Painopiste siirtyi myöhemmin itään, kun vedalainen '
            + 'kulttuuri levisi Punjabista Gangesin tasangolle. Nyt joen '
            + 'valuma-alueella asuu noin neljäsataa miljoonaa ihmistä — '
            + 'tiheimmin asuttu valuma-alue maailmassa.',
        },
        {
          tiedosto: 'Varanasi ghats seen from a boat on the Ganges river in October 2014.jpg',
          selite: 'Varanasin ghatit: rantaportaita runsaan kuuden kilometrin '
            + 'matkalla. Kaupunki on joen länsipuolella ja portaat kääntyvät '
            + 'itään, joten aamukylpijä katsoo nousevaan aurinkoon. '
            + 'Vastaranta on jätetty rakentamatta.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Rickard Törnblad',
        },
      ],
    },

    Jangtse: {
      kappaleet: [
        {
          teksti: 'Ennen patoja ylävirtaan pääsi vain vetämällä. Kolmen solan '
            + 'koskissa junkit hilattiin bambuköysillä kallioon hakattuja '
            + 'polkuja pitkin, ja Isabella Bird kulki reitin palkatulla '
            + 'asuntoveneellä, jonka miehistöön kuului kuusitoista vetäjää '
            + 'ja soutajaa. Yhden kosken nousuun kului lähes kuusi tuntia.',
        },
        {
          lainaus: 'Kosken jyrinä ja pauhu, sen yli kuuluvat satojen '
            + 'ponnistelevien vetäjien huudot, lakkaamaton rumpujen ja '
            + 'gongien lyönti — osa merkkeinä, osa pahojen henkien '
            + 'karkottamiseksi — tekevät yhdessä pandemoniumin, jota ei '
            + 'koskaan unohda.',
          kuka: 'Isabella Bird',
          teos: 'The Yangtze Valley and Beyond',
          vuosi: 1899,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/77853',
        },
        {
          tiedosto: 'Qutang Gorge on Changjiang.jpg',
          selite: 'Qutangin sola, kolmesta kapein: kapeimmillaan runsaat sata '
            + 'metriä leveä ja kahdeksan kilometriä pitkä. Vetopolkuja on '
            + 'hakattu seinämään, osa vain parin metrin korkeuteen, osa '
            + 'huimaavan korkealle.',
          lahde: 'Wikimedia Commons (CC BY 3.0), Tan Wei Liang Byorn',
        },
        {
          teksti: 'Bird kirjoitti kirjansa vasta kotona, päiväkirjan ja '
            + 'kirjeiden pohjalta, ja se jäi pitkäksi aikaa tarkimmaksi '
            + 'länsimaiseksi kuvaukseksi Ylä-Jangtsesta. Kuvattuja koskia ei '
            + 'enää ole: Kolmen solan padon allas nousi niiden ylle vuonna 2003.',
        },
      ],
    },

  },

  jarvet: {

    Baikal: {
      kappaleet: [
        {
          teksti: 'Anton Tšehov lähti keväällä 1890 Moskovasta Sahalinille '
            + 'laskeakseen rangaistussiirtolan asukkaat. Siperian halki '
            + 'matkattiin kärryillä ja lautoilla, rautatietä ei vielä ollut. '
            + 'Kesäkuun 20. päivänä hän kirjoitti äidilleen laivan kannelta.',
        },
        {
          lainaus: 'Baikalin vesi on turkoosin väristä ja kirkkaampaa kuin '
            + 'Mustanmeren. Syvistä paikoista näkee kuulemma virstan verran '
            + 'pohjaan asti, ja itsekin katsoin sellaiseen syvyyteen, kallioita '
            + 'ja vuoria turkoosissa, että se pani väristämään.',
          kuka: 'Anton Tšehov',
          teos: 'kirje äidilleen, höyrylaiva Jermak',
          vuosi: 1890,
          suomennos: 'oma, Constance Garnettin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/6408',
        },
        {
          tiedosto: 'Black ice of Baikal.jpg',
          selite: 'Talvella jää on paikoin niin kirkasta, että pohja näkyy sen '
            + 'läpi. Kansi kantaa raskaankin kuorman: talvella 1904 Siperian '
            + 'rata jatkettiin väliaikaisesti suoraan jäälle laskettuja '
            + 'kiskoja pitkin.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Sergey Pesterev',
        },
        {
          teksti: 'Vettä Baikalissa on enemmän kuin Amerikan viidessä '
            + 'Suuressa järvessä yhteensä: noin viidennes maailman '
            + 'jäätymättömästä makeasta pintavedestä on tässä yhdessä '
            + 'halkeamassa.',
        },
      ],
    },

    Kaspianmeri: {
      kappaleet: [
        {
          teksti: 'Herodotos tiesi 400-luvulla eaa. jotain, minkä myöhemmät '
            + 'maantieteilijät ehtivät unohtaa.',
        },
        {
          lainaus: 'Kaspianmeri on erillään omanaan, eikä se ole yhteydessä '
            + 'toiseen mereen. Sillä kaikki se meri, jolla hellenit '
            + 'purjehtivat, ja Pylväiden takainen meri, jota Atlantiksi '
            + 'kutsutaan, ja Erythrean meri ovat todellisuudessa yhtä; '
            + 'Kaspia sen sijaan on erillinen ja on omanaan.',
          kuka: 'Herodotos',
          teos: 'Historiateos I.203, engl. G. C. Macaulay 1890',
          // Merkkijono, koska teos on ajoitettu eikä päivätty. Ks. ohje.
          vuosi: 'n. 430 eaa.',
          suomennos: 'oma, Macaulayn englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/2707',
        },
        {
          teksti: 'Sata vuotta myöhemmin käsitys kääntyi päinvastaiseksi. '
            + 'Seleukoksen palveluksessa purjehtinut Patrokles ilmoitti '
            + 'löytäneensä yhteyden pohjoiseen valtamereen, ja Kaspiaa '
            + 'pidettiin sen jälkeen pitkään sen lahtena. Herodotos oli ollut '
            + 'oikeassa, ja se selvisi vasta venäläisten mittausten myötä.',
        },
        {
          tiedosto: 'Caspian Sea from orbit.jpg',
          selite: 'Pohjoinen kolmannes on lautasen matala, paikoin alle viisi '
            + 'metriä, ja Volgan suisto työntyy siihen ylhäältä. Etelässä '
            + 'syvyys ylittää tuhat metriä. Umpinaisessa altaassa pinnan '
            + 'korkeus on tulon ja haihtumisen erotus.',
          lahde: 'Wikimedia Commons (PD), NASA / MODIS',
        },
      ],
    },

  },

  vuoret: {

    himalaja: {
      kappaleet: [
        {
          teksti: 'Joseph Dalton Hooker tuli Sikkimiin 1848 keräämään kasveja '
            + 'ja huomasi tekevänsä muutakin: hän kirjasi, missä korkeudessa '
            + 'mikin laji lakkaa. Rinne näyttää pystysuunnassa muutamassa '
            + 'päivämatkassa saman, minkä matka päiväntasaajalta navalle '
            + 'näyttää vaakasuunnassa.',
        },
        {
          lainaus: 'Kanchenjunga oli lähes suoraan pohjoisessa, häikäisevä '
            + 'lumihuippujen ryhmä, jota halkoivat siniset jäätiköt; ne '
            + 'kimalsivat nousevan auringon viistoissa säteissä kuin '
            + 'akvamariinit huurretussa hopeassa.',
          kuka: 'Joseph Dalton Hooker',
          teos: 'Himalayan Journals',
          vuosi: 1854,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/6476',
        },
        {
          tiedosto: 'Edward Lear - Kangchenjunga from Darjeeling - Google Art Project.jpg',
          selite: 'Edward Lear, Kanchenjunga Darjeelingista (1879). Sama '
            + 'näkymä, jonka Hooker kuvasi kolmekymmentä vuotta aiemmin: '
            + 'harjulta huipulle on matkaa runsaat seitsemänkymmentä '
            + 'kilometriä.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Retki päättyi vankeuteen. Hooker ja hänen toverinsa '
            + 'Archibald Campbell pidätettiin marraskuussa 1849 lähellä '
            + 'Tiibetin rajaa ja pidettiin kuukauden. Britannia vastasi '
            + 'liittämällä osan Sikkimiä itseensä, ja siihen jäi raja, joka '
            + 'kulkee kartalla yhä.',
        },
      ],
    },

    andit: {
      kappaleet: [
        {
          teksti: 'Vuonna 1835 Charles Darwin ylitti Andit kahdesti; paluu '
            + 'kulki Uspallatan solan kautta. Runsaan kahden kilometrin '
            + 'korkeudessa, paljaalla '
            + 'rinteellä, seisoi tusinan verran lumivalkoisia pylväitä. '
            + 'Ne olivat kivettyneitä puunrunkoja, ja tyveen oli tallentunut '
            + 'kaarnan kuvio.',
        },
        {
          lainaus: 'Näin paikan, jossa joukko komeita puita kerran huojutti '
            + 'oksiaan Atlantin rannalla — silloin kun tuo valtameri, nyt '
            + 'seitsemänsadan mailin päähän työntyneenä, ulottui Andien '
            + 'juurelle.',
          kuka: 'Charles Darwin',
          teos: 'The Voyage of the Beagle',
          vuosi: 1845,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/944',
        },
        {
          tiedosto: 'Sketch - section map of the cumbre or Uspallata pass Wellcome L0051083.jpg',
          selite: 'Darwinin oma leikkauspiirros Uspallatan solasta. Kerrokset '
            + 'lukemalla syntyi järjestys: metsä, meri, laava, nousu.',
          lahde: 'Wellcome Collection via Wikimedia Commons (CC BY 4.0)',
        },
        {
          teksti: 'Puut olivat kasvaneet merenpinnan tasolla, vajonneet '
            + 'pohjaan, hautautuneet vedenalaisen laavan alle ja nousseet '
            + 'takaisin. Andit eivät siis olleet Darwinille vain korkeat: '
            + 'ne olivat todiste siitä, ettei maapallo mahdu lyhyeen '
            + 'aikatauluun.',
        },
      ],
    },

    alpit: {
      kappaleet: [
        {
          teksti: 'Matterhorn oli 1860-luvulla Alppien viimeinen suuri '
            + 'nousematon huippu, ja Edward Whymper yritti sitä kahdeksan '
            + 'kertaa. Yhdeksäs yritys, 14. heinäkuuta 1865, onnistui. '
            + 'Laskeutuessa alimman parin köysi katkesi, ja neljä '
            + 'seitsemästä putosi jäätikölle.',
        },
        {
          tiedosto: 'Matterhorn as seen from Zermatt, Wallis, Switzerland, 2012 August.jpg',
          selite: 'Matterhorn Zermattista. Whymperin reitti nousee '
            + 'oikeanpuoleista taivaanrantaviivaa, Hörnlin harjannetta. '
            + 'Putoaminen alkoi huipun alapuolelta, ja miehet vierivät '
            + 'pohjoisseinää jäätikölle asti.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Ximonic / Simo Räsänen',
        },
        {
          teksti: 'Onnettomuus teki vuorikiipeilystä uutisen ja Zermattista '
            + 'kaupungin. Lontoossa kysyttiin julkisesti, onko koko harraste '
            + 'puolustettavissa; Whymperiä epäiltiin köyden katkaisemisesta, '
            + 'ja sveitsiläinen tutkinta vapautti hänet.',
        },
        {
          tiedosto: 'Matterhorn disaster Dore.jpg',
          selite: 'Gustave Dorén näkemys onnettomuudesta, 1865. Kukaan '
            + 'kuvittajista ei ollut paikalla; kuva syntyi lehtitietojen '
            + 'varassa ja kiersi Euroopan viikoissa.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Kolme päivää myöhemmin Jean-Antoine Carrelin köysikunta '
            + 'nousi samalle huipulle italialaiselta puolelta, ja kilpailu oli '
            + 'ohi. Whymper kirjoitti kirjansa kuusi vuotta myöhemmin ja '
            + 'päätti sen näin.',
        },
        {
          lainaus: 'Kiivetkää jos tahdotte, mutta muistakaa, että rohkeus ja '
            + 'voima eivät ole mitään ilman harkintaa, ja että hetken '
            + 'huolimattomuus voi tuhota elämän onnen. Älkää tehkö mitään '
            + 'kiireessä, katsokaa tarkkaan joka askel, ja ajatelkaa alusta '
            + 'asti, mikä voi olla loppu.',
          kuka: 'Edward Whymper',
          teos: 'Scrambles Amongst the Alps in the Years 1860-69',
          vuosi: 1871,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/41234',
        },
      ],
    },

  },
};
