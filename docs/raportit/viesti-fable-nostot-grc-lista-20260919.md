# Viesti Fablelle: Kreikan hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-grc`
(pohja origin/main 88f43233, v1956). **29 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu.

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli
  taulukossa. Yhtään lukua ei ole arvattu.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs`
  `laudat`, `osuuLehteen('GRC')`): **29/29 osuu Kreikan fokuslehteen**, saaretkin.
- Kreikan pelikaupungit ovat Ateena ja Kreeta (Iraklion). Lähin ehdotus on Thermopylae 50,9 (Ateena) ja
  Samaria 44,8 (Kreeta); raja `KAUPUNGIN_KOHDALLA_SADE` on 7, joten yksikään ei ole kaupungin kohdalla.
- Päällekkäisyys: verrattu `nostojenKarttapaikat()`-tulosteeseen (GRC:n 40 nykyistä nostoa) sekä
  fokuskohteet-grc.js:n ja fokus-grc.js:n kohteisiin. Nykyisiä ovat mm. Ólympos, Parnassós, Taÿgetos,
  Píndos, Smólikas, Psilorítis, neljä merta, Aliákmonas, Strymónas, Évros, Korintin kanava, Santoríni,
  Delfoi, Akropolis, Olympia, Ermoupoli, Epidauros, Marathon, Antikythera, Rodoksen kolossi, Knossos,
  Agora, Olympieion, Mykene (Sofia-korut-nosto), Elginin marmorit, Simonides, Maratonhuijaus sekä kaupungit
  (Thessaloniki, Patras, Ioánnina, Náfplio, Iraklion, Kalamata). Hylätty päällekkäisyyden takia (alle 7
  lautayksikköä nykyisestä merkistä): Dion (5,3 Ólymposista), Mystras (4,4 Taÿgetoksesta), Sparta (5,5),
  Dodona (5,1 Ioánninasta), Nemea (3,5 Mykenestä), Náfpaktos (6,4 Patrasista) ja Mykene itse (nykyinen
  `nosto-sofia-korut` on samassa paikassa; Fablen mainitsema 1876 jää siis sen alaotsikkoon). Yksikään
  ehdotus ei ole alle 7,5 lautayksikön päässä nykyisestä merkistä.
- Ei kaupunkeja: Ateena, Thessaloniki, Patras, Iraklion, Volos, Chania, Rodos jne. jätetty pois.
  Mukana pieniä kaupunkeja (Kastoria, Naoussa, Metsovo, Kalavryta), koska niiden merkitys on kohde.
- Saaret: Fablen sääntö "vain ne, jotka osuvat GRC-fokuslehdelle" — kaikki viisi (Zakynthos/Navagio,
  Milos, Delos, Korfu, Chios, Samothrace; kuusi) osuvat lehdelle; etäisyys pelin karkeaan GRC-renkaaseen
  taulukossa. Ne ovat renkaan ulkopuolella (rengas ei sisällä pieniä saaria), ankkurilukitus hoitaa.
- Tyypit ovat pelin oma `KOHDE_TYYPPISYMBOLIT`-taulun arvot (luonto = vuori / saari / jarvi; muut
  historia, kulttuuri, ruoka, kauppa, tekniikka).

## Lista

### Luonto (7)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-vikos | Vikosin rotko | vuori | 39,9694 / 20,7283 | Vikos Gorge | Zagorin vuorten rotko, yksi maailman syvimmistä suhteessa leveyteensä. |
| 2 | hahmotelma-samaria | Samarian rotko | vuori | 35,2711 / 23,9614 | Samaria Gorge | Kreetan Valkoisten vuorten 16 km:n rotko, jonka läpi kuljetaan jalan. |
| 3 | hahmotelma-pelion | Pelion | vuori | 39,4386 / 23,0465 | Pelion | Kentauri-taruston vuori, jonka rinteillä on kyliä ja omenatarhoja. |
| 4 | hahmotelma-prespa | Prespajärvi | jarvi | 40,9 / 21,0333 | Lake Prespa | Kolmen maan rajajärvi Pindoksen ja Albanian vuorten välissä. |
| 5 | hahmotelma-kerkini | Kerkinijärvi | jarvi | 41,2167 / 23,0833 | Kerkini | Strymónas-joen tekojärvi ja lintujen muuttokohde Bulgarian rajalla. |
| 6 | hahmotelma-navagio | Navagio (Zakynthos) | saari | 37,8596 / 20,6245 | Navagio Beach | Joonianmeren kalkkikivikallioiden ympäröimä hiekkaranta ja haaksirikkoinen rannikko. |
| 7 | hahmotelma-milos | Milos | saari | 36,6875 / 24,4325 | Milos | Kykladien tulivuorisaari, josta Venus de Milo löytyi vuonna 1820. |

### Historia (8)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 8 | hahmotelma-vergina | Vergina | historia | 40,4833 / 22,3167 | Vergina | Makedonian kuninkaiden hautapaikka, josta löytyi 1977 Filippos II:n hauta. |
| 9 | hahmotelma-pella | Pella | historia | 40,7547 / 22,5211 | Pella | Aleksanteri Suuren syntymäkaupunki ja Makedonian pääkaupunki. |
| 10 | hahmotelma-philippi | Filippoi | historia | 41,0131 / 24,2864 | Philippi | Roomalaiskaupunki, jonka luona Brutus ja Cassius kukistettiin 42 eaa. ja jossa apostoli Paavali saarnasi. |
| 11 | hahmotelma-bassae | Bassain temppeli | historia | 37,4297 / 21,9003 | Bassae | Apollon Epikurioksen temppeli Peloponnesoksen vuorilla, ensimmäisiä UNESCO-kohteita. |
| 12 | hahmotelma-delos | Delos | historia | 37,3933 / 25,2711 | Delos | Apollon ja Artemiin syntymäsaari, Kykladien pyhä keskus. |
| 13 | hahmotelma-monemvasia | Monemvasia | historia | 36,6878 / 23,0556 | Monemvasia | Kallioniemen bysanttilainen linnoituskylä, jota kutsutaan Kreikan Gibraltariksi. |
| 14 | hahmotelma-sounion | Sounionin temppeli | historia | 37,652 / 24,026 | Sounion | Poseidonin temppeli Attikan kärjessä, jonka Byron on kaivertanut nimensä. |
| 15 | hahmotelma-samothrace | Samothrake | historia | 40,45 / 25,5875 | Samothrace | Pohjois-Egeanmeren saari, jossa oli antiikin salaisen palvonnan pyhäkkö ja josta Nike-patsas löytyi 1863. |

### Kulttuuri ja ruoka (6)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 16 | hahmotelma-meteora | Meteora | kulttuuri | 39,7142 / 21,6311 | Meteora | Kalliopylväiden huipulle rakennetut luostarit Thessalian tasangolla. |
| 17 | hahmotelma-athos | Athos | kulttuuri | 40,1583 / 24,3273 | Mount Athos | Ortodoksisten luostarien niemimaa, jonne naiset eivät pääse. |
| 18 | hahmotelma-metsovo | Metsovo | ruoka | 39,7703 / 21,1838 | Metsovo | Pindoksen vuoristokylä, joka tunnetaan juustostaan ja viinistään. |
| 19 | hahmotelma-korfu | Korfu | kulttuuri | 39,6 / 19,87 | Corfu | Joonianmeren venetsialainen saari, jonka vanhakaupunki on UNESCO-kohde. |
| 20 | hahmotelma-kastoria | Kastoria | kulttuuri | 40,5167 / 21,2667 | Kastoria | Järven ympäröimä turkiskauppiaiden ja bysanttilaisten kirkkojen kaupunki. |
| 21 | hahmotelma-naoussa | Naoussa | ruoka | 40,6333 / 22,0667 | Naousa, Imathia | Vermion-vuoren juurella oleva Naoussa, Kreikan Xinomavro-punaviinin keskus. |

### Kauppa ja tekniikka (4)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 22 | hahmotelma-lavrio | Lavrion hopeakaivokset | kauppa | 37,7 / 24,05 | Lavrio | Antiikin Ateenan hopeakaivosten kaupunki, joka rahoitti Salamiin laivaston. |
| 23 | hahmotelma-kalavryta | Kalavryta | tekniikka | 38,0333 / 22,1167 | Kalavryta | Peloponnesoksen vuoristokaupunki ja hammasraiteisen Diakofto–Kalavryta-radan pääteasema. |
| 24 | hahmotelma-chios | Chios ja mastiksi | kauppa | 38,3775 / 26,065 | Chios | Saari, jonka mastiksipuusta saatiin arvokasta hartsia. |
| 25 | hahmotelma-zagori | Zagorin kivisillat | tekniikka | 39,8667 / 20,7 | Zagori | Epeiroksen vuoristokylien kaarisillat ja kivikylät. |
| 26 | hahmotelma-arta | Arta | tekniikka | 39,1517 / 20,9747 | Bridge of Arta | Silta, jonka tarun mukaan seitsemän rakentajaa uhrasi vaimonsa. |

### Hetket (3)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 27 | hahmotelma-thermopylae | Thermopylai | historia | 38,8053 / 22,5628 | Thermopylae | Kuningas Leonidas ja hänen kolmesataa spartalaistaan pysäyttivät persialaiset 480 eaa. |
| 28 | hahmotelma-missolonghi | Mesolongi | historia | 38,3692 / 21,4278 | Missolonghi | Vapaussodan piiritetty laguunikaupunki, jossa Byron kuoli 1824. |
| 29 | hahmotelma-navarino | Navarino | historia | 36,9358 / 21,6878 | Battle of Navarino | Meritaistelu 1827, joka ratkaisi Kreikan vapaussodan. |

## Huomiot Fablelle

1. **Etäisyys GRC-renkaaseen** (pelin maailmankartan GRC-rengas, pistemäinen sisällä-testi; lautayksikköä
   renkaan reunasta) — renkaan ulkopuolella: Milos 41,5, Navagio 16,2, Delos 34,2, Korfu 5,8, Chios 50,7,
   Samothrake 16,5 (saaret), Athos 0,1, Monemvasia 0,1, Sounion 2,7, Lavrio 2,1, Missolonghi 0,1 ja
   Prespa 1,4 (rannikko/järvi ja rengaskarkeus). Renkaan sisällä 12 muuta; rajakohteista Vikos 6,9,
   Kalavryta 6,9, Arta 4,7, Kerkini 5,7, Navarino 0,3 (rengas ja sisäpuoli). Saaret ovat oikeasti maalla;
   ankkurilukitus hoitaa.
2. **Mykene**: ei omaa noston paikkaa, koska nykyinen `nosto-sofia-korut` on samassa paikassa (Mykene, 34,1
   Ateenasta) — Schliemannin 1876 sopii sen alaotsikkoon. Jos haluat erillisen Mykene-noston, pudotan
   yhden luontokohteen tilalta; sano.
3. **Läheiset nykyisiin**: Vikos – Smólikas 7,8, Bassae – Olympia 12,0, Meteora – Aliákmonas 10,2,
   Pella – Thessaloniki 14,6; yli 7, mutta merkit voivat törmätä lähizoomissa.
4. **1873:n jälkeiset**: Vergina (Filippos II:n haudat löytyivät 1977), Kalavryta (rautatie 1895), Navagio,
   Milos (Venus 1820, ennen 1873); nappi-alaotsikko 1873-näkökulmasta ("tänne nousee myöhemmin…").
5. **Kuvariskit**: Arta (siltakuvia riittää), Kalavryta (rautatieaseman kuvaa ei ehkä löydy), Zagori,
   Naoussa; jätän pois ja korvaan kohteella (Pylos/Nestor-linna, Kythira, Kefalonia) niin että 29 säilyy.
6. "Miksi"-virkkeet on kirjoitettu muistista listaa varten ja tarkistetaan Wikipedian tekstistä vaiheessa 2;
   vaiheessa 2 tekstit kirjoitetaan vain artikkelien pohjalta (erityisesti Arta-taru, Byronin nimikirjoitus
   ja Kalavryta-rautatie).

Odotan hyväksyntää (tai muutoksia) ennen vaihetta 2.
