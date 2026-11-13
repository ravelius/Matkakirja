# Amsterdam: tehtäväehdokkaiden faktat ja vapaat kuvat (SK 13.11.2026)

Menetelmä: Rijksin avoin Linked Art -rajapinta (teostietue + VisualItem-lisenssi, 53 tunnusta luettu; ei kuvalatauksia), Commons API (imageinfo/extmetadata), Wikipedia (REST/WebFetch), WebSearch. Commons ja Wikipedia antoivat ajoittain 429; siksi osa kansallisuustarkistuksista on vain Wikipedia + Rijks-tietue (merkitty). Mitään ei kirjoitettu repoon. Pelin ajankohta 1873: kaikki 1600-luvun teokset ovat ennen, Breitner/Mesdag-teokset (1885–1907) ja Orsay-impressionistit (paitsi Monet 1872) ovat 1873 jälkeisiä.

## EHDOKAS 1: EROTTELE, hollantilaiset maalaukset muiden joukosta

### (a) Hollantilaiset maalaukset, joiden kuva on varmasti vapaa
- Repon kohdat-alankomaat.json: 64 kohdetta. Rijksmuseum-tunnuksia 53; **maalauksia niistä 39** (loput: 9 etsausta/vedosta, 5 valokuvaa; osa luettelossa on päällekkäin, laskettu Rijksin tyypistä "painting"). Kaikkien 39 VisualItem-tietueessa kuvan lisenssi = **Public Domain Mark 1.0** (luettu rajapinnasta, id.rijksmuseum.nl/<visualitem>). Rijksin politiikka: https://data.rijksmuseum.nl/policy (vapaa myös kaupalliseen käyttöön).
- Ei-Rijks-maalaukset (Mauritshuis ×5, Hals Museum, Van Gogh Museum ×3, KMSKA): EHDOLLISIA, ei tässä "varmasti vapaita" -joukossa (raportti taidemuseo-alankomaat-aineisto-20261009.md: Mauritshuis ristiriita, VGM/Hals/KM omat ehdot ei sovi; Commons PD-Art-kopio on jäännösriski).
- Kaikki 39 tekijää ovat hollantilaisia (Wikipedia: "Dutch"), mutta huomioi: **Jan Asselijn syntyi Dieppessä** (Wikipedia ja Städel: Dieppe; Rijks "Dieppe c. 1614"), huguenottiperhe muutti Amsterdamiin; "ranskalaissyntyinen hollantilainen" (SK-A-4 Uhattu joutsen), vaaraksi jätetään pois.

**Parhaat 16** (tunnus, nimi, tekijä, vuosi Rijksin mukaan; kuva PDM):
| # | Tunnus | Teos | Tekijä | Vuosi |
|---|---|---|---|---|
| 1 | SK-C-5 | Yövartio | Rembrandt | 1642 |
| 2 | SK-A-2344 | Maitotyttö | Vermeer | n. 1660 |
| 3 | SK-A-2860 | Pieni katu | Vermeer | n. 1658 |
| 4 | SK-A-1595 | Rakkauskirje | Vermeer | n. 1669–70 |
| 5 | SK-C-6 | Verhoilijakillan tarkastajat | Rembrandt | 1662 |
| 6 | SK-C-216 | Juutalaishäät | Rembrandt | n. 1665–69 |
| 7 | SK-A-4050 | Omakuva apostoli Paavalina | Rembrandt | 1661 |
| 8 | SK-A-135 | Iloinen juomari | Frans Hals | n. 1628–30 |
| 9 | SK-A-1685 | Iloinen juomari (Jolly Drinker) | Judith Leyster | 1629 |
| 10 | SK-A-1718 | Talvimaisema luistelijoineen | Hendrick Avercamp | n. 1608 |
| 11 | SK-A-385 | Pyhän Nikolauksen juhla | Jan Steen | 1665–68 |
| 12 | SK-A-351 | Näkymä Haarlemiin | Jacob van Ruisdael | n. 1650–82 |
| 13 | SK-C-211 | Tuulimylly Wijk bij Duurstedessa | Jacob van Ruisdael | n. 1668–70 |
| 14 | SK-C-206 | Neljä nuorta sonnia | Paulus Potter | 1651 |
| 15 | SK-A-354 | Kukkia lasimaljakossa | Rachel Ruysch | n. 1690–1720 |
| 16 | SK-A-404 | Isän kehotus (Gallant Conversation) | Gerard ter Borch | n. 1654–55 |
Varalla: SK-A-182 de Hooch (n. 1656–60), SK-C-244 Van de Velde II Tykinlaukaus (n. 1680), SK-A-2326 Leyster Serenadi (1629), SK-A-199 Kalf (1655–60).
Lähteet: Rijks-tietueet https://www.rijksmuseum.nl/en/collection/<tunnus> (sivut 404/403, tiedot luettu id.rijksmuseum.nl-rajapinnasta); toinen lähde per tekijä Wikipedia (Rembrandt, Vermeer, Hals, Leyster, Avercamp, Steen, Ruisdael, Potter, Ruysch, ter Borch: kaikilla "Dutch"). Pikselikoot: Rijksin IIIF-info.json on `iiif.micr.io`:ssa (robots estää botit, ei kutsuttu); aiempi raportti: Yövartio 14 645 × 12 158, muut 4 000–15 000 px. **TUNT.** teoskohtaiset koot.

Riskit/kiistat (a):
- **SK-A-4691 Omakuva n. 1628 (Rembrandt):** Rijks nykyään "Rembrandt"; Sothebyn huutokaupassa 27.5.1959 luetteloitu "after Rembrandt" (1 700 £), Rijksin osto 1977; Wikipedia: koulukunnan kopio National Trustissa. **Älä käytä EROTTELEssa** (kiistanalainen).
- SK-C-374 on Pieter Codden ja Frans Halsin yhteistyö (Rijks listaa molemmat); SK-A-3957 "River Landscape with Cows": Rijks-merkintä "Aelbert Cuyp (mentioned on object)", mutta Rijksin luettelon mukaan Chong piti sitä mahdollisena 1800-luvun pastissina (raportti ikortti-20261016) → pois.
- SK-A-2326/SK-A-1685/SK-A-3276/SK-A-3137: Rijksin tekijämerkintä "mentioned on object" = tekijä mainittu teoksessa (signeeraus/monogrammi), ei epäilyä; silti Rembrandtin Jeremia/Pietari ovat vanhoja RRP-tapauksia, ei tarpeen.
- Mauritshuisin The Goldfinch (Fabritius) ym. vaativat vahvistuksen; vaihtoehto Commons PD (File:Fabritius-vink.jpg, 1965×3000, Public domain, tekijä Fabritius).
- Rembrandtin Bathsheba (Louvre MI 957), Van Goghin Starry Night ja Auvers-kirkko (Orsay) ovat **hollantilaisia teoksia ranskalaisessa museoaineistossa** → ÄLÄ ota niitä "vieraiksi" repon ranskalaisesta joukosta.

### (b) Vieraat vertailuteokset (ei hollantilaista tekijää; Commons-lisenssi luettu API:lla = "Public domain" jokaiselle)
| Teos | Tekijä (maa) | Vuosi | Commons-tiedosto | px |
|---|---|---|---|---|
| Mona Lisa | Leonardo (IT) | 1503–06 | File:Mona Lisa, by Leonardo da Vinci, from C2RMF retouched.jpg | 7479×11146 |
| Baldassare Castiglione | Rafael (IT) | n. 1514–15 | File:Baldassare Castiglione, by Raffaello Sanzio, from C2RMF retouched.jpg | 15566×19363 |
| Kaanan häät | Veronese (IT) | 1562–63 | File:Les Noces de Cana - Paolo Veronese - Musée du Louvre Peintures INV 142 ; MR 384.jpg | 10068×6742 |
| Arkadian paimenet | Poussin (FR) | 1638 | File:Les Bergers d'Arcadie - Nicolas Poussin - Musée du Louvre Peintures INV 7300 ; MR 2339.jpg | 10925×7605 |
| Valehtelija ruutuässä | La Tour (FR) | 1635 | File:Le Tricheur à l'as de carreau - Georges de La Tour - ... RF 1972 8.jpg | 11050×8021 |
| Matka Kythèraan | Watteau (FR) | 1717 | File:L'Embarquement pour Cythère, by Antoine Watteau, from C2RMF retouched.jpg | 19842×13013 |
| Skeittikala | Chardin (FR) | 1727 | File:La Raie - Jean Baptiste Siméon Chardin - ... INV 3197.jpg | 3565×2782 |
| Horatiusten vala | David (FR) | 1784–85 | File:Le Serment des Horaces - Jacques-Louis David - ... INV 3692 ; MR 1432.jpg | 10051×7794 |
| Vapaus johtaa kansaa | Delacroix (FR) | 1830 | File:La Liberté guidant le peuple - Eugène Delacroix - ... RF 129 - après restauration 2024.jpg | 10128×8103 |
| Las Meninas | Velázquez (ES) | 1656–57 | File:Las Meninas, by Diego Velázquez, from Prado in Google Earth.jpg | 26065×30000 |
| Impressio, auringonnousu | Monet (FR) | 1872 | File:Monet - Impression, Sunrise.jpg | 5773×4478 |
| Moulin de la Galette | Renoir (FR) | 1876 (1873 jälkeen) | File:Auguste Renoir - Dance at Le Moulin de la Galette - Google Art ProjectFXD.jpg | 13453×10000 |
| Tanssitunti | Degas (FR) | 1871–74 | File:Edgar Degas - The Ballet Class - Google Art Project.jpg | 3950×4535 |
| Tytö puutarhassa | Cassatt (US) | 1880–82 (1873 jälkeen) | File:Mary Cassatt - Girl in the Garden - Google Art Project.jpg | 3988×5560 |
Tekijänä jokaisella Commonsissa tekijän oma nimi; tiedostosivut https://commons.wikimedia.org/wiki/<tiedosto>. Kuvat ovat repon ranskalaisesta aineistosta (kuva_tiedot, teokset-lisat.json) + Las Meninas, Cassatt. Vältä: Olympia/Luncheon/Odalisque (alastomuus), Géricaultin Medusan lautta (ruumiit), Concert champêtre (tekijä Giorgione/Titian kiistanalainen, Commons-tekijätieto "Giorgione and/or his disciple Titian"). Nykyisen pelin ajasta: Louvren/Orsayn teokset ovat PD-ikäisiä (tekijät kuolleet ennen 1920), mutta Commons-kuvat ovat C2RMF-, GAP- tai kävijäkuvia; repon raportin mukaan riski on lähteen laatu, ei tekijänoikeus.

### (c) Vaikeampi versio: lähinaapurit hämäyksenä + tuntemattomat hollantilaiset
Vieraat naapurit (Commons-lisenssi luettu, kaikki Public domain):
| Teos | Tekijä | Vuosi | Tiedosto | px |
|---|---|---|---|---|
| Samson ja Delilah | Rubens (flaamilainen) | n. 1609–10 | File:Samson and Delilah by Rubens.jpg | 6000×5431 |
| Kaarle I metsällä | Van Dyck (flaamilainen) | n. 1635 | File:Portrait de Charles 1er, roi d'Angleterre, à la chasse - Antoon van Dyck - ... INV 1236 ; MR 666.jpg | 5020×6498 |
| Kaarle I ratsain | Van Dyck | n. 1637–38 | File:Anthonis van Dyck - Equestrian Portrait of Charles I - National Gallery, London.jpg | 3349×4226 |
| Papukuningas | Jordaens (flaamilainen) | n. 1638–40 | File:Jacob Jordaens - The Bean King (Louvre).JPG | 1453×1057 (pieni) |
| Metsästäjät lumessa | P. Bruegel vanh. | 1565 | File:Pieter Bruegel the Elder - Hunters in the Snow (Winter) - Google Art Project.jpg | 6819×4853 |
| Talonpoikaishäät | P. Bruegel vanh. | 1568 | File:Pieter Bruegel the Elder - Peasant Wedding - Google Art Project 2.jpg | 7678×5306 |
| Sananlaskut | P. Bruegel vanh. | 1559 | File:Pieter Brueghel the Elder - The Dutch Proverbs - Google Art Project.jpg | 5649×4000 |
| Arnolfinin muotokuva | Jan van Eyck | 1434 | File:The Arnolfini portrait (1434).jpg | 8283×11331 |
| Suurlähettiläät | Holbein nuor. (saksalainen) | 1533 | File:Hans Holbein the Younger - The Ambassadors - Google Art Project.jpg | 30000×29560 |
| Maallisten ilojen puutarha | Bosch | n. 1480–1505 | File:The Garden of earthly delights.jpg | 39137×22279 |
| Tietäjien kumarrus (Adoration of the Magi) | Dürer (saksalainen) | 1504 | File:Albrecht Dürer - L'Adoration des mages.jpg | 2294×2020 |
Tuntemattomat hollantilaiset (kuvat vapaita): Judith Leyster SK-A-1685 ja SK-A-2326 (Rijks PDM), Avercamp SK-A-1718 ja SK-A-1320 (Rijks PDM; Commons File:Hendrick Avercamp - Winter Scene on a Frozen Canal - Google Art Project.jpg PD, 5659×3230), Carel Fabritius (Commons File:Fabritius-vink.jpg Tikli 1965×3000 PD; File:Carel Fabritius - De poort bewaker (1654).jpg 4087×4809 PD), Judith Leyster Commons File:Judith Leyster The Proposition.jpg (1200×1514) ja File:Self-portrait by Judith Leyster.jpg (4836×5525), Coorte SK-A-2099 (1697), Mesdag SK-A-2280 (1900-luku).
**Kansallisuusriskit (kirjattu):**
- **Bosch**: Wikipedia "Dutch painter from Brabant", syntyi 's-Hertogenboschissa (nyk. Alankomaat) → hollantilaisena kelpaa, mutta lukijalle arvauttava; EI hämäykseksi "vieras"-puolelle.
- **Pieter Bruegel vanh.**: syntymäpaikka epävarma (Breda, Breugel tai Antwerpen; KHM Wien: "probably Breugel or Antwerp"), kansallisuus vaihtelee lähteissä (Flemish / Dutch / Netherlandish; Frick "Netherlandish"; kuoli Brysselissä 1569). **Älä käytä Bruegelia ilman erillistä päätöstä**; jos käytetään, kuuluu "vieraisiin" vain jos peruste on "eteläiset Alankomaat, ennen Hollannin tasavaltaa".
- **Jan van Eyck**: "early Netherlandish / Flemish" (Maaseik, nyk. Belgia); ennen 1581 ei hollantilaista tasavaltaa → ok vieraaksi, mutta sama peruste kuin Bruegel.
- **Rubens**: syntyi Siegenissä (Saksa) mutta flaamilainen (Wikipedia "Flemish"); selitys tarvitaan. Van Dyck, Jordaens: Wikipedia "Flemish" (Antwerpen).
- **Holbein nuor.**: Wikipedia "German ... active in Switzerland and England" (syntyi Augsburgissa); Dürer "German" (Nürnberg).
- **Asselijn**: ranskalaissyntyinen, katsotaan hollantilaiseksi (ks. yllä).
- Rubensin/Rembrandtin koulukunta- ja "after"-teokset: käytä vain museon omaa täyttä tekijämerkintää; vältä SK-A-4691.
- Toisen lähteen puute: kansallisuudet varmistettu Wikipedian tiivistelmistä (Rembrandt, Vermeer, Hals, Leyster, Avercamp, Fabritius, Steen, Ruisdael, Hobbema, Potter, de Hooch, ter Borch, Ruysch, Cuyp, Coorte, Codde, Breitner, Mesdag, Van de Velde II, Bol, Rubens, Van Dyck, Jordaens, Holbein, Dürer, Bosch) + Rijksin tekijätietue (RKD/Wikidata-linkit). **Wikidata P27 ja RKD-sivut jäivät hakematta rajoituksen (429) vuoksi.** Willem Kalf, Bruegel ja van Eyck: toinen lähde vain WebSearch.

Arvio: 39 vapaata hollantilaista maalausta + 14 vierasta + 11 naapuria = erä 6–8 kohdetta onnistuu hyvin (esim. 4 hollantilaista + 4 vierasta, vaikea: 8 + 8 naapurein). Vaikeus keskinkertainen–korkea (Vermeer/Rembrandt tunnetaan, Leyster/Avercamp ei). **Suositus: sopii Amsterdamiin erittäin hyvin** (Rijksmuseum on kohde, kuvat PDM, kaupunkikohtainen lisäarvo), suurin riski: lähinaapurien kansallisuusrajaus ja 1873 jälkeiset vieraat.

## EHDOKAS 2A: YHDISTÄ, kanavatalon päätytyyppi ja nimi (suositeltu)
Aihe on pelissä jo: nostokoukku ja julkisivuvero (js/packs/europe-kulttuuri.js, europe-questions.js; kohtaamiset-c1-amsterdam-20260922.md: Yara).
Pareja (pääty-kuva ↔ tyyppi), 5 varmaa + 1 vaihtoehto:
| Tyyppi | Hollanniksi | Aika | Lähteet |
|---|---|---|---|
| Askelpääty | trapgevel | 1600–1665 | amsterdamtourism.org/amsterdam-architecture-walking-guide/; buffaloah.com ("between 1600-65") |
| Kaulapääty | halsgevel | 1640–1770 (buffaloah: 1640–1840) | samat |
| Kellopääty | klokgevel | 1660–1790 (buffaloah: "late 17th c."); amsterdamforvisitors.com/?p=628 1660–1790, Prinsengracht 716 rak. 1671 | kolme lähdettä |
| Nokkapääty (varastotalo) | tuitgevel | 1580–1620 (vain amsterdamtourism) | **TUNT.** toinen lähde |
| Reunalistapääty | lijstgevel | 1700–1900 (amsterdamtourism) | **TUNT.** toinen lähde |
Lähteiden ero: aikarajat eroavat (neck 1770 vs 1840); älä käytä vuosia tehtävässä, vain tyypin nimi + muoto.
Faktat: kauppiaat nostivat tavaran hijsbalk-koukulla; Singel 7 n. 2 m leveä, julkisivuvero (amsterdamtourism; Wikipedia Canal house: kattokoukku/talakka huonekalujen nostoon, vero ei mainittu siellä).
Kuvat (Commons-luokat Stepped / Neck / Clock gables in Amsterdam, kaikki CC BY-SA 3.0/4.0 tai PD/CC0; lisenssi luettu API:lla):
- Askel: File:Amsterdam - Keizersgracht 18.JPG (CC BY-SA 3.0, Rudolphous, 3056×4592); File:Amsterdam - Herengracht 346.JPG (sama); File:Amstel 180-182 by night.jpg (CC0, Alf van Beem, 4608×3456).
- Kaula: File:Amsterdam - Prinsengracht 755.JPG / 835 / 851 (CC BY-SA 3.0 nl, Rudolphous); File:Amsterdam, Prinsengracht 156 (corrected).jpg (Kagra).
- Kello: File:Amsterdam - Prinsengracht 339.JPG, File:Amsterdam - Singel 14 v2.JPG (Rudolphous, CC BY-SA); File:Drie geveltoppen aan de Prinsengracht - Amsterdam - 20020178 - RCE.jpg (CC BY-SA 4.0).
- Nokka: vain Hollannin yleisluokka (Commons "Spout gables in the Netherlands", mm. Kerkplein 1 Abcoude, CC BY-SA 4.0); Amsterdam-kuva TUNT.
Riski: luokittelu perustuu Commonsin luokkiin, jokaisen talon pääty tyyppi pitää tarkistaa erikseen; osa taloista vaihdettu myöhemmin (Keizersgracht 50: askelpääty 1622 → kellopääty 1783). Kaikki kohteet 1600–1700-luvun tyylejä, siis 1873 ennen. Montako paria: 5 tyyppiä riittää 6–8:aan, jos käyttää kaksi esimerkkitaloa per kaulapääty/kello; vaikeampi: ”tyyppi ↔ aikakausi”.
Sopivuus: erittäin hyvä (näkyvä, kaupunkispesifi, pelissä jo); riski: aihe liian arkkitehtuuriseksi 13-vuotiaalle.

## EHDOKAS 2B: YHDISTÄ, VOC-tuote ja alkuperä
VOC perustettu 20.3.1602, lakkautettu 31.12.1799 (Wikipedia Dutch East India Company). Peli: Batavia/Jakarta on pelissä (asia-saapumiset.js, kaupunkiviittaus Amsterdamiin).
| Tuote | Alkuperä | Lähteet | Tila |
|---|---|---|---|
| Muskotti ja mace | Banda-saaret (Maluku) | Wikipedia Banda Islands ("only source until mid-19th c."); Wikipedia VOC | 2 lähdettä; VOC-monopoli ~2 vuosisataa, Coen 1621 |
| Neilikka | Molukit (Ternate, Tidore, Bacan, Makian, Moti) | Wikipedia Clove; Wikipedia Spice trade | 2 lähdettä; VOC yritti monopolia mutta puu kasvoi laajalla alueella (Ambon: TUNT., ei vahvistettu) |
| Kaneli | Ceylon (Sri Lanka) | Wikipedia Dutch Ceylon (VOC 1640–1796, Kandy-sopimus 1638); Wikipedia VOC (Galle 1640, monopoli 1659) | 2 lähdettä |
| Pippuri | Bantam (länsi-Jaava), Malabar | Wikipedia VOC; Wikipedia Spice trade (Malabar) | lähteet eroavat: Sumatra ei vahvistettu |
| Kupari (ja posliini) | Japani (Dejima 1641–1858) | Wikipedia Dejima; Wikipedia VOC | 2 lähdettä; Imari-posliinikauppa Dejimassa 1662 |
| Tekstiilit | Bengali (Mughal-Intia) | Wikipedia VOC | **TUNT.** toinen lähde |
| Tee | Kiina | Wikipedia VOC | **TUNT.** (VOC osti lopulta Batavian kautta) |
| Kahvi | ei varmistettu | – | pois |
Kuvat: tuotekuvia vapaasti Commonsista (en tarkistanut tässä ajossa; TUNT.); Rijksmuseumissa on VOC-esineitä PDM-kuvin, tunnuksia ei haettu.
Riskit: monopolin väkivalta (Banda 1621: joukkomurha, orjuus) herkkä 13-vuotiaille, taas 1799/1796 ennen 1873, nimet muuttuneet (Ceylon/Sri Lanka). Sopivuus: hyvä, tuottaa 6 varmaa paria; ei sidu Amsterdamiin yhtä vahvasti kuin pääty (VOC:n Amsterdamin kamari, Oostindisch Huis ei tarkistettu).

## EHDOKAS 3 (valinnainen, vain idea, ei tarkistettu)
Kanava ↔ nimen syy (Singel, Herengracht, Keizersgracht, Prinsengracht, Brouwersgracht): pelin teksti kertoo jo Brouwersgrachtin (1594 oluenpanimot) ja kolme asuinkanavaa; muiden syiden faktat TUNT. Ei suositeltu ilman erillistä tarkistusta.

## Suositus
1. Ehdokas 1 (EROTTELE, Rijksin PDM-maalaukset) on vahvin: kuvat varmasti vapaat, paljon valinnanvaraa, Rijksmuseum on pelin kohde. Poista SK-A-4691, SK-A-3957, SK-C-374; älä käytä Bruegelia/Boschia ilman rajauspäätöstä.
2. Ehdokas 2A (päätytyypit) hyvä lisävaihtoehto, jos 1 ei hyväksytä; 2B VOC varalla.
