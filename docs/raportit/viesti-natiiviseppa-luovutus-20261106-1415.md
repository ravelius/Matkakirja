# Natiivisepän luovutus 6.11.2026 klo 14.15 (konteksti 30 %, 7.37)

Korvaa -1354:n Tila- ja SEURAAVA TYÖ -kohdat. -1354:n "Mitä tässä sessiossa tehtiin ja nähtiin" ja "Opit", -1339:n "Työkalut", -1301:n "Mitä tässä sessiossa nähtiin" ja "Opit" sekä -1247:n kohta 6 pätevät. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja.
ENSIN: set_remote_control self true, sitten cron "4 9 * * *" (session-only, Raamattu 7.41). Skripti: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. Työpuu: /Users/Shared/Claude/wt/proto-natiiviseppa-palikka (EI proto-3d/wt/).

## Tila
- Haara natiiviseppa/palikka-koe 46578a534, työpuu puhdas. Mac-9 ajettu ja katsottu, tulos KK:lla ja PT:llä (P/selvitys-mac9).
- P/PalikkaData-v6.bytes valmis (sha 1c7b284792764af2), EI vielä Resources-kansiossa eikä haarassa, pelissä näkemättä: 29 486 → 29 232, pois 160 tolppaa omilla silloilla, 50 näkyvässä vedessä, 37 alle 5 m, laatta way/45173100 (7 pätkää). KK 14.06 hyväksyi tämän.
- KK:n sana PUISTA odottaa: viesti jonossa KK:lla. Tarkista tuleeko vastaus; jos sitä ei ole, kysy kerran.

## SEURAAVA TYÖ, järjestyksessä
1. KK:n sana puista. Jos kyllä: python3 P/poista-vedesta.py P/PalikkaData-v5.bytes P/PalikkaData-v6.bytes --puut (uusi sha; 370 vedessä, 970 alle 10 m, ei korvata). Jos ei: v6 sellaisenaan. Yksi versio, älä tee v7:ää turhaan.
2. Kopioi v6 työpuun Assets/Matkakirja/Kartta/Resources/PalikkaData.bytes, commit kuten 46578a534 (vain yksi tiedosto, ei junaan), push peiliin.
3. Lyhyt Mac-ajo JU:lta skenaariopohjalla P/sk-mac-9.txt, ilman jälkiä: Pont Neuf (r4-loppu-b2), hv3-nyt, hv3-b2 ja c-b2 (kamera P/sk-mac-8.txt rivit 19–26). Katso täysikokoisena: tolpat Pont Neufin kaarista poissa, HdV:n rannan laatta ja tolpat poissa, c-b2:n vasen reuna (P/selvitys-mac8/rajaus-c-b2-ranta.png). Tulos KK:lle, tiivistys PT:lle. Älä lupaa kärkeä ennen kuin v6 on haarassa (-1354, Opit).
4. IPAD 3 kohdan 3 jälkeen (KK 13.49 ja 14.06): P/ajopyynto-ipad-3.md, lisää sha ja poista LUONNOS; ehdot -1339:n kohdassa 4 ja -1301:n kohdassa 4; tarkista ensin, että iso iPad on vapaa. Lisää kuva puu-3-300:n todistamiseksi, jos kamera sopii (KK 14.06: läheltä, Mac-9:n l-b2 ei todistanut).
5. C1 ja D2 -1247:n kohdan 6 mukaan. Forward-kopio pois listalta ennen C1:tä. Ilman renderöijän vaihtoa (KK).

## Mitä tässä sessiossa nähtiin
- MAC-9 46578a534: Pont Neufin laatta poissa. 847 ms ei toistunut (r4-b2 18,7 ms, r4 28,9 ms). hv3 osui Hôtel de Villen rantaan. s2 ei osunut: Pont au Change ja Pont Notre-Dame jäävät Sainte-Chapellen ja puiden taakse; datassa ei palikoita. Puu-3-300 todistamatta.
- PALIKAT ISTUVAT KARTTAAN: palikkatalojen alareunat kartan piirrettyjen talojen kohdalla (selvitys-mac9/zoom-hv3-pohja.png), siirtymää ei ole.
- NÄKYVÄ VESI ON KOLMESTA LÄHTEESTÄ: suodatin katsoi vain OSM-relaatiota 2191006 (Seine). Näkyvä vesi on kartan Z14-vesi (ElavaTyyli.cs:282, Arsenal ja kanava mukana) ja Notre-Damen alueella pohjakuva NotreDameKoe/pohja-ranta (1536 × 1024 m, keskipiste 48.85531, 2.349), jonka vesi on oikealla rannalla leveämpi. Yhdistetty maski P/selvitys-tolpat/nakyva-vesi-alueet-2m.png. Muilla alueilla ei vettä pohjakuvassa.
- Z14 ilman hakuja: esikatselun välimuistit /private/tmp/mke.*/Matkakirja/*/laatat/elava/mvt/14; väliaikaisia, voivat kadota. 48/63 palaa löytyi, puuttuvat 15 ovat reunoja (8302 ja rivi 5639).
- Tolpat seisovat aina maan tasolla: omien siltojen kohdalla ne jäävät kannen alle (ruskeat tolpat Pont Neufin kaarissa).
- Määrät: tolpat vedessä 50, alle 5 m 37, omilla silloilla 160. Puut vedessä 370, alle 10 m 970. Alueittain ND 18/11 ja 80/88, Arsenal ja kanava 32/22 ja 268/632, muu 0/4 ja 22/250 (selvitys-tolpat/alueittain.py). Arsenalin kohtaa ei nähty kuvassa.
- MUUT PALIKKASILLAT VEDESSÄ, kerrottu KK:lle: 43/119 osuu veteen (Austerlitz, Charles de Gaulle, Bercy, Métro 5 ja 6, kanavan ja Arsenalin kävelysillat), suositus jättää; selvitys-tolpat/palikkasillat-v5.json, sillat-vedessa.py.
- VAALEA RAITA Pont Neufin alla: lähes varmasti kartan oma tertiary-silta Z14:ssä (suunta 28–31°, mallin akseli 28–30°), kansi yläpuolella. Ei pikselitodennusta. KS:n asia, jos halutaan pois; KK:lle kerrottu.

## Opit
- KORJAUS: oma kohta B KK:lle ("näkyvä vesi on leveämpi") oli päätelmä kuvasta; Z14-maski ensin kumosi sen HdV:n kohdalla, ja syy löytyi vasta ND:n pohjakuvasta. Mittaa kaikki veden lähteet ennen kuin nimeät syyn.
- Värikynnys pohjakuvan vedelle kiinteä 28: 97 %:n prosentti antoi 83 ja 240 väärää tolppaa, koska näyte sisälsi saaren maata.
- tolpat-v5.json: ensin valot, sitten mastot, ei tiedoston järjestys. poista-vedesta.py hoitaa sen.
- Postivahdin aloitusviesti tuli kesken työn ja sisälsi vanhentuneen kohdan (puiden väri, Mac-8: tehty); luovutus voittaa.

## Huomiot
- NS:n työpuita wt/-kansiossa 8 (raja 3): kerro PT:lle ennen poistoja.
- Canopéen välke liikkeessä edelleen katsomatta.
- P/:n skriptit ovat git-haaran ulkopuolella, kuten aiemmatkin.
- Jos KS muuttaa ND:n pohjaa, aja alue-vesi.py ja poisto uudelleen.
