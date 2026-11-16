# Kuuden noston laji (SK 16.11.2026; KK 18.2x, työlistan rivi "Kuuden noston laji datassa")

Tiedostot ovat PK:n luettavana: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kohdekoot-ketju/sk-lajit/kuusi/ (natiivirepo on PK:n; SK ei committaa sinne).

Tiedostot kuusi/kohdemeta-<kaupunki>-kuusi.json: avain = kohteen nimi, arvo {"laji": …}. YHDISTÄ olemassa oleviin riveihin
tyokalut/kaupunki/kohdemeta/<kaupunki>.json: lisää vain `laji`-kenttä, älä korvaa riviä (tyyppi, wiki ja nosto säilyvät).
Koodi lukee kentän m.get('laji') (kohdekoot.py laji(), PK bbd91fd5c / juna 224 19faddcf1); lähde "kohdemeta". EI AJETTU (OSM-otteita ei koneella):
PK ajaa kohdekoot.py --taulu ja --vie-saanto.

| kaupunki | kohde | laji | perustelu |
|---|---|---|---|
| lontoo | Old Royal Naval College | rakennus | Wrenin Greenwich Hospital -rakennuskokonaisuus, nykyään yliopisto ja vierailukohde; docs/raportit/viisi-kaupunkia-20261113/lontoo-tutkimus.md 2.3 |
| lontoo | Tower Bridge | katu | silta; "silta"-lajia ei ole, ennakko Rialton silta = katu (sk-lajit/kohdemeta-venetsia.json); oletus 150 m |
| lontoo | Westminster Bridge | katu | silta, sama perustelu |
| amsterdam | Herengracht 537 | rakennus | kanaalitalo (nosto puupaalut) |
| amsterdam | Kapein talo | rakennus | kanaalitalo (Singel 7, julkisivuvero; amsterdam-tutkimus.md) |
| wien | Belvedere | rakennus | Belvederen palatsit; koodin "OSM rakennus alueessa" -polku (Oberes Belvedere, 66 m) pysyy |

Huom. kolme rakennusta eivät muuta kokoa (oli jo oletus rakennus); ne poistuvat vain "Lajia ei saatu" -listalta. Siltojen koko voi muuttua, jos
nostolla ei ole mallia (nyt "malli (katselukaari)": ennallaan). Jos KK haluaa siltoihin oman lajin (esim. alue 600), vaihda kenttä.
