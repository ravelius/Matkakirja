# Kolme työkalua ennen Lontoota: tehtävänannot (KK 11.11.2026 klo 20.5x)

Omistaja 11.11. klo 19.16 (kortti): "Työkalut ensin" = kolme työkalua ennen Lontoota, Lontoo mittauksena. Pohja:
suunnitelmat/20261110-euroopan-kaupungit-tyonkulku.md. Voimassa: mittasuhde 1:1, ei raivausta (nähtävyys omalle pohjalleen), kaupungit koodilla
(ei uusia Tripo-malleja), puut aineistosta. Nykytila selvitetty koodista ja työkansioista 11.11. (kolme selvitystä, rivit alla).

## Mitä on nyt (lyhyesti)
- Talot: kaksi kopioitua skriptiä (Pariisi `_tyo/natiiviseppa/pariisi-talot/tee-palat.py`, Lontoo `tee-palat-lontoo.py`), rajaukset ja polut
  kovakoodattu, korkeus eri lähteestä (IGN / EA LiDAR), paketointi yhteinen (`tyokalut/talot_paketti.py`). Ketjuttavaa komentoa ei ole.
- Peli tuntee kaupungit kuudessa paikassa erikseen: TaloAlue.cs:9,14,27 (`LontooKoe = la0 > 50`), PariisiKallistus.cs:18,67,
  TaloKerros.cs:285–296, TaloLataus.cs:39, PuuRuudukko.cs:32, Rakennus.cs (hakemiston vaatimus). Piirretty kartta on vain Pariisissa
  (PiirrosKerros.cs, Codexin käsityö); Lontoon maa on elävä kartta.
- Merkkirakennukset: osakirjasto (`Rakentaja`, `Seina`, kuusi Osa*-osaa) on puhdasta C#:ää ilman Unity-riippuvuutta; torni + huippu,
  tukipilari, ruusuikkuna ja kellotorni ovat yhä kunkin mallin sisällä. Kirkko, asema ja palatsi piirtyvät nyt tavallisena laatikkona.
  Talopaketissa (MT02) ei ole tunnisteita, joten tyyppi ja poisto on tehtävä generaattorissa. Sillat ovat jo taulukko (KaupunkiSilta): malli.
- Ajot: skenaariossa ei ole muuttujia eikä silmukoita, nähtävyydet ja odotusajat on kirjoitettu käsin Pariisille (sk-rungon-rajat-1.txt,
  13 kohdetta, 65 kuvaa, 930 s), arkit koottu käsin, "kaupunki ladattu" -riviä ja yhtä mittaririviä ei ole.

## TYÖKALU 1: pohjakomento "uusi kaupunki" (Karttaseppä + Natiiviseppä)
TAVOITE: yksi komento tekee kaupungin pohjan alusta julkaisuvalmiiksi paketiksi, ja kaupungin lisääminen peliin on yksi rivi yhdessä taulussa.
1. KAUPUNKITAULU (yksi totuus, NS + KS): yksi tiedosto (esim. `kaupungit.json`), rivi per kaupunki: id, nimi, rajaus, origo, maan nosto,
   tyyliperhe, talopaketin versio, puutiedosto, onko piirretty kartta, korkeuslähde. Sama tiedosto generaattorille ja pelille. Kaikki kuusi
   kovakoodattua kohtaa pelissä lukevat taulua; `LontooKoe`-tyyppiset ehdot pois. Pariisi ja Lontoo ensimmäiset rivit, käytös ennallaan.
2. KOMENTO (KS): `uusi-kaupunki <id>` ajaa järjestyksessä: OSM-poiminta planeetasta rajauksella → korkeudet → talot (yksi yhteinen
   tee-palat, ei kaupunkikopioita) → paketti → puut (olemassa oleva PUU1-putki: OSM-puut, puurivit, latvusmalli) → kaupungin rivit
   tauluun → mittariyhteenveto. Maasto on jo maailmanlaajuinen; maan pohja on elävä kartta mustetyylillä (kuten Lontoossa). Piirretty kartta
   ei kuulu komentoon. Vettä ei tehdä erikseen, ellei mittariyhteenveto näytä aukkoa.
3. KORKEUS: lähteet tärkeysjärjestyksessä (maan oma aineisto, jos kortissa nimetty → Overture → OSM height → kerrokset × 3,2 + 1 →
   tyyliperheen oletus). Komento tulostaa, mikä osuus taloista tuli mistäkin; jos oletuksen osuus on yli 40 %, rivi "korkeusaineisto heikko".
4. POISTOT ILMAN MASKEJA: komento ottaa poistolistan OSM-tunnisteina (työkalu 2:n tyypitetyt + käsin tehdyt ikonit) ja jättää ne pois
   talomassasta. Uusia kuvamaskeja ei tehdä.
5. TARKISTUKSET, jotka pysäyttävät: palojen eheys (tarkista-palat.py), talomäärä ja koko edelliseen versioon verrattuna, puuttuva ala,
   paketin koko ladattuna ja purettuna sekä arvio muistista Pariisiin verrattuna (Pariisi v16: 219 palaa, 96,6 Mt ladattava, 354,8 Mt purettuna).
NÄYTTÖ: (a) `uusi-kaupunki lontoo` puhtaalta pöydältä: talomäärä ±2 % nykyisestä paketista, sama kuva vakioajon arkissa; (b) `uusi-kaupunki
pariisi`: sama; (c) kuiva-ajo yhdelle kaupungille, jota ei ole koskaan tehty (Wien: ei omaa laseraineistoa, testaa korkeuden varatiet; EI
julkaisua eikä päätös kolmannesta kaupungista); (d) luettelo käsin tehdyistä askelista per ajo (tavoite Lontoossa nolla komennon jälkeen).
EI KUULU: tyyliperheiden ulkoasu (KK:n oma työ kuvin), Montmartren ja Lontoon kummun käsikorjaukset, Pariisin piirretty kartta.

## TYÖKALU 2: merkkirakennusten tyypitys (Karttaseppä + Natiiviseppä; ulkoasu KK:n katseella)
TAVOITE: kirkon tunnistaa kirkoksi, aseman asemaksi ja palatsin palatsiksi 45°:n kulmasta ilman käsin kirjoitettua mallia. Tyyppitalot ovat
hillitympiä kuin ikonit (vähemmän yksityiskohtia, sama kivi), jotta ikonit erottuvat yhä.
1. TYYPITYS (generaattorissa, jossa tunnisteet ovat muistissa): ehdokkaat OSM:stä (building = church, cathedral, chapel, train_station,
   palace; amenity = place_of_worship; myös temppeli, synagoga ja moskeija omana tyyppinään) → jokaiselle pohjan monikulmio, pitkä akseli,
   ala, korkeus, nimi ja wikidata → tyyppi ja kokoluokka säännöillä (ala, sivusuhde, tunnisteet). Pariisissa noin 370 uskonnollista
   rakennusta ja 66 asemaa, Lontoossa noin 1 600 ja 360: säännöt, ei käsityötä.
2. RESEPTI ON DATAA: tulos `merkit-<kaupunki>.json` (tyyppi, pohja, akseli, korkeudet, osien mitat, väri) + poistolista työkalulle 1.
   Käsikorjaukset erillisessä tiedostossa (tyypin vaihto, tornin pää, ohitus); ikoneilla on omat mallinsa ja ne ohitetaan tunnisteella.
3. OIKEA POHJA SÄILYY: seinät nousevat rakennuksen omasta pohjasta räystäälle; tyyppi tuo katon, tornin ja julkisivun. Kirkko: harjakatto
   pitkän akselin suuntaan, torni ja huippu länsipäähän (kuori itään, ellei pohja näytä muuta), pyöreä kuori vain jos pohjassa on.
   Asema: kaareva hallikatto pitkän akselin suuntaan ja julkisivu kelloineen. Palatsi: mansardikatto ja kulmapaviljongit, jos pohja on
   suorakaide. Tornin korkeus tunnisteesta, muuten 1,6–2,2 × laivan korkeus kokoluokan mukaan.
4. YKSI OSAKIRJASTO: puuttuvat osat irrotetaan olemassa olevista malleista yhteisiksi (OsaTorni + huippu: NdTorni, NdFleche, SpTorni;
   OsaTukipilari: NdLentotuki; OsaRuusuikkuna: NdLansiJulkisivu; OsaKellotorni). Tyyppimallit (kirkko, katedraali, kappeli, asema, palatsi)
   kootaan samoista osista. Pythoniin EI tehdä toista osakirjastoa.
5. LEIVONTA ENNALTA (NS): koska kirjasto ei tarvitse Unityä, erillinen komentorivityökalu lukee reseptit ja kirjoittaa valmiit verkot
   samaan palamuotoon kuin talot (MT02, z15-palat) → kulkevat talopaketin mukana samalla latauksella. Pelin aikana ei rakenneta mitään,
   ei uusia piirtokutsuja per rakennus.
NÄYTTÖ: (a) arkki: 12 satunnaista tyypitettyä per tyyppi Pariisista, kuva pelistä | ilmakuva tai valokuva → KK; (b) väärin tyypitettyjen
osuus 30 satunnaisen otoksessa alle 10 %, korjaus ensin säännöillä; (c) vakioajon mittarit ennen | jälkeen (muisti, kolmiot, latausaika);
(d) Lontoo samoilla säännöillä ilman käsikorjauksia → luettelo siitä, mikä jäi väärin.
ENSIN KK:LLE ennen koodia: tyyppimallien luonnoskuvat (kirkko kolmessa kokoluokassa, asema, palatsi) yhdellä arkilla tyyliohjetta
(suunnitelmat/20261110-pariisin-nahtavyydet-tyyliohje.md) vasten.

## TYÖKALU 3: vakioajo (Julkaisija + Natiivi-UI + Natiiviseppä)
TAVOITE: sama ajo mille tahansa kaupungille tuottaa saman arkin, samat mittarit ja yhden yhteenvetorivin; kaupunkeja voi verrata keskenään.
1. YKSI SKENAARIO, KAUPUNKI PARAMETRINA (JU): ei käsin kirjoitettuja nimiä, koordinaatteja eikä sekuntiodotuksia. Kohteet tulevat pelin omasta
   kohdeluettelosta (NUI: komento, joka antaa kaupungin kohteet nimi + paikka; esittelyn napautus toimii jokaisessa taulun kaupungissa).
   Toteutus JU:n valinta (skenaarion muuttujat ja kohdesilmukka ajajassa tai skenaarion generointi), kunhan tiedosto on sama kaikille.
2. VALMIUS LOKISTA (NS): yksi rivi "kaupunki valmis <id> N s" (alku = peli alkaa tai saapuminen, loppu = maa, talot, merkkirakennukset ja
   puut näkymässä ladattu) ja yksi mittaririvi komennolla: tekstuurimuisti, varattu muisti, mono, talopalat ja Mt, näkyvät kolmiot ja
   piirtokutsut (KS:n näkökartion kolmiomittari yhteiseksi). Skenaario odottaa rivejä, ei sekunteja.
3. VAKIOKUVAT: koko kaupunki kaukaa; 45° neljästä ilmansuunnasta; lähin; jokaisesta kohteesta asettunut kuva, 180° ja lähin (kolme kuvaa,
   ei viittä); kuusi satunnaista tyypitettyä merkkirakennusta; kolme tavallista katua läheltä. Mittaririvi kolmessa kohdassa (kaukaa, 45°,
   lähin). Tavoite alle 15 min per kaupunki Macilla; iPad-ajoa ei tehdä tällä (omistaja 12.21: iPad vain valmiille kokonaisuudelle).
4. ARKIN KOKOAJA (JU): yksi skripti kansiosta arkiksi: rivi per kohde, otsikot, yläreunassa latausaika ja muisti; täysikokoinen + 1000 px.
5. JONO JA YHTEENVETO: `jono-vakioajo.zsh <kaupunki> <sha>`; rivi "VAKIOAJO <kaupunki> <sha>: ladattu N s, muistin huippu X Mt, kuvia n/n,
   PUUTE 0" samaan yhteenvetotiedostoon kuin muut ajot.
NÄYTTÖ: sama komento Pariisille ja Lontoolle peräkkäin → kaksi arkkia ja kaksi yhteenvetoriviä KK:lle; Pariisin arkki vastaa nykyistä
13 kohteen arkkia (sama sisältö, ei käsityötä). Tästä tulee kaupunkiarkki, jonka omistaja näkee kaupungin valmistuessa.

TARKENNUKSET 21.1x (oikea kellonaika 20.4x; otsikko säilytetty viittausten takia) (JU:n vastaus, KK:n päätökset):
- Silmukan sijasta sama tiedosto, jossa enintään 25 kohdelohkoa; lohkot syntyvät yhdestä mallilohkosta skriptillä (eivät käsin). NUI:n komento
  "kohde <i>" (lento + napautus + lokirivi "kohde i <nimi>" tai "kohde i puuttuu") ja kuvakulmat asettunut / 180° / lähin ilman
  koordinaatteja. Ajon alkuun lokirivi "kohteita N"; yli 25 kohdetta = PUUTE.
- Satunnaiset kuvat eivät ole satunnaisia ajosta toiseen: KS tuottaa työkalun 1 yhteydessä `vakiokuvat-<kaupunki>.json` (kolme tavallista
  katua nyt, kuusi tyypitettyä merkkirakennusta työkalun 2 jälkeen; paikka, suunta, etäisyys; valinta kaupungin tunnisteesta johdetulla
  kiinteällä siemenellä). NUI:n komento "vakiokuva <i>". Ennen työkalua 2 merkkirakennusten kuusi paikkaa ohitetaan ilman PUUTE-riviä.
- Mittarit ovat Macin lukuja: vertailu vain Mac vastaan Mac (kaupunki kaupunkiin, ennen | jälkeen). Mittaririvi otetaan myös ennen kaupungin
  latausta, ja yhteenvetoon tulee erotus (kaupungin lisä). iPadin muistiraja mitataan erikseen iPad-erässä, ei tällä.
- Kesto: enintään noin 22 min per kaupunki hyväksytty. Vakioajo ajetaan työkalun tai kaupunkipaketin muuttuessa ja ennen kaupungin
  valmis-korttia, ei jokaiselle versiolle.

TARKENNUKSET 21.2x (oikea kellonaika 20.4x; otsikko säilytetty viittausten takia) (KS:n vastaus työkaluihin 1 ja 2, KK:n päätökset):
- Pariisin vanhat maskit, korvaus- ja siisti-tiedostot jäävät Pariisin rivin vanhaksi syötteeksi (yleinen syöte, ei "jos pariisi" -haaraa
  koodissa); uusia maskeja ei tehdä. Näyttö Pariisille ja Lontoolle: yhteisen skriptin paketti tavulleen sama kuin nykyinen; erot lueteltuna.
  Pariisin maskien muunto poistolistaksi vasta Lontoon jälkeen ja vain KK:n sanalla (lukitut talot muuttuisivat).
- OSM: ei koko Euroopan otetta, vaan YKSI läpikäynti planeetasta, joka kirjoittaa otteen jokaisesta Euroopan pelikaupungista (noin
  16 × 16 km keskustan ympäriltä; talot, puut ja puurivit, uskonnolliset rakennukset, asemat, palatsit, vesi). Kaupunkilista pelin
  kaupunkiluettelosta. Otteet sisäiselle levylle; koko arvioidaan ensin kolmesta kaupungista. Planeetta pysyy T7:llä, kunnes otteet on tehty.
- Korkeus: Wienin kuiva-ajo ilman maan omaa aineistoa (testaa varatiet ja varoitusrivin). Sen rinnalla KS selvittää yhden Euroopan
  laajuisen korkeusaineiston (esim. EUBUCCO) kattavuuden ja lisenssin; pysyvän latausluvan (CC0, CC BY, PD) ulkopuolinen lisenssi → KK:lle.
- Tyyppitalojen kolmiokatot: pieni enintään noin 400, keskikokoinen 900, suuri 1 500; kaupungin summa ja paketin kasvu raporttiin, vakioajon
  mittarit ennen | jälkeen. Osien irrotus ei saa muuttaa ikoneita: testi = ikonien verkot tavulleen samat ennen ja jälkeen.
- Luonnoskuvat ilman Mac-jonoa (kirjasto komentorivillä → OBJ → Blender) hyväksytty MUODON arviointiin: tasavärit, neutraali valo,
  45° ja edestä, mittakaavaksi tavallinen talo viereen. Lopullinen ulkoasu arvioidaan pelistä vakioajon arkista.

TARKENNUKSET NS (11.11. klo 20.5x; NS:n vastaus _tyo/natiiviseppa/tyokalut/vastaus-kk-ennen-aloitusta.md, KK:n päätökset):
- "Kaupunki valmis" = kameran nykyisen näkymän tarvitsema maa, talot, merkkirakennukset ja puut ladattu (kolme valmiustietoa + yhdistäjä).
  Rivi pyynnöstä komennolla; aikaraja 120 s → "kaupunki EI valmis <id> 120 s (kesken: …)" = PUUTE. Rivissä aika pyynnöstä ja kaupungin alusta.
- Kolmiot ja piirtokutsut KS:n PiirtoTilastosta yhteiseksi; piirtokutsut vain editorissa ja kehityskäännöksessä riittää (vakioajo on Macilla).
- Kaupunkitaulu: yhdeksän kohtaa (kaksi NUI:n alueella, NUI lukee samaa taulua). Kolme rajausta (talot, kyltit, kamera), joista kyltit ja
  kamera ovat oletuksena sama kuin talot, jos riviltä puuttuvat. Kenttä tila = koe | julkaistu kertoo vain näkyvyyden; muut erot (maan nosto
  ym.) omina kenttinään, ei piilossa tilan takana. Vanhat poistotaulukot nimiviitteenä Pariisille ja Lontoolle; uusilla kaupungeilla poistot
  tulevat generaattorin poistolistasta eikä uusia C#-taulukoita tehdä. Taulu pelin sisällä (uusi kaupunki = uusi versio), sama tiedosto
  generaattorin luettavana. Taulu korvaa PuuRuudukon 35 kaupungin taulun; testi: samat puutiedostot samoille 35 kaupungille kuin ennen.
- Näyttö taululle: Pariisi ja Lontoo käyttäytyvät tavulleen ja kuvalleen kuten ennen (vakioajon arkki ennen | jälkeen, talopalojen määrä).

## Järjestys ja työnjako (PT jakaa)
A. HETI RINNAKKAIN: työkalu 3 (JU + NUI + NS:n kaksi lokiriviä), koska se toimii jo Pariisilla ja antaa lähtötason mittarit; työkalun 1
   kaupunkitaulu (NS) ja yhteinen tee-palat (KS).
B. SITTEN: työkalun 1 komento ja näytöt a–d; työkalun 2 luonnoskuvat KK:lle → osien irrotus → tyypitys → leivonta.
C. LONTOO MITTAUKSENA: kun kolme työkalua toimivat, Lontoo ajetaan niillä alusta ja lasketaan käsin tehdyt asiat (tavoite: vain kaupunkikortti
   ja ikonit ovat käsityötä). Tulos omistajalle arkkina.
Pariisin lukittu loppulista kulkee edellä: jos sama rooli tarvitaan molempiin, loppulista ensin.
Jokainen rooli vastaa ennen aloitusta yhdellä viestillä: mikä tässä on mahdotonta tai kalliimpaa kuin miltä näyttää. Poikkeus tai rajaus
on ehdotus KK:lle, ei päätös.
