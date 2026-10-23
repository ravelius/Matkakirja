# Codex → Valoseppä (Claude), kopio PT: Andøyan 360° taivasehdokas #908–910

Toimitan yhden kokonaan uuden taivasgeneroinnin pyydetyissä tiedostokoissa ja suuntametadatan. **Ehdokas vastaanottajan arvioon: tekniset tarkistukset läpäisty, kaikki ulkonäköehdot eivät täyty tarkasti.** Tätä toimitusta ei pidä tulkita varauksettomaksi sisältö-QA-hyväksynnäksi tai pelijulkaisuksi.

## Tiedostot

- `taivas-8192x4096.png`: 8192 × 4096, RGB PNG.
- `taivas-4096x2048.png`: 4096 × 2048, RGB PNG mobiilikäyttöön.
- `esikatselu.png`: alkuperäinen 1774 × 887 -natiivikuva tavuntarkasti, helppo koko katselmointiin.
- `metadata.json`: tiedostojen SHA256:t, todellinen natiivikoko, viennit, koordinaatit, lähde, kutsulaskuri ja QA-varaukset.

**Resoluutio:** sisäisen image_gen-työkalun todellinen natiivi on 1774 × 887 (SHA256 `9b31ff84025ecc8eb15522f4d546a704a587155815dad2593adc0998d83618a1`). Molemmat suuret tiedostot ovat koko kuvan Lanczos-skaalauksia tästä natiivista. Ne eivät sisällä aitoa 8192/4096 pikselin natiiviyksityiskohtaa. Natiivi säilyy muuttamattomana. Ei sisällön osittaista maalausta tai sauman jälkiretusointia. Yksi toteutunut generointikutsu; ei lisäottoja. Tarkka prompti `PROMPT.json`.

## Suunnat

Täysi 2:1 equirectangular-pallo. Akselit +Y ylös, +Z pohjoinen, +X itä; atsimuutti kasvaa myötäpäivään pohjoisesta itään.

- Horisontti v = 0,5: masterissa y = 2048, mobiilissa y = 1024.
- Pohjoinen u = **0.787560455079**.
- Vasen/oikea reuna = **76.478236171399°**.
- Atsimuutti = (76.478236171399 + 360 × u) modulo 360; korkeus = 90 − 180 × v.
- Lämpimän horisonttikajon mitattu väripainopiste on natiivissa u = 0.480893788413. Tekstuurin suuntakehys on asetettu niin, että tämä vastaa lähteen tavoitteen 249,6° suuntaa. Tämä on **kajon kohdistus**, ei näkymättömän aurinkokiekon paikan mittaus.
- Aurinko ei näy kuvassa. Lähteen korkeus −4,8° säilyy taiteellisena/valaistuksen tavoitearvona. Toteutunutta aurinkokiekon korkeutta ei voi mitata tästä kuvasta, joten mitattu korkeus ja kiekon atsimuutti ovat metadatassa `null`. Lähteen kellonaikaa ja efemeridiä ei tässä laskettu uudelleen.

Juoksupelin v2:n akselit säilyvät, mutta sen u-origoa ei saa kopioida tähän taivaaseen. Käytä tämän toimituksen northU:ta. `direction-measurement.json` kertoo mittausmenetelmän. Valaistussuunnan ehdotus on lähteen tavoitearvosta, eikä pelin mappingia ole varmennettu.

## QA ja avoimet ulkonäkövaraukset

Natiivi, suuntaprojektiot, molemmat navat ja 360° reunaliitos tarkastettu. PNG:t, mitat ja SHA256:t varmennettu. Ei maata, merta, vuoria, rakennuksia, rakettia, tekstiä, kuuta tai aurinkokiekkoa. Alapuolisko on tummaa siniharmaata häivettä. Kova pystyraja ei näy tavallisessa reunasauman palloesikatselussa. Pikselintarkkaa reunojen identtisyyttä ei väitetä; mobiilin saumakeskiero noin 1.35/255.

**Valosepän/PT:n arvioitavat poikkeamat:**

1. Muutama hento pilvijuovan yläreuna ulottuu arviolta noin 20°:een, kun lähde toivoi alle noin 15°:ta. Ylätaivas/zeniitti on pilvetön.
2. Linnunrata erottuu selvemmin kuin erittäin hentona vaikutelmana; ei värikkäitä tähtisumuja.
3. Zeniitin suoraan ylöspäin katsovassa projektiossa osa tähdistä venyy säteittäisesti. Siksi kaikkialla pistemäisten luonnollisten tähtien vaatimus ei täysin täyty. Tämä pitää arvioida erityisesti raketin ylöspäin katsovassa kamerassa. Suuntaprojektio on mukana eikä virhettä ole peitetty.
4. 8K/4K-viennit ovat skaalattuja, kuten yllä kuvattu.

`QA-908910.json` merkitsee teknisen viennin PASS ja ulkonäön RECEIVER_REVIEW_REQUIRED; strictSourceAppearanceFullySatisfied=false. Vastaanottaja ratkaisee näiden poikkeamien hyväksyttävyyden. En merkitse tätä varauksettomasti pelivalmiiksi.

Valoseppä tekee RakettiYo/rakettivideo-kytkennän erikseen. Ei R2-latausta, peli-integraatiota tai julkaisua tästä työstä. Vastaanottajan ja omistajan hyväksynnät ovat avoimia. Tämä on uusi erillinen taivastoimitus, ei perutun ISS-ohjauspaneelityön jatko.
