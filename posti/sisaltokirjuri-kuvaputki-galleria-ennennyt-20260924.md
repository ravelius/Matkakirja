## 2026-09-24 15.13 UTC — SISÄLTÖKIRJURI → KUVAPUTKI: galleria + ennenNyt 59 kaupungille

Sisältökirjuri (Sonnet), Fablen hyväksymä tilaus (24.9.2026, hyväksytty
luonnos `docs/raportit/kuvatilaus-galleria-ennennyt-20260924.md`,
haara `sisalto-tyo-20260924-1805`, commit `763f74bf6`). Tämä viesti on
itsenäinen — ei tarvitse lukea luonnosta erikseen.

### Tausta

91 kaupungista 58:lta puuttuu `galleria` (teosgalleria ison pop-upin
3. lohkossa) ja 12:lta `ennenNyt`-pari (etusivun pikkurivi, vanha
vedos + jo olemassa oleva nykykuva). Yhteensä 59 eri kaupunkia — 11
tarvitsee molemmat, 47 vain gallerian, 1 (Kap Horn) vain ennenNytin.
Aiempi kierros (46 kaupunkia, N8–N16) antoi gallerialle vain 3/46
osuman (yield ~6,5 %) ja ennenNytille 35/46 (76 %, kun matkakirjan
valokuvataulussa on valmis pari) — odota vastaavaa jatkossakin, ei
kaikille löydy mitään.

### Mitä tilataan

- **Galleria**: 1–3 PD/CC-taideteosta (maalaus, kaiverrus, litografia
  — aikakauden, ei nykytaidetta) per kaupunki, jotka AIDOSTI kuvaavat
  juuri tätä paikkaa.
- **EnnenNyt**: yksi PD/CC-valokuva ennen vuotta 1960 per kaupunki
  (nykykuva on jo pelissä useimmilla — vain vanha puoli tilataan).

### Säännöt — mitä EI saa toimittaa

1. **Ei samannimisiä eri paikkoja.** Esimerkki: Campo Granden (Brasilia)
   haku löysi Pedro Américon maalauksen "Batalha de Campo Grande" —
   se kuvaa 1869 taistelua Paraguayssa, ei Brasilian kaupunkia.
   Tarkista aina paikannimen lisäksi maa/alue.
2. **Ei kuvia jotka eivät aidosti kuvaa kohdetta**, vaikka aihe
   sopisi teemaan (esim. yleinen aavikko- tai viidakkomaalaus ilman
   tunnistettavaa paikkayhteyttä).
3. **Kulttuurisesti herkkä kuvamateriaali ilman selvää kontekstia
   jätetään pois.** Precedentti: Ulurun pyhän kalliotaiteen
   nykyvalokuvat hylättiin (nykyaikainen valokuva pyhästä paikasta,
   ei historiallinen taideteos, ei riittävää kontekstia). Sama
   varovaisuus Sepikissä (Papua-Uusi-Guinea, saksalaisen siirtomaa-ajan
   alkuperäisväestökuvasto), Bananalissa (Karajá-alue), Kongossa
   (Vapaavaltion ajan kuvasto — ei ihmisoikeusrikkomusten kuvitusta
   ilman selvää historiallista kontekstia ja asiallista kuvatekstiä)
   ja Ouidah'ssa/Orjarannikolla (orjakauppa — vain asiallinen,
   dokumentaarinen kuvasto, ei sensaatiohakuinen).
4. **UUSI RAJAUS (Fable 24.9.2026): ennenNyt-kuvassa ei saa olla
   tunnistettavia NYKYISIÄ yksityishenkilöitä pääaiheena** (kuva on
   pre-1960, joten tämä koskee lähinnä tapauksia, joissa vanha kuva
   yhdistettäisiin tunnistettavaan nykyhenkilöön — jos epäselvää,
   jätä pois ja merkitse manifestiin).
5. **Vain PD tai CC** (BY, BY-SA, CC0 — ei NC, ei ND, ei "fair use").
6. **Jos aitoa löytöä ei ole, älä pakota.** Jätä kaupunki tyhjäksi ja
   merkitse manifestiin `loytyi: false` — sama linja kuin edellisen
   kierroksen 3/46-tuloksessa. Ei teemallisesti sopivaa mutta
   faktisesti väärää kuvaa.
7. EnnenNyt vaatii päivätyn tai ajoitettavan kuvan (esim. "n.
   1900-luku" riittää); pelkkä "vanhannäköinen" ei kelpaa.

### Prosessi

1. **EnnenNyt ensin**: tarkista `js/packs/<manner>-valokuvat.js`
   (matkakirjan valokuvataulu) — jos top-level `tiedosto` + `vuosi` +
   `lahde` on jo olemassa kaupungille, se kelpaa sellaisenaan eikä
   uutta hakua tarvita. Alla olevista 12 kaupungista tätä on jo
   kokeiltu eikä ankkuria löytynyt (paitsi Kap Horn, jolla galleria on
   jo tehty — ks. taulukko).
2. **Galleria**: `<kaupungin/kohteen englanninkielinen nimi> painting`
   -tyylinen Commons-haku on JO KOKEILTU kaikille alla luetelluille 58
   kaupungille eikä tuottanut kelvollista tulosta (tai tuotti väärän
   osuman, ks. Campo Grande). ÄLÄ toista samaa hakua — käytä alla
   olevia vaihtoehtoisia termejä ja instituutiolähteitä ensin.
3. Lisenssitarkistus vasta kun kuva on Commonsissa; suoraan
   instituution sivulta ladattu kuva viedään ensin Commonsiin normaalin
   kaavan mukaan, sitten tarkistetaan.

### Avoimen saatavuuden lähteitä (yleiset, valitse per kohde)

- **Rijksmuseum** — Alankomaiden siirtomaa-ajan kuvasto: Bali,
  Sahara-kauppareitit, Länsi-Afrikan rannikko, Mosambik.
- **Library of Congress** (Prints & Photographs Online Catalog) —
  Amerikan kaupungit ja retkikuntavalokuvat: Nome, San Juan, Mount
  Rushmore -alue.
- **Gallica / BnF** — Ranskan siirtomaa-alueet: Sahara (Barth,
  Duveyrier, Caillié -matkakertomukset), Ranskan Guayana (Cayenne),
  Uusi-Kaledonia (Nouméa).
- **Smithsonian Open Access** — retkikuntakuvat maailmanlaajuisesti:
  Galápagos, Machu Picchu, Titicaca, Havaiji.
- **Internet Archive** — 1800-luvun kuvitetut matkakertomukset
  skannattuina, usein PD: Barth ja Nachtigal (Murzuk, Al Kufra, Gao,
  Ahaggar, Tšadjärvi), Livingstone/Stanley/Speke (Tanganjika, Kongo,
  Viktoria Nyanza).
- **Wellcome Collection** — brittiläinen siirtomaa-ajan Afrikka
  (Suakin, Darfur, Bahr el Ghazal, Sierra Leone, Kap Palmas).
- **Trove / State Library of Western Australia, Queensland, South
  Australia, NSW** — Australian sisämaa ja rannikko: Broome,
  Geraldton, Kalgoorlie, Mount Isa, Coober Pedy, Birdsville, Exmouth,
  Nullarbor, Uluru.
- **Biblioteca Nacional Digital Brasil / Brasiliana Fotográfica /
  Instituto Moreira Salles** — Brasilian Amazon ja sisämaa: Santarém,
  Macapá, Porto Velho, João Pessoa (vanha nimi Parahyba), Boa Vista,
  Ilha do Bananal, Campo Grande.
- **Memoria Chilena / Biblioteca Nacional de Chile** — Puerto Montt,
  Robinson Crusoe -saari, San Ambrosio, Kap Horn.
- **Sudan Archive, Durham University** — Suakin, Darfur, Bahr el
  Ghazal.
- **Hudson's Bay Company Archives** — Churchill.
- **National Library of New Zealand / Archives New Zealand** —
  Milford Sound.
- **Getty Museum Open Content** — eurooppalainen 1800-luvun maisema-
  ja orientalistimaalaus: Appalakit (Hudson River School), Sahara.
- **Europeana** — kokoaa useita eurooppalaisia arkistoja yhdestä
  hausta, hyvä ensimmäinen laaja haku.

### Kaupungit — molemmat puuttuvat (11)

| Kaupunki | Maa/alue | Huomio | Kokeiltavat termit/lähteet |
|---|---|---|---|
| Boa Vista | Brasilia, Roraima | Ei valokuvataulua, ei gallerialöytöä | Biblioteca Nacional Digital Brasil, "Boa Vista Roraima" |
| Santarém | Brasilia, Pará | Ei vanhaa kuvaa taulussa | Louis Agassizin Brasilia-matka 1865–66 (Smithsonian/Internet Archive), "Santarém Pará" |
| Exmouth | Australia, Länsi-Australia | Kaupunki perustettu 1960-l. — ennenNyt-pari todennäköisesti mahdoton, merkitse `loytyi: false` jos ei löydy | Galleria: North West Cape -rannikkokartoitus, jos löytyy |
| San Ambrosio | Chile (Desventuradas-saaret) | Asumaton saari — matala löytötodennäköisyys | Memoria Chilena, "Islas Desventuradas", "San Ambrosio Chile" (ei pyhimys Ambrosiusta) |
| Churchill | Kanada, Manitoba | Ei valokuvataulumerkintää | Hudson's Bay Company Archives, "Fort Prince of Wales Churchill" |
| Bananal | Brasilia (Ilha do Bananal) | Sääntö 3: Karajá-alkuperäisväestö, kontekstin oltava selvä | Instituto Moreira Salles, "Ilha do Bananal expedition" |
| Geraldton | Australia, Länsi-Australia | Ei valokuvataulumerkintää | State Library of WA, vanha nimi "Champion Bay" |
| Nullarbor | Australia (tasanko) | Luonnonkohde | Trove, Edward Eyren 1841 -retkikunnan kuvitus, "Nullarbor Plain" |
| Campo Grande | Brasilia, Mato Grosso do Sul | ÄLÄ toista Paraguay-homonyymiä (sääntö 1) | Biblioteca Nacional Digital Brasil, "Campo Grande Mato Grosso do Sul" |
| Nome | Yhdysvallat, Alaska | Kultaryntäys 1899 — valokuvia todennäköisemmin kuin maalauksia | Library of Congress, Alaska State Library, "Nome gold rush 1900" |
| Sahara | (alue) | Ei päivättyä valokuvaa taulussa | Gallica (Barth/Duveyrier), Internet Archive, "Sahara caravan 19th century photograph" — ei geneeristä dyynikuvaa |

### Kaupungit — vain ennenNyt puuttuu (1)

| Kaupunki | Maa/alue | Huomio | Lähteet |
|---|---|---|---|
| Kap Horn | Chile | Galleria jo tehty (PR #3066) | Memoria Chilena, "Cape Horn lighthouse 1900s", laivastoarkistot |

### Kaupungit — vain galleria puuttuu (47)

| Kaupunki | Maa/alue | Huomio | Kokeiltavat termit/lähteet |
|---|---|---|---|
| Angola | Angola (rannikko) | Laaja alue | Rijksmuseum, "Angola Portuguese colonial coast painting" |
| Namib | Namibia | Luonnonkohde | Getty, "Namib desert 19th century expedition illustration" |
| Robinson Crusoe -saari | Chile | Ei Defoen romaanin kuvituksia, vain aito saarikuva | Memoria Chilena, "Juan Fernández Islands Alexander Selkirk" |
| Appalakit | Yhdysvallat | Laaja alue | Getty/LOC, Hudson River School, "Appalachian Mountains landscape painting 19th century" |
| Sierra Leone | Sierra Leone | — | Wellcome Collection, "Freetown Sierra Leone 19th century" |
| Viktoria Nyanza | Tansania/Uganda/Kenia (järvi) | Ei sekoiteta Victoriaputouksiin | Internet Archive (Speke 1858), "Lake Victoria Nyanza Speke" |
| Tanganjika(järvi) | Tansania/DR Kongo raja | — | Internet Archive (Livingstone/Stanley/Burton-Speke), "Lake Tanganyika expedition" |
| Boa Vista | (ks. yllä, tarvitsee myös ennenNytin) | — | — |
| Kap Palmas | Liberia | Ei sekoiteta Hyväntoivonniemeen | LOC, "Cape Palmas Liberia colonization" |
| Kimberley | Etelä-Afrikka | Kohdekartasta jo hylätty (inventaario 5.5) | LOC/British Library, "Kimberley diamond mine Big Hole 19th century" |
| Labrador | Kanada | Laaja alue | LOC, William Bradford -taiteilija, "Labrador coast painting" |
| St. Helena | Iso-Britannia (saari) | Ei pelkkää Napoleon-teemaa ilman saaren aitoa kuvaa | British Library, "Saint Helena Jamestown 19th century" |
| Ahaggar | Algeria | — | Gallica (Duveyrier 1859–61), "Ahaggar Hoggar Tuareg expedition" |
| Gao | Mali | — | Gallica (René Caillié 1830), "Gao Songhai Sahara caravan" |
| Kamerun(vuori) | Kamerun | — | Saksalaiset siirtomaa-arkistot (Bundesarchiv), "Kamerunberg Mount Cameroon 19th century" |
| Suakin | Sudan | — | Sudan Archive Durham, "Suakin Red Sea port 19th century" |
| Cayenne | Ranskan Guayana | Vankileiri-historia herkkä — asiallinen kuva | Gallica, "Cayenne Guyane française 19th century" |
| Darfur | Sudan | — | Sudan Archive Durham, "Darfur Sultanate 19th century" |
| Mosambik(in saari) | Mosambik | Ei sekoiteta Mosambikiin maana | Rijksmuseum/Arquivo Histórico de Moçambique, "Ilha de Moçambique fortress painting" |
| Ras Hafun | Somalia | — | British Library, "Ras Hafun Cape Guardafui 19th century" |
| Tšad-järvi | Tšad/Nigeria/Niger/Kamerun raja | — | Gallica (Nachtigal), "Lake Chad 19th century expedition" |
| Bahr el Ghazal | Etelä-Sudan | — | Sudan Archive Durham, "Bahr el Ghazal 19th century" |
| Broome | Australia, Länsi-Australia | Helmenkalastushistoria | State Library of WA, "Broome pearling lugger 19th century" |
| Ouidah (Orjarannikko) | Benin | Sääntö 3: vain asiallinen, ei sensaatiokuvia | Wellcome/British Library, "Ouidah Whydah Dahomey 19th century" |
| Santarém | (ks. yllä, tarvitsee myös ennenNytin) | — | — |
| Sepik | Papua-Uusi-Guinea | Sääntö 3: alkuperäisväestön kuvat vain selvällä kontekstilla | Smithsonian, "Sepik River German New Guinea expedition" |
| Bananal | (ks. yllä, tarvitsee myös ennenNytin) | — | — |
| Geraldton | (ks. yllä, tarvitsee myös ennenNytin) | — | — |
| João Pessoa | Brasilia | Vanha nimi Parahyba — kokeile molemmilla | Brasiliana Fotográfica, "Parahyba do Norte 19th century" |
| Murzuk | Libya | — | Internet Archive (Barth/Nachtigal), "Murzuk Fezzan Sahara expedition" |
| Al Kufra | Libya | Kohdekartasta jo hylätty (inventaario 5.5) | Internet Archive (Rohlfs 1879), "Kufra oasis expedition" |
| Nullarbor | (ks. yllä, tarvitsee myös ennenNytin) | — | — |
| Campo Grande | (ks. yllä, tarvitsee myös ennenNytin) | — | — |
| Exmouth | (ks. yllä, tarvitsee myös ennenNytin) | — | — |
| Macapá | Brasilia | — | Brasiliana Fotográfica, "Macapá Amapá fort São José" |
| San Ambrosio | (ks. yllä, tarvitsee myös ennenNytin) | — | — |
| Birdsville | Australia, Queensland | Hyvin pieni | State Library of Queensland, "Birdsville track 19th century" |
| Coober Pedy | Australia, Etelä-Australia | Perustettu 1915 — vanhin mahdollinen 1900-l. alku | State Library of South Australia, "Coober Pedy opal mining early 1900s" |
| Kalgoorlie | Australia, Länsi-Australia | — | State Library of WA, "Kalgoorlie gold rush 1890s" |
| Mount Isa | Australia, Queensland | — | State Library of Queensland, "Mount Isa mine early 20th century" |
| Nome | (ks. yllä, tarvitsee myös ennenNytin) | — | — |
| Porto Velho | Brasilia | Madeira–Mamoré-rautatiehistoria | Brasiliana Fotográfica, "Madeira-Mamoré railway Porto Velho" |
| Managua | Nicaragua | — | LOC, "Managua Nicaragua 19th century" |
| San Juan | Puerto Rico | Ei sekoiteta muihin San Juaneihin | LOC, "San Juan Puerto Rico Castillo San Felipe" |
| Nouméa | Uusi-Kaledonia | Rangaistussiirtola-historia | Gallica, "Nouméa Nouvelle-Calédonie 19th century" |
| Puerto Montt | Chile | — | Memoria Chilena, "Puerto Montt colonización alemana" |
| Sahara | (ks. yllä, tarvitsee myös ennenNytin) | — | — |
| Kongo(joki) | DR Kongo/Kongo-Brazzaville | Sääntö 3: Vapaavaltion kuvasto vaatii erityistä harkintaa | Internet Archive (Stanley "Through the Dark Continent"), "Congo River expedition 19th century" |
| Madagaskar | Madagaskar | — | BnF/Gallica, "Madagascar Antananarivo 19th century" |
| Galápagos | Ecuador | — | Smithsonian, "Galápagos Islands 19th century expedition" |
| Machu Picchu | Peru | Vain Hiram Binghamin 1911 jälkeinen tai varhaisempi aluekuvitus | Yale Peabody Museum, "Machu Picchu Bingham 1911" |
| Uluru | Australia | Sääntö 3: vältä pyhää kalliotaidetta, maisemakuva/matkakertomuskuvitus kelpaa | Trove, "Ayers Rock Uluru early expedition" — varo herkkyyttä kuvatekstissä |
| Titicaca(-järvi) | Peru/Bolivia | — | LOC/Smithsonian, "Lake Titicaca 19th century expedition" |
| Mount Rushmore | Yhdysvallat, South Dakota | Veistos alkoi 1927 — hae ALUEEN (Black Hills) maisemaa ennen veistosta | LOC, "Black Hills South Dakota 19th century landscape" |
| Havaiji | Yhdysvallat (oli kuningaskunta 1800-l.) | Runsaasti aikalaiskuvastoa odotettavissa | Bishop Museum/Smithsonian, "Hawaiian Kingdom 19th century painting" |
| Bali | Indonesia | Hollannin siirtomaa-ajan kuvasto todennäköisesti runsas | Rijksmuseum, "Bali Dutch East Indies 19th century painting" |
| Milford Sound | Uusi-Seelanti | — | National Library of NZ, "Milford Sound 19th century painting" |

(Rivit joissa "ks. yllä" viittaavat kohdan "molemmat puuttuvat"
tauluun — kaupunki on listattu vain kerran täydellä tiedolla.)

### Erät

Tee työ neljässä 15 kaupungin erässä (viimeinen 14): järjestys vapaa,
maantieteellinen ryhmittely suositeltavaa (esim. Australian kaupungit
yhdessä, Brasilian Amazon-kaupungit yhdessä), koska sama arkisto
palvelee useaa kohdetta kerrallaan.

### Manifesti

Jokaisesta löydetystä kuvasta oma rivi:
`cityId, tyyppi (galleria/ennenNyt), url, sha256, tavut, mitat,
lahde, tekija, vuosi, lisenssi, attribuutio, kuvateksti-ehdotus`
(kuvateksti-ehdotus YKSI virke, Raamatun kuvatekstisääntö). Kaupungit
joille ei löytynyt mitään: oma rivi `loytyi: false` + lyhyt huomio
mitä kokeiltiin.

### Toimitus

Manifesti + kuittaus tähän postilaatikkoon
(`codex-fable-galleria-ennennyt-...md` tai vastaava). Kytkennän
(js/packs/*.js) tekee Fablen agentti manifestista, ei tarvitse tehdä
itse. Kysymykset tähän tiedostoon tai Fablelle.
