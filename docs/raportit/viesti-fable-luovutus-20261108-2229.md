# PT:n luovutus 8.11.2026 klo 22.29 (konteksti 30 %, pehmeä raja)

Korvaa -1838:n AJOSSA-kohdat; -1838:n, -1605:n, -1345:n ja -1010:n OPIT voimassa. Viestit mcp__ccd_session_mgmt__send_message session id:llä
(/Users/Shared/Claude/osoitekirja.md; SendMessage-raja täyttyy ~10 viestissä). Junarivit VAIN juna.py:llä, työlista tyolista.py:llä.

## UUSI PYSYVÄ SÄÄNTÖ
Raamattu 12.26 (PR 6504, mainissa 8fa8954dc; omistaja 19.08 "Kyllä"): iPadilla vain muisti, nopeus, kosketus ja koeversion tarkistus;
kaikki muu ensin Macilla iPad-/iPhone-koossa; omistajalle näytettävät parit saavat tulla Macilta. JU:n kuvavahti ipad-skenaario-f1c.zsh
(puuttuva kuva → SEIS; KUVAVAHTI=0 pois). Mac-esikatselu kuvaa vain "kuva X"-riviltä (komento kuva = iPad). Mac-kuvissa kiilat reunoilla
= 640×480-tasovalinta → omistajalle menevissä `ui kamerasuhde laite` + siirtyma 5 0 30 (NUI 30f7090d8).

## JUNA 223 AUKI (ei julkaisua ennen omistajan pyyntöä)
Kärki 84a91d530 (natiivi-backup julkaisija/juna-223) = TF 223 617d6ca2b + NUI pieni nostokuva puhelimella 30f7090d8 (+ 65f0277be rajaus,
omistaja 21.15 "Saa") + kierto 135° cb801202c (lento kääntää −45°) + Louvre-valinta 2f7df0ced (Ei nyt / Esittelykierros / Museoon; omistaja
22.03). unity 0, Kartta 725/725. NRE MuseoSovitin.Sulje:797 = vanha, vain editorin sulussa → ei tehdä.
EHDOKKAAT junaan 223:
- NUI iPad 70 % kierrossa (omistaja 22.07): 79351459b (natiivi-ui/esittely-ipad-70; kapeampi kuvakulma vain iPad, PT valitsi) – JU:n Mac-ajo
  sk-ipad70-2 → pari PT:lle → KK → junaan. (Ensimmäinen cf657f1d0: ND ei kasvanut, lähitaso esti.)
- NUI kameratappi (omistaja 22.16 + 22.18 "aina olemassa"): 2d69ff27e (natiivi-ui/kameratappi), himmeä 0,22 Pulun vieressä, käänteiset akselit;
  suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261108-kameratappi.md. JU:n Mac-ajot iPhone pysty/vaaka + iPad → PT → KK.
- NS merenpohjan pallo kytkimellä 3413b4565 (natiiviseppa/pohjapallo-juna, Linssit › Keskeneräiset "Merenpohja 3D" oletus pois; testit ok).
  PT pyysi JU:lta git log 84a91d530..3413b4565 + diffstat + kytkin pois = 84a91d530:n kuvat identtiset. ÄLÄ POIMI ennen listaa: alkuperäinen
  f7cf0bd7c raahasi 12 committia (c54d3ba0d, 7ea8d6ebc oletukseksi; Valoseppä meri painuu; lista julkaisija-tyokalut/juna223-pohjapallo-f7cf0bd7c-loki.txt).
  Kun junassa → rivi KK:lle (KK oikaisi omistajalle 22.13: Keskeneräisten valinta).
- KS topografian pitkä sulku f2ad1a19d (karttaseppa/topo-sulku-peite; beige poissa, PT katsoi pari k950–995). EI JUNAAN NÄIN: nojaa c1cde1148
  (NUI lentoraja-5 koehaara). PT pyysi: junaversio 84a91d530:stä (aebf0648e:n muutos + LinssiUi-ehto, NUI hyväksyi ehdon), peite häivyttäen
  ~0,3 s, 6,7 s tumma ruutu → Mac-pari PT:lle → KK ennen junaa.

## AJOSSA (kokeet, eivät junaan)
- FPV-DRONE: OMISTAJA 21.54 "Jättiläisdrone": Skaala = D/3 ≈ 9 333 (D 28 000 m), ×15 (omistaja 14.47 "Korostus pysyy"), ei loivennusta.
  Viat korjattu: sininen aukko + vaakaviiva fe37c4ae2, kermakaista f69c5c04c (12 usvakerrosta), taivas säteen kulmasta e152a9959 (PT katsoi
  osa4b kallistus OK). Ruskea lähikivi = fpvlahi (lahi0 OK) → NS:n luovutuksessa a35e187f1. Osa 4 lentomalli 92125fce1 (törmäykset aitoja).
  KK tilaa Codexilta kolme dronekuvaa (drone ≈ 190 m).
- MERENPOHJA: kohokalotit v5 95f5af086 kuitattu (KS poltti v5:llä, CDN). Pohjapallo f7cf0bd7c näytetty omistajalle 22.09. Reunapiikit
  (Peru–Chile + Etelä-Atlantti) NS:lle, ei estä. Lentoraja-6 7bbea110d (keskiosa ~2× korkeammalla) PT+KK katsoneet OK; jäljellä NUI:lle
  s. ~12,9 laattapala + Biskajan sauma, s. ~13,1 valkoinen lovi (k-000642–655).
- ★-KYLTIT (KK 21.59, EI korttia: omistaja 2.11. 08.42 paatokset-2026-11.md:90): kadonneen rakennuksen ★-kyltti kiinteästi nykyisen kyltin
  ALLE ilman limitystä, kaikki parit (Grand Palais/Palais de l'Industrie, Orsay, Trocadéro, Les Halles). NUI: ankkuri nykyisen kyltin
  laatikkoon (3D-mallin kyltti eri pisteessä). PT:n aiempi "Grand Palais väistyy" -suositus oli VÄÄRÄ.

## ROOLIT
NUI luovutus 06d4ae978 (-2230), NS a35e187f1, KS 5c837f59d, JU d850313b6 (+ uudempi?). Postivahti 22.2x: NUI ja NS eivät nollaudu, koska
jatkavat → PT pyysi molempia clear_session self. Postivahti tekee oman luovutuksen.

## OPIT
- Ennen PT:n suositusta korttiaiheeksi: hae omistajan aiemmat päätökset (paatokset-2026-*.md) – kylttiasia oli jo päätetty.
- Koehaaran päälle tehty korjaus (KS topo, NS pallo) raahaa koekommitteja: pyydä aina junaversio junan kärjestä + JU:n git log ennen poimintaa.
- iPad-ajoja ei pyydetä ulkoasuun (12.26); roolit odottavat joskus turhaan iPad-kuvia – kerro, että Mac riittää.
