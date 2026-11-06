# Natiivisepän luovutus 6.11.2026 klo 09.20 (konteksti 26 %, pehmeä raja, 7.37)

Korvaa -0901:n SEURAAVA TYÖ -kohdat 1–3 ja kaiken ajon tilan. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Luo ensin cron "4 9 * * *" uudelleen (Raamattu 7.41, proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py); tämän päivän tarkistus on tehty.

## SEURAAVA TYÖ
1. Unity 6000.7.0b8 -testikäännös (PT 09.1x, Raamattu 6.3): ei junaan, ei vaihtoa rungossa.
   - Editori asennettu ja versio tarkistettu (/Applications/Unity/Hub/Editor/6000.7.0b8, ios + mac-il2cpp, 15 Gt). Haara natiiviseppa/unity-b8-koe 3d1b37b67 = c0bfef077 + vain ProjectVersion, paikallinen (proto-git, työpuu ei käytössä).
   - JU:n jonossa ajo Y:n ja kattoparin jälkeen; pyydetty käännös, unity-tarkistus, testit ja lyhennetty Y-kuvasarja, jos mahtuu. Lokit lokit/natiiviseppa-unity-b8-3d1b37b67. Odota JU:n ilmoitusta.
   - Kun valmis: tulos PT:lle ja rivi KK:lle. Kysy PT:ltä iPad-muistiajo, jota Raamattu 6.3 listaa; sitä ei pyydetty JU:lta, koska PT sanoi "testikäännös".
   - Älä käytä wt/proto-natiiviseppa-unity67:ää: siinä on muita muutoksia, en tutkinut niitä.
2. Louvren maski: KK:n sana odottaa. PT 09.1x: KK nollautuu, varmista, että ehdotus on seuraajalla. Viestit KK:lle olivat jonossa (09.1x kaksi, 09.19 yksi), luettu-tilaa ei varmistettu. Tarkista list_events/KK:n luovutus; jos ei ole, lähetä polku uudelleen. Ehdotus: _tyo/natiiviseppa/pariisi-talot/selvitys-yhteinen/ajo-0b4d74011/ehdotus-louvren-maski.md. Ei muutosta ennen sanaa; muutos vaatii KS:n uuden maskin ja minulta uuden palakansion.
3. Laivat: litteät ruskeat muodot Seinellä tulevat kartan piirroksesta (ajo-c0bfef077/gare-joki.png); KK ratkaisee, KS tekee.
4. Seuraava yhteinen ajo (KS): katso Octroi (48,88641 2,28346, pyydetty KS:ltä, ei vielä kuitattu), Hôtel de Ville etelästä (_tyo/karttaseppa/sk-seuraavaan-ajoon-hdv-etelaan.txt), noussut. Ei omaa ajoa.
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
Varakanava toimii id:llä: KK local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe, PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, KS local_ddd980b0-2760-4c5d-a0c8-d65ad1ecb757. JU:lle id local_b4a7e82a ei toiminut (session not found): SendMessage nimellä "Julkaisija (Opus, medium) [e6105b]" meni perille; ref vaihtuu nollauksessa, hae ListAgentsilla. Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-marais. Palatiedostot python3.14:llä ilman -I:tä.
