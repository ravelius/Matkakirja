# Karttaseppä: luovutus 10.11.2026 klo 19.15 (KS)
Syy: konteksti 29 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -1814:n.
Työlista: `python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava KS` (rivit kirjoittaa PT; tilanteen saa päivittää).
HUOM kello: aja `date` ennen jokaista aikaleimaa. Kansiot alla suhteessa /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/.

## ETUSIJA: 224.36:n korostusvika (PT peruutti korostuksen junasta 191aaeaf2; palaa korjattuna omalla numerollaan)
- Omistajan kuva 18.53 (pieni iPad, 224.36): ei 3D-taloja eikä Tripo-malleja, jättinimet:
  /Users/Shared/Claude/Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261110/omistaja-1853-pariisi-jattinimet.png. Linkki palautettu 224.35:een (JU).
- **Vahvistettu Macilla, oletustila** (skenaario `korostus/sk-mac-oletus.txt`: EI talot-/elavakartta-/ohjelmakohteet-komentoja, talot ämpäristä):
  pari `korostus/oletus-35-vs-36.jpg` (vasen 224.35 = 14dd8e7d2 ehjä, oikea 224.36 = ac292ac12): 224.36:ssa laajat talottomat ja katuttomat beiget alat
  (Panthéon–Sorbonne–Luxembourg, puut näkyvät) + iso beige levy horisonttiin + valkoisia/sinisiä laikkuja kaukana. Verkko sama (Curl 73 vs 92) → koodivika.
  Lokit lokit/karttaseppa-oletus-{14dd8e7d2,ac292ac12}; poikkeukset vain editorin (SearchDatabase, Cesium).
- Mac 48/49:n "horisontin beige kaista" on sama vika (näkyi myös k0:ssa saman ajon sisällä), EI verkko → `korostus/mac49-tulos.md` vanhentunut.
- **Poissuljettu:** talot v2 -palat ämpärissä 219/219 (200, koko täsmää, Unity-UA; Python-UA saa 403, ei merkitystä); TaloLataus hyväksyy versio 2;
  k2-pohjat samaa kokoa (1536×1024) ja .meta-asetuksin kuin alkuperäiset; Panthéonin raivattu ala sama r8:ssa ja k2:ssa; Korostus.cs ei koske nimiin.
- **Epäily, ei todistettu:** 561a944af:n Nahtavyysalue: Korosta() skaalaa GlbVerkon kärjet paikallaan (g.Paikat), ja varjo/ääriviiva lasketaan
  korostettuna KovaVarjoGeometria.Tee(g.Paikat, kolmiot, m.Skaala, sx, sz):lla → jos ääriviiva ohjaa talojen raivausta tai maan pohjaa, jättikokoinen
  raivaus/pohja peittää talot ja kadut. Tarkista myös: onko GlbVerkko välimuistissa (toistuva Korosta kertautuu Vapauta→uudelleenluonnissa),
  korostusVersio-alku (0) vs Korostus.Versio. Koe: sama sk-mac-oletus 561a944af:llä komennolla `korostus 0` heti alussa → jos ehjä, vika korostuksessa;
  sitten pala kerrallaan (varjo pois / pohja pois). Mac-ajot aina ILMAN talot kansio -riviä (aiemmat ajot eivät testanneet oletustilaa).
- Jättinimet: ei todettu yhteyttä korostukseen; NUI/PT:n asia, ellei korjaus poista niitä.

## TEHTY TÄLLÄ VUOROLLA
1. **Seine ja sillat (Pariisi valmis -kohta 7)**: Mac 47 48/48 katsottu (KS 9 rajausta + 2 Sonnet-agenttia), raportti `seine-224/SEINE-224-TULOS.md`.
   Ei varmaa vikaa; yöpäätökset junassa paitsi Beauvoir. Kylttihuomiot NUI:lle raportissa (Palais de l'Industrie joen päällä, Seine sillan päällä, £200).
2. **Beauvoir** puuttui ajosta 42 alkaen: z14 yhdistää kävelyviivat yhdeksi kohteeksi, 20 m:n sääntö hylkäsi koko kohteen (`seine-224/beauvoir-syy.md`).
   Korjaus **2671feb68** (proto, haara karttaseppa/beauvoir-juna224, natiivi-backup; ElavaTyyli.cs AjosiltaPalat pala kerrallaan + testi; 741/741, unity 0),
   worktree /Users/Shared/Claude/wt/proto-karttaseppa-beauvoir. Mac-ajo lokit/karttaseppa-beauvoir-2671feb68 katsottu 8/8: Beauvoir takaisin,
   Bir-Hakeim ilman viivoja (`seine-224/rajaus/beauvoir-korjaus-s224-bv.jpg`). PT: junaan vasta kun 224.36-vika ratkaistu → **rebase 191aaeaf2:n päälle** tai korjatun korostuksen päälle.
3. VS:lle kerrottu: erottuvuus (RK/SC/ND sävy/valo) on VS:n työ, ei KS:n.

## KESKEN / JONOSSA
- **Horisontti-b** (JU kuitujono, 561a944af, lokit/karttaseppa-horisontti-b-561a944af): nyt tarpeeton, koska vika vahvistettu koodiksi → pyydä JU:ta perumaan, jos ei ajettu.
- JU:n jonossa myös PT:n om1853-toisto (pieni-pysty) ja 224.36 iso iPad Pariisi lokilla → tulos KS:lle ja NUI:lle: katso loki (talot/Exception/Nahtavyysalue/Korostus).
- Avoin (vanha): Invalidien länsisiipi ~70 m vanhan maskin yli.

## Vahdit (uusi sessio virittää)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
