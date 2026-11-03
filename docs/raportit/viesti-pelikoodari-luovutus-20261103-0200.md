# Pelikoodari: luovutus 3.11.2026 klo 02.00 – juna 218

Edellinen: -20261103-0150 (174764034): sen jono ja huomiot ovat voimassa, ellei alla toisin. Syy: konteksti pehmeällä rajalla (25 %).
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (commitit paikallisia),
kärki **1b80e7201**. Työkaluhaara pelikoodari/piirtajat-218 (worktree wt/proto-pelikoodari-kivi-216) kärki **505fd53c1**.
Salirunko **pelikoodari/sali-218e = fd88a0dba** (1b80e7201 + 505fd53c1; merge-tree, ei worktreetä).

## KK:n palaute osaan 3: syyt ja korjaukset (tehty, tallenteet JU:n vuorolla)
- **Salit yk/tj/cx (seinät, palkit) ja th/ty (kattonäkymä 8 s): syy QA-skenaariossa.** Botti juoksi koko salin AVAUSLENNON aikana
  (yk: maali avauksen t 39,25, OhjausPelaajalle vasta t 46,4) → kamera oli avauksen drone, jolta pelin seinäsuojat puuttuvat
  (AvausT ≥ 0 ohittaa kuja-, sali-, Tukossa- ja ovilehtiehdot). th/ty: hyppy-jos odotti Maali-korttia → 3,6 s maalin näköalaa
  (drone kattojen yli) ennen kierrosta. Pelaajalla tätä ei tapahdu (salit tulevat vastaan vasta ohjauksessa).
  Korjaus: **sk3-<koodi>.txt** (tee-sk3.zsh sk2:sta): `avaus 0` + `uudestaan` (ei avauslentoa, botti pelin kameralla), kierros
  heti maalissa (`hyppy-jos maali juoksupeli: maali [0-9]+ s`). leikkaa3.zsh: alku = ensimmäinen kameran hyppy > 5 m.
- **Maali-kortti valtaistuinkuvaan** (505fd53c1, Esikatselu): kierroksen jälkeen kamera pysyy kaaren lopussa tallenteen loppuun
  ja UI (kortti) piirretään päälle; kamera.txt "pito".
- **taso1b4 40,3–41,3 s (oikea pelibugi)**: kujaportti-3:n katettu läpikulku (alapinta 3,0 m, katto 6,2–8,4 m, 6 m syvä):
  räystäsnosto vei kameran 5 m:iin → palkiston sisään, kamerasuoja veti sahaten alas (kamera.txt 216,8–217,9 s: 5,1→3,2→6,0→3,3 m).
  Korjaus **1b80e7201 LÄPIKULUN KATTO**: kun kameran ja keisarin välissä tai 2 m keisarin edessä on katettu läpikulku (alapinta
  ≥ PorttiMinAla 2,5 m, muurit kummallakin sivulla 5 m:n sisällä), kamera rajataan alapinnan alle 0,5 m (DroneNosto.LapikulkuRaja:
  lasku 5 m/s kameran korkeudelta, vapautus 2 m/s). Loki "läpikulun katto". Peli-testit 798/798 (uusi LapikulunKattoLaskeeJaVapautuu).
  RISKI tarkistettava tallenteesta: kapea kuja, jonka molemmilta puolilta räystäät (alapinta ≥ 2,5 m) → kamera räystäiden alle.
  Linjaus: KK 3.11. "oviaukossa kamera lähenee Puyin taakse" ja PT 31.10. linjaus a (kamera seuraa portin läpi).

## Tallenteet (pyydetty JU:lta 02.00; JU ilmoittaa valmiista)
1. taso1b5: `zsh .../tallenne-218t/ketju-taso1b5.zsh` (linja 2) → tallenne-218t/<aika>-taso1b5.mp4; ketjun tuloste listaa
   läpikulun katto-, rakennusmassa- ja PELAAJA PIILOSSA -rivit. Tarkista 38–43 s (kujaportti-3) kamera.txt:stä
   (lokit/esikatselu-<aika>/juoksu/kamera.txt, sarake 4 = y): ei sahausta, y < 2,6 m portin alla.
2. salit: `zsh .../sali-218b/ketju8s.zsh yk cx th tj ty cc xf ys` (linja 1) → sali-218b/<aika>-<koodi>-v3.mp4, huom-<aika>-<koodi>.txt.
   Tarkista: lokissa EI "avaus: LentoAlkaa" uudestaan-rivin jälkeen, maali-rivi tallenteen aikana, kamera.txt lopussa "pito"-rivit
   ~3 s; katso kuvat (ffmpeg -ss) oviaukoista ja kortista. Puyi ruudussa koko ajan, ei pelkkää seinää.
3. Valmiit → **suoraan KK:lle** (local_37f7c945, KK katsoo sekunneittain), kopio PT:lle. Jos ensimmäinen ajo on kesken lähtenyt
   maaliin (hyppy ennen uudestaan-juoksua), lisää sk3:een `odota-peli 1` uudestaan-rivin jälkeen tai tarkista loki.

## Jono (muuttumaton muuten)
1. KK:n osa 3: tallenteiden tarkistus ja lähetys (yllä); KK:n uusi palaute → korjaa.
2. Arkiset hahmot heti, kun Codexin paketti tulee postilaatikkoon (ei vielä 02.00; tilaus 409d7f494 + 2a5910c5a).
3. VS:n juoksupelin sade, kun VS ilmoittaa. 4. Siivoukset (Taso1ReittiPortiltaAukiolle03, kamera-218/SEIS).
- 1b80e7201 on pelikoodi (ei vain QA): junaan vasta PT:n kuittauksella tallenteen jälkeen (tallenne PT:lle → SHA NS:lle).
