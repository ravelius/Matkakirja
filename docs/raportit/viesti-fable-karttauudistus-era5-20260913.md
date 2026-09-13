# Karttauudistus erä 5: Pariisin kaupunkilehden sivut nostoiksi

*(Opus-työsessio → Fable, 13.9.2026. Haara
`claude/karttauudistus-era5-pariisi`. KESKEN — tämä on
checkpoint-versio.)*

## 0. Inventaario ennen työtä (mitattu)

`node tools/laske-karttanostot.mjs`:

```
FRA Ranska   koh 13 maa 6 elä 1 ska 3 het 6 kul 9 | pää 20 koh 11 | täysi
```

Rajat tehtävänannosta: pääkartta ≤ 21 (budjetti +1), kohdekartta ≤ 17
(budjetti +6).

Pariisin kaupunkilehden osastot (`KULTTUURI_KATEGORIAT.pariisi`):

| osasto | nostoja | lehtitehtävä |
| --- | ---: | --- |
| `kaupunki` (kansi) | 4 | ei |
| `musiikki` | 3 | kyllä |
| `historia` | 7 | kyllä |
| 6 × `hetki-*` | 1 kukin | kyllä |

## 1. LÖYDÖS, JOKA MUUTTAA LUVUN 4.7 TAULUKON TULKINTAA

**Historia-osaston KAIKILLA seitsemällä nostolla on jo karttapaikka.**
Suunnitelma oletti, että kolme pitää vielä viedä kartalle; mitattuna
kuusi on kohdekartalla ja yksi pääkartalla:

| lehden nosto | karttapaikka nyt |
| --- | --- |
| Tuileriain rauniot seisoivat yksitoista vuotta | kohdekartta `syvennys-pariisi-tuileriat` |
| Piiritetyn kaupungin posti kulki kyyhkyillä | kohdekartta `syvennys-pariisi-kyyhkyposti` |
| Nimi, joka oli alun perin pilkkaa | kohdekartta `syvennys-pariisi-impressionistit` |
| Kirahvi käveli Marseillesta Pariisiin | kohdekartta `nosto-kirahvin-kavelymatka` |
| Kaulanauha, joka ei koskaan päätynyt kuningattarelle | **pääkartta** `skandaali-kaulanauhajuttu-1785` (`kattoVapaa`) |
| Kleopatra kirjoitti ranskaksi — ja akateemikko uskoi | kohdekartta `skandaali-vrain-lucas-kirjevaarennokset` |
| Mies myi Eiffel-tornin romuraudaksi | kohdekartta `nosto-lustig-eiffel` |

Luvun 4.7 rivi "kolme parasta kohdekartan pisteiksi + loput neljä
yhdeksi nostoksi" toteutetaan siis näin: kolmen ensimmäisen
lehtiversio poistuu (sisältö on jo klikattavana omalla pisteellään ja
karttakortti on lehtitekstin ylijoukko), ja loput neljä siirtyvät
SANATARKASTI yhteen uuteen nostoon "Pariisin vuosisadat".

Kolmikon valintaperuste ei ole tämän session maku vaan osaston oma
johdanto, joka nimeää juuri ne kolme: *"Samat vuodet jättivät
kaupunkiin kyyhkypostin, palatsin rauniot ja maalaussuunnan, jonka
nimi oli alun perin pilkkaa."*

(jatkuu — työ kesken)
