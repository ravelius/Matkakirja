# Valosepän luovutus 11.11.2026 klo 09.24. Itsenäinen: vanhoja ei tarvitse lukea (korvaa 20261111-0310:n)

Syy: konteksti (pehmeä raja 26 %). Tili sami.reivinen@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup` (natiivin "main" = `julkaisija/juna-224`). Ainoa worktree k33 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k33`, nyt haarassa `linssiseppa2/pilvivarjo-pehmea` 75ab1c7de, puhdas ja pushattu. Kuvat ja ajot vain JU:n vuorolla. Id:t: PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; KK `local_d5f31591-21fa-4cb0-bab3-bcd3435d075a`; JU `local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; KS `local_7b57e35a-3a8e-4943-aba1-c960b9eb4671`; Postivahti `local_1f31f830-9df5-41c1-8992-172e100af57f`. Viestit send_messagella id:llä. JU:n jonoloki `/Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt`.

## LINJAT
- Näkyvä työ (3D, merkit, ilme, valikot, VALO): karkea kuva ensin KK:lle, PT kopiona; junaan vasta KK:n katsottua. KK katsoo kuvat itse.
- PT 09.2x: pilvivarjot ENSIN (Kaupungit-kärjen alku), kynä ja vesitäyttö jatkuvat ennallaan.

## 1. PILVIEN VARJOT PEHMEÄSTI (ensin) – korjaus tehty, tallenne JU:lla
- Omistaja 09.19: varjot hyppivät noin sekunnin välein lähempää. SYY (lähetetty KK:lle ja PT:lle): tahallinen 2 s:n askel (KarttaPilvet.AskelS, 12 m/askel), jotta levon harva piirto ei tarvitse lisäpiirtoja.
- Korjaus a) 75ab1c7de (`linssiseppa2/pilvivarjo-pehmea` = juna-224 494595623 + 1, unity 0): tuuliAika += min(unscaledDeltaTime, 0,5) joka kehys (ei Kuumana), tuuli-oletus 1 → 0,15 (≈ 1 m/s). Ei rekisteröi animaatiota → lepo (PAIKALLAAN 2 s) ennallaan; PT:lle kerrottu, iPad-lepomittausta ei tarvita (PT:n ehto: jos lepo kärsisi → b).
- KK 09.2x ehdot: vaalea pinta, lähin kamera 20 s paikallaan LEPOTILASSA + 10 s hidas kierto täydellä tahdilla; KK mittaa ruutueroista. Jos nykäys näkyy yhä: hitaampi tuuli levossa tai pehmeämpi reuna, EI lisäpiirtoja lepoon ilman mittausta. 1 m/s KK:n mielestä oikea.
- Ajot: JU:lla jonossa `_tyo/julkaisija/sk-mac-pilvivarjo-pehmea-ju.txt` (Luxembourg + Cité, kansio lokit/linssiseppa2-pilvivarjo-pehmea-75ab1c7de) ja pyydetty tilalle/perään `_tyo/linssiseppa2/pilvivarjo/sk-mac-pilvivarjo-pehmea-2.txt` (Concorde 20 s + kierto 10 s, Cité 20 s; kansio lokit/linssiseppa2-pilvivarjo-pehmea-2-75ab1c7de).
- Kun valmis: katso tallenteet itse; lepo-näkymä: `sh _tyo/linssiseppa2/pilvivarjo/lepo-sim.sh <paikallaan.mp4> <ulos-lepo.mp4>` (joka 2. s:n kehys pidetty; KK:lle kerrottu, että lepo on simuloitu Mac-tallenteesta, koska iPad-tallennetta ei ole työkaluissa). Lähetä KK:lle paikallaan, lepo-sim ja kierto (polut), kopio PT:lle. Junaan (MR JU:lle, pt-ok PT:ltä) vasta KK:n sanalla.

## 2. KYNÄ (1:1-viiva) – odottaa KK:n sanaa
- Haara `linssiseppa2/kyna-v2`: 2c2b7602b (v2: viiva kaikilta etäisyyksiltä komennolla kyna 1, kaikki pinnat, ei ylärajaa, 1,2 px, sepia #5a4330, sisäiset hahmoviivat 1,5 m vain lähellä) + c91f657c2 (v3: kerrosvyöt pois, KK 07.4x). Pohja juna-224 7b7e12bfd. Oletus kyna 0.
- KK 07.4x: viiva KELPAA, vyöt pois; ennen junaa ajo kolmelta etäisyydeltä. Ajo tehty (lokit/linssiseppa2-kyna-v3-c91f657c2, 18/18), 9 paria KK:lle: `_tyo/linssiseppa2/kyna/v3/rajaukset/` (LUE.md). Oma arvio: kaukaa ohut ruskea reuna, ei möykkyä.
- KK:n sanalla: oletus päälle (Komennot.cs/_Kyna-oletus: esim. Shader.SetGlobalFloat("_Kyna", 1) käynnistyksessä tai OhjelmaKohteet asettaa; tarkista missä _AariviivaPois/_KoodiViiva asetetaan) → rebase uusimman juna-224:n päälle → unity → Mac-tarkistus JU:lla → MR JU:lle, pt-ok PT:ltä.
- KS:lle kerrottu (KK:n pyynnöstä): RK:n 1:1-malli ylhäältä korkea laatikko.

## 3. VESITÄYTTÖ (erä B) 0829caa4e – iso iPad, ajo 3 JU-seuraajalla
- Ajo 1 (07.07): vesi ei latautunut (Curl 28, 60 s, hidas verkko). Ajo 2 (07.14): paikallinen vesi Documents/vesi-paikallinen + Documents/kaupunki-vesi.txt (file://…), mutta asennus vaihtoi datakansion UUID:n (ACD7C723 → 2AE7E505) → indeksi PUUTTUU. Lokin "index-v2.json / index.json ei latautunut" on kiinteä teksti.
- Ajo 3 JU:n luovutuksessa: asenna 0829caa4e, lue UUID konsolista (persistentDataPath), vasta sitten txt; kansio lokit/linssiseppa2-vesitaytto-ipad-3-0829caa4e; lopuksi txt tyhjäksi (tyhjä riittää: JuuriUrl palaa oletukseen).
- Tulos: grep "pilarireiät täytetty" (taustalla X ms, pääsäikeessä Y ms) + "pitkä ruutu" täytön kohdalla. Hyväksyntä pääsäikeessä ≤ 20 ms, ei > 100 ms ruutua → PT:lle + MR-pyyntö JU:lle. Ohje `_tyo/linssiseppa2/vesitaytto/LUE.md`.

## MUUT (ennallaan)
- Pariisin saumat ja mäkien varjostus (KK:n tavoite). Merenpohjan puristus 97b4f29a9 KS:n koelaatoilla. Kohokartan aurinko cd74573cd: syvyyskuva laiteajossa.
- Hyllyvalo suljettu (PT 04.2x).

## TEKNIIKKA
PIL `/opt/homebrew/bin/python3 -I`; numpy-skriptit ilman -I. Parirajaus: `_tyo/linssiseppa2/kyna/v3/rajaa.py <lokikansio> <ulos> nimi x0 y0 x1 y1 …` (1000 px:n koordinaatit × 2,752). Mac-skenaariot: ennen jokaista `aja`-komentoa `kallista` + `suunta` (pelkkä aja ei loitontanut v2-ajossa); lähin kamera = aja … 0,0012, asetukset `ui kamerasuhde laite`, `maasto siirtyma 5 0 30`, `talot kansio …/palat-v20-ryhma4`. Tallenne Macilla: `tallenne-alku <nimi> 30 1376` / `tallenne-loppu`. `sh Peli-testit/unity-tarkistus.sh`. Luovutus plumbingilla origin/mainin päälle omaan haaraan.
