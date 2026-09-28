# Linssisepän luovutus 28.9.2026 (q) — Linssiseppä (Opus, max) = myös Mallinseppä

*Kirjoitettu klo 10.0x Fablen käskystä (konteksti 72 %). Edellinen: -p.md. Session id:t 28.9. tilinvaihdon jälkeen:
- Fable local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31
- Natiiviseppä local_fcc10552-5810-49bf-b0cf-188456f1231c
- Julkaisija local_24e63224-112c-449a-b6a3-e10e4ed43f4b (jakaa käännösvuorot ja simulaattoripaikat: pyydä ja ilmoita valmis/sammutus)
- Pelikoodari local_11aca9cd-eda6-4db9-9019-8a153c8b8795
- Natiivi-UI local_c6d63773-0270-4873-96f8-63c66cf52794
- Karttaseppä local_16f80454-5b30-4180-ae9b-8c6d1edb6779
- Linssiseppä (tämä) local_7a457b99-7ecd-4634-93a0-0c02b53e8d24

Tämän session scratchpad S = /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/7ef9204a-4d23-4e30-8689-771d40704c12/scratchpad
(ajoskriptit ajo-*.sh, käännösten ja ajojen tulosteet *.out, integroi.sh).*

## 1. KESKEN NOLLAUSHETKELLÄ (tee ensin)

**Käännös ja laiteajo `cl` käyvät itsenäisesti** (aloitettu 10.05, Julkaisijan vuoro ja paikka A D0D2CD1E):
- käännös `linssiseppa/iss-kyyti` e4ce8ef8 + `linssiseppa/symbolit-lippu` ba0a245f → tuloste `$S/kaanna-cl.out`
- sen jälkeen `$S/ajo-cl.sh` → tuloste `$S/ajo-cl.out`, kuvat `/Users/Shared/Claude/proto-3d/lokit/linssiseppa-laite-20260928-cl/`
- simulaattori sammuu itse lopussa (symbolit VAIHEET=9). Tarkista `xcrun simctl list devices booted`; jos D0D2CD1E jäi
  päälle, sammuta se UDID:llä ja kerro Julkaisijalle. ÄLÄ tapa ajoskriptiä kesken (muisti: ajoskriptin-pysaytys-kaataa-appin).

Kun ajo on valmis:
1. **Cupolan usvan diagnoosi** (kohta 2.3): lue `ajo.log` (rivit "kauko:", "seuranta:", "ikkuna:" = `valo tila`: usva,
   taustakartta, tausta, sumu) ja vertaa kuvia seuranta.png | seuranta-usva-pois.png | seuranta-usva-lentoharmaa-pois.png |
   seuranta-pilvet-korkea.png | seuranta-pilvet-pois.png.
2. **Cupolan kuvapari**: ikkuna-vanha-usva-pois.png (ennen) | ikkuna-uusi-usva-pois.png (jälkeen) + ikkuna.png (oletus) ja
   cupola-raw.mp4. Kokoa: `python3 proto-3d/tyokalut/linssiseppa-ajot/koosta_pari.py <ulos.png> "iss e4ce8ef8" "<kuva>:<otsikko>" …`,
   video `ffmpeg -i cupola-raw.mp4 -vf scale=604:-2 -c:v libx264 -pix_fmt yuv420p -crf 23 -an …` (leveys parillinen).
3. **Lipun kuvapari**: `python3 koosta_koko.py <L> <U> "sl ba0a245f" "ruotsi:Ruotsi (lippu kartussin reitillä)" 0`
   (ajolokissa "lipun ankkuri lat lon"). Tarkista, että lippu on Ruotsin 1873-lippu ja pysyy kuvassa kertoimella 5.
4. Kuvat Fablelle (≤ 8 riviä) ja kansioon /Users/Shared/Claude/proto-3d/lokit/linssiseppa-toimitus-20260928/.

## 2. CUPOLA-ERÄ (omistajan palaute ISS-kyydistä, Fable välitti 28.9. klo 09.3x)

### 2.1 Omistajan sanat (sanatarkasti) ja Fablen päätökset
"Kupola on hyvä, mutta saisiko sen tummemman sävyiseksi ja siinä saisi näkyä myös joku valonlähde kuvassa, niin että
valonlähdeet toisivat luonnolliset valoisuuden muutokset kupolan sisäpintaan. Ei tarvitse olla täysin realistinen, jos näin
ei oikeasti ole. Toinen huomio: pitäisikö avaruuden musta näkyä paremmin maapallon horisontissa, kun siinä nyt näkyy niin
paljon sinistä? Onko se realistinen näkymä? Ja pystyykö lasipinnat tekemään enemmän oikean lasin näköiseksi, pienine
reunojen virheineen? Ja pitäisikö myös Kupulan ulkopuolella näkyen joku osa avaruusasemasta? Siis joku käsivarsi tai joku
vastaava, jotta näkymään tulisi enemmän kerroksellisuutta."

Fable: ISS:ltä horisontissa näkyy ohut kirkkaansininen kaari ja sen yläpuolella musta avaruus. Tehtävät: 1) sisäpinta
tummemmaksi ja valonlähde, 2) ohut kaari ja musta avaruus, 3) lasi (heijastus, vihertävä sävy, reunojen virheet),
4) osa asemaa ulkopuolelle (Canadarm2 tai paneeli). Omistaja valitsi Cupolan kehyksellä (ei ilman). Kuvapari ennen/jälkeen
ja lyhyt video Fablelle.

### 2.2 Tehty (proto `linssiseppa/iss-kyyti`, astro-worktree /Users/Shared/Claude/wt/proto-linssiseppa-astro)
- **CupolaKerros.cs + Resources/Varjostimet/Cupola.shader** (3896f3d1, LED-korjaus 9292f896, paneeli b52acbb0):
  koko ruudun neliö kameran lapsena, sijoitetaan RenderPipelineManager.beginCameraRendering-kutsussa (ei kehyksen viivettä).
  - Kerrokset takaa eteen: ulkona Canadarm2 (kapselit + nivelet, sylinterivarjostus) ja kullanhohtoinen aurinkopaneeli;
    lasi (vihertävä sävy, heijastuskuva huojuu, reunojen sameus, tahrat, naarmut, pöly valossa); kehys tummana (0,42) ja
    valaistuna (aurinkotäplä ikkunoista, maavalo, kaksi kapeaa LED-nauhaa sivuilla, kohokuvio kuvan gradientista).
  - Kuvat ämpäristä (karttanostot/20260926/iss-cupola-*), mipmapit, välimuisti persistentDataPath/kuvat/cupola-*.
- **CupolanValo** (Ydin/Iss/IssKyyti.cs): ISS:n varjo (sylinteri), maavalo, auringon suunta kameraan; testit.
- **Ilmakaari.shader + Avaruus.Kyyti**: kyydissä kaukonäkymän 1,25 R:n hehku pois (kamera oli sen sisällä → sininen
  taivas), tilalle analyyttinen kaari R + 120 km (exp(−h/22 km), usva maan päällä, aurinko sivuamispisteessä).
- **Yökuori** (Yokuori.cs + shader, vain kyydissä), **tähdet 0,3** kyydissä, **rata pois** koko kyydin ajaksi,
  **pilvet ~8 km:iin** kyydissä (e4ce8ef8).
- A/B-komennot: `astro kyyti cupola vanha|uusi`, `ilmakeha vanha|uusi`, `varsi 0|1`, `pilvet matala|korkea|pois`,
  `yo 0|1`; `ui linssi kehys 0|1`.
- Linssit-testit 363/363, unity-tarkistus 0 virhettä.

### 2.3 Avoinna
- **Kermanvaalea usva** peitti 1. Cupola-kierroksella (käännös 7bbc1320, ISS Venäjän Kaukoidän yllä) koko näkymän, myös
  taivaan; edellisessä ajossa (8b39c0cb, Mosambik) sitä ei ollut. Väri on sama kuin kartan horisonttiusvan UsvaVari
  (webin --kerma 250 244 214). Epäillyt: (a) Aurinko.cs:n horisonttiusva kallistetulla kameralla (Usva =
  Vahvuus(kallistus) × taustaKartta; taustaKartta pitäisi olla 0, kun Avaruus asettaa oman taustan), (b) 64 km:n pilvikuori
  (korjattu matalaksi e4ce8ef8), (c) jokin muu. cl-ajon A/B-kuvat ratkaisevat. Jos syy on Aurinko.cs (Natiivisepän
  tiedosto: "älä muuta globaaleja RenderSettingsejä"), sovi Natiivisepän kanssa (esim. kyyti asettaa
  Aurinko.UsvaSallittu = false ja palauttaa).
- Kun usva on korjattu: kuvapari ennen/jälkeen + video Fablelle, sitten merge-pyyntö Natiivisepälle (iss-kyyti sisältää
  astro-selaimen, joka on jo junassa).
- Web (Pelikoodari) tekee ISS-kyydin natiivin kuvaparin jälkeen samoilla luvuilla (suositus
  docs/raportit/iss-kyyti-suositus-20260928.md, Pelikoodari kuittasi). Päivitä suositukseen Cupola-erän muutokset.

## 3. LIPPU JA SYMBOLIT (proto `linssiseppa/symbolit-lippu` ba0a245f, symbolit-worktree)
- Sisältää Natiivisepän laatikkoleikkauksen 6cecf733 (merge 720513da).
- **Omistaja 28.9.** (Fablen kautta, sanatarkasti): "Zoomatessa lähemmäs se vain katoaa kameran taakse koska lipputanko on
  niin korkea. Ei tehdä koko kattoa. Tuo ei muuten ole ruotsin lippu". Fable: ei kokokattoa (ei ruutukattoa eikä
  etäisyysrajaa); lippu kasvaa zoomatessa maailman mittakaavassa, ja kameran taakse katoaminen estetään matalammalla
  kiinteällä tangolla.
- **Tehty**: Lipputanko.MaxKorkeusKm = 80 (komento `lipputanko katto <km>`), ei ruutukattoa. Pienissä maissa 120 pt
  saapumisnäkymässä säilyy (Tanska ~60 km); Ruotsissa tanko ~260 km → 80 km. Kameran lähin korkeus iPhonella ~307 km.
- **Väärä lippu** oli testiartefakti: `lipputanko koe` asettaa aina Kreikan 1873-koelipun. ajo-symbolit-koko.sh käyttää
  nyt pelin reittiä `ui kartuscha <MAA>` (oikea lippu Karttasepän ankkuriin) ja keskittää kameran ankkuriin.
- Kuvapari (Ruotsi) tulee cl-ajosta → Fablelle; merge-pyyntö Natiivisepälle vasta Fablen/omistajan hyväksynnän jälkeen.

## 4. JUNASSA (Natiiviseppä 09.33, juna/b13 dfca785e)
- `mallinseppa/era6` 9ff18d16 = erä 5 (Kronborg, Visby, Nidaros; d35e9f2c) + erä 6 (Olavinlinna, Geysir, Newgrange;
  Opus-agentit harnesseissa o1–o3, speksien §11). Laitekuvat toimituskansiossa (*-era5-laite.png, *-era6-laite.png).
- `linssiseppa/astro-selain` c15d2c04 (kuvaselain, nimipilleri 1,2 s, Natiivi-UI:n katselmointikorjaus, kierros
  aineistosta SATELLIITTI_KIERROS, A/B päivittää auki olevan).
- `linssiseppa/joet-0928` 582d149c (ElavaAineisto.JoetKansio → joet-2026-09-28).
- Kun nämä ovat masterissa: poista era5-worktree (`git worktree remove /Users/Shared/Claude/wt/proto-linssiseppa-era5`,
  se on nyt haarassa mallinseppa/era6).

## 5. MUUT AVOIMET
- **Geysir** (matala prioriteetti, Fable): vienti ja lat/lon ovat kunnossa (Siirtoseppä). Natiivi näyttää pääkartan nostot
  vain pelaajan nykyisestä maasta (NostoKerros r. 499) + LueMuste-portti. Tarkista: pelaaja Islannissa ("islanti") →
  näkyykö Geysir; vertaa webiin. Jos sama kuin webissä, ei vikaa → rivi Fablelle. Laiteajossa `nostot maa ISL`:
  "taso 1 näkyvissä: ei yhtään", "nostoja 34 … näkyy 1".
- **Newgrangen kammio** (kultainen risti kehässä) on näytettävä omistajalle (Fable tietää).
- **Natiivin astroselite** (omistaja 28.9.): pienennetty selite kutistuu animoiden tekstinsä mittaiseksi ja selitteen
  striimiluenta automaattisesti päällä — vasta Pelikoodarin webin mallin (Raamattu PR #3527) ja kuvaparin jälkeen.
- **Kierros**: pyysin Pelikoodaria lisäämään 'SATELLIITTI_KIERROS' tools/vienti/lahteet.mjs:iin (natiivi lukee sen jo).
- **Lintuparvi** Natiivisepän aloituslento v3e:hen: vastattu (oma Kartta-komponentti ElavatHetket.PiirraParven tyylillä,
  3–5 lintua, 2,5 s). Ei toimia Linssisepälle.
- Tason 1 "brandenburgin-portti" on symbolit-tilan listassa myös Tanskassa, Ruotsissa ja Norjassa (ei ruudulla);
  mahdollinen turha piirto, kerro Natiivisepälle, jos ehdit.

## 6. TYÖKALUT JA OPIT
- Uudet: `koosta_pari.py` (yleinen vierekkäiskooste, kulma ja versio kuvaan), `ajo-iss-kyyti.sh`; `koosta_era2.py`
  rajauskohdat erille 5–6; `ajo-symbolit-koko.sh` korjattu (desimaalipilkku, `nostot kerroin` eikä `aja`, Ruotsi,
  kartussin lippu).
- **Kameran lähin korkeus iPhonella ~307 km** (PalloKierto.MinKorkeus): kerroin = saapumiskorkeus / korkeus, joten
  pienessä maassa (Tšekki 384 km, Tanska 467 km) kerroin ei nouse yli ~1,3–1,5. Mallien "lähikuva kerroin 12" on
  samassa kuvassa kuin kerroin 6.
- **Saapumiskorostus**: maan vaihduttua noston hehku ja nimi näkyvät hetken (Kronborg 30° näytti himmeältä); ota kuvat
  vähintään 15 s saapumisen jälkeen.
- UI-komento- ja linssikomento-tiedostot luetaan erikseen: A/B ensin, odotus, sitten kohde.
- Pelin lokiluvut desimaalipilkulla: regex `[0-9]+([,.][0-9]+)?`.
- Ajoskriptin tappaminen kaataa appin (simctl launch --stdout on sen lapsi).
- Pelikartan horisonttiusva voi näkyä linssissä kallistetulla kameralla (ks. 2.3).

## 7. WORKTREET (3/3)
- /Users/Shared/Claude/wt/proto-linssiseppa-era5 → haara mallinseppa/era6 (junassa; poista masterin jälkeen)
- /Users/Shared/Claude/wt/proto-linssiseppa-symbolit → linssiseppa/symbolit-lippu
- /Users/Shared/Claude/wt/proto-linssiseppa-astro → linssiseppa/iss-kyyti (sisältää astro-selaimen; astro-selain-haara
  on erillinen ja junassa)
- Proto-haara linssiseppa/joet-0928 tehtiin ilman worktreetä (git commit-tree), junassa.
