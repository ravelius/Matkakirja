# Natiivi-UI: luovutus 29.10.2026 klo 21.40 (Postivahdin kova raja 36 %)

## Työ: Taihedianin halli havainnekuvan näköiseksi (PT 21.1x, juna 215)
Erolista 03/03b kohdat 1 (katto), 2 (julkisivu) ja 5 (terassin kaiteet):
/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/erolista-aukio-03-03b-20261029.md.
Rajat: mitat, paikat ja koko pysyvät (omistaja 20.10. klo 07.30); muodot ja pinnat tasaisessa valossa (27.10. klo 10.56).
Suunnitelma: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/halli-215/suunnitelma.md.

JAKO (PT 21.3x vahvistettu): NUI = LOD1-katon muoto, julkisivun UV:t LOD1:een ja kaiteet osasarjan osista. LR = koristekortit LOD1:een
(v146) ja osasarja. VS = pinnat (materiaalinimet: V4_palatsi_katto, V4_wood = 1070-ristikko-ovi, V4_palkkivyo = 1067, V4_palatsi_friisi,
V4_red, V4_marmori). PT 21.5x: terassikaiteet LOD1-etäisyydelle NUI:n osasarjakaiteena LR:n osista, ei C2-LOD1-paloja.

SYY: 03/03b-kamera on noin 160–170 m:n päässä, joten peli piirtää g-taihedian-LOD1:n. Siinä katossa oli 490 kolmiota (lappeet suorat,
nurkat eivät nouse), ovilla ei ollut UV:ta (ristikko-ovi ei voinut näkyä), ja C2-kaiteet näkyvät vain LOD0:n kanssa (alle 150 m).

## Tehty
1. KATTO JA OVET LOD1:een: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/halli-215/tyokalut/lod1_katto_lod0sta.py.
   Katto-solmun V4_palatsi_katto ja V4_gold sekä runko-solmun V4_wood LOD0:sta (POSITION, NORMAL, TEXCOORD_0) LOD1:een; LR:n
   koristekortit säilyvät. Tulos .../halli-215/v1/g-taihedian-lod{0,1,2}.glb (pohja LR rakennukset-v134/kielletty-rakennukset-v58;
   lod0 ja lod2 kopioita): katto 562 → 12 465 kolmiota, LOD1 yhteensä 16 165. EI VIELÄ TARKISTETTU KUVASTA. Polkua ei ole vielä
   lähetetty LR:lle (LR odottaa sitä eikä kirjoita g-taihedian-lod1/2:een sitä ennen).
2. KAITEET: ladonta .../halli-215/tyokalut/halli_kaiteet_ladonta.py → .../halli-215/halli-kaiteet-v1/ (ladonta.json: 1708 pylvästä +
   1430 johdetta C2:n g-jalusta-paikoilta; osat.glb = LR:n osat-lod2.glb: pylväs 10 kolmiota, johde-kortti 2 → noin 20 000 kolmiota).
   Pelikoodi: proto-haara natiivi-ui/halli-215 aa6b5a5e7 (pohja pelikoodari/osasarja-215 527beacc0; peilissä
   peili/proto/natiivi-ui/halli-215; worktree /Users/Shared/Claude/wt/proto-natiivi-ui-halli): OsasarjaKaiteetKansio + QA
   `ui juoksupeli palatsi osasarja-kaiteet <kansio>/`, paketti g-jalustan LOD1:n lapseksi (ei tuplaa C2:n LOD0-kaiteita).
   tarkista.sh 0 virhettä. PK:lle kerrottu (vastaa vain, jos vastustaa). Portaiden kaiderivit puuttuvat (osasarja kiertää vain y:n
   ympäri): portaiden pylväät ovat mukana, johteet ei. Kallistus (leikkaus x:n mukaan) vaatisi kokoajaan muutoksen.
3. Codex-tilaus PK:n yhteistilaukseen: .../halli-215/rajaukset/tilaus-taihedian.md (chiwen, Taihedianin 10+1 harjaeläinriviä, harjan
   pinta, kultainen keskiovi; 1067–1070 jo olemassa, ei tuplia). PK vastaanotti; uusi PK lähettää (luovutus PR 5617).

## Käynnissä (taustalla)
- Vertailuajo: zsh .../halli-215/ajo-pari.zsh .../juuri-nui2 .../juuri-ennen > .../halli-215/ajo-pari-2.log (havainne-editori 03 03b,
  REF 527beacc0; juuri-ennen = PK juuri-pk7-v72 + LR v58 -rakennukset, juuri-nui2 = sama + oma g-taihedian). Jonossa yhteisellä
  editorilla PK:n ajojen takana. Tulos: proto-3d/lokit/havainne-editori-<aika>/03 ja 03b.
  HUOM: ensimmäinen ajo (juuri-pk7-v76 + REF 527beacc0) epäonnistui, koska 527beacc0 odottaa kielletty-tausta-v72:ta, jota v76:ssa ei ole.

## Seuraavaksi
1. Tarkista pari: ennen/nyt peli-raaka.png hallin kohdalta täysikokoisena; kohdat 1 (koverat lappeet, nousevat nurkat) ja 2
   (ristikko-ovet joka pylväsvälissä) ok/vika.
2. Kaiteet kuvaan: aja editori ESIKOM:iin lisättynä `;ui juoksupeli palatsi osasarja-kaiteet halli-kaiteet-v1/` ja kopioi
   halli-kaiteet-v1 juuri-nui2:een (juuri-nui2/halli-kaiteet-v1). Kohta 5 ok/vika.
3. Valmis → g-taihedian-polku LR:lle pakettiin, proto-haaran SHA PT:lle ja NS:lle junaan 215 (osasarja-215:n kanssa),
   halli-kaiteet-v1 ämpäriin JU:n kautta (pakettina).
4. Avoin: portaiden kaiteet (kokoajan kallistus, PK:n koodi), Taihedianin kullankeltainen kate on VS:n.

## Lisäys 21.4x (PK)
PK: tee kaiteiden lataus ja näkyvyys itse, pidä LOD1-kaiteet omana pakettinaan. Pohjaksi osasarja-215 **d3585024e** (kokoaja lukee osat-taulun ja ohittaa koe-*-polut) → merge natiivi-ui/halli-215:een ennen paria. Kokoa niputtaa staattisesti pinnoittain (3138 polkua = isot niput, kevyet osat-lod2 pitävät ne pieninä). Testit: Peli-testit JuoksuOsasarjaTestit, MK_OSASARJA=<kansio> oikealle paketille.
