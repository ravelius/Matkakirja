# Raportti 9 (Valoseppä 15.11.2026): julkisivukirkko arkki 2 + Pariisin kuusi epävarmaa tornia (Commons, KK: ei muistista)

## Arkki 2 (julkisivukirkko-2.jpg)
- a) Kupoli lisäosana: TyyppiLisaosa(10, a≠0) → toinen jaettu verkko samalla merkillä, paikka (7 m · sx, 19 m), mittakaava s = min(sx, sz) kaikkiin akseleihin.
  Peli: KartanElama.Merkit.cs (instanssi rungon matriisi × T(ox,oy,0) × S(s/sx, s, s/sz); varjo samalla muunnoksella). Peli 3233e9e62.
- b) Kevyt kupoli 12 sivua, 4 kehää, ei ripoja, lyhty ilman pilareita: koko kirkko 545 kolmiota (raskas 1 165, ilman 251).
- Testit: Kartta 854/854, Linssit 2340/2340, unity-tarkistus 0 virhettä.
- c) vie.py/tyypitys.py tuntevat ('kirkko','julkisivu') = 10 (a = parametri 'kupoli'); vain nimilistalta, ei venytysvalinnassa. Lista tyhjä. Työkalu 9ca4f5711b.

## Kuusi epävarmaa (raportti-7: kaikki nyt basilika lansi 1 neula). Katsottu Commons-kuvat itse selaimessa 15.11.
| OSM | Kirkko | Torni? | Havainto (Commons) | Ehdotus |
|---|---|---|---|---|
| way/55477164 | Saint-Gervais | KYLLÄ | korkea neliötorni itäpäässä kuorin vieressä, tasakatto + pieni lyhty (File:Eglise_Saint-Gervais-Saint-Protais_from_Seine_-_Paris.jpg; fr.wp "tour-clocher … jouxtant le chœur") | torni risteys, tasakatto (käsikorjaus) |
| way/63200612 | Saint-Laurent | KYLLÄ | kellotorni länsipään kyljessä, pieni lyhty (File:Eglise_Saint-Laurent_de_Paris_-_vue_du_nord-ouest.jpg); fr.wp lyijyflèche | pysyy lansi; huippu tasakatto? |
| way/24406636 | Saint-Médard | KYLLÄ | gotiikkajulkisivun vieressä sivutorni, liuskeneula + kello (File:Église_Saint_Médard_-_Paris_V_(FR75)_-_2023-11-25_-_1.jpg) | pysyy lansi neula |
| way/63640725 | ND du Perpétuel-Secours | KYLLÄ | korkea liuskeneula (File:Paris_Notre-Dame-du-Perpétuel-Secours_außen82.JPG, kuva apsiksen puolelta; paikka länsi/risteys ei varmistu) | pysyy neula |
| way/56301534 | Saint-Martin-des-Champs (priori) | KYLLÄ | Médiathèque du patrimoine -kuvat "Eglise. Clocher" (APMH00017547); fr.wp: vanha torni nave/apsis-rajan eteläpuolella | pysyy (torni matala) |
| way/25688622 | ND-de-Lorette | EI (pieni kellotapuli) | nelipylväinen portiikki + kolmiopääty, kyljessä pieni neliömäinen kellotapuli, ei kupolia (File:Église_Notre-Dame-de-Lorette,_Paris_10_June_2019.jpg) | ainoa tornittomaksi; muoto KK:lle: julkisivukirkko ilman kupolia vai pylvästemppeli portiikilla |
HUOM: way/63201579 "Église Saint-Martin des Champs" (rue Albert-Thomas, 10e) on eri kirkko: harjalla kellotapuli (File:Eglise_Saint-Martin_des_Champs_@_Paris_(34411655385).jpg).
