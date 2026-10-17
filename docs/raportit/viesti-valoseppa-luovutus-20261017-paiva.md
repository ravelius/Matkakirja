# Valoseppä – luovutus 17.10.2026 päivä (10.5x, KOVA RAJA 36 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261017-aamu.md (d90a78ab2).
Viestit `send_message` TÄYDELLÄ id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 (nollautui ~10.20, seuraaja samalla id:llä), LR local_996d60ab-b4af-4172-ad31-f8e948f141a3,
KS local_eec7f158-d9f3-4b93-9368-c50935bd19ab, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2. Päiväkirja: $D/JONO.md (kaikki rivit 09.09–10.5x). proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto.
SIMUT VAIN JU:n "SIMU NYT" -viestillä (uusi JU huomautti 10.4x: aamukaista3 lähti ketjussa ilman sen lupaa → ÄLÄ ketjuta seuraavaa vuoroa automaattisesti).
Heti vuoron jälkeen "SIMU VAPAA" JU:lle.

## 0. ENSIMMÄISENÄ: JU:n VUORO ~11.05 (PK:n fft-meren jälkeen)
Kun JU lähettää SIMU NYT: `zsh $D/vuoro-1105.zsh > $D/vuoro-1105.out 2>&1` (taustalle). Järjestys: aamukaista V4 (~8 min) → k69 (~7) → valas k6
(~15, iPad + iPhone). Lopuksi JONO.md:hen "VUORO5 VALMIS" → **SIMU VAPAA JU:lle**. Sitten tulokset:
1) **Aamukaista V4** (PT:n etusija, junaan 200): $D/aamukaista/kuvat4.zsh, todistukset lokit/todistus-aamukaista4-{ennen,jalkeen}-*. Kuvat c1/c2/c3
   (testikello KS:n hetkeen 06.12.15 UTC +0/30/60 s, Cupolan ikkuna). Tee arkki samalla python-pätkällä kuin arkki2/arkki3 (vertailu ennen | jälkeen).
   - Jos ENNEN näyttää oranssin pinnan ja JÄLKEEN ei (hehku vain reunalla) → PT:lle 3 riviä + SHA **0cd7ae1a7** NS:lle ja PT:lle (junaan 200).
   - Jos ennen EI näytä oranssia (ISS ei osunut kohtaan): tarkista lokista `astro kyyti aika` (hetki) ja `astro kyyti: Ikkuna … ISS (lat, lon)`; säädä
     kuvat4.zsh:n 80 s:n alkuarvio tai kohdehetki. Vaihtoehto: KS:n oma skenaario sk-kamerapoyta-198 + sama kello-siirto.
2) **k69** (altaat, omistaja pyysi vaaleammiksi, PT: ei KK:lle ennen kuin altaat ok): louvre1/lahi-L1-L3/k69/pyr-ats160.png – punaiset altaat?
   - PUNAINEN → LR:n vesi-mesh näkyy, mutta saa ~1/13 kiveyksen valosta (diffuusi ~0, näkyvä 40,50,70 ≈ taivasheijastus × Fresnel). Seuraava
     epäilty OmaMalli.shaderissa (suora × shadowAttenuation tai ymparisto) vesi-meshille; lue frag r. 128–196 (pyramidi-haara 169c804aa).
   - EI punainen → altaiden päällä piirtyy jokin muu (ei tason 0 kerros: k68 y +0,03 ei muuttanut mitään).
   Mittaus: $D/louvre1/allas.py (pisteet (0.75,0.80)(0.15,0.88)(0.6,0.95)) – kopio alla kohdassa 3.
3) **Valas k6** (2144ca2ad = ffc8d6a35 valas-197, t203-valas-k6): arkki valas-havainne/k6/arkki.jpg; vertaa k5:een (+1 s / +2 s ydin, vertailu-k4-k5.jpg
   -mallilla). Jos ydin harvempi → arkki + mp4 PT:lle (PT vie omistajalle). Jos ei → seuraava kerros: usva (USVA_ALFA 0,05) tai pinnan vaahto/pirske.

## 1. TEHTY TÄLLÄ VUOROLLA
- **k66vesi 09.09 HYLÄTTY → uusinta 09.25 pätevä:** paketin suhteelliset symlinkit katkesivat simun kopiossa → korjaus omat191/kuvat-utu-mykistetty.sh
  `cp -RL`. Tulos: kivi nollaero, ei yöjuovia, lasi näkyy; altaat +9 vain.
- **Yhteinen Louvre k66 VALMIS:** louvre1/v6k18-lv2f-k66vs-vesi = LR k65 (6b94513e/064b26be/0d72f13f) + sävy 0,80 (ketju.zsh) + vesiväri 0,085/0,105/0,12
  + altaat y −0,02 (syvyys/glb-vesitaso.py). md5 lod0 d956ac58, lod1 5c166140, lod2 73b452e7 (LR:llä). Skripti louvre1/yhteinen-k66.zsh. Pari 10.20:
  kivi = k66vesi, lasi ok, yö ok, ALTAAT TUMMAT. PT: ei KK:lle ennen altaita.
- **Altaiden diagnoosi:** k67/k66 nosto −0,02 = 0 vaikutusta, k68 nosto +0,03 = 0 vaikutusta → ei varjo eikä tason 0 peitto. OmaPeiliOsuus ei vipu.
- **Aamukaista** (PT:n etusija): proto `linssiseppa2/aamukaista-200` 0cd7ae1a7 (worktree /Users/Shared/Claude/wt/proto-linssiseppa2-aamukaista, master
  6339b1aec + 1): Yokuori.shader kaista × (1 − n·v)^8, testi AamuKaistaTestit, Linssit 1987/1987, tarkista 0. Appit T7 aamukaista-appit (jälkeen
  42062cdb7, ennen 6339b1aec). V1–V3 eivät toistaneet Ranskan oranssia (vertailutila ei päivitä NousuFlarea; hämärähaku tyhjä); nollaero päivä/yö OK;
  kiertoradan nousu: hehku säilyy (V1 a5: ennen leveä ruskea kaista, jälkeen tumma).
- **V4 pala 3 nollaero OK** (10.13): sävy ≤ 1/255 kaikissa; TODISTUS OK 3962e3ec/a6ad2de0 (kuvat.zsh käyttää nyt --sha kaannos.txt:stä). → pala 4
  (HDR) PT:n päätöksellä.
- **Valas k5** kuvattu (e30732b3): ydin EI harventunut (k4 ≈ k5) → k6 tehty ja käännetty (yllä).

## 2. JONO
1) Kohta 0.  2) Altaat (k69:n tuloksen mukaan) → uusi yhteinen paketti LR:lle md5:llä → pari → PT.  3) V4 pala 4.  4) Valas: sävyt Valopohjaan + kamera
Liikepohjaan, jos PT kytkee junaan.  5) Savun jatkot + LR:n raketin valaisinpäät.
Omat appit _tyo:ssa: t200-k65 (tarvitaan Louvre-pareihin), t202-valas-k5 (→ T7, kun k6 kuvattu), t203-valas-k6.

$D/louvre1/allas.py (mittaa altaat): `python3 -I $D/louvre1/allas.py <a.png> <b.png>` – 16 × 16 px keskiarvot pisteissä (0.75,0.80)(0.15,0.88)(0.6,0.95) kuvan koosta.
