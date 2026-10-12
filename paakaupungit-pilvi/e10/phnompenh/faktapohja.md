# Phnom Penh — rajattu A-kooste C-kirjoitusta varten

Omistus: e10/phnompenh, rinnakkaistehtävä 10. Luettu 12.10.2026. Ei täysi A-hyväksyntä: kartassa vain yksi varmennettu ehdokas, B/D/E/F ja sääauditointi avoinna. Alkuperäiset HTML:t, tekstit, hakuloki ja myöhemmin SHA:t: NAS-juuren `valiaikainen/nopea-e10-phnompenh/`. Haut yhteisellä `sallittu_haku.py`:llä; robots tarkistettu jokaiselle polulle ja redirectille. HTTP-virhe ei ole lähde.

## 0. Lähteet ja väitteiden jäljitettävyys

| Tunnus / tallenne | Luettu sivu, osio | Käytetyt väitteet / tekstikentät |
|---|---|---|
| P / phnom | https://en.wikipedia.org/wiki/Phnom_Penh — alku, Etymology, Geography, Water supply | Pääkaupunki Kambodžassa; Tonlé Sap–Mekong-yhtymä ja Bassacin alku; Chaktomuk-nimen merkitys; vesilaitoksen hävikin vähentäminen, jatkuva jakelu, asiakaskunnan kasvu ja talouden muutos. Intro, artikkeli, kansi N4, kysymykset 1–2. |
| V / voyage | https://en.wikivoyage.org/wiki/Phnom_Penh — Orientation, Get in/By plane, Get around, See, Understand | Parittomat kadut pääosin N–S, parilliset W–E; numerosarjojen kasvusuunnat ja poikkeukset, epäjärjestyksiset talonumerot; Sisowath Quay, taksi/tuk-tuk/sovellukset; palatsin pukeutuminen ja kuvausrajoitukset; kuuma/kostea ja sadekauden iltapäiväkuurot. N2, kysymys 4, opas ja käytännön rivit. Kysymyksen ainoa source on Wikivoyage: aidosti sitä tukeva lähde, ei perusteeton WP-linkki. |
| T / tonle | https://en.wikipedia.org/wiki/Tonl%C3%A9_Sap — Hydrology, Volume fluctuation and flow reversal | Järvi muualla kuin Phnom Penh, sama joki yhdistää sen Mekongiin; Mekongin vedenpinnan nousu vaihtaa virtaussuunnan, lasku antaa järven purkautua takaisin. Intro, artikkeli, N1, tieto 1, opas 2. Ei järven koordinaattien lainaamista kaupunkikohteelle. |
| M / museum | https://en.wikipedia.org/wiki/National_Museum_of_Cambodia — alku, History, Collections, oma koordinaatti | Groslier suunnitteli khmertemppelien esikuvia sovittavan museon; 1900-luvun alkupuolen rakennus, sisäpiha, veistokset/keramiikka/pronssit/kansatiede ja säilyttäminen. N7, artikkeli, kysymys 5, tieto 3, opas, nähtävyysjuttu ja kartta. |
| R / palace | https://en.wikipedia.org/wiki/Royal_Palace_of_Cambodia — History, Napoleon Pavilion | Norodom toi hovin kaupunkiin 1800-luvulla; rautapaviljonki on Docros-yrityksen kuninkaalle valmistama tehdasvalmisteinen valurautahuvila; maison de fer -nimi. N5, intro, 1873-kehys. HUOM: nykyinen lähde kyseenalaistaa keisarin lahja/Suezin avajaiset -kertomuksen. |
| C / market | https://en.wikipedia.org/wiki/Central_Market_(Phnom_Penh) — alku, History | Phsar Thum Thmei = New Grand Market; art deco, kupoli ja hallisiivet, Jean Desbois/Louis Chauchon, kuivattu kosteikko ja 1900-luvun alkupuolen rakennus. N6. Ei superlatiivia, tarkkaa korkeutta, vuotta tai hallisiipien määrää. |
| O / ounalom | https://en.wikipedia.org/wiki/Wat_Ounalom — alku | Phnom Penhin buddhalainen luostari. Opas 3/parasta. Ei silmäripsäreliikkiä tai tarkkoja vuosia. |
| K / kuyteav | https://en.wikipedia.org/wiki/Kuyteav — alku, Preparation, Consumption and culture | Riisinuudelit ja sianlihaliemi, aamiainen, kuivassa versiossa liemi erikseen; Phnom Penh -version liha- ja katkarapulisukkeet. N3, kysymys 3, intro, opas 4. Ei suurin/parhain-luokitusta eikä vaurauden syy-seurausväitettä. Wikipedian Preparation/Consumption-osioissa lisälähteitä toivovat huomautukset: riippumattoman D-tarkistuksen erityinen kohde. |
| U / ballet | https://ich.unesco.org/en/RL/royal-ballet-of-cambodia-00060 — Description | Khmerhoviin liittyvä tanssi, seremoniallinen tehtävä, eleet/asennot välittävät tunteita, pitkä harjoittelu, orkesteri ja naiskuoro kommentoi juonta. N8, artikkeli. Ei UNESCO-vuosia, kestoa tai hahmotyyppien tarkkaa lukumäärää. |

Primäärisivujen lisäyritykset: museon etusivu palautti HTTP 200 mutta vain Index-tekstiä, eikä sitä käytetty. MRC-etusivu palautti HTTP 200, mutta ei tukenut tämän luonnoksen yksittäisiä hydrologisia väitteitä, eikä sitä käytetty. https://www.techoairport.com/ epäonnistui DNS-nimiselvitykseen (URLError Errno 8): ei lähde eikä onnistunut robots-varmennus. Techo/KTI perustuu V:n ajantasaiseen By plane -kohtaan, toimijavarmistus avoinna. Wikidata Q1850 ja kaupungin pallo tulevat hyväksytystä kontekstista, eivät uuden karttakohteen pisteenä.

## 1. Konteksti ja rajaus

Konteksti luettu omasta `konteksti.json`:sta. Kevyen pisteen Wat Phnom/Lady Penh -nimitarina, pääkaupungin yleiskuva ja tunnusrakennusluettelo eivät ole uusien nostojen aiheita. Maalehteä tai lähikaupunkien nostoja ei ole kontekstissa. Artikkeli nimeää välttämättömän pääkaupunkiaseman, mutta uudet oivallukset ovat veden suunta, osoitenumerointi, erillinen liemikulho, vesihuolto sekä rakennusten ja tanssin historia. Ei nykypolitiikkaa eikä nykykonfliktia.

## 2. 1873-kehys ja tarkkuus

1873 on pelin kaanonin vertailuvuosi, ei uusi paikallinen tapahtumavuosi. Kaupunki oli pääkaupunki ennen sitä: P ajoittaa paluun 1865, R hovin/palatsin paluun 1866. Näitä ei esitetä yhtenä täsmällisenä vuotena. Teksti kertoo vain jo olemassa olleesta pääkaupungista. Kansallismuseon nykyinen rakennus syntyi 1900-luvun alussa ja puuttui 1873. Ei isoisän reittiä, tekemisiä, sitaatteja tai ulkoasukuvausta tuolle vuodelle.

Rakentamisvuodet yleistetty vuosisadan osaksi. N3:n astiakuvaus ei esitä reseptin tarkkoja määriä. Väestölukua ja pinta-alaa ei käytetä; kontekstin 2019-luku on Phnom Penhin hallintoalueen aineistoa, sitä ei muuteta metropoliluvuksi. Chaktomuk-nimen 'neljä kasvoa' on nimen merkitys, ei uusi mitattu lukumäärä. Rakennusnimen Napoleon III järjestysnumero säilyttää nimen.

## 3. Kansi ja teema

Kansi, 4 nostoa: joki vaihtaa suuntaa / katujen numerointijärjestelmä / kuy teav erillisellä liemellä / vesilaitoksen hävikin korjaus. Teema `historia`, 4 nostoa: valurautainen paviljonki / kosteikolle tehty tori / khmermuotoja sovittava museo / hovin tanssin eleet. Minitehtävä kysyy paviljongin materiaalia ja ratkeaa N5:stä; kaupungin visassa ei kysytä samaa.

## 4. Oppaan pohja

Viisi jaksoa: perille/liikkuminen; jokiranta; museo/palatsi/luostari; kuy teav; milloin tulla. V on pääasiallinen käytännön lähde, U/M/K syventävät. Ei hintoja, aukioloaikoja, matka-aikoja, etäisyyksiä eikä lääketieteellisiä ohjeita. Lentoaseman nimivarmistus omalta toimijalta jäi avoimeksi: kokeiltu verkkotunnus ei ratkennut DNS:ssä, eikä airport.txt syntynyt. Ei turvallisuusväitettä pelkästä varoituksen puuttumisesta.

## 5. Kohdekartta — partial

Ainoa mukaan tuleva kohde: **Kambodžan kansallismuseo**, oma M-artikkelin piste 11.56580 N, 104.92900 E (koordinaattiosio). Numerot ovat paikan identifioiva piste, eivät lähteettä arvioitu etäisyys. Rajat tästä pisteestä noin 300 m marginaalilla: N11.5688/S11.5628/W104.9260/E104.9320; tekninen rajauslaskenta, ei lähteen maantieteellinen väite.

M nimeää arkkitehdiksi George Groslierin (kuollut 1945, lähteen henkilötiedot). Tekijän kuolemasta yli 70 vuotta; tarkkaa kuolinvuotta ei viedä lukijatekstiin. Kohde on museorakennus, ei nykyteos museossa. Kuva vielä avoin ja B arvioi mahdolliset näkyvät teokset erikseen. Keskusmarkkinat eivät ole kartta-/kuvaehdotus: Desboisin tekijäketjun käyttökelpoisuutta ei ole itsenäisesti selvitetty. Palatsin nykyisten rakennusvaiheiden ja Ounalomin jälleenrakennuksen tekijäketjut puuttuvat; niitä ei viedä kartalle. Tarvitaan vähintään viisi muuta kelpoista omaa pistettä täyden A-portin saavuttamiseen. Suojattuja rakennuksia ei naamioida luontokohteiksi.

## 6. Visa ja tiedot

Viisi kysymystä: pääkaupungin maa (1), Bassacin lähtökohta (2), kuy teavin liemi (2), katunumeroiden pääsuunta (3), museorakennuksen aikakausi (2). Vihjeet eivät paljasta oikeaa vastausta. Kolme tietoa: järvi/joki eri paikat, katu-/talonumerot, museon ja esineiden eri ikä. Tiedot ovat nuoren havaintoja ilman isoisän ääntä.

## 7. Kuvatarpeet

B puuttuu kokonaan. Jokaisessa kuvaroolissa `tiedosto`, `lyhyt`, `selite`, `lahde` tyhjät. Ei Commons-hakuja, kuvanimiä, keinotekoisia credittejä eikä generointia. Tarpeet: valokuva 1; kannen yleiskuvat 3; nostot 8; matkailijalle pysty 1; oppaan roolit 5; museojuttu 1 (yhteensä 19 tyhjää roolia). Ennen–nyt-paria ei keksitä. Kuvaputki ratkaisee paviljonki/tori-aiheen toteutuksen ilman suojattujen teosten kuvaamista.

## 8. Sää

`saatiedot:null`. Olemassa oleva `saa.json` säilyy koskemattomana; 48/48 primääriauditointi ei ole tämän session hyväksymä. Oppaan laadullinen kuuma/kostea ja sadekauden iltapäiväkuurot perustuvat V:hen. Ei kuukausia, lämpötiloja tai sademääriä.

## 9. Poikkeamat ja avoimet portit

- Lähteen palatsi/Napoleon-tarina ei tue populaaria keisarin lahjakertomusta; se poistettu. Tehdasvalmistuksesta ei päätellä dokumentoimatonta purku-/uudelleenkokoamiskertomusta.
- Keskusmarkkinoiden History nimeää kosteikon, ei täytettyä järveä; käytetään kuivattua kosteikkoa.
- M:n alussa rakennusvaiheet 1917–1924, inauguratio 1920; yleistys 1900-luvun alkupuoleen. Ei tarkkoja vuosia lukijalle.
- Kuyteav-lähteen lisälähdetarve ja palatsin rautapaviljongin nimihistoria D:n tarkistettavaksi.
- Kartta partial (1/6), B ja sää avoimet, D/E/F tekemättä; tekstiluonnos ei ole valmis erä eikä pelikytkentä/julkaisu.
