# Pelikoodarin luovutus 10.10.2026 klo 20.5x (nollaus, PT)

Edellinen: viesti-pelikoodari-luovutus-20261010-ilta.md. Viestit: PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (ccd send_message),
muut SendMessage nimellä (Julkaisija, Natiivi-UI, Siirtoseppä, Natiiviseppä, Linssiseppä, Sisältökirjuri).

## Tehty illalla (18.4x–20.5x)
- Pulun kultaiset 40 maata: proto pelikoodari/pulu-tur-blr2 65975137e (KUITATTU, junassa 180 = juna-180 420bc0af7).
  Testi kulkee toisen tason linkit; jäänteet PurettujenJaanteet-listalla. maat.json: versio = paketin "luotu" (Julkaisija korjasi).
- Louvre (LS1/PT): web #4365 (4cbdadcad) valmiinPaikka + aineistot v1f; vientipaketti _valmiit/opas-esittely-v1f-vienti-20261010.
  Julkaisija odotti PT:n lupaa (sisältöviennit tauolla 19.2x) → tarkista onko vienti + merge + worker tehty; LS1 ajaa kulma-arkin.
- Kaupunkikappaleiden pilotti (omistaja 17.5x/18.1x): 6 kaupunkia uudella pohjalla + Moskova/Peking v4 ja modernit introt,
  kuuntelu/ (_tyo/kaupunkikappaleet-20261010). Kehotteet kehotteet-t2.json, kehotteet-v4.json.
- Venepuhe ilman kuiskausta: repliikit-v5 (soutaja-1 [calm], soutaja-2 [calm, firm], soutaja-pako-2 [calm, warmly]; _tyo/alkukatko/
  soutaja-v5/tee.py) KUITATTU ja VIETY (Julkaisija 20.5x, 88 tiedostoa) → Siirtoseppä vaihtaa DioraamaSovitin.cs v4 → v5.
- Taidemuseo museo1 Soundly-haku VALMIS (aja.zsh: klikkaukset ikkunan suhteen, ikkuna.swift; myöhästyneet ja väärät sivuun):
  14 tiedostoa NAS eramuseo1. Kuuntelu 11 kpl _tyo/taidemuseo-aanet-20261010/kuuntelu/ (peli/ −23 LUFS; askeleet huippuun).
- Natiivisepälle vastattu latausmusiikin lataustapa (Compressed In Memory, yli 3 Mt Streaming, ei uutta muistiajoa).

## KESKEN
1. **Latausmusiikki** proto pelikoodari/latausmusiikki e495a427f (5260227ca:n päällä, juna-180-pohja; kaanna.sh 470/470,
   unity-tarkistus 0): pallo kaupunkikappale/alueraita tasolla 0,35 → ramppi ~3 s kartan tasolle; Olavinlinna loppu.mp3 0,35.
   KÄÄNNÖS käynnissä proto-kaanna (pid 29351, loki _tyo/pelikoodari-app/kaanna.log, PROTO_APP_KOPIO samaan kansioon) →
   viimeinen rivi KÄÄNNETTY/VIKA. Sitten SIMULAATTORI 39644E75-8BDA-4ED8-98B1-3FC864B73697 (pelikoodari-iPad13, T7; Julkaisija
   varasi paikan ennen LS2:n Peking k3:a): äänellinen tallenne simun omalla äänireitillä (mykistys pois vain omasta simusta):
   Olavinlinnan latausruutu ja pallon latausruutu → kierros. Mittaa: latausruudut ±2 LU toisistaan, siirtymä kierrokseen ilman
   hyppyä → SHA + testit + mittaukset PT:lle → juna. Ilmoita Julkaisijalle LUKKO VAPAA ja SIMU VAPAA.
   Avoimia: maat ilman alueraitaa (SRB, BLR …) hiljaa; 0,35 → 0,02 ramppi > 20 dB (kuuntele).
2. **repliikit-v5**: Siirtoseppä vaihtaa polun v4 → v5 (juna 180, jos ehtii). Ei Pelikoodarin työtä, ellei pyydetä.
3. **Taidemuseon 11 kuuntelua** → Julkaisija äänisivulle omaksi osiokseen → omistajan valinta → peliin (manifesti LS1:lle,
   luovutus 20261010-paiva kohta 2b-3). WALLA-POIKKEUS (PT 20.5x) vain valituille ehdoin: AST sorina > puhe JA Whisper fi/en
   ei sanoja ≥ 0,5. Mitattu: KAIKKI 4 sorinaa (montreal, katedraali, halli, sali-belgrad) EIVÄT TÄYTÄ (AST Speech 0,40–0,64;
   Whisper fi hallusinoi "ull … että") → PT:lle ehdotettu kaistanpäästö + kaiku valitulle tai sali-kahvila/sali-hiljainen
   sorinaksi. Mittausskripti scratchpadissa: walla.py (AST + Whisper base, output_scores) — kirjoita uudelleen tarvittaessa.
4. **Kaupunkikappaleiden erä 2 (46)** odottaa omistajan arviota pilotista; era2-kehotteet.json on vanhalla muotilla → vaihda
   pilotti.mjs:n uuteen pohjaan (LOPPU + pieni kokoonpano, jos omistaja niin haluaa). Generointi vain luvalla.
5. **Freesound-lataaja** pid 8898/8908 odottaa ~/.freesound-tokenia, aikakatkaisu ~21.4x. Jos token tulee myöhemmin, käynnistä
   uudelleen samalla kaavalla (aja-originaalit.zsh, perl setsid).
6. Pulu: seuraavat maat samalla kaavalla wt/proto-pelikoodari-pulu (uusi haara 65975137e:n päälle), kun Julkaisija vie.

## Worktreet
wt/proto-pelikoodari-pulu (Pulu), wt/proto-pelikoodari-lataus (latausmusiikki), wt/pelikoodari-louvre (#4365; poista mergen
jälkeen `sh tools/uusi-worktree.sh --poista pelikoodari-louvre`).
