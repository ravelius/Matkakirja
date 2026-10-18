# Pelikoodarin luovutus 18.10.2026 klo 05.47 (KOVA RAJA, Postivahti)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*; varmuuskopio
`git push natiivi-backup <haara>:refs/heads/peili/proto/<haara>`, molemmat alla olevat pushattu). TILINVAIHTO 18.10.: id:t
/Users/Shared/Claude/osoitekirja.md (PT local_cf5b4eca-…, JU local_1325b8e8-…, NS local_04e2850b-…, LR local_2cf16574-…, Postivahti local_63227b57-…).
Edellinen luovutus -20261018-0035 (ab3ea5644).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. PT:lle ≤ 3 riviä. KATSO JOKAINEN KUVA TÄYSIKOKOISENA ennen lähettämistä.
- AJO KÄYNNISSÄ MINULLA (taustalla, katkeaa session mukana): proto-kaanna.sh pelikoodari/iss-poyta-201 L1-jonossa (05.40 alkaen,
  odotti KS v10:n lukkoa ~05.47). PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari-app/iss-poyta-201. Loki
  proto-3d/lokit/kaannospalvelu/<aika>-*.log (viimeinen rivi KÄÄNNETTY … tai VIKA …). Jos käännös katkesi tai ei käynnistynyt:
  pyydä JU:lta uusi L1 NYT ja aja sama komento uudelleen; ilmoita JU:lle LUKKO VAPAA heti valmistuttua.

## 1) ISS-OHJAUSPÖYTÄ LUONNOS 5 → JUNA 201 (omistaja hyväksyi 02.00, PT 04.3x; todisteeksi kuvaparit iPhone + iPad, EI videota)
- Haara pelikoodari/iss-poyta-201, worktree wt/proto-pelikoodari-iss-poyta-201, **4e0711bba** (juna-201 8df15f8e7:n päällä), tarkista.sh 0.
  SHA annettu NS:lle junan 201 runkoon (05.4x).
- Sisältö: poyta.py + jalki.py uusiksi (393 × 118 pt, kotipalkin kaista 34; vipu 84, TILA 110, näyttö 128, ⚙ 44; levy erikseen
  poyta-levy, pohjan varjot varjonkerääjällä; poyta-mini = pienennetty näyttö 4 pt:n levyreunalla; sauvakuvat poistettu).
  IssOhjaamo.Ohjauspoyta.cs: tekstit 17/16/15/28 pt, iPadilla/vaakana levy levenee PoytaSivuPt 72 molemmin puolin (9-slice), säätimet
  keskellä (pX), sauva pois (PoytaSauvaton), PoytaPienenna (levy, pohja, säätimet häivytys; näyttö jää; paneeli ei kerää kosketuksia),
  IkkunaTartu/Ohjaa/Irti. IssOhjaamo.cs: AsetaMini → PoytaPienenna, Nakyva/YlaReuna = mini-kehys (Pulu seisoo näytön päällä, ei pilkistä),
  lcd-napautus pienennettynä palauttaa. CupolaVeto.cs: ikkunaveto (yksi sormi lasilla → IkkunaTartu/Ohjaa, irrotus → Irti).
- SEURAAVAKSI: käännös valmis → LUKKO VAPAA JU:lle → pyydä SIMU NYT (JU lupasi ~06.15, jono LS → KS v10 → VS → PK) → todistusajo
  tyokalut/todistusajo/todistusajo.sh (proto-pää) skenaarioilla /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/sk-iss-poyta5-201-iphone.txt
  ja -ipad.txt (JU kertoo UDID:t) → katso P1–P6 täysikokoisina: pöytä kiinni alareunassa (ruutu-arvo tilarivillä), tekstit vihreinä
  ja väljinä, iPadilla tyhjää levyä molemmin puolin, ikkunaveto (oleta joystick Oikea/Ylos/Vasen), pienennetty näyttö samassa
  paikassa, Pulu ei pilkistä näytön takaa → kuvaparit PT:lle (≤ 3 riviä).
- Huomio: vanhassa pöydässä oli simukuvassa rako alareunassa (iPhone ~40 pt, iPad ~25 pt), vaikka AsetteleOhjauspoyta asettaa
  marginBottomin; tarkista P1:stä, onko levy nyt ruudun alareunassa. Jos ei, syy Juuren sijoittelussa (USS bottom --tk-vali-s / ala-laskenta).
- Luonnos ja ohjeet: proto-3d/_tyo/pelikoodari/iss-poyta-luonnos5-0150/LUE.md (PT:n 01.5x lisäykset lopussa).

## 2) GALLERIA ARKKI 5 → LR (Julkaisija ajaa itse ISS-pöydän jälkeen)
- pelikoodari/galleria-200 **b11dcbc12**: LS:n lopullinen pyramidi 1f7fa6ce8 (ffa433c76 ei käytössä) + pallon varjo 294d24f62.
  KaupunkiPalloKuva.cs yhdistetty käsin (pyramidin osat LS:ltä, gallerian varjofunktiot pysyvät). tarkista.sh 0; Kartta-testejä ei ajettu.
- JU tekee käännöksen + simun galleria200g-mallilla ja lähettää todistuksen PK:lle ja LR:lle → katso täysikokoisena (pallon varjo
  vaalea/pieni, ei kosketa nappulan varjoa Pariisissa n-yhtenainen; pyramidi LS:n mukaan) → kuittaus LR:lle.

## 3) MUUT
- Editoriesikatselu TAUOLLA (PT 01.1x; proto-3d/lokit/esikatselu-20261018-0105/ARVIO.md): batchmode-ruutu 640×480 ≠ UI.
- Juoksupeli 78cd48f9d junassa 201; cherry-pick pelikoodari/juoksupeli-haaraan, kun juoksupelityö jatkuu.

## Worktreet
wt/proto-pelikoodari-iss-poyta-201 (juna 201), -galleria (arkki 5), -esikatselu (tauolla), -juoksupeli-pelit, -juoksupeli, -cupola-suoja
(junassa 200 → poistettavissa), -tivoli-vapaa-lento-200 + wt/pelikoodari-vapaa-lento-osio (Tivoli tauolla), wt/pelikoodari-posti.
