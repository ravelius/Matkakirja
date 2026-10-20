# Laitetestaaja: luovutus 20.10.2026 klo 17.50 (PT: tilinvaihto)

Korvaa luovutuksen 6a18fed6a (viesti-laitetestaaja-luovutus-20261020-1720.md). Voimassa oleva tila.

## Tila: LEPO, iPad Pro 13 vapaa
Ei käynnissä olevia ajoja eikä taustaprosesseja (kaikki ajoketjut tapettu 17.43; konsoliprosessi suljettu). iPad Pro 13 (00008103-001819421413401E, "MK kehitys" fi.matkakirja.peli.kehitys): NS asensee rungon e3cff21f6 iPhone-paketin jälkeen. Omistaja 17.17: "saat käyttää isoa ipadia aina vapaasti" → iso iPad on roolien käytössä aina, auki olevasta pelistä ei kysytä. iPhone ja iPad Pro 11 eivät kuulu lupaan.
**Omistaja 17.42: iPhone-paketti menee edelle; VS pysäytti kierroksen 5. Ei iPad-ajoja ennen kuin NS on asentanut paketin (~18.45) ja VS kertoo.**

## Tulokset tänään (iPad Pro 13 Release, sokkelo botti siemen 777)
- Korjaus 10e6a5a68: juoksun alun max ruutu 133 ms (ennen 0,3–3,2 s), 16 ruutua >25 ms. Raskas kohta (~14 s, jäädytys `valo jaady 1`) GPU 34,2 ms → EI parane korjauksella. (Älä sekoita: 10,4 ms oli väärä, 26 s:n kohta.) Aineisto proto-3d/lokit/laitetestaaja-208-korjaus-ipad-20261020/ ja -psarja-.
- P-sarja (lt-10e6.txt, proto-3d/_tyo/pelikoodari/gpu-208/): P0 34,2 | P1 skaala 0,8 26,9 | P2 msaa 2 32,9 | P3 25,3 | P4 P3+sumea 0 10,5 | P5 P3+syvä 0 24,2 | P6 P3+liike kamera 11,7; P3-J 9,6. Kuvapari K-P0/K-P3: terävyys P3/P0 54–64 % (ehto ≥95 % ei täyty).
- Hehku e35e43ee0 (hehku-208/tulos.txt): GPU päällä 37,93 / pois 37,92 → hinta ≈ 0.
- Kierros 5 c5f9217ac (varjot-koko/lt-gpu-tulos-5.txt), täysi res, msaa 1, jäädytys ~13 s: A mv 0 26,3 | M1 mv 1 33,6 | K 30,7 | S 29,4 | H0 33,9 | J 24,0; vaihtelu ±4. Avauksen ajat lokissa (LentoAlkaa 0 s … OhjausPelaajalle 8,4 s); AV1/AV2 olivat latausruutua.

## JONO (aja vasta kun VS/NS ilmoittaa iPhone-paketin olevan asennettu)
1. **Kierros 6** (VS): appi 8d53e567e (NS lähettää polun), vaiheet proto-3d/_tyo/linssiseppa2/varjot-koko/lt-gpu-komennot-6.txt, tulokset varjot-koko/kierros6/ + lt-gpu-tulos-6.txt + rivi VS:lle (local_e675f86d-210c-416b-8d83-926194307a44). Skripti valmiina: **docs/raportit/laitetestaaja-pelaaja-tyokalut-20261020/ajo-g6.zsh** (`APP=<.app> zsh ajo-g6.zsh`; muokkaa scratchpad-polku S itsellesi): GPU A/T/A2/J, kuvapari K-taysi/K-08 (Puyi + katot PT:lle, mittari vyoero.py), hehkun lähikuvat H1-t/H0-t (voima 0,5), avauskuvat AV1–3 lokirivistä "juoksupeli avaus: LentoAlkaa t 0,0" (~2/6/9 s; ÄLÄ kosketa ruutua).
2. PK:n P7–P9 (täysi res + msaa 4, raskas kohta 14 s): P7 `valo liike kamera`, P8 `valo sumea 0`, P9 `valo mv 0` yksin + kuvapari P0/P7 juoksussa (Puyin terävyys liikkeessä; ajo-liikekuva.zsh). Kierroksen 6 A/T-vaiheet kattavat osan; kysy PK:lta/PT:ltä tarvitaanko vielä.
3. Valmiit skriptit samassa kansiossa: ajo-10e6, ajo-psarja, ajo-hehku, ajo-g5, ajo-g5kuvat, ajo-g4, ajo-liikekuva (scratchpadin S-polku vaihdettava).

## Menetelmä ja sudenkuopat
- Asennus `xcrun devicectl device install app --device $U <.app>`; ajo: skripti kirjoittaa komentotiedostot Documentsiin (`devicectl device copy to … --domain-identifier fi.matkakirja.peli.kehitys`): `ui-komento.txt` (väli ≥2,5 s), `komento.txt` (`mittaus alku <n>`/`odota`/`mittaus loppu`, `kuva <n>` → <n>.png), `peli-komento.txt` (`uusi-peli 5 amsterdam`), `muisti-tarkka.txt`.
- Käynnistys `devicectl device process launch --terminate-existing --console` taustalle; konsoliprosessin kill päättää appin → vasta kaikkien mittausten jälkeen.
- Jäädytys vain `ui juoksupeli valo jaady 1`. Raskas kohta = `uudestaan 777` + ~14 s (kokonaisaika uudestaan-komennosta, sis. ui:n 2,5 s). Eri jäädytyshetket eivät ole vertailukelpoisia (virhe tänään).
- GPU-ms: `ui lasi mittaa N nimi`; analyysi `python3 -I /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ruutuaika-analyysi.py nimi=mittaus.txt`. Ajojen välinen vaihtelu/lämpö ±3–4 ms: ajojärjestys vaikuttaa, ABAB-parit.
- Terävyysparit vain vyoero.py-luvuin (/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/tyokalut/vyoero.py <päällä.png> <pois.png>; ei silmäarviota).
- Scratchpad tyhjenee sessiossa vaihtuessa: skriptit ovat docs/raportit/laitetestaaja-pelaaja-tyokalut-20261020/.

## Muut pysyvät
Simu vain JU:n "SIMU NYT" -viestillä; oma simu poistetaan ajon jälkeen. Laitekierros ennen ulkoista TF-jakoa (Raamattu 9.11): pohja docs/raportit/laitekierros-tarkistuslista-pohja.md. Viestit vain valmis erä/jumi/kysymys, PT ≤ 3 riviä, send_message session id:llä.

## Kanavat
PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31; KK local_8e4fcfed-fc40-464c-854a-1d031b005332; PK local_11aca9cd-eda6-4db9-9019-8a153c8b8795; VS local_e675f86d-210c-416b-8d83-926194307a44; NS local_fcc10552-5810-49bf-b0cf-188456f1231c; JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b; Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b.
