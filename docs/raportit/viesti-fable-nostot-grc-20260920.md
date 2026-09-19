# Viesti Fablelle: Kreikan hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 17.25 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot",
haara `sonnet-nostot-grc` (pohja origin/main 88f43233, v1956). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 29 nostoa (Fablen hyväksymä lista, ei korvauksia), 69 Commons-kuvaa. Arta, Kalavryta, Zagori ja Naoussa saivat kaikki kaksi kuvaa, joten korvauksia ei tarvittu.**
Uusi tiedosto `js/packs/hahmotelma-grc.js` (`HAHMOTELMA_GRC`, rakenne täsmälleen kuin
hahmotelma-fra.js ja muut EU-pakat). Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.GRC`),
`sw.js` SHELL, `tools/build-standalone.mjs`. HUOM: haara on v1956:n päällä ilman ITA-, DEU- ja PRT-rivejä, joten
rekisteröintirivit tulevat hahmotelma-fra-rivien jälkeen samoihin kohtiin kuin niiden — merge tuottaa triviaalin
konfliktin, ja kaikki rivit jäävät. Mykenelle ei ole omaa nostoa; nykyiseen `nosto-sofia-korut`-nostoon ei ole koskettu.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | lähin pelikaupunki (lautayks.) |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| vikos | Vikosin rotko | vuori | 613 | 2 | Pudelek, Calistemon | CC BY-SA 4.0 | ateena 127.1 |
| samaria | Samarian rotko | vuori | 620 | 2 | Lapplaender, Anna Saini | CC BY-SA 3.0 de, CC BY-SA 4.0 | kreeta 44.8 |
| pelion | Pelion | vuori | 550 | 3 | Stathis floros, Stephanos Stournaras, Annatsach | CC BY-SA 4.0, Public domain | ateena 61.6 |
| prespa | Prespajärvi | jarvi | 588 | 3 | Chalki25, DimitrisP67 | CC BY-SA 4.0 | ateena 145.9 |
| kerkini | Kerkinijärvi | jarvi | 612 | 3 | Vassilios Vescoukis, Wkkasimag, Eimaiokanenas | CC BY-SA 4.0, CC BY 4.0 | ateena 129.1 |
| navagio | Navagio (Zakynthos) | saari | 636 | 3 | Wilnel José Verdú Guerrero, dronepicr | CC BY-SA 4.0, CC BY 2.0 | ateena 104.0 |
| milos | Milos | saari | 643 | 3 | dronepicr, Zde, Caeciliusinhorto | CC BY 2.0, CC BY-SA 4.0 | ateena 54.4 |
| vergina | Vergina | historia | 692 | 2 | Explorer1940, Digitalphilologist | CC BY-SA 4.0 | ateena 109.0 |
| pella | Pella | historia | 724 | 2 | Carole Raddato, Egisto Sani | CC BY-SA 2.0 | ateena 116.3 |
| philippi | Filippoi | historia | 778 | 3 | Carole Raddato | CC BY-SA 2.0 | ateena 120.5 |
| bassae | Bassain temppeli | historia | 730 | 2 | Dionysisa303, Carole Raddato | CC BY-SA 4.0, CC BY-SA 2.0 | ateena 64.8 |
| delos | Delos | historia | 688 | 3 | Ggia, Zde, Bernard Gagnon | CC BY-SA 3.0, CC BY-SA 4.0 | ateena 55.6 |
| monemvasia | Monemvasia | historia | 785 | 2 | C messier, DimitrisP67 | CC BY-SA 4.0 | ateena 54.3 |
| sounion | Sounionin temppeli | historia | 719 | 2 | Petroskaz, Jebulon | CC BY-SA 4.0, CC0 | ateena 15.5 |
| samothrace | Samothrake | historia | 659 | 2 | Shonagon, Ggia | CC0, CC BY-SA 3.0 | ateena 114.7 |
| meteora | Meteora | kulttuuri | 704 | 2 | KASPAR, Bernard Gagnon | CC BY-SA 4.0 | ateena 97.7 |
| athos | Athoksen luostarit | kulttuuri | 740 | 3 | Laurens R. Krol, Explorer1940, Kritzolina | CC BY 4.0, CC BY-SA 4.0 | ateena 87.5 |
| metsovo | Metsovo | ruoka | 608 | 3 | Ginak97, DimitrisP67, C messier | CC BY-SA 4.0, CC0 | ateena 110.3 |
| korfu | Korfu | kulttuuri | 687 | 2 | Martin Falbisoner, ChrLoukop | CC BY-SA 4.0 | ateena 143.7 |
| kastoria | Kastoria | kulttuuri | 766 | 2 | Pvasiliadis, stefg74 | CC BY-SA 3.0, CC BY 2.0 | ateena 129.3 |
| naoussa | Naoussa | ruoka | 677 | 3 | Frangiscoder, Vagrand | CC BY-SA 3.0 | ateena 118.1 |
| lavrio | Lavrion hopeakaivokset | kauppa | 698 | 2 | Dr Peter Tzeferis | CC BY-SA 4.0 | ateena 14.6 |
| kalavryta | Kalavryta | tekniikka | 686 | 2 | Leonidas Kourmadas, Rigorius | CC BY-SA 4.0 | ateena 54.2 |
| chios | Chios ja mastiksi | kauppa | 556 | 3 | Eva-tzi, Palden Dorenský, Tash1000 | CC BY-SA 4.0 | ateena 79.1 |
| zagori | Zagorin kivisillat | tekniikka | 669 | 2 | Jolovema, GPierrakos | CC BY-SA 4.0 | ateena 125.5 |
| arta | Artan silta | tekniikka | 753 | 2 | Jennikann, vlachos yorgos | CC BY-SA 4.0 | ateena 103.0 |
| thermopylae | Thermopylai | historia | 715 | 2 | Ribouldingue, Davide Mauro | CC BY-SA 4.0 | ateena 50.9 |
| missolonghi | Mesolongi | historia | 705 | 2 | JuliaVafiades, Efthimios Tsilikidis | CC BY-SA 4.0 | ateena 78.6 |
| navarino | Navarino | historia | 747 | 2 | Dnalor 01, Ambroise Louis Garneray | CC BY-SA 3.0 at, Public domain | ateena 79.1 |

Kuvia yhteensä 69; lisenssijakauma: CC BY-SA 4.0 43, CC BY-SA 3.0 7, CC BY-SA 2.0 6, CC BY 2.0 4, CC0 3, Public domain 2, CC BY 4.0 2, CC BY-SA 3.0 de 1, CC BY-SA 3.0 at 1.

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 29 |
| Teksti ≥ 200 merkkiä | 29/29 (550–785 merkkiä; karkea virkelaskuri 4–7) |
| `lahde`-rivi (artikkeli + 19.9.2026) | 29/29 |
| 2 kysymystä pululle | 29/29 |
| ≥ 2 kuvaa | 29/29 (11 kohteella 3 kuvaa) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 69/69 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 69/69; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (4 rinnakkain), yksikään ei ole NC/ND/GFDL/FAL |
| Kuvatiedostot olemassa, sha256-etuliite = tiedostonimen tunniste | 69/69 |
| Korostukset löytyvät tekstistä | 29/29 |
| Fokuslehden rajaus (`osuuLehteen('GRC')`), myös saaret | 29/29 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 29/29 pääkartalla, `kaupunginKohdalla` = null kaikilla |
| Etäisyys pelikaupunkiin (Ateena, Kreeta) | pienin Samaria 44,8 (Kreeta) ja Sounion 15,5 / Lavrio 14,6 (Ateena); raja 7 |
| Päällekkäisyys 43 nykyisen GRC-noston kanssa | ei samoja id:itä eikä nimiä; lähimmät nykyiset: Vikos – Smólikas 7,8, Vergina – Ólympos 15,7, Zagori – Ioánnina 9,5, Meteora – Aliákmonas 10,2, Missolonghi – Patras 11,2 lautayksikköä |
| Piste Kreikan maalla (pelin maailmankartan GRC-renkaat) | 18/29; renkaan ulkopuolella (etäisyys renkaasta lautayksikköä): prespa 1.4, navagio 16.2, milos 41.5, delos 34.2, monemvasia 0.1, sounion 2.7, samothrace 16.5, athos 0.1, korfu 5.8, lavrio 2.1, chios 50.7 |
| `node --test tests/*.test.mjs` | # tests 3663, # pass 3650, # fail 0, # skipped 13 |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |

## Poikkeamat ja päätettävää

1. **Etäisyydet GRC-renkaaseen** (Fablen pyynnöstä; lautayksikköä renkaan reunasta): kuusi saarta — Milos 41,5, Navagio 16,2,
   Delos 34,2, Korfu 5,8, Chios 50,7, Samothrake 16,5 — ovat renkaan ulkopuolella, koska rengas ei sisällä pieniä saaria.
   Rannikko- ja järvikohteet: Athos 0,1, Monemvasia 0,1, Lavrio 2,1, Sounion 2,7, Prespa 1,4. Renkaan sisällä
   rajakohteista Vikos 6,9, Kalavryta 6,9, Kerkini 5,7, Arta 4,3, Navarino 0,3, Missolonghi 0,1, Thermopylae 2,5. Kaikki osuvat fokuslehdelle
   (`osuuLehteen`), ja ankkurilukitus hoitaa renkaan.
2. **Lähdeperusteinen poikkeama**: Kerkinin oma artikkeli "Kerkini" on kylästä (177 merkkiä), joten teksti ja koordinaatti
   otettiin artikkelista "Lake Kerkini" (tekojärvi 1932, lintupaikka, Ramsar); piste 41,2167 / 23,0833 sama kuin listalla.
   Sounionin listan väite "Byron on kaivertanut nimensä" ei ollut artikkelissa, joten sitä ei väitetä; Sounionin teksti kertoo
   temppelin 444–440 eaa. ja Perikleen ajan. Metsovon "juusto ja viini" ja Kalavrytan hammasrata tuettiin artikkelista;
   Kalavrytan rautatieasema-kuvaa ei tarvittu (Odontotos-juna sillalla ja Mega Spileon luostari).
3. **Kuvarajoitukset**: Lavrion kohteelle ei löytynyt antiikin kaivoskäytäviä tai mineralogista museota ilman vesileimaa, joten
   kuvat ovat Lavrion teknologinen puisto (vanhat teollisuusrakennukset) ja Thorikosin teatteri/malmin pesuallas (huomio JSON:ssa).
   Naoussan kolmas kuva (viinitarha) on 640×480. Navarinolle ei löytynyt Neokastro-linnan kuvaa; kuvat ovat Pylos ja
   Sfakteria sekä Garneray'n taistelumaalaus 1827 (savua ja laivoja, ei ihmisiä veteen). Mesolongille ei otettu
   Delacroix'n maalausta (ruumiin käsi ja paljas rinta) eikä "Attribution"-lisenssin kuvia. Perhe-13+: Milosin kolmas kuva
   on Venus de Milo Louvressa (kokopatsas, antiikin taide, Fablen ohjeen mukaan); rintakuva hylättiin.
4. **Rajaukset**: Pellan leijonametsästysmosaiikki (museokyltti pois), Pelionin Makrinitsa-postikortti (painettu teksti pois),
   Thermopylain kaksi kuvaa (alaosan sora pois), Mesolongin laguuni (oikea reuna pois). Pystykuvat (Venus, larnax) pienennetty
   1800 px:iin pisimmän sivun mukaan.
5. **Tekstit** ovat omin sanoin en-Wikipedian johdannoista ja osioista; listan muistista kirjoitetut "miksi"-virkkeet
   (Vikos: yksi maailman syvimmistä suhteessa leveyteen, Milos: Venus 1820, Samothrake: Nike 1863, Arta: seitsemän rakentajaa)
   tarkistettiin: Venus 1820 pois (ei artikkelissa), Nike 1863 säilyi (artikkelissa), Artan ballaadi kerrotaan artikkelin
   mukaan (45 muurarin ja 60 oppipojan ihmisuhri), ei "seitsemän rakentajaa".
6. **1873-näkökulma**: nappi-alaotsikot on kirjoitettu 1873-katseella (Arta: raja 1881; Kalavryta: hammasraide tulossa 1885;
   Kerkini: tekojärvi 1932; Navagio: haaksirikko 1980; Vergina: haudat 1977, Sounion, Meteora jne.).

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 69 tiedostoa kansiosta
  `/Users/samireivinen/Matkakirja-nostot-kuvat/grc/` osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan
  etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole
  committoitu. JSON-metatiedot ovat kansiossa `_json/`.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- Kreikan nostoankkureita ei ole lukittu (`LUKITUT_MAAT` on vain FRA). Havainnekuvat odottavat.
- Peliä ei avattu selaimessa; piirto todettu samalla reitillä kuin hahmotelma-fra.js (KOHDE_MAAT) ja
  testit ovat vihreitä.
- Silmäpistokoe: itse katsoin Navarinon taistelumaalauksen; muut katsoi viisi Sonnet-kuva-agenttia (kukin omat 5–6
  kohdettaan), jotka raportoivat jokaisen katsotuksi ja listasivat hylätyt ehdokkaat.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/grc/`: 69 kpl `grc-nosto-<id>-<sha8>.jpg`, alikansio
`_json/` (kuvatiedot kohteittain).
