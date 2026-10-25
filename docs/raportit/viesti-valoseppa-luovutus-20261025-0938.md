# Valoseppä: luovutus 25.10.2026 klo 09.38 (kova raja 37 %, Postivahti)

Tili vvi＠vvi.fi. PT: local_5df52e10-10e4-4b72-9554-0049db300dfe, NS: local_8254cd90-9a85-4d61-8a06-085e7562f05f,
LT: local_88cfd2dd-bbf9-406c-8f11-4f9740508e26. Päiväkirja `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`
(rivit 07.33–09.26). Lue tämä kokonaan ennen jatkoa. Ei ajoja käynnissä (P13 valmis 09.37).

## 0. SEURAAVA ASKEL (PT 09.3x, avoin)

- **Kattovarjon ehto (PT 09.3x)**: varjo vain sen salin sisällä, jossa keisari on (katto piilossa); ulkona sama varjo kuin näkyvästä
  katosta. Toteutus tekee juuri näin (Sovella piilottaa vain keisarin salin katon; muut katot näkyvät ja heittävät normaalisti), mutta
  **tarkista kuvalla**: 04-pari (sisällä) + yksi ulkokuva salin oven edestä (salin ovi 04-kuvan päädyssä pohjoisessa; sali
  palatsi alku −147,5,420; avoimet-v43: `/Users/Shared/Claude/proto-3d/_valmiit/juoksupeli-avoimet-v43-vienti-20261025/` –
  hae salin paikka sijoitusjsonista ja aloita esim. 10–15 m oven ulkopuolelta). Varmista: ei varjoja ilman näkyvää aiheuttajaa.
- **Lopullinen pari 03A + 04 PT:lle** (ok/vika kohdittain) P13:sta tai uudemmasta, kun ulkokuva ok. PT halusi rungon, jossa LR
  muoto-210 ff27a58c0 (avoimet-v43), NS juna-210 f0e65a055 ja PK:n tausta-v48 3d4785f26 (kuitattu) → tee uusi pohja:
  `linssiseppa2/omistajapari-11` + 3d4785f26 (jos ei jo junassa) ja aja.
- **Taihemenin etualan varjo (PT 09.0x)**: juna-210-pohjalla (P11/P12/P13) etuala on auringossa kaikilla kuudella auringolla
  (45/170, 75/170, 50/20, 50/340, 65/250, 65/110; todistus-0917) → 03 lähi 222/200/188 vs havainne 212/189/178 ✓. B10:n (vanha pohja)
  toisessa juoksussa iso varjo oli; syy luultavasti vanha tausta/LOD-tila. **Suositus PT:lle: aurinkoa ei muuteta (45°/170°)**; jos
  varjo palaa tausta-v48:lla, kokeile länsiaurinkoa 65/250 (vaatii LR/PK-uudelleenleivonnan, koska LOD0-atlakset on leivottu 170°/45°).

## 1. TÄNÄÄN TEHTY (kaikki Metal 440/0 + pipeline 432/0, CS 0)

Haara `linssiseppa2/grafiikka-211` (wt `/Users/Shared/Claude/wt/proto-linssiseppa2-grafiikka`), NS kuittasi runkoon (juna-210 9d548981d):
- cee7f121c aurinkoraja 0,45; 80f9070b7 + 20e2d9e56 Taihedianin aukion isot laatat + vaaleat saumat (pohja x −100…110, z −194…−60,
  QA `valo aukio`), kaukainen piha × 0,8, marmori 0,32. **80f9070b7 yksin kaataa AGX-kääntäjän** – aina yhdessä 20e2d9e56:n kanssa.
- b25b944a2 + 1d3a10bdb laattojen sävy JuoksuLaattaSavy 1,04/1,02/1,07 (03 auringossa 232/210/199 vs 227/206/195). PT kuittasi NS:lle?
  → tarkista, onko juna-210:ssä; jos ei, NS:lle kuittaus (PT 08.5x hyväksyi).

Haara `linssiseppa2/omistajapari-11` (wt `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`, pohja juna-210 f0e65a055):
- 8a49ca5d6 + ab508f6cb = sävy (yllä, poimittu).
- **4e2587791 piilotettu katto heittää varjon** (PT 09.1x päätös): JuoksuSokkeloMaailma.Sovella pitää piilotetun katon päällä kopiona
  (_Haivytys 1, _KattoVarjo 1), forward-vertex ei rasteroi (_Haivytys > 0,999), JuoksuMaailma-varjopassi ei clippaa kun _KattoVarjo 1;
  QA `valo kattovarjo 0|1`. Koskee PK:n tiedostoa JuoksuSokkeloMaailma.cs (Sovella) – kerro PK:lle kuittauksessa.
- **b608eb98c varjojen täyttö lämpimäksi** K17TaivasSavy 1,0/0,98/0,96 → 1,22/1,12/0,92. P13 (todistus-0930, parit
  `kierros2/omistaja37-b608eb98c/`): 04 lattia 183/173/178 vs 187/171/169, 03 222/200/188 vs 212/189/178, 02 222/200/186 vs 224/198/182,
  05 lattia 188/168/155 vs 223/200/188 (ennen 152), seinä 149/59/44 vs 205/119/112 (ennen 83) → avoin 05 parani, ei vielä valmis.
- NS-kuittaus 4e2587791 + b608eb98c **vasta PT:n katsottua parin**.

## 2. OPIT

- QA `valo sijoita` ei ole komento (no-op, vain KaytaValo); kamera tulee `palatsi alku`-paikasta. 04 testikamera: `valo testikamera 2.2 3.5 12 60`.
- Mittaa sävy: `python3 -I /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/savy.py "nimi=x0,y0,x1,y1" kuvat` (mediaani-RGB); kuva-arkki: `arkki.py ulos.png sarakkeet kuvat`.
- K17-värisäätö vahvistaa albedon sävymuutokset ~1,3–1,5 × → käytä puolta laskennallisesta kertoimesta.
- Metal-ketjussa tarkista myös `PIPELINE … 0 vikaa` (ketju-37 ohitti pipeline-vian; B11 c1bead8df ei saa mennä laitteelle).
- Ajoskriptit: kierros2/aja-omistaja3x.zsh (skenaario + parikuvion etuliite), ketju-omistaja4x.zsh (metal → käännös → ajo), kaynnista-4x.zsh.

## 3. AVOIMET

1. 05 porttikäytävä yhä tummempi kuin havainne (188 vs 223, seinä 149 vs 205).
2. 04: valojuovia ei synny, koska v43-salin sivut ovat umpiseiniä (sisältö PK/LR); lattia nyt harmaa ✓.
3. Lehvästö v1 LR:lle odottaa (puut-962964/), rakettivideo, levyvahti.zsh pyörii (pid levyvahti.pid).
