# Riippumaton tarkistus: PR 6781, Pariisin 7 hahmotelmatekstiä (15.11.2026)

- **Kohde:** `git diff origin/main -- js/packs/monumentit-eurooppa.js`, haara sk/pariisi-jatko (410f5d8fee), lohkot grand-chatelet … les-halles.
- **Tarkistaja:** en kirjoittanut tekstejä enkä tehnyt kierroksia 3–4. Koodia en muokannut.
- **Pohja:** pariisi-hahmotelmat-hakukierros-4-20261115.md, pariisi-7-hakukierros-3-20261115.md ja v3/v2-raportit. Kierrosten KAKSI-tuloksiin luotin. Uudet sanamuodot, epäselvät kohdat ja kaikki tehtävänannon kohdat 2a–2f tarkistin itse.
- **Periaate:** WP = Wikipedia kaikkine kieliversioineen ja peileineen, ja se lasketaan yhdeksi lähteeksi.

**Itse luetut sivut (robots.txt tarkistettu ennen jokaista):**
- conseil-etat.fr (robots 404, siis ei rajoituksia) ja pop.culture.gouv.fr (PA00088689, PA00086706)
- paris.fr: "Ces lieux disparus (2/2)", "Les prisons, gardiennes de l'histoire parisienne" ja "Les petits secrets du Grand Palais"
- larousse.fr (/encyclopedie/peinture/salon), univ-droit.fr (Leniaud), pavillonbaltard.fr/histoire, evous.fr ja journals.openedition.org (rh19/373)
- fr- ja en-WP vain /wiki/-poluilla, fr.wikisource (Viollet-le-Duc)
- archive.org: Parville 1890 (bub_gb_4EQ1AAAAMAAJ, koko OCR) ja *L'art et l'industrie de tous les peuples à l'Exposition universelle de 1878* (1880, lartetlindustrie00expo, koko OCR)

En käyttänyt kiellettyjä sivustoja (musee-orsay, structurae, napoleon.org, universalis, pss-archi, Britannica). Hakuihin ei lähtenyt projektitietoa. Yhdelläkään sivulla ei ollut tekoälylle osoitettuja ohjeita.

## Taulukko

Lähdesarakkeissa "k3" ja "k4" viittaavat hakukierroksiin 3 ja 4. "Itse" tarkoittaa, että luin lähteen tällä tarkistuskierroksella.

### Grand Châtelet

| väite | lähde 1 | lähde 2 | verdikti |
|---|---|---|---|
| Ludvig VI rakennutti kiveksi 1100-luvulla | paris.fr 2/2 "Louis VI en 1130" (itse) | fr-WP "Vers 1130, Louis VI" (itse) | OK |
| Philippe Auguste alkoi rakennuttaa muuria 1190, ja linnake menetti puolustustehtävänsä | paris.fr 2/2 "Dès 1190 … perd sa fonction défensive" (k3) | POP PA00086112 "de 1190 à 1202" + fr-WP (itse) | OK |
| prévôtin oikeudenkäytön ja poliisin pääpaikka | paris.fr 2/2 (k3) | fr-WP | OK |
| **UUSI:** "Rakennuksen läpi kulki holvikäytävä kaupunkiin" (myös nappi "tie kaupunkiin") | Desmaze 1863 "une voûte qui donnait accès dans la ville" (k4) | en-WP "roadway which passed under the Chatelet" (k4), fr-WP "l'arcade du Grand Châtelet" (itse) | OK |
| vankila, tuomareiden salit ja ruumishuone samoissa muureissa | Desmaze (morgue, k3), paris.fr (cachots) | fr-WP | OK |
| Villon, Molière ja Cartouche vankeina | Larousse, herodote, Desmaze (k3) | fr-WP | OK |
| **UUSI:** "Vankilaa pidettiin Pariisin pahanhajuisimpana paikkana" | paris.fr "Les prisons…": Grand Châtelet "l'endroit le plus fétide de la capitale" (itse) | fr-WP: sama ilmaus lainauksessa, jossa se koskee rakennusta ja sen ympäristöä (itse) | **PEHMENNÄ:** molemmat lähteet sanovat sen Grand Châtelet'stä, eivät pelkästä vankilasta |
| **UUSI:** "aivan lähellä olivat teurastamot" | fr-WP "la proximité des boucheries (en face)" (itse) | Fournier 1855: "rue de la Tuerie, … l'Escorcherie" (k4) | OK. Fournier puuttuu lahde-riviltä. |
| **UUSI:** "Châtelet'n tuomioistuin lakkautettiin 1790" | 1911 EB (Wikisource) "suppressed by the law of the 16th of August 1790" (k4) | fr-WP "la cour de justice du Châtelet fut supprimée … 25 août 1790" (itse) | OK. 1911 EB puuttuu lahde-riviltä. |
| purku alkoi 1802 | paris.fr 2/2 "En 1802 … progressivement détruite" + paris.fr prisons "détruite en 1802" (itse) | fr-WP "ne débuta effectivement qu'en 1802" (itse) | OK |
| Place du Châtelet; Théâtre, Davioud 1860–1862 | paris.fr (teatteri) "entre 1860 et 1862" (k3) | chatelet.com 1862 (k3) | OK, mutta kielioppi korjattava (ks. alla) |
| Q1 "Mitä … tuomioistuimelle tapahtui 1790?" | vastaus tekstissä: "lakkautettiin 1790" | – | OK |
| lyhyt/selite: holvikäytävä, teurastamot, n. 1750, "reilut viisikymmentä vuotta" (1750→1802) | yhtenäiset tekstin kanssa | – | OK |

### Temple-torni

| väite | lähde 1 | lähde 2 | verdikti |
|---|---|---|---|
| "rakentaminen alkoi keskiajalla" | Viollet-le-Duc: valmis 1306 (itse) | fr-WP 1240 | OK |
| "muurit olivat paksut" (ilman lukua) | fr-WP 4 m | Vikidia "plus de deux mètres" (k4). Viollet-le-Duc ei anna mittaa (itse). | OK sääntö 11:n mukaan: yhden lähteen väite muutettu sanaksi ilman lukua |
| neljä kulmatornia | Viollet-le-Duc "flanquée aux quatre angles de tourelles" (itse) | fr-WP (itse) | OK |
| ritarikunta lakkautettiin 1312 | herodote (k4) | WP | OK |
| 13.8.1792 kommuuni, 21.1.1793, 8.6.1795 kymmenvuotiaana, Napoleon 1808 pyhiinvaellusten takia | Cléry, parcoursrevolution, Larousse (k3/k4) | fr-WP | OK |
| teksti: "Tornin paikasta osa on nykyisin Square du Temple -puistoa" | fr-WP: tornin paikalla ovat kaupungintalon pohjoiskulma ja puiston aita. Puisto istutettiin suurpriorin palatsin paikalle. (itse) | parcoursrevolution: osoite 2 rue Eugène-Spuller, siis kaupungintalo (k3) | **PEHMENNÄ:** "osa on puistoa" ei vahvistu. Selite sanoo jo "lähellä", joten teksti ja selite ovat nyt ristiriidassa. |
| (a) selite n. 1805: vaatekauppa Templen alueella | fr-WP "Carreau du Temple": Ensimmäisen konsulin dekreetti 1802 (itse) | pariszigzag "au début du XIXe siècle" (k4, voi nojata WP:hen); evous.fr: friperie-paviljonki "Pou Volant" 1809 (itse) | OK heikoin perustein: vaatekauppa alueella 1800-luvun alussa on kahden lähteen varassa |
| (a) "jonne vanhojen vaatteiden kauppa on hiljattain siirretty" | vain fr-WP (1802-dekreetti, ei viitettä) | evous ja openedition eivät mainitse siirtoa (itse) | **POISTA** sivulause (yksi lähde) |
| (a) "Temppeliritarit poissa jo puolituhatta vuotta" (1312→1805 = 493 v.) | laskettu kahden lähteen vuosista | – | OK |
| (a) "Vuosina 1792–1795 torni oli kuningasperheen vankila" | Cléry / parcoursrevolution 1792 | Larousse / parcoursrevolution 1795 | OK. Aikamuoto "oli" on oikein vuoden 1805 näkökulmasta. |
| (a) "muutaman vuoden päästä Napoleon käskee purkaa" (1805→1808) | – | – | OK |
| "Tornista ei ole jäänyt mitään" | parcoursrevolution "nothing left" | fr-WP "Il ne reste rien" | OK |
| kielioppi: "ovat levittäneet pöydilleen … Templen alueelle" | – | – | **KORJAA:** kaksi tulosijaa peräkkäin, oikea muoto on "Templen alueella" |

### Palais d'Orsay

| väite | lähde 1 | lähde 2 | verdikti |
|---|---|---|---|
| Napoleon I aloitti 1810; valmistui "noin kolmenkymmenen vuoden päästä" | conseil-etat.fr "commencé … (1810), … terminé qu'en 1840" (itse) | fr-WP 1810–1838 (itse) | OK, koska sanamuoto kattaa sekä 1838 että 1840 |
| (b) arkkitehdit Bonnard, jatkajana Lacornée | fr-WP "Jacques-Charles Bonnard puis Jacques Lacornée" (itse) | univ-droit.fr, Leniaud: lukujen otsikot "Jacques-Charles Bonnard" ja "Jacques Lacornée : architecte pour un palais inachevé ?" (itse) | OK. conseil-etat ja POP eivät nimeä arkkitehtejä. |
| (b) valtioneuvosto alakertaan 1840, Cour des comptes ensimmäiseen kerrokseen 1842 | conseil-etat.fr "rez-de-chaussée" 1840, "deux ans plus tard … au premier étage" (itse) | fr-WP (itse); Leniaud "Entre 1842 et 1871" | OK |
| (b) Chassériaun freskot portaikkoon | conseil-etat "fresques de Chassériau peintes dans le grand escalier" (itse) | Joconde 000PE000431 (k3), fr-WP (itse) | OK |
| (b) "yönä 23.–24. toukokuuta 1871", kommunardit | conseil-etat "incendié (23-24 mai 1871)" (itse) | fr-WP "nuit du 23 au 24 mai 1871" (itse) | OK |
| "Freskoista pelastettiin vain irrotettuja palasia" | Joconde "peinture détachée" (k3) | fr-WP (60 m², Louvre) (itse) | OK |
| purku 1898 alkaen; Gare d'Orsay vuoden 1900 näyttelyyn | POP PA00088689 "à partir de 1898 … 14 juillet 1900" (itse) | fr-WP "1898" (itse) | OK |
| lahde: "Zola, La Débâcle" | tekstissä ei ole Zola-väitettä | – | **POISTA** riviltä tai jätä (harmiton) |
| ihmeLahde: yhä "en- ja fr-Wikipedia … 31.10.2026" | – | – | **PÄIVITÄ** (ks. alla) |
| lyhyt/selite n. 1860, "reilut kymmenen vuotta" (1860→1871) | – | – | OK |

### Palais de l'Industrie

| väite | lähde 1 | lähde 2 | verdikti |
|---|---|---|---|
| lasi- ja rautahalli Champs-Élysées'llä vuoden 1855 näyttelyyn; Viel ja Barrault | CCA (k3) | fr-WP | OK |
| (c) "halli avattiin toukokuussa 1855" | herodote "15 mai 1855 – Première Exposition universelle" (k3) | fr-WP "Inauguré le 15 mai 1855" (itse) | OK |
| (c) "Siellä pidettiin **vuosittain** Salon" | Larousse: Salon pidettiin palatsissa, mutta tiheyttä ei kerrota, ja yleismääritelmä on "annuelle ou bisannuelle" (itse) | fr-WP 1857–1897 ilman tiheyttä (itse) | **PEHMENNÄ:** "vuosittain" pois. Sama koskee kysymystä 2. |
| (c) 1881 kansainvälinen sähkönäyttely | Heap 1884 (k3) | fr-WP (itse) | OK |
| (c) "purettiin 1890-luvun lopulla Grand Palais'n tieltä" | paris.fr Grand Palais "démolir pour laisser la place au Grand Palais", työt 1897 (itse) | fr-WP "démoli dès 1896" (itse) | OK |
| (c) selite: "Halli puretaan **1897**" | paris.fr: Grand Palais'n työt alkoivat 1897, ja kuvateksti ajoittaa palatsin "entre 1855 et 1896" (itse) | fr-WP "dès 1896" (itse) | **PEHMENNÄ:** ERO, lähteet antavat 1896 ja 1897. Kierroksen 3 "kaksi lähdettä vuodelle 1897" ei pidä, koska fr-WP sanoo 1896. |
| (c) selite: "paikalle nousevat Grand Palais **ja Petit Palais**" | fr-WP "pour laisser place au Petit Palais et au Grand Palais" (itse) | paris.fr mainitsee vain Grand Palais'n (itse). Matkaoppaat ovat todennäköisesti WP:n peilejä. | **PEHMENNÄ:** Petit Palais on yhden lähteen varassa, ja teksti mainitsee vain Grand Palais'n |
| lyhyt "kaksikymmentäneljä vuotta myöhemmin halli on poissa" (1873+24 = 1897) | seuraa vuodesta 1897, joka on ERO | – | **PEHMENNÄ** |
| Q2 "Mitä taidenäyttelyä siellä pidettiin vuosittain?" | – | – | **MUUTA** (ks. "vuosittain") |

### Trocadéron palatsi

| väite | lähde 1 | lähde 2 | verdikti |
|---|---|---|---|
| (f) Davioud ja Bourdais | POP PA00086706 (itse) | 1880 teos "l'œuvre de MM. Davioud et Bourdais" (itse) | OK |
| "Mauri-bysanttilaistyylisessä" | fr/en-WP "inspirations mauresque et néo-byzantine" (itse) | POP ja 1880 teos eivät mainitse tyyliä (itse) | **POISTA** (yksi lähde). Ei tämän PR:n muutos, mutta jäänyt väite. |
| (f) "kaksi korkeaa tornia" | 1880 "quatre-vingts mètres" (itse) | WP "plus de 80 mètres" (itse) | OK |
| kaksi kaarevaa siipeä | 1880 "deux ailes recourbées" (itse) | WP "deux longues ailes curvilignes" (itse) | OK |
| (f) "yli neljän tuhannen paikan sali" | WP 4 600 (itse) | 1880 teos "pouvant contenir six mille personnes" (itse); muut lähteet 5 000 (k4) | OK. Kaikki luvut ovat yli 4 000. |
| Cavaillé-Collin urut vihittiin | Auditorium de Lyon (v2) | WP 8.8.1878 | OK |
| (f) "rakennettiin vuosina 1876–1878" | 1880 teos (kilpailu 1876, tornit nousussa tammikuussa 1878) (k4) | WP 11/1876–6/1878 | OK |
| **"eikä sitä ollut tarkoitettu kestämään näyttelyn jälkeen"** ja nappi "Näyttelypalatsi, jota ei tehty kestämään" | vain WP "n'est pas destiné à survivre" / "never intended to go beyond the exhibition stage" (itse) | **KUMOAA:** 1880 teos, s. "résultats matériels": "Dès 1876, il avait été décidé que le palais du Trocadéro resterait à la ville de Paris après la clôture de l'Exposition" (itse) | **POISTA** sekä tekstistä että napista. Aikalaislähteen mukaan palatsi päätettiin jo 1876 jättää kaupungille. |
| 1935 sali ja tornit purettiin 1937 näyttelyn tieltä, siivet Chaillot'hon | trocadero-chaillot-raportti / WP | POP (Chaillot 1934–1937 "sur les structures anciennes") (itse) | OK |
| kielioppi: "Isoisä ei nähnyt Trocadérota" | – | – | **KORJAA:** oikea partitiivi on "Trocadéroa" |
| kielioppi, selite: "vieressä kohoavat kaksi korkeaa tornia" | – | – | **KORJAA:** lukusanan kanssa verbi on yksikössä, siis "kohoaa kaksi korkeaa tornia" |
| lahde ja ihmeLahde: yhä vain en-WP 31.10.2026 | – | – | **PÄIVITÄ** (ks. alla) |

### Galerie des Machines

| väite | lähde 1 | lähde 2 | verdikti |
|---|---|---|---|
| (d) Contamin ja Dutert; "420 metriä pitkä ja 115 metriä leveä"; ei pilareita | Parville 1890 (k3/k4) | en-WP "115 by 420 metres", "no internal supports" (itse) | OK |
| kolminivelinen kaari siltasuunnittelusta | Parville s. 212 (k4) | en-WP | OK |
| (d) "liikkuvat sillat" (teksti, lyhyt, selite) | Parville "ponts roulants" (k3) | en-WP kuvateksti "Moving bridges transporting visitors" (itse) | OK |
| (d) purku "1900-luvun alussa", jotta näkymä aukeaisi | paris.fr 4/4 "détruit en 1909 pour élargir la perspective" (k3) | en-WP "1910 … to open up the view" (itse) | OK |
| nappi "Halli, jossa ei ollut yhtään pilaria" | sama kuin pilarittomuus | – | OK |
| (d) selite: "höyrykoneet ja sähkögeneraattorit hyrisevät" | Parville: dynamot ja niitä pyörittävät koneet Palais des Machines'ssa (itse, OCR r. 11391 ja 13884) | en-WP ei mainitse konetyyppejä, vain "Machines being installed" (itse) | **PEHMENNÄ:** konetyypit ovat yhden lähteen varassa |
| (d) lyhyt "reilut kaksikymmentä vuotta myöhemmin" (1889→1909/1910 = 20–21 v.) | – | – | **PEHMENNÄ:** 1909 on tasan 20 vuotta, joten "reilut" ei pidä kummallakaan vuodella |
| lahde: "Parville, Les Merveilles de l'Exposition (1890)" | archive.org-metatiedot: bub_gb_4EQ1AAAAMAAJ = Henri de Parville, *L'Exposition universelle*, J. Rothschild 1890 (itse) | – | **KORJAA** nimeke (k4 kutsui teosta virheellisesti nimellä "Causeries scientifiques") |
| selite alkaa numerolla "1900-luvun alussa halli puretaan" | – | – | tyyli: lausetta ei aloiteta numerolla |

### Les Halles

| väite | lähde 1 | lähde 2 | verdikti |
|---|---|---|---|
| (e) historia ulottuu 1100-luvulle | paris.fr 2/2 (k4) | WP | OK |
| **UUSI:** "Filip II Augustus siirsi torille uuden markkinan 1183 ja rakennutti sinne ensimmäiset katetut hallit" | paris.fr 2/2 "de premières halles en bois sont édifiées sous les ordres de Philippe Auguste" (itse) | Baltard ja Callet 1862: osti markkinat ja siirsi ne Champeaux'lle (k4); fr-WP "deux bâtiments couverts" | OK sisällöltään, mutta **KORJAA** kieli ja nimi (ks. alla). "uuden markkinan" on epätarkka, koska siirretty markkina oli vanha. |
| (e) Baltardin lasi- ja rautapaviljongit | paris.fr "pavillons en métal et en verre", Baltard 1852 (itse) | pavillonbaltard.fr, WP | OK |
| (e) kymmenen paviljonkia, 1850-luvulta 1870-luvun alkuun | pavillonbaltard.fr "dix pavillons … entre 1852 et 1870" (itse) | WP | OK |
| **UUSI:** Zola kutsui halleja Pariisin vatsaksi samannimisessä romaanissa (1873) | Zolan oma teksti (Wikisource, v2) | WP "as Émile Zola called it" | OK |
| (e) Rungis 1969 | paris.fr 2/2 (itse) | fr-WP | OK |
| purettiin "1970-luvun alussa" | fr-WP 1971–1973 | pavillonbaltard.fr: 1972 markkina lähti ja paviljongit päätettiin purkaa (itse); Larousse 1971: päätös | OK |
| **UUSI:** "kutsuttiin yksinkertaisesti reiäksi" | paris.fr "le trou de Paris" (itse) | WP "le trou des Halles" | OK |
| (e) yksi paviljonki Nogent-sur-Marneen | pavillonbaltard.fr 6.1.1976 (itse) | fr-WP | OK |
| (e) Forum des Halles 1979 | paris.fr "En 1979, on inaugure le Forum" (itse) | fr-WP | OK |
| **Q1 "Millä nimellä Émile Zola kutsui halleja?"** | vastaus "Pariisin vatsa" on tekstissä | – | OK |
| **korostus `'Émile Zola\|Émile Zolan'`** | – | – | **RIKKI:** tekstissä on nyt "Émile Zola kutsui", eikä muotoa "Émile Zolan" ole. Tarkistin koneellisesti: FRA-listan 16 korostuksesta vain tämä ei löydy tekstistä. Alleviivaus jää hiljaa pois, eikä tests/korostukset.test.mjs kata monumentteja. |
| nimien yhtenäisyys: Châtelet'ssä "Philippe Auguste", Les Hallesissa "Filip II Augustus" | – | – | **YHTENÄISTÄ** |

## Korvaavat tekstit (vain ei-OK-kohdat)

**Grand Châtelet, teksti**
- "Vankilaa pidettiin Pariisin pahanhajuisimpana paikkana, ja aivan lähellä olivat teurastamot."
  → "Grand Châtelet'tä pidettiin Pariisin pahanhajuisimpana paikkana, ja aivan lähellä olivat teurastamot."
- Kielioppi: "Paikalle tuli Place du Châtelet, jonka vierellä seisoo Théâtre du Châtelet, jonka Gabriel Davioud rakensi 1860–1862."
  → "Paikalle tuli Place du Châtelet. Aukion vierellä seisoo Théâtre du Châtelet, jonka Gabriel Davioud rakensi 1860–1862."
- lahde: lisää paris.fr "Les prisons, gardiennes de l'histoire parisienne"; Encyclopædia Britannica 1911 "Châtelet" (Wikisource); Fournier, Paris démoli (1855).

**Temple-torni**
- teksti: "Tornin paikasta osa on nykyisin Square du Temple -puistoa."
  → "Tornin paikan vieressä on nykyisin Square du Temple -puisto."
- selite: "kangaspakkoja Templen alueelle, jonne vanhojen vaatteiden kauppa on hiljattain siirretty, ja ostajat hieraisevat villaa sormiensa välissä."
  → "kangaspakkoja Templen alueella, ja ostajat hieraisevat villaa sormiensa välissä."
- Valinnainen yhtenäistys: selitteessä "sen lähellä on nyt Square du Temple -puisto" → "sen paikan vieressä on nyt Square du Temple -puisto".

**Palais d'Orsay**
- lahde: poista "Zola, La Débâcle" (tai palauta Zola-väite, jos KK haluaa sen; v3:ssa se oli kahden lähteen varassa).
- ihmeLahde → "Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan (n. 1860). Faktat: conseil-etat.fr, POP/Joconde ja fr-Wikipedia "Palais d'Orsay", tarkistettu 15.11.2026."

**Palais de l'Industrie**
- teksti: "Siellä pidettiin vuosittain Salon, ja 1881 kansainvälinen sähkönäyttely."
  → "Siellä pidettiin Pariisin virallinen taidenäyttely Salon, ja 1881 kansainvälinen sähkönäyttely."
- kysymykset[1]: "Mitä taidenäyttelyä siellä pidettiin vuosittain?" → "Mikä taidenäyttely Palais de l'Industriessa pidettiin?"
- lyhyt: "Salonin vieraat kulkevat taulujen ohi lasikaton alla; kaksikymmentäneljä vuotta myöhemmin halli on poissa."
  → "Salonin vieraat kulkevat taulujen ohi lasikaton alla; vajaat kolmekymmentä vuotta myöhemmin halli puretaan."
- selite, viimeinen virke: "Halli puretaan 1897 vuoden 1900 maailmannäyttelyn tieltä, ja paikalle nousevat Grand Palais ja Petit Palais."
  → "1890-luvun lopulla halli puretaan vuoden 1900 maailmannäyttelyn tieltä, ja paikalle nousee Grand Palais."
- Jos KK ei halua aloittaa virkettä numerolla: "Halli puretaan 1890-luvun lopulla vuoden 1900 maailmannäyttelyn tieltä, ja paikalle nousee Grand Palais."

**Trocadéron palatsi**
- teksti: "Mauri-bysanttilaistyylisessä palatsissa oli kaksi korkeaa tornia ja kaksi kaarevaa siipeä."
  → "Palatsissa oli kaksi korkeaa tornia ja kaksi kaarevaa siipeä."
- teksti: "Palatsi rakennettiin vuosina 1876–1878, eikä sitä ollut tarkoitettu kestämään näyttelyn jälkeen."
  → "Palatsi rakennettiin vuosina 1876–1878."
- teksti: "Isoisä ei nähnyt Trocadérota" → "Isoisä ei nähnyt Trocadéroa".
- nappi: "Näyttelypalatsi, jota ei tehty kestämään" → "Näyttelypalatsi, josta jäivät vain siivet".
- selite: "ja vieressä kohoavat kaksi korkeaa tornia" → "ja vieressä kohoaa kaksi korkeaa tornia".
- lahde → "POP PA00086706; L'art et l'industrie de tous les peuples à l'Exposition universelle de 1878 (1880); Auditorium de Lyon; fr-Wikipedia "Palais du Trocadéro" (tarkistettu 15.11.2026)."
- ihmeLahde: "Faktat: en-Wikipedia …" → "Faktat: POP, L'art et l'industrie … (1880) ja fr-Wikipedia "Palais du Trocadéro", tarkistettu 15.11.2026."

**Galerie des Machines**
- selite: "Alla höyrykoneet ja sähkögeneraattorit hyrisevät rivi rivin perään"
  → "Alla koneet hyrisevät rivi rivin perään".
- selite, viimeinen virke: "1900-luvun alussa halli puretaan, jotta näkymä Champ-de-Marsille aukeaa."
  → "Halli puretaan 1900-luvun alussa, jotta näkymä Champ-de-Marsille aukeaa."
- lyhyt: "reilut kaksikymmentä vuotta myöhemmin halli puretaan" → "parikymmentä vuotta myöhemmin halli puretaan".
- lahde ja ihmeLahde: "Parville, Les Merveilles de l'Exposition (1890)" → "Parville, L'Exposition universelle (1890)".

**Les Halles**
- teksti: "Filip II Augustus siirsi torille uuden markkinan 1183 ja rakennutti sinne ensimmäiset katetut hallit."
  → "Philippe Auguste siirsi sinne 1183 toisen markkinan ja rakennutti torille ensimmäiset katetut hallit."
  - Tällä yhtenäistetään kuninkaan nimi Châtelet'n kanssa. Jos KK suosii suomalaista muotoa, molempiin tulee "Filip II August".
- korostukset: `'Émile Zola|Émile Zolan'` → `'Émile Zola|Émile Zola'`.
- lahde: lisää pavillonbaltard.fr "Histoire" (kymmenen paviljonkia, Nogent). ihmeLahde on yhä "en-Wikipedia … fr-Wikipedia, 31.10.2026", joten lisää paris.fr ja päivitä päiväys.

## Yhteenveto

1. **Suurin löydös:** Trocadéron "ei ollut tarkoitettu kestämään näyttelyn jälkeen" ja nappi "jota ei tehty kestämään" ovat pelkän WP:n varassa, ja aikalaislähde kumoaa ne. *L'art et l'industrie…* (1880): "Dès 1876, il avait été décidé que le palais du Trocadéro resterait à la ville de Paris". Väite ja nappi pois. Myös "mauri-bysanttilaistyylinen" on yhden lähteen varassa.
2. **Tekninen vika:** Les Hallesin korostus `Émile Zolan` ei enää löydy tekstistä, joten alleviivaus jää hiljaa pois. Korjaus: `'Émile Zola|Émile Zola'`.
3. **Palais de l'Industrie:** "vuosittain" Salon (myös kysymys 2), selitteen "1897" (fr-WP sanoo 1896) ja "Petit Palais" ovat yhden lähteen varassa tai ristiriidassa. Pehmennä tekstin sanaan "1890-luvun lopulla" ja pelkkään Grand Palais'hen.
4. **Temple:** n. 1805 vaatetori on heikosti mutta kahdesti tuettu. Sivulause "jonne kauppa on hiljattain siirretty" on vain fr-WP:n varassa, joten pois. Tekstin "osa paikasta on Square du Temple -puistoa" ei vahvistu ja on ristiriidassa selitteen "lähellä" kanssa.
5. **Galerie:** "höyrykoneet ja sähkögeneraattorit" ovat vain Parvillen varassa, joten tilalle "koneet". "Reilut kaksikymmentä" → "parikymmentä". Lähderivin teoksen nimi on väärä: oikein on *L'Exposition universelle* (1890).
6. **Grand Châtelet:** uusi pahanhajuisuusväite koskee lähteissä Grand Châtelet'tä, ei pelkkää vankilaa. Lisäksi kaksi peräkkäistä "jonka"-sivulausetta. Muut uudet sanamuodot (holvikäytävä, tuomioistuin 1790, teurastamot) ovat kahden lähteen varassa.
7. **Orsay:** kaikki kohdat (b) ovat OK. Bonnard ja Lacornée = fr-WP + Leniaud, valtioneuvosto 1840 ja Cour des comptes 1842 = conseil-etat + fr-WP, 23.–24.5.1871 = conseil-etat + fr-WP. ihmeLahde on päivittämättä, ja lahde-rivillä on käyttämätön Zola.
8. **Les Halles:** jäljelle jääneet väitteet ovat OK. 1183-virkkeen kieli ja kuninkaan nimen yhtenäisyys on korjattava.
9. **Kielioppi:** "Trocadérota" → "Trocadéroa", "kohoavat kaksi" → "kohoaa kaksi", "Templen alueelle" → "alueella".
10. **Lähderivit:** Trocadéron lahde ja ihmeLahde sekä Orsayn ja Les Hallesin ihmeLahde ovat yhä 31.10.2026:n WP-versioita.
