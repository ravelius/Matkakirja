# PT:n luovutus 11.11.2026 klo 01.50 (PT local_8d8ebf72; konteksti 30 %)

Korvaa -20261110-2230:n. Id:t /Users/Shared/Claude/osoitekirja.md. Date ennen aikaleimaa. Viestit: SendMessage nimellä + [ref] tai
mcp__ccd_session_mgmt__send_message session-id:llä (toimii aina, myös nollauksen jälkeen).

## LINJAT (voimassa, lokissa – tämä haara sisältää päätösloki 22.33–00.08)
- Kolme kärkeä; Asemataulu JÄÄDYTETTY (ei avata, ei päivitetä junat.json-hookin pyynnöstä); työlista tyolista.py:llä
  (python3 -I tools/asemataulu/tyolista.py tilanne|valmis|este … --tiedosto oletus scratchpad/asemataulu/data/talo/tyolista.json).
- OMISTAJA 22.31 "En testaa asioita jotka eivät jää peliin": KK:lle "kokeiltava"-rivi vain jäävistä; Uutta-tekstiin ei "kokeilu".
- NÄKYVÄ TYÖ KK:LLE (koe 21.38): KK katsoo kuvat ja antaa palautteen tekijöille suoraan; PT:n pt-ok = toimii teknisesti
  (sha, diff-laajuus, testit/unity, KK:n hyväksyntä viestissä). PT ei anna ulkonäkösuosituksia.
- OMISTAJA 23.29: nähtävyyden paisuminen PELIIN (kaikille nähtävyyksille, NUI).
- OMISTAJA 00.07: EI tilinvaihtoa; omistaja nollaa viikkorajan itse. Viikko 96 % (01.3x) → Postivahti ilmoitti KK:lle. Raamatun
  kevennys (luvut 12 ja 7, KK) aamulla. Yön säännöt: KK:n nollaus ilman korttia, PT päättää oletuksella.
- Raamattu 458 kt > 450 kt: EI lisäyksiä ennen KK:n kevennystä. Paisuminen-lisäys 2.204:ään odottaa (luvattu KK:lle).

## JUNA 224 (liput /Users/Shared/Claude/julkaisija-tyokalut/linkki-224-uutta/, jonoloki jono-20261103-ilta.txt)
Linkissä (kaikki testit läpi, manifest 200): 224.46 RK/ND/Eiffel 1:1 + vaalea kivi + talot v3, ääriviiva pois RK/ND (7b5a45561);
224.47 PK koneportaat reunuskiveksi; 224.48 NUI paisuminen + kyltit mallin juurella + Eiffelin valo 1,0 (c632c2f41); 224.49 KS Panthéon
+ talot v5 (+ Louvren 3 värimuutosta, Louvre yhä Tripona oletuksessa – JU tarkisti Macilla); 224.50 Opéra + talot v6; 224.51 kamera
2,7× lähemmäs myös striimikartalla (KS c032134e7, 0,231); 224.52 ND-puisto ja puut 1:1 (KS 0aad16c3f). Junajono TYHJÄ.
KK kertoo omistajalle aamulla koottuna 224.46–224.52 (KK:n aloitus.md kohta 0a).
OPPI: KS:n talotiedosto (pariisi.json vN) pitää tehdä junan kärjen päälle, muuten MR kaatuu (MR39b). Tarkista pt-ok:ssa aina
`git log <junan kärki>..<sha>` – tuoko mukana muiden kohteiden muutoksia (Louvre 224.49).

## AVOIMET
- KS: Louvre (KJ22) + Invalidit (KJ23) 8f647a8d4 KK:lla junaehdokkaana; Louvren pohjoispuolella talojalanjälki ilman 3D:tä (KS selvittää).
  pt-ok kun KK:n "junaan" + sha; tarkista ettei koodi-Louvre tule oletukseen ilman KK:n Tripo|koodi 1:1 -paria.
- PK: P1 ovet seinään kivijalan päälle 3199b079a (56 ovea) – odottaa KK:n paria (JU:n L2-ajo); L1:n datakansiosta puuttuvat palatsin
  osamallit (osamallit791-v10), JU selvittää. Eteläosa kartoittamatta (botti jumissa −85; 500).
- VS lepää aamuun: KK tekee aamulla tekotavan "Pariisin saumat ja mäkien varjostus"; kynä + ruskea 1:1-viiva nyt avoinna (kamera
  päätetty) → KK antaa VS:lle tavoitteen; vesitäyttö 0829caa4e iso iPad.
- NUI lepää: iso iPad -ajo 0f0f950a6 JU:n vuorolla päivällä; tarinamerkit odottavat Codexia.
- ODOTTAA OMISTAJAA: ison iPadin uudelleenkäynnistys.
- Päätösloki: tämä haara (fable-luovutus-0150) sisältää 22.33–00.08 → PR ja yhdistä checks pass -jälkeen. PR 6560 (vanha haara
  pt-loki-20261110-2330) ristiriidassa → sulje, korvattu tällä.
- Main-checkoutissa paikallisia muutoksia (paatokset, tyolista.json, osoitteet.md) – ei PT:n tämän vuoron, älä commitoi sokkona.

## LISÄYS 01.5x
- KK 01.50: Louvre (KJ22) + Invalidit (KJ23), käännös 8f647a8d4 → SAAVAT MENNÄ JUNAAN, kun KS tuo junaehdokkaat (junan kärjen päälle, talot-paketti + palat-ok). Louvren F-jalanjälki Rivolin varrella seuraavaan kierrokseen, ei estä. pt-ok: tarkista git log <kärki>..<sha> ja ettei koodi-Louvre ole oletuksessa ilman KK:n lupaa (KK hyväksyi nyt Louvren koodimallin kuvista KJ22 → jos KS lisää louvren Oletukseen, se on KK:n hyväksymä).
