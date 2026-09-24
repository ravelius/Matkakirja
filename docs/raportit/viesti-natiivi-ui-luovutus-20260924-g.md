# Natiivi-UI:n luovutus 24.9.2026 (g), klo 15.2x

Jatkaa luovutusta `viesti-natiivi-ui-luovutus-20260924-f.md`. Proto-git on `/Users/Shared/Claude/proto-3d/Matkakirja-proto`.
Natiiviseppä mergeää ja tekee `.meta`t. Käännöstarkistus: `./Peli-testit/unity-tarkistus.sh`, `python3 tyokalut/uss-tarkistus.py`
ja `./Peli-testit/kaanna.sh`. Työpuu `/Users/Shared/Claude/wt/proto-natiivi-ui-nostomerkit` on haarassa `natiivi-ui/iphone-island`.

## SITOVA UUSI SÄÄNTÖ: WEB ON MALLI, MITATTUNA (Raamattu 9ebc5784c, omistaja klo 15.5x)

Ennen näkyvää UI-muutosta tehdään seuraavat vaiheet:
1. Web-kuva tuotannosta samasta pelitilasta: `tools/pariteetti-web-kuva.mjs` tai `-lehti.mjs`. Työkalut ovat esim.
   `/Users/Shared/Claude/Matkakirja-laitetestaaja/tools/`, koot `PW_W`/`PW_H` 393×852 ja 834×1194.
2. Mitat webin koodista ja kuvasta merge-pyyntöön.
3. Koodaus mittojen mukaan.
4. Web–natiivi-kuvapari merge-pyyntöön.

Ilman kuvaparia Natiiviseppä ei mergeä. Arvaaminen on kielletty. Oma kertakäyttöskripti on
`Matkakirja-laitetestaaja/tools/.natiivi-ui-b9-web.mjs` (Ateenan lehden sivu 2 + tehtävä + mitat). Kuvat ovat kansiossa
`proto-3d/lokit/pariteetti-b9/`.

## Tuotannossa / buildeissa

- Build 7 on hyväksytty (koonti `proto-3d/lokit/pariteetti-20260924/natiivi-b7-koonti-iphone.jpg`). Mukana:
  - löydökset 18–24: Liiku läpinäkyvä, kuvasumennus, iPhonen yläreuna, tekstit piiloon, lento-UI piiloon, aloituskaava
  - radion VU (`natiivi-ui/radio-vu` f421887)
- Build 8 on lukittu SHA:han 3e2ad74. Mukana:
  - ☰-valikko: rivi 1 äänikytkimet, rivi 2 Uusi peli · Muut · Kehittäjä, Muut-paneeli päälle
  - Äänentasot Asetukset-osion ylimpänä
  - Pelikoodarin aloituskaava-web: `SoitaIntro`, intron loppu → ulos-zoomi + pulu
  - aikaleimasynkka
  - kartuschan juurisyy (piilossa aloituksen ja aloituslennon ajan)
  - aihesivujen nostokuvissa vain lähderivi
- Rivit 5 ja 23 PASS (Laitetestaaja f6de924): rivi 5 lehden otsikko ja lähderivi, rivi 23 kaupunkipilleri. Rivi 13 ei vaadi
  muutoksia (Pelikoodari).

## Merge-jonossa: build 9 = `natiivi-ui/iphone-island` bf7af3d (odottaa kuvapareja)

- 0fac056: UI-lukijat päätaso ensin. Fokusvirtojen sähketehtävä, lehtiaiheiden tehtävä (332) ja lista sekä
  sivunOtsikko ovat vain päätasolla. Käytösmuutos 1.x-paketilla: aihesivuille tulee tehtävät.
- bf7af3d:
  - pelikoodari/siirrot-kartalle mergetty
  - pöllön valintavihje: `ValintavihjeAika` → `Pulu.NaytaVihje`, `ValintavihjePois`
  - Noppa n -listan erikoistapaus pois
- Natiiviseppä kääntää testihaaran (master + bf7af3d + siirrot-kartalle) iPhone 17:ään (FB234D08) ja iPadiin (503000D1) ja
  ilmoittaa. Sen jälkeen:
  - natiivikuvat samoista tiloista: Ateena sivu 2 "Arki ja tavat" + tehtävä; pöllön vihje 15 s nopan jälkeen
  - web-kuva vihjeestä puuttuu vielä
  - kuvaparit ja mitat merge-pyyntöön

## Ei webissä -lista (valmis, odottaa Fablen päätöstä)

Haara `natiivi-ui-ei-webissa` 5e9ee1f61 (web-repo), osio "Ei webissä (24.9. klo 15.3x)" tiedostossa
`docs/raportit/pariteetti-natiivi-20260924.md`. Kohdat E1–E20 on lähetetty Fablelle. Tärkeimmät:
- E1–E2 kaupunkikortin Sulje ja Mannerlento
- E3–E4 nostokortti keskellä / ei raahattava, × vs ✕
- E5 matkavalinta modaalina
- E6–E7 päävalikon tekijätiedot, sisältöversio
- E8 Kertoja-kytkin käynnistää luennan
- E9 "Lue lisää ›" -nuoli
- E10–E11 ryhmänostomerkin kuvake ja nimiö kaikilla zoomeilla (bugeja)

Tiedostossa on lisäksi päinvastaiset puutteet. ÄLÄ POISTA mitään ennen Fablen rivikohtaista päätöstä. Jokaiseen korjaukseen
tarvitaan web-kuva ja mitat.

## Muut avoimet

- Laitetestaajan build 6 -tarkistuslista: FAIL-kohdat, kun lista ajetaan.
- Linssisepän iPad-kuvasarja radion VU:sta.
- Lontoon nasta aloitusvalinnassa on Natiivisepän (KaupunkiMerkit).

## Opit

- `ui livia avaus nollaa` KÄYNNISTÄÄ esittelyn ja merkitsee sen nähdyksi. Nollaa lippu PlistBuddylla:
  `Library/Preferences/app.matkakirja.proto3d.plist`, avain `matkakirja-livia-avaus`.
- Simulaattorin `Screen.dpi` antaa iPhonelle @2x, joten pisteskaala luetaan lyhyestä sivusta (`Ylapalkki.PuhelimenSkaala`).
- Unity 6:n ScrollView: `.x > .unity-scroll-view__content-viewport` ei osu, joten luokka lisätään contentContaineriin
  koodista.
- `kuvaa2.sh`: `ui:`-askeleeseen koko rivi (`ui:ui aloita ateena`). Pallolle napautetaan simulaattorin tap-työkalulla,
  UI-nappeihin `ui napauta x y`.
- `</alpha>` ei ole TextCoren tagi. Käytä `<alpha=#FF>`.
- `simctl install` ei tyhjennä datakonttia, mutta testikomentojen tila on muistissa eikä säily uudelleenkäynnistyksen yli.
