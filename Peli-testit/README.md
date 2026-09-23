# Pelilogiikka (Pelikoodari, haara pelikoodari/pelilogiikka)

Verkkopelin js/rules.js ja js/game.js (matkustus, raha, aika) puhtaana C# 9:nä.

- `Assets/Matkakirja/Peli/` — asmdef **Matkakirja.Peli** (`noEngineReferences`, autoReferenced):
  Sopimukset (rajapinnat IReittiverkko, IKamera, ILehti), MiniJson, SisaltoTuonti,
  Satunnainen (mulberry32), Reittiverkko, Pelitila, Matka, LehtiOsoite; erä 2: Kysymysdata
  (kysymykset, tarinakaari, paikkatiedot paketista), Kysely (kysymysmoottori, js/game.js
  actionQuiz…closeQuiz) ja Kokemus (tietäjäpisteet, -tasot, tietoprosentti).
- `Assets/Matkakirja/Scripts/Peli/LehtiKuori.cs` — ILehti-toteutus (GameObject `MatkakirjaLehti`).
- `Assets/Plugins/iOS/MatkakirjaLehti.mm` — WKWebView-liitännäinen, ks. README-lehti.md.
- `Assets/Matkakirja/Editor/LehtiKuoriXcode.cs` — WebKit.framework linkitys Xcode-vientiin.
- `Peli-testit/` (Unityn ulkopuolella): `./kaanna.sh` kääntää Peli-kansion + testit Unityn
  mukana tulevalla dotnetilla ja csc:llä ilman editoria ja ajaa ne. Kultaiset vertailut
  tuotetaan verkkopelistä: `node Kultaiset/tee-kultaiset.mjs`, `node Kultaiset/tee-matkajalki.mjs`
  ja `node Kultaiset/tee-kysymysjalki.mjs` (kysymysjälki + testiaineisto liput.json)
  (vaativat verkkopelin checkoutin /Users/Shared/Claude/Matkakirja-pelikoodari).

`.meta`-tiedostot eivät ole mukana: Unity luo ne ensimmäisessä tuonnissa (3D-selvittäjän editori).
