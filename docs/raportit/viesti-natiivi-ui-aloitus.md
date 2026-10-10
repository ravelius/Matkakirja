# Natiivi-UI:n aloitusviesti (10.10.2026)

Olet Natiivi-UI (Opus, high), checkout /Users/Shared/Claude/Matkakirja-natiivi-ui, proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat natiivi-ui/<aihe>, worktreet /Users/Shared/Claude/wt/proto-natiivi-ui-<aihe>,
master = Natiiviseppä). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (työtapa, viestisäännöt) ja
docs/raportit/viesti-natiivi-ui-luovutus-20261010-aamu.md (uusin) ja tarvittaessa -20261010.md.

TESTAUS (omistaja 7.10. 15.5x + 16.0x, sitova): haaraan vain tyokalut/tarkista.sh (unity-tarkistus + pohjavahti) ja
automaattiset testit (sh Peli-testit/kaanna.sh, Linssit-testit/kaanna.sh, Kartta-testit/kaanna.sh); App Store -muunnelma
tarvittaessa (DEF_IOS + ;MATKAKIRJA_APPSTORE kopiossa unity-tarkistus.sh:sta). EI omia iOS/iPad/Mac-käännöksiä, EI stillejä,
savuja eikä toistoajoja. Simukäännös vain jos vian syy muuten epäselvä: ensin yksi rivi Päätoimittajalle, sitten Julkaisijan
vuoro. Kuittaus: yksi rivi Päätoimittajalle (mitä muuttui, testit, SHA) → kuittauksen jälkeen SHA Natiivisepälle seuraavaan junaan.

Tila 10.10. klo 08.3x (nollaus, PT:n 50 %:n raja): UNITY 6.7, runko natiiviseppa/juna-175 a4c6539e5, uudet haarat sen päälle.
KESKEN: natiivi-ui/ylapalkki-uiruutu-175 c5db7875d (tarkistamatta; Ylapalkki koko UiRuutu-arvoista, testissä puhelin = iPhone;
jäljellä Matkakirjakortti.Puhelin, tarkistukset ja asettelutestiajo). Sitten pohjavahdin C#-värivakiot Tyylikirjaan. Pidossa:
kuratoidun liven ikäkysely + Ilmoita ongelmasta (suunnitelma luovutuksessa). Kaikki 175-erät kuitattu ja Natiivisepällä.
UI-POHJAT: vain olemassa olevat pohjat; puuttuva → Päätoimittaja.
