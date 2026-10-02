# Natiivisepän luovutus 2.10.2026 klo 13.1x — konteksti pitkä

Luovuttaja: Natiiviseppä (Opus 5.5, high, Macin käyttäjä koodaus). Edellinen: -20261001-b.md (käytännöt voimassa, ellei tässä toisin).

## TILA HETI

- **proto master bce26259 = BUILD 119** (juna c911a130, käännös c0f240eb, savuke 1119 PASS).
- **TF tänään**: 1.1 (116) f72743f3 ladattu 12.25; lisäksi Julkaisija vei TF 1.1 (118) 793a6a18 (~12.45). Seuraava TF-ehdokas
  = uusin puhdas BUILD (Päätoimittajan sääntö: uusin build, jonka savuke on puhdas latoushetkellä).
- **Juna 120 käännetty**: juna/b13 f41e9530 = 119 + natiivi-ui/pohja-pulu d012447f + siirtoseppa/linna-piikit 29c84ce2,
  käännös 8aaa1ae7 (13.07), .app lokit/juna-1.1.120-8aaa1ae7/. **Savuke 1120 pyydetty Laitetestaajalta** (Pulu-teemat, linna).
  PASS → BUILD 120: `git merge --no-ff juna/b13 -F <viesti>` päächeckoutissa masterissa (puhdas, ei laite-sha-ajoa käynnissä),
  tarkista `git diff --quiet HEAD f41e9530`, kirjaa juna.log-rivi, SHA Julkaisijalle + Päätoimittajalle.
- **Juna 121 koottu ja testattu** (ei avattu): worktree /Users/Shared/Claude/wt/proto-natiiviseppa-j121, haara
  natiiviseppa/juna-121-koe = 3570bbb2 = f41e9530 + linssiseppa2/iss-kamera-kuva-2 a2ce6b38 (kilven maa ≥ 3 % näytteistä)
  + natiivi-ui/pohja-kuvanakyma 1606e672 (✕ avaruuslasi 44 pt). Testit 0/436/387/562, tyylikirja ok, pohjavahti ok (69).
  Pyydä Julkaisijalta NYT 120:n BUILDin jälkeen. Savuke 1121: ISS-kyydin ✕ (jäi testissä dialogin alle) + LS2:n komennot:
  `astro kyyti vertailu 30 -40 420 30 -35 37.5 2026-06-21T12:00:00` → `astro kyyti kuvaa 4:5 1024` → `astro kyyti kuvaa tila`
  = EI MAATA; kulma `22 12 420 22 14` = VAIN EUROOPPA. EI KUVAUSPAIKKAA ei ole saavutettavissa (ei savuke-ehto).
- **Odottaa**: siirtoseppa/linna-piikit-2 db3ed117 (valoatlakset kaistoina, Dev-.app lokit/laite-dev-db3ed117/): Siirtosepän
  iPad-ABAB vs 29c84ce2 → jos parempi, merge-pyyntö → juna 121/122.
- Avoimia worktreeitä: j118 (natiiviseppa/juna-118-koe c911a130, mergetty), j120 (juna-120-koe f41e9530), j121. Poista
  mergetyt `git worktree remove … && git branch -D …`.

## TÄNÄÄN (2.10.) TEHDYT BUILDIT

111 94a914c8 · 113 fed526e4 · 114 4fa4d295 · 116 f72743f3 · 118 793a6a18 · 119 bce26259.
Ohitetut: 112 (Lehti ei avannut leikekirjaa: täkynoston id puuttui kokoelmadatasta), 115 (ISS-kuva raidallinen +
22dfaccb signal 11: RGB24 luettiin Color32:na), 117 (paluu avaruuskävelyltä Cupolaan ei toiminut).

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
