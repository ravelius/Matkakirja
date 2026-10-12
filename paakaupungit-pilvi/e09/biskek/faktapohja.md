# Biškek — rajattu A-lähdekooste, 12.10.2026

Omistus: e09/biskek, tehtävä 06. NAS-klooni e09. Tämä on rajattu tekstin lähdekooste, ei täysi A-hyväksyntä. Konteksti.json ja alkuperäinen Dakar-muotomalli luettu. Kuvatyötä, Git-operaatioita eikä pelikytkentää ei tehty.

## 0. Luetut lähteet ja hakutapa

Kaikki onnistuneet HTML-lähteet haettu yhteisellä `valiaikainen/sallittu_haku.py`-apurilla 12.10.2026: robots ensin molemmille agenteille, globaali verkkolukko ja yhden sekunnin väli, ohjaukset tarkistettu. HTML ja siitä irrotettu teksti tallessa `valiaikainen/nopea-e09-biskek/`. Lähde-SHA:t ovat siellä manifestissa. Ei Commons-kuvahakua eikä estettyjä /w/ tai /api/-polkuja.

- B1 https://en.wikipedia.org/wiki/Bishkek — johdanto; History / Tsarist era / Soviet era; Geography; Main sights; Culture; Transportation / Rail.
- B2 https://en.wikivoyage.org/wiki/Bishkek — Understand / History; Get in / Plane; Get around; See; Buy; Eat; Go next. Vanhentuvia linjanumeroita, hintoja, aikatauluja, turvallisuusyleistyksiä ja johdinautoväitteitä ei kopioida.
- B3 https://en.wikipedia.org/wiki/Osh_Bazaar — johdanto, myytävät tuotteet, kohteen oma koordinaattirivi.
- B4 https://en.wikipedia.org/wiki/Dordoy_Bazaar — Location and organization; Goods and customers; Transportation.

Alkuperäislähteistä kokeiltiin kaupungin historiaa (https://www.meria.kg/ru/history ja https://meria.kg/ru/history) sekä rautatietä (https://www.railway.kg/). Kaupungin robots-haku pysähtyi HTTP 301:een; rautatiesivu ohjasi pois sallitusta HTTPS-muodosta. Näistä EI käytetä faktoja. Huimin_Bao-artikkelipolku vastasi 404: tätä ei käytetä, vaan lehden olemassaolo tulee B1:n Culture-osiosta. Nostolla wiki Bishkek.

## 1. Perustiedot ja 1873

- Biškek on Kirgisian pääkaupunki, Ala-Too-vuoriston pohjoispuolella (B1 johdanto, B2 johdanto). Kaupunkipiste vain konteksti.json: 42.8667, 74.5667, Q9361.
- Kokandin kaanikunta rakennutti Pišpekin savilinnoituksen 1800-luvulla, ennen Venäjän vallan aikaista asutusta; pääkaupunkiasema ja nimi Frunze kuuluvat 1900-lukuun (B1 History, B2 History). Tekstin 1873-kehys on kronologinen sijoitus Pišpekin vaiheeseen, ei väite isoisän käynnistä, ulkoasusta tai tapahtumasta.
- Tarkan valtauksen vuoden ristiriita: B1 johdanto ja Tsarist era antavat 1860, B2 antaa 1862. Teksti ei valitse vuotta. Asutuksen perustaminen B1:n johdannossa 1868, uudelleenkehittäminen History-osiossa 1877: nämä ovat eri tapahtumia, joita ei yhdistetä yhdeksi perustamisvuodeksi.
- Kontekstin väkiluku koskee Biškekin hallinnollista kaupunkia vuonna 2022, ei metropolialuetta. Tarkkaa väkilukua ei käytetä C:ssä, koska itsenäistä kaksoisvarmennusta ei tehty.
- Nimen etymologia: B1 sanoo maidonhämmennyslastan alkuperää epävarmaksi ja mainitsee kaupungin kertoman sankaritarinan. Kumpaakaan ei kirjoiteta varmennetuksi nimen syntyhistoriaksi.

## 2. Artikkeli ja kannen neljä nostoa

- Keskustan ruutukaava, leveät kadut, neuvostoaikaiset kerrostalot sisäpihoineen ja keskustan ulkopuoliset pientalot (B1 johdanto / Geography / Housing).
- Dordoi on tukku- ja vähittäismarkkina kaupungin pohjois-/koillislaidalla. Alakontti toimii myymälänä ja yläkontti varastona; kujat, tavaralajien osastot, Kiinan tuonnin edelleenmyynti Kazakstaniin ja Uzbekistaniin (B4 johdanto / Location and organization / Goods and customers, B2 Buy). Konttien, työntekijöiden ja pinta-alan tarkat määrät jätetään pois.
- Sivurata yhdistää Biškekin Turkestan–Siperia-rataan; kaukojunien yhteydet kulkevat Kazakstanin kautta. Biškek II keskustan eteläpuolella, Erkindik-bulevardi asemalta museoalueelle (B1 johdanto / Geography / Rail, B2 Get in). Ei nykyisiä palvelulupauksia, matka-aikoja eikä liikennöintitiheyttä.
- Gamburgerissa dönerin tapaan leikattua lihaa, sämpylä, kaalisalaatti, kurkku, majoneesi, ketsuppi, perunalisuke; samsa ja šašlik katuruokaa; kirgisialainen, venäläinen ja uiguurilainen tarjonta (B2 Eat). B2 sanoo chips: käytetään väljää perunalisuketta, ei väitettä tietystä valmistustavasta.
- Huimin Bao on Biškekissä ilmestyvä dungaaninkielinen sanomalehti; kaupungissa myös kansalliskirjasto ja yliopistoja (B1 Culture / Education). Ei maailman ainoa -superlatiivia, ilmestymistiheyttä, aakkostoväitettä eikä lukijamäärää.

## 3. Historia-teemasivun neljä nostoa

- Pišpekin linnoitus → Venäjän vallan aikainen asutus → neuvostoaikainen pääkaupunki (B1 History, B2 History), vuosisadan tarkkuus, ks. ristiriidat yllä.
- Frunzen vanha kotitalo säilytetty museorakennuksen sisällä; Frunze syntyi kaupungissa; museossa myös kaupungin varhaista neuvostohistoriaa (B2 See / M V Frunze Museum, B1 Main sights / History). Ei syntymä-, rakennus- tai avajaisvuotta, sotatoimien yksityiskohtia eikä teoskuvia.
- Sovietskajan keskiosan virallinen nimi Jusup Abdrahmanov; vanha nimi puheessa. Tšui-katu oli Lenin-katu, Erkindik Dzeržinskin bulevardi; Erkindik = vapaus (B1 Geography). Nimenmuutosten tarkat vuodet jätetään pois.
- Kerrostalojen sisäpihat ja pientalot (B1 johdanto, Housing). Ei pääteltyä syytä eri asumismuodoille eikä yleistystä kaikkien asukkaiden arjesta.

## 4. Matkailuopas, viisi jaksoa

1. Manasin lentoasema kaupungin ulkopuolella, bussit/maršrutkat/taksit, Biškek II ja kävely (B2 Get in / Get around, B1 Rail). Osoitteen tallentaminen kyrillisin kirjaimin on toimituksen käytännön suositus. IATA-koodi avoin: B2:ssa BSZ, vanhaa FRU:ta ei kopioida.
2. Erkindik, historiallinen museo ja Frunzen kotimuseo (B1 Geography / Main sights, B2 See). Aukioloaikoja ja hintoja ei käytetä.
3. Osh-tori ja Dordoin eri roolit (B2 Buy, B3, B4). B4 sanoo, ettei Dordoi ole varsinainen tuoretavaramarkkina; Osh ruokatorin vaihtoehto.
4. Bešbarmak, plov, šašlik, samsa, lagman, gamburger (B2 Eat).
5. Ala-Archa ja Alamedinin laakso lähiseudun retkinä (B2 Go next, B1 Main sights). Kuljetuksen, reitin ja päivän sään selvittäminen on suositus, ei ilmastoväite.

## 5. Kysymykset, tiedot ja minitehtävä

Viisi kysymystä: maa (B1), Dordoin kontit (B4), vanha kaupunginnimi (B1), gamburgerin liha (B2), sivuradan verkko (B1). Tasot 1/2/2/2/3. Gamburgerin ainoa täsmällinen lähde on Wikivoyage, joten tarkistimen Wikipedia-source-varoitus raportoidaan.

Kolme tietoa: Osh-tori Biškekissä (B3), dungaanilehti (B1 Culture), Erkindikin reitti (B1 Geography). Minitehtävä: Frunzen museon sisälle säilytetty koti, vastaus historian nostossa 2; ei toista kaupungin nimikysymystä.

## 6. Kartta ja kohdejuttu — partial

Varmennettu kohteen oma WP-piste: Osh-tori, https://en.wikipedia.org/wiki/Osh_Bazaar, koordinaattirivi 42.875° N, 74.570° E; JSON-esitys 42.87500 / 74.57000, ei lisättyä lähdetarkkuutta. Torikokonaisuuden tyyppi aukio: käsitellään markkinapaikkana, ei yksittäisenä rakennus- tai taideteoksena. Juttu B3:n tuotteista ja kulttuurisista tavaroista. Perustamisvuosi B3:ssa 1983, C:ssä vain 1900-luku ja siten ei vielä 1873.

Karttarajaus johdetaan kohteen omasta pisteestä noin 300 m marginaalilla: N 42.87800 / S 42.87200 / W 74.56600 / E 74.57400. Kaupunkipistettä ei lainata kohteelle. Vain yksi kohde: tavoite 6–8 jää avoimeksi, ei väite pikkukaupungista. Dordoin laajempi alue ei täydennä historiallista ydintä; modernit museot, patsaat ja arkkitehtuurikohteet eivät saa korvata puuttuvaa tekijäketjun auditointia.

## 7. Kuvat

B-valintaa ei ole. Valokuva 1, kansi 3, nostot 8, matkailijalle 1, opas 5 ja kohdejuttu 1: yhteensä 19 tyhjää roolia. Kaikki neljä kenttää tyhjiä. Ei kuvatekstejä ennen nähtyä kuvaa. Suojatut monumentit ja museorakennukset eivät ole kuvatilaus.

## 8. Sää

Saa.json on olemassa, mutta 48/48 primäärivarmennusta ei ole tämän kirjoittajan käytettävissä. Saatiedot:null. Oppaassa ei asteita, sateita eikä ilmastonormaalien lukuja. Saa.jsonia ei muuteta.

## 9. Avoimet portit

Täysi A ja kartan 6–8 kohteen aineisto; ensikäden lähteiden täydentäminen; B-kuvat; sääauditointi; D:n riippumaton väitekohtainen tarkistus; E/F; omistajan hyväksyntä, pelikytkentä ja julkaisu. Tämä teksti ei täytä koko kaupungin tuotantoporttia.
