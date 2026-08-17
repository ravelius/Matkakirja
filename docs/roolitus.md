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
  nähtävyysjutut, menovinkit — resepti docs/moduulit/kaupunkilehti.md +
  docs/moduulit/maalehti.md ja docs/tyolista-opukselle.md.
- **UI-koodi, rakenneuudistukset ja työkalut** (esim. kaupunki/maa-
  lehtijako, Maiden tiedot -varuste).
- **Speksioppi (omistajan havainto 16.8.2026):** tarkasti rajattu
  toimeksianto tuottaa Opukselta erinomaista jälkeä; väljä rajaus
  johtaa turhien asioiden toteuttamiseen. Jokaiseen pakettiin:
  täsmälliset tiedostot, mitä EI tehdä, ja valmis malli.
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
| Fable Max (remontti) | session_01Q1M9ZT5Yr1Gbi3eqUyoHHC (moduuli- ja dokumenttiremontti hyväksyttyjen suunnitelmien mukaan: M0–M3 + D1–D6 mainissa 17.8.; M4 odottaa Fablen "O6 mainissa" -ilmoitusta, D7 M-sarjan loppua. Herää Fablen mergeistä webhookilla; Fable-roolin sessio, saa kirjoittaa Raamattuun koordinoidusti) | 17.8.2026 |

**Kaikki Opus- ja Sonnet-työsessiot arkistoitu 17.8.2026** (omistaja;
mm. sijaispäätoimittaja v782–v805:n jälkeen, Opus 27 paketin O3
jälkeen — historia docs/arkisto/sessiohistoria-2026-08.md).
Sisältötyön tekevät nykyään FABLEN SISÄISET AGENTIT, jotka saavat
tehtävänsä perustamispromptissa ja raportoivat automaattisesti —
herätysongelmaa ei ole. Omistajan parvilupa lehtityöhön 17.8.
(docs/tyolista-maxille.md kohta 4).

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

## Avoimet asiat (odottavat omistajaa)

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
etusivu).
