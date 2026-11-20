# K-4 erä 2: Pariisin 13 noston kuvat (4 kadonnutta, 9 tarinapaikkaa) (SK 20.11.2026, KK:n päätös 11.42)

Haara `sk/k4-era2-kuvat` (pohjana erä 1 korjauksineen + origin/main: K-3, nostokuva.mjs --osuus), draft-PR, EI mainiin ennen KK:n sanaa. Kuvia ei ole ladattu ämpäriin: vientikuvat ovat kansiossa `/Users/Shared/Claude/luovutukset/sk-k4-era2/_ampari/` (osoitteet `https://media.matkakirja.app/kuvat/<nimi>.jpg`; Galerie des Machinesin ihmekuva `…/kohtaamiset/ihmeet/ihme-galerie-des-machines-loistoaika-3x2.jpg`), lähteet ja tarkistussummat `_vientipaketti/` (LAHTEET.md, SHA256SUMS). Kuvatyö tehtiin Sonnet-apulaisilla nostoittain; erä 2 = B (4 kadonnutta, hahmotelma-*; data `js/packs/monumentit-eurooppa.js`) ja D (9 tarinapaikkaa; `js/packs/fokusvirta-pariisi.js`, `skandaalit.js`, `nahtavyysjutut.js`).

## 1. M2: rikkeet ennen | nyt (13 noston osalta)

- **Ennen** (lähtöluettelo): 13 nostoa rikkoo; vajaa 13, viimeinen 13, laji 9, tekijä 13, lisenssi 6, mitat 13, havainnekuvan lähderivi 5 (B:n neljällä vain yksi kuva ihmekuvana, D:llä 1–2 vanhaa kuvaa).
- **Nyt:** 0 nostoa rikkoo. Kolmella nostolla on 3 kuvaa + 1 tilattu (temple-torni, kirahvi-1827, vrain-lucas), joten 3 kuvaa riittää eikä `vajaa` laukea; Codex-kuvat tulevat neljänneksi. Lähtöluettelo 35 → 22 rikkovaa nostoa (`docs/raportit/pariisin-nostokuvat-rikkeet-lahto-20261120.json`); lisäksi C:n Notre-Dame-juttu parani (ks. kohta 4.1) ja vain `vajaa` jäi.
- **Kaksoiskuvat korjattu** (nostokuvat = noston omat + paikan + jutun kuvat, sama osoite kerran): (a) B:n kolmella (Grand Châtelet, Temple-torni, Trocadéro) vanha Codex-ihmekuva olisi ollut 5. kuva: `ihme.osoite` osoittaa nyt noston J1:n aitoon kuvaan (sama URL; `ihmeKohde`-apuun uusi `ihmeJaksokuva`, tiedot jaksokuvat-lohkosta). Vanhat ihmekuvat jäävät palvelimelle. (b) D:n nähtävyysjuttujen vanhat `kuvat` (Bizet, Kirahvi, Bukinistit, Patonki, Monet, Piiritys, Piaf) vaihdettu samoiksi kuin noston lista; Notre-Dame ja Vrain-Lucas olivat jo.
- **Koodimuutos:** `js/fokuskohteet.js` `kohteenIhmekuva` välittää ihmeen `laji`, `tekija`, `lisenssi` ja mitat, ja `ihmekuva`-lippu (rekonstruktion selite "Mihin ihmeen kuva perustuu?") on päällä vain havainnekuvalla, ei aidolla kuvalla.
- **Testit:** täysi suite 5 991 testiä, 0 kaatuu. Päivitetyt: `tests/fokusvirta.test.mjs` (ämpäri-URL-osoite kelpaa kuvalle eikä sitä haeta levyltä; kakkoskuvan vertailu `tiedosto ?? osoite`; ihmeen aito kuva: tekijä + lisenssi + Commons/Paris Musées -lähde, ämpärin `kuvat/`-kansio sallittu), tasalaatu-lähtöluettelo pienennetty. `lahdeUrl` lisätty Vrain-Lucasin kolmelle kuvalle (skandaalitesti vaatii).

## 2. Kuvien tila nostoittain

| Nosto | Pidetään | Haettu | Tilattu | Kuvia datassa |
|---|---:|---:|---:|---:|
| grand-chatelet | 0 | 4 | 0 | 4 |
| temple-torni | 0 | 3 | 1 | 3 |
| trocadero | 0 | 4 | 0 | 4 |
| galerie-des-machines | 1 | 3 | 0 | 4 |
| bizet-1875 | 0 | 3 | 0 | 3 |
| kirahvi-1827 | 0 | 3 | 1 | 3 |
| bukinistit-1859 | 0 | 4 | 0 | 4 |
| patonki-1994 | 0 | 3 | 0 | 3 |
| vrain-lucas | 0 | 3 | 1 | 3 |
| monet-1874 | 1 | 3 | 0 | 4 |
| piiritys-1870 | 1 | 3 | 0 | 4 |
| notre-dame-2019 | 0 | 4 | 0 | 4 |
| piaf-django | 0 | 4 | 0 | 4 |
| **yhteensä** | 3 | 44 | 3 | 47 |

## 3. M-rivit

- **M1 silmin:** luku 5 (jakso | kertoja sanoo | kuva | laji | lähde, tekijä, lisenssi, linkki | tila, nostoittain) ja 13 kontaktiarkkia `docs/raportit/k4-era2-kontaktiarkit/<nosto>.jpg` (soikea reuna beigellä pohjalla, 1000 px leveä; tilattu kuva = tyhjä laatta).
- **M2:** luku 1.
- **M3:** jokaisen haetun kuvan lisenssi ja tekijä luettu Commonsin rajapinnasta `tools/hae-commons.mjs`-työkalulla (pyynnöt peräkkäin), kuva katsottu silmin, rajattujen lähderivi päättyy "rajattu"; linkit luvussa 5 ja `_vientipaketti/LAHTEET.md`.
- **M4:** Codexin tilauslista omana tiedostonaan: `docs/raportit/pariisi-nostojen-kuvat-era2-codex-tilauslista-20261120.md` (3 pakollista: Kirahvi kävelykuva, Temple-torni J3–4, Vrain-Lucas J2; Piirityksen viestilevy VALINNAINEN). Tilauksia ei ole lähetetty (K-5).
- **M5:** jokaisen noston viimeinen kuva on valokuva, havainnekuvan lähderivi alkaa "Tekoälyllä tuotettu havainnekuva", laji-kenttä jokaisella kuvalla (tasalaatutesti). Laji-kentät: "maalaus (valokuvavedos)" → maalaus, "käsikirjoitus (väärennös)" → valokuva.
- **M6:** jokaisesta tilauksesta rivi "aidot ehdokkaat ja miksi eivät kelpaa" `TILAUKSET.md`-lohkossa (tilauslistassa) ja luvussa 5.
- **M7:** yksikään kuvateksti ei paljasta visan vastausta; vanhat D-kuvien `lyhyt`/`selite`, jotka vuotivat vastauksen (Notre-Dame: kukko lommoilla; Piaf: varpunen), poistuivat; uudet kuvatekstit kuvaavat kuvan. Rajatapaukset luvussa 4. Pulun kysymykset ennallaan; vanhoja kuvia ei poistettu palvelimelta.

## 4. Avoimet kohdat KK:lle (ei tekstimuutoksia omin päin)

1. **Notre-Dame (C-juttu):** kohdekartan Notre-Dame-kohde linkittää `nosto-notre-damen-kukko`-nostoon, joten C-juttu "Notre-Dame" tuo oman kuvansa D-noston 5. kuvaksi. Ratkaisu tässä erässä: C-jutun ainoa kuva (2017, Ali Sabbagh, ei tekijä/lisenssi/mitat -kenttiä) vaihdettu D-noston viimeiseen aitoon nykykuvaan (Chabe01, CC BY-SA 4.0), ja se dedupataan. C-jutun oma kuvasarja (1 kuva, `vajaa`) jää C-erälle; sama linkitys tulee vastaan muissakin C-jutuissa, jotka karttakohteen kautta tuovat kuvansa nostoon.
2. **Ämpäri:** 47 uutta kuvaa (94 tiedostoa, 1200 × 800 + 2048) vietävä ämpäriin ennen PR:n yhdistämistä; Galerie des Machinesin `ihme-…-3x2.jpg` menee kansioon `kohtaamiset/ihmeet/`, muut `kuvat/`.
3. **B:n ihmekuvat:** Grand Châtelet, Temple-torni ja Trocadéro: ihmeen kuva on nyt noston J1:n aito piirros/kaiverrus (Nousveaux-litografia, Pernot-piirros, Trichon-kaiverrus), ei enää Codex-rekonstruktio; ihmenauhan "kadonnut"-merkintä säilyy. Jos halutaan Codex-ihme takaisin ensimmäiseksi, nosto saa 5 kuvaa.
4. **Visa- ja rajatapaukset:** Grand Châtelet J5 yökuva (aukio ja palmusuihkulähde näkyvät vasta jaksolla 5, jossa visan vastaus kerrotaan; kuvateksti ei nimeä aukiota), J4 jälkikäteinen Hoffbauer-litografia, J1 1800-luvun käsitys linnakkeesta · Temple J1 tornin kärki n. 4 pr-yks. häivytyksessä, J2 hahmot häivytyksessä, J5 ei kaupungintaloa, J3–4 tilattu · Trocadéro J4 yötyömaa 1936 (ei palatsia), J5 Lyonin urut (ei Chaillot'ta; sali 1975 oikeus tarkistamatta) · Galerie J3 hevosnäyttely 1908 (ei sirkusta), J4 halli ennen purkua · Bizet J1 rakennus 15–92 %, J2 pystykuvan rintakuva · Kirahvi J2 tilattu (nykyinen havainnekuva 1024 × 683 ja kasvot), viuhka reunat häipyvät · Bukinistit: kuvat 1–2 Pont Neuf -maalauksia, ei bukinistipääaihe · Patonki J2 raadin jäsenen kasvot puolilähikuvana (personality rights -varoitus), J3 Élysée-puutarhajulkisivu · Vrain-Lucas J1 asiakirja täyttää kehyksen, J2 tilattu · Monet J1 Bazille-ateljee (alastonkuvia maalauksessa, 13+), J2 Nadar-julkisivun jalat leikkautuvat, J4 Marmottan · Piiritys J3 viestilevy täyttää kehyksen, ilmapallokuvan yläosa leikattu · Notre-Dame palokuva jalat 80–85 %, kappaleen 1 kattotuolit ja kappaleen 3 uusi kukko ilman kuvaa · Piaf ja Django: Djangoa ei kuvissa, J2 vaunuhetki ei valokuvattu (Codex-vaihtoehto), viimeinen kuva liittyy kappaleeseen 1.
5. **F (6 historian hetkeä)** (curie, lavoisier, pasteur, eiffel, bastilji, lumière) ei kuulu millekään erälle; rikeluettelon f:-rivit odottavat KK:n päätöstä. C (14 nähtävyysjuttua) on erä 3.
6. **Haara:** `sk/k4-era2-kuvat` on erän 1 päällä (kärki-sha PALAUTUS-rivissä); PR vasta KK:n sanalla, yhtä aikaa erän 1, PR 7223:n ja K-1:n kanssa.

## 5. Kuvat nostoittain (jakso | kertoja sanoo | kuva | laji | lähde | tila)

### hahmotelma-grand-chatelet: kuvatyö (K-4 erä 2)

Kaikki neljä kuvaa ovat aitoja (piirros/kaiverrus/valokuva) Wikimedia Commonsista; ei tilauksia. Mitat: kaikki 1200 x 800 (+ suurennos). Paikkamitat on arvioitu esikatselukuvista (soikea reuna), ei pikselimitattu.

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Grand Châtelet oli Pariisin vankila- ja oikeuslinnake Seinen oikealla rannalla. Ludvig VI rakennutti sen kiveksi 1100-luvulla, ja kun kaupungin ympärille alettiin rakentaa muuria vuonna 1190, siitä tuli prévôtin eli kuninkaan virkamiehen pääpaikka. | linnake (hahmotelma-grand-chatelet-linnake.jpg) | piirros (litografia) | Edouard Auguste Nousveaux, Musée Carnavalet / Paris Musées, Wikimedia Commons, CC0; https://commons.wikimedia.org/wiki/File:Le_Vieux_Paris_N%C2%B011_Le_Grand_Ch%C3%A2telet._G.38999_(1_of_2)_(cropped).jpg | haettu |
| 2-3 | Vankeina olivat François Villon, Molière velkojen takia vuonna 1645 ja rosvopäällikkö Cartouche vuonna 1721. Linnakkeen kuoppasolu, la Fosse, kapeni alaspäin kuin kartio, eikä vanki voinut seistä eikä maata kunnolla. / Linnakkeessa oli myös ruumishuone, ranskaksi morgue. Sanan sanotaan syntyneen täällä: vartijat tuijottivat uutta vankia pitkään painaakseen hänen kasvonsa mieleen, jos hän pakenisi. Myöhemmin tänne tuotiin tunnistettavaksi löydetyt vainajat. | vankila (hahmotelma-grand-chatelet-vankila.jpg) | piirros (akvarelli) | Auguste-Sébastien Bénard, Musée Carnavalet / Paris Musées, Wikimedia Commons, CC0; https://commons.wikimedia.org/wiki/File:Le_Grand_Ch%C3%A2telet_du_XVIII%C3%A8me_si%C3%A8cle._D.85.jpg | haettu |
| 4 | Syyskuun alussa 1792 joukko tunkeutui linnakkeeseen ja surmasi vankeja, ja vankila hylättiin. Linnakkeen purku alkoi vuonna 1802. | purku (hahmotelma-grand-chatelet-purku.jpg) | piirros (jälkikäteinen litografia) | Theodor Josef Hubert Hoffbauer, Wikimedia Commons, Public domain; https://commons.wikimedia.org/wiki/File:D%C3%A9molition_du_Ch%C3%A2telet,_an_10.jpg | haettu |
| 5 | Paikalle tehtiin uusi Place du Châtelet. Napoleon tilasi sinne vuonna 1806 palmusuihkulähteen voitonmuistomerkiksi. Fontaine du Palmier seisoo aukiolla yhä. | nykyinen (hahmotelma-grand-chatelet-nykyinen.jpg) | valokuva | Dimitri Destugues, Wikimedia Commons, CC BY-SA 3.0; https://commons.wikimedia.org/wiki/File:Place_du_Ch%C3%A2telet_Panorama.jpg | haettu |

Yhteensä: 4 haettu, 0 tilattu, 0 pidetään.

#### Perustelut ja paikkamitat

- Jakso 1 linnake: Nousveaux'n litografia, Commonsin valmis "cropped"-versio (2936 x 1853), rajaus 2780 x 1853. Linnake 28-80 % leveydestä ja 10-83 % korkeudesta, keskellä; tornien kärjet 10-16 %:ssa (muutama prosenttiyksikkö häivytyksessä). Ei tekstiä, ei kehystä. Ei visa-vastauksia.
- Jakso 2-3 vankila: Bénardin väripiirros 1700-luvun Châtelet'sta kärryineen ja kauppiaineen (kuvaa arkea portin edessä; ei la Fosseä eikä tuijotusta, jotka olisivat visan vastauksia). Esirajattu paperireunasta. Linnake 14-75 % leveydestä, 11-78 % korkeudesta.
- Jakso 4 purku: Hoffbauerin litografia purkutyömaasta (rauniot, telineet, työmiehet). Rajatapaus: jälkikäteinen kuva (1800-luvun loppu), kuvateksti ei väitä aikalaiskuvaksi. Rauniot keskellä 25-85 % leveydestä. Jakson ensimmäinen virke (1792) ei saa kuvaa; Commonsin 1792-estampit (verilöyly) jätettiin tarkoituksella pois (veri).
- Jakso 5 nykyinen: Destuguesin yöpanoraama, rajattu keskikohdasta 0,47; pylväs (Fontaine du Palmier) keskellä, vasemmalla Théâtre du Châtelet'n kulma. Rajatapaus: yökuva, paljon tummaa taivasta.

#### Hylätty

- Nykyinen J1 `loisto` (Matkakirjan havainnekuva, 1536 x 1024, 3:2 jo, ei rajausvaraa): vasemman tornin kärki 3 % ja rakennus jatkuu oikean reunan häivytykseen (n. 90 %); linnake ei mahdu 75 % x 75 %:n keskialueelle. Ei pidetä.
- Nykyinen `kuvat[0]` (Silvestre G.283): kaiverrettu kuvateksti ja museonumero alareunassa (suunnitelman havainto); ei tarvittu.
- Päivänäkymät nykyhetkestä: Tour Saint-Jacquesin/ylhäältä otettu (pylväs pieni, taustalla Tour Montparnasse), patsaan lähikuva taivasta vasten (Pug Girl), työmaa-aidan peittämä aukio (mertxe iturrioz). Yökuva jäi parhaaksi.
- Katsottu mutta ei valittu (varalla Commonsissa, CC0): Bénard D.50 "Un jour de Carnaval", Pernot D.6597 "Restes du Grand Châtelet pendant la démolition", Destours btv1b10302717c (purkupiirros, PD).

#### Avoimet kysymykset KK:lle

1. VISA: "Mitä Grand Châtelet'n paikalla on?" - vastaus on Place du Châtelet ja palmusuihkulähde; J5-kuva näyttää juuri tämän, mutta vasta jaksolla 5, jossa vastaus kerrotaan. Kuvateksti ei nimeä aukiota. Jos kuva näkyy ennen vastausta, vaihda kuvaksi toinen nykyvalokuva.
2. Jakson 4 kuva on jälkikäteinen (Hoffbauer); aikalaisia purkukuvia on Commonsissa (Pernot D.6597, Destours) mutta ne eivät olleet yhtä selkeitä. Voin vaihtaa.
3. Jakson 2-3 kuva (Bénard) esittää Châtelet'ta 1700-luvun asussa (tuotettu 1810) eikä näytä vankeja, la Fosseä tai morgue-hetkeä; kuva kattaa jaksot vain tunnelmallisesti.
4. Jakson 1 kuva kuvaa 1800-luvun käsitystä keskiaikaisesta linnakkeesta, ei 1100-lukua; sama pätee kaikkiin saatavilla oleviin.

### hahmotelma-temple-torni: kuvatyö (K-4 erä 2)

3 kuvaa aitoja Commonsista, 1 tilattu (jakso 3-4). Kaikki 1200 x 800 (+ suurennos). Paikkamitat arvioitu esikatselukuvista.

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Temple-torni kohosi temppeliritarien Pariisin päämajan linnoituksessa. Philippe Augusten ajoista kuninkaan aarre talletettiin ritarien linnoitukseen, ja sen muurien suojaan hakeutui myöhemmin Pariisin veroista vapaita käsityöläisiä. | linnoitus (hahmotelma-temple-torni-linnoitus.jpg) | piirros (lyijykynä) | François Alexandre Pernot, Musée Carnavalet / Paris Musées, Wikimedia Commons, CC0; https://commons.wikimedia.org/wiki/File:Le_Temple._D.6645.jpg | haettu |
| 2 | Elokuussa 1792 kuningasperhe vietiin Templeen vangiksi. Ludvig XVI vietiin sieltä giljotiinille, ja hänen poikansa Ludvig XVII kuoli Templessä vuonna 1795. | vangiksi (hahmotelma-temple-torni-vangiksi.jpg) | piirros (aikalaiskaiverrus 1792) | Swebach-Desfontaines / Berthault, Musée Carnavalet / Paris Musées, Wikimedia Commons, CC0; https://commons.wikimedia.org/wiki/File:R%C3%A9volution_fran%C3%A7aise_journ%C3%A9e_du_13_ao%C3%BBt_1792._Translation_de_Louis_XVI_et_de_la_famille_royale_au_Temple._Rue_du_Templ,_G.28549.jpg | haettu |
| 3-4 | Vuonna 1798 brittiamiraali Sidney Smith pakeni Templen vankilasta väärennetyillä siirtomääräyksillä: häntä oltiin muka viemässä toiseen vankilaan. Huhtikuussa 1804 kenraali Pichegru löydettiin kuolleena Templen vankilan sellistään. / Napoleon määräsi tornin purettavaksi vuonna 1808, koska halusi lopettaa rojalistien pyhiinvaellukset paikalle, jossa kuningasperhe oli ollut vankina. | kadonnut (ei kuvaa vielä) | havainnekuva | Matkakirjan oma (tilaus, ks. TILAUKSET.md 1) | tilattu |
| 5 | Tornista ei ole jäänyt mitään. Sen paikan vieressä on nykyisin Square du Temple -puisto, ja Rue Eugène-Spullerilla seisoo kaupunginosan kaupungintalo. | nykyinen (hahmotelma-temple-torni-nykyinen.jpg) | valokuva | Guilhem Vellut, Wikimedia Commons, CC BY 2.0; https://commons.wikimedia.org/wiki/File:Square_du_Temple_@_Paris_(27638104980).jpg | haettu |

Yhteensä: 3 haettu, 1 tilattu, 0 pidetään.

#### Perustelut ja paikkamitat

- J1 linnoitus: Pernotin lyijykynäpiirros (Le vieux Paris -sarja, 1800-luku) esittää Templen tornin kehämuurin sisällä. Esirajattu (pahvikehys, käsin kirjoitettu "Nº 26"/"le Temple", museonumerot pois). Torni 53-64 % leveydestä ja 8-47 % korkeudesta; kärki ja lippu 8 %:ssa eli n. 4 prosenttiyksikköä häivytyksessä; koko linnoitus 3-97 % leveydestä. Rajatapaus: vaalea, matalakontrastinen piirros.
- J2 vangiksi: aikalaiskaiverrus kuningasperheen saatosta Templeen 13.8.1792; taustalla pieni Temple-torni (huippu 29 % korkeudesta). Esirajattu (kuvateksti ja paperireuna pois). Rajatapaus: pääaihe (vaunut, saattue) on kuvan alaosassa, jalat/etualan hahmot 85-100 %:ssa (häivytys); kaivertajan pieni nimi jää alakulmaan. Kasvot pieniä.
- J3-4: ei hyvää aitoa vaakakuvaa (ks. hylätyt) -> tilaus, ks. TILAUKSET.md. Kuva näytetään jaksosta 3 alkaen, joten tilaus ei saa näyttää purkua eikä pyhiinvaeltajia (jakso 4) eikä Smithin pakotapaa (jakso 3 / visa).
- J5 nykyinen: Square du Temple -puiston lampi ja vesiputous (kallio on 1850-luvun puiston osa). Rajatapaus: ei Temple-viitettä eikä kaupungintaloa kuvassa; ainoa muu kuva, jossa kaupungintalo näkyy (Mbzt, CC BY-SA 4.0, mustavalko, 2500 x 2013), ei mahdu 3:2-rajaukseen (katto ja portti leikkautuvat).

#### Hylätty (aidot ehdokkaat ja miksi eivät kelpaa)

- J1 `loisto` (Matkakirjan havainnekuva, 1536 x 1024): tornin kärki 1 % (yläreunassa), kaksi kasvoa lähikuvana (kauppiaat etualalla), joten ei pidetä (KK:n sääntö 3).
- Hoffbauer D.7933 "Le Temple en 1450" (CC0): torni oikeassa reunassa 77-90 % (3:2-rajauksen jälkeen), ulkona 75 %:sta. Hoffbauer D.5832 "L'enclos du Temple vers 1450": tornin kärki 3-5 % korkeudesta ja paperi/numero- ja signeeraus-reuna.
- "Le Temple à Paris bastiment ancien des templiers" (CC0): torni jakson aikaa vastaava, mutta otsikkopalkki ja käsinkirjoitus leikkaavat tornin kärjen; esirajaus ei pelasta.
- "Tour du Temple circa 1795" (maalaus, PD, 3000 x 2334): torni oikeassa reunassa 47-95 % ja kärki yläreunassa, puukehys ylhäällä.
- Pystykuvat, joissa torni ei mahdu 3:2-vaakaan: Auvray D.6164 (3450 x 4706), Larbalestier "Le donjon du Temple" (painos on pieni pystykuva paperilla), "Tour du Temple" -litografia (Paris Musées 20231021232546, pieni kuva 2054 x 3000 paperilla), "La famille royale dans le jardin du Temple" G.23066, Guyot G.4113, Pernot D.6580.
- Vieux Paris -litografia "Le Temple" (soikio, lumi ja yö, 3000 x 2385): soikion sisään sopiva 3:2-suorakulmio leikkaa tornin ristin; tekstit kuvassa.
- D.5171 "Le Temple" (sepia): esittää kirkkoa, ei tornia; pahvikehys.
- Nykykuvissa Square du Temple DSC 7894 (kyltin teksti, henkilö selin), Guilhem Vellutin muut puistokuvat (kyltti, kasvit, kioski) eivät sopineet.
- Pichegru-kuvat (itsemurha): vain pystykuvia ja aihe on liian synkkä kuvaksi; Sidney Smith -kuvia Commonsista ei löytynyt.
- Purkukuvaa tornista 1808 ei löytynyt Commonsista haulla "démolition tour du Temple" eikä Tour du Temple (Paris) -luokasta.

#### Avoimet kysymykset KK:lle

1. VISA: (a) "Miksi Napoleon määräsi tornin purettavaksi?" vastaus jaksolla 4 (pyhiinvaellukset); jakson 3-4 kuva ei saa näyttää purkua tai pyhiinvaeltajia. (b) "Miten Sidney Smith pakeni?" vastaus jaksolla 3 (väärennetyt siirtomääräykset); tilaus ei näytä sitä. (c) "Mitä Temple-tornin paikalla on?" vastaus jaksolla 5 (puisto, kaupungintalo); J5-kuvateksti ei nimeä puistoa.
2. Jakson 3-4 kuva on kahden jakson yhteinen: jos haluat erottaa jakson 4 (purku 1808), tarvitaan toinen tilaus; aitoa purkukuvaa ei löytynyt.
3. J5-kuvassa ei näy kaupungintaloa, vaikka teksti mainitsee sen; vaihtoehtona kaupungintalon valokuva, joka ei rajaudu hyvin.
4. Jakson 1 kuva on jälkikäteinen (1800-luku) piirros kuvitelmasta; jakson 2 kuva on aikalaiskaiverrus.

### hahmotelma-trocadero: kuvatyö (K-4 erä 2, B-ryhmä)

Data: js/packs/monumentit-eurooppa.js (id trocadero, 5 jaksoa, `jaksokuvat.loisto`). Ei `visa`-kenttää; kysymykset: "Mitä Trocadéron palatsista jäi pystyyn?", "Miksi palatsi purettiin 1935?", "Minne Trocadéron urut päätyivät?" (vastaukset jaksoissa 4 ja 5; kuvat näyttävät vain saman jakson asian, kuvatekstit eivät mainitse siipiä eivätkä Lyonia ennen jaksoa 5).

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Trocadéron palatsi rakennettiin vuoden 1878 maailmannäyttelyä varten Seinen pohjoisrannalle. Siinä oli kaksi korkeaa tornia, kaksi suurta siipeä ja yli neljän tuhannen paikan sali. | hahmotelma-trocadero-kaiverrus1878.jpg: palatsi tornineen | piirros (kaiverrus) | Trichon, Public domain, rajattu; https://commons.wikimedia.org/wiki/File:Le_palais_du_Trocad%C3%A9ro,_1878.jpg | haettu (korvaa loisto) |
| 2-3 | Salin Cavaillé-Collin urut vihittiin elokuussa 1878, ja César Franck sävelsi niille kolmen kappaleen sarjan Trois Pièces. / Palatsiin kuului myös etnografinen museo, joka syntyi vuoden 1878 näyttelystä ja avattiin yleisölle vuonna 1882. 1920-luvulla museo oli päässyt rappiolle. | hahmotelma-trocadero-sali.jpg: suuri sali ja urut | valokuva | Tuntematon (Roger-Viollet), Public domain, rajattu; https://commons.wikimedia.org/wiki/File:Palais_du_Trocadero_Salle.jpg | haettu (museo ei näy) |
| 4 | Vuonna 1935 alkoi palatsin purku vuoden 1937 näyttelyn tieltä, ja siivet jäivät uuden Chaillot'n palatsin osiksi. | hahmotelma-trocadero-purku.jpg: yötyötä purkutyömaalla 1936 | valokuva | Agence Meurisse (Gallica), Public domain, esirajattu ja rajattu; https://commons.wikimedia.org/wiki/File:D%C3%A9molition_du_Trocad%C3%A9ro_-_travaux_de_nuit_-_btv1b9027993s.jpg | haettu (rajatapaus) |
| 5 | Chaillot'n palatsissa YK:n yleiskokous hyväksyi vuonna 1948 ihmisoikeuksien yleismaailmallisen julistuksen. Trocadéron urut soivat nykyisin Lyonissa, jonne ne siirrettiin vuonna 1977. | hahmotelma-trocadero-nykyinen.jpg: urut Lyonin Auditoriumissa | valokuva | Erclairbair, CC BY-SA 4.0, rajattu; https://commons.wikimedia.org/wiki/File:Orgue_auditorium_lyon.jpg | haettu (rajatapaus) |

Yhteensä: 4 haettu, 0 pidetään, 0 tilattu. Ei TILAUKSET.md:tä.

#### Perustelut

- Jakso 1: nykyinen `loisto` (havainnekuva 1536 x 1024) ei kelpaa: sivusiivet ulottuvat kuvan molempiin reunoihin (3–96 % leveydestä), tornien kärjet ovat 5 % korkeudessa eli häivytyksessä, ja etualan perhe (nainen, mies, lapsi) on puolilähikuvana sivuprofiilissa (sääntö 3). Lähde on jo 3:2, joten lisätilaa ei voi rajata. Trichonin kaiverrus (Commons 3121 x 2285) näyttää juuri jakson: kaksi tornia, kaksi siipeä ja keskisali; päärakennus 15–85 % x 12–82 %. Palatsin matalat siivet jatkuvat reunoille mutta ne ovat sivuosaa.
- Jakso 2-3: valokuva Grande Salle -salista ja Cavaillé-Collin uruista (Roger-Viollet). Urkufasadi keskellä 40–62 % x 42–73 %. Museota (jakso 3) ei saatu: etnografisen museon sisäkuvia ei Commonsista löytynyt vaakana vapaana; Agence Rol 1933 (Labouret) on pystykuvia ja ihmisiä (kasvot, objektit). Jakso 3 jää siis kuvittamatta; jos KK haluaa museokuvan, se on tilaus (ei tehty).
- Jakso 4: Meurisse helmikuu 1936 "Démolition du Trocadéro - travaux de nuit" (Gallica, PD France). Ainoat vapaat purkuvalokuvat. Valittu 993s: kaksi työmiestä paineilmavasaroin ja höyrylapio, työmaa yöllä. Jalat 87–90 % (häivytysrajalla). Kuva ei näytä palatsia, torneja eikä siipiä; se näyttää purkutyömaan, ja sellaisena se on rehellinen jaksolle 4 (purku alkoi). Päivän valoisaa purkukuvaa tornien kaatumisesta ei löytynyt.
- Jakso 5: Palais de Chaillot jätetty pois (suojattu, oikeudet tarkistamatta). Valittu sen sijaan Trocadéron urut nykyisessä paikassaan Lyonin Auditorium Maurice-Ravelissa (jakson toinen lause). Kuva KORVAA Chaillot-kuvan: jakson ensimmäinen lause (YK 1948 Chaillot'ssa) jää ilman kuvaa. Urkufasadi 16–80 % x 27–70 %, keskellä.

#### Hylätty

- Meurisse 9027986n: negatiivin teksti kuvassa, työmies oikeassa reunassa (69–86 %), liian tumma; 9027990j: mies oikeassa reunassa ja kuorma-auto; 9027988g: höyrylapio ja kallio, ei ihmisiä, teksti. Vain 993s oli keskitetty.
- Dalbéra "La salle de spectacle du Palais du Trocadéro en 1878": CC BY 2.0, mutta kuva on pienoismalli (Cité de l'architecture), ei sali.
- Rijksmuseum CC0 -valokuvat 1878 (RP-F-F109xx, noin 2:1): mahdollisia vaihtoehtoja jaksolle 1, mutta 3:2-rajaus leikkaa siivet, ja kaiverros näyttää kaikki rakennuksen osat; ei katsottu tarkemmin.
- Auditorium de Lyon muut kuvat (Romainbehar CC0 -sarja ja Delamarche CC BY-SA 3.0): konsolit ja konsertit, hahmoja kuvassa; Erclairbair paras.
- Palais de Chaillot -kuvat (Fred Romero ym.): sääntö, ei käytetty.

#### Avoimet kysymykset KK:lle

1. Jakso 5: onko Lyonin urkujen kuva riittävä Chaillot-lauseen sijaan, vai tilataanko/haetaanko myöhemmin Chaillot (oikeudet)? Lisäksi auditorion sisätilan tekijänoikeus (rakennus 1975, arkkitehti Henri Pottier) on tarkistamatta; kuva on urkujen, ei salin kuva.
2. Jakso 4: kuva on yötyömaa 1936, ei tornien purku; tekstiä ei muuteta, mutta kuvateksti on "Yötyötä Trocadéron purkutyömaalla, helmikuu 1936" (vuosi 1936 vs. tekstin 1935 on kuvan päiväys, ei ristiriita).
3. Roger-Viollet-sali (jakso 2-3): kuvauspäivä tuntematon, Commonsin lisenssi PD Old / tekijä tuntematon; vanhin kopio oikeuksien kannalta Commonsin merkinnän varassa.
4. Jakson 3 museo jää kuvittamatta (ks. perustelut).

### hahmotelma-galerie-des-machines: kuvatyö (K-4 erä 2, B-ryhmä)

Data: js/packs/monumentit-eurooppa.js (id galerie-des-machines, 5 jaksoa, `jaksokuvat.loisto`). Ei `visa`-kenttää; kysymys "Mikä sirkus esiintyi hallissa talvella 1901–1902?" (vastaus Barnum & Bailey, jakso 3): jakson 3 kuva ja kaikki kuvatekstit välttävät sirkuksen.

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1-2 | Galerie des Machines oli vuoden 1889 Pariisin maailmannäyttelyn konehalli Champ-de-Marsilla, kentän toisessa päässä kuin Eiffel-torni. Se oli noin 420 metriä pitkä ja 115 metriä leveä, eikä sen sisällä ollut yhtään pilaria, sillä teräskaaret nojasivat toisiinsa kolmesta nivelestä. / Vieraita kuljettivat hallissa liikkuvat sillat. Esillä oli myös Edisonin fonografi, jolla kuultiin muun muassa Marseillaise. | hahmotelma-galerie-des-machines-loisto.jpg: halli ja vieras liikkuvalla sillalla | havainnekuva | Matkakirjan oma (tekoälyllä tuotettu), rajattu; ei Commons-linkkiä | pidetään |
| 3 | Näyttelyn jälkeenkin halli jäi käyttöön: vuonna 1900 siellä pidettiin maatalouden ja elintarvikkeiden näyttely, ja marraskuussa 1901 alkoi Barnum & Bailey -sirkuksen esityssarja kolmessa areenassa. Sarja päättyi maaliskuussa 1902. | hahmotelma-galerie-des-machines-hevosnayttely.jpg: hevosnäyttely hallissa 1908 | valokuva | Agence Rol (Gallica), Public domain, esirajattu ja rajattu; https://commons.wikimedia.org/wiki/File:Concours_central_de_reproducteurs_(chevaux),_Galerie_des_Machines_%C3%A0_Paris_-_btv1b69105797.jpg | haettu |
| 4 | Vuonna 1909 halli purettiin, jotta näkymä Champ-de-Marsille aukeaisi. Yli neljäkymmentä metriä korkea halli oli seissyt paikallaan kaksikymmentä vuotta. | hahmotelma-galerie-des-machines-halli1900.jpg: hallin pääty ja valaisintorni ennen purkua | valokuva | Agence Rol (Gallica), Public domain, esirajattu ja rajattu; https://commons.wikimedia.org/wiki/File:Omnibus_%C3%A0_cheval_devant_la_galerie_des_machines_-_btv1b53216799j.jpg | haettu (rajatapaus) |
| 5 | Hallia ei ole enää. Sen paikka oli Champ-de-Marsin eteläpäässä École Militairen edessä, ja kentän toisessa päässä seisoo yhä Eiffel-torni. | hahmotelma-galerie-des-machines-nykyinen.jpg: Champ-de-Mars ja torni École Militairelta | valokuva | cherisam, CC BY-SA 3.0, esirajattu ja rajattu; https://commons.wikimedia.org/wiki/File:View_of_the_Eiffel_from_the_%C3%89cole_Militaire_-_panoramio.jpg | haettu |

Yhteensä: 3 haettu, 1 pidetään, 0 tilattu. Ei TILAUKSET.md:tä.

#### Perustelut

- J1-2 `loisto` pidetään: halli sisältä (teräskaaret, ei pilareita) ja vieras liikkuvalla sillalla; molemmat jaksot (koko ja sillat) näkyvät. Lähde 1536 x 1024 on täsmälleen 3:2. Sisätila täyttää kuvan; häivytyksessä on vain hallin seiniä. Rajatapaus: sillalla seisova vieras (partainen mies, 25 % kuvan korkeudesta, kasvot pienet) on vasemmassa yläosassa 27–34 % x 27–53 %, mutta häivyttämättömällä alueella; ei lähikuva. Alkuperäinen on paikallinen /Users/Shared/Claude/Matkakirja-3d-selvittaja/assets/kartat/ihmeet/ihme-galerie-des-machines-loistoaika.jpg.
- J3: aito Rol-valokuva hallin sisältä maatalousnäyttelyn aikaan (hevoskarsinat). Vuosi 1908 (Gallican "Couverture 1908") eikä jakson 1900, mutta kuva näyttää "halli jäi käyttöön" -väitteen. Sirkuksesta ei kuvaa vapaasti (Barnum-julisteet ovat pystykuvia 285 x 756 tai valtavia, ja paljastaisivat visan vastauksen).
- J4: Rol-valokuva hallin päädystä ja valaisintornista (Gallican K260569, 1900–1909). Näyttää hallin ennen purkua, ei purkua; jaksossa kerrotaan että halli purettiin ja oli seissyt 20 vuotta. Purkukuvaa ei löytynyt (haettu "démolition", "1909", Agence Rol, Commons-luokat).
- J5: Champ-de-Mars École Militairen edestä, torni kaukana toisessa päässä. Täsmälleen jakson sanat. Esirajaus poistaa rekan, jossa on teksti "TRANSALDIS".

#### Hylätty

- Rol 1905 "Vue sur la galerie des machines" (CC0/PD): hallin sivu aidan takana, Grande Roue puoli kuvaa, aita ja kenttä alaosassa; hylätty J4:ltä.
- Blancard-valokuvat (PH77410 ym., CC0): nykyinen kuvatietokannan J2-kuva; jätetty pois, koska loisto kattaa jakson 2, mutta ne olisivat hyvä vaihtoehto jaksolle 2 (koneita hallissa). Ei ladattu.
- Tilly "Les ponts roulants" -piirros (PD, 3025 x 2099): liikkuvat sillat; hyvä vaihtoehto jaksolle 2 jos loisto ei kelpaa; reunat piirroksen.
- Rol "Vue intérieure de la galerie des machines" (tyhjä halli, K260614): hyvä, mutta ei jaksolle erityisesti.
- Delgado Montparnasse -kuvat (CC BY-SA 3.0) jaksolle 5: torni täyttää 1–70 % korkeudesta ja École Militaire alareunassa 82–97 %: ei mahdu; sama kuva on lisäksi jo eiffel-torni-nostossa.
- Mister No "Champ de Mars - panoramio" (CC BY 3.0): École Militaire ja ruohikko, mutta Tour Montparnasse selvästi kuvassa ja Eiffel puuttuu.
- Rol-kuva "carrefour de l'École militaire" (Carnavalet PH1331, CC0): pahvireuna, hallin pieni osa.

#### Avoimet kysymykset KK:lle

1. J3: kuva on vuodelta 1908 (hevosnäyttely), ei 1900 eikä sirkus; hyväksytäänkö, vai tilataanko Barnum-sirkus hallissa 1901 (havainnekuva, ei kasvoja)? Visan vuoksi sirkuksen kuva sallisi vain jaksolla 3.
2. J4: kuva on hallin ennen purkua, ei purkua; hyväksytäänkö, vai tilataanko purkuhetki (havainnekuva)? Pääty leikkautuu oikeaan reunaan (halli on 420 m), joten sääntö "rakennus kokonaan" ei täyty.
3. Taustalla J5-kuvassa ratsastajapatsas (Joffre) ja Mur pour la Paix; eivät pääaiheita.

### Bizet 1875 (carmenin-ensi-ilta): kuvatyö (K-4 erä 2, D)

Tarinassa 3 kappaletta; kuvalistan "jakso" = kappalenumero. Rajaus: tools/sisalto/nostokuva.mjs (3:2, 1200 × 800).

VISA: Carmen sai Pariisin ensi-illassa viileän vastaanoton. Missä kaupungissa sen maine alkoi ensimmäisenä nousta? Vastaus: Wienissä (kappaleen 3 tekstissä). Kuvateksteissä ei mainita Wieniä.

#### Kuvat

| Kappale | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Georges Bizet sävelsi Carmenin Pariisin Opéra-Comiquelle, ja Pariisi torjui sen. Talo oli perheteatteri, ja kun työ alkoi vuonna 1873, talon johtaja Adolphe de Leuven vastusti näin uskaliasta tarinaa. Lupaukset pehmennyksestä eivät riittäneet, ja hän erosi vuonna 1874. Nimiroolista kieltäytyi Marie Roze, ja rooli meni Célestine Galli-Mariélle. | teatteri1840: Opéra-Comiquen toinen Salle Favart, rakennettu 1840 (bizet-1875-teatteri1840.jpg) | piirros | Théodore Charpentier (litografia, kuvana Gourret 1983 -kirjassa), Wikimedia Commons (Public domain), esirajattu ja rajattu; https://commons.wikimedia.org/wiki/File:La_seconde_Salle_Favart_construite_en_1840_%E2%80%93_Gourret_1983_p._121.jpg | haettu |
| 2 | Ensi-ilta oli 3. maaliskuuta 1875, ja salissa istui useita aikakauden säveltäjiä. Alku meni hyvin, mutta yleisö kylmeni näytös näytökseltä, ja yksi kriitikko moitti pääosan eleitä paheellisiksi. | galli-marie: Célestine Galli-Marié Carmenin roolipuvussa (bizet-1875-galli-marie.jpg) | valokuva | Atelier Nadar (n. 1875), Wikimedia Commons (Public domain), esirajattu ja rajattu; https://commons.wikimedia.org/wiki/File:Atelier_Nadar_-_Galli-Mari%C3%A9_in_Bizet%27s_Carmen_-_Original.jpg | haettu |
| 3 | Bizet kuoli 3. kesäkuuta 1875, 36-vuotiaana. Maine alkoi nousta muualla, ensin Wienissä, ja Pariisiin ooppera palasi vasta 1883. Ensi-illan sali paloi 1887, ja paikalla seisoo nyt kolmas samanniminen teatteri. | nykyinen: Opéra-Comiquen nykyinen Salle Favart Place Boïeldieulla (bizet-1875-nykyinen.jpg) | valokuva | Chabe01, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Th%C3%A9%C3%A2tre_National_Op%C3%A9ra_Comique_-_Paris_II_(FR75)_-_2026-04-18_-_6.jpg | haettu |

Yhteensä: 3 haettu, 0 tilattu, 0 pidetään.

#### Kuvien tiedot ja pääaiheen paikka

- Kappale 1 teatteri1840: rakennus 15–92 % leveydestä ja 15–86 % korkeudesta (julkisivu 15–64 %, oikean sivusiiven takapää häipyy reunassa), keskellä. Esirajaus: kyllä. Ensi-illan talo (Salle Favart II, 1840–1887) 1800-luvun litografiana. Esirajattu: kirjan sivun paperireuna, alateksti ja leima pois (2064 × 1376 px). Rajatapaus: rakennus on kuvan leveyssuunnassa 77 %, sivusiiven takapää 88–92 %:ssa. Kuvassa rakennuksen oma kirjoitus ("Théâtre Royal de l'Opéra Comique").
- Kappale 2 galli-marie: pää 12–60 % korkeudesta ja 40–66 % leveydestä, keskellä; rintakuva, vartalo leikkautuu alareunaan. Esirajaus: kyllä. Alkuperäinen (ei Cuerdenin restaurointia) albumisivulta; esirajattu valokuvan alueeseen (2370 × 1580 px). Pystykuvasta saa 3:2-rajauksena vain rintakuvan. Kuva näyttää roolin luojan roolipuvussa (kappale 2: kriitikko moitti pääosan eleitä); ei visa-riskiä.
- Kappale 3 nykyinen: rakennus 12–89 % korkeudesta ja 15–88 % leveydestä, keskellä (keskiosa 75 %:n sisällä, siipien päät ja portaat ~88 %). Esirajaus: ei. Nykyvalokuva (18.4.2026) kolmannesta Salle Favartista (valmis 1898), sama paikka kuin ensi-illan talo. Ohikulkijat pieninä, ei kasvoja lähikuvana.

#### Hylätty ja pois jätetty

- Nykyinen Leray-juliste (Prudent-Louis Leray 1875, 6536 × 8944, pysty): 3:2-rajaus näyttää vain 43 % kuvan korkeudesta; hahmoryhmä on 37 % kuvan korkeudesta mutta rajaus leikkaa päät tai jalat; 75 %:n sääntö ei täyty (kokeiltu: jalat ja Carmenin kaatuva hahmo leikkautuvat alareunaan). Suunnitelma sanoi pidettäväksi; ei kelpaa 3:2-rajauksena. Kuvan voisi käyttää vain muussa kuin 3:2-käytössä.
- Opéra-Comique ennen paloa 1880 (Brichaut, CC0, 5366 × 6522 pysty, pahvikehys): rajaus leikkaa julkisivun; kirjoitus "THEATRE NATIONAL DE L'OPERA COMIQ" katkeaa.
- Opéra-Comique 1887 palon jäljiltä (Brichaut, PH10054, 5440 × 4454, CC0): julkisivun kulma, ei kokonaisuutta; sopisi vain kappaleen 3 toiseksi kuvaksi (jos halutaan 4 kuvaa).
- Chabe01 2021 (5200 × 5200, neliö): rakennus 89 % kuvan korkeudesta; 3:2-rajaus leikkaa katon tai sisäänkäynnin. Weidmann 2018 (alaviistosta, lyhtypylväs edessä, rakennus leikkautuu). Chabe01 2021 -2 (julkisivun yksityiskohta).
- L'Illustration 1862 (Le Joaillier de St-James, näyttämökuva Opéra-Comiquessa, CC; 7146 × 4611): sopiva vaihtoehto kappaleelle 1, mutta kuvassa teksti ja paperireunat; talon ulkokuva on parempi.
- Galli-Marié-valokuva Cuerdenin restauroituna (retusoitu, ei aito alkuperäinen).

#### Avoimet kysymykset KK:lle

1. KK päättää: kappale 2 saa rintakuvan (Galli-Marié) eikä ensi-illan tapahtumaa; ensi-iltaa ei ole kuvattu (valokuvia ei ole), Leray-juliste ei mahdu 3:2-rajaukseen. Vaihtoehto: tilata Codex-kuva ensi-illan salista (ei kasvoja lähikuvana).
2. Kuvia 3 (tarinassa kolme kappaletta). Jos halutaan 4: 1887 palon jälkikuva (PH10054) kappaleelle 3 ennen nykykuvaa.
3. Kuvateksti kappaleelle 3 sanoo "nykyinen Salle Favart Place Boïeldieulla"; ei paljasta visan vastausta (Wien).

### Kirahvi 1827 (kirahvin-kavelymatka): kuvatyö (K-4 erä 2, D)

Tarinassa 3 kappaletta; kuvalistan "jakso" = kappalenumero. Rajaus: tools/sisalto/nostokuva.mjs (3:2, 1200 × 800).

VISA: Miksi kirahvi kulki Marseillesta Pariisiin jalkaisin? Vastaus: merimatkaa Espanjan ympäri pidettiin liian vaarallisena (kappaleen 1 tekstissä). Kuvateksteissä ei mainita vaaraa eikä merimatkan vaihtoehtoa.

#### Kuvat

| Kappale | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Egyptin varakuningas lähetti kirahvin lahjaksi Ranskan kuninkaalle Kaarle X:lle, ja eläin saapui laivalla Marseilleen lokakuussa 1826. Laivan kanteen oli sahattu reikä, josta kaula mahtui ulos. Merimatkaa Espanjan ympäri Atlantin kautta pidettiin eläimelle liian vaarallisena, joten päätettiin, että kirahvi kävelee Pariisiin. | marseille: Marseillen satama noin vuonna 1825 (kirahvi-1827-marseille.jpg) | maalaus | Ambroise Louis Garneray (Commons-tekijäkenttä: McLeod), n. 1825, Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:Marseille_port_c1825.jpg | haettu |
| 2 | Kirahvi talvehti Marseillessa, ja matkaan lähdettiin toukokuussa 1827. Eläimellä oli yllään vahattu sadetakki, johon oli kirjailtu vaakunat, ja luonnontieteilijä Étienne Geoffroy Saint-Hilaire käveli mukana. Lyonissa vastassa oli noin 30 000 ihmistä. | kavely: Kirahvi vahatussa sadetakissa maantiellä (ei kuvaa) | havainnekuva | Tekoälyllä tuotettu havainnekuva; tilattu (ks. TILAUKSET.md 1) | tilattu |
| 3 | Matka kesti 41 päivää, ja kirahvi saapui Pariisin Jardin des Plantesiin 30. kesäkuuta 1827. Kuningas tapasi sen Saint-Cloudin linnassa 9. heinäkuuta, ja kesän aikana kirahvia kävi katsomassa noin 600 000 ihmistä. Kampauksiakin tehtiin kirahvin tapaan. Eläin kuoli Jardin des Plantes'ssa tammikuussa 1845. | viuhka: Kirahvia esittävä viuhka vuodelta 1827 (kirahvi-1827-viuhka.jpg) | valokuva | Tuntematon tekijä, 1827 (Musée Carnavalet / Paris Musées), Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:Eventail_comm%C3%A9morant_l%27arriv%C3%A9e_de_la_premi%C3%A8re_girafe_au_Jardin_des_plantes_en_1827,_EV558.jpg | haettu |
| 3 | Matka kesti 41 päivää, ja kirahvi saapui Pariisin Jardin des Plantesiin 30. kesäkuuta 1827. Kuningas tapasi sen Saint-Cloudin linnassa 9. heinäkuuta, ja kesän aikana kirahvia kävi katsomassa noin 600 000 ihmistä. Kampauksiakin tehtiin kirahvin tapaan. Eläin kuoli Jardin des Plantes'ssa tammikuussa 1845. | nykyinen: Jardin des Plantesin eläintarha nykyään (kirahvi-1827-nykyinen.jpg) | valokuva | Guilhem Vellut, Wikimedia Commons (CC BY 2.0), rajattu; https://commons.wikimedia.org/wiki/File:M%C3%A9nagerie_(Zoo)_@_Jardin_des_Plantes_@_Paris_(28180304316).jpg | haettu |

Yhteensä: 3 haettu, 1 tilattu, 0 pidetään.

Vaihtoehto (ei listalla pääkuvana): rotonde1838: Kirahvi hoitajineen Jardin des Plantesissa 1838 (kirahvi-1827-rotonde1838.jpg; https://commons.wikimedia.org/wiki/File:Acarie-Baron,_Rotonde_de_la_girafe_et_des_elephants,_1838.jpg)

#### Kuvien tiedot ja pääaiheen paikka

- Kappale 1 marseille: satama koko kuvan leveydeltä (panoraama); kukkula ja Notre-Dame-de-la-Garde 28–47 % korkeudesta, keskellä; oikean reunan laiva ja lippu (80–97 % leveydestä) häipyy osin. Esirajaus: ei. Väritetty kaiverrus/maalaus Marseillen satamasta kirahvin saapumisen aikaan (loka 1826). Kuvassa ei kirahvia eikä sitä laivaa; kuva näyttää paikan ja ajan. 2479 × 1633 -lähteestä rajaus 2450 × 1633. Kasvot pieniä.
- Kappale 2 kavely: (tilattu, ei kuvaa). Esirajaus: ei. Korvaa nykyisen kävelykuvan (assets/kartat/nostot/nosto-kirahvin-kavelymatka-loistoaika.webp, 1024 × 683): alkuperäinen on sama 1024 px (media.matkakirja.app tiedosto 261756 tavua = repon tiedosto), joten 3:2-rajaus jää alle 1200 px; lisäksi kirahvin pää on kuvan ylimmässä 4–15 %:ssa (häivytys) ja kaksi saattajaa on puolilähikuvassa. Aitoja kuvia ks. RAPORTTI "aidot ehdokkaat ja miksi eivät kelpaa".
- Kappale 3 viuhka: viuhka 6–94 % leveydestä ja 17–88 % korkeudesta; kaksi kirahvisiluettia 38–62 % leveydestä ja 32–64 % korkeudesta, keskellä. Esirajaus: ei. Esinekuva: sarvesta valmistettu viuhka, "commémorant l'arrivée de la première girafe au Jardin des plantes en 1827" (Musée Carnavalet, korkeus 16,1 cm). Kuvaa kirahvi-innostusta (kappale 3: 600 000 katsojaa, kirahvin mukaan tehdyt kampaukset ja muoti). Viuhkan kärjet ja vasemman laidan museon inventaarilappu ("EV 558") jäävät häivytykseen. Harmaa tausta, ei tekstiä muuten.
- Kappale 3 nykyinen: rakennus 8–83 % leveydestä ja 26–77 % korkeudesta, keskellä (vasen siipi 8–12 % häivytyksessä). Esirajaus: ei. Nykyvalokuva Jardin des Plantesin eläintarhasta (Rotonde de l'éléphant, tiilirakennus, edessä kuvapatsas). Ei väitä, että kirahvi olisi asunut juuri tässä rakennuksessa: 1838 litografian "Rotonde de la girafe et des éléphants" on kivirakennus, nykyinen tiilirakennus on erilainen. Kuvassa ihmisiä pieninä.
- Vaihtoehto rotonde1838: kirahvi ja hoitaja 22–45 % leveydestä ja 45–94 % korkeudesta (jalat 94 %:ssa, puoliksi häivytyksessä); rotunda 12–88 %; norsut oikeassa reunassa 75–100 %. Litografia 1838: Zarafa hoitajineen Jardin des Plantesin rotondan edessä (eläin eli siellä 1827–1845). Rajatapaus: jalat häipyvät puoliksi; siksi vain vaihtoehto. Esirajattu (kehys, alateksti pois).

#### Hylätty ja pois jätetty

- Nykyinen kävelykuva (havainnekuva, 1024 × 683): ei kelpaa, katso kappale 2 yllä. Nykyinen Hüet-tutkielma (Nicolas Hüet nuorempi 1827, 4793 × 6392 pysty): 3:2-rajaus näyttäisi vain kolmanneksen kirahvista.
- Muut aidot kirahvikuvat ovat pystykuvia, joissa kirahvi on korkea: Brocktorff (2425 × 3200), Archives nationales -piirros (1672 × 2739), Paris Musées -litografiat "Girafe âgée de 2 ans" (2325 × 3000, CC0) ja "La Girafe G.38296" (3150 × 5072, CC0), "La plus grande bête" (3320 × 4340), Girardet 1842 (1531 × 2082). 3:2-rajaus leikkaa pään tai jalat.
- Pienet: Brascassat "Giraffe Crossing" 1827 (600 × 502), Girafe.paris.* -kuvat (336–765 px), Chassériau-kuvat (435 × 340). Alle 1200 px.
- Kappaleen 2 (kävelymatka, Lyon, sadetakki) aitoja vaakakuvia ei löytynyt: Commonsin haut (girafe Lyon/Marseille/1827/Geoffroy Saint-Hilaire/camélopard, luokka Zarafa 31 tiedostoa) eivät tuottaneet yhtään matkaa kuvaavaa vaakakuvaa. Aidot ehdokkaat ja miksi eivät kelpaa: Brascassat 1827 (600 × 502, liian pieni); Paris Musées -litografia 2325 × 3000 (pysty); Girafe.paris.3 (765 × 512, liian pieni).
- Jocrisse-karikatyyri (Kaarle X 1830, ei kirahvia), uuninlevy "Plaque de cheminée à la girafe" (neliö, tumma valurauta, kuvatekstissä vaikea selittää), Inkey-valokuvat Rotondesta (4608 × 3072, rakennus 9–93 % leveydestä), rotunnan kuvat lumessa/lehvistön takaa, ménagerien lasiseinäinen apinatalo ja sisäpiha (ei kirahvia eikä tunnistettavaa paikkaa).

#### Avoimet kysymykset KK:lle

1. Kappaleen 2 kuva on tilattava (TILAUKSET.md 1); ennen Codex-ajoa sisältö ja viitekuvat tarkistettava. Aito vaihtoehto ei löytynyt.
2. Kappaleen 1 kuva (Marseillen satama 1825) ei näytä kirahvia eikä laivaa, jonka kanteen oli sahattu reikä; se näyttää paikan ja ajan. Jos KK haluaa kirahvin kuvaan, tilaus (laivan kansi, kaula reiästä, ei kasvoja lähikuvana).
3. Jakson 3 kaksi kuvaa (viuhka, nykyinen) sovittu "3"-kappaleelle; viuhkan voi jättää pois, jos halutaan vain 3 kuvaa. Vaihtoehtona rotonde1838 (jalat 94 %).
4. Nykykuva ei ole rakennus, jossa kirahvi eli (ks. huom). Kuvateksti on siksi neutraali.

### Bukinistit 1859 (pariisin-bukinistit): kuvatyö (K-4 erä 2, D)

Tarinassa 4 kappaletta; kuvalistan "jakso" = kappalenumero. Rajaus: tools/sisalto/nostokuva.mjs (3:2, 1200 × 800).

VISA: Mitä bukinistien piti kiinteän paikan saatuaankin tehdä laatikoilleen joka ilta? Vastaus: kantaa ne pois kaiteelta (kappaleen 3 tekstissä). Kuvateksteissä ei puhuta laatikoiden poiskantamisesta; kuvissa 3 ja 4 laatikot ovat kaiteella päivällä, mikä ei paljasta vastausta.

#### Kuvat

| Kappale | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Seinen rantamuurin kirjakauppiaita kutsutaan bukinisteiksi, ja nimi kertoo, mitä laatikoissa on: ranskan arkikielen sana bouquin tarkoittaa kirjaa. Kulkukauppiaat myivät kirjoja Pariisin kaduilla jo 1500-luvulta, ja Pont Neufin valmistuttua vuonna 1606 he asettuivat sillalle. | pontneuf1665: Pont Neuf Pariisissa 1600-luvun maalauksessa (bukinistit-1859-pontneuf1665.jpg) | maalaus | Hendrick Mommers, n. 1665 (Musée Carnavalet / Paris Musées), Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:La_Seine_vue_du_Pont-Neuf,_vers_1665,_actuel_1er_arrondissement._la_statue_d%27Henri_IV,_le_Louvre._P646.jpg | haettu |
| 2 | Vuonna 1649 annettiin määräys, joka kielsi kirjojen myynnin sillalla, ja ennen vallankumousta myyjiä oli jo noin 300. Sana bouquiniste kirjattiin ensi kertaa vuoden 1752 sanakirjaan. | pontneuf1700: Pont Neuf 1700-luvun maalauksessa (bukinistit-1859-pontneuf1700.jpg) | maalaus | Nicolas-Jean-Baptiste Raguenet, 1700-luku (Musée Carnavalet), Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:Nicolas_Jean-Baptiste_Raguenet_-_Le_Pont-Neuf_et_la_Pompe_de_la_Samaritaine,_vus_du_quai_de_la_M%C3%A9gisserie_-_P269_-_Mus%C3%A9e_Carnavalet.jpg | haettu |
| 3 | Heitä koskeva erityismääräys annettiin 10. lokakuuta 1859: myyjät saivat jäädä rannoille, mutta laatikot piti silti kantaa pois joka ilta. Laatikot sai jättää kaiteeseen vasta vuonna 1891, ja vuoden 1900 tienoilla niille tuli nykyinen tummanvihreä väri, sama kuin junanvaunuissa. | atget1898: Bukinisteja Quai Voltairella 1898 (bukinistit-1859-atget1898.jpg) | valokuva | Eugène Atget, 1898 (Musée Carnavalet / Paris Musées), Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:Quai_Voltaire,_PH1123.jpg | haettu |
| 4 | Nyt yli 200 bukinistia myy vanhoja kirjoja kolmen kilometrin matkalla, ja vuonna 2019 heidän perinteensä lisättiin Ranskan aineettoman kulttuuriperinnön luetteloon. | nykyinen: Bukinistien laatikot Seinen rantamuurilla nykyään (bukinistit-1859-nykyinen.jpg) | valokuva | Chabe01, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Bo%C3%AEtes_Bouquinistes_Quai_Gesvres_-_Paris_IV_(FR75)_-_2026-05-30_-_3.jpg | haettu |

Yhteensä: 4 haettu, 0 tilattu, 0 pidetään.

#### Kuvien tiedot ja pääaiheen paikka

- Kappale 1 pontneuf1665: Henri IV:n patsas 30–50 % korkeudesta, keskellä; sillan väki ja vaunut 55–95 %; kirjakauppiaan pöytä oikealla alhaalla 62–95 % leveydestä ja 78–92 % korkeudesta (osin häivytyksessä). Esirajaus: ei. Sillan kaupustelijat ja pöydät 1600-luvulla (kappale 1: Pont Neuf, kauppiaat sillalla). Rajattu alaosa (sijoitus 0.5,0.6): taivasta jätetty pois, kauppiaiden pöydät mukana. Vasemmassa reunassa kangasteltta häipyy.
- Kappale 2 pontneuf1700: silta ja patsas keskellä 28–60 % leveydestä; Samaritaine-rakennus oikealla 69–100 % leveydestä, 17–70 % korkeudesta (oikea laita häipyy). Esirajaus: ei. Pont Neuf ennen vallankumousta (kappale 2: noin 300 myyjää, sanakirja 1752). Kuvassa ei erotu kirjakauppiaita; kuva näyttää paikan ja ajan. Lähde ladattu 3840 px leveänä (rajaus 3128 × 2085). Samaritaine-pumppu rajautuu oikeassa reunassa.
- Kappale 3 atget1898: laatikkorivi oikealla 58–100 % leveydestä ja 38–90 % korkeudesta (oikea reuna häipyy); kävelijät ja kioski keskellä 30–75 %. Esirajaus: ei. Atgetin valokuva "Cochers et bouquinistes, quai Voltaire" (1898): myyjät avaamien laatikoiden ääressä rantamuurilla, plataanit ja ilmoituspylväs. Kuvaa vuosien 1859–1900 aikaa (laatikot kaiteella 1891 jälkeen). Kasvot pieniä. Rajatapaus: laatikkorivi jatkuu oikean reunan yli.
- Kappale 4 nykyinen: vihreät suljetut laatikot 23–72 % leveydestä ja 29–50 % korkeudesta; avoimet kojut ja kävelijät 63–95 % leveydestä; rantamuuri vasemmalla ja alhaalla. Esirajaus: ei. Nykyvalokuva (30.5.2026) Quai de Gesvres: vihreät laatikot rantamuurilla, myyjä lukee. Kuvassa pieniä tekstejä (laatikon kyltti "400e anniversaire", elokuvamainos "Titanic" oikeassa yläreunassa, häivytyksessä); kasvoja ei lähikuvana.

#### Hylätty ja pois jätetty

- Nykyinen kuva Quai Saint-Michel (Guilhem Vellut 2016, 5472 × 3648, CC BY 2.0): rantamuuri ja talorivi täyttävät kuvan, vihreät laatikot ovat kapea nauha; pääaihe on talorivi. Korvattu parhailla uusilla kuvilla.
- Nykykuvaehdokkaat: Alexey Komarov 2017 (avoin laatikko lähikuvana, kohde ylittää reunat), Quai de Gesvres 2010 (laatikoissa töhryjä/teksti), Quai Malaquais 2017 ja Conti 2015 (kojurivi täyttää kuvan leveydeltä), Armand 2019 (turisti edessä, rivi oikealla), Mégisserie 2016 (laatikot pieninä alhaalla).
- Pont Neuf: van der Meulen "Louis XIV traversant le Pont-Neuf" (ladattu kuva oli tarkkaa yksityiskohtaa, ei siltaa), ”vers 1665” -maalaus kullatussa kehyksessä (esirajaus mahdollinen, ei tarvittu), Raguenet P270 (kehys, ei kojuja), 1750-luvun Raguenet "A View of Paris from the Pont Neuf" (leveä panoraama).
- Atget PH1180 (1899, pahvikehys, kuvaa kapea), Atget 1898 btv1b105067624 (paperireuna, 1245 × 1054 -pieni versio), Brichaut n. 1901 PH28906(2) (laatikot pieninä kaukana, ilmoituspylväs keskellä), Géniaux PH142 (pysty).

#### Avoimet kysymykset KK:lle

1. Kuvat 1 ja 2 näyttävät Pont Neufin ajan maalauksessa, mutta eivät erottele kirjakauppiaita (kuvassa 1 pöytä kirjoineen oikealla alhaalla). Aitoa 1500–1700-lukujen bukinistikuvaa vaakana ei löytynyt; jos halutaan kirjakauppiaita pääaiheena, tilaus (kojut kaiteella 1600-luvulla, ei kasvoja lähikuvana).
2. Kappale 3: kuvassa 3 laatikot ovat jo kaiteella (1898, 1891 jälkeen); kuvateksti ei kerro iltarutiinista. Visa ei vuoda.
3. Atgetin kuva rajautuu oikeasta reunasta: laatikkorivi jatkuu kuvan yli; lähde on jo 4:3, joten leveyttä ei voi lisätä.

### Patonki 1994 (pariisin-patonki): kuvatyö (K-4 erä 2, D)

Tarinassa 3 kappaletta; kuvalistan "jakso" = kappalenumero. Rajaus: tools/sisalto/nostokuva.mjs (3:2, 1200 × 800).

VISA: Mikä velvollisuus Pariisin parhaan patongin tekijällä on voittonsa jälkeen? Vastaus: toimittaa presidentinpalatsin leivät seuraavan vuoden ajan (kappaleen 3 tekstissä). Riski: kappaleen 3 kuva on Élysée-palatsi; kuvateksti on kirjoitettu nimeämättä palatsia ("palatsin puutarhajulkisivu").

#### Kuvat

| Kappale | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Patonki on Pariisin kuuluisin leipä, ja Ranskassa sitä koskevat tiukat säännöt: vuonna 1993 annetun asetuksen mukaan perinteisessä patongissa saa olla käytännössä vain vehnäjauhoa, vettä, suolaa sekä hiivaa tai juurta, eikä taikinaa saa missään vaiheessa pakastaa. | taikina: Leipuri lisää vettä jauhoihin taikinakoneessa (patonki-1994-taikina.jpg) | valokuva | Pancrat, Wikimedia Commons (CC BY-SA 3.0), rajattu; https://commons.wikimedia.org/wiki/File:P%C3%A9trin_%C3%A0_spirale_m%C3%A9lange.jpg | haettu |
| 2 | Kaupunki on järjestänyt vuodesta 1994 kilpailun parhaasta perinteisestä patongista. Leivät arvostellaan sokkona, jottei raati tiedä, kenen leipää se maistaa, ja raadissa istuu ammattilaisia, toimittajia ja arvottuja tavallisia pariisilaisia. | kilpailu: Raadin jäsen arvioi patonkeja Pariisin kilpailussa 2004 (patonki-1994-kilpailu.jpg) | valokuva | David Brabyn, 2004, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:040105_Brabyn_4640wc.jpg | haettu |
| 3 | Voittaja saa 4 000 euron palkinnon ja yhden velvollisuuden: hän toimittaa presidentinpalatsille leipiä seuraavan vuoden ajan. Vuonna 2022 UNESCO otti patongin leipomotaidon ja -kulttuurin aineettoman kulttuuriperinnön luetteloonsa. | nykyinen: Suihkulähde ja palatsin puutarhajulkisivu Pariisissa (patonki-1994-nykyinen.jpg) | valokuva | Leurent.t, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Palais_%C3%89lys%C3%A9e_depuis_jardin.JPG | haettu |

Yhteensä: 3 haettu, 0 tilattu, 0 pidetään.

#### Kuvien tiedot ja pääaiheen paikka

- Kappale 1 taikina: vaivain ja astia 30–82 % leveydestä ja 20–92 % korkeudesta, keskellä; leipurin käsi ja letku vasemmalla; jauhosäkki oikealla 73–100 % (häipyy). Esirajaus: ei. Kuvan kuvaus: "Ajout de l'eau à la farine dans le pétrin", leipomo La Belle Marianne, Boutiers (Charente), ei Pariisissa; kuvassa jauhosäkki ("Farine de blé") ja vesi taikinakoneessa, kappaleen 1 aineosat: vehnäjauho ja vesi. Leipurin kasvoja ei näy.
- Kappale 2 kilpailu: raadin jäsen 46–93 % leveydestä (kasvot 69–89 %, 25–55 % korkeudesta); patongit paperinauhalla 37–93 % leveydestä ja 38–95 % korkeudesta; lippu vasemmalla 7–38 %. Esirajaus: ei. Kuvauksen mukaan: "A jury member examines baguettes competing for the title of Best Baguette in Paris, 5 January 2004" (120 leipuria, vuosittainen Grand Prix de la Baguette). Patongit on sidottu paperinauhalla (sokkoarviointi). Lähde 1500 × 999 (rajaus 1499 × 999; 2048-versio on 1499 px). Kuvassa raadin jäsenen kasvot puolilähikuvana (aito valokuva, sallittu); Commonsissa "personality rights warning". Lipussa teksti "La Boulangerie de Paris" (aito).
- Kappale 3 nykyinen: palatsi 27–73 % leveydestä ja 17–52 % korkeudesta, keskellä; suihkulähteen vesisuihku kulkee palatsin keskeltä; puut kehyksenä. Esirajaus: ei. Élysée-palatsi puutarhan puolelta (kuvauksen mukaan "Vue du palais de l'Élysée depuis ses jardins"; Journées du Patrimoine -jonoa). Nostokortin paikka on Élysée (kappale 3: palatsin leivät). Ihmisjono pieninä hahmoina. Vesisuihku peittää palatsin keskiosan.

#### Hylätty ja pois jätetty

- Nykyinen leipomon julkisivu (Lionel Allorge, 84 boulevard de Port-Royal, 1280 × 853, CC BY-SA 3.0): ei leipää eikä kilpailua; kyltin päät häipyvät. Korvattu kuvilla, jotka kertovat kappaleet (taikina, kilpailu, palatsi).
- Pancrat "1 pesée" ja "1 1pétrin eau": leipurin pää yläkulmassa häivytyksessä; valittu jauhosäkillinen, kasvoton "mélange"-kuva.
- "Baguettes at the Edgar Quinet market" (Paul Asman, CC BY 2.0): pariisilaisten patonkien kasa täyttää kuvan; varalla kappaleelle 1.
- GodeNehler -sarja (Pariisin patonkikilpailun voittajaleipomojen julkisivuja, CC BY-SA 4.0, 8000 px): kelpaisi kappaleelle 3, mutta ei näytä leipää eikä palatsia; varalla.
- Élysée: AlSepPhoenix "Facade jardin" (3872 × 2592, palatsi 10–92 % leveydestä, ylittää 75 %), Chatsam (neliömäinen), Orionx (ihmiset, varjossa), vostok91 (kaukana ihmisjoukossa).

#### Avoimet kysymykset KK:lle

1. Kappaleen 3 kuvateksti: onko "palatsin puutarhajulkisivu" sopiva vai korvataanko nimeämätön kuvaus? Kuvan nimeäminen Élyséeksi vihjaisi visan vastausta.
2. Kappaleen 2 kuvassa on raadin jäsenen kasvot puolilähikuvana (2004 kilpailu, Commons "personality rights warning"). Aito valokuva, joten sääntö 3 sallii; KK hyväksyy tai ehdottaa korvaajaa.
3. Kappaleen 1 leipomo on Charentessa, ei Pariisissa (kappale puhuu Ranskasta ja patongista yleensä). Kuva näyttää taikinan aineosat.
4. Kuvia 3 (tarinassa kolme kappaletta). Jos halutaan 4: GodeNehler-voittajaleipomo kappaleelle 3 ennen palatsia.

### vrain-lucas: kuvatyö (K-4 erä 2)

Kappale-numero = noston tekstin kappale (D-nosto: kappaleita, ei jaksoja).

#### Kuvat

| Kappale | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Denis Vrain-Lucas oli lakikirjurina työskennellyt ranskalainen, joka väärensi Pariisissa noin 27 000 kirjettä, muun muassa Kleopatran kirjeen Caesarille. Kaikki kirjeet oli kirjoitettu ranskaksi, myös Kleopatran, vaikka niiden piti olla paljon vanhempia. Hän alkoi väärentää 1850-luvulla, hankki aikakauden paperia ja valmisti musteensa itse. | vaarennos: Vrain-Lucasin väärentämä "muinainen" kirje (vrain-lucas-vaarennos.jpg) | käsikirjoitus (väärennös) | Denis Vrain-Lucas (väärennös, Bibliothèque nationale de France), Wikimedia Commons (Public domain), rajattu; tekijä Denis Vrain-Lucas (väärentäjä, 1860-luku); Public domain; https://commons.wikimedia.org/wiki/File:Vercingétorix_à_Pompée.jpg | haettu |
| 2 | Vuonna 1861 hän myi kuuluisalle matemaatikolle ja keräilijälle Michel Chaslesille Boylen, Newtonin ja Pascalin kirjeitä. Yhdessä niistä Pascal ilmoitti keksineensä painovoiman lait ennen Newtonia, ja Chasles maksoi vuosien mittaan kaikkiaan noin 140 000 frangia. | kirjepino: Keräilijä tutkii väärennettyjä kirjeitä, 1861 (ei kuvaa, tilaus) | havainnekuva | - | tilattu |
| 3 | Heinäkuussa 1867 Chasles vei Pascal-kirjeet tiedeakatemialle, mutta käsiala ei vastannut Pascalin varmoja kirjeitä. Kun akatemia huomautti anakronismeista eli ajan virheistä, Vrain-Lucas väärensi lisää kirjeitä selittämään edelliset. | institut1867: Institut de Francen sisäpiha 1860-luvun puolivälissä (vrain-lucas-institut1867.jpg) | valokuva | Charles Marville, Paris Musées / Musée Carnavalet, Wikimedia Commons (CC0), esirajattu ja rajattu; tekijä Charles Marville (kuvattu 1865-1868); CC0; https://commons.wikimedia.org/wiki/File:Cour_de_l'Institut,_6ème_arrondissement,_Paris,_PH809.jpg | haettu |
| 4 | Vrain-Lucas pidätettiin, ja helmikuussa 1870 tuomioistuin antoi hänelle kaksi vuotta vankeutta. Kirjeet, joista Chasles oli maksanut omaisuuden, olivat arvottomia. | institut-nyt: Institut de France Seinen yli nykyään (vrain-lucas-institut-nyt.jpg) | valokuva | DiscoA340, Wikimedia Commons (CC BY-SA 4.0), rajattu; tekijä DiscoA340; CC BY-SA 4.0; https://commons.wikimedia.org/wiki/File:Institut_de_France_in_July_2022_2.jpg | haettu |

#### Pääaiheen paikka ja rajatapaukset kuvittain

- Kappale 1 (vaarennos): Kirje täyttää kuvan: teksti 20-97 % leveydestä ja 12-88 % korkeudesta, leimasinleima 46-59 % / 75-95 %; oikean reunan loppusiveltimet (93-97 %) häipyvät osin. Alkuperäinen 2673 x 1911 (rajaus 2673 x 1782). Väärennetty "Vercingétorixin" pääsylupa Pompeiukselle (kuva BnF:n kokoelmasta). Asiakirjakuva täyttää kehyksen, joten 75 %:n sääntö ei täyty tiukasti; tyhjää paperia on vasemmalla, teksti ei leikkaudu. Kuvateksti ei kerro kirjoituskieltä (visa).
- Kappale 3 (institut1867, esirajattu): Sisäpihan takarakennus 20-62 % leveydestä ja 8-70 % korkeudesta, keskellä; sivusiivet 0-20 % ja 62-100 % häipyvät osin, ihmisiä ei kuvassa. Alkuperäinen 3840 x 3190 (Commons-lataus), esirajaus pois pahvialusta ja käsinkirjoitettu kuvateksti "Cour de l'Institut" (3700 x 2467 -> 1200 x 800). Päiväys "entre 1865 et 1868" sopii heinäkuuhun 1867. Kuvateksti kertoo vain paikan.
- Kappale 4 (institut-nyt): Kupoli 30-42 % leveydestä ja 20-45 % korkeudesta, julkisivu 24-48 % / 45-67 %; vasemman reunan puut 0-15 % ja Pont des Arts oikealla 70-100 % häipyvät osin. Alkuperäinen 3840 x 2880 (Commons-lataus). Rajaus 3840 x 2560; x-suunnassa ei siirtovaraa. Kappale 4 ei mainitse Institutia, mutta kuva on tarinapaikka nyt (viimeisen kuvan sääntö).

#### Perustelut

- Tarina on 4 kappaletta (teksti), 4 kuvaa. Pelin kortti-kenttä (kortti) on johdanto, ei kappale. Kuva 1 sopii kappaleeseen 1 (väärennetty kirje, ranskaksi kirjoitettu muinaisen hahmon "kirje"; kappale 1 sanoo itse kielen), kuva 3 kappaleeseen 3 (tiedeakatemia, heinäkuu 1867), kuva 4 on tarinapaikka nyt (Institut de France).
- Nykykuvista ei pidetä kumpaakaan: Pascal à Galileo 879 x 574 (3:2-rajaus alle 1200 px, ei kelpaa) eikä Charlemagne à Alcuin -kaistale (tekstikaistale ilman paperia, seepia; ei Boylen/Newtonin/Pascalin kirje).
- Kuvateksteistä ei paljasteta visan vastausta (visa: mikä paljasti Kleopatran kirjeet väärennöksiksi, vastaus "ne oli kirjoitettu ranskaksi"). Kappale 1 itse sanoo sen, joten kuva 1 saa näyttää ranskankielisen väärennöksen; kuvatekstissä kieltä ei mainita.

#### Tilaus (kappale 2)

Aidot ehdokkaat ja miksi eivät kelpaa (kappale 2: Chasles ostaa Boylen, Newtonin ja Pascalin kirjeitä):
- Pascal à Galileo.jpg (PD): 879 x 574, 3:2-rajaus 861 px leveä, alle 1200 px. Oikea väärennös, mutta mitta ei riitä.
- Charlemagne à Alcuin (Vrain-Lucas).jpg (PD): 2809 x 1879, mutta Kaarle Suuren kirje, ei Boyle/Newton/Pascal; teksti täyttää kuvan, yläreuna leikattu. Käy varakuvaksi, jos KK ei halua tilata.
- Vercingétorix à Pompée.jpg (PD): käytössä kappaleessa 1; sama kirje ei saa toistua.
- Muut Commonsin Vrain-Lucas-tiedostot: Marie Madeleine au roi des Burgondes (1826 x 2591) ja Jeanne d'Arc à ses compagnons d'armes (1907 x 2773) ovat pystykuvia (3:2-rajaus näyttäisi vain kirjeen palan), Denis Vrain-Lucas.jpg 448 x 457, Héloïse à Abelard 435 x 205, Pascal's letter to his sister 850 x 634 (sisarelle, ei Newton-kirje; alle 1200 px).
- Michel Chasles -kuvat: PSM V18 D740 -kaiverrus 1896 x 2149 (3:2-rajauksessa kasvot ovat 85 % kuvan korkeudesta; kuva ei mahdu 75 %:n alueeseen), Smithsonian-muotokuva 1015 x 1643 ja Michel Chasles.jpg 638 x 890 (alle 1200 px). Kaiverrus olisi toissijainen varakuva, jos KK sallii 85 %:n rajatapauksen (aito kaiverrus, kasvot sallittu).
- Aitoa valokuvaa Vrain-Lucasin myyntihetkestä ei ole. Siksi tilaus: ks. TILAUKSET.md.

#### Hylätty ja miksi

- Marville PH83587 (sama pihakuva, 3000 x 2165): valkoinen pahvi laajalla reunalla, esirajattu tulos olisi vain noin 1700 px leveä; käytettiin PH809:ää (esirajattu 3700 px).
- Renoir "L'Institut" (PD, 2512 x 2051): kuvassa ei näy Institutin kupolia (ranta ja paviljonki), ihmisjoukko ja vaunut pääaiheena; ei esitä tarinapaikkaa selvästi.
- Institut de France seen from the Musée du Louvre (CC BY-SA 4.0): pääaihe pieni, suuri osa kuvasta pimeää porttikäytävää, ihmisiä etualalla.
- Marville "Rue de Seine, vue prise de l'Institut" (PH820, PH83595): kuvattu Institutin kaaresta ulos katuun, pystykuvia (3326 x 4910, 2191 x 3000); ei katsottu tarkemmin.

#### Avoimet kysymykset KK:lle

1. Hyväksytäänkö asiakirjakuva (kuva 1), joka täyttää kehyksen? Teksti ei leikkaudu, mutta 75 %:n sääntö ei täyty tiukasti (paperi on koko kuva).
2. Tilataanko kappaleen 2 havainnekuva (TILAUKSET.md), käytetäänkö varakuvaa Charlemagne à Alcuin vai Chasles-kaiverrusta (85 %)?
3. Kappale 4 ei mainitse Institutia; viimeinen kuva (Institut nyt) noudattaa "viimeinen kuva paikasta nykyään" -sääntöä. Kappale 3 sanoo "tiedeakatemialle", mutta Institut-sisäpihan kuva ei näytä akatemian istuntosalia.
4. Hylättyä nykykuvaa Pascal à Galileo ei käytetä; datan kuva.tiedosto ja nahtavyysjutut.js:n Vrain-Lucas-kuvat pitää vaihtaa (SK).

### monet-1874: kuvatyö (K-4 erä 2)

Kappale-numero = noston tekstin kappale (D-nosto: kappaleita, ei jaksoja).

#### Kuvat

| Kappale | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Claude Monet ja hänen ystävänsä olivat nuoria maalareita, joiden töitä Pariisin virallinen vuosinäyttely Salon ei huolinut, ja ilman Salonia maalari jäi näkymättömäksi. Vuonna 1867 Frédéric Bazille laati vetoomuksen hylättyjen uudesta näyttelystä. | bazille: Bazillen ateljee Pariisissa, maalaus vuodelta 1870 (monet-1874-bazille.jpg) | maalaus | Frédéric Bazille (Musée d’Orsay), Wikimedia Commons (Public domain), rajattu; tekijä Frédéric Bazille; Public domain; https://commons.wikimedia.org/wiki/File:Frédéric_Bazille_-_Bazille's_Studio_-_Google_Art_Project.jpg | haettu |
| 2 | Joulukuussa 1873 Monet, Renoir, Pissarro, Sisley, Degas ja muut perustivat oman yhdistyksen esittääkseen työnsä itse. Ensimmäinen näyttely pidettiin huhtikuussa 1874 valokuvaaja Nadarin ateljeessa, ja mukana oli kolmekymmentä taiteilijaa. | nadar: Nadarin ateljeen julkisivu noin vuonna 1860 (monet-1874-nadar.jpg) | valokuva | Nadar, Wikimedia Commons (Public domain), esirajattu ja rajattu; tekijä Nadar (Gaspard-Félix Tournachon); Public domain; https://commons.wikimedia.org/wiki/File:Atelier_Nadar_35BoulevardDesCapucines_1860_Nadar.jpg | haettu |
| 3 | Kriitikko Louis Leroy ivasi Monet’n maalausta Impression, soleil levant ja otsikoi juttunsa ”Impressionistien näyttely”. Pilkkanimi jäi ryhmän nimeksi. Heidän viimeinen yhteinen näyttelynsä pidettiin vuonna 1886. | impression: Claude Monet’n Impression, soleil levant, 1872 (monet-1874-impression.jpg) | maalaus | Claude Monet, Wikimedia Commons (Public domain), rajattu; tekijä Claude Monet; Public domain; https://commons.wikimedia.org/wiki/File:Monet_-_Impression,_Sunrise.jpg | pidetään |
| 4 | Maalaus esittää auringonnousua Le Havren satamassa, ja se kuuluu nykyään Pariisin Musée Marmottan Monet’n kokoelmiin. | marmottan: Musée Marmottan Monet Pariisissa nykyään (monet-1874-marmottan.jpg) | valokuva | Ardfern, Wikimedia Commons (CC BY-SA 3.0), rajattu; tekijä Ardfern; CC BY-SA 3.0; https://commons.wikimedia.org/wiki/File:Musée_Marmottan_Monet,_Paris,_March_2013.JPG | haettu |

#### Pääaiheen paikka ja rajatapaukset kuvittain

- Kappale 1 (bazille): Miesryhmä easelin ääressä 28-48 % leveydestä ja 45-83 % korkeudesta, keskellä; pianisti 72-80 %; portaiden mies 0-12 % ja seinän taulut ylhäällä häipyvät osin. Alkuperäinen 3840 x 2873 (Commons-lataus), rajaus 3840 x 2560. Kuvassa nuoria maalareita ja ystäviä ateljeessa (Bazillen ateljee 1870); ei Salon-kuva, mutta sopii "Monet ja ystävät, nuoria maalareita" ja Bazillen vetoomukseen. Seinillä taiteen alastonkuvia (maalauksia maalauksessa), pääosin reunoilla; KK arvioi sopivuuden 13+.
- Kappale 2 (nadar, esirajattu): Lasikattoinen ateljeekerros ja "Nadar"-kyltti 9-84 % leveydestä ja 5-58 % korkeudesta; kerros "A la Ville de Sedan" 75-95 % häipyy; veistos katolla 3-9 %. Alkuperäinen 3840 x 4740 (pysty, koko julkisivu ei mahdu 3:2-rajaukseen). Esirajaus: käsin kirjoitettu teksti yläreunassa ja katuosa alareunassa pois (3600 x 2400 -> 1200 x 800); jäljellä ateljeen lasikerros ja yläkerrat, alakerran kauppakerros ja jalat leikkautuvat pois. RAJATAPAUS: rakennus ei ole kokonaan kuvassa; pääaihe on ateljeen oma lasikerros. Kuvassa on historiallisia kylttitekstejä (Nadar, A la Ville de Sedan). Kuvateksti ei anna katuosoitetta (fokusvirran varaus).
- Kappale 3 (impression): Aurinko 60 % / 28 %, vene 50 % / 72 %, heijastus 60 % / 55-90 %: koko aihe keskialueella; ylä- ja alareunasta rajattu 7 % / 7 % alkuperäisestä. Alkuperäinen 3840 x 2979 (Commons-lataus; Commonsissa 5773 x 4478). Nykyinen kuva (sama maalaus), rajattu 3:2-kuvaksi; signeeraus vasemmassa alakulmassa jää pois. Kuvateksti ei paljasta visan vastausta (nimen alkuperä).
- Kappale 4 (marmottan): Museorakennus 5-85 % leveydestä ja 28-80 % korkeudesta, keskellä; vasen siipi 5-12 % häipyy osin; pysäköidyt autot ja banderolli ("Laurencin") mukana. Alkuperäinen 3840 x 2560 (Commons 5184 x 3456), ei rajausmuutosta. RAJATAPAUS: rakennus leveä (80 % leveydestä), vasemman siiven pää häipyy osin; kuvassa banderolli ja ihmiskasvot julisteessa (maalaus), auton rekisteri. Vaihtoehto "viimeiselle" olisi 35 Bd des Capucines nykyään (kartan piste): se on tarinapaikka, mutta kaksi Commonsin nykykuvaa (Tangopaso 2009 PD-self; Artvill 2025 CC BY-SA 4.0) ovat pystysuora julkisivu, joka täyttää 3:2-rajauksen korkeuden 87-100 %.

#### Perustelut

- Tarina on 4 kappaletta, 4 kuvaa. Kuva 1: nuoria maalareita ateljeessa (Bazille 1870), kuva 2: Nadarin ateljeen julkisivu (aito valokuva noin 1860), kuva 3: Impression, soleil levant (nykyinen noston kuva, pidetty, rajattu), kuva 4: Musée Marmottan Monet nykyään.
- Alkuperäinen "Monet - Impression, Sunrise.jpg" haettu uudelleen (3840 x 2979 lataus; Commonsissa 5773 x 4478); rajattu 3:2-kuvaksi.
- Visa: "Mistä impressionistit saivat nimensä?" (vastaus: kriitikon pilkkaavasta otsikosta). Kuvateksti 3 ei kerro nimen alkuperää; kuva 3 vastaa kappaletta 3, joka sanoo saman.
- Fokusvirran varaus noudatettu: Nadarin ateljeen katuosoitetta ei kirjoiteta kuvateksteihin.

#### Hylätty ja miksi

- Nadar-julkisivun nykykuvat (Tangopaso 2009, PD-self; Artvill 2025, CC BY-SA 4.0): julkisivu täyttää 3:2-rajauksen korkeudesta 87-100 %, ja kaduilla on mainoksia (Lacoste, Furla) ja Morris-pylväs. Siksi kuva 4 on Marmottan.
- Nadar-julkisivun historiallinen kuva (pysty): koko julkisivua ei saa 3:2-ruutuun; käytetty ateljeekerrosta (esirajaus), alakerrat leikkautuvat.
- Fantin-Latour "Un atelier aux Batignolles" (PD, 4198 x 3110): ei katsottu silmin; ryhmämuotokuva täyttää tyypillisesti koko kehyksen, ja Bazillen ateljee (ihmiset pieniä ja keskellä) sopi paremmin.
- Cham-pilakuvat (1024 px ja 762 px): alle 1200 px leveät. Kataloginkansi ja Exposition1874affiche: alle 1000 px.
- Manet "Le Déjeuner sur l'herbe" (Salon des Refusés 1863): kappale ei mainitse Manet'ta; alaston kuva keskellä; ei käytetty.
- Marmottanin puutarhapaviljonki (Leclercq 4000 x 3000): ei museon pääjulkisivu, puiden peittämä; Thomonin kuva (5152 x 3864) täyttää kehyksen lähietäisyydeltä, rakennus ei kokonaan.

#### Avoimet kysymykset KK:lle

1. Kuva 1 ei ole Salon-kuva vaan Bazillen ateljee 1870: sopii "Monet ja ystävät, hylätyt nuoret maalarit" ja Bazillen vetoomukseen (kuvassa maalareita ateljeessa), mutta ei esitä Salonia. Aitoa Salon-sisäkuvaa 1860-luvulta ei löytynyt (Commons: vain 1880+ tai pdf-kirjoja). Seinillä on alastonkuvia (maalauksia maalauksessa).
2. Kuva 2 (Nadar-julkisivun esirajaus): rakennuksen jalat leikkautuvat, ja kuvassa on Nadarin kyltti sekä "A la Ville de Sedan" -teksti. Hyväksytäänkö rajatapaus?
3. Kuva 4: viimeinen kuva on museo (kappale 4 sanoo museon), ei 35 Boulevard des Capucines (kartan piste). Vasen siipi häipyy osin, banderolli ja auto mukana. Vaihtoehto: Capucines-nykykuva (korkea julkisivu, ei mahdu).

### piiritys-1870: kuvatyö (K-4 erä 2)

Kappale-numero = noston tekstin kappale (D-nosto: kappaleita, ei jaksoja).

#### Kuvat

| Kappale | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Pariisin piirityksen viestit kulkivat kyyhkyillä, ja mahdollisuuden siihen oli antanut valokuvaaja René Dagron, joka oli saanut vuonna 1859 patentin mikrovalokuvaukselle. | kyyhkyset: Kyyhkynen lentoon Pariisin kattojen yllä, 1870-71 (piiritys-1870-kyyhkyset.jpg) | maalaus (valokuvavedos) | Jacques Guiaud ja Jules Didier (maalaus; vedoksen kuvaaja tuntematon), Paris Musées / Musée Carnavalet, Wikimedia Commons (CC0), esirajattu ja rajattu; tekijä Jacques Guiaud ja Jules Didier (maalaus), valokuvavedos tuntematon; CC0; https://commons.wikimedia.org/wiki/File:Siège_de_Paris,_1870-1871_les_pigeons_messagers,_peinture_de_Guiaud_et_Didier._Paris_Musées_20230515120229.jpg | haettu |
| 2 | Kun preussilaiset sulkivat Pariisin syyskuussa 1870, lennätinlangat ja Seinen pohjassa kulkenut salakaapeli katkaistiin. Lähes ainoa reitti kaupunkiin päin oli kirjekyyhky, ja kyyhkyt vietiin ulos ilmapalloilla. | ilmapallo: Ilmapallot valmiina lähtöön Montmartrella, 1870 (piiritys-1870-ilmapallo.jpg) | maalaus | Jacques Guiaud ja Jules Didier (maalaus), Paris Musées / Musée Carnavalet, Wikimedia Commons (CC0), rajattu; tekijä Jacques Guiaud ja Jules Didier; CC0; https://commons.wikimedia.org/wiki/File:Anonyme_-_Départ_de_Léon_Gambetta_pour_Tours_sur_le_ballon_l'''Armand-Barbès'',_le_7_octobre_1870,_à_Montmartre_-_P1225_-_Musée_Carnavalet_-_2.jpg | haettu |
| 3 | Sopimus Dagronin kanssa allekirjoitettiin marraskuun alussa. Hän pienensi viestit mikrofilmeiksi, yksi filmi painoi noin viisi sadasosagrammaa, ja yksi kyyhky jaksoi kantaa niitä jopa kahdeksantoista. | viestilevy: Dagronin valokuvaama viestilevy piirityksen ajalta (piiritys-1870-viestilevy.jpg) | valokuva | René Dagron, Paris Musées / Musée Carnavalet, Wikimedia Commons (CC0), rajattu; tekijä René Dagron; CC0; https://commons.wikimedia.org/wiki/File:Pellicule_du_Journal_Pigeons_Voyageurs,_Souvenir_du_Siège_de_Paris,_1870-1871._PH20110_(15_of_20).jpg | pidetään |
| 4 | Perillä filmi asetettiin kahden lasilevyn väliin ja heijastettiin taikalyhdyllä seinälle, josta viestit kirjoitettiin puhtaaksi. Lehtitietojen mukaan saksalaiset kouluttivat haukkoja pysäyttämään kyyhkyjä. Piiritys päättyi tammikuussa 1871. | hotel-de-ville: Pariisin Hôtel de Ville Seinen yli nykyään (piiritys-1870-hotel-de-ville.jpg) | valokuva | Marcin Białek, Wikimedia Commons (CC BY-SA 3.0), rajattu; tekijä Marcin Białek; CC BY-SA 3.0; https://commons.wikimedia.org/wiki/File:Hotel_de_Ville_de_Paris_2012.JPG | haettu |

#### Pääaiheen paikka ja rajatapaukset kuvittain

- Kappale 1 (kyyhkyset, esirajattu): Lentävä kyyhky 62 % / 31 %, kolme henkilöä katolla 32-46 % / 68-90 %; kyyhkyslakka oikealla 78-97 % / 20-70 % häipyy osin. Alkuperäinen 2248 x 1597 (Commons-lataus). Esirajaus: teippi/paperireuna, signeeraus ja kuvateksti pois (2047 x 1365 -> 1200 x 800; 2048-versio on 2047 px, ei suurennettu). Seepiasävyinen vedos maalauksesta, Commonsin luokassa "Siege of Paris pigeon post"; ei mikrofilmiä (visa) eikä kuvassa tekstiä.
- Kappale 2 (ilmapallo): Kori ja väkijoukko 36-48 % / 62-85 %, pääpallo 16-67 % / 0-62 %, toinen pallo 67-95 %; pallojen yläosa leikkautuu jo alkuperäisessä maalauksessa. Alkuperäinen 3840 x 2583 (Commons 4852 x 3264). RAJATAPAUS: pääpallon kupu on leikattu maalauksen omassa ylälaidassa, joten pallo ei ole kokonaan kuvassa ja häivytys leikkaa yläosaa. Maalaus esittää Gambettan lähtöä 7.10.1870 (henkilö pienenä, kasvot eivät näy lähikuvana). Kuvateksti ei nimeä Gambettaa.
- Kappale 3 (viestilevy): Levy täyttää kuvan: otsikko ja numerolaatat 8-95 % / 8-28 %, kolme palstaa 30-93 %; vasemman reunan repeämä 5-15 % häipyy. Nykyinen noston kuva (sama Dagronin viestilevy), alkuperäinen 3840 x 6093 (Commonsissa 5047 x 8008, pystysuora), rajattu ylhäältä 3840 x 2560. RAJATAPAUS: asiakirjakuva täyttää kehyksen, rikkinäinen reuna ja luettavaa tekstiä (kuvassa "Simulacre d’une pellicule photographique"; esine on Dagronin jäljennös viestifilmistä, ei alkuperäinen filmi). Kuvateksti välttää sanaa mikrofilmi (visan vastaus). Jos KK ei hyväksy, valinnainen tilaus on TILAUKSET.md.
- Kappale 4 (hotel-de-ville): Rakennus 17-88 % leveydestä ja 28-72 % korkeudesta (torni 21 %), keskellä; puut etualalla peittävät alaosaa. Alkuperäinen 3840 x 2306 (Commons 4643 x 2788), rajaus 3459 x 2306. Karttapiste Hôtel de Ville (kartta 48,8566/2,3522). Kappale 4 ei mainitse Hôtel de Villeä; kuva on tarinapaikka nyt (viimeisen kuvan sääntö).

#### Perustelut

- Tarina on 4 kappaletta, 4 kuvaa. Kuva 1: kyyhkynen ja katot (aikalaismaalaus, vedos), kuva 2: ilmapallot Montmartrella (aikalaismaalaus), kuva 3: Dagronin viestilevy (nykyinen noston kuva "pellicule", pidetään), kuva 4: Hôtel de Ville nyt.
- Visa: "Miten kokonaisten sanomalehtien verran viestejä saatiin yhden kyyhkyn kannettavaksi?" (vastaus: mikrofilmille). Kuvat 1 ja 2 eivät näytä filmiä; kuva 3 sijoitettu kappaleeseen 3, joka sanoo "mikrofilmeiksi". Kuvatekstiin 3 ei kirjoitettu sanaa mikrofilmi.
- Dagronin 20 Commons-tiedostoa (PH20110), katsottu 01, 06, 15, 16, 17, 18: 01, 06, 17 ja 18 ovat Dagronin esitteen sivuja tai kansi (kirjapainettua tekstiä), 16 on pahville kiinnitetty pieni jäljennös ja pankkikirje, 13-14 ovat pieniä (819 x 557, 826 x 439), 15 on viestilevy (5047 x 8008 Commonsissa). Muita (02-05, 07-12, 19-20) en katsonut; tiedot (kuvaus) kertovat 13-20 olevan "pellicule montée" 5,2 x 3,1 cm. Vain 15 sopi.

#### Hylätty ja miksi

- Dagronin esitteen sivut (PH20110 01, 06, 17, 18): kirjapainettua tekstiä, ei kuvaa.
- Arrivée d'un pigeon... ND4410: mitali (pronssi), pääaihe pieni rengas valkoisella, teksti kuvassa.
- Jules Didier -maalauksen muut Commons-versiot (P1225 ja Jean-Baptiste Noron kopio): sama aihe; CC0-versio (P1225 - 2, 4852 x 3264) valittu lisenssin selkeyden vuoksi.
- Morin-lehtikuvat Ville d'Orléans -pallosta (1,8 x 2,6 tuhatta px, pystykuvia): Norjan lento, ei piiritetty Pariisi.
- Hôtel de Ville -nykykuvat: Rabich 1706 (sivukulma, autoja ja pyöriä, pääaihe täyttää), Vellut 2016 (rakennus oikeassa reunassa 37-97 %), DXR 2014 (rakennus 6-95 %, ylittää rajan); Białek 2012 sopi parhaiten.

#### Avoimet kysymykset KK:lle

1. Kuva 3 (viestilevy) on asiakirjakuva: levy täyttää kehyksen, vasemmassa reunassa repeämä, kuvassa luettavaa tekstiä ("Simulacre d'une pellicule photographique"). Hyväksytäänkö, vai tilataanko valinnainen havainnekuva (TILAUKSET.md)?
2. Kuva 2 on maalaus Gambettan lähdöstä; pallojen yläosa on leikattu jo maalauksen omassa reunassa (häivytys leikkaa palloa). Hyväksytäänkö rajatapaus?
3. Kuva 1 on valokuvavedos maalauksesta (Commonsin tekijäkenttä: anonyymi valokuvaaja; maalaus Guiaud ja Didier). Seepiasävy ja vedoksen reunat esirajattu pois.
4. Kappale 4 ei mainitse Hôtel de Villeä (kartan piste); kuva 4 on tarinapaikka nyt.
5. Kuvan 2 maalaus esittää Gambettan lähtöä; teksti ei mainitse Gambettaa. Kuvateksti ei nimeä häntä.

### notre-dame-2019: kuvatyö (K-4 erä 2)

#### Kuvat

| Kappale | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Notre-Damen ullakko syttyi 15. huhtikuuta 2019, ja keskitorni romahti noin kello 19.50. Katon alla paloi tammirungoista tehty kattotuolisto, joka oli pääosin 1200-luvulta. | palo: Notre-Dame palaa 15. huhtikuuta 2019 (notre-dame-2019-palo.jpg) | valokuva | Emilio Luque, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Incendio_de_la_catedral_de_Notre_Dame_de_Par%C3%ADs.jpg | haettu |
| 2 | Tornin huipulla seisoi kukko, jonka sisään oli suljettu pyhäinjäännöksiä, muun muassa pala orjantappurakruunua. Ensin sitä luultiin tuhoutuneeksi, mutta se löytyi seuraavana päivänä raunioista lommoilla. Onnea oli muutenkin: kuusitoista patsasta oli nostettu katolta korjattavaksi vain päiviä ennen paloa. | kukko: Tornin kukko ennen paloa, elokuu 2018 (notre-dame-2019-kukko.jpg) | valokuva | Panageotean Graphics, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Rooster_on_the_spire_of_Notre_Dame_in_Paris.jpg | haettu |
| 3 | Ensimmäinen messu palon jälkeen pidettiin kesäkuussa 2019 kypärät päässä. Uusi kullattu kukko asennettiin tornin huipulle 16. joulukuuta 2023, ja sen sisään pantiin samat pyhäinjäännökset sekä lähes 2 000 jälleenrakentajan nimet. Katedraali avattiin uudelleen joulukuussa 2024. | uusi: Notre-Damen kuoriosa uudelleenavauksen jälkeen 2024 (notre-dame-2019-uusi.jpg) | valokuva | Ibex73, Wikimedia Commons (CC BY 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Chancel_of_Notre-Dame_de_Paris,_2024_(3).jpg | haettu |
| 3 | Ensimmäinen messu palon jälkeen pidettiin kesäkuussa 2019 kypärät päässä. Uusi kullattu kukko asennettiin tornin huipulle 16. joulukuuta 2023, ja sen sisään pantiin samat pyhäinjäännökset sekä lähes 2 000 jälleenrakentajan nimet. Katedraali avattiin uudelleen joulukuussa 2024. | nyt: Notre-Damen länsijulkisivu maaliskuussa 2025 (notre-dame-2019-nyt.jpg) | valokuva | Chabe01, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Cath%C3%A9drale_Notre_Dame_-_Paris_IV_(FR75)_-_2025-03-29_-_1.jpg | haettu |

Yhteensä: 4 haettu, 0 tilattu, 0 pidetään.

Mitat (pääaiheen paikka, arvio esikatselusta) ja rajatapaukset:

- palo (esirajaus: ei): julkisivu ja tornit 33–75 % leveydestä, tornien huiput 14 %:ssa, julkisivun alareuna 80–85 % (puiden ja väkijoukon takana); palo oikealla 46–50 % korkeudesta (arvio esikatselusta). Lähde 4272 × 2848 (3:2), rajaus koko kuva. Tulipalo katon kohdalla (savu ja liekki oikealla), katedraali kokonaan; romahtanutta tornia ei näy (kuva ottaa hetken ennen romahdusta, kertoja sanoo ullakon syttyneen). Alareunassa katsojajoukko selin ja sivusta, pieniä hahmoja häivytysalueella. Rajatapaus: julkisivun jalat 80–85 %:ssa, hieman 75 %:n rajan alapuolella.
- kukko (esirajaus: ei): kukko 38–62 % leveydestä ja 24–72 % korkeudesta, keskellä; tanko jatkuu alareunaan (arvio esikatselusta). Lähde 5184 × 3888, rajaus 5184 × 3456 (keskitetty). Kuvassa alkuperäinen kukko tornin huipulla, päivämäärä 13.8.2018 (Commonsin kuvaus: "now destroyed rooster"). Ei näytä löytymistä lommoilla (visan vastaus tulee kertojan toisessa virkkeessä; kuva ei paljasta sitä ennen). HYLÄTTY: Coq de Notre-Dame de Paris 2020 (Siren-Com, 2549 × 2402) ja Neupont 01/02: kukko täyttää 85–90 % lähdekuvan korkeudesta, 3:2-rajauksessa se leikkautuu (ei mahdu 75 %:iin); kuvassa myös näyttelyjulisteen tekstiä.
- uusi (esirajaus: ei): kuoriosa symmetrisesti keskellä: ikkunat 38–55 % leveydestä (17–36 % korkeudesta), alttarimalja 40–62 % leveydestä ja 67–86 % korkeudesta (arvio). Lähde 5472 × 3648 (3:2). Katedraalin sisätila palon jälkeen (kuvauksen mukaan joulukuun 2024 jälkeen). Ei ihmisiä. Alttarimalja alareunaa kohti 86 %:iin: rajatapaus mutta ikkunat ja holvi keskellä. Kuva ei näytä kukkoa; kappaleen 3 viimeinen virke (uudelleenavaus).
- nyt (esirajaus: ei): julkisivu 35–69 % leveydestä, 16–79 % korkeudesta, keskellä; ympärillä taivasta ja aukiota (arvio esikatselusta). Lähde 5712 × 4284, rajaus 5712 × 3808 (keskitetty, Commonsin tiedoston oma sivu). Aito nykyvalokuva avatusta katedraalista, tornit ja koko julkisivu häivyttämättömällä alueella, sininen taivas. Etualalla aukio täynnä pieniä ihmishahmoja; oikealla rakennusnosturi. Uutta tornia (kukko) ei näy edestä katsottuna.

#### Perustelut

- Nosto on kolmikappaleinen (lunastus-taulukko), 4 kuvaa: kappale 1 palo, kappale 2 kukko, kappale 3 kaksi kuvaa (uudelleen avattu sisätila ja nykyinen julkisivu). Viimeinen kuva on aito nykyvalokuva (maaliskuu 2025).
- Kappale 1: Emilio Luquen kuva 15.4.2019: katedraali kokonaan ja palo katon kohdalla. Julkisivun jalat jäävät puiden ja katsojajoukon taakse 80–85 %:iin (rajatapaus). Kappaleen 1 "kattotuolisto 1200-luvulta" -osalle ei löytynyt vapaata ennen paloa otettua ullakkokuvaa (Commonsin "charpente"-kuvat ovat 2025 uutta rakennetta, eivät käy). Ei tilausta.
- Kappale 2: ennen paloa otettu aito kuva kukosta tornin huipulla (13.8.2018). Nykyinen kuva (Coq 2020, lommoinen kukko) EI mahdu: kukko täyttää 85–90 % kuvan korkeudesta, 3:2-rajaus leikkaa sen; lisäksi kuvassa on näyttelyjulisteen tekstiä. Sama koskee Neupontin kahta samaa kukkoa kuvaavaa kuvaa. Tilausta ei ole kirjoitettu: Codex-kuva lommoisesta kukosta olisi mahdollinen, mutta se ei ole välttämätön.
- Kappale 3: kuoriosa ja alttari uudelleenavauksen jälkeen (Ibex73) sekä länsijulkisivu 29.3.2025 (Chabe01; koko julkisivu, sininen taivas). Kappaleen 3 "kypärämessu 2019" ja "uusi kukko 2023" -hetkille ei löytynyt vapaata käyttökelpoista kuvaa (Rooster 2023, 1034 px korkea ja kukko vasemmassa reunassa; Ibex73-kukkokuvat vain pystyjä).

#### Hylätty

- Coq de Notre-Dame de Paris 2020 (nykyinen kuva), Neupont Le coq 01/02: kukko ei mahdu 3:2-rajaukseen (ks. yllä).
- Kaksi Cangadoban palokuvaa (FireonND 8740, NDonFire 9022): paloa lähellä, rakennus leikkautuu tai kuvan alaosa täynnä katsojien päitä; 9022 pimeä ja ala täynnä väkijoukkoa.
- Muut Remi Mathis / Marind / Baidax -palokuvat: puita, palmuja tai kirjalaatikoita edessä, tulipalo kaukana ja pieni.
- Rabichin Notre-Dame 2014 -sarja: ei oikea hetki ("nyt"-kuvana 2014 väärä aika). Notre-Dame 2017 (Ali Sabbagh, suunnitelman ehdotus): ennen paloa, ei "nyt".
- Chabe01 2025-03-01/-03-29 muut kuvat ja Wyslijp16, The wub: pystykuvia tai julkisivun osia (tornit pois). Arendt "facade" (CC0, yökuva) olisi mahdollinen varaehdokas, ei käytetty.

#### Visa

Kysymys: "Tornin huipulla seisonut kukko luultiin ensin tuhoutuneeksi. Miten sille kävi?" Vastaus: löytyi seuraavana päivänä raunioista lommoilla. Kukon kuva (kappale 2) ei näytä lommoilla olevaa kukkoa eikä kuvateksti paljasta löytymistä. VAROITUS: NYKYISET kentät `kuva.lyhyt` ("...putosi... ja löytyi lommoilla") ja `kuva.selite` kertovat visan vastauksen; jos ne näytetään ennen kertojan lausetta, vastaus paljastuu (KK päättää; en muuttanut mitään).

#### Avoimet kysymykset KK:lle

1. Kappaleen 2 kuva näyttää alkuperäisen kukon ennen paloa, ei lommoista kukkoa: hyväksytäänkö, vai tilataanko Codex-kuva (ei kasvoja, ei tekstiä)?
2. Kappaleen 1 kuvasta puuttuu romahtanut torni; kuva on hetkeä ennen romahdusta.
3. Kuvalistan `kertoja` on koko kappaleen teksti (kappale 3 sisältää kaksi kuvaa; sama teksti kummallekin).

### piaf-django: kuvatyö (K-4 erä 2)

#### Kuvat

| Kappale | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Pariisin kaduilta nousi kaksi tähteä: Édith Piaf syntyi Pariisissa joulukuussa 1915, tarinan mukaan Bellevillessä kadulla talon portaille. Django Reinhardt kasvoi romaniperheen asuntovaunussa Pariisin porttien luona ja soitti banjoa jo lapsena. | belleville1910: Rue de Belleville helmikuussa 1910 (piaf-django-belleville1910.jpg) | valokuva | Eugène Gossin, 1910, Paris Musées / Musée Carnavalet, Wikimedia Commons (CC0), esirajattu ja rajattu; https://commons.wikimedia.org/wiki/File:N%C2%B0214_et_214,_rue_de_Belleville,_20%C3%A8me_arrondissement,_Paris._PH43075.jpg | haettu |
| 1-2 | Pariisin kaduilta nousi kaksi tähteä: Édith Piaf syntyi Pariisissa joulukuussa 1915, tarinan mukaan Bellevillessä kadulla talon portaille. Django Reinhardt kasvoi romaniperheen asuntovaunussa Pariisin porttien luona ja soitti banjoa jo lapsena. / Syksyllä 1928 vaunussa syttyi tulipalo, kun kynttilä kaatui selluloidikukkien päälle. Django ei enää voinut käyttää vasemman käden nimetöntä ja pikkurilliä kunnolla, ja lääkärit sanoivat, ettei hän soita enää. Veli toi hänelle kitaran, ja hän opetteli soolot kahdella sormella. Vuonna 1934 hän perusti Pariisissa Quintette du Hot Club de Francen. | vaunut1913: Asuntovaunut Porte de Choisyn luona, 1913 (piaf-django-vaunut1913.jpg) | valokuva | Eugène Atget, 1913, Paris Musées / Musée Carnavalet, Wikimedia Commons (CC0), esirajattu ja rajattu; https://commons.wikimedia.org/wiki/File:Porte_de_Choisy_zone_des_fortifications,_va_disparaitre,_Romanichels,_PH8304(2).jpg | haettu |
| 3 | Piaf lauloi teininä kaduilla. Yökerhon omistaja Louis Leplée kuuli hänet kadulta vuonna 1935 ja antoi hänelle lempinimen la Môme Piaf: piaf on pariisilaista puhekieltä ja tarkoittaa varpusta. Laulaja oli alle 150 senttiä pitkä. Piaf levytti tunnetuimman laulunsa La Vie en rosen, ja sen sanat hän kirjoitti itse. | piaf1962: Édith Piaf laulamassa Rotterdamissa 1962 (piaf-django-piaf1962.jpg) | valokuva | Eric Koch / Anefo, Nationaal Archief, Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:Edith_Piaf_zingt_in_ons_land,_Bestanddeelnr_914-6438.jpg | haettu |
| 3 | Piaf lauloi teininä kaduilla. Yökerhon omistaja Louis Leplée kuuli hänet kadulta vuonna 1935 ja antoi hänelle lempinimen la Môme Piaf: piaf on pariisilaista puhekieltä ja tarkoittaa varpusta. Laulaja oli alle 150 senttiä pitkä. Piaf levytti tunnetuimman laulunsa La Vie en rosen, ja sen sanat hän kirjoitti itse. | belleville-nyt: Rue de Belleville 72 nykyään, Piafin muistolaatta (piaf-django-belleville-nyt.jpg) | valokuva | Polymagou, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:72_rue_de_Belleville,_Paris_20e_8.jpg | haettu |

Yhteensä: 4 haettu, 0 tilattu, 0 pidetään.

Mitat (pääaiheen paikka, arvio esikatselusta) ja rajatapaukset:

- belleville1910 (esirajaus: kyllä): katu ja talorivi täyttävät kuvan; ei yksittäistä pääaihetta, joka leikkautuisi (julisteseinä 45–90 % leveydestä). ESIRAJATTU: hiilivedos on pahvikehyksellä, jossa käsin kirjoitettu kuvateksti, päiväys, allekirjoitus ja leima; ne rajattiin pois sharpilla (left 870, top 557, 2118 × 1581 lähteen 3840 × 2995 -latauksesta), sen jälkeen nostokuva.mjs 3:2-rajaus (2118 × 1412). Kuva: rue de Belleville 212–214, helmikuu 1910, viisi vuotta ennen Piafin syntymää samalla kadulla (Piafin syntymätalo on numero 72, EI tämä talo). Kuvassa ei kasvoja. Sävy ruskehtava, ei muokattu. Kuva ei ole 1915 eikä tarinan talo: kuvateksti sanoo vuoden 1910.
- vaunut1913 (esirajaus: kyllä): vaunut 6–93 % leveydestä, ihmisryhmä 31–87 % leveydestä ja 45–92 % korkeudesta (arvio esikatselusta). ESIRAJATTU: print ympärillä kapea paperireuna, rajattu pois (46 px joka laidalta lähteen 3840 × 2989 -latauksesta, tulos 3748 × 2896), sitten 3:2-rajaus (3748 × 2499, keskitetty). Atget, 1913, Pariisin vallin vyöhyke (La Zone) Porte de Choisyn kohdalla, romanien asuntovaunut ("Romanichels"). Se on aito kuva paikasta ja ajasta, jossa romaniperheet asuivat Pariisin porttien luona, mutta EI Django Reinhardtin perhe (kuvassa ei väitetä niin; kuvateksti kuvaa vain paikkaa). Rajatapaus: vasen vaunu ja oikean vaunun katto menevät 75 %:n rajan yli häivytysalueelle, ihmiset (aidot kasvot) keskellä. Käy jaksoille 1 (asuntovaunu) ja 2 (tulipalo vaunussa).
- piaf1962 (esirajaus: ei): pää ja olkapäät 31–62 % leveydestä, 12–100 % korkeudesta (rintakuva, alareuna häivytyksessä), mikrofoni oikealla 72–98 %. Lähde 3648 × 2406 (3:2), rajaus 3609 × 2406. Aito valokuva (13.12.1962, Rotterdam; Piafin kasvot aidossa valokuvassa sallittu). Kuva on 27 vuotta tekstin hetkien jälkeen: kuvateksti sanoo vuoden 1962. VISA: kuvateksti ei saa mainita varpusta; tässä ei mainita. Vaihtoehto: 914-6444 (samanlainen), 914-6436 (kädet levällään, hahmo liian vasemmalla 75 %:iin).
- belleville-nyt (esirajaus: ei): ovi ja talon etuseinä keskellä: laatta 46–55 % leveydestä ja 21–27 % korkeudesta, sininen ovi 35–57 % leveydestä (arvio esikatselusta). Lähde 5418 × 3612 (3:2). Aito nykyvalokuva talosta rue de Belleville 72, jonka seinällä Piafin muistolaatta. RAJATAPAUS: kuva liittyy kappaleen 1 Belleville-mainintaan, ei kappaleeseen 3 (katulaulu, Leplée, La Vie en rose); ohjeen mukaan viimeinen kuva on nykyvalokuva paikasta, ja kappaleen 3 paikoille (Leplée, katu) ei löytynyt omaa nykykuvaa. Laatan teksti ei erotu 1200 px:ssä. Seinässä graffiteja ja kaupan alasvedetty sälekaihdin.

#### Perustelut

- Nosto on kolmikappaleinen (lunastus-taulukko), 4 kuvaa. Kappale 1: rue de Belleville 1910 ja asuntovaunut Pariisin vallilla 1913 (jälkimmäinen kattaa myös kappaleen 2 vaunutulipalon); kappale 3: Piaf 1962 ja nykykuva Bellevillestä. Kaikki neljä ovat aitoja valokuvia, ei tilauksia.
- Django Reinhardtin omaa kuvaa ei ole: ainoa riittävän iso vapaa kuva (Gottlieb, "Django Reinhardt (Gottlieb 07301)", public domain, 3584 × 3762) näyttää hänet kasvoineen ja kitaroineen 92 %:lla kuvan korkeudesta; 3:2-rajaus (63 % korkeudesta) leikkaa pään tai kitaran. Muut Gottlieb-kuvat ovat 1024 px (pienempiä kuin 1200 × 800 -rajaus sallii). Kappaleen 2 (tulipalo, kaksi sormea, Quintette) hetkeä ei ole valokuvattu. Ehdotus: tilata Codex-kuva "romanien asuntovaunu yöllä 1928, ikkunassa kynttilän hehku, ei ihmisiä lähellä" tai jättää kappale 2 Atgetin vaunukuvan varaan (nyt niin).
- Ei kasvoja tekoälykuvissa: ei tilauksia, ei havainnekuvia.

#### Hylätty

- Gottlieb 07301 ja muut Django-kuvat: ks. yllä. Quintette du Hot Club -kuva (Julien Farhi, CC BY 4.0): nykyajan esitys, ei 1934. Freimut Bahlo -kuvat (400 × 266): liian pieni.
- Muut Anefo-kuvat: 914-6436 (kädet levällään, hahmo 18–88 % leveydestä, ei mahdu 75 %:iin), 914-6439 (kaksi henkilöä, mukana kitaristi). Nykyinen 914-6440 (suunnitelman pidettävä kuva) on pystykuva 2406 × 3648: 3:2-rajaus jättää vain kasvokuvan keskiosan; hylätty paremman tilalle.
- Gossinin toinen kuva (Maisons 212 et 214, PH81289): pystykuva. Rol-valokuvat Saintes-Maries-de-la-Mer 1923: väärä paikka (Camargue).
- Piafin hauta Père-Lachaisessa ja Piaf-museo: ei haettu (kappaleen 3 paikka on katu, ei hautausmaa).

#### Visa

Kysymys: "Yökerhon omistaja kuuli Édith Piafin laulavan kadulla vuonna 1935 ja antoi hänelle lempinimen la Môme Piaf. Minkä linnun mukaan?" Vastaus: varpusen. Kuvissa ja kuvateksteissä ei mainita lintua. VAROITUS: nykyinen `kuva.lyhyt` ja `kuva.selite` ("lempinimi tarkoittaa varpusta"; selitteessä "tarkoittaa pariisilaisessa puhekielessä varpusta") paljastavat visan vastauksen; jos ne näytetään ennen kertojan kappaletta 3, vastaus paljastuu (KK päättää; en muuttanut mitään). Myös nykyinen kuvateksti kertoo Rotterdam 1962 -kuvasta, ei tekstin hetkistä.

#### Avoimet kysymykset KK:lle

1. Kappale 2 (Django, tulipalo, Quintette) on ilman Djangoa: vaunukuva 1913 kertoo vain asuntovaunuista. Tilataanko Codex-kuva (vaunu yöllä, ei ihmisiä) vai hyväksytäänkö nykyinen?
2. Viimeinen kuva (rue de Belleville 72 nykyään) liittyy kappaleen 1 mainintaan Bellevillestä, ei kappaleen 3 katulauluun; kappaleen 3 paikalle ei ole nykykuvaa.
3. Kuvat 1 (1910) ja 2 (1913) ovat aitoja mutta eivät ole tarinan hetkiä (Piafin syntymä 1915, Djangon vaunu 1910-luvun lopulta); kuvatekstit sanovat vuoden.
4. Kuvalistan `kertoja` on koko kappaleen teksti (kuvalle 2 kappaleet 1 ja 2 yhdessä).
