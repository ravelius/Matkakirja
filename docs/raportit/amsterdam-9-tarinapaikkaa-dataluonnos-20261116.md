# Amsterdamin 9 tarinapaikkaa: dataluonnos (SK 16.11.2026, jonon erä 1)

Tila: LUONNOS, vain docs. Ei koske js/-tiedostoja. Data-PR vasta KK:n sanalla (yksi kaupunki kerrallaan) ja tekstien tarkistuksen (lahteet-ja-tarkistus 10) jälkeen.
Malli: Lontoon ja Pariisin tarinapaikat (docs/raportit/lontoo-9-tarinapaikkaa-valinta-20261114.md). Tavoite: Amsterdam 9 tarinapaikkaa (5 lehden kohdetta + 4 lisäystä).

## Menetelmä ja rehellinen tila

- Kolme Sonnet-apulaista tarkisti kaikki väitteet (pelin nykytekstit ja uudet kohteet), Commons-kuvat (lisenssi luettu API:sta) ja koordinaatit. Raakaraportit: scratchpad ams-A/B/C.md (ei repossa; tässä vain tulokset).
- Sääntö 2: jokainen luku, päivämäärä, mitta ja "kuka teki mitä" vaatii kaksi itsenäistä lähdettä; Wikipedian kieliversiot eivät ole kaksi lähdettä. **Pelin nykyiset Amsterdam-tekstit (Timanttihiomo, Amsterdam-laiva, Maitotyttö) näyttävät pohjautuvan nl-Wikipediaan**, ja moni väite ei täyty. Luonnostekstit alla sisältävät vain väitteet, joille on kaksi lähdettä tai jotka on kirjoitettu varovasti ("noin", "1870-luvulla", lähdemaininta). Jokaisen alla "Avoin" -rivi.
- Robots.txt luettu ennen sivustoa; ei käytetty: amsterdam.nl, Amsterdam Museum, Historic England, rijksmonumenten, Atlas Obscura, NPR, dbnl, JHU Muse, UNESCO, Lonely Planet, artnet. 403 (ei kierretty): Britannica, NGA, Met, Sussex Express. Kaksi menettelyvirhettä (agentti B): Nominatim /search ja PDOK Locatieserver kutsuttiin 6 + 6 kertaa ennen robots-kiellon huomaamista; tuloksia ei lasketa lähteeksi, kutsut lopetettu. Tekoälylle osoitettuja kehotteita sivuilla ei ollut.
- Valinta: lehden viisi kohdetta (Timanttihiomo, Amsterdam-laiva, Maitotyttö, Kissalaiva, Yövartio) + Herengracht 537 ja Kapein talo (molemmat lehtinostoja, ei tarinapaikkaa) + Rembrandtin talo ja Anne Frankin talo (kartalla, ei tekstiä). Kaikki pisteet kartan rajojen sisällä (N 52,3855, S 52,356, L 4,868, I 4,922). KK voi vaihtaa kaksi viimeistä (Rembrandt, Anne Frank) varaehdokkaisiin (Kuninkaanpalatsi/haikarat, Artis, Katu-urut; ei tutkittu).

## TÄRKEIN: kolme paikkaa ei vastaa vuotta 1873

1. **Boasin tehdas valmistui 1879** (peruskivi 1878): vuonna 1873 sitä ei ollut; peli sanoo "seisoo yhä".
2. **Yövartio ja Maitotyttö eivät olleet Rijksmuseumissa 1873.** Rijksmuseo toimi Trippenhuisissa (Kloveniersburgwal 29); nykyrakennus avattiin 13.7.1885. Maitotyttö oli Six-suvun yksityiskokoelmassa (museo osti 1908). Yövartion kartanpiste on Kuninkaanpalatsin (Dam) kohdalla: taulu oli siellä vain 1715–1808, ei nykyisin eikä 1873. Ehdotus: Yövartion piste Rijksmuseoon (nykytila; Maitotytön viereen, `siirto`) tai pidetään; KK päättää. Rijksmuseon piste on vain 440 m etelärajan sisäpuolella.
3. **Kissalaiva, Amsterdam-laivan kopio, Anne Frank, Rembrandtin museo** ovat 1900-lukua: tekstin viimeinen kappale kertoo, ettei niitä 1873 vielä ollut (Lontoon Baird-malli).

## Kohdat

### 1. Timanttihiomo (Boas, Kaapin aika)
- Data: nykyinen rivi (`nimi: 'Timanttihiomo', tyyppi: 'ilmio', lat: 52.3696, lon: 4.904, nosto: 'syvennys-amsterdam-timantit'`) + `tarinapaikka: true, merkki: 'tiimalasi'`. Piste Nieuwe Uilenburgerstraat 173 (Wikidata 52,369597/4,904051; OSM 52,36959/4,90407; sopivat).
- aika: `1870–1879`
- Teksti:
  > Amsterdam oli 1600-luvun lopulta maailman timanttikaupunki. Hionta ei kuulunut kiltoihin, eikä juutalaisia olisi kiltoihin otettukaan; työ tehtiin aluksi kotona. Hiomapyöriä pyörittivät ensin naiset ja lapset, 1820-luvulta hevoset ja 1840-luvulta höyry.
  >
  > Vuonna 1870 Etelä-Afrikasta saapui Amsterdamiin ensimmäinen raakatimanttien erä, ja alkoi Kaapin aika: nousukausi, jota kesti 1870-luvun puoliväliin. Työ oli raskasta, ja tuberkuloosi vaivasi alan työläisiä. Vuonna 1894 timanttityöläiset perustivat oman ammattiliittonsa, Algemene Nederlandse Diamantbewerkersbondin.
  >
  > Isoisäsi matkavuonna 1873 Kaapin aika oli täydessä vauhdissa. Boasin veljesten tehdas Nieuwe Uilenburgerstraatilla valmistui vasta 1879; nykyään talossa on Gassanin timanttitehdas.
- Lähteet (itsenäiset): Diamantmuseum Amsterdam (diamondmuseum.com/history), Bronsema PIE-raportti 14 (1994, industrieel-erfgoed.nl), diamantbewerkers.nl/en/trade, J. Kok (IISG/Leiden), Gassan (gassan.com).
- Avoin: peli sanoo "Euroopan suurin" (PIE14) vs "maan suurin" (monumenttiperustelu nl-WP:n kautta) → ei tekstiin. Kaapin ajan loppu (1873/1876) ristiriita → "puoliväliin". Reitti Portugali/Antwerpen eroaa (DM/DBW) → ei tekstiin. Superlatiivi "ensimmäinen suuri ammattiliitto" vain Kokilla → ei. "Hiotaan edelleen" vain markkinointisivu → "timanttitehdas". Yli 10 000 työntekijää ja 70 % juutalaisia: ei 2L → ei tekstiin.
- Kuvat: `Diamantslijperij Boas.jpg` (PD, J. van Dam, n. 1900; sama rakennus: paras), `Slijpen van de diamant bij Van Moppes in Amsterdam, Bestanddeelnr 252-0343.jpg` (CC0, W. van de Poll 1932; jo pelissä), `Diamantbewerkers, SFA022809203.jpg` (PD, 1909; tekijä tuntematon, PD-peruste tarkistettava). Ei `Boas.jpg` (lisenssi epäselvä).
- Lehtitekstin korjattavaa (sääntö 11): höyry 1840-luvulta (ei "noin 1850"); katu on Nieuwe Uilenburgerstraat; "Kimberleystä 1870" → "Etelä-Afrikasta 1870" (Kimberley löytyi 1871, nimi 1873); "Boasin tehdas seisoo yhä" = ei 1873 (1879); "parhaana timanttivuotena", 1848/1860 -luvut, yli 10 000, seitsemän kymmenestä, kaksitoistatuntiset päivät, "1875 kriisi", "hiotaan edelleen" ei 2L.

### 2. Amsterdam-laiva (VOC 1749)
- Data: nykyinen rivi (`nimi: 'Amsterdam-laiva', tyyppi: 'esine', lat: 52.3714, lon: 4.9147, nosto: 'syvennys-amsterdam-voc-hylky'`) + `tarinapaikka: true, merkki: 'tiimalasi'`. Piste: merkkimuseon laituri (Wikidata Q1616123 52,371389/4,914719; OSM 52,372005/4,914953; ero 70 m). Hylky on Englannissa (50,847/0,524), ei kartalla.
- aika: `1749`
- Teksti:
  > Vuoden 1749 tammikuussa VOC:n laiva Amsterdam lähti ensimmäiselle matkalleen Bataviaan. Kapteeni Willem Klump oli 33-vuotias, ja laivassa oli yli 330 ihmistä. Jo ennen rantaa noin viisikymmentä miehistön jäsentä oli kuollut tautiin. Myrsky ja hiekkasärkkä veivät laivalta peräsimen, ja 26. tammikuuta 1749 laiva ajettiin rantaan Hastingsin lähellä Englannissa.
  >
  > Laivan irrottamisyritys päättyi 11. maaliskuuta 1749, ja Amsterdam vajosi rannan saveen. Noin kaksi kolmasosaa laivasta on tallella: hylky tuli näkyviin 1969 ja on suojeltu 1970-luvulta.
  >
  > Isoisäsi matkavuonna 1873 hylky oli maannut Englannin rannalla jo 124 vuotta. Amsterdamissa seisova laiva on nykyaikainen kopio, joka rakennettiin 1980-luvulla.
- Lähteet: Shipwreck Museum Hastings (shipwreckmuseum.co.uk/amsterdam), Hastings Independent Press, The Past (the-past.com), Sussex Smuggler, Het Scheepvaartmuseum (hetscheepvaartmuseum.nl), RCE (mass.cultureelerfgoed.nl; osin kopio nl-WP:stä).
- Avoin: väitteet jätetty pois ristiriidan vuoksi: henkilömäärä 335 vs 333 (→ "yli 330"), hopearkkuja 27 vs 28 ja 300 000 guldenia, "kolme viikkoa" (todellisuudessa noin 6), "hopea mukana, loput ryöstäjille" (ryöstäjät veivät n. 50 harkkoa), kuka päätti rantautua (kapteeni vai miehistö), replikan vuodet 1982/1985 ja 400 vapaaehtoista (kopio 1980-luvulla: HSM + WP-en; 1985–90 / 1982–90), 1969 löytö: matala vesi vs viemärityömaa (→ "tuli näkyviin 1969"), suojelu 1973 (laki) / 1974 (nimeäminen) → "1970-luvulta". Rakennusvuosi 1748 yhden lähderyhmän varassa → ei tekstiin. Hylyn tarkka sijainti toisesta lähteestä (Historic England kielletty).
- Kuvat: `The wreck of the Amsterdam in the fossil forest at Bulverhythe - geograph.org.uk - 8295766.jpg` (CC BY-SA 2.0, Adrian Diack; jo pelissä), `De Amsterdam (1990 replica).jpg` (CC BY-SA 4.0, Martinvl; kopio), `VOC ship Amsterdam 4.jpg` (PD-kenttä, Malis; kopio).
- Lehtitekstin korjattavaa: 203 + 127 + 5 → "yli 330"; 27 arkkua ja 300 000 pois tai "yli kaksikymmentä arkkua"; "kolme viikkoa" → "noin kuusi viikkoa"; ryöstäjäkappale; "runko oli tallella, koska savi ei päästä happea" (mekanismi ei lähteissä; "kaksi kolmasosaa"); "vesi laski matalalle" (kaksi tarinaa); esineet myös Alankomaissa; replika 1982 ja 400 vapaaehtoista.

### 3. Maitotyttö (Vermeer)
- Data: nykyinen rivi (`nimi: 'Maitotyttö', tyyppi: 'taide', lat: 52.3599, lon: 4.885, nosto: 'nosto-amsterdamin-maitotytto', nimiPuoli: 'oikea', siirto: { x: 26, y: 0 }`) + `tarinapaikka: true, merkki: 'lyyra'`. Rijksmuseo: Wikidata 52,36/4,885278, OSM 52,35966/4,88428 (ero 90 m).
- aika: `n. 1660`
- Teksti:
  > Maitotyttö on pienempi kuin useimmat kuvittelevat: 45,5 senttiä korkea ja 41 leveä. Johannes Vermeer maalasi sen noin vuonna 1660, ja hänen tuotannostaan tunnetaan vain noin 35 maalausta.
  >
  > Rijksmuseo tutki taulua vuonna 2022 röntgen- ja infrapunatekniikoilla. Maalin alta paljastui, että Vermeer oli suunnitellut seinälle kannuhyllyn ja lattialle tulikorin ja peittänyt ne sitten pois, jolloin katse jää naiseen ja maitoon.
  >
  > Isoisäsi matkavuonna 1873 taulua ei vielä ollut Rijksmuseossa. Se kuului Six-suvun yksityiskokoelmaan, ja museo osti sen vasta 1908 Vereniging Rembrandtin tuella. Rijksmuseo toimi tuolloin Trippenhuisissa; nykyinen rakennus avattiin 1885.
- Lähteet: Rijksmuseum (objektisivu SK-A-2344; lehdistötiedote 8.9.2022; historia), Essential Vermeer, DutchNews.
- Avoin: ajoitus c. 1657–1661 (RM:n omat sivut: 1658, 1658–59, 1660) → "noin 1660". Tiedote mainitsee macro-XRF ja SWIR-infrapunan, ei tavallista röntgeniä: "röntgen- ja infrapunatekniikoilla" on varovainen. Kannuhylly oli vain luonnosteltu, ei viimeistelty → "suunnitellut". Rijksmuseo Trippenhuisissa 1873: RM-historia + Yövartion siirtotieto; toinen itsenäinen lähde Cuypersin rakennuksen avaukselle 1885 puuttuu (RM + Wikipedia). "Keittiöapulainen", "Rijksmuseon keskeisimpiä teoksia" ja "katse jää maitoon ja käsiin" ei 2L → ei tekstiin.
- Kuvat: `Johannes Vermeer - Het melkmeisje - Google Art Project.jpg` (PD; jo pelissä), `Amsterdam - Rijksmuseum 1885 - The Gallery of Honour (1st Floor) - The Milkmaid 1657-58 by Johannes Vermeer.png` (CC BY-SA 4.0, Txllxt TxllxT).
- Lehtitekstin korjattavaa: "runsaat kolmekymmentä" → "noin 35"; "röntgenillä ja infrapunavalossa" ok varovasti; "maalasi molemmat itse umpeen" (kannuhylly vain luonnos).

### 4. Kissalaiva (Poezenboot)
- Data: nykyinen rivi (`nimi: 'Kissalaiva', tyyppi: 'esine', lat: 52.3781, lon: 4.8931, nosto: 'nosto-amsterdamin-kissalaiva'`) + `tarinapaikka: true, merkki: 'tiimalasi'`. Piste sopii (nl-WP 52,37821/4,89303; BAG-piste ero 15–25 m; laiva on Singel 40:n vastapäätä vedessä).
- aika: `1966–1968`
- Teksti:
  > Vuonna 1966 Henriëtte van Weelde alkoi ottaa kotiinsa Herengrachtille kulkukissoja, ensimmäisenä emokissan pentuineen. Kun kissoja tuli lisää, hän osti vuonna 1968 asuntolaivan Singel-kanavasta. Siitä tuli kissoille turvakoti: osa niistä saa uuden kodin, ja laivalla vierailee kerrallaan vain kuusi ihmistä.
  >
  > Sisäänpääsy laivalle on ilmainen. Kissat ovat turvakodin asukkaita, eivät nähtävyys.
  >
  > Isoisäsi matkavuonna 1873 Kissalaivaa ei vielä ollut: ensimmäinen laiva ostettiin vasta 1968, 95 vuotta myöhemmin. Singel-kanavassa on nykyään uusi laiva, joka otettiin käyttöön syyskuussa 2023.
- Lähteet: Stichting De Poezenboot (depoezenboot.nl: historia, vierailijatiedot), Holland Times (hollandtimes.nl), DutchReview, Mental Floss.
- Avoin: "noin 60 kissaa" (nl-WP = iAmsterdamin kopio, Mental Floss "noin 50") → ei lukua; "yli 100 km kanavia" ja "satoja asuntolaivoja" (lähteet n. 2 500) → pois; "kissat kulkevat vapaana kannella" vain epäsuorasti. Kävijöiden varaus päättyi loppuvuonna 2025 (DPB) → vierailu rajattu, mutta pelitekstissä vain "kuusi kerrallaan" (tarkistettava ennen dataa, koska ajankohtainen). Henriëtten kuolinvuosi 2005 ja säätiö 1987 (DPB + HT/MF) voidaan lisätä. Pulu-/päivitysriski: laiva vaihtui 2023.
- Kuvat: `De Poezenboot (Exterior), Amsterdam (2168146135).jpg` (CC BY-SA 2.0, Antony Stanley; 2006 = VANHA laiva; kuvatekstissä oltava vuosi), `Mevrouw H. van Weelde en enkele medewerksters openen kooien op Poezenboot op S, Bestanddeelnr 933-5755.jpg` (CC0, Anefo 21.2.1986), `2023 Poezenboot, Asd (1).jpg` (CC BY-SA 4.0, Ceescamel; uusi laiva).
- Lehtitekstin korjattavaa: "noin 60" kissaa, "yli sata kilometriä", "satoja asuntolaivoja", "kulkevat vapaana kannella"; polkupyöräkuva (12 000–15 000/vuosi: kaksi lähdettä kumpikin Waternetin arvio; ei nostoa kuvassa).

### 5. Yövartio (Rembrandt)
- Data: nykyinen rivi (`nimi: 'Yövartio', tyyppi: 'taide', lat: 52.3731, lon: 4.8913, nosto: 'nosto-amsterdamin-yovartio', nimiPuoli: 'vasen', siirto: { x: -26, y: 0 }`) + `tarinapaikka: true, merkki: 'lyyra'`. **Piste on Kuninkaanpalatsin kohdalla (52,37317/4,89136) = ei 1873 eikä nykytila** (ks. yllä; ehdotus Rijksmuseo 52,360/4,885).
- aika: `1642–1715`
- Teksti:
  > Rembrandt valmisti kaartin ryhmäkuvan vuonna 1642. Teoksella ei alun perin ollut nimeä, ja nimi Yövartio on tallessa asiakirjasta vasta 1700-luvun lopulta. Rijksmuseon mukaan kuva esittää päiväsaikaan kulkevaa joukkoa, vaikka sävyt ovat tummat.
  >
  > Vuonna 1715 taulu siirrettiin kaupungintaloon Dam-torille, ja koska se oli liian suuri uudelle paikalle, siitä leikattiin kaistale joka reunalta. Eniten katosi vasemmalta, ja palasia ei ole koskaan löydetty. Gerrit Lundensin pieni 1600-luvun kopio näyttää, miltä koko taulu näytti.
  >
  > Isoisäsi matkavuonna 1873 taulu ei ollut Dam-torilla eikä nykyisessä Rijksmuseossa, joka avattiin vasta 1885, vaan Trippenhuisissa Kloveniersburgwalilla. Pinnalla oli paksu, tummunut lakka; puhdistukset tehtiin vasta 1946–47 ja 1975–76.
- Lähteet: Rijksmuseum (objektisivu, lehdistötiedote, "10 things", Bulletin 1976 Kuiper & Hesterman), National Gallery (NG289, Lundensin kopio).
- Avoin: mitat kolme lukua (363×437 Wikipedia; RM 379,5×453,5 ja 379,5×436) → ei lukuja. Vasemmalta katosi "kaksi miestä" ei täyty (NG: kaksi miestä ja lapsi; Dibbits kolme hahmoa) → "eniten vasemmalta"; askelman reuna ja holvikaaren huippu vain Wikipedia → pois. "Ainoa todiste" (Lundens) ei tuettu; NG mainitsee myös johdannaisen akvarellikopion → pois. "Oikea nimi: Frans Banning Cocqin komppania" ei ole alkuperäinen nimi (RM: "Banninck Cocq") → pois. **"Lakka poistettiin 1940-luvulla" on harhaanjohtava**: 1946–47 vain osa vanhasta lakasta poistettiin ja uusi lisättiin; loput 1975–76 (RM Bulletin + RM-varnish); lakan yhteys nimeen on tulkinta → tekstissä ei syy-yhteyttä. Taulun paikka 1873: Trippenhuis kahdesta lähteestä (RM-objektisivu + Wikipedia), mutta siirtovuosi 1808/1813 eroaa; tarkka sali ja kehys 1873 ei löytynyt. "Päiväsaikaan" Rijksmuseon oma väite (Wikipedia ja MF samaa), toinen itsenäinen puuttuu: lähdemaininta "Rijksmuseon mukaan".
- Kuvat: `The Night Watch - cropped.jpg` (PD, Rembrandt; jo pelissä), `Lundens - Nachtwache-Kopie.jpg` (PD; jo pelissä), `The Night Watch - HD.jpg` (PD, Rijksmuseon skannaus).
- Lehtitekstin korjattavaa: mitat, "kaksi miestä", "lakka poistettiin vasta 1940-luvulla", "ainoa säilynyt todiste", "oikea nimi", kuvatekstin "lakka lähes musta".

### 6. Herengracht 537 (puupaalut)
- Data: nykyinen rivi (`nimi: 'Herengracht 537', lat: 52.3649, lon: 4.8946, nosto: 'nosto-amsterdamin-puupaalut'`) + `tarinapaikka: true, merkki: 'tiimalasi', tyyppi: 'ilmio'`. Piste: geokooderit 52,3652/4,8942 (ero 35–40 m), mutta eivät ole itsenäinen pari (robots-virhe, ks. yllä); toinen lähde puuttuu.
- aika: `1648–1961`
- Teksti:
  > Amsterdamin keskusta on rakennettu pehmeälle, vetiselle maalle, joten vanhojen talojen alla on maahan lyötyjä puupaaluja. Dam-torin kaupungintalon, nykyisen kuninkaanpalatsin, alle lyötiin 13 659 paalua norjalaisesta kuusesta; ensimmäinen kivi laskettiin 28. lokakuuta 1648.
  >
  > Paalu kestää niin kauan kuin se pysyy veden alla. Jos pohjavesi laskee, happi pääsee puuhun, ja sienet ja bakteerit alkavat lahottaa sitä. Maaliskuussa 1961 Herengracht 537:n eteen pystytettiin tukipaaluja, ja kuvan otti valokuvaaja Harry Pot.
  >
  > Isoisäsi matkavuonna 1873 Dam-torin rakennus oli jo kuninkaan palatsi, mutta sen alla olivat yhä samat 13 659 paalua.
- Lähteet: Paleis Amsterdam (paleisamsterdam.nl), Alankomaiden kuningashuone (royal-house.nl), M for Amsterdam (mforamsterdam.com), RVO (rvo.nl), Rotterdamin kaupungin esite (kcaf.nl), Nationaal Archief / Anefo (kuva 912-2174).
- Avoin: "suota ja löysää hiekkaa" ei täyty (turvetta ja savea; hiekka on kantava kerros; lähde vain MFA ja hakuyhteenveto) → "pehmeälle, vetiselle maalle"; "jokainen talo" → "vanhojen talojen" (ylilyönti); "palatsi avattiin kaupungintaloksi 1655" ei 2L (Britannican vahvistus 403) → vuosi 1648 (PA + RH); "talo nojaa naapuriinsa" ei lähdetty; **1961-tuennan syytä ei löydy** (kuvateksti väitti pohjaveden laskun) → teksti kertoo vain tuennasta. Herengracht 537:n rakennusvuosi, rijksmonument-asema ja oikea sijainti kahdesta lähteestä avoin. 1873: palatsi kuninkaallinen 1808 alkaen (RH + PA).
- Kuvat: `Amsterdam stut zijn huizen met palen Perceel Herengracht 537 achter palenbos, Bestanddeelnr 912-2174.jpg` (CC0, Harry Pot / Anefo 13.3.1961; jo pelissä), `Herengracht 537.jpg` (CC BY-SA 4.0, Yair Haklai; julkisivu).
- Lehtitekstin korjattavaa: "suota ja löysää hiekkaa", "jokainen talo", "palatsi avattiin 1655", "talo nojaa naapuriinsa", kuvatekstin syy-yhteys.

### 7. Kapein talo (Oude Hoogstraat 22)
- Data: nykyinen rivi (`nimi: 'Kapein talo', lat: 52.3712, lon: 4.8977, nosto: 'nosto-amsterdamin-kapein-talo'`) + `tarinapaikka: true, merkki: 'tiimalasi', tyyppi: 'ilmio'`. Piste sopii (OSM 52,37123/4,89767; Wikipedia 52,3711/4,8978).
- aika: `1738`
- Teksti:
  > Oude Hoogstraat 22 on Amsterdamin kapein koko talo: julkisivu on 2,02 metriä leveä ja talo viisi metriä syvä. Kanavien varren talot ovat kapeita ja syviä, ja niissä on usein katonrajassa nostopuu, hijsbalk, jonka avulla huonekalut nostetaan köydellä ikkunasta sisään, sillä portaat ovat jyrkät ja kapeat.
  >
  > Singel 7:n talon takajulkisivu on vain noin metrin levyinen, mutta etuosa on selvästi leveämpi, joten kapein koko talo on silti Oude Hoogstraatilla.
  >
  > Isoisäsi matkavuonna 1873 talo oli jo seissyt paikallaan yli sata vuotta: se mainitaan ensi kerran 1738. Nykyään siinä on teekauppa.
- Lähteet: iAmsterdam (iamsterdam.com, het-smalste-huis), Het Kleinste Huis (hetkleinstehuis.nl: oma sivu), DutchReview, amsterdamoudestad.nl, nl-Wikipedia Hijsbalk (Bureau Monumentenzorgin teksti) + amsterdamian.com (nostopuu).
- Avoin: **"kuusi metriä syvä" on VIRHE: 5 metriä** (iAmsterdam, hetkleinstehuis.nl, DutchReview, amsterdamoudestad); sama virhe pelissä: nahtavyysjutut.js, fokusvirta-amsterdam.js (~rivit 619, 652, 1261, 1292), kulttuuri-kategoriat.js (~8563), europe-kulttuuri.js (~433), pulu-esigenerointi NLD.json. **"Julkisivuvero laski leveyden mukaan" ei täyty**: Stadsarchiv (Archinedin 2010 toisen käden viittaus) kiistää; nl-Wikipedia väittää ilman lähdettä; mikään lähde ei yhdistä OH22:n kapeutta veroon (talo 1738/1768–1787, ei 1600-luku) → vero pois, sana "kallis rantamaa" jätetty pois (vain amsterdamian). Talossa itsessään ei vahvistettu hijsbalkia (teksti kertoo kanavataloista yleisesti). Käyttö 1873 ei selvinnyt. Repossa sekaannus: docs/raportit/kuusi-nostoa-laji-20261116.md kirjaa "Singel 7, julkisivuvero" mutta pelissä on OH22. Teekauppa 2014 (hetkleinstehuis.nl + Wikipedia).
- Kuvat: `Voorzijde kleinste huis van Amsterdam.jpg` (CC BY-SA 3.0 nl, Smallesthouse), `Amsterdam(3sa9) (15872273640).jpg` (CC BY 2.0, Shadowgate), `Detail van de top van de voorgevel, een klokgevel, met hijsbalk - Amsterdam - 20528909 - RCE.jpg` (CC BY-SA 4.0, René Gerritsen; jo pelissä, ei OH22). Ei `Het kleinste huis van Amsterdam.jpg` ("Gebouwd in 1738" kuvatekstissä).
- Lehtitekstin korjattavaa: "kuusi metriä" → "viisi", verolause pois, "siksi jyrkät" (syy verosta).

### 8. Rembrandtin talo
- Data: uusi tarinapaikka (nykyinen kartta-rivi `nimi: 'Rembrandtin talo', lat: 52.3693, lon: 4.9012` ilman nostoa): `tarinapaikka: true, merkki: 'lyyra', tyyppi: 'henkilo', nosto: 'nosto-rembrandtin-talo'` (uusi nosto). Piste sopii (OSM 52,36937/4,90125; nl-WP 52,36944/4,90139). Kartan kommentti "talossa, jossa taulu maalattiin" ei vahvistu 2L → muutettava.
- aika: `1639–1658`
- Teksti:
  > Jodenbreestraat 4:n talo oli Rembrandtin koti ja työpaja vuosina 1639–1658. Hän osti sen vuonna 1639 noin 13 000 guldenilla ja sai maksaa summan osissa; katu oli silloin Breestraat.
  >
  > Raha ei riittänyt: vuonna 1656 Rembrandt ajautui maksukyvyttömäksi, ja talon irtaimisto luetteloitiin. Lähes kaikki huutokaupattiin, talo myytiin vuonna 1658, ja hän muutti vuokra-asuntoon Rozengrachtille.
  >
  > Isoisäsi matkavuonna 1873 talo oli yksityinen asuin- ja liiketalo, jossa asui juutalainen Spitzin perhe ja jonka yläkerrassa oli huonesynagoga. Museo avattiin vasta vuonna 1911.
- Lähteet: Museum Het Rembrandthuis (rembrandthuis.nl/en/rembrandt-van-rijn, PDF "Rembrandts life and work", kroniikka), National Gallery (nationalgallery.org.uk/artists/rembrandt), Joods Amsterdam (joodsamsterdam.nl/synagoge-jodenbreestraat), De Vrijdagavond (devrijdagavond.com).
- Avoin: hinta ja osto ovat saman museon ketjua (NG vahvistaa muuton 1639, ei hintaa). **"Konkurssi"**: museon sivut ristiriidassa ("julistettiin konkurssiin" / "vältti niukasti"), NG: cessio bonorum heinäkuussa 1656 → "maksukyvyttömäksi". Hinta 11 000 guldenia ja kauppakirja 1.2.1658 vain museon kroniikka + Wikipedia → ei tekstiin. Spitzin asettumisvuosi 1852 vs 1862 (molemmat ennen 1873) → ei vuotta. "Yövartio maalattiin tässä talossa" EI vahvistettu 2L → ei tekstiin. Kaupungin osto 1906/1907 → ei tekstiin. Rakennusvuosi n. 1606 vain Wikipedia.
- Kuvat: `Amsterdam Jodenbreestraat 4.jpg` (CC BY-SA 3.0, Spider), `Rembrandthuis, Amsterdam, 2015-04-25b.jpg` (CC BY-SA 4.0, Bysmon), `Hilverdink, Johannes J. A. (1813-1902), Afb 010097003745.jpg` (PD, n. 1850; aikalaiskuva: Jodenbreestraat, talo 4–6 vasemmalla).

### 9. Anne Frankin talo (Prinsengracht 263)
- Data: uusi tarinapaikka (nykyinen kartta-rivi `nimi: 'Anne Frankin talo', lat: 52.3752, lon: 4.8841, wiki: 'Anne Frankin talo'`): `tarinapaikka: true, merkki: 'tiimalasi', tyyppi: 'henkilo', nosto: 'nosto-anne-frankin-talo'` (uusi nosto). Piste sopii (OSM 52,37516/4,88408; en-WP 52,37528/4,88444). Westerkerk poistettu kartalta päällekkäisyyden vuoksi.
- aika: `1942–1944`
- Teksti:
  > Prinsengracht 263 on 1600-luvulla rakennettu kanavatalo, jonka takarakennukseen Frankin perhe meni piiloon heinäkuussa 1942. Viikkoa myöhemmin tulivat van Pelsin perhe ja marraskuussa Fritz Pfeffer: kahdeksan ihmistä asui piilossa yli kaksi vuotta. Anne kirjoitti piilossa päiväkirjaa, jonka hän oli saanut 13-vuotislahjaksi 12. kesäkuuta 1942.
  >
  > Otto Frank julkaisi päiväkirjan nimellä Het Achterhuis kesäkuussa 1947. Talo oli 1950-luvulla purkuvaarassa, mutta säätiö pelasti sen, ja museo avattiin 3. toukokuuta 1960. Otto halusi, että takarakennus jätetään kalustamatta.
  >
  > Isoisäsi matkavuonna 1873 talo oli seissyt kanavan varrella jo yli kaksisataa vuotta. Sen kuuluisat asukkaat tulivat vasta lähes seitsemänkymmentä vuotta myöhemmin.
- Lähteet: Anne Frank Huis (annefrank.org: timeline, secret annex, how it all began), USHMM (encyclopedia.ushmm.org: Anne Frank biography, diary).
- Avoin: rakennusvuosi 1635 (annefrank.org + en-WP) vs Wikidata 1641 (haun tiivistelmä) → "1600-luvulla". Takarakennus 1739/1740 eroaa → ei tekstiin. Otto Frankin yrityksen muutto 1.12.1940: annefrank.org + Wikipedia → ei tekstiin. Museon avaus 3.5.1960 ja pelastus 1957: kaikki annefrank.org-ketjua + Wikipedia (ei toista itsenäistä) → varmistettava USHMM tai muu ennen dataa. Päiväkirjan julkaisukuukausi (kesäkuu 1947: annefrank.org; USHMM vain "1947"): jos ei 2L → "1947". Käyttö 1873 ei selvinnyt (yhden lähteen mukaan 1800-luvulla yksityisasunto, varasto, hevosia) → teksti kertoo vain rakennuksen iän. Aiheen herkkyys: sävy asiallinen, kuolemista ei kerrota; KK päättää, otetaanko mukaan vai vaihdetaan.
- Kuvat: `AnneFrankHouseAmsterdamtheNetherlands.jpg` (CC BY-SA 3.0, Massimo Catarinella; jo pelissä), `Huis van Anne Frank, Bestanddeelnr 908-4126.jpg` (CC0, Wim van Rossem / Anefo 20.3.1957; ennen museota), `Amsterdam (NL), Anne-Frank-Huis, 2022 (1).jpg` (CC BY-SA 4.0, Lệ Xuân).

---

## Yhteenveto KK:lle

| # | Paikka | Lähdetila | Ennen dataa |
|---|---|---|---|
| 8 | Rembrandtin talo | hyvä (museon ketju + NG) | KK: tekstit ja uusi nosto; 11 000 gld ja "Yövartio maalattiin tässä" ei tekstiin |
| 9 | Anne Frankin talo | hyvä (annefrank.org + USHMM) | KK: aiheen sopivuus; museon avauksen 2. lähde |
| 7 | Kapein talo | hyvä, kaksi virhettä korjattu (5 m, vero pois) | KK hyväksyy teksti |
| 3 | Maitotyttö | hyvä (RM + EV + DN) | ajoitus noin 1660; KK |
| 5 | Yövartio | keskitaso | **piste (Palatsi → Rijksmuseo?)**, mitat pois, Trippenhuis-2. lähde |
| 4 | Kissalaiva | hyvä (säätiö + 3 sivustoa) | kuva vanhasta laivasta vuosineen; kävijäinfo |
| 1 | Timanttihiomo | keskitaso (nl-WP-pohjaiset luvut pois) | toinen lähde Euroopan suurin/10 000/70 %; 1873-kehys (Boas 1879) |
| 2 | Amsterdam-laiva | keskitaso (monta ristiriitaa) | replikan vuodet, hopea, 1969-tarina |
| 6 | Herengracht 537 | heikoin (1961-syy tuntematon, toinen lähde sijainnille puuttuu) | KK päättää vaihdetaanko |

Pelissä jo olevat lehtitekstit (Timanttihiomo, Amsterdam-laiva, Maitotyttö, Kissalaiva, Yövartio, Herengracht 537, Kapein talo; js/packs/nahtavyysjutut.js, fokusvirta-amsterdam.js, kulttuuri-kategoriat.js, europe-kulttuuri.js, NLD.json) sisältävät yllä listatut virheet (sääntö 11). Korjaus samassa data-PR:ssä; kaikki äänitetyt kappaleet → äänitysjono (tools/aanitysjono/tarkista.mjs) samassa commitissa ja KK:n sana ennen yhdistämistä.

Seuraavat askeleet (KK:n sanalla): 1) aiheiden ja pisteiden hyväksyntä (Yövartio-piste; Rembrandt ja Anne Frank mukaan), 2) puuttuvat toiset lähteet (kuvissa merkitty), 3) kuvien lataus ja lisenssitunnisteet, 4) data-PR (maakartat.js 9 kohdetta + nahtavyysjutut.js tekstit + 2 uutta nostoa + tarkista.mjs-jonorivit), 5) tarkistaja ja KK:n faktahyväksyntä ennen ääntä.
