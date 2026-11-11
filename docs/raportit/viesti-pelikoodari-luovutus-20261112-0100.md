# Pelikoodari: luovutus 12.11.2026 klo 01.00 (konteksti noin 30 %, Raamattu 7.37)

Edellinen: viesti-pelikoodari-luovutus-20261112-0048.md (5526931d9). TÄMÄ KORVAA SEN KOKONAAN.

## 1. TYÖN ALLA: KAMERALAITE PALA 2, SYYN SELVITYS (KK 00.47): toistokokeen osuus tehty, odotetaan JU:n Mac-ajoa ja KK:n päätöksiä
Raportti (lue KOKONAAN): /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kameralaite/TULOS-syy-pala2.md, ja KK:lle lähetetty klo 00.5x.
KK:n tehtävänanto sanatarkasti on edellisessä luovutuksessa (git show 5526931d9:docs/raportit/viesti-pelikoodari-luovutus-20261112-0048.md, kohta 1).
- Koodi: natiivi-backup kameralaite/pala-2 @ f1c47100d (wt /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite) = 2ec17d3fb + ruutuloki
  (`ui juoksupeli kameraloki 1`: rivit "MATKAKIRJA kameraruutu" joka ruutu T ja L erikseen; "MATKAKIRJA kamerapeitto" peittoruudut ±2 m
  kierroksen lopussa, muoto "x z huippu ala;" 1 m:n ruutujen keskipisteet). Unity-tarkistus 0 virhettä, Seuranta 16/16, Kameralaite 14/14.
- TOISTOKOE (tärkein löydös): pelin juoksu toistuu ilman peliä tarkasti (siemen 1942463309, oikea JuoksuKulku.bytes, tason 1 lähtö 116,4/820,1
  Länsi, TyohuoneVapaaM, avaus AskelKerroin 1/60 s:n ruuduin ilman bottia, sitten botti + Askel 1/120). Paikat ≤ 0,1 m pelilokista.
  Lähde ja ajo: _tyo/pelikoodari/kameralaite/Toisto.cs + kaanna.sh (`sh kaanna.sh <wt> 1942463309 ulos.tsv <JuoksuKulku.bytes> [kartta x0 x1 z0 z1 t0 t1]`,
  tai `sh kaanna.sh <wt> kaannokset 20 <bytes>`). Kääntää Peli/ + Linssit/Ydin yhdessä (toimii ilman ristiriitoja).
  Mittari t = toiston t + 121,7 s.
- Löydökset: 128–132 s: T ja L kulkevat jäljellä (B ei selitä), z118 → 1,4 m:n kuja, umpikuja z121 ja ympärikäännös → hiusneula: TAVOITE kulkee
  pelaajan kohdan ohi, laite 0,16 m pelaajasta 2,4 m:n korkeudella (pystykuva). Kartalla ei ole seinän korkeutta eikä salin kattoa (vapaa 25).
  139–141 s: laite ylittää ulkokaarteelle 0,75 m kartan ei-kuljettavaan ruutuun, ja työntö tulee myöhässä. Kapeita käännöksiä 39 paikkaa (vasen 15, oikea 8, ympäri 16).
- ODOTTAA: (1) JU:n Mac-ajo (tilattu 00.5x): skenaario _tyo/pelikoodari/kameralaite/sk-kameralaite-pala2-siemen.txt, tulos
  proto-3d/lokit/pelikoodari-kameralaite-pala2-siemen-f1c47100d. Kun se tulee: tarkista kameraruutu-rivien S/P vs toisto.tsv (pitäisi täsmätä),
  lue T:n ja L:n massa ikkunoissa 128–132 ja 139–141 (huom. kellot eroavat ajoittain; kohdista S:llä), peittävä kappale (katto/seinä), ja tee
  hyväksymistesti: toisto + kamerapeitto-ruudut (Massassa = huippu > y+0,3 ja ala < y−0,3; sali/ovi-poikkeukset näkyvät ruutulokissa) → massassa 0,
  seinästä ≥ 0,3 m. Testin paikka: uusi testi, joka kääntää Peli/ + Linssit/Ydin (kuten Toisto.cs); peittoruudut testidataksi repoon.
  Arkit + kuusi kohtaa KK:lle siitä ajosta (KK katsoo).
  (2) KK:n päätökset (a) ympärikäännöksen jälki, (b) kapean avokujan korkeus (rajapinta: seinän huippu), (c) kulmaylitys (mittaa ensin toistolla).
  Korjaus vasta päätösten jälkeen, linjan sisällä: ei paikan asettamista eikä hakuja.

## 2. KUVAJONO: VALMIS, JUNAEHDOKAS PT:llä (ennallaan)
KK 00.30: 6e47d988f (haara pelikoodari/kuvajono, natiivi-backup, juna-224 dfd9388a5:n päällä) JUNAAN sellaisenaan; PT:lle lähetetty noin 00.35.
Seuraavaan Kuvat.cs-muutokseen (KK): "ui kuva hidas" -riville vuoro ja paikka myös ruutuina (Time.frameCount). Ei omaa ajoa.
Wt /Users/Shared/Claude/wt/proto-pelikoodari-kuvajono: poista (git worktree remove), kun 6e47d988f on junassa.

## 3. MUUT (ennallaan)
- v133c 漱芳斋-ovi: PT:n pt-ok → MR (PT pyytää). Haara pelikoodari/tausta-v133 904715425 pushattu.
- B1 bcf32314c (pelikoodari/seinat-taso1): junaan vain PT:n päätöksellä.
- tyokalut/tarkista.sh päivittää tyylikirjan → palauta git checkoutilla, älä committaa.
Ei agentteja käynnissä. Ei uusia lupia.
