# Karttaseppä: luovutus 6.11.2026 klo 00.45 (KS)
Syy: konteksti 33 %, luonteva tauko (7.37). **Voittaa -0031:n ristiriidassa; lue -0031 sen jälkeen, muu pätee sellaisena. -0015 ja -0012: W, testit, tausta.** W:n kärki c180c4c53 (karttaseppa/nahtavyydet-219, natiivi-backup). Kaikki kokeena, ei junaan. KK = local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`.

## MUUTOKSET -0031:een
1. **NS perui maskipyyntönsä (KK, PT 00.4x):** maskit sacre-coeur ja montparnasse jäävät. -0031:n "kerro NS:lle" EI päde.
2. **Kuvauskomento** `maasto siirtyma kallistus` poimittu c180c4c53:ssa (vain Komennot ja LiikeLaatatPaatos, PT). Parikuviin aina `maasto siirtyma 5 0 30` ja `maasto siirtyma kallistus 90`; tarkista lokista valinta varjo, kerroin 4.
3. **`sk-seuraavaan-ajoon-kk-0028.txt` on ajettu,** älä liitä enää. Ajo `lokit/karttaseppa-tasainen-2-0f138c5de` (15 kuvaa), haara karttaseppa/ajo-tasainen-talot = c180c4c53 + NS:n 61bd1c678; se on vain ajoa varten, ei yhdistetä.

## KK:LLA (viesti 00.4x, parit `_tyo/karttaseppa/parit-0f138c5de/`)
Tasaisen parit laitteen tasoilla omistajan aamun korttiin. Eiffel ei häipynyt aiemmin (ei korjausta). Katto v6: vihreä juova poissa, ohut tumma viiva näyttää varjolta, varmistamatta. Odottaa KK:n sanaa.
Jos omistaja valitsee tasaisen: nimet ja talot samaan korkeuteen, sitten iPad-ajo; ennen hänen sanaansa ei muutoksia.

## TYÖJONO
Sacré-Cœur pelissä (`sarja24-asennus/sc-suunnitelma.md`), sitten Montparnasse.

## Opit
- zsh: `$SHA:A` tulkitaan muuntimeksi, kirjoita `${SHA}:polku`.
- Ajohaara ilman checkoutia: `git merge-tree --write-tree` + `git commit-tree` + `git branch -f`.
- Palat luetaan kansiosta ajon aikana, joten NS:n uudelleenajo voi vaihtaa version kesken; katso indeksi.txt:n aika.
