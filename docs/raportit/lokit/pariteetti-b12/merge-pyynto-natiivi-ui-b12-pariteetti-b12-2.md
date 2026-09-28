# Merge-pyyntö: natiivi-ui/pariteetti-b12-2 730f984 (masterin bcc46ef päällä), Natiivi-UI 25.9.2026

Testit: unity-tarkistus 0 virhettä, uss ok. Testikäännökset b12l (179c5e1) ja b12m (864ce23) FB234D08:ssa, molemmat
yhdessä intro-palstojen kanssa. Reititys ja luenta: lokit/pariteetti-ajo/b12-2/natiivi-ui-vastaus.md.

## Sisältö
- **UI-skaala (Fable 25.9.):** iPhonella on oletuksena pisteskaala kuten iPadissa (1 UI-yksikkö = 1 pt = 1 CSS-px),
  editorissa viiteruutu. Vaaka-asento on 874 × 402 (oli 648 × 298, jolloin UI oli noin 35 % webiä suurempi) ja pysty
  402 × 874 (oli 392). UGUI-tilarivi seuraa samaa UiKerros.Pisteskaalaa. `ui skaala viite` palauttaa vanhan.
- **#25 ja #27:** kuva edellä -kortin vaihe 1 on enintään 100 pt yläreunasta (web nostokuvanYlin, NOSTOKUVA_YLAVARA 88).
  iPhonella mitataan näytön yläreunasta, koska yläpalkkia ei ole, ja iPadilla turva-alueen alta.
- **#27:** eläintäyn vakioselite ei ole vaiheen 1 kuvateksti (web kuvatekstiLyhyt).
- **#26:** kokoelman tyypitetty `kuva` säilyy `$kuva`-kentässä. Täkynoston ja kohteen pääkuva puuttui, joten
  Roquefortissa oli 1 kuva, kun webissä on 1/2.
- **#28:** aarteen paljastus webin mitoin. Paikallismallissa on reunahöyhen, koska musta vinjetti ei sävyttynyt.
  Kuva on min(78vw, 384, 46vh). Kaikki tekstit American Typewriterilla, fakta ja kaaren teksti kursiivina riviväli
  1,5em, palstat 432/416 ja Jatka matkaa -napin mitat.
- **#14:** äänentasot webin mitoin (rivijako 25,75, oli 38). Offline-osio mahtuu nyt iPhoneen.
  **Huom:** .mk-pudotus__otsikko (normaali paino, 11,52) ja .mk-pudotus-täyte koskevat myös päävalikkoa, kuten
  webissä, jossa .valikko-otsikko ja .paavalikko ovat yhteisiä.
- **#35:** `ui maalehti <ISO> <sivu>`: numero on sivu (testikomento).

## Kuvaparit (pariteetti-b12/)
kuvapari-b12m-aanentasot-iphone.jpg, kuvapari-b12m-elaintaky-iphone.jpg, kuvapari-b12l-roquefort-iphone.jpg,
kuvapari-b12m-paljastus-iphone.jpg ja kuvapari-b12l-maalehti-aihe1-iphone.jpg (#35: sivu aukeaa; aihesivun omat erot
mitataan seuraavaksi).

## Riippuvuus
natiivi-ui/intro-palstat (erillinen merge-pyyntö) saa iPhonen vaaka-asennossa kaksi palstaa vasta tämän skaalan kanssa.
