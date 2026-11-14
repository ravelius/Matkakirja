# Työkalu 2, luonnos 2 (Valoseppä 14.11.2026; KK 23.05 kohdat 1–3)

KUVA: tyyppimallit-luonnos-2.jpg (rivit 1–5 ennallaan, uudet rivit 6–8).

## 1. Kupolikirkko (kuudes tyyppi)
- TyyppiKupolikirkko(pylvaspaaty): latinalainen risti (laiva 32 × 16, räystäs 18; poikkilaiva 14 × 34; kuori + apsis), risteyksessä jalusta 22 m,
  rumpu 8 pylvästä 35 m:iin, lyijykupoli 8 ripaa, lyhty, huippu 58 m. Länsijulkisivu kaksikerroksinen pääty 27 m; OsaPylvasPaaty 4 pylvästä (valinnainen).
- Kolmiot 1 350 (pylväspäädyllä) / 1 248 (ilman), raja 1 500.
- OsaRumpu ja OsaKupoli ovat osakirjastossa kiinteästi 32-sivuisia → 2 086 kolmiota. Siksi oma/Tyyppimallit.cs:ssä kopiot TyRumpu/TyKupoli (16 sivua,
  kupolissa 7 kehää). EHDOTUS irrotukseen: valinnainen parametri sivuja = 32 osakirjastoon (ikonit tavulleen samat), kopiot pois.
- OsaPylvasPaaty on kirjoitettu z-akselille; TyYhdista kiertää sen julkisivun eteen (−x). Ei muutoksia osakirjastoon.
- Tyypitys: OSM-otteissa EI ole kupolitietoa (Val-de-Grâce building=church ilman roof:shapea, Institut building=public), joten kupolikirkot ovat
  sääntödataa KUPOLIT[kaupunki] kuten IKONIT. Pariisi: Val-de-Grâce (way/59846865, 2 563 m²) ja Saint-Paul-Saint-Louis (way/56046786, 1 507 m²) malliin;
  Institut (relation/967665) on koko kortteli (6 255 m², täyttö 0,25) → "ei sovi". Rooma, Wien, Lontoo: KUPOLIT-lista kootaan ennen niiden tyypitystä.

## 2. Tornin parametrit
- TyyppiKirkkoPieni/Keski(paikka, torneja, huippu); oletukset ennallaan (pieni länsi|1|pyramidi, keski länsi|1|neula; katedraali länsi|2|tasakatto).
  Länsi 2 = tornipari julkisivun kulmissa (kumpikin 0,8 × leveä), risteys 1 = torni harjan läpi kuoren puoleiseen kolmannekseen, risteys 2 = kuoritornit.
- Resepti (merkit-<kaupunki>.json): kentät torni_paikka, torneja, huippu (vain kirkko; muilla null). Käsikorjaus "torni": {"way/x": "risteys|2|neula"}.
  OSM:ssä ei ole tornitietoa, joten kaikki saavat kokoluokan oletuksen, kunnes käsikorjaus.

## 3. Sarake "ei sovi mihinkään tyyppiin"
- merkit: kenttä ei_sovi (syy tai null); uusi lista tulos/eisovi-<kaupunki>.tsv (suurin ensin); otos-tsv:ssä sarake. "Ei sovi" EI ole poistoissa
  (perustalo jää), ellei KK siirrä käsikorjauksella.
- Säännöt (SOVITUS): ei mallia (synagoga, moskeija, temppeli); kirkko sivusuhde < 1,25 = keskeinen pohja; täyttö (ala / pienin suorakaide) < 0,55
  = L/U/sisäpiha; useampi erillinen pohja (paitsi asema).
- Pariisi 650: 478 malliin, 172 ei sovi (keskeinen 69, synagoga 38, epäsäännöllinen 28, moskeija 25, temppeli 11, 2 pohjaa 1).
  Mukana Gare du Nord (täyttö 0,23), Chaillot, Palais des Congrès, Institut.
- Lontoo (uusilla asemasäännöillä) 1 349: 1 008 malliin, 341 ei sovi (keskeinen 182, moskeija 68, epäsäännöllinen 38, synagoga 33, temppeli 13).
- KK:N PÄÄTETTÄVÄ: kynnys 1,25 karsii monta korttelin sisään rakennettua pitkäkirkkoa (OSM-pohja sisältää sivurakennukset, esim. St-Pierre de Chaillot
  1,19). Vaihtoehto 1,10.

Testit: kaanna.sh (kolmiot rajaa vasten, kaikki OK), tyypitys.py pariisi + lontoo. Ei commitia, ei junaan.
Varmuuskopiot ennen muutoksia: varmuus/.

## Lisäys 14.11. klo 23.5x: tyypityksen tarkistus (luovutuksen kohta 2, näyttö b)
- Otos 30 (seed 1873): ensimmäisellä ajolla väärin 2–3 / 30 (Cathédrale Saint-Irénée 310 m² katedraalimalliin; Gare Montparnasse Hall 3; Champ de Mars).
  Korjattu SÄÄNNÖILLÄ (ei käsikorjauksia):
  * katedraali_min_ala 2 000: nimi "Cathédrale/Basilique" tai building=cathedral antaa katedraalin vasta tästä (Saint-Irénée, N-D-des-Victoires 1 435).
  * kappeli_max_ala 800: building=chapel → pieni vain tähän asti (Saint-Martin-des-Champs 1 518 m² oli pieni).
  * palatsin nimisääntö ei koske urheiluhalleja eikä kongressitaloja (Palais des Sports ×7, Palais des Congrès ×2, Palais de la Femme).
  * aseman nimessä "Hall/Halle" → ei sovi (OSM jakaa Montparnassen halleihin).
  * KUPOLIT += Saint-Augustin (oli katedraalimallissa).
- Toisella otoksella väärin 0–1 / 30 (< 10 %).
- KK:N PÄÄTETTÄVÄ: Madeleine (way/54180046, kreikkalainen temppeli ilman torneja) on nyt kirkko-suuri → ehdotan "ei sovi" käsikorjauksella;
  synagogat/moskeijat building=yes ovat jo "ei sovi" -listalla (ei mallia), joten luovutuksen epäily 19+13 ei enää vaikuta poistoihin.
- Ministeriöt (Palais Bourbon, Élysée, Hôtel de Lassay) pidetty palatseina: ne ovat palatseja.
