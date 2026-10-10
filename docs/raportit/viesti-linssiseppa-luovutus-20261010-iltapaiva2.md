# Linssisepän luovutus 10.10.2026 klo 13.3x (TAUKO tilinvaihtoon asti)

Omistaja 13.3x (PT): juna 177 lähtee ilman KIIRE 2:ta; KIIRE 2 seuraavaan julkaisuun tilinvaihdon jälkeen. TAUKO siihen asti
(vain bugikorjaukset; museo2 ja muu odottavat). Proto-haarat ovat paikallisia (sama git /Users/Shared/Claude/proto-3d/Matkakirja-proto).

## VALMIS: KIIRE 1 Pariisin pallo (junassa 177)
- linssiseppa/pallo-esittely-176 **d8808a222** junan rungossa natiiviseppa/juna-176 2900f8e39 (Natiiviseppä: K454, P456, L1307).
  Commit-otsikossa lukee vielä "WIP … TODENTAMATTA" — sisältö on todennettu, otsikkoa ei muutettu (SHA rungossa).
- Käännös 815c84735, simu iPhone 12.58: A (Tukholma → linssi pois → Pariisi) ja B (Tukholma auki → suoraan Pariisi) intro → avaus →
  kierros → kertoja pyytää kohteen, Exception 0; uusi rivi "esitys (tukholma) päättyi ennen kierrosta". PT kuittasi.
  Todisteet: proto-3d/lokit/todistus-pallo-vaihto-176-pallo-esittely-176-20261010-1258/.
- Omistajan vikaa EI saatu toistumaan simulla (vanhallakaan käännöksellä). Todennus omistajan laitteella TF 177:ssä.
- sk-pallo-vaihto-176.txt korjattu (oleta-regex: "esitys alkaa .pariisi.").

## KESKEN: KIIRE 2 pallon kohdemerkit irti (2) + kehittäjänäkymän kaupunkivalinta ei osu (4) → seuraava julkaisu
**iPhone-mittaus (simu, diagnostiikkaloki linssiseppa/pallomerkit-176 2e11eac5b, EI junaan; käännös 4ab9b6372,
app lokit/linssiseppa-app/pallomerkit-diag):** `merkkidiag`-rivit (KaupunkiMerkit.MerkkiDiag, käynnistyy Renkaat-kutsusta).
- Yksi kamera (Camera.main = merkkien kamera = PalloKierto, MainCamera), fov 50, aspect oikein (pysty 0,46 / vaaka 2,174),
  projektio ilman siirtoa, georef origossa, mittakaava 1. Jokaisen merkin ruutupiste (juuri) = kaupungin WGS84-pisteen ruutupiste,
  ja kuvassa merkki osuu oikeaan kohtaan pysty- ja vaakatilassa (Ateena Attikalla, Istanbul Bosporilla, Kairo Niilillä, Tanger
  salmessa, Dubai Persianlahdella). Pallon kiekon säde ruudulla = laskettu (663 px). **iPhonella ei 6.7-vikaa.**
- "Irti"-vaikutelma iPhonella vain pyörityksen jälkeen: horisontin takana olevat (New York, Dubai) näkyvät pallon reunalla ja
  renkaat roikkuvat reunan yli, koska etupuolen raja on `Vector3.Dot(normaali, kohti) > 0.12f` (KaupunkiMerkit.LateUpdate).
  ERILLINEN asia, ei 6.7-muutos; kuvat proto-3d/lokit/todistus-pallo-merkit-176c-pallomerkit-diag-20261010-1315/kuvat/v05-vaaka.png.
- Skenaariot: tyokalut/linssiseppa-ajot/sk-pallo-merkit-176b.txt (oikea aloituspolku: Aloita seikkailu → `nakyy 45 VALITSE
  ALOITUSKAUPUNKI` → tap-teksti) ja sk-pallo-merkit-176d.txt (vaaka + `komento renkaat …` → diag vaakatilassa). Huom: uusi-peli
  ohittaa valinnan (2D-kartta), joten vanha sk-pallo-merkit-176.txt ei toista.
- Omistajan vika on siis todennäköisesti **Macin** (TF 176 Mac, ikkuna ~1,45:1). Mac-loki 13.25: kamera rect 1450 × 1000, pistekerroin 1
  (2560 × 1440 -näyttö, ei Retinaa).

**Mac-toisto (EHTO: vain kun omistaja ei käytä Macia — HIDIdleTime > 60 s ja etualan appi tarkistettu; jos idle putoaa, lopeta
heti ja sulje oma pid):**
- App: proto-3d/lokit/linssiseppa-app/mac-176/Matkakirja 3D.app (TF 176 -kopio; TF-appissa EI testikomentoja, MATKAKIRJA_APPSTORE).
- Skripti tyokalut/linssiseppa-ajot/mac-merkit.sh <app> <kansio> (pohja natiiviseppa-skriptit/mac-cpu.sh, hiiri-työkalu
  lokit/natiiviseppa-skriptit/hiiri). 13.25-ajossa ikkunan siirto kiellettiin (System Events -10003) → ikkuna jäi 400,100, koko
  1450 × 1032, joten skriptin napsautuskoordinaatit eivät osuneet. Tallennus on olemassa → aloitusnäkymässä "Jatka matkaa" /
  "Uusi matka" (13.25-kuva: Uusi matka ≈ ruutu 1124,887). Korjaa koordinaatit ikkunan mukaan (ota screencapture -R400,100,1450,1032
  ensin), polku: Uusi matka → avaus → VALITSE ALOITUSKAUPUNKI → kuvat levossa, vedon jälkeen ja kaupungin napautus (kohta 4).
- Jos Mac toistaa: vertaa samaan tapaan kuin iPhonella → tarvittaessa Mac-käännös diag-haarasta (tyokalut/mac-kaanna.sh, KÄÄNNÖS NYT).
- Kohta 4 (kehittäjänäkymä) vaatii kehittäjätilan; Osuma() käyttää kamera.WorldToScreenPoint(juuri) vs. PalloKierto-syöte
  (Macilla Mouse.current.position).

## Muut (TAUON jälkeen)
- Museo2: simuvuoro-museo2.zsh e325c3bb7 (2 simua) odottaa tauon yli; sisältö viesti-linssiseppa-luovutus-20261010-paiva.md.
- `opas kori 0` ei aina pidä (PT 12.4x, ei kiire). LS-äänet (korkea tuuli) todentamatta.
- Worktree wt/proto-linssiseppa-kaupunkiaanet on nyt haarassa linssiseppa/pallomerkit-176 (diag-commit, ei junaan);
  pallo-esittely-176 on valmis ja rungossa.
