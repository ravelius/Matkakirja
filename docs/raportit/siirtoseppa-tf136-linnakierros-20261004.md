# Olavinlinna: TF 136 -linnakierros (Siirtoseppä 4.10.2026)

BUILD 136 (juna-1.1.136-2e43f23b), puhdas asennus, linna tuotannon osoittimesta (dad4d0f39cd2c9c2). iPhone F989814A ja iPad
D5900D45 (vaaka). Tallenteet äänen kanssa (pelin äänikaappaus, tahdistus välähdys + piippaus, ero 0–1 ms):

- iPhone: `proto-3d/lokit/siirtoseppa-tf136-aani/iphone/tallenne-aanella.mp4` (aikajana.txt samassa kansiossa)
- iPad: `proto-3d/lokit/siirtoseppa-tf136-aani/ipad/tallenne-aanella.mp4`
- Äänetön ensimmäinen kierros ja mylly: `proto-3d/lokit/siirtoseppa-tf136/`

Linnan kaikki äänet (silmukat, puheet, kertoja, kuunnelmat, tehosteet) kulkevat Unityn AudioSourcejen kautta, joten ne ovat
kaappauksessa; MatkakirjaSilmukat (AVAudioEngine) on vain ISS:n Cupolassa.

## Löydökset

| # | Vika | Huone | Laite | Tallenteen aika | Tekijä |
|---|---|---|---|---|---|
| 1 | Puhtaalla asennuksella kertojan kierros alkaa ennen kuin linna on ladattu: jakso 1 "järveltä" soi sumun ja valkoisten paikkamerkkipalikoiden päällä, linna näkyy vasta n. 46 s:ssa. Ympäristö valmis 66 s (iPhone) / 81 s (iPad), ensimmäisellä kierroksella 91 / 122 s; 2.10. kuittauksessa 33 s. | yleisnäkymä (saapuminen) | molemmat | 22–45 s | Siirtoseppä (kierroksen alku odottamaan tilojen/kuoren latausta) |
| 2 | EI VIKA (tarkistettu koodista): keittiön kortin kursiivirivi "Kokki: vouti kiirehti kappeliin ennen iltarukousta." on etsinnän vihje (DioraamaEtsinta.AktiivinenRivi), joka näytetään suunnitellusti repliikin paikalla; ajo nollasi etsinnän (poikki vihje alusta). | keittiö | molemmat | iPhone 270–303 s, iPad 302 s | – |
| 3 | Apulaisen ääni on vanha (odotettu: TF 136:n paketti dad4d0f3 on ennen #3740:tä). Uusi paketti f3c055a2 + liekit (#3932) todennetaan yhdellä puhtaalla asennuksella mergen jälkeen. | keittiö | – | – | Siirtoseppä |

## Kunnossa

- Kertojan 4 jaksoa soivat itsestään (järveltä, tornit, piha, laituri) molemmilla laitteilla.
- Kuunnelmat: kaikki 7 huonetta soivat loppuun (puhujat vaihtuvat kortissa, lopuksi Pulu ja Kuuntele-nappi).
- 10 skinnattua hahmoa ja jalkavarjo, liekit kerran 7 tilassa, 0 virhettä.
- Mylly: 3 lautaa (majatalo, luostari, viikinkilaiva), nappulaäänet v2 soivat (6 asetus/poisto-ääntä kaappauksessa).
- Liekkien koot (#3932, peili a9c0e02a): tulikori, soihdut, tulisija ja kappelin kynttilät isompia ja telineissään
  (`proto-3d/lokit/siirtoseppa-liekit2-a9c0e02a/liekit-ennen-jalkeen.png`).
