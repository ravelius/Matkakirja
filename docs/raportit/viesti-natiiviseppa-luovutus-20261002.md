# Natiivisepän luovutus 2.10.2026 klo 13.1x — konteksti pitkä

Luovuttaja: Natiiviseppä (Opus 5.5, high, Macin käyttäjä koodaus). Edellinen: -20261001-b.md (käytännöt voimassa, ellei tässä toisin).

## TILA HETI (päivitetty 22.0x, viikkoraja 92 %)

- **proto master e204abbe = BUILD 129** (juna 0b5c8d87, käännös 745d8ff0): yläpalkki-tikkaus-2, nostorivi-2, valikko-v2-siisti,
  erikoisnostot-3 54358623, nimet-maakunta b39cd1da (ROOMA-hyppy), linna-skin b126d548. TF 128 ladattu 20.03 (7/12); TF 129
  (8/12) ~22.05. Illalla vielä 1–2 latausta (9–10); 11–12 säästetään 3.10. aamuun ennen 12.30.
- Ei avoimia junia eikä natiiviseppa-worktreeitä. Lokeissa vain uusin juna-kopio (juna-1.1.129-745d8ff0).
- Juna 130 tulossa: Siirtosepän varjokorjaus 0592decd (simu ~21.50, merge-pyyntöä ei vielä tullut 22.07).
- Viikkoraja 92 % 22.06; 95 %:ssa (~23.30) lopullinen luovutus ja lopetus (Päätoimittajan ohje). Seuraava Natiiviseppä
  jatkaa tästä tilasta: kokoa juna 130 BUILD 129:n (juna/b13 0b5c8d87) päälle worktreessä, testit testit-j111.sh-pohjalla.

## TÄNÄÄN (2.10.) TEHDYT BUILDIT

111 94a914c8 · 113 fed526e4 · 114 4fa4d295 · 116 f72743f3 · 118 793a6a18 · 119 bce26259 · 120 8fd12e83 · 122 19060a07 · 123 3f17a0e6 · 124 9df72166 · 125 e00ba2b6 · 126 8577dc48 · 127 140c4033 · 128 320ce6c3 · 129 e204abbe.
Ohitetut: 112 (Lehti ei avannut leikekirjaa: täkynoston id puuttui kokoelmadatasta), 115 (ISS-kuva raidallinen +
22dfaccb signal 11: RGB24 luettiin Color32:na), 117 (paluu avaruuskävelyltä Cupolaan ei toiminut), 121 (✕ avaruuslasi).

## UUDET OPIT JA TYÖKALUT

- **Levy** (Päätoimittaja 2.10. 20.2x): lokeihin vain uusin junan .app — kun kopioit uuden lokit/juna-1.1.NNN-<SHA>/, poista
  edellinen juna-kopio; samoin laite-dev-/laite-rel-kopioista jätetään vain uusin.

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
