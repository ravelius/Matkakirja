# Natiivi-UI:n luovutus 23.9.2026 (ilta)

Rooli: Natiivi-UI (Opus). Natiivin Unity-pelin (Unity 6.3 + Cesium, iOS) koko käyttöliittymä
UI Toolkitilla verkkopelin ilmeellä. Aloitusviesti Fablelta: CLAUDE.md (Työtilat), Raamatun
Ydinajatus kohta 2 ja "NATIIVI PELI ETUSIJALLE", `/Users/Shared/Claude/proto-3d/TYOTAPA.md`,
`/Users/Shared/Claude/proto-3d/RAJAPINTA.md` (yhteinen) ja proto-gitin `Assets/Matkakirja/RAJAPINTA.md`.

## Missä mikäkin on

| Asia | Polku |
|---|---|
| Proto-git (Natiiviseppä mergeää masteriin) | `/Users/Shared/Claude/proto-3d/Matkakirja-proto` |
| Oma worktree | `/Users/Shared/Claude/wt/proto-natiivi-ui` (haara vaihtelee, viimeksi `natiivi-ui/traileri`) |
| Linssien worktree (agentin) | `/Users/Shared/Claude/wt/proto-natiivi-ui-linssit` (`natiivi-ui/linssit`) — poista mergen jälkeen `git worktree remove` |
| UI-koodi | `Assets/Matkakirja/UI/` (Assembly-CSharp, ei asmdefiä, koska Pelikoodarin näkymärajapinnat ovat Assembly-CSharpissa) |
| Alikansiot | `UI/Pulu/` (pulu, kuplat, chat, matkakirjakortti, luentakuvat, traileri, fokusvirrat), `UI/Livia/` (piirtorigi), `UI/Linssit/` |
| Tyylit | `UI/Resources/MatkakirjaUI/Matkakirja.tss` → `Matkakirja.uss`, `Kysymys.uss`, `Kartta.uss`, `Pulu.uss`, `Linssit.uss` |
| Testikomennot ja kuvasarjat | `UI-testit/README.md` (Documents/ui-komento.txt → `kuva nimi` → Documents/ui-nimi.png) |
| Käännöstarkistus | `./Peli-testit/unity-tarkistus.sh` (Pelikoodarin; kääntää kaikki asmdefit + UI:n; tavoite 0 virhettä) |

Editori ja Library ovat vain Natiivisepällä: .metat syntyvät hänen editorissaan, ei käsin.
Simulaattori/iPad-kuvat ottaa Laitetestaaja (kontaktiarkit `docs/raportit/kaappaukset/natiivi-ui-*`, PR #2946).

## Arkkitehtuuri lyhyesti

- `UiKerros`: PanelSettings (pohja `Resources/MatkakirjaUI/Paneeli.asset`, Natiivisepän Rakennus luo;
  tuo UI-shaderit iOS-käännökseen) + UIDocument per kerros: 15 tilarivi/kartan kalusteet,
  20 matkavalinta/kaupunkikortti, 30 pelidialogit, 35 pulu, 40 valikot, 45 traileri. Turva-alue
  (`Turva`, `Reunat`, `TurvaMuuttui`), `PeittaaPisteen` → `SyoteLukko.LisaaPeitto`, `JokaRuutu`,
  `PaaSaikeessa` (taustasäikeiden kutsut).
- `UiNakymat`: kokoaa kaiken ja asettaa Pelikoodarin tehtaat `PeliNakymat.*` (Tilarivi,
  MatkaValinta, Kysymys, KaupunkiKortti, Saapumistraileri) BeforeSceneLoadissa; tilaa
  `PeliOhjain.KaytossaMuuttui`, `LivianTilanne`, `LuentoAlkoi/LuentoLoppui`, lehden `Avautui`.
- Fontit iOS:n järjestelmästä (`Kirjasimet`: American Typewriter = UI, Iowan Old Style = luku,
  Snell Roundhand = käsiala; EB Garamond vain vara) — Fablen kuittaama, kirjattu RAJAPINTA.md:hen.
- Kuvat ämpäristä webin peilinimisäännöllä (`Kuvat.Turvanimi/PeiliKuvaPolku`, tarkistettu
  9547/9547 media.jsonia vasten), laitevälimuisti persistentDataPath/kuvat; äänet `Aanet`
  (kanavat Puhe/Kertoja/Tehoste, pulun äänikirjasto manifestin tunnuksilla).
- Sisältö: `UiSisalto` (kaupungit, kaupunkilehdet, julisteet, lippumaat, maat, saapumispuheet)
  ja `Fokusvirrat` — valinnaiset kokoelmat `Sisalto.HaeTeksti(…, valinnainen: true)`.
  Tuotannon paketti on v3 (skeema 1.1): lippumaat/maat/karttavalot puuttuvat vielä → kartuscha
  näyttää vain nimen, karttaselitteen laskurit tyhjiä, kunnes Siirtosepän nippu 4 on ämpärissä.

## Erät

| Erä | Sisältö | Tila |
|---|---|---|
| 1 | yläpalkki + tilapilleri + ilmoitus, hampurilainen (äänet, pieni liike, uusi peli, tekijätiedot), ratas (5 äänentasoa + offline-osio → Natiivisepän `IOfflineLataus`), matkavalinta + noppanappi | masterissa |
| 2 | kaupunkikortti (`IKaupunkiKortti`), korvaa NimiKortin pelin aikana | masterissa |
| 3 | kysymysnäkymä kaikille lajeille + pulmaluonnokset, kohtaaminen, tulosvaiheet, löydön kuva/nimi/fakta | masterissa |
| 4 | kartuscha (maapaneeli → `LueMaalehti`), karttaselite (`IKarttaValot`, Natiivisepän AiheValot) | masterissa |
| 5 | pulu/Livia (rigi, käyttäytyminen, kuplat, äänet), luennat (matkakirjakortti, luentakuvapakka, Ohita, suurennos, Livian kommentti), tekijätiedot (Copernicus) | masterissa |
| chat | pulun keskustelu (`PuluChat`): tervehdys, mietinnät, ehdotukset/jatkot, 429, paikka → kamera + Palaa, ääni | masterissa (957f732). Worker antaa natiiville vielä 403 "Natiiville vain puhe" — Fable päätti avata, Pelikoodari muuttaa workerin (PR #2956 jatko). Siihen asti paneeli näyttää selittävän rivin. |
| traileri | saapumistraileri `PeliNakymat.Saapumistraileri` (Pelikoodarin c909e9a) | merge-pyyntö 10 Natiivisepällä: `natiivi-ui/traileri` @ f160300 (Pelikoodarin haara ensin) |
| linssit | valitsin, peite, selite, astronautti, vertailu, maatiedot, keksinnöt, ihmisen matka | merge-pyyntö 11: `natiivi-ui/linssit` @ 9b1d035 |

## Avoimet asiat

1. Linssit: Keksinnöt/Ihmisen matka -sovittimet luetaan heijastuksella (`LinssiUi.LinssiOlio`) —
   pyydetty Linssiseppää julkistamaan; Ihmisen matkan esittelylaatikko vaatii, ettei esitys ala
   itsestään Avaa-kutsussa; vertailukäyrät puuttuvat (ei dataa); minipulun kysymyskortti voi nyt
   käyttää chatia (`UiNakymat.Hae().Chat.Kysy`).
2. Chat: ei striimausta (ei-striimaava pyyntö), ei sanelua (vaatisi iOS-liitännäisen), paikkamerkki
   kartalla puuttuu (vain kameralento + "← Palaa"; merkki olisi Natiivisepän kerros).
3. Pulu: webin puhe-eleiden cuet (livianpuhe-kokoelma) ja gestuurifoley (PCM-synteesi) puuttuvat;
   PuluCam-kuvien lento korttiin on yksinkertaistettu häivytykseksi.
4. Kuvasarjat: traileri, chat ja linssit odottavat Laitetestaajan simiajoa (README:n sarjat).
5. Linssiseppä kertoi myös vertailu-/maatietolinssin koukuista (toteutettu linssi-erässä).

## Viestintä

Fablelle vain valmis erä / jumi / kysymys (≤ 8 riviä). Natiiviseppä: merge-pyynnöt yhdellä
rivillä + editoritoimet. Pelikoodari: rajapinnat (NakymaSopimukset, PeliOhjaimen tapahtumat),
Pelikoodari tekee rajapintalisäykset itse pyynnöstä. Siirtoseppä: sisältökokoelmat.
Laitetestaaja: kuvasarjat (`kuva`-komento odottaa nyt 0,3 s, joten sarjoissa ei tarvita odota-rivejä).
