# Erikoismalli: Colosseum (speksi, pohja docs/raportit/erikoismalli-speksi-pohja.md)

## 1. Tunniste ja paikka
- `kohde:colosseum`, avain `colosseum`. Italia, 41,8902 N, 12,4922 E, taso 1 (urheilu).

## 2. Viitekuvat (Commons)
- Ilmasta: File:Aerial View Of The Colosseum Rome Italy Aerial Photography (151212315).jpeg (CC BY 3.0, Giuseppe
  Milo) ja File:Rome airal picture.jpg (CC BY 2.0).
- Sivulta: File:Rome - Exterior of the Colosseum (5178267201).jpg (CC BY-SA 2.0, Dennis G. Jarvis).
- Leikkaus ja pohja: File:Colosseum-profile-plain.png (PD) ja File:Kolosseum Plan 4.jpg (CC BY-SA 3.0).

## 3. Siluetti ja tunnusmerkit
1. Soikea rengas, jossa ulkoseinä on neljä kerrosta: kolme kaarikerrosta ja umpinainen ullakko.
2. Etelä- ja lounaispuolen ulkoseinä on sortunut, ja porrastettu sisärengas näkyy. Pohjoinen puoli on ehjä ja
   korkea. Tämä epäsymmetria on tunnistettavin piirre.
3. Areenan pohjalla on paljastunut maanalainen ruudukko (hypogeum), joka näkyy ylhäältä.
4. Kaariaukot ovat tasaisena rytminä, pohjoispuolella 3 riviä.
- Pois jätetään puolipylväät, istumaportaiden yksityiskohdat ja ympäröivä aukio.

## 4. Mitat ja koko
- Ulkomitat 189 × 156 m, korkeus 48 m, areena 87 × 55 m.
- Yksikkö: 1,0 = 189 m. Pystyliioittelu 1,4, jotta kerrokset erottuvat 30°:n kallistuksessa.
- Koko 60 pt, juuri soikion keskellä, pitkä akseli itä–kaakko (todellinen suunta noin 70° pohjoisesta).

## 5. Paletti ja aksentti
- Travertiini paperi → seepia, sisärengas ja portaat seepia, kaariaukot ja hypogeum muste-kärkiväreinä.
- Aksentti: velariumin kangas (`--sym-historia` #a05c3f 35 %), vain kun se on auki.

## 6. Animaatio
- **Velarium (osa 1):** 16 kangassektoria vedetään ullakon reunalta sisäänpäin aaltona sektori kerrallaan
  (porrastus 0,4 s, jokainen avautuu 1,6 s:ssa), ja areenan keskelle jää soikea aukko. Auki 30–60 s, sitten sulkeutuu
  samassa järjestyksessä.
- **Kyyhkyparvi (osa 2, harvoin):** 8 pientä lintua kiertää kaaren pohjoisseinän yllä 10 s:ssa ja laskeutuu.
- Vaihtelu: KayMinS 40, KayMaxS 80, SeisooMinS 40, SeisooMaxS 120, TaukoTod 1, Puuska 0. Parvi 25 %:ssa tauoista.
- Levossa piirretään 0 kehystä.

## 7. Kolmiot ja LOD
- Ulkoseinä: soikio 40 sivua, 4 kerrosta ehjällä puolella ja 2 sortuneella, 320. Kaariaukot muste-kärkiväreinä
  (ei reikiä) 0. Sisärengas ja portaat 3 porrasta × 40, 240. Areena ja hypogeum 6 × 4 ruutua 96.
- Velarium 16 × 4 = 64 ja parvi 8 × 4 = 32. LOD0 noin 750, LOD1 noin 300 (portaat 1, hypogeum pois).

## 8. Ääriviiva ja perspektiivi
- Reuna ulkoseinälle, sisärenkaalle ja velariumille. Kaariaukot ovat sisäviivoja kärkiväreinä. Perspektiivi juureen.

## 9. Hyväksyminen
- Kuvat: ylhäältä keskellä (soikio, sortunut puoli ja hypogeum), 30°:n kallistus etelästä (kerrokset ja sortuma)
  ja reunalla. Video 10 s velariumin avautumisesta. ≤ 0,3 ms.
