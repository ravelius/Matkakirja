# Linnanrakentajan luovutus 29.9.2026 ilta (-d): Olavinlinna UUDELLA TAVALLA (Blender + fotogrammetria)

Rooli: **Linnanrakentaja (Opus, max)**, Poikkileikkaus-linssi (id `poikkileikkaus`, moottori dioraama, hiomassa).
Päätoimittaja johtaa (tilinvaihdon jälkeen session nimi "Päätoimittaja (Opus, xhigh)"; vertaisille viesti NIMELLÄ,
ListAgents). Edellinen luovutus: `viesti-linnanrakentaja-luovutus-20260929-c.md`.

## Tehty tänään klo 17 jälkeen

- **Keittiö BUILD 51:ssä** (proto master f3d7b408): PEILI=pois-ajo löysi äänet 404 → korjaus d2f827eb
  (`DioraamaSovitin.AaniUrl` rakennuksen juuresta, ei hash-kansiosta), todennettu iPhonella (25 klippiä, 0 × 404).
- **Omistaja 29.9. ilta (Päätoimittajan kautta):** haluaa nähdä erä 3:n linssissä laitekuvina ENNEN ääniä.
  Pelikoodarin äänitilaus (`linnanrakentaja-tilaus-aanet-era3-20260929.md`, 22 tehostetta + 21 puhetta) on PIDOSSA.
  Äänet tehdään GH-työnkuluilla suoraan ämpäriin (`dioraama/olavinlinna/aanet/v1/`), kestot Pelikoodarilta viestinä.
- **Sisältökirjuri:** asettelu + 7 tilan faktat (`/Users/Shared/Claude/Matkakirja-sisaltokirjuri/docs/raportit/
  sisaltokirjuri-olavinlinna-era3-20260929.md`, haara sisalto-pelikatalogi-20260927). Faktat ovat tilojen tauluissa.

## Erä 3: tila

**Pelin repo** worktree `/Users/Shared/Claude/wt/linnanrakentaja-linna-3`, haara `linnanrakentaja-linna-3` (EI pushattu vielä):
- 963eca125 runko (tilat omiin tiedostoihin `js/dioraama/rakennukset/olavinlinna/<id>.js`, kiertue, speksi
  `docs/raportit/dioraama-rajapinnat-era3-20260929.md`).
- 7ce8458af vaihe 1: reseptit-linna.mjs (kiekko, kierreportaat, sakarat, paalu, laiturikansi, vene, lippu, rako,
  kupoli), reseptit-kalusteet2.mjs (19), 10 henkilöä + hahmot3d-laajennus, uusi massa (Kellotorni luoteessa ja
  Kirkkotorni auki), tihennyksen kaistalesääntö (keskushallin lattia 187 k → 3 k, keittiö 39 k → 28 k),
  esikatselu-kuvat.mjs `--tila --yleis --nopea --paketti`.
- 3ca4ed58f `ulkona`-lippu (laituri, muurinharja), df14242d7 kamera.js `kiertoRajat`.
- **Tila-agentit (Sonnet) täyttävät 7 tilaa** (laituri, vartiotupa, fatabuuri, kierreportaat, muurinharja,
  kappeli, keskushalli); ohje `…/scratchpad/agentit/YHTEINEN.md`. Kukin kirjoittaa vain oman tiedostonsa.
- Testit: dioraama 265+/0, koko sarja 4990/0 (ennen tila-agentteja).

**Proto** worktree `/Users/Shared/Claude/wt/proto-linnanrakentaja-linna3` (siirretty keittiö-worktreestä),
haara `linnanrakentaja/linna-3` = f5877128 (74e0cd0e + master f3d7b408), natiivi-backupissa:
- Kiertue (Rakennus.Kiertue, Ohjaaja.SeuraavaKiertueella, napautus käsikirjoituksen lopussa → seuraava tila,
  taulun "Seuraavaksi: <tila> ›"), Tila.Ulkona, yleisnäkymän varjoetäisyys = kameran etäisyys + 90 m (iPhonen
  pystykamera 300 m karsi varjot), Linssivalitsin auki → ✕ ja dioraaman taulu/laput piiloon (Laitetestaajan
  löydökset savukierros 1051), Aanisoitin a/c (Natiivisepän katselmointi). Linssit-testit 443/443.
- **Käännösvuoro pyydetty Julkaisijalta** (jonossa 6.). Simulaattorivuoro pyydetään erikseen, kun tilat valmiit.

## Seuraavaksi

1. Tila-agenttien tulokset → kokoa, katselmoi (katselmointiagentti), rakenna `node tools/dioraama/rakenna.mjs
   olavinlinna` (oletus dist/dioraama/olavinlinna), testit, commit.
2. Käännös (Julkaisijan NYT) → simulaattoriajo `proto-3d/tyokalut/linnanrakentaja-ajot/ajo-linna.sh`
   (PEILI=file:///Users/Shared/Claude/wt/linnanrakentaja-linna-3/dist/dioraama/olavinlinna/, SHA, S=<scratch>,
   ensin iPhone 3AA8F853, sitten iPad F75C92E7 LAITE=ipad KIERTO=vaaka) → merkityt kuvat `$L/omistajalle/` →
   polku Päätoimittajalle (omistaja katsoo ennen ääniä).
3. Omistajan palaute → korjaukset → äänitilauksen vapautus (Pelikoodari) → PR pelin repoon (Julkaisijan juna) →
   merge-pyyntö Natiivisepälle (linnanrakentaja/linna-3).
4. Erä 3b: linna aukeaa (kannet), ympäristön elämä, puheäänet, Codexin uudet pinnat, liikkeet.

## SUUNNANMUUTOS 29.9. klo 19.2x (omistaja Päätoimittajan kautta) — LUE TÄMÄ ENSIN

- Linna tehdään VAIN natiiviin (ei web/three.js-pääputkea). Uusi tapa: ULKOKUORI = Senaatin fotogrammetria
  (CC BY 4.0, lähde `/Users/Shared/Claude/proto-3d/_lahteet/olavinlinna-senaatti/`, tekijämaininta tekijätietoihin),
  SISÄTILAT Blenderissä PBR:llä ja Cycles-leivotulla valolla, Unity: Siirtoseppä (haara siirtoseppa/linna-valo:
  leivottu varjostin, liekit+savu liekki:-tyhjistä, ikkunakeilat, kuoren lataus + laatutasot + kehittäjävalitsin).
- Laatutasot (omistaja 19.4x): HUIPPU 1,35 M + 4k (A17 Pro+, M-iPadit, ämpäristä), NORMAALI 400 k + 4k, KEVYT 150 k + 2k.
- Assetit: `/Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-blender/` (LUEMINUT.md): leivottu keittio.glb +
  valot/keittio(.jpg, -2k.jpg), ulkokuori_{huippu,normaali,kevyt}.glb.
- Skriptit pelin repossa `tools/dioraama/blender/` (haara linnanrakentaja-linna-3): leivo_tila.py (--renderoi,
  --leivo, --tarkista), ulkokuori.py, kuori_kuva.py. Ajo: `nice -n 15 /Applications/Blender.app/Contents/MacOS/Blender -b -P …`.
- Tekstuurit: Poly Haven CC0 (Päätoimittaja hyväksyi), `/Users/Shared/Claude/proto-3d/_lahteet/polyhaven/` + manifest.json.
- Kuvapari omistajalle: `docs/raportit/kuvat/linnanrakentaja-era3/kuvapari-nyt-vs-huippu.jpg` ja keittio-blender-leivottu.jpg.
- KUORMA: enintään 2 selain-/rakennus-/Blender-ajoa kerrallaan, nice 15; esikatselu Metal-GPU:lla; kevyt tila = tauko.
- Erä 3:n proseduraaliset 7 tilaa (cde916e74) jäävät varalle; speksit, faktat ja tekstit käytetään uudelleen.
- Äänitilaus PERUTTU (omistaja), uusi tilaus vasta kun omistaja on nähnyt linnan.

## Seuraavaksi (uusi tapa)
1. Sisätilojen TODELLISET paikat kuoren sisällä (yläkuva: päälinna lännessä, Kello- ja Kirkkotorni pohjoisessa,
   Eerikin tornin raunio keskellä; itäisin katettu torni = Kijlin torni 1604) + leikkausikkuna kuoreen (Unity-varjostin,
   speksi Siirtosepälle) → tilat uudelleen Blenderissä oikeaan paikkaan.
2. Siivoa kuoresta 2021-restauroinnin nosturi/telineet/kontit.
3. Laitekuvapari HUIPPU vs nykyinen, kun Siirtosepän kuori latautuu natiivissa.
