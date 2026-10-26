# Päätoimittajan luovutus 26.10.2026 klo 13.54 (talviaika EET; konteksti 30 %; tili vvi@vvi.fi)

Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10. Edellinen -20261026-1153 (lue vain tämä).
ALOITA: tuotannonohjauksen osio 0, node tools/raamattu-luku.mjs 7.47 (PT: luvut 7, 8, 9, 12, 14, 4.1, docs/tilinvaihto.md).
Session alussa: Monitor odottajat-vahti.py + codex-posti-vahti.sh (Shared/Claude/hooks), git fetch origin claude/postilaatikko.
VIESTIT: mcp__ccd_session_mgmt__send_message session-id:llä (SendMessage-raja täyttyy nopeasti). Omistaja koneella (KK:n kortit).
Viikko 90 %: vain junan 211 jonossa olevaa työtä, ei uusia avauksia.

## 0. TÄNÄÄN (11.53–13.54)
- PR:t mergetty: 5236 (luovutus), 5237 (elävän kartan taso), 5238 (juoksija + tasangot), 5239 (rikkomisreaktio),
  5240 (sarja 3D:nä), 5241 (oppi: tila roolihaaroista). Docs-PR:issä ei ajeta testejä (paths-ignore) → merge heti.
- Omistajan päätökset (kaikki lokissa): 12.37 elävän kartan taso "Kyllä, tämä taso" (koko kartalle); 12.44 juoksijan
  hienovarainen kompurointi + vilkaisut, tuulimyllyt pois → uudet 3D-mallit yhtenäistetyllä ilmeellä; 12.45 väsymys,
  säpsähdys, tasankojen matalat mäet; 12.57 rikkomisreaktio "voi ei"; 13.32 latauskuva valokuvaksi + latauspalkki.
- PT:n linjat: "uudet 3d mallit" = VS:n yhtenäinen sarja (arkit 9–10); Symbolimallit päälle vain sarjan tunnusmerkeille
  (uusin sana voittaa 29.9.); karuselli/gondolit/London Eye/höyrylaiva sarjaan liike säilyttäen (KK 12.58: jo päätetty).
- AVOIN EPÄVARMUUS: omistajan 12.44 "niillä uusilla 3d malleilla" voi tarkoittaa myös Codexin Tripo-koemalleja #812/#832
  (Colosseum, Matterhorn, Kinderdijk; posti/kartta-maamerkit-812-20261021/, omistaja ei ole nähnyt). Lupasin KK:lle:
  kun sarja on pelissä → vertailukuva pelistä + YKSI kortti "tehdäänkö koko sarja Tripo-malleina".
- Unity b6 junaan 211 (PT:n lupa): runko 9460c52c6 (testit + laite vihreät 13.25), JU:n Library-tuonti L1/L2 tehty.
  b5:n poisto vasta TF 211:n jälkeen → kerro KK:lle. LT ajaa b6 A+B iPadilla NYT (13.5x) → tulos PT:lle.
- Havainne-editorin kiilat selvitetty (NS): botin juoksumatka ennen sijoitusta + b5/b6-vaihdon kuorma; korjaus "botti 0";
  editori.sh oletus juna-211 (NUI 3e64c8d20, junan rungossa). KIIREELLINEN AUKI: havainne-skenaario lähetti "valo jaady"
  myös Isolle iPadille 13.46 → NUI rajaa kohteen editoriin, LR ei aja ennen sitä tai LT:n tulosta.
  PÄIVITYS 13.58 (NUI): iPadille ei mennyt mitään; "valo jaady" oli Macin ui-loki.txt:ssä, jota editori ja Mac-käännös
  jakavat. NUI tekee esikatselulle oman datakansion ("Matkakirja 3D esikatselu"). LR odottaa LT:n tulosta.

## 1. JUNA 211 (runko NS 3e64c8d20 = 9460c52c6 b6 + editorityökalu; sisältää elävän kartan aae00fc87 ja LR paketti56)
- KS (nollattu, luovutus 024389943): karttaseppa/elava-kartta 6f3102236 (b6; sarja + elävät elementit + 3D vain sarjalle).
  Jono: 1) sarjan simuvuoro (JU kääntää 6f3102236; kuvat, video, fps + lämpö; PT:n ehdot: vain sarjan tunnusmerkit, ei 2D+3D
  samassa, ei välkettä/hyppyjä/fps-pudotusta) 2) esilatausrivi + muut paikat (Pariisi, Matterhorn, Amalfi) 3) siirtymävideo
  Z11–Z12 4) tasangot: PT hyväksyi kokeen (tasangot-koe-tanska-relief.png) → resepti + pohja-ajo Z5–Z10 (nice 15, vasta kun
  Mac joutilas ≥ 10 min) → Tanska-pari pelistä 5) Tripo-vertailu. NUI:n Tietoja-maininta nyt 8316b51cc (b6) → KS:n osoitin.
- PK (nollattu, c726b77b6): elävyyspaketti 81c791290 (b6; kallistus, nojaus, askel, kompurointi, vilkaisut, väsymys+omena,
  säpsähdys, rikkomisreaktio PuyiHuudot) → video PT:lle. Latauskuvan valokuvatilaus Codexilla (posti 4dd682937).
  PELIKUVAT 9460c52c6 PALAUTETTU (EI omistajalle): 1) katto peittää Puyin 4/24 + räystäspalkit (PK) 2) aukion irralliset
  varjokiilat (syy → LR/VS) 3) terassit harmaat + valkoinen suorakaide (LR v48) 4) kuja-07 katon raidat 5) kelluva
  porttinimi. Uusi sarja vasta kun 1, 2, 4 kunnossa ja v48 rungossa.
- LR: paketti56 (tausta-v56/rakennukset-v47/muurikate-v16) ämpärissä ja rungossa. Työn alla rakennukset-v48 (terassin
  marmorilaatat, p216 portaiden läiskät, seinien varjolaikut, aukio-09 valkoinen suorakaide); haara b6:lle. Sali-sotku
  (materiaalinimet) → juoksupeli-avoimet-v49 VS:n P42:n jälkeen.
- VS: vakiot 1b5ebb81e kuitattu; P42 (parit 04 + 01 + LR pilotti 4/5) L2:lla, haara omistajapari-12 ba279bf92 (b6).
- NUI: latauspalkki d806a468e (b6, otsikkokuvan alle 140 × 3, paikka kuvan koordinaateista) käännöksessä → pelikuvat PT:lle.
- NS: lepää LT:n ajaessa; seuraavaksi PK:n elävyyspaketti runkoon, kun video on kuitattu.

## 2. ODOTTAA OMISTAJAA
- Ei kysymyksiä. Näytettävät (vain PELIKUVAT, 7.32, PT tarkistaa 1:1 ensin): sarja kartalla, Tanska-pari, siirtymävideo,
  juoksijan elävyysvideo, latauskuva + palkki, aukio/kujat/portit (kun korjattu).

## 3. Opit (lokissa 5241)
- Tila omistajalle vasta roolihaarat katsottuna (git log --all proto-3d); työlistarivi päivitetään heti valmiista vaiheesta.
- Ennen kortin ehdotusta: onko jo päätetty (KK palautti karusellikysymyksen 12.58, periaate 6).
- Editorikuvat ja havainne-ajot eivät kelpaa omistajalle; laitekuvissakin 1:1 koko kuva ennen KK:ta.
