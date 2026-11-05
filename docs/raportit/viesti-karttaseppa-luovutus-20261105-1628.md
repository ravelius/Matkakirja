# Karttaseppä: luovutus 5.11.2026 klo 16.28 (KS)
Syy: konteksti yli 25 % (7.37). **Lue tämä, sitten -1623 (haara karttaseppa/luovutus-20261105-1623), -1614 ja -1548.** Tämä voittaa ristiriidassa. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki a33ee41d0. sk: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/sk-pariisi-kyltit.txt (oma tiedosto, JU käyttää sitä).

## ENSIN
1. Remote päälle. Vahti: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh a85fae8fb` Monitorilla (tila skriptin vieressä).
2. JU ajaa 59fde3622 (kuvat lokit/julkaisija-pariisi-kyltit-59fde3622; riittää vilkaista Tuileries'n kylttiä, ed6c66eaf:n piilotusta) ja sen jälkeen **a33ee41d0** (lokit/julkaisija-pariisi-kyltit-a33ee41d0, 19 kuvaa). Katso a33ee41d0 täysikokoisina, vie KK:lle, kopio PT:lle ja NUI:lle.

## KK:n pyyntö (16.3x): todista kuvalla
- **Museo:** kyltit-louvre-ennen (ei pientä pyramidimerkkiä), kyltit-louvre-kyltti-museo ja kyltit-louvre-malli-museo (Ranskan salit auki; loki "taidemuseo, maa"). Jos testikomento palauttaa "kyltti ei näy", kyltti on häipynyt: nosta zoomia tai katso NUI:n usvakorjaus. Koodi: KaupunkiPallot (LouvreMalliNapautus, AvaaMuseoKyltista, LouvreMallinaPariisissa, Napauta "louvre-kyltti"/"louvre-malli"), NostotKartalla.TietoNapautus, MalliKyltit.KylttiRuutu, PalloKierto.KoeNapautus, Kylttikohde.Osuu. Kääntämättä, tarkistus 0.
- **Vrain-Lucas:** kyltit-ennen-napautusta ja kyltit-napautus pitää nyt erota; koe ajaa zoomilla 0.001, koska henkilökohde näkyy vain mittakaavassa ≥ 0,6 (NostotKartalla rivi ~527). Jos "ei merkkiä" toistuu, syy on muu: tarkista `Kohdenostot.Ruudulla` ja kertoo KK:lle. KK:lle on sanottu "vika kokeessa", todistus puuttuu.
- Avoin kysymys KK:lle lähetetty: Ranskan tasolla, kameran ollessa Pariisin ulkopuolella, merkki jää, kunnes malli ladattu. Odota sana.

## Muu
NUI:lla: pyöreät kuvat ilman kylttiä; rajauslaatikko (ed6c66eaf), NUI katsoo ajosta. NUI:n 3731343c3 (haalea kyltti) on kärjessä. Kaikki muu kuten -1623 ja -1614 (Tripo Eiffel 24c, Codex seitsemän, Louvre-kyltti Seinen päällä).

## Opit
- Älä toista luovutuksen selitystä tarkistamatta: "ei ruudulla" oli väärä, kohde oli kuvan keskellä.
- Väliaikainen push-virhe: aja uudelleen ilman -q ennen kuin päättelet mitään.
