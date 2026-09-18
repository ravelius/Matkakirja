# Viesti Fablelle: savukkeen 8k (liuskan keskitys) 18.9.2026

Haara `claude/bold-ride-vow4ki-8k-keskitys` (pohja: julkaisuhaara v1938).
Mitta: `SAVUKE_RUUTU=390 node tools/savukkeet/savuke-pariisi-lahizoom.mjs`.

## Juurisyy

Vaakapaon ehdokkaat (`js/pallolauta/nostot.js`, VAAKAPAKO) mitattiin
**merkin pisteestä** eivätkä **listan vasemmasta reunasta**, joten jokainen
ehdokas oli 14 px liian suuri — se on `VIUHKAN_SADE_PX (26) −
kohdanLaatikko`n sisäreuna `(12)`, eli se matka, jonka rivilaatikko kurottaa
merkkiä kohti.

Mitattu tilanne 390 px:llä: pelinappula seisoo Pariisin merkin kyljessä ja
sen laatikko on `x 109–141, y 351–387`. Liuskan vasen reuna oli `x 139,5`,
eli nappula jäi listan alle **2 px:n** leveydeltä. Nappula on kova este
(paino 50), joten asento ei ollut vapaa. Oikea pako olisi ollut 12 px
(reuna 151,5 → nappulan ohi, oikea laita 353 < 364), mutta kaava antoi
ainoaksi ehdokkaaksi 26 px, jolla lista valui ruudun oikean laidan yli
(sakko 37 455). Kun **yksikään** vaaka-ehdokas ei ollut vapaa, ladonta
haki parasta pystyasentoa — ja koska päällekkäisyys nappulan kanssa
pienenee hitusen jokaisella alaspäin otetulla askeleella (3 060 → 3 030),
voittajaksi tuli viimeinen ehdokas `+3 × riviväli`. Se on täsmälleen
mitattu **78,00 px**.

Liuska ei siis ollut rikki keskityskoneessa eikä mittari lukenut väärää
laatikkoa (mittarin `merkki` on kaupunkimerkin 1 × 1 px:n CSS2D-elementti,
ei liuskan pohjaa): **kolmen rivin pudotus oli 2 px:n paon hinta**, ja se
rikkoi PAATOKSET 34 kohdan 12 keskityksen.

Kohdan 15 a–b muutokset (läpikuultava pohja, 0,8 × fontti marginaalit)
eivät olleet syynä — pohja piirretään rivien mitasta eikä se osallistu
ladontaan.

## Muutos

- `js/pallolauta/aihemerkit.js`: `kohdanLaatikko`n sisäreuna 12 px
  nimettiin vietäväksi vakioksi `VIUHKAN_LAATIKON_SISA_PX`, jotta
  ehdokaslaskenta voi käyttää samaa lukua (ei kopiota).
- `js/pallolauta/nostot.js`: vaakapaon ehdokas lasketaan listan vasemmasta
  reunasta:
  `d = (e.x1 + VIUHKAN_REUNAVARA_PX) − (p.x + VIUHKAN_SADE_PX − VIUHKAN_LAATIKON_SISA_PX)`.

Muuta ei muutettu. `tools/tarkista-niputus.mjs`: kunnossa (396 moduulia).
`node --test tests/*.test.mjs`: `# pass 3604`, `# fail 0`.

## Mittaustulos (puhelin 390 × 844)

| | ennen | jälkeen |
| --- | --- | --- |
| liuskan keskitys | merkki y 387,38, listan keskipiste y **465,38**, **ero 78,00 px**, vasen reuna 139,48 | merkki y 387,38, listan keskipiste y **387,38**, **ero 0,00 px**, vasen reuna 151,48 |
| 8k | FAIL (keskitys false) | **OK** |
| 8j, 8l, 8l2, 8l3, 8l4 | OK | OK |
| yhteensä | 39/41 | 39/41 |

## Muut havainnot (EI korjattu)

1. **Vartio 3 muuttui punaiseksi tämän korjauksen seurauksena** —
   `3. puhelin: yksikään Pariisin nosto ei ole piilossa lähizoomissa —
   kateissa 1: nosto-maalehti-pasteur-meister`. Syy on suora ja
   rakenteellinen: Pasteur–Meisterin merkki on `x 142–206, y 314–326`, eli
   täsmälleen siinä, missä **keskitetty** liuska on. Ladonta piilottaa
   listan alle jäävän musteen tarkoituksella (`piilotetutListanAlta`,
   kohdan 14 velka, omistajan v1937-kuva *"Reims kuultaa läpi"*), ja koska
   merkki (ei vain nimiö) jää listan alle, koko nosto menee piiloon.
   Ennen korjausta vartio 3 oli vihreä **vain siksi, että liuska oli 78 px
   väärässä paikassa** — eli kohdan 12 rikkomus piti sen vihreänä.
   390 px:n ruudulla lista ei voi väistää sitä vaakasuunnassa: pako
   Pasteur–Meisterin ohi vaatisi 76,5 px, jolloin listan oikea reuna olisi
   417 px eli ruudun (364 px) yli.
   **Tämä vaatii omistajan päätöksen**, eikä sitä saa ratkaista agentti:
   joko (a) vartio 3 saa viidennen hyväksytyn tilan *"listan alla"* (kuten
   sillä jo on *kaupunkiliuskassa*, *aihemerkissä*, *poltettu*), tai
   (b) listan alle jäävältä nostolta piilotetaan vain **nimiö** eikä
   merkkiä, tai (c) kamera-ajo (kohta 10) vie kartan asentoon, jossa
   Pasteur–Meister ei ole listan kohdalla.
2. **Vartio 1c on häilyvä ja jo ennestään punainen.** Ensimmäisessä ajossa
   `40/41` (vain 8k punainen), seuraavissa ajoissa `1c. puhelin:
   kaupunkimerkin nimiö on saapuessa ≥ 11 px — 0.00 px (kaupunkimerkkejä
   0)`. Se ei liity tähän korjaukseen: sama punainen mitattiin myös
   koskemattomalla julkaisuhaaralla. Saapumisnäkymässä kaupunkimerkkejä on
   ajoittain 0 kpl — ilmeisesti ajoitus (liuska/nimi ehtii piiloon ennen
   mittausta).
3. Savukkeen vartiot 4b, 7, 7b–7i ja 3c tulostavat *VANHENTUNUT VARTIO* /
   *INFO* — ne on jo merkitty vanhentuneiksi, mutta ne ovat yhä
   `sarjat.json`issa ja vievät ajoaikaa.
