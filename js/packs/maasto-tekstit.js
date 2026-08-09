// Maastonimien tekstit: joet, järvet ja vuoristot.
//
// Rakenne on sama kuin js/packs/maasto-tekstit-malli.js:ssä, joka on
// tämän esikuva.
//
// MALLI EI OLE PELKKÄ RAKENNE-ESIMERKKI. Se sisältää AINEISTONA
// kymmenen kuuluisimman kohteen tekstit — Niili, Amazon, Volga,
// Ganges, Jangtse, Baikal, Kaspianmeri, Himalaja, Andit ja Alpit,
// mukana kymmenen tarkistettua aikalaislainausta. Niitä ei ole tässä
// tiedostossa: koostajan lähde-JSONit jättävät ne tahallaan pois,
// koska ne ovat mallissa. Mallia EI siis saa poistaa
// "käyttämättömänä" — sen mukana katoaisi kymmenen kohdetta. Poistoa
// yritettiin 9.8.2026 sillä perusteella, ettei mikään UI-koodi
// importtaa sitä; se pitää paikkansa, mutta ei importtaa tätäkään
// tiedostoa. Maastotekstejä ei ole vielä kytketty i-ikkunaan.
//
// Ohje on docs/arkisto/maastotekstit-ohje.md. Avaimet ovat
// kaksitasoiset — laji ensin, sitten kohteen avain nimipaketista
// sellaisenaan — koska 'Ural' on sekä joki että vuoristo.
//
// 201 kohdetta, 130 aikalaislainausta, 209 kuvaa.
//
// Jokainen lainaus on etsitty lähdetekstistään ja luettu sanasta
// sanaan. Ankkurit ovat tools/lainausankkurit.json:ssa ja tarkistuksen
// voi ajaa uudelleen:
//
//   NODE_USE_ENV_PROXY=1 node tools/tarkista-lainaukset.mjs
//
// Tuotettu komennolla tools/kokoa-maastotekstit.mjs kirjoittajien
// tools/maastotekstit-*.json-tiedostoista. Älä muokkaa käsin — korjaa
// lähde tai koostajan KORJAUKSET-taulu ja aja uudelleen.
export const MAASTO_TEKSTIT = {
  joet: {

    Aldan: {
      kappaleet: [
        {
          teksti: 'George Kennan rakensi 1860-luvulla lennätinlinjaa, jonka piti '
            + 'yhdistää Amerikka Eurooppaan Beringinsalmen kautta. Atlantin '
            + 'kaapeli valmistui ensin ja hanke haudattiin. Kennan palasi '
            + 'Ohotskin rannikolta sisämaahan poroilla ja suksilla ja '
            + 'lähestyi marraskuussa Aldanin laaksoa.',
        },
        {
          lainaus: 'Alhaalla edessämme, laakson takaisten kukkuloiden mustaa '
            + 'vasten, nousi neljä tai viisi hohtavan sumun pylvästä kuin '
            + 'tulipatsaat exoduksen erämaassa.',
          kuka: 'George Kennan',
          teos: 'Tent Life in Siberia, uudistettu laitos',
          vuosi: 1910,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/12328',
        },
        {
          teksti: 'Pylväät olivat savua jakuuttien tulisijoista, ja ne seisoivat '
            + 'pystyssä, koska ilma oli täysin liikkumaton. Aldan on '
            + 'Jakutiassa yhä ennemmin tie kuin este: laivakelpoista uomaa on '
            + 'runsaat 1 700 kilometriä, eikä sen rinnalla kulje maantietä.',
        },
        {
          tiedosto: 'Aldan River (near Dvortsy section, Siberia, Russia) 2 (21485056591).jpg',
          selite: 'Aldan Dvortsyn kohdalla. Ranta on ikiroudan päällä olevaa '
            + 'hiekkaa, joka sortuu kevättulvassa metreittäin kerrallaan; '
            + 'uoma siirtyy siksi vuodesta toiseen.',
          lahde: 'Wikimedia Commons (CC BY 2.0), James St. John',
        },
      ],
    },

    Allegheny: {
      kappaleet: [
        {
          teksti: 'Kun Edwin Drake porasi öljyä Titusvillessä 1859, kukaan ei '
            + 'ollut miettinyt, miten se saataisiin pois. Rautatietä ei '
            + 'ollut, ja Oil Creek oli liian matala. Ratkaisu oli tehdä tulva '
            + 'itse: myllypadot avattiin sovittuna päivänä, ja tynnyrilautat '
            + 'lähtivät aallon mukana.',
        },
        {
          tiedosto: 'Pioneer, Pa., 186-. Oil barge in Oil Creek in foregrd. LCCN2002718639.jpg',
          selite: 'Öljylautta Oil Creekillä 1860-luvulla. Puron varsi oli '
            + 'tiheimmillään yhtenäistä porantornia; kuva on Pioneerista, '
            + 'kaupungista, jota ei enää ole.',
          lahde: 'Wikimedia Commons (PD), Library of Congress',
        },
        {
          lainaus: 'Harvinainen oli se tulva, jonka jäljiltä puron varrella ei '
            + 'ollut hylkyjä; usein niitä oli rannalla kymmenittäin '
            + 'päällekkäin, toivoton sekasotku rikkoutuneita veneitä ja '
            + 'tynnyreitä, kaikki öljyn läpimärkänä ja kaasun ja kiroilun '
            + 'hajuisena.',
          kuka: 'Ida M. Tarbell',
          teos: 'The History of the Standard Oil Company',
          vuosi: 1904,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/60692',
        },
        {
          teksti: 'Alleghenyllä liikennettä oli tuhat venettä ja neljätuhatta '
            + 'miestä. Tarbell kasvoi tässä laaksossa ja kirjoitti myöhemmin '
            + 'sen kirjan, joka johti Standard Oilin pilkkomiseen. Hänen '
            + 'isänsä oli yksi niistä, jotka jäivät alle.',
        },
      ],
    },

    'Amu Darya': {
      kappaleet: [
        {
          teksti: 'Unkarilainen kielimies Ármin Vámbéry kulki 1863 Keski-Aasian '
            + 'halki dervissiksi pukeutuneena. Paljastuminen olisi merkinnyt '
            + 'kuolemaa. Karavaani tuli Oxukselle keväällä, kun vesi oli '
            + 'korkeimmillaan, eikä rantoja erottanut yhtä aikaa toisistaan.',
        },
        {
          lainaus: 'Turkestanin asukkaat ovat sitä mieltä, ettei maan päällä ole '
            + 'jokea, joka vetäisi tälle vertoja, ei edes Niili, Mubarek, '
            + 'siunattu. — Ja minun on myönnettävä, etten ole tavannut jokea '
            + 'tai lähdettä, joka antaisi yhtä kallista vettä.',
          kuka: 'Ármin Vámbéry',
          teos: 'Travels in Central Asia',
          vuosi: 1864,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/41751',
        },
        {
          tiedosto: 'Battle on the River Oxus (right).jpg',
          selite: 'Behzadille luettu kuvitus taistelusta Oxuksen rannalla, '
            + '1400-luvun lopulta. Joki oli persialaisessa runoudessa Iranin '
            + 'ja Turanin raja kauan ennen kuin se oli sitä millään kartalla.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Vettä ei enää riitä Araljärveen. Neuvostoliitto rakensi '
            + '1960-luvulta alkaen kastelukanavat puuvillalle, ja järvi '
            + 'kutistui niin, että se hajosi erillisiksi altaiksi. Amudarjan '
            + 'vesi loppuu useimpina vuosina ennen vanhaa suistoa.',
        },
        {
          tiedosto: 'Amu darya delta.jpg',
          selite: 'Vanha suisto ylhäältä. Vaaleat alueet ovat kuivunutta '
            + 'järvenpohjaa, ja niiden suolapöly kulkeutuu tuulessa juuri '
            + 'niille pelloille, joita varten vesi otettiin.',
          lahde: 'Wikimedia Commons (PD), NASA',
        },
      ],
    },

    Amur: {
      kappaleet: [
        {
          teksti: 'Tšehov nousi kesäkuussa 1890 höyrylaivaan Sretenskissä ja '
            + 'purjehti Amuria alas toista viikkoa. Vasemmalla oli Venäjä, '
            + 'oikealla Kiina. Sama laiva kuljetti vankeja Sahalinille, jonne '
            + 'hän oli itsekin matkalla laskemaan siirtolan asukkaat.',
        },
        {
          lainaus: 'Amurilla halvin rangaistusvanki hengittää vapaammin kuin '
            + 'Venäjän korkein kenraali.',
          kuka: 'Anton Tšehov',
          teos: 'kirje A. S. Suvorinille, Blagoveštšensk',
          vuosi: 1890,
          suomennos: 'oma, Constance Garnettin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/6408',
        },
        {
          tiedosto: 'Riverfront on the Amur River, Khabarovsk, Russia (14599202559).jpg',
          selite: 'Habarovka perustettiin 1858 sotilasasemaksi Ussurin ja Amurin '
            + 'yhtymäkohtaan, kaksi vuotta ennen kuin raja vahvistettiin '
            + 'Pekingin sopimuksessa. Nyt siinä on puolen miljoonan asukkaan '
            + 'kaupunki.',
          lahde: 'Wikimedia Commons (CC BY 2.0), amanderson2',
        },
        {
          teksti: 'Amur on suurista joista harvinainen: sen pääuomassa ei ole '
            + 'yhtään patoa. Sivujoet on padottu, mutta itse joki virtaa '
            + 'vapaana Šilkan latvoilta Tatarinsalmeen, koska raja kulkee sen '
            + 'keskellä ja pato nostaisi veden molemmin puolin.',
        },
      ],
    },

    Angara: {
      kappaleet: [
        {
          teksti: 'Baikaliin laskee runsaat kolmesataa jokea ja siitä lähtee '
            + 'yksi. Angara alkaa lähes kilometrin levyisenä aukkona järven '
            + 'lounaispäästä. Kohta ei jäädy talvella umpeen, koska vesi '
            + 'tulee syvältä eikä ehdi jäähtyä ennen kuin se on jo virrassa.',
        },
        {
          tiedosto: 'RU Irkutsk Taltsy Angara River.jpg',
          selite: 'Angara Taltsyn kohdalla Irkutskin ja Baikalin välissä. '
            + 'Pakkasessa joki höyryää: vesi on lähtiessään järvestä muutaman '
            + 'asteen lämpöistä, ilma neljäkymmentä astetta kylmempää.',
          lahde: 'Wikimedia Commons (CC BY 4.0), Alexander Klink',
        },
        {
          teksti: 'Irkutsk rakennettiin rannalle 1661 turkiskaupan takia. '
            + 'Kaupungin ohi kulki teekaravaanien tie Kiinaan, ja 1826 sinne '
            + 'alettiin karkottaa dekabristeja: upseereita, jotka olivat '
            + 'yrittäneet kaataa tsaarin.',
        },
        {
          teksti: 'Neljä patoa rakennettiin 1950-luvulta alkaen. Bratskin allas '
            + 'peitti alleen kymmeniä kyliä ja siirsi kymmeniätuhansia '
            + 'ihmisiä. Metsää ei ehditty hakata pois ennen täyttöä, ja '
            + 'upponutta puuta on nostettu altaasta vuosikymmeniä.',
        },
      ],
    },

    Araguaia: {
      kappaleet: [
        {
          teksti: 'Araguaia halkeaa keskijuoksullaan kahtia ja yhtyy taas '
            + 'kolmensadan kilometrin päässä. Väliin jää Bananal, maailman '
            + 'suurin jokisaari: kahdenkymmenen tuhannen neliökilometrin '
            + 'lauta, joka on puolet vuodesta osittain veden alla.',
        },
        {
          tiedosto: 'Rio Javaés.jpg',
          selite: 'Javaés on se Araguaian haara, joka tekee Bananalista saaren. '
            + 'Tulva-aikaan haarojen välinen maa muuttuu järviksi ja '
            + 'kanaviksi, ja kuivalla kaudella samat paikat ovat '
            + 'hiekkarantoja.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Saarella asuvat karaját, joiden kylät seuraavat veden '
            + 'korkeutta: kuivalla kaudella rannalle, tulvan tullen ylemmäs. '
            + 'Karajá-naisten polttamat ritxoko-saviukot esittävät kyläelämän '
            + 'kohtauksia, ja niiden valmistus siirtyy äidiltä tyttärelle.',
        },
        {
          teksti: 'Joen itäpuolelle vedettiin 1960-luvulla '
            + 'Belém–Brasília-maantie, ja karjatilat seurasivat sitä. '
            + 'Bananalista tehtiin 1959 kansallispuisto, mutta puiston rajat '
            + 'ja karajáiden maat menivät päällekkäin, ja kiista niistä on '
            + 'yhä auki.',
        },
      ],
    },

    Argun: {
      kappaleet: [
        {
          teksti: 'Nertšinskin sopimus vuonna 1689 oli ensimmäinen, jonka Kiina '
            + 'teki eurooppalaisen vallan kanssa vertaisenaan. '
            + 'Neuvottelukieleksi otettiin latina, koska yhteistä kieltä ei '
            + 'muuten ollut: välissä istuivat jesuiitat Tomás Pereira ja '
            + 'Jean-François Gerbillon.',
        },
        {
          teksti: 'Venäläiset purkivat Albazinin linnoituksen Amurilla ja '
            + 'luopuivat koko yläjuoksusta. Vastineeksi he saivat oikeuden '
            + 'lähettää karavaaneja Pekingiin. Raja vedettiin Argunia myöten, '
            + 'ja se on siinä yhä.',
        },
        {
          tiedosto: 'Argun River near Inner Mogolia.jpg',
          selite: 'Argun Sisä-Mongolian puolelta. Uoma on valtakunnanraja, mutta '
            + 'uoma myös liikkuu: tulvat siirtävät sitä, ja saarten '
            + 'omistuksesta kiisteltiin 1990-luvulle asti.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Jack No1',
        },
        {
          teksti: 'Amur palasi Venäjälle 1858, joten Nertšinskin viivasta on '
            + 'jäljellä vain tämä pätkä. Kolmesataa kilometriä ylempänä joki '
            + 'vaihtaa nimensä Hailariksi ja katoaa Kiinan puolelle.',
        },
      ],
    },

    Arkansas: {
      kappaleet: [
        {
          teksti: 'Arkansas oli lähes kolmekymmentä vuotta kansainvälinen raja. '
            + 'Vuoden 1819 sopimus veti Yhdysvaltain ja Espanjan rajan joen '
            + 'uomaa pitkin sadannelta pituuspiiriltä ylävirtaan, ja Santa '
            + 'Fen kauppatie ylitti sen kahlaamolla, jonka jälkeen oltiin '
            + 'ulkomailla.',
        },
        {
          tiedosto: 'Grand Canyon of the Arkansas, Royal Gorge, by Jackson, William Henry, 1843-1942.jpg',
          selite: 'William Henry Jacksonin valokuva Kuninkaan kurusta. Arkansas '
            + 'laskee Kalliovuorilta niin jyrkästi, että seinämät nousevat '
            + 'kolmesataa metriä. Kapeimpaan kohtaan rautatie ripustettiin '
            + 'sillalla joen ylle 1879.',
          lahde: 'Wikimedia Commons (PD), William Henry Jackson',
        },
        {
          lainaus: 'Meitä häiritsi öisin vain silloin tällöin susien ulvonta. '
            + 'Lauma oli asettunut jonkinlaiseksi kunniavartioksi ja seurasi '
            + 'kintereillämme useita satoja maileja, itse asiassa aina '
            + 'asutuksen rajalle asti.',
          kuka: 'Josiah Gregg',
          teos: 'Commerce of the Prairies, luettuna Reuben Gold Thwaitesin laitoksesta 1905',
          vuosi: 1844,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/44205',
        },
        {
          teksti: 'Sudet seurasivat karavaania, koska karavaani jätti jälkeensä '
            + 'biisoninraatoja. Gregg kulki reitin yhdeksän kertaa ja '
            + 'kirjoitti siitä oppaan, jota luettiin kolme sukupolvea. Puoli '
            + 'vuosisataa myöhemmin ei ollut enää biisoneita eikä '
            + 'karavaaneja.',
        },
      ],
    },

    Athabasca: {
      kappaleet: [
        {
          teksti: 'Alexander Mackenzie piti kahdeksan vuotta majaansa Fort '
            + 'Chipewyanissa, ja hänen kirjansa alkuosa kuvaa reitin sinne '
            + 'joki joelta. Elk Riverin eli nykyisen Athabascan kohdalla hän '
            + 'merkitsi muistiin jotain, mikä ei ollut hänelle kauppatavaraa '
            + 'vaan korjausainetta.',
        },
        {
          lainaus: 'Noin kahdenkymmenenneljän mailin päässä haarasta on '
            + 'maakivilähteitä, joihin voi työntää kaksikymmentä jalkaa '
            + 'pitkän seipään ilman pienintäkään vastusta. Bitumi on '
            + 'juoksevaa, ja kuusenpihkaan sekoitettuna sillä tiivistetään '
            + 'kanootteja.',
          kuka: 'Alexander Mackenzie',
          teos: 'Voyages from Montreal Through the Continent of North America',
          vuosi: 1801,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/35658',
        },
        {
          teksti: 'Sitä oli rannoilla niin paljon, että Mackenzie mainitsi asian '
            + 'ohimennen kahdessa virkkeessä. Sata seitsemänkymmentä vuotta '
            + 'myöhemmin samalta jokiosuudelta avattiin ensimmäinen '
            + 'avolouhos, ja tuohonkanootin saumausaine muuttui '
            + 'kansantaloudeksi.',
        },
        {
          tiedosto: 'NASA EO Athabasca tar sands environmental impact 1984 vs 2011.jpg',
          selite: 'Nasan satelliittikuvat samalta jokiosuudelta vuosilta 1984 ja '
            + '2011. Öljyhiekkaa on noin 140 000 neliökilometrin alalla, '
            + 'mutta vain murto-osa on niin lähellä pintaa, että se kannattaa '
            + 'kuoria. Se murto-osa näkyy kuvassa.',
          lahde: 'Wikimedia Commons (PD), NASA Earth Observatory',
        },
      ],
    },

    Benue: {
      kappaleet: [
        {
          teksti: 'Lontoossa uskottiin pitkään, että Tšadjärveen laskeva Shari ja '
            + 'Nigeriin laskeva Benue olisivat sama vesi ja että Afrikan '
            + 'halki pääsisi veneellä. Heinrich Barth saapui Benuen rannalle '
            + 'Yolan kohdalla kesäkuussa 1851 ja mittasi sen leveyden.',
        },
        {
          lainaus: 'Voin nyt vakuuttaa mitä suurimmalla varmuudella, ettei noiden '
            + 'kahden joen välillä ole minkäänlaista yhteyttä: Chaddan, joka '
            + 'on sama kuin Bénuwé, ja Sháryn, joka on Tšad-järven '
            + 'pääsivujoki.',
          kuka: 'Heinrich Barth',
          teos: 'Travels and Discoveries in North and Central Africa, osa 2',
          vuosi: 1857,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/76317',
        },
        {
          teksti: 'Tieto pantiin heti käyttöön. William Balfour Baikie nousi 1854 '
            + 'höyryaluksella Benueta ylös ja annatti miehistölleen kiniiniä '
            + 'joka päivä ennakolta. Retkikunta palasi ilman yhtään '
            + 'kuollutta, ja Länsi-Afrikan sisämaa avautui eurooppalaisille.',
        },
        {
          tiedosto: 'River Benue (in Makurdi).jpg',
          selite: 'Benue Makurdin kohdalla. Sadekautena joki nousee useita '
            + 'metrejä ja proomut pääsevät Yolaan asti; kuivana aikana '
            + 'samasta paikasta kävellään hiekkasärkille.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Ashinze',
        },
      ],
    },

    Brahmaputra: {
      kappaleet: [
        {
          teksti: 'Tiibetin läpi virtaa lännestä itään Yarlung Tsangpo. Assamin '
            + 'tasangolla virtaa lännelle Brahmaputra. Ovatko ne sama joki? '
            + 'Kysymys oli 1800-luvun brittiläisen maantieteen sitkeimpiä, '
            + 'koska väliin jää Himalajan itäpää, jonne ei päästy. Joseph '
            + 'Hooker kysyi asiaa Sikkimissä 1849.',
        },
        {
          lainaus: 'Kysymyksemme koskivat luonnollisesti Tiibetiä ja sen '
            + 'maantiedettä, ennen muuta sen suurta piirrettä, Yarou Tsampoo '
            + '-jokea. Tämä oli hän vakuutti Assamin Burrampooter, eikä '
            + 'kukaan siellä päin sitä epäillyt.',
          kuka: 'Joseph Dalton Hooker',
          teos: 'Himalayan Journals',
          vuosi: 1854,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/6478',
        },
        {
          teksti: 'Kartografit halusivat silti todisteen. Sen hankki 1880-luvulla '
            + 'intialainen mittaaja Kinthup, joka lähetettiin Tsangpolle '
            + 'heittämään uomaan merkittyjä puupölkkyjä. Hän joutui matkalla '
            + 'myydyksi orjaksi ja pääsi vapaaksi vasta neljän vuoden '
            + 'kuluttua. Pölkyt hän heitti silti.',
        },
        {
          tiedosto: 'Brahmaputra river in Majuli Island.jpg',
          selite: 'Majuli Assamissa, maailman suurimpia jokisaaria. Se on '
            + 'kutistunut runsaassa sadassa vuodessa alle puoleen: tulva vie '
            + 'rantaa joka kesä, eikä menetetty pinta-ala palaudu.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Paramasha',
        },
      ],
    },

    Chari: {
      kappaleet: [
        {
          teksti: 'Tšadjärvi ei ole altaassa vaan lautasella. Heinrich Barth tuli '
            + 'sen rannalle 1851 ja kyseli kalastajilta, missä avovesi alkaa; '
            + 'vastaus selittää enemmän järven myöhemmästä kohtalosta kuin '
            + 'mikään mittaus.',
        },
        {
          lainaus: 'Ymmärsin poikkeuksetta kaikilta, joiden kanssa tästä '
            + 'merkillisestä järvestä puhuin, että avovesi hiekkakumpuisine '
            + 'saarineen ulottuu Sháryn suulta läntiselle rannalle ja että '
            + 'kaikki muu järvestä on soista niittymaata, joka toisinaan on '
            + 'veden alla.',
          kuka: 'Heinrich Barth',
          teos: 'Travels and Discoveries in North and Central Africa, osa 2',
          vuosi: 1857,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/76317',
        },
        {
          tiedosto: 'Waving fisherman on Lake Chad (detilt).jpg',
          selite: 'Kalastaja tervehtii veneestään Tšadjärvellä kaislikon '
            + 'laidassa. Järvi on täynnä matalia salmia ja ruokosaaria — '
            + 'juuri sitä avoveden ja niittymaan vaihtelua, josta Barthille '
            + 'kerrottiin.',
          lahde: 'Cooltho, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          teksti: 'Chari tuo järveen yhdeksän kymmenesosaa sen vedestä. Kun joen '
            + 'yläjuoksulta otetaan kastelua ja sade vähenee Sahelissa, järvi '
            + 'ei kutistu vähitellen vaan hyppäyksittäin: matalasta '
            + 'lautasesta katoaa kerralla suuri ala.',
        },
      ],
    },

    Colorado: {
      kappaleet: [
        {
          teksti: 'John Wesley Powell menetti oikean käsivartensa Shilohissa 1862 '
            + 'ja lähti seitsemän vuotta myöhemmin neljällä veneellä alas '
            + 'jokea, jota ei ollut kartoitettu. Elokuun 13. päivänä 1869 '
            + 'retkikunta oli kanjonin pohjalla ja muonaa oli kuukaudeksi.',
        },
        {
          tiedosto: 'Grand Canyon, Colorado River, Ariz. - Hillers. LCCN00649751.jpg',
          selite: 'John K. Hillers kuvasi kanjonin Powellin toisella retkellä '
            + '1870-luvulla. Märkälevytekniikka vaati, että lasilevy '
            + 'valmistettiin ja kehitettiin heti kuvauksen yhteydessä, joten '
            + 'pimiö kulki veneessä.',
          lahde: 'Wikimedia Commons (PD), James Fennemore / John K. Hillers',
        },
        {
          lainaus: 'Olemme kolme neljännesmailia maan syvyyksissä, ja suuri joki '
            + 'kutistuu mitättömäksi lyödessään vihaisia aaltojaan seinämiin. '
            + '— Edessä on tuntematon matka, tutkimaton joki. Emme tiedä, '
            + 'mitä putouksia tulee, emme mitä kallioita väylässä on.',
          kuka: 'John Wesley Powell',
          teos: 'Powellin päiväkirja 1869, Horace Kephartin toimittamassa laitoksessa First through the Grand Canyon (1915)',
          vuosi: 1869,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/74466',
        },
        {
          teksti: 'Kolme miestä jätti retkikunnan kolme päivää ennen loppua ja '
            + 'lähti kiipeämään ulos kanjonista. Heitä ei nähty enää. Loput '
            + 'seitsemän tulivat ulos elokuun lopussa, ja Powell sai '
            + 'kongressilta rahat toiseen retkeen.',
        },
      ],
    },

    Columbia: {
      kappaleet: [
        {
          teksti: 'Columbian suulla on hiekkasärkkä, jossa joen virta ja '
            + 'Tyynenmeren maininki kohtaavat. John Jacob Astorin laiva '
            + 'Tonquin saapui sinne maaliskuussa 1811, ja kapteeni lähetti '
            + 'perämies Foxin luotaamaan väylää valaanpyyntiveneellä.',
        },
        {
          tiedosto: 'Fishermen at Celilo Falls on the Columbia River (3229038197).jpg',
          selite: 'Kalastuslavat Celilon putouksella. Lohta on nostettu tästä '
            + 'kohdasta haavilla tuhansia vuosia. The Dallesin pato sulki '
            + 'porttinsa maaliskuussa 1957, ja putous oli veden alla saman '
            + 'päivän aikana.',
          lahde: 'Wikimedia Commons (No restrictions), OSU Special Collections & Archives',
        },
        {
          lainaus: 'Minut lähetetään ilman merimiehiä veneeseeni myrskyisellä '
            + 'säällä luoteisrannikon vaarallisimpaan kohtaan. Setäni hukkui '
            + 'muutama vuosi sitten samalle särkälle, ja nyt minä menen '
            + 'panemaan luuni hänen viereensä.',
          kuka: 'perämies Fox, Washington Irvingin kirjaamana',
          teos: 'Astoria; or, Anecdotes of an Enterprise Beyond the Rocky Mountains',
          vuosi: 1836,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/1371',
        },
        {
          teksti: 'Fox ja hänen miehensä hukkuivat, ja sama käynti vei toisenkin '
            + 'veneen. Särkkä on nielaissut runsaat kaksituhatta alusta, ja '
            + 'luotsit nousevat laivoihin yhä avomerellä. Joessa on nyt '
            + 'neljätoista patoa, ja lohi nousee kalaportaita.',
        },
      ],
    },

    Daugava: {
      kappaleet: [
        {
          teksti: 'Väinäjoki oli varhaiskeskiajalla reitti Itämereltä itään. '
            + 'Laivat nostettiin latvoilla maalle ja vedettiin Dneprin '
            + 'vesille, ja joen suulla käytiin kauppaa vahalla, hampulla ja '
            + 'turkiksilla. Riikaan tuli hansakaupunki.',
        },
        {
          teksti: 'Yläjuoksulla oli koskia ja rantakallioita, joiden päälle '
            + 'rakennettiin linnoja. Koknesen piispanlinna nousi 1200-luvulla '
            + 'jyrkänteelle, jonka ohi tavara kulki, ja siitä tuli '
            + 'tullipaikka.',
        },
        {
          tiedosto: 'View near Koknese in 1833.png',
          selite: 'August Matthias Hagen maalasi Koknesen näkymän 1833. Rauniot '
            + 'seisovat kalliolla joen yllä. Pļaviņasin voimalaitos nosti '
            + 'veden 1966, ja rauniot ovat nyt matalalla saarella aivan '
            + 'vedenrajassa.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), August Matthias Hagen',
        },
        {
          teksti: 'Pato hukutti kalliot ja koskijakson, joita latvialaisissa '
            + 'lauluissa oli laulettu. 1980-luvun lopulla suunniteltiin vielä '
            + 'yhtä patoa Daugavpilsiin. Sitä vastustettiin julkisesti ensi '
            + 'kertaa Neuvostoliitossa, ja se jäi rakentamatta.',
        },
      ],
    },

    Dnepr: {
      kappaleet: [
        {
          teksti: 'Herodotos luetteli skyyttien joet ja pysähtyi neljännen '
            + 'kohdalle pidemmäksi aikaa kuin muiden. Borysthenes oli hänen '
            + 'mukaansa hyödyllisin kaikista maailman joista Niiliä lukuun '
            + 'ottamatta, ja perustelu oli käytännöllinen.',
        },
        {
          lainaus: 'Se antaa kauneimmat ja rehevimmät laitumet karjalle, ja kaloja '
            + 'parempia ja lukuisampia kuin mikään muu joki; sen vesi on '
            + 'juotavaksi makeinta ja virtaa kirkkaana, vaikka muut sen '
            + 'vieressä ovat sameita.',
          kuka: 'Herodotos',
          teos: 'Historiateos IV.53, engl. G. C. Macaulay 1890',
          vuosi: 'n. 430 eaa.',
          suomennos: 'oma, Macaulayn englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/2707',
        },
        {
          tiedosto: 'DneproGES 1947.JPG',
          selite: 'Dneprin kosket olivat purjehduksen este Kiovan ja meren '
            + 'välillä tuhat vuotta. Vuoden 1932 pato nosti veden niiden '
            + 'ylle. Kuva on vuodelta 1947: pato oli räjäytetty sodassa '
            + 'kahdesti ja rakennettu kolmannen kerran.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Viikinkiajan reitti Konstantinopoliin kulki koskien ohi, ja '
            + 'veneet kannettiin maitse ohitusten yli. Keisari Konstantinos '
            + 'VII kirjasi 900-luvulla koskien nimet sekä slaaviksi että '
            + 'pohjoismaisittain; se on vanhin säilynyt luettelo niistä.',
        },
      ],
    },

    Dnestr: {
      kappaleet: [
        {
          teksti: 'Herodotos luetteli 400-luvulla eaa. skyytien joet mereen '
            + 'laskevassa järjestyksessä. Tyras, nykyinen Dnestr, oli niistä '
            + 'toinen, ja sen suulla asui kreikkalainen siirtokunta, jonka '
            + 'väkeä kutsuttiin tyriittalaisiksi. Yhden asian hän kertoo '
            + 'siitä erikseen.',
        },
        {
          lainaus: 'Tässä maassa ei ole mitään ihmeellistä paitsi että sen joet '
            + 'ovat suuremmat ja lukuisammat kuin missään muualla. Yksi asia '
            + 'on kuitenkin mainittava: Tyras-joen rannalla näytetään '
            + 'kalliossa Herakleen jalanjälkeä, joka on kuin ihmisen jalan '
            + 'jälki mutta kaksi kyynärää pitkä.',
          kuka: 'Herodotos',
          teos: 'Historiateos IV.82, engl. G. C. Macaulay',
          vuosi: 'n. 430 eaa.',
          suomennos: 'oma, Macaulayn englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/2707',
        },
        {
          tiedosto: 'Zalishchyky DniesterCanyon.jpg',
          selite: 'Dnestrin kanjoni Zalištšykyn kohdalla. Joki on urautunut '
            + 'satojen metrien syvyyteen kalkkikiveen ja kiertää kaupungin '
            + 'lähes umpeen; kannaksen leveys on muutama sata metriä.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Mykola Swarnyk',
        },
        {
          teksti: 'Raja on pysynyt joella kaksituhatta vuotta. Se erotti Rooman '
            + 'Dakian ja arojen kansat, myöhemmin Puolan ja Osmanien '
            + 'valtakunnan, sitten Romanian ja Neuvostoliiton. Nykyään Dnestr '
            + 'kulkee Moldovan halki niin, että itäranta on '
            + 'hallitsemattomalla alueella.',
        },
      ],
    },

    Don: {
      kappaleet: [
        {
          teksti: 'Don virtaa hitaasti. Putousta on koko matkalla vajaat '
            + 'kaksisataa metriä, joten vesi liikkuu kävelyvauhtia ja seisoo '
            + 'jäässä neljä kuukautta vuodesta. Purjehduskausi on lyhyt ja '
            + 'väylä matala.',
        },
        {
          tiedosto: 'William Heath - Russian Cossacks at a Boathouse on the Banks of the Don - B1975.4.1542 - Yale Center for British Art.jpg',
          selite: 'William Heath piirsi donkasakoita venevajan luona pian '
            + 'Napoleonin sotien jälkeen, kun kasakat olivat Länsi-Euroopassa '
            + 'uutuus. Piirtäjä ei ollut käynyt Donilla; kuva on tehty '
            + 'kuvausten pohjalta.',
          lahde: 'Wikimedia Commons (CC0), William Heath',
        },
        {
          teksti: 'Kasakat olivat alkujaan karkureita. Venäjän ja Puolan maaorjat '
            + 'pakenivat aroille, jonne kruunun valta ei ulottunut, ja '
            + 'järjestäytyivät yhteisöksi, joka valitsi johtajansa. Moskova '
            + 'osti heidät palvelukseensa viljalla, ruudilla ja lopulta '
            + 'maalla.',
        },
        {
          teksti: 'Volgan ja Donin väliä on kuusikymmentä kilometriä. Kanavaa '
            + 'yritettiin kaivaa 1569 ja uudestaan Pietari I:n aikana, mutta '
            + 'se valmistui vasta 1952 vankityönä. Sitä myöten Kaspianmereltä '
            + 'pääsee Mustallemerelle.',
        },
      ],
    },

    Ebro: {
      kappaleet: [
        {
          teksti: 'Ebro on Iberian niemimaan runsasvetisin joki ja antoi sille '
            + 'nimen. Kreikkalaiset kutsuivat rannikon asukkaita joen mukaan '
            + 'ibereiksi, ja nimi levisi vähitellen koko niemimaahan.',
        },
        {
          teksti: 'Rooma ja Karthago sopivat 226 eaa. rajasta Ebrolla. Kun '
            + 'Hannibal valtasi Saguntumin sen eteläpuolelta, sopimus oli '
            + 'tulkinnanvarainen ja sota alkoi; se kesti seitsemäntoista '
            + 'vuotta ja vei Karthagolta Espanjan.',
        },
        {
          tiedosto: 'Río Ebro en su desembocadura en el Delta del Ebre.jpg',
          selite: 'Suisto työntyy Välimereen parikymmentä kilometriä. Se on '
            + 'kutistumassa: yläjuoksun padot pidättävät liejun, eikä uutta '
            + 'maata synny yhtä nopeasti kuin meri vie vanhaa.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), jorgegdphoto.com',
        },
        {
          teksti: 'Suistossa kasvaa riisi, ja vesi jaetaan kanavilla. Ebron '
            + 'vedestä on riidelty koko maan mitassa: vuoden 2001 suunnitelma '
            + 'olisi siirtänyt osan siitä etelään rannikkokaupungeille, ja se '
            + 'peruttiin kolme vuotta myöhemmin.',
        },
      ],
    },

    Elbe: {
      kappaleet: [
        {
          teksti: 'Kuivina kesinä Elben pohjasta nousee kiviä, joihin on hakattu '
            + 'vuosilukuja. Ne merkitsevät edellisiä kuivuuksia, ja niiden '
            + 'lukeminen oli varoitus: matala vesi tarkoitti seisovia '
            + 'myllyjä, pysähtynyttä laivaliikennettä ja kallista viljaa.',
        },
        {
          tiedosto: 'Hungerstein in Decin (21).JPG',
          selite: 'Nälkäkivi Děčínissä. Vanhin selvästi luettava vuosiluku on '
            + '1616, ja uudempia on lisätty myöhempinä kuivina kesinä. Kivi '
            + 'näkyy vain silloin, kun pinta laskee tavallista alemmas.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Bernd Gross',
        },
        {
          teksti: 'Elbe kantoi Böömin lasin ja Saksin viljan Hampuriin, ja tulli '
            + 'kannettiin jokaisen linnan kohdalla. 1800-luvun sopimukset '
            + 'poistivat tullit, ja joesta tuli yhtenäinen väylä ensi kertaa.',
        },
        {
          teksti: 'Vuoden 1945 jälkeen se katkesi uudestaan. Torgaussa '
            + 'amerikkalaiset ja neuvostojoukot kohtasivat huhtikuussa 1945 '
            + 'räjäytetyn sillan luona, ja jokivartta pitkin kulki sen '
            + 'jälkeen neljäkymmentä vuotta vartioitu raja.',
        },
      ],
    },

    Eufrat: {
      kappaleet: [
        {
          teksti: 'Babylonin tavarat tulivat jokea alas eivätkä koskaan ylös. '
            + 'Virta on liian nopea soutaa vastaan, joten armenialaiset '
            + 'rakensivat kertakäyttöisiä veneitä: pajukehikko, nahka päälle, '
            + 'oljet pohjalle ja kaikki pyöreää kuin kilpi. Herodotos kuvasi '
            + 'ne 400-luvulla eaa.',
        },
        {
          lainaus: 'Perille päästyään ja lastin myytyään he huutokauppaavat veneen '
            + 'kaaret ja oljet, mutta pakkaavat nahat aasien selkään ja '
            + 'ajavat ne takaisin Armeniaan; sillä virran nopeuden takia '
            + 'jokea ei voi millään keinolla purjehtia ylös.',
          kuka: 'Herodotos',
          teos: 'Historiateos I.194, engl. G. C. Macaulay 1890',
          vuosi: 'n. 430 eaa.',
          suomennos: 'oma, Macaulayn englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/2707',
        },
        {
          tiedosto: 'Guffa on the Tigris, Baghdad, 1932.jpg',
          selite: 'Sama vene 2 400 vuotta myöhemmin. Kuva on Bagdadista Tigriksen '
            + 'rannalta vuonna 1932, jolloin pyöreä quffa oli yhä käytössä. '
            + 'Viimeiset katosivat 1900-luvun puolivälissä.',
          lahde: 'Wikimedia Commons (PD), American Colony (Jerusalem)',
        },
        {
          teksti: 'Uoma on liikkunut. Herodotos kertoo kuningatar Nitokriksen '
            + 'kaivauttaneen joen mutkalle niin, että alusten oli kuljettava '
            + 'saman kylän ohi kolmena päivänä peräkkäin. Sittemmin se on '
            + 'siirtynyt itsestään: Ur ja Uruk olivat satamakaupunkeja, ja '
            + 'nyt joki on kymmenien kilometrien päässä niistä.',
        },
      ],
    },

    Fraser: {
      kappaleet: [
        {
          teksti: 'Milton ja Cheadle tulivat Kalliovuorten yli Fraserin laaksoon '
            + 'syksyllä 1863 nääntyneinä ja huomasivat katsovansa maisemaa, '
            + 'jota kumpikaan ei osannut selittää. Joen molemmin puolin nousi '
            + 'rinteitä pitkin täysin vaakasuoria hyllyjä, aina samalla '
            + 'korkeudella kummallakin rannalla.',
        },
        {
          lainaus: 'Jonakin aikana Thompsonin ja Fraserin laaksot olivat '
            + 'peräkkäisten järvien vallassa, ja ylin penkkarivi osoittaa '
            + 'tason, johon vesi nousi. Vain matalampien vuorten laet '
            + 'näkyivät silloin pyöreinä saarina pinnan yllä.',
          kuka: 'William Fitzwilliam Milton ja Walter B. Cheadle',
          teos: 'The North-West Passage by Land',
          vuosi: 1865,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/69759',
        },
        {
          tiedosto: 'Fraser joins Thompson River at Lytton.JPG',
          selite: 'Thompson yhtyy Fraseriin Lyttonissa. Vedet ovat eri värisiä ja '
            + 'kulkevat rinnakkain jonkin matkaa. Rannoilla näkyvät penkat, '
            + 'joita Milton ja Cheadle yrittivät selittää.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), The Interior',
        },
        {
          teksti: 'Arvaus osui lähelle. Jäätiköt padotsivat laaksot toistuvasti '
            + 'järviksi, ja kun pato murtui, vesi laski uudelle tasolle ja '
            + 'jätti rannan näkyviin. Samoista kerrostumista huuhdottiin 1858 '
            + 'kultaa niin, että Britannia perusti kiireessä Brittiläisen '
            + 'Kolumbian siirtokunnan.',
        },
      ],
    },

    Godavari: {
      kappaleet: [
        {
          teksti: 'Ramayanan kolmas kirja sijoittaa Raman, Sitan ja Lakšmanan '
            + 'viimeiset metsävuodet Pancavatiin, lehtoon Godavarin rannalla. '
            + 'Siellä Ravana ryöstää Sitan. Ennen kuin vaunu nousee, Sita '
            + 'jättää jäähyväiset paikoille, joissa on asunut, ja pyytää '
            + 'niitä viemään sanan.',
        },
        {
          lainaus: 'Jää hyvästi, pitkät hyvästit sinulle, oi suloinen Godavari, '
            + 'jonka väreileviä aaltoja liikuttavat lakkaamatta iloiset '
            + 'vesilinnut. Kertokaa te kaikki Raman korviin jättiläisen teko '
            + 'ja Sitan kohtalo.',
          kuka: 'Valmiki',
          teos: 'The Rámáyan of Válmíki, engl. Ralph T. H. Griffith',
          vuosi: '1870-1874',
          suomennos: 'oma, Griffithin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/24869',
        },
        {
          tiedosto: 'Kumbha mela on ghats of the river godavari nashik.jpg',
          selite: 'Kumbh Mela Nashikin ghateilla. Juhla kiertää neljää kaupunkia '
            + 'ja osuu Godavarille kahdentoista vuoden välein; Nashikin osuus '
            + 'on Pancavatin perinnön varassa.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Prashant Kharote',
        },
        {
          teksti: 'Alajuoksulla joki tekee toista työtä. Arthur Cotton rakensi '
            + '1852 suistoon sulkupadon, joka jakoi veden kastelukanaviin. '
            + 'Nälänhädät alueella loppuivat, ja Godavarin suisto on siitä '
            + 'lähtien ollut Intian tiheimmin viljeltyjä seutuja.',
        },
      ],
    },

    Huanghe: {
      kappaleet: [
        {
          teksti: 'Väri tulee lännestä. Joki leikkaa lössiylängön läpi, ja lössi '
            + 'on tuulen kasaamaa hienoa pölyä, joka irtoaa veteen '
            + 'kosketuksesta. Kuutiometrissä vettä on täällä kymmeniä kiloja '
            + 'kiintoainetta, enemmän kuin missään toisessa suuressa joessa.',
        },
        {
          tiedosto: 'Loess landscape china.jpg',
          selite: 'Lössikerros on ylängöllä paikoin sadan metrin paksuinen. Se on '
            + 'pehmeää ja pystysuunnassa lujaa: jokainen sadekuuro vie osan '
            + 'siitä uomaan, ja pellon reunaan syntyy jyrkkä seinämä yhdessä '
            + 'kesässä.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Till Niermann',
        },
        {
          teksti: 'Alajuoksulla virta hidastuu ja liete laskeutuu pohjaan. Uoma '
            + 'nousee, penkereitä korotetaan, ja lopulta joki virtaa oman '
            + 'tasankonsa yläpuolella. Kun penger pettää, joki ei tulvi vaan '
            + 'vaihtaa uomaa. Laskukohta on kolmentuhannen vuoden aikana '
            + 'siirtynyt satoja kilometrejä pohjoisen ja etelän välillä.',
        },
        {
          tiedosto: 'Hukou Waterfall.jpg',
          selite: 'Hukoun putous Shaanxin ja Shanxin rajalla. Yläpuolella joki on '
            + 'parisataa metriä leveä, kurkussa parikymmentä. Vesi on paksua '
            + 'kuin liete, eikä putouksen alla ole kirkasta allasta vaan '
            + 'keltainen pyörre.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Leruswing',
        },
      ],
    },

    Indigirka: {
      kappaleet: [
        {
          teksti: 'Ferdinand Wrangell kysyi 1820-luvulla Kolyman rannoilla, kuka '
            + 'on rakentanut ne asumusten jäänteet, joita on rannikolla '
            + 'lännempänä. Vastaus oli omokit: kansa, joka lähti isorokon ja '
            + 'venäläisten edetessä pohjoiseen poroineen eikä palannut.',
        },
        {
          lainaus: 'Indigirkan suun lähellä on nyt jälkiä lukuisista jurtista, '
            + 'vaikka vanhimmilla asukkailla ei ole tietoa siitä, että sillä '
            + 'seudulla olisi koskaan ollut asutusta. Paikkaa kutsutaan yhä '
            + 'nimellä Omokskoje Jurtovištše.',
          kuka: 'Ferdinand von Wrangell',
          teos: 'Narrative of an Expedition to the Polar Sea in the Years 1820, 1821, 1822 and 1823',
          vuosi: 1843,
          suomennos: 'oma, englanninnoksesta',
          linkki: 'https://archive.org/details/narrativeofexped00wran_0',
        },
        {
          teksti: 'Nimi on kartalla, kansaa ei ole. Alajuoksulla puhutaan sen '
            + 'sijaan venäjää, jota Moskovassa ei tahdo ymmärtää: Russkoje '
            + 'Ustjen kylän murre on 1600-luvun pomorien kieltä, joka jäi '
            + 'tänne kiinni ja säilyi, koska tie takaisin ei kannattanut.',
        },
        {
          tiedosto: 'Oymyakon - 190228 DSC 5477.jpg',
          selite: 'Ojmjakon Indigirkan yläjuoksulla. Kylässä mitattiin '
            + 'helmikuussa 1933 lämpötila −67,7 astetta, kylmin koskaan '
            + 'pysyvästi asutussa paikassa mitattu lukema. Talvella joki '
            + 'jäätyy paikoin pohjaa myöten.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Ilja Varlamov',
        },
      ],
    },

    Indus: {
      kappaleet: [
        {
          teksti: 'Vuonna 1831 Itä-Intian komppania lähetti Alexander Burnesin '
            + 'viemään Lahoreen lahjaksi viisi vetohevosta ja vaunut. Lahja '
            + 'oli tekosyy. Reitti kulki Industa ylös, ja Burnesin todellinen '
            + 'tehtävä oli mitata joki ja katsoa, kulkisiko siinä sotalaiva.',
        },
        {
          lainaus: 'Näimme Induksen viidentoista mailin päästä. Sen saattoi '
            + 'seurata alempien kukkuloiden aukosta Attokin linnoitukselle '
            + 'asti siitä usvasta, joka riippui sen yllä kuin savu.',
          kuka: 'Alexander Burnes',
          teos: 'Travels into Bokhara',
          vuosi: 1834,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/58074',
        },
        {
          tiedosto: 'Indus River near Skardu City.jpg',
          selite: 'Indus Skardun kohdalla Baltistanissa. Joki tulee Tiibetistä '
            + 'luoteeseen, kiertää Nanga Parbatin ja kääntyy vasta sitten '
            + 'etelään; liete on jäätiköiden jauhamaa kiveä.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Asadijazraja',
        },
        {
          teksti: 'Mittaukset kelpasivat myöhemmin muuhunkin. Britannia liitti '
            + 'Sindhin 1843 ja Punjabin 1849. Vesi jaettiin 1960 Intian ja '
            + 'Pakistanin kesken Indus-sopimuksella: itäiset sivujoet '
            + 'Intialle, läntiset ja pääuoma Pakistanille.',
        },
      ],
    },

    Irrawaddy: {
      kappaleet: [
        {
          teksti: 'Burman pääkaupungit vaihtoivat paikkaa jokea pitkin. Bagan '
            + 'hylättiin 1200-luvulla, Ava jäi maanjäristyksessä 1839 '
            + 'raunioiksi, Amarapura ja Mandalay rakennettiin ja jätettiin '
            + 'vuorotellen. Kaikki mahtuvat sadan kilometrin matkalle '
            + 'Iravadin varteen.',
        },
        {
          tiedosto: 'IRRAWADDY RIVER SUNRISE BAGAN MYANMA FEB 2013 (8521128304).jpg',
          selite: 'Iravadi Baganin kohdalla. Joki on tässä matala ja leveä ja '
            + 'siirtää särkkiensä paikkaa joka tulvassa, joten väylää ei voi '
            + 'merkitä pysyvästi ja laivat kulkevat luotsin varassa.',
          lahde: 'Wikimedia Commons (CC BY-SA 2.0), calflier001',
        },
        {
          teksti: 'Henry Yulen retkikunta nousi jokea 1855. Sagaingin kohdalla, '
            + 'missä harju työntyy rantaan, uoma kapenee kahdeksaansataan '
            + 'jaardiin ja levenee heti sen jälkeen särkiksi ja saariksi. '
            + 'Juuri siihen kapeikkoon rakennettiin rautatiesilta 1934.',
        },
        {
          teksti: 'Irrawaddy Flotilla Company oli 1920-luvulla maailman suurin '
            + 'sisävesivarustamo, yli kuusisataa alusta. Vuonna 1942 yhtiö '
            + 'upotti oman laivastonsa Mandalayn edustalle, jottei se jäisi '
            + 'etenevälle Japanin armeijalle.',
        },
      ],
    },

    Irtysh: {
      kappaleet: [
        {
          teksti: 'Anton Tšehov ajoi keväällä 1890 halki Siperian kohti Sahalinin '
            + 'rangaistussiirtolaa. Toukokuun 7. päivänä takana oli 715 '
            + 'virstaa, tulva oli vienyt sillat ja lautturi kieltäytyi tuulen '
            + 'takia. Hän jäi yöksi mökkiin Irtyšin rannalle ja kirjoitti '
            + 'kirjeen.',
        },
        {
          lainaus: 'Vesi oli sameaa. Valkoiset aallot löivät saveen, mutta itse '
            + 'Irtyš ei kohissut eikä pauhannut, vaan päästi omituisen äänen, '
            + 'kuin joku olisi naulannut arkkua veden alla.',
          kuka: 'Anton Tšehov',
          teos: 'kirje Marja Kiseljovalle, Irtyšin ranta',
          vuosi: 1890,
          suomennos: 'oma, Constance Garnettin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/6408',
        },
        {
          tiedosto: 'Irtish v Omsk.JPG',
          selite: 'Irtyš Omskissa. Kaupunki oli Länsi-Siperian hallintokeskus ja '
            + 'karkotettujen kauttakulkupaikka; Dostojevski istui täällä '
            + 'neljä vuotta pakkotyössä 1850-luvulla.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Petar Milošević',
        },
        {
          teksti: 'Irtyš on pidempi kuin Ob, johon se laskee. Se alkaa Kiinan '
            + 'Altailta, ja Kazakstanissa siitä otetaan vettä kanavaan, joka '
            + 'vie sen Karagandan kaivoksille runsaan neljänsadan kilometrin '
            + 'päähän aroa.',
        },
      ],
    },

    Jenisei: {
      kappaleet: [
        {
          teksti: 'Siperian suurten jokien itäranta on jyrkkä ja länsiranta '
            + 'matala, ja ero jatkuu satojen kilometrien matkan. Fridtjof '
            + 'Nansen nousi Jeniseitä syksyllä 1913 ja mietti syytä koko '
            + 'matkan.',
        },
        {
          lainaus: 'Jokaisen Jeniseitä ylös kulkevan täytyy hämmästyä sitä '
            + 'huomattavaa eroa, joka on joen itä- ja länsipuolen välillä. '
            + 'Idässä tasainen maa on verrattain korkealla ja päättyy '
            + 'äkkijyrkkään penkkaan; lännessä maa on silmiinpistävän matala.',
          kuka: 'Fridtjof Nansen',
          teos: 'Gjennem Sibirien, engl. Arthur G. Chater',
          vuosi: 1914,
          suomennos: 'oma, Chaterin englanninnoksesta',
          linkki: 'https://archive.org/details/throughsiberiala00nansuoft',
        },
        {
          tiedosto: 'Yenisei River in Krasnoyarsk.jpg',
          selite: 'Krasnojarsk on kohdassa, jossa joki on juuri murtautunut '
            + 'Sajanien läpi tasangolle. Oikea ranta nousee jyrkkänä, vasen '
            + 'loivenee hiekaksi: juuri se ero, jota Nansen katseli.',
          lahde: 'Wikimedia Commons (CC BY 4.0), MBH',
        },
        {
          teksti: 'Nansen arveli uoman siirtyvän hitaasti itään. Nykyinen selitys '
            + 'on maapallon pyöriminen: pohjoisella pallonpuoliskolla '
            + 'virtaava vesi painuu oikeaan reunaansa ja syö sitä. Sääntö '
            + 'tunnetaan Baerin lakina, ja se näkyy parhaiten juuri pitkillä '
            + 'pohjoiseen virtaavilla joilla.',
        },
      ],
    },

    Kagera: {
      kappaleet: [
        {
          teksti: 'Kun Speke oli osoittanut Niilin lähtevän Victorianjärvestä, '
            + 'jäljelle jäi kysymys, mikä järven täyttää. Henry Morton '
            + 'Stanley kiersi järven 1875 ja kirjasi vastauksia. Yhden niistä '
            + 'antoi nuori ganda, Sambuzi-päällikön paaši.',
        },
        {
          lainaus: 'Näethän Kageran: se on leveä ja syvä ja nopea, ja vaikka vesi '
            + 'on tummaa, se on kirkasta. Mistä se voi tulla? Siinä joessa on '
            + 'suunnaton määrä vettä. Se on Jinjan joen äiti, sillä ilman '
            + 'sitä meidän Nyanzamme kuivuisi.',
          kuka: 'nimeltä mainitsematon ugandalainen nuorukainen',
          teos: 'Henry M. Stanley, Through the Dark Continent, osa 1 (1878, luettu 1899 laitoksesta)',
          vuosi: 1899,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/75926',
        },
        {
          tiedosto: 'KageraRuvubu.jpg',
          selite: 'Kagera ja sen sivujoki Ruvubu. Niilin kaukaisimmaksi latvaksi '
            + 'lasketaan nykyään Ruvubun haara Burundissa, joten mitattu '
            + 'pituus riippuu siitä, mitä haaraa seurataan.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), SteveRwanda',
        },
        {
          teksti: 'Poika päätteli oikein. Kagera on Victorianjärven suurin '
            + 'tulojoki, ja Niilin pituus lasketaan nykyisin sen latvoilta. '
            + 'Joki on nyt raja: Ruanda, Tansania ja Uganda kohtaavat sen '
            + 'uomassa.',
        },
      ],
    },

    Kama: {
      kappaleet: [
        {
          teksti: 'Kama tuo Uralin länsirinteen vedet Volgaan Kazanin '
            + 'yläpuolella. Yhtymäkohdassa Kama on runsasvetisempi kuin Volga '
            + 'ja sen uoma vanhempi. Jos jokia nimettäisiin virtaaman mukaan, '
            + 'alempi virta olisi Kama Kaspianmereen asti; nimi on sopimus, '
            + 'ei mittaustulos.',
        },
        {
          tiedosto: 'Ust-Borovaya IvanSaltPan 7327.JPG',
          selite: 'Suolapannu Ust-Borovajan keittämössä Solikamskissa. Maasta '
            + 'pumpattu suolavesi haihdutettiin puisissa altaissa puuta '
            + 'polttaen; yksi keitos kesti vuorokauden ja vaati '
            + 'kuutiometreittäin halkoja.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Ludvig14',
        },
        {
          teksti: 'Solikamsk tarkoittaa Kaman suolaa. Säkkejä kantaneiden miesten '
            + 'korvat olivat aina valkoiset kiteistä, ja siitä jäi '
            + 'permiläisille pilkkanimi solonyje uši, suolakorvat.',
        },
        {
          teksti: 'Samaa jokea kuljettiin myös toiseen suuntaan. Suolakeittämöt '
            + 'omistaneet Stroganovit varustivat 1580-luvulla kasakkajoukon, '
            + 'joka nousi Kaman sivujokea Tšusovajaa ja ylitti Uralin. Siitä '
            + 'alkoi se, mitä Venäjällä sanotaan Siperian valloitukseksi.',
        },
      ],
    },

    Kasai: {
      kappaleet: [
        {
          teksti: 'William Sheppard, virginialaisen parturin poika ja eteläisen '
            + 'presbyteerikirkon ensimmäinen musta lähetti Afrikassa, saapui '
            + 'Kasain suulle keväällä 1890. Höyrylaiva Florida yritti kääntyä '
            + 'Kongosta sivujokeen kohdassa, jossa uoma kapenee runsaaseen '
            + 'sataan metriin kallioiden väliin.',
        },
        {
          lainaus: 'Näimme Kasain punaisen veden syöksyvän Kongoon kuin myllyränni '
            + '— suulla joki on vain noin sataviisikymmentä jaardia leveä, ja '
            + 'molemmin puolin on suuri kalliomuuri.',
          kuka: 'William Henry Sheppard',
          teos: 'Presbyterian Pioneers in Congo',
          vuosi: 1917,
          suomennos: 'oma',
          linkki: 'https://archive.org/details/presbyterianpion00shep',
        },
        {
          tiedosto: 'Car ferry crossing the Kasai River in Bandundu Region.jpg',
          selite: 'Lautta Kasailla Bandundussa. Joki on alajuoksullaan yli '
            + 'kilometrin levyinen ja kantaa raskaita proomuja, mutta suun '
            + 'kalliokuja pysyi pitkään esteenä isommille aluksille.',
          lahde: 'Wikimedia Commons (PD), Library of Congress',
        },
        {
          teksti: 'Viisi tuntia täydellä höyryllä vei laivan puoli mailia '
            + 'eteenpäin. Ohjausketju katkesi, ja Sheppard ohjasi peräsintä '
            + 'käsin rautakangesta perän yli kumartuen. Ylävirrassa hän pääsi '
            + 'kuubien kuninkaan luo Mushengeen ensimmäisenä ulkomaalaisena '
            + 'ja opetteli kielen ennen kuin pyysi lupaa.',
        },
      ],
    },

    Khatanga: {
      kappaleet: [
        {
          teksti: 'Pietari Suuren käskystä lähetetty Suuri pohjoinen '
            + 'tutkimusretki jaettiin osiin, joista kukin sai palan rannikkoa '
            + 'mitattavakseen. Hariton Laptevin osuus oli Lenalta Jeniseille. '
            + 'Hän ei päässyt perille, ja talvi 1739 pysäytti hänet tähän '
            + 'jokeen.',
        },
        {
          lainaus: 'Talvi vietettiin siellä asuvan tunguusiheimon parissa; heillä '
            + 'ei ollut poroja ja he olivat siksi paikallaan pysyviä. '
            + 'Vetoeläiminä he käyttivät koiria.',
          kuka: 'A. E. Nordenskiöld',
          teos: 'The Voyage of the Vega round Asia and Europe, engl. Alexander Leslie',
          vuosi: 1882,
          suomennos: 'oma, Leslien englanninnoksesta',
          linkki: 'https://archive.org/details/voyageofvegaroun01nord',
        },
        {
          tiedosto: 'Port in Khatanga.jpg',
          selite: 'Hatangan satama. Meritie on auki elokuusta syyskuuhun, ja koko '
            + 'vuoden tarvikkeet tuodaan sinä aikana; muulloin yhteys on '
            + 'lentokone.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), ShavPS',
        },
        {
          teksti: 'Laptevin retkikunta kartoitti lopulta rannikon maitse koirilla '
            + 'ja poroilla, ja Semjon Tšeljuskin saavutti 1742 Aasian '
            + 'pohjoisimman niemen. Kartta valmistui, mutta reittiä ei '
            + 'purjehtinut kukaan vielä yli sataan vuoteen.',
        },
      ],
    },

    Kolyma: {
      kappaleet: [
        {
          teksti: 'Kolyma virtaa ikiroudan läpi. Maa on jäässä satojen metrien '
            + 'syvyydeltä, joten vesi ei imeydy minnekään: kesäsade jää '
            + 'pinnalle ja valuu jokeen suoraan. Kesäkuussa jäänlähtö alkaa '
            + 'etelästä, ja pohjoisempi jää patoaa sulavedet tasangolle.',
        },
        {
          tiedosto: 'Srednekolymsk 01.jpg',
          selite: 'Srednekolymsk perustettiin kasakkojen talvehtimispaikaksi '
            + '1643. Se on yhä yksi harvoista asutuista paikoista '
            + 'alajuoksulla, ja sinne pääsee jokea pitkin tai talvitietä, '
            + 'joka kulkee jäätyneen uoman päällä.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), kkv1970',
        },
        {
          teksti: 'Rannoista sulaa esiin luuta. Ikiroudassa on mammutin, '
            + 'villakarvaisen sarvikuonon ja aroleijonan jäänteitä, ja '
            + 'Kolyman alajuoksu on niiden tunnetuimpia löytöpaikkoja. '
            + 'Sortuva penger paljastaa niitä joka kesä lisää.',
        },
        {
          teksti: 'Nimi jäi tarkoittamaan muuta kuin jokea. Kolymalle '
            + 'perustettiin 1932 kultakenttien hallinto Dalstroi, jonka '
            + 'työvoima tuli vankileireiltä, ja alueen halki kulkeva tie '
            + 'rakennettiin samoilla käsillä. Sitä sanotaan luiden tieksi.',
        },
      ],
    },

    Kongo: {
      kappaleet: [
        {
          teksti: 'Meri tunsi Kongon suun vuodesta 1482, jolloin Diogo Cão '
            + 'pystytti rantaan kivipylvään. Sisämaahan ei päästy. Runsaan '
            + 'sadan kilometrin päässä alkavat kosket, joita on '
            + 'kolmisenkymmentä peräkkäin ja jotka laskevat joen '
            + 'ylätasangolta merenpintaan. Neljäsataa vuotta karttaa '
            + 'piirrettiin vain rannikolle.',
        },
        {
          tiedosto: 'Stanley Founding of Congo Free State 157 Scene from the Covelet near our Station at Stanley Falls The Seventh CAtaract in the distance.jpg',
          selite: 'Stanleyn kirjan kuva seitsemännestä koskesta. Paikka on '
            + 'nykyinen Kisangani, ja sieltä Williams kirjoitti kirjeensä '
            + 'heinäkuussa 1890. Koskia on tässä seitsemän peräkkäin noin '
            + 'sadan kilometrin matkalla.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Henry Morton Stanley laskeutui joen 1877 ja palasi pian '
            + 'Leopold II:n palvelukseen rakentamaan siitä valtiota. Kongon '
            + 'vapaavaltio oli kuninkaan yksityisomaisuutta. Amerikkalainen '
            + 'historioitsija George Washington Williams kävi siellä 1890 ja '
            + 'kirjoitti kuninkaalle avoimen kirjeen.',
        },
        {
          lainaus: 'Teidän majesteettinne hallitus on takavarikoinut heidän '
            + 'maansa, polttanut heidän kylänsä, varastanut heidän '
            + 'omaisuutensa, orjuuttanut heidän naisensa ja lapsensa ja '
            + 'tehnyt muita rikoksia, joita on liikaa lueteltaviksi.',
          kuka: 'George Washington Williams',
          teos: 'An Open Letter to His Serene Majesty Leopold II',
          vuosi: 1890,
          suomennos: 'oma',
          linkki: 'https://en.wikisource.org/wiki/An_Open_Letter_to_His_Serene_Majesty_Leopold_II,_King_of_the_Belgians_and_Sovereign_of_the_Independent_State_of_Congo_By_Colonel,_The_Honorable_Geo._W._Williams,_of_the_United_States_of_America',
        },
      ],
    },

    Krishna: {
      kappaleet: [
        {
          teksti: 'Krishnan lähde on 64 kilometrin päässä Arabianmerestä, mutta '
            + 'joki kääntyy Länsi-Ghateilla itään ja kulkee koko niemimaan '
            + 'poikki. Matkan puolivälissä, Golcondan sulttaanikunnan '
            + 'alueella, sen uomasta löytyi 1600-luvulla jotain muuta kuin '
            + 'vettä.',
        },
        {
          lainaus: 'Ensimmäisellä kerralla kun olin tässä kaivoksessa, siellä '
            + 'työskenteli lähes kuusikymmentätuhatta ihmistä, miehiä, naisia '
            + 'ja lapsia: miehet kaivoivat, naiset ja lapset kantoivat maata.',
          kuka: 'Jean-Baptiste Tavernier',
          teos: 'Les Six Voyages, engl. Valentine Ball',
          vuosi: 1889,
          suomennos: 'oma, Ballin englanninnoksesta',
          linkki: 'https://archive.org/details/travelsinindia00tave',
        },
        {
          tiedosto: 'Golconda Fort 001.jpg',
          selite: 'Golcondan linnoitus Hyderabadin laidalla. Timantteja ei '
            + 'louhittu täällä vaan Krishnan varrella, mutta ne hiottiin ja '
            + 'myytiin linnoituksessa, ja siksi koko esiintymä tunnetaan '
            + 'Golcondan nimellä.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Bernard Gagnon',
        },
        {
          teksti: 'Kollurin kaivosta Krishnan rannalla pidetään Koh-i-Noorin ja '
            + 'Hopen timantin löytöpaikkana. Suonet tyhjenivät 1700-luvun '
            + 'kuluessa, ja Brasilian löydöt veivät markkinat. Joen samat '
            + 'kerrostumat ovat nyt sokeriruokopeltoa, ja vesi on jaettu '
            + 'tarkoin kolmen osavaltion kesken.',
        },
      ],
    },

    'La Grande': {
      kappaleet: [
        {
          teksti: 'Vuonna 1971 Québec ilmoitti rakentavansa Jamesinlahden '
            + 'takamaille maanosan suurimman vesivoimalaitoksen. Creet ja '
            + 'inuitit, joiden pyyntimaita alue oli, veivät asian oikeuteen '
            + 'ja saivat marraskuussa 1973 työt keskeytettyä. Keskeytys kesti '
            + 'viikon.',
        },
        {
          tiedosto: 'Baie-James - L\'escalier du géant.jpg',
          selite: 'LG-2:n tulvauoma, jota kutsutaan jättiläisen portaiksi: '
            + 'kymmenen kallioon louhittua porrasta. Ne ovat kuivia lähes '
            + 'aina, sillä vesi kulkee turbiinien läpi. Portaita tarvitaan '
            + 'vasta kevättulvan huipulla.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Khayman',
        },
        {
          teksti: 'Kumottu päätös pakotti silti neuvottelemaan. Marraskuussa 1975 '
            + 'allekirjoitettiin Jamesinlahden ja Pohjois-Québecin sopimus, '
            + 'Kanadan ensimmäinen nykyaikainen maaoikeussopimus. Jokainen '
            + 'myöhempi hanke pohjoisessa on jouduttu käymään läpi samaa '
            + 'tietä.',
        },
        {
          teksti: 'Joki ei ole enää se, joka siellä oli. Eastmainin ja '
            + 'Caniapiscaun vedet käännettiin siihen, ja talvella, kun sähköä '
            + 'tarvitaan eniten, uomassa juoksee moninkertaisesti sitä mitä '
            + 'luonto sinne toisi.',
        },
      ],
    },

    Lachlan: {
      kappaleet: [
        {
          teksti: 'John Oxley sai 1817 tehtäväkseen seurata Lachlania niin kauas '
            + 'kuin se veisi. Uoma kävi matalammaksi, hajosi haaroiksi ja '
            + 'lopulta katosi ruovikkoon. Oxley kulki soita ristiin kolmen '
            + 'kuukauden ajan eikä löytänyt ainuttakaan kohoumaa, jolta '
            + 'katsoa eteenpäin.',
        },
        {
          lainaus: 'Jos kolmen- tai neljänkymmenen mailin säteellä olisi ollut '
            + 'kukkulaa tai edes pientä kohoumaa, se olisi nyt näkynyt; '
            + 'mitään sellaista ei ollut. Äärettömän harmin ja tuskan '
            + 'vallassa jouduin päättelemään, että tämän suunnattoman maan '
            + 'sisus on suota ja asumiskelvoton.',
          kuka: 'John Oxley',
          teos: 'Journals of Two Expeditions into the Interior of New South Wales',
          vuosi: 1820,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/5334',
        },
        {
          teksti: 'Oxley oli oikeassa vuodenajastaan ja väärässä maasta. Lachlan '
            + 'yhtyy Murrumbidgeeen vasta märkinä vuosina; kuivina se on '
            + 'ketju lampia. Sadan vuoden kuluttua samoja tasankoja '
            + 'kasteltiin lampailla ja vehnällä.',
        },
        {
          tiedosto: 'Lachlan River at Booligal NSW 1.jpg',
          selite: 'Lachlan Booligalin kohdalla. Kylä on jäänyt australialaiseen '
            + 'sanontaan kolmantena paikkana Hayn ja helvetin jälkeen, ja '
            + 'lämpötila selittää järjestyksen paremmin kuin joki.',
          lahde: 'Wikimedia Commons (CC BY-SA 2.0), Tim Keegan',
        },
      ],
    },

    Lena: {
      kappaleet: [
        {
          teksti: 'Jäihin murskautuneen laivan miehistö lähti kohti mannerta '
            + 'syyskuussa 1881. USS Jeannette oli jäänyt puristuksiin '
            + 'Uudensiperian saarten pohjoispuolella, ja George Washington De '
            + 'Long ohjasi yhtä kolmesta veneestä kohti Lenan suistoa. '
            + 'Kartta, joka heillä oli, näytti kolme suuhaaraa.',
        },
        {
          tiedosto: 'Lena River Delta - Landsat 2000.jpg',
          selite: 'Suisto on noin 30 000 neliökilometriä ja jakautuu satoihin '
            + 'uomiin. De Longin veneen rantautumispaikka oli asumattomassa '
            + 'pohjoisosassa, kaukana niistä kylistä, joita hän kartalta '
            + 'etsi.',
          lahde: 'Wikimedia Commons (PD), Landsat',
        },
        {
          lainaus: 'Ylitimme kolmetoista virtaa, joista useat olivat yhtä leveitä '
            + 'joskaan eivät yhtä syviä kuin se pääuoma, jota De Long oli '
            + 'kulkenut; siitä voi päätellä, mikä arvo kartoillamme meille '
            + 'oli, sillä ne merkitsivät tälle neljänkymmenen mailin matkalle '
            + 'kaksi virtaa.',
          kuka: 'George W. Melville',
          teos: 'In the Lena Delta',
          vuosi: 1885,
          suomennos: 'oma',
          linkki: 'https://archive.org/details/inlenadeltanarra00melvuoft',
        },
        {
          teksti: 'Melville ohjasi toista venettä ja selvisi. Hän etsi De Longin '
            + 'ryhmää koko talven ja löysi maaliskuussa 1882 leiripaikan, '
            + 'jossa päiväkirja oli heitettynä lumeen kulkusuunnan taakse. '
            + 'Kolmestakymmenestäkolmesta lähteneestä kaksikymmentä kuoli.',
        },
        {
          tiedosto: 'Lena Pillars 20050716 3.JPG',
          selite: 'Lenan pilarit noin kahdensadan kilometrin päässä Jakutskista '
            + 'ylävirtaan: kambrikautista kalkkikiveä, jonka ikirouta on '
            + 'halkonut pystysuoriksi pylväiksi.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), ZankaM',
        },
      ],
    },

    Limpopo: {
      kappaleet: [
        {
          teksti: 'Rudyard Kipling ei ollut nähnyt Limpopoa kirjoittaessaan '
            + 'siitä. Norsunlapsi ilmestyi 1902 kokoelmassa Just So Stories, '
            + 'ja siinä utelias nuori norsu matkaa joelle kysymään '
            + 'krokotiililta, mitä tämä syö päivälliseksi. Kolme määrettä '
            + 'toistuu tarinassa lähes kaksikymmentä kertaa.',
        },
        {
          tiedosto: 'Limpopo river mouth (14861850191).jpg',
          selite: 'Suisto Mosambikissa. Ylempänä uoma kuivuu paikoin kokonaan '
            + 'kuivana kautena ja nousee sadekaudella nopeasti; vuoden 2000 '
            + 'tulvassa se peitti laaksonsa viikoiksi.',
          lahde: 'Wikimedia Commons (CC BY-SA 2.0), Ton Rulkens',
        },
        {
          teksti: 'Kuumepuu on oikea kasvi. Vachellia xanthophloea kasvaa juuri '
            + 'tällaisilla soisilla rannoilla, ja sen runko on '
            + 'vihertävänkeltainen. Uudisasukkaat sairastuivat siellä '
            + 'malariaan ja syyttivät puuta. Nimi jäi, vaikka syy oli '
            + 'hyttysessä.',
        },
        {
          lainaus: 'suuri harmaanvihreä ja rasvainen Limpopo-joki, jonka ympärillä '
            + 'on kaikkialla kuumepuita',
          kuka: 'Rudyard Kipling',
          teos: 'Just So Stories',
          vuosi: 1902,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/2781',
        },
      ],
    },

    Loire: {
      kappaleet: [
        {
          teksti: 'Henry James kiersi Ranskan linnat syksyllä 1882 ja katsoi '
            + 'Loirea Amboisen pengermältä. Hän piti jokea komeana mutta '
            + 'epäluotettavana kumppanina maisemalle, joka nojasi siihen.',
        },
        {
          lainaus: 'Se on hyvin oikukas virta, ja toisinaan sen nähdään käyvän '
            + 'ohueksi ja paljastavan uomansa kaikki karkeudet — ilmeinen '
            + 'puute joessa, jonka niin suuresti oletetaan antavan '
            + 'arvokkuutta paikoille, joita se kastelee.',
          kuka: 'Henry James',
          teos: 'A Little Tour in France',
          vuosi: 1884,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/2159',
        },
        {
          tiedosto: 'Amboise Loire Panorama - July 2011.jpg',
          selite: 'Loire Amboisen kohdalla. Hiekkasärkät ovat pysyvä piirre: '
            + 'virtaama vaihtelee kymmenkertaisesti, ja loppukesällä uoma on '
            + 'paikoin kahluusyvyinen. Keski- ja alajuoksulla joessa ei ole '
            + 'yhtään patoa.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Diliff',
        },
        {
          teksti: 'Padottomuus näkyy toiseen suuntaan tulvina. Kesäkuun 1856 '
            + 'tulva mursi suojapenkereet yli sadasta kohdasta ja upotti '
            + 'laakson; Napoleon III matkusti katsomaan tuhoja. Penkereitä '
            + 'korotettiin, ja yhtä suurta tulvaa on siitä asti odotettu.',
        },
      ],
    },

    Lualaba: {
      kappaleet: [
        {
          teksti: 'David Livingstone vietti viimeiset kuusi vuottaan etsimässä '
            + 'Niilin lähdettä paikasta, jossa sitä ei ole. Hän oli '
            + 'vakuuttunut, että Lualaba on Niilin yläjuoksu, koska se oli '
            + 'leveä ja syvä ja virtasi pohjoiseen. Casembe-niminen päällikkö '
            + 'oli kertonut hänelle vastauksen jo vuosia aiemmin.',
        },
        {
          lainaus: 'Se on samaa vettä täällä kuin Chambezéssa, samaa Moerossa ja '
            + 'Lualabassa, ja yksi vesi on samanlaista kuin toinen. Aiotko '
            + 'vetää siitä kangasta, kun haluat nähdä sen.',
          kuka: 'päällikkö Casembe, Livingstonen muistiin merkitsemänä',
          teos: 'The Last Journals of David Livingstone in Central Africa, toim. Horace Waller',
          vuosi: 1874,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/17024',
        },
        {
          tiedosto: 'Wagenia 17 copy.jpg',
          selite: 'Wagenia-kalastajien puurakennelmat Boyoman koskissa Kisanganin '
            + 'kohdalla. Kartiomaiset merrat lasketaan virran kapeimpiin '
            + 'kohtiin, ja telineiden paikat periytyvät suvuittain.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Ad Meskens',
        },
        {
          teksti: 'Vastaus tarkoitti, että kaikki oli yhtä ja samaa vesistöä, ja '
            + 'se oli Kongo. Livingstone kuoli uskoen toisin. Henry Morton '
            + 'Stanley laski saman joen mereen asti vuosina 1876–1877 ja '
            + 'todisti asian; matkalle lähti runsaat kaksisataa ihmistä ja '
            + 'perille pääsi vajaat puolet.',
        },
      ],
    },

    Mackenzie: {
      kappaleet: [
        {
          teksti: 'Alexander Mackenzie lähti kesäkuussa 1789 Isolta Orjajärveltä '
            + 'kanooteilla ja odotti päätyvänsä Tyynellemerelle. Heinäkuun '
            + '14. päivänä yksi hänen miehistään näki vedessä joukon olioita, '
            + 'joita piti ensin jäänkappaleina.',
        },
        {
          lainaus: 'Huomasin heti, että ne olivat valaita, ja käskin varustaa '
            + 'kanootin, ja lähdimme niiden perään. Se oli todella hyvin '
            + 'villi ja ajattelematon yritys, ja oli onnenpotku, ettemme '
            + 'saaneet niitä kiinni: yksi isku näiden jättikalojen pyrstöstä '
            + 'olisi murskannut kanootin.',
          kuka: 'Alexander Mackenzie',
          teos: 'Voyages from Montreal Through the Continent of North America to the Frozen and Pacific Oceans in 1789 and 1793',
          vuosi: 1789,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/35658',
        },
        {
          teksti: 'Valaat merkitsivät suolaista vettä ja väärää valtamerta. Joki '
            + 'oli vienyt pohjoiseen, ja Mackenzie kääntyi takaisin. '
            + 'Tyynellemerelle hän pääsi neljä vuotta myöhemmin toista '
            + 'reittiä, ja siitä retkestä tuli mantereen ensimmäinen ylitys '
            + 'Meksikon pohjoispuolella.',
        },
        {
          tiedosto: 'Mackenzie river enters Beaufort sea.jpg',
          selite: 'Suisto Beaufortinmerellä: kymmeniätuhansia kanavia ja järviä '
            + 'ikiroudan päällä. Ruskea kieli on lietettä, jota joki tuo '
            + 'Kalliovuorilta asti ja joka värjää meren kesäisin kauas '
            + 'ulapalle.',
          lahde: 'Wikimedia Commons (PD), NASA Earth Observatory',
        },
      ],
    },

    Macquarie: {
      kappaleet: [
        {
          teksti: 'Charles Sturt lähti marraskuussa 1828 seuraamaan Macquariea '
            + 'alavirtaan kuivimpana vuotena, jonka siirtokunta muisti. '
            + 'Kuivuus oli valittu tarkoituksella: soiden piti olla '
            + 'kuljettavissa. Joki kutistui ruovikoksi ja katosi ennen kuin '
            + 'siitä tuli mitään.',
        },
        {
          tiedosto: 'Macquarie River in flood at Bathurst.jpg',
          selite: 'Sama joki Bathurstissa tulvan aikaan. Macquarie tekee '
            + 'vuosikymmenessä molemmat: kuivan uoman, jossa lampaat '
            + 'kävelevät, ja veden, joka nostaa sillat.',
          lahde: 'Wikimedia Commons (CC BY 2.0), Ian Sutton',
        },
        {
          teksti: 'Sturt jätti soiden reunaan varusteensa ja ratsasti luoteeseen. '
            + 'Helmikuussa hänen miehensä löysivät leveän joen, jollaista '
            + 'kukaan ei ollut nähnyt sisämaassa, ja laskeutuivat rantaan '
            + 'juomaan.',
        },
        {
          lainaus: 'En unohda koskaan sitä hämmästyksen huutoa, joka seurasi, enkä '
            + 'sitä kauhistunutta ilmettä, jolla miehet huusivat minulle '
            + 'veden olevan niin suolaista ettei sitä voinut juoda. — '
            + 'Toiveemme raukesivat sillä hetkellä, jolloin ne näyttivät '
            + 'toteutuvan.',
          kuka: 'Charles Sturt',
          teos: 'Two Expeditions into the Interior of Southern Australia',
          vuosi: 1833,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/4330',
        },
      ],
    },

    Madeira: {
      kappaleet: [
        {
          teksti: 'Madeira tuo Andeilta niin paljon lietettä, että sen vesi on '
            + 'Amazonin pääuomaakin vaaleampaa. Nimi tarkoittaa portugaliksi '
            + 'puuta ja viittaa runkoihin, joita tulva vie mukanaan koko '
            + 'sadekauden ajan.',
        },
        {
          teksti: 'Kaupan este oli runsaan kolmensadan kilometrin koskijakso. '
            + 'Bolivian kumi ja kiniini piti kantaa sen ohi maitse, ja 1907 '
            + 'alettiin rakentaa rautatietä. Työmaa kulki malaria-alueen '
            + 'halki, ja kuolleita laskettiin tuhansissa.',
        },
        {
          tiedosto: 'Rio Madeira- Cachoeira do Teotônio.jpg',
          selite: 'Teotônion koski Madeirassa ennen patoja: vaalea lietevesi '
            + 'kuohuu, ja kalastajakylä seisoo paaluillaan aivan kosken '
            + 'partaalla. Tällaisten koskien ohi kumi piti kantaa maitse.',
          lahde: 'Wilson Dias / Agência Brasil, Wikimedia Commons (CC BY 3.0 BR)',
        },
        {
          teksti: 'Koskissa on nyt kaksi patoa, Santo Antônio ja Jirau, molemmat '
            + '2010-luvulta. Ne tuottavat sähköä kahdentuhannen kilometrin '
            + 'päähän ja katkaisivat vaelluksen, joka vei jokea nousevat '
            + 'sompakalat Andien juurelle asti.',
        },
      ],
    },

    Magdalena: {
      kappaleet: [
        {
          teksti: 'Bogotá on kahden ja puolen kilometrin korkeudessa, eikä sinne '
            + 'päässyt rannikolta muuten kuin Magdalenaa myöten. Matka ylös '
            + 'kesti höyrylaivalla viikkoja ja sitä ennen soutuveneellä '
            + 'kuukausia. Se oli Kolumbian pääväylä kolmesataa vuotta.',
        },
        {
          tiedosto: 'Rio Magdalena Bootsfahrt 01.jpg',
          selite: 'Magdalena Momposin kohdalla. Kaupunki jäi sivuun, kun päähaara '
            + 'siirtyi 1700-luvulla toiseen uomaan. Barokkikirkot jäivät '
            + 'paikoilleen, ja liikenne meni muualta.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Burkhard Mücke',
        },
        {
          teksti: 'Höyrylaiva tuli 1823 ja katosi 1960-luvulla, kun tiet ja '
            + 'lentokoneet veivät liikenteen. Uoma mataloitui samaan aikaan, '
            + 'koska valuma-alueen metsä kaadettiin ja lietettä tuli enemmän '
            + 'kuin joki jaksoi viedä.',
        },
        {
          teksti: 'Joki oli myös hautausmaa. Sisällissodan vuosina alavirtaan '
            + 'ajelehti tunnistamattomia vainajia, ja Puerto Berríon kylässä '
            + 'syntyi tapa, jossa asukkaat ottivat yhden heistä omakseen, '
            + 'hautasivat ja hoitivat hautaa vuosikymmeniä.',
        },
      ],
    },

    'Mamoré': {
      kappaleet: [
        {
          teksti: 'Bolivialla ei ole merta, mutta Mamoré vie Amazonille. Matkan '
            + 'katkaisee yhdeksäntoista koskea Madeiran yläjuoksulla, ja '
            + 'koskien ohi ei saatu kumia eikä mitään muutakaan. Ratkaisuksi '
            + 'päätettiin rautatie.',
        },
        {
          teksti: 'Ensimmäiset yritykset epäonnistuivat 1870-luvulla. Työ '
            + 'aloitettiin uudelleen 1907, ja radan 366 kilometriä '
            + 'valmistuivat 1912. Malaria ja keltakuume tappoivat rakentajia '
            + 'tuhansittain; luku on arvioitu monella tavalla, eikä kukaan '
            + 'pitänyt kirjaa.',
        },
        {
          tiedosto: 'Passageiros no Vagão-Plataforma do Trem, na Altura do Quilômetro 151 da Ferrovia Madeira-Mamoré - 1107, Acervo do Museu Paulista da USP.jpg',
          selite: 'Matkustajia lava-vaunussa radan 151. kilometrillä. Rata '
            + 'rakennettiin kuljettamaan kumia, ja se avattiin vuonna, jona '
            + 'Amazonin kumin hinta romahti Aasian viljelmien alle.',
          lahde: 'Wikimedia Commons (PD), Museu Paulista da USP',
        },
        {
          teksti: 'Rata suljettiin 1972. Se oli rakennettu osana sopimusta, jolla '
            + 'Bolivia luovutti Acren maakunnan Brasilialle vuonna 1903; '
            + 'hinta maksettiin siis etukäteen. Viidakko peitti kiskot '
            + 'muutamassa vuodessa.',
        },
      ],
    },

    'Marañón': {
      kappaleet: [
        {
          teksti: 'Marañón syntyy Andien jäätiköillä ja kulkee kuusisataa '
            + 'kilometriä pohjoiseen kahden vuorijonon välissä ennen kuin '
            + 'kääntyy itään. Käännöksen jälkeen on portti: kilometrin '
            + 'mittainen kuja, jossa joki puristuu kolmannekseen leveydestään '
            + 'ja lähtee tasangolle.',
        },
        {
          tiedosto: 'Carte du Détroit appelé Pongo de Mansériché dans le Maragnon ou la Rivière des Amazones entre Sant-Yago et Borja où le lit du fleuve se rétrécit de 250 toises à 25 toises - btv1b8596519g.jpg',
          selite: 'Charles-Marie de La Condaminen kartta Pongo de Manserichestä. '
            + 'Hän laski Marañónia 1743 palatessaan päiväntasaajan '
            + 'mittausretkeltä ja piirsi kujan mitat: uoma kapenee 250 '
            + 'syleneen 25:een.',
          lahde: 'Wikimedia Commons (PD), Charles-Marie de La Condamine',
        },
        {
          lainaus: 'Pongo on intiaanien sana, ja sillä nimitetään paikkaa, jossa '
            + 'joki murtautuu vuorijonon läpi ja jossa kulku tietenkin '
            + 'katkeaa kallioihin ja koskiin.',
          kuka: 'William Lewis Herndon',
          teos: 'Exploration of the Valley of the Amazon, Part I',
          vuosi: 1854,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/57756',
        },
        {
          teksti: 'Pongon alapuolelta laivat pääsevät Atlantille asti, '
            + 'yläpuolella ei mihinkään. Portista tuli siksi raja: '
            + 'espanjalaiset lähetysasemat perustettiin sen alle, ja '
            + 'awajúnien ja wampisien maat jäivät yläpuolelle. Sama raja '
            + 'näkyy yhä kielikartalla.',
        },
      ],
    },

    Mekong: {
      kappaleet: [
        {
          teksti: 'Ranska otti Saigonin 1859 ja halusi tietää, pääseekö Mekongia '
            + 'pitkin Kiinaan. Vastaus tuli vuosina 1866-1868, kun Doudart de '
            + 'Lagréen retkikunta nousi jokea ylös ja totesi sen '
            + 'kelpaamattomaksi. Koskia, putouksia ja kapeikkoja riittää '
            + 'lähes koko matkalle.',
        },
        {
          tiedosto: 'Khone Phapheng Falls, Si Phan Don, Laos, widest waterfall in the world.jpg',
          selite: 'Khone Phapheng Laosin ja Kambodžan rajalla. Putous on matala '
            + 'mutta yli kymmenen kilometriä leveä ja katkaisee '
            + 'laivaliikenteen kokonaan. Ranskalaiset rakensivat 1890-luvulla '
            + 'saarten yli kapearaiteisen radan sen ohi.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Basile Morin',
        },
        {
          lainaus: 'Mekong on täällä paljon suurempi kuin Menam Bangkokissa, ja se '
            + 'pakottautuu korkeiden vuorten välitse äänellä, joka muistuttaa '
            + 'meren pauhua ja vuolaan virran vauhtia, tuskin pysyen '
            + 'uomassaan.',
          kuka: 'Henri Mouhot',
          teos: 'Travels in the Central Parts of Indo-China (Siam), Cambodia, and Laos',
          vuosi: 1864,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/46560',
        },
        {
          teksti: 'Mouhot kirjoitti tämän Paklaissa kesäkuussa 1861. Hän jatkoi '
            + 'pohjoiseen Luang Prabangiin ja kuoli siellä marraskuussa '
            + 'kuumeeseen. Päiväkirjat lähetettiin Bangkokiin, ja niistä '
            + 'koottiin kirja, joka ilmestyi kolme vuotta hänen kuolemansa '
            + 'jälkeen.',
        },
      ],
    },

    Mississippi: {
      kappaleet: [
        {
          teksti: 'Samuel Clemens opetteli luotsiksi vuosina 1857-1859. Työ vaati '
            + 'koko uoman ulkoa molempiin suuntiin ja pimeässä: matalikot, '
            + 'kannot ja mutkat, jotka siirtyivät joka kevättulvassa. Kun hän '
            + 'vihdoin osasi lukea veden pinnan, hän huomasi menettäneensä '
            + 'samalla jotain.',
        },
        {
          lainaus: 'Romantiikka ja kauneus olivat kadonneet joesta. Ainoa arvo, '
            + 'joka millään sen piirteellä enää oli minulle, oli se hyöty, '
            + 'jonka siitä irtosi höyrylaivan turvalliseen luotsaamiseen.',
          kuka: 'Mark Twain',
          teos: 'Life on the Mississippi',
          vuosi: 1883,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/245',
        },
        {
          tiedosto: 'The Great Mississippi Steamboat Race. From New Orleans to St. Louis, July 1870.jpg',
          selite: 'Robert E. Lee ja Natchez kilpailivat New Orleansista St. '
            + 'Louisiin heinäkuussa 1870, ja Currier & Ives painoi kuvan '
            + 'saman tien. Lee voitti kolmessa vuorokaudessa ja '
            + 'kahdeksassatoista tunnissa.',
          lahde: 'Wikimedia Commons (PD), Currier & Ives',
        },
        {
          teksti: 'Joki oikoo itseään. Twain laski, että alajuoksu oli lyhentynyt '
            + '176 vuodessa 242 mailia mutkien katketessa, ja teki '
            + 'laskelmasta pilaa jatkamalla sitä tulevaisuuteen. Nykyään '
            + 'armeijan insinöörit pitävät uomaa paikallaan penkerein ja '
            + 'kivetyksin.',
        },
      ],
    },

    Missouri: {
      kappaleet: [
        {
          teksti: 'Meriwether Lewis käveli kesäkuussa 1805 joukkonsa edellä '
            + 'etsimässä paikkaa, jonka mandanit olivat kuvailleet hänelle '
            + 'talven aikana. Hän kuuli sen ennen kuin näki.',
        },
        {
          lainaus: 'Korviani tervehti miellyttävä veden putoamisen ääni, ja hieman '
            + 'edempänä näin vesipölyn nousevan tasangon ylle kuin '
            + 'savupatsaan — ja pian se alkoi pauhata liian hirmuisesti, '
            + 'jotta syy olisi voinut olla mikään muu kuin Missourin suuret '
            + 'putoukset.',
          kuka: 'Meriwether Lewis',
          teos: 'The Journals of Lewis and Clark, 1804-1806',
          vuosi: 1805,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/8419',
        },
        {
          tiedosto: 'Rainbow Falls Great Falls MT1.jpg',
          selite: 'Sateenkaariputous, viidestä putouksesta toinen. Lewis piti '
            + 'sitä kauniina ja alempaa Suurta putousta mahtavana ja epäröi '
            + 'kumman asettaisi edelle. Molempien harjalla on nyt pato.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Acroterion',
        },
        {
          teksti: 'Putousten ohitus vei kuukauden. Kanootit ja tavarat vedettiin '
            + 'kärryillä lähes kolmekymmentä kilometriä preerian yli '
            + 'piikkiöpuntian läpi, ja pyörät sahattiin puuvillapuun '
            + 'rungosta. Retkikunta oli varannut koko mantereen ylitykseen '
            + 'suunnilleen sen ajan, jonka pelkkä ohitus söi.',
        },
      ],
    },

    Narmada: {
      kappaleet: [
        {
          teksti: 'Narmada virtaa länteen kahden vuorijonon välisessä '
            + 'hautavajoamassa, kun muut Intian suuret joet menevät itään. '
            + 'Puolimatkassa se osuu marmorikerrostumaan Jabalpurin luona, ja '
            + 'siinä kohtaa metsänhoitaja James Forsyth pysähtyi viimeisellä '
            + 'matkallaan 1860-luvun lopulla.',
        },
        {
          lainaus: 'Missä tahansa maassa mahtava joki, joka on ahdettu '
            + 'kolmannekseen leveydestään ja kiehuu parin mailin matkan '
            + 'syvänä ja synkkänä kahden pystysuoran, sadan jalan korkuisen '
            + 'valkoisen marmoriseinän välissä, olisi harvinaisen kaunis '
            + 'näky.',
          kuka: 'James Forsyth',
          teos: 'The Highlands of Central India',
          vuosi: 1872,
          suomennos: 'oma',
          linkki: 'https://archive.org/details/highlandsofcentr00forsrich',
        },
        {
          tiedosto: 'Section of Narmada River near Bhedaghat, Jabalpur.jpg',
          selite: 'Bhedaghatin marmorikuru. Kivi on kiteytynyttä kalkkikiveä, '
            + 'jota halkovat tummat juonteet; venemiehet soutavat kujaan '
            + 'Dhuandhar-putouksen alta ja kääntyvät samasta kohdasta '
            + 'takaisin.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Shivam Agrawal',
        },
        {
          teksti: 'Forsyth kuoli vuotta ennen kirjansa ilmestymistä, '
            + '33-vuotiaana. Sadassakolmessakymmenessä vuodessa Narmadaan '
            + 'suunniteltiin kolmekymmentä suurta patoa; Sardar Sarovar '
            + 'valmistui 2017 ja siirsi noin kaksisataatuhatta ihmistä. '
            + 'Kiista siitä kesti kolme vuosikymmentä.',
        },
      ],
    },

    Negro: {
      kappaleet: [
        {
          teksti: 'George Chaworth Musters ratsasti 1869 ja 1870 tehuelchejoukon '
            + 'mukana Magalhaesinsalmelta pohjoiseen. Matkaa kertyi vuosi, ja '
            + 'se päättyi tähän jokeen. Hän oli ainoa eurooppalainen, joka '
            + 'näki Patagonian sisämaan ennen kuin sen asukkaat menettivät '
            + 'sen.',
        },
        {
          lainaus: 'Ilon hetki oli kaikille, kun neljäntenä päivänä, '
            + 'ratsastettuamme aamunkoitosta kymmeneen, näimme vihdoin '
            + 'laakson vielä kolmen mailin päässä: suuret pajut, jotka ovat '
            + 'Patagoniassa lähes tuntemattomia, merkitsivät Río Negron '
            + 'mutkittelevaa uomaa.',
          kuka: 'George Chaworth Musters',
          teos: 'At Home with the Patagonians',
          vuosi: 1871,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/42483',
        },
        {
          teksti: 'Vuonna 1879 Julio Argentino Rocan retkikunta siirsi '
            + 'Argentiinan rajan tähän jokeen ja sen yli. Sotaretkeä '
            + 'kutsuttiin autiomaan valloitukseksi, vaikka autiota siellä ei '
            + 'ollut; tehuelchet ja mapuchet vietiin sokeriruokoviljelmille '
            + 'ja palveluspaikkoihin.',
        },
        {
          tiedosto: 'Rio Negro Floodplain, Patagonia, Argentina 2010-01-04 lrg.jpg',
          selite: 'Vihreä viiva harmaassa: kastellun laakson leveys on paikoin '
            + 'kymmenen kilometriä ja aro alkaa siitä heti. Omenaa ja '
            + 'päärynää viedään täältä Eurooppaan eteläisen pallonpuoliskon '
            + 'kesästä.',
          lahde: 'Wikimedia Commons (PD), NASA',
        },
      ],
    },

    Nelson: {
      kappaleet: [
        {
          teksti: 'Hudson\'s Bay Company rakensi kauppapaikkansa Nelsonin ja '
            + 'Hayesin suiden väliin vuonna 1684. York Factory oli yhtiön ovi '
            + 'mantereelle: turkikset tulivat kanooteilla sisämaasta, laivat '
            + 'hakivat ne kerran kesässä, ja jää sulki sataman lopuksi '
            + 'vuodeksi.',
        },
        {
          tiedosto: 'Cha Chay Pay Way Ti’s Map of the Waterways of a Part of Northern Manitoba (1806).jpg',
          selite: 'Cha Chay Pay Way Ti piirsi tämän vesistökartan vuonna 1806, ja '
            + 'Peter Fidler kopioi sen yhtiön kirjoihin. Sisämaan reitit '
            + 'tunsivat creet ja denet; kauppiaat merkitsivät ne muistiin.',
          lahde: 'Wikimedia Commons (PD), Cha Chay Pay Way Ti / Peter Fidler',
        },
        {
          teksti: 'Kauppa kulki silti Hayesia eikä Nelsonia. Nelson on leveämpi '
            + 'ja koskisempi, ja raskaasti lastattu kanootti pärjäsi paremmin '
            + 'pienemmässä joessa. Kaksi uomaa laskee mereen parinkymmenen '
            + 'kilometrin päässä toisistaan.',
        },
        {
          teksti: 'Nelsoniin tuli lopulta muuta. Kettlen, Long Sprucen ja '
            + 'Limestonen padot nousivat 1970-luvulta alkaen, ja Manitoban '
            + 'sähköstä valtaosa tulee nyt tästä joesta. York Factory '
            + 'suljettiin 1957 eikä sinne johda tietä.',
        },
      ],
    },

    'Neuquén': {
      kappaleet: [
        {
          teksti: 'Neuquénin altaan hiekkakivestä on kaivettu esiin suurimmat '
            + 'maalla eläneet eläimet. Argentinosaurus ja Giganotosaurus '
            + 'löytyivät molemmat muutaman tunnin ajomatkan päästä '
            + 'toisistaan, ja kumpikin on lajinsa kookkain tunnettu.',
        },
        {
          teksti: 'Sama kerrostuma on nyt muusta syystä arvokas. Vaca Muerta '
            + '-liuske, joka on hautautunut fossiilipetien alle, sisältää '
            + 'maailman toiseksi suurimmat liuskekaasuvarat, ja sen '
            + 'murtamiseen tarvitaan vettä juuri tästä joesta.',
        },
        {
          tiedosto: 'Where Giants Roamed (MODIS 2021-12-07).jpg',
          selite: 'Neuquén tulee kuvassa pohjoisesta ja Limay etelästä; niiden '
            + 'yhtymäkohdasta alkaa Río Negro. Vaaleat läiskät ovat '
            + 'suolatasankoja, tummat säännölliset kuviot tekoaltaita.',
          lahde: 'Wikimedia Commons (PD), NASA / MODIS',
        },
        {
          teksti: 'Joki itse on lyhyt ja äkkipikainen. Se tulee Andeilta lumen ja '
            + 'sateen mukana, ja ennen Cerros Coloradosin altaita sen '
            + 'kevättulva saattoi olla kymmenkertainen loppukesän virtaamaan '
            + 'verrattuna.',
        },
      ],
    },

    Neva: {
      kappaleet: [
        {
          teksti: 'Neva on lyhyt ja nuori. Se puhkaisi uomansa Laatokasta '
            + 'Suomenlahteen noin kolmetuhatta vuotta sitten, ja koko '
            + 'Laatokan vesi kulkee sitä myöten seitsemänkymmentä kilometriä. '
            + 'Vesimäärältään se on Euroopan kärkeä pituudestaan huolimatta.',
        },
        {
          tiedosto: 'SPB Panoramic view of Neva downstream by Atkinson 1802-1805.jpg',
          selite: 'John Augustus Atkinsonin näkymä Nevalle 1800-luvun alussa. '
            + 'Uoma on kaupungin kohdalla noin puoli kilometriä leveä ja niin '
            + 'syvä, että purjelaivat pääsivät keskustaan asti.',
          lahde: 'Wikimedia Commons (PD), John Augustus Atkinson',
        },
        {
          teksti: 'Länsituuli työntää Suomenlahden vettä suistoon, eikä joki '
            + 'mahdu ulos. Marraskuussa 1824 pinta nousi yli neljä metriä '
            + 'normaalin yläpuolelle ja kaupunki oli veden alla. Puoltatoista '
            + 'metriä suurempia tulvia on kirjattu yli kolmesataa.',
        },
        {
          teksti: 'Suojapato valmistui 2011: kaksikymmentäviisi kilometriä '
            + 'penkereitä ja portteja lahden poikki. Portit suljetaan, kun '
            + 'ennuste ylittää rajan, ja kaupunki jää padon sisäpuolelle.',
        },
      ],
    },

    Niger: {
      kappaleet: [
        {
          teksti: 'Vuonna 1796 Euroopassa ei tiedetty, mihin suuntaan Niger '
            + 'virtaa. Ptolemaioksesta lähtien oli arveltu sen kulkevan '
            + 'länteen ja olevan Senegalin yläjuoksu. Skotlantilainen lääkäri '
            + 'Mungo Park lähti selvittämään asian ja saapui vuoden '
            + 'vaelluksen jälkeen Ségouhun Bambaran valtakuntaan.',
        },
        {
          lainaus: 'Katsoin eteenpäin ja näin äärettömällä mielihyvällä matkani '
            + 'suuren päämäärän, kauan etsityn majesteettisen Nigerin, joka '
            + 'kimalteli aamuauringossa, leveänä kuin Thames Westminsterissä, '
            + 'ja virtasi hitaasti itään.',
          kuka: 'Mungo Park',
          teos: 'Travels in the Interior Districts of Africa',
          vuosi: 1799,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/5266',
        },
        {
          tiedosto: 'Mopti Fishing Boats.jpg',
          selite: 'Mopti Malissa, sisämaasuiston reunalla. Joki hajoaa täällä '
            + 'haaroiksi ja kausijärviksi, ja tulvan laajuus ratkaisee vuoden '
            + 'riisisadon. Ségou, jossa Park näki joen, on muutaman sadan '
            + 'kilometrin päässä ylävirtaan.',
          lahde: 'Wikimedia Commons (CC BY 2.0), upyernoz',
        },
        {
          teksti: 'Itään virtaava joki ei ratkaissut kysymystä vaan siirsi sitä: '
            + 'minne se päätyy. Park palasi 1805 selvittämään ja hukkui '
            + 'Bussan koskiin. Vasta 1830 veljekset Richard ja John Lander '
            + 'seurasivat uoman Guineanlahdelle asti.',
        },
      ],
    },

    'North Saskatchewan': {
      kappaleet: [
        {
          teksti: 'Kaksi englantilaista, lordi Milton ja lääkäri Walter Cheadle, '
            + 'kulkivat vuosina 1862 ja 1863 Punaiseltajoelta Tyynellemerelle '
            + 'Saskatchewanin vartta ja Kalliovuorten yli. Matkan tarkoitus '
            + 'ei ollut urheilu vaan väite, jonka he esittivät kirjansa '
            + 'esipuheessa.',
        },
        {
          tiedosto: 'North Saskatchewan River and downtown, Edmonton, Alberta, Canada2.jpg',
          selite: 'Pohjois-Saskatchewan Edmontonin kohdalla. Laakso on satakunta '
            + 'metriä syvä ja leikkautunut jääkauden jälkeisiin kerrostumiin; '
            + 'kaupunki on jättänyt sen rakentamatta ja käyttää sitä '
            + 'puistona.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Joli Rumi',
        },
        {
          lainaus: 'Olemme koettaneet osoittaa, että ranskalaiskanadalaisten '
            + 'alkuperäinen ajatus oli oikea ja että todellinen Luoteisväylä '
            + 'kulkee maitse, Saskatchewanin hedelmällisen vyöhykkeen halki.',
          kuka: 'William Fitzwilliam Milton ja Walter B. Cheadle',
          teos: 'The North-West Passage by Land',
          vuosi: 1865,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/69759',
        },
        {
          teksti: 'Rautatie rakennettiin kaksikymmentä vuotta myöhemmin, mutta '
            + 'eteläisen preerian poikki eikä hedelmällisen vyöhykkeen '
            + 'kautta. Edmonton sai oman ratansa vasta 1891, ja se seisoi '
            + 'vuosikymmenen joen väärällä puolella, koska siltaa ei ollut.',
        },
      ],
    },

    Ob: {
      kappaleet: [
        {
          teksti: 'Obin suulla ei ole suistoa vaan lahti: kahdeksansataa '
            + 'kilometriä pitkä ja paikoin kuudenkymmenen levyinen kouru, '
            + 'joka jatkuu Jäämereen. Makea vesi työntyy siitä ulos kauas '
            + 'merelle ja laimentaa pintakerroksen niin, että se jäätyy '
            + 'aikaisemmin kuin suolainen vesi.',
        },
        {
          tiedosto: 'Barnaul ObRiver 012 8618.jpg',
          selite: 'Ob Barnaulissa Altain juurella. Kevättulva etenee etelästä '
            + 'pohjoiseen ja törmää alavirrassa vielä jäätyneeseen uomaan; '
            + 'vesi ei pääse eteenpäin vaan leviää sivuille soille.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Ludvig14',
        },
        {
          teksti: 'Siitä on seurannut maailman laajin suoalue. Vasjuganin suo '
            + 'Obin ja Irtyšin välissä on yli viisikymmentätuhatta '
            + 'neliökilometriä eli Suomen eteläpuoliskon kokoinen, ja se on '
            + 'syntynyt tulvasta, joka ei pääse pois.',
        },
        {
          teksti: 'Fridtjof Nansen purjehti Karanmeren yli 1913 osoittaakseen, '
            + 'että Siperian vilja kannattaa viedä meritse länteen. Reitti '
            + 'toimi, mutta vain elo-syyskuussa. Rautatie voitti sen.',
        },
      ],
    },

    Oder: {
      kappaleet: [
        {
          teksti: 'Oder oli Preussin ensimmäisiä suuria vesirakennuskohteita. '
            + 'Friedrich II kuivatti 1750-luvulla Oderbruchin suoalueen ja '
            + 'siirsi joen kaivettuun uomaan. Kuivunutta maata tuli tuhat '
            + 'neliökilometriä, ja sinne asutettiin kymmeniätuhansia '
            + 'uudisasukkaita.',
        },
        {
          teksti: 'Vuonna 1945 joesta tuli raja. Oder-Neisse-linja siirsi Puolan '
            + 'länteen ja Saksan rajan tälle joelle; Stettinistä tuli '
            + 'Szczecin, ja miljoonat ihmiset muuttivat molempiin suuntiin '
            + 'muutamassa vuodessa.',
        },
        {
          tiedosto: 'Odra o zachodzie słońca.jpg',
          selite: 'Odra Szczecinin kohdalla. Satama on 65 kilometriä merestä '
            + 'sisämaassa ja yhteydessä Itämerelle lahden kautta. Väylä on '
            + 'ruopattava, koska joki ei syvennä sitä itse.',
          lahde: 'Wikimedia Commons (CC BY-SA 2.0), włodi',
        },
        {
          teksti: 'Heinäkuussa 1997 tuli tulva, joka nousi Wrocławissa '
            + 'katutasolle ja tappoi yli sata ihmistä kahdessa maassa. Sen '
            + 'jälkeen penkereitä on korotettu ja osa tulvatasangoista '
            + 'palautettu joen käyttöön.',
        },
      ],
    },

    Ohio: {
      kappaleet: [
        {
          teksti: 'Ohio oli sata vuotta päätie länteen. Perhe osti Pittsburghista '
            + 'lautan, lastasi siihen kaiken omistamansa ja laski virran '
            + 'mukana, kunnes valitsi rannan. Charles Dickens matkusti reitin '
            + 'höyrylaivalla 1842 ja katsoi, kun väkeä jätettiin maihin.',
        },
        {
          lainaus: 'Viisi miestä, yhtä monta naista ja pieni tyttö. Koko heidän '
            + 'maallinen omaisuutensa on säkki, iso arkku ja vanha tuoli. — '
            + 'Ensimmäisellä airon loiskahduksella joukon vanhin nainen '
            + 'istuutuu tuoliin aivan veden rajaan sanomatta sanaakaan.',
          kuka: 'Charles Dickens',
          teos: 'American Notes',
          vuosi: 1842,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/675',
        },
        {
          tiedosto: 'George Caleb Bingham - Jolly Flatboatmen in Port.jpg',
          selite: 'George Caleb Bingham maalasi lauttamiehiä 1850-luvulla, kun '
            + 'höyry oli jo syrjäyttämässä heidät. Lautta purettiin '
            + 'määränpäässä ja myytiin lankkuina, sillä ylävirtaan sillä ei '
            + 'ollut asiaa.',
          lahde: 'Wikimedia Commons (PD), George Caleb Bingham',
        },
        {
          teksti: 'Sama joki oli raja. Pohjoispuolella oli Ohio, jossa orjuutta '
            + 'ei ollut, eteläpuolella Kentucky ja Virginia, joissa oli. '
            + 'Karkumatka alkoi tai päättyi vedessä, ja Ripleyn kaltaisista '
            + 'jokivarren pikkukaupungeista tuli avustajaverkoston solmuja.',
        },
      ],
    },

    Okavango: {
      kappaleet: [
        {
          teksti: 'Joki ei löydä merta. Okavango tulee Angolan ylängöltä, kulkee '
            + 'Namibian kapean kaistaleen halki ja leviää Botswanassa '
            + 'Kalaharin hiekkaan suistoksi, joka ei laske minnekään. Vesi '
            + 'haihtuu ja imeytyy. Livingstone tuli alueelle 1849 etsimään '
            + 'järveä, josta oli kuullut.',
        },
        {
          lainaus: 'Meille kertoivat järvellä asuvat bayeiyet, että kun vuotuinen '
            + 'tulva alkaa, sen syöksyvät vedet vievät mukanaan paitsi '
            + 'suurikokoisia puita myös antilooppeja.',
          kuka: 'David Livingstone',
          teos: 'Missionary Travels and Researches in South Africa',
          vuosi: 1857,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/1039',
        },
        {
          tiedosto: 'Vista aérea del delta del Okavango, Botsuana, 2018-08-01, DD 23.jpg',
          selite: 'Tulva saapuu suistoon maalis-heinäkuussa, puoli vuotta sen '
            + 'jälkeen kun sade satoi Angolassa. Kuivin vuodenaika on siis '
            + 'se, jolloin suistossa on eniten vettä, ja eläimet tulevat '
            + 'sinne koko Kalaharista.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Diego Delso',
        },
        {
          teksti: 'Ngami, jonka Livingstone näki elokuun 1. päivänä 1849, oli '
            + 'suiston eteläinen ylivuotoallas. Se on sittemmin kuivunut '
            + 'lähes kokonaan, ja vettä siihen tulee vain poikkeuksellisen '
            + 'suurina tulvavuosina.',
        },
      ],
    },

    Olenjok: {
      kappaleet: [
        {
          teksti: 'Vitus Beringin Suuri pohjoinen retkikunta jakoi Jäämeren '
            + 'rannikon osuuksiin. Lenan ja Jenisein välinen pätkä lankesi '
            + 'luutnantti Vasili Pronchishcheville, joka lähti Jakutskista '
            + 'kesällä 1735 vaimonsa Tatjanan kanssa. Ensimmäinen talvi '
            + 'vietettiin Olenjokin suulla metsästäjien kesätuvissa.',
        },
        {
          lainaus: 'Hän oli vasta vihitty lähtiessään. Nuori vaimo seurasi häntä '
            + 'matkalla, jakoi hänen vaaransa ja kärsimyksensä, eli häntä '
            + 'vain kaksi päivää pitempään ja lepää nyt hänen vierellään '
            + 'haudassa Jäämeren autiolla rannalla.',
          kuka: 'A. E. Nordenskiöld',
          teos: 'The Voyage of the Vega round Asia and Europe, engl. Alexander Leslie',
          vuosi: 1881,
          suomennos: 'oma, Leslien englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/24365',
        },
        {
          tiedosto: 'Olenëk river, Russia.jpg',
          selite: 'Olenjokin suisto Sentinel-2:n kuvaamana. Joki jäätyi vuonna '
            + '1736 lokakuun alussa, ja Tšeljuskin sai aluksen sisään kolme '
            + 'viikkoa ennen sitä. Ust-Olenjokin kylä on itäisen haaran '
            + 'rannalla.',
          lahde: 'Wikimedia Commons (CC BY), Euroopan unioni / Copernicus Sentinel-2',
        },
        {
          teksti: 'Toinen kesä vei aluksen lähemmäs Aasian pohjoisinta niemeä '
            + 'kuin kukaan oli päässyt. Paluulla Pronchishchev kuoli '
            + 'sairauteensa, ja perämies Semjon Tšeljuskin toi aluksen '
            + 'jokeen. Niemi, joka jäi saavuttamatta, kantaa nykyään '
            + 'perämiehen nimeä.',
        },
      ],
    },

    Orange: {
      kappaleet: [
        {
          teksti: 'Oranjejoki laskee Atlantille, mutta sen suulla ei ole satamaa. '
            + 'Rannikko on Namibin autiomaata, ja joki tuo mukanaan hiekkaa '
            + 'enemmän kuin vettä. Suulle kertyy särkkä, joka sulkee sen '
            + 'suurimman osan vuodesta.',
        },
        {
          tiedosto: 'Augrabies Falls 2.JPG',
          selite: 'Augrabies, jossa joki putoaa kuusikymmentä metriä graniittiin '
            + 'hakkautuneeseen rotkoon. Nama-kielinen nimi Aukoerebis '
            + 'tarkoittaa suurta melua. Rotko jatkuu putouksen alapuolella '
            + 'kahdeksantoista kilometriä.',
          lahde: 'Wikimedia Commons (CC BY 3.0), Octagon',
        },
        {
          teksti: 'Timantit tulivat jokea alas. Ne syntyivät sisämaan '
            + 'kimberliittiputkissa, huuhtoutuivat Oranjeen ja päätyivät '
            + 'merelle, jossa virtaus levitti ne rannikkoa pitkin pohjoiseen. '
            + 'Namibian rantakaistale on siksi maailman rikkain hiekkaan '
            + 'hautautunut timanttikenttä.',
        },
        {
          teksti: 'Nimi ei tule väristä. Robert Jacob Gordon antoi sen 1779 '
            + 'Oranian suvun mukaan. Alkuperäinen nama-nimi on Gariep, ja '
            + 'Lesothossa sama joki on Senqu: kolme nimeä samalle uomalle sen '
            + 'mukaan, kenen mailla se kulkee.',
        },
      ],
    },

    Orinoco: {
      kappaleet: [
        {
          teksti: 'Walter Raleigh nousi Orinocoa 1595 etsimässä kultakaupunkia, '
            + 'jonka espanjalaiset olivat nimenneet El Doradoksi. Hän ei '
            + 'löytänyt sitä. Kirja, jonka hän kirjoitti palattuaan, myi '
            + 'silti kaiken sen, mitä hän oli luvannut.',
        },
        {
          lainaus: 'En ole nähnyt kauniimpaa maata enkä eloisampia näkymiä — '
            + 'peurat ylittivät joka polun, linnut lauloivat illansuussa joka '
            + 'puussa tuhannella eri sävelellä — ja jokainen kivi, jonka '
            + 'kumarruimme poimimaan, lupasi väriltään kultaa tai hopeaa.',
          kuka: 'Walter Raleigh',
          teos: 'The Discovery of Guiana',
          vuosi: 1596,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/2272',
        },
        {
          tiedosto: 'Orinoco river from Parmana Venezuela.jpg',
          selite: 'Orinoco Parmanan kohdalla. Sadekaudella pinta nousee '
            + 'toistakymmentä metriä ja joki leviää tulvatasangolle. Kuivalla '
            + 'kaudella hiekkasärkät nousevat esiin, ja jokikilpikonnat '
            + 'nousevat niille munimaan.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Paolostefano1412',
        },
        {
          teksti: 'Raleigh palasi 1617 vanhana miehenä ja armahdettuna vankina, '
            + 'ehdolla ettei taistelisi espanjalaisia vastaan. Hänen miehensä '
            + 'polttivat San Thomén siirtokunnan ja hänen poikansa kaatui '
            + 'siinä. Jaakko I mestautti hänet Lontoossa seuraavana vuonna.',
        },
      ],
    },

    Ottawa: {
      kappaleet: [
        {
          teksti: 'Samuel de Champlain lähti toukokuussa 1613 neljän ranskalaisen '
            + 'ja yhden algonkinin kanssa nousemaan pohjoista jokea. '
            + 'Kanootteja ei voinut kantaa maitse, koska metsä oli liian '
            + 'tiheä, joten ne vedettiin köysillä koskien läpi.',
        },
        {
          lainaus: 'Omaani vetäessäni olin menettää henkeni: kanootti ajautui '
            + 'pyörteeseen, ja ellen olisi onnekseni pudonnut kahden kiven '
            + 'väliin, se olisi vetänyt minut mukanaan. En ehtinyt irrottaa '
            + 'köyttä, joka oli kiertynyt käteni ympäri, satutti sitä pahoin '
            + 'ja oli vähällä katkaista sen.',
          kuka: 'Samuel de Champlain',
          teos: 'Voyages of Samuel de Champlain, osa 3, engl. Charles P. Otis',
          vuosi: 1882,
          suomennos: 'oma, Otisin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/6825',
        },
        {
          tiedosto: 'Chaudiere Falls Ottawa (NBY 440517).jpg',
          selite: 'Chaudièren putous, jonka kohdalla algonkinit pysähtyivät ja '
            + 'heittivät tupakkaa veteen. Putous valjastettiin sahoille '
            + '1800-luvulla; nykyinen rengaspato on 1900-luvun alusta.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Sama reitti kantoi kaksisataa vuotta turkiksia ja sen jälkeen '
            + 'puuta. Valkomännyt sidottiin lautoiksi ja laskettiin koskien '
            + 'ohi puuränneillä, joita rakennettiin varta vasten. Pääkaupunki '
            + 'asetettiin tänne 1857, koska raja kulkee joessa.',
        },
      ],
    },

    'Paraná': {
      kappaleet: [
        {
          teksti: 'Vuosina 1827-1832 Río de la Platan takamailla ei satanut. '
            + 'Karjatilat menettivät eläimensä, ja lopulta laumat juoksivat '
            + 'jokeen eivätkä jaksaneet nousta mutaisia rantoja ylös. Darwin '
            + 'kuuli tapauksesta silminnäkijältä ja mietti sitä geologin '
            + 'silmin.',
        },
        {
          lainaus: 'Mitä geologi ajattelisi nähdessään tällaisen valtavan '
            + 'luukokoelman, kaikenlaisia eläimiä kaiken ikäisinä, upotettuna '
            + 'yhteen paksuun maakerrokseen? Eikö hän lukisi sitä tulvaksi, '
            + 'joka pyyhkäisi maan yli, eikä asioiden tavalliseksi kuluksi?',
          kuka: 'Charles Darwin',
          teos: 'The Voyage of the Beagle',
          vuosi: 1845,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/944',
        },
        {
          teksti: 'Satojen tuhansien eläinten ruhot jäivät liejuun, ja seuraavan '
            + 'vuoden tulva hautasi ne. Darwinin kysymys oli menetelmällinen: '
            + 'kerros ei kerro syytään, ja katastrofin näköinen kerros voi '
            + 'syntyä kuivuudesta.',
        },
        {
          tiedosto: 'Paraná Delta near Rosario.jpg',
          selite: 'Suisto alkaa jo satojen kilometrien päässä merestä. Saaria on '
            + 'tuhansia, ja ne syntyvät ja katoavat vuosikymmenissä; Darwinin '
            + 'laivuri muisti useiden hävinneen omana aikanaan.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Pablo D. Flores',
        },
      ],
    },

    'Paranaíba': {
      kappaleet: [
        {
          teksti: 'Paranájoella ei ole latvaa. Se alkaa siitä, mihin kaksi muuta '
            + 'jokea päättyy: Paranaíba tulee pohjoisesta ja Rio Grande '
            + 'idästä, ja niiden yhtymäkohdasta lähtee nimi, joka jatkuu '
            + 'kaksi ja puoli tuhatta kilometriä Atlantille asti.',
        },
        {
          tiedosto: 'Paranaíbariver.JPG',
          selite: 'Paranaíba erottaa Minas Geraisin Goiásista suurimman osan '
            + 'matkaa. Osavaltioiden raja kulkee keskellä uomaa, joten sillat '
            + 'ovat aina kahden hallinnon yhteisiä hankkeita.',
          lahde: 'Wikimedia Commons (CC BY 3.0), Andrevruas',
        },
        {
          teksti: '1700-luvulla tämä oli tie kullalle. Bandeirantit nousivat São '
            + 'Paulosta jokia pitkin Goiásin kaivoksille, ja matkaan meni '
            + 'kuukausia; paluulasti kannettiin muuleilla, koska kosket eivät '
            + 'päästäneet venettä alas.',
        },
        {
          teksti: 'Kosket ovat nyt altaita. Emborcação, Itumbiara ja São Simão '
            + 'padottiin peräkkäin 1970- ja 80-luvuilla, ja joki laskeutuu '
            + 'tekojärvestä toiseen kuin portaita. Vapaata virtaa on jäljellä '
            + 'muutamia kymmeniä kilometrejä.',
        },
      ],
    },

    Peace: {
      kappaleet: [
        {
          teksti: 'Alexander Mackenzie nousi Rauhanjokea keväällä 1793 etsiessään '
            + 'reittiä Tyynellemerelle. Latvoilla vedenjakaja oli lyhyt '
            + 'kannas, jonka yli kanootti kannettiin, ja toisella puolella '
            + 'vedet lähtivät länteen. Paluumatkalla hänellä oli aikaa '
            + 'ajatella kalaa.',
        },
        {
          lainaus: 'Jos olisin voinut käyttää aikaa ja jaksanut liikkua — nilkkani '
            + 'oli turvonnut niin, etten kävellyt kuin suurella vaivalla — '
            + 'aikomukseni oli ottaa lohia elävinä ja siirtää ne '
            + 'Rauhanjokeen, vaikka on hyvin epävarmaa, eläisikö se kala '
            + 'vesissä, joilla ei ole yhteyttä mereen.',
          kuka: 'Alexander Mackenzie',
          teos: 'Voyages from Montreal Through the Continent of North America',
          vuosi: 1801,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/35659',
        },
        {
          tiedosto: 'Peace River, Alberta (HS85-10-32013).jpg',
          selite: 'Rauhanjoki Albertassa. Uoma on vanhempi kuin nykyinen vuoristo '
            + 'ja on kuluttanut itsensä sen läpi; Rauhanjoki on siksi harvoja '
            + 'jokia, jotka läpäisevät Kalliovuoret idästä länteen.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Epäilys oli aiheellinen. Rauhanjoki laskee Slave- ja '
            + 'Mackenziejoen kautta Jäämereen, eikä Tyynenmeren lohi nouse '
            + 'sinne. Nimi tulee rauhasta, jonka creet ja beaverit tekivät '
            + 'joen mutkassa 1780-luvulla ja joka jätti joen väliinsä '
            + 'rajaksi.',
        },
      ],
    },

    'Petšora': {
      kappaleet: [
        {
          teksti: 'Sheffieldiläinen teräksentekijä Henry Seebohm lähti keväällä '
            + '1875 Petšoralle syystä, joka kuulostaa pieneltä eikä ollut '
            + 'sitä. Kuusi Britannian rannoilla talvehtivaa lintulajia pesi '
            + 'jossakin pohjoisessa, eikä yhdenkään munia ollut nähnyt '
            + 'kukaan.',
        },
        {
          lainaus: 'Jäljellä oli puolisen tusinaa hyvin tunnettua brittiläistä '
            + 'lintua, joiden pesimäseudut olivat yhä salaisuuden verhoamat, '
            + 'ja niiden ratkaiseminen on ollut monen kenttätutkijan '
            + 'kunnianhimo kahdenkymmenen viime vuoden ajan.',
          kuka: 'Henry Seebohm',
          teos: 'Siberia in Europe: A Visit to the Valley of the Petchora',
          vuosi: 1880,
          suomennos: 'oma',
          linkki: 'https://archive.org/details/siberiaineuropev00seebrich',
        },
        {
          tiedosto: 'Black-bellied Plover nest (33254864926).jpg',
          selite: 'Tundrakurmitsan pesä: kuoppa jäkälässä, neljä munaa kärjet '
            + 'sisäänpäin. Juuri tätä Seebohm etsi. Pesä on aina avoimella '
            + 'paikalla, koska hautova lintu luottaa näkyvyyteen eikä '
            + 'piiloon.',
          lahde: 'Wikimedia Commons (PD), U.S. Fish and Wildlife Service',
        },
        {
          teksti: 'Heinäkuussa löytyivät tundralta ensimmäiset tieteelle tunnetut '
            + 'tundrakurmitsan munat. Samalta matkalta on peräisin myös '
            + 'kirvisen pesä, jonka takia laji tunnetaan yhä Petšoran '
            + 'kirvisenä. Kirjan nimi kuuluu Siperia Euroopassa: Petšora '
            + 'virtaa Uralin länsipuolella.',
        },
      ],
    },

    Po: {
      kappaleet: [
        {
          teksti: 'Po laskee Adrianmereen suistona, joka kasvaa ulospäin. Dante '
            + 'antoi Francescan nimetä kotikaupunkinsa joen kautta, ja '
            + 'Ravenna oli hänen aikanaan meren rannalla.',
        },
        {
          lainaus: 'Se maa, jossa synnyin, sijaitsee sillä rannalla, jonne Po '
            + 'laskeutuu saadakseen rauhan seuraajiensa kanssa.',
          kuka: 'Dante Alighieri',
          teos: 'La Divina Commedia, Inferno V',
          vuosi: 'n. 1310',
          suomennos: 'oma, italiasta',
          linkki: 'https://www.gutenberg.org/ebooks/997',
        },
        {
          teksti: 'Nyt Ravennasta on merelle kymmenen kilometriä. Suisto on '
            + 'työntynyt itään Apenniinien eroosion tahdissa, ja vauhti '
            + 'kasvoi keskiajalla, kun valuma-alueen metsiä kaadettiin. '
            + 'Rannikko siirtyi paikoin kilometrin vuosisadassa.',
        },
        {
          tiedosto: 'Po River Delta- ISS020-E-9731.JPG',
          selite: 'Suisto avaruudesta. Uoma kulkee penkereiden välissä paikoin '
            + 'ympäröivää maata korkeammalla, ja suistossa maanpinta on '
            + 'painunut merenpinnan alapuolelle pohjaveden ja maakaasun oton '
            + 'takia.',
          lahde: 'Wikimedia Commons (PD), NASA',
        },
      ],
    },

    'Purús': {
      kappaleet: [
        {
          teksti: 'Purúsin yläjuoksulla ei ollut vuonna 1852 karttaa vaan huhu. '
            + 'Amazonia mittaamaan lähetetty luutnantti William Herndon aikoi '
            + 'nousta jokea, mutta oli Barrassa jo lopussa. Hän tyytyi '
            + 'kuuntelemaan Seraphim-nimistä kauppiasta, joka oli käynyt '
            + 'joella useita kertoja.',
        },
        {
          tiedosto: 'Rio purus - panoramio.jpg',
          selite: 'Purús Amazonasin osavaltiossa. Uoma mutkittelee niin jyrkästi, '
            + 'että jokimatka kahden pisteen välillä on usein moninkertainen '
            + 'linnuntiehen nähden ja katkeavat mutkat jäävät rannalle '
            + 'kaarilammiksi.',
          lahde: 'Wikimedia Commons (CC BY 3.0), James Martins',
        },
        {
          lainaus: 'Hän tiesi, ettei se ollut brasilialainen vene, rakenteesta '
            + 'päätellen ja siitä että hän itse oli tuohon aikaan joen ainoa '
            + 'kauppias. Hän tiesi myös, ettei se ollut intiaanin vene, '
            + 'keulan rautarenkaasta päätellen.',
          kuka: 'William Lewis Herndon',
          teos: 'Exploration of the Valley of the Amazon, Part I',
          vuosi: 1854,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/57756',
        },
        {
          teksti: 'Kymmenen päivämatkan päässä ylävirtaan asui Seraphimin '
            + 'lähteiden mukaan väkeä, joka ratsasti hevosilla ja piti '
            + 'karjaa. Bolivian karjatilat olivat todellakin siellä. '
            + 'Neljäkymmentä vuotta myöhemmin kumin hinta toi Purúsille '
            + 'tuhansia kerääjiä koillisesta.',
        },
      ],
    },

    Rein: {
      kappaleet: [
        {
          teksti: 'Köln oli 1820-luvulla yhtä aikaa Euroopan vilkkaimman vesitien '
            + 'varrella ja sen viemärissä. Samuel Taylor Coleridge kävi '
            + 'kaupungissa 1828 ja laski hajut.',
        },
        {
          lainaus: 'Te nymfit, jotka hallitsette viemäreitä ja kaivoja: Rein, '
            + 'kuten hyvin tiedetään, pesee kaupunkinne Kölnin. Mutta '
            + 'sanokaa, nymfit, mikä jumalainen mahti pesee tästedes Reinin?',
          kuka: 'Samuel Taylor Coleridge',
          teos: 'Cologne',
          vuosi: 1828,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/29091',
        },
        {
          tiedosto: 'Königswinter, Drachenfels, Blick auf den Rhein -- 2024 -- 3926.jpg',
          selite: 'Drachenfels Königswinterin yllä. Vuoren trakiittia louhittiin '
            + 'Kölnin tuomiokirkkoon asti, kunnes Preussi lopetti louhinnan '
            + '1836, koska kallio oli katoamassa. Höyrylaiva toi silloin jo '
            + 'matkailijoita päivittäin.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Dietmar Rabich',
        },
        {
          teksti: 'Marraskuussa 1986 Baselissa paloi kemiantehtaan varasto, ja '
            + 'sammutusvesi huuhtoi torjunta-aineita Reiniin. Ankeriaat '
            + 'kuolivat satojen kilometrien matkalta. Puhdistamot '
            + 'rakennettiin sen jälkeen uudestaan, ja lohi palasi jokeen '
            + '1990-luvun lopulla.',
        },
      ],
    },

    'Rhône': {
      kappaleet: [
        {
          teksti: 'Ennen höyryä Rhônea noustiin hevosvoimin. Alaspäin päästiin '
            + 'nopeasti ja usein hengenvaarallisesti, ylös Arlesista Lyoniin '
            + 'tarvittiin parikymmentä hevosta ja viikkoja. Charles Dickens '
            + 'kulki alavirran suuntaan 1844.',
        },
        {
          lainaus: 'Pian päivänkoiton jälkeen seuraavana aamuna kuljimme höyryllä '
            + 'alas nuolen nopeaa Rhônea kahdenkymmenen mailin tuntivauhtia '
            + 'hyvin likaisessa aluksessa, joka oli täynnä kauppatavaraa.',
          kuka: 'Charles Dickens',
          teos: 'Pictures from Italy',
          vuosi: 1846,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/650',
        },
        {
          tiedosto: 'Suspension bridge over the Rhone, Avignon, Provence, France-LCCN2001698589.jpg',
          selite: 'Rhône Avignonissa noin 1890. Riippusilta on 1800-luvulta. Sen '
            + 'takana näkyvä Pont Saint-Bénézet menetti kaarensa tulviin, ja '
            + 'kahdestakymmenestä on jäljellä neljä.',
          lahde: 'Wikimedia Commons (PD), Photochrom Print Collection',
        },
        {
          teksti: 'Virta on sittemmin kesytetty. Vuodesta 1948 alkaen jokeen '
            + 'rakennettiin toistakymmentä patoa ja ohitusuomaa, ja Lyonista '
            + 'mereen pääsee nyt proomulla. Nopeus, jota Dickens ihaili, '
            + 'menee sähköksi.',
        },
      ],
    },

    'Rio Grande': {
      kappaleet: [
        {
          teksti: 'Rio Grande on rajajoki, joka liikkuu. Tulva voi siirtää uomaa '
            + 'satoja metrejä yhdessä yössä, ja kun raja on määritelty uoman '
            + 'keskilinjaksi, maa vaihtaa valtiota ilman että kukaan päättää '
            + 'siitä.',
        },
        {
          tiedosto: 'Big Bend Santa Elena Canyon 2006.JPG',
          selite: 'Santa Elenan kanjoni Big Bendissä. Seinämät nousevat runsaat '
            + 'neljäsataa metriä, ja joki kulkee niiden välissä paikoin '
            + 'kymmenen metrin levyisenä. Oikea puoli on Meksikoa, vasen '
            + 'Yhdysvaltoja.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'El Pason ja Ciudad Juárezin välillä uoma siirtyi 1860-luvulla '
            + 'etelään ja jätti Chamizalin alueen väärälle puolelle. Riita '
            + 'kesti sata vuotta ja sovittiin 1963: uoma vuorattiin betonilla '
            + 'paikalleen ja maa jaettiin.',
        },
        {
          teksti: 'Vettä ei riitä kaikille. Kastelu ja kaupungit ottavat sitä '
            + 'niin paljon, että joki ei joinakin vuosina yllä '
            + 'Meksikonlahdelle vaan häviää hiekkaan kymmeniä kilometrejä '
            + 'ennen merta.',
        },
      ],
    },

    'Rio Negro': {
      kappaleet: [
        {
          teksti: 'Rio Negron vesi on kasvien hajoamistuotteiden värjäämää ja '
            + 'syvällä lähes mustaa. Alfred Russel Wallace nousi jokea '
            + '1850-luvulla ja huomasi heti, miten toisenlainen se on kuin '
            + 'Amazon muutaman kilometrin päässä.',
        },
        {
          tiedosto: 'Arquipélago de Mariauá.jpg',
          selite: 'Mariuán saaristo. Uoma jakautuu satoihin haaroihin, ja veden '
            + 'laskiessa niiden väliin jää pitkulaisia saaria. Saaristo '
            + 'jatkuu satoja kilometrejä ja on maailman laajin jokisaaristo.',
          lahde: 'Wikimedia Commons (CC BY-SA 2.0), INPE',
        },
        {
          lainaus: 'Täällä ei ollut kelluvia ruohosaaria, ei tukkeja eikä '
            + 'juuriltaan repeytyneitä puita lokkilasteineen, tuskin virtaa '
            + 'lainkaan ja vähän merkkejä elämästä mustassa ja hitaassa '
            + 'vedessä. Silti myrskyssä aallot ovat suurempia ja '
            + 'vaarallisempia kuin Amazonilla.',
          kuka: 'Alfred Russel Wallace',
          teos: 'A Narrative of Travels on the Amazon and Rio Negro',
          vuosi: 1853,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/71436',
        },
        {
          teksti: 'Ero on ravinteissa. Andeilta tuleva savi lannoittaa Amazonin '
            + 'tulvametsät joka vuosi, mutta Rio Negron valuma-alue on vanhaa '
            + 'hiekkakiveä, josta ei liukene juuri mitään. Vesi on hapanta, '
            + 'hyttysiä on vähän, ja siksi rannoille rakennettiin.',
        },
      ],
    },

    'Saint Lawrence': {
      kappaleet: [
        {
          teksti: 'Jacques Cartier purjehti 1535 ylös jokea kohti Kiinaa ja '
            + 'pysähtyi Montrealin kohdalla koskiin, joiden yli ei päässyt. '
            + 'Koski sai myöhemmin nimen La Chine, ja pilkka jäi kartalle '
            + 'neljäksisadaksi vuodeksi.',
        },
        {
          lainaus: 'Jokainen siirtolainen, joka saapuu tähän maahan Saint '
            + 'Lawrencea myöten, näkee Orléansin saaren niemen avautuessa '
            + 'Montmorencin syöksyvän Suureen jokeen komeana valkoisena '
            + 'verhona ja tekevän lisäyksensä painokkaasti.',
          kuka: 'Henry David Thoreau',
          teos: 'A Yankee in Canada',
          vuosi: 1866,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/70123',
        },
        {
          tiedosto: 'Rapides de Lachine 1.JPG',
          selite: 'Lachinen kosket Montrealin yläpuolella. Ne ohitettiin ensin '
            + 'kanavalla 1825. Nykyinen meriväylä avattiin 1959, ja se nostaa '
            + 'valtamerilaivat sulkuportailla Ontariojärveen asti.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Talvi sulki joen puoleksi vuodeksi, ja se ratkaisi paljon: '
            + 'Ranskan siirtokunta oli jäissä marraskuusta huhtikuuhun eikä '
            + 'saanut apua eikä uutisia. Nyt jäänmurtajat pitävät väylän '
            + 'Montrealiin auki ympäri vuoden.',
        },
      ],
    },

    Salween: {
      kappaleet: [
        {
          teksti: 'Salween kulkee tuhat kilometriä rotkossa. Tiibetin ylängöltä '
            + 'lähtevät Salween, Mekong ja Jangtse virtaavat Yunnanissa '
            + 'rinnakkain alle sadan kilometrin levyisellä kaistalla, kukin '
            + 'omassa kanjonissaan, ja erkanevat vasta sen jälkeen.',
        },
        {
          teksti: 'Joen yli ei päässyt sillalla. Lisu- ja nu-kylissä käytettiin '
            + 'köysiylityksiä: köysi vedettiin rannalta rannalle, ja kulkija '
            + 'liukui sitä pitkin puisen uran varassa, tavarat ja karja '
            + 'mukanaan.',
        },
        {
          tiedosto: 'Salween River, The Rope Station (5710965271).jpg',
          selite: 'Köysiasema Salweenin yllä 1900-luvun alussa. Lasku käy '
            + 'painovoimalla, ja vastarannalle noustaan kiskomalla, joten '
            + 'köysiä on yleensä kaksi: kummallekin suunnalle omansa.',
          lahde: 'Wikimedia Commons (ei käyttörajoituksia), Museum of Photographic Arts',
        },
        {
          teksti: 'Pääuomassa ei ole patoa. Kiinan puolella suunniteltiin '
            + '2000-luvulla kolmentoista voimalaitoksen ketjua ja Myanmarin '
            + 'puolella useaa suurta hanketta; kumpikaan ei ole edennyt '
            + 'rakentamiseen. Salween on siksi yksi maailman viimeisistä '
            + 'patoamattomista suurista joista.',
        },
      ],
    },

    Sambesi: {
      kappaleet: [
        {
          teksti: 'Livingstone kuuli putouksesta ennen kuin näki sen. Makololon '
            + 'päällikkö Sebituane oli esittänyt hänelle kysymyksen, joka jäi '
            + 'mieleen, ja vastaus tuli vasta marraskuussa 1855, kun hän '
            + 'laski ruuhella saarelle aivan putouksen reunalle.',
        },
        {
          lainaus: 'Yksi Sebituanen esittämistä kysymyksistä oli: onko teidän '
            + 'maassanne savua, joka soi?',
          kuka: 'David Livingstone',
          teos: 'Missionary Travels and Researches in South Africa',
          vuosi: 1857,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/1039',
        },
        {
          teksti: 'Mosi-oa-Tunya, savu joka jyrisee, oli paikan oma nimi. Vesi ei '
            + 'putoa alas vaan kapeaan halkeamaan, joka leikkaa joen poikki '
            + 'koko leveydeltä, ja purkautuu siitä sivusta sarjaan '
            + 'sik-sak-rotkoja. Livingstone antoi paikalle ainoan '
            + 'englanninkielisen nimen, jonka koko matkallaan antoi.',
        },
        {
          tiedosto: 'Cataratas Victoria, Zambia-Zimbabue, 2018-07-27, DD 05.jpg',
          selite: 'Halkeama on runsaat 1 700 metriä leveä ja yli sata metriä '
            + 'syvä. Tulvahuipulla reunan yli menee satoja miljoonia litroja '
            + 'minuutissa, ja sumu näkyy kymmenien kilometrien päähän.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Diego Delso',
        },
      ],
    },

    'São Francisco': {
      kappaleet: [
        {
          teksti: 'São Francisco virtaa koko matkansa Brasilian sisällä ja halkoo '
            + 'sertãon, missä sadetta voi olla odotettava vuosia. Sitä '
            + 'kutsutaan kansalliseksi joeksi, koska se on alueen ainoa vesi, '
            + 'joka ei lopu.',
        },
        {
          teksti: 'Höyrylaivat kulkivat Piraporan ja Juazeiron välillä runsaat '
            + 'tuhat kilometriä, ja niiden keulissa oli carranca, puusta '
            + 'veistetty koirankuonoinen hahmo, joka piti loitolla veden '
            + 'henkiä. Veistäjät tekivät niitä 1800-luvun lopulta '
            + '1950-luvulle.',
        },
        {
          tiedosto: 'Canyon, Paulo Afonso - BA, Brazil.JPG',
          selite: 'Paulo Afonson kanjoni, johon joki putosi kahdeksankymmentä '
            + 'metriä. Vuodesta 1949 vesi on ohjattu voimalaitokseen, ja '
            + 'putouksessa on vettä lähinnä tulvien ja koeajojen aikaan.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Ingridgaab',
        },
        {
          teksti: 'Yläjuoksulla vettä otetaan kasteluun, ja 2010-luvulla kaksi '
            + 'kanavaa alkoi siirtää sitä koillisen kaupungeille. Suistossa '
            + 'merivesi työntyy uomaan ylöspäin, koska joen oma virtaus ei '
            + 'enää vastusta sitä yhtä lujaa.',
        },
      ],
    },

    Saskatchewan: {
      kappaleet: [
        {
          teksti: 'Carlton Housen linnake seisoi joen etelärannalla siinä '
            + 'kohdassa, jossa metsä vaihtuu preeriaksi. Sen kautta kulki '
            + 'turkiskaupan pääväylä länteen. Viscount Milton ja lääkäri '
            + 'Walter Cheadle saapuivat sinne syyskuussa 1862 matkalla, jonka '
            + 'oli määrä viedä heidät Kalliovuorten yli.',
        },
        {
          lainaus: 'Pohjoisen suuren metsän ja etelään jatkuvan preerian välissä '
            + 'se oli ennen hyvin merkittävä asema. Mutta kun metsän '
            + 'turkiseläimet ovat vähentyneet ja biisonit ovat usein kaukana, '
            + 'se ei enää ole tuottoisimpia.',
          kuka: 'Viscount Milton ja W. B. Cheadle',
          teos: 'The North-West Passage by Land',
          vuosi: 1865,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/69759',
        },
        {
          teksti: 'Kaksikymmentä vuotta myöhemmin biisoneita ei ollut lainkaan. '
            + 'Pemmikaani, kuivalihan ja rasvan seos, jolla koko turkiskaupan '
            + 'kuljetusverkko oli syönyt, loppui samalla kertaa, ja preerian '
            + 'talous romahti muutamassa vuodessa.',
        },
        {
          tiedosto: 'Gezicht op de Saskatchewan, RP-F-2001-7-821-35.jpg',
          selite: 'Walter Dwight Wilcoxin heliograuuri Saskatchewanin '
            + 'latvahaaralta Kalliovuorilta, noin 1893. Preerian yli kulkeva '
            + 'joki alkaa jäätiköiltä, ja sulamisvesi ajoittaa sen tulvan '
            + 'alkukesään.',
          lahde: 'Wikimedia Commons (CC0), Rijksmuseum / Walter Dwight Wilcox',
        },
      ],
    },

    Seine: {
      kappaleet: [
        {
          teksti: 'Pariisi joi Seinestä pitkään senkin jälkeen, kun se oli '
            + 'laskenut viemärinsä samaan uomaan. Vasta 1860-luvulla '
            + 'kaupungin juomavesi tuotiin Dhuis-akveduktia myöten sadan '
            + 'kilometrin päästä, ja joki jäi liikenteelle ja tulville.',
        },
        {
          teksti: 'Tulva on joen tavallinen tila eikä poikkeus. Alfred Sisley '
            + 'maalasi Port-Marlyn tulvan kahdesti, 1872 ja 1876, lähes '
            + 'samasta kohdasta: kadulla soudetaan, ja vesi on ikkunalautaa '
            + 'ylempänä.',
        },
        {
          tiedosto: 'Alfred Sisley, Flood at Port-Marly, 1872, NGA 66436.jpg',
          selite: 'Alfred Sisley, Tulva Port-Marlyssa (1872). Talo on '
            + 'viinikauppiaan, ja vesi ulottuu oven yläreunaan. Sisley palasi '
            + 'samaan paikkaan neljä vuotta myöhemmin, kun tulva toistui.',
          lahde: 'Wikimedia Commons (CC0), Alfred Sisley',
        },
        {
          teksti: 'Suurin mitattu tulva tuli tammikuussa 1910, jolloin vesi nousi '
            + 'Pariisissa kahdeksan ja puoli metriä. Metrotunnelit täyttyivät '
            + 'ja kaduilla kuljettiin lankkusiltoja pitkin. Kaupungissa ei '
            + 'hukkunut ketään.',
        },
      ],
    },

    Selenga: {
      kappaleet: [
        {
          teksti: 'Selenga alkaa Mongolian pohjoisilta vuorilta ja tuo Baikaliin '
            + 'puolet kaikesta siihen tulevasta vedestä. Reitti oli 1700- ja '
            + '1800-luvulla teen tie: karavaanit toivat sitä Kiinasta Kjahtan '
            + 'rajakaupunkiin, ja sieltä lasti jatkoi jokea alas.',
        },
        {
          tiedosto: 'ISS-29 Snowfall on the Selenga River Delta, Russia.jpg',
          selite: 'Selengan suisto ensilumen jälkeen avaruusasemalta. Suisto on '
            + 'lähes seitsemänsataa neliökilometriä ja toimii Baikalin '
            + 'suodattimena: se pidättää suuren osan siitä, mitä '
            + 'valuma-alueelta tulee.',
          lahde: 'Wikimedia Commons (PD), NASA',
        },
        {
          lainaus: 'Selenga on yhtä yhtämittaista yksinäisyyttä, ja '
            + 'Transbaikaliasta löysin kaiken mitä halusin: Kaukasuksen, '
            + 'Psjolin laakson, Zvenigorodin seudun ja Donin. Päivällä '
            + 'ratsastat Kaukasuksen halki, yöllä Donin aroa, aamulla heräät '
            + 'Poltavan kuvernementtiin.',
          kuka: 'Anton Tšehov',
          teos: 'kirje äidilleen, höyrylaiva Jermak',
          vuosi: 1890,
          suomennos: 'oma, Constance Garnettin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/6408',
        },
        {
          teksti: 'Tšehov kulki reitin toiseen suuntaan matkalla Sahalinille. Nyt '
            + 'sama joki kantaa Ulan-Batorin ja Ulan-Uden jätevedet ja '
            + 'Mongolian kaivosten lietteen. Baikalin syvyys tasoittaa '
            + 'kuormaa, mutta suiston pohjaeläimistä se on jo luettavissa.',
        },
      ],
    },

    Senegal: {
      kappaleet: [
        {
          teksti: 'Ranskalaiset asettuivat 1659 hiekkasaarelle joen suulla, koska '
            + 'saarelta oli helpompi puolustautua kuin rannalta. '
            + 'Saint-Louisista tuli kaupungin nimi ja pitkäksi aikaa koko '
            + 'Länsi-Afrikan ranskalaisen hallinnon pääpaikka.',
        },
        {
          tiedosto: 'AMH-6796-NA Bird\'s eye view of the mouth of the Senegal, Saint Louis.jpg',
          selite: 'Hollantilainen näkymä Senegalin suulle noin 1665. Hiekkasärkkä '
            + 'kääntää joen kymmeniä kilometrejä etelään ennen kuin se pääsee '
            + 'mereen, ja särkän aukko siirtyi myrskyissä paikasta toiseen.',
          lahde: 'Wikimedia Commons (PD), Johannes Vingboons',
        },
        {
          teksti: 'Kauppatavara oli sata vuotta arabikumia. Sitä kerättiin '
            + 'akasioista joen pohjoispuolen aavikolta, ja Euroopan '
            + 'kangasvärjäämöt eivät tulleet ilman sitä toimeen. Vaihtokauppa '
            + 'käytiin joen rannalla pidetyillä markkinoilla, joita '
            + 'kutsuttiin escaleiksi.',
        },
        {
          teksti: 'Ylävirtaan pääsi vain tulva-aikaan. Elokuusta lokakuuhun '
            + 'höyryalus nousi Kayesiin asti, muulloin ei mihinkään, joten '
            + 'koko sisämaan valloitus eteni vuodenajan tahdissa. Diaman ja '
            + 'Manantalin padot lopettivat tulvan 1980-luvulla.',
        },
      ],
    },

    'Shatt al-Arab': {
      kappaleet: [
        {
          teksti: 'Joki on nuorempi kuin sen varren kaupungit. Eufrat ja Tigris '
            + 'laskivat vielä varhaisella historiallisella ajalla erikseen '
            + 'Persianlahteen, ja Shatt al-Arab syntyi vasta, kun lieju '
            + 'työnsi rannikkoa etelään ja uomat kohtasivat.',
        },
        {
          tiedosto: 'Basra, Galérie agréable du Monde.jpg',
          selite: 'Basra 1720-luvun hollantilaisessa kaiverruksessa. Kaupunki oli '
            + 'Intian-kaupan päätepysäkki: tavara purettiin täällä ja jatkoi '
            + 'karavaanilla Aleppoon.',
          lahde: 'Wikimedia Commons (PD), Pieter van der Aa',
        },
        {
          teksti: 'Molempia rantoja reunusti maailman suurin taatelipalmumetsä, '
            + 'arviolta seitsemäntoista miljoonaa puuta. Ne kastelivat '
            + 'itsensä: vuorovesi työntää Persianlahdesta suolatonta '
            + 'jokivettä uomaa ylös kahdesti päivässä, ja se riitti juurille.',
        },
        {
          teksti: 'Iranin ja Irakin sota 1980-1988 kulki tätä uomaa pitkin, ja '
            + 'palmuista tuhoutui suurin osa. Vuorovesi tuo nyt suolaa: kun '
            + 'yläjuoksun padot vähensivät virtaamaa, meri työntyy pitemmälle '
            + 'sisään kuin puut kestävät.',
        },
      ],
    },

    Shire: {
      kappaleet: [
        {
          teksti: 'David Livingstone nousi Shireä pitkin 1859 ja löysi '
            + 'Njassajärven. Hän ajatteli, että höyrylaiva ja '
            + 'puuvillanviljely lopettaisivat orjakaupan sisämaassa, koska ne '
            + 'tarjoaisivat toisen tavan ansaita.',
        },
        {
          teksti: 'Kävi toisin. Reitti, jonka hän kartoitti, oli sama, jota '
            + 'orjakauppiaat käyttivät, ja liikenne lisääntyi. Kun hän palasi '
            + 'laaksoon 1863, kylät olivat tyhjiä ja joessa ajelehti '
            + 'ruumiita.',
        },
        {
          lainaus: 'Kun omin silmin näimme tämän murheen maljan viimeiset tipat, '
            + 'tunsimme ensi kertaa, että orjakaupan lähimmäisillemme tekemät '
            + 'vääryydet ovat liioittelun ulottumattomissa.',
          kuka: 'David Livingstone',
          teos: 'A Popular Account of Dr. Livingstone\'s Expedition to the Zambesi and Its Tributaries',
          vuosi: 1894,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/2519',
        },
        {
          tiedosto: 'Pool on the River Shire at the Foot of the Murchison Cataracts, Africa, ca.1860-ca.1900 (imp-cswc-GB-237-CSWC47-LS16-040).jpg',
          selite: 'Suvanto Murchisonin koskien alapuolella. Kosket katkaisevat '
            + 'joen kahdeksankymmenen kilometrin matkalta, ja laivat '
            + 'jouduttiin purkamaan osiin ja kantamaan ohi.',
          lahde: 'Wikimedia Commons (PD)',
        },
      ],
    },

    'Sininen Niili': {
      kappaleet: [
        {
          teksti: 'Egyptin tulva tuli Etiopiasta. Valkoinen Niili tuo tasaisen '
            + 'virran ympäri vuoden, mutta kesätulvan, sen joka nosti veden '
            + 'pelloille ja jätti mudan, toi Sininen Niili: kuivana kautena '
            + 'vaatimaton, sadekaudella valtava.',
        },
        {
          tiedosto: 'Blue Nile falls (5494283771).jpg',
          selite: 'Tis Issat Tanajärven alapuolella. Putous oli ennen leveä koko '
            + 'uoman poikki; vuonna 2003 valmistunut voimalaitos ohjaa '
            + 'suurimman osan vedestä ohitse, ja täysi näkymä on nykyään '
            + 'harvinainen.',
          lahde: 'Wikimedia Commons (CC BY 2.0), Katie Hunt',
        },
        {
          teksti: 'Osuus vaihtelee vuodenajan mukaan. Elo-syyskuussa Sininen '
            + 'Niili tuo Khartumin alapuolisesta vedestä valtaosan, '
            + 'huhtikuussa vain murto-osan. Egyptin maanviljelyn vuosirytmi '
            + 'oli siis etiopialaisen sadekauden rytmi tuhannen kilometrin '
            + 'päässä ylävirrassa.',
        },
        {
          teksti: 'Skotlantilainen James Bruce seisoi lähteellä marraskuussa 1770 '
            + 'ja julisti ratkaisseensa Niilin arvoituksen. Portugalilainen '
            + 'jesuiitta Pedro Páez oli seisonut samassa paikassa 1618. Bruce '
            + 'tiesi sen ja kiisti sen kirjassaan.',
        },
      ],
    },

    Slave: {
      kappaleet: [
        {
          teksti: 'Peace-joki vaihtaa nimeään Slaveksi siinä, missä Athabascan '
            + 'vedet yhtyvät siihen. Alexander Mackenzie laski sitä '
            + 'kesäkuussa 1789 matkalla, jonka piti johtaa Tyynellemerelle ja '
            + 'johti Jäämereen. Kanootit purettiin ja kannettiin neljä '
            + 'kertaa.',
        },
        {
          lainaus: 'Vuonna 1786 viisi miestä hukkui ja kaksi kanoottia ja osa '
            + 'kuormasta menetettiin joen toisen puolen koskissa; siitä tämä '
            + 'paikka sai nimen Portage des Noyes.',
          kuka: 'Alexander Mackenzie',
          teos: 'Voyages from Montreal … to the Frozen and Pacific Oceans, osa I',
          vuosi: 1801,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/35658',
        },
        {
          tiedosto: 'Horse drawn carts portage goods around the impassable rapids on the Slave River -a.jpg',
          selite: 'Hevoskärryt kiertävät koskia Fort Smithissä vuonna 1922. '
            + 'Höyrylaiva odotti kummallakin puolella; kahdenkymmenenkuuden '
            + 'kilometrin ajomatka oli ainoa katkos yhtenäisessä vesitiessä '
            + 'Albertasta Jäämerelle.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Koskissa elää yhä pelikaaneja, pohjoisin pesivä yhdyskunta '
            + 'maailmassa. Ne kalastavat kuohujen keskellä olevilla '
            + 'kallioilla, joihin ei pääse maalta eikä veneellä.',
        },
      ],
    },

    Snake: {
      kappaleet: [
        {
          teksti: 'John Jacob Astorin turkiskauppiaat lähtivät lokakuussa 1811 '
            + 'laskemaan jokea, jonka arvelivat vievän heidät Columbialle ja '
            + 'mereen. Kanootit hylättiin koskeen, jolle jäi nimi Caldron '
            + 'Linn. Matka jatkui rantoja pitkin kävellen, ja seurue hajosi '
            + 'ryhmiin eri puolille uomaa.',
        },
        {
          lainaus: 'Yli kahdeksansataa mailia raskasta taivalta se oli heille '
            + 'maksanut, ja siihen liittyneet kärsimykset tekivät siitä '
            + 'muistoissa vihattavan, niin että kanadalaiset venemiehet '
            + 'puhuivat siitä aina nimellä la maudite rivière enragée, '
            + 'kirottu raivojoki.',
          kuka: 'Washington Irving',
          teos: 'Astoria; or, Anecdotes of an Enterprise Beyond the Rocky Mountains',
          vuosi: 1836,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/1371',
        },
        {
          tiedosto: 'A SMALL (17 FOOT) RAFT RUNNING WILD SHEEP RAPIDS ON THE SNAKE RIVER IN HELLS CANYON. EXPERT BOATMEN WORKING FOR... - NARA - 549465.jpg',
          selite: 'Wild Sheepin koski Hells Canyonissa. Kuru on Pohjois-Amerikan '
            + 'syvin, paikoin yli kaksi kilometriä reunalta veteen. Kuva on '
            + 'vuodelta 1973, jolloin alue oli juuri suojeltu lisäpadoilta.',
          lahde: 'Wikimedia Commons (PD), Boyd Norton / U.S. National Archives',
        },
        {
          teksti: 'Kolmekymmentä vuotta myöhemmin samaa laaksoa kulki Oregon '
            + 'Trail, koska muuta reittiä ei ollut. Vaunut pysyivät '
            + 'ylätasangolla ja laskeutuivat veteen vain kahlaamoilla. Hells '
            + 'Canyonin padot 1950- ja 1960-luvuilta ovat ilman kalatietä, '
            + 'joten lohi ei nouse enää lainkaan yläjuoksun kutupaikoille.',
        },
      ],
    },

    Songhua: {
      kappaleet: [
        {
          teksti: 'Sungari on mantšujen kotijoki. Valloitettuaan Kiinan 1644 '
            + 'mantšut sulkivat oman maakuntansa kiinalaisilta '
            + 'uudisasukkailta ja merkitsivät rajan pajuaidalla, satojen '
            + 'kilometrien pituisella vallilla ja ojalla. Kielto kesti '
            + 'kaksisataa vuotta.',
        },
        {
          teksti: 'Kun se 1860-luvulla purettiin, Shandongista lähti liikkeelle '
            + 'miljoonia ihmisiä. Venäläiset veivät Itä-Kiinan radan joen yli '
            + 'vuonna 1898, ja siltatyömaan viereen syntyi Harbin, kaupunki, '
            + 'joka oli neljäkymmentä vuotta puoliksi venäläinen.',
        },
        {
          tiedosto: 'Frozen Songhua River.jpg',
          selite: 'Sungari on jäässä marraskuusta huhtikuuhun. Harbinin '
            + 'jäälyhtyjuhla ottaa rakennusaineensa suoraan uomasta: lohkot '
            + 'sahataan joesta ja sulavat keväällä takaisin siihen.',
          lahde: 'Wikimedia Commons (CC BY 2.0), ChiralJon',
        },
        {
          teksti: 'Marraskuussa 2005 Jilinin kemiantehdas räjähti ja jokeen valui '
            + 'satakunta tonnia bentseeniä. Myrkkylautta ajelehti Harbiniin '
            + 'viikossa. Kaupunki, jossa asuu yli kolme miljoonaa, oli viisi '
            + 'vuorokautta ilman hanavettä.',
        },
      ],
    },

    Sukhona: {
      kappaleet: [
        {
          teksti: 'Ennen Pietaria Venäjällä oli yksi meritie, ja se kulki tästä. '
            + 'Englantilainen Richard Chancellor ajautui 1553 Vienanmerelle '
            + 'etsiessään koillisväylää, ja seuraavat puolitoista vuosisataa '
            + 'tavara kulki Moskovasta Vologdan ja Suhonan kautta '
            + 'Arkangeliin.',
        },
        {
          teksti: 'Veliki Ustjug rikastui liikenteestä niin, että sen kauppiaat '
            + 'rahoittivat retkiä Siperiaan ja Alaskaan asti. Pietari Suuri '
            + 'siirsi ulkomaankaupan Itämerelle 1710-luvulla, ja reitti '
            + 'hiljeni sukupolvessa.',
        },
        {
          tiedosto: 'Сухона. Брошенная деревня.jpg',
          selite: 'Autioitunut kylä Suhonan rannalla, kuvattuna 1980. Rantakylät '
            + 'syntyivät vesitien varteen ja jäivät sen mukana '
            + 'tarpeettomiksi; lähin rautatie kulkee kaukana pohjoisessa.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Vitold Muratov',
        },
        {
          teksti: 'Keväällä joen ylin jakso virtaa väärään suuntaan. '
            + 'Kubenskojejärvi on vielä jäässä, kun sivujoet tulvivat, ja '
            + 'niiden vesi työntää Suhonan hetkeksi takaisin järveen päin. '
            + 'Ilmiö kestää muutaman päivän ja toistuu useimpina vuosina.',
        },
      ],
    },

    Sutlej: {
      kappaleet: [
        {
          teksti: 'Punjab tarkoittaa viittä vettä, ja Sutlej on niistä pisin ja '
            + 'itäisin. Kaksi näistä joista saa puheenvuoron Rigvedan '
            + 'kolmannen kirjan hymnissä: laulaja Višvamitra pyytää Vipasia '
            + 'ja Sutudria laskemaan vetensä, jotta bharata-heimo pääsee yli, '
            + 'ja joet vastaavat hänelle.',
        },
        {
          lainaus: 'Vuorten povesta, kiihkeinä kuin kaksi nopeaa tammaa ohjat '
            + 'irrallaan kilpaa juosten, kuin kaksi kirkasta emälehmää '
            + 'vasikkaansa nuollen, Vipas ja Sutudri syöksevät vetensä alas.',
          kuka: 'Rigveda 3.33.1',
          teos: 'The Hymns of the Rigveda, engl. Ralph T. H. Griffith',
          vuosi: 1896,
          suomennos: 'oma, Griffithin englanninnoksesta',
          linkki: 'https://en.wikisource.org/wiki/The_Hymns_of_the_Rigveda/Book_3/Hymn_33',
        },
        {
          tiedosto: 'SDHP-3510 Sutlej river gorge and rapids near Tattapani.jpg',
          selite: 'Sutlejin rotko Tattapanin lähellä Himachal Pradeshissa. Joki '
            + 'alkaa Tiibetin ylängöltä yli neljäntuhannen metrin korkeudelta '
            + 'ja leikkaa Himalajan poikki; uoma on siis vanhempi kuin sen '
            + 'läpäisemä vuoristo.',
          lahde: 'Wikimedia Commons (CC BY 4.0), VasuVR',
        },
        {
          teksti: 'Sopimus vedestä on yhä neuvottelukysymys. Vuoden 1960 '
            + 'Indus-sopimus jakoi kuusi jokea niin, että Sutlej, Beas ja '
            + 'Ravi jäivät Intialle ja kolme läntistä Pakistanille. Rajan '
            + 'alapuolella Sutlejin uoma on suuren osan vuodesta kuiva.',
        },
      ],
    },

    'Syr Darya': {
      kappaleet: [
        {
          teksti: 'Aleksanteri Suuri pysähtyi vuonna 329 eaa. joelle, jota hänen '
            + 'oppineensa pitivät Tanaiksena, samana virtana joka erottaa '
            + 'Euroopan ja Aasian ja laskee Mustanmeren pohjoispuolelle. '
            + 'Väärinkäsitys oli parintuhannen kilometrin kokoinen, ja '
            + 'Arrianos oikaisi sen viisisataa vuotta myöhemmin.',
        },
        {
          lainaus: 'Sieltä hän eteni Tanais-joelle. Tätä jokea kutsuvat '
            + 'naapurikansat Aristobuloksen mukaan toisella nimellä, '
            + 'Jaksartes. Sen täytyy olla eri Tanais kuin se, josta '
            + 'historioitsija Herodotos puhuu.',
          kuka: 'Arrianos',
          teos: 'Aleksanterin retki III.30, engl. E. J. Chinnock',
          vuosi: 'n. 150 jaa.',
          suomennos: 'oma, Chinnockin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/46976',
        },
        {
          tiedosto: 'Syr Darya Oblast. Crossing via the Syr Darya River WDL10988.png',
          selite: 'Lautta Syrdarjan yli. Kuva on Turkestanin albumista, jonka '
            + 'Venäjän kenraalikuvernööri teetti 1871-1872 juuri '
            + 'valloitetusta maasta; lauttapaikat olivat armeijan reittejä.',
          lahde: 'Wikimedia Commons (PD), Aleksandr Kun',
        },
        {
          teksti: 'Aleksanteri perusti rannalle kaupungin nimeltä Aleksandreia '
            + 'Eskhate, äärimmäinen Aleksandria. Se on nykyinen Hudžand '
            + 'Tadžikistanissa. Joki jäi rajaksi pitkäksi aikaa: sen takana '
            + 'alkoi aro, jota kreikkalaiset eivät yrittäneet.',
        },
      ],
    },

    Tajo: {
      kappaleet: [
        {
          teksti: 'Antiikin kirjoittajat tunsivat Tajon kultajokena, ja huhu oli '
            + 'tosi sen verran, että joen hiekasta huuhdottiin kultaa '
            + 'roomalaisajalle asti. Byron purjehti jokisuuhun 1809 ja käytti '
            + 'tarua sellaisenaan.',
        },
        {
          lainaus: 'Ja Tajo syöksyy eteenpäin syvyyteen viemään taruista kultaista '
            + 'veroaan.',
          kuka: 'Lord Byron',
          teos: 'Childe Harold\'s Pilgrimage I.14',
          vuosi: 1812,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/5131',
        },
        {
          tiedosto: 'Tagus River, sunrise next to Lisbon, 2009.jpg',
          selite: 'Tajon suu Lissabonin kohdalla. Sisämaassa jokisuu levenee '
            + 'altaaksi, jota kutsutaan Olkimereksi; kaupungin kohdalla '
            + 'kapeikkoa on runsaat kaksi kilometriä rannasta rantaan.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0 de), Avarim',
        },
        {
          teksti: 'Marraskuun 1. päivänä 1755 maa tärisi, ja lissabonilaiset '
            + 'pakenivat avoimelle rantatorille. Vesi vetäytyi ja paljasti '
            + 'satama-altaan pohjan, ja sitten se palasi kolmena aaltona. '
            + 'Kaupunki rakennettiin uudestaan suoraviivaiseksi ruudukoksi, '
            + 'joka on yhä pystyssä.',
        },
      ],
    },

    'Tapajós': {
      kappaleet: [
        {
          teksti: 'Henry Walter Bates asui Santarémissa kolme ja puoli vuotta ja '
            + 'teki sieltä retkiä ylös Tapajósia. Kaupunki on kirkasvetisen '
            + 'sivujoen ja savisen pääuoman kulmassa, ja Bates näki niiden '
            + 'rajan joka aamu ikkunastaan.',
        },
        {
          lainaus: 'Pääjoen valkoinen samea virta kulkee ylenkatseellisesti ohi ja '
            + 'täyttää lähes koko uoman leveyden, kun taas sivujoen tummempi '
            + 'vesi näyttää hiipivän rantaa pitkin eikä erotu enää neljän tai '
            + 'viiden mailin päässä suusta.',
          kuka: 'Henry Walter Bates',
          teos: 'The Naturalist on the River Amazons',
          vuosi: 1863,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/2440',
        },
        {
          teksti: 'Tapajósin latvoilla on nykyään soijaa. Santarémiin '
            + 'rakennettiin 2003 vientiterminaali, ja sen jälkeen sadat '
            + 'proomut ovat vieneet vuosittain miljoonia tonneja alavirtaan. '
            + 'Kuljetusreitti kulkee tarkalleen sitä uomaa, jota Bates '
            + 'souteli hyönteisverkkoineen.',
        },
        {
          tiedosto: 'Santarém May 2015-9a.jpg',
          selite: 'Santarém Tapajósin suulla. Raja näkyy yhä, mutta ei enää '
            + 'samana: Tapajósin vesi on 2000-luvulla samentunut, kun laiton '
            + 'kullankaivuu on nostanut lietettä yläjuoksulta.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Alvesgaspar',
        },
      ],
    },

    Tarim: {
      kappaleet: [
        {
          teksti: 'Tarim ei laske minnekään. Se kerää vetensä Taklamakanin '
            + 'ympärysvuorilta ja häviää autiomaan reunaan, missä sen pää on '
            + 'siirtynyt vuosisatojen kuluessa satoja kilometrejä. Sven Hedin '
            + 'kulki sen luo helmikuussa 1896 menetettyään edellisellä '
            + 'yrityksellä kaksi miestä ja koko karavaanin janoon.',
        },
        {
          lainaus: 'Ahmed oli ainakin rauhallinen mielessään, sillä hän oli tehnyt '
            + 'saman havainnon kuin minä: että autiomaan kaivojen vesi '
            + 'muuttuu suolaiseksi silloin, kun jokea lähestytään.',
          kuka: 'Sven Hedin',
          teos: 'Through Asia, osa II',
          vuosi: 1899,
          suomennos: 'oma',
          linkki: 'https://archive.org/details/throughasia02hedi_0',
        },
        {
          tiedosto: 'Tarim Desert Highway - Crossing the Tarim River, Xinjiang, China.jpg',
          selite: 'Autiomaan halki vedetty valtatie ylittää Tarimin. Tienvartta '
            + 'on istutettu kestävää pensasta ja kastellaan porakaivoista, '
            + 'jotta hiekka ei peitä asfalttia.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Yoshi Canopus',
        },
        {
          teksti: 'Vaeltavan pään takia myös kaupungit vaelsivat. Loulan '
            + 'hylättiin noin 300-luvulla, kun vesi lakkasi tulemasta, ja '
            + 'Hedin kaivoi sen raunioista 1900 puisia asiakirjoja, jotka '
            + 'kuivuus oli säilyttänyt.',
        },
      ],
    },

    Teslin: {
      kappaleet: [
        {
          teksti: 'Talvella 1898 Kanadan hallitus mainosti omaa reittiään '
            + 'Klondikeen: laivalla Stikine-joelle, sieltä maitse '
            + 'Teslinjärvelle ja järveltä jokea myöten kultakentille. Reitti '
            + 'kiersi Yhdysvaltain tullin, ja se oli koko pointti.',
        },
        {
          teksti: 'Polkua ei ollut. Viisituhatta ihmistä lähti liikkeelle, '
            + 'hevoset upposivat kevätkelirikkoon, ja luvattua rautatietä ei '
            + 'koskaan rakennettu. Suurin osa kääntyi takaisin tai päätyi '
            + 'lopulta samalle Chilkootin solalle, jota oli tullut '
            + 'väistämään.',
        },
        {
          tiedosto: 'Teslin-Yukon river 1988 1.jpg',
          selite: 'Teslin virtaa Yukoniin leveänä ja hitaana. Ne, jotka pääsivät '
            + 'järvelle asti, veistivät rannalla veneen ja odottivat jäiden '
            + 'lähtöä; matka Dawsoniin kesti siitä noin kaksi viikkoa.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Smiley.toerist',
        },
        {
          teksti: 'Tlingit-kauppiaat olivat käyttäneet samaa yhteyttä rannikolta '
            + 'sisämaahan vuosisatoja ja pitäneet siitä tarkkaa monopolia. '
            + 'Heidän jälkeläisensä Teslinissä ovat yhä sisämaan tlingitejä, '
            + 'vaikka kansan koti on meren rannalla.',
        },
      ],
    },

    Thames: {
      kappaleet: [
        {
          teksti: 'Vanha Lontoon silta seisoi yhdeksällätoista kapealla holvilla, '
            + 'jotka padottivat joen. Ylävirran puoli virtasi hitaasti ja '
            + 'jäätyi kylminä talvina umpeen. Jäälle rakennettiin katuja.',
        },
        {
          lainaus: 'Lontoon edustalla Thames oli yhä täynnä kojuja säännöllisinä '
            + 'katuina, kaikenlaisia kauppoja tavaroineen, jopa kirjapaino, '
            + 'jossa väki ja naiset innostuivat painattamaan nimensä sekä '
            + 'päivän ja vuoden, jona ne painettiin Thamesilla.',
          kuka: 'John Evelyn',
          teos: 'The Diary of John Evelyn, merkintä 24. tammikuuta 1684',
          vuosi: 1684,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/42081',
        },
        {
          tiedosto: 'Thomas Wyke- Thames frost fair.JPG',
          selite: 'Talven 1683-1684 jäämarkkinat. Uusi Lontoon silta valmistui '
            + '1831 ja poisti padon; virta nopeutui, ja penkereet kavensivat '
            + 'uoman. Joki ei ole sen jälkeen jäätynyt kaupungin kohdalla.',
          lahde: 'Wikimedia Commons (PD), Thomas Wyke',
        },
        {
          teksti: 'Kaksisataa vuotta myöhemmin vaiva oli päinvastainen. '
            + 'Kesäkuussa 1858 helle nosti viemäriksi muuttuneen joen hajun '
            + 'niin sietämättömäksi, että parlamentti keskeytti istuntonsa. '
            + 'Kolmessa viikossa se myönsi Joseph Bazalgettelle rahat '
            + 'viemäriverkkoon.',
        },
        {
          tiedosto: 'Caricature; Faraday giving his card to Father Thames. Wellcome M0012507.jpg',
          selite: 'Punchin pilakuva vuodelta 1855: Michael Faraday ojentaa '
            + 'käyntikorttinsa Isä Thamesille. Faraday oli kirjoittanut '
            + 'lehteen joen tilasta samana kesänä, ja kuva vastasi siihen.',
          lahde: 'Wikimedia Commons (PD), Wellcome Collection',
        },
      ],
    },

    Tigris: {
      kappaleet: [
        {
          teksti: 'Kymmenentuhatta kreikkalaista palkkasoturia vetäytyi vuonna '
            + '401 eaa. Babylonin luota pohjoiseen Tigrisin vartta. Matkalla '
            + 'he ohittivat kaksi hylättyä kaupunkia, joiden muurit olivat '
            + 'valtavat ja joiden nimeä paikalliset eivät osanneet selittää. '
            + 'Ksenofon kirjasi mitä kuuli.',
        },
        {
          lainaus: 'He saapuivat Tigris-joelle. Siellä he tulivat suurelle '
            + 'autiolle kaupungille, jonka nimi oli Larissa; siinä olivat '
            + 'muinoin asuneet meedialaiset.',
          kuka: 'Ksenofon',
          teos: 'Anabasis III.4, engl. H. G. Dakyns',
          vuosi: 'n. 370 eaa.',
          suomennos: 'oma, Dakynsin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/1170',
        },
        {
          teksti: 'Kaupungit olivat Niniven jäänteet. Assyrian pääkaupunki oli '
            + 'tuhottu 612 eaa., alle kahtasataa vuotta aiemmin, ja sen nimi '
            + 'oli jo kadonnut kulkijoiden mielestä. Ninive tunnistettiin '
            + 'uudelleen vasta 1840-luvulla, kun Austen Henry Layard avasi '
            + 'Tigrisin itärannan kummut.',
        },
        {
          tiedosto: 'Views along the river Tigris in Mosul in 2019 when Moslawis go during the summer to cool down 02.jpg',
          selite: 'Mosul Tigrisin länsirannalla. Ksenofonin näkemät muurit ovat '
            + 'vastarannalla kaupungin itäpuolella; Kujundžikin ja Nabi '
            + 'Junusin kummut ovat yhä siellä keskellä asutusta.',
          lahde: 'Wikimedia Commons (CC0), Levi Clancy',
        },
      ],
    },

    Tobol: {
      kappaleet: [
        {
          teksti: 'Vuonna 1581 Stroganovien palkkaama kasakkapäällikkö Jermak '
            + 'Timofejev ylitti Uralin ja laskeutui Turaa ja Tobolia alas. '
            + 'Retkikuntaa oli muutama sata miestä, ja sen ase oli tuliase; '
            + 'vastassa oli Kutšum-kaanin ratsuväki jousineen.',
        },
        {
          tiedosto: 'Vasily Surikov - Yermak\'s Conquest of Siberia - Google Art Project.jpg',
          selite: 'Vasili Surikovin maalaus vuodelta 1895. Surikov oli itse '
            + 'kasakkasukua Krasnojarskista. Savu on maalattu niin sakeaksi, '
            + 'ettei kumpaakaan puolta erota kunnolla, ja se on '
            + 'tarkoituksellista.',
          lahde: 'Wikimedia Commons (PD), Vasili Surikov',
        },
        {
          lainaus: 'Juuri tämä linnoitus, joka on aikaa sitten hävinnyt, antoi '
            + 'nimensä koko Aasian pohjoisosalle.',
          kuka: 'A. E. Nordenskiöld',
          teos: 'The Voyage of the Vega round Asia and Europe, engl. Alexander Leslie',
          vuosi: 1881,
          suomennos: 'oma, Leslien englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/24365',
        },
        {
          teksti: 'Linnoitus oli Sibir, ja se sijaitsi lähellä nykyistä Tobolskia '
            + 'Tobolin suulla. Jermak itse hukkui Irtyšiin kolme vuotta '
            + 'myöhemmin. Tobolskista tuli Siperian ensimmäinen pääkaupunki '
            + 'ja karkotettujen ensimmäinen etappi, ja siellä olivat myös '
            + 'rangaistuksen kirjat.',
        },
      ],
    },

    Tocantins: {
      kappaleet: [
        {
          teksti: 'Henry Walter Bates ja Alfred Russel Wallace lähtivät 26. '
            + 'elokuuta 1848 ensimmäiselle yhteiselle retkelleen Parásta ylös '
            + 'Tocantinsia. Vene kulki päiväkausia tulvakanavissa, joiden '
            + 'molemmin puolin seisoi vain palmuja, kunnes maa kääntyi ja '
            + 'aukesi.',
        },
        {
          lainaus: 'Tapauksen ilmoitti eräs intiaaneistamme, joka oli tähystämässä '
            + 'keulassa ja huusi: La está o Paraná-uassú. Katso, suuri joki. '
            + 'Se oli mahtava näky, leveä ulappa tummaa vettä tanssimassa '
            + 'tuulessa, ja vastaranta kapeana sinisenä viivana mailien '
            + 'päässä.',
          kuka: 'Henry Walter Bates',
          teos: 'The Naturalist on the River Amazons',
          vuosi: 1863,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/2440',
        },
        {
          teksti: 'Ylävirtaan he pääsivät noin kahtasataa kilometriä. Siitä '
            + 'alkoivat kosket, joita on Araguaian suulle asti viisitoista, '
            + 'ja niistä pahin oli nimeltään Inferno. Retki kääntyi takaisin '
            + 'syyskuussa, kun yksi miehistä sairastui.',
        },
        {
          tiedosto: 'Usina de Tucuruí.jpg',
          selite: 'Tucuruín pato valmistui 1984 juuri koskiosuuden alapäähän. '
            + 'Allas peitti runsaat kaksituhatta neliökilometriä metsää, ja '
            + 'sen alle jäivät myös kosket, joiden takia Bates ja Wallace '
            + 'kääntyivät.',
          lahde: 'Wikimedia Commons (CC BY 3.0 BR), Sócrates Arantes / Eletronorte',
        },
      ],
    },

    Tonava: {
      kappaleet: [
        {
          teksti: 'Herodotos halusi selittää, miksi Ister ei nouse eikä laske '
            + 'vuodenaikojen mukana niin kuin muut tuntemansa joet. Selitys, '
            + 'jonka hän keksi, on yksityiskohdissaan väärä ja rakenteeltaan '
            + 'oikea: kaksi vastakkaista voimaa kumoavat toisensa.',
        },
        {
          lainaus: 'Ister virtaa aina samalla korkeudella sekä kesällä että '
            + 'talvella. Talvella se on luonnollisessa koossaan, sillä tähän '
            + 'maahan sataa talvella vähän vettä mutta lakkaamatta lunta; '
            + 'kesällä taas talven lumi sulaa ja juoksee joka suunnalta '
            + 'Isteriin.',
          kuka: 'Herodotos',
          teos: 'Historiateos IV.50, engl. G. C. Macaulay 1890',
          vuosi: 'n. 430 eaa.',
          suomennos: 'oma, Macaulayn englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/2707',
        },
        {
          teksti: 'Alppien lumi ja Karpaattien kesäsateet tekevät suunnilleen '
            + 'sen, minkä Herodotos arvasi, vaikka hän uskoi auringon juovan '
            + 'jokea kesällä. Tasaisuus on suhteellista: Tonava tulvii '
            + 'keväällä, mutta se ei kuivu koskaan, ja siksi sitä on voinut '
            + 'kulkea ympäri vuoden.',
        },
        {
          tiedosto: 'Danube near Iron Gate 2006.JPG',
          selite: 'Rautaportti Serbian ja Romanian välissä. Kallionkielekkeet '
            + 'tekivät solasta vaarallisen, ja 1890-luvulla niihin '
            + 'räjäytettiin väylä. Vuoden 1972 pato nosti veden kymmeniä '
            + 'metrejä; kielekkeet ovat yhä sen alla.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Cornelius Bechtler',
        },
      ],
    },

    Ubangi: {
      kappaleet: [
        {
          teksti: 'Ubangi on tie, koska muuta ei ole. Keski-Afrikan tasavallan '
            + 'pääkaupunki Bangui perustettiin 1889 juuri siihen kohtaan, '
            + 'jossa kosket lopettavat laivaliikenteen, ja kaupungin nimi '
            + 'tarkoittaa koskia.',
        },
        {
          tiedosto: 'Oubangui (28604476433).jpg',
          selite: 'Ubangi Banguin kohdalla. Vastaranta on Kongon demokraattista '
            + 'tasavaltaa; kahden maan välillä ei ole tällä matkalla yhtään '
            + 'siltaa, ja ylitys tehdään lautalla tai ruuhella.',
          lahde: 'Wikimedia Commons (CC BY 2.0), adrienblanc',
        },
        {
          teksti: 'Kuivana aikana joki ei kanna. Vesi laskee tammikuusta '
            + 'huhtikuuhun niin alas, että proomut jäävät särkille, ja '
            + 'maalla, jonka teistä alle kymmenesosa on päällystetty, se '
            + 'tarkoittaa neljää kuukautta ilman tuontia.',
        },
        {
          teksti: 'Yläjuoksulla joki kulkee toisella nimellä. Uele ja Mbomu '
            + 'yhtyvät ja muuttuvat Ubangiksi; belgialaiset ja ranskalaiset '
            + 'sopivat 1894, että raja seuraa uomaa, ja se seuraa yhä.',
        },
      ],
    },

    Ucayali: {
      kappaleet: [
        {
          teksti: 'Amazon ei ala yhdestä lähteestä vaan kahden joen liitoksesta '
            + 'Nautan luona Perussa. Toinen on Marañón, toinen Ucayali. '
            + 'Luutnantti William Herndon saapui Ucayalin suulle syyskuussa '
            + '1851 mittaamaan sitä Yhdysvaltain laivaston laskuun.',
        },
        {
          lainaus: 'Se on kaunis virta, jonka rannat ovat suulla matalat ja '
            + 'viheriät. Mutta sen koko petti odotukseni: se ei ollut '
            + 'puoltakaan Amazonin levyinen. Se on pisin tunnettu sivujoki '
            + 'Brasilian yläpuolella, ja siksi jotkut kutsuvat sitä Amazonin '
            + 'päärungoksi.',
          kuka: 'William Lewis Herndon',
          teos: 'Exploration of the Valley of the Amazon, Part I',
          vuosi: 1854,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/57756',
        },
        {
          teksti: 'Riita on yhä auki. Pituudella mitattuna Ucayali voittaa, sillä '
            + 'Apurímacin latvoilta laskien sen uoma on selvästi pidempi. '
            + 'Virtaamalla mitattuna voittaa Marañón. Kysymys ei ratkea '
            + 'maastossa, koska se ei ole geologinen vaan sopimuskysymys.',
        },
        {
          tiedosto: 'ISS-45 StoryOfWater, Meandering River - Rio Ucayali.jpg',
          selite: 'Ucayali avaruusasemalta. Uoma siirtyy nopeammin kuin kartat '
            + 'ehtivät perässä: rannalla näkyy kymmeniä vanhoja mutkia, ja '
            + 'rantakylä voi jäädä vuosikymmenessä kilometrien päähän '
            + 'vedestä.',
          lahde: 'Wikimedia Commons (PD), NASA / Kjell Lindgren',
        },
      ],
    },

    Uele: {
      kappaleet: [
        {
          teksti: 'Saksalainen kasvitieteilijä Georg Schweinfurth ylitti '
            + 'maaliskuussa 1870 suuren joen, jota kukaan Euroopassa ei ollut '
            + 'merkinnyt kartalle. Hän mittasi sen leveydeksi kahdeksansataa '
            + 'jalkaa ja virtaamaksi kolminkertaisen määrän siihen jokeen '
            + 'nähden, jota pitkin oli tullut.',
        },
        {
          tiedosto: 'Map Ubangi-Uelle 1888.png',
          selite: 'Kartta vuodelta 1888, jolloin kysymys oli yhä auki. Uelen '
            + 'alajuoksu on piirretty katkoviivalla, ja sen jatkoksi on '
            + 'merkitty kaksi vaihtoehtoa: Ubangi etelään ja Shari '
            + 'luoteeseen.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          lainaus: 'Voidaan väittää, että Welle kuuluu Sharin vesistöön. Se, että '
            + 'Wellellä olisi yhteys Gazelleen ja siten Niiliin, on vastoin '
            + 'sekä yleistä käsitystä että joen rannoilla asuvien '
            + 'vahvistettuja kertomuksia.',
          kuka: 'Georg Schweinfurth',
          teos: 'The Heart of Africa, engl. Ellen E. Frewer',
          vuosi: 1873,
          suomennos: 'oma, Frewerin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/71621',
        },
        {
          teksti: 'Hän oli oikeassa siinä, ettei joki kuulu Niiliin, ja väärässä '
            + 'kaikessa muussa. Uele kääntyy länteen ja yhtyy Ubangiin, joka '
            + 'laskee Kongoon eikä Tšad-järveen. Asia ratkesi vasta 1887, kun '
            + 'belgialainen Alphonse van Gèle nousi Ubangia ylöspäin.',
        },
        {
          tiedosto: 'Uele river.jpg',
          selite: 'Uele Kongon pohjoisosassa. Joki kulkee koko matkansa '
            + 'ylätasangolla ja putoaa Ubangiin vasta lopussa, mikä on syy '
            + 'siihen, että sen suunta oli pitkään arvailun varassa.',
          lahde: 'Wikimedia Commons (CC BY-SA 2.0), Julien Harneis',
        },
      ],
    },

    Ural: {
      kappaleet: [
        {
          teksti: 'Uraljoki oli kasakoiden. Jaikin kasakat elivät sen varrella '
            + 'omana yhteisönään, kalastivat sammen ja päättivät itse, kuka '
            + 'sai kulkea alueensa läpi. Venäjän valtio siedettiin niin kauan '
            + 'kuin se maksoi ja pysyi kaukana.',
        },
        {
          lainaus: 'Jokainen etelään virtaavista joista, Dnepr, Don, Volga ja Jaik '
            + 'eli Ural, oli jonkin vapaakasakkayhteisön hallussa, eikä '
            + 'kenenkään, ei kristityn eikä tataarin, sallittu kulkea heidän '
            + 'alueensa läpi ilman heidän lupaansa.',
          kuka: 'Donald Mackenzie Wallace',
          teos: 'Russia',
          vuosi: 1905,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/1349',
        },
        {
          tiedosto: 'Ural River Atyrau.JPG',
          selite: 'Atyrau joen suulla Kaspianmerellä. Kaupunki on kahden maanosan '
            + 'kahta puolta: Uraljokea on totuttu pitämään Euroopan ja Aasian '
            + 'rajana tästä ylöspäin Uralvuorille asti.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Jemeljan Pugatšov nosti kasakat kapinaan 1773 ja hallitsi '
            + 'vuoden ajan aroa Volgan ja Uralin välissä. Kapinan kukistuttua '
            + 'Katariina II käski nimetä joen uudelleen. Jaik muuttui '
            + 'Uraliksi 1775, jotta nimi ei muistuttaisi tapahtuneesta.',
        },
      ],
    },

    Uruguay: {
      kappaleet: [
        {
          teksti: 'Río Uruguay on kirkas siellä missä Paraná on savinen, ja '
            + 'jokien vedet kohtaavat Río de la Platan yläpäässä. Darwin '
            + 'katsoi rajaa Punta Gordan niemeltä marraskuussa 1833.',
        },
        {
          lainaus: 'Tästä kohdasta Río Uruguay avautui eteemme jalona vesimääränä. '
            + 'Kirkkautensa ja nopeutensa vuoksi se näytti paljon paremmalta '
            + 'kuin naapurinsa Paraná. — Auringon paistaessa vesien kaksi '
            + 'väriä erottuivat aivan selvästi.',
          kuka: 'Charles Darwin',
          teos: 'The Voyage of the Beagle',
          vuosi: 1845,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/944',
        },
        {
          teksti: 'Joki on suurimman osan matkastaan valtakunnanraja, ja se on '
            + 'tehnyt siitä riidan paikan. Vuonna 2007 Fray Bentosiin '
            + 'valmistui suomalainen sellutehdas. Argentiina vei asian '
            + 'Haagiin ja hävisi 2010, ja sillat olivat sitä ennen '
            + 'suljettuina vuosia.',
        },
        {
          tiedosto: 'Río Uruguay - Salto, Uruguay.JPG',
          selite: 'Salton kaupunki sai nimensä koskesta, joka katkaisi '
            + 'laivaliikenteen. Koski jäi Salto Granden padon altaan alle, ja '
            + 'padon harjalla kulkee nyt tie Argentiinan ja Uruguayn välillä.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), ManuelaGB',
        },
      ],
    },

    Vaal: {
      kappaleet: [
        {
          teksti: 'Timantit löytyivät ensin joesta. Vuosina 1869 ja 1870 etsijät '
            + 'alkoivat penkoa Vaalin rantoja Hebronin ja Klipdriftin '
            + 'väliltä, ja monet ensimmäisistä kivistä ostettiin '
            + 'afrikkalaisilta, jotka olivat poimineet ne itse. Anthony '
            + 'Trollope kävi paikalla kahdeksan vuotta myöhemmin.',
        },
        {
          lainaus: 'Aluksi etsijät pysyttelivät enimmäkseen joen uomassa ja '
            + 'pikkuhaaroissa: he kaapivat soraa ja mutaa seuloihinsa, '
            + 'huuhtoivat hiekan pois ja käänsivät jäljelle jääneet kivet '
            + 'liuskepalalla laudalla nähdäkseen, oliko onni lähettänyt sinä '
            + 'aamuna joukkoon kimalluksen.',
          kuka: 'Anthony Trollope',
          teos: 'South Africa, osa II',
          vuosi: 1878,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/66343',
        },
        {
          teksti: 'Jokikaivokset jäivät pian sivujuonteeksi. Colesberg Kopjen '
            + 'kuivasta maasta löytyi enemmän, ja sinne nousi Kimberley. '
            + 'Klipdrift on nyt Barkly West ja ehti olla timanttimaan '
            + 'pääkaupunki kaksi vuotta.',
        },
        {
          tiedosto: 'SA1899 pg136 A Pont . Vaal River.jpg',
          selite: 'Lautta Vaalin yli vuonna 1899. Kahlaamo eli drift ratkaisi, '
            + 'mistä tiet kulkivat. Joen pohjoispuolinen valtio otti nimensä '
            + 'tästä uomasta: Transvaal on se, mikä on Vaalin takana.',
          lahde: 'Wikimedia Commons (PD)',
        },
      ],
    },

    Veiksel: {
      kappaleet: [
        {
          teksti: 'Puolan vilja ja puu kulkivat Gdańskiin Veikseliä myöten. '
            + 'Lauttamiehet sitoivat rungoista lautan Karpaattien juurella, '
            + 'lastasivat päälle viljasäkit ja lähtivät alavirtaan. Perillä '
            + 'myytiin sekä lasti että lautta.',
        },
        {
          tiedosto: 'Stryowski-Flisacy nad Wisla.jpg',
          selite: 'Wilhelm August Stryowski maalasi lauttamiehiä Gdańskissa '
            + '1800-luvulla. Miehet asuivat matkan ajan lautalle rakennetussa '
            + 'majassa. Paluu ylävirtaan tehtiin jalan.',
          lahde: 'Wikimedia Commons (PD), Wilhelm August Stryowski',
        },
        {
          teksti: 'Kauppa katkesi, kun Puola jaettiin. Kolme valtakuntaa asetti '
            + 'joelle rajat ja tullit, ja Gdańskin vilja-aitat tyhjenivät. '
            + 'Joki oli kokonaan yhden valtion sisällä vasta 1918.',
        },
        {
          teksti: 'Veiksel on Euroopan suurista joista vähiten suoristettu. '
            + 'Alajuoksulla on yksi pato, Włocławek vuodelta 1970; muualla '
            + 'uoma vaeltaa hiekkasärkkiensä välissä kuten ennenkin, ja '
            + 'saarilla pesii lintuja, jotka ovat muualta kadonneet.',
        },
      ],
    },

    Vienanjoki: {
      kappaleet: [
        {
          teksti: 'Vienanjoen suulla oli 1500-luvulla Venäjän ainoa satama, jonka '
            + 'ja meren välissä ei ollut toista valtaa. Englantilaiset '
            + 'löysivät sen 1553 etsiessään koillisväylää Kiinaan. Anthony '
            + 'Jenkinson nousi jokea Vologdaan 1557.',
        },
        {
          lainaus: 'Koko matkalla en kertaakaan tullut taloon sisälle vaan yövyin '
            + 'erämaassa joen rannalla ja kannoin eväät mukanani. Sen, joka '
            + 'aikoo kulkea noita teitä, täytyy ottaa mukaan kirves, '
            + 'tuluskukkaro ja pata, jotta saa tulen ja voi keittää ruokansa.',
          kuka: 'Anthony Jenkinson',
          teos: 'The first voyage made by Master Anthonie Ienkinson, 1557, kokoelmassa Richard Hakluyt, The Principal Navigations, osa 3',
          vuosi: 1557,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/7476',
        },
        {
          tiedosto: 'Arkhangelsk. Northern Dvina River P7151096 2200.jpg',
          selite: 'Arkangeli Vienanjoen rannalla. Satama jäätyy puoleksi '
            + 'vuodeksi. Pietarin perustaminen 1703 vei kaupalta merkityksen, '
            + 'ja tsaari rajoitti määräajaksi viennin täältä pakottaakseen '
            + 'liikenteen uuteen kaupunkiin.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Alexxx1979',
        },
        {
          teksti: 'Sota palautti reitin käyttöön. Talvella 1915-1916 Arkangelin '
            + 'rata levennettiin normaaliraiteiseksi ja liittoutuneiden '
            + 'laivat toivat sinne aseita, koska Itämeri ja Mustameri olivat '
            + 'suljetut. Sama toistui 1941.',
        },
      ],
    },

    Vilyuy: {
      kappaleet: [
        {
          teksti: 'Nikolai Tšernyševski, jonka romaania Mitä on tehtävä luettiin '
            + 'salaa jokaisessa venäläisessä opiskelijakamarissa, istui '
            + 'vuodesta 1872 vuoteen 1883 Viljuiskin puisessa vankilassa. '
            + 'Kaupungissa oli muutama sata asukasta ja lähin muu kaupunki '
            + 'lähes kuudensadan kilometrin päässä.',
        },
        {
          tiedosto: 'Vilyuy River.jpg',
          selite: 'Viljui on Lenan pisin sivujoki. Uoma on leveä ja matala, ja '
            + 'laivakausi kestää kesäkuusta syyskuuhun; muun vuoden joki on '
            + 'tie vain sikäli kuin jää kantaa kuorma-auton.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Staselnik',
        },
        {
          teksti: 'Seitsemänkymmentä vuotta myöhemmin samalta valuma-alueelta '
            + 'etsittiin muuta. Geologi Larisa Popugajeva oli osoittanut, '
            + 'että kimberliitin voi jäljittää puronpohjan pyroopinjyvistä '
            + 'ylävirtaan; kesäkuussa 1955 löytyi putki, jonka päälle '
            + 'rakennettiin Mirnyin kaupunki.',
        },
        {
          tiedosto: 'Diamond mine. Mirny in Yakutia. 01.jpg',
          selite: 'Mirin kaivos. Kuoppa ulottuu runsaan viidensadan metrin '
            + 'syvyyteen, ja avolouhinta lopetettiin 2001. Ikirouta ulottuu '
            + 'täällä satojen metrien syvyyteen, mikä pitää seinämät '
            + 'pystyssä.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Staselnik',
        },
      ],
    },

    Volta: {
      kappaleet: [
        {
          teksti: 'Britit polttivat Kumasin 1874 ja marssivat sinne rannikolta. '
            + 'Kun seuraavaa sotaa alettiin suunnitella, katse kääntyi '
            + 'jokeen: A. B. Ellis, upseeri Länsi-Intian rykmentissä, '
            + 'kirjoitti asian ulos suoraan.',
        },
        {
          lainaus: 'Siinä kovin valitettavassa tapauksessa, että Ashantin kanssa '
            + 'vielä jouduttaisiin vihollisuuksiin, viimeaikaiset '
            + 'tutkimusmatkat näyttävät osoittavan, että Voltajoki on oikea '
            + 'tukikohta operaatioille.',
          kuka: 'A. B. Ellis',
          teos: 'The Land of Fetish',
          vuosi: 1883,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/65997',
        },
        {
          teksti: 'Höyryvene oli juuri ylittänyt kosket ensimmäisen kerran, ja se '
            + 'muutti joen mitan: mikä oli ollut kaupparaja, oli nyt reitti. '
            + 'Ashantin valtakunta liitettiin siirtomaahan 1902.',
        },
        {
          tiedosto: 'Akosombo dam spilling water.JPG',
          selite: 'Akosombon pato juoksuttaa ylivuotoa. Altaan alle jäi '
            + 'kahdeksankymmentätuhatta ihmistä ja yli seitsemänsataa kylää; '
            + 'sähkö vietiin alusta asti pääosin yhdelle alumiinisulatolle.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), ZSM',
        },
      ],
    },

    Xi: {
      kappaleet: [
        {
          teksti: 'Vuodesta 1757 vuoteen 1842 ulkomaalainen sai käydä kauppaa '
            + 'Kiinassa yhdessä paikassa: Kantonissa, tämän joen suistossa. '
            + 'Tee, silkki ja posliini tulivat sisämaasta Xijiangia myöten, '
            + 'ja hopea kulki vastaan.',
        },
        {
          teksti: 'Järjestely kaatui oopiumiin. Kun Britannia alkoi maksaa teensä '
            + 'Intiassa kasvatetulla oopiumilla, hopea kääntyi virtaamaan '
            + 'poispäin, ja Kiinan yritys pysäyttää kauppa johti sotaan ja '
            + 'Hongkongin luovuttamiseen.',
        },
        {
          tiedosto: '2014 NASA Earth Observatory image of Pearl River Delta.jpg',
          selite: 'Helmijoen suisto satelliitista. Harmaa alue on yhtenäistä '
            + 'kaupunkia: Guangzhou, Shenzhen, Dongguan, Foshan, Hongkong ja '
            + 'Macao ovat kasvaneet kiinni toisiinsa.',
          lahde: 'Wikimedia Commons (PD), NASA Earth Observatory',
        },
        {
          teksti: 'Suistossa asuu nyt enemmän ihmisiä kuin useimmissa maissa. Se '
            + 'on myös vajoamassa: pohjaveden otto ja rakennusten paino '
            + 'painavat maata alas nopeammin kuin merenpinta nousee.',
        },
      ],
    },

    Xingu: {
      kappaleet: [
        {
          teksti: 'Xingu putoaa Brasilian ylätasangolta Amazonin tasangolle noin '
            + 'sadan kilometrin matkalla, ja se osuus tunnetaan nimellä Volta '
            + 'Grande, suuri mutka. Vesi hajoaa siinä satoihin uomiin '
            + 'kallioluotojen väliin, eikä kelpaa veneelle kuin '
            + 'paikalliselle.',
        },
        {
          tiedosto: 'Rio Xingu, Altamira-PA.png',
          selite: 'Volta Grande Altamiran alapuolella satelliitista. Kuivalla '
            + 'kaudella luodot nousevat esiin ja uomat erottuvat toisistaan; '
            + 'tulva-aikaan koko leveys on yhtä vettä.',
          lahde: 'Wikimedia Commons (CC BY-SA 2.0), INPE',
        },
        {
          teksti: 'Kallioiden koloissa elää kalalajeja, joita ei tunneta muualta. '
            + 'Yksi niistä, zebra-plekostomus, päätyi 1990-luvulla '
            + 'akvaariokauppaan niin nopeasti, että Brasilia kielsi sen '
            + 'viennin ennen kuin lajin elintavat oli kuvattu.',
        },
        {
          teksti: 'Belo Monten voimalaitos avattiin 2016. Se ohjaa suuren osan '
            + 'vedestä kanavaan ja jättää Volta Granden omaan uomaansa '
            + 'säädellyn osuuden. Kayapót ja juruna vastustivat hanketta '
            + 'kolmekymmentä vuotta, ja riita vesimääristä jatkuu oikeudessa.',
        },
      ],
    },

    Yamuna: {
      kappaleet: [
        {
          teksti: 'Taj Mahal on rakennettu Yamunan penkalle niin, että joki tekee '
            + 'sille peilin. Rakennus nousee vedestä ilman puutarhaa '
            + 'takanaan, ja tyynenä aamuna se näkyy kahtena. Puutarha on '
            + 'toisella puolella, tulosuunnassa, jotta kulkija näkee sen '
            + 'ensin kokonaan.',
        },
        {
          tiedosto: '-The Taj Mahal from the Banks of the Yamuna River- MET DP143011.jpg',
          selite: 'John Murrayn valokuva 1850-luvulta, otettuna joen penkalta. '
            + 'Vettä oli silloin ympäri vuoden. Nykyään Yamuna on Agran '
            + 'kohdalla kuivimpina kuukausina lähes tyhjä, koska vesi otetaan '
            + 'yläpuolella.',
          lahde: 'Wikimedia Commons (CC0), John Murray',
        },
        {
          teksti: 'Vastarannalla on tyhjä terassi. Mehtab Bagh kaivettiin esiin '
            + '1990-luvulla, ja se osoittautui kuutamopuutarhaksi, joka oli '
            + 'suunniteltu pelkäksi katselupaikaksi. Tarina toiselle rannalle '
            + 'aiotusta mustasta marmorimausoleumista on myöhempi ja '
            + 'ilmeisesti keksitty.',
        },
        {
          teksti: 'Delhissä joki saa kaupungin jätevedet. Runsaan kahdenkymmenen '
            + 'kilometrin osuus tuottaa valtaosan koko joen kuormasta. '
            + 'Puhdistusohjelma alkoi 1993 ja jatkuu.',
        },
      ],
    },

    Yukon: {
      kappaleet: [
        {
          teksti: 'Frederick Schwatka lähti kesällä 1883 latvajärviltä alavirtaan '
            + 'lautalla, jonka hänen miehensä kaatoivat ja sitoivat rannalla. '
            + 'Kartoitettavaa oli runsaat kaksituhatta kilometriä, eikä '
            + 'kukaan ulkopuolinen ollut kulkenut jokea päästä päähän.',
        },
        {
          tiedosto: 'Five Finger Rapids island, Yukon, ca. 1899 - DPLA - d6c77ff606e121c7bb3237c810e052c0.jpg',
          selite: 'Viiden sormen kosket, joissa neljä kalliopaadetta jakaa joen '
            + 'viideksi väyläksi. Vain itäisin on kuljettava. Kultaryntäyksen '
            + 'höyrylaivat vinssattiin siitä ylös kallioon pultattua vaijeria '
            + 'pitkin.',
          lahde: 'Wikimedia Commons (PD), Arthur C. Pillsbury',
        },
        {
          lainaus: 'Lautta on epäilemättä vanhin yhä käytössä oleva kulkuneuvo '
            + 'vedessä ja epäilemättä huonoin. On kiinnostavaa tietää, kuinka '
            + 'hyödyllinen lautta voi olla maantieteellisen tutkimuksen '
            + 'apuna, ja oma lauttamatkani oli kyllä riittävän pitkä '
            + 'koetteeksi.',
          kuka: 'Frederick Schwatka',
          teos: 'Along Alaska\'s Great River',
          vuosi: 1885,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/47402',
        },
        {
          teksti: 'Neljätoista vuotta myöhemmin Bonanza Creekiltä löytyi kultaa, '
            + 'ja samaa reittiä tuli kymmeniätuhansia ihmisiä. Dawsonista '
            + 'kasvoi vuodessa alueen suurin kaupunki, ja se tyhjeni yhtä '
            + 'nopeasti. Joki oli koko ajan ainoa tie sisään ja ulos.',
        },
      ],
    },
  },
  jarvet: {

    'Albertjärvi': {
      kappaleet: [
        {
          teksti: 'Samuel Baker ja Florence Baker nousivat jyrkänteen reunalle '
            + '14. maaliskuuta 1864. Florence oli muutamaa viikkoa aiemmin '
            + 'maannut päiviä tajuttomana auringonpistoksesta, ja Samuel oli '
            + 'jo kaivattanut hänelle haudan.',
        },
        {
          lainaus: 'Kiiruhdin harjanteelle. Palkintomme loisto puhkesi äkkiä '
            + 'eteeni. Siellä lepäsi kaukana allani kuin elohopeameri '
            + 'suunnaton vesi — etelässä ja lounaassa rajaton '
            + 'merenhorisontti, kimallellen keskipäivän auringossa.',
          kuka: 'Samuel White Baker',
          teos: 'The Albert N\'yanza, Great Basin of the Nile',
          vuosi: 1866,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/3668',
        },
        {
          tiedosto: 'Albertsee-Albertnil.jpg',
          selite: 'Albertinjärvi ja Albert-Niilin lähtökohta. Järvi on '
            + 'hautavajoaman pohjalla: itärannan takana nousee Ugandan '
            + 'ylänkö, länsirannalla nousevat Kongon vuoret yli kilometrin '
            + 'järven pinnan yläpuolelle.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Albert Backer',
        },
        {
          teksti: 'Baker antoi järvelle kuningattaren kuolleen puolison nimen. '
            + 'Paikallinen nimi oli Mwitanzige, heinäsirkkojen tappaja. '
            + 'Florence puolestaan oli ostettu orjahuutokaupasta Vidinissä '
            + '1859, ja hän käveli koko matkan.',
        },
      ],
    },

    'Eriejärvi': {
      kappaleet: [
        {
          teksti: 'Oliver Hazard Perry rakennutti laivastonsa Presque Islessä '
            + 'vihreästä puusta, joka kaadettiin metsästä samana keväänä. '
            + 'Syyskuun 10. päivänä 1813 hänen lippulaivansa ammuttiin '
            + 'toimintakyvyttömäksi, ja hän soudutti itsensä toiseen alukseen '
            + 'kesken taistelun.',
        },
        {
          lainaus: 'Olemme kohdanneet vihollisen ja ne ovat meidän: kaksi laivaa, '
            + 'kaksi prikiä, yksi kuunari ja yksi sluuppi.',
          kuka: 'Oliver Hazard Perry',
          teos: 'kenttäviesti kenraali William Henry Harrisonille, siteerattuna teoksessa James Barnes, Naval Actions of the War of 1812',
          vuosi: 1813,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/57889',
        },
        {
          tiedosto: 'Battle of Lake Erie - painted by W.H. Powell. LCCN2007683561.jpg',
          selite: 'William Powellin näkemys Perrystä soutuveneessä, painettuna '
            + 'vuonna 1877. Taistelu ratkaisi, kummalle puolelle järven '
            + 'pohjoisranta jäi, ja siitä tuli Yhdysvalloissa yksi harvoista '
            + 'sodan muistetuista voitoista.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Erie on Suurista järvistä matalin, ja siksi myös herkin. '
            + 'Fosfori pelloilta ja viemäreistä sai 1960-luvulla vesimassan '
            + 'happikadolle, ja lehdissä puhuttiin kuolleesta järvestä. '
            + 'Rajoitukset auttoivat; hapeton pohjakerros palaa silti joka '
            + 'kesä.',
        },
      ],
    },

    'Etelä-Araljärvi': {
      kappaleet: [
        {
          teksti: 'Amudarja ei enää 1980-luvulla yltänyt Araliin asti. Vesi oli '
            + 'otettu matkalla puuvillapelloille, ja pelkkä Karakumin kanava '
            + 'johtaa siitä osan Turkmenistanin poikki ja vuotaa hiekkaan sen '
            + 'mukana.',
        },
        {
          tiedosto: 'Moynaq, Aral Sea (6226842732).jpg',
          selite: 'Kalastusaluksia Mo\'ynoqissa. Kaupunki oli 1960-luvulla '
            + 'kalasatama, jossa purettiin kymmeniätuhansia tonneja kalaa '
            + 'vuodessa. Vesi on nyt yli sadan kilometrin päässä.',
          lahde: 'Wikimedia Commons (CC BY 2.0), Arian Zwegers',
        },
        {
          teksti: 'Eteläinen allas jakautui kahtia ja itäinen puolisko kuivui '
            + 'kokonaan kesällä 2014. Pohjalle jäi Aralkum, uusi autiomaa, '
            + 'jonka suolapölyä tuuli kantaa satojen kilometrien päähän '
            + 'pelloille ja keuhkoihin.',
        },
        {
          teksti: 'Vozroždenijan saari oli Neuvostoliiton biologisen aseen '
            + 'koekenttä. Kun vesi laski, se yhtyi mantereeseen, ja '
            + 'hautapaikat oli käytävä puhdistamassa vuonna 2002 ennen kuin '
            + 'joku kävelisi niiden yli.',
        },
      ],
    },

    'Georgian Bay': {
      kappaleet: [
        {
          teksti: 'Itärannan edessä on saaria noin kolmekymmentätuhatta. Ne ovat '
            + 'Kanadan kilven silotettuja kallioselkiä, ja niillä kasvavaa '
            + 'vääntynyttä mäntyä on maalattu niin usein, että siitä tuli '
            + 'maan kansallinen maisema.',
        },
        {
          tiedosto: 'Windswept pine on Georgian Bay.jpg',
          selite: 'Tuulen taivuttama mänty Georgianlahden kalliolla. Frederick '
            + 'Varley maalasi vuonna 1921 tästä maisemasta teoksen Stormy '
            + 'Weather, Georgian Bay, ja siitä tuli Seitsemän ryhmän '
            + 'tunnusmerkki.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Lahti on niin suuri, että sitä kutsuttiin pitkään kuudenneksi '
            + 'Suureksi järveksi. Se on kokonaan Kanadan puolella, ja sen '
            + 'erottavat Huronista vain Bruce-niemi ja Manitoulin, maailman '
            + 'suurin järvisaari.',
        },
        {
          teksti: 'Manitoulinilla on kuusi anishinaabe-yhteisöä. Wiikwemkoong ei '
            + 'allekirjoittanut vuoden 1862 luovutussopimusta, ja se on siksi '
            + 'yhä virallisesti luovuttamatonta maata — ainoa laatuaan '
            + 'Ontariossa.',
        },
      ],
    },

    'Great Bear Lake': {
      kappaleet: [
        {
          teksti: 'John Franklinin retkikunta talvehti järven rannalla 1825 ja '
            + '1826 ja rakensi sinne Fort Franklinin. John Richardson mittasi '
            + 'lahdet ja nimesi ne Hudson\'s Bay Companyn herrojen mukaan. '
            + 'Yhtä asiaa hän ei saanut mitatuksi.',
        },
        {
          lainaus: 'Järven vedet ovat hyvin kirkkaat ja syvyydeltään '
            + 'tuntemattomat; MacTavishin lahdella laskettiin lähellä rantaa '
            + 'neljäkymmentä syltä luotinuoraa pohjaan osumatta.',
          kuka: 'John Richardson, John Franklinin kirjaamana',
          teos: 'Narrative of a Second Expedition to the Shores of the Polar Sea',
          vuosi: 1828,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/33467',
        },
        {
          tiedosto: 'Port Radium in 1936.jpg',
          selite: 'Port Radium järven itärannalla vuonna 1936. Kaivos otti ensin '
            + 'radiumia, sitten uraania. Dene-miehet kantoivat malmisäkkejä '
            + 'laivoihin ilman suojaimia, eikä heille kerrottu mitä säkeissä '
            + 'oli.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Osa Port Radiumin uraanista päätyi Yhdysvaltain '
            + 'pommiohjelmaan. Délinen kylä lähetti vuonna 1998 valtuuskunnan '
            + 'Hiroshimaan pyytämään anteeksi asiaa, josta se ei ollut '
            + 'tiennyt mitään.',
        },
      ],
    },

    'Great Slave Lake': {
      kappaleet: [
        {
          teksti: 'Nimi on käännöksen jälki. Cree-kansa kutsui pohjoisia '
            + 'naapureitaan sanalla, jonka turkiskauppiaat käänsivät orjiksi, '
            + 'ja se jäi englannin kieleen sekä järven että ihmisten nimeksi. '
            + 'Slaveyn kielellä järvi on Tucho, iso vesi.',
        },
        {
          tiedosto: 'UtsingiPoint-GreatSlaveLake.JPG',
          selite: 'Utsingi Point järven itähaarassa. Tässä loppuu Kanadan kilpi, '
            + 'kahden miljardin vuoden ikäinen kallio. Länsipuolella alkaa '
            + 'pehmeä sedimenttimaa, ja siksi järven kaksi päätä näyttävät '
            + 'eri järviltä.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Samuel Hearne kulki etelärantaa tammikuussa 1772 matkalla '
            + 'takaisin Hudsoninlahdelle. Hänen seuralaisensa löysivät '
            + 'metsästysretkellä vieraan lumikengän jäljen, seurasivat sitä '
            + 'ja tulivat majalle, jossa istui yksin nuori nainen.',
        },
        {
          lainaus: 'Hänen laskemistaan kuukausista päätellen hän oli ollut lähes '
            + 'seitsemän kuukautta näkemättä ihmiskasvoja, ja koko sen ajan '
            + 'hän oli elättänyt itsensä hyvin pyydystämällä ansoilla '
            + 'riekkoja, jäniksiä ja oravia.',
          kuka: 'Samuel Hearne',
          teos: 'A Journey from Prince of Wales\'s Fort in Hudson\'s Bay to the Northern Ocean, toim. J. B. Tyrrell',
          vuosi: 1911,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/38404',
        },
      ],
    },

    'Huronjärvi': {
      kappaleet: [
        {
          teksti: 'Järvi kantaa lempinimeä. Ranskalaiset kutsuivat kaakkoisrannan '
            + 'wendat-kansaa nimellä huron, joka tarkoitti karkeaa tukkaa ja '
            + 'karkeaa ihmistä. Kansa itse sanoi olevansa wendat, saaren '
            + 'asukkaat.',
        },
        {
          teksti: 'Samuel de Champlain tuli tänne vuonna 1615 Ottawa- ja '
            + 'French-jokia pitkin ja merkitsi järven karttaansa nimellä Mer '
            + 'Douce, makea meri. Hän talvehti wendatien luona ja tuli '
            + 'riippuvaiseksi heidän maissistaan.',
        },
        {
          tiedosto: 'Lake Huron from Upper Peninsula.JPG',
          selite: 'Huronjärveä ylemmältä niemimaalta. Järvi on Michiganjärven '
            + 'kanssa samaa vettä: Mackinacin salmi on niin leveä ja syvä, '
            + 'että pinta on molemmissa sentilleen sama ja vesi kulkee '
            + 'edestakaisin.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), NarparMI',
        },
        {
          teksti: 'Wendake hajotettiin vuosina 1649 ja 1650 irokeesien '
            + 'hyökkäyksissä ja niitä edeltäneissä kulkutaudeissa. Jäljelle '
            + 'jääneet asettuivat Quebecin liepeille ja Oklahomaan, missä '
            + 'heidän jälkeläisensä asuvat yhä.',
        },
      ],
    },

    'Issyk-Kul': {
      kappaleet: [
        {
          teksti: 'Kiinalainen munkki Xuanzang ylitti Tienšanin vuoden 630 '
            + 'tienoilla matkallaan Intiaan hakemaan buddhalaisia '
            + 'kirjoituksia. Jäisen solan jälkeen hän tuli järvelle ja '
            + 'kirjasi mitä siitä kerrottiin.',
        },
        {
          lainaus: 'Lohikäärmeet ja kalat asuvat siinä yhdessä. Toisinaan '
            + 'suomupetoja nousee pintaan, ja ohikulkevat matkalaiset '
            + 'esittävät silloin rukouksia hyvän onnen puolesta. Vaikka '
            + 'vesieläimiä on paljon, kukaan ei uskalla pyydystää niitä.',
          kuka: 'Xuanzang',
          teos: 'Si-yu-ki: Buddhist Records of the Western World, engl. Samuel Beal 1884',
          vuosi: 'n. 646',
          suomennos: 'oma, Bealin englanninnoksesta',
          linkki: 'https://archive.org/details/siyukibuddhistre01hsua',
        },
        {
          tiedosto: 'Lob Issyk-Kul-04.JPG',
          selite: 'Ysyk-Köl ja Tienšanin harjanne. Nimi tarkoittaa kuumaa järveä, '
            + 'vaikka vesi on kylmää. Se ei silti jäädy: vesi on lievästi '
            + 'suolaista ja lähes seitsemänsataa metriä syvää.',
          lahde: 'Wikimedia Commons (CC0), Vladimir Lobatšev',
        },
        {
          teksti: 'Sukeltajat ovat löytäneet rantavedestä muureja, ruukkuja ja '
            + 'hautoja. Pinta on vaihdellut vuosituhansien mittaan kymmeniä '
            + 'metrejä, ja jokainen lasku on jättänyt rannalle kylän, jonka '
            + 'seuraava nousu peitti.',
        },
      ],
    },

    Laatokka: {
      kappaleet: [
        {
          teksti: 'Vuoksen varrella oli järvi nimeltä Suvanto, ja sen ja Laatokan '
            + 'välissä oli Taipaleen kylän kohdalla kolmensadan metrin '
            + 'hiekkaharju. Laatokan pinta oli harjun toisella puolen '
            + 'kaksitoista metriä alempana.',
        },
        {
          teksti: 'Keväällä 1818 Suvannon vesi nousi niityille. Taipaleen miehet '
            + 'ottivat lapiot ja kaivoivat harjun poikki pienen uran '
            + 'laskeakseen vettä hiukan. Sitten he menivät tyytyväisinä '
            + 'kotiin.',
        },
        {
          tiedosto: 'Шхеры, Ладога, северная часть.jpg',
          selite: 'Laatokan pohjoisosan luotoja. Pohjoisranta on kallioista '
            + 'saaristoa, eteläranta matalaa hiekkaa ja ruovikkoa — sama '
            + 'järvi näyttää päistään kahdelta eri maalta.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Grozovsky',
        },
        {
          teksti: 'Ura leveni yössä koskeksi, koski putoukseksi. Suvanto tyhjeni '
            + 'vuorokaudessa, vei mukanaan taloja ja satavuotisia honkia, ja '
            + 'jätti jälkeensä joen entisen järven pohjalle. Kalat jäivät '
            + 'kuoppiin ja ne poimittiin käsin.',
        },
      ],
    },

    'Lac Moeru': {
      kappaleet: [
        {
          teksti: 'David Livingstone tuli Mwerun pohjoisrannalle marraskuussa '
            + '1867 ilman kantajia ja ilman lääkelaukkuaan, joka oli '
            + 'varastettu. Häntä oli yhdeksän miestä. He nukkuivat kalastajan '
            + 'majassa ja ostivat aamulla kalan.',
        },
        {
          teksti: 'Seuraavina päivinä hän kulki itärantaa ja kirjasi ylös sen, '
            + 'minkä kalastajat hänelle kertoivat. Se ei ollut hänen '
            + 'etsimänsä asia, mutta hän merkitsi sen muistiin yhtä '
            + 'huolellisesti.',
        },
        {
          lainaus: 'Kalastajat antoivat meille järven kolmenkymmenenyhdeksän '
            + 'kalalajin nimet; he sanoivat, etteivät kalat lakkaa koskaan '
            + 'nousemasta Kalongosia ylös, vaikka niitä toisinaan on '
            + 'runsaammin kuin toisinaan.',
          kuka: 'David Livingstone',
          teos: 'The Last Journals of David Livingstone in Central Africa, osa 1, toim. Horace Waller',
          vuosi: 1874,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/16672',
        },
        {
          tiedosto: 'Lake Mweru.jpg',
          selite: 'Mwerujärvi Sambian puolelta. Luapula laskee etelästä ja lähtee '
            + 'pohjoisesta Luvualla. Livingstone uskoi kulkevansa Niilin '
            + 'latvoilla; vesi menee Kongoon ja Atlantille.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Makandwe Mwape',
        },
      ],
    },

    'Lake Athabasca': {
      kappaleet: [
        {
          teksti: 'Fort Chipewyan perustettiin järven rannalle vuonna 1788, ja '
            + 'siitä tuli turkiskaupan solmu koko luoteiseen. Alexander '
            + 'Mackenzie lähti sieltä 3. kesäkuuta 1789 etsimään jokea '
            + 'Tyynellemerelle.',
        },
        {
          lainaus: 'Miehistöön kuului neljä kanadalaista, joista kahdella oli '
            + 'vaimo mukanaan, sekä yksi saksalainen; seuranamme oli myös '
            + 'intiaani, joka oli saanut arvonimen Englantilainen päällikkö, '
            + 'ja hänen kaksi vaimoaan.',
          kuka: 'Alexander Mackenzie',
          teos: 'Voyages from Montreal Through the Continent of North America, osa 1',
          vuosi: 1801,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/35658',
        },
        {
          teksti: 'Joki vei pohjoiseen eikä länteen, ja Mackenzie palasi '
            + 'Jäämereltä pettyneenä. Hän kutsui löytöään Pettymyksen joeksi. '
            + 'Se kantaa nykyään hänen nimeään ja on Pohjois-Amerikan '
            + 'toiseksi pisin.',
        },
        {
          tiedosto: 'Sand Dunes at Lake Athabasca.jpg',
          selite: 'Athabascan etelärannan dyynit, maailman pohjoisin laaja '
            + 'dyynikenttä. Hiekka on jääkauden sulamisvesien tuomaa, ja '
            + 'tuuli siirtää harjanteita yhä. Kymmenkunta kasvilajia kasvaa '
            + 'vain täällä.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), DSyl',
        },
      ],
    },

    'Lake Balkhash': {
      kappaleet: [
        {
          teksti: 'Vuonna 1253 flaamilainen fransiskaani Vilhelm Rubrukilainen '
            + 'kulki Ranskan kuninkaan lähettiläänä kohti Karakorumia. Ilin '
            + 'laakson jälkeen hänen edessään avautui tasanko, ja vasemmalla '
            + 'oli vettä.',
        },
        {
          lainaus: 'Astuimme mitä kauneimmalle tasangolle: oikealla kädellämme '
            + 'korkeat vuoret, vasemmalla meri tai järvi, jonka ympäri kuluu '
            + 'viisitoista päivämatkaa. Koko tuota tasankoa kastelevat '
            + 'vuorilta valuvat purot, jotka kaikki laskevat järveen.',
          kuka: 'Vilhelm Rubrukilainen',
          teos: 'Itinerarium, engl. Richard Hakluyt 1598; siteerattuna Eugene Schuylerin teoksessa Turkistan (1877)',
          vuosi: 1253,
          suomennos: 'oma, Hakluytin englanninnoksesta',
          linkki: 'https://archive.org/details/turkistannotesof01schu',
        },
        {
          tiedosto: 'Lake Balkhash by Landsat 8.jpg',
          selite: 'Balkaš satelliitista. Läntinen puolisko on makeaa vettä, '
            + 'itäinen suolaista, ja niitä yhdistää vain kilometrien levyinen '
            + 'salmi. Väriraja näkyy kuvassa keskellä järveä.',
          lahde: 'Wikimedia Commons (PD), NASA / Landsat 8',
        },
        {
          teksti: 'Vedet tulevat yhä vuorilta, mutta suurin osa niistä otetaan '
            + 'matkalla. Ili tuo neljä viidesosaa tulovirrasta, ja se '
            + 'padottiin 1970 Kaptšagaihin; pinta laski parissa '
            + 'vuosikymmenessä yli kaksi metriä.',
        },
      ],
    },

    'Lake Eyre North': {
      kappaleet: [
        {
          teksti: 'Kati Thanda on Australian matalin kohta, viisitoista metriä '
            + 'merenpinnan alapuolella. Se on kuiva suolatasanko useimpina '
            + 'vuosina, ja täyttyy kokonaan noin neljä kertaa vuosisadassa. '
            + 'Viimeksi niin kävi vuonna 1974.',
        },
        {
          teksti: 'Sade ei tule tänne vaan tuhat kilometriä pohjoisempaan '
            + 'Queenslandiin, ja vesi tulee perässä viikkoja myöhemmin '
            + 'hitaita jokia myöten. Silloin allas kasvaa muutamassa '
            + 'kuukaudessa maan suurimmaksi järveksi.',
        },
        {
          tiedosto: 'ISS-30 Lake Eyre - South Australia.jpg',
          selite: 'Kati Thanda avaruusasemalta. Vaaleat alueet ovat suolakuorta, '
            + 'tummat matalaa vettä. Kun allas täyttyy, pelikaaneja saapuu '
            + 'rannikolta kymmeniätuhansia parissa viikossa, eikä tiedetä '
            + 'mistä ne tietävät.',
          lahde: 'Wikimedia Commons (PD), NASA',
        },
        {
          teksti: 'Kuivalla suolalla ajettiin myös nopeutta. Donald Campbell '
            + 'nosti heinäkuussa 1964 maanopeusennätyksen 648 kilometriin '
            + 'tunnissa Kati Thandan pinnalla, joka oli sateista pehmennyt '
            + 'eikä oikeastaan kelvannut siihen.',
        },
      ],
    },

    'Lake Manitoba': {
      kappaleet: [
        {
          teksti: 'Järven kapeikossa on Manitou-saari, jonka rannalla on '
            + 'kalkkikiviliusketta. Kun aallot kulkevat sen yli, kivet '
            + 'kolisevat toisiaan vasten ja rannalta kuuluu tasainen '
            + 'rummutus.',
        },
        {
          teksti: 'Anishinaabe-kansa kutsui paikkaa nimellä manitou-wapow, hengen '
            + 'salmi, ja ääni oli hengen rumpu. Nimi siirtyi järveen, '
            + 'järvestä provinssiin ja provinssista kaikkeen mitä siellä on.',
        },
        {
          tiedosto: 'Delta Beach Manitoba Canada.JPG',
          selite: 'Manitobajärven etelärantaa. Delta Marsh, järven eteläpään '
            + 'ruovikko, on Pohjois-Amerikan suurimpia sisämaan kosteikkoja '
            + 'ja levähdyspaikka miljoonille muuttolinnuille syksyisin.',
          lahde: 'Wikimedia Commons (CC BY 3.0), Shahnoor Habib Munmun',
        },
        {
          teksti: 'Järvi on keskimäärin vain neljä metriä syvä. Tulvakevät 2011 '
            + 'nosti pintaa niin paljon, että rantatalot jäivät veden alle '
            + 'kuukausiksi, ja siitä lähtien pintaa on säädelty kaivetulla '
            + 'kanavalla.',
        },
      ],
    },

    'Lake Nipigon': {
      kappaleet: [
        {
          teksti: 'Nipigon on suurin kokonaan Ontarion sisällä oleva järvi ja osa '
            + 'samaa miljardi vuotta vanhaa repeämää kuin Yläjärvi. Sen '
            + 'saaret ja rannat ovat mustaa laavakiveä, joka kaatui tänne '
            + 'repeämän auetessa.',
        },
        {
          teksti: 'Vuonna 1943 sen vedet käännettiin voimalaitoksiin. Nipigonjoen '
            + 'putouksiin rakennettiin padot, ja järven pinta on siitä '
            + 'lähtien ollut säädetty: se nousee ja laskee sen mukaan, '
            + 'paljonko sähköä tarvitaan.',
        },
        {
          tiedosto: 'Lake Nipigon.JPG',
          selite: 'Nipigonjärven rantaa. Järvi on Yläjärven suurin yksittäinen '
            + 'tulovirta, ja sen vesi kulkee Nipigonjokea pitkin '
            + 'kuusikymmentä kilometriä ja laskee lähes kahdeksankymmentä '
            + 'metriä matkalla.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), P199',
        },
        {
          teksti: 'Nipigonjoesta nostettiin heinäkuussa 1915 puronieriä, joka '
            + 'painoi kuusi ja puoli kiloa. Ennätys on yhä voimassa yli sata '
            + 'vuotta myöhemmin, eikä lähellekään ole päästy.',
        },
      ],
    },

    'Lake of the Woods': {
      kappaleet: [
        {
          teksti: 'Pariisissa vedettiin vuonna 1783 raja Yhdysvaltain ja '
            + 'brittiläisen Pohjois-Amerikan välille. Neuvottelijoilla oli '
            + 'edessään John Mitchellin kartta vuodelta 1755, jossa '
            + 'Mississippin lähde oli merkitty aivan liian pohjoiseen.',
        },
        {
          lainaus: 'sieltä mainitun järven halki sen luoteisimpaan pisteeseen, ja '
            + 'siitä suoraan länteen Mississippijoelle',
          kuka: 'Pariisin rauhansopimus, 2. artikla',
          teos: 'Definitive Treaty of Peace between the United States of America and His Britannic Majesty',
          vuosi: 1783,
          suomennos: 'oma',
          linkki: 'https://avalon.law.yale.edu/18th_century/paris.asp',
        },
        {
          teksti: 'Länteen kulkeva viiva ei kohdannut jokea koskaan; Mississippi '
            + 'alkaa kaukana etelämpää. Sotku korjattiin vuonna 1818 '
            + 'vetämällä raja 49. leveyspiiriä pitkin, mutta järven '
            + 'luoteisnurkka jäi piirin pohjoispuolelle.',
        },
        {
          tiedosto: 'Welcome to the United States - You are entering the Northwest Angle, Minnesota (35505460693).jpg',
          selite: 'Tie Northwest Angleen. Tämä Minnesotan pala on maateitse '
            + 'saavutettavissa vain Kanadan kautta. Noin sata asukasta '
            + 'ilmoittautuu tullille videopuhelimella tienvarren kopista, '
            + 'kumpaankin suuntaan.',
          lahde: 'Wikimedia Commons (CC BY-SA 2.0), Tony Webster',
        },
      ],
    },

    'Lake Taymyr': {
      kappaleet: [
        {
          teksti: 'Maailman pohjoisin suuri järvi on jäässä syyskuusta '
            + 'kesäkuuhun. Sulan aikana se on kolmisen metriä syvä allas, '
            + 'jonka pinta-ala vaihtelee kevättulvan mukaan kaksinkertaiseksi '
            + 'ja takaisin.',
        },
        {
          tiedosto: 'Lake Taymyr-txu-oclc-6654394-ns-46-48-2nd-ed.jpg',
          selite: 'Yhdysvaltain armeijan karttalehti Taimyrjärvestä vuodelta '
            + '1964. Rantaviiva on piirretty ilmakuvista. Matalilla rannoilla '
            + 'jää ulottuu talvella pohjaan asti, ja kartan ranta on siksi '
            + 'vain yksi hetki vuodesta.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Alexander von Middendorff mittasi järven kesällä 1843 ja '
            + 'sairastui vakavasti paluumatkalla. Hänen Siperiassa '
            + 'tekemistään mittauksista laskettiin ensimmäiset arviot siitä, '
            + 'kuinka syvälle ikirouta ulottuu.',
        },
        {
          teksti: 'Byrrangan vuorten pohjoispuolella ei kasva puita. Järven '
            + 'ympärillä on tundraa, jolla laiduntaa Euraasian suurin '
            + 'villipeurakanta, ja mammutin luita nousee rantatörmästä joka '
            + 'kesä kun jäätynyt maa sulaa reunoiltaan.',
        },
      ],
    },

    'Lake Torrens': {
      kappaleet: [
        {
          teksti: 'Edward John Eyre seurasi vuonna 1840 Flindersin vuorijonoa '
            + 'pohjoiseen etsien tietä sisämaahan. Vuoriston pohjoispää oli '
            + 'suljettu. Aina kun hän yritti kiertää, edessä oli sama '
            + 'suola-allas.',
        },
        {
          lainaus: 'Se osoittautui saarretuksi ylipääsemättömän esteen taakse: '
            + 'valtavan järven altaan, jonka nimesin Torrensjärveksi — ja '
            + 'tämä kiersi vuoriston pohjoiskärjen kokonaan hevosenkengän '
            + 'muotoon.',
          kuka: 'Edward John Eyre',
          teos: 'Journals of Expeditions of Discovery into Central Australia, osa 2',
          vuosi: 1845,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/5345',
        },
        {
          tiedosto: 'E. C. Frome - First view of the salt desert - called Lake Torrens - Google Art Project.jpg',
          selite: 'Edward Fromen akvarelli vuodelta 1843. Frome lähetettiin '
            + 'tarkastamaan Eyren havainnot ja antoi kuvalleen nimen '
            + 'Ensinäkymä suola-aavikkoon. Vettä siinä on hädin tuskin: '
            + 'valkoinen pinta on kuivunutta suolakuorta.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Este käänsi Eyren länteen. Hän kulki rannikkoa pitkin '
            + 'Adelaidesta King Georgen salmeen, yli kaksituhatta kilometriä, '
            + 'ja sen matkan lopun hän teki yhden ainoan seuralaisen, nuoren '
            + 'Wylien, kanssa.',
        },
      ],
    },

    'Lake Winnipegosis': {
      kappaleet: [
        {
          teksti: 'Nimi on creen deminutiivi: pieni samea vesi, ison samean veden '
            + 'vieressä. Kolme Manitoban järveä ovat kaikki saman altaan '
            + 'jäänteitä, ja niiden välillä on enää muutaman metrin '
            + 'korkeusero.',
        },
        {
          tiedosto: 'ISS059-E-19273 - View of Manitoba.jpg',
          selite: 'Manitoban järvet avaruusasemalta nähtynä. Winnipegosis, '
            + 'Manitoba ja Winnipeg ovat samaa vesijättöä. Niiden väliset '
            + 'tasangot ovat entistä järvenpohjaa, ja siksi ne ovat '
            + 'provinssin parasta viljelysmaata.',
          lahde: 'Wikimedia Commons (PD), NASA',
        },
        {
          teksti: 'Allas oli Agassiz, jääkauden reunaan patoutunut järvi. '
            + 'Laajimmillaan siinä oli enemmän vettä kuin kaikissa nykyisissä '
            + 'Suurissa järvissä yhteensä, ja se peitti alleen suuren osan '
            + 'Manitobaa, Ontariota ja Minnesotaa.',
        },
        {
          teksti: 'Noin kahdeksantuhatta vuotta sitten pato petti ja vesi '
            + 'purkautui Hudsoninlahdelle. Pohjois-Atlantin pintavesi makeni, '
            + 'ja lämpötilat putosivat pohjoisella pallonpuoliskolla useiksi '
            + 'sadoiksi vuosiksi.',
        },
      ],
    },

    'Malawijärvi': {
      kappaleet: [
        {
          teksti: 'David Livingstone saapui järven eteläpäähän 16. syyskuuta '
            + '1859. Reitti ei ollut uusi: sitä pitkin kulki orjakauppa '
            + 'sisämaasta Sansibariin, ja hän kohtasi ensimmäisen saattueen '
            + 'samana päivänä.',
        },
        {
          lainaus: 'Tämä on yksi sisämaan suurista orjapoluista, toiset ylittävät '
            + 'Shiren hieman alempaa ja jotkin kulkevat itse järven yli. '
            + 'Olisimme voineet vapauttaa nämä orjat, mutta emme tienneet '
            + 'mitä heille sen jälkeen tekisimme.',
          kuka: 'David Livingstone',
          teos: 'A Popular Account of Dr. Livingstone\'s Expedition to the Zambesi and Its Tributaries',
          vuosi: 1894,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/2519',
        },
        {
          teksti: 'Livingstone palasi Britanniaan vaatimaan kauppateiden '
            + 'avaamista, jotta orjakauppa kävisi kannattamattomaksi. Järven '
            + 'ympärille tuli lähetysasemia, ja niiden perässä tuli '
            + 'Nyassamaan protektoraatti.',
        },
        {
          tiedosto: 'Boats at the shore of the malawi lake.jpg',
          selite: 'Veneitä Malawijärven rannalla. Järvessä elää enemmän '
            + 'kalalajeja kuin missään muussa järvessä, satoja kirjoahvenia, '
            + 'jotka lähes kaikki ovat kotoperäisiä. Ruokakalana tunnetuin on '
            + 'chambo.',
          lahde: 'Wikimedia Commons (CC BY-SA 2.0), i_pinz',
        },
      ],
    },

    'Michiganjärvi': {
      kappaleet: [
        {
          teksti: 'René-Robert Cavelier de La Salle rakennutti vuonna 1679 '
            + 'Niagaran yläpuolelle purjelaivan, ensimmäisen ylempiä järviä '
            + 'purjehtineen. Griffon lastattiin turkiksilla Green Bayssa ja '
            + 'lähetettiin syyskuussa takaisin itään pienen miehistön '
            + 'varassa.',
        },
        {
          tiedosto: 'Le Griffon.jpg',
          selite: 'Griffon 1800-luvun kuvittajan näkemänä. Laivasta ei ole yhtään '
            + 'aikalaiskuvaa. Hylkyä on ilmoitettu löydetyksi useita kertoja '
            + 'sekä Michiganjärvestä että Huronista, eikä yksikään löytö ole '
            + 'varmistunut.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'La Sallelle laiva oli kaikki. Sen ruumassa olivat seuraavan '
            + 'aluksen köydet ja ankkurit. Hän odotti sitä syksyn ja talven '
            + 'ja rakensi odottaessaan Illinois-joen varteen linnakkeen, '
            + 'jolle antoi nimen Crèvecoeur, murtunut sydän.',
        },
        {
          lainaus: 'Laivasta ei kuultu enää koskaan mitään. Sen tuhoamisesta on '
            + 'syytetty intiaaneja, turkiskauppiaita ja jopa jesuiittoja.',
          kuka: 'Francis Parkman',
          teos: 'La Salle and the Discovery of the Great West',
          vuosi: 1879,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/40143',
        },
      ],
    },

    'Nettilling Lake': {
      kappaleet: [
        {
          teksti: 'Franz Boas talvehti Baffininsaarella 1883 ja 1884 aikeenaan '
            + 'mitata jäätä ja maastoa. Hän päätyi mittaamaan muuta: hän '
            + 'piirsi karttansa suureksi osaksi sen mukaan, mitä inuitit '
            + 'piirsivät hänelle lumeen ja paperille.',
        },
        {
          tiedosto: 'Koukdjuak 1 2002-08-24.jpg',
          selite: 'Koukdjuak, joka vie Nettillingin vedet länteen Foxe-altaaseen. '
            + 'Joki on leveä ja niin matala, että se jäätyy pohjaa myöten. '
            + 'Sen suistoon kerääntyy kesällä satojatuhansia hanhia '
            + 'sulkasatoon.',
          lahde: 'Wikimedia Commons (CC BY-SA 2.5), Ansgar Walk',
        },
        {
          teksti: 'Talirpingmiut-ryhmä nousi joka kevät rannikolta järvelle ja '
            + 'palasi merelle joulukuussa. Järven nimi tulee sanasta nattiq, '
            + 'norppa, ja nimi kertoo mitä varten sinne mentiin.',
        },
        {
          lainaus: 'Tässä voidaan mainita, ettei suolan täydellinen puuttuminen '
            + 'estä paikallisia oleskelemasta Nettillingjärvellä.',
          kuka: 'Franz Boas',
          teos: 'The Central Eskimo',
          vuosi: 1888,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/42084',
        },
      ],
    },

    'Nicaraguajärvi': {
      kappaleet: [
        {
          teksti: 'Cocibolca oli 1850-luvulla nopein tie Yhdysvaltain rannikolta '
            + 'toiselle. Cornelius Vanderbiltin yhtiö kuljetti kullankaivajia '
            + 'höyrylaivalla San Juan -jokea ylös, järven poikki ja vaunuilla '
            + 'Tyynellemerelle.',
        },
        {
          tiedosto: 'Concepción volcano - Ometepe island.jpg',
          selite: 'Concepción kohoaa Ometepen saarelta järven keskeltä. Saari on '
            + 'kaksi tulivuorta, jotka ovat kasvaneet kiinni toisiinsa; nimi '
            + 'on nahuatlia ja tarkoittaa kahta vuorta.',
          lahde: 'Wikimedia Commons (CC BY 2.0), Hulivili',
        },
        {
          lainaus: 'On kuitenkin tosiasia, että järvessä on runsaasti haita. — '
            + 'Niiden tiedetään hyökänneen kylpijöiden kimppuun kivenheiton '
            + 'päässä Granadan rannasta, ja olen itse nähnyt niitä '
            + 'toistuvasti vanhan linnoituksen muureilta, kun ne kiitävät '
            + 'vedessä evä pinnan yläpuolella.',
          kuka: 'E. G. Squier',
          teos: 'Nicaragua: Its People, Scenery, Monuments, Resources, Condition, and Proposed Canal',
          vuosi: 1860,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/76906',
        },
        {
          teksti: 'Haita pidettiin pitkään omana makeanveden lajinaan. 1960-luvun '
            + 'merkintäkokeet osoittivat, että ne ovat härkähaita, jotka '
            + 'nousevat San Juanin koskia ylös ja laskeutuvat takaisin '
            + 'Karibialle.',
        },
      ],
    },

    'Ontariojärvi': {
      kappaleet: [
        {
          teksti: 'Nimi on irokeesikielinen ja tarkoittaa kaunista tai '
            + 'kimmeltävää vettä. Järvi on ketjun alin, ja Niagaran '
            + 'satametrinen pudotus erottaa sen Eriestä niin jyrkästi, ettei '
            + 'yksikään kala ole päässyt sitä nousemaan.',
        },
        {
          teksti: 'Ihminen avasi tien. Wellandin kanava kiersi putoukset vuodesta '
            + '1829, ja sen kautta tuli merinahkiainen, joka imeytyy kalan '
            + 'kylkeen ja imee sen kuiviin. 1950-luvulle mennessä ylempien '
            + 'järvien nieriäkanta oli lähes poissa.',
        },
        {
          tiedosto: 'Lake Ontario Dusk.jpg',
          selite: 'Ontariojärvi hämärässä. Pinta-alaltaan se on Suurista järvistä '
            + 'pienin mutta tilavuudeltaan Eriejärveä isompi: se on kapea ja '
            + 'syvä, ja jäätyy kokonaan vain poikkeuksellisen kylminä '
            + 'talvina.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Keith Pomakis',
        },
        {
          teksti: 'Saint Lawrencen meriväylä avattiin vuonna 1959, ja '
            + 'valtamerilaivat pääsivät Torontoon asti. Samaa reittiä tulivat '
            + 'vaeltajasimpukat, jotka suodattavat veden kirkkaaksi ja '
            + 'muuttavat sen mukana koko ravintoketjun.',
        },
      ],
    },

    'Pohjois-Araljärvi': {
      kappaleet: [
        {
          teksti: 'Amerikkalainen diplomaatti Eugene Schuyler ajoi vuonna 1873 '
            + 'tarantassilla Aralin pohjoisrantaa kolme tuntia '
            + 'auringonlaskuun asti. Rannalla oli lokkeja ja sorsia, ja hän '
            + 'kumartui kokeilemaan vettä.',
        },
        {
          lainaus: 'Vesi näytti niin kirkkaalta ja puhtaalta, että ammensin siitä '
            + 'kupillisen ja join. Maku oli hieman murtovetinen mutta ei '
            + 'voimakkaan suolainen.',
          kuka: 'Eugene Schuyler',
          teos: 'Turkistan: Notes of a Journey in Russian Turkistan, Khokand, Bukhara and Kuldja, osa 1',
          vuosi: 1877,
          suomennos: 'oma',
          linkki: 'https://archive.org/details/turkistannotesof01schu',
        },
        {
          tiedosto: 'The Shrinking Aral Sea Recovers 2010.jpg',
          selite: 'Pohjoinen allas vuonna 2010. Kapea vaalea viiva altaan '
            + 'eteläreunassa on Kokaralin pato. Sen takana näkyy se, mitä '
            + 'eteläisestä Aralista on jäljellä.',
          lahde: 'Wikimedia Commons (PD), NASA',
        },
        {
          teksti: 'Kokaralin pato valmistui 2005 ja sulki Syrdarjan veden '
            + 'pohjoiseen altaaseen. Pinta nousi vajaassa vuodessa neljä '
            + 'metriä, suolaisuus laski ja kaupallinen kalastus alkoi '
            + 'uudelleen. Aralskin satama on yhä parinkymmenen kilometrin '
            + 'päässä vedestä.',
        },
      ],
    },

    'Reindeer Lake': {
      kappaleet: [
        {
          teksti: 'Järven eteläosassa on lähes ympyränmuotoinen lahti, '
            + 'kolmetoista kilometriä leveä ja yli kaksisataa metriä syvä. Se '
            + 'on järven syvin kohta ja jyrkkäreunainen kuin kaivo.',
        },
        {
          teksti: 'Deep Bay on törmäyskraatteri. Isku on ajoitettu noin sadan '
            + 'miljoonan vuoden päähän, ja jäätikkö on sittemmin hionut '
            + 'reunat matalaksi renkaaksi, joka erottuu vasta ilmasta.',
        },
        {
          teksti: 'Muu järvi on rikkonaista kalliomaastoa: tuhansia saaria, '
            + 'kapeita salmia ja rantaviivaa paljon enemmän kuin pinta-ala '
            + 'antaisi olettaa. Saskatchewanin ja Manitoban raja kulkee sen '
            + 'halki suorana viivana.',
        },
        {
          teksti: 'Rannalla asuu muutama sata ihmistä, enimmäkseen cree- ja '
            + 'dene-kylissä Southendissa ja Kinoosaossa. Maantie tulee vain '
            + 'eteläpäähän.',
        },
      ],
    },

    Saimaa: {
      kappaleet: [
        {
          teksti: 'Saimaa oli jääkauden jälkeen Itämeren lahti. Maa nousi, salmi '
            + 'kuroutui umpeen noin yhdeksäntuhatta vuotta sitten, ja järveen '
            + 'jäi yksi eläin, joka ei kuulu sinne: norppa.',
        },
        {
          lainaus: 'Ainoastaan muutamat varsinaiset merieläimet, sellaiset kuin '
            + 'merihärkä ja Saimaan hylje, tottuivat suolattomaan veteen, ja '
            + 'siksi tapaamme niitä vielä sisäjärvissämme, vaikka niiden '
            + 'varsinainen koti on Pohjois-Jäämeri.',
          kuka: 'Zacharias Topelius',
          teos: 'Maamme kirja, 16. suomenkielinen painos, suom. Paavo Cajander',
          vuosi: 1899,
          suomennos: 'ei omaa; lainaus on Cajanderin suomennoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/49600',
        },
        {
          tiedosto: 'Pusa hispida saimensis 431602934.jpg',
          selite: 'Saimaannorppa kivellä. Naaras kaivaa poikaspesän '
            + 'rantakinokseen helmikuussa, joten vähäluminen talvi on '
            + 'kannalle vaarallisempi kuin leuto kesä. Yksilöitä on vajaat '
            + 'viisisataa.',
          lahde: 'Wikimedia Commons (CC BY 4.0), Jan Ebr & Ivana Ebrová',
        },
        {
          teksti: 'Saimaan lasku-uoma vaihtui vielä kerran. Vesi puhkaisi harjun '
            + 'Imatran kohdalla noin kuusituhatta vuotta sitten, ja siitä '
            + 'syntyi Vuoksi. Pinta laski kerralla useita metrejä, ja järven '
            + 'ranta siirtyi paikoin kilometrejä.',
        },
      ],
    },

    Tanganjika: {
      kappaleet: [
        {
          teksti: 'Richard Burton oli helmikuussa 1858 vielä puolisokea '
            + 'silmätulehduksesta, kun karavaani nousi viimeiselle harjulle. '
            + 'Hän ei tunnistanut sitä mitä näki ja kysyi oppaaltaan Sidi '
            + 'Mubarak Bombaylta.',
        },
        {
          lainaus: 'Mikä tuo valojuova on tuolla alhaalla, kysyin Bombaylta. Olen '
            + 'sitä mieltä, vastasi Bombay, että se on se vesi. Katsoin '
            + 'kauhistuneena — ja aloin liian aikaisin surkutella '
            + 'hulluuttani: olin vaarantanut henkeni ja menettänyt terveyteni '
            + 'näin kehnosta palkinnosta.',
          kuka: 'Richard Francis Burton',
          teos: 'The Lake Regions of Central Africa, osa 2',
          vuosi: 1860,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/66813',
        },
        {
          teksti: 'Muutama askel eteenpäin, ja näkymä avautui kokonaan. Bombay '
            + 'oli myyty lapsena orjaksi Intiaan ja vapautunut isäntänsä '
            + 'kuoltua. Hän opasti Burtonin ja Speken lisäksi Stanleyn ja '
            + 'Verney Cameronin, ja sai Lontoosta hopeamitalin.',
        },
        {
          tiedosto: 'Les eaux bleues du lac Tanganyika.jpg',
          selite: 'Tanganjika Burundin puolelta. Vettä on lähes puolentoista '
            + 'kilometrin syvyyteen, mutta happea vain päällimmäisessä '
            + 'parissasadassa metrissä. Sen alapuolella vesi ei sekoitu eikä '
            + 'siellä elä kaloja.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Ntahonsigaye',
        },
      ],
    },

    Titicaca: {
      kappaleet: [
        {
          teksti: 'Garcilaso de la Vega syntyi Cuscossa vuonna 1539 espanjalaisen '
            + 'kapteenin ja inkaprinsessan poikana. Hän kirjoitti muistiin '
            + 'Espanjassa, neljäkymmentä vuotta myöhemmin, sen mitä äidin '
            + 'sukulaiset olivat hänelle lapsena kertoneet.',
        },
        {
          lainaus: 'Näin käskien ja tarkoittaen Isämme Aurinko asetti kaksi '
            + 'lastaan Titicacajärveen ... ja sanoi heille, että he saivat '
            + 'mennä minne tahtoivat, ja että joka paikassa, missä he '
            + 'pysähtyivät syömään tai nukkumaan, heidän tuli työntää '
            + 'kultainen sauva maahan.',
          kuka: 'Garcilaso de la Vega el Inca, enonsa kertomana',
          teos: 'Comentarios Reales de los Incas, engl. Clements R. Markham 1869',
          vuosi: 1609,
          suomennos: 'oma, Markhamin englanninnoksesta',
          linkki: 'https://archive.org/details/firstpartofroyal01vega',
        },
        {
          tiedosto: 'Barcos de Totora.jpg',
          selite: 'Totorakaislasta sidottuja veneitä. Sama kaisla kannattaa '
            + 'uru-kansan kelluvia saaria: pohja mätänee alta ja päälle '
            + 'ladotaan uutta, joten saari on ikuisesti kesken ja kestää noin '
            + 'kolmekymmentä vuotta.',
          lahde: 'Wikimedia Commons (CC BY-SA 2.0), Vieira',
        },
        {
          teksti: 'Sauva vajosi Cuscossa, ja siihen inkat perustivat '
            + 'pääkaupunkinsa. Järven eteläpuolella oli silloin ollut jo '
            + 'tuhat vuotta rauniona Tiwanaku, jonka kivityöt olivat '
            + 'inkoillekin vanhoja ja selittämättömiä.',
        },
      ],
    },

    'Tšadjärvi': {
      kappaleet: [
        {
          teksti: 'Dixon Denham, Walter Oudney ja Hugh Clapperton lähtivät '
            + 'Tripolista vuonna 1822 ja ylittivät Saharan kamelikaravaanin '
            + 'mukana. Lärin kylän kohdalla, helmikuussa 1823, maasto nousi '
            + 'ja edessä oli vettä.',
        },
        {
          lainaus: 'Suuri Tšadjärvi, hehkuen auringon kultaisissa säteissä sen '
            + 'ollessa voimissaan, näytti olevan mailin päässä siitä '
            + 'paikasta, jolla seisoimme.',
          kuka: 'Dixon Denham',
          teos: 'Narrative of Travels and Discoveries in Northern and Central Africa',
          vuosi: 1826,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/71754',
        },
        {
          tiedosto: 'Lake Chad from Apollo 7.jpg',
          selite: 'Tšadjärvi Apollo 7:stä lokakuussa 1968. Tummana näkyvä vesi '
            + 'ulottuu kuvan poikki. Järvi on keskimäärin puolitoista metriä '
            + 'syvä, joten pieni pinnanlasku vie suuren alan.',
          lahde: 'Wikimedia Commons (PD), NASA',
        },
        {
          tiedosto: 'Chad AMO 2004323 lrg.jpg',
          selite: 'Sama järvi vuonna 2004. Vettä on jäljellä noin '
            + 'kahdeskymmenesosa siitä mitä edellisessä kuvassa. Vaaleat '
            + 'kuviot ovat entistä pohjaa; kaakkoisosaa on jo raivattu '
            + 'pelloiksi.',
          lahde: 'Wikimedia Commons (PD), NASA',
        },
        {
          teksti: 'Järvi kuivui pahiten 1970- ja 1980-luvun kuivuuksissa, eikä '
            + 'ole palannut ennalleen. Neljän valtion rannoilla asuu noin '
            + 'kolmekymmentä miljoonaa ihmistä, joiden vesi ja kala tulevat '
            + 'tästä altaasta.',
        },
      ],
    },

    'Turkanajärvi': {
      kappaleet: [
        {
          teksti: 'Unkarilainen Sámuel Teleki ja itävaltalainen Ludwig von Höhnel '
            + 'tulivat järvelle maaliskuussa 1888. Kantajat olivat kulkeneet '
            + 'seitsemän tuntia paahteessa ja juoksivat veteen. Se oli '
            + 'juomakelvotonta.',
        },
        {
          lainaus: 'Siellä täällä, osa vedessä, osa rannalla, kohosi yksinäisiä '
            + 'puunrunkoja, jotka ojensivat paljaat, auringon valkaisemat '
            + 'oksansa armotonta taivasta kohti. Yksikään elävä olento ei '
            + 'jakanut kanssamme tuota synkkää yksinäisyyttä.',
          kuka: 'Ludwig von Höhnel',
          teos: 'Discovery of Lakes Rudolf and Stefanie, engl. Nancy Bell',
          vuosi: 1894,
          suomennos: 'oma, Nancy Bellin englanninnoksesta',
          linkki: 'https://archive.org/details/discoveryoflakes02hhne',
        },
        {
          tiedosto: 'Lake Turkana Kenya.jpg',
          selite: 'Turkanajärvi. Vesi on sinivihreää levästä, ja siitä tulee '
            + 'toinen nimi, Jademeri. Paikallinen nimi oli Basso Narok, musta '
            + 'järvi; Teleki nimesi sen Itävallan kruununprinssin mukaan.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Kaka Namwaya',
        },
        {
          teksti: 'Autiudessa on säilynyt jotain muuta. Rannoilta on löydetty '
            + 'ihmisen sukupuun fossiileja miljoonien vuosien ajalta, ja '
            + 'vuonna 1984 Nariokotomesta lähes kokonainen luuranko: poika, '
            + 'joka kuoli noin kymmenvuotiaana.',
        },
      ],
    },

    'Victoriajärvi': {
      kappaleet: [
        {
          teksti: 'Richard Burton ja John Hanning Speke saapuivat Kazeen '
            + 'loppuvuodesta 1857. Arabikauppiaat olivat kulkeneet sieltä '
            + 'pohjoiseen jo vuosikymmeniä ja tiesivät mitä siellä on. Sheikh '
            + 'Snay bin Amir neuvoi heidät perille yhdellä lauseella.',
        },
        {
          lainaus: 'Jos olette tulleet vain katsomaan isoa vesialuetta, menkää '
            + 'mieluummin pohjoiseen katsomaan Ukereweä; se on joka suhteessa '
            + 'Tanganjikaa suurempi.',
          kuka: 'Sheikh Snay bin Amir, John Hanning Speken siteeraamana',
          teos: 'What Led to the Discovery of the Source of the Nile',
          vuosi: 1864,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/8417',
        },
        {
          tiedosto: 'Early morning fishing at Lake Victoria.jpg',
          selite: 'Aamukalastusta Victorianjärvellä. Saalis on nykyään '
            + 'enimmäkseen niilinahventa, joka istutettiin järveen '
            + '1950-luvulla; sitä ennen vedessä eli satoja vain täältä '
            + 'tavattuja kirjoahvenlajeja, ja osa niistä on hävinnyt.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Franklin Amulyoto',
        },
        {
          teksti: 'Speke lähti pohjoiseen heinäkuussa 1858, näki järven runsaan '
            + 'kolmen viikon kuluttua ja antoi sille kuningattarensa nimen. '
            + 'Nimiä sillä oli jo: luon kielellä Nam Lolwe, gandan kielellä '
            + 'Nalubaale, ja kauppiaiden puheessa Ukerewe suurimman saarensa '
            + 'mukaan.',
        },
      ],
    },

    'Vänern': {
      kappaleet: [
        {
          teksti: 'Vänern oli jään väistyttyä meren lahti. Maan kohotessa se '
            + 'kuroutui irti noin yhdeksäntuhatta vuotta sitten, ja sinne jäi '
            + 'joukko merieläimiä, jotka opettelivat elämään makeassa '
            + 'vedessä.',
        },
        {
          teksti: 'Yksi niistä on lohi. Vänernin lohi nousee kutemaan '
            + 'Klarälveniin ja Gullspångsälveniin eikä käy koskaan meressä; '
            + 'se on yksi harvoista järvilohikannoista maailmassa ja elää '
            + 'koko elämänsä sisämaassa.',
        },
        {
          tiedosto: 'Vänern Skarprunmarn.jpg',
          selite: 'Vänernin ulkoluotoja. Järvi on niin laaja, että sillä on oma '
            + 'merenkulkusäännöstönsä ja omat majakkansa; syysmyrskyssä '
            + 'aallokko voi yltää kolmeen metriin.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Esquilo',
        },
        {
          teksti: 'Göta kanal valmistui 1832 ja liitti järven Itämereen. Läntinen '
            + 'pää oli auennut jo aiemmin: Trollhättanin sulut ohittivat Göta '
            + 'älvin kosket 1800, ja Ruotsin poikki pääsi kulkemaan laivalla.',
        },
      ],
    },

    'Winnipegjärvi': {
      kappaleet: [
        {
          teksti: 'Nimi on creetä ja tarkoittaa sameaa vettä. Järvi on matala ja '
            + 'tuulinen, ja aallot nostavat pohjasedimentin veteen niin että '
            + 'se todella on sameaa. Kaupunki eteläpuolella otti nimensä '
            + 'järveltä, ei toisin päin.',
        },
        {
          teksti: 'Matala allas lämpenee kesällä nopeasti. Valuma-alueelta tuleva '
            + 'fosfori on 1990-luvulta lähtien tuottanut sinileväkukintoja, '
            + 'jotka näkyvät satelliittikuvissa vihreinä kiehkuroina '
            + 'kymmenien kilometrien matkalla.',
        },
        {
          tiedosto: 'Lake winnipeg HDRI.jpg',
          selite: 'Winnipegjärven rantaa. Keskisyvyys on runsaat kymmenen metriä, '
            + 'joten myrsky sekoittaa koko vesimassan pohjaa myöten. Talvella '
            + 'jäältä nostetaan siikaa verkoilla, jotka lasketaan avannoista.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Non-dropframe',
        },
        {
          teksti: 'Kalastus on silti yhä yksi Pohjois-Amerikan suurimmista '
            + 'sisävesikalastuksista. Suurin osa saaliista on kuhaa, ja se '
            + 'lähtee rekoilla Yhdysvaltain ravintoloihin.',
        },
      ],
    },

    'Yläjärvi': {
      kappaleet: [
        {
          teksti: 'Henry Wadsworth Longfellow kirjoitti Hiawathan laulun vuonna '
            + '1855 Henry Schoolcraftin keräämien ojibwe-kertomusten pohjalta '
            + 'ja otti runomitan Kalevalasta, jonka oli lukenut saksaksi. '
            + 'Runo alkaa järven rannalta.',
        },
        {
          lainaus: 'Gitche Gumeen rannoilla, kimmeltävän Suuren-Meren-Veden '
            + 'äärellä, seisoi Nokomisin wigwam, Kuun tyttären Nokomisin.',
          kuka: 'Henry Wadsworth Longfellow',
          teos: 'The Song of Hiawatha',
          vuosi: 1855,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/19',
        },
        {
          tiedosto: 'North Shore of Lake Superior.jpg',
          selite: 'Yläjärven pohjoisrantaa. Vesi vaihtuu järvessä kokonaan noin '
            + 'kahdessasadassa vuodessa, ja se pysyy kylmänä: kesälläkin '
            + 'pintakerros lämpenee harvoin yli kymmenen asteen.',
          lahde: 'Wikimedia Commons (CC BY 2.0), Sharon Mollerus',
        },
        {
          teksti: 'Gitche Gumee on ojibwea ja tarkoittaa suurta merta. Nimi '
            + 'levisi englanninkieliseen maailmaan runossa, jonka mitta oli '
            + 'suomalainen, aihe ojibwe ja kirjoittaja Cambridgessa asuva '
            + 'professori.',
        },
      ],
    },

    'Ääninen': {
      kappaleet: [
        {
          teksti: 'Äänisen itärannalla, Besov Nosin kalliolla, on tuhansia '
            + 'hakattuja kuvia: hirviä, joutsenia, veneitä ja yksi '
            + 'kolmimetrinen ihmishahmo, jota on kutsuttu pahaksi hengeksi. '
            + 'Ne ovat noin viisituhatta vuotta vanhoja.',
        },
        {
          teksti: 'Munkit tulivat samalle kalliolle keskiajalla ja hakkasivat '
            + 'hahmon päälle ristin. Molemmat ovat yhä siinä, päällekkäin, '
            + 'eikä kumpaakaan ole saatu pois.',
        },
        {
          tiedosto: 'Lake Onega. Kizhi Island DSC 0588 2600.jpg',
          selite: 'Kižin saari Äänisellä. Kirkastuksen kirkko valmistui 1714: '
            + 'hirsiseinät on salvottu ilman nauloja, ja sen '
            + 'kaksikymmentäkaksi kupolia on katettu haapapäreillä, jotka '
            + 'vaihdetaan sukupolven välein.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Alexxx1979',
        },
        {
          teksti: 'Ääninen on Euroopan toiseksi suurin järvi ja laskee Svirin '
            + 'kautta Laatokkaan, joten sen vesi päätyy lopulta Nevaan ja '
            + 'Suomenlahteen. Pohjoisosa on kallioista saaristoa, eteläosa '
            + 'matalaa ja soista.',
        },
      ],
    },
  },
  vuoret: {

    ahaggar: {
      kappaleet: [
        {
          teksti: 'Ahaggar on Saharan keskellä, ja se on viileä. Kahden ja puolen '
            + 'kilometrin korkeudessa yöt menevät pakkaselle, ja '
            + 'kallionkoloihin jää vettä, joka ei ehdi haihtua. Siksi '
            + 'karavaanitiet kulkivat tästä eivätkä ohi.',
        },
        {
          tiedosto: 'View from the Assekrem.jpg',
          selite: 'Assekremin ylätasanko. Pystyt tornit ovat tulivuorten '
            + 'kurkkujen kovettunutta täytettä, jonka ympäriltä pehmeämpi '
            + 'tuhka on tuulettunut pois. Assekrem tarkoittaa tamašekiksi '
            + 'maailmanloppua.',
          lahde: 'Wikimedia Commons (CC BY 2.0), Guillaume Lecoquierre',
        },
        {
          teksti: 'Kalliomaalauksissa on karjaa, norsuja ja virtahepoja. Ne ovat '
            + 'viisi- tai kuusituhatta vuotta vanhoja, ajalta jolloin '
            + 'Saharassa satoi ja se oli ruohotasankoa. Muutos ei johtunut '
            + 'ihmisestä vaan maapallon akselin kallistuman hitaasta '
            + 'heilahduksesta.',
        },
        {
          teksti: 'Tuaregien kieli tamašek kirjoitetaan tifinagilla, aakkosilla, '
            + 'jotka polveutuvat muinaisista libyalaisista merkeistä. '
            + 'Kirjoitustaito on perinteisesti ollut naisilla.',
        },
      ],
    },

    'alaskan-vuoristo': {
      kappaleet: [
        {
          teksti: 'Neljä miestä nousi Denalin etelähuipulle 7. kesäkuuta 1913. '
            + 'Ensimmäisenä sinne astui Walter Harper, kaksikymmenvuotias, '
            + 'jonka äiti oli koyukon-athabaskaa ja isä irlantilainen '
            + 'kullankaivaja. Retken johti käytännössä Harry Karstens.',
        },
        {
          lainaus: 'Köyden viimeinen mies, joka innostuksissaan ylitti kapean '
            + 'hengitysvaransa, oli lähes hinattava viimeiset jalat ylös, ja '
            + 'hän vaipui hetkeksi tajuttomana sen pienen lumialtaan '
            + 'pohjalle, joka on vuoren huippu.',
          kuka: 'Hudson Stuck',
          teos: 'The Ascent of Denali',
          vuosi: 1914,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/26059',
        },
        {
          teksti: 'Viimeinen mies oli Stuck itse, pappi ja kirjan kirjoittaja. '
            + 'Hän oli lähes viisikymmenvuotias ja kärsi korkeudesta koko '
            + 'nousun, mutta seisoi huipulla puolitoista tuntia lukemassa '
            + 'ilmapuntaria ja keittopistemittaria.',
        },
        {
          tiedosto: 'Alaska Range from Air (7065264169).jpg',
          selite: 'Alaskan vuoristo ilmasta. Denali nousee ympäröivästä tundrasta '
            + 'yli viisi kilometriä; harva vuori maapallolla nousee jyrkemmin '
            + 'omalta jalustaltaan. Huipun korkeus merenpinnasta on silti '
            + 'vasta 6 190 metriä.',
          lahde: 'Wikimedia Commons (PD), Denali National Park and Preserve',
        },
      ],
    },

    altai: {
      kappaleet: [
        {
          teksti: 'Denisovan luolasta löytyi sormiluun kärki, joka oli liian '
            + 'pieni kertoakseen mitään. Vuonna 2010 siitä luettiin genomi, '
            + 'eikä se ollut nykyihmisen eikä neandertalinihmisen. Laji '
            + 'nimettiin luolan mukaan, koska muuta nimeämisen perustetta ei '
            + 'ollut.',
        },
        {
          tiedosto: 'Belukha.jpg',
          selite: 'Beluha, 4 506 metriä, Altain korkein. Vuori on neljän valtion '
            + 'kulmassa ja kolmen suuren joen vedenjakajalla; Katun lähtee '
            + 'sen etelärinteeltä ja päätyy lopulta Obiin.',
          lahde: 'Wikimedia Commons (CC BY 2.5), Ondřej Žváček',
        },
        {
          teksti: 'Sama luola on ollut asuttu myös neandertalilaisten ja '
            + 'nykyihmisten aikaan. Yhdestä luunsirusta tunnistettiin tyttö, '
            + 'jonka äiti oli neandertalilainen ja isä denisovalainen. Hän on '
            + 'toistaiseksi ainoa tunnettu ensimmäisen polven risteymä kahden '
            + 'ihmislajin väliltä.',
        },
        {
          teksti: 'Altai on nykyisin neljän maan kohtauspaikka: Venäjä, '
            + 'Kazakstan, Mongolia ja Kiina kohtaavat harjalla. Rajaviivat on '
            + 'piirretty 1860-luvulla. Luola on ollut käytössä satatuhatta '
            + 'vuotta.',
        },
      ],
    },

    'annamin-ylanko': {
      kappaleet: [
        {
          teksti: 'Henri Mouhot kulki syksyllä 1861 Laosin vuorilla kohti Luang '
            + 'Prabangia. Hän oli kerännyt hyönteisiä kolme vuotta ja tullut '
            + 'tunnetuksi kuvauksestaan Angkorin raunioista, joita hän ei '
            + 'löytänyt mutta joista hän kirjoitti Euroopalle ensimmäisenä.',
        },
        {
          lainaus: 'Tie kulkee korkeiden vuorten yli, ja viidakot ovat täynnä '
            + 'apinoita, jotka päästävät valittavia huutojaan.',
          kuka: 'Henri Mouhot',
          teos: 'Travels in the Central Parts of Indo-China (Siam), Cambodia, and Laos',
          vuosi: 1864,
          suomennos: 'oma, teoksen englanninkielisestä laitoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/46560',
        },
        {
          tiedosto: 'Phou Bia seen from Xaysomboun.jpg',
          selite: 'Phou Bia, Laosin korkein huippu, 2 819 metriä. Ylängön metsät '
            + 'ovat tiheitä ja laaksot kapeita; sama maasto piti kaksi '
            + 'kulttuuripiiriä erillään ja tarjosi myöhemmin suojan Ho Chi '
            + 'Minhin polulle.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Boroli',
        },
        {
          teksti: 'Merkintä on hänen viimeinen kertova rivinsä. Sen jälkeen '
            + 'päiväkirjassa on vain päivämääriä, ja 19. lokakuuta lukee: '
            + 'kuume. Hän kuoli 10. marraskuuta, ja palvelijat Phrai ja Deng '
            + 'hautasivat hänet ja kantoivat muistikirjat Bangkokiin asti.',
        },
      ],
    },

    apenniinit: {
      kappaleet: [
        {
          teksti: 'Hannibalin sotanorsuista oli Trebian taistelun jälkeen '
            + 'jäljellä seitsemän. Liviuksen mukaan ne kuolivat kaikki '
            + 'keväällä 217 eaa., kun armeija yritti ylittää Apenniinit '
            + 'Etruriaan — eivät Alpeilla, joista tarina yleensä muistetaan.',
        },
        {
          lainaus: 'Apenniineja ylittäessään häntä kohtasi niin raivokas myrsky, '
            + 'että se melkein voitti Alppien kauhut.',
          kuka: 'Livius',
          teos: 'Ab urbe condita XXI.58, engl. D. Spillan ja C. Edmonds',
          vuosi: 'n. 20 eaa.',
          suomennos: 'oma, Spillanin ja Edmondsin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/10907',
        },
        {
          tiedosto: 'Corno Grande del Gran Sasso d\'Italia.JPG',
          selite: 'Corno Grande, 2 912 metriä, Apenniinien korkein. Sen alla oli '
            + 'Calderone, Euroopan eteläisin jäätikkö, joka luokiteltiin '
            + '2000-luvulla lumikentäksi, koska se ei enää liiku.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Infinitispazi',
        },
        {
          teksti: 'Apenniinit ovat Alppeja matalammat mutta kapeammat, ja ne '
            + 'pakottavat liikenteen muutamaan solaan. Sama kapeus pysäytti '
            + 'liittoutuneiden etenemisen Goottien linjalle talveksi 1944, '
            + 'kun rintama seisoi harjalla puoli vuotta.',
        },
      ],
    },

    appalakit: {
      kappaleet: [
        {
          teksti: 'William Bartram kulki 1775 Cherokee-maan halki keräten kasveja '
            + 'ja pani merkille, että vuorella kevät on toinen kuin '
            + 'rannikolla: Charlestonissa keltajasmiini oli jo kukkinut ohi, '
            + 'täällä nuput olivat vasta turpoamassa.',
        },
        {
          tiedosto: 'The Smoky Mountains, in Great Smoky Mountains National Park.jpg',
          selite: 'Great Smoky Mountainsin harjanteita. Sininen usva on kasvien '
            + 'haihduttamaa terpeeniä, joka hajottaa valoa — sama ilmiö antoi '
            + 'nimen myös Blue Ridgelle.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), USchick',
        },
        {
          lainaus: 'Nousin jälleen Joren vuorille ja lepäsin viimein korkeimmalla '
            + 'huipulla, jolta näin ihastuksella ja hämmästyksellä ylevän ja '
            + 'pelottavan näyn voimasta ja suuruudesta: maailman vuoria '
            + 'vuorten päällä.',
          kuka: 'William Bartram',
          teos: 'Travels Through North and South Carolina, Georgia, East and West Florida',
          vuosi: 1791,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/63678',
        },
        {
          teksti: 'Korkeuden tuoma viive tekee Appalakeista poikkeuksellisen '
            + 'rikkaat. Eteläosa ei jäätynyt jääkaudella, joten lajit '
            + 'vetäytyivät korkeuseroa myöten eivätkä kuolleet: Great Smoky '
            + 'Mountainsista on kirjattu lähes kaksikymmentätuhatta lajia.',
        },
      ],
    },

    atlas: {
      kappaleet: [
        {
          teksti: 'Joseph Dalton Hooker matkusti 1871 Marokkoon selvittääkseen, '
            + 'mitä Atlaksen rinteillä kasvaa. Sulttaanin lupa oli haettava '
            + 'etukäteen, eikä laaksoihin päässyt ilman sitä. Retkikunta '
            + 'nousi Tagherotin solaan, 3 500 metriin.',
        },
        {
          tiedosto: 'View from Toubkal west flank.jpg',
          selite: 'Näkymä Toubkalin länsirinteeltä. Pohjois-Afrikan korkein '
            + 'huippu on 4 167 metriä, ja lunta on kuvan ottohetkellä '
            + 'paikoin. Kolmen viikon päästä samasta paikasta ei välttämättä '
            + 'näy yhtään.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), ThartmannWiki',
        },
        {
          lainaus: 'Yksi matkaaja on voinut nähdä jonon paksun lumen peitossa '
            + 'kuumimpaankin aikaan, ja toinen voi yhtä totuudenmukaisesti '
            + 'kuvata sen lähes täysin paljaaksi.',
          kuka: 'Joseph Dalton Hooker ja John Ball',
          teos: 'Journal of a Tour in Marocco and the Great Atlas',
          vuosi: 1878,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/70700',
        },
        {
          teksti: 'Kysymys oli, onko Atlaksella ikilunta. Matkakertomukset olivat '
            + 'keskenään ristiriitaisia, ja Hooker ja Ball tajusivat, että '
            + 'molemmat saattoivat olla oikeassa: lunta sataa kesälläkin, '
            + 'mutta pystysuora aurinko sulattaa sen viikossa. Ikilunta ei '
            + 'ole.',
        },
      ],
    },

    balkanvuoret: {
      kappaleet: [
        {
          teksti: 'Niemimaa on nimetty väärin. Saksalainen maantieteilijä August '
            + 'Zeune otti 1808 turkin sanan balkan, vuori, ja antoi sen koko '
            + 'niemimaalle olettaen, että tämä jono rajaa sen pohjoisesta. '
            + 'Raja on Tonava ja Sava; Balkanvuoret kulkevat keskellä '
            + 'Bulgariaa.',
        },
        {
          teksti: 'Elokuussa 1877 venäläiset ja bulgarialaiset vapaaehtoiset '
            + 'puolustivat solaa kuusi päivää suurta ylivoimaa vastaan. '
            + 'Patruunoiden loputtua he heittivät kiviä. Sola piti, ja sota '
            + 'kääntyi siitä.',
        },
        {
          tiedosto: 'Shipka pass.jpg',
          selite: 'Šipkan sola, 1 150 metriä, jonon tunnetuin kohta. Solan '
            + 'huipulla on muistomerkki, jonka rahat kerättiin kansalta '
            + '1920-luvulla. Tie on sama, jota pitkin hyökättiin.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Ivan Ivanov',
        },
        {
          teksti: 'Bulgaria sai autonomian seuraavana vuonna. Sola on maan '
            + 'käytetyin kansallissymboli, ja sen nimi on kuulunut jokaiseen '
            + 'koulukirjaan siitä lähtien — myös silloin kun valtio vaihtoi '
            + 'muotoa kahdesti.',
        },
      ],
    },

    'brasilian-ylanko': {
      kappaleet: [
        {
          teksti: 'Serra do Mar ei ole vuorijono vaan ylängön reuna, joka putoaa '
            + 'rannikolle. Tasanko alkaa heti sen takaa ja jatkuu tuhat '
            + 'kilometriä sisämaahan; portugalilaiset istuivat sata vuotta '
            + 'muurin edessä ja tekivät sokeria.',
        },
        {
          tiedosto: 'Serra da Mantiqueira vista da Rodovia Floriano Rodrigues Pinheiro.jpg',
          selite: 'Serra da Mantiqueira. Nimi tarkoittaa tupinkielellä '
            + 'suunnilleen itkevää vuorta, koska rinteiltä valuu vettä ympäri '
            + 'vuoden. Reunan takana maa nousee tasaisesti eikä laske enää.',
          lahde: 'Wikimedia Commons (CC0), Themium',
        },
        {
          teksti: 'Sitten löytyi kultaa. Minas Geraisista kaivettiin 1700-luvulla '
            + 'satoja tonneja kultaa, enemmän kuin Amerikoista siihen '
            + 'mennessä yhteensä, ja siirtokunnan painopiste siirtyi '
            + 'sisämaahan. Pääkaupunki siirrettiin Salvadorista Rio de '
            + 'Janeiroon 1763.',
        },
        {
          teksti: 'Ylänkö on nyt Brasilian vesitorni. São Francisco ja Paraná '
            + 'lähtevät siltä, ja koska tasanko on korkealla ja tasainen, '
            + 'joet putoavat vasta reunalla — siitä syystä maan sähköstä '
            + 'valtaosa on ollut vesivoimaa.',
        },
      ],
    },

    'dinaariset-alpit': {
      kappaleet: [
        {
          teksti: 'Sana karsti on lainattu tästä vuoristosta. Kras on '
            + 'slovenialainen ylänkö Triesten takana, ja 1800-luvun geologit '
            + 'ottivat sen nimeksi ilmiölle, jota tutkivat siellä '
            + 'ensimmäisenä: kalkkikivelle, jonka läpi vesi katoaa.',
        },
        {
          tiedosto: 'Uvala NVelebit Veliki-Lubenovac Dinarides Croatia.jpg',
          selite: 'Velebitin karstilaakso. Pinnalla ei ole puroa eikä järveä, '
            + 'koska vesi menee heti maan alle. Kuoppa nimeltä uvala syntyy, '
            + 'kun useampi kalkkikiven liukenemispesäke sulautuu yhteen.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Boris Papeš',
        },
        {
          teksti: 'Vesi kulkee alhaalla. Postojnan luolasto on yli kaksikymmentä '
            + 'kilometriä pitkä, ja kylän kaivo saattaa olla sadan metrin '
            + 'syvyydessä. Sisämaassa vettä on siksi vaikea saada, vaikka '
            + 'sadetta tulee runsaasti.',
        },
        {
          teksti: 'Muuri teki Dalmatian satamista saaria. Ne katsoivat merelle '
            + 'eivätkä taakseen, ja Venetsia hallitsi niitä neljäsataa vuotta '
            + 'ilman että sen tarvitsi hallita sisämaata lainkaan.',
        },
      ],
    },

    drakensberg: {
      kappaleet: [
        {
          teksti: 'Jyrkänne on tuhat metriä korkea ja se jatkuu satoja '
            + 'kilometrejä. Alla on rannikon kaistale, päällä Lesothon '
            + 'ylänkö. Zuluksi se on uKhahlamba, keihäiden muuri; buurit '
            + 'kutsuivat sitä lohikäärmevuoriksi.',
        },
        {
          tiedosto: 'San Painting, Ukalamba Drakensberge 1.JPG',
          selite: 'Sanien kalliomaalaus Drakensbergissä. Maalauksia on yli '
            + 'kuudessasadassa paikassa ja kuvia kymmeniätuhansia — Afrikan '
            + 'laajin yhtenäinen kokoelma. Vanhimmat ovat tuhansien vuosien '
            + 'ikäisiä.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Lukas Kaffer',
        },
        {
          teksti: 'Viimeiset maalattiin 1800-luvulla. Kuvissa on tuolloin hevosia '
            + 'ja pyssyjä, ja samaan aikaan maalaajien kansa hävitettiin '
            + 'näiltä vuorilta. Maalaukset jäivät, tekijät eivät.',
        },
        {
          tiedosto: 'Amphitheatre Drakensberg.jpg',
          selite: 'Amfiteatteri, viiden kilometrin levyinen ja tuhannen metrin '
            + 'korkuinen seinä. Sen laelta putoaa Tugela, jonka '
            + 'kokonaispudotus on runsaat yhdeksänsataa metriä ja joka kuivuu '
            + 'talvella lähes kokonaan.',
          lahde: 'Wikimedia Commons (PD)',
        },
      ],
    },

    elburz: {
      kappaleet: [
        {
          teksti: 'Kaspianmeren etelärannalla sataa yli tuhat milliä vuodessa ja '
            + 'rinteillä kasvaa lehtimetsä, joka on säilynyt jääkaudelta '
            + 'lähes ennallaan. Harjan yli on matkaa muutama kymmenen '
            + 'kilometriä. Toisella puolella alkaa aavikko.',
        },
        {
          teksti: 'Persialaisessa tarustossa vuoren sisään on kahlittu Zahhak, '
            + 'kuningas, jonka olkapäistä kasvoi käärmeet. Häntä ei voinut '
            + 'tappaa, ainoastaan sulkea. Firdausin Shahname kertoo, että hän '
            + 'odottaa siellä maailmanloppua.',
        },
        {
          tiedosto: '2009-05-13 Damavand from Abbasabad 08.jpg',
          selite: 'Damavand, 5 610 metriä, Aasian korkein tulivuori. Se nousee '
            + 'yksin ilman naapurihuippua, ja huipulla on rikkihöyryä ja '
            + 'keltaista lunta. Teheranista on matkaa runsaat kuusikymmentä '
            + 'kilometriä.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Hansueli Krapf',
        },
        {
          teksti: 'Kapeus tekee jonosta muurin. Kaspian rannikko on kosteaa '
            + 'riisi- ja teemaata, ylängöllä sataa alle kaksisataa milliä, ja '
            + 'Teheran on rakennettu juuri rajalle: vesi tulee vuorilta ja '
            + 'ilma aavikolta.',
        },
      ],
    },

    'etiopian-ylangot': {
      kappaleet: [
        {
          teksti: 'James Bruce saapui marraskuussa 1770 Gishin lähteelle, josta '
            + 'Sinisen Niilin vesi lähtee. Hän riisui kenkänsä pyynnöstä, '
            + 'juoksi rinteen alas ja seisoi paikassa, jota Eurooppa oli '
            + 'etsinyt kaksituhatta vuotta.',
        },
        {
          lainaus: 'Vaikka olin vain yksityinen britti, riemuitsin siinä '
            + 'mielessäni kuninkaiden ja heidän armeijoidensa yli; ja '
            + 'jokainen vertaus vei yhä lähemmäs julkeutta, kunnes paikka '
            + 'itse, turhamaisuuteni kohde, painoi lyhyen riemuni maahan.',
          kuka: 'James Bruce',
          teos: 'Travels to Discover the Source of the Nile, osa 3',
          vuosi: 1790,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/54531',
        },
        {
          tiedosto: 'Simien Mountains Landscape, Ethiopia (2462794039).jpg',
          selite: 'Simienin rotkoja. Ylänkö on basalttia, jonka joet ovat '
            + 'leikanneet pystyseinäisiksi torneiksi; korkeuseroa on paikoin '
            + 'puolitoista kilometriä. Sama maasto teki valloittamisesta '
            + 'kalliin puuhan.',
          lahde: 'Wikimedia Commons (CC BY 2.0), A. Davey',
        },
        {
          teksti: 'Kaksi asiaa vaivasi. Portugalilainen jesuiitta Pedro Páez oli '
            + 'seisonut samalla lähteellä 1618, ja Bruce tiesi sen mutta '
            + 'kiisti. Ja Lontoossa hänen kertomustaan pidettiin valheena '
            + 'viisitoista vuotta. Se oli totta lähes kokonaan.',
        },
      ],
    },

    'guyanan-ylanko': {
      kappaleet: [
        {
          teksti: 'Walter Raleigh purjehti 1595 Orinocolle etsimään '
            + 'kultakaupunkia. Sitä ei löytynyt, mutta Winicaporan joen '
            + 'varrella hänelle näytettiin kaukaa vuorta, jolle hän ei '
            + 'ehtinyt kulkea. Hän kirjoitti näkemänsä muistiin joka '
            + 'tapauksessa.',
        },
        {
          lainaus: 'Näimme sen kaukaa, ja se näytti valkoiselta kirkontornilta, '
            + 'tavattoman korkealta. Sen yli syöksyy mahtava joki, joka ei '
            + 'koske vuoren kylkeen lainkaan vaan ryöppyää huipun yli ja '
            + 'putoaa maahan niin kauhealla pauhulla kuin tuhat suurta kelloa '
            + 'lyötäisiin yhteen.',
          kuka: 'Walter Raleigh',
          teos: 'The Discovery of Guiana',
          vuosi: 1596,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/2272',
        },
        {
          teksti: 'Kuvaus sopii pöytävuoreen ja putoukseen, joka irtoaa '
            + 'seinämästä ennen pohjaa. Angelin putous syöksyy yhdeltä niistä '
            + '979 metriä ja hajoaa usein sumuksi ennen kuin osuu maahan. Se '
            + 'merkittiin kartalle vasta 1930-luvulla, lentokoneesta.',
        },
        {
          tiedosto: 'Roraima vistaBase.JPG',
          selite: 'Roraiman seinämä juurelta katsottuna. Pöytävuoren hiekkakivi '
            + 'on lähes kaksi miljardia vuotta vanhaa, ja laella elää lajeja, '
            + 'joita ei ole muualla — jokainen tepui on saari ilman merta.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Csar13',
        },
      ],
    },

    hindukush: {
      kappaleet: [
        {
          teksti: 'Aleksanterin armeija ylitti vuoriston keväällä 329 eaa. '
            + 'lumessa ja nälässä, ja makedonialaiset kirjasivat jonon '
            + 'Kaukasukseksi. Nimi ei ollut erehdys vaan valinta: Kaukasus '
            + 'oli kreikkalaisille maailman itäinen reuna, ja sen ylittäminen '
            + 'teki kuninkaasta suuremman.',
        },
        {
          lainaus: 'Makedonialaiset siirsivät Kaukasusvuoren Mustaltamereltä maan '
            + 'itäisiin osiin ja antoivat sille, mikä todella oli '
            + 'Parapamisos, Kaukasuksen nimen kohottaakseen Aleksanterin '
            + 'mainetta, koska hän muka oli kulkenut Kaukasuksen yli.',
          kuka: 'Arrianos, Eratostheneen mukaan',
          teos: 'Aleksanterin sotaretki V.3, engl. E. J. Chinnock',
          vuosi: 'n. 140 jaa.',
          suomennos: 'oma, Chinnockin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/46976',
        },
        {
          tiedosto: 'Tirich Mir Hindu Kush Chitral; Tahsin Shah 06.jpg',
          selite: 'Tirich Mir, 7 708 metriä, Chitralin laaksosta. Vuoristo on '
            + 'kapea mutta pitkä, ja juuri kapeus tekee soloista arvokkaita: '
            + 'harjan yli pääsee kävellen muutamassa päivässä, jos tietää '
            + 'mistä.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Tahsin A Shah',
        },
        {
          teksti: 'Nykyinen nimi on yhtä ladattu. Hindukush luetaan usein muotoon '
            + 'hindun tappaja, ja Ibn Battuta selitti sen 1300-luvulla '
            + 'orjakaravaanien kuolonuhreilla. Toinen luenta johtaa sanan '
            + 'persian ilmaukseen, joka tarkoittaa pelkkää vuorta. Kumpaakaan '
            + 'ei voi todistaa.',
        },
      ],
    },

    'japanin-alpit': {
      kappaleet: [
        {
          teksti: 'Nimen keksi brittiläinen kaivosinsinööri William Gowland, joka '
            + 'työskenteli Osakan rahapajassa ja kiipesi vapaa-ajallaan. '
            + 'Toinen brittiläinen, pappi Walter Weston, teki nimestä pysyvän '
            + 'kirjalla, jossa jokainen huippu sai eurooppalaisen '
            + 'vertauskohtansa.',
        },
        {
          lainaus: 'Yarigatake, keihäshuippu, Japanin Matterhorn; Jonendake, jonka '
            + 'soreassa kolmiomuodossa toistuu pienoiskoossa Weisshorn, '
            + 'Penniinien Alppien kuningatar.',
          kuka: 'Walter Weston',
          teos: 'Mountaineering and Exploration in the Japanese Alps',
          vuosi: 1896,
          suomennos: 'oma',
          linkki: 'https://archive.org/details/mountaineeringex00westrich',
        },
        {
          tiedosto: 'View from Kita dake-pano2.jpg',
          selite: 'Näkymä Kita-dakelta, Japanin toiseksi korkeimmalta huipulta. '
            + 'Eteläiset Alpit ovat graniittia ja liusketta, ja rinteillä '
            + 'kasvaa kääpiövaivaiskoivikkoa, joka on jäänyt jäljelle '
            + 'jääkaudelta.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Kumaapr9',
        },
        {
          teksti: 'Vuorilla oli omat nimensä ja oma uskontonsa. Tateyamalle ja '
            + 'Ontakelle on noustu pyhiinvaellusryhminä satojen vuosien ajan, '
            + 'valkeissa vaatteissa ja rukoillen, ja Weston kohtasi näitä '
            + 'ryhmiä reiteillään. Japanin oma vuoristokerho perustettiin '
            + '1905.',
        },
      ],
    },

    'kaakkois-australian-ylangot': {
      kappaleet: [
        {
          teksti: 'Mantereen ainoa seutu, jossa on joka talvi pysyvä lumipeite, '
            + 'on tämä. Snowy Mountainsin lumi kattaa runsaat '
            + 'viisitoistatuhatta neliökilometriä, ja korkein kohta on 2 228 '
            + 'metriä — matala vuori, jonka yläpuolella ei ole mitään koko '
            + 'Australiassa.',
        },
        {
          lainaus: 'Kun huipulle päästiin, Clancykin hidasti. Rohkeinkin olisi '
            + 'pidättänyt hengitystään: villi humalapensaikko kasvoi tiheänä, '
            + 'ja piiloutunut maa oli täynnä vompattien koloja. Yksikin '
            + 'harha-askel oli kuolema.',
          kuka: 'A. B. Paterson',
          teos: 'The Man from Snowy River and Other Verses',
          vuosi: 1895,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/213',
        },
        {
          tiedosto: 'Mount Kosciuszko, Australia.jpg',
          selite: 'Kosciuszkon rinteitä kesällä. Maasto on loivaa ja pyöreää, '
            + 'koska jääkauden jäätiköt olivat pieniä; lumi jää silti '
            + 'pitkälle kevääseen, ja hiihtokausi kestää neljä kuukautta.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Reflexio',
        },
        {
          teksti: 'Vesi kulkee nyt vuoren läpi. Snowy Mountains -hanke rakensi '
            + '1949-1974 kuusitoista patoa ja runsaat sata kilometriä '
            + 'tunnelia ja käänsi Snowy-joen sisämaahan, Murrayn ja '
            + 'Murrumbidgeen kastelualueille. Töissä oli satatuhatta ihmistä '
            + 'yli kolmestakymmenestä maasta.',
        },
      ],
    },

    kalliovuoret: {
      kappaleet: [
        {
          teksti: 'Isabella Bird nousi Longs Peakille lokakuussa 1873. Oppaana '
            + 'oli Jim Nugent, mies jolta puuttui toinen silmä karhun takia '
            + 'ja jonka mainetta Coloradossa pidettiin huonona. Bird oli '
            + '42-vuotias ja matkusti yksin.',
        },
        {
          tiedosto: 'Sanford Robinson Gifford - Longs Peak, Colorado - Google Art Project.jpg',
          selite: 'Sanford Robinson Gifford maalasi Longs Peakin samoihin '
            + 'aikoihin kuin Bird kiipesi sille. Huippu on 4 346 metriä, ja '
            + 'itärinteen seinä putoaa suoraan runsaat seitsemänsataa metriä.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          lainaus: 'Sinä tiedät, ettei minulla ole päätä eikä nilkkoja enkä saisi '
            + 'uneksiakaan vuorikiipeilystä. Nyt olen vain nöyryytetty '
            + 'onnistumisestani, sillä Jim raahasi minut ylös kuin '
            + 'tavarakollin, paljaalla lihasvoimalla.',
          kuka: 'Isabella Bird',
          teos: 'A Lady\'s Life in the Rocky Mountains',
          vuosi: 1879,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/755',
        },
        {
          teksti: 'Kirja koottiin kirjeistä sisarelle. Nugent ammuttiin alle '
            + 'vuotta myöhemmin naapurikiistassa, ja Estes Park sai tien. '
            + 'Bird jatkoi matkaa Japaniin, Malaijien niemimaalle, Persiaan '
            + 'ja Kiinaan ja kirjoitti jokaisesta kirjan.',
        },
      ],
    },

    kamerunvuori: {
      kappaleet: [
        {
          teksti: 'Mary Kingsley nousi Kamerunvuorelle syyskuussa 1895 pitkässä '
            + 'hameessa, jota piti ainoana säädyllisenä vaihtoehtona, ja '
            + 'kulki kaakkoisrinnettä, jota kukaan eurooppalainen ei ollut '
            + 'käyttänyt. Huipulla oli myrsky ja sumu.',
        },
        {
          lainaus: 'Enpä totisesti ole vuorikiipeilijä, sillä minussa ei ole '
            + 'riemua vaan pelkkää syvää harmia: sää vei minulta koko matkani '
            + 'päätarkoituksen, kunnon näkymän. Otin tilaisuuden ja se meni '
            + 'pieleen, joten ei ole mitään valittamista.',
          kuka: 'Mary Kingsley',
          teos: 'Travels in West Africa',
          vuosi: 1897,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/5891',
        },
        {
          tiedosto: 'Gezicht op de Berg Kameroen (Mount Cameroon) vanuit Victoria (Kameroen), RP-F-F01175-AD.jpg',
          selite: 'Kamerunvuori Victoriasta, nykyisestä Limbestä, 1800-luvun '
            + 'lopun valokuvassa. Kingsley lähti liikkeelle tästä satamasta. '
            + 'Vuori nousee suoraan merestä 4 040 metriin.',
          lahde: 'Wikimedia Commons (CC0), Rijksmuseum',
        },
        {
          teksti: 'Vuoren lounaisjuurella Debundschassa sataa yli kymmenen metriä '
            + 'vuodessa; se on maailman sateisimpia paikkoja. Karthagolainen '
            + 'Hanno purjehti ohi noin 500 eaa. ja kuvasi purkautuvan '
            + 'tulivuoren, jota kutsui Jumalten vaunuiksi. Nimi on yhä '
            + 'käytössä.',
        },
      ],
    },

    kamtshatka: {
      kappaleet: [
        {
          teksti: 'George Kennan seisoi syksyllä 1865 Kljutšin kylässä ja katsoi '
            + 'tulivuorta, jonka jyrinä kuului kuudenkymmenen mailin päähän. '
            + 'Kylä oli rakennettu sen juurelle vanhojen laavavirtojen '
            + 'väliin. Hän kirjasi kaksi asiaa muistiin.',
        },
        {
          lainaus: 'Tulivuorelle ei tietääkseni ole koskaan noustu, ja sen '
            + 'ilmoitettu korkeus, 16 500 jalkaa, on luultavasti jonkin '
            + 'venäläisen upseerin likiarvio.',
          kuka: 'George Kennan',
          teos: 'Tent Life in Siberia, uudistettu laitos',
          vuosi: 1910,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/12328',
        },
        {
          tiedosto: 'Klyuchevskaya Sopka (Klyuchevskoi) Volcano with lava flow, Kamchatka, Russia - October 31st, 2020.jpg',
          selite: 'Kljutševskaja sopka ja laavavirta lokakuussa 2020, '
            + 'satelliittikuvana. Purkaus tulee keskimäärin joka toinen '
            + 'vuosi, ja tuhkaa on satanut kaupungeissa molemmilla puolilla '
            + 'niemimaata.',
          lahde: 'Wikimedia Commons (CC BY 2.0), Pierre Markuse',
        },
        {
          teksti: 'Molemmissa hän erehtyi. Huipulle oli noustu jo 1788, ja '
            + 'korkeus on 4 754 metriä eli lähes tuhat jalkaa arviota '
            + 'vähemmän. Erehdykset olivat silti rehellisiä: kumpaakaan '
            + 'tietoa ei ollut saatavilla siellä missä hän seisoi.',
        },
      ],
    },

    'kapmaan-taittovuoret': {
      kappaleet: [
        {
          teksti: 'Kapkaupungin takana on kolme vuorimuuria peräkkäin. '
            + 'Hollantilaiset uudisasukkaat pysyivät niiden edessä '
            + 'vuosikymmeniä, koska härkävankkuri ei nouse jyrkkää '
            + 'hiekkakiveä eikä laaksoista päässyt eteenpäin.',
        },
        {
          tiedosto: 'SwartbergP1020173.JPG',
          selite: 'Swartbergin poimuja. Kerrokset ovat kääntyneet lähes pystyyn, '
            + 'ja tie yli rakennettiin 1880-luvulla vankityövoimalla ilman '
            + 'laastia; muurit seisovat yhä pelkän kivenladonnan varassa.',
          lahde: 'Wikimedia Commons (CC BY-SA 2.5), Winfried Bruenken',
        },
        {
          teksti: 'Poimut ovat noin 250 miljoonaa vuotta vanhoja ja syntyivät, '
            + 'kun eteläinen manner puristui kasaan. Samat rakenteet jatkuvat '
            + 'Argentiinan Sierra de la Ventanassa ja Etelämantereen '
            + 'Ellsworthin vuorilla: yksi vuoristo kolmella mantereella.',
        },
        {
          teksti: 'Rinteillä kasvaa fynbos. Kapin kasvimaakunta on maailman '
            + 'kuudesta pienin, mutta siinä on noin yhdeksäntuhatta lajia ja '
            + 'kaksi kolmasosaa niistä ei kasva missään muualla.',
        },
      ],
    },

    karakoram: {
      kappaleet: [
        {
          teksti: 'Vuoret nimettiin kirjaimin. Intian suuri kolmiomittaus '
            + 'merkitsi 1856 Karakoramin huiput koodeilla K1, K2, K3, ja '
            + 'toiseksi mitatulle ei löytynyt paikallista nimeä, koska sitä '
            + 'ei näy yhdestäkään asutusta laaksosta. K2 on ainoa suuri '
            + 'vuori, joka kantaa yhä mittausnumeroaan.',
        },
        {
          tiedosto: 'Chogori.jpg',
          selite: 'K2 pohjoisesta. Jyrkkyys on koko vuoriston tunnus: neljä '
            + 'kahdeksantuhattametristä mahtuu muutaman kymmenen kilometrin '
            + 'säteelle, ja jäätiköt ovat pisimmät napa-alueiden '
            + 'ulkopuolella.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Zacharie Grossen',
        },
        {
          lainaus: 'Myönnän suoraan, etten olisi itse koskaan yrittänyt '
            + 'laskeutumista ja että minä — englantilainen — pelkäsin mennä '
            + 'ensimmäisenä. Onneksi oppaani olivat rohkeampia kuin minä.',
          kuka: 'Francis Younghusband',
          teos: 'The Heart of a Continent',
          vuosi: 1896,
          suomennos: 'oma',
          linkki: 'https://archive.org/details/heartofcontinent0000fran',
        },
        {
          teksti: 'Younghusband ylitti Mustaghin solan 1887 pohjoisesta, '
            + 'ensimmäisenä eurooppalaisena. Baltilaiset oppaat hakkasivat '
            + 'askelmat jäähän ja laskivat miehet kalliota alas kuusi tuntia. '
            + 'Alhaalla hän kääntyi katsomaan ja piti tapahtunutta '
            + 'mahdottomana.',
        },
      ],
    },

    karpaatit: {
      kappaleet: [
        {
          teksti: 'Bram Stoker ei käynyt koskaan Transilvaniassa. Hän luki '
            + 'Lontoon kirjastoissa, ja tärkein lähde oli skotlantilaisen '
            + 'Emily Gerardin essee transilvanialaisista taikauskoista '
            + 'vuodelta 1885. Siitä tuli Draculan ensimmäinen luku.',
        },
        {
          lainaus: 'Luin, että jokainen maailman tunnettu taikausko on kerääntynyt '
            + 'Karpaattien hevosenkenkään, kuin se olisi jonkinlaisen '
            + 'mielikuvituksen pyörteen keskus.',
          kuka: 'Bram Stoker',
          teos: 'Dracula, Jonathan Harkerin päiväkirja',
          vuosi: 1897,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/345',
        },
        {
          tiedosto: 'Gerlachovský štít (Gerlach Peak).jpg',
          selite: 'Gerlachovský štít, 2 655 metriä, Karpaattien korkein. Korkeat '
            + 'Tatrat ovat vain 25 kilometriä pitkä pätkä kaaresta, joka '
            + 'kiertää Unkarin tasangon puolitoista tuhatta kilometriä.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Midnight Runner',
        },
        {
          teksti: 'Todellisuus on toisenlainen ja vähintään yhtä epätavallinen. '
            + 'Karpaattien kaaressa elää Euroopan suurin ruskeakarhukanta '
            + 'sekä sudet ja ilvekset, ja mantereen viimeiset laajat '
            + 'aarniometsät, joita ei ole koskaan hakattu, ovat näillä '
            + 'rinteillä.',
        },
      ],
    },

    kaskadit: {
      kappaleet: [
        {
          teksti: 'Theodore Winthrop matkusti 1853 Puget Soundilta itään ja '
            + 'katsoi vuorta, jolla oli kaksi nimeä. Vancouver oli antanut '
            + 'sille ystävänsä, kontra-amiraali Rainierin nimen; paikallinen '
            + 'nimi oli tacoma tai tahoma.',
        },
        {
          lainaus: 'Mount Regnieriksi kristityt ovat sen nimenneet, typerässä '
            + 'nimeämisinnossaan ikuistaen jonkun tai ei kenenkään nimen.',
          kuka: 'Theodore Winthrop',
          teos: 'The Canoe and the Saddle',
          vuosi: 1862,
          suomennos: 'oma',
          linkki: 'https://archive.org/details/canoesaddleadven00wint',
        },
        {
          teksti: 'Nimi jäi vuorelle, ja toinen meni kaupungille. Rainieria '
            + 'pidetään Yhdysvaltain vaarallisimpana tulivuorena, mutta ei '
            + 'purkauksen vaan mudan takia: jäätiköt ja hauras kivi ovat '
            + 'kerran valuneet Puget Soundille asti, ja reitin varrella asuu '
            + 'nyt satatuhatta ihmistä.',
        },
        {
          tiedosto: 'Mount Rainier over Tacoma.jpg',
          selite: 'Rainier Tacoman yllä. Vuorella on enemmän jäätikköä kuin '
            + 'millään muulla Yhdysvaltain mannerosan huipulla, ja kaupunki '
            + 'on rakennettu vanhan mutavyöryn kerrostumalle.',
          lahde: 'Wikimedia Commons (PD), Lyn Topinka / USGS',
        },
      ],
    },

    kaukasus: {
      kappaleet: [
        {
          teksti: 'Kaukasuksen laaksoissa puhutaan yli neljääkymmentä kieltä, ja '
            + 'kolme kokonaista kielikuntaa on vain täällä eikä missään '
            + 'muualla. Antiikissa asia oli jo tiedossa: Mustanmeren rannalla '
            + 'Dioskuriaan satamassa kaupankäynti vaati tulkkeja '
            + 'kymmenittäin.',
        },
        {
          lainaus: 'Dioskuriaan kokoontuu seitsemänkymmentä kansaa, tai '
            + 'kolmesataa, jos uskoo kirjoittajia, jotka eivät ole tarkkoja. '
            + 'Kaikki puhuvat eri kieltä, koska elävät hajallaan eri '
            + 'paikoissa ilman keskinäistä kanssakäymistä.',
          kuka: 'Strabon',
          teos: 'Maantiede XI.2.16, engl. H. C. Hamilton ja W. Falconer',
          vuosi: 'n. 20 jaa.',
          suomennos: 'oma, Hamiltonin ja Falconerin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/44885',
        },
        {
          tiedosto: 'Travels in the central Caucasus and Bash P.380.jpg',
          selite: 'Kuvitusta Douglas Freshfieldin matkakirjasta 1869. Hän kiipesi '
            + 'Kazbekille ja Elbrusille ensimmäisten eurooppalaisten '
            + 'joukossa, mutta reitit tunsivat paikalliset oppaat, joita '
            + 'ilman kumpikaan nousu ei olisi onnistunut.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Syy on maasto. Jyrkkä laakso pitää kylän erillään naapurista '
            + 'sukupolvien ajan, ja kieli erkanee. Ubyhissa on runsaat '
            + 'kahdeksankymmentä konsonanttia ja kaksi vokaalia; sen '
            + 'viimeinen puhuja kuoli 1992.',
        },
      ],
    },

    'kenia-vuori': {
      kappaleet: [
        {
          teksti: 'Kikujujen kielellä vuori on Kirinyaga ja sillä asuu Ngai. '
            + 'Perinteinen maja rakennetaan ovi vuorta kohti, ja rukoillessa '
            + 'käännytään samaan suuntaan. Nimi Kenia on väännös, jonka '
            + 'eurooppalaiset kuulivat kamban kielen muodosta.',
        },
        {
          teksti: 'Halford Mackinder, joka opetti maantiedettä Oxfordissa, nousi '
            + 'Batianille syyskuussa 1899. Huipulle pääsivät hänen kanssaan '
            + 'kaksi alppiopasta Courmayeurista, César Ollier ja Joseph '
            + 'Brocherel. Retkikunnassa oli lisäksi runsaat sata '
            + 'afrikkalaista kantajaa, joiden nimiä ei kirjattu.',
        },
        {
          tiedosto: 'Batian and Nelion in the background cropped.JPG',
          selite: 'Batian ja Nelion, 5 199 ja 5 188 metriä. Ne ovat sammuneen '
            + 'tulivuoren tulikanavan jähmettynyt täyte: pehmeä kartio on '
            + 'kulunut pois ja kova sydän jäänyt pystyyn.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Chris 73',
        },
        {
          teksti: 'Alkuperäinen vuori oli arviolta pari kilometriä nykyistä '
            + 'korkeampi. Se on siis pienentynyt enemmän kuin mitä siitä on '
            + 'jäljellä, ja jäljellä oleva on sitä osaa, joka ei koskaan '
            + 'päässyt ulos.',
        },
      ],
    },

    kilimanjaro: {
      kappaleet: [
        {
          teksti: 'Johannes Rebmann näki 11. toukokuuta 1848 savannin yllä '
            + 'valkoisen huipun ja kirjoitti päiväkirjaansa, että se on '
            + 'lunta. Lontoossa maantieteilijä William Desborough Cooley '
            + 'julisti asian mahdottomaksi: päiväntasaajalla ei ole lunta, ja '
            + 'lähetyssaarnaaja oli nähnyt kalkkikiveä.',
        },
        {
          teksti: 'Rebmann oli oikeassa, ja se myönnettiin vasta 1861. Cooley ei '
            + 'myöntänyt koskaan. Hän ei ollut käynyt Afrikassa eikä käynyt '
            + 'myöhemminkään, mutta hän oli seuransa arvostetuin '
            + 'Afrikan-tuntija.',
        },
        {
          tiedosto: 'Mount Kilimandjaro in Amboseli national park.jpg',
          selite: 'Kilimanjaro Amboselista. Vuori nousee savannista suoraan viisi '
            + 'kilometriä ilman ympäröivää vuoristoa, ja siksi se näkyy sadan '
            + 'kilometrin päähän. Rinteellä on viisi kasvillisuusvyöhykettä.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Benh Lieu Song',
        },
        {
          teksti: 'Kibon jäätiköistä on sulanut yli neljä viidesosaa siitä, mitä '
            + 'Hans Meyer ja Ludwig Purtscheller mittasivat 1889 noustessaan '
            + 'huipulle chaggaoppaansa Yohani Lauwon johdolla. Loput ovat '
            + 'ohuita levyjä, joiden reunat ovat pystysuorat.',
        },
      ],
    },

    kunlun: {
      kappaleet: [
        {
          teksti: 'Khotanin kaksi jokea tulevat Kunlunista ja tuovat mukanaan '
            + 'kiveä, jota on onkittu ja louhittu kolmetuhatta vuotta. '
            + 'Kiinaksi se on yu, jade. Marco Polo ei tuntenut sanaa eikä '
            + 'kiveä ja kirjasi sen niillä nimillä, jotka osasi.',
        },
        {
          lainaus: 'Tässä maassa on jokia, joista löytyy runsaasti jaspista ja '
            + 'kalkedonia.',
          kuka: 'Marco Polo',
          teos: 'The Book of Ser Marco Polo I.37, engl. Henry Yule ja Henri Cordier, 3. laitos',
          vuosi: 1903,
          suomennos: 'oma, Yulen englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/10636',
        },
        {
          tiedosto: 'ISS022-E-5098 - View of China - Kunlun Mountains - Liushi Shan - Trungtse Glacier (cropped).jpg',
          selite: 'Kunlunin harjaa avaruusasemalta. Etelässä alkaa Tiibetin '
            + 'ylätasanko, pohjoisessa laskeudutaan suoraan Taklamakanin '
            + 'hiekkaan. Jono on kolmetuhatta kilometriä pitkä, ja teitä sen '
            + 'yli on kourallinen.',
          lahde: 'Wikimedia Commons (PD), NASA',
        },
        {
          teksti: 'Nimet ovat jääneet paikoilleen. Yurungkash on valkoisen jaden '
            + 'joki ja Karakash mustan. Kiinalaisessa mytologiassa Kunlun on '
            + 'jumalten asuinsija ja Lännen kuningatar-äidin puutarha, eli '
            + 'tarkalleen se suunta, josta jade tuli.',
        },
      ],
    },

    'lansi-ghatit': {
      kappaleet: [
        {
          teksti: 'Lounaismonsuuni tulee mereltä ja törmää seinään. Ghatit '
            + 'nousevat rannikolta jyrkästi ja pysäyttävät sateen: Agumben '
            + 'kylässä sataa yli seitsemän metriä vuodessa, ja sadan '
            + 'kilometrin päässä idässä Deccanin ylänkö on kuiva.',
        },
        {
          tiedosto: 'Monsoon clouds in Western ghats.jpg',
          selite: 'Monsuunipilvi nousee Ghattien reunaa vasten. Sama ilmiö '
            + 'toistuu joka kesäkuu muutaman päivän tarkkuudella, ja Intian '
            + 'maatalouden vuosi on rakennettu sen varaan.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Cpangarkar',
        },
        {
          teksti: 'Sama seinä teki mausteista kauppatavaraa. Pippuri ja '
            + 'kardemumma kasvavat vain kostealla puolella, ja roomalaiset '
            + 'laivat purjehtivat monsuunituulella suoraan Malabarin '
            + 'satamiin. Plinius vanhempi valitti, että Intia imee Roomasta '
            + 'viisikymmentä miljoonaa sestertiota vuodessa.',
        },
        {
          teksti: 'Ghatit eivät ole poimuvuoristo vaan mannerlaatan murtumareuna, '
            + 'ja ne ovat vanhemmat kuin Himalaja. Kun Intia irtautui '
            + 'Madagaskarista, sen länsireuna jäi pystyyn.',
        },
      ],
    },

    'madagaskarin-ylanko': {
      kappaleet: [
        {
          teksti: 'Ylänkö on lähes puuton, ja se on ollut sitä pitkään. Ruoho '
            + 'poltetaan joka kevät, jotta karjalle nousisi uutta, eivätkä '
            + 'taimet ehdi kasvaa palojen välissä. Metsä ei siis palaa '
            + 'takaisin, vaikka sade riittäisi.',
        },
        {
          tiedosto: 'Landscape Madagascar 01.jpg',
          selite: 'Keskiylängön kumpuja ja riisiterasseja. Punainen maa on '
            + 'rautapitoista rapautumaa, ja eroosiouurteita kutsutaan nimellä '
            + 'lavaka; ne kasvavat sateella metrikaupalla kerrallaan.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Bernard Gagnon',
        },
        {
          lainaus: 'Toisinaan näkee yhtaikaa tusinan verran tulia, pitkiä '
            + 'kaartuvia liekkiviivoja eri suunnissa, ja ne antavat Imerinan '
            + 'kevätöille oudon maalauksellisen sävyn.',
          kuka: 'James Sibree',
          teos: 'A Naturalist in Madagascar',
          vuosi: 1915,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/68708',
        },
        {
          teksti: 'Saaren asukkaat tulivat kahdesta suunnasta. Malagassin kieli '
            + 'on austronesialainen ja sen lähin sukulainen puhutaan '
            + 'Borneolla; sanasto sai myöhemmin lisää bantukielistä. '
            + 'Kanootilla oli siis kuljettu tuhansia kilometrejä avomerta.',
        },
      ],
    },

    pamir: {
      kappaleet: [
        {
          teksti: 'Marco Polo kulki Pamirin yli 1270-luvulla matkalla Kiinaan. '
            + 'Ylängöllä ei ollut kyliä eikä puita, ja hän pani merkille '
            + 'jotain, mitä ei osannut selittää: tuli käyttäytyi väärin.',
        },
        {
          lainaus: 'Seutu on niin korkea ja kylmä, ettei siellä näe edes lintujen '
            + 'lentävän. Ja on huomattava, ettei tuli tämän suuren kylmyyden '
            + 'vuoksi pala yhtä kirkkaasti eikä anna yhtä paljon lämpöä kuin '
            + 'tavallisesti, eikä se kypsennä ruokaa kunnolla.',
          kuka: 'Marco Polo',
          teos: 'The Book of Ser Marco Polo I.32, engl. Henry Yule ja Henri Cordier, 3. laitos',
          vuosi: 1903,
          suomennos: 'oma, Yulen englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/10636',
        },
        {
          tiedosto: 'Thomas Edward Gordon Lake Victoria, Great Pamir, May 2nd, 1874.png',
          selite: 'Thomas Edward Gordonin piirros Suurelta Pamirilta 2. '
            + 'toukokuuta 1874. Järvi on Zorkul, jota britit kutsuivat '
            + 'Victoriaksi ja jota pidettiin Oxuksen lähteenä. Puuta ei '
            + 'kuvassa ole yhtään.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Selitys on ilmanpaine. Neljän kilometrin korkeudessa sitä on '
            + 'jäljellä noin kuusi kymmenesosaa: liekki jää viileäksi ja vesi '
            + 'kiehuu jo 85 asteessa, joten liha ei kypsy vaan hautuu. Polon '
            + 'havainto oli tarkka, ja syy löytyi vasta viisisataa vuotta '
            + 'myöhemmin.',
        },
      ],
    },

    pyreneet: {
      kappaleet: [
        {
          teksti: 'Kaarle Suuren jälkijoukko tuhoutui 15. elokuuta 778 Pyreneiden '
            + 'solassa. Hyökkääjät olivat baskeja ja syy oli kosto: frankit '
            + 'olivat matkalla etelään hajottaneet Pamplonan muurit. Kyse oli '
            + 'väijytyksestä, ei taistelusta.',
        },
        {
          lainaus: 'Korkeat ovat huiput, laaksot varjoisat, kalliot tummat, '
            + 'kapeikot hämmästyttävät.',
          kuka: 'tuntematon runoilija',
          teos: 'Rolandin laulu, laisse LXVI, engl. C. K. Scott Moncrieff',
          vuosi: 'n. 1100',
          suomennos: 'oma, Scott Moncrieffin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/391',
        },
        {
          tiedosto: 'Gustave Doré - Roland à Roncevaux.jpg',
          selite: 'Gustave Doré kuvitti Rolandin laulun 1800-luvulla. Kuvassa '
            + 'Roland puhaltaa torveaan liian myöhään. Tapaus on tuolloin '
            + 'runsaat tuhat vuotta vanha, ja Dorén Pyreneet ovat jyrkemmät '
            + 'kuin todelliset.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Kolmesataa vuotta myöhemmin tapaus oli muuttunut toiseksi. '
            + 'Rolandin laulussa vihollinen on saraseeni, kyseessä on '
            + 'uskonsota, ja jälkijoukon johtaja kuolee sankarina. Väärästä '
            + 'vihollisesta tuli Ranskan kansalliseepos.',
        },
      ],
    },

    rannikkovuoret: {
      kappaleet: [
        {
          teksti: 'George Vancouver kartoitti rannikon 1792-1794 soutuveneillä, '
            + 'koska laivat eivät mahtuneet salmiin. Miehistö souti kesässä '
            + 'tuhansia kilometrejä ja palasi joka ilta samaan kysymykseen: '
            + 'onko tämä vuono läpikulku vai umpiperä.',
        },
        {
          teksti: 'Läpikulkua ei ollut. Luoteisväylää etsittiin vuonon pohjalta '
            + 'toisensa jälkeen, ja jokainen päättyi jäätikköön tai '
            + 'jokisuistoon. Vuoret nousevat merestä kolmeen kilometriin '
            + 'muutaman kymmenen kilometrin matkalla.',
        },
        {
          tiedosto: 'Mount Waddington.jpg',
          selite: 'Mount Waddington, 4 019 metriä, Brittiläisen Kolumbian korkein '
            + 'kokonaan omalla alueellaan oleva huippu. Se löydettiin '
            + 'kartalle vasta 1920-luvulla, koska sitä ei näy mereltä eikä '
            + 'sisämaasta.',
          lahde: 'Wikimedia Commons (CC BY 2.0), Kevin Teague',
        },
        {
          teksti: 'Siksi Inside Passage on olemassa. Laivareitti kulkee saarten '
            + 'suojassa Seattlesta Alaskaan, ja moni rannikkokylä on yhä '
            + 'sellainen, jonne pääsee vain vesitse tai lentäen.',
        },
      ],
    },

    ruwenzori: {
      kappaleet: [
        {
          teksti: 'Ptolemaios merkitsi karttaansa Kuun vuoret ja sanoi, että '
            + 'Niili lähtee niiden lumista. Kahdeksantoista vuosisataa '
            + 'myöhemmin lähde oli jo etsitty ja löydetty muualta, kun '
            + 'Stanley näki 24. toukokuuta 1888 jotain, mitä luuli ensin '
            + 'pilveksi.',
        },
        {
          lainaus: 'Silloin tajusin ensimmäistä kertaa, ettei se, mitä katselin, '
            + 'ollut suunnattoman vuoren kuva tai kaltaisuus vaan sen kiinteä '
            + 'aine, huippu lumen peittämänä.',
          kuka: 'Henry Morton Stanley',
          teos: 'In Darkest Africa, osa 1',
          vuosi: 1890,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/43654',
        },
        {
          tiedosto: 'Ruwenzori Mountains Virunga National Park.jpg',
          selite: 'Ruwenzori pilvien välistä. Vuoret ovat pilvessä lähes aina, ja '
            + 'rinteillä kasvaa jättiläismäisiä lobelioita ja ristikukkaisia, '
            + 'jotka ovat sopeutuneet yöpakkasiin ja päivän paahteeseen saman '
            + 'vuorokauden sisällä.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Cai Tjeenk Willink',
        },
        {
          teksti: 'Vuoren oli osoittanut poika, joka sanoi sen olevan suolan '
            + 'peitossa. Baker ja Emin Pasha olivat purjehtineet '
            + 'Albert-järveä sen juurella näkemättä mitään. Ptolemaios oli '
            + 'ollut osittain oikeassa: sulamisvesi menee Niiliin.',
        },
      ],
    },

    sarawat: {
      kappaleet: [
        {
          teksti: 'Punaisenmeren itärannalla nousee jono, joka pysäyttää '
            + 'kosteuden. Jemenin ylängöllä sataa säännöllisesti, ja rinteet '
            + 'on porrastettu terasseiksi kivimuurein. Työ on jatkunut yli '
            + 'kaksituhatta vuotta, ja muurit on ladottu ilman laastia.',
        },
        {
          tiedosto: 'Haraz Mountains, Yemen (12633745063).jpg',
          selite: 'Harazin vuorten terasseja. Muuri pitää mullan paikallaan ja '
            + 'hidastaa veden, joka muuten katoaisi rinnettä alas tunnissa. '
            + 'Kylät on rakennettu harjanteille, jotta viljelysmaata ei '
            + 'menisi hukkaan.',
          lahde: 'Wikimedia Commons (CC BY-SA 2.0), Rod Waddington',
        },
        {
          teksti: 'Kahvipensas tuotiin Etiopiasta näille terasseille '
            + '1400-luvulla, ja Jemenistä tuli maailman ensimmäinen '
            + 'kahvinviejä. Mokka on sataman nimi, ei pavun. Kun '
            + 'hollantilaiset veivät taimia Jaavaan 1600-luvun lopulla, '
            + 'monopoli oli ohi kahdessa sukupolvessa.',
        },
        {
          teksti: 'Terassit ovat nyt vaarassa toisesta syystä. Ylängön pohjavesi '
            + 'on ehtymässä, ja qat-pensas, joka juo enemmän ja tuottaa '
            + 'nopeammin, on syrjäyttänyt kahvin monelta rinteeltä.',
        },
      ],
    },

    'sierra-madre-occidental': {
      kappaleet: [
        {
          teksti: 'Rotkoja on kuusi ja ne ovat syvempiä kuin Grand Canyon. '
            + 'Barranca de Urique putoaa lähes kaksi kilometriä, ja sen '
            + 'pohjalla kasvaa palmuja samaan aikaan kun ylhäällä on mäntyä '
            + 'ja lunta.',
        },
        {
          lainaus: 'Pelottomatkin jesuiittalähetit luopuivat aluksi ajatuksesta '
            + 'laskeutua siihen, ja intiaanit kertoivat heille, että vain '
            + 'linnut tietävät kuinka syvä se on.',
          kuka: 'Carl Lumholtz',
          teos: 'Unknown Mexico, osa 1',
          vuosi: 1902,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/16426',
        },
        {
          tiedosto: 'Divisadero, Barrancas del Cobre, Chihuahua.jpg',
          selite: 'Divisaderon näköalapaikka Kuparirotkolla. Rautatie kulkee '
            + 'juuri tästä; se valmistui 1961 ja vaati 86 tunnelia ja 37 '
            + 'siltaa. Sitä ennen sisämaahan mentiin muulilla.',
          lahde: 'Wikimedia Commons (CC BY-SA 2.0), Comisión Mexicana de Filmaciones',
        },
        {
          teksti: 'Saavuttamattomuus säilytti kielen. Rarámurit puhuvat yhä '
            + 'omaansa, ja heidän oma nimensä tarkoittaa suunnilleen '
            + 'kevytjalkaisia: kylien väliset viestit vietiin juoksemalla, ja '
            + 'matkat mitattiin päivissä eikä kilometreissä.',
        },
      ],
    },

    'sierra-madre-oriental': {
      kappaleet: [
        {
          teksti: 'Meksikonlahdelta tuleva kostea tuuli nousee jonoa vastaan ja '
            + 'tiivistyy. Rinteillä on sumumetsää: tammia, saniaisia ja '
            + 'epifyyttejä keskellä maata, joka on muualla kuivaa '
            + 'piikkipensaikkoa.',
        },
        {
          tiedosto: 'Sierra Madre en Rayones - panoramio.jpg',
          selite: 'Sierra Madre Orientalin poimuja Nuevo Leónissa. Kerrokset ovat '
            + 'kalkkikiveä, joka syntyi matalassa meressä; nyt ne seisovat '
            + 'pystyssä ja vesi katoaa niiden sisään luoliksi.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), panza-rayada',
        },
        {
          teksti: 'Hopeatie kulki tästä. Zacatecasin ja Guanajuaton kaivosten '
            + 'tuotto vietiin Veracruzin satamaan, ja koska jonon läpi pääsi '
            + 'vain muutamasta kohdasta, tiestä tuli kaistale, jonka varrelle '
            + 'kaupungit kasvoivat.',
        },
        {
          teksti: 'Amerikan kaivokset tuottivat kolmen vuosisadan ajan noin neljä '
            + 'viidesosaa maailman hopeasta, ja iso osa siitä päätyi lopulta '
            + 'Kiinaan teestä ja silkistä maksettuna. Sumumetsiä on '
            + 'Meksikossa alle prosentti pinta-alasta.',
        },
      ],
    },

    'sierra-nevada': {
      kappaleet: [
        {
          teksti: 'Sama vuoristo teki kolme asiaa puolessa vuosisadassa. Talvella '
            + '1846 Donnerin retkikunta jäi lumeen solan alle, ja 87 '
            + 'lähteneestä selvisi 48; osa jäljelle jääneistä söi kuolleita.',
        },
        {
          tiedosto: 'Mount Whitney from south.jpg',
          selite: 'Mount Whitney, 4 421 metriä, itäpuolelta. Sierra on yksi '
            + 'kallistunut graniittilohkare: itärinne on kahden kilometrin '
            + 'muuri, länsirinne loiva. Alla oleva laakso kuuluu '
            + 'Kuolemanlaaksoon johtavaan altaiden sarjaan.',
          lahde: 'Wikimedia Commons (CC BY-SA 2.0), Mel Stoutsenberger',
        },
        {
          teksti: 'Kaksi vuotta myöhemmin samojen rinteiden puroista löytyi '
            + 'kultaa, ja Kaliforniaan tuli seuraavan vuosikymmenen aikana '
            + 'kolmesataatuhatta ihmistä. Kun John Muir käveli samat vuoret '
            + 'läpi kaksikymmentä vuotta myöhemmin, hän ehdotti niille toista '
            + 'nimeä.',
        },
        {
          lainaus: 'Silloin minusta tuntui, ettei Sierraa pitäisi kutsua Nevadaksi '
            + 'eli Lumiseksi jonoksi vaan Valon jonoksi.',
          kuka: 'John Muir',
          teos: 'The Mountains of California',
          vuosi: 1894,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/10012',
        },
      ],
    },

    skandit: {
      kappaleet: [
        {
          teksti: 'Selkäranka on jyrkkä lännestä ja loiva idästä, ja se ratkaisi '
            + 'kumman puolen asukkaat lähtivät merelle. Vuono ulottuu '
            + 'sisämaahan sata kilometriä ja on syvempi kuin ympäröivä meri; '
            + 'maatie ei ulottunut mihinkään.',
        },
        {
          tiedosto: 'Jotunheimen - view from Galdhøpiggen.JPG',
          selite: 'Jotunheimen Galdhøpiggenin huipulta. Skandien korkein kohta on '
            + '2 469 metriä, mutta se on jäätikön keskellä eikä näytä siltä: '
            + 'pohjoinen sijainti tuo lumirajan alas kilometrin päähän '
            + 'merenpinnasta.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Pudelek / Marcin Szala',
        },
        {
          teksti: 'Vuonot ovat jääkauden kaivamia laaksoja, jotka meri täytti. '
            + 'Sognefjord on 1 308 metriä syvä ja sen kynnys suulla vain '
            + 'sata: jäätikkö jyrsi pohjan merenpinnan alle mutta ei jaksanut '
            + 'kuljettaa ainesta ulos.',
        },
        {
          teksti: 'Selänne on myös vedenjakaja. Idän joet ehtivät kasvaa '
            + 'Pohjanlahdelle asti, lännen putoavat mereen muutamassa '
            + 'kymmenessä kilometrissä. Siksi Ruotsin vesivoima on joissa ja '
            + 'Norjan pudotuksessa.',
        },
      ],
    },

    'suuri-vedenjakajavuoristo': {
      kappaleet: [
        {
          teksti: 'Sydneyn siirtokunta oli 25 vuotta vanki omalla rannallaan. '
            + 'Sinisten vuorten yli ei päästy, vaikka yritettiin toistuvasti, '
            + 'ja Charles Darwin ihmetteli syytä vielä kaksikymmentä vuotta '
            + 'myöhemmin.',
        },
        {
          lainaus: 'Niin mahtavasta nimestä kuin Siniset vuoret ja niiden '
            + 'korkeudesta päättelin näkeväni uljaan vuorijonon kulkevan '
            + 'halki maan; sen sijaan loivasti nouseva tasanko esittää '
            + 'rannikon alangolle vain vähäpätöisen otsan.',
          kuka: 'Charles Darwin',
          teos: 'The Voyage of the Beagle',
          vuosi: 1845,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/944',
        },
        {
          teksti: 'Este ei ollut korkeus vaan muoto. Laaksoa seuraava kulkija '
            + 'päätyy aina umpiperään. Vuonna 1813 Blaxland, Lawson ja '
            + 'Wentworth kokeilivat päinvastaista: he pysyivät harjanteella '
            + 'eivätkä laskeutuneet kertaakaan, ja pääsivät läpi kolmessa '
            + 'viikossa.',
        },
        {
          tiedosto: 'Jamison Valley, Blue Mountains, Australia - Nov 2008.jpg',
          selite: 'Jamisonin laakso. Hiekkakivitasanko on sahautunut '
            + 'pystyseinäisiksi lahdiksi, joiden pohja on metsää; Darwin '
            + 'vertasi näkymää kuivuneeseen satamaan, jonka pohjalle on '
            + 'kasvanut metsä.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Diliff',
        },
      ],
    },

    taurusvuoret: {
      kappaleet: [
        {
          teksti: 'Kilikian portit ovat muutaman kilometrin pituinen rako '
            + 'Taurusvuorten läpi, paikoin niin kapea, ettei kaksi kärryä '
            + 'mahdu rinnakkain. Kyros nuoremman armeija nousi sinne 401 eaa. '
            + 'valmiina taisteluun, jota ei tullut: solaa vartioinut '
            + 'Syennesis oli lähtenyt yöllä.',
        },
        {
          tiedosto: 'Puertas Cilícias.jpg',
          selite: 'Kilikian portit nykyisin. Çakıt-joki on sahannut raon '
            + 'kalkkikiveen, ja tie kulkee samassa uomassa kuin ennen. '
            + 'Kalliossa näkyy yhä leikkausjälkiä, joita on pidetty '
            + 'roomalaisen levennystyön jälkinä.',
          lahde: 'Wikimedia Commons (PD)',
        },
        {
          teksti: 'Kyroksen retki päättyi kolmen kuukauden päästä hänen '
            + 'kuolemaansa Kunaksassa, ja kreikkalaiset joutuivat kävelemään '
            + 'kotiin. Sola sen sijaan jäi käyttöön ja on ollut käytössä '
            + 'siitä asti.',
        },
        {
          lainaus: 'Se on joka puolelta suljettu jyrkkien ja korkeiden vuorten '
            + 'muuriin, merestä mereen.',
          kuka: 'Ksenofon',
          teos: 'Anabasis I.2, engl. H. G. Dakyns',
          vuosi: 'n. 370 eaa.',
          suomennos: 'oma, Dakynsin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/1170',
        },
      ],
    },

    tibesti: {
      kappaleet: [
        {
          teksti: 'Emi Koussi on kolme ja puoli kilometriä korkea kilpitulivuori, '
            + 'jonka lakikaldera on runsaat kymmenen kilometriä leveä. Se on '
            + 'Saharan korkein kohta, ja sen muoto on niin lähellä Marsin '
            + 'Elysium Monsia, että planeettatutkijat käyttävät sitä '
            + 'vertailukohtana.',
        },
        {
          tiedosto: 'Emi Koussi.jpg',
          selite: 'Emi Koussi satelliitista. Loiva kilpi ja keskellä romahtanut '
            + 'kaldera; pohjalla on tuhkakartioita ja kuivunutta natronia. '
            + 'Ympärillä ei ole mitään sadan kilometrin säteellä.',
          lahde: 'Wikimedia Commons (PD), NASA',
        },
        {
          teksti: 'Gustav Nachtigal oli 1869 ensimmäinen ulkopuolinen, joka pääsi '
            + 'Tibestiin. Hän selvisi hädin tuskin: tedat pitivät häntä '
            + 'vakoojana ja riistivät häneltä lähes kaiken. Alue '
            + 'kartoitettiin kunnolla vasta 1900-luvun puolivälissä.',
        },
        {
          teksti: 'Trou au Natron on toinen kraatteri, lähes kilometrin syvä, ja '
            + 'sen pohjalla on valkoista natriumkarbonaattia. Vulkanismi ei '
            + 'ole loppunut: kuumia lähteitä ja rikkihöyryä on yhä.',
        },
      ],
    },

    tienshan: {
      kappaleet: [
        {
          teksti: 'Nimi on käännös. Kiinan Tianshan ja turkkilaisten Tengri tag '
            + 'tarkoittavat kumpikin taivaan vuoria, ja Tengri oli arojen '
            + 'taivaanjumala. Kaksi kieltä ja kaksi uskontoa päätyivät samaan '
            + 'sanaan katsoessaan samaa harjaa.',
        },
        {
          teksti: 'Vuoriston juurella Silkkitie haarautui. Taklamakanin voi '
            + 'kiertää pohjoisesta tai etelästä, ja valinta ratkaisi, kenen '
            + 'kaupungin läpi lasti kulki. Turfan, Kuča ja Kašgar elivät '
            + 'siitä valinnasta, ja niiden vauraus vaihteli sen mukana.',
        },
        {
          tiedosto: 'Khan Tengri 87 (355).jpg',
          selite: 'Khan Tengri iltavalossa. Marmorihuippu punertuu '
            + 'auringonlaskussa, ja siitä tulee nimi: taivaan herra. Kuvan '
            + 'otti virolainen Jaan Künnap kiipeilyretkellä 1987.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Jaan Künnap',
        },
        {
          teksti: 'Jäätiköitä on runsaat viisitoistatuhatta. Ne sulavat kesällä '
            + 'juuri silloin, kun aroilla on kuivinta, ja Ili, Tarim ja Chu '
            + 'saavat siitä vetensä. Keitaat ovat sulamiskäyrän varassa, '
            + 'eivät sateen.',
        },
      ],
    },

    'tiibetin-ylatasanko': {
      kappaleet: [
        {
          teksti: 'Ranskalaiset lasaristit Évariste Huc ja Joseph Gabet '
            + 'liittyivät 1845 karavaaniin, joka kulki ylätasangon poikki '
            + 'Lhasaan. Tang-Lan edessä matkatoverit ilmoittivat, että '
            + 'sairaat kuolevat ja terveet sairastuvat. Gabetin kuolemaa '
            + 'pidettiin varmana.',
        },
        {
          tiedosto: 'A Proliferation of Lakes on the Tibetan Plateau (154011 - oli2 20240811 lrg).jpg',
          selite: 'Changtangin järviä satelliitista. Umpinaisella ylätasangolla '
            + 'vedellä ei ole ulospääsyä, joten se jää altaisiin ja haihtuu '
            + 'suolaiseksi. Järvien pinta-ala on kasvanut mitattavasti viime '
            + 'vuosikymmeninä.',
          lahde: 'Wikimedia Commons (PD), NASA Earth Observatory',
        },
        {
          lainaus: 'Tang-Lalta laskeutuminen kesti kauan mutta oli itsessään '
            + 'nopeaa. Neljä kokonaista päivää me laskeuduimme kuin '
            + 'jättiläisportaita, joiden jokainen askelma oli vuori.',
          kuka: 'Évariste Régis Huc',
          teos: 'Travels in Tartary, Thibet and China, engl. William Hazlitt',
          vuosi: 1852,
          suomennos: 'oma, Hazlittin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/33269',
        },
        {
          teksti: 'Gabet parani, ja karavaani pääsi Lhasaan tammikuussa 1846. '
            + 'Kuukauden päästä Kiinan lähetti karkotti heidät. Hucin '
            + 'kertomus jäi vuosikymmeniksi ainoaksi länsimaiseksi '
            + 'kuvaukseksi reitistä, jota kukaan ei kulkenut uudelleen.',
        },
      ],
    },

    ural: {
      kappaleet: [
        {
          teksti: 'Maanosien raja on sopimus, ja se piti merkitä käsin. Permin ja '
            + 'Tobolskin läänien rajalla, tien varressa metsäaukiolla, seisoi '
            + 'runsaan kolmen metrin tiilipylväs: toisella kyljellä Euroopan '
            + 'puoleisen läänin vaakuna, toisella Aasian.',
        },
        {
          teksti: 'Pylvään ohi kulki Siperian karkotustie. George Kennan pysähtyi '
            + 'siihen 1885 ja laski, että saman kohdan oli vuosisadan aikana '
            + 'ylittänyt yli puoli miljoonaa karkotettua. Saattueiden '
            + 'annettiin levätä siinä ja jättää hyvästit.',
        },
        {
          lainaus: 'Jotkut polvistuivat ja painoivat kasvonsa kotimaansa '
            + 'rakkaaseen maahan ja keräsivät siitä vähän mukaansa '
            + 'karkotukseen; muutamat painoivat huulensa kylmän tiilipylvään '
            + 'eurooppalaiselle puolelle, kuin suudellen jäähyväiset '
            + 'kaikelle, mitä se merkitsi.',
          kuka: 'George Kennan',
          teos: 'Siberia and the Exile System',
          vuosi: 1891,
          suomennos: 'oma',
          linkki: 'https://archive.org/details/siberiaexilesyst01kenn',
        },
        {
          tiedosto: 'Snow in the Ural Mountains (MODIS 2016-05-03).jpg',
          selite: 'Ural toukokuussa satelliitista. Jono erottuu lumijuovana '
            + 'kahdentuhannen kilometrin matkalla, mutta korkeus on vain '
            + 'vajaat kaksituhatta metriä. Maasta katsottuna sitä ei aina '
            + 'huomaa ylittävänsä.',
          lahde: 'Wikimedia Commons (PD), NASA / MODIS',
        },
      ],
    },

    'uuden-guinean-ylangot': {
      kappaleet: [
        {
          teksti: 'Saarella puhutaan yli kahdeksaasataa kieltä, noin kymmenesosa '
            + 'maailman kielistä. Syy on laakso. Vuoristo pilkkoo ylängön '
            + 'altaisiin, joiden välillä on päivien kävely jyrkkää metsää, ja '
            + 'kieli ehtii erkaantua sukupolvissa.',
        },
        {
          tiedosto: '20170905 Papouasie Baliem valley.jpg',
          selite: 'Baliemin laakso. Pohja on tasainen ja ojitettu, ja '
            + 'bataattipenkkejä on viljelty samalla tavalla tuhansia vuosia. '
            + 'Laakson korkeus on 1 600 metriä, joten malariaa ei ole.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Lasthib',
        },
        {
          teksti: 'Suuret asutut laaksot löytyivät ulkomaailmalle vasta '
            + '1930-luvulla. Kun australialaiset kullanetsijät lensivät '
            + 'ylängön yli, alla oli siistiä ojitettua peltoa ja arviolta '
            + 'miljoona ihmistä, joiden olemassaolosta ei ollut tietoa.',
        },
        {
          teksti: 'Puncak Jayan rinteellä on jäätikkö neljännellä leveysasteella '
            + 'päiväntasaajasta. Sitä oli 1936 noin kolmetoista '
            + 'neliökilometriä. Nyt on jäljellä alle yksi, ja sulaminen on '
            + 'ollut nopeinta 2000-luvulla.',
        },
        {
          tiedosto: 'Cartens peaks in West Papua.jpg',
          selite: 'Puncak Jaya eli Carstenszin pyramidi, 4 884 metriä. '
            + 'Kalkkikiveä, jossa on merieläinten jäänteitä: laatta on '
            + 'noussut merenpohjasta lähes viiteen kilometriin muutamassa '
            + 'miljoonassa vuodessa.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Richarderari',
        },
      ],
    },

    'uuden-seelannin-alpit': {
      kappaleet: [
        {
          teksti: 'Samuel Butler tuli Canterburyyn 1860 kasvattamaan lampaita ja '
            + 'etsi laitumia vuorten juurelta. Retkillä hän tajusi, että '
            + 'jokainen ylitetty harjanne oli vain sivuhaara ja pääjono oli '
            + 'aina kauempana lännessä.',
        },
        {
          lainaus: 'Seuraavana aamuna, aivan aamunkoitossa, näky oli mitä '
            + 'suurenmoisin. Vuoret olivat kalpeat kuin aaveet ja melkein '
            + 'vastenmieliset kuolemanvalkeudessaan.',
          kuka: 'Samuel Butler',
          teos: 'A First Year in Canterbury Settlement',
          vuosi: 1863,
          suomennos: 'oma',
          linkki: 'https://www.gutenberg.org/ebooks/3235',
        },
        {
          teksti: 'Laattojen törmäys nostaa Eteläisiä Alppeja lähes sentin '
            + 'vuodessa, ja eroosio vie melkein saman verran pois. '
            + 'Länsirinteellä sataa kymmenen metriä, ja harjan ylitettyään '
            + 'pilvi on jo kuiva: Canterburyn tasanko on saman vuoriston '
            + 'toinen puoli.',
        },
        {
          tiedosto: 'Aoraki-Mount Cook from Tasman Lake outlet.jpg',
          selite: 'Aoraki Tasmanjärven laskukohdalta. Järveä ei ollut '
            + '1970-luvulla lainkaan: se on syntynyt jäätikön vetäytyessä ja '
            + 'kasvaa yhä. Huippu on 3 724 metriä, ja vuoden 1991 sortuma vei '
            + 'siitä kymmenen metriä kerralla.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Avenue',
        },
      ],
    },

    verhojansk: {
      kappaleet: [
        {
          teksti: 'Verhojanskissa luettiin helmikuussa 1892 lämpömittarista 67,8 '
            + 'pakkasastetta. Se on kylmin luku, joka on koskaan mitattu '
            + 'asutulta paikalta pohjoisella pallonpuoliskolla; Oimjakon on '
            + 'kiistänyt ensimmäisen sijan myöhemmin.',
        },
        {
          tiedosto: 'Verkhoyansk Range, Republic of Sakha (Yakutia), Russia - 2-2019.jpg',
          selite: 'Verhojanskin vuoristoa helmikuussa. Jono kaartaa Lenan takana '
            + 'runsaat tuhat kilometriä ja on korkeimmillaan vain 2 400 '
            + 'metriä. Kylmä ei tule korkeudesta vaan siitä, mitä vuoret '
            + 'ympäröivät.',
          lahde: 'Wikimedia Commons (CC BY-SA 3.0), Ilja Varlamov',
        },
        {
          teksti: 'Syy on muoto. Kaari sulkee Jakutian altaan pussiksi, ja '
            + 'talvella raskas kylmä ilma valuu rinteitä alas ja jää '
            + 'altaaseen makaamaan, koska sillä ei ole mihinkään mennä. Sama '
            + 'ilma on paikallaan kuukausia.',
        },
        {
          teksti: 'Kesällä sama kylä nousee yli kolmenkymmenen asteen. Vuotuinen '
            + 'vaihteluväli on runsaat sata astetta, suurin maapallolla '
            + 'mitattu, ja se osuu paikkaan, jossa asuu ihmisiä.',
        },
      ],
    },

    zagros: {
      kappaleet: [
        {
          teksti: 'Kymmenentuhatta kreikkalaista palkkasoturia yritti vuonna 401 '
            + 'eaa. päästä kotiin Babylonin luota. Tigris oli liian syvä ja '
            + 'ranta liian kapea, joten oli mentävä vuorten läpi. Vangit '
            + 'kertoivat, että ylhäällä asuu kansa, joka ei tottele '
            + 'kuningasta.',
        },
        {
          tiedosto: 'Zagros from above.jpg',
          selite: 'Zagrosin poimuja ilmasta. Kerrokset ovat taipuneet aalloiksi '
            + 'Arabian ja Euraasian laattojen välissä, ja jokien uomat '
            + 'seuraavat poimujen välejä, mikä tekee poikittaisesta '
            + 'kulkemisesta hidasta.',
          lahde: 'Wikimedia Commons (CC BY-SA 4.0), Chrisrabinson',
        },
        {
          lainaus: 'Seitsemän päivää karduukkien maassa oli ollut yhtä '
            + 'yhtämittaista taistelua, ja ne olivat maksaneet enemmän '
            + 'kärsimystä kuin kaikki vaivat kuninkaan ja Tissafernesin '
            + 'käsissä yhteensä.',
          kuka: 'Ksenofon',
          teos: 'Anabasis IV.3, engl. H. G. Dakyns',
          vuosi: 'n. 370 eaa.',
          suomennos: 'oma, Dakynsin englanninnoksesta',
          linkki: 'https://www.gutenberg.org/ebooks/1170',
        },
        {
          teksti: 'Karduukit ovat kurdien esi-isiä. Sama vuoristo on paikka, '
            + 'jossa vehnä ja ohra kesytettiin ja vuohi otettiin '
            + 'kotieläimeksi. Kirja, jonka Ksenofon retkestä kirjoitti, oli '
            + 'vuosisatoja kreikan ensimmäinen oppikirja Euroopan kouluissa.',
        },
      ],
    },
  },
};
