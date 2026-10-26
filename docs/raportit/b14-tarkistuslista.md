# Build 14 -tarkistuslista Laitetestaajalle (Pelikoodari 25.9.2026)

Tarkistettava build: build 14 (juna/b13 kärki Natiivisepän build 14 -kaavalla). Jokainen rivi kirjataan
kierrosraporttiin muodossa **PASS / FAIL / EI EHDITTY** + kuva tai video. FAIL-riviin: mitä tapahtui, komento
ja kuva, reititys rivin Korjaaja-sarakkeen mukaan.

Lähteet: omistajan b13-löydökset (`docs/raportit/omistajan-loydokset-b13-20260925.md`, haara claude/bold-ride-vow4ki),
liikkumisen pariteettilista (`docs/raportit/liikkuminen-pariteetti-20260925.md`), merge-pyyntöjen kuvaukset
(`/Users/Shared/Claude/proto-3d/lokit/merge-pyynto-pelikoodari-maisemakompressori.md`).

**WEB ON MALLI:** jos natiivi näyttää eri tavalla kuin web samassa tilassa, se on FAIL, vaikka rivin
teksti täyttyisi. Web-kuva `tools/pariteettikuvat.mjs` (iPhone 393×852, iPad 834×1194).

Testikomennot: `peli-komento.txt`, `ui-komento.txt` ja `linssi-komento.txt` sovelluksen Documents-kansioon
(simulaattorissa `simctl get_app_container … data`, laitteella `ipad.sh` / `devicectl copy to Documents/`).
Nollaa ensisaapumisen paljastus ennen osaa B: `ui livia paljastus nollaa`, tarkista `ui livia paljastus` → "näkemättä".

## A. Laitteella tehtävät (iso iPad 00008103; ei simulaattorissa)

| # | Löydös | Tee | Odotus (PASS) | Korjaaja |
|---|---|---|---|---|
| L1 | **100** kartun radio ei soi | Pelinäkymässä napauta karttaa (kartun radio) → radiopainike punaiseksi. Kuuntele laitteen kaiuttimesta, äänet päällä. | Lähetys KUULUU 1–3 s:ssa painalluksesta (web: voimakkuus 0,55 × voima). Painike punainen JA ääni. Toinen painallus hiljentää. | Pelikoodari (c13af0b3) |
| L2 | **101** maalehtien tahmea vieritys | `ui maalehti GRC`, sitten sormella nopea vieritys ylös-alas 5 s, lisäksi `ui lehti vierita 600` ja `ui lehti vierita 1200`. Kehysmittarin `kehysajat.jsonl` talteen (`ipad.sh hae`). | Vieritys tuntuu sulavalta; kehysajat lehti auki: EI peitto-luokkaa, p95 ≤ 9 ms (120 Hz). Vertailu: b13 = peitto-luokka, ~30 fps. | Pelikoodari (6ba8ada0) |
| L3 | **93** kohteet klikattaviksi tekstistä | Kaupungissa (esim. Ateena) napauta nähtävyyden NIMIÖTÄ sormella (ei pistettä tai symbolia), kolme eri kohdetta. | Nosto aukeaa nimiön napautuksesta kuten pisteestä. Piilotettu nimiö ja linssinimet eivät ota osumaa. | Pelikoodari (Natiivi-UI) (5e21527b) |
| L4 | **104** karttanostot aukeavat hitaasti | Kylmä käynnistys → uusi matka → saavu kaupunkiin. Odota 5 s saapumisen jälkeen, napauta karttanostoa (ensimmäinen avaus). Toista toisessa maassa ilman 5 s:n odotusta. | Konsolissa "esiladattu <ISO>" ~2 s saapumisesta. Odotuksen jälkeen nostokortti aukeaa alle 0,5 s:ssa (ei tyhjää viivettä). Kirjaa molemmat ajat sekunttikellolla tai videolta. | Pelikoodari (c50c572b) |

## B. Simulaattorissa (pariteetti-iPhone ja -iPad11; äänettömät kohdat)

| # | Kohde | Tee | Odotus (PASS) | Korjaaja |
|---|---|---|---|---|
| S1 | **109** reitit ilman Liiku-sessiota | Aloituskartalla NAPAUTA Ateena (ei `uusi-matka`), anna aloituslennon mennä loppuun. | Ateenassa ei katkoviivareittejä eikä onttoja välipisteitä ennen Liiku-painallusta. Liiku → reittiviuhka näkyy (A3), saapuessa reitit pois (B9). | Pelikoodari (e4c75de4) |
| S2 | **C16** Livian paljastus | Nollaus (yllä), `puhe paalle`, `ui pulu tekstit nakyviin` (iPhonella kuplat muuten vain äänenä), `uusi-matka ateena`, video. | Välikortti → kaksi kuplaa ("Kääk, apua!…", "Tervetuloa Ateenaan…") ENNEN isoisän luentaa → luenta. | Natiivi-UI |
| S3 | **C12 + C10** kommentti ja PuluCam | Jatka S2:ta luennan loppuun (~31 s). | Luennan jälkeen pulun kommentti ja PuluCam-kuva samassa ruudussa; seuraava kuva 4 s välein. | Natiivi-UI |
| S4 | **81/83** lennon alapalkki | S2:n aikana. | "Kone nousee…"-kaistale häipyy, kun saapumiskortti nousee (tai lento ohitetaan). EI jää ruutuun kartalle. | Natiivi-UI (2647976e) |
| S5 | **A3 / B1** liuku ja reittiviuhka | Ateenassa `ui liiku` tai Liiku-nappi. | Reittiviuhka piirtyy heti liu'un avauksesta. | Pelikoodari / Natiiviseppä |
| S6 | **A9 + A11** nopan paikka | `uusi-peli 1 ateena`, Liiku → Liftaus (siemen 1 → pysähdys reitin varrelle). | Noppa lepää VASEMMASSA reunassa puolivälissä; reitin varrelle pysähtyessä noppa JÄÄ näkyviin. | Pelikoodari |
| S7 | **A13** kohdemerkit | Heiton jälkeen kohdemerkkien ilmestyminen videolla. | Merkit häivyttyvät sisään ~250 ms (ei välähdystä). | Natiiviseppä (a1eed0a5) |
| S8 | **A16 / B18** sovitus nopan jälkeen | S6:n heiton jälkeen. | Kamera sovittaa kaikki kohteet ja nappulan näkyviin. | Natiiviseppä |
| S9 | **A12 / B19** automaattiheitto | S6:n reitin varren pysähdyksen jälkeen, älä napauta. | Peli heittää itse ~0,75 s:n tauon jälkeen. | Pelikoodari |
| S10 | **B22 + B23** lentolista | Kaupungissa Liiku → Lentäen. | Kaaret kaikkiin kohteisiin, kamera rajaa nappulan ja kohteet; kaaren peittävyys kuten webissä. | Natiiviseppä |
| S11 | **D6** Maailma aloitusvalinnassa | Kehittäjätila → KOKEET → Maailma päälle → aloituskaupungin valinnassa napauta toisen maan kaupunkia. | Hyppy toisen maan kaupunkiin (kuten webissä). | Natiivi-UI |
| S12 | **D17 / 61** liuskan kamera-ajo | iPad11: `napauta sofia`. | Kortti aukeaa vasta kamera-ajon (~0,4 s) jälkeen, zoomi ei muutu, merkki noin w/4:ssä. | Pelikoodari |
| S13 | **A7 / C14** Ohita ja heitto vaientavat | Luennan aikana napauta Ohita; toisella kerralla heitä noppa kesken puheen. | Luenta ja pulun kuplat loppuvat heti kummastakin. | Pelikoodari / Natiivi-UI |

## C. Raportointi

- Raportti `docs/raportit/savukierros-b14-<pvm>.md` + kuvat `docs/raportit/kaappaukset/savukierros-b14-<pvm>/`, PR.
- Laitteen FAIL-rivit (A) kirjataan myös omistajan b13-löydöslistaan kyseisen numeron riville.
- Simulaattoriajot: enintään 2 simulaattoria päivällä, vuoro Julkaisijalta; lopuksi `proto-3d/tyokalut/siivoa-pariteettisimut.sh --aja`.
