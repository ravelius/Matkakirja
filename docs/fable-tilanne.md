# Fablen tilannekuva — jatka tästä /clearin jälkeen

*Käsittelykuva, jotta työ jatkuu kontekstin nollauksen yli. Lue tämä
ENSIN, sitten `CLAUDE.md`, `docs/roolitus.md`, `docs/isoisan-raamattu.md`,
`docs/kaari-luonnos.md` ja `js/tyohuone-tilanne.js`.*

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
7. [ ] Nähtävyysjutut kohdekartallisiin kaupunkeihin: erä 9 (Rooma,
       Krakova, Varsova, Tallinna — työn alla), erä 10 (Sofia,
       Bukarest, Sarajevo), erä 11 (Kiova, Pietari, Moskova, Odessa)
       — Sonnet 2. LISÄYS kierroksella 3: erät 12–13 kuudelle
       uudelle karttakaupungille (Tromssa, Dubrovnik, Riika, Vilna,
       Oslo, Kööpenhamina) — "kaikilta osin" kattaa nämäkin;
       kohteet avautuvat wiki-varapolulla siihen asti.
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
