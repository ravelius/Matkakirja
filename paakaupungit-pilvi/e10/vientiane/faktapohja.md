# Vientiane — rajattu A-lähdekooste 12.10.2026

Omistus e10/vientiane, NASin e10-klooni. C:n pohjaksi tehty rajattu kooste, ei täysi A/B/D/E/F. Oma konteksti.json luettu: ei maalehti- tai lähilehtiaiheita. Kevyt teksti sisältää jo Mekongin, temppelit, Lan Xangin ja ranskalaisrakennukset. Uusi sisältö syventää nimen tulkintoja, vanhan temppelin yksityiskohtia ja kaupungin ruokapöytää.

## 0. Luetut lähteet ja hakutapa
12.10.2026; yhteinen sallittu_haku.py, robots molemmille agenteille, tarkistetut redirectit ja globaali hakulukko. Lähde-HTML ja tekstipoiminnat omassa `valiaikainen/nopea-e10-vientiane/`-hakemistossa. SHA ja omat lähdetapahtumat siellä. Estettyjä /w/- tai /api/-polkuja ei käytetty.

- V1 https://en.wikipedia.org/wiki/Vientiane — johdanto, Etymology, Lan Xang and French colony, Tourism, Rail. Mekongin rannalla Laosin pääkaupunki, vastaranta Thaimaata; ranskalainen kirjoitusasu/laon Viangchan; viang muurien ympäröimä kaupunki ja chan santelipuu/kuu -tulkinnat; pääkaupunkiasema Lan Xangin aikana ja ranskalaisajan hallintokaupunki. Ei nykyhallinnon/politiikan tietoja.
- V2 https://en.wikipedia.org/wiki/Wat_Si_Saket — Overview ja paikan oma koordinaatti. Kuningas Anouvongin rakennuttama 1800-luvun temppeli, ympäröivä terassi ja monitasoinen katto; keraamisia ja hopeisia Buddha-kuvia käytäväseinissä; museotoiminta; myöhempi ranskalaisajan korjaus. Säilymisen syy esitetään lähteessä epävarmana; C ei käytä syyselitystä.
- V3 https://en.wikipedia.org/wiki/Haw_Phra_Kaew — History/Exhibits. Kuninkaan henkilökohtainen temppeli palatsialueella, ei asuvia munkkeja; Smaragdibuddha siirrettiin pois; rakennus tuhoutui ja rakennettiin uudelleen useasti; nykyinen rakennus 1900-luvun jälleenrakennus; uskonnollisen taiteen museo; palmunlehtikäsikirjoituksia, puukaiverruksia, pronssinen sammakkorumpu. Tarkat vuodet jätetään pois.
- V4 https://en.wikipedia.org/wiki/That_Dam — johdanto. Black Stupa / musta stupa, liikenneympyrässä; nagaan liittyvä suojelijaperinne. Tarina kerrotaan perimätietona, ei todistettuna eläimen olemassaolona. Monipäisenä ilman tarkkaa päälukua. Stupan rakennusajasta ei näyttöä: pois kartasta.
- V5 https://en.wikipedia.org/wiki/Lao_cuisine — johdanto, Kitchen utensils, Eating customs, Salads, Steamed dishes, Rice, Sandwiches. Khao niao, bambuinen höyrytyskori huad kattilan päällä, jaettava tarjoilukori; laap liha/kalaseos, yrtit/padaek; mok pa banaaninlehdessä höyrytetty kala ja sen mausteet; Vientianen kadulla myytävät patongit ja ranskalainen perintö; khao jee pâté; vihreän papaijan salaatti tam mak hoong. Ei määrälukuja/superlatiiveja.
- V6 https://en.wikivoyage.org/wiki/Vientiane — Understand, Orientation, Get in, Get around, See, Eat. Mekongin rantakävely; lentokenttä Wattay (VTE), bussit/taksit; Lao-China railway station vs Khamsavath eri asemat; keskustan kävely, tuk-tuk ja sovittava hinta; Ban Anoun iltatorin ruokavalikoima (riisitaikinaleivonnaisia porsaanjauhelihalla/pavuniduilla, salaattikääröjä maapähkinätäytteellä, vartaita, grillattua tahmeaa riisiä); rannan ravintolat ja leipomot. Hintoja, linjanumeroita, aikatauluja, rajamuodollisuuksia ja turvallisuusväitteitä ei käytetä.

Estetty alkuperäislähde: https://www.tourismlaos.org/central-provinces/vientiane-capital/ — robots kielsi molemmille agenteille Disallow /. Sisältöä ei noudettu, siitä ei otettu väitteitä eikä kieltoa kierretty. Rajattu lähdepohja on yllä olevista sallituista Wiki-sivuista; primäärivarmennus jää D/E/F-auditointiin. WP ja Wikivoyage eivät ole automaattisesti kaksi riippumatonta lähdettä. Tarkkoja rakennusvuosia/numeroita ei käytetä.

## 1. Perusfaktat ja 1873-kehys
Kaupunkipiste 17.98, 102.63 vain kontekstista. Wat Si Saket on 1800-luvun alkupuolen temppeli (V2), joten se oli jo olemassa 1873. Myöhemmät korjaukset erotetaan alkuperäisestä; ei isoisän vierailua, reittiä tai tarkkaa vuoden 1873 näkymää.
Väestöluku pois: kontekstin 820940/2015 on pääkaupunkialue; V1:n johdannon eri luku/rajaus ei sama alue. Ei käytetä pääkaupunkialueen lukua keskustakaupungin lukuna.

## 2. Kansisivun lähdepohja
1. Kuu/santelipuu: nimen ranskalainen kirjoitusasu, viang merkitys, chan kaksi tulkintaa ja aiemmin eri kirjoitusasu, sanskritin tausta — V1 Etymology. Ei valita toista ainoaksi oikeaksi, ei väitettä kaupungissa kasvavasta santelipuusta.
2. Wat Si Saket: rakennuttaja, 1800-luku, terassi/monitasoinen katto, keraamiset/hopeiset kuvat, museotoiminta, korjaukset — V2 Overview. Seinäsyvennykset, sim-vihkimyssali sisäpihan keskellä ja Buddhan aiempien elämien seinämaalaukset V6 See. Ei tarkkaa kuvamäärää eikä epävarmaa tuholta säilymisen syytä.
3. Haw Phra Kaew: palatsitemppeli, henkilökohtainen käyttö/asuvien munkkien puuttuminen, poissa oleva Smaragdibuddha, uudelleenrakentaminen, museo/kokoelman esimerkit — V3. Ei nykyisen rekonstruoidun arkkitehtuurin kuvaa tai karttakohdetta ennen suojarajan selvittämistä.
4. Ban Anoun iltatori: auringonlaskussa kokoontuva ruokatori, salaattikääröjen maapähkinätäyte, vartaat/grillattu riisi, riisitaikinaleivonnaisten jauheliha/pavunidut — V6 Eat, helmikuu 2025 -päivitys luettu nykyiseltä sivulta. Ei pysyvää myyjä- tai valikoimalupausta; nykyinen palvelutilanne avoin.

## 3. Ruoka-teema: Riisikori ja patonki
- Khao niao: tahmea riisi, huad/kattila, tarjoilu bambukorista ja yhteisruokailu — V5 Kitchen utensils/Eating customs/Rice. Höyryttäminen ja tarjoilu erotettu. Ei citation needed -syyselitystä käsin syömiselle.
- Laap/larb/laab: lihaa tai kalaa ja yrttejä; kalapohjainen padaek, myös sieniversioita — V5 Salads/johdanto. Ei raakareseptiä tai turvallisuusväitettä; ruokalistan nimi ei ratkaise annoksen kaikkia aineksia.
- Mok pa: banaaninlehdessä höyrytetty kala, bambunaru; sitruunaruoho, makrutlimetin lehdet, sipuli, kalakastike, chili, katkaraputahna, tilli — V5 Meat and fish/Steamed dishes. Ei yleistä väitettä että kaikissa annoksissa sama resepti.
- Patonki: Vientianen kaduilla myydyt patongit ja ranskalaisajan ruokaperintö, khao jee pâté täytetty pâtélla/mausteilla — V5 johdanto/Sandwiches; V6 leipomot. Kaikki leivät eivät tarkoita samaa nimellä khao jee: V5 käyttää sitä myös paahdetusta riisistä, joten C käyttää täyden patonkiannoksen nimeä.
Minitehtävä kysyy mok pa -kääreen materiaalia; vastaus saman sivun kolmannessa nostossa. Kaupunkivisa kysyy Mekongista, viang-sanasta, temppelin kuvien materiaaleista, Smaragdibuddhasta ja That Damin perimätiedosta.

## 4. Opas
Viisi jaksoa: liikkuminen (V6 Get in/Get around; vain yhteyslajit ja eri asemien nimet), Wat Si Saket/Haw Phra Kaew (V2/V3), Mekong/rantaruokailu/iltatori (V6), ruokavalikoima (V5), päiväkierros/ilta ja matkasuunnittelun käytännöt (V6). Ei numeerista tai kuukausikohtaista sääsuositusta: sääauditointi avoin. Viidennessä jaksossa päivän ja illan rytmi, ei arvattua parasta vuodenaikaa. Ei nykyisiä matkustusrajoitus- tai turvallisuuslupauksia. Ajantasaisuuden jatkoauditointi avoin.

## 5. Kartta partial / nähtävyys
Wat Si Saketin oma V2-koordinaatti: 17.96306, 102.61167, viisi desimaalia. Kaupungin tai seudun pisteitä ei lainata. Karttarajat tästä pisteestä geometrisesti noin kävelykorttelin ympärille. Historiallinen temppeli yleiskohteena, ei yksittäisiä veistoksia. Pienten Buddha-kuvien iät eivät ole teoskohtaisesti varmennettuja, joten ei niitä havainnekuvien pääaiheeksi.
Nähtävyysjutun kaikki faktat V2 Overview ja V6 See: alkuperäinen 1800-luvun temppeli, monitasoinen katto/terassi, seinäsyvennykset ja keraamiset/hopeiset kuvat, ranskalaisajan korjaukset ja museo. V2:n mukaan kaupungin 1800-luvun tuhon yhteydessä Siamin joukot käyttivät temppelialuetta päämajana ja majoitukseen. Säilymisen syytä ei päätellä. 1873-kulma vain olemassaolo; ei silloista täsmällistä sisustusta. Varmistettu karttakohde yksi; 6–8 portti avoin.

## 6. Kysymykset ja tiedot
Viisi kysymystä lähde-URL:eineen: V1 Mekong ja viang, V2 keraamiset/hopeiset kuvat, V3 Smaragdibuddha, V4 naga-perinne (myytti selvästi merkitty). Kolme tietoa: V1 nimen kaksi tulkintaa, V3 puuttuva nimikkopatsas, V5 huad-höyrytyskori. Ei isoisän ääntä, tarkkoja lukuja tai rakennusvuosia.

## 7. Kuvat
Ei B-valintaa: 19 kuvaroolin tiedosto/lahde/lyhyt/selite tyhjiä. Valokuva 1, kansi 3, kansinostot 4, ruokanostot 4, matkailijalle 1, opas 5 ja temppelijuttu 1. Ei kuvahakuja, generointia tai keksittyjä nimiä/creditejä. Haw Phra Kaew -nostolle mahdollinen historiallinen PD-aineisto vasta erikseen tarkistettuna; nykyrekonstruktio ei kuvaehdotus. Wat Si Saketille vain yleiskohde ja teosten tarkka suojaraja myöhemmin.

## 8. Avoimet portit
Täysi A-minimi; lisäkohteiden oma WP/WD-piste, paikkafaktat/suojaraja; B/katselu; sää 48/48 primäärivarmennus (saatiedot:null, saa.json ei muokattu); matkailun/primäärilähteiden auditointi; riippumattomat D/E/F.

## 9. Poisjätöt ja ristiriidat
Patuxai, Buddha Park, uudet veistokset ja valoteokset pois kartta-/kuvatilauksista suojarajan vuoksi. That Dam pois kartasta: rakennusaika/suojaraja ei varmennettu. Haw Phra Kaew pois kartasta: nykyisen 1900-luvun rekonstruoinnin tekijä/suojaraja avoin. Pha That Luangin korjattuja yksityiskohtia ja nykypatsaita ei kuva-aiheeksi. Wat Si Saketin säilymisen oletettu syy pois; V2 epävarma, V6 esittää varmempana. Materiaalilista eri lähteissä osin eri: C käyttää V2:n keraamisia/hopeisia kuvia, ei kaikkien esineiden määrää. Ei nykypolitiikkaa, sotakerrontaa, väestö-/hintalukuja, terveysturvallisuusväitteitä tai rajamuodollisuuksia. Ei viranomaislähteen robots-kierron tietoja. Ei suoria sitaattitekstejä.
