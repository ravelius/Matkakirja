# Mbabane — rajattu A-lähdekooste ja C:n faktapohja

Luettu 12.10.2026. Omistus vain e08/mbabane. Nopea lähdekooste tekstityöhön; ei hyväksytty A/B/D/E/F-kokonaisuus. Kuvat erillisessä putkessa. Konteksti luettu tästä NAS-kloonista.

## 0. Lähteet ja 1873-kehys

Haettu yhteisellä `sallittu_haku.py`:llä: robots ensin, molemmat User-Agentit ja jokainen uusi/ohjattu polku tarkistettu, yhteinen sekunnin hakuintervalli. HTML, tekstipoiminnat, robots-todisteet, hakutulos- ja SHA-tallenteet omassa `valiaikainen/nopea-e08-mbabane/`-hakemistossa. Ei estettyjä API-polkuja eikä PDF-kiertoa. Lähteiden tekijänoikeutta ei tulkita kuvankäyttöluvaksi.

| Tunnus | Luettu lähde ja osio | Tallenne |
|---|---|---|
| E1 | [en-Wikipedia: Mbabane](https://en.wikipedia.org/wiki/Mbabane), alku, History, Geography, Climate, Culture, Education | mbabane.html/txt |
| E2 | [en-Wikivoyage: Mbabane](https://en.wikivoyage.org/wiki/Mbabane), Understand, Get in, Get around, See, Eat | opas.html/txt |
| E3 | [UM: Eswatini](https://um.fi/matkustustiedote/-/c/SZ), turvallisuustaso, Liikenne, Luonnonolot | um.html/txt |
| E4 | [Eswatinin matkailusivusto: Mbabane](https://www.thekingdomofeswatini.com/central-eswatini/mbabane/), kaupungin esittely ja historia | matkailu-virallinen.html/txt |
| E5 | [en-Wikipedia: Sibebe](https://en.wikipedia.org/wiki/Sibebe), alku | sibebe.html/txt |
| E6 | [en-Wikipedia: Malolotja National Park](https://en.wikipedia.org/wiki/Malolotja_National_Park), alku, Environment, Tourism; haku Malolotja_Nature_Reserve ohjautui tähän artikkeliin | malolotja.html/txt |
| E7 | [en-Wikipedia: Ngwenya Mine](https://en.wikipedia.org/wiki/Ngwenya_Mine), alku, Phase 1/2/3 | ngwenya.html/txt |
| E8 | [en-Wikipedia: Waterford Kamhlaba](https://en.wikipedia.org/wiki/Waterford_Kamhlaba), alku | koulu.html/txt |
| E9 | [UNESCO: Ngwenya Mines, tentative list](https://whc.unesco.org/en/tentativelists/5421/), Description | ngwenya-unesco.html/txt |
| E10 | [en-Wikipedia: Eswatini](https://en.wikipedia.org/wiki/Eswatini), Geography, Climate; muita osioita ei käytetä | maa-maantiede.html/txt |
| E11 | [Wikidata: Sibebe Q7506963](https://www.wikidata.org/wiki/Q7506963), oma P625 coordinate location | sibebe-wikidata.html/txt |
| E12 | [Eswatinin matkailusivusto: Sibebe](https://www.thekingdomofeswatini.com/central-eswatini/sibebe-rock/), retkimaisema ja reittiohjeet | sibebe-virallinen.html/txt |
| E13 | [Waterford Kamhlaba](https://www.waterford.sz/), yhteisö- ja kulttuurinen moninaisuus, Community Activities Service | koulu-virallinen.html/txt |
| E14 | [Mbabanen kaupungin sivusto](https://www.mbabane.org.sz/), etusivu | kaupunki-virallinen.html/txt |

Kaikki taulukon sivut saatiin HTML-tallenteina; hakutulokset näkyvät haut-01–04.json:ssa. E14:n etusivusta ei oteta uusia historia-/tilastoväitteitä. Epäonnistunutta tai estettyä sivua ei käytetä todisteena. Mbabanen matkailusivun alkuperäinen north-western-polku ohjattiin central-eswatini-polulle; uusi polku tarkistettiin apurilla.

**1873:** E1 ajoittaa modernin kauppapaikan kasvun 1800-luvun loppuun ja hallinnon siirron 1900-luvun alkuun. E4 kertoo paikallisen Mbabane Kunene -päällikön asettumisesta alueelle jo ennen myöhempää siirtomaakaupunkia. Vuoden 1873 kohdalla ei väitetä alueen olleen asumaton; nykyinen hallintokaupunki kasvoi vasta myöhemmin. E1/E4:n tarkka hallinnon siirtovuosi poikkeaa toisistaan, joten C:ssä vuosisatataso. Ei isoisän käyntiä, lainausta tai tekemistä. Luontokallion historia ei ala kaupungin perustamisesta; Ngwenyan pigmenttikaivostoiminta on kivikautista (E7/E9).

## 1. Perusfaktat ja kontekstin erot

- Mbabane on Eswatinin eli pelin Swazimaan hallinnollinen pääkaupunki; Lobamba on kuninkaallinen ja lainsäädännöllinen keskus (E1 alku ja annettu konteksti). Roolit ovat hallinnollisia perustietoja, ei nykypolitiikkaa.
- Kaupunki sijaitsee Hhohhon alueella, Mdzimba-vuoristossa, Mbabane-joen ja sen sivujoen Polinjanen luona, Highveld-ylängöllä (E1 Geography, E10 Geography). E4 käyttää kaupunkia kehystävistä kukkuloista Dlangeni-nimeä; sitä ei samasteta Mdzimba-nimen synonyymiksi.
- Kaupungin kehitys liittyi Transvaalista Mosambikiin kulkeneen reitin joenylitykseen. Mbabane Kunene on paikannimen paikallinen henkilötausta (E1 History). Siirtomaa-ajan kaupunki rajoitti swazien asumista kaupunkialueella (E1 History); historiasta ei tehdä eurooppalaisen perustajan sankaritarinaa.
- Eswatini on sisämaavaltio; kaupungin ylänköasema ei kuvaa koko maan maastoa tai ilmastoa (E10 Geography/Climate).
- Kontekstin väestöluku on **Mbabanen kaupungin laskentaluku**, ei Hhohhon alueen tai metropolialueen luku. Kontekstin tarkkaa väestöä/vuotta ei viedä C:hen: nykyhaussa ei saatu kahta riippumatonta tukea. Citypopulation-linkkiä ei haeta tai käytetä uudelleen todisteena.
- Tarkat korkeudet, etäisyydet, pinta-alat, oppilasmäärät, perustamisvuodet ja geologiset ikäluvut pois C:stä. Siswati ja englanti ovat käytännössä kaupungin kieliä (E1/E2).

## 2. Kannen neljä nostoa

| Nosto | Faktojen käyttö |
|---|---|
| Pääkaupungin tehtävät jaettiin | Mbabane hallinnollinen pääkaupunki, Lobamba kuninkaallinen/lainsäädännöllinen keskus; Mbabane Hhohhon alueella ja sen keskus; Swazi Plaza/Mbabane Mall keskustan sydän pankkeineen, kauppoineen ja palveluineen (E1 alku/Geography, E4). Ei hallinnon henkilöitä, vaaleja tai vallankäytön kommenttia. |
| Joenylitys ei ollut tyhjä lähtöruutu | Transvaal–Mosambik-reitin Mbabane-joen ylitys; kasvu 1800-luvun lopussa; nimi paikallisesta Mbabane Kunenesta; hallintokaupunki vasta 1900-luvun alussa; swazien asumisrajoitus siirtomaa-ajan kaupungissa (E1 History, E4). Ei keksittyä 1873-tapahtumaa tai talon ulkoasua. |
| Galleria on myös tekstiilien paikka | Indingilizi Galleryssa swazitaidetta: maalauksia, veistoksia, batiikkeja, mohairtuotteita, koruja ja keramiikkaa (E1 Culture). Ei taideteosten kuvia/kohdepistettä, tekijöitä tai gallerian tarkkaa perustamisvuotta. Otsikon havainto perustuu valikoimaan, ei oletukseen näyttelyiden nykyisestä sisällöstä. |
| Koulu avasi ovet eri taustoille | Waterford Kamhlaba kaupungin lähellä, Michael Sternin perustama 1900-luvun jälkipuoliskolla; hyväksyi oppilaita eri rodullisista/etnisistä taustoista vastauksena naapurimaan apartheidiin; osa United World Colleges -verkostoa, IB ja IGCSE (E8); E13:n CAS-ohjelmassa luovuus, liikunta ja yhteisötyö. Historiallinen apartheid-maininta neutraali; ensimmäinen-superlatiivi, oppilas-/verkostomäärä ja tarkat vuodet pois. Suojattu Pancho Guedes -kampus ei kartta-/kuvakohteeksi. |

## 3. Teema: luonto — Kalliolta ruohomaille

| Nosto | Faktojen käyttö |
|---|---|
| Sibebe on graniittia | Graniittivuori Mbabanen lähellä ja Mbuluzi-joen laakson yllä; englanninkielinen Bald Rock -nimi; Rotaryn Sibebe Survivor -hyväntekeväisyyskävely (E5); E12: lohkareet, paljaat rinteet, metsäiset uurteet, ruohomaat, merkitty polku, paikalliset oppaat ja liukas kallio sateen jälkeen. Ei toiseksi suurin/suurin -väitettä, tarkkaa korkeutta, ikää, etäisyyttä eikä osallistujamäärää. |
| Luonto jatkuu valtiorajan yli | Malolotjan suojelualue Eswatinin luoteisosassa; avoimia ruohomaita, jokivarsien pensastoja ja vuoristometsää; seebrat, anteloopit; putous/jokilaaksot; liittyy Etelä-Afrikan Songimveloon rajat ylittävässä suojelukokonaisuudessa; kävelymahdollisuuksia (E6). Ei eläinhavaintotakuuta, pinta-alaa, polkukilometrejä tai putoussuperlatiivia. |
| Malmi oli ensin väriä | Ngwenya/Bomvu Ridge Mbabanen luoteispuolella; hematiittiesiintymästä punaista okraa ja kiiltävää spekulariittia; kivikautinen väriainekäyttö ja myöhempi raudansulatus eri vaiheita; pigmentit kalliomaalauksissa, kaivutyökaluja (E7/E9). UNESCO-sivu on aieluettelo, ei maailmanperintöstatuksen todiste. Ei ennätys- tai tarkkaa ajoitusväitettä, ei nykykaivoksen politiikkaa. |
| Ylänkö ei ole koko maa | Mbabane Highveldillä, Middleveld alempana, Lowveld alankoa ja idässä Lubombo-vuoriharju; Lowveldillä piikkipuita/ruohoa, lännessä vuoristomaisemia; maaston korkeus liittyy ilmastoeroihin (E10 Geography/Climate, E1 Climate). Ei metrien, asteiden, sademäärien tai tarkkojen vyöhykemäärien kertomusta. |

Minitehtävä: mihin eteläafrikkalaiseen suojelualueeseen Malolotja liittyy? Songimvelo löytyy teeman nostosta. Ei toista viisikkoa; fakta omin sanoin.

## 4. Viisijaksoinen opas

1. **Perille ja liikkeelle:** King Mswati III International Airport, SHO (E2); kentältä sovittu kuljetus, keskusta käveltävä (E2 Get around). E3 sanoo julkisen liikenteen olevan turvatonta ja pimeällä ajamista/liikkumista tulee välttää. Ei lentoyhtiöitä, aikatauluja, hintoja tai taksilupauksia keskustassa.
2. **Keskustan kierros:** Swazi Plaza ja Mbabane Mall palvelujen keskittyminä (E4), ajoittaiset avomarkkinat (E2 See), Indingilizin taide-/materiaalikirjo (E1). Ei avoinnaololupausta gallerialle tai torille.
3. **Sibebe ja ylängön retket:** Sibebe lähellä kaupunkia (E5), merkitty reitti, paikalliset oppaat ja märän kallion liukkaus (E12), Malolotja ja Ngwenya seudun erillisinä retkinä (E6/E7). Luontoretkeä ei esitetä keskusta- tai museokorttelin kävelynä. Lähtö-/paluukuljetus päiväsaikaan ja ajantasainen paikallinen reittitieto (E3:n turvallisuus/luonnonolot; toimituksellinen käytännön ohje).
4. **Mitä täällä syödään:** bhatata = bataatti, emasi = hapanmaito (E2 Eat); keskustassa ravintoloita, kahviloita, pikaruokapaikkoja (E4). Ei fiktiivistä omaa reseptiä, ravintolaa, tarkkaa ateriakokonaisuutta tai ruokaperinteen syntyä.
5. **Milloin kannattaa tulla:** leuto ylänköilmasto, kesäsateet, viileät talviyöt (E1/E2); vuoriston voimakkaat sateet voivat aiheuttaa tulvia (E3). Säärivi null ja vain laadullinen kuvaus. Ei ilmastokuukausia/-lukuja.

Parasta 5: keskustakierros, Indingilizin valikoima, Sibeben kallio, Malolotjan erillinen retki, emasin/bataatin maistaminen. Tähtiarvosanat toimituksellisia. Hyvä tietää 4: päiväsaikaiset siirtymät; oikea paikallinen reittitieto; siswati/englanti; Malolotja ja Ngwenya eivät ole keskustan paikkoja. Matkailijan tulee noudattaa erityistä varovaisuutta. Ei UM:n nykypolitiikan, konfliktien tai rikollisuuden kertomusta lukijan tekstiin.

## 5. Kartta: partial, Sibeben oma piste

E5: Sibeben WP-artikkelissa ei ole koordinaattia. E11:n Sibebe-kohteen **oma P625** on `26°15'45.43"S, 31°10'21.07"E` = −26.262619444..., 31.172519444...; C:hen viiden desimaalin −26.26262, 31.17252. Kyse on Sibeben kallion, ei Mbabanen hallinnon pisteestä. Wikidatan väitteellä on 0 viitettä; itsenäinen D-tarkistus vielä avoin. E2:n retkikohdepiste on samassa ympäristössä, mutta sitä ei lainata sijainniksi.

Sibebe on luonnonmuodostuma, ei rakennus tai suojattu teos. Karttaan yksi luontokohde ja oma 2-kappaleinen juttu; kuvarooli tyhjä. Rajat −26.25962…−26.26562, 31.16918…31.17586, noin 300 m marginaali **pisteeseen**, ei koko vuoren mittaus tai ääriviiva. Sibebe on kaupungin lähellä, keskustan ulkopuolella; kartta on tarkoituksella keskeneräinen. Keskustan historiallisista rakennuksista ei saatu oman pisteen/faktaketjun/oikeusauditoinnin kokonaisuutta. Kuuden kohteen portti ei täyty.

Malolotja ja Ngwenya ovat selvästi keskustan ulkopuolella ja laajentaisivat kartan koko seudun kartaksi. Ngwenyan WP-sivulla on lisäksi kaksi eri pistettä; ne eivät kelpaa hiljaisesti valittuun kaupunkikarttaan. Koulu-/galleriarakennusten tekijäketju ja oikeudet eivät täyty: ei kohteita. Modernia rakennusta ei nimetä luontopaikaksi.

Sibebe-jutun 1873-kehys: graniittimuodostuman historia on paljon kaupungin hallintoroolia vanhempi. Ei väitetä matkaajan käyneen kalliolla, kulkeneen polulla tai nähneen täsmällistä paikallista ulkoasua. Tarkempi geologinen syntyikä jää pois.

## 6. Kysymykset ja tiedot

Viisikko: maa Eswatini (E1, taso 1); Sibeben graniitti (E5, taso 2); Ngwenyan punainen okra ennen raudansulatusta (E7/E9, taso 3); Highveld-ylänkö (E10, taso 2); Waterfordin UWC-yhteys (E8, taso 3). Vastaukset kannessa/teemassa, vihje ei sisällä vastausta. Kolme tietoa: paikannimen Mbabane Kunene (E1/E4), torin/gallerian ja suurkaupungin tilastojen sijaan erilaisten materiaalien taide (E1), luontokokonaisuuden valtiorajan ylitys (E6). Ei isoisän ääntä.

## 7. Kuvat odottavat kuvaputkea

19 tyhjää roolia: valokuva 1, kansi 3, nostot 8, matkailijalle pysty 1, jaksot 5, Sibebe-jutun kuva 1. Neljä kenttää kaikissa tyhjiä. Ei kuvanhakua, generointia, keksittyjä nimiä tai ennen–nyt-paria. Kalliota ja luontoa voi ehdottaa erilliseen kuvaputkeen; koulu, Indingilizin teokset ja nykyiset monumentit eivät ole kuvatilauksia. Kuvaputki tekee myös henkilökasvo-/suojattu teos -rajauksen.

## 8. Epävarmuudet ja numerot

- E1:n 1902 ja E4:n 1903 hallinnon siirrosta ristiriitaisia → 1900-luvun alku.
- E1:n infolaatikon perustamisvuosi ja Historyn perustamisvuosi eri → kasvu 1800-luvun loppu, hallintorooli 1900-luvun alku.
- E4:n Kunene-ajoitus paljon aikaisempi kuin E1:n yleinen päällikkötausta → vain paikallinen nimiyhteys, ei henkilön elinaikaa.
- E1/E4:n kaupunkiväestön luku ei vastaa kontekstin kaupungin laskentalukua; ei vaihdeta hiljaa laajuutta, vaan luvut jätetään pois.
- E7/E9 kaivoksen tarkat ikäluvut ja BC/BP-tavat vaihtelevat → kivikausi. Ei vanhin-kaivos-/maailmanperintöväitettä. Pigmentin ja raudansulatuksen vaiheet erotetaan.
- E12 kutsuu Sibebeä volcanic slab -muodostumaksi ja antaa suuren pinta-alaluvun; E5 sanoo granite pluton. Varmasti käytettävä muoto on graniittimuodostuma. Ei tulivuoren syntytarinaa, pinta-alalukua tai täsmällistä geologista ikää. E12:n reitti- ja kasvillisuusfaktat käytetään erikseen. Sibeben ennätys, korkeus, etäisyys, ikä ja osallistujamäärät pois. Oma P625-piste viitteetön; D-paikannusauditointi avoin.
- E2:n matkailutoimiston koordinaatti on ilmeisen kaukana väärässä leveysasteessa ja Hawanen Ramsar-maininta varmentamatta → kumpaakaan ei käytetä.
- `saatiedot: null`: koko joukon 48/48 primäärivarmennus puuttuu tässä työssä. Ei säähaun uusintaa tai saa.json-muokkausta.

## 9. Poisjätöt ja seuraavat portit

Maalehteä ja lähikaupunkilehtiä ei kontekstissa ole. Kevyt kuvaus sisältää vuoristosijainnin, syntyvaiheen ja hallinnon aseman; uudessa sisällössä niitä syvennetään paikannimen/asumisrajoitusten, taidemateriaalien ja kouluhistorian kautta. Maan nimenvaihdos ja nykyhallinnon poliittinen muoto eivät ole uusia nostoja. Tarkat tilastot, kaivospolitiikka, modernit tekijänoikeudella suojatut rakennukset/teokset kuvina tai karttakohteina sekä keksityt paikalliset näkymät pois. Riippumaton D/E/F, kuvat, kartan täydennys, sääauditointi, hyväksyntä, kytkentä ja julkaisu tekemättä.
