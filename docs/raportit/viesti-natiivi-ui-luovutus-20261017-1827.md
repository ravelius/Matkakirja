# Natiivi-UI: luovutus 17.10.2026 klo 18.27 (Postivahti: kova raja 36 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -1654:n jonon. Aiempien luovutusten "Opit" ovat yhä voimassa (-1654, -1350, -1200 …).
Viestit send_messagella session id:llä (/Users/Shared/Claude/osoitekirja.md). PT:lle enintään 3 riviä.
Simu VAIN Julkaisijan SIMU NYT -viestistä, SIMU VAPAA perään. Uusi käännösodottaja ilmoitetaan Julkaisijalle ETUKÄTEEN.
Laitteet: iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962.

## OMISTAJAN PÄÄTÖKSET (PT:n kautta, sanatarkasti)
- **17.06** (luonnoksesta 4): "Kyllä paitsi Ota nappi pois kuvaa napin sisältä" → RAKENNA pöytä luonnoksen 4 mukaan, KUVAA-puoliskossa
  pelkkä valaistu teksti, pienimmät tekstit isommiksi (~11 pt ruudulla), pöytä yhtä matala. Valmiista simukuvapari → PT → KK; sitten junaan 200.
- **17.10**: "Kuvaa napin taustaväri kannattaa vaihtaa esim. Keltaiseksi (kun kamera tila kytkeytyy päälle), niin pelaaja huomaa paremmin
  mistä kamera laukaistaan." → KUVAA tyylikirjan --kulta (#eab84e), tumma teksti; vihreä jää LENTO-tilan merkiksi. TEHTY.

## TILA 18.27
- **Pöytä rakennettu:** proto **natiivi-ui/ohjauspoyta-201** (wt/proto-natiivi-ui-ohjauspoyta-201), kärki **049b0ef6e** (sis. juna 200 08ab7e6e8
  + PK:n zoomivipu bce4b199d cherry-pick 4e18b4c7f). Uusi tiedosto UI/Linssit/IssOhjaamo.Ohjauspoyta.cs (kytkin IssOhjauspoyta.Kaytossa = true,
  `linssi astro kyyti ohjaamo poyta 0|1|tila`), kuvat Resources/IssOhjauspoyta/ (poyta.json + 12 png, LAHTEET.txt), USS iss-ohjaamo.uss loppuun
  (mk-issohjaamo__poyta-*), kielet ui.fi.json (zoom-iso, zoom, paikka-iso, kohteet-nuoli, viimeisin-iso, kuvat-nuoli). Blender:
  tyokalut/ohjauspoyta/poyta.py → jalki.py <taysi> <Resources/IssOhjauspoyta> (metat on jo; kopioi vain png + json).
- Kytkennät: vipu LENTO = AsetaKaasuPortaaton, KAMERA = IssEtsin.Vipu/VipunAsento (PK); TILA KAMERA → AsetaKamerapoyta(true) + SEURAA auto
  (PK:n ehdotus, SEURAA-nappi pois), kameratilassa KAMERA-puolisko = Laukaise; näyttö → NayttoPainettu (kohteet) / PainaKuvanaytto (galleria);
  lentotilan rivi 2 otsikkorivillä vasemmalla; kameratilassa uusin kuva (julisteesta ikkuna-alue rajattuna, 049b0ef6e) + paikka (IssOmatKuvat.UusinPaikka).
- **Simu f8bd1f34b OK** (0 poikkeusta): /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/ohjauspoyta-201-simu-1822/ (arkki-*, poyta-lahi-*, LUE.md) → PT.
- **PT 18.3x kolme kysymystä:** 1) "VENÄJÄ" = skenaarion kaasu 100× lennätti aseman Suomen/Venäjän ylle (oikein); skenaarioon lisätty paluu
  Pariisiin ennen kameratilaa. 2) pikkukuvan ikkunareuna = juliste → rajaus 049b0ef6e. 3) "PARIISI · 14 541 KM" = PK:n KohteenLcdRivi laski
  todelliseen ISS:ään → PK korjasi **43439f3b5** (pelikoodari/lcd-siirretty-200).
- **Käännös käynnissä (taustalla, voi katketa nollauksessa):** `ohjauspoyta-201-kaannos.zsh 049b0ef6e+43439f3b5` linjalla 2 valas-197:n jälkeen;
  Julkaisijalle ilmoitettu odottaja. Tulos: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/ohjauspoyta-201-app/kaannos.out (KÄÄNNETTY … 049b0ef6e+43439f3b5).

## ENSIN
1. Tarkista kaannos.out. Jos ei "KÄÄNNETTY … 049b0ef6e+43439f3b5": aja uudelleen taustalla
   `zsh /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ketjut-20261016/ohjauspoyta-201-kaannos.zsh 049b0ef6e+43439f3b5` (ilmoita Julkaisijalle).
2. Julkaisijalle "käännetty, odotan SIMU NYT" → SIMU NYT → `zsh …/ketjut-20261016/ohjauspoyta-201-simu.zsh` (skenaario sk-ohjauspoyta-201.txt) → SIMU VAPAA.
3. Arkki kuten ohjauspoyta-201-simu-1822 (raakakuvat lokit/todistus-ohjauspoyta-*/kuvat/raaka; pöytäkaista iPhone alin 330 px, iPad 800 px keskeltä
   alin 260 px) → uusi kansio ohjauspoyta-201-simu-HHMM + LUE.md → PT 3 riviä: KAMERA nyt PARIISI, pikkukuva ikkunan sisältä, LCD vain "PARIISI".
4. Hyväksynnän jälkeen junaan 200: haara natiivi-ui/ohjauspoyta-201 (+ PK 43439f3b5 omana) NS:lle; sitten LAITEPÖYTÄ-pohja tyylikirjaan (web-PR kuten #4811).
5. Jono tyhjä → PT:lle "JONO TYHJÄ: Natiivi-UI".

## Opit
- proto-kaanna.sh A+B yhdistää haaroja/SHA:ita; jonossa odottavan oman käännöksen saa pysäyttää ja korvata (lukko kertoo, kuka kääntää).
- Pöydän näyttö on vain ~44 pt korkea: otsikkorivi + kaksi riviä ei mahdu → toinen rivi otsikkoriville.
- Todistusajon kuvissa kuvateksti peittää pöydän: katso kuvat/raaka.
- Blenderin tekstikoko ≈ 0,6 × pt (ruudulla 30° kallistuksella vielä × 0,87).
