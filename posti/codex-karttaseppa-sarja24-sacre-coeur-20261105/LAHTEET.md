# Sacré-Cœur #2098: lähde-ennakkotarkistus

TILAUS-24 ja ajantasainen 24d luettu kokonaan 5.11.2026. Kuusi kohteen lähdetiedostoa täsmää SHA256SUMS-manifestiin (verification.json). #2115 sallii rinnakkaistyön; #2116:n suuntakorjaus luettu ennen ensimmäistä ottoa. #2120 sallii Wikimedia-API:n hitaasti ja tunnistautuen. Tämä kohde käytti varattua yksinomaista hakuvuoroa; kaksi peräkkäistä imageinfoa sisältävää hakua, viisi kuvalatausta, ei 429:ää. User-Agent Matkakirja-reference-check/1.0, ei henkilötietoja. Commonsin robots.txt luettu ensin. Vuoro vapautettu juurelle ennen tuotantoa; ei Overpassia.

## Suunta: kaksi erillistä maamerkkiä

Commonsin ilmakuvaa verrattiin Karttasepän pohjoisyläiseen pyyhitty/ohje-kuvaan. 1) Square Louise Michelin puistokolmio ja porrastettu akseli ovat pääsisäänkäynnin eteläpuolella; eteläjulkisivun Yelles2006-valokuva näyttää tämän yhteyden. 2) Saint-Pierre de Montmartren pitkä matala kirkko ja sen vierustie tunnistuvat basilikasta länteen sekä ilmassa että CampusFrancen2015-länsiprofiilissa. Lisäksi pohjoispään kellotorni ja sen takainen rue du Chevalier-de-la-Barre erottuvat. Ei päätelmää pelkästään ilmakuvan yläreunasta eikä varjojen oletetusta kellonajasta.

Square-lähde: https://www.paris.fr/lieux/square-louise-michel-1762 ; basilikan takasisäänkäynti35rueChevalier: https://www.sacre-coeur-montmartre.com/infos-et-visites/informations-pratiques/horaires-et-acces/ ; rakennuksen/aukion suojelu ja pohjoisgalleria: https://pop.culture.gouv.fr/notice/merimee/PA75180004 . Karttasepän #2116 vahvistaa nimenomaisesti eteläjulkisivun. Pitkä akseli86° myötäpäivään idästä; jalanjälki ratkaisee pelisijainnin.

## Mitat ja epävarmuus

Kupoli83m: Ranskan kansallinen matkailutoimisto https://www.france.fr/fr/article/sacre-coeur/ ja hiippakunnan kulttuurijärjestö https://artculturefoi.paris/portfolio/basilique-du-sacre-coeur-de-montmartre/ ilmoittavat saman. Basilikan oma sivu https://www.sacre-coeur-montmartre.com/decouvrir/patrimoine-et-art-sacre/lentree-et-sa-facade/ ilmoittaa campanilen84m; tätä verrataan kuvassa83m-kupoliin, mutta84m-luku on yhden ensisijaisen lähteen tieto. Työmaalla toimiva valaisinasentaja vahvistaa kupolin83m: https://andrelm.fr/entretien-eclairage-basilique-du-sacre-coeur/ .

Tilaustaulukon96×50m ei saanut riippumatonta mitattua vahvistusta. Julkaisuissa esiintyy85×35m (mm. https://sites.ac-nancy-metz.fr/eco-solgne/IMG/pdf/La_basilique_du_sacre_coeur.pdf , koululaisaineisto, ei mittaustutkimus). Mahdollinen eri rajaus (koko kirkko/keskirunko/apsis) jää avoimeksi. Tässä ei väitetä96×50m:ä lähdevarmennetuksi todelliseksi ulkomitaksi: käytetään tilauksen suunnittelumittarina, rinnalla85×35m-vertailu. Korkeus83m varmennettu. Pelin420×200m-jalanjälkeä ei muuteta. Kuvallinen vertailu säilytetään; ei väärää tarkkuushyväksyntää.

## Kuvalliset lähteet

ilmakuva.jpg: Learn From. Build More.,16.5.2011, CC BY-SA2.0. https://commons.wikimedia.org/wiki/File:Basilica_of_the_Sacred_Heart_of_Paris,_commonly_known_as_Sacr%C3%A9-C%C5%93ur_Basilica,_aerial_photograph.jpg ; https://creativecommons.org/licenses/by-sa/2.0/ . Alkuperäinen664×731, yläilmakuva, katon ja koko pohjan muotomittari; ei ortorektifioitu mittaus. Metadata ilmakuva-source.json.

kokonainen-2006.jpg: Yelles,2006, CC BY-SA3.0. https://commons.wikimedia.org/wiki/File:Paris_75018_Basilique_du_Sacr%C3%A9-C%C5%93ur_south_facade_stairs_square_2006.jpg ; https://creativecommons.org/licenses/by-sa/3.0/ . Alkuperäinen1200×1792, koko eteläjulkisivu ja kupolit. Osa jalkalistasta portaan kaiteen takana. Tästä muuttamaton oikea.jpg toimitukseen.

ilmakuva-2015.jpg: Campus France,1.7.2015, CC0. https://commons.wikimedia.org/wiki/File:Montmartre_and_Sacr%C3%A9-C%C5%93ur,_Paris_1_July_2015.jpg ; http://creativecommons.org/publicdomain/zero/1.0/ . Commons1920×1440-johdannainen, koko länsiprofiili ja erillinen pohjoistornin korkeus näkyvät; ympäristö osin peittää alinta sokkelia.

julkisivu.jpg: Taxiarchos228,10.10.2010, CC BY3.0. https://commons.wikimedia.org/wiki/File:Paris_-_Sacr%C3%A9-C%C5%93ur.jpg ; https://creativecommons.org/licenses/by/3.0/ . Commons1280px-johdannainen, eteläosan muototuki; lämmin iltavalo ei värimalli.

kokonainen-2012.jpg: Freepenguin,10.11.2012, CC BY-SA3.0. https://commons.wikimedia.org/wiki/File:Basilique_du_Sacr%C3%A9-C%C5%93ur,_Paris_10_November_2012_005.jpg . Lähihakukuva leikkautuu: ei koko rakennuksen mittari eikä tuotannon viite. Kaikkien Commons-metatiedot tallennettu erikseen; kuvapikseleitä ei muokattu.

Piirrostyylin ainoa tuki tämän kierroksen yhteensopivuudelle: paikallinen GrandPalais2 viisto-lounas.png, vain muste/vesiväri/valo, ei rakennuksen geometria. Kaikki tuotannon viitteet katsottu ennen imagegen-kutsua.
