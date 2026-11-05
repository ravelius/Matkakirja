# Natiivisepän luovutus 5.11.2026 klo 21.01 (konteksti 33 %, 7.37)

Korvaa -2026:n. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Cron "4 9 * * *" unity-julkaisut.py uudelleen (nollaus vie sen; Raamattu 7.41).

## Seuraava työ: OMISTAJAN PÄÄTÖS 21.02 (KK:n välittämä, Raamattu 7.1)
Kortti "Saako aloituskaupungissa olla isoisän luento?" = "Ei luentoa (Suositus)"; kortissa: "Pulu aloittaa heti, kuten päätit 15.10."
KK: 2.161:n kohta 2 kaikkiin aloituskaupunkeihin (17.10:n sivuvaikutus pois), myös muihin kuin Pariisiin. 08a0ec8ea:n Pariisin ratkaisu pysyy. Pariisin ruutusarja → KK (lähetetty 21.0x, kuittausta ei vielä); junaan vain PT:n kautta. Tuileries'n kuva ei nouse aloittavalle (omistajalle kerrottu).
EI ALOITETTU: kova kontekstiraja 35 % tuli samaan aikaan.
Suunnitelma (koodista, ei ajettu), haaraan natiiviseppa/pariisi-aloitus-219:
1. LivianPaljastus.IlmanIsoisaa: ehto tosi jokaisessa aloituskaupungissa, IsoisanUni.Kaytossa pois tästä ehdosta. Unen kytkin jää koskemaan vain unta (Aloitusnakyma), omistajan 17.10. päätös ei muutu. Alkuosa ajetaan vain aloituslennon saapumisesta, joten muut saapumiset eivät muutu.
2. Tarkista Pulun Testi(): se valitsee sarjan kytkimellä. Poista kuolleet Alku/Loppu-sarjat vain, jos mikään ei niitä enää käytä (VapautaLuenta, Loppuosa).
3. Tarkista aloitusintron reitti (Ateena, Tukholma, Kööpenhamina): Paattyi → Alkuosa → IlmanLuentaa → PuluValmis. Tarkista myös merkintä: Saapumisesitys.KirjoitaIlmanLuentoa kirjoittaa sen näissä kaupungeissa, mutta 2.161 sanoo ensimmäisen matkakirjatekstin tulevan vasta seuraavassa kaupungissa. Pariisissa merkintä on jo pois. Sama ratkaisu tai rivi KK:lle.
4. Päivitä kommentit, joissa lukee "luenta soi Pulun jälkeen" (KaupunkiIntro, Saapumisesitys, LivianPaljastus). Testi Ydin-kerrokseen vain, jos ehto siirtyy sinne.
5. Testit kuten aiemmin; tarkista.sh muuttaa tyylikirjan kolme tiedostoa: git restore ennen committia. Valovahti-rivit eivät ole omasta muutoksesta.
6. JU-pyyntö: `ui aloita ateena lento`, pohja sk-aloituslento.txt (odota 60 mukana). Oleta "livia: aloituskaupunki ilman isoisän luentaa" ja ei "isoisän luenta esittelyn jälkeen alkaa". Tulos KK:lle, rivi PT:lle.

## Tila
Pariisin aloittavan pelaajan aloituslento on tehty ja nähty oikealla reitillä Macilla. Tulos ja 45°:n tulos ovat KK:lla ja rivi PT:llä. Ei junaan ilman PT:tä.

## Haara
natiiviseppa/pariisi-aloitus-219, kärki 08a0ec8ea, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, puhdas, peili natiivi-backup peili/proto/natiiviseppa/pariisi-aloitus-219. Sisältää: d369d4aab peruttuna, 379991bd6 (kierto) yhdistettynä (0a961dfdd), KaupunkiIntro.AlkulennollaTraileri ja AloituslennonTraileri. Liiku (99748962f) ei ole tässä. JU:n runko-219 94f7eb0e4:ssä ei ole tätä.
Testit: Linssit 538/538, Kartta LiikeLaatat 8/8; käännös JU:n ajossa ok. iPadilla ei ajettu.

## Mitä koodi tekee
Pariisin alkulennolla ei 18 s:n introa. Traileri: 5 kuvaa, puhe = William (ei isoisän saapumispuhe), nimi odottaa Williamin loppua. Sitten Saapumisesitys.AloituslentoPerilla: ei esitystä, isoisän kuvaa, luentaa eikä merkintää; nopea väistyy kaupungin kappaleelle; LivianPaljastus.IlmanIsoisaa: Pulun UniSarja. Kierron kesto ennallaan (KokoS 38 s), ei omaa ajastusta. Uudelleenkäynti Pariisiin ja muut kaupungit ennallaan.

## Ajot
- lokit/natiiviseppa-pariisi-aloitus-08a0ec8ea-2: traileri 21,03 s, Pulu noin 2 s jälkeen, kierto loppui 11,6 s trailerin lopusta. (Ensimmäinen kansio ilman -2:ta epäonnistui: ui-komento ennen sisällön latausta.)
- lokit/natiiviseppa-kartta45-08a0ec8ea: b = Macin valinta, l = iPadin kaltainen (`maasto siirtyma 5 0 30` + `maasto siirtyma kallistus 90`). Vaakasauma on Macin harha. Pystysauma Tuileries'n pohjoispuolella on todellinen vika: kadut katkeavat kummallakin valinnalla (rajaus-pystysauma-b-vasen-l-oikea.png). Syy auki, EI selvitetty; arvio, ei todennettu: korkeusero tai laatan reuna. Ehdotin PT:lle KS:ää.
- Skenaariot: proto-3d/_tyo/natiiviseppa/pariisi-aloitus/ (sk-aloituslento.txt, sk-kartta-45.txt).

## Avoimet
1. Isoisän luento: omistaja päätti 21.02 (ks. Seuraava työ). Pariisin luenta ei palaa.
2. Kierron aikana Eiffel-torni ja Riemukaaren kyltti näkyvät sumun yläpuolella (a4, a5). Kerrottu KK:lle. KS:n horisonttimuutos 20.25 (PariisiKallistus.cs) ei ole tässä haarassa.
3. Iskulause ei näy kuvissa: a1 ennen, a2 Williamin jälkeen. Näkyminen todentamatta.
4. -2005:n "Avoinna edelleen": latausajan vaihtelu, haamu, iPad-näkemättömät.
