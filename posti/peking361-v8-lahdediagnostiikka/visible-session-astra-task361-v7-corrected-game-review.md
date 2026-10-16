# #361 — V7:n korjattu pelikuva-arvio ja V8-korjausrajaukset

**V7:n kiveys kelpaa visuaaliseksi suunnaksi. V8 tarvitsee vesi-, raja- ja cut-korjaukset ennen lopullista hyväksyntää.** Katsoin kaikki kahdeksan alkuperäistä JPG:tä natiivikoossa ja varmistin niiden sekä TSV:n tavumäärät ja SHA-256:t vastaanottokuitista. Myös kokonaan luetun source-review.md:n hajautus täsmää. Lähdecommit `f8c3155895f0aede97ff2cf3d283eabeba1a8252`, simulaattorin kerros-app `dc48614f`.

## Kiveyksen myönteinen havainto ja rajat

Oma maa näkyy nyt: k3:n normaalikuva sisältää kiveyksen, ja 2_3:n piilotuksessa se sekä rakennukset katoavat harmaaksi. Vastaanottajan lähteen mukaan molempiin paketteihin on palautettu 12 ion_leikkaus-osaa. Aiempi V6:n AO-peliarvio `399c814e5` on kumottu; uusi V6-AO-arvio tulee erikseen. Tästä aineistosta ei tehdä uutta AO-voimakkuuspäätöstä.

Lähikuvan yläosassa ja k2/liuku2:ssa V7:n pitkänomaiset kivet ja saumat ovat tunnistettavia. Hillitty sävymosaiikki ei muodosta häiritsevää suurta shakkiruutua. En näe toimitetuissa stilleissä selvää 4,8 metrin toistoruutua tai häiritsevää moiré-kuviota, mutta ajallista välkettä niistä ei voi todistaa poissa olevaksi. Liuku2 on yksi still, ei liikehavainto.

Täsmennys lähdepalautteeseen: V6 ei näytä kaikissa näissä kuvissa vain tasaiselta ja sumealta. K2:ssa ja rajalähikuvassa sen kivet ovat tiheämpiä ja paikoin terävämpiä/kontrastikkaampia; V7 on suurempikuvioinen ja pehmeämpi. Myönteinen arvio koskee V7:n luettavaa, hillittyä kokonaisuutta, ei yleistä väitettä suuremmasta terävyydestä.

Klo 18 molemmat k1-kuvat ovat hyvin tummia. Koko kuvan ero- ja tummuusluvut eivät ole albedomittauksia, kiveyksen erillismittauksia tai AO-mittauksia. Niiden perusteella ei nosteta koko materiaalin kirkkautta.

## Korjausprioriteetit

### 1. Vallihaudan näkyvä regressio; tasanneväitteen tarkka kohdistus

K5:n etualan V6-vallihauta näkyy yhtenäisenä tummana sinivihreänä pintana. V7:n samalla alueella näkyy selvä valokuvamainen, juovikas pinta. Ero on vahva ja korjattava: oman veden tulee näkyä tarkoitettuun rantaan asti ilman ilmakuvan peittoa tai vuorottelua. Kuva ei ratkaise, puuttuuko pinta, peittyykö se, onko korkeudessa ero vai johtuuko tulos esikäsittelystä. Sol tutkii actualGLB/pipeline-syyn.

**Etualan vaalea L-muotoinen tasanne näkyy molemmissa k5-paneeleissa.** En siksi vahvista koko tasanteen katoamista. T6/T7 ovat laajat tarkistusalueet, eivät varmennetun puuttuvan pinnan maskit. Mahdollinen harmaaksi muuttunut osa tulee kohdistaa lähdemalliin ennen korjausta. Säilytetään jo näkyvät vaaleat kivipinnat, reunat ja portaat; koko aluetta ei korvata oletuksen perusteella.

### 2. K3:n kaksi jäljelle jäävää ilmakuvapalaa

Pitkä kuvan alaosaan ulottuva kaistale ja sen oikeanpuoleinen pienempi pala näkyvät sekä V6:ssa että V7:ssä. Molemmat jäävät näkyviin myös 2_3:n piilotuksessa. Tämä on vahva visuaalinen paikannusnäyttö jäljelle jäävistä ilmakuvapinnoista. Kuvista ei päätellä kahden cut-osan välistä rakoa, tarkoituksellista reikää, tarkkaa maantieteellistä muotoa tai pohjois–eteläsuuntaa. Pohjois–etelä on vastaanottajan kuvaus, ei ruutupikseleistä johdettu ilmansuunta.

Parent tarkistaa 12 cut-osan lähdegeometrian ja sen, mitkä alueet on tarkoitettu omaksi pihaksi. Korjaustavoite on poistaa vahvistetulta pihalta nämä vieraat ilmakuvapinnat ilman uusia reikiä tai vallihaudan/tarkoituksellisten aukkojen vahinkoleikkausta. Alla olevat suorakulmiot ovat vain kuvakoordinaatteja; niitä ei muunnettaisi sellaisenaan cut-polygoneiksi. Pienempi pala jatkuu kuvan reunaan ja peittyy osin köyteen, joten koko kohteen muotoa ei näy.

### 3. Vanhan ja uuden kiveyksen pystyraja pilotin sisällä

Lähikuvan alaosassa, noin x = 520, suora raja erottaa tiheän, paikallisesti kontrastikkaamman vasemman pinnan suurempikuvioisesta ja pehmeämmästä oikeasta pinnasta. Rajan havaitsee normaalista etäisyydestäkin; pelkkä värin keskiarvon tasaus ei riitä, koska myös kivikuvion mittakaava ja terävyys vaihtuvat.

Riittävä paikallinen siirtymä sovittaa pilotin reunalla kiven koon, ladonnan suunnan, paikallisen keskisävyn ja saumakontrastin naapuriin. Ensimmäisenä kokeilualueena voi käyttää noin **6–12 näkyvän kivirivin** leveyttä vain pilotin sisäpuolella; tämä ei ole kuvasta mitattu metrileveys eikä pakollinen hyväksyntämitta. Rajan lähellä kivet ovat naapurin kanssa yhteensopivia, ja kohti sisäpihaa sävy-/kontrastivaihtelu lähestyy V7:n ilmettä. Kivien pitää säilyä kokonaisina ja uskottavan kokoisina: ei jatkuvaa UV-mittakaavan venytystä, päällekkäisiä saumoja tai kahden tekstuurin sumennettua sekoitusnauhaa.

Jos nykyinen, lähdemallissa vahvistettu arkkitehtoninen sauma tarjoaa luontevan materiaalinvaihdon, sitä voi käyttää kohdistukseen. Uutta kynnystä tai geometriarajaa ei keksitä tekstuurisauman peittämiseksi. Sisäpihan luettava V7-mosaiikki säilytetään. Tämä ei ole lupa naapuriruutujen tai koko kaupungin uudelleenteksturointiin.

## Natiivikuvien ROI-paikannukset

Kaikki koordinaatit ovat koko tiedoston vasemmasta yläkulmasta, nollapohjainen `[x0,y0,x1,y1)`. Parikuvat ovat 1804 × 1230 px: V6 vasemmalla, V7 oikealla. Lähikuva on 1000 × 1349 px ja koostuu kahdesta päällekkäisestä V7-näkymästä. Sen noin y = 933 vaakaliitos on kuvakoosteen raja, ei mallin sauma. Parien kohdistus on kontekstuaalinen, ei väite täydellisestä pikselirekisteröinnistä.

| ROI | Tiedosto | Alue | Havainto / käyttö |
|---|---|---|---|
| PAVE | `lahikuva-v7-kiveys-ja-raja.jpg` | `[200, 410, 770, 730]` | Luettavat pitkänomaiset kivet ja hillitty sävymosaiikki, yläkuva. |
| B-CONTEXT | `lahikuva-v7-kiveys-ja-raja.jpg` | `[285, 980, 810, 1235]` | Alaosan pystyraja suunnilleen x 520; vanha vasen, uusi oikea. Kuvien välisen y 933 vaakaliitoksen ei pidä tulkita olevan mallisauma. |
| B-OLD | `lahikuva-v7-kiveys-ja-raja.jpg` | `[300, 1000, 460, 1210]` | Tiheämpi, terävämpi ja paikallisesti kontrastikkaampi naapuripinta. |
| B-NEW | `lahikuva-v7-kiveys-ja-raja.jpg` | `[630, 1000, 800, 1210]` | Suurempana ja pehmeämpänä näkyvä, paikallisesti vaaleampi kuvio. |
| W6 | `pari-k5-matalavino-13.jpg` | `[270, 930, 720, 1020]` | Vallihaudan yhtenäinen tumma sinivihreä pinta. |
| W7 | `pari-k5-matalavino-13.jpg` | `[1174, 930, 1624, 1020]` | Saman etualan vallihaudan kuvallinen, juovikas ilmakuvavaikutelma. |
| T6 | `pari-k5-matalavino-13.jpg` | `[70, 640, 420, 925]` | Vaalean etualan tasanteen laaja konteksti; L-muotoinen rakenne näkyy. |
| T7 | `pari-k5-matalavino-13.jpg` | `[974, 640, 1324, 925]` | Vastaava tasannekonteksti; vaalea L-muotoinen rakenne näkyy myös tässä. Koko tasanteen katoamista ei vahvisteta. |
| CUT-L6 | `pari-k3-piha-13.jpg` | `[430, 535, 755, 1035]` | Pitkä kuvan alaosaan ulottuva ilmakuvakaistale; osittain puiden peittämä. |
| CUT-L7 | `pari-k3-piha-13.jpg` | `[1334, 535, 1659, 1035]` | Pitkän kaistaleen rajaus näkyvässä mallissa; vain ruutukoordinaatit. |
| CUT-L7-CONTEXT | `pari-k3-piha-13.jpg` | `[1295, 490, 1690, 1040]` | Kaistaleen ympäröivät puut, piha ja rakennusraja paikannusta varten. |
| CUT-S6 | `pari-k3-piha-13.jpg` | `[685, 490, 900, 605]` | Pienempi oikeanpuoleinen ilmakuvapala, osittain köyden/kuvareunan peittämä. |
| CUT-S7 | `pari-k3-piha-13.jpg` | `[1589, 490, 1804, 605]` | Pienempi pala, kuvareunaan ja köyteen rajautuva; ei koko maantieteellisen kohteen rajaus. |
| CUT-S7-CONTEXT | `pari-k3-piha-13.jpg` | `[1550, 450, 1804, 640]` | Pienemmän palan ja lähirakennusten konteksti. |
| HIDE-L6 | `pari-piilo23-k3-piha-13.jpg` | `[430, 535, 755, 1035]` | Pitkä pala säilyy mallin piilotuksessa. |
| HIDE-L7 | `pari-piilo23-k3-piha-13.jpg` | `[1334, 535, 1659, 1035]` | Pitkä pala säilyy; ympäröivä oma maa/rakennukset katoavat harmaaksi. |
| HIDE-S6 | `pari-piilo23-k3-piha-13.jpg` | `[685, 490, 900, 605]` | Pienempi pala säilyy piilotuksessa. |
| HIDE-S7 | `pari-piilo23-k3-piha-13.jpg` | `[1589, 490, 1804, 605]` | Pienempi pala säilyy piilotuksessa, osa peittyy köyteen. |

## V8:n ennen–jälkeen-pelitestin hyväksyntäkriteerit

- **A1:** V8:ssa oma vesipinta näkyy W7-alueella yhtenäisenä tarkoitettuun rantaan asti; V7:n ilmakuvatekstuuri ei peitä sitä eikä vuorottele sen kanssa kameraliikkeessä. V6 toimii ulkonäön vertailuna, ei todisteena teknisestä syystä.
- **A2:** Kohdista vastaanottajan tarkoittama tasanne actualGLB/pipeline-tietoon. Vahvistetun pinnan näkyvyys, vaalea kivimateriaali, reunat ja portaat säilyvät samassa kamerassa; koko näkyvää L-tasannetta ei käsitellä puuttuvana.
- **A3:** Kun lähdegeometria vahvistaa CUT-L7/CUT-S7-alueiden kuuluvan omaan pihaan, V8:n normaaliin k3-kuvaan ei jää niitä vastaavia ilmakuvakaistaleita eikä piilotuskuvaan uusia tahattomia ilmakuvareikiä. Tarkoitukselliset aukot ja vallihauta säilytetään lähdegeometrian mukaan.
- **A4:** K1:n normaalilla katseluetäisyydellä ei erotu suoraa pystyrajaa kiven koon, keskimääräisen sävyn tai kontrastin muutoksena. Lähikuvassa rajalla on yhteensopiva ladontamittakaava; ei kaksoissaumoja, venyneitä kiviä, sumennettua nauhaa tai ruutumaista häivytystä.
- **A5:** K2:n ja liuku2:n V7-tyyppinen kivien luettavuus ja hillitty mosaiikki säilyvät pilotin sisäosassa. Muutos ei tuo näkyvää suurta toistoruutua tai uusia poikkeavia väriläiskiä.
- **A6:** V6/V7-korjatun lähdevertailun ja V8:n samat k1–k5-kamerat, lähikuva, 13/18-valot ja vastaavat piilotuskokeet; paikallinen maan/veden näkyvyys varmistetaan. Klo18 molempien tummaa valaistusta ei kompensoida globaalilla albedon nostolla.
- **A7:** Liukujen ajallinen välke, LOD-vaihdot sekä ruutuaika ja muisti mitataan erikseen; nämä kahdeksan stilliä eivät läpäise niitä. Fyysisen laitteen ja omistajan hyväksyntä erikseen.
- **A8:** V8 vain #361:n vesi-, raja- ja cut-korjaukset. Ei #362 roof/red C3:n sekoitusta, ei koko kaupungin teksturointia; pilotin ulkopuoliset vertailupinnat säilyvät.

## Toimitusraja ja hyväksyntätila

V8 varataan **vain #361:n veden, kiveysrajan ja cut-alueiden korjauksille**. #362 roof/red C3 pysyy toimeksiannon mukaan erillisenä toimittamattomana prototyyppinä. Sitä ei ole arvioitu tässä eikä se tule V8:aan. Aiempi kosmeettista muutosta koskeva Astra-arvio säilyy historiallisena; sitä ei laajenneta C3:n hyväksynnäksi.

Tämä arvio ei ole lopullinen kiveys-, vesi-, peli-, liike-, LOD-, suorituskyky-, fyysisen laitteen, omistajan tai julkaisun hyväksyntä. Vastaanottajan ilmoittama hyväksyttävä pakettikoon kasvu ei ratkaise näitä kohtia. Kirjoitettu vain tämä uusi MD/JSON-pari, aiempia raportteja muuttamatta. Ei Blenderiä, generointia, kuvanmuokkausta, assetti-/generaattori-/Git-/Unity-muutoksia, delegointia tai vastaanottajaviestejä.

## Kahdeksan tarkistetun kuvan polut ja hajautukset

Kuvajuuri: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/model-loop-owner-20261015/task361-362-work/incoming/v7-corrected-game-review-20261016`. JSONissa jokaisen tiedoston absoluuttinen polku, mitat ja kuittivertailu.

| Tiedosto | SHA-256 |
|---|---|
| `lahikuva-v7-kiveys-ja-raja.jpg` | `af28891c73d2276a5b674f0d12d4fbe92483d9b6cdb7e840e15a8d3d84f7010c` |
| `pari-k1-taihedian-13.jpg` | `2de39f3cff6fda740a6a64f739e9b021a2d4004c4c14c5adad691490beab8cd6` |
| `pari-k1-taihedian-18.jpg` | `409fb9bd366824e4ca86384d1fb174f750a546dfdc6623c6f189a26538fadccb` |
| `pari-k2-terassinjalka-13.jpg` | `951e87c4e4fa9f3fd234a4a6d8f2b6f03c0d9f7e7bd8c2ffdac40ae8ef7c3f68` |
| `pari-k3-piha-13.jpg` | `93776c2f787f10f8595882da093c00a5420f16af3b566e8562839bac36e9e817` |
| `pari-k5-matalavino-13.jpg` | `72bd2ad1073d12c74d360794e1dcff11dd0cb712c7750dbf1a34e0fb272a86f1` |
| `pari-liuku2-13.jpg` | `73a39d9267a0b46419c8a9285f3ac74383d755bb97a3958a58d2257cac06324e` |
| `pari-piilo23-k3-piha-13.jpg` | `396a9b3e19591a02f9d4ac2df8cdeb7a5268776d9d9723f94f63c59ce8ac4aad` |
