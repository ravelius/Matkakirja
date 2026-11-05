# Natiivi-UI: luovutus 5.11.2026 klo 12.10 (konteksti 35 %)

Edellinen: viesti-natiivi-ui-luovutus-20261105-1110.md (haara natiivi-ui/luovutus-20261105-2).
Proto: /Users/Shared/Claude/proto-3d/Matkakirja-proto. Omistajan kaikki Pariisin osat saavat jatkua; rakentaminen ensin, testit valmiina (2.209).

## 1. Lippu (haara natiivi-ui/kartan-kaanto-219, wt/proto-natiivi-ui-kaanto): KK:n sanaa odottaa
- Kohdan 3 korjaus b558a2d00: kaupunkien nimet väistävät lipun alaa (`NimiLadonta.LadoKaupungit`, parametri `lippu`; `KaupunkiMerkit` antaa `Lipputanko.RuutuAlue`). Lipun paikka ennallaan. Ei varaus, joten pisteet ja pääkaupunki eivät katoa.
- iPhone-ajo valmis, arkit katsottu: proto-3d/lokit/nui-lippu-b558a2d00-20261105/arkki/ (4). iPad ja kääntö 8be86170b:stä: lokit/nui-lippu-840d8abd3-20261105/arkki/. Viesti KK:lle lähetetty klo 12.0x kohdista 1–5.
- Itse katsottu: 4 iPhone-arkkia ja ipad-vaaka-NOR. Muut iPad- ja kääntöarkit katsoi ali-agentti, ja KK:lle on sanottu se.
- AUKI: ipad-vaaka-NOR-225: palmumerkki kankaan päällä (kohta 4), syy selvittämättä. KK päättää: korjataanko. KK:n vanha sana: "Jos tämä on iso työ, kerro äläkä tee". Ranskan 225: kuumailmapallo kankaan vieressä tai osin päällä (käyttöliittymä).
- iPad-simulla ei ole ajettu ladontaa: kerrottu KK:lle. Ei iPad-ajoa ilman JU:n vuoroa ja KK:n pyyntöä.
- Ei omistajalle ennen KK:n sanaa, ei mergeä. JU poimii lipun Pariisin pohjaan vasta KK:n hyväksynnällä.

## 2. Kyltit (omistaja 11.53 ja 11.56): kuva puuttuu
- 13355a9c2 haarassa natiivi-ui/pariisi-lento-219 (uusi `UI/KarttaKyltti.cs`, `KaupunkiPallot`; kipit = kuumailmapallot, kipsipäitä EI). Kyltit: kuumailmapallot, Olavinlinna, raketti. Portti `MaamerkkiLahella` + Kohteet-kytkin.
- Hinnat koodista: pallo £200 (`PalloLentoHinta`), raketti £500 (`RakettiHintaNyt`, maksettu: "ISS"), Olavinlinna £20 (`OlavinlinnaHinta`). HUOM rivi KK:lle: Olavinlinnan "Jatka" on tallennuksella ilmainen ja "Aloita alusta" £10; kyltissä aina £20.
- Mac-kuva EI vielä todistettu. Kaksi ajoa eivät kelvanneet: 1) väärä kokoparametri, 2) `ui lentopiilo` piilotti pallot. Skenaario korjattu: proto-3d/_tyo/natiivi-ui/kyltit-219/sk-kyltit.txt.
- SEURAAVAKSI: pyydä JU:lta ESIKATSELU NYT (13355a9c2, L2, 3 min), aja `PROTO_LINJA=2 nice -n 15 zsh tyokalut/esikatselu.sh 13355a9c2 <skenaario> ipad --batch` (wt/proto-natiivi-ui-nousu-pieni), katso kuvat, rivi JU:lle, kuva KK:lle. Tarkista koordinaatit: raketin kohta on arvattu (69.2943, 16.0200); oikea `Iss.Nousu.AlustaLat/Lon`. Batchin ruutu on 640×480, joten zoomin portti pitää varmistaa kuvasta. Jos kyltti ei näy: tarkista ensin stylesheet ja `KarttaKyltti`.
- Ei iPad-ajoa, ei junaan.

## 3. Pariisin aloituslento (Raamattu 2.210, suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261105-pariisin-aloituslento.md)
Minulle osat A, D, D2, E ja B:n ajoitus; NS tekee kameran (B). Pohja: julkaisija/pariisi-219 99035b765 (ef02dd214 oli rikki). Lippu ei mukana. Työ: wt/proto-natiivi-ui-nousu-pieni, haara natiivi-ui/pariisi-lento-219:
- c919055ad osa A:n liikekäyrä: `Linssit/Ydin/Kamera/NousukuvaLiike.cs` (nousu 1,1 s, viimeinen kasvu 2 s, paluu 1,3 s, limitys 0,2 s, testit 5/5) ja `TraileriLiike.KuvaNouseeKierrossa` / `KuvaPalaaKierrossa` (kohde joka ruudulla). EI vielä kytketty.
- cf10d0f23 KS:n paikat `esittelypaikat-vara.json`:ssa (PR 6273): Riemukaari, Louvre, i1, i2, p1. Eiffel, Sacré-Cœur ja Notre-Dame olivat jo. Louvren ja Riemukaaren kuvat vielä Codexilla; uudet kuvat omistajalle ennen kytkentää.

Tekemättä, järjestyksessä:
1. A:n kytkentä: oma sarja viidelle (Eiffel, Riemukaari, Sacré-Cœur, Notre-Dame, Louvre) `Saapumistraileri`/`Saapumisesitys` (`NykyIntro` :510, C-kuvat :590) rinnalle; ei muutoksia 2.161:n introon eikä yhteiseen nousuun. `SaapumisKuvat.Lahto`/`Kohta` antaa kohteen; `Nousu.Laskeutui` jättää kuvan kartalle. Neljä katukuvaa ja Invalidit eivät nouse.
2. D: C5 pois; i1 ja i2 nousevat Tuileries'n puutarhasta ja lentävät alaosaan. Poistettavat polut: Pulun kuvat ja katukuvat ja `esittelynPikkukuvat` (`Saapumisesitys` :242, :253, :413, :630, :636, :767); `Matkakirjakortti` :742, :953 tarkistettava. Arkki alaosan kuvista KK:lle.
3. D2: alaosan isoisän kuvan napautus: Pariisissa kartta lähestyy palatsia ja avaa nykyisen kortin; toisessa kaupungissa kortti ilman lentoa, pelaaja jää sinne (omistaja 11.48, lukittu).
4. E: Pulun kuvat omaksi poluksi (`Luentakuvasarja` :151), nousu ja paluu kartalle kuten A; kehyksen väri Tyylikirjasta, KK hyväksyy. Pulun ainoa Pariisin kuva on p1 (KS). Paikaton Pulun kuva: KK päättää.
5. B:n ajoitus NS:n kanssa: kierto hiipuu luennan alkupuolella; kosketus ja Ohita pysäyttävät pehmeästi.
Testit vasta valmiina, ei junaan; omat Mac-kuvat rakentamiseen JU:n vuorolla. Liike ja kierto KK:lle.

## Huomiot
- Unityn `ArgumentOutOfRangeException` (`UnityEditor.Search.SearchDatabase`) esikatselulokissa ei tule pelistä; JU sanoi: ei aikaa, ellei pino osoita Matkakirjan koodiin.
- wt/proto-natiivi-ui-nousu-pieni on nyt Pariisin työkansio; vanha haara natiivi-ui/nousu-pieni-219 jäi talteen.
- tarkista.sh päivittää tyylikirjan (3 tiedostoa): git restore. Ajamatta 13355a9c2:n ja cf10d0f23:n jälkeen koko tarkista.sh; unity-tarkistus 0 virhettä ja vahdit ok ennen cf10d0f23:a.
- Ei auki olevia ajoja. L2 vapautettu JU:lle klo 12.08.
