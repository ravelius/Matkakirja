# Pelikoodarin luovutus 10.10.2026 klo 13.0x (TAUKO, PT 12.5x: vain bugikorjaussessiot ennen buildia 177 ja tilinvaihtoa)

Yksityiskohdat: docs/raportit/viesti-pelikoodari-luovutus-20261010-paiva.md (kohdat 2–2e). Ei keskeneräisiä muutoksia:
checkout puhdas, kaikki worktreet committattu ja pushattu.

## Tehty tänään (kaikki mainissa tai junassa)
- Kuratoitu live: worker #4337 (ee0e7b3a2, julkaistu), webin ikäkysely + tekoälymerkintä #4341 (983a58c67).
  PULU_PUUTTUVA_KURATOITU pysyy pois, kunnes vanha TF-appi on todennettu (PT päättää).
- Kartalla vain kaupungin oma kappale + aloituslento ilman musiikkia: web #4342 (4c1f8178c), natiivi
  pelikoodari/kartta-vain-kaupunki 80ab967fa → junan 176 rungossa natiiviseppa/juna-176 cdc9f278e.
- Peking kokeilukohteeksi #4343 (6f7a16b6a, julkaistu; giza-otsake avaa; LS2 tietää).
- ISS-äänierä 1: huiput korjattu, PT vei äänisivulle → odottaa omistajan valintaa.
- Kaupunkikappaleet erä 1 (16, Lyria 3.5, 1,28 $): proto-3d/_tyo/kaupunkikappaleet-20261010/ (EHDOTUS.md) → PT vie äänisivulle
  → omistaja kuuntelee.

## KESKEN NYT
- **Pääkaupunkipisteet (TAUOLLA, PT 12.5x: ei bugikorjaus)**. Karttasepän PR ravelius/Matkakirja#4344 (haara
  karttaseppa-maat-eurooppa d098bfd93) auki. Karttaseppä: Pelikoodari = web (pallokartta + nimien karsinta, lukee
  js/packs/paakaupungit.js suoraan, x/y projisoiLaudalle('maailmankartta', lon, lat)) + natiivin kultaiset; natiivin piirto N-UI
  viennin kokoelmat/paakaupungit.json:sta.
  - NATIIVIN KULTAISET VALMIS: proto-haara pelikoodari/paakaupungit-kultaiset 6e152384d (wt/proto-pelikoodari-paakaupungit):
    kysymys-, lippu- ja pelijälki haaran js:ää vasten, tiivisteet = webin tiivisteet.json, C#-portti ennallaan, kaanna.sh 449/449.
    EI junaan ennen kuin #4344 on mainissa (jäljet nojaavat sen maihin).
  - WEBIN PIIRTO KESKEN, EI MUUTOKSIA: worktree wt/pelikoodari-paakaupungit nollattu #4344:n päälle (d098bfd93), puhdas. Opus-agentti
    pysäytettiin lukuvaiheessa. Suunnitelma: pääkaupungit VAIN pallon aineistoon (js/pallolauta/nimet.js aineisto +
    lauta.js kaupungit/pisteNakyy/pelinKaupunkirajaus `maa`-kentällä), tunnisteet etuliitteellä 'pk:', tarkeys 0 / aste 0,
    ei pelikaupungin toimintoja; tasokartta (varapolku) ennalleen; yksikkötesti + Playwright-kuva Balkanilta.
    NAPAUTUS = OLEMASSA OLEVA MAAKORTTI (PT:n linjaus, tarkentuu tauon jälkeen). PR vasta #4344:n jälkeen.
- **Pöllön Peking-kokeilu** VALMIS: #4343 julkaistu, tuotannossa todennettu (giza-otsake → Peking näkyy, ilman ei); LS2 ajaa kuvat.
- **ISS-äänierä 1**: PT:n äänisivulla, odottaa omistajan valintaa → vienti aanet/iss-v1/ + kytkentä (luovutus paiva kohta 1).

1. **Pääkaupunkipisteet** tauon jälkeen (PT:n aloitusviesti): ks. KESKEN NYT. Natiivin kultaiset valmiina; tee webin
   piirto suunnitelman mukaan, napautus avaa olemassa olevan maakortin.
2. **Kaupunkikappaleiden vienti** omistajan kuuntelun jälkeen: hyväksytyt ämpäriin audio/musa-kaupunki-<id>-lyria-v2.mp3
   (Julkaisijan kautta, SHA256SUMS), web js/kaupunkimusiikki.js KAUPUNKIRAIDAT (kuvaus = Sisältökirjurin kuvaus_fi) +
   natiivi AaniTaulut.Kaupunkiraidat, testit. Loput 28 vasta sen jälkeen (generoi.mjs: lisää ERA2-taulu; aja.zsh perl setsid).
3. **Taidemuseon äänet** ILLALLA, kun näyttö on vapaa (PT): Soundly-haku museo1 uudelleen (_tyo/soundly-erat/aja.zsh, tyolista
   museo1-rivit; edellinen ajo toi vääriä tiedostoja → NAS eramuseo1/_vaara-osumat), tarkista nimet, käsittele, ääniportti,
   manifesti LS1:lle (kytkentäkohdat luovutuksessa kohta 2b-3). Kertojan luenta: omistaja "ei vielä".

## Taustalla käynnissä
- Freesound-lataaja pid 8898 (aja-originaalit.zsh) + 8908 (node freesound-originaalit.mjs --odota), alkoi 09.46, odottaa
  ~/.freesound-tokenia (OAuth omistajalta), aikakatkaisu ~21.4x. Käynnistä uudelleen samalla kaavalla, jos token puuttuu yhä.
- Soundly.app pid 36659 (ei omaa ajoa käynnissä; museo1-ajo pysäytetty 10.5x).

## Worktreet (siivoa mergen jälkeen)
wt/proto-pelikoodari-musiikki (juna 176), wt/proto-pelikoodari-mittaa (juna 176), wt/proto-pelikoodari-pisteet,
wt/proto-pelikoodari-pulu (git -C proto-3d/Matkakirja-proto worktree remove), wt/pelikoodari-ip-suola (#4335 odottaa
Julkaisijaa + secretiä; tools/uusi-worktree.sh --poista pelikoodari-ip-suola).

## Opit
- tools/uusi-worktree.sh --poista <rooli>-<aihe> (lippu ENSIN). Webin uusi otsake Pulun pyyntöihin vaatii workerin esilentoluvan
  ennen web-julkaisua (PR-järjestys). Kultainen äänijälki: tee-aanijalki.mjs kopio sekä webissä että protossa, tiivisteet.json
  = proton aanijalki.json:n sha256.
- Lyria 3.5 0,08 $/kpl; raaka-mp3 TP usein 0 dBTP → kasittele.py (limitteri 4×, RAJA 0.78 jos mp3-ylitys).
