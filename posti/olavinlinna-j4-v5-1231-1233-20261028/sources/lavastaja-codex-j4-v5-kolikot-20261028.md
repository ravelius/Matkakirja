# Lavastaja → Codex: J4-v5, kolikot ja kulhon kaarinauha (KK 28.10. 21.0x) (28.10. 21.0x)

Kiitos v4:stä (#1228): pelissä (liite `peli-v3-v4-1021-2x.png`, v3 | v4 | sinun 1021-kuvasi; koko ruutu `peli-v4-koko-kuva.png`)
lautasen nelilehtikaiverrus erottuu nyt selvästi ja **kannu on KK:n mukaan kunnossa**. KK tarkisti v4:n 1021-kuvaa vasten; kolme kohtaa puuttuu:

1. **Kolikot liian vaaleat ja litteät.** Tavoitteessa jokaisessa kolikossa on tumma syvennys ja leima (risti/kukka), ja kolikoiden reunat erottuvat
   toisistaan. Pelissä v4:n albedo on lähes tasainen (~227/255) ja leimat ovat harvoja ohuita viivoja → kasa näyttää yhtenäiseltä vaalealta pinnalta.
2. **Kasan väleistä näkyy vaalea tasainen pohja** (arkun vaalea sisäpohja). Tavoitteessa kolikot ovat tiiviisti päällekkäin ja välit tummia.
3. **Kulhon kaarinauha ei näy lainkaan** pelin koossa.

## Pyyntö (J4-v5; mitat ja origo ennallaan, ulkomitat ≤ v4: 0,476 × 0,223 × 0,400 m skaalassa 1)
1. **AO pelin karttaan:** peli lukee `<glb>-orm-6x6.astcm`:n **R = AO** (G karheus, B metalli). Leivo geometriasta AO ja toimita se ORM/MR-kuvan
   R-kanavassa (nyt R = 255 kaikkialla). Kolikoiden välit ja alle jäävät pinnat selvästi tummiksi (AO ~0,2–0,4), kolikon reuna- ja leimasyvennykset
   kohtuullisesti. Sama tummennus saa näkyä myös albedossa (cavity), kuten v4:ssä.
2. **Jokainen näkyvä kolikko omaksi:** jokaiselle päällimmäiselle kolikolle tumma leimasyvennys + vaalea kohokuvio (risti/kukka) ja tumma reunarengas,
   niin että ne lukeutuvat ~5–8 px kokoisina (kasa näkyy pelissä ~250–300 px leveänä hämärässä yövalossa).
3. **Välit kiinni:** joko tiiviimpi kasa (kolikoita lisää väleihin) tai tumma, matala alusta kasan alle niin, ettei arkun vaalea pohja näy kolikoiden
   välistä ylhäältä katsottuna. Kasan ulkoreuna saa jäädä epätasaiseksi.
4. **Kulhon kaarinauha** näkyviin pelikoossa: leveämpi ja kontrastisempi nauha (tummat urat albedossa + AO, kiiltävät harjat G:ssä) kuten 1021-kuvassa.
5. Kannu ja lautanen ennallaan.

Toimitus kuten v4 (kokonainen GLB + kartat, SHA256SUMS, materiaaliarkki samasta kulmasta kuin 1021-kuva, myös 275 px luettavuuskuva).
Teen pelistä parin v4 | v5 | 1021-kuva KK:lle.
