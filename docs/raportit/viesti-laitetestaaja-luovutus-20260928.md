# Laitetestaajan luovutus 28.9.2026 klo 22.2x (nollaus, Päätoimittajan pyynnöstä)

Haara laitetestaaja-savukierros-b13. Omat simulaattorit: iPhone 18 Pro 1572C658-6455-4E55-8C05-3F88CB3C32F6
ja iPad 3B4CDACB-CCBE-42EC-809D-FB4D0B43CC7D — **molemmat Shutdown**, ei booted-laitteita minulla.

## Tehdyt kierrokset tänään (raportit docs/raportit/)
- BUILD 34 kohdat 4–5: savukierros-build34-kohdat45-20260928.md (PASS; kohta 4 ei todennettavissa).
- Pulu-realtime: savukierros-pulu-realtime-20260928.md (0cd85ecc FAIL → 1.0.36-juna PASS).
- BUILD 37 ISS-kyyti + Pulu: savukierros-build37-iss-pulu-20260928.md (PASS).
- 1.0.38-juna: savukierros-build38-vuosi-maakunta-nopeutus-20260928.md (PASS + NDVI-läiskä).
- 1.0.39-juna: savukierros-1039-puhe-hanta-20260928.md (**EI PASS**: nostokortin lukijan kaiutin- ja
  valikkoikoni sulkevat koko kortin; Pulun vaikeneminen chatin sulkiessa PASS; maan loitonnus ei todennettu).
- **1.0.39 on TF:ssä** (BUILD 39 leikattiin tuloksesta huolimatta, Natiiviseppä tiesi löydöksen; Natiivi-UI:n korjaus kesken).

## Avoinna / seuraavaksi
1. **1.0.40-juna**: juna/b13 = b3001497 (1.0.40 + aloituslento v3f4). Vahti kirjasi "odotetaan niputusta"
   21.05 ja KÄÄNNETTY **1ad1c538** 22.18 — mutta asennus vain simulaattoreille C1D5E34C ja 993F8873
   (EI minun 1572C658/3B4CDACB), ja 22.20 ajastin: `VIKA unity-sim … Burst … native link step failed`
   (tulokset/sim.log). Selvitä Natiivisepältä mikä SHA on testattava ja asennetaanko omiini
   (`git merge-base --is-ancestor` ensin). Älä bootaa ennen Julkaisijan "LAITE NYT" -vuoroa.
2. Savukelista 1.0.40: kaupungin 3D-erikoismalli kartalla (esim. Colosseum); Maapallon vuosi -linssi
   maakuntakartan jälkeen (Thessalia-vuoto: maakuntakorostus ei saa näkyä linssin läpi — korjaus
   Natiivi-UI aa203879, **varmista**; kuva docs/raportit/kuvat/vuosi-ndvi-thessalia-koe-20260928.png);
   ISS-kyyti pilvet + Cupola-lasi/pöly; Uusi matka → Valitse aloituskaupunki → Ateena: 15 s lento
   päättyy saapumiseen ilman poikkeuksia, päivä vaihtuu korkealla heti alussa, kone kallistuu
   ohituksessa kameraan päin. Nostokortin lukijabugia ei testata uudelleen ennen kuin Natiivi-UI ilmoittaa korjauksesta.
3. Thessalia-tarkistus Linssiseppä 2:lle: syy = maakuntakartan korostus (`Karttaselite.Nollaa()` ei tyhjennä
   kun `MaakuntaKartta`), ei NDVI-data. Vahvista uudessa buildissa: linssi `maapallon-vuosi` maakuntakartta
   päällä, `napauta 0.30 0.60` (Thessalia) ennen linssiä.
4. Maan loitonnuskatto: ei debug-komentoa, pinch ei simuloitavissa → pysyy "ei todennettu" jos kukaan ei lisää komentoa.

## Pulu/chat/puhe -testit: kehittäjätila
Tuotantopalvelin rajaa 30 pyyntöä/IP/vrk (raja täyttyi kerran). Aja kaikki Pulu/chat/puhe-pyynnöt
kehittäjätilassa: lue `POLLO_KEHITTAJAKOODI` lähteestä `~/.matkakirja-avaimet-koodaus.zsh`, kirjoita
`printf '%s' "$POLLO_KEHITTAJAKOODI" > <app-Documents>/kehittaja-koodi.txt`, sitten
`echo "kehittaja koodi" > peli-komento.txt`, tarkista `kehittaja tila` ("pöllön koodi on").
Koodia ei koskaan raporttiin/lokiin/viestiin. Kierroksella enintään yksi lyhyt nosto + yksi Pulun kysymys.
`ui pulu sano` ei kutsu Puhe.Lue:ta — oikea reitti `ui chat aani` + `ui chat <kysymys>` + `puhe palat`.
Pulu realtime: `pulu realtime paalle|pois|tila`, eristetty kanava `pulu realtime kanava …`.

## Työtavat muistiin
- Simulaattorivuoro tulee Julkaisijalta; enintään 1 booted Mac-laajuisesti päivällä; sammutus vain UDID:llä,
  ei `shutdown all`/erase. Raskas työ `nice -n 15`; GPU-lippu → `tools/gpu-vapaa.sh`.
- Napautuskoordinaatit `ui puu`:sta (device-pointit 402×874), ei kuvakaappauksen pikseleistä.
  Karttanapautus: `napauta x y` (murtoluku, origo vasen alas) osuu joskus hiljaa ohi — valitse maan sisäpiste.
- `linssi pois` sulkee linssin. Yksi `ui nosto` per tila (toinen kutsu togglaa). ≤10 s sleepit.
- Debug.Log-rivit: `log stream --predicate 'process == "Matkakirja3D"'` + grep tunniste.
- 32 untracked `tools/.natiivi-ui-b10-*.mjs` -tiedostoa jätetään committaamatta.
- Agentit vain Opus/Sonnet. Fablelle vain valmis erä/jumi/kysymys (≤8 riviä); tulokset Julkaisijalle + Natiiviseppälle.
- Levy: ~40 GiB vapautettu tänään (sovellus poistettu omista simeistä, PRBPosterExtensionDataStore poistettu).
