# Peking PT325–331: pelipalautteen vastaanotto ja seuraavan paketin suunnitelma

Tämä on palautteen käsittely ja suunnitelma. Uutta mallia, tekstuurigenerointia, vientipakettia tai peli-/julkaisumuutosta ei käynnistetty. Valosepän viestin mukaan Pekingin seuraavan paketin ajoitus sovitaan PT:n kanssa Raamattu-keskityksen vuoksi. Kyse on vastaanotetusta koordinointirajasta; käyttäjän koko laatutavoitetta ei kuitata valmiiksi tai käyttäjän itsensä keskeyttämäksi.

## Lähde ja tarkistettu näyttö

Luin kokonaan `posti/valoseppa-codex-peking284-lentotesti-ja-native51-20261015.md`, commit `fbe7d644a4e9bbbea7d80d897af0a096850167be`, blob-SHA1 `87583829f13125b1fbd5a204cac3752d96e297e5`. Commit kuuluu luettuun postilaatikkohaaraan. Kopioiden tavut vastaavat täsmälleen commitia.

Katsoin henkilökohtaisesti kaikki kolme toimitettua JPG-kuvaparia. Niiden todellinen koko on 2400 × 1595; viestin 2064 × 2752 tarkoittaa ilmoitettua simulaattorin alkuperäistä ruutukokoa, jota näistä pienennetyistä vertailuista ei varmenneta. Kuvien SHA256:t:

- alku: `45b4d522172393179f74fed25c660f498ac82339928b2d323de1a8a72634089a`
- 30 s: `5cc2aa4fe1da6638d73484720dc6b17d4363dc4f0d406b2333f37ba2302329ec`
- päivä/ilta: `471c73199b93eb69a6e3029c46df38c1ca7eb44dc1895f0f06a792414cf78ea7`

Valoseppä raportoi 72 GLB:n muunnoksen 24 tilesetiksi ja KTX2:ksi, nolla paketointivirhettä ja rajatun kehittäjäkytkimen takana toimivan simulaattorilatauksen. Näitä loki- ja paketointituloksia ei ajettu tässä uudelleen. Kuvissa omat rakennukset näkyvät pelissä; sijainti näyttää uskottavalta, mutta kuvavertailu ei ole uusi korkeusmittaus. V2-geometria on native50:tä. Native51:n PT304-muutos hyväksytään erikseen sen neutraalien kuvien perusteella; se ei vielä sisälly pelivientiin.

Kaksi lentoa ja kuvakulmaero estävät tarkan pikselikohdistetun Ion/oma-mittauksen. Pysäytyskuvat eivät todenna liikkuvaa LOD-vaihtoa, sekatarkkuuksisia laattasaumoja tai laitteen FPS-/muistitasoa. Näissä kuvissa vesi on Ionin oma, joten oma vesipohja tai oma vesitehoste ei saa uutta toimivuuskuittausta. Valosepän ilmoittama 145 Mt KTX2-koko on raporttitieto, ei tässä luettu binäärisumma.

## Seuraavan paketin järjestys

1. **Palatsialueen oma maa ja Ionin peittävä rajaus.** Kuvissa Ionin ilmakuvan vanhat varjot ja pintakuvio näkyvät omien rakennusten alla. Ensin selvitetään olemassa olevien omien päällysteiden ja kolmiportaisten terassien näkyvyys/peittyminen: nykyinen GLB sisältää jo näitä geometrioita, joten ei lisätä sokkona päällekkäistä terassia. Tämän jälkeen suunnitellaan tarvittava oma maakerros ja omiin lähderajoihin perustuva leikkauspolygoni muurien/vallihaudan sisäpuolelle; aukio arvioidaan erikseen. Hutongien ja taustan maa säilyy vastaanottajan ehdotuksen mukaan Ionilla. Leikkauspolygonin koordinaatteja ei vielä tuotettu.
2. **Puiden albedo ja normaalien molemmat puolet.** Tarkistetaan ensin todellinen viety albedo, alfa, sRGB/lineaarinen tulkinta ja KTX2-siirtoketju. Tavoite 0,10–0,14 lineaarisena on palautteessa pyydetty suunta, ei vielä valittu kerroin. Käyttämättömän läpinäkyvän taustan pois sulkevan alkuperäisen puuatlaksen keskiarvo on lineaarisesti noin [0,1874;0,2447;0,1255]; tämä tukee albedon tutkimista, mutta ei ole pelipikselin mittaus. Tarkistetaan etu-/takapinnan normaalin kääntö, kotangenttiperusta ja skaalabinien kompensaatio yhdessä pelin shaderin kanssa. Pelkkää pintakuvien tummentamista ei valita ennen tämän ketjun erottelua. Alkuperäisiä RGB-kuvia ei ylikirjoiteta.
3. **Taustatalojen sävy.** Suunnitellaan lämpimämpi ja 10–15 % tummempi materiaalivaste rajatuille moderneille taustataloille. Lähdekorkeudet, jalanjäljet, palatsin materiaalit ja hyväksytty aukion kiveys säilyvät. Tämä on vastaanotettu sävytoive, ei vielä toteutettu muutos.
4. **Native51:n hyväksytyt massat seuraavaan vientiin.** Kansallismuseon relation/8607825 ja kansantalon relation/8848388 PT304-muutos hyväksyttiin sellaisenaan. Sisällytetään ne myöhempään ajoitettuun pakettiin. Etualan Maon muistohalli relation/8848142 saa suunnitelmassa saman sokkelikaistan ja enintään 5 % muita vaaleamman ilmeen. Vertailuperuste valitaan samassa valaistuksessa; materiaalikertoimen prosenttia ei sekoiteta valmiin PNG:n prosenttiin. Obeliski relation/8847722 saa jäädä vaaleaksi.

### Korkeusvaatimuksen avoin kohta

Valoseppä pyytää oman maakerroksen pinnan vähintään 0,3 m Ionin pinnan yläpuolelle. Tätä ehtoa ei ole mitattu tai ratkaistu tässä. Omat lähdekorkeudet, DEM ja 37,9 m ellipsoidiorigo säilyvät; Ionista ei keksitä lähdemittausta eikä rakennuksia nosteta tämän toiveen perusteella. Suunnitelmassa erotetaan mahdollinen tekninen pintasiirto lähdekorkeudesta ja varmennetaan peitto/leikkaus pelin puolella. Vaatimuksen yhteensopivuus lähde- ja korkeusrajan kanssa jää ennen toteutusta ratkaistavaksi.

### Kohteiden nimet kuvakulmassa

Jäädytetyn aukiokameran lähdegeometrian projektio varmistaa Maon massan etuvasemmalle, kansantalon takavasemmalle ja museon oikeaan reunaan. Joissakin aiemmissa kuvakatselmuksissa museon ja kansantalon kuvapuolien nimet olivat ristissä. Toteutus valitsi oikeat kaksi lähde-ID:tä ja muutti molemmat; niiden geometria tai hyväksyntä ei tästä muutu. Jatkossa kohdistus tehdään lähde-ID:llä.

## Lukitut ja erilliset vastuut

- Päiväkullan PT303-sävy säilyy lukittuna. Iltavalon oliivisävy on Valosepän pelivalon korjaus, ei mallin uussäätö.
- Ionin maan piilotus oman maakerroksen alta ja pelin iltavalo kuuluvat Valosepälle. Codex toimittaa myöhemmin vain oman aineiston ja rajauspolygonin.
- Aiemmat v1/v2- ja native51-toimitukset, alkuperäiset kuvat ja niiden auditit säilyvät muuttumattomina. Ei vanhojen pakettien uudelleentuotantoa, main-yhdistämistä tai julkaisua.
- Aiempi pihojen ovi-/ikkunarytmin source52-suunnitelma ja muuttamaton native51-raakadatan luku säilyvät valmisteluina. Niistä ei syntynyt native52-mallia. Niiden toteutus ei ohita nyt raportoitua maa–puut–taustatalot–massat-järjestystä tai PT:n ajoitusta.

Koko kaupungin korkea laatutavoite on edelleen avoin. Seuraavan mallin tai vientipaketin ajankohtaa ei aseteta tämän vastaanottokirjauksen perusteella.
