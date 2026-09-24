# 3D-selvittäjän luovutus 23.9.2026 klo 10.53 (Suomen aika, EEST)

Luovuttaja: 3D-selvittäjä (Opus 5.5, tilapäinen selvityssessio, Macin käyttäjä koodaus).
Vastaanottaja: seuraava 3D-selvittäjä tai Fable. Syy: omistaja vaihtaa toiselle Claude-tilille.
Edellistä luovutusta ei ole (ensimmäinen vuoro).

## Lue ensin

1. `CLAUDE.md` (agenttisääntö: ali-agentit vain Opus/Sonnet).
2. Raamattu `js/tyohuone-raamattu.js`, vain Ydinajatus-osion kohta 2 "TYÖTAPA JA SESSIOT"
   (rivit ~42–100): viestit Fablelle enintään 8 riviä, vain valmis erä / jumi / kysymys.
3. Tehtävänanto: `docs/raportit/3d-selvitys-tehtavananto-20260923.md`.
4. Tämän vuoron raportit (alla), tärkein ensin: 3d-selvitys → 3d-google-laatat-eu →
   3d-unreal-vs-unity → 3d-prototyypin-valmius.

## Tila

- main = v2145 (3b5807bce, #2894); luovutushetken mainin kärki 99522e54d (#2899).
- Tässä vuorossa ei julkaistu versioita; kaikki PR:t olivat pelkkiä dokumentteja ilman versiota.

| PR | Haara | Sisältö | Tila |
|---|---|---|---|
| #2887 | selvittaja-3d | docs/raportit/3d-selvitys-20260923.md — moottorivertailu, suositus, 4 vk prototyyppisuunnitelma | mergetty |
| #2891 | selvittaja-3d-jatko | 3d-google-laatat-eu-20260923.md + 3d-unreal-vs-unity-20260923.md | mergetty |
| #2892 | selvittaja-3d-valmius | 3d-prototyypin-valmius-20260923.md — aloituksen tarkistuslista | mergetty |
| (tämä) | selvittaja-3d-luovutus | tämä luovutus + viesti-3d-selvittaja-aloitus.md | pushattu (ei PR:ää; Fable päättää) |

## Pushatut haarat ja avoimet PR:t

Vain `selvittaja-3d-luovutus` (tämä raportti). Muut haarat on mergetty; ne voi poistaa.
Worktree: `/Users/koodaus/wt-selvittaja-3d` (pohja origin/main). Ei muita worktreitä, ei
käynnissä olevia agentteja (kaikki viisi tutkimusagenttia valmistuivat, tulokset raporteissa).

## Kesken — tee nämä ensin

Ei keskeneräistä työtä. Selvitys odottaa omistajan moottoripäätöstä. Fablen ohje: ei uutta
työtä ennen päätöstä; ei asennuksia eikä koodia.

## Suositus lyhyesti

- **Unity 6.3 LTS + Cesium for Unity (URP), C#, puhdas natiivi iOS**, oma repo
  (esim. `Matkakirja-natiivi`). Godot 4.7 B-vaihtoehtona (paras tekoälysessioille, mutta
  laattamoottori itse). Unreal ja RealityKit eivät sovi.
- **Googlen fotorealistiset 3D-laatat eivät ole käytettävissä**: EU/ETA-projekteilta suljettu
  8.7.2025; omistajan vanha projekti ei auta, koska uusi iOS-peli on Googlen FAQ:n mukaan
  "material modification". Ainoa mahdollinen reitti on Cesium ion, jos Cesium vahvistaa
  kirjallisesti. Fotorealismi tehdään kohdekohtaisina 3D-malleina.
- Unrealin kuvanlaatuetu ei toteudu iPhonella (Epic: "Lumen currently does not work on
  iOS/tvOS/iPadOS devices").

## Odottaa omistajan päätöstä

1. **Moottori**: Unity (suositus) / Godot (B) / jatketaan webissä three.js:llä (halvin,
   mutta vastoin omistajan natiivilinjaa).
2. **Uusi repo natiiviversiolle** ja nimi; saako sen CI käyttää samaa Mac-runneria
   (suositus: kyllä, yksi työntekijä, ei omistajan mittausikkunoissa).
3. **Levytila**: Mac Studiolla 68 Gt vapaana — riittää alkuun; siivous tai ulkoinen levy
   pitkällä aikavälillä.
4. **Apple Developer -tili ja Xcode-kirjautuminen käyttäjälle koodaus** (0
   allekirjoitusidentiteettiä nyt) — tarvitaan laitteelle ja TestFlightiin.
5. **Cesium ion Community -tili** — vain jos kallistettu maastonäkymä halutaan prototyyppiin.
6. **Kysytäänkö Cesiumilta kirjallisesti** Googlen 3D-laattojen saatavuus EU-asiakkaalle
   julkisessa pelissä (suositus: vasta kun prototyyppi on hyväksytty).
7. Google Cloud Consolen tarkistus (lista raportissa 3d-google-laatat-eu, kohta 6) — vain
   luku, **ei API:n käyttöönottoa eikä ehtojen hyväksyntää**.

## Voimassa olevat työtavat

Raamattu Ydinajatus kohta 2 (roolit, viestit, lukusääntö). Tässä vuorossa ei muuttunut
mitään sääntöä. Tilapäinen sessio suljetaan tehtävän jälkeen (kohta 2 A).

## Julkaisukaava

Dokumentti-PR ilman versiota: `git fetch origin main` → haara origin/mainista →
`node --test tests/dokumentit.test.mjs` (3/3 pass) → commit (Co-Authored-By) → push →
`gh pr create --base main` → Julkaisija mergeää. Versioiden kaava: `docs/roolitus.md`
"Julkaisusäännöt".

## Ympäristö

- Kone: Mac Studio, käyttäjä koodaus; macOS 26.6.2, Xcode 27.0, 64 Gt RAM, Homebrew on,
  git-lfs puuttuu, Unity/Godot ei asennettu.
- Worktree `/Users/koodaus/wt-selvittaja-3d`. Älä käytä Pelikoodarin checkoutia
  (`/Users/samireivinen/Matkakirja-opus`) tai Fablen checkoutia.
- Ei avaimia, ajastuksia eikä triggereitä tässä roolissa.

## Velat ja opetukset

**Velat**
1. Remote Controlin kytkentä (`set_remote_control self true`) estettiin lupaluokittimessa;
   omistaja tai Fable kytkee.
2. Epävarmat luvut odottavat mittausta prototyypin viikolla 1: Unity + Cesium -sovelluksen
   koko, käynnistysaika, muisti ja fps iPhone 13–16:lla, Xcode 27 -yhteensopivuus.

**Opetukset**
- Googlen EU-rajoitus oli selvityksen ratkaisevin löydös, ja sen löysi vasta toinen
  tutkimusagentti; tarkista palvelujen alueellinen saatavuus aina ensimmäisenä.
- Agenttien arXiv-lukuja kannattaa todentaa itse: CraftBench-UE:n tiivistelmä antoi eri
  muotoiset luvut kuin agentti raportoi (käytetty tiivistelmän lukuja).
- Rinnakkaiset Opus-tutkimusagentit (3 + 2) olivat nopea tapa kattaa lähteet; kirjoitus
  ja tarkistus pääsessiossa.

## Aloitusviesti

Valmis aloitusviesti uudelle sessiolle: `docs/raportit/viesti-3d-selvittaja-aloitus.md`.
