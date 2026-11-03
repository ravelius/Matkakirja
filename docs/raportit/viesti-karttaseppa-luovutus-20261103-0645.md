# Karttaseppä: luovutus 3.11.2026 klo 06.45 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-0610.md (PR 6087; käsitelty: AVOIN 1–3 jatkuvat alla, odottavat muita).
Syy: kontekstivahti 25 %. K = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tasangot-mäet-20261103/` (LUE.md = koko koe).

## TEHTY
1. **Tasankojen matalat mäet (työlistan rivi "pidossa" 27.10. lähtien), PT KUITTASI 06.4x.** Aiempi korostus (resepti 2026-10-26,
   pelissä junasta 214, 2026-10-26-pohja-20261027) oli liian heikko. Uusi: `reliefi.tasanko` + seututavoite (seudun keskikaltevuus
   × (1 + paino) ≤ tavoite → kalliomaa ei rypisty). Resepti **2026-11-03** {kerroin 8, k0 0,06, pohjaM 1500, tavoite 0,05}.
   Koodi haarassa `karttaseppa/tasangot-maet` (pushattu; f5c016939 koodi, 1f2801778 resepti + testi, testit vihreät), worktree
   `/Users/Shared/Claude/wt/karttaseppa-tasangot-maet`. Haara pohjautuu karttaseppa-tasangot-213:een (EI mainissa) → PR mainiin.
   Kuvat PT:lle: K/pt-pari-tasangot-2-20261103.jpg (Tanska, Etelä-Suomi, Skåne/Smålanti, Alpit; pyramiditaso z8).

## AVOIN (järjestyksessä; Pariisin palat ja saapumisvideo AINA edellä, PT)
1. **Välitason saapumisvideo**: NS lähettää polun (JU:n simuvuoro) → katso, ettei tyhjää välitasoa näy → rivi PT:lle.
2. **Pariisin palat 1–15**: Codex ei ole generoinut (posti 67a53bb14 viimeisin, `git log origin/claude/postilaatikko`). Tarkistus
   `tarkista_ala.py`, kokoaminen kuten luovutuksessa 20261102-2210 AVOIN 2. G (piirroskaupunki-merkintä) sen jälkeen.
3. **Tasankopohjan koko poltto (PT: kun kone joutilas, ei JU:n/NS:n ajojen aikana)**:
   - Mallina `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tasangot-poltto-20261027/` (ketju.sh: joutilas ≥ 10 min → aja.sh
     pohja z0–z8 + syvä z9–z10 → pallo/aja-pallo.sh → purku → kerma/aja-kerma.sh). Kopioi uuteen kansioon (esim.
     tasangot-poltto-20261103), vaihda: W = wt/karttaseppa-tasangot-maet, `--resepti 2026-11-03`, `--versio 2026-11-03-pohja`,
     pallon V/T, kerman nimi (esim. 2026-11-03-p060, --pohjanimi), ajo-id:t. data2 ja korkeuspalat voi linkittää vanhasta.
     DEM: polta-paikallisesti.sh ottaa NAS:lta (/Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/dem) — varmista NAS ennen.
   - Ennen ketjua: koepala koe.zsh:lla (K/koe.zsh) myös z5–z7 (kaukotasot, 3′/1′) ja Alankomaat/Pohjois-Saksa, ettei tavoite
     tee kaukotasolle yllätyksiä (seutuM 6 km on z5:llä vain muutama pikseli).
   - Delta: vie-delta.mjs edelliseen julkaistuun (2026-11-03-pohja-valitaso tai sen perus) → vain muuttuneet palat.
   - Sitten VÄLITASO UUDELLEEN uuden pohjan päälle: `TASOT=9,10 … piirra2.py eurooppa.npz <pohja> <ulos> V/pallo-z10.json`
     (V = proto-3d/_tyo/karttaseppa/valitaso-20261103, aineisto T7 Matkakirja-karttaseppa/valitaso-osm/) → uusi kansio
     julisteet/pallo/laatat/2026-11-03-pohja-tasangot-valitaso (tai vastaava) → VIENTI.md JU:lle → NS vaihtaa SileaUrlin
     (+ kerma-osoite) → pari pelistä (Tanska ennen | jälkeen) PT:lle → asemataulun rivi "Tanskan ja muiden tasankojen matalat
     mäet näkyviin" PT:n kautta.
   - PR haarasta karttaseppa/tasangot-maet mainiin (rebase origin/main; sisältää myös 213:n 1455e9f17 + 63a5e6c6e + revertit).
4. Vanhat: NUI:n vastaus maamerkkien alojen muotoon; 7.48 muut Pariisin osat vasta KK:n suunnitelman jälkeen.

## Opit
- Vanha pohja 2026-09-30-pohja-20261015 on poistettu CDN:stä (säästöpaketti): ennen-kuvat poltetaan itse (koe.zsh, ~40–80 s/alue z8).
- CDN (media.matkakirja.app) vaatii User-Agentin (403 ilman). Pallon laatat: {z}/{x}/{y} XYZ, vaikka URL-pohjassa {reverseY}.
- Pikselikohtaiset rajat (lähirinne, leveämmän pohjan yhtenäisyys, karheussuhde) eivät erota moreenia kalliosta; ero on tiheydessä.
- Koepalojen kokoaminen: K/kokoa.py (rinnakkain), K/lahi.py (täysi tarkkuus), Python venv-rembg (PIL), aina `-I`.
