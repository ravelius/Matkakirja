# Karttaseppä: luovutus 11.11.2026 klo 10.27 (KS)
Syy: konteksti 27 % (pehmeä raja), luonteva tauko: KJ37 ja KJ38 odottavat JU:ta. Korvaa -1000:n; taustat ja ketju:
`git show b51085cf3:docs/raportit/viesti-karttaseppa-luovutus-20261111-1000.md` (ja sen -0926: tyyliohje, testikomennot, zpiirra.py, raivausputki, talot_paketti.py).
HUOM kello: aja `date` ennen jokaista aikaleimaa. KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.
Worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, nyt haarassa karttaseppa/syvyysveto (e75ff1dae), puhdas, pushattu natiivi-backupiin.
HUOM: ÄLÄ `git push` ilman refspeciä; aina `git push natiivi-backup HEAD:refs/heads/<haara>`.
Vahti: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min) – viritä uudelleen.
Testit (proto-worktreessä): `sh Kartta-testit/kaanna.sh` (pallo-koe: 758), `sh Peli-testit/kaanna.sh` (912), `sh Peli-testit/unity-tarkistus.sh` (aina sh).
Esikatselu: `OHJELMAKOHTEET_VIENTI=<kansio> sh Kartta-testit/kaanna.sh` → obj; `/opt/homebrew/bin/python3 _tyo/karttaseppa/koodijuna/zpiirra.py <obj> <png> 30,12 120,40` (ILMAN -I, muuten numpy puuttuu).

## Tehty 10.00–10.27
- 224.67: Montparnasse a4f6cd17b + talot v14 JU:lla jo 09.59, MR60 jonossa (PT kysyi 10.1x, vastattu). Odota LINKKI-riviä.
- KIINNITETTY KUUMAILMAPALLO (koe, ei junaan): natiivi-backup karttaseppa/pallo-koe, kärki 2cf7b7e48 =
  a4f6cd17b + NUI bd7f0ea44/ee1c731cd + pallo b9f34b0b9 + KK-palaute f86401fd8 + sivuköydet 2eba4c391 + NUI 27ef4dd78 (ankkuri MaanPinta.Nosto) + NUI 8923f43b9
  (UI-pallo häipyy 3D:n näkyessä, kyltti jää, napautus mallin rajoista; OhjelmaKohteet.KoodimallinNakyvyys). Testit 758/912/unity 0.
  Malli OhjelmaKohdeKuumailmapallo.cs: UI-pallo (ilmapallo-v1, Verne) × 1,4, kori 11 m, laki 42 m, hamppuköysi paaluun + 3 sivuköyttä, rautarengas,
  sorakenttä r 23,5 (0xE2D5B4), tallattu ympyrä. Kohde "Kuumailmapallo" Korvaa "kuumailmapallo" (komento koodimallit kuumailmapallo 1), MaaH 45 (Louvre).
  Puut: puut-pariisi-kartta.bytes −53 (raivaa-puut.py … 48.8646 2.3268 24.5), muutos pysyvä, ei kytkimen takana.
  KK 10.1x: suunta oikea; ei keinuntaa; ei junaan ennen KK:n sanaa. Muistio _tyo/karttaseppa/pallo-tuileries/MUISTIO.md, kuvat esikatselu-1/-2.png.
- KJ37 JU:lla: 2cf7b7e48, sk-mac-pallo-kj37.txt (12 kuvaa kp37-ennen-* | kp37-pallo-*, mm. -louvre, -lahin-pelikamera, -yleis) →
  lokit/karttaseppa-pallo-kj37-2cf7b7e48; alkaa MR60:n käännöksen alettua.
- SAINTE-CHAPELLE (NUI katse-2, lokit/nui-napautus-katse-2-2c75bcf22/a-sainte-chapelle k-000500 | -000650 | -000950):
  a) TORNIN KÄRKI katkesi lähennyksen jälkeen. Syy (hypoteesi): varjostinten 60 m:n syvyysveto + kartan lähitaso ≥ 50 m (PalloKierto.cs ~3295) →
     kaikki < ~110 m kamerasta leikkautuu. Korjaus e75ff1dae (natiivi-backup karttaseppa/syvyysveto = a4f6cd17b + SyvyysVeto() 4 varjostimessa:
     NotreDameKirkkoYhteinen.hlsl + NotreDameKirkko ääriviiva, OhjelmaKohde, TaloKerros). Varjostinkäännöstä ei ole testattu → KJ38 JU:lla
     (sk-mac-sc-kj38.txt, 6 kuvaa sc38-*, lokit/karttaseppa-sc-kj38-e75ff1dae, KJ37:n jälkeen). Jos varjostinvirhe → korjaa; jos kärki yhä katkeaa → hypoteesi väärä.
  b) VAALEA VINO LEVY SC:n kuoriosan läpi (k-000950) = naapuritalon katto (talot v12 SC-lovi ei riitä) → talopaketin korjaus (seuraava paketti v15). TEKEMÄTTÄ.
  NUI:lle ja PT:lle kerrottu: molemmat KS:n.

## Jono (järjestys)
1) KJ37 kuvat → katso KK:n 4 kohtaa: pallo yleisnäkymässä (42 m, kantaako kyltti), kentän väri karttaa vasten, yksi varjo (jos kaksi: poista tallattu ympyrä
   KpLaikka), vanha UI-pallo ei näy. Parit SUORAAN KK:lle (kopio PT), ajon kansio NUI:lle (katsoo päällekkäisyyden). KK OK → junaan vasta KK:n sanalla:
   juna-ehdokas juna-224:n kärjen päälle cherry-pickeillä (pallo + NUI:n 4) + Oletus? (kysy KK: kytkin oletukseen) + puut-bytes.
2) KJ38 kuvat → kärki ehjä? → junaehdokas (cherry-pick e75ff1dae) PT:lle/JU:lle.
3) SC-talolevy (1b) → talot v15.
4) Petit Palais (KK: GP:n vieressä tavallinen ruskea talomassa).
5) Overture-mittaus (ks. -0926).
Hylätyt, ÄLÄ vie: talot-paketti-pariisi-invalidit-vain-hylatty, -invalidit-v8-hylatty. Ämpärin versionumeroa ei käytetä uudelleen.
