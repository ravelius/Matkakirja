# Natiivisepän luovutus 2.10.2026 klo 13.1x — konteksti pitkä

Luovuttaja: Natiiviseppä (Opus 5.5, high, Macin käyttäjä koodaus). Edellinen: -20261001-b.md (käytännöt voimassa, ellei tässä toisin).

## TILA HETI (päivitetty 16.2x)

- **proto master e00ba2b6 = BUILD 125** (juna 4612f388, käännös cf3ffcf1: Ajattelijat ea76da0b + kipsipäät/erikoisnostot
  ea412b26 + linna-puhevuoro-3 1bb7df6d). TF 125 lähtee ~17.45 (SHA Julkaisijalla). TF-raja 12/vrk; omistaja: junat isoina
  2–3 h välein.
- **Juna 126 kokoamassa**: worktree /Users/Shared/Claude/wt/proto-natiiviseppa-j124, haara natiiviseppa/juna-124-koe = 2288fb24
  = 4612f388 + natiivi-ui/raha-punta cfd6c103 (£-muoto, omistaja 15.50). Testit 0/439/387/568 ok.
  Tulossa: siirtoseppa/linna-puhevuoro-4 20db9318 (Muurinharjan repliikki pelaajan teko vain 1,5 s napautuksesta; testikomento
  `poikki kertoja`). Laitetestaajan tekstilaatikkotesti (20db9318+): `kehittaja 1` → `linssi poikkileikkaus` (odota "ympäristö
  valmis") → `poikki kertoja` (odota "erillinen puhe linna-kertoja" + 3 s: laatikko EI näy) → peli `puhe pois` → `poikki kertoja`
  + 6 s (laatikko näkyy) → `puhe paalle`.
- **Odottaa webiä #3854**: natiivi-ui/ohjausnappi 01c0d8d1 + siirtoseppa/linna-valikko f45bf78a.
- LS2: Ajattelijoiden reunavalon korjaus (haaran kärki f960dec4, ei vielä merge-pyyntönä). Natiivi-UI: ylapalkki-tikkaus
  raha-punnan päälle; pohjavahti --kirjaa.

## TÄNÄÄN (2.10.) TEHDYT BUILDIT

111 94a914c8 · 113 fed526e4 · 114 4fa4d295 · 116 f72743f3 · 118 793a6a18 · 119 bce26259 · 120 8fd12e83 · 122 19060a07 · 123 3f17a0e6 · 124 9df72166 · 125 e00ba2b6.
Ohitetut: 112 (Lehti ei avannut leikekirjaa: täkynoston id puuttui kokoelmadatasta), 115 (ISS-kuva raidallinen +
22dfaccb signal 11: RGB24 luettiin Color32:na), 117 (paluu avaruuskävelyltä Cupolaan ei toiminut), 121 (✕ avaruuslasi).

## UUDET OPIT JA TYÖKALUT

- **Laitekäännös ilman iPad-asennusta** (proto-3d/lokit/natiiviseppa-skriptit/): `laite-kopio.sh` (Dev) ja
  `laite-release-kopio.sh` (Release) kopioivat .appin lokit/laite-dev-<SHA>/ tai laite-rel-<SHA>/; `laite-sha-kopio.sh`
  (KEHITYS=1 → Dev, muuten Release); `laite-lukon-jalkeen-kopio.sh <SHA>`; **`laite-vuorossa-kopio.sh <SHA> <edeltäjä>`**
  odottaa, että lukon kuka-rivillä on käynyt edeltäjä (Julkaisijan jonojärjestys), ja ajaa sitten. Käynnistys irrotettuna:
  `KEHITYS=1 perl -MPOSIX -e 'exit if fork; POSIX::setsid(); open STDOUT,">>",$ARGV[0]; open STDERR,">&STDOUT"; exec "/bin/zsh",$ARGV[1],"<SHA>","<edeltäjä>"' <loki> $PWD/laite-vuorossa-kopio.sh`.
  Roolit asentavat itse iPad-vuorollaan (`xcrun devicectl device install app --device 00008103-001819421413401E <polku>`).
- **Junan avaus**: `git update-ref refs/heads/juna/b13 <uusi> <vanha>` + juna.log-rivi + juna-ajo.sh käsikierros
  perl-setsidillä (ajastin-tila ohittaa niputuksen, odottaa lukkoa). Odota KÄÄNNETTY-riviä juna.log:sta avausrivin jälkeen,
  sitten `kopioi-juna-app.sh 1.1.NNN <käännös-SHA>`.
- **Testit**: scratchpadin testit-j1NN.sh (sed testit-j111.sh:stä worktree-polku) — 4 sarjaa + tyylikirja + pohjavahti ~2 min.
  Aja vasta kun TF-kriittinen käännös ei ole käynnissä.
- **ISS-kamera**: muistiehto täyttyi (iPad 3 × 50 mm, 0 muistivaroitusta, vapaa muisti palaa); leveys os_proc_available_memory:n
  mukaan, laitteella 0 = pienin. Ehto: kuvat aina avataan ja katsotaan silmin (LS2 raportoi 84b8556b:n luvut katsomatta kuvaa).
- **UI-kuvien alfa**: valo-/legendakerrosten alfa 240–254 on tarkoituksellista (antialias), vuoto koskee vain peittäviä pohjia.
- **NYT-viestit voivat mennä ristiin**: Julkaisijan ensimmäinen NYT nimesi vanhan SHA:n (118 53c5595a), tarkennus tuli käännöksen
  alettua → ei katkaistu (TF-lukko tulossa), puuttuva erä seuraavaan junaan. Tarkista SHA ennen update-refiä.
- Savukkeen napautukset: Laitetestaajan simulaattorityökalu tarvitsee attachin; LS1:n detach irrotti paneelin 1572C658:lta,
  FB234D08:lta ja C1D5E34C:ltä.
- Myllyn naksahdukset kuuluvat vain Äänimaisema päällä (tarkoitettu, webin sfx.enabled).
