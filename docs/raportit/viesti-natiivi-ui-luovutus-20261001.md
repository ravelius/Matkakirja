# Natiivi-UI:n luovutus 1.10.2026 (aj), noin klo 06

Jatkaa luovutusta (ai) 30.9. Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (master BUILD 90 f89c5c79, juna 91 kääntyy).
Simulaattorit: oma iPhone 17 FB234D08 ja oma iPad natiivi-ui-iPad11 AD119F7B (503000D1 kaatui "system shell crashed", korvattu).
Käännös- ja simulaattorivuorot antaa Julkaisija ("NYT KÄÄNNÖS" / "SIMULAATTORI NYT"); kopioi .app heti, poista appi lopuksi
(simctl uninstall vaatii bootin), ilmoita "sammutettu".

## 30.9.–1.10. tehty (kaikki todennettu simulaattorissa ja junissa)

| Erä | Haara ja kärki | Juna |
|---|---|---|
| Saarimusta vaakana (Dynamic Island -laikku) | natiivi-ui/saarimusta-vaaka 0b5469c7 | 72 |
| Visa pienentää matkakirjan, Lyonin herokuvat esiladataan | visa-kortti 36dd0938, lisakaupunki-esilataus e89751a4 | 75 |
| Saaret PRT/ESP panorajaan (Karttaseppä) | saaret-rajat 09b74c8d | 75 |
| Mac-syöte 1 (ohjauslevy, nipistys, rulla; plugin MatkakirjaMacSyote.mm) | mac-syote 01c42c3d | 75 |
| Olavinlinnan kuunnelmien tekstitys (KuunnelmaKaistale, KuunnelmaToisto) | kuunnelma e67de778 | 77 |
| Pelikello piiloon linssin ja Tietoja-kortin ajaksi | pelikello-linssi 2d0f4998, pelikello-tietoja 762fd9ad | 78, 80 |
| Kehittäjän mikseripaneeli (IMikseriLahde, nappi) | mikseri 50798bce (Pelikoodarin aanimikseri päällä) | 89 |
| Kuori-nappi ×:n alle | kuori-nappi 8fb69ffd | 80 |
| Mac-syöte 2 (liuku, nipistys hitaammaksi, tekstin liuku, Maailma+huntu, näppäimistö ← → ↑ ↓ Esc, Mac-yläpalkki 68/15, logo 32) | mac-syote-2 a3fa584c | 82 |
| Mac-tuntuma (120 Hz Mac, pehmeä rulla, +/−, hover .mk-mac, valikon kytkin päivittää rivit) | mac-tuntuma 087b2e13 | 87 |
| Pariteetti 3 omistajan päätöksillä: Ateenan kuvamerkki saapumiszoomilla, linssiselite auki 3 s | pariteetti3-korjaus d04477a4 | 88 |
| Dioraaman Pulu turva-alueen sisään (yleisnäkymän kiinteä 18 pt Dynamic Islandin alla) | pulu-turva a8503697 | 91 |

Raportit: docs/raportit/pariteetti-3-20260930.md (natiivi-ui-luovutus-m). Kuvaparit proto-3d/lokit/natiivi-ui-*/parit/.

## KESKEN

- Ei kesken. Viimeisin: natiivi-ui/pelaajan-nakyma-2 e59ed8a1 Natiivisepällä junaan (testikomento `ui pelaaja 1|0` todennettu
  dccb82a5:llä; kuunnelman lopetus yleisnäkymässä vain käännetty, Laitetestaaja todentaa savukkeessa).

## SITOVAT LINJAUKSET (tältä jaksolta)

- EI MUUTOKSIA web-eron perusteella ilman omistajan lupaa (omistaja 30.9. 22.2x); merge-pyyntöön lupa näkyviin.
- Koodissa kirjatut omistajan löydökset voittavat webin (esim. löydös 133: nostokortissa ei ✕; keskeneräiset vain otsikossa).
- Mac-muutokset vain isiOSAppOnMac-haaraan (MacSyote.Kaytossa), paitsi näppäimistö (kaikki alustat).

## OPIT

- Simulaattorin musta pilleri/kapseli on Dynamic Island (pysty: yläreuna, vaaka: vasen reuna) — ei UI-elementti.
- Diagnoosiloki ennen toista arvausta: pulu-turvan ensimmäinen korjaus osui väärään koodipolkuun.
- proto-kaanna.sh mergeää masterin päälle: testikäännös sisältää muiden korjaukset (Ohita oli jo korjattu 128dc29b:llä).
- Skripteissä `puhe paalle` (kuunnelma.sh jättää puhe pois), .app-polku suoraan (glob kaatoi ajon), [[ -d app ]] -tarkistus.
- Burst AotLinkerException on ohimenevä: uusinta samalla puulla.
- Skriptit: proto-3d/lokit/natiivi-ui-1035/skriptit/ (linna2, kuunnelma, mac2, tuntuma, p3korjaus, pariteetti3, tarkistus3, pelaaja,
  ylapalkki-mac, mikseri, ohita, pelikello, saaret, visa-lyon).
