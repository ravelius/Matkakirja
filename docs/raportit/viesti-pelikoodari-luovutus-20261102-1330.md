# Pelikoodari: luovutus 2.11.2026 klo 13.30 – juna 218

Edellinen: -20261102-1250 (PR 5980). Syy: konteksti 25 % (pehmeä raja). Runko 218 = d85660f03.

## Valmista (proto, wt/proto-pelikoodari-tausta-v99; commitit paikallisia, protolla ei originia)
Haara **pelikoodari/kapea-reitti-218**: d85660f03 → … → b0ea927c8 (kapea reitti) → 76ef8082c (eunukit 2.177) →
**be73a2795** → **7347c1f28** → **f4d65d024**.
- **be73a2795 Yangxindian umpikujasalina (PT 2.11.)**: JuoksuPalatsiVerkko.UmpikujaSalit = { "n-mielen-ravitsemisen-halli " };
  Karsi ei poista umpikujia solmuista, jotka ovat salin kapean reitin kaistalla (UmpikujaSalissa, puolileveys + ruutu). Takaporttia ei
  tehdä (PT): saliin mennään ja sieltä palataan 遵义门:n kautta (keisari kääntyy ympäri, JuoksuV4 "kaanto ympari"). Testit
  UmpikujaSaliEiKarsiudu (testipohja) ja PalatsiTaysinAvoin (umpikujat salissa lasketaan erikseen).
- **7347c1f28 kytkentä**: TaustaKansio kielletty-tausta-v100 (遵义门:n oviaukko), RakennusKansio kielletty-rakennukset-v98
  (v97 + kadun jatko: liitos-zunyimen jatkuu 西一长街:llä etelään verkkoon, pisteet [43.484,0,−37.981], [44.983,0,−37.928]),
  EstoTiedosto palatsi-esto-v25. JU vei kaikki mediaan 13.10 (PT kuittasi).
- **f4d65d024 siivous (PT)**: Taso1ReittiTyokalu ohitetaan, kun juuri-v68:n vanhat versiot puuttuvat (esto-v12:n vienti siivottu;
  File.Exists on tosi katkenneelle symlinkille → Luettavissa).
- Testit: 793/793 ilman juurta ja v98-juurella (juuri2 + v98/v100/esto-v25). unity-tarkistus ei ajettu (vain Peli/-koodia + kaksi
  merkkijonovakiota Scripts/:ssa).
- Diagnoosin tulos: v97:llä reitti meni portin läpi, mutta päättyi kadulle ilman verkkolinjaa (kadun x −51,3 -linja z 231,4 asti,
  jatkuu z 300,4:stä); ilman poikkeusta halli karsiutui umpikujaketjuna kokonaan.

## Salitallenne – VALMIS, odottaa PT:n kuittausta (PT:lle 13.25)
- Haara **pelikoodari/sali-218** = kapea-reitti-218 (7347c1f28) + piirtajat-218 (86f9a7201), merge 8418d92d1 (ilman f4d65d024:ää, vain testi).
- Ajettu 13.12–13.22 JU:n NYT-vuorolla linjalla 1: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218/aja-sali.zsh (aja-sk.zsh:
  PROTO_LINJA=1, ei odotusta), skenaario sk-sali.txt: taso 0, botti, alku pohjassa (−75,29; 228,54) kadulla 遵义门:n eteläpuolella,
  maali (−120,69; 281,46) salin pohjoispää. Loki proto-3d/lokit/esikatselu-20261102-131246.
- Tulos: botti kadulta 遵义门:n läpi esipihalle, saliin ja S-N:ää pohjoispäähän; maali saavutettu ("maali piste"). Video
  sali-218/20261102-131246-sali.mp4 (juoksu 31–50 s), koonnit koonti.jpg ja koonti-juoksu.jpg.
- PT:lle huomautettu: kamera hipaisee seinää kapeissa kohdissa (36 s portissa, 40 s esipihalla, 47–48 s räystäs täyttää kuvan).
- SEURAAVAKSI: PT kuittaa 214 + kapea reitti + eunukit + sali → NS (runkoon: kapea-reitti-218 = f4d65d024). Jos PT pyytää kamerakorjausta
  kapeisiin kohtiin, se on uusi erä.

## Bugi 2 – valmis
aja-218p ajettu 12.51–13.09 (linja 2): korjaus-218/piirtajat-218p.txt + 20261102-125154-218p.mp4 → LAV. LAV paikansi
(dougong-intercolumn-kannattimet 104–105,5 s) ja korjaa itse; PK:lta ei tarvita muuta.

## Jono
1. PT:n kuittaus salitallenteelle (yllä) → NS.
2. Muuta ei jonossa.

## Huomiot
- Worktree tausta-v99 on haarassa kapea-reitti-218 (f4d65d024); sali-218 vain tallennetta varten.
- Scratchpad (vanha f9eec268…): juuri2 sisältää nyt linkit v96, v97, v97koe, v98, tausta-v100, esto-v25; aja3.sh/aja4.sh.
