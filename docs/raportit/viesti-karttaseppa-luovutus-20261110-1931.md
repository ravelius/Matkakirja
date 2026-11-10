# Karttaseppä: luovutus 10.11.2026 klo 19.31 (KS)
Syy: konteksti yli 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -1915:n.
Työlista: `python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava KS` (rivit kirjoittaa PT; tilanne päivitetty 19.2x).
HUOM kello: aja `date` ennen jokaista aikaleimaa. Kansiot alla suhteessa /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/.
Yksityiskohdat: `korostus/oletus-tulos.md` (luettava kokonaan, 3 lisäystä).

## ETUSIJA: korostus (224.36 ac292ac12) takaisin junaan – PT:n ehdot
Korostus pysyy pois junasta (peruttu 191aaeaf2), kunnes molemmat:
1. ✓ Mac-uusinta 224.36 oletustilassa näyttää kadut, talot ja Tripo-mallit omistajan kulmasta (JU 19.24, lokit/karttaseppa-oletus-ac292ac12-2;
   KS katsonut parit `korostus/pari-oletus2-omistajan-kulma.jpg` ja `-lahempana.jpg`). Aiempi beige kuva = OpenFreeMapin aikakatkaisut 19.00–19.04
   (mvt piirretty 0, Curl 28), EI koodivika. Edellisen luovutuksen "vahvistettu koodiksi" oli väärä.
2. ⏳ Iso iPad 224.36 Pariisi lokilla, kun omistaja on käynnistänyt iPadin (JU:n ajo 22436-iso kaatui error 22 käynnistykseen 18.59–19.04).
Sen jälkeen: Beauvoir 2671feb68 (proto, haara karttaseppa/beauvoir-juna224, worktree /Users/Shared/Claude/wt/proto-karttaseppa-beauvoir) rebase junan päälle.

## KESKEN: omistajan oire 18.53 (pieni iPad 224.36: ei 3D-taloja, ei Tripo-malleja, jättinimet)
- Korostus ei voi selittää: talot v2 vaihtaa vain 21/219 palaa (Panthéon–Saint-Michel), talot puuttuivat koko kuvasta.
- Omistaja 19.27 (PT): ei juoksupeliä; liikkui kaupunkien välillä, kierros Cayennessa (Fort Cépérou) → epäily KARTAN PURKU jää päälle:
  opas/kierros avaa CesiumKaupunki (OpasSovitin.cs:300/409, KierrosSovitin.cs:50) → KartanPurku.Alku (CesiumKaupunki.cs:657) → talot (TaloKerros.cs:204)
  ja nähtävyysalueet (Nahtavyysalue Paivita) pois; Loppu vain Sulje-metodin finallyssa. Purku oli jo 224.35:ssä (aa277a430, 9d5be8823) → ei KS:n koodi.
- JU:lla Mac-ajo `korostus/sk-mac-kaupunginvaihto.txt` (224.36, lokit karttaseppa-kaupunginvaihto-ac292ac12): katso lokista "MATKAKIRJA kartan purku"
  (omistajat auki?) ja "talot tila: palat N" jokaisen kuvan kohdalla (v0 verrokki, v1 Lontoon jälkeen, v2 kierroksen jälkeen, v3 opas Lontoo).
  Komento `ui sulje` oppaan sulkuun on arvaus; JU korjaa tarvittaessa. Jos purku jää päälle → löydös PT:lle (NS/PT:n KartanPurku-koodi), ei korostusta.
- Sama polku iso iPad -ajoon.

## UUSI: Notre-Dame puuttuu 224.35:ssä laitteella (omistaja 19.30, pieni iPad, tuore käynnistys)
Kuva /Users/Shared/Claude/Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261110/omistaja-1930-pariisi-224-35.png: ND-saarella pohja ja raivaus
("Parvis Notre-Dame"), ei mallia eikä kylttiä; Louvre ja Panthéon näkyvät, talot ja nimet normaalit.
Tarkistettu: ASTC-tiedostot (lod5 notre-dame atlas/normaali/verkko, paletti-v2 sainte-chapelle) ehjät repossa ja palvelimella (sha täsmää).
Macissa (ei ASTC) ND näkyy → laitepolku. Seuraava: laitelokista "nähtävyyslataus NotreDameKoe/lod5", "notre-dame: odottaa", "astc:",
"atlas ei avaudu", "NullReference". Sivuhuomio LuoMalli: ASTC-atlas null → g luetaan Resourcesista (laitteella ei ole) → g = null → NRE.

## Muut
- Horisontti-b peruttu (JU 19.11, ei ajettu).
- Seine kohta 7 tehty (`seine-224/SEINE-224-TULOS.md`), kylttihuomiot NUI:lle raportissa.
- Avoin (vanha): Invalidien länsisiipi ~70 m vanhan maskin yli.
- Jonossa (työlista): Lontoo samalla toteutuksella; Riemukaari koodilla; Pariisi-pino 7.

## Vahdit (uusi sessio virittää)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
