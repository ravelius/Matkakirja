# Natiivisepän luovutus 24.9.2026 (c), klo 13.20

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti 70 % (Fable).
Edellinen: viesti-natiiviseppa-luovutus-20260924-b.md. Rooli: natiivin pääkehittäjä, proto-gitin master, Unity/iPad/simulaattori.

## Lue ensin

CLAUDE.md, Raamatun Ydinajatus kohta 2 ja NATIIVI PELI ETUSIJALLE (LENNON ESITYS, KAMERA-AJOT, TEMPO, kuvauskulma:
kone etuviistosta/sivulta, ei koskaan suoraan takaa), proto-3d/TYOTAPA.md, Assets/Matkakirja/RAJAPINTA.md (uusi 8b radion
VU-taso). Muisti: natiiviseppa-tila-20260924-paiva.md (kaikki tämän päivän yksityiskohdat ja jonot).

## Tila

- **Proto-master 24c9194** (tarkista 0, kaanna 248/248, linssit 225/225, sim + xcode-sim läpi). Varmuuskopio: remote
  `natiivi-backup` (github ravelius/Matkakirja-natiivi) — master, testi/b8, natiiviseppa/konemalli, natiiviseppa/varalaatta-uusinta pushattu.
- **Build 6** = 7b3adee TestFlightissa. **Build 7** = 24c9194 Julkaisijalla: Unity-vienti jumittuu ajurissa (pääsäie
  NSApplicationin tapahtumasilmukassa heti lisenssin jälkeen, dumppi proto-3d/lokit/vienti-jumi-131136). Unity toimii
  Natiivisepän shellistä (-createProject läpi) → ajurin istunto (lukittu näyttö?) — Fable/omistaja ratkaisee. Julkaisija
  kysyy ennen seuraavaa ajoa. **Masteriin ei mergetä ennen Julkaisijan "build valmis" -ilmoitusta (Fablen käsky).**
- Build 7 sisältää: löydös 22 (Varitaso.huntu = true, Karttasepän kermasarjat julisteet/pallo/kerma/2026-09-23a-p080/<ISO> +
  _maailma, Z5–8, laattapalvelin ohjaa alueen ulkopuolen _maailmaan, Z0–4 ja 404 läpinäkyviä; rajaviiva Maaraja.cs
  maapolygonit.geojsonista NE 10m), Natiivi-UI 20–24 + aloituskaava + ulos-zoomi (Kuminauha), lentokamera (kone 0,74 ruudusta
  lähikuvassa, matala kulma, irtautuminen/matka etuviistosta-sivulta), frustum-korjaus (PalloKierto.Sade + NaN-suoja;
  Laitetestaaja: navat ja renkaat PASS 161fa35:llä), VU-tappi (live-Icecast ei syötä tappia → varakuvio −1, 24c9194), piikit6–7, vu-rms/vu-syy.
- **Laitteet:** iPad = Development f5a8906 (Linssisepän VU-sarja). iPhone-simulaattori 1572C658 = 24c9194 (Laitetestaaja).
  iPad-simulaattori 503000D1 = 24c9194 (oma testilaite). Unity kiinni.

## Build 8 -jono (testi/b8 = master + nämä, käännetty luo:lla, EI masterissa)

1. `natiiviseppa/varalaatta-uusinta` c1ee11f: pohjan pergamenttivaralaatat haetaan uudelleen 10 s välein kun ei kiirettä ja
   pohja ladataan uudelleen (B7-3 umpikerma-suorakulmio = pohjan varalaatta, EI huntu; Karttaseppä vahvisti sarjat oikeiksi);
   huntulaatoille kiirejono + 4 paikkaa (B7-3 viisto sauma = huntu ei vielä latautunut). Kuvat samoista kohdista Fablelle.
2. `natiivi-ui/iphone-island` 7650ba5: kartuscha piiloon aloituksessa/aloituslennolla + ☰-valikon järjestys. Natiivi-UI tarvitsee
   simulaattorin ~3 min valikkokuvaan.
3. Tulossa: iPad-sumea (Natiivi-UI), Pelikoodarin lento-alku-luennat aloituslennolle.
4. **VU AVAudioEngine** (Fablen tilaus build 8): oma soitin live-virroille (URLSession-virta → AudioFileStream → AudioConverter →
   AVAudioPlayerNode, taso installTapOnBus:lla) samalla MatkakirjaRadio_*-API:lla (Taso/Huippu/Rms/Kuvaus). MTAudioProcessingTap
   ei saa ääntä live-itemiltä (tappikutsuja 0, Linssisepän mittaus).

## Elokuvalento (Fablen kortti klo 11.4x) — erä 1 kesken

- `natiiviseppa/konemalli` d0ca50a: uusi DC-3 (36 010 kolmiota, 4K atlas DC3_vari/normaali/maski = 8,3 Mt, lasi erikseen,
  Lahde~/dc3_hd.py + dc3_maalaus.py, CC0, LISENSSI.md päivitetty, Rakennus.cs tekstuurit + KoneTekstuurienTuonti-postprocessor).
  Tuotu Unityyn haarassa testi/b8 (49c44ad: tekstuurien .metat, Kone.mat tekstuureilla). Atlas tarkistettu: ei mustia/tyhjiä alueita.
  SEURAAVAKSI: sim-käännös testi/b8:sta → lähikuva etuviistosta auringon kiillolla + siiven ohilento Fablelle ENNEN mergeä;
  tarkista Potkurit.cs V/O-pyörimissuunnat (V/O vaihtoivat puolta), KoneRaita-materiaali käyttämättä, lasi läpinäkymätön.
  Heijastusluotain (ReflectionProbe realtime 128, culling taivas+pallo, seuraa konetta) erään 3.
- Blender: leivonta VAIN CPU:lla taustatilassa (`Blender -b`), Cycles Metal kaatoi klo 12.17 (omistajan työpöydälle ikkuna).
  Tarkista ulostulo leivonnan jälkeen.
- Erät 2–5 jonossa: potkurikiekko, filmiefektipino (lennoilla vain, 3–5 ms), savu/vanat/sumu/kimallus/pilvivarjot, siiven ohi -ajo.
- Lähteet (Fable 12.5x): Poly Haven, ambientCG (CC0), omat Blender-proseduraaliset, Smithsonian Open Access 3D, Three D Scans (PD);
  EI Scan the World, Quixel, Textures.com, Sketchfab ilman tarkistusta. Ulkoiset lisenssiporttiin + Tietoja.cs.

## Muut jonossa

- Varjostinten esilämmitys (Linssiseppä: ensipiirto ScheduleDraw ~19 ms satelliitti/topografia/vesistöt): ShaderVariantCollection
  tai Unity 6 GraphicsStateCollection.
- Lontoon nasta aloitusvalinnassa (pariteetti rivi 2, KaupunkiMerkit).
- Taidemuseo-linssin suunnitelma: tarkista/korjaa luvut 2A, 6, 7 haarassa linssiseppa-tyo-20260923
  (docs/raportit/linssi-taidemuseo-suunnitelma-20260924.md), kiireetön.
- Kaupunkikierrossa kamera voi osua koneen taakse (kierto kohdistuu kaupunkiin) — tarkista omistajan kulmasääntöä vasten.

## Työkalut ja opit

- Scratchpadin skriptit (edellinen sessio, polku e3e676cf…/scratchpad): kaannokset.sh [sim] [laite] (Development),
  kaannokset-release.sh, lentotesti.sh <kaupunki> <kansio> (iPad-simulaattori, mykistys defaults write matkakirja-aanimaisema 0,
  8 kuvaa + video), lahikuva.sh, nakymatesti.sh, ipadlento.sh. Kopioi tarvittaessa. Laitekomennot: `hiljaa|aanet`, `vari <ISO>|pois`,
  `portti paalle|pois`, `renkaat a,b [valittu]`, `aja lat lon kaari s`.
- Main-worktreen haaranvaihto: haara, joka on toisessa worktreessä, ei vaihdu (git checkout epäonnistuu hiljaa ketjussa) →
  tee testihaara `git checkout -b testi/x master` + merget.
- Blenderin FBX-vienti: Apply Transform rikkoo navan alla olevat lavat → dc3_hd.py korjaa.
