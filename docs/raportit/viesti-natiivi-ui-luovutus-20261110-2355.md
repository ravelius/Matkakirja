# Natiivi-UI: luovutus 10.11.2026 klo 23.55 (kontekstivahti 25 %; korvaa -2305:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671,
KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a. Tulosrivit JU:n jonolokissa /Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt ("AJO NUI …").
TYÖTAPA: näkyvän työn kuvat/videot suoraan KK:lle, PT kopiona; junaan vasta KK:n katsottua.

## Valmista (älä toista)
- OMISTAJAN PÄÄTÖS 23.29 (KK:n kortti): nähtävyyden paisuminen PELIIN kaikille nähtävyyksille.
- KK katsoi paisunta-6, kyltit-1-1-1 ja paisunta-7: "näyttää oikealta".
- JUNAAN: PT:n pt-ok 23.51 → 89001e066 (haara natiivi-backup natiivi-ui/paisunta-juna = juna-224 474826dd7 + merge
  natiivi-ui/nahtavyys-paisuu be4e976b9) JU:lle 224.48:ksi, korvaa MR41:n (kyltit 2a99e5b8a, haara natiivi-ui/kyltit-1-1-juna).
- Koodi (worktree /Users/Shared/Claude/wt/proto-nui-paisuu, haara natiivi-ui/nahtavyys-paisuu): 50e565db5 tasaisempi kasvun alku
  (käyrä 0.35, 0.2, 0.3, 1.2), korkeille (≥ 150 m ja ≥ 2 × säde = Eiffel) nousu 1,12 + valo (MaterialPropertyBlock: _Aurinko/_Taivas × (1 + ValoVoima)),
  Tripo-mallin mitat lasten verkoista (Louvre 0,59 ruudusta → ei kasvua, oikein). Otsikot "peliin" 714266606, be4e976b9 (KS:n lupa 23.38).
- Kuvat: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/paisunta/paisunta-{5,6,7}-*, kyltit/kyltit-1-1-1-*.
- Palat 26/31 paisunta-6:ssa selitetty PT:lle (eri kamerakohdat, ei puutetta).

## Auki (JU:n jonossa)
1. nui-eiffel-valo-be4e976b9 (sk-eiffel-valo.txt): kiinteä kamera e0 ilman / e1 valo 0,45 / e2 1,0 / e3 2,0. Paisunta-7:ssä valo 0,45 lähes
   näkymätön tummassa raudassa. → pari/arkki KK:lle (kopio PT). KK valitsee tason; jos mikään ei erotu, valo pois (ValoVoima = 0) ja pelkkä nousu.
   Valinta = Paisunta.ValoVoima-oletuksen muutos (UI/Paisunta.cs) uutena pienenä committina junaan (pt-ok PT:ltä).
2. nui-lahin-2-7x-2-ea9e6c633 (sk-lahin-2-7x-2.txt, KS:n lähin 2,7 × rebasattuna junan päälle, haara karttaseppa/lahin-2-7x-v5):
   ensimmäinen ajo (nui-lahin-2-7x-b5ef8b0c9) meni vanhan rajan korkeudella aja 0,003 → kuvat samat kuin ennen, EI KK:lle.
   Uusinnassa aja 0,0012. Tarkista ensin, että l1-nd-lahin on selvästi lähempänä kuin paisunta-5 k1-lahin-nyt (ND ~2,7 × isompi);
   jos ei, aja ei ehkä laske alle vanhan (muistiinpano: aja alle lähimmän ei liiku) → kysy KS:ltä oikea komento.
   Sitten KK:lle (kopio PT): pari _tyo/natiivi-ui/paisunta/ vanha k1 vs uusi l1 (ffmpeg hstack kuten lahin-2-7x-pari-nd-vanha-uusi.jpg) + l2-rk-lahin.
   Junaan vasta KK:n katsottua (KS:n muutos, sha KS:lle).

## JONO (KK:n järjestys)
1. Yllä 1–2.
2. HUOMENNA: iso iPad 0f0f950a6 (KS:n yhdistelmä; JU ajaa): grep "esteet ohitettu|estevirheitä|nähtävyyslataus|Exception" → PT (+ KS loki).
3. TARINAMERKIT: odottaa Codexin toimitusta (origin/claude/postilaatikko: 23.2x vain tilaus posti/natiivi-ui-codex-tarinamerkit-tilaus-20261110.md).
   Kierros 2 KK:lle (kopio PT).

Tunnettu: ajon alussa "ESIKATSELU POIKKEUS ArgumentOutOfRangeException" (ei paisunnasta). Paisuneen ND:n kyltti on mallin edessä etelärannalla
(KK: kelpaa). Seinen puuttuminen tallenteen alussa = latausjärjestys, ei tämä työ.

## LISÄYS 23.5x
Eiffel-valo valmis (lokit/nui-eiffel-valo-be4e976b9), vertailu _tyo/natiivi-ui/paisunta/eiffel-valo-0-045-10-20.jpg lähetetty KK:lle suosituksella 1,0.
KK:n valinnan jälkeen: Paisunta.ValoVoima-oletus (UI/Paisunta.cs, nyt 0.45f) → valittu arvo commitiksi haaraan natiivi-ui/nahtavyys-paisuu,
cherry-pick junan kärkeen, unity-tarkistus, sha PT:lle pt-ok:ta varten. Jos KK sanoo "pois": ValoVoima = 0.
