# Pelikoodari → Codex: juoksupelin kolme arkista hahmoa ja särkyvät tavarat (OMISTAJAN PÄÄTÖS 2.11.2026 klo 21.05, KK)

Omistaja: juoksupelin kujilla liikkuu myös palatsin väkeä, joka ei jahtaa keisaria vaan tekee työtään ja kantaa tavaroita, jotka
voivat rikkoutua. Päätös 21.05: aloitetaan kolmella hahmolla. Kun keisari osuu hahmoon tai juoksee aivan vierestä, hahmo säikähtää
ja pudottaa tavaransa. Vuosi 1914, Kielletyn kaupungin sisäpalatsi (Puyi noin 8-vuotias). Peli on 13+ ja aikuisille: ei
karikatyyrejä eikä koomisia hahmoja, vaan tavallisia, uskottavia palvelijoita. Pysyvä lupa: hahmomallit Codexilta tai Tripolla
(Raamattu 7.15). Ei suojattuja teoksia (elokuvien tai sarjojen hahmoja), vain historialliset asut.

## Hahmot (sama luuranko ja samat leikkeiden nimet kuin `eunukki-1.glb` / `vartija.glb`, hahmot-v4)
Asujen pitää erottua selvästi jahtaavista eunukeista (tummansininen tai indigo kaapu, tumma liivi, musta lakki), jotta pelaaja
tunnistaa heti, kuka ei jahtaa. Kaikilla mustat kangaskengät TUMMILLA huopapohjilla (ei valkoisia pohjia).
1. `ruokaeunukki`: keittiön eunukki, aikuinen mies n. 1,65 m, vaalea (harmaanruskea tai savunharmaa) työkaapu ja esiliina, ei
   liiviä; kantaa molemmin käsin **lakattua punaista monikerroksista ruokalaatikkoa** (shihe) vatsan edessä.
2. `palvelijatar`: palatsin palvelijatar (gongnü), nuori nainen n. 1,55 m, vaaleanvihreä tai vaaleansininen pitkä kaapu,
   yksinkertainen hiuslaite ilman koristeita; kantaa **sinivalkoista posliinimaljakkoa** syleilyssä (vaihtoehto: teetarjotin,
   jossa kannu ja kupit; valitse se, joka näkyy paremmin takaa kuvattuna).
3. `vedenkantaja`: palatsin vedenkantaja, aikuinen mies n. 1,65 m, karkea ruskea tai harmaa työasu ja housut, käärityt hihat;
   **olkapuu (biandan) ja kaksi puuämpäriä** vettä täynnä.

## Liikkeet (in-place, tavara käsissä)
- `walk` (rauhallinen kävely tavaran kanssa; vedenkantajalla olkapuun keinunta), `idle` (seisoo tavaran kanssa).
- `startle` (säikähdys, 0,8–1,2 s): hahmo hätkähtää ja tavara irtoaa käsistä; tavara on oma solmunsa (`tavara`), jonka peli irrottaa
  hetkellä, jonka merkitset (kirjoita toimitukseen aika sekunteina).
- `startle_idle` (tyhjin käsin järkyttyneenä, kädet ylhäällä tai suun edessä, silmukka) ja `walk_empty` (kävely tyhjin käsin).

## Tavarat ja jäänteet (erilliset glb:t, origo pohjan keskellä, Y ylös)
- `tavara-ruokalaatikko.glb` + `jaanne-ruoka.glb` (kaatunut avautunut laatikko ja maahan levinnyt ruoka: riisikulhot, nyytit).
- `tavara-maljakko.glb` (tai `tavara-teetarjotin.glb`) + `jaanne-posliini.glb` (6–10 sirpaletta erillisinä solmuina `sirpale-N`,
  jotta peli voi sinkauttaa ne, sekä pohja levossa).
- `tavara-ampari.glb` (olkapuu ja ämpärit) + `jaanne-vesi.glb` (kaatuneet ämpärit ja matala märkä lätäkkö, läpikuultava tai
  kiiltävä materiaali, halkaisija n. 1,5 m; pelissä liukas kohta).
- Kevyet: enintään noin 20 000 kolmiota per hahmo ja 3 000 per tavara (pieni iPad, 2–3 näkyvissä kerrallaan).

## QA ja toimitus
- Kuvat kustakin hahmosta edestä, sivulta, takaa ja kolme neljäsosaa tavaran kanssa sekä vertailukuva rinnakkain jahtaavan
  `eunukki-1`:n kanssa (asujen erottuvuus); `startle`-liikkeen 4–6 ruudun kuvasarja; jäänteet ylhäältä ja viistosti.
- Kasvot glTF +Z:aan, mitoitus seisonta-asennossa jalat maassa kuten `vartija.glb`.
- Kansio `posti/arkiset-hahmot-20261102/`: `ruokaeunukki.glb`, `palvelijatar.glb`, `vedenkantaja.glb`, tavarat, jäänteet, kuvat,
  SHA256SUMS. Vastaus `posti/pelikoodari-codex-arkiset-hahmot-toimitus-20261102.md` (SHA256, kolmiomäärät, `startle`-irrotushetket,
  kutsumäärät). **Vain claude/postilaatikko.**
- Pelikoodari tarkistaa, vie ämpäriin (hahmot-v5/) ja toteuttaa reitit, säikähdyksen ja jäänteet nykyisen tallennepaketin ja
  eunukkikorjausten jälkeen; kuvat Keskustelukanavalle. Särkymisen ääni EI houkuttele jahtaajia (omistaja 21.05).
