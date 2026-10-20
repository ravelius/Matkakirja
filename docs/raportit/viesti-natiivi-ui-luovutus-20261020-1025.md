# Natiivi-UI: luovutus 20.10.2026 klo 10.25 (Postivahti: kova raja 35 %)

Korvaa -0926:n (Opit -0350/-0530/-0615/-0926 yhä voimassa). Id:t /Users/Shared/Claude/osoitekirja.md. Simu VAIN JU:n SIMU NYT -viestistä.
Ajoskriptit /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/. Proto-worktree kaikelle museo/linssi-työlle:
/Users/Shared/Claude/wt/proto-natiivi-ui-museo-teoskortti-208 (nyt haarassa natiivi-ui/kertoja-napit-208, puhdas). Viikko 81 %: rajatut
mekaaniset palat Sonnet-agenteille (≤ 150 riviä), ei uusia raskaita agentteja kuorman ollessa korkea (PT 10.1x).

## ENSIN
1. MUSEO-YHD-SIMU oli käynnissä nollauksessa (alkoi 10.20, `ajo-museo-teoskortti-208.zsh`, app _tyo/natiivi-ui/museo-208-yhd-app = 4683355d5).
   Tulos: `cat lokit/natiivi-ui-ajot-208/ajo-museo-yhd.out` (iPhone + iPad TODISTUS-polut). Jos ajo katkesi, pyydä JU:lta SIMU NYT ja aja uudelleen.
   Sen jälkeen SIMU VAPAA JU:lle. Kuvat täysikokoisina: T0 (alarivi AUTO ZOOM ‹ ▷ › 🔈 T, nimi ☰:n rivissä valkoisena), T1 kortti,
   T2 tarkemmat ›, T3 Huomiokohdat, T4 Teosluettelo → nimilista, T5 kyltti, T6 tekstitys taulun alla (🔈 hiljaa), V1 Horatiusten vala,
   V2 Pyhiinvaellus Kytheraan (vaalea GG → tumma muste?). Lokista "museo: tekstin tausta L" → kynnys (TummaYli 0,36 / VaaleaAlle 0,28,
   MuseoTaulu.Tausta.cs) säädä tarvittaessa. Lähetä: KK + PT + VS (local_e675f86d, arvioi valon) + LS (local_7a457b99, tekee parit peli | oikea Louvre).
2. JUOKSUNIMET 208c (6f582ba92, haara natiivi-ui/juoksu-nimet-208, wt/proto-natiivi-ui-juoksu-nimet-208): KK OK sävylogiikalle, EI valmis:
   a) N1 Meridiaaniportin näyte otettiin latausruudusta (L 0,03 → vaalea): JuoksuPaikannimi.cs Nayte() — odota häivytyksen loppuun / ensimmäinen
   kunnollinen ruutu (esim. viive 0,5–1 s tai ruudun keskikirkkaus > 0,02) ennen kaappausta. b) Meridiaaniportti tulee jo ENSIMMÄISELLÄ
   `ui juoksupeli v4 777`:lla (sk-juoksu-nimet-208.txt rivi ~13) → kuvaa N1 sen jälkeen. c) N2 joki: loki tuli, mutta kuvassa ei nimeä
   (kuormassa kuva > 3,5 s myöhässä?) → kuvaa heti ilman odotusta tai pidennä NakyvissaS testissä. Uusinta → KK ennen 208:n lukitusta.
   KK OK → NS:lle junaan 208.
3. 🔈/T 9 LINSSIÄ: haara natiivi-ui/kertoja-napit-208 kärki 3e46745b8 (tarkista.sh ok), JU kääntää → _tyo/natiivi-ui/kertoja-napit-208-app.
   Tee skenaario ja aja: OMISTAJAN PYYNTÖ 09.52 "anna ruutukaappaukset kaikista linsseistä kun napit lisätty. ei tarvitse videota" →
   jokaisesta 9 linssistä stillit iPhone + iPad (napit näkyvissä, T päällä → tekstitys näkyy, 🔈 pois → himmeä) → KK (tekee kuva-arkin) + PT.
   Tap-kohdat ja lokit alla. Museo on jo museo-yhd-ajossa.

## MUSEO-YHD-SIMU 10.20 (iPhone valmis, iPad kesken nollauksessa)
- iPhone lokit/todistus-museo-teoskortti-jalkeen-iphone-20261020-1020: OK nimi → teoskortti, Huomiokohdat → ympyrät, Teosluettelo → kortti
  kiinni + nimilista auki, Horatiusten vala. PUUTE: (1) 'mk-museo-tarkemmat' ei ui-puussa (Vakalohko.Otsikkonappi.name — selvitä, näkyykö
  väkänen kortissa; T2-kuva). (2) SKENAARIOVIKA, korjattu (sk-museo-teoskortti-208.txt rivit 43–48): `ui museolista kiinni` jatkoi kierrosta
  Mona Lisalle → kyltti "teos ei ole esillä", alarivin napit ja GG-kävely kaatuivat ketjuna. Kyltin reitti itse toimii (loki "kyltti … napautettu").
  (3) Nimen sävy: L 0,28–0,38 Louvressa → kynnys 0,36/0,28 heilahtaa; omistaja haluaa Kallioluolan madonnan salissa VALKOISEN → nosta
  kynnys (esim. TummaYli 0,45 / VaaleaAlle 0,38) kuvien perusteella; L 0,000 = latausruutu (sama vika kuin juoksussa).
  Uusinta korjatulla skenaariolla (sama app museo-208-yhd-app) → KK + PT + VS + LS.

## TILA: haarat (proto)
- natiivi-ui/museo-teoskortti-208 672e17bdc… + 50b57e822: teoskortti (omistaja 09.38), alarivi ‹ ▷/⏸ › 🔈 T, Kuuntele pois, kirja vain käytävällä,
  ☰:n Tekstitys pois, tekstitys kehyksen alle ilman laatikkoa (sävy kirkkaudesta), nimi ☰:n riviin + valkoinen (09.58). Puhe.Soita(rytmissa) =
  kertoja hiljaa soi äänettömänä (Puhe.cs soiRytmissa).
- natiivi-ui/museo-teoskortti-kyltti-208 = + LS linssiseppa/louvre-kehykset-208 (kyltit, MuseoSovitin.TeosKorttiPyynto tilattu IKortti.cs:ssä).
- natiivi-ui/museo-208-yhd 4683355d5 = kyltti + VS linssiseppa2/louvre-valo-208 88d06bb45 + LS ff2de4619 (TODISTUSHAARA, ei junaan sellaisenaan).
- natiivi-ui/kertoja-napit-208 3e46745b8 = museo-teoskortti-208 + yhteiset osat + 9 linssiä (EI sisällä LS:n kylttejä eikä VS:n valoa).
  NS:lle junaan: kertoja-napit-208 + LS louvre-kehykset-208 + VS louvre-valo-208 (kyltin tilaus on kyltti-haaran commitissa 6d42e04ee → mukaan).
- Yhteiset osat (UI/Linssit): KertojanNapit.cs, Tekstityskaista.cs (virke-lähde tai KertojanTekstitys), KertojanTekstitys.cs (Puhe.SoivaUrl →
  ajat), MuseoTekstitys.MerkkiAjoista/Tasaisesti (+ testi MuseoTestit.KertojanTekstitysMuutLinssit). QA `ui tekstitys`.

## 🔈/T linsseittäin (agenttien raportit; simulla EI vielä ajettu)
- IM I, IM II, Kiina (AikajanaNakyma.cs): IM II ⏮ ▶/⏸ 🔈 T ⏭ (T korvaa CC), IM I ja Kiina kertojarivi Tauko-napin perään (mk-aikajana-kertojarivi);
  IM I kertomus vain T päällä (1. virke aina); Kiina rytmissä + Tekstityskaista (tarvitsee ajat-JSONiin teksti/sanat, loki "tekstitys N/19").
  Tapit mk-ihmisen-matka-aani/-tekstitys, mk-ihmisen-matka-2-…, mk-kiinan-dynastiat-…. AVOIN PT:lle: napit 40 pt tummat vs palkin 30/36 pt läpinäkyvät.
- Opas + pallokierros (OpasValikko.Kippi.cs, OpasSovitin.cs): tauolla ‹ ■ ▶ › 🔈 T, lennossa ⏸ 🔈 T (OpasNappi-pohja, pois = opacity 0,55 suoraan);
  kertoja volume 0 tahdissa; tekstitys Workerin merkki-ajoista ja pallon lauseajoista. Tapit mk-opas-aani/-tekstitys; `ui opasvalikko kippi tauko|lento`.
  AVOIN: iPhone pysty tauon rivi täynnä → 🔈 T vain jos mahtuu; vapaassa lennossa ja Kysyssä ei nappeja; Lontoo-pilotti ennallaan.
- Dioraama (LinnaValikko.cs, DioraamaTaulu.cs, DioraamaAanet.cs): ▶/⏸ 🔈 T ⏭ ☰; virke ajat-tekstitys → rakennus.json kohdistus → tasaisesti;
  äänitetyn repliikin vanha teksti piiloon (ei kahdesti). Tapit mk-dioraama-aani/-tekstitys. AVOIN PT:lle: SeikkailuRepliikit-pelirepliikit
  ilman tekstitystä (omistaja aiemmin: ei tekstiä pelin aikana?); 🔈+T pois = ei mitään; kaista voi osua huonekorttiin (simu).
- ISS (AstronautinNakyma.Kertoja.cs uusi, KupoliAanet, RakettiAanet, RakettiLaukaisu): ISS:ssä EI ☰:tä → ryhmä ▷/⏸ 🔈 T ✕:n riville oikeaan
  yläkulmaan (raketti ✕:n vasemmalle, Cupola ✕:n paikalle pallon ylle, EXTEND vasemmalle) → KERRO KK:lle poikkeama omistajan "☰:n vasemmalle".
  Tauko pysäyttää kertojan ja laukaisun kellon (ei lähtölaskennan 5 s:n aikana). Tekstitys raketti-ajat / <kansio>-ajat; kaista kuvan päällä
  (ei muuta tilaa). Tapit mk-iss-tauko/-aani/-tekstitys. Avaruuskävely: vain Pulun kupla T:n mukaan (PuluPuhuu oletus pois).
- Uudet .cs-tiedostot ilman .metaa (Unity luo): KertojanNapit, Tekstityskaista, KertojanTekstitys, AstronautinNakyma.Kertoja.

## Muut
- Web-PR #5027 (tyylikirja: KORTTI _vakanen + OHJAUSNAPPI kytkin pois-tila, PT OK): CI odottaa; vihreä → merge. Proton tyylikirjakopiota EI
  generoitu (proton kopiossa on webiin tulematon PYSÄYTYSKUVA; regen pudottaisi sen) → kerro PT:lle, kuka regeneroi.
- Worktree web: /Users/Shared/Claude/wt/natiivi-ui-tyylikirja-vakanen (poista mergen jälkeen `tools/uusi-worktree.sh --poista natiivi-ui-tyylikirja-vakanen`).
- -0926:n worktree- ja _tyo-siivouslistat yhä voimassa (+ museo-teoskortti-208-app, museo-208-yhd-app, juoksu-nimet-208c-app).

## Opit (uudet)
- Kyltin rajapinnan kaltaiset ristiriippuvuudet: tee erillinen yhdistelmähaara todistukseen, älä sido omaa junahaaraa toisen keskeneräiseen.
- ScreenCapture-näyte saapuessa voi osua latausruutuun (L ≈ 0) → odota ensimmäinen kunnollinen ruutu.
- Useimmat linssit eivät käytä Puhe-luokkaa (oma AudioSource) → kertoja hiljaa = volume 0, ei soiton ohitus; tekstitys linssin omasta kellosta.
