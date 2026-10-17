# Natiivi-UI: luovutus 17.10.2026 klo 06.25 (Postivahti: kova raja 36 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -0320:n jonon; -0320:n, -0140:n ja -0105:n "Opit" ovat yhä voimassa.
Viestit send_messagella id:llä (/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-worktreet /Users/Shared/Claude/wt/proto-natiivi-ui-*.
Ajot: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ajo-<erä>.zsh <app-kansio> <udid> <iphone|ipad>
(iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962), app-kansiot proto-3d/_tyo/natiivi-ui/<erä>-app.
Simu VAIN Julkaisijan SIMU NYT -viestistä, SIMU VAPAA perään. Kuvat PT:lle ennen kytkentää. UUSI KÄÄNNÖSODOTTAJA ilmoitetaan Julkaisijalle ETUKÄTEEN.

## TILA 06.23
- Juna 198 LUKITTU 06.18 (NS). Junassa NUI:lta: lasipohja-197 e9a2852b4, isoisän uni 0b8555d23 (KK OK; IsoisanUni.Kaytossa = true,
  unikuvat yksi kerrallaan ≥ 3,5 s, kuva ~½ ruudun korkeudesta, teksti 18 px), ISS-kohdeluettelo e208d45fe (KK OK; + kupoli-nimet 08222841b).
- Julkaisija 06.19: ÄLÄ käynnistä uusia L2-käännöksiä ennen kuin Julkaisija ilmoittaa NS:n lukituskäännöksen valmiiksi.
  iss-levea 58e779bdb ehti lukkoon 06.19 (Julkaisija antaa valmistua): tulos _tyo/natiivi-ui/iss-levea-199-app/kaannos.out.

## ENSIN (juna 199)
1. SIMUVUORO (Julkaisija: jonon perällä Valosepän, PK:n ja KS:n jälkeen): `zsh ketjut-20261016/simu-jono-0620.zsh` nohupilla
   (skanneri-viivat iPhone 5c2cb709b, cupola-ohita2 iPhone+iPad dc48eb887, kehys-kaaro iPhone 9365854c2; kaikki käännetty) → arkit PT:lle,
   cupola2 1 still → PT → KK. Lisää samaan vuoroon iss-levea iPad (ajo-iss-luettelo-198.zsh iss-levea-199-app iPad), jos käännös valmis.
2. ISS-LUETTELON LEVENNYS 58e779bdb (natiivi-ui/iss-luettelo-198; LeveysLevea 560 → 720 pt): iPad-kuva PT:lle → OK → SHA NS:lle (199).
   Skenaarion L4 (kategoria kaikki + pyyhkäisy) ei toimi: Kategoriat-näkymä on matala, pyyhkäisy y 760 osuu sen alle ja sulkee valikon →
   L4:lle oma pyyhkäisy (iPad ~y 300 → 100) tai jätä pois. L3 todistaa taustan.
3. KAMERAPÖYTÄ (1ff45e88e / käännös 93a97749f, kytkin pois; arkit lokit/todistus-kamerapoyta-{ipad-…-0544,iphone-…-0548}):
   a) KEHITETÄÄN kestää simulla ~2,5–3 min (sama jo 195/196: laukaisin → "kamera asettui" ~1,5–2 min + haku ~35 s) → ei taantuma,
      mutta kamerapöydän kuvissa uusin kuva ei ehdi näyttöön; skenaarioon odotus "oleta 240 iss-kamera: oma kuva".
   b) Maa pimenee ikkunasta kuvauksen jälkeen (iPad K4, iPhone K5 SEURAA). 196:n etsinajossa (todistus-etsinkortti-196-20261015-2346)
      esikatselukortti tuli heti eikä Maa pimentynyt → selvitä IssOhjaamo.Kamerapoyta.cs:n kuvanäyttö/etsin vs. IssEtsin kuvauksen aikana.
   c) SEURAA: ei kuuntelijaa (linssin rajapinta puuttuu) — PK/LS:n työ, kysy PT:ltä.
4. Tekijärivi efa7e6b1e (natiivi-ui/lasi-tekija-198) NS:llä junassa 199 (PT OK) — ei tekemistä.

## VALMIIT TÄSSÄ SESSIOSSA
- iss-luettelo iPad "jumi" 03.19 = oma skenaariovirhe (veto polku-muodossa → 516 s pito), ja L3-pyyhkäisyt alkoivat listan alta
  (sulki valikon) → korjattu sk-iss-luettelo-198-{ipad,iphone}.txt (polku listan sisältä).
- museo-kevyt: näyttelyvalinta jäi ympyröiden päälle → skenaario sulkee sen napautuksin (tap-teksti rivi → Siirry näyttelyyn); uusinta OK.
- lasipohja5-still OK → e9a2852b4 junaan 198. Tekijärivi: kontrasti (nostokortti.uss) + lisenssi kerran (NostoSisalto.Liita) → 199.
- Isoisän uni: kytkin päälle 1e0d9513e → 060aa1679 (yksi kuva kerrallaan) → 0b8555d23 (isommat kuvat + teksti) → KK OK, juna 198.
  Ensimmäisen videon 33 s jäätyminen = Macin levy (main-säie stat():ssa LampoMittarin lokikirjoituksessa), ei unen koodi; kuva-arkin
  kääntymätön ruutu = ui puu ei vastannut jäätymisen aikana (kaappauksen suunta), ei peli.

## Opit
- simkosketus: `veto x1 y1 x2 y2 [kesto]`, `polku x,y,dt …`; sekoitus = minuuttien pito. "Jumi" → katso ensin kuittasiko sovellus komennon.
- Pyyhkäisyn ALOITUSPISTE listan/paneelin sisään: paneelin ulkopuolinen kosketus sulkee valikon (ISS-kohdevalikko).
- Rijksmuseumissa on näyttelyvalinta (7 näyttelyä): `linssi museo valitse` ei sulje sitä → tap-teksti näyttelyrivi + "Siirry näyttelyyn".
- Odottavan käännöksen (proto-kaanna.sh, ei lukkoa: /tmp/matkakirja-kaannospalvelu-2.lukko/kuka toisen) saa vaihtaa uuteen SHA:han.
