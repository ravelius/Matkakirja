# Pelikoodarin luovutus 9.10.2026 klo 21.4x (kontekstin nollaus, PT)

Työkansio: `/Users/Shared/Claude/proto-3d/_tyo/soundly-erat/` (kaikki skriptit, mittaukset, viennit). Raakatiedostot NAS:lla
`/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/aanet/soundly/era1b|era1c|era1d/` + `lataukset.tsv`. Muistitiedosto
`pelikoodari-tila-20261009.md` (Fablen muistikansio).

## 1. Soundly-erät 1b–1d (PT 9.10.)
- Ladattu 145/145 hakua, 915 WAVia (`aja.zsh`, Soundly GUI -automaatio PT:n ohjaimella; tehty.txt). Eristysportti `portti.py` →
  `portti.json`, `yhteenveto.tsv`; osuvuus `osuvuus.py` → `osuvuus.tsv` (portti mittaa vain eristystä, ei aihetta).
- **1c VIETY** `aanet/pallo-lento-soundly-v1` (14 Soundly-ääntä: poltin, kori-keinunta, kaksitaso, ilmavirta; `kasittele-1c.py`), kytkentä LS1:lle.
  Ilmavirtasilmukat heikoimmat (AST: jyrinä/ukkonen) → LS1 kuuntelee.
- **1b VIETY** 21.35 `aanet/olavinlinna-soundly-v1` (205 ääntä, `kasittele-1b.py` + `apu1.py`), kytkentätiedot Siirtosepälle (askeleet 6 pintaa,
  esineet, köysi, puu, vesi, soutu, linnan tilat, tupa 2, yö, hengitys, sydän, löytömerkki). KÄSIN KURATOITU 1499:lle: automaattivalinta poimi
  moderneja (lenkkarit, korkokengät, muovilasit, wakeboard, hätäsoihtu) → lähteet SND-tunnuksin `ehdokkaat-1b.txt`:stä.
- **1d VIENNISSÄ** (Julkaisija, PT saa 200:n) `aanet/ui-linssit-soundly-v1` (120 ääntä, `kasittele-1d.py`): kayttaja NUI 89 (napautus, kello-oikein,
  kilina, aarre, siirtyma, matka, kello-tikitys, gongi, paperi, kyna, rosvo) ja LS 31 (tuuli-kylma, tuuli-korkea, hoyrykone 80 Hz HP,
  kellokoneisto, soittorasia). Kytkentätiedot lähetetty NUI:lle ja LS1:lle. Tarkista 200 ja kerro tarvittaessa.
- QA: `qa-era.py <vienti-kansio>` (AST, Whisper, sauma); silmukoiden sanatesti `tupa-sanat.py`.

## 2. Aukot (ei aikakauteen sopivaa Soundlyssa / Sonnississa)
- r067 sytytys piikivellä ja teräksellä / soihtu (vain tulitikkuja = anakronismi 1499), r125 nopea syke (vain yksi hidas), r074 kaivon ämpäri ja vinssi,
  r016 tupa vain 2 Soundlysta. "Väärin"-UI-ääneksi ei akustista. Rajatapaukset r081 ilmavirta, r145 rosvo. PT kokoaa ostolistan omistajalle; EI ostoja.

## 3. Freesound (PT 9.10.: esikuuntelu-mp3:t EIVÄT mene peliin)
- Haku Actionsilla (avain vain secretsissä): haara `pelikoodari-freesound-haku` (worktree `/Users/Shared/Claude/wt/pelikoodari-freesound`), workflow
  `.github/workflows/freesound-haku-pelikoodari.yml`, push käynnistää, artefakti `freesound`. Monisanaiset haut antavat 0 osumaa → lyhyet sanat.
- Ehdokkaat + portti: `_tyo/soundly-erat/freesound-aukot/` (`portti-fs.py`). **Originaalilista omistajan OAuthia varten:**
  `_tyo/soundly-erat/freesound-originaalit.tsv` (27: tupa 7, kori 5, poltin 3, kaksitaso 4, höyrylaiva 6 mm. YleArkisto CC BY, tuuli-rako 2).
  OAuth: `node /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/freesound-oauth.mjs --linkki` → omistaja kirjautuu, koodi `~/.freesound-koodi`
  → token `~/.freesound-token`. ODOTTAA omistajaa (PT pyytää). Sen jälkeen originaalit → sama käsittely → uusi versio (esim. pallo-lento-soundly-v2).
- 1c:n Freesound-osat (10) sivussa `_tyo/soundly-erat/vienti-1c/odottaa-originaaleja/`; 10 esikuuntelu-mp3:a jäi ämpäriin pallo-lento-soundly-v1:een
  ilman manifestiviitettä.

## 4. Tuvan / 1499-tilojen sanaportti (PT 9.10.)
- `tupa-sanat.py`: Whisper sanatasolla (kieli tunnistetaan), sana ≥ 2 kirjainta ja p > 0,5 = hylkäys, JOS AST-puhe samassa 30 s ikkunassa ≥ 0,15
  (ilman puhetta Whisper hallusinoi kohinaan: "JR東日本E233系電車", "チョコレート"). Toistohallusinaatiot eivät ole sanoja.
- Tupa: Soundly Medieval Tavern + Restaurant Interior (Georgia) OK; Freesound OK: Tavern Ambience Inside Laughter, Men Laugh Indoors, medieval village
  (tarkistetaan uudelleen originaaleista).

## 5. Muut 9.10. ilta
- Tuuli: `pallo-tuuli-soundly-v3` (HP 280 Hz 24 dB/okt) PT:n mitalla (100–200/400–800 = Sonniss −13,3 ±2 dB); HP 220–270 vertailu
  `_tyo/soundly-era1/hp-vertailu/` (270 valmiina v4:ksi, ei viety). v2 ei kytketä.
- Web: #4302 katse_suunta + Tukholma v3b, #4310 Pariisi v1d, #4311 katse_kaari + Pariisi v1e — kaikki mergetty ja tuotannossa (tarkistettu
  testiotsakkeella: Concorde 295° / kaari 12).
- Valmisluennat: luennat-v1 ämpärissä (6 903); toistotesti Peli-testinä `pelikoodari/valmisluennat-kultainen` 970355d5d (430/430) odottaa PT:n
  junakuittausta. Kaupunkijakso-intro 2ae1b0e1a junassa 173.
- Worktreet: wt/pelikoodari-kaupunkijakso, -luennat-kultainen (proto), -freesound (web), -luovutus (tämä; poista pushin jälkeen).

## 6. Seuraavaksi
1. Tarkista ui-linssit-soundly-v1 200 (PT/Julkaisija) ja vastaa kytkentäkysymyksiin (NUI, LS1, Siirtoseppä).
2. Omistajan OAuth → Freesound-originaalit → tupa/kori/poltin/kaksitaso/höyrylaiva/tuuli-rako uusina versioina (sanaportti tupaan).
3. PT:n ostolista aukoista (sytytys, syke, kaivo) → toteutus vasta omistajan päätöksen jälkeen.
