# Natiivi-UI: luovutus 3.11.2026 klo 18.15 (konteksti 25 %; suorat aloitukset valmiit, kaatumisluokka löytyi, kekomittari JU:lla)

Edellinen: viesti-natiivi-ui-luovutus-20261103-1727.md (jono 1 ja 2 tehty tässä; 3 ja 4 voimassa alla).

## Tehty
- **c2b687661** suorat aloitukset (osa A; proto natiivi-ui/aloitukset-218, wt/proto-natiivi-ui-aloitukset, peili peili/proto/natiivi-ui/aloitukset-218,
  juna-218:n 1420265d7 päällä). Testinäkymän osio SUORAT ALOITUKSET; Peli/Testihypyt.cs: TestiOsio.Aloitukset, askeleet Tila (uusi matka
  kaupungissa siemenellä PeliOhjain.TestiSiemen, jatko kuten Jatka matkaa: Scripts/Peli/PeliOhjain.Testialoitus.cs), Komento ("kartta:|peli:|ui:|linssi:"
  + rivi suoraan komentojen jonoon: Komennot/PeliKomennot/UiKomennot.Jonoon, LinssiOhjain.SuoritaTestista; EI komentotiedostoa, koska Testiajo.Merkitse
  vaihtaisi kaupungin ionin varadataan), Tauko. Omistajan matka talteen Documents/tallennus-ennen-aloitusta.json (testin siemen ei korvaa).
  Avaus: rivi, matkakirja://testi/<nimi>, "ui testi <nimi>", "ui suora <nimi>" ("ui aloita" oli jo varattu). Aloitukset: pariisi-lahizoom,
  pariisi-keski, lontoo-kylma, bussi-lontoo-pariisi (peli:toiminto + matka pariisi bussi = koko reitti), juoksupeli-taso1, peking (opas piilokaupunki).
  Valmis-rivi "MATKAKIRJA testinäkymä: hyppy <nimi> perillä (x s käynnistyksestä)". tarkista.sh 0, TestihypytTestit 6/6.
  JU otti iso-pakettiin fc539b784; D-todistus (< 15 s isolla) JU:n paketin ajossa – tulos odottaa.
- **Kaatumisluokka** (54b6e3b2c, 2 toistoa, analyysi proto-3d/lokit/nui-lahizoom-20261103/analyysi-54b6e3b2c.md): HALLITTU KEKO. ~9 s Jatkan
  jälkeen joutilasesilatauksessa pääsäie jäätyy 2,5–4,9 s, Mono-keko 0,5 → 2,6–2,9 Gt, fp 4,7–4,9 Gt, ei palaudu; gfx/malloc ennallaan, ei MVT.
  Juuri ennen: "maan kuvien esilataus alkaa GBR" (NostoSisalto.EsilataaKuvat → Esilataa) ja ElavatHetket reitit1873. Muistivahti pysäytti → lähizoom ajamatta. PT:lle kerrottu 18.12.
- **453a76a42** kekomittari (proto natiivi-ui/kekomittari-218, wt/proto-natiivi-ui-kekomittari, peili; 54b6e3b2c:n päällä): Kartta/Kekomittari.cs,
  NostoSisalto/Sisalto Taustalla + ElavatHetket reitit kirjaavat "MATKAKIRJA keko: <työ> +X Mt (keko A → B Mt, ms, samaan aikaan: …)" ≥ 20 Mt.
  tarkista 0. JU:lle pyydetty 1 toisto mittaa.zsh-reitillä → lokit/nui-lahizoom-20261103/iso-453a76a42-1 (viesti jonossa 18.14).

## SEURAAJAN JONO
1. PÄIVITYS 18.2x (PT): NS löysi saman hypyn syyksi oman EnnakoiLahto-esilatauksen (9613f5ad7, GBR 18,2 milj. palaa → keko +2,2 Gt),
   korjaus 80ea01172 (proto-3d/lokit/natiiviseppa-muistihuippu-b2a1d27b7-1755/TULOS.md). JU:lta peruttu 453a76a42:n erillisajo; pyydetty 453a76a42
   mukaan iso-paketin 4e396deaf + 80ea01172 todistusajoon. Kekomittarin ajo: grep "MATKAKIRJA keko:" muisti-tarkka.log/konsoli.txt → mikä työ varaa ~1,2 Gt → korjaus (oma alue, jos NostoSisalto/Sisalto;
   ElavatHetket = Valoseppä/LS, kerro). Jos rivejä ei tule, varaaja on muualla (pääsäie): seuraavaksi Esilataaja-joutilastehtävien nimetty mittaus.
   Tulos PT:lle; korjaus pakettiin JU:lle.
2. D-todistus JU:lta (suora aloitus < 15 s); juoksupelin salit ys/tj/cx/ty/xf Testihypyt.Aloitukset-listaan, kun PK:n salikomento on junassa.
3. Osa C (Pariisin koealue c60372ead) kuvien tultua: ks. luovutus 1727 jono 3.
4. Keisari (luovutus 1626 jono 3) voimassa.
