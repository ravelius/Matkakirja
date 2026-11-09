# Pelikoodari: luovutus 09.11.2026 klo 18.59

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (27 %). Edellinen: `git show 496bc6d6f:docs/raportit/viesti-pelikoodari-luovutus-20261109-1815.md`
(kaikki sen kohdat hoidettu). Kuvat ≤ 1000 px (sips -Z 1000 scratchpadiin), laajat haut Sonnet-agenteilla.

## TEHTY TÄSSÄ VUOROSSA (kaikki natiivi-backup pelikoodari/valmisluennat-v9, työpuu /Users/Shared/Claude/wt/natiivi-nimiaanet-yhd)
- 6cd7efcdc tyhjä/rikki klippi (ajo pk-luenta-tyhja-iphone-6cd7efcdc katsottu: 4 tyhjää poistettu, FMOD 0) – junassa 224.
- f043860b7 VALMISLUENNAT v9 (PT kuittasi, junassa 224 = 4db6234e9): 7 kadonnutta ihmettä pelin 2 palana (alut2-otto leikattu,
  pilko.py HAKU_S 1,0, ALIMIT 0,79) + Tuileries tyhjällä tagilla; v9 = v8 + 15 = 9 267. Media VIETY ämpäriin 18.25
  (_valmiit/luennat-v9-vienti-20261109; v8 ennallaan, 15/15 sha ok). Testi KadonneetIhmeetPelinPaloina (Kappalejako Peli-testeihin),
  887/887. Työkalut: proto-3d/_tyo/pelikoodari/pariisi-nimet-20261109/v9-leikkaus/ (laske2.py, tee-v9.py: LAHTEET.md EI summiin).
  Ajo pk-luennat-v9-iphone-f043860b7: Les Halles + Temple pala 1+2 v9/k:sta.
- 6a27206b2 esihaku esilataa valmiin kappaleen tiedostona (ennen palavirta → turha generointi / testissä 204). Ajo
  pk-luennat-v9-iphone-6a27206b2: 0 × 204. PT kuittasi, junassa 224 = 72b4e4477.
- 7cf4f1f10 KortinLukija (KS:n Kensington-vika, 2. avaus ▷ eikä puhetta): VANHA vika (KS:n 9be5c8e2e ilman 6cd7efcdc:tä: tyhjä
  204-klippi "soi" hiljaa → ketju jäi Elossa → uudelleenavaus kiinnittyi kuolleeseen). Nyt kiinnitys vain, kun Puhe.SoivaUrl != null
  tai Tauolla; muuten "pinnattu luenta ei enää soi … → alkaa alusta". unity-tarkistus 0. PT tietää.

## JONO
1. JU-ajo 7cf4f1f10 (Mac, KS:n skenaario "/Volumes/T7 4TB/koodaus/proto-3d/_tyo/karttaseppa/nostot-korostetut-20261109/sk-lontoo-kensington-mac.txt")
   → lokit/pk-kensington-7cf4f1f10. Odotus 2. avauksella: "ui lukija: aloita pala 1/3" tai "… ei enää soi … → alkaa alusta", EI
   "pinnattu luenta jatkuu palasta 1/3". HUOM: Mac-testissä worker vastaa Lontoon palavirralle 204 (ei säilössä) → puhe ei kuulu
   silti; ratkaisevaa on lukijan aloitus. Katso loki + kuva → PT:lle ≤ 3 riviä → junaan 224.
2. Sen jälkeen "JONO TYHJÄ: Pelikoodari" PT:lle.

Testit: `cd Peli-testit && sh kaanna.sh <osa>`, `sh Peli-testit/unity-tarkistus.sh` (työpuussa; ei zsh, ei "echo ===" zsh:ssa).
