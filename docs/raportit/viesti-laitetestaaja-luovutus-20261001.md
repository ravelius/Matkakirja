# Laitetestaajan luovutus 1.10.2026 klo 06.0x (viikkokiintiö 95 %, Päätoimittajan käsky)

Haara `laitetestaaja-savukierros-b13`. Kärki = tämän tiedoston commit (savukierros 1.1 (90) -commit **a6cf6f404** on
sitä edellinen). Ei avoimia PR:jä (rooli committaa raportit suoraan omaan haaraansa). Repossa on muiden roolien
untracked-tiedostoja (`tools/.natiivi-ui-*.mjs`, `tulokset/`, `docs/raportit/kuvat/vuosi-ndvi-thessalia-koe-20260928.png`)
— älä koske.

**Ei käynnissä olevia ajoja.** Molemmat omat simulaattorit Shutdown: iPhone 18 Pro `1572C658-6455-4E55-8C05-3F88CB3C32F6`,
iPad `3B4CDACB-CCBE-42EC-809D-FB4D0B43CC7D` (tarkista `xcrun simctl list devices | grep -E "1572C658|3B4CDACB"`).
PRB-välimuisti poistettu molemmista 30.9./1.10. (levyhälytys); ilmaantuu uudelleen, poista vain sammutetusta omasta
(`.../data/Library/Application Support/PRBPosterExtensionDataStore`, EI erasea).

## Viimeisin valmis kierros: 1.1 (90) 27c449e4 — PASS
Olavinlinna (järvi, taivas, kuori; aluskasveja ei ilman ympäristöpakettia), regressio, mikseri, ISS/Cupola/EVA.
Raportti `docs/raportit/savukierros-1190-20261001.md`. Kaikki 1.1 (76) … (90) -kierrokset raportoitu:
`savukierros-11NN-2026093x/2026100x.md`, Natiiviseppä ja Julkaisija kuitattu aina. Avoimet "todentamatta"-kohdat:
- 1.1 (83): kaupungit ilman luentakuvia (Ohita) — Ljubljana ei luentaa lainkaan, Bryssel/Valletta eivät tavoitettavissa
  `matka`-komennolla (1.1 (85)); tarvitaan toimiva kaupunki+kulkutapa.
- 1.1 (88): Pulun Ihmisen matka -reitti, maakuntakortin kuvaselaus/minikarttaanimaatio, Ateenan kuvamerkki maanäkymässä.
- 1.1 (89): mikserinapin piilotus ilman kehittäjätilaa — Debug-käännös on aina kehittäjätilassa (Asetukset.Kehittaja =
  Debug.isDebugBuild), todennettava TF:ssä.
- Luennan 1,3 s lappuviive ja reittihahmojen kävelyn luontevuus (1.1 (85)) — kehysväli/tumma yö esti arvioinnin.

## Tämä sessio: protokolla tiivistettynä
1. Julkaisija lähettää "LAITE NYT" (vain silloin boot; Natiiviseppä lähettää tarkistuslistan erikseen). Pyydä vuoroa
   viestillä kun uusi juna on asennettu. Yksi simulaattori kerrallaan, ei uusintayritystä epäonnistuneelle bootille.
2. `xcrun simctl boot` → md5 `UnityFramework` vs `proto-3d/lokit/juna-1.1.NN-<sha>/Matkakirja3D.app` → `simctl launch
   --console-pty` tiedostoon (konsoli = poikkeus-/layout-grep: `Exception`, `struggling to process`).
3. Komentokanavat Documents-kansiossa (`simctl get_app_container <UDID> app.matkakirja.proto3d data`): ui-komento.txt (`ui …`),
   peli-komento.txt, linssi-komento.txt (`linssi …`, `poikki …`, `astro …`, `kehittaja 1`, `elava elementit tila`),
   komento.txt (`aja lat lon z 2`, `symbolit …`). Koordinaatit AINA `ui puu` (laitepisteet 402×874), taps `mcp…control tap`
   vaatii `attach`-kutsun ensin. Aloitus: tap (201,665) Uusi matka → (201,604) valinta → (273,427) Ateena.
4. Ääni: pelin mykistys on oletuksena; `aani mykistys 0` vain mittauksen ajan, sen jälkeen `aani mykistys 1`.
   `aani mittaa 3` mittaa Unity-miksin (ei natiivikerrosta: se vain `ui cupolaaani`). Macin oletusulostuloon EI koskaan.
5. Raportti `docs/raportit/savukierros-11NN-<pvm>.md` + kuvat `docs/raportit/kuvat/`, commit+push omaan haaraan
   (Co-Authored-By: Claude Sonnet 5.5), viestit Natiiviseppälle (tulos) ja Julkaisijalle (lyhyt + "sammutettu"),
   `simctl terminate` + `shutdown`. Viesti ei mene perille "Päätoimittaja"-nimellä → käytä nimeä + `[ref]` tai
   `mcp__ccd_session_mgmt__send_message` session id:llä.
6. Videot: `simctl io recordVideo` + `pkill -INT`, kehykset `ffmpeg -fflags +igndts`; vaakakuva on fyysisesti pystykuva →
   `rotate(90)`.
7. Huomioita: kehittäjäkoodi/`kehittaja 1` jää plistiin; `linssi.esittelylinssit`=1 piilottaa Kuori-napin (nollaa
   PlistBuddylla sovellus kiinni); `ui mac pakota` + `mac nipistys 1.6 900 1500` kartan zoomiin; `ui nappain
   oikea|alas|esc|plus|miinus`; `ui maakunnat kortti ITA:Toscana` + `kysymys 0`; `ui nosto kohde:akropolis@GRC` + `ui
   nostonappi kysy0`; Segovian akvedukti -korttia ei löytynyt `ui nosto`-tunnuksilla.

## Tarkista aina näin uudessa sessiossa
1. `tail -20 /Users/Shared/Claude/proto-3d/lokit/kaannospalvelu/juna.log` — uusin juna/SHA; `ls proto-3d/lokit/juna-1.1.*`.
2. `cd /Users/Shared/Claude/Matkakirja-laitetestaaja && git fetch origin && git log --oneline -5`.
3. `xcrun simctl list devices | grep -E "1572C658|3B4CDACB"` — Shutdown kierrosten välissä.
4. Kuittaa Päätoimittajalle yhdellä rivillä; odota Natiiviseppän tarkistuslista + Julkaisijan LAITE NYT.
