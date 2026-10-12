# Kuala Lumpur — rajattu A-kooste C-kirjoitusta varten

Omistus e10/kualalumpur, rinnakkaistehtävä 10; luettu 12.10.2026. Rajattu lähdekooste, ei täysi A-hyväksyntä. Kartta partial 2/6, kuvat/sää/D/E/F avoinna. Alkuperäiset robots-sallitulla yhteisellä `sallittu_haku.py`:llä haetut HTML:t, tekstit ja HTTP/redirect-lokit NAS-juuren `valiaikainen/nopea-e10-kualalumpur/`-kansiossa. Ei estettyä API-polkujen käyttöä, PDF-kiertoa tai Commons-kuvahakua.

## 0. Lähteet ja kenttien väitepohja

| Tunnus / tallenne | Sivut ja luetut osiot | Käyttö C:ssä |
|---|---|---|
| K / kl | https://en.wikipedia.org/wiki/Kuala_Lumpur — alku, History/Early years/Beginning of modern Kuala Lumpur, Public transport | Pääkaupunki; Klang/Gombak ja tinakaivosten tavaraliikenne; kaupunki ennen 1873; tulipalot/tulvat, puu/atap ja tiili/kattotiili paloturvallisuuden vuoksi, Yap Ah Loyn tiilitehdas. Malaijien, kiinalaisten ja intialaisten perinteet. LRT/MRT/monorail/KTM ja KL Sentral/lentoasemajuna. Intro, artikkeli, N2/N4, visa 1/5, opas. Ei tarkkoja asukaslukuja, hallinnon siirtovuosia tai superlatiiveja. |
| V / voyage | https://en.wikivoyage.org/wiki/Kuala_Lumpur — Districts/Brickfields, Get in/By plane/By train, Get around/By train/On foot, See, Eat | Little India, banana leaf rice -ravintolat; KL Sentral vs vanha Kuala Lumpur -asema; eri ratojen vaihtoihin kävelyä; kuuma/kostea ja märät liukkaat pinnat; moskeijoiden/temppelien pukeutumisohjeet; mamak-roti ja dal/curry. Oppaan käytännön sisältö, N4/N7/N8 ja tiedot. Ei hintoja, aikatauluja, matkustusminuutteja tai lääketieteellisiä ohjeita. |
| F / forest | https://en.wikipedia.org/wiki/Bukit_Nanas — alku, History, oma koordinaatti | Keskustan kukkula ja jäljellä oleva trooppinen metsä, polut, KL Forest Eco Park -nimi; suojelualue 1900-luvun alkupuolelta, rakentaminen pienentänyt aluetta; ananaskukkula ja ananaseste-nimitarina nimenomaan kertomuksena. N1, artikkeli, intro, visa 3, opas 3, kartta/juttu. |
| B / brickfields-city | https://en.wikipedia.org/wiki/Brickfields,_Kuala_Lumpur — alku, History, Commercial | Kaupungin kortteli, Little India, tiilien valmistus/jälleenrakennus, Yap Ah Loy vs myöhempi Yap Kwan Seng, kaupat/ruokapaikat ja KL Sentral. N2, artikkeli, visa 2, opas 4. Alun https://en.wikipedia.org/wiki/Brickfields haku palautti täsmennyssivun: EI kaupunginosan faktalähde. |
| H / hokkien | https://en.wikipedia.org/wiki/Hokkien_mee — Types, Penang Hokkien mee, Hokkien char mee | KL/ympäristö: paksut nuudelit, tumma soija, haudutus, sianliha/kalmari/kalakakku/kaali; Penang katkarapulientä ja Singapore oma paistettu muunnelma. N5, intro, visa 4, tieto 3, opas 4. Ei annoksen perustamisvuotta eikä parhaan hiilitulen väitettä. |
| S / sinze | https://en.wikipedia.org/wiki/Sin_Sze_Si_Ya_Temple — alku, History | Yap Ah Loyn perustama pyhäkkö; Seng Meng Lee / Sin Sze Ya ja kenraali Chung Piang Lai / Si Sze Ya; henkitaulun siirto, paikallishenkilöiden kunnioitus jumaluuksina; yhteisökeskus, riitojen ratkaisu/rituaalit. N3, intro, opas 2. Ei nimihenkilöiden kuolintapaa, ihmeiden esittämistä tosiasioina tai tarkkoja perustamis-/uudelleenrakennusvuosia. |
| A / victoria | https://en.wikipedia.org/wiki/Arthur_Benison_Hubback — alku, Buildings, Personal life | Vanhan rautatieaseman suunnittelija ja tekijän kuolema ennen 70 vuoden rajaa. Tekijänoikeusarvio, ei tarkkoja henkilötietovuosia lukijalle. Tallennenimi victoria on tämän session tekninen alias, ei viittaus Victorian asemarakennukseen. |
| R / station | https://en.wikipedia.org/wiki/Kuala_Lumpur_railway_station — alku, Preceding stations, Design/construction/operation, Design, oma koordinaatti | A.B. Hubbackin asema, länsimainen/moguli/Indo-Saracenic yhdistelmä, kaaret ja kattopaviljongit, vaalea rappaus, historiallinen asemassa sijainnut hotelli; rakennus 1900-luvun alkupuolella; aiemmat radat vasta 1800-luvun jälkipuolella 1873 jälkeen; KL Sentral otti pääaseman tehtäviä. Kartta/juttu, tieto 2, opas 1/2. Nykyisiä palvelulinjoja ei yksilöidä tämän artikkelin osin ristiriitaisista liikennetiedoista. |
| Y / yong | https://en.wikipedia.org/wiki/Yong_tau_foo — alku, Soup, Regional variations | Hakka-ruoka, liha-/kalatahnalla täytetty tofu ja vihannekset; kuiva/liemessä; Ampang Kuala Lumpurin ulkopuolella Klang-laaksossa paikallinen erikoisuus. N6, minitehtävä, opas 4. Ei lähteetöntä vehnäjauhojen puutteesta johdettua syntytarinaa. |
| C / roti | https://en.wikipedia.org/wiki/Roti_canai — alku, Preparation, Regional variations | Intialaistaustainen leipä, venytys ja taittelu/kierre tuottaa kerrokset; dal/curry ja makeat/suolaiset muunnelmat. N7, intro, opas 4. KL-yhteys lisäksi V:n Eat/mamak-osio. Ei UNESCO-väitteitä eikä kiistanalaista canai-etymologiaa. |
| L / banana | https://en.wikipedia.org/wiki/Banana_leaf — Applications in cuisine, In South India, In Indian cuisine | Lehden käyttö tarjoilualustana, sitä ei syödä, eteläintialainen perinne, riisi/vihannekset/suolaiset lisukkeet/appalam/curry. N8. `Banana_leaf_rice` palautti aidon sisäisen ohjauksen tähän sivuun; lopullinen wiki-otsikko on Banana leaf. KL/Brickfields-yhteys V:stä. Ei lehden taittosääntöjä tai niille keksittyä merkitystä. |

Primääritoimijoiden tulos: Tourism Malaysia KL Forest Eco Park HTTP 404; MyRapid Rail HTTP 200 mutta 212 tavun Incapsula-skriptikuori ilman luettavaa sisältöä; KLIA Ekspres TLS-virhe DH_KEY_TOO_SMALL. Mitään niistä ei käytetä faktalähteenä, suojauksia ei ohitettu tai alennettu. Nykyisten liikenne-/lentoasemanimien toimijavarmistus avoin. Kaikki yritykset haku.log:ssa. Pudu-artikkeli luettiin rajausvaihtoehdoksi, mutta sitä ei käytetä C:n väitteissä. `Sze_Ya_Temple` antoi HTTP 404, ei lähde; toimiva nimi S.

## 1. Konteksti ja toiston välttäminen

Oma `konteksti.json` luettu. Malesian maalehdelle jäävät kookosmaidossa keitetty riisi, hapan liemi, vedetty tee, durian, Rafflesia, orankien hoito, luolien kokoluvut, proboskisapina, rakennusten kellotornin vuosi ja katettu jalkakäytävä. Uudet nostot eivät toista näitä. Petronas-tornit eivät ole kuva-/karttakohde. Historiallinen rautatieasema on jo kevyen pisteen tunnusrakennus mutta ei maalehden nostotarina; juttu syventää arkkitehtuurin ja aseman vaihtuneen tehtävän erottelua.

## 2. 1873 ja lukukuri

K tinakauppahistoria osoittaa kaupungin syntyneen ennen 1873. Itse matkavuodelle ei rakenneta isoisän reittiä, tekemisiä, sitaatteja tai kaupungin täsmällistä ulkoasua. 1873 on kaanonin vertailuvuosi, ei uuden kaupungintapahtuman ajoitus. F:n metsän suojeluasema ja R:n nykyinen asema syntyivät vasta 1900-luvun alussa. K:n Kuala Lumpur–Klang-rata valmistui 1800-luvun lopulla 1873 jälkeen; tarkka vuosi jätetty pois.

R:n infobox/operational-osio sanoo 1910, alussa construction 1910/full completion 1917. C käyttää ainoastaan 1900-luvun alkupuolta ja jättää rakennusvaiheet erittelemättä. S:n sivussa tarkat perustamis-/valmistumis-/uudelleenrakennusvuodet eivät ole yksiselitteinen yksi tapahtuma; ei vuosilukuja C:ssä. L/H/Y:n ruokaväitteissä ei tarkkoja valmistusmääriä tai alkuperävuosia. Roti canain UNESCO-mainintaa ei tarkistettu primääristä eikä käytetty.

Väestö/pinta-ala pois. Konteksti sisältää Kuala Lumpurin liittovaltioalueen vuoden 2020 väestön, K uudemman liittovaltioalueen ja erillisen Greater KL/Klang-laakson arvion. Niitä ei sekoiteta. Tarkat asukasluvut tarvitsevat erillisen kahden riippumattoman lähteen hyväksynnän.

## 3. Kansi/teema ja väitelauseet

Kansi N1 Bukit Nanas / N2 Brickfields / N3 temppelin historialliset henkilöt jumaluuksina / N4 raideliikenteen järjestelmät. Teema `ruoka`: KL:n Hokkien mee / Klang-laakson yong tau foo / mamak-roti canai / Brickfieldsin banaaninlehtiateria. Yong tau foo ei saa leimata Kuala Lumpurin keksinnöksi: lähde sijoittaa erityisen paikallisen yhteyden Ampangiin kaupungin ulkopuolelle. Minitehtävä kysyy tofuun tehtävää täyttämistä, jota kaupungin visa ei kysy.

## 4. Viisiosainen opas

Perille/liikkeelle; vanha keskusta; Bukit Nanas; ruoka; milloin tulla. V/K lähteinä, reseptikuvaukset H/Y/C/L. Viisi parasta-riviä, neljä hyvä tietää -riviä. Ei hintojen/aikataulujen kopiointia eikä yleistä turvallisuuslausetta ilman ajantasaista varoituspohjaa. Moskeija/temppeli-pukeutumissäännöt V:stä. Laadullinen sää kuuma/kostea, märät pinnat liukkaita V:stä; ei kuukausia, lämpötiloja tai sademillimetrejä.

## 5. Kartta — partial 2/6

- **Kuala Lumpurin historiallinen rautatieasema**, R:n oma piste 3.13944 N / 101.69333 E. Arkkitehti A.B. Hubback, A:n henkilötiedossa kuollut 1948, yli 70 vuotta. Koordinaatti on asemalle, ei kaupungille tai KL Sentralille. Kuvavaiheessa tarkistetaan myöhemmät lisäosat ja yksittäiset nykyteokset erikseen.
- **Bukit Nanas**, F:n oma kukkulapiste 3.15278 N / 101.70250 E, `tyyppi:luonto`. Kukkula/metsä on aidosti luontokohde, ei KL Towerin peitenimi. Suojattu torni, nykyinen siltarakennelma, koulut ja kirkko eivät ole tämän kohdejutun aihe eivätkä automaattinen kuvaehdotus. Kuva rajataan metsään myöhemmässä B-vaiheessa.

Rajat pisteiden ääripäistä noin 300 m marginaalilla N3.1558/S3.1364/W101.6903/E101.7055; tekninen rajauslaskenta. Ei lainattuja nähtävyyskoordinaatteja. Muut vähintään neljä kelpoista kohdetta ja niiden juttupohjat avoinna. S:n temppelin modernien rakennusvaiheiden tekijäketjua ei selvitetty, joten ei kartalla.

## 6. Visa ja tiedot

Viisi kysymystä: maa (1), Brickfields/tiili (2), Bukit Nanas/nimen merkitys (2), Hokkien mee/tumma soija (3), monorail/kohorata (1). Jokaisen source tukee väitettä; väärät vaihtoehdot uskottavia eikä oikea ole toisen pelikaupungin nimi. Kolme tietoa: tiilimuisto, asemien ero, Hokkien mee -nimen paikalliset versiot. Ilman isoisän ääntä.

## 7. Kuvat

B-valinnat puuttuvat. Kaikki neljä kenttää tyhjät kaikissa rooleissa: valokuva 1, kansi 3, nostot 8, matkailijalle 1, opas 5, kohdejutut 2 = 20. Ei kuvatekstiä ilman nähtyä kuvaa, kuvannimiä, Commons-hakuja eikä generointia. Ei ennen–nyt-paria. Kuvaputki arvioi temppelin nykyisten rakennusvaiheiden/teosten ja asemamuutosten käyttökelpoisuuden; KL Tower/Petronas ei kuvaehdotus.

## 8. Sää

`saatiedot:null`: yhteisen 48/48 primääriauditoinnin hyväksyntä puuttuu. Oma saa.json säilyy koskematta. Oppaan laadullinen sää V:stä, ei asemadataa jäljitteleviä tai arvaavia lukuja.

## 9. Poisjätöt ja portit

Luonnoksen alkuvaiheen fengshui/suunta-väitettä ei löytynyt luetusta S-artikkelista. Se poistettiin kokonaan, vaikka väite olisi matkaoppaissa tuttu; temppelin nosto kirjoitettiin dokumentoidusta yhteisöhistoriasta. Brickfieldsin täsmennyssivu ei tukenut kaupunkiväitteitä, oikea kaupunginosan sivu haettu. Hokkien mee -reseptissä käytetään KL-version kalmaria/kalakakkua, ei Penangin katkarapureseptiä. Banaaninlehtiriisin otsikon ohjaus seurattiin todelliseen sisältöön. Ruokaperinteiden siirtymisen tarkat alkuperä- tai syyväitteet pois.

Täysi A-kartta, B-kuvat, sää, riippumaton D/E/F, hyväksyntä, pelikytkentä ja julkaisu avoinna. Tämä on lähteisiin perustuva tekstiluonnos, ei valmis erä.
