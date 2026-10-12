# Brasília — rajattu A-faktapohja ja C-lähdetuki

Luettu 12.10.2026. Omistus e13/brasilia. Tämä lähdekooste tukee tekstiluonnosta; ei täysi A/B/D/E/F-portti.

## 0. Luetut lähteet ja 1873-kehys

Lähteet haettiin yhteisellä sallittu_haku.py-apurilla: robots ensin molemmille User-Agenteille, ohjaukset tarkistettu, yhteinen verkkohakulukko. HTML, luettava teksti, hakumanifesti ja SHA-jäljet ovat NASin `valiaikainen/nopea-e13-brasilia/`-kansiossa. Ei kuvahakuja, API-polkuja tai PDF-kiertoa.

| Tunnus | Lähde ja luetut osiot |
|---|---|
| B1 | en-Wikipedia [Brasília](https://en.wikipedia.org/wiki/Bras%C3%ADlia): johdanto, History, Costa plan, Construction, Geography, Climate laadullisesti, Culture, Transportation, Notes. `kaupunki.html/txt`. |
| B2 | UNESCO [Brasilia](https://whc.unesco.org/en/list/445/): Brief synthesis, Authenticity, Integrity. `unesco.html/txt`. |
| B3 | en-Wikivoyage [Brasilia](https://en.wikivoyage.org/wiki/Bras%C3%ADlia): Orientation and addresses, Get in/Get around, See, Buy, Eat, Climate laadullisesti. `opas.html/txt`. |
| B4 | en-Wikipedia [Brasília National Park](https://en.wikipedia.org/wiki/Bras%C3%ADlia_National_Park): oma koordinaatti, History, Geography, Flora, Fauna. `kansallispuisto.html/txt`. |
| B5 | en-Wikipedia [Lake Paranoá](https://en.wikipedia.org/wiki/Lake_Parano%C3%A1): oma koordinaatti, johdanto, Islands. `jarvi.html/txt`. |
| B6 | en-Wikipedia [Cerrado](https://en.wikipedia.org/wiki/Cerrado): johdanto, Flora, Fauna. `cerrado.html/txt`. |
| B7 | en-Wikipedia [Maned wolf](https://en.wikipedia.org/wiki/Maned_wolf): johdanto, Description, Hunting and territoriality, Diet, Relations with other species. `harjasusi.html/txt`. |
| B8 | ICMBio [Parna de Brasília](https://www.gov.br/icmbio/pt-br/assuntos/biodiversidade/unidade-de-conservacao/unidades-de-biomas/cerrado/lista-de-ucs/parna-de-brasilia): suojelualueen virallinen tunniste, biomi, perustamissäädös ja hallinnointi. `puisto-viranomainen.html/txt`. |

B1:n aiemmin tallennettu, samalla apurilla robots-tarkistettu versio kopioitiin omaan väliaineistoon ensimmäisenä lukemista varten; myös uusi haku valmistui. Lopullinen lähdelista käyttää uutta hakua. Versioiden SHA-jäljet säilytetty erikseen. `docs/mantereet-tyoaineisto/faktapohja-brasilia.md` osoittautui Brasilian **maalehden**, ei kaupungin faktapohjaksi; siitä ei poimittu kaupunkiväitteitä.

1873: nykyistä Brasíliaa ei vielä ollut, koska B1 ja riippumaton B2 kuvaavat sen syntymisen 1900-luvulla. Kansallispuisto perustettiin vasta myöhemmin (B4 ja riippumaton B8); Paranoá-tekoallas syntyi kaupungin rakentamisen yhteydessä (B5, B1). Ei väitettä aiemmin asumattomasta seudusta, ei isoisän reittiä tai tekemisiä.

## 1. Perusfaktat ja aiherajaus

- Brasilian pääkaupunki sisämaan ylängöllä maan keskisellä länsialueella: B1 johdanto/Geography, B2 Brief synthesis.
- Suunniteltu ydin Plano Piloto; hallinnon/asumisen/liikenteen pääjaot; myöhempi laajempi kaupunkiseutu: B1 Costa plan/johdanto, B2.
- Brasília-nimellä viitataan yhteydestä riippuen koko Distrito Federaliin. Kontekstin 2 817 381 (2022) koskee koko piiriä, ei vain Plano Pilotoa. Luku ei mene lukijatekstiin. B1:n Demographics käyttää joissakin kohdissa metropolialue-termiä löyhästi; kontekstin laajuuserottelu säilyy.
- Maalehden historia/Amazon/kumipuu/terra preta/Pedro II/choro/capoeira/kahvi/feijoada/maniokki/churrasco jätetty omien nostojen ulkopuolelle.
- Kevyen pisteen perustamisvuotta ja lentokonemetaforaa ei toisteta nostoina. Artikkeli antaa kaupungin syntymisen yleisen kehyksen, nostot osoitteita, arjen kortteleita, rakentajien vedenalaista asutusta ja paikallista kulttuuria.

## 2. Kannen neljä nostoa

1. **Osoite näyttää koodilta** — B3 Orientation and addresses: SHN/SHS hotellisektorit, SCN/SCS kaupalliset sektorit, N north ja S south, SQN/SQS asuinkorttelit/superquadras, lyhenteet ja numerot. B1 johdanto tukee yleistä sektori-/numerointijakoa. Kirjainyhdistelmät ovat tunnisteita, eivät kahden lähteen lukukuria kiertäviä määrätietoja.
2. **Kortteliin suunniteltiin kokonainen arki** — B1 Costa plan: paikalliskauppa, koulut, virkistys, kirkot; suunnitelman pienet omavaraiset alueet; korkean puuston ja alemman kasvillisuuden vyöhykkeet. B2 Authenticity vahvistaa asuinkorttelit/osakokonaisuudet. Ei tarkkoja kerros- tai korttelimääriä, ei väitettä suunnitteluihanteen täydellisestä toteutumisesta.
3. **Rakentajien kylä jäi järven alle** — B1 Geography: Vila Amaury, rakentajien aiempi asutus, jäi Paranoá-järveen, sukeltajien kohde; järven vesiurheilu. B5 johdanto vahvistaa tekoaltaan muodostumisen. Noston wiki **Brasília**, koska Vila Amaury -tieto on siinä, ei järven omassa artikkelissa. Ei upotettujen talojen määrää, kylän tarkkaa sijaintia tai uhriväitteitä.
4. **Pääkaupungin oma ääni** — B1 Culture: Legião Urbana, Capital Inicial, Plebe Rude lähtöisin kaupungista; vuosittainen Brasília-elokuvafestivaali brasilialaisille elokuville. B3 Do/Drink tukee paikallisen rock-/elokuvakulttuurin käytännön kehystä. Ei "rockin syntymäpaikka"-superlatiivia, laulutekstejä, poliittisia sanoituksia tai nykyistä festivaaliaikataulua.

## 3. Teemasivu: luonto — Cerrado kaupungin ympärillä

1. **Savanni vaihtaa muotoa** — B6 johdanto/Flora: elinympäristömosaiikki; avoimempi ja puustoisempi savanni; kosteikot ja galleriametsät; maaperä, palorytmi ja hydrologia kasvillisuuden taustatekijöinä. B4/B8 paikallinen cerrado-kytkentä.
2. **Puun kuori suojaa kuumuudelta** — B6 Flora: monet kasvit sopeutuneet tuleen, paksu korkkimainen kuori auttaa kestämään kuumuutta; maaperä usein hapanta, niukasti kalsiumia/magnesiumia. Ei väitettä paloille täysin immuunista kasvista tai jokaisen puun samasta rakenteesta.
3. **Metsä seuraa vettä** — B6 Flora/Fauna: purojen varsia seuraavat korkeiden puiden galleriametsät, suljettu latvusto; tärkeä nisäkäselinympäristö, enemmän vettä ja suojaa savannin paloilta. B4 Flora vahvistaa metsät paikallisessa puistossa. Kartan vihreän nauhan lukeminen on tekstin havainnollistus tästä, ei uusi mitattu väite.
4. **Harjasusi kuljettaa hedelmän siemeniä** — B7 johdanto/Diet: pitkäjalkainen koiraeläin, avoimet/puoliavoimet ympäristöt, sekaravinto, Solanum lycocarpum eli lobeira/wolf apple, ehjien siementen levitys ulosteilla, tavallisesti yksineläjä. B4 Fauna vahvistaa lajin puistossa. Ei ruokavalion prosentteja, yksilömäärää, havaintotakuuta tai tiukkaa taksonomista "susi ei ole susi"-iskulausetta.

Minitehtävä: paksun kuoren kuumuudensietohyöty löytyy toisesta nostosta. Ei toista viiden kaupunkikysymyksen sisältöä; faktaa muotoiltu eri sanoin.

## 4. Matkailijan viisi jaksoa

- Perille ja liikkeelle: B1 Airport/Metro/Road transport, B3 Get in/Get around. Presidente Juscelino Kubitschek International Airport BSB; ei metroa lentoasemalle; Plano Piloton Rodoviária paikallisliikenteen solmuna; kaukoliikenteen terminaali eri; metro vain osalle alueista, suuria etäisyyksiä.
- Osoite on pieni kartta: B3 Orientation and addresses/Buy; SHN/SHS, N/S, Asa Norte/Asa Sul, paikalliskaupat/leipomot/ravintolat; B1 sektoreiden mittakaava.
- Järvi ja cerrado: B1 Geography, B4/B5 ja B3 See. Vesiurheilu, puisto, lähdevesien altaat ja retkeily. Ei uintikelpoisuuslupausta jokaiselle järven rannalle tai päivälle.
- Mitä täällä syödään: B3 Eat/Buy — monien osavaltioiden/kansainväliset keittiöt, por quilo -itsepalveluravintolat, annoksen painon mukaan maksu, asuinsiipien ravintolakeskittymät. Ei keittiön yksinoikeutta tai täällä keksittyä perinneruokaa.
- Milloin kannattaa tulla: B1 Climate/B3 Climate vain kuiva/sateinen kausi ja kuivan kauden alhainen ilmankosteus; varautumissuositukset. Ei kuukausia, lämpöasteita, sadelukuja tai paikallista säätä koskevia superlatiiveja.

Parasta 5: järvi, kansallispuisto, asuinsiipien arki, por quilo, musiikki/elokuva. Hyvä tietää 4: terminaalit, osoitteen suunta, metron rajallinen kattavuus, siirtymät. Nykyisen matkustusturvallisuuden ja liikennepalvelujen auditointi D-vaiheessa; ei matkustuslupaa eikä turvallisuusluokitusta.

## 5. Kohdekartta — partial 2/6–8

| Kohde | Tyyppi | lat | lon | Oma pistelähde |
|---|---|---|---|---|
| Brasílian kansallispuisto | luonto | -15.73806 | -47.92667 | B4 oman sivun koordinaatti -15.738056; -47.926667, pyöristetty 5 desimaaliin. |
| Paranoá-järvi | luonto | -15.78056 | -47.82250 | B5 oman järviartikkelin koordinaatti. |

Rajat sisältävät nämä pisteet noin 300 m marginaalilla. Tämä on kahden todellisen luontopaikan karttaehdotus, ei valmis keskustakartta. Puiston koordinaatti on sivun kohdepiste; ei lainattu Brasílian kaupungin tai koko cerrado-alueen sijaintia. Kokonaisten suurien luontokohteiden rajauksia ei esitetä kartan rajat-kentässä.

Kansallispuiston juttu: B4 History/Geography/Flora/Fauna; B8 perustaminen ja biomi. Uuden pääkaupungin perustamiseen liittyvä puisto, ei 1873:na; cerradon eri muodot, purojen metsät, lähteet ja altaat, polut/ympäristökasvatus, ICMBio, esimerkkieläimet harjasusi/jättiläismuurahaiskarhu/kapybara. Ei terapeuttisen veden väitettä, suurin-puisto-superlatiivia, pinta-alaa tai lajihavaintotakuuta.

Järven juttu: B5 johdanto/Islands/infoboxin tulovedet, B1 Geography. Patoamalla syntynyt tekoallas; Lago Norte/Lago Sul, urheiluseurat/ravintolat/yliopisto; Vila Amaury ja sukellus, vesiharrastukset, suojeltuja saaria, Torto/Gama/Riacho Fundo/Bananal. Ei järven syvyyttä/pinta-alaa/rantaviivan pituutta, suojattuja rantapalatsikohteita tai siltaa.

## 6. Kysymykset ja tiedot

5 kysymystä: maa B1, sektorin N B3, järven patoaminen B5, lobeira B7, superquadra-arjen toiminnot B1. Tasot 1/2/3. Ei oikeana vastauksena toisen pelikaupungin nimeä. 3 tietoa: hotellisektorien lyhenteet B3, Vila Amaury B1, harjasusi siementen levittäjänä B7 + esiintyminen paikallisessa puistossa B4.

## 7. Kuvatarpeet — erillinen kuvaputki

20 kuvaroolia, neljä kenttää tyhjät: valokuva 1, kansi 3, nostot 8, matkailijalle 1, oppaan jaksot 5, kohdejutut 2. Ei B-valintoja eikä kuvahakua.

Kuvaputken rajat: Brasílian yleisnäkymiin ei Niemeyerin rakennuksia, Costan kaavaa teoskuvana, Chan-siltaa, muistomerkkejä, Burle Marxin taidepuutarhoja tai uusia veistoksia. Ehdotukset: järven vesipinta/luonnollinen ranta ilman suojattuja rakennuksia, cerrado kaupungin lähellä, puiston maisema; osoitteen arki ja yleinen katuympäristö vain oikeusketjun varmistuttua; rakentajahistorian arkisto ilman suojattuja teoksia; paikallinen elokuva/musiikkitoiminta ilman suojattua julistetta, levynkantta tai lähikasvoja; cerradon mosaiikki, paksu puunkuori, galleriametsä, harjasusi/lobeira; tuore pysty luontoreitiltä; liikkuminen/osoitteet/luonto/punnittava ruoka/säävarusteet; puiston luonto ja järvi kohdekuviksi. Suojattua rakennusta ei nimetä luontopaikaksi.

## 8. Epävarmuudet ja tarkkuus

- UNESCO englanninkielinen lyhytkuvaus korostaa alkamisvuotta, pidempi kuvaus rakentamisjaksoa, B1 avajaisia. Käytetään 1900-lukua, ei sekalaisia perustamisvuosia.
- B1 tekstissä ja Notes-kohdassa lentokonemuodon tarkoituksesta on ristiriitaa. Lentokonetulkintaa ei kirjoiteta varmaksi tarkoitukseksi.
- B1 Demographics laajuudet eivät kaikki täsmää omaan Notes-kohtaan. Väestöluku jätetty pois, kontekstin Federal District -tarkennus kirjattu.
- B4/B8 pinta-ala eroaa hieman: kumpaakaan ei käytetä. B4 Fauna-listassa on myös virheellistä ryhmittelyä (käärme lintujen joukossa); kyseistä luetteloa ei käytetä lajiryhmäväitteisiin.
- B5 infoboxin/leipätekstin rantaviivaluvut eroavat. Ei rantaviivalukua.
- B3 sisältää vanhoja liikenne-/aikataulutietoja; ei reittinumeroita, hintoja tai lentoyhtiöitä. Oppaan palvelut erikseen auditointiin.
- Sää: ei 48/48 primäärivarmennusta tässä työssä. Saatiedot null, saa.json muuttamatta.

## 9. Pois jätetty

Niemeyerin rakennukset, muistomerkit, kirkot ja museorakennukset sekä Chan-silta ja uudet veistokset kohteina/kuvina. Kaupunkisuunnittelua käsitellään tietotekstinä, ei teoksen esittelykuvana tai karttapisteenä. Ei nykyistä poliittista sisältöä, nykyrikollisuutta tai lähteettömiä syy-yhteyksiä. Ei maalehden Amazon- ja keittiöaiheiden toistoa. Täysi 6–8 kohteen kartta, B/D/E/F, sääauditointi ja nykyisten palvelujen varmennus avoimia. Ei Git-operaatioita, pelitiedostojen muutoksia tai julkaisua.
