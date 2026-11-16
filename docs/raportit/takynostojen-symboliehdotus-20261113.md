# Symboliehdotus (KK:n kuittaama) 56 täkynostolle, joilta symboli puuttuu (SK 13.11.2026)

Tehtävä: PT 13.11. (KK 10.17). Vain docs, ei koodimuutosta. Lähde: `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lontoo-naytto3/oletus-huuto-luettelo.md` (PK, 56 riviä).
Sääntö: KK 13.11. päätös kohdat 8 ja 9 (`suunnitelmat/20261113-lontoon-faktapohja-kk-paatos.md`): symboli kirjoitetaan aina näkyviin ja sen pääkategoria seuraa kartan merkkiä (tiimalasi → historia, lyyra → kulttuuri, lamppu → tekniikka, skandaali → huuto). Ei `hetki`-symbolia (omistaja 2.9.2026). Aidot huijaukset pysyvät huutona.

Arvot ovat `NOSTOSYM_LUOKAT`-avaimia (js/fokusnosto-symbolit.js:1419); sarake "Pääkategoria" on `NOSTOSYM_PAAKATEGORIAT`-taulun mukainen kartan selite. Sarake "Perustelu" kertoo lyhyesti valinnan ja vaihtoehdon, jos jutun teksti voi kääntää sen.

## Yhteenveto
| Symboli | Luokka (kortin ylärivi) | Kpl |
|---|---|---|
| historia | Historia | 23 |
| luonto | Luonto | 10 |
| kulttuuri | Kulttuuri | 5 |
| tekniikka | Tekniikka | 5 |
| elain | Eläimet | 4 |
| huuto | Skandaalit | 3 |
| kauppa | Kauppa | 3 |
| sana | Tarinat | 1 |
| urheilu | Urheilu | 1 |
| ruoka | Ruoka ja juoma | 1 |

Pysyy huutona (aito huijaus tai moite): 3 nostoa. Kaikki muut saavat uuden symbolin. Yhteensä 56.

## Taulukko (Sutton Hoo ensin; Lontoon lähialueelta ei ole muita täkynostoja ilman symbolia)

| Kaupunki | Nimi | Tunnus | Ehdotus | Luokka | Pääkategoria | Perustelu |
|---|---|---|---|---|---|---|
| lontoo | Sutton Hoo | nosto-sutton-hoo | **historia** | Historia | historia | Arkeologinen löytö, laivahautaus; ei huijausta. |
| sofia | Areena hotellin alla | nosto-areena | **historia** | Historia | historia | Roomalainen areena hotellin alla. |
| istanbul | Troijan tuhoaja | nosto-schliemann | **huuto** | Skandaalit | skandaalit | PYSYY: aito moitejuttu (löytäjä tuhosi kohteen). Vaihtoehto historia, jos KK:n mielestä "skandaali" on liian vahva. |
| rooma | Caesarin kissat | nosto-kissat | **elain** | Eläimet | elaimet | Kissayhdyskunta temppelissä; pääkategoria Eläimet. |
| bukarest | Draculan alaviite | nosto-dracula | **sana** | Tarinat | historia | Kirjallisuus; sana kuuluu päätasolla Historiaan. |
| sarajevo | Pyramidihuijaus | nosto-pyramidi | **huuto** | Skandaalit | skandaalit | PYSYY: aito huijaus (Bosnian pyramidi). |
| madrid | Altamiran katto | nosto-altamira | **historia** | Historia | historia | Löytäjää epäiltiin virheellisesti; ei huijaus vaan väärin epäilty löytö. Vaihtoehto huuto (skandaali tiedeyhteisössä). |
| madrid | Papukaijat | nosto-munkkiaratit | **elain** | Eläimet | elaimet | Puistojen papukaijat. |
| madrid | Cartagenan kantoni | nosto-cartagenan-kantoni | **historia** | Historia | historia | Poliittinen tapahtuma 1873. |
| wien | Näyttely ja pörssi | nosto-maailmannayttely-1873 | **kauppa** | Kauppa | kauppa | Pörssiromahdus 1873; sama sävy kuin muut 1873-jutut. Vaihtoehto historia. |
| wien | Kirahvi ja muoti | nosto-kirahvimuoti | **kulttuuri** | Kulttuuri | kulttuuri | KK 13.11.: juttu on muodista; Pariisin Kirahvi-merkkisääntö (historia) ei koske tätä. |
| berliini | Köpenick | nosto-kopenickin-kapteeni | **huuto** | Skandaalit | skandaalit | PYSYY: aito huijaus (univormuhuijaus). |
| berliini | Lehmän hinnalla | nosto-archaeopteryx | **luonto** | Luonto | luonto | KK 13.11.: juttu on fossiilista, hinta on koukku. |
| berliini | Velkojen linna | nosto-neuschwanstein | **historia** | Historia | historia | Linnan rakennus ja velat. |
| budapest | Szegedin tulva | nosto-szegedin-tulva | **historia** | Historia | historia | Tulva 1879 ja jälleenrakennus. |
| dubrovnik | Pulan areena | nosto-pulan-areena | **historia** | Historia | historia | Roomalainen amfiteatteri, Venetsian päätös. |
| praha | Karlštejn | nosto-karlstejn | **historia** | Historia | historia | Keskiaikainen linna. |
| tukholma | Vasaloppet | nosto-vasaloppet | **urheilu** | Urheilu | kulttuuri | Hiihtotapahtuma; pääkategoria Kulttuuri. |
| kobenhavn | Trelleborg | nosto-trelleborg | **historia** | Historia | historia | Viikinkilinnoitus. |
| helsinki | Oulun terva | nosto-tervakauppa | **kauppa** | Kauppa | kauppa | Tervakauppa. |
| tallinna | Kaalin kraatteri | nosto-kaali | **luonto** | Luonto | luonto | Meteoriittikraatteri. |
| sevilla | Kolumbuksen luut | nosto-kolumbuksen-luut | **historia** | Historia | historia | Hautaaminen ja siirrot. Vaihtoehto huuto, jos juttu korostaa epävarmaa identiteettiä (tarkista teksti). |
| sevilla | Itálican amfiteatteri | nosto-italica-amfiteatteri | **historia** | Historia | historia | Roomalainen amfiteatteri. |
| sevilla | Iberianilves | nosto-iberianilves | **elain** | Eläimet | elaimet | Uhanalainen kissaeläin. |
| sevilla | Velázquezin oppivuodet | nosto-velazquezin-oppivuodet | **kulttuuri** | Kulttuuri | kulttuuri | Taidemaalari. |
| bergen | Amundsenin koti | nosto-amundsen | **historia** | Historia | historia | Tutkimusmatkailija; lapsuudenkoti. Vaihtoehto merenkulku. |
| bergen | Ekofisk | nosto-ekofisk | **tekniikka** | Tekniikka | kauppa | Öljynporaus. |
| amsterdam | Alkmaar | nosto-tulppaanimania | **kauppa** | Kauppa | kauppa | Hintakupla. |
| amsterdam | Afsluitdijk | nosto-afsluitdijk | **tekniikka** | Tekniikka | kauppa | Patorakenne. |
| amsterdam | Delftin linssit | nosto-leeuwenhoek | **tekniikka** | Tekniikka | kauppa | Mikroskooppilinssit. |
| amsterdam | Loevesteinin arkku | nosto-kirja-arkku | **historia** | Historia | historia | Pako 1621. |
| dublin | Ardaghin kätkö | nosto-maljat | **historia** | Historia | historia | Arkeologinen löytö. |
| dublin | Newgrange | nosto-newgrange | **historia** | Historia | historia | Neoliittinen kumpuhauta. |
| dublin | Suovoi | nosto-suovoi | **historia** | Historia | historia | Suosta löydetty ikivoi. Vaihtoehto ruoka. |
| edinburgh | Skara Brae | nosto-skara-brae | **historia** | Historia | historia | Neoliittinen kylä. |
| edinburgh | Bell Rock | nosto-bell-rock | **tekniikka** | Tekniikka | kauppa | Majakan rakennustekniikka. Vaihtoehto merenkulku. |
| edinburgh | St Kilda | nosto-st-kilda | **historia** | Historia | historia | Saaren evakuointi 1930. |
| edinburgh | Fingalin luola | nosto-fingalin-luola | **luonto** | Luonto | luonto | Basalttiluola. |
| lissabon | Lepakkokirjasto | nosto-joanina | **elain** | Eläimet | elaimet | Lepakot suojelevat kirjoja. Vaihtoehto kulttuuri (kirjasto). |
| lissabon | Nazarén aalto | nosto-nazare | **luonto** | Luonto | luonto | Valtameren aallot. |
| lissabon | Laattahalli | nosto-saobento | **kulttuuri** | Kulttuuri | kulttuuri | Atsulejo-laatat. |
| lissabon | Korkkitammi | nosto-korkkitammi | **luonto** | Luonto | luonto | Puu ja sen kuori. Vaihtoehto kauppa. |
| riika | Ventas rumba | nosto-ventas-rumba | **luonto** | Luonto | luonto | Vesiputous. |
| riika | Kolkasrags | nosto-kolkasrags | **luonto** | Luonto | luonto | Niemi ja kielen sukupuutto. Vaihtoehto historia. |
| vilna | Kuršių nerija | nosto-kursiu-nerija | **luonto** | Luonto | luonto | Dyynit ja metsä. |
| vilna | Kryžių kalnas | nosto-kryziu-kalnas | **historia** | Historia | historia | Ristikukkula, kolme raivausta. |
| vilna | Trakai | nosto-trakai | **historia** | Historia | historia | Keskiaikainen saarilinna. |
| kiova | Trypillia | nosto-trypillia | **historia** | Historia | historia | Esihistoriallinen kulttuuri. |
| kiova | Dneprin kosket | nosto-dneprin-kosket | **luonto** | Luonto | luonto | Koskia, jotka ovat nyt järven pohjassa. |
| kiova | Sofian mosaiikit | nosto-sofian-mosaiikit | **kulttuuri** | Kulttuuri | kulttuuri | Mosaiikit. |
| krakova | Wieliczka | nosto-wieliczka | **historia** | Historia | historia | Suolakaivos, kirkkosali. Vaihtoehto kulttuuri. |
| krakova | Toruń | nosto-torun-piparkakut | **ruoka** | Ruoka ja juoma | kulttuuri | Piparkakut. |
| krakova | Wrocław | nosto-wroclawin-kaapiot | **kulttuuri** | Kulttuuri | kulttuuri | Kääpiömuistomerkit (katutaide). |
| pietari | Kižin puukirkko | nosto-kizin-kirkko | **historia** | Historia | historia | Puukirkko. Vaihtoehto kulttuuri. |
| pietari | Pietarhovi | nosto-pietarhovin-suihkulahteet | **tekniikka** | Tekniikka | kauppa | Suihkulähteet ilman pumppuja. |
| pietari | Baikal | nosto-baikal | **luonto** | Luonto | luonto | Repeämäjärvi. |

## Huomioita KK:lle
- Epävarmat (vaihtoehto kirjattu riville): Troijan tuhoaja (huuto vai historia), Altamira (historia vai huuto), Näyttely ja pörssi, Kolumbuksen luut, Lepakkokirjasto (Archaeopteryx ja Kirahvi ja muoti ratkaistu KK:n kuittauksessa).
- KK:n kuittaus 13.11. 10.18: Archaeopteryx kauppa → luonto, Kirahvi ja muoti historia → kulttuuri; muut 54 ehdotuksen mukaan.
- Tarkistamatta jutun koko teksti: valinnat tehty otsikosta ja nostotunnuksesta. Jos KK haluaa, luen epävarmojen rivien tekstit ennen kuittausta.
- PK:n testilaajennus (kaikki täkynostot, symboli vastaa kartan merkkiä) pätee tämän taulukon jälkeen myös `sana`, `urheilu` ja `elain` -arvoille: niiden pääkategoria on taulussa `NOSTOSYM_PAAKATEGORIAT`.
