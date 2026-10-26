# Pelikoodarin luovutus 26.10.2026 klo 14.34 (Postivahdin kova raja 40 %)

Edellinen: viesti-pelikoodari-luovutus-20261026-1305.md (työkalut: -1132.md, TYÖKALUT JA PAIKAT).
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, haarat paikallisia. Worktree /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211.

## TEHTY 13.10–14.34

- **Elävyyspaketti KUITATTU junaan 211** (PT 14.4x). Haara `pelikoodari/fpv-kallistus-211` siirretty d832f38a9:n päälle; NS:lle lähetetty kärki
  2d0455df3 (testit 747/747, tarkista.sh 0). Sen jälkeen haaraan tuli **db9f6b790** (palkisto, alla), jota NS:llä ei vielä ole → lähetä NS:lle
  uusi kärki, kun editorivarmistus on ok.
- Rikkomisreaktion käsi päälaelle (c44c05f79, ent. 11c3a8202): editorikuva esikatselu-20261026-1341 rk-02 ok.
- Simuvideo 11c3a8202: proto-3d/lokit/todistus-elavyys-11c3a8202-20261026-1420/elavyys.mp4 (66 s, 8 liikettä OK). PT: EI omistajalle, ks. JONO 1.
- **Omistajan pelikuvat 9460c52c6** Isolla iPadilla: _tyo/pelikoodari/pelikuvat-211/omistajalle-20261026/ (LUEMINUT.md). PT tarkisti: EI omistajalle
  ennen kuin löydökset ovat kunnossa ja LR v48 on rungossa. Laiteajon työkalut: pelikuvat-211/aja-laite*.sh + ui-komento*.txt.
- PT:n löydökset: (1) piilot = avoin työhuone ja puutarha. Korjaus 6a605163f puuttui rungosta; myös erillisenä haarana `pelikoodari/avoimet-hallit-211`
  b23fc0ccb (sisältyy elävyyshaaraan). Piilomittarin reunavara 0,6 m (1b1c4df63). (2) Aukion varjokiilat → VS (d41651def puuttuu rungosta).
  (3) LR v48 (terassi). (4) Muurikatteen raidat → VS (k3-kattovarjostin, ei LR:n malli). (5) Nimiteksti = tarkoituksellinen JuoksuKuvateksti.
- **Latauskuva valokuvaksi**: Codex-tilaus posti 4dd682937 + täydennys 7e5361656 (vaaka 2560 × 1180, keisari keskimmäisen 55 %:n sisällä,
  KEISARI-RAJAT.json, uusi päämaski). Vastaus tulee nimellä posti/pelikoodari-codex-latauskuva-valokuva-toimitus-20261026.md, kansio
  posti/latauskuva-valokuva-20261026/. Koodi valmiina (2d0455df3): `LatauskuvaVaakaUrl`, `PaaMaskiVaakaUrl`, `VaakaKeisari` (x0,y0,x1,y1 osuuksina),
  `VaakaOtsikko` (leveys, kx, ky), `VaakaLeima` (leveys, kx, ky, kierto) JuoksupeliNakyma.cs:ssä; LatausRajaus.Peittava + testit.
  Pysty: vaihda LatauskuvaPystyUrl. Latauspalkki = Natiivi-UI, ei sinun.
- Iso iPad: rinnakkaisajoni sotki LT:n b6-ajon 13.46–13.53 (pyysin anteeksi). Nyt on vuorolukko d832f38a9:ssä (tyokalut/ipad-lukko.sh) → käytä sitä.
- Siivous: 4 viittaamatonta omaa esikatselua poistettu (184 Mt).

## KESKEN

1. Editoriajo **sk-palkisto.txt** db9f6b790:stä (taustalla; tulos uusin proto-3d/lokit/esikatselu-20261026-14xx, kuvat pa-01…14). Tarkista, ettei
   turkooseja palkkeja ole (avoin juhlasali, reitti B, 5–10 s ja 19–24 s), ja lähetä NS:lle uusi kärki db9f6b790 (+ rivi PT:lle).

## JONO

1. **Uusi elävyysvideo PT:lle**, kun LR v48 ja VS acd2dac44 ovat rungossa ja Mac on kevyellä kuormalla (TODISTUS: KUORMA ei kelpaa). Skenaario
   simu-elavyys-video-2.txt sisältää nyt `aani-alku 75 elavyys` / `aani-loppu elavyys`: liitä aani/elavyys.wav videoon ffmpegillä (ajoitus
   ajo.login riveistä). PuyiHuudot pitää kuulua rikkomisessa. Valkoinen viiva (82, −543) on LR:llä, palkit korjattu (db9f6b790).
2. **Codexin latauskuvat**: vie ämpäriin, aseta URL:t ja rajat, ja kuvaa vaaka iPhonella, Macilla ja iPadilla (editori: iphone-vaaka, koko
   "2560,1600,…" ja ipad) sekä pysty → PT:lle.
3. Uusi omistajan pelikuvasarja vasta, kun PT:n löydökset 1, 2 ja 4 ovat kunnossa ja LR v48 on rungossa (PT).
4. Kuja-40 odottaa omistajan leveyspäätöstä.
