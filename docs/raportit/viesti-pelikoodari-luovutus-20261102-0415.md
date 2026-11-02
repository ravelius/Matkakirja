# Pelikoodari: luovutus 2.11.2026 klo 04.15 (konteksti 26 %, pehmeä raja) – juna 218

Edellinen: -20261102-0405 (PR 5936; lue sen SELVITYS ja haarat). Tilaus (PT 04.0x): 1) bugi 13 kääntö, 2) bugi 12 harmaa palkki,
3) bugi 10 vahvistus. Muurikulut: odota LAV:n LOD-löydöstä (aukko 7,7 m vs ~4 m). TF 217:n runkoon ei koskettu.

## Valmista (proto-git, EI vielä NS:lle – tallenne puuttuu)
- **ee17f6928** (haara pelikoodari/korjaus-218, worktree wt/proto-pelikoodari-korjaus-217, 22de5be30:n päällä): BUGI 13.
  Syy: lähtölaskennan lukko (laskentaLukko, LaskentaLukkoS 1 s) palautti vain kohde.y:n. Ohjauksen siirrossa ennakoiva räystäsnosto
  (rennakko 5,0 m / 1,0 s, gate AvausT < 0) alkoi, ja NostoLahemmas veti tavoitteen heti vaakasuunnassa 6,9 → 3,7 m → kamera syöksyi
  eteen (dNyt 7,25 → 5,07 → 6,1 heilahdus), kenttä 30 → 39° (etäisyyskorjaus) ja korkeus 2,7 → 4,6 m (taso1d-loki rivit 4128–4430,
  esikatselu-20261102-031731). Korjaus: lukko palauttaa koko tavoitteen (`kohde = Lerp(kohde, ennenNostoaK, lukkoW)`), joten nosto ja
  lähennys tulevat yhdessä 1 s:n SmoothStepillä. Lukon ulkopuolella (lukkoW 0) ei muutosta. unity-tarkistus 0 virhettä.
- Tallennehaara **pelikoodari/tallenne-218** = 5256a74ef (merge ee17f6928; worktree wt/proto-pelikoodari-kivi-216, sisältää
  tallenne-alku/tallenne-video.sh). Skenaario ja ajo valmiina: proto-3d/_tyo/pelikoodari/korjaus-218/sk-218a.txt (tallenne heti
  v4-avauksesta, ei avaus nyt → kattaa bugin 10 ja ohjauksen siirron) ja `zsh .../korjaus-218/aja-sk.zsh sk-218a.txt 218a`
  (Ultra, ~16 min, tulostaa siirtolokin). AJAMATTA: tarvitsee JU:n vuoron (10.5) – pyydä se ensin.

## SELVITETTY
- BUGI 12 EI OLE ESTE: harmaa "palkki" on Longzongmenin portin edustan porrasta/laattaa (~x 127, z −562; loki "kortteli avoin
  longzongmen portailla (lattia 0,20 m)" samalla hetkellä; ei hyppyestettä lokissa). Laatan päällä on laattakuvio (n. 2 m syvä),
  vain etupinta (nousu) on tekstuuriton. Hyppyesteen paikkamalli olisi 0,5 m korkea ja 0,3 m syvä ja kokonaan harmaa. Näkyy yhä
  taso1d-videossa 64 s (proto-3d/_tyo/pelikoodari/tallenne-217/20261102-031731-taso1d.mp4). → LAV:lle: Longzongmen-osan portaan
  nousupinnan UV/materiaali (mallivika). Hyppymallit (esteet-v2 hyppy-penkki/laatikot/ruukut) latautuvat ja vaihtuvat oikein.
- BUGI 10: alkuperäisessä videossa (sk-tallenne-217.txt) `tallenne-alku` oli ENNEN `botti 1`/`avaus nyt` → loki: tallenne alkaa →
  "uusi juoksu" → maailma ja mallit ladataan uudelleen (estemalli-rivit uudelleen 3072–3091) → sininen tausta ennen maailmaa =
  uudelleenkäynnistyksen artefakti. Vahvistus oikeassa pelissä = sk-218a (yllä).

## Seuraavaksi
1. JU:n vuoro → aja sk-218a → katso video: alku (latauskuva → avauslento, ei sinistä) ja ohjauksen siirto (ei syöksyä; siirtoloki:
   dNyt ja kenttä muuttuvat tasaisesti ~1 s). Jos kunnossa: SHA ee17f6928 NS:lle (local_99130238) seuraavaan runkoon + rivi PT:lle
   videon polun kanssa. Jos siirto tuntuu yhä hätäiseltä, LaskentaLukkoS 1 → 1,5 s (DroneNosto.cs:247) on seuraava säätö.
2. Muurikulut: LAV:n LOD-löydös (edellinen luovutus). Diagnostiikka f8a5e05e3 (peitto-218) ei vielä NS:lle.
