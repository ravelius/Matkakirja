# Merge-pyyntö: natiivi-ui/tyyppikuvake 79a49af (masterin bcc46ef päällä), Natiivi-UI 25.9.2026

Testit: unity-tarkistus 0 virhettä, uss ok. Testikäännös b12j.

## Malli (web)
js/fokusnosto-symbolit.js nostosymKortinYlarivi ja js/fokuskohteet.js kohteenKategoria ja kohteenYlarivinNimike.
Web-kuvat web-tyyppikuvake-iphone.png ja -ipad.png (Carcassonne). Mitattu tuotannosta 24.9.: symboli 1,5 em
(16,3 pt) rivin alussa, 0,4 em (4,35 pt) oikealla ja kaiverruskuva 14,1 pt.

## Toteutus
- NostoSisalto.cs: Nosto.Symboli. Symboli tulee noston datasta: skandaali huuto, hetki, eläin, täkynosto ja syvennys
  oma symboli (tuntematon → huuto). Kohteen symboli tulee KohteenKategoria-säännöllä: kadonnut ihme, oma symboli,
  kierros → silma ja muuten tyypin symboli. Luokkanimi seuraa symbolia (NOSTOSYM_LUOKAT), ja luonnolla laji tulee perään.
- Nostokortti.cs Ylarivi, ja Kartta.uss .mk-nosto__ylarivi-symboli.
- 13 png:tä kansiossa UI/Resources/Symbolit/sym-*.png (webin assets/kartat/symbolit/sym-*.webp). **.metat syntyvät
  editorissa**, joten avaa projekti kerran ennen mergeä tai ota ne käännöspalvelun metat-kansiosta.
- Hetkellä ja ihmeellä ei ole kuvaa, koska ne ovat webissä koodipiirtäjiä. Niillä rivi näkyy ilman symbolia.

## Kuvapari
- kuvapari-b12j-tyyppikuvake-iphone.jpg ja -ipad.jpg: torni ja HISTORIA ovat samassa paikassa ja samassa koossa kuin
  webissä.
Erot, jotka eivät kuulu tähän erään: iPhonen yläpalkki (hyväksytty iPhone-asettelu) ja webin Havainnekuva-merkintä.
