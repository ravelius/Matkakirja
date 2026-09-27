# Linssisepän luovutus 27.9.2026 (l) — Linssiseppä (Opus, max) = myös Mallinseppä

*Sessio 74aa735c (id ennallaan, nollaus ~08.1x Fablen pyynnöstä). Edelliset -k.md (yö: A/B/C, 14 symbolia, erä 2),
-j.md. Fable local_5df52e10-10e4-4b72-9554-0049db300dfe, Natiiviseppä local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
Karttaseppä local_eec7f158-d9f3-4b93-9368-c50935bd19ab. S = /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/
74aa735c-cd53-4417-8c06-91819a4a5f3a/scratchpad (skriptit ottavat S:n ympäristöstä; päivitä polku uudessa sessiossa).
Jos sait nollauksen jälkeen vanhoja viestejä tai agenttien raportteja, ne kuuluvat alla oleviin eriin.*

## JUNASSA (juna/b13 1eff4f76, 1.0.28 tulossa)

- Kategoriasymbolit 14 (mallinseppa/kategoriamallit-14 31e6cedf: B-ramppi, vuoren lumi C), erikoismallit MSM/Stonehenge/
  Colosseum (mallinseppa/pohja 2b8f6dcd), erä 2 Kinderdijk/Brandenburg/Segovia (mallinseppa/erikoismallit2 01810d0c),
  Natiivisepän tason 1 kynnyskorjaus pienille maille (23fd85af, Mallinsepän löydös).

## OMISTAJAN PÄÄTÖKSET 07.4x–07.5x = JONO

1. **Meri v3 tuotantoon 10 lajilla** (lista docs/raportit/meren-koristeanimaatiot-20260926.md).
   - **Merge-pyyntö lähetetty 07.5x** (Fablen kiire, 1.0.28): proto `linssiseppa/meri-tuotanto` **0126ce8b** (worktree
     /Users/Shared/Claude/wt/proto-linssiseppa), mukana tuotantorunko + höyrylaiva ja valas. Linssit/Unity/MeriKoristeet.cs:
     merikohdat paketista (kartta/merikohdat.json, 29 maata / 129 kohtaa), kohdemaa NostoKerros.NykyinenMaa, pari painotetulla
     siemenarvonnalla (1/maita), ankkuri ruudun keskustaa lähin sallittu kohta ≥ 120 pt:n päässä (vaihtuu vain, kun laji ei
     näy), rannikko = suunta + 90°, sama kohta → siirto ±140 pt, harvinainen laji väistää, kytkin `elava elementit meri 0|1`.
     Tila: `elava elementit tila` (rivi "meri <maa> (<n> kohtaa): lajit…").
   - **Tarkistusajo käynnissä 07.53** ($S/ajo-meri1.sh → loki $S/ajo-meri1.log, kuvat proto-3d/lokit/mallinseppa-laite-20260927-f/):
     juna/b13 + meri-tuotanto, VAIHEET 1289: Kinderdijk (kynnyskorjaus) ja meri tuotanto (NOR/GRC/FIN/DNK/UKR:
     meri-<MAA>-<laji>-<1..4>.png; lokirivit "meren koristeet: <maa> → …"). Tarkista, että laji näkyy merellä oikein
     päin, ja raportoi Natiivisepälle ja Fablelle (bugi → korjaus tai kytkin pois).
   - **8 uutta lajia agenteilla** (Opus, taustalla): tyokalut/meri-esikatselu-a/lajit/{MeriPurjelaiva,MeriKalastusvene,MeriLautta}.cs,
     -b/lajit/{MeriDelfiinit,MeriLokit,MeriJaavuori}.cs, -c/lajit/{MeriMajakkalaiva,MeriHirvio}.cs (+ esikatselu-<laji>.png).
     Sopimus: `Nimi, Meret, KokoPt, Aikataulu (MeriAikataulu), Roottori(), Lapsi/Lapsia(,2,3), Nakyy(t), Animoi(r, lapset, t, nopeus)`.
     Integrointi: kopioi Assets/Matkakirja/Linssit/Unity/MeriLajit/ (+ .meta uuidgen), lisää MeriKoristeet.Lajit-taulukkoon
     rivit kuten merilaiva (jäävuori VahintaanLat = 63, hirviö Harvinainen = true), unity-tarkistus → commit → lisäävä
     merge-pyyntö Natiivisepälle → käännös → ajo VAIHEET 1 8 → kuvat (kulma + versio) Fablelle.
2. **Seuraavat 3 erikoismallia hyväksytty 07.5x** (elämänideat: Brugge kanavavene + kellopelin nuotit, Matterhorn lippupilvi +
   alppihehku + hammasratasjuna, Hohensalzburg köysirata + Salzburgin härkä): agentit (Opus, taustalla)
   tyokalut/mallinseppa-esikatselu-{d,e,f}/: malli/Erikoismallit/{BruggenKellotorni,Matterhorn,Hohensalzburg}.cs,
   malli/Elava/ErikoisLiike{Brugge,Matterhorn,Hohensalzburg}.cs, {brugge-belfry,matterhorn,hohensalzburg}.md, kuvat/.
   Integrointi: uusi proto-haara `mallinseppa/erikoismallit3` juna/b13:n päältä (worktree /Users/Shared/Claude/wt/proto-mallinseppa),
   kopioi tiedostot (+ .meta), Luo-switchiin 3 riviä (Linssit/Ydin/Elava/ErikoisLiike.cs), speksit docs/raportit/erikoismallit/,
   unity-tarkistus + Linssit-testit → käännös → ajo VAIHEET 1 2 9 MALLIT=$'brugge-belfry BEL 51.2089 3.224\nmatterhorn CHE
   45.9775 7.658\nhohensalzburg AUT 47.7956 13.046' → koosta_era2.py (lisää ODOTETTU-rivit) → Fablelle → merge-pyyntö.

## TYÖKALUT (proto-3d/tyokalut/linssiseppa-ajot/)

- kaanna-jono.sh <nimi> "<haara+haara>" (.app → $S/<nimi>-app); ajo-mallit.sh VAIHEET: 1 käynnistys, 2 erikoismallit (MALLIT),
  4/5 kategoriat Kreikassa, 6 A/B/C (KOOT), 7 symbolit kartalla, 8 meri tuotanto, 3 meri (vanha Norja), 9 sammutus.
- Koosteet: koosta_era2.py (erikoismallit pystymuoto, mallin paikannus), koosta_abc.py (VARIANTIT, KAANNOS), koosta_tiukka.py,
  koosta_meri.py (v3), koosta_symbolit.py (esikatselut), koosta_kartta.py (sym-alueet).
- Käytännöt: yksi käännös kerrallaan, rivi Karttasepälle ennen ja jälkeen; kuviin kulma + versio (+ käännös); Fablelle ≤ 8 riviä
  per erä; agentit vain Opus/Sonnet.
