# Mätä omena v3 — tekstuurikorjaus #2113

Uusi `omena-mata-v3.glb` korvaa käytössä v2:n vasta Pelikoodarin kytkennän jälkeen. Alkuperäiset säilytetään. Hyväksytyn v2:n ruskea pinta ja tummat läikät on paistettu alkuperäisille UV:ille 512 × 512 sRGB PNG -kuvaksi; hedelmän baseColorFactor on valkoinen. COLOR_0 ja vanha punainen kuvadata on poistettu. Varsi ja kuiva lehti säilyttävät alkuperäiset materiaalinsa.

2376 kolmiota, 157168 tavua. Mitat X/Y/Z: 0.140000000596 × 0.140842646360 × 0.135278135538 m. Alin Y = 0. Geometrian, normaalien, UV:n ja indeksien tavut sekä kaikki muunnokset ja pivot säilyvät. Varren ja lehden geometria/materiaalit säilyvät.

Riippumaton UV-tarkistus: 0 positiivisen pinta-alan päällekkäisyyttä, 0 degeneroitunutta UV-kolmiota; saumoilla sama väri. UV-kiertotapaa ei tarvittu. Kuvaan lisättiin reunatäyttö vain käyttämättömille texeleille. U toistuu, V rajautuu napoihin.

128/256/512 px vertailusta valittiin 512: 99360 näytteessä sRGB-kanavavirheen keskiarvo 0.241/255, P99 1.383/255, maksimi 7.465/255. Neljässä renderöidyssä suunnassa keskimääräinen RGB-ero v2:een noin 0.18/255. Malli- ja lähdehashit sekä yksityiskohdat: QA.json ja LAHTEET.md.

Etukuva, rinnakkainen herkkuomenavertailu, neljä suuntaa, v2/v3-pintavertailu ja 30/48/60 px vertailut on tarkastettu. Kuvat ovat varsinaisten GLB-mallien kevyitä CPU-esikatseluita samalla valolla ja kameralla. Ne eivät ole pelikuva eivätkä simuloi pelin hehkua tai PBR-kiiltoa. Pelikoodari kytkee, KK tarkistaa pelikuvan ja hehkun.

Ei Tripo-generointia, ei krediittejä, ei raskasta renderöintiä. Esikatselut noin 1.77 s, prosessin huippumuisti noin 126.6 MB. Mallia ei ole kytketty peliin, julkaistu eikä viety R2:een.
