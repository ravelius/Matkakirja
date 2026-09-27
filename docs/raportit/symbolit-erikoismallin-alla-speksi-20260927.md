# Kategoriasymbolit erikoismallin alla (speksi Natiivisepälle, Linssiseppä 27.9.2026 klo 21.2x)

*Fablen päätös 27.9. klo 21.2x: yleinen korjaus; nastoja ei siirretä.*

## Löydös

- **Český Krumlov** (erä 4, `mallinseppa/era4` fac195c0, junassa fd8941b8): mallin päälle piirtyy 0,4 km:n päässä olevan tason 1
  luontonoston `kohde:vltava` Aallot-symboli isoina kaarina. Kaaret näyttävät mallin osilta. Laitekuva:
  proto-3d/lokit/mallinseppa-toimitus-20260927/cesky-krumlov-era4-laite.png.
- **Kinderdijk**: takarivin myllyjen päällä on Malja, joka on 15 km:n päässä olevan tason 1 kulttuurinoston
  `kohde:hahmotelma-gouda` symboli (Natiivisepän -m-listan avoin kohta).
- Malli on kunnossa. Symbolit osuvat erikoismallin päälle, koska erikoismalli on 1,5-kertainen ja tason 1 nostot sijaitsevat
  lähellä toisiaan.

## Sääntö

1. **Erikoismalli voittaa.** Oletetaan, että tason 1 erikoismalli E näkyy. Jos toisen tason 1 noston N kategoriasymbolin jalkapiste
   osuu E:n kalustelaatikkoon, N:n 3D-symboli (Runko ja Lahi) piilotetaan. Kalustelaatikko on sama, jota nimiöt jo väistävät
   (0bdc3626): ruutuleveys × korkeussuhde jalasta ylös + 4 pt.
2. **Löydettävyys säilyy.** N:n tilalle tulee laatikon reunalle pieni mustepiste (≤ 6 pt, sama kuin tasojen 2–3 merkki).
   Piste on siinä kohdassa, jossa suora E:n jalasta N:n todelliseen paikkaan leikkaa laatikon reunan, joten suunta on
   maantieteellisesti oikea. Pisteen napautus avaa N:n kortin. N:n nimiö seuraa pistettä nykyisellä väistöllä.
3. **Pehmeä vaihto.** Symboli häivytetään 0,3 s:ssa, ja laatikon reunalla on 10 %:n hystereesi, jottei zoomaus välkytä.
   Kun E piiloutuu (kynnys, maa pois tai piilo), N:n symboli palaa samalla häivytyksellä.
4. **Tasot 2–3:** E:n laatikon sisällä olevat GPU-instanssit piilotetaan samoin (_Tila.y piilo = 1) ja korvataan
   reunapisteellä.
5. **Kaupunkimaamerkit** (`Erikoismalli.Kaupunki`, esim. Colosseum Roomassa) noudattavat samaa sääntöä, kun maamerkki
   näkyy.
6. **Ei koske** kahta erikoismallia keskenään. Niihin pätevät nykyiset koko- ja lähikynnykset.

## Todennus

- `symbolit tila` näyttää rivin "piilossa erikoismallin alla: vltava→cesky-krumlov, hahmotelma-gouda→kinderdijk".
- Kuvapari ennen/jälkeen laitteelta, kulma ja SHA kuvaan: Krumlov (CZE) 30° ja 55° pelikoossa ja lähikuvassa sekä
  Kinderdijk (NLD) 30°. Linssiseppä voi ajaa sarjan: `ajo-mallit.sh`, VAIHEET 129 ja MALLIT-rivit.
- Kartta-testeihin laatikko-osuma, reunapisteen suunta ja hystereesi.
