# Natiivi-UI:n luovutus 28.9.2026 (ae), NOLLAUS klo 22.1x

Jatkaa luovutusta (ac). Päätoimittaja (ent. Fable) = local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. Proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto. Oma worktree: /Users/Shared/Claude/wt/proto-natiivi-ui-pulupuhe (haaroja
vaihdeltu siinä; nyt natiivi-ui/kortti-napautus, puhdas). Skriptit: proto-3d/lokit/natiivi-ui-1035/skriptit/ (k.sh,
mkkartta.sh, mk2.sh, mklinssi.sh, loitonnus.sh, puhe-korjaus.sh, luenta-hyppy.sh, ekapala.sh). Valmiit .appit: proto-3d/_valmiit/.
SIMULAATTORI FB234D08 SAMMUTETTU 22.1x (ei booted). Käännöslukko vapaa. Laite- ja käännösvuorot Julkaisijalta ("NYT").

## KESKEN 1 (KÄRKI): nostokortin lukijabugi → 1.0.40 (Laitetestaajan 1.0.39-savuke EI PASS)
Haara natiivi-ui/kortti-napautus 5c046835 (juna/b13:n päällä). Toisto FB234D08: `ui nosto skandaali:shakkiturkkilainen`
→ oikea napautus LISÄÄ (201, 417) → napautus kaiutin (365, 97). Vika: kortti sulkeutuu, luenta ei käynnisty.
- 942f37bf: napautuksen kohde päätetään painalluksen alussa (EleAlkoi → alkuValitsee). KORJASI LISÄÄ-sulun (todennettu).
- e2cb61e4: "mk-lukija" Kosketusnappi.Laajennettaviin (44 pt osuma). EI RIITTÄNYT.
- Mittarit: 3297624f sulkupolut ("MATKAKIRJA ui nostokortti: sulku …"), 5c046835 painallus (kohde, lukijan worldBound,
  näkyvyys, isä, indeksi kortissa vs sisus, panel.Pick). KÄÄNTÄMÄTTÄ.
- Havainto: sulku tulee NapautusKorttiin-polusta, ClickEvent-kohde = kortti (mk-nosto) kohdassa (365, 97), vaikka
  `ui napauta 365 97` (panel.Pick) osuu napplin "mk-lukija--kortti". Ilman LISÄÄ-vaihetta (`ui nosto … lisaa`) kaiutin ja
  valikko toimivat. Seuraava askel: käännä 5c046835 (+ maakuntatila-2 samaan), toista, lue painallusrivi → korjaa
  (epäilys: LISÄÄ/Vaihe2:n jälkeen lukija ei ole poimittavissa oikealle kosketukselle, esim. järjestys sisus-vs-lukija tai
  asemointi vasta seuraavassa ruudussa). Poista mittaririvit ennen merge-pyyntöä. Merge-pyyntö Natiivisepälle 1.0.40:aan.

## KESKEN 2: maakuntatila v2 (omistaja 20.3x) → natiivi-ui/maakuntatila-2 b8b6edc9, KÄÄNTÄMÄTTÄ
Rajat näkyviin tilassa (MaaKartta.TilaRajat: ei z6-tiheysrajaa, ≥ 1,4 pt, peitto ≥ 0,8), saman maakunnan uusi napautus
poistuu tilasta (Karttaselite.MaakuntaNapautus → Sulje), kuvausruutu kytkinnapin alle (ruutu peitti kytkimen: omistajan
"ei nappia poistua"). Todenna skriptillä mk2.sh ennen (8848ebe3) / jälkeen; kuvapari kulma+SHA kuvaan Päätoimittajalle,
sitten merge-pyyntö Natiivisepälle.

## KESKEN 3: mallien nimiöt v2 → natiivi-ui/mallin-nimiot 9ff0e9d6 (Linssisepän symbolit-3d-luonnollinen päällä)
Linssisepän cl16: OK Vasaloppet/Falun/Vimmerby/Birka. VIKA Visby: oma laatikko haetaan geometrisesti → Spillingsin kätkö
nappaa Visbyn siirretyn mallin laatikon. Linssisepän hyväksymä korjaus: Symbolimallit.Kalusteet.cs ylikuormitus
LisaaKalusteet(List<Ruutulaatikko>, List<string> avaimet) (avain = t.Erikois ?? p.Key kuten ErikoismallinAlla
ELaatikko.Avain), ja NostotKartalla.Sovita valitsee oma = laatikko jonka avain == m.Id. Tarkista myös, ettei
ErikoismallinAlla piilota noston omaa pistettä omassa laatikossaan. Krumlov: loki "kohde:cesky-krumlov#2 yla näkyy" mutta
nimiötä ei kuvassa → tutki. Linssiseppä ajaa laitekuvat (cl-sarja), kun sanot.

## MERGETTY / JUNASSA
- 1.0.38: pulu-virkevirta + ekapala + ElevenLabs-yhteensopivuus, lukijan valikko, välkyntä, pelikello (+ varaus), Geysir,
  Maapallon vuosi -paneeli, maakuntakartta (maakunta-yksi 0daf557e).
- 1.0.39 (BUILD 39 e4c624a9): puhe-hanta 29b1a83a (hyppy + Pulun pysäytys, todennettu), maan-loitonnus 48ec93dd
  (vain Kartta-testit; laitekuvaa ei saatu, simulaattorissa maailmatila päällä → todennus TF:llä).
- 1.0.40-juna: maakunta-linssi aa203879 (vuosi-linssin hehku maakuntakartan jälkeen, todennettu).

## OPIT
- Pulu-chatin päiväraja 30/IP täyttyi (myös simulaattorin kysymykset kuluttavat). Mac-skripteihin x-pollo-kehittaja
  POLLO_KEHITTAJAKOODI-muuttujasta; simulaattoriin Documents/kehittaja-koodi.txt + peli-komento `kehittaja koodi`.
- Linssikomennot Documents/linssi-komento.txt (esim. `elava saapuminen <kaupunki>`, `linssi maapallon-vuosi`).
- `ui aloita <kaupunki>` ei saavu lähtölistan ulkopuolelle; `peli matka X mannerlento/peninkulma` ei toiminut.
- Oma jonossa oleva käännös voi alkaa toisen hiljaisella vuorolla: jonota vasta NYT-viestin jälkeen.
- zsh: `git show "$B:polku"` sotkee (:A-muunnin) → `"${B}:polku"`. unity-tarkistus `sh`:lla. simctl --stdout absoluuttinen.
