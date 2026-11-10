# Pelikoodari: luovutus 10.11.2026 klo 04.15

Korvaa kaikki aiemmat. Edellinen: `git show ca8d78dfd:docs/raportit/viesti-pelikoodari-luovutus-20261110-0333.md` (hoidettu tai alla).
Kuvat ≤ 1000 px, laajat haut Sonnet-agenteilla. Viestit send_messagella session-id:llä. Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu
(haara pelikoodari/juoksu-kylma = 28c92a109, remote natiivi-backup). Python ilman -I:tä.
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksu-leivottu/ (TULOS-muisti-3-valmistelu.md, TULOS-kylma-3.md, sk-ipad-muisti-3.txt).
Pulu-työpuu /Users/Shared/Claude/wt/pulu-kaupungit-maat (haara pelikoodari/pulu-kaupungit-maat = 20d3470c1, origin).

## TEHTY TÄSSÄ VUOROSSA (haara pelikoodari/juoksu-kylma, unity-tarkistus 0 virhettä)
- d49cf7a83 LEIVOTTU TAIVAS: tyokalut/juoksu-taivas-leivonta.py (KoostaTaivasPalat numpyllä → ASTC 4×4 sRGB ilman mipejä 16 Mt, ent. 64);
  peli LataaLeivottuTaivas (PalvelinUrl(kansio + taivas-koottu.astcm) → JuoksuLeivottu.Lataa, joka hyväksyy nyt pelkän tason 0), muuten koostus.
  QA "valo taivasleivottu 0|1". juoksu-leivonta.py säilyttää hakemistossa muiden .astcm-rivit. PT kuittasi taivasparin (taivas-pari/).
- ccae179fe LATAUSKUVAT: avauksessa toisen suunnan kuvat pois muistista, häivytyksen jälkeen otsikko/pää/leima (pohjakuva jää
  PeitaUudelleenaloitus-peitoksi), suljettaessa kaikki. Uusi Kuvat.PoistaMuistista(url) (UI/Kuvat.cs, NUI:n alue: pieni lisäys).
- 5c4423908 Palvelin leivottu-v3 (= v2 + taivas). JU VEI 04.0x: 1056 objektia, SHA OK, CDN OK.
- 28c92a109 GC ENNEN ENSIMMÄISTÄ KUVAA: muisti-2:n huippu 3997 syntyi lämmityksen ensimmäisissä kuvissa (gfx +268 169–171 s), GC vasta
  171,3 s (sen jälkeen −126). Nyt GC + UnloadUnusedAssets heti Valmis-tilassa ennen Piirraa (vain avauksessa). QA "juoksupeli gcennen 0|1".
- KYLMA-3 (318b4a3d0, JU): latauksen ositus 3a 36,1 s / 3b 35,3 s (kylma-2 115,5, vanha 122) ✔; esihaku 460 glb taustalta, etuala odotti 1/2.
  Muistihuippua EI saatu (kylma-3a:n muisti-tarkka.log oli muisti-2:n vanha). TULOS-kylma-3.md, rivi PT:lle 04.0x.

## JONO
1. MUISTI-3 (JU:n iPad-jonossa seuraavana, käännös 28c92a109, sk-ipad-muisti-3.txt → lokit/pelikoodari-muisti-3; vahti: ajo.log VALMIS):
   huippu fp muisti-tarkka.log:sta (TARKISTA ALKU-rivin aika = tämä ajo!), konsolin "GC ennen ensimmäistä kuvaa", taivasTila
   "v3 leivottu … 16 Mt", latauksen ositus; juoksukuva muisti3-juoksu-35s (PT: pelitila, taivas, ei valkoisia) + paluukuvat a/b/c
   lähempää (talot näkyvissä). Tavoite huippu ≤ ~3800 KAIKISSA skenaarioissa (PT; savu2 d7a8cdc19 sai VIKA 4085 latauksessa = junaehto).
   Kuvat täysikoossa/rajauksina ennen arviota → TULOS-muisti-3.md + 3 riviä PT:lle.
2. Jos > 3800: seuraavat erät TULOS-muisti-1.md / muisti-2-analyysi (TULOS-muisti-3-valmistelu.md): osasarjan valoatlakset ja
   ulkorengas ennen ensimmäistä kuvaa, malloc-huippu; ASTC 6x6 vain PT:n luvalla.
3. Paketti-v3/lattia: LAV:n lattia2 ei vielä ämpärissä → kun on: juoksu-leivonta.py lista paketti-v4 (taivasrivi säilyy, aja myös
   juoksu-taivas-leivonta.py samaan) → vienti → Palvelin. ÄLÄ muokkaa lattian geometriaa/valoa.
4. Kaupunki/maa-erä (1 870) lähdetarkistukseen myöhemmin (PT kirjaa).
5. JUNAAN vasta PT:n kuittauksella (huippu ≤ ~3800, kylmä ✔ 35–36 s, lämmin ✔ 15,5 s, kuvat ilman valkoisia).

Testit: `sh Peli-testit/unity-tarkistus.sh` (työpuussa, sh ei zsh). Laitteet: iso iPad JU:n vuorolla.
Vahti: lokit/pelikoodari-*.ajo.log VALMIS-rivit (Monitor, 30 min, uudelleen tarvittaessa).
