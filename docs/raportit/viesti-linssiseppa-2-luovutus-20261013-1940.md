# Linssiseppä 2 – luovutus 13.10.2026 klo 19.40 (Suomen aika), nollaus (PT: konteksti 53 %)

Luovuttaja: Linssiseppä 2 (Opus, high). Edellinen: viesti-linssiseppa-2-luovutus-20261013-1615.md.

## Lue ensin
1. `CLAUDE.md` (agentit vain Opus/Sonnet, VAIN EUROOPPA, AIKA).
2. Raamattu (`js/tyohuone-raamattu.js`): Ydinajatus kohta 2 "TYÖTAPA JA SESSIOT".
3. Tämä raportti, KESKEN ylhäältä alas. Muistio: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/koopenhamina-kytkennat.md`
   (Kööpenhamina + taidemuseo-osio lopussa).

## Tila
- Ajoja ei käynnissä; oma simu A26BC7D0 sammutettu (T7-sarja: `zsh /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh simctl …`).
- Kaikki haarat pushattu natiivi-backupiin. Proto-worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-koopenhamina` on nyt haarassa
  `linssiseppa2/museo-ranska-rodin2` (puhdas).

## VALMIS tänään (ei toimia)
- Kööpenhaminan kippi junassa 187 (julkaistu, TF 18.47): pallokierros-v6 äänineen (KS), Kehityskaupungit + KaupunkiIntro["kobenhavn"],
  SanaAjat-virkevarapolku, LoppuKestoMatkalle; DSM v3 (`OpasSovitin.KorkeusVersiot`, bfefbfccb). KS:n v7-korkeudet hylätty (kehys huononi).
- Veneäänten raja `linssiseppa2/veneaanet-raja` 6ba38960a: PT kuittasi junaan 188, NS:llä (Ydin AaniValinta, VeneAanet.MaxAanet 12).
- PK:n ääninäyte: lokit/todistus-kph4-20261013-1854/aani (+ kph5 rajan jälkeen); PK vie PT:lle.

## SEURAAVA ERÄ: Ranskan taidemuseo, sali 4 (Rodin) – PT 13.10. 19.3x
Aineisto: SK `/Users/Shared/Claude/Matkakirja-sisaltokirjuri/docs/raportit/taidemuseo-ranska-aineisto-20261013.md` (liite C1 teokset,
C2 Rodin-valo: sivuvalo 45–60°, 3200–4000 K sisällä, puutarha 5600 K). Kuvat PT:lle ennen kuittausta. CC BY -tekijät nimetään.
Jako LS1:n kanssa (sovittu): LS1 = runko + salit 1–3 (MuseoMaa, Resources/Museo/ranska/sali|teokset|kierros|huoneet.json);
LS2 = sali 4: veistokset.json, huoneet.json:n rodin-rivi, Rodin-pysähdykset, patsaspaketti + LAHTEET + vienti, simu.
- LS1:n runko: haara `linssiseppa/museo-maa-188` (wt /Users/Shared/Claude/wt/proto-linssiseppa-museo188): 275873464 MuseoMaa
  ("museo maa ranska"), 2a2e024e4 Ranskan data (LR:n sali-v1, osat rb = Hôtel Biron, rp = puutarha; veistokset.json 8 sijoitusta).
- MINUN haara `linssiseppa2/museo-ranska-rodin2` **2ad0e21f3** (2a2e024e4:n päällä): veistokset.json lahteet[] (skannaajat) +
  Tietoja.VeistostenLahteet (Tekijätiedot-ryhmä "Taidemuseon veistokset", ui.fi.json 2 avainta). Unity-tarkistus 0, kielivahti ok.
  (Vanha `linssiseppa2/museo-ranska-rodin` c46ba09a9 juna-188:n päällä on korvattu, älä käytä.)
- Patsaspaketti `_valmiit/taidemuseo-ranska-patsaat-astc-v1-vienti-20261013` (10 patsasta, 58 Mt, LAHTEET.md + SHA256SUMS):
  korjattu `_tyo/linssiseppa2/taidemuseo-ranska/{rajaa_glb.py, paketoi_korjatut.zsh}`: Helvetin portit rajattu (3,47 × 6,35 × 1,28 m;
  skannaus karkea, möykkyinen läheltä), Balzac jalusta pois + yksivärinen pronssi (vari.astcm 64 px, ei UV:ta), kierrot etupuoli
  glTF +Z:aan (Ajattelija +90, Suudelma −90, Pronssikausi −45, Balzac 180, Danaïdi 180; tarkistettu etukuvista). **VIETY ämpäriin
  19.38 (Julkaisija: 30/30, 200 + CORS + SHA täsmää).**
- KESKEN / tehtävät:
  1. Odota LS1:n veistospysähdys-runko (kierros.json pysähdys = veistospaikan id, kävely jalustan eteen) + SHA → rebase haarani sen päälle.
  2. Rodin-pysähdykset kierros.json:iin (8 ydintä: rb-suudelma, rb-pronssikausi, rb-danaidi, rb-kasi, rp-ajattelija, rp-portit,
     rp-porvarit, rp-balzac; tekstit SK liite C1-B) ja huoneet.json:n rodin-rivi (sovi LS1:n kanssa rivitasolla).
  3. Valo: tarkista, onko C2:n veistosvalo LR:n atlaksessa; muuten säätö.
  4. Käännös + simu (KÄÄNNÖS NYT / SIMU NYT Julkaisijalta), skenaario "museo maa ranska" + sali 4, kuva-arkki PT:lle.
  5. Mahdollinen keventäminen: Danaïdi 12 Mt (110 k kolmiota 20 cm:n teokselle) → ~40 k.
- Pohjamateriaali: MuseoVeistokset ei lue veisto.json:n pohjavaria (tekstuuriton → marmori); siksi Balzacin yksivärinen vari.astcm.

## Huomiot
- Ääninäytteen kertoja pois: `xcrun simctl spawn <UDID> defaults write app.matkakirja.proto3d matkakirja-kertoja -string ei` heti
  käynnistyksen jälkeen (ketju-kph4.zsh), Asetukset.Paalla lukee PlayerPrefsin joka kerta.
- Simu-skenaariot: `_tyo/linssiseppa2/koopenhamina/{sk-pallokierros-koopenhamina.txt, sk-aani-koopenhamina.txt, ketju-kph*.zsh}`.
