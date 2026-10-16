# Linssisepän luovutus 16.10.2026 klo 04.26 (KOVA RAJA 35 %, Postivahti)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/.
Tarkistus `zsh tyokalut/tarkista.sh`, testit `sh Linssit-testit/kaanna.sh [osa]` worktreessa (komento `</dev/null`, ettei jää odottamaan).
Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, Karttaseppä local_eec7f158-d9f3-4b93-9368-c50935bd19ab,
NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03. Simu iPad 00CF62C2 vain Julkaisijan SIMU NYT -vuorolla.

## 1. KESKEN: KUVAT-196I-SIMUAJO (KÄYNNISTÄ UUDELLEEN HETI – taustaskripti kuolee nollauksessa)
PT:n erä "Lontoon, Prahan ja Ateenan kierrosten hionta" (03.4x) + PT/KS: Erekhtheion. Julkaisijan L2-jonossa (PK:n taidemuseo-196:n
jälkeen) linssiseppa/kuvat-196i = 7024635a6 (kuvat-196f b75618cae + korostus-pieni a620885a9) → _tyo/linssiseppa/kuvat-196i-app,
lippu simu-kuvat196i.nyt. Käynnistä:
  zsh proto-3d/tyokalut/linssiseppa-ajot/ajo-kuvat196i.zsh > …/ajo-kuvat196i.log 2>&1   (run_in_background; odottaa lippua)
  ENSIN `pgrep -fl ajo-kuvat196i` ja ajo-kuvat196i.log: jos edellinen odottaja yhä elää tai ajo on jo käynnissä/valmis, älä käynnistä toista.
Skenaario sk-kuvat-196i.txt: Ateena Erekhtheion kaista maa 0 / maa 1 (E0/E1, `opas korostus nayta 1`), Lontoo hypyt Tower,
Tower Bridge, Greenwich (saapumisen laatat/tarkkuus + kuvat). Ajon jälkeen SIMU VAPAA Julkaisijalle.
TOIMITA PT:lle: Erekhtheion-pari (koosta_pari.py E0/E1) + Lontoon loppupysäkkien rivi; kysy kuittaus korostus-pieni-196 → NS.
- korostus-pieni-196 a620885a9 (haara linssiseppa/korostus-pieni-196, korostus-maa-196:n päällä, worktree wt/proto-linssiseppa-korostusmaa):
  rakennusmuoto < 1000 m² (KohdeMuoto.PieniRakennus) → maaruudukko tasainen max(DTM p95, kehyksen maa). KS: 47 % oli vanhan säännön
  mittaus; uudella DTM-säännöllä kaista kunnossa, mutta ääriviiva jäi Googlen pinnan alle (Ateenan GLO-30 painaa jyrkänteen reunaa).
  Testit KohdeMuoto 3/3, tarkista 0. EI junaan 196 ilman PT:n kuittausta (PT 03.1x).

## 2. VALMIIT TÄSSÄ VUOROSSA (kaikki NS:llä junaan 196, PT kuittasi; keskenään ja 07bb2afde:n kanssa ristiriidattomat)
- kippi-196 b43c288ce, korostus-maa-196 f9e449579 (kuvat _valmiit/kippi-korostus-revontulet-196f-20261016/: Notre-Dame portti 25,4 → 12,1 s).
- revontulet-skanneri-196 4249f09a7: nimi verhon yläpuolelle 560 km:iin (Revontulet.NimiKorkeusM), Jupiterin tyyli.
- s2-haivytys-196 b5b1bb275 (haara linssiseppa/s2-haivytys-196, worktree wt/proto-linssiseppa-s2haivytys): ISS-kelauksen kauden vaihto
  → S2 alfasta 0 (1 s viive, 1,5 s häivytys) + talven Euroopan lohkon pehmeä reuna (_s2Reuna myös maailman mallilla talvella).
  Kuvat _valmiit/revontulet-nimi-s2-haivytys-196g-20261016/. AVOIN: talven 32°N-reunan kuva puuttuu (Lissabonista Marokko kameran
  takana; `astro kyyti sijainti MA` ei pakota, verkko antaa FI). Seuraava keino: kohdevalikon Marokko-kohde tai `astro kyyti kello`.
- Työkalut: mittaa-kippi-nopeus.py lukee kaikki konsoli-stdout*.log; uusi kierrosyhteenveto.py (pysähdyksittäin laatat/portti/
  tarkkuus, lento, keinunta, historia) → lokit/todistus-kierrokset196h-ipad-20261016-0353/kierrosyhteenveto.txt.

## 3. HAVAINNOT KIERROSAJOSTA 196h (kone load 41 → ajoitukset epävarmoja)
- Praha ja Ateena tasaisia (laatat 90–100 %, historiaosiot soivat). Lontoo: Tower saapui laatat 58 %, tarkkuus 0,00 (portti 9,2 s:
  kipin portti vain 60–90 % lennosta, kerroin liukuu 2 s:n aikavakiolla → 15 s:n pito ei ehdi kulua); Lontoon lennot nopeimmat
  (St Paul 2154 m 19 s, huippu 392 m/s, kiihtyvyys 103 m/s², korin keinunta 43–68 m/s²). Todenna 196i:llä ennen korjausta.
- SKENAARIO-OPPI: `oleta … opas: saapui` ilman kohteen nimeä täsmää jo nähtyyn riviin → kaikki k02–k08-kuvat otettiin 1. pysäkillä
  ja kierros katkesi loppunousun 240 s:n odotukseen. Käytä aina kohteen nimeä oletuksessa.

## 4. AVOIMET
- REITIN KARKEA ESILATAUS (omistaja 00.17): odottaa omistajan korttia KK:n kautta (PT 03.1x: "Esilataus odottaa yhä"). Ei koodia ennen.
- Käännöksiä _tyo/linssiseppa/*-app (5 × ~550 Mt): EI poisteta itse (PT 3.10. sääntö), PT:n siivous hoitaa.
- tools/gpu-vapaa.sh ja .claude/settings.local.json* checkoutissa eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261016-0426.md).
Ensin kohta 1: käynnistä ajo-kuvat196i.zsh taustalle (odottaa lippua simu-kuvat196i.nyt), sitten Erekhtheion-pari ja Lontoon rivi PT:lle.
