# Laitetestaaja → seuraava sessio: luovutus (24.9.2026 ilta, konteksti 71 %)

## 1. PR #3076 (laitetestaaja-inventaario-ipad)

OPEN, ei vielä mergetty. Sisältää nappi-inventaario-natiivi-20260924.md
(web-vs-natiivi 12 osiossa) ja pariteetti-natiivi-20260924.md:n
päivitykset. Viimeisin commit 818a9a7b1 + tämän vuoron push (ks. alla).

## 2. WEB ON MALLI, MITATTUNA (Raamattu 9ebc5784c, sitova — LUE KOKONAAN)

Natiivi tehdään täsmälleen web-mallin mukaan: mitat (px), zoomikynnykset,
vaiheet. ÄLÄ hyväksy näkymää PASS:ksi ilman web–natiivi-kuvaparia
SAMASTA pelitilasta JA mittoja. Rakennevertailu ("näyttää samalta")
EI RIITÄ. Työkalut: tools/pariteetti-web-kuva.mjs,
tools/pariteetti-web-lehti.mjs (iPhone 393×852, iPad 834×1194). Tämän
session aikana löytyi näin yksi aiemmin huomaamaton, oikeasti mitattu
ero (rivi 9, maalehden palstoitus) ja yksi väärä PASS peruttiin (rivi
30, topografialinssi ei ollut edes auki kuvassa). Suurin osa TÄMÄN
kierroksen SAMA/PASS-merkinnöistä on YHÄ vain rakennevertailtu — jatka
mittaamalla, älä oleta.

## 3. Pariteettiraportin avoimet rivit (pariteetti-natiivi-20260924.md)

- **Rivi 9 (maalehti, Ranska): VAHVISTETTU FAIL, mitattu.** Web iPad-
  leveydellä (834×1194) kaksipalstainen (PERUSTIEDOT vasemmalla ≈36 %,
  kartta oikealla ≈41 %), natiivi yksipalstainen pino (kartta 94 %
  leveydeltä ylhäällä, PERUSTIEDOT alla) — sama mobiiliasettelu myös
  iPadilla. Reititetty Natiivi-UI:lle, ei vielä korjattu.
- **Rivi 12/12b (linssin selite): YHÄ ODOTTAA.** Natiivikuva vanha
  (ennen erää 3/4), Natiivi-UI:n pitää ottaa uusi.
- **Rivi 14 (asetukset/offline-lataukset): HYVÄKSYTTY POIKKEAMA**
  (omistaja vahvisti tänään, ei enää avoin — nappi-inventaariossa jo
  päivitetty, mutta pariteetti-natiivi-20260924.md:n oma rivi 14 on
  vielä vanhalla "Laitetestaaja tarkistaa onko offline webissä muualla"
  -muotoilulla, kannattaa siistiä samalla kun rivi käydään läpi).
- **Rivi 40 (keksinnöt-karuselli): rakenne PASS, EI mitattu.**
  Natiivissa keksijän kuva sulautuu pallon päälle, webissä erillinen
  kehystetty kortti + filminauha — voi olla vain eri hetki, ei
  varmistettu bugiksi WEB ON MALLI -tarkkuudella.
- **Rivi 41 (linssi: maatiedot): EI VERTAILUKELPOINEN, molemmat
  tyhjät** — odottaa Pelikoodarin työkalukorjausta JA Natiivi-UI:n
  uutta natiivikuvaa.
- **iPad-portin läpikuultava jäänne**: `uusi-peli`-komennolla
  käynnistetyn pelin jälkeen MATKAKIRJA-portti jäi läpikuultavana
  näkyviin aktiivisen pelin päällä useiden sekuntien ajan, toistui 2-3
  kertaa, korjaantui itsestään. Kuva `portti-bleed-bug.png`
  (proto-3d/lokit/build6-tarkistus-20260924/ipad-pariteetti/). EI
  VARMISTETTU oikealla kosketuksella (vain testikomennolla) — voi olla
  testiartefakti. Tarkista uudelleen heti kun kosketuslupa iPadille on
  voimassa (se oli aiemmin toiminut, mutta tarkista pysyykö).

## 4. EI TARKISTETTU -osiot (nappi-inventaario-natiivi-20260924.md)

Suuri osa osioista 3 (laukku, osa), 5 (lukijaäänen dialogi), 6 (osa:
sisällyspaneelin sulkeminen, maalehti-liite-linkki, saapumisdialogin
napit), 7 (isoisän linssi 1873, astronautin kamera, vertailulinssi,
maatiedot), 8 (osa: aloita peli -nappi, kohtaamisen suurennos), 10
(sähkeen toiminta: eroa retkikunnasta, kaveriapu, palautelomake), 11
(pöllön toiminta: ehdotukset, chip-rivit) ja 12 (osa: vanha äänite)
jäi EI TARKISTETTU -tilaan. EI tiedossa olevia bugeja, mutta EI myöskään
positiivista vahvistusta. Jatka nämä ENSIN mittaamalla (WEB ON MALLI),
sitten build 9 -rivit.

## 5. Build 9 (1.0.0, 202609241305, proto-master 9a5618b)

- Sisältää: dice-roll-korjaus (pelikoodari/liiku-tanne d7a6e4d,
  testi/b10 6f2acd5 -haarasta) — MOLEMMAT Pelikoodarin pyytämät
  tarkistukset PASS iPhonella tänään (ei listakorttia nopanheiton
  jälkeen, kaupunkikortissa ei Liiku tänne -riviä oikealla
  pelipolulla). iPad-kuvapari VIELÄ TEKEMÄTTÄ (laite oli Natiivi-UI:lla
  luovutushetkellä) — tee ensimmäisenä kun laite vapautuu.
- **TEKEMÄTTÄ: lennon esilatauksen mittaus.** Fable pyysi: mittaa
  lennon esilataus lokirivistä "lennon pinta: vaihto t=…, esilataus
  V+E/Y, välimuistista/verkosta" Lontoo→Ateena-lennolla ja raportoi
  luvut. Ei aloitettu ajanpuutteen vuoksi.

## 6. Laitteet

- **iPhone 18 Pro (1572C658)**: kosketus toimii, käytetty koko
  session. Build f6de924 asennettuna (= build 8:n proto-master).
- **iPhone 17 (FB234D08)**: KOSKETUSLUPA PUUTTUU YHÄ (Simulator-
  paneelista "Let Claude use it") — kaikki tämän session FB234D08-testit
  ajettu peli-komento.txt/ui-komento.txt-protokollalla, ei kosketuksella.
  Pyydä omistajalta uudelleen jos tarvitset oikeaa kosketustestiä
  tällä laitteella.
- **iPad Pro 11" M5 (503000D1)**: kosketus toimii. Jaettu laite —
  sovi vuorot Natiivi-UI:n ja Natiivisepän kanssa suoraan (toimi
  hyvin tänään).
- **UUSI LAITE TULOSSA: iPad 00008103… (iso iPad, 1024×1366)** —
  Fable mainitsi tulevan testilaitteeksi, ei vielä käytetty. Tarkista
  simulaattoriluettelosta kun aloitat.

## 6b. UUSI PYYNTÖ Natiivisepältä (saapui luovutushetkellä, ei aloitettu)

Löydös 26 (lähin zoomi, Pariisi): web-kuvat tuotannosta lähimmässä
sallitussa zoomissa (kamera.js: 60 lautayksikköä/1,8° työpöydällä, 40/
1,2° puhelimella), koot 393×852 ja 834×1194. Natiiviseppä odottaa
näiden valmistumista JA että "b10-kuvauksesi (liiku-tanne iPad)" on
tehty ennen kuin asentaa testi/b10b:n (868d439,
natiiviseppa/zoomi-kallistus) — ilmoita polku hänelle kun kuvat on
otettu. Tee tämä HETI iPad-liiku-tanne-kuvan jälkeen (kohta 7.1).

## 6c. UUSI PYYNTÖ Pelikoodarilta (saapui luovutushetkellä, ei aloitettu)

Kuvapyyntö testi/b10b:lle (pelikoodari/avausteksti-portti d4950c0,
omistajan päätös klo 16.1x): polku portti → "Uusi matka" (tai "Aloita
seikkailu"), varapolku `ui aloitus avaus`. 1) ~4 s kohdalla →
natiivi-avausteksti-kesken-{iphone,ipad}.png. 2) kun VALITSE
ALOITUSKAUPUNKI -nappi näkyy → natiivi-avausteksti-valmis-*.png. 3)
napin painallus → pallo SUORAAN valintanäkymään (EI Lontoo-zoomia),
pulu esittelee → natiivi-valinta-*.png. 4) napautus tekstiin kesken
kirjoituksen → kertoja vaikenee, pallo avautuu heti (kuva
vapaaehtoinen). Kansio proto-3d/lokit/avausteksti-web-20260924/ (web-
vastineet samassa). Kerro tulos Pelikoodarille ja Natiiviseppälle.
**HUOM**: tämä avausteksti-korjaus (portti→pallo suoraan, ei Lontoo-
zoomia) voi olla ristiriidassa aiemmin tänään testatun ja PASS-
merkityn "NATIIVIN ALOITUSKAAVAN" kanssa (zoom-kuminauha-osio, ks.
build6-tarkistuslista-20260924.md) — tarkista Fablelta/Raamatusta
kumpi on voimassa ennen PASS/FAIL-merkintää.

## 7. Seuraavat askeleet (priorisoitu)

1. iPad-kuvapari testi/b10:n dice-roll-korjaukselle (Pelikoodarille).
2. Rivi 9:n korjauksen uusinta kun Natiivi-UI ilmoittaa (mitattuna!).
3. Rivit 12/12b, 41 kun Natiivi-UI/Pelikoodari ilmoittavat uusinnasta.
4. iPad-portin läpikuultava jäänne: varmista oikealla kosketuksella.
5. Lennon esilatauksen mittaus build 9:llä (Lontoo→Ateena, "lennon
   pinta" -lokirivi).
6. Jatka nappi-inventaarion EI TARKISTETTU -osioita mittaamalla.
7. Uusi iso iPad (00008103…) — ota käyttöön kun sopiva hetki.

## 8. Työtavat, jotka toimivat hyvin tänään

- `peli-komento.txt`/`ui-komento.txt`-protokolla toimii ilman
  kosketuslupaa — käytä tätä jos kosketus on estetty jollain laitteella.
- `uusi-peli <n> <kaupunki>` + `odota-tila Kartta` ennen seuraavaa
  komentoa (race condition jos kirjoittaa liian nopeasti peräkkäin).
- Jaettujen laitteiden vuorot: sessiot ilmoittavat suoraan toisilleen
  "laite vapaa"/"otan laitteen N min" — toimi hyvin ilman Fablen
  välitystä.
- PIL (python3) toimii kuvien resize/compress-tarpeisiin (sips oli
  epäluotettava tässä ympäristössä, tuotti liian suuria tiedostoja).
