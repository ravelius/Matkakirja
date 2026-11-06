# Natiivisepän luovutus 6.11.2026 klo 09.20 (konteksti 26 %, pehmeä raja, 7.37)

Korvaa -0901:n SEURAAVA TYÖ -kohdat 1–3 ja kaiken ajon tilan. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Luo ensin cron "4 9 * * *" uudelleen (Raamattu 7.41, proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py); tämän päivän tarkistus on tehty.

## SEURAAVA TYÖ
0. ENSIN, OMISTAJAN PÄÄTÖS klo 09.20 (KK:n välittämä): Louvren ympärille kokeillaan kortteleita ja taloja kuten Notre-Damella ("Kokeillaan (Suositus)").
   - Tee uusi palakansio KS:n uudella Louvren maskilla, kun KS antaa sen. Odota maskia. Pohjana palat-v6-nd-ranta, EI sen päälle; malli `tee-palat.py <D> <uusi kansio> <korvaus.json>` (korvaus selvitys-yhteinen/nd-ranta/korvaus.json, lisää louvre-rivi).
   - Koe koskee itä- ja pohjoispuolta, ei vain itää. KK: maskissa() palauttaa louvre myös Palais-Royalin puutarhalle, Comédie-Françaiselle, Bourse de Commercelle, Saint-Eustachelle ja Les Hallesin puistolle.
   - Kerro KK:lle talojen lisäys ja koko, kuten ND:n kokeessa. Ei omaa ajoa, ei junaan.
   - Tausta: varattu louvre = "Louvre (iso alue v2)", omistaja hyväksyi sen 5.11. klo 08.11 Codexin maalaamaksi ympäristöksi; maalausta ei ole vielä. Tarkista OHJELMA-lista, jos alueelle tulee OhjelmaKohteita (Saint-Eustache?).
1. Unity 6000.7.0b8 -testikäännös (PT 09.1x, Raamattu 6.3): ei junaan, ei vaihtoa rungossa.
   - Editori asennettu ja versio tarkistettu (/Applications/Unity/Hub/Editor/6000.7.0b8, ios + mac-il2cpp, 15 Gt). Haara natiiviseppa/unity-b8-koe 3d1b37b67 = c0bfef077 + vain ProjectVersion, paikallinen (proto-git, työpuu ei käytössä).
   - JU:n jonossa ajo Y:n ja kattoparin jälkeen; pyydetty käännös, unity-tarkistus, testit ja lyhennetty Y-kuvasarja, jos mahtuu. Lokit lokit/natiiviseppa-unity-b8-3d1b37b67. Odota JU:n ilmoitusta.
   - Kun valmis: tulos PT:lle ja rivi KK:lle. Kysy PT:ltä iPad-muistiajo, jota Raamattu 6.3 listaa; sitä ei pyydetty JU:lta, koska PT sanoi "testikäännös".
   - Älä käytä wt/proto-natiiviseppa-unity67:ää: siinä on muita muutoksia, en tutkinut niitä.
   - Työkalut paikallaan JU:n pyynnöstä (09.22): unity-polku.sh rivi b8 (varmuuskopio .ennen-b8-20261106, testattu kaikki tilat), /Users/Shared/Claude/unity/6000.7.0b8, kirjastot-6000.7.0b8 → _tyo/natiiviseppa/unity-b8/ScriptAssemblies. KÄYNNISTYSKIRJASTOT OVAT KOPIO b7:N ScriptAssembliesista, koska tarkista.sh ajetaan ennen Unityä (proto-kaanna.sh:120) ja kaatuisi ilman niitä. b8:lla ajettua tarkistusta ei ole testattu. b8-tuonnin jälkeen korvataan b8:n omilla ja tarkistus uudelleen (LUE.txt samassa kansiossa). JU tietää; tarkistuksen tulos ennen korvausta ei ole b8:n tulos.
2. Laivat: litteät ruskeat muodot Seinellä tulevat kartan piirroksesta (ajo-c0bfef077/gare-joki.png); KK ratkaisee, KS tekee.
3. Seuraava yhteinen ajo (KS): katso Octroi (48,88641 2,28346, pyydetty KS:ltä, ei vielä kuitattu), Hôtel de Ville etelästä (_tyo/karttaseppa/sk-seuraavaan-ajoon-hdv-etelaan.txt), noussut. Ei omaa ajoa.
Ei junaan, ei iPadia (paitsi PT:n sanalla kohdassa 1).

## Ajo 4 (0b4d74011, v4) ja ajo 5 (c0bfef077, palat-v6-nd-ranta): molemmat katsottu, tulos KK:lla, PT:llä, KS:llä
- sc-80: läikkä poissa kummassakin. sc-45 (ajo 4): ei näkyvää painumista eikä leijumista. Talot rantaan, ND:n saari ilman taloja, Île Saint-Louis ehjä. Laiturin kolme laatikkoa poissa v6:ssa (sama kamera).
- Litteä alue Louvren ja Châtelet'n välissä = varattu louvre -maski (itäraja 2,3471, 942 taloa koko maskissa, itäpuolen osuutta ei laskettu). Koordinaateista ja kuvan kohteista, ei projisoitu. Näkyy ts-talot.png:ssä (ajo 5).
- KS:n porrasreunaiset korttelit (po-la, sama ajossa 4): litteitä, karttatason asia, kerrottu KS:lle; syy ei selvitetty.
- Sentier: kapeat tummat raot ja vaaleat seinäpalat (ajo-c0bfef077/kortteli-zoom.png). Tulkinta väristä: seiniä kapeissa väleissä, ei reikiä; ei mitattu, ei korjausehdotusta.
- Tasakatot näkyvät: sc-80:ssä tasaisempi kuin v4.
- Ei todistettu: nousseista 3/222 alle 400 m kameran kohdasta, yksikään ei ≥ 5 m. Octroi, KK:n epäselvät, kuopat ja height-merkityt yli 500 m kamerasta (selvitys-yhteinen/ajo5-kohteet.py). Viistoista ei näkynyt pylväitä. Muistia ei mitattu.

## Voimassa -0901:stä
palat-v6-nd-ranta on voimassa (tee-palat.py bf7204d495d41be8); seuraava koodimuutos vain uuteen kansioon. Kohdan 0 listat, palat-v5-kappale ja "Muu tila" pätevät. Valoseppä tekee Concorden aukiota: jos sen alalla on OSM-taloja, ne pitää lisätä OHJELMA-listaan; tarkistamatta. Unity-tarkistuksen rivi 6000.7.0b8 merkitty nähdyksi ja kerrottu PT:lle.

## Viestit ja työtapa
Varakanava toimii id:llä: KK local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe, PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, KS local_ddd980b0-2760-4c5d-a0c8-d65ad1ecb757. JU local_b4a7e82a-2522-437f-84ff-813401120931 (lyhyt id ei kelpaa). Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-marais. Palatiedostot python3.14:llä ilman -I:tä.
