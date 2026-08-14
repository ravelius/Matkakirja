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

- Kanava: `mcp__Claude_Code_Remote__create_trigger` +
  `fire_trigger`, kohteena vastaanottajan `persistent_session_id`.
- **Joutilaalle sessiolle viesti voi laukaista heti; työskentelevälle
  ajastetaan `run_once_at` ~2 min päähän** — käsilaukaisu kesken
  vuoron polkaisee irtosession, joka ei tavoita ketään.
- Varareitti, jos työkalut puuttuvat vuorosta: kirjoita
  `docs/viesti-<vastaanottaja>.md` omalle haaralle ja pushaa.
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
| Opus 6 (Siperia-lehdet) | session_01R7LDPk5Kte4FonJcBzX2QS (ultracode; Siperian 8 kaupunkikannen erät 1–3 haaralla claude/opus6-siperia-lehdet; EI uutis-/mediaosioita, EI kohtaamisia; raportoi Fablelle) | 14.8.2026 |
| Fable max (apusessio) | session_01NQpicvHRAzUpX4NfcYwsyv (Fable max 2; EI vastaanota viestejä tilinvaihdon jälkeen — uusi tili perustaa oman Max-session tarvittaessa. Vanha session_01U8Nqxu… arkistoitu 11.8. konttivian takia) | 11.8.2026 |
| Opus 1 | session_018rsYBddUoko7DSajtpoEKy (jatkosessio 5; ME-maalehdet VALMIIT v574 — luovutuspaperi docs/opus1-tilanne.md 1e; sessiot 1–4 arkistoitu) | 11.8.2026 |
| Opus 2 | — (arkistoitu source_url-vian takia; Bahrain siirretty Opus 1:lle, perustetaan uudelleen kun ME-kohdekarttajono aukeaa) | 10.8.2026 |
| Sonnet 1 | session_0184WdPeGzjAbnuXjWvquN8Q | 10.8.2026 (5. yritys; aiemmat kaatuivat source_url-vikaan, ks. fable-tilanne) |
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
2. **Raporttihaara ei vaihdu ilmoittamatta.** Uusi haara perustetaan
   vain, jos vanhan raportin LOPPUUN kirjoitetaan ensin minne työ
   siirtyy (Opus 1:n oppi 10.8.: haaranvaihto kesken erän näytti
   kahden tunnin jumilta, vaikka työ eteni koko ajan).
3. **Fablen jatkuva vahti.** Fable pitää git-monitoria, joka herättää
   sen HETI kun mikä tahansa tiimihaara liikahtaa (ei odoteta
   vahtikierrosta), ja tarkistaa joka kierroksella list_sessions-
   tilat (post_turn_summary + updated_at): "working" yli 45 min ilman
   committia → herätystrigger sessiolle; "review_ready" → raportti
   luetaan ja SEURAAVA TYÖ annetaan heti, ettei sessio jää tyhjän
   panttina valmiuteen; trigger laukaistaan aina heti fire_triggerillä
   (ajastin viivästeli tänään ~15 min).

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

Ajantasainen tilannetaulu on `js/tyohuone-tilanne.js` (työhuoneen
etusivu) ja Fablen jono `docs/fable-tilanne.md`. Tiivistetysti:

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
