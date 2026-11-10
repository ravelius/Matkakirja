# Natiivi-UI: luovutus 10.11.2026 klo 09.21 (kontekstivahti; korvaa -20261110-0627:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870.
Natiivirepo /Users/Shared/Claude/proto-3d/Matkakirja-proto (remote natiivi-backup), oma worktree /Users/Shared/Claude/wt/proto-nui-hetki
(vapaa, haara natiivi-ui/valikko-napit-luettavat 038bbc716). Tarkistus `sh Linssit-testit/unity-tarkistus.sh`.
Skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/, lokit /Users/Shared/Claude/proto-3d/lokit/. Mac-esikatselu vain JU:n vuorolla (pyyntö JU:lle).

## 1. TEHTY (kaikki PT:n kuittaamia, JU vie junaan 224; ÄLÄ TOISTA)
- Aarteen 3D-tähti a89741baa (natiivi-ui/aarre-tahti-3d = NS:n kiertopiste f8cb3ac61 + 2): UI-tähti pois; PiirrosKerros.Tahdet.cs
  PiirraTahdet3D = kameraan kääntyvä taulu merkin pisteessä (NostotKartalla.JulkaiseTahdet3D antaa nimet + lat/lon), ZTest LessEqual
  (PiirrosKerros.shader _ZTest, oletus Always), piirtyy vasta kun 72/72 + hehku; ruudut ladataan kaupungin alueella korkeudesta riippumatta
  (tahtiLatausAlueella). Valkoinen neliö oli UI:n tuhottu hehkukuva (VapautaVenePala Destroy nousussa). Mac lokit/nui-aarre-tahti-3d-1-mac-a89741baa
  (arkki-a89741baa.png). PT kuittasi 06.5x.
- Lyhyt versio 14877fa07 JUNASSA 224 (34810a575): MATKAKIRJA_LYHYT → StreamingAssets/lyhyt.txt → ☰ "v224.N · aika", Mitä uutta/matkalaukku
  "Versio 224.N", Tietoja "Sovellus 224.N". AVOIN: JU:n iPad-☰-kuva linkistä 224.7 katsomatta → katso, kun JU lähettää.
- Kytkinrivit 038bbc716 (natiivi-ui/valikko-napit-luettavat): pois-tilassa nimi + kuvake täysi muste, tila oikealla vaimeampi, päällä lihavoitu.
  Mac lokit/nui-kytkinrivit-1-mac-038bbc716 (pari-kytkinrivit-038bbc716.png). PT kuittasi 07.0x.

## 2. LEVYSIIRTO (PT 06.5x)
NAS /Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/natiivi-ui/worktreet-20261110: VALMIS 08.2x: 8 worktreeta (nui-luovutus-0155/-0250/-2205, proto-nui-aarretahti/-nostopalkki/-revontulet/-talolataus/
-tulivuori; kaikki puhtaita ja pushattuja) rsync + diff täsmäsi → git worktree remove. Levy 59 Gi vapaana. Rivi PT:lle lähetetty.
Vertailu ilman NAS:n ._-metatiedostoja (SMB luo ne). proto-nui-hetki jää (aktiivinen).

## TYÖLISTA ON JONO (omistaja 07.40, PT): T=/Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py
`python3 -I $T seuraava NUI` (nyt + seuraavat); valmis: `python3 -I $T tehty "OTSIKKO" "mitä, sha, kuvat"` → seuraava nousee, ALOITA HETI;
este: `python3 -I $T este "OTSIKKO" "syy"`. Jono 07.4x: NYT kohta 3, sitten kohta 4 (Museon latausilmaisin), sitten [603] Pallolennon alanapit
heti näkyviin; odottaa: iPhone vaakatilassa valikko vierii (omistaja 06.34 Ei nyt).
LISÄKSI (PT 09.1x, omistaja 09.19, Tekninen kunto): "Kerronnan tauko pysäyttää kierron, jatko jatkaa" – kerronnan tauko pysäyttää
orbit-kierron, play jatkaa sitä itsestään; Mac-pari PT:lle. Tarkista `seuraava NUI`, missä kohtaa jonoa se on.

## 3. NYT (PT 07.3x, Kaupungit-kärki) — ALOITTAMATTA
"Kaikki klikattavat paikat avautuvat esittelynä": Pariisin ja Lontoon kartalla jokainen klikattava merkki (kohdenostot, kyltit, piirroksen
tähdet/leikkeet, mallikyltit) avaa esittelyn, ei tyhjiä/kuolleita napautuksia. 1) Listaa puuttuvat (ui kohdenostot -rivit + napautusreitit:
NostotKartalla.PiirrosNapautus, PiirrosKerros.Napautettavat, ui nahtavyysesittely napauta <nimi>), 2) korjaa UI-puoli, 3) Mac-kuvat PT:lle
(JU:n vuoro). Oma haara juna 224:n kärjen päälle. Sisällön puutteet (ei tekstiä/kuvaa) rivinä PT:lle, ei itse.

## 4. LISÄTYÖ (PT 07.4x, NS:n museo palvelimelle 91bc37c4b) — ALOITTAMATTA
Latausilmaisin museon avaukseen: arvo MuseoSovitin.KuvaOdotus 0–1 (odotus ≤ 60 s) → tyylin mukainen edistyminen, ei tyhjää ruutua.
Oma haara 91bc37c4b:n päälle, Mac-kuva PT:lle. Kohdan 3 jälkeen tai rinnalla oman harkinnan mukaan.
