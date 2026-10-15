# Astra: PT284 native50 materiaali-v2 — delta-arvio

**Rajattu välitestihyväksyntä tunnetuin rajoituksin.** V2 palauttaa tien ja stupan sävyä tallennetun native50:n suuntaan. V1:n tievaaleushavainto sulkeutuu tämän staattisen Blender-vertailun ja korjatun perusvärin osalta. Pelin materiaalivaste, TBN, vesi, Unity-lentotesti ja lopullinen kokonaislaatu jäävät avoimiksi.

Katsoin henkilökohtaisesti kaikki 15 V2-alkuperäistä, niiden 15 V1-verrokkia ja kaikki kuusi native50:n contract276-Neutral-alkuperäistä. Kuusi kaupunkikuvaa on 1600 × 900; laatan 2,3 kolme kuvakulmaa kullakin LOD0/1/2-tasolla ovat 960 × 540. Kaikki kuvien SHA256:t täsmäävät tositteisiin. Native51:n valmis 18 + 18 kuvan loppuarvio ja sen molemmat tiedostot säilyivät muuttumattomina; tämä paketti on native50.

## Näkyvä muutos

Aukion ja hutongin tiet tummenevat selvästi. V1:n vaalea, tasainen nauha muuttuu native50:n neutraalin tien kaltaiseksi tummaksi harmaaksi. Aukion puhtaan tien näytealueella (995,730)–(1005,740) RGB-keskiarvo on V1:ssä [141,59;139,41;131,76], V2:ssa [97,27;97,20;89,18] ja native50:ssä [97,21;97,17;89,16]. Tämä on vahva paikallinen vastaavuus; se ei todista kaikkien pelivalojen tai materiaalien vastaavuutta.

Beihain stupan rungon alueella (888,400)–(904,420) keskiarvo muuttuu [210,20;207,06;197,85] → [193,37;192,12;188,26], kun native50-verrokki on [194,34;193,24;188,94]. Stupa jää valkoiseksi tunnistettavaksi maamerkiksi mutta sen liiallinen kirkkaus vähenee. Jäljelle jäävää pientä eroa ei ole syytä korjata uusilla sävysäädöillä tämän katselmuksen perusteella.

Kultakatot, punaiset seinät, maalatut palkit, marmoriterassit, aukion kiveys ja native50:n vaaleat lisämassat säilyvät V1:n näköisinä. Museo ei saa tässä native51:n tummempaa massaväriä: katon näytteen V2-keskiarvo on noin [198,88;196,07;188,12], samaa tasoa kuin native50-verrokki [198,86;196,05;188,10].

Roofdiag-korjaus säilyy kaikissa kolmessa LOD:ssa: aiemman tumman läpityöntymän kohdassa (590,256) V1/V2-pikselit ovat täsmälleen samat — LOD0 [183,133,46], LOD1 [181,131,44], LOD2 [184,133,46]. Kolmen lähikuvan suurin koko kuvan kanavaero on vain 1/255. Ylä- ja viistokuvissa näkyvät muutokset sijoittuvat etenkin tieosuuksiin; kattojen uusiutumista tai tummaa läpityöntymää ei havaittu.

Taihedianin suuremman kattopinnan V1/V2-keskiarvo pysyy noin [181,85;132,61;45,46]. Native50-Neutralin vastaava näyte on [182,11;131,44;34,98]. V2 siis säilyttää V1:n kattovasteen; tämä ei ole väite GLB:n ja natiivin täydellisestä pikselivastaavuudesta eikä peruste avata PT303:n hyväksyttyä kattosävyä uudelleen.

## Erot V1 → V2

Kanavaerot asteikolla 0–255. ≥20 laskee pikselit, joissa jokin kanava muuttuu vähintään 20; kyseessä on diagnostinen luku, ei hyväksymiskynnys.

| Kuva | Suurin ero | Keskimääräinen ero | Pikseleitä ≥20 |
|---|---:|---:|---:|
| city-lod0-ilma.png | 52 | 1.221105 | 39358 |
| city-lod0-taihedian.png | 44 | 0.026945 | 419 |
| city-lod0-aukio.png | 47 | 1.592159 | 52178 |
| city-lod0-beihai.png | 46 | 0.149938 | 4499 |
| city-lod0-jingshan.png | 46 | 0.065910 | 2173 |
| city-lod0-hutong_ilma.png | 51 | 2.437064 | 98182 |
| tile2-3-lod0-taihedian.png | 1 | 0.000152 | 0 |
| tile2-3-lod0-high-oblique.png | 48 | 0.266218 | 3179 |
| tile2-3-lod0-top.png | 48 | 1.001503 | 12760 |
| tile2-3-lod1-taihedian.png | 1 | 0.000066 | 0 |
| tile2-3-lod1-high-oblique.png | 48 | 0.268471 | 3201 |
| tile2-3-lod1-top.png | 48 | 1.019507 | 12940 |
| tile2-3-lod2-taihedian.png | 1 | 0.000077 | 0 |
| tile2-3-lod2-high-oblique.png | 48 | 0.268564 | 3203 |
| tile2-3-lod2-top.png | 47 | 1.018209 | 12950 |

## Säilyvät rajat

Puuston ristikkäiset pystykortit ja vaakasuuntaiset yläkortit näkyvät edelleen hyllymäisinä ja kulmikkaina erityisesti Beihain, Jingshanin ja hutongin kuvissa. Värikorjaus ei paranna puiden geometriaa. LOD0→1 poistaa edelleen kaiteita, pronssiesineitä ja muuta pientä arkkitehtuuria; samassa kamerassa muutos on näkyvä. Vaihtomatkat, liike ja naapurilaattojen eri LOD:t vaativat lentotestin.

Vesi on tarkoituksella poistettu vientikuvista; harmaat altaat eivät osoita peliveden tai rantasaumojen toimivuutta. Pohjoinen native-konteksti ENU y=1250:n jälkeen on edelleen rajattu pois. Kokonaisina säilyvien rakennusten alta voi rajalla puuttua maapintaa. Uutta suurta sisäistä laattavajetta, UV-hajoamista tai puuttuvasta tekstuurista kertovaa magentaa ei katsotuissa kuvissa havaittu. Tämä ei tarkista jokaista saumaa tai piilopintaa.

## Tiedostot ja tekninen näyttö

Tarkistin molempien pakettien 15 PNG:t render-proofeja vasten, V2:n kaikki 72 GLB:t korjauskuitin ja tiedostokohtaisten proofien SHA256:ia vasten sekä V1:n kaikki 72 GLB:t kuitin vanhoja pinnejä vasten. Molempien render-proofien 27 import-riviä täsmäävät todellisiin GLB-tiedostoihin: kyse on 26 yksilöllisestä GLB:stä, 24 kaupungin LOD0-laatasta ja laatan 2,3 kahdesta alemmasta LOD:sta. Kaikkia 72 tiedostoa ei katsottu erillisinä renderöinteinä. Binary-readback-tiedostojen SHA256:t täsmäävät render-proofeihin.

V2:n renderöinnin binary-readback-pinni on `3c9d60bc3f119ea46e630a3eff2faa6f5918e5b272ca74df8d5917f3fddaa8cd`. Korjauskuitin lähdepinni `737cc0179cf1e84da5b9dbdfe60cd57d2cf41bd5d514498df7561aa6f76e578c` täsmää `round50/final-native-square-readback.json`-tiedostoon. Se ei tarkoita erillistä plain-material-difference-yhteenvetoa.

Tuottajan korjauskuitti ja lähdevertailu yksilöivät stage5_road-perusvärin [0,30;0,29;0,26] → [0,14;0,14;0,119] sekä stupa_valkoinen-perusvärin [0,84;0,82;0,75] → [0,70;0,695;0,67]. Kuitin mukaan koko BIN ja kaikki muu GLB-JSON pysyvät ennallaan. En suorittanut tämän invarianssin teknistä auditointia tai Blender-readbackia uudelleen; se kuuluu Solin erilliseen delta-auditointiin. Omat vahvistukseni ovat tiedostopinnit, kuvat ja pikselivertailut. Blenderin normaaliperusta eroaa pelin OmaMalli-shaderista, joten nämä kuvat eivät validoi pelin TBN:ää.

## Johtopäätös

V2 on visuaalisesti hyväksyttävä rajattuun yksityiseen välitestiin. Tien ja stupan korjaukset vievät tulosta tarkoitettuun native50-suuntaan ilman havaittua uutta materiaaliregressiota. Roofdiag ja PT303 säilyvät. Puusto-/LOD-rajat sekä peliveden, materiaalivasteen ja runtime-suorituskyvyn portit pysyvät auki. V1 ja native51-arvio säilyvät erillisinä; tästä raportista ei seuraa toimitus-, integraatio-, omistaja- tai julkaisukuittausta.

Vain nimetty delta-arvion MD/JSON-pari kirjoitettiin. Blenderiä ei ajettu, lähteitä/kuvia/malleja ei muokattu, alidelegointia tai viestejä muihin keskusteluihin ei tehty.
