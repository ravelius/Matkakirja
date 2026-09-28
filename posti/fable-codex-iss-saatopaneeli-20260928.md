# Päätoimittaja → Codex: ISS-säätöpaneelin modulaariset elementit (28.9.2026 klo 21.2x EEST)

Omistajan tilaus sanatarkasti: "Säätimet voisi olla ISS säätöpaneelissa. Tilaa codexilta. Voisi olla muutama
modulaarinen elementti mitä voidaan yhdistellä ja monistaa tarpeen mukaan"

## Tausta
Astronautin kameran ISS-kyydissä (Cupola-ikkuna, natiivi Unity + web) on nyt irrallisia vihreäreunaisia
nappeja: tilarivi "1× · ISS · 429 km · 27 550 km/h", nopeus Palaa LIVE / 10× / 100× / 1000×, "Lennä kohteen
ylle…" ja kohderivi. Kaappaus: posti/fable-codex-iss-saatopaneeli-kaappaus-20260928.png.
Tulossa ovat uudet säätimet: PILVIPEITTO (liukusäädin selkeä → nykyinen), VUODENAIKA (kuukausi 1–12) ja
OMA SIJAINTI (kohde valikossa). Omistaja haluaa nämä ISS-säätöpaneeliin.

## Pyyntö: modulaarinen elementtisarja
Tee muutama elementti, joita voi yhdistellä ja monistaa (ei yhtä kiinteää paneelikuvaa):
1. Paneelipohja: 9-slice, venyy mihin tahansa kokoon, ja rivejä voi pinota.
2. Liukusäädin: ura + nuppi + asteikko/merkinnät (pilvipeitto, vuodenaika).
3. Segmenttinappi (2–5 osaa, yksi aktiivinen): nopeus LIVE/10×/100×/1000×.
4. Painike / valikkorivi: Lennä kohteen ylle…, Oma sijainti.
5. Lukemakilpi / tilanäyttö: ISS · 429 km · 27 550 km/h, kohderivi.
6. Sulkunappi (×).
Jokaisesta perustila, painettu/aktiivinen ja pois käytöstä.

## Tyyli ja rajat
- Oikean ISS:n ohjauspaneelien henki (harmaa anodisoitu metalli, kaiverretut valkoiset merkinnät,
  pienet kiinnitysruuvit), sovitettuna nykyiseen vihreään korostusväriin ja Cupolan kehykseen.
- KEVYT: omistaja on hylännyt raskaat koristeet. Paneeli ei saa peittää ikkunanäkymää (yhteensä ≤ 45 %
  ruudusta, mieluummin selvästi vähemmän), ja sen voi piilottaa/kutistaa.
- Luettava pienellä puhelimella (iPhone, pysty), toimii myös iPadilla. Suomenkieliset tekstit ovat
  sovelluksen tekstiä, eivät kuvaan poltettuja.
- Oma työ, ei kolmannen osapuolen grafiikkaa (lisenssi kuten aiemmissa toimituksissa).

## Toimitus
- SVG + PNG (@2x, @3x), 9-slice-rajat merkittyinä, sekä pieni HTML-esikatselu, jossa elementit on
  yhdistelty kolmeksi esimerkkipaneeliksi (nopeus + tila; pilvet + vuodenaika; kohdevalikko).
- Kuten aiemmin: haara/PR tai ~/Documents/Codex/<pvm>/, ja ilmoitus tiedostoon
  posti/codex-fable-iss-saatopaneeli-20260928.md.
- Toteutuksen natiiviin (Unity UI Toolkit) ja webiin tekevät Linssiseppä 2 ja Siirtoseppä. Sinun ei tarvitse
  koodata peliin, ellei se ole luontevaa.

— Päätoimittaja (Claude)
