# Pelikoodarin luovutus 13.10.2026 klo 17.58 (PT:n pyytämä nollaus, konteksti 52 %)

## Tila lyhyesti
Juna 187: kaikki Pelikoodarin erät ovat kuitattuina NS:llä (alla). Seuraava iso työ on pääkaupunkien e04–e14 kytkentä, joka
odottaa SK:n tekstipistokoetta erä kerrallaan. Lisäksi odottaa Kööpenhaminan ääninäyte LS2:n kehityskaupunkiajosta.

## Junassa 187 (NS:n rungossa tai PT:n kuittaamana)
- shakki-185 **e4d686041**: shakkikello (Turnaus/Mestari: tikitys + nappi), Williamin puheet aanet/pelit/shakki-v1 (aloitus
  ensimmäisellä avauksella, voitto/tappio/tasapeli tuloskortissa, historialuenta tuloskortin Kuuntele-medianapista), valintakortin
  tuplateksti (Button.text + Label) ja pelaajarivin rivitys (lautapeli.uss). Korvaa 186-korjaushaaran 16714a8fb.
- aarre-eurooppa-187 **7dd35824c** rungossa, **af91c8cac** (Lontoon saapumispiste Lower Thames Street) NS:llä PT:n kuittauksella
  (LS1:n kuva lokit/katso187b-pt/). Sisältö: Resources/Aarretehtavat/eurooppa.json = SK:n mallierä + erät 1–6 (61 kaupunkia, 108
  tehtävää), Eurooppa-lippu oletuksena PÄÄLLÄ (PT), alueellinen piilotus myös tunnuksella tehtava:<kaupunki>:<laji> ja
  muistomerkki-kentällä Kreikan App Storessa. Vanhat kartat (9) viety ämpäriin aarretehtavat/kartat/. LS1:n katso-kohteet 34 kpl
  ovat LS1:n haarassa linssiseppa/katso-kohteet-187 (+ TehtavaEtsinta 50a680cde).
- koopenhamina-187 **e4603c4f5**: pallon latausraita oppaan tunnuksella koopenhamina → pelin kobenhavn (AaniTaulut.Kaupunkitunnukset).
- koopenhamina-aanet-187 **892797aa3**: KS:n 3D-pisteäänten pisteet elava-koopenhamina.json:n loppuun (LS2:n haara
  linssiseppa2/koopenhamina-kippi 6a408268c sisältää sen; LS2 lisää liput ja piiput päälle).
- nappula-diag-187 **ca3de062a**: "MATKAKIRJA nappula: tila (syy) …" -lokirivi kartan avautuessa (Aseta) ja linssistä/kipistä
  palatessa + kartan testikomento "nappula tila". Vain loki (iPhonen puuttuva nappula 1/14, LS1:n todistus-nappula187c).

## Avoin jono
1. **Pääkaupunkien e04–e14 kytkentä** (PT 17.5x): odota SK:n tekstipistokoetta erä kerrallaan. Kun SK kuittaa erän, kytke se
   YHTENÄ web-PR:nä yhdessä hyväksyttyjen kuvien kanssa ja lähetä PT:lle yksi rivi per erä.
   - Kuvat: PT:n mukaan hyväksyttyjä on nyt **861**, lista docs/raportit/paakaupunkikuvat-hyvaksytyt-20261013-v2.json (commit
     8bcdaed0f haarassa sisalto-pelikatalogi-20260927, "satelliitit läpi, esineslotit pois": v2 sisältää SK:n hyväksymät
     satelliittikuvat, joten C-slotit v2-listalla saa kytkeä). Aiempi v1 (750, hyvaksytty_per_era) on SK:n kansiossa /Users/Shared/Claude/proto-3d/_tyo/sisaltokirjuri/
     pk-tarkistus-20261013/ (hyvaksytyt-pistokoe.json, assets.json, b0073.json = batch-0073, 1018 kuvaa). EI KYTKETÄ: tekoälyn
     esinekuvat (O2/O3/TRAVELER-illustraatiot) jäävät kokonaan pois (omistaja); satelliittikuvat (C-slotit) vain SK:n myöhemmin
     hyväksymät; hylätyt. Uudet kuvat jatkossa vain Commonsista (omistaja 17.4x).
   - SK 18.0x LOPULLINEN lista (korvaa v1:n): kopio /Users/Shared/Claude/proto-3d/_tyo/sisaltokirjuri/pk-tarkistus-20261013/
     hyvaksytyt-v2.json, avaimet hyvaksytty_per_era (861 = 750 + 111 satelliittikuvaa), poistettu_esineslotit (106, EI kytketä)
     ja hylatty (51, EI). yhdista-kuvat.py lukee v2:n (kaikki muut listat poissulkuja); kuiva-ajo v2:lla: 861/861 sulautui
     93 tiedostoon, 0 ohitettu. SK kuittaa tekstierät erikseen ennen kytkentää.
   - Työkalut valmiina: proto-3d/_tyo/pelikoodari/pk-kytkenta/yhdista-kuvat.py <b0073.json> <hyväksytyt.json> <pilvi-kansio>
     sulauttaa runtimeMediaFieldPayloadin targetTokens-polkuun (tyhjä nähtävyyden kuvat-lista saa kuvat[0]). Tarkista, että
     v2-listan muoto on sama (hyvaksytty_per_era); jos ei, sovita lukija.
   - Sisältö: Codexin haarat origin/paakaupungit-e04-codex … e14-codex (93 kaupunkia). Haaroissa on kuva-erän jälkeen vain
     kuvat-rooli-asset.json-päivityksiä; tarkistin, että kaikki 1018 kuvaa ovat niissä samat kuin b0073:ssa.
   - Kuiva-ajo 13.10. (worktree /Users/Shared/Claude/wt/pelikoodari-pk-kytkenta, palautettu puhtaaksi): 750/750 kuvaa
     sulautui, tools/paakaupungit/kytke-pilvisisalto.mjs ajoi kaikki 93 kaupunkia (+35 335 riviä 7 tiedostoon,
     kuivaajo-diffstat-20261013.txt). Webin testit: **11 hylättyä / 5543** (kuivaajo-testit-20261013.txt samassa kansiossa):
     havainnekuvan kuvateksti, kohdekarttojen mittakaavajana (2), laajentamaton kartta, nostokuvien osoitteet ja päivämäärät (2),
     "lehdellisellä pisteellä kansi + piirretty kohdekartta", skeemat 1.12/1.15/1.17/1.18. Ne on korjattava ennen PR:ää.
     Huom: työkalu kirjoittaa myös maakartat.js:n KAUPUNKIKARTAT-rivit; KS:n PR #4560 (kohdekartat.mjs-rekisteri) koskee
     samoja kaupunkeja → tarkista päällekkäisyys, ettei rivejä tule kahdesti. Työkalu jättää repon juureen .pk-rajat.json:n
     (älä committaa).
   - Kytke erä kerrallaan: kopioi vain kyseisen erän kansio pilvi-kansioon ennen työkalua (työkalu lukee kaikki e*-kansiot).
2. **Kööpenhaminan ääninäyte**: kun LS2 ilmoittaa kehityskaupunkiajosta (Kööpenhamina kehityskaupunkeihin, data ämpärissä), ota
   äänellinen näyte (kirkot, suihkulähteet, kahvilat) PT:lle. Pisteäänet soivat vasta kehityskaupunkilisäyksen jälkeen.
3. **PR #4560** (KS:n pääkaupunkien kohdekartat e04–e14, koko maailma omistajan poikkeuksella 10.10.): mergen jälkeen tarkista,
   että kartat näkyvät webissä ja natiivin sisältöpaketissa, ja kuittaa PT:lle yhdellä rivillä. Jos natiivin Kohdekartat.cs
   tarvitsee muutoksen, se kuuluu Natiivi-UI:lle (kerro PT:lle). Taustavahti mergestä kuoli nollauksessa: tarkista käsin
   `gh pr view 4560 --json state`.

## Opit tältä päivältä (muistissa)
- Jokainen käännös pyydetään Julkaisijalta erikseen, myös saman haaran uusinta (kaannos-pyydetaan-erikseen).
- Oma simu sammuksiin ajon jälkeen (oma-simu-sammuksiin-ajon-jalkeen); skriptit tekevät sen nyt itse.
- Sovelluksen äänikaappaus (linssi-komento "kaappaa <s> <nimi>") katkeaa, jos appi suljetaan ennen loppua → kesto lyhyemmäksi
  kuin skriptin aika (shakki-187-tallenne.zsh). WAV-nimi voi olla <nimi>-natiivi.wav.
- Pelikoodari-iPad13:lla päälippu "aarretehtava lippu" oli pois vanhasta testistä → "tarjolla" palautti aina ei.

## Ajoskriptit (proto-3d/tyokalut/pelikoodari-ajot/)
shakki-187-tallenne.zsh (video + äänikaappaus, Kuuntele-napin paikka tiedostosta napauta.txt), aarre-187-todiste.zsh,
shakki-valinta-kuva.zsh. Worktreet: wt/proto-pelikoodari-{shakki,shakki186,aarre,koopenhamina,kph-aanet,nappula} (proto) ja
wt/pelikoodari-pk-kytkenta (web). Mergetyt voi poistaa luovutusten jälkeen.
