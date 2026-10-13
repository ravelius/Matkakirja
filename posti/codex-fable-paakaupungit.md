## 13.10.2026 klo19.47 (Europe/Helsinki) — TASK118:93kaupungin korjatut tekstit, Sisältökirjurin uusintapistokoe tarvitaan

Korjaustoimitus e04–e14 on push-varmennettu11haarasta. Korjauslistan153 KORJAA-kohtaa ja vastaavat yleiset tarkistukset käsitelty koko93kaupungissa; riippumattoman93auditin kaikki45 lisälöydöstä ratkaistu. Paikallistarkistin:0odottamatonta teksti-/skeemavirhettä. **1478legacy-kuva-/karttaporttivirhettä jää avoimeksi**, koneportin exit1 säilyy; C-tarkistin ei lue hyväksyttyjä AI-sidecareja, joten tätä ei tulkita uudeksi AI-kuvalaadun hylkäykseksi. Täyttä C/game-readyä ei kuitata.

Nykyinen kuvansidontaliite:1029operaatiota samoihin natiivi-/export-kuvatavuihin jaURL:eihin kuin hyväksytyssä1040batch0088:ssa. Korjatun C:n, kuvatekstien ja target/context-sourceSHA:t ovat uudet. 11vanhaa irrelevanttia tai muuttuneeseen aiheeseen sopimatonta sidosta säilyy historiassa jaon pois nykyrooleista; niitä ei palauteta. Batch0088posti03569b6e6725e6df7ff6b905864236fbab71bd51 on muuttumatonhistoria. Omistajan kuvahyväksyntä **ei ole tekstihyväksyntä**.

| Erä | Korjattu haara | Toimituscommit |
| --- | --- | --- |
| e04 | `paakaupungit-e04-codex` | `98a349a5c6f92104a917716f725d12846b292aec` |
| e05 | `paakaupungit-e05-codex` | `92c65cbab4f791b305a81f0378712c94a2ebcb23` |
| e06 | `paakaupungit-e06-codex` | `1c265bbb3c80c25a2130f9012ac90e953ff72b1e` |
| e07 | `paakaupungit-e07-codex` | `69f99edf64738fa146ef0ad61964496c58e85cfa` |
| e08 | `paakaupungit-e08-codex` | `878e309aeb649b5bf2cf9b6d9a3ccd84cb377592` |
| e09 | `paakaupungit-e09-codex` | `d21ee5cadb0a309e94d847974e81c326a8367a7c` |
| e10 | `paakaupungit-e10-codex` | `8978056200a944a7b6175fb0d086e75c93bd9b33` |
| e11 | `paakaupungit-e11-codex` | `f15730b97c9f7484350a7753cd0e2355cc597a57` |
| e12 | `paakaupungit-e12-codex` | `b2fea20e50fa219fde9166a3a8964ed62832b034` |
| e13 | `paakaupungit-e13-codex` | `7ef20ebb7df278c6dd1da0f37ed16948b558b5a6` |
| e14 | `paakaupungit-e14-codex` | `97a8f3b9ab169f4a8763459cbea3a99d743d4a60` |

**Claude/Sisältökirjuri:** tee riippumaton uusintapistokoe2kaupunkia/erä eli22kaupunkia näistä täsmäcommiteista ennen pelikytkentää. Ilmoita cityID/sourceSHA, tulos ja avoimet kuva/kartta/sääportit. Ei main/runtime-mergeä tai peli-julkaisua tällä toimituksella.

**Nouakchottin sääohje:** JMA61442/1991–2020 varmentaa24arvoa (12mean+12rain); 24max/min-arvoa puuttuu. C.saatiedot säilyynullina. Anna saman aseman/kauden48primääriarvon lähde tai erikseen hyväksytty partial-data-sopimus ja null-kenttien näyttökäytös. Ristiriitaista Wiki/DWD/Oumtounsy-kausitaulukkoa ei kopioitu tai yhdistetty.

Täysi manifesti `posti/paakaupungit-tekstikorjaus-task118-20261013.json`; branch-receipt, checks-final, validation93, current-media/poissulut ja ilmastoaudit saman alkuisissa liitteissä. Kaikki alkuperäiset muistiot NAS `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/kuvat-nopeasti/root-game-routing/task118`. JatkossaCommons-only, ei uusia generointeja/uusintoja. Sites/galleria pysyy tässä toimeksiannossa muuttumattomana.

## 2026-10-11 19.11 UTC — KYSYMYKSET: kuvaporttien tulkinta, työ jatkuu

Valmis aineistopaketti edelleen Rabat 1/93 (A–F, 0 virhettä). Edistyminen 15/558 varmennettua vaihetta eli 2,7 %. e04 viimeisin push/readback-vahvistettu SHA 0417f2fe82afd7ff16ed4a72d9fd936bebf63bab; seuraava checkpoint sisältää Banjulin keskeneräisen C/D/E:n ja Bissaun kuvat. Banjul D: 3 VÄÄRIN, 1 EPÄVARMA; E:n 4/4 koko kentän korvausta toteutettu sanatarkasti. K3-kuva poistettu luettavien kasvojen vuoksi. E:n alkuperäinen verkkotarkistin: 3 virhettä, 2 varoitusta, 16 kuvaa. Ei 0-virhemerkintää tai toimituskuittausta. Bissau B: 16 kuvaa kaavio mukaan lukien; C työn alla, N1/N2/N3-kuvat puuttuvat. Conakry B ja Juba A etenevät rinnakkain.

Viisi selvitettävää linjausta:

1. **#74:n kuvattomuus ja vanhan koneen 0-virheportti.** Bissaun nostot voidaan kuvittaa hyväksytyillä eri tiedostoilla ja yleisellä, selvästi nimetyllä bastionikaaviolla. Kolmelta karttakohteelta puuttuvat erilliset kelvolliset kuvat. #74 sallii epävarman kohteen kuvattomana, vanha tyokalu.mjs vaatii kuvan. Saadaanko kanoniseen tarkistimeen tai toimitusporttiin dokumentoitu poikkeus? Raakoja konevirheitä ei piiloteta eikä kutsuta nollaksi. Sama ristiriita pitää Algerin/Praian osapaketteja auki.
2. **70 vuoden kohderajaus suhteessa #74:ään.** CODEX kohta4 kieltää suojatut teokset kuvina JA kohteina; #74 käsittelee rakennuksen/taideteoksen kaupallista FOP-kuvaa. Säilyykö modernin suojatun rakennuksen kohdekielto aina, vai saako kaupallisesti sallitun FOP-rakennuksen kuvata ja ottaa rakennuspaikkana kartalle? Taideteos/esine/henkilö/tapahtuma ei edelleenkään olisi paikkakohde. Tämä vaikuttaa uusien pääkaupunkien A-karttoihin; mitään epävarmaa teosta ei ole hyväksytty tällä tulkinnalla.
3. **Tuoreen Matkailijalle-pystyn ajallinen vaatimus.** Banjulissa löytyi kokoon, suhteeseen ja kasvorajaan kelpaava mangrovepysty, mutta se on vuodelta 2007: [Megatrip africa 845 (382870426).jpg](https://commons.wikimedia.org/wiki/File:Megatrip_africa_845_(382870426).jpg), 2592×3888, w/h0,667, Hugh Lunnon from Brighton, UK, CC BY-SA2.0, kuvattu10.1.2007. B ja pääsessio katsoivat kuvan. Se ei ole valittu, koska ohje vaatii tuoreen pystyn. Voiko muuttumattoman luonnonaiheen vanhan kuvan hyväksyä täsmällisellä kuvausvuodella, vai pidetäänkö aukko? Ei uuden kuvan tai nykytilan väitettä.
4. **Alkuperäisen painotuotteen kuvateksti.** Onko 1800-/1900-luvun alun PD-postikortin alkuperäinen julkaisijan paikkateksti/marginaali ehdottomasti hylättävä lisämerkintä, vai saako sen pitää osana alkuperäistä teosta? Lisätty Delcampe-/arkistoleima, studion signeeraus ja myöhemmin lisätyt kehykset hylätään joka tapauksessa. Julkaisijan oma litera/nuoli/karttanumerointi on reseptissä jo sallittu selitettynä. Ei valittua poikkeamaa vielä.
5. **Saman paikan kuva nostossa ja sen nähtävyysjutussa.** Säilyykö yhden tiedoston yksi käyttökerta ehdottomana myös silloin, kun nosto ja kohdejuttu käsittelevät juuri samaa tunnistettua paikkaa? Esimerkiksi Bissaun varmennettu 2017 Amuran sisäpiha ja 2007 Pidjiguiti toimivat nostossa, jolloin kartan kohdejutulle ei jää samaa kuvaa. Eri tai vääräksi tunnistettua paikkaa ei siirretä korvikkeeksi. Emme käytä kuvaa kahdesti ilman linjausmuutosta.

Nouakchottin aiempi koordinaattikysymys tarkentui rajatulla 10 sivun lisäkierroksella: kuusi WP-paikkapistettä on nyt löydetty, mutta neljän kohteen sisällöllinen faktajoukko ja museoalueen rajaus jäävät vajaiksi. A ei ole valmis; pisteiden löytyminen ei ole kuuden valmiin kohteen hyväksyntä. Kamelmarktin Wikivoyage-piste on erillinen avoin vaihtoehto, ei Marché de La Vianden korvike. Uutta koordinaattipoikkeusta ei ole sovellettu.

Sääpoiminnassa havaittu erillinen lähdelaatuongelma: alkuperäinen kone hyväksyi numerorakenteen, mutta Luandan/Maputon taulukossa saderivi on nimenomaisesti1961–1990 ja otsikko2001–2025/1991–2020; Kinshasan DMI-viite on ennen normaalikauden loppua, Kampalan keskilämpörivin lähde on eri kuin Makerere-aseman WMO-tausta. Näiden4kaupungin alkuperäiset saa.json:t arkistoitu NAS-väliaineistoon muuttumattomina, tuotannossa saatiedot:null. Numeroalgoritmia ei muutettu eikä vuosijaksoa arvattu. Lähdehylkäysraportit e06/e07/e08:ssa. Työkalun pelkkä numerorakenteen hyväksyntä ei takaa saman kauden asema-aineistoa.

Omistajan pyytämä rikkinäinen etenemisajastus on poistettu sovelluksen työkalulla ja poisto varmennettu. Tavalliset etenemisviestit jatkuvat. Ei sovellusrestartia. e05-faktasessio valmis (10 lähdekoostetta, Accra A valmis,9 kartta-/lähdevajetta); e06 viimeistelee A-koontia. Kaikki aineisto edelleen NASilla, aiemmat #70/#71-generoinnit palautteessa. Ei valmis-eräkuittausta, pelikytkentää, julkaisua tai uutta generointia.

## 2026-10-11 18.24 UTC — VÄLITILA: Rabat A–F valmis, e04 jatkuu

Rabat on valmis aineistopaketti (A–F), ei vielä valmis e04-erä tai pelikytkentä. Alkuperäinen tarkistin hyväksytyllä lähdesivusovituksella: **0 virhettä, 1 perusteltu varoitus, 23 kuvaa**. B/C/D avasivat kaikki 23 kuvaa; D:n kuusi korjausta toteutettiin E:ssä, ja F tarkisti lopputuloksen. Rabatin sisalto.json SHA-256 f8f838afc5472fcd842ffcd8b9960dab39b9c9659598ce897847ff44a7bc8c3e. VALMIS.md kertoo näytöt ja seuraavat hyväksyntäportit.

Viimeisin push/readback-vahvistettu e04-haara paakaupungit-e04-codex: **569d10170408a1e6e66f3d0974b6e5cfb4f75a26**. Uusia A-faktapohjia: Banjul, Bissau ja Conakry. Praia A valmis, B: 13 kuvaa / 8 puuttuvaa. Alger A valmis, B: 4 kuvaa / 19 puuttuvaa. Monrovia/Tunis A ja Banjul B työn alla. Nouakchott A:n karttapoikkeama edelleen avoin. TILANNE.md ja kuvakoosteet kirjaavat yksittäiset rajat; mitään puuttuvaa kuvaa, koordinaattia tai lisenssiä ei keksitty.

Omistajan e05/e06-apusessiot toimivat nyt uusilla vuoroilla ja ovat pushaaneet omille paakaupungit-e05-codex / paakaupungit-e06-codex -haaroilleen. Sovellusrestartia ei tarvittu. Niiden osittaisia lähdekoosteita ei merkitä toimitusvalmiiksi; pääsessio tuottaa sääluvut alkuperäisellä työkalulla ja hoitaa myöhemmin B–F. Toimitusjärjestys e04→e14 säilyy.

Edistyminen juuri nyt: 11/558 varmennettua A–F-vaihetta eli 2,0 %, valmis aineistopaketti 1/93. Kaksi edellisen välitilan ratkaisukysymystä (kuvattomuus vs vanhan koneen 0-virheportti, Nouakchottin pienempi kartta / lähdekoordinaattipoikkeus) ovat edelleen avoimia. Jatketaan muita kaupunkeja eikä odoteta näitä pysähdyksissä.

Omistajan Codex/ChatGPT-datasiirto valmistui: aktiivinen data T7:llä, SQLite-tarkistukset OK, sovellus avattu ja käynnissä. Tämän pääkaupunkityön tuotanto ja väliaineisto NASilla. Aiemmat #70/#71-kuvageneroinnit pysyvät omistajan palauteportissa. Tässä työssä ei generointia, R2-toimitusta, mergeä, pelikytkentää tai julkaisua.

## 2026-10-11 17.23 UTC — VÄLITILA e04 ja omistajan nopeutusohjaus

Omistaja hyväksyi tässä keskustelussa 11.10. robots-sallitut tavalliset alkuperäiset Wikipedia/Commons-lähdesivut estettyjen rajapintapolkujen sijasta sekä kolme samanaikaista työagenttia. Kulutuksella ei väliä. Lisäksi luotiin e05/e06 faktasessiot omiin NAS-klooneihin; niiden alkuvaiheessa sovellus käytti vanhaan symlinkkikansiopolkuun törmäävää rajoitettua ajoprofiilia, joten aloitus tarvitsee vielä uuden vuoron oikeustarkistuksen. Valmiiden erien toimitusjärjestys e04→e14 säilyy. Kaikki tuotanto- ja väliaineisto NASilla.

Rabat A/B/C/D valmis, E:n kuusi korjausta tehty (D:2VÄÄRIN4EPÄVARMA), F meneillään. 23 kuvaa on jokainen katsottu B/C/D:ssä. Korjatun sisällön alkuperäinen tarkistin hyväksyttyä lähdesivukanavaa käyttävällä sovituksella:0virhettä1varoitus; pyöristetty prefektuurin väkiluku lähdeperusteltu. Tämä ei ole valmis erä. Viimeisin tallennettu e04 SHA d16320f0e13c6bb6ea3a2e6229e140fc31c920a9; F:n valmisversio tulee seuraavassa checkpointissa.

Säärivit tuotettu alkuperäisen tyokalu.mjs saa -poiminnalla, numeroalgoritmia muuttamatta:8/9; vain verkkosyöte vaihdettu omistajan sallimaan Wikipedia-sivuun. Algerin ilmastotaulukko hylättiin:vuosisarake685mm, kuukausien summa603mm, saatiedot:null. Kaupungin en-artikkeli lukittiin saa-syote.json:iin, ettei maa-fallback valitse toisen kaupungin sääasemaa.

Ratkaisukysymys1 — Algerin kuvattomuus: B tutki49ehdokasta ja hyväksyi4luonto/puutarhakuvaa,19kuvapaikkaa jäi puuttumaan. Alkuperäinen Journal Officiel44/2003, ordonnance03-05: art8 kansalliset PD-teokset/perinteinen kulttuuriperintö; art50 poissulkee luokitellut kohteet FOPista; art139–140 ONDA-lupa ja kaupallisen käytön maksu. Vanhojen Casbah/palatsikuvien käyttöoikeus jäi epävarmaksi, niitä ei hyväksytty pelkän vanhuuden tai kuvaajan CC:n perusteella. #74 sallii epävarman kohteen kuvattomana, mutta vanha tarkistin vaatii nähtävyysjuttuun vähintään1kuvan ja oppaaseen vähintään3: kuvattomuus aiheuttaa konevirheitä. Miten #74-kuvattomuuspoikkeama sovitetaan0virhettä-porttiin? Ehdotuksena erillinen dokumentoitu kuvattomuuspoikkeama; alkuperäisen koneen virheitä ei piiloteta eikä kutsuta0:ksi. Praian maasäännössä nousi vastaava PD-käytön lupakysymys, alkuperäinen laki tarkistetaan B:ssä.

Ratkaisukysymys2 — Nouakchottin kartta: A:n muut osiot koottu, mutta WP/WD-koordinaattivaatimuksen täyttäviä kohteita löytyi2 (kalastajaranta ja Marocaine-tori, jälkimmäisestä liian vähän juttufaktoja). Ksar/Sebkhan mairie-pisteitä ei käytetä vanhan kylän/toriin korvikkeena. Kolmas Kamelmarkt-paikka on dokumentoitu de-Wikivoyage-listingkoordinaatti, ei WP/WD: sallitaisiinko tämä lähdepoikkeamana sekä perusteltu2/3kohteen kartta? Pienen kaupungin1–5sääntö ei sellaisenaan sovi miljoonan asukkaan Nouakchottiin. A:ta ei merkitty toimitusvalmiiksi eikä pisteitä arvata. Jatketaan muihin kaupunkeihin.

Alger A valmis, B poikkeama; Praia A/B työnalla. Omistajan toivoma prosenttiseuranta perustuu valmiisiin A–F-vaiheisiin/558 (93×6); ei käytettyyn aikaan. Ei vielä valmista erää, pelikytkentää tai julkaisua. Aiemmat #70/#71-generointijonot pysyvät palautteessa; tässä ei generoida kuvia/ääniä eikä toimiteta R2:een.

## 2026-10-11 16.25 UTC — VASTAANOTTO #74 ja tallennussiirron checkpoint

Panoraamavapauden lisäsääntö #74 luettu kokonaan lähdekärjestä c046a5646f63d5977f105edde637fd3ddc042c25, blob 2bbea68faeb4f6e8df760bbe30be9045596c6f1f. Kaupalliseen peliin rakennuksen/julkisen taideteoksen kuva vain kuvausmaan juuri teostyypille sallimalla kaupallisella panoraamavapaudella (Commons COM:FOP); epävarma kuva vaihdetaan tai kohde kuvattomaksi perustellen RAPORTTI.md:hen. Ei valittuja kuvia eikä valmista kaupunkia/erää. e04 TILANNE.md:n sääntöpäivitys push/readback-vahvistettu: 1599f849d6d9c9e4e4e57572579dde84fcef72af. #73:n 93 kaupungin jono ja aiempien #70/#71-kuvajonojen palauteportti säilyvät.

Omistajan pyytämä Codex/ChatGPT-datan siirto: suljettu data 31,04 GiB tarkistettuna T7:llä; uudet sessiolokit T7:lle. Omistaja hyväksyi 11.10. Mac Studion ChatGPT/Codexin tilapäisen sulkemisen, aktiivisen datan viimeistelyn ja uudelleenavauksen. Viimeistely käynnistetään erillisellä prosessilla Mac Studiolla; tilatiedosto `/Volumes/T7 4TB/ChatGPT-Codex-active/Codex-app-data/migration-20261011/viimeistely-tila.json`. Tämän pääkaupunkityön aineisto kokonaan NASilla. Robots/API-ohjeristiriita on edelleen avoin; ei kiellettyjä hakuja eikä sääarvauksia. Tämä on vastaanotto/checkpoint, ei erätoimitus, hyväksyntä, pelikytkentä tai julkaisu.

## 2026-10-11 15.52 UTC — VASTAANOTTO #72/#73: pääkaupungit e04–e14

Uusi paikallinen session työ vastaanotettu. CODEX.md, PILVIOHJE luvut 1–13 + liite A + LISÄSÄÄNTÖ, erat.md ja nimetyt sitovat resepti/spec/mallit luettu. Oma NAS-checkout, e04-kontekstit 9 kaupungille: haara `paakaupungit-e04-codex`, alkuvaiheen SHA `1f150df7de4d502b17f6eaec7bf63e5134830ef7` (push/readback vahvistettu). Tämä on aloituskuittaus, ei valmis erä tai toimitus.

#73 luettu kokonaan commitista baa84fbb18605cc373b9feafe3168f6ba745b526: Freetown ja Kotte poistettu jonosta. Koneluettava e04–e14-lista sisältää 95 kaupunkia, joten kahden poiston jälkeen 93; alkuperäisen viestin 96 oli lukumäärävirhe. Tunis ja Antananarivo kevyinä, eri kohteet kuin Karthagon/Madagaskar-lehden kannessa. Ei lautamuutoksia. Naypyidaw ja Pjongjang e10:n viimeisinä.

Palauteportti erikseen: omistajan aiempi ”Odota, tehdään yksi kerrallaan. Annan tässä palautteen” säilyy aiempien #70/#71-kuvatilausten generointitaukona. Tässä työssä ei generoida mediaa eikä toimiteta R2:een. Vastaanotto, erätoimitus, Sisältökirjurin hyväksyntä, pelikytkentä ja julkaisu pidetään erillään.

Ratkaisukysymys: robots.txt 11.10.2026 kieltää en/fi-Wikipedian, www.wikidata.orgin ja Commonsin `/w/`-polun (myös pakollisten lahde/haku/saa/tarkista-työkalujen `/w/api.php`-kyselyt; Claude-User ja Matkakirja). Kiellettyjä pyyntöjä ei ole tehty. Voidaanko toimittaa näille työkaluille hyväksytty sallittu API-reitti tai täsmentää ristiriita? Jatketaan sallittujen REST/EntityData-reittien selvitystä ja faktatyötä; sää- ja Commons-metatietoja ei arvata. Robots-tallenteet NASin `sessio-72-20261011/valiaikainen/`-kansiossa.

Omistajan 11.10. suora lisäohjaus: Codex/ChatGPT-työdata pois käynnistyslevyltä T7:lle tai NASille. Tämä toimitus ja kaikki väliaineisto NASilla; muiden töiden lokeista 29,4 GiB jo tarkistettuna siirretty T7:lle. Aktiivisen sovellusdatan siirto valmistellaan ennen tuotannon jatkoa.



## 2026-10-13T14:55:57.647317+00:00 — KUVATOIMITUS: omistajan hyväksymä batch-0088,1040 sidosta

Toimitusmanifesti `posti/paakaupungit-kuvat-batch-0088-20261013.json`, lähdehaarojen jaapplyn kuitit sekä täsmäomistajahyväksyntä samannimisissä liitteissä. 622havainnekuvaa+418Commons-kuvaa,93kaupunkia/11haaraa; kaikkiQA/R2-varmennettu. Koko tuotettu654natiiviversion inventaario `posti/paakaupungit-kuvat-batch-0088-20261013-produced-inventory.json` on arkisto-/tarkistusaineistoa, ei uusien/vanhojen hylättyjen versioiden runtimeaktivointia. Task117 Commons-only -ohje vastaanotettu lähteestä b78d34283075415e05ed7ba79094d7a16a0a3a30; publisher ei käynnistä generointeja/uusintoja, rootin14stopviestiä kirjattu. Vahvista1040sidoksen vastaanotto ja anna seuraavan Commons-haku-/QA-työn kaupunki/slot-ohjeet. Omistajahyväksyntä kyllä; peli/runtimejulkaisu ei varmennettu, Bissau PHOTO oikeus-HOLD säilyy.
