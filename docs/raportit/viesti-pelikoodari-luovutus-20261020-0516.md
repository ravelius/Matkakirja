# Pelikoodarin luovutus 20.10.2026 klo 05.16 (Postivahdin KOVA RAJA 35 %)

Edellinen: viesti-pelikoodari-luovutus-20261020-0308.md (sen ENSIN-kohta tehty: yhteinen21-pari KK OK 04.4x; e60cad5e1 oli jo junassa 207,
NS-riviä ei tarvittu). Rooli: Pelikoodari (Opus, high). Proto-repo paikallinen (ei pushia), worktree /Users/Shared/Claude/wt/proto-pelikoodari-kerattavat-206
(puhdas, haara **pelikoodari/korttelit-208 = 3b22c6724**).

## KÄYNNISSÄ NOLLAUSHETKELLÄ
- Ei omia ajoja. JU kääntää 3b22c6724:ää L2:lla → /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/korttelit-208-app (loki julkaisija-tyokalut/pk-korttelit-208.log).
  Simujono JU:lla: NUI → KS k4 → PK; JU antaa SIMU NYT (arvio ~05.30–05.45).

## ENSIN (JU:n SIMU NYT)
1. `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-sokkelo-206/aja-208-korttelit.zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/korttelit-208-app/Matkakirja3D.app`
   taustalle (iPhone + iPad ~8 min; tarkista kaannos.txt = 3b22c672 ja `sysctl -n vm.loadavg`). Skenaario sk-korttelit-208.txt: korttelit v3 latautuvat
   ("läpijuostavia kortteleita 7"), juoksu 777 uudelleen, K1 portilla (katto näkyy), K2 keskellä (katto häivytetty), K3 portailla, R0 pöly 0,2 s.
2. Heti ajon jälkeen SIMU VAPAA → JU. Katso kuvat täysikokoisina (lokit/todistus-juoksu-korttelit-208-*). Jos jokin oleta ei täyty, katso Player.log
   (kortteli-lokirivit "juoksupeli v4: kortteli <nimi> portilla/portailla/keskellä (lattia, katto, s)").
3. Parit KK:lle (local_8e4fcfed…) + kopio PT: korttelit iPhone K1+K2 (+ K3) ja iPad K2; R0 erikseen (pöly).
4. **Pöly aa2bc8345** (haara pelikoodari/juoksupeli-207): PT 05.0x: OK-rivi NS:lle VASTA kun KK hyväksyy uuden R0-parin → junaan 207 (yhteinen käännös).
5. Korttelit 208: KK:n OK:n jälkeen PT:lle OK-pyyntö NS:lle (3b22c6724, juna 208; ⊃ VS 07515cb4b ja pöly).

## TEHTY TÄLLÄ VUOROLLA
- yhteinen21 1491c4f1 simu (iPhone + iPad 7/7) → KK OK 04.4x (kupla kahdella rivillä, sirpaleet); R0-pöly liian hento → aa2bc8345.
- PT 04.3x LÄPIJUOSTAVAT RAKENNUKSET (Codex 713718, Lavastaja kokoaa, PK kytkee):
  - 21f804e1a logiikka: JuoksuKortteli.cs (KortteliMalli/Korttelisto json:sta, Maasto askel ≤ 0,2 m / väli ≥ 0,15 / kaltevuus ≤ 25°, KattoHaivytys
    reuna 1 m + viive 0,6 m + 0,3 s, KorkeusSuodin kameralle), JuoksuSokkelo hienoruudukko 8 m (ReunaAuki, Portti: avoin kuja ja ≥ 2 porttia),
    JuoksuV4Reitti.JatkaHieno (kujan puolivälissä käännös portista, korttelin profiili sivu+y, KevytSisalto), botti portista 60 %.
  - 919ad9ced + 840835c23 maailma: JuoksuSokkeloMaailma lataa sokkelo-korttelit-v3/korttelit.json + kortteli-<nimi>-punakulta.glb (vain punakulta, PT 05.0x),
    "sokkelo kortteli …" → VS:n pinnat (V4_lattia → 2 lisätty VS:n Lattia.cs:ään, VS:lle kerrottu), katot omina renderöijinään + _Haivytys (VS 07515cb4b
    yhdistetty d2dff8891). JuoksupeliNakyma aloittaa juoksun uudelleen kun korttelit latautuvat; QA `ui juoksupeli korttelit 0|1`. Kameran korkeussuodin sokkelossa.
  - 3b22c6724 simun lokirivit; pöly aa2bc8345 yhdistetty (07fdc1006).
  - Testit 661/661 (JuoksuKortteliTestit 8, v3-json Peli-testit/Kultaiset/sokkelo-korttelit-v3.json: 7 mallia, botti 16 korttelin läpi, 0 kompastusta), tarkista.sh 0.
- Lavastaja: v3 voimassa (v3b peruttu 05.1x, älä kytke). JU vei v3:n 04.55 (200 OK).

## AVOIMET
- kortteli2-halli (ensimmainen_kytkenta false) ei kytketty; hallin kujan ylitys vaatii oman ratkaisun.
- Huoneissa kamera on sokkelon korkea drone (Pinta "courtyard"); jos KK haluaa sisäkameran huoneisiin, V4Osa.Kortteli != null → Pinta "room" -kokeilu.
- Ennallaan: hurraa-isommat odottaa omistajaa (PuyiHuudot-polku), iPadin loppukortti = PT:n UI-pohjakysymys.
