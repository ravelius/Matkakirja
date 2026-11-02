# Pelikoodari: luovutus 2.11.2026 klo 02.10 (konteksti ~31 %) – KIIRE: TF 217 odottaa

Edellinen: -20261102-0150 (lue sen "Valmista" ja "Kesken"; tämä jatkaa samaa listaa). Tilaus ennallaan (PT, omistajan yölupa 23.29):
SHA NS:lle (local_99130238) runkoon 217 + UUSI TALLENNE (UI mukana) PT:lle.

## Valmista tässä vuorossa (proto-git, haara pelikoodari/korjaus-217, worktree /Users/Shared/Claude/wt/proto-pelikoodari-korjaus-217)
- **d710bfdf5** bugi 5a: katon koristepalat (harja, chiwenit, harjaeläimet, kulta) häipyvät rakennuksen pääkaton mukana
  (`KattoHaivytys.Katto.Johtaja`, `AsetaJohtajat`; Palatsi.cs `KatonSolut`/`Peittaa`: johtajan katto peittää palan pohjan ≥ 80 %,
  joten pihan sisärakennus ei seuraa U-kattoa). Syy: `KattoPalat` pilkkoo katon ~20 palaan omilla rajoillaan; h-zhongyoumenilla
  Puyin reitillä häipyi 4. Testi `KatonPalatHaipyvatRakennuksenMukana`.
- **9d9957033** bugi 5b: talon katto pysyy (Pidetty), kun keisari on katon alla ja kamera sen räystään alla (AlaY, pito AlaY + 0,3).
  Syy 1.42: räystäsnosto rajattu jyrkimmällä kulmalla 5,2 m:iin (KK 31.10.), räystäs 5,3 m → kamera räystään alla, katto häipyi,
  taivas palkkien välistä. Kamera räystään yllä → häivytys ennallaan. Portit (OmaReuna) ja johdetut palat ennallaan; "KATTO
  NÄKYVISSÄ SISÄLLÄ" -mittari ohittaa pidetyt. Lokirivi: "katto pysyy, kamera räystään alla".
- Testit `sh kaanna.sh Juoksu` 146/146, `unity-tarkistus.sh` 0 virhettä. **Ei vielä videossa** (taso1b ajettiin kivi-216:sta ennen näitä).
- taso1b-ajo: oma levyraja aja-sk.zsh:ssa 70 → 30 Gi (ajo vie ~4 Gi; edellinen ajo kaatui "LEVY 69 Gi < 70").

## taso1b-video (00f3be98e, ilman bugi 5 -korjauksia) = PT:n tallenne
/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/tallenne-217/20261102-015303-taso1b.mp4 (137 s, UI mukana; loki
proto-3d/lokit/esikatselu-20261102-015303). Lähtö työhuoneen ovesta, opetus, 3-2-1 (Laskenta3/2/1 t 35,7–37,7), maali Meridiaaniportti.
Mittari: piilossa 0, kamerahyppyjä 0, kattoja katosi 0, kattoja sisällä 0. Eunukit harvemmat; odottaja portaiden juurella ~1.46
ohitetaan läheltä (ei estä).
Näkyy yhä: **bugi 10** (ruutu 0 kurkistaja → ~1 s vaaleansininen → kuja = skenaarion `ui juoksupeli avaus nyt` -uudelleenkäynnistys
tallenteen alettua), valkoiset portaat (bugi 8, LAV), vino punainen seinäpala ~0.42 (LAV).

## Kesken (järjestys)
1. Lähetä NS:lle: 00f3be98e videolla tarkistettu; 9d9957033 = + bugi 5 (testit ok, ei videota). PT päättää, kumpi runkoon.
   (Tämän vuoron lopussa PT:lle lähti tieto; tarkista PT:n vastaus.)
2. Uusi tallenne korjaus-217:n kärjestä: merge 9d9957033 haaraan pelikoodari/tallenne-217 (worktree
   /Users/Shared/Claude/wt/proto-pelikoodari-kivi-216), `zsh aja-sk.zsh sk-taso1b.txt taso1c` kansiossa _tyo/pelikoodari/tallenne-217.
   Katso 1.42-kohta (h-zhongyoumen): katto pysyy, kun kamera räystään alla; lokissa "katto pysyy, kamera räystään alla".
3. Bugi 10: tallenne alkaa ennen `avaus nyt` -uudelleenkäynnistystä. Helpoin: sk-taso1b.txt:ssä `tallenne-alku` vasta `avaus nyt`
   + odotus (~1,2 s) jälkeen, TAI pelissä uudelleenkäynnistys ilman cullingMask 0 -väliä. Tarkista, näkyykö väli oikeassa pelissä.
4. Kamera 1/2/4 ja 13: taso 1:n reitillä mittarit puhtaat (mutta mittari ei nähnyt niitä taso 0:ssakaan) → katso taso1c-video
   ruutu ruudulta kohdista, joissa kamera kujissa/muurien vieressä.
5. Bugi 12 (oliivinharmaa palkki 1.10, taso 0): ei paikannettu; `ui juoksupeli mika x y` samasta kohdasta.

## Huom
- Proto-haaroja EI pushata (ei originia). Testidata v92/v91: ks. edellinen luovutus.
- Bugi 5:n paikannus LAV:n kansiossa /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/bugit-217/ (malli kunnossa, vika pelissä).
