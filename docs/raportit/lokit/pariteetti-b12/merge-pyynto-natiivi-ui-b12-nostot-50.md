# Merge-pyyntö: natiivi-ui/nostot-50 35df3b4 (juna/b12:n päällä), Natiivi-UI 25.9.2026 — LÖYDÖS 50, vaihe 1

Testit: unity-tarkistus 0 virhettä, uss ok. Testikäännös cf5fdde (juna/b12 + kirjainvali + nostot-50 + radio-sulku,
FB234D08). Mitat: pariteetti-b12/web-nostot-kartalla-mitat.txt (kohta 6: A ja D–H).

## Sisältö (UI/NostotKartalla.cs, Kartta.uss, UiKomennot)
- A. Ryhmitys koelipun takana: `ui aihemerkit on|pois` (web ?aihemerkit=1). Oletuksena jokainen nosto on oma merkkinsä.
- D. Koko: mitta = min(katto / 11, 0,7727 × zoomikerroin × oma). Oma kerroin on kaupungeilla 1,353, tasolla 1 1,3 ja
  muilla 1. Katto on 16 px ja nousee log2-lineaarisesti 22 px:iin kertoimien 2 ja 4 välillä. Ikoniruutu on 14,8 × mitta
  (taso 1 kuvamerkillä 1,6-kertainen) ja nimiö 11 × mitta. Tärkeyden 13,5 px:n koko on poistettu.
- E. Muoto: kuvamerkki vain tasolla 1 tai kertoimesta 4. Pisteperheet ovat harmaa kiekko #6f6a61 musterenkaalla, ja
  vektorit piirretään musteella.
- F. Nimiö: Liberation Serif -kursiivi (Kirjasin.Atlas) ilman haloa. Väri rgb(74,52,33), tasolla 1 rgb(46,30,14).
  Lyhennys 18 merkkiin kokonaisin sanoin ja ".".
- G. Webin 8 nimiöasentoa (nostosymNimioAsemointi-kaava).
- H. Väistö levossa: jono kaupunki > taso 1 > taso 2 > taso 3, lyhyt nimi ensin. Esteinä ovat muut nimiöt, ikonit ja
  paneelin reunat. Näkyvä nimiö ei vaihda kylkeä. Jos vapaata paikkaa ei ole, nimiö häipyy 180 ms:ssa ja merkki jää.

## Kuvapari
kuvapari-b12s-nostot-ranska-iphone.jpg (web | natiivi): nimiöt 8,5 px kursiivilla, harmaat pisteet ja kuvamerkki vain
tason 1 kohteella (Carcassonne).

## Tilapäiset sovittimet (vaihtuvat yhden rivin muutoksella)
- ZoomKerroin: osuus suhteessa maan syttymishetken osuuteen, eli saapuminen = 1. Korvautuu NostoKerros.ZoomKerroinilla
  (Natiivisepän haara natiiviseppa/nostot-50).
- DatanKylki: null, eli ensin oikea. Korvautuu Nosto.Puolella (Siirtoseppä, skeema 1.39, PR #3133).

## Vaihe 2 (ei tässä)
- Nimikerros varaa nyt nostojen laatikot ensin (Nimikerros.cs:328–332). Webissä nimet ovat kiinteitä ja nostot
  väistävät niitä. Järjestyksen kääntäminen vaatii Natiivisepän tai Karttasepän muutoksen.
- Pisteen hehku (2,1 × r, alfa 0,45 → 0) puuttuu.
- Portit (lähizoom, kaupunginsisäiset nostot, meret) ovat Natiivisepän osa B.
