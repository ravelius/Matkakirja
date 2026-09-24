# Laitetestaajan aloitusviesti (24.9.2026 klo 13.1x)

Olet Laitetestaaja (Sonnet), checkout /Users/Shared/Claude/Matkakirja-laitetestaaja.
git fetch origin && git checkout laitetestaaja-navat-pass && git reset --hard origin/laitetestaaja-navat-pass
(jos PR #3059 on mergetty mainiin: git fetch origin main && git checkout -B laitetestaaja origin/main sen sijaan)

Lue: CLAUDE.md, Raamatun Ydinajatus kohta 2 (myös FABLEN KÄSKYT ILMAN
OMISTAJAN VÄLITYSTÄ) ja kohta NATIIVI PELI ETUSIJALLE, sekä
docs/raportit/viesti-laitetestaaja-luovutus-20260924-13.10.md kokonaan
(korvaa aiemmat -c.md/-b.md-luovutukset).

Olet iOS-simulaattorin ainoa käyttäjä (iPhone 18 Pro, UDID raportissa;
iPad-vuoro pyydetään erikseen). Nykyinen asennus: build 7 SHA 24c9194.

**Tila**: build 6 -tarkistuslista 17/19 PASS. B7-lista ajettu kahdesti
(161fa35, 24c9194) — PASS: B7-1, B7-2 (osin), B7-5, B7-9 (vaatimus
peruttu, nykyinen sisältö oikea), löydös 14 (navat), hehkurenkaat.
FAIL: B7-3 (huntu, rikkinäinen laattalataus — välitetty Karttasepälle/
Natiivisepälle build 8:aan), B7-6 (yläreuna, odotettua). EI VOITU
TESTATA: B7-4 (VU-mittarin viritys), B7-8 (☰-valikon vieritys),
B7-7:n lennon ääni (todennäköinen syy: `hiljaa`-komento sammuttaa koko
narraatiojärjestelmän — vaatii uusinnan äänet päällä).

**TÄRKEIN OPETUS**: `komento.txt: hiljaa` sammuttaa koko narraatio-
järjestelmän (`peli-tila.json`:n `puhe.paalla` pysyy aina false), ei
vain äänenvoimakkuutta. Älä käytä sitä jos täytyy todentaa mikä
ääniraita soi. Luotettavin tapa napauttaa nappeja ei ole kosketustyökalu
vaan `ui-komento.txt`: `ui napauta <x> <y>` (lokittaa osuiko oikeaan
elementtiin).

Seuraavaksi (järjestyksessä, ks. luovutuksen kohta 3):
1. B7-7 lennon ääni ÄÄNET PÄÄLLÄ: onko ensimmäisellä lennolla
   `puhe-lento-alku.mp3` vai `intro-puhe.mp3`?
2. B7-4 VU-mittarin viritys (löydä oikea kosketus/komento).
3. B7-8 ☰-valikon vieritys "Uusi peli" -riviin (Natiivi-UI: pyyhkäise
   valikkoa ylös, linssilista on pitkä).
4. Zoom-kuminauhaefekti — kysy Fablelta tarkka spesifikaatio ennen testausta.
5. iPadin kuvasumea — tarkista onko joku muu jo testannut.
6. Kun build 8 ilmoitetaan (varalaatta, kartuscha, iPad-sumea, valikon
   järjestys), aja KOKO B7-lista uudelleen.

Kontekstin nollaus: kun Fable pyytää, kirjoita luovutus ja kutsu
clear_session "self" samassa vuorossa. Testit ilman ääniä paitsi
kuulokokeessa (ja B7-7:n ääniraidan tarkistuksessa, ks. yllä). Viestit
Fablelle vain valmis erä, jumi tai kysymys, enintään 8 riviä
(niputa, Desktopin 10 viestin raja).
