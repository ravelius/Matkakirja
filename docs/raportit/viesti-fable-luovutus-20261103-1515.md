# PT:n luovutus 3.11.2026 klo 15.15

Edellinen: viesti-fable-luovutus-20261103-1325.md. Osoitteet: /Users/Shared/Claude/osoitekirja.md. Syy: konteksti 30 %.
Vahdit Monitorilla 30 min: /Users/Shared/Claude/hooks/codex-posti-vahti.sh ja odottajat-vahti.py (grep ODOTTAA|TYHJÄKÄYNTI; viritä uudelleen).
`date` ennen aikaleimoja. Työlista päivitetty 15.1x asti.

## KIIRE: KARTTA VÄÄRINPÄIN IPADILLA (omistaja 15.14)
- Omistaja: "nyt isolla ipadilla näkyy simussa uusi kartta mutta se on sekaisin ja väärinpäin". Syy NS 252c190dc (ASTC ImageIO,
  #if UNITY_IOS) – PT kuittasi sen simun perusteella (virhe). JU: 429b75faf + revert 252c190dc → asennus PIENEEN ja ISOON,
  JU tarkistaa laitteelta Pariisin oikein päin ennen kuittausta KK:lle + PT:lle. ODOTA JU:n kuittaus.
- NS korjaa suunnan/järjestyksen ja todistaa iPad-kuvalla ennen paluuta. Uusi linja (loki #6160): laatta/tekstuuri/#if UNITY_IOS
  -muutokset todistetaan oikealla iPadilla, simu ei riitä.

## IPADIT
- 15.11 asennettu molempiin 429b75faf (= 713986b6d − NS:n Lontoo-osa 7f715f5fb, joka pidensi sumeutta 1 s): Pariisi v5, 3 kohdetta
  eri suunnista, kyltit + Westminster, reitit valitessa. KK antoi ASENNA 14.59 (omistaja haluaa uusimman heti).
- Tunnettu vika: saapumiszoomin alaosa hetken sumea (kylmä Lontoo 6,5–9 s, Pariisin paluun suorakaide). NS c61d28c99 (näkyvä pala
  ensin) + 7d122e1d1 (Pariisi forbidHoles/jälkeläisraja A/B) yhdistelmässä de11fa0c2 (+ NUI a141413c2 otsikon soikio) – POISTA
  252c190dc siitä. Simu → PT → KK → seuraava asennus. Vieritysmittaus vasta korjatulla.
- Iso iPad = sama kuin pieni (KK/omistaja 14.36: ei vanhaa pohjaa missään; mittaukset vain uusimmalla).
- Simuskriptien turha 80–120 s odotus korjattu (NS; "<kaupunki> nykyintro loppui", ≤ 60 s).

## VIIMEISEN KEISARIN NOSTO (omistaja 13.30; Raamattu 2.200 poikkeus #6146)
- Teksti: KK:n tarkistama scratchpad/keskustelukanava/suunnitelmat/20261103-viimeinen-keisari-nosto-teksti-kk.md.
  Kuvat lopulliset 1–5 (PD): scratchpad/pt/keisari-nosto-kuvat-v2.md (1 = kurkiseinä p 345; kuva 3 ilman vuotta).
- Codex: 5 havainnekuvaa a–e tilattu (PK, postilaatikko 5345c2379) – kuittaa toimitus, KK katsoo.
- NUI 6119d4a12 (natiivi-ui/keisari-nosto): nostokortti + linkit juoksupelin ☰:ssa ja loppukortissa → JU:n seuraavaan
  yhdistelmään korjatun pohjan päälle, simu → KK. Omistajalle yhtenä pakettina (teksti viestinä + kuvat), kun Codex toimittanut.

## JUOKSUPELI
- Kiinankieliset elokuvatekstit (omistaja 13.26): PK tilasi Codexilta c96b3278f, PK kytkee kuvien tultua.
- PK: ys-218ad ei korjannut; 218ae/af (korokkeet, polkukamera 6a8628c67, alkulennon katse 995d5d1cb) JU:n L1-ajossa → PT.
  osasarja-v12 kytketty cce530a1b.
- LAV: v12-pari 02+06 JU:n vuorolla → PT (ok → junaan); sitten SAUMAT-paketti (87706c819eb1) ja k4 juhlasali avoimet-v53
  (pylväät + palkisto valmiit, kasetit odottavat Codexia ac0492a15).
- Junaan 218 PT:n kuittaamana: VS kontaktivarjo k6 d68385bac.

## MUUT ROOLIT
- VS: ISS-ilmiöt koottu f21b6baa8 (linssiseppa2/iss-218) + salamoiden reuna f464a9c08; pari1 JU:n vuorolla → PT.
- KS: 58 kaupungin esittelypaikat → PR. Pariisin Montparnasse/Pompidou ovat piirroksessa → ei vika (Raamattu 1.10 AIKA).
- NS jono: (1) ASTC-korjaus laitteella, (2) saapumiszoomin alaosa (de11fa0c2), (3) elävän kartan laattarajat laajassa näkymässä.
- Levy: JU siirsi isot videot T7:lle, PK karsi _tyo 15 → 1 Gt; 40 Gi vapaana 14.0x.

## TILI
- vvi@vvi.fi viikko oli 89 % 13.13 (~1,6 %/h) → 99 % ~19–20. 99 %:ssa yksi rivi omistajalle KK:n kautta (docs/tilinvaihto.md).
