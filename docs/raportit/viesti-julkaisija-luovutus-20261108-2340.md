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
