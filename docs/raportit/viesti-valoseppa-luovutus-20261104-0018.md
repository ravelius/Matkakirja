# Valosepän luovutus 4.11.2026 klo 00.18

Syy: konteksti 25 % (pehmeä raja, luonteva tauko). Edellinen: viesti-valoseppa-luovutus-20261103-2346.md (työtavat, polut). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md.

## Tila
- **k20 = 8d59bea53**, haara linssiseppa2/pariisi-k17 (natiivi-backup), wt /Users/Shared/Claude/wt/proto-linssiseppa2-koko17, p20, 607/607. Ei laitteella, ei Unityssä. Tulos ja AUKI: _tyo/linssiseppa2/pariisi-tyyli/k20/TULOS.md (lue ensin). Pari k20/pari.jpg.
- PT (KK 00.04): isoon iPad-ajoon menee k17, EI tämä; k18-täyttö ei mene nyt ajoon, kulu mitataan isolla iPadilla ennen koko Pariisia. Ei omaa ajojonoa: älä pyydä JU:lta ajoa ilman PT:tä.
- JU: pyysin k19-esikatselun keskeytystä 00.1x (2da5ac229). Tarkista, ettei se jäänyt käyntiin; laitetta en pyytänyt.

## Seuraavaksi
1. Odota PT/KK:n vastaus k20-pariin. Ei uutta isoa erää ennen sitä.
2. AUKI-lista: vaaleat täyttämättömät korttelit, Z13:n väri ja soikion reuna, hautausmaan reuna (KORJAUSLISTA k18), kadut mitattuna 2029:stä.
3. Paikallinen koe: data pariisi-tyyli/k19/data-paikka (mvt13, mvt14). `ELAVA_KOE=<data> ELAVA_Z=17 ELAVA_ALUE=66384,45091,66391,45098 ELAVA_PINNAT=<wt>/Assets/StreamingAssets/ElavaKoealue sh <wt>/Kartta-testit/kaanna.sh ElavaKoe`; kokoa k12/paikallinen/kokoa.py; pari k15/pari.py; mittari k15/mittari.py. Vanha z-kuva pitää poistaa cs/:stä ennen uutta ajoa, ei pakollista.
4. Tiedostot: ElavaTyyli.TeeTalotus (talojako), RantaJaPuistoAvoimiksi (täyttö), ElavaKoealue.KorttelinLaji, Valopohja.PiirrosTasaus.

## LISÄYS 00.25: ohittaa yllä olevan SHA:n
- **k20 = 8d1a79394** (KK 00.16 tehty). Tulos, mittarit ja AUKI: pariisi-tyyli/k20/TULOS.md. Ajo: k20/ajo.zsh on esikatselu, k20/sk-k20.txt komennot; laiteajo PT:n ja JU:n kautta (JU: iPadilla ensin NS f1fb45f10, sitten Tripo).
- k19-esikatselu keskeytetty 00.13 ilman tuloksia.
- Postivahti: nollaus vasta 35 %:n lähellä uudella LUOVUTUS VALMIS -rivillä.

## LISÄYS 00.27: UUSI ERÄ k21 (KK 00.20, PT; EI aloitettu, konteksti 32 %, kova raja 35 %)
Lue KORJAUSLISTA.md (lokit/kk-peli-a94d8e7fb-20261103) osiot k19 ja k20. Pohja: 8d1a79394, sama wt ja haara. JU ajaa 8d1a79394:n isolla iPadilla PT:n sopimana sk-k20.txt:llä; kuvat VS + PT. Pari KK:lle PT:n kautta vasta, kun mittari täyttyy. **Kukin versio omaan kansioon k21/** (virheeni: k19-kansion z13, z15, z17, pari ja data-paikan cs/ ovat k20:n, ja k19/ajo.zsh ohjaa nyt k20:een. Älä kirjoita sinne; siirrä tyokalut/aja.zsh:n polut k21:een, data lukuna k19/data-paikka tai kopio.)
Työkalut k21/tyokalut (paikalliset polut päivitettävä): aja.zsh, kadut.py (L ja kerma), lev.py (katuleveys: scipy puuttuu, tee numpyllä), merkit.py (KK:n kohdat), mvt.py (polygonit).

Tehtävät samaan versioon:
1. **Kerma vain aukioille, rannoille ja kaduille; muu maa taloilla, myös yli 20 000 m².** Korttelikartta: poista ala- ja palarajasääntö (PienetAlueet näkee vain palan ja tuottaa saumoja, jos alaraja palautuu). Ehdotus: täytä kaikki paitsi aukiot, vesi ja puisto; ranta paikallisella säännöllä, koska RantaJaPuistoAvoimiksi käyttää koko aluetta ja riippuu palasta. Täyttö ei saa ylittää todistamatta palarajaa (2,2961, 2,3071).
2. **Iso vaalea katto on rakennus:** kattosävy paletista, ei kerma (TaloSavyt[4] ja FasadiVarit[4] liian vaaleat), musteviiva, enintään noin puoli korttelia. Yli 8000 m² vaaleaksi vain, jos se on yksi rakennus. Testi auki: isot ääriviivat ovat päällekkäin osien kanssa; raja IsoKattoM2 2500 on arvio.
3. **"Ei täyttöä ison rakennuksen ja puiston väliin" vain oikeille pihoille** (nyt puistoon + isoon koko alueelle, tuottaa kermakortteleita). Palatsi säilyy.
4. **Tummat lohkot pois, tummin #85684a.** Syy EI selvillä: 8d1a79394:ssä sisäpihan raja PieniPihaM2 400 korjasi osan, loput oikealla alhaalla näkyvät yhä parissa. Epäilyt: seinät SisaSeinaTummuus, pinta pikselin kohdalla ilman tonepassia, pinnan yksityiskohta. Mittaa pikseliarvo, älä arvaa.
5. **Hautausmaa samaan oliiviin kuin puistot:** HautaKirkkaus 0,9 → 1,0; polut heikot. KK:n "reuna porrastuu" tutkimatta.
6. **Mittari:** L p10 121 (nyt 114), Z13 p90 218 (nyt 198), Z17 kerma ~21 % (nyt 35,9, laskee kohdasta 1), R−B ±5.
7. **Kadut:** mittaa 2029:stä ennen muutosta (KK 00.16: Z13:lla noin 2× leveämmät, silmämääräinen). En ehtinyt mitata. Z ≥ 14 × 0,85 on arvioni, ei mittaus; Z13 KaukoKatu 0,9, KaukoKirkkaus 0,92.
Julkisivu (KK 00.16 kohta 3) ja talokohtainen sävy on tehty 8d1a79394:ssä, KK ei ole vielä nähnyt.
