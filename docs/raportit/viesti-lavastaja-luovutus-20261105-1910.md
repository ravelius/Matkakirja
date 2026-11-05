# Lavastajan luovutus 5.11.2026 1910 — LUE TÄMÄ, sitten muuri/KORJAUS.md loppu

Korvaa -1859:n. Ei vientejä. L = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen/lattiakoe. Vienti vasta PT:n sanalla ja PK:n vahvistuksella. Mac-ajot: Raamattu 10.5 (yksi kysymys, noin 5 kuvaa, rivi "mitä tämä ratkaisee", JU:n vuorolla).

## Tila
- Paras juuri PT:n mukaan (19.0x): katot-v125/koejuuri-lattia18. Väriraja z 675 poissa kolmessa näkymässä; parit L/parit18. Lattia18:n kaukopään arvo on yhä arvio.
- Kokeessa: koejuuri-lattia19 = lattia18 miinus päällekkäisen kerroksen ylempi kolmio, palat 2-4 ja 3-4, z 675–730 (L/tee19.py). Pois 508 kolmiota, 9 330 m². Malli (L/mittaa19.py): reikiä 0 / 13 310 näytteestä, kaksi kerrosta 3 108 → 469 näytettä, suurin väli 0,35 m.
- aja19 pyydetty JU:lta 19.09, 3 kuvaa, L/kuvat19-koe (s-rengas-pohj, sauma-x300, z700-x300). Viesti oli JU:lla jonossa, ei kuittausta. Kuvia ei ole katsottu. Jos kansio puuttuu, kysy JU:lta.

## Seuraava työ
1) Katso kuvat19-koe kokonaan, viivakohdat täysikoossa.
   - Poikkiviivat: häviävätkö s-rengas-pohj:n kuvarivit noin 627 ja 785 ja viivat kuvassa sauma-x300? Epäily on päällekkäiset vinot kaistat, ei todistettu. Kuvista laskettu paikka poikkeaa kaistan reunasta 2–3 m, ja harmaan raidan syntytapa on auki. Lattia16:n opetus: kerrosselitys ei riitä.
   - Lila-harmaa kaista: lattia16:n poisto toi sellaisen s-rengas-pohj:iin (kuvarivi noin 1160), syy auki. Katso erikseen, ettei se palannut.
   - Z 700 kohdassa x 300 (PT:n vaatimus ennen vientiä, kirjaa tulos seuraavaan luovutukseen): z700-x300 näyttää, onko raja valossa ja hyppääkö varjo tummasta vaaleaan. Kuvassa ei välttämättä ole varjoa rajan yli; jos ei ole, sano se äläkä kirjaa OK:ta.
2) Pari lattia18 | lattia19 PT:lle (s-rengas-pohj). Lattia18:ssa ei ole sauma-x300:aa eikä z700-x300:aa; sauma-x300:n vertailu on kuvat17-koe.
3) Sen jälkeen jono, KORJAUS.md.

## Tiedossa
- Mittaukset vain lod2:sta. Mittaus x-sarakkeittain: L/viivat2.py, kerrokset: L/viivat3.py, L/viivat.txt.
- Lattia nousee x 136:ssa z 676–700 välillä 0,3 → 4,9 m (noin 21 %). Ei tiedossa, onko tarkoitettu; PT:lle ei vielä kerrottu.
- Lattia18:n ja 17:n samaa runkoa ei ole tarkistettu: vain kamerat täsmäävät ja muualla kuin kaistalla ero on 1–3 yksikköä.
- Python: /opt/homebrew/bin/python3 ilman -I (numpy on käyttäjän kansiossa).
- Ajoaika: 338 s:sta 171 s on ensimmäinen odota-maailma ja 93 s kaukokuvan aikaraja (JU:lle kerrottu). Sk19:ssä raja on 20 s kaikissa kuvissa; ensimmäisen odotuksen lyhennys on kokeilematta.

## Jonossa, ei aloitettu (KORJAUS.md)
PK: konsoli, räystään alapinta, marmoriterassin nollatekselit (leivonta). PK:n havainto (-87,5; 302,5). S-rengas-itän harmaa vino levy. Vaakalevyt ilmassa x -420, pysty harmaa levy ja pieni sälö x -60, puita ilman tyveä x 136 ja x 300.
