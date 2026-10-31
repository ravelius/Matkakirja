/*
 * KADONNEET EUROOPPALAISET MONUMENTIT — 38 uutta karttakohdetta.
 *
 * Tutkimus: output/fable-images-20260921/source-orders/
 * fable-codexille-monumentit-eurooppa-{1,2,3-4}-20260921.md.
 * Skálholt ei ole tässä: sen olemassa oleva maastokohde saa ihmeen
 * maastokohteet-isl.js:ssä. Raunioina säilyvät 30 parikuvaa ovat jo
 * omissa hahmotelmapakoissaan ja saavat paikalliset ihmeosoitteet siellä.
 */

const ihme = (tiedosto, selite, url) => ({
  osoite: `https://media.matkakirja.app/kohtaamiset/ihmeet/${tiedosto}`,
  kadonnut: true,
  selite,
  lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan. '
    + 'Faktapohja on kohdekortin lähderivillä.',
  url,
});

const kohde = ({ id, nimi, nimio, nappi, laudat, teksti, lahde, kuva, url }) => ({
  id: `hahmotelma-${id}`,
  nimi,
  ...(nimio ? { nimio } : {}),
  tyyppi: 'historia',
  lahi: true,
  kysymykset: [
    `Miltä ${nimi} näytti loistoaikanaan?`,
    `Miksi ${nimi} katosi?`,
  ],
  nappi,
  laudat,
  teksti,
  lahde,
  ihme: ihme(kuva, `${nimi} on kuvattu ehjänä historiallisten kuvausten, säilyneiden `
    + 'jäänteiden ja tutkimuslähteiden perusteella.', url),
});

/*
 * KADONNUT IHME OMIN TEKSTEIN (omistaja 31.10.2026 klo 12.49: 43 kadonnutta ihmettä Euroopan kaupunkien kartoille; PT
 * hyväksyi tekstit erittäin). Kuten kohde(), mutta kysymykset, korostukset ja ihmekortin lyhyt/selite/lähde ovat
 * kohteen omia (malli Tuileries'n palatsi, fokuskohteet-fra.js). Sama nimi on kaupungin kohdekartalla, joten
 * ihmetähti ja kortti osuvat nimellä (matkakirjanIhme). Generoitu: proto-3d/_tyo/karttaseppa/ihmeet-kytke.py.
 */
const ihmeKohde = ({
  id, nimi, nimio, kysymykset, korostukset, nappi, laudat, teksti, lahde, kuva, lyhyt, selite, ihmeLahde, url,
}) => ({
  id: `hahmotelma-${id}`,
  nimi,
  ...(nimio ? { nimio } : {}),
  tyyppi: 'historia',
  lahi: true,
  kysymykset,
  korostukset,
  nappi,
  laudat,
  teksti,
  lahde,
  ihme: {
    osoite: `https://media.matkakirja.app/kohtaamiset/ihmeet/${kuva}`,
    kadonnut: true,
    lyhyt,
    selite,
    lahde: ihmeLahde,
    url,
  },
});

/*
 * RAPPEUTUNUT KOHDE (kadonnut: false) — paikka on yhä olemassa
 * raunioina/muuttuneena, joten kartalla säilyy kohteen oma nykytila-
 * valokuva (Commonsista) ja "Koe ihme" -nappi avaa Codexin loistoaika-
 * havainnekuvan (kuvapari, Raamattu 21.9.2026: rappeutunut = nykytila +
 * kulta-aika). Sama malli kuin fokuskohteet-grc.js:n Delfoi.
 */
const rappeutunutKohde = ({
  id, nimi, nimio, nappi, laudat, teksti, lahde, kuva, ihmeKuva, ihmeSelite, url, kysymykset,
}) => ({
  id: `hahmotelma-${id}`,
  nimi,
  ...(nimio ? { nimio } : {}),
  tyyppi: 'historia',
  lahi: true,
  kysymykset: kysymykset ?? [
    `Miltä ${nimi} näytti loistoaikanaan?`,
    `Miksi ${nimi} on nykyään raunioina?`,
  ],
  nappi,
  laudat,
  teksti,
  lahde,
  kuva,
  ihme: {
    osoite: `https://media.matkakirja.app/kohtaamiset/ihmeet/${ihmeKuva}`,
    kadonnut: false,
    selite: ihmeSelite,
    lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan. '
      + 'Faktapohja on kohdekortin lähderivillä.',
    url,
  },
});

export const EUROOPAN_KADONNEET = {
  FRA: [
    ihmeKohde({
      id: 'pont-transbordeur',
      nimi: 'Marseillen siirtosilta',
      nimio: 'Pont Transbordeur',
      kysymykset: ['Miten matkustajat ylittivät Vanhan sataman siirtosillalla?', 'Milloin Marseillen siirtosilta räjäytettiin?'],
      korostukset: ['Ferdinand Arnodin|Ferdinand Arnodinin', 'Vanha satama|Vanhan sataman'],
      nappi: 'Silta, jonka kori ylitti sataman puolessatoista minuutissa',
      laudat: { maailmankartta: { x: 6012.1, y: 1671.4 }, europe: { x: 314.2, y: 754.9 } },
      teksti: 'Marseillen siirtosilta ylitti Vanhan sataman Quai du Portin ja Rive-Neuven välillä. Insinööri '
        + 'Ferdinand Arnodinin suunnittelema rakenne valmistui 19 kuukaudessa ja avattiin 15. joulukuuta '
        + '1905. Kaksi 86,6 metriä korkeaa tornia kannatti 239 metriä pitkää kantta 52 metrin korkeudessa '
        + 'veden yläpuolella. Matkustajat ylittivät sataman kannesta roikkuvalla korilla, joka liikkui '
        + 'kantta pitkin ja kulki matkan noin puolessatoista minuutissa. Pohjoisessa tornissa oli hissi '
        + '1907 lähtien, 74 metrin korkeudella oli näköalataso ja kannen pohjoispäässä kalaravintola. '
        + '1930-luvulla silta oli enää koriste, koska huoltoon ei ollut varoja. Saksalaiset räjäyttivät sen '
        + '22. elokuuta 1944; vain pohjoinen torni putosi, ja loput romahti 1. syyskuuta 1945.',
      lahde: 'fr-Wikipedia ”Pont transbordeur de Marseille”; en-Wikipedia ”Marseille Transporter Bridge” '
        + '(tarkistettu 31.10.2026).',
      kuva: 'ihme-pont-transbordeur-loistoaika.jpg',
      lyhyt: 'Kannesta roikkuva kori ylittää Vanhan sataman puolessatoista minuutissa, ja ylhäällä on '
        + 'kalaravintola ja 74 metrin korkeudella näköalataso; lähes neljäkymmentä vuotta myöhemmin silta '
        + 'räjäytetään.',
      selite: 'Vuonna 1905 uuden sillan kannesta roikkuva kori ylittää Vanhan sataman puolessatoista '
        + 'minuutissa, ja 239 metriä pitkän, 52 metrin korkeudessa kulkevan kannen alta laivat pääsevät '
        + 'satamaan. Kori on 20 tonnin painoinen ja pinta-alaltaan 120 neliömetriä. Tornista pääsee '
        + 'portaita ylös näköalatasolle, ja kannella odottaa kalaravintola. Elokuussa 1944 saksalaiset '
        + 'räjäyttävät sillan Marseillen vapautuksen aikana sataman tukkimiseksi, ja loput kaatuu '
        + 'syyskuussa 1945.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1905). Faktat: fr- ja '
        + 'en-Wikipedia, tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Marseille_Transporter_Bridge',
    }),
    ihmeKohde({
      id: 'grand-chatelet',
      nimi: 'Grand Châtelet',
      kysymykset: ['Mikä kulki Grand Châtelet\'n rakennuksen alta?', 'Mitä Grand Châtelet\'n paikalla on?'],
      korostukset: ['prévôt|prévôtin', 'Rue Saint-Denis|Rue Saint-Denis'],
      nappi: 'Linnake, jonka läpi kulki katu',
      laudat: { maailmankartta: { x: 5911.6, y: 1439.6 }, europe: { x: 256.3, y: 608.6 } },
      teksti: 'Grand Châtelet oli Pariisin oikeus- ja vankilalinnake Seinen oikealla rannalla, jonka Ludvig VI '
        + 'rakennutti kiveksi noin 1130. Philippe Auguste rakennutti kaupungin muurin 1190, ja linnakkeesta '
        + 'tuli Pariisin prévôtin oikeudenkäytön ja poliisin pääpaikka. Ludvig XIV rakennutti rakennuksen '
        + 'lähes kokonaan uudelleen 1684. Rue Saint-Denis kulki rakennuksen alta: idässä oli vankila, '
        + 'lännessä tuomareiden salit ja kaupungin ruumishuone. Vankeina olivat muun muassa François '
        + 'Villon, Molière ja rosvo Cartouche. Seudulla haisi läheisten teurastamojen veri, ja viemärivesi '
        + 'virtasi Seineen. Prévôtin virka lakkautettiin 1790, ja linnake purettiin 1802–1810. Paikalle '
        + 'tuli Place du Châtelet, jonka vierellä Théâtre du Châtelet avattiin 1862.',
      lahde: 'en-Wikipedia "Grand Châtelet", johdanto ja osiot "History" ja "Demolition"; fr-Wikipedia "Grand '
        + 'Châtelet", osiot "Histoire" ja "Prisons" (tarkistettu 31.10.2026).',
      kuva: 'ihme-grand-chatelet-loistoaika.jpg',
      lyhyt: 'Kärryt ja kulkijat tunkevat Rue Saint-Denisin kautta Grand Châtelet\'n holvin alta, ja ilma '
        + 'haisee läheisten teurastamoiden verestä; reilut viisikymmentä vuotta myöhemmin purku alkaa.',
      selite: 'Noin vuonna 1750 kuormat, kantajat ja kauppiaat tunkevat Rue Saint-Denisiä pitkin Grand '
        + 'Châtelet\'n rakennuksen alta, ja ilma haisee teurastamoiden verestä ja Seineen virtaavasta '
        + 'viemärivedestä. Rakennuksen itäpuolella on vankila, länsipuolella tuomioistuin, ja kulkijat '
        + 'ohittavat molemmat nopeasti. Prévôtin virka lakkautetaan 1790, ja linnake puretaan 1802–1810.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1750). Faktat: en- ja '
        + 'fr-Wikipedia "Grand Châtelet", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Grand_Ch%C3%A2telet',
    }),
    ihmeKohde({
      id: 'temple-torni',
      nimi: 'Temple-torni',
      kysymykset: ['Miksi Napoleon määräsi Temple-tornin purettavaksi?', 'Mitä Temple-tornin paikalla on?'],
      korostukset: ['temppeliritari|temppeliritarien', 'kuningasperhe|kuningasperheen'],
      nappi: 'Torni, jonka Napoleon käski purkaa',
      laudat: { maailmankartta: { x: 5912.0, y: 1439.2 }, europe: { x: 256.5, y: 608.4 } },
      teksti: 'Temple-torni eli Grosse Tour oli temppeliritarien Pariisin päämajan linnoitustorni, jonka '
        + 'rakentaminen alkoi 1240 Ludvig Pyhän aikana. Torni oli noin 50 metriä korkea, sen muurit olivat '
        + 'keskimäärin neljä metriä paksut, ja kulmissa oli neljä pienempää tornia. Temppeliritarikunta '
        + 'lakkautettiin 1312. Elokuun 13. päivänä 1792 Pariisin kommuuni vei kuningasperheen Templeen; '
        + 'Ludvig XVI lähti sieltä giljotiinille 21. tammikuuta 1793. Hänen poikansa Ludvig XVII kuoli '
        + 'Templessä 8. kesäkuuta 1795 kymmenvuotiaana. Napoleon määräsi tornin purettavaksi 1808 '
        + 'estääkseen rojalistien pyhiinvaellukset, ja purku kesti kaksi vuotta. Tornin paikasta osa on '
        + 'nykyisin Square du Temple -puistoa.',
      lahde: 'en-Wikipedia "Tour du Temple", johdanto ja osiot "Origins", "Royal imprisonment" ja '
        + '"Demolition"; fr-Wikipedia "Tour du Temple", osiot "Histoire" ja "Prison" (tarkistettu '
        + '31.10.2026).',
      kuva: 'ihme-temple-torni-loistoaika.jpg',
      lyhyt: 'Temppeliritari ylittää linnoituksen pihan jättitornin varjossa, ja neljä kulmatornia kohoavat '
        + 'taivasta vasten; yli viisisataa vuotta myöhemmin tornista tulee kuningasperheen vankila.',
      selite: 'Noin vuonna 1260 temppeliritari ylittää Templen pihan, jonka yläpuolella kohoaa noin 50 metrin '
        + 'torni, jonka kulmissa on neljä pienempää tornia. Neljän metrin paksuiset muurit tekevät siitä '
        + 'varman paikan ritarikunnan päämajalle. Hänen kannuksensa kilahtavat kivipihaa vasten. Vuonna '
        + '1792 kuningasperhe viedään Templeen vangiksi, ja Napoleon käskee 1808 purkaa tornin, jottei '
        + 'siitä tule kuninkaanmuiston pyhiinvaelluskohdetta.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1260). Faktat: en- ja '
        + 'fr-Wikipedia "Tour du Temple", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Tour_du_Temple',
    }),
    ihmeKohde({
      id: 'palais-orsay',
      nimi: 'Palais d\'Orsay',
      nimio: 'Orsayn palatsi',
      kysymykset: ['Kuka sytytti Palais d\'Orsayn tuleen vuonna 1871?', 'Mikä rakennus nousi palatsin raunioiden tilalle?'],
      korostukset: ['kommunardi|kommunardit', 'fresko|freskoista'],
      nappi: 'Palatsi, jonka raunioista tuli asema',
      laudat: { maailmankartta: { x: 5910.9, y: 1439.5 }, europe: { x: 255.9, y: 608.6 } },
      teksti: 'Palais d\'Orsay oli Seinen rannalla Quai d\'Orsay\'lla seissyt hallintopalatsi, jonka Napoleon I '
        + 'aloitti 1810 ja joka valmistui vasta 1838. Arkkitehti Jacques-Charles Bonnard suunnitteli sen, '
        + 'ja Jacques Lacornée jatkoi työtä. Valtioneuvosto muutti alakertaan 1840 ja '
        + 'tilintarkastustuomioistuin Cour des comptes ensimmäiseen kerrokseen 1842, ja sen portaikkoon '
        + 'Théodore Chassériau maalasi freskot. Palatsin sytyttivät tuleen kommunardit yönä 23.–24. '
        + 'toukokuuta 1871. Rauniot jäivät keskelle Pariisia, ja isoisä näki ne 1873. Vain noin 60 '
        + 'neliömetriä freskoista säilyi, koska ne jäivät sään armoille 27 vuodeksi. Rauniot purettiin '
        + 'vuodesta 1898, ja paikalle rakennettiin Gare d\'Orsay vuoden 1900 maailmannäyttelyä varten.',
      lahde: 'en-Wikipedia "Palais d\'Orsay", johdanto ja osiot "History" ja "Fire"; fr-Wikipedia "Palais '
        + 'd\'Orsay"; en-Wikipedia "Musée d\'Orsay", johdanto (tarkistettu 31.10.2026).',
      kuva: 'ihme-palais-orsay-loistoaika.jpg',
      lyhyt: 'Tilintarkastajat nousevat Chassériaun maalaamaa portaikkoa Seinen rannan palatsissa; reilut '
        + 'kymmenen vuotta myöhemmin kommunardit sytyttävät palatsin tuleen.',
      selite: 'Noin vuonna 1860 tilintarkastajat ja valtioneuvoston virkamiehet nousevat Théodore Chassériaun '
        + 'freskojen koristamaa portaikkoa, ja ikkunoista näkyy Seine. Alakerrassa valtioneuvosto on '
        + 'istunut vuodesta 1840 ja yläkerrassa tilintarkastustuomioistuin vuodesta 1842, ja käytävillä '
        + 'kahisevat asiakirjanipput. Toukokuussa 1871 kommunardit sytyttävät rakennuksen, ja rauniot '
        + 'seisovat Seinen rannalla vuoteen 1898 asti; sitten ne puretaan ja paikalle rakennetaan asema.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1860). Faktat: en- ja '
        + 'fr-Wikipedia "Palais d\'Orsay", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Palais_d%27Orsay',
    }),
    ihmeKohde({
      id: 'palais-industrie',
      nimi: 'Palais de l\'Industrie',
      nimio: 'Teollisuuspalatsi',
      kysymykset: ['Mitä Palais de l\'Industrien paikalle rakennettiin?', 'Mitä taidenäyttelyä siellä pidettiin vuosittain?'],
      korostukset: ['Salon|Salon', 'Grand Palais|Grand Palais\'n'],
      nappi: 'Lasihalli, jonka tilalle tuli Grand Palais',
      laudat: { maailmankartta: { x: 5910.4, y: 1439.2 }, europe: { x: 255.6, y: 608.4 } },
      teksti: 'Palais de l\'Industrie oli lasi- ja rautahalli Champs-Élysées\'n varrella, joka rakennettiin '
        + 'vuoden 1855 Pariisin maailmannäyttelyä varten. Arkkitehti Jean-Marie-Victor Vielin ja insinööri '
        + 'Alexis Barrault\'n suunnittelema rakennus piilotti rautarakenteensa kivijulkisivun taakse, ja sen '
        + 'päälaiva oli 190 metriä pitkä ja 48 metriä leveä. Halli ei ollut valmis avajaisissa, ja huono '
        + 'ilmanvaihto teki siitä päivisin tukalan. Kirjailija Octave Mirbeau vertasi sitä härkään, joka '
        + 'tallaa ruusutarhaa. Vuosina 1857–1897 siellä pidettiin vuosittain Salon, ja 1881 ensimmäinen '
        + 'kansainvälinen sähkönäyttely. Isoisän käydessä 1873 halli oli käytössä. Se purettiin 1896–1897 '
        + 'Grand Palais\'n tieltä, ja sen rautaa ja kiveä käytettiin Notre-Dame-du-Travail-kirkossa.',
      lahde: 'en-Wikipedia "Palais de l\'Industrie", johdanto ja osiot "Architecture", "History" ja "Legacy"; '
        + 'fr-Wikipedia "Palais de l\'Industrie", osiot "Historique" ja "Utilisation" (tarkistettu '
        + '31.10.2026).',
      kuva: 'ihme-palais-industrie-loistoaika.jpg',
      lyhyt: 'Salonin vieraat kulkevat taulujen ohi lasikaton alla ja kriitikot voivottelevat rakennuksen '
        + 'painavuutta; kaksikymmentäneljä vuotta myöhemmin halli on poissa.',
      selite: 'Vuonna 1873 Salonin vieraat kulkevat rautaisen ja lasisen hallin sisällä taulujen ohi, ja ulkoa '
        + 'Champs-Élysées\'lle näkyy kivijulkisivu, joka kätkee raudan. Arvostelijat pitävät rakennusta '
        + 'raskaana, ja lasikaton alla kävijöiden askeleet kaikuvat. Sisäänkäynnin yllä komeilee Élias '
        + 'Robertin veistosryhmä Ranska kruunaa taiteen ja teollisuuden. Halli puretaan 1896–1897 vuoden '
        + '1900 maailmannäyttelyn tieltä, ja paikalle nousevat Grand Palais ja Petit Palais.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1873, isoisän matkavuosi). '
        + 'Faktat: en-Wikipedia "Palais de l\'Industrie" ja fr-Wikipedia "Palais de l\'Industrie", '
        + 'tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Palais_de_l%27Industrie',
    }),
    ihmeKohde({
      id: 'trocadero',
      nimi: 'Trocadéron palatsi',
      nimio: 'Trocadéro',
      kysymykset: ['Mitä Trocadéron palatsista jäi pystyyn?', 'Miksi palatsi purettiin 1935?'],
      korostukset: ['maailmannäyttely|maailmannäyttelyä', 'Chaillot\'n palatsi|Chaillot\'n palatsin'],
      nappi: 'Näyttelypalatsi, jota ei tehty kestämään',
      laudat: { maailmankartta: { x: 5909.6, y: 1439.4 }, europe: { x: 255.1, y: 608.5 } },
      teksti: 'Trocadéron palatsi rakennettiin vuoden 1878 Pariisin maailmannäyttelyä varten Seinen '
        + 'pohjoisrannalle, ja sen suunnittelivat Gabriel Davioud ja Jules Bourdais. '
        + 'Mauri-bysanttilaistyylisessä palatsissa oli kaksi yli 80 metriä korkeaa tornia ja kaksi kaarevaa '
        + 'siipeä, jotka venyttivät julkisivun noin 430 metriin. Keskellä oli 4 600 paikan sali, johon '
        + 'vihittiin Cavaillé-Collin urut. Työt kestivät marraskuusta 1876 kesäkuuhun 1878, ja kustannukset '
        + 'nousivat noin 12 miljoonaan kultafrangiin; palatsia ei ollut tarkoitettu kestämään näyttelyn '
        + 'jälkeen. Vuonna 1935 keskisali ja tornit purettiin vuoden 1937 näyttelyn tieltä, ja siivet '
        + 'jäivät uuden Chaillot\'n palatsin osiksi. Isoisä ei nähnyt Trocadérota, sillä sen rakennustyöt '
        + 'alkoivat vasta 1876.',
      lahde: 'en-Wikipedia "Palais du Trocadéro", johdanto ja osiot "History" ja "Architecture"; "Palais de '
        + 'Chaillot", osio "Design" ja "History" (tarkistettu 31.10.2026).',
      kuva: 'ihme-trocadero-loistoaika.jpg',
      lyhyt: 'Kesäpukuiset pariisilaisperheet seisovat kaskadin reunalla ihailemassa palatsin kahta tornia, ja '
        + 'sisällä 4 600 paikan salissa soivat vastavihityt urut; viisikymmentäseitsemän vuotta myöhemmin '
        + 'keskiosa puretaan.',
      selite: 'Vuonna 1878 näyttelyvieraat seisovat palatsin edessä kaskadin ja puutarhan yläpuolella ja '
        + 'katsovat Seinen yli näyttelyalueelle, ja vieressä kohoavat kaksi korkeaa tornia. Sisällä '
        + 'puoliympyrän muotoisessa salissa koko yleisö istuu 4 600 paikalla Cavaillé-Collin uruille, jotka '
        + 'on juuri vihitty. Vieraiden mielestä palatsi on lähinnä jännittävä. Vuonna 1935 keskisali ja '
        + 'tornit puretaan, ja jäljelle jäävät siivet uuden Chaillot\'n palatsin sisään.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1878). Faktat: en-Wikipedia '
        + '"Palais du Trocadéro", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Palais_du_Trocad%C3%A9ro',
    }),
    ihmeKohde({
      id: 'galerie-des-machines',
      nimi: 'Galerie des Machines',
      nimio: 'Konehalli',
      kysymykset: ['Kuinka suuri maailmannäyttelyn konehalli oli?', 'Miksi halli purettiin?'],
      korostukset: ['Eiffel-torni|Eiffel-torni', 'Ferdinand Dutert|Ferdinand Duterin'],
      nappi: 'Halli, johon olisi mahtunut 15 000 ratsumiestä',
      laudat: { maailmankartta: { x: 5910.0, y: 1439.8 }, europe: { x: 255.4, y: 608.8 } },
      teksti: 'Galerie des Machines oli vuoden 1889 Pariisin maailmannäyttelyn konehalli Champ-de-Marsilla, '
        + 'samalla kentällä kuin Eiffel-torni. Insinööri Victor Contaminin ja arkkitehti Ferdinand Duterin '
        + 'suunnittelema halli oli 420 metriä pitkä ja 115 metriä leveä, eikä sen sisällä ollut yhtään '
        + 'tukipilaria. Kaarten kolminivelinen rakenne oli lainattu siltasuunnittelusta. Vuoden 1889 arvion '
        + 'mukaan sinne olisi mahtunut 15 000 hevosta ja 15 000 ratsastajaa, vaikka sitä ei koskaan '
        + 'kokeiltu. Vieraita kuljettivat hallissa liikkuvat sillat. Halli purettiin 1909–1910 näkymän '
        + 'avaamiseksi Champ-de-Marsille. Isoisä ei ehtinyt nähdä sitä: halli valmistui 16 vuotta hänen '
        + 'matkansa jälkeen.',
      lahde: 'en-Wikipedia "Galerie des machines", osiot "Construction", "Usage" ja "Destruction"; '
        + 'fr-Wikipedia "Galerie des machines", osio "Historique" (tarkistettu 31.10.2026).',
      kuva: 'ihme-galerie-des-machines-loistoaika.jpg',
      lyhyt: 'Näyttelyvieras seisoo liikkuvalla sillalla koneiden yläpuolella ja katsoo, kuinka teräskaari '
        + 'nousee yli hallin; reilut kaksikymmentä vuotta myöhemmin halli puretaan.',
      selite: 'Vuonna 1889 näyttelyvieras seisoo liikkuvalla sillalla koneiden yläpuolella ja katsoo, kuinka '
        + 'teräskaari kaartuu hänen ylitseen 115 metrin leveyden yli ilman ainuttakaan sisäpilaria. Alla '
        + 'höyrykoneet ja sähkögeneraattorit hyrisevät rivi rivin perään, ja ihmiset kulkevat koneiden '
        + 'välissä hattu kädessä. Vieraalle halli on tulevaisuuden temppeli, kunnes seuraava näyttely vie '
        + 'huomion. Kaupunki päättää 1909 purkaa hallin ja avata näkymän Champ-de-Marsille; Orsayn museossa '
        + 'on siitä 1:200-pienoismalli.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1889). Faktat: en-Wikipedia '
        + '"Galerie des machines", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Galerie_des_machines',
    }),
    ihmeKohde({
      id: 'les-halles',
      nimi: 'Les Hallesin hallit',
      nimio: 'Les Halles',
      kysymykset: ['Miksi Les Halles tunnettiin nimellä Pariisin vatsa?', 'Mitä hallien tilalla on nykyään?'],
      korostukset: ['Victor Baltard|Victor Baltardin', 'Émile Zola|Émile Zolan'],
      nappi: 'Pariisin vatsa, jonka tilalle jäi kuoppa',
      laudat: { maailmankartta: { x: 5911.5, y: 1439.4 }, europe: { x: 256.2, y: 608.5 } },
      teksti: 'Les Halles oli Pariisin keskeinen ruokatori, jonka historia ulottuu 1000-luvulle; Filip II '
        + 'Augustus otti sen haltuunsa 1183 ja rakennutti kaksi hallia kankaille. Victor Baltardin '
        + 'suunnittelemat lasi- ja rautapaviljongit avattiin vaiheittain 1857–1874, joten isoisän käydessä '
        + '1873 hallit olivat lähes valmiit. Émile Zolan romaani Pariisin vatsa (1873) sijoittuu näille '
        + 'markkinoille ja antoi torille lempinimen. Tukkukauppa muutti Rungisiin 1969, ja hallit purettiin '
        + '1971–1973. Paikalle jäi niin valtava työmaa, että sitä kutsuttiin nimellä "Les Hallesin reikä". '
        + 'Yksi paviljonki pystytettiin uudelleen Nogent-sur-Marneen, ja Forum des Halles avattiin paikalle '
        + '1979.',
      lahde: 'en-Wikipedia "Les Halles", osiot "History" (The market of the Little Fields; The wholesale '
        + 'market; Major conversion); fr-Wikipedia "Halles de Paris", osio "Historique" (tarkistettu '
        + '31.10.2026).',
      kuva: 'ihme-les-halles-loistoaika.jpg',
      lyhyt: 'Aamuyöllä torimummot huutavat hintoja lasihallien katon alla vihannesvuorten keskellä; sata '
        + 'vuotta myöhemmin hallit puretaan.',
      selite: 'Vuonna 1873 aamuyöllä kärryt kolisevat täysinä kaalia, kalaa ja juustoa lasihallien väliselle '
        + 'kadulle, ja torimummot huutavat hintoja toisiaan kovempaa. Rautapilarit kantavat lasikattoa, '
        + 'jonka läpi aamuvalo hiipii hallin vihannesvuorten päälle. Ensimmäiset kaupat tehdään lyhtyjen '
        + 'valossa ennen auringonnousua. Sata vuotta myöhemmin hallit puretaan ja tilalle jää suuri kuoppa, '
        + 'josta kasvaa ostoskeskus.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1873, isoisän matkavuosi). '
        + 'Faktat: en-Wikipedia "Les Halles" ja fr-Wikipedia "Halles de Paris", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Les_Halles',
    }),kohde({
    id: 'saint-cloud', nimi: 'Saint-Cloud’n linna',
    nimio: 'Saint-Cloud',
    nappi: 'Aurinkokuninkaan veljen palatsi Pariisin länsipuolella',
    laudat: { maailmankartta: { x: 5906.2, y: 1440.4 }, europe: { x: 253.2, y: 609.2 } },
    teksti: 'Saint-Cloud’n linna kasvoi 1600-luvulla Orléansin herttuan loisteliaaksi '
      + 'residenssiksi puutarhoineen. Napoleon III käytti sitä kesäpalatsinaan, kunnes '
      + 'rakennus paloi Ranskan–Preussin sodassa 1870. Rauniot purettiin vuonna 1892.',
    lahde: 'en-Wikipedia "Château de Saint-Cloud", johdanto ja historia (tarkistettu 21.9.2026).',
    kuva: 'ihme-saint-cloud-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Ch%C3%A2teau_de_Saint-Cloud',
  })],
  DEU: [
    ihmeKohde({
      id: 'anhalter-bahnhof',
      nimi: 'Anhalter Bahnhof',
      nimio: 'Anhalterin asema',
      kysymykset: ['Kuinka tiheästi junat lähtivät Anhalterin asemalta 1930-luvulla?', 'Mikä Anhalterin asemasta on yhä jäljellä?'],
      korostukset: ['Franz Schwechten|Franz Schwechten', 'Theresienstadt|Theresienstadtiin'],
      nappi: 'Asema, jonka julkisivusta jäi vain katkelma',
      laudat: { maailmankartta: { x: 6279.4, y: 1279.6 }, europe: { x: 468.1, y: 512.8 } },
      teksti: 'Anhalter Bahnhof oli Berliinin eteläinen pääteasema. Franz Schwechten suunnitteli sen 1872 '
        + 'vuonna 1841 avatun vanhan aseman tilalle, ja uusi asema avattiin 15. kesäkuuta 1880. Julkisivu '
        + 'oli 101 metriä leveä, ja seinät muurattiin klinkkeritiilestä ja koristeltiin terrakotalla. '
        + 'Hallin teräskatto kohosi 34 metrin korkeuteen 62 metrin jännevälillä. Asemalta pääsi Leipzigiin, '
        + 'Müncheniin, Wieniin ja Roomaan, ja 1930-luvulla juna lähti kolmen–viiden minuutin välein. Yli 9 '
        + '600 berliiniläistä juutalaista karkotettiin täältä 116 junalla, enimmäkseen Theresienstadtiin. '
        + 'Ilmahyökkäys poltti hallin 3. helmikuuta 1945, liikenne loppui 1952, ja rauniot purettiin '
        + '1959–1961. Jäljelle jäi osa pääsisäänkäynnin julkisivusta.',
      lahde: 'en-Wikipedia "Anhalter Bahnhof", osiot rakennus- ja asemahistoriasta sekä purusta; de-Wikipedia '
        + '"Anhalter Bahnhof", osiot hallista, tuhosta, purusta ja liikennemääristä (tarkistettu '
        + '31.10.2026).',
      kuva: 'ihme-anhalter-bahnhof-loistoaika.jpg',
      lyhyt: 'Matkustajat täyttävät hallin laiturit, ja kaukojunat lähtevät kohti Leipzigia ja Wieniä; reilut '
        + 'viisikymmentä vuotta myöhemmin asema suljetaan.',
      selite: 'Noin vuonna 1900 Anhalterilta lähtee päivässä kymmeniä junia: 85 lähijunaa, 27 aluejunaa ja 26 '
        + 'pika- tai kaukojunaa. Etelään pääsee Leipzigiin, Dresdeniin ja Wieniin. Teräskatto kaartuu 34 '
        + 'metrin korkeuteen laitureiden yllä, ja hallin päätyseinä on muurattu klinkkeritiilestä ja '
        + 'koristeltu terrakotalla. Veturien höyry nousee kattoon, ja konduktöörin pilli vihlaisee '
        + 'laiturilla. Helmikuussa 1945 pommit polttavat hallin, 1952 liikenne loppuu ja 1959–1961 rauniot '
        + 'puretaan; vain osa pääsisäänkäynnin julkisivusta jää.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1900). Faktat: en- ja '
        + 'de-Wikipedia "Anhalter Bahnhof", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Anhalter_Bahnhof',
    }),
    ihmeKohde({
      id: 'palast-der-republik',
      nimi: 'Palast der Republik',
      kysymykset: ['Mikä talo oli yhtä aikaa parlamentti ja keilarata?', 'Miksi palatsi suljettiin syyskuussa 1990?'],
      korostukset: ['kansankamari|kansankamarin', 'asbesti|Asbestin', 'Humboldt Forum|Humboldt Forum'],
      nappi: 'Parlamentti, jossa oli keilarata',
      laudat: { maailmankartta: { x: 6280.1, y: 1279.0 }, europe: { x: 468.5, y: 512.4 } },
      teksti: 'Palast der Republik oli Itä-Berliinin Schlossplatzilla seissyt DDR:n kansankamarin ja '
        + 'kulttuuritalon yhdistelmä. Arkkitehti Heinz Graffunderin suunnittelema talo avattiin 23. '
        + 'huhtikuuta 1976, ja parlamentin lisäksi siellä oli teatteri, galleria, keilarata ja kolmetoista '
        + 'ravintolaa. Suuren salin paikkamäärä vaihteli noin tuhannesta 4 500:aan. Monien valaisimien '
        + 'takia talo sai lempinimen Erichs Lampenladen, Erichin lamppukauppa. Elokuun 22.–23. päivän yönä '
        + '1990 kansankamari äänesti täällä DDR:n liittymisestä Saksan liittotasavaltaan. Asbestin vuoksi '
        + 'palatsi suljettiin 19. syyskuuta 1990, ja se purettiin 2006–2008. Paikalla on Berliinin '
        + 'kaupunginlinnan jälleenrakennus, jossa toimii Humboldt Forum.',
      lahde: 'en-Wikipedia "Palast der Republik" ja de-Wikipedia "Palast der Republik", johdanto sekä osiot '
        + 'rakennushistoriasta, käytöstä, sulkemisesta ja purusta (tarkistettu 31.10.2026).',
      kuva: 'ihme-palast-der-republik-loistoaika.jpg',
      lyhyt: 'Perhe nousee Palast der Republikin valaistua portaikkoa ravintolaan, ja alhaalla keilarata '
        + 'jylisee; kymmenen vuotta myöhemmin asbesti sulkee talon.',
      selite: 'Noin vuonna 1980 itäberliiniläiset nousevat Palast der Republikin portaikkoa, jonka valot '
        + 'palavat päivin ja öin. Kolmessa alimmassa kerroksessa ravintolat ja baarit täyttyvät, keilarata '
        + 'jylisee ja teatterin esirippu nousee. Kävijöille talo on arkinen kohtaamispaikka eikä historiaa: '
        + 'tärkein kysymys on, mistä saa pöydän. Elokuussa 1990 kansankamari äänestää täällä liittymisestä '
        + 'Länsi-Saksaan, syyskuussa asbesti sulkee talon, ja 2006–2008 se puretaan.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1980). Faktat: en- ja '
        + 'de-Wikipedia "Palast der Republik", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Palast_der_Republik',
    }),
    kohde({
      id: 'hampurin-vanha-raatihuone', nimi: 'Hampurin vanha raatihuone',
      nimio: 'Vanha raatihuone',
      nappi: 'Renessanssiraatihuone, joka räjäytettiin suurpalon tieltä',
      laudat: { maailmankartta: { x: 6166.4, y: 1232.3 }, europe: { x: 403.1, y: 485.2 } },
      teksti: 'Hampurin Alsterin rannalla seissyt renessanssiraatihuone valmistui vuonna 1290 '
        + 'ja laajeni vuosisatojen aikana. Vuoden 1842 suurpalossa rakennus räjäytettiin '
        + 'palokujan avaamiseksi. Nykyinen raatihuone valmistui eri paikalle 1897.',
      lahde: 'de-Wikipedia "Altes Rathaus (Hamburg)" ja Great Fire of Hamburg (tarkistettu 21.9.2026).',
      kuva: 'ihme-hampurin-vanha-raatihuone-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Great_fire_of_Hamburg',
    }),
    kohde({
      id: 'pantaleonstor', nimi: 'Pantaleonstor',
      nappi: 'Kölnin keskiaikaisen muurin kaksoistorninen eteläportti',
      laudat: { maailmankartta: { x: 6064.9, y: 1349.8 }, europe: { x: 344.6, y: 554.3 } },
      teksti: 'Pantaleonstor oli yksi Kölnin suuren keskiaikaisen kaupunginmuurin porteista. '
        + 'Kaksoistorninen portti hallitsi eteläistä maantietä, kunnes kaupunki purki '
        + 'muurit ja portit 1800-luvun lopulla kasvavan liikenteen tieltä.',
      lahde: 'de-Wikipedia "Pantaleonstor" ja Kölnin kaupunginmuurien tutkimus (tarkistettu 21.9.2026).',
      kuva: 'ihme-pantaleonstor-loistoaika.jpg', url: 'https://de.wikipedia.org/wiki/Pantaleonstor',
    }),
  ],
  ITA: [
    ihmeKohde({
      id: 'san-geminiano',
      nimi: 'San Geminianon kirkko',
      nimio: 'San Geminiano',
      kysymykset: ['Miksi San Geminianon kirkko purettiin 1807?', 'Kuka suunnitteli kirkon julkisivun?'],
      korostukset: ['Jacopo Sansovino|Jacopo Sansovinon', 'Napoleon|Napoleonin'],
      nappi: 'Kirkko, jonka tilalle tuli Napoleonin siipi',
      laudat: { maailmankartta: { x: 6244.6, y: 1583.9 }, europe: { x: 448.1, y: 698.7 } },
      teksti: 'San Geminianon kirkko seisoi Pyhän Markuksen torin länsilaidalla, ja perinteen mukaan '
        + 'bysanttilainen kenraali Narses perusti sen 500-luvulla. Doge Sebastiano Zianin aikana 1100-luvun '
        + 'lopulla kirkko purettiin ja rakennettiin uudelleen toiseen paikkaan, jotta tori saatiin '
        + 'laajemmaksi. Nykyinen keskikupolinen kirkko aloitettiin 1505, ja Jacopo Sansovinon suunnittelema '
        + 'julkisivu valmistui 1557. Sansovino haudattiin kirkkoon 1570. Kun Venetsian tasavalta kaatui '
        + '1797, kirkko toimi kasarmina. Napoleonin aikana purku alkoi 19. toukokuuta 1807, ja kirkon '
        + 'tilalle rakennettiin Napoleonin siipi. Sansovinon jäännökset siirrettiin Salute-seminaariin ja '
        + 'pyhän Geminianuksen pyhäinjäännökset Nome di Gesù -kirkkoon.',
      lahde: 'en-Wikipedia ”San Geminiano, Venice” ja ”Procuratie” (tarkistettu 31.10.2026).',
      kuva: 'ihme-san-geminiano-loistoaika.jpg',
      lyhyt: 'Venetsialaiset kulkevat Sansovinon marmorijulkisivun ohi Pyhän Markuksen torin länsilaidalla; '
        + 'reilut sata vuotta myöhemmin sama kirkko puretaan Napoleonin siiven tieltä.',
      selite: 'Noin vuonna 1700 Pyhän Markuksen torin länsilaidalla seisoo keskikupolinen kirkko, jonka '
        + 'julkisivu on istrialaista marmoria ja jonka Sansovino on suunnitellut; sen sisällä lepäävät hän '
        + 'ja hänen lapsensa Fiorenza ja Francesco. Urkujen ovia koristavat Veronesen maalaukset. '
        + 'Tasavallan kaaduttua kirkko toimii kasarmina, ja toukokuussa 1807 purkutyöt alkavat Napoleonin '
        + 'siiven tieltä. Sansovinon jäännökset viedään Salute-seminaariin.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1700). Faktat: '
        + 'en-Wikipedia ”San Geminiano, Venice” ja ”Procuratie”, tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/San_Geminiano,_Venice',
    }),
    ihmeKohde({
      id: 'mercato-vecchio',
      nimi: 'Mercato Vecchio',
      nimio: 'Vanha tori',
      kysymykset: ['Mitä Firenzen vanhan torin paikalle rakennettiin?', 'Mitä uuden aukion kaareen on kirjoitettu?'],
      korostukset: ['Giorgio Vasari|Giorgio Vasarin', 'Piazza della Repubblica|Piazza della Repubblica'],
      nappi: 'Foorumi, jonka päälle rakennettiin kahvilaaukio',
      laudat: { maailmankartta: { x: 6208.5, y: 1652.1 }, europe: { x: 427.3, y: 742.4 } },
      teksti: 'Mercato Vecchio oli Firenzen vanha keskustori samalla paikalla, jossa roomalaisen Florentian '
        + 'foorumi oli ollut. Markkinat vakiintuivat vuoden 1000 jälkeen, ja 1800-luvulla aukion ympärillä '
        + 'oli kojuja, kauppoja ja teurastajien Beccheria. Siellä seisoivat myös Giorgio Vasarin '
        + 'suunnittelema kalahalli Loggia del Pesce ja Abbondanza-pylväs, ja osassa aluetta asui '
        + 'juutalaisia, jotka oli määrätty gettoon 1571. Kun Firenze oli ollut Italian pääkaupunki, '
        + 'kaupunki päätti vanhan keskustan saneerauksesta; hanke hyväksyttiin 2. huhtikuuta 1885, ja '
        + 'tieltä häädettiin 1 778 perhettä, yhteensä 5 822 ihmistä. Tilalle nousi Piazza Vittorio Emanuele '
        + 'II, nykyinen Piazza della Repubblica, jonka kaareen kirjoitettiin: ”L’antico centro della '
        + 'città”.',
      lahde: 'en-Wikipedia ”Piazza della Repubblica, Florence”, osiot ”Origins”, ”Ghetto” ja ”Risanamento”; '
        + 'it-Wikipedia ”Mercato Vecchio (Firenze)”, osiot ”Ghetto” ja ”Demolizione” (tarkistettu '
        + '31.10.2026).',
      kuva: 'ihme-mercato-vecchio-loistoaika.jpg',
      lyhyt: 'Teurastajat ja kalakauppiaat huutavat hintoja Vasarin kalahallin ja vanhan pylvään välissä, ja '
        + 'torin ympärillä kohoavat keskiaikaiset tornit; alle kahdenkymmenen vuoden kuluttua koko kortteli '
        + 'puretaan.',
      selite: 'Vuonna 1873 aamutori kuuluu jo kadulle asti: teurastajat, kalakauppiaat ja kojumyyjät huutavat '
        + 'toistensa yli Beccherian ja Vasarin kalahallin välissä, ja keskellä aukiota seisoo '
        + 'Abbondanza-pylväs. Kivetyksellä kolisevat kärryt, ja kapeilta kaduilta nousee kalan ja lihan '
        + 'haju keskiaikaisten tornien varjoon, geton taloihin asti. Kun saneeraus alkaa, kalahalli '
        + 'puretaan ja pystytetään uudelleen toiseen paikkaan, ja 1890-luvun puoliväliin mennessä tori ja '
        + 'sen ympäristö ovat poissa.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1873, isoisän matkavuosi). '
        + 'Faktat: en-Wikipedia ”Piazza della Repubblica, Florence” ja it-Wikipedia ”Mercato Vecchio '
        + '(Firenze)”, tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Piazza_della_Repubblica,_Florence',
    }),
    ihmeKohde({
      id: 'septizodium',
      nimi: 'Septizodium',
      kysymykset: ['Mitä Septizodiumissa tapahtui elokuussa 1241?', 'Mihin paavi Sixtus V käytti Septizodiumin kivet?'],
      korostukset: ['Septimius Severus|Septimius Severus', 'kardinaali|kardinaalia'],
      nappi: 'Julkisivu, josta tuli obeliskin jalusta',
      laudat: { maailmankartta: { x: 6249.6, y: 1728.1 }, europe: { x: 451.0, y: 792.0 } },
      teksti: 'Septizodium oli Rooman Palatinus-kukkulan juurella, Via Appian varrella seissyt monumentaalinen '
        + 'julkisivu, jonka keisari Septimius Severus rakennutti vuonna 203. Se oli noin 90 metriä pitkä ja '
        + 'kohosi kolmena pylväskerroksena, ja kolmeen puoliympyräsyvennykseen kuhunkin kuului pyöreä '
        + 'suihkulähde. Jo 700-luvulle mennessä se oli rapistunut, ja siitä tehtiin paronien linnake. '
        + 'Elokuussa 1241 yksitoista kardinaalia kokoontui Septizodiumiin valitsemaan paavia; vaali oli '
        + 'niin ankara, että yksi heistä kuoli, ja valittu Selestinus IV kuoli 16 päivää valintansa '
        + 'jälkeen. Paavi Sixtus V käski Domenico Fontanan purkaa julkisivun 1588–1589, ja kivistä '
        + 'rakennettiin muun muassa obeliskin jalusta ja Marcus Aureliuksen pylvään korjaus.',
      lahde: 'en-Wikipedia "Septizodium", johdanto ja osiot "History" sekä "Demolition"; it-Wikipedia '
        + '"Settizonio", osiot "Descrizione" ja "Storia" (tarkistettu 31.10.2026).',
      kuva: 'ihme-septizodium-loistoaika.jpg',
      lyhyt: 'Roomaan saapuva kulkija pysähtyy Palatinuksen juurella katsomaan kolmikerroksista '
        + 'pylväsjulkisivua, josta vesi valuu suihkulähteisiin; lähes 1 400 vuotta myöhemmin paavi käskee '
        + 'purkaa sen.',
      selite: 'Noin vuonna 210 kulkija pysähtyy Palatinuksen juurella ja katsoo ylös kolmikerroksiseen '
        + 'pylväsjulkisivuun, josta vesi virtaa pyöreisiin suihkulähteisiin. Julkisivu kuuluu keisarin '
        + 'Domus Severiana -palatsialueelle, ja se on rakennettu näytettäväksi eikä asuttavaksi. '
        + 'Aamuaurinko osuu pylväskerroksiin, ja varjot piirtävät julkisivuun vaakaraitoja. Keskiajalla '
        + 'julkisivu muuttuu linnakkeeksi ja 1241 paavinvaalin paikaksi, ja vuonna 1588 paavi Sixtus V '
        + 'käskee purkaa sen.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 210). Faktat: '
        + 'en-Wikipedia "Septizodium" ja it-Wikipedia "Settizonio", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Septizodium',
    }),
    ihmeKohde({
      id: 'capitolium',
      nimi: 'Jupiterin temppeli',
      nimio: 'Capitolium',
      kysymykset: ['Minne Rooman voitonkulkueet päättyivät?', 'Mitä temppelistä on jäljellä?'],
      korostukset: ['Jupiter Optimus Maximus|Jupiter Optimus Maximuksen', 'Domitianus|Domitianuksen'],
      nappi: 'Temppeli, johon Rooman kenraalit nousivat voitonkulkueessa',
      laudat: { maailmankartta: { x: 6249.4, y: 1727.9 }, europe: { x: 450.8, y: 791.8 } },
      teksti: 'Jupiter Optimus Maximuksen temppeli kohosi Capitolium-kukkulalla, ja perinteen mukaan konsuli '
        + 'Marcus Horatius Pulvillus vihki sen 13. syyskuuta 509 eaa. Sen kolmessa pyhäkkösalissa olivat '
        + 'Jupiter keskellä, Juno vasemmalla ja Minerva oikealla. Voittokulkueet päättyivät tänne: '
        + 'voittoisa kenraali nousi kukkulalle ja uhrasi kaksi valkoista härkää. Temppeli paloi kolme '
        + 'kertaa, 83 eaa. sekä vuosina 69 ja 80, ja se rakennettiin joka kerta uudelleen, viimeksi '
        + 'Domitianuksen aikana 82. Pakanalliset temppelit suljettiin 392, ja vandaalit veivät sen kullatut '
        + 'tiilet 455. Poggio Bracciolini näki hyvin säilyneitä raunioita vielä 1447, mutta 1500-luvulla '
        + 'paikalle rakennettiin Palazzo Caffarelli. Temppelin perustuksia näkyy nykyään Capitolinen '
        + 'museoissa.',
      lahde: 'en-Wikipedia "Temple of Jupiter Optimus Maximus", osiot "History", "Remains" ja "Area '
        + 'Capitolina"; voitonkulkueen päätepiste: en-Wikipedia "Roman triumph", johdanto ja osio "Vir '
        + 'triumphalis" (tarkistettu 31.10.2026).',
      kuva: 'ihme-capitolium-loistoaika.jpg',
      lyhyt: 'Purppuratooga päällään voittoisa kenraali nousee temppelin portaita kahden valkoisen härän '
        + 'perässä ja kansa täyttää kukkulan; lähes kolme vuosisataa myöhemmin pakanalliset temppelit '
        + 'suljetaan.',
      selite: 'Noin vuonna 100 voittoisa kenraali nousee Capitoliumin portaita purppuranpunaisessa, kullalla '
        + 'kirjaillussa togassaan kaksi valkoista härkää edellään, ja kulkueen perässä marssivat sotilaat '
        + 'ja vangit. Kukkulan rinteet ovat täynnä katsojia, ja temppelin kullatut tiilet kimaltavat '
        + 'Domitianuksen rakennuttamassa julkisivussa. Vuonna 392 pakanalliset temppelit suljetaan, 455 '
        + 'vandaalit riisuvat kullatut tiilet, ja lopulta kukkulalle jää perustukset, joiden päälle '
        + 'rakennetaan palatsi.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 100). Faktat: '
        + 'en-Wikipedia "Temple of Jupiter Optimus Maximus" ja "Roman triumph", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Temple_of_Jupiter_Optimus_Maximus',
    }),
    kohde({
      id: 'circus-maximus', nimi: 'Circus Maximus',
      nappi: 'Rooman valtava vaunukilparata täyden katsomon aikana',
      laudat: { maailmankartta: { x: 6249.5, y: 1728.1 }, europe: { x: 450.9, y: 792.0 } },
      teksti: 'Circus Maximus oli Rooman ensimmäinen ja suurin vaunukilparata, jonka '
        + 'katsomoihin mahtui yli 150 000 ihmistä. Kilpailuja järjestettiin lähes tuhannen '
        + 'vuoden ajan. Viimeisten kisojen jälkeen vuonna 549 rakenteet muuttuivat kivilouhokseksi.',
      lahde: 'en-Wikipedia "Circus Maximus", johdanto ja historia (tarkistettu 21.9.2026).',
      kuva: 'ihme-circus-maximus-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Circus_Maximus',
    }),
    kohde({
      id: 'vanha-pietarinkirkko', nimi: 'Vanha Pietarinkirkko',
      nimio: 'Pietarinkirkko',
      nappi: 'Konstantinuksen basilika ennen uuden kirkon rakennustöitä',
      laudat: { maailmankartta: { x: 6248.5, y: 1727.5 }, europe: { x: 450.3, y: 791.6 } },
      teksti: 'Konstantinus I rakennutti vanhan Pietarinkirkon 300-luvulla apostoli Pietarin '
        + 'haudan päälle. Basilika seisoi yli tuhat vuotta ja siellä kruunattiin Kaarle Suuri '
        + 'vuonna 800. Se purettiin vaiheittain uuden Pietarinkirkon tieltä vuoteen 1605 mennessä.',
      lahde: 'en-Wikipedia "Old St. Peter’s Basilica", johdanto ja historia (tarkistettu 21.9.2026).',
      kuva: 'ihme-vanha-pietarinkirkko-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Old_St._Peter%27s_Basilica',
    }),
    kohde({
      id: 'domus-aurea', nimi: 'Domus Aurea',
      nappi: 'Neron kultainen palatsialue järvineen ja puutarhoineen',
      laudat: { maailmankartta: { x: 6249.9, y: 1727.9 }, europe: { x: 451.1, y: 791.9 } },
      teksti: 'Nero rakennutti Domus Aurean Rooman suurpalon jälkeen vuosina 64–68. '
        + 'Palatsialueeseen kuului satoja huoneita, puutarhoja, järvi ja valtava pronssipatsas. '
        + 'Neron kuoleman jälkeen rakennukset riisuttiin ja peitettiin uusien rakennusten alle.',
      lahde: 'en-Wikipedia "Domus Aurea", johdanto ja historia (tarkistettu 21.9.2026).',
      kuva: 'ihme-domus-aurea-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Domus_Aurea',
    }),
  ],
  ESP: [
    ihmeKohde({
      id: 'ciutadella',
      nimi: 'Barcelonan Ciutadellan linnake',
      nimio: 'Ciutadella',
      kysymykset: ['Miksi Filip V rakennutti linnakkeen Barcelonaan?', 'Mitä linnakkeen paikalla on nykyään?'],
      korostukset: ['Filip V|Filip V', 'La Ribera|La Riberan', 'Prim|Prim'],
      nappi: 'Linnake, joka rakennettiin kaupunkia vastaan',
      laudat: { maailmankartta: { x: 5906.2, y: 1748.0 }, europe: { x: 253.2, y: 805.1 } },
      teksti: 'Ciutadella oli Barcelonan linnake, jonka Espanjan kuningas Filip V rakennutti 1713–1714 käydyn '
        + 'piirityksen jälkeen pitämään kaupunki ja Katalonia kurissa. Markiisi Verboomin suunnittelema '
        + 'viisikulmainen linnake valmistui 1725. Sen alta purettiin 1 016 taloa La Riberan kaupunginosan '
        + '38 kadulta, ja noin 4 500 ihmistä jäi ilman kotia ja ilman korvausta. Rakennusaikanaan se oli '
        + 'Euroopan suurin linnake, ja siihen mahtui 8 000 sotilasta. Barcelonalaiset vihasivat sitä, ja '
        + 'kenraali Prim luovutti sen jäljellä olevan alueen kaupungille 1869. Linnake purettiin, ja '
        + 'alueelle perustettiin puisto. Arsenaali, kuvernöörin palatsi ja kappeli jäivät pystyyn; '
        + 'arsenaali on nykyään Katalonian parlamentin talo.',
      lahde: 'en-Wikipedia "Citadel of Barcelona", johdanto ja osiot "Barceloneta", "Demolition"; ca-Wikipedia '
        + '"Ciutadella de Barcelona" ja es-Wikipedia "Ciudadela de Barcelona" (mitat, talojen ja kadujen '
        + 'määrä, rakennusvuodet; tarkistettu 31.10.2026).',
      kuva: 'ihme-ciutadella-loistoaika.jpg',
      lyhyt: 'Sotilaat vaihtavat vartiota viisikulmaisen linnakkeen bastionilla, ja kaupunki jää heidän '
        + 'tykkiensä ulottuville; reilut kuusikymmentä vuotta myöhemmin linnake luovutetaan kaupungille.',
      selite: 'Noin vuonna 1800 vartiosotilaat kävelevät linnakkeen muureilla, joiden kaupunkiin päin olevat '
        + 'kaksi bastionia kohoavat yli 16 metrin korkeuteen. Viisikulmainen linnake täyttää 28,6 '
        + 'hehtaaria, ja sisällä on kasarmeja, joihin mahtuu tuhansia sotilaita. Rummut kuuluvat muureilta '
        + 'kaupunkiin asti, kun vartio vaihtuu. Joulukuussa 1869 linnake luovutetaan kaupungille ja '
        + 'puretaan, ja jäljelle jäävät arsenaali, kappeli ja kuvernöörin palatsi.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1800). Faktat: en-, ca- '
        + 'ja es-Wikipedia "Citadel of Barcelona" / "Ciutadella de Barcelona", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Citadel_of_Barcelona',
    }),
    kohde({
      id: 'real-alcazar-madrid', nimi: 'Madridin Real Alcázar',
      nimio: 'Real Alcázar',
      nappi: 'Habsburgien kuninkaanlinna ennen jouluyön tulipaloa',
      laudat: { maailmankartta: { x: 5709.5, y: 1786.4 }, europe: { x: 139.9, y: 830.6 } },
      teksti: 'Madridin maurilainen linnoitus kasvoi Habsburgien kuninkaanlinnaksi, jossa '
        + 'säilytettiin noin kahta tuhatta maalausta. Jouluaattona 1734 syttynyt tulipalo '
        + 'raivosi neljä päivää. Nykyinen Palacio Real rakennettiin sen paikalle.',
      lahde: 'en-Wikipedia "Royal Alcázar of Madrid", johdanto ja vuoden 1734 palo (tarkistettu 21.9.2026).',
      kuva: 'ihme-real-alcazar-madrid-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Royal_Alc%C3%A1zar_of_Madrid',
    }),
    kohde({
      id: 'buen-retiro', nimi: 'Palacio del Buen Retiro',
      nimio: 'Buen Retiro',
      nappi: 'Filip IV:n laaja huvilinna puutarhoineen',
      laudat: { maailmankartta: { x: 5710.4, y: 1786.6 }, europe: { x: 140.4, y: 830.7 } },
      teksti: 'Buen Retiro oli Filip IV:lle 1630-luvulla rakennettu yli kahdenkymmenen '
        + 'rakennuksen palatsikokonaisuus. Napoleonin joukot vaurioittivat sitä vuonna 1808, '
        + 'minkä jälkeen suurin osa purettiin. Vain kaksi sivurakennusta säilyi.',
      lahde: 'en-Wikipedia "Buen Retiro Palace", johdanto ja tuho (tarkistettu 21.9.2026).',
      kuva: 'ihme-buen-retiro-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Buen_Retiro_Palace',
    }),
  ],
  PRT: [
    ihmeKohde({
      id: 'tejo-ooppera',
      nimi: 'Tejon kuninkaallinen ooppera',
      nimio: 'Ópera do Tejo',
      kysymykset: ['Kuinka kauan Tejon ooppera ehti toimia?', 'Mikä tuhosi oopperatalon marraskuussa 1755?'],
      korostukset: ['Giovanni Carlo Galli Bibiena|Giovanni Carlo Galli Bibienalta', 'Ribeiran palatsi|Ribeiran palatsin'],
      nappi: 'Ooppera, joka ehti toimia seitsemän kuukautta',
      laudat: { maailmankartta: { x: 5528.8, y: 1853.4 }, europe: { x: 35.8, y: 875.6 } },
      teksti: 'Tejon kuninkaallisen oopperan vihkiäisiä vietettiin 31. maaliskuuta 1755 kuningatar Mariana '
        + 'Vitórian syntymäpäivänä. Kuningas José I tilasi talon arkkitehti Giovanni Carlo Galli '
        + 'Bibienalta, ja se rakennettiin Tejo-joen rannalle vanhan Ribeiran palatsin kylkeen. Salissa oli '
        + 'noin 600 henkeä parterressa ja 38 aitiota sekä kuninkaallinen aitio. Ensi-illassa esitettiin '
        + 'David Perezin ooppera Alessandro nell’Indie, ja siinä lauloivat tenori Anton Raaff ja kastraatti '
        + 'Caffarelli. Lokakuussa 1755 ohjelmassa oli Antonio Mazzonin Antigono. Marraskuun alkuun oli '
        + 'suunniteltu Artaserse, mutta Lissabonin maanjäristys 1. marraskuuta 1755 tuhosi talon, joka oli '
        + 'ehtinyt toimia noin seitsemän kuukautta.',
      lahde: 'pt-Wikipedia ”Ópera do Tejo”; en-Wikipedia ”Ópera do Tejo” (tarkistettu 31.10.2026).',
      kuva: 'ihme-tejo-ooppera-loistoaika.jpg',
      lyhyt: 'Yleisö täyttää uuden oopperatalon Tejon rannalla, ja lavalla Caffarelli laulaa Poron osaa; '
        + 'seitsemän kuukautta myöhemmin maanjäristys tuhoaa talon.',
      selite: 'Maaliskuun lopussa 1755 katsojat täyttävät uuden oopperatalon parterren ja 38 aitiota Tejon '
        + 'rannalla, vanhan Ribeiran palatsin kyljessä. Lavalla tenori Anton Raaff ja kastraatti Caffarelli '
        + 'laulavat Alessandro nell’Indie -oopperan roolit, ja Petronio Mazzoni vastaa lavakoneiston '
        + 'tehosteista. Esityksiä on maanantaisin ja torstaisin, ja lokakuussa ohjelmassa on vielä Mazzonin '
        + 'Antigono. Lissabonin maanjäristys 1. marraskuuta 1755 tuhoaa talon, ennen kuin suunniteltu '
        + 'Artaserse ehtii ensi-iltaan.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1755). Faktat: pt- ja '
        + 'en-Wikipedia ”Ópera do Tejo”, tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/%C3%93pera_do_Tejo',
    }),
    kohde({
      id: 'paco-da-ribeira', nimi: 'Paço da Ribeira',
      nappi: 'Portugalin kuninkaanlinna Tejo-joen rannalla',
      laudat: { maailmankartta: { x: 5528.8, y: 1853.4 }, europe: { x: 35.8, y: 875.6 } },
      teksti: 'Manuel I:n vuonna 1502 valmistunut Paço da Ribeira oli Portugalin '
        + 'kuninkaiden päähallintokeskus. Lissabonin maanjäristys, hyökyaalto ja tulipalo '
        + 'tuhosivat palatsin 1. marraskuuta 1755. Paikalla on nykyinen Praça do Comércio.',
      lahde: 'en-Wikipedia "Ribeira Palace", johdanto ja vuoden 1755 tuho (tarkistettu 21.9.2026).',
      kuva: 'ihme-paco-da-ribeira-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Ribeira_Palace',
    }),
    kohde({
      id: 'hospital-real-todos-os-santos', nimi: 'Hospital Real de Todos-os-Santos',
      nimio: 'Todos-os-Santos',
      nappi: 'Manuel I:n suuri sairaala Rossion laidalla',
      laudat: { maailmankartta: { x: 5528.7, y: 1853.2 }, europe: { x: 35.7, y: 875.4 } },
      teksti: 'Kaikkien pyhien kuninkaallinen sairaala rakennettiin Lissaboniin vuosina '
        + '1492–1504 ja oli aikansa Euroopan suurimpia. Vuoden 1755 maanjäristys ja sitä '
        + 'seurannut tulipalo tuhosivat rakennuksen, jota ei enää rakennettu uudelleen.',
      lahde: 'en-Wikipedia "Hospital Real de Todos-os-Santos" (tarkistettu 21.9.2026).',
      kuva: 'ihme-hospital-real-todos-os-santos-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Hospital_Real_de_Todos-os-Santos',
    }),
  ],
  NLD: [
    kohde({
      id: 'amsterdamin-vanha-raatihuone', nimi: 'Amsterdamin vanha raatihuone',
      nimio: 'Vanha raatihuone',
      nappi: 'Damin goottilainen raatihuone ennen vuoden 1652 paloa',
      laudat: { maailmankartta: { x: 5996.4, y: 1285.4 }, europe: { x: 305.1, y: 516.2 } },
      teksti: 'Amsterdamin keskiaikainen raatihuone seisoi Damin torilla 1400-luvulta lähtien. '
        + 'Tulipalo tuhosi sen 7. heinäkuuta 1652. Uusi raatihuone, nykyinen kuninkaanlinna, '
        + 'valmistui viereen vuonna 1665.',
      lahde: 'Rijksmuseum ja nl-Wikipedia "Oude Stadhuis van Amsterdam" (tarkistettu 21.9.2026).',
      kuva: 'ihme-amsterdamin-vanha-raatihuone-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Royal_Palace_of_Amsterdam',
    }),
    kohde({
      id: 'utrechtin-domkirkon-keskilaiva', nimi: 'Utrechtin Domkirkon keskilaiva',
      nimio: 'Utrecht',
      nappi: 'Katedraalin keskilaiva ennen vuoden 1674 myrskyä',
      laudat: { maailmankartta: { x: 6004.1, y: 1298.0 }, europe: { x: 309.5, y: 523.6 } },
      teksti: 'Utrechtin Domkirkon keskilaiva jäi vuosisadoiksi keskeneräiseksi rahapulan '
        + 'vuoksi. Hirmumyrsky romahdutti sen 1. elokuuta 1674. Kuori ja torni jäivät '
        + 'erilleen, ja niiden välinen alue on nykyinen Domplein.',
      lahde: 'en-Wikipedia "St. Martin’s Cathedral, Utrecht", vuoden 1674 myrsky (tarkistettu 21.9.2026).',
      kuva: 'ihme-utrechtin-domkirkon-keskilaiva-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/St._Martin%27s_Cathedral,_Utrecht',
    }),
    kohde({
      id: 'paleis-voor-volksvlijt', nimi: 'Paleis voor Volksvlijt',
      nimio: 'Volksvlijt',
      nappi: 'Amsterdamin lasi-rautapalatsi ennen vuoden 1929 tulipaloa',
      laudat: { maailmankartta: { x: 5996.5, y: 1286.2 }, europe: { x: 305.2, y: 516.6 } },
      teksti: 'Lääkäri Samuel Sarphatin Vereeniging voor Volksvlijt -yhdistys rakennutti '
        + 'Lontoon Crystal Palacen innoittaman lasi-rautapalatsin Frederiksplein-torille; '
        + 'se valmistui 1864 näyttely- ja konserttihalliksi. Tulipalo tuhosi rakennuksen '
        + 'yöllä 17.–18.4.1929, ja säilyneet tiiliholvikäytävätkin purettiin myöhemmin.',
      lahde: 'en-Wikipedia "Paleis voor Volksvlijt", historia ja vuoden 1929 palo (tarkistettu 28.9.2026).',
      kuva: 'ihme-paleis-voor-volksvlijt-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Paleis_voor_Volksvlijt',
    }),
  ],
  AUT: [
    ihmeKohde({
      id: 'ringtheater',
      nimi: 'Ringtheater',
      kysymykset: ['Mikä rakennus nousi Ringtheaterin paikalle palon jälkeen?', 'Mitä Wienissä muutettiin palon jälkeen?'],
      korostukset: ['Sühnhaus|Sühnhaus', 'Franz Joseph|Franz Josephin'],
      nappi: 'Teatteri, jonka palo muutti Wienin turvallisuussäännöt',
      laudat: { maailmankartta: { x: 6378.7, y: 1467.1 }, europe: { x: 525.4, y: 625.6 } },
      teksti: 'Ringtheater oli wieniläinen teatteri, joka avattiin 17. tammikuuta 1874 Rossinin Sevillan '
        + 'parturilla. Arkkitehti Emil von Förster suunnitteli talon noin 1 700 katsojalle, ja pienen '
        + 'tontin vuoksi se rakennettiin korkeaksi. Valaistus toimi kaasulla. Joulukuun 8. päivänä 1881 '
        + 'tulipalo syttyi lavan puolella juuri ennen Offenbachin Hoffmannin tarinoiden esitystä ja levisi '
        + 'nopeasti katsomoon. Palossa kuoli yli 380 ihmistä. Seuraavana vuonna Wienissä säädettiin uusi '
        + 'teatterilaki, palokunta järjestettiin uudelleen ja perustettiin Wienin vapaaehtoinen '
        + 'pelastusseura. Paikalle rakennettiin Sühnhaus, jonka keisari Franz Josephin yksityisvarat '
        + 'kustansivat ja jonka vuokratulot menivät hyväntekeväisyyteen.',
      lahde: 'en-Wikipedia ”Ringtheater”; de-Wikipedia ”Ringtheater” (tarkistettu 31.10.2026).',
      kuva: 'ihme-ringtheater-loistoaika.jpg',
      lyhyt: 'Yleisö täyttää uuden teatterin tammikuussa 1874, ja talo on mitoitettu 1 700 katsojalle; '
        + 'seitsemän vuotta myöhemmin tulipalo tuhoaa sen.',
      selite: 'Tammikuussa 1874 katsojat saapuvat uuteen teatteriin, joka on mitoitettu 1 700 hengelle ja '
        + 'rakennettu pienelle tontille korkeaksi. Vuodesta 1878 ohjelmassa on puhenäytelmiä, saksalaista '
        + 'ja italialaista oopperaa sekä varietee-esityksiä. Joulukuussa 1881 tulipalo syttyy lavan '
        + 'puolella ennen iltaesitystä ja tuhoaa talon, ja onnettomuus uudistaa Wienin '
        + 'teatteriturvallisuuden. Jäljelle jäänyt kuori puretaan joulukuussa 1882, ja paikalle nousee '
        + 'Sühnhaus, sovituksen talo.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1874–1881). Faktat: en- ja '
        + 'de-Wikipedia ”Ringtheater”, tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Ringtheater',
    }),
    ihmeKohde({
      id: 'karntnertor',
      nimi: 'Kärntnertor-teatteri',
      nimio: 'Kärntnertor',
      kysymykset: ['Minkä sinfonian kantaesitys oli Kärntnertor-teatterissa 1824?', 'Mikä hotelli seisoo teatterin paikalla?'],
      korostukset: ['Ludwig van Beethoven|Ludwig van Beethovenin', 'Fidelio|Fidelion'],
      nappi: 'Teatteri, jossa Beethovenin yhdeksäs kuultiin ensi kerran',
      laudat: { maailmankartta: { x: 6379.0, y: 1467.6 }, europe: { x: 525.5, y: 625.9 } },
      teksti: 'Kärntnertor-teatteri oli Wienin hovin teatteri, jonka Antonio Beduzzi suunnitteli ja joka '
        + 'avattiin 30. marraskuuta 1709. Tulipalo tuhosi sen 1761, ja Nikolaus Pacassi rakensi sen '
        + 'uudelleen 1763. Talossa kuultiin Ludwig van Beethovenin Fidelion lopullinen versio 23. '
        + 'toukokuuta 1814 ja Chopinin Wienin-debyytti 1829. Huipentuma oli 7. toukokuuta 1824: Beethovenin '
        + 'yhdeksännen sinfonian kantaesitys, jossa soitti lähes kaksi kertaa tavallista suurempi '
        + 'orkesteri. Viimeinen ooppera, Rossinin Wilhelm Tell, esitettiin 17. huhtikuuta 1870, ja uusi '
        + 'hovioopperatalo oli avattu jo 1869. Kärntnertor purettiin, ja tilalle rakennettiin asuintalo, '
        + 'josta tuli Hotel Sacher. Isoisän matkavuonna 1873 teatteria ei enää ollut.',
      lahde: 'en-Wikipedia ”Theater am Kärntnertor”; de-Wikipedia ”Theater am Kärntnertor”; en-Wikipedia '
        + '”Symphony No. 9 (Beethoven)”, osio ”Premiere” (tarkistettu 31.10.2026).',
      kuva: 'ihme-karntnertor-loistoaika.jpg',
      lyhyt: 'Toukokuun 7. päivänä 1824 kuuroutunut säveltäjä antaa tahdit lavan vieressä istuen, ja '
        + 'loppusuosion aikana laulaja kääntää hänet yleisöön päin; vajaat viisikymmentä vuotta myöhemmin '
        + 'teatteri puretaan.',
      selite: 'Toukokuun 7. päivänä 1824 teatteri on täynnä yleisöä, ja lavalla soittaa lähes kaksi kertaa '
        + 'tavallista suurempi orkesteri. Samassa salissa on kuultu Mozartin pianokonserttoa nro 25 ja '
        + 'Beethovenin Fideliota. Lähes kuuro Beethoven istuu lavan vieressä ja antaa tahdit, vaikka ei '
        + 'kuule soittoa. Kun sinfonia päättyy, alttolaulaja Caroline Unger kääntää hänet kasvot yleisöön '
        + 'päin, jotta hän näkisi liinat, hatut ja nostetut kädet. Huhtikuussa 1870 teatterin viimeinen '
        + 'ooppera on soitettu, ja talo puretaan.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1824). Faktat: en- ja '
        + 'de-Wikipedia ”Theater am Kärntnertor” sekä en-Wikipedia ”Symphony No. 9 (Beethoven)”, '
        + 'tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Theater_am_K%C3%A4rntnertor',
    }),
    kohde({
      id: 'vanha-burgtheater', nimi: 'Wienin vanha Burgtheater',
      nimio: 'Burgtheater',
      nappi: 'Keisarillinen hoviteatteri Michaelerplatzilla',
      laudat: { maailmankartta: { x: 6378.9, y: 1467.4 }, europe: { x: 525.4, y: 625.7 } },
      teksti: 'Wienin keisarillinen hoviteatteri avattiin vuonna 1741. Siellä kantaesitettiin '
        + 'muun muassa Mozartin Figaron häät vuonna 1786. Kun uusi Burgtheater avattiin '
        + 'Ringstraßella 1888, vanha rakennus purettiin Hofburgin laajennuksen tieltä.',
      lahde: 'en-Wikipedia "Burgtheater", vanhan teatterin historia (tarkistettu 21.9.2026).',
      kuva: 'ihme-vanha-burgtheater-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Burgtheater',
    }),
    kohde({
      id: 'karntnertor-bastioni', nimi: 'Kärntnertor-bastioni',
      nimio: 'Kärntnertor',
      nappi: 'Wienin renessanssimuuri juuri ennen Ringstraßea',
      laudat: { maailmankartta: { x: 6379.0, y: 1467.6 }, europe: { x: 525.5, y: 625.9 } },
      teksti: 'Wieniä ympäröivät 1500-luvulta renessanssiajan bastionimuurit. Keisari '
        + 'Frans Joosef määräsi muurit purettaviksi vuonna 1857. Kärntnertor ja sen '
        + 'bastioni katosivat, ja vapautuneelle alueelle rakennettiin Ringstraße.',
      lahde: 'de-Wikipedia "Wiener Stadtmauern" ja Kärntnertor (tarkistettu 21.9.2026).',
      kuva: 'ihme-karntnertor-bastioni-loistoaika.jpg', url: 'https://de.wikipedia.org/wiki/Wiener_Stadtmauern',
    }),
    kohde({
      id: 'wienin-rotunde', nimi: 'Wienin maailmannäyttelyn Rotunde',
      nimio: 'Rotunde',
      nappi: 'Maailman suurin kupolirakennus 1873 maailmannäyttelyssä',
      laudat: { maailmankartta: { x: 6380.1, y: 1467.0 }, europe: { x: 526.1, y: 625.5 } },
      teksti: 'Praterin puistoon rakennettu Rotunde oli 1873 maailmannäyttelyn keskuspaviljonki '
        + 'ja valmistuessaan maailman suurin kupolirakennus, 108 metriä halkaisijaltaan. '
        + 'Näyttely avattiin 1.5.1873, samana keväänä kun isoisä aloitti oman Eurooppansa '
        + 'kiertueen. Rakennus paloi täysin selittämättömässä tulipalossa 17.9.1937.',
      lahde: 'en-Wikipedia "Rotunde" ja "1873 Vienna World’s Fair" (tarkistettu 28.9.2026).',
      kuva: 'ihme-wienin-rotunde-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Rotunde',
    }),
  ],
  CHE: [
    kohde({
      id: 'christoffelturm', nimi: 'Bernin Christoffelturm',
      nimio: 'Christoffelturm',
      nappi: 'Pyhän Kristoforoksen vartioima keskiaikainen kaupunginportti',
      laudat: { maailmankartta: { x: 6081.3, y: 1520.7 }, europe: { x: 354.0, y: 658.9 } },
      teksti: 'Christoffelturm rakennettiin vuosina 1344–1346 Bernin kolmannen '
        + 'kaupunginmuurin portiksi. Kaupunginvaltuusto päätti vain neljän äänen erolla '
        + 'purkaa tornin rautatieaseman tieltä. Purku alkoi vuonna 1865.',
      lahde: 'de-Wikipedia "Christoffelturm" ja Bernin kaupunginarkisto (tarkistettu 21.9.2026).',
      kuva: 'ihme-christoffelturm-loistoaika.jpg', url: 'https://de.wikipedia.org/wiki/Christoffelturm',
    }),
    kohde({
      id: 'porte-neuve', nimi: 'Geneven Porte Neuve',
      nimio: 'Porte Neuve',
      nappi: 'Geneven läntinen pääportti ennen linnoitusten purkua',
      laudat: { maailmankartta: { x: 6038.1, y: 1552.0 }, europe: { x: 329.1, y: 678.5 } },
      teksti: 'Porte Neuve rakennettiin 1740-luvulla Geneven läntiseksi pääportiksi. '
        + 'Kaupungin linnoitusvyöhyke purettiin 1850-luvulla laajenemisen tieltä, ja portti '
        + 'purettiin vuonna 1853. Sen paikalla on nykyinen Place Neuve.',
      lahde: 'fr-Wikipedia "Place Neuve" ja Geneven linnoitushistoria (tarkistettu 21.9.2026).',
      kuva: 'ihme-porte-neuve-loistoaika.jpg', url: 'https://fr.wikipedia.org/wiki/Place_Neuve_(Gen%C3%A8ve)',
    }),
    kohde({
      id: 'grand-hotel-schreiber-rigi-kulm', nimi: 'Rigi Kulmin Grand Hotel Schreiber',
      nimio: 'Rigi Kulm',
      nappi: 'Alppien suurhotelli Euroopan ensimmäisen vuoristoradan päätepisteessä',
      laudat: { maailmankartta: { x: 6116.3, y: 1516.2 }, europe: { x: 374.2, y: 656.1 } },
      teksti: 'Arkkitehti Horace Édouard Davinet suunnitteli Rigi Kulmin huipulle komean '
        + 'suurhotellin, joka avattiin 1875 Euroopan ensimmäisen vuoristorautatien '
        + '(Vitznau–Rigi, päätepiste valmistui 1873) päätepisteeseen. Hotellista tuli '
        + '1800-luvun lopun yläluokan suosima auringonnousukohde, kunnes se purettiin '
        + 'kokonaan ja korvattiin vaatimattomammalla hospiisityylisellä rakennuksella.',
      lahde: 'en-Wikipedia "Rigi Kulm Hotel" ja "Vitznau-Rigi railway line" (tarkistettu 28.9.2026).',
      kuva: 'ihme-grand-hotel-schreiber-rigi-kulm-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Rigi_Kulm_Hotel',
    }),
  ],
  CZE: [
    ihmeKohde({
      id: 'praha-raatihuone',
      nimi: 'Prahan vanhan raatihuoneen itäsiipi',
      nimio: 'Raatihuoneen itäsiipi',
      kysymykset: ['Mikä tuhosi raatihuoneen itäsiiven toukokuussa 1945?', 'Miksi siipeä ei rakennettu uudelleen?'],
      korostukset: ['Prahan kansannousu|Prahan kansannousun', 'astronominen kello|astronomista kelloa'],
      nappi: 'Siipi, jonka paikka jäi tyhjäksi',
      laudat: { maailmankartta: { x: 6314.0, y: 1386.4 }, europe: { x: 488.1, y: 576.3 } },
      teksti: 'Prahan Vanhankaupungin raatihuoneen itäsiipi rakennettiin uusgoottilaiseksi vuosina 1838–1848, '
        + 'ja sen tieltä purettiin kaksi 1300-luvun taloa. Arkkitehteina työskentelivät Pietro Nobile ja '
        + 'Pavel Sprenger. Toukokuun alussa 1945 Prahan kansannousun aikana raatihuone toimi vastarinnan '
        + 'keskuksena. Saksalaiset joukot ampuivat sitä 8. toukokuuta, muutama tunti ennen antautumisensa '
        + 'allekirjoitusta, ja itäsiipi paloi kuoreksi. Tuli vahingoitti myös tornia ja astronomista kelloa '
        + 'ja tuhosi osan kaupunginarkistosta. Jäljelle jääneet seinät purettiin tornin viereistä osaa '
        + 'lukuun ottamatta. Kilpailut vuodesta 1899 lähtien jäivät ilman voittajaa tai toteutusta, eikä '
        + 'siivelle ole rakennettu korvaajaa.',
      lahde: 'cs-Wikipedia ”Staroměstská radnice”; en-Wikipedia ”Old Town Hall (Prague)” (tarkistettu '
        + '31.10.2026).',
      kuva: 'ihme-praha-raatihuone-loistoaika.jpg',
      lyhyt: 'Noin vuonna 1900 kaupungin virkamiehet kulkevat uusgoottilaisen siiven käytävillä, ja tornin '
        + 'astronominen kello käy vierestä; vajaat viisikymmentä vuotta myöhemmin siipi palaa.',
      selite: 'Noin vuonna 1900 uusgoottilainen siipi liittyy keskiaikaiseen torniin Vanhankaupungin torin '
        + 'laidalla, ja tornin astronominen kello on käynyt vuodesta 1410, siis jo lähes viisisataa vuotta. '
        + 'Tornissa on myös 1381 vihitty kappeli. Toukokuun 8. päivänä 1945 saksalaisten tulitus sytyttää '
        + 'siiven, ja se palaa kuoreksi; tuli tuhoaa myös kappelin, ja vain sen portaali säilyy. Paikka on '
        + 'jäänyt tyhjäksi, koska kilpailut eivät tuottaneet toteutettua suunnitelmaa.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1900). Faktat: '
        + 'cs-Wikipedia ja en-Wikipedia, tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Old_Town_Hall_(Prague)',
    }),kohde({
    id: 'josefov-asanace', nimi: 'Josefov ennen asanacea',
    nimio: 'Josefov',
    nappi: 'Prahan juutalaiskorttelin keskiaikainen kujaverkko',
    laudat: { maailmankartta: { x: 6313.9, y: 1386.3 }, europe: { x: 488.0, y: 576.2 } },
    teksti: 'Josefov oli Prahan tiheästi rakennettu keskiaikainen juutalaiskortteli. '
      + 'Frans Joosef vahvisti saneerauslain vuonna 1893, ja valtaosa kujista purettiin '
      + 'vuosina 1895–1913. Kuusi synagogaa ja vanha hautausmaa säilyivät.',
    lahde: 'en-Wikipedia "Josefov" ja Prague Jewish Town redevelopment (tarkistettu 21.9.2026).',
    kuva: 'ihme-josefov-asanace-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Josefov',
  })],
  HUN: [
    ihmeKohde({
      id: 'erzsebet-silta',
      nimi: 'Alkuperäinen Erzsébet-silta',
      nimio: 'Erzsébet-silta',
      kysymykset: ['Kuinka pitkä oli sillan jänneväli?', 'Miten alkuperäinen Erzsébet-silta tuhoutui?'],
      korostukset: ['Tonava|Tonavan', 'keisarinna Elisabet|keisarinna Elisabetin'],
      nappi: 'Ketjusilta, jonka jänneväli oli ennätys',
      laudat: { maailmankartta: { x: 6468.4, y: 1497.8 }, europe: { x: 577.0, y: 644.6 } },
      teksti: 'Budapestin Erzsébet-silta avattiin 10. lokakuuta 1903 ja nimettiin Itävalta-Unkarin keisarinna '
        + 'Elisabetin mukaan. Siltaa varten järjestettiin kansainvälinen kilpailu, johon tuli 53 ehdotusta, '
        + 'mutta voittanutta riippusiltaa ei voitu rakentaa, koska Unkarissa ei ollut sopivaa teräsköyttä. '
        + 'Kauppaministeriön insinöörit Aurél Czekelius ja Antal Kherndl suunnittelivat tilalle '
        + 'ketjusillan. Silta ylitti Tonavan 290 metrin jännevälillä, ja se oli pisin ketjusillan '
        + 'jänneväli, kunnes Hercílio Luz -silta valmistui Brasiliassa 1926. Saksalaiset joukot räjäyttivät '
        + 'sillan 18. tammikuuta 1945 perääntyessään. Se on ainoa Budapestin silloista, jota ei rakennettu '
        + 'entisen mallisena, ja nykyinen silta valmistui 1964.',
      lahde: 'en-Wikipedia ”Elisabeth Bridge (Budapest)”; de-Wikipedia ”Elisabethbrücke (Budapest)” '
        + '(tarkistettu 31.10.2026).',
      kuva: 'ihme-erzsebet-silta-loistoaika.jpg',
      lyhyt: 'Jalankulkijat ja liikenne ylittävät Tonavan ketjusillalla, jonka sirojen pylväsporttien välinen '
        + 'jänneväli on 290 metriä; reilut kolmekymmentä vuotta myöhemmin silta räjäytetään.',
      selite: 'Noin vuonna 1930 kävelijät ja liikenne ylittävät Tonavan sillalla, jonka kannella on neljä '
        + 'kaistaa ja molemmilla puolilla jalkakäytävä. Joki on tässä Budapestin seudun kapeimmillaan. '
        + 'Pylväät kohoavat portteina molemmin puolin vettä, ja niiden valurautaiset kärjet erottuvat joen '
        + 'yllä. Tammikuussa 1945 saksalaiset räjäyttävät sillan; se on ainoa Budapestin silloista, jota ei '
        + 'rakennettu entisen mallisena. Tilalle valmistuu 1964 uusi silta, joka kestää nykyliikennettä.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1930). Faktat: en- ja '
        + 'de-Wikipedia, tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Elisabeth_Bridge_(Budapest)',
    }),kohde({
    id: 'budan-matyas-palatsi', nimi: 'Budan Mátyás-palatsi',
    nimio: 'Mátyás-palatsi',
    nappi: 'Mátyás Corvinuksen italialainen renessanssihovi',
    // Pieni itäinen asettelusiirto pitää Hollókőn ja Kruunuvarkaus 1440:n nimiöt erillään.
    laudat: { maailmankartta: { x: 6469.0, y: 1497.6 }, europe: { x: 577.3, y: 644.5 } },
    teksti: 'Budan keskiaikainen kuninkaanlinna sai Mátyás Corvinuksen aikana 1470-luvulta '
      + 'lähtien loisteliaan varhaisrenessanssiasun. Vuoden 1686 piiritys tuhosi palatsin '
      + 'raskaalla tykistöllä, ja jäljelle jääneet rauniot purettiin 1715.',
    lahde: 'en-Wikipedia "Buda Castle", keskiaikainen palatsi (tarkistettu 21.9.2026).',
    kuva: 'ihme-budan-matyas-palatsi-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Buda_Castle',
  })],
  BGR: [
    kohde({
      id: 'pliska-palatsi', nimi: 'Pliskan kaanien palatsi',
      nimio: 'Pliska',
      nappi: 'Ensimmäisen Bulgarian valtakunnan pääkaupungin suurpalatsi',
      laudat: { maailmankartta: { x: 6737.5, y: 1668.6 }, europe: { x: 732.0, y: 753.1 } },
      teksti: 'Pliska oli ensimmäisen Bulgarian valtakunnan pääkaupunki vuosina 681–893. '
        + 'Nikeforos I poltti palatsin vuonna 811, mutta kaani Omurtag rakennutti sen '
        + 'uudelleen. Sodat tuhosivat kaupungin lopullisesti 900-luvun lopulla.',
      lahde: 'en-Wikipedia "Pliska", historia ja palatsialue (tarkistettu 21.9.2026).',
      kuva: 'ihme-pliska-palatsi-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Pliska',
    }),
    kohde({
      id: 'antiikin-serdika', nimi: 'Antiikin Serdika',
      nappi: 'Konstantinus Suuren roomalainen kaupunki nykyisen Sofian alla',
      laudat: { maailmankartta: { x: 6610.7, y: 1695.6 }, europe: { x: 659.0, y: 770.6 } },
      teksti: 'Serdika oli merkittävä roomalainen provinssikaupunki nykyisen Sofian paikalla. '
        + 'Konstantinus Suuren kerrotaan kutsuneen sitä omaksi Roomakseen. Attilan hunnit '
        + 'tuhosivat kaupungin vuonna 447, ja Justinianus rakensi sen uudelleen.',
      lahde: 'en-Wikipedia "History of Sofia", antiikin Serdika (tarkistettu 21.9.2026).',
      kuva: 'ihme-antiikin-serdika-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/History_of_Sofia',
    }),
  ],
  HRV: [kohde({
    id: 'salona-porta-caesarea', nimi: 'Salonan Porta Caesarea',
    nimio: 'Porta Caesarea',
    nappi: 'Rooman Dalmatian pääkaupungin monumentaalinen portti',
    laudat: { maailmankartta: { x: 6382.8, y: 1661.5 }, europe: { x: 527.7, y: 748.5 } },
    teksti: 'Salona oli Rooman Dalmatian provinssin pääkaupunki ja keisari Diocletianuksen '
      + 'syntymäpaikka. Avaarit ja slaavit tuhosivat kaupungin 600-luvulla. Asukkaat '
      + 'pakenivat Diocletianuksen palatsiin, jonka ympärille Split kasvoi.',
    lahde: 'en-Wikipedia "Salona", johdanto ja tuho (tarkistettu 21.9.2026).',
    kuva: 'ihme-salona-porta-caesarea-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Salona',
  })],
  ROU: [
    ihmeKohde({
      id: 'vacaresti',
      nimi: 'Văcărești-luostari',
      nimio: 'Văcărești',
      kysymykset: ['Miksi Ceaușescu määräsi Văcărești-luostarin purettavaksi?', 'Mitä luostarissa oli ennen kuin siitä tuli vankila?'],
      korostukset: ['Nicolae Mavrocordat|Nicolae Mavrocordat', 'kirjapaino|kirjapaino', 'Ceaușescu|Ceaușescu'],
      nappi: 'Luostari, jonka tilalle jäi keskeneräinen työmaa',
      laudat: { maailmankartta: { x: 6703.9, y: 1626.3 }, europe: { x: 712.6, y: 725.8 } },
      teksti: 'Văcărești oli Bukarestin suuri luostari, jonka Valakian ruhtinas Nicolae Mavrocordat aloitti '
        + '1716; kirkko vihittiin 24. syyskuuta 1724. Luostariin perustettiin kreikankielinen koulu, '
        + 'kirjapaino ja kirjasto, jonka vuoden 1723 luettelossa oli 237 kirjoittajaa. Vuoden 1848 '
        + 'vallankumouksen johtajia pidettiin täällä vangittuina, ja vuodesta 1868 luostari oli '
        + 'virallisesti vankila. 1970-luvulla se alettiin kunnostaa uskonnollisen taiteen museoksi, mutta '
        + 'työ keskeytyi vuoden 1977 maanjäristyksen jälkeen. Ceaușescu määräsi luostarin purettavaksi, kun '
        + 'patriarkka ei suostunut ottamaan sitä käyttöön ennen kunnostusta. Purku alkoi syksyllä 1985, ja '
        + 'koko kompleksi oli maan tasalla 1987. Tilalle suunniteltu oikeusministeriön rakennus jäi kesken '
        + '1990.',
      lahde: 'en-Wikipedia "Văcărești Monastery", johdanto ja osiot historiasta ja purusta; ro-Wikipedia '
        + '"Mănăstirea Văcărești", osio purusta (tarkistettu 31.10.2026).',
      kuva: 'ihme-vacaresti-loistoaika.jpg',
      lyhyt: 'Oppilaat opiskelevat luostarin kreikankielisessä koulussa, kirjapaino tuottaa uusia kirjoja ja '
        + 'kirjasto täyttyy; reilut kaksisataa vuotta myöhemmin Ceaușescu määrää luostarin purettavaksi.',
      selite: 'Noin vuonna 1740 oppilaat opiskelevat luostarin kreikankielisessä koulussa, ja kirjapainosta '
        + 'tulee tuoreita kirjoja. Kirjaston luettelossa on jo 237 kirjoittajaa, ja kirkko seisoo luostarin '
        + 'pihalla vuonna 1724 vihittynä. Länsipuolella on kappeli ja pienempi toinen piha, jotka on '
        + 'lisätty 1736. Painon puristin narahtaa, ja märät arkit ripustetaan kuivumaan. Syksyllä 1985 '
        + 'alkaa purku, joka vie koko kompleksin maan tasalle 1987 mennessä; tilalle valetaan perustukset, '
        + 'mutta rakennus jää kesken.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1740). Faktat: en- ja '
        + 'ro-Wikipedia "Văcărești Monastery", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/V%C4%83c%C4%83re%C8%99ti_Monastery',
    }),kohde({
    id: 'coltea-torni', nimi: 'Colțea-torni',
    nappi: 'Bukarestin korkein kellotorni juuri ennen purkua',
    laudat: { maailmankartta: { x: 6703.5, y: 1625.1 }, europe: { x: 712.4, y: 725.0 } },
    teksti: 'Colțea-torni valmistui Bukarestiin vuonna 1714 ja oli 54-metrisenä kaupungin '
      + 'korkein rakennelma lähes 175 vuotta. Maanjäristykset vaurioittivat tornia, mutta '
      + 'se seisoi vuoteen 1888, jolloin se purettiin bulevardin tieltä.',
    lahde: 'en-Wikipedia "Colțea Tower", johdanto ja purku (tarkistettu 21.9.2026).',
    kuva: 'ihme-coltea-torni-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Col%C8%9Bea_Tower',
  })],
  SVK: [kohde({
    id: 'vydrica-zuckermandel', nimi: 'Vydrica–Zuckermandel',
    nimio: 'Zuckermandel',
    nappi: 'Bratislavan linnan ja Tonavan välinen rantakaupunginosa',
    laudat: { maailmankartta: { x: 6403.1, y: 1470.2 }, europe: { x: 539.4, y: 627.5 } },
    teksti: 'Vydrica ja Zuckermandel muodostivat 1300-luvulta lähtien Bratislavan linnanmäen '
      + 'ja Tonavan välisen kaupunginosan. Kommunistihallinto purki lähes koko alueen '
      + 'vuosina 1967–1974 Uuden sillan liikenneväylien tieltä.',
    lahde: 'sk-Wikipedia "Vydrica" ja "Zuckermandel" (tarkistettu 21.9.2026).',
    kuva: 'ihme-vydrica-zuckermandel-loistoaika.jpg', url: 'https://sk.wikipedia.org/wiki/Vydrica_(Bratislava)',
  })],
  /*
   * RAKENNETTU UUDELLEEN → EI KADONNUT (omistaja 31.10.2026 klo 12.49, PT): palatsi on paikalla samanlaisena
   * (museopalatsi 2018), joten kadonnut: false – kartalla nykytilan valokuva ja "Koe ihme" avaa loistoaikakuvan
   * (sama sääntö kuin Dresdenin Frauenkirche).
   */
  LTU: [
    ihmeKohde({
      id: 'suuri-synagoga-vilna',
      nimi: 'Vilnan suuri synagoga',
      kysymykset: ['Miksi Vilnan suuren synagogan lattia oli kaivettu syvälle maahan?', 'Mitä synagogan paikalla on löydetty kaivauksissa?'],
      korostukset: ['bimah|bimah', 'Johann Christoph Glaubitz|Johann Christoph Glaubitz'],
      nappi: 'Synagoga, jonka lattia kaivettiin kirkkoa matalammalle',
      laudat: { maailmankartta: { x: 6676.2, y: 1180.6 }, europe: { x: 696.7, y: 455.5 } },
      teksti: 'Vilnan suuri synagoga rakennettiin kivestä 1630–1633 kaupungin juutalaisyhteisön pääsynagogaksi. '
        + 'Koska synagoga ei saanut olla kirkkoa korkeampi, sen lattia kaivettiin syvälle maahan: ulkoa '
        + 'rakennus näytti kolmikerroksiselta, mutta sisällä tila kohosi yli viiden kerroksen korkeuteen. '
        + '1700-luvun puolivälissä arkkitehti Johann Christoph Glaubitz uudisti sisätilat, ja salin '
        + 'keskelle tehtiin rokokoo-tyylinen bimah, Tooran lukukoroke. Ennen sotaa korkeimpina pyhäpäivinä '
        + 'synagogassa rukoili jopa 5 000 ihmistä. Natsit ryöstivät ja polttivat sen toisen maailmansodan '
        + 'aikana, ja Neuvostoliiton viranomaiset purkivat rauniot 1957 mennessä. Kaivauksissa on '
        + '2010-luvulta lähtien löytynyt seinien ja bimahin jäännöksiä.',
      lahde: 'en-Wikipedia "Great Synagogue of Vilna", johdanto ja osiot rakennuksesta, tuhoutumisesta ja '
        + 'kaivauksista (tarkistettu 31.10.2026).',
      kuva: 'ihme-suuri-synagoga-vilna-loistoaika.jpg',
      lyhyt: 'Yhteisö laskeutuu portaita syvälle maan alle upotettuun saliin, jonka katto kohoaa yli viiden '
        + 'kerroksen korkeuteen; vajaat seitsemänkymmentä vuotta myöhemmin natsit polttavat synagogan.',
      selite: 'Vuonna 1873 pyhäpäivän rukoukseen kokoontuva yhteisö laskeutuu syvälle katutason alapuolelle '
        + 'upotettuun saliin, jonka katto kohoaa yli viiden kerroksen korkeuteen. Salin keskellä on '
        + 'rokokoo-tyylinen bimah, ja uskonnollisina juhlapäivinä rukoilijoita on tuhansia. Ulkoapäin '
        + 'synagoga näyttää vain kolmikerroksiselta, koska kirkkoa korkeampaa temppeliä ei saanut rakentaa. '
        + 'Vuonna 1941 natsit ryöstävät ja polttavat synagogan, ja Neuvostoliiton viranomaiset purkavat '
        + 'rauniot 1957 mennessä.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1873). Faktat: en-Wikipedia '
        + '"Great Synagogue of Vilna", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Great_Synagogue_of_Vilna',
    }),rappeutunutKohde({
    id: 'vilnan-alalinna', nimi: 'Vilnan alalinna',
    nappi: 'Liettuan suurruhtinaiden palatsi, purettu 1801 ja rakennettu uudelleen',
    laudat: { maailmankartta: { x: 6676.3, y: 1180.3 }, europe: { x: 696.7, y: 455.4 } },
    teksti: 'Vilnan alalinnan suurruhtinaiden palatsi oli Liettuan hallinnon keskus '
      + '1400-luvulta. Venäjän sota vaurioitti sitä pahoin 1655–1661, ja tsaarin '
      + 'viranomaiset purkivat rauniot 1801–1805. Palatsi rakennettiin uudelleen museoksi, joka avattiin 2018.',
    lahde: 'en-Wikipedia "Palace of the Grand Dukes of Lithuania", historia (tarkistettu 21.9.2026).',
    kysymykset: ['Miltä Vilnan alalinna näytti loistoaikanaan?', 'Miksi palatsi purettiin ja rakennettiin uudelleen?'],
    kuva: {
      tiedosto: 'Vilnius Gedimino Pilies Bokštas Blick auf die Valdovu rumai.jpg',
      selite: 'Uudelleen rakennettu suurruhtinaiden palatsi Gediminaksen tornista nähtynä.',
      lahde: 'Zairon, Wikimedia Commons (CC BY-SA 4.0)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vilnius_Gedimino_Pilies_Bok%C5%A1tas_Blick_auf_die_Valdovu_rumai.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    ihmeKuva: 'ihme-vilnan-alalinna-loistoaika.jpg',
    ihmeSelite: 'Vilnan alalinnan palatsi kuvattuna loistoaikanaan ennen 1600-luvun sotia.',
    url: 'https://en.wikipedia.org/wiki/Palace_of_the_Grand_Dukes_of_Lithuania',
  })],
  // Rakennettu uudelleen 1996–1999 → kadonnut: false (omistaja 31.10.2026 klo 12.49, PT; ks. Vilnan alalinna yllä).
  LVA: [
    ihmeKohde({
      id: 'gogolin-synagoga',
      nimi: 'Gogolin kadun synagoga',
      kysymykset: ['Minkä vuoksi Gogolin kadun synagoga tunnettiin koko Riiassa?', 'Mitä synagogan paikalla on muistona?'],
      korostukset: ['Paul von Hardenack|Paul von Hardenack', 'kanttori|kanttoreistaan', 'Jānis Lipke|Jānis Lipkelle'],
      nappi: 'Synagoga, joka tunnettiin kanttoreistaan',
      laudat: { maailmankartta: { x: 6637.2, y: 1074.5 }, europe: { x: 674.2, y: 396.0 } },
      teksti: 'Gogolin kadun synagoga eli Riian suuri koraalisynagoga oli kaupungin suurin synagoga. Arkkitehti '
        + 'Paul von Hardenack suunnitteli tiilirakennuksen 1868, ja se valmistui 1871; tyylissä hallitsi '
        + 'uusrenessanssi. Koko Riiassa synagoga tunnettiin kanttoreistaan ja kuorostaan. Saksan '
        + 'miehityksen ensimmäisinä päivinä, 4. heinäkuuta 1941, synagoga sytytettiin palamaan, ja '
        + 'tulipalossa kuoli ihmisiä; lähteet eroavat siinä, kuinka monta. Neuvostoviranomaiset purkivat '
        + 'jäljelle jääneet rauniot ja tekivät paikasta aukion. Paikalle pystytettiin muistokivi 1988 ja '
        + 'muistomerkki 1993, joka seuraa synagogan seinien linjaa, sekä 2007 muistomerkki Jānis Lipkelle '
        + 'ja muille juutalaisia pelastaneille.',
      lahde: 'en-Wikipedia "Great Choral Synagogue (Riga)" ja "Burning of the Riga synagogues", johdanto ja '
        + 'osiot rakennuksesta, tuhosta ja muistomerkeistä (tarkistettu 31.10.2026).',
      kuva: 'ihme-gogolin-synagoga-loistoaika.jpg',
      lyhyt: 'Kanttori ja kuoro täyttävät synagogan äänellä sapatin alkaessa, ja yhteisö kuuntelee; reilut '
        + 'neljäkymmentä vuotta myöhemmin synagoga poltetaan.',
      selite: 'Synagoga on valmistunut 1871 Paul von Hardenackin suunnitelmien mukaan. Noin vuonna 1900 sapatin '
        + 'alkaessa kanttori ja kuoro täyttävät uusrenessanssityylisen tiilisalin äänellä, ja yhteisö '
        + 'kuuntelee Riian suurimmassa synagogassa. Koko kaupungissa puhutaan synagogan kanttoreista ja '
        + 'kuorosta, ja rakennus on yhteisön keskus. Heinäkuussa 1941 synagoga sytytetään, ja tulipalossa '
        + 'kuolee ihmisiä. Neuvostoviranomaiset purkavat rauniot, ja paikalle jää aukio, jossa muistomerkki '
        + 'seuraa synagogan seinien linjaa.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1900). Faktat: '
        + 'en-Wikipedia "Great Choral Synagogue (Riga)", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Great_Choral_Synagogue_(Riga)',
    }),rappeutunutKohde({
    id: 'mustapaiden-talo', nimi: 'Riian Mustapäiden talo',
    nimio: 'Mustapäiden talo',
    nappi: 'Kauppiasveljeskunnan juhlarakennus, räjäytetty 1948 ja rakennettu uudelleen',
    laudat: { maailmankartta: { x: 6636.9, y: 1074.4 }, europe: { x: 674.1, y: 395.9 } },
    teksti: 'Mustapäiden talo oli Riian kauppiaiden kokoontumispaikka vuodesta 1334. '
      + 'Rakennus paloi tykistötulessa vuonna 1941, ja jäljelle jääneet rauniot räjäytettiin '
      + '1948. Talo rakennettiin uudelleen entisen näköiseksi vuosina 1996–1999.',
    lahde: 'en-Wikipedia "House of the Blackheads (Riga)", historia (tarkistettu 21.9.2026).',
    kysymykset: ['Miltä Mustapäiden talo näytti loistoaikanaan?', 'Miksi talo rakennettiin uudelleen?'],
    kuva: {
      tiedosto: 'House of Blackheads at Dusk 3, Riga, Latvia - Diliff.jpg',
      selite: 'Uudelleen rakennettu Mustapäiden talo Raatihuoneentorilla.',
      lahde: 'Diliff, Wikimedia Commons (CC BY-SA 3.0)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:House_of_Blackheads_at_Dusk_3,_Riga,_Latvia_-_Diliff.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    ihmeKuva: 'ihme-mustapaiden-talo-loistoaika.jpg',
    ihmeSelite: 'Mustapäiden talo kuvattuna loistoaikanaan ennen vuoden 1941 tuhoa.',
    url: 'https://en.wikipedia.org/wiki/House_of_the_Blackheads_(Riga)',
  })],
  EST: [kohde({
    id: 'narvan-vanhakaupunki', nimi: 'Narvan barokkinen vanhakaupunki',
    nimio: 'Narva',
    nappi: 'Narvan yhtenäinen barokkikaupunki 1700-luvun asussa',
    laudat: { maailmankartta: { x: 6773.0, y: 956.6 }, europe: { x: 752.4, y: 332.0 } },
    teksti: 'Narvan vanhakaupunki oli Pohjois-Euroopan parhaiten säilyneitä barokkikaupunkeja. '
      + 'Pommitukset tuhosivat sen maaliskuussa 1944, ja neuvostoviranomaiset purkivat '
      + 'jäljelle jääneet rauniot 1950-luvulla kerrostalojen tieltä.',
    lahde: 'en-Wikipedia "Narva", toinen maailmansota ja jälleenrakennus (tarkistettu 21.9.2026).',
    kuva: 'ihme-narvan-vanhakaupunki-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Narva',
  })],
  FIN: [
    ihmeKohde({
      id: 'helsinki-vanha-asema',
      nimi: 'Helsingin vanha rautatieasema',
      nimio: 'Vanha asema',
      kysymykset: ['Miksi Helsingin ensimmäinen rautatieasema purettiin?', 'Kuka suunnitteli korvaavan aseman?'],
      korostukset: ['Carl Albert Edelfelt|Carl Albert Edelfeltin', 'Eliel Saarinen|Eliel Saarisen'],
      nappi: 'Asema, jolla paloi kaasuvalo',
      laudat: { maailmankartta: { x: 6664.7, y: 917.2 }, europe: { x: 690.1, y: 311.1 } },
      teksti: 'Helsingin ensimmäinen rautatieasema valmistui 1861 Kluuvinlahden täytemaalle, ja liikenne '
        + 'Hämeenlinnaan alkoi 17. maaliskuuta 1862. Hämeen lääninarkkitehti Carl Albert Edelfeltin '
        + 'suunnittelema rakennus oli kolmikerroksinen ja verhoiltu luonnonkivellä, ja se muistutti '
        + 'uusgoottilaisen ja uusrenessanssin sekoitusta tudor-tyylisine kaarineen, kuin romanttista '
        + 'kartanoa. Torni jäi kustannussyistä rakentamatta. Muista asemista poiketen siinä paloi '
        + 'kaasuvalo, sillä kaupungin ensimmäinen kaasulaitos rakennettiin viereen. Asema mitoitettiin noin '
        + '20 000 asukkaan kaupungille, mutta väkiluku kasvoi lähes 70 000:lla 1900-luvun alkuun mennessä. '
        + 'Rakennus purettiin joulukuussa 1918, ja Eliel Saarisen suunnittelema asema vihittiin 5. '
        + 'maaliskuuta 1919.',
      lahde: 'fi-Wikipedia ”Helsingin päärautatieasema”, osio ”Historia > Ensimmäinen asemarakennus”; '
        + 'en-Wikipedia ”Helsinki Central Station”, osio ”First station” (tarkistettu 31.10.2026).',
      kuva: 'ihme-helsinki-vanha-asema-loistoaika.jpg',
      lyhyt: 'Kaukojunan matkustaja kulkee odotussalien läpi puukatoksen alle laiturille, ja yläkerroksissa '
        + 'asuvat rautatiepäällikkö ja asemapäällikkö; reilut neljäkymmentä vuotta myöhemmin asema '
        + 'puretaan.',
      selite: 'Vuonna 1873 höyryveturi seisoo laiturilla puisen katoksen alla. Kaukomatkustajat kulkevat '
        + 'odotussalien läpi, mutta lähijunaan noustaan suoraan Kaivokadun rautaportista. Aseman edessä '
        + 'levittäytyy Rautatientori, joka raivattiin pienten rakennusten tilalle rautatien tieltä. '
        + 'Yläkerroksissa ovat rautatiepäällikön ja asemapäällikön asunnot, ja ikkunoissa loistaa '
        + 'kaasuvalo. Vanhasta asemasta tulee lopulta liian pieni, ja se puretaan joulukuussa 1918, kun '
        + 'Saarisen asema on valmis.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1873, isoisän matkavuosi). '
        + 'Faktat: fi-Wikipedia ”Helsingin päärautatieasema” ja en-Wikipedia ”Helsinki Central Station”, '
        + 'tarkistettu 31.10.2026.',
      url: 'https://fi.wikipedia.org/wiki/Helsingin_p%C3%A4%C3%A4rautatieasema',
    }),kohde({
    id: 'turun-tuomiokirkon-vanha-torni', nimi: 'Turun tuomiokirkon vanha torni',
    nimio: 'Tuomiokirkon torni',
    nappi: 'Sipulikupolinen barokkitorni ennen Turun suurpaloa',
    laudat: { maailmankartta: { x: 6575.9, y: 903.1 }, europe: { x: 638.9, y: 303.7 } },
    teksti: 'Turun tuomiokirkon keskiaikainen torni sai barokkisen sipulikupolin '
      + '1600–1700-luvuilla. Turun suuri palo tuhosi huipun vuonna 1827. C. L. Engelin '
      + 'suunnittelema nykyinen korkeampi torni valmistui vuonna 1836.',
    lahde: 'fi-Wikipedia "Turun tuomiokirkko", tornin rakennushistoria (tarkistettu 21.9.2026).',
    kuva: 'ihme-turun-tuomiokirkon-vanha-torni-loistoaika.jpg', url: 'https://fi.wikipedia.org/wiki/Turun_tuomiokirkko',
  })],
  SWE: [
    ihmeKohde({
      id: 'kustaa-ooppera',
      nimi: 'Kustaa III:n ooppera',
      nimio: 'Vanha ooppera',
      kysymykset: ['Mitä Kustaa III:lle tapahtui oopperan naamiaisissa 1792?', 'Minkä Verdin oopperan aihe on tämä tapahtuma?'],
      korostukset: ['Carl Fredrik Adelcrantz|Carl Fredrik Adelcrantzin', 'Verdi|Verdin'],
      nappi: 'Ooppera, jossa kuningas ammuttiin naamiaisissa',
      laudat: { maailmankartta: { x: 6435.7, y: 958.9 }, europe: { x: 558.2, y: 333.2 } },
      teksti: 'Kustaa III perusti Ruotsin oopperan ja rakennutti sille talon Gustav Adolfs torgin itälaidalle. '
        + 'Carl Fredrik Adelcrantzin suunnittelema ooppera vihittiin 30. syyskuuta 1782 Naumannin '
        + 'oopperalla Cora och Alonzo. Lavan koko oli noin 10,7 × 23,7 metriä, ja katsomossa oli parteri ja '
        + 'neljä parvea. Maaliskuun 16. päivänä 1792 talossa pidettiin naamiaiset, joissa aatelisten '
        + 'salaliittolaiset ampuivat kuningasta; hän kuoli 29. maaliskuuta. Naamiaiset kiellettiin 1821 '
        + 'asti, ja Verdin ooppera Un ballo in maschera (1859) sai tapahtumasta aiheensa. Vanha ooppera '
        + 'purettiin 1892, koska koneisto oli vanhentunut ja talo oli palovaarallinen, ja Oskar II halusi '
        + 'nykyaikaisen oopperan samalle paikalle. Se oli vielä pystyssä isoisän matkavuonna 1873.',
      lahde: 'sv-Wikipedia ”Gustavianska operahuset” ja ”Kungliga Operan”; en-Wikipedia ”Royal Swedish Opera” '
        + 'ja ”Gustav III of Sweden” (tarkistettu 31.10.2026).',
      kuva: 'ihme-kustaa-ooppera-loistoaika.jpg',
      lyhyt: 'Yleisö täyttää parterren ja neljä parvea, ja avajaisissa 30. syyskuuta 1782 soi Naumannin Cora '
        + 'och Alonzo; kymmenen vuotta myöhemmin kuningas ammutaan samassa talossa.',
      selite: 'Maaliskuun 16. päivänä 1792 kuningas lukee illallisella nimettömän kirjeen, joka varoittaa '
        + 'salaliitosta ja kehottaa lykkäämään naamiaisia, mutta hän ei välitä siitä. Oopperan salissa on '
        + 'naamioituneita vieraita, ja puoliyön aikaan naamioidut miehet tukkivat hänen tiensä. Laukaus '
        + 'kuuluu takaa, ja kuningas kuolee haavaansa 29. maaliskuuta. Talo on kuninkaan oma hanke, ja se '
        + 'palvelee vielä sata vuotta; se puretaan 1892, ja uusi ooppera vihitään 1898.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1792). Faktat: sv-Wikipedia '
        + '”Gustavianska operahuset” ja ”Kungliga Operan” sekä en-Wikipedia ”Gustav III of Sweden”, '
        + 'tarkistettu 31.10.2026.',
      url: 'https://sv.wikipedia.org/wiki/Gustavianska_operahuset',
    }),
    kohde({
      id: 'tre-kronor', nimi: 'Tre Kronor',
      nappi: 'Ruotsin keskiaikainen kuninkaanlinna ennen vuoden 1697 paloa',
      laudat: { maailmankartta: { x: 6435.7, y: 959.1 }, europe: { x: 558.2, y: 333.3 } },
      teksti: 'Tre Kronor oli Tukholman keskiaikainen kuninkaanlinna ja Vaasa-suvun '
        + 'hallintokeskus. Tulipalo 7. toukokuuta 1697 tuhosi linnan lähes kokonaan sekä '
        + 'suuren osan varhaisesta kansallisarkistosta. Nykyinen kuninkaanlinna rakennettiin tilalle.',
      lahde: 'en-Wikipedia "Tre Kronor (castle)", johdanto ja palo (tarkistettu 21.9.2026).',
      kuva: 'ihme-tre-kronor-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Tre_Kronor_(castle)',
    }),
    kohde({
      id: 'klara-kloster', nimi: 'Klara kloster',
      nappi: 'Klarissaluostari ennen Kustaa Vaasan uskonpuhdistusta',
      laudat: { maailmankartta: { x: 6435.5, y: 958.9 }, europe: { x: 558.0, y: 333.2 } },
      teksti: 'Sankta Klaran klarissaluostari perustettiin Tukholmaan 1280-luvulla. '
        + 'Kustaa Vaasa määräsi sen purettavaksi vuonna 1527 uskonpuhdistuksen alkaessa, '
        + 'ja tiiliä käytettiin kaupungin puolustusrakenteisiin. Nykyinen kirkko on myöhempi.',
      lahde: 'sv-Wikipedia "Sankta Klara kloster" (tarkistettu 21.9.2026).',
      kuva: 'ihme-klara-kloster-loistoaika.jpg', url: 'https://sv.wikipedia.org/wiki/Sankta_Klara_kloster',
    }),
    kohde({
      id: 'industripalatset-1897', nimi: 'Industripalatset',
      nimio: 'Industripalatset',
      nappi: 'Tukholman 1897-näyttelyn 100-metrinen kupolihalli',
      laudat: { maailmankartta: { x: 6436.6, y: 959.1 }, europe: { x: 558.7, y: 333.3 } },
      teksti: 'Kuningas Oscar II avasi Tukholman suuren taide- ja teollisuusnäyttelyn '
        + 'Djurgårdenilla 15.5.1897. Arkkitehti Ferdinand Bobergin suunnittelema '
        + 'Industripalatset oli näyttelyn näyttävin rakennus, 16 820 m² puinen halli, '
        + 'jonka 100-metrinen kupoli ja neljä minareettia hallitsivat koko saarta. '
        + 'Tilapäiseksi tarkoitettu jättiläinen purettiin näyttelyn päätyttyä.',
      lahde: 'en-Wikipedia "General Art and Industrial Exposition of Stockholm" (tarkistettu 28.9.2026).',
      kuva: 'ihme-industripalatset-stockholm-1897-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/General_Art_and_Industrial_Exposition_of_Stockholm',
    }),
  ],
  IRL: [
    ihmeKohde({
      id: 'nelsonin-pylvas',
      nimi: 'Nelsonin pylväs',
      kysymykset: ['Milloin ja miten Nelsonin pylväs tuhoutui?', 'Mikä seisoo pylvään paikalla nyt?'],
      korostukset: ['Horatio Nelson|Horatio Nelsonin', 'Dublinin Spire|Dublinin Spire'],
      nappi: 'Amiraali, jonka pylväs räjäytettiin 1966',
      laudat: { maailmankartta: { x: 5624.7, y: 1241.4 }, europe: { x: 91.0, y: 490.5 } },
      teksti: 'Nelsonin pylväs oli graniittipylväs Dublinin Sackville Streetin, nykyisen O\'Connell Streetin, '
        + 'keskellä, ja sen huipulla seisoi amiraali Horatio Nelsonin patsas. Dublin päätti muistaa '
        + 'Nelsonia Trafalgarin voiton jälkeen 1805; kulmakivi laskettiin 15. helmikuuta 1808, ja pylväs '
        + 'valmistui 1809. Rahaa ei kertynyt tarpeeksi, joten William Wilkinsin suunnitelmaa '
        + 'yksinkertaistettiin, ja patsaineen muistomerkki oli noin 41 metriä korkea. Huipulle johti 168 '
        + 'askelman kierreportaat, ja tasanteelta aukeni näkymä yli kaupungin ja lahden. Maaliskuun 8. '
        + 'päivänä 1966 räjähdys tuhosi yläosan ja patsaan, eikä kukaan kuollut; armeija räjäytti jäljelle '
        + 'jääneen tyngän 14. maaliskuuta. Paikalla seisoo nykyään vuonna 2003 valmistunut Dublinin Spire.',
      lahde: 'en-Wikipedia "Nelson\'s Pillar", osiot "Inception, design and construction", "Opening", "History, '
        + '1809–1966", "Destruction" ja "Aftermath" (tarkistettu 31.10.2026).',
      kuva: 'ihme-nelsonin-pylvas-loistoaika.jpg',
      lyhyt: 'Turistit kiipeävät kierreportaita pylvään huipulle ja katsovat Dublinin kattojen yli lahdelle '
        + 'asti; yli kuusikymmentä vuotta myöhemmin pylväs räjähtää.',
      selite: 'Noin vuonna 1900 matkailijat kiipeävät kierreportaita ylös pylvään huipulle, jossa tasanteelta '
        + 'aukeaa näkymä Dublinin kattojen, maaseudun ja lahden yli. Alla Sackville Streetillä kulkevat '
        + 'hevosvaunut ja ratikat, ja pylväs on kaupungin keskus, josta kaikki mittaavat etäisyytensä. '
        + 'James Joyce asettaa sen ympärille romaaninsa Ulysses (1922) ratikkapysäkin. Maaliskuussa 1966 '
        + 'räjähdys tuhoaa pylvään yläosan ja patsaan, jäljelle jäänyt tynkä räjäytetään, ja paikalle '
        + 'nousee Dublinin Spire.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1900). Faktat: '
        + 'en-Wikipedia "Nelson\'s Pillar", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Nelson%27s_Pillar',
    }),kohde({
    id: 'dublinin-keskiaikainen-linna', nimi: 'Dublinin keskiaikainen linna',
    nimio: 'Dublin Castle',
    nappi: 'Englannin vallan nelitorninen linnoitus ennen vuoden 1684 paloa',
    laudat: { maailmankartta: { x: 5624.4, y: 1241.7 }, europe: { x: 90.9, y: 490.7 } },
    teksti: 'Kuningas Juhana Maattoman käskystä rakennettu Dublinin linna valmistui '
      + '1200-luvulla ja oli Englannin vallan keskus Irlannissa. Huhtikuun 1684 tulipalo '
      + 'tuhosi suuren osan keskiaikaisista rakennuksista, jotka korvattiin georgiaanisilla.',
    lahde: 'en-Wikipedia "Dublin Castle", keskiaikainen linna ja vuoden 1684 palo (tarkistettu 21.9.2026).',
    kuva: 'ihme-dublinin-keskiaikainen-linna-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Dublin_Castle',
  })],
  DNK: [
    ihmeKohde({
      id: 'vor-frue-keskiaika',
      nimi: 'Vor Frue Kirke',
      kysymykset: ['Mitkä kaksi tulipaloa tuhosivat Vor Frue Kirken?', 'Kenen patsaat ovat nykyisessä kirkossa?'],
      korostukset: ['Absalon|Absalonin', 'Bertel Thorvaldsen|Bertel Thorvaldsenin'],
      nappi: 'Kirkko, joka paloi kahdesti',
      laudat: { maailmankartta: { x: 6252.4, y: 1134.2 }, europe: { x: 452.6, y: 429.2 } },
      teksti: 'Vor Frue Kirke oli Kööpenhaminan vanha pääkirkko korkeimmalla kohdalla, ja sen rakentaminen oli '
        + 'alkanut Absalonin aikana viimeistään 1187. Palon jälkeen 1314 se rakennettiin goottilaiseksi '
        + 'tiilikirkoksi. Salamaniskut 1573 ja 1585 aiheuttivat paloja ja sortumia, ja torni purettiin ja '
        + 'rakennettiin uudelleen 1609 mennessä korkealla keskikärjellä ja neljällä kulmakärjellä. '
        + 'Lokakuussa 1728 neljä päivää riehunut tulipalo tuhosi keskiaikaisen kirkon ja kolmanneksen '
        + 'kaupungista, ja uusi kirkko vihittiin 1738. Brittien pommitus syyskuussa 1807 poltti senkin. C. '
        + 'F. Hansen rakensi paikalle uusklassisen kirkon 1817–1829, ja Bertel Thorvaldsenin veistämät '
        + 'Kristus- ja apostolipatsaat koristavat sen sisätiloja. Juudaksen tilalla seisoo Paavali.',
      lahde: 'en-Wikipedia ”Church of Our Lady, Copenhagen”; da-Wikipedia ”Vor Frue Kirke (København)” '
        + '(tarkistettu 31.10.2026).',
      kuva: 'ihme-vor-frue-keskiaika-loistoaika.jpg',
      lyhyt: 'Kaupunkilaiset kokoontuvat punatiiliseen goottilaiseen kirkkoon, jonka korkea keskikärki kohoaa '
        + 'Kööpenhaminan korkeimmalla kohdalla; reilut seitsemänkymmentä vuotta myöhemmin tulipalo tuhoaa '
        + 'sen.',
      selite: 'Noin vuonna 1650 kaupunkilaiset kokoontuvat punatiilisessä goottilaisessa kirkossa, jonka korkea '
        + 'torni ja neljä kulmakärkeä näkyvät Kööpenhaminan korkeimmalta kohdalta. Reformaatio on jo '
        + 'hajottanut sen patsaat ja alttarit, kun satoja kaupunkilaisia ryntäsi kirkkoon joulukuussa 1530. '
        + 'Lokakuussa 1728 tulipalo tuhoaa kirkon, ja seuraava kirkko palaa syyskuussa 1807, kun Britannian '
        + 'laivasto pommittaa kaupunkia. C. F. Hansenin uusklassinen kirkko vihitään 1829.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1650). Faktat: '
        + 'en-Wikipedia ”Church of Our Lady, Copenhagen” ja da-Wikipedia ”Vor Frue Kirke (København)”, '
        + 'tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Church_of_Our_Lady,_Copenhagen',
    }),
    kohde({
      id: 'christiansborg', nimi: 'Toinen Christiansborg',
      nimio: 'Christiansborg',
      nappi: 'Tanskan kuninkaanlinna ennen vuoden 1884 tulipaloa',
      laudat: { maailmankartta: { x: 6252.6, y: 1134.3 }, europe: { x: 452.7, y: 429.3 } },
      teksti: 'Ensimmäinen Christiansborg tuhoutui tulipalossa vuonna 1794. Toinen palatsi '
        + 'valmistui 1828 mutta paloi sekin 1884. Sen rauniot seisoivat 23 vuotta ennen '
        + 'nykyisen, kolmannen Christiansborgin rakennustöiden alkua.',
      lahde: 'en-Wikipedia "Christiansborg Palace", ensimmäinen ja toinen palatsi (tarkistettu 21.9.2026).',
      kuva: 'ihme-christiansborg-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Christiansborg_Palace',
    }),
    kohde({
      id: 'vesterport', nimi: 'Vesterport',
      nappi: 'Kööpenhaminan vilkkain kaupunginportti ennen purkua',
      laudat: { maailmankartta: { x: 6252.2, y: 1134.3 }, europe: { x: 452.4, y: 429.3 } },
      teksti: 'Vesterport oli Kööpenhaminan läntinen pääportti ja kaupungin vilkkain '
        + 'sisäänkäynti. Vuonna 1722 uudistettu portti purettiin 1857–1859, kun '
        + 'linnoituksia purettiin. Paikalla on nykyinen Rådhuspladsen.',
      lahde: 'da-Wikipedia "Vesterport" ja Kööpenhaminan linnoitushistoria (tarkistettu 21.9.2026).',
      kuva: 'ihme-vesterport-loistoaika.jpg', url: 'https://da.wikipedia.org/wiki/Vesterport',
    }),
  ],
  RUS: [
    ihmeKohde({
      id: 'nyenskans',
      nimi: 'Nyenskans',
      nimio: 'Nyen',
      kysymykset: ['Kuka valtasi Nyenskansin 1703?', 'Mitä Nyenskansin ympäristöön päätettiin perustaa?'],
      korostukset: ['Nyenskans|Nyenskansin', 'Inkeri|Inkerissä'],
      nappi: 'Ruotsalaislinna, jonka ympärille nousi Pietari',
      laudat: { maailmankartta: { x: 6847.0, y: 928.6 }, europe: { x: 795.1, y: 317.1 } },
      teksti: 'Nyenskans oli ruotsalainen linnoitus Nevan ja Okhta-joen yhtymäkohdassa, ja Ruotsi rakensi sen '
        + '1611 vahvistaakseen valtaansa Inkerissä. Okhta-joen toiselle puolelle kasvoi Nyenin '
        + 'kauppakaupunki, joka sai kaupunkioikeudet 1632. Sen asukasmäärä oli 1600-luvun puolivälissä noin '
        + '2 000, ja kirkonkirjojen mukaan asukkaat olivat enimmäkseen suomalaisia, sitten ruotsalaisia ja '
        + 'joitakin saksalaisia. Venäläiset hyökkäsivät kaupunkiin 1656 ja vahingoittivat sitä pahoin, '
        + 'mutta linnoitus kesti. Pietari Suuri valtasi Nyenskansin 1. toukokuuta 1703 ja päätti perustaa '
        + 'uuden pääkaupungin sen ympäristöön, vaikka maa kuului vielä virallisesti Ruotsille. Linnoitus '
        + 'purettiin vähitellen kaupungin kasvaessa.',
      lahde: 'en-Wikipedia ”Nyenskans” ja ”Nyen” (tarkistettu 31.10.2026).',
      kuva: 'ihme-nyenskans-loistoaika.jpg',
      lyhyt: 'Kauppiaat ja käsityöläiset, enimmäkseen suomalaisia, asioivat Okhta-joen rannan kaupungissa '
        + 'linnan vallien varjossa; reilut neljäkymmentä vuotta myöhemmin Pietari Suuri valtaa '
        + 'linnoituksen.',
      selite: 'Noin vuonna 1660 Okhta-joen rannalla elää noin 2 000 asukkaan kauppakaupunki, jonka väki on '
        + 'kirkonkirjojen mukaan enimmäkseen suomalaista. Venäläisten hyökkäys 1656 on vahingoittanut sitä '
        + 'pahoin, mutta joen toisella puolella Nyenskansin linnoitus vartioi yhä Nevan ja Okhtan '
        + 'yhtymäkohtaa. Kukaan ei arvaa, että tällä kulmalla seisoo tulevan suurkaupungin paikka. '
        + 'Toukokuussa 1703 Pietari Suuri valtaa linnoituksen ja päättää perustaa uuden pääkaupungin sen '
        + 'ympärille.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1660). Faktat: '
        + 'en-Wikipedia ”Nyenskans” ja ”Nyen”, tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Nyenskans',
    }),
    ihmeKohde({
      id: 'tsudov',
      nimi: 'Tšudovin ja Taivaaseenastumisen luostarit',
      nimio: 'Kremlin luostarit',
      kysymykset: ['Minkä Kremlin luostarin katedraalissa tsaarien lapsia kastettiin?', 'Missä Taivaaseenastumisen luostarin haudat ovat nykyään?'],
      korostukset: ['Tšudovin luostari|Tšudovin luostarin', 'marsalkka Davout|marsalkka Davout', 'Arkkienkelinkatedraali|Arkkienkelinkatedraalin'],
      nappi: 'Kaksi Kremlin luostaria, joiden tilalle tuli sotakoulu',
      laudat: { maailmankartta: { x: 7087.3, y: 1130.8 }, europe: { x: 933.5, y: 427.3 } },
      teksti: 'Tšudovin luostari ja Taivaaseenastumisen luostari olivat Moskovan Kremlin vanhimpia luostareita, '
        + 'molemmat perustettu 1300-luvulla. Tšudovin luostarin katedraalissa kastettiin tsaarien lapsia, '
        + 'muun muassa Pietari Suuri, ja Ranskan hyökkäyksen aikana 1812 marsalkka Davout otti luostarin '
        + 'toimistokseen. Taivaaseenastumisen luostarin katedraalin holviin haudattiin Moskovan '
        + 'suuriruhtinattaria ja tsaarittaria, muun muassa Ivan Julman vaimoja. Neuvostohallitus purki '
        + 'molemmat luostarit vuonna 1929 ja rakensi paikalle sotakoulun, ja hautoja siirrettiin '
        + 'Arkkienkelinkatedraalin lisärakennukseen. Taivaaseenastumisen katedraalin ikonostaasi vietiin '
        + 'Kaksitoista apostolia -katedraaliin. Sotakoulun rakennus purettiin lopulta vuonna 2016.',
      lahde: 'en-Wikipedia "Chudov Monastery" ja "Ascension Convent", johdannot ja osiot historiasta, '
        + 'hautauksista ja purusta; Interfax-uutinen 8.5.2016 ja Kremlin Presidium -artikkeli (paikan '
        + 'nykytila; tarkistettu 31.10.2026).',
      kuva: 'ihme-tsudov-loistoaika.jpg',
      lyhyt: 'Nunnat sytyttävät kynttilöitä katedraalissa Moskovan ruhtinattarien haudoilla, ja viereisessä '
        + 'luostarissa kastetaan tsaarin lapsia; vajaat kahdeksankymmentä vuotta myöhemmin molemmat '
        + 'puretaan.',
      selite: 'Noin vuonna 1850 nunnat sytyttävät kynttilöitä Taivaaseenastumisen luostarin viisikupolisessa '
        + 'katedraalissa Moskovan suuriruhtinattarien ja tsaarittarien haudoilla. Viereisessä Tšudovin '
        + 'luostarissa munkit hoitavat katedraalia, jossa tsaarien lapsia on kastettu. Kremlin kupolit '
        + 'kohoavat luostarien yläpuolelle, ja iltakellojen ääni kantautuu muurien yli. Vuonna 1929 '
        + 'molemmat luostarit puretaan, haudat siirretään Arkkienkelinkatedraalin lisärakennukseen, ja '
        + 'paikalle rakennetaan sotakoulu.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1850). Faktat: '
        + 'en-Wikipedia "Chudov Monastery" ja "Ascension Convent", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Chudov_Monastery',
    }),
    ihmeKohde({
      id: 'sukharev',
      nimi: 'Sukharevin torni',
      kysymykset: ['Millainen Venäjän ensimmäinen laitos toimi Sukharevin tornissa?', 'Kenen rykmentistä torni sai nimensä?'],
      korostukset: ['Pietari I|Pietari I:n', 'Jakov Bruce|Jakov Bruce', 'navigaatio|navigaation'],
      nappi: 'Torni, jossa Venäjän ensimmäinen tähtitorni toimi',
      laudat: { maailmankartta: { x: 7087.8, y: 1129.8 }, europe: { x: 933.7, y: 426.8 } },
      teksti: 'Sukharevin torni oli punatiilinen, valkokivikoristeinen torni Moskovassa, joka rakennettiin '
        + 'Pietari I:n käskystä 1692–1695. Nimi tuli Lavrenti Sukharevin johtamasta streltsi- eli '
        + 'jousiampujarykmentistä, joka tuki Pietaria. Torni oli 64 metriä korkea, ja siinä oli kello ja '
        + 'neljä pientä tornia. Kolmanteen kerrokseen perustettiin 1701 matematiikan ja navigaation koulu, '
        + 'ja yläkertaan Jakov Bruce rakensi Venäjän ensimmäisen tähtitornin, jonka kaukoputket olivat jopa '
        + '20 metriä pitkiä. Neuvostohallitus teki tornista museon 1921, mutta se purettiin 1934, koska sen '
        + 'sanottiin haittaavan liikennettä. Purku kesti huhtikuun puolivälistä 11. kesäkuuta. Perustukset '
        + 'löydettiin alikulkukäytävän työmaalla ja säilytettiin.',
      lahde: 'en-Wikipedia "Sukharev Tower" ja ru-Wikipedia "Сухарева башня", johdanto ja osiot historiasta, '
        + 'purusta ja nykytilasta (tarkistettu 31.10.2026).',
      kuva: 'ihme-sukharev-loistoaika.jpg',
      lyhyt: 'Kauppiaat ja kärryt kiertävät Sukharevin tornia, jonka kello lyö ja kotka seisoo huipulla; '
        + 'kolmekymmentäneljä vuotta myöhemmin torni puretaan.',
      selite: 'Noin vuonna 1900 Moskovan ohikulkijat kiertävät 64 metriä korkeaa Sukharevin tornia, jonka '
        + 'huipulla seisoo kotka ja jonka seinässä on kello ja neljä pientä tornia. Siellä on toiminut '
        + 'matematiikan ja navigaation koulu, ja yläkerrassa Venäjän ensimmäinen tähtitorni. Tornin '
        + 'juurella Sukharevin torilla kauppiaat huutavat hintojaan. Vuonna 1934 torni puretaan, koska sen '
        + 'sanotaan haittaavan liikennettä, ja jäljelle jäävät vain perustukset.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1900). Faktat: en- ja '
        + 'ru-Wikipedia "Sukharev Tower", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Sukharev_Tower',
    }),kohde({
    id: 'valkokivinen-kreml', nimi: 'Moskovan valkokivinen Kreml',
    nimio: 'Kreml',
    nappi: 'Dmitri Donskoin kalkkikivimuuri ennen tiililinnoitusta',
    laudat: { maailmankartta: { x: 7087.2, y: 1130.8 }, europe: { x: 933.4, y: 427.3 } },
    teksti: 'Dmitri Donskoi rakennutti Moskovan Kremlin vahvan valkokivimuurin vuosina '
      + '1366–1368. Ivan III puratti sen ja rakennutti italialaisten arkkitehtien johdolla '
      + 'nykyiset punatiilimuurit vuosina 1485–1495.',
    lahde: 'en-Wikipedia "Moscow Kremlin", valkokivinen Kreml (tarkistettu 21.9.2026).',
    kuva: 'ihme-valkokivinen-kreml-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Moscow_Kremlin',
  })],
  UKR: [kohde({
    id: 'kymmenyskirkko', nimi: 'Kiovan Kymmenyskirkko',
    nimio: 'Kymmenyskirkko',
    nappi: 'Kiovan Venäjän ensimmäinen kivikirkko',
    laudat: { maailmankartta: { x: 6850.6, y: 1370.2 }, europe: { x: 797.1, y: 566.6 } },
    teksti: 'Vladimir Suuri rakennutti Kymmenyskirkon vuosina 989–996 Kiovan Venäjän '
      + 'ensimmäiseksi kivikirkoksi ja ruhtinaiden mausoleumiksi. Se romahti Batu-kaanin '
      + 'piirityksessä joulukuussa 1240, kun asukkaat pakenivat sinne turvaan.',
    lahde: 'en-Wikipedia "Church of the Tithes", johdanto ja vuoden 1240 tuho (tarkistettu 21.9.2026).',
    kuva: 'ihme-kymmenyskirkko-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Church_of_the_Tithes',
  })],
  CYP: [
    kohde({
      id: 'salamis', nimi: 'Antiikin Salamis',
      nappi: 'Kyproksen suurin roomalaiskaupunki ennen maanjäristyksiä',
      // Pieni läntinen asettelusiirto jättää Kyproksen keskiosan nimiöryppäälle vapaat kyljet.
      laudat: { maailmankartta: { x: 6962.4, y: 1988.4 }, europe: { x: 861.5, y: 968.2 } },
      teksti: 'Salamis oli antiikin Kyproksen suurin ja vaurain kaupunki. Maanjäristykset '
        + 'vuosina 332 ja 342 tasoittivat suuren osan kaupungista, ja arabien hyökkäykset '
        + '600-luvulla johtivat lopulliseen hylkäämiseen.',
      lahde: 'en-Wikipedia "Salamis, Cyprus", historia ja tuho (tarkistettu 21.9.2026).',
      kuva: 'ihme-salamis-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Salamis,_Cyprus',
    }),
    kohde({
      id: 'kition', nimi: 'Antiikin Kition',
      nappi: 'Foinikialainen satama ja Astarten pyhäkkökaupunki',
      laudat: { maailmankartta: { x: 6954.4, y: 1998.6 }, europe: { x: 857.0, y: 975.3 } },
      teksti: 'Kition oli foinikialainen satamakaupunki ja Astarte-jumalattaren '
        + 'palvontakeskus 800-luvulta eaa. Maanjäristykset 300-luvulla ja pitkä '
        + 'kivenryöstö hävittivät kaupungin lähes kokonaan nykyisen Larnakan alle.',
      lahde: 'en-Wikipedia "Kition", johdanto ja historia (tarkistettu 21.9.2026).',
      kuva: 'ihme-kition-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Kition',
    }),
    rappeutunutKohde({
      id: 'varosha-famagusta', nimi: 'Varosha', nimio: 'Varosha',
      nappi: 'Famagustan lomakaupunginosa 1960–70-lukujen kulta-aikanaan',
      // Siirretty 2/-2 lautayksikköä (n. 6 km koilliseen, yhä Famagustan
      // alueella) alkuperäisestä tarkasta koordinaatista (6965,0/1991,0):
      // se limittyi CYP-ryppään muiden nimiöiden kanssa (nimiolimitys.test.mjs,
      // tools/tarkista-nimiolimitys.mjs CYP).
      laudat: { maailmankartta: { x: 6967.0, y: 1989.0 }, europe: { x: 864.2, y: 968.6 } },
      teksti: 'Varosha oli 1960- ja 1970-luvun alun Famagustan vilkas rantalomakaupunginosa, '
        + 'yksi Itä-Välimeren suosituimmista matkailukohteista korkeine hotelleineen. Alue '
        + 'suljettiin asukkailta elokuussa 1974 eikä sitä ole avattu asumiseen sen jälkeen '
        + '— osa siitä avattiin rajoitetusti vierailijoille vasta 2020.',
      lahde: 'en-Wikipedia "Varosha, Famagusta" (tarkistettu 28.9.2026).',
      kuva: {
        tiedosto: 'Cyprus - Famagusta Varosha 07.JPG',
        selite: 'Varoshan hylättyjä rantahotelleja nykyään.',
        lahde: 'Dickelbers, Wikimedia Commons (CC BY-SA 3.0)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cyprus_-_Famagusta_Varosha_07.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      ihmeKuva: 'ihme-cyp-varosha-famagusta-loistoaika.jpg',
      ihmeSelite: 'Varosha kuvattuna 1960–70-lukujen lomakulta-aikanaan, ennen vuoden 1974 sulkemista.',
      url: 'https://en.wikipedia.org/wiki/Varosha,_Famagusta',
    }),
  ],
  MLT: [
    kohde({
      id: 'mdinan-vanha-katedraali', nimi: 'Mdinan vanha normannikatedraali',
      nimio: 'Mdina',
      nappi: 'Keskiaikainen katedraali ennen vuoden 1693 maanjäristystä',
      laudat: { maailmankartta: { x: 6313.4, y: 1961.8 }, europe: { x: 487.7, y: 949.8 } },
      teksti: 'Mdinan normanniaikainen katedraali rakennettiin 1200-luvulla. Sisilian '
        + 'maanjäristys vaurioitti sitä pahoin vuonna 1693, minkä jälkeen se purettiin ja '
        + 'korvattiin vuosina 1696–1705 nykyisellä barokkikatedraalilla.',
      lahde: 'en-Wikipedia "St. Paul’s Cathedral, Mdina", vanha katedraali (tarkistettu 21.9.2026).',
      kuva: 'ihme-mdinan-vanha-katedraali-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/St._Paul%27s_Cathedral,_Mdina',
    }),
    rappeutunutKohde({
      id: 'royal-opera-house-valletta', nimi: 'Vallettan Royal Opera House', nimio: 'Royal Opera House',
      nappi: 'Vallettan oopperatalo ennen vuoden 1942 pommitusta',
      laudat: { maailmankartta: { x: 6317.1, y: 1961.4 }, europe: { x: 489.9, y: 949.5 } },
      teksti: 'Arkkitehti Edward Middleton Barryn suunnittelema Royal Opera House valmistui '
        + 'Vallettaan 1866 ja oli kaupungin arkkitehtoninen ylpeys. Saksalainen pommi-isku '
        + 'tuhosi teatterin 7.4.1942, ja rauniot seisoivat vuosikymmeniä ennen kuin Renzo '
        + 'Piano muotoili ne avoimeksi ulkoilmateatteriksi, Pjazza Teatru Rjaliksi (2013).',
      lahde: 'en-Wikipedia "Royal Opera House, Valletta" (tarkistettu 28.9.2026).',
      kuva: {
        tiedosto: 'Renzo Piano Pjazza Teatru Rjal.jpeg',
        selite: 'Pjazza Teatru Rjal nykyään: alkuperäiset pylväät osana avointa teatteria.',
        lahde: 'Continentaleurope, Wikimedia Commons (CC BY-SA 4.0)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Renzo_Piano_Pjazza_Teatru_Rjal.jpeg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      ihmeKuva: 'ihme-mlt-royal-opera-house-valletta-loistoaika.jpg',
      ihmeSelite: 'Royal Opera House kuvattuna toimivana oopperatalona ennen vuoden 1942 pommitusta.',
      url: 'https://en.wikipedia.org/wiki/Royal_Opera_House,_Valletta',
    }),
  ],
  BIH: [
    kohde({
      id: 'mile-kruunajaiskirkko', nimi: 'Milen kruunajaiskirkko',
      nimio: 'Mile',
      nappi: 'Bosnian kuninkaiden kruunajais- ja hautauskirkko',
      // Pieni eteläinen asettelusiirto jättää Visokon ympäristön vanhoille nimiöille vapaat kyljet.
      laudat: { maailmankartta: { x: 6437.3, y: 1643.1 }, europe: { x: 559.1, y: 736.6 } },
      teksti: 'Milen kirkko Arnautovićissa rakennettiin 1300-luvulla Bosnian kuninkaiden '
        + 'kruunajais- ja hautauskirkoksi. Tvrtko I kruunattiin siellä ensimmäiseksi Bosnian '
        + 'kuninkaaksi vuonna 1377. Kirkko raunioitui valtakunnan kukistumisen jälkeen.',
      lahde: 'en-Wikipedia "Mile, Visoko" ja Bosnian kansallismonumenttien komissio (tarkistettu 21.9.2026).',
      kuva: 'ihme-mile-kruunajaiskirkko-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Mile,_Visoko',
    }),
    rappeutunutKohde({
      id: 'bobovacin-kuninkaanlinna', nimi: 'Bobovacin kuninkaanlinna', nimio: 'Bobovac',
      nappi: 'Keskiajan Bosnian kuninkaiden linnoitettu pääkaupunki',
      // Asettelusiirto Varešin suuntaan jättää Visokon/Sarajevon täkypisteille (Pyramidihuijaus,
      // Sarajevon haggada) nimiöille vapaat kyljet.
      laudat: { maailmankartta: { x: 6462.0, y: 1628.0 }, europe: { x: 572.0, y: 726.0 } },
      teksti: 'Bobovac oli keskiajan Bosnian kuningaskunnan linnoitettu pääkaupunki '
        + '1300-luvun puolivälistä lähtien — siellä säilytettiin kruunua ja useita kuninkaita '
        + 'haudattiin sinne. Osmanit valtasivat ja hävittivät linnan kolmen päivän '
        + 'piirityksen jälkeen 21.5.1463, kun viimeinen kuningas Stjepan Tomašević oli '
        + 'juuri paennut Jajceen. Kivijalat ja muurinpohjat ovat yhä näkyvissä rinteellä.',
      lahde: 'en-Wikipedia "Bobovac" (tarkistettu 28.9.2026).',
      kuva: {
        tiedosto: 'Bobovac 0352.jpg',
        selite: 'Bobovacin kuninkaanlinnan säilyneitä muurinpohjia nykyään.',
        lahde: 'Badener, Wikimedia Commons (CC BY 3.0)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bobovac_0352.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
      ihmeKuva: 'ihme-bih-bobovacin-kuninkaanlinna-loistoaika.jpg',
      ihmeSelite: 'Bobovac kuvattuna Bosnian kuninkaiden linnoitettuna pääkaupunkina n. 1440–1460.',
      url: 'https://en.wikipedia.org/wiki/Bobovac',
    }),
  ],
  BLR: [kohde({
    id: 'vanha-minsk', nimi: 'Vanha Minsk',
    nimio: 'Vanha Minsk',
    nappi: 'Minskin vanhakaupunki ennen toisen maailmansodan tuhoa',
    laudat: { maailmankartta: { x: 6751.8, y: 1216.2 }, europe: { x: 740.2, y: 475.9 } },
    teksti: 'Ennen toista maailmansotaa Minsk oli tiivis, monikerroksinen itäeurooppalainen '
      + 'kaupunki kivikatuineen ja synagogineen. Saksan Luftwaffe pommitti kaupunkia '
      + '24.6.1941 kolmessa aallossa, ja sodan loppuun mennessä 80–90 % rakennuskannasta '
      + 'oli raunioina. Stalin määräsi kaupungin rakennettavaksi täysin uudelleen — vanhaa '
      + 'kaupunkia ei palautettu ennalleen.',
    lahde: 'en-Wikipedia "Minsk", toinen maailmansota ja jälleenrakennus (tarkistettu 28.9.2026).',
    kuva: 'ihme-vanha-minsk-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Minsk',
  })],
  SRB: [rappeutunutKohde({
    id: 'smederevon-linnoitus', nimi: 'Smederevon linnoitus', nimio: 'Smederevo',
    nappi: 'Serbian despotaatin Tonavan-rantalinnoitus 1440-luvulla',
    laudat: { maailmankartta: { x: 6531.1, y: 1615.6 }, europe: { x: 613.1, y: 719.0 } },
    teksti: 'Despootti Đurađ Branković rakennutti Smederevon linnoituksen Tonavan rannalle '
      + 'uudeksi pääkaupungikseen 1420-luvun lopulla; laajempi 25 tornin ulkomuuri '
      + 'valmistui vasta 1440-luvulla. Toisen maailmansodan aikana saksalaisten sinne '
      + 'varastoima ammus ja polttoaine räjähti 5.6.1941, tappaen tuhansia ja tuhoten '
      + 'suuren osan linnoituksesta. Muurit ja tornit seisovat yhä, osin sortuneina.',
    lahde: 'en-Wikipedia "Smederevo Fortress" ja "Smederevo Fortress explosion", UNESCOn '
      + 'kohde-esitys (tarkistettu 28.9.2026).',
    kuva: {
      tiedosto: 'Smederevo fortress (Smederevska tvrđava) - pano.JPG',
      selite: 'Smederevon linnoitus Tonavan rannalla nykyään.',
      lahde: 'Pudelek (Marcin Szala), Wikimedia Commons (CC BY-SA 3.0 RS)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Smederevo_fortress_(Smederevska_tvr%C4%91ava)_-_pano.JPG',
    },
    ihmeKuva: 'ihme-srb-smederevon-linnoitus-loistoaika.jpg',
    ihmeSelite: 'Smederevon linnoitus kuvattuna valmistuneena Pienenä kaupunkina ja despotin hovina 1430-luvulla.',
    url: 'https://en.wikipedia.org/wiki/Smederevo_Fortress',
  })],
  ALB: [rappeutunutKohde({
    id: 'butrint', nimi: 'Butrint', nimio: 'Butrint',
    nappi: 'Antiikin satamakaupunki roomalais-kreikkalaisella kulta-ajallaan',
    laudat: { maailmankartta: { x: 6500.8, y: 1812.7 }, europe: { x: 595.6, y: 848.2 } },
    teksti: 'Butrint (antiikin Buthrotum) oli kreikkalaisten perustama, roomalaisten '
      + 'laajentama satamakaupunki Välimeren kauppareitillä — teatteri, kylpylät ja '
      + 'foorumi todistavat vuosisatoja kestäneestä vauraudesta. Keskiajan lopulla '
      + 'ympäröivä maasto muuttui soistuvaksi, ja asukkaat hylkäsivät kaupungin '
      + 'vähitellen; Unesco liitti sen maailmanperintöluetteloon 1992.',
    lahde: 'en-Wikipedia "Butrint" (tarkistettu 28.9.2026).',
    kuva: {
      tiedosto: 'Amphitheatre of Butrint 2009.jpg',
      selite: 'Butrintin antiikin teatterin raunioita nykyään.',
      lahde: 'Geoff Wong, Wikimedia Commons (CC BY 2.0)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Amphitheatre_of_Butrint_2009.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    ihmeKuva: 'ihme-alb-butrint-loistoaika.jpg',
    ihmeSelite: 'Butrint kuvattuna vilkkaana roomalais-kreikkalaisena satamakaupunkina n. 100–300 jaa.',
    url: 'https://en.wikipedia.org/wiki/Butrint',
  })],
  MKD: [rappeutunutKohde({
    id: 'skopjen-vanha-rautatieasema', nimi: 'Skopjen vanha rautatieasema', nimio: 'Vanha asema',
    nappi: 'Skopjen keskusasema hetkeä ennen vuoden 1963 maanjäristystä',
    laudat: { maailmankartta: { x: 6547.5, y: 1723.7 }, europe: { x: 622.6, y: 789.1 } },
    teksti: 'Skopjen keskusasema oli 1900-luvun puolivälissä Jugoslavian vilkkaimpia '
      + 'rautatieasemia, tyylikäs kivirakennus kellotorneineen. Maanjäristys iski '
      + 'kaupunkiin 26.7.1963 kello 5.17, tappaen yli tuhat ihmistä ja tuhoten suuren '
      + 'osan kaupungista; aseman kello pysähtyi täsmälleen järistyksen hetkeen. '
      + 'Osittain sortunut rakennus toimii nykyään kaupunginmuseona.',
    lahde: 'en-Wikipedia "1963 Skopje earthquake" ja "Museum of the City of Skopje" '
      + '(tarkistettu 28.9.2026).',
    kuva: {
      tiedosto: 'Old Railway station Skopje Earthquake 1963 Macedonia.JPG',
      selite: 'Skopjen vanhan rautatieaseman julkisivu, kello yhä pysähtyneenä 5.17:ään.',
      lahde: 'Furmum, Wikimedia Commons (PD)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Old_Railway_station_Skopje_Earthquake_1963_Macedonia.JPG',
    },
    ihmeKuva: 'ihme-mkd-skopjen-vanha-rautatieasema-loistoaika.jpg',
    ihmeSelite: 'Skopjen keskusasema kuvattuna vilkkaana rautatieasemana 1950-luvulla, ennen vuoden 1963 maanjäristystä.',
    url: 'https://en.wikipedia.org/wiki/1963_Skopje_earthquake',
  })],
  MNE: [rappeutunutKohde({
    id: 'zabljak-crnojevica', nimi: 'Žabljak Crnojevića', nimio: 'Žabljak',
    nappi: 'Zetan ruhtinaskunnan linnoitettu pääkaupunki Skadarjärvellä',
    laudat: { maailmankartta: { x: 6470.4, y: 1712.6 }, europe: { x: 578.2, y: 781.8 } },
    teksti: 'Žabljak Crnojevića oli Zetan ruhtinaskunnan linnoitettu pääkaupunki '
      + 'Skadarjärven rannalla, Stefan ja Ivan Crnojevićin hallintokeskus. Osmanit '
      + 'valtasivat sen Shkodran piirityksen yhteydessä 1478, ja pääkaupunki siirtyi '
      + 'lopulta Cetinjeen. Alue palasi Montenegron hallintaan vasta 1878 Berliinin '
      + 'kongressissa, 400 vuotta myöhemmin. Rauniot seisovat yhä järven rannalla.',
    lahde: 'en-Wikipedia "Žabljak Crnojevića" (tarkistettu 28.9.2026).',
    kuva: {
      tiedosto: 'Žabljak Crnojevića - Golubovci - panoramio.jpg',
      selite: 'Žabljak Crnojevićan raunioita Skadarjärven rannalla nykyään.',
      lahde: 'Zoran Kurelić Rabko, Wikimedia Commons (CC BY-SA 3.0)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C5%BDabljak_Crnojevi%C4%87a_-_Golubovci_-_panoramio.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    ihmeKuva: 'ihme-mne-zabljak-crnojevica-loistoaika.jpg',
    ihmeSelite: 'Žabljak Crnojevića kuvattuna Zetan linnoitettuna pääkaupunkina 1466–1478.',
    url: 'https://en.wikipedia.org/wiki/%C5%BDabljak_Crnojevi%C4%87a',
  })],
  MDA: [rappeutunutKohde({
    id: 'orheiul-vechi', nimi: 'Orheiul Vechi', nimio: 'Orheiul Vechi',
    nappi: 'Kalkkikivijyrkänteen luolaluostari ja keskiaikainen linnakaupunki',
    laudat: { maailmankartta: { x: 6799.8, y: 1503.3 }, europe: { x: 767.9, y: 648.0 } },
    teksti: 'Orheiul Vechi (”Vanha Orhei”) on kalkkikivijyrkänteelle Răutin joen mutkaan '
      + 'kerrostunut muinaismuistoalue: geto-daakialainen linnoitus, keskiaikainen '
      + 'Moldovan kaupunki, Kultaisen ordan asutus ja 1400-luvulla kallioon louhitut '
      + 'luolaluostarit, joihin munkit vetäytyivät turvaan Krimin tataarien '
      + 'ryöstöretkiltä. Osa kaupungista hylättiin vuosisatojen kuluessa.',
    lahde: 'en-Wikipedia "Old Orhei" (tarkistettu 28.9.2026).',
    kuva: {
      tiedosto: 'Orhei Vechi 08.JPG',
      selite: 'Orheiul Vechin luolaluostari ja kalkkikivijyrkänne nykyään.',
      lahde: 'Julian Nyča, Wikimedia Commons (CC BY-SA 4.0)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Orhei_Vechi_08.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    ihmeKuva: 'ihme-mda-orheiul-vechi-loistoaika.jpg',
    ihmeSelite: 'Orheiul Vechi kuvattuna keskiaikaisena linnakaupunkina ja luolaluostarina n. 1400-luvulla.',
    url: 'https://en.wikipedia.org/wiki/Old_Orhei',
  })],
  GBR: [
    ihmeKohde({
      id: 'old-tolbooth',
      nimi: 'Old Tolbooth',
      kysymykset: ['Minkä kirjailijan kartanossa Old Tolboothin ovi on?', 'Mikä merkitsee Old Tolboothin sisäänkäynnin paikan?'],
      korostukset: ['Walter Scott|Walter Scott', 'Maria Stuart|Maria Stuart', 'Abbotsford|Abbotsfordiin'],
      nappi: 'Vankila, jonka ovi päätyi kirjailijan kartanoon',
      laudat: { maailmankartta: { x: 5727.0, y: 1121.5 }, europe: { x: 149.9, y: 422.1 } },
      teksti: 'Old Tolbooth oli Edinburghin High Streetillä St Gilesin katedraalin luoteiskulmassa seissyt '
        + 'raatihuone ja vankila. Kuningas Robert II myönsi paikasta peruskirjan 1386. Parlamentti '
        + 'kokoontui siellä ensimmäisen kerran 27. marraskuuta 1438, ja Maria Stuart määräsi rakennuksen '
        + 'purettavaksi ja rakennettavaksi uudelleen 1562. Parlamentti muutti omaan taloonsa 1639, ja '
        + 'rakennuksesta tuli ennen kaikkea vankila; vuodesta 1785 teloitukset toimitettiin sen '
        + 'laajennuksen katolla. Rakennus purettiin 1817, ja Walter Scott sai sen rautaoven avaimineen '
        + 'kartanoonsa Abbotsfordiin. Scott kirjoitti vankilasta romaanin The Heart of Midlothian (1818), '
        + 'ja Heart of Midlothian -nimiset kivet merkitsevät sisäänkäynnin paikan.',
      lahde: 'en-Wikipedia "Old Tolbooth", johdanto ja osiot historiasta, purosta ja Walter Scottista '
        + '(tarkistettu 31.10.2026).',
      kuva: 'ihme-old-tolbooth-loistoaika.jpg',
      lyhyt: 'Raatihuone ja vankila nojaavat St Gilesin katedraalin kulmaan High Streetillä; vajaat '
        + 'kolmekymmentä vuotta myöhemmin rakennus puretaan.',
      selite: 'Noin vuonna 1790 High Streetin kulkijat ohittavat St Gilesin katedraalin kulmassa seisovan Old '
        + 'Tolboothin, joka on kiinni Luckenbooths-nimisessä rakennusrivissä. Sisällä toimivat vankila ja '
        + 'kaupungin hallinto, ja viereisissä kojuissa käydään kauppaa. Parlamentti on jo 1639 muuttanut '
        + 'omaan taloonsa, ja kapealla kadulla kärryt kolisevat raatihuoneen ohi. Valtuusto muuttaa pois '
        + '1811, rakennus puretaan 1817, ja sen ovi päätyy Walter Scottin kartanoon.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1790). Faktat: '
        + 'en-Wikipedia "Old Tolbooth", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Old_Tolbooth',
    }),
    ihmeKohde({
      id: 'greenwich-palatsi',
      nimi: 'Greenwichin palatsi',
      nimio: 'Placentia',
      kysymykset: ['Ketkä kolme hallitsijaa syntyivät Greenwichin palatsissa?', 'Mikä palatsin aikainen rakennus on yhä pystyssä?'],
      korostukset: ['Humphrey|Humphrey', 'Queen\'s House|Queen\'s House'],
      nappi: 'Palatsi, jossa syntyivät Henrik VIII ja Elisabet I',
      laudat: { maailmankartta: { x: 5833.1, y: 1325.1 }, europe: { x: 211.1, y: 539.6 } },
      teksti: 'Greenwichin palatsi, tunnetummin Placentia, oli Tudorien kuninkaallinen palatsi Thamesin '
        + 'rannalla. Humphrey, Gloucesterin herttua, rakennutti sen 1443 nimellä Bella Court, ja Margareta '
        + 'Anjoulainen antoi sille nimen Placentia. Henrik VII rakennutti palatsin uudelleen 1498–1504. '
        + 'Täällä syntyivät Henrik VIII (1491), Maria I (1516) ja Elisabet I (1533), ja Henrik VIII meni '
        + 'täällä naimisiin Anna Clevesiläisen kanssa 1540. Sisällissodassa palatsi rapistui ja toimi '
        + 'keksitehtaana ja sotavankileirinä. Kaarle II päätti 1660 rakentaa sen uudelleen, mutta vain '
        + 'itäsiipi valmistui, eikä sitä koskaan asuttu; suurin osa palatsista purettiin. Palatsin alueelle '
        + 'Inigo Jonesin suunnittelema Queen\'s House valmistui 1635, ja se on yhä pystyssä.',
      lahde: 'en-Wikipedia "Palace of Placentia", johdanto ja osiot "History" ja "Archaeology"; "Queen\'s '
        + 'House", osio "Early history" (tarkistettu 31.10.2026).',
      kuva: 'ihme-greenwich-palatsi-loistoaika.jpg',
      lyhyt: 'Hovin väki täyttää Thamesin rannan palatsin pihat Henrik VIII:n aikana; reilut sata vuotta '
        + 'myöhemmin Kaarle II päättää rakentaa palatsin uudelleen, ja suurin osa puretaan.',
      selite: 'Noin vuonna 1530 palvelijat kantavat ruokaa Henrik VIII:n palatsin saleihin Thamesin rannalla, '
        + 'ja hovin väki täyttää pihat. Kuningas ja hänen tyttärensä Maria ovat syntyneet täällä; Elisabet '
        + 'syntyy kolmen vuoden kuluttua. Thamesilta kuuluvat soutajien huudot, kun kuninkaallinen proomu '
        + 'laskee laituriin. Sisällissodan aikana palatsi rapistuu, Kaarle II käskee uuden rakennuksen, ja '
        + 'suurin osa vanhasta palatsista puretaan; tontti pysyy tyhjänä vuoteen 1694.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1530). Faktat: '
        + 'en-Wikipedia "Palace of Placentia", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Palace_of_Placentia',
    }),
    ihmeKohde({
      id: 'newgate',
      nimi: 'Newgaten vankila',
      nimio: 'Newgate',
      kysymykset: ['Milloin Britannian viimeinen julkinen hirtys tehtiin Newgatessa?', 'Mikä rakennus seisoo vankilan paikalla?'],
      korostukset: ['George Dance nuorempi|George Dance nuorempi', 'Tyburn|Tyburnista'],
      nappi: 'Vankila, jonka paikalle nousi Old Bailey',
      laudat: { maailmankartta: { x: 5829.9, y: 1323.6 }, europe: { x: 209.2, y: 538.7 } },
      teksti: 'Newgaten vankila oli Lontoon vankila, joka perustettiin 1188 Henrik II:n aikana ja toimi vuoteen '
        + '1902. Nykyisen kivilinnan suunnitteli George Dance nuorempi, ja Gordon-mellakoitsijat tuhosivat '
        + 'lähes valmiin rakennuksen 1780. Hirttolava siirrettiin Tyburnista Newgateen 1783, ja vuonna 1807 '
        + 'noin 40 000 hengen yleisö kerääntyi seuraamaan hirtystä; väkijoukon ryntäys tappoi kymmeniä. '
        + 'Viimeinen julkinen hirtys Britanniassa tehtiin täällä 26. toukokuuta 1868, minkä jälkeen '
        + 'teloitukset siirtyivät muurien sisälle. Vankila oli käytössä isoisän käydessä 1873, ja Dickens '
        + 'sijoitti sen useisiin romaaneihinsa. Se purettiin 1902–1904, ja Old Bailey -oikeustalo on '
        + 'rakennettu suureen osaan sen paikkaa.',
      lahde: 'en-Wikipedia "Newgate Prison", johdanto sekä osiot "History", "Executions" ja "Closure" '
        + '(tarkistettu 31.10.2026).',
      kuva: 'ihme-newgate-loistoaika.jpg',
      lyhyt: 'Kulkija kiirehtii Newgaten korkean kivimuurin ohi eikä nosta katsettaan, ja Dickensin kuvaama '
        + 'vankila tuijottaa takaisin; noin kolmekymmentä vuotta myöhemmin se puretaan.',
      selite: 'Vuonna 1873 lontoolainen kulkee Newgaten korkean kivimuurin ohi eikä nosta katsettaan, sillä '
        + 'vankila on hänelle yhtä arkinen kuin leipurin ikkuna. Dickensin kirjojen lukijat tuntevat muurit '
        + 'jo nimeltä, ja julkiset hirtykset on lopetettu viisi vuotta aiemmin. Vankila on ollut paikallaan '
        + 'lähes seitsemän vuosisataa, ja muurin takaa kuuluu avainten kalina. Vuonna 1902 vankila '
        + 'suljetaan, se puretaan 1904 mennessä, ja suuri osa paikasta jää Old Baileylle.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1873, isoisän matkavuosi). '
        + 'Faktat: en-Wikipedia "Newgate Prison", osiot "History", "Executions" ja "Closure", tarkistettu '
        + '31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Newgate_Prison',
    }),
    ihmeKohde({
      id: 'euston-arch',
      nimi: 'Euston Arch',
      kysymykset: ['Mistä Euston Archin kivet löytyivät?', 'Paljonko portin purkaminen ja siirtäminen olisivat maksaneet?'],
      korostukset: ['rautatieyhtiö|rautatieyhtiölle', 'Lea-joki|Lea-joen'],
      nappi: 'Portti, joka löytyi joen pohjasta',
      laudat: { maailmankartta: { x: 5828.9, y: 1323.1 }, europe: { x: 208.6, y: 538.4 } },
      teksti: 'Euston Arch oli Lontoon Euston-aseman 21 metriä korkea doorilainen portti, jonka Philip Hardwick '
        + 'suunnitteli Lontoon ja Birminghamin rautatieyhtiölle 1837. Neljän pylvään halkaisija oli 2,6 '
        + 'metriä, hiekkakivi tuotiin Yorkshirestä ja hinnaksi tuli 35 000 puntaa. Yhtiö lisäsi siihen 1870 '
        + 'kultakirjaimin nimen Euston, joten isoisä näki sen 1873. Vuoden 1851 näyttelyopas piti porttia '
        + 'jättimäisenä ja varsin älyttömänä. Vuonna 1961 liikenneministeri Ernest Marples arvioi '
        + 'purkamisen maksavan 12 000 ja siirtämisen 190 000 puntaa, ja pääministeri Harold Macmillan '
        + 'hylkäsi pelastajien esityksen. Purku alkoi käsin saman vuoden lopulla. Kivet päätyivät Lea-joen '
        + 'pohjaan, ja Dan Cruickshank löysi vähintään 60 prosenttia niistä 1994.',
      lahde: 'en-Wikipedia "Euston Arch", johdanto sekä osiot "Architecture and construction", "Removal" ja '
        + '"Remains" (tarkistettu 31.10.2026).',
      kuva: 'ihme-euston-arch-loistoaika.jpg',
      lyhyt: 'Matkustaja pysähtyy neljän doorilaisen pylvään eteen ja lukee kultakirjaimin kirjoitetun nimen '
        + 'Euston; lähes yhdeksänkymmentä vuotta myöhemmin portti puretaan.',
      selite: 'Vuonna 1873 matkustaja jää seisomaan Eustonin portin eteen, nostaa katseensa neljän doorilaisen '
        + 'pylvään yli ja lukee kultakirjaimin kirjoitetun nimen Euston. Portin takana on asema, jonne '
        + 'junat saapuvat Birminghamista, ja jokainen sinne matkaava kulkee muistomerkin ohi. Höyryveturin '
        + 'vihellys kaikuu dooristen pylväiden välistä. Vuonna 1961 portti puretaan käsin ilman räjähteitä, '
        + 'ja sen kivet jäävät joenpohjaan, kunnes ne löydetään 1994.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1873, isoisän matkavuosi). '
        + 'Faktat: en-Wikipedia "Euston Arch", osiot "Architecture and construction", "Removal" ja '
        + '"Remains", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Euston_Arch',
    }),
    ihmeKohde({
      id: 'westminster-vanha',
      nimi: 'Vanha Westminsterin palatsi',
      nimio: 'Vanha Westminster',
      kysymykset: ['Mikä sytytti vanhan parlamenttipalatsin palamaan 1834?', 'Mikä osa palatsista on yhä pystyssä?'],
      korostukset: ['Westminster Hall|Westminster Hallin', 'lovipuu|lovipuiden'],
      nappi: 'Parlamentti, joka paloi velkakeppien takia',
      laudat: { maailmankartta: { x: 5829.2, y: 1324.4 }, europe: { x: 208.8, y: 539.2 } },
      teksti: 'Vanha Westminsterin palatsi oli Englannin kuninkaiden pääasunto vuoteen 1512, ja parlamentti '
        + 'kokoontui siellä jo 1200-luvulta. Edvard Tunnustaja rakennutti sen noin 1045–1050, ja vanhin '
        + 'säilynyt osa, Westminster Hall, on Vilhelm II:n ajalta. Lokakuun 16. päivänä 1834 ylikuumentunut '
        + 'uuni, jolla poltettiin valtiokonttorin lovipuiden eli kuittikeppien kasaa, sytytti Ylähuoneen '
        + 'salin. Tuli tuhosi molemmat kamarit ja suurimman osan palatsista, mutta palomiehet ja tuulen '
        + 'kääntyminen pelastivat Westminster Hallin. Maalari J. M. W. Turner katseli paloa ja maalasi '
        + 'siitä useita tauluja. Tilalle nousi Charles Barryn suunnittelema uusi palatsi, jonka '
        + 'rakennustyöt alkoivat 1840 ja kestivät noin 30 vuotta; sen kellotornia kutsutaan Big Beniksi.',
      lahde: 'en-Wikipedia "Old Palace of Westminster" (johdanto, "History") ja "Palace of Westminster", osio '
        + '"History > Fire and reconstruction" (tarkistettu 31.10.2026).',
      kuva: 'ihme-westminster-vanha-loistoaika.jpg',
      lyhyt: 'Valtiokonttorin kirjuri leikkaa lovia kuittikeppiin Westminster Hallin varjossa; reilut '
        + 'kolmekymmentä vuotta myöhemmin sen kaltaisten keppien kasa sytyttää koko palatsin.',
      selite: 'Noin vuonna 1800 valtiokonttorin kirjuri istuu palatsin kyljessä ja leikkaa tarkkoja lovia '
        + 'puiseen kuittikeppiin, joka kertoo, kuka on maksanut kuninkaalle ja paljonko. Samassa palatsissa '
        + 'kokoontuvat parlamentti ja oikeusistuimet, ja käytävillä tungeksivat asianajajat, kirjurit ja '
        + 'asiaansa odottavat. Veitsi narskuu kuivassa puussa, ja lastut putoavat kirjurin pöydän alle. '
        + 'Lokakuussa 1834 vanhojen keppien kasa poltetaan uunissa, uuni ylikuumenee, ja palo vie '
        + 'parlamentin kamarit; Westminster Hall pelastuu, ja sen viereen nousee uusi palatsi.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1800). Faktat: '
        + 'en-Wikipedia "Old Palace of Westminster" ja "Palace of Westminster" (History > Fire and '
        + 'reconstruction), tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Old_Palace_of_Westminster',
    }),
    ihmeKohde({
      id: 'whitehall',
      nimi: 'Whitehallin palatsi',
      nimio: 'Whitehall',
      kysymykset: ['Miten Euroopan suurin palatsi tuhoutui?', 'Mikä palatsista on yhä pystyssä?'],
      korostukset: ['Inigo Jones|Inigo Jonesin', 'Banqueting House|Banqueting House'],
      nappi: 'Palatsi, jonka tuhosi märkä pyykki',
      laudat: { maailmankartta: { x: 5829.2, y: 1324.2 }, europe: { x: 208.8, y: 539.1 } },
      teksti: 'Whitehallin palatsi oli Englannin kuninkaiden pääasunto Lontoossa vuodesta 1530 vuoteen 1698. '
        + 'Henrik VIII otti paikan haltuunsa 1530, kun kardinaali Wolsey oli menettänyt asemansa. '
        + 'Palatsissa oli yli 1 500 huonetta ja se peitti suurimmillaan noin 23 hehtaaria, joten aikoinaan '
        + 'se oli Euroopan suurin. Juhlasali Banqueting House valmistui 1622 Inigo Jonesin suunnittelemana, '
        + 'ja sen edessä mestattiin Kaarle I vuonna 1649. Tammikuun 4. päivänä 1698 palvelija ripusti '
        + 'märkää pyykkiä hiilipannun viereen, ja syttynyt tuli tuhosi noin 15 tunnissa lähes kaikki asuin- '
        + 'ja hallintorakennukset. Vain Banqueting House säilyi, eikä palatsia koskaan rakennettu '
        + 'uudelleen. Paikalla on nykyään valtionhallinnon rakennuksia.',
      lahde: 'en-Wikipedia "Palace of Whitehall", johdanto sekä osiot "History", "Destruction" ja "Present '
        + 'day" (tarkistettu 31.10.2026).',
      kuva: 'ihme-whitehall-loistoaika.jpg',
      lyhyt: 'Hovin pyykkäri kantaa puhtaita liinavaatteita pitkää galleriaa pitkin Kaarle I:n aikaan; reilut '
        + 'kuusikymmentä vuotta myöhemmin palatsin tuhoaa palvelijan kuivattama märkä pyykki.',
      selite: 'Kaarle I:n hovissa noin vuonna 1630 pyykkäri kiirehtii puhtaat liinavaatteet kainalossa pitkää '
        + 'galleriaa pitkin, ohi kirjurien ja vartijoiden, kun toiset palvelijat kantavat pöytiä '
        + 'juhlasaliin. Yli 1 500 huoneen ja pihojen sokkelo on pieni kaupunki, jossa jokaisella on '
        + 'tehtävänsä ja jokainen tuntee hovin juonien hinnan. Pyykkäri ei vilkaise seiniä, sillä hänelle '
        + 'ne ovat työpaikka eivätkä ihme. Tammikuun 4. päivänä 1698 palvelija ripustaa märkää pyykkiä '
        + 'hiilipannun viereen, ja noin 15 tuntia kestävä palo vie lähes koko palatsin; jäljelle jää vain '
        + 'Banqueting House, ainoa osa, jonka isoisäkin vielä näki.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1630). Faktat: '
        + 'en-Wikipedia "Palace of Whitehall", osiot "History" ja "Destruction", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Palace_of_Whitehall',
    }),
  ],
  TUR: [
    ihmeKohde({
      id: 'pyhat-apostolit',
      nimi: 'Pyhien apostolien kirkko',
      nimio: 'Apostolien kirkko',
      kysymykset: ['Minkä kuuluisan kirkon esikuva Pyhien apostolien kirkko oli?', 'Mitä kirkon paikalla on nykyään?'],
      korostukset: ['San Marcon basilika|San Marcon basilikan', 'Fatih-moskeija|Fatih-moskeijan'],
      nappi: 'Kirkko, joka oli Venetsian esikuva',
      laudat: { maailmankartta: { x: 6798.3, y: 1762.6 }, europe: { x: 767.0, y: 814.8 } },
      teksti: 'Konstantinus Suuri aloitti Pyhien apostolien kirkon noin 330, mutta kuoli 337 ennen sen '
        + 'valmistumista, ja hänen poikansa Konstantius II hautasi hänet kirkkoon. Justinianus rakennutti '
        + 'paikalle uuden viisikupolisen ristikirkon, joka vihittiin 28. kesäkuuta 550; sen suunnittelivat '
        + 'samat arkkitehdit kuin Hagia Sofian. Venetsian San Marcon basilikan uskotaan saaneen siitä '
        + 'mallinsa. Kirkko oli Bysantin keisarien hautakirkko lähes seitsemän vuosisadan ajan Konstantinus '
        + 'I:stä (337) Konstantinos VIII:aan (1028), ja siellä lepäsivät muun muassa Justinianus ja '
        + 'Theodora. Ristiretkeläiset ryöstivät kirkon ja keisarien haudat 1204. Mehmed II purki '
        + 'rappeutuneen kirkon 1461 ja rakennutti paikalle Fatih-moskeijan; nykyinen moskeija on '
        + '1700-luvulta.',
      lahde: 'en-Wikipedia "Church of the Holy Apostles", johdanto ja osiot "History", "Description" ja '
        + '"Burials"; "Fatih Mosque", osio "History" (tarkistettu 31.10.2026).',
      kuva: 'ihme-pyhat-apostolit-loistoaika.jpg',
      lyhyt: 'Pappi sytyttää kynttilät keisarien sarkofagien edessä viiden kupolin alla, ja hovivirkamiehet '
        + 'seisovat jäykkinä; viisi vuosisataa myöhemmin kirkko puretaan.',
      selite: 'Noin vuonna 950 pappi kulkee viiden kupolin alla kynttilä kädessä keisarien sarkofagien välissä, '
        + 'ja hovivirkamiehet seisovat jäykkinä, koska keisarit ovat täällä kuolemassakin. Ristinmuotoisen '
        + 'kirkon kupolit kohoavat jokaisen siiven ja risteyksen päälle; samaa mallia venetsialaiset '
        + 'kopioivat vuosisadat myöhemmin San Marcon basilikaansa. Pappi ei tiedä, että ristiretkeläiset '
        + 'ryöstävät nämä haudat vielä 1204. Mehmed II purkaa rappeutuneen kirkon noin 1461, ja paikalle '
        + 'nousee Fatih-moskeija.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 950). Faktat: '
        + 'en-Wikipedia "Church of the Holy Apostles", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Church_of_the_Holy_Apostles',
    }),
    ihmeKohde({
      id: 'suuri-palatsi',
      nimi: 'Konstantinopolin suuri palatsi',
      nimio: 'Suuri palatsi',
      kysymykset: ['Mitä palatsille tapahtui neljännessä ristiretkessä 1204?', 'Miksi palatsista on kaivettu esiin alle neljännes?'],
      korostukset: ['Konstantinus Suuri|Konstantinus Suuri', 'neljäs ristiretki|neljännen ristiretken'],
      nappi: 'Keisarien palatsi, jonka päällä on kaupunki',
      laudat: { maailmankartta: { x: 6799.2, y: 1763.3 }, europe: { x: 767.6, y: 815.2 } },
      teksti: 'Konstantinopolin suuri palatsi oli Bysantin keisarien pääasunto yli 700 vuotta, vuoteen 1081 '
        + 'asti. Konstantinus Suuri suunnitteli sen 330, kun hän perusti kaupungin nykyisen Istanbulin '
        + 'paikalle. Palatsi oli paviljonkien sarja kuudella terassilla Hippodromin ja meren välisessä '
        + 'rinteessä, noin 16 hehtaarin alueella; siihen kuuluivat valtaistuinsali, polokenttä ja '
        + 'merenrantapalatsi Bukoleon. Vuonna 1204 neljännen ristiretken sotilaat ryöstivät sen, ja Balduin '
        + 'II myi katoista lyijyn. Keisarit hylkäsivät palatsin 1261 jälkeen, ja Mehmed II löysi sen '
        + 'raunioina 1453. Alueesta on kaivettu esiin alle neljännes, koska suurin osa on moskeijan ja '
        + 'muiden ottomaanikauden rakennusten alla.',
      lahde: 'en-Wikipedia "Great Palace of Constantinople", johdanto sekä osiot "History", "Excavations" ja '
        + '"Description"; "Sultan Ahmed Mosque", osio "History" (tarkistettu 31.10.2026).',
      kuva: 'ihme-suuri-palatsi-loistoaika.jpg',
      lyhyt: 'Keisarin hovin nuoret miehet ajavat ratsain palatsin polokentällä, ja sama palatsi on reilut '
        + 'kaksisataa vuotta myöhemmin ristiretkeläisten ryöstämä.',
      selite: 'Noin vuonna 950 hovin nuoret miehet laukkaavat keisarin palatsin polokentällä, ja käytävä '
        + 'yhdistää palatsin Hippodromin keisarinaitioon, josta kisoja seurataan. Rinteen terasseilla '
        + 'paviljongit nousevat toistensa yläpuolelle meren rantaan asti, ja pääportti Chalke avautuu '
        + 'Augustaion-aukiolle. Ratsastajat näyttävät pieniltä, sillä palatsin mittakaava kuuluu '
        + 'keisarille, ei heille. Vuonna 1204 neljännen ristiretken sotilaat ryöstävät palatsin, 1261 '
        + 'keisarit hylkäävät sen, ja jäljelle jää rinteen täyttävä rauniokenttä, jonka päälle kaupunki '
        + 'rakentuu.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 950). Faktat: '
        + 'en-Wikipedia "Great Palace of Constantinople", osiot "History" ja "Description", tarkistettu '
        + '31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Great_Palace_of_Constantinople',
    }),
  ],
  POL: [
    ihmeKohde({
      id: 'nevski-varsova',
      nimi: 'Aleksanteri Nevskin katedraali',
      nimio: 'Nevskin katedraali',
      kysymykset: ['Miksi Aleksanteri Nevskin katedraali purettiin?', 'Kuinka monta räjäytystä purkuun tarvittiin?'],
      korostukset: ['Leon Benois|Leon Benois\'n', 'kellotorni|kellotorni'],
      nappi: 'Katedraali, jota purettiin kaksi vuotta',
      laudat: { maailmankartta: { x: 6533.8, y: 1291.4 }, europe: { x: 614.6, y: 519.7 } },
      teksti: 'Aleksanteri Nevskin katedraali oli Venäjän keisarikunnan rakennuttama ortodoksinen katedraali '
        + 'Varsovan Saksin aukiolla. Keisari Aleksanteri III hyväksyi Leon Benois\'n suunnitelman '
        + 'tammikuussa 1894, perustuskivi laskettiin 30. elokuuta 1894 ja katedraali vihittiin 20. '
        + 'toukokuuta 1912. Kustannukset nousivat noin 3,1 miljoonaan ruplaan, vaikka arvio oli 900 000. '
        + 'Erillinen kellotorni oli 70 metriä korkea, rakennuksen päällä oli viisi kultakupolia, ja '
        + 'Moskovassa valettiin 14 kelloa. Katedraali suljettiin 1924 ja purettiin 1924–1926, koska se oli '
        + 'Venäjän vallan symboli ja täytti pääaukion; työhön tarvittiin lähes 15 000 hallittua räjäytystä. '
        + 'Marmoria käytettiin uudelleen Varsovan rakennuksissa.',
      lahde: 'en-Wikipedia "Alexander Nevsky Cathedral, Warsaw", johdanto ja osiot "Construction" ja '
        + '"Demolition"; pl-Wikipedia "Sobór św. Aleksandra Newskiego w Warszawie", osiot "Budowa" ja '
        + '"Rozbiórka" (tarkistettu 31.10.2026).',
      kuva: 'ihme-nevski-varsova-loistoaika.jpg',
      lyhyt: 'Vihkiäispäivänä 20. toukokuuta 1912 kellot soivat ja viisi kultakupolia kimaltaa Saksin '
        + 'aukiolla; kaksitoista vuotta myöhemmin rakennus suljetaan ja purku alkaa.',
      selite: 'Toukokuussa 1912 kellot soivat Saksin aukiolla ja viisi kultakupolia kimaltaa auringossa, kun '
        + 'ortodoksiseurakunta kokoontuu vihkiäisjuhlaan. Kellotornin 70 metriä näkyy kauas, ja sisällä '
        + 'jaspispylväät ja mosaiikit vastaavat ulkoa näkyvää loistoa. Kellojen soitto kuuluu Saksin aukion '
        + 'yli. Vuonna 1921 kellotorni puretaan, vuosina 1924–1926 koko rakennus räjäytetään osiin, ja '
        + 'marmori päätyy muihin Varsovan rakennuksiin.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1912). Faktat: en-Wikipedia '
        + '"Alexander Nevsky Cathedral, Warsaw" ja pl-Wikipedia, tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Alexander_Nevsky_Cathedral,_Warsaw',
    }),
    ihmeKohde({
      id: 'suuri-synagoga-varsova',
      nimi: 'Varsovan suuri synagoga',
      nimio: 'Suuri synagoga',
      kysymykset: ['Kuinka monta rukoilijaa Varsovan suureen synagogaan mahtui?', 'Mitä synagogan paikalla on?'],
      korostukset: ['Leandro Marconi|Leandro Marconi', 'Tłomackie|Tłomackie-kadulla'],
      nappi: 'Synagoga, jossa oli 2 200 paikkaa',
      laudat: { maailmankartta: { x: 6533.4, y: 1291.2 }, europe: { x: 614.4, y: 519.6 } },
      teksti: 'Varsovan suuri synagoga seisoi Tłomackie-kadulla, ja sen suunnitteli Leandro Marconi. Kaupungin '
        + 'juutalaisyhteisö rakennutti sen vuosina 1876–1878; kustannukset nousivat noin 200 000 ruplaan, '
        + 'vaikka suunnitelma oli 150 000. Synagoga avattiin 26. syyskuuta 1878 juutalaisen uudenvuoden '
        + 'aikaan, ja siellä oli 2 200 paikkaa: 1 150 päähallissa ja 1 050 naisten parvilla. Päähalli oli '
        + '29 × 33 metriä, ja Toora-arkki oli tehty Libanonin setristä. Saarnat pidettiin puolaksi, ja '
        + 'jumalanpalvelusta säesti kuoro. SS räjäytti synagogan 16. toukokuuta 1943 Varsovan gettokapinan '
        + 'päätteeksi. Paikalla seisoo Sininen pilvenpiirtäjä, joka valmistui 1991.',
      lahde: 'en-Wikipedia "Great Synagogue (Warsaw)", johdanto ja osiot "Construction" ja "Destruction"; '
        + 'pl-Wikipedia "Wielka Synagoga w Warszawie", osiot "Historia" ja "Architektura" (tarkistettu '
        + '31.10.2026).',
      kuva: 'ihme-suuri-synagoga-varsova-loistoaika.jpg',
      lyhyt: 'Kuoro laulaa juutalaisen uudenvuoden jumalanpalveluksessa, ja päähalli ja naisten parvet '
        + 'täyttyvät 2 200 paikasta; reilut kolmekymmentä vuotta myöhemmin SS räjäyttää synagogan.',
      selite: 'Noin vuonna 1910 juutalaisen uudenvuoden jumalanpalvelukseen kokoontuu suuri joukko '
        + 'varsovalaisia, ja päähalli ja naisten parvet täyttyvät. Saarna pidetään puolaksi, kuoro laulaa '
        + 'ja Libanonin setristä tehty Toora-arkki kuuluu salin koristukseen. Kuoron ääni täyttää salin '
        + 'kupolin alla. Toukokuussa 1943 SS räjäyttää rakennuksen Varsovan gettokapinan päätteeksi, ja '
        + 'paikalle nousee myöhemmin Sininen pilvenpiirtäjä.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1910). Faktat: '
        + 'en-Wikipedia "Great Synagogue (Warsaw)" ja pl-Wikipedia "Wielka Synagoga w Warszawie", '
        + 'tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Great_Synagogue_(Warsaw)',
    }),
    ihmeKohde({
      id: 'saksin-palatsi',
      nimi: 'Saksin palatsi',
      kysymykset: ['Missä palatsissa murrettiin Enigma?', 'Miten palatsi tuhoutui, ja mikä siitä on jäljellä?'],
      korostukset: ['Augustus II Vahva|Augustus II Vahva', 'Enigma|Enigma'],
      nappi: 'Palatsi, jossa Enigma murrettiin',
      laudat: { maailmankartta: { x: 6533.7, y: 1291.3 }, europe: { x: 614.6, y: 519.7 } },
      teksti: 'Saksin palatsi oli barokkipalatsi Varsovan keskustassa, jonka Puolan kuningas Augustus II Vahva '
        + 'osti 1713 ja laajensi kuninkaalliseksi asunnoksi 1724 mennessä. Palatsin teatterisalissa '
        + 'esitettiin näytelmiä jo 1716, kun Varsovassa ei ollut vielä teatteria. Venäjän armeija piti '
        + 'palatsia hallussaan 1864–1915, joten isoisä näki sen 1873. Arkadin alle sijoitettiin 1925 '
        + 'Tuntemattoman sotilaan hauta. Vuosina 1930–1937 palatsissa toimi salakirjoitustoimisto, jossa '
        + 'Marian Rejewski, Jerzy Różycki ja Henryk Zygalski murtivat saksalaisen Enigma-koodin joulukuussa '
        + '1932. Saksalaiset räjäyttivät palatsin joulukuun 1944 lopussa, ja vain osa arkadeista säilyi. '
        + 'Jälleenrakennuksesta päätettiin laissa 2021.',
      lahde: 'en-Wikipedia "Saxon Palace", osiot "A royal residence for the Saxon Kings…", "Interbellum: '
        + 'Independence, War and Destruction" ja "Reconstruction plans"; pl-Wikipedia "Pałac Saski w '
        + 'Warszawie", osio "Plany i przygotowania po 2018" (tila maaliskuussa 2026), tarkistettu '
        + '31.10.2026.',
      kuva: 'ihme-saksin-palatsi-loistoaika.jpg',
      lyhyt: 'Hovin muusikot harjoittelevat palatsin teatterisalissa, ja ikkunasta näkyvät Saksin puutarhan '
        + 'puut; yli kaksisataa vuotta myöhemmin saksalaiset räjäyttävät koko rakennuksen.',
      selite: 'Noin vuonna 1730 palatsin teatterisalissa hovin muusikot ja näyttelijät harjoittelevat '
        + 'iltaesitystä, ja palvelijat kantavat kynttilöitä paikoilleen. Kuningas Augustus II Vahva on '
        + 'tehnyt entisestä Morsztynin palatsista kuninkaallisen asunnon, ja hovin väki tietää sen. Ikkunan '
        + 'takana näkyvät palatsin puistot, ja kukaan ei arvaa, että tässä salissa salakirjoittajat istuvat '
        + 'noin kaksisataa vuotta myöhemmin. Joulukuussa 1944 saksalaiset räjäyttävät palatsin, ja jäljelle '
        + 'jää arkadin osa, jossa on Tuntemattoman sotilaan hauta.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1730). Faktat: '
        + 'en-Wikipedia "Saxon Palace", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Saxon_Palace',
    }),
  ],
  LUX: [
    ihmeKohde({
      id: 'luxemburgin-linnoitus',
      nimi: 'Luxemburgin linnoitus',
      kysymykset: ['Miksi Luxemburgin linnoitus purettiin?', 'Mikä linnoituksesta on yhä jäljellä?'],
      korostukset: ['Vauban|Vaubanin', 'Gibraltar|Gibraltariksi', 'kasematti|kasematit'],
      nappi: 'Pohjoisen Gibraltar, jonka sopimus purki',
      laudat: { maailmankartta: { x: 6037.9, y: 1407.0 }, europe: { x: 329.0, y: 588.8 } },
      teksti: 'Luxemburgin linnoitus kasvoi Bock-kallion päälle, jonne kreivi Siegfried rakensi linnan 963. '
        + 'Vuosisatojen kuluessa burgundilaiset, espanjalaiset, ranskalaiset, itävaltalaiset ja '
        + 'preussilaiset laajensivat sitä, ja Vaubanin johtamassa jälleenrakennuksessa 1684–1688 '
        + 'työskenteli yli 3 000 miestä. Linnoitusvyöhyke peitti noin 180 hehtaaria, kun kaupunki oli noin '
        + '120 hehtaaria, ja kallion sisään louhittiin noin 23 kilometriä kasemattikäytäviä. Sitä '
        + 'kutsuttiin Pohjoisen Gibraltariksi. Toinen Lontoon sopimus teki Luxemburgista pysyvästi '
        + 'puolueettoman 1867 ja määräsi linnoituksen purettavaksi. Purku kesti vuoteen 1883 ja maksoi 1,5 '
        + 'miljoonaa frangia, joten isoisän käydessä 1873 se oli vielä kesken. Bockin ja Pétrussen '
        + 'kasematit jäivät.',
      lahde: 'en-Wikipedia "Fortress of Luxembourg", johdanto ja osiot historiasta, mitoista ja purusta; '
        + 'de-Wikipedia "Festung Luxemburg", osiot "Festung" ja "Schleifung" (tarkistettu 31.10.2026).',
      kuva: 'ihme-luxemburgin-linnoitus-loistoaika.jpg',
      lyhyt: 'Preussilainen vartiosotilas seisoo linnoituksen portilla Bockin kallion juurella; seitsemän '
        + 'vuotta myöhemmin sopimus määrää koko linnoituksen purettavaksi.',
      selite: 'Noin vuonna 1860 preussilaiset varusväet vartioivat linnoituksen muureja ja portteja, ja '
        + 'kaupunki on ahdettu kolmen muurivyöhykkeen sisään, koska linnoitus ei anna sen kasvaa. Kallion '
        + 'sisällä kasematit yhdistävät asemat toisiinsa, ja käytävissä lyhtyjen valo heijastuu kosteasta '
        + 'kivestä. Vuonna 1867 sopimus määrää linnoituksen purettavaksi ja Preussin joukot lähtevät '
        + 'kaupungista; purku kestää 1883 asti ja jättää jäljelle vain osan kasemateista, kallion ja '
        + 'muutaman tornin.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1860). Faktat: '
        + 'en-Wikipedia "Fortress of Luxembourg", tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Fortress_of_Luxembourg',
    }),
  ],
  BEL: [
    ihmeKohde({
      id: 'maison-du-peuple',
      nimi: 'Maison du Peuple',
      nimio: 'Kansan talo',
      kysymykset: ['Kuka suunnitteli Brysselin Maison du Peuple\'n?', 'Mihin purettu rakennus päätyi?'],
      korostukset: ['Victor Horta|Victor Horta', 'Jean Jaurès|Jean Jaurèsin'],
      nappi: 'Talo, joka purettiin numeroituina osina',
      laudat: { maailmankartta: { x: 5978.3, y: 1353.5 }, europe: { x: 294.7, y: 556.5 } },
      teksti: 'Maison du Peuple oli Belgian työväenpuolueen talo Brysselissä. Victor Horta suunnitteli sen, ja '
        + 'se vihittiin 2. huhtikuuta 1899 Jean Jaurèsin läsnä ollessa. Rakennus oli rauta- ja lasitalo, '
        + 'jonka runkoon käytettiin yli 600 000 kiloa rautaa: alakerrassa oli myymälöitä ja '
        + 'kahvila-ravintola, ylempänä puolueen toimistoja, kirjasto ja kokoushuoneita ja ylimpänä suuri '
        + 'juhlasali. Julkisivu oli noin 80 metriä pitkä, ja Hortan koristeet rajoittuivat lähinnä '
        + 'kaiteiden kaariin. Talo purettiin 1965, vaikka satoja arkkitehteja ja taiteilijoita vastusti '
        + 'sitä. Osat numeroitiin, jotta rakennus voitaisiin pystyttää muualle, mutta sitä ei koskaan '
        + 'tehty, ja osa ruostui ulkona. Tilalle nousi 26-kerroksinen toimistotorni.',
      lahde: 'en-Wikipedia ”Maison du Peuple, Brussels”; fr-Wikipedia ”Maison du Peuple (Bruxelles)” '
        + '(tarkistettu 31.10.2026).',
      kuva: 'ihme-maison-du-peuple-loistoaika.jpg',
      lyhyt: 'Alakerrassa kahvila ja myymälät, ylempänä puolueen toimistot ja kirjasto, ylimpänä suuri '
        + 'juhlasali rautarungon sisällä; reilut kuusikymmentä vuotta myöhemmin talo puretaan osiin.',
      selite: 'Huhtikuussa 1899 Maison du Peuple vihitään, ja ranskalainen sosialisti Jean Jaurès on paikalla. '
        + 'Julkisivu on noin 80 metriä pitkä. Alakerrassa on myymälöitä ja kahvila-ravintola, ylempänä '
        + 'puolueen toimistot, kirjasto ja kokoushuoneita, ylimmässä kerroksessa suuri juhlasali. Hortan '
        + 'talossa rauta on rakenne eikä koriste. Vuonna 1965 talo puretaan, ja osat numeroidaan; osa '
        + 'niistä päätyy lopulta Antwerpenin Horta Grand Caféen ja Brysselin Horta-metroasemalle.',
      ihmeLahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (1899). Faktat: en- ja '
        + 'fr-Wikipedia ”Maison du Peuple”, tarkistettu 31.10.2026.',
      url: 'https://en.wikipedia.org/wiki/Maison_du_Peuple,_Brussels',
    }),
  ],
};
