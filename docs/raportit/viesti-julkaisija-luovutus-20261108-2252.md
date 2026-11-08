# Julkaisija: luovutus 8.11.2026 klo 22.52 (korvaa -2045:n; sen ja aiempien OPIT voimassa)

Edellinen: git show d850313b6:docs/raportit/viesti-julkaisija-luovutus-20261108-2045.md
T = /Users/Shared/Claude/julkaisija-tyokalut, L = /Users/Shared/Claude/proto-3d/lokit, jonoloki T/jono-20261103-ilta.txt.

## ALOITA: kaksi nohup-ketjua ajossa (Mac, L1/L2), jokainen ajo kirjoittaa jonolokiin "AJO <tunnus> … rc … kuvia x/y".
Kun rivi tulee: katso kuvat (tai mp4-ruudut arkiksi), tarkista pyydetyt lokirivit, lähetä valmis-rivi tilaajalle (id osoitekirjasta).
- Ketju A T/jono-2240-a.zsh (NUI local_43962c89-fc14-4098-9dd7-6153133ffcea), PISTEKERROIN 0.465:
  1. kameratappi-2 73498d875: iphone, iphone-vaaka (sk-kameratappi-2-iphone.txt), ipad (sk-…-ipad.txt) → L/nui-kameratappi-2-<koko>-73498d875.
     TARKISTUS: "ui kameratappi tila" → "näkyy" (ei "piilossa"), kallistus kasvaa t-1:n jälkeen, suuntima t-2:n jälkeen.
  2. nostokuvat-1 bb0509e46: kuvateksti iphone/ipad, kokoruutu iphone/ipad → L/nui-nostokuvat-1-{kuvateksti,kokoruutu}-<koko>-bb0509e46.
     TARKISTUS: 1) "ui kuvateksti: traileri kuva 1" … "teksti"; 2) "pinnaus: kuva 0 koko näytölle".
- Ketju B T/jono-2240-b.zsh:
  1. (valmis, kuitattu NS:lle) NS fpv-ruskea c7df37d49.
  2. KS topo-sulku-juna-a 84a91d530 ja -b 7de518cde (video toposulku…, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364) →
     L/ks-topo-sulku-juna-{a-84a91d530,b-7de518cde}. KS haluaa ARKIT s. 18,6–20,6 (0,1 s välein, k = s × 50; skripti kuten
     L/ks-topo-sulku-2-f2ad1a19d/ju-arkki-*.jpg). Ratkaisee: toistuuko beige junassa (A), poistuuko + peite häivyttää 250 ms (B).
  3. NS reunapiikit-a 3413b4565 → L/natiiviseppa-reunapiikit-a/ (ohje _tyo/natiiviseppa/reunapiikit/ajopyynto-a.md), NS local_99130238-aa54-4a29-bcc9-7a023584944b.
- Uusi yleisskripti T/mac-yleis.zsh <tunnus> <sha> <skenaario> <koko> <kansio> [pistekerroin] (kuvat + tallenteet, ODOTA_PID).

## JUNA 223 (natiivi-backup julkaisija/juna-223, worktree wt/julkaisija-juna-221)
Kärki 84a91d530 = 30f7090d8 + kierto 135° (524bab612, a6cf36e11) + Louvre-valinta (84a91d530); unity sh 0, Kartta 725/725
(T/juna223-kierto-louvre-*.txt). Ei käännetty laitteelle.
Ehdokas EI POIMITTU (PT päättää): NS pohjapallo-juna 3413b4565 (= 84a91d530 + merge f7cf0bd7c + kytkin). Mac-vertailu tehty:
kytkin pois = 84a91d530 pikselilleen (atlantti/tyyni), peruskartta 0,01–0,02 % kohinaa; listat T/juna223-pohjapallo-3413b4565-*.txt, PT:lle 22.4x.
NUI ipad70 (cf657f1d0 → 79351459b) "junaan PT:n/KK:n sanalla" – ei sanaa vielä.

## Ajettu ja kuitattu tällä vuorolla (kuvat katsottu)
NUI: kierto-1 cb801202c, louvre-valinta-1 2f7df0ced (NRE MuseoTekstuurit.Vapauta sulussa = vanha), lentoraja-6 7bbea110d,
ipad70-1 cf657f1d0, ipad70-2 79351459b, kameratappi-1 2d69ff27e (tappi piilossa, NUI perui).
NS: fpv-osa4 92125fce1 (2 törmäystä 56 km:ssä), fpv-osa4b e152a9959, pohjapallo-juna a/b, fpv-ruskea c7df37d49.
KS: topo-sulku-1 aebf0648e (beige näkyy), topo-sulku-2 f2ad1a19d (peite päällä mutta läpikuultava).

## OPIT
1. VIESTIRAJA: SendMessage pysähtyi 10 viestin jälkeen ("Paused") → mcp__ccd_session_mgmt__send_message session-id:llä toimii (CLAUDE.md).
2. Video-arkki: tallenteen kehykset L/<kansio>/<tallenne>/k-NNNNNN.jpg, fps.txt "50 30" → kehys = s × 50.
3. Pyynnöt tulevat nopeammin kuin ajot: kokoa ketjuksi mac-yleis.zsh:lla, kaksi ketjua (vapaa+portti jakaa L1/L2).

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille (local_afae44f0-722b-4541-a3b8-30ca4f76543b).

## LISÄYS 23.0x (TUOREIN)
- JUNA 223 = 3413b4565 (PT hyväksyi pohjapallon; fast-forward 84a91d530:sta, natiivi-backup julkaisija/juna-223). unity sh 0,
  Kartta 727/727, Linssit 2269/2269 (T/juna223-pohjapallo-*.txt). PT:lle kerrottu. Asemataulu: PT kirjaa.
- KS topo-sulku-juna B 7de518cde EI mene 3413b4565:n päälle (ristiriidat LinssiOhjain.cs 1, Topografia.cs 2, TopografiaTestit.cs 3).
  KS:ltä pyydetty uusi B 3413b4565:n päälle → sitten Mac-pari (A = junan kärki, B = uusi sha) arkkeineen 18,6–20,6 s, ja poiminta
  vasta konfliktit + testit läpi. Ensimmäiset A/B-ajot (84a91d530 / 7de518cde) valmiit L/ks-topo-sulku-juna-*, EI vielä katsottu/arkitettu.
- Ketju A pysäytetty (82088) kameratappi-2-ipad:n (pid 11108) aikana. kameratappi-2 iphone + iphone-vaaka valmiit, ipad ajossa;
  NUI:lle kuittaamatta kaikki kolme (tarkistus yllä).
- Ketju C T/jono-2300-c.zsh (pid 13187): NUI nostokuvat-1 10845cd24 kuvateksti/kokoruutu/tarina × iphone/ipad (korvaa bb0509e46).
  TARKISTUS lisäksi: tarina → "lehden taitto tarina:viimeinen-keisari".
- Ketju B jatkaa: NS reunapiikit-a 3413b4565.
- 23.1x PT: jonoon Mac-pari juoksupeli 1g a7004996e (pelikoodari/juoksu-223) vs 84a91d530, iPad-koko, pari PT:lle (+ kuvat KK:lle
  local_37f7c945 PK:n luovutuksen mukaan). Kiinniottopaikan sivuseinä: keisari juoksee seinän viertä eteenpäin pysähtymättä.
  SKENAARIOTA EI OLE: PK:n luovutus f0b94809a (haara pelikoodari-luovutus-20261108-2255) sanoo vain "juokse avauksesta pohjoiseen ja
  seinien viertä"; _tyo/pelikoodari/juoksu-223/ sisältää vain 1g-selvitys.md. Pyydä skenaario uudelta PK:lta tai kirjoita juoksu-
  lataus-kansion sk-*-mallista (_tyo/pelikoodari/juoksu-lataus/), sitten mac-yleis.zsh kahdesti.

## LISÄYS 23.10 (TUOREIN, nollaus PT:n käskystä 23.10)
Ketju C (13187) pysäytetty 23.0x (NUI: ipad70-3 nostokuvien edelle). Uudet nohup-ketjut T/jono-2305-d … -2325-h (lokit T/jono-*.log):
- D (pid 20411): NUI ipad70-3 233c6d554 ipad, pk 0.465, sk _tyo/natiivi-ui/sk-ipad70-3-mac.txt → L/nui-ipad70-3-ipad-233c6d554, AJOSSA L1
  23.03 (pid 20414). KOE, ei junaan; kuvat ENSIN PT:lle → KK. TARKISTUS: lokissa "muoto näkyvä (… kerrosta …), ruudusta 0.6x–0.7x",
  kierron lopussa "zoomi palaa 1,0"; ND ja Eiffel ~70 % ruudun korkeudesta. Sitten D ajaa nostokuvat-1 10845cd24 loput 5
  (kuvateksti-ipad ajossa, kokoruutu x2, tarina x2; tarkistus yllä).
- E: KS topo-sulku-juna-c 75ee33983 VALMIS 23.09 (mp4 1, 0 virhettä), L/ks-topo-sulku-juna-c-75ee33983; KS:lle kuittaamatta (KS ei tarvitse arkkeja).
- F (pid 27523): NUI pariisipallo-1 a97e8583c iphone+ipad pk 0.465 (sk-pariisipallo-1.txt) ipad70-3:n jälkeen → L/nui-pariisipallo-1-{iphone,ipad}-a97e8583c.
- G (pid 27756): KS topo-sulku-juna-d 21f33d4fc ipad (sk-topo-sulku-juna-d-mac.txt), JUNAAN MENEVÄ versio (KK 22.59) → L/ks-topo-sulku-juna-d-21f33d4fc.
- H (pid 31739): NS reunapiikit-b b2761f67b (AJOSSA L2 23.09) ja -b-3413 3413b4565, ipad (ajopyynto-b.md) → L/natiiviseppa-reunapiikit-b{,-3413};
  NS:lle: shader-virheet/NRE/SIGSEGV + rp-b-atlantti-pois md5 1 vs 2.
Kuittaamatta myös: NUI kameratappi-2 x3 (4/4 kaikki), nostokuvat kuvateksti-iphone 6/6; NS reunapiikit-a 5/5 (md5-eri 4).
Tilaajille kerrottu jonotus (NUI, KS, NS). Valmis-rivi kustakin kun kuvat katsottu.
- I (pid 41594, 23.2x): PK juoksu-223 ac4bff77a (1c+1g+1f) iphone + ipad H:n jälkeen, sk /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksu-223/sk-1f-1g-ju.txt
  (JU kirjoitti: avaus loppuun + ohjaamaton juoksu, tallenne "juoksu") → L/pk-juoksu-223-{iphone,ipad}-ac4bff77a. TARKISTUS: "avaus: OhjausPelaajalle",
  "alkukaanto", ei "seinan edessa" ennen ohjausta. Kuvat + video KK:lle (local_37f7c945) ilman leikkauksia, rivi PT:lle ja PK:lle (local_91a1bc27-6870-46aa-9886-66fd33b68880).
- 23.2x KUITATTU (kuvat katsottu): NUI ipad70-3 → PT (JU-tarkistus.txt kansiossa; KK vain PT:n sanalla) + NUI; NUI kameratappi-2 x3; KS topo-sulku-juna-c;
  NS reunapiikit-a (sse1-kuva sumea = laatat kesken). Kuittaamatta yhä: nostokuvat-1 10845cd24 (kuittaa kaikki 6 kerralla ketjun D lopussa).
- 23.3x: I:n skenaario päivitetty PK:n pyynnöstä (d2 eunukki ovella KK:lle, e OhjausPelaajalle, 4 × "kaanna -1 seina"). Ketju J (pid 46712) I:n jälkeen:
  PK 1g-pari a7004996e vs 84a91d530 iphone-vaaka, sk _tyo/pelikoodari/juoksu-223/sk-1g-sivuseina.txt → L/pk-1g-sivuseina-{a7004996e,84a91d530};
  PT:lle pari a–d + "paikka"-rivien S + "seinan edessa" -rivit. NS reunapiikit-b b2761f67b valmis 23.14 (4/4), kuittaa yhdessä -b-3413:n kanssa.
- 23.2x JUNA 223 = b2761f67b (NS reunapiikit, PT hyväksyi; ff 3413b4565:stä, natiivi-backup julkaisija/juna-223). unity sh 0, Kartta 727/727,
  Linssit 2269/2269 (T/juna223-reunapiikit-*.txt). PT + NS kuitattu. NS reunapiikit-b/-b-3413 kuitattu (atlantti-pois PSNR 100,5 dB).
- KS topo-sulku-juna-d 21f33d4fc valmis 23.22, katsottu: peite 19,1–20,3 s täysi, ei beigeä → PT + KS; poiminta vain PT:n sanalla (kärki nyt b2761f67b).
- Ketju K (pid 54367): NUI tahtikyltit-1 0f62c5656 iphone-vaaka + ipad pk 0.465 D:n ja F:n jälkeen → L/nui-tahtikyltit-1-<koko>-0f62c5656; rivi NUI:lle.
- I:n skenaario = PK:n sk-1f-1g-pk.txt (kopioitu -ju:n päälle, 30 fps). "alkukaanto" ei näy lokissa (PK): tarkista vain "seinan edessa" ei ennen ohjausta.

## LISÄYS 23.35 (TUOREIN)
- JUNA 223 = d1a4419e8 = b2761f67b + merge KS topo-sulku 21f33d4fc (PT:n sana 23.2x). unity sh 0, Kartta 727/727, Linssit 2276/2276
  (T/juna223-topo-*.txt; UI-testit-kansiossa ei ajuria). PT + KS kuitattu. Ei käännetty laitteelle.
- JONO UUSIKSI 23.3x: F (pariisipallo-1-ipad), K, I, J tapettu (omat pid:t). Ketju D LOPPU 23.32.
  * Ketju L (pid 75340, NUI, PT:n järjestys): kameratappi-3 bee8b407b iphone + iphone-vaaka (KIIRE, omistaja 23.20) → ipad70-4 a7866450f ipad →
    pariisipallo-2 5fa61ed04 iphone + ipad → tahtikyltit-1 0f62c5656 iphone-vaaka + ipad → nostokuvat-2-kuvateksti b2a7046da iphone. pk 0.465, sk:t _tyo/natiivi-ui/.
  * Ketju M (pid 75341, PK): orpo ac4bff77a-iphone-ajo (esikatselu 56006 L2, emo tapettu) → M kerää sen lokit/pk-juoksu-223-iphone-ac4bff77a,
    sitten pk-juoksu-223-ipad-0cc5ac36c (PK:n uusi kärki), 1g-pari a7004996e / 84a91d530 iphone-vaaka.
    PK/KK: d2-eunukki-ovella → tarkista eunukin kasvot ovilehden reunalla (kurkistus ~29,0–29,6 s). Kuvat KK:lle, polku + aika PK:lle; 1g-pari PT:lle.
- Kuitattu: NUI nostokuvat-1 kaikki 6 (tarina j-1…j-4 näyttävät samalta → NUI:lle).
