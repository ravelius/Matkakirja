# Natiivisepän luovutus 8.11.2026 klo 16.20

KAIKKI VANHEMMAT LUOVUTUKSET, ketjua ei ole; edellinen git show b66be9d70:docs/raportit/viesti-natiiviseppa-luovutus-20261108-1545.md
(lue sen kohta 1 vain taustaksi: beige on nyt korvattu paperilla). Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi.
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7,
KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, NUI local_43962c89-fc14-4098-9dd7-6153133ffcea, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b.
Nollauksen syy: konteksti pehmeällä rajalla 26 % (7.37). Cron "4 9 * * *" (unity-julkaisut.py, /opt/homebrew/bin/python3.14 ILMAN -I:tä) luotu
15.4x (60fd8271): LUO UUDELLEEN. Numpy/PIL: /opt/homebrew/bin/python3.14 -P skripti.py.
Levy 12 Gi (JU:n käännösraja 12): NS:n vanhat luovutus-wt:t ja proto-wt:t jarru + merenpohja poistettu; jäljellä wt/proto-natiiviseppa-{fpv,fpvb,kierto,tyokalut}
ja tämä wt. Poista lisää vain omia, puhtaita ja pushattuja.

## TILA 8.11. 16.20 (VOITTAA kaikki vanhemmat)
1. NAVAT = TF-ESTE: PAPERI ecabf1855 KUITATTU PT:lle 16.2x, JUNAAN VASTA PT:N SANALLA (ecabf1855, EI 9e98f55e5).
   natiivi-backup natiiviseppa/navat-beige (wt proto-natiiviseppa-kierto) = 9e98f55e5 + KalottiVersioStriimi "2026-11-08-paperi" (KS 718879977,
   PR ravelius/Matkakirja#6501) + 10.34-lainaus korjattu kortin sanoiksi (NapaKannet.cs, NapaTaytto.cs). unity 0.
   JU 16.11: 3/3, VIKA 0. Kuviotiheys sisä ≈ ulko (r6 1,15–1,17 vs 1,22–1,24; beige 0,24–0,44), pehmeä raja poissa; pohjoinen/Atlantti = beige.
   Parit + MITTAUS.txt: proto-3d/_tyo/natiiviseppa/navat-koho/paperi-parit/ (KK:n rajaus = tav-etela y 0–1117, KK:n kuva 2,27× pienennetty).
   Jos PT/KK palauttaa: KS:n uusi poltto → kytke samoin, sk-navat-tav2 → kuvio.py (beige-parit/) → parit.py (paperi-parit/).
2. MERENPOHJA 3D, POHJAPALLO f7cf0bd7c (natiivi-backup natiiviseppa/merenpohja-pohjapallo, wt proto-natiiviseppa-fpv; pohja c54d3ba0d = NUI
   natiivi-ui/merenpohja-koe): pallon reunan kirkkaansininen kaista = pohjapallon reliefin sininen (38,78,145): pallo oli 3 km ellipsoidin alla,
   painunut pohja jopa 11 km × 15. Nyt Pohjapallolaskenta.Syvyys(meriPainuu, k, Reikakorjaus.MeriSyvyysM) = 3 km + 11 km × k, rakennus myös
   KorkeusKerroin.Muuttui:sta. Kartta-testit 712/712, unity 0. JU:N JONOSSA (T/ns-mp-pohjapallo.zsh): _tyo/natiiviseppa/merenpohja-pohjapallo/
   ajopyynto.md, sk-merenpohja-pohjapallo.txt (mp-pallo-3d, mp-pallo-tyyni-3d, mp-mariaanit-3d, mp-puertorico-3d) → lokit/natiiviseppa-merenpohja-pohjapallo/.
   KUN KUITTAA: parit vanha lokit/nui-merenpohja-1-c54d3ba0d/mp-*-3d | uusi täysikoossa + reunan rajaus kuten KS:n
   (_tyo/karttaseppa/merenpohja-3d/pari-pallo-20261108/pallo-reuna-rajaus-*.png); konsolista "pohjapallo: … syvyys 168000 m (meri painuu)";
   tarkista ettei laattojen raoista näy avaruutta (pallo nyt 168 km alempana) → PT ≤ 3 riviä. KOE, ei junaan.
3. FPV B EI KÄYNNISTY iPadilla: 5a8933619 (15.47) ja 2fa367316 (16.12) "failed to launch" CoreDeviceError 10002 / POSIX 22, 6 yritystä, 0/15.
   Muut samaan aikaan (paperi, NUI nn4, mp1b) käynnistyivät, A d1c8a074f 15.3x käynnistyi. Shader error 0 käännöksessä ja konsolissa, metal-tarkistus rc 0.
   Ero d1c8a074f → 5a8933619: tee_tileset.py (_fpvLahi RadioHamaraan), MatkakirjaTileset.shadergraph + MatkakirjaRasteri.shadersubgraph
   regeneroitu (id:t vaihtuivat), KorkeusKerroin static readonly FpvLahiId = Shader.PropertyToID + FpvLahi(), Komennot "fpvlahi", PalloKierto 1 rivi.
   Käännöslokit ylikirjoittuneet (T7 proto-natiiviseppa-unity67/tulokset = ecabf1855). JU:LTA PYYDETTY: iPadin kaatumalokit (systemCrashLogs,
   Matkakirja3D-2026-11-08-15/16 .ips) → lokit/natiiviseppa-fpv-b/kaatumat/. JATKA SIITÄ: jos kaatuma varjostimen latauksessa → shadergraph
   uudelleen (vertaa A:n generointiin, Cesium-paketti 1.26.0 polku 1545-luovutuksen kohdassa 4); jos ei .ips:ää → kokeile 2fa367316 ilman
   varjostinmuutosta (palauta shadergraph/subgraph d1c8a074f:stä, pidä C#) erottamaan C# vs varjostin. JU ei aja FPV B:tä ennen uutta shaa.
   2fa367316 = 5a8933619 + DroneKuva katsepiste maahan (DroneMaahan; ennen kiinteä 2000 m → kierron korkeus 2 km → horisonttiusva peitti
   43–129 km:n maaston kermaan = pienoismallin "ei maastoa" -syy, PT:lle kerrottu). Skenaario sk-fpv-ab.txt (a-*/b-* × 7 + pm-yla) ennallaan.
   KUN KUVAT TULEVAT: parit a | b etäisyyksittäin, lähin siisti D metreinä kummastakin, Skaala = D/3 → PT; KK tilaa superdronen kuvan.
4. TOPOESITTELY fdd642058 KUITATTU PT:lle 15.4x (perillä + kierto loppui, kallistus pysyy): _tyo/natiiviseppa/topoesittely/kuittaus/. Avoin: NUI valikkoon.
5. JONO: pohjapallon kuittaus → FPV B:n kaatumaselvitys → kohokartan napakalotit (14.45:n kohta 3) → FPV osa 4. PT kirjaa junat/asemataulun.

## LISÄYS 16.4x (JU): FPV B:llä EI kaatumalokia
systemCrashLogsissa ei yhtään Matkakirja3D-kaatumaa 8.11. → launch hylätään ennen ajoa (POSIX 22), ei kaatuminen. JU epäilee pakettia/asennusta
(allekirjoitus, Info.plist, binääri), ei koodia. Molemmat FPV-käännökset poistettu. Seuraavalla shalla JU tallentaa .app:n ja koko install-tulosteen.
Ehdotus: käännä 2fa367316 uudelleen sellaisenaan (JU) ja vertaa .app (codesign -dv, Info.plist, koko) ecabf1855:n .app:iin ennen koodimuutoksia.

## LISÄYS 16.5x (JU): "failed to launch" = iPadin hetkellinen tila, EI FPV B
NUI:n nn5 697116a8e sai saman ×6 16.41, mutta sama käännös käynnistyi 16.45 ja uusinta 16.46 meni 4/4 (JU: todennäköisesti näytön lukitus).
NS pyysi 16.5x: JU ajaa FPV A/B:n uudelleen 2fa367316:lla (uusi laitekäännös) POHJAPALLON f7cf0bd7c JÄLKEEN → lokit/natiiviseppa-fpv-b/.
Kohta 3:n kaatumaselvitys raukeaa; kuittauksessa tee kohta 3:n "KUN KUVAT TULEVAT" (parit a | b, D, Skaala = D/3 → PT).
