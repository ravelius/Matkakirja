# Natiivisepän luovutus 2.10.2026 klo 13.1x — konteksti pitkä

Luovuttaja: Natiiviseppä (Opus 5.5, high, Macin käyttäjä koodaus). Edellinen: -20261001-b.md (käytännöt voimassa, ellei tässä toisin).

## TILA HETI (LOPULLINEN, tilinvaihto 2.10. 22.1x)

- **proto master e204abbe = BUILD 129** (juna/b13 0b5c8d87, käännös 745d8ff0, savuke 1129 PASS). TF 129 = lataus 8/12
  (Julkaisija ~22.05). TF-laskuri nollautuu 3.10. klo 12.30: illalla enintään 9–10, **2 latausta (11–12) säästetään aamuun**.
- Ei avoimia junia eikä natiiviseppa-worktreeitä. Lokeissa vain uusin juna-kopio (juna-1.1.129-745d8ff0); levysääntö alla.
- Klo 22.09 käännöspalvelussa käynnissä Natiivi-UI:n testikäännös (ylapalkki-matalampi + kokoelmat-ikkuna) — saa valmistua.
- **Juna 130 koostumus (Päätoimittaja 22.1x), ei vielä koottu eikä merge-pyyntöjä kuitattu**: kokoa juna/b13 0b5c8d87:n päälle
  uuteen worktreehen (`git worktree add -b natiiviseppa/juna-130-koe /Users/Shared/Claude/wt/proto-natiiviseppa-j130 0b5c8d87`),
  testaa (scratchpadin testit-j111.sh-pohja: 4 sarjaa + tyylikirja + pohjavahti), pyydä NYT Julkaisijalta:
  1. Matalampi yläpalkki: natiivi-ui/ylapalkki-matalampi (b725dffa + d00c7f8b) — odota Natiivi-UI:n merge-pyyntö ja kuvapari.
  2. Julisteet/Aarteet-ikkuna: natiivi-ui/kokoelmat-ikkuna (5cfe7253).
  3. Topografian hampurilainen: linssiseppa/topografia-hampurilainen.
  4. Astro/ISS: linssiseppa2/astro-palaute (LS2).
  5. Skin-varjo: siirtoseppa/linna-skin 0592decd (yksi sekoitusrivi; Siirtosepän simutodennus).
  Varmista jokaisen kärki-SHA merge-pyynnöstä ennen kokoamista; skin-paketti (2abec0c9…) vaatii osoittimen vaihdon omistajan OK:lla.

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
