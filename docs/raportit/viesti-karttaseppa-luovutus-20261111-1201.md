# Karttaseppä: luovutus 11.11.2026 klo 12.01 (KS)
Syy: konteksti pehmeällä rajalla (25 %), luonteva tauko: KJ42 on JU:lla ja karkea kuva KK:lla. Korvaa -1142:n; taustat ja ketju: `git show 914eb1d57:docs/raportit/viesti-karttaseppa-luovutus-20261111-1142.md`
(ja sen ketju -1104 / -1027 / -1000 / -0926: tyyliohje, testikomennot, zpiirra.py, raivausputki, talot_paketti.py, pallo).
HUOM kello: aja `date` ennen jokaista aikaleimaa. KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.
Worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, nyt haarassa karttaseppa/petit-palais (182edf30c = 613f55c18 + Petit Palais), puhdas, pushattu natiivi-backupiin.
HUOM: ÄLÄ `git push` ilman refspeciä; aina `git push natiivi-backup HEAD:refs/heads/<haara>`.
Vahti: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min) – viritä uudelleen.
K = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna (T7-symlinkki: find tarvitsee -L).

## Tehty 11.46–12.01
- JU 11.43: talot pariisi v15 ämpärissä; MR61 = 613f55c18 → 224.68 MR60:n (a4f6cd17b, v14) jälkeen; KJ37 pallo 2cf7b7e48 yhä JU:n jonossa.
- PETIT PALAIS koodimalliksi, commit 182edf30c (haara karttaseppa/petit-palais): Assets/Matkakirja/Kartta/OhjelmaKohdePariisiPetitPalais.cs + .meta,
  OhjelmaKohteet.cs (Kohde "Petit Palais", Korvaa "petit-palais", EI Koodimallit.Oletuksessa: kytkin "koodimallit petit-palais 1"), testi PetitPalaisinMitat,
  kaanna.sh-rivi. Testit: Kartta 758/758, Peli 912/912, unity-tarkistus 0 virhettä.
  Mitat: OSM relation/2778854, origo 48.8660642 2.3149164, akseli 85,5 (+x ≈ pohjoinen, +z ≈ länsi = pääjulkisivu), MaaH 36,5 (maasto.py z12: pinta 36,3–42,2,
  matalin julkisivun pohjoispäässä). Korkeudet valokuvasta (Commons, julkisivu suoraan edestä): räystäs 17,5, kaide 20,5, kaari 29, lyhty 38,5, paviljonkien kupolit 26.
  Overture (vain mittaus) 15,5 keskikorkeus. Wikipediat eivät anna korkeuksia.
  Osat: pääsiipi pylväineen + kaide uurnineen, porttikaari (tynnyri, kultainen portti, portaat), keskikupoli rivoineen ja lyhty, kulmapaviljongit (päätykolmio,
  matala neliökupoli), vinot sivusiivet ja takasiipi (liuske ulos, lasi sisään), rotundat takanurkissa, pihan puolikaaren pylväikkö + lasikattoiset galleriat rivoin.
- Viitekuvat ja luonnokset: K/petit-palais/pp-tavoite-viite.jpg (edestä + ortokuva), pp-luonnos-1/2/3.png (zpiirra), pp-luonnos-pari.jpg (oikea vs malli).
  Tavoite KK:lle 11.49, karkea kuva KK:lle 11.57 (PT kopio). KK EI VIELÄ VASTANNUT (viestit jonossa KK:n ikkunassa).
- TALOT v41-pp: K/raivaus-1-1-petit-palais/ (siisti-v41.json = siisti-v37 + _pois relation/2778854; aja-palat-v41.sh = v40-osm-ajon syötteet SC_DZ -16.5;
  kokoa-v41-pp.py). Vain pala 15_16594_11271 muuttui (1 603 188 → 1 508 040 t). Muita OSM-taloja ei PP:n alueella ole (tarkistettu osm.json).
  Ämpäriin vasta KK:n OK:n jälkeen talot-paketti-pariisi-v16:ksi (talot_paketti.py kuten v15; v16 vaatii v15:n ensin).
- KJ42 pyydetty JU:lta 12.00 (KJ37:n jälkeen): skenaario K/sk-mac-petit-palais-kj42.txt, ennen (v40-osm, kytkin 0) vs koodi (v41-pp, kytkin 1),
  esityskamera ~130 m 4 suuntaa + yleis + lähin → lokit/karttaseppa-petit-palais-kj42-182edf30c.

## Jono
1) Seuraa junaehdokasta 613f55c18 (MR61 → 224.68). Ei tekemistä, ellei JU kysy.
2) KJ37 pallo (JU) → KK:n 4 kohtaa (ks. -1027 jono 1) + esityskamera; parit SUORAAN KK:lle (kopio PT), ajon kansio NUI:lle.
3) PETIT PALAIS: odota KK:n palaute luonnoksesta (korjaa ennen KJ42:ta, jos KK pyytää). KJ42 valmis → parit (ennen | koodi, sama rajaus) SUORAAN KK:lle, kopio PT.
   KK OK → junaehdokas: 613f55c18 (tai MR61:n kärki) + 182edf30c + "petit-palais" Koodimallit.Oletukseen + talot v16 (palat-v41-pp). Tarkista ennen sitä,
   näkyykö varjostimen "pinnan alla" -piirto takaosassa (rotundat ~5 m pinnan alla MaaH:lla 36,5).
4) Overture-mittaus (ks. -1027/-0926).
Koehaarat (ei junaan sellaisenaan): karttaseppa/sc-osm-paikka 35c1dd1a1, karttaseppa/kohteet-arkki-syvyys 42e9543f7, karttaseppa/pallo-koe 2cf7b7e48, karttaseppa/petit-palais 182edf30c.
Hylätyt, ÄLÄ vie: talot-paketti-pariisi-invalidit-vain-hylatty, -invalidit-v8-hylatty, talot-paketti-pariisi-v15-v39-ALA-VIE. Ämpärin versionumeroa ei käytetä uudelleen (seuraava = v16).

## LISÄYS 12.0x
- JU 12.0x: KJ42 jonossa KJ37:n jälkeen (Mac, ipad 0.465) → lokit/karttaseppa-petit-palais-kj42-182edf30c.
- KK 12.0x: sanallinen tavoite KELPAA. Luonnoskuvan KK katsoo oman nollauksensa jälkeen ja vastaa muodosta ja mittasuhteista.
  "Tee sillä välin talot v16 ja pelikuvat esityskameralla; älä hio yksityiskohtia ennen palautettani."
  → Talojen raivaus on tehty (palat-v41-pp). Paketti talot-paketti-pariisi-v16 kootaan talot_paketti.py:llä kuten v15 (palat-v41-pp), mutta ämpäriin vasta KK:n OK:lla.
  Pelikuvat = KJ42 (JU). Älä muuta mallia ennen KK:n palautetta.
