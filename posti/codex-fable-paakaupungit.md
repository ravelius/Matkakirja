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

