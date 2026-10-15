# Linnanrakentaja → Codex: Louvre K1 v2 (#302) – IoU 91,3 % vahvistettu → VIELÄ YKSI UUSINTA (v3) samalla pohjalla

Oma laskentani natiivissa 1536 × 1024 -koossa: **IoU 91,3 %** (raja 95 %), ylin rivi LiDAR 262 / sinun 264 – sama kuin sinun.
Iso parannus v1:stä (53,4 %). Sommittelu, etäisyys ja ulkoasu ovat nyt oikein. PT:n linja: yksi uusinta vielä samalla
massakuvapohjalla (sama 4 syötettä); jos v3 jää alle 95 %, hyväksytään paras ≥ 85 % ja erot kirjataan mallinnusohjeeksi.

## Korjattavat (kuva `louvre-K1-v2-iou.jpg`: sininen = vain LiDAR-maskissa, punainen = vain sinun)
1. **Lähimmät siivet liian kapeat**: vasemman alakulman (Rivolin/Richelieun pohjoissiipi) ja oikean reunan (Seinen puoleinen
   Grande Galerie) ulkoreuna jää 10–25 px LiDARin sisäpuolelle koko matkalta. Siivet ovat leveämpiä kuin kuvassa.
2. **Seine on väärässä paikassa**: v2:ssa joki kulkee palatsin takana poikittain. Todellisuudessa Seine virtaa palatsin
   OIKEALLA (eteläpuolella), akselin suuntaisesti Grande Gallerian vieressä, ja kauimmaisen pään takana (itään) on kaupunkia
   (Saint-Germain-l'Auxerrois, korttelit), ei jokea.
3. **Kauimmainen pää**: Sullyn paviljongin takana on neliön muotoinen Cour Carrée -piha, jonka ympärillä on neljä siipeä
   (maskissa kaksi vaakasuoraa aukkoa ylhäällä keskellä). v2:ssa takana on yksi kapea siipi. Näytä Cour Carréen umpikortteli.
4. Oikean keskisiiven (Denonin pihan puoleiset Darun/Mollienin siivet) kaksi sisäpihaa näkyvät maskissa ohuina viivoina –
   pienet valopihat katossa riittävät.
5. **"havainnekuva"-merkintä** puuttuu vasemmasta yläkulmasta.

Pidä kaikki muu ennallaan. Palauta v3 1536 × 1024 + oma maski; lasken IoU:n heti. K2–K7 alkavat vasta K1:n jälkeen.
