# Pelikoodarin luovutus 19.10.2026 klo 23.35 (Postivahdin KOVA RAJA 35 %)

Edellinen: viesti-pelikoodari-luovutus-20261019-2240.md. Rooli: Pelikoodari (Opus, high). Proto-repo paikallinen (ei pushia).

## KÄYNNISSÄ NOLLAUSHETKELLÄ
- JU kääntänyt **f935865d6** (sokkelo, vielä viitta 150 m:n jälkeen) → `_tyo/julkaisija/sokkelo-206-app`; simuvuoro NUI:n jälkeen
  → JU lähettää **SIMU NYT** → aja taustalle:
  `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-sokkelo-206/aja.zsh /Users/Shared/Claude/proto-3d/_tyo/julkaisija/sokkelo-206-app/Matkakirja3D.app`
  (iPhone + iPad ~12 min, lokit/todistus-juoksu-sokkelo-206-*) → heti **SIMU VAPAA** JU:lle (VS tulivuoret seuraava).
- Sen jälkeen JU kääntää **4947c5620** (= 206:n ehdokas: sokkelo TASO 1 + vartijasiivous); pyydetty jo.

## ENSIN
1. Sokkelosimun kuvat täysikokoisina: S1 alku, S2–S3 käännös 90°, S4 korttelit, S5 vartija, S7–S8 jatkuu, Y3/Y4 kiinni + loppukortti
   (S6 = viitta, f935865d6:ssa vielä mukana; 4947c5620:ssa ei). Tarkista: moduulit paikallaan (muurit kujien reunoilla, ei aukkoja/
   päällekkäisyyttä), kamera ei mene muurien läpi käännöksessä, esteet/omenat näkyvät uusilla kujilla, sivukujan vartija näkyy ajoissa,
   fps (solmuja 25 × ~13 k kolmiota). Kuvapari tai arkki → PT (local_8d8ebf72-…) + KK (local_8e4fcfed-…).
2. Korjaukset → uusi sha → JU kääntää → simu 4947c5620+ → PT:n OK:lla NS:lle (local_fcc10552-…) junaan 206: e946ea2fd (kamera) +
   319044008 (ympäristö) + a6c735efc (LS kaukomaisema) + d2002fd13…4947c5620 (sokkelo). 206e-simu (kamera) OK: lokit/todistus-juoksu-206e-*.

## OMISTAJAN PÄÄTÖKSET TÄNÄÄN (PT:n kautta)
- 22.58 "Tee laajempi juostava alue" → tehtiin leveä piha (b6e8c1148), KORVATTU 23.11:llä (LeveaPiha = false; Reitit-logiikka säilyy halleja varten).
- 23.11 "Peli voi olla yksi iso sokkelikko … 90 asteen käännöksiä … Piirrä heti isompi kartta ja ota se 206 junaan" → SOKKELO.
- 23.30 "tehdään nyt juoksun ensimmäinen taso, eli ilman viittaa … seuraavaan junaan pelkkä taso 1" → 4947c5620.

## SOKKELO (haara pelikoodari/juoksupeli-207, wt/proto-pelikoodari-kerattavat-206)
- Logiikka: Peli/Juoksupeli/JuoksuSokkelo.cs (ruudukko 32 m, Auki: umpimuuri vain parillisen solmun +x/+y-kujalla → ei umpikujaa;
  Kortteli-laji; Paviljonki pois risteyksistä, koska katto 5,85 m on dronen korkeudella). JuoksuV4Reitti.LuoSokkelo/Jatka/Sisalto
  (kuja syntyy valinnasta; esteet hyppy/liuku, omenat, aarteet, vartijat edestä tai sivukujasta risteyksen edessä), JuoksuV4Saanto.
  SokkeloRisteys (pyydetty käännös / suoraan / kompastus + itsestään), UudetVartijat, ei maalia. SokkeloTasoRaja = ∞ (taso 1).
- Maailma: Scripts/Juoksupeli/JuoksuSokkeloMaailma.cs (ämpäri maailma-v4/sokkelo-693/: piha-kivi, piha-puutarha, paviljonki-risteys,
  muuri-8m; solmu = risteys + pohjois- ja itäkuja + koillinen kortteli yhdistettynä materiaaleittain, säde 2, 1 solmu/kuva, kivitaso
  horisonttiin). JuoksuV4Maailma: sokkelotilassa Lataa → yield break (v4-osat/lisäosat eivät lataudu), esteet/kerättävät
  vaiheittain (LisaaUudet + …Proto), PuraEsteet uudella reitillä, oviaukko pois, sivuvartija sivukujasta.
- JuoksupeliNakyma: uusi LuoSokkelo joka juoksulle; QA `ui juoksupeli sokkelo 0|1` (seuraavalla avauksella).
- Testit: JuoksuV4Testit.SokkeloKaannoksetJaLoputonJuoksu (+ kartta rakennus/sokkelo-kartta.json → _tyo/pelikoodari/sokkelo/
  kartta_sokkelo.py → raportit/kuva-sokkelo-1.png, PT OK). Peli 649/649, tarkista.sh 0.

## SEURAAVAAN ERÄÄN (PT 23.3x)
- Vaihtelua: yhdistetyt korttelit (pitkä kuja ilman risteystä), portit/umpikujat (portti-8m, kuuportti-8m ovat ämpärissä jo),
  leveä aukio; Codexin uudet sokkelomoduulit (PT pyysi: suora, T, X, kulma, umpipää/portti, piha, halli) vaihdetaan sisään.
- Väistöesteet (rikkoutuvat aarteet) puuttuvat sokkelosta (LataaAarteet ei tue myöhemmin syntyviä) → lisää.
- LS tekee kaukomaisema-renkaan (sisäsäde ≥ 140 m) omaan haaraansa 4947c5620:n päälle; VS kaukomaan lattian samaan Paivita-kohtaan.

## MUUT AVOIMET (ennallaan)
- Rakettivideo Mac-tallenteena yöllä (videot siirretty päivälle, omistaja 22.37); Mac WASD 4814ab2d1; hiha-uv1 kainalopatch c7d85b1a.

## LISÄYS 23.4x
- PT/KK: sokkelossa ei maalia → loppukortti ei "Rata v4 / Maali!" vaan "Jäit kiinni!" + matka, aarteet, pisteet (sama Vahvistus-pohja; JuoksupeliNakyma.cs r. 219–230, V4Kierros.TulosSyy/Nimi JuoksuKierrokset.cs r. 153/221). Samaan sokkeloerään.
- JU: 4947c5620 kääntyy → _tyo/julkaisija/sokkelo-taso1-206-app (~23.50); f935865d6 → sokkelo-206-app. Aja simu sillä, joka on valmis (taso1 ensisijaisesti, sama aja.zsh, APP-polku argumenttina).
