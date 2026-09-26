# Kuvatilaus: galleria ja ennenNyt — luonnos Fablen hyväksyttäväksi

24.9.2026 klo 18.0x. **LUONNOS — ei viety postilaatikkoon.** Tarkoitus:
kuvaputken (Opus) tilauspohja 58 kaupungille ilman galleriaa ja 12
kaupungille ilman ennenNyt-paria (yhteensä 59 eri kaupunkia — 11
tarvitsee molemmat). Pohjana `docs/raportit/sisalto-inventaario-20260924.md`
kohdat 5.5–9 ja `docs/raportit/viesti-sisaltokirjuri-luovutus-20260924-f.md`
kohdat 4.2–4.3.

## 1. Mitä tilataan

- **Galleria** (`galleria: [...]`, ison pop-upin teosgalleria): 1–3
  PD/CC-taideteosta (maalaus, kaiverrus, litografia — aikakauden, ei
  nykytaidetta) jotka **aidosti kuvaavat juuri tätä paikkaa**, ei
  pelkkää aihetta tai teemaa.
- **EnnenNyt** (etusivun pikkurivi): yksi PD/CC-valokuva ennen vuotta
  1960, paikan omalla nykykuvalla parina (nykykuva on jo olemassa
  useimmilla — vain vanha puoli puuttuu).

## 2. Säännöt — mitä EI saa hakea (Fablen linja, inventaario kohta 6, luovutuksen opetukset)

1. **Ei samannimisiä eri paikkoja.** Esimerkki: Campo Granden (Brasilia,
   Mato Grosso do Sul) haku löysi Pedro Américon maalauksen "Batalha de
   Campo Grande" — se kuvaa 1869 taistelua **Paraguayssa**, ei Brasilian
   kaupunkia. Hylätty. Tarkista aina paikannimen lisäksi maa/alue ennen
   kuin kuva hyväksytään.
2. **Ei kuvia jotka eivät aidosti kuvaa kohdetta**, vaikka aihe
   sopisi teemaan (esim. yleinen aavikko- tai viidakkomaalaus, joka ei
   esitä juuri tätä paikkaa nimeltä tai tunnistettavasti).
3. **Kulttuurisesti herkkä kuvamateriaali ilman selvää kontekstia
   jätetään pois.** Precedentti: Uluru-galleriaan löytyi aboriginaalien
   pyhän kalliotaiteen nykyvalokuvia (Dagmar Hollmann) — hylättiin, koska
   kuva on nykyaikainen valokuva pyhästä paikasta ilman riittävää
   kontekstia, ei historiallinen taideteos. Sama varovaisuus koskee
   Sepikiä (Papua-Uusi-Guinea, saksalaisen siirtomaa-ajan kuvasto
   alkuperäisväestöstä), Bananalia (Karajá-alue) ja Kongoa (Vapaavaltion
   ajan kuvasto — ihmisoikeusrikkomusten kuvitusta ei käytetä ilman
   selvää historiallista kontekstia ja asiallista kuvatekstiä).
4. **Vain PD/CC**, tarkistettu `node tools/hae-commons.mjs tiedot
   "File:..."` -komennolla (tekijä + lisenssi + kuvauspäivä/-vuosi).
   Ei API-avainta.
5. **Jos aitoa löytöä ei ole, kenttä jätetään tyhjäksi.** Ei
   pakoteta teemallisesti sopivaa mutta faktisesti väärää kuvaa
   (sama linja kuin galleria-vaiheessa jo sovellettu, yield 3/46).
6. EnnenNyt vaatii **päivätyn tai ajoitettavan** kuvan (arvio "n.
   1900-l." riittää, jos lähde antaa sen); pelkkä "vanhannäköinen"
   ilman mitään ajoitusta ei kelpaa.

## 3. Prosessi ennen uutta Commons-hakua

1. **Galleria:** tarkista ensin, löytyykö kaupungin nimellä tai
   tunnetulla vanhalla nimellä/tapahtumalla aikakauden taideteos
   (esim. retkikuntien matkakertomusten kuvitus — usein PD, ks. kohta
   4). Vasta sen jälkeen yleishaku `hae-commons.mjs haku "<nimi> painting"`.
2. **EnnenNyt:** tarkista ENSIN `js/packs/*-valokuvat.js` (matkakirjan
   valokuvataulu) — jos top-level `tiedosto`+`vuosi`+`lahde` on olemassa,
   se kopioidaan sellaisenaan (ei uutta hakua tarvita). Vasta jos
   taulua ei ole tai se on vain `lisat`-muotoinen ilman ankkuria,
   tehdään Commons-haku pre-1960-valokuvasta.
3. **Jo kokeiltu kaikille tässä listassa** (ei tuottanut tulosta,
   paitsi missä alla erikseen mainittu): `hae-commons.mjs haku
   "<kaupungin/kohteen englanninkielinen nimi> painting"` (galleria)
   ja valokuvataulun/Commons-tarkistus pre-1960-kuvasta (ennenNyt).
   Ei toisteta tätä samaa hakusanaa turhaan — kokeile alla listattuja
   VAIHTOEHTOISIA termejä ja lähteitä ensin.

## 4. Avoimen saatavuuden lähteitä kokeiltavaksi (yleiset, ei kaupunkikohtaisia — Fable/Opus valitsee sopivat per kohde)

- **Rijksmuseum** (rijksmuseum.nl/en/rijksstudio) — Alankomaiden
  siirtomaa-ajan kuvasto: Bali, Sahara-kauppareitit, Länsi-Afrikan
  rannikko.
- **Library of Congress** (loc.gov, Prints & Photographs Online
  Catalog) — Amerikan mantereen kaupungit ja retkikuntavalokuvat
  (Nome/Alaska, Puerto Rico, Mount Rushmore -alueen 1900-luvun alun
  kuvat).
- **Gallica / BnF** (gallica.bnf.fr) — Ranskan siirtomaa-alueet:
  Sahara (Barth, Duveyrier, Caillié -retkikuntien kuvitetut
  matkakertomukset), Ranskan Guayana (Cayenne), Tyynenmeren
  Uusi-Kaledonia (Nouméa).
- **Smithsonian Open Access** (si.edu/openaccess) — luonnontieteelliset
  ja retkikuntakuvat maailmanlaajuisesti (Galápagos, Machu Picchu,
  Titicaca).
- **Internet Archive** (archive.org) — 1800-luvun kuvitetut
  matkakertomukset skannattuina, usein PD: Heinrich Barth ja Gustav
  Nachtigal (Murzuk, Al Kufra, Gao, Ahaggar), David Livingstone ja
  Henry Morton Stanley (Tanganjika, Kongo, Viktoria Nyanza), John Hanning
  Speke (Viktoria Nyanza).
- **Wellcome Collection** (wellcomecollection.org) — brittiläinen
  siirtomaa-ajan Afrikka (Suakin, Darfur, Bahr el Ghazal, Sierra Leone).
- **Trove / State Library of Western Australia, Queensland, South
  Australia, NSW** (trove.nla.gov.au, valtionkirjastojen digikokoelmat)
  — Australian sisämaan ja rannikon pikkukaupungit: Broome, Geraldton,
  Kalgoorlie, Mount Isa, Coober Pedy, Birdsville, Exmouth, Nullarbor.
- **Biblioteca Nacional Digital Brasil / Brasiliana Fotográfica /
  Instituto Moreira Salles** — Brasilian Amazonin ja sisämaan kaupungit:
  Santarém, Macapá, Porto Velho, João Pessoa (vanha nimi Parahyba —
  kokeile molemmilla nimillä), Boa Vista, Ilha do Bananal, Campo Grande.
- **Memoria Chilena / Biblioteca Nacional de Chile** — Puerto Montt,
  Robinson Crusoe -saari (Juan Fernández), San Ambrosio.
- **Sudan Archive, Durham University** — Suakin, Darfur, Bahr el
  Ghazal (brittiläis-egyptiläinen Sudan).
- **Hudson's Bay Company Archives (Manitoba, Kanada)** — Churchill.
- **National Library of New Zealand / Archives New Zealand** —
  Milford Sound.
- **Getty Museum Open Content** (getty.edu) — eurooppalainen
  1800-luvun maisema- ja orientalistimaalaus, jos jokin kohde saa
  tunnetun taidesuunnan käsittelyn (esim. Appalakit/Hudson River
  School -maisemamaalaus, Sahara-orientalismi).
- **Europeana** (europeana.eu) — kokoaa useita eurooppalaisia
  arkistoja yhdestä hausta, hyvä ensimmäinen laaja haku ennen
  yksittäisten arkistojen läpikäyntiä.

Kaikista: tarkista lisenssi `tiedot`-komennolla vasta kun kuva on jo
Commonsissa (Commons-yhteensopivat instituutiolataukset ovat jo
tarkistettuja, mutta suoraan instituution omalta sivulta ladattu kuva
pitää ensin viedä/varmistaa PD/CC Commonsiin normaalin kaavan mukaan).

## 5. Kaupungit — molemmat puuttuvat (galleria + ennenNyt, 11)

| Kaupunki (oikea nimi) | Maa/alue | Erityishuomio | Kokeiltavat lähteet/termit |
|---|---|---|---|
| Boa Vista | Brasilia, Roraima | Ei valokuvataulua eikä gallerialöytöä | Biblioteca Nacional Digital Brasil, "Boa Vista Roraima" (ei muita Boa Vistoja, esim. Kap Verde) |
| Santarém | Brasilia, Pará | Ennennyt: ei vanhaa kuvaa taulussa | Amazon-retkikuntien 1800-l. kuvitus (esim. Louis Agassizin Brasilia-matka 1865–66, Smithsonian/Internet Archive), "Santarém Pará" (ei Santarém Portugalissa) |
| Exmouth | Australia, Länsi-Australia | Kaupunki perustettu vasta 1960-l. — **ei voi olla aitoa pre-1960-valokuvaa**; ennenNyt-pari todennäköisesti mahdoton, harkitse pudotusta listalta | Galleria: North West Cape -alueen 1800-l. rannikkokartoitus/maalaus, jos löytyy |
| San Ambrosio | Chile (Desventuradas-saaret) | Asumaton saari — matala löytöjen todennäköisyys molemmissa | Memoria Chilena, "Islas Desventuradas", "San Ambrosio Chile" (ei sekoiteta pyhimys Ambrosiukseen) |
| Churchill | Kanada, Manitoba | Ei valokuvataulumerkintää | Hudson's Bay Company Archives, "Fort Prince of Wales Churchill", "Churchill Manitoba fur trade" |
| Bananal | Brasilia (Ilha do Bananal) | Ei valokuvataulumerkintää; Karajá-alkuperäisväestön aluetta — kohta 2.3 huomio koskee myös galleriaa | Instituto Moreira Salles, "Ilha do Bananal expedition" — vältä alkuperäisväestön muotokuvia ilman selvää historiallista kontekstia |
| Geraldton | Australia, Länsi-Australia | Ei valokuvataulumerkintää | State Library of Western Australia, "Geraldton Champion Bay" (vanha nimi Champion Bay — kokeile sillä) |
| Nullarbor | Australia (tasanko, ei kaupunki) | Luonnonkohde — mahdollisesti vain maisemakuvia, ei "kaupunkia" | Trove, "Nullarbor Plain exploration", Edward Eyren 1841 retkikunnan kuvitus |
| Campo Grande | Brasilia, Mato Grosso do Sul | **HUOM**: älä toista "Batalha de Campo Grande" -löytöä, se on Paraguay 1869 (kohta 2.1) | Biblioteca Nacional Digital Brasil, "Campo Grande Mato Grosso do Sul" (ei "Campo Grande" Rio de Janeirossa/Lissabonissa) |
| Nome | Yhdysvallat, Alaska | Kultaryntäys 1899 — valokuvia todennäköisesti enemmän kuin maalauksia | Library of Congress, Alaska State Library Digital Collections, "Nome gold rush 1900" |
| Sahara | (alue, ei yksi kaupunki) | Ennennyt: ei päivättyä valokuvaa taulussa | Gallica (Barth/Duveyrier-retkikunnat), Internet Archive, "Sahara caravan 19th century photograph" — vältä geneeristä hiekkadyynikuvaa ilman paikkayhteyttä |

## 6. Kaupungit — vain ennenNyt puuttuu (1)

| Kaupunki | Maa/alue | Huomio | Kokeiltavat lähteet |
|---|---|---|---|
| Kap Horn | Chile (Tierra del Fuego) | Galleria jo tehty (#3066, laivamaalaukset); ennenNyt puuttuu | Memoria Chilena, "Cape Horn lighthouse 1900s", laivastoarkistot (purjelaivakuvat 1800-l. lopulta usein PD) |

## 7. Kaupungit — vain galleria puuttuu (47)

| Kaupunki (oikea nimi) | Maa/alue | Huomio | Kokeiltavat lähteet/termit |
|---|---|---|---|
| Angola | Angola (alue/rannikko) | Laaja alue, ei yksi kaupunki | Rijksmuseum, "Angola Portuguese colonial coast painting" |
| Namib | Namibia (aavikko) | Luonnonkohde | Getty, "Namib desert 19th century expedition illustration" |
| Robinson Crusoe -saari | Chile (Juan Fernándezin saaret) | Ei sekoiteta Defoen romaanin kuvituksiin — vain saaren aito kuvaus kelpaa | Memoria Chilena, "Juan Fernández Islands Alexander Selkirk" |
| Appalakit | Yhdysvallat (vuoristo) | Laaja alue | Getty/LOC, Hudson River School -maisemamaalarit ("Appalachian Mountains landscape painting 19th century") |
| Sierra Leone | Sierra Leone | — | Wellcome Collection, "Freetown Sierra Leone 19th century" |
| Tanganjika(järvi) | Tansania/DR Kongo raja | Ei sekoiteta Tanganjika-nimiseen entiseen siirtomaahan laajemmin | Internet Archive (Livingstone/Stanley/Burton-Speke-retkikunnat), "Lake Tanganyika expedition" |
| Kap Palmas | Liberia | Ei sekoiteta Hyväntoivonniemeen | LOC, "Cape Palmas Liberia colonization" (amerikkalaisten vapautettujen orjien siirtokunta 1834) |
| Kimberley | Etelä-Afrikka | Kohdekartasta jo hylätty (inventaario 5.5) — galleria silti mahdollinen | LOC/British Library, "Kimberley diamond mine Big Hole 19th century" |
| Labrador | Kanada | Laaja alue | LOC, William Bradford -taiteilija (arktiset/Labrador-maisemat 1800-l., usein PD), "Labrador coast painting" |
| St. Helena | Iso-Britannia (saari) | Ei pelkkää Napoleon-teemaa ilman saaren aitoa kuvaa (jo hylätty ohut löytö) | British Library, "Saint Helena Jamestown 19th century" |
| Ahaggar | Algeria (vuoristo) | — | Gallica (Duveyrier-retkikunta 1859–61), "Ahaggar Hoggar Tuareg expedition" |
| Gao | Mali | — | Gallica (René Caillié 1830 -matkakertomus), "Gao Songhai Sahara caravan" |
| Kamerun(vuori) | Kamerun | — | Saksalaiset siirtomaa-arkistot (Bundesarchiv), "Kamerunberg Mount Cameroon 19th century" |
| Suakin | Sudan | — | Sudan Archive Durham, "Suakin Red Sea port 19th century" |
| Viktoria Nyanza | Tansania/Uganda/Kenia (järvi) | Ei sekoiteta Victoriaputouksiin tai muihin Victoria-nimisiin paikkoihin | Internet Archive (Speke 1858 -löytöretki), "Lake Victoria Nyanza Speke" |
| Cayenne | Ranskan Guayana | Vankileiri-historia herkkä aihe — valitse asiallinen, ei sensaatiohakuinen kuva | Gallica, "Cayenne Guyane française 19th century" |
| Darfur | Sudan | Turistiopas jo hylätty konfliktin takia (inventaario 9) — galleria silti mahdollinen historiallisena aiheena | Sudan Archive Durham, "Darfur Sultanate 19th century" |
| Mosambik(in saari) | Mosambik | Ei sekoiteta Mosambikiin maana | Rijksmuseum/Arquivo Histórico de Moçambique, "Ilha de Moçambique fortress painting" |
| Ras Hafun | Somalia | — | British Library, "Ras Hafun Cape Guardafui 19th century" |
| Tšad-järvi | Tšad/Nigeria/Niger/Kamerun raja | — | Gallica (Nachtigal-retkikunta), "Lake Chad 19th century expedition" |
| Bahr el Ghazal | Etelä-Sudan | Turistiopas jo hylätty konfliktin takia — galleria silti mahdollinen | Sudan Archive Durham, "Bahr el Ghazal 19th century" |
| Broome | Australia, Länsi-Australia | Helmenkalastushistoria | State Library of WA, "Broome pearling lugger 19th century" |
| Ouidah (Orjarannikko) | Benin | Erittäin herkkä aihe (orjakauppa) — käytä vain asiallista, historiallista dokumentaatiota, ei sensaatiokuvia | Wellcome Collection/British Library, "Ouidah Whydah Dahomey 19th century" |
| Sepik | Papua-Uusi-Guinea (joki) | Katso kohta 2.3 — alkuperäisväestön kuvat vain selvällä kontekstilla | Smithsonian, "Sepik River German New Guinea expedition" |
| João Pessoa | Brasilia | Vanha nimi **Parahyba** — kokeile molemmilla | Brasiliana Fotográfica, "Parahyba do Norte 19th century" |
| Murzuk | Libya | Turistiopas jo hylätty (Libya, inventaario 9) — galleria silti mahdollinen | Internet Archive (Barth/Nachtigal), "Murzuk Fezzan Sahara expedition" |
| Al Kufra | Libya | Turistiopas jo hylätty — kohdekartasta jo hylätty (inventaario 5.5) | Internet Archive (Rohlfs-retkikunta 1879), "Kufra oasis expedition" |
| Macapá | Brasilia | — | Brasiliana Fotográfica, "Macapá Amapá fort São José" |
| San Ambrosio | (ks. kohta 5, tarvitsee myös ennenNytin) | — | — |
| Birdsville | Australia, Queensland | Hyvin pieni (kohdekartasta jo hylätty koon takia) | State Library of Queensland, "Birdsville track 19th century" |
| Coober Pedy | Australia, Etelä-Australia | Opaalikaivoskaupunki, perustettu 1915 — vanhin mahdollinen kuvasto 1900-luvun alusta | State Library of South Australia, "Coober Pedy opal mining early 1900s" |
| Kalgoorlie | Australia, Länsi-Australia | — | State Library of WA, "Kalgoorlie gold rush 1890s" |
| Mount Isa | Australia, Queensland | — | State Library of Queensland, "Mount Isa mine early 20th century" |
| Porto Velho | Brasilia | Madeira–Mamoré-rautatiehistoria | Brasiliana Fotográfica, "Madeira-Mamoré railway Porto Velho" |
| Managua | Nicaragua | — | LOC, "Managua Nicaragua 19th century" |
| San Juan | Puerto Rico | Ei sekoiteta San Juan Argentiinaan tms. | LOC (Puerto Rico on/oli USA:n hallussa — laaja PD-kokoelma), "San Juan Puerto Rico Castillo San Felipe" |
| Nouméa | Uusi-Kaledonia | Ranskan rangaistussiirtola-historia | Gallica, "Nouméa Nouvelle-Calédonie 19th century" |
| Puerto Montt | Chile | — | Memoria Chilena, "Puerto Montt colonización alemana" |
| Sahara | (ks. kohta 5, tarvitsee myös ennenNytin) | — | — |
| Kongo(joki) | DR Kongo/Kongo-Brazzaville | Katso kohta 2.3 — Vapaavaltion ajan kuvasto vaatii erityistä harkintaa | Internet Archive (Stanley "Through the Dark Continent"), "Congo River expedition 19th century" |
| Madagaskar | Madagaskar | — | BnF/Gallica, "Madagascar Antananarivo 19th century" |
| Galápagos | Ecuador | — | Smithsonian, Darwin-retkikunnan aikalaiskuvitus, "Galápagos Islands 19th century expedition" |
| Machu Picchu | Peru | Vain Hiram Binghamin 1911 "löydön" jälkeinen kuvasto tai varhaisempi aluekuvitus | National Geographic/Yale Peabody Museum arkistot, "Machu Picchu Bingham 1911" |
| Uluru | Australia | Katso kohta 2.3 — vältä pyhää kalliotaidetta; maisemakuva/matkakertomuskuvitus kelpaa | Trove, "Ayers Rock Uluru early expedition" (varo herkkyyttä nimivalinnassa kuvatekstissä) |
| Titicaca(-järvi) | Peru/Bolivia | — | LOC/Smithsonian, "Lake Titicaca 19th century expedition" |
| Mount Rushmore | Yhdysvallat, South Dakota | Veistos alkoi 1927 — hae ALUEEN (Black Hills) maisemamaalausta ennen veistosta, ei veistoksesta itsestään | LOC, "Black Hills South Dakota 19th century landscape" |
| Havaiji | Yhdysvallat (osavaltio, oli kuningaskunta 1800-l.) | Runsaasti aikalaiskuvastoa odotettavissa | Bishop Museum/Smithsonian, "Hawaiian Kingdom 19th century painting" |
| Bali | Indonesia | Hollannin siirtomaa-ajan kuvasto todennäköisesti runsas | Rijksmuseum, "Bali Dutch East Indies 19th century painting" |
| Milford Sound | Uusi-Seelanti | — | National Library of NZ, "Milford Sound 19th century painting" |

## 8. Yhteenveto tilausmäärästä

- 59 eri kaupunkia/kohdetta (11 molemmat, 47 vain galleria, 1 vain
  ennenNyt).
- Odotettu yield aiemman kierroksen perusteella (inventaario kohta 6:
  galleria 3/46 ≈ 6,5 %, kohta 7: ennenNyt 35/46 ≈ 76 % kun
  valokuvataulu on olemassa) — galleria-kierroksesta kannattaa odottaa
  vain muutamia aitoja löytöjä; ennenNytin osalta Exmouth ja
  todennäköisesti San Ambrosio jäävät kokonaan ilman (kohta 5).
- Suositus: aja galleria ensin pienemmissä, maantieteellisesti
  ryhmitellyissä eristä (esim. Australian kaupungit yhdessä, Brasilian
  Amazon-kaupungit yhdessä), koska sama arkisto palvelee useaa
  kohdetta kerrallaan.

## 9. Ei vielä tehty

Tämä on vain tilausluonnos — ei yhtään hakua ole vielä ajettu tämän
dokumentin pohjalta eikä mitään ole viety postilaatikkoon Opukselle.
Odottaa Fablen hyväksyntää tai muutospyyntöjä.
