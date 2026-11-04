# Lavastajan luovutus 4.11.2026 klo 13.35 — LUE TÄMÄ, ÄLÄ VANHOJA

Edelliset: 96c7e066d:docs/raportit/viesti-lavastaja-luovutus-20261104-1240.md (päätökset, sädetestin rajat) voimassa, tämä lisää. M = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri. Python: /opt/homebrew/bin/python3 ilman -I:tä.

## PT:n linja (voimassa)
Muu jono seis KK:n suunnitelmaan asti, paikkakohtaisia ei, lepo on oikeutettu. Tunneli jää kirjatuksi avoimeksi (PT 13.0x): ei korjausta, ei uutta koetta. Ei iPadia. Leivonta6 ja tilaus 8 valmiit, tulokset M/KORJAUS.md:n lopussa; ei vientiä.

## Avoinna 1: ovimalli (omistaja 12.48, ei junaan)
Kuvat (#2024) tulivat 13.27, SHA täsmää: /Users/Shared/Claude/proto-3d/_tyo/codex/juoksupeli-ovi-20261104/_review/. Vietiin KK:lle 13.3x (viesti meni jonoon: tarkista). Kysytty: kelpaako Tripolle, vai uusi kuva kiinalaisemmalla ristikolla (3 × 5 näyttää länsimaiselta). EI Tripoa ennen KK:n sanaa.
Kun KK sanoo kelpaa: tilaus Tripo 3D -sessiolle claude/postilaatikko-haaraan (worktree /Users/Shared/Claude/wt/lavastaja-postilaatikko, push HEAD:claude/postilaatikko). Mallina tiedosto posti/ 006ff6d7d (kala-allas). Lehti ja karmi erillisinä GLB:inä; perusmitta 2,4 × 2,65 m, lehti 1,2 × 2,65 m, sarana origossa, skaalataan noin 2-kertaiseksi; läpinäkymätön; ottomäärä ja kolmioraja kuten 006ff6d7d. PK sijoittaa; mitat ja rajat hänellä (12.5x).

## Avoinna 2: irto-osien haku (KK:n tilaus PT:n kautta, tulos lähetetty KK:lle ja PT:lle 13.3x, kumpikin jonossa)
Kaikki: M/irto/ (RAPORTTI.md, lista.csv, lista.json, laatat.json, tummat.json, irto-kartta.png). Mitään ei muutettu. Odottaa KK:n päätöstä; älä korjaa ennen sitä.
Tiivistelmä: 388 paikkaa = taustan maalaatat väärällä korkeudella, korjaus koko palatsissa alas aukion tasoon, ei poistoa (13 747 m²:n alla ei maata). Tumma terassi: g-jalusta ja g-jalusta-etu päällekkäin, ei todistettu koeleivonnalla.
Ei vielä kokeiltu: muistiossa VS:n ehdotus tausta_tasot_lattiaksi.py ilman rajoja (31.10./1.11.): katso se ennen uuden korjaustyökalun tekoa. Ei tiedossa, tekeekö se saman.
Työkalut M/irto/: kohtaus.py (kaikki kolmiot + lähde; kohtaus.npz 16 milj. kolmiota), komponentit.py, korkeus.py, korkeus2.py, irto_haku.py, lopputulos.py, poimi.py (säde arkin pisteestä; etu/taka-sana siinä on väärinpäin, luota normaaliin), tummat.py, tumma_syy.py. Kamerat: pelin tarkastelukoordinaatit = pohjakoordinaatit, yaw 0 = +z.
Levyä vievät, voi poistaa myöhemmin omasta kansiosta: kohtaus.npz, komp.npz.

## Muuta
Mallien valo (KORJAUS.md): 064 ja 073 punainen 0,00, syy auki. Omat väliaikaiset: /Users/Shared/Claude/wt/lavastaja-postilaatikko pidetään posteja varten.
