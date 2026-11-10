# Karttaseppä: luovutus 10.11.2026 klo 20.18 (KS)
Syy: konteksti yli 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -1931:n.
Työlista: `python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava KS` (Lontoo odottaa Pariisia; ei aloitettu).
HUOM kello: aja `date` ennen jokaista aikaleimaa. Kansiot suhteessa /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/.
Yksityiskohdat: `korostus/oletus-tulos.md` (lisäykset 19.4x–20.2x, luettava kokonaan).

## RATKAISTU: omistajan 18.53 oire (224.36) = K 2 kutistaa Tripo-mallit
- JU:n om1853-toisto Macilla (lokit julkaisija-om1853-22435-14dd8e7d2 vs -22436-ac292ac12). Parit `korostus/pari-om1853-yleis-22435-vs-22436.jpg`, `-lahi-`.
- Mallit olivat ennen moninkertaisesti liioiteltuja; K 2 = todelliset × 2 → ND 620 → 192 m, Louvre 350 → 80 m, SC 294 → 166 m korkeus. Ei koodi- eikä laitevika.
- Talojen aukko yleiskuvassa = talot v2:n 18 palaa vielä latautumassa (täyttyy). PT katsoi parit 20.2x, samaa mieltä.
- PT: KK:lle kysymys, suositus "Tripo-mallit 224.35:n kokoon, muu korostus säilyy".

## LISÄYS 20.4x (PT KORJAUS, sitova)
- KK: koko on omistajan päätös (16.17 + 17.45) → b8971b839 PERUTTU (JU:n ajo peruttu). Kutistus EI selitä laiteoiretta; syy auki.
- Koodista (KS 20.4x): talot ja mallit haetaan palvelimelta ilman latausmerkkiä (SaapumisOdotus vain karttalaatat ≤ 30 s). Puuttuva mallitiedosto → alue odottaa
  kokonaan (ei pohjaa). 19.30 ND:n pohja näkyi ilman mallia → vain LuoMalli-kaatuminen (71c52a6c0-polku). 18.53 ei taloja = hidas ensihaku (219 palaa 96 Mt)?
  Jättinimet = kaatumispolku. iPad-loki (0f0f950a6) ratkaisee.
- Pariisi-pino 7: kirkon (Saint-Germain-l'Auxerrois) poistoa EI tehty; jatkotyö auki (kortti 09.3x "Kirkko jää pois").
- JU:n vertailu: /Users/Shared/Claude/proto-3d/lokit/julkaisija-om1853-22436-ac292ac12/vertailu-22435.txt (Mac ei toista puuttuvia taloja).

## (PERUTTU) versio "mallit ennallaan" b8971b839
- proto, haara karttaseppa/korostus-mallit-ennallaan (561a944af:n päällä; worktree /Users/Shared/Claude/wt/proto-karttaseppa-korostus-juna).
  Korostus.MallitEnnallaan = true → Nahtavyysalue.Korosta ei skaalaa kärkiä; pohjat -k2 ja talot v2 säilyvät. unity-tarkistus sh 0 virhettä.
- JU:lta pyydetty 20.2x (jonossa): om1853-toisto (1) ac292ac12 uudelleen (v2-palat levyllä → pari ilman aukkoa, PT haluaa ennen junaa)
  ja (2) b8971b839 → lokit julkaisija-om1853-22436-ac292ac12-2 ja karttaseppa-om1853-b8971b839. Katso parit, rivi PT:lle.
- Huom: K 2:ssa isot vaakakoot kasvoivat (Invalidit 1.375, Opéra 1.455); -k2-pohjien raivaus on mitoitettu niille → mallit ennallaan voivat jättää raivauksen reunan näkyviin. Tarkista parista.

## KESKEN: kestävä nähtävyysluonti 0f0f950a6 (JU:n iPad-jonossa)
- proto, haara karttaseppa/luomalli-kestava (worktree /Users/Shared/Claude/wt/proto-karttaseppa-luomalli) = juna-224 271e46fd9 + NUI 2592bf839 + kontrasti f4ddf1655
  + KS 71c52a6c0 (LuoOsat try/catch → Vapauta, varat eivät kaada, Vapauta nollaa Aariviivan) + e1d4a7874 (enintään 2 yritystä, loki nimeää mallin).
- Syy: luotu = true ennen mallisilmukkaa → kaatuva malli jätti alueen puolivalmiiksi → Paivita/KeraaRuudut NRE → nimet jäätyvät (NUI:n löydös).
- JU: iso iPad uudelleenkäynnistyksen jälkeen: kaupunginvaihto-2 + ND ac292ac12 → sama 0f0f950a6 → NUI nimet-kontrasti 0f0f950a6; ote ks-grep.txt
  (lokit karttaseppa-kaupunginvaihto2-ipad-<sha>). Katso "NullReference|luonti kaatui|nähtävyyslataus|astc:". PT:n ehto 2 (iPad 224.36) täyttyy samalla.
- ND puuttuu laitteella 224.35 (omistaja 19.30): Macilla ND luodaan (ASTC-polku, 38030 kärkeä, NRE 0); syy vain iPad-lokista.

## Muut tulokset
- Kaupunginvaihto (Mac, kaupunginvaihto-2): opas+kierros+"linssi linssi pois" ja kaupunginvaihto palauttavat kartan (purku loppu, talot 58). "ui sulje" EI sulje opasta.
- VIKA PT:lle (ei KS:n koodia): oppaan kaupunkitilan jälkeen puiden väri vihreä → harmaansinivihreä (pari korostus/pari-puut-v0-v2-italie.jpg); NS/KartanPurku.
- Lontoo, Riemukaari koodilla, Pariisi-pino 7: jonossa, ei aloitettu.

## Vahdit (uusi sessio virittää)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
