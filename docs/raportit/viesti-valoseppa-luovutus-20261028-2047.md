# Valosepän luovutus 28.10.2026 klo 20.47

Lue ensin tämä, sitten loki `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 28.10. 16.28 →).
Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`, haara **linssiseppa2/seinat-211**, kärki **055669bee** (natiivi-backup).
055669bee lisää vain k22:n (C#, ei varjostinmuutoksia) → METAL 8885a9f54:n 395/0 / PIPELINE 392/0 pätee.
Muut haarat ennallaan (esineet-metalli-213 f7fd394da, j4-pari 2855d8478).
Parit: `REF=<sha> MALLIT=file://<juuri>/ ESIKOM="<QA-rivit rivinvaihdoin>" zsh /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/editori-vs.sh 02 05 01`.
MAC-UUDELLEENKÄYNNISTYS: ei omia taustaajoja; keskeytynyt pari ajetaan samalla komennolla uudelleen.

## Linja (PT 20.2x)
VALO POIS ENSIN (omistaja 27.10. 10.56) on yhä voimassa. KK:n 18.57 "sitten valo" on jatkosuunnitelma, ei purku.
k22 jää oletuksena POIS; ei leivontaa eikä päällekytkentää ennen omistajan päätöstä (KK kysyy, kun LR:n katot ovat kiinni).

## Tehty 16.28–20.47
- **OMISTAJAN PÄÄTÖS 18.57 (KK):** kujien kivet OK (kivijalan sävy kivittäin ja lattia hyväksytty); katot irti/liian korkealla → LR.
- **Aurinko havainteiden 01/02/05 mukaan** (055669bee): `ValoKohteet.JuoksuK22AurinkoKorkeus/Atsimuutti` 45°/318°
  (pohja-AZ 40 / EL 45), `Valopohja.JuoksuK22` = false, QA `valo k22 0|1` (vaatii k20:n; myös taivaan kierto).
  Peruste: havainteessa varjot kohti kameraa ja vasemmalle, itään katsova (vasen) muuri kirkkaampi (05: 222 vs 155,
  02: 191 vs 165). 27.10. 11.00:n ehdotus 345/30 oli väärällä puolella. Pari 194251 (k22 1): 05 vasen 181 vs oikea 155.
  Kehys varmistettu: QA `aurinko 30 88` valaisee oikean muurin → pohja-AZ = kompassi, kamera pohjoiseen, a = −2,03 − AZ.
  LR:lle leivontaan sama pohja-AZ 40 / EL 45 – VASTA omistajan päätöksen jälkeen.
- **LÖYDÖS: editoripareissa ei ole koskaan näkynyt elävää varjokarttaa.** Vertailu 0 + leivonta 0 + heitto 1 + voima 3 +
  aurinko sivulta 30/88: lattia täysin valossa; sama ilman LR:n malleja, 276e5a962:lla ja ab6410515:llä (26.10.).
  Suuntavalo toimii. Tarkistettu: URP-assetit (varjot päällä), multi_compile, ShadowCaster-passit, heittäjät (5172/5241),
  kuvauskamera = JuoksupeliV4Kamera. Syy auki (batch-editorin Metal?). PT: tarkistetaan laitteella, kun valotyö avataan.
- **Linjan 2 sumeus (LR:n J4, PT:n pyyntö 20.4x):** EI VS:n ajoista. J4-terävyys korreloi täysin pistekertoimen
  (Screen.dpi/163) kanssa: 1 = terävä (01.36–18.48), 2 = sumea (20.21 →); vaihtui klo 19.07. Macissa ei nyt näyttöä
  (system_profiler) → batch-Unity saa eri DPI:n; 3D puolella resoluutiolla, UI terävä. PlayerPrefs, tallennus.json ja
  Settings-tiedostot puhtaat, QA-komennot eivät pysy. Korjaus: näyttö kiinni tai Esikatselu.cs:ään kiinteä pistekerroin
  (työkalun omistaja). Viestit PT:lle ja LR:lle lähetetty.

## Kesken (seuraava Valoseppä)
1. Odottaa LR:n katot kiinni → KK kysyy omistajalta valotyön avaamisen. Sitten: `valo k22 1` oletukseksi, LR leipoo
   pohja-AZ 40 / EL 45, elävän varjon tarkistus laitteella (Foggin varjo, muurit ilman leivontaa).
2. Elävän varjon puuttuminen editorissa: jos PT pyytää, jatka selvitystä (esim. Esikatselu.cs:n kamera.Render() ja
   varjokartta batch-tilassa); muuten laitteella.
3. Pilarien v02 pystykerroin 0,60/0,58/0,66 yhä tarkistamatta. NS:lle seinat-211 junaan vasta KK:n/PT:n luvalla
   (LR:n v101m-mallit samaan junaan; katon kerroin vaatii V4_palatsi_katto-mallit).
4. J4 ja esineet-metalli-213: ennallaan (odottaa Codexin J4-v3:a).

## Opit
- `pistekerroin` Unityn lokissa (pallo: aloitusportin sumennus …) kertoo, onko batch-kuvan 3D täysresoluutioinen: 2 = sumea.
- ESIKOMiin mahtuu useampi QA-rivi rivinvaihdoin (`print "$ESIKOM"`); `valo vertailu 0` ja `valo k22 1` ennen `v4 7`.
- Taustakomennossa ei `&`: ajo irtoaa ja ilmoitus tulee heti.
