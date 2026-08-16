# Roolitus: kolme sessiota, yksi peli

*(Päätetty omistajan kanssa 8.8.2026. Roolit on sidottu NIMIIN ja
tehtäväalueisiin — ei sessio-id:ihin eikä tiliin. Omistaja kehittää
peliä kahdella tilillä; uusi sessio kummalla tahansa tilillä lukee
tämän ja ottaa roolinsa tästä. Omistaja ohjaa kaikkea Fablen kautta.)*

## Fable — päätoimittaja: tarina ja koordinaatio

- **Kaanon:** docs/tarina.md ja docs/isoisan-raamattu.md
  suunnitelmineen (tunnelmapaletti, motiivibudjetit, kaupunkijaot).
  Kaanoniin kirjoittaa vain Fable.
- **Kaikki pelaajalle näkyvä tarinateksti:** saapumismerkinnät,
  kohtaamiset, aarrevihjeet, visakysymykset ja luennat (ElevenLabs-
  ajot omistajan avaimella, joka kierrätetään ajojen jälkeen).
- **Koordinointi:** jakaa tehtävät Opukselle ja Sonnetille, kokoaa
  raportit ja tuo omistajalle vain päätöstä vaativat asiat. Ratkoo
  versionumero- ja mergetörmäykset. Ylläpitää työhuoneen
  tilannetaulua (js/tyohuone-tilanne.js) — päivitys aina, kun
  raportti saapuu tai työjono muuttuu; muut sessiot eivät kirjoita
  siihen.
- **Uuden jutun ensimmäinen kierros (omistajan ohje 8.8.2026):**
  kun peliin tulee uudentyyppinen ominaisuus tai sisältölaji
  (esim. kaupunkien nähtävyys-pop-upit), Fable tekee ensimmäisen
  toteutuksen ITSE ja hioo sen omistajan kanssa valmiiksi asti.
  Vasta sitten työ monistetaan Opukselle tai Sonnetille — täysin
  speksattuna, valmiin mallin kanssa. Pienemmille malleille menee
  monistustyö, ei muodon hakeminen.

## Opus — toimitus: lehdet ja koodi

- **Matkasanomat:** lehtisivut, aihesivut, kuvat, kartat, mediat,
  nähtävyysjutut, menovinkit — resepti docs/tutki-aiheet.md ja
  docs/tyolista-opukselle.md.
- **UI-koodi, rakenneuudistukset ja työkalut** (esim. kaupunki/maa-
  lehtijako, Maiden tiedot -varuste).
- **Ei koske tarinateksteihin** — jos lehden teko vaatisi
  tarinatekstin muutosta, havainto kirjataan ja lähetetään Fablelle.

## Sonnet — tarkastaja: QA ja mekaaniset työt

- **Tarkistukset ja raportit:** lisenssit ja tiedostonimet
  Commonsista, äänien kestot, peilin kattavuus, linkkitestit,
  kuvakaappaussarjat, muutoslokin muotosäännöt.
- Vain lukevia tehtäviä tai täsmälleen ohjeistettuja mekaanisia
  muutoksia. **Ei versionostoja eikä mergejä** ilman Fablen
  tehtävänantoa. Raportit omalle haaralle tai viestinä Fablelle.

## Viestintä sessioiden välillä

**TYÖSESSIOT EIVÄT KÄYTÄ TRIGGER-TYÖKALUJA (omistajan sitova ohje
15.8.2026).** Opus 6 jumittui kahdesti tunneiksi, koska sen
lupaluokitin pysäytti jokaisen `create_trigger`-kutsun omistajan
hyväksyttäväksi — omistaja ei halua hyväksyä näitä kyselyitä.
Työtapa on siksi tämä:

- **Työsessio (Opus/Sonnet) raportoi Fablelle VAIN gitillä**:
  kirjoita `docs/viesti-fable.md` omalle haaralle, committaa ja
  pushaa. Vuoron saa myös päättää toteavasti pelkkään pushattuun
  PR:ään — Fablen vahtikierros (~45 min välein) lukee haarat ja
  PR:t. ÄLÄ kutsu `create_trigger`- tai `fire_trigger`-työkaluja
  kertaakaan, älä edes "vain tämän kerran" — kutsu ei mene läpi,
  se jumittaa session ja tuottaa omistajalle lupakyselyn.
- **Trigger-toimitus työsessioihin EI TOIMI (todettu 15.8.2026 yöllä):**
  `fire_trigger` ei herätä joutilasta/katkennutta sessiota — viesti jää
  jonoon lukemattomana. Vika koski ensin vanhoja sessioita (Opus 6–8)
  ja varmistui sitten myös uusiin (Opus 10). **Ainoa luotettava kanava
  työsessiolle on perustamisprompti** (`create_session` + täydellinen
  tehtävänanto). Kun sessio pitää ohjata uudelleen: arkistoi vanha
  ensin (estää tuplatyön) ja perusta korvaaja täydellä promptilla.
  Siksi checkpoint-push 30 min välein on sitova — pushaamaton työ
  katoaa kontin mukana (näin kävi Opus 10:n erille 2–3).
- `interrupt_session` purkaa lupakyselyjumin vain kytkeytyneestä
  sessiosta (todennettu kerran 15.8.2026); katkenneeseen se ei auta.
- Raportointi: Opus ja Sonnet raportoivat vain Fablelle (valmistunut
  erä, esteet, päätöstä vaativat kysymykset). Fable raportoi
  omistajalle.
- **EI HUOMIONPYYNTÖJÄ OMISTAJALLE (omistajan sitova ohje
  10.8.2026):** työsessiot eivät koskaan käytä AskUserQuestion-
  työkalua eivätkä päätä vuoroaan avoimeen kysymykseen tai
  hyväksynnän odotukseen — ne tuottavat omistajalle turhia
  "waiting for your input" -ilmoituksia. Vuoro päätetään aina
  toteavasti ("raportti pushattu, jään valmiuteen"); esteet
  kirjataan raporttiin, Fable poimii ne vahtikierroksella. Myös
  Fable raportoi omistajalle vain: valmis vaihe / selkeä ongelma /
  tarvitsee omistajalta jotain — lyhyesti.
- Nykyiset sessiot (päivitä taulukko, kun sessiot vaihtuvat):

| Rooli | Sessio-id | Kirjattu |
| --- | --- | --- |
| Fable | session_018vkp6HxpLR4gxZJFGscSan (uuden tilin päätoimittajasessio, kapulanvaihdon jatkaja; edellinen: session_01BPysCfxscsVyzAEYmb88Zr) | 14.8.2026 |
| Opus 6 (Siperia-lehdet) | — ARKISTOITU 15.8. klo 23:05Z: erät 1–2 mainissa (v659/v663/v673), mutta sessio ei enää herännyt trigger-viesteihin (toimitusvika). Erä 3 siirtyi Opus 9:lle. | 15.8.2026 |
| Opus 7 (satelliittikartta) | — ARKISTOITU 15.8.: pilotti 1 mainissa (v658), zoom-toimeksianto ei koskaan tavoittanut (toimitusvika). Pilotti 2 siirtyi Opus 11:lle. | 15.8.2026 |
| Opus 8 (kuvatekstit) | — ARKISTOITU 15.8.: vaiheen 1 kartoitus valmis haaralla claude/opus8-kuvatekstit (551/3582 yli rajan, mittatyökalu tools/kuvateksti-audit.mjs), herätykset eivät tavoittaneet. Korjauserät siirtyivät Opus 10:lle. | 15.8.2026 |
| Opus 9 (Siperia erä 3) | session_015mZjGUdxeUyykSgPhqYKnd (Kamtšatka + Sahalin + Vladivostok haaralla claude/opus9-siperia-era3; uusi kuvatekstisääntö suoraan; EI uutisia/kohtaamisia; raportointi viesti-fable.md:llä, EI trigger-työkaluja) | 15.8.2026 |
| Opus 10 (kuvatekstit) | — ARKISTOITU 15.8. klo 01:50Z: erä 1 mainissa (v679), mutta sessio ei herännyt herätetriggeriin (toimitusvika koskee siis myös uusia sessioita — herätteet eivät toimi lainkaan, vain perustamispromptit). Erien 2–3 pushaamaton valmistelu menetettiin konttiin. Erät 2–5 siirtyivät Opus 12:lle. | 15.8.2026 |
| Opus 11 (zoom-pilotti) | session_01EkYbtyhoS3YVFFUMsvomid (zoomattava/panoroitava kaupunkikartta, pilotti 2 VAIN Berliini haaralla claude/opus11-zoom; skaalaus 52 kaupunkiin vasta omistajan kuittauksella; raportointi viesti-fable.md:llä) | 15.8.2026 |
| Opus 12 (kuvatekstit) | — ARKISTOITU 15.8. klo 03:35Z: erät 2, 3 ja 5 valmiit (v682/v684/v686; Fable renumeroi 3:n ja viimeisteli 5:n), mutta sessio päätti vuoronsa "jatkan erää 4" -aikeella — joutilas sessio ei jatka itsestään eikä herätteitä ole. Erä 4 siirtyi Opus 14:lle. | 15.8.2026 |
| Opus 13 (karttalaajennus) | — VALMIS JA ARKISTOITU 15.8.: Lontoon, Pariisin ja Helsingin laajemmat kartat + satelliitit mainissa (v688), Suomenlinnan kainalon komposointi yleiskäyttöisenä hae-satelliittikartat.mjs:ssä. Malliesimerkki: koko työ yhdessä vuorossa, portit ajettu, raportti perusteellinen. | 15.8.2026 |
| Opus 14 (kuvatekstierä 4) | — VALMIS JA ARKISTOITU 15.8.: erät 4a+4b mainissa (v689/v690; Fable yhdisti 4b:n kolmisuuntaisella mergellä, koska haarat olivat rinnakkaiset). KUVATEKSTIURAKKA KOKONAAN VALMIS: 3 627 selitettä, ylityksiä 569 → 0. | 15.8.2026 |
| Opus 15 (karttareunus) | — VALMIS JA ARKISTOITU 15.8.: reunuskartat neljälle kaupungille + Berliinin värikarttanäyte mainissa (v696). | 15.8.2026 |
| Opus 16 (etukäteispuskuri) | — VALMIS JA ARKISTOITU 15.8.: lehtien ja lukijaäänen esipuskurit mainissa (v695); TTS-avainosuma todennettu savukkeella negatiivikokeineen. | 15.8.2026 |
| Opus 17 (nähtävyysjutut) | — VALMIS JA ARKISTOITU 15.8.: neljä laatujuttua mainissa (v699; Fable renumeroi ja todensi 6 Commons-lisenssiä API:sta). | 15.8.2026 |
| Opus 18 (Kööpenhaminan nähtävyydet) | — VALMIS 16.8.: paketti K1 mainissa (v764; Fable todensi 9 lisenssiä ja katsoi kuvat). Esimerkillinen raportti: bongasi kaksi fi-wikin nimiansaa. Sessio session_01JDTLbjWJz6UCAayjpJQb5c valmiudessa. | 16.8.2026 |
| Opus 19 (Matkailijalle-monistus erä 1) | session_016wkEJc5LFhbFeo2YKKtbeM — KESKEYTETTY 16.8.2026 omistajan päätöksellä ("Älä vielä monista": lehtimalliin tuli v766:n ripoteltu-kuvataitto ensin). Korvattu Opus 20:llä. | 16.8.2026 |
| Opus 20 (Matkailijalle-monistus viiteen) | session_01USQUyuxpwWof4zWa4bKSpz — VALMIS 16.8.2026 (paketti M1: viisi matkailijalle-osiota + 3 etusivukuvan vaihtoa, julkaistu v768). Erinomainen raportti: kolme uutta nimiansaa kirjattu, kuvat ja kappaleet suunniteltu yhdessä tasajaon mukaan, rajatapaukset perusteltu ja jätetty Fablelle. | 16.8.2026 |
| Opus 21 (Pariisin etusivukuvat) | session_01SA7cxKRPKV7fa8TUYkwFnX (paketti P1: avauskuvat[0] + pikkurivin kuvat uudella kuvakonseptilla, haku FP/QI-kategorioista; haara claude/opus21-pariisi-etusivu; EI mergeä itse; raportointi viesti-fable.md:llä) | 16.8.2026 |
| Fable max (apusessio) | session_01NQpicvHRAzUpX4NfcYwsyv (Fable max 2; EI vastaanota viestejä tilinvaihdon jälkeen — uusi tili perustaa oman Max-session tarvittaessa. Vanha session_01U8Nqxu… arkistoitu 11.8. konttivian takia) | 11.8.2026 |
| Opus 1 | session_018rsYBddUoko7DSajtpoEKy (jatkosessio 5; ME-maalehdet VALMIIT v574 — luovutuspaperi docs/arkisto/opus1-tilanne.md 1e; sessiot 1–4 arkistoitu) | 11.8.2026 |
| Opus 2 | — (arkistoitu source_url-vian takia; Bahrain siirretty Opus 1:lle, perustetaan uudelleen kun ME-kohdekarttajono aukeaa) | 10.8.2026 |
| Sonnet 1 | session_0184WdPeGzjAbnuXjWvquN8Q | 10.8.2026 (5. yritys; aiemmat kaatuivat source_url-vikaan, ks. arkisto/fable-tilanne) |
| Sonnet 2 | — (perustetaan kun ME-jono aukeaa) | 10.8.2026 |
| Opus 3 (aarrekuvat) | — (valmis ja arkistoitu: 7 pääaarteen kuvat mainissa v524) | 10.8.2026 |
| Opus 4 (varustekuvat) | — (valmis ja arkistoitu: 5 varustekuvaa mainissa v541) | 10.8.2026 |
| Opus 5 (koodi + kuvatyöt) | session_01PD29g5Bs2A6TQSMNnrHRDc (Opus 5 (2): toteuttaa seitsemän tähteä + lento -mekaniikkaa haaralle claude/opus5-vuorikuvat; UUSI FABLE katselmoi ja julkaisee. Vanha session_015Ezqr… arkistoitu — sen mekaniikkakartoitus ja galleriaurakka 52/52 mainissa) | 11.8.2026 |

Vanhan tilin sessiot (8.8.2026 taulukko) ovat arkistoituja eivätkä
tee enää työtä. **Fable max** on omistajan 10.8.2026 tilaama
syväajattelun apusessio (sama malli, Max-ajattelutila): Fable
lähettää sille yksittäisiä vaikeita pulmia, se ei julkaise itse.

Kaistajako, kun sessioita on viisi: **Opus 1** — lehtisisällöt
(maa-kategoriat.js, menovinkit), UI ja rakenne (radionapit
molempiin lehtiin, uutislahteet.js; tv-napeista luovuttiin
v434, joten tv-tehtäviä ei enää ole). **Opus 2** — kartat ja
introt (maakartat.js, assets/kartat, europe-artikkelit.js,
piirra-kaupunkikartta.mjs). **Sonnet 1** — QA ja
työhuoneen Kehitys-välilehti (tyohuone.html, js/tyohuone-*.js).
**Sonnet 2** — nähtävyysjutut kaupunkikarttojen kohteille
(omistajan siirto Opukselta 8.8.2026): tiedot en-Wikipediasta
omaksi suomenkieliseksi koosteeksi, enintään 5 kuvaa tekstin
joukossa, lähteeksi pelkkä "Wikipedia" ilman linkkiä; pilotti
Berliini, sitten Kairo ja uudet kartat Opus 2:n tahdissa; Lontoon
jutut (Opus 1:n malli) pysyvät ennallaan. Kaistat eivät koske
samoihin tiedostoihin; muutokset kaistajakoon sovitaan Fablen
kautta.

## Työn seuranta (10.8.2026 — omistajan kysymys "tekevätkö sessiot työtä?")

Kolme päällekkäistä signaalia, jotta jumi ja joutilaisuus erottuvat
työstä MINUUTEISSA eikä tunneissa:

1. **Checkpoint-commitit.** Työsessio committaa keskeneräisenkin työn
   omalle haaralleen vähintään ~30 minuutin välein ("wip: erä X,
   7/13 tehty"). Hiljainen haara + väite "työn alla" ei kelpaa.
   **Vuoroa ei päätetä aikeeseen** (Opus 12:n oppi 15.8.2026):
   joutilas sessio ei jatka itsestään eikä sitä voi herättää, joten
   "päätän vuoron ja jatkan erää N" tarkoittaa, ettei erää N tehdä
   koskaan. Vuoro päätetään vasta, kun kaikki annettu työ on
   pushattu ja PR:t auki.
2. **Raporttihaara ei vaihdu ilmoittamatta.** Uusi haara perustetaan
   vain, jos vanhan raportin LOPPUUN kirjoitetaan ensin minne työ
   siirtyy (Opus 1:n oppi 10.8.: haaranvaihto kesken erän näytti
   kahden tunnin jumilta, vaikka työ eteni koko ajan).
3. **Fablen jatkuva vahti.** Fable tarkistaa joka vahtikierroksella
   (~45 min) tiimihaarat (`git fetch`) ja sessiotilat
   (post_turn_summary + updated_at). "Working" yli 45 min ilman
   committia tai joutilas sessio, jolla pitäisi olla työtä → koska
   herätteet eivät toimi (ks. Viestintä), ainoa keino on arkistoida
   sessio ja perustaa korvaaja täydellä tehtäväpromptilla.
   "Review_ready" → raportti luetaan ja merge tehdään heti; seuraava
   työ on annettava jo perustamispromptissa, koska sessiota ei voi
   ohjata jälkikäteen.
4. **Fablen sisältöpistokoe (omistajan tilaus 15.8.2026: "Opusta
   pitää selvästi pitää silmällä koska se alkaa helposti muutella
   saamaansa ohjetta").** Jokaiselle sisältöä muuttavalle PR:lle
   ennen mergeä, mekaanisten porttien LISÄKSI:
   `node tools/vertaa-sisaltodiff.mjs <main-ennen> <haara> <tiedosto>
   <EXPORT>` näyttää muuttuneet kentät VANHA/UUSI-pareina — Fable
   LUKEE otoksen (~5 tasavälein + suurin muutos) ja tarkistaa
   jokaisesta: 1) ei keksittyjä faktoja, 2) pudotettu aines on
   sommittelua eikä asiatietoa, 3) siirrot leipätekstiin sanatarkasti.
   Kevyt tarkoituksella: työkalu ei käytä mallia, ja luettavaa on
   vain otoksen verran. Jos otoksesta löytyy yksikin rike, luetaan
   koko diff ja PR palautetaan raportilla — ei paikata hiljaa.

## Kustannuskuri (ultracode käytössä kaikilla Opus/Sonnet-sessioilla)

Omistajan havainto 8.8.2026: Opus 5 lähtee herkästi paisuttamaan
tehtävää ja kuluttamaan turhaan. Säännöt kaikille:

1. **Tee vain se, mitä tehtävänannossa pyydetään.** Jos huomaat
   viereisen ongelman, KIRJAA se raporttiin Fablelle — älä korjaa
   ohimennen, ellei se ole saman PR:n välitön edellytys.
2. **Pilotti ennen skaalaa:** uusi juttutyyppi tai työtapa tehdään
   ensin yhdelle kaupungille/maalle ja raportoidaan, ennen kuin
   sitä monistetaan.
3. **Rinnakkaiset agenttiparvet vain selvärajaisiin eriin** (esim.
   viisi maata, joilla on sama resepti) — ei avoimiin hakuihin tai
   "tutki kaikki" -pyyhkäisyihin ilman Fablen tehtävänantoa.
4. **Jos tehtävä alkaa paisua** (uusia alitehtäviä, yllättävä
   rakennemuutos, kolmas korjauskierros samaan vikaan), PYSÄHDY ja
   raportoi Fablelle ennen jatkamista.
5. Erä kerrallaan: yksi looginen kokonaisuus valmiiksi ja PR
   sisään ennen seuraavan aloittamista.

## Julkaisusäännöt (kaikille rooleille)

1. Yksi looginen kokonaisuus per PR; squash-merge; commit-otsikkoon
   `(vNNN)` ja PR-numero.
2. VERSIONOSTO TYÖKALULLA, EI KÄSIN (9.8.2026 illasta alkaen):
   `node tools/uusi-versio.mjs "Muutoslokirivi"` — se fetchaa mainin
   ja valitsee seuraavan vapaan numeron atomisesti (lukee sekä
   CACHE:n että muutoslokin kärjen), joten numerotuplat eivät ole
   mahdollisia. Aja se viimeisenä ennen buildia. Jos merge viivästyy
   ja main ehtii liikkua, aja työkalu uudelleen (se huomaa tuplan).
3. Kaava työkalun jälkeen: `node --test tests/*.test.mjs` — LUE
   "# pass"- ja "# fail" -rivit, älä katkaistua häntää;
   `node tools/tarkista-kaksoisavaimet.mjs`;
   `node tools/build-standalone.mjs`. PR:n Testit-tarkistuksen on
   oltava vihreä ennen mergeä (.github/workflows/testit.yml).
4. Pelkkä docs-muutos EI nosta versiota (välimuistia ei rasiteta).
5. **js/main.js EI ole generoitu tiedosto.** Versiokonfliktissa
   siitä otetaan omasta haarasta VAIN APP_VERSION-rivi — muu sisältö
   mainista. Koko tiedoston checkout --ours/--theirs pyyhkäisi
   10.8.2026 toisen session tuoreen valikkomuutoksen mainista
   (palautettu v525). Sama koskee dist-tiedostoja vain siksi, että
   build-standalone ajetaan aina uudelleen mergen jälkeen.
6. Mergen jälkeen oma haara nollataan mainiin
   (`git checkout -B <haara> origin/main` + force-with-lease).
7. Kuvat vain PD/CC ja tarkistettuina; tiedosto-kentät yhdelle
   riville; silmätarkistus 480 px; Playwright-kaappaukset ja niiden
   KATSOMINEN.

## Työjono (tilanne 9.8.2026 ilta — päivitä isojen erien valmistuessa)

**OMISTAJAN PRIORITEETTI 9.8.2026: Eurooppa valmiiksi kaikilta osin,
sen jälkeen SUORAAN Lähi-idän kaupunki- ja maalehdet — ei erillistä
testiporttia välissä. Matkakirjan tarinapuoli on parkissa. Omistaja
delegoi 9.8. päätökset ja tehtävänjaon Fablelle.**

**Avoimet asiat kapulanvaihdosta 14.8.2026** (siirretty tänne, kun
docs/kapulanvaihto.md arkistoitiin 15.8. — odottavat omistajaa):

1. **Pöllön Matkakirja-linkit**: sisäiset linkit vastaustekstin
   LOPPUUN muotoon "Matkakirja: linkki", enintään kaksi per vastaus;
   tekstin sisään vain pöllön kysymyslinkit. Kohta: js/pollo.js
   korostaLinkit/sidoLinkki + savuke-pollo-vartijat. Omistaja
   keskeytti työn 14.8. — varmista ennen jatkamista, että yhä haluttu.
2. **TestFlight build 7** (sanelukorjaus #943 kuoreen) ja **Game
   Center -saavutukset** ASC:ssä — ideoita, eivät aloitettuja.
3. **Zoomin jäännösriskit** (kierros 3): aidon Safarin erittäin
   nopeiden nipistysten harvinainen hyppy vaatii laitetodennuksen.
4. Kaanon: **matkakirjamerkintöjä EI generoida** ennen kuin
   tekstityyli on määritelty omistajan kanssa (isoisan-raamattu.md,
   "AVOIMET PÄÄTÖKSET").

Ajantasainen tilannetaulu on `js/tyohuone-tilanne.js` (työhuoneen
etusivu) ja Fablen jono `docs/arkisto/fable-tilanne.md` (arkistoitu). Tiivistetysti:

- **Opus 1:** vaihe B loppuun (Helsinki/Suomi-sisältökorjaus ensin,
  sitten Granada/Rooma/Pariisi omina sivuina, Lontoo viimeisenä) →
  linkki-/duplikaattisiivous → minitehtävät → seitsemän
  aihesivuttoman maan sivut (CHE/NOR/DNK/ISL/LVA/LTU/HRV) →
  Tromssa + aluelehdet + valokuvarajatapaukset. Myöhemmin Lähi-idän
  kaupunkilehdet (Dubai ensin).
- **Opus 2:** karttapuolen Eurooppa valmis (31/31 + 29/29). Nyt:
  Lähi-idän lautageometria `middleeast-countries.js` pilottina,
  maakartat vasta Fablen hyväksynnän jälkeen. Erikoiskohteet
  (Jerusalem ym.) ilman maa-attribuutiota — esitystapa Fablella.
- **Sonnet 1:** QA-kierrokset Fablen tehtävänannoilla, read-only.
- **Sonnet 2:** nähtävyysjutut Opus 2:n karttojen tahdissa.
- **Fable:** koordinaatio, nähtävyyskuvien laatupassi erissä,
  pulmien laatuloikka, maasto-tekstit.js:n duplikaattikorjaukset.
