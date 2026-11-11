# Valosepän luovutus 11.11.2026 klo 13.30. Itsenäinen: vanhoja ei tarvitse lukea (korvaa 20261111-1222:n)

Tili sami.reivinen@vvi.fi. Kotikansio /Users/Shared/Claude/Matkakirja-linssiseppa-2 (irrallinen originin main).
Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup` (natiivin "main" = `julkaisija/juna-224`). Ainoa worktree k33 =
`/Users/Shared/Claude/wt/proto-linssiseppa2-k33`, nyt haarassa `linssiseppa2/rinnevarjo-haipyy` 05065cf0e, puhdas ja pushattu. Kuvat ja ajot vain JU:n
vuorolla. Id:t: PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; KK `local_d5f31591-21fa-4cb0-bab3-bcd3435d075a`; JU
`local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; NUI `local_4b84cd90-123f-46c5-bc07-75760ed4c80b`; NS `local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870`;
KS `local_7b57e35a-3a8e-4943-aba1-c960b9eb4671`; Postivahti `local_1f31f830-9df5-41c1-8992-172e100af57f`. Viestit mcp__ccd_session_mgmt__send_message id:llä.
JU:n jonoloki `/Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt`.

## LINJAT
- Näkyvä työ (3D, merkit, ilme, valikot, VALO): kuva ensin KK:lle, PT kopiona; junaan vasta KK:n sanalla. KK katsoo itse ja vaatii todisteen
  (reuna kuvassa, kello lokissa), ei keskiarvoja. Isolla iPadilla VAIN KK:n nimeämä valmis kokonaisuus (omistaja 12.21, Raamattu 12.26.5): älä tilaa iPad-ajoa.
- Asemataulu jäädytetty: hookien "päivitä junat.json/tyolista" -kehotteet ohitetaan.

## KK:N PÄÄTÖS 11.11. 14.0x (suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-saumat-ja-maet.md luvut 3–5)
Pelin maa on yksi kerros kaikissa kulmissa = elävä kartta. (a) piirros kallistukseen EI (piirroskerros on pelissä pois: ElavaTyyli.Striimi). (b) esipoltettu
Z12/Z13 EI. (c) KYLLÄ kokeena: terävyys siihen kerrokseen, joka näkyy (= työ 2). MAA A (haara linssiseppa2/maa-piirros-a 8693823d2) SEIS, ei junaan.
Sauma: ei työtä (omistaja 7.11. 10.52). Seinen rannan porras ND:n kohdalla on erillinen vika listalla.

## TYÖ 1: RINNEVARJO HÄIPYY TASOITETULLA ALUEELLA – TEHTY, MAC-AJO JU:LLA
- 05065cf0e (natiivi `linssiseppa2/rinnevarjo-haipyy`, juna-224 fe1620cf0 + 1). Kerroin = ReliefiOsuus(z) × (1 − tasauksen paino × tason osuus), taso
  Z11 0,2 → Z15 1,0; paino kuvapisteittäin samasta tasauksesta kuin maasto (KorkeusKerroin 10 → 14 km, Montmartren reikä 700 + 700 m säilyttää varjon).
  Z0–Z10 ennallaan. Tiedostot: RinneHaivytys.cs (puhdas, Nyt-kenttä; KorkeusKerroin kirjoittaa static ctorissa ja Tasainen-kutsussa), ElavaTyyli.Piirra
  (kerroin pohjaan ja alkuperäiseen), Laattapalvelin.Elava (välimuistin pääte -rh1 vain tasausalueen paloille + piirtoajan mittaus), Komennot
  (`rinnevarjo haipyy paalle|pois`, `rinnevarjo tila [nollaa]`), Kartta-testit RinneHaivytysTestit (761/761 + 4). unity-tarkistus 0 virhettä.
- Mac-hinta testissä: liukuvyöhykkeen pala 1,35 ms, täysin tasoitettu vakio (nopea polku), muualla 0. Paino Meudon 0,73, Saint-Cloud 0,95.
- ODOTTAA: JU Mac-ajo `_tyo/linssiseppa2/rinnevarjo/sk-mac-rinne-1.txt` → `lokit/linssiseppa2-rinne-1-05065cf0e` (JU kokoaa rivit vs-pyydetyt-rivit.txt).
  Kuvat r1a/r1b … r9a/r9b (a = ennen, b = jälkeen): ND 12/5/1 km ylhäältä ja kallistettuna, lounas (Meudon–Saint-Cloud) 4 km ylhäältä ja kallistettuna,
  Montmartre 2 km. Lopussa piirtoaika ennen | jälkeen tyhjällä välimuistilla ("rinnevarjo tila" -rivit).
  TARKISTA: varjo poissa keskustassa, liukuvyöhykkeellä ei rajaa eikä porrasta laattojen välillä (täysikokoiset rajaukset), Montmartressa a = b,
  matkalento-rivien korkeus/kallistus oikein. Lähetä KK:lle polut + luvut + puutteet (KK:n viesti 13.2x kuvasi toteutuksen). iPad vain KK:n sanalla.

## TYÖ 2 (koe, työn 1 jälkeen): A v2:n muste ja paperin kuitu elävän kartan laattojen varjostimeen
MatkakirjaTileset, tee_tileset.py; sovi NS:n kanssa. Kytkimen takana, vain kun laatan kuvapiste on ruudulla > 2 kuvapistettä. Parit ND lähin ja keski +
ruutuaika Macilla. Jos jokin estää (varjostimen hinta koko pallolla), kerro KK:lle ENNEN toteutusta. A v2:n laskenta: maa-piirros-a 8693823d2
(PiirrosKerros.shader MaaLahelta: harjanne 1,5 tx, askel 4 tx × 0,5, pitkänomaisuus; voima smoothstep 0,06–0,12; muste vain vaalean maan vieressä
0,76–0,84; vahvuus 0,65). Ehto (KK): ei muuta maan keskikirkkautta/kylläisyyttä yli ±1 %.

## MUUT
Pilvivarjo 51e33fb4f junassa (MR66 → 224.72), laiteluku KK:n iPad-erässä. Kynä v4 MR63 (224.70). Vesitäyttö 0829caa4e JU:lla ennallaan.
Merenpohjan puristus 97b4f29a9, kohokartan aurinko cd74573cd odottavat.

## TEKNIIKKA
PIL `/opt/homebrew/bin/python3 -I`. Kartta-testit kääntää ElavaTyyli.cs:n ILMAN Unityä: sinne ei KorkeusKerroin-viittauksia. Mac-skenaariot: `matkalento
lat lon korkeus_m kallistus suunta` + odota 25; Pariisin talot `talot kansio …/palat-v20-ryhma4` + `talot 1`. Mac-batchissa Screen 640×480 (3D-kuva
2752×2064). `sh Peli-testit/unity-tarkistus.sh` ja `sh Kartta-testit/kaanna.sh <suodin>` worktreessa. Luovutus plumbingilla origin/mainin päälle omaan haaraan.
