# Valosepän luovutus 6.11.2026 klo 11.05

Korvaa luovutuksen -1048 kohdat UUSI TYÖ (paletin reitti) ja SEURAAVAKSI 1. Sen CONCORDE, SILLAT, ODOTTAA 1, SEURAAVAKSI 2–3 ja MUUTA pätevät, samoin PT:n sanatarkka usvakäsky. Syy: konteksti 25 %, pehmeä raja (Raamattu 7.37).
En lukenut tässä sessiossa lukulistaa 7.47 kokonaan. Lue se itse.

## USVA: ENSIMMÄINEN TYÖ, EI ALOITETTU
Omistajan päätös 10.47, sanat ja toteutus -1048:ssa ja suunnitelmassa `Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261106-horisontti-ja-puusto.md` (luettu kokonaan, kohdat Häivytys ja Häivytys: suositus). PT 11.0x: "Usva ei odota kuvia pitkään: se on omistajan päätös."
Lähtötieto koodista (Y 251af3c48 suunnitelman mukaan, en tarkistanut riviä): `OhjelmaKohde.shader` `_Usva` = yksi arvo koko mallille, pisteytyksenä `clip`. Sama `NotreDameKirkko.shader`. Tuo korvataan pikseleittäisellä syvyysusvalla. Suunnitelma: Aurinko.cs:294–347 ja PariisiKallistus.cs:75–81 + vakiot.
Tee haaraan `linssiseppa2/ohjelmakohteet` tai omaansa, EI `paletti-reitti`-haaraan. Sha KS:lle ja PT:lle. Ajo KS:n seuraavassa yhteisessä, ei omaa, ei junaan.

## PALETIN REITTI: TEHTY, AJAMATTA
Koodi `linssiseppa2/paletti-reitti` abd7d1dd8 (natiivi-backup, 61e6bdcfe:n päällä, d4d10bdb6 + lippu). Ei junaan. Unityssä kääntämättä. Geometriatestit 19/19 kääntämällä scratchpadiin. Sha ja `ohjelmakohteet/sk-paletti.txt` (8 kuvaa) KS:llä; viesti jonossa 11.04, perillemenoa en tarkistanut. Yhdistyy ilman ristiriitaa nimihaaraan ja 470b2b436:een (d4d10bdb6 kokeiltu git merge-treellä, abd7d1dd8 ei).

Muutos: 11 `Vari.H`-vakiota 44:stä ja Concorden `.bytes`:in 3 väriä (2 ovat lähes sama kulta). Portti `tyokalut/karttapaletti_koodi.py tarkista|muunna`, tarvitsee 470b2b436:n `karttapaletti.py`:n. Omassa haarassa: `PYTHONPATH=<kansio, jossa karttapaletti.py>`.
TODENNETTU: työkalu savy 1 1 1, haalistus 0 vastaa varjostimen laskua (luettu); Pompidou punainen 0,207 ja sininen 0,124, KS:n mittaus kuvasta 0,199 ja noin 0,12. Toinen `muunna` ei muuta mitään.
PÄÄTELTY koodista, EI NÄHTY: 21 erikoismallia eivät muutu, koska Symbolimalli vie värit seepiarampille (suurin C 0,082, `Karttaesineet.Oletus = true`). PT: "21 erikoismallia: kuvasta ratkaistaan, ei koodipäättelystä." Kuvat `em-geysir`, `em-krumlov`; etäisyys 0,3 on arvio. Jos malli ei osu ruutuun, hae etäisyys ja pyydä uudelleen KS:n ajoon.
PT: "Palais Bourbonin trikolori rajan sisään, haalistettuna ... Näytä KK:lle parissa, hän voi kumota." Pari `pb-etu` KK:lle, kun ajo on katsottu.
AUKI: `Kerro`-kirkastukset (Lasi, Pelti, Teras) eivät mene portin läpi, luvut laskettu vain näille perusvakioille, ne ovat lähes harmaita. Tummien lisälaskua (L < 0,45) sovelletaan vakioon, ei AO:lla tummennettuun tulokseen. Grand Palais'ta en tutkinut: suunnitelma sanoo sen olevan rajan alla, en löytänyt sitä näistä tiedostoista. `concorde-vie.py` kirjoittaa kullan uudelleen: `muunna` perään. README-riviä ei lisätty.

## RAYSTAS5: VAIN NUMEROT
`raystas/kuvat5`, JU exit 0. Vertasin numeroina, kuvia en katsonut:
- `r--155` vs `kuvat3/r--155-u25`: suurin ero 4/255, joten oletus 0,25 meni perille.
- `halli-on` vs `halli-pois`: 3,69 % pikseleistä eroaa yli 8/255. En tiedä, näyttääkö kamera hallia. Katso kuva.
- Ylin osa (tavoite noin 0,65) mittaamatta, `r-k--151`, `r-k--188p5` katsomatta.
Tee -1034:n SEURAAVAKSI 1 loppuun usvan rinnalla, sitten sha 35f849838, polku ja AUKI-kohdat PT:lle ja LAV:lle. Älä pidättele usvaa tämän takia.

## SEURAAVAKSI
1. Usva. 2. Kuvat5 loppuun. 3. Siltakuvat ja palettikuvat, kun KS ilmoittaa. 4. Pompidoun muodot KK:n järjestyksellä (värikorjausta ei tehdä: paletti hoitaa).

## MUUTA
Väliaikainen worktree poistettu. Palettityökalun kopio ja koekääntö scratchpadissa eivät jää. zsh: `$R:Assets` tulkitaan `:A`-muuntimena, käytä `"${R}:polku"`.
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut.
