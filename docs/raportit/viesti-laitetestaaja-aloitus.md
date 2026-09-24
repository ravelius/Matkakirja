# Laitetestaajan aloitusviesti (24.9.2026 ilta)

Olet Laitetestaaja (Sonnet), checkout /Users/Shared/Claude/Matkakirja-laitetestaaja.
git fetch origin && git checkout laitetestaaja-inventaario-ipad && git reset --hard origin/laitetestaaja-inventaario-ipad
(jos PR #3076 on mergetty mainiin: git fetch origin main && git checkout -B laitetestaaja origin/main sen sijaan)

Lue: CLAUDE.md, Raamatun Ydinajatus kohta 2 (FABLEN KÄSKYT ILMAN
OMISTAJAN VÄLITYSTÄ), kohta NATIIVI PELI ETUSIJALLE, **WEB ON MALLI,
MITATTUNA (Raamattu 9ebc5784c, sitova — LUE KOKONAAN ENNEN MITÄÄN
HYVÄKSYNTÄÄ)**, ja docs/raportit/viesti-laitetestaaja-luovutus-20260924-ilta.md
kokonaan (korvaa aiemmat luovutukset).

**SITOVA SÄÄNTÖ WEB ON MALLI, MITATTUNA**: älä hyväksy mitään natiivin
näkymää tai toimintoa PASS:ksi rakennevertailulla ("näyttää samalta").
Vaaditaan web–natiivi-kuvapari SAMASTA pelitilasta JA mitatut arvot
(px, zoomikynnykset, vaiheet) ennen hyväksyntää. Työkalut:
tools/pariteetti-web-kuva.mjs, tools/pariteetti-web-lehti.mjs (iPhone
393×852, iPad 834×1194).

Laitteet: iPhone 18 Pro (1572C658, kosketus toimii), iPhone 17
(FB234D08, KOSKETUSLUPA PUUTTUU — käytä peli-komento.txt/ui-komento.txt
-protokollaa), iPad Pro 11" M5 (503000D1, kosketus toimii, jaettu
laite — sovi vuorot suoraan muiden sessioiden kanssa). **Uusi laite
tulossa: iso iPad 00008103… (1024×1366)** — tarkista simulaattori-
luettelosta.

**Tila**: PR #3076 open. Nappi-inventaario (12 osiota) ja pariteetti-
natiivi-20260924.md päivitetty tänään. Build 9 (1.0.0, 202609241305,
proto 9a5618b) sisältää dice-roll-korjauksen (pelikoodari/liiku-tanne),
todennettu PASS iPhonella (ei listakorttia, ei Liiku tänne -riviä
oikealla kaupunkikortilla).

Seuraavaksi (järjestyksessä, ks. luovutuksen kohta 7):
1. iPad-kuvapari testi/b10:n dice-roll-korjaukselle (Pelikoodarille).
2. Rivi 9:n (maalehden palstoitus, VAHVISTETTU FAIL) korjauksen
   uusinta kun Natiivi-UI ilmoittaa — MITATTUNA.
3. Rivit 12/12b (selite), 41 (maatiedot) kun uusinta ilmoitetaan.
4. iPadin porttijäänne: varmista oikealla kosketuksella.
5. **Lennon esilatauksen mittaus build 9:llä** — Lontoo→Ateena-lento,
   lue lokirivi "lennon pinta: vaihto t=…, esilataus V+E/Y,
   välimuistista/verkosta", raportoi luvut Fablelle.
6. Jatka nappi-inventaarion EI TARKISTETTU -osioita (ks. luovutuksen
   kohta 4) mittaamalla, ei arvaamalla.

Muista: `uusi-peli <n> <kaupunki>` + `odota-tila Kartta` ennen
seuraavaa komentoa (race condition jos liian nopea peräkkäin). Jaettu
laite: ilmoita suoraan muille sessioille kun otat/vapautat laitteen.
