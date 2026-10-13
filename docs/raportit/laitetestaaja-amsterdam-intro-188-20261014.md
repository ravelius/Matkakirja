# Amsterdamin saapumistraileri, BUILD 188 (d42257f65), 14.10.2026 ~00.35–00.50

Tehtävä (PT): omistajan bugi "Amsterdamiin siirryttäessä ei tullut introa". Tuore asennus, tavallinen matka kartalta (ei pikasiirtoa), ensimmäinen saapuminen Amsterdamiin.

Reitti molemmilla laitteilla: uusi asennus → Aloita seikkailu → aloituskaupunki Pariisi → Liiku → juna → Bryssel (80 p) → Liiku → juna → Amsterdam (80 p). Amsterdamiin pääsee Pariisista vain Brysselin kautta.

| Laite | Tulos |
|---|---|
| iPhone 18 Pro `0AC1815C` | Amsterdamin traileri SOI: nimi "AMSTERDAM" + alaotsikko "Kanavien ja kapeiden talojen kaupunki" + avauskuva, sen jälkeen isoisän puhe ("Amsterdamin kanavatalon ullakolta…") ja vanha kuva (kirkko). Ohita-nappi näkyvissä. |
| iPad Pro 13 `3622D89D` | Sama: 3 avauskuvaa (kanavasilta, Rijksmuseum, …), nimi, alaotsikko, puhe, Ohita. Konsoli: "ui saapuminen: traileri päättyi 328,628 (8,95 s)". |

Lokin syy-rivi "traileri ei tarjolla amsterdam: <syy>": **ei esiintynyt kertaakaan** (iPadin täysi konsolilogi `--console-pty`, grep "ei tarjolla" = 0). iPhonella konsolia ei tallennettu (Debug.Log ei näy os_logissa); trailerin soiminen varmistettu kuvista.

Muut havainnot:
- Pariisin aloitusintro (6 kuvaa, 18 s) ja Brysselin traileri (8,9 s) soivat myös. Traileri ei siis ole "kerran istunnossa" ainakaan näissä: jokainen saapuminen sai oman trailerinsa.
- Amsterdamin fokusvirta (`fokusvirta-amsterdam.json`) latautui esilataajalla käynnistyksessä, ennen matkaa (rivi 684).
- Tulos ei toista omistajan vikaa: vika vaatii todennäköisesti, että fokusvirrat eivät ehdi latautua 1,5 s:ssa (esim. heti uuden asennuksen/käynnistyksen jälkeen kuormassa, tai kun matkaan lähdetään ennen kuin esilataus on valmis). Tässä ajossa Amsterdam oli 3.–4. liike istunnossa, ~3 min käynnistyksestä, kuorma 1 min 37–80.
- Pikkuhuomio: `simctl` näkee omat laitteet vain T7-sarjassa (`source proto-3d/tyokalut/simusarja.sh`), ei sisäisessä sarjassa.

Kuvat (täysi tarkkuus, iso selite): `docs/raportit/kuvat/amsterdam-intro-188-iphone.png` (1206×2622), `docs/raportit/kuvat/amsterdam-intro-188-ipad.png` (2064×2752).
Ehdotus toistoon: matka Amsterdamiin heti käynnistyksen jälkeen (< 20 s, ennen kuin fokusvirrat ovat ladattu, tai rajoitetulla verkolla), konsoli `--console-pty` mukana.
