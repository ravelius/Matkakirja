# Natiivi-UI: luovutus 2.11.2026 klo 09.30 (eleet todistettu, aarrepiste ja veneet tehty ja simulla; PT:n jako 09.1x jonona)

Edellinen: viesti-natiivi-ui-luovutus-20261102-0900.md. Syy: konteksti pehmeällä rajalla (Raamattu 7.37).
PT:n jako 09.1x (KK:n suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261102-pariisi-piirroskaupunki.md,
kohdat 3 ja 5; Raamattu 2.204 cd5817b73): A eleet + tahti → PT → NS; B nostot piirrokselle; D aarrepiste; F Avauskortti ja kutsuminiatyyri pois;
E saapuminen; G kioski + info; C kadonneiden leikkeet; H veneet. Mittaa sujuvuus jokaisesta erästä.

## Proto-haarat (ketju: eleet → tahti → veneet, kaikki junan 218 rungon 63c2a05b5 päällä)
- **natiivi-ui/piirros-eleet-218** 629ff9da9 (wt/proto-natiivi-ui-piirros-eleet): ennallaan, TODISTETTU (alla).
- **natiivi-ui/piirros-tahti-218** (wt/proto-natiivi-ui-piirros-tahti): tähti 3d093444a, kytkimet + suoristus 8840ff31c, leikekerros 8ee9492b9,
  **3dcfbfd90 aarrepiste (D)**: Karttapisteet "aarre" jonoon 3090 (piirros Transparent+50…, ZTest Always, peitti sen) ja kaikki pisteet
  PiirrosKerros.NakyvaLat-kohtaan häivytyksen tahdissa (vain piirroksen alueella); vanha verkko vapautetaan.
- **natiivi-ui/piirros-veneet-218** (wt/proto-natiivi-ui-piirros-veneet), tahti-haaran päällä: **0ccd48639 veneet (H)** PiirrosKerros.Veneet.cs
  (PiirrosKerros nyt partial): Codexin 4 venettä + vanavesi KS:n reittiä pitkin (201 pistettä vakioina), kuvat lahig-pikseleistä maanpinnalle kuten
  laatat, sama varjostin ja alfa, kierto ≤ ±35°, yläreuna pohjoiseen (länteen peilikuva), päätyhäivytys 250 px, Joutosykkeen kello (levossa
  veneet pysähtyvät 3 s viimeisestä kosketuksesta kuten aarrepisteen syke: PT:n tarkistettava, haluaako omistaja jatkuvan liikkeen).
  942cb9636 `komento veneet [on|pois|nayta i [korkeus]]`. **8ada386f3 TasoVersio = "veneet-20261102"** (veneettömät laatat samaan junaan).
  Kuvat ämpäriin: uusi paketti **proto-3d/_valmiit/pariisi-veneet-kuvat-20261102-vienti-20261102** (5 PNG samaan kansioon veneet-20261102/,
  LAHTEET + SHA256SUMS) → PT:n kuittaus → JU vie yhdessä KS:n laattapaketin kanssa.

## Todistukset (yhteinen-iPad13, simu-lukko.sh kaari, käännös 3dcfbfd90 / 942cb9636; skenaariot kunkin kansion *.txt-nimellä)
1. **Eleet** proto-3d/lokit/todistus-eleet-c-629ff9da9-20261102-0906: OK, 0 poikkeusta. Pariisi 53,7 km → 1. nipistys 17,5 km → 2. nipistys
   5,7 km (ennen 2. hylättiin "ele UI:lla"). Ei kyltin avausta nipistyksestä. Huom.: "kahden sormen ele kartalle" ei tullut, koska kyltti ei
   tällä kertaa ollut sormen alla, joten korjauspolkua ei ajettu; ele ei kuitenkaan enää jumiudu. Liuku ja Temple-torni OK.
2. **Tahti** todistus-tahti-c-3dcfbfd90-20261102-0909: tähti kyltissä OK (`ui kohdenostot` → "tähti"), suoristus OK (54 km 40° → nipistykset →
   pohjoinen ylös, kuva 7), 0 poikkeusta. VIRHEET SKENAARIOSSA: peli alkoi Marseillesta (aarrepiste ei Pariisissa) ja `ui linssi valitsin` avasi
   ☰-valikon. **Uusinta tahti-d** (todistus-tahti-d-3dcfbfd90-20261102-0917, peli Pariisista, 0 poikkeusta): `peli aarrepiste` → "lukittu"
   (piste on olemassa), mutta kuvissa 1 ja 1b (12 km, 4 km) EN NÄE lukittua pistettä piirroksen päällä → TARKISTA (onko lukitun pisteen alfa
   0,45 kehät liian himmeät, vai ankkuri piirroksen ulkopuolella / väistö; avaa piste vastaamalla oikein: Fokus.AarrepisteAuki =
   MinitehtavatOikein > 0). `tap 1301 38` ei avannut suurennuslasia (kuva 3 = kartta ilman paneelia) → hae napin oikea paikka `ui puu`:sta
   (suurennuslasin nappi oikeassa yläkulmassa ☰:n vasemmalla) ja aja kytkinosuus uudelleen. Kytkimet ovat siis yhä todistamatta simulla.
3. **Veneet** todistus-veneet-c-942cb9636-20261102-0914: OK, 0 poikkeusta, kaikki 4 kuvaa ladattu, veneet liikkuvat (paikat lokissa), kuvat
   1–5 + video veneet-liike.mp4 (MATKAKIRJA_PIIRROS = proto-3d/_tyo/natiivi-ui/veneet-testi-20261102/: veneettömät laatat + veneet).
   Ennen/jälkeen-pari: tahti-c kuva 1 (vanhat laatat, piirretyt veneet) vs veneet-c kuva 1 (sama kamera). Sujuvuus: simulla pitkät ruudut
   32–37 ms "ulkona" (kone kuormassa, load 23–32, Blender) eivät johdu veneistä; iPad-mittaus tekemättä.

## SEURAAJAN JONO
1. Aarrepiste näkyviin todisteeksi + kytkimet suurennuslasin kautta (ks. tahti-d), sitten pari PT:lle. PT:lle lähti 09.3x jo eleiden ja
   veneiden tulos. Kuittaus → merge-pyyntö NS:lle (eleet → tahti → veneet samaan junaan veneettömien laattojen kanssa; veneiden PNG-paketti JU:lle).
   Skriptit ja skenaariot kopioitu kuhunkin todistuskansioon (kaanna-*.zsh + *.txt) + `simu-lukko.sh kaari natiivi-ui yhteinen-iPad13 -- zsh …`
   (SIMU_MUISTIRAJA=16); käännös proto-kaanna.sh ilman UDID:tä voi ajaa simuajon rinnalla.
2. **B nostot piirrokselle**: NostoSaannot.cs (Kartta/) KaupunginSisainen 12 km:n sulku → poikkeus piirroskaupungeille; KS:n
   proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/kohteet-20261102/sijainnit.json (lat_kuva/lon_kuva → PiirroksenLat, ratkaisu piste |
   leike | kyltti); lajimerkit Ikonit-sarjasta, nähtävyydet kaukaa; 4 toista ★-kylttiä (KS KYLTIT-NUI.md) → kuvapari kahdella zoomilla PT:lle.
3. F Avauskortti + kutsuminiatyyri pois piirroskaupungista; kaupunkipisteen napautus = zoomaus keskustaan.
4. E saapuminen (SaapuminenTiedossa UiNakymat.cs:908 → esilataus; AjaSaapumisnakymaan PalloKierto.cs:1795 → 48.857, 2.351, 0°; alkaa kun tasot
   välimuistissa, isoisän tekstin aikana; uusi peli: lento yleisnäkymään, sitten erillinen zoom, omistaja 09.12) → video PT:lle.
5. G kioski + info leikkeinä (KS), C kadonneiden leikkeet (KS täyttää PiirrosKerros.Leikkeet).
6. Sujuvuusmittaus iPadilla jokaisesta erästä.

## PT 09.4x
Eleet 629ff9da9 ja veneet 8ada386f3 kuitattu NS:lle, veneiden PNG-paketti JU:lle; veneiden pysähtyminen levossa ok. Tahti-haara vasta, kun
aarre + kytkimet on todistettu. eleet-c.txt:n "kahden sormen ele kartalle" -odotus poistettu (PUUTE johtui odotuksesta, korkeudet laskivat).
