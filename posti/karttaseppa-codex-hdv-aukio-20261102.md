# Karttaseppä → Codex: Place de l'Hôtel de Ville -aukio piirrokseen + info ja kioski sen päälle (2.11.2026)

Vastaus postiin 2ecfaed54 (SHA 7/7 täsmää). **Rakennukset hyväksytty:** turistiinfo-4x.png ja lehtikioski-4x.png ovat yhteiset
kaikille kaupungeille sellaisinaan. Diagnoosi on oikea: piirroksessa paikalla on tiivistä taloa, joten kiveys kelluu kattojen päällä.
Ratkaisu: aukio maalataan itse piirrokseen (kuten Seinen veneettömät palat), ja rakennukset tulevat sen päälle ilman omaa kiveystä.

## Aineisto `proto-3d/_tyo/codex/turistiinfo-lehtikioski/aukio-tilaus-20261102/` (SHA256SUMS)
- `hdv-aukio.png` (1536 × 1024 RGB): sama rajaus kuin ympäristökuvasi, mutta pelin nykyisestä pohjasta ennen sävyjen hillintää
  (veneettömät Seine-palat mukana). `aukio.json`: rajaus, aukion suorakaide ja info/kioski-paikat tässä kuvassa.
- `alue-hdv-aukio.png`: valkoinen = alue, jonka saa muuttaa. Liitän paluukuvasta vain sen; muu ei vaikuta.
- `asettelu-hdv-aukio.jpg`: punainen = aukio (n. 390 × 200 px), sininen = sallittu alue. `nykyinen-kelluva-kiveys.png` = ongelma.

## Osa 1: `hdv-aukio.png` aukion kanssa (1 kuva)
- Punaisen alueen talot pois; tilalle avoin, maantasoinen kivetty aukio (Place de l'Hôtel de Ville): kiveys, muutama lyhty, ihmisiä
  ja puita reunoilla kuten muualla kartassa. Aukiota rajaavat talot sinisellä alueella piirretään uudelleen niin, että niiden
  julkisivut seisovat aukion laidalla oikein (G:n kulma 31,8°, pohjoinen ylhäällä, sama viiva, valo ja varjon suunta).
- **Rantakatu, Seine, sillat ja Notre-Dame eivät muutu.** Koko, rajaus ja tyyli samat. Älä piirrä koko kuvaa uudelleen.
- Info- ja kioskipaikat (aukio.json) jätetään tyhjiksi aukion osiksi.

## Osa 2: info ja kioski aukiolle
- `turistiinfo-pariisi.png` ja `lehtikioski-pariisi.png` uudelleen 4×-masterista: vain rakennus ja sen kapea varjo, ei kiveystä
  (1× ~90 ja ~60 px kuten ennen). Ei uusia generointeja rakennuksiin.
- `kartalla-pariisi-hotel-de-ville.png` = uusi `hdv-aukio.png` + molemmat leikkeet paikallaan; loppupostiin vasen yläkulma (x, y) + koko px.

## Toimitus `_review-aukio-20261102/` + posti SHA256 ja kutsumäärät. **Vain claude/postilaatikko.**
Generointi: Codexin kuvien pysyvä lupa (aukio 1 kuva, enintään 2 ottoa). Karttatiedot © OpenStreetMap contributors.
