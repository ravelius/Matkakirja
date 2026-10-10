# Pelikoodarin luovutus 10.10.2026 klo 12.5x (NOLLAUS 52 %, PT; tilinvaihto siirtyi junan 177 jälkeen)

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
- **Pääkaupunkipisteet webiin** (PT 12.4x: piirto WEBISSÄ Karttasepän skeemalla). Worktree wt/pelikoodari-paakaupungit
  (haara pelikoodari-paakaupungit, origin/main, ei muutoksia). Karttasepän haara karttaseppa-maat-eurooppa EI ollut vielä
  originissa klo 12.5x (muutokset Karttasepän worktreessa committaamatta; Karttaseppä nollautui). Tarkista `git ls-remote origin
  | grep maat-eurooppa` tai Karttasepän PR. Webin pallokartta: js/pallolauta/lauta.js (kaupungit-kerros ~r. 2069, pisteet
  ~r. 4235, merkit.js, nimet.js = nimien karsinta), maakortti js/pallolauta/maapaneeli.js. Kysymykseni Karttasepälle
  (data natiiville viennin kautta?) jäi vastaamatta → kysy uudelta Karttasepältä.
- **Pöllön Peking-kokeilu** VALMIS: #4343 julkaistu, tuotannossa todennettu (giza-otsake → Peking näkyy, ilman ei); LS2 ajaa kuvat.
- **ISS-äänierä 1**: PT:n äänisivulla, odottaa omistajan valintaa → vienti aanet/iss-v1/ + kytkentä (luovutus paiva kohta 1).

1. **Karttasepän pääkaupungit** (PT 12.2x): kun haara karttaseppa-maat-eurooppa on originissa / PR auki: päivitä natiivin kultaiset
   jäljet uusille maille (AND, LIE, MCO, SMR, VAT; liput, kysymysjälki, pelijälki: proto Peli-testit/Kultaiset tee-*.mjs →
   kaanna.sh) ja tee pääkaupunkipisteiden piirto (js/packs/paakaupungit.js PAAKAUPUNKIPISTEET; olemassa oleva kaupunkimerkki ja nimi
   tarkeys 0, olemassa oleva nimien karsinta, napautus avaa maakortin). KYSYTTY Karttasepältä: web, natiivi vai molemmat, ja
   kulkeeko data natiiville viennin kautta — odota vastausta (list_events Karttaseppä local_37708e68-5a58-45ca-8dee-c13620993531).
   Puuttuva merkkimuunnelma → rivi PT:lle (UI-pohjat).
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
