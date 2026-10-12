# Moroni – rajattu A-lähdekooste ja C:n väitepohja

Luettu 12.10.2026. Omistus vain e08/moroni. Rajattu lähdepaketti, ei kuuden karttakohteen A-hyväksyntää tai toimitusvalmista kaupunkia. Oikea klooni `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/e08`. Kaikki lähde- ja tarkistusaineisto `valiaikainen/nopea-e08-moroni/`-polussa. Haut tehty yhteisen `sallittu_haku.py`-apurin robots-, redirect- ja sekunnin yhteislukon kautta. Ei estettyjä API-polkuja, kuvahakuja tai PDF-kiertoa.

## 0. Lähteet ja väitteiden kattavuus

| Tunnus | URL ja osio | C:n väitteet |
|---|---|---|
| M1 | https://en.wikipedia.org/wiki/Moroni,_Comoros – lead, History, Geography/Landmarks, Climate, Mount Karthala/Wildlife, Economy, Transport | Komorien pääkaupunki Ngazidjan länsirannikolla; pitkä kauppahistoria ja Bambao/Ikoni; hallintokeskuksen siirto Dzaoudzista 1900-luvulla; medina ja maailmanperintökokonaisuus; vulkaaninen kalliorannikko; Volo Volo; vientituotteet, pozzolaani; koralliriutat sataman rajoitteena; lentokenttä Hahayassa; vuoden ympäri sateita ja monsuunikausi |
| M2 | https://en.wikivoyage.org/wiki/Moroni_(Comoros) – Get in, Get around, See, Buy, Eat | jaetut taksit ja lentoasemasiirtymä; medinan puuovet, kujat ja bangwe-keskustelu-/pelitilat; kansallismuseon aihepiirit; Volo Volon ruoka ja ostokset; Itsandran hiekkaranta; ei hintoja/aikatauluja |
| M3 | https://en.wikipedia.org/wiki/Mount_Karthala – lead, Volcanic activity, Flora and fauna, coordinate | aktiivinen kilpitulivuori; kaldera muuttuu purkauksissa; kraatterijärven katoaminen 2000-luvun purkauksessa; kostea ainavihanta metsä, ylempien rinteiden matalat puut ja kanervikko; Erica comorensis ja Karthala white-eye; oma vuoren koordinaatti |
| M4 | https://en.wikipedia.org/wiki/Grande_Comore – lead | Ngazidja / Grande Comore -nimet ja Moronin sijainti samalla saarella; saaren tulivuoriperäinen alkuperä. Ei koko saaren väkilukua kaupungin luvuksi. |
| M5 | https://whc.unesco.org/en/list/1768/ – Description, Brief synthesis, Criterion iii/iv, Integrity, Protection and management | historiallisten medinojen kivitalot, yhteiset aukio-/kokoontumistilat (bangwe/mpangahari), Intian valtameren kauppayhteydet ja elävät sosiaaliset käytännöt; CNDRS tutkimus- ja kulttuurilaitoksena |
| M6 | https://www.comorostourism.com/ile/ngazidja?_locale=fr – Ngazidja, listings | kansallinen matkailutoimisto: Moronin kujat osana Ngazidjan historiallista kaupunkiympäristöä, CNDRS kulttuuriperintökohteena; ei luetteloiden kuvien käyttöä |
| M7 | https://moroniaeroport.com/ – HTML title ja metatiedot | lentoaseman virallinen nimi sekä HAH/FMCH; Hahaya vahvistuu sivun omista metatiedoista. JavaScript-käyttöliittymästä ei haettu aikatauluja. |
| X1 | https://fr.wikipedia.org/wiki/Mosqu%C3%A9e_de_Moroni – infobox, body | vain ristiriidan/oikeusketjun auditointi; ei rakennusvuotta C:hen eikä kohdekartalle |

Alkuperäislähteitä M5–M7, Wikipedia/Wikivoyage M1–M4. HTML ja luettavat tekstit sekä lähde-SHA:t `lahde-manifesti.json`:ssa. Lisäyritys `https://volcano.si.edu/volcano.cfm?vn=233010` palautti HTTP 403, kirjattu `lisalahde-manifesti.json`:iin; ei käytetty väitteiden todisteena, ei korvaavaa PDF-reittiä.

## 1. Vuoden 1873 kehys

M1 History: Moroni oli vakiintunut Intian valtameren kaupunkiverkon paikka jo keskiajalla ja osa Bambao-sulttaanikunnan verkkoa Ikonin kanssa. Näin kaupunki oli olemassa ennen isoisän matkavuotta 1873. C kertoo vain tästä ajallisesta suhteesta; ei isoisän tekoja, reittiä tai keksittyä paikallista tapahtumaa. Nykyinen koko saariston pääkaupunkiasema syntyi 1900-luvulla. Karthalan nimenomaista 1873-tilannetta tai sitä varhaisempien yksittäisten purkausten aikajanaa ei saatu lisälähteellä varmennettua; jätetty kohdejutusta pois ja portti auki.

## 2. Perustiedot ja laajuus

Komorien pääkaupunki, Ngazidjan/Grande Comoren länsirannikko, Intian valtameri. Kontekstin pallo -11.7036, 43.2536. Kaupungin kuntaluku 2017 kontekstissa sisältää alkuperäisen väestöraportin kahden taulukon pienen ristiriidan; mitään väkilukua ei kirjoitettu C:hen. Saarta, kuntaa ja kaupunkia ei niputeta yhdeksi alueeksi. M1:n nimen 'at the river' -selitystä ei käytetty ilman riippumatonta vahvistusta.

## 3. Artikkeli ja kansi

Artikkeli: kaupunki, pitkä kauppahistoria, nykyinen pääkaupunkiasema, medina sekä meri ja Karthala. Kannen neljä erillistä nostoa:
1. Medinan yhteiset kokoontumispaikat ja ovet (M2, M5; maailmanperintökokonaisuus M1 + M5).
2. Volo Volo kaupankäynnin ja aterioiden paikkana (M1 Economy, M2 See/Buy/Eat).
3. Sataman muutkin kuin mauste-/öljyvientituotteet ja koralliriuttojen vaikutus (M1 Economy/Transport). Ei kapasiteetti-/syväyslukuja tai toimijanimien ajantasaisuuslupauksia.
4. Kansallismuseon eri aihepiirit (M2 See; CNDRS:n tehtävä M5–M6). Ei yksittäisen näyttelyesineen tai nykyisen näyttelyjärjestyksen lupausta.

Kontekstissa ei Moronin maalehteä tai lähikaupunkeja. Kevyen pisteen vanilja-/öljy-/moskeijakuvausta syvennetään uusilla rajatuilla faktoilla, ei täytetä nostoa samasta tiivistelmästä. Asukkaat kuvataan elävänä kaupunkiyhteisönä; ei eksotisointia, aikamatka-/kadonneen kaupungin kehystä tai kurjuuskuvastoa.

## 4. Luontosivu / Kaupunki tulivuoren äärellä

N1 kilpitulivuori ja muuttuva kaldera (M3 lead); N2 kraatterijärven katoaminen (M3 April 2005 eruption, pelaajatekstissä vain 2000-luku); N3 metsän, matalien puiden ja kanervikon vaihtuminen rinteellä, Erica comorensis ja Karthala white-eye (M3 Flora and fauna); N4 kaupungin vulkaaninen kalliorannikko ja erillinen Itsandran hiekkaranta (M1 Geography, M2 Do). Ei purkausten väli-/korkeus-/kalderan koko-/lajimäärälukuja tai maailman suurin -väitteitä. Ei uhritietoja. Minitehtävä kysyy kanervikosta ylemmillä rinteillä; viidessä visakysymyksessä ei kysytä samaa.

## 5. Viisiosainen opas

- Perille ja liikkeelle: M1–M2 + M7; kenttä kaupungin ulkopuolella, jaetun taksin määränpää sovittava, ei täsmällistä etäisyyttä, hintaa tai aikataulua.
- Medina/satama: M1–M2 + M5. Moskeija käytössä olevana uskonnollisena paikkana, ei rakennusvuotta tai automaattista sisäänpääsylupausta.
- Museo/vuoriretki: M2–M3; museo ja vuoriretki eri ohjelmina; retken toteutuminen riippuu ajankohtaisesta tilanteesta ja paikallinen opas tarkistaa olosuhteet. Ei väitetä tulivuorta juuri nyt rauhalliseksi tai retkeä avoimeksi.
- Ruoka: M2 Eat, kala/banaani ja riisi/liha, vartaat, kana, bataatti, maniokki. Tuoreeltaan valmistetun ruoan valinta on kirjoittajan käytännön suositus, ei erityinen paikallinen fakta.
- Sää: M1 Climate, vain laadullinen ympäri vuoden sateita / monsuunikausi. Ei ilmastolukuja. Ennusteen ja olosuhteiden tarkistus on ehdollinen matkasuositus.

## 6. Kohdekartta ja kohdejuttu – partial

Karthala, tyyppi `luonto`, M3:n vuoren oma piste **-11.76028, 43.35306** (11°45′37″S 43°21′11″E). Ei M3:n kansallispuiston erillistä aluekoordinaattia eikä kaupungin pistettä. Naturalkohde ei sisällä suojattua rakennusta, veistosta tai valaistusta. Rajaus kattaa myös historiallisen keskustan alueen, jonka kohdepisteet odottavat työtä. Vuoren piste on tarkistimen laskennalla noin 13 km kaupungin kontekstipisteestä eli yli 12 km varoitusrajan: tämä on tunnettu poikkeama, ei täysi keskustakartta. Pääsession on ratkaistava kohteen karttalaajuus; keskuksen 6–8 kohteen portti jää auki.

Moronin medina, vanha satama, Volo Volo ja kansallismuseo jäivät ilman karttakohdetta: varmistettuja omia WP/WD-pisteitä / rakennusten oikeusketjuja ei ollut tässä rajatussa paketissa. Wikivoyagen koordinaattia tai kaupungin Q3901-pistettä ei lainata kohteille. Karthalan kohdejuttu on nykyluontoa kuvaava kaksikappaleinen teksti; 1873:n kohdekohtainen aikajana jätettiin avoimeksi lisälähteen 403-esteen vuoksi.

## 7. Kysymykset ja tiedot

Viisi kysymystä: maa M1, saari M1/M4, vuori M3, medina M1, sataman koralliriutat M1. Tasot 1–3, lähde-URL jokaisessa. Kolme tietoa: bangwe M2/M5, pozzolaanivienti M1, vuoren kasvillisuusvyöhykkeet M3. Ei isoisän ääntä.

## 8. Kuva- ja sääportit

Ei B-valintaa eikä kuvahakuja/generointia. Kaikissa kuvaolioissa neljä kenttää tyhjiä. Tarvitaan 19 roolia: valokuva 1, kansi 3, nostot 8, matkailijalle 1, opas 5, luontokohdejuttu 1. Kuvaroolit eivät ole tiedostonimiä. Rakennus- ja puuovikuvien tekijäketju ja mahdollisesti näkyvät uudet teokset varmistettava kuvaputkessa; kansikuvat laajoja kaupunkikuvia.

`saatiedot:null`, koska täydellistä primäärisääauditointia ei tässä sessiossa ole. Ei uutta sääpoimintaa, ei saa.json:n muutoksia, ei tarkkoja ilmastolukuja.

## 9. Ristiriidat ja avoimet portit

- Vanha perjantaimoskeija: M1 tarkka 1427 sekä minareetti 1921; X1 infobox XVe–XIXe siècle ja body 1800-luvun alku, lisäksi väite ettei rakennus näy 1899 kuvissa. X1 Architecte inconnu. Eri rakennusvaiheiden tai rakennusten selitys ei ole varmennettu. Tarkka vuosi jätettiin pois, ei kohdevalintaa/kuvavalintaa. Kontekstin tunnusrakennuksen 1427 merkintä on syytä tarkistaa pääsessiossa.
- Pääkaupunkisiirron päätös/toteutumisvuosi eroavat M1:n ja M2:n muotoiluissa; C:ssä vain 1900-luku.
- Lentokentän etäisyys eri lähteissä eri luku; ei C:ssä.
- Karthalan historiallinen 1873-kehys, kartan historiallinen keskus, vuoren 13 km poikkeama, B, sääauditointi, D/E/F jäävät avoimiksi. C-luonnos ei ole hyväksyntä, pelikytkentä tai julkaisu.
