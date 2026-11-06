# Karttaseppä: luovutus 6.11.2026 klo 15.59 (KS)
Syy: konteksti yli 30 %, luonteva tauko: ajot 19-22 katsottu ja jaettu, mikään oma ajo ei käynnissä. **Korvaa -1529:n ja -1410:n.** Kaikki kokeena, ei junaan, ei iPadia (2.209). W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (haara karttaseppa/nahtavyydet-219, kärki 7763f6c9c). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki 33e641016). Remote natiivi-backup, ei origin. L = /Users/Shared/Claude/wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kokeen kohtalo on päätetty).

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. Ei avointa ajoa. Odotat postia (kohta KEVYET MALLIT) tai uusia tilauksia.
3. SendMessage voi olla viestirajassa: käytä `mcp__ccd_session_mgmt__send_message` id:llä (Raamattu 12.20).

## KEVYET MALLIT (omistaja 15.55, PT)
Ajon 18 viat viety Codexille (kuittaus 2 ja korjauspyyntö 314a2bb6b). **Sinulle ei korjauksia.** Kun uusi versio tulee postiin: tuontiportti `node tools/codex-3d-tarkistus.mjs` ensin, sitten pari samoista kulmista (ylhäältä, 45°, 5°) seuraavassa yhteisessä ajossa, kuten ajossa 18 (lisä: _tyo/karttaseppa/codex-lod-20261106/lisa-18.txt, komento `koemalli <nimi> <kansio> [r g b]`). Nykyiset mallit oletuksena, koe ei junaan. PT pyysi Codexilta myös LAHTEET-tiedoston. Ajon 18 parit pysyvät kansiossa _tyo/karttaseppa/parit-yhteinen-18/. Sävyt, kytkentä ja ajon 18 tulos: -1529 (haara karttaseppa/luovutus-20261106-1529), osio KEVYET MALLIT.

## TEHTY TÄSSÄ SESSIOSSA
- **Richard-Lenoirin vesi:** 520f58ad8, brunnel=tunnel pois water- ja waterway-tasoilta, tyyliversio e24. Ajo 19: vesi poissa, puistokaistat näkyvät. Kumpi taso piirsi, jäi todentamatta. PT kuittasi. Parit _tyo/karttaseppa/parit-yhteinen-19/.
- **Tummentava kerros:** `ui peitteet 0.9` ajossa 19: mk-liike__savy, opasiteetti 0.064. PT: vuorokaudenajan sävy (PieniLiike.cs:83-99, B12), tarkoituksellinen, ei korjausta. **Väriparit samassa vuorokaudenajassa, tai sana parin selitteeseen, jos aika poikkeaa.**
- **Koepaletti-komento pois:** W 7763f6c9c, Y d489f15a0. `koemalli` ja oletuspaletti paletti-v2 ennallaan. KK ei kumonnut, mutta ei myöskään kuitannut erikseen.
- **Pompidoun siksak (VS 9e84124d4):** Y:ssä, ajossa 19 samoilla kameroilla. Parin tekee VS:n seuraaja.
- **Louvren haamu (VS a027be140, Peitto() alapää 0,25 ja 0,40):** Y:ssä, ajo 20. Haamu jää osittain: kauimmainen pääty lähes hävisi ja siipi häipyy, etuosa ja katot näkyvät taivasta vasten. Usvamitta: alku 1662, loppu 2391, Louvren keskipiste 2444 = 1,00. Eiffel 85b vaaleni paljon (verrattu ajoon 17, koska ajossa 18 ei ole tätä kameraa; välissä muitakin muutoksia), jalat häipyvät, uutta leijumista ei näkynyt. KirkkoJonoa ei muutettu. PT:llä ja VS:llä. Parit _tyo/karttaseppa/parit-yhteinen-20/.
- **Pont Neufin raita (KK 15.48, PT):** 33e641016: 3D-sillan kohdalla kartan siltatie (brunnel=bridge) pois tasolta z13 alkaen (TaloAlue.SiltaTiePois, 21 siltaa, palat -sillat1, `ohjelmakohteet 0` palauttaa tien). Testit TaloAlue 7/7 ja ElavaKartta 30/30. Ajo 22 matalalta: raita poissa, vain vesi; kuva KK:lla, joka on luvannut tämän omistajalle. Ajon 21 kamera oli liian ylhäältä eikä todistanut. Parit _tyo/karttaseppa/parit-yhteinen-21/ (rajaus-pn-neuf.jpg, rajaus-pn-matala.jpg).

## AUKI
- **Punertava laikka rannan vieressä vedessä** (pn-matala-1 alareuna, pn-matala-2 Pont Neufin edessä): tutkimatta, ei sillan raita. PT:llä ja KK:lla rivi.
- **Tähtikylttien ero 18 | 19:** Temple-torni ja Bastilji näkyvät 19:ssä, eivät 18:ssa samalta kameralta. Rivi NUI:lla (PT:n pyynnöstä), ei omaa ajoa.
- **Louvren haamu:** odota PT:n ja VS:n päätöstä; ei omaa korjausta.
- **Eiffel 85b** VS:llä. **Kärkilaskenta** iPadilla mittaamatta (nyt kevyillä malleilla pienempi, VS).
- **Pont Neufin kuvassa ajossa 18 oli koemalli-ND,** joten pari-pn-silta.jpg:n ND-ero ei ole tämän muutoksen vaikutus.

## MUUTA
- Ajotilaus JU:lle: UNITY b8, Y + kärki, skenaario, loki karttaseppa-yhteinen-NN-b8-<sha>, 1 rivi "ratkaisee". Skenaarion alkuosa: sk-pariisi-yhteinen-21.txt. Seuraava numero 23. Älä muuta skenaariota tilauksen jälkeen; ajossa olevaa ei voi päivittää (ajo 20 oli jo käynnissä, kun lisäsin kameran).
- Ennen päätelmää: katso, näkyykö vika kuvassa ajossa 18:kin samalta kameralta. Jos ei, kamera ei todista.
- `ui sulje` -poikkeus 1 kpl joka ajossa, JU tietää.
- Skriptien Python: /opt/homebrew/bin/python3 (numpy ei löydy -I:llä). Kuvat 2752 × 2064.

## LOPPUTESTIT (siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
