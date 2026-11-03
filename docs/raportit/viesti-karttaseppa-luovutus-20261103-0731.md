# Karttaseppä: luovutus 3.11.2026 klo 07.31 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-0645.md (PR 6088; käsitelty: AVOIN 1 ja 3 tehty/käynnissä, AVOIN 2 jatkuu).
Syy: kontekstivahti 26 %. P = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/`,
K = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tasangot-mäet-20261103/`, N = `…/karttaseppa/tasangot-poltto-20261103/`.

## TEHTY
1. **CDN-löydös (PT:lle 06.55):** pelin pallopohja 2026-10-26-pohja-20261027 ja välitaso ovat deltoja, joiden perus
   2026-09-30-pohja-20261015 poistettiin säästöpaketissa → muuttumattomat palat 404. Raportti
   docs/raportit/karttaseppa-delta-perus-puuttuu-20261103.md (a94a2e9e1). PT: JU palauttaa T7:ltä (ruudukko-20261015/pohja).
2. **Tasankoresepti kierros 3, PT KUITTASI:** 2026-11-03 = {kerroin 8, k0 0,06, pohjaM 3000, tavoite 0,05, maaM 400}.
   Uusi `maaM` (b8968cf00, pohjan näyte = min 5 pisteestä → pintamallin metsät pois), resepti 565066196, PR 6089
   (haara karttaseppa/tasangot-maet, rebase origin/main tehty). K/LUE.md kierros 3, kuva K/pt-kaukopari-2-20261103.jpg.
3. **Koko poltto KÄYNNISSÄ nohupilla:** N/ketju.sh (pid oli 6208) odottaa itse perusan CDN:ssä (curl 6/2/30.jpg = 200) +
   NAS + joutilas ≥ 10 min ilman Unity-batchmodea/xcodebuildia → pohja, syvä, pallo, purku, kerma. Jatko: `zsh N/jatka.sh`.
   N/LUE.md = koko suunnitelma ja ketjun jälkeiset käsivaiheet.
4. **NS:n välitasovideo arvioitu:** sumeus = kamera ~30× Z10:n alapuolella; Z11–Z12 ei auta. PT tilasi NS:ltä zoomikokeen
   (Z10 1:1 + ristihäivytys), NS:n seuraaja tekee perusan palautuksen jälkeen (NS af6cefd43).
5. **Pariisin pala06 ja pala10 hyväksytty**, kuittaukset Codexille 05e10b053 ja 09314c33b (seuraavaksi pala05).
   Kylttisiirrot P/kylttisiirrot-pala06.json (5) ja -pala10.json (7). Saumatarkistus: P/tarkistus/kokoa_monta.py
   (`<ulos> <png:x0,y0> …`, uusin ensin; venv "/Volumes/T7 4TB/Matkakirja-karttaseppa/venv-kartta/bin/python", numpy+scipy),
   kuvat P/tarkistus/pala06/, pala10/.

## AVOIN (järjestyksessä; Pariisi edellä, PT)
1. **Pariisin palat** (järjestys 6✓, 10✓, 5, 9, 7, 11, 2, 1, 3, 14, 13, 15, 4, 8, 12): PT ilmoittaa Codexin postin
   (`git log origin/claude/postilaatikko`). Joka palalle: `cd P/_review-palaNN && shasum -a 256 -c SHA256SUMS`,
   lock-verification lockedPixelDifferences 0, `python3 -I P/tarkista_ala.py P/_review-palaNN P/palat/palaNN/merkit.json`
   (vertaa Codexin kylttisiirrot-listaan; yli 140 m → korjauspyyntö), kopioi kylttisiirrot P:hen, kokoa_monta.py valmiiden
   naapureiden kanssa (kangas_px palajako.json), kuittaus postilaatikkoon (worktree wt/karttaseppa-postilaatikko, detached:
   fetch + checkout --detach origin/claude/postilaatikko, push HEAD:claude/postilaatikko), rivi PT:lle (runko-vs + sauma).
   Kaikkien jälkeen kokoaminen koko kankaaksi ja tasot (luovutus 20261102-2210 AVOIN 2).
2. **Tasankopoltto:** seuraa N/ketju.out. Ketjun jälkeen N/LUE.md "Ketjun jälkeen" (delta perusta vasten, välitaso
   uudelleen, VIENTI.md JU:lle, NS vaihtaa osoitteen, Tanska-pari pelistä PT:lle). PR 6089 merge, kun checkit vihreät.
3. Vanha 27.10. poltto: T7-arkistointi (N/arkistoi-vanha.zsh) katkesi, lähde ehjä; ei tarvita ennen kuin levy < 50 Gi.
4. Vanhat: NUI:n vastaus maamerkkien alojen muotoon; 7.48 muut Pariisin osat vasta KK:n suunnitelman jälkeen.
