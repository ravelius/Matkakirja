# Julkaisijan luovutus 6.10.2026 klo 22.5x (viikko 99 %, tilinvaihto)

Kirjoittaja: Julkaisija (Opus 5.5, high). Juokseva loki: /Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt
(kaikki TF-, juna-, vienti- ja vuorotapahtumat). Pitolista: julkaisija-tyokalut/pidossa.txt.

Päätoimittajan session nimi on nyt **"PÄÄTOIMITTAJA (Opus, max)"** (isoilla, omistajan pyyntö).

## Junarytmi (omistaja 6.10. 17.4x)

Kiinteät VIE-ikkunat 12/20 poistuivat. Juna lähtee aina, kun kuitattua sisältöä on ja edellinen juna on TF:ssä
(yksi kerrallaan; käännös ja savu ainoa raja). Kaava: Natiiviseppä kokoaa rungon → KÄÄNNÖS NYT → savu (Laitetestaaja,
tulos luetaan **list_eventsillä** session local_36a45147-8407-4cfb-bbdb-c20d5f684735 istunnosta, ei odoteta viestiä) +
roolien todisteet → Päätoimittaja VIE → JUNAN AVAUS NYT Natiivisepälle → BUILD-SHA → TF.

## TestFlight

- 6.10. testaajilla: **150** (muistioikeus, 16.55), **151** (18.13), **152** (19.46), **153** (21.36), **154** (22.32).
- 154 = proto master 8878ab70 (juna/b13 286e8f34), käännös 787db464, muutosloki #4079.
- Kaikissa 150→ allekirjoituksessa `com.apple.developer.kernel.increased-memory-limit = 1` (tarkista TF-lokista grep).
- TF-kaava: muutosloki-PR (≤ 3 lausetta / 280 mrk; Päätoimittajan teksti; `node --test tests/vienti.test.mjs` väliaikaisessa
  worktreessä) → squash-merge → `gh workflow run proto3d-testflight.yml --ref main -f vie_unitysta=true -f versio=1.1
  -f ordinaali=N -f proto_ref=<master> -f build_numero=N -f sisainen_ryhma=false` → kun "Vie sisältöpaketti" (muutosloki-
  commitin SHA) on success → `testflight-sisainen.yml -f build_numero=N` → `testflight-ulkoinen.yml -f build_numero=N`.
  Muutosloki ENNEN TF:ää (muuten TF kaatuu "Muutoslokin rivi" -askeleeseen). Build-numero on aina kokonaisluku.
- TF odottaa lukkoa max 45 min. Sisäinen ryhmä voi odottaa ASC-käsittelyä ~30 min.

## Käännös- ja simujono (22.5x)

- **Lukossa: Natiiviseppä Mac v1** 62f6b368 (natiiviseppa/mac + BUILD 154, 22.47 →, 30–60 min). Pyysin setsid-irrotuksen.
  Mac-käännöksen rinnalla enintään 1 mykkä simu, ei muita käännöksiä.
- Jonossa Macin jälkeen: (1) **Natiivi-UI ylarivi-155 716744c9** (KIIREELLINEN, omistajan TF 154 iPad-vaaka) + mykkä 8 min;
  (2) **LS2 juna 155 koe** "linssiseppa2/gibs-pehmea+linssiseppa2/opas-vapaa-lataus" (640eb7b4 + 5683ffaf) + 20 min hiljainen
  (F2D9B022 olkapää A/B 6 kuvaa, 4CE6C737 vapaa tila +5 s); (3) LS2 gibs-pehmea 8f2db691 + 4 min Helsinki (voi yhdistää (2):een).
- Linssiseppä 1:n yövalot v4 (4c51ceea) ajossa 22.47 →, ~6 min.
- Säännöt: SIMU NYT → odota "simu vapaa" (älä päättele simun sammumisesta, roolit vaihtavat laitteita); yöllä 1 simu;
  hiljainen = ei käännöksiä eikä muita simuja; swap > 40 Gt tai levy < 40 Gi → ei uusia ajoja (Päätoimittaja 20.1x).
- Monitor-komento (re-arm 30 min välein): simut + lukko + levy + swap, ks. lokin malli.

## Levy ja muisti

- 42 Gi, swap 17 Gt. T7-simusiirto epäonnistui kahdesti (CoreSimulator ei näe laitteita symlinkin takaa); Päätoimittaja selvittää.
- Roolit tyhjensivät omat simunsa (erase) 19.0x → +60 Gt. Lupajärjestelmän estämät Siirtosepän tiedostot jäävät yösiivoukselle.

## Ämpäri (vie-paketti.sh, lue LAHTEET.md ensin)

- 6.10. viety: opas-nimet (431), opas-kuittaukset (73), opas-kuvat pilotti (99), kaupunki-yovalot (1554).
- **KESKEN 22.5x**: opas-kuvat-vienti-20261006b (1461; uusi lista opas/kuvat-v2/kuvat.json). Jos vienti katkesi appin
  sulkemiseen, aja uudelleen (ohittaa jo viedyt). **Vasta sen jälkeen** mergeä Pelikoodarin **#4080** (worker → kuvat-v2) ja
  pollo-karki. Muuten CDN välimuistittaa 404:n.
- vie-paketti EI ylikirjoita: samaan polkuun ei voi viedä uutta versiota (immutable-välimuisti) → uusi polku + worker-PR.

## Pöllö

- Julki 6.10.: #4049, #4054, #4055, #4058, #4060, #4063, #4062, #4064, #4067, #4068 (Workers Logs, Päätoimittajan kuittaus),
  #4071 (Sydney-koordinaatit), #4075 (kuvalista), #4076, #4077. Kärki 9d3acb3d.
- Merge: scratchpadin merge-sitkea3.sh (PR, 0) + pollo-karki.sh; ne katoavat session mukana — tee uudet tai mergeä käsin
  `gh pr merge N --squash --match-head-commit <head>` vihreänä ja `gh workflow run pollo-julkaisu.yml --ref main`.
- Kustannus- ja rajamuutokset Pöllöön vain Päätoimittajan suoralla kuittauksella.

## Avoimet

- **#4072** Päätoimittajan loki-PR: hän lisää haaraan; mergeä, kun hän sanoo valmis.
- **Muistioikeus**: ASC-API ei tue INCREASED_MEMORY_LIMITia (409); omistaja lisäsi sen portaalissa. testflight-muistioikeus.yml
  jäi repoon (kuiva-ajo näyttää tilan). Kehityskäännökset (.kehitys) ilman oikeutta (Natiiviseppä f3a48802).
- Omia worktreeitä ei ole jäljellä.
