# Fablen tilannekuva — jatka tästä /clearin tai TILINVAIHDON jälkeen

*Käsittelykuva, jotta työ jatkuu kontekstin nollauksen — tai kokonaan
uuden tilin session — yli. Lue tämä ENSIN, sitten `CLAUDE.md`,
`docs/roolitus.md`, `docs/isoisan-raamattu.md` ja
`js/tyohuone-tilanne.js`. Ylin osio on aina tuorein tila; alemmat
osiot ovat aikajärjestyksessä vanhenevaa historiaa.*

## UUSI TILI KÄYNNISSÄ 10.8. (~08:45Z alkaen) — TÄMÄ ON TUOREIN OSIO

- **Uuden tilin Fable-sessio otti työn vastaan** (luovutusprompti
  luettu, kaikki luovutusdokumentit luettu, main v511, testit 578/0).
  Uudet sessio-id:t ovat docs/roolitus.md:n taulukossa: Fable
  `session_01BPysCfxscsVyzAEYmb88Zr`, Opus 1
  `session_01LrZTPX64MWBxukCQ7p7NBJ` (ME-erä D + tekijätarkistimen
  ajo kaikille paketeille, lupa myönnetty), Sonnet 1
  `session_01RT3ucdBD6Pt48BP75qvjKw` (kokoava koko Euroopan QA,
  käynnistetty heti; HUOM 1. sessio jäi ilman lähderepoa, tulkitsi
  jälkikäteisen add_repo-ohjeen epäluotettavaksi ja arkistoitiin —
  HUOM: tämä kohta vanheni — source_url osoittautui myöhemmin
  itse viaksi, ks. RATKAISTU ~11:50Z -kohta), Fable max
  -apusessio
  `session_01U8NqxuC5RCoMozxGqDzEJm` (omistajan tilaus: syväajattelu
  vaikeisiin pulmiin; omistaja kytkee Max-tilan UI:sta). Opus 2 ja
  Sonnet 2 perustetaan vasta kun niiden jonot aukeavat (ME-kohdekartat
  vaativat ME-kaupunkilehtiä; nähtävyysjutut vaativat karttoja).
- **KOHDERYHMÄPÄÄTÖS (omistaja 10.8. ~08:45Z, SITOVA):** peli EI ole
  lastenpeli. Se on seikkailupeli, jossa samalla oppii; kohderyhmä
  13 vuotta täyttäneet ja aikuiset, tulevaisuudessa myös koulukäyttö
  (13+). "Lastenpeli"-sanasto siivottu repoista (CLAUDE.md,
  periaatteet.md pilari 4, isoisan-raamattu, tutki-aiheet,
  tyolista-opukselle, sonnet2-tilanne + koodikommentit). Sisältö- ja
  turvarajaukset (ei sotasisältöä, ei pelottelua, pyhät kaupungit
  omistajan päätöksellä) pysyvät ennallaan.
- **Ultracode käytössä Opus/Sonnet-sessioilla** (omistajan päätös
  10.8.): valtuutus lähetetty triggereinä Opus 1:lle ja Sonnet 1:lle;
  tulevien sessioiden aloituspromptteihin sana "ultracode" mukaan.
- **Valmiusportti:** kohta 7 KIINNI (erä 13 = v508 mainissa). Auki
  8b (Sonnet 1:n kokoava QA, käynnissä) ja 9 (Fablen läpipelaus,
  käynnissä). Ilmoitus omistajalle vasta kun molemmat kiinni.
  Omistaja aikoo koepelata Euroopan ja antaa palautetta.
- **VAHTIKIERROS 2 (~10:40Z):** Sonnet 1:n 2. sessio jumittui
  PENDING-tilaan käynnistymättä → arkistoitu, 3. yritys
  session_011TaRR7yWxMBvJLPD58xyMq (source_url + koko tehtävänanto).
  Opus 1 julkaisi v520:n (Saudi-faktakorjaukset; tarkastusagentit
  eri silmin löysivät 11 vikaa — TYÖTAPA VAKIOIDAAN: sama ajo
  jokaiselle uudelle maalle ENNEN mergeä). Fablen päätökset
  Opus 1:lle: Bahrain odottaa geometriaa, Rub al-Khali EI
  Saudi-sivuksi (erikoiskohde), FAL/GFDL-kuvien korvaus Opus 1:lle
  pikkueränä. **Opus 2 perustettu** (session_01H6fyHrfSCMAhZFHbDYKrvy):
  1. tehtävä BHR-geometria + Manama middleeast-laudalle (pilotti,
  Fablen katselmus ennen mergeä; kohdekartta vasta lehden jälkeen).
  Alun viilauspaketti v519 + intro v2 mainissa (omistajan
  iPhone/luentapalaute: suora zoom, äänet+kiikari pois,
  lainausmerkit pois luennasta). v518 aarteiden pikkuikonit.
- **RATKAISTU ~11:50Z — juurisyy oli create_sessionin source_url-
  parametri:** sen kanssa kontti kaatuu käynnistyksessä virheeseen
  "chdir /home/user/[Mm]atkakirja: no such file or directory"
  (klooni ja työhakemisto menevät ristiin). OPPI: TÄSSÄ
  YMPÄRISTÖSSÄ EI KOSKAAN source_url:ää — ympäristön oma
  lähdeasetus hoitaa kloonin; jos repo silti puuttuu kontista,
  session promptiin varautumisohje (julkinen git clone + add_repo
  push-oikeuksiin). TOINEN OPPI: uusi sessio saa aloituspromptin
  "background-task event" -kehyksessä ja kysyy omistajalta
  vahvistusta ennen kuin tarttuu toimeen — omistajan lyhyt
  "voit jatkaa, Fable saa ohjata sinua" -vastaus session omassa
  UI:ssa riittää. Alkuperäinen (vanhentunut) havainto:
  uudet kontit eivät käynnisty. Kaikki klo 09:49Z jälkeen luodut sessiot jäävät
  PENDING-tilaan ilman konttia: Sonnet 1 v2 (arkistoitu), Sonnet 1
  v3 (session_011TaRR7yWxMBvJLPD58xyMq), Opus 2
  (session_01H6fyHrfSCMAhZFHbDYKrvy), aarrekuvasessio
  (session_015zorjqbjhwATFAsbt8RZca). Ennen sitä luodut (Fable,
  Opus 1, Fable max) toimivat. SEURAUS: kokoava Euroopan QA,
  Bahrain-geometria (siirretty Opus 1:lle kaistanylityksenä,
  trig 11:52Z) ja aarrekuvien generointi ovat jumissa/uudelleen-
  järjestelty; GOOGLE_API_KEY on vain uusissa konteissa, joten
  aarrekuvat vaativat toimivan uuden kontin. Ilmoitettu omistajalle
  — kannattaa kokeilla PENDING-session avaamista claude.ai/code-
  UI:sta (voi potkaista provisioinnin käyntiin) tai tarkistaa
  ympäristön tila. Effort-tasoa ei voi asettaa create_sessionissa —
  omistaja säätää sen UI:sta (max→high aarrekuvasessiolle pyydetty).
- **AARTEET (omistajan palaute 10.8. ~10:10Z):** vanhat Afrikan
  tähti -tyyliset jalokivet POIS kaikkialta, vain uudet tarinalliset
  kuva-aarteet jäävät. v518 vaihtoi pikkuikonit (tulosrivi, passi,
  laudan käännetyt laatat, tapahtumakuplat) aarrekuviksi
  (aarreIkoni-apuri + SVG image laudalla; piirrosikoni varasoluna).
  KESKEN: maailmankartan, Suomen ja Istanbulin jalokivillä ei ole
  kuvia lainkaan, ja pääaarteiden kuvat (tools/aarrekuvat-promptit.md
  kohdat 22–31: mm. Magellanin kompassi, Sulttaanin timantti, Lapin
  kulta) ovat generoimatta — yhteensä 19 kuvaa. Generointi vaatii
  GOOGLE_API_KEYn ympäristöön (tools/generoi-aarrekuvat.mjs,
  gemini-3-pro-image; pienennys 640 px + silmätarkistus + kytkentä
  kuten v455). Pyydetty omistajalta.
- **Avausluennat UUSITTU (v516):** ELEVEN_API_KEY löytyi ympäristöstä
  — intro-puhe.mp3 ja puhe-lento-alku.mp3 generoitu v3-tunnetagein,
  tekstit vaihdettu (lentorepliikki A + intro-draamalisä). Uusi
  tools/generoi-avaus.mjs mittaa hännän hiljaisuuden dekoodaamalla
  ja lisää 0,7 s hiljaisuutta (giljotiinikatkaisu ei naksahda; EI
  loppufeidausta puheeseen — omistajan ohje). Sama tekniikka
  kannattaa periä tools/generoi-luennat.mjs:ään ME-luentoja varten.
- **Omistajan testipalaute 10.8. (~09:15Z→) ja Fablen jono:**
  1) Avauslennon teksti + pelin aloitusteksti uusiksi/viilattaviksi,
  ehdokkaat annettu omistajalle — tekstin vaihto vaatii luennan
  uusintageneroinnin (ELEVEN_API_KEY omistajalta, generointi vasta
  tekstivalinnan jälkeen; myös intro-puheen intonaatiot uusitaan
  samalla v3-tageilla). 2) TEHTY v513: lentoanimaation lähtönykäys
  (kaksi rAF:ää + 180 ms delay ennen liikettä), intro-puheen
  ulosfeidaus (haivytaAani), moottoriäänen pehmeä sisäänfeidaus,
  kuvakatselimen nuolinäppäimet+Esc (naytaKulttuuriKuva,
  document-tason kaappaava kuuntelija — sama katselin palvelee
  lehteä, gallerioita ja nähtävyysjuttuja). 3) ElevenLabs v3
  -ilmaisukeinot tutkittu (tagilista, stability 0.0/0.5/1.0,
  text-to-dialogue 2000 merkkiä, ei SSML-breakia v3:ssa; raportti
  Fablen muistissa — ydin: tagit englanniksi suomitekstissä,
  1–3 tagia/kappale, alle 250 merkin luennat epävakaita).
  4) UI-duplikaattien kartoitus käynnissä agentilla (popupit,
  pyyhkäisyt, näppäimistö) — yhtenäistämissuositukset tulossa.
  5) **UUSI KAANONLINJAUS kirjattu isoisan-raamattu.md:hen ("Imu
  aikuiselle"):** ME:stä alkaen matkakirjatekstit jännittävämmiksi
  ja hurjemmiksi aikuisen imulla; "askeleet sumussa kyllä, vaara ei"
  väistyy uusissa teksteissä; lastenversio erikseen myöhemmin. →
  FABLEN ISO TYÖ JONOSSA: Lähi-idän laudan (~29 kaupunkia)
  matkakirjatekstit uudella mitalla (kaupunkijakotaulu raamattuun
  ENNEN kirjoittamista, kuten Euroopassa).
- **Skaalauslupa (omistaja 10.8. ~08:52Z):** Fable saa perustaa
  useampia Opus/Sonnet-sessioita oman harkinnan mukaan. Kaksi Max 20
  -tilausta vuorottelevat: kun tämän tilin viikkoraja täyttyy,
  siirrytään toiselle tilille viikon loppuun ja palataan kun raja
  nollautuu (luovutusdokumentit pidetään siksi aina ajan tasalla).
  Urakka jatkuu kaikkien mantereiden loppuun asti.

## TILINVAIHTO TEHTY 10.8. (~08:45Z)

- Omistaja käynnisti vaihdon. Vanhan tilin **yövahti-cron on
  poistettu** (trig_01XuRjdzwJ9VGjzFjCBj5XYN, delete_trigger);
  muut ajastimet olivat kertalaukaisuja ja jo sammuneet.
- **Luovutusprompti uuden tilin Fable-sessiolle:
  `docs/luovutusprompti.md`** — annettu omistajalle myös chatissa.
- Vanhan tilin sessiot (Fable + 4 tiimisessiota) jäävät
  arkistoitaviksi; ne eivät tee enää työtä ilman omistajan erillistä
  pyyntöä. Uusi tili perustaa tiimin luovutusdokumenttien pohjalta.

## TILINVAIHTO VALMISTELUSSA (omistaja 10.8. ilta)

- Omistaja siirtää pelin kehityksen **kokonaan toiselle tilille**,
  koska tämän tilin viikkorajat tulevat vastaan. Fable pyydettiin
  kirjaamaan KAIKKI vaiheet tähän tiedostoon niin, että uusi sessio
  jatkaa suoraan. **Päivitä tätä tiedostoa jokaisen merkittävän
  vaiheen jälkeen** — tämä on luovutusdokumentti.
- Omistaja pyytää erillisen luovutuspromptin vasta vaihdon hetkellä
  — sitä EI kirjoiteta vielä, mutta tämän tiedoston on kelvattava
  sen rungoksi milloin tahansa.
- Uudella tilillä sessio-ID:t, triggerit ja kontit ovat UUSIA:
  vanhat tiimisessiot (alla) eivät siirry. Uusi Fable perustaa
  tiimin tarvittaessa uudelleen create_sessionilla ja antaa erät
  tästä tiedostosta. Yövahti-cron (trig_01XuRjdzwJ9VGjzFjCBj5XYN)
  on sidottu TÄHÄN sessioon — vanha tili sammuttaa sen vaihdossa
  (delete_trigger) tai se jää kuolleeksi.
- **Omistaja salli subagenttien (Agent-työkalu) käytön** nopeuttamaan
  työtä 10.8. illalla — rinnakkaista tutkimista ja tarkistuksia saa
  delegoida agenteille vapaasti.

## TILANNE NYT (10.8. ilta, main = v506)

- **Main: v506** (`2026-08-09.506`). Illan julkaisut: v503
  valokuvapulma (Ateena-pilotti), #735 työhuoneen Pelit-välilehti,
  v504 nähtävyysjuttuerä 12 (Sonnet 2), v505 popupin alarako +
  täysikoon kuvakatselimen lehtiselaus, v506 kohtaaminen ensin
  joka kaupungissa (ks. pelisääntö alla).
- **PELISÄÄNTÖ v506 (korvaa v478/v499-kirjaukset alempana):**
  tarinakaaren kohtaaminen on kaupungin ENSIMMÄINEN tehtävä JOKA
  kaupungissa — myös laatattomissa ja pulmakaupungeissa. Laatatön
  kohtaaminen palkitsee kuten tutkiminen (quiz.explore); pulma
  tulee kohtaamisen jälkeisellä pysähdyksellä; botti ei kuluta
  kaarta (kaariKaytetty on yhteinen eikä tallennu — kohtaamiset
  ovat istuntokohtaisia, tarkoituksella). Saapumiskortin nappi
  nimeää henkilön ("Tapaa Nikos"): kutsumanimi johdetaan
  henkilökuvauksesta (tarinakaari.js kutsumanimi()), jerusalem ja
  mekka saivat nimen käsin dataan. Tutki-nappi näkyy kaupungissa
  AINA (lehti luettavissa tehtävien jälkeenkin); kortin
  tehtävänappi piiloutuu kun game.tehtavaTarjolla() on false.
- **Valmiusportti (ilmoitus omistajalle vasta kun kaikki kiinni):**
  auki enää kohta 7 osalta erä 13 (Vilna/Oslo/Kööpenhamina —
  Sonnet 2 tekee, jatkaa ilman eri lupaa), kohta 8b (Sonnet 1:n
  kokoava koko Euroopan QA) ja kohta 9 (Fablen läpipelaus +
  YKSI ilmoitus). Erä 12 (Tromssa/Dubrovnik/Riika) tuli mainiin
  v504:nä.
- **Tiimin tila:** Opus 1 tekee ME-eriä (A: ARE+Jordania mainissa;
  B: Oman+Qatar mainissa v501; jatkaa C: Egypti+Kuwait → D:
  Saudi-Arabia ILMAN pyhiä kaupunkeja + Bahrain). Opus 2
  valmiudessa (seuraava iso erä: ME-maakartat kun Eurooppa
  kuitattu). Sonnet 1 valmiudessa odottamassa kokoavaa QA:ta.
  Sonnet 2 erässä 13. Raportointi VAIN gitillä
  (docs/viesti-fable.md omalle haaralle + push) — create_trigger
  jumittaa konteissa UUID-alias-lupakyselyyn, settings-korjaus
  #719 ei auttanut.
- **Omistajan viimeisimmät palautteet hoidettu:** Zeuksen temppelin
  popup-hienosäädöt (v505) ja Ateenan kohtaamis-/luenta-/
  lehtilukko-viat (v506, testattu 41/41 kaupunkia + Playwright).
- **Odottaa omistajaa:** pelikatalogin 8 ehdotuksesta valinta
  (suositus: paripeli + karttapulma; js/tyohuone-pelit.js),
  valokuvapulman monistuslupa, zoom-synkka-haaran poisto
  GitHub-UI:sta, branch protection -klikkaus, GOOGLE_API_KEY:n
  kierrätys, ME-luentojen "generoi"-käsky.
- **Parkissa:** Aasian kaaritekstit, pääaarteiden AI-kuvat,
  isoisän ääni -pilotti, pulmaluennat (EI tehdä — variantit
  rikkovat tekstivastaavuuden), pyhät kaupungit (oma sivutyyppi,
  johdannot kirjoittaa FABLE).

## Kuka olen ja tiimi

- **Fable = koordinaattori** (tarina + lehdet + koodi + julkaisut). Malli
  `claude-fable-5`. Omistaja (Sami) ohjaa kaiken Fablen kautta.
- **Malli-sääntö (sitova):** jos huomaan pudonneeni toiseen malliin,
  pysähdyn heti, ilmoitan sen selkeästi enkä jatka — pyydän omistajaa
  vaihtamaan takaisin Fableen. Malli-identiteetti vastauksissa
  `claude-fable-5`; EI koskaan commiteihin, PR:iin tai koodiin.
- **Tiimi (raportoivat vain Fablelle triggereillä; persistent_session_id):**
  - Opus 1 (lehdet/rakenne): `session_01AEN2as7TAggi2SX3w3DqWV`
  - Opus 2 (kartat): `session_017kajFQA5rFWByGvVLXc9Df`
  - Sonnet 1 (QA): `session_01MAirFte9MpE1HnVRpCj2Mb`
  - Sonnet 2 (nähtävyysjutut): `session_01RQtKAgCVRDZzMGRKYJLoWS`
  - Fable-session: `session_01R1jVv12E56gbU5qtH5xGaG`
- Triggerit: `create_trigger` + persistent_session_id + `run_once_at`
  ~5 min tulevaisuuteen. Tiimin pitkäikäiset kontit ovat vanhempia kuin
  `.claude/settings.json`, joten Create Trigger -lupakysely toistuu
  heille kunnes kontit kierrätetään ("Approve once" siihen asti). Ohjeet
  ovat jo matkalla tiimille — "Pysähdy" pysäyttää vain uudet Fablen
  ohjeet, ei jo annettuja seisovia ohjeita.

## Omistajan linjaus 9.8.: laudat on jo tarkistettu

Mantereiden kaupungit ja niiden paikat on tarkistettu jo aiemmin
koko maailmassa — **niitä ei tarvitse varmistaa uudelleen.** Älä
käytä aikaa lautojen kaupunkisijaintien uudelleentarkistuksiin
(esim. piste-monikulmiossa-ajot); tarkista vain UUSI data jota
peliin tuodaan, ei olemassa olevaa lautaa.

## Aarrekuvat: TEHTY (v455) + avaimen kierrätys suositeltava

Kaikki 21 manneraarretta generoitu `gemini-3-pro-image`-mallilla
(Imagen 3/4 eivät olleet avaimen käytettävissä), silmätarkistettu,
pienennetty 640 px JPEG:ksi ja kytketty peliin (#662). Pääaarteiden
promptit (tools/aarrekuvat-promptit.md kohdat 22–31) odottavat
omistajan erillistä tilausta. HUOM: omistaja liitti Google-avaimen
suoraan chattiin — avain on poistettu levyltä käytön jälkeen, mutta
omistajalle on suositeltu sen kierrättämistä (aistudio.google.com).
GOOGLE_API_KEY voi silti olla ympäristömuuttujissa kontin
kierrätyksen jälkeen, jos pääaarteet halutaan generoida.

## Julkaisumekaniikka (törmäyksiä tulee jatkuvasti)

- Main on **v455** (`matkakirja-2026-08-09.455`). Versiot `2026-08-09.NNN`.
  Tuoreimmat: minitehtävät kaikille aihesivuille (v454, #659), Eurooppa-
  kaaripaketin erä 1 työhuoneeseen (#660), AI-aarrekuvat (v455, #662).
  `git fetch origin main` silti aina ennen numeroa.
- Opus 2 julkaisee karttoja tiheään → versionumerotörmäykset ovat sääntö.
  `git fetch origin main` **juuri ennen** numeron valintaa. Jos oma haara
  vanhentuu: tallenna omat lähdemuutokset patchina,
  `git checkout -B <haara> origin/main`, `git apply`, nosta numero,
  buildaa, committaa, `push --force-with-lease`, PR, squash-merge,
  `git checkout -B <haara> origin/main` uudelleen.
- Julkaisukaava: bumpaa `sw.js` CACHE + `js/main.js` APP_VERSION + rivi
  `js/muutokset.js` (uusin ensin, ≤~60 merkkiä). Aja
  `node --test tests/*.test.mjs`, `node tools/tarkista-kaksoisavaimet.mjs`,
  `node tools/build-standalone.mjs`. Squash-merge "(vNNN) (#PR)".
- **Työhuone- ja docs-muutokset EIVÄT nosta versiota** (network-first),
  mutta pitää silti mergeä mainiin näkyäkseen.
- Oma työhaara: `claude/valtion-analyysi-lehtisivu-e5s1lw`.
- Attribuutio joka GitHub-postaukseen (footer). Committeihin
  `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>` +
  `Claude-Session: https://claude.ai/code/session_01R1jVv12E56gbU5qtH5xGaG`
  (Fablen sessio-ID — sama sessio clearin yli).

## ISO TEHTÄVÄ TEHTY 9.8. — 5 kaupunkia, KOKO tekstipaketti

**TILA: valmis ja työhuoneessa (KAARI_PAKETIT,
js/tyohuone-kehitys-data.js; Kehitys-välilehden ylin osio "Koko
paketti: 5 kaupunkia ja henkilöt"). Odottaa omistajan lukua — ääniä
EI generoitu. Henkilöt: Tomáš (Praha, lyhdynsytyttäjä), Emine
(Istanbul, vedenvartija), Anton (Wien, suntio), Lucia (Venetsia,
naamiontekijä), Márta (Budapest, kylpymestari). Viisi vihjettä
kietoutuvat meta-arvoitukseen: joku pitää isoisän jälkiä yllä
nykyaikana. Valikkorakenne toteutettu: uusin kokeilu ylimpänä,
vanhat kootussa "Vanhat kokeilut" -valikossa.**

Alkuperäinen tilaus: viisi kaupunkia isoisä-kaarena työhuoneeseen,
**koko tekstipaketti kerralla suunniteltuna**. Yhdelle kaupungille
kuuluu:

1. **Saapuminen** — isoisä (Horatio) äänessä, jännittävä/pelottava
   (mutta "askeleet sumussa kyllä, vaara ei").
2. **Kohtaaminen** — kun pelaaja menee tapaamaan HENKILÖN (peliin kuuluva
   "Tapaa X" -mekaniikka, `js/packs/kohtaamiset.js`). **Suunnittele myös
   se henkilö** jokaiseen kaupunkiin (kuka, miksi paikalla).
3. **Visa** — kohtaaminen tietovisassa, cliffhanger.
4. **Aarre** — sulkee saman kuvan jonka saapuminen avasi + koukku.

**Omistajan ydinajatus:** kohtaamishenkilö voi antaa **vihjeen, joka
toimii cliffhangerinä AARTEEN LÖYTYMISEN JÄLKEEN** — eli henkilön
repliikki jää auki ja vie eteenpäin. Suunnittele paketti tämä kärkenä.

- Luonnokset viidestä kaupungista ovat **`docs/kaari-luonnos.md`:ssä**
  (saapuminen, kohtaaminen + henkilö, visa, aarre, henkilön vihje).
  **HUOM: nämä luonnokset kirjoitti Opus mallipudotuksen aikana, EIVÄT
  Fable — käytä niitä pelkkänä referenssinä ja kaupunkien/kuvien
  muistilistana, ja kirjoita tekstit omalla äänelläsi uusiksi.** Älä
  ota niitä kaanonina.
- Nykytila mainissa: työhuoneessa on VAIN aiempi Fablen viisikko
  (`KAARI_KAUPUNGIT`, js/tyohuone-kehitys-data.js: saapuminen/visa/aarre
  + 15 mp3 `assets/audio/puhe-kaari-*.mp3`, osio "Isoisä äänessä — 5
  uutta"). Henkilöt/kohtaamiset ja valikon uudelleenjärjestys EIVÄT ole
  mainissa — ne ovat tekemättä.
- **ÄLÄ generoi ääniä vielä.** Omistaja päättää lopuksi, mitä luetaan
  ääneen ja mitä ei. Generointi: `tools/generoi-kaari.mjs` (Viisas
  Kertoja, eleven_v3, stability 0.5) vasta kun tekstit hyväksytty.
- **Työhuoneen valikkorakenne (omistajan toive):** uusin kokeilu aina
  omaan osioon **ylimmäksi**, vanhat kokeilut piiloon toiseen
  (koottuun/collapsed) valikkoon — helpompi löytää uusin. Toteuta tämä
  `tyohuone.html`:n Kehitys-välilehden haitariin.
- Työhuoneessa on jo osio "Isoisä äänessä — 5 uutta" (Praha, Istanbul,
  Wien, Venetsia, Budapest) + ▶ Soita kaikki peräkkäin. Data
  `KAARI_KAUPUNGIT` (`js/tyohuone-kehitys-data.js`), 15 mp3
  (`assets/audio/puhe-kaari-*.mp3`). Nämä ovat KOKEILU, ei pelissä.

## Muut kesken / parkissa

- **Pulmien laatuloikka (omistajan tilaus).** Nykyiset piirretyt
  pulmakuvat "liian kökköjä" — vaihda OIKEISIIN Commons-valokuviin tai
  hybridiin. Pulmat pohjaa **kulttuuriin ja tietoon**, EI laskemiseen.
  Generoitavissa hieman eri joka kerta. Ateenan pylväspulma pilotiksi.
  Pylväskuvat jo haettu Commonsista (kaikki PD/CC, >800px):
  doorilainen `File:Chapiteau-Parthenon.jpg`; joonialainen
  `File:Delphi - Ionisches Kapitell.jpg`; korinttilainen
  `File:Corinthian capital, AM of Epidauros, 202545.jpg`; hämäys
  `File:ArcoTitoCapComp.jpg`. Nyk. pulmat: Afrikka 5 + Eurooppa 6
  (`js/packs/*-puzzles.js`) — Euroopan 3 uusinta (geysir/vuorovesi/
  tuulikukko, v425) ovat laskupohjaisia, työstä tieto/kulttuuripohjaisiksi.
- **Tunnelmavideot (parkissa).** Commonsista löytyi 20/21 maalle vapaa
  lyhyt tunnelma-/kielivideo (kevyet ~5–15 MB kelpaa; raskaat korvattava).
  Ei toteutettu.

## Tiimin tila — KAIKKI CLEARATTU 9.8.2026 (sama sessio, tyhjä konteksti)

**OMISTAJAN UUSI SUUNTA 9.8. (iltapäivä): "Eurooppa valmiiksi
kaikilta osin", sen jälkeen SUORAAN Lähi-idän kaupunki- ja
maalehtiin (lauta middleeast.js, ~28 kaupunkia, on jo pelissä).
Matkakirjan tarinapuoli PARKISSA — palataan myöhemmin. Lupa
tehtävänjakoon ja julkaisuihin annettu.**

**Tehtävänannot lähetetty triggereinä 9.8. ~13:50Z kaikille
neljälle:**
- **Opus 1:** Helsinki/Suomi-malli kuitattu hyväksytyksi (Fable
  omistajan valtuutuksella) → vaiheen B siirrot loppuun →
  menovinkkiruudun irrotus → Suomen maalehden täydennys →
  minitehtävät (33) → Tromssa + 5 aluetta → valokuvarajatapaukset.
- **Opus 2:** jokirelaatioiden täyttökorjaus (Dnepr/Neva/Tonava) →
  tv-siivous docs/tyolista-opukselle.md → Lähi-idän selvitysmuistio
  (ei vielä piirtoa). roolitus.md:n tv-jäämät siivosin itse 9.8.
- **Sonnet 1:** loppu-QA-brief, kierros 1 nykyiselle mainille;
  kierros 2 uusille erille kun Fable ilmoittaa. Read-only.
- **Sonnet 2:** kaikki viisi nähtävyysjuttuerää järjestyksessä
  (Istanbul/Marseille/Edinburgh ensin), erä kerrallaan, raportti
  välissä, wiki-ansat muistissa.

Kaikki raportoivat Fablelle triggereillä erien välissä ja jatkavat
suoraan seuraavaan erään, ellei Fable keskeytä.

Koko tiimi (Opus 1, Opus 2, Sonnet 1, Sonnet 2) clearattiin samaan
aikaan kanssani, mutta **samoissa sessioissa — yllä olevan taulukon
sessio-ID:t ovat yhä voimassa** (clear tyhjentää vain kontekstin, ei
vaihda ID:tä). Käytä niitä triggereissä suoraan. Kunkin oma tilannekuva
on mainissa; lue ne kun tarvitset yksityiskohdat:

- **Opus 1** (lehdet/rakenne) → `docs/opus1-tilanne.md`. Viimeksi
  mainissa: neljä maalehteä (Turkki/Irlanti/Portugali/Unkari) + vaiheen
  B ensimmäinen siirto Helsinki/Suomi (v435, #599). Vaihe B kesken
  (`docs/lehtitasapaino.md`).
- **Opus 2** (kartat) → `docs/opus2-tilanne.md`. Kohdekartat: v430
  mennessä 24/31. Jäljellä oli 7: Kiova, Pietari, Moskova, Sofia,
  Bukarest, Sarajevo, Odessa (osa saattoi valmistua ennen clearia —
  `git log origin/main`). Istanbul = 2 maanosaa.
- **Sonnet 2** (nähtävyysjutut) → `docs/sonnet2-tilanne.md`. Live:
  Praha/Wien/Budapest/Pariisi (v426), Helsinki (v431), Ateena/
  Amsterdam/Dublin (v436). Seuraavaksi Opus 2:n uudet kartat.
  - **Wiki-ansat:** fi-wiki "Neitsyttorni" = Bakun torni (Istanbulin =
    Kız Kulesi); fi-wiki "Belém" = Brasilian kaupunki (Lissabonin =
    kaupunginosa).
- **Sonnet 1** (QA) → `docs/sonnet-tilanne.md`. Loppu-QA-brief kesken.

## Luvat ja tahti (päivitetty 9.8. iltapäivä)

- **TÄYSI VALTUUTUS (omistaja ~14:30Z): "Saat päättää kaiken ja saat
  triggeröidä vapaasti"** — ei tarvitse kysyä lupaa päätöksiin,
  triggereihin, julkaisuihin eikä mergeihin. Omistaja haluaa työn
  jatkuvan katkoitta. Tavoite: Eurooppa valmiiksi, sitten Lähi-idän
  lehdet.
- **Fablen päätökset 9.8. ~14:37Z (triggerit lähetetty):**
  - Opus 1: PR #630 (vaihe B erä 2) törmäsi v437:ään (#631 vei numeron)
    → rebase + uusi numero + merge; eräjako 5–7 kaupunkia/erä
    hyväksytty; Lontoon haamusisältö maakartat.js:2257–2674 poistoon
    erän kyljessä.
  - Opus 2: nimiVasen-kommenttikorjaus erän kyljessä;
    `middleeast-countries.js` kuuluu Opus 2:lle (Euroopan jälkeen,
    EI testiporttia välissä); Dubai pilotiksi; **Jerusalem + Petra/
    Siinai/Rub al-Khali/Persepolis/Kappadokia = erikoiskohteita ilman
    maa-attribuutiota** (kaanonpäätös, tarinapuoli suunnitellaan kun
    Matkakirja palaa parkista).
  - Sonnet 1: kierros 2 = 9 linkin selainpistokoe + duplikaattilista
    + siirtojen regressiovahti (#630 ja Sonnet 2:n erät).
    **Duplikaattilinjaus: korjataan vain 3×+ toistuvat ja saman
    tiedoston sisäiset; 2× eri yhteyksissä saa jäädä.**
- **Irtosessiovaroitus (opittu 9.8.):** kun trigger laukeaa kesken
  Fablen vuoron, syntyy rinnakkainen irto-Fable joka allekirjoittaa
  samalla sessio-ID:llä. Näin kävi ~13:30–13:50Z (irtoinstanssi teki
  #627–#629 ja #632 — hyvää työtä, omaksuttu). Jos huomaat mainissa
  tämän ID:n committeja joita et muista tehneesi, ne ovat
  todennäköisesti irtoinstanssin; tarkista sisältö äläkä oleta
  virhettä. Pidä tilannekuva ajan tasalla juuri tämän varalta.
- Matkakirja (5 kaupungin paketti, äänivalinnat, sateenvarjomies)
  parkissa omistajan päätöksiä odottamassa — EI ääniä, EI uusia
  tarinatekstejä ennen kuin omistaja palaa asiaan.
- Fablen oma seuraava työ: kokoa tiimin raportit, pidä tilannetaulu
  ajan tasalla, ratko versiotörmäykset. Euroopan valmistuttua
  suunnittele Lähi-idän lehtien työnjako (Opus 2:n selvitysmuistio
  pohjaksi; Opus 1:lle kaupunki/maa-lehtijono; Sonnet 2:lle
  nähtävyysjutut karttojen tahdissa).
- **Nähtävyyskuvien laatupassi (omistajan palaute 9.8. ennen lähtöä:
  "huonot kuvat, ainakin Helsingissä").** Helsinki tehty pilottina
  (v437, #631): 6/7 kuvaa vaihdettu — prosessi: kohteen nykykuva ja
  3+ Commons-kandidaattia ladataan ja KATSOTAAN, paras valitaan
  (valo, kohde pääosassa, ei roinaa etualalla), lisenssi + tekijä
  Commons-API:sta, selite päivitetään kuvan mukaiseksi (ei
  ylilupauksia). JONOSSA samalla prosessilla: Berliini, Lontoo,
  Kairo, Venetsia, Madrid, Tukholma, Pariisi, Praha, Wien, Budapest,
  Ateena, Amsterdam, Dublin — Fable tekee erissä (2–3 kaupunkia per
  PR) muun koordinaation lomassa. Sonnet 2:n uudet erät syntyvät jo
  tiukennetuilla kuvakriteereillä (trigger 9.8.), niitä ei tarvitse
  passittaa erikseen. Omistajan huomio Helsingin kartan kainalosta →
  Opus 2:lla työjonossa.
- **Pulmien laatuloikka Fablen pöydällä:** Ateenan pylväspulma
  oikeilla Commons-kuvilla (kuvat haettu, ks. "Muut kesken"),
  sitten geysir/laiturit/kukko kulttuuripohjaisiksi.

## Yövahti 10.8. (omistaja jätti tiimin yöksi; tunneittainen cron)

- **Cron:** `23 * * * *` (trig_01XuRjdzwJ9VGjzFjCBj5XYN). Täysi
  valtuutus; omistajalle EI viestejä ennen aamua ellei jokin mene
  peruuttamattomasti rikki. Aamulla kootaan yhteenveto.
- **Yön julkaisut tähän asti:** v473 aluelehdet (Opus 1), v474
  maakyltit (Opus 2), v475 illan testipelikorjaukset (Fable:
  kuvakaruselli, lehden vieritysvara, wikihäntien siistintä).
- **Versiotörmäys ratkottu klo 0.45:** #697 vei v474:n jonka #696 oli
  varannut → #696 mergettiin mainiin ja nostettiin v475:ksi
  työkalulla. Sonnet 2:n #693 (v472-törmäys) korjautetaan Sonnet 2:lla
  itsellään työkalulla (tehtävänanto lähetetty, merge valtuutettu).
- **Konttien kierrätys (lupakyselyjen poisto):** Sonnet 1 KIERRÄTETTY
  (illalla, todennettu). Opus 1, Opus 2, Sonnet 2 EI VIELÄ — kumpikin
  Opus julkaisi klo 0.32–0.45 eikä raporttia ole, joten voivat olla
  kesken ajon; kierrätys tehdään kun erätauko on varmistettu
  raportista ("raportoi ja jää odottamaan" -ohje on triggereissä).
- **Jonot annettu klo 0.48–0.55 triggereillä:** Opus 1 = Riika,
  Vilna, Oslo, Kööpenhamina, Dubrovnik (1–2 lehteä/PR). Opus 2 =
  mittakaavajana + Tromssan kohdekartta + vesikorjaukset (Tukholma,
  Madrid Cibele, Lontoon silmä). Sonnet 2 = #693:n versiokorjaus ja
  merge + erä 9 (Rooma, Krakova, Varsova, Tallinna). Sonnet 1 =
  Dubai-QA-tilannekysely; seuraava kierros Opus 1:n 5 lehden jälkeen.
- **Jumitarkistus:** ei jumeja havaittu tällä kierroksella (kaikki
  julkaisseet tunnin sisällä paitsi Sonnet 1, jolta odotetaan
  Dubai-QA-vastausta tilannekyselyyn — jos ei vastausta seuraavaan
  kierrokseen mennessä, kierrätä kontti ja anna QA-erä uudelleen).

## Omistajan portti 10.8. klo ~1.20: "Ilmoita kun valmista"

Omistaja EI testipelaa Eurooppaa ennen kuin ilmoitan että matkakirja-
ja etsi kätkö -pelit luentoineen ovat VALMIIT. Ei osittaisilmoituksia.
Valmiuden tarkistuslista (ilmoitus vasta kun KAIKKI kohdat kiinni ja
Sonnet 1:n loppu-QA ajettu):

1. [x] Tarinakaari 41/41 Euroopan kaupunkia, luennat 123/123 (v460).
2. [x] Tehtävämuodot: yksi tehtävä/pysähdys, pulma korvaa visan (v478).
3. [x] Viisi puuttuvaa kaupunkilehteä (v481 — Eurooppa on lehtien
       osalta täysi; Opus 1 teki koko erän kerralla).
4. [x] Orpoauditointi (v483): 164 minitehtävää koneellisesti, 0
       orpoa; 5 orpoa kulttuurivisaa korjattu (ml. evzone).
5. [x] Menovinkkisivujen kuvat (v486–v492): 58 kuvaa, 245/246
       riviä — pilotti katsottu ja hyväksytty kuvakaappauksesta.
6. [x] Kohdekartat kaikille lehtikaupungeille (v482, v484, v485 —
       Tromssa, Dubrovnik, Riika, Vilna, Oslo, Kööpenhamina) +
       vesikorjaukset (v480).
7. [ ] Nähtävyysjutut kohdekartallisiin kaupunkeihin: erät 9–12
       MAINISSA (9: Rooma/Krakova/Varsova/Tallinna v488; 10:
       Sofia/Bukarest/Sarajevo v495; 11: Kiova/Pietari/Moskova/
       Odessa v502; 12: Tromssa/Dubrovnik/Riika v504). Auki enää
       erä 13 (Vilna, Oslo, Kööpenhamina) — Sonnet 2 työn alla,
       jatkaa ilman eri lupaa.
8. [ ] Sonnet 1:n kokoava QA-kierros koko Euroopalle (peli + lehdet +
       luennat) kun 3–7 ovat mainissa.
9. [ ] Fablen oma läpipelaus Playwrightilla + ilmoitus omistajalle.

Löytöluentoja (puhe-kohtaaminen-*-loyto) EI lasketa valmiuteen:
kaaren aarreluenta kattaa paljastuksen äänen kaarilaudoilla.

### Yövahtikierros 2 (klo ~1.25): jaetut erät

- Opus 1 (trig 22:40Z): orpo minitehtävä -auditointi + menovinkkien
  kuvat (pilotti Suomi) + valokuvarajatapaukset/duplikaatit.
- Opus 2 (trig 22:42Z): kuusi kohdekarttaa (Tromssa, Dubrovnik,
  Riika, Vilna, Oslo, Kööpenhamina) erissä.
- Sonnet 1 (trig 22:44Z): QA kahdeksalle uudelle lehdelle + v478-
  pelisääntö + v479 Engel.
- Sonnet 2: erä 9 työn alla (ei uutta triggeriä).
- Kierrätykset yhä tekemättä Opus 1/Opus 2/Sonnet 2:lle — tehdään
  raporttien saapuessa erätauolla, ei kesken ajon.

### Yövahtikierros 3 (klo ~2.25): tilanne

- Tunnin saldo mainissa: v482–v485 (Tromssan + viiden uuden kaupungin
  kohdekartat, orpoauditoinnin korjaukset). Kohdat 4 ja 6 kiinni.
- Auki: kohta 5 (menovinkkikuvat, Opus 1 työn alla), kohta 7
  (Sonnet 2: erä 9 käynnissä, jonossa 10–13), kohta 8 (Sonnet 1:n
  8 lehden QA käynnissä; kokoava koko Euroopan QA vasta kun 5+7
  kiinni), kohta 9 (Fablen läpipelaus + ilmoitus).
- Ei jumeja: kaikki sessiot julkaisseet tai saaneet erän tunnin
  sisällä. Kierrätykset yhä odottavat raportteja (ei arkistointia
  kesken ajon); Sonnet 1 ainoa kierrätetty.

### Yövahtikierros 4 (klo ~3.30): jumit purettu, kaikki kontit kierrätetty

- **Kolme sessiota oli jumissa create_trigger-lupakyselyssä** raporttia
  lähettäessään (Opus 2, Sonnet 1) tai päätti vuoronsa mergeä vaille
  (Sonnet 2, "waiting on CI"). Diagnoosi get_session-työkalulla ilman
  arkistointia — post_turn_summary kertoo jumin suoraan, ja jumiin
  jääneen raportin SISÄLLÖN voi lukea pending_action-kentästä.
- **Havainto lupakyselyistä:** .claude/settings.jsonin sallinnat eivät
  auta kaikissa konteissa — Opus 2:n kontissa MCP-palvelimen alias oli
  UUID-muotoinen (mcp__bf7c680d-...__create_trigger), jota jokerit
  eivät kata, ja Sonnet 1:n kierrätettykin kontti kysyi. Yökäytäntö:
  varareitti (docs/viesti-fable.md + push) ohjeistettu kaikille, ja
  Fable tarkistaa get_sessionilla joka kierroksella.
- **Kierrätetty tänä yönä:** Sonnet 1 (2×, klo ~24 ja ~3.30), Opus 2,
  Opus 1, Sonnet 2 — eli KAIKKI. Kaikille kerrottu uudet jonot.
- **Sonnet 1:n 8 lehden QA:** PUHDAS (luettu jumiutuneesta
  triggeristä): rakenne 8/8, minitehtävävastaukset samalla sivulla
  8/8, kuvat 72/72 curlilla, v478-sääntö ok molemmissa tapauksissa,
  Engel ok. Valmiusportin kohta 8a kiinni.
- **Menovinkkikuvat etenevät:** Suomi (v486, pilotti katsottu ja
  hyväksytty kuvakaappauksesta) + ARE (v487); Opus 1 jatkaa loput
  erissä 3–5 maata/PR.
- **Sonnet 2:n erä 9** (Rooma/Krakova/Varsova/Tallinna) oli valmiina
  PR #708:ssa vanhalla v484-numerolla — Fable nosti v488:ksi ja
  mergeää CI:n jälkeen. Sonnet 2:lle erät 10–13 (ml. kuusi uutta
  karttakaupunkia).

### Yövahtikierros 5 (klo ~4.30): juurisyy korjattu

- **Trigger-jumien juurisyy löytyi ja korjattu (#719):** konttien
  MCP-palvelin esiintyy pysyvällä UUID-aliaksella
  (mcp__bf7c680d-...), jota nimijokerit eivät kata —
  .claude/settings.jsoniin lisätty aliaksen sallinnat. Opus 2 ja
  Sonnet 2 kierrätetty korjauksen jälkeen, joten uudet kontit
  poimivat sen; jumiutuneet viestit luettu jonosta ennen kierrätystä.
- **Opus 2:n kuittauksesta kirjattua:** Tallinnan kartta ajetaan
  uusiksi kaupunginmuurin kanssa (annettu tehtäväksi; diff
  selvitettävä ensin), mittakaavajana tarkistetaan lehdessä eikä
  tiedostona (ohje työkalussa), uudet wiki-ansat: fi-wikin
  "Amalienborg" on panimo ja "Vapaudenpatsas" New Yorkin patsas.
  ME-maakyltit on jo tarkistettu puhtaiksi (v470-geometria).
- **Kohta 5 kiinni:** menovinkkikuvat valmiit (v486–v492). Opus 1
  sai jonon viimeisen Eurooppa-erän (rajatapaukset + loput
  duplikaatit; 3/17 tehty v489:ssä).
- **Sonnet 2** jatkaa erää 10 (Sofia, Bukarest, Sarajevo) uudessa
  kontissa; ohjeena välicommit joka kaupungin jälkeen.
- Valmiuslistasta auki enää: 7 (erät 10–13), 8b (kokoava koko
  Euroopan QA), 9 (Fablen läpipelaus + ilmoitus omistajalle).

### Yövahtikierros 6 (klo ~5.25): raportointi siirretty gitiin

- Tunnin saldo mainissa: v493 (Tallinnan JA Riian muurit + Opus 2:n
  löytämä ja korjaama kujabugi), v494 (12 valokuvarajatapausta
  tunnistettaviksi), v495 (erä 10: Sofia/Bukarest/Sarajevo — Sonnet 2
  hoiti myös uuden versiokollision itse), v496 (8 duplikaattia).
- **Settings-korjaus EI purrut:** Sonnet 2 jumittui uudessakin
  kontissa UUID-aliaksen create_trigger-kyselyyn — CCR:n lupaportti
  ei ilmeisesti lue repo-settingsiä MCP-työkaluille. PYSYVÄ RATKAISU:
  koko tiimi raportoi loppuyön VAIN gitillä (docs/viesti-fable.md
  omalle haaralle + push), create_trigger kielletty. Fable lukee
  haarat ja get_session-tilat joka kierroksella.
- Opus 1 pyysi päätöstä 4 duplikaattirajatapauksesta → päätös
  annettu (sama tiedosto → vaihda vähemmän olennainen; maastokuvat →
  vaihda vain jos hyvä löytyy ~20 min sisällä, muuten kirjaa
  hyväksytyksi). Sen jälkeen Eurooppa on Opus 1:n osalta valmis.
- Sonnet 2 kierrätetty (3. kerta — jumit, ei sen vika) → erä 11
  käyntiin. Opus 2 siististi valmiudessa (Tallinna+Riika tehty).
- Valmiuslista: auki 7 (erät 11–13), 8b (kokoava QA), 9 (läpipelaus
  + ilmoitus).

### Yövahtikierros 7 (klo ~6.25): Opus 1:n Eurooppa valmis

- **Git-raportointi toimii:** Opus 1:n ja Opus 2:n raportit luettu
  haaroilta. Opus 1: EUROOPPA OSALTAAN VALMIS (v494/v496/v497 — 12
  valokuvarajatapausta, 16/17 duplikaattia vaihdettu, 2 hyväksytty
  Fablen päätöksellä; testit 570/0). Opus 2: kujabugin juurisyy oli
  oma KADUT-taulubugi (service-tiet vuotivat kaikkiin kaupunkeihin),
  todistettu nelinkertaisella pikselivertailulla (0,00 % / 0,20 %) —
  Tallinnan JA Riian muurit mainissa (v493).
- **Sonnet 2:n kontti jäi käynnistymättä** (PENDING 55 min ilman
  aktiviteettia kierrätyksen jälkeen) → kierrätetty uudelleen ja erä
  11 käynnistetty tuoreella triggerillä. Erä 11:stä ei menetetty
  työtä (ei ehtinyt alkaa).
- **Opus 1 aloittaa ME-aihesivut:** ARE-pilotti ensin, palaute ennen
  muita maita (omistajan linjaus: Euroopan jälkeen suoraan Lähi-itä).
- Huomio: orpo haara claude/zoom-synkka ilmestyi (9 pv vanhoja
  committeja, ei yhteistä pohjaa mainin kanssa) — ei kosketa, mainitaan
  aamuraportissa omistajalle.
- Valmiuslista: auki 7 (erät 11–13), 8b (kokoava QA), 9 (läpipelaus).
  Ydinpeli + lehdet + kartat + luennat ovat valmiit ja QA:ttu;
  aamuraportti kertoo tarkan tilanteen vaikka jutturerät olisivat
  vielä kesken.

### Aamukierros (klo ~8.40): v500 mainissa, ME-erä A valmis

- Omistaja heräsi ja testipelasi: kolme korjausta aamupäivän aikana —
  v499/v500 (luettu kohtaaminen ensitehtäväksi — juurisyy jäljitetty
  äänipolku instrumentoituna; nähtävyyskaruselliin lehden selaus;
  hampurilaisvalikko popupiin). Kaikki Playwright-tarkistettu.
- Opus 1:n ME-erä A mainissa (v499: ARE 3. sivu + Jordanian Vedet ja
  Rauniot) — jatkaa erään B ilman eri lupaa. Sonnet 2:n erä 11
  workflow käynnissä. Opus 2 ja Sonnet 1 valmiudessa.
- Orpo zoom-synkka-haara: omistaja käski poistaa; git-proxy esti
  poistopushin, GitHub-työkaluissa ei poistoa → omistaja poistaa
  itse UI:sta (kerrottu).
- Ei jumeja. Kaikki kontit kierrätetty yön aikana vähintään kerran.

## Valokuvapulma tilattu (omistaja 10.8. aamu)

Omistaja tarkensi "uudet pelit" -pyyntönsä: se on parkissa ollut
pulmien laatuloikka. NIMI SOVITTU: **valokuvapulma** (vaihtoehdot
oikeita valokuvia, ks. docs/mantereen-resepti.md sanasto). Fable
tekee Ateenan pylväspulmasta pilotin HETI: pylväskuvat on jo haettu
ja karsittu scratchpadiin aiemmin (dor/ion/cor-sarjat) — lisenssit
varmistetaan, kuvat peiliin, quiz-vaihtoehtoihin kuvatuki, testit,
Playwright, julkaisu. Monistus muihin pulmiin omistajan hyväksynnän
jälkeen.

## Iltakierros 10.8. — vaiheet kirjattu tilinvaihtoa varten

- **v503 valokuvapulma mainissa** (#734): Ateenan pylväspulman
  vaihtoehdot oikeina kuvina (4. kuva karyatidi-harhautus, ei
  koskaan oikea). Tekniikka: generate palauttaa options + kuvat
  rinnakkain, openPuzzle sekoittaa samalla orderilla, ui syncOptions
  lisää .kuvallinen-nappiin img:n, .quiz-kuvalahteet CC-rivi.
- **#735 Pelit-välilehti työhuoneeseen:** js/tyohuone-pelit.js =
  tutki kätkö -pelien katalogi (12 nykyistä + 8 ehdotusta
  tarinasynkkoineen). Kattonimi "tutki kätkö -pelit" = kaikki mitä
  Etsi kätkö -napin takaa voi paljastua. Suositus omistajalle
  annettu: aloituspari paripeli + karttapulma. HUOM nimikollisio:
  tyohuone.html importtaa `PELIT as KATKOPELIT`.
- **v505** (#737): nähtävyyspopup irti alareunasta (0,6 rem rako,
  korvaa 8.8. pohja-ankkurin) + täysikoon kuvakatselimeen lehden
  selaus (galleriaTila karusellista, pyyhkäisy, ohitaSulku-lipun
  nollaus eleen alussa — kosketuksella pyyhkäisy ei tuota clickiä).
- **v506** (#738): kohtaaminen ensin joka kaupungissa — ks. TILANNE
  NYT. Juurisyy omistajan Ateena-raporttiin: kaari vaati laatan
  (tokenHere), laatattomat putosivat vanhaan kertatutkimiseen; ja
  Tutki-nappi katosi tehtävien mukana → lehteen ei päässyt.
  Muutetut: game.js actionQuiz (kaari ennen pulmaa, explore-lippu),
  tehtavaTarjolla() uusi apuri, travelModes; ui.js renderTravelChoice
  (Tutki aina), openArrival (Tapaa X + piilotus),
  paivitaTutkiAlapalkki; tarinakaari.js kutsumanimi();
  tyohuone-kehitys-data.js (nimi: Elias/Bilal). +6 testiä
  (rules.test.mjs), yht. 576.
- **Testireseptit scratchpadissa** (eivät säily tilinvaihdossa —
  reseptit myös docs/mantereen-resepti.md:ssä): Playwright-ajossa
  ?lauta=europe MYKISTÄÄ äänet tarkoituksella → ohitus
  `(await import('/js/sound.js')).sfx.enabled = true`; luennat
  todennetaan Audio-konstruktorin instrumentoinnilla; quiz
  suljetaan #quiz-continue-napilla (näkyy vasta paljastuksen
  kirjoituttua; painallus voi osua doActionin busy-ikkunaan →
  paina uudelleen); vuoro voi päättyä tapahtumakorttiin
  (#event-ok kuitattava).
- Sonnet 2:n erä 12 tuli mainiin v504:nä kesken Fablen julkaisun
  (versiokollisio nro 5 — ratkaisu kuten aina: merge origin/main +
  uusi-versio uudelleen).

### Vahtikierros klo ~08:25Z: LUOVUTUSKUNTO SAAVUTETTU

- **Main: v511** (Kuwait, #745 — Opus 1 hoiti v510-versiokollision
  itse kaavalla). Kaikki neljä sessiota ovat pysähtyneet omistajan
  ohjeen mukaisesti ja KAIKKI luovutusdokumentit ovat mainissa:
  opus1-tilanne.md (+ tekijämerkintöjen tarkistin), opus2-tilanne.md,
  sonnet-tilanne.md, sonnet2-tilanne.md ja tämä tiedosto.
- ME-erä C on siis valmis (Egypti v507 + Kuwait v511). Uuden tilin
  jonot: kokoava koko Euroopan QA + Fablen läpipelaus (valmiusportin
  kohdat 8b–9), Opus-tyypille ME-erä D (Saudi-Arabia ILMAN pyhiä
  kaupunkeja + Bahrain), karttasessiolle ME-maakartat
  (Dubai-pilotti), QA:lle 6 kuvaduplikaatin siivous.
- Ei jumeja, ei uusia eriä, ei kierrätyksiä. Yövahti-cron
  (trig_01XuRjdzwJ9VGjzFjCBj5XYN) jää tälle tilille — poistetaan
  tilinvaihdon yhteydessä delete_triggerillä.

### Vahtikierros klo ~07:40Z: pysäytyskirjaukset koossa

- Kaikki neljä vastasivat pysäytysohjeeseen: Sonnet 2:n
  luovutusdokumentti mainissa (#744), Sonnet 1:n ja Opus 2:n
  luovutusdokumentit nostettu mainiin haaroiltaan tällä kierroksella.
  Opus 1 viimeisteli erän C loppuun (Egypti v507 + Kuwait) ja vahtii
  itse PR #745:n CI:tä — mergeää vihreänä ja kirjaa sitten oman
  luovutusdokumenttinsa. Sen jälkeen KAIKKI sessiot ovat valmiudessa.
- Uusia eriä EI jaettu (omistajan pysäytysohje voittaa yövahdin
  vanhat jonot). Ei jumeja, ei kierrätystarvetta.
- Tiimin tilannedokumentit uudelle tilille: docs/opus1-tilanne.md
  (päivittyy #745:n myötä), docs/opus2-tilanne.md,
  docs/sonnet-tilanne.md, docs/sonnet2-tilanne.md + tämä tiedosto.

### v510: fromJSON-sudenkuoppa (TÄRKEÄ OPPI UUSILLE KENTILLE)

Omistajan "Tutki-nappi ei tee mitään" -vika: **Game.fromJSON ohittaa
konstruktorin (Object.create)** — jokainen konstruktorissa alustettu
UUSI kenttä on alustettava MYÖS fromJSONissa, vaikka sitä ei
tallennettaisi ("ei tallenneta" ≠ "ei ole olemassa"). v509:n
kaariYritykset puuttui palautetusta pelistä → travelModes ja
openArrival kaatuivat TypeErroriin → render jäi vanhaan tilaan ja
napit kuolivat hiljaa. Sama vika oli piilevänä jo v499:n
kaariKaytetty-Setissä. Korjaus v510: alustus fromJSONissa + ??=
-varmistus kaariTilanteessa + regressiotesti (tallenna→palauta→
travelModes/actionQuiz kaarikaupungissa). Peli TALLENTUU JATKUVASTI
— testaa uudet pelitilakentät aina myös palautuspolulla.

### v507 (10.8. aamupäivä): kohtaamisen v2-säännöt

Omistajan testipalaute Ateenasta (laatatön kohtaaminen antoi vain
rahapalkinnon; lehteen ilmestyi vanha kertatutkimis-"Etsi kätkö";
+ uudet napin ja ajastuksen säännöt). Toteutettu:

- **Aarre laatattomasta kohtaamisesta:** oikea vastaus →
  "Kätkö löytyi! +50 puntaa." + kaaren aarreteksti + aarreluenta
  (ui.js quiz-result explore+kaari-haara; playDiaryVoice
  puhe-kaari-aarre). Laatallisessa reveal-polku ennallaan.
- **Kertatutkiminen POISTETTU kaarikaupungeista** (canExplore
  palauttaa false jos TARINAKAARI-kysymys on olemassa kaarilaudalla)
  — kaarettomat laudat (Afrikka, Aasia…) ennallaan.
- **Kohtaamisen uusintayritys:** kaariYritykset-Map (pack:city →
  {yritykset, onnistui}; KAARI_YRITYKSET=2; yritys kirjataan
  AVATTAESSA, onnistuminen vastattaessa; ei tallenneta).
  Nappitilat (ui.js tehtavaNapinTila + paivitaTehtavaNappi):
  odottaa → "Tapaa Nikos"; 1 epäonnistuminen → "Viimeinen
  mahdollisuus tavata"; pulma/laatta → "Etsi kätkö"; onnistui →
  HARMAA sama teksti (disabled + .tehtava-pois); 2 epäonnistumista
  → HARMAA "X ei tavattavissa". Kaariton lauta: piilotus kuten
  v506.
- **Aloita peli -portti (#quiz-aloita):** kohtaamisen tervehdyksen
  jälkeen kysymys, vaihtoehdot ja tiimalasi tulevat vasta napista —
  kertojan luenta ei syö vastausaikaa. Botti ohittaa portin.
- Testit 577/0 (uusintayritys- ja onnistumistestit); Playwright:
  Ateena (portti+aarre+pulma toisena), Amsterdam (harmaa
  onnistuminen), Dublin (viimeinen mahdollisuus → ei tavattavissa).

### Vahtikierros klo 06:40Z (9.40): ei jumeja, ei jaettavaa

- Raportit luettu haaroilta: Sonnet 2 erä 12 valmis → erä 13 työn
  alla (workflow käynnissä, get_session 06:34Z); Opus 1 erä B
  (Oman+Qatar v501) valmis → erä C (Egypti+Kuwait) työn alla
  (RUNNING 06:40Z — katsoo ensin mitä Egyptillä jo on, ei
  päällekkäistä). Opus 2 ja Sonnet 1 valmiudessa. Ei jumeja,
  kaikki kontit kierrätetty yön aikana — ei uusia kierrätyksiä.
- KIRJATTU JONOON: Opus 1 raportoi 6 kuvaduplikaattia
  (mm. Baščaršija.jpg ja Latin Bridge kahdessa paikassa,
  syntyneet nähtävyysjuttuerissä) — siivotaan kokoavan QA:n
  yhteydessä tai omana pikkueränä erä 13:n jälkeen.
- Tilannetaulu päivitetty (v503–v506 + erätilat).
