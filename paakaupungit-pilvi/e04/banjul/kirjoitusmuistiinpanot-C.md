# Banjul — C-luonnos, avoimet kuvaportit

Kirjoitettu 11.10.2026 vain `sisalto.json` ja nämä muistiinpanot. Väliaineisto NAS-kansiossa `valiaikainen/banjul-C/`. Ei git-toimia, uusia agentteja, pelitiedostomuutoksia, Commons-hakuja, kuvanmuokkausta tai generointia. **C ei ole valmis vaihe eikä kaupunki toimitusvalmis.** Luonnos on tarkoitettu D:n tarkistukseen ja avoimien kuvaporttien korjaukseen.

Luettu PILVIOHJE 7/8C/13/LISÄSÄÄNTÖ sekä lehtityöreseptin, kaupunkilehden ja spec-mantereiden sitovat osat. Banjulin faktapohja, konteksti, säädata ja B:n lopullinen kuvat.md/selected.json/provenance.json luettu. Dakar-mallista vain rakenne: sen vanhat `artikkeli`-, `avauskuvat`- ja havainnekuvakäytännöt eivät siirtyneet uuteen tiedostoon. Sisällössä on `artikkeli.teksti`, ei mallin vanha saman niminen alikenttä.

## Tarkistin ja kaksi aitoa puutetta

Alkuperäinen tarkistin `node paakaupungit-pilvi/tyokalu.mjs tarkista e04 banjul` ajettiin C:n tekstien ja skeeman korjauksien jälkeen. Alla on historiallinen C-tulos; nykyinen E-tulos on tämän tiedoston lopun täsmennyksessä:

```text
VIRHE banjul: matkailijalle.kuva: tiedosto puuttuu
VIRHE banjul: juttu Albertin tori: kuvia 1–3
VAROITUS banjul: kysymys 4: source ei ole Wikipedia-artikkeli
VAROITUS banjul: kohteita 3 (pohjataso 6; perustele RAPORTTI.md:ssä)
== banjul: 2 virhettä, 2 varoitusta, 17 kuvaa
```

- Matkailijalle-osion kuva on tarkoituksella **tyhjä olio `{}`**. Kelvollista tuoretta maltillista pystyä ei B:ssa löytynyt. Ei väärää tiedostoa, rajauskiertoa tai hylättyä torikuvaa puutteen peittämiseksi.
- Albertin torin nähtävyysjutun kuvat ovat **tyhjä lista `[]`**. Erillinen kohdekuva puuttuu. Tämä on avoin konevirhe, jota ei ole hyväksytty #74-poikkeukseksi.
- Kysymys 4 käyttää tarkoituksella arkiston oman ylläpitäjän NCAC:n ensisijaista Oral Archives -sivua. Varoitus kertoo lähteen verkkotunnuksesta, ei puuttuvasta lähteestä. En lisännyt asiaa tukematonta Wikipedia-URL:ää varoituksen poistamiseksi.
- Kolmen kohteen poikkeus on A:n perustelema pieni saarikaupunki: historiallinen tori, Gambia-joen suu ja viereinen Tanbin kosteikko. Modernit suojatut teokset ja toisten kaupunkien paikat eivät täytä listaa. Perustelu tulee pääsession RAPORTTI.md:hen; C ei kirjoita raporttia.

Muut tekstin/skeeman konevirheet korjattu. Verkkotarkistusta `--verkko` ei ajettu: tämä on alkuperäinen paikallinen tarkistin, eikä tässä väitetä API-verkkotarkistusta tai D:n riippumatonta hyväksyntää tehdyksi.

## Teksti ja mitat

| Kohta | Merkkejä | Toteutus |
|---|---:|---|
| Artikkelin intro | 856 | 9 virkettä, 3 kappaletta, 3 lihavointia |
| Lue lisää | 771 | 3 kappaletta |
| Albertin nimi, paikallinen arki | 509 | kansi K1 |
| Pääkaupungin nimi leviää saaren yli | 505 | kansi K2 |
| Lautta vaihtaa joen rantaa | 469 | kansi K3 |
| Muisti ei ole vain paperia | 500 | kansi K4 |
| Metsän välissä kulkee vettä | 522 | luonto L1 |
| Rantametsä ottaa vettä vastaan | 489 | luonto L2 |
| Osterit kuuluvat työpäivään | 507 | luonto L3 |
| Lintu ylittää vuodenaikojen rajan | 487 | luonto L4 |
| Albertin tori | 895 | 3 kappaletta, kuva puuttuu |
| Gambia-joen suu | 856 | 3 kappaletta |
| Tanbin kosteikko | 976 | 3 kappaletta |

Kannella neljä nostoa, luontosivulla neljä, oppaassa viisi jaksoa, parasta 5 ja hyvä tietää 4. Oppaan jakso 2 (tori) ja jakso 5 (sää) ovat kuvattomia, mikä on kahden kuvatonta jaksoa koskevan säännön sisällä. Matkailijalle-pysty on eri kuvaportti eikä tätä poikkeusta käytetä sen korvikkeena.

Viisa: 5 kysymystä, tasot 1/2/3 mukana, lähde jokaiselle. Minitehtävä koskee bolongs-vuorovesikanavia, eikä samaa kysymystä ole viisassa. Tiedot ovat kolme nuoren matkaajan tietoa ilman isoisän ääntä. Ukin matkaa, ostosta, päiväkirjamerkintää tai repliikkiä ei kirjoitettu. 1873-kulmat erottavat kaupungin/torin aiemman olemassaolon nykykalustosta, museoista ja suojelurajoista.

Ei tarkkoja perustamis-/nimenvaihtovuosia, väestölukuja, pinta-aloja, lajimääriä, kulkuaikoja, lauttakapasiteetteja tai tallennemääriä ilman kaksilähdevarmennusta. Kuvien kuvausvuodet ovat B:n varmentamaa metatietoa. Saloumin suistoa, maapähkinöiden vientitarinaa, Radio Syd -tarinaa ja mantereen resortteja ei kirjoitettu uusiksi Banjulin nostoiksi. Nykypolitiikka, sota ja nykyinen rikollisuus jäävät pois; oppaassa vain UM:n tukema käytännön varovaisuus.

## Kaikki 17 kuvaa avattu itse C:ssä

Kuvat luettiin B:n lopullisesta `selected.json`:sta ja jokainen paikallinen esikatselu avattiin `view_image`-työkalulla 11.10.2026. Alla numerot tarkoittavat B-kansion `preview-<numero>.jpg`-tiedostoja. Pelkkää B:n raporttia ei pidetty omana silmätarkistuksena.

| Kohta / esikatselu | C:n oma havainto ja kuvatekstin rajaus |
|---|---|
| C1 / 53 | Värillinen satelliittinäkymä; kaupunkikudos, saarimainen kärki ja kanavainen kosteikko erottuvat. Ei nimettyä yksittäistä rakennusta tai merkintätekstiä. |
| C2 / 27 | Kaareva hiekkaranta, laaja vesi, veneitä etäällä ja vasemmalla rakennuksia. Rantapistettä ei nimetä tarkaksi keskustakaduksi; rakennukset eivät ole kuvatekstin pääkohde. |
| C3 / 21 | Matala vesi, mangrovereuna ja lintuja. Lintuja ei nimetä lajiksi tai määrälaskennaksi. |
| K1 / 46 | Vaaleaa irtotavaraa säkissä ja pienessä mitta-astiassa; uudelleenkäytetty purkki näkyy. Tuotetta ei nimetä riisiksi/baobabiksi tai muuksi lajiksi, eikä purkin painatusta nosteta aiheeksi. |
| K2 / 14 | Hillitty ISS-yleiskuva jokisuusta ja vastakkaisista rannoista. Laaja maantiede, ei yksittäisen rakennuksen tunnistus. |
| K3 / 56 | C näki portaikon, matkustajia, vesialueen ja veneitä. D:n alkuperäiskoon tarkistuksessa etualan kasvonpiirteet erottuvat: **HYLÄTTY / R1**. E poisti kuvan ja sen kuvateksti-/lähdekentät; korvaava kuva puuttuu. |
| K4 / 34 | Kelanauhuri ja kuulokkeet sisätilassa. Kuvateksti nimeää yleisen teknisen välineen ja Manchesterin; ei NCAC:n omaksi laitteeksi. |
| L1 / 50 | Kaarevia mangrovejuuria, liejua ja pieniä vetisiä uomia. Paikannus Laminin seutuun, ei kartan Tanbi-aluepisteeksi. |
| L2 / 22 | Mangroven juuristoa ja reiällistä liejumaata. Hydrologinen faktatuki A:n lähteistä, ei valokuvasta pääteltyä mekanismia. |
| L3 / 26 | Tiheä kasa osterinkuoria, ei ihmisiä. Ei kerääjän etnisyyttä, tarkkaa lajia tai työvaihetta päätelty kuvan perusteella. |
| L4 / 60 | Lentävä sääksi sinistä taivasta vasten. Esikatselussa saaliskala ei erotu riittävän varmasti, joten B:n ”with fish” -kuvausta ei siirretty kuvatekstiin. Vuoden 2026 lajikuva Yhdysvalloista, ei Tanbin havainto. |
| O1 / 52 | Mustavalkoinen vinoneliön muotoinen SAR-kuva; mustat kulmat kuvausalueen ulkopuolella. Kuvateksti kertoo vuoden 2024 satelliitin tutkakuvasta, ei optisesta valokuvasta tai nykykalustosta. |
| O3 / 35 | Sääksi siivet auki tasaisen taivaan edessä. Kuvatekstissä Yhdysvallat ja 2022; Mainea ei käytetty B:n ilmoittaman GPS-/osavaltioristiriidan vuoksi. |
| O4 / 59 | Keitettyä valkoista riisiä tavallisella lautasella ja alhaalla käsi. Filippiineiltä otettu yleinen ruokakuva, ei benachin/domoda tai gambialainen annos. |
| N2 / 28 | Jokisuun vesi, pieniä veneitä, rantaa ja oikealla lautan tavallinen putkirakenne. Ei joen lähde tai täsmälleen river-mouth-P625-pisteestä otetuksi väitetty näkymä. |
| N3 / 20 | Mangrovejuuristoa veden äärellä ja juuriin kiinnittyneitä vaaleita kuoria. Ei kuorilajin nimeä tai vierailuporttia. |
| PHOTO / 23 | Lintu oksalla mangroven tiheässä juuriverkossa ja vettä alla. Laji jätetty nimeämättä; nykyajan luontokuva 2013, ei 1873:n näkymä. |

C-vaiheen JSONin **17 tiedostonimeä ja lähderiviä** verrattiin B:n valintoihin: täsmällinen vastaavuus ja 17 eri tiedostoa. D hylkäsi myöhemmin K3:n kasvojen vuoksi, ja E poisti sen sisällöstä; nykyisessä JSONissa on 16 kuvaa. Ei muistista nimettyä korviketta eikä ennen–nyt-paria. Muiden kuvien lähderivit säilyvät sanatarkasti, PHOTO:ssa B:n `Commons`-muoto ja muissa `Wikimedia Commons`.

Aihetoisto on näkyvä: satelliittikuvat palvelevat yleismaantiedettä, mangrovet kanavia/hydrologiaa/kohdeympäristöä, sääkset muuttolintunostoa ja oppaan lajikuvaa. Eri tiedostot, eri roolit. O1:n SAR-kuvan opasrooli sekä yleisten O3/O4-lajikuvien sopivuus kuuluvat D:n tarkistukseen; niitä ei esitetä automaattisesti paikallisina matkavalokuvina. C ei vahvista B:n maakohtaista oikeustulkintaa riippumattomaksi lakiselvitykseksi.

## Sää ja paikat

Saa.json:n lat/lon, keskilampo, ylin, alin, sade ja lahde verrattiin ohjelmallisesti: täysin samat; `tausta` poistettu vain pelin olion kopiosta. Taulukko Banjul 1991–2020 säilyy, eikä mittauspistettä nimetty omin päin lentoaseman asemaksi. Oppaan noin 32–34, 18–20 astetta ja noin 350 mm ovat vain rivin luvuista pyöristettyjä; ilmastolauseissa ei lähdemainintaa.

Kartalla A:n kolme WP/WD-paikkaa ja sama rajaus. Albertin tori on oma toripiste, Gambia-joen suu WD:n oikealla river-mouth-qualifierilla, Tanbi laajan kosteikon aluepiste. Luontopiste ei ole vierailuportti eikä vanhan OSM-karttapohjan arkkitehtuurikohdetta nimetty uudelleen. Modernit teokset jäävät pois.

Lähtötiedostojen SHA-256 tämän luonnoksen lukemisen hetkellä:

```text
faktapohja.md 9b2e60128a4163973ffcc4aafdf013af561b1abd2251c0628ea7f48d51f933bf
kuvat.md 40f602f5750be125ea7611e986e1d9079c74b8cd8a5fedd4b0c25571346237ca
saa.json a43a01953305f5528898b607be3808ea3142b412d6da42111b296d2e1f8d6234
selected.json a7c91639b278bc26bb5887869571b231c47b0329e9480b24a57b6e3fe93da2b6
```

Jatko: puuttuva pysty ja Albertin torin kuva ratkaistaan omilla B-kuvaporteillaan; D tarkistaa faktat, kuvat, syy-yhteydet, paikat ja käytännön oppaan itsenäisesti. Vasta tämän jälkeen tekstit/kuvat voidaan korjata ja C:n valmistuminen arvioida. Nykyistä kahden virheen luonnosta ei julkaista tai kuitata toimitusvalmiiksi.


## E:n täsmennys 11.10.2026 — kolme avointa kuvaporttia

D:n R1–R4-korvaukset on sovellettu sanatarkasti. K3-lauttakuva on aidosti hylätty luettavien kasvojen vuoksi ja poistettu; Matkailijalle-pysty ja Albertin torin erillinen kohdekuva puuttuvat edelleen. Mitään näistä ei ole hyväksytty nollavirhepoikkeukseksi. Gambia-joen suun teksti on nyt 874 merkkiä / 3 kappaletta D:n korvauksen mukaisesti. C:n yllä olevat kahden virheen ja 17 kuvan luvut ovat E:tä edeltävää historiaa.

Alkuperäisen paikallisen tarkistimen ja sallitulla verkkosovituksella ajetun alkuperäisen `--verkko`-tarkistimen nykyinen tulos (molempien lopetuskoodi 1):

```text
VIRHE banjul: kansi nosto 3: tiedosto puuttuu
VIRHE banjul: matkailijalle.kuva: tiedosto puuttuu
VIRHE banjul: juttu Albertin tori: kuvia 1–3
VAROITUS banjul: kysymys 4: source ei ole Wikipedia-artikkeli
VAROITUS banjul: kohteita 3 (pohjataso 6; perustele RAPORTTI.md:ssä)
== banjul: 3 virhettä, 2 varoitusta, 16 kuvaa
YHTEENSÄ 1 kaupunkia: 3 virhettä, 2 varoitusta
```

**Kaupunki on keskeneräinen.** Kolme kuvavalintaa ja niiden jälkitarkistus ovat avoinna. Ei valmis-C/E/F-, toimitusvalmis- eikä julkaisuvalmis-merkintää. Yksilöidyt korjaukset, sanatarkkuuden vertailu ja tarkistuslokit on kirjattu tarkistus.md:n `Korjattu`-osioon sekä NASin `valiaikainen/banjul-E/`-aineistoon.
