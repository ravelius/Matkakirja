# Linssiseppä 2 – luovutus 13.10.2026 klo 11.15 (Suomen aika), nollaus (PT: konteksti 49 %)

Luovuttaja: Linssiseppä 2 (Opus, high). Vastaanottaja: Linssiseppä 2 nollauksen jälkeen. Edellinen luovutus:
viesti-linssiseppa2-luovutus-20261012-ilta.md.

## Lue ensin
1. `CLAUDE.md` (agentit vain Opus/Sonnet, VAIN EUROOPPA, AIKA).
2. Raamattu (`js/tyohuone-raamattu.js`): Ydinajatus kohta 2 "TYÖTAPA JA SESSIOT".
3. Tämä raportti, KESKEN ylhäältä alas.
4. Kööpenhaminan tehtävä: `/Users/Shared/Claude/Matkakirja-fable/scratchpad/koopenhamina-kippi-aukot-20261013.md`.

## Omistajan linjaus 13.10. 09.2x (sitova)
OLAVINLINNA ON TAUOLLA. Vain viiden tilan viimeistely peliin: keittiö, porttikäytävä, pikkupiha, linnantupa ja voudin sali.
- LR tekee mallikorjaukset.
- LS2 ottaa pelikuvat (siirtymä b ja palatsi) PT:n kuitattaviksi.
- Sen jälkeen LS2 kytkee tilat Siirtosepän bottia ja NS:n junaa varten.
- EI uusia tiloja. Sen jälkeen linna jää tauolle.

## Tila
- Käännös- ja simuvuorot jakaa Julkaisija (KÄÄNNÖS NYT / SIMU NYT → LUKKO VAPAA / SIMU VAPAA). Simuja saa olla käynnissä enintään kaksi.
- OMA iPad-simu A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4 (ei D61642C8).
- Ajoja ei ole käynnissä. Kaikki on pushattu natiivi-backupiin.

## Haarat (proto-repo, natiivi-backup) ja worktreet
| Haara | Worktree | Kärki | Sisältö |
|---|---|---|---|
| linssiseppa2/keittio-koehuone | wt/proto-linssiseppa2-koehuone | **0344c6275** | LINNAN LAAJENNUS (BUILD 186 ff94b687a yhdistetty, pala v49a masterista); ks. alla |
| linssiseppa2/pikkupiha-v48z | (sama wt, haara) | d88538ef6 | VANHA koehaara (pala-pin v48z/v49a). Tarpeeton, koska master on v49a. Älä käytä. |
| linssiseppa2/tunikavarjo-186 | wt/proto-linssiseppa2-tunika | 02722f970 | juna 186:ssa (NS), voi poistaa |
| linssiseppa2/elaintayt-184-1 | wt/proto-linssiseppa2-muisti | 49a8575bc | 184.1:ssä |
| linssiseppa2/vuoristo-pilotti-184 | wt/proto-linssiseppa2-vuoristo | 1f9d66cae | pilotti 6 VALMIS (KS vahvisti, PR #4537), voi poistaa |

**PT:n päätös b:** keittio-koehuone EI mene junaan ennen kuin viiden tilan viimeistely on valmis. Silloin se viedään kokonaisena omana
junanaan (NS) muistiajon kanssa. Haara pidetään masterin tasalla.

### keittio-koehuone (linnan laajennus), sisältö
- `Koehuone.Huone`: komento `poikki huone <tila> <url> [versio|kevyt|albedo|irr|aani|aanikesto|aanitaso|poista|rajaa|vanhat pida|sisarajaus 0]`.
  - Lataa glb (huippu/kevyt), HDR-valoatlakset, luotaimet ja esineet.
  - Kuoren leikkaus `glb/<tila>-kuoren-leikkaus<versio>.json` tulee mukaan automaattisesti (`laatikot_xz` tuettu).
  - Puuttuva tila lisätään rakennukseen.
- Tunnetut oletukset tilan id:n mukaan (Koehuone.cs):
  - TunnettuAani: porttikäytävä.
  - TunnetutPoistettavat: pikkupiha lyhty; linnantupa 6 rekvisiittaa; salissa codex-tott-vaakuna.
  - TunnetutRajattavat: pikkupiha → kirkkotorni-portaat.
  - OnPalatsi: palatsin tilat → PoistaVanhat=false ja Sisarajaus=false.
- Koekomennot:
  - `poikki osuma <u> <v>`: ruutupisteen meshit, materiaali ja osumapiste glTF:nä.
  - `varjolista <säde>`, `valovarjot 0|1`, `varjoton kaikki|<polku> 1|0`, `varjopehmeys`, `tunikavarjo`.
- Liekkivarjostin `_Savy`/`_Peitto`.
- Huom: valo:-solmut valaisevat vain reaaliaikaiset esineet ja hahmot, eivät leivottuja tiloja.

## Nykyiset huoneversiot (LR:n `_valmiit/`)
| Tila | Kansio | Tila |
|---|---|---|
| keittiö | olavinlinna-keittio-koehuone-v1 (v3f/ajo1, v3liite -v3d) | hyväksytty |
| porttikäytävä | olavinlinna-porttikaytava-v1/**ajo6c** | taso noin 2 × piha, kuitattu |
| pikkupiha | olavinlinna-pikkupiha-v1/**ajo8** (ajo9 tulossa) | siirtymä OK; PT:n 4 kohtaa ajo9:ssä |
| linnantupa | olavinlinna-palatsi-v1/linnantupa/**ajo9** | kuilun yläosan musta aukko jäljellä |
| voudin-sali | olavinlinna-palatsi-v1/voudin-sali/**ajo12** | vaakuna OK |

## KESKEN – tee nämä ensin
1. **Pikkupiha ajo9** (LR ilmoittaa). Sisältää PT:n neljä kohtaa siirtymäkuvassa b:
   - sileä kaari;
   - sauma ja lankku pois;
   - E 102:n pielikivet ja kamana;
   - keittiön oven verhous z ≤ 10,6;
   - sininen kaistale x ≈ −20,7.
   LR kirjaa kameran paikan ajo9:n LUEMINUT:iin.

   Näin ajat sen:
   - Pohja: `koehuone/sk-pikkupiha-ajo8.txt`. Vaihda `ajo8/` → `ajo9/` ja siirtymän kamera LUEMINUT:n mukaan.
   - Ketju: `ketju-pp-ajo8.zsh`. Vaihda appiksi `app-palatsi5` (0344c6275), käännöslokiksi `kaanna-pal5.log` ja G=0344c6275.
   - Uutta käännöstä ei tarvita.
   - Kuva b PT:lle ja LR:lle, mediaani mittaamalla.
   - HUOM: `kavely siirra` ei toistu tarkasti, koska kävelyn törmäys siirtää kameraa. Tarkista kuvakulma, ja tarvittaessa siirrä
     kameraa tai käytä `osuma`a.
2. **Palatsin kuilun musta aukko** (pal5 x5, LR:llä): kun tupa ajo10 tai sali ajo13 on valmis, aja `koehuone/ketju-pal5.zsh`-pohjalla
   ilman käännöstä (sk-palatsi5.txt, vaihda kansiot). Kuvat PT:lle.
3. Kun PT on kuitannut kaikki viisi tilaa: **kytkentä junaa varten**. Nyt tilat ladataan kehittäjäkomennoilla (`poikki koehuone`/`huone`
   skenaariossa). Junaan ne pitää kytkeä oletuksena päälle:
   - Huoneiden URL:t (ämpäri, vie-paketti.sh LR:n tai Julkaisijan kautta) ja Koehuone.Paalla-oletus pelattavassa palassa.
   - Sovi NS:n ja PT:n kanssa. Siirtosepän botti ajetaan sen jälkeen kerran.
   - Muistiajo iPadilla (muistijuna-sääntö).
   - Merge masteriin NS:n junana. keittio-koehuone on nyt BUILD 186:n tasalla.
4. Linna tauolle. Sitten **Kööpenhaminan kippi ja esittely** (PT 13.10.), scratchpadin tiedoston mukaan:
   - KS:n datan kytkennät: katse-kentät, vesiväri, ilmakehä, julkisivuvalot, elävän kaupungin kerrokset.
   - `KaupunkiIntro.Aloitukset["kobenhavn"]`: #4535:n kuvat + Williamin repliikki, kun äänitetty.
   - Tunnusero koopenhamina/kobenhavn yhtenäiseksi.
   - Metrokartan järjestys.
   - Kehityskaupunkilisäys VIIMEISENÄ, kun data on ämpärissä.
   - Sen jälkeen simu ja kuva-arkki PT:lle.
   - Ei omia 3D-malleja. Aloita, kun KS:n ensimmäinen data on valmis; siihen asti tutki koodia.

## Ajopohjat ja työkalut (`/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/`)
- `koehuone/ketju-pal1..5.zsh` + `sk-palatsi1..5.txt` (palatsi), `ketju-pp-ajo8.zsh` + `sk-pikkupiha-ajo8.txt`, `ketju-os2.zsh` +
  `sk-keittio-osuma.txt` (osumat), `ketju-pk6b/6c.zsh`.
- Mediaanimittaus (venv: `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`): skriptit olivat session scratchpadissa
  (`mediaani.py`: koko kuvan lineaarinen luminanssimediaani ilman kuvatekstiä, alin 18 % pois; `alue.py`: alueen x0:x1:y0:y1
  mediaani). Kirjoita tarvittaessa uudelleen.
- Kameraposen laskenta palatsissa: kehys `_valmiit/olavinlinna-palatsi-v1/lahde/kehys.py` (P = (−10,56; 5,38), kierto 27°).
  `kavely siirra x y z yaw pitch`: glTF-paikka, yaw = atan2(dx, −dz) asteina, negatiivinen pitch = ylös.
- App-kopiot `lokit/linssiseppa2-app-*`: uusin palatsi5 (0344c6275 → 38660bba9). Käytä aina uutta kopion nimeä.

## Viimeisimmät todisteet
- todistus-pal5-20261013-1109 (palatsin viimeistely), todistus-pp-ajo8-20261013-0758 (siirtymä OK), todistus-os2-20261013-0823
  (osumat), todistus-pk6b/6c (porttikäytävän taso), todistus-pal2/pal3 (ikkunasyvennykset, sali ajo5b).
- Muisti viiden tilan kanssa 1048–1070 Mt (ilman palatsia 1049).
