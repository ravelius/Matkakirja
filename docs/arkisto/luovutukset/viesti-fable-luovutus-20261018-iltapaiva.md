# Päätoimittajan luovutus 18.10.2026 klo 14.2x (konteksti 31 %, pehmeä raja)

PT local_cf5b4eca. Id:t /Users/Shared/Claude/osoitekirja.md. Edellinen: viesti-fable-luovutus-20261018-paiva.md (käsitelty kokonaan).
Viestit mcp__ccd_session_mgmt__send_message session-id:llä. Viikko 95 % (14.15), tahti ~2 %/h; nollautuu 19.10. ~10.00.

## 0. ENSIN: JUNA 202 JULKAISU TÄNÄÄN
OMISTAJA PYYSI JULKAISUA 13.32 (sanatarkasti): "tee kaikki valmiiksi tänään ja julkaise sitten. uskon että riittää kreditit siihen.
julkaisu kuitenkin viimeistään kun 98% on enää jäljellä." KK:n arvio: 98 % noin klo 15.30.
- NS (nollattu 14.15) runko **be8c2400b** (Pulu pois); testit202 ajossa → tulos PT:lle. Muutosloki-PR #4875 (76315c011, 270 mrk).
- JU valmis: web-joukko 202 vihreä (#4854, #4855, #4860, #4861, #4862), muistiajo OHITETTU ("EI TESTEJÄ JUNAAN" 15.10.), odottaa PT:n LUKITSE 202.
- **Odottaa vain aloituslogoa**: NUI (nollattu 13.38) korjaus 2b944e920 = natiivi peite Unityn mustan ikkunan päälle, verho poistaa
  1. kehyksessä (syy: Unity peittää iOS:n käynnistysruudun ~9 s). JU Release → NUI testiappit E/F + video PT:lle viimeistään 15.00.
  PT katsoo → KK → NS:lle → LUKITSE. Jos ei valmis ~15.15: LUKITSE ilman (dc682cda3 rungossa = nykyinen logo), logo junaan 203.
- Postivahti hälyttää 97 % ja 98 % → 98 %:ssa LUKITSE heti valmiilla.
- Junassa 202 hyväksytyt (KK puolesta): pienoismallit arkki 7, ISS sininen maa 3fad81c08, kehykset v10 + Louvren pilotti (salit, k2,
  vartija). EI junassa: Mona Lisan kävely (revertoitu, junaan 203), Louvren koodikyyhky (MuseoPulu.Paalla=false, Tripo-Pulu 203).
- Asemataulun junarivi päivitetty (scratchpad/asemataulu/data/talo/junat.json).

## 1. Omistajan päätökset tällä vuorolla (kaikki mainissa)
- 11.46 Tripo-mallien lataus pysyvällä luvalla (#4871). 12.14 kuvatekstit aina kuvan ulkopuolelle (#4872; ohje kaikille rooleille,
  VS korjasi yhteisen todistusraportti.py cef176edc). 12.46 Tripo-API → KUMOTTU 13.24: Tripo selaimessa Sonnet-apulaisella, API-saldo 0,
  avain TRIPO_API_KEY talteen (#4873, #4874). 13.32 julkaisupyyntö (yllä). KK 14.1x: Pulu pois 202:sta, Tripo-Pulun silmät ORANSSEIKSI
  (korjaus edellisen luovutuksen "oranssit silmät" -tulkintaan; #4876).

## 2. 19.10. (viikkokiintiö nollautuu ~10.00)
- VS: Tripo Chromessa Sonnet-apulaisella: k1 hiukset, Pulu (niskasauma, pyrstö viuhkaksi, silmät oranssit #E07A1F), Puyi + vartija
  (Codex 6 kuvaa tilattu 1de736c41, EI VIELÄ TOIMITETTU). Liikkeet: Tripon luuranko → FBX → Humanoid + Quaternius UAL/UAL 2 (CC0);
  poseeratut mallit vain pienet liikkeet, kävelevät kädet irti. Reykjavík-testi (iPad-ajo valitsee vanhaa nimeä Islanti), ISS-alueen nimi.
- LS: Mona Lisa 203: kameraloki-simu 1d9d29c76 (hyppy ~3 m kävelyn puolivälissä, alku jo kunnossa f239197a3).
- LR (nollattu 14.04): 203: GG:n pyöreät penkit verhoiluun, kattoikkunan raidat, kehysten tiheämpi lehvästö (luovutus 368de7369).
- PK: juoksupelin rata 1 -koodaus (RATA1-SUUNNITELMA.md).
- KK 203:een: Matterhornille koukkuhuippu.

## 3. Muuta
- Levy 49 Gi (roolit siivosivat ~13 G worktreetä 13.4x). Tauolla: SS, SK, Äänittäjä, KS.
- Nollattu tällä vuorolla: Asemataulu, Valoseppä, Natiivi-UI, Linnanrakentaja, Linssiseppä, Natiiviseppä, KK (omistajan kortilla).
