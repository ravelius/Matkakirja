# Noin 100 eri Tripo-rakennusta: toteutettava työnkulku

Voimassa 16.11.2026. Vastuut: tämä ohjaava chat ja sen rajatut agentti-istunnot. Ei uusia omistajan chatteja eikä ajastuksia. Viimeisin PT2470–2473 (fc6c8e7144) ja suora omistajan pyyntö määräävät järjestyksen. Ohjeen muutoksessa ohjaaja päivittää vain tämän työn jonon; globaalia postivahtia ei siirretä.

## Mitä lasketaan

Tavoite noin 100 erillistä uutta rakennusta. Saman rakennuksen osat, versiot, teksturoinnit, retopot ja uusintaotot eivät lisää lukua. Aiemmat mallit kirjataan erikseen deduplikointia varten. Vähintään 100 lisäehdokkaan lähdelista ei ole 100 hyväksyttyä mallia. Tuntemattomat kelpoisuudet merkitään avoimiksi, niitä ei täytetä arvauksilla.

Kolme erillistä lukua: (1) tuotannosta ladattu alkuperäinen + SHA256 + tekninen tarkistus, (2) lähdettä vastaavaksi visuaalisesti tarkastettu, (3) peliversio hyväksytty ja peliin kytketty. Vain (1)+(2) lasketaan tämän valmistuserän valmiiksi rakennukseksi. Vastaanotto ja peliin kytkentä todennetaan erikseen. Hylätty alkuperäinenkin säilytetään.

## Työjärjestys nyt

1. Bastiljin lähteet → yksi mallikuva-arkki → KK:n sana → yksi Tripo-otto/osaa → alle 100k kolmion / noin 10 Mt peliversio → 01/06/eteläkuvat → PT→LAV/NS→omistajan pelikatselmus. Tämä on malliperheen laatukoe.
2. Bastiljin arkin jälkeen 42 kadonneen listan aloittamattomat: GC, Temple ja kaikki jo tuotetut pois. Lähteet+mallikuvat rinnakkain, 10 kohteen arkit heti postiin. Kuvan vieressä lähde, nimi ja varmuus varma/osin arvio/arvio.
3. Samalla ≥100 lisäehdokkaan YKSI tiedosto nykyisistä pelin fokuksista/packsista, viiden kohdekaupungin olemassa olevat nähtävyydet pois. Jokapuolen vapaat lähdekuvat + ilmakuva tai mitattu pohja, lisenssi ja aukot. Lista KK:lle ennen näiden mallikuvia.
4. Massatuotannon Tripo-kutsut vasta omistajan Bastilji-pelikatselmuksen jälkeen. Yksittäisen arkin KK-hyväksyntä ei yksin avaa tätä porttia. Turku A odottaa lähde-/mallikuvajonoa ja uutta konevarausta; vanha Window5 on estetty.

## Agentit ja effortit

Istunnossa on neljä rinnakkaista paikkaa: ohjaaja + enintään kolme työntekijää. Roolit kiertävät tarpeen mukaan; kaikkia seuraavia ei pidetä kerralla käynnissä. Jo aktiiviset vanhat apuagentit saavat päättää rajatun tarkistuksensa. Uudet tehdään puhtaalla kontekstilla (fork_turns=none), mallivalinta eksplisiittisesti.

| Rooli | Malli / effort | Rajattu erä | Vastuu |
|---|---|---|---|
| Luettelointi ja arkisto | gpt-6-luna / low tai medium | 10–20 kohdetta tai yksi hakemisto | Nimet, duplikaatit, tiedostot, puuttuvat kentät; ei hyväksyntäpäätöksiä |
| Lähdepaketti ja tavallinen mallikuvabrief | gpt-6.1-sol / medium | 3–5 rakennusta | Näkymät, oikeudet, aikakausi, geometria ja epävarmuudet |
| Vaikea kadonnut rakennus | gpt-6.1-sol / high | yksi kohde | Ristiriitaisten mittojen ja piirrosten sovitus; esim. Bastilji |
| Pakkaus ja tekninen QA | gpt-6.1-terra / medium | 5–10 tiedostoa | Skriptit, GLB-rakenne, kolmiot, tekstuurit, SHA256, raportti |
| Riippumaton visuaalinen QA | gpt-6.1-sol / high | 5 mallia lähteineen | Jokaisen siluetti, aukot, katot, takasivu ja tyyli |
| Vaikea QA/ristiriita | gpt-6-astra / high | vain poikkeamat | Laadun ratkaisu, ei tavallista massaluettelointia |
| Ohjaaja / Tripo-käyttäjä | tämän chatin malli | yksi selainohjaaja | Työjärjestys, portit, krediitit, kertaluonteiset lähetykset, posti, lopputarkistus |

Medium on oletus lähteille, high vain aidosti vaikealle geometrialle/QA:lle. Ultra/max ei ole massatuotannon oletus. Pienempi malli siirtää epävarman kohteen vahvemmalle; sitä ei pakoteta hyväksymään. Kahden ensimmäisen 5 kohteen erän QA arvioidaan vahvemmin, sen jälkeen vaikeat poikkeamat nostetaan erikseen. Jokainen rakennus tarkastetaan yhä visuaalisesti, ei pelkkää otantaa.

## Konteksti ja käsinvaihdot

Työntekijä saa 300–700 sanan briefin: täsmälliset 3–5 tunnistetta, aikakausi, lähdepolut, luettava aineisto, ulostulopolku ja hyväksymisehto. Koko chatin historiaa tai megatavujen ledgeriä ei kopioida. Agentti kirjoittaa omaan eräkansioon. Palaute ohjaajalle enintään 10 riviä + polku + PASS/WARN/FAIL ja este. Ei rinnakkaista samaan tiedostoon tai selaimeen kirjoittamista. Viisi kohdetta on lähtökohta; eräkokoa muutetaan mitatun työajan mukaan.

Ohjaaja lukee muutokset ja tulokset, ei kaikkia hakuja uudelleen. Lähdetietue tallennetaan kerran ja samaa tietuetta käytetään kuvaan, 3D-QA:han ja toimitukseen. Noin 10 kohteen jälkeen työntekijä vaihdetaan puhtaaseen kontekstiin, ellei jatkuvuudesta ole selvää hyötyä. Uudelleenkäynnistys jatkaa queue.json:n seuraavasta vaiheesta; SUBMITTING/UNKNOWN-työ tarkistetaan Triposta ennen uutta klikkausta.

## Yksi jono ja yksi selain

`queue.json` on tämän erän totuus, ohjaaja ainoa kirjoittaja. Työntekijöiden erät ovat erillisiä tuloksia; niitä yhdistetään lukituksen alla. Rakennusavain on kaupunki+rakennus+aikakausi, erilliset Tripo-osat saman avaimen alla. Lähdekuvien hashit ja Tripo-jobid estävät tuplatuotannon. Erän järjestys: hyvä monipuolinen lähde ja selvä massa ensin, vaikea lasi/rauta/antiikki viimeiseksi.

Vaiheet: INVENTORY → SOURCE_READY → IMAGE_READY → IMAGE_QA_PASS → KK_APPROVED → RESERVED → SUBMITTING → RUNNING → DOWNLOADED → TECH_QA_PASS → VISUAL_QA_PASS → ARCHIVED. Pelikevennys/delivery/receiverAcceptance/gameIntegration ovat erilliset kentät. FAIL ei siirry automaattisesti eteenpäin, WARN tarvitsee kirjattavan päätöksen.

Ennen maksullista klikkausta kirjataan rakennus+osa, inputSHA256, asetukset, UI-hinta, aloitus, arvio, varaus ja hyväksyntäviite. SUBMITTING tallennetaan ENNEN klikkausta; tämän jälkeen epäselvä tulos tarkistetaan palvelusta. Uusinta on aina erillinen perusteltu päätös; Bastiljissa nimenomaisesti yksi otto/osaa. Jobid kirjataan heti, lataus ja hash heti valmistuttua. Palvelun todellinen yhtäaikaisuusraja tarkistetaan käyttöliittymästä, sitä ei arvata. Usea cloudjob voi edetä yhtä aikaa, selainta käyttää silti yksi tekijä.

## Vakioitu rakennuspaketti ja QA

`<batch>/<city-building-era>/`: brief.json, sources.json (sivulinkki, tekijä, lisenssi, näkymä, ajoitus), refs/, model-image.png, image-qa.json, job.json, original.glb, SHA256SUMS, technical-qa.json, views/, visual-qa.json, game/ ja delivery.json. Alkuperäistä ei muuteta.

Lähteissä osoitetaan etu-, taka- ja sivumuoto sekä yläpuoli/pohja. Yksi valokuva ei todista näkymättömiä sivuja. Aikakaudet eivät sekoitu. Tarkat historialliset mitat kahdesta riippumattomasta lähteestä tai merkitään arvio/ristiriita. Finnaa ei haeta koneellisesti.

ImageGen saa lähteet ja geometriarajat; luodaan yksi uusi kuva per sallittu osa, ei turhia tyylivaihtoehtoja. Mallikuvaa ei kutsuta mittapiirrokseksi. Arkkiin liitetään lähde ja epävarmuus. Uusintaa ei tehdä automaattisesti hylkäyksestä.

GLB: otsake/pituus, parse, mesh/kolmiot, materiaalit ja upotetut tekstuurit, rajat/akselit, tyhjät tai puuttuvat osat, SHA256. Visuaalinen: kaikki ulkosivut + korkea viisto + pelin matala 5 asteen näkymä; tornien/huippujen siluetti, aukot ja syvät portaalit muotoina, tasaiset koristeet tekstuureina. Teksturoitu ja tekstuuriton vertailu; peittyneet takasivut eivät läpäise ilman tarkastusta. Pelitekstuurit lähtökohtaisesti 2048², ei tarpeetonta 8K-pelipakettia. Staattisille rakennuksille ei riggausta tai animaatiota. Kevennykset kopioihin ja renderöinti vain konevaraus/resurssiehtojen salliessa (load5<16, ei Unity/simu/käännös). Raskas paikallinen vaihe ei pysäytä kevyttä lähdekeruuta tai cloudjonon seurantaa.

## Aika, krediitit ja seuranta

Live16.11: saldo13670, loppupäivä18.11, tarkka kellonaika ei näy Tripossa/Stripessä. Sisäinen viimeinen arkistointiraja17.11 klo23.59 EET on varmuusmarginaali, ei väite palvelun todellisesta katkaisuajasta. Uusien kutsujen sisäinen raja17.11 klo20EET; jäljellä oleva aika varataan valmistumiselle/latauksille/QA:lle. Jos viive kasvaa, lopetetaan uudet lähetykset aiemmin.

65 krediittiä on havaittu asetushinta, tarkistetaan joka kutsulle. 100 yksiosaista =6500;200 osaa=13000. Nykyisestä13670 pidetään1370 varalla eikä sitä kuluteta automaattisilla uusintakokeilla; tuotantokatto12300 riittää enintään189 tällaiseen osaan. Nämä ovat budjettilaskelmia, eivät lupaa189kutsulle. Yli100rakennusta ei tehdä vain saldon tyhjentämiseksi. Osamäärä suunnitellaan näkyväksi ennen tuotantoa; vaikean mallin pilkkomisessa ei tingitä laadusta tavoitteeseen pääsemiseksi.

Jokaisen 5–10 kohteen jälkeen mittarit: hyväksyttävät lähdepaketit/h, hyväksyttävät mallikuvat/h, todelliset cloudminuutit, ladatut+QAhyväksytyt eri rakennukset/h, hylkäys/uusintamäärä, krediitit/rakennus ja puuttuvat alkuperäiset. Jos tokendata on saatavilla, todellinen käyttö rooleittain; muutoin UNKNOWN, ei keksittyä säästöprosenttia. Agenttien lisääminen yksin ei säästä tokeneita: säästö perustuu pienempään malliin, rajattuun kontekstiin, skripteihin ja uusintojen välttämiseen.

Ensimmäisen erän jälkeen ennuste = jäljellä olevat rakennukset / mitattu hyväksyttyä rakennusta/h + cloud/latausvaraus. 8–17ottoa/h on tavoite, ei mitattu tulos;100 uutta yksiosaista vaatii sillä noin6–12.5h lähettämistä, lisäksi lähdekuvat/QA/odotukset. Jos ennuste ei mahdu aikaan, seuraava helppo mutta laadukas jo hyväksytty kohde etusijalle; ei sokkona maksullisia kutsuja eikä laatukriteerien poistoa. Raportoi toteutuva määrä ajoissa.

## Käyttöönotto tässä chatissa

Bastiljin lähdeagentti käynnissä mallilla gpt-6.1-sol/high. Vanha arkisto- ja dedupeagentti viimeistelevät rajatun tehtävänsä, minkä jälkeen vapautuvat paikat käytetään yllä olevalla mallijaolla. Yksi ohjaaja käyttää Chromea ja vastaanottaa hyväksynnät. Käynnistyksen jälkeen luetaan ensin tämän tiedoston lisäksi queue.json ja ajantasainen TRIPO-JATKO; jo toimitettuja ei tehdä uudestaan. Ei irrallisia itseään herätteleviä chatketjuja.

Dokumentaatio tarkistettu16.11: https://learn.chatgpt.com/docs/agent-configuration/subagents ja https://learn.chatgpt.com/docs/models. Mallinimet/4paikan raja perustuvat tämän istunnon oikeasti käytettävissä oleviin työkaluihin.
