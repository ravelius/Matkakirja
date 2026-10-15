# CODEX → PT/Fable: Petřín K5 v1 + uusi maski + analyyttinen kamera (#266, 15.10.2026)

K5 on tehty **yhdellä kokonaan uudella generoinnilla**: korkea alaspäin katsova ilmakuva, koko masto/torni/halli ja näkyvät jalat kuvassa; ylälyhdyn ja juurihallin kattopinnat näkyvät ylhäältä. Taustalla on puistomaastoa, ei taivasta tai horisonttia. Toimitan K5:n, uuden natiivimaskin, kameralaskelman ja QA:n ja **pysähdyn palautteeseen**. Mallisilmukkaa, pelikytkentää tai julkaisua ei aloiteta.

- [K5 v1, natiivi PNG](petrin-K5.png)
- [K5:n uusi täytetty ulkosiluettimaski](petrin-K5-maski.png)
- [K5:n analyyttinen kameralaskelma](petrin-K5-kamera-20261015.json)
- [Koko prompti, lähteet, QA, maski, kamera ja nykyinen K1–K5-inventaario](petrin-K5-tarkistus-20261015.json)

## K4 hyväksytty, K5:n liitteet tarkistettu

Lähde `fable-codex-petrin-K4-hyvaksytty-ja-peking-kuitattu-20261015.md` luettiin kokonaan commitista b243a48ad408da5ae9eda3674f423ebb1f375803, blob b5ca034a199f7342bcd0ad7506ce597a46d00ded. K4-toimitus 8f3cee1c0bf2bab7424a2c385334f47dd0b89d3b ja sen kaikki 5 postiliitettä varmennettiin ennen jatkoa. Kuva, maski, 1536 × 1024 natiivikoko ja lähtökamera (5°, 100 m, silmä 1,7 m, pysty-FOV 39,955°, pitch 16,671°) on kirjattu PT:n kelpuuttamiksi. Pohjoisdetaljit pysyvät varmentamattomana rekonstruktiona.

PT:n kelpuutus säilyy erillään riippumattomista pikseli-/mallimittareista. K4:n IoU/korkeus/ΔE eivät ole vielä mitattuja tuloksia. Aiemmat lähteet, omistajan ohjeet, kuvat, maskit ja QA säilyvät. Nykyiset hyväksytyt versiot ovat **K1 v3, K2 v1, K3 v1 ja K4 v1**. K1 v1/v2 eivät ole nykyisiä tavoiteversioita.

K5:n alkuperäinen kamera tarkistettiin: **atsimuutti 100°, D 130 m, silmä 150 m, pitch −40,2°, pysty-FOV 40°**, katsesuunta 280°. Liitteen kuva 5 katsottiin: se on tornin tasanteelta alaspäin kuvattu lähikuva, ei ilmakuva. Sen ravintolarakennusta, kylttejä, autoa tai etualan ristikkokehystä ei siirretty K5:een; kuvaa 5 ei käytetty generaattorin viitteenä tai oikean K5-kameran todisteena. Varsinaista vastaavaa ilmavalokuvaviitettä ei ole.

## K5:n menetelmä ja kuva-QA

Uusi 2D-ilmakuvarajauskaavio ohjasi kokonaisuutta; VANOCE2022:n CC0-sisäänkäyntikuva oli vain rakenneviite ja K1 v3 materiaalin/valokuvailmeen viite. Vanhojen valokuvien pikseleitä ei paikallisesti muokattu, pienennetty, liitetty tai outpaint-laajennettu. K5:n kutsuja on 1, Petřínissä yhteensä 7.

Natiivi/toimitus **1536 × 1024**, ei suurennusta. Alkuperäinen 2400 px pitkän sivun pyyntö ei palautunut; K5:n oma natiivikoko odottaa PT:n kelpuutusta. RGB-pikselit vastaavat natiivia täsmälleen; vain havainnekuva-/viitemetadata ja sRGB tallennettiin PNG:hen. Pieni ”havainnekuva”-merkintä on mukana.

Koko natiivikuva katsottiin. Ilmakuva on uskottava, kattopinnat ja puistomaa erottuvat, torni ei ole foreground-puiden peitossa. Ei ihmisiä, autoja, luettavia opasteita tai logoja. Teräs, rappaus, lasi ja puisto ovat valokuvamaisia. Itäatsimuuttia, silmän absoluuttista korkeutta tai sisäänkäynnin täsmällistä suuntaa ei voi riippumattomasti todentaa generoidusta kuvasta; ne pysyvät sovituksen lähtöoletuksina.

| Kohta | K5-havainto |
|---|---|
| Mastokärki | y ≈ 70 ±6 px |
| Piilossa oleva tornin keskiakselin maapiste | **arvio** y ≈ 800 ±25 px, ei suora mittaus |
| Näkyvien tukijalkojen kosketuskohdat | noin y = 743–864; eri syvyyksillä |
| Koko näkyvän objektin alin piste | noin y = 864, ei sama piste kuin keskiakselin maapiste |
| Hallin katon keskialue | noin y = 716 ±15, ei varmennettu fyysinen 7 m piste |
| Ylätasanteen lattiareuna | noin y = 250 ±5 |
| Alatasanteen lattiareuna | noin y = 580 ±8 |
| Koko torni / korkea ilmakuva / kattopinnat näkyvät | kyllä |
| Riippumaton 3D-IoU / korkeusvirhe / ΔE | ei mitattu; null |
| PT:n K5-kuva/maski/koko/kamera | odottaa palautetta |

## Kamera ja sen epävarmuus

Etäisyys 130 m, silmä 150 m ja atsimuutti 100° pidetään alkuperäisinä lähtöoletuksina; roll 0, 3:2. Maston ja **arvioidun, hallin peittämän** keskiakselin maapisteen perusteella laskettu lähtöarvio on **pysty-FOV 24.802°**, **pitch -42.035°**. Pääpiste x ≈ 768. Liite sisältää koordinaattikäytännön, sijainnin, projektiokaavan ja kaikki havainnot.

Tämä on kahden pystyakselipisteen pinhole-arvio, ei yksikäsitteisesti palautettu oikea kamera tai koko 3D-siluetin varmennettu sovitus. K5:n tärkeä lisärajoite: maapiste piiloutuu hallin alle. Lähimmän etujalan alinta y-koordinaattia ei käytetty virheellisesti tornin keskiakselin maapisteenä. Havaintojen epävarmuutta vaihtelemalla laskennallinen FOV vaihtelee noin 23.81–25.88°; tämä on analyyttinen herkkyystarkastelu, ei riippumaton tarkkuustesti. Kokonaiskorkeus noin 71 m ja hallin arviomitat pysyvät epävarmoina. Mallia tai vertailurenderiä ei tuotettu.

**Geometria säilyy #253:ssa:** runko 58,7 m, alatasanne 20 m, ylätasanne 51 m. Näkyvät lattiareunat poikkeavat tämän arvioidun kameran akseliprojektiosta: alatasanne noin -52.6 px, ylätasanne noin -68.8 px. Etureunat eivät ole keskiakselin pisteitä, ja generaattorissa on tasanne-/rakenne-eroja. Kuvasta ei muuteta fyysisiä korkeuksia. K5:n IoU-raja pysyy 90 %; K1:n 85 % ei laajene muihin. Korkeus-/ΔE-rajat odottavat myöhempää mallivaihetta ennallaan.

Maski on uusi K5:n natiivikoordinaateista annotoitu täytetty ulkosiluetti: sama 1536 × 1024 rajaus, torni 255, muu 0, pehmeä reuna 0 px. Sisäaukot täytetään aiemmin kelpuutetun periaatteen mukaisesti. Maston, hallin ja jalkojen rajat tarkistettiin overlayna; hallin katon ulkoneva takaoikea reuna korjattiin annotaatioon tämän tarkistuksen jälkeen. Alkuperäinen maskiluonnos säilytettiin erikseen. Valokuvan pikseleitä ei muutettu. Maskilla ei ole riippumatonta pikselisertifikaattia, K5:n PT-kelpuutus on avoin.

Krediitti: **VANOCE2022 — CC0**, [arkkitehtuuriviite](https://commons.wikimedia.org/wiki/File:Petrinska_rozhledna_a_nejblizsi_okoli_20250427_121942.jpg). Kaikkien aikaisempien lähteiden krediitit ja versiot säilyvät historiassa. K5 on tekoälyllä tuotettu sisäinen havainnekuva.

Tämä toimitus täydentää viiden nykyisen kuvakulman **arviointipaketit**; hyväksyttyjä tavoitteita on edelleen 4 ennen K5-päätöstä. Tämä ei ole kaikkien viiden hyväksyntä, mallisilmukan aloitus, pelitoimitus, pelikytkentä tai julkaisu. R2:ta tai main-haaraa ei käytetty. Peking säilyy omalla omistajallaan; sen tuotantoa tai tiedostoja ei muutettu.
