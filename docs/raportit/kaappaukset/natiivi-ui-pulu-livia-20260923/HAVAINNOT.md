# Natiivi-UI: pulu/Livia/luento/tekijätiedot, ensimmäinen tarkistus (23.9.2026)

Proto-master `2e26b45` (Natiiviseppä: "Natiivi-UI:n pulu/Livia/luentakortti,
kartuscha, kysymys3, tekijätiedot, Maatila, Linssisepän luennat").
Komennot: "Pulu ja luennat (erä 5)" + "Livia (pulu) ilman peliä" +
`ui tietoja` (UI-testit/README.md). Kaikki `kuva`-rivit `odota 1`:llä
perässä (opittu tänään). 10/10 kuvaa, täysi loki, ei VIRHE-rivejä.

## Löydös: kaksi 404-virhettä toistuvasti Development Console -palkissa

Kaikissa myöhemmissä kaappauksissa (livia-* ja tietoja) näkyy sama pari:

```
MATKAKIRJA sisältö: sisalto/1/v2/kokoelmat/lippumaat.json epäonnistui: HTTP/1.1 404 Not Found
MATKAKIRJA sisältö: sisalto/1/v2/kokoelmat/maat.json epäonnistui: HTTP/1.1 404 Not Found
```

Nämä EIVÄT näkyneet 23.9. aiemmassa kysymysnäkymä-kaappauksessa (eri
proto-versio, `0244858`) — uusia tässä käännöksessä, tai paljastuivat vasta
nyt sisällön latauspolun kautta. En tiedä ovatko nämä kaksi tiedostoa
oikeasti tarpeen tälle näkymälle vai turhia 404-yrityksiä — raportoin
havainnon, en arvaa syytä.

## "Kaksi lintua" -kuva livia- ja tietoja-kaappauksissa

Kaikissa `livia-*`- ja `tietoja`-kaappauksissa näkyy KAKSI erillistä
pulu-hahmoa: yksi keskellä (testikutsun `ui livia ...` oma erillinen
kerros) ja yksi kartan oikeassa alakulmassa (peruspelin oma Pulu-nappi).
**Todennäköisesti oma testivirheeni**: en sulkenut `ui pulu`-testiä
selkeästi ennen `ui livia`-sarjan aloitusta (`ui sulje` ei ehkä piilota
pulu-testikerrosta erikseen) — en usko että tämä on tuotekoodin bugi,
mutta en ole varma. Ilmoitan, jotta ette hämmenny kuvista.

## Muuten

- **luento-kortti / luento-pulu**: Ateena-luentokortti ja pulun paluu
  luennan jälkeen näyttivät hyviltä, kuvateksti ja repliikki luettavissa.
- **ui-tietoja**: täydellinen, hyvin muotoiltu (Copernicus DEM -lisenssi,
  Cesium for Unity, Commons-kuvat, Freesound-äänet, fontit American
  Typewriter/Iowan Old Style/Snell Roundhand + EB Garamond-varafontti,
  "Sovellus 0.1.0"). Ei visuaalisia vikoja.
- **livia-astro**: kypärä ja leijunta näkyvät oikein Ateena-kuvan päällä.

Kuvat: `docs/raportit/kaappaukset/natiivi-ui-pulu-livia-20260923/`
(haara `laitetestaaja-natiivi-sulavuus`, PR #2946).
