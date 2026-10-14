# Petřín K1 — ensimmäinen palautearvio, 14.10.2026

Yksi sisäänrakennettu kuvagenerointikutsu on tehty suoran käyttäjäluvan ”Aloita K1 nyt” perusteella. K2–K5 eivät ole alkaneet. Tämä toimitus on ensimmäinen arviointipari, ei hyväksytty mallin tavoite.

- Kuva: petrin-K1.png, 2400×1600, RGB/sRGB/opaque. Natiivi oli 1536×1024; toimituskoko on ei-generatiivinen Lanczos-suurennus. Se ei lisää natiiviyksityiskohtia. Alkuperäinen natiivi säilyy.
- Maski: petrin-K1-maski.png, 2400×1600, L-PNG, vain 0 ja 255, sama koko ja rajaus, ei pehmeää reunaa. Täytetty ulkosiluetti; ristikon sisäiset aukot on täytetty. Ääriviivakohdistus on luonnos, ei sertifioitu pikselintarkaksi. Etualan kasvien peittämät jalka-alueet on arvioitu.

## Root-QA: hylätty sitovana tavoitteena

K1 on hylätty sitovana tavoitekuvana: torni vie noin 85 % kuvan korkeudesta annetun kameran noin 40 %:n sijaan. Masto alkaa noin 5 %:n kohdalta, tavoite on noin 30 %. Myös tasanteiden suhteellinen sijoittelu poikkeaa annetun kameran projektiosta. Natiivi 1536×1024 on suurennettu 2400×1600-arviointiversioksi; suurennus ei lisää natiiviyksityiskohtia tai korjaa kameraa. Maski on täytetty ulkosiluetin luonnos, jonka etualan kasvien takaiset jalka-alueet on arvioitu. Pikselintarkkuutta tai soveltuvuutta IoU:n vertailutotuudeksi ei ole varmennettu. Kuva- ja maskipari toimitetaan vain täysikokoiseen palautearvioon.

| Kohta | Tavoite y / korkeus | Havaittu y / korkeus |
|---|---:|---:|
| mastTop | 0.301 | 0.052 |
| bodyRoofTop | 0.375 | 0.165 |
| upperPlatformFloorApprox | 0.421 | 0.219 |
| lowerPlatformFloorApprox | 0.595 | 0.555 |
| groundContact | 0.700 | 0.904 |

Havainnot ovat kuvan pikselikoordinaateista tehtyjä arvioita. Kameran todellista atsimuuttia, etäisyyttä tai korkeutta ei voi vahvistaa generoidusta kuvasta. Promptin arvot ovat K1:n 200° / 200 m / 90 m / −14,8° / VFOV 45°. Pelkkä prompti ei osoita, että kuva noudattaa niitä.

## Lähteet ja lupa

#253:n runko 58,7 m, ylätasanne 51 m ja alatasanne 20 m olivat promptissa ennen kutsua. Masto noin 12 m ja kokonaiskorkeus noin 71 m säilyvät epävarmoina. Alkuperäiset seitsemän kuvaliitettä ja korjattu leikkaus on katsottu henkilökohtaisesti. Puuttuvia SVG/OSM-liitteitä ei ole rekonstruoitu. Kuva 4:n suuntaristiriita ja kuva 5:n tornitasanteelta alas suuntautuva kamera säilyvät kirjattuina.

- [petrin-1-sisaankaynti.jpg](https://commons.wikimedia.org/wiki/File:Petrinska_rozhledna_a_nejblizsi_okoli_20250427_121942.jpg): VANOCE2022, CC0. Käytetty vain rakenteen/värin viitteenä, ei taustan tai sommittelun kopiointiin.
- [petrin-2-etela.jpg](https://commons.wikimedia.org/wiki/File:Pet%C5%99%C3%ADnsk%C3%A1_rozhledna,_Prague.jpg): Ivan Korostelev, CC BY-SA 4.0. Käytetty vain rakenteen/värin viitteenä, ei taustan tai sommittelun kopiointiin.
- [petrin-3-lansi.jpg](https://commons.wikimedia.org/wiki/File:Pet%C5%99%C3%ADn_Lookout_Tower_-_Prague,_Czech_Republic_-_May_17,_2019.jpg): Giorgio Galeotti, CC BY 4.0. Käytetty vain rakenteen/värin viitteenä, ei taustan tai sommittelun kopiointiin.
- [petrin-4-muurin-takaa.jpg](https://commons.wikimedia.org/wiki/File:Prag_%E2%80%93_Aussichtsturm_Pet%C5%99%C3%ADn_-_Pet%C5%99%C3%ADnsk%C3%A1_rozhledna_-_panoramio_(1).jpg): Edgar El, CC BY 3.0. Käytetty vain rakenteen/värin viitteenä, ei taustan tai sommittelun kopiointiin.
- [petrin-5-ylhaalta.jpg](https://commons.wikimedia.org/wiki/File:Petrinska_rozhledna_a_nejblizsi_okoli_20250427_130633.jpg): VANOCE2022, CC0. Käytetty vain rakenteen/värin viitteenä, ei taustan tai sommittelun kopiointiin.

Täydellinen prompti, käytetyt neljä viitepolkua, source-blobit, native/final/mask-SHA:t ja tarkistusluvut ovat petrin-K1-tarkistus-20261014.json-tiedostossa.

## Pysähdys

#256 pyytää K1+maskin postiin ja pysähtymisen PT:n täysikokoiseen katselmukseen. Odotamme tämän ensimmäisen kuvan palautetta. PT:n ehdotus myöhemmästä K2–K5-erästä ei yksin muuta omistajan suoraa yksi-kuva-kerrallaan-ohjetta. Mallikierrokset odottavat kaikkien viiden tavoitekuvan hyväksyntää. Mallia, peliä tai julkaisua ei ole muutettu.
