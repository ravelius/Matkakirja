# Astra: native51 ja neutraalit — lopullinen rajattu arvio

**Native51:n 18 kuvan katselmus on valmis: 6 RGB-, 6 semanttista ja 6 contract276-Neutral-kuvaa saavat rajatun visuaalisen hyväksynnän PT304:n museon ja Kansankongressitalon sävy-/sokkelimuutokselle.** Tämä korvaa pilotin avoimen loppuportin. OFFGAME jatkuu; kokonaislaatu, omistajan hyväksyntä, peli-integraatio ja lentotesti eivät sulkeudu tällä arviolla.

Katsoin henkilökohtaisesti kaikki 18 lopullista alkuperäistä ja kaikki 18 vastaavaa native50-alkuperäistä. Kuvat ovat 1600 × 900. Laskin jokaisen SHA256:n: kaikki native51-kuvat täsmäävät final-18-frame-manifestiin ja native50-verrokit edellisen arvion pinneihin. Valmistumisilmoitus saatiin ennen loppukatselmusta. Blenderiä ei avattu.

## Näkyvä tulos

Museon vasen pitkä massa ja Kansankongressitalon oikealla rajautuva massa ovat Neutralissa lämpimämmät ja tummemmat; erityisesti tasakattojen valkoinen hohde vähenee. Ilmakuvassa niiden huomioarvo suhteessa palatsiin pienenee. Tavallisessa RGB-valaistuksessa vaikutus on hienovaraisempi mutta samaan suuntaan. Massat ovat edelleen tarkoituksella pelkistettyjä. Ne eivät tämän muutoksen myötä muutu valmiiksi realistisiksi julkisivuiksi.

Sokkelikaista ja yksi räystäsviiva ovat hillittyjä. Näkyvillä pinnoilla ei ilmene uusia pylväsrivejä, ikkunaruudukkoa, koristeita, tekstejä, lippuja tai muotokuvia. Kuvista ei mitata 1,5 m:n sokkelia tai 0,4 m:n räystästä tarkasti; oikea massa rajautuu osittain kuvan ulkopuolelle. Piilopinnat jäävät teknisen auditoinnin varaan.

Hero-obeliski ja Mao-massa pysyvät vaaleina. Taihedianin PT303:n hyväksytty keltakulta, tiilirivit, maalatut palkit, marmoriterassit sekä syvät ovi-/räystäsvarjot säilyvät. Näiden sävyä ei tämän arvion perusteella säädetä. Beihain veden ja rantojen rajat, Jingshanin metsän rakenne sekä hutongin kattotiilet ja varjot säilyvät silmämääräisesti; kuudessa näkymässä ei havaittu uutta näkyvää regressiota.

Semanttiset rakennus-, puusto-, vesi- ja maa-alueet säilyvät. Taihedian, Beihai, Jingshan ja hutong ovat RGB-pikseleiltään identtisiä native50-verrokkiensa kanssa. Ilmassa muuttuu 31 ja aukiossa 37 pikseliä, suurin kanavaero 4/255. Näkyvää rakenteiden katoamista tai siirtymistä ei ole. Semanttinen värikuva on karkea luokitus, ei täydellinen mesh- tai mitoitusauditointi.

## Pikselivertailu native50 → lopullinen native51

RGB-kanavien ero asteikolla 0–255; ≥20 tarkoittaa pikseliä, jonka jokin kanava eroaa vähintään 20. Luvut kuvaavat eroa, eivät muodosta hyväksymiskynnystä. Pienet erot voivat sisältää renderöintivaihtelua ja epäsuoraa valoa; kaikkia eroja ei kuitata kohinaksi.

| Ryhmä | Näkymä | Suurin ero | Keskimääräinen ero | Muuttuneita pikseleitä | Pikseleitä ≥20 |
|---|---|---:|---:|---:|---:|
| RGB | ilma | 29 | 0.409439583 | 73552 | 461 |
| semantic | ilma | 4 | 0.000024769 | 31 | 0 |
| neutral | ilma | 32 | 0.657812500 | 72144 | 37314 |
| RGB | taihedian | 1 | 0.000317361 | 1340 | 0 |
| semantic | taihedian | 0 | 0.000000000 | 0 | 0 |
| neutral | taihedian | 5 | 0.000338889 | 1398 | 0 |
| RGB | aukio | 26 | 0.786363426 | 194961 | 474 |
| semantic | aukio | 4 | 0.000023148 | 37 | 0 |
| neutral | aukio | 39 | 1.278830787 | 187456 | 61057 |
| RGB | beihai | 1 | 0.000059259 | 254 | 0 |
| semantic | beihai | 0 | 0.000000000 | 0 | 0 |
| neutral | beihai | 1 | 0.000052083 | 225 | 0 |
| RGB | jingshan | 6 | 0.000318287 | 1303 | 0 |
| semantic | jingshan | 0 | 0.000000000 | 0 | 0 |
| neutral | jingshan | 4 | 0.000232407 | 963 | 0 |
| RGB | hutong_ilma | 1 | 0.000078241 | 337 | 0 |
| semantic | hutong_ilma | 0 | 0.000000000 | 0 | 0 |
| neutral | hutong_ilma | 1 | 0.000048148 | 204 | 0 |

Tarkat aluekohtaiset RGB-keskiarvot, pilotin vertailu lopullisiin neutraaleihin sekä kaikki tiedostopinnit ovat JSONissa. Pilotin JSONin virheelliset yksikanavaiset `afterMeanRGB`-kentät laskettiin uudelleen samoista alkuperäisistä: kentät sisältävät nyt todelliset kolmen kanavan jälkikuvan keskiarvot. Korjaus koskee raportin kirjanpitoa, ei kuvia tai aiemman pilotin visuaalista johtopäätöstä.

## Tallennettu malli ja teknisen näytön rajat

Laskin itse lopullisen mallin SHA256:n `0572b74e033361077de63ec10eba5d5194f6cf65da6d63681e21d9bbb84adfc2` ja pakatun mallin SHA256:n `6fe272101e263d675f2abb487804c30080844f0c8561c254963cf529c5447d05`. Molemmat täsmäävät manifestiin ja tositteisiin.

Lopullinen `final-native-mass-readback.json` ilmoittaa sekä pilottimallin että tallennetun native51:n todella uudelleenavatuiksi. Sen mukaan meshien XYZ/topologia/UV/materiaalipaikat/transformit/näkyvyys, materiaalinodit ja alkuperäiset kuvat täsmäävät pilotista lopulliseen; neljä massaa vastaavat suunnitelmaa, muut native50-meshit ja vanhat materiaalit säilyvät sekä PT303 on lukittu. Tämä korvaa pilotin historiallisen `notSavedModelReopenYet=true`-rajan. En suorittanut tätä Blender-auditointia itse.

Pakkaustosite ilmoittaa tallennetun pakatun mallin uudelleenavauksen ja kaikkien 56 tiedostokuvan tavuntarkan sisällyttämisen. Kuuden teknisen vaiheen loki on PASS. Nämä ovat tuottajan teknistä näyttöä; oma riippumaton tarkistus tässä kattaa alkuperäiskuvien katselun, pikselivertailut, asetustiedostojen vertailun ja tiedostojen SHA256:t.

RGB-/semantic-asetuksissa kamerat, resoluutio, näytteet, valon energia, valotus, maailmavalaistuksen nodeasetukset ja värimuunnokset täsmäävät native50:een. Neutral-tositteissa Khronos PBR Neutral, look None, valotus 0, gamma 1, yhtenäinen ympäristö, aurinkokulmat, 128 näytettä ja resoluutio täsmäävät. Neutral on edelleen vertailurenderi, ei pelikuva tai lopullinen peliveden ulkonäkö.

PT304:n peruskivi [0,55; 0,52; 0,46], katto [0,48125; 0,455; 0,4025] ja sokkeli [0,4675; 0,442; 0,391], roughness 0,85, ovat tuottajan readbackin materiaalilukuja. Katon 12,5 % ja sokkelin 15 % materiaalitummennus eivät tarkoita samaa prosenttia PNG-pikseleissä. Lähdekorkeudet, footprintit ja PT295:n historialliset korkeusvalinnat eivät saa tästä fyysisen mittauksen vahvistusta.

## Portit

| Vaihe | Tila |
|---|---|
| Pilotin 3 Neutral-kuvaa + 3 native50-verrokkia | Aiempi rajattu hyväksyntä säilyy |
| Lopulliset 6 RGB-kuvaa + 6 native50-verrokkia | Katsottu; rajattu hyväksyntä |
| Lopulliset 6 semanttista + 6 native50-verrokkia | Katsottu; rajattu hyväksyntä |
| Lopulliset 6 Neutral-kuvaa + 6 native50-verrokkia | Katsottu; rajattu hyväksyntä |
| Native51:n 18 kuvan riippumaton visuaalinen portti | SULJETTU PT304:n rajauksessa |
| Kokonaislaatu, omistajan hyväksyntä, peli/runtime ja julkaisu | Ei hyväksyntää tästä arviosta |

PT284:n native50-GLB-paketti on eri versio ja erillinen arvio. Native51:n hyväksyntä ei päivitä sen sisältöä eikä poista sen puukortti-, LOD- tai tien materiaalivasteen rajoja. Toimituksesta ei päätellä peli-integraatiota. Vain tämä nimetty MD/JSON-pari kirjoitettiin; lähteitä, malleja, kuvia ja kameroita ei muokattu, vientiä tai julkaisua ei tehty eikä viestejä lähetetty muihin keskusteluihin.
