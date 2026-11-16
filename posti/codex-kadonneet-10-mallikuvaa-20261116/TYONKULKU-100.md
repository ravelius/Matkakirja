# Noin 100 eri Tripo-rakennusta: toteutettava työnkulku

Voimassa 16.11.2026. Vastuut: tämä ohjaava chat ja sen rajatut agentti-istunnot. Ei uusia omistajan chatteja eikä ajastuksia. Viimeisin PT2486–2489 (580cf058ee) sekä PT2470–2473 (fc6c8e7144) ja suora omistajan pyyntö määräävät järjestyksen. Ohjeen muutoksessa ohjaaja päivittää vain tämän työn jonon; globaalia postivahtia ei siirretä.

## Mitä lasketaan

Tavoite noin 100 erillistä uutta rakennusta. Saman rakennuksen osat, versiot, teksturoinnit, retopot ja uusintaotot eivät lisää lukua. Aiemmat mallit kirjataan erikseen deduplikointia varten. Vähintään 100 lisäehdokkaan lähdelista ei ole 100 hyväksyttyä mallia. Noin 100 uuden rakennuksen tuotantotavoite sisältää nykyisen 40 kadonneen jonon: lisälistalta valitaan lähtökohtaisesti noin 60 muuta, enemmän vain jos osa kadonneista ei ole kelpoisia. Ehdokaslista saa olla tuotantokiintiötä suurempi; pelkkä listaan pääsy ei valtuuta ylimääräistä maksullista tuotantoa. Tuntemattomat kelpoisuudet merkitään avoimiksi, niitä ei täytetä arvauksilla.

Kolme erillistä lukua: (1) tuotannosta ladattu alkuperäinen + SHA256 + tekninen tarkistus, (2) lähdettä vastaavaksi visuaalisesti tarkastettu, (3) peliversio hyväksytty ja peliin kytketty. Vain (1)+(2) lasketaan tämän valmistuserän valmiiksi rakennukseksi. Vastaanotto ja peliin kytkentä todennetaan erikseen. Hylätty alkuperäinenkin säilytetään.

## Työjärjestys nyt

1. Bastiljin pilotti: A/B/C-alkuperäiset sekä yksi A:n kolmen kuvakulman MultiView-vertailu on ladattu ja hash-varmennettu T7:lle. Neljä Tripo-työtä, 260 krediittiä. Ei uusia B/C-kokeita ennen osoitettua A-b-parannusta.
2. PT2486 perui kokonaan kolmen kevennyksen vertailun ja paistot. Kevennyksestä vastaa LAV:n hyväksytty era.zsh-resepti. Codex toimittaa alkuperäiset A/B/C kohdistettuina osina, A-b myös jos vertailussa parempi. Alkuperäiset säilytetään muuttumattomina; kohdistus erillisiin kopioihin ja muunnosmatriisit talteen.
3. CODEX-IKKUNA5 klo22–24 EET: alkuperäisten A(a)/A-b saman kulman vertailu sekä muurin/torninharjan lähikuvat, osien kohdistus ja GC:n uusi Giraud1802/Silvestre-lähteisiin perustuva linnakemallikuva. Blender-/renderiajot vain tässä ikkunassa ja load5<16 / ei Unityä, simua tai käännöstä. B/C-lataukset ovat jo valmiit, niitä ei toisteta.
4. 42 kadonneen listan aloittamattomat: GC, Temple ja jo tuotetut pois. Lähdepaketit rinnakkain; mallikuvat vain oman tilauksen sallimissa porteissa. Lähde, nimi ja varmuus arkin viereen.
5. Lisäehdokkaiden lähdelista yhtenä tiedostona KK:lle ennen niiden mallikuvia. 130 nimeä inventoitu; nimi ei vielä merkitse lähteiden tai aikakauden hyväksyntää.
6. Massatuotannon Tripo-kutsut vasta omistajan Bastilji-pelikatselmuksen jälkeen. Tätä porttia ei muuteta määräajan vuoksi.

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

Ennen maksullista klikkausta kirjataan rakennus+osa, inputSHA256, asetukset, UI-hinta, aloitus, arvio, varaus ja hyväksyntäviite. SUBMITTING tallennetaan ENNEN klikkausta; tämän jälkeen epäselvä tulos tarkistetaan palvelusta. Uusinta on aina erillinen perusteltu päätös; Bastiljin alkuperäinen rajaus oli yksi otto/osaa ja PT2479 valtuutti lisäksi yhden A-MultiView-vertailun. B/C-uusinnat ovat ehdollisia A-b:n selvälle parannukselle. Jobid kirjataan heti, lataus ja hash heti valmistuttua. Palvelun todellinen yhtäaikaisuusraja tarkistetaan käyttöliittymästä, sitä ei arvata. Usea cloudjob voi edetä yhtä aikaa, selainta käyttää silti yksi tekijä.

## Vakioitu rakennuspaketti ja QA

`<batch>/<city-building-era>/`: brief.json, sources.json (sivulinkki, tekijä, lisenssi, näkymä, ajoitus), refs/, model-image.png, image-qa.json, job.json, original.glb, SHA256SUMS, technical-qa.json, views/, visual-qa.json, game/ ja delivery.json. Alkuperäistä ei muuteta.

Lähteissä osoitetaan etu-, taka- ja sivumuoto sekä yläpuoli/pohja. Pelimallin hyväksymisessä tarkistetaan päämassat, siluetti, tornit, katot, merkittävät aukot ja aikakauden olennaiset muutokset. Jokaisen pienen ornamentin tai aukon historiallinen todistaminen ei ole lisävaatimus: pienkoristeet voidaan toteuttaa tekstuureina. Nimenomainen vapaan pohja-/ylänäkymän vaatimus säilyy lisäehdokaslistalla. Yksi valokuva ei todista näkymättömiä sivuja. Aikakaudet eivät sekoitu. Tarkat historialliset mitat kahdesta riippumattomasta lähteestä tai merkitään arvio/ristiriita. Finnaa ei haeta koneellisesti.

ImageGen saa lähteet ja geometriarajat; luodaan yksi uusi kuva per sallittu osa, ei turhia tyylivaihtoehtoja. Mallikuvaa ei kutsuta mittapiirrokseksi. Arkkiin liitetään lähde ja epävarmuus. Uusintaa ei tehdä automaattisesti hylkäyksestä.

GLB: otsake/pituus, parse, mesh/kolmiot, materiaalit ja upotetut tekstuurit, rajat/akselit, tyhjät tai puuttuvat osat, SHA256. Visuaalinen: kaikki ulkosivut + korkea viisto + pelin matala 5 asteen näkymä; tornien/huippujen siluetti, aukot ja syvät portaalit muotoina, tasaiset koristeet tekstuureina. Teksturoitu ja tekstuuriton vertailu; peittyneet takasivut eivät läpäise ilman tarkastusta. Pelitekstuurit lähtökohtaisesti 2048², ei tarpeetonta 8K-pelipakettia. Staattisille rakennuksille ei riggausta tai animaatiota. Kevennykset kopioihin ja renderöinti vain konevaraus/resurssiehtojen salliessa (load5<16, ei Unity/simu/käännös). Raskas paikallinen vaihe ei pysäytä kevyttä lähdekeruuta tai cloudjonon seurantaa.

## Aika, krediitit ja seuranta

Live16.11: saldo13670, loppupäivä18.11, tarkka kellonaika ei näy Tripossa/Stripessä. Sisäinen viimeinen arkistointiraja17.11 klo23.59 EET on varmuusmarginaali, ei väite palvelun todellisesta katkaisuajasta. Uusien kutsujen sisäinen raja17.11 klo20EET; jäljellä oleva aika varataan valmistumiselle/latauksille/QA:lle. Jos viive kasvaa, lopetetaan uudet lähetykset aiemmin.

65 krediittiä on havaittu asetushinta, tarkistetaan joka kutsulle. 100 yksiosaista =6500;200 osaa=13000. Nykyisestä13670 pidetään1370 varalla eikä sitä kuluteta automaattisilla uusintakokeilla; tuotantokatto12300 riittää enintään189 tällaiseen osaan. Nämä ovat budjettilaskelmia, eivät lupaa189kutsulle. Yli100rakennusta ei tehdä vain saldon tyhjentämiseksi. Osamäärä suunnitellaan näkyväksi ennen tuotantoa; vaikean mallin pilkkomisessa ei tingitä laadusta tavoitteeseen pääsemiseksi.

Jokaisen 5–10 kohteen jälkeen mittarit: hyväksyttävät lähdepaketit/h, hyväksyttävät mallikuvat/h, todelliset cloudminuutit, ladatut+QAhyväksytyt eri rakennukset/h, hylkäys/uusintamäärä, krediitit/rakennus ja puuttuvat alkuperäiset. Jos tokendata on saatavilla, todellinen käyttö rooleittain; muutoin UNKNOWN, ei keksittyä säästöprosenttia. Agenttien lisääminen yksin ei säästä tokeneita: säästö perustuu pienempään malliin, rajattuun kontekstiin, skripteihin ja uusintojen välttämiseen.

Lähdekeruun ensimmäinen rajattu haku saa kestää enintään noin 15 minuuttia viittä kohdetta kohti. Jos paketti jää vajaaksi, kirjataan täsmällinen puute ja jatketaan paremmin dokumentoituihin kohteisiin; samaa avointa hakuongelmaa ei toisteta kierros toisensa jälkeen. Kohteen täydentäminen annetaan erillisenä rajattuna tehtävänä.

Ensimmäisen erän jälkeen ennuste = jäljellä olevat rakennukset / mitattu hyväksyttyä rakennusta/h + cloud/latausvaraus. 8–17ottoa/h on tavoite, ei mitattu tulos;100 uutta yksiosaista vaatii sillä noin6–12.5h lähettämistä, lisäksi lähdekuvat/QA/odotukset. Jos ennuste ei mahdu aikaan, seuraava helppo mutta laadukas jo hyväksytty kohde etusijalle; ei sokkona maksullisia kutsuja eikä laatukriteerien poistoa. Raportoi toteutuva määrä ajoissa.

## Käyttöönotto tässä chatissa

Mallijakoa on käytetty oikeissa tehtävissä: Luna/medium luettelointiin, Sol/medium sen riippumattomaan tarkistukseen ja lähde-eriin, Sol/high Bastiljin lähteisiin ja mallikuviin, Terra/medium jonon suojaskriptiin ja Astra/high vaikeaan visuaaliseen QA:han. Kevyen luetteloinnin puutteellinen 21 kohteen tulos hylättiin ja vahvempi tarkistus kokosi 130 nimeä. Se ei vielä todista näiden lähdekelpoisuutta. Bastiljin kuva-arkki hyväksyttiin KK:n kautta ja A/B/C sekä A-MV on arkistoitu. Neljä Tripo-kutsua /260 krediittiä ja yhteensä seitsemän ImageGen-kutsua. Lähdepaketteja50; seitsemän kadonnutta esivalmistelukelpoista ja seitsemän nykykohdetta kuvakattavuudelta kelvollisia, aikakausi avoin. Lisälistan portti ja massatuotannon pelikatselmus ovat kiinni. Käynnistyksen jälkeen luetaan NEXT-HANDOFF.md ja queue.json. Ei irrallisia itseään herätteleviä chatketjuja.

Dokumentaatio tarkistettu16.11: https://learn.chatgpt.com/docs/agent-configuration/subagents ja https://learn.chatgpt.com/docs/models. Mallinimet/4paikan raja perustuvat tämän istunnon oikeasti käytettävissä oleviin työkaluihin.


## Varmennettu Tripo-syöte 16.11. klo20.43

MultiView on kuutiokuvake: Front/Left/Right/Back, 2–4 saman kohteen kuvakulmaa ja yksi työ. Batch Images to3D (enintään30kuvaa) tekee erillisen työn jokaisesta kuvasta; sitä ei saa sekoittaa monikuvasyötteeseen. Tarkista aina yhden työn näkyvä65krediitin hinta ennen varausta. queue_guard tarkistaa kaikkien kuvien SHA256:n ja slotit; sama paketti ei pääse uudelleen jonoon pelkällä uudelleennimeämisellä. Kaikki12 porttitestiä läpäisty.

## Ensimmäisistä eristä korjatut käytännöt

Mallikuvien referenssit tarkistetaan model_image_preflight.py:llä: historialliset lähdekuvat menevät myös työkalun syötteeksi. Uusi kokonainen ehdokas ei tarkoita text-only-syötettä. Kuuden kuvan erässä havaittu syötepoikkeama on lokitettu, ja kaikki kuvat pysyvät riippumattomassa QA:ssa ennen etenemistä. Ensimmäisen4kuvan QA löysi yhden päämassavirheen; sitä ei lähetetä Tripoon. Eri rakennuksia koskeva lähdetutkimus voi edetä rinnakkain, mutta yhden kuvalähdepalvelun lataukset sarjoitetaan429-rajan vuoksi. Tarkka briefipohja: AGENT-BRIEF-TEMPLATE.md.
