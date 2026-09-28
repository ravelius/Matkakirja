# Linssiseppä 2:n luovutus 28.9.2026 klo 22.2x (nollaus, konteksti 70 %)

Rooli: Linssiseppä 2 (Opus, high), Päätoimittaja (local_8d8ebf72…) johtaa. Checkout /Users/Shared/Claude/Matkakirja-linssiseppa-2,
oma simulaattori **linssiseppa2-iPhone F2D9B022-CBC4-41CD-85E2-E30CCA5D6446** (iPhone 17 Pro, iOS 27). Laite- ja käännösvuorot
Julkaisijalta ("NYT", "laite NYT"; ilmoita "käännös valmis" ja "sammutettu"). Käännökset `nice -n 15`, ei taskpolicy -b.
Skriptit scratchpadissa S = /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa-2/8e74262f-165d-4279-9d93-701effda9a78/scratchpad
(ajo-*.sh, koosta_vuosi.py, ketju*.sh; laitevuoron lupa = tiedosto $S/laite-nyt, jota ajo odottaa).

## 1. KESKEN: ISS-kyydin säätimet (omistajan tilaus TF 1.0.39 -kaappauksesta)

Haara proto **linssiseppa2/kyyti-saatimet 071a71fc** (pohja natiiviseppa/juna-1040 9c974fd8, jossa Linssiseppä 1:n terävät pilvet),
worktree /Users/Shared/Claude/wt/proto-linssiseppa2-saatimet. Linssit-testit 397/397, unity-tarkistus 0. EI VIELÄ LAITTEELLA.
- **Oma sijainti**: "Lennä kohteen ylle" -listan kärjessä "Oma sijainti · <maa>". Maa Cloudflaren
  https://media.matkakirja.app/cdn-cgi/trace -rivistä `loc=` (IP, ei lupakyselyä), varalla laitteen alueasetus; paikka maan nimen
  keskipiste MaatAineistosta (LinssiOhjain.MaatAineisto). Ydin/Iss/OmaSijainti.cs, Unity/OmaSijaintiHaku.cs,
  AstronauttiLinssi.LennaPaikkaan. Kaupunkitarkkuus vaatisi Pöllö-workeriin cf.city-päätteen (Pelikoodari) — ei tehty.
- **Pilvet-säädin** selkeä … nyt: alfan kynnys heti näytteen jälkeen (Pilvet.shader `_Karsinta` + Yokuori sama kynnys, Linssiseppä 1:n
  neuvo), AstronauttiKerros.PilvienMaara. **Vuodenaika-säädin** 1–12 = KuukausiPakotettu. Molemmat nollautuvat kaukonäkymässä.
- **Siirtymä ≤ 5 s** (omistaja): Simukello KelausMinS 1,5 / KelausMaxS 3,6 + kääntyminen 1,2 s ≤ 4,8 s, Palaa LIVE ≤ 3 s,
  SiirtymaMaxS 5; AstronauttiLinssi.ViimeisinSiirtymaS, komento `astro kyyti siirtyma`. 48 h:n kelaus nyt ~90 000× — katso
  videolta, näyttääkö maan pyöriminen sekavalta (jos näyttää, harkitse himmennystä kelauksen keskellä y.Peite:llä).
- **Vaihdettava nahka**: UI/Linssit/IssOhjaus.cs (osat paneeli, liukusäädin, segmentti, valikkorivi, lukema, sulku; Asu-nahka:
  USS mk-issohjaus__osa + mk-issnahka--nimi, valinnaiset 9-slice-kuvat). Nahka "perus" = nykyinen tyyli. Codexin elementtisarja
  tilattu (posti/fable-codex-iss-saatopaneeli-20260928.md, 292279232): kun tulee, uusi Asu kuvilla ja koko ISS-ohjaus (nopeusporras,
  valikko, tietorivi, säätimet) puetaan IssOhjaus-osiin (porras ja valikko ovat vielä Linssiseppä 1:n vanhaa koodia IssKyytiNakymassa).
- Testikomennot: `astro kyyti pilvimaara <0–1>`, `astro kyyti sijainti [ISO2]`, `astro kyyti kuukausi m<kk>|a<alfa>`, `astro kyyti siirtyma`.
- **Käynnissä nollaushetkellä**: käännös `saatimet2` jonossa (proto-kaanna.sh, lukko juna/b13 klo 21.27 alkaen) ja ketju
  $S/ketju5.sh odottaa käännöstä + $S/laite-nyt → ajaa $S/ajo-saatimet2.sh (pilvet 1|0,4|0, kk 1|7 seuranta+ikkuna, oma sijainti
  videolla siirtyma-raw.mp4 + siirtymän mittaus FI ja SE; kuvat proto-3d/lokit/linssiseppa2-laite-20260928-saatimet2/).
  Tarkista `cat $S/ketju5.out`; kun "käännös valmis", pyydä Julkaisijalta laitevuoro ja `touch $S/laite-nyt`.
- Sen jälkeen: kuvapari Päätoimittajalle (kulma + SHA kuvaan, pisin siirtymä kirjattuna), sitten merge-pyyntö Natiivisepälle.
  Linssiseppä 1:n linssiseppa/cupola-horisontti 9c6c2d69 muuttaa samoja tiedostoja, mutta merge-tree: ei ristiriitoja.
- Webin vastine Siirtosepän ISS-realismin kautta (anna arvot: kynnyskaava, 1,5–3,6 s, trace-maa).

## 2. VALMIIT (1.0.38 / BUILD 38)

- **Maapallon vuosi** natiivissa (hiomassa, vain kehittäjätila): proto linssiseppa2/maapallon-vuosi abc65317 + natiivi-ui/maapallon-vuosi
  (paneeli) → BUILD 38 (master 77ff5f6e). Omistaja: "näyttää hyvältä". EI rekisteririviä webiin/C#-Oletusrekisteriin ennen valmista
  (Päätoimittaja: hiomassa + manner null = pelaajan kynnyspalkkio 500 £).
- **Thessalia/NDVI-läiskä** (Laitetestaajan BUILD 38 -savuke): ei dataa vaan maakuntakartan nostohehku kuoren päällä; Natiivi-UI
  korjasi (natiivi-ui/maakunta-linssi aa203879, todennettu laitteella, merge-pyynnössä).
- **ISS-realismi 4a + 4c**: proto linssiseppa2/kyydin-taivas 3b7b5c62 → 1.0.38-juna. BMNG-kuukausipinta reliefin päällä alfa 0,75;
  tähdet näkyviin (juurisyy: Graphics.DrawMesh ei piirry pallokamerassa + float4x4 SRP-batcherissa nollana → GameObject-piirtäjät ja
  _KiertoX/Y/Z). Web Siirtosepällä aa27340b8. Kuu näkyi Laitetestaajan savukkeessa.

## 3. AVOIMET

- BMNG-kuukausi 12 puuttuu ämpäristä (julisteet/pallo/bmng/12/) → joulukuussa kyyti näyttää reliefin.
- Worktreet: vain /Users/Shared/Claude/wt/proto-linssiseppa2-saatimet (poista mergen jälkeen `git -C …/Matkakirja-proto worktree remove`).

## 4. OPIT

- Natiivissa uudet kerrokset GameObject-piirtäjinä, matriisit Properties-vektoreina; kameran tausta beginCameraRendering-kutsussa
  (Aurinko.cs kirjoittaa sen joka kehys, Camera.main voi olla null elävän kerroksen tilassa). Muistio natiivi-drawmesh-srp-matriisi.md.
- Ajoskripti lukee .app-polun lähdetessä: käynnistä ajo vasta käännöksen jälkeen (ketju-skriptit odottavat app:-riviä).
- Kuvaparit: scratchpadin koosta_vuosi.py (web | natiivi, rajaus pallon mukaan).
