# Pelikoodari: luovutus 08.11.2026 klo 13.45

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja 25 %). Vanhat opit: `git show f0e5a3173:docs/raportit/viesti-pelikoodari-luovutus-20261108-0230.md` kohta 2.
Työpuu `/Users/Shared/Claude/wt/proto-pelikoodari-muisti` (haara pelikoodari/glb-esihaku-222) ja `/Users/Shared/Claude/wt/proto-pelikoodari-fpv` (pelikoodari/fpv-lentomalli). Etävarasto natiivi-backup.
Huom: pelikoodarin checkout oli vaihdettu haaraan koti/Matkakirja-pelikoodari (ei minun tekemäni); luovutus tehtiin tähän haaraan ja checkout palautettiin koti-haaraan.

## 0. Valmis tänään
- Lataus c (kopiot rinnalla, e59541a34) **junassa 222** (JU 13.24, kärki da7bfbef4). Kuvapari katsottu täysikoossa: ei eroa. Esipurku jäi QA:ksi (ei lyhentänyt).
- **AVOIN (PT:n käsky kirjata):** g-ajon kuolema (EI ELOSSA LOPUSSA 13:02:13, esipurku 1, muisti tasainen, ei virheriviä), syy selvittämättä. f samalla esipurulla elossa. Esipurku ei junaan.
- FPV osa 2 **lentomalli 61fc67ce4** (pelikoodari/fpv-lentomalli): `Peli/Fpv/FpvLentomalli.cs` puhdas C# + `Peli-testit/Testit/FpvLentomalliTestit.cs` 13/13, koko sarja 884/884, unity-tarkistus 0. Raportoitu PT:lle 13.4x. Ei junaan. Seuraavaksi NS:n osa 4 käyttää (tila Sijainti/Asento/Nopeus, Askel, Palauta(…, leijuen), Ylos-vektori). Jos PT pyytää jatkoa: propwash ja kosketustikkujen syötteen muunto (NUI osa 3) ovat seuraavat.

## 1. TYÖN ALLA: glb-esihaku (PT 13.4x; hyväksyntä ≥ 0,8 s yli hajonnan, huippu ≤ c + 50 Mt, elossa lopussa; junaan vain PT:n sanalla)
- 9c40eb7e3 (pelikoodari/glb-esihaku-222, c:n päällä): `JuoksuV4Maailma.Esihaku.cs`; palatsin LOD0-kierroksen jälkeen (JuoksuSokkeloMaailma.Lod0Valmis) juoksun sisällön glb:t haetaan ja jäsennetään taustalla, lataajat ottavat HaeGlb:llä. QA `ui juoksupeli palatsi glbesihaku N` (N ketjua, 0 pois), oletus 0.
- **JU:n jonossa** (13.5x, pid 69238 T/pk-glb.zsh; NS:n kehän ja NUI:n kartta-lukittu-3:n jälkeen): skenaariot `_tyo/pelikoodari/juoksu-lataus/sk-ipad-glb-{0,2}.txt` järjestyksessä 0,2,0,2,0,2 → `lokit/pelikoodari-lataus-glb-{0a,2a,0b,2b,0c,2c}`.
- Kun lokit tulevat: `grep "latauksen ositus\|glb-esihaku\|LOD0-kierros" <loki>/muisti-tarkka.log`, huippu kuten TULOS-3:ssa (suurin fp N-riveiltä avauksesta eteenpäin), ELOSSA `merkit.txt`. Vertaa 0- ja 2-ajojen keskiarvoja ja hajontaa. Odotus: 2-ajoissa "uusi juoksu" → "latauspalkki lopussa" lyhenee (c: 153,1 → 156,0 s), osui ≈ tiedostomäärä.
- Täyttyy → PT:lle ≤ 3 riviä (ajat, huiput, sha, TULOS-3) + ehdotus oletukseksi 2 (uusi commit) ja kuvapari JU:lla (aja-kuvat-c.sh mallina). Ei täyty → ehdotus jättää QA:ksi. Lisää rivit TULOS-3:een.

## 2. Muut (ennallaan)
Keisari c92dafe1f ja lataus ab113e0ac junassa 221. Lontoon maanpinta a7ad5fc24 kokeena haarassa. Latauskuvat 190d6c094 NS:llä.

## LISÄYS 13.5x – ENSIMMÄISENÄ (PT: OMISTAJAN PYYNTÖ 13.44 "Droneen kannattaa etsiä jokin valmis koodi")
Hae valmis avoin FPV-acro-lentomalli tai Unity-dronesäädin, lisenssi MIT, Apache tai BSD; EI GPL (Betaflight GPL-3.0 → sen rate-kaavat vain omana koodina, kuten 61fc67ce4:ssä).
Vertaa omaan 61fc67ce4:ään: tuntuma (acro, rates, moottoriviive, vastus), testattavuus (puhdas C#, Peli-testit), skaala (Skaala-kerroin), pallon ylös-vektori.
Suositus yhdellä valinnalla: valmis koodi / valmis + omat lisät / oma. Valinta perusteluineen PT:lle (≤ 3 riviä + tiedosto) → PT vie KK:lle ennen sovitusta.
Lisenssiteksti talteen (esim. _tyo/pelikoodari/fpv/LISENSSI-<projekti>.txt). Haku robots.txt-sääntöjen mukaan; Sonnet-agentti käy hakuun.

## LISÄYS 14.3x – OMISTAJAN PÄÄTÖS klo 14.25 (PT 14.30) FPV-dronesta: "Pienoismallina"
×15-kohokartta on iso pienoismalli, jonka yllä pieni drone lentää nopeasti. Drone pidetään etäisyydellä, jolla kartta on vielä siisti (NS ehdottaa rajan metreinä kuvaparista).
Vertailuun (valmis koodi vs 61fc67ce4): lentomalli ja vauhti pienoismallin mittakaavassa (dronen oma mittakaava, ei maailman ×15 -skaalausta sellaisenaan: tarkista, sopiiko Skaala-parametri vai tarvitaanko erillinen pienoismallikerroin), ja **alin sallittu etäisyys maastosta parametrina** (FpvParametrit-kenttä; törmäys/raja itse NS:n osassa 4). Valinta PT → KK ennen sovitusta.
