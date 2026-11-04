# Natiivi-UI: luovutus 4.11.2026 klo 13.56 (konteksti noin 33 %)

Edellinen: viesti-natiivi-ui-luovutus-20261104-1245.md. Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto.

## Tila

**Kartan kääntö, proto `natiivi-ui/kartan-kaanto-219` 311eacd76** (wt/proto-natiivi-ui-kaanto, 7f64cd657:n päällä, koe, ei junaan).
- Mac-kuvista todistettu: kierto, nimet, kuumailmapallo, kallistus, Suorista-nappi (esikatselu-20261104-132514/nappi-*.png, ajettu 6834a6711:llä, joka on 311eacd76:n vanhempi).
- Lippu pystyssä striimikartalla: esikatselu-20261104-135330/z13-*.png. Vika jäljellä: z13-000:ssa lipun yläreuna leikkautuu ruudun yläreunaan. PT:lle kerrottu, PT:n kantaa ei vielä tullut.
- Tulos ja rajahavainto: proto-3d/_tyo/natiivi-ui/kartan-kaanto/tulos-ebc8ce01e.md. Raja (sisä- ja ulkoalueella eri tiet ja sumeus) näkyy Pariisissa ja Lontoossa, ei johdu vain käännöstä; ratkaistaan iPad-kuvasta, KK:lle kerrottu avoimena.
- Todistamatta: maamerkit käännettynä (eivät tulleet kuviin), maavarjo, laitemuisti. 3D-symbolit ovat oletuksena pois. Koodista: maamerkit Karttaesineet.Pysty.
- KS sai 311eacd76:n ja yhdistää kirkon (karttaseppa/nd-kirkko-219 1f082f3f1) omaan yhdistelmähaaraansa.

**Nousukuvat, proto `natiivi-ui/nousu-pieni-219` 176c41f2d** (wt/proto-natiivi-ui-nousu-pieni, 7f64cd657:n päällä, omistaja 13.01, ei junaan ilman omaa kirjausta).
- Koko 56 % ruudusta (TraileriTausta.NousuOsuus 0,75), kuva lepää nousupisteen lähimmässä kokonaan ruudulla olevassa paikassa (TraileriLiike.NousuLepo). Vaihtoväli 2,9 s ennallaan.
- Simukuvat ja video: proto-3d/lokit/nui-nousu-pieni-801c1a8ee-20261104/ (kansion nimi vanha, ajettu 176c41f2d). Macin batch-ajo sijoittaa nousupisteet väärin (640×480), joten alkupaikka arvioidaan vain simulla.
- KK:lle viety: kartta näkyy, mutta kuva peittää alkupaikkansa. Suositus: noin 35 % ruudusta ja kuva pisteen viereen. **KK:n vastaus odottaa; ei toteutettu.**

## SEURAAJAN JONO
1. **C1:n loitonnus koko Ranskaan (PT 13.5x, tulos yhdellä rivillä PT:lle, ei korjausta ennen sitä).** Simussa kamera ajaa maan rajaukseen 1,7 s C1:n jälkeen: `saapuminen: FRA Korkeuteen → (46,612, 2,352) … 1389,1 km`, 13:51:51 konsoli.txt.
   - Seitsemässä 3.11. saman reitin ajossa (esim. julkaisija-paketti-iso-a92302399-1856/konsoli-s-bussi-lontoo-pariisi.txt) loitonnusta ei ole. Omassa ajossa on. Syy on auki: 176c41f2d, 7f64cd657 tai ajotapa. Minun aiempi "ei tästä muutoksesta" oli liian varma; PT:lle korjattu.
   - Komento varmistamatta. Ehdokkaat: PeliOhjain.Kartalle(true) → Saavu (PeliOhjain.cs:1290, kutsut 773, 2363) ja Saavu 2424. Lisää kutsujan selvitys lokista tai pinosta.
   - **Vertailuajo pyydetty JU:lta, vuoroa ei vielä tullut:** 7f64cd657, sama skripti (kopioi lokit/nui-nousu-pieni-801c1a8ee-20261104/ajo.zsh uuteen kansioon, vaihda K ja sha, poista "hiljaa" vain jos haluat testata ajotapaa). `SIMU_MUISTIRAJA=16 zsh tyokalut/simu-lukko.sh kaari natiivi-ui yhteinen-iPad13 -- zsh <ajo.zsh>`, ja rivi JU:lle, kun L2 ja lukko ovat vapaat.
2. **KK:n vastaus nousukuvista:** kun tulee, koko TraileriTausta.NousuOsuus ja paikka TraileriLiike.NousuLepo (pisteen viereen, ei päälle). Simukuva KK:lle ennen omistajaa. Ei iPad-ajoa kartan muistikokeiden edelle.
3. **Lippu z13-000:** toimi PT:n kannan mukaan.
4. **iPad (kääntö):** vain JU:n vuorolla ja kun 7f64cd657:n muistiajo on alle 4080 Mt: neljä suuntaa, kallistus, kolme zoomia, muisti ja ruutuaika. Rajahavainto samasta ajosta.
5. **Vanhat 12.45-luovutuksesta (kohdat 5–6):** keisarin `ui tarina viimeinen-keisari` JU:n ajossa, muut ennallaan.

## Muuta
- Liikevahti (tyokalut/tarkista.sh) vaatii TraileriLiikkeen uusiin liikeriveihin merkinnän `// liikepoikkeus:`. tarkista.sh muuttaa ajettaessa tyylikirjatiedostot worktreessä; palauta ne, älä committaa.
- Peli alkaa skenaariossa siitä kaupungista, joka annetaan: Lontoon pelissä zoomi 0,26 on eri näkymä kuin Pariisin pelissä, eikä Ranskan lippu näy. sk-lippu.txt alkaa Pariisista.
