# Julkaisija: luovutus 5.11.2026 klo 15.02 (Macin kello), konteksti noin 34 %

Rooli: Julkaisija (JU). Korvaa -1245:n ALOITA-osan; sen omistajan päätökset, VIRHEET ja OPIT sekä -1130:n ja aiempien OPIT ovat voimassa. T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt (lue 30 viimeistä riviä).

## ALOITA TÄSTÄ
1. L1: oma ajo NS matka2 f446775c8 (T/mac-ajo.zsh, loki T/natiiviseppa-matka2-f446775c8.log, kansio lokit/natiiviseppa-matka2-f446775c8). Tarkista ps ja lokin viimeinen rivi: jos AJETTU, kansion polku NS:lle (local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870). Jos nollaus katkaisi sen, aja uudelleen samalla rivillä.
2. L2: NUI:n oma aja4 d5850ff4e. NUI ajaa sen jälkeen itse kylttinsä df14fbde4 samalla vuorolla ja antaa rivin. Horisontti pois jonosta, NUI pyytää uuden.
3. Jono vapaille linjoille tässä järjestyksessä (kääreet valmiina, <linja> = 1 tai 2):
   - VS portaat5: zsh T/mac-ajo.zsh <linja> f028eb320 /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pariisi-tyyli/striimi/pariisi-viat/sk-portaat5.txt julkaisija-pariisi-portaat5-f028eb320
   - VS portaat6 (KK odottaa): zsh T/mac-ajo.zsh <linja> 8abcf1931 .../pariisi-viat/sk-portaat6.txt julkaisija-pariisi-portaat6-8abcf1931
   - VS Alpit (PT: ennen lukitusta): zsh T/vs-alpit.zsh <linja>
   - LAV lisä: zsh T/lav-yhd3-lisa.zsh <linja>; loppurivi YHD3 LISA AJETTU LAV:lle (local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e) PUUTE- ja 404-määrien kanssa
   - PK 85e25c213, n. 9 min, oma ajo: "ESIKATSELU NYT" + linja (local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7)
   VS:lle (local_5ebb0658-96f6-434d-8a38-b122eb53032f) rivi ja kansio jokaisesta. Jos rooli pyytää vuoroa uudella shalla, tarkista pyytäjän viimeisin viesti.
4. Yhteenveto Pariisin ajoista: omistaja haluaa kuvat KK:lle heti; rooli katsoo ja lähettää. JU kertoo vain polun (2.214).

## OMISTAJAN PÄÄTÖKSET TÄNÄÄN (sitovat)
- 13.24 (2.214): Pariisin Mac-ajot jonon kärkeen; kuvien polku heti ajon tilanneelle roolille. Ei iPad-ajoja eikä mittauksia (2.209).
- 14.04 (KK): pieni iPad 00008142 päivitetty, MK kehitys = KS 661377bbb, asennettu 14.11 (T/pieni-nahtavyydet.zsh <sha>, ei testiajoa). Laitteella ei ole kartta-osat-kansiota; ei käynnistetty.
- 14.44 (PT): pieni iPad seuraavan kerran vasta erässä: kallistus (NS), vain uudet 3D-kohteet (KS), kyltit ja horisontin nimet (NUI). Ei asennusta ennen PT:n tai KK:n sanaa. Korvaa 14.04:n "saman tien".
- 14.55: korvasi kallistus 90 -ohjeen; NS perui kallistus90-ajonsa, NUI horisontin ca88b1830:llä.
- 12.17 (4.42) yhä: ei lippua Pariisin haaraan, lippu- ja palmuajot odottavat.

## TEHTY TÄLLÄ VUOROLLA (12.47–15.02)
- NS k79 ja kallistus (koehaara poistettu sanalla, kansio f485dd4bc jää), kierto ea82b8bb5, d4f1fe9db, 9b160d652, c0217caf9, jaa ja matka f446775c8, liiku d5850ff4e.
- VS portaat 7068e23a4, 8f46b4e74, caa2c0918, f028eb320; KS saari c4e65c800 ja 661377bbb, hotelli ja pariisi3d 7516b44ee; LAV yhd, yhd2; PK ja NUI omat ajot.
- Merget: PR 6276 (PT:n luovutus, ei testiajoja), PR 6273 (KS, vihreä).
- Vienti: hero-pariisi-louvre.jpg ja hero-pariisi-riemukaari.jpg julisteet/herokoe/ 13.49; 200 ja SHA täsmäävät; TF 217 ja TF 218 eivät viittaa niihin. PT ja NUI kuitattu.

## AUKI
- LAV YHD3 katkesi 30 min:n aikarajaan 14.55: 35/40 kuvaa yhd3/kuvat; lisäajo jonossa kattaa puuttuvat 5 ja tk-kaide-kauko-lod1. Täysi 40 kuvan ajo voi ylittää aikarajan, kun L2 pyörii samalla.

## VIRHEET, JOTKA EIVÄT SAA TOISTUA
- Ilmoitin ensin väärän omistajan PR-linkissä (vvi-fi); repo on ravelius/Matkakirja. Älä arvaa, katso gh:n tulosteesta.
- Annoin L2-NYT:n roolille, joka ei käynnistänyt: L2 oli joutilaana minuutteja. Kysy tai käytä linja lyhyelle Pariisi-ajolle; esikatselu.sh odottaa lukkoa, joten päällekkäisyys ei riko mitään.

## OPIT
- Esikatselu-ajon tappo omilla pid:illä (ensin ketjun zsh:t, sitten Unity) jättää lukot, mutta seuraava ajo poistaa ne, koska pid on kuollut. Reset ajetaan seuraavalla ajolla.
- T/mac-ajo.zsh <linja> <sha> <skenaario> <kansio> on yleinen kääre; loki T/<kansio>.log.
- Ajo uudessa pelissä: "saapuminen: FRA … 1351.9 km" voi tulla toisen kerran noin 50 s alusta; tarkista järjestys ajan suhteen. Rooli voi tarvita kaksi ajaa (ensimmäinen uhri).
- Laitekäännös 661377bbb kesti noin 3 min, kun kopio oli lämmin.
- Pieni iPad = 00008142, iso = 00008103. ipad-lukko.sh on puussa wt/julkaisija-pariisi-219/tyokalut/, ei T/:ssä.
