# Pääkaupunkien pistokoe e01 + e02 (Sisältökirjuri 11.10.2026)

Haarat origin/paakaupungit-e01-pilvi (Minsk, Podgorica) ja origin/paakaupungit-e02-pilvi (Monaco, Andorra la Vella). Menetelmä: Sonnet-agentti per kaupunki, väitteet (luvut, vuodet, nimet, kysymysten fact-kentät) ≥ 2 lähteellä, kuvat Commons-sivulta (tiedosto, lisenssi, tekijä, kuvatekstin osuvuus, kasvot/teksti/väkivalta, PD-tekijän 70 v). **Korjauksia ei ole tehty aineistoon.** Yksityiskohtaiset raportit ja valmiit "Korjattu lause" -rivit sisalto.json-poluilla: `docs/raportit/paakaupungit-pistokoe-e01-e02/paakaupungit-pistokoe-<kaupunki>-20261011.md`.

| Kaupunki | Väitteet OIKEIN / EPÄTARKKA / VIRHE | Kuvat (kuvateksti) | Pakolliset korjaukset |
|---|---|---|---|
| Minsk (e01) | 16 / 14 / 1 (26 väitettä, osa ryhmiä) | tiedosto+lisenssi 17/17; teksti 14 / 2 / 1 | maailmanpyörä 54 m (ei 56), rautatie 1873, metro 29.–30.6.1984, 1897 kielijakauma (jiddiš), sodan luvut, Punaisen kirkon päivä |
| Podgorica (e01) | 16 / 12 / 2 (30) | 13 / 1 / 0 | sääluvut (saa.json malli väärin), Vanha silta (Adži-paša vs. Vezirov most), Doclea-ajoitus, tupakkateema |
| Monaco (e02) | 26 / 12 / 4 (42) | 7 / 2 / 0 | 600→500-luku eaa., anafylaksia (Princesse Alice II, ei Hirondelle), hissit ~80 + 37 liukuporrasta, ilmastoluvut |
| Andorra la Vella (e02) | 20 / 8 / 0 (28) | 6 / 1 / 0 | väkiluku = seurakunta, 1419 = tunnustus, Santa Coloman maalausten sijainti (Espai Columba), ilmasto pois |

Yhteensä väitteet: OIKEIN 78, EPÄTARKKA 46, VIRHE 7. Kuvat: tiedostot, lisenssit ja tekijät täsmäsivät kaikissa; ei tunnistettavia kasvoja eikä väkivaltaa; yksikään PD-kuva ei riko 70 v -sääntöä; ongelmat vain kuvateksteissä.

## Toistuva virhetyyppi

**Luvut:** yhden lähteen (en-Wikipedia/Wikivoyage) tarkka luku tai päivämäärä esitetään varmana, vaikka muut lähteet poikkeavat. Toistuvat alatyypit: (1) kohteen laajuus sekoittuu (maa/seurakunta/kaupunki: Andorran väkiluku); (2) mallinnettu `saa.json`-ilmastodata kopioitu tekstiin kaikissa kolmessa tarkistetussa lehdessä (Podgorica, Monaco, Andorra: lämpötilat ja sademäärät väärin) → ilmastoluvut pois tai korvattava lähteellä, ja `saatiedot` tarkistettava kaikista e01/e02-lehdistä; (3) tarkat päivät (vihkiäis-, avajais-, valmistumispäivä) ja rakennus-/perustamisvuosi vs. tunnustamis-/vihkimisvuosi; (4) lisäksi suomennos/nimivirheet (600-luku eaa., Hirondelle/Alice II) ja kuvatekstit jotka kuvaavat muuta kuin kuvaa (Minsk K1, Monaco N2, Andorra T4, Podgorica Plantaže).

## Andorran 2 EPÄVARMAA – ratkaisu

- Halévy-noston kuva (T4, Sant Esteven sisätila ei liity oopperaan): vaihda Commonsin PD-kuvaan "Halévy - Le val d'Andorre - 3ème acte - dessin d'H. Valentin, 1848.png" (BnF/Gallica, painettu kuvateksti rajattavissa pois); selite ja lähderivi valmiina Andorra-raportissa. Pilviagentin väite "oopperakuvaa ei löytynyt" oli väärä.
- `valokuva.vuosi`: EXIF-ottopäivä 22.8.2013 → vuosi "2013" (ei "2010-luku").

## Huomioita PT:lle

- Monacossa ja muissa tietovisoissa oikea vastaus on kysymyksissä aina ensimmäinen vaihtoehto: tarkista, sekoittaako peli vaihtoehdot ajon aikana.
- Podgoricassa tupakkatehtävä nojaa yhteen Wikipedia-virkkeeseen; agentti ehdottaa Plantaže-kysymystä sen tilalle (päätös PT).
- Menetelmä kannattaa muuttaa pilviohjeessa: ilmastoluvut vain jos lähteenä viranomaisnormaali; tarkat päivämäärät vain 2 lähteellä; kuvateksti kuvaa vain sen mitä kuvassa näkyy.
