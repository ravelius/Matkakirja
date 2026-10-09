# Kuninkaanlinnan tekoälypinnat malliin: v6i-ehdokas (Linssiseppä 2, 9.10.2026 klo 22.5x)

PT 20.4x: Karttasepän yöajo v2 (kl_{etela,ita,lansi,pohjoinen,katot}_v2) KL:ään LR:n työkaluilla omassa kansiossa, Riddarholmen v2c mukaan,
pelikuvat valokuva | v6h | v6i.

## Tulos
- Paketti `proto-3d/_valmiit/omat-mallit-vienti-20261009o/kartta/omat-mallit/v6i` (ei ämpärissä, ei osoitinta). KL lod0 15,5 Mt
  (v6h 13,3 Mt), sama geometria ja kolmiomäärä (163 k / 95 k / 1,1 k) kuin v6h:ssa.
- Arkki: `kaappaukset/linssiseppa2-kl6i-20261009/kl-valokuva-v6h-v6i.jpg` (4 kulmaa, appi 173pbr2, klo 13) + v6i-lähikuvat 02 ja 03.

## Ketju (työkopiot `proto-3d/_tyo/linssiseppa2/kl-tekoaly/`, LR:n lähteisiin ei koskettu)
1. `tekoaly_takaisin.py` → ortokehys, `kohdista.py`: kaikki 5 hyväksytty (aukkojen jäännös mediaani 0,06–0,15 m, p90 0,15–0,29 m,
   IoU 0,971–0,983; katoilla ei aukkoja).
2. `projisoi.py --lahde tekoaly --atlas 4096` (6,25 cm/px). LS2:n muutokset kopioon:
   - Varapinnat (ei näkymää) säilyttävät v3c:n materiaalit ja COLOR_0-AO:n (LR:n versiossa tasaväri). Varapintaa 57 % → 31 % alasta.
   - Toinen kierros: varapinnat ≤ 1,2 m näkyvän pinnan takana (ikkunapielet, ulkonemien sivut) venytettynä samasta näkymästä.
     Ilman tätä julkisivussa oli tummia pystyraitoja (v3c:n hiekkakivi pielissä).
   - Atlas-AO pois: päällekkäiset projektiopinnat (pielet, lasit, kehykset) jakavat atlaksen tekselit, joten piilopintojen musta AO
     kirjoittui julkisivun päälle (keskirisaliitti musta, pilasterit tummina raitoina). Tekoälykuvassa syvennykset ovat jo tummina.
   - Atlakselle valkoinen COLOR_0 (OmaMalli kertoo albedon verteksivärillä; puuttuvan attribuutin oletukseen ei luoteta).
   - Kattoatlaksen kylläisyys × 0,5 (tekoälyn kupari turkoosi, valokuvissa harmaanvihreä); aurinkopaneelit v3c:n omina
     (tekoälykuvassa ei paneeleja).
3. Google-sävy kuten v6h: `leivo_tyyli.py` + `leivo_kl3.py`. Riddarholmen v2c: LR:n glb/ + `leivo_tyyli.py` + `leivo_ridd2.py`.
   Skriptit `skriptit-20261009/vienti-v6i.py`, `kuvat-v6i.sh`, `kl6i-tukholma.txt`, `arkki-v6i.py`.

## Itsetarkistus (pelikuvat)
- Ei toistuvaa kuviota; julkisivut valokuvamaiset, ikkunat geometrian kohdilla. Saumoja näkymien välillä ei näy kulmissa.
- Väri: tekoälyn rappaus on vaalean kermanbeige, valokuvissa lohenpunainen (varmrosa). v6h on harmaanruskea. Sävyä ei ole siirretty.
- Näkyvät viat: kohdistuksen TPS-vääntö näkyy aaltoilevina pilastereina lähikuvassa; etelän pylväikkö ja listat juovaisia
  (venytetty projektio); itäsiiven sisälape tasainen ilman kuviota; itäjulkisivu (varjopuoli) haaleampi ja ikkunat ääriviivamaisia.
- Räystään repaleinen kaistale ja ilmassa leijuva kappale itäjulkisivun edessä ovat Googlen laattojen jäänteitä (näkyvät myös
  v6h:ssa): leikkauspolygoni ei kata Logårdenin puolta kokonaan.

## v6j (PT 9.10. 23.0x, valmis 23.3x)
Paketti `proto-3d/_valmiit/omat-mallit-vienti-20261009p/kartta/omat-mallit/v6j`; arkki `kaappaukset/linssiseppa2-kl6i-20261009/kl-valokuva-v6i-v6j.jpg`.
1. **Kaksi sävyä** (`kl-tekoaly/savyta.py`, LR:n luokkamaskit): seinä + sokkeli + urat lohenpunainen 168/130/112, kivikoriste + listat
   vaalean kellanharmaa 196/188/168, luminanssi säilyy; ikkunat, puitteet ja ovet ennallaan. Varapintojen v3c-materiaalit samoin
   (`leivo_kl6j.py`). Pelivalon kerroin mitattu v6i:n pelikuvasta: aurinkoinen eteläseinä pelissä ≈ leivottu tekstuuri (R/G 1,05 → 1,06–1,09),
   joten Riddarholmenin (0,81, 0,85, 1,12) ei päde. Rappauksen R/G tekstuurissa 1,26.
2. **Googlen jäänteet pois:** LR:n alue.py / maa.py / kuninkaanlinna.py kopiona `kl-tekoaly/kl-v6j/`: 8 m:n marginaali myös itään,
   Logården omaksi maaksi ja `itapuoli()` takaisin (tukimuuri, portaat, vesipeilit, 12 kartiopuuta; v2 oli kytkenyt pois). Terassin
   porrasreunat päälle (TIUKKA koskee enää Lejonbackenin ramppeja) ja rakennuksen alla sisäpihan taso vasta > 4 m reunasta (muuten
   kiilat julkisivun eteen). Leikkaus = uusi alue.json (75 pistettä, 29 130 m²). Itäräystään kaistale ja leijuva kappale poissa.
3. **Pilasterit:** kohdista.py-kopioon `KOHDISTUS=akseli` (dx(x), dy(y), kaistat 2,6 m / 1,5 m, kolme kierrosta) → suorat pilasterit
   ja vaakasuorat listat. Mediaani 0,07–0,17 m, p90 0,15–0,74 m (muutama tekoälyn väärin piirtämä ikkuna jää paikalleen).
   **Pylväikkö:** toisen kierroksen pinnat näytteistävät 0,15 m × |n⊥| sisäänpäin; juovat lievenivät, eivät poistuneet.
   Näkyvyysraja 0,6 → 0,4.

Auki (itse tarkistettu pelikuvista): kaakkoissiiven sahalaitakolmiot räystään ja ikkunoiden alla (myös v6i:ssä; isot seinäkolmiot
jakautuvat projektion ja varapinnan kesken), portiikin juurella muutama valkoinen läikkä (maanrajan pinnat näytteistävät tekoälykuvan
valkoista taustaa), ohuet vaaleat vaakaviivat listojen kohdalla, itäjulkisivun tekoälykuva haaleampi (ikkunat ääriviivamaisia),
Logårdenin nurmi tasainen ilman kuviota.
