# Natiivi-UI: luovutus 3.11.2026 klo 19.15 (konteksti pehmeällä rajalla; kekomittari valmis, animaatiot ja keisarin nimi JU:lla, uusi VIKA selvitys kesken)

Edellinen: viesti-natiivi-ui-luovutus-20261103-1815.md (jono 1 tehty, 3 siirtyi NS:lle; 2 ja 4 voimassa alla).
Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto, peili natiivi-backup peili/proto/<haara>.

## Tehty
- **Kekomittari (jono 1) valmis:** a92302399:n ajossa (julkaisija-paketti-iso-a92302399-1856) keko ≤ 540 Mt kaikissa 7 ajossa, ei yhtään
  ≥ 100 Mt:n taustatyötä, GBR-esilataus ja ElavatHetket eivät kirjaa ≥ 20 Mt → hyppy oli kokonaan NS:n EnnakoiLahto (80ea01172).
  Tulos proto-3d/lokit/nui-lahizoom-20261103/kekomittari-a92302399.md; PT:lle kerrottu.
- **81499acd6 koontitieto** (natiivi-ui/koontitieto-218): versiorivi + Testinäkymä "koottu 3.11. hh.mm · <commit>" (kaannos.txt). JU otti
  pakettiin (a92302399 sisältää). Työlistarivi "iPadin valikossa näkyy, milloin versio on koottu" päivitetty.
- **Pariisin animaatiot isoisa4:lle** (natiivi-ui/animaatiot-isoisa4-218, wt/proto-natiivi-ui-animaatiot2, ea09036dc:n päällä):
  b30b627c2 KS:n reitti (tasot-v7/nui-animaatioreitti, 215 p, 8,9 km; sillat jo pohjassa 04b14e82d), 6b891fd1d kytkin pois → oletus
  (AnimaatiotPelissa = true), PiirrosKerros.Veneet.cs poistettu (yhteiset osat Animaatiot.cs:ään, PiirraLahigKuva Tahdet.cs:ään).
  Kuvat ämpärissä animaatiot-20261102/ (200). unity-tarkistus 0. NS siirtää veneet ja linnut esinekerrokseensa (PiirrosKerros.Esineet.cs,
  AsetaLiikkuva) vasta, kun animaatiot-isoisa4-218 ja koealue-esineet-218 ovat samassa junassa: älä muuta niitä koealueen takia.
- **Todistusajo L1 käynnissä 19.10** (JU:n SIMU NYT L1 19.00): käännös a92302399+6b891fd1d = 114050139, iPad11;
  ajoskripti /Users/Shared/Claude/julkaisija-tyokalut/nui-animaatiot-6b891fd1d.zsh (+ -todistus.zsh), loki samassa kansiossa .log,
  tulos proto-3d/lokit/todistus-animaatiot-6b891fd1d-20261103-1910/TODISTUS.md. Skenaario
  proto-3d/_tyo/natiivi-ui/animaatiot-20261102/skenaario-6b891fd1d.txt.
- **fd8fd6a76 juoksupelin nimi** (natiivi-ui/keisari-nimi-218, wt/proto-natiivi-ui-keisari-nimi; omistaja 19.02): "Viimeisen keisarin
  karkumatka" + "Karkumatkan säännöt" (vain ui.fi.json). JU: paketin kärki (fast-forward), laitteelle seuraavassa käännöksessä.

## SEURAAJAN JONO
1. **Todistusajon tulos:** jos TODISTUS.md puuttuu (sessio nollattiin kesken ajon), katso .log; L1:n vapautus JU:lle rivillä
   "VALMIS: L1 vapaa (animaatiot 6b891fd1d)", jos sitä ei ole lähetetty. OK → kuvapari (kuvat/1-vene0-kaukaa.png, 2-vene1-lahelta.png;
   vertailu edellinen todistus-animaatiot-743728bd7-20261102-2156/kuvat/2-jalkeen.png) PT:lle ja junalupa. Työlistarivi
   "Pariisin uuden piirroksen animaatiot" päivitetään.
2. **UUSI VIKA (PT 19.1x), selvitys kesken:** a92302399 konsoli-2 rivit 625–645: 'ui tarina viimeinen-keisari' 19.09.20 → 0,3 s:ssa
   fp 2671 → 4146 Mt, 2 MemoryWarningia, muistivahdin VIKA. Havainnot tähän asti:
   - keko 470 → 473 Mt ja tekstuurit 687 Mt ennallaan, kuvat 83/300 Mt 41 kpl ennallaan (tarinan 10 kuvaa eivät näy kuvalokissa) →
     ei hallittua kekoa eikä nostokuvien purkua Unityn tekstuureiksi. Kasvu on **gfx 1265 → 2352 → 2687 Mt** (Metal), ja se palautuu
     1179 Mt:iin sekunnissa varoitusten jälkeen.
   - Samassa 0,3 s:ssa valmistuivat kuuden kaupungin saapumislaatat (amsterdam 794, dublin 1013, bryssel 984, luxemburg 434/719
     (285 epäonnistui VIKAn aikana), pariisi 1140; KarttaKerrokset.EsilataaSaapumisalue/SaapumisEra → Laattapalvelin.Esilataa levylle),
     ja "pallo: aloitusportin sumennus 4,5 pt (Gauss)" tulostui kortin avauksessa. Sumennusrivi on muissa ajoissa ilman hyppyä
     (2 × per ajo), joten se ei yksin selitä.
   - Seuraavaksi: (a) mitä tarinakortti piirtää gfx:ään avauksessa (UI/Nostot tarina: 10 kuvaa Painter/RenderTexture? MitaUutta-tyyppinen
     sumennettu tausta?), (b) kasvattaako Laattapalvelin.Esilataa samanaikaisesti valmistuessaan Cesiumin tekstuureja (ei pitäisi:
     levylle). Toista: suora aloitus + 'ui tarina viimeinen-keisari' ilman saapumisesilatausta (SaapumisLaatatPaalla pois) ja kekomittari
     + MuistiTarkka T-rivi rinnalla. Korjaus → SHA PT:lle + JU:lle.
3. D-todistus (suora aloitus < 15 s) JU:n paketin ajossa: a92302399:n suora.txt ja suora-*.png ovat kansiossa
   julkaisija-paketti-iso-a92302399-1856 – tarkista ajat. Juoksupelin salit ys/tj/cx/ty/xf Testihypyt.Aloitukset-listaan, kun PK:n
   salikomento on junassa.
4. Keisari (luovutus 1626 jono 3) voimassa. Koealue osa C on NS:llä (natiiviseppa/koealue-esineet-218): älä jatka rinnakkain.
