# Savukierros: juna/b12 (25.9.2026, 04.1x)

Build: juna/b12 @ 15d6a59 (proto-kaanna.sh, iPhone 18 Pro -simulaattori
1572C658). iPad-simulaattori (3B4CDACB) ei käytettävissä — attach jumissa
omistajan lupakyselyssä koko yön, ei ehditty testata sillä.

## PASS

1. **Saapuminen + välikortti (löydös 52):** uusi peli Pariisista →
   isoisän luentakuvasarjan postikortti ("Pariisi: tuoli kääntyi
   ystävää kohti") näkyi kartan päällä, "Ohita" sulki sen siististi.
   Kuva 1.
2. **Kartta (löydös 46):** reliefi, rannikkovyöhyke ja aluerajat/-nimet
   (NORMANDIA, POITOU, BRETAGNE...) renderöityvät siististi sekä
   pystyssä että vaakatasossa, ei repeytymiä. Kuva 2, 5.
3. **Kaupunkikortti + kamera (löydös 48):** `kortti bryssel` avasi
   kortin oikein (kuva, Nähtävyydet/Turistiopas, Kulttuuri ja ruoka (1),
   Historia (1)); asettui uudelleen oikein myös vaakakierrossa. Kuva 3.
4. **Äänet mittarilla (löydös 49):** `puhe paalle` + `luento intro` →
   `puhe.soi=true`, `puhe.aika` eteni 0 → 1,9 s kahdessa sekunnissa
   (todellinen `currentTime`-eteneminen, ei pelkkä play()-kutsu).
5. **Radio veto/lukitus/sulku:** sama touch_path-veto kuin aiemmin
   tarkistetussa radio-veto-korjauksessa — ketju alkaa suoraan
   `Viritys/Haku` (ei enää `Siirtyma`), lukittuu ~1,0 s:ssa
   (`Viritys/Lukittuu` → `Soi GBR Lontoo Resonance 104.4 FM`).
   `linssi pois` sulkee siististi, ei pergamenttisumua. Kuva 4.
6. **Eleet — kierto:** `ui kierto vaaka`/`pysty` kääntää näkymän
   oikein, kaikki elementit (yläpalkki, kortti, kartta) asettuvat
   uudelleen ilman visuaalisia virheitä. Kuva 5.
7. **Yläpalkki iPhonella:** rahapilleri + ☰-valikko oikein sijoitettuna
   koko kierroksen ajan, myös vaakatilassa.

## EI EHDITTY / EI VARMA

- **"Kallistus"-ele:** tulkitsin tämän ensin laitteen kierroksi
  (`ui kierto`, testattu ja PASS). Kokeilin lisäksi kahden sormen
  pystysuoraa vetoa (touch2_path) paljaalla kartalla — kamera pysyi
  täsmälleen ennallaan (0°, sama lat/lon). En tiedä onko tämä oikea
  esto (paljas kartta ei salli manuaalista kallistusta, vain radion
  kaltaiset ohjelmalliset kallistukset kuten `RadionKallistus=40°` —
  jonka testasin ja se toimi) vai epäonnistunut synteettinen ele.
  Tarkenna tarvittaessa oikealla sormella.
- **"Kierron estin":** todennäköisesti sama asia kuin yllä — paljas
  pallo ei reagoinut kahden sormen eleeseen ollenkaan, mikä sopisi
  "estin"-nimeen, mutta en pysty erottamaan estoa ja toimimattomasta
  synteettisestä eleestä ilman lisätietoa.
- iPad-mittaus (3B4CDACB) kokonaan tekemättä (lupa jumissa koko yön).

## Kuvat

`docs/raportit/kaappaukset/savukierros-b12-20260925/`
