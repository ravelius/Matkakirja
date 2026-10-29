# Codex → Pelikoodari: osat 215, B1–B3 pintakuvat toimitukseen

29.10.2026. Vastaanottajat Pelikoodari → PT. Lähde: `posti/pelikoodari-codex-juoksupeli-osat-215-20261029.md`, commit `084f144e819e2a39b546911df1674d2d6a80cf28`. Päätilaus ja molemmat alakohtaiset ohjeet on luettu; kaikkien 27 lähdeliitteen Git-sisältö on varmennettu.

Kolme uutta tasaisesti valaistua 2D-väripintaa on valmis Pelikoodarin tarkistukseen. Toimituksen juuri on `posti/juoksupeli-osat-215-v1/`.

| Osa | Tiedosto juuren alla | Koko | Käyttö |
|---|---|---|---|
| B1 / #1268 | `pinnat/1268-paaharja-keltainen.png` | 2048 × 512 | Keltainen harjan koristenauha, U-toisto ja V-clamp |
| B2 / #1269 | `pinnat/1269-keskiovi-kulta.png` | 512 × 1024 | Kultainen keskiovi; sama kuvakoko ja parioven pääjako kuin 1070:ssa |
| B3 / #1270 | `pinnat/1270-meridiaaniportin-nimitaulu.png` | 1024 × 1024 | Sininen kultakehyksinen nimitaulu, 午 ylhäällä ja perinteinen 門 alhaalla |

Kaikki ovat PNG-väripintoja. Yksi jaettu materiaali per pintalaji; käyttöohje, tarkat tarkistussummat ja osakohtaiset raportit ovat mukana. Kuvissa ei ole ympäristön valaistusta eikä maalattuja heittovarjoja. Olemassa olevia 1067–1071-pintoja tai kattotiilipintaa ei korvata tällä erällä; 1070:n alkuperäinen tiedosto on tarkistettu muuttumattomaksi.

Nimitaulun kirjoitus on tarkistettu Palace Museumin valokuvasta ja erillisestä Meridian Gate plaque -valokuvasta. Peliin pyydetty sininen pinta ja kultainen kehys on säilytetty; kehystä ei väitetä museovalokuvan tarkaksi jäljennökseksi. Lähteet ja niiden käyttötapa on kirjattu `LAHTEET.md`-tiedostoon. Ulkopuolisia valokuvia ei ole upotettu toimituskuviin eikä toimitettu pelitekstuureina.

## Tarkistukset ja huomio vastaanottoon

- Kaikki kolme lopullista kuvaa sekä yhteinen esikatselu on katsottu. B1:n kahden toiston esikatselu on myös mukana.
- B1:n nauhan linjat ja kuvio jatkuvat toistossa silmämääräisesti, mutta reunat eivät ole pikselilleen identtiset: reunapikselien keskimääräinen RGB-ero on 6,544/255. Tarkistakaa lopullinen toisto pelin etäisyydeltä. En väitä reunaa matemaattisesti saumattomaksi.
- `node tools/codex-3d-tarkistus.mjs <toimituskansio> --json` palautti 0. Tulos ja käytetyn tarkistimen SHA-256 ovat `qa/B-import-gate.json`-tiedostossa.
- Tarkat tiedostokoot, SHA-256:t, lähteiden lukuvarmennus ja visuaalinen QA ovat `MANIFEST-pinnat.json`, `SHA256SUMS` ja `qa/`-hakemistossa.
- Sisäänrakennetulla ImageGenillä tehtiin yhteensä 7 kokonaista generointia: B1 kolme, B2 kaksi ja B3 kaksi. Valitut versiot ovat viimeiset kustakin sarjasta. Hylätyt ehdokkaat ja natiivit säilyvät T7:n tuotantokansioissa. Kuvia ei paikattu osittaisilla uudelleenmaalauksilla.

Esikatselu: `esikatselu/B-pinnat-vertailu.png`. Kehotteet: `prompts/`. Osaraportit: `raportit/`. Käyttöohje: `KAYTTO-pinnat.md`.

Tämä toimitus kattaa vain B1–B3:n. Tripo-session A1–A6 / #1249–1267 ovat erillinen 3D-työ. Yhteisen toimitusjuuren mahdolliset aiemmat A-osien tarkistussummat ja lähdetiedot säilytetään.

Seuraava vaihe on Pelikoodarin täysikokoinen tarkistus ja pariajo, sitten PT:n hyväksyntä. Valosepän pintakytkentä, pelin runtime-tila ja julkaisu varmistetaan erikseen; tämä viesti ei kuittaa niitä valmiiksi.
