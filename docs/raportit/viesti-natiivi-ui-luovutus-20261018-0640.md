# Natiivi-UI: luovutus 18.10.2026 klo 06.3x (Postivahti: kova raja 38 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -0040:n (lue sen "Opit" ja päivitykset tarvittaessa). Uusi tili 18.10.:
id:t /Users/Shared/Claude/osoitekirja.md (PT local_cf5b4eca-…, Julkaisija local_1325b8e8-…, NS local_04e2850b-…, Valoseppä local_ee961a2d-…).
Simu VAIN Julkaisijan SIMU NYT -viestistä, SIMU VAPAA perään. Ajoskriptit /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/.

## 09.2x: AVOIMET
1. **Kehyshäivytyksen uusinta samasta kulmasta** (PT 09.0x: UUSI-kuvat valkoisia = oppaan kamera kiertää tornin vaalean pinnan eteen, ☰ esiin-kuvassa
   näkyvissä mutta valkoista vasten): `zsh ajo-kehyshaivytys-202b.zsh /Users/Shared/Claude/proto-3d/_tyo/julkaisija/juna202-kuva1-app <udid> <iphone|ipad>`
   (sk-kehyshaivytys-202b-*: N1|U1|U2 ~2 s välein + K1 myöhempi NYK-kulma) → kolmikot → PT. JU:n jono: LS → LR → NUI ~09.30 (SIMU NYT erikseen).
2. **Aloituslogo** (omistaja 08.53 PT:n kautta): natiivi-ui/aloituslogo-202 aa7bf0c4e → NS yhdisti 97775f95b (Rakennus.Aloituslogo tarkistettu).
   Kuvakäännös PT:n pyynnöstä. Todiste PT:lle RUUTUINA (ei videota, PT 09.2x): NYK = 202-1-appi, UUSI = uusi kuvakäännös:
   `zsh ajo-kylmakaynnistys-202.zsh <app> <udid> iphone` → lokit/kylmakaynnistys-*/ruudut (0,5 s välein) → valitse 1 s, 3 s, logo pois, peli → NYK|UUSI.
   Tarkista logon koko (Unityn splash mitoittaa itse; sprite Kartta/Aloitusruutu-logo-splash.png 1200×600 reunuksella) ja että logo pysyy latauksen ajan.

## 08.5x: KEHYSHÄIVYTYS TODISTETTU 202-1 (599260114 ⊇ 0583403e9), PT:lle; odottaa PT:n hyväksyntää. Kuvat _tyo/natiivi-ui/kehyshaivytys-202/202-1-*.png.
Siivous 08.4x tehty (4 .app + 9 mergettyä proto-worktreetä); PT: ei enää rm:ää. Jäännös wt/proto-natiivi-ui-kohdevalikko-201 (.DS_Store, Finder).

## NYT 08.3x: KEHYSHÄIVYTYS (PT 07.5x erä 2; maakunta-erä jo valmis fef47c0aa)
- Kuva 6 -ajo (lokit todistus-kehyshaivytys-{iphone-202-20261018-0814,ipad-202-20261018-0815}, kuvat proto-3d/_tyo/natiivi-ui/kehyshaivytys-202/):
  Kipissä himmeni vain ☰, ↕/⟳-tapit ja >-väkänen kirkkaat; ISS:llä ei reunanappeja (pöytä EiHaivy) → ero ei näy.
- Korjaus **0583403e9** natiivi-ui/kehysnapit-opas-202 (wt/proto-natiivi-ui-kehysnapit-opas-202, juna-201 2f9b5dc64 päällä): väkänen + rivi Merkki,
  tapit + vipu KehysNapit.Ohjain (himmenee, käyttö ei tuo muita esiin). NS:lle seuraavaan junaan 08.3x.
- SEURAAVA: kun NS:n käännös sisältää 0583403e9 → SIMU NYT JU:lta → `zsh ajo-kehyshaivytys-202.zsh <app> <udid> <iphone|ipad>` → kolmikot
  (`python3 proto-3d/_tyo/natiivi-ui/kuva6-todiste/kolmikko.py ulos.png a b c`) → PT; ajon jälkeen app pois simusta (bundle app.matkakirja.proto3d,
  --set "/Volumes/T7 4TB/Simulaattorit/Sarja") + SIMU VAPAA. Huom: oppaan kamera lentää valkoiseen taivaaseen U1/U2:ssa → harkitse aiempaa kuvaa.

## JUNA 201: AVOIMET ENSIMMÄISEKSI (PT 06.3x)
**TEHTY 07.28 (kohdat 2+3):** kuvakäännös 6 642f8ed23 (sis. 619275871 + 0ba132aca), iPhone + iPad OK: musta tausta, kuvateksti piilossa zoomattuna,
gallerian alateksti "Oma kuva · paikka · aika". Kuvat proto-3d/_tyo/natiivi-ui/kuva6-todiste/{iphone,ipad}-K2-K3-K4.png, lokit todistus-kuva-kokoruutu-*-202c-20261018-0722
(skenaario sk-kuva-kokoruutu-202c.txt). PT:lle lähetetty, SIMU VAPAA kuitattu. Odottaa PT:n hyväksyntää.
1. **Uusinta NYKYINEN-kortti + galleria koko ruudulla** (kuvakäännös 4 b656d1792): lokit /Users/Shared/Claude/proto-3d/lokit/
   todistus-kuva-kokoruutu-iphone-202b-20261018-0629 ja -ipad-202b-20261018-0629 (kuvat/raaka/K1-kortti.png, K4-galleria-kokoruutu.png).
   TEHTY 06.4x: parit _tyo/natiivi-ui/kuva4-parit/5–6 (NYKYINEN kortti | UUSI koko ruutu | galleriasta) → PT; SIMU VAPAA kuitattu.
   NYKYINEN (K1) | UUSI (K4 + kuva4-parit/3 K2) → polku PT:lle yhdellä rivillä. Jos K1/K4 epäonnistui: uusinta kuvakäännöksestä 6.
2. **Mustan taustan todiste kuvakäännöksestä 6 (kärki 0ba132aca; PT: kuvakäännös 5 9288ca434 EI sisällä sitä, 6 = NS:n lukitusehdokas)** (pyydä SIMU NYT Julkaisijalta; varmista `git -C <proto> merge-base --is-ancestor
   619275871 <rungon sha>`): `zsh ajo-kuva-kokoruutu-202.zsh <kuva5-app> <udid> <iphone|ipad>` (K2 otto + K3 zoom: kuvateksti piilossa,
   tausta musta) → polku PT:lle.
3. **Gallerian alateksti "Oma kuva · paikka · aika"** (PT 06.4x) TEHTY 0ba132aca (NS:lle). Todista samassa ajossa (kuvakäännös 6): K4 (galleriasta) alateksti
   = Oma kuva …, ei "Contains modified Copernicus…"; tausta musta → PT hyväksyy koko ruudun (parit 5–6 muuten OK).

## TILA 06.3x — JUNA 201 (kaikki NS:llä)
- ratas-201b db3915373 (⚙ + säädöt, kehyshäivytys, osuma 44 pt, Valosepän kohdevalikko): KK HYVÄKSYI 05.58.
- kohdevalikko-korjaus-201 6911a9f21 (KK 05.58 kohdat 2+4): rungossa d60107576, todistettu kuvakäännös 4 b656d1792, PT HYVÄKSYI.
- kuva-kokoruutu-202 (omistaja 01.10 + 01.23, PT 01.3x: ISS-kuvat koko ruudulle, kortti korvattu, nipistys, galleria, jaa + ✕):
  kärki **619275871** NS:lle 06.3x (= a36a00eac rungossa + 4421afa56 kuvateksti piiloon zoomattuna + 619275871 täysin musta tausta,
  PT 06.3x a/b). PT hyväksyi toiminnan (kuva4-parit 3–4).

## KESKEN (ENSIN)
1. **Uusinta kuvakäännös 4:stä käynnistettiin 06.30** (ajo-kuva-kokoruutu-202b.zsh, iPhone + iPad): NYKYINEN-kortti kuvan otossa (K1) + gallerian
   "Oma kuva" koko ruudulle (K4). Lokit lokit/todistus-kuva-kokoruutu-{iphone,ipad}-202b-20261018-063x. Jos valmis: tarkista K1/K4
   täysikokoisina → SIMU VAPAA Julkaisijalle (jos ei jo kuitattu) → parit `python3 <scratch>/pari2.py` -tyyliin (NYKYINEN | UUSI) → PT.
   Huom: K4 on vanhasta (ei-mustasta) taustasta; mustan taustan todiste kuvakäännöksestä 6 (0ba132aca mukana?) → `zsh ajo-kuva-kokoruutu-202b.zsh
   <app> <udid> <laite>` + K2 (kuvan otto) → PT. Pari-skripti: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/pari.py (ilman otsikoita).
2. PT:n kohta c (paikan nimi Arras/Reims ≠ 49°52'N 3°35'E) EI NUI:n: IssSijainti.Hae → LahinVakiluvulla (Valoseppä/LS2) → PT tietää.

## Selvitetyt (PT:lle kerrottu)
- Sininen maa ISS:llä = opas Pariisi → ISS (KaupunkiIlmakeha jää päälle), vanha vika; ISS suoraan näyttää maan (juna201-ratas-pari/5).
- KÖÖPENHAMINA ei tule pöydän näyttöön: 55,7° > radan 51,6° ("alus siirtyy") → Valosepän EXTEND-erä.
- Tyhjät nostot = NASAn kuvahaun aikakatkaisut; nyt uusinta 5 s:n välein (6911a9f21).

## Worktreet (proto)
wt/proto-natiivi-ui-kuva-kokoruutu-202 (natiivi-ui/kuva-kokoruutu-202), wt/proto-natiivi-ui-kohdevalikko-korjaus-201, wt/proto-natiivi-ui-kohdevalikko-201
(nyt haarassa natiivi-ui/ratas-201b db3915373). Levysiivous (-0040 LEVY-kohta) yhä tekemättä, lukituksen jälkeen; levy 96 %.

## Opit
- Simuskenaarioissa ISS-pöydän napit: iPhone pöytä y 732–810 (ratas x 317 y 765, KOHTEET-näyttö 243 755), iPad y 1104–1182 (ratas 538 1138,
  näyttö 464 1127); ikkunan napautus EI avaa kohdevalikkoa. Gallerian ruutuun `tap-teksti Oma kuva`. Vain 1. ISS-kuva ilmainen → yksi kuva/ajo
  (kehittäjätilassa rajaton). `astro kyyti ohjaamo kuvat kortti 1|0|kokoruutu|zoom <z>|tila` (IssOmatKuvat.Testaa).
- Kohde radan ulkopuolella (> 51,6°) = "alus siirtyy", näyttö näyttää maan, ei kohdetta.
- Tarkista ennen omaa korjausta, onko toinen rooli jo tehnyt sen rungossa (`git log -S` + `merge-base --is-ancestor <sha> <käännöksen sha>`).
