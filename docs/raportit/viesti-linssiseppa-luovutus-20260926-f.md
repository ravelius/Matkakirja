# Linssisepän luovutus 26.9.2026 aamulla (f)

*Linssiseppä (Opus), sessio 15ddf057 (local_45a869de), 26.9. klo 00.47–05.3x. Edellinen: -e.md (sama sessio).
Postivahti 05.3x: viikkokiintiö 90 %, tilinvaihto lähestyy.*

## Tila

- **Build 18 (master 43a6347c):** II:n 151/152/148, pariteettiäänet, laattaesilataus ja radion esikuuntelu.
- **Build 19 -juna:** linssiseppa/tehoste-rekisteri 859b937a (keksinto ja vuosi Pelikoodarin tehosteväylällä).
- **Elävä kartta:** omistaja hyväksyi videon suunnan 26.9. klo 05.0x. Pelattava versio tehdään build 19:ään kohta
  kohdalta, ja kohta 1 (saapuminen) on ensin. Fable pyytää kuvaparin omistajalle jokaisesta erästä.

## Elävä kartta, kohta 1: saapuminen (haara linssiseppa/elava-kartta 899ff2f5, wt/proto-linssiseppa-elava)

- Profiilit (Ydin/Elava/ElavaProfiili): video 18,5 s ja saapuminen ≤ 5 s. Saapumisessa:
  - huntu 0–1,6 s
  - joet ja rajat 0,4–2,5 s
  - maakunnat 2,0–3,2 s
  - nostot 2,6–3,8 s
  - aurinko laskee ja nousee kartan valoon 0–4,2 s
  - luovutus pysyville kerroksille 4,3–4,8 s
- Laukaisu: PeliOhjain.MatkaPerilla, kun maa on uusi (Pelaaja.Kaydyt). Kohdemaan joet haetaan lennon noustessa
  (Karttasepän julisteet/pallo/vektorit/joet-2026-09-26b/<ISO>.geojson). Maakuntarajat ja karttavalot jäsennetään kerran
  taustalla. Napautus ohittaa, ja vähennetty liike ohittaa kokonaan.
- Komennot (linssi-komento.txt): `elava saapuminen <kaupunki>` (Natiivisepän saapumisajo + kohtaus), `elava saapumiset 0|1`,
  `elava kaikki 0|1` (testi) sekä videon `elava kreikka | kuva <s> | saato | ui | pois | tila`.
- **Sovittu Natiivisepän kanssa** (hänen luovutuksensa g; koukut Ytimessä: Linssit/Ydin/Elava/ElavaPallo.cs). Pallon puolen
  toteuttaa seuraava Natiiviseppä:
  - ElavaPallo.Paljastus / PaljastusPois → Varitaso.Paljastus / PaljastusPois
  - PysyvatKerrokset → MaaKartta.Saapuminen / NostoKerros.Saapuminen
  - IlmoitaSaapuminenAlkaa / Paattyi → PalloKierto.AjaSaapumisnakymaan
  Asettamattomina toimivat paikkamerkit: verkkohuntu, ja maakunnat piilotetaan MaaKartta.Linssit-portilla.
- Testit 314/314, tarkista 0 virhettä. **Käännös käynnissä 05.31** (scratchpad kaanna.sh saapuminen …), sen jälkeen
  `ajo-saapuminen.sh`:
  - automaattinen laukaisu Marseillessa (FRA)
  - Ateenan testiajo: kuvat 0,9 / 1,8 / 2,9 / 3,6 / 5,4 s ja video
  → kuvapari (2,9 s ja 5,4 s) omistajalle ja Fablelle → merge-pyyntö Natiivisepälle.
- Seuraavaksi kohdat 2–3: maakunta herää. Pelikoodarin pelilogiikka on jo junassa: tapahtumat MaakuntaHeraa ja
  NostoLoytyi sekä NostonMuste. Natiivi-UI tekee kartussin. Sen jälkeen kohdat 4–5 (yövalomaski sekä laiva ja boidit).

## Muut

- Scratchpad 15ddf057: kaanna.sh, ajo-elava.sh, media-elava.sh, ajo-im2.sh, ajo-saapuminen.sh, mittaa-klikit.sh,
  ajo-esilataus-im2.sh + apu.sh (zsh: `${=VAR}`, apufunktioissa `local`).
- Effortia ei voi vaihtaa omasta sessiosta. Fable voi vaihtaa sen: set_session_effort local_45a869de… high.

## Päivitys klo 06.5x

- **Elävä kartta, kohta 1** on build 19 -junassa (linssiseppa/elava-kartta ed136705, juna/b13 b2a5fb4a).
  - Natiivisepän pallopuoli (natiiviseppa/elava-saapuminen) on mergetty ja kytketty.
  - Huntu on saapumismaahan rajattu verkkohuntu. Laattahunnun kahden sarjan sekoitus on build 20+:ssa.
  - Simulaattori:
    - aloituslennon saapuminen käynnistyy itsestään
    - valmistelu 0,8 s testin pikakäynnistyksessä ja 0,2 s välimuistista
    - kehysajan mediaani 18 ms
    - lepopiirto palaa: `pallo lepo` → lepää
- **Linssien aineisto pois kylmästä käynnistyksestä** on build 19 -junassa (linssiseppa/lykatty-data 0693c0d8 +
  natiivi-ui/linssit-heti dc66cd26, juna d706da81).
  - Aineiston lataus alkoi 15,2 s:n kohdalla joutilaana kartalla ja valmistui 17,2 s:ssa.
  - LinssiSisalto käyttää Sisalto.HaePaketista-funktiota.
  - Valitsin kutsuu LataaAineistoHeti.
- **Seuraavaksi kohta 3 (maakunta herää).** Ehdotus Natiivisepälle klo 06.5x:
  - minä: MaakuntaHeraa → ≤ 2,5 s:n herätys, jossa väri valuu, käsialanimi ja merkit tulevat ja lopuksi luovutus
  - Natiiviseppä: MaaKartta piirtää heränneet täysin sävyin ja muut paperina sekä Herata(maakunta, piilossa)
  - Natiivi-UI: kartussi

## Päivitys klo 07.0x

- **Kohta 3 (maakunta herää)** on merge-pyynnössä: linssiseppa/maakunta-heraa d7395a81 (wt/proto-linssiseppa-elava),
  mukana natiiviseppa/maakunta-heraa.
  - Sisältö: MaaKartta.Heraannyt musteesta ja ElavaHerays (≤ 2,4 s), joka käynnistyy MaakuntaHeraa-tapahtumasta, kun
    kartta on vapaa. Komento `elava herata <ISO:tunnus>`.
  - Simulaattori: Occitanie herää, ja pallo lepää lopuksi.
  - **Avoin:** pelin pysyvä maakuntatäyttö ei näy pelinäkymässä (oletuksena vain rajat), joten heränneen värin pitää
    näkyä, vaikka täyttö olisi pois. Korjaus kysytty Natiivisepältä. Kuvapari omistajalle vasta sen jälkeen.
- Kohta 2 (nostojen kokoluokat ja himmeät jäljet) on Natiivisepän ja Pelikoodarin NostoKerros-työtä. Minulta ei
  vielä pyydetty mitään. Kohdat 4–5 (yövalomaski sekä laiva ja boidit) ovat seuraavaksi.
