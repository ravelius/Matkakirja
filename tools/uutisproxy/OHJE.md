# Uutisvälityksen käyttöönotto (omistajalle, n. 5 min)

> **Päivitys 6.9.2026 (Hongkong):** sallittuihin lisättiin
> `https://hongkongfp.com/` (maalehti HKG, testattu 6.9.2026: syötteessä
> kolmekymmentä juttua, ja artikkelisivun `<article>`-lohkosta jäsentyy
> 19–33 yli 60 merkin kappaletta sekä `og:image`). Syöteosoitteen
> loppukauttaviiva on pakollinen, koska ilman sitä palvelin vastaa
> uudelleenohjauksella eikä worker seuraa niitä. Kiinankielistä lähdettä
> etsittiin yhdestätoista paikasta ilman tulosta — RTHK ja Bastille Post
> läpäisivät syötetestin mutta eivät artikkelisivutestiä, Ming Pao ja
> HKET vastaavat 403:lla, eikä HK01:llä, am730:llä, Sing Taolla, Wen Wei
> Polla, Ta Kung Paolla, on.cc:llä tai HKCNewsillä ole toimivaa
> RSS-osoitetta; perustelut ovat js/packs/uutislahteet.js:n
> HKG-kommentissa. Julkaisu Git-integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Myanmar):** sallittuihin lisättiin
> myanmar-now.org (maalehti MMR, testattu 6.9.2026: burmankielisessä
> syötteessä kymmenen juttua, artikkelisivun ainoasta
> `<article>`-lohkosta jäsentyy 18–24 yli 60 merkin kappaletta ja
> `og:image` löytyy). Syöteosoitteen `…/mm/feed/` loppukauttaviiva on
> pakollinen: ilman sitä palvelin vastaa 301:llä eikä worker seuraa
> uudelleenohjauksia. Eleven Median RSS vastaa 200:lla mutta on tyhjä,
> ja The Irrawaddy sekä Mizzima ovat Cloudflaren botti-eston takana;
> perustelut hylkäyksille ovat js/packs/uutislahteet.js:n
> MMR-kommentissa. Julkaisu Git-integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Sri Lanka):** sallittuihin lisättiin
> `https://sinhala.adaderana.lk/` (maalehti LKA, Ada Derana Sinhala,
> testattu 6.9.2026: syötteessä 25 juttua, ja kahden artikkelisivun
> ainoasta `<article>`-lohkosta jäsentyi 5 ja 9 yli 60 merkin kappaletta
> sekä `og:image`). Osoite on kirjoitettava täsmälleen oikein, koska
> worker ei seuraa uudelleenohjauksia: syöte on `sinhala.adaderana.lk/
> rss.xml`, kun taas vanha `rss.php` sekä `adaderana.lk` ja
> `www.adaderana.lk` vastaavat 301:llä. Sinhalankielinen lähde valittiin
> saman talon englanninkielisen ohi, koska maalehtiohje asettaa
> paikalliskielisen lähteen ensisijaiseksi. Daily Mirror on Cloudflaren
> botti-eston takana ja Hiru Newsin RSS-osoite vastaa 404:llä; perustelut
> ovat js/packs/uutislahteet.js:n LKA-kommentissa. Julkaisu
> Git-integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Namibia):** sallittuihin lisättiin
> neweralive.na (maalehti NAM, testattu 6.9.2026: syötteessä kymmenen
> juttua, ja artikkelisivun ensimmäisestä `<article>`-lohkosta jäsentyy
> 7–18 yli 60 merkin kappaletta sekä `og:image`). Osoitteessa EI ole
> www-etuliitettä, eikä worker seuraa uudelleenohjauksia. Maan luetuin
> lehti The Namibian hylättiin: sen artikkelisivun ensimmäinen
> `<article>` on sivupalkin juttukortti ilman leipätekstiä — sama vika
> kuin Nigerian Premium Timesissä. Muut hylätyt on lueteltu
> js/packs/uutislahteet.js:n NAM-kommentissa. Julkaisu Git-
> integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Kamerun):** sallittuihin lisättiin
> datacameroon.com (maalehti CMR, testattu 6.9.2026: syötteessä
> kymmenen juttua, ja artikkelisivun ainoasta `<article>`-lohkosta
> jäsentyy seitsemästä kahdeksaan yli 60 merkin kappaletta sekä
> `og:image` — testattu kaksi eri artikkelia). Osoitteessa ei ole
> www-etuliitettä. Kamerunin luetuimmat uutissivustot kaatuivat
> artikkelisivun testiin, ei syötteen: perustelut hylkäyksille ovat
> js/packs/uutislahteet.js:n CMR-kommentissa. Julkaisu Git-
> integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Saint Helena):** sallittuihin lisättiin
> www.sainthelena.gov.sh (maalehti SHN, testattu 6.9.2026: syötteessä
> kymmenen juttua, artikkelisivun ainoasta `<article>`-lohkosta jäsentyy
> viisi yli 60 merkin kappaletta ja `og:image` löytyy). Lähde on saaren
> hallinnon oma uutissyöte eikä lehtitalo: The Sentinelin syöte
> (www.sams.sh/feed/) on jäänyt päivittämättä lokakuusta 2024 ja The St
> Helena Independent (www.independent.sh) vastaa tietokantavirheellä.
> Perustelut ovat js/packs/uutislahteet.js:n SHN-kommentissa. Julkaisu
> Git-integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Kongon demokraattinen tasavalta):** sallittuihin
> lisättiin www.radiookapi.net (maalehti COD, testattu 6.9.2026:
> syötteessä viisikymmentä juttua, artikkelisivun `<article>`-lohkosta
> jäsentyy kahdeksan yli 60 merkin kappaletta ja `og:image` löytyy).
> Actualite.cd hylättiin, koska sen artikkelisivun `<article>`-lohkossa
> on vain otsikko ja leipäteksti jää sen ulkopuolelle; 7sur7.cd ja
> Mediacongo eivät tarjoa toimivaa RSS-osoitetta ja Politico.cd:n syöte
> vastaa 301:llä. Perustelut ovat js/packs/uutislahteet.js:n
> COD-kommentissa. Julkaisu tapahtuu automaattisesti mainista, kuten
> alempien merkintöjen kohdalla.
>
> **Päivitys 6.9.2026 (Nepal):** sallittuihin lisättiin
> www.onlinekhabar.com (maalehti NPL, testattu 6.9.2026: syötteessä 55
> juttua nepaliksi, ja artikkelisivun ainoasta `<article>`-lohkosta
> jäsentyy 30–58 yli 60 merkin kappaletta sekä `og:image`).
> Onlinekhabarin yksi ainoa `<article>` on syy valintaan: Nagarik News
> ja Khabarhub läpäisevät testit, mutta niillä on viisi ja kaksi
> lohkoa, joista ensimmäinen ei ole itse juttu. Kantipurin
> `ekantipur.com/rss` palauttaa RSS:n sijaan HTML-sivun, ja Setopatin
> sekä Ratopatin artikkelisivuilta puuttuu sekä `<article>` että
> `[itemprop="articleBody"]`; perustelut ovat
> js/packs/uutislahteet.js:n NPL-kommentissa. Julkaisu Git-
> integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Madagaskar):** sallittuihin lisättiin
> www.lexpress.mg (maalehti MDG, testattu 6.9.2026: syötteessä 25
> juttua, artikkelisivun ensimmäisestä `<article>`-lohkosta jäsentyy
> yhdeksän yli 60 merkin kappaletta ja `og:image` löytyy). L'Express de
> Madagascar julkaisee Bloggerissa, joten syöteosoite on
> `/feeds/posts/default?alt=rss` — juurihakemiston `/feed/` palauttaa
> 404:n. Malagassinkielistä lähdettä ei löytynyt: Newsmadan
> artikkelisivulta puuttuvat og-merkinnät kokonaan, ja Gazetiko, Ao
> Raha, Inona no vaovao, Gasikara ja TV Plus eivät vastanneet
> lainkaan; perustelut ovat js/packs/uutislahteet.js:n MDG-kommentissa.
> Julkaisu Git-integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Sierra Leone):** sallittuihin lisättiin
> sierraloaded.sl (maalehti SLE, testattu 6.9.2026: syötteessä kymmenen
> juttua, artikkelisivun ensimmäisestä `<article>`-lohkosta jäsentyy
> viisitoista yli 60 merkin kappaletta ja `og:image` löytyy). Osoite on
> ilman www-etuliitettä, koska sekä syöte että artikkelilinkit ovat
> isäntänimellä `sierraloaded.sl`. Awoko, Politico SL, Concord Times,
> Standard Times Press ja Sierra Leone Times hylättiin (varmennevirhe,
> 404, 302 ja 403); perustelut ovat js/packs/uutislahteet.js:n
> SLE-kommentissa. Julkaisu tapahtuu integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Kazakstan):** sallittuihin lisättiin
> kaz.nur.kz (maalehti KAZ, testattu 6.9.2026: syötteessä
> viisikymmentä juttua, ja artikkelisivun `<article>`-lohkosta jäsentyy
> kymmenen yli 60 merkin kappaletta sekä `og:image`). Alitunnus on
> kirjoitettava täsmälleen oikein: kazakinkielinen laitos on
> `kaz.nur.kz`, venäjänkielinen `www.nur.kz`, eivätkä ne ole workerille
> sama isäntänimi. Egemen Qazaqstanin ja Kazinformin syötteet aukeavat,
> mutta niiden artikkelisivuilta puuttuu `<article>`; perustelut
> hylkäyksille ovat js/packs/uutislahteet.js:n KAZ-kommentissa.
> Julkaisu Git-integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Afganistan):** sallittuihin lisättiin
> `https://tolonews.com/` (maalehti AFG, testattu 6.9.2026:
> darinkielisessä syötteessä `https://tolonews.com/fa/rss.xml` on
> kolmekymmentä juttua, ja artikkelisivun `<article>`-lohkosta jäsentyy
> 15–23 yli 60 merkin kappaletta sekä `og:image`). Osoitteessa EI ole
> www-etuliitettä, ja sekä syöte että artikkelilinkit ovat samalla
> isäntänimellä. Pajhwok (410), Khaama Press (captcha), Ariana News
> (Sucuri 403) ja 8am.media (tyhjä syöte) hylättiin; perustelut ovat
> js/packs/uutislahteet.js:n AFG-kommentissa. Julkaisu
> Git-integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Singapore):** sallittuihin lisättiin
> www.channelnewsasia.com (maalehti SGP, testattu 6.9.2026: CNA:n
> Singapore-osaston syötteestä jäsentyy kaksitoista juttua, ja kolmesta
> eri artikkelisivusta poimittiin `<article>`-lohkosta 10, 19 ja 47 yli
> 60 merkin kappaletta sekä `og:image` joka kerta). Syötteen osoitteessa
> on kyselymerkkijono (`?_format=xml&category=10416`), mutta sallittujen
> lista vertaa vain osoitteen alkua, joten pelkkä isäntänimi riittää.
> The Straits Times hylättiin, koska sen artikkelisivuista vain osalla
> on `<article>`-elementti; Berita Harianilla (malaiji) sitä ei ole
> lainkaan ja Zaobaon (kiina) kokeillut RSS-osoitteet vastaavat
> 404:llä. Tamil Murasu läpäisi molemmat testit ja on kirjattu
> varalähteeksi js/packs/uutislahteet.js:n SGP-kommenttiin. Julkaisu
> Git-integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Kenia, Tansania, Uganda):** sallittuihin
> lisättiin capitalfm.africa, globalpublishers.co.tz ja nilepost.co.ug
> (maalehdet KEN/TZA/UGA, testattu 6.9.2026: syöte aukeaa,
> artikkelisivun ensimmäisestä `<article>`-lohkosta jäsentyy leipäteksti
> ja `og:image` löytyy). Kaksi osoitetta on kirjoitettava täsmälleen
> oikein, koska worker ei seuraa uudelleenohjauksia: Capital FM on
> `.africa` (`.co.ke` vastaa 301:llä) ja Nile Postin syöteosoitteesta
> puuttuu loppukauttaviiva. Nation-ryhmän lehdet (Daily Nation, Taifa
> Leo, Daily Monitor, Mwananchi, The Citizen) ovat kaikissa kolmessa
> maassa Cloudflaren botti-eston takana; perustelut hylkäyksille ovat
> js/packs/uutislahteet.js:n maakohtaisissa kommenteissa. Julkaisu Git-
> integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Marokko, Algeria, Tunisia):** sallittuihin
> lisättiin www.hespress.com, www.tsa-algerie.com ja africanmanager.com
> (maalehdet MAR/DZA/TUN, testattu 6.9.2026: syöte aukeaa,
> artikkelisivulta jäsentyy leipäteksti ja `og:image` löytyy).
> Hespress on arabiankielinen, ja oikealta vasemmalle kirjoitettava
> teksti toimii ilman lisätöitä. TSA:n artikkelisivulla on myös
> `[itemprop="articleBody"]`. Tunisiassa kolme suosittua lähdettä
> hylättiin artikkelisivutestissä (Mosaique FM, Kapitalis, Leaders);
> perustelut ovat js/packs/uutislahteet.js:n TUN-kommentissa.
> Julkaisu Git-integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Nigeria, Ghana, Senegal):** sallittuihin
> lisättiin dailytrust.com, www.adomonline.com ja aps.sn (maalehdet
> NGA/GHA/SEN, testattu 6.9.2026: syöte aukeaa, artikkelisivun
> ensimmäisestä `<article>`-lohkosta jäsentyy leipäteksti ja `og:image`
> löytyy). Nigeriassa hylättiin muun muassa Premium Times ja Vanguard:
> niiden sivun ensimmäinen `<article>` on sivupalkin juttukortti, josta
> ei jäsenny yhtään yli 60 merkin kappaletta — ja juuri sen
> js/uutiset.js poimii. Muut hylätyt on lueteltu
> js/packs/uutislahteet.js:n kommenteissa. Julkaisu Git-integraatiolla
> mainista.
>
> **Päivitys 6.9.2026 (Guatemala, Nicaragua, Panama):** sallittuihin
> lisättiin lahora.gt, www.confidencial.digital, confidencial.digital ja
> www.panamaamerica.com.pa (maalehdet GTM/NIC/PAN, testattu 6.9.2026:
> syöte aukeaa, artikkelisivun `<article>`-lohkosta jäsentyy leipäteksti
> ja `og:image` löytyy). Confidencialin syöte on www-osoitteessa mutta
> sen artikkelilinkit ilman www:tä, joten listalla on molemmat
> isäntänimet. Prensa Libren (Guatemala) syöte aukeaa mutta
> artikkelisivulta puuttuu sekä `<article>` että
> `[itemprop="articleBody"]`, joten se hylättiin. Julkaisu tapahtuu
> automaattisesti mainista, kuten alempien merkintöjen kohdalla.
>
> **Päivitys 6.9.2026 (Sudan, Etelä-Sudan):** sallittuihin lisättiin
> www.dabangasudan.org ja www.radiotamazuj.org (maalehdet SDN/SDS,
> testattu 6.9.2026: syötteessä kaksitoista juttua, artikkelisivun
> `<article>`-lohkosta jäsentyy leipäteksti ja `og:image` löytyy).
> Radio Tamazujin osoite `/en/rss` ohjaa osoitteeseen `/en/feed`, eikä
> worker seuraa uudelleenohjauksia — taulussa on siksi lopullinen
> osoite. **Etiopia jäi ilman uutislähdettä:** Fana Median amharan-
> kielinen syöte aukeaa, mutta artikkelisivun leipäteksti ei ole
> `<p>`-elementeissä, ja muut kokeillut sivustot olivat botti-eston
> takana tai ilman toimivaa RSS-osoitetta; perustelut ovat
> js/packs/uutislahteet.js:n ETH-kommentissa. Julkaisu Git-
> integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Papua-Uusi-Guinea, Salomonsaaret):**
> sallittuihin lisättiin www.postcourier.com.pg ja
> theislandsun.com.sb (maalehdet PNG/SLB, testattu 6.9.2026: syötteessä
> kymmenen juttua, artikkelisivun ensimmäisestä `<article>`-lohkosta
> jäsentyy leipäteksti ja `og:image` löytyy). **Fidži jäi ilman
> uutislähdettä:** Fiji Timesin ja FBC Newsin syötteet aukeavat, mutta
> kummankaan artikkelisivulla ei ole `<article>`-elementtiä eikä
> `[itemprop="articleBody"]`-merkintää, ja perustelut ovat
> js/packs/uutislahteet.js:n FJI-kommentissa. Julkaisu Git-
> integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Uruguay, Paraguay, Venezuela):** sallittuihin
> lisättiin www.montevideo.com.uy, www.abc.com.py ja www.elnacional.com
> (maalehdet URY/PRY/VEN, testattu 6.9.2026: syöte aukeaa, artikkelisivun
> ensimmäisestä `<article>`-lohkosta jäsentyy leipäteksti ja `og:image`
> löytyy). ABC Colorin syöteosoitteessa on kyselymerkkijono
> (`?outputType=xml`); se kulkee workerin läpi ongelmitta, koska peli
> koodaa koko osoitteen url-parametriin. Julkaisu Git-integraatiolla
> mainista.
>
> **Päivitys 6.9.2026 (Chile, Kolumbia):** sallittuihin lisättiin
> www.lanacion.cl ja www.lasillavacia.com (maalehdet CHL/COL, testattu
> 6.9.2026: syöte aukeaa, artikkelisivun ensimmäisestä `<article>`-
> lohkosta jäsentyy leipäteksti ja `og:image` löytyy). **Kuuba jäi ilman
> uutislähdettä:** yksikään tavoitettavissa ollut kuubalainen sivusto ei
> läpäissyt artikkelisivutestiä, ja perustelut ovat
> js/packs/uutislahteet.js:n CUB-kommentissa. Julkaisu Git-
> integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Kanada, Meksiko, Peru):** sallittuihin lisättiin
> globalnews.ca, www.jornada.com.mx ja rpp.pe (maalehdet CAN/MEX/PER,
> testattu 6.9.2026: syöte aukeaa, artikkelisivulta jäsentyy `<article>` ja
> `og:image`). Julkaisu Git-integraatiolla mainista.
>
> **Päivitys 7.8.2026 (automaattijulkaisu):** repo on kytketty
> Cloudflaren Git-integraatioon (Workers Builds), ja repossa on nyt
> `wrangler.jsonc`, joka kertoo sille workerin sisääntulopisteen.
> Jokainen push main-haaraan julkaisee `tools/uutisproxy/worker.js`:n
> itsestään — **Edit code → Deploy -käsivaihetta ei enää tarvita**,
> ja alla olevien vanhojen päivitysmerkintöjen käsijulkaisuohjeet
> jäävät historiaan. Käsijulkaisu toimii yhä varakeinona, jos
> integraatio joskus irrotetaan. Tämä julkaisu vei voimaan myös
> Saksan ja Ruotsin lähteet (alla).

> **Päivitys 7.8.2026 (Saksa/Berliini, v316):** sallittuihin
> lisättiin Saksan uutislähde (tagesschau:
> `https://www.tagesschau.de/`) Berliinin lehteä varten. Julkaise
> worker kerran uudelleen: **Edit code → liitä tuore `worker.js` →
> Deploy.** Siihen asti Berliinin lehti näkyy ilman uutisosiota —
> mikään ei mene rikki. Sama julkaisu tuo kaikki aiemmatkin
> päivitykset (myös alla olevan Ruotsin).

> **Päivitys 7.8.2026 (Ruotsi/Tukholma, v315):** sallittuihin lisättiin Ruotsin uutislähde
> (`https://www.svt.se/`) Tukholman lehteä varten. Julkaise worker
> kerran uudelleen: **Edit code → liitä tuore `worker.js` → Deploy.**
> Siihen asti Tukholman lehti näkyy ilman uutisosiota — muu lehti
> toimii normaalisti. Sama julkaisu tuo kaikki aiemmatkin
> päivitykset.

> **Päivitys 4 (v305):** sallittuihin lisättiin Britannian
> uutislähde (BBC: `feeds.bbci.co.uk`, `www.bbc.co.uk`,
> `www.bbc.com`) Lontoon lehteä varten. Julkaise worker kerran
> uudelleen: **Edit code → liitä tuore `worker.js` → Deploy.**
> Sama julkaisu tuo kaikki aiemmatkin päivitykset.

> **Päivitys 3 (v297):** sallittuihin lisättiin Egyptin uutislähde
> (`https://www.youm7.com/`) Kairon lehteä varten. Julkaise worker
> kerran uudelleen: **Edit code → liitä tuore `worker.js` → Deploy.**
> Siihen asti Kairon lehti näkyy ilman uutisosiota — mikään ei mene
> rikki.

> **Päivitys 5.8.2026 (v280):** worker hakee nyt myös uutisten
> artikkelisivut, jotta popupissa näkyy koko leipäteksti. Jos otit
> workerin käyttöön ennen tätä, julkaise se kerran uudelleen:
> **Edit code → poista vanha → liitä tuore `worker.js` → Deploy.**
> Ennen uudelleenjulkaisua popup näyttää vain syötteen lyhyen
> kuvauksen — mikään ei mene rikki.

> **Päivitys 6.8.2026 (Espanja/Madrid):** sallittuihin lisättiin
> `https://www.20minutos.es/` (Espanjan uutislähde). **Julkaise worker
> uudelleen: Edit code → liitä tuore `worker.js` → Deploy.** Siihen
> asti Espanjan lehden uutisosio on piilossa; muut maat toimivat
> ennallaan.

Lehden maaosaston uutisotsikot tarvitsevat pienen välityspalvelimen,
koska uutissivustot eivät salli selaimen hakea RSS-syötteitään suoraan
toiselta sivustolta (CORS). Välitys on ilmainen Cloudflare Worker —
alla vaiheet. Siihen asti uutisosio pysyy pelissä piilossa, eikä
mikään mene rikki.

## Vaiheet

1. Mene osoitteeseen <https://dash.cloudflare.com> ja kirjaudu
   (ilmainen tili riittää; luo tili jos ei vielä ole).
2. Valitse vasemmalta **Workers & Pages** → **Create** →
   **Create Worker**.
3. Anna nimeksi esim. `matkakirja-uutiset` ja paina **Deploy**.
4. Paina **Edit code**, poista mallikoodi ja liitä tilalle koko
   tiedosto `tools/uutisproxy/worker.js` tästä repositoriosta.
   Paina **Deploy** uudelleen.
5. Kopioi workerin osoite (muotoa
   `https://matkakirja-uutiset.<tunnus>.workers.dev`).
6. Avaa `js/packs/uutislahteet.js` ja kirjoita osoite UUTISPROXY-
   vakioon:

   ```js
   export const UUTISPROXY = 'https://matkakirja-uutiset.<tunnus>.workers.dev';
   ```

7. Julkaise peli normaalisti (versionosto + PR). Uutisosio ilmestyy
   lehden maaosastoon niissä maissa, joilla on lähde
   `UUTISLAHTEET`-listassa (aluksi Italia/ANSA).

## Kun lisäät uuden maan uutislähteen

Lisää syötteen osoite KAHTEEN paikkaan:

1. `js/packs/uutislahteet.js` → `UUTISLAHTEET` (nimi, kieli, syote)
2. `tools/uutisproxy/worker.js` → `SALLITUT`-lista

Kun muutos on mainissa, Cloudflaren Git-integraatio julkaisee
workerin itsestään (7.8.2026 alkaen, ks. ylin päivitysmerkintä) —
mitään ei tarvitse tehdä käsin. Jos integraatio ei ole käytössä,
varakeino on entinen käsijulkaisu: Edit code → liitä → Deploy.

Sallittujen lista on turvatoimi: ilman sitä kuka tahansa voisi
käyttää workeria yleisenä välityspalvelimena.

## Kustannus ja rajat

Cloudflaren ilmainen taso sallii 100 000 pyyntöä päivässä, ja worker
pitää syötettä 10 minuutin välimuistissa — perhekäytössä rajat eivät
tule koskaan vastaan. Käännösnappi käyttää MyMemory-palvelua suoraan
selaimesta (ilmainen, n. 5 000 merkkiä päivässä per käyttäjä) — se ei
kulje workerin kautta.
