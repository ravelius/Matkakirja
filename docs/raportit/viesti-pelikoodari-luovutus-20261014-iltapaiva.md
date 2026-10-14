# Pelikoodarin luovutus 14.10.2026 iltapäivä (nollaus, PT: konteksti 53 %)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari, proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto
(haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, push remoteen natiivi-backup). Edellinen luovutus
viesti-pelikoodari-luovutus-20261014-paiva.md (sen kohdat 1–3 hoidettu tässä vuorossa).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti kokonaan.
- Osoitekirja /Users/Shared/Claude/osoitekirja.md: viestit AINA `send_message` session id:llä. PT = local_74630a27-8c1b-4ac3-9143-538efab8cbcd
  (≤ 3 riviä: mitä, sha, kuvan polku). Julkaisija local_22b29f10… (KÄÄNNÖS NYT / SIMU NYT, ilmoita LUKKO VAPAA ja SIMU VAPAA).
  NS local_bf20055b…, NUI local_33ba1387…, Valoseppä local_fc4fcc54…, SK local_256f6a15…, KS local_37708e68…, Äänittäjä local_846757a4….
- Simut ovat T7-laitesarjassa: `source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh` ennen `xcrun simctl` -komentoja (iOS Simulator
  -MCP ja tyokalut/linssiseppa-ajot/simkosketus EIVÄT näe sarjaa). Synteettinen napautus: `ui napauta x y` (pt, UI-osuma ensin) tai
  komento.txt `napauta fx fy` (osuus, origo vasen ala). Vaaka: `ui kierto vaaka` (kuvakaappaus tulee 90° kääntyneenä).
- Simuja käynnissä ≤ 2 (`xcrun simctl list devices booted` sarjan kanssa); oma simu sammuksiin ajon jälkeen.

## Tila: junaan 190 NS:lle annettu (PT kuittasi)
| haara (proto) | sha | sisältö |
|---|---|---|
| pelikoodari/alkulento-huntu-190 | 45748f3db | omistajan pyyntö 11.32: valinnassa ja alkulennolla ei huntua eikä Britannian korostettua rajaa (KarttaKerrokset.Alkulento, Varitaso, Maaraja, Aloitusnakyma); pelaaja + kehittäjä |
| pelikoodari/iss-valikko-juna-190 | 3c5adf35a | a00fd0507:n (cupola-pinta + suikale) päällä: ISS-kohdevalikko + NUI f0b81abcc, Pulun kohdekysymykset (astronaut-kysymykset.json, 236 kohdetta), lähin ohitus portaittain, Cupolan vino katse (IssKyyti.IkkunaKohteeseen), LCD valittu kohde, Valosepän yökorjaus bc6485eb8; ILMAN 98d4de0f3:a |
Kehityshaara pelikoodari/iss-kupoli-190 @ bba2fa723 (+ NUI f0b81abcc yhdistetty) sisältää lisäksi LS2:n kevyen pallon 98d4de0f3 (ei junaan).
Linssit-testit 1774/1774, tarkista.sh 0.

## KESKEN 1: Ateena-vika (omistaja 12.13 "peli ei antanut valita alkulentoa kuin ateenaan", iPad VAAKA, TF 189) — ETUSIJA
- EI TOISTUNUT: iPad 13 pysty + vaaka, iPhone pysty; testivalinta (`ui aloitus valinta`) ja OIKEA polku (Uusi matka → avaus → valinta:
  Pariisi aloitti pelin "uusi peli · Pariisi"). Kaikki renkaat UI:n ulkopuolella ("ei osumaa UI:ssa → pallolle"). Lista paketista oikein
  (lahtokohde = ateena, pariisi, tukholma; Sopimukset.Lahtokohteet). Löydökset: Pariisin nimi Lontoon nappulan alla ("…iisi"),
  iPhonella Tukholman nimi kellon alla.
- Arkit: proto-3d/lokit/pk-alkulento-20261014/valinta1-pelaaja, valinta2-iphone, valinta4-ipad-vaaka/arkki-ipad-vaaka.png.
- 12.5x: EI TOISTU myöskään pariteetti-iPad11-834 FB5EE657 vaaka (omistajan kuvasuhde) KEHITTÄJÄTILASSA oikealla polulla
  (Aloita seikkailu → avaus → Tukholma: "aloituslento Lontoo → tukholma"; arkki valinta5-ipad11-vaaka-keh/). PT:lle kerrottu → PT pyytää
  omistajalta kuvan valinnasta. Kokeilematta: "Uusi matka" vanhan TF 188 -tallennuksen päällä ja valinta kun edellinen peli kesken.
- AIEMPI SUUNNITELMA: pariteetti-iPad11-834 FB5EE657 vaaka (omistajan kuvasuhde), KEHITTÄJÄTILA, "Uusi matka" vanhan tallennuksen päällä
  ja valinta kun edellinen peli kesken. Skripti _tyo/pelikoodari/alkulento/ajo-valinta-laite.sh <UDID> <app> <ulos> [keh 0|1] [vaaka]
  (appikopio lokit/pk-kupoli-v2-20261014/app-pk-kupoli-bba2fa723/Matkakirja3D.app = master 189 + ISS); se pysähtyy valintaan, napauta
  itse ja `touch <ulos>/lopeta`. Oikea polku: relaunch, `ui napauta` Uusi matka -nappiin, napautus avaukseen, sitten renkaisiin.
  Jos ei toistu → rivi PT:lle, PT pyytää omistajalta kuvan.

## KESKEN 2: ISS-palaute 12.25 (docs/raportit/kaappaukset/omistaja-20261014/iss-palaute-1225.md Fablen checkoutissa), junaan 190
Haara pelikoodari/iss-palaute-190 (worktree wt/proto-pelikoodari-isspalaute) on luotu 3c5adf35a:n päälle, ei vielä committeja.
- 9) MAX Q -TÄRINÄ Pulun repliikissä: Pulun maxq-repliikki on raidalla 42,96–48,64 s (manifesti audio/raketti-aanet-v8.json), mutta
  Nousu.Tarina huipentuu MaxQT = 62 (≈ kertojan repliikki) ja Pulun lähikuvassa AsetaLahikuva (RakettiLaukaisu ~670) kääntää kameran
  Puluun joka kehys → tärinä katoaa juuri Pulun aikana. SUUNNITELMA: Nousu.MaxQHuippu (alku, loppu lentoajassa; RakettiLaukaisu
  PuheenAikataulu laskee LentoT(RaitaAika("maxq","pulu") − syt) ja loppu: true) + Nousu.TarinaOsuus(t) 0–1 (sytytys 0,6, Max Q 1, rampit
  25 %); ruututärinä AsetaLahikuva()-kutsun jälkeen (rivi ~625) kt.rotation *= Euler(osuus × ~1,5 % kuva-alasta, reaaliaikasini) ja raketin
  rungon värinä RakettiMalli.Aseta (pino.localRotation *= Euler(osuus × muutama aste)). Todiste: video Max Q -kohdasta ääni mukana.
- 7) KERTOJA LOPPUUN + JATKOKYSYMYS: Cupolan napautuskelaus katkaisee kertojan lauseen → kelaus odottaa lauseen loppuun (tai lause jatkuu
  kelauksen yli); kertomuksen lopussa SK:n repliikit /Users/Shared/Claude/proto-3d/_tyo/sisaltokirjuri/iss-loppu-20261014/iss-loppu.json
  (kysymys-a valinnan auetessa; vastaus-paikka ennen kohdevalikkoa; vastaus-ohjaus ennen ohjauksen alkua; äänet Äänittäjältä). Valinta-UI
  NUI:n pohjilla (kysy NUI:lta: "Toinen paikka" → IssKohdevalikko.Avaa, "Ohjaa itse alusta" → ?). Koodi: KupoliAanet/KupolinKelaus.
- 8) ÄÄNITASOT: kertoja liian hiljaa (varsinkin sytytys), moottori ducking puheen alle: Äänittäjän kanssa, RakettiAanet ducking 0,35/0,3 s,
  ääniportti (aaniportti.py).
- 4) AIKAJANA ja luvut NUI:lle: NUI teki jo natiivi-ui/iss-palaute-190 b35499f53 (Nousu.Osuus(t), nakyma.Aikajana(t) RakettiLaukaisussa);
  tarkista tarvitseeko lisää dataa (vaiheiden hetket aikaT/aikaR).
- NUI pyysi ISS:n alapisteen pienoispallolle: vastattu AstronauttiLinssi.AlusAlapiste() + oikea yläkulma ✕:n alla OK.

## KESKEN 3: KS:n 44 pääkaupungin esittelyt (ennallaan edellisestä luovutuksesta, kohta 4): odottaa KS:n haaraa
karttaseppa-paakaupungit-kohdekartat-loput (ei pushattu 12.50). Skriptit proto-3d/_tyo/pelikoodari/pk-kytkenta/esittelyt-20261014/.

## Opit
- Kohdevalikko: haku ottaa ENSIMMÄISEN ohituksen rajan sisältä → porrastus (reuna + 150/300 km). Pitkä objektiivi kauas (> 200 km) näytti
  vain alapisteen; Cupolan ikkunanäkymä katseella kohteeseen toimii 1 000+ km:iin (laatat piirtyvät).
- proto-kaanna.sh mergeää haaran masterin päälle: ristiriita = "VIKA merge" heti; yhdistä master haaraan ennen käännöspyyntöä.
- LCD:n rivi "A · B" jaetaan " · ":sta (IssOhjaamo).
- Levy: kuitatut ajot NAS:lle (Matkakirja-arkisto/lokit/<kansio>, manifestit), paikallisesti raakavideot pois; appikopioista vain tuoreet.

## Työtilat
Proto-worktreet: wt/proto-pelikoodari-kupoli (iss-kupoli-190), -valikkojuna (iss-valikko-juna-190), -alkulento (alkulento-huntu-190),
-isspalaute (iss-palaute-190, tyhjä), -telakointi, -laukaisu, -suikale, -cupolapinta (vanhoja; poista mergen jälkeen --poista-tyylisesti).
Simu pelikoodari-iPad13 39644E75 sammutettu. Lokit proto-3d/lokit/pk-kupoli-v2-20261014/, pk-alkulento-20261014/.
