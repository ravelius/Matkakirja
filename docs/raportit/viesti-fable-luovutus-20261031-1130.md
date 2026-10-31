# PT:n luovutus 31.10.2026 klo 11.30

Edellinen: viesti-fable-luovutus-20261031-0315.md. Viestit aina id:llä (mcp__ccd_session_mgmt__send_message). Osoitteet: /Users/Shared/Claude/osoitekirja.md.

## Tehty (03.17–11.30)
- Juna 216 runko nyt **02304e9c7** (NS, vihreä): + NUI ihmetähti piirroksen päälle b216a5c10 ja kevyempi tähti 5def5841b.
- Tuileries: omistaja 06.55 "Kartta kuvaa nykyaikaa" → 08.22 "Kartalle voi kyllä tehdä niitä ihmeitä. Tuilers voisi olla sellainen" →
  09.08 hyväksyi ihmeenä. PR 5699 (rauniot pois), 5701 (Tuileries'n palatsi ihmeenä) ja 5702 (kevyempi tähti, omistaja 09.14) mergetty ja viety.
  Raamattu 1.10 AIKA: kadonneet ihmeet kartalla loistonsa aikana (PR 5700).
- JU tyhjensi miniatyyrien Cloudflare-välimuistin 09.23 (421 kuvaa; pelaajat näkivät 2.9.-versioita).
- Tili: omistaja 09.25 "Tämän tilin voi käyttää 92% asti" → Raamattu 12.21 + tilinvaihto.md (PR 5705); Postivahti hälyttää 85 %
  (KK → TOIMI-lista omistajalle) ja 90 % (luovutukset). Viikko ~71 % klo 09.25, nollaus 2.11. 09.00, 92 % arviolta su 1.11. päivällä.
- Kohdekartan piirrokset: omistaja 09.17–10.16 → kaikki 14 samaan musta/valko/keskikontrasti (Raamattu 2.139, PR 5706), 36 px,
  ease-in-out-suurennus, kova 1 px CSS-varjo (c434-asettelu, hajautus 42). KS PR 5704 9802f9ffa KK:n kuittaama (= c434) → JU vie
  assetit ENSIN (14 × -kk.webp, kokoelma kohdekartanPiirrokset) ja sitten merge + tyhjennys. Leivottu varjo hylätty (skaalautui).
- Tuotantoputki: omistaja 11.25 "Kyllä, näin" → kevyin tapa + yhteinen moottori (tuotannonohjaus.md periaate 8, 8.4, portti 4;
  koodi.md luku 3 + Opit), PR 5709 mergetty (CI ei raportoinut tarkistuksia, dokumentit-testi ajettu paikallisesti vihreänä).

## Kesken (jono)
1. **JU: PR 5704** vienti + merge (KK kuitannut 11.09). Varmista valmis-rivi; sitten NUI:n natiivi (haara natiivi-ui/piirros-kontrasti-216,
   36 px + 450 ms ease-in-out + CSS-vastineen 1 px varjo vakiona, kontrasti vain kuvissa) → simupari KK:lle → PT OK → NS junaan 216.
2. **KS: PR 5708** (luonnos) tasaus muihin kaupunkeihin: otos4 (6 kaupunkia), KK palautti Berliinin Tv-tornin (Spreen väärä ranta)
   ja Lontoon Abbey Roadin (data Mayfairissa, maakartat.js:6094). Sitten KK:n kortti omistajalle → OK → loput kaupungit yhdellä ajolla
   (1024 px, webp 82). Ohjekartan rivi 13.79 on 5708:ssa (8cb731f2b); jos KS pakottaa pushin, lisää uudelleen.
3. **NUI: kaupunkikierros-erä junaan 216** (omistaja 10.55, 10.59, 11.01, 11.17): napit korin reunan päälle kaikilla laitteilla,
   tekstitykselle 50 % tausta, oikean reunan kuvat päällekkäin ja oikeammalle, metrokartta: kyltti pois, perillä vain nimi yläreunassa,
   lähtiessä kartta laajenee ensin ja nimi vaihtuu lennon aikana, kaikki metrokartan tilat (Siirto, Kelaus, Veto, tavallinen) samalle
   kevyelle moottorille. Video KK:lle ennen junaa; NUI:lla simuvuoro.
4. **VS: kori vaaleammaksi** (omistaja 10.55) linssiseppa2/kori-vaaleampi-216 5df024d76, pari KK:lla; PT:n näkemys: kelpaa ("hivenen"),
   vahvempi 0,8 tarjolla. KK:n kuittaus → PT OK NS:lle.
5. Edellisen luovutuksen jono yhä: LT valon pelikamerakuvat → kortti "valo oletukseksi?"; LAV-leivonta → VS leivottu pari, PK kerroin 3;
   TF 216 vasta omistajan pyynnöstä (pk7 palautus + web PR 5690 + sisältövienti samaan aikaan).
6. Levy 86 Gi (Postivahti siivosi 11.1x); proto-3d 96 Gt on omistajan päätettävä.

## Säännöt, jotka opin
- Kuvakohtainen tasaus: otos verrataan hyväksyttyyn tapaan (c434), mainista korjataan vain aidot viat (KK:n oppi reseptissä).
- Leivottu varjo skaalautuu kuvan mukana (suurennus, leveät piirrokset) → kiinteän kokoinen varjo piirretään näkymässä.
- Muutos PR:ään omistajan hyväksynnän jälkeen → vienti pidätetään, kunnes KK vertaa hyväksyttyyn.
- Omistajan "nähtävyyskartta"/"toinen kartta" -sanat: varmista kuvasta, mikä kartta näytettiin, ennen kuin linjaat kohteen.
