# Julkaisijan luovutus 16.10.2026 klo 10.2x (Postivahti: kova raja 35 %)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -150). Edellinen: `viesti-julkaisija-luovutus-20261016-yo.md`.
Asemataulu (TÄMÄ TILI): https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm. Osoitekirja /Users/Shared/Claude/osoitekirja.md.

## 0. ENSIN (nollauksen jälkeen)
1. Kääreet kuolevat nollauksessa. Tarkista ensin
   `ps -ax -o pid,etime,command | grep -E 'proto-kaanna|julkaisija-tyokalut|zsh (linssiseppa|pelikoodari)' | grep -v grep`.
   10.26 käynnissä: **`linssiseppa-telakka6.zsh`** (LS1 telakointi-havainne-196 f057743ed, odottaa L2:ta) ja
   **`pelikoodari-korikoydet197c.zsh`** (PK kori-koydet-197 kärki cf132b9ff → 96044270, odottaa telakka6:n lukkoa).
   Jos kääre puuttuu eikä lokissa (`*-k.log` / `*c.log`) ole KÄÄNNETTY-riviä, käynnistä se uudelleen:
   `nohup zsh <kääre> > <loki> 2>&1 &`. KÄÄNNETTY-rivi + SIMU NYT LS1:lle (local_771b401b…) / PK:lle (local_7fcab04b…).
2. Cron NAS-bundle on session-only: `CronCreate "3 4 * * *"` → bundle-natiivi-nas.sh. 16.10. ajettiin käsin 04.21 OK (cron ei lauennut).
3. `valoseppa-vahti.zsh` käynnissä; **valovahti TAUOLLA** (`/tmp/matkakirja-valovahti-tauko`, A26BC7D0 Valosepällä).
   Poista (mv) tauko vasta Valosepän SIMU VAPAA A26BC7D0:n jälkeen.

## 1. JUNA 196 – odottaa PT:n "LUKITSE 196"
- Omistaja 00.31: "Julkaise juna kun kaikki pyyntöni valmiina. Ei testejä". Lukitushetkellä web-PR:t **#4629 + #4685**
  (molemmat CLEAN ja vihreät 02.x; tarkista uudelleen). **#4691 MERGED jo 07.5x PT:n käskystä** (e3d836143, äänitys).
- Muistiportti: `muistiajo-196.txt` 1. rivi `OHITETTU omistaja 16.10. 00.31 "Ei testejä"` (kuten 195).
- NS antaa BUILD + M → `zsh julkaisija-tyokalut/tf-kaynnista.sh 196 <BUILD> <M>`; taulu talo/eteneminen; rivit PT + KK.
- Tänä aamuna käännetyt junan 196 L2-ehdot (kaikki KÄÄNNETTY, SHA:t lokissa): NUI 122169f34 / 94377c6ea / kelaus / vihjeet,
  Valoseppä testi-196 + raketti-liekki e0dc25aa4, PK kohtaaminen 72130d533 + taidemuseo 5c4a2265a + maxq 344b80a1c,
  LS1 kuvat-196g/i, kehys dac334510, reitti-edella 8cd913812, telakointi k1–k4, SS meri2 cd082c69e.

## 2. VIENNIT TÄNÄÄN (kaikki ämpärissä, CDN tarkistettu)
- **KS maasto-2026-10-16-maailma** 2 263 883 + layer.json → `julisteet/maasto/2026-10-16-maailma/`, 09.13 valmis, CDN 42/42, otsakkeet ok.
  Uusi työkalu `julkaisija-tyokalut/vie-maasto-massa.zsh` (T7-polku, gzip-otsake, layer.json max-age=300 viimeisenä).
  KS + PT kuitattu → NS osoitevaihto b8167585d junaan 196.
- Valoseppä peking-piilo-p344v4 97/98 + **uusin.json vaihdettu** → p344v4 (uusi `vaihda-osoitin.zsh`, max-age=60).
- LS1 taidemuseo-kertoja-v2 manifest-196.json (Orsay).

## 3. Simut 10.26
- 00CF62C2 LS1:llä (telakka6-lippu syntyy käännöksen jälkeen). 96044270 PK:lla (kori). A26BC7D0 Valosepällä.
- 123B4B25 + F7513985 vapaat (NUI 07.x valmis). 95EEDB48, 8362879F, 39644E75 vapaat.

## 4. OPIT (16.10. aamu)
- **Käännöstä EI pysäytetä `kill <proto-kaanna zsh-pid>`**: Unity jää orvoksi linja2-projektiin → seuraavat käännökset
  "another Unity instance" / "stash failed" (10.23: 0738085fc, telakka6, kori kaatuivat). Pyydä omistajaa pysäyttämään
  (NUI/SS tekivät siististi) tai tapa koko prosessiryhmä ja varmista `ps | grep Unity.app` ettei projekti jää auki.
- **Kaksi lippua samalle simulle yhtä aikaa** → odottajat ajavat päällekkäin. Seuraava lippu vasta edellisen ajon jälkeen
  (kääreisiin `until ! pgrep -f ajo-<edellinen>.zsh`).
- **SHA-pohjainen odotusehto** (until grep <sha> lukko) jumittaa, jos omistaja vaihtaa SHA:n → ilmoita odottajalle heti.
- Kääreet kääntävät **haaran kärjen** käännöksen alkuhetkellä; SHA-päivitys ennen lukkoa ei vaadi toimia (tarkista rev-parse).
- vie-paketti.sh ei ylikirjoita uusin.json-osoitinta → `vaihda-osoitin.zsh <paketti> <polku>` muiden tiedostojen jälkeen.
- Kuormattomaksi pyydettyä simuikkunaa ei voi taata L2:n rinnalla; kerro pyytäjälle.

## 5. Levy
50 Gi 10.26. Pysäytys vain < 22 Gi. Postivahdin levykierrokset: omaa poistettavaa ei ole (historiakuvat-195 wt poistettu 04.4x;
proto-julkaisija-unity67/175 ei yhdistetty, jätetty).
