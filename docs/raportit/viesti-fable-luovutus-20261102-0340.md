# PT:n luovutus 2.11.2026 klo 03.40

Edellinen: viesti-fable-luovutus-20261101-2255.md (säännöt voimassa). Osoitteet: /Users/Shared/Claude/osoitekirja.md.
Syy: konteksti 30 % (pehmeä raja). `date` ennen aikaleimoja.

## OMISTAJAN PÄÄTÖKSET
- 1.11. 23.0x–23.2x omistaja katsoi juna 217 -videon: "Pelissä on paljon bugeja" + eunukit liikaa/eivät tee mitään, 3-2-1 puuttuu,
  lähtö sisältä puuttuu, sivunykäykset. KK:n bugilista: proto-3d/lokit/bugit-juoksu-217-20261102/RAPORTTI.md (15 kohtaa).
- 1.11. 23.29 YÖLUPA (loki PR 5920): "Menen nukkumaan. Saat hyväksyä puolestani kaikki". KK hyväksyy yön erät; TF 217 yöllä,
  kun korjaukset rungossa ja PT on katsonut uuden videon. Ostot, luvat, tilit, generoinnit lupien yli, poistot aamuun.

## JUNA 217 – TF TILATTU 03.3x (NS local_99130238 → JU local_06f8c680)
- PT katsoi taso1b, taso1c ja taso1d (kallistus) -tallenteet: lähtö ovesta (taso 1 oletus), 3-2-1, eunukit 65 → 35 % + ohitettu
  jahtaa, räystäskatto (bugi 5), kallistus ≤ 4,8°. Runko c92667414 + tulossa PK 22de5be30 + LAV bugi 14 (c2-v32, muurikate-v38,
  tausta-v94). NS lukitsee ja tilaa TF:n; rivi PT:lle kun testaajilla → asemataulu Valmiina + KK:lle.
- LAV:n bugikorjaukset junaan 217 = PT:n kuittaamia ilman mainintaa (kerrottu NS:lle).
- Jäi seuraavaan junaan: kamera kapeissa muurikuluissa (PK: osasarja-peitto oletuksena pois, muuriportti 66 s läpi), bugi 12
  (tasanteen etupinta, LAV), portin holvin leipomattomat siniset saaret (LAV, ennen muuta), kolmioaukot portaan kaiteessa (LAV),
  bugi 10 oikeassa pelissä tarkistamatta (PK). Bugi 15 hylätty (kuvan ulkopuolisten eunukkien varjot).

## ROOLIT (kaikki nollattu yöllä; Postivahti EI voi nollata rooleja: clear_session vain itselle/käynnistäjälle)
- Kaava: rooli tekee luovutuksen → PT pyytää "nollaa itsesi (clear_session self)" → odota list_eventsillä "(idle) 0 of 0" →
  lähetä aloitusviesti. ÄLÄ lähetä mitään väliin (jonossa oleva viesti voi perua nollauksen).
- LAV kieltäytyy nollauksesta PT:n pyynnöstä, jos aiemmin estetty; KK:n "OMISTAJAN PÄÄTÖS klo …" -rivi ratkaisee.
- PK (local_91a1bc27): luovutus tulossa (konteksti 26 %) → pyydä nollaus, aloitusviesti: seuraava = kapeat kulut/muuriportti.
- LAV (local_16f6f272): 213 Wumenin kivijalka + terassit työn alla; jono: holvin leivonta, bugi 12, kolmioaukot.
  Sisätilat: 214 kuitattu, Codex-korjauspyyntö postilaatikossa 9fc5e0026 (养心殿 抱厦 keski+länsi, neliöpilarit); 储秀宫 hyväksytty.
  Mallinnus vasta Codexin korjatun toimituksen + PT:n kuittauksen jälkeen.
- VS (local_fa464945): lepää TF 217:ään asti, sitten uusi erä PT:ltä (esim. työlistan rivi 52 seinät/koristeet/taivas).
- KK nollattu 01.53; teki simujen yösiivouksen (04.00) → jos vikaa ei tule, merkitse työlistan "Simulaattorien käyttötapa" valmiiksi.

## MUUT
- Postilaatikon monitori: scratchpad/postilaatikko-vahti.sh (kopio c59cbc56-sessiosta), Monitor 30 min, viritä uudelleen.
- Levy ~69 Gi (raja 60).
- Asemataulu: Juna 217 "Työn alla (TestFlight tilattu)"; työlistan sisätilat työn alla.

## Säännöt, jotka opin
- Roolien nollaus: Postivahti ei voi (sovellus), PT pyytää rooleja nollaamaan itsensä; tarkista tyhjä transkripti ennen aloitusviestiä.
- Bugilistat jaetaan heti tekijöittäin (kamera = PK, malli = LAV); paikannus ensin `ui juoksupeli mika x y`.
