# Projektiseppä (ent. Siirtoseppä): luovutus 19.10.2026 klo 20.31

Rooli: Projektiseppä (Opus, high), kansio /Users/Shared/Claude/Matkakirja-siirtoseppa. Projekti Olavinlinna on **TAUOLLA**
(omistaja 19.10. klo 17.05). Tauon aikana tein PT:n erinä tuotantopohjat ja Asemataulun. Edellinen luovutus oli
viesti-projektiseppa-luovutus-20261019.md (2bc598b7d), ja sen Olavinlinna-osa on yhä voimassa.

## KÄYNNISSÄ LUOVUTUSHETKELLÄ
- Ei mitään: ei ajoja, ei avoimia PR:iä eikä omia erä-worktreeitä. Proto-worktree /Users/Shared/Claude/wt/proto-projektiseppa-linna-botti
  (linna-botti-10, a78533229, EI mergetty) jää tauon ajaksi. Appeja _tyo/siirtoseppa/:ssa on 2 (7254653e5 ja 2e3990d00).

## ENSIN seuraajalle
1. Rivi PT:lle: aloitettu ja levossa. Jos jono on tyhjä: "JONO TYHJÄ: Projektiseppä".
2. Linnaan ei kosketa ennen tauon purkua. Jatko on listan docs/raportit/olavinlinna-valmiiksi-lista-20261019.md osiossa 6, ja kohta 3
   on uusi: keittiö 3/4 ja 11 jumia junan rungossa (3a1a84d52, iPhone 18 Pro; todistus proto-3d/lokit/todistus-ennen-junaa-botti-osat-20261019-1818).

## Tehty 17.2x–20.3x (kaikki mergetty)
- **#4993** tuotantopohja esirenderöity video ja **#5003** sen jako kahdeksi kuluksi (omistaja 18.25/18.29): A PELISTÄ KUVATTU
  (raketti, valas, uni: Unity-kohtaus, video-laatutaso, Työkalusepän tallennin) ja B CODEX BLENDER (vain aarre). Tiedosto:
  docs/moduulit/tuotantopohjat/esirenderoity-video.md. Vastaanottaja on Natiivi-UI, ja ääniraidan kokoaa Äänittäjä (PT).
- **#4999** Olavinlinna-listan osio 6 kohta 3 (keittiön jumi).
- **#5008 (38c2329f5) ASEMATAULU YHDEKSI SPEKSATUKSI TYÖNKULUKSI** (omistaja 19.18–19.51): docs/moduulit/asemataulu.md on
  ainoa speksi. Kaikki koodi on tools/asemataulu/:ssa, ja ASEMATAULU-ROOLI.md on siirretty sinne ilman id:itä. Komento
  `python3 -I tools/asemataulu/asemataulu.py` päivittää työkansion origin/mainista (vanhat kopiot menevät _ennen-repoa/-kansioon)
  ja kirjoittaa nykyinen.json-tiedoston (osoite ja id:t osoitekirjasta). Tarkistin tarkista-junat.py valvoo kaikki illan säännöt,
  ja synkka.py tulostaa ESTO-rivin virheellisestä. tilinvaihto-valmis.mjs ajaa `--tarkista`. peili.sh ei enää kopioi koodia
  työkansiosta repoon. Otettu käyttöön 20.29, Asemataululle kerrottu, ja PT kirjoittaa Raamatun 7.39:n (#5011).

## Opit (Asemataulu)
- Hajoamisen syy oli kaksi kopiota kahteen suuntaan: peili.sh kopioi työkansiosta repoon, ja ohjeissa oli kovakoodatut id:t
  ja osoitteet. Uudessa mallissa repo on totuus, tila jää työkansioon ja tilin tiedot ovat yhdessä tiedostossa.
- data/talo/roolit.json on vanha siemen. Viety versio on hoitaja/roolit.json, ja tarkistin lukee sen.

## Avoimet (muiden)
- Macin KIERROS.md (Postivahti) ja F/keskustelukanava/aloitus.md (KK) sisältävät yhä vanhan taulun osoitteen Qo5w6…; tämä on
  PT:n tiedossa.
