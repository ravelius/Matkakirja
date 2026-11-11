# Karttaseppä: luovutus 11.11.2026 klo 11.04 (KS)
Syy: konteksti 30 % (pehmeä raja). Korvaa -1027:n; taustat ja ketju: `git show c446f4890:docs/raportit/viesti-karttaseppa-luovutus-20261111-1027.md`
(ja sen -1000 / -0926: tyyliohje, testikomennot, zpiirra.py, raivausputki, talot_paketti.py, pallo).
HUOM kello: aja `date` ennen jokaista aikaleimaa. KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.
Worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, nyt haarassa karttaseppa/kohteet-arkki-syvyys (42e9543f7), puhdas, pushattu natiivi-backupiin.
HUOM: ÄLÄ `git push` ilman refspeciä; aina `git push natiivi-backup HEAD:refs/heads/<haara>`.
Vahti: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min) – viritä uudelleen.
K = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna (T7-symlinkki: find tarvitsee -L).

## Tehty 10.33–11.04 (SC esityskameralle, PT:n ja KK:n ensimmäinen työ)
- JUURISYY 1/2/4 (tornin kärki, apsiksen vaalea laatta, levenevät seinät) = lähitaso + 60 m syvyysveto: kun piirroslinssi sammuu (NUI katse-2 kehys 626→629)
  kamera tulee lähelle ja kaikki < ~110 m leikkautui. KORJAUS e75ff1dae TOIMII: KJ39 (karttaseppa/sc-katse 9d0dfcde7 = NUI 2c75bcf22 + e75ff1dae,
  lokit/karttaseppa-sc-katse-kj39-9d0dfcde7): torni, apsis ja etualan talot ehjät. Parit K/kj39-sc-katse/kj39-pari-{a3,a5,k500,k650,k950}.jpg → KK 10.42 (kopio PT).
  KJ40 (karttaseppa/kohteet-arkki-syvyys 42e9543f7 = NUI 17ddd9e1c + e75ff1dae, NUI:n 12 kohteen esitysarkki + talot v39; PT:n vaatimus):
  lokit/karttaseppa-kohteet-arkki-kj40-42e9543f7, arkit K/kj40-kohteet-arkki/kj40-arkki-1…4.jpg: kaikki 12 ehjiä (en nähnyt leikkautumia).
  Ennen-vertailu = NUI:n kohteet-arkki-1 17ddd9e1c (JU:n jonossa, → lokit/nui-kohteet-arkki-1-17ddd9e1c). KJ38 peruttu.
- JUURISYY 3 (talomassa apsiksessa): SC:n oma OSM-rakennus relation/3344870 jäi 208 m²:n taloksi (rantamaski nollataan tee-talot-nd.py:ssä) + raivaus oli
  Tripon suorakaide 22° (apsis ja luoteiskulmatorni 1,7–2,5 m ulkona). Uusi skripti K/raivaus-1-1-sc/tee-talot-sc-pohja.py: este = koodimallin pohja
  kuperana verhona + 0,5 m, SC:n OSM-rakennus pois, ja (v40) puolitasokiilat YHDISTETÄÄN särmien kumoamisella (v39:ssä Palais de Justice 28 kiilaksi →
  sahalaitaiset katot KJ40:n SC-lähikuvassa). Ympäristö SC_DZ = mallin siirto z-akselilla.
  Palat: palat-v39-sc-pohja (kiilat, ÄLÄ käytä), palat-v40-yhdistetty (paikka nyt), palat-v40-osm (SC_DZ -16.5; HUOM-v40-osm.txt). Kaikki = v38 + 4–5 palaa.
- PT 10.4x: kaikkien koodimallien omat OSM-rakennukset pois → tarkistettu (scratchpad-skripti, tulos): Louvre/Panthéon/Opéra/Invalidit(+Dôme)/GP/Riemukaari/
  Sacré-Cœur/Eiffel/Montparnasse 100 % omassa maskissaan, ND esteellä, Orsay way/63178753 siisti-v37 _pois; ainoa puuttuva oli SC (nyt pois).
- Talot v15 paketoitiin v39:stä → nimetty K/talot-paketti-pariisi-v15-v39-ALA-VIE (ei viety; v15-numero yhä vapaa, tee uudelleen valitusta v40:stä).

## AVOIN KYSYMYS KK:lle (lähetetty 11.0x, ei vastausta)
KJ40:n SC-lähikuva (05-sainte-chapelle-5-lahin.png): tarkalla raivauksella Palais de Justicen talot tulevat kiinni länsijulkisivuun (ruusuikkunan eteen),
koska koodimalli on Tripon paikalla 16,5 m luoteeseen OSM:stä (KK 5.11. "14 m luoteeseen kadulta" koski 2× Tripoa). SUOSITUS: malli OSM-paikalle
(SC_DZ -16.5: Palais'n kanssa päällekkäin 6 m², julkisivun eteen oikea Cour de la Sainte-Chapelle). Vaihtoehto: paikka ennallaan + erillinen pihan raivaus.

## Jono (järjestys)
1) KK:n vastaus →
   a) OSM-paikka: OhjelmaKohdePariisiSainteChapelle.cs origo z −16,5 m: (E +14,22 m, N −8,38 m) → Lat ≈ 48.8553867, Lon ≈ 2.3450298 (laske tarkasti),
      päivitä kommentit; tarkista riippuvuudet (grep SainteChapelleLat/Lon: Nahtavyysalue, MalliKyltit, NUI:n esitys, testit OhjelmaKohdeGeometriaTestit).
      Talot = palat-v40-osm. b) Paikka ennallaan: palat-v40-yhdistetty + pihan raivaus julkisivun eteen (uusi este tee-talot-sc-pohja.py:hin).
2) Uusi kuva-ajo (SC lähin + 4 suuntaa; voi käyttää K/sk-mac-kohteet-arkki-kj40.txt:tä, talot kansio → valittu palat) → pari KK:lle suoraan (kopio PT).
3) KK OK → JUNAEHDOKAS juna-224:n kärkeen (tarkista kärki: natiivi-backup/julkaisija/juna-224; 224.67 = a4f6cd17b odotti MR60:tä): cherry-pick e75ff1dae
   (+ SC-paikka, jos a) + talot v15 = valittu palat (`python3 -I tyokalut/talot_paketti.py pariisi <palat> 15 K/talot-paketti-pariisi-v15
   --edellinen K/talot-paketti-pariisi-v14/julisteet/talot/pariisi/v14/hakemisto.json --buildiin <repo>`), testit 758/912/unity 0 → JU:lle.
   Syvyysveto koskee kaikkia malleja → mainitse JU:lle/PT:lle, että KJ40 on hyväksyntäkuva.
4) KJ37 pallo (JU:lla 2cf7b7e48, alkaa MR60:n käännöksen alettua) → KK:n 4 kohtaa (ks. -1027 jono 1).
5) Petit Palais, 6) Overture-mittaus (ks. -1027).
Hylätyt, ÄLÄ vie: talot-paketti-pariisi-invalidit-vain-hylatty, -invalidit-v8-hylatty, talot-paketti-pariisi-v15-v39-ALA-VIE. Ämpärin versionumeroa ei käytetä uudelleen.
