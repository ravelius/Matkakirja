# Karttaseppä → Codex: Pariisin koepala TYHJÄSTÄ isoisän ajan kartaksi (omistaja 2.11.2026 klo 17.39–17.42, PT)

**Aiemmat Pariisin uuden tyylin tilaukset on peruttu** (#1766-koepala, 5,4 m/px -perusta #1767, Magnific-vaihe ja luonnos
74cd3b631 info/kioski/ihmeet). Omistaja ei hyväksynyt pohjaa: se näytti nykykartalta seepiana, koska jokainen kortteli ja kuja
oli piirretty. Kiitos työstä, se ratkaisi suunnan.

Omistajan sanoin (17.42): kartan pitää näyttää siltä kuin se olisi piirretty isoisän aikaan, ja se aloitetaan ihan nollasta.
Oikea karttapohja säilyy niin, että tärkeimmät nähtävyydet ovat oikeissa paikoissa ja oikeilla etäisyyksillä. Vähemmän
tärkeitä asioita voi jättää piirtämättä.

## Tavoiteltu kokemus
Kuin 1870-luvun matkailijan Pariisin-kartta (mallit 1 ja 2): paperi, seepiamuste ja hillityt vesiväripesut. Korttelit ovat
yksinkertaisia sävytettyjä alueita ohuin ääriviivoin. Nähtävyydet ovat pieniä käsin piirrettyjä kuvia oikeilla paikoillaan.
Sisältö on nykyaikaa (esim. Pompidou-keskus ja Opéra Bastille piirretään), mutta käsiala on vanha.

## Aineisto `proto-3d/_tyo/codex/pariisi-isoisan-kartta-20261102/` (SHA256SUMS)
- `runko.png` (1536 × 1024): **lukittu runko OSM:stä**, ~2,5 m/px, pohjoinen ylhäällä. Pelin piirrostaso on pystysuunnassa
  0,85-suhteessa (G:n yläviisto), eli runko on jo valmiiksi siinä mittasuhteessa. Rungossa on Seine saarineen ja rantoineen,
  Canal Saint-Martin, sillat (tummat), pääkadut ja bulevardit (ruskeat viivat), isot puistot (vihreä), aukiot (beige) ja
  nähtävyyksien rakennukset (punaiset ääriviivat). **Piirrä nämä täsmälleen rungon paikoille.** Rungossa ei ole kortteleita
  eikä sivukatuja.
- `runko-merkit.png` + `merkit.json`: nähtävyyksien numerot ja px. Punaiset (`merkittava`) ovat pelin kylttien pisteet, ja
  piirroksen pitää osua niihin. Sinisiä (nosto), keltaisia (kadonneiden tähdet) ja vihreitä (info, kioski) EI piirretä; peli
  lisää ne itse. Jätä niiden kohdalle tavallista karttaa.
- `runko-koko-pariisi-1-3.jpg`: koko Pariisin runko (kangas 5454 × 3634, 1/3-koossa) tiedoksi. Koepala on sen keskeltä.
- `mallit/`: tyyliviitteet, 1878, Public domain, Commons (`mallit/lahteet.md`). **malli-1-monumental(-lahi)** on pääviite
  (nähtävyydet pienoiskuvina, puurivit pisteinä, Seine viivoitettuna). **malli-2-gaultier(-lahi)** näyttää yksinkertaiset
  korttelialueet ja hillityt värit. **malli-3-andriveau** on vain pesujen hillinnän viite.
- EI viitteeksi: pelin nykyistä piirrosta, G:tä, koepalaa #1766 eikä 5,4 m/px -perustaa.

## Tehtävä: `koepala-isoisan-kartta.png` (1536 × 1024 RGB, 1 kuva, enintään 2 ottoa, Codexin kuvien pysyvä lupa)
- **Runko sellaisenaan:** Seinen rannat, saaret, sillat, pääkadut ja puistot rungon paikoille. Älä siirrä äläkä keksi uusia pääkatuja.
- **Korttelit:** pääkatujen väliset alueet tasaisina, hillittyinä pesuina (lämmin harmaanbeige tai vaalea ruusu kuten mallit
  1–2) ohuella seepiaääriviivalla. Suuria alueita saa jakaa muutamalla ohuella sivukatuviivalla kuten mallissa 2.
  **ÄLÄ PIIRRÄ TAVALLISIA TALOJA, kattoja, ikkunoita äläkä pihoja.**
- **Nähtävyydet (punaiset merkit):** pieninä käsin piirrettyinä kuvina, seepiamusteella kaiverrustyyliin ja hillityin pesuin
  (kivi okraa ja kermaa, katot harmaanvioletteja, kuparikatot vihreitä), etelästä yläviistoon kuten mallissa 1. Kuvan pohjan
  keskikohta tulee merkin pisteeseen tai punaisen ääriviivan päälle. Kuvat saavat olla jalanjälkeään suurempia
  (karikatyyrimäinen liioittelu), mutta eivät peitä toisiaan eivätkä Seineä.
  - Isoina: Notre-Dame (4), Louvre (2, 37, 85), Pompidou-keskus (8), Panthéon (11), Pariisin kaupungintalo (45), Sainte-Chapelle
    ja Palais de Justice (13), Tour Saint-Jacques (68), Saint-Eustache (56), Luxembourgin palatsi (18), Place de la Bastillen
    heinäkuun pylväs (34), Opéra Bastille (35), Gare de Lyon (36), Porte Saint-Denis (79), Pont Neuf (29).
  - Pieninä: muut punaiset rakennusmerkit (kirkot, museot, palatsit, Hôtel-Dieu, Châtelet'n teatteri, Fontaine des Innocents).
  - Aukioina avoimina (ei rakennusta): Place des Vosges (39, puistoaukio), Place de la République (61), Place du Châtelet (75),
    Place Dauphine (83), Parvis Notre-Dame (98), Place des Victoires (72), Place Vendôme (33), Place du Carrousel (85) ja
    **Place de l'Hôtel-de-Ville (84) avoimena kivettynä aukiona**.
  - Châtelet'n metroasema (65) ja Forum des Halles (20): pieni puutarha ja katos, ei metromerkkiä.
- **Seine ja kanava:** vaalea harmaanvihreä pesu hienoin vaakasuorin aalto- tai viivoitusviivoin kuten mallissa 1. Ei sinistä.
- **Puut:** vain puistoissa ja pääbulevardien varsilla aikansa merkein (pienet pallot tai pisterivit kuten mallissa 1).
- **Ei tekstejä**, nimiä, numeroita, kehystä, kompassia eikä merkkiväriä. Paperinvärinen pohja ulottuu reunoihin asti.

## Toimitus `_review-isoisan-kartta-20261102/`
`koepala-isoisan-kartta.png`, SHA256SUMS, kutsumäärä ja `nahtavyydet-piirretty.json`: jokaisesta piirretystä punaisesta
numerosta kuvan pohjan keskikohdan px muodossa `{"4": [x, y], ...}`. Karttaseppä tarkistaa paikat skriptillä
`merkit.json`-pisteisiin ennen kuin koepala näytetään omistajalle. Viesti vain claude/postilaatikko-haaraan.
Karttatiedot © OpenStreetMap contributors.
