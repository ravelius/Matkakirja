# Natiivi-UI: luovutus 11.11.2026 klo 18.12 (kontekstivahti 25 %; korvaa -1312:n, jonka historia: haara natiivi-ui/luovutus-20261111-1312 fd275f1f1)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f. Näkyvät suoraan KK:lle, PT kopiona.
Natiivikoodi: worktree /Users/Shared/Claude/wt/proto-nui-pallo (remote natiivi-backup). Tarkistus: `sh Peli-testit/unity-tarkistus.sh </dev/null`
(run_in_background). ÄLÄ KOSKAAN pkill -f. Kaikki ajot Macilla JU:n kautta (Raamattu 12.26.5); laite-iPad vain KK:n nimeämä valmis kokonaisuus.
Skriptit: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-*.txt; lokit /Users/Shared/Claude/proto-3d/lokit/nui-*.
Kehysero: `python3 _tyo/natiivi-ui/kehysero.py <kansio> <alku_s> <loppu_s>` (ILMAN -I, numpy käyttäjän paketeissa).

## JUNASSA / MATKALLA JUNAAN (ei NUI:n toimia, ellei PT tai JU kysy)
- Lehti + Matkaopas 484d48fd9 = 224.74 (linkissä).
- Napautuslento d520120aa (natiivi-ui/napautus-224; KK 16.47) PT:llä jonossa, EI vielä juna-224:ssä (kärki bd9a95a9d = 224.77).
- Kuumailmapallon kyltti 9c6a6f864 (natiivi-ui/pallo-kyltti, KS pallo-juna-pp a0384240a:n päällä; KK 17.5x) → JU MR70 → 224.78 KS:n pallon kanssa.
  Työlistarivin "Kuumailmapallon kyltti peittää ankkurin lähikuvassa" tilanne kirjattu (kun 224.78 linkissä: `tyolista.py valmis` sille).
- Sulun lopun liikahdus e0f7d6a7d (natiivi-ui/sulku-katse-2 = d520120aa + 8b906efd1 + e0f7d6a7d; KK 18.08 HYVÄKSYI) → PT:lle "JUNAAN" 18.1x
  (viesti jonossa PT:llä). Syy: ae72a1a4e:n SulkuKatse odotti EsitysKatse = NaN, jota NahtavyysEsittely asettaa vasta sulun jälkeen → liuku ei alkanut.
  Mittaus lokit/nui-sulku-katse-2-e0f7d6a7d/kehysero-ennen-jalkeen.png (piikit a 23,86 / b 24,20 s poissa).

## AVOINNA
- Odotetaan PT:n pt-ok / JU:n linkki 224.78 ja sulku-katse-2:n versio; ei omia toimia.
- KOLOTESTI (KK 15.59) ei enää tarpeen: kolo ratkesi KS:n vetokorjauksella 03ad357fb (224.75).
- KK:n huomio (ei estä): pienellä iPadilla noston valokuva peittää Concorden aukion kyltin alun.
- Rungon rajat (KS RungonRajat 2743a6ebd, LISÄYS 14.0x vanhassa luovutuksessa): NUI:n vaihto verkko.bounds → OhjelmaKohteet.RungonRajat
  (NahtavyysEsittely.TaysiMalli, Paisunta.MahtuvaKerroin, Naytteet) EI ALOITETTU; kysy KK:lta, onko yhä jonossa (SC:n koko).
- JONO MUUTEN TYHJÄ → jos ei uutta työtä: rivi PT:lle "JONO TYHJÄ: Natiivi-UI".
