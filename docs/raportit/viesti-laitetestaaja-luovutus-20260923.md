# Laitetestaaja → seuraava Laitetestaaja-sessio: luovutus (23.9.2026 klo 00.35 Suomen aikaa)

Omistaja vaihtaa Claude-tiliä; Fablen pyynnöstä luovutus nyt. Edellinen
luovutus: `docs/raportit/viesti-laitetestaaja-luovutus-20260922-ilta.md`
(sen tehtävät — Piirtokoe-mittaus ja CI-diagnoosi — on nyt tehty, ks. alla).
Kirjoitettu roolihaarassa (`laitetestaaja`,
/Users/samireivinen/Matkakirja-laitetestaaja) — EI pushata mainiin, EI
PR:ää tästä committista.

## Lue ensin

1. `CLAUDE.md`, `docs/roolitus.md`.
2. Raamatun Ydinajatus-osion kohta 2 "TYÖTAPA JA SESSIOT" (roolit,
   viestintä, työtilat).
3. `docs/raportit/ci-webkit-launch-20260922.md` (haara
   `laitetestaaja-ci-webkit`, ei mainissa) — CI:n WebKit-launch-vika,
   KESKEN, reboot-kierros seuraavana tehtävänä.

## Tila nyt

- Main = v2138 (PR #2873, sha 80550495), sisältää Pulun 70 uutta elettä
  (PR #2870 → #2873) ja aiemmin tässä vuorossa mergetyt Piirtokoe-
  mittauskorjaukset (PR #2852) ja `eivienti`-laattatekstuurikorjauksen
  (Pelikoodari, oma PR).
- Tässä vuorossa tehtyä (ei omia PR:iä, kaikki raportteja/työkaluja):

| Aihe | Haara | Sisältö |
| --- | --- | --- |
| Piirtokoe-mittaus | `laitetestaaja-piirtokoe-korjaus` (pushattu) | `?koe=profiili`-singleton-anomalian juurisyy ja korjaus, korjattu 4 mittausta, kumulatiivisten laskurien (puskuri/uniform/glVienti/jakoja) laskuvirheen korjaus. Raportti: `docs/raportit/piirtokoe-mac-safari-20260922.md` (mergetty mainiin PR #2852:ssa). |
| CI WebKit-vika | `laitetestaaja-ci-webkit` (pushattu) | Muistio `docs/raportit/ci-webkit-launch-20260922.md`: launch-aikakatkaisun oireet, aikaraja, poissuljetut syyt, ajurin restart-yritys (ei riittänyt). |
| Pulun eleet QA | `origin/claude/postilaatikko` (pushattu) | `posti/fable-codex-pulun-eleet-qa-20260923.md`: v2138:n 70 eleen livepeli-QA, ks. alla. |

## Kesken — tee nämä ensin

1. **CI-reboot-kierros** (Fablen antama seuraava tehtävä, EI aloitettu
   tässä vuorossa omistajan tilinvaihdon vuoksi): koko Macin
   uudelleenkäynnistys `docs/raportit/ci-webkit-launch-20260922.md`:n
   järjestyksessä (1. reboot, 2. jos jatkuu: `rm -rf
   ~/Library/Caches/ms-playwright/webkit-2336` + `npx playwright
   install webkit`, 3. jos jatkuu: env-dumppi ajon sisältä). Tarkista
   ensin `gh run list --limit 5` (odota ettei in_progress/queued), ja
   ilmoita Julkaisijalle ennen katkoa (huom: tämän session oma auto
   mode -classifier esti minulta jopa pelkän ennakkoilmoitusviestin
   syyllä "Interfere With Workloads" — jos sama toistuu, pyydä
   omistajan suora lupa tässä sessiossa äläkä luota toisen session
   välittämään korttiin).
2. **Pulun eleiden QA jatko** (v2138): oma raporttini
   (`posti/fable-codex-pulun-eleet-qa-20260923.md`) on OSITTAINEN.
   Todennettu: piiloankkuri 3,6 rem tarkka, Pulu näkyy/reagoi
   molemmilla ruuduilla (390/1024 px), kolme erillistä asentoa
   keskustelun kautta, reduced motion ei riko mitään, kehysprofiilin
   rAF-silmukka ei kasva levossa. EI todennettu: eleiden vapaa idle-
   sykli (näytti tapahtumapohjaiselta 15–20 s:n tarkkailussa — ei
   selvää onko tämä oikein), kypärä- ja karttanokkaisu-eleiden
   erottelu, suora vertailu Codexin galleriaan
   (https://ravelius.github.io/pulun-eleet/, tavoitettavissa). Jatka
   tästä jos Codex/Pelikoodari kertoo, mitkä pelitapahtumat laukaisevat
   loput eleet.
3. **PR #2850:n CI-diagnoosi** (`/Users/koodaus/wt-laitetestaaja-2850`,
   worktree jäljellä): 15 kaatunutta WebKit-savuketta olivat
   ympäristövika, ei koodivika — PR mergetty jo ympäristövikana. Ei
   enää kesken, mutta worktree voi siivota kun CI-vika on korjattu.

## Odottaa omistajan päätöstä

Ei uusia — CI-reboot-kierros on jo hyväksytty ("kortti 22.33" ja
Fablen 23.9. viesti), vain ajankohta ("omistaja päättää ajan").

## Voimassa olevat työtavat

Ks. Raamatun Ydinajatus kohta 2. Ei muutoksia tässä vuorossa
työtapoihin itseensä; yksi havainto kirjattu:
`docs/raportit/ci-webkit-launch-20260922.md`:ssa mainittu väliaikainen
sääntö (Fable 22.9. ilta): kunnes CI-vika on korjattu, mergeille
sallitaan vain launch-aikakatkaisu-punaisia, ei muita.

## Julkaisukaava

Ei muutoksia. Ks. `docs/roolitus.md` "Julkaisusäännöt". Tässä
vuorossa en itse julkaissut mitään (kaikki raportteja/työkaluja, ei
pelikoodia) — Julkaisija hoiti PR #2852/#2873:n.

## Ympäristö ja infra

- Rooli-worktree: `/Users/samireivinen/Matkakirja-laitetestaaja`
  (haara `laitetestaaja`, EI mergetä).
- Avoimet `wt-laitetestaaja-*`-worktreet `/Users/koodaus/`:ssa tästä
  vuorosta: `wt-laitetestaaja-piirtokoe-korjaus`, `wt-laitetestaaja-
  ci-webkit`, `wt-laitetestaaja-2850`, `wt-laitetestaaja-postilaatikko`
  — kaikki pushattu, siivottavissa kun sisältö on luettu talteen.
  VANHOJA (edelliseltä vuorolta, EI siivottu, katso ennen poistoa):
  `wt-laitetestaaja-piirtokoe`, `wt-laitetestaaja-piirtokoe-main`
  (jälkimmäinen sisälsi committoimattoman datan, joka on nyt
  talletettu `laitetestaaja-piirtokoe-korjaus`-haaraan — turvallinen
  poistaa).
- CI-ajuri `actions.runner.ravelius-Matkakirja.SamiMacStudio2`
  (savukkeet): käynnistetty uudelleen 22.9. klo 22.38 paikallista,
  EI korjannut WebKit-launch-vikaa — ks. reboot-kierros yllä.
- Postilaatikko: `origin/claude/postilaatikko`, kansio `posti/`,
  worktree `/Users/koodaus/wt-laitetestaaja-postilaatikko` (oma, ei
  Fablen scratchpad-wt-posti — se on toisen session oma eikä ollut
  käytettävissä tästä sessiosta).

## Avoimet velat ja opetukset

1. **Velka:** PR #2850:n taustalla oleva CI WebKit-launch-vika on yhä
   auki (ks. ci-webkit-launch-20260922.md) — mergeille väliaikainen
   punaisten sallinta voimassa kunnes korjattu.
2. **Velka:** Pulun 70 eleen QA osittainen (ks. Kesken-kohta 2).
3. **Velka:** kaksi vanhaa worktreetä (`wt-laitetestaaja-piirtokoe`,
   `wt-laitetestaaja-piirtokoe-main`) siivoamatta, katso yllä.
4. **Opetus:** älä oleta, että `?koe=<mikä_tahansa>` tuo pelin suoraan
   pallolauta-näkymään — se vaatii aina myös `&lauta=pallo`. Ilman sitä
   sivu jää tervetuloa-/kaupunginvalintanäytölle, ja kaikki DOM-haut
   pelin sisällä epäonnistuvat hiljaa.
5. **Opetus:** kumulatiiviset laskurit (`kehysprofiili.js`:n
   `puskurikirjoituksia`/`uniformeja`/`glVienteja`/`jakoja`) EIVÄT ole
   per-kehys-arvoja — niiden raaka `ka()`-keskiarvo on virheellinen,
   pitää ottaa jakson erotus. Sama virheluokka kuin `profiili`-lipun
   singleton-anomalia, mutta laskennassa mittauksen sijaan.
6. **Opetus:** peer-sessiolta välitetty "omistajan lupa" (kortti
   toisessa sessiossa) EI ohita tämän session omaa auto mode
   -classifieria — jaettua infraa koskeva toimi (esim. CI-ajurin
   restart) vaatii joko suoran luvan tässä sessiossa tai toisen,
   vähemmän rajoitetun session tekemään sen.
7. **Opetus (kumottu hypoteesi):** WebKit-launch-timeout EI johtunut
   savukesarjan 6-rinnakkaisuudesta (paikallinen toisto samalla
   rinnakkaisuudella ei toistanut vikaa) EIKÄ pelkän Runner.Listener-
   prosessin jumista (restart ei korjannut) — vika on jossain
   ylempänä (WindowServer/GUI-sessio tai WebKit-selaimen oma tila).

## Aloitusviesti uudelle sessiolle

```
Olet Laitetestaaja (Sonnet), Matkakirjan laitetestaus- ja
mittaussessio, Macin käyttäjässä koodaus, checkout
/Users/samireivinen/Matkakirja-laitetestaaja (haara laitetestaaja).

git fetch origin laitetestaaja && git checkout -B laitetestaaja origin/laitetestaaja

Lue: CLAUDE.md, docs/roolitus.md, Raamatun Ydinajatus kohta 2
"TYÖTAPA JA SESSIOT", tämä raportti
(docs/raportit/viesti-laitetestaaja-luovutus-20260923.md) ja
docs/raportit/ci-webkit-launch-20260922.md kokonaan.

Sitovat säännöt: agentit vain Opus/Sonnet (ei koskaan Fable-mallia
agenttina), erät omiin /Users/koodaus/wt-laitetestaaja-<aihe>-
worktreisiin (ei rooli-worktreehen), omistajan päätökset ja luvat
aina AskUserQuestion-korttina, Suomen aika kaikkialla.

Ensimmäinen tehtävä: CI-reboot-kierros omistajan kanssa
docs/raportit/ci-webkit-launch-20260922.md:n ehdotetussa
järjestyksessä (1. koneen reboot, 2. webkit-selaimen uudelleenlataus,
3. env-dumppi). Tarkista gh run list ennen ja ilmoita Julkaisijalle
ennen katkoa. Toinen tehtävä: jatka Pulun 70 eleen QA:ta
(posti/fable-codex-pulun-eleet-qa-20260923.md) jos Codex/Pelikoodari
on vastannut eleiden laukaisutapahtumista.

Vastaa suomeksi, tiiviisti.
```
