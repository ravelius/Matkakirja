# Natiivi-UI: luovutus 9.11.2026 klo 17.21 (kontekstivahti 27 %; korvaa -1656:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd.
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-temple (paikallinen natiivi-ui/temple-orbit = d2596ef17, pushattu natiivi-backup
natiivi-ui/kuvaotsikko). Tarkistus `sh Linssit-testit/unity-tarkistus.sh`, `python3 -I tyokalut/pohjavahti.py`. Skenaariot
/Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/, raportti+arkit _tyo/natiivi-ui/temple-palkki-2-katsottu/RAPORTTI.md.

## 1. KETJU natiivi-backup natiivi-ui/kuvaotsikko = d2596ef17 (päällä b75419ad3)
- 075015709 TEMPLE-PISTE KIINNI KYLTTIIN: kertojan punainen piste (NostotKartalla.KertojaPaikka) → saman kohteen kohdenostokylttiin
  (Kohdenostot.KertojanNosto-linkki/nimi/<40 m), muuten MaanPinta.Nosto-korkeus. KATSOTTU ajossa nui-temple-piste-1-ipad-075015709 ✓,
  PT: junaan 224, arkki KK:lla. (t-4:n vihreä kiila = Notre-Damen mallin flèche, ei NUI:n; PT kuitannut.)
- 22e9e92e8 PYÖREÄN KUVAN OTSIKKO + KUVATEKSTI (OMISTAJA 16.26): SaapumisKuvat.LisaaOtsikko (paperilappu kuvan päällä),
  SuurennaNosto(id, …) + Kohdenostot.KuvanTiedot; testi `ui saapumiskuva nosto <kohde>`; skenaario sk-kuvaotsikko-1 (o-1…o-4).
- 8ef2b3561 ✕ JÄTTI PISTEEN: KortinLukija.LuettavaOmistaja: tausta vain yhä pinnattuna.
- 066244413 BASTILJIN PIKKUKUVAN AARREKULMA: Nahtavyysarkki.AvaaKohdePalkkina välittää IhmeNauhan kadonneelle.
- d2596ef17 3D-TÄHTI STRIIMIKARTALLA (KK:n havainto, PT): PiirrosKerros.tahtiAlueella (ilman Karikatyyri-kytkintä) → tähtiruudut latautuvat.
  Pelkkä tähtikorjaus junaan: natiivi-ui/kadonnut-tahti = fd1a7da87 (b75419ad3 + korjaus).

## 2. AJOT JU:lla (katso ≤ 1000 px, arkki PT:lle 3 rivillä)
- FI 066244413 käynnissä: lokit/nui-temple-piste-1-ipad-066244413 (tarkista x-1: ei punaista pistettä ✕:n jälkeen; a-1: kulma
  Bastiljin pikkukuvassa), nui-kuvaotsikko-1-{ipad,iphone}-066244413 (otsikko kuvan päällä + kuvateksti).
- PYYDETTY d2596ef17: nui-temple-tahti-1-ipad-d2596ef17 (t-1…t-4: 3D-tähti Temple-merkin yllä; sama rajaus kuin
  temple-piste-1-arkki), nui-kadonnut-tahti-1-ipad-d2596ef17. EX kadonnut-tahti b75419ad3 pyydetty perumaan.
- Pieni iPad -nipistys PERUTTU (omistaja poissa), JU ajaa kun omistaja palaa.

## 3. Avoimet
- v-1: Nähtävyydet (138) Pariisissa – oletettavasti oikea määrä (kadonneet 9 erikseen), skenaarion "(12)" oli arvaus; ei tarkistettu.
- PeittoRuutu/Napautettavat käyttävät 0 m:n korkeutta (vain piirrostilassa, jolloin Nosto = 0) – ei korjattu.
- Jono tämän jälkeen tyhjä → rivi PT:lle "JONO TYHJÄ: Natiivi-UI".
