# Linssisepän luovutus 16.10.2026 klo 22.34 (KOVA RAJA 38 %, Postivahti)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/.
Testit `sh Linssit-testit/kaanna.sh [nimi] </dev/null` worktreessa, tarkistus `zsh tyokalut/tarkista.sh`.
Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 (SIMU NYT), NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832.
OMISTAJAN PÄÄTÖS 22.24 (pysyvä, PT:n kautta): kaikki yhteen junaan, eli "juna 198" = juna 197.
Simu iPad 00CF62C2 vain Julkaisijan SIMU NYT -vuorolla; jokaisen ajon jälkeen SIMU VAPAA Julkaisijalle. Skenaarioissa nyt
`odota-tila Aloitus 150` (kuormassa sisältö latautui yli 40 s, ja peli jäi aloitusruutuun: Kiina3 21.15 mitätön).

## 1. ENSIMMÄISEKSI: KIINAN FILMINAUHA SIMULLA
- Ydin: proto linssiseppa/kiina-nauha 548a4dabe (kiinan-dynastiat 50ade51e8:n päällä). Pysakkiajo: pysäkki = avainvuosi,
  Selite = tarinarivi, Lat/Lon/Paikka = pääkaupunki (vain UI:lle; ajon pysäkeillä NaN, joten kamera pysyy Itä-Aasiassa).
  KiinaKerros = IPysakkiajonNakyma (staattiset Kello-, Pysakki-, Tauko- ja LoppuKasittelija), LinssiUi.Kiina, komennot `kiina ajo [tauko]`,
  `kiina siirry <i>` ja `kiina tila` (ajo, kello, pysäkki). KiinaTestit 8/8 (FilminauhaPysakitJaKello), unity-tarkistus 0.
- NUI kytki UI:n: natiivi-ui/kiina-nauha-198 78a2b34a4 (aikajanan palkki, esittely → Käynnistä → Kaynnista, kello "221 eaa.",
  kortit ilman muotokuvaa). Pidempi esittelyteksti puuttuu (nyt Lyhyt), ja se on Sisältökirjurin/PT:n asia.
- AJO KÄYNNISSÄ (nohup): ajo-kiinanauha.zsh → käännös L2 (jonossa Pelikoodarin museo-pehmea-197:n takana, 22.15) → kiinanauha-app.
  Kun lokiin tulee "KIINANAUHA VALMIS <sha>", pyydä Julkaisijalta SIMU NYT: `touch .../linssiseppa-ajot/simu-kiinanauha.nyt`.
  Skenaario sk-kiina-nauha.txt (N1 esittely, N2–N5 ajo +5/20/45/75 s, N6 selaus 1873, N7 loppu). Tulos lokit/todistus-kiinanauha-ipad-*.
- Tarkista: kello ja kortti vaihtuvat, kartta vaihtaa vuoden pysäkillä, kamera pysyy, lopussa Itä-Aasia. Kuvat NUI:lle ja PT:lle
  (_valmiit/kiinan-dynastiat-pallo-20261016/nauha/), sitten 548a4dabe + 78a2b34a4 NS:lle junaan, jos PT kuittaa.

## 2. VALMIIT TÄSSÄ VUOROSSA
- Kiinan dynastiat v3 -pallokuvat: _valmiit/kiinan-dynastiat-pallo-20261016/v3/ (uusinta 21.55, käännös 47a38cb9a). PT kuittasi
  junaan, ja haara 50ade51e8 lähti NS:lle. Taiwan ja Hainan ovat Qingissä 1760/1873 (PT luuli puuttuvan; lähikuvat 13–14, KS:lle kuitattu).
- Peking #361: uusinta 21.55, ion_leikkaus toimii. V7-arvio Codexille postiin f8c315589: kiveys hyvä, mutta vallihaudan vesi puuttuu
  (k5: Ion näkyy), ruutujen raja näkyy (k1) ja leikkauksessa on pohjois–eteläsuuntainen rako (k3, myös V6). → Pyydetty V8; EI kippiin.
  rakenna-peking360/361.zsh kopioivat nyt ion_leikkauksen (lisaa-ion-leikkaus.py). V6:n AO-arvio uudelleen on avoin.
- Köö/Ams-heikoimmat: proto linssiseppa/koo-ams-197 93dd78948 → NS (PT kuittasi junaan 197). Tivoli → pallokierros-v7 (järvi, 200,
  silmä 60–75), Rembrandtin talo OpasKatseOletukset 45 ± 15 rajattu, silmä 60–70 + testi RembrandtinTaloKanavanYli. Vienti
  opas/pallokierros-v7/koopenhamina.json VIETY (Julkaisija 22.29). Kuvat _valmiit/koo-ams-heikoimmat-197-20261016/.
- Museon kertoja manifest-198 b3885c750 (proto linssiseppa/museo-manifest-198, juna-198:n päällä) → NS. VIETY 22.22.
- Levy: Peking v5, Gizan laatat, taidemuseo-sali, kiina-app ja belvedere198-app → T7 Matkakirja-arkisto/linssiseppa/tyo-20261016.

## 3. AVOIMET
- Worktreet: proto-linssiseppa-kiina (nyt haaralla kiina-nauha), -kooams, -museo198, -kerrospiilo; posti; vanhat edellisestä luovutuksesta.
- _tyo/linssiseppa: kerros-app (Peking V8:n vertailuun), peking360/v6 ja v7, sekä tuleva kiinanauha-app.
- Vientipaketit: aina ämpäripolku + SHA256SUMS + LAHTEET.md (ei LUE.md); `vie-paketti.sh --kuiva` ennen pyyntöä (Julkaisija paketoi kaksi uudelleen).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261016-2234.md).
Ensin: `tail -3 ajo-kiinanauha.log kaanna-kiinanauha.out` linssiseppa-ajot-kansiossa → kohta 1.
