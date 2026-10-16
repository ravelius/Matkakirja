# Linssisepän luovutus 16.10.2026 klo 23.49 (KOVA RAJA 38 %, Postivahti)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/.
Testit `sh Linssit-testit/kaanna.sh [nimi] </dev/null` (myös Kartta-testit, Peli-testit) worktreessa, tarkistus `zsh tyokalut/tarkista.sh`.
Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 (SIMU NYT), NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832.
OMISTAJAN PÄÄTÖS 22.24: kaikki yhteen junaan ("juna 198" = juna 197). Yöllä yksi simu kerrallaan: SIMU NYT vasta käännöksen jälkeen.
Taustaprosessit: käynnistä AINA `nohup zsh <skripti> > <loki> 2>&1 </dev/null &` (Julkaisija pysäytti 23.41 yhden ajoni lukon takia).

## 1. ENSIMMÄISEKSI: JUNA 197 -ERÄ KÄÄNNÖKSEEN JA SIMULLE (LUKITUS ~01.45)
Haara proto linssiseppa/vapaalento-197 = juna-197 + 6 committia, kärki 8aed785c3 (worktree wt/proto-linssiseppa-vapaalento):
- 8c3d2b294 VAPAA LENTO MATALALLA (omistaja 23.13): valittu korkeus oikealla tapilla, nousu rakennuksen yli ajoissa ja paluu valittuun,
  eteneminen ei pysähdy (esteet hidastavat ≥ 30 %:iin), alaraja 15 m kameran alta (ennen 40 m naapuruston katoista), luotain vain 8 m:n
  käytävässä ja AlasVaraM 10, 0,3×-hidastus pois, vähimmäisvauhti 12 m/s. Linssit-testit 1940/1940 (uudet MatalaLentoKorttelinYliJaTakaisin,
  ValittuKorkeusPysyy, SivunTorniEiNostaKatulennolla, LuotainHidastaaJaNostaaEiPysayta). Syyrivi PT:lle lähetetty.
- 7ca06e736 KIPIN SELITTEET POIS (23.18): nimikortti, metrokartta ja kohdelista pelkällä nimellä (Mikä tämä on: etäisyys jää).
- 7cbf392fb KAASUVIPU (23.17): lentopelin KAASUVIPU-pohja (lentopeli.uss .mk-lento-vipu, peili --vasen) vasempaan reunaan, askeleet TÄYSI ×3 ·
  PUOLI ×1 · HIDAS ×0,5, napsahdus askeleeseen. PT 23.40: messinkikahvaa EI tilata. (Lisäksi .mk-saadin--pysty-nupin top 0 -korjaus.)
- d0ef6dad3 KOMPASSIKAAPPI (23.14): jalusta + jalka + kosketusvarjo korin reunalla (nosto "tolpan varassa" ilman tolppaa oli syy),
  lämmin lamppu lasikuvun alareunassa (PalloKori.shader _Lamppu/_Hehku, _KompassiLamppu), heijastus lasissa. VARJOSTIN EI OLE VIELÄ
  KÄÄNNETTY: tarkista kuvista K1/K2 (ei pinkkiä, lamppu ja jalusta oikeissa kohdissa; paikat arvioitu, GLB:n lasin mitat ~0,05 m).
- d6a90e813 + 8aed785c3 RANSKAN MUSEO PARIISISTA (omistajan päätös 23.35): KaupunkiPallot toinen museomerkki "taidemuseo-pariisi" (Louvre
  48,8606/2,3376, sama pienoismalli, MaaLouvreM 78) → MuseoMaa.Aseta(ranska) → linssi. Lähestymisteksti Sisältökirjurilta (dd9f85786),
  luonnos true. Houkutin EI tähän junaan (pallo peittää; PT 00.0x hyväksyi, ks. kohta 2).
- b9acbc66a LOUVREN AVAUS KIINNI (OMISTAJAN PÄÄTÖS 23.53 kumoaa 23.35:n, PT 00.3x): Pariisin museo avataan vasta, kun Ranskan museo on
  samalla tasolla kuin Alankomaat ("Kun puutteet on korjattu"; puutteet: SK kohdat.json + lähestyminen, Äänittäjä askeläänet). Nimi "Louvre".
  Reitti (d6a90e813 + 8aed785c3) mukana junassa 197, mutta KaupunkiPallot.PariisiMuseoAuki = false; QA avaa `linssi museo pariisi 1`
  (sk-pariisimuseo-197-iphone.txt tekee sen). Ajot käynnistetty uudelleen 23.54 tällä kärjellä (edelliset olivat kuolleet jonossa).
TILA 23.54: ajo-vapaalento197.zsh (kärki b9acbc66a) odottaa käännöslukkoa (jonossa PK:n intro ja SS; Julkaisija pitää odottajaa SIGSTOPissa, jatkuu itse).
Loki ajo-vapaalento197.log / kaanna-vapaalento.out. Perään odottaa ajo-pariisimuseo197.zsh (ajaa museoskenaarion heti "SIMU ALAS":n jälkeen).
Jos prosessit puuttuvat (`pgrep -fl vapaalento`), käynnistä nohupilla uudelleen: ensin ajo-vapaalento197.zsh, sitten ajo-pariisimuseo197.zsh.
Kun lokissa "VAPAALENTO VALMIS <sha>": SIMU NYT Julkaisijalta iPhone BD64C8E4 (kaksi skenaariota, ~15 min) → `touch .../simu-vapaalento.nyt`.
Skenaariot sk-vapaalento-197-iphone.txt (V0 nimi, K1/K2 kompassi päivä/yö, V1/V2 vipu, V3 matala, video vapaalento-matala) ja
sk-pariisimuseo-197-iphone.txt (p1 kartta, video pariisi-museo, p2 lähestyminen, p3 Ranskan sali). Tulokset lokit/todistus-vapaalento197-iphone-*
ja todistus-pariisimuseo197-iphone-*. Ajon jälkeen SIMU VAPAA Julkaisijalle.
Kuvat ja videot _valmiit/<aihe>-20261016/ → PT (3 riviä) → PT:n kuittauksella 8aed785c3 NS:lle junaan 197. Jos jokin osa on rikki: vain
se osa pois (git revert), ei väliaikaisia poikkeamia.

## 2. SEURAAVA JUNA
- LOUVREN AVAUS PARITEETIN JÄLKEEN: kun PT ilmoittaa SK:n (kohdat.json + lähestyminen) ja Äänittäjän (askeläänet) valmiiksi ja Ranskan
  museon Alankomaiden tasolle, oletus PariisiMuseoAuki = true (KaupunkiPallot.cs) + houkutin samaan erään, kuvat PT:lle, sitten NS.
- Pariisin museon houkutin PALLON VIEREEN (avauksen yhteydessä, ei ennen): proto linssiseppa/pariisi-houkutin 7266f0ae1 (8aed785c3:n päällä; worktree wt/proto-linssiseppa-houkutin): vapaa piste
  1,2° itään Pariisista (0,4–0,8° jää pallon alle), Kartta-testit läpi. Louvren oma pienoismalli LR:n mallista myöhemmin (PT).
- Peking V8 Codexilta odottaa (V7-arvio f8c315589); V6:n AO-arvio avoin.
- Kortin lasihäivytys Kiinan nauhassa: NUI:n ja PT:n päätös (yhteinen lasipohja), ei minun.

## 3. MUUT
- Kiinan filminauha 548a4dabe + 78a2b34a4 NS:llä junassa 197 (juna-197 23cd9bffd). Kuvat _valmiit/kiinan-dynastiat-pallo-20261016/nauha/.
  Käyttämätön haara linssiseppa/kiina-nauha-esittely 07e92803e (PT perui mustan esittelyn ehdon).
- Worktreet: proto-linssiseppa-vapaalento, -houkutin, -kiina, -kooams, -museo198, -kerrospiilo ja vanhat. _tyo/linssiseppa: vapaalento-app (uusi),
  kiinanauha-app, kerros-app, peking360/v6, v7.
- tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261016-2349.md).
Ensin: `pgrep -fl vapaalento; tail -3 ajo-vapaalento197.log kaanna-vapaalento.out` linssiseppa-ajot-kansiossa → kohta 1.
