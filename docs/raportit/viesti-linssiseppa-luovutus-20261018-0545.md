# Linssisepän luovutus 18.10.2026 klo 05.45 (Postivahti: KOVA RAJA 38 %)

Edellinen: viesti-linssiseppa-luovutus-20261018-0050.md. TILINVAIHTO 18.10.: id:t /Users/Shared/Claude/osoitekirja.md
(PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, JU local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629, NS local_04e2850b-d63c-481d-be73-c7d784a7cbcb,
Postivahti local_63227b57-d045-4b93-ab52-cddc04e3b90f). Omistaja 02.03: kaikki samaan junaan 201 (ei 202).
Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia); ajot proto-3d/tyokalut/linssiseppa-ajot/.
Uusi worktree /Users/Shared/Claude/wt/proto-linssiseppa-pyramidi (nyt haaralla linssiseppa/museoveto-201).

## 1. TEHTY 05.48: MUSEOVETO-201 TODISTETTU (SIMU VAPAA kuitattu, PT:lle raportoitu)
- 48fb08601 (linssiseppa/museoveto-201, c9e35b5bf:n päällä): kartan UI (nostomerkkien nimet, matkakirja, yläpalkki) jäi museon
  alle poimittavaksi → veto/napautus niiden kohdalta ei kääntänyt katsetta (simu 02.47: Oostvaardersin nimi y 380 pt).
  Korjaus: UiKerros.PeittaaPisteen ylin kerros ensin + pysähtyy näkymään (NakymaLuokat dioraama/museo), MuseoTaulu
  mk-museo-nakyma PickingMode.Position. tarkista 0, Museo 169/169. SHA annettu NS:lle 05.4x (junaan 201).
- Käännös L2 557e0ff8, todistus proto-3d/lokit/todistus-museoveto201-iphone-20261018-05xx/katse.mp4 (pystyvedot y 380:sta).
  TULOS (todistus-museoveto201-iphone-20261018-0544/katse.mp4): vaaka 3/3, pysty 3/3 y 380:sta (oli 0/2), ~1:1, Exception 0.
  Painopisteanalyysi: ffmpeg fps=5 scale=201 gray rawvideo → kirkkaiden (>100) pikselien keskipiste per ruutu.

## 2. JUNASSA 201 (NS) TÄLLÄ VUOROLLA
- pyramidi-201 1f7fa6ce8 (tiivis varjo 0,2 × leveys, puhdas haara rungosta 26264022d): runko 73bca3b3a; PT ok bfc99a3d.
- Mona Lisa liike 916c98c86 (runko 4bd52aeef); kuvat 5730ab49 + bfc99a3d + kuva2 60c76c43 (m2/z2) PT:llä.
  HUOM PT:lle 02.1x: LR:n kehyskorjauksen jälkeen kehys vaalea hiekanbeige, ei kultaa (LR:n aluetta).
- museo-202 = 966b9f0cf (himmeänä napautus vain tuo napit, SyoteLukko.NapautusNielty MuseoEleetissä) + ba4dbabd0 (vapaa katse
  Street View 1:1: MuseoKierros.VetoAsteitaPisteelta/VapaaKatseAsteet, SeikkailuTapit.PikseliaPisteessa; ei −katse.x).
  Todisteet todistus-museoniele202c-…-0300/himmea.mp4, todistus-museokatse202c-…-0303/katse.mp4; PT kuittasi 04.3x, NS yhdistää.

## 3. AVOIMET
- Nimikyltin 1/60 s ennen mustaa (Kaanaan häät → Mona Lisa) ja kierroksen kääntö Johannes Kastaja → Kaanaan häät (nurkka + kaari
  ilman mustaa) → PT: myöhempään (ei uutta 201-käännöstä).
- Kaanaan häät m0: yläosa vaalea, alaosa musta (katsekorkeus/valo korkealle teokselle).
- KehysNapit.Osuma käy kerrokset alimmasta ylös (Juuret) – sama kerrosjärjestysasia kuin PeittaaMuu; ei korjattu (NUI:n tiedosto).
- Äänittäjän Louvre-puheet, Codexin #361 sn1 (ennallaan, ks. edellinen luovutus).
- Skenaariot: sali avataan `linssi museo lahestyminen nappi` + Louvren klassikot + Siirry näyttelyyn ENNEN `museo vapaa`
  (muuten napautus osuu näyttelylistaan). Himmeä/näkyvä-testissä toinen napautus < 5 s ensimmäisestä.
- Väliaikaiset: proto-3d/_tyo/linssiseppa/{monalisa,museoniele,museo202,museoveto201}-app (≤ 2 uusinta, vanhat pois varmistuksen jälkeen).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä luovutus. Kohta 1 on tehty; jatka PT:n uusista tehtävistä ja kohdan 3 avoimista. Viestit send_message id:llä osoitekirjasta; PT:lle ≤ 3 riviä.
