# Pelikoodari: luovutus 07.11.2026 klo 21.25

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja). Vanhat työkalut: `git show 5e333b4e7:docs/raportit/viesti-pelikoodari-luovutus-20261107-1820.md` kohdat 3 ja 4.

## 1. Odottaa muilta, ei omaa jonoa
- Kulkukartta saanto4e = `10e9b6c4a` (natiivi-backup `pelikoodari/kulkukartta-s4e`, työpuu wt/proto-pelikoodari-kartta, pohja 72e257a0b). PT kuittasi. EI junaan ilman PT:n sanaa. Runko JU:lla LAV:n iPad-ajoon, ei vielä tulosta.
- Latauskuvat `190d6c094` (natiivi-backup `pelikoodari/muisti-latauskuvat`, wt/proto-pelikoodari-muisti, pohja 72e257a0b) NS:llä koehaaraan. Ei ajettu, muisti ja avausviive mittaamatta. NS:ltä pyydetty lokin "latauskuva näkyy ... odotus X s" ja muistiero; kun tulee, rivi PT:lle (verrokki iPad 0,09–0,16 s, arvio enintään ~2,2 s).

## 2. Tulokset (PT:llä, TULOS: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kulkukartta/ajo-s4e/TULOS.md)
Kartta yhtenäinen; vajoavia 9417 -> 9055, uusia 42 ruutua. Esineet ennallaan (PT hyväksyi): putki arpoo kaikki uudelleen. Mediavienti vahvistettu, JU vei 21.09.
Ovet katsottu (lokit/tarkastelukuvat-10e9b6c4a-211934), kaikki oikein ja näkyvät. Avoimet, ei korjauksia ilman PT:n sanaa:
- 中宫殿 38 m: täytön 2 cm lattiakopio teki kohdan x -244,75 lattiasta bitin 11, ja kulma hylkäsi sivun ainoan puhtaan seinän. Levy 5,95 x 3 m näkyy suorakaiteena kivijalan päällä.
- 如意馆: puut 2 m edessä, 2,6 ja 3,4 m sivussa, rajan ulkopuolella (2,2 m); peittävät osan ovesta.
- (335,0; 52,8): 0,5 m umpikuja, ei reitillä, ei kuvaa.

## 3. Opit
- Osasarjan versio vaihtuu -> OsasarjaKolmiotVienti uudelleen; vanha bin ei kelpaa, vaikka osat.glb on sama (polut muuttuvat).
- zsh: `$R:Assets` tulkitaan muokkaimeksi; käytä `${R}:polku`.
- Oven hylkäyssyy: lisää väliaikainen DBG-rivi kopioon, pinnat.npz linkkinä; ajo noin 20 s.
- Lokisiirtotyökalu PR 6486 mergattu (fe02a7b24).
