# Natiivisepän luovutus 5.11.2026 klo 14.08 (konteksti 31 %, pehmeä raja, 7.37)

Korvaa luovutuksen -1348 kohdat "Pariisin kierto" ja "Tekemättä". Sen T7-kohta, "Ei kosketa ilman sanaa" ja -1326:n PT:n sana 2.214 pätevät. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Vuoro aina JU:lta.

## Ensimmäinen työ: KK kumosi täyden kierroksen nykymuodon (14.0x, sanasta sanaan)
"KK: k20 terävällä kartalla kelpaa, näytän sen omistajalle. KUMOAN täyden kierroksen näin: 150° neljässä sekunnissa ei ole hidas. Tavoite: "hitaaseen kiertoon", ja suunnitelman mukaan täysi kehä vain, jos se näyttää hitaalta. Tee kierrosta tasaisen hidas koko matkalla, myös laskeutuessa, ja lopeta pohjoiseen; kaari saa jäädä vajaaksi. Liike ruutusarjana KK:lle ennen lukitusta. Tarkista myös pelaajan polulla, palaako kamera luennan jälkeen Ranskan näkymään."

PT 14.0x: "Tarkista samalla kierron kesto: 2.210:n mukaan kierto loppuu pehmeästi isoisän luennan alkupuolella. Sovita 42 s ja täysi 360° siihen NUI:n ajoituksen kanssa; jos ne eivät sovi yhteen, 2.210 ratkaisee. Muistirajaa ei nosteta tämän takia eikä muistia mitata nyt (2.207, 2.209)." ja "Koekytkimet (siirtymä kamera-ajossa, raja 90) pysyvät vain kokeessa: Macin kuva ei kerro laitteen muistista, joten ne eivät ole ratkaisu ennen päätöstä."

Vastasin KK:lle 14.07 (jonossa, lukemista ei kuitattu): kierto alkaa ja päättyy pohjoiseen, joten vajaa kaari vaatisi kääntymisen takaisin. Suositus: täysi kierros tasaisesti noin 38 s:ssa, noin 9,5°/s koko matkan; jos ruutusarjassa ei näytä hitaalta, vajaa kaari on heilahdus edestakaisin, ja KK sanoo.

### Tehtävä
1. PalloLiikkeet.cs (Assets/Matkakirja/Linssit/Ydin/Kamera/): KiertoOhje, KiertoLasku, KaupunkiKierto. Laskeutumisen spiraali (LaskuKulma 150° / KiertoLaskuS 4 s, huippu noin 70°/s) pois: suuntima sama vakionopeus laskeutumisessa ja kierrossa. Laskeutuminen saa kestää 4 s, vain suuntiman nopeus tasaistuu. Päivitä PalloLiikeTestit.
2. Hiipuminen: nykyinen KaupunkiKierto.Hiivu(12 s) kiihdyttäisi, jos jäljellä on paljon kulmaa (kulma / kesto > nopeus). Nopeus ei saa nousta. Luonnos: kierron kesto mitoitetaan niin, että se päättyy itsestään luennan alkupuolella, ja Hiivu luennan alussa saa vain pehmentää loppua, ei kiihdyttää. Luenta alkoi Macilla 21–28 s zoomauksen alusta, kesto 25,2 s; 38 s on noin puolivälissä. Sormen ja trailerin Ohitan polut (lyhinTie) pysyvät.
3. Pelaajan polku: unity.logissa FRA 1351.9 km tulee luennan jälkeen (kierto2-loki rivi 2621, k35:n ja k40:n välissä, loppukuva k50-loppu näyttää Ranskan). Selvitä koodista, mikä sen laukaisee ja tapahtuuko se pelaajan oikealla polulla (ei testin UusiPeliSaapuen). Laukaisija on koodista tarkistamatta (muisti esikatselu-uusi-peli-palauttaa-kameran).
4. tarkista.sh, cherry-pick koehaaraan, Mac-vuoro JU:lta, ruutusarja: tiheä peräkkäinen sarja (esim. 1 s:n välein kierron ajan), koska liikettä ei ole kukaan nähnyt. Katso itse täysikokoisina, saumat täysikoossa tai rajauksina (PT 14.0x: "ei saumaa koosteessa" ei riitä), sitten polku ja yksi rivi KK:lle, kopio PT:lle (2.214).

## Haarat
- **natiiviseppa/pariisi-kierto-219 ac691e45f** (pohja 99035b765), työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto. Paikallinen, ei pushattu. ac691e45f siirsi KiertoHiivun PeliOhjain.SoitaLuentoon, koska Pariisin luenta soi Saapumisesitys.cs:609:stä SoitaLuentolla eikä SoitaSaapumisluennan kautta, joten hiipuminen ei lauennut (42 s meni kokonaan). Ajamatta. Tarkistus 0 virhettä.
- **Koehaara natiiviseppa/pariisi-kierto-219-koe 9b160d652**, työpuu wt/proto-natiiviseppa-kierto-koe, EI JUNAAN. Pääkierron lisäksi kolme koelisäystä: raja 20 → 90; UusiPeliSaapuen + "uusi-peli … saapuminen" (kopio NUI:n 8cc0a2c68:sta, junaan NUI:n haarasta); SiirtymaEste ilman kierto.Ajossa.
- tarkista.sh muuttaa kolme tyylikirjatiedostoa: git restore Assets/Matkakirja/UI/Resources/MatkakirjaUI/Tyylikirja.uss Assets/Matkakirja/UI/Tyylikirja.cs tyylikirja/tyylikirja.json.

## Ajot ja kuvat (proto-3d/lokit/)
- natiiviseppa-kierto-ea82b8bb5: 640×480-valinta, sumea kierto, merkkikasa. Näytetty KK:lle k20, korvattu.
- natiiviseppa-kierto2-d4f1fe9db (skenaario _tyo/natiiviseppa/aloituslento/skenaario-kierto2.txt): k20 KK:lle ja kopio PT:lle; KK: "kelpaa, näytän sen omistajalle". Täysikoossa katsottu k20 y 100–1620 ja k05-rajaus: ei tasosaumoja, vain rinnevarjon läiskiä. k20:n alaosaa ja muita kuvia ei täysikoossa.
- natiiviseppa-kierto3-9b160d652: pyydetty JU:lta 14.03, ei valmis 14.07. Näyttää hiipumisen vanhalla nopeudella; katso vain, laukeaako se, älä vie KK:lle.

## Opittua
- Merkkikasa vasemmassa yläkulmassa: NostotKartalla laskee paikat Screen-koosta, batchissa 640×480. Arvio, ei todistettu laitteella. ui lentopiilo poistaa merkit Mac-kuvista, mutta traileri ja Ohita jäävät.
- odota-tila Kartta ei käy saapumisen ketjuun; odota "zoomaus alkaa pariisi" ja "zoomaus keskustaan valmis pariisi" (oleta, ei oleta-uusi).
- Mac-kuvien välissä pitkä ruutu noin 1 s (kuvauksen oma), kuvaväli on noin 6,5 s, ei 5 s. Ajat eivät ole laitteen ajat.

## Avoinna
- LAITTEELLA: SiirtymaEste kytkee saumakorjauksen pois kamera-ajossa (kierto.Ajossa) ja kallistuksella ≥ 20° (PT 4.11., muisti). Kierrossa ei siis ole saumakorjausta laitteella. Kerrottu PT:lle: päätös kuvien jälkeen, kierron kallistus alle 20° vai muu. Muistia ei mitata (2.207, 2.209). Älä esitä Macin kuvaa todisteena laitteesta.
- NUI:n osa A voi siirtää luennan alkua. Jos luenta alkaa yli 30 s:n jälkeen, kesto pitää sovittaa; kerrottu PT:lle, yhteisajo tekemättä. NUI:n haara natiivi-ui/pariisi-lento-219 8cc0a2c68.
- Esilataus kierron alueelta, saapumisesityksen Ohita ja sormi trailerin peitteen läpi (NUI), kartan nimet (Hôtel Hyatt Regency) ja nähtävyydet rakennuksina: kuten -1348.
- Louvren pyramidi on pieni sinertävä läiskä (työlista).

## T7 → NAS 2. erä
pid 58484 käynnissä 14.07, lokissa vain ALOITUS 13.28. Monitor kuolee nollauksessa: aseta uudelleen. Muu -1348:n mukaan; ei poistoja ennen PT:n lupaa.
