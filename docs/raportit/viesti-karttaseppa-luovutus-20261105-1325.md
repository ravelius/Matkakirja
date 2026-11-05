# Karttaseppä: luovutus 5.11.2026 klo 13.25 (KS)
Syy: Postivahdin pyyntö (luovutus 4b4407bb8 oli jo tehty). **Lue tämä, sitten -0955 (haara karttaseppa/luovutus-20261105-0955, 4b4407bb8), sitten sen viittaamat.** Tämä voittaa ristiriidassa.

## Tämä sessio ei tehnyt -0955:n töitä
Sessio hoiti vain alla olevat viestit. Vahtia ei käynnistetty. Saaren kuvaparit ja Louvren vertailu oikeaan rakennukseen jäivät tekemättä tässä sessiossa. En ole tarkistanut, onko KK vienyt niitä eteenpäin tai ovatko ne yhä ajankohtaisia: katso työlista (hook näytti 13.2x "Louvre otto 2: länsipää auki" ja "Louvre 3D: sininen pyramidi") ja kysy epäselvä rivinä KK:lta.

## Uudet linjaukset
- **Omistaja 10.52, Raamattu 2.209:** kartassa vain rakentaminen, testit vasta valmiina. Ei iPad-ajoja, muistimittauksia eikä toistosarjoja; saari-ajo sekä Louvren ja Sainte-Chapellen iPad-kuvat ovat pois jonosta. Macin kuvat oman työn katsomiseen jatkuvat. Karsinnasta KK tuo erillisen tiedon; älä karsi ennen sitä. -0955:n "pyydä uusi iPad-ajo" ei enää päde.
- **Omistaja 10.55 (PT):** muiden kaupunkien ja koko kartan lisäykset myöhemmin. KS:lle jatkuvat Pariisin nähtävyydet, saari ja kartta. Epäselvät työt rivinä KK:lle.
- **Tiedostojako VS:n kanssa (voimassa):** VS kirjoittaa ElavaTyyli.cs, Laattapalvelin.Elava.cs, Varitaso.cs, ElavaKarttaTestit ja korjaa elävän palan vikoja. Muista Elava*-tiedostoista KS pysyy erossa. KS kirjoittaa Nahtavyysalue.cs, NotreDameKoe.cs, Resources/NotreDameKoe/**, Nimikerros.cs, PiirrosKerros.Animaatiot.cs; saari, puut, vyöhykkeet ja Codex-/Tripo-tilaukset ovat KS:n. Komennot.cs: vain pieniä lisäyksiä ja SHA toiselle heti. NotreDameKirkko.shader: VS kertoo ennen muutosta. VS kertoo myös, jos elävän kartan värit saaren ympärillä tai ElavaTyyli.Striimi muuttuvat.

## Pariisin aloituslento (Raamattu 2.210, suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261105-pariisin-aloituslento.md)
- Osa C:n paikat tehty: **PR https://github.com/ravelius/Matkakirja/pull/6273** (391a7a269), CI vihreä 13.25, **ei mergetty**. Vie loppuun kaavan mukaan. Haara karttaseppa/pariisi-aloituslento-paikat.
- Paikat ja vara-rivit viety NUI:lle. KK:lle viety, ettei paikattomia Pulun kuvia ole (vain p1); i1, i2 ja p1 on sijoitettu arvioiden kuvasta ja tekstistä.
- Tarkista hero-pariisi-louvre.jpg ja hero-pariisi-riemukaari.jpg toimituksesta (postilaatikko a289df3f0): jos nimet muuttuivat, päivitä data ja kerro NUI:lle.
- tools/sisalto/esittelypaikat.mjs: ajo antaa muiden kaupunkien "ei kohdetta" -rivit ja exit 1, odotettua. Muiden kaupunkien tiedot ovat commitoimatta: /Users/Shared/Claude/wt/karttaseppa-esittelypaikat (myöhempään työhön, älä poista). Poistin työkalusta sähköpostin User-Agentista.

## Levy
- Poistin 15 omaa worktreetä (PT), myös /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219. Haara karttaseppa/nahtavyydet-219 (b2ce1653f, natiivi-backup) säilyy. Luo tarvittaessa: git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree add /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 karttaseppa/nahtavyydet-219
- T7 → NAS 2. erä (NS): siirtyviksi vahvistettu kaikki paitsi venv-kartta, .metadata_never_index ja kierrostarkistus-20261015. tools/kaukomaa, tools/tekoalypinnat ja tools/vesipinta toimivat siirron jälkeen vasta, kun kansio on palautettu; pyysin NS:ää kirjaamaan listan NAS-kansion juureen.

## Lisäys: kuvat heti KK:lle (omistaja 13.24, Raamattu 2.214, PR 6278; PT 13.2x)
Kun näkyvä Pariisin askel on valmis: Macin kuva (polku + yksi rivi) suoraan KK:lle local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, kopio PT:lle. Ei selitekaistaa, ei iPad-ajoja eikä mittauksia (2.209). Mac-ajot JU:n vuorolla.
