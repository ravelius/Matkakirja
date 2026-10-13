# Julkaisijan luovutus 13.10.2026 klo 21.3x (TILINVAIHTO, PT:n käsky 21.30)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -150; kellonajat `date`-komennosta). Edellinen luovutus
`viesti-julkaisija-luovutus-20261013-ilta.md` (käytännöt ja sääntö 0 siellä, voimassa). PT: "PÄÄTOIMITTAJA (Opus, max)", session
`local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` (jos SendMessage nimellä epäonnistuu → `mcp__ccd_session_mgmt__send_message` session_id:llä;
Sisältökirjuri `local_b9ca71c7-3458-4e1d-aa21-f6c97e27c708` tarvitsi tämän 20.2x). Laitetestaaja-nimellä kaksi riviä: käytä `[ed2a9a]`.

## 1. Juna 187 – VALMIS

- **TF 187 VALMIS 5/5** (19.48): iOS 38425085365 ✓ 18.55 → sisäinen 38426148941 ✓ 19.00 → vienti 38424849165 (e2649e4c2) ✓ 19.32 →
  ulkoinen 38431291163 + beta-arvio HYVÄKSYTTY 19.48 → vanhennus 38433503969 (186 iOS + Mac pois). PT + Laitetestaaja kuitattu.
- **Mac 1.1 (187)** TF 38425170382 ✓ 18.56 (NS).

## 2. Juna 188 (kertyy) – ämpärissä tänä iltana (kaikki vie-paketti.sh, 0 virhettä, CDN 200 + SHA)

- Vesi: index-v17 18.58, **index-v18** 20.18 (sevilla2/sofia2/lissabon2; koodi proto `linssiseppa/vesi-v18-188` ce8f49cdb, NS ottaa junaan).
- Taidemuseo Ranska: sali-v1 19.35, sali-v2 20.30, sali-v2b 20.53, **sali-v2d** 21.31 (LR); Rodin astc-v1 30 kpl 19.38 + Kolme haamua
  21.11 (LS2, Helvetin porttien tilalle); SK:n alkuperäiset patsaat 38 + maalaukset 103 (lahde/teokset.v1.json, 51 teosta) 20.15–20.18.
- **Vermeer louvre-mi-1448 EI ole ämpärissä** (SK poisti ennen vientiä; tarkistettu 404 + SHA 529b94af). SK:n
  `_valmiit/taidemuseo-ranska-teokset-v2-vienti-20261013` on tarpeeton (identtinen v1:n kanssa) – ÄLÄ vie.
- **Muistiajo 188 (Tukholma maa v3, +24 Mt):** NS iPad Pro 13: 188 min vapaa 1,34 Gt vs 187 1,33 Gt → OK (20.26).
- **VIENTIJONO (LS1 21.3x, ei aloitettu tilinvaihdon takia):** 1) `_valmiit/vesi-v19-vienti-20261013` (vesi/index-v19.json +
  sevilla3-8m, PT kuittasi 188:aan) – pieni, vie ensin; 2) `_valmiit/taidemuseo-ranska-teokset-astc-v1-vienti-20261013`
  (taidemuseo/ranska/astc-v1/, 51 teosta, ~1,0 Gt, 8445 riviä) – iso, harkitse `--osa=I/4` rinnakkain (vie-paketti-uusinta.zsh, jos osa katkeaa).
  Aja ensin `--kuiva`. Valmistumisesta rivi LS1:lle + uuden tilin PT:lle.
- Toistuva paketin hylkäyssyy tänään: ylimääräinen tiedosto juuressa (sali-v2*.json, puutteet.md, lisenssi-json) tai SHA-rivi
  siirretylle tiedostolle → pyydä tekijää korjaamaan, älä muokkaa itse.

## 3. Käännös- ja simujono klo 21.31 (JATKOKOHTA)

- **L1:** LS2 `museo-ranska-rodin2` a29af6561 (Kolme haamua + sali-v2d) – kääntyy, alkoi 21.31.
- **L2:** NUI asettelutesti `natiivi-ui/keskitys-188` e309de773 (pallo + linna), alkoi 21.26.
- **Simut (raja 2):** käynnissä LS2 rodin4 (992ce2800, A26BC7D0). Jono:
  1. **LS1 palaute188** (omistajan museopalaute, d150d7229 käännetty, 2 simua): luo `proto-3d/tyokalut/linssiseppa-ajot/simu-palaute188.nyt`
     heti LS2:n rodin4 SIMU VAPAA -viestin jälkeen.
  2. **NUI siluetti188** (24420556f käännetty, iPhone + iPad ~6 min): SIMU NYT viestillä.
  3. **LS2 a29af6561** (A26BC7D0 ~7 min) + **LS1 vesi19c** (`simu-vesi19c.nyt`, iPad 00CF62C2 ~5 min, vain Tampere) yhtä aikaa.
- Linssiseppa-ajot-kansiossa on vanhoja `*-elava187b/c.nyt` -tiedostoja (eivät minun) – älä koske.
- `xcrun simctl list devices booted` ei näe muiden roolien simuja → luota SIMU VAPAA -viesteihin; tarkista tarvittaessa
  `ps -axo pid,etime,command | grep ajo-<nimi>` (vesi19b päättyi ilman viestiä).

## 4. Monitorit

- Lukko-Monitor: `zsh /Users/Shared/Claude/julkaisija-tyokalut/lukkovahti.zsh` (tulostaa rivin kun L1/L2 kuka muuttuu), 30 min, uusi aina.
- TF-ketjua ei ole käynnissä.

## 5. Avoimet docs-PR:t

Ei Julkaisijan omia. Avoimia muiden docs-PR:itä (#4569, #4556, #4555, #4554, #4553, #4504, #4503, #4488, #4326, #4256, #4251, #4006) ei
ole pyydetty Julkaisijalta.
