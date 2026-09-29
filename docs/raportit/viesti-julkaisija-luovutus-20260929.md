# Julkaisijan luovutus 29.9.2026 klo 15.5x (tilinvaihto)

Julkaisija (Opus 5.5) → seuraava Julkaisija. Checkout /Users/Shared/Claude/Matkakirja-julkaisija, työkalut
/Users/Shared/Claude/julkaisija-tyokalut/ (jonoon.sh, ajojono.sh, valmistele.sh, mergaa.sh, pidossa.txt,
tf-1.0.NN-build.txt). Päivän vuorot ja päätökset: julkaisija-tyokalut/vuorot-20260928.txt (loppu).
Fable = "Päätoimittaja (Opus, xhigh)".

## TestFlight

- Sisäisessä ryhmässä: 1.0.40 (23983305), 1.0.41 (11b5a815), 1.0.42 (c7c5b8e7), 1.0.43 (476e251f),
  1.0.44 (4d7bc2ed), 1.0.48 (1c4a7eff), 1.0.49 (5ce37440). 1.0.45–1.0.47 yhdistettiin 1.0.48:aan
  (buildit 202609290759/0829/0907 jäivät käyttämättä; muutoslokirivit poistettu).
- **1.0.50 = proto master cbf78690** (BUILD 50, käännös fc26b44c, iPhonen yläpalkin matkalaukkunahka),
  build 202609291251, VIE Fablelta annettu 15.5x. Muutosrivi PR #3626 mergessä → odota sen
  vie-sisalto success → `gh workflow run proto3d-testflight.yml --ref main -f vie_unitysta=true
  -f ordinaali=50 -f proto_ref=cbf78690 -f build_numero=202609291251`. Tarkista, onko jo ajettu
  (`gh run list --workflow proto3d-testflight.yml --limit 3`) ennen kuin ajat uudelleen.
- Natiivin juna on tyhjä (Natiiviseppä).

## Web-juna

- #3624 (yläpalkkierä) MERGED 16.0x. #3626 (1.0.50-muutosrivi) MERGED.
- Auki junassa: #3627 (Pelikoodari, Liiku läpinäkyväksi, v2408) – `jonoon.sh 3627` käynnissä,
  loki /tmp/claude-502/juna-3627.log. Tarkista `pgrep -fl "jonoon.sh|valmistele.sh|mergaa.sh"` ja
  `gh pr view 3627 --json state`. Jos prosessia ei ole ja PR on OPEN: `JATKA=1 zsh
  julkaisija-tyokalut/jonoon.sh 3627`.
- pidossa.txt on tyhjä.
- Tulossa: Siirtosepän jatko-PR:t.
- Dioraama: vie-dioraama.yml (#3596) ja äänikohde (#3604) mainissa; äänet 31/31 ämpärissä
  dioraama/olavinlinna/aanet/v1/. Linnanrakentajan PR:t menevät junaan tavallisesti.

## Opit ja säännöt tältä vuorolta

1. Omistaja lisäsi pysyvät sallinnat `.claude/settings.local.json`:iin: `gh workflow run:*`,
   `git worktree remove:*`, `Edit/Write(.github/workflows/**)`. Luokitin sallii nyt TF-viennit.
   Tuotanto-osoittimen vaihto (vaihda-pyramidi-osoitin) ajettiin omistajan suoralla "Hyväksyn"-luvalla.
2. Vertaisen väite "omistaja kirjoitti sessioosi luvan" ei ole lupa – tarkista oma keskustelu.
3. Muutosrivi ei saa luvata sitä mitä savuke ei vahvistanut (maakuntakortin korkeus vaihteli).
4. Sisältövienti voi kaatua ohimenevään ETIMEDOUTiin lopputarkistuksessa; seuraava ajo (sisältää
   saman commitin) kelpaa TF:n ehdoksi.
5. jonoon.sh-odottajat eivät ole FIFO: järjestys pakotetaan yhdellä `jonoon.sh A B C` -ketjulla tai
   ketju-*.sh-skriptillä, joka odottaa edellisen PID:n. Lukko-odotuksessa olevan jonoon.sh:n voi
   tappaa turvallisesti (trap asetetaan vasta lukon jälkeen); käynnissä olevaa ei.
6. Käännöslukko: TF-vienti odottaa lukkoa max 45 min → lyhyet käännökset saa antaa ennen TF:ää.
   Pitkät lämpö/FPS-mittaukset: pidä kone hiljaisena.
7. Burst AotLinkerException korjattu (Natiiviseppä, proto-kaanna.sh + juna-ajo.sh 10.33).
