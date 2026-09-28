# 1.0.40-juna perussavuke (Laitetestaaja, 28.9.2026 klo 22.4x)

Käännös 1ad1c538 (juna/b13 b3001497), asennettu käsin 1572C658 (iPhone 18 Pro) laitteelle
(vahdin asennus kattoi vain C1D5E34C/993F8873, ei omiani). iPad (3B4CDACB) ei booted — vain
yksi simulaattori kerrallaan (Natiivi-UI:n FB234D08 käynnissä samaan aikaan, Julkaisijan ohje).

## Tulos: PASS (perustaso)
- Asennus ja käynnistys puhtaasti (`simctl install` + `launch --console-pty`), ei kaatumista.
- Tallennuksesta jatko ("Jatka matkaa") lataa Ateena/Kreikka-kartan oikein, merkit/nimet/Pulu-ikoni näkyvät.
- Kehittäjätila päällä onnistuneesti (`kehittaja koodi` + `kehittaja tila` → "pöllön koodi on").
- `erikois tapahtuma colosseum` + `erikois tila` vastaa "erikoismallit: päällä" ilman virhettä
  (ei visuaalista todennusta — kamera ei tällä komennolla siirry Colosseumille, täytyy navigoida
  sinne käsin; EI TESTATTU visuaalisesti).
- peli-loki.txt/ui-loki.txt: ei uusia poikkeuksia/virherivejä tältä ajolta.

## EI testattu tällä kierroksella (ajanpuute + epäselvät komennot)
- **Maapallon vuosi -linssi + Thessalia-korjaus**: en löytänyt debug-komentoa maakuntakartan
  (`MaakuntaKartta`) avaamiseen — `napauta x y` (komento.txt) toimii pallo/kartta-kameralla,
  mutta en tunnistanut oikeaa polkua maakuntakarttatilaan. `linssi maapallon-vuosi` (Id vahvistettu
  koodista, LinssiKomennot.cs/MaapallonVuosiLinssi.cs) pitäisi toimia kehittäjätilassa (ei avauskynnystä
  vielä, LinssiOhjain.cs rivi 199: "hiomassa"). Linssiseppä 2:n tarkennus tarvitaan täsmäkomentoon.
- ISS-kyyti (pilvet/Cupola), Uusi matka → Ateena-aloituslento (15s), nostokortin lukijabugin
  uusinta (odottaa Natiivi-UI:n vahvistusta kaiutinkorjauksesta).

## Laite
1572C658 terminate+shutdown siististi lopuksi. 3B4CDACB ei booted koko kierroksella.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
