# Valoseppä – luovutus 16.10.2026 aamu 4 (09.0x, KOVA RAJA 35 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261016-aamu3.md.
Viestit `send_message` TÄYDELLÄ id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
LR local_996d60ab-…, NS local_674b9ec4-…, PK local_7fcab04b-864c-4ec2-98bd-46e171326701, Linssiseppä local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4,
Julkaisija local_5cb16c00-….
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2. Jono: $D/JONO.md (loppu "07.2x (nollauksen jälkeen 5)" →). Loki: $D/testi196-uusi.log.
Simut T7-sarjassa (simusarja.sh); iPad A26BC7D0 on minun luuppini. ÄLÄ aja `zsh -x`. Skriptien odotus: pgrep omilla skriptinimillä.

## PT:n JÄRJESTYS (09.0x, sitova)
1) e8e6994e0-käännös (salamat3-video.zsh, t196-s3) → salama- ja auringonnousuvideo PT:lle (kohta 2 alla).
2) Codex-havainnekuvat 9 + s1-täydennys (postilaatikko 523d82d38 / eb0a03547): seuraa vastausta, kuvat PT:lle HETI, sitten tavoiteluuppi. Juna 196 odottaa.
3) Rae / kipin sävytys odottaa omistajan korttia KK:ssa (ei toimia ennen PT:n viestiä).
4) Louvre v6k20 (juna 197) – kohta 4.
5) k5 → k6 (perseidit/hurrikaani/vanat) junaan 197.
6) Raketin yöalusta näkyy päivänvalossa (aurinko −12°) → luuppiin (r1).
Haarat: PK pelikoodari/raketti-kamera-196 af52dcc6e (Nousu.KameraV2), LR linnanrakentaja/raketti-alusta-196 (37cd85cdc, kaataa
ValaanValoTestit – LR:llä; 7b99eafbd mukana luuppihaarassa). Telakointi on Linssisepällä (1bd655ee1).

## 0. ENSIMMÄISENÄ: ISS-HAVAINNELUUPPI (omistaja 08.10–08.12, JUNA 196 ODOTTAA)
- Codex-tilaus lähetetty: postilaatikko (origin/claude/postilaatikko) 523d82d38 + täydennys s1 eb0a03547:
  posti/valoseppa-codex-iss-havainnekuvat-20261016.md + posti/valoseppa-iss-havainne9-pelikulmat/ (9 kuvaa: r1–r4 raketti, a1 nousu,
  s1 salamat, t1 perseidit, d1–d2 telakoituminen). Lupa TÄSMÄLLEEN 9 kuvaa. Tyyli ELOKUVAMAINEN (08.12), ei vinjettiä (08.04).
  Postilaatikon worktree: /Users/Shared/Claude/wt/linssiseppa2-posti (detached; fetch + checkout --detach origin/claude/postilaatikko ennen committia).
- Kun Codexin vastaus tulee (posti/codex-valoseppa-iss-havainnekuvat-20261016.md) → kuvat PT:lle HETI → luuppi kierros kerrallaan
  (pelikuva vs havainnekuva, agentit tekevät korjaukset, arvio). d1/d2 → Linssiseppä (oma aliluuppi, haara linssiseppa/telakointi-havainne-196).
- Pelikulmat: $D/havainne9/pelikulmat/ (r2 = r1:n alustakamera; alkuperäiset väärät ajoitukset alkuperaiset/). Skenaario iss-nyt/sk-havainne9.txt
  (r2–r4 ajoitus lähtölaskennasta EI osu: puheaikataulu kiihdyttää T:tä → korjaa oleta-rivit tila-rivin T+-arvoon).

## 1. HAARAT (proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto)
- **linssiseppa2/iss-juna-196 e8e6994e0** (wt/proto-linssiseppa2-juna196) = juna-196 + ISS k4 6755374e8 + auringonnousu-ehto d25d0091b
  + salamat 60fdbaa27 + kaksoispiirto 79d127d3c + 1 kerrallaan/hämähäkkimuodot c2b23c3c7 + raketti fda1ac8f3 + auringonnousu efdff8c43
  + pohjavahti ccaf13ccd + flare k1 e8e6994e0. Rae (astro kyyti rae 0|1) ja kipsävy (kipsavy 0|1) oletus POIS (omistajan valinta kesken).
  NS:llä junaan: iss-juna-196 d25d0091b (k4). Uudemmat (salamat, nousu, raketti) junaan VASTA luupin tuloksella / PT:n käskyllä.
- **linssiseppa2/raketti-liekki-196 fda1ac8f3** → PK (haara + SHA annettu).
- **linssiseppa2/iss-luuppi-196 fd62e2716** (wt/proto-linssiseppa2-luuppi) = iss-juna-196 + LR alusta 7b99eafbd + LS telakointi 51edfb52a
  + PK kamera af52dcc6e (RakettiLaukaisu: liekki- ja kamera-case molemmat). unity 0, 1918/1918. Luupin raaka-aine; LR:n säätönupit:
  keila 0,45, lätäkkö 0,56–0,68, noki 0,6, saumat 0,5; PK: linssi raketti kamera v2 1 ennen laukaisua.
- iss-efektit-196 f9bb2bab1 (k5) → juna 197; testi-196 f6dc5b160.

## 2. KÄYNNISSÄ
- $D/salamat3-video.zsh: L2-käännös iss-juna-196 (e8e6994e0) → t196-s3 → salamavideo (sk-salamat.txt) + auringonnousuvideo
  (sk-auringonnousu.txt, läpimurtokuva +7 s). Loki "S3 käännös", "LOPPU salamat3-video", "LOPPU nousu3-video".
  → Tarkista: salamoissa vain 1 kerrallaan (6×6-ruudukkoanalyysi kuten iss-nyt/salamat-omaan-tahtiin-arkki.jpg) ja näkyykö hämähäkkikanava;
  nousussa säteet ohuet, juova pitkä, heijastumat hennot → PT (video + arkki).

## 3. VALMIIT TÄLLÄ VUOROLLA (07.2x–09.0x)
- ISS k4: commit + kierrokset + ARVIO4 (kaikki LÄHES). k5: agentit + commit + kierrokset + ARVIO5 (perseidit 6,0, hurrikaani 5,75, vanat 6,25).
  HUOM: perseidit/kierrokset/k4-kuvat ylikirjoitettu k5-käännöksellä (sed-virhe k5-ketjussa), k4/ARVIO.md tallessa.
- Salamavideo 08.21 → PT; omistaja 08.49 "Vieläkin kaksi salamaa iskee yhtä aikaa" → juurisyy SRP Batcher (_Salamat-taulukko
  UnityPerMaterialin ulkopuolella) 79d127d3c + globaali 1 kerrallaan c2b23c3c7 (ei vielä nähty videolla).
- Auringonnousu 08.50 video + arkki → PT; KK:n k1-huomiot tehty e8e6994e0.
- Raekuvat 9 kpl → PT (iss-nyt/rae-arkki.jpg, rae-lahikuvat.jpg): rae Thin1 tuskin näkyy → ehdotettu Medium4 ~0,32; odottaa omistajaa.
- Kipin efektilista → PT (iss-nyt/KIPIN-EFEKTIT-ISS-20261016.md).
- Louvre k36s-pari → LR + PT.

## 4. JONO PT:n järjestyksessä luupin jälkeen
- Louvre v6k20 (juna 197; LR 08.0x): pariisi-v3/v6k19 + k36 (syvyys/glb-k36, LOD2, leikkaus 722) `--lisaa pariisi-v3/v6k19/mallit.json`,
  tekijärivi "Louvren malli: Matkakirja; aineisto © OpenStreetMap contributors (ODbL), © IGN – BD ORTHO, LiDAR HD (Licence Ouverte);
  pintaskannaukset Poly Haven (CC0)", LAHTEET.md louvre-rivi, tarkista 12 kohdetta → Julkaisija (osoitin uusin-4 → v6k20 VASTA 197-lukituksessa) + PT.
  Ohje: /Users/Shared/Claude/proto-3d/_valmiit/louvre-v1/INTEGRAATIO-k36.md.
- ISS-efektit k6 (perseidit/hurrikaani/vanat, ARVIO5:n korjaukset) – juna 197.
- Peking: Codex #347 V5-saumat (rajattu lentotesti) + #349–350 posti. PT 08.5x: Pekingin pelipuoli (varjot, luotain, ilmaperspektiivi, Ion)
  on Linssisepällä junaan 197.
- Kuittaamatta yhdessä: juna-196:n MuseoKavelyTestit.JatkuvaSuurennus kaatui 90f1ef54a:ssa (NS:lle kerrottu); iss-luuppi-196:ssa läpi.

## 5. HUOM
- Appit: $D/t196-k4b, t196-k5b, t196-salamat (keskeneräinen, peruttu), t196-raketti (e0dc25aa), t196-nousu (aa435117), t196-s3 (tulossa).
  Vanhat t196-k3, t196-k4, kelausnopeus-app voi poistaa (levy ~45 Gi).
- Ajoskriptien malli: $D/nousu-rae.zsh / salamat3-video.zsh (käännös → odota omat skriptit → aja-video.zsh SKENAARIO=…).
