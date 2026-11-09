# Pariisin nostot: voiko 3D-kohteen tehdä ohjelmalla? (Karttaseppä 9.11.2026 klo 09.20)

Tilaus: OMISTAJAN PÄÄTÖS 09.10 ("Selvitetäänkö jokaisesta Pariisin nostosta, voiko sen 3D-kohteen tehdä ohjelmalla?" = "Kyllä"), PT:n tehtävänanto. Tämä on pelkkä selvitys. Mitään ei rakenneta ennen kuin KK on näyttänyt tuloksen omistajalle.

## Lyhyesti
- **Pariisin nostovalikossa on 45 riviä** (pelin oma sääntö, sama kuin `KaupunkiNostot.Hae`: 28 karttanostoa 12 km:n säteeltä ja 17 tarinakohdetta). 11 tarinakohdetta on saman aiheen kaksoisrivejä, joten eri aiheita on 34.
- **Ryhmät (45 riviä):**
  - 1) talo tai rakennelma on olemassa: **2**
  - 2) kadonnut rakennus: **10**
  - 3) tapahtuma tai ihminen: **33**. Talo on tiedossa ja olemassa 25 rivillä, talo on kadonnut 2 rivillä, yhteys on epävarma 1 rivillä, ja 5 riviltä taloa ei ole.
- **OhjelmaKohteet voi piirtää suoraan 7 nostojen taloa.** Näistä löytyvät valmiina OSM-pohja, IGN:n korkeus ja yksiselitteinen yhteys nostoon: Institut de France, Opéra-Comique, Grande Rotonde, Palais de Justice, Institut national des jeunes aveugles, École normale supérieure ja Grand Café (Hôtel Scribe).
  - Lisäksi 5 taloa onnistuu, kun yksi asia on ensin tarkistettu (korkeus, OSM-tunniste tai aineisto).
  - Nähtävyyksistä 3 onnistuu suoraan: Musée d'Orsay, Palais du Luxembourg ja Place des Vosges.
  - Kadonneet rakennukset (9 eri rakennusta ja Curien hangaari) vaativat muodon päättelyä lähteistä. Valokuvia ja piirroksia löytyy useimmista runsaasti, mutta mittoja ei ole vielä kerätty.
- Eiffel, Louvre ja Notre-Dame, joihin moni nosto liittyy, ovat jo pelissä liioiteltuina 3D-malleina. Niitä ei kannata tehdä ohjelmalla uudelleen (omistaja 5.11. 21.49: vain tärkeimmät nähtävyydet liioitellaan).

## Mitä "ohjelmalla" tarkoittaa
OhjelmaKohteet (Hôtel de Ville, sillat, Madeleine, Pompidou jne.) on käsin kirjoitettu koodimalli jokaisesta rakennuksesta oikeissa metreissä. Malli tarvitsee pohjan muodon ja paikan (OSM), korkeuden (IGN BD TOPO) ja julkisivun päämuodot (valokuvat). "Suoraan" tarkoittaa tässä, että paikka, pohja ja korkeus ovat jo koneella. Jokainen talo on silti oma työnsä.

## Aineisto ja menetelmä
- Nostot: Mac-esikatselun sisältöpaketti v1024 (julkaistu 9.11. 05.02), kokoelmat karttavalot ja kohdekartat. Sääntö on luettu tiedostosta `KaupunkiNostot.cs` (juna 223). Laskettu tulos on täsmälleen 45.
- OSM: Natiivisepän `pariisi-talot/osm.json` (Île-de-France-ote). IGN: BD TOPO -rakennukset koko Pariisista (`pariisi-talot/ign/`, Licence Ouverte 2.0). Korkeus on rakennuksen suurimman osan `hauteur` ja suurin osa (max).
- Kadonneet: Commons-luokan tiedostomäärä Wikidatan kautta (vain rajapinnoista). Bastiljin haku jäi kesken pyyntörajoituksen vuoksi.
- Skriptit: `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/nostot-ohjelmakohteet-20261109/` (laske.py, talot.py, etsi.py, lahteet.py).

## Ryhmä 1: talo tai rakennelma on olemassa (2)
1. Métropolitain (Guimardin metron sisäänkäynti, Abbesses): rakennelma on olemassa. OSM:ssä se ei ole talo, joten mitat on otettava valokuvista. Pieni ja ohjelmalla helppo.
2. Bouquinistes (Seinen rantojen kirjalaatikot): laatikot ovat olemassa, mutta OSM:ssä ne eivät ole taloja. Toistuva yksinkertainen muoto, ohjelmalla helppo; paikat haettava erikseen.

## Ryhmä 2: kadonnut rakennus (10 riviä, 9 rakennusta)
Lähde, josta muodon voi päätellä: Commons-luokka (tiedostoja / alaluokkia). Sisältöä ei ole vielä käyty läpi.
1. Tuileries'n palatsi (kohde ja syvennys Tuileries, 2 riviä): Commons "Palais des Tuileries" 20 / 15.
2. Bastilji: Commons ei haettu (rajoitus).
3. Grand Châtelet: Commons "Grand Châtelet" 60 / 2.
4. Temple-torni: Commons "Temple (Paris)" 3 / 6; myös "Maison du Temple (Paris)" 20 / 3. Kuvia vähän.
5. Palais d'Orsay: Commons "Palais d'Orsay" 40 / 2.
6. Palais de l'Industrie: Commons 172 / 6.
7. Trocadéron palatsi: Commons 102 / 10.
8. Galerie des Machines: Commons "Galerie des Machines de l'Exposition Universelle (1889)" 77 / 8.
9. Les Hallesin hallit: Commons "Les Halles de Paris" 92 / 22.
Arvio: Palais de l'Industrie, Trocadéro, Galerie des Machines, Les Halles ja Tuileries ovat kuvien määrän perusteella parhaita. Temple-torni on heikoin.

## Ryhmä 3: tapahtuma tai ihminen (33 riviä)
Talo, OSM-tunnus, IGN-korkeus (suurin osa / max). Tähdellä (*) merkityt ovat tarinakohteiden kaksoisrivejä, joilla on sama talo.
1. Mona Lisan varkaus: Louvre, relation/3262297, 30,2 / 43,4 m. Jo 3D-mallina.
2. Vrain-Lucas, skandaali ja tarina*: Institut de France (tiedeakatemia), relation/967665, 15,6 / 30,5 m. **Suoraan.**
3. Torni romuraudaksi, nosto ja tarina*: Eiffel-torni, way/5013364, IGN 286,4 m (OSM 330). Jo 3D-mallina.
4. Kirahvi, nosto ja tarina*: Jardin des Plantes, Grande Rotonde, way/42332625, 10,6 m. **Suoraan**, mutta oliko rotunda juuri kirahvin talo, on tarkistettava.
5. Carmenin ensi-ilta, nosto ja tarina*: Opéra-Comique (nykyinen Salle Favart samalla paikalla; ensi-illan talo paloi 1887), way/54572719, 24,0 m. **Suoraan.**
6. 72 nimeä, nosto ja tarina*: Eiffel-torni. Jo 3D-mallina.
7. Notre-Damen kukko, nosto ja tarina*: Notre-Dame, way/201611261, 34,9 / 66,0 m. Jo 3D-mallina.
8. Paras patonki, nosto ja tarina*: Élysée-palatsi, relation/1060803. IGN-korkeus puuttuu, OSM ilmoittaa 12 m. Ehdolla: korkeus selvitettävä.
9. Pariisi soi, nosto ja tarina*: ei taloa (tarina kaduilla; piste on Opéralla, joka on jo 3D-mallina).
10. Pariisin vuosisadat, nosto ja tarina*: osittain. Kaulanauhan oikeudenkäynti Palais de Justicessa (relation/536982, 23,4 m) ja Vrain-Lucas Institut'ssa; piste on Panthéonilla.
11. Impressionistit, syvennys ja tarina*: Nadarin ateljee, 35 bd des Capucines. Piste osuu taloon way/54730665 (19,6 m), mutta osoitetta ei voitu varmistaa aineistosta. Ehdolla.
12. Kyyhkyposti, syvennys ja tarina*: ei yhtä taloa (piste kaupungin keskipisteessä).
13. Braillen pisteet: Institut national des jeunes aveugles, 56 bd des Invalides, way/68900156 (Wikidata Q22924651), 17,4 m. **Suoraan.** Piste on kaupungin keskipisteessä, ei talolla.
14. Joseph Meister: Institut Pasteur. Pisteessä on pieni sivurakennus (way/80266059, 4,1 m); historiallisen päätalon OSM-tunnistetta ei löytynyt nimellä. Ehdolla.
15. Tour 1903: ei Pariisin taloa (lähtö Montgeronista kartan ulkopuolelta).
16. Roland Garros: Stade Roland-Garros 7,8 km:n päässä, OSM- ja IGN-otteen ulkopuolella. Ehdolla: tunniste haettava.
17. Curie 1898 (hetki): hangaari, jossa radium löydettiin, on purettu = kadonnut. Valokuvia on, mittoja ei ole haettu.
18. Lavoisier 1780 (hetki): Arsenal. Laboratorion talon säilymistä ei ole tarkistettu; lähin olemassa oleva on Bibliothèque de l'Arsenal, way/56217774, 14,1 / 18,5 m. Epävarma.
19. Pasteur 1862 (hetki): École normale supérieure, 45 rue d'Ulm, relation/4057561, 19,3 m. **Suoraan.**
20. Torni 1888 (hetki): Eiffel-torni. Jo 3D-mallina.
21. Bastilji 1789 (hetki): Bastilji = kadonnut (ryhmä 2).
22. Lumière 1895 (hetki): Grand Café, 14 bd des Capucines (Hôtel Scribe), relation/1085372, 25,6 m. **Suoraan.** Ensimmäisen näytöksen sali on talon sisällä; ulkoa näkyy kortteli.

## Nähtävyydet erikseen (kohdekartan 21 kohdetta kartalla; 17 muuta on yllä tarinakohteina)
- Jo 3D-mallina (7): Eiffel-torni, Riemukaari, Louvre, Sacré-Cœur, Panthéon, Notre-Dame, Palais Garnier.
- Jo ohjelmakohteena (1): Concorden aukio.
- **Ohjelmalla suoraan (3):**
  - Musée d'Orsay (way/63178753, 24,4 m; OSM 35 m)
  - Palais du Luxembourg (puiston palatsi, relation/975955, 21,4 m)
  - Place des Vosges (36 paviljonkia; esim. Pavillon du Roi way/49734499, 14,9 m)
- Pieni rakennelma valokuvista (1): metron sisäänkäynti (sama kuin ryhmän 1 kohta 1).
- Kadonneet (9): ryhmä 2.

## Avoimet kohdat ennen rakentamista
- Kirahvin talo (Grande Rotonde), Nadarin osoite, Institut Pasteurin päätalo ja Élysée'n korkeus on tarkistettava.
- Stade Roland-Garros on rajattava aineiston ulkopuolelta.
- Bastiljin lähteet ja kaikkien kadonneiden mitat on kerättävä lähteistä.
- Moni nosto on piste kaupungin keskellä (Braille, Kyyhkyposti, Tour 1903). Jos talo rakennetaan, nosto pitää siirtää talolle; se on erillinen päätös.
