# Sisältökirjurin aloitusviesti (28.9.2026 klo ~12.5x, kontekstin nollaus)

Olet Sisältökirjuri (Sonnet), checkout `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`
(haara `sisalto-pelikatalogi-20260927`). Ensimmäinen komento:
`git fetch origin main && git checkout sisalto-pelikatalogi-20260927 && git pull`.
Lue `CLAUDE.md`, `docs/roolitus.md` ja
`docs/raportit/viesti-sisaltokirjuri-luovutus-20260928-b.md` KOKONAAN
ennen töiden aloitusta.

TILA lyhyesti: neljä PR:ää auki testit vihreinä (#3534 BGR 28 maakuntaa,
#3536 SRB 24 maakuntaa, #3548 ihmeet-kytkentä 14 kohdetta, #3549 BIH
18 maakuntaa). ISL-tutkimusagentti jäi kesken edellisen session
resetissä — tarkista onko
`docs/raportit/sisaltokirjuri-isl-pitka-pulu-20260928.md` olemassa
(luovutuksen kohta 4).

ENSIMMÄINEN TEHTÄVÄ: viimeistele ISL (luovutuksen kohta 4), sitten
maalehden Historia-aihe 6 maalle SRB/ALB/MKD/MNE/MDA/BLR (kohta 7,
kolme agenttiraporttia jo valmiina soveltamiseen — tämä ohitettiin
edellisessä vuorossa ihmeet-PR:n yllättävän työmäärän takia, ks.
kohta 5: kaksi bugia löytyi ja korjattiin). Sen jälkeen jatka rataa A:
ALB → MKD → MNE → CYP → MLT → LUX → MDA → BLR, sitten 21 muuta maata
(menetelmä kohta 6).

SITOVAT KÄYTÄNNÖT (ks. luovutuksen kohta 8 täydelliset):
- Ydinrajoitus PÄÄTTYI 28.9. klo 12.43: `nice -n 15` on nyt pysyvä
  oletus paikallisille testeille, mutta koko sarjan saa ajaa.
- JUMI → FABLE/PÄÄTOIMITTAJA: tarkista ListAgentsilla kumpi on oikea
  osoite ennen viestintää (osoite vaihtui kesken edellisen vuoron).
- VIESTIRAJA: SendMessage ~10/vuoro. Kohderyhmä 13+, EI lastenpeli.
- Agentit vain Sonnet/Opus.
- Aja `node tools/tarkista-nimiolimitys.mjs <ISO>` AINA uuden
  karttamerkin jälkeen erityisesti pienissä/tiiviissä maissa — ks.
  luovutuksen kohta 5 (globaali ruuhkanpudotus-sivuvaikutus).
- `rappeutunutKohde()`/`kohde()`-ihmeiden `ihmeKuva`-tiedostonimen on
  AINA alettava `ihme-`.
- BIH-erikoissääntö: ei sotaa, ei entiteettirajoja (kohta 8).
- Älä mergaa checkout-haaraa (`sisalto-pelikatalogi-20260927`) äläkä
  poista sitä `--delete-branch`-lipulla.
- VAIN EUROOPPA on maantieteellinen rajaus.
- Main liikkuu useita committeja tunnissa: fetch+rebase juuri ennen
  jokaista versionostoa/pushia, uudelleentestaa jos rebasoit.
