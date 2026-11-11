# Karttaseppä: luovutus 11.11.2026 klo 10.00 (KS)
Syy: PT:n pyyntö (nollaus Montparnassen junaehdokkaan jälkeen), uusi iso työ (pallo) puhtaalta pöydältä. Korvaa -0926:n; taustat ja ketju:
`git show 3dbb24b88:docs/raportit/viesti-karttaseppa-luovutus-20261111-0926.md` (tyyliohje, testikomennot, zpiirra.py, raivausputki, talot_paketti.py-komento).
HUOM kello: aja `date` ennen jokaista aikaleimaa. KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.
Worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, nyt haarassa karttaseppa/montparnasse-juna (a4f6cd17b), puhdas, pushattu natiivi-backupiin.
HUOM: ÄLÄ `git push` ilman refspeciä; aina `git push natiivi-backup HEAD:refs/heads/<haara>`.
Vahti: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min) – viritä uudelleen.
Testit (proto-worktreessä): `sh Kartta-testit/kaanna.sh` (757), `sh Peli-testit/kaanna.sh` (912), `sh Peli-testit/unity-tarkistus.sh` (aina sh).
HUOM: _tyo/karttaseppa on symlinkki T7:lle → `find` tarvitsee polun "/Volumes/T7 4TB/koodaus/proto-3d/_tyo/karttaseppa/" (tai find -L).

## Tehty 09.53–10.00
- KJ36 Montparnasse (JU 09.53, 11 kuvaa) katsottu → parit KK:lle 09.5x: _tyo/karttaseppa/kj36-montparnasse/ (tee-parit.py; rajaus-lahi-*.jpg).
  KK 10.00 OK → JUNAAN. PT: 224.67.pt-ok.
- JUNAEHDOKAS a4f6cd17b (natiivi-backup karttaseppa/montparnasse-juna = Orsay-ehdokas f2346e167 + cherry-pick 50834884f (=8348e4eac, ristiriita
  OhjelmaKohteet.cs: ratkaise-juna.py) + Oletus "montparnasse" + talot v14 = palat-v38-montparnasse). Paketti koodijuna/talot-paketti-pariisi-v14
  (v13 → v14 1 pala 0,5 Mt, SHA256SUMS ok). Testit 757/912/unity 0. Rivi JU:lle 09.59 (toimitettu). SEURAAVA PAKETTI = v15.
- Varjoläikät Montparnassen aukion vasemmalla laidalla (lähikuva): ei puukerros (Nahtavyysalue-puiden kovat varjot sammuvat puiden mukana; kartan
  puut-pariisi-kartta.bytes: ei puita 63 m:n säteellä) eikä talopaketti → todennäköisesti maan piirros. KK:lle kerrottu, ei estä junaa.

## Jono (järjestys)
0) Seuraa: JU vie v14 + a4f6cd17b → MR → 224.67 linkkiin. Ei muuta tekemistä, ellei JU kysy.
1) KIINNITETTY KUUMAILMAPALLO (Tuileries; KK 10.00 "seuraavaksi"). Kaikki tausta jonon kohdassa 3 tiedostossa -0926 (tavoite, luonnos, värit, esitys KK:lle).
   UUTTA: _tyo/karttaseppa/pallo-tuileries/MUISTIO.md:
   - Pelin Tuileries-puut = KartanElama.Puut (Assets/Matkakirja/Linssit/Unity/KartanElama.Puut.cs), Resources/Elava/puut-pariisi-kartta.bytes
     (PUU1, 261 519 puuta, origo 48.86122 2.35092). Ankkurin ympärillä tiheä bosketti: 101 puuta ≤ 40 m. Raivaus = uusi bytes ilman puita
     säteellä ~30 m (kenttä r 23 m + latvusvara, PuuKoko 2,5). laske-puut.py <bytes> <lat> <lon> <r> laskee; poisto-skripti vielä tekemättä.
     Resources-tiedosto on buildissa (ei ämpäri) – nimeä/kommentoi versio.
   - NUI ee1c731cd (natiivi-ui/pallo-maa): KaupunkiPalloMitat.TuileriesLat/TuileriesLon + MaaTuileriesM (78) julkisina → viittaa niihin
     (cherry-pick tai odota junaan). UI-pallo piiloon 3D-pallon näkyessä: NUI tekee kytkimellä, kun lähetät näkyvyysrajan (taso tai korkeus)
     mallin valmistuttua; KK päättää kuvasta. KK: "sovi piste NUI:n kanssa" – piste sovittu (sama ankkuri).
2) Petit Palais (KK: Grand Palais'n vieressä tavallinen ruskea talomassa) pallon jälkeen.
3) Overture-mittaus (yksi kaupunki: height / num_floors / roof_shape -osuudet lähteittäin vs. talokoneen OSM), ks. -0926.
Hylätyt, ÄLÄ vie: talot-paketti-pariisi-invalidit-vain-hylatty, -invalidit-v8-hylatty. Ämpärin versionumeroa ei käytetä uudelleen.

LISÄYS 10.0x: JU 09.59: talot v14 ämpärissä (virheitä 0); MR60 jonossa: a4f6cd17b → 224.67 MR59:n (224.66) linkin jälkeen; LINKKI-rivi tulee KS:lle ja PT:lle.
