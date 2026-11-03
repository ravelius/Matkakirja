# Pelikoodari: luovutus 2.11.2026 klo 05.38 (konteksti 25 %, pehmeä raja) – juna 218

Edellinen: -20261102-0504 (PR 5939). Tilaus (PT ~05.07): 1) B2 porttihallin päätyseinät, 2) kapeiden kujien kamerakohdat, jos jäljellä.

## Valmista ja junan 218 rungossa
- **B2 = 376375704** → NS:n rungossa **15220d700** (testit vihreät, tarkista 0):
  - cab90b7c9: `KattoHaivytys.OnPortti` tunnistaa "longzongmen" (JuoksuKortteli.cs) → taustan porttihallin katto häipyy
    räystäslinjalla (PorttiReuna) ja palaa vasta, kun näkölinja kamerasta ei kulje sen ali (NakolinjaPiiloon portit). Testi JuoksuKortteliTestit.
  - TaustaKansio "kielletty-tausta-v97/" (LAV: päätyseinien V4_red y ≥ 4,0 leikattu solmuun katto-longzongmen, lod0/1/2; JU vei 05.15).
    LOD2:ssa katto-longzongmen sisältää vain seinän yläosan (katto on LOD2:ssa taustassa) – vain kaukana, ei vaikutusta.
- NS:n vakiovaihdot: tausta v96 (LAV bugi 12, nousupinnat) b43002b54 → 47be8381b; c2 v34 (LAV, porttikäytävien alaraja pois) b14d9f55f → ee32a9b85.

## Tallenne (tarkistettu, video PT:lle 05.35; PT:n pysyvä kuittaus → SHA NS:lle tehty)
- Haara pelikoodari/tallenne-218c = 2f4234aa6 (= tallenne-218b 7fc16be30 + b2-218; EI junaan). sk-218b vaatii sarjat-peitto-komennon
  (vain tallenne-haaroissa) → aja aina tallenne-haaralla: `zsh aja-sk.zsh sk-218b.txt <nimi> pelikoodari/tallenne-218c` (_tyo/pelikoodari/korjaus-218).
- Video: proto-3d/_tyo/pelikoodari/korjaus-218/20261102-051759-218c.mp4 (+ -porttihalli-58-70s.mp4), loki proto-3d/lokit/esikatselu-20261102-051759.
- Mittari `/opt/homebrew/bin/python3 _tyo/pelikoodari/korjaus-218/punainen.py <video> <alku s> <kesto s>` (ffmpeg rawvideo 320×200; punainen R>120 ja >1,8·G,B; keltainen Puyi R>150,G>130,B<90;
  piilossa = keltainen < 0,0005): 5–260 s ei yhtään piiloruutua (vanha 218b: 63,7–65,3 s), punainen max 0,10. Kapeat kujat eivät toistu → kohta 2 valmis.
- Havainto PT:lle: kamera ylittää jäljelle jäävän 4 m:n seinän ohuena punaviivana (leikkauspinnassa ei kantta) – LAV:n viimeistely, jos PT haluaa.

## Avoimet
- Ei omaa jonoa. Odota PT:n vastausta B2-videoon (kansi seinän leikkaukseen?).
- Worktreet: wt/proto-pelikoodari-korjaus-217 (b2-218, junassa), wt/proto-pelikoodari-kansiot-218 (c2-v34-218, junassa → voi poistaa),
  wt/proto-pelikoodari-kivi-216 (tallenne-218c), wt/proto-pelikoodari-peitto-218 (f8a5e05e3). JU:n vuoro vapautettu 05.33.
