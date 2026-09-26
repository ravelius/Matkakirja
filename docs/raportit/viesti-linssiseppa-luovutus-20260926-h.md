# Linssisepän luovutus 26.9.2026 myöhäisilta (h) — Linssiseppä (Opus, max) = myös Mallinseppä

*Sessio a00188e3, 26.9. klo 17.5x–23.0x. Edellinen: -g.md. Fable local_5df52e10-10e4-4b72-9554-0049db300dfe,
Natiiviseppä local_674b9ec4-e2f3-48e9-a810-a129f20a4f03. SendMessage-raja täyttyi → varakanava
mcp__ccd_session_mgmt__send_message session id:llä (vastaukset tulevat silti tähän sessioon).*

## Jono uudelle sessiolle (omistaja 22.3x, Fable)

1. **Kolme erikoismallia loppuun** (Mont-Saint-Michel, Stonehenge, Colosseum) → käännös Natiivisepän kautta → laitekuvat
   (3 kuvakulmaa isona + 10 s video, rajattuna) → rivi Fablelle → PYSÄHDY omistajan tarkastukseen.
2. **Meren koristeet: kokeilu** höyrylaiva + valas Norjan länsirannikolla (lista hyväksytty 22.3x).
3. **Lento v3 -speksi** docs/raportit/lento-v3-speksi.md (voi tehdä agentilla rinnalla; ks. alla).

## 1. Erikoismallit (Mallinsepän tehtävä: git show origin/mallinseppa-tyo-20260926:docs/raportit/viesti-mallinseppa-aloitus.md)

- **Koodi:** proto-git haara `mallinseppa/pohja` 9bb99488 (worktree /Users/Shared/Claude/wt/proto-mallinseppa), Natiivisepän
  rajapinnan `natiiviseppa/mallit-rajapinta` 0bb84d1f päällä. EI ylhaalta-175:n päällä (Natiiviseppä: ei junassa).
  - `Kartta/Erikoismallit/ErikoismalliApurit.cs`: paletti (Em*), Rakentajan lisämuodot Kerroskallio, Seina, Talo, Timantti,
    Kiekko, Rengas, Holvi, Laatta; AloitaOsa/LopetaOsa (= tyhjät osittaismetodit EmOsaAlku/EmOsaLoppu).
  - `MontSaintMichel.cs` 1 292 kolmiota (runko 1 044): kerroskallio, metsä luoteessa, muurit ja tornit, 26 taloa kierteisellä
    kadulla, luostarikruunu, La Merveille, torni ja patsas. Osat hiekka (kartio), vesi, vaahto, patsas, valot.
  - `Stonehenge.cs` 858 (runko 568): mittakaava 1,0 = 60 m (kehä 0,55). Osat nurmi, valli, lammas1–3, aurinko, sade, kuu.
  - `Colosseum.cs` 1 420 (runko 1 060): ehjä pohjoisseinä, sortunut etelä (sisärengas 2 kerrosta), holvikaaret, katsomo 3
    kaistaa + vomitoria, hypogeum. Osat velarium0–15 (skaala harjalta), parvi, valot.
  - Rekisteröinti `static readonly bool x = Rekisteroi("avain", new Erikoismalli { … })`, osat LiikkuvaOsaMaaritys.
- **Liikeydin** `Linssit/Ydin/Elava/ErikoisLiike.cs` (puhdas, testit ErikoisLiikeTestit 9, Linssit-testit 344/344): kolme
  kerrosta (perus, harvinainen ~1/10, reaktio lähellä < 60 km / tapahtuma) + yövalot (Valo 0–1, 1,5 s). Asennot osan nimellä.
- **Ajaja** `Linssit/Unity/ErikoismalliElavat.cs`: lukee Symbolimallit.LiikkuvatOsat/LiikkuvatVersio, enintään 3 liikkeellä
  (hystereesi 0,8), vähennetty liike/Staattinen, elävä kerros, löytö (PeliOhjain.NostoLoytyi) → tapahtuma, todellinen yö
  (Aurinko.AurinkoEcef, < −6°). Kytketty ElavaKartta.cs:ssä (ElavatElementit.Kytke-rivin jälkeen), komento
  `erikois tila | tapahtuma <avain>|kaikki | yo 0|1|auto | 0|1` (LinssiOhjain).
- **Odottaa Natiiviseppää** (viestit lähetetty 22.4x–22.5x):
  1. käännös `mallinseppa/pohja` 9bb99488 simulaattoriin linssiseppa-iPhone D0D2CD1E (tai .app-polku);
  2. yhdistelmähaara rajapinta + ylhaalta-175 (menevät ristiin Symbolimallit.cs/Tasot23.cs) → rebase mallit sen päälle,
     jotta omistaja näkee ääriviivan ja perspektiivin; siihen 2 riviä: `partial void EmOsaAlku() => Alku(); partial void
     EmOsaLoppu() => Loppu();`;
  3. koko: esitys "erikoismalli 1,5 × kategoriasymboli" (~60 pt) vs rajapinta ≤ 40 pt → kerroin Erikoismalli-luokkaan?
  4. kortin JOKAISEN avauksen tapahtuma (napautus → tapahtuma); nyt vain ensilöytö.
- **Toimitus** (rajapinta §4): lopuksi mallikohtaiset haarat `mallinseppa/<avain>` (sama ErikoismalliApurit.cs kaikissa,
  identtinen → mergeytyy) ja ajaja+ydin omaan haaraan (esim. `linssiseppa/erikoiselavat`), merge-pyyntö Natiivisepälle:
  SHA, kolmiot, kehyshinta, kuvat `proto-3d/lokit/mallinseppa-<avain>/`.
- **Esikatselu ilman Unityä** `proto-3d/lokit/mallinseppa-esikatselu/`: `./kaanna.sh` (stub + ylhaalta-175:n Rakentaja +
  Erikoismallit, dump verkot/), `python3 msm.py|sh.py|co.py` (kolme kulmaa kuvat/), `./kaanna.sh liike <avain> <s> <tapahtuma s>`
  + `python3 video.py <avain> <kansio>` (10 s video liikeytimen asennoista). Vanhat MontSaintMichel-*-kuvat ovat vanhentuneita.
  Viimeisimmät videot: scratchpad a00188e3/scratchpad/mallit/video-msm.mp4, video-sh.mp4, video-co.mp4.
- Speksit: docs/raportit/erikoismalli-speksi-pohja.md (kohta 0 ELÄMÄNIDEA) ja docs/raportit/erikoismallit/*.md.

## 2. Elävät elementit — hyväksytty 22.3x, merge-pyyntö lähetetty

- `linssiseppa/hoyrylaiva` b59c99b0 → Natiiviseppä 1.0.27-juna (viesti 22.5x): gondolit, maailmanpyörä, Thamesin höyrylaiva
  (kartan oma joki, CC0-polku), liioiteltu perspektiivi (dce8c373 + .meta f8628ac2; KallistaVainRoottori laivalle).
  Tarkista, että se meni junaan.

## 3. Meren koristeet — lista hyväksytty 22.3x, kokeilu jonossa

- Lista: docs/raportit/meren-koristeanimaatiot-20260926.md (10 lajia, elämänideat, valintasääntö, ≤ 2 näkyvissä).
- Data: `kartta/merikohdat.json` tuotannossa (Karttaseppä #3352, Siirtoseppä v187: 29 maata, 129 kohtaa; muoto
  { meret, maat: { ISO3: { meret, kohdat: [{ meri, lon, lat, suunta, rannastaKm }] } } }). Kokeiluun NOR atlantti 4.113, 61.013,
  suunta 265. Karttakuva /Users/Shared/Claude/pyramidi-poltto/kuvat/merikohdat-eurooppa-20260926.png.
- Kokeilu: höyrylaiva (ElavatElementit HoyryGeometria.Laiva uudelleenkäyttö, merireitti mallin avaruudessa) + valas
  (selkä, suihku, pyrstö). Kuvasarja + lyhyt video.

## 4. Lento v3 -speksi (omistaja 22.2x, Fable) — kirjoitetaan docs/raportit/lento-v3-speksi.md ennen koodia

Retro-kaksitaso matalalla; kartta lennon aikana pergamentti (ei satelliittia); ei alun feidiä/verhoa; kamera alkaa
lähikuvasta ja liukuu kauemmas mutta pysyy matalalla; Ateena: Afrikan rannikolta pohjoiseen Välimeren yli; 15 s; vanha
lento kytkimen taakse. Speksiin: aikajana 0–15 s kamerakehyksin (etäisyys, korkeus, pitch, fov), koneen reitti/nopeus/
korkeus, kartan tyyli + utu + valo, koneen malli (PD-viitekuvat, ~1 500 kolmiota, potkuri, siipien kallistus, pakokaasu,
EI MONOTONIAA, moottorin humina), tekniikka Natiivisepälle (esilatauskäytävä Z6–Z8, alku kun käytävä ≥ 96 %,
kehysbudjetti), hyväksymiskriteerit (15 s video kylmänä ilman aukkoja + kuvasarja), A/B vanhaan. Rivi Fablelle → kortti.
Pohjaksi: LennonAikajana.cs, löydös 172 (KaarenPaino, NokanKulma), proto-3d/lokit/kamerakasikirjoitus-lento-20260924.md.

## Muuta

- Perspektiivikäyrä dce8c373 on yhteinen: Natiiviseppä käyttää lipussa (lippu-176) ja symbolimalleissa.
- Nostojen animaatio peruttu (omistaja 21.5x): `linssiseppa/arkkityyppi-liike` 71cf5c6d jää käyttämättä.
- Worktreet: /Users/Shared/Claude/wt/proto-linssiseppa (linssiseppa/hoyrylaiva), /Users/Shared/Claude/wt/proto-mallinseppa
  (mallinseppa/pohja). Mergetyt haarat siivotaan hyväksynnän jälkeen.
- Käännökset: kaanna-heti.sh (odottaa junan käännöstä ja lukkoa) scratchpadissa a00188e3/scratchpad/; ajo-*.sh samassa.
