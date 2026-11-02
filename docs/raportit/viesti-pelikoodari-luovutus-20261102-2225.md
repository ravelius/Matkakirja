# Pelikoodari: luovutus 2.11.2026 klo 22.25 – juna 218

Edellinen: -20261102-2050 (a26e3830e): sen jono ja huomiot ovat voimassa, ellei alla toisin. Syy: konteksti pehmeällä rajalla.
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (commitit paikallisia),
kärki **34bd7f7c3**. Uusi salirunko **pelikoodari/sali-218c = a7a46456a** (34bd7f7c3 + piirtajat-218 5fa87046d; merge-tree, ei worktreetä).

## Tehty
- **34bd7f7c3 KK:n 3 korjausta** (unity-tarkistus 0, Peli-testit 797/797):
  1. Kamera ei ovilehden sisään: `JuoksuSokkeloMaailma.OviLehtiJanalla` (avautuneet lehdet lehden kehyksessä, verkkojen rajat +
     `DroneNosto.OviLehtiVara` 0,4 m) → JuoksuV4Maailma vetää kPaikan lehden eteen (loki "kamera ovilehden edessä"). **TOIMII**:
     cx-v3 (`sali-218b/20261102-220906-cx-v2.mp4`, sali-218c) oviaukko ilman punaista ruutua.
  2. Maalin näköala vain vapaaseen kohtaan (sekoituspaino pienennetään 1/8 askelin, kunnes näkölinja rinnasta on vapaa; loki
     "maalin näköala kavennettu"). **EI RIITTÄNYT cx:ssä**: kavennus ei lauennut, ja Maali-kortissa hattu peittää yhä kuvan keskeltä.
     unity.log (esikatselu cx 22.09): `kamerasuoja veto 4.0 m … kamera (115.6, 1.3, -830.3), Puyi (115.6, 0.0, -831.2), avaus 44.95`
     koko maalin ajan → **AvausT on yhä ≥ 0 maalissa** (QA `avaus nyt` + botti?), kamera on PELIN kamera (ei näköala), ja sen tavoite
     ~4 m takana on massassa (maali = "kortteli avoin tyohuone-kaista6 S-N portilla", katto 1,00); kamerasuoja vetää 0,9 m Puyin taakse
     1,3 m:n korkeudelle → hattu keskellä. SEURAAVA: selvitä miksi AvausT ≥ 0 (vaikuttaa myös maaliW-polkuun), ja maalissa kun veto
     jättää kameran < 2 m:n päähän: kamera ylemmäs (vapaa korkeus) ja katse alas, tai kuva edestä. Kortin paikka = UI-pohja → PT:n kautta.
     Huom: cx:n maali on yhä kujalla (sk2-cx.txt vanha); muiden salien maali on salin sisällä, joten ne voivat olla kunnossa.
  3. VaakaOtsikko 1150 → 922 px, keskikohta 206,5 → 135,7 px (otsikon ja pään maskin alfoista laskettu: ei päällekkäisyyttä, vara ≥ 12 px).
     **TARKISTETTU 22.24**: `latauskuva-218/ipad-v2-lataus-2.png` otsikko kokonaan hatun yllä, ei mustia reunoja (KK:lle valmis).
- **iPad pysty -latauskuva**: ei koodivika. 21.00-ajossa Curl 28 (~87 s verkkoaikakatkaisu) → kuvat otettiin kartasta ennen kuvaa.
  Uusi skenaario `latauskuva-218/sk-lataus2.txt` (`oleta-uusi 180 latauskuva näkyy` ennen kuvia).
- Levy: muut roolit kuluttavat; vapaa 18–19 Gi. aja-sk.zsh-raja (sali-218b ja tallenne-218t) 20 → 15 Gi. Vanhat leikkaamattomat
  sali-mp4:t (vanha runko) poistettu omasta kansiosta (~1,1 Gt); -v2-tiedostot jäivät.

## KÄYNNISSÄ (JU:n ESIKATSELU linja 1, ei vapautettu)
1. `sali-218b/ketju14.zsh` (→ ketju14.ulos): `RUNKO=pelikoodari/sali-218c ketju8r.zsh yk th tj ty cc xf ys` → `sali-218b/<aika>-<koodi>-v2.mp4`,
   sitten taso1b4 (66dc02d2d) → `tallenne-218t/<aika>-taso1b4.mp4`. (ketju13 kaatui LEVY-rajaan 22.22 cx:n jälkeen.)
2. `latauskuva-218/ketju2.zsh` (→ ketju2.ulos): runko 34bd7f7c3, ipad + ipad-pysty → `latauskuva-218/<koko>-v2-lataus-{1,2,3}.png`.
   Käynnistyi heti (ei odota ketju14:ää; esikatselu.sh jonottaa linjalla).
Jos ajot kuolivat: aja puuttuvat samoilla skripteillä taustalla `nohup`illa ja Monitorilla (kuolema-rivi mukaan).

## Jono
0. **LAV 22.3x: 景阳宫 KYTKENTÄ, kun JU on vienyt**: rakennukset-v115 → **v116** (j3-jingyanggong, reitti S-N hallin läpi), tausta-v111 →
   **v112** (2-3 ja 2-4: halli pois), esto v36 ennallaan; LAV:n juoksu 151/151 omalla juurella (sisatilat-3d/pk-juuri, dec9efec4).
   **JU 22.3x: v116 VAJAA, ÄLÄ KYTKE** – korjattu tulee **v117**:nä; tausta-v112 viety (100, 3c0910636814), kytke vain YHDESSÄ v117:n kanssa.
   Kuten dec9efec4: SHA256SUMS, symlinkit testijuureen, Peli-testit 797/797 + solmut/umpikujat, commit, LAV:lle kuittaus.
1. Maali-kortin hattu (yllä kohta 2) – korjaa ja uusi cx (`RUNKO=pelikoodari/sali-218c` uudella runkokommitilla; tee uusi sali-218d).
2. Tarkista ketju14:n salit arkilla (`ffmpeg -i X -vf "fps=1.33,scale=320:-1,tile=8x5" -frames:v 1 a.jpg`): ei punaista ruutua oviaukoissa,
   botti salin läpi, kierros näyttää valtaistuimen, Maali-kortissa ei hattua keskellä. taso1b4: `kaanna 1 seina` vasta OhjausPelaajalle-rivin jälkeen.
3. Latauskuvat v2 VALMIIT ja tarkistettu: iPad vaaka `ipad-v2-lataus-2.png` (22.24) ja iPad pysty `ipad-pysty-v2-lataus-2.png` (22.25): otsikko ja poika kokonaan, ei mustia reunoja; ketju2 päättyi.
4. Sitten osa 3 KK:lle (salit + taso1b4 + iPad pysty + iPad vaaka v2), kopio PT:lle ≤ 3 riviä, JU:lle "ESIKATSELU VAPAA".
5. Sen jälkeen edellisten luovutusten jono (eunukkikorjaukset ja ristikko-ovibugi ennen arkisia hahmoja, 409d7f494 postilaatikossa).
