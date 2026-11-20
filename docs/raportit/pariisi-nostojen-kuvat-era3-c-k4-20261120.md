# K-4 erä 3 C: Pariisin 14 nähtävyysjutun kuvat (SK 20.11.2026, KK:n päätös 14.18)

Haara `sk/k4-era3-c-kuvat` (pohjana F-korjaus 5e3b14c64e, joka sisältää K-5:n 696166e4c4 ja tekstit b25b1cc54e), draft-PR, EI mainiin ennen KK:n sanaa. Kuvia ei ole ladattu ämpäriin: vientikuvat ovat kansiossa `/Users/Shared/Claude/luovutukset/sk-k4-era3-c/_ampari/` (41 jutun kuvaa kahtena kokona: 1200 × 800 ja -2048; SHA256SUMS samassa kansiossa; osoitteet `https://media.matkakirja.app/kuvat/<nimi>.jpg`). Notre-Damen 4 valmista kuvaa ovat kansiossa `_valmiina-ei-dataa/` (kohta 4.1). Pompidou-keskus ja Tour Montparnasse jäävät riville "odottaa oikeuksia": kuvia ei haettu, arkkia ei tehty (TEHTAVA, OIKEUDET).

## 1. M2: rikkeet ennen | nyt (C:n 14 juttua)

- **Ennen** (lähtöluettelo): 14 jutua rikkoo; vajaa 14, viimeinen 13, laji 12, tekija 12, mitat 12, lisenssi 1.
- **Nyt:** 3 jutua rikkoo; vajaa 3, viimeinen 2, laji 1, tekija 1, mitat 1. Korjattu 11 juttua: Riemukaari, Concorden aukio, Luxembourgin puisto, Sacré-Cœur, Panthéon, Tour Saint-Jacques, Saint-Eustache, Place des Vosges, Invalidit, Petit Palais ja Metro 1900 (3–4 kuvaa, viimeinen valokuva, laji, tekijä, lisenssi, mitat 1200 × 800).
- **Jäljellä:** Pompidou-keskus ja Tour Montparnasse (odottavat oikeuksia, ei Codex-tilausta) sekä Notre-Dame (vajaa: kohta 4.1). Tilattua kuvaa odottavia rikkeitä ei ole: tilauksia ei kirjoitettu.
- Lähtöluettelo `docs/raportit/pariisin-nostokuvat-rikkeet-lahto-20261120.json` pieneni 18 → 7 rikkovaa nostoa (jäljellä C: 3, F: 4 Curie, Lavoisier, Pasteur, Lumière, jotka poistuvat valikosta).
- Testit: täysi suite (kohta 6), `tests/nostokuvien-tasalaatu.test.mjs`, `tests/noston-jaksot.test.mjs`, `tests/kuvatekijat.test.mjs`, `tests/lisenssit.test.mjs` vihreät.

## 2. Kuvien tila juttu kerrallaan

| Juttu | Pidetään | Haettu | Tilattu | Kuvia datassa |
|---|---:|---:|---:|---:|
| Riemukaari | 0 | 4 | 0 | 4 |
| Concorden aukio | 0 | 4 | 0 | 4 |
| Luxembourgin puisto | 0 | 4 | 0 | 4 |
| Sacré-Cœur | 1 | 3 | 0 | 4 |
| Panthéon | 1 | 3 | 0 | 4 |
| Notre-Dame | 0 | 4 | 0 | 1 (4 valmiina, ei dataan: ks. 4.1) |
| Tour Saint-Jacques | 0 | 4 | 0 | 4 |
| Saint-Eustache | 0 | 3 | 0 | 3 |
| Place des Vosges | 0 | 3 | 0 | 3 |
| Invalidit | 0 | 4 | 0 | 4 |
| Petit Palais | 0 | 3 | 0 | 3 |
| Metro 1900 | 0 | 4 | 0 | 4 |
| **yhteensä** | 2 | 43 | 0 | 41 dataan (+4 Notre-Dame valmiina) |

Pidettävät kuvat (2): Sacré-Cœurin nykykuva (Giò Terra) ja Panthéonin heiluri (Benoît Prieur): datan kuvat haettiin uudelleen Commonsista ja rajattiin samalla työkalulla. Muut datan vanhat kuvat hylättiin (liian pieni, pystykuva, pääaihe ei mahdu 75 %:iin, tai kuva ei kerro kappaleensa asiaa); vanhoja ei poistettu palvelimelta, ne vain jäävät pois juttujen kuvalistasta.

## 3. M-rivit

- **M1 silmin:** luku 5 (jakso | kertoja sanoo | kuva | laji | lähde, tekijä, lisenssi, linkki | tila, juttu kerrallaan; jakso = kappale J1–J3) ja 12 kontaktiarkkia `docs/raportit/k4-era3-c-kontaktiarkit/<juttu>.jpg` (soikea reuna beigellä pohjalla, 1000 px leveä; Notre-Damen arkki näyttää valmiit 4 kuvaa). Jokainen arkki katsottu silmin ennen palautusta.
- **M2:** luku 1.
- **M3:** jokaisen haetun kuvan lisenssi ja tekijä luettu Commonsin rajapinnasta `tools/hae-commons.mjs`-työkalulla (peräkkäiset pyynnöt, ei virheitä), kuva katsottu silmin, rajattujen lähderivi päättyy "rajattu"; linkit luvussa 5.
- **M4:** Codexin tilauslista omana tiedostonaan `docs/raportit/pariisi-nostojen-kuvat-era3-c-codex-tilauslista-20261120.md`: **ei yhtään tilausta**, joka kohdalle löytyi aito kuva (rajatapaukset luvussa 4 päättää KK; jos hän haluaa havainnekuvan, pohjat kirjoitetaan sen jälkeen).
- **M5:** jokaisen jutun viimeinen kuva on valokuva (tasalaatutesti; Place des Vosgesin, Saint-Eustachen ja Petit Palais'n sarja on 3 kuvaa), jokaisella kuvalla laji-kenttä; havainnekuvia ei ole.
- **M6:** tilauksia ei ole, joten rivejä "aidot ehdokkaat ja miksi eivät kelpaa" ei tarvita; hylätyt aidot ehdokkaat on kirjattu luvun 5 kohtiin "Hylätty".
- **M7:** yksikään kuvateksti ei paljasta visan vastausta. Metro 1900: visan vastaus ("Tyyli meni pois muodista") on jutun kappaleessa 3; J1- ja J2-kuvat ovat 1899–1903 aikalaiskuvia sisäänkäynneistä eivätkä näytä purkamista tai tyylin muodista poistumista, J3-kuva näyttää jäljellä olevan sisäänkäynnin; kuvatekstit ilman lukuja 167, 88 tai "puolet". Metron vanha kuva-selite ("tehtiin 167, jäljellä 88") poistui kuvalistalta. Pulun kysymykset ennallaan.

## 4. Avoimet kohdat KK:lle (ei tekstimuutoksia omin päin)

1. **Notre-Dame (C-juttu): D-noston kuvamäärä.** Kohdekartan Notre-Dame-kohde linkittää D-noston `nosto-notre-damen-kukko`, joten jutun omat kuvat lisättäisiin D-noston 4 kuvan perään (vienti: nosto → kohde → juttu). Neljä uutta kuvaa (tukipilarit, Davidin kruunajaiset, tornit palon savussa, ilmakuva) antaisi D-nostolle 8 kuvaa (`liikaa`, uusi rike, joka kaataisi tasalaatutestin) ja näyttäisi palotarinan aikana mm. vuoden 1804 kruunajaiset. Siksi jutun data jätettiin ennalleen (1 kuva: Chabe01, sama kuin D-noston viimeinen) ja C-jutun rike `vajaa` jäi luetteloon. Kuvat ovat valmiina (`_valmiina-ei-dataa/`, kontaktiarkki mukana). Ratkaisu KK:lta: (A) vientisääntö, jossa kohdekartan linkin kautta tuleva jutun kuva ei lisää nostoon kuvia, kun nostolla on jo 4 (tools/vienti/nostokuvat.mjs, PK/NUI), jolloin kuvat otetaan käyttöön yhdellä komennolla; tai (B) 8 kuvaa hyväksytään D:lle; tai (C) C-juttu jää yhteen kuvaan. Ilmakuvan päivää Commons ei kerro (kuvassa nosturit; kappale puhuu joulukuun 2024 avaamisesta): tarkistettava ennen käyttöä.
2. **Riemukaari J2 Godefroy:** kuva on esirajattu aukkoon (kone ja pylväät, ei huippua eikä jalustaa), koska koko kaari täyttää lähteestä 94 % korkeudesta. Hyväksytäänkö vai tilataanko havainnekuva? J1:n kaaren yläreuna on 9 %:ssa.
3. **Concorden aukio:** J1-etsaus on 2:1, Gabrielin rakennusten päät leikkautuvat; J2 on yleinen giljotiinikuva (Demachy), ei nimenomaan Ludvig XVI:n mestaus; nykykuvassa suihkulähteen ylin suihku leikkautuu.
4. **Luxembourg:** Menzelin maalaus ei näytä jalavia eikä Franciniä; viimeisen kuvan lähde 1600 × 1200.
5. **Sacré-Cœur:** nykykuvan kupolin huippu 8 %:ssa; Savoyarde-kellosta ei kuvaa; Commonsissa nykykuva on luokissa "Retouched pictures" ja "Images with annotations" (sama kuva oli jo datassa).
6. **Panthéon:** J1:n hiilipiirros on tumma ja karkea (kupolin huippu 8 %, oikea reuna 92 %): tilataanko havainnekuva tilalle? J2:n piirroksessa lipun kärki 4 %:ssa. Mirabeaun ulossiirrosta ei vapaata kuvaa.
7. **Tour Saint-Jacques:** J3:n pullot ylittävät 75 %:n rajan 2–3 prosenttiyksiköllä; Pascal-patsas ja Via Turonensis ilman kuvaa (aidot kuvat pystykuvia); Pernot-piirrosten vuotta Commons ei anna (kuvateksti ei väitä vuotta); J1 ei näytä kirkkoa.
8. **Saint-Eustache:** Richelieu, Molière ja Maanviljelyksen temppeli eivät näy; 3 kuvaa riittää.
9. **Place des Vosges:** J1 Meyerin karuselli-kaiverrus on tiheä ja sen oma kirjainmerkintä näkyy; Victor Hugo ja turnajaiset ilman kuvaa; 3 kuvaa.
10. **Invalidit:** J1 Pérellen kaiverruksessa rakennus on 84 % leveydestä (yli 75 %), J2:ssa kupoli leikkautuu yläreunaan, nykykuvassa kupolin huippu 7 %.
11. **Petit Palais:** J1-kuvassa rakennus 76 % leveydestä; J2:n reunafiguurit ulottuvat 94 %:iin; 1902-museo ja Dutuit ilman kuvaa; 3 kuvaa.
12. **Metro 1900:** J3-nykykuvassa sisäänkäynti on 82 % korkeudesta; työmaakuvassa ei selvää pääaihetta ja Tour Saint-Jacques leikkautuu; arkkitehtikilpailusta ja päätepisteistä ei kuvaa. Kuvateksteissä "heinäkuussa 1899" ja "heinäkuussa 1900" tulevat Commons-otsikoista (kuvan PH-tunnukset luvussa 5). Noston `kuva`-kenttä korvattiin kuva + kuvat + valokuva -rakenteella ja jutun `kuvat` lukee ne noston datasta (yksi paikka).
13. **Pompidou-keskus ja Tour Montparnasse:** odottavat oikeuksia (kuva kuvalta, kortti oikeudet-ja-ansainta); ei kuvaa, ei arkkia.
14. **Ämpäri:** 41 kuvaa (82 tiedostoa, SHA256SUMS) vietävä ämpäriin ennen PR:n yhdistämistä; nimet `<juttu>-<avain>.jpg` ja `-2048.jpg`, eivät ylikirjoita mitään.
15. **Haara:** `sk/k4-era3-c-kuvat`, PR vasta KK:n sanalla, yhtä aikaa PR:ien 7223, 7246, 7247 ja F-korjauksen kanssa.

## 5. Kuvataulukot ja perustelut juttu kerrallaan (agenttien raportit, SK tarkistanut kontaktiarkit silmin)

### 5.1 Riemukaari

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Pariisin Riemukaari on lähes 50 metriä korkea voitonmerkki, jonka keisari Napoleon ei koskaan nähnyt valmiina. Hän käski rakentaa sen vuonna 1806 juhlistamaan Austerlitzin taistelun voittoa, mutta kaari saatiin valmiiksi vasta vuonna 1836. Sen pintoihin on kaiverrettu yli sadan taistelun ja satojen sotapäälliköiden nimet. | 1890: Riemukaari noin 1890–1900 (1890) | valokuva | Detroit Publishing Co. (tuntematon tekijä), Library of Congress / Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:Arc_de_Triomphe_de_l'Etoile,_Paris,_France,_ca._1890-1900.jpg | haettu |
| 2 | Vuonna 1919 lentäjä Charles Godefroy lensi kaksitasokoneellaan kaaren läpi. Temppu oli uskomaton, sillä aukko on vain reilut 14 metriä leveä. Reilua vuotta myöhemmin kaaren alle haudattiin nimetön ranskalaissotilas muistoksi sodassa kaatuneista: hänet tuotiin sinne 11. marraskuuta 1920 ja haudattiin 28. tammikuuta 1921. | godefroy: Godefroyn kaksitaso kaaren alla 1919 (godefroy) | valokuva | Tuntematon tekijä (Spaarnestad Photo), Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:Parijs_(Frankrijk)_Waaghalzerij_in_de_lucht,_SFA006011795.jpg | haettu |
| 2 | Vuonna 1919 lentäjä Charles Godefroy lensi kaksitasokoneellaan kaaren läpi. Temppu oli uskomaton, sillä aukko on vain reilut 14 metriä leveä. Reilua vuotta myöhemmin kaaren alle haudattiin nimetön ranskalaissotilas muistoksi sodassa kaatuneista: hänet tuotiin sinne 11. marraskuuta 1920 ja haudattiin 28. tammikuuta 1921. | hauta1921: Tuntemattoman sotilaan hautaus 28. tammikuuta 1921 (hauta1921) | valokuva | Agence Rol / Gallica (BnF), Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:28-1-21,_inhumation_du_soldat_inconnu_%C3%A0_l'%C3%89toile_-_btv1b530536002.jpg | haettu |
| 3 | Tuntemattoman sotilaan haudalla palaa ikuinen liekki, joka sytytetään uudelleen joka ilta. | liekki: Ikuinen liekki tuntemattoman sotilaan haudalla (liekki) | valokuva | Guilhem Vellut, Wikimedia Commons (CC BY 2.0), rajattu; https://commons.wikimedia.org/wiki/File:Flame_%40_Tombe_du_Soldat_Inconnu_%40_Arc_de_Triomphe_%40_Paris_(15455203801).jpg | haettu |

Yhteensä: 4 haettu, 0 tilattu, 0 pidetään. Kuvajärjestys: J1, J2, J2, J3 (viimeinen nykyvalokuva).

Mitat ja rajatapaukset: ks. KUVALISTA.json kentät `paikka` ja `huom` (arviot esikatselusta).

- 1890: kaari kokonaan 24–74 % leveydestä, 9–82 % korkeudesta. Rajatapaus: yläreuna 9 % (alle 12,5 %:n häivytysrajan), 75 %:n laatikko 12,5–87,5 %. 3:2-rajaus on jo kuvan ylälaidassa, joten ei siirrettävissä.
- godefroy: kone kaaren aukossa keskellä, kaaren huippu ja jalusta eivät näy (esirajaus 0,5). RAJATAPAUS, ks. alla.
- hauta1921: arkku 54–70 % x, 33–52 % y; puhdas rajaus (negatiivin reuna ja käsinkirjoitus pois).
- liekki: liekki ja alusta keskellä; liekki himmeä päivänvalossa.

#### Perustelut

- J1: 1890-luvun fotokromi näyttää kaaren kokonaan (valmistunut 1836, kuva otettu 1890-luvulla). Valittu modernien kuvien sijaan, koska nykykuvissa kaari täyttää 3:2-kuvasta 91–94 % korkeudesta (Láscar 2014, Jiuguang Wang 2010 = nykyinen datan kuva, tämä ei mahdu 75 %:iin) ja viimeinen kuva on liekki.
- J2: Godefroy 1919 ja hautaus 28.1.1921 (kaksi kuvaa samalle kappaleelle, kertoja sanoo molemmat).
- J3: ikuinen liekki (nykyvalokuva, Vellut 2014).
- Nykyisen datan kuva (Jiuguang Wang, CC BY-SA 2.0, 4192 × 3168): kaari täyttää 90 % korkeudesta 3:2-rajauksessa, ei mahdu; ei pidetä.

#### Hylätty

- Godefroy flight.jpg (Mortane, PD, 1274 × 944): kaari 94 % korkeudesta; esirajaus antaisi alle 1200 px leveän kuvan. Spaarnestad-kuva (2498 × 1966) valittu esirajattuna.
- Front view Láscar 2014, Arc de Triomphe (2017) xiquinhosilva: kaari täyttää kuvan; Chris Light 'Arc Eternal Flame': pieni lähde, vain laatta ja kukkia, liekkiä ei näy, filmikuvan tummat reunat.
- Muut Agence Rol 28-1-21 -kuvat: lasinegatiivin reunat, kaari ei näy, väkijoukko ilman selvää aihetta; arkunlasku (63435) ja arkku (63454) parhaat, 63454 valittu.

#### Avoimet kysymykset KK:lle

1. Godefroy-kuva on esirajattu aukkoon (kone + kaaren pylväät, ei huippua eikä jalustaa). Hyväksytäänkö, vai tilataanko havainnekuva, jossa kaari kokonaan keskellä ja kone aukossa? (En kirjoittanut tilausta: aito 1919-kuva on olemassa ja näyttää juuri kerrotun hetken.)
2. 1890-kuvassa kaaren yläreuna 9 % (rajatapaus).
3. J1-kuva on 1890-luvun fotokromi (käsin väritetty), ei nykykuva; viimeinen kuva liekki.


### 5.2 Concorden aukio

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Concorden aukio on Pariisin suurin aukio, ja siellä mestattiin kuningas. Arkkitehti Ange-Jacques Gabriel suunnitteli sen 1700-luvulla kuningas Ludvig XV:n kunniaksi. | aukio1700: Louis XV:n aukio ja kuninkaan ratsastajapatsas (aukio1700) | piirros | Tuntematon etsaaja, Rijksmuseum / Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:Gezicht_op_de_Place_Louis_XV_te_Parijs_Vues_de_Paris_(serietitel)_Gezichten_op_Parijs_(serietitel),_RP-P-1957-83.jpg | haettu |
| 2 | Vallankumouksen aikana aukiolle pystytettiin giljotiini. Vuonna 1793 siellä mestattiin kuningas Ludvig XVI, ja samana vuonna myös kuningatar Marie Antoinette. Kaikkiaan aukiolla teloitettiin yli tuhat ihmistä. | giljotiini: Mestaus giljotiinilla Vallankumouksen aukiolla (giljotiini) | maalaus | Pierre-Antoine Demachy, Musée Carnavalet / Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:Pierre-Antoine_Demachy_-_Une_ex%C3%A9cution_capitale,_place_de_la_R%C3%A9volution_-_P1980_-_Mus%C3%A9e_Carnavalet.jpg | haettu |
| 3 | Vuonna 1830 Egyptin hallitsija lahjoitti Ranskalle 3 300 vuotta vanhan Luxorin obeliskin. Kivijättiläinen tuotiin laivalla Niililtä asti ja pystytettiin aukiolle vuonna 1836 valtavan väkijoukon seuratessa. Nykyään 23-metrisen obeliskin ympärillä poreilevat suihkulähteet, ja aukiota reunustavat naispatsaat, jotka kuvaavat Ranskan suurkaupunkeja. | obeliski1836: Luxorin obeliskin pystytys aukiolla 1836 (obeliski1836) | maalaus | François Dubois (maalaus), kuvannut Jean-Pierre Dalbéra, Wikimedia Commons (CC BY 2.0), rajattu; https://commons.wikimedia.org/wiki/File:%C3%89rection_de_l'Ob%C3%A9lisque_sur_la_place_de_la_Concorde_de_Fran%C3%A7ois_Dubois_(Petit_Palais,_Paris).jpg | haettu |
| 3 | Vuonna 1830 Egyptin hallitsija lahjoitti Ranskalle 3 300 vuotta vanhan Luxorin obeliskin. Kivijättiläinen tuotiin laivalla Niililtä asti ja pystytettiin aukiolle vuonna 1836 valtavan väkijoukon seuratessa. Nykyään 23-metrisen obeliskin ympärillä poreilevat suihkulähteet, ja aukiota reunustavat naispatsaat, jotka kuvaavat Ranskan suurkaupunkeja. | nyt: Suihkulähde ja obeliski Concorden aukiolla (nyt) | valokuva | Rodrigo Menezes, Wikimedia Commons (CC BY-SA 3.0), rajattu; https://commons.wikimedia.org/wiki/File:Obelisk_and_fountain_in_Place_de_la_Concorde,_Paris.JPG | haettu |

Yhteensä: 4 haettu, 0 tilattu, 0 pidetään. Kuvajärjestys J1, J2, J3, J3 (viimeinen nykyvalokuva). Mitat ja rajatapaukset: KUVALISTA.json kentät `paikka` ja `huom` (arviot esikatselusta).

- aukio1700 (esirajaus 0,5): patsas ja rakennusten sisäpäät keskellä. RAJATAPAUS: etsaus on 2:1, Gabrielin rakennusten ulkopäät leikkautuvat reunoihin; ylhäällä paljon taivasta.
- giljotiini (esirajaus 0,9, kehys pois): koroke ja giljotiini keskellä, rakennukset taustalla; 75 %:n sisällä.
- obeliski1836 (esirajaus 0,9): obeliski ja telineet 35–90 % x, 43–76 % y; sisällä.
- nyt: obeliski ja suihkulähde sisällä; RAJATAPAUS: suihkulähteen ylin suihku leikkautuu lähteen yläreunaan, alanurkassa kaksi turistia.

#### Perustelut

- J1: aito aikalaisetsaus, jossa Ludvig XV:n patsas ja Gabrielin kaksoisrakennukset. Hylätty: Vienin maalaus patsaan vihkiäisistä 1763 (Carnavalet): pääosassa ratsastajat, aukiota ei näy, patsaan huippu 5 %:ssa; Née:n väritetty näkymä (G.33194): koko aukio, mutta rakennusryhmä vain 65–90 % korkeudesta ja taivasta 60 %.
- J2: Demachyn maalaus ei esitä nimenomaan kuningasta (Commonsin otsikko: yleinen teloitus), vaan giljotiinia aukiolla; kertoja sanoo ensin "pystytettiin giljotiini". Graafisemmat 1793-kaiverrukset (mestattu pää nostettuna) jätetty pois.
- J3: Duboisin maalaus pystytyksestä (kertoja: "pystytettiin ... valtavan väkijoukon seuratessa") ja nykykuva suihkulähteestä ja obeliskista (kertoja: "nykyään ... suihkulähteet").
- Naispatsaille (Strasbourg, Lille ym.) ei lisätty omaa kuvaa (4 kuvan raja); Moonikin CC BY-SA -patsaskuvat olisivat mahdollinen 5. kuva.
- Nykyinen datan kuva (Obelisk and fountain, Rodrigo Menezes) kelpasi ja on käytössä esirajattuna.

#### Hylätty

- Láscar Obélisque de Louxor (22284134310): obeliski oikeassa reunassa, 70 % taivasta. Yökuvat (maailmanpyörä): pimeitä. Moonikin suihkulähteen lähikuva: ei aukiota.
- Kaiverrukset Ludvig XVI:n mestauksesta (G.287xx): graafisia ja tekstirivejä alareunassa.

#### Avoimet kysymykset KK:lle

1. J1-kuva on 2:1-etsaus, rakennusten ulkopäät leikkautuvat: hyväksytäänkö, vai tilataanko Codex (kokonaan näkyvä aukio patsaineen)?
2. Hyväksytäänkö J2-kuva yleisenä giljotiinikuvana (ei nimenomaan Ludvig XVI)?
3. Naispatsaille oma kuva (5. kuva)?


### 5.3 Luxembourgin puisto

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Luxembourgin puiston loi Pariisiin kuningatar, joka kaipasi omaa palatsia. Kun kuningas Henrik IV murhattiin vuonna 1610, hänen leskensä Maria de’ Medici jäi hallitsemaan Ranskaa poikansa puolesta. Hän osti vuonna 1612 Luxembourgin kartanon ja rakennutti sen viereen palatsin, jonka esikuvana oli hänen kotikaupunkinsa Firenzen Palazzo Pitti. | palatsi1600: Luxembourgin palatsi puutarhan puolelta (vedos) (palatsi1600) | piirros | Adam Pérelle, Musée Carnavalet / Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:Veu%C3%AB_et_Perspective_de_Luxembourg_du_cost%C3%A9_du_Jardin,_a_present_appel%C3%A9_Palais_d'Orleans._G.22300_(3_of_3).jpg | haettu |
| 2 | Puistoon istutettiin jalavia, ja muotoilussa oli mukana firenzeläinen suihkulähdemestari Tommaso Francini. Puisto on kasvanut ja kutistunut vallanpitäjien mukana: Napoleon III:n katutyöt veivät 1860-luvulla osan siitä. | menzel: Väkeä Luxembourgin puistossa, maalaus 1876 (menzel) | maalaus | Adolph von Menzel, Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Im_Luxemburggarten_(1876).jpg | haettu |
| 3 | Nykyinen nukketeatteri on toiminut puistossa vuodesta 1933, ja kahdeksankulmaisella altaalla lapset uittavat purjeveneitä. Patsaita on toista sataa, muiden muassa kaksikymmentä kuningatarta ja merkkinaista. Palatsissa kokoontuu nykyään senaatti. | nukketeatteri: Nukketeatteri puistossa, 1933 (nukketeatteri) | valokuva | Agence Rol / Gallica (BnF), Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:16-2-33,_pose_de_la_1%C3%A8re_pierre_du_th%C3%A9%C3%A2tre_des_marionnettes_(spectacle_de_marionnettes_en_plein_air,_jardin_du_Luxembourg)_-_btv1b532656069.jpg | haettu |
| 3 | Nykyinen nukketeatteri on toiminut puistossa vuodesta 1933, ja kahdeksankulmaisella altaalla lapset uittavat purjeveneitä. Patsaita on toista sataa, muiden muassa kaksikymmentä kuningatarta ja merkkinaista. Palatsissa kokoontuu nykyään senaatti. | nyt: Luxembourgin palatsi ja allas, purjeveneitä (nyt) | valokuva | Dinkum, Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:Bassin_et_bateaux_devant_le_S%C3%A9nat.jpg | haettu |

Yhteensä: 4 haettu, 0 tilattu, 0 pidetään. Kuvajärjestys J1, J2, J3, J3 (viimeinen nykyvalokuva). Mitat ja rajatapaukset: KUVALISTA.json kentät `paikka` ja `huom` (arviot esikatselusta).

- palatsi1600 (esirajaus 0,68): palatsi 26–74 % x, 26–55 % y; 75 %:n sisällä, lähes 60 %:n tavoitteessa.
- menzel (esirajaus 0,95): maalaus täyttää kuvan, ei yksittäistä rakennusta; sisältö vain löyhästi J2:n mukainen (ks. avoimet).
- nukketeatteri (esirajaus 0,9): koroke ja nuket 6–52 % x; lasinegatiivin reuna ja numero rajattu pois mitattuna.
- nyt (ei esirajausta; lähde 1600 × 1200): palatsi 22–93 % x (71 %), 17–52 % y; veneet alhaalla 74–91 %. Lähde pieni, rajatapaus.

#### Perustelut

- J1: Maria de' Medicin palatsi puutarhan puolelta (Pérelle-kaiverrus). Medici-muotokuvat (Rubens, Pourbus; pystykuvia, kasvot täyttävät kuvan: eivät mahdu 75 %:iin 3:2-rajauksessa) ja Marotin/Silvestren julkisivukaiverrukset (palatsi 85–95 % leveydestä, ei mahdu) hylätty. Palazzo Pitti on vain J1:n sivulause; ei omaa kuvaa.
- J2: Menzel 1876 (aito maalaus Napoleon III:n jälkeiseltä ajalta). Kappaleen asiat (jalavat 1600-luvulla, Francini, katutyöt) eivät ole kuvattavissa suoraan; Haussmannin 1861 suunnitelmakartta ja Turgot-kartta 1739 hylättiin kartan tekstien takia. Jos KK haluaa täsmällisemmän kuvan, vaihtoehto on Turgot-kartta (puurivit ja laajat puutarhat, sisältää kadunnimitekstiä) tai Codex.
- J3: nukketeatteri 1933 (aito aikalaiskuva) + nykykuva altaasta, purjeveneistä ja palatsista (senaatti). Patsaille/kuningattarille ei omaa kuvaa (4 kuvan raja).
- Nykyiset datan kuvat (Sunday in the Luxembourg Gardens, May 2014; Edelfeltin maalaus): eivät käytössä. Sunday-kuvassa palatsi on pieni keskellä (noin 45 % leveydestä) ja allas vain vihjattu; Edelfeltin maalauksessa pääaihe ovat lapset ja hoitajat (lähikuva, palatsi taustalla). Dinkumin kuva näyttää altaan, purjeveneet ja palatsin, eli kertojan J3.

#### Hylätty

- Marot G.22514 / G.22512, Silvestren julkisivut: palatsi 85–95 % leveydestä.
- Pérelle G.22875 (lintuperspektiivi): rakennus täyttää kuvan.
- Haussmann-suunnitelma 1861: teksti kuvassa (otsikko, selitteet, kadunnimet).
- Atget Guignol (aikuisten ja lasten selkiä, ruskea sävy, 3840 × 3120): kuvassa myös harppu ja leikkautuneita hahmoja; ei kehystä, mutta jätetty pois Rol-kuvan hyväksi.
- Clément Maurice 1897 Grand Bassin: kirjan sivu, kuvateksti ja kehys.
- Chabe01 / Vellut -allaskuvat: palatsi ei näy tai vain kulmassa.

#### Avoimet kysymykset KK:lle

1. J2-kuva (Menzel) ei näytä jalavia eikä Franciniä: hyväksytäänkö yleiskuvana puistosta, vai vaihdetaanko Turgot-karttaan tai tilataanko?
2. J3 viimeinen kuva on lähteeltään pieni (1600 × 1200), palatsi 71 % leveydestä.
3. Nukketeatterikuva on 1933 aikalaisvalokuva ulkoilmaesityksestä (peruskiven lasku), ei nykyisestä rakennuksesta.


### 5.4 Sacré-Cœur

#### Kuvat

| Kappale | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Sacré-Cœur eli Pyhän sydämen basilika kohoaa Montmartren kukkulan huipulla. Ranska hävisi sodan Preussille vuosina 1870–1871, ja häviön jälkeen annettiin kansallinen lupaus rakentaa Jeesuksen sydämelle omistettu kirkko sovitukseksi. Kansalliskokous hyväksyi hankkeen vuonna 1873, ja Paul Abadie valittiin kirkon suunnittelijaksi lähes 80 ehdotuksen joukosta. Rakennustyöt alkoivat vuonna 1875, ja kirkko valmistui pääosin vuonna 1914 ja vihittiin käyttöön 1919. | rakennus: Sacré-Cœurin rakennustyömaa Montmartrella 1882 (sacre-coeur-rakennus.jpg) | valokuva | Louis-Émile Durandelle, Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:Louis-%C3%89mile_Durandelle,_Construction_du_Sacr%C3%A9-C%C5%93ur,_1882.jpg | haettu |
| 2 | Ulkoseinät on tehty erikoisesta kalkkikivestä, joka valkenee sateella ja pysyy siksi valkoisena. Kirkko hohtaa yhä, vaikka se on jo yli sata vuotta vanha. Sisällä kattoa koristaa yksi maailman suurimmista mosaiikeista, jonka ala on noin 470 neliömetriä. | mosaiikki: Apsiksen Kristus-mosaiikki Sacré-Cœurin sisällä (sacre-coeur-mosaiikki.jpg) | valokuva | Jorge Láscar, Wikimedia Commons (CC BY 2.0), rajattu; https://commons.wikimedia.org/wiki/File:Sacr%C3%A9-C%C5%93ur_Basilica_and_the_mosaic_%22Christ_in_Majesty%22_in_the_apse,_one_of_the_largest_of_the_world_(22483996851).jpg | haettu |
| 3 | Tornissa riippuu ”Savoyarde”, Ranskan suurin kello, joka painaa lähes 19 tonnia. Kirkon huipulta avautuu näkymä koko Pariisiin. | nakyma: Näkymä Pariisiin Sacré-Cœurin kupolilta (sacre-coeur-nakyma.jpg) | valokuva | Pline, Wikimedia Commons (CC BY-SA 3.0), rajattu; https://commons.wikimedia.org/wiki/File:Paris_view_from_Sacre_Coeur_DSC_0371.JPG | haettu |
| 3 | Tornissa riippuu ”Savoyarde”, Ranskan suurin kello, joka painaa lähes 19 tonnia. Kirkon huipulta avautuu näkymä koko Pariisiin. | nyt: Sacré-Cœur Montmartren kukkulan huipulla (sacre-coeur-nyt.jpg) | valokuva | Giò Terra, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Paris_-_Basilique_du_Sacr%C3%A9-C%C5%93ur_de_Montmartre_-_2025-09-30_23-31-57_001.jpg | pidetään |

Yhteensä: 3 haettu, 0 tilattu, 1 pidetään.

Mitat (pääaiheen paikka, arvio esikatselusta) ja rajatapaukset:

- rakennus (esirajaus: kyllä): rakennustyömaan telineet 35–68 % leveydestä ja 17–36 % korkeudesta, kukkula 3–90 % leveydestä; etualalla työmiehiä 80–95 % korkeudessa (arvio esikatselusta). Lähde 5297 × 3400 (ladattu 3840 × 2465), rajaus 2958 × 1972 (osuus 0,8). Aito aikalaisvalokuva (Commonsin kuvaus: square Saint-Pierre 1877, otsikko 1882). Näyttää rakennustyön alun Montmartren kukkulalla, ei valmista kirkkoa. Ei tekstiä, ei kehystä. Rajaus: lähde 3840 × 2465 -> 2958 × 1972.
- mosaiikki (esirajaus: kyllä): apsiksen mosaiikki 43–86 % leveydestä ja 33–70 % korkeudesta (arvio esikatselusta). Lähde 7360 × 4912 (ladattu 3840 × 2563), rajaus 1920 × 1280 (osuus 0,5). Rajatapaus: mosaiikin oikea reuna 86 %:ssa, hieman alle 87,5 %:n rajan. Kertoja sanoo mosaiikista kappaleen 2 viimeisessä virkkeessä; kappaleen ensimmäisen osan (valkoinen kalkkikivi) näyttää viimeinen nykykuva. Rajaus: lähde 3840 × 2563 -> 1920 × 1280.
- nakyma (esirajaus: ei): Pariisin näkymä 25–85 % leveydestä ja 20–90 % korkeudesta, kupolin ja tornin osat reunoilla 0–22 % ja 80–95 % (arvio esikatselusta). Lähde 4928 × 3264 (ladattu 3840 × 2543), rajaus 3815 × 2543 (3:2, koko kuva). Commonsin kuvaus: "View of Paris from the dome of the Sacre Coeur". Kappale 3: "Kirkon huipulta avautuu näkymä koko Pariisiin". Savoyarde-kellosta ei löytynyt vapaata kuvaa (ainoa Commons-kuva 238 × 377 px).
- nyt (esirajaus: ei): basilika 29–71 % leveydestä, 8–84 % korkeudesta (kuvan huippu 8 %:ssa, alareuna terassi 85–97 %) (arvio esikatselusta). Nykyinen datan kuva (sama Commons-tiedosto), uudelleenrajattu: lähde 9228 × 7488 (ladattu 3840 × 3116), rajaus 3840 × 2560 ylhäältä (y 0). Rajatapaus: kupolin huipun risti 8 %:ssa (12,5 %:n häivytysalueen sisällä, korkeampaa ei saa koska rajaus on jo kuvan yläreunassa; ei muokkausta). Commons-luokissa "Retouched pictures" ja "Images with annotations" (kuvaussivun merkintöjä, kuvassa itsessään ei tekstiä). Etualalla pieniä ihmisiä nurmella (häivytysalueella).

#### Perustelut

- Nosto: 4 kuvaa. Kappale 1: Durandelle 1882 -valokuva rakennustyömaasta Montmartren kukkulalla (hanke, rakennus alkoi 1875). Abadien 1874 suunnitelmapiirros (Marville, CC0, Musée Carnavalet) olisi kuvannut "Abadie valittiin suunnittelijaksi", mutta se on arkkitehtipiirros ilman kokonaista rakennusta; valokuva työmaasta sopii paremmin.
- Kappale 2: apsiksen mosaiikki (Láscar). Kappale 3: näkymä kupolilta (Pline). Viimeinen: nykyinen datan valokuva (Giò Terra), uudelleenrajattu ylhäältä.
- Ennakko: kuvat 1–3 eivät näytä myöhempää kappaletta; kuvateksteissä ei päivää eikä kuukautta.

#### Hylätty

- Abadien piirros 1874 (Marville): ks. yllä. Durandelle 1879 a/b/c, 1884 ja muut työmaakuvat: samaa sarjaa, ei parempia. Luce "La Construction du Sacré-Coeur" (maalaus, Public domain): ladattu ja katsottu, ei käytetty (aito aikalaisvalokuva Durandelle valittu).
- Láscar "Sacré-Cœur Basilica" -sarjan ulkokuvat (22264878739, 21831154244): harmaa taivas, rakennus leikkautuu vinosti, ihmisiä lähikuvassa. Sisäkuva 22448252066: mosaiikki pieni ja tumma.
- Savoyarde-kello: Commonsissa vain 238 × 377 px (CC BY-SA 3.0) ja pieniä vanhoja postikortteja; ei kuvaa kellosta, joten kappaleen 3 kello jää kuvaamatta (näkymä kupolilta kuvaa toisen virkkeen).
- Ei tilauksia.

#### Avoimet kysymykset KK:lle

1. Nykykuvan (Giò Terra) kupolin huippu on 8 %:ssa (rajaus jo kuvan yläreunassa); hyväksytäänkö, vai etsitäänkö toinen? Commonsissa kuva on luokissa "Retouched pictures" ja "Images with annotations" (kuvaussivun merkinnät; kuvassa ei tekstiä). Datassa kuva on jo käytössä.
2. Kappaleen 2 ensimmäinen virke (valkoinen kalkkikivi) näkyy vain viimeisessä nykykuvassa, joka tulee kappaleen 3 jälkeen.


### 5.5 Panthéon

#### Kuvat

| Kappale | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Panthéon on Pariisin kirkko, josta tuli suurmiesten hautapaikka. Kuningas Ludvig XV sairastui vakavasti sotaretkellä ja lupasi, että jos hän toipuu, Pariisin suojeluspyhimys Geneviève saa uuden kirkon. Kuningas toipui, ja Soufflot’n suunnitteleman kirkon rakennustyöt alkoivat 1750-luvulla. | rakennus: Sainte-Genevièven kirkon rakennustyömaa piirroksessa (pantheon-rakennus.jpg) | piirros | Georges Michel, Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:Construction_de_l'Eglise_Ste_Genevi%C3%A8ve_-_dessin_-_Georges_Michel_-_btv1b10303451j_(1_of_2).jpg | haettu |
| 2 | Työ kesti yli kolmekymmentä vuotta: Soufflot kuoli, ja hänen oppilaansa Jean-Baptiste Rondelet sai kirkon valmiiksi vasta 1790. Vuonna 1791 kansalliskokous määräsi kirkon suurmiesten hautapaikaksi. Ensimmäisenä kryptaan kannettiin kreivi Mirabeau, mutta vuonna 1794 hänet kannettiin ulos, kun hänen salaiset yhteytensä hoviin paljastuivat. | hautapaikka: Panthéon suurmiesten temppelinä 1790-luvun piirroksessa (pantheon-hautapaikka.jpg) | piirros | Jean-Baptiste Hilaire, Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:Panth%C3%A9on_Fran%C3%A7ais_-_dessin_-_JB_Hilair_-_btv1b103034772.jpg | haettu |
| 3 | Vuonna 1851 fyysikko Léon Foucault ripusti kupolista 67 metriä pitkän heilurin ja näytti, että maa kääntyy sen alla. Heiluri poistettiin jo samana vuonna, mutta kopio heiluu holvin alla yhä. Kryptassa lepäävät muiden muassa Voltaire ja Victor Hugo, ja Marie Curie siirrettiin sinne 1995 ensimmäisenä naisena omien ansioidensa perusteella. | heiluri: Foucaultin heiluri Panthéonin lattialla (pantheon-heiluri.jpg) | valokuva | Benoît Prieur, Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:Foucault_pendulum_at_Panth%C3%A9on_de_Paris,_August_2023.JPG | pidetään |
| 3 | Vuonna 1851 fyysikko Léon Foucault ripusti kupolista 67 metriä pitkän heilurin ja näytti, että maa kääntyy sen alla. Heiluri poistettiin jo samana vuonna, mutta kopio heiluu holvin alla yhä. Kryptassa lepäävät muiden muassa Voltaire ja Victor Hugo, ja Marie Curie siirrettiin sinne 1995 ensimmäisenä naisena omien ansioidensa perusteella. | nyt: Panthéonin julkisivu ja kupoli nykyään (pantheon-nyt.jpg) | valokuva | Maksim Sokolov, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Panth%C3%A9on_de_Paris_in_July_2022_(2).jpg | haettu |

Yhteensä: 3 haettu, 0 tilattu, 1 pidetään.

Mitat (pääaiheen paikka, arvio esikatselusta) ja rajatapaukset:

- rakennus (esirajaus: kyllä): telineet 25–62 % leveydestä ja 20–70 % korkeudesta, kupoli 65–92 % leveydestä ja 8–60 % korkeudesta (arvio esikatselusta). Lähde 6921 × 5867 (ladattu 3840 × 3255), rajaus 3456 × 2304 (osuus 0,9; passe-partoutin kirjoitus ja numerot rajattu pois). Hiilipiirros rakenteilla olevasta kirkosta (otsikko "Construction de l'Eglise Ste Geneviève"); piirtäjä Georges Michel (1763–1843), tarkkaa piirtämisvuotta Commons ei anna. Rajatapaus: kupolin huippu 8 %:ssa, oikea reuna 92 %:ssa; piirros tumma ja karkea. HYLÄTTY: Soufflotin 1780 julkisivukaiverrus (kehys ja kirjoitus, rakennus 74 % korkeudesta, ei mahdu 3:2-rajaukseen) ja Premier projet 1756 (kolme kuvaa samalla arkilla). Rajaus: lähde 3840 × 3255 -> 3456 × 2304.
- hautapaikka (esirajaus: kyllä): rakennus 12–72 % leveydestä, 4–85 % korkeudesta (lipun kärki 4 %:ssa, portaat 85 %); väkeä ja hevosia etualalla 82–95 % (arvio esikatselusta). Lähde 6344 × 4593 (ladattu 3840 × 2780), rajaus 3648 × 2432 (osuus 0,95; Commonsin tiedot "1789-1799"). Akvarellipiirros: portiikissa kirjoitus "AUX GRANDS HOMMES LA PATRIE RECONNOISSANTE" = kappaleen 2 suurmiesten hautapaikka (1791). Rajatapaus: lipun kärki 4 %:ssa (häivytysalueella; 0,9-osuus nosti jalustan 92 %:iin, joten valittiin tämä). Paperin kapea reuna (0–1 %) ja alareunan kirjoitus "Panthéon Français" (97–99 %) jäävät täysin häivytysalueelle (nurkat ja uloin reuna katoavat). Kuvassa pieniä ihmisiä, ei lähikuvia. Rajaus: lähde 3840 × 2780 -> 3648 × 2432.
- heiluri (esirajaus: kyllä): heilurin kuula 37–44 % leveydestä ja 26–37 % korkeudesta, lasilevy 46–97 % leveydestä ja 32–72 % korkeudesta, lattiakuvio keskellä (arvio esikatselusta). Nykyinen datan kuva (sama Commons-tiedosto), uudelleenrajattu: ladattu 3840 × 2880, rajaus 2688 × 1792 (osuus 0,7). Kappale 3: nykyinen kopio heiluu holvin alla. Yläreunassa kävijöiden jalat ja vartalot (ei kasvoja). Rajaus: lähde 3840 × 2880 -> 2688 × 1792.
- nyt (esirajaus: ei): rakennus 8–85 % leveydestä, 10–86 % korkeudesta (kupolin risti 10 %:ssa) (arvio esikatselusta). Lähde 5145 × 3598 (ladattu 3840 × 2685), rajaus 3840 × 2560 (y 0). Aito nykyvalokuva: kupoli ja portiikki Place du Panthéonilta, sininen taivas. Kuvassa muutama pieni ihmishahmo. Rajatapaus: risti 10 %:ssa. Korvaa datan nykykuvan (Osmenda 2011), jonka tilalle tämä tuli, koska Osmendan kuva on lähes sama näkymä mutta vanhempi; Osmendan kuva on silti käyttökelpoinen varakuva (ei rajattu).

#### Perustelut

- Nosto: 4 kuvaa. Kappale 1: hiilipiirros rakenteilla olevasta kirkosta (Georges Michel). Kappale 2: akvarellipiirros "Panthéon Français" (Hilaire), portiikin kirjoitus "Aux grands hommes la patrie reconnoissante" = suurmiesten hautapaikka 1791. Kappale 3: Foucaultin heiluri (datan nykyinen kuva, uudelleenrajattu). Viimeinen: Panthéonin julkisivu ja kupoli nykyään (Sokolov).
- Datan nykykuva Osmenda 2011 (Panthéon, Paris 15 August 2011) vaihdettiin Sokolovin kuvaan: Osmendan 4288 × 2717 rajautuu 3:2:een, mutta Sokolovin rajaus ja sininen taivas antavat saman asian paremmin; Osmendan kuva käy varakuvaksi.
- Ennakko: kappaleen 1 kuva (työmaa) ei näytä hautapaikkaa; kappaleen 2 kuvan kirjoitus on kappaleen 2 asia; kappaleen 3 kuva heiluri.

#### Hylätty

- Soufflotin julkisivukaiverrus 1780 (Taraval, CC0, 5736 × 4520): kehys ja kirjoitus, rakennus 74 % korkeudesta, ei mahdu 3:2:een ilman kehystä. Premier projet 1756: kolme kuvaa samalla arkilla. Rondeletin kupolin telinepiirrokset (Thibaut): tekninen poikkileikkaus, kuvaan jää paperin reuna.
- Voltairen kulkue 1791 (Gavaudo, aikalaiskaiverrus): värikäs, mutta Voltairen siirto 11.7.1791 on eri tapahtuma kuin kappaleen 2 Mirabeaun siirto; kaiverruksen Panthéon on kulman pikkukuva. Demachyn Rousseau-sarkofagi 1794: pysty, tumma, ei kappaleen asia.
- Mirabeaun ulossiirrosta 1794 ei löytynyt vapaata kuvaa; Hugon/Dumas'n krypta (Prieur, CC0): pelkkä kivilaatta, nimitekstejä.
- Ei tilauksia.

#### Avoimet kysymykset KK:lle

1. Kappaleen 1 kuva on tumma, karkea hiilipiirros; kupolin huippu 8 %:ssa ja oikea reuna 92 %:ssa (rajatapaus). Hyväksytäänkö, vai tilataanko havainnekuva rakennustyömaasta (ei kasvoja)? Aidot ehdokkaat: Soufflot-kaiverrus 1780 (kehys, 74 % korkeudesta), Premier projet 1756 (kolme kuvaa arkilla).
2. Hilairen kuvan lipun kärki 4 %:ssa ja paperireuna/alateksti häivytysalueella: hyväksytäänkö?


### 5.6 Notre-Dame (kuvat valmiina, EI dataan: ks. 4.1)

#### Kuvat

| Kappale | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Notre-Damen katedraalin rakentaminen alkoi vuonna 1163, ja sen valmistuminen kesti yli sata vuotta. Kirkko oli aikansa insinööritaidon huippu, sillä sen kivikattoa kannattelevat ulkopuoliset tukikaaret, niin sanotut lentävät tukipilarit. | tukipilarit: Notre-Damen lentävät tukipilarit (notre-dame-tukipilarit.jpg) | valokuva | Eutouring, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Gothic_architecture_of_Notre_Dame_de_Paris.jpg | haettu |
| 2 | Katedraalissa on tapahtunut historian suuria hetkiä: vuonna 1804 Napoleon kruunasi itsensä keisariksi kirkon alttarilla, ja vuonna 1944 kenraali de Gaulle osallistui samassa kirkossa Pariisin vapautumisen kiitosjumalanpalvelukseen. | kruunaus: Napoleonin kruunajaiset Notre-Damessa Davidin maalauksessa (notre-dame-kruunaus.jpg) | maalaus | Jacques-Louis David, Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:Le_Sacre_de_Napol%C3%A9on_-_Jacques-Louis_David_-_Mus%C3%A9e_du_Louvre_Peintures_INV_3699_;_MR_1437.jpg | haettu |
| 3 | Huhtikuussa 2019 katedraalin vintillä syttyi tulipalo, joka tuhosi vanhan puukaton ja tornihuipun. Palomiehet onnistuivat kuitenkin pelastamaan tornit ja julkisivun, ja ruusuikkunatkin säilyivät. Katedraali avattiin yleisölle uudelleen joulukuussa 2024, alle kuusi vuotta palon jälkeen. | tornit: Notre-Damen tornit ja ruusuikkuna palon savussa (notre-dame-tornit.jpg) | valokuva | Emilio Luque, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Incendio_de_la_catedral_de_Notre_Dame_de_Par%C3%ADs_II.jpg | haettu |
| 3 | Huhtikuussa 2019 katedraalin vintillä syttyi tulipalo, joka tuhosi vanhan puukaton ja tornihuipun. Palomiehet onnistuivat kuitenkin pelastamaan tornit ja julkisivun, ja ruusuikkunatkin säilyivät. Katedraali avattiin yleisölle uudelleen joulukuussa 2024, alle kuusi vuotta palon jälkeen. | nyt: Notre-Dame ylhäältä nähtynä Pariisin kattojen keskellä (notre-dame-nyt.jpg) | valokuva | Radek Kucharski, Wikimedia Commons (CC BY 2.0), rajattu; https://commons.wikimedia.org/wiki/File:Notre-Dame_de_Paris_-_View_from_Montparnasse_Tower.jpg | haettu |

Yhteensä: 4 haettu, 0 tilattu, 0 pidetään.

Mitat (pääaiheen paikka, arvio esikatselusta) ja rajatapaukset:

- tukipilarit (esirajaus: ei): tukikaari 30–75 % leveydestä ja 20–80 % korkeudesta, pinaklit ylhäällä 55–60 % ja 85–95 % leveydestä (arvio esikatselusta). Lähde 3000 × 2250, rajaus 3000 × 2000 (y 13). Aito valokuva kuorin kaarista (Commonsin kuvaus: kaakkoispuoli). Rajatapaus: vasemman ylänurkan pinaklin huippu leikkautuu yläreunaan (häivytysalueella), pääaihe (kaari) keskellä. Kuva EI ole sama kuin D-noston neljä kuvaa (palo, kukko, uusi, nyt).
- kruunaus (esirajaus: kyllä): Napoleon 55–68 % leveydestä ja 15–75 % korkeudesta, Joséphine polvillaan 25–55 % ja 50–90 %, kruunu 22 % (arvio esikatselusta). Lähde 11058 × 6874 (ladattu 3840 × 2387), rajaus 1970 × 1313 (osuus 0,55, keskipiste alas, jotta kruunaus pysyy keskellä: maalauksessa kohde on alaosassa). Maalaus 1805–1807 (David); kasvot kelpaavat maalauksessa. Rajatapaus: Joséphinen polvistuvan hahmon alaosa 90 %:ssa (häivytysalueella), kruunaus itse (Napoleon, kruunu) keskellä. Kappaleen toista osaa (de Gaulle 1944, Te Deum) ei kuvata: Commonsissa vain Préfecture de Policen CC0-kuva 26.8.1944 (4372 × 5816 pysty, kaulus ja väkijoukko, ei kirkon sisällä). Rajaus: lähde 3840 × 2387 -> 1970 × 1313.
- tornit (esirajaus: kyllä): tornit ja julkisivu 22–58 % leveydestä ja 27–90 % korkeudesta, ruusuikkuna 38–42 %:ssa ja 68–80 %:ssa, liekki 61 % leveydestä ja 68 % korkeudesta (arvio esikatselusta). Lähde 4272 × 2848 (ladattu 3840 × 2560), rajaus 3264 × 2176 (osuus 0,85). Aito valokuva 15.4.2019 (Commonsin kuvaus: "Incendio de las techumbres"; sama kuvaaja kuin D-noston palokuva, MUTTA eri tiedosto: "II"). Tornit ja ruusuikkuna ehjinä savun edessä, liekki oikealla = kappaleen 3 kaksi ensimmäistä virkettä. Rajatapaus: julkisivun alaosa katoaa katsojajoukon päihin 88 %:sta alaspäin; etualalla ihmisiä selin ja sivusta (kasvot häivytysalueella), liikennevalot oikealla. Rajaus: lähde 3840 × 2560 -> 3264 × 2176.
- nyt (esirajaus: kyllä): katedraali 24–86 % leveydestä ja 25–85 % korkeudesta (uusi torni 25 %:ssa), ympärillä kaupunkia (arvio esikatselusta). Lähde 5042 × 2836 (ladattu 3840 × 2160), rajaus 1620 × 1080 (osuus 0,5). Aito ilmakuva Montparnasse-tornista (Commons-luokka "Notre-Dame de Paris in 2025"; tarkkaa kuvauspäivää ei annettu): uusi torni, katedraali nosturien ja telineiden kanssa, kultainen valo. Montparnasse-torni ei ole kuvassa pääaiheena (kuvataan siltä). Rajatapaus: oikea reuna (telineet) 86 %:ssa. Eri kuva kuin D:n "nyt" (Chabe01). HYLÄTTY nykykuvaksi: GFreihalter 684 (vasen torni leikkautuu: huippu 4 %:ssa, ja etualalla tunnistettava henkilö), Chabe01 2025-03-01 julkisivu (pysty, julkisivu ei mahdu 3:2:een). Rajaus: lähde 3840 × 2160 -> 1620 × 1080.

#### Perustelut

- Nosto: 4 kuvaa, kaikki eri tiedostoja kuin D-noston neljä (palo Luque I, kukko, uusi Ibex73, nyt Chabe01 2025-03-29). Kappale 1: lentävät tukipilarit (Eutouring). Kappale 2: Napoleonin kruunajaiset (David; osuus 0,55 ja keskipiste alas, jotta kruunaus pysyy keskellä). Kappale 3: tornit ja ruusuikkuna palon savussa (Luque II) ja ilmakuva nykyisestä katedraalista uusine torneineen (Kucharski, Montparnasse-tornista).
- Datan nykykuva (media.matkakirja.app/kuvat/notre-dame-2019-nyt.jpg = D:n "nyt") jää jutun omaksi viimeiseksi kuvaksi ilman muutosta, jos KK haluaa: tämä erä tarjoaa sen tilalle Kucharskin ilmakuvan, koska ohje kielsi samat tiedostot.
- Ennakko: kuvat 1 ja 2 eivät näytä paloa; kappaleen 3 kuvat ovat kappaleen 3 asiaa.

#### Hylätty

- Tukipilarit: Praefcke (arcs-boutants, paljaita puita edessä), Mariordo-sarja 2024 (telineet peittävät), Alexander Baranov (kuori, vanha torni vielä ennen paloa).
- Kruunaus: koko maalaus 3:2:een (kohde alaosassa, Joséphine 95 %:ssa), siksi osuus 0,55. De Gaullen 1944 Te Deum: Commonsissa vain Préfecture de Policen CC0-kuva väkijoukosta kirkon edessä 26.8.1944 (pysty 4372 × 5816, aukio täynnä ihmisiä, julkisivu yläosassa); ei käytetty, koska ohje salli 3–4 kuvaa ja Davidin maalaus kattaa kappaleen kuuluisamman hetken. Aito varakuva jos KK haluaa viidennen: Libération de Paris - 26 août 1944 ... PH11024.jpg.
- Palo: Remi Mathis 05/08/12 ja Marind-sarja (puut ja palmut edessä, torni leikkautuu), Cangadoba FireonND 8888/8893 (lähikuvia), Baidax 21h09 (Seinen yli yöllä, katedraali pieni), Antoninnnnn "La Flèche juste avant l'effondrement" (pysty).
- Nykykuva: GFreihalter 684 (vasen torni leikkautuu 4 %:ssa, etualalla tunnistettava henkilö), Chabe01 2025-03-01-1 (julkisivu pystykuvana ei mahdu 3:2:een), Bruno Barral 2025 (nosturi ja mainosseinä), Ibex73-kuvat 2024 (nosturit, puut edessä).
- Ei tilauksia.

#### Avoimet kysymykset KK:lle

1. Kucharskin ilmakuva: kuvauspäivää Commons ei anna (luokka "in 2025"), kuvassa nosturit ja telineet; kappale 3 puhuu uudelleenavauksesta joulukuussa 2024. Hyväksytäänkö, vai pidetäänkö datan nykykuva (Chabe01, sama kuin D:n "nyt")?
2. Kappaleen 2 toista osaa (de Gaulle 1944) ei kuvata; haluatko viidennen kuvan (PH11024)?
3. Kappaleen 3 tornikuvan alaosassa katsojia selin ja sivusta (häivytysalueella, ei kasvolähikuvia).


### 5.7 Tour Saint-Jacques

Tila: 4 kuvaa haettu, 0 pidetään, 0 tilattu. Yksi kuva on rajatapaus (J3 sääasema). Tiedot: KUVALISTA.json.

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | "Tour Saint-Jacques on Pariisin keskustassa seisova kellotorni, joka on ainoa jäljellä oleva osa kirkosta. Torni rakennettiin 1509–1523 …" | tour-saint-jacques-j1-piirros.jpg | piirros | François Alexandre Pernot (1793–1865), CC0, Musée Carnavalet / Paris Musées. https://commons.wikimedia.org/wiki/File:La_tour_Saint-Jacques-des-la-Boucherie._D.6520.jpg | haettu, esirajattu (--osuus 0.7) |
| 2 | "1790-luvun vallankumouksessa kirkko myytiin louhokseksi … 1850-luvulla sen ympärille tehtiin puisto, kun Haussmannin työt avasivat Rue de Rivolin tornin eteen." | tour-saint-jacques-j2-purku.jpg | piirros | François Alexandre Pernot, CC0, Musée Carnavalet / Paris Musées. https://commons.wikimedia.org/wiki/File:La_tour_Saint-Jacques-de-la-Boucherie_et_ses_environs._D.6484.jpg | haettu, esirajattu (--osuus 0.7) |
| 3 | "Torniin perustettiin sääasema vuonna 1891." | tour-saint-jacques-j3-saaasema.jpg | valokuva | Yann Caradec, CC BY-SA 2.0. https://commons.wikimedia.org/wiki/File:Restes_de_l%27ancienne_station_m%C3%A9t%C3%A9o_de_la_Tour_Saint-Jacques,_Paris_ao%C3%BBt_2014.jpg | haettu, RAJATAPAUS |
| 3 (viimeinen, nykyvalokuva) | "Tornin juurelta alkaa yhä Via Turonensis …" (kuva näyttää tornin nykyään) | tour-saint-jacques-j3-nyt.jpg | valokuva | iMahesh, CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:Tour_Saint-Jacques_-_Panoramic_view_from_across_the_Seine_with_Th%C3%A9%C3%A2tre_de_la_Ville.jpg | haettu |

Kaikki 1200 × 800 (3:2) nostokuva.mjs:llä, kansiossa myös -2048-versiot, -esikatselu.png ja .json.

#### Mitat (esikatselusta)
- J1: torni 41–58 % leveydestä, 13–69 % korkeudesta. Keskimmäisen 60 %:n sisällä.
- J2: torni 45–64 % leveydestä, 16–80 % korkeudesta (alaosa talojen takana jo piirroksessa). 75 %:n sisällä; korkeus ylittää 60 %:n tavoitteen mutta pysyy 75 %:ssa.
- J3 sääasema: pullorivi 10–89 % leveydestä, 23–86 % korkeudesta. Vasen ja oikea pullo ylittävät 75 %:n rajan 2–3 prosenttiyksikköä. Rajatapaus.
- J3 nyt: torni 50–57 % leveydestä, 22–59 % korkeudesta. Keskimmäisen 60 %:n sisällä. Tornin juuri puiden ja talojen takana.

#### Perustelu
Torni on korkea ja kapea, joten 3:2-vaakakuvassa se mahtuu 75 %:n korkeuteen vain, kun kuva on otettu kaukaa tai piirros on laaja. Niinpä lähikuvat (Soulier ym.) eivät käy; valitut näyttävät tornin kaupunkinäkymässä.

#### Hylätyt (ja miksi)
- Nykyinen datan kuva (DXR, 4472 × 6700, pystykuva): torni täyttää lähes koko korkeuden, ei mahdu 3:2-vaakaan 75 %:iin.
- Charles Soulier ca. 1867 (PD, 3006 × 3995), Baldus, Chavard, Boggs: pystykuvia, torni 65–95 % korkeudesta; 3:2-rajaus katkaisee huipun tai jalan.
- "Vue du square Saint-Jacques ca. 1866–70" (State Library Victoria, 5871 × 4838): torni 2–70 % korkeudesta; 3:2-rajauksessa 84 %; lähde-/kirjastoleima kuvassa.
- Garneray (kirkko ja torni, BnF, 3289 × 4607 pystykuva): tornin huippu 10 % ja jalka 80 % korkeudesta; vaakarajaus katkaisee tornin. Paras J1:n sisältö (kirkko ja torni ennen purkua), mutta mitta ei ratkea.
- Bertaux "Après la démolition de l'église" D.8872 (pystykuva, pahvikehys, numero): torni täyttää korkeuden; mitta ei ratkea.
- Fabien Barrau "au crépuscule" (3543 × 2658): torni 3–92 % korkeudesta.
- Rivière 1857 lito "Place de la Tour St Jacques" (CC0, Rue de Rivoli, Haussmann-aika, sopisi J2:een): koko kuva-alue vain noin 1100 × 750 px, torni oikeassa reunassa (85–89 % leveydestä); rajaus 1200 px:ään ei onnistu eikä torni tule keskelle.
- Visscher 1618 (kartta, numerot kuvassa), London Stereoscopic -stereokortti (tornin huippu leikkautunut kaarikehykseen, kaksi kuvaa), Rijksmuseum-stereokortit: teksti, kehys.
- Heidi Meudt elokuu 2026 -sarja (puisto ilman tornia), Pont d'Arcole -kuva (vain torni ylhäältä, ilman jalkaa) ja Rue de Rivoli -kuva: eivät näytä kokonaisuutta; tornin huippu poikki tai 9,5 % korkeudesta (Zairon "Paris Tour Saint-Jacques 01").
- Pascal-patsas (Ibex73 2024 #10 ja #12, Tmorlier pystykuva, Caradec selkäpuoli): patsas leikkautuu tai ei mahdu vaakaan 75 %:iin (pystykuvassa patsas 49 % lähteen korkeudesta, vaakarajauksessa liian suuri). Kappaleen toinen virke (Pascal) jää ilman kuvaa.
- Demachy D.3277 ("Démolition d'une église présumée être Saint-Jacques-la-Boucherie", CC0, sisäkuva puretusta kirkosta): kuva sopisi kappaleelle 2 aiheena, mutta Commons-otsikko sanoo kirkon vain "oletetuksi" Saint-Jacquesiksi, joten en käyttänyt.

#### Avoimet kysymykset KK:lle
1. J3 sääasema (pullot): rajatapaus (pullot 10–89 % leveydestä). Hyväksytäänkö (kuva kertoo sääasemasta aidosti, ei muokattu) vai pudotetaanko?
2. J2: Pernot-piirroksen vuosi ei ole Commonsissa (päätelmä: 1850-luvun purkutyöt, kuvateksti ei väitä vuotta). Aitoa kuvaa kirkon myynnistä louhokseksi tai kadonneesta pyhästä Jaakobista ei löytynyt, kuva näyttää vain ympäristön purkua.
3. J1: kuva ei näytä teurastajien kaupunginosaa eikä kirkkoa, vain tornin kattojen yllä. Garneray-piirros olisi sisällöltään oikea (kirkko ja torni), mutta ei mahdu 3:2-vaakaan. Pidetäänkö J1:n piirros vai tilataanko Garneray-pohjalta havainnekuva (ei tilattu)?
4. Pascal-patsas ja Via Turonensis (kappaleen J3 loppu): ei kuvaa. Tilausta en kirjoittanut, koska aitoja kuvia on olemassa, mutta ne ovat pystykuvia (Tmorlier, CC BY-SA 3.0, 1920 × 2880).
5. Sääasema-virke: vuosi 1891 ei näy kuvassa (kuva 2014), sopii kertojan sanaan "sääasema".


### 5.8 Saint-Eustache

Tila: 3 kuvaa haettu, 0 pidetään, 0 tilattu. Kaikki aidot valokuvat. Tiedot: KUVALISTA.json.

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | "Saint-Eustache on Pariisin kirkko, jonka rakenne on goottilaista mutta koristeet renessanssia. … Uutta kirkkoa alettiin rakentaa vuonna 1532, ja se vihittiin vuonna 1637 …" | saint-eustache-j1-rakenne.jpg | valokuva | Edhral, CC BY-SA 2.0. https://commons.wikimedia.org/wiki/File:Saint-Eustache-20101019-001.jpg | haettu |
| 2 | "Länsijulkisivua alettiin rakentaa uudelleen vuonna 1754, mutta uusi julkisivu jäi kesken." | saint-eustache-j2-julkisivu.jpg | valokuva | Szilas, CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:%C3%89glise_Saint-Eustache_2009-06-02_Paris_13.jpg | haettu |
| 3 (viimeinen, nykyvalokuva) | "Kirkko seisoo Les Hallesin, Pariisin entisen ruokatorin, vieressä …" | saint-eustache-j3-nyt.jpg | valokuva | besopha, CC BY 2.0. https://commons.wikimedia.org/wiki/File:L%27%C3%89glise_Saint-Eustache_%C3%A0_Paris,_octobre_2018.jpg | haettu, esirajattu (--osuus 0.8) |

Kaikki 1200 × 800 (3:2) nostokuva.mjs:llä; kansiossa -2048-versiot, -esikatselu.png ja .json.

#### Mitat (esikatselusta)
- J1: kirkko 25–82 % leveydestä, 20–86 % korkeudesta (alaosa puiden takana). 75 %:n sisällä, ei 60 %:n.
- J2: kirkko 17–81 % leveydestä, 16–75 % korkeudesta. 75 %:n sisällä.
- J3: kirkko 29–75 % leveydestä, 23–70 % korkeudesta. 75 %:n sisällä.

#### Hylätyt ja miksi
- Nykyinen datan kuva "Saint Eustache.jpg" (Benh Lieu Song, 3855 × 2261): kirkko 83 % 3:2-rajauksen leveydestä (näkymä liian tiukka), ei mahdu 75 %:iin.
- Wilfredor "South facade …" (CC0, 3:2): kirkko täyttää kuvan, lisäksi ilmapallotaideteos ja kyltit edessä.
- Uticencis "vue des Halles" (3:2): tornin huippu 1,5 %:ssa, kuvan reunoilla.
- Мандрівниця "Église Saint-Eustache 3" (3915 × 2131): kirkko 81 % rajauksen leveydestä.
- Rijksmuseumin stereokortit (Les Halles ja kirkko 1800-luvulla), Huguet/Fichot-kaiverrus G.24039: stereokortit sisältävät kaksi kuvaa ja pahvikehyksen; kaiverruksessa kirkko täyttää 94 % painoalueen leveydestä (3:2-rajaus ei mahdu).
- Guyot/Testard "Vue du portail de St Eustache" (1780-luvun painokuva, ympyrä): kuvaa ehdotettua kaksitornista julkisivua, jonka ympyrästä ei saa 3:2-rajausta, johon rakennus mahtuu 75 %:iin; lisäksi kuvateksti ja ympyräreuna.
- Les Hallesin vanhat kuvat (Baltard-paviljongit): vain stereokortteina, ei sopivia.

#### Avoimet kysymykset KK:lle
1. J2:n Richelieu/Molière kaste, Ludvig XIV:n ehtoollinen 1649 ja Maanviljelyksen temppeli 1790-luvulla: ei aitoa kuvaa (ei tarkkaan sovi mitta- eikä aikavaatimuksiin); kuva kattaa vain kappaleen länsijulkisivun virkkeen.
2. J3: Baltardin korjaus 1800-luvulla ei kuvassa; kuva näyttää kirkon ja Hallesin puiston nykyään.
3. J1:n kuvassa (kuorin yläosa ja kupolitorni) kirkon alaosa on puiden takana; kyseessä ei ole julkisivukuva. Hyväksyttävissä?


### 5.9 Place des Vosges

Tila: 3 kuvaa haettu, 0 pidetään, 0 tilattu. Kappaleen 3 Victor Hugo -virkkeelle ei kuvaa. Tiedot: KUVALISTA.json.

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | "Aukio vihittiin vuonna 1612 Ludvig XIII:n ja Anna Itävaltalaisen kihlajaisten yhteydessä." (myös Henrik IV:n määräys) | place-des-vosges-j1-karuselli.jpg | piirros (kaiverrus 1612) | Dietrich Theodor Meyer, Musée Carnavalet / Paris Musées, CC0. https://commons.wikimedia.org/wiki/File:Carrousel_de_1612_sur_la_Place_Royale,_%C3%A0_l%27occasion_des_mariages_princiers_franco-espagnols,_2022.0.1415.jpg | haettu, esirajattu (--osuus 0.88) |
| 2 | "Aukiota ympäröi 36 samanmallista taloa, … punatiilinen julkisivu ja jyrkkä katto. Korkeampina erottuvat … paviljongit" | place-des-vosges-j2-talot.jpg | valokuva | Zairon, CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:Paris_Place_des_Vosges_02.jpg | haettu |
| 3 (viimeinen, nykyvalokuva) | "Aukio sai nimen Place des Vosges vuonna 1800 …" | place-des-vosges-j3-nyt.jpg | valokuva | Zairon, CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:Paris_Place_des_Vosges_03.jpg | haettu |

Kaikki 1200 × 800 (3:2); kansiossa myös -2048-versiot, -esikatselu.png ja .json.

#### Mitat ja rajatapaukset
- J1: karuselli täyttää koko kuvan (aikalaiskaiverrus; ei yksittäistä rakennusta). Aukion talot näkyvät vain yläreunassa osin. Kuvassa on kaiverrukseen kuuluvia kirjainmerkintöjä (A, B, C …, vasemmalla "Des Königs und der Königin Sitz"); otsikko, signeeraus ja Carnavaletin teksti rajattu pois. KK arvioi kelpaako.
- J2: korkeampi keskitalo 25–58 % leveydestä, 8–55 % korkeudesta (alaosa puiden takana); suihkulähde 40–56 %. Katon huippu 8 %:ssa: 75 %:n sisällä, ei 60 %:n. Talorivit jatkuvat reunoihin (koko riviä ei saa kuvaan). Kuvasta ei voi päätellä, onko talo kuninkaan vai kuningattaren paviljonki; kuvateksti ei saa väittää.
- J3 nyt: suihkulähde 53 % leveydestä, talorivi koko leveydellä (reunat häipyvät), kattolinja 12–30 %. Aukio ja suihkulähde keskimmäisessä 60 %:ssa.

#### Hylätyt ja miksi
- Nykyinen datan kuva "Arkaden 1" (Zairon, 4559 × 3322): arkadikuva, kuvaa vain kaaria; en käyttänyt (ei kerro J1:stä tai J2:sta, ja uusi J2 näyttää myös julkisivun).
- Zairon 09 (CC BY-SA 4.0, paviljonkikuva) ja Roman Ostash "Pavillon du Roi (4)": kattokulma ja huippu 0–1 % korkeudesta (3:2-rajaus ei anna tilaa), Ostashin kuva lisäksi tilt-shift-sumennettu (muokattu).
- Staroad.fr "Maison de Victor Hugo" (julkisivu, 3975 × 2917): talon julkisivu ja kaaret täyttävät koko kuvan, alareunan kaaret leikkautuvat; Britchi Mirela "Maison de Victor Hugo in Place des Vosges" (sisäänkäynti, vartija ja vieras kuvassa): kaari leikkautuu ylhäältä, ei kokonaista rakennusta; muut kuvat (Afifa Afrin, Olivier Bruchez ym.): laattoja tai pystykuvia. Hugo-virkkeelle ei siten aitoa vaakakuvaa 75 %:iin.
- Chatillon G.19398 (karuselli 1612, koristekehys): keskikuva vain noin 26 % kehyksen leveydestä, ei 1200 px.
- Pavillon du Roi -kuvat (AlNo, Mbzt, Bruno befreetv): pieniä tai pystykuvia (alle 1200 px leveä rajaus).
- Muut aukiokuvat (GFreihalter 574, 613, 230; DiscoA340 "July 2022"): talorivi leikkautuu reunaan tai puut peittävät; 613 ja 230 olisivat J3:n varakuvia.
- Lepautre "Carrousel de la place Royale" (BnF): vuosi epäselvä (1612 vai myöhempi), joten ei käytetty J2:n turnajaisvirkkeeseen.

#### Avoimet kysymykset KK:lle
1. J1: hyväksytäänkö kaiverrus (karuselli 1612), jossa aukion talot vain yläreunassa ja kirjainmerkintöjä? Vaihtoehtona havainnekuva (ei kasvoja) tai pelkkä J2:n aukiokuva.
2. J2: turnajaiset 1600-luvulla jäävät ilman omaa kuvaa (J1:n karuselli liittyy 1612:een); jos halutaan, tilaus (havainnekuva ilman kasvoja) kirjoitetaan.
3. J3: Victor Hugo -virke ilman kuvaa (aitoja vaakakuvia talosta ei mahdu 75 %:iin). Päätös?


### 5.10 Invalidit

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Invalidit eli Les Invalides rakennettiin kodiksi sotilaille, jotka sodat olivat jättäneet haavoittuneina ja vanhentuneina kerjäämään Pariisin kaduille. Vuonna 1670 kuningas määräsi kodin rakennettavaksi, ja Libéral Bruantin suunnittelemaan taloon muuttivat ensimmäiset asukkaat jo 1674. Talo oli kuin pieni kaupunki: parhaimmillaan siellä asui useita tuhansia entisiä sotilaita, ja verstaissa tehtiin kenkiä, sukkia ja kuvakudoksia. | perelle: Les Invalides Pérellen 1600-luvun kaiverruksessa (perelle) | piirros | Adam Pérelle, Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:L'Hotel_de_Mars_ou_des_Invalides,_G.13367(3).jpg | haettu |
| 2 | Heinäkuun 14. päivän aamuna 1789 kansanjoukko tunkeutui Invalideihin ja vei asevarastosta noin 30 000 kivääriä. Ruutia ei juuri löytynyt, ja sitä lähdettiin hakemaan Bastiljista. | 1789: Kansa ottaa aseita Invalideista 14. heinäkuuta 1789 (1789) | piirros | Anonyymi, Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:Prise_d'Armes_aux_Invalides,_G.27747.jpg | haettu |
| 3 | Vuonna 1840 Napoleonin jäännökset tuotiin Saint Helenan saarelta, ja Hardouin-Mansartin kullatun kupolin alle rakennettiin avoin krypta. Sarkofagi veistettiin punaisesta kvartsiitista, joka louhittiin Äänisjärven rannalta Karjalasta, ja keisari siirrettiin siihen 1861. Veteraanien kodista on jäljellä yhä toimiva sairaala ja hoitokoti, ja käytävillä kulkevat nyt armeijamuseon kävijät. | hauta: Napoleonin sarkofagi Invalidien kupolin alla (hauta) | valokuva | Lililederf, Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:Le_Tombeau_de_l'Empereur_Napol%C3%A9on_aux_Invalides.jpg | haettu |
| 3 | Vuonna 1840 Napoleonin jäännökset tuotiin Saint Helenan saarelta, ja Hardouin-Mansartin kullatun kupolin alle rakennettiin avoin krypta. Sarkofagi veistettiin punaisesta kvartsiitista, joka louhittiin Äänisjärven rannalta Karjalasta, ja keisari siirrettiin siihen 1861. Veteraanien kodista on jäljellä yhä toimiva sairaala ja hoitokoti, ja käytävillä kulkevat nyt armeijamuseon kävijät. | nyt: Invalidien sisäpiha ja kupoli nykyään (nyt) | valokuva | Diego Delso, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Los_Inv%C3%A1lidos,_Par%C3%ADs,_Francia,_2022-10-30,_DD_128-130_HDR.jpg | haettu |

Yhteensä: 4 haettu, 0 tilattu, 0 pidetään. Tilauksia ei ole (TILAUKSET.md puuttuu tarkoituksella).

#### Mitat (arvio esikatselusta) ja rajatapaukset

- perelle (esirajaus: kyllä, --osuus 0.895): rakennus 8–92 % leveydestä (84 %), 31–53 % korkeudesta. YLITTÄÄ 75 %:n leveysrajan: pitkä julkisivu täyttää kaiverruksen koko leveyden eikä rakennus mahdu 75 %:iin millään lähteen rajauksella (lähteen oma julkisivu on 80 % plaatin leveydestä). Korkeussuunnassa hyvin keskellä. Rajattu pois: paperireuna ja kaiverruksen alla oleva kuvateksti.
- 1789 (esirajaus: kyllä, --osuus 0.94): tapahtuma (portti 27–55 %, kanuuna, väkijoukko) 75 %:n sisällä; Invalidien julkisivu 30–100 % ja kupoli oikeassa reunassa 80–93 % leveydestä, kupolin huippu 0–2 % korkeudesta (leikkautuu yläreunaan). Rakennus ei siis mahdu, tapahtuma mahtuu. Rajattu pois: kehys, kuvateksti, paperireuna.
- hauta (esirajaus: ei): sarkofagi 42–56 % leveydestä, 39–86 % korkeudesta (tavoite 60 % ylittyy alareunasta, 75 % täyttyy). Krypan rengas ja patsaat ympärillä. Lähde 1600 × 1200.
- nyt (esirajaus: ei): kupoli 42–58 % leveydestä; huipputorni ja risti 7–14 % (häivytysalueella), kupolin runko 14–53 %, keskirakennuksen alareuna 88 % (rajatapaus, 87,5 %). Julkisivun siivet jatkuvat reunoille (pitkä rakennus).

#### Perustelut

- Kappale 1 (veteraanien koti): aikalaiskaiverrus Invalideista 1600-luvulta, rakennus kokonaisuudessaan. Nykyisen datan kuvaa ei pidetä, katso alla.
- Kappale 2 (14.7.1789): aikalaiskaiverrus Invalidien portilla käydystä aseiden otosta (kanuunat, kansanjoukko). Kuva ei näytä Bastiljia eikä mitään kappaleen ulkopuolista.
- Kappale 3: ensin Napoleonin haudan avoin krypta (punainen kvartsiittisarkofagi, kupolin alla), sitten nykykuva Invalidien sisäpihalta ja kupolista (viimeinen kuva aito valokuva nykyään). "Sairaala ja hoitokoti" -osalle ei erillistä kuvaa.

#### Hylätty

- Nykyiset datan kuvat: DXR "North View" (3840 × 1446 -kaistale, 3:2-rajaus jättää rakennuksen siivet pois); Auguste Gérardinin piirros "Tsaari Nikolai II Napoleonin haudalla 1896" (kertoja ei sano tsaarista; pystykuva 1665 × 1909; ei katsottu silmin, hylätty tekstin perusteella).
- Muut 14.7.1789 -kaiverrukset: G.27744 (Prieur/Berthault): julkisivu leikkautuu kuvan oikeaan reunaan (kupoli 90 %:ssa), kuva pienellä paperin keskellä (kuvan ala noin 1530 px); G.27750 (nimetön): julkisivu täyttää koko plaatin leveyden, kuvateksti plaatin alla, lähde 2379 × 1479.
- Perelle: Rijksmuseon "L'hostel de Mars dit les Invalides" (1726, ilmakuva): kirjansivun reunat, kompleksi 90 % plaatin leveydestä; Perelle G.13367 (1) ja (2) sekä Rijksmuseon RP-P-1951-518-30: sama kaiverrus (3):n kanssa, mutta paperi- tai kirjareunaa enemmän ja rakennus yhtä leveä.
- Jean-Pol Grandmontin Napoleonin hautakuvat (CC BY 4.0): pystykuvia (Commonsin mittojen mukaan 2592 × 3888, 2736 × 3648); ei katsottu silmin, koska Lililederfin CC0-kuva täytti tarpeen.

#### Avoimet kysymykset KK:lle

1. Perellen kaiverrus: rakennus 84 % leveydestä (yli 75 %); hyväksytäänkö vai tilataanko havainnekuva?
2. Kuva 1789: itse tapahtuma mahtuu, kupoli leikkautuu oikeaan yläkulmaan; hyväksytäänkö?
3. Nykykuva: huipputorni 7 %:ssa ja keskirakennuksen alareuna 88 %:ssa (rajatapaus).
4. Kappale 3: "kertoja" sama teksti kahdelle kuvalle (haudalle ja nykykuvalle).


### 5.11 Petit Palais

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Petit Palais eli pieni palatsi rakennettiin maailmannäyttelyyn, mutta toisin kuin monet näyttelyn rakennukset, sen oli tarkoitus jäädä pysyväksi taidemuseoksi. Arkkitehti Charles Girault aloitti työn Champs-Élysées’n tuntumassa, Grand Palais’ta vastapäätä, lokakuussa 1897, ja rakennus valmistui huhtikuussa 1900. | 1900: Petit Palais vuoden 1900 maailmannäyttelyssä (1900) | valokuva | Tuntematon valokuvaaja (Library of Congress), Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:The_little_Palace,_Exposition_Universal,_1900,_Paris,_France.jpg | haettu |
| 2 | Vuonna 1902 siitä tuli Pariisin kaupungin kuvataidemuseo, ja samana vuonna museo sai Dutuitin veljesten keräämän taidekokoelman. Julkisivun päätyä koristaa Jean Antoine Injalbertin veistämä Pariisi muusien ympäröimänä. | portti: Pääoven päädyn veistosryhmä Petit Palais'ssa (portti) | valokuva | Zairon, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Paris_Petit_Palais_Eingang_3.jpg | haettu |
| 3 | Rakennuksen keskellä on puoliympyrän muotoinen pylväskäytävä, joka avautuu puutarhaan. Koristeissa on kullattua metallia. Rakennus on ollut suojeltu historiallinen monumentti vuodesta 1975. | puutarha: Petit Palais'n pylväskäytävä ja puutarha (puutarha) | valokuva | Pierrette13, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Bassin_central_cour_int%C3%A9rieure_Petit_Palais_Paris.jpg | haettu |

Yhteensä: 3 haettu, 0 tilattu, 0 pidetään. Tilauksia ei ole (TILAUKSET.md puuttuu tarkoituksella). Kuvia on kolme (J1, J2, J3); viimeinen on nykyvalokuva.

#### Mitat (arvio esikatselusta) ja rajatapaukset

- 1900 (esirajaus: ei; rajaus 3504 × 2336 yläreunasta): rakennus 14–90 % leveydestä (76 %), 21–69 % korkeudesta. Hiukan yli 75 %:n leveysrajan (siipien päät 14 % ja 90 %).
- portti (esirajaus: ei; rajaus 3840 × 2560 alaosasta): Pariisi muusien ympäröimänä -ryhmä 18–82 % leveydestä, 14–94 % korkeudesta; keskeinen Pariisi-hahmo ja muusit 14–60 % korkeudesta; ryhmän alareuna (reunafiguurit) 90–94 % eli yli 75 %:n.
- puutarha (esirajaus: ei; rajaus 3840 × 2560 yläosasta): pylväskäytävä 32–55 % korkeudesta, kullatut köynnökset 38–81 % leveydestä; kaareva rakennus täyttää koko leveyden, kattokaide 8–16 %.

#### Perustelut

- Kappale 1 (rakennettu maailmannäyttelyyn): aikalaiskuva rakennuksesta vuoden 1900 näyttelyssä (photochrom, Library of Congress). Rakennus kokonaan. Nykyisen datan kuva (Moonik, 'Petit Palais, Paris 8th 003') ei kelpaa tähän (ks. hylätty).
- Kappale 2 (Injalbertin veistos): valokuva pääoven tympanonista, jossa 'Pariisi muusien ympäröimänä'. Kuva ei kata "1902 museo" eikä "Dutuitin kokoelma" -kohtia (ei vapaata käyttökelpoista kuvaa; Thomonin 'Dutuit Petit Palais' on pystykuva sivujulkisivusta, ei kappaleen asiaa).
- Kappale 3 (pylväskäytävä, kullattu metalli, puutarha): sisäpihan pylväskäytävä ja allas, kullatut köynnökset näkyvät. Viimeinen kuva on aito nykyvalokuva.

#### Hylätty

- Nykyinen datan kuva Moonik 'Petit Palais, Paris 8th 003' (CC BY-SA 3.0): kupoli leikkautuu vasempaan reunaan, näyttelybannerin tekstiä kuvassa.
- Aikalaisvalokuvat: 'Exposition 1900 Petit Palais façade, PPPH00361(1)' (pahvikehys, musta reuna), (2) (rakennus 87 % leveydestä, kuvan kuvateksti alareunassa) ja SIP-stereokortti PH24603 (kaksoiskuva, kehys); 'Le Petit Palais 1' ja '2' (PD, tuntematon tekijä; rakennus pienempi, paljon ihmisiä, kuvateksti ja paperi alareunassa); 'Le Pont Alexandre III et le Petit Palais' (rakennus pieni, taka-alalla).
- Julkisivu/portti: 'Petit Palais en 2026 02' (CC BY-SA 4.0; tympanon ja portti hyvin, mutta näyttelybannerit tekstineen ja naiskasvo oikealla); 'Main entrance of Petit Palais 20171223' (bannerit kasvokuvineen, viistokuva); 'Petit Palais Paris 1' (Chabe01; autoja ja ihmisjoukko edessä, bannerit); Fred Romero (30750824263): portti viistosti alhaalta, ryhmä osin kaaren varjossa; 'Paris - Petit Palais (24408509922)': kupoli ja kaari, ryhmä alareunassa leikkautuu.
- Sisäpiha: 'Jardin intérieur du Petit Palais' (Petit Palais, 4961 × 3307; kelpaisi varalle, pylväskäytävä lehtien takana, kullatut köynnökset huonosti näkyvissä); Vellut 'Columns @ Garden' ja 'Garden ... (34081822563)' (vierailijoita, katto); 'Garden ... (34505767100)' (kaareva rakennus, ei pylväskäytävää).

#### Avoimet kysymykset KK:lle

1. Kuva 1900: rakennus 76 % leveydestä (rajatapaus); hyväksytäänkö?
2. Kuva portti: ryhmän reunafiguurit 90–94 %:ssa; hyväksytäänkö vai rajataanko tiukemmin (Pariisi-hahmo ja muusit keskellä)?
3. Puutarha: kaareva rakennus täyttää leveyden; pylväskäytävä keskellä. Hyväksytäänkö? Varalla 'Jardin intérieur du Petit Palais' (CC BY-SA 4.0).
4. Kappale 2: 1902-museo ja Dutuitin kokoelma ilman omaa kuvaa (kuva näyttää vain Injalbertin veistoksen).


### 5.12 Metro 1900

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Pariisin metro avattiin yleisölle maailmannäyttelyn aikaan 19. heinäkuuta 1900, ja ensimmäinen linja kulki idästä länteen Pariisin halki yhdistäen Porte de Vincennes’in ja Porte Maillot’n. Metron kuuluisista sisäänkäynneistä järjestettiin arkkitehtikilpailu, mutta työ annettiin lopulta Hector Guimardille, joka ei ollut osallistunut siihen. | chantier: Metron työmaa Rue de Rivolilla heinäkuussa 1899 (chantier) | valokuva | Charles Maindron, Musée Carnavalet / Paris Musées, Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:Vue_de_la_construction_du_m%C3%A9tro,_chantier_de_la_Tour_Saint-Jacques,_rue_de_Rivoli,_4%C3%A8me_arrondissement,_Paris._PH83359.jpg | haettu |
| 1 | Pariisin metro avattiin yleisölle maailmannäyttelyn aikaan 19. heinäkuuta 1900, ja ensimmäinen linja kulki idästä länteen Pariisin halki yhdistäen Porte de Vincennes’in ja Porte Maillot’n. Metron kuuluisista sisäänkäynneistä järjestettiin arkkitehtikilpailu, mutta työ annettiin lopulta Hector Guimardille, joka ei ollut osallistunut siihen. | edicule: Guimardin sisäänkäynti heinäkuussa 1900 (edicule) | valokuva | Charles Maindron, Musée Carnavalet / Paris Musées, Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:Edicule_d%E2%80%99Hector_Guimard_pour_m%C3%A9tropolitain_de_Paris,_Paris._Juillet_1900._PH26145.jpg | haettu |
| 2 | Guimard piirsi valurautaisia vakio-osia, jotka sopivat yhteen kuin rakennussarja: samoista paloista sai kasattua sopivan sisäänkäynnin mihin tahansa kadunkulmaan. Hänen tyylinsä oli jugendia, ja sisäänkäyntejä tehtiin yli 140. | rome: Guimardin sisäänkäynti Rome-asemalla 1903 (rome) | valokuva | Charles Maindron, Musée Carnavalet / Paris Musées, Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:Edicule_Guimard._La_station_de_m%C3%A9tro_Rome_vers_la_Nation._8%C3%A8me_et_17%C3%A8me_arrondissements,_Paris._5_juin_1903._PH18767.jpg | haettu |
| 3 | Sitten tyyli meni pois muodista ja monet sisäänkäynnit purettiin. Jäljellä on noin 90, ja valtaosa niistä suojeltiin vuonna 1978 historiallisina monumentteina. | nyt: Abbesses'n asemalla Guimardin sisäänkäynti nykyään (nyt) | valokuva | Thomas Geoffray, Wikimedia Commons (CC BY-SA 3.0), rajattu; https://commons.wikimedia.org/wiki/File:6_Abbesses.jpg | haettu |

Yhteensä: 4 haettu, 0 tilattu, 0 pidetään. Tilauksia ei ole (TILAUKSET.md puuttuu tarkoituksella).

Datan lähde: js/packs/fokusvirta-pariisi.js, takynosto 'guimardin-metro'. Työpuun tiedostossa on vanhempi teksti ("167", "puolet", "88"); käytetty haaran sk/k4-era3-c-kuvat teksti (kolme kappaletta, "yli 140", "monet", "noin 90"). `kuva.selite` ja `visa.fakta` kertovat "noin 90 jäljellä" jne.; kuvat eivät niitä toista.

#### Mitat (arvio esikatselusta) ja rajatapaukset

- chantier (esirajaus: kyllä, --osuus 0.69): työmaa 28–100 % leveydestä, 40–100 % korkeudesta; Tour Saint-Jacquesin yläosa leikkautuu yläreunaan. Aihe ei ole rakennus: työmaa täyttää kuvan alaosan ja jatkuu reunoille. Rajatapaus.
- edicule (esirajaus: kyllä, --osuus 0.96): sisäänkäynti 24–88 % leveydestä, 14–81 % korkeudesta (alaosa 81 %, 75 %:n rajan sisällä alle 87,5 %).
- rome (esirajaus: kyllä, --osuus 0.96): sisäänkäynti 33–74 % leveydestä, 13–87 % korkeudesta; huippu 13 %:ssa (hyvin lähellä 12,5 %:n häivytysrajaa), jalat 86–87 %.
- nyt (esirajaus: ei): sisäänkäynti 29–72 % leveydestä, 6–88 % korkeudesta. YLITTÄÄ 75 %:n korkeusrajan (82 %): huippu ja jalat häivytysalueella.

#### Perustelut

- Kappale 1 (avattiin 1900, ensimmäinen linja, Guimard sai työn): aikalaiskuva metron työmaasta Rue de Rivolilla 1899 (ensimmäinen linja) ja Guimardin sisäänkäynti heinäkuussa 1900 (avajaiskuukausi).
- Kappale 2 (valurautaiset vakio-osat, kadunkulma): Guimardin sisäänkäynti Rome-asemalla 1903; toistuvat kaidepaneelit ja kaaret näkyvät.
- Kappale 3: kertoja sanoo "tyyli meni pois muodista, monet purettiin, jäljellä noin 90": kuva jäljellä olevasta sisäänkäynnistä Abbesses'n asemalla (nykykuva, viimeinen). Kuva EI näytä purkamista eikä muuta kappaleen 3 asiaa ennen kappaletta; kuvateksti ei paljasta visan vastausta.
- VISA: visan vastaus ("Tyyli meni pois muodista") on vain kappaleen 3 tekstissä. Kappaleiden 1 ja 2 kuvat näyttävät vain sisäänkäyntejä ja työmaata; ei tekstiä, joka paljastaisi vastauksen. Edellyttää, että kuvien `lyhyt`-selitteet (yllä) näytetään vasta kyseisen kappaleen kohdalla; ne eivät sisällä vastausta. HUOM: datan nykyinen `kuva.selite` ('Guimardin metrosisäänkäyntejä tehtiin yli 140, ja jäljellä on noin 90') ja `visa.fakta` ('Jäljellä on noin 90...') kertovat kappaleen 3 asioita; näytetäänkö ne ennen kappaletta 3, on KK:n päätös (en muuttanut mitään).

#### Hylätty

- Pelin nykyinen kuva Terrazzo '01 Guimard's Métropolitain' (CC BY 2.0): 1024 × 768, rajaus alle 1200 px leveä.
- Muut Carnavalet-kuvat: 'Bouche de métro, boulevard Malherbes' (Lansiaux, PH11451, CC0): hyvä mutta kapea kokonaisuus (sisäänkäynti 11–90 % leveydestä, jalat 95 %); 'Accès du métro ... place de l'Etoile' (Maindron, PH16947, CC0): kaksi katosta, vedos kehyksellä ja numerolla 513, valokuvan reunat vinjetoitu ja repeämä yläreunassa. Carnavalet 'Hommes attendant devant une bouche du métropolitain' (PH81279/81280) ei katsottu silmin.
- Muut nykykuvat: Chabe01 2025-07-27 (5712 × 4284 ladattuna 3840 × 2880: 3:2-rajaus leikkaa sisäänkäynnin jalustan, paljon ihmisiä); Weidmann 'Edicule Abbesses 1' (CC BY-SA 4.0; sisäänkäynti 11–92 % korkeudesta ja Crêperie-mainosteksti reunassa); Matt Biddulph 'Abbesses August 12, 2011' (yökuva, mainosjuliste, ihmisiä); Porte Dauphine Chabe01 (kaide, ei kattoa); Abbesses-lähikuvat (Vlad Shtelts, Maurizio Pesce, 'Edicule Abbesses 3'): katos leikkautuu tai täyttää koko kuvan.
- Commonsista ei löytynyt vapaata aikalaiskuvaa 'Porte de Vincennes' tai 'Porte Maillot' -päätepisteiltä (haku nolla osumaa) eikä kuvaa itse avajaisista 19.7.1900.

#### Avoimet kysymykset KK:lle

1. Nykykuva (Abbesses, Geoffray): sisäänkäynti 82 % kuvan korkeudesta (huippu 6 %, jalat 88 %); hyväksytäänkö rajatapauksena vai tilataanko havainnekuva (tai pitääkö hakea etäämmältä otettu kuva)?
2. Chantier: työmaakuva, ei selkeää pääaihetta keskellä; tower Saint-Jacques leikkautuu. Hyväksytäänkö, vai riittääkö kappaleelle 1 yksi kuva (edicule)?
3. Visan selite ja fakta (ks. Perustelut): näytetäänkö ennen kappaletta 3?
4. Kappaleelle 1 ei löytynyt kuvaa arkkitehtikilpailusta eikä päätepisteistä (kuva näyttää työmaan ja valmiin sisäänkäynnin).


