# CODEX → PT/Fable: Petřín K4 v1 + uusi maski + analyyttinen kamera (#264, 15.10.2026)

K4 on tehty **yhdellä kokonaan uudella generoinnilla**. Koko masto, torni, halli ja jalat näkyvät. Hallissa on rauhallinen ikkunallinen takasivu ilman etelän pääsisäänkäyntiä tai punaisia infotauluja. Toimitan kuvan, uuden natiivimaskin ja analyyttisen kameran arviointiin ja **pysähdyn K4-palautteeseen**. K5: 0 kutsua. Mallituotanto odottaa kaikkien K1–K5-tavoitteiden hyväksyntää.

- [K4 v1, natiivi PNG](petrin-K4.png)
- [K4:n uusi täytetty ulkosiluettimaski](petrin-K4-maski.png)
- [K4:n analyyttinen kamerasovitus](petrin-K4-kamera-20261015.json)
- [Koko prompti, lähteet, QA, maskiannotaatio ja kamera](petrin-K4-tarkistus-20261015.json)

## Lähde ja K3:n kelpuutus

Lähde `fable-codex-petrin-K3-ja-pulu-hyvaksytty-20261015.md` luettiin kokonaan; blob a1eadbc75fe6a5e2da30fd3538a99c1d592ba831 varmennettiin commitista b50b05b8a80e38548d9205611de4333a78a6c45b. Alkuperäinen päivitetty tilaus, #253:n mittakorjaus, maskilisäys ja sovellettavat kamera-/hyväksyntäkorjaukset luettiin kokonaan ennen työtä. Täydet lähdeversiot ja tavujen tarkistukset ovat JSON-liitteessä.

K3-toimitus b1fca6423ffbe7be25026a09c5cf3949cb6c1e6c varmennettiin sen kaikkien 5 postiliitteen osalta ennen jatkoa. K3:n kuva, maski, 1536 × 1024 natiivikoko ja lähtökamera (270°, 110 m, silmä 1,7 m, pysty-FOV 37,358°, pitch 15,454°) on kirjattu **PT:n kelpuuttamaksi**. Kelpuutus ei ole riippumaton pikselisertifikaatti tai mitattu 3D-IoU-/korkeus-/ΔE-tulos; nämä luvut odottavat mallivaihetta. Kaikki aiemmat versiot, QA:t ja alkuperäiset kamerat säilyvät. Hyväksyttyjä tavoitteita on 3 ennen K4-arviota.

## K4: menetelmä, takasivun epävarmuus ja kuva-QA

Viitteinä olivat uusi tornin pystyakselin sisältävä 2D- vaakarajauskaavio, VANOCE2022:n CC0-sisäänkäyntikuva vain rakenteen ja materiaalien osalta sekä hyväksytty K3 vain luonnollisen valokuvailmeen osalta. **Vanhan valokuvan pikseleitä ei muokattu, pienennetty tai outpaint-laajennettu.** K4 on uusi koko kuvan generointi: 1 kutsu tässä vaiheessa, Petřínissä yhteensä 6.

Pohjoispuolen varmennettua valokuvaviitettä ei ole. Alkuperäisen kuvan 4 GPS/suunta on ristiriitainen, eikä sitä käytetty pohjoiskulman todisteena tai tässä generaattorin viitteenä. K4:n takasivun ikkunat ja detaljit ovat **varovainen mutta varmentamaton rekonstruktio**, eivät todennettu kuva todellisesta pohjoisjulkisivusta. Absoluuttista atsimuuttia ei voi itsenäisesti todentaa generoidusta kuvasta. Pohjoissuunnan 5° säilyy kameran annetussa lähtöoletuksessa; pääsisäänkäynti jää kaukaiselle eteläpuolelle.

Natiivi/toimitus on **1536 × 1024**, ei suurennusta. Alkuperäinen 2400 px pitkän sivun pyyntö ei palautunut; K4:n oma natiivikoko odottaa PT:n kelpuutusta. RGB-pikselit ovat täsmälleen natiivin mukaiset, PNG:hen lisättiin vain havainnekuvasta/viitteistä kertova metadata ja sRGB-tallennus. Pieni ”havainnekuva”-merkintä on kuvassa.

Koko natiivikuva katsottiin: valokuvamainen ristikkoteräs, rappaus, päivänvalo ja kesäpuisto ovat uskottavia. Torni ei ole puiden, seinän tai etualan esteiden peitossa; ei ihmisiä, logoja tai luettavia opasteita. Kuva ei näytä etelän pääovikuvaa tai punaista infotaulua takaseinällä. Kuvaa ei uusittu rajauksen takia.

| Kohta | K4-havainto / ratkaisu |
|---|---|
| Mastokärki | y ≈ 53 ±3 px; 5,2 % ylhäältä |
| Jalkojen akselitaso | y ≈ 960 ±5 px; 93,8 %; maankosketukset eri syvyyksillä |
| Tornin akseli kuvakorkeudesta | 88,6 %; alkuperäinen kamera noin 77,7 % |
| Rungon/lyhdyn kattotaso | y ≈ 165 ±4 px |
| Ylätasanteen lattia | y ≈ 210 ±4 px |
| Alatasanteen näkyvä lattiareuna | y ≈ 563 ±8 px |
| Koko torni / maantasokuva / fotorealistinen | kyllä |
| Tarkka pohjoisjulkisivu ja atsimuutti | ei valokuvasta varmennettu |
| Mallin IoU, korkeusvirhe, ΔE | ei mitattu; null |
| PT:n K4-kuva/maski/koko/kamera | odottaa palautetta |

## Analyyttinen kamera ja mitat

Alkuperäiset K4-lähtöoletukset: atsimuutti **5°**, etäisyys **100 m**, silmä **1,7 m**, pitch 16,9°, pysty-FOV 45°. Katsesuunta on lähes etelään (185°), roll 0. Etäisyys, korkeus ja absoluuttinen suunta eivät ole kuvasta riippumattomasti varmennettuja.

Mastosta ja jalkojen arvioidusta akselitasosta laskettu uusi **pysty-FOV 39.955°**, **pitch 16.671°**. Kuvasuhde 3:2; pääpiste x ≈ 763. Liitteessä on sijainti, koordinaattikäytäntö, fokaalipikselit, projektiokaava ja kaikki lähtöarvot. Vaakasuuntainen masto-/juuriakseli eroaa havainnoissa noin 5 px; kahden y-pisteen sovitus ei väitä koko 2D-asennon osuvan.

Tämä on analyyttinen pystyakselin kahden pisteen pinhole-sovitus, ei yksikäsitteisesti palautettu oikea kamera eikä koko 3D-siluetin varmennettu sovitus. Mallia tai vertailurenderiä ei tuotettu. Kokonaiskorkeus noin 71 m ja hallin arviomitat ovat edelleen epävarmoja.

**Geometria pysyy #253:n mitoissa:** runko 58,7 m, alatasanne 20 m, ylätasanne 51 m. Alatasanteen näkyvä lattiareuna poikkeaa sovitetun kameran akseliprojektiosta noin -104.5 px, ylätasanne noin -64.5 px. Etureunat eivät ole kaikki rungon keskellä olevia pisteitä ja generaattori siirtää tasanteita; **kuvan tasanne-erot eivät muuta mallin fyysisiä korkeuksia**. K4:n IoU-raja on 90 %; K1:n 85 % jää vain K1:lle. Korkeus-/ΔE-rajat mitataan myöhemmin lähteen mukaisina.

Uusi K4-maski: natiivikoordinaatit, sama 1536 × 1024 rajaus, torni 255 / tausta 0, pehmeä reuna 0 px. Täytetty ulkosiluetti, sisäaukot täytetty K1/K2/K3:n periaatteella. Maski ei ole näkyvän metallin segmentaatio. Kokonaisulkoraja, masto ja juurihalli tarkistettiin overlayna. Maski on käsin annotoitu arviointiversio ilman riippumatonta pikselisertifikaattia; PT:n K4-kelpuutus on avoin.

Krediitit säilyvät: **VANOCE2022 — CC0**, [rakenteen materiaaliviite](https://commons.wikimedia.org/wiki/File:Petrinska_rozhledna_a_nejblizsi_okoli_20250427_121942.jpg). Aiempien lähteiden ja versioiden krediitit säilyvät historiassa; K3 on vain aiemmin generoitu tyyliviite. K4 on tekoälyllä tuotettu sisäinen havainnekuva.

Toimitus on vain sisäisen Git-postilaatikon arviointipaketti: ei R2-peliassetia, peli-integraatiota, pelijulkaisua, main-haaran muutoksia tai mallituotantoa. K5 odottaa K4:n palautetta. Pulun ja Pekingin töitä/tiedostoja ei muutettu; niitä ei siirretty tähän chatiin eikä käynnistetty lisätekijöitä.
