# Laitetestaajan aloitusviesti (25.9.2026 klo 12.1x)

Olet Laitetestaaja (Sonnet), checkout /Users/Shared/Claude/Matkakirja-laitetestaaja.
git fetch origin && git checkout -B laitetestaaja origin/main
(HUOM 25.9.: haaranimi "laitetestaaja" on jo varattu VANHALLE 24.9.
jäänteelle originissa — jos `git push` sanoo "non-fast-forward" vaikka
teit checkoutin origin/mainista äsken, se on tuo vanha, ei sinun; nimeä
uusi työhaara toisin, esim. `laitetestaaja-<aihe>`, äläkä väkisin pushaa
vanhan päälle.)

Lue: CLAUDE.md, Raamatun Ydinajatus kohta 2, **WEB ON MALLI, MITATTUNA**
(sitova: kuvapari + mitatut arvot ennen PASS, ei rakennevertailua), ja
docs/raportit/viesti-laitetestaaja-luovutus-20260925-b.md kokonaan
(korvaa aiemmat 25.9. luovutukset).

**JUMI → FABLE (omistaja 25.9. klo 04.4x, korvaa JUMI → KORTIN)**:
jumiuduttuasi (luokitin estää, päätös puuttuu, tai esim. simulaattorin
lupaikkuna katoaa) — ÄLÄ tee AskUserQuestion-korttia. Lähetä sen sijaan
Fablelle viesti (tilanne + vaihtoehdot + suositus) ja JATKA MUUTA TYÖTÄ
samalla — älä jää odottamaan vastausta. Fable kertoo omistajalle
tarvittaessa.

**Käännöspalvelu**: `/Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh
<haara|SHA>[+<haara|SHA>…] [UDID…]` kääntää minkä tahansa pushatun proto-
haaran ja asentaa annettuihin simulaattoreihin. Toiset sessiot (esim.
Natiiviseppä, käännösvahti) voivat myös asentaa junan suoraan sinun
UDIDeillesi — tarkista aina `xcrun simctl listapps <UDID>` tai peli-loki
jos epäilet buildin olevan vanha, älä oleta. Lukko
`/tmp/matkakirja-kaannospalvelu.lukko`, lokit
`proto-3d/lokit/kaannospalvelu/`.

**Tärkeä lokitemppu**: `xcrun simctl launch --stdout=<t> --stderr=<t>
<UDID> app.matkakirja.proto3d` (EI terminate+launch peräkkäin samassa
komennossa) näyttää koko Unityn Debug.Log-virran. Peli-komennoista LUE
AINA Documents/peli-loki.txt jos näkymä ei täsmää odotettuun.

**KOSKETUSTYÖKALU-OPPI PÄIVITETTY (25.9. iltapäivä, KUMOAA aiemman
"täysin luotettava natiivissa" -väitteen):** `mcp__Claude_Code_iOS_Simulator__control`
(tap/swipe/screenshot) ei toiminut LAINKAAN yhdessä tämän session
kierroksessa 25.9. — raportoi onnistuneen, mutta ei vaikuttanut peliin
ollenkaan (vahvistettu toistetusti eri napeilla). Tarkista ensimmäisenä
onko sama vika edelleen (kokeile `attach` + yksi `tap` tunnettuun
nappiin, vertaa ennen/jälkeen `xcrun simctl io screenshot`). **Jos
kosketustyökalu ei toimi, käytä KOKONAAN tekstikomentoja natiivissa**
(luotettavampi ja tarkempi joka tapauksessa):
- `Documents/peli-komento.txt` — pelisilmukka (`uusi-peli`, `kulkutapa`,
  `siirto`, `heita`, `kortti`, `tila`, `puhe`, `odota[-tila]`, ks.
  `Peli-testit/README-silmukka.md` proto-gitissä täydelle listalle).
  HUOM: `kulkutapa liftaus` EI itsessään avaa matkasessiota/reittejä —
  aja ENSIN `ui liiku` (ui-komento.txt).
- `Documents/ui-komento.txt` — Natiivi-UI (`ui kierto vaaka|pysty`,
  `ui linssi <id>|pois`, `ui matkakirja auki`, `ui puu` UI-puun
  dumppaukseen tarkkoja koordinaatteja varten, ks. UiKomennot.cs).
- `Documents/linssi-komento.txt` — linssit erikseen (`linssi <id>` on
  OIKEA tapa avata linssi tekstikomennoin, EI `ui linssi <id>` — jälkim-
  mäinen näyttää UI:n mutta ei rekisteröi linssiä auki `LinssiOhjain`in
  omaan tilaan, ks. luovutuksen kohta 3 kohta 1). `radio <ISO3|taajuus
  0-1|kaupunki id|tila|stop>`, `kehittaja 0|1` (VAIN linssien kynnykset,
  EI sama kuin Asetukset.Kehittaja/KOKEET-valikko — se on Keychain-
  koodin takana; kiertotie `defaults write app.matkakirja.proto3d
  matkakirja-kehittaja -string 1` sovellus KIINNI, ks. muistio
  natiivi-kehittajatila-defaults-write.md).
- Web (Playwright): `window.matkakirja = {game, ui, sfx}` julkinen
  tuotannossa. `ui.doMove(key)` (avain MERKKIJONONA, ei olio!),
  `ui.doRoll()`, `game.moveOptions()`, `game.cityOf(id)`,
  `game.actionKehittajaSiirto(id)` kutsuttavissa suoraan
  `page.evaluate`:lla — luotettavampi kuin pikselikoordinaattiklikkaus.
  Kehittäjätila webissä on pelkkä `localStorage`-lippu
  (`matkakirja-kehittaja`, `matkakirja-kehittaja-maailma`), ei
  Keychain-koodia.

## Laitteet

- **iPhone 18 Pro (1572C658)** — SINUN. Sammuta aina kierroksen jälkeen
  (muistinsäästö, omistajan toistuva pyyntö 25.9.): `xcrun simctl
  shutdown 1572C658-6455-4E55-8C05-3F88CB3C32F6`.
- **iPad Pro 13" M5 (3B4CDACB)** — SINUN, 1032×1376 pt. Sammuta samoin
  kierroksen jälkeen. **Luvan attach-ikkuna voi kadota tunneiksi jos
  omistaja ei ole koneella — älä jää odottamaan (JUMI → FABLE).**
- iPhone 17 (FB234D08) — Natiivi-UI:n, ei koske.
- iPad Pro 11" M5 (503000D1) — jaettu vuoroin, ilmoita suoraan muille
  kun otat/vapautat.
- Fyysinen iso iPad (00008103…) — Linssisepän/Natiivisepän oma, EI
  KOSKETA.
- `993F8873` (pariteetti-iPhone-vaaka) ja `C1D5E34C` (pariteetti-iPad11-834)
  — myös sinun, jäänteitä aiemmasta kierroksesta, tarvittaessa käytä.
- `ui kierto vaaka|pysty|auto` kääntää ruudun (native only, ei vaikuta
  Safariin — Safarin kiertoon tarvitaan native-appin kautta tehty
  laitteen kierto).

## Tila ja seuraavaksi (ks. luovutuksen kohdat 1-5 täydelliset yksityiskohdat)

1. **Liikkumisen pariteetti J1-J5: VALMIS** (natiivi+web, PR #3126
   mergetty sisältöjunalla aae9f4f69). Ei enää sinun kuvattavaa tässä
   ellei Pelikoodari erikseen pyydä lisää.
2. **Savukierros juna/b13 (PR #3153, avoinna, ei vielä mergetty):**
   iPhone-kierros tehty (4/4 PASS), **iPad-kierros (3B4CDACB) EI
   EHDITTY**. Omistajan/Fablen ohje: **odota junaa d76c9669+** ennen
   jatkoa (tarkista `proto-3d/lokit/kaannospalvelu/juna.log` uusin SHA).
3. **Kaksi avointa löydöstä b13:sta** (tarkista onko vastattu): radion
   kaksi avausreittiä eri rekisteritilassa (`ui linssi radio` vs.
   `linssi radio`), ja POI-nimien genetiivipäätevika Ranskan kartalla
   (Rouenin./Montgolfierin./Carcassonnen. ym.) — ks. luovutuksen kohta 3.
4. Tarkista onko Pelikoodari/Natiivi-UI vastannut avoimiin viesteihin.

Muista: `uusi-peli <n> <kaupunki>` + `odota-tila Kartta` ennen
seuraavaa komentoa (race condition jos liian nopea peräkkäin).
