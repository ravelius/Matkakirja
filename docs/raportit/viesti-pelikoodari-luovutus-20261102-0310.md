# Pelikoodari: luovutus 2.11.2026 klo 03.10 – KIIRE: TF 217

Edellinen: -20261102-0210 (lue sen "Huom"). Tilaus ennallaan (PT, omistajan yölupa 23.29): SHA:t NS:lle (local_99130238) runkoon 217,
tallenteet PT:lle (local_5df52e10).

## Valmista tässä vuorossa (proto-git, haara pelikoodari/korjaus-217, worktree /Users/Shared/Claude/wt/proto-pelikoodari-korjaus-217)
Kaikki NS:n tilaamia vakiovaihtoja (JU vei ja kuittasi ennen SHA:n lähetystä); NS otti kaikki runkoon:
- cc3286915 tausta v91 → kielletty-tausta-v92 (LAV bugit 11 + 7) → runko e96eb6a8b
- ef43bfeae osamallit v6 → osamallit791-v7 (LAV bugi 8) → runko bf9703232
- 06ccbb916 osamallit v7 → osamallit791-v8 (reunasiiven kuori, porras-suora) → runko 2dd8f42e7
- 0de77ca2b tausta v92 → kielletty-tausta-v93 (LAV bugi 6) → runko d4776b8d7 (9d9957033 = bugi 5 rungossa 0549c0edc)
Haaran kärki 0de77ca2b = rungon d4776b8d7 sisältö (seuraavat tämän päälle; tarkista NS:n uusin runko).

## Taso1c-tallenne (lähetetty PT:lle 03.08)
/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/tallenne-217/20261102-025027-taso1c-alku-leikattu.mp4 (135 s, UI, Ultra; alkuperäinen
ilman leikkausta samassa kansiossa; loki proto-3d/lokit/esikatselu-20261102-025027). Haara pelikoodari/tallenne-217 (2553163e2) = runko
d4776b8d7 sisällöltään. Skenaario sk-taso1c.txt (aja: `zsh aja-sk.zsh sk-taso1c.txt <nimi>` tuossa kansiossa; skripti odottaa vapaata
konetta enintään 60 min).
- Mittari: piilossa 0, kamerahyppyjä 0, kattoja katosi 0, kattoja sisällä 0; "katto pysyy, kamera räystään alla" 10 kertaa; maali 122 s.
- Bugi 10: skenaariossa `tallenne-alku` vasta `avaus nyt` + `odota-peli 1.3` jälkeen → taivasväli 1,1 s → 0,2 s (6 ruutua), leikattu
  ffmpegillä (-ss 0.2). Syy: `avaus nyt` luo uuden JuoksuV4Maailman (cullingMask 0 kunnes Valmis). Oikeassa pelissä ei tarkistettu.
- Täysin punaisia ruutuja 0 (VAVG-haku 5 fps:llä, suurin 160 = eunukin lähikuva avauksessa) → bugit 1–3 eivät näy taso 1:n reitillä.

## PT:n havainnot (taso1b) – selvitetty
- Opetusteksti "Pyyhkäise oikealla peukalolla oikealle" ~0.12–0.40: KUULUU (omistaja 27.10. 08.29: ohje pysyy ja peli hidastuu 0,25:een,
  kunnes pelaaja tekee liikkeen; ohi mennyt tilanne → ohje palaa seuraavassa). Botti ajaa sivuaukkojen ohi suoraan → ohje syttyy 7 kertaa
  (JuoksuOpetus.Aloita: KaantoEdessaS löytää jokaisen oikealle aukeavan sivuaukon 10 m:n ikkunassa). Jos PT haluaa lyhyemmän: ohje vain
  pakkokäännöksessä (suora umpi) – vaatii omistajan päätöksen, koska muuttaa 27.10.-linjausta.
- Kamera ~0.45 (taso1b): oikea käännös muurin kulmassa z ≈ −687, kamera 2,4–2,5 m korkealla, oikea muuri 0,8 m:n päässä (kameraväli
  t 27.87 "muurit v/o 3.0/0.8"); kulma pyyhkäisee etualan läpi. ~1.20 (taso1b) / ~1.03 (taso1c, Puyi (82, −540)): kapea kulku kahden
  muurin välissä, kamera 3,9 m / 5 m takana seinien välissä (ei sisällä), seinät täyttävät sivut; lokissa "muurit v/o 3.0/3.0" eli
  muurihaku ei näe näitä seiniä → selvitä, ovatko ne peittokartassa (JuoksuSokkeloMaailma.Huippu; `ui juoksupeli palatsi seinat`).

## Kesken (järjestys)
1. Kamera kapeissa muurikuluissa ja kulmissa (yllä): SEINÄVARA (JuoksuV4Maailma.cs ~1478, DroneNosto.SeinaVara*) ja puomi. Tarkista
   ensin peittokartta kohdassa (82, −540) ja kulmassa (≈ 130, −685). Uusi tallenne korjauksen jälkeen.
2. Bugi 13 (kamera kääntyy ~25° 0,2 s:ssa ohjauksen siirtyessä): ei tarkistettu taso1c:stä (siirtoloki "siirto avaus" lokissa).
3. Bugi 12 (oliivinharmaa palkki 1.10, taso 0): ei paikannettu.
