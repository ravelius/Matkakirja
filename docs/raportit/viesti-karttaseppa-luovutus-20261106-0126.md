# Karttaseppä: luovutus 6.11.2026 klo 01.26 (KS)
**Voittaa -0121:n ristiriidassa; lue -0121 sen jälkeen (ajo, korjauksen sisältö).** W:n kärki 65a42c1a8. KK = local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe.

## MUUTOKSET -0121:een
1. **Montparnasse SEIS (KK 01.20, PT 01.2x; Raamattu 11.8):** ei mallia, tilauksia eikä pelityötä ennen omistajan korttia. Mitään ei poisteta. -0121:n ja aiempien työjonojen Montparnasse EI päde. Kerrottu KK:lle: mitään ei ole kesken.
2. **Maastotasot mitattu (VS:n löydös, KK 01.15, PT 01.2x), tulos KK:lla ja PT:llä:** geoidi ei selitä z10/z11-hyppyä. Alue-erot z10–z12 0–2 m (Beauce 0,1), meri 0 kaikilla tasoilla. Syy on z10:n karkeus: Pariisin palassa 23 kärkeä, z12:ssa 453. Montmartren laki z10 58,6 / z12 127,6. Maastoa, 186 m:ä ja VS:n maa-arvoja ei muuteta. Mittari `_tyo/karttaseppa/sarja24-asennus/sc-tasot.py` käyttää pelin omia kolmioita.
3. **Ajon jälkeen lisäksi:** lue `maasto siirtyma` -rivi ennen `sc-matala`-kuvaa. Jos z10 voi olla käytössä, se on todennäköisin jäljelle jäävä leijumisen syy; kerro KK:lle ennen uutta keinoa.
4. Pystysauma: voi olla z10/z11-raja (pituus 2,285 ja 2,461, leveys 48,867), ei todennettu. Ei saumakokeita ilman KK:n sanaa (omistaja 16.41).

## Opit
- Oma Delaunay-kolmiointi antoi z10:lle 48,4 m ja pelin kolmiot 68,8 m: harvan palan korkeus luetaan vain palan omista kolmioista.
