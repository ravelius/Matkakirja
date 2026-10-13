# Natiivi-UI: luovutus 13.10.2026 ilta-yö (20.5x, PT:n nollauspyyntö, konteksti 50 %)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261013-ilta.md (juna 187 valmis:
kuvakkeet, tieto, korjatut kuvakkeet, värivakiot, heksavärit; kaikki juna-187:ssä, web #4561 pidätetyissä). Pysyvät säännöt
-20261012-ilta.md ja -20261010-aamu.md. Ajoskriptit: /Users/Shared/Claude/proto-3d/lokit/natiivi-ui-ajoskriptit-20261012.

## SEURAAVA ERÄ (kesken): ISS-Cupolan robottikäden Pulu siluettina — juna 188
Omistajan palaute 13.10. klo 20.3x (kuvakaappaus iPhonesta: ISS-ohjaamo, Cupolan ikkuna, Pulu robottikädessä oikeassa
alakulmassa), sanatarkasti: "Pulu ja varsi pitäisi olla ihan musta siluetti paitsi pulun oma kypärävalo. Pulu voisi olla
aavistuksen pienemmällä ja varsi pidemmällä kuin avaruus kävelyllä. Kun pulua painaa se voisi hilautua lähelle ruutua ja
sitten valaistua samalla paremmin."
PT:n tehtävä: 1) lepotilassa Pulu ja varsi täysin musta siluetti, vain kypärävalo (kypärälamput + kasvovalo); 2) Pulu aavistuksen
pienempi, varsi pidempi; 3) napautus → Pulu hilautuu lähelle ikkunaa ja valaistuu, taulu aukeaa kuten nyt; taulu kiinni → siluetiksi.
Säilytä kosketusalueen korjaus 3757d0760. Vain olemassa olevat pohjat/vakiot. Toimita kuva-arkki (iPhone pysty + iPad vaaka;
lepo + napautettu) ja siirtymästä ruutusarja PT:lle ennen kuittausta. Webissä sama robottikäsi (js/livia-svg.js evaRobottikasi),
mutta Cupolan ikkunan takana -asettelu on natiivin oma → kerro PT:lle rivillä: vastinmuutosta ei tarvita (NATIIVI ON MALLI).

### Tehty (haara natiivi-ui/pulu-siluetti-188, pohja natiiviseppa/juna-188 f9170af15, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-pulusiluetti188)
- c8058b597: LiviaKuva.Valaistus 0–1 (Robotti(): Siluetissa() lerppaa mustaan; reunavalo ja Maan valo × valaistus; kasvovalo
  ja kypärälamput valoa: true eli eivät tummu; kasvojen soikio alfalla valaistus). Pulu.cs: CupolaPienennys 0,88, CupolaVarsiLisa
  0,14 lasin sädettä vasemmalle, hilaus HilausS 0,6 s (tavoite = Chat.Auki), HilausKasvu 0,4, kypärä lasin keskelle
  (HilausKyparaX 0,12, Y 0,1 sädettä); RobottiTila näyttää hilaus/valaistus.
- 2c4012925: ui puu listaa nimetyn näkymättömän kosketusalueen (pulu-kosketus) → todistusajon `tap-teksti pulu-kosketus` toimii.
- Tarkistus 0 virhettä, pohjavahti ok. Käännös 8caebc5fe (2c4012925) appikopiossa natiivi-ui-app-siluetti188.
- Ensimmäinen ajo (9fde7916): lepokuvassa Pulu + varsi mustana siluettina, pienempi, kypärävalo näkyy (visiirissä kasvovalon
  beige soikio, sivuilla lamput) — katso onko visiirin valo omistajan "kypärävalo" vai liian kirkas; NYKYINEN lepo iPhone:
  lokit/todistus-siluetti188-iphone-20261013-2027 (76c30d37).

### Seuraavaksi
1. SIMU NYT Julkaisijalta (pyydetty, ~21.05) → `zsh siluetti188b.sh` (UUSI iPhone, NYKYINEN + UUSI iPad vaaka; sk-siluetti188(-vaaka),
   iPadissa `ui kierto vaaka`; video `hilaus.mp4` → ruutusarja ffmpegillä esim. fps=8, 0–2,5 s). Ilmoita SIMU VAPAA ja sammuta simut
   (`source tyokalut/simusarja.sh` ennen `xcrun simctl shutdown <oma UDID>`; iPhone 96044270…, iPad F7513985…).
2. Tarkista: hilaus näkyy (Pulu suurenee ja siirtyy lasin keskelle, valaistuu), taulu ei hypi, kosketus osuu (oleta/nakyy Minne
   katsotaan), paluu siluetiksi. Säädä tarvittaessa vakioita.
3. Kuva-arkki + ruutusarja PT:lle (pari.py NYKYINEN | UUSI), kuittaus → SHA NS:lle (pohja juna-188).

## Opetukset
- `tap-teksti mk-pulu__kosketus` ei löydä: ui puu listaa vain piirtävät/tekstielementit → 2c4012925 (nimi päättyy "kosketus").
- Simulaattorit ovat T7-sarjassa: `xcrun simctl` ilman simusarja.sh:ta antaa "Invalid device".
- `ui sulje` ei sulje radiotestikuorta eikä kohdekarttaa → ne skenaarion loppuun.
