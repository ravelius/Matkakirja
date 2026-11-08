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
