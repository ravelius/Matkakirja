# Natiivisepän luovutus 5.11.2026 klo 15.58 (konteksti 25 %, pehmeä raja, 7.37)

Korvaa -1543:n jonon. Muu -1543, -1525 ja -1510 lisäyksineen pätevät (Liiku-ohje -1510:ssä ja -1543:ssa). Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Vuoro aina JU:lta. Lue Raamattu 7.47:n rivi. Zsh: `echo ====` kaataa komennon. Kontekstihook laukesi 25 %:ssa Raamatun lukujen 6, 9, 10 ja 12 luvun jälkeen: ne vievät noin kolmanneksen rajasta.

## Jono
1. JU:n ajo natiiviseppa-porras-5282b9fc4 (pyydetty 15.55): katso, kerro KK:lle ja PT:lle (alla).
2. KK:n ja PT:n vastaukset 15.56:n viesteihin. Korjaa KK:lle, jos en ehtinyt: Notre-Dame on i03:ssa noin 140 px leveä, ei 190 px.
3. n-1km-85:n viat ja i07:n törmäykset (alla), KK:n linjauksen mukaan.
4. Liiku-loitonnus (omistaja 15.05): aloittamatta. Tee haaraan natiiviseppa/saapuminen-porras-219.

## Haara: natiiviseppa/saapuminen-porras-219 5282b9fc4
Pohja 9bb4e3476, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, peili natiivi-backup peili/proto/natiiviseppa/saapuminen-porras-219. tarkista.sh 0 virhettä (tyylikirjan kolme tiedostoa palautettu). Testejä ei lisätty eikä ajettu; PalloLiikeTestit ajamatta tällä shalla. wt/proto-natiiviseppa-kierto-koe on 9bb4e3476:ssa, ajo valmis, joten sen saa ottaa käyttöön. NUI:n kyltit-219:n uudet commitit eivät ole mukana.

## Tyhjä pohja: mitä löytyi
- Laskun viivytys, 15.42:n ehdotukseni, HYLÄTTY: omistaja 3.11. 07.22 "Lataa jo siirtymän aikana ja silloin pelkkä sisään zoomattu kartta. Siinä ei voi kestää 30sek", koodissa ZOOMAUS EI ODOTA (PeliOhjain.Esilataus.cs). Jos laskua haluaa viivyttää, se on omistajan päätös PT/KK:n kautta.
- Ajon 461a0241e lokista: ensimmäiset isot pyynnöt vasta 3,31 s (z11 7, z12 22, z13 34). Vastausten järjestys z13 991–1562 ms, z12 1289–2933 ms, z11 3077–5000 ms: tarkin ehti ensin. Tulkinta: 4,1 s:n matkassa kerralla liikaa paloja. Miksi pyynnöt tulivat vasta 3,31 s, EI selvinnyt. Ennen sitä 1,26 s z13 8/8.
- Ajossa kuva vie noin 2 s kehysaikaa (kehysajat max 2070 ms, seurannan aukko 4,34 → 5,72 s), joten kuvasarja hidastaa peliä ja kuvien aikaleimat eivät vastaa pelaajan kokemusta. Harkitse lokivetoista ajoa ja vain muutamaa kuvaa.
- p03 on korkeintaan pohjan tasoa (ei katuja, Seine vain varjostuksena). En mitannut, millä tasolla se oli.

## 5282b9fc4
SaapumisEnnakko portaittain: kuvakoko 0,25 → 0,5 → 1 pelaajan kamerasta samalla alalla (Cesium valitsee tason kuvapisteistä: neljännes = 2 tasoa karkeampi, noin 1/16 paloista). Seuraava porras, kun lataus ≥ 95 % (väh. 0,3 s) tai 1,2 s täynnä. Lukuarvot omia, kokeilematta. Olettama EI varmistettu: Cesium for Unity lukee kuvakoon camera.pixelWidth/Height ja rect vaikuttaa siihen myös piirtämättömällä kameralla; lähdettä en tarkistanut. Ajosta: lokin "pyynnöt" tason mukaan karkein ensin. Jos järjestys ei muutu, oletus on väärä.
Matkaseurantaan: "ruudulla N (karkeat K, puuttuu P), ennakko ...". Lokiin "saapumisennakko: porras". Matkaseuranta kutsuu LataamattomatLaatat 4 krt/s.
Ajosta katsottava: skenaario-piirros-matka.txt, 14 kuvaa, vertailu lokit/natiiviseppa-saapuminen-461a0241e. KK:n sanat -1525:ssä. Soikio on nyt poissa (9bb4e3476), Lontoon kortti ja ISO-BRITANNIA tarkista uudelleen.

## Intro 9bb4e3476 katsottu, KK:lle ja PT:lle 15.56
Täysikokoisina i03, i07, n-1km-85; i01–i24 yhdistelmänä. n-6km-60, i25–i27 katsomatta. Loki 60,0°. PUUTE oleta aloitusintro Lontoo aikaraja, sama kuin ennen; POIKKEUS ArgumentOutOfRange oletettavasti Unity Search (-1510), tässä ajossa ei tarkistettu.
- Ok: kallistus i02:sta luennan loppuun, ei tummennusta, PARIISI luettava. Noin 28 % ruudusta taivasta ja usvaa, vastoin laskelmaani.
- Rakennukset: Tuileries ja Notre-Dame seisovat, oikeassa yläosassa ja pieninä. "Näkyvät hyvin" jää omistajan arvioitavaksi. Rungon vaihtoehto -1543:ssa: matalampi kierto (KaariAst).
- i07: PARIISI osuu nimiin (Parc Monceau), kyltteihin (Riemukaari, Trocadéron) ja riviin PARIISI, RANSKA. Kartta i07:ssä sumeampi kuin i03:ssa, syy auki.
- i16–i17: Etsityt kaupungit 0/61 valokuvan takana (vain yhdistelmästä).
- n-1km-85: jättinimi embâcle, portaikkoinen etuala, kolmio ja raita vasemmassa alakulmassa, maasto kohoaa horisontissa oikealla: kaikki yhä. Uusi: Notre-Damen tornit levenevät ylöspäin ja liian korkeat, syy auki (malli, Karttaseppä? tai kulma).
- Rakennusten saumat ja muisti loppumittauksessa. Avoin -1543:sta: lisää listaan _tyo/natiiviseppa/loppumittaus-pariisi.md 60° + kallistus luennan ajan (muisti) ja SaapumisEnnakon muisti. En lisännyt.

## T7 → NAS 2. erä
pid 58484 käynnissä 15.56 (2 h 28 min). Monitor kuolee nollauksessa: aseta uudelleen. Muu -1348:n mukaan; ei poistoja ennen PT:n lupaa.
