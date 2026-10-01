# Linssisepän luovutus 1.10.2026 klo 06.0x EEST (viikkokiintiö 95 %)

Luovuttaa: Linssiseppä (Opus, high) → seuraava Linssiseppä-sessio. Edellinen: `viesti-linssiseppa-luovutus-20260929-c.md`
(ja Linssisepän muistitiedosto `linssiseppa-tila-20260930-ilta.md`, jossa on 30.9.–1.10. tila).

## Lue ensin
1. CLAUDE.md (agentit vain Opus/Sonnet, AIKA, VAIN EUROOPPA, työtilat).
2. Raamattu: Ydinajatus kohta 2 (TYÖTAPA JA SESSIOT, VIESTIRAJA JA VARAKANAVAT), NATIIVI ENSIN, VAIN EUROOPPA (linssit koko maailma).
3. Tämä raportti, sitten `docs/raportit/s2-mosaiikki-astronautin-kameraan-suunnitelma-20261001.md` (Linssiseppä 2) ja
   `docs/raportit/iss-fotorealismi-suunnitelma-20260930.md`.

## Tila
- main = 38fa528df (#3762, natiivin muutosloki 1.1 (90)). Webiin ei tässä vuorossa julkaistu mitään omaa; PR #3721 (pilvet
  oletuksena pois webissä) on MERGED ja sen worktree poistettu.
- Proto: juna/b13 = 60745aef. Kaikki kuvanäkymä-erät ovat junassa: BUILD 86 (kuvanäkymä, sijaintipallo, humina, 3D-nostot pois
  ISS-näkymistä) ja juna 88 (06822cb9: pallo väistää vaakakuvaa, meri sininen).

| Erä | SHA | Missä |
|---|---|---|
| ISS-humina kaikissa linssinäkymissä, astro-humina ei rinnalla | 67d9a906 | juna 84, PASS |
| 3D-nostot pois tasoilta 2–3 + elävät elementit pois linssien ajan | ead75f5a, 05f7aaa4 | juna 86 |
| Kuvanäkymä: taustasumennus 4 pt (vain kuvanäkymä), ‹ › 30 pt, sijaintipallo 72/96 pt | 4dbcdd8c | juna 86, PASS |
| Pallo väistää vaakakuvaa (≥ 48 pt), avomeri syvän siniseksi | 06822cb9 | juna 88 |

## Pushatut mutta junattomat haarat (proto-git)
- **linssiseppa/iss-fotorealismi = 23e40639** (worktree /Users/Shared/Claude/wt/proto-linssiseppa-iss-hionta). Sisältää
  fotorealismin (A/B-oletukset pois: Kyytipino.Pois, Avaruus.Ilmakeha2), Linssiseppä 2:n S2-kyydin (9901302c rajattu jako,
  e9ac04c0 `astro kyyti s2 0|1`) ja oman **S2-sävytyksen** (1f377f1c + 23e40639). **Merge S2-erän mukana Linssiseppä 2:n
  muistimittauksen jälkeen** (Päätoimittaja 1.10. klo 06: sävytys C hyväksytty, vertailukuva omistajalle).
- linssiseppa/iss-kuvanakyma = 06822cb9 (worktree proto-linssiseppa-iss-humina): kokonaan junassa → worktree voi poistua.

## Kesken — tee nämä ensin
1. **S2-erä (Linssiseppä 2 johtaa):** odota hänen muistimittaustaan; sitten merge-pyyntö Natiivisepälle haarasta
   linssiseppa/iss-fotorealismi (tai Linssiseppä 2:n haarasta, sovi hänen kanssaan — ei kahta pyyntöä). Sävytyksen oletukset
   (vain kun S2 on pinnalla, Kyytipino.S2): kontrasti 30, kylläisyys −10, lämpö 1, Ilmakeha2:n auringon voima 2,5 (BMNG-alueilla
   3,5). Oletuksia ei ole kuvattu uudella käännöksellä (arvot = mitattu variantti v3); tarkistus käy Linssiseppä 2:n ajossa.
   Kuvat ja mittaus: `proto-3d/lokit/linssiseppa-s2-savytys-20261001/` (NASA | BMNG | S2 | S2 + sävytys; ero NASAan 53 / 79 / 28).
2. **Fotorealismin junaan vienti** (iss-fotorealismi) odottaa Päätoimittajan OK:ta; se muuttaa ilmahehkun ja valojen sävyn
   oletuksia, Natiiviseppä tietää.
3. Laitteen tarkat ms per osa `astro kyyti katto30 0` -tilassa (iPad 00008103, muistiehto) — myöhemmin.

Agentteja ei ole käynnissä. Taustaskriptit valmiit; simulaattorit D0D2CD1E ja 903C2B91 sammutettu, appi poistettu.

## Odottaa omistajan päätöstä
- Ei mitään omaa. (Pariteettikysymys sijaintipallosta/sumennuksesta: Päätoimittaja 1.10. — EI webiin, NATIIVI ENSIN.)

## Työtavat (muuttuneet tässä vuorossa)
- Simulaattori vain Julkaisijan "SIMULAATTORI NYT" -viestillä, käännös "NYT KÄÄNNÖS" -viestillä. Ajoskriptit odottavat
  porttitiedostoja `$S/sim-nyt` ja `$S/kaannos-nyt` (touch vasta luvalla). **Ennen touchia `ps`**: vanhan ketjun porttiajo
  voi viedä vuoron (1.10. kävi).
- `ui linssi kuva <tunnus>` ohittaa linssin (ei ‹ ›, ei selausta) → testeissä `astro kuva <tunnus>` (linssi-komento.txt).
- Joka ajon lopuksi `simctl uninstall` + `shutdown` omalla UDID:llä (levymuistutus 1.10.).

## Julkaisukaava
Proto: testit (`Kartta-testit`, `Peli-testit`, `Linssit-testit/kaanna.sh` + `Linssit-testit/unity-tarkistus.sh`) → merge-pyyntö
Natiivisepälle (haara + SHA + testitulokset + todennus) → hän vie junaan; ei omaa junamergeä. Web: docs/roolitus.md
"Julkaisusäännöt" (web tauolla linssien osalta, NATIIVI ENSIN).

## Ympäristö ja työkalut
- Ajoskriptit: /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/: ajo-kuvanakyma.sh, ajo-pallovideo.sh,
  ajo-sumennus4.sh, ajo-elavat.sh (elävät + 3D: ilman linssiä → linssi → sulun jälkeen; resepti `symbolit paalle`,
  `aja lat lon 2 1` = kaari 2° ≈ 270 km), ajo-s2savy.sh (NASA-kulma vaakana + sävyvariantit), koosta_s2.py (3:2-rajaus, ero NASAan).
- S2-laatat rajatussa asettelussa: /Users/Shared/Claude/proto-3d/lokit/linssiseppa2-s2-rajattu/laatat (632 Mt; Linssiseppä 2).
- NASA-vertailukuva: scratchpadin nasa/iss067e286475-small.jpg (katoaa resetissä; lähde NASA EOL ISS067-E-286475).

## Velat ja opetukset
1. BMNG:n meri on lähes musta → pienissä palloissa sininen korvaus (Sijaintipallo.shader).
2. `aja`-komennon 3. luku on kaari asteina, ei zoom.
3. Avaruus.IlmanVoima on auringon HDR-voima (valaistus + sironta), ei pelkkä usva.
