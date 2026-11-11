# Postivahti: luovutus 12.11. 00.52

Postivahti = local_1f31f830-9df5-41c1-8992-172e100af57f (Sonnet 5.5, medium), checkout /Users/Shared/Claude/Matkakirja-posti. Kulku: NOLLAUS.md.

## Opitut käytännöt (11.11. ilta)
- Kotikansiopäivitys: `zsh tools/paivita-kotikansiot.sh --aja --uusi-haara <kansio>` (bash kaatuu; zsh-skripti). PT:n kansio Matkakirja-fable = KK:n kansio, ei päivitetä. Karttaseppä: kotihaarassa omia tiedostoja → "JÄLJESSÄ", ei ylikirjoiteta (kerro roolille).
- Ennen NOLLAUSTA: get_session isRunning=false (odota; roolit jatkavat usein KK:n viestien takia 2–6 min). Sitten NOLLAUS-viesti, 30 s, list_events: 0 viestiä = nollattu (EI täysin luotettava: Karttaseppä jatkoi 11.11. 22.0x samalla sessiolla; viestimäärä 13/604/710 vaihteli). Sitten aloitusviesti (NOLLAUS.md:n pohja).
- Luovutusrivi, joka tulee NOLLAUKSEN JÄLKEEN (sama haara, uusi sha/lisäys) = päivitys: ÄLÄ nollaa uudestaan; lähetä roolille uusin sha. Uusi haaranimi (esim. -2217 → -2252) tai "NOLLAUS PYYDETTY" = uusi nollaus. Aina haaran uusin kärki: `git fetch origin <haara>; git log -1 --format=%h origin/<haara>`.
- Vakioaloitusviestiin lisätty (KK 23.20/23.26, Raamattu 7.24): tulokset, kuvat ja kysymykset suoraan KK:lle (local_d5f31591-21fa-4cb0-bab3-bcd3435d075a) yhtenä koottuna viestinä per valmis asia, ei väliviestejä/kuittauksia; PT ei välitä päätöksiä; pt-ok pyydetään PT:ltä suoraan kun KK:n junasana viestissä; kopio PT:lle vain kun PT:n pitää toimia (≤ 3 riviä). Rooleille "älä pyydä nollausta ennen kuin konteksti ≥ 25 % uudessa sessiossa". PT:lle kuittaus nollauksesta vain jos PT pyytää (uusi linja: ei väliviestejä).
- KK nollaa itsensä 27–30 %:ssa ilman korttia (omistajan valtuutus 11.11. 22.56); lähetä sen antama aloitusviesti sellaisenaan, kun list_events on 0 (tai kun jo käynnissä: jonoon + "jos olet jo aloittanut, lue nyt"). KK:n kellovirhe: aloitusviestissä "date-komennosta".
- Osoitekirjassa KK-id local_d5f31591 on oikein; globaalin CLAUDE.md:n local_37f7… on toisen tilin id.

## Roolien tila 12.11. 00.52 (id osoitekirjasta)
- Natiivi-UI: nollattu 00.4x, luovutus 7d21abe52 (haara natiivi-ui/luovutus-20261112-0040). Ei toimia.
- Pelikoodari: nollannut itsensä 00.49; uusin luovutus 9b1062e45 (haara pelikoodari-luovutus-20261112-0048) ilmoitettu jonoon. Ei toimia.
- Julkaisija: nollattu 00.51; luovutus /Users/Shared/Claude/julkaisija-tyokalut/LUOVUTUS-ju-sivusessio-20261112-0050.md. Ei toimia.
- Karttaseppä: aloitusviesti 22.3x luovutuksesta 437aa2242 (haara karttaseppa-luovutus-20261111-1408); rsync T7:lle (29/37 Gi) kesken → se ilmoittaa itse ja pyytää nollausta ("NOLLAUS PYYDETTY"); tarkista get_session ja haaran kärki ennen NOLLAUSTA.
- Natiiviseppä: nollattu 22.2x (0d2e94105, haara natiiviseppa-luovutus-20261111-1004). Ei toimia.
- Lavastaja: nollattu 21.4x (871a20912 ilmoitettu; haara lavastaja/luovutus-20261111-2148). Ei toimia.
- KK: nollasi itsensä 00.50; aloitusviesti jonossa. PT: nollattu 23.4x (58e9e206f).
- Ei vielä nollattuja tänään: Sisältökirjuri, Valoseppä, Linssiseppä, Projektiseppä (ei pyyntöjä).

## Avoimet
- Ei avoimia nollauspyyntöjä. Odota rivejä "LUOVUTUS VALMIS" / "NOLLAUS PYYDETTY".
- Oma nollaus: kun luovutus on pushattu, nollaa itsesi (clear_session self); aloitusviestin antaa PT tai KK. Muuten vakioviesti: lue CLAUDE.md, NOLLAUS.md, tämä luovutus.
