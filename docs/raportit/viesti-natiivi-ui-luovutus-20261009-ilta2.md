# Natiivi-UI: luovutus 9.10.2026 ilta 2 (kontekstin nollaus 19.4x, PT:n käsky)

Työtila: proto-worktree /Users/Shared/Claude/wt/proto-natiivi-ui-olavpeli (nykyinen haara natiivi-ui/asettelutesti-174), web-checkout
/Users/Shared/Claude/Matkakirja-natiivi-ui (haara natiivi-ui-luovutus-20261005, vain raportit). Muistio: muisti natiivi-ui-tila-20261009.md.
Edellinen luovutus (kielivahti, UI:n ulkopuoliset tekstit): viesti-natiivi-ui-luovutus-20261009-ilta.md.

## KESKEN: UITK-asettelutesti (PT 9.10. 19.3x, junaan 174)

- Haara natiivi-ui/asettelutesti-174, kärki 9952aab74 (runko 9b23235b2, ajuri Natiivisepän ehdoin 121a09244, nyt-rivi 9952aab74).
  Pohja juna-173 1d5614b7d.
- Osat: Assets/Matkakirja/UI/UiRuutu.cs (ruudun koko/turva/skaala; editorissa testikoko ympäristömuuttujasta MATKAKIRJA_UI_TESTIKOKO
  SubsystemRegistrationissa), UiKerros (Tabletti/PikseliaPisteessa/Pisteskaala testikoosta, PanelSettings.targetTexture testikokoon,
  turva-alue UiRuudusta), OpasValikko (Screen → UiRuutu asettelussa, TestiKysymykset, TestiJuuri/TestiValikko/TestiAvainnapit,
  NollaaViimeisin SubsystemRegistrationissa), NytRivi.TestiLappu.
- Testi: Assets/Matkakirja/Editor/AsetteluTesti.cs (-executeMethod Matkakirja.Editori.AsetteluTesti.Aja, KoriKoosteTestin malli):
  4 kokoa (iPhone 17 Pro 1206×2622 @3 pysty/vaaka, iPad Pro 11" 1668×2420 @2 pysty/vaaka), jokaiselle Play-tila tyhjässä kohtauksessa
  (EnterPlayModeOptions = DisableDomainReload ajon ajaksi, palautetaan), tila-automaatti EditorApplication.updatessa:
  Kysy-paneeli (otsikko, Puhu oppaalle, Kirjoita oppaalle kokonaan turva-alueella + ilman vieritystä, peitto ≤ 45 %),
  ohjausnapit (☰, ☀/☾, ■, tauko, seuraava, väkänen, Kysy-rivi) turva-alueella, nyt-rivi turva-alueella eikä avainnappien päällä.
  Tulos tulokset/asettelutesti.txt, exit 0 = läpi.
- Ajuri: tyokalut/ui-asettelutesti.sh <haara> (käännöspalvelun kopio /Users/Shared/Claude/proto-3d/Matkakirja-proto-kaannos, sama lukko,
  jono 60 min, nice 10, aikaraja 6 min, loki proto-3d/lokit/kaannospalvelu/<aika>-testit-<sha>.log, kopio palautetaan masteriksi).
  Natiiviseppä katsoi ja hyväksyi (19.4x). Ajo vain Julkaisijan NYT-vuorolla: kirjattu ~20.20 (LS1:n kulma-arkin jälkeen, ennen
  Natiivisepän 6.7-käännöstä). Aja: `/Users/Shared/Claude/wt/proto-natiivi-ui-olavpeli/tyokalut/ui-asettelutesti.sh natiivi-ui/asettelutesti-174`.
- EI VIELÄ AJETTU: Editor-koodia ei käännä unity-tarkistus.sh, joten ensimmäinen ajo voi paljastaa käännösvirheitä tai Play-tilan
  käynnistysongelmia (pelin 111 RuntimeInitializeOnLoad-alustusta tyhjässä kohtauksessa). Kun pallo menee läpi: linnan HUD
  (SeikkailuTapit: tapit, toimintonappi, ☰, löytö) samaan testiin. Sitten rivi PT:lle (mitä, testit, SHA) → junaan 174.

## Tänään kuitatut (avoin juna 173, SHA:t Natiivisepällä)

- natiivi-ui/yo-otsikko-173 ebcb70046: KYSY OPPAALTA -otsikko yöteemassa (tk-teema-tumma .mk-linssivalitsin__valiotsikko).
- natiivi-ui/linna-latauskuva-173 3e53e0f82: Olavinlinnan latauskuvan tausta heti, kerrokset perään (simu 82ca09bf6: tausta 0,3 s).
- natiivi-ui/kysy-vaaka-173 7b8fe62ce: Kysy-paneeli iPhonen vaakatilassa 45 % leveä (Puhu/Kirjoita ilman vieritystä).
- UI-kuva-arkki 19059ffb7 (iPad + iPhone, pysty + vaaka) = TF 173 -laitetodennus kuitattu: proto-3d/lokit/todistus-ui-173-ipad-20261009-1814,
  -iphone-20261009-1820; skenaario sk-ui-173.txt ipad-kansiossa. Huom: `ui sulje` ei sulje oppaan Kysy-listaa (skenaariossa
  tietokortisto ja iPhonen mikseri jäivät siksi tarkistamatta); simuajoissa täysi UDID (F7513985-C8BC-…, 19A854CE-F8F3-…).
- Juna 174 kielivahti valmis (erät 773d7e09e → 7d1bf4a63, UI-kansio 197 tiedostoa, ui.fi.json 1304 avainta).
- Tähtien iso v3 pysyy junassa 173 (PT) kunnes v4; palautus d00e429f8 EI junaan.

## Jono

- Tyhjä asettelutestin jälkeen: oma suositus näkyvästä UI-parannuksesta (pallo/Olavinlinna, olemassa olevat pohjat) yhdellä rivillä PT:lle.
- Testaus: vain automaattiset + käännös; simuajo vain PT:n erillisellä pyynnöllä (poikkeus liikkuvat kohtaukset). Ma 12.10. asti kone
  vapaampi (2 simua jos muisti riittää, NYT-vuorot ennallaan).

## Omat ajot

Ei käynnissä olevia ajoja, käännöksiä eikä simulaattoreita (vapautettu 19.04). Käännöspalvelun lukko ei ole minulla.
