# Pääkaupunkilehden pistokoe: Andorra la Vella (erä e02, 11.10.2026)

Tarkistaja: Sonnet-agentti (Sisältökirjuri). Aineisto: `.../scratchpad/pk-e02/paakaupungit-pilvi/e02/andorralavella/` (sisalto.json = valmis lehti, jossa pilviagentin tarkistus.md:n korjaukset on jo tehty; faktapohja.md, kuvat.md, tarkistus.md, konteksti.json). Aineistoon ei ole tehty muutoksia.

Menetelmä: jokainen väite tarkistettu vähintään kahdesta itsenäisestä lähteestä (Wikipedia + toinen), kun toinen löytyi; yhden lähteen väitteet on merkitty. UNESCO-sivut (whc.unesco.org) palauttivat 403, joten UNESCOn tiedot on merkitty "hakutuloksen kautta". estadistica.ad:n robots.txt-polku antoi 404, joten väestöluku luettiin Departament d'Estadístican joulukuun 2025 tiedotteesta (PDF, kopio altaveu.com), ei massahakua. Commonsin tiedot luettiin MediaWiki-rajapinnasta (extmetadata) ja kuvat katsottiin 900 px:n esikatselulla.

## Yhteenveto

- Väitteet: 28 tarkistettua kohtaa, OIKEIN 20 (osassa pieni huomautus), EPÄTARKKA 8, VIRHE 0.
- Kuvat: 7 tarkistettua kuvaa, OIKEIN 6, EPÄTARKKA 1 (T4, aihe ei sovi nostoon), VIRHE 0. Lisenssit, tekijät ja tiedostojen olemassaolo täsmäävät kaikissa; ei tunnistettavia kasvoja, ei väkivaltaa; teksti vain PD-kartassa (painettu otsikko ja kirjastoleimat).
- Toistuva virhetyyppi: kohteen laajuus sekoittuu (maa/seurakunta/kaupunki, "Andorrasta" vs "kaupungista") ja yhden Wikipedia-virkkeen luku esitetään faktana ilman toista lähdettä (ilmaston lämpötilat, 1419, Santa Coloman suojeluspyhimys, "johti uudistusryhmää").
- EPÄVARMAT: (a) Halévy-noston kuva: vaihda Commonsin PD-oopperakuvaan "Halévy - Le val d'Andorre - 3ème acte - dessin d'H. Valentin, 1848.png" (pilviagentin "ei oopperakuvaa" oli väärin, Category:Le val d'Andorre sisältää toistakymmentä PD-tiedostoa). (b) valokuva.vuosi "2010-luku" on OIKEA (EXIF 22.8.2013); suosittelen tarkentamaan "2013".

## Väitetaulukko

JSON-polut ovat sisalto.json:ssa. "Korjattu lause" vain EPÄTARKOILLE.

| # | Polku | Väite | Tulos |
|---|---|---|---|
| 1 | artikkeli.intro | 24 836 asukasta 31.12.2025 | EPÄTARKKA (seurakunta, ei kaupunki) |
| 2 | artikkeli.intro | noin 1 023 m, "lähteen mukaan" Euroopan korkein pääkaupunki | OIKEIN |
| 3 | tiedot[0] | noin 1 020 m + korkein pääkaupunki "lähteen mukaan" | OIKEIN |
| 4 | nahtavyydet."Casa de la Vall", nostot[0] | rakennettu 1580 (vaakunan vuosi), Busquetsin suku | OIKEIN |
| 5 | nostot[0], jaksot[1], kysymykset[2] | yleiskokous osti 1700-luvun alussa, parlamentti 1702-2011 | OIKEIN |
| 6 | nahtavyydet."Casa de la Vall".teksti | 1960-luvun peruskorjaus (rappaus pois, torni), 1 euron kolikko, seitsemän avaimen kaappi | OIKEIN |
| 7 | artikkeli.intro, kaupunkilehti[1].nostot[0] | 1278 sopimus (pareatge), Foix'n kreivi ja Urgellin piispa | OIKEIN |
| 8 | artikkeli.teksti, kaupunkilehti[1].nostot[1] | maaneuvosto "perustettiin 1419" | EPÄTARKKA (lievä) |
| 9 | nostot[2], tehtava | 1866 uudistus, 24-jäseninen Council General, perheenpäät äänioikeutettuja | OIKEIN |
| 10 | nostot[2].teksti, kysymykset[3] | syndic Areny-Plandolit "johti uudistusryhmää" | EPÄTARKKA (lievä) |
| 11 | artikkeli.teksti, nostot[2] | uudistus loi perustan tunnuksille/kolmivärilipulle | OIKEIN (yksi lähde) |
| 12 | nostot[2].teksti | Napoleon-aika: 1812-1813 Puigcerdàn piirikunta, keisarillinen asetus 1814 | OIKEIN |
| 13 | nostot[3].teksti | Halévyn Le val d'Andorre 1848, Opéra-Comique, juoni asevelvollisuuden välttämisestä, niemimaasota | OIKEIN |
| 14 | nostot[1], nahtavyydet."Santa Coloman kirkko" | runkohuone 700/800-luvulta, torni 1100-luvulta, vanhin kirkko "lähteen mukaan" | OIKEIN |
| 15 | tiedot[2], nostot[1], jaksot[2] | seinämaalaukset: suurin osa irrotettiin 1933, Berliinissä vuoteen 2007 | OIKEIN |
| 16 | nostot[1].teksti, jaksot[2].teksti, nahtavyydet | maalaukset "nykyisin Andorran valtion näyttelyhallissa" | EPÄTARKKA |
| 17 | nostot[1], nahtavyydet."Santa Coloman kirkko" | Sensin Columba "Andorran suojeluspyhimys" | EPÄTARKKA |
| 18 | nahtavyydet."Sant Esteven kirkko" | 1000-1100-luku, suurin apsis, Puig i Cadafalch 1940-luvulla, uusi nave 1960-luvulla | OIKEIN |
| 19 | nahtavyydet."Pont de la Margineda" | rakennettu 1300-1400-luvulla, graniittiseinät, pimssikaarikivet | OIKEIN |
| 20 | nostot[3] (Madriu), nahtavyydet.Madriu, kysymykset[4] | 42,47 km², 9 %, ainoa maailmanperintökohde, 2004 | OIKEIN |
| 21 | nahtavyydet.Madriu.teksti | "pieni laajennus tehtiin 2006" | EPÄTARKKA (lievä) |
| 22 | nostot[3], nahtavyydet.Madriu | 12 taloa, 1 % yksityisomistuksessa, ahjo hylättiin 1790 | OIKEIN (yksi lähde) |
| 23 | nahtavyydet.Caldea | valmistui 1994, 18 kerrosta, 80 m, Andorran korkein, "yksi Euroopan suurimmista" | OIKEIN |
| 24 | nahtavyydet.Caldea | Escaldes-Engordany erotettiin kunnaksi 1978 | OIKEIN |
| 25 | jaksot[0] | LEU "noin 24 km kaupungista etelään" | EPÄTARKKA (lievä) |
| 26 | jaksot[0] | Toulouse-Blagnac noin 195 km, Barcelona-El Prat noin 198 km | OIKEIN (huom.) |
| 27 | jaksot[4].teksti, saatiedot.luonnehdinta | "tammikuu noin 2 °C, heinäkuu noin 18 °C" (Wikipedian ilmasto-osion mukaan) | EPÄTARKKA |
| 28 | kysymykset[0], [1], [2], [4], tehtava, euro/EU-rivi | Pyreneet; katalaani; Casa 1702-2011; Madriu; euro, ei EU:ssa, tulliliitto | OIKEIN |

Lisäksi OIKEIN: hiihtokausi marraskuun lopusta huhtikuun alkuun ja Tristaina-näköalapaikka (kesähissit), "neljäkymmentä romaanista kirkkoa" "lähteen mukaan" (vain Wikipedia, ks. perustelut), kolikot (1 € = Casa de la Vall, 10-50 snt = Santa Coloma).

## Perustelut lähteineen

### 1. Väkiluku 24 836: EPÄTARKKA (lievä)
Departament d'Estadístican joulukuun 2025 tiedotteen taulukossa "Andorra la Vella" -seurakunnan rivillä on 24.836 (31.12.2025; koko maa 89.058; +261, +1,1 %). Luku on siis seurakunnan, johon kuuluvat Andorra la Vella, La Margineda ja Santa Coloma. En Wikipedia antaa 24 042 (2023) ja toteaa, että taajama Escaldes-Engordanyn kanssa on yli 40 000. Lause "siellä asui" viittaa kaupunkiin.
Lähteet: https://www.altaveu.com/uploads/s1/23/30/72/4/poblacio-desembre-25.pdf (tilastotoimiston A001/A003-tiedote, luettu PDFKitillä) ; https://www.alto.ad/other/andorra-s-population-hits-89-058-by-end-of-260126 ; https://en.wikipedia.org/wiki/Andorra_la_Vella
Korjattu lause (artikkeli.intro): "Andorra la Vella on Andorran pääkaupunki ja suurin asutuskeskus, ja Andorra la Vellan seurakunnassa asui 31.12.2025 Andorran tilastotoimiston mukaan 24 836 ihmistä."

### 2-3. Korkeus ja "korkein pääkaupunki": OIKEIN
En Wikipedia 1 023 m, fi Wikipedia 1 022 m, EBSCO ja WorldAtlas 1 023 m; säähavaintoasema Roc de Sant Pere on 1 075 m (siksi "noin"). "Euroopan korkein pääkaupunki" on en Wikipediassa [citation needed], mutta fi Wikipedia, EBSCO ja useat matkaoppaat toistavat sen; lehti hedgaa "lähteen mukaan", mikä riittää.
Lähteet: https://en.wikipedia.org/wiki/Andorra_la_Vella ; https://fi.wikipedia.org/wiki/Andorra_la_Vella ; https://www.ebsco.com/research-starters/geography-and-cartography/andorra-la-vella-andorra ; https://www.worldatlas.com/maps/andorra

### 4-6. Casa de la Vall: OIKEIN
1580 ja Busquetsin suku: en Wikipedia ("built in 1580 as a manor"), fi Wikipedia (vaakunan vuosiluku 1580), katalaaninen historialähde ("Construït l'any 1580 com a casa pairal de la família Busquets", escut gravat façadalla); Visit Andorra sanoo "late 16th century". Neuvosto osti talon 19.12.1702 (katalaaninen lähde, joka on Consell de la Terra = myöhempi Consell General); käyttö parlamenttitalona 2011 asti: en Wikipedia ja Visit Andorra. Peruskorjaus: en Wikipedia "1960s: exterior plaster removed, turret added", Visit Andorra: 1962 suurkorjaus. Seitsemän avaimen kaappi (lukko jokaiselle seurakunnalle): en Wikipedia; Visit Andorra mainitsee kaapin. 1 euron kolikko: ECB/Bundesbank (€1 = Casa de la Vall, 2 € = vaakuna).
Lähteet: https://en.wikipedia.org/wiki/Casa_de_la_Vall ; https://fi.wikipedia.org/wiki/Andorra_la_Vella ; https://visitandorra.com/en/culture/casa-de-la-vall/ ; https://imagenes.diariandorra.ad/static/Especials/pdf/Casadelavall.pdf ; https://www.bundesbank.de/en/tasks/cash-management/euro-coins/regular-coins/andorra-623328 ; https://en.wikipedia.org/wiki/Andorra_and_the_euro

### 7. 1278: OIKEIN
En Wikipedia History of Andorra: pareatge jakoi suvereniteetin Foix'n kreivin ja La Seu d'Urgellin piispan kesken; Caboetin herran oikeudet Foix'lle 1208 avioliiton kautta (lehti sanoo vain "1200-luvulla", sopii). Britannica: yhteinen suzereniteetti 1278. "Rajat samat vuodesta 1278" on en Wikipediassa, ei toista lähdettä löytynyt; lehti hedgaa "lähteen mukaan".
Lähteet: https://en.wikipedia.org/wiki/History_of_Andorra ; https://www.britannica.com/place/Andorra

### 8. Maaneuvosto "perustettiin 1419": EPÄTARKKA (lievä)
En Wikipedia (Andorra): Consell General "founded in 1419". Consell Generalin oma historiasivusto: ruhtinaat tunnustivat Consell de la Terran 11.2.-17.12.1419 välillä (piispa 11.2., Foix'n puolesta 17.12.). Tuore tutkimus (Consell Generalin tilaama, 600-vuotisjuhla) osoittaa ad hoc -edustuselimen jo 1289, joten 1419 on tunnustamisen, ei perustamisen vuosi. Nosto[1] sanoo jo oikein "kun ruhtinaskumppanit hyväksyivät ... vaatimuksen", artikkeli.teksti ei.
Lähteet: https://www.consellgeneral.ad/actes-historiques/llibres-actes/documents-precedents-als-llibres-dactes/segle-xv/1419-desembre-17-andorra-la-vella (PDF, luettu hakutuloksen kautta) ; https://en.wikipedia.org/wiki/Andorra
Korjattu lause (artikkeli.teksti): "Vuoden 1278 sopimus jakoi suvereniteetin Foix'n kreivin ja Urgellin piispan kesken, ja maaneuvosto, nykyisen parlamentin edeltäjä, sai ruhtinaiden tunnustuksen 1419."

### 9. Uudistus 1866, 24 jäsentä: OIKEIN
En Wikipedia: syndic Areny-Plandolit, "Council General of 24 members elected by suffrage limited to heads of families". Katalaaninen Wikipedia (Nova Reforma): 24 consellers, puolet uusittiin kahden vuoden välein, äänioikeus yli 25-vuotiailla perheenpäillä, avoin äänestys; piispa Caixalin asetus 22.4.1866, Napoleon III vahvisti myöhemmin (ca-wiki: "kolme vuotta myöhemmin", fr-lähde: 1868; lehti ei anna vuotta). Huom.: yksi lähde (Kiddle/IEC-tulkinta) sanoo 24 jäsenen olleen jo ennen uudistusta; tehtava.kysymys "uudistettu neuvosto koostui 24 jäsenestä" pitää silti.
Lähteet: https://en.wikipedia.org/wiki/Andorra ; https://ca.wikipedia.org/wiki/Nova_Reforma ; https://publicacions.iec.cat/repository/pdf/00000279/00000048.pdf

### 10. Areny-Plandolit "johti uudistusryhmää": EPÄTARKKA (lievä)
En Wikipedia (Andorra ja Guillem d'Areny-Plandolit) sanoo, että hän johti reformistiryhmää; ensimmäinen syndic 28.5.1866-2.12.1867. Katalaaninen Wikipedia kuitenkin kertoo, että aloitteen teki Anton Maestre (allekirjoituskeräys), Areny-Plandolit puolusti uudistusta; IEC-lähteet toistavat, että uudistuksen ajoivat Areny-Plandolit ja Maestre yhdessä. Kysymys kysymykset[3] ("Kuka johti uudistusryhmää") on siis kiistanalainen premissi.
Lähteet: https://en.wikipedia.org/wiki/Guillem_d%27Areny-Plandolit ; https://ca.wikipedia.org/wiki/Nova_Reforma ; https://publicacions.iec.cat/repository/pdf/00000279/00000048.pdf
Korjattu lause (nostot[2].teksti): "Vuonna 1866 uudistuksen tunnetuimpiin ajajiin kuului syndic Guillem d'Areny-Plandolit, joka valittiin uuden 24-jäsenisen Council Generalin ensimmäiseksi syndiciksi."
Korjattu kysymys (kysymykset[3].q): "Kuka valittiin Andorran uudistetun Council Generalin ensimmäiseksi syndiciksi toukokuussa 1866? Vastaa sukunimellä." (options ja correct ennallaan; hint "Hän toimi syndicina eli neuvoston puheenjohtajana" sopii; "de Guinda" on Urgellin piispa 1714-1737, "Fiter i Rossell" Manual Digestin tekijä, "Puig i Cadafalch" arkkitehti: kaikki varmasti vääriä.)

### 11. Kolmivärilippu ja tunnukset: OIKEIN (yksi lähde)
En Wikipedia (Flag of Andorra): siviililippu luotu 1866, "adoption coincided with the New Reform". En Wikipedia (Andorra): reformi loi tunnuksia kuten kolmivärilipun. IEC huomauttaa, että "Nova Reforma" on myöhempi nimitys; "tunnuksille ja perustuslaille" -sanamuoto on lievä yleistys mutta pysyy lähteessä.

### 12. Napoleon-aika: OIKEIN
En Wikipedia (History of Andorra): Ranskan keisarikunta liitti Katalonian 1812-1813, Andorra Puigcerdàn piiriin Sègren departementissa; 1814 keisarillinen asetus palautti itsenäisyyden. Sègre-departementti perustettiin asetuksella 26.1.1812, prefektuuri Puigcerdà; departementit lakkautettiin 10.3.1814 (en Wikipedia: Sègre, French departments of Catalonia). "Napoleonin aikana ruhtinaskumppanuus palautettiin" ilman vuotta on turvallinen (lähteet 1806 vs 1809). 1814-asetuksen teksti ei löytynyt itsenäisestä lähteestä.
Lähteet: https://en.wikipedia.org/wiki/History_of_Andorra ; https://en.wikipedia.org/wiki/S%C3%A8gre_(department) ; https://en.wikipedia.org/wiki/French_departments_of_Catalonia

### 13. Halévy: OIKEIN
Ensi-ilta 11.11.1848 Opéra-Comiquessa, libretto Saint-Georges: en Wikipedia, IMSLP, ja ensisijainen lähde on partituurin nimiösivu (BnF/Gallica, Commons), jossa lukee "Représenté pour la première fois au Théâtre de l'Opéra-Comique le 11 Novembre 1848". Juoni: Stéphan yrittää välttää asevelvollisuuden Ranskan armeijassa. Menestys: yli 165 esitystä, saksannos Leipzig 1849, Lontoo 1850 (hakutulokset). "Niemimaasodan aikaan" -muotoilu on en Wikipedian mukainen (Peninsular War) ja hedgattu "lähteen mukaan".
Lähteet: https://en.wikipedia.org/wiki/Le_val_d%27Andorre ; https://imslp.org/wiki/Le_val_d'Andorre_(Hal%C3%A9vy,_Fromental) ; https://commons.wikimedia.org/wiki/File:Hal%C3%A9vy_-_Le_val_d%27Andorre_-_titel_page_of_the_score,_Paris_1851.png

### 14-15. Santa Coloma: OIKEIN
Nave 8.-9. vuosisadalta ja torni 12. vuosisadalta: en Wikipedia ja Visit Andorra (8-9. vuosisata, pyöreä lombardityylinen torni 12. vuosisadan korjauksessa); "vanhin" on en Wikipediassa, Visit Andorra sanoo "one of the oldest", siksi "lähteen mukaan" on tarpeen. Maalaukset: en Wikipedia "most removed 1933, in Berlin until 2007"; Visit Andorra "sold in 1933, recovered by Government 2007"; yksi opas sanoo 1932; Berliinin museossa 1969-2007 (hakutulos). "Suurin osa" on oikea, koska kirkkoon jäi vähäinen osa (Agnus Dei).
Lähteet: https://en.wikipedia.org/wiki/Church_of_Santa_Coloma_d%27Andorra ; https://visitandorra.com/en/culture/church-of-santa-coloma ; https://www.turismeandorralavella.com/wp-content/uploads/2019/07/guiasantacolomaeng.pdf

### 16. "Andorran valtion näyttelyhalli": EPÄTARKKA
Lause toistaa en Wikipedian ("Andorran Government Exhibition Hall"). Visit Andorra, Caldea-blogi ja Espai Columban oma sivu: maalaukset ovat Espai Columba -museossa Santa Coloman kylässä, muutaman metrin päässä kirkosta, julkisesti esillä maaliskuusta 2019 (Andorran hallitus osti ne takaisin 2007). "Näyttelyhalli" ei kerro lukijalle mitään ja on huono käännös.
Lähteet: https://visitandorra.com/en/culture/espai-columba/ ; https://femturisme.cat/en/establishments/espai-columba-art-medieval-andorra ; https://visitandorra.com/en/culture/church-of-santa-coloma
Korjatut lauseet: nostot[1].teksti: "Nykyisin ne ovat esillä Espai Columba -museossa kirkon vieressä." jaksot[2].teksti: "Suurin osa Santa Coloman seinämaalauksista on nykyisin esillä Espai Columba -museossa kirkon vieressä." nahtavyydet."Santa Coloman kirkko".teksti: "Ne olivat Berliinissä vuoteen 2007, ja nykyisin ne ovat esillä Espai Columba -museossa kirkon vieressä."

### 17. Sensin Columba "Andorran suojeluspyhimys": EPÄTARKKA
En Wikipedia: "dedicated to Columba of Sens, patron saint of Andorra"; CIA Factbook ja en Columba of Sens toistavat. Mutta valtion virallinen suojelija on Meritxellin Neitsyt Maria (General Council julisti suojelijaksi 24.10.1873, paavi Pius X vahvisti 1914; Gran Enciclopèdia Catalana). Väite jää yhden maininnan varaan ja lukija voi tuntea Meritxellin.
Lähteet: https://en.wikipedia.org/wiki/Church_of_Santa_Coloma_d%27Andorra ; https://en.wikipedia.org/wiki/Columba_of_Sens ; https://www.enciclopedia.cat/gran-enciclopedia-catalana/meritxell ; https://en.wikipedia.org/wiki/Our_Lady_of_Meritxell
Korjattu lause (nostot[1].teksti): "Se on omistettu Sensin Columballe, jota lähteen mukaan pidetään Andorran suojeluspyhimyksenä." ja nahtavyydet."Santa Coloman kirkko".teksti: "...on omistettu Sensin Columballe, jota lähteen mukaan pidetään Andorran suojeluspyhimyksenä." Kuvateksti nahtavyydet."Santa Coloman kirkko".kuvat[0].selite: "Santa Coloman kirkko on omistettu Sensin Columballe."

### 18. Sant Esteve: OIKEIN
En Wikipedia: 11.-12. vuosisata, alkuperäinen apsis "largest in the principality", 12. vuosisadan alttaritaulu, Puig i Cadafalch uudisti tornin ja sivuoven 1940-luvulla, uusi nave 1960-luvulla, kaksi barokkitaulua (Johannes Kastaja, Lucia). Visit Andorra: Puig i Cadafalchin restaurointi 1940, "Lombardian decoration" apsiksessa. Freskot: MNAC:ssa (Barcelona) ja Espai Columbassa (Sant Esteven freskoja siirretty sinne hiljattain; MNAC:n listaus) ja yksi pala Pradossa.
Lähteet: https://en.wikipedia.org/wiki/Esgl%C3%A9sia_de_Sant_Esteve ; https://visitandorra.com/en/points-of-interest/church-of-sant-esteve/ ; https://www.museunacional.cat/en/colleccio/paintings-sant-esteve-dandorra/mestre-de-sant-esteve-dandorra/035711-cjt

### 19. Pont de la Margineda: OIKEIN
En Wikipedia: 14.-15. vuosisata, graniittiseinät, pimssikaarikivet, Gran Valira, kulttuuriperintörekisteri. Visit Andorra -sivut: 14. vuosisadan loppu - 15. vuosisadan alku, yksi niistä "15. vuosisadan loppu"; Enciclopèdia Catalana (Catalunya romànica) ja turismeandorralavella.com täsmäävät rakenteeseen. "1300-1400-luvulla" kattaa vaihtelun. Etäisyys vanhasta keskustasta 3,5 km: koordinaateista linnuntietä noin 3,4 km. Santa Coloma "muutaman km" (linnuntietä noin 2,4 km): OK.
Lähteet: https://en.wikipedia.org/wiki/Pont_de_la_Margineda ; https://www.enciclopedia.cat/catalunya-romanica/pont-de-la-margineda-andorra-la-vella ; https://visitandorra.com/de/kultur/santa-coloma-and-la-margineda-heritage-arc

### 20-22. Madriu-Perafita-Claror
Pinta-ala 4 247 ha = 42,47 km² = 9 % (UNESCO, hakutuloksen kautta; en Wikipedia). Hyväksytty maailmanperintölistalle 1.7.2004 Suzhoun 28. istunnossa, Andorran ainoa kohde (UNESCO-uutinen, worldheritagesite.org). Ei tietä, vain polut (UNESCO-ehdotus). OIKEIN.
"Pieni laajennus tehtiin 2006": en Wikipedia sanoo "small extension in 2006"; UNESCOn päätössivun (soc/1199, 403, hakutuloksen kautta) tiivistelmä viittaa pufferivyöhykkeen pieneen laajennukseen, ei itse kohteen. Tämä on EPÄTARKKA (lievä): ei vahvistettu ensisijaisesta lähteestä.
Korjattu lause (nahtavyydet.Madriu-Perafita-Claror.teksti): "Unesco hyväksyi laakson maailmanperintökohteeksi 2004." (poista loppuosa "ja pieni laajennus tehtiin 2006", tai muotoile "ja suojavyöhykettä laajennettiin hieman 2006" vasta kun UNESCOn päätös on luettu).
12 taloa Entremesaigüesissa ja Ramiossa, 1 % yksityisomistuksessa, ahjo hylättiin 1790, hiilenpoltto 1800-luvulle, GR 7, GR 11, GRP: vain en Wikipedia (+ osittain madriu-perafita-claror.ad, ei luettu): yksi lähde, ei ristiriitaa.
Lähteet: https://en.wikipedia.org/wiki/Madriu-Perafita-Claror_Valley ; https://whc.unesco.org/en/list/1160 (403, hakutuloksen kautta) ; https://whc.unesco.org/en/news/66 ; https://www.madriu-perafita-claror.ad/en/la-vall ; https://www.worldheritagesite.org/countries/andorra/

### 23-24. Caldea ja Escaldes-Engordany: OIKEIN
En Wikipedia: valmis 1994, 18 kerrosta, 80 m, Andorran korkein rakennus, "one of Europe's largest spas" (6 000 m²; luku ei ole lehdessä, ja muut lähteet antavat 31 000-45 000 m², joten hyvä että se puuttuu). Caldean oma historiasivu: avattu 26.3.1994 (alto.ad), "largest thermal spa in Southern Europe", arkkitehti Jean-Michel Ruols; SkyscraperPage 262 ft (80 m). Escaldes-Engordany parishiksi 14.6.1978 (Decreto 78-9, Gran Enciclopèdia Catalana, en Wikipedia).
Lähteet: https://en.wikipedia.org/wiki/Caldea ; https://caldea.com/en/history ; https://www.alto.ad/culture/2026/02/french-architect-jean-michel-ruols-designer ; https://skyscraperpage.com/b23265 ; https://www.enciclopedia.cat/gran-enciclopedia-catalana/les-escaldes-i-engordany ; https://en.wikipedia.org/wiki/Escaldes%E2%80%93Engordany

### 25. LEU "noin 24 km etelään": EPÄTARKKA (lievä)
En Wikipedia (Andorra la Vella) sanoo 24 km etelään. Itsenäiset lähteet: linnuntietä noin 18-21 km (lounaaseen), tietä pitkin 26-27 km, Wikipedia (Andorra, Transport) mainitsee 12 km maan rajalta. Koordinaateista (LEU 42,34 N 1,41 E, kaupunki 42,51 N 1,52 E): linnuntietä noin 21 km, suunta etelä-lounas.
Lähteet: https://en.wikipedia.org/wiki/Andorra_la_Vella ; https://lunajets.com/en/airports/seu-urgell-andorra ; https://en.wikipedia.org/wiki/Transport_in_Andorra
Korjattu lause (jaksot[0].teksti): "Lähin lentoasema on Andorra-La Seu d'Urgell (LEU) Espanjassa, linnuntietä noin 21 km ja tietä pitkin noin 26 km kaupungista etelään."
Huom. kielioppi: kuvateksti matkailijalle.kuva.selite "Plaça del Príncep Benllochilla" on taivutettu oudosti; vaihtoehto "Plaça del Príncep Benllochin aukiolla" tai "...sijaitsee Plaça del Príncep Benlloch -aukiolla".

### 26. Toulouse 195 km, Barcelona 198 km: OIKEIN (huom.)
En Wikipedia (Andorra, Transport): Toulouse 195 km, Barcelona 198 km, bussit tunneittain; sama Wikipedia kuitenkin antaa toisessa artikkelissa (Transport in Andorra) 165/215 km. Tiepituudet itsenäisissä lähteissä: Toulouse 190-195 km (193 km bussireitti), Barcelona noin 200 km (201,5 km). Lause hedgaa "noin" ja "Andorrasta"; sopii. Bussiyhteys molempiin: kyllä (Andbus, FlixBus, Andorra Direct Bus).
Lähteet: https://en.wikipedia.org/wiki/Andorra ; https://en.wikipedia.org/wiki/Transport_in_Andorra ; https://www.flixbus.ca/bus-routes/andorra-la-vella-toulouse-blagnac-airport ; https://www.manawa.com/en/articles/getting-to-andorra-from-major-cities

### 27. Ilmasto: EPÄTARKKA
Jakso[4] lainaa lukua "Wikipedian ilmasto-osion mukaan tammikuu noin 2 °C, heinäkuu noin 18 °C". En Wikipedia (Roc de Sant Pere, 1 075 m, 1971-2000): tammikuu 2,2 °C, heinäkuu 18,8 °C (eli noin 19, ei 18); fi Wikipedia: noin 2 ja noin 18. Itsenäiset lähteet antavat kaukana eri lukuja (2008-2020 samalta asemalta tammikuu 4,4 °C, heinäkuu 20,7 °C; muut -0,6/16,4 tai 3,8/23,7), joten luvut riippuvat jaksosta ja asemasta. Lisäksi lause "Wikipedian ilmasto-osion mukaan" on metatekstiä (tarkistus.md raportoi, ettei metatekstiä ole, mutta tämä virke on sen oma ehdotus ja se on jäänyt lehteen).
Korjattu lause (jaksot[4].teksti): "Korkeuden vuoksi lämpötilat ovat alankoja matalammat: talvet ovat kylmiä ja kesäpäivät lämpimiä mutta yöt viileitä." (luvut pois). saatiedot.luonnehdinta pysyy (suuntaa-antava, 1-2 ja 18-20 °C) tai lyhenee: "Nämä kuukausiluvut ovat suuntaa-antavia." Pidä saa.json:n 13 mm ja 139 mm epäilyttävinä (huomio ehdotukset.huomiot[6]).
Lähteet: https://en.wikipedia.org/wiki/Andorra_la_Vella ; https://fi.wikipedia.org/wiki/Andorra_la_Vella ; https://www.climatsetvoyages.com/climat/andorre/andorre-la-vieille ; https://academia-lab.com/enciclopedia/geografia-de-andorra/

### 28. Kysymykset ja muut
- kysymykset[0] (Pyreneet): OIKEIN (en Andorra la Vella).
- kysymykset[1] (katalaani): OIKEIN; hint "syntyi Pyreneiden itäosissa" täsmää en Wikipedian Catalan language -artikkeliin ("evolved ... around the eastern Pyrenees").
- kysymykset[2] (Casa de la Vall 1702-2011): OIKEIN, vääriä vaihtoehtoja ei voi sekoittaa (Caldea 1994, Sant Esteve, Santa Coloma eivät olleet parlamenttitaloja).
- kysymykset[3]: ks. kohta 10 (premissi).
- kysymykset[4] (Madriu): OIKEIN; Sorteny ja Comapedrosa ovat luonnonpuistoja, Inclesin laakso ei ole maailmanperintöä.
- kaupunkilehti[1].tehtava (24 jäsentä): OIKEIN; fakta-lause "Uudistettu Council General oli pieni, 24 jäsenen elin..." kelpaa.
- Euro/EU: euro käytössä rahasopimuksella (voimassa 2012), tulliliitto vuodesta 1991 (en Wikipedia); EU:n jäsen ei: OIKEIN.
- Hiihtokausi ja Tristaina: en Wikipedia (marraskuun loppu - huhtikuun alku, näköalapaikka 2 701 m) ja ordinoarcalis.com (Tristaina-hissi + Creussans-hissi kesällä näköalapaikalle): OIKEIN.
- "Neljäkymmentä romaanista kirkkoa": vain en Wikipedia (Culture); hakutuloksista ei löytynyt toista lähdettä. Lehti hedgaa "lähteen mukaan"; OIKEIN, mutta heikosti tuettu. Margineda- ja Escalls-sillat romaanisena: Pont dels Escalls on en Wikipedian listassa, Enciclopèdia Catalana tuntee romaanisina vain Margineda- ja Sant Antoni -sillat; lause "korostuvat" on lievästi epätarkka, mutta lehti nojaa Wikipediaan.

## Kuvat

Tarkistus: Commons-rajapinta (tiedosto olemassa, mitat, lisenssi, tekijä, ottopäivä EXIF) ja kuva katsottu esikatselusta.

| # | Kohta | Tiedosto | Tekijä | Lisenssi | Ottopäivä (EXIF) | Sisältö vs. kuvateksti | Merkinnät | Tulos |
|---|---|---|---|---|---|---|---|---|
| K1 | Kansi 1 | Andorra la Vella - view2.jpg (5857×2412) | Tiia Monto | CC BY-SA 3.0 | 30.8.2012 | Panoraama pohjoisesta: kaupunki laaksossa, kirkon torni, metsäiset rinteet, pilvinen taivas; vastaa selitettä "rakennettu Pyreneiden kapeaan laaksoon" | ei kasvoja, ei tekstiä, ei väkivaltaa; näkyvät nykyaikaiset kerrostalot ja liiketilat (AIKA-säännön mukaan sallittu) | OIKEIN |
| K2 | Nosto K1 | Casa de la Vall, Andorra la Vieja, Andorra, 2013-12-30, DD 04.JPG (4073×2916) | Diego Delso | CC BY-SA 3.0 | 30.12.2013 | Kivinen neliötorni (konsolit, liuskekatto), kiviterassit, kuusi, lumihuippuinen vuori; täsmää "kulmatorni" -kuvaukseen | oikeassa reunassa pieni henkilö kaukana, ei tunnistettava; ei tekstiä | OIKEIN |
| K3 | Nosto T1 (PD-karttalehti) | Carte dite du Dépôt des Fortifications ... Feuille XIV NO Andorre - Barcelone - Prudent, Ferdinand - btv1b105678400.jpg (5493×4212) | Prudent, Ferdinand (1835-1915), "Fonction indéterminée"; BnF/Gallica | Public domain (PD France, PD US expired) | 1800-luku (Commons "1850" on vain tarkkuusarvaus) | 1800-luvun ranskalainen karttalehti 1:500 000, Andorra ja Barcelonan seutu; vuoret varjostettu, sivun otsikko "Carte de France dressée au Dépôt des Fortifications / Feuille XIV" | TEKSTI: painettu otsikko, "Andorre Barcelone N-O" käsin, kaksi kirjastoleimaa alareunassa; kuolinvuosi 1915 = 111 v (> 70 v, OK; tekijän rooli epäselvä, mutta kartta on 1800-lukua) ; selite kertoo 1278-sopimuksesta, ei kartan sisällöstä (sopii kuvatekstiksi) | OIKEIN |
| K4 | Nosto T4 (Halévy) | Interior of Sant Esteve church in Andorra.JPG (3672×4896) | Jordiferrer | CC BY-SA 3.0 | 23.7.2013 | Sant Esteven sisätila: penkit, rautakruunu, lasimaalaukset, kullattu alttaritaulu; kuvateksti on kohteesta, ei virheellinen | sisätila on 1960-luvun navea, ei romaanista; ei kasvoja eikä tekstiä; EI LIITY OOPPERAAN (ks. EPÄVARMAT) | EPÄTARKKA (aihe) |
| K5 | Kohde 5 Caldea (CC0) | Caldea 20231205 122111.jpg (4000×2252) | FrankAndProust | CC0 | 5.12.2023 | Lasinen kylpyläkeskus ja korkea lasitorni, joki edessä, vuoria, syksyn lehtiä | alareunan tumma paneeli, jossa isoja kirjaimia osittain luettavissa, mutta ei selkeä teksti; ei kasvoja | OIKEIN |
| K6 | Valokuva | Casa de la Vall. 1580. Andorra 149.jpg (4395×2930) | Luis Miguel Bugallo Sánchez (Lmbuga) | CC BY-SA 3.0 | 22.8.2013 | Kivijulkisivu edestä, ikkunaluukut, kaksi kulmatornia; vasemmassa laidassa kuvapatsas, pieni lapsi ja rattaat | ei tunnistettavia kasvoja (selin/kaukaa); vaakunaa ei näy kuvassa, vaikka selite mainitsee sen ("vaakunassa on vuosiluku 1580"): lievä, mutta tiedostonimessä 1580 | OIKEIN |
| K7 | Nosto T2 | Interior Casa de la Vall 01.jpg (4128×3096) | Jordi Gili | CC BY-SA 4.0 | 24.9.2022 | Neuvostosali: puuverhoillut seinät, punaiset istuinrivit, pitkä pöytä; takaseinällä kaksi kehystettyä muotokuvaa (pieniä, ei tunnistettavia) | hieman pehmeä, kuvateksti ("parlamentti kokoontui yli kolmesataa vuotta") on kohteesta | OIKEIN |

Yleiset kuvahuomiot:
- Kaikissa kuvissa lisenssi ja tekijä täsmäävät kuvat.md:n lähderivien kanssa (CC BY-SA 3.0/4.0, CC0, PD).
- PD-kuvien tekijöiden kuolinvuodet: Prudent 1915 (kartta, BnF); Henry Valentin (Halévy-ehdotus) kuoli 1855 (Commons-kategoria; toisen lähteen mukaan samanniminen etsaaja kuoli 1886), kumpikin > 70 v.
- Kaikki lähderivit kopioitu Commonsin Artist-kentästä sanatarkasti; "Prudent, Ferdinand (1835-1915). Fonction indéterminée" on kentän sisältö.

## EPÄVARMAT-ratkaisut

### (a) kaupunkilehti[1].nostot[3] (Halévy-ooppera) käyttää Sant Esteven sisäkuvaa (T4)
Suositus: vaihda kuva Commonsin PD-oopperakuvaan. Pilviagentin väite "kelvollista Andorra-kuvaa ei löytynyt" on väärä: Commons-kategoria Category:Le val d'Andorre sisältää toistakymmentä 1848-1851 PD-tiedostoa (nimiösivu, roolipiirrokset, näyttämökuvat).

Ensisijainen valinta (suositus): `Halévy - Le val d'Andorre - 3ème acte - dessin d'H. Valentin, 1848.png`
- Lähde: BnF/Gallica btv1b8527460p, 3948×3076 px, Public domain (PD-old-100, PD-Art), tekijä Henry Valentin (1820-1855; toisen lähteen mukaan 1822-1886; kumpikin > 70 v), kuvattu 1848.
- Sisältö: 1800-luvun lehtipiirros Opéra-Comiquen kolmannen näytöksen näyttämökuvasta (vuoristomaisema, kuusia, kansaa kansallispuvuissa, tanssipari). Ei lähikuvakasvoja, ei väkivaltaa.
- TEKSTI: painettu kuvateksti alareunassa ("Théâtre de l'Opéra-Comique. - Le Val d'Andorre, 3e acte ... Décorations de MM. Martin, Rube ..."), signeeraus "H. Valentin". Teksti kuuluu painokuvaan eikä haittaa, mutta sen voi myös rajata pois alimmasta kaistasta.
- Ehdotettu selite: "Näkymä Halévyn oopperan Le val d'Andorre kolmannesta näytöksestä Pariisin Opéra-Comiquessa 1848." (nostot[3].selite)
- Ehdotettu lähde: "Henry Valentin, Wikimedia Commons (PD)" (nostot[3].lahde).
- nostot[3].tiedosto: "Halévy - Le val d'Andorre - 3ème acte - dessin d'H. Valentin, 1848.png".
- Huom.: maisema on teatterimaisema, ei Andorran todellinen näkymä; selite sanoo sen ("näkymä oopperan näytöksestä").

Vaihtoehdot:
- `Halévy - Le val d'Andorre - act 3, tableau 2 - Henry Valentin, Opéra-Comique, Paris 1848.png` (1614×1266, sama piirros ilman painettua tekstiä, scan Piperin Enzyklopädiasta; PD-old-100, resoluutio riittää).
- `Halévy - Le val d'Andorre - titel page of the score, Paris 1851.png` (3008×4158, Gallica bpt6k11854773, PD): nimiösivu, jossa ensi-ilta "11 Novembre 1848"; muoto pysty ja puhdasta tekstiä, joten huonompi nostokuvaksi.
- Halévy-muotokuva (esim. Carjat): ei suositella (kasvolähikuva).

Muutos: nosto[3] saa uuden kuvan; Sant Esteven sisäkuva T4 voidaan poistaa, koska Sant Esteve on jo kuvattu kahdessa muussa kohdassa (matkailijalle.kuva ja nahtavyydet).

### (b) valokuva.vuosi "2010-luku" tiedostolle 'Casa de la Vall. 1580. Andorra 149.jpg'
Commons-sivun EXIF-ottopäivä (DateTimeOriginal): 22.8.2013 klo 16.29; ladattu Commonsiin 5.10.2013. Kamera Canon EOS 5D Mark II.
Suositus: "2010-luku" on oikein, mutta tarkka vuosi löytyy, joten vaihda `valokuva.vuosi` arvoon "2013" ja poista arvausmerkintä ehdotukset.huomiot[7].

## Korjausten lista (valmiina Sisältökirjuri/Julkaisija-erään)

Tee kaikki sisalto.json:ssa; EPÄTARKAT ja kuvakorjaus:

1. artikkeli.intro: "ja siellä asui" -> "ja Andorra la Vellan seurakunnassa asui" (väkiluku on seurakunnan).
2. artikkeli.teksti, kappale 1: "maaneuvosto, nykyisen parlamentin edeltäjä, perustettiin 1419" -> "... sai ruhtinaiden tunnustuksen 1419". Nosto[1] pitää jo.
3. kaupunkilehti[1].nostot[2].teksti: "Vuonna 1866 syndic Guillem d'Areny-Plandolit johti uudistusryhmää 24-jäsenisessä Council Generalissa." -> "Vuonna 1866 uudistuksen tunnetuimpiin ajajiin kuului syndic Guillem d'Areny-Plandolit, joka valittiin uuden 24-jäsenisen Council Generalin ensimmäiseksi syndiciksi."
4. kysymykset[3].q: -> "Kuka valittiin Andorran uudistetun Council Generalin ensimmäiseksi syndiciksi toukokuussa 1866? Vastaa sukunimellä." (options, correct, hint, fact ennallaan).
5. kaupunkilehti[0].nostot[1].teksti, jaksot[2].teksti, nahtavyydet."Santa Coloman kirkko".teksti: "Andorran valtion näyttelyhallissa" -> "Espai Columba -museossa kirkon vieressä".
6. kaupunkilehti[0].nostot[1].teksti ja nahtavyydet."Santa Coloman kirkko".teksti: "Andorran suojeluspyhimykselle" -> "jota lähteen mukaan pidetään Andorran suojeluspyhimyksenä"; kuvat[0].selite: "Santa Coloma on omistettu Andorran suojeluspyhimykselle Sensin Columballe." -> "Santa Coloman kirkko on omistettu Sensin Columballe."
7. nahtavyydet.Madriu-Perafita-Claror.teksti: poista "ja pieni laajennus tehtiin 2006" (UNESCO-päätöstä ei saatu luettua; ks. perustelut).
8. jaksot[0].teksti: LEU "noin 24 km kaupungista etelään" -> "linnuntietä noin 21 km ja tietä pitkin noin 26 km kaupungista etelään".
9. jaksot[4].teksti: poista lämpötilaluvut ja "Wikipedian ilmasto-osion mukaan" (metateksti): "Korkeuden vuoksi lämpötilat ovat alankoja matalammat: talvet ovat kylmiä ja kesäpäivät lämpimiä mutta yöt viileitä." saatiedot.luonnehdinta: "Nämä kuukausiluvut ovat suuntaa-antavia." (+ ehdotukset.huomiot[6] ennallaan).
10. Kuva (EPÄVARMA a): nostot[3] (Halévy): tiedosto -> "Halévy - Le val d'Andorre - 3ème acte - dessin d'H. Valentin, 1848.png"; selite -> "Näkymä Halévyn oopperan Le val d'Andorre kolmannesta näytöksestä Pariisin Opéra-Comiquessa 1848."; lahde -> "Henry Valentin, Wikimedia Commons (PD)"; poista ehdotukset.huomiot[3].
11. valokuva.vuosi: "2010-luku" -> "2013" (EXIF 22.8.2013); poista ehdotukset.huomiot[7] ("Valokuvan vuosi on arvio").
12. (Kielioppi) matkailijalle.kuva.selite: "Plaça del Príncep Benllochilla" -> "Plaça del Príncep Benlloch -aukiolla".

Ei korjattavaa: väitteet 2-7, 9, 11-15, 18-20, 22-24, 26, 28 (ks. taulukko). Kuvat K1-K3, K5-K7 kunnossa.

## Lähdeluettelo (keskeiset)

- https://en.wikipedia.org/wiki/Andorra_la_Vella ; https://en.wikipedia.org/wiki/Andorra ; https://en.wikipedia.org/wiki/History_of_Andorra ; https://en.wikipedia.org/wiki/Casa_de_la_Vall ; https://en.wikipedia.org/wiki/Church_of_Santa_Coloma_d%27Andorra ; https://en.wikipedia.org/wiki/Esgl%C3%A9sia_de_Sant_Esteve ; https://en.wikipedia.org/wiki/Pont_de_la_Margineda ; https://en.wikipedia.org/wiki/Madriu-Perafita-Claror_Valley ; https://en.wikipedia.org/wiki/Caldea ; https://en.wikipedia.org/wiki/Le_val_d%27Andorre ; https://en.wikipedia.org/wiki/Flag_of_Andorra ; https://en.wikipedia.org/wiki/Transport_in_Andorra ; https://fi.wikipedia.org/wiki/Andorra_la_Vella ; https://ca.wikipedia.org/wiki/Nova_Reforma
- Itsenäiset: https://visitandorra.com/en/culture/casa-de-la-vall/ ; https://visitandorra.com/en/culture/church-of-santa-coloma ; https://visitandorra.com/en/culture/espai-columba/ ; https://visitandorra.com/en/points-of-interest/church-of-sant-esteve/ ; https://www.enciclopedia.cat/catalunya-romanica/pont-de-la-margineda-andorra-la-vella ; https://www.enciclopedia.cat/gran-enciclopedia-catalana/les-escaldes-i-engordany ; https://www.enciclopedia.cat/gran-enciclopedia-catalana/meritxell ; https://publicacions.iec.cat/repository/pdf/00000279/00000048.pdf ; https://www.consellgeneral.ad/ca/arxiu/... (1419-asiakirjat) ; https://www.altaveu.com/uploads/s1/23/30/72/4/poblacio-desembre-25.pdf ; https://caldea.com/en/history ; https://www.britannica.com/place/Andorra ; https://imslp.org/wiki/Le_val_d'Andorre_(Hal%C3%A9vy,_Fromental) ; https://www.bundesbank.de/en/tasks/cash-management/euro-coins/regular-coins/andorra-623328 ; https://www.ebsco.com/research-starters/geography-and-cartography/andorra-la-vella-andorra ; https://www.worldatlas.com/maps/andorra ; https://www.ordinoarcalis.com/en/tristaina-solar-viewpoint ; https://www.museunacional.cat/en/colleccio/paintings-sant-esteve-dandorra/mestre-de-sant-esteve-dandorra/035711-cjt
- UNESCO (whc.unesco.org/en/list/1160, /en/soc/1199): 403, tiedot hakutuloksen kautta.
- Commons: MediaWiki API (extmetadata) ja tiedostosivut; Category:Le val d'Andorre.
