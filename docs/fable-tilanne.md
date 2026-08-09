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

## Julkaisumekaniikka (törmäyksiä tulee jatkuvasti)

- Main on **v436** (`matkakirja-2026-08-09.436`). Versiot `2026-08-09.NNN`.
  Tuoreimmat: Opus 1:n neljä maalehteä + Helsinki/Suomi-siirto (v435, #599),
  Sonnet 2:n Ateena/Amsterdam/Dublin-nähtävyysjutut (v436, #624; korvasi
  vanhentuneen #611:n). `git fetch origin main` silti aina ennen numeroa.
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

## Avoin lupaa vailla

- Älä lähetä triggereitä, julkaise tai mergeä ilman omistajan lupaa —
  hän ohjaa tahdin. (Vanhat avoimet PR:t #611/#599 on jo hoidettu:
  #599 merged, #611 korvattu #624:llä ja suljettu.)
