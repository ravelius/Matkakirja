# PT:n luovutus 10.11.2026 klo 07.5x (PT local_8d8ebf72; konteksti 30 %)

Korvaa -0630:n JUNA-, ODOTTAA- ja MUUT-kohdat; LINJAT voimassa (kolme kärkeä, kaupungit koodilla, Asemataulu jäädytetty, Raamattu ei kasva).
ENSIN: vahdit (python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py | grep -E "ODOTTAA|TYHJÄKÄYNTI"; zsh /Users/Shared/Claude/hooks/codex-posti-vahti.sh)
taustalle. Omistaja HEREILLÄ (KK). Date ennen jokaista aikaleimaa.

## UUTTA TÄLLÄ VUOROLLA (kaikki päätösloki-PR:issä 6538–6544)
- TYÖLISTA ON JONO (omistaja 07.40, PR 6542): `python3 -I tools/asemataulu/tyolista.py seuraava [ROOLI]` näyttää roolittain NYT + seuraavat.
  Komennot: tehty (odottaa PT:n kuittausta, roolin seuraava nousee), este "syy", jono --tekija/--jarj/--tila, valmis (PT; nostaa seuraavan),
  lisaa --tekija X [--jarj N] [--nyt]. Enintään 1 "työn alla" per tekijä (tarkistin). PT:n tehtävä: kuittaa "tehty"-rivit (katso kuva → valmis),
  lisää uudet pyynnöt tekijälle ja jarj:lle (omistajan vikahavainnot jarj 0). Siivous tehty: 7 työn alla, ~25 jonossa. Varmuuskopio ennen siivousta
  scratchpadissa (ei tarvita).
- JARRU (omistaja 07.44, PR 6544): viikkobudjetti 280 % / 3 tiliä → viiva ~40 %/vrk (54 % klo 07.38 + 1,67 %/h). Postivahti vertaa (KIERROS.md):
  yli viivan vain kärkien ensimmäiset + JU. Ilmainen Fable-reset = vara. AVOIN: Raamattu 12.21 yksi rivi (KK pyysi) + 7.38 jono-rivi.
- Sisältötekstit (kysymykset, kuvaselitteet) hyväksyy KK, ei omistajan kortti (07.36; muisti sisaltotekstit-kk-hyvaksyy).
- Lyhyt versio 224.N (06.39): asennussivu uusi malli (06.59), viestit KK:lle "224.N (sha)", manifest title automaattinen.
- KK:lle 07.5x lähetetty: kuluttajat (isot kontekstit NUI 28, PK 27, KS 26, LAV 26 % → luovutus seuraavassa välissä) ja "Pariisi-kortti"-pino
  (filmi 22e601e76, pallon elämä, maalattu taivas, nimikarsinta 4d2610ab0; tarkka alue neliöksi). KK tuo kortteina.

## JUNA 224 (natiivi-backup julkaisija/juna-224) — LINKKI 224.10 = 87e99a09a (07.43). Lukitus/TF VAIN omistajan pyynnöstä.
Linkit: .6 335da402f .7 34810a575 (kiertopiste, lyhyt versio; ☰ v224.7 iPadilla PT katsoi) .8 f0da68576 (Lontoon nimiäänet, 3D-tähti)
.9 6fc74dc14 (ND-pohjat ASTC, napit luettaviksi) .10 87e99a09a (automaattikierto). Kaikki KK:lle ilmoitettu.

## ODOTTAA (kuka → mitä PT tekee)
- JU ML: kartan purku P3/P4 8c2956804 (NS, muistivahti-jatka) → PAIKKAA paluun pari → jos paluu kartalle ehjä: purku junaan (Cesium 3890 Mt ok;
  ISS 4151 = ISS:n oma, erillinen NS-työ). Päätös tehty 07.2x, ehto paluu.
- JU MM: museo palvelimelle 91bc37c4b | 6fc74dc14 Mac-pari → PT katsoo → vienti (uusi polku) + junaan. NUI latausilmaisin jonossa.
- JU MH: LAV lattia9 raja3-pari (sokkeli) → PT → KK Kelpaa-kortti. LAV:n ovet9-kuvat PERUTTU (kynnykset mitattu puhtaiksi).
- JU MK: PK Liiku-napautuskoe → pari PT:lle.
- KS: koe7 iPad-pari ei erotellut (koe6 = koe7 laitteella) → Documents-koot JU:lta / syy b; koe7 EI junaan ennen uutta paria.
  KS työn alla: Lontoon 2 kysymystä dataan (KK:n sanat 17/18), sitten [210] Lontoo samalla toteutuksella.
- NUI: kaikki klikattavat paikat esittelyksi → museon latausilmaisin.
- NS: nollaus kesken (Postivahti; luovutus 539e1a1b2). ISS-muisti NS:n jonossa.
- PK: iPhone-latausmittaus odottaa omistajan kytkentää (06.34 "Ei nyt", ei muistutuksia).
- Levy 11–12 Gi: roolit siirtävät omia worktreetään NAS:lle (NS, KS, PK, NUI pyydetty). PT:n 3 siirretty (fable-luovutus-0130/-1400,
  tilinvaihto); pt-kolme-karkea ja _tyo/pt-raamattu-2177 jäivät ajoon (tarkista: zsh scratchpad-skripti, diff ilman ._*-tiedostoja).
  wt/pt-loki-0636 ja wt/pt-tyolista-jono: omat, voi siirtää. wt/fable-luovutus-0400: 1 pushaamaton commit, älä siirrä katsomatta.

## MUUT
- Docs-PR:issä ei checkejä → yhdistä suoraan. tools/-PR:issä (6542) ei myöskään checkejä.
- Muistutushook pt-taulu-muistutus.py kopioitu /Users/Shared/Claude/hooks/:iin (vain työn alla -rivit).
- Valoseppä levossa (Pariisi-kortti).
