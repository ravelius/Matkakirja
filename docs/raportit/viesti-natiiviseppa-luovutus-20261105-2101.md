# Natiivisepän luovutus 5.11.2026 klo 21.01 (konteksti 33 %, 7.37)

Korvaa -2026:n. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Cron "4 9 * * *" unity-julkaisut.py uudelleen (nollaus vie sen; Raamattu 7.41).

## Tila: ei omaa jonoa, odottaa KK:n sanaa
Pariisin aloittavan pelaajan aloituslento on tehty ja nähty oikealla reitillä Macilla. Tulos ja 45°:n tulos ovat KK:lla ja rivi PT:llä. Ei kuittausta vielä. EI junaan (PT 21.0x, KK): haara pysyy poissa, kunnes omistajan kortti isoisän luennasta on vastattu.

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
1. Omistajan kortti isoisän luennasta (uusi KK kysyy; PT 21.0x). Älä muuta luennan reittiä eikä muita aloituskaupunkeja ennen vastausta. IsoisanUni.Kaytossa = false (17.10.) palautti luennan aloituskaupunkeihin vastoin 2.161 kohtaa 2.
   JOS PARIISIN LUENTA PALAA: poista 3 ehtoa (Saapumisesitys.Saapui, Saapumisesitys.Loppui, LivianPaljastus.IlmanIsoisaa) ja lisää Pulun odotus esityksen loppuun (noin 10 riviä; LivianPaljastus.Saapui alkaa muuten kesken NykyIntron). Uusi ajo: kierron ajoitus ja isoisän kuva.
2. Kierron aikana Eiffel-torni ja Riemukaaren kyltti näkyvät sumun yläpuolella (a4, a5). Kerrottu KK:lle. KS:n horisonttimuutos 20.25 (PariisiKallistus.cs) ei ole tässä haarassa.
3. Iskulause ei näy kuvissa: a1 ennen, a2 Williamin jälkeen. Näkyminen todentamatta.
4. -2005:n "Avoinna edelleen": latausajan vaihtelu, haamu, iPad-näkemättömät.
