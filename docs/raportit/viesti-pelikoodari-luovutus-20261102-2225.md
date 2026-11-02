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

## TILA 22.35: yk (sali-218c, `sali-218b/20261102-222309-yk-v2.mp4`) tarkistettu arkilla
- Maali-kortissa sama vika kuin cx:ssä: kamera Puyin selän takana, hattu kortin takana keskellä → Maali-korjaus koskee KAIKKIA saleja
  (myös maali salin sisällä). Lisäksi sisäänmenossa ~1 s kamera punaisen pylvään/oven karmin vieressä (ruutu puoliksi punainen) –
  ei koko ruudun punaista, mutta tarkista muistakin.

## KÄYNNISSÄ (JU:n ESIKATSELU linja 1, ei vapautettu)
1. `sali-218b/ketju14.zsh` (→ ketju14.ulos): `RUNKO=pelikoodari/sali-218c ketju8r.zsh yk th tj ty cc xf ys` → `sali-218b/<aika>-<koodi>-v2.mp4`,
   sitten taso1b4 (66dc02d2d) → `tallenne-218t/<aika>-taso1b4.mp4`. (ketju13 kaatui LEVY-rajaan 22.22 cx:n jälkeen.)
2. `latauskuva-218/ketju2.zsh` (→ ketju2.ulos): runko 34bd7f7c3, ipad + ipad-pysty → `latauskuva-218/<koko>-v2-lataus-{1,2,3}.png`.
   Käynnistyi heti (ei odota ketju14:ää; esikatselu.sh jonottaa linjalla).
Jos ajot kuolivat: aja puuttuvat samoilla skripteillä taustalla `nohup`illa ja Monitorilla (kuolema-rivi mukaan).

## Jono
0. ~~景阳宫-kytkentä~~ **TEHTY 22.5x: 1657d1932** (rakennukset-v117 + tausta-v112 + esto v36; v116 ei käytössä). Kärki nyt **1657d1932**.
   Peli-testit oikealla juurella: `MK_JUURI=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juuri-v117 MK_RAKENNUKSET=kielletty-rakennukset-v117
   MK_TAUSTA=kielletty-tausta-v112 MK_ESTO=palatsi-esto-v36 sh Peli-testit/kaanna.sh` → 797/797, 1725 solmua, umpikujia 0 (+ sali 1).
   (Ilman MK_*-muuttujia oikean palatsin testit ohittuvat tai lukevat v90:n.) LAV:lle kuitattu.
1. Maali-kortin hattu (yllä kohta 2) – korjaa ja uusi cx (`RUNKO=pelikoodari/sali-218c` uudella runkokommitilla; tee uusi sali-218d).
2. Tarkista ketju14:n salit arkilla (`ffmpeg -i X -vf "fps=1.33,scale=320:-1,tile=8x5" -frames:v 1 a.jpg`): ei punaista ruutua oviaukoissa,
   botti salin läpi, kierros näyttää valtaistuimen, Maali-kortissa ei hattua keskellä. taso1b4: `kaanna 1 seina` vasta OhjausPelaajalle-rivin jälkeen.
3. Latauskuvat v2 VALMIIT ja tarkistettu: iPad vaaka `ipad-v2-lataus-2.png` (22.24) ja iPad pysty `ipad-pysty-v2-lataus-2.png` (22.25): otsikko ja poika kokonaan, ei mustia reunoja; ketju2 päättyi.
4. Sitten osa 3 KK:lle (salit + taso1b4 + iPad pysty + iPad vaaka v2), kopio PT:lle ≤ 3 riviä, JU:lle "ESIKATSELU VAPAA".
5. Sen jälkeen edellisten luovutusten jono (eunukkikorjaukset ja ristikko-ovibugi ennen arkisia hahmoja, 409d7f494 postilaatikossa).
6. VS 23.2x: juoksupelin sade (linssiseppa2/sade-218 b65dbc092, Valopohja.AsetaJuoksuSade 0..1, QA `ui juoksupeli sade 1`): PK hyväksyi
   koukun avautuessa + Saatila.Muuttui → sade = Saa ∈ {Sade, Ukkonen} ? 1 : 0 (VS kirjoittaa). Tarkista kytkentä, kun VS ilmoittaa.
7. xf (sali-218c, `sali-218b/20261102-231627-xf-v2.mp4`) kesto 58,7 s (muut 20–30 s): maali salin sisällä ei ehkä täyttynyt → tarkista; ohje: takaoven ulkopiste tai `ui juoksupeli suosi`.
8. TILA 23.42: ketju14 valmis – kaikki 8 salia sali-218c:llä (cx 220906, yk 222309, th 223329, tj 224220, ty 225409, cc 230354, xf 231627, ys 232916;
   `sali-218b/<aika>-<koodi>-v2.mp4`). taso1b4 EI ajettu: LEVY 13 Gi < 15 (koneen levy, muut roolit). JU:lle ESIKATSELU VAPAA 23.4x, PT:lle levyrivi.
   Aja taso1b4 kun levyä on (`PROTO_LINJA=1 zsh tallenne-218t/aja-sk.zsh sk-taso1-b.txt taso1b4 66dc02d2d`), salit uudelleen Maali-korjauksen jälkeen.
