# Karttaseppä: tila 11.11.2026 klo 02.04 (KS)
Korvaa -0132:n; taustat ja työkalut: `git show 91be273d8:docs/raportit/viesti-karttaseppa-luovutus-20261111-0132.md` (ja sen ketju -0105, -0010).

## Tehty 01.47–02.1x
- KJ22 Louvre + KJ23 Invalidit katsottu → KK 01.50 HYVÄKSYI molemmat junaan.
- Palat: raivaus-1-1-louvre/palat-v28-louvre-invalides-1-1 (kokoa-v28.py) = v27 + Louvren 5 palaa ulos-lv:stä; md5: = KJ22:n v25-louvre-opera paitsi Invalidien pala, = KJ23:n v27 paitsi Louvren palat.
- Paketti koodijuna/talot-paketti-pariisi-v7 (v6→v7 10 palaa 5,6 Mt, SHA256SUMS ok; työkalu proto tyokalut/talot_paketti.py).
- JUNAEHDOKAS 73e4fa159 (natiivi-backup karttaseppa/louvre-invalidit-juna-v7) = juna-224 69de2ef77 + merge 8f647a8d4 + Oletus += louvre, invalides
  + pariisi.json v7 + KoodimallienAvaimet-testi. Testit 754/911/unity 0. PT:lle 02.02 (JU yhdistää). Haarassa SC/SCh-koodi, ei oletuksessa.

## Käynnissä / seuraavat
- KJ24 Sacré-Cœur (sk-mac-sacre-coeur-kj24.txt, 8f647a8d4, 5 kuvaa sc24-*) JU:lla → lokit/karttaseppa-sacre-coeur-kj24-8f647a8d4. KJ15:n lähikuva oli mäen sisällä
  (kaari 0,0025). Katso mikä kaari (0,004/0,006/0,009, eletila) on mäen yläpuolella → KK:lle kuva + YKSI rivi mäen ratkaisusta.
- Sainte-Chapelle KSC=1: raivaus-1-1-louvre/aja-palat-sc1.sh korvaus-11.json sc1 → ulos-sc1 (taustalla, loki palat-sc1.log). Sitten v29 = v28 + vain Citén
  palat ulos-sc1:stä (korvaus-11:n Invalidi-maski vanha → ÄLÄ ota Invalidien paloja) → Mac-ajo KK:lle.
- Louvren F-jalanjälki (KK: ei estä junaa, erillinen pieni korjaus): 1:1-maski "relation/3262297 + 4 m + koskevat talot" poistaa Rivolin pohjoispuolen talot
  (louvre-tarkistus.jpg). Rajaa maski Rivolin eteläpuolelle → uudet Louvren palat.
