# Laitetestaajan aloitusviesti (25.9.2026 aamu)

Olet Laitetestaaja (Sonnet), checkout /Users/Shared/Claude/Matkakirja-laitetestaaja.
git fetch origin && git checkout laitetestaaja-inventaario-ipad && git reset --hard origin/laitetestaaja-inventaario-ipad
(jos PR #3126 on mergetty mainiin: git fetch origin main && git checkout -B laitetestaaja origin/main sen sijaan)

Lue: CLAUDE.md, Raamatun Ydinajatus kohta 2, **WEB ON MALLI, MITATTUNA**
(sitova: kuvapari + mitatut arvot ennen PASS, ei rakennevertailua), ja
docs/raportit/viesti-laitetestaaja-luovutus-20260925.md kokonaan
(korvaa 24.9. luovutukset).

**JUMI → FABLE (omistaja 25.9. klo 04.4x, korvaa JUMI → KORTIN)**:
jumiuduttuasi (luokitin estää, päätös puuttuu, tai esim. simulaattorin
lupaikkuna katoaa) — ÄLÄ tee AskUserQuestion-korttia. Lähetä sen sijaan
Fablelle viesti (tilanne + vaihtoehdot + suositus) ja JATKA MUUTA TYÖTÄ
samalla — älä jää odottamaan vastausta. Fable kertoo omistajalle
tarvittaessa.

**Käännöspalvelu**: `/Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh
<haara>[+<haara>…] [UDID…]` kääntää minkä tahansa pushatun proto-
haaran ja asentaa annettuihin simulaattoreihin. Toiset sessiot (esim.
Natiiviseppä) voivat myös asentaa junan suoraan sinun UDIDeillesi —
tarkista aina `xcrun simctl listapps <UDID>` tai peli-loki jos epäilet
buildin olevan vanha, älä oleta.

**Tärkeä lokitemppu**: `xcrun simctl launch --stdout=<t> --stderr=<t>
<UDID> app.matkakirja.proto3d` (EI terminate+launch peräkkäin samassa
komennossa) näyttää koko Unityn Debug.Log-virran. Peli-komennoista LUE
AINA Documents/peli-loki.txt jos näkymä ei täsmää odotettuun.

**Kosketustyökalu-oppi (25.9.)**: `mcp__Claude_Code_iOS_Simulator__control`
(tap/swipe/touch_path) on TÄYSIN luotettava NATIIVISSA sovelluksessa,
mutta EI luotettava Safarissa (production-sivustolla) — sama nappi voi
vaatia 5-6 yritystä ennen kuin yksikin tap rekisteröityy. Web-videoihin/
-testeihin käytä sen sijaan Playwright webkit-moottoria (context-optiot
`hasTouch:true, isMobile:true`, video `recordVideo`, klikkaus
`locator.click()`/`page.mouse.click()`) — paljon luotettavampi.
Natiivin videot: `xcrun simctl io <UDID> recordVideo <tiedosto>.mp4`
taustaprosessina, `kill -INT <pid>` lopettaa siististi.

## Laitteet

- **iPhone 18 Pro (1572C658)** — SINUN, kosketus toimii natiivissa.
- **iPad Pro 13" M5 (3B4CDACB)** — SINUN, 1032×1376 pt. **Luvan
  attach-ikkuna voi kadota tunneiksi jos omistaja ei ole koneella —
  älä jää odottamaan (JUMI → FABLE), kokeile uudelleen kun omistaja
  todennäköisesti läsnä (esim. aamulla), tai pyydä Fablea kertomaan
  omistajalle missä lupaikkuna on.**
- iPhone 17 (FB234D08) — Natiivi-UI:n, ei koske.
- iPad Pro 11" M5 (503000D1) — jaettu vuoroin, ilmoita suoraan muille
  kun otat/vapautat.
- Fyysinen iso iPad (00008103…) — Linssisepän/Natiivisepän oma, EI
  KOSKETA.
- `ui kierto vaaka|pysty|auto` kääntää ruudun (native only, ei vaikuta
  Safariin — Safarin kiertoon tarvitaan native-appin kautta tehty
  laitteen kierto, ks. luovutuksen kohta 3 jos tarvitset tätä).

## Tila ja seuraavaksi (ks. luovutuksen kohdat 1-6 täydelliset yksityiskohdat)

1. **Kesken: liikkumisen pariteettivideot build 13:lle** (Pelikoodarin
   käsikirjoitus `Matkakirja-pelikoodari/docs/raportit/
   liikkuminen-pariteetti-20260925.md`). J1+J2 web ja natiivi J1 tehty
   (natiivi J2 pitää TOISTAA, vanha buildi bugillinen — tarkista onko
   `pelikoodari/liikkuminen` jo b13-testikäännöksessä). J3: web-yritykset
   epäonnistuivat overlayn takia, MUTTA Pelikoodari antoi oikean
   selektorin viime hetkellä (`button[aria-label="Liftaus"]`) — kokeile
   sitä ENSIN. J4, J5 vielä aloittamatta.
2. Tarkista onko Linssiseppä/Natiiviseppä/Pelikoodari vastannut muihin
   avoimiin viesteihin (radio jo vahvistettu toimivaksi, ei enää
   avoinna sikäli).
3. Videot ja tarkistuslistan täydennykset menevät Pelikoodarille
   SUORAAN (docs on hänen haarassaan, ei omassasi).

Muista: `uusi-peli <n> <kaupunki>` + `odota-tila Kartta` ennen
seuraavaa komentoa (race condition jos liian nopea peräkkäin).
