# Julkaisija: luovutus 8.11.2026 klo 23.40 (korvaa -2252:n; sen OPIT 1–3 ja aiemmat voimassa)

Edellinen: git show 7dcf3803e:docs/raportit/viesti-julkaisija-luovutus-20261108-2252.md
T = /Users/Shared/Claude/julkaisija-tyokalut, L = /Users/Shared/Claude/proto-3d/lokit, jonoloki T/jono-20261103-ilta.txt.
Yleisskripti T/mac-yleis.zsh <tunnus> <sha> <sk> <koko> <kansio> [pk]; jokainen ajo kirjoittaa jonolokiin "AJO …".

## JUNA 223 = d1a4419e8 (natiivi-backup julkaisija/juna-223, worktree /Users/Shared/Claude/wt/julkaisija-juna-221)
= 3413b4565 + NS reunapiikit b2761f67b (ff) + merge KS topo-sulku 21f33d4fc (PT:n sanat 23.2x). unity sh 0, Kartta 727/727, Linssit 2276/2276
(T/juna223-topo-*.txt). PT, NS, KS kuitattu. Ei käännetty laitteelle.

## AJOSSA (nohup-ketjut, kaikki JU:n omia pid:itä)
- L (75340, NUI, PT:n järjestys, pk 0.465, sk:t _tyo/natiivi-ui/): kameratappi-3 x2 VALMIS+KUITATTU (NUI+PT) → ipad70-4 a7866450f ipad →
  pariisipallo-2 5fa61ed04 iphone+ipad → tahtikyltit-1 0f62c5656 iphone-vaaka+ipad → nostokuvat-2-kuvateksti b2a7046da iphone.
  Kansiot L/nui-<nimi>-<koko>-<sha>. Rivi NUI:lle (local_43962c89-fc14-4098-9dd7-6153133ffcea) kustakin kuvat katsottuna; ipad70-4 KOE → kuvat ensin PT:lle.
  ipad70-3:n tarkistus (edellinen luovutus): "muoto näkyvä … ruudusta", "zoomi palaa 1,0", ND/Eiffel ~70 % ruudusta (-3:ssa Eiffel 65 %, ND 50–60 %).
- O (91117, NUI): L:n jälkeen nostokuvat-1b-tarina 10845cd24 iphone+ipad (sk-nostokuvat-1b-tarina.txt, vieritys "ui nostonappi vierita", j-1…j-5:n pitää ERota).
- M (75341, PK local_91a1bc27-6870-46aa-9886-66fd33b68880): pk-juoksu-223-ipad-0cc5ac36c AJOSSA L2 23.34 (sk _tyo/pelikoodari/juoksu-223/sk-1f-1g-ju.txt
  = PK:n sk-1f-1g-pk) → 1g-pari a7004996e / 84a91d530 iphone-vaaka (sk-1g-sivuseina.txt; PT:lle pari a–d + "paikka"-rivien S + "seinan edessa").
- N (88799, NS local_99130238-aa54-4a29-bcc9-7a023584944b): ajoennakko pois/päällä fd8193758 ipad (KOE) → L/natiiviseppa-ajoennakko-{pois,paalla}; rivi NS:lle.

## PK juoksu-223: SKENAARIOVIKA (PK:lle kerrottu 23.35, odottaa vastausta)
iPhone ac4bff77a (L/pk-juoksu-223-iphone-ac4bff77a, katsottu): kaikki oleta-uusi (OviAukeaa…seinan edessa) PUUTE, koska tapahtumat
olivat lokissa ennen odotusta → kuvat b–e ja d2 = keisari jo kujan päässä seinällä. Eunukkikuvaa (KK:n pyyntö) EI saatu. 1g toimii:
kaanna -1 seina → S 22,8 → 64,1 länteen, "seinan edessa v1 z64". "seinan edessa" vasta ohjauksen jälkeen (ok). iPad 0cc5ac36c toistanee vian.
KK:lle ei lähetetty (d2 puuttuu); PK päättää: korjattu sk → aja iPhone+iPad uudelleen; d2:sta tarkista eunukin kasvot ovilehden reunalla.
Kuvat KK:lle (local_37f7c945-e1a0-4638-90b8-93c389a36fbe) ilman leikkauksia, polku + aika PK:lle.

## KUITATTU tällä vuorolla (kuvat katsottu)
NUI ipad70-3, kameratappi-2 x3, kameratappi-3 x2, nostokuvat-1 x6; KS topo-sulku-juna-c, -d; NS reunapiikit-a, -b, -b-3413.
Peruttu: NUI pariisipallo-1-ipad (tilalle -2); pariisipallo-1-iphone ajettu mutta kuittaamatta (korvautui).

## OPIT
4. Kun tapat odottavan jonoketjun, tarkista orvot lapset (ps -axo pid,ppid,command | grep mac-yleis/esikatselu-rungolla): emo pois → ajo jatkuu
   ilman keräystä. Kerää käsin ESIKATSELU VALMIS -kansiosta (ks. T/jono-2330-m.zsh) tai anna ketjun kerätä.
5. Esikatselun tallenne hidastaa peliaikaa: oleta-uusi voi myöhästyä tapahtumista → PUUTE. Kuvat tarkistettava, ei vain "kuvia x/y".

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille (local_afae44f0-722b-4541-a3b8-30ca4f76543b).
Seuranta: tail -f jonoloki | grep " AJO \|LOPPU\|VIKA" (Monitor).

## LISÄYS 23.4x (TUOREIN)
- Ketju P (PK): M:n jälkeen sk-1f-1g-pk2.txt 0cc5ac36c iphone (pysty) + ipad → L/pk-juoksu-223-pk2-{iphone,ipad}-0cc5ac36c. Lokissa EI saa olla PUUTE-rivejä.
  Valitse d2a/d2b/d2c:stä se, jossa eunukin kasvot näkyvät ovilehden reunalla → KK:lle (ilman leikkausta), polku + aika PK:lle.
  Vanhoja ac4bff77a- ja M:n ipad-0cc5ac36c-kuvia EI KK:lle (vanha sk). Syy (PK): avauksen kello kulkee tallenteessa reaaliajassa.
- 23.45: JUNA 223 = 2f2e13352 = d1a4419e8 + merge NUI kameratappi bee8b407b (PT 23.4x; vain tappi, 3 commitia, 9 tiedostoa). unity sh 0,
  Kartta 727/727, Linssit 2276/2276, Peli 874/874 (T/juna223-tappi-*.txt). PT + NUI kerrottu.
- Kuitattu: NUI ipad70-4 a7866450f → PT + NUI (mitattu 0,63–0,71, Eiffel ~70 %, ND ~75 %). M:n vanha iPad 0cc5ac36c valmis (PUUTE 5, ei KK:lle).
- Ketju L jatkaa: pariisipallo-2 → tahtikyltit-1 → kuvateksti-2. M: 1g-pari. Sitten O (tarina-1b), N (ajoennakko), P (pk2).
- Ketju Q (NUI): kuvateksti-3 cd99695f8 ipad pk 0.465 L:n jälkeen → L/nui-kuvateksti-3-ipad-cd99695f8 (kuvateksti-2 iphone pysyy L:ssä). PK 1g a7004996e valmis 4/4 PUUTE 0, odottaa paria 84a91d530.
- 23.5x: NS ajoennakko pois/päällä VALMIS ja kuitattu PT + NS (ketju N LOPPU).
- 23.5x: koehaara natiivi-backup julkaisija/koe-lentoraja-ajoennakko = fd8193758 (PT: ajoennakko kokeena lentoraja-6:n rinnalle, ei junaan; raidat = Atlantin selänne). PT + NS kerrottu.
- 23.5x: Q peruttu → Q2 (pid 21710): NUI kuvateksti-3 836ded6c6 iphone + ipad, sk-kuvateksti-3.txt, pk 0.465, L:n jälkeen → L/nui-kuvateksti-3-{iphone,ipad}-836ded6c6. L:n kuvateksti-2 b2a7046da ajetaan silti (tarpeeton, ei kuittausta tarvita). pariisipallo-2-iphone valmis 5/5, kuittaa ipadin kanssa.
- 23.5x: pariisipallo-2 x2 kuitattu NUI + PT. Ketju R: NUI pariisipallo-3 a41325c95 iphone pk 0.465 (sk-pariisipallo-3.txt) heti vapaalle linjalle → L/nui-pariisipallo-3-iphone-a41325c95.
- 00.0x: pariisipallo-3 a41325c95 iphone kuitattu NUI + PT: ODOTUS EI TÄYTY (pallo/köydet "Concorden aukio" -kyltin päällä, kori rakennusten päällä).
  tahtikyltit-1-iphone-vaaka 6/6 valmis 23.59 (kuittaa ipadin kanssa; ei vielä katsottu). Odottaa yhä: tahtikyltit-ipad, kuvateksti-2 (tarpeeton),
  Q2 kuvateksti-3 x2, O tarina-1b x2, M 1g-pari 84a91d530 (a7004996e valmis 4/4) → PT:lle pari, P pk2 x2 → d2 KK:lle.
- 00.0x: tahtikyltit-1 x2 kuitattu NUI:lle (Orsay ok; Palais de l'Industrie -kylttiä ei g-1:ssä; Chaillot-nimeä ei näy t-1:ssä).
- Ketju S: NUI pariisipallo-4 2233e740c iphone pk 0.465 → L/nui-pariisipallo-4-iphone-2233e740c. Odotus l-1: pallo -2:n paikalla, Concorden kyltti häipynyt pallon alta.
- 01.5x (nollauksen jälkeen): kaikki ketjut L–S LOPPU 00.37, ei ajoja. Kuitattu: PK pk2 iPad PUUTE 0 → d2a KK:lle + PK; iPhone PUUTE 1 (OviAukeaa).
  1g-pari EI vertailukelpoinen (84a91 "seinan edessa" PUUTE, käännös s 9,5 etelään) → PT + PK. NUI pallo-4, tarina-1b x2, kuvateksti-3 x2 → NUI + PT
  (kuvateksti-3 iPad koko 0,87×, odotus ≥ 0,9). JONO TYHJÄ PT:lle.

## LISÄYS 9.11. 07.2x (TUOREIN; konteksti 26 % → nollaus)
- JUNA 223 = 835f617a6 (natiivi-backup julkaisija/juna-223), PT kuitannut asti 83e635e63; 835f617a6 kerrottu PT:lle (testit vihreät, T/juna223-kt5-*.txt).
  Ketju: 2f2e13352 + NUI a7866450f, 5fa61ed04, 0f62c5656 (f844a2d82) + 2233e740c, 10845cd24, 836ded6c6 (cc17d1aae) − revert 836ded6c6/cd99695f8/b2a7046da
  (OMISTAJAN PÄÄTÖS 06.43: ei kuvatekstiä kertojan kuviin → 83e635e63) + ff 835f617a6 (kuvateksti vain avattuun, KK 06.54). Worktree /Users/Shared/Claude/wt/julkaisija-juna-221.
- OPPI 6: kill -9 ajoketjulle jättää /tmp/matkakirja-kaannospalvelu[-2].lukko (+ /tmp/ju-portti.lukko) → seuraavat ketjut odottavat ikuisesti
  (V ja W jumissa 02.0x–06.44). Tapon jälkeen: tarkista lukon pid (cat lukko/pid), jos kuollut ja oma → rm kuka pid + rmdir. Käynnistä ketjut nohupilla.
- Kuitattu tällä jaksolla: PK 1g-ennen 84a91d530 (PT+PK), PK d2-ovikuva 451519f87 x3 (pysty EI, vaaka+iPad ok → PK), NUI nostovalikko-1 iphone,
  -2 x3, -3 x2 (Tanger seututasolla isona: NUI tarkistaa), -4 (NUI näki itse), kuvateksti-4 (NUI+PT).
- AJOSSA (07.20): ketju Z NUI nostovalikko-4-iphone 3925d008d (ipad valmis 07.19; NUI on nähnyt kuvat); ketju AA (nohup, jono-0720-aa.zsh) PK d2-ovikuva
  4c1d100a2 iphone → iphone-vaaka → ipad, kansiot L/pk-d2-ovikuva-<koko>-4c1d100a2 → polut + aika PK:lle (local_91a1bc27-…), PK katsoo "ovikuva"-rivit itse;
  ketju AB (nohup, jono-0725-ab.zsh) NUI nostovalikko-5 97067848d iphone → vaaka → ipad, sk-nostovalikko-5.txt → kuvat katsottuna NUI:lle (odotukset sk:n alussa).
- 07.2x: ketju AB peruttu ennen alkua; tilalle ketju AC (nohup, jono-0725-ac.zsh) NUI nostovalikko-6 76aa7c1c6 iphone → vaaka → ipad, sk-nostovalikko-6.txt
  (omistaja 07.21: pilleri 🔍:n vasemmalle) → kuvat katsottuna NUI:lle. Ketju Z valmis (nostovalikko-4 x2; NUI nähnyt). Ajossa vain AA ja AC (nohup).
- 07.5x (ennen omaa nollausta, PT 07.4x; juna 223 = 835f617a6): ketju AA (4c1d100a2) LOPPU 07.29 – iphone 5/5, vaaka ja ipad 0/5
  (PK muutti sk:ta kesken, uusi rivi `ui juoksupeli kuvasuhde laite`). Tilalle ketju AD (nohup, jono-0731-ad.zsh) PK d2-ovikuva 281093d9c
  (haara natiivi-backup/pelikoodari/juoksu-223) iphone → vaaka → ipad, kansiot L/pk-d2-ovikuva-<koko>-281093d9c → polut + aika PK:lle.
  Ketju AC: nostovalikko-6 iphone 5/5 ja vaaka 5/5 valmiit (07.26/07.29), ipad alkoi 07.48 L1 → kaikki kolme katsottuna NUI:lle.
  Oppi: /tmp/ju-portti.lukko jäi 07.28–07.48, kun tapoin mac-yleis-kopion (= portin `sleep 60; rmdir` -aliprosessi). Älä tapa sitä; jumissa: rmdir oma lukko.
- 07.51: ketju AC LOPPU, nostovalikko-6 ipad 5/5 (kaikki kolme 5/5, PUUTE 0) → seuraava JU katsoo ja vie NUI:lle. Ajossa vain AD.
- 08.12: ketju AE (NUI nostovalikko-7 c6d66b491, T/jono-0756-ae.zsh) LOPPU 08.04, kaikki 3 kokoa 5/5, virheitä 0 → ilmoitettu NUI:lle 08.0x.
  Ketju AF (NUI nostovalikko-osa2-1 474011364, ipad → iphone → vaaka, 5 kuvaa, KOE EI JUNAAN, T/jono-0800-af.zsh) alkoi 08.04 L2;
  lokit L/nui-nostovalikko-osa2-1-<koko>-474011364 → seuraava JU tarkistaa jonolokin AJO-rivit ja ilmoittaa NUI:lle (local_43962c89-…).
  a3588fe08:aa EI ajettu (NUI vaihtoi sha:n). AD (PK) ajossa L1.
- 08.2x: PT 08.15 (KK:n sana d2:lle) → 3 commitin poiminta ristiriidassa; PT valitsi A = koko 7 commitin ketju (9f2e57b71 a7004996e ac4bff77a
  0cc5ac36c 451519f87 4c1d100a2 281093d9c), mutta odottaa KK:n sanaa 1c:stä ja 1f:stä. Valmiina PAIKALLISESTI juna-worktreessa 38e803198 (EI pushattu),
  testit vihreät (T/juna223-d2-*.txt: Kartta 729, Linssit 2276, Peli 877, unity 0). Sanan tultua: push natiivi-backup julkaisija/juna-223 → kärki PT:lle.
  Juna 223 virallisesti yhä 835f617a6.
- 08.2x: AF2-vaaka 474011364 kuoli kesken (lukko poistettu); ketju AG 092345d80 osa2-1 vaaka + nostovalikko-7 ipad valmis 08.25, katsottu → NUI + PT. JONO TYHJÄ.
- 08.3x: KK:n sana 08.31 → JUNA 223 = 38e803198 pushattu (natiivi-backup julkaisija/juna-223), kerrottu PT:lle. NUI nv7-ipad 315a07d47 (ketju AH) katsottu → NUI. JONO TYHJÄ.
- 08.5x: OMISTAJAN PÄÄTÖS 08.32 (PT) perui 1f:n, d2:n ja kuvasuhteen → JUNA 223 = c111c4adf (38e803198 + 5 revertiä; puu = 835f617a6 + 1c + 1g), testit vihreät
  (T/juna223-1c1g-*.txt), kerrottu PT:lle. NUI ketjut AI (a7869ef66) ja AJ (d396cbcbf) x3 valmiit 08.55, katsottu → NUI + PT.
  ODOTTAA PT:n sanaa: poimi natiivi-ui/nostovalikko-juna223 = 4e972eeed (rebasattu c111c4adf:n päälle, 11 commitia) junaan 223 → testit → kärki PT:lle.
- 09.0x: PT:n sana → JUNA 223 = 4e972eeed (ff c111c4adf + NUI nostovalikko 11 commitia, ilman osaa 4), testit vihreät (T/juna223-nv-*.txt), PT + NUI kerrottu. JONO TYHJÄ.
- 09.5x LISÄYS (TUOREIN; konteksti 25 % → nollaus). JUNA 223 = 4e972eeed (ei muutosta). Levy siivottu 14 → 45 Gi (6 laitekäännöstä + ns-muisti-*/puu pois).
  Valmiit ja raportoidut: NUI paikkapalkki-1 f9f93385f x3 (p-3–p-6 EI toiminut → NUI korjasi), PK suunta-vasemmalle 84521ba9b x3 → PK (iPhone PUUTE 1 aikaraja, kuvat ok).
  AJOSSA (nohup, kaikki omia): AM (jono-am.zsh, NS matkalento 5ca18c629 ipad → L/natiiviseppa-matkalento; ml-0…ml-6 + tallenne; rivi NS:lle
  local_99130238-…, NS katsoo ennen PT:tä; odotus lokissa "matkalento: … kesto ~4,6 s, huippu ~810 km", ¼/½/¾ ruutu täynnä karttaa).
  AN2 (jono-an2.zsh, NUI paikkapalkki-1 d87530c60 ipad → iphone → vaaka, sk päivitetty (p-5a-paluulento), lokissa "nosto … avattu kartan reitillä")
  → katsottuna NUI:lle + PT:lle (KOE, kuvat ensin PT:lle). AN (81b70a14b) peruttu ennen alkua.
  AO (jono-ao.zsh, PK kattokaistale 84521ba9b iphone → L/pk-kaistale-iphone-84521ba9b) → PK:lle.
  Seuranta: grep -E "AJO|LOPPU" jonoloki. NUI/PT: Ranskan tasolla pilleri radiokaistan päällä = hyväksytty asettelu (NUI), ei vika.

## LISÄYS 9.11. 10.4x (TUOREIN; tilinvaihto 09.5x sami.reivinen@vvi.fi, konteksti 25 % → nollaus)
- UUDET SESSIO-ID:t: NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b, PK local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870,
  VS local_5ebb0658-96f6-434d-8a38-b122eb53032f, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. JUNA 223 = 4e972eeed (ei muutosta). PR 6511 (PT docs) yhdistetty 1c300453a.
- Valmiit + raportoidut: PK suunta 84521ba9b x3 → PT; NUI paikkapalkki-1 d87530c60 x3 ja 91d517091 x3 → NUI + PT (huomiot: iPhone pysty pelin yläpalkki lennossa,
  RANSKA-teksti puuttuu pikkukartasta, "huippu 0.0 km"); VS AP (vesikerros2 92f93a82f, kohoilmavalo pohja/ilma/valo) → VS; PK kaistale2 e4a5b8af7, kaistale3 764e5c329,
  kaistale4 764e5c329, suunta-iphone f6824ffc2 (PUUTE 1 aikaraja), suunta-vaaka 06d003a24 (PUUTE 4, kuvat EIVÄT kelpaa → PK teki oleta-seur) → PK;
  NS matkalento-ennakko 6ad986961, fpv-latauskuva a88e3648b x2 → NS; NS:n fpv-drone-latauskuva-vienti-20261109 viety ämpäriin 10.25 (2/2) → NS.
- AJOSSA / JONOSSA (nohup, omia): AX (jono-ax.zsh) VS kohorae 90711141e L1 → lokit/linssiseppa2-kohorae-90711141e → rivi VS:lle;
  BC (jono-bc.zsh) VS vesikerros2 edc2820a3 AX:n jälkeen → rivi VS:lle, Shader-error erikseen (varjostin muuttui);
  AY (jono-ay.zsh) PK suunta 1ceb5e35e iphone-vaaka (L2 10.45) → ipad → lokit/pk-suunta-<koko>-1ceb5e35e; tarkista "ohjekaista"-lokirivi ja PUUTE 0 → PK + kuvat PT:lle;
  BD (jono-bd.zsh) NUI paikkapalkki-1 vaaka uusinta 91d517091 → lokit/nui-paikkapalkki-1-iphone-vaaka-91d517091-2 (p-6: "pelaaja liikutti … ei paluuta") → NUI;
  sitten NUI fpv-napit-1 8a9c891fc ipad + iphone → lokit/nui-fpv-napit-1-<koko>-8a9c891fc (fn-2: ei pelin yläpalkkia, yksi ☰, pallo nappien alla) → NUI + PT.
- OPPI 7: ketjun vaihto ennen alkua: tapa jono-*.zsh JA sen mac-yleis-lapsi vain kun lapsella on pelkkä `sleep 5` (vapaa-silmukka), ei esikatselua; lukkoon ei koske.
