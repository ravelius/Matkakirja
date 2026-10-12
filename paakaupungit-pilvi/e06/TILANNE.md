# e06 — A-vaiheen faktakokoaja

Alkuaika: 2026-10-11T20:04:50+03:00 (Europe/Helsinki).
Pohja: e4f2845b3a82874550481fda26528df065820232. Haara: paakaupungit-e06-codex.
Oma klooni: /Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/e06.

Vaihe 0: yhdeksän kontekstia ja saa-syote.json luotu alkuperäisellä tyokalu.mjs:llä. Sääaineisto odottaa pääsession alkuperäistä saa-ajoa; lukuja ei kopioida käsin.

| Kaupunki | A | B | C | D | E | F |
|---|---|---|---|---|---|---|
| libreville | A koottu; 6 karttakandidaattia, rajaus-/tyyppipoikkeus avoin; FCDO yleissivu luettu | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| ciudaddelapaz | lähdepaketti tehty; täysi A estyy: 0 karttakohdetta, opas/teema vajaat | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| saotome | A koottu; 6 ehdotusta, Obô-rajaus ja 2 kirkon oikeusportti avoin | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| bangui | lähdepaketti tehty; täysi A estyy kartta-/opasminimiin; ruokanosto korjattu | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| brazzaville | A koottu; 6 ehdotusta, 1 koordinaattipoikkeus ja katedraalin vanhan kuvan portti | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| kinshasa | A koottu; 6 Wiki/Wikidata-ehdotusta, retkirajaus/zoo-nykytila/Lola-lupa avoin | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| luanda | A koottu; 6 historiallista ydinkohdetta, Jesusin uudet osat B-oikeusportissa | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| kigali | A koottu; 6 Wiki/Wikidata-ehdotusta, luontokartan rajaus ja talon B-oikeusportti | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| gitega | lähdepaketti tehty; täysi A estyy karttaminimiin ja Gishoran 1873-ajoitukseen | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |

A-valmis tarkoittaa vain lähteistettyä faktapohjaa. Kaupunkia ei ole kirjoitettu, kuvitettu, kytketty tai julkaistu.

## Poikkeukset ja lähdekuri

- Omistajan 11.10.2026 lähdepoikkeus: robots-sallitut tavalliset /wiki/-lähdesivut hyväksytään estettyjen API-polkujen sijaan. /w/, /api/ ja Commons Special:Search ovat kiellettyjä. Kaikki lähdesivut haetaan yhteisellä sallittu_haku.py-apurilla (Claude-User ja Matkakirja, redirectit, lähdevarasto, globaali 1/s). Commons-hakuja tai lisenssivalintoja ei tehdä tässä A-sessiossa.
- Omistajan rajaus: erillinen faktakokoaja, ei apuagentteja tai lisäsessioita, ei postilaatikkoa eikä viestejä pääsessioon. Pääsessio lukee tilan.
- Työaineisto ja kirjoituskohteet rajattu NAS-tehtäväjuureen; yhden pycache-polun korjattu kirjoitusvirhe dokumentoitu alla. TMPDIR ja PYTHONPYCACHEPREFIX valiaikainen/e06:ssa; NAS AppleDouble ._* suljettu oman .git/info/exclude:n kautta.
- Hiekkalaatikon prosessin alustus epäonnistui symbolisen työtilapolun vuoksi. Alun NAS-komennot suoritettiin hyväksytyllä eskalaatiolla; jatkoviestin jälkeen profiili oli ilman hiekkalaatikkoa. Yhteiseen checkoutiin ei koskettu.
- Sisältötyön CODEX/PILVIOHJE-poikkeus: ei koko npm test -ajoa; ei sisalto.json:ia, PR:ää tai mergeä.
- Tarkat luvut: kaksi riippumatonta lähdettä; muuten noin/vuosisata tai poisto. Kontekstin hyväksytty väestöluku kirjataan laajuuksineen lähdehuomioksi, ei kopioida tarkkana ilman lisävahvistusta.
- Kaupallinen peli (#74): modernit suojatut teokset ja rakennukset jätetään pois, jos kaupallinen FOP teostyypille ei ole varma. Luontokohteet ensisijaisia; kuvien tiedostolisenssi ja kohteen oikeudet kuuluvat myöhempään B-vaiheeseen.

## Libreville A

Lähteistetty 0–9-rakenne koottu. 1849 kahdesta riippumattomasta lähteestä; muut epävarmat tarkat luvut poistettu/pyöristetty. Karttaehdotus ulottuu historiallisen ytimen lisäksi estuaarin retkiluontoon: pääsession hyväksyntää vaativa rajauspoikkeus, ei valmiiksi hyväksytty kartta. Mont-Bouët tarvitsee aukio-tyyppisovituksen. UM:n /c/GA palautti yleissivun; FCDO Gabon -yleissivu luettu myöhemmin, ei kategorista välttämisohjetta eikä riskittömyysväitettä. IPHAMETRA HTTP 500.

## Ciudad de la Paz A-este

Nykykaupunki uusi; ei lähteistettyä historiallista keskustakantaa. Konteksti jo kieltää uuden hallintorakentamisen kuvakohteet 70 vuoden säännöllä. Lähteistetty täysi 0–9-raportti kertoo puutteet: 0 karttakohdetta, neljän teemanoston ja viiden matkasuosituksen faktamäärä ei täyty, nykyinen opas puutteellinen. Ei A-valmis-merkintää. Virallinen asetuslinkki palautti vain 161 tavua, ei luettavaa dokumenttia. Pääsession ratkaistava kevyenä pitäminen / lisälähteet. Kaupunkia ei ohitettu työlistasta.

## São Tomé A

0–9-lähdepaketti koottu. Linnakkeen/perustamisen vuosiristiriidat vuosisatamuotoon. Kuusi karttakandidaattia, mutta Obô on erillinen retkikohde ja kahden kirkon nykyjulkisivujen FOP/historiallisuus vaatii lisävahvistuksen. WIPO-lain metatiedot luettu, PDF 403 ja vaihtoehtoinen /edocs/lexdocs/ robots-kielletty: ei lain sisällön lukuväitettä. Palatsi pois kuvauskiellon vuoksi. Ei valmiin kartan tai kuvien hyväksyntää.

## Bangui A-este

UNESCO metallurginen historia luettu. FOP-yhteenveto ei kata still-valokuvia suojatuista teoksista; modernit rakennukset/patsaat pois. Käyttövalmiita kuutta keskustakohdetta ei löytynyt; UNESCO-koordinaatti vaatii lähdesäännön poikkeuksen, Ubangin paikallinen piste puuttuu, Boali ei kuulu keskustakarttaan. Ruokanoston T3 varsinainen faktamäärä täydennetty viiteen Fufu/Cassava-lähteiden avulla. FCDO 11.10.2026: Banguihin muu kuin välttämätön matkustus vältettävä; muu maa ei matkasuositukseksi. Täyttä A:ta ei merkitä valmiiksi.

## Brazzaville A

0–9 koottu, musiikkiteema UNESCO City/Rumba-lähteillä. Kuusi ehdotusta, Ramsar-piste ensisijaislähteestä poikkeusehdotuksena, ei Wikipedia/Wikidata. Ile Mbamou -hallintoalueen väärä kaupunkipiste hylätty; Mbamu-saaren oikea piste luettu. Erell-teokset pois; katedraalista vain varmennettava vapaa ennen suojattuja uudistuksia oleva vanha asu. Luontopaikkojen mahdollinen yhdistäminen ja rajaus pääsession ratkaistava. Kinshasaan ei samaa rumbateemaa.

## Kinshasa A

0–9 koottu, kuusi luontopainotteista koordinaattia Wikipedia/Wikidata. Maalehden ruokaa/rumbaa ei toisteta; teema kasvipuutarhan toimintaan ja bonobosuojaan. UM:n nykyinen matkustustiedote luettu. Eteläiset kolme kohdetta erillinen retkialue: karttarajauspoikkeus avoin. Zoo-domain ei ratkennut, nykytilaa ei luvata. Lolan virallinen kuvauspolitiikka ammattilaisille lupa / puhelinkuvat henkilökohtaisia; valittavan kaupallisen tiedoston ja paikkaluvan portti avoin. Ei kuva- tai karttahyväksyntää.

## Luanda A

0–9 koottu, kuusi vanhan ytimen historiallista/naturapaikkaa Wikipedia/Wikidata-koordinaatein. São Miguelin olemassa oleva lähinosto pois uudesta nostosta/kartasta. Lentoasemaksi NBJ (Airlinkin oma vaihtoilmoitus + kenttäartikkeli), vanha LDA ei nykyoppaaksi. Väestö maakunta. Sé/Conceição vs Remédios -nimisekaannus ja Carmon/São Miguelin vuosiristiriidat kirjattu. HPIP TLS-este, ei sisällön lukuväitettä. Jesusin modernien osien FOP/tekijä sekä kaikkien varsinaisten kuvatiedostojen lisenssit jäävät B-porttiin.

## Kigali A

0–9 koottu; kuusi Wiki/Wikidata-paikkaa. Viisi luonnonympäristöä ja Kandtin vanha talopaikka, ei moderneja suojattuja tunnusrakennuksia/monumentteja. Nyandungu ministeriölähde ja Umusambi järjestäjän lähde luettu. Laaja kaupunkiluontokartta vs historiallinen keskustarajaus pääsession poikkeuspäätös; Kandtin alkuperäinen rakenne/modernit muutokset B-oikeusportti. History of Kigali = redirect pääartikkeliin, ei riippumaton lähde.

## Korjattu väliaineiston polkuvirhe

Yhdessä lukukomennossa PYTHONPYCACHEPREFIX oli kirjoitettu väärin. Se loi oman stdlib-välimuistin NAS-tehtäväjuuren ulkopuolelle (72 tiedostoa, vain .pyc/AppleDouble). Sisältö tarkistettiin ja koko oma välimuisti siirrettiin tehtäväjuureen valiaikainen/e06/korjattu-polkuvirheen-cache. Väärä ulkopuolinen hakemistopolku on poissa. Käyttäjän aineistoa ei muokattu; oikea TMPDIR ja pycache-polku käytössä.

## Gitega A-este

0–9 lähdepaketti tehty, rumpuperinne UNESCO ICH -lähteestä. Gishora-perustaja/ajankohta ristiriitainen (Ntare/1800-luvun alkupuoli vs Mwezi/1903), 1873 ei varma. Vanhan UNESCO 5141 -linkin en/fr-versiot palauttivat vain sivupohjan, ei kohdekuvausta. Kuuden historiallisen kuvakelpoisen keskustakohteen ehto ei täyty; museo/katedraali oikeudeltaan epävarmoja, tori vain Wikivoyage-piste, Ruvubu/Karera kaukana keskustasta. Ei kuutta pistettä yhdestä suojapaikasta tai väärän Tansanian Mugera-pisteestä. Pääsession ratkaistava lisälähteet/poikkeus, ei A-valmis-merkintää.

## A-sessio — tarkka lopputila

Päivitetty 2026-10-11T21:29:16+03:00. Kaikki 9 kaupungin lähdelukukierrokset ja omat faktapohja.md-tiedostot tehty. Kuudessa on täysi 0–9-paketti kuudella karttakandidaatilla (varaukset taulukossa), kolmessa täysi A jää nimenomaiseen puutteeseen: Ciudad de la Paz, Bangui ja Gitega. Varauksia ei ole hyväksytty poikkeuksiksi. B/C/D/E/F tekemättä; pääsessio hoitaa sääaineiston, jatkovaiheet ja toimitusjärjestyksen.

## Kolmen ensimmäisen kaupungin lisätarkistus

FCDO Gabon / Equatorial Guinea / São Tomé and Príncipe -maakohtaiset Warnings and insurance -sivut luettu 11.10.2026. Sivujen current-at-kenttä sama päivä; ei kategorista välttämisohjetta yleissivuilla. Ei riskittömyysväitettä, viisumi-/terveys-/vakuutus-/rikollisuusohjeita tai Safety and security -koko-osion läpikäynnin väitettä.

Ciudad de la Paz -kontekstin Malabo = maan suurin kaupunki -väite ristiriidassa luetun Bata-artikkelin kanssa. Superlatiivi pois uudesta faktapaketista; konteksti.json säilytetty alkuperäisenä, korjaushavainto pääsession tarkistukseen.

## Pääsession rinnakkainen säävalmistelu

Lopputarkistuksessa havaittiin työpuussa pääsession SAA-VALMISTELU.md, kuuden kaupungin saa.json (Bangui, Brazzaville, Kinshasa, Luanda, Kigali, Gitega), muutettu saa-syote.json ja viiden aiemman faktapohjan säätaustalisäyksiä. Näitä ei tämän agentin loppucommitissa stageroida tai nollata. Gitegan omaan muuttamattomaan A-tiedostoon lisättiin vain olemassa olevan saa.json:n tausta-metatietoviite. A-rakenne tarkistettiin omasta commit-snapshotista 6f190ecc4a21af86f7c77f916a17e9859bbb6134, jotta muiden säämuutoksia ei kutsuta tämän agentin tarkistamaksi tai valmiiksi toimittamaksi.

## Pääsession säävalmistelu ja lähdehylkäykset

Alkuperäisen sääpoiminnan numeerinen tarkistus tuotti 6/9 riviä. Lähdetarkistus hylkäsi myöhemmin Luandan ja Kinshasan eri ajanjaksojen jäljitettävyysongelman; alkuperäiset tiedostot arkistoitu NAS-väliaineistoon. Käytössä 4/9: Bangui, Brazzaville, Kigali, Gitega. Libreville / Ciudad de la Paz / São Tomé konehylkäys, Luanda / Kinshasa lähdehylkäys; kaikilla viidellä saatiedot:null. A-raportin säätilan aikaisemmat luvut eivät kumoa tätä myöhempää päätöstä. SAA-VALMISTELU.md ja SAA-LAHDEHYLKAYKSET.md sisältävät näytöt.

## Omistajan uusi tekstityön nopeutus12.10.2026

Omistaja pyysi oleellista nopeutusta sekä enemmän sessioita/agentteja tavoitteenaan10x nopeus.30 pysyvää rinnakkaista sessiota luotu erillisille kaupunkijaoille. Kuvat pyydetty erillisestä Matkakirjan kuvat -putkesta, ensimmäinen Conakryn Camayennen kapokkipuut. Kirjoitetut tekstit eivät odota kuvia, puuttuvia karttapisteitä tai erillistä sääauditointia; puutteita ei arvata. Tekstiluonnoksen valmius ei ole sama kuin valmis-A–F, sisältöhyväksyntä, pelikytkentä tai julkaisu.

Välitallennus 2026-10-12T07:40:36.871526+00:00: tekstiluonnoksia 91/93 (97,8 %), osaluonnokset ja edelleen keskeneräiset kohdat omissa C-muistioissaan. Tässä erässä tallennetut ydinluonnokset: libreville, saotome, bangui, brazzaville, kinshasa, luanda, kigali, gitega. Riippumattomat D-tarkistukset ja kuvien täydentäminen jatkossa. Tämä commit on tuotannon välitallennus, ei valmis-erätoimitus.
