# Kongon kuninkaan kruunu 642 — QA

Valmis rootin postitoimitukseen. Uuden kuvan PT-/omistajahyväksyntää, peli-integraatiota tai julkaisua ei tällä kuitilla väitetä tehdyiksi.

## Toteutus ja tarkastus

Yksi kokonaan uusi generointi, yksi kutsu, ei uusintaa eikä osamuokkausta. Kaikki palautuneet alkuperäiset säilytetään. Katsoin itse paikalliset sarjareferenssit, uuden natiivin, lopullisen 640-JPEGin ja kolmen kuvan sarjavertailun.

Kuvassa on yksi hopeinen 1600-luvun eurooppalaista kruunajaiskruunua havainnollistava esine. Rengas, kaaret ja ylhäällä oleva risti ovat selvästi näkyviä ja toisiinsa liittyviä. Muutamat punaiset ja vihreät jalokivet sekä kaiverrus ovat hillittyä koristelua. Koko kruunu rististä alareunaan on näkyvissä. Valtikkaa, kivilintua, ihmistä, tekstiä tai muita aarteita ei ole.

Metallin heijastukset, hienot kulumat ja syvennysten tummentumat näyttävät fotorealistisilta. Hopea erottuu vaaleanharmaana, vaikka lämmin ympäristö heijastuu paikoin pintaan. Tumma, lämmin ruskea kuvioitu tausta ja pehmeä yläviistovalo sopivat hyväksytyn 639-kuvan rinnalle. 640-pikselin versiossa muoto ja pintatyö säilyvät selvinä.

## Lähderajat

Kuva on kirjallisen kuvauksen HAVAINNEKUVA, ei väitetty museokopio tai kadonneen esineen autenttinen valokuva. Kaiverruksia, jalokivien värejä, niiden tarkkaa määrää tai kruunun yksityiskohtaista muotoa ei tunneta tämän aineiston perusteella; ne ovat kuvaohjeen rajoissa tehtyä tulkintaa.

Uusi PT-tilaus määrää hopean. KK:n liite kertoo myös yhden tutkijan messinkitulkinnasta. Tämä hopea/messinki-ristiriita säilytetään SOURCE-MANIFEST.jsonissa ja QA.jsonissa; kuvassa käytetään hopeaa uuden nimenomaisen tilauksen mukaisesti. Tässä kuvatyössä ei ole itsenäisesti auditoitu historiallisia alkuperäisasiakirjoja. Liitteen avoimia tarkistuksia ei väitetä ratkaistuiksi.

Pyydetty assets/aarteet/aarre-middleeast-star-v2.jpg puuttui rootin tarkistamasta main-commitista 3154a1bdfbad3dfa4c2e7e41b4cfbed230d42500. Root valtuutti sarjamalliksi täsmälleen PT:n hyväksymän 639-JPEGin (toimitus 72db6e148f8709760ecf146ca0300e46e982a915, hyväksyntä 9c74aac21d6e42a043d71e095f13c002a9b0ae1c), koska uusi lähde määrää 639/640-sarjatyylin. Sitä EI kutsuta mainista haetuksi v2-tiedostoksi. Sarjavertailun kolmas otsikko kertoo todellisen lähteen ja main-v2:n puuttumisen. Vanha Afrikan kivilintu on vain mainista varmennettu vertailukuva, ei uuden kruunun muotomalli.

## Formaatti ja säilytys

Muuttamaton natiivi on 1254 × 1254 RGB-PNG, täysin peittävä. Peliversio on koko kuvan tekninen pienennys 640 × 640 RGB-JPEGiksi: Pillow LANCZOS, JPEG-laatu 98, chroma subsampling 0. Ei rajausta, täyttöä tai sisällön retusointia. Tiedosto- ja pikselitarkisteet sekä erillinen vientimetodi ovat GENERATION.jsonissa ja technical-export.jsonissa. Natiivi säilyy myös työkalun alkuperäisessä tallennuspaikassa.
