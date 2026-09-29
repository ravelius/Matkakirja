# Linnanrakentajan luovutus 29.9.2026 klo 21.2x (-f): kuori siivottu, kuusi tilaa sijoitettu ja leivottu

Rooli: **Linnanrakentaja (Opus, high)**. Päätoimittaja johtaa (local_593b89a1…, viestit NIMELLÄ / id:llä).
Edellinen: `…-20260929-e.md` (Blender-putki, kuori, Siirtosepän rajapinta). Omistajan linjaukset sieltä voimassa.

## Tehty tässä sessiossa (pelin repo, haara `linnanrakentaja-linna-3`, worktree /Users/Shared/Claude/wt/linnanrakentaja-linna-3)
- **Kuoren siivous v11** (e70a5294a): `kuori_siivous.py` (alueet + ryhmät piha/lounas, korkeusrajat, venyneet kolmiot
  piha=poista, lounas=jätä), `kuori_orto.py` (ortokuva, kloonaus ruuduittain, sävy reunarenkaasta, maalaus vain kohde-
  kolmioiden omiin tekseleihin, saumavara vain vapaisiin pikseleihin), `kuori_geom.maakentta` hyväksyy monikulmiolistan,
  `kuori_tex.push_pull` korjattu (parittomat mitat, tyhjät karkeat ruudut). Ajo: `ulkokuori.py <obj> <ulos> --siivoa`.
  Kehitysnopeus: numpy-dump (scratchpad dump.py/dev.py) → 20 s per kierros ilman OBJ-tuontia.
- Kuori v11 + ASTC 4×4 (4k/2k) → `/Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-blender/ulkokuori/`, alkuperäinen
  `senaatti-alkup/`, LAHDE.md:ssä "muokattu" (CC BY). Kuvaparit rooli-repo `docs/raportit/kuvat/linnanrakentaja-era3/
  kuori-siivous-{yleis,piha,lounas}.jpg`.
- **Tornien oikeat keskipisteet** (kartiokattojen huiput säteillä): Kellotorni (−44,4; 4,6) 34,6 m, Kirkkotorni (−15,4; 14,6)
  32,3 m. Luovutuksen -e (−50, 5)/(−21, 13) olivat kattojen rinteitä. Iso linnanpiha y 2,9, pieni −2,9, harja 16,4…16,9.
- **Sijoitukset** (speksin taulukko päivitetty 316881df2): keittiö [14,0,7,5]→[−12,−3,8] s90 + leikkaus max 13,5;
  kappeli [0,0,−20]→[−15,4,−3,−14,6]; fatabuuri, kierreportaat, muurinharja, keskushalli yhteisellä pohjoismuurin
  muunnoksella [−30,0,−20]→[−44,4; 2,9; −4,6] suunta 341 (keskushallin leikkaus max 14,4).
- Omat seinät (kuoressa ei sisäpintaa): kappeli torni r 6,6, fatabuuri/kierreportaat torni r 7,1, keskushalli pohjoisseinä
  + katto, muurinharja muurin runko kannen alla.
- leivo_tila.py: 2k-atlas oli MUSTA (e11958cf8, nyt 4k-kuvasta), hiillos tuhkaksi (d308b4257), liekit `liekki:NN-tyyppi`
  koko = korkeus metreinä, tärkeimmät ensin (Siirtosepän sopimus, lepatus max 8).
- **Kuusi tilaa leivottu `--leikkaa --leivo`** (leikkaus pakollinen: ilman sitä kuori sulkee tilan ja leivonta tummuu) ja
  toimitettu `_valmiit/olavinlinna-blender/{tilat,valot}` + astcm + `rakennus-sijoitettu.json`. Koostekuva
  `kuusi-tilaa-kuoressa.jpg` (731478042). Siirtoseppä todensi keittiön ja kappelin laitteella (UV1 oikein).
  Leivontaskripti: scratchpad `leivo-kaikki.sh` (kopioi tarvittaessa: silmukka tila → --leikkaa --leivo, sitten --tarkista).

## Auki
1. TEHTY 21.4x (fe68e28d7, Päätoimittajan päätös): vartiotupa yhdistetty keskushalliin (nopat, keihästeline, kilpi,
   jalkajouset; vartiotupa.js EI KÄYTÖSSÄ, tekstit Sisältökirjurille), laituri länsirannan pontonin lounaisreunaan
   [−19,5,0,33]→[−73; 0,3; 18,5] suunta 40. Tiloja 7, kaikki leivottu ja toimitettu, testit dioraama 275/275.
2. Kuoren jäänteet: telineuria lähikuvassa, pressun/kontin kuva muurin pinnassa lounaassa, kaakkoislaiturin katokset
   (siivouskoe v12 rikkoi bastionin muurin → peruttu; vaatisi käsimallinnuksen).
3. Fatabuurin kamerarajaus hieman vasemmalla (atsimuutti kääntyi 341:llä) — hio kamera jos Siirtoseppä/omistaja huomaa.
4. Kappelin/tornitilojen leikkaus.max ei asetettu (tornin katto jää; kamerat matalalla).
5. Valokuvamaisuus (Poly Haven CC0 -kalusteet), ASTC valmis. Äänet vasta omistajan hyväksynnän jälkeen.

## Säännöt, jotka opittiin
- Mittaa paikat kuoresta (kuori_korkeudet.py + ortokuva ruudukolla), älä luota taulukon arvioihin.
- Leivo aina `--leikkaa`-lipulla; tarkista 2k-atlaksen keskiarvo (ei 0) ennen toimitusta.
- Siivouksessa muurin vieressä EI poisteta venyneitä kolmioita (takana ei pintaa → reikä muuriin).
