# 3D-prototyyppi, virstanpylväs 2: kaupungit sisältöpaketista (23.9.2026)

Tekijä: 3D-selvittäjä (Opus 5.5). Jatkoa raportille 3d-proto-kosketus-laite-20260923.md.
Unity-projekti: `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, paikallinen git 38c9f21.

## Tulos

- Sovellus hakee Siirtosepän sisältöpaketin ämpäristä: `sisalto/1/uusin.json` →
  `sisalto/1/v1/kokoelmat/kaupungit.json`. Paketti välimuistitetaan laitteelle, koska
  versiokansiot ovat muuttumattomia. Jos verkkoa ei ole, käytetään viimeisintä
  välimuistissa olevaa. Koodi: `Sisalto.cs`.
- Kaikki 266 kaupunkia näkyvät pallolla pisteinä ja nimiöinä (`KaupunkiMerkit.cs`):
  - Merkit kääntyvät kameraan päin, ja niiden koko pysyy vakiona näytön pisteinä.
    Mitoituksessa Retina-kerroin on `Screen.dpi / 163`.
  - Pallon takana olevat merkit piilotetaan.
  - Merkki siirretään näkösädettä pitkin 30 % kameraa kohti. Ruudulla paikka ei muutu,
    mutta kaareva pinta ei enää leikkaa merkkiä.
  - Nimiöt harvennetaan joka kehys tärkeysjärjestyksessä: ensin aloituskaupunki, sitten
    lentokenttä, sitten muut. Nimiö näytetään vain, jos se ei osu jo näytettyyn nimiöön
    tai sen pisteeseen. Kaukaa näkyvät tärkeimmät, ja lähempänä nimiöitä mahtuu enemmän.
  - Fontti on TextMeshPron LiberationSans SDF (OFL). Se riittää prototyyppiin, ja siinä
    ovat kaikki nimien merkit (á ä é ö š ž ’). Pelin oma fontti on eri päätös, koska
    verkkopelin Iowan Old Style ja American Typewriter ovat Applen järjestelmäfontteja
    eikä niitä voi paketoida.
- Kuvat: `/Users/Shared/Claude/proto-3d/lokit/sim-kaupungit-4.png` (koko pallo) ja
  `sim-kaupungit-5.png` (Keski-Aasia ja Intia lähempää).

## Kehysajat laitteella (iPhone 17 Pro, Release, 120 Hz)

Levossa, kun 266 merkkiä ja nimiöitä harvennetaan joka kehys: p50 8,33 ms, p95 8,4–8,6 ms,
max 9,7 ms. Ensimmäisessä jaksossa on yksi 240 ms:n kehys, kun paketti ladataan ja merkit
rakennetaan käynnistyksessä. Liikkeen kehysajat tällä versiolla odottavat omistajan
kokeilua.

## Palaute paketista (lähetetty Siirtosepälle)

1. Nimiöiden harvennukseen tarvitaan numeerinen **tärkeys**. Nyt ainoat erottimet ovat
   aloitus (19 kaupunkia) ja lentokenttä (62), joten tiheillä alueilla nimet valitaan
   sattumanvaraisesti.
2. **Sijainti**: 163/266 kaupungin sijainti on laskettu laudalta (Miller). Pallolla ja
   lähizoomissa virhe näkyy. Tarvitaan pallopiste kaikille tai virhearvio kenttänä.
3. **Eheys**: osoittimen sha256:n kohde ei selviä. Tiedostokohtaiset tiivisteet
   manifestissa helpottaisivat välimuistin tarkistusta.
4. `data`-objektin laudan kentät (x, y, la, lx, ly) eivät ole natiiville tarpeen.
5. Seuraavaksi tarvitaan reitit ja kohteet samassa muodossa.

## Avoimet asiat

- Käynnistyksen 240 ms:n kehys: merkit voi rakentaa useamman kehyksen aikana.
- Kaupungin napautus (valinta ja lähestyminen) puuttuu vielä.
- Nimiöt voivat ylittää pallon reunan avaruuden puolelle. Tämä on kosmeettinen asia.
