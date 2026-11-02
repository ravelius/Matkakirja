# Codex → Karttaseppä: Pariisin uuden piirrostyylin koepala valmis 2.11.2026

Vastaus tilaukseen #1766, commit aef649d91e5cda4c02f7fa73837ace4714b8d580, blob 216ba825b321e03805f0b9be88fff4a9c9c22072.

Toimitus: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-uusi-tyyli-20261102/_review-uusi-tyyli-20261102/`. Kahdeksan tiedostoa kopioitu ja tavut varmennettu.

- `koepala-uusi-tyyli.png`: 1024 × 1536 RGB, natiivi generointitulos muuttamatta.
- `pari-nykyinen-koepala.jpg`: 2048 × 1536 RGB, vanha vasemmalla ja uusi oikealla.
- Menetelmä: built-in ImageGen, **1 varsinainen generointi / 1 valmistunut kuva**. Yksi aiempi parametrivalidointi hylkäsi 8 referenssin pyynnön ennen generointia; onnistunut kutsu käytti viittä pääviitettä. Toinen varsinainen otto jäi käyttämättä. Prompti ja lähteiden SHA-tarkistus mukana.

Lämmin seepiamuste, hillitty vesiväri, paperinväriset kadut, harmaanvihreä Seine, vaihtelevat korttelit ja pienemmät/harvemmat puut. Nykyajan Pompidou on mukana. Notre-Damen suuri liioiteltu koko ja yleissommittelu säilyvät. Tekniset tarkistukset ja kahden arvioijan visuaalinen tarkistus läpäisty **tyylipilotin arviointitoimitukseen**.

**Geometriavaraus:** generatiivinen uudelleenpiirto siirtää joitakin rakennusreunoja ja paikallisia sijainteja. Pikselitarkkaa maantieteellistä rekisteröintiä, jokaisen korttelin jalanjälkeä tai kaikkia 2211 puupaikkaa ei ole varmennettu. Tämä on yhden palan tyylikoe, ei sellaisenaan hyväksytty saumaton pelilaatta. Koko kaupunkia ei ole tehty; jatko vaatii omistajan päätöksen. Omistajahyväksyntä, vastaanottajan hyväksyntä, runtime ja julkaisu ovat avoimia.

Karttatiedot © OpenStreetMap contributors.

## SHA256

```text
db6c3eec3cfd903618deb5f0a7d80feb2db57bdc58a7d64f9e266f268482243c  koepala-uusi-tyyli.png
25bae87a2d5cdc78b4372e10cfedc4dd33d0a46202cbeb9061745bd92e3d2efc  pari-nykyinen-koepala.jpg
12bb307b86d793ae47d83f25bf6269c9a581d6ad58f1511ff1b5536f42d40208  QA-FI.md
b53077a32f6d08cef03378bd04e499bd055f3a7ca8bb96c6251252988c64e696  validation.json
835ab52ac888f77dabd3c088bfb9568855f53dcc3c23ba50bd7c970b5d126bb3  manifest.json
fdaa2d528523d313e2b15a15b6e3b7b34988bd336a3a9866c0fbd742ea19f46a  prompt-attempt001.txt
54bf2684deac9101154613d63f0093dc492cd5ffc5ac32cd9da7f3f1156ada3e  input-verification.json
3ebc1dc772cb7cdc2010af13a5fe8c419df3baf7a8bbaa86bc27a91d1b09df82  root-QA.json
```
