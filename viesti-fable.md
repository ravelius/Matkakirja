# Viesti Fablelle: M5b valmis (v819)

Fable Max raportoi. M5:n toinen osa — kuvataitto, sää ja uutiset — on
siirretty lehti.js:ään.

## Mitä tehtiin

- **js/lehti.js (+369 riviä, nyt 1 554):** ui.js:n rivit 8853–9200
  siirrettiin mallin B mukaan: piirraLehtiKuvat, naytaLehtiSaa,
  asetaSaaRivi, naytaVuosiSaa, naytaMaaUutiset ja avaaUutinen.
  Uudet tuonnit saa.js:stä, uutiset.js:stä ja saatiedot-pakasta.
- **js/ui.js:** 14 260 → 13 912 riviä (remontin alusta −27,4 %).
  Turhentuneet saa/uutiset/saatiedot-tuonnit poistettu.
- Kulttuurisuurennoksen koneisto (huntu, näppäimet, sulku) jäi
  ui.js:ään; avaaUutinen kutsuu sitä ui-olion kautta — se on
  M5c:n/myöhemmän tarkastelun paikka, ei tämän PR:n.

## Löytö: seitsemän savuketta oli rikki mainissa

Savukkeet kutsuvat pelin metodeja selaimessa window.matkakirja.ui-olion
kautta, eikä niitä aja mikään portti — siksi M3:n, M4:n ja M5a:n siirrot
katkaisivat kutsuja kenenkään huomaamatta:

- ui.vaihdaTutkiSivu (M5a) kaatoi kuusi savuketta (esilataus,
  kehittajalehti, lehtiasettelu, lehtiotsikko ×3, lukijan-seuranta).
- ui.tahdistaMaatiedot ja ui.piirraMaatiedotMaat (M3) kaatoivat
  maaselaimen.
- ui.nahtavyydenKaruselli (M4) kaatoi esilatauksen alkupään.

Korjaus tässä PR:ssä: kuusi uutta ohutta delegaattoria UI-luokkaan
(naytaVuosiSaa, vaihdaTutkiSivu, tahdistaMaatiedot, tutkiSivuja,
piirraMaatiedotMaat, nahtavyydenKaruselli). Kävin kaikki savukkeet läpi
ohjelmallisesti: yksikään ei enää kutsu metodia, jota UI-luokassa ei ole.

**Jonoosi harkittavaksi:** savukkeiden ui-kutsut voisi jatkossa turvata
esim. tarkista-niputukseen lisättävällä tarkistuksella (savukkeiden
ui.X-kutsut vs. UI-luokan metodit). En lisännyt sitä tähän PR:ään
(kustannuskuri).

## Portit

- `node --test tests/*.test.mjs`: **# pass 739 / # fail 0**
- tarkista-kaksoisavaimet: ei kaksoisavaimia
- tarkista-niputus: 107 moduulia, ei törmäyksiä
- build-standalone: OK; savuke-dist 5/6 (tunnettu pöllö-FAIL)
- Savukkeet: vuosisaa 8/8, maaselain 6/6, kehittajalehti 4/4,
  lehtiotsikko 17/17, lukijan-seuranta 9/9 — kaikki aiemmin kaatuneet
  heräsivät henkiin. lehtiasettelu 8/10 ja esilataus 15/17: samat
  FAILit toistuvat puhtaassa pre-M4-vertailuajossa (7e65d3d), eli ne
  ovat vanhoja, eivät tämän muutoksen — lisätty jonoosi yllä olevan
  savuke-vahdin pariksi.

## Seuraavaksi

M5c odottaa: maalehti + sisällys (piirraMaaEtusivu, piirraMaaNumerotSivu,
sisallysTiedot, rakennaSisallysLista, piirraVinkkilista, aiheenOtsikko,
piirraKategoria, naytaMaaTunnusluvut, paivitaMediarivit, naytaKieliNappi,
naytaVdemInfo) — suunnitelman mukaan mahdollisesti omaan
maalehti.js:ään. Aloitan kun tämä on mainissa.

Muista poistaa viesti-fable.md ennen squashia.
