# Natiivisepän luovutus 10.11.2026 klo 20.10

Edellinen: -1705 (89186fbef) ja sen kautta -1635/-1435 VOIMASSA paitsi alla päivitetyt kohdat. Syy: kontekstivahti 25 % (7.37). Älä poista mitään.
Cron 9fa3fe87 ("4 9 * * *" unity-julkaisut.py) ja vahti ovat sessiokohtaisia: LUO UUDELLEEN. Vahti: Monitor
`bash /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/ajovahti/vahti.sh` (30 min, uudelleen aseteltava; kuviot nyt myös usva-*, juoksu-*, puut-*).

## JONO (järjestyksessä; kaikki odottavat JU:ta)
1. USVARAJAUS A/B 60623ec85 (-1705:n kärki, ohje siellä): JU aloitti, mutta lokit/natiiviseppa-usva-a-1 on TYHJÄ klo 19.15 lähtien (ei konsolia,
   ajo.log tyhjä 20.06) → KYSY JU:lta tila ensimmäisenä (jumi/asennus/peruttu?). Lue: muistikatto/jaksot.py, U-rivit, kuvat usvaa/usvab-80-* → pari PT:lle.
2. PUIDEN SÄVY (PT 20.0x, KS:n pari _tyo/karttaseppa/korostus/pari-puut-v0-v2-italie.jpg; työlistassa NS jarj 1):
   SYY: kaupungin ilmaperspektiivi _IlmParam (z = voima) jäi globaaliksi kaupunkia suljettaessa – KaupunkiIlmakeha.Paivita kutsutaan vain
   kaupunkinäkymän ruuduissa, KaupunkiKuva.Suljettu ei nollannut; kartalla vain KaupunkiPuu.shader lukee sen (siksi vain puut). Kartan
   _ElavaTaivas*-arvot EIVÄT ole syy (KartanElama.AsetaValo joka ruutu). KS:n lokissa "kaupunki: kuva palautettu" = Suljettu ajetaan.
   KORJAUS 5de74b863 (natiivi-backup natiiviseppa/puut-ilmakeha, wt /Users/Shared/Claude/wt/proto-natiiviseppa-puut, juna 224 53806bc7d:n päällä, unity 0):
   KaupunkiIlmakeha.Nollaa() (voima, IlmParam, pilvet, hämärä; loki "kaupunki: ilmakehä nollattu (kaupunki suljettu)") Suljettu-kutsusta +
   häivytyksen lopussa kerran nolla (ennen jäi dt:n verran jäännöstä). MAC-AJO JU:lla (lähetetty 19.59, ei kuittausta):
   _tyo/natiiviseppa/puut-ilmakeha/ajopyynto-1.md → lokit/natiiviseppa-puut-mac-1-5de74b863: katso p0-ennen-opasta / p1-opas-suljettu täysikoossa
   (puut vihreät molemmissa, vrt. KS:n v2) + lokirivi → pari PT:lle (3 riviä) → junaan PT:n sanalla.
3. JUOKSUPELIN PIIRTO (PT 17.0x, KK:n suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-juoksupeli-linjat-ja-tarkastus.md
   osa 7 + -tarkastus-piirto.md): ENSIN mittaus, sitten pienet korjaukset; jokainen pari ennen | jälkeen + ruutuaika PT:lle.
   MITTAUSKÄÄNNÖS fb62178af (natiivi-backup natiiviseppa/juoksu-piirto, wt /Users/Shared/Claude/wt/proto-natiiviseppa-juoksupiirto, juna 224 5f8780605,
   unity 0): uudet QA-kytkimet `ui juoksupeli valo kopio 0|1` (requiresColorOption Off; Ultra pyytää läpinäkymättömän kopion, mikään juoksun
   varjostin ei lue sitä), `valo heijastuskauko M` (400), `valo heijastusvali M` (12); tila-rivillä näkyvät. Valmiit kytkimet: varjot, leivheitto,
   jalki, msaa, heijastus, jaady (Time.timeScale 0 → sama kuva).
   AJO JU:n jonossa usvan jälkeen (JU kuittasi, T/jono-nj-ns-juoksu-piirto.zsh): _tyo/natiiviseppa/juoksu-piirto/ajopyynto-1.md, sk-juoksu-piirto.txt
   2× → lokit/natiiviseppa-juoksu-piirto-{1,2} (odottaa "kulkukartta ladattu" ≤ 7 min, aikaraja 25 min, lämpö Normaali).
   LUE: `python3 _tyo/natiiviseppa/juoksu-piirto/lue.py <kansio>` → gpuMs per jakso (KehysMittari 5 s, 1. jakso pois) ja ero perukseen:
   L1–L4 liikkeessä (heijastus pois / 100 m+24 m), P1/P2 jäädytettynä (varjot0, leivheitto0, kopio0, jalki0, msaa0, kaikkipois = pääpiirto).
   Kuvat P*-* täysikoossa (kopio0 ja perus pitää olla samat). Sitten korjaukset samaan haaraan: kopio pois oletuksena, heijastuksen rajaus,
   PaivitaKappaleet vain uusille (tarkastus kohta 3); varjo leivotuille vain lähelle on keskikokoinen → PT:n sanalla.
   TIEDOSTOJAKO PK:n kanssa (kuitattu): NS = JuoksuV4Maailma.Heijastus/Jalki/Valo.cs, Kartta/Valopohja.cs, uusi JuoksuPiirtoMittaus.cs;
   PK = JuoksuV4.cs, .Vapaa.cs, omenat, linjat, käännökset, ovet, Palatsi.cs.
4. AVAUSLENNON VARJOT (omistaja 17.30 PT:n kautta, ei kiire, puuttuvat seinät/rakenteet ensin): "varjot piirtyvät vasta tietyllä etäisyydellä".
   Koodi 1d (Valo.cs AlkuVarjoMatka: matka 200 + 3 × kameran korkeus ≤ 800 m, heittoraja ja häive Valopohja.PeliVarjoMatka samassa suhteessa)
   näyttää lukemalla johdonmukaiselta → sk-juoksu-piirto ottaa A1–A5-avaus-kuvat + valo tila (alkuvarjo m, heittäjät N/M). Katso niistä.
5. -1705:n MUUT: Britannia-2-kylmä, PE-vieritys, kertoja – odottavat kuitua (JU).

## VIESTIT TÄLLÄ VUOROLLA
PK: tiedostojako (kuitattu). JU: juoksu-piirto-ajopyyntö (kuitattu, lisäys oleta/25 min), puut-Mac-ajopyyntö (19.59). PT: juoksu-piirto jonossa,
avauslennon varjot mukana, puiden syy + 5de74b863. JU 17.3x: 224.32 = b3ed3f766 sisältää 94303946d (tieto).
