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
- **TV-napit on POISTETTU pelistä kokonaan (v434, omistajan päätös
  9.8.).** Poistettu koodista, tyyleistä, muutoslokista, tilannetaulusta
  ja worker-ohjeesta. **ÄLÄ lisää niitä takaisin äläkä käynnistä mitään
  tv-/videostriimiselvitystä.** Radio, uutisotsikot ja käännös jäävät
  ennalleen. Jos "maan tunnelmaa" halutaan lisää, ainoa hyväksytty tapa
  on Commonsin vapaat (PD/CC) tunnelmavideot.
- **HUOM PR #599 (Opus 1):** siihen on niputettu Kreikan tv-nappi, joka
  on nyt kielletty. Ennen mergeä tv-osa on RIISUTTAVA PR:stä — vain
  Turkin/Irlannin maalehden aihesivut jäävät.
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

## Julkaisumekaniikka (törmäyksiä tulee jatkuvasti)

- Main on **v431** (`matkakirja-2026-08-09.431`). Versiot `2026-08-09.NNN`.
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
  `Claude-Session: https://claude.ai/code/<oman sessiosi id>` (käytä
  OMAN sessiosi tunnusta — tämä on uusi sessio, ei entinen).

## SEURAAVA ISO TEHTÄVÄ — 5 kaupunkia, KOKO tekstipaketti (omistajan tilaus)

Tee viisi kaupunkia isoisä-kaarena työhuoneeseen, mutta nyt **koko
tekstipaketti kerralla suunniteltuna**. Yhdelle kaupungille kuuluu:

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

## Tiimin tila (ks. myös js/tyohuone-tilanne.js)

- **Opus 1:** vaihe B (lehtitasapaino, `docs/lehtitasapaino.md`) käynnissä.
  Päätökset: Helsinki/Suomi ensin; Madrid Urheilu + Venetsia Käsityö
  SÄILYTETÄÄN; Lontoo luonto→Britannia + nykytaide 6→4; valokuvien
  rajatapaukset KORJATAAN KAIKKI. v420 valokuva-auditti tehty.
- **Opus 2:** kohdekartat 24/31 (v430 Rooma/Krakova/Varsova/Tallinna).
  Jäljellä 7: Kiova, Pietari, Moskova, Sofia, Bukarest, Sarajevo, Odessa.
  Merentäyttö 3 varianttia (nauha/vesipuoli/maapuoli). Istanbul = 2
  maanosaa.
- **Sonnet 2:** nähtävyysjutut. Live: mm. Praha/Wien/Budapest/Pariisi
  (v426) ja **Helsinki (v431, #604) — LIVE, "Helsinki valmis" kerrottu
  omistajalle**. Ateena/Amsterdam/Dublin valmis PR #611 (odottaa mergeä).
  Seuraavaksi Opus 2:n uudet kartat.
  - **Wiki-ansat Sonnet 2:lle** myöhempiin juttuihin: fi-wiki
    "Neitsyttorni" = Bakun torni (Istanbulin = Kız Kulesi); fi-wiki
    "Belém" = Brasilian kaupunki (Lissabonin = kaupunginosa).
- **Sonnet 1:** loppu-QA-brief kesken.

## Avoin lupaa vailla (omistaja sanoi "Pysähdy")

- **PR #611** (Ateena/Amsterdam/Dublin nähtävyysjutut, v432) odottaa
  mergeä — kysy lupa ennen ajoa.
- Älä lähetä triggereitä, julkaise tai mergeä ilman uutta lupaa.
