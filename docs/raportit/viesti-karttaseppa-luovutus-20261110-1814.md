# Karttaseppä: luovutus 10.11.2026 klo 18.14 (KS)
Syy: konteksti 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -1740:n.
Työlista: `python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava KS` (rivit kirjoittaa PT).
HUOM kello: aja `date` ennen jokaista aikaleimaa.

## TEHTY TÄLLÄ VUOROLLA
1. **Maltillinen korostus JUNAAN** (OMISTAJA 17.45 "Kyllä, junaan"; PT: puhdas, ilman koodimalleja):
   - **561a944af** (proto-repo, haara karttaseppa/korostus-juna224 = juna 224 bb1b4b4ac + 1 commit; worktree /Users/Shared/Claude/wt/proto-karttaseppa-korostus-juna).
     Korostus.cs oletus K 2 (Korostus.Oletus), Tripo-mallit akseleittain (Nahtavyysalue.Korosta, TodPituus/TodKorkeus), 7 k2-pohjaa
     Maaritys.PohjaKorostus-kenttänä (PohjaNyt; koepohja-komento nollaa sen), komento korostus K, talot StreamingAssets/talot/pariisi.json v2.
     EI koodimalleja (205649e5f…20fed45ff, 1281fef9e) eikä VS:n c1e811eed (koskee vain koodimallin kylttiä). Testit 741/741, unity (sh) 0.
   - Talopaketti pariisi v2 (palat-v23-k2b): _tyo/karttaseppa/korostus/talot-paketti-pariisi-v2/ → JU vei ämpäriin 17.56 (22 uutta, 0 virhettä).
   - JU: 224.36 = 561a944af (MR26), PT pt-ok 18.09 (KK ok).
   - Mac 48 (lokit/karttaseppa-korostus-juna-561a944af) katsottu 11/11: koot oikein (RK 150 m erottuu, Invalidit 550, Eiffel korkein).
     Parit Mac 46 | Mac 48: proto-3d/_tyo/karttaseppa/koodimallit/kuvat/u9-korostus-juna/pt/ (parit-juna.py). PT:lle kerrottu.
     Tripo-ND leveätorninen + saaren isot puut näkyvät nyt (ulkonäkö = seuraava vaihe).
2. **iPad I4b** (7f0a42222, vanha) katsottu 22/22, parit kuvat/u8-korostus-k2-ipad-b/pt/: sama kuin Mac 45, ei iPad-vikaa. PT:lle kerrottu.

## KESKEN
1. **Mac 49 JU:lla** (horisontin beige kaista + vaalea Seine Mac 48:ssa, ei Mac 46:ssa): _tyo/karttaseppa/korostus/sk-mac-horisontti.txt →
   lokit/karttaseppa-horisontti-561a944af (2 kuvaa: k2-yleis | k0-yleis, sama ajo). PT 18.1x: epäillyt (a) hidas verkko 17.30 alkaen
   (kaukolaatat lataamatta), (b) junan muu muutos. Tarkistettu: NS:n usvarajaus 60623ec85 EI ole junassa; VS:n maalattu taivas on junassa
   (ba37edad9), mutta kortin kuvassa se on sininen pilvitaivas, ei beige vyö. Katso Mac 49:stä myös lokin laattamäärät/latausvirheet
   (unity.log "elävä tila"/"VARTIJA"-rivit). Jos (b) → rivi NS:lle ja PT:lle. Jos molemmissa kuvissa kaista → ei korostusta.
2. **Seine ja sillat -katsaus** (työlistan KS-rivi, Pariisi valmis -kohta 7): Mac 47 VALMIS 48/48 kuvaa
   lokit/karttaseppa-seine-224-bb1b4b4ac (skenaario _tyo/karttaseppa/seine-224/sk-mac-seine-224.txt, kamerat ajosta 40: joki 12 yla + 12 45,
   20 siltaa, Iéna ja Alexandren eteläpää). KATSOMATTA. Vertaa ajoon 40 (parit-yhteinen-40, VIKALISTA.md, AJOSILLAT-VIIVAT.md) ja
   KK:n päätöksiin (yo-20261106.md 02.43, 03.10, AUSTERLITZIN VIADUKTI): Bir-Hakeimin tummat viivat pois, Issyn L-talo pois, Beauvoir/Debilly/
   Arts jäävät, Austerlitzin viadukti palannut, gare d'Austerlitzin rengas pois. Laajat haut Sonnet-Explorella, arkit ≤ 1000 px.
   Tulos PT:lle ≤ 3 riviä (kohta 7 valmis vai mitä puuttuu) + tiedosto.
3. **Seuraava vaihe (PT 17.4x, ei junan ehto):** Riemukaari sulautuu taloihin värin takia, Sacré-Cœur lähes katoaa yleiskuvassa → ehdotus PT:lle;
   mallien ulkonäkö ja ND:n tornit koon jälkeen. Huom: junassa Tripo-RK (tummempi) erottuu Mac 48:n viistossa paremmin kuin koodi-RK.
4. Avoin: Invalidien länsisiipi ~70 m vanhan maskin yli (Mac 45: talot eivät pistä läpi).

## Vahdit (uusi sessio virittää)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
- Mac 49: until-silmukka `ls /Users/Shared/Claude/proto-3d/lokit/karttaseppa-horisontti-*/*.png` ≥ 2.
