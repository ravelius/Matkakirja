# Linssisepän luovutus 16.10.2026 klo 18.40 (KOVA RAJA 35 %, Postivahti)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/.
Testit `sh Linssit-testit/kaanna.sh [nimi] </dev/null` worktreessa, tarkistus `zsh tyokalut/tarkista.sh`.
Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, Valoseppä local_c238f4af-ae73-44e7-81f1-92848acd9217.
Simu iPad 00CF62C2 vain Julkaisijan SIMU NYT -vuorolla. HUOM pgrep-este: älä estä "todistusajo.sh --era" -kuviolla (osui Valosepän ajoon toisella
simulla A26BC7D0) – estä vain omat erät nimeltä.

## 1. ENSIMMÄISEKSI: PEKING #360 (PT 18.0x, omistaja 18.05: Codex ei saa odottaa; jokainen Codex-toimitus arvioidaan < 30 min)
- Codexin #360 V6 = pihakiveyksen AO ruudussa peking_2_3 (posti 8b921caa1, claude/postilaatikko). Valoseppä on raketissa, joten Linssiseppä arvioi.
- Paketit valmiit (Valosepän p344v4-putki, rakenna-peking360.zsh): _tyo/linssiseppa/peking360/v5/ktx (saumat-v5) ja /v6/ktx (groundao-v6),
  portti 0 molemmissa, 150/151 Mt. V6:ssa AO säilyi: occlusionTexture texCoord 1 strength 0,6, UV1 FLOAT32 (ei Dracoa), AO-kuva 2048²
  KTX2 ETC1S, transfer 1 = lineaarinen. Muunnos yhdisti kaksi AO-primitiiviä yhdeksi (kärjet hitsattu), UV1 tallella.
- PELITESTI KÄYNNISSÄ 18.38 (Julkaisijan SIMU NYT 18.3x, lippu kulutettu): `nohup zsh ajo-peking360b.zsh` (irrotettu) →
  peking360-vertailu.zsh junan 196 lukitus-appilla /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-app-196-lukitus-sim (⊃ peking-pelipuoli).
  Kulmat k1–k5 ruudussa 2_3 klo 13 ja 18, V5 ja V6, liuku k5 → k2, tila-rivi. Tulos: lokit/linssiseppa-peking360-20261016/
  (pari-*.jpg, erot.tsv = keskimääräinen ero ja tummentuneiden pikselien osuus, tapahtumat-*.txt). ENSIN: `tail ajo-peking360b.log`;
  jos ajo kuoli, pyydä Julkaisijalta SIMU NYT ja aja uudelleen. Ajon jälkeen SIMU VAPAA Julkaisijalle.
- SITTEN: arvio Codexille postiin (claude/postilaatikko; worktree /Users/Shared/Claude/wt/linssiseppa-posti, detached → `git push origin
  HEAD:claude/postilaatikko`): AO-hyöty kuvista (muurien/terassien jalat, avoin piha, 2_3:n reuna saumapeittoon, tumma raita/halo, LOD-liuku,
  ruutuaika). Codexin pyytämä "AO pois/päällä" = V5/V6-pari (sama paketti muuten byteilleen). Jos hyväksytty: V6 ämpäriin omistajan
  piilotettuun kippiin ilman junaa (Julkaisija vie) + rivi PT:lle (PT välittää KK:lle). Arvio yhdellä rivillä PT:lle.
- CODEXILLA AVOINNA: #361 pintojen toisto ja #362 sävyvaihtelu, hyväksytty rinnakkain 18.06 (posti addcc8ac1). Seuraava toimitus → arvio < 30 min
  samalla putkella (rakenna-peking360.zsh: vaihda pakettinimi; vertailu V6 vs uusi).

## 2. MUSEO: NIMI SEINÄLLE KORKEAN TEOKSEN YLÄPUOLELLE (PT 18.2x, omistaja 18.10, junaan 197)
- Haara linssiseppa/museo-nimi-197 90b7a67b3 (NUI:n natiivi-ui/museo-nimi-197 c5dff5d39:n päällä), worktree wt/proto-linssiseppa-museonimi.
  Katseluasento: korkea teos ≤ 80 % korkeudesta, keskipiste alempana (KeskiYNimelle), 17 % seinää nimelle, silmä nousee, katse vaakasuora.
  V2-pysähdys: KatsePiste keskipisteen yllä (puolitushaku: kehys mahtuu kallistetussa näkymässä). Zoom: nosto häviää Auto Zoomin tasolle.
  Piilevä vika korjattu: TakaaPiste seinäraossa → kävely seinän läpi. NUI:n 7 punaista testiä vihreinä, Linssit 1927/1927, unity-tarkistus 0.
- Käännös museonimi197-app L2-jonossa (kaanna-museonimi197.out; kuolee ehkä nollauksessa → aja uudelleen:
  `PROTO_LINJA=2 PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa/museonimi197-app zsh /Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh linssiseppa/museo-nimi-197`).
- Sen jälkeen simu: ajo-museonimi197.zsh (lippu simu-museonimi197.nyt, skenaario sk-museonimi-197.txt: Salon Carré louvre-inv-777 pysty + vaaka).
  Ennen-kuva: lokit/todistus-museoteksti-ipad-196-20261016-1757/kuvat/T4-salon-carre.png (nimi madonnan kaaren päällä; tekstityyli NUI:n
  vanhempi). Kuvapari _valmiit/museo-nimi-197-20261016/ + LUE.md → PT (3 riviä) ja haara NS:lle junaan 197.

## 3. VALMIIT TÄSSÄ VUOROSSA
- Wien + Rooma: linssiseppa/wien-rooma-197 6daccec73 (Belvedere katse 180 ± 15, Espanjalaiset portaat 75 ± 15, rajatut) → NS junaan 196
  (PT: praha-v7 jo juna-196-rungossa). Kuvat _valmiit/wien-rooma-hionta-197-20261016/.
- Belvedere kehys palatsiin: linssiseppa/belvedere-piste-198 8576dc030 (OpasKohde.KehysLat) → NS, PT kuittasi junaan 196 jos ehtii ennen savua.
  Kuvat _valmiit/belvedere-piste-198-20261016/.

## 4. AVOIMET
- Worktreet: wienrooma (belvedere-piste-198, NS), museonimi (kesken), museovert (c5dff5d39 vertailukopio, poista), linssiseppa-posti (posti),
  sekä edellisen luovutuksen lista (ateenahionta, prahav7, telakointi, telakointik5, aariviiva, peking197, porttitasanne, reittiedella,
  korostusmaa, kehysvari, kierrokset195 = todistusajo.sh – älä poista, puutomat191).
- _tyo/linssiseppa: belvedere198-app (poista kun museonimi197-app varmistettu), peking360/ (V5/V6-paketit, pidä kunnes V6 ämpärissä).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* checkoutissa eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261016-1840.md).
Ensin kohta 1: Pekingin V5/V6-pelitestin tulos (tail ajo-peking360b.log) → SIMU VAPAA → arvio Codexille ja PT:lle. Sitten kohta 2 (museo).
