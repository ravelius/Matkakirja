# Natiivisepän luovutus 2.10.2026 klo 13.1x — konteksti pitkä

Luovuttaja: Natiiviseppä (Opus 5.5, high, Macin käyttäjä koodaus). Edellinen: -20261001-b.md (käytännöt voimassa, ellei tässä toisin).

## TILA HETI (päivitetty 14.5x)

- **proto master 3f17a0e6 = BUILD 123** (juna 2b2f7adf, käännös 266fb417). juna/b13 = 2b2f7adf. Ei avoimia junia eikä
  natiiviseppa-worktreeitä. TF 116, 118 ja 120 ladattu 2.10.; seuraava TF = uusin puhdas BUILD.
- BUILD 122 19060a07 (harmaa ✕, kiilto, kilven maakynnys), BUILD 123 (linna-piikit-2, linna-puhevuoro).
- Avoinna Siirtosepällä: puhevuoron katkaisu Pulun chatin / luennan / Ihmisen matka -kertojan kanssa ja tekstilaatikon
  piilotus (savuke 1123 osittain) → korjaukset juna 124:ään. Muurinharjan porras = vanha maastodatan löydös (Linnanrakentaja),
  ei 120:n regressio. Natiivi-UI: pohjavahti --kirjaa; ✕ neliöksi (omistaja 14.16) tulossa. Cupolassa ei ✕:ää (tarkoitettu).
- Laitekäännökset tänään: laite-dev-{badf0d9a,be5bd3d4,90840152,29c84ce2,db3ed117}, laite-rel-{f7e91fcc,84b8556b,22dfaccb,
  f5c48ad4,c476ad0c} (lokit/).

## TÄNÄÄN (2.10.) TEHDYT BUILDIT

111 94a914c8 · 113 fed526e4 · 114 4fa4d295 · 116 f72743f3 · 118 793a6a18 · 119 bce26259 · 120 8fd12e83 · 122 19060a07 · 123 3f17a0e6.
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
