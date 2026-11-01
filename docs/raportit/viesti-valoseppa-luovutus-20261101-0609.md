# Valosepän luovutus 1.11.2026 klo 06.09

Syy: konteksti 25 % (pehmeä raja). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 05.23–06.0x).
Edellinen: viesti-valoseppa-luovutus-20261101-0519.md (työtavat voimassa). Proto: haara `linssiseppa2/k17-piha06-216`
(worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k17), kärki **03a9aa832**. Skriptit `_tyo/linssiseppa2/skriptit-20261031/`.

## VALMISTA (PT kuitannut)
- **Taivas v3-8192 runkoon** (PT 06.1x/06.2x): NS:lle lähetetty cherry-pick-lista 003c9fd38, 1bf693cdd, e08da1c4c, 3ba3f70bd,
  dd0d5d743, fb9f042b1 (Mt-lokirivi: Profiler antoi 0 ei-dev-käännöksessä), 44af4b5b5 (LataaTaivas Odota()-kääreeseen →
  SisaltoValmis odottaa koostusta; ei juoksun aikana), 349c86061 (oletus taivas-paiva-codex-v3-8192/). NS:n kuittaus puuttuu
  (viesti jonossa 06.0x). JU:n iPad-mittaus: lokit/valoseppa-taivas8192-ipad-20261101-0515/TULOS.txt (A−B −63 Mt, kohinaa).
- **Muurikate v35 runkoon** (PT 06.2x; tulee PK:n 6fbd10a68:sta). k06z7: lokit/pari-k06z7c-20261101-053116/kujat-v29-v35-k0-k5.jpg.
  Seuraa: v35:n muuri k2:ssa hieman lohenpunaisempi (PT: ei estä, vertaa piha 06:n punaiseen).
- **Täyttöpeitto pois → täyttöpeitto 2** (b04510488, oletus p4 03a9aa832): GI peitetään (w), pohja (z), leivonnan nollat
  (l < 0,04) täydellä täytöllä → friisin mustat viivat poissa. k06z8: lokit/pari-k06z8-20261101-053617 (raystas-o3-p4.png).
  Mittari `_tyo/linssiseppa2/tyokalut/raystas_mittaa.py` (havainne-06<k>b.png).
- LAV-vaatimusta ei viety (PT 05.5x): leivottu kontrasti on jo atlaksessa; räystäs on VS:n alue (pelin täyttö).

## AVOIN 1 (junan viimeinen valoehto, PT 06.2x): RÄYSTÄÄN ALUSVARJO NÄKYVÄKSI
Tavoite: julkisivun ylin ~1/4 noin 0,6–0,7 (pikseliarvo, suhteessa alaosaan) ja liuku kohti 1:tä; ei friisiviivoja; pylväät ja
ovet eivät saa mustua. Pari ennen/jälkeen (o3-kamera k06z8:n tapaan) + kaukokuva aukiolta → PT.
Nyt: p4 ylä/ala 0,98 → 0,90 (ylä/etumuuri 0,83 → 0,76). GI:n osuus pieni (p5 0,77), pohja 0,2 = 0,3 (ei rajoita).
Analyysi: leivottu julkisivu räystään alla 14–17 m on 0,13–0,17 (raystas-tulos.md) → lineaarinen suhde ~0,76, pikseleinä
(gamma) ~0,88; täyttöpeitto saa siis enintään leivonnan oman gradientin. Tavoite 0,65 pikseleinä ≈ 0,39 lineaarisena → tarvitaan
kontrastin venytys tai geometrinen tieto:
- (a) venytys vain pystypinnoille (|n.y| < ~0,3, ettei varjolattia tummu): kerroin koko valolle max(pohja, saturate(l / v))^g,
  v ≈ julkisivun alaosan l (~0,17), g ≈ 2–2,5, pohja ≈ 0,45 (pylväät/ovet). Riski: kaikki matalan l:n pystypinnat tummuvat
  (pylväät, ovet, kujien varjoseinät jos l < v). Mittaa ensin todellinen pystyprofiili: tyokalut/korkeus.py
  c2-v30:n a-meridiaaniportti-lod0-kaiteeton.glb:stä (aurinko 318/45), jotta v ja g asetetaan oikein.
- (b) jos (a) mustaa pylväät: QA-kytkimellä kokeiltava rajaus materiaaliin (V4_red-runko, ei pylväät/ovet) tai räystäskorkeus
  mallista (vaatisi tietoa malliin → kysy PT).
QA-laajennus kuten `valo tayttopeitto`; oletus vasta PT:n kuittauksen jälkeen.

## AVOIN 2
- NS:n kuittaus taivaan cherry-pickeille (ristiriidat junan 216 runkoon tarkistamatta).
- Lokit T7:lle kuittausten jälkeen: PT:n `siirra_lokit_t7.py --aja` (PT:n scratchpad, lue ennen ajoa) – k06z4…k06z8-kansiot.
- LAV:n leivonta v4 (-dil-oletuksilla) odottaa levyä ≥ 70 Gi; uusi LAV (vanha luovutti 05.3x 371c76679). Reitin valo sillä.

## Työtavat (lisäykset)
- `pari-k06z7.zsh` (kujat, c2-v30, muurikate-arg), `pari-k06z8.zsh` (o3-kamera, tayttopeitto-variantit, raystas_mittaa).
  Huom k06z7:n "9 m, −20" -kamerat katsoivat ylös (taivas) → testikameran kulma: positiivinen = alas? tarkista ennen kaukokuvaa.
- Taustaskriptiä ei muokata ajon aikana: lopeta (`pgrep -f "^zsh pari-…"`, kill) ja käynnistä uudelleen.
- Editorin Profiler näyttää 8192-taivaalle 192 Mt (CPU+GPU-kopiot); laitteella lokirivi laskee muodosta (64 Mt).
