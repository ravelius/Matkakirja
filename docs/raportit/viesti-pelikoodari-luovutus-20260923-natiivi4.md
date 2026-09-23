# Pelikoodarin luovutus 23.9.2026 ilta: natiivi, erä 4 (Fablen tarkastus)

Jatkaa luovutusta `viesti-pelikoodari-luovutus-20260923-natiivi3.md`. Lue ensin
`/Users/Shared/Claude/proto-3d/RAJAPINTA.md` (päivitetty tänään: laukku, aloitus, äänet, lehti, aarrepiste,
linssit, passi, radio) ja Fablen tarkastus `docs/raportit/natiivi-ajantasaisuus-20260923.md`
(haara claude/bold-ride-vow4ki).

## Masterissa (proto-git master d29971b)

| Erä | Commit | Sisältö |
|---|---|---|
| tallennus-v4, mannerlento, kuvat-liput | 1293297, 40f9702, cc43bee | versiopolku, UudempiTallennus; mannerlento matkavalinnassa; Kuvakokoelmat |
| laukku | 1e0cd2f | LaukkuNaytto, PeliOhjain.Laukku(), TilaMuuttui, julisteet voittojärjestyksessä |
| aloitus-voitto | 0b116cd | AloitusNakyma, Jatka/UusiMatka, Lahtokaupungit (19, web), KaikkiAarteetLoytyi |
| aanitapahtumat | 342f45f | PeliOhjain.Aani (webin sfx-tunnukset), LentoAani; vastaa-komento korjattu |
| rosvo-pois | 30507f7 | rosvolaatat + kaksintaistelu pois (kaanon 25.8.) |
| karsinta | f4b254c | A3 voitto+botti, C1 tapahtumakortit, A9 Paaaarre-nimet, C6 EnsimmainenKaupunki, C8 lontoo |
| nappula | 38f69d6 | B16: Natiivisepän Nappula Matkalla-tilaan (MatkanTulos.Polku) |
| lehti | 18a3dd8 | B1 ILehtiNakyma, B3 tehtävänappi (KysymysApu.TehtavaNappi) + Fokus.cs (aarrepiste), A6 Tutki pois, C7 = web (lehti aukeaa saapuessa) |
| linssikytkennat | bae87e4 | B8/B9/B14: Passi.cs, Linssiomistus.cs (Opus-agentin portti), tallennusversio 5, Linssirekisteri-kytkentä, radion koukut |
| aarrepiste + lehti-korjaus | 3e78f01, 4ecb66a | vihreä piste Karttapisteisiin (#4f9d3a); maalehden sulku → avauksen kaupunki; KaupunkiToiminnot.Tutki pois |

Fablen päätökset tänään: peninkulman passileima pysyvä (linssit auki), vapaa siirtyminen vain ansaitussa pelissä;
kynnyssääntö omistajan (1400: radio ja topografia); C7 webin mukaan; lähtökaupungit 19 (web).

## Kesken: B5 sähke / retkikunta / kaveriapu

- Haara `pelikoodari/sahke` @ eeff782 (WIP), worktree `/Users/Shared/Claude/wt/proto-pelikoodari-sahke`, pohjana bae87e4.
- Opus-agentti pysäytettiin tauolla kesken: Sahke.cs (1127 r.), SahkeYhteys.cs (UnityWebRequest-kuljetus KESKEN),
  Sahketehtava.cs, Kultaiset/tee-sahkejalki.mjs + sahkejalki.json, muutoksia KysymysApu.cs:ään ja NakymaSopimukset.cs:ään
  (ehdotettu sähkenäkymä). EI testattu: aja `cd Peli-testit && ./kaanna.sh` ja `./unity-tarkistus.sh`, katselmoi
  NakymaSopimukset-muutos (sovi Natiivi-UI:n kanssa), viimeistele SahkeYhteys, sitten PeliOhjain-kytkennät:
  kaveriapunappi kysymykseen (Kysely.Kaveriapu on jo portattu), virstanpylväät, retkikunnan tila, pöllön sähketehtävä
  (fokusvirrat.sahketehtava → Kaupat.AvaaAarreSahkeella). Lähde: web js/sahke.js, worker/sahke/kasittelija.js,
  tests/sahke-worker.test.mjs, tests/sahketehtava.test.mjs, js/fokusvirta.js (SÄHKETEHTÄVÄ).

## Web-repo

- #2968 vartija (tools/natiivi-kultaiset/, tests/natiivi-kultaiset.test.mjs) mergetty; #2979 korjasi #2976:n
  (tiivisti tyhjät pulma-arvonnat). **#2982 OPEN** (tapahtumat ja voitto pois, linssijälki mukaan; Julkaisija).
- Kun proton `Peli-testit/Kultaiset/tee-*.mjs` muuttuvat: kopioi ne `tools/natiivi-kultaiset/`:iin, `node
  tools/natiivi-kultaiset/vartija.mjs --paivita`, tarkista tiivisteet proton tiedostoja vasten (sed-polku `<js>`).
- #2955 (lehden silta) on vanhentunut, koska natiivilehti korvaa WKWebView-kuoren (A4); sulje, kun natiivilehti on masterissa.

## Seuraavaksi

1. B5 loppuun (yllä).
2. A4: LehtiKuori, MatkakirjaLehti.mm, LehtiOsoite, LehtiKuoriXcode ja web/lehti.json pois, kun Natiivi-UI:n
   natiivi-ui/lehti-kytkenta (d34ed16) on masterissa ja toimii laitteella (LehdenTeko-silta pois samalla).
3. KulttuurivisaTarjolla kytkeytyy, kun paketin skeema 1.13 tuo kulttuurivisan (Natiivi-UI asettaa).
4. Laatan napautus omassa kaupungissa avaa yhä kaupunkikortin; webissä laatasta pääsee laattakysymykseen
   (PeliOhjain.EtsiKatko) — sovi Natiivisepän/Natiivi-UI:n kanssa.
5. Arkistoitu: `/Users/Shared/Claude/natiivi-peli` → `/Users/Shared/Claude/_arkisto/natiivi-peli-608aa47` (A5).
   Proto-git on ainoa totuus.
