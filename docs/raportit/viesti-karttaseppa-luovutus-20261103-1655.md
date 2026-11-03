# Karttaseppä: luovutus 3.11.2026 klo 16.55 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-1630.md (käsitelty; sen AVOIN 3–5 jatkuvat alla). Syy: konteksti 25 % (7.37).
P = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/`, E = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/esittelypaikat-20261103/`,
N = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tasangot-poltto-20261103/`.

## TEHTY tässä sessiossa (16.40–16.55)
1. **Kylttikoot (JU:n koe 9b9695a7d):** mitattu kuvista lähin 0,01 ≈ 14 pt (infopaneelin teksti), z14 ~7, keski ~6,5. PT 16.5x: OK, pidetään
   ("näkyvät kunnolla vasta lähizoomissa"). Ei muutoksia.
2. **Pitkät ruudut (PT 16.5x, NS:n mittaus):** proto **b50afd4c2** (haara karttaseppa/ruutu-laatat-218, worktree
   /Users/Shared/Claude/wt/proto-karttaseppa-ruutu-218, pohja JU:n koe 9b9695a7d) → PT:lle rivi lähetetty, JU yhdistää.
   - Laattapalvelin: taustan esilataus alkaa vasta, kun kamera levossa 0,5 s (TaustaLepoS, KameraKirjoittaja.ViimeLiike).
   - Varitaso: ei joka kehyksen GetComponent/taulukkoa. Nimikerros: alamerkinnät Nimikerros.Elavat / .Lado / .Piirra.
   - Syy: LataaTausta 76/64/39 ja Varitaso 56 ms olivat roskankeruuta (6/8 ruudussa GC 1×). Varaukset pitkissä ruuduissa
     (koe-iso-9b9695a7d konsoli): Nimikerros 100 Mt, NostoKerros 39, Laattapalvelin 38, PiirrosKerros.Purku 16, LataaTausta 7,7.
     Skriptit proto-3d/_tyo/karttaseppa/ruutu-20261103/syyt.py ja kt.py (`python3 -I kt.py <konsoli.txt>`).
3. **v6-liitos valmiina:** P/tarkistus/koonti/v6.py (pala16 + korjauspala17 v5:n päälle, lukko = v5:n väri, reunarivi 12 +
   saumaliukuma 100; kuivaharjoitus ohjauskuvilla OK, alfa 255 koko kankaalla). kokoa_pariisi.sh:n loppuun v6-rivi.
   tasot-v5/kylttisiirrot-peliin.py: korjauspalan (palajako `korjauspala: true`) kohteissa vain sen oma piirros (ei keskiarvoa).
   Jäänne: P/tarkistus/koonti/v6-ygbiu7vt/ (kuivaharjoituksen väliaikaiset, 4 png; ei poistettu, 12.9).

## AVOIN (järjestyksessä)
1. **Pala16 + pala17 Codexilta** (postilaatikko 5f8d4e13e, 74fd75f34; ei toimitusta 16.55). Kun `P/_review-pala16/SHA256SUMS` tai
   `-17/`: tarkista SHA256SUMS ja koko (1536 × 1024), katso täysikokoisena saumat; `python3 tarkista_ala.py _review-palaNN
   palat/palaNN/merkit.json` → sitten
   `"/Volumes/T7 4TB/Matkakirja-karttaseppa/venv-kartta/bin/python" -I tarkistus/koonti/v6.py tarkistus/koonti/pariisi-koko-rgba-v5.png
   tarkistus/koonti/pariisi-koko-rgba-v6.png 16 17` (vain saapunut numero, jos toinen puuttuu) →
   `tarkistus/koonti/tee-tasot-v5.py <v6.png> <uusi kansio, esim. proto-3d/_tyo/karttaseppa/_valmiit/pariisi-tasot-isoisa2-20261103>`
   (tasot.json lähitason alueet: nyt pitäisi olla yksi suorakaide) → kylttisiirrot-pala17.json (Codexin) + `tasot-v5/kylttisiirrot-peliin.py
   <Merkittavat.json>` → proto: PiirrosKerros.TasoVersio uusi nimi + Tasot[lahig].alueet (rivi ~207) + Kylttisiirrot-taulukko; VeneVersio
   on oma kansio (ei muutu). Kuvapari PT:lle sama rajaus kuin JU:n pari-zoom-2-keski (proto-3d/lokit/julkaisija-koe-pari-6da58f32b/).
   PT 16.5x: "v6-liitos heti Codexin toimituksesta, TasoVersio, rivi PT:lle". Ämpärivienti JU:lla vie-paketti.sh (uusi kansio, 11.26).
2. **Pitkät ruudut jatko:** seuraavan JU/NS-mittauksen syyriveistä Nimikerros.Elavat/Lado/Piirra → karsi suurimman varaukset
   (epäilys LisaaElavat: 200 riviä/kehys, jokaisella Aluenimi + Paikat-sanakirja + merkkijonot). Tavoite < 33 ms.
3. **Esittelypaikat** (ennallaan, luovutus 1630 AVOIN 3): silmukka pid 26124 (irrallinen), Overpass 502/fetch failed 16.4x.
   Valmis = E/silmukka.log "VALMIS" (log syntyy vasta ensimmäisen kierroksen jälkeen) → E/MUISTA.txt → worktree
   /Users/Shared/Claude/wt/karttaseppa-esittelypaikat → vienti + testit → PR → PT.
4. **Tasankopoltto** (ennallaan, AVOIN 4): ketju pid 26125 odottaa joutilasta Macia; työlistan tilanne päivitetty 16.52.
5. Vanhat: turisti-info/lehtikioski-leikkeet vanhaa tyyliä (jää); 27.10. poltto T7-arkistointi vain PT:n luvalla.
