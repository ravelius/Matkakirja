# Valosepän luovutus 5.11.2026 klo 15.36

Syy: konteksti yli 25 %, pehmeä raja (Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261105-1425.md (rakenne ja ajot). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md.

Linja: 2.209 (ei iPad-ajoja eikä mittauksia), 2.214 (näkyvä Pariisin askel: kuva KK:lle, kopio PT:lle), Mac-ajot JU:n vuorolla. Kuvat KK:lle katsottuna täysikoossa (KK 14.58).

## Tila
Mitään ei ole lukittu; oletuspiirto ennallaan paitsi häivytys. Haara linssiseppa2/pariisi-tasot f998e0726 (natiivi-backup), worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30, 610/610. Käännöstarkistus: Peli-testit/unity-tarkistus.sh (tyokalut/kaanna-editori.sh ei kata Aurinko.cs:ää; 5645d3afc ja 8abcf1931 eivät kääntyneet). tyokalut/tarkista.sh muuttaa tyylikirjan kolmea tiedostoa: palauta ne.

## Tehty
- OMISTAJA 14.27: mäkien varjostus häipyy kameran laskeutuessa kaupungin ylle. PT rajasi: vain Pariisin alue, koko kartan muutokset odottavat (2.209), muut kaupungit myöhemmin omistajan sanalla.
- Toteutus: Karttavalo.KaupunkiOsuus (120 → 30 km, korkeuden logaritmista), PariisiPaino (1 alle 60 km, 0 yli 120 km), Aurinko.cs. Muualla vanhat rajat (LahiOsuus, Valopohja.LahiTasaus). Komento valo lahi <nolla_km> <taysi_km>.
- Vanhat rajat laskettiin ruudun koosta, joten Macin 640×480-ajossa läiskät näkyivät iPadia alempana (laskettu, iPadia ei ajettu). Pariisissa korkeus ei riipu ruudusta.
- Portaat-komennossa 12. luku: pohjan poltetun rinnevarjon kerroin z13-; 11. luku sama z14+. Molemmat vain Pariisin alueella (PalaPariisiPaino).

## Kuvat (kaikki Mac)
- lokit/julkaisija-pariisi-portaat4-f028eb320: g, h. Alppien a-* ovat vanhentunut koko kartan versio.
- lokit/julkaisija-pariisi-portaat5-f028eb320: i = 0.24 0.30 0.16 0.25 0.55 0.72 0.8 0.9 0.5 1 1. Keskialueen sis-ulk länsi +0,7, itä -4,7 (h -2,5 / -8,1). Itäreuna (x noin 1565) näkyy; z12:n alareuna (y noin 1670) porrastettuna.
- lokit/julkaisija-pariisi-portaat6-f998e0726: j = i + poltettu rinnevarjo 0 (... 1 0 0). lounas-i-ylla-j-alla.jpg = sama rajaus.

## Todettu
- Hypoteesini laikuista (poltettu rinnevarjo) EI pitänyt: j:ssä laikut jäävät samanmuotoisina ja reunat terävöityvät. j-z13 ja j-z12 näyttävät läiskäisemmiltä kuin i. Älä ota j:tä käyttöön.
- Uusi hypoteesi, testaamatta: lounaan laikut ovat metsää (Meudonin metsä on paikalla): landcover wood, SMetsaAlfa 110, Pehmea SMetsaR 3 (ElavaTyyli.cs). Sama kuin k55:n heikkous 7. Vaaleat täplät sisällä olisivat aukkoja.

## Odottaa
- JU:n jonossa KS:n ja NS:n jälkeen: sk-alpit-ennallaan.txt, ajo 1 caa2c0918 (lokit/julkaisija-alpit-ennen-caa2c0918), ajo 2 f998e0726 (lokit/julkaisija-alpit-jalkeen-f998e0726). PT:n ehto ennen lukitusta: vertaa a-* parit (samat näkymät) ja kerro PT:lle. p-* parit osoittavat eron Pariisissa.
- Omistajan "1 Mäet" / "2 Rauhallinen" on auki; ei koske tätä.

## SEURAAVAKSI
1. Laikut: koe metsän reunasta (Pehmea pois tai pienempi SMetsaR, alfa), vain Pariisin alueelle. Kun syy on näytetty, kerro KK:lle. Metsän ulkoasu on k55:n lukittua pintaa, joten muutos tarvitsee KK:n sanan.
2. Keskialue: i:n arvot paras tähän asti. Jos reunat jäävät, rakennuskuvio z12:lle z13:n datasta (isompi työ, kysy kulu PT:ltä ensin).
3. Alppien vertailu ja rivi PT:lle.
4. Lukitus vasta KK:n sanalla: arvot oletukseksi, ElavaTyyliVersio e31, SHA:t KS:lle ENNEN (värit saaren ympärillä). Portaat ovat nyt globaaleja kokeessa paitsi poltetun varjon kertoimet: ratkaise ennen lukitusta, koskevatko muita kaupunkeja (PT: koko kartan muutokset odottavat).

## Skriptit
pariisi-tyyli/striimi/pariisi-viat/: sk-portaat4–6.txt, sk-alpit-ennallaan.txt.
