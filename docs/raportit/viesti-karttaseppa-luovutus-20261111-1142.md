# Karttaseppä: luovutus 11.11.2026 klo 11.42 (KS)
Syy: konteksti pehmeällä rajalla, luonteva tauko (junaehdokas ja KJ37 JU:lla). Korvaa -1104:n; taustat ja ketju: `git show b80ef41b6:docs/raportit/viesti-karttaseppa-luovutus-20261111-1104.md`
(ja sen -1027 / -1000 / -0926: tyyliohje, testikomennot, zpiirra.py, raivausputki, talot_paketti.py, pallo).
HUOM kello: aja `date` ennen jokaista aikaleimaa. KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.
Worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, nyt haarassa karttaseppa/sc-juna (613f55c18), puhdas, pushattu natiivi-backupiin.
HUOM: ÄLÄ `git push` ilman refspeciä; aina `git push natiivi-backup HEAD:refs/heads/<haara>`.
Vahti: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min) – viritä uudelleen.
K = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna (T7-symlinkki: find tarvitsee -L).

## Tehty 11.10–11.42
- SC OSM-PAIKKA: OhjelmaKohdePariisiSainteChapelle.cs origo z −16,5 m → 48.8553868, 2.3450299 (+ NUI:n NahtavyysEsittely.KiinteatKierrot SC-rivi 48.85539, 2.34503; NUI:lle kerrottu).
  KJ41 (koe 35c1dd1a1, sk-mac-sc-osm-kj41.txt, talot palat-v40-osm) → lokit/karttaseppa-sc-osm-kj41-35c1dd1a1: länsijulkisivu avoimelle pihalle, apsis/torni ehjät.
  Parit K/kj41-sc-osm/kj41-pari-{1-alku,2-90,3-180,4-270,5-lahin}.jpg (vasen KJ40, oikea KJ41) → KK 11.21. KK 11.38 HYVÄKSYI junaehdokkaaksi.
- JUNAEHDOKAS JU:lle 11.41: natiivi-backup karttaseppa/sc-juna 613f55c18 = a4f6cd17b (Montparnasse + v14, 224.67) + syvyysveto e75ff1dae + SC-paikka + talot v15
  (K/talot-paketti-pariisi-v15 = palat-v40-osm, v14 → v15 4 palaa 3,2 Mt, SHA256SUMS ok). Merge-tree juna-224:n kärkeen a61a98089 siisti. Testit 757/912/unity 0.
  PT:lle kopio. Odota JU:n LINKKI-/MR-riviä; v15 vaatii v14:n ensin.
- SYVYYSVETO TODENNETTU 12 kohteella (NUI ennen lokit/nui-kohteet-arkki-1-17ddd9e1c vs KJ40, *-5-lahin): Riemukaari (ennen katto auki leikattuna) ja SC korjautuivat,
  muut ennallaan. Orsayn lähikuvan talon seinä = testin tikkutyöntö ilman mallia (NUI 11.3x: ei KS:n vika, NUI rajaa Orsayn Seinen yltä). KK 11.38: ND/SC pienet ja
  Orsay kaukaa = NUI:n rajaussääntö, ei mallien.
- Tallennevika (ruutu 321×531 ensimmäisen tallenteen jälkeen, JU korjaa Esikatselu.cs): ei koske KJ40/KJ41/KJ37 – niissä ei tallennetta.

## Jono (järjestys; KK 11.38: "Seuraavaksi pallo (KJ37-pelikuvat) ja Petit Palais")
1) Seuraa junaehdokasta 613f55c18 (JU). Ei tekemistä, ellei JU kysy.
2) KJ37 pallo (JU:lla 2cf7b7e48 heti KJ41:n jälkeen) → lokit/karttaseppa-pallo-kj37-2cf7b7e48 → KK:n 4 kohtaa (ks. -1027 jono 1): pallo yleisnäkymässä (42 m, kantaako kyltti),
   kentän väri karttaa vasten, yksi varjo (jos kaksi: poista tallattu ympyrä KpLaikka), vanha UI-pallo ei näy. Parit SUORAAN KK:lle (kopio PT), ajon kansio NUI:lle.
   KK OK → juna-ehdokas cherry-pickeillä (pallo + NUI:n 4 + puut-bytes) + kysy KK: kytkin oletukseen? HUOM uusi hyväksyntäehto: myös esityskameran 4 suuntaa (~120 m).
3) PETIT PALAIS koodimalliksi (KK 09.2x: GP:n vieressä tavallinen ruskea talomassa; resepti = Orsay: ei Tripoa, OSM-talo pois taloista, koodimalli oletukseen).
   Aloitettu: K/petit-palais/tee-pp-pohja.py. OSM relation/2778854 (building=yes, EI heightia), keskipiste 48.8660642 2.3149164, kulma 85,5
   (x ≈ pohjoinen, +z ≈ länsi = pääjulkisivu Av. Winston Churchill). Ulkokehä x −69,5…60,9 z −48,2…41,4 (8 703 m²), sisäpiha x −30,8…22,2 z −17,7…17,4 (1 469 m²).
   Puolisuunnikas: suora julkisivu z ≈ 35 (130 m), keskiportiikki x −15…7 z 35…41, kulmapaviljongit x −69…−51 ja 43…61, takasivu z ≈ −45 (x −45…37), pyöreät nurkat.
   TEKEMÄTTÄ: korkeudet ja kupoli lähteestä (fr.wikipedia "Petit Palais"), tavoitekuva KK:lle ensin (KK tarkastaa visuaaliset itse), malli OhjelmaKohdePariisiPetitPalais.cs
   (Orsay.cs mallina), talot v16 (relation/2778854 pois, raivaus koodimallin pohjalla kuten tee-talot-sc-pohja.py), KJ-ajo esityskameralla 4 suuntaa + lähin → pari KK:lle.
4) Overture-mittaus (ks. -1027/-0926).
Koehaarat (ei junaan sellaisenaan): karttaseppa/sc-osm-paikka 35c1dd1a1, karttaseppa/kohteet-arkki-syvyys 42e9543f7, karttaseppa/pallo-koe 2cf7b7e48.
Hylätyt, ÄLÄ vie: talot-paketti-pariisi-invalidit-vain-hylatty, -invalidit-v8-hylatty, talot-paketti-pariisi-v15-v39-ALA-VIE. Ämpärin versionumeroa ei käytetä uudelleen (seuraava = v16).
