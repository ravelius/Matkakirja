# Laitetestaajan aloitusviesti (24.9.2026 yö)

Olet Laitetestaaja (Sonnet), checkout /Users/Shared/Claude/Matkakirja-laitetestaaja.
git fetch origin && git checkout laitetestaaja-inventaario-ipad && git reset --hard origin/laitetestaaja-inventaario-ipad
(jos PR #3126 on mergetty mainiin: git fetch origin main && git checkout -B laitetestaaja origin/main sen sijaan)

Lue: CLAUDE.md, Raamatun Ydinajatus kohta 2 (FABLEN KÄSKYT ILMAN
OMISTAJAN VÄLITYSTÄ, JUMI → KORTTI), kohta NATIIVI PELI ETUSIJALLE,
**WEB ON MALLI, MITATTUNA (Raamattu 9ebc5784c, sitova)**, ja
docs/raportit/viesti-laitetestaaja-luovutus-20260924-yo.md kokonaan
(korvaa aiemmat luovutukset).

**SITOVA SÄÄNTÖ WEB ON MALLI, MITATTUNA**: älä hyväksy mitään natiivin
näkymää tai toimintoa PASS:ksi rakennevertailulla ("näyttää samalta").
Vaaditaan web–natiivi-kuvapari SAMASTA pelitilasta JA mitatut arvot
ennen hyväksyntää. Työkalut: tools/pariteetti-web-kuva.mjs,
tools/pariteetti-web-lehti.mjs (iPhone 393×852, iPad 834×1194).

**JUMI → KORTTI + PushNotification** (omistajan sitova sääntö):
jumiuduttuasi (luokitin estää, päätös puuttuu, työ ei etene) — AINA
AskUserQuestion-kortti omistajalle suoraan, älä jää odottamaan. Heti
kortin avattua kutsu myös PushNotification (status proactive):
"Laitetestaaja: kysymyskortti auki — <aihe>".

**Käännöspalvelu**: `/Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh
<haara>[+<haara>…] [UDID…]` kääntää minkä tahansa pushatun proto-
haaran ja asentaa annettuihin simulaattoreihin — EI TARVITSE PYYTÄÄ
Natiivisepältä testikäännöksiä, käytä omia/jaettuja simejä.

**Tärkeä lokitemppu**: `xcrun simctl launch --stdout=<t> --stderr=<t>
<UDID> app.matkakirja.proto3d` (EI terminate+launch peräkkäin samassa
komennossa) näyttää koko Unityn Debug.Log-virran — `simctl spawn log
show` EI näytä sitä täällä. Peli-komennoista LUE AINA
Documents/peli-loki.txt jos näkymä ei täsmää odotettuun, älä arvaa
ajoitusta.

## Laitteet (Fable kirjasi omistuksen Raamattuun 24.9. klo 20.4x)

- **iPhone 18 Pro (1572C658)** — SINUN, kosketus toimii.
- **iPad Pro 13" M5 (3B4CDACB)** — SINUN, 1032×1376 pt, kosketusta ei
  vielä testattu (vain komentotiedostoprotokolla).
- iPhone 17 (FB234D08) — Natiivi-UI:n, ei koske.
- iPad Pro 11" M5 (503000D1) — jaettu vuoroin.
- Fyysinen iso iPad (00008103…, eri App ID fi.matkakirja.peli.kehitys)
  — Linssisepän/Natiivisepän oma, EI KOSKETA.
- `ui kierto vaaka|pysty|auto` kääntää ruudun oikeasti (43b70aa) — ei
  tarvitse idb:tä.

## Tila

PR #3076 mergetty jo session aikana — jatkotyö on nyt PR:ssä **#3126**
(EI VIELÄ mergetty, tarkista tila ensin `gh pr view 3126`). Nappi-
inventaario 12/31 riviä käyty läpi. Pelikoodarin automaattinen
pariteetti-ajo (b12g) valmistui mutta sisälsi desync-bugin (rivi 39
näytti väärän linssin) — **ÄLÄ käytä b12g-1/raportti.md:n "SAMA
0/176" -lukua** ennen kuin Pelikoodari vahvistaa korjatun ajon.

## Seuraavaksi (järjestyksessä, ks. luovutuksen kohdat 2-4)

1. Tarkista onko PR #3126 mergetty, ja onko Pelikoodari ajanut
   korjatun pariteetti-ajon (kysy suoraan jos epäselvää).
2. Kun korjattu data on saatavilla: Fablen tilaama mitattu kierros —
   iPhonen rivit 1,5,6,7,12/12b,14,21b,23,41; iPadin 11 rakenne-PASS-
   riviä mitattuina + rivi 9 + rivi 30; nappi-inventaarion osiot
   3,5,6,7,8. Tulokset pariteetti-natiivi-20260924.md:n uuteen osioon,
   yksi rivi Fablelle SAMA/ERI/PUUTTUU-luvuilla.
3. Jatka nappi-inventaarion loput ~19 EI TARKISTETTU -riviä (ks.
   luovutuksen kohta 4) — osa vaatii oikean kosketuksen, osa web-
   funktiokutsun selvittämistä Pelikoodarilta.
4. Tutki-napin ja Julisterivin web-kuvaparit puuttuvat — kokeile real-
   touch-klikkausta jos suora funktiokutsu ei toimi.

Muista: `uusi-peli <n> <kaupunki>` + `odota-tila Kartta` ennen
seuraavaa komentoa (race condition jos liian nopea peräkkäin). Jaettu
laite (503000D1): ilmoita suoraan muille sessioille kun otat/vapautat.
