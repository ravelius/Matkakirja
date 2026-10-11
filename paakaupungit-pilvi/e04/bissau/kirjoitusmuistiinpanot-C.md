# Bissau — C:n sisältöluonnos 11.10.2026

**Luonnos, ei valmis C, F tai toimitusvalmis kaupunki.** `sisalto.json` sisältää tekstiosat ja B:n lopullisen 16/19-kuvalistan kaikki 16 kuvaa. Kolmen karttakohteen `kuvat`-listat ovat tyhjiä: Amuran linnoitus, Pidjiguitin laituri ja Tulliaukio. Nämä ovat todelliset erillisten kohdekuvien puutteet. Niitä ei korvata toisen paikan kuvalla eikä jo käytetyn tiedoston toisinnolla.

Kirjoitettu vain tämän kaupungin `sisalto.json` ja tämä muistiinpano. Omat väliaineistot NASin `valiaikainen/bissau-C`-kansiossa. Ei gittoimia, Commons-hakuja, kuvanmuokkausta, pelitiedostojen muutoksia tai uusia agentteja.

## Nykytila kahden E-kierroksen jälkeen 11.10.2026

D tarkisti kaikki 16 valittua kuvaa ja hyväksyi ne nykyisillä roolirajoilla; H2 on yleinen bastionikaavio ja H4 satamakaupan yleiskuva. D:n VÄÄRIN 1 / EPÄVARMA 2 korvattiin ensimmäisessä E-kierroksessa sanatarkasti (Q5-vihje, Pidjiguitin vuoden 1873 puulaiturirajaus ja K4:n museoväitteen tarkkuus). Nämä kolme korvausta säilyvät 3/3 sanatarkasti. Nykyinen K4 on 477 ja Pidjiguitin juttu 988 merkkiä / kolme kappaletta; alemmat C:n mittarivit ovat kirjoitushetken tuloksia.

Toisessa rajatussa E-kierroksessa muutettiin vain kaksi wiki-arvoa: K4:n `Museu Etnográfico Nacional da Guiné-Bissau` → `National Ethnographic Museum (Guinea-Bissau)` ja H3:n `Porto de Bissau` → `Port of Bissau`. Molemmat omat en-artikkelit varmennettiin robots-sallituilta lähdesivuilta ja sisältö luettiin; sataman WD Q20646352 en-sitelink täsmää. Portugalinkieliset S3/S8 ja Camões S9 säilyvät faktalähteinä, eikä linkin korjaus muuta faktaväitteitä. Muu teksti, sää ja kuvavalinnat säilyivät. Täsmälliset polut, lähteet ja revisiot ovat tarkistus.md:n Korjattu-osiossa.

Alkuperäinen --verkko-tarkistin toisen kierroksen jälkeen: 3 kuvavirhettä, 1 kohdemäärävaroitus, 16 kuvaa, exit 1. Kaksi ensimmäisessä verkkoajossa paljastunutta wiki-virhettä poistui. Amuran, Pidjiguitin ja Tulliaukion erilliset kohdekuvat puuttuvat yhä. Ei valmis-C/E/F-merkintää tai toimitusvalmiutta; tarvitaan hyväksyttävät erilliset kohdekuvat ja niiden D-jälkitarkistus sekä kompaktin satamaytimen perustelu. Alla säilyy C:n alkuperäinen työjälki, myös sen tuolloin vielä tulevaa D:tä koskevat merkinnät.

## Syötteet ja ohjeet

Luettu tämän e04-kloonin AGENTS.md, CODEX.md, PILVIOHJEen C-kehote sekä luvut 3, 4, 7, 13 ja LISÄSÄÄNTÖ; lehtityöreseptin faktakuri, kuvat ja mitat, kaupunkilehden kuvatekstisäännöt sekä spec-mantereet yhteiset linjaukset. Dakar-mallista tarkistettiin rakenne; sen tekstiä ei käytetty. Bissaun faktapohja, konteksti, sää ja lopullisesti päivitetty kuvat.md/selected.json/provenance.json luettu. Lähdetekstien ja koordinaattien jälki on A:ssa, kuvalähteiden metadatan/oikeuksien jälki B:ssä.

| Syöte | SHA-256 |
| --- | --- |
| faktapohja.md | `f159cc837c81b814bebed381c270361a55c8834a60e52bd807411524b5a0a708` |
| konteksti.json | `a61185e8c610be731cad73adfb94ad2078a56ce101bc61d64df401de5f78633c` |
| saa.json | `0652db8be17df99336f04d8832e3df16ca05f010f1b204095dd0f49b980736ed` |
| kuvat.md, lopulliset roolit | `db9199438db2fa19a90ef67663e5ae5a3be66a7a22369ab4778132caf0aff11f` |
| bissau-B/selected.json | `d77b9885da3d08aa670404cb61aa0414220646fe5df08827636764d2f5e5c259` |
| bissau-B/provenance.json | `2a56bce2742ab197bc974e7764257132d2c437aceb92752af7f62bb5995e51a5` |

## Tekstiratkaisut ja lähderajat

- Kansi: vanhojen talojen nykyinen käyttö, Papel-yhteisöjen oma valtakunta ja toimijuus, Bandimin arkinen kauppa sekä valokuvien koevedosten merkitys museon muistissa. Ei samoja maan itsenäistymis-, kieli- tai cashew-vientiaiheita uudelleen nostoiksi.
- Historia: Amuran eri rakennusvaiheet, yleinen bastioniperiaate, Pidjiguitin laiturivaihe ja tulliin viittaava aukion nimi. Linnoituksen ensimmäinen vaihe on 1600-luvun lopulta; koko nykyistä linnoitusta ei ajoiteta ensimmäiseen kauppa-asemavaiheeseen. Ristiriitaiset täsmälliset myöhemmät vuodet korvattiin vuosisadoilla.
- 1873: Bissau, linnoitus ja satamakauppa olivat jo olemassa. Pidjiguitin julkinen laiturivaihe kuuluu myöhempään 1800-luvun loppupuoleen. Tulliaukion silloista asua ei vahvistettu. Ei isoisän maihinnousua, ostoksia, reittiä tai repliikkejä.
- Tulliaukion historia on niukasti lähteistetty. Juttu käyttää A:n WD-paikkatunnistetta, nimen kohdistusta, sijaintisuhdetta ja aukio/puutarha-luokitusta sekä S11:n yleistä tullitalon tehtävää. Perustamisvuotta, rakennuttajaa, puiden ikää tai nykyisen tullin menettelyä ei lisätty.
- Väestö jätettiin pois. Kontekstin tarkka luku on Bissaun autonomisen sektorin vuodelle 2025 laadittu projektio, ei vuonna 2025 tehty uusi laskenta.
- Viisi visakysymystä tasoilla 1, 1, 2, 2, 3. Museokysymyksen lähde on portugalinkielinen Wikipedia-artikkeli S8, jota S9:n virallinen Camões-tiedote täydentää. Teemasivun minitehtävä kysyy tullin nimeä; sitä ei kysytä visassa. Vihjeissä ei käytetä oikean vaihtoehdon nimeä, eikä oikea vaihtoehto ole selvästi pisin.
- Museon vanhaa Ajuda-pistettä ei käytetä nykyisen näyttelyn osoitteena. Bandim-kalalajiohjaus ja väärän maan Ilhéu do Rei -ohjaus eivät ole karttakohteita. Nykyinen museopääsy ja vesiyhteyksien lähtöjärjestelyt tarkistetaan matkan ajankohtaan.
- UM:n GW-polulta ei saatu maakohtaista sisältöä. A:n vaihtoehtoinen virallinen käytännön lähde on FCDO, luettu 11.10.2026, current at 11 October 2026, updated 10 December 2025. Opas neuvoo huolellista suunnittelua, kuljetusten sopimista, yöajon välttämistä ja rajoitusten noudattamista. Ei keksittyä UM-luokkaa, yleistä matkustuskieltoa tai turvallisuuslupausta. Nykyiset poliittiset/rikolliset tapahtumat ja yksityiskohdat eivät pelitekstiin.
- Kuvatun teoksen, valokuvan ja mahdollisten paikallisten käyttöehtojen oikeuskerrokset säilyvät B:n kuvauksessa erillisinä. C ei muuta B:n art. 152 -julkaisuperustetta rakennuksen PD-väitteeksi, päättele kaikkia Amuran nykyosia vanhoiksi tai siirrä naapurimaan ehtoa GNB:hen. Yleinen CC BY-SA -bastionikaavio on pääsession nimenomaisesti hyväksymä rooliratkaisu. D:n riippumaton kuva- ja faktatarkistus on edelleen tehtävä.

## Sää ja kartta

`saatiedot` on valmis alkuperäinen saa.json ilman `tausta`-kenttää. Kaikki lat/lon-, lämpö-, sade- ja lähdearvot verrattiin koneellisesti samoiksi. Luonnehdinta ja oppaan ilmastoluvut kirjoitettiin vain näistä luvuista: kevään päivän ylin noin 35–36 °C, elokuun ylin noin 30 °C, alkuvuoden alin noin 18–19 °C ja elokuun sade noin 470 mm. Ei muun johdantotekstin vuosisadetta tai tämän vuoden sääennustetta.

Tausta säilyy A:ssa: Bissau-artikkelin revisio 1377808681, Osvaldo Vieira International Airport, 1991–2020, NOAA, Daily mean ja Average precipitation, luettu 11.10.2026. Työkalun kaupungille tallentamat 11.86/−15.58 eivät ole erikseen varmennettu mittausaseman piste. Kuvan pilvistä/vehreydestä ei päätellä ilmastolukuja.

Kolmen paikan kartta rajaa kompaktin vanhan satamaytimen pääsession hyväksymällä poikkeamalla. Bissau kokonaisuutena ei ole pieni väestöalue. Puuttuvien lähdepisteiden ja suojattujen modernien teosten lisääminen ei ole hyväksyttävä tapa täyttää kuuden kohteen tavoitetta. Tämä perustelu siirretään erän RAPORTTI.md:hen pääsession toimesta.

| Kohde | Piste | A:n lähde |
| --- | --- | --- |
| Amuran linnoitus | 11.86027, −15.57862 | WD2, Q10283638 P625 |
| Pidjiguitin laituri | 11.85618, −15.57835 | WD4, Q55032287 P625; nimenomainen laituri |
| Tulliaukio | 11.86026, −15.57723 | WD5, Q54901273 P625; aukio, ei tullitalon piste |

Rajat ovat A:n noin 300 m marginaalilla laskemat pohjoinen 11.86297, etelä 11.85348, länsi −15.58138, itä −15.57447. Pallo säilyy kontekstin pisteenä 11.86/−15.5833.

## C:n oma 16 kuvan silmätarkistus

Jokainen alla oleva kuva avattiin itse `view_image`-työkalulla B:n paikallisesta esikatselusta. Tiedostonimet ja lähderivit otettiin lopullisesta selected.json:sta sanatarkasti. Ei B:n hylkäämiä tiedostoja, vanhoja rooleja tai muistista nimettyjä korvikkeita. Kaikki 16 tiedostoa esiintyvät JSONissa kerran.

Reseptin koko kasvorajaa sovellettiin: luettavat kasvot hylättäisiin, selin olevat ja kaukaiset hahmot kelpaavat. C:n avaamissa esikatseluissa ihmisten kasvonpiirteitä ei pystynyt lukemaan. K3:ssa, H3:ssa ja matkailijalle-kuvassa on pieniä tai varjossa olevia hahmoja; D avaa myös nämä itse. Pieni hahmo ei tarkoita, että kuvassa ei olisi ihmisiä.

| Rooli / B:n nro | Oma havainto | Kuvatekstin raja |
| --- | --- | --- |
| C1 / 2 | Laaja katujen liittymä, talorivejä, autoja, puita ja riippuvia viirinauhoja. Ei luettavia kasvoja. | Bissau Velhon katutila 2019; ei yksittäisen talon nimeä/valmistumisvuotta. |
| C2 / 8 | Vesi etualalla, pitkä laiturirakenne ja aluksia, mastoja/valaisimia. | Bissaun uudemman sataman yleisnäkymä 2017; ei vanha Pidjiguiti. |
| C3 / 6 | Kattojen yli nähty kaupunkipanoraama, puustoa, katuja ja urheilukenttä kauempana. | Bissaun keskusta 2023; linnoitusta ei nimetä näkymättömäksi pääkohteeksi. |
| K1 / 43 | Kaksikerroksisen talon kuisti, kaaria, kulunutta rappausta ja pyykkiä; ei ihmisiä. | Bissau Velhon arki vuoden 2007 kuvaustilanteessa; ei talon tämänhetkisen käytön lupausta. |
| K2 / 47 | Laaja optinen satelliittinäkymä kaupungista ja kanaalien/rantojen rikkomasta vesialueesta. | Hodoyoshi-1, Geba ja Bissau 2017, nykyajan maantiede; ei historiallinen Papel-kauppatilanne. |
| K3 / 12 | Pitkä avenue ylhäältä, busseja, muita ajoneuvoja ja pieniä jalankulkijoita; etualan hahmot varjossa, kasvonpiirteet eivät luettavissa. | Bandimin markkinan laidalla kulkeva avenue 2017; ei markkinan sisäkoju. |
| K4 / 45 | Avattu tasoskanneri, kisko/lukupää, piirilevy, kaapeli ja muovirunko; tyhjä alusta. | Yleinen digitointiväline 2007; ei museon oma laite eikä väite sen tarkasta digitointitekniikasta. |
| H1 / 17 | Linnoituksen laaja piha, puita, matalia rakennuksia, pysäköintialue ja tavallisia tykkejä; henkilöt pieniä. | Amuran sisäpiha 2017; ei kaikkien nykyosien ajoitusta 1700-luvulle, pääsylupausta tai mausoleumiaihetta. |
| H2 / 50 | Ruskea geometrinen runko ulkonevine kulmineen, vaaleanvihreä reuna, ohuet apuviivat alaosassa; ei tekstiä, indeksiä tai leimaa. | Yleinen Vauban-periaatteiden bastionikaavio 2019, EI Amuran pohjapiirros tai bastionimäärän todiste. Värien/apuviivojen merkitystä ei keksitty. |
| H3 / 14 | Veneitä, matalaa vettä ja mutaranta, taustan laiturirakenteita; ihmiset pieniä, varjossa tai selin. | Pidjiguitin satamapaikka 2007; kaikkia taustalaitureita ei nimetä vanhaksi Pidjiguitiksi. |
| H4 / 35 | Uudemman sataman rahtialus, pienempi käyttövene ja teknisiä laituri-/satamarakenteita veden takana. | Bissaun uudemman sataman yleinen satamakauppakuva 2017, EI Tulliaukion foto tai vanhan laiturin rakennusajan todiste. |
| Matkailijalle / 1 | Kuja kahden talon välissä avautuu veteen, auto, palmu ja penkki; yksi pieni hahmo varjossa. | Bissau Velhon kuja ja Geban vesi elokuussa 2026; ei tarkkaa kujannimeä tai aluksen reittiä. |
| O3 / 40 | Auki oleva tasoskanneri paljaalla lasilla lattialla; ei skannattavaa kuvaa. | Tuore vuonna 2023 kuvattu yleinen digitointiväline; ei museon oma laite. |
| O4 / 44 | Valkoista keitettyä riisiä metallisessa astiassa; ei nimettyä kastiketta tai ateriaa. | Nepalissa vuonna 2022 kuvattu riisi, ruoka-aineen yleiskuva; ei Bissaun paikallinen annos. |
| O5 / 4 | Laaja puustoinen etuala, kattoja kauempana ja pilvinen taivas. | Bissaun São Paulon kaupunginosan paikallismaisema elokuussa 2025; ei Brasilian kaupunki eikä ilmastonormaalin todiste. |
| Valokuva / 3 | Mustavalkoinen talon seinusta, puita ja pyykkinaru, ei ihmisiä. | Bissaun katutila vuonna 2015; ei nimetty kortteli, historiallinen 1873-kuva tai ennen–nyt-pari. |

Matkailijalle-kuvan alkuperäiskoko 3000×4000 antaa w/h 0,75. Kolme opaskuvaa ovat 2023/2022/2025 kuvattuja; O1 ja O2 jätettiin kuvattomiksi sallitun kahden jakson rajalla. Skannerin laitemallin ikä ei ole valokuvan kuvausvuosi.

## Mitat ja tarkistus

| Osa | Tulos |
| --- | --- |
| Intro | 880 merkkiä, 9 virkettä, 3 kappaletta, 3 lihavointia |
| Lue lisää | 835 merkkiä, 3 kappaletta |
| Kansi K1–K4 | 465 / 499 / 489 / 502 merkkiä |
| Historia H1–H4 | 507 / 493 / 489 / 510 merkkiä |
| Matkailijalle-kappale | 5 virkettä |
| Opas | 5 jaksoa, 3 kuvaa, 2 kuvatonta; Parasta 5, Hyvä tietää 4 |
| Amura / Pidjiguiti / Tulliaukio | 944 / 946 / 873 merkkiä, jokainen 3 kappaletta |
| Kysymykset / tiedot | 5 / 3 |
| Kuvatekstit | 16 lyhyttä, kukin ≤100 merkkiä ja piste lopussa; selitteet yksi virke |

Alkuperäinen tarkistin: `node paakaupungit-pilvi/tyokalu.mjs tarkista e04 bissau`, exit 1:

```text
VIRHE bissau: juttu Amuran linnoitus: kuvia 1–3
VIRHE bissau: juttu Pidjiguitin laituri: kuvia 1–3
VIRHE bissau: juttu Tulliaukio: kuvia 1–3
VAROITUS bissau: kohteita 3 (pohjataso 6; perustele RAPORTTI.md:ssä)
== bissau: 3 virhettä, 1 varoitusta, 16 kuvaa
YHTEENSÄ 1 kaupunkia: 3 virhettä, 1 varoitusta
```

Tekstin ja skeeman muita virheitä tai varoituksia ei jäänyt. Kolme kuva-aukon konevirhettä jätetään näkyviin annetun luonnostilauksen mukaisesti. Kohdemäärän varoitus säilytetään kompaktin vanhan satamaytimen perustelulla. Tämä paikallinen tarkistus ei ole D:n riippumaton lähde-/kuvatarkistus, verkkovarmennus, F-valmius tai pelitoimitus.

Vielä tarvittavat erilliset kuvat: (1) Amuran hyväksyttävän kohteen oma kuva, (2) Pidjiguitin laituripaikan oma kuva, (3) Tulliaukion avoimen tilan oma kuva. Nykyisiä H1/H3-kuvia ei toisinneta karttajuttuihin; H4:n uudempi satama ei täytä Tulliaukion kohdekuvaporttia.
