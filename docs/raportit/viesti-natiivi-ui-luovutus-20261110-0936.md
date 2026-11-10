# Natiivi-UI: luovutus 10.11.2026 klo 09.36 (kontekstivahti 25 %; korvaa -20261110-0921:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870.
Natiivirepo /Users/Shared/Claude/proto-3d/Matkakirja-proto (remote natiivi-backup). Worktreet: /Users/Shared/Claude/wt/proto-nui-hetki
(haara natiivi-ui/klikattavat-esittelyt) ja /Users/Shared/Claude/wt/proto-nui-museo (haara natiivi-ui/museo-latausilmaisin). Tarkistus
`sh Linssit-testit/unity-tarkistus.sh` (0 virhettä molemmissa). Skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/, lokit
/Users/Shared/Claude/proto-3d/lokit/. Mac-esikatselu vain JU:n vuorolla.

## TYÖLISTA ON JONO: T=/Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py
`python3 -I $T seuraava NUI`; valmis `python3 -I $T tehty "OTSIKKO" "mitä, sha, kuvat"` → seuraava nousee, ALOITA HETI.
Jono 09.36: NYT "Kaikki klikattavat paikat avautuvat esittelynä" → [1] "Museon latausilmaisin" → [100] "Kerronnan tauko pysäyttää kierron,
jatko jatkaa" → [101] "Palaa näkymään -nappi kohteen jälkeen" (PT 09.2x, omistaja 09.22; järjestys asetettu 09.2x) → odottaa iPhone vaakatila.

## 1. NYT: KAIKKI KLIKATTAVAT ESITTELYNÄ — koodi valmis, JU:n Mac-ajo pyydetty 09.32
Haara natiivi-ui/klikattavat-esittelyt 3edc0a5e5 (= juna 224 3bbe27523 + b1270220d + 3edc0a5e5), NostotKartalla.cs + UiKomennot.cs:
- Reittikartoitus (koodista): merkki/karikatyyri/tähti → AvaaNosto → esittely (kohdenosto) tai kortti; malli/kyltti ja elävä nimi →
  esittely, jos Kohdenostot.Kohde löytää, muuten Tietokortit (striimattu); leikkeet → opas/lehti; merinimi → kortti.
  PUUTE OLI: kohdekaupungin TAVALLINEN nosto (ei kohdenosto) avasi kortin, koska AvaaNosto kutsui Napautus(kaikki=false).
- KORJAUS: AvaaNosto → Napautus(id, lat, lon, KaupunginNosto(...)): Pariisin/Lontoon kartalla (Kohdenostot.Kaupunki + Lahella, sama
  kaupunki) tavallinen nosto = kaikki-polku kuten nostovalikosta (palkki, kertoja, lento + kierto). Kaupunkimerkit, erikoiskortit, maan taso
  ennallaan. Viuhkan rivin nosto ilman omaa pistettä käyttää noston pistettä (ennen (0,0)).
- Testikomento `ui klikattavat` (reitti joka näkyvälle merkille, viuhkan riville, tähdelle, leikkeelle, mallille ja kyltille; KUOLLUT = ei
  avaa mitään) ja `ui klikattavat napauta <id|tavallinen>`.
- Skenaariot sk-klikattavat-1-pariisi-mac.txt ja sk-klikattavat-1-lontoo-mac.txt → lokit/nui-klikattavat-1-{pariisi,lontoo}-mac-3edc0a5e5.
SEURAAVAKSI kun JU lähettää polut: lue lokista `ui klikattavat` -rivit. KUOLLUT-rivit → korjaa UI-puoli; "kortti (ei kirjoitettua juttua)"
ja "tietokortti (ei kirjoitettua esittelyä)" = SISÄLLÖN PUUTE → listana PT:lle (ei itse). Katso kuvat b-1/b-2 (tavallinen nosto palkkina +
kierto). Sitten Mac-pari/kuvat PT:lle (≤ 3 riviä) ja `tehty`. Elävän kartan nimet (tietokortit) rajattu pois (handoverin listassa ei ollut).

## 2. MUSEON LATAUSILMAISIN — koodi valmis rinnalla, JU:n Mac-ajo pyydetty 09.36 (klikattavien jälkeen)
Haara natiivi-ui/museo-latausilmaisin 37eba712e (= NS 91bc37c4b + 7366c88cc + 37eba712e): uusi UI/Linssit/MuseoTaulu.Odotus.cs (+ .meta),
MuseoTaulu.cs (2 riviä), UiKomennot.cs. MuseoSovitin.KuvaOdotus != null → linnan nimiruudun pohja (mk-astroavaus) yläkerroksen alimmaksi:
museon nimi + maa (lahestyminen.json Resourcesista, Latauskuva.NimiJaMaa) + Latauspalkki (tumma teema); ohjausnapit piiloon, ☰ jää;
loppu: palkki täyteen, häivytys. Testikomento `ui museoodotus <0–1>|pois`. Skenaario sk-museo-ilmaisin-1-mac.txt (ämpäri ensin
vastaamaton http://127.0.0.1:9/iso → 60 s odotus, sitten NS:n museo-v1) → lokit/nui-museo-ilmaisin-1-mac-37eba712e.
Tarkista: i-1/i-2 nimi + palkki ja ☰ näkyvät (ei tyhjää taustaa), i-3/i-4 loki "latausilmaisin pois, päättyi". Kuvat PT:lle, `tehty`.

## 3. SEURAAVAT JONOSTA (aloittamatta)
- [100] Kerronnan tauko pysäyttää kierron (omistaja 09.19): esittelyn kerronnan tauko pysäyttää orbit-kierron, jatko jatkaa; Mac-pari PT:lle.
  Lähtökohta NahtavyysEsittely.Esittele (kierto: k.Kiertaa; kertoja KortinLukija) ja PalloKierto.
- [101] Palaa näkymään -nappi (omistaja 09.22): kohteen klikkauksen jälkeen nappi, joka vie pehmeästi takaisin paikkaan/zoomiin/kulmaan
  ennen klikkausta; vain kun peli itse siirsi kameran; teksti ja paikka UI-pohjista. Lähtökohta NostonLento (lähtönäkymä
  PalloKierto.NykyinenNakyma, paluu AjaMatka) — sama mekanismi kaupungin sisäiselle esittelylle. Mac-pari PT:lle.

## AVOIN EDELLISESTÄ
- Lyhyt versio 14877fa07: JU:n iPad-☰-kuva linkistä 224.7 katsomatta → katso, kun JU lähettää.
