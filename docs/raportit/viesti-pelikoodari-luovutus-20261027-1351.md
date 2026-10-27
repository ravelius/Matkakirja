# Pelikoodari: luovutus 27.10.2026 klo 13.51

Konteksti ~36 %. Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN).

## Haara ja tila
Proto-haara `pelikoodari/juoksu-taso1-212` (worktree /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211), pää 8af5b36a1, ei junassa.
tyokalut/tarkista.sh 0 virhettä (palauta sen jälkeen Assets/Matkakirja/UI/Resources/MatkakirjaUI/Tyylikirja.uss,
Assets/Matkakirja/UI/Tyylikirja.cs ja tyylikirja/tyylikirja.json git checkoutilla). Rivin perään kirjoitettu //-kommentti voi katkaista
jatkuvan lausekkeen (CS0163 13.50) → käytä /* */ tai omaa riviä.

## Tehty tässä vuorossa
- Kiinniotto sivukuvana, perus + viitta: kontaktit ok → Codexille hyväksyntä a742bf8f3 (claude/postilaatikko), kuvat KK:lle
  (_tyo/pelikoodari/kiinniotto-takaa-20261027/sivukuva/ ja sivukuva-viitta/).
- Codexin peek_call 1080: kumulatiiviset mallit (perus/viitta + catch_back) → _tyo/pelikoodari/hahmot-v5-koe/eunukki-1(-viitta).glb
  (vanhat ennen-peek-call/). Peli soittaa nimellä, ei lisäsiirtoa. Kamera, ääni ja tilanne ok → Codexille cbb60fff8, kuvat KK:lle
  (juoksu-alku-opetus-20261027/kuvat-taso1-peekcall/).
- MUURIKATE C3 GPU-INSTANSSEINA (3decea6b1, 0913e1581, d62937550): JuoksuSokkeloMaailma.Muurikate.cs. MuurikateTiedosto =
  kielletty-muurikate-v18/kk-muurikate-v18-pohja.glb; samasta kansiosta vanha kate (kk-muurikate-v18-vanha.glb), joka jaetaan 64 m:n
  ruutuihin, sekä c3-sijoitukset.json + 1057. Alle 60 m:n ruuduissa (MuurikateC3Lahi, kamerasta ruudun rajaan) vanha piiloon ja
  1057 RenderMeshInstanced. JuoksuMaailma.shader: multi_compile_instancing pinta- ja varjopassissa (MV-passi ei: instanssit Camera-tilassa).
  Lämmitys Lammita-kutsussa. Havainne 01/02/03/05 ok (_tyo/pelikoodari/muurikate-v17-koe/havainne-c3/).
- C2-KAITEET samalla mekanismilla (InstSarja; d62937550): LR:n kielletty-c2-v1/c2-sijoitukset.json (mallit 1061/1062/1064, "r" 0 = muurikate
  222, 1 = F 318, 2 = G 4598). Nyt vain r = 0: lähellä (40 m) instanssit, kauempana pohjan V4_marmorikaide ruuduittain. F/G vasta Codexin
  LOD1:n kanssa (rakennusten LOD0 näkyy 150 m:iin, LR:n kaiteettomat LOD0:t sitten käyttöön). C2:n kuva on vielä tarkistamatta:
  C2 latautuu ("kaiteet C2 222 palaa 4 ruudussa, 3 mallia"), mutta KAHDESSA 06-ajossa (-100 45 0 ja -100 -30 180) yksikään C2-ruutu ei
  tullut "lähelle" (lokissa ei "kaiteet C2 lähelle"), eikä kuvassa näy kaiteita. Selvitä ensin: palat glTF p ≈ (−119, 2,28, −73) →
  DioraamaGlb (x, y, −z) = (−119, 2,28, 73) → ruutu (−2, 1); tarkista editori.sh 06:n paikan kehys (pohja.json x/z) ja C2-ruutujen
  r.raja kameran kehyksessä (Debug.Log ruutujen rajoista ja KameraPaikasta). C3 toimii samalla koodilla.
- QA: `palatsi muurikate-c3|muurikate-c2 0|1`, `palatsi c3-lahi|c2-lahi <m>`, `v4juuri dokumentit/<kansio>` (laitteen Documents).
- Koejuuri _tyo/pelikoodari/muurikate-v17-koe/juuri/ (v76m-linkit + v18 + kielletty-c2-v1). Kevyt laitejuuri juuri-v77m-kevyt/ (718 Mt,
  vain käytetyt paketit, ilman C2:ta).

## Odottaa
1. GPU-MITTAUS (PT 13.4x "kyllä"; LT levossa omistajan 22.17-käskyn takia, kysyi PT:ltä vahvistusta): JU asensi 0913e1581:n isoon iPadiin
   (00008103, fi.matkakirja.peli.kehitys), mutta siinä ei ole dokumentit/-polkua. Pyydä JU:lta uusi käännös 3964cc5f2:sta, kopioi kevyt juuri:
   `xcrun devicectl device copy to --device 00008103… --domain-type appDataContainer --domain-identifier fi.matkakirja.peli.kehitys
   --source <juuri-v77m-kevyt> --destination Documents/juuri-v77m-kevyt` (tarkista komento devicectl --helpistä) ja ohjeista LT:
   `ui juoksupeli v4juuri dokumentit/juuri-v77m-kevyt`, vertailu A `palatsi c3-lahi 0` / B `c3-lahi 60` samalla reitillä. Tulos-rivi PT:lle.
2. SEURAAVA ERÄ (PT 13.5x, "ennen LT:n GPU-mittausta, jos ehdit"): LOD1 instansseihin. Codex b72c20705, LR tarkisti ja kopioi:
   kielletty-muurikate-v18/1057-c3-muurikate-2m-lod1.glb ja kielletty-c2-v1/{1061,1062,1064,1063-10/20/28deg}-*-lod1.glb (≤ 398 kolm.,
   sama pivot, OMA UV + omat 512 px kartat = eri materiaali). Vaihto 25 m: InstSarjaan malli per LOD (mallit[m][lod]), ruutu lähellä:
   d < 25 → LOD0, muuten LOD1 (kuten nyt raja Lahi → vanha). Ruudun sisällä palakohtainen etäisyys olisi tarkempi (ruutu 64 m) → harkitse
   16 m:n aliruutuja tai palakohtaista jakoa. 1057:stä tulee myöhemmin -lod1-v2.glb. Sitten F/G-kaiteet (r 1/2) LOD1:n kanssa.
3. Codex f97bebb26 (13.42): kahdeksan sivukiinniottoparia → tarkista sivukameralla (sk-taso1-kiinni-sivu.txt / -viitta.txt) ja kuittaa
   Codexille (claude/postilaatikko, kuten a742bf8f3).
4. KK 13.5x (peek_call-arkki): pc-1/pc-2 OK (KK vei omistajalle). VIKA pc-3: lähikuvasta keisarin taakse kaarron aikana kuvassa pelkkää
   lattiaa; tavoite: kuja ja keisari kuvassa koko kaarron ajan. 8af5b36a1 (katsepiste liukuu kasvoista keisariin + kenttä kw²) EI
   riittänyt: pd-3 (kuvat-taso1-peekcall-v2/arkki.jpg) näyttää yhä seinää ja lattiaa ilman keisaria → syy on kaaren kamerassa sillä
   hetkellä (KurkistusKuva jo ohi tai kamera keisarin yllä/takana seinän vieressä). Lokita kp, katse ja kw 0,1 s välein kaarron ajan
   (sk-taso1-peekcall2.txt + odota 0.2 -kuvat), korjaa JuoksuAvaus.PuyinAvaimet / KurkistusUlosS, ja aja arkki pc-1…pc-5 → polku KK:lle.
5. Juureen kielletty-c2-v1 (LR v78m?), kun C2 on hyväksytty. hahmot-v5-koe EI ämpärissä (vienti ennen junaa).
