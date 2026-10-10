# Linssisepän luovutus 10.10.2026 klo 12.5x (nollaus, konteksti 55 %)

Proto-haarat ovat paikallisia (sama git /Users/Shared/Claude/proto-3d/Matkakirja-proto), ei pushia. Kaikki työ on commitoitu.
Omistaja: kaikki TF 176 -korjaukset seuraavaan julkaisuun (juna 176 → TF 177). **Juna odottaa vain LS1:n kolmea korjausta** (Pariisin
pallo + pallomerkit 2 ja 4). SHA:t PT:lle ja Natiivisepälle heti, kun kukin on valmis. Julkaisija antaa etusijan (korjauskäännös on
lukkojonossa seuraavana Natiivisepän Release-käännöksen jälkeen, ~13.20).

## KIIRE 1: PARIISIN PALLO (omistajan TF 176 -kuvat)
"kun siirryn suoraan toisesta maasta pariisin kippiin, niin kuumailmapallon päällä näkyy pariisin esittelykuvat ja kipin kertojan ääni
ei kuulu edes esittelyn päätyttyä". Esittelykuvat = Pariisin nykyintro (OpasSovitin.Intro.cs, LS1:n oma), ja pallo = OpasSovitin
(kaupunkitila, AvaaKaupunkitila ← KaupunkiPallot.Avaa).
- **WIP-korjaus: linssiseppa/pallo-esittely-176 d8808a222** (wt/proto-linssiseppa-kaupunkiaanet, junan runko natiiviseppa/juna-176
  51e42e7a6; L1301, unity 0). Sisältö: esitysVersio + EsitysVoimassa (istunto JA kaupunki) EsitysAvauksessa, SoitaJaOdotassa ja
  AvausTekstinassa; EsitysNollaa (IntroSulje, silta.Stop, PyynnotSeis false), kun AvaaKaupunkitila vaihtaa auki olevan oppaan
  kaupunkia; IntroVoimassa vaatii introKaupunki == KaupunkitilaId; Sulje kasvattaa esitysVersiota; laaja Avaa nollaa esitysAlkaa;
  try/finally vapauttaa PyynnotSeisin, jos esitys päättyy ennen kierrosta; "kaupunkikierros ei alkanut" kirjataan.
- **TODENTAMATTA.** Toisto `simuvuoro-pallo.zsh e325c3bb7` (iPhone D0D2CD1E, setsid, loki scratchpadissa ei säily →
  proto-3d/lokit/todistus-pallo-vaihto-176-museo-kombo-176-20261010-1240/): **A-polku (Tukholma auki → linssi pois → Pariisin pallo)
  EI toistanut vikaa** vanhalla 6.7-käännöksellä: intro, avaus, kierros ja pyynnöt OK, vaikka Tukholman avaus soi siirtymässä.
  B-polku (Tukholma oppaan sisällä → suoraan Pariisi, eli auki olevan oppaan haara) oli kesken 12.5x → katso konsoli-stdout.log:
  "opas: esitys alkaa (pariisi)", "intro loppui", "esitys: kaupunkikierros", "pyyntö 1 Pariisi".
- HUOM skenaario: `oleta`-kuvio on regex → "(pariisi)"-sulut eivät osu (väärä PUUTE ja 120 s:n odotus). Korjaa sk-pallo-vaihto-176.txt:
  "opas: esitys alkaa .pariisi." tai ilman sulkuja.
- Jos B ei toista vikaa: omistajan polku on todennäköisesti kehittäjän maailmannäkymä / Macin pallo (TF 176 Mac). Toista Macilla
  (alla) tai päättele lokista (Mac: ~/Library/Application Support/Matkakirja/Matkakirja 3D/linssi-loki.txt). Korjaus on
  turvallinen joka tapauksessa (istuntovuoto on todellinen), mutta PT:lle kerrotaan, toistuiko vika.

## KIIRE 2: PALLON KOHDEMERKIT IRTI (2) + KAUPUNKIVALINTA EI OSU KEHITTÄJÄNÄKYMÄSSÄ (4)
- Omistaja ajoi todennäköisesti **TF 176:n Mac-natiivia** (NUI: ikkuna ~1,45:1 vaaka). Mac-app build 176: kopio
  **/Users/Shared/Claude/proto-3d/lokit/linssiseppa-app/mac-176/Matkakirja 3D.app** (alkuperäinen Natiivisepän
  Matkakirja-proto-mac/Build/mac/, älä aja sieltä). Käynnistys ilman napsautuksia: kirjoita
  `~/Library/Application Support/Matkakirja/Matkakirja 3D/peli-komento.txt` ("odota-tila Aloitus 60 / uusi-peli 5 lontoo /
  odota-tila Kartta 60"), sitten `open -n "<app>" --args -screen-fullscreen 0 -screen-width 1450 -screen-height 1000`; loki
  ~/Library/Logs/Matkakirja/Matkakirja 3D/Player.log; kuva `screencapture -x`. Tarkista ensin, ettei omistaja käytä Macia
  (HIDIdleTime > 60 s, muisti mac-gui-automaatio-omistajan-naytolla). Käynnistin 12.5x (pid 15554) ja sammutin nollausta varten
  ennen kuvia.
- iPhone-toisto sk-pallo-merkit-176.txt ajetaan simuvuoro-pallo.zsh:n lopussa (lokit/todistus-pallo-merkit-176-museo-kombo-176-*).
- Koodi: merkit = georeferenssin lapsia, paikka gt.TransformPoint(pinta) + kamerasäde (3D). Siksi Screen/pixelRect-ero selittää
  vain osumat (4), ei visuaalista irtoamista (2). Pallo.unityn muunnokset ja Cesium 1.25.1 ovat samat ennen ja jälkeen 6.7:n.
  CesiumKaupunki siirtää yhteisen georeferenssin origoa ja palauttaa sen Suljessa (vanhaOrigo Avaassa). Mac-polun erot:
  `#if UNITY_STANDALONE_OSX` (MacLaatu, Mac-profiili). Epäily: Macin ikkuna tai Retina (Screen vs. kamera.pixelRect) osumille;
  visuaaliselle Mac-ajon georef/kamera-ero → toista ensin.

## Muut avoimet
- **PT 12.4x, ei kiire:** `opas kori 0` ei aina pidä uudessa käännöksessä. LS2 joutui rajaamaan korin pois klo 9:n vertailukuvista
  (PalloKori.cs / OpasValikko.cs). Kiertotie LS2:lla: KOMENNOT="opas ajallinen pois;opas kori 0". Korjaa junaan, kun ehdit.
- **Museo (taidemuseo-176 4b92767ed, kombo 48c4d9f28 → käännös e325c3bb7):** `simuvuoro-museo2.zsh e325c3bb7` (2 simua) on Julkaisijan
  jonossa pallon jälkeen → kuvat itse → kuittauspyyntö PT:lle (NUI-korttikorjaus fb12f25b8). Sisältö ja seuraavat vaiheet:
  viesti-linssiseppa-luovutus-20261010-paiva.md + muistio linssiseppa-tila-20261009.md (rivit 10.10. 10.4x–12.4x).
- **Juna 176 kuitattu:** maa-dtm-175-u67 29be895b8 (rungossa natiiviseppa/juna-176 16bcbfbd4).
- **LS-äänet (korkea tuuli) todentamatta:** "opas kamera" ei muuta äänimaiseman korkeutta (tila 4× 96 m; KaupunkiAanimaisemaSoitin
  ← OpasSovitin.KaupunkiKamera/PaivitaKameraTila). PT: museon jälkeen.
- Worktreet: wt/proto-linssiseppa-taidemuseo (museo + todistusajo.sh, johon linssiseppa-ajot/*.zsh osoittavat) ja
  wt/proto-linssiseppa-kaupunkiaanet (pallo-esittely-176).

## Taustalla käynnissä
- `simuvuoro-pallo.zsh e325c3bb7` (setsid, iPhone D0D2CD1E; vaihto, sitten merkit; lopussa "SIMU ALAS"). Kun se päättyy: ilmoita
  Julkaisijalle "simu vapaa" → museo2 seuraa.
