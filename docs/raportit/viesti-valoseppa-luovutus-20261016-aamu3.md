# Valoseppä – luovutus 16.10.2026 aamu 3 (07.1x, KOVA RAJA 35 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261016-aamu2.md.
Viestit `send_message` TÄYDELLÄ id:llä osoitekirjasta (/Users/Shared/Claude/osoitekirja.md) – lyhyet id:t eivät toimi:
PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä + polut), LR local_996d60ab-b4af-4172-ad31-f8e948f141a3,
NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832, Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2. Jono: $D/JONO.md (loppu "TILA 16.10. 05.3x" →). Simuloki: $D/testi196-uusi.log.
SIMUT ovat T7-sarjassa: pelkkä `xcrun simctl` näyttää tyhjää → skripteissä `source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh`,
komentorivillä `zsh …/simusarja.sh simctl list devices`. iPad A26BC7D0 on Valosepällä, nyt vapaa.
Simun vapauden odotus: ÄLÄ `pgrep todistusajo.sh` (osuu muiden roolien ajoihin) – käytä omaa UDID:tä tai lokirivejä.
Sammutetun simun Documents: "/Volumes/T7 4TB/Simulaattorit/Sarja/<UDID>/data/Containers/Data/Application/*/Documents" (get_app_container ei toimi).

## 0. ENSIMMÄISENÄ: ISS k4 -agentit (kuolevat nollauksessa)
Kolme Opus-agenttia muokkasi 07.1x worktreetä /Users/Shared/Claude/wt/proto-linssiseppa2-iss-efektit (haara linssiseppa2/iss-efektit-196 74e74f5a1)
ARVIO3:n ($D/KIERROKSET-20261016-ARVIO3.md) mukaan, EI committeja: perseidit (Tahdenlento.shader + Tahdenlennot.cs + perseidit/sk-pohja.txt,
saatimet-k4.txt), hurrikaani (Hurrikaani.shader, hurrikaani/saatimet-k4.txt), vanat (Tiivistysvana.shader + vanojen C# + testikomento siemen/ankkuri
+ vanat/sk-pohja.txt, koneet 23→40, 35 % esivanhoja, saatimet-k4.txt). Luovutushetkellä muuttuneina Hurrikaani.shader, Tahdenlento.shader, Tahdenlennot.cs.
- Tarkista `git -C … diff` ja saatimet-k4.txt:t. Puuttuva osa → sama tehtävä agentille uudelleen (brief: ARVIO3-rivi + kierroksen k3 ARVIO.md).
- Sitten: `sh Linssit-testit/unity-tarkistus.sh` (0) + `sh Linssit-testit/kaanna.sh` → commit iss-efektit-196 → cherry-pick/merge testi-196
  (wt/proto-linssiseppa2-testi) → k4-ketju k3-ketju.zsh:n mallilla ($D/k3-ketju.zsh: L2-käännös → $D/t196-k4b, sitten
  perseidit k4, hurrikaani k4, vanat k4 aja-kierros.zsh:lla) → arvio (Sonnet/Opus-agentti, arvioija.md) → PT. Tulivuoret EI ole PT:n listalla nyt.
- PT 07.0x: perseidit/hurrikaani/vanat LÄHES → valmiiksi. Salamat k3 odottaa yhä omistajan palautetta; revontulet k11 _Punainen 3→6 jonossa.

## 1. VALMIIT TÄLLÄ VUOROLLA (05.3x–07.1x)
- LOUVRE (LR:n luuppi): k28s, k31s, k33s, k34s, k35s pelikuvaparit + vertailut ($D/louvre1/louvre-*-kulmaB.jpg, *-zoom-*.jpg) → LR + PT.
  Resepti per versio kN: snapshot _valmiit/louvre-v1/glb → syvyys/lahde-kN; lod1-kN.sh + lod0-kN.sh (sed edellisestä); glb-kN;
  `python3 -I rakenna.py lv2f-kNs syvyys/glb-kN` (pysähtyy tunnettuun LOD1-rajavaroitukseen) + `rakenna-jatko.py lv2f-kNs` (portti);
  kuvat-v2f-kNs.zsh; pari.py; vertaa.py edellinen uusi "selite". Valmis ketjupohja: $D/louvre1/k35-ketju.zsh (sed k35→kN, odotusehto).
  k35 (06.55) tila: itäaltaan rosoreuna poissa, itäisen pikkupyramidin juuressa yhä kapea rako → LR:lle ~0,3–0,5 m. Odota LR:n k36:ta.
- PEKING: p340i arvioitu (peking284/ARVIO-p340i.md), Ion 5–16 m oman maan yläpuolella (Ionin pintamalli) → Codex posti f99d9bbac (reunaverho + saumat).
  PT344 V4 (vihreät puut) → p344v4 lennetty (ARVIO-p344v4.md), maskin reunan Ion-korkeudet ion-vali-tulos-p344v4.json → Codex e81e898fe.
  p344v4 VIETY 06.00 (Julkaisija, uusin.json → p344v4). peking-ion-196 343666486 junassa (7a9859c3f).
  Codexin seuraava toimitus (reunaverho) → rakenna.py PEKING_LAHDE=… → lento (ajo-p344v4.zsh-malli) → arvio → vienti PT:n kuittauksella.
- TESTIKORJAUS: VesiMaastoPainallusTestit.GooglenPolkuEnnallaan 982b0b1f9 (peking-ion-196) → NS; todennettu juna f6ca36818:n päällä 1903/1903.
  Tarkista, onko NS ottanut junaan (Pelikoodari ilmoitti 7a9859c3f:ssä hylätyn testin ennen korjausta).
- KELAUS: kelaus-rajaus-196 ca8aad04e todistettu (347 laattaa, 10,5 s, katto 4 s) → PT kuittasi NS:lle. Jono-A/B kelaus-nopeus-196 77818fc11:
  ei hyötyä (~85 laattaa/s kaikilla, iss-nyt/KELAUSJONO-AB-0704.md) → PT: SULJETTU, 4 s katto hyväksytty, ei jatkoa.

## 2. HAARAT (proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto)
- iss-efektit-196 74e74f5a1 + k4-muutokset commitoimatta; testi-196 (kierroksiin, EI junaan) ⊃ 6991f6d07 + 982b0b1f9.
- peking-ion-196: 343666486 junassa; 6991f6d07 (ion-väli tulostiedostoon) + 982b0b1f9 (testikorjaus) NS:llä.
- kelaus-rajaus-196 ca8aad04e → NS (PT kuittasi). kelaus-nopeus-196 77818fc11 suljettu (ei junaan).
- Worktreet: iss-efektit, kelaus (nyt kelaus-rajaus-196), peking, revontulet-v7, testi.

## 3. HUOM
- ÄLÄ aja skriptejä `zsh -x`:llä. L2-lukko: /tmp/matkakirja-kaannospalvelu-2.lukko/kuka.
- Appit: $D/t196-k4 (d9cf06ee, testi-196 05.39), $D/kelausnopeus-app (voi poistaa), $D/kelaus-app. Levy ~49 Gi.
