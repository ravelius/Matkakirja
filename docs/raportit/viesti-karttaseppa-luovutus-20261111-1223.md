# Karttaseppä: luovutus 11.11.2026 klo 12.23 (KS)
Syy: PT 12.2x pyysi nollauksen. Korvaa -1201:n (ja sen LISÄYKSEN); taustat ja ketju: `git show 2d0af48bb:docs/raportit/viesti-karttaseppa-luovutus-20261111-1201.md`
(ja sen ketju -1142 / -1104 / -1027 / -1000 / -0926: tyyliohje, testikomennot, zpiirra.py, raivausputki, talot_paketti.py, pallo).
HUOM kello: aja `date` ennen jokaista aikaleimaa. KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.
Worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, haarassa karttaseppa/petit-palais, kärki eab6f7ad2 (= 182edf30c + KK:n 4 korjausta), puhdas, pushattu natiivi-backupiin.
HUOM: ÄLÄ `git push` ilman refspeciä; aina `git push natiivi-backup HEAD:refs/heads/<haara>`.
Vahti: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min) – viritä uudelleen.
K = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna (T7-symlinkki: find tarvitsee -L).

## Tehty 12.08–12.23
- KK 12.08: luonnos 182edf30c kelpaa pohjaksi (muoto, mittasuhteet). Neljä korjausta tehty, commit eab6f7ad2:
  1) Portaali: syvä kaarisyvennys 12 × 3,6 m, laki 23,6, ulkokaari 25,9 m (1,48 × räystäs), pohjalla kultainen portti + tumma kaari-ikkuna + veistosvyö,
     levenevät portaat 10 askelta z 43,7:een + patsasjalustat. Keskikupoli cz 30,5 → 27,2 (rumpu kaarivaipan sisällä, ei syvennykseen), laki 28,2, lyhty 36 (oli 38,5).
  2) Kulmapaviljonkien kaari-ikkuna 4 m, kaari 12,8 → 14,8 (vanha 18,2 m:n kaari jäi palkiston taakse = näytti suorakaiteelta) + kehys + pylväsparit.
  3) Etupaviljongit suorakaiteiksi (x −68 / 59,4); rotundien tamburi 22,4 m:iin harjan (22) yli, rivoitettu kupoli 28, lyhty 31 (uusi apu PpRivaKupoli).
  4) PpLiuske 4A5058, PpLasi B4BECA (ei vihreää). HUOM: zpiirra.py näyttää OBJ:n lineaariset värit sRGB:nä → vihertävä/tumma; korjattu kopio
     scratchpadissa: sed 's/^col=np.clip(\(.*\),0,1)$/col=np.clip(\1,0,1)**(1\/2.2)/' K/zpiirra.py > zpiirra-srgb.py.
  Testi PetitPalaisinMitat päivitetty (MaxY 36, x −68…59,4, z …43,7, syvennys auki, rotundan lyhty). Kartta 758/758, Peli 912/912, unity 0.
- Pari KK:lle 12.24 (kopio PT): K/petit-palais/pp-luonnos2-pari.jpg (valokuva | malli edestä 180,4 + yläviistosta 210,30). Obj: K/petit-palais/vienti-2/.
- JU 12.2x: KJ42 vaihdettu eab6f7ad2:een KJ37:n jälkeen → lokit/karttaseppa-petit-palais-kj42-eab6f7ad2 (ei vielä alkanut).

## Jono
1) Junaehdokas 613f55c18 (MR61 → 224.68) JU:n jonossa. Ei tekemistä, ellei JU kysy.
2) KJ37 pallo (JU) → KK:n 4 kohtaa (ks. -1027 jono 1) + esityskamera; parit SUORAAN KK:lle (kopio PT), ajon kansio NUI:lle.
3) PETIT PALAIS: KK:n vastaus pariin pp-luonnos2-pari.jpg (korjaa, jos pyytää; muutos → kerro JU:lle uusi commit KJ42:een, jos ei vielä ajettu).
   KJ42 valmis → parit (ennen | koodi, sama rajaus, esityskamera 4 suuntaa ~130 m) SUORAAN KK:lle, kopio PT.
   TALOT v16 EI VIELÄ KOOTTU: talot_paketti.py kuten v15, palat K/raivaus-1-1-petit-palais/palat-v41-pp → talot-paketti-pariisi-v16; ämpäriin vasta KK:n OK:lla (v16 vaatii v15:n ensin).
   KK OK → junaehdokas: 613f55c18 (tai MR61:n kärki) + eab6f7ad2:n PP-commitit + "petit-palais" Koodimallit.Oletukseen + talot v16.
   Tarkista ennen sitä varjostimen "pinnan alla" -piirto takaosassa (MaaH 36,5; maasto takana jopa 42 → rotundien alaosa ~5 m pinnan alla).
4) Overture-mittaus (ks. -1027/-0926).
Koehaarat (ei junaan sellaisenaan): karttaseppa/sc-osm-paikka 35c1dd1a1, karttaseppa/kohteet-arkki-syvyys 42e9543f7, karttaseppa/pallo-koe 2cf7b7e48, karttaseppa/petit-palais eab6f7ad2.
Hylätyt, ÄLÄ vie: talot-paketti-pariisi-invalidit-vain-hylatty, -invalidit-v8-hylatty, talot-paketti-pariisi-v15-v39-ALA-VIE. Ämpärin versionumeroa ei käytetä uudelleen (seuraava = v16).
